/* ==========================================================================
   AYURVANI INTERACTIVE CONTROLLER (2026 MODERN EDITION)
   UTM Tracking, Form Validation, Order Processing, FAQ Accordion,
   Sticky Bar, Interactive Symptom Checker, Live Social Proof,
   Policy Modals, and Zero-Delay Instant Jump Navigation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Capture UTM & Attribution Parameters
  captureUtmParameters();

  // 2. Setup Form Validation & Submission
  setupOrderForm();

  // 3. Setup FAQ Accordion
  setupFaqAccordion();

  // 4. Setup Sticky Bottom Bar with Smart Hide
  setupStickyBar();

  // 5. Setup Interactive Symptom Checklist
  setupSymptomChecklist();

  // 6. Setup Speech Waveform Animation Interaction
  setupWaveformInteraction();

  // 7. Setup Live Social Proof Toast Notifications
  setupSocialProofToasts();

  // 8. Setup Policy Modals
  setupPolicyModals();

  // 9. Setup Instant Direct Jumps (Zero Scroll Delay)
  setupInstantJumps();

  // 10. Setup Scroll Reveal Animations
  setupScrollReveal();

  // 11. Setup Weekly Progress Check Timeline Animation
  setupWeeklyTimelineAnimation();
});

function setupScrollReveal() {
  const reveals = document.querySelectorAll('.ayur-reveal');
  if (!reveals.length) return;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('active'));
  }
}

/* ================= 1. CAPTURE UTM PARAMETERS ================= */
function captureUtmParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmFields = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_campaign_id',
    'utm_adset', 'utm_adset_id', 'utm_ad', 'utm_ad_id',
    'utm_placement', 'fbclid', 'fbc', 'fbp'
  ];

  utmFields.forEach(field => {
    const value = urlParams.get(field);
    if (value) {
      const inputs = document.querySelectorAll(`input[name="${field}"]`);
      inputs.forEach(input => {
        input.value = value;
      });
    }
  });
}

