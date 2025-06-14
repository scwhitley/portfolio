document.addEventListener("DOMContentLoaded", function () {
  // Work Experience Carousel
  const workExperiences = [
    {
      date: "June 2025 – Present",
      title: "Customer Success Manager - Automation",
      company: "IBM",
      description: "Guide customers through onboarding and ongoing support to ensure effective use of IBM products. Leverage IBM tools and monitoring adoption to help drive continuous improvement and long-term success."
    },
    {
      date: "June 2023 – May 2025",
      title: "Systems Analyst I",
      company: "Fidelity Investments",
      description: "Led cross-functional coordination and managed program execution to deliver projects on time and within budget, including legacy-to-cloud migrations."
    },
    {
      date: "January 2020 – January 2023",
      title: "Technical Consulting Engineer",
      company: "Cisco Systems",
      description: "Led technical support for 1,000+ customer cases and delivered consulting for key project deployments. Streamlined troubleshooting through improved documentation and cross-functional collaboration on automation and crisis response."
    },
    {
      date: "February 2016 – December 2019",
      title: "Retail Sales Consultant",
      company: "AT&T",
      description: "Strengthened customer engagement through customized solutions and cross-team coordination, ensuring high adoption and satisfaction. Surpassed sales targets and contributed to strategic brand initiatives through outreach programs."
    }
  ];

  const workCarousel = document.querySelector(".work-content");
  const workLeft = document.querySelector(".work-left");
  const workRight = document.querySelector(".work-right");

  let workIndex = 0;

  function updateWorkContent() {
    const exp = workExperiences[workIndex];
    workCarousel.innerHTML = `
      <div class="work-item">
        <p class="work-title">${exp.title}</p>
        <p class="work-company">${exp.company}</p>
        <p class="work-date">${exp.date}</p>
        <p class="work-desc">${exp.description}</p>
      </div>
    `;
  }

  workLeft?.addEventListener("click", () => {
    workIndex = (workIndex - 1 + workExperiences.length) % workExperiences.length;
    updateWorkContent();
  });

  workRight?.addEventListener("click", () => {
    workIndex = (workIndex + 1) % workExperiences.length;
    updateWorkContent();
  });

  updateWorkContent();

  // Education Carousel
  const educationItems = [
    {
      degree: "<em>Master of Information Science</em>",
      school: "<strong>North Carolina Central University</strong>",
      date: "Graduated: December 2019",
      achievements: `
        <br><strong>Activities and Achievements</strong><br>
        School of Library and Information Science Visionary Award
      `
    },
    {
      degree: "<em>Bachelors of Science in Marketing</em>",
      school: "<strong>Wingate University</strong>",
      date: "Graduated: May 2011",
      achievements: `
        <br><strong>Activities and Achievements</strong><br>
        Phi Beta Sigma Fraternity, Inc.<br>
        Delta Sigma Pi, International Business Fraternity<br>
        2009–2010 Dean's List
      `
    }
  ];

  const eduCarousel = document.querySelector(".edu-content");
  const eduLeft = document.querySelector(".edu-left");
  const eduRight = document.querySelector(".edu-right");

  let eduIndex = 0;

  function updateEducationContent() {
    const edu = educationItems[eduIndex];
    eduCarousel.innerHTML = `
      <div class="education-item">
        <h3>${edu.degree}</h3>
        <p>${edu.school}</p>
        <small>${edu.date}</small>
        <p>${edu.achievements}</p>
      </div>
    `;
  }

  eduLeft?.addEventListener("click", () => {
    eduIndex = (eduIndex - 1 + educationItems.length) % educationItems.length;
    updateEducationContent();
  });

  eduRight?.addEventListener("click", () => {
    eduIndex = (eduIndex + 1) % educationItems.length;
    updateEducationContent();
  });

  updateEducationContent();

  // Sneaker Carousel Modal
const sneakerItems = [
  {
    image: "../images/travis.jpeg",
    text: "Air Jordan 6: Travis Scott British Khaki"
  },
  {
    image: "../images/flint.jpeg",
    text: "Air Jordan 13: Flint"
  },
  {
    image: "../images/china.jpeg",
    text: "Air Jordan 7: Greater China"
  }
];

const sneakerModal = document.getElementById("sneakerModal");
const openSneakerBtn = document.getElementById("openSneakerModal");
const closeSneakerBtn = document.getElementById("closeSneakerModal");

const sneakerCarouselContent = document.getElementById("sneakerCarouselContent");
const sneakerLeftBtn = document.getElementById("sneakerLeft");
const sneakerRightBtn = document.getElementById("sneakerRight");

let sneakerIndex = 0;

function updateSneakerContent() {
  const item = sneakerItems[sneakerIndex];
  sneakerCarouselContent.innerHTML = `
    <img src="${item.image}" alt="Sneaker Image" class="shoe-img" />
    <p>${item.text}</p>
  `;
}

openSneakerBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  sneakerModal.style.display = "block";
  updateSneakerContent();
});

closeSneakerBtn?.addEventListener("click", () => {
  sneakerModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === sneakerModal) {
    sneakerModal.style.display = "none";
  }
});

sneakerLeftBtn?.addEventListener("click", () => {
  sneakerIndex = (sneakerIndex - 1 + sneakerItems.length) % sneakerItems.length;
  updateSneakerContent();
});

sneakerRightBtn?.addEventListener("click", () => {
  sneakerIndex = (sneakerIndex + 1) % sneakerItems.length;
  updateSneakerContent();
});


  // Modal logic for tech window
  const modal = document.getElementById("techModal");
  const openModalBtn = document.getElementById("openModal");
  const closeModalBtn = document.getElementById("closeModal");

  openModalBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  closeModalBtn?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
