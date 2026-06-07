const translations = {
  en: {
    home: 'Home',
    shop: 'Shop',
    contact: 'Contact',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    admin: 'Admin',
    hello: 'Hello',
    // Shop
    shopTitle: 'Our Coffee Selection',
    shopSubtitle: 'Small-batch roasts for every palate — from bright and fruity to bold and earthy.',
    brewingTechnique: 'Brewing Technique',
    roastColor: 'Roast Color',
    allTechniques: 'All Techniques',
    allRoasts: 'All Roasts',
    turkishCoffee: 'Turkish Coffee',
    espressoCoffee: 'Espresso Coffee',
    light: 'Light',
    medium: 'Medium',
    dark: 'Dark',
    addToCart: 'Add to Cart',
    resetAll: 'Reset all',
    noProductsTitle: 'NO PRODUCTS WERE FOUND',
    noProductsMsg: 'Check your spelling or search again with less specific terms.',
    returnToShop: 'RETURN TO SHOP',
    proceedCheckout: 'Proceed to Checkout',
    // Home
    heroLabel: 'Fresh Roast',
    heroBtn: 'Shop the Collection',
    storyTag: 'The House of Mr. Beans',
    storyHeading: 'Quiet contrast, intentionally crafted',
    storyP1: 'Mr. Beans Coffee explores single-origin beans through quiet contrast — where bright, fruity notes meet deep, chocolatey richness in compositions that feel balanced, memorable, and quietly satisfying. Each batch is small-roasted as a study in atmosphere — refined, tactile, and designed to linger with understated presence.',
    storyP2: 'Rooted in a considered approach to sourcing, Mr. Bean Coffee values ethical partnerships, fresh roasting, and a slower, more intentional ritual of brewing. The house explores origins with restraint, allowing each cup to feel clean, contemporary, and quietly expressive.',
    sectionLabel: 'Our Selections',
    sectionHeading: 'Signature roasts',
    // Login
    loginTitle: 'Login',
    loginSubtitle: 'Use your account to place orders. Admins can manage products.',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    loginBtn: 'Login',
    noAccount: 'No account?',
    createOne: 'Create one',
    // Signup
    signupTitle: 'Create Account',
    signupSubtitle: 'New accounts are created as normal user accounts.',
    fullNameLabel: 'Full Name',
    passwordHint: 'Uppercase, lowercase, number, special character',
    signupBtn: 'Sign Up',
    haveAccount: 'Already have an account?',
    // Contact
    contactTitle: 'Get in Touch',
    contactSubtitle: 'Have a question, feedback, or wholesale inquiry? We\'d love to hear from you.',
    nameLabel: 'Your Name',
    messageLabel: 'Message',
    sendBtn: 'Send Message',
    // Cart
    cartTitle: 'Your Cart',
    cartCheckoutBtn: 'Proceed to Checkout',
    // Checkout
    yourOrder: 'Your Order',
    deliveryDetails: 'Delivery Details',
    fullNameCheckout: 'Full Name',
    emailCheckout: 'Email Address',
    addressLabel: 'Delivery Address',
    paymentMethod: 'Payment Method',
    creditCard: 'Credit Card',
    cashOnDelivery: 'Cash on Delivery',
    cardLabel: 'Card Number (16 digits, numbers only)',
    placeOrder: 'Place Order',
    orderPlaced: 'Order Placed!',
    orderThanks: 'Thank you for your order. Your beans are on their way.',
    backToHome: 'Back to Home',
    // Footer
    footerTagline: 'Single origin · Ethically sourced · Fresh roasted',
    footerCopy: '© 2026 Mr. Beans Coffee — All rights reserved.',
    langToggle: 'العربية'
  },
  ar: {
    home: 'الرئيسية',
    shop: 'المتجر',
    contact: 'تواصل',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    admin: 'الإدارة',
    hello: 'مرحبا',
    // Shop
    shopTitle: 'تشكيلة قهوتنا',
    shopSubtitle: 'قهوة محمصة بدفعات صغيرة لكل الأذواق — من المنعش إلى الجريء.',
    brewingTechnique: 'طريقة التحضير',
    roastColor: 'درجة التحميص',
    allTechniques: 'كل الطرق',
    allRoasts: 'كل الدرجات',
    turkishCoffee: 'قهوة تركية',
    espressoCoffee: 'قهوة إسبريسو',
    light: 'فاتح',
    medium: 'متوسط',
    dark: 'غامق',
    addToCart: 'أضف إلى السلة',
    resetAll: 'مسح الكل',
    noProductsTitle: 'لم يتم العثور على منتجات',
    noProductsMsg: 'تحقق من الإملاء أو ابحث مرة أخرى بكلمات أقل تحديدا.',
    returnToShop: 'العودة إلى المتجر',
    proceedCheckout: 'إتمام الشراء',
    // Home
    heroLabel: 'تحميص طازج',
    heroBtn: 'تسوق المجموعة',
    storyTag: 'بيت مستر بينز',
    storyHeading: 'تباين هادئ، مصنوع بعناية',
    storyP1: 'تستكشف قهوة مستر بينز حبوب أحادية المصدر من خلال تباين هادئ — حيث تلتقي النكهات المشرقة والفاكهية مع الغنى العميق بالشوكولاتة في تركيبات تشعرك بالتوازن والتميز.',
    storyP2: 'متجذرة في نهج مدروس للتوريد، تقدر قهوة مستر بينز الشراكات الأخلاقية والتحميص الطازج وطقوس التخمير البطيئة والمتعمدة.',
    sectionLabel: 'اختياراتنا',
    sectionHeading: 'تحميصات مميزة',
    // Login
    loginTitle: 'تسجيل الدخول',
    loginSubtitle: 'استخدم حسابك لتقديم الطلبات. المسؤولون يمكنهم إدارة المنتجات.',
    emailLabel: 'البريد الإلكتروني',
    passwordLabel: 'كلمة المرور',
    loginBtn: 'تسجيل الدخول',
    noAccount: 'ليس لديك حساب؟',
    createOne: 'أنشئ واحد',
    // Signup
    signupTitle: 'إنشاء حساب',
    signupSubtitle: 'يتم إنشاء الحسابات الجديدة كحسابات مستخدم عادي.',
    fullNameLabel: 'الاسم الكامل',
    passwordHint: 'حرف كبير، حرف صغير، رقم، رمز خاص',
    signupBtn: 'إنشاء حساب',
    haveAccount: 'لديك حساب بالفعل؟',
    // Contact
    contactTitle: 'تواصل معنا',
    contactSubtitle: 'لديك سؤال أو ملاحظة أو استفسار عن الجملة؟ يسعدنا سماعك.',
    nameLabel: 'اسمك',
    messageLabel: 'الرسالة',
    sendBtn: 'إرسال الرسالة',
    // Cart
    cartTitle: 'سلة التسوق',
    cartCheckoutBtn: 'إتمام الشراء',
    // Checkout
    yourOrder: 'طلبك',
    deliveryDetails: 'تفاصيل التوصيل',
    fullNameCheckout: 'الاسم الكامل',
    emailCheckout: 'البريد الإلكتروني',
    addressLabel: 'عنوان التوصيل',
    paymentMethod: 'طريقة الدفع',
    creditCard: 'بطاقة ائتمان',
    cashOnDelivery: 'الدفع عند الاستلام',
    cardLabel: 'رقم البطاقة (16 رقم)',
    placeOrder: 'تأكيد الطلب',
    orderPlaced: 'تم الطلب!',
    orderThanks: 'شكرا لطلبك. حبوبك في الطريق.',
    backToHome: 'العودة للرئيسية',
    // Footer
    footerTagline: 'أحادي المصدر · مصادر أخلاقية · تحميص طازج',
    footerCopy: '© 2026 مستر بينز كوفي — جميع الحقوق محفوظة.',
    langToggle: 'English'
  }
};

function getLang() {
  return localStorage.getItem('mrBeansLang') || 'en';
}

function setLang(lang) {
  localStorage.setItem('mrBeansLang', lang);
  applyTranslations();
}

function t(key) {
  const lang = getLang();
  return translations[lang][key] || key;
}

function applyTranslations() {
  const lang = getLang();
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.textContent = t('langToggle');
}

function toggleLanguage() {
  const newLang = getLang() === 'en' ? 'ar' : 'en';
  setLang(newLang);
  location.reload();
}

document.addEventListener('DOMContentLoaded', function() {
  applyTranslations();

  const nav = document.querySelector('nav');
  if (nav) {
    const btn = document.createElement('button');
    btn.id = 'lang-toggle';
    btn.className = 'lang-toggle-btn';
    btn.textContent = t('langToggle');
    btn.onclick = toggleLanguage;
    nav.appendChild(btn);
  }
});
