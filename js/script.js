// =======================
//  Аккордеон
// =======================

function initAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    if (!accordions.length) return;

    accordions.forEach(accordion => {
        accordion.addEventListener('click', () => {
            const control = accordion.querySelector('.accordion__control');
            const content = accordion.querySelector('.accordion__content');

            accordion.classList.toggle('open');
            const isOpen = accordion.classList.contains('open');

            control.setAttribute('aria-expanded', isOpen);
            content.setAttribute('aria-hidden', !isOpen);
            content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : null;
        });
    });
}


// =======================
//  Hover-анимация кнопок авторизации
// =======================

function initAuthButtons() {
    const btnSignup = document.querySelector('.auth-buttons__signup');
    const btnLogin = document.querySelector('.auth-buttons__login');
    if (!btnSignup || !btnLogin) return;

    const toggleActive = hovered => {
        btnSignup.classList.toggle('active', !hovered);
        btnLogin.classList.toggle('active', hovered);
    };

    btnLogin.addEventListener('mouseenter', () => toggleActive(true));
    btnLogin.addEventListener('mouseleave', () => toggleActive(false));
}


// =======================
//  Swiper
// =======================

function initSwiper() {
    if (typeof Swiper === 'undefined') {
        console.warn('Swiper не подключён!');
        return;
    }

    new Swiper(".mySwiper", {
        centeredSlides: true,
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 2500,
            pauseOnMouseEnter: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 32,
                autoplay: {
                    delay: 2500,
                    pauseOnMouseEnter: true,
                },
            },
        },
    });
}


// =======================
//  Перемещение блока авторизации
// =======================

function initAdaptiveAuthButtons() {
    const authButtons = document.querySelector('.auth-buttons');
    const headerInner = document.querySelector('.header__inner');
    const menuWrap = document.querySelector('.menu-wrap');
    if (!authButtons || !headerInner || !menuWrap) return;

    let isMobileLayout = null;

    function move() {
        const isMobile = window.innerWidth < 1025;

        if (isMobile && isMobileLayout !== true) {
            menuWrap.appendChild(authButtons);
            isMobileLayout = true;
        }
        else if (!isMobile && isMobileLayout !== false) {
            headerInner.appendChild(authButtons);
            isMobileLayout = false;
        }
    }

    move();
    window.addEventListener('resize', move);
}


// =======================
//  Бургер
// =======================

function initBurgerMenu() {
    const burger = document.querySelector('[aria-label="Menu"]');
    const menuWrap = document.querySelector('.menu-wrap');
    if (!burger || !menuWrap) return;

    burger.addEventListener('click', () => {
        const isOpen = menuWrap.classList.contains('active');

        if (!isOpen) {
            const scrollPx = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = scrollPx + 'px';
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.paddingRight = '';
            document.body.style.overflowY = '';
        }

        burger.classList.toggle('active');
        menuWrap.classList.toggle('active');
    });
}


// =======================
//  Клонирование меню в футер
// =======================

function initFooterMenuClone() {
    const menu = document.querySelector('.menu-nav');
    const footerMenu = document.getElementById('clone-menu');
    if (!menu || !footerMenu) return;

    footerMenu.append(menu.cloneNode(true));
}


// =======================
//  Hover эффект blur меню
// =======================

function initMenuHoverBlur() {
    const items = document.querySelectorAll('.li-blur');
    if (!items.length) return;

    items.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.classList.add('active');
            items.forEach(el => el !== item && el.classList.add('active2'));
        });

        item.addEventListener('mouseout', () => {
            item.classList.remove('active');
            items.forEach(el => el !== item && el.classList.remove('active2'));
        });
    });
}


// =======================
//  Клик по пунктам меню внутри бургера
// =======================

function initMenuClickClose() {
    const burger = document.querySelector('[aria-label="Menu"]');
    const menuWrap = document.querySelector('.menu-wrap');
    const items = document.querySelectorAll('.menu-nav__list li');
    if (!burger || !menuWrap || !items.length) return;

    items.forEach(item => {
        item.addEventListener('click', () => {
            burger.classList.remove('active');
            menuWrap.classList.remove('active');
            document.body.style.paddingRight = '';
            document.body.style.overflowY = '';
        });
    });
}


// =======================
//  Запуск
// =======================

document.addEventListener('DOMContentLoaded', () => {
    initAccordions();
    initAuthButtons();
    initSwiper();
    initAdaptiveAuthButtons();
    initBurgerMenu();
    initFooterMenuClone();
    initMenuHoverBlur();
    initMenuClickClose();
});
