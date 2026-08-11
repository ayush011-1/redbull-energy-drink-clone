const menuButton = document.querySelector('.menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const searchButton = document.querySelector('.search-btn');
const searchPanel = document.querySelector('.search-panel');
const searchClose = document.querySelector('.search-close');
menuButton.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.mobile-nav a').forEach(link => link.addEventListener('click', () => mobileNav.classList.remove('open')));
searchButton.addEventListener('click', () => {
  searchPanel.classList.add('open');
  searchPanel.setAttribute('aria-hidden', 'false');
  document.querySelector('#site-search').focus();
});
searchClose.addEventListener('click', () => {
  searchPanel.classList.remove('open');
  searchPanel.setAttribute('aria-hidden', 'true');
  searchButton.focus();
});
searchPanel.addEventListener('click', event => { if (event.target === searchPanel) searchClose.click(); });

document.querySelectorAll('.size').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.size').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
}));

document.querySelectorAll('.ingredient-toggle').forEach(toggle => toggle.addEventListener('click', () => {
  const item = toggle.closest('.ingredient');
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.ingredient').forEach(entry => {
    entry.classList.remove('open');
    entry.querySelector('b').textContent = '+';
  });
  if (!wasOpen) {
    item.classList.add('open');
    item.querySelector('b').textContent = '−';
  }
}));

const rail = document.querySelector('#productRail');
document.querySelector('#next').addEventListener('click', () => rail.scrollBy({ left: rail.clientWidth * .78, behavior: 'smooth' }));
document.querySelector('#prev').addEventListener('click', () => rail.scrollBy({ left: -rail.clientWidth * .78, behavior: 'smooth' }));

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const hero = document.querySelector('.hero');
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const range = (value, start, end) => clamp((value - start) / (end - start));
const mix = (a, b, amount) => a + (b - a) * amount;

function updateHero() {
  const rect = hero.getBoundingClientRect();
  const progress = clamp(-rect.top / (hero.offsetHeight - window.innerHeight));
  const move = range(progress, 0, .48);
  const exit = range(progress, .56, .76);
  const returnCan = range(progress, .78, .96);
  hero.style.setProperty('--can-x', `${mix(27, 71, move)}%`);
  hero.style.setProperty('--can-size', `${mix(94, 57, move)}vh`);
  hero.style.setProperty('--can-opacity', progress < .56 ? 1 : (progress < .76 ? 1 - exit : returnCan));
  hero.style.setProperty('--title-opacity', 1 - range(progress, .08, .31));
  hero.style.setProperty('--copy-opacity', range(progress, .12, .30) * (1 - range(progress, .56, .73)));
  hero.style.setProperty('--vital-opacity', range(progress, .58, .74));
  hero.style.setProperty('--vital-y', `${mix(24, 0, range(progress, .58, .74))}px`);
}

updateHero();
window.addEventListener('scroll', updateHero, { passive: true });
window.addEventListener('resize', updateHero);