/* ================= 2. SETUP ORDER FORM & VALIDATION ================= */
function setupOrderForm() {
  const orderForm = document.getElementById('orderForm');
  const nameInput = document.getElementById('fname');
  const mobileInput = document.getElementById('fmobile');
  const nameError = document.getElementById('nameError');
  const mobileError = document.getElementById('mobileError');

  if (!orderForm || !nameInput || !mobileInput) return;

  // Real-time mobile input formatting: numbers only, max 10
  mobileInput.addEventListener('input', () => {
    mobileInput.value = mobileInput.value.replace(/\D/g, '').slice(0, 10);
    if (mobileInput.value.length === 10) {
      validateMobile();
    } else {
      if (mobileError) mobileError.style.display = 'none';
    }
  });

  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length >= 2) {
      if (nameError) nameError.style.display = 'none';
    }
  });

  function validateName() {
    const val = nameInput.value.trim();
    if (val.length < 2) {
      if (nameError) {
        nameError.textContent = 'कृपया अपना पूरा नाम दर्ज करें';
        nameError.style.display = 'block';
      }
      return false;
    }
    if (nameError) nameError.style.display = 'none';
    return true;
  }

  function validateMobile() {
    const val = mobileInput.value.trim();
    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(val)) {
      if (mobileError) {
        mobileError.textContent = 'कृपया 6-9 से शुरू होने वाला 10 अंकों का मान्य मोबाइल नंबर दर्ज करें';
        mobileError.style.display = 'block';
      }
      return false;
    }
    if (mobileError) mobileError.style.display = 'none';
    return true;
  }

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isMobileValid = validateMobile();

    if (!isNameValid) {
      nameInput.focus();
      return;
    }
    if (!isMobileValid) {
      mobileInput.focus();
      return;
    }

    // Show processing modal
    const modalOverlay = document.getElementById('orderStatusModal');
    const modalContent = document.getElementById('orderStatusContent');
    if (!modalOverlay || !modalContent) return;

    modalContent.innerHTML = `
      <div style="text-align:center; padding:10px 0;">
        <div class="ayur-spinner"></div>
        <h3 class="ayur-modal-title" style="margin-bottom:8px; font-size:1.25rem;">आपका Order Process हो रहा है...</h3>
        <p style="color:var(--ink-500); font-size:0.9rem;">कृपया प्रतीक्षा करें, आपकी जानकारी सुरक्षित रूप से दर्ज की जा रही है।</p>
      </div>
    `;
    modalOverlay.classList.add('open');

    // Simulate verified order submission
    setTimeout(() => {
      const orderId = 'AV-' + Math.floor(100000 + Math.random() * 900000);
      const parentName = nameInput.value.trim();
      const parentMobile = mobileInput.value.trim();
      const symptomsInput = document.getElementById('hiddenSelectedSymptoms');
      const selectedSymptoms = symptomsInput ? symptomsInput.value.trim() : '';

      modalContent.innerHTML = `
        <div style="text-align:center; padding:6px 0;">
          <div class="ayur-success-badge"><i class="ti ti-check"></i></div>
          <span class="ayur-modal-badge" style="background:#E8F5EE; color:#2E7D52; display:inline-block; padding:4px 14px; border-radius:9999px; font-weight:800; font-size:0.8rem; margin-bottom:10px;">Order Confirmed!</span>
          <h3 class="ayur-modal-title" style="color:var(--emerald-900); margin-bottom:8px; font-size:1.3rem;">बधाई हो, ${parentName}!</h3>
          <p style="font-size:0.92rem; color:var(--ink-700); line-height:1.55; margin-bottom:16px;">
            आपके बच्चे के लिए <strong>AyurVani Capsules</strong> का आर्डर सफलतापूर्वक स्वीकार कर लिया गया है।
          </p>
          <div style="background:var(--canvas-cream); border:1.5px solid var(--border-subtle); border-radius:14px; padding:14px; text-align:left; font-size:0.86rem; margin-bottom:18px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
              <span style="color:var(--ink-500);">Order ID:</span>
              <strong style="color:var(--emerald-900);">${orderId}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
              <span style="color:var(--ink-500);">Mobile:</span>
              <strong style="color:var(--emerald-900);">+91 ${parentMobile}</strong>
            </div>
            ${selectedSymptoms ? `
            <div style="display:flex; justify-content:space-between; margin-bottom:6px; border-bottom:1px dashed var(--border-subtle); padding-bottom:6px;">
              <span style="color:var(--ink-500);">चिह्नित संकेत:</span>
              <strong style="color:var(--jade-500); text-align:right; max-width:62%; font-size:0.8rem; line-height:1.3;">${selectedSymptoms}</strong>
            </div>
            ` : ''}
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
              <span style="color:var(--ink-500);">Payment:</span>
              <strong style="color:var(--jade-500);">Cash on Delivery (COD)</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span style="color:var(--ink-500);">Delivery:</span>
              <strong style="color:var(--jade-500);">FREE Express Delivery</strong>
            </div>
          </div>
          <p style="font-size:0.82rem; color:var(--ink-500); margin-bottom:18px; line-height:1.45;">
            ${selectedSymptoms ? '🌿 हमारे विशेषज्ञ कंसल्टेंट डिलीवरी कन्फर्मेशन कॉल पर इन संकेतों के समाधान के लिए विशेष व्यक्तिगत गाइडेंस देंगे।' : 'हमारे विशेषज्ञ जल्द ही डिलीवरी कन्फर्मेशन के लिए आपसे संपर्क करेंगे।'}
          </p>
          <button type="button" class="ayur-checkout-submit-btn" onclick="closeOrderStatusModal()" style="padding:12px 20px; font-size:0.95rem;">
            धन्यवाद, ठीक है
          </button>
        </div>
      `;

      // Reset form
      orderForm.reset();
      const orderSymptomsBox = document.getElementById('orderSymptomsBox');
      if (orderSymptomsBox) orderSymptomsBox.style.display = 'none';
      document.querySelectorAll('.ayur-diagnostic-card.selected').forEach(card => card.classList.remove('selected'));
      const countBadge = document.getElementById('symptomCounterPill');
      if (countBadge) countBadge.textContent = '0 संकेत चुने गए';
    }, 1000);
  });
}

