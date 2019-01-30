// window.onload = windowLoaded;
// window.onresize = windowResized;

// function windowLoaded() {
//     if (window.innerWidth >= 768) {
//         var navigationList = document.getElementById('navigation-list');
//         navigationList.setAttribute('aria-hidden', 'false');
//     }
//     var sitewideHeader = document.getElementById('sitewide-header'), 
//     headerLinks = sitewideHeader.getElementsByTagName('a');
//     sitewideHeader.addEventListener('click', toggleControlled);
//     for (var i = headerLinks.length - 1; i >= 0; i--) {
//         headerLinks[i].addEventListener('click', closeMenu);
//     }
// }

// function windowResized() {
//     var navigationList = document.getElementById('navigation-list');
//     if (window.innerWidth >= 768) {
//         navigationList.setAttribute('aria-hidden', 'false');
//     } else {
//         navigationList.setAttribute('aria-hidden', 'true');
//     }
// }

// function toggleControlled(e) {
//     if (e.target && e.target.nodeName == "BUTTON") {
//         var clickedButton = e.target, 
//         ariaControls = clickedButton.getAttribute('aria-controls'), 
//         ariaExpanded = clickedButton.getAttribute('aria-expanded'), 
//         controlledAria = document.getElementById(ariaControls),
//         ariaHidden = controlledAria.getAttribute('aria-hidden');
//         if (ariaHidden === 'true') {
//           controlledAria.setAttribute('aria-hidden', 'false');
//           clickedButton.setAttribute('aria-expanded', 'true');
//         } else {
//           controlledAria.setAttribute('aria-hidden', 'true');
//           clickedButton.setAttribute('aria-expanded', 'false');
//         }
//     }
// }

// function closeMenu() {
//     if (window.innerWidth <= 767) {
//         var navigationList = document.getElementById('navigation-list'),
//         menuButton = document.getElementById('toggle-navigation'),
//         ariaHidden = navigationList.getAttribute('aria-hidden'),
//         ariaExpanded = menuButton.getAttribute('aria-expanded');
//         if (ariaHidden === 'false') {
//             navigationList.setAttribute('aria-hidden', 'true');
//             menuButton.setAttribute('aria-expanded', 'false');
//         }
//     }
// }
