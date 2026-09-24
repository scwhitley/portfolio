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
        if (entry.isIntersecting &&