window.closeOrderStatusModal = function () {
  const modalOverlay = document.getElementById('orderStatusModal');
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
  }
};

/* ================= 3. SETUP FAQ ACCORDION ================= */
window.toggleFaq = function (el) {
  const item = el.closest('.ayur-faq-unit') || el.closest('.faq-item');
  if (!item) return;
  const isOpen = item.classList.contains('open');

  // Close all other items
  document.querySelectorAll('.ayur-faq-unit.open, .faq-item.open').forEach(other => {
    if (other !== item) other.classList.remove('open');
  });

  item.classList.toggle('open', !isOpen);
};

function setupFaqAccordion() {
  const faqTriggers = document.querySelectorAll('.ayur-faq-trigger, .faq-q');
  faqTriggers.forEach(q => {
    q.setAttribute('tabindex', '0');
    q.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.toggleFaq(q);
      }
    });
  });
}

/* ================= 4. SETUP STICKY BOTTOM BAR ================= */
function setupStickyBar() {
  const stickyBar = document.getElementById('stickyBottomBar');
  const heroSection = document.getElementById('heroHook') || document.getElementById('heroShowcase') || document.getElementById('heroSection');
  const checkoutSection = document.getElementById('ayurCheckout') || document.getElementById('orderCardWrapper');

  if (!stickyBar || !heroSection) return;

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY || window.pageYOffset;
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight - 80;

    let inCheckout = false;
    if (checkoutSection) {
      const checkoutTop = checkoutSection.offsetTop - 180;
      const checkoutBottom = checkoutSection.offsetTop + checkoutSection.offsetHeight;
      if (scrollPos >= checkoutTop && scrollPos <= checkoutBottom) {
        inCheckout = true;
      }
    }

    if (scrollPos > heroBottom && !inCheckout) {
      stickyBar.classList.add('active');
    } else {
      stickyBar.classList.remove('active');
    }
  }, { passive: true });
}

/* ================= 5. SETUP INTERACTIVE SYMPTOM CHECKLIST ================= */
window.toggleCheckRow = function (el) {
  el.classList.toggle('checked');
  const checkedRows = document.querySelectorAll('.ayur-checklist-row.checked');
  const selectedList = [];
  checkedRows.forEach(row => {
    const textEl = row.querySelector('.ayur-check-text');
    if (textEl) selectedList.push(textEl.textContent.replace(/^✓\s*/, '').trim());
  });
  const countBadge = document.getElementById('symptomCounterPill');
  if (countBadge) {
    countBadge.textContent = `${checkedRows.length}/7 संकेत चुने गए`;
  }
  const hiddenSymptoms = document.getElementById('hiddenSelectedSymptoms');
  if (hiddenSymptoms) {
    hiddenSymptoms.value = selectedList.join(', ');
  }
};

function setupSymptomChecklist() {
  const symptomCards = document.querySelectorAll('.ayur-impact-card, .ayur-diagnostic-card');

  const countBadge = document.getElementById('symptomCounterPill');
  const orderBox = document.getElementById('orderSymptomsBox');
  const orderCountPill = document.getElementById('orderSymptomCountPill');
  const orderChips = document.getElementById('orderSymptomsChips');
  const hiddenSymptoms = document.getElementById('hiddenSelectedSymptoms');

  if (!symptomCards.length) return;

  function updateSymptoms() {
    const selectedCards = document.querySelectorAll('.ayur-impact-card.selected, .ayur-diagnostic-card.selected');
    const selectedList = [];

    selectedCards.forEach(card => {
      const titleEl = card.querySelector('h4, .ayur-diag-title');
      if (titleEl) {
        selectedList.push(titleEl.textContent.trim());
      }
    });

    const count = selectedList.length;

    if (countBadge) {
      countBadge.textContent = count === 0 ? '0 चुने गए' : `${count} चुने गए`;
    }

    if (orderBox) {
      if (count > 0) {
        orderBox.style.display = 'block';
        if (orderCountPill) orderCountPill.textContent = `${count} संकेत`;
        if (orderChips) {
          orderChips.innerHTML = selectedList.map(text => `
            <span class="ayur-symptom-chip"><i class="ti ti-check"></i> ${text}</span>
          `).join('');
        }
      } else {
        orderBox.style.display = 'none';
      }
    }

    if (hiddenSymptoms) {
      hiddenSymptoms.value = selectedList.join(', ');
    }
  }

  symptomCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      updateSymptoms();
    });
  });
}

