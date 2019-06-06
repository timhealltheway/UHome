/* JS document

1. Vars and Inits 
2. Set Header
3. Init Home Sloder
4.Init Menu



*/

$(document).ready(function()
{
	"use strict";

	/* 
	1. Vars and Inits
	*/

	var menuActive = false;
	var header = $('.header');
	var ctrl = new ScrollMagic.Controller();

	setHeader();

	$(window).on('resize', function(){
		setHeader();
	});

	$(document).on('scroll',function(){
		setHeader();
	});

	initHomeSlider();
	initSearchFeatures();
	initMenu();
	initTestimonialsSlider();
	initParallax();
	initCitiesSlider();

	/* s
	2. Set Header
	*/

	function setHeader(){
		if(window.innerWidth < 992)
		{
			if($(window).scrollTop() > 100)
			{
				header.addClass('scrolled');
			}else{
				header.removeClass('scrolled');
			}
		}
		else{
			if($(window).scrollTop() > 100){
				header.addClass('scrolled');
			}else{
				header.removeClass('scrolled');
			}
		}

		if(window.innerWidth > 991 && menuActive){
			closeMenu();
		}
	}

	/*
	3. initialize home slider
	*/
	function initHomeSlider(){
		if ($('.home_slider').length) {
			var homeSlider = $('.home_slider');

			//owlCarousel build in animation 
			homeSlider.owlCarousel({
				items: 1,
				loop: true,
				smartSpeed: 1200,
				autoplay: true,
				nav: false,
				dots: false
			});

			//Handle Home Slider Navigation
			if($('.home_slider_nav_left').length){
				var navLeft = $('.home_slider_nav_left');

				navLeft.on('click', function(){
					homeSlider.trigger('prev.owl.carousel');
				});
			}

			// add animate.css class(es) to the elements to be animated
			function setAnimation ( _elem, _InOut )
			{
				// Store all animationend event name in a string.
				// cf animate.css documentation
				var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

				_elem.each ( function ()
				{
					var $elem = $(this);
					var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

					$elem.addClass($animationType).one(animationEndEvent, function ()
					{
						$elem.removeClass($animationType); // remove animate.css Class at the end of the animations
					});
				});
			}

			//Fired before current slide change
			homeSlider.on('change.ow.carousel', function(event){
				var $currentItem = $('.home_slider_content', homeSlider).eq(event.item.index);
				var $elemsToanim = $currentItem.find("[data-animation-in]");
				setAnimation($elemsToanim, 'out');
			});

			//Fired after current slider has been changed
			homeSlider.on('changed.owl.carousel', function(event)
			{
				var $currentItem = $('.home_slider_content', homeSlider).eq(event.item.index);
				var $elemsToanim = $currentItem.find("[data-animation-in]");
				setAnimation ($elemsToanim, 'in');
			})			
		}
	}

	/***
	4. initialize menu
	***/
	function initMenu(){
		if ($('.menu').length) {
			var menu = $('.menu');
			var hamb = $('.hamburger');

			hamb.on('click', function(){
				if(menuActive)
				{
					closeMenu();
				}
				else{
					openMenu();
					$(document).one('click', function cls(e)
					{
						if($(e.target).hasClass('menu_mm'))
						{
							$(document).one('click', cls)
						}
						else{
							closeMenu();
						}
					});
				}
			});
		}
	}
	function closeMenu()
	{
		var menu = $('.menu');
		menu.removeClass('active');
		menuActive = false;
		menu.css('max-height', "0px");
	}

	function openMenu()
	{
		var menu = $('.menu');
		menu.addClass('active');
		menuActive = true;
		menu.css('max-height', menu.prop('scrollHeight') + "px");
	}





});