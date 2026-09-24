document.addEventListener("DOMContentLoaded", () => {
  // =========
  // Data
  // =========
  const socials = [
    { name: "Twitch", url: "https://www.twitch.tv/mrdistort", icon: "bi-twitch", brand: "twitch" },
    { name: "Kick", url: "https://www.kick.com/mr-distort", icon: null, brand: "kick" },
    { name: "TikTok", url: "https://www.tiktok.com/@mr_distort", icon: "bi-tiktok", brand: "tiktok" },
    { name: "Instagram", url: "https://www.instagram.com/mr_distort", icon: "bi-instagram", brand: "instagram" },
    { name: "YouTube", url: "https://www.youtube.com/@Mr_Distort", icon: "bi-youtube", brand: "youtube" },
  ];

  const platformStats = [
    { value: 462, label: "Twitch Followers" },
    { value: 26, label: "Kick Followers" },
    { value: 226, label: "TikTok Followers" },
    { value: 199, label: "Instagram Followers" },
    { value: 468, label: "YouTube Subscribers" },
  ];

  const creatorPrograms = [
    {
      name: "Razer Creator Program",
      logo: "images/affiliates/razer-team-logo.png",
      blurb: "Official creator partner for gaming peripherals & gear.",
      url: "https://razer.a9yw.net/c/6818512/642901/10229",
      brk: null
    },
    {
      name: "Marvel Rivals Climber Program",
      logo: null,
      initials: "MR",
      blurb: "Competitive climb partner content for Marvel Rivals.",
      url: "#",
      brk: "var(--purple)"
    },
    {
      name: "Meld Creator Program",
      logo: null,
      initials: "ML",
      blurb: "Creator partner program with Meld.",
      url: "#",
      brk: "var(--cyan)"
    }
  ];

  const otherAffiliates = [
    { category: "Streaming Gear", items: [
      { name: "OBSBOT", url: "https://www.obsbot.com/?rfsn=8969544.bff71d&utm_source=refersion&utm_medium=affiliate&utm_campaign=8969544.bff71d", logo: "images/affiliates/obsbot.png", blurb: "AI cameras + creator gear" },
      { name: "Keychron", url: "https://www.keychron.com/?ref=MRDISTORT", logo: "images/affiliates/keychron.jpeg", blurb: "Keyboards" }
    ]},
    { category: "Energy", items: [
      { name: "Dubby Energy", url: "https://www.dubby.gg/discount/MRDISTORT?ref=rxvggddk", logo: "images/affiliates/dubby.png", blurb: "Energy drink" }
    ]},
    { category: "Tech / Lifestyle", items: [
      { name: "HidrateSpark", url: "https://hidratespark.com/stephen35", logo: "images/affiliates/hidrate.png", blurb: "Smart water bottle" }
    ]},
    { category: "Collectibles", items: [
      { name: "Neosabers", url: "https://neosabers.com/?ref=MRDISTORT", logo: "images/affiliates/neosaber.png", blurb: "Replica lightsabers" }
    ]}
  ];

  function brandIconClass(brand) {
    switch (brand) {
      case "twitch": return "icon-twitch";
      case "tiktok": return "";
      case "instagram": return "icon-instagram";
      case "youtube": return "icon-youtube";
      default: return "";
    }
  }

  // =========
  // Platform strip
  // =========
  const platformStrip = document.getElementById("platformStrip");
  if (platformStrip) {
    platformStrip.innerHTML = socials.map(s => {
      const icon = s.brand === "kick"
        ? `<span class="kick-badge" aria-hidden="true">K</span>`
        : `<i class="bi ${s.icon} ${brandIconClass(s.brand)}" aria-hidden="true"></i>`;
      return `<a href="${s.url}" target="_blank" rel="noopener">${icon}<span>${s.name}</span></a>`;
    }).join("");
  }

  // =========
  // Footer socials
  // =========
  const footerSocials = document.getElementById("footerSocials");
  if (footerSocials) {
    footerSocials.innerHTML = socials.map(s => {
      const icon = s.brand === "kick"
        ? `<span class="kick-badge" aria-hidden="true">K</span>`
        : `<i class="bi ${s.icon}" aria-hidden="true"></i>`;
      return `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}">${icon}</a>`;
    }).join("");
  }

  // =========
  // Marquee (affiliate + program logos, duplicated for seamless loop)
  // =========
  const marqueeTrack = document.getElementById("marqueeTrack");
  if (marqueeTrack) {
    const logos = [
      "images/affiliates/razer-team-logo.png",
      "images/affiliates/obsbot.png",
      "images/affiliates/dubby.png",
      "images/affiliates/keychron.jpeg",
      "images/affiliates/hidrate.png",
      "images/affiliates/neosaber.png",
    ];
    const set = logos.map(src => `<img src="${src}" alt="" aria-hidden="true">`).join("");
    marqueeTrack.innerHTML = set + set;
  }

  // =========
  // Stats grid + animated counters
  // =========
  const statsGrid = document.getElementById("statsGrid");
  if (statsGrid) {
    statsGrid.innerHTML = platformStats.map((s, i) => `
      <div class="stat-card">
        <div class="stat-number" data-target="${s.value}" data-counted="false">0</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join("");

    const counters = statsGrid.querySelectorAll(".stat-number");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.dataset.counted === "false") {
          entry.target.dataset.counted = "true";
          animateCount(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => observer.observe(c));
  }

  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 900;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
  }

  // =========
  // Creator programs
  // =========
  const programsGrid = document.getElementById("programsGrid");
  if (programsGrid) {
    programsGrid.innerHTML = creatorPrograms.map(p => {
      const visual = p.logo
        ? `<div class="program-logo-wrap"><img src="${p.logo}" alt="${p.name} logo"></div>`
        : `<div class="program-logo-wrap"><div class="program-badge-icon" style="${p.brk ? `--brk:${p.brk};` : ''}">${p.initials}</div></div>`;
      return `
        <div class="corner-panel program-card" ${p.brk ? `style="--brk:${p.brk};"` : ''}>
          ${visual}
          <div class="program-name">${p.name}</div>
          <p class="program-blurb">${p.blurb}</p>
          <a class="btn-tech btn-tech-accent" href="${p.url}" target="_blank" rel="noopener">View Program →</a>
        </div>
      `;
    }).join("");
  }

  // =========
  // Modal helpers
  // =========
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.style.display = "block";
    document.body.style.overflow = "hidden";
  }
  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.style.display = "none";
    document.body.style.overflow = "";
  }
  function wireOpen(triggerId, modalEl) {
    const trigger = document.getElementById(triggerId);
    if (trigger) trigger.addEventListener("click", () => openModal(modalEl));
  }

  const allModals = [];

  // Affiliate modal
  const affiliateModal = document.getElementById("affiliateModal");
  allModals.push(affiliateModal);
  wireOpen("openAffiliateModal", affiliateModal);
  const closeAffiliate = document.getElementById("closeAffiliateModal");
  if (closeAffiliate) closeAffiliate.addEventListener("click", () => closeModal(affiliateModal));

  const affiliateBody = document.getElementById("affiliateModalBody");
  if (affiliateBody) {
    affiliateBody.innerHTML = otherAffiliates.map(cat => `
      <div class="affiliate-category">
        <h4>${cat.category}</h4>
        <div class="affiliate-items">
          ${cat.items.map(item => `
            <div class="affiliate-card">
              <img class="affiliate-logo" src="${item.logo}" alt="${item.name} logo">
              <div class="affiliate-meta">
                <div class="affiliate-name">${item.name}</div>
                <div class="affiliate-blurb">${item.blurb || ""}</div>
              </div>
              <a class="btn-tech btn-tech-solid" href="${item.url}" target="_blank" rel="noopener">Shop</a>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
  }

  // Contact modal
  const contactModal = document.getElementById("contactModal");
  allModals.push(contactModal);
  wireOpen("openContactModal", contactModal);
  wireOpen("navWorkBtn", contactModal);
  wireOpen("aboutWorkBtn", contactModal);
  const closeContact = document.getElementById("closeContactModal");
  if (closeContact) closeContact.addEventListener("click", () => closeModal(contactModal));

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData(contactForm);
        const body = new URLSearchParams(formData).toString();
        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body
        });
        if (!res.ok) throw new Error(`Form submit failed: ${res.status}`);
        contactForm.innerHTML = `
          <div style="padding:12px 4px;">
            <h3 style="margin:0 0 8px 0;">Sent</h3>
            <p class="muted" style="margin:0;">Your message reached Mr. Distort. I'll get back to you ASAP.</p>
          </div>
        `;
      } catch (err) {
        console.error(err);
        alert("Something went wrong sending the message. Please try again.");
      }
    });
  }

  // Consultation modal
  const guestBookModal = document.getElementById("guestBookModal");
  allModals.push(guestBookModal);
  wireOpen("openGuestBookModal", guestBookModal);
  wireOpen("openGuestBookModal2", guestBookModal);
  const closeGuestBook = document.getElementById("closeGuestBookModal");
  if (closeGuestBook) closeGuestBook.addEventListener("click", () => closeModal(guestBookModal));

  const consultForm = document.getElementById("consultForm");
  if (consultForm) {
    consultForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const services = [...consultForm.querySelectorAll('input[name="services"]:checked')].map(cb => cb.value);
      if (services.length === 0) {
        alert("Please select at least one service.");
        return;
      }
      const payload = {
        name: consultForm.querySelector('[name="name"]').value,
        socialName: consultForm.querySelector('[name="socialName"]').value,
        discordName: consultForm.querySelector('[name="discordName"]').value,
        services: services.join(", "),
        vision: consultForm.querySelector('[name="vision"]').value,
      };
      try {
        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzs4xkctSMSsK2ttM_tPRfFGWphfqWW667vmzOd8zdUwRZzXnidf3MyrHmyHKfiPXc-wQ/exec";
        const params = new URLSearchParams();
        Object.entries(payload).forEach(([k, v]) => params.append(k, v));
        await fetch(SCRIPT_URL + "?" + params.toString(), { method: "GET", mode: "no-cors" });
        consultForm.innerHTML = `
          <div style="padding:12px 4px; text-align:center;">
            <h3 style="margin:0 0 8px 0;">Request Received</h3>
            <p class="muted" style="margin:0;">I'll reach out via Discord DM shortly. Looking forward to working with you!</p>
          </div>
        `;
      } catch (err) {
        console.error(err);
        alert("Something went wrong. Please try again.");
      }
    });
  }

  window.addEventListener("click", (e) => {
    allModals.forEach(m => { if (e.target === m) closeModal(m); });
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") allModals.forEach(m => closeModal(m));
  });

  // =========
  // Mobile nav toggle
  // =========
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
    navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));
  }

  // =========
  // Nav scrollspy
  // =========
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");
  if (sections.length && navAnchors.length) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navAnchors.forEach(a => {
            a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
          });
        }
      });
    }, { rootMargin: "-40% 0px -50% 0px" });
    sections.forEach(s => spyObserver.observe(s));
  }

  // =========
  // Schedule + Hero Status Ticker (Google Calendar iCal via Netlify function)
  // =========
  const ICAL_URL = "/.netlify/functions/calendar";
  const scheduleList = document.getElementById("scheduleList");
  const heroStatusText = document.getElementById("heroStatusText");
  const heroStatusDot = document.getElementById("heroStatusDot");

  async function loadCalendar() {
    try {
      const res = await fetch(ICAL_URL);
      if (!res.ok) throw new Error("Failed to fetch calendar");
      const text = await res.text();
      const allEvents = parseIcal(text);
      renderWeekSchedule(allEvents);
      renderHeroStatus(allEvents);
    } catch (err) {
      console.error(err);
      if (scheduleList) scheduleList.innerHTML = `<div class="muted">Could not load schedule. Check back soon!</div>`;
      if (heroStatusText) heroStatusText.textContent = "Schedule unavailable";
    }
  }

  function parseIcal(text) {
    const events = [];
    const blocks = text.split("BEGIN:VEVENT");
    blocks.shift();

    for (const block of blocks) {
      const summary = (block.match(/SUMMARY:(.+)/)?.[1] || "Stream").trim();
      const dtstartMatch = block.match(/DTSTART(?:;[^:]+)?:(\d+T?\d+Z?)/)?.[1];
      const dtendMatch = block.match(/DTEND(?:;[^:]+)?:(\d+T?\d+Z?)/)?.[1];
      if (!dtstartMatch) continue;
      const start = parseIcalDate(dtstartMatch);
      const end = dtendMatch ? parseIcalDate(dtendMatch) : new Date(start.getTime() + 2 * 60 * 60 * 1000);
      if (!start) continue;
      events.push({ summary, start, end });
    }
    events.sort((a, b) => a.start - b.start);
    return events;
  }

  function parseIcalDate(str) {
    if (str.length >= 15) {
      return new Date(`${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6,8)}T${str.slice(9,11)}:${str.slice(11,13)}:${str.slice(13,15)}Z`);
    } else {
      return new Date(`${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6,8)}`);
    }
  }

  function renderWeekSchedule(allEvents) {
    if (!scheduleList) return;
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const weekEvents = allEvents.filter(e => e.start >= startOfWeek && e.start < endOfWeek);

    if (weekEvents.length === 0) {
      scheduleList.innerHTML = `<div class="muted">No streams scheduled this week. Check back soon!</div>`;
      return;
    }
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    scheduleList.innerHTML = weekEvents.map(e => {
      const d = e.start;
      const hours = d.getHours();
      const mins = d.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const hour12 = ((hours % 12) || 12);
      return `
        <div class="schedule-item">
          <div class="schedule-date">
            <span class="schedule-day">${days[d.getDay()]}</span>
            <span class="schedule-month-date">${months[d.getMonth()]} ${d.getDate()}</span>
          </div>
          <div class="schedule-info">
            <div class="schedule-title">${e.summary}</div>
            <div class="schedule-time muted">${hour12}:${mins} ${ampm} ET</div>
          </div>
          <i class="bi bi-broadcast icon-twitch" style="font-size:1.1rem;"></i>
        </div>
      `;
    }).join("");
  }

  function renderHeroStatus(allEvents) {
    if (!heroStatusText) return;
    const now = new Date();
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const liveEvent = allEvents.find(e => now >= e.start && now < e.end);
    if (liveEvent) {
      heroStatusText.innerHTML = `Live now — ${liveEvent.summary} · <a href="https://www.twitch.tv/mrdistort" target="_blank" rel="noopener">Watch on Twitch</a>`;
      if (heroStatusDot) heroStatusDot.classList.add("is-live");
      return;
    }

    const nextEvent = allEvents.find(e => e.start > now);
    if (nextEvent) {
      const d = nextEvent.start;
      const hours = d.getHours();
      const mins = d.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const hour12 = ((hours % 12) || 12);
      heroStatusText.textContent = `Offline — next stream ${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()} at ${hour12}:${mins} ${ampm} ET`;
    } else {
      heroStatusText.textContent = "Offline — schedule coming soon";
    }
    if (heroStatusDot) heroStatusDot.classList.remove("is-live");
  }

  loadCalendar();
});
