(function($){
  $(function(){

    // Ensure submenus are collapsed on small screens and visible on desktop
    function syncSubmenus() {
      if ($(window).width() < 992) {
        $('.main-menu .sub-menu').hide();
      } else {
        $('.main-menu .sub-menu').show();
        $('.main-menu .menu-item-has-children').removeClass('open');
      }
    }
    syncSubmenus();
    $(window).on('resize', syncSubmenus);

    // Open mobile menu
    function openMenu() {
      // use jQuery show/fade to avoid adding new CSS
      $('.mr_menu').stop(true, true).fadeIn(200).addClass('open');
      $('body').addClass('mr_menu_open');
    }

    // Close mobile menu
    function closeMenu() {
      $('.mr_menu').stop(true, true).fadeOut(200).removeClass('open');
      $('body').removeClass('mr_menu_open');
    }

    // Event delegation so handlers work even when header is loaded dynamically
    $(document).on('click', '.mr_menu_toggle', function(e){
      e.preventDefault();
      openMenu();
    });

    $(document).on('click', '.mr_menu_close', function(e){
      e.preventDefault();
      closeMenu();
    });

    // Optional: close when clicking a link inside mobile nav (remove if you don't want this)
    $(document).on('click', '.mr_menu .mr_navmenu a', function(){
      if ($(window).width() < 992) closeMenu();
    });

    // Submenu toggle on mobile
    // Prevent default navigation on parent link and toggle its submenu
    $(document).on('click', '.menu-item-has-children > a', function(e){
      if ($(window).width() < 992) {
        e.preventDefault();
        var $li = $(this).parent();
        $li.toggleClass('open');
        $li.children('.sub-menu').stop(true, true).slideToggle(250);
      }
      // on desktop do nothing (let the link behave normally)
    });

  });
})(jQuery);