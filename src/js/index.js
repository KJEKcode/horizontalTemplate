// -- VARIABLES --

const getWindowWidth = () => {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

const getSitewideHeader = () => {
    return document.getElementById('sitewide-header');
}

const getHeaderAnchor = () => {
    return getSitewideHeader().getElementsByTagName('a');
}

const getHeaderButton = () => {
    return getSitewideHeader().getElementsByTagName('button');
}

const getToggledNavigation = () => {
    return document.getElementById('toggled-navigation');
}

const getSubMenu = () => {
    return getToggledNavigation().getElementsByTagName('ul');
}

const getDropdownButton = () => {
    return getToggledNavigation().getElementsByTagName('button');
}

const getNavigationContainer = () => {
    return document.getElementById('navigation-container');
}

const getAllNavMenu = () => {
    return getNavigationContainer().getElementsByTagName('ul');
}

const getTitleSpan = () => {
    return document.getElementById('title-span');
}

const getTopButton = () => {
    return document.getElementById('top-button');
}

// -- EVENT LISTENERS --

window.addEventListener('resize', debounce(checkAria), 75);

window.addEventListener('scroll', debounce(backToTop), 75);

for (var i = getHeaderAnchor().length - 1; i >= 0; i--) {
    getHeaderAnchor()[i].addEventListener('click', anchorClick);
}

for (var i = getHeaderButton().length - 1; i >= 0; i--) {
    getHeaderButton()[i].addEventListener('click', buttonClick);
}

// -- REUSABLE FUNCTIONS --

// -- TITLE SPAN --
const titleSpanTrue = () => {
    getTitleSpan().setAttribute('aria-hidden', 'true');
}

const titleSpanFalse = () => {
    getTitleSpan().setAttribute('aria-hidden', 'false');
}

// -- WINDOW LOAD --

window.onload = checkTitleSpan;

function checkTitleSpan() {
    if (getWindowWidth() < 768) {
        titleSpanFalse();
    }
}

// -- CLOSE NAVIGATION --

const closeNavigation = () => {
    if (getWindowWidth() > 768) {
        titleSpanTrue();
    }
    getToggledNavigation().setAttribute('aria-hidden', 'true');
    for (var i = getSubMenu().length - 1; i >= 0; i--) {
        getSubMenu()[i].setAttribute('aria-hidden', 'true');
    }
    for (var i = getHeaderButton().length - 1; i >= 0; i--) {
        getHeaderButton()[i].setAttribute('aria-expanded', 'false');
    }
}

// -- TOGGLE TARGET MENU --

const toggleTargetMenu = (target) => {
    let ariaControls = target.getAttribute('aria-controls'),
    controlledAria = document.getElementById(ariaControls),
    ariaHidden = controlledAria.getAttribute('aria-hidden');
    if (ariaHidden == 'true') {
        controlledAria.setAttribute('aria-hidden', 'false');
        target.setAttribute('aria-expanded', 'true');
        if (getWindowWidth() > 768) {
            titleSpanFalse();
        }
    } else {
        controlledAria.setAttribute('aria-hidden', 'true');
        target.setAttribute('aria-expanded', 'false');
        if (getWindowWidth() > 768) {
            titleSpanTrue();
        }
    }
}

// -- ANCHOR CLICK --

function anchorClick() {
    closeNavigation();    
}

// -- BUTTON CLICK --

function buttonClick({ target }) {
    toggleTargetMenu(target);
}

function checkAria() {
    if (getWindowWidth() < 768) {
        titleSpanFalse();
        for (var i = getAllNavMenu().length - 1; i >= 0; i--) {
            getAllNavMenu()[i].setAttribute('aria-hidden', 'true');
        }
        for (var i = getHeaderButton().length - 1; i >= 0; i--) {
            getHeaderButton()[i].setAttribute('aria-expanded', 'false');
        }
    } else {
        let menuAria = getToggledNavigation().getAttribute('aria-hidden');
        if (menuAria === 'true') {
            titleSpanTrue();
        }
    }
}

function backToTop() {
    if (document.documentElement.scrollTop > window.innerHeight) {
        getTopButton().classList.add('show');
    } else {
        getTopButton().classList.remove('show');
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
        timeout = setTimeout(later, wait || 100);
        if ( callNow ) { 
            func.apply(context, args);
        }
    };
};



