/**
 * Mobile submenu toggle for header
 *
 * Place this file at: assets/js/header-mobile-toggle.js
 * Include it just before </body>:
 * <script src="assets/js/header-mobile-toggle.js"></script>
 *
 * Behaviour:
 * - On small screens (below 1200px) parent menu items with children become toggles.
 * - Clicking a parent opens/closes its submenu without changing markup or visual layout.
 * - On wider screens it removes mobile-only inline styles so desktop behaviour is unchanged.
 *
 * This script only adds minimal inline styles and event handlers — it does not change your markup or UI.
 */

(function () {
  const MOBILE_BREAKPOINT = 1200; // match your .d-xl-breakpoint

  // Slide helpers (uses max-height so layout/visuals remain same)
  function slideOpen(el) {
    el.style.display = 'block';
    const prevMax = el.style.maxHeight;
    el.style.transition = 'max-height 280ms ease';
    // let browser calculate
    requestAnimationFrame(() => {
      el.style.maxHeight = el.scrollHeight + 'px';
    });
    el.dataset.open = 'true';
  }

  function slideClose(el) {
    el.style.transition = 'max-height 240ms ease';
    el.style.maxHeight = '0px';
    el.dataset.open = 'false';
    // keep display:block until transition end to avoid layout jump
    el.addEventListener('transitionend', function _te() {
      if (el.dataset.open === 'false') {
        el.style.display = ''; // fallback to stylesheet default
      }
      el.removeEventListener('transitionend', _te);
    });
  }

  function initMobile() {
    const menu = document.querySelector('.main-menu');
    if (!menu) return;

    // find all li's that have submenus
    const parents = menu.querySelectorAll('li.menu-item-has-children, li.menu-item-has-children-2');
    parents.forEach((li) => {
      const submenu = li.querySelector('.sub-menu');
      const trigger = li.querySelector(':scope > a'); // direct child anchor

      if (!submenu || !trigger) return;

      // make sure submenu has mobile-friendly inline defaults only on mobile
      if (!submenu.dataset.mobileInit) {
        submenu.dataset.mobileInit = '1';
        submenu.style.overflow = 'hidden';
        submenu.style.maxHeight = '0px';
        submenu.style.display = ''; // leave to stylesheet until opened
      }

      // Avoid adding duplicate listeners
      if (!trigger.dataset.mobileListener) {
        trigger.dataset.mobileListener = '1';

        trigger.addEventListener('click', function (ev) {
          // Only act on mobile sizes
          if (window.innerWidth >= MOBILE_BREAKPOINT) return;

          // Prevent navigation if anchor has no meaningful href OR if it has submenu
          const href = trigger.getAttribute('href');
          const isPlainHash = !href || href.trim() === '#' || href.trim() === '';
          if (submenu) {
            ev.preventDefault();
            ev.stopPropagation();

            const isOpen = submenu.dataset.open === 'true';
            if (isOpen) {
              li.classList.remove('submenu-open');
              slideClose(submenu);
            } else {
              // Close sibling open submenus at same level (optional but expected on mobile)
              const siblings = li.parentElement.querySelectorAll(':scope > li');
              siblings.forEach((sib) => {
                if (sib !== li) {
                  const sibSub = sib.querySelector(':scope > .sub-menu');
                  if (sibSub && sibSub.dataset.open === 'true') {
                    sib.classList.remove('submenu-open');
                    slideClose(sibSub);
                  }
                }
              });

              li.classList.add('submenu-open');
              slideOpen(submenu);
            }
          } else if (isPlainHash) {
            // if anchor has no href, prevent accidental navigation
            ev.preventDefault();
          }
        }, { passive: false });
      }
    });
  }

  function destroyMobile() {
    const menu = document.querySelector('.main-menu');
    if (!menu) return;
    const parents = menu.querySelectorAll('li.menu-item-has-children, li.menu-item-has-children-2');
    parents.forEach((li) => {
      const submenu = li.querySelector('.sub-menu');
      if (!submenu) return;
      // remove mobile-only inline styles so desktop stylesheet controls it
      submenu.style.maxHeight = '';
      submenu.style.overflow = '';
      submenu.style.display = '';
      submenu.style.transition = '';
      submenu.dataset.open = '';
      li.classList.remove('submenu-open');
      // keep trigger listener but it bails out on desktop sizes (no need to remove)
    });
  }

  // Initialize appropriately on load and resize
  function onResize() {
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      initMobile();
    } else {
      destroyMobile();
    }
  }

  document.addEventListener('DOMContentLoaded', onResize);
  window.addEventListener('resize', function () {
    // debounce small resizes
    clearTimeout(window.__headerMobileResizeTimer);
    window.__headerMobileResizeTimer = setTimeout(onResize, 120);
  });
})();