/* ================= 6. SETUP SPEECH WAVEFORM ANIMATION ================= */
function setupWaveformInteraction() {
  const waveform = document.getElementById('speechWaveform');
  if (!waveform) return;

  waveform.addEventListener('click', () => {
    const bars = waveform.querySelectorAll('.ayur-wave-bar');
    bars.forEach(bar => {
      bar.style.animationDuration = '0.5s';
      setTimeout(() => {
        bar.style.animationDuration = '1.4s';
      }, 2500);
    });
  });
}

/* ================= 7. SETUP LIVE SOCIAL PROOF NOTIFICATIONS ================= */
function setupSocialProofToasts() {
  const toast = document.getElementById('liveSocialToast');
  const toastMsg = document.getElementById('toastMessage');
  const closeBtn = document.getElementById('toastCloseBtn');

  if (!toast || !toastMsg) return;

  const realOrders = [
    { name: 'सुनीता शर्मा', city: 'जयपुर', text: 'ने अभी Special Parent Offer आर्डर किया' },
    { name: 'राहुल सिंघल', city: 'नई दिल्ली', text: 'ने अपने 6 वर्षीय बच्चे के लिए AyurVani मंगाया' },
    { name: 'प्रियंका जोशी', city: 'पुणे', text: 'ने 2 पैक का कॉम्बो आर्डर किया' },
    { name: 'अमित कुमार वर्मा', city: 'लखनऊ', text: 'ने अभी Free COD के साथ बुक किया' },
    { name: 'दीपा शेखावत', city: 'इंदौर', text: 'ने अपने बच्चे के लिए हर्बल सपोर्ट आर्डर किया' },
    { name: 'विकास मेहरोत्रा', city: 'पटना', text: 'ने अभी Special Parent Offer बुक किया' },
    { name: 'कविता देसाई', city: 'अहमदाबाद', text: 'ने अपने 7 वर्षीय बच्चे के लिए AyurVani मंगाया' },
    { name: 'राजेश मल्होत्रा', city: 'चंडीगढ़', text: 'ने 2 पैक का कॉम्बो आर्डर किया' },
    { name: 'नेहा अग्रवाल', city: 'भोपाल', text: 'ने अभी Free COD के साथ बुक किया' },
    { name: 'संजय गुप्ता', city: 'कानपुर', text: 'ने अपने बच्चे के लिए AyurVani आर्डर किया' }
  ];

  let orderIndex = 0;
  let isDismissed = false;

  function showNextToast() {
    if (isDismissed) return;

    // Suppress notification if user is filling the Order form
    const checkoutArea = document.getElementById('ayurCheckout');
    if (checkoutArea) {
      const rect = checkoutArea.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        return;
      }
    }
    if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
      return;
    }

    const current = realOrders[orderIndex];
    toastMsg.innerHTML = `<strong>${current.name} (${current.city})</strong> ${current.text}`;
    toast.classList.add('visible');

    // Hide after 4.5 seconds
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 4500);

    orderIndex = (orderIndex + 1) % realOrders.length;
  }

  // Initial delay 4s, then repeat every 14s
  setTimeout(() => {
    showNextToast();
    setInterval(showNextToast, 14000);
  }, 4000);

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      isDismissed = true;
      toast.classList.remove('visible');
    });
  }
}

