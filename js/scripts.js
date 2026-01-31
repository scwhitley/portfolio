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

  function brandIconClass(brand) {
    switch (brand) {
      case "twitch": return "icon-twitch";
      case "tiktok": return "icon-tiktok";
      case "instagram": return "icon-instagram";
      case "youtube": return "icon-youtube";
      default: return "";
    }
  }

  // =========
  // Phase 1 Stats (manual)
  // =========
  const platformStats = [
    { platform: "Twitch", brand: "twitch", value: "371", label: "Followers" },
    { platform: "Kick", brand: "kick", value: "19", label: "Followers" },
    { platform: "TikTok", brand: "tiktok", value: "157", label: "Followers" },
    { platform: "Instagram", brand: "instagram", value: "85", label: "Followers" },
    { platform: "YouTube", brand: "youtube", value: "462", label: "Subscribers" },
  ];

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
      <div class="stat-platform">
        ${iconHtml}
        <span>${s.platform}</span>
      </div>
      <div class="stat-number">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    `;
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
  // Merch carousel (with error fallback)
  // =========
  // IMPORTANT: GitHub Pages is case-sensitive.
  // Make sure these EXACT filenames exist:
  // images/merch/coffee.png
  // images/merch/crewneck.png
  // images/merch/cropped.png
  // images/merch/shirt.png
  const merchItems = [
    { title: "Logo Mug", img: "images/merch/coffee.png", url: "https://mr-distort-shop.fourthwall.com" },
    { title: "Crewneck", img: "images/merch/crewneck.png", url: "https://mr-distort-shop.fourthwall.com" },
    { title: "Cropped Hoodie", img: "images/merch/cropped.png", url: "https://mr-distort-shop.fourthwall.com" },
    { title: "T-Shirt", img: "images/merch/shirt.png", url: "https://mr-distort-shop.fourthwall.com" },
  ];

  let merchIndex = 0;
  const merchStage = document.getElementById("merchStage");
  const merchLeft = document.querySelector(".merch-left");
  const merchRight = document.querySelector(".merch-right");

  function renderMerch() {
    if (!merchStage) return;
    const item = merchItems[merchIndex];

    merchStage.innerHTML = `
      <a href="${item.url}" target="_blank" rel="noopener" style="text-decoration:none; width:100%;">
        <img class="merch-image" src="${item.img}" alt="${item.title}">
      </a>
      <div class="merch-title">${item.title}</div>
      <div class="muted">Tap image to view</div>
    `;

    // Add error fallback so you can SEE broken paths
    const imgEl = merchStage.querySelector("img");
    if (imgEl) {
      imgEl.onerror = () => {
        console.warn("[Merch image failed to load]", item.img);
        merchStage.innerHTML = `
          <div class="merch-title">${item.title}</div>
          <div class="muted">Image not found:</div>
          <div class="muted" style="word-break:break-all;">${item.img}</div>
          <div class="muted">Fix the filename/folder in your repo and refresh.</div>
        `;
      };
    }
  }

  if (merchLeft) merchLeft.addEventListener("click", () => {
    merchIndex = (merchIndex - 1 + merchItems.length) % merchItems.length;
    renderMerch();
  });

  if (merchRight) merchRight.addEventListener("click", () => {
    merchIndex = (merchIndex + 1) % merchItems.length;
    renderMerch();
  });

  renderMerch();

  // =========
  // Affiliate Modal (unchanged HTML; CSS restored above)
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
  // Contact Modal + Phase 1 mailto
  // =========
  const contactModal = document.getElementById("contactModal");
  const openContactModal = document.getElementById("openContactModal");
  const closeContactModal = document.getElementById("closeContactModal");
  const contactForm = document.getElementById("contactForm");

  if (openContactModal) openContactModal.addEventListener("click", () => openModal(contactModal));
  if (closeContactModal) closeContactModal.addEventListener("click", () => closeModal(contactModal));

  window.addEventListener("click", (e) => {
    if (e.target === affiliateModal) closeModal(affiliateModal);
    if (e.target === contactModal) closeModal(contactModal);
  });

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

      const to = "yourbusiness@email.com"; // <-- change this
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

      closeModal(contactModal);
      contactForm.reset();
    });
  }
});
