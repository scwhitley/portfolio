document.addEventListener("DOMContentLoaded", () => {
  // =========
  // Social links (Discord + Merch removed)
  // =========
  const socials = [
    { name: "Twitch", url: "https://www.twitch.tv/mrdistort", icon: "bi-twitch", brand: "twitch" },
    { name: "Kick", url: "https://www.kick.com/mr-distort", icon: null, brand: "kick" },
    { name: "TikTok", url: "https://www.tiktok.com/@mr_distort", icon: "bi-tiktok", brand: "tiktok" },
    { name: "Instagram", url: "https://www.instagram.com/mr_distort", icon: "bi-instagram", brand: "instagram" },
    { name: "YouTube", url: "https://www.youtube.com/@Mr_Distort", icon: "bi-youtube", brand: "youtube" },
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

  const socialLinks = document.getElementById("socialLinks");
  if (socialLinks) {
    socialLinks.innerHTML = socials.map(s => {
      const leftIcon = s.brand === "kick"
        ? `<span class="kick-badge" aria-hidden="true">K</span>`
        : `<i class="bi ${s.icon} ${brandIconClass(s.brand)}" aria-hidden="true"></i>`;

      return `
        <a href="${s.url}" target="_blank" rel="noopener">
          <span class="left">
            ${leftIcon}
            <strong>${s.name}</strong>
          </span>
          <span class="right"><i class="bi bi-box-arrow-up-right"></i></span>
        </a>
      `;
    }).join("");
  }

  // =========
  // Phase 1 Stats (manual)
  // =========
  const platformStats = [
    { platform: "Twitch", brand: "twitch", value: "431", label: "Followers" },
    { platform: "Kick", brand: "kick", value: "24", label: "Followers" },
    { platform: "TikTok", brand: "tiktok", value: "221", label: "Followers" },
    { platform: "Instagram", brand: "instagram", value: "148", label: "Followers" },
    { platform: "YouTube", brand: "youtube", value: "461", label: "Subscribers" },
  ];

  let statIndex = 0;
  const statsContent = document.querySelector(".stats-content");
  const statsLeft = document.querySelector(".stats-left");
  const statsRight = document.querySelector(".stats-right");

  function platformBrandToBootstrapIcon(brand) {
    switch (brand) {
      case "twitch": return "bi-twitch";
      case "tiktok": return "bi-tiktok";
      case "instagram": return "bi-instagram";
      case "youtube": return "bi-youtube";
      default: return "bi-globe";
    }
  }

  function renderStat() {
    if (!statsContent) return;
    const s = platformStats[statIndex];

    const iconHtml = s.brand === "kick"
      ? `<span class="kick-badge" aria-hidden="true">K</span>`
      : `<i class="bi ${platformBrandToBootstrapIcon(s.brand)} platform-icon ${brandIconClass(s.brand)}" aria-hidden="true"></i>`;

    statsContent.innerHTML = `
      <div class="stat-platform">
        ${iconHtml}
        <span>${s.platform}</span>
      </div>
      <div class="stat-number">${s.value}</div>
      <div class="stat-label">${s.label}</div>
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

 // =========
// Upcoming Streams Schedule (Google Calendar iCal)
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
    scheduleList.innerHTML = `<div class="muted" style="padding:12px 0;">Could not load schedule. Check back soon!</div>`;
  }
}

function parseIcal(text) {
  const events = [];
  const blocks = text.split("BEGIN:VEVENT");
  blocks.shift(); // remove header

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday

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
  // Handle both YYYYMMDDTHHMMSSZ and YYYYMMDD formats
  if (str.length >= 15) {
    return new Date(
      `${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6,8)}T${str.slice(9,11)}:${str.slice(11,13)}:${str.slice(13,15)}Z`
    );
  } else {
    return new Date(`${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6,8)}`);
  }
}

function renderSchedule(events) {
  if (!scheduleList) return;

  if (events.length === 0) {
    scheduleList.innerHTML = `<div class="muted" style="padding:12px 0;">No streams scheduled this week. Check back soon!</div>`;
    return;
  }

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  scheduleList.innerHTML = events.map(e => {
    const d = e.date;
    const day = days[d.getDay()];
    const month = months[d.getMonth()];
    const date = d.getDate();
    const hours = d.getHours();
    const mins = d.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = ((hours % 12) || 12);
    const timeStr = `${hour12}:${mins} ${ampm}`;

    return `
      <div class="schedule-item">
        <div class="schedule-date">
          <span class="schedule-day">${day}</span>
          <span class="schedule-month-date">${month} ${date}</span>
        </div>
        <div class="schedule-info">
          <div class="schedule-title">${e.summary}</div>
          <div class="schedule-time muted">${timeStr} ET</div>
        </div>
        <i class="bi bi-broadcast icon-twitch" style="font-size:1.1rem;"></i>
      </div>
    `;
  }).join("");
}

loadSchedule();

  // =========
  // Affiliate Modal
  // =========
  const affiliates = [
    {
      category: "Streaming Gear",
      items: [
        {
          name: "OBSBOT",
          url: "https://www.obsbot.com/?rfsn=8969544.bff71d&utm_source=refersion&utm_medium=affiliate&utm_campaign=8969544.bff71d",
          logo: "images/affiliates/obsbot.png",
          blurb: "Cameras + creator gear"
        },
        {
          name: "Keychron",
          url: "https://www.keychron.com/?ref=MRDISTORT",
          logo: "images/affiliates/keychron.jpeg",
          blurb: "Keyboards"
        },
        {
          name: "Razer",
          url: "https://razer.a9yw.net/c/6818512/642901/10229",
          logo: "images/affiliates/razer-team-logo.png",
          blurb: "Gaming peripherals"
        },
    
    {
      category: "Energy",
      items: [
        {
          name: "Dubby Energy",
          url: "https://www.dubby.gg/discount/MRDISTORT?ref=rxvggddk",
          logo: "images/affiliates/dubby.png",
          blurb: "Energy drink"
        }
      ]
    },
    {
      category: "Tech / Lifestyle",
      items: [
        {
          name: "HidrateSpark",
          url: "https://hidratespark.com/stephen35",
          logo: "images/affiliates/hidrate.png",
          blurb: "Smart water bottle"
        }
      ]
    },
    {
      category: "Collectibles",
      items: [
        {
          name: "Neosabers",
          url: "https://neosabers.com/?ref=MRDISTORT",
          logo: "images/affiliates/neosabers.png",
          blurb: "Replica lightsabers"
        }
      ]
    }
  ];

  const affiliateModal = document.getElementById("affiliateModal");
  const affiliateBody = document.getElementById("affiliateModalBody");
  const openAffiliateModalBtn = document.getElementById("openAffiliateModal");
  const closeAffiliateModalBtn = document.getElementById("closeAffiliateModal");

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
              <a class="btn ghost" href="${item.url}" target="_blank" rel="noopener">
                Shop <i class="bi bi-box-arrow-up-right"></i>
              </a>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
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

  // Affiliate modal wiring
  if (openAffiliateModalBtn) {
    buildAffiliateModal();
    openAffiliateModalBtn.addEventListener("click", () => openModal(affiliateModal));
  }

  if (closeAffiliateModalBtn) {
    closeAffiliateModalBtn.addEventListener("click", () => closeModal(affiliateModal));
  }

  // =========
  // Contact Modal (Netlify Forms)
  // =========
  const contactModal = document.getElementById("contactModal");
  const openContactModalBtn = document.getElementById("openContactModal");
  const closeContactModalBtn = document.getElementById("closeContactModal");
  const contactForm = document.getElementById("contactForm");

  if (openContactModalBtn) {
    openContactModalBtn.style.cursor = "pointer";
    openContactModalBtn.addEventListener("click", () => openModal(contactModal));
  }

  if (closeContactModalBtn) {
    closeContactModalBtn.addEventListener("click", () => closeModal(contactModal));
  }

  // Submit Contact Form to Netlify without leaving the page
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

        if (!res.ok) throw new Error(`Netlify submit failed: ${res.status}`);

        contactForm.innerHTML = `
          <div style="padding:12px 4px;">
            <h3 style="margin:0 0 8px 0;">Sent ✅</h3>
            <p class="muted" style="margin:0;">Your message reached Mr. Distort. I’ll get back to you ASAP.</p>
          </div>
        `;
      } catch (err) {
        console.error(err);
        alert("Something went wrong sending the message. Please try again.");
      }
    });
  }

  // =========
  // Guest Book Modal (Netlify Forms)
  // =========
  const guestBookModal = document.getElementById("guestBookModal");
  const openGuestBookModalBtn = document.getElementById("openGuestBookModal");
  const closeGuestBookModalBtn = document.getElementById("closeGuestBookModal");
  const guestBookForm = document.getElementById("guestBookForm");

  if (openGuestBookModalBtn) {
    openGuestBookModalBtn.style.cursor = "pointer";
    openGuestBookModalBtn.addEventListener("click", () => openModal(guestBookModal));
  }

  if (closeGuestBookModalBtn) {
    closeGuestBookModalBtn.addEventListener("click", () => closeModal(guestBookModal));
  }

  // Submit Guest Book Form to Netlify without leaving the page
  if (guestBookForm) {
    guestBookForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
        const formData = new FormData(guestBookForm);
        const body = new URLSearchParams(formData).toString();

        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body
        });

        if (!res.ok) throw new Error(`Netlify submit failed: ${res.status}`);

        guestBookForm.innerHTML = `
          <div style="padding:12px 4px;">
            <h3 style="margin:0 0 8px 0;">Welcome to the Distorted Realm! ✅</h3>
            <p class="muted" style="margin:0;">
              Thanks for signing the Guest Book. Hope to see you around the community!
            </p>
          </div>
        `;
      } catch (err) {
        console.error(err);
        alert("Something went wrong signing the guest book. Please try again.");
      }
    });
  }

  // =========
  // Subathon Modal
  // =========
  const subathonImages = [
    "images/subathon1.png",
    "images/subathon2.png"
  ];

  let subIndex = 0;
  const subathonModal = document.getElementById("subathonModal");
  const openSubathonModalBtn = document.getElementById("openSubathonModal");
  const closeSubathonModalBtn = document.getElementById("closeSubathonModal");
  const subathonImg = document.getElementById("subathonImg");
  const subDots = document.querySelectorAll(".sub-dot");
  const subLeft = document.querySelector(".sub-left");
  const subRight = document.querySelector(".sub-right");

  function renderSubathon() {
    if (subathonImg) subathonImg.src = subathonImages[subIndex];
    subDots.forEach((d, i) => d.classList.toggle("active", i === subIndex));
  }

  if (subLeft) subLeft.addEventListener("click", () => {
    subIndex = (subIndex - 1 + subathonImages.length) % subathonImages.length;
    renderSubathon();
  });

  if (subRight) subRight.addEventListener("click", () => {
    subIndex = (subIndex + 1) % subathonImages.length;
    renderSubathon();
  });

  subDots.forEach(dot => {
    dot.addEventListener("click", () => {
      subIndex = parseInt(dot.dataset.index);
      renderSubathon();
    });
  });

  if (openSubathonModalBtn) {
    openSubathonModalBtn.addEventListener("click", () => {
      subIndex = 0;
      renderSubathon();
      openModal(subathonModal);
    });
  }

  if (closeSubathonModalBtn) {
    closeSubathonModalBtn.addEventListener("click", () => closeModal(subathonModal));
  }

  window.addEventListener("click", (e) => {
    if (e.target === subathonModal) closeModal(subathonModal);
  });

  // Close modals when clicking outside
 window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(affiliateModal);
      closeModal(contactModal);
      closeModal(guestBookModal);
      closeModal(subathonModal);
    }
  });

  // ESC closes modals
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(affiliateModal);
      closeModal(contactModal);
      closeModal(guestBookModal);
      closeModal(subathonModal);
    }
  });
});