/* ================= 8. SETUP POLICY MODALS ================= */
const policyData = {
  privacy: {
    title: 'Privacy Policy',
    badge: 'गोपनीयता नीति · सुरक्षित और संरक्षित',
    html: `
      <p>AyurVani आपकी व्यक्तिगत जानकारी की सुरक्षा को सर्वोच्च प्राथमिकता देता है। जब आप हमारी वेबसाइट के माध्यम से जानकारी साझा करते हैं:</p>
      <ul>
        <li>हम केवल आपका नाम और 10-अंकों का मोबाइल नंबर ऑर्डर प्रोसेसिंग और डिलीवरी सहायता के लिए एकत्र करते हैं।</li>
        <li>आपकी जानकारी किसी भी तृतीय-पक्ष (Third-party) को बेची, साझा या विज्ञापनों के लिए प्रदान नहीं की जाती।</li>
        <li>हमारे सभी सर्वर इंडस्ट्री-स्टैंडर्ड एन्क्रिप्शन और सुरक्षा प्रोटोकॉल का पालन करते हैं।</li>
      </ul>
      <p>किसी भी गोपनीयता संबंधी प्रश्न के लिए आप हमसे संपर्क कर सकते हैं।</p>
    `
  },
  terms: {
    title: 'Terms & Conditions',
    badge: 'नियम एवं शर्तें · कृपया ध्यानपूर्वक पढ़ें',
    html: `
      <p>AyurVani का उपयोग करके आप निम्नलिखित नियमों से सहमत होते हैं:</p>
      <ul>
        <li>AyurVani एक आयुर्वेदिक वेलनेस और डाइटरी सप्लीमेंट है।</li>
        <li>यह वेबसाइट केवल सूचनात्मक एवं वेलनेस सहायता उद्देश्यों के लिए बनाई गई है।</li>
        <li>हर बच्चे के परिणाम उसकी शारीरिक प्रकृति, आयु और नियमित उपयोग पर निर्भर करते हैं।</li>
      </ul>
    `
  },
  shipping: {
    title: 'Shipping Policy',
    badge: 'शिपिंग नीति · सुरक्षित एवं निःशुल्क डिलीवरी',
    html: `
      <p>हम पूरे भारत में सुरक्षित और विश्वसनीय डिलीवरी सेवाएं प्रदान करते हैं:</p>
      <ul>
        <li><strong>Free Delivery:</strong> सभी ऑर्डर्स पर मानक डिलीवरी पूरी तरह निःशुल्क है।</li>
        <li><strong>COD (Cash on Delivery):</strong> प्रोडक्ट आपके पते पर पहुँचने के बाद ही भुगतान करें।</li>
        <li><strong>डिलीवरी समय:</strong> आमतौर पर ऑर्डर कन्फर्मेशन के 3 से 6 कार्यदिवसों के भीतर पार्सल डिलीवर कर दिया जाता है।</li>
      </ul>
    `
  },
  cancel: {
    title: 'Cancellation Policy',
    badge: 'रद्दीकरण नीति · आसान प्रक्रिया',
    html: `
      <p>यदि आप अपना आर्डर रद्द करना चाहते हैं:</p>
      <ul>
        <li>ऑर्डर डिस्पैच होने से पहले आप हमारी कस्टमर केयर टीम से संपर्क करके निःशुल्क रद्द कर सकते हैं।</li>
        <li>डिलीवरी के समय यदि पैकेज क्षतिग्रस्त मिले, तो आप पार्सल स्वीकार न करने का विकल्प चुन सकते हैं।</li>
      </ul>
    `
  },
  contact: {
    title: 'Contact Us',
    badge: 'सहायता एवं संपर्क',
    html: `
      <p>हम आपके प्रश्नों और सहायता के लिए सदैव उपलब्ध हैं:</p>
      <ul>
        <li><strong>ब्रांड:</strong> AyurVani (SS Herbal)</li>
        <li><strong>सपोर्ट ईमेल:</strong> support@ayurvaniwellness.in</li>
        <li><strong>सपोर्ट समय:</strong> सोमवार से शनिवार, सुबह 10:00 से शाम 6:00 तक</li>
      </ul>
    `
  },
  disclaimer: {
    title: 'Legal Disclaimer',
    badge: 'कानूनी अस्वीकरण',
    html: `
      <p><strong>Disclaimer:</strong> AyurVani एक आयुर्वेदिक वेलनेस प्रोडक्ट है। यह किसी बीमारी का निदान, उपचार, इलाज या रोकथाम करने का दावा नहीं करता। यदि आपके बच्चे को लगातार बोलने या Speech Development से संबंधित समस्या है, तो Speech-Language Pathologist या Pediatrician से परामर्श लें। परिणाम व्यक्ति की उम्र, शरीर की स्थिति और उपयोग के तरीके के अनुसार अलग-अलग हो सकते हैं।</p>
      <p>वेबसाइट पर दिए गए घटक पारंपरिक आयुर्वेदिक साहित्यों और जड़ी-बूटियों के पारंपरिक गुणों पर आधारित हैं।</p>
    `
  }
};

