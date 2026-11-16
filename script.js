/**
 * Aryaman Srimali Jain — Portfolio Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollSpy();
  initCopyButtons();
  initAnimatedCounters();
  initProjectFilters();
  initMVTecSimulator();
  initFloodBotSimulator();
  initContactForm();
  updateCurrentYear();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Retrieve saved preference or check OS preference
  const savedTheme = localStorage.getItem('asj-theme');
  if (savedTheme === 'light') {
    html.classList.remove('dark');
    html.classList.add('light');
  } else {
    html.classList.remove('light');
    html.classList.add('dark');
  }

  themeToggle?.addEventListener('click', () => {
    if (html.classList.contains('light')) {
      html.classList.remove('light');
      html.classList.add('dark');
      localStorage.setItem('asj-theme', 'dark');
      showToast('Switched to Dark Mode');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
      localStorage.setItem('asj-theme', 'light');
      showToast('Switched to Light Mode');
    }
  });
}

/* ==========================================================================
   2. Mobile Navigation
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  toggleBtn?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('open');
    });
  });
}

/* ==========================================================================
   3. Scroll Spy for Header Navigation
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   4. Copy to Clipboard with Toast Notification
   ========================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied: ${text.length > 30 ? text.substring(0, 28) + '...' : text}`);
        }).catch(() => {
          showToast('Failed to copy to clipboard');
        });
      }
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ==========================================================================
   5. Animated Number Counters
   ========================================================================== */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('.metric-number');
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        counterElements.forEach(el => {
          const rawTarget = el.getAttribute('data-target');
          if (!rawTarget) return;

          const target = parseFloat(rawTarget);
          const isFloat = rawTarget.includes('.');
          const hasPlus = el.textContent.includes('+');
          const hasPercent = el.textContent.includes('%');

          let count = 0;
          const duration = 1500;
          const frameRate = 30;
          const totalFrames = Math.round(duration / frameRate);
          const increment = target / totalFrames;

          let frame = 0;
          const timer = setInterval(() => {
            frame++;
            count += increment;
            if (frame >= totalFrames) {
              count = target;
              clearInterval(timer);
            }

            let displayVal = isFloat ? count.toFixed(1) : Math.floor(count);
            if (hasPlus) displayVal += '+';
            if (hasPercent) displayVal += '%';
            el.textContent = displayVal;
          }, frameRate);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsBar = document.querySelector('.metrics-bar');
  if (metricsBar) observer.observe(metricsBar);
}

/* ==========================================================================
   6. Project Category Filter
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. MVTec LOCO AD Defect Simulator
   ========================================================================== */
function initMVTecSimulator() {
  const openButtons = document.querySelectorAll('[data-demo="mvtec"]');
  const modal = document.getElementById('demo-modal-mvtec');
  const closeButtons = document.querySelectorAll('[data-close="demo-modal-mvtec"]');

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal?.classList.add('open');
      modal?.setAttribute('aria-hidden', 'false');
      updateMVTecSimulation();
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal?.classList.remove('open');
      modal?.setAttribute('aria-hidden', 'true');
    });
  });

  // Close on backdrop click
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });

  // State Management for Simulator
  const simData = {
    breakfast_box: {
      name: "Breakfast Box",
      normal: { score: 0.142, desc: "Box contains standard ratio: 1 tangerine, 1 banana, 1 cereal bar, 1 fruit bar." },
      structural: { score: 0.785, desc: "Surface puncture and crushed carton corner detected on outer packaging." },
      logical: { score: 0.864, desc: "Logical Anomaly: Banana missing & incorrect 2x Tangerines found (Constraint Violation)." }
    },
    juice_bottle: {
      name: "Juice Bottle",
      normal: { score: 0.089, desc: "Cap sealed properly, liquid fill level nominal, label orientation exact." },
      structural: { score: 0.822, desc: "Large vertical scratch and particulate contamination along glass sidewall." },
      logical: { score: 0.791, desc: "Logical Anomaly: Label flavor barcode mismatches beverage liquid color profile." }
    },
    pushpins: {
      name: "Pushpins",
      normal: { score: 0.115, desc: "10 assorted pushpins present with intact needles within designated tray wells." },
      structural: { score: 0.730, desc: "Bent needle pin & chipped plastic head in slot #4." },
      logical: { score: 0.912, desc: "Logical Anomaly: Total count 8/10 pins, 2 empty compartments." }
    },
    screw_bag: {
      name: "Screw Bag",
      normal: { score: 0.128, desc: "5 M6 hex bolts, 5 washers, and 5 locking nuts verified inside sealed pouch." },
      structural: { score: 0.764, desc: "Thread stripping on bolt #2 and unsealed heat line." },
      logical: { score: 0.885, desc: "Logical Anomaly: 4 bolts instead of 5, excess 2 washers." }
    },
    splicing_connectors: {
      name: "Splicing Connectors",
      normal: { score: 0.098, desc: "3-conductor terminal block with all levers clamped in down position." },
      structural: { score: 0.814, desc: "Fractured polycarbonate housing and tarnished copper contact." },
      logical: { score: 0.879, desc: "Logical Anomaly: Orange clamping lever left in open 90° orientation." }
    }
  };

  let currentCategory = 'breakfast_box';
  let currentState = 'normal';
  let currentThreshold = 0.58;

  const catPills = document.querySelectorAll('#sim-category-group .sim-pill');
  const statePills = document.querySelectorAll('#sim-state-group .sim-pill');
  const threshSlider = document.getElementById('thresh-slider');

  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-cat') || 'breakfast_box';
      updateMVTecSimulation();
    });
  });

  statePills.forEach(pill => {
    pill.addEventListener('click', () => {
      statePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentState = pill.getAttribute('data-state') || 'normal';
      updateMVTecSimulation();
    });
  });

  threshSlider?.addEventListener('input', (e) => {
    currentThreshold = parseFloat(e.target.value);
    document.getElementById('tele-threshold').textContent = `${currentThreshold.toFixed(2)} (User Adjusted)`;
    evaluateVerdict();
  });

  function updateMVTecSimulation() {
    const data = simData[currentCategory][currentState];
    const teleScore = document.getElementById('tele-score');
    const viewport = document.getElementById('sample-graphic');
    const statusChip = document.getElementById('sim-status-chip');

    if (teleScore) teleScore.textContent = data.score.toFixed(3);

    // Render Visual Mockup
    let graphicHTML = '';
    if (currentState === 'normal') {
      graphicHTML = `
        <div style="text-align: center; color: #10B981; font-family: var(--font-mono);">
          <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">✓</div>
          <div style="font-weight: 700; font-size: 0.95rem; color: #E2E8F0;">${simData[currentCategory].name} — Nominal</div>
          <div style="font-size: 0.78rem; color: #94A3B8; max-width: 300px; margin: 0.4rem auto;">${data.desc}</div>
          <div style="margin-top: 0.8rem; display: inline-block; padding: 0.3rem 0.8rem; background: rgba(16, 185, 129, 0.15); border: 1px solid #10B981; border-radius: 4px; font-size: 0.75rem;">PatchCore Heatmap: Nil Variance</div>
        </div>
      `;
      if (statusChip) {
        statusChip.className = 'status-chip normal';
        statusChip.textContent = `PASS (${data.score.toFixed(2)})`;
      }
    } else {
      const isLogical = currentState === 'logical';
      graphicHTML = `
        <div style="text-align: center; color: #F43F5E; font-family: var(--font-mono);">
          <div style="display: inline-block; padding: 1.5rem; border: 2px dashed #F43F5E; background: rgba(244, 63, 94, 0.1); border-radius: 8px; box-shadow: 0 0 25px rgba(244, 63, 94, 0.35);">
            <div style="font-size: 0.7rem; font-weight: 800; letter-spacing: 0.08em; color: #FDA4AF; margin-bottom: 4px;">
              [B-BOX LOC: X=142 Y=88 W=94 H=110]
            </div>
            <div style="font-weight: 700; font-size: 0.95rem; color: #FFF;">${isLogical ? 'LOGICAL DISCREPANCY' : 'STRUCTURAL FLAW'}</div>
            <div style="font-size: 0.78rem; color: #FDA4AF; max-width: 320px; margin: 0.4rem auto;">${data.desc}</div>
          </div>
          <div style="margin-top: 0.6rem; font-size: 0.72rem; color: #F43F5E;">Gaussian Heatmap Peak: ${data.score.toFixed(3)}</div>
        </div>
      `;
      if (statusChip) {
        statusChip.className = 'status-chip defective';
        statusChip.textContent = `DEFECT (${data.score.toFixed(2)})`;
      }
    }

    if (viewport) viewport.innerHTML = graphicHTML;
    evaluateVerdict();
  }

  function evaluateVerdict() {
    const data = simData[currentCategory][currentState];
    const verdictEl = document.getElementById('tele-verdict');
    if (!verdictEl) return;

    if (data.score > currentThreshold) {
      verdictEl.textContent = 'FAIL • DEFECT DETECTED';
      verdictEl.style.color = '#F43F5E';
    } else {
      verdictEl.textContent = 'PASS • WITHIN TOLERANCE';
      verdictEl.style.color = '#10B981';
    }
  }
}

