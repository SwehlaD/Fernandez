const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const featuredProject = document.querySelector(".featured-project");
const testimonials = document.querySelectorAll(".testimonial");
const slider = document.querySelector("[data-slider]");
const accordionTriggers = document.querySelectorAll(".accordion-trigger");
const contactForm = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");

const setHeaderState = () => {
  header.classList.toggle("scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !shouldShow);
    });

    if (featuredProject) {
      const shouldShowFeatured = filter === "all" || featuredProject.dataset.category === filter;
      featuredProject.classList.toggle("hidden", !shouldShowFeatured);
    }
  });
});

let activeTestimonial = 0;

const showTestimonial = (index) => {
  activeTestimonial = (index + testimonials.length) % testimonials.length;
  testimonials.forEach((testimonial, currentIndex) => {
    testimonial.classList.toggle("active", currentIndex === activeTestimonial);
  });
};

slider.addEventListener("click", (event) => {
  const direction = event.target.dataset.slide;

  if (!direction) return;
  showTestimonial(activeTestimonial + (direction === "next" ? 1 : -1));
});

accordionTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const panel = trigger.nextElementSibling;
    const isOpen = trigger.getAttribute("aria-expanded") === "true";

    trigger.setAttribute("aria-expanded", String(!isOpen));
    panel.classList.toggle("open", !isOpen);
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const project = formData.get("project");
  const message = formData.get("message");
  const subject = encodeURIComponent(`Project inquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nProject type: ${project}\n\n${message}`
  );

  formNote.textContent = "Opening your email app with the inquiry details.";
  window.location.href = `mailto:hello@fernandezdesignhouse.com?subject=${subject}&body=${body}`;
});
