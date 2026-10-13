/* ---------- Mobile menu ---------- */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

function setMenu(open) {
    navbar.classList.toggle('active', open);
    menuIcon.classList.toggle('bx-x', open);
    menuIcon.classList.toggle('bx-menu', !open);
    menuIcon.setAttribute('aria-expanded', String(open));
}

menuIcon.addEventListener('click', () => setMenu(!navbar.classList.contains('active')));
navbar.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
window.addEventListener('resize', () => { if (window.innerWidth > 991) setMenu(false); });

/* ---------- About: read more ---------- */
const readBtn = document.getElementById('readBtn');
const moreText = document.getElementById('read-more');

readBtn.addEventListener('click', () => {
    const open = moreText.style.display !== 'inline';
    moreText.style.display = open ? 'inline' : 'none';
    readBtn.textContent = open ? 'Read Less' : 'Read More';
    readBtn.setAttribute('aria-expanded', String(open));
});

/* ---------- Timeline + project cards: "… Read more" ---------- */
const clampTargets = document.querySelectorAll('[data-clamp]');

clampTargets.forEach(el => {
    const card = el.closest('.timeline-content, .project-card');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'clamp-toggle';
    btn.textContent = '… Read more';
    btn.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    el.after(btn);

    btn.addEventListener('click', () => {
        const open = card.classList.toggle('expanded');
        btn.textContent = open ? 'Show less' : '… Read more';
        btn.setAttribute('aria-expanded', String(open));
        if (!open) updateClamp(el, card, btn);
    });

    el._clamp = { card, btn };
});

function updateClamp(el, card, btn) {
    if (card.classList.contains('expanded')) return;
    const clipped = el.scrollHeight > el.clientHeight + 1;
    el.classList.toggle('is-clipped', clipped);
    btn.hidden = !clipped;
}

function updateAllClamps() {
    clampTargets.forEach(el => updateClamp(el, el._clamp.card, el._clamp.btn));
}

window.addEventListener('load', updateAllClamps);
window.addEventListener('resize', updateAllClamps);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(updateAllClamps);

/* ---------- Contact: copy email ---------- */
const copyBtn = document.getElementById('copy-email');
const copyStatus = document.getElementById('copy-status');
const EMAIL = 'muhtasim01@gmail.com';

copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(EMAIL);
    } catch {
        // fallback for browsers or pages where the clipboard API isn't available
        const t = document.createElement('textarea');
        t.value = EMAIL;
        document.body.appendChild(t);
        t.select();
        document.execCommand('copy');
        t.remove();
    }
    copyStatus.textContent = 'Email copied to clipboard';
    setTimeout(() => (copyStatus.textContent = ''), 2500);
});