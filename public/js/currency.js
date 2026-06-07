// External API: live currency exchange rates from open.er-api.com (free, no API key)
const CURRENCIES = {
  EGP: { symbol: 'EGP', flag: '🇪🇬' },
  USD: { symbol: 'USD', flag: '🇺🇸' },
  EUR: { symbol: 'EUR', flag: '🇪🇺' },
  SAR: { symbol: 'SAR', flag: '🇸🇦' },
  AED: { symbol: 'AED', flag: '🇦🇪' }
};

let exchangeRates = null;
let currentCurrency = localStorage.getItem('mrBeansCurrency') || 'EGP';

async function fetchExchangeRates() {
  // Cache rates for 1 hour to avoid spamming the API
  const cached = localStorage.getItem('mrBeansRates');
  if (cached) {
    const parsed = JSON.parse(cached);
    if (Date.now() - parsed.timestamp < 3600000) {
      exchangeRates = parsed.rates;
      return;
    }
  }

  try {
    const response = await fetch('https://open.er-api.com/v6/latest/EGP');
    const data = await response.json();
    if (data.result === 'success') {
      exchangeRates = data.rates;
      localStorage.setItem('mrBeansRates', JSON.stringify({
        rates: exchangeRates,
        timestamp: Date.now()
      }));
    }
  } catch (error) {
    console.warn('Could not fetch exchange rates:', error);
    exchangeRates = { EGP: 1, USD: 0.020, EUR: 0.019, SAR: 0.075, AED: 0.074 };
  }
}

function convertPrice(egpPrice) {
  if (!exchangeRates || currentCurrency === 'EGP') {
    return `${egpPrice} EGP`;
  }
  const rate = exchangeRates[currentCurrency];
  if (!rate) return `${egpPrice} EGP`;
  const converted = (egpPrice * rate).toFixed(2);
  return `${converted} ${currentCurrency}`;
}

function updateAllPrices() {
  document.querySelectorAll('[data-price-egp]').forEach(el => {
    const egp = parseFloat(el.getAttribute('data-price-egp'));
    el.textContent = convertPrice(egp);
  });
}

function changeCurrency(currency) {
  currentCurrency = currency;
  localStorage.setItem('mrBeansCurrency', currency);
  updateAllPrices();
}

function createCurrencySelector() {
  const nav = document.querySelector('nav');
  if (!nav || document.getElementById('currency-select')) return;

  const select = document.createElement('select');
  select.id = 'currency-select';
  select.className = 'currency-select';
  Object.keys(CURRENCIES).forEach(code => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = `${CURRENCIES[code].flag} ${code}`;
    if (code === currentCurrency) opt.selected = true;
    select.appendChild(opt);
  });
  select.onchange = function() { changeCurrency(this.value); };
  nav.appendChild(select);
}

document.addEventListener('DOMContentLoaded', async function() {
  createCurrencySelector();
  await fetchExchangeRates();
  updateAllPrices();
});

// Expose for shop.js to call after products render
window.updateAllPrices = updateAllPrices;
window.convertPrice = convertPrice;
