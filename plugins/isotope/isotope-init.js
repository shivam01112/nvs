/*
Theme Name: 
Version: 
Author: 
Author URI: 
Description: 
*/
/*	IE 10 Fix*/

(function ($) {
	'use strict';
	
	jQuery(document).ready(function () {


        // Isotope Portfolio
        var iso = $grid.data('isotope');
        var $filterCount = $('.filter-count');

        // bind filter button click
        $('.filters-button-group .button').on( 'click', function() {
            var filterValue = $( this ).attr('data-filter');
            // use filterFn if matches value
            $grid.isotope({ filter: filterValue });
            updateFilterCount();
        });

        function updateFilterCount() {
            $filterCount.text( iso.filteredItems.length);
        }
        updateFilterCount();

        // change is-checked class on buttons
        $('.filters-button-group').each( function( i, buttonGroup ) {
            var $buttonGroup = $( buttonGroup );
            $buttonGroup.on( 'click', 'button', function() {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $( this ).addClass('is-checked');
            });
		});

		

		$grid.imagesLoaded().progress( function() {
			$grid.isotope('layout');
		});
		
		//****************************
		// Initialize all items visible
		//****************************
		function showAllItems() {
			$grid.find(".hidden").removeClass("hidden");
			$grid.isotope('layout');
		}
		
		// Show all items on initial load
		showAllItems();

		// When filter button clicked
		$(".filters-button-group").click(function() {
			$(this).data('clicked', true);
			showAllItems();
		});
    

		$(function() {
			$('.effect-fly .grid-item ').each( function() { $(this).hoverdir(); } );
		});

		$(".effect-tilt .grid-item").tilt({
			maxTilt: 15,
			perspective: 1400,
			easing: "cubic-bezier(.03,.98,.52,.99)",
			speed: 1200,
			// glare: true,
			// maxGlare: 0.1,
			scale: 1.01,
			reset: true
		});

		// Tilt effect for Slider
		$(".wptb-slider.style16 .wptb-slider--inner").tilt({
			maxTilt: 15,
			perspective: 1400,
			easing: "cubic-bezier(.03, .98, .52, .99)",
			speed: 300,
			glare: false,
			maxGlare: 0.5,
			scale: 1.01,
			reset: true
		});

 	});	
})(jQuery);

var $grid = $('.grid').isotope({
	itemSelector: '.grid-item', 
	percentPosition: true,
	layoutMode: 'masonry',
	transformsEnabled: true,
	transitionDuration: "700ms",
	resize: true,
	fitWidth: true,
	columnWidth: '.grid-sizer',
});