/* ==========================================================================
   8. FloodBot Telemetry Simulator
   ========================================================================== */
function initFloodBotSimulator() {
  const openButtons = document.querySelectorAll('[data-demo="floodbot"]');
  const modal = document.getElementById('demo-modal-floodbot');
  const closeButtons = document.querySelectorAll('[data-close="demo-modal-floodbot"]');

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal?.classList.add('open');
      modal?.setAttribute('aria-hidden', 'false');
      calculateFloodRisk();
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal?.classList.remove('open');
      modal?.setAttribute('aria-hidden', 'true');
    });
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });

  const rainInput = document.getElementById('slide-rain');
  const soilInput = document.getElementById('slide-soil');
  const demInput = document.getElementById('slide-dem');

  rainInput?.addEventListener('input', calculateFloodRisk);
  soilInput?.addEventListener('input', calculateFloodRisk);
  demInput?.addEventListener('input', calculateFloodRisk);

  function calculateFloodRisk() {
    const rain = parseFloat(rainInput?.value || '140');
    const soil = parseFloat(soilInput?.value || '68');
    const demIndex = parseFloat(demInput?.value || '3');

    document.getElementById('val-rain').textContent = `${rain} mm`;
    document.getElementById('val-soil').textContent = `${soil}%`;

    const demLabels = ["High Alpine (0.05)", "Upper Plateau (0.15)", "Mid Slopes (0.22)", "Low Basin (0.32)", "River Valley (0.45)", "Alluvial Plain (0.58)", "Coastal Plain (0.68)", "Estuary Basin (0.78)", "Depression Zone (0.88)", "Sink Basin (0.95)"];
    document.getElementById('val-dem').textContent = demLabels[demIndex - 1] || `${demIndex}`;

    // Weighted risk formula (Rain 45%, Soil 35%, DEM Basin Vulnerability 20%)
    const normRain = Math.min(rain / 300, 1.0);
    const normSoil = soil / 100;
    const normDem = demIndex / 10;

    const riskScore = Math.min(Math.round(((normRain * 0.45) + (normSoil * 0.35) + (normDem * 0.20)) * 100), 99);

    const scoreEl = document.getElementById('flood-risk-score');
    const statusEl = document.getElementById('flood-risk-status');
    const gaugeFill = document.getElementById('flood-gauge-fill');
    const fc24 = document.getElementById('fc-24h');
    const fc48 = document.getElementById('fc-48h');
    const fc72 = document.getElementById('fc-72h');

    if (scoreEl) scoreEl.textContent = `${riskScore}%`;

    // Rotate gauge arc: 0% -> 0deg, 100% -> 180deg (0.5turn)
    const turnVal = (riskScore / 100) * 0.5;
    if (gaugeFill) gaugeFill.style.transform = `rotate(${turnVal}turn)`;

    if (riskScore < 40) {
      if (statusEl) {
        statusEl.textContent = 'LOW RISK';
        statusEl.style.color = '#10B981';
      }
      if (fc24) fc24.textContent = 'Runoff Drainage Nominal (<0.2m)';
      if (fc48) fc48.textContent = 'Normal River Absorption';
      if (fc72) fc72.textContent = 'All Clear • Advisory Level 0';
    } else if (riskScore < 70) {
      if (statusEl) {
        statusEl.textContent = 'MODERATE RISK';
        statusEl.style.color = '#F59E0B';
      }
      if (fc24) fc24.textContent = 'Water Rise +0.7m Inbound';
      if (fc48) fc48.textContent = 'Basin Saturation Peak Expected';
      if (fc72) fc72.textContent = 'Precautionary Flood Advisory';
    } else {
      if (statusEl) {
        statusEl.textContent = 'SEVERE FLASH INUNDATION';
        statusEl.style.color = '#F43F5E';
      }
      if (fc24) fc24.textContent = 'Rapid Surge +1.8m Imminent';
      if (fc48) fc48.textContent = 'Widespread Levee Breach Risk';
      if (fc72) fc72.textContent = 'CRITICAL ALERT • Evacuate Lowlands';
    }
  }
}

/* ==========================================================================
   9. Direct Contact Form Interaction
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!submitBtn || !status) return;

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a10 10 0 0 1 10 10"/>
      </svg>
      <span>Sending Dispatch...</span>
    `;
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.style.opacity = '1';
      status.className = 'form-status success';
      status.textContent = '✓ Thank you! Your message has been routed to Aryaman. You will receive a response shortly.';
      form.reset();

      setTimeout(() => {
        status.textContent = '';
      }, 6000);
    }, 1200);
  });
}

function updateCurrentYear() {
  const yr = document.getElementById('current-year');
  if (yr) yr.textContent = new Date().getFullYear().toString();
}
