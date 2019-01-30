function loadControls() {
    var sitewideHeader = document.getElementById('sitewide-header'),
    widthOfWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    headerAnchors = sitewideHeader.getElementsByTagName('a'),
    headerButtons = sitewideHeader.getElementsByTagName('button'),
    menuButton = document.getElementById('menu-button'),
    mainNavigation = document.getElementById('toggled-navigation');
    titleSpan = document.getElementById('title-span');
    if (widthOfWindow < 768) {
        titleSpan.setAttribute('aria-hidden', 'false');
    }
    for (var i = headerAnchors.length - 1; i >= 0; i--) {
        headerAnchors[i].addEventListener('click', anchorClick);
    }
    for (var i = headerButtons.length - 1; i >= 0; i--) {
        headerButtons[i].addEventListener('click', buttonClick);
    }
    window.addEventListener('resize', debounce(checkAria, 100));
    window.addEventListener('scroll', debounce(backToTop, 100));
}

function anchorClick() {
    var sitewideHeader = document.getElementById('sitewide-header'),
    widthOfWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    mainNavigation = document.getElementById('toggled-navigation'),
    subMenus = mainNavigation.getElementsByTagName('ul'),
    dropdownButtons = mainNavigation.getElementsByTagName('button'),
    headerButtons = sitewideHeader.getElementsByTagName('button');
    mainNavigation.setAttribute('aria-hidden', 'true'),
    titleSpan = document.getElementById('title-span');
    if (widthOfWindow > 768) {
        titleSpan.setAttribute('aria-hidden', 'true');
    }
    for (var i = subMenus.length - 1; i >= 0; i--) {
        subMenus[i].setAttribute('aria-hidden', 'true');
    }
    for (var i = headerButtons.length - 1; i >= 0; i--) {
        headerButtons[i].setAttribute('aria-expanded', 'false');
    }
}

function buttonClick(e) {
    var clickTarget = e.target,
    widthOfWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    ariaControls = clickTarget.getAttribute('aria-controls'),
    controlledAria = document.getElementById(ariaControls),
    ariaHidden = controlledAria.getAttribute('aria-hidden'),
    titleSpan = document.getElementById('title-span');
    if (ariaHidden == 'true') {
        controlledAria.setAttribute('aria-hidden', 'false');
        clickTarget.setAttribute('aria-expanded', 'true');
        if (widthOfWindow > 768) {
            titleSpan.setAttribute('aria-hidden', 'false');
        }
    } else {
        controlledAria.setAttribute('aria-hidden', 'true');
        clickTarget.setAttribute('aria-expanded', 'false');
        if (widthOfWindow > 768) {
            titleSpan.setAttribute('aria-hidden', 'true');
        }
    }
}

function checkAria() {
    var widthOfWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    sitewideHeader = document.getElementById('sitewide-header'),
    navigationContainer = document.getElementById('navigation-container'),
    mainNavigation = document.getElementById('toggled-navigation'),
    headerButtons = sitewideHeader.getElementsByTagName('button'),
    navigationMenus = navigationContainer.getElementsByTagName('ul'),
    dropdownButtons = mainNavigation.getElementsByTagName('button'),
    subMenus = mainNavigation.getElementsByTagName('ul'),
    titleSpan = document.getElementById('title-span');
    if (widthOfWindow < 768) {
        titleSpan.setAttribute('aria-hidden', 'false');
        for (var i = navigationMenus.length - 1; i >= 0; i--) {
            navigationMenus[i].setAttribute('aria-hidden', 'true');
        }
        for (var i = headerButtons.length - 1; i >= 0; i--) {
            headerButtons[i].setAttribute('aria-expanded', 'false');
        }
    } else {
        titleSpan.setAttribute('aria-hidden', 'true');
    }
}

function backToTop() {
    var topButton = document.getElementById('top-button');
    if (document.documentElement.scrollTop > window.innerHeight) {
        topButton.classList.add('show');
    } else {
        topButton.classList.remove('show');
    }
}

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if ( !immediate ) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 200);
        if ( callNow ) { 
            func.apply(context, args);
        }
    };
};

window.onload = loadControls;

