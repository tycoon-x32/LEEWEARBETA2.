// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
}

let deferredInstallPrompt = null;
let pwaBannerTimeout = null;
const pwaStandaloneQuery = window.matchMedia('(display-mode: standalone)');

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
}

function showPWAInstallBanner() {
    if (pwaStandaloneQuery.matches || navigator.standalone === true) return;

    let banner = document.getElementById('pwa-install-banner');
    if (!banner) {
        banner = document.createElement('aside');
        banner.id = 'pwa-install-banner';
        banner.className = 'pwa-install-banner';
        banner.setAttribute('aria-label', 'Install LEEWEAR');
        banner.innerHTML = `
            <div class="pwa-install-content">
                <span class="pwa-install-eyebrow">LEEWEAR / YOUR APP</span>
                <strong class="pwa-install-title">Fashion, one tap away.</strong>
                <span class="pwa-install-message" id="pwa-install-message" aria-live="polite">
                    Add LEEWEAR to your home screen for quick access.
                </span>
                <div class="pwa-install-actions">
                    <button id="install-app-btn" class="pwa-install-button" type="button">Install app</button>
                    <button id="close-install-btn" class="pwa-install-close" type="button" aria-label="Dismiss install invitation">×</button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);
        document.getElementById('install-app-btn').addEventListener('click', async () => {
            if (!deferredInstallPrompt) {
                const message = document.getElementById('pwa-install-message');
                const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
                message.textContent = isIOS
                    ? 'In Safari, tap Share, then “Add to Home Screen”.'
                    : 'Open your browser menu and choose “Install app” or “Add to Home Screen”.';
                resetPWAInstallBannerTimeout();
                return;
            }

            const installPrompt = deferredInstallPrompt;
            deferredInstallPrompt = null;
            try {
                await installPrompt.prompt();
                const choiceResult = await installPrompt.userChoice;
                if (choiceResult.outcome === 'accepted') {
                    removePWAInstallBanner();
                } else {
                    deferredInstallPrompt = installPrompt;
                    resetPWAInstallBannerTimeout();
                }
            } catch (error) {
                deferredInstallPrompt = installPrompt;
                const message = document.getElementById('pwa-install-message');
                message.textContent = 'Installation could not open. Use your browser menu to install LEEWEAR.';
                resetPWAInstallBannerTimeout();
            }
        });

        document.getElementById('close-install-btn').addEventListener('click', removePWAInstallBanner);
    }

    banner.classList.remove('is-leaving');
    requestAnimationFrame(() => banner.classList.add('is-visible'));
    resetPWAInstallBannerTimeout();
}

function resetPWAInstallBannerTimeout() {
    window.clearTimeout(pwaBannerTimeout);
    pwaBannerTimeout = window.setTimeout(removePWAInstallBanner, 5000);
}

function removePWAInstallBanner() {
    window.clearTimeout(pwaBannerTimeout);
    const banner = document.getElementById('pwa-install-banner');
    if (!banner) return;

    banner.classList.remove('is-visible');
    banner.classList.add('is-leaving');
    window.setTimeout(() => banner.remove(), 220);
}

window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredInstallPrompt = event;
    showPWAInstallBanner();
});

window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    removePWAInstallBanner();
});

function getSeasonalCampaign(date = new Date()) {
    const month = date.getMonth();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const southernHemisphere = /^(Africa\/(Johannesburg|Cape_Town)|Australia\/|Pacific\/(Auckland|Fiji)|America\/(Argentina|Sao_Paulo|Santiago|Montevideo))/.test(timeZone);

    if (month === 10 || month === 11) {
        return {
            id: 'festive',
            label: 'Festive Season',
            title: 'CELEBRATE',
            accent: 'In LeeWear.',
            offer: 'LEEWEAR FESTIVE SEASON / UP TO 50% OFF OR 80% OFF WITH SHOPLEEWEAR80',
            palette: ['#6d1428', '#a52a3e', '#e5bf7d'],
            gift: '🎅',
        };
    }
    if (month === 0) {
        return {
            id: 'new-year',
            label: 'New Year',
            title: 'NEW YEAR',
            accent: 'New Looks.',
            offer: 'LEEWEAR NEW YEAR EDIT / UP TO 50% OFF OR 80% OFF WITH SHOPLEEWEAR80',
            palette: ['#172440', '#304a78', '#d6bd82'],
            gift: '🎁',
        };
    }
    if (month === 1) {
        return {
            id: 'love',
            label: 'Love Your Look',
            title: 'LOVE',
            accent: 'Your Look.',
            offer: 'LEEWEAR LOVE YOUR LOOK EDIT / CLOTHING, SHOES & ACCESSORIES',
            palette: ['#42142d', '#9d315f', '#f1b1c8'],
            gift: '💝',
        };
    }

    const northernSeasons = [
        ['winter', 'Winter Style', 'LAYER UP', 'In LeeWear.', ['#192639', '#40536a', '#c6d7e5']],
        ['winter', 'Winter Style', 'LAYER UP', 'In LeeWear.', ['#192639', '#40536a', '#c6d7e5']],
        ['spring', 'Spring Collection', 'FRESH', 'For Spring.', ['#123a2d', '#267353', '#c5dc96']],
        ['spring', 'Spring Collection', 'FRESH', 'For Spring.', ['#123a2d', '#267353', '#c5dc96']],
        ['spring', 'Spring Collection', 'FRESH', 'For Spring.', ['#123a2d', '#267353', '#c5dc96']],
        ['summer', 'Summer Collection', 'MAKE', 'A Statement.', ['#12323c', '#14788a', '#f0c46b']],
        ['summer', 'Summer Collection', 'MAKE', 'A Statement.', ['#12323c', '#14788a', '#f0c46b']],
        ['summer', 'Summer Collection', 'MAKE', 'A Statement.', ['#12323c', '#14788a', '#f0c46b']],
        ['autumn', 'Autumn Essentials', 'OWN', 'Your Season.', ['#3e2013', '#9a4f23', '#e5b97c']],
        ['autumn', 'Autumn Essentials', 'OWN', 'Your Season.', ['#3e2013', '#9a4f23', '#e5b97c']],
    ];
    const southernSeasons = [
        ['summer', 'Summer Collection', 'MAKE', 'A Statement.', ['#12323c', '#14788a', '#f0c46b']],
        ['summer', 'Summer Collection', 'MAKE', 'A Statement.', ['#12323c', '#14788a', '#f0c46b']],
        ['autumn', 'Autumn Essentials', 'OWN', 'Your Season.', ['#3e2013', '#9a4f23', '#e5b97c']],
        ['autumn', 'Autumn Essentials', 'OWN', 'Your Season.', ['#3e2013', '#9a4f23', '#e5b97c']],
        ['autumn', 'Autumn Essentials', 'OWN', 'Your Season.', ['#3e2013', '#9a4f23', '#e5b97c']],
        ['winter', 'Winter Style', 'LAYER UP', 'In LeeWear.', ['#192639', '#40536a', '#c6d7e5']],
        ['winter', 'Winter Style', 'LAYER UP', 'In LeeWear.', ['#192639', '#40536a', '#c6d7e5']],
        ['winter', 'Winter Style', 'LAYER UP', 'In LeeWear.', ['#192639', '#40536a', '#c6d7e5']],
        ['spring', 'Spring Collection', 'FRESH', 'For Spring.', ['#123a2d', '#267353', '#c5dc96']],
        ['spring', 'Spring Collection', 'FRESH', 'For Spring.', ['#123a2d', '#267353', '#c5dc96']],
    ];
    const season = (southernHemisphere ? southernSeasons : northernSeasons)[month];

    return {
        id: season[0],
        label: season[1],
        title: season[2],
        accent: season[3],
        offer: `LEEWEAR ${season[1].toUpperCase()} / EXPLORE CLOTHING, FOOTWEAR & ACCESSORIES`,
        palette: season[4],
        gift: '🎁',
    };
}

function initSeasonalCampaign() {
    const campaign = getSeasonalCampaign();
    const root = document.documentElement;
    root.dataset.season = campaign.id;
    root.style.setProperty('--season-deep', campaign.palette[0]);
    root.style.setProperty('--season-primary', campaign.palette[1]);
    root.style.setProperty('--orange', campaign.palette[2]);
    root.style.setProperty('--season-accent', campaign.palette[2]);

    const announcement = document.querySelector('.christmas-banner, .shop-christmas-banner');
    if (announcement) announcement.textContent = campaign.offer;

    const marquee = document.getElementById('seasonal-marquee');
    if (marquee) {
        marquee.setAttribute('aria-label', `LEEWEAR ${campaign.label} collection`);
        const messages = [
            `LEEWEAR ${campaign.label.toUpperCase()}`,
            'UP TO 50% OFF',
            'SHOPLEEWEAR80 FOR 80% OFF',
            'MEN’S, WOMEN’S & ACCESSORIES',
        ];
        marquee.querySelectorAll('.marquee-track span').forEach((item, index) => {
            const icon = document.createElement('b');
            icon.textContent = '✦';
            item.replaceChildren(icon, document.createTextNode(` ${messages[index % messages.length]}`));
        });
    }

    const slideContent = [
        {
            eyebrow: `${campaign.label} styles for everyone`,
            title: campaign.title,
            accent: campaign.accent,
            description: `Explore ${campaign.label.toLowerCase()} styles across LEEWEAR men's and women's collections, from everyday clothing to shoes, activewear and accessories.`,
            cta: `Shop ${campaign.label} →`,
            caption: 'Clothing, footwear and accessories in one place.',
        },
        {
            eyebrow: `Explore the ${campaign.label.toLowerCase()} collection`,
            title: 'FIND',
            accent: 'Your New Look.',
            description: `Shop men's and women's clothing, including pajamas, flared two-piece sets, workout wear, shoes and everyday essentials.`,
            cta: 'Shop Women’s Looks →',
            caption: 'New looks across the LEEWEAR collection.',
        },
        {
            eyebrow: 'Tailored looks for every occasion',
            title: 'OWN',
            accent: 'Your Look.',
            description: 'Discover LEEWEAR men’s three-piece suits, alongside smart shirts, shoes and tailored occasion wear.',
            cta: 'Explore Men’s Formalwear →',
            caption: 'Three-piece suits from KSH 10,000 to KSH 300,000.',
        },
    ];

    document.querySelectorAll('[data-hero-slide]').forEach((slide, index) => {
        const content = slideContent[index];
        if (!content) return;
        slide.querySelector('[data-seasonal-eyebrow]').textContent = content.eyebrow;
        slide.querySelector('[data-seasonal-title]').textContent = content.title;
        slide.querySelector('[data-seasonal-accent]').textContent = content.accent;
        slide.querySelector('[data-seasonal-description]').textContent = content.description;
        slide.querySelector('[data-seasonal-cta]').textContent = content.cta;
        slide.querySelector('[data-seasonal-caption]').textContent = content.caption;
    });

    const seasonalValues = {
        '#seasonal-section-tag': `01 / ${campaign.label}`,
        '#seasonal-section-title': `${campaign.label} for Everyone.`,
        '#seasonal-closing-tag': `03 / ${campaign.label}`,
        '#seasonal-gift-icon': campaign.gift,
        '#seasonal-gift-heading': `${campaign.label}: 80% off`,
        '#seasonal-gift-copy': 'Enter your LEEWEAR code at checkout.',
    };

    Object.entries(seasonalValues).forEach(([selector, value]) => {
        document.querySelectorAll(selector).forEach(element => {
            element.textContent = value;
        });
    });

    const pageDescription = 'Shop LEEWEAR men’s and women’s clothing, tailored three-piece suits, pajamas, workout sets, shoes, watches, glasses and beauty tools.';
    document.title = `LEEWEAR ${campaign.label} Fashion | Men, Women & Accessories`;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) descriptionTag.content = pageDescription;

    const socialTitle = document.querySelector('meta[property="og:title"]');
    if (socialTitle) socialTitle.content = document.title;
    const socialDescription = document.querySelector('meta[property="og:description"]');
    if (socialDescription) socialDescription.content = pageDescription;
}

function initCampaignCarousel() {
    const hero = document.querySelector('.hero');
    const slides = Array.from(document.querySelectorAll('[data-hero-slide]'));
    if (!hero || slides.length < 2) return;

    const dots = Array.from(document.querySelectorAll('[data-carousel-dot]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let activeIndex = 0;
    let timer;

    function showSlide(index) {
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === activeIndex;
            slide.classList.toggle('is-active', isActive);
            slide.setAttribute('aria-hidden', String(!isActive));
        });
        dots.forEach((dot, dotIndex) => {
            dot.setAttribute('aria-current', String(dotIndex === activeIndex));
        });
    }

    function stopRotation() {
        window.clearInterval(timer);
    }

    function startRotation() {
        stopRotation();
        if (!reducedMotion && !document.hidden) {
            timer = window.setInterval(() => showSlide(activeIndex + 1), 6500);
        }
    }

    document.querySelector('[data-carousel-prev]').addEventListener('click', () => {
        showSlide(activeIndex - 1);
        startRotation();
    });
    document.querySelector('[data-carousel-next]').addEventListener('click', () => {
        showSlide(activeIndex + 1);
        startRotation();
    });
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startRotation();
        });
    });

    hero.addEventListener('mouseenter', stopRotation);
    hero.addEventListener('mouseleave', startRotation);
    hero.addEventListener('focusin', stopRotation);
    hero.addEventListener('focusout', event => {
        if (!hero.contains(event.relatedTarget)) startRotation();
    });
    document.addEventListener('visibilitychange', startRotation);
    startRotation();
}

function initPWA() {
    window.setTimeout(showPWAInstallBanner, 250);

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').catch(() => {
                // Service worker registration failed
            });
        });
    }
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.remove('active');
        });
    });

    initSeasonalCampaign();
    window.setInterval(initSeasonalCampaign, 60 * 60 * 1000);
    window.addEventListener('focus', initSeasonalCampaign);
    initCampaignCarousel();
    initPWA();
});
