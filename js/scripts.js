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
    { platform: "Twitch", brand: "twitch", value: "462", label: "Followers" },
    { platform: "Kick", brand: "kick", value: "26", label: "Followers" },
    { platform: "TikTok", brand: "tiktok", value: "226", label: "Followers" },
    { platform: "Instagram", brand: "instagram", value: "199", label: "Followers" },
    { platform: "YouTube", brand: "youtube", value: "468", label: "Subscribers" },
  ];

  const affiliates = [
    {
      category: "Streaming Gear",
      items: [
        { name: "OBSBOT", url: "https://www.obsbot.com/?rfsn=8969544.bff71d&utm_source=refersion&utm_medium=affiliate&utm_campaign=8969544.bff71d", logo: "images/affiliates/obsbot.png", blurb: "Cameras + creator gear" },
        { name: "Keychron", url: "https://www.keychron.com/?ref=MRDISTORT", logo: "images/affiliates/keychron.jpeg", blurb: "Keyboards" },
        { name: "Razer", url: "https://razer.a9yw.net/c/6818512/642901/10229", logo: "images/affiliates/razer-team-logo.png", blurb: "Gaming peripherals" }
      ]
    },
    {
      category: "Energy",
      items: [
        { name: "Dubby Energy", url: "https://www.dubby.gg/discount/MRDISTORT?ref=rxvggddk", logo: "images/affiliates/dubby.png", blurb: "Energy drink" }
      ]
    },
    {
      category: "Tech / Lifestyle",
      items: [
        { name: "HidrateSpark", url: "https://hidratespark.com/stephen35", logo: "images/affiliates/hidrate.png", blurb: "Smart water bottle" }
      ]
    },
    {
      category: "Collectibles",
      items: [
        { name: "Neosabers", url: "https://neosabers.com/?ref=MRDISTORT", logo: "images/affiliates/neosaber.png", blurb: "Replica lightsabers" }
      ]
    }
  ];

  function brandIconClass(brand) {
    switch (brand) {
      case "twitch": return "icon-twitch";
      case "tiktok": return "icon-tiktok";
      case "instagram": return "icon-instagram";
      case "youtube": return "icon-youtube";
      default: return "";
    }
  }

  function platformBrandToBootstrapIcon(brand) {
    switch (brand) {
      case "twitch": return "bi-twitch";
      case "tiktok": return "bi-tiktok";
      case "instagram": return "bi-instagram";
      case "youtube": return "bi-youtube";
      default: return "bi-globe";
    }
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

  function wireModal(openBtnId, closeBtnId, modalId, onOpen) {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = document.getElementById(closeBtnId);

    if (openBtn) {
      openBtn.style.cursor = "pointer";
      openBtn.addEventListener("click", () => {
        if (onOpen) onOpen();
        openModal(modal);
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", () => closeModal(modal));
    }
    return modal;
  }

  const allModals = [];

  // =========
  // Socials panel + modal
  // =========
  function renderSocialLinks() {
    const socialLinks = document.getElementById("socialLinks");
    if (!socialLinks) return;
    socialLinks.innerHTML = socials.map(s => {
      const leftIcon = s.brand === "kick"
        ? `<span class="kick-badge" aria-hidden="true">K</span>`
        : `<i class="bi ${s.icon} ${brandIconClass(s.brand)}" aria-hidden="true"></i>`;
      return `
        <a href="${s.url}" target="_blank" rel="noopener">
          <span class="left">${leftIcon}<strong>${s.name}</strong></span>
          <span class="right"><i class="bi bi-box-arrow-up-right"></i></span>
        </a>
      `;
    }).join("");
  }
  renderSocialLinks();
  allModals.push(wireModal("openSocialsModal", "closeSocialsModal", "socialsModal"));

  // =========
  // Stats panel (glance) + modal (carousel)
  // =========
  const glanceNumber = document.getElementById("glanceStatNumber");
  const glanceCaption = document.getElementById("glanceStatCaption");
  if (glanceNumber && glanceCaption) {
    const s = platformStats[0];
    glanceNumber.textContent = s.value;
    glanceCaption.textContent = `${s.platform} ${s.label}`;
  }

  let statIndex = 0;
  const statsContent = document.querySelector(".stats-content");
  const statsLeft = document.querySelector(".stats-left");
  const statsRight = document.querySelector(".stats-right");

  function renderStat() {
    if (!statsContent) return;
    const s = platformStats[statIndex];
    const iconHtml = s.brand === "kick"
      ? `<span class="kick-badge" aria-hidden="true">K</span>`
      : `<i class="bi ${platformBrandToBootstrapIcon(s.brand)} platform-icon ${brandIconClass(s.brand)}" aria-hidden="true"></i>`;
    statsContent.innerHTML = `
      <div class="stat-platform">${iconHtml}<span>${s.platform}</span></div>
      <div class="stat-number">${s.value}</div>
      <div class="stat-label muted">${s.label}</div>
    `;
  }

  if (statsLeft) statsLeft.addEventListener("click", () => {
    statIndex = (statIndex - 1 + platformStats.length) % platformStats.length;
    renderStat();
  });
  if (statsRight) statsRight.addEventListener("click", () => {
    statIndex = (statIndex + 1) % platformStats.length;
    renderStat();
  });
  renderStat();

  allModals.push(wireModal("openStatsModal", "closeStatsModal", "statsModal"));

  // =========
  // Bio modal
  // =========
  allModals.push(wireModal("openBioModal", "closeBioModal", "bioModal"));

  // =========
  // Upcoming Streams Schedule (Google Calendar iCal via Netlify function)
  // =========
  const ICAL_URL = "/.netlify/functions/calendar";
  const scheduleList = document.getElementById("scheduleList");

  async function loadSchedule() {
    if (!scheduleList) return;
    try {
      const res = await fetch(ICAL_URL);
      if (!res.ok) throw new Error("Failed to fetch calendar");
      const text = await res.text();
      const events = parseIcal(text);
      renderSchedule(events);
    } catch (err) {
      console.error(err);
      scheduleList.innerHTML = `<div class="muted">Could not load schedule. Check back soon!</div>`;
    }
  }

  function parseIcal(text) {
    const events = [];
    const blocks = text.split("BEGIN:VEVENT");
    blocks.shift();

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    for (const block of blocks) {
      const summary = (block.match(/SUMMARY:(.+)/)?.[1] || "Stream").trim();
      const dtstart = block.match(/DTSTART(?:;[^:]+)?:(\d+T?\d+)/)?.[1];
      if (!dtstart) continue;
      const date = parseIcalDate(dtstart);
      if (!date || date < startOfWeek || date >= endOfWeek) continue;
      events.push({ summary, date });
    }

    events.sort((a, b) => a.date - b.date);
    return events;
  }

  function parseIcalDate(str) {
    if (str.length >= 15) {
      return new Date(`${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6,8)}T${str.slice(9,11)}:${str.slice(11,13)}:${str.slice(13,15)}Z`);
    } else {
      return new Date(`${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6,8)}`);
    }
  }

  function renderSchedule(events) {
    if (!scheduleList) return;
    if (events.length === 0) {
      scheduleList.innerHTML = `<div class="muted">No streams scheduled this week. Check back soon!</div>`;
      return;
    }
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    scheduleList.innerHTML = events.map(e => {
      const d = e.date;
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

  loadSchedule();

  // =========
  // Affiliate modal
  // =========
  const affiliateBody = document.getElementById("affiliateModalBody");

  function buildAffiliateModal() {
    if (!affiliateBody) return;
    affiliateBody.innerHTML = affiliates.map(cat => `
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
              <a class="btn btn-dark" href="${item.url}" target="_blank" rel="noopener">
                Shop <i class="bi bi-box-arrow-up-right"></i>
              </a>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
  }
  buildAffiliateModal();
  allModals.push(wireModal("openAffiliateModal", "closeAffiliateModal", "affiliateModal"));

  // =========
  // Contact modal + form
  // =========
  const contactModal = wireModal("openContactModal", "closeContactModal", "contactModal");
  allModals.push(contactModal);

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

  // =========
  // Consultation modal + form
  // =========
  allModals.push(wireModal("openGuestBookModal", "closeGuestBookModal", "guestBookModal"));

  const consultForm = document.getElementById("consultForm");
  if (consultForm) {
    consultForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const services = [...consultForm.querySelectorAll('input[name="services"]:checked')]
        .map(cb => cb.value);

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
        params.append("name", payload.name);
        params.append("socialName", payload.socialName);
        params.append("discordName", payload.discordName);
        params.append("services", payload.services);
        params.append("vision", payload.vision);

        await fetch(SCRIPT_URL + "?" + params.toString(), {
          method: "GET",
          mode: "no-cors"
        });

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

  // =========
  // Close modals on outside click or ESC
  // =========
  window.addEventListener("click", (e) => {
    allModals.forEach(m => { if (e.target === m) closeModal(m); });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      allModals.forEach(m => closeModal(m));
    }
  });
});