function setupPolicyModals() {
  const modalOverlay = document.getElementById('policyModalOverlay');
  const modalTitle = document.getElementById('policyModalTitle');
  const modalBadge = document.getElementById('policyModalBadge');
  const modalBody = document.getElementById('policyModalBody');
  const closeBtn = document.getElementById('policyModalCloseBtn');

  window.openPolicyModal = function (policyKey) {
    const data = policyData[policyKey];
    if (!data || !modalOverlay) return;

    modalTitle.textContent = data.title;
    modalBadge.textContent = data.badge;
    modalBody.innerHTML = data.html;
    modalOverlay.classList.add('open');
  };

  if (closeBtn && modalOverlay) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('open');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('open');
      }
    });
  }

  // Handle status modal background click
  const statusModal = document.getElementById('orderStatusModal');
  if (statusModal) {
    statusModal.addEventListener('click', (e) => {
      if (e.target === statusModal) {
        statusModal.classList.remove('open');
      }
    });
  }
}

/* ================= 9. SETUP INSTANT DIRECT JUMPS (ZERO SCROLL DELAY) ================= */
function setupInstantJumps() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || !href) return;

      const targetElement = document.querySelector(href);
      if (!targetElement) return;

      e.preventDefault();

      // Ensure zero-delay instant jump without sluggish animation
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.scrollBehavior = 'auto';

      const navHeight = 40;
      const targetPos = Math.max(0, targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight);

      // Instant jump
      window.scrollTo(0, targetPos);

      // If jumping to Checkout Section: focus name input and pulse card
      if (href === '#ayurCheckout' || href === '#orderCardWrapper') {
        const nameInput = document.getElementById('fname');
        if (nameInput) {
          nameInput.focus();
        }

        const checkoutCard = document.querySelector('.ayur-checkout-card');
        if (checkoutCard) {
          checkoutCard.style.boxShadow = '0 0 0 4px #D4A344, 0 24px 60px rgba(0, 0, 0, 0.45)';
          setTimeout(() => {
            checkoutCard.style.boxShadow = '';
          }, 1200);
        }
      }
    });
  });
}

/* ================= 11. WEEKLY PROGRESS TIMELINE STEP ANIMATION ================= */
function setupWeeklyTimelineAnimation() {
  const timeline = document.getElementById('weeklyProgressTimeline');
  const trackFill = document.getElementById('wpTrackFill');
  const replayBtn = document.getElementById('replayWeeklyTimelineBtn');
  if (!timeline) return;

  const rows = timeline.querySelectorAll('.ayur-wp-row');

  function playAnimation() {
    // Reset states
    if (trackFill) trackFill.classList.remove('active');
    rows.forEach(row => row.classList.remove('active'));

    // Force layout reflow
    void timeline.offsetWidth;

    // Animate connector track fill
    if (trackFill) {
      setTimeout(() => {
        trackFill.classList.add('active');
      }, 50);
    }

    // Animate each week step sequentially
    rows.forEach((row, idx) => {
      setTimeout(() => {
        row.classList.add('active');
      }, 150 + idx * 300);
    });
  }

  // Auto-play when scrolled into view
  if ('IntersectionObserver' in window) {
    let hasPlayed = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasPlayed) {
          hasPlayed = true;
          playAnimation();
        }
      });
    }, { threshold: 0.15 });
    observer.observe(timeline);
  } else {
    playAnimation();
  }

  // "Animation dobara dekho" replay button
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      replayBtn.classList.add('spinning');
      setTimeout(() => {
        replayBtn.classList.remove('spinning');
      }, 700);
      playAnimation();
    });
  }
}

