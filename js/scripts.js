document.addEventListener("DOMContentLoaded", () => {
  // =========
  // Links
  // =========
  const socials = [
    { name: "Twitch", url: "https://www.twitch.tv/mrdistort", icon: "bi-twitch" },
    { name: "Kick", url: "https://www.kick.com/mr-distort", icon: "bi-lightning-charge-fill" },
    { name: "TikTok", url: "https://www.tiktok.com/@mr_distort", icon: "bi-tiktok" },
    { name: "Instagram", url: "https://www.instagram.com/mr_distort", icon: "bi-instagram" },
    { name: "YouTube", url: "https://www.youtube.com/@Mr_Distort", icon: "bi-youtube" },
    { name: "Discord", url: "https://discord.gg/uKDFg4mVqF", icon: "bi-discord" },
    { name: "Merch", url: "https://mr-distort-shop.fourthwall.com", icon: "bi-bag" },
  ];

  // Top nav
  const topNav = document.getElementById("topNav");
  if (topNav) {
    topNav.innerHTML = socials.slice(0, 6).map(s => `
      <a class="nav-link" href="${s.url}" target="_blank" rel="noopener">
        <i class="bi ${s.icon}"></i> ${s.name}
      </a>
    `).join("");
  }

  // Social links panel
  const socialLinks = document.getElementById("socialLinks");
  if (socialLinks) {
    socialLinks.innerHTML = socials.map(s => `
      <a href="${s.url}" target="_blank" rel="noopener">
        <span class="left">
          <i class="bi ${s.icon}"></i>
          <strong>${s.name}</strong>
        </span>
        <span class="muted"><i class="bi bi-box-arrow-up-right"></i></span>
      </a>
    `).join("");
  }

  // =========
  // Phase 1 Stats (manual)
  // =========
  // Update these anytime you want. Phase 2 will swap this out for a /stats API call.
  const platformStats = [
    { platform: "Twitch", icon: "bi-twitch", value: "370", label: "Followers" },
    { platform: "Kick", icon: "bi-lightning-charge-fill", value: "19", label: "Followers" },
    { platform: "TikTok", icon: "bi-tiktok", value: "151", label: "Followers" },
    { platform: "Instagram", icon: "bi-instagram", value: "85", label: "Followers" },
    { platform: "YouTube", icon: "bi-youtube", value: "462", label: "Subscribers" },
  ];

  let statIndex = 0;
  const statsContent = document.querySelector(".stats-content");
  const statsLeft = document.querySelector(".stats-left");
  const statsRight = document.querySelector(".stats-right");

  function renderStat() {
    if (!statsContent) return;
    const s = platformStats[statIndex];
    statsContent.innerHTML = `
      <div class="stat-platform">
        <i class="bi ${s.icon}"></i>
        <span>${s.platform}</span>
      </div>
      <div class="stat-number">${s.value}</div>
      <div class="stat-label">${s.label}</div>
      <div class="muted">Manual for now • Phase 2 = auto</div>
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
  // Affiliate Modal (logos + categories)
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
          blurb: "Keyboards that feel illegal"
        }
      ]
    },
    {
      category: "Energy",
      items: [
        {
          name: "Dubby Energy",
          url: "https://www.dubby.gg/discount/MRDISTORT?ref=rxvggddk",
          logo: "images/affiliates/dubby.png",
          blurb: "Energy drink for gamers"
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
          blurb: "Smart water bottle (hydration but make it tech)"
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
  const openAffiliateModal = document.getElementById("openAffiliateModal");
  const closeAffiliateModal = document.getElementById("closeAffiliateModal");

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

  if (openAffiliateModal) {
    buildAffiliateModal();
    openAffiliateModal.addEventListener("click", () => openModal(affiliateModal));
  }
  if (closeAffiliateModal) closeAffiliateModal.addEventListener("click", () => closeModal(affiliateModal));

  // =========
  // Contact Modal + Phase 1 submit (mailto)
  // =========
  const contactModal = document.getElementById("contactModal");
  const openContactModal = document.getElementById("openContactModal");
  const closeContactModal = document.getElementById("closeContactModal");
  const contactForm = document.getElementById("contactForm");

  if (openContactModal) openContactModal.addEventListener("click", () => openModal(contactModal));
  if (closeContactModal) closeContactModal.addEventListener("click", () => closeModal(contactModal));

  // Click outside modal to close
  window.addEventListener("click", (e) => {
    if (e.target === affiliateModal) closeModal(affiliateModal);
    if (e.target === contactModal) closeModal(contactModal);
  });

  // ESC to close
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(affiliateModal);
      closeModal(contactModal);
    }
  });

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(contactForm);
      const name = data.get("name");
      const email = data.get("email");
      const reason = data.get("reason");
      const message = data.get("message");

      const subject = encodeURIComponent(`[MR. DISTORT] ${reason} — ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nReason: ${reason}\n\nMessage:\n${message}\n`
      );

      // Phase 1: open email client
      // Change this email to whatever you want to receive messages at:
      const to = "mrdistort1@ mail.com";
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

      closeModal(contactModal);
      contactForm.reset();
    });
  }
});
