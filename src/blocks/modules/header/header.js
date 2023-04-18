// Fixed element
const header = document.querySelector('#header');

// Navigation links
const links = document.querySelectorAll('.navigation__item a[href^="#"]');

// Intersection Observer to track scroll position and add "navigation__item_active" class to corresponding link
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.navigation__item a[href="#${id}"]`);
    if (entry.isIntersecting) {
      link.classList.add('navigation__item_active');
    } else {
      link.classList.remove('navigation__item_active');
    }
  });
}, {
  rootMargin: `-${header.offsetHeight}px 0px -${window.innerHeight - header.offsetHeight}px 0px`
});

// Attach observer to each section
document.querySelectorAll('section[id]').forEach(section => {
  observer.observe(section);
});

// Scroll event handler to add active class to navigation link when target element is in the center of the screen
window.addEventListener('scroll', function() {
  const windowHeight = window.innerHeight;
  const center = windowHeight / 1.7;
  const sections = document.querySelectorAll('section[id], footer[id], header[id]');
  sections.forEach(section => {
    const id = section.getAttribute('id');
    const link = document.querySelector(`.navigation__item a[href="#${id}"]`);
    const rect = section.getBoundingClientRect();
    if (rect.top <= center && rect.bottom >= center) {
      links.forEach(l => l.classList.remove('navigation__item_active'));
      link.classList.add('navigation__item_active');
    }
  });
  if (lastLink && lastLink !== links[links.length - 1]) {
    links.forEach(l => l.classList.remove('navigation__item_active'));
    links[links.length - 1].classList.add('navigation__item_active');
  }
});
