$.fn.mobileScroll = function() {
	if ( this.hasClass('ui-draggable') ) {
		this.draggable('disable');
	}
	if ( Modernizr.mq('(max-width:639px)') ) {
		if ( this.hasClass('ui-draggable-disabled') ) {
			this.draggable('enable');
		}
		this.draggable({
			axis: 'x',
			containment: [($(this).parent().width()-40-($(this).find('li').outerWidth()-3)*$(this).find('li').size()), 0, 0, 0]
		});
	}
}
$(function() {
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('.form-e button').on('click', function(e) {
		e.preventDefault();
		$(this).parent().find('input,textarea').each(function() {
			if ( $(this).val() == 0 && $(this).parents('p').find('input[type="file"]').length == 0 ) {
				if ( !$(this).parent().is('.warning-wrap') ) {
					$(this).wrap('<span class="warning-wrap"></span>');
					$(this).parent().prepend('<em class="text"><em>Неверный формат</em></em><em class="icon"></em>');
					$(this).siblings('em').outerHeight($(this).outerHeight());
				}
				var t = $(this).parent();
				t.find('em').show();
				t.find('em.text').css({
					'width': '100%'
				});
				setTimeout(function() {
					t.find('.text > em').hide();
					t.find('.text').animate({
						'width': t.find('.icon').width()+'px'
					}, 300).dequeue();
				}, 1000);
			} else {
				$(this).siblings('em').hide();
			}
		});
	});
	if ( !Modernizr.touchevents ) {
		var openErrorEvent = 'mouseenter';
		var closeErrorEvent = 'mouseleave';
	} else {
		var openErrorEvent = 'click';
		var closeErrorEvent = 'click';
	}
	$('body').delegate('.warning-wrap .icon:not(.opened)', openErrorEvent, function() {
		var t = $(this).siblings('.text');
		$(this).addClass('opened');
		t.stop().animate({
			'width': '100%',
		}, 300, function() {
			$(this).find('em').show();
		});
	});
	$('body').delegate('.warning-wrap .icon.opened', closeErrorEvent, function() {
		var t = $(this).siblings('.text');
		$(this).removeClass('opened');
		t.find('em').hide();
		t.stop().animate({
			'width': '0',
		}, 300);
	});
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		var t = $('.modal[data-target="'+$(this).attr('data-open')+'"]');
		$('.fade').stop(true,true).fadeIn(300);
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		if ( h < $(window).scrollTop()+80 ) {
			h = $(window).scrollTop()+40;
		}
		t.css({
			'top': h+'px'
		}).stop(true,true).fadeIn(300).siblings('[data-target]').stop(true,true).fadeOut(300);
		formLabel();
	});
	$('.fade, .modal .close').on('click', function(e) {
		e.preventDefault();
		$('.fade, .modal').stop(true,true).fadeOut(300);
	});
	var fixedScroll = false;
	$(window).on('scroll', function() {
		if ( $(document).scrollTop() > $(window).height() ) {
			if ( !fixedScroll ) {
				$('header').addClass('fixed').css({
					'margin-top': -$('header').height()
				}).stop(true,true).animate({
					'margin-top': '0'
				}, 300);
				fixedScroll = true;
			}
		} else {
			$('header').removeClass('fixed');
			fixedScroll = false;
		}
	});
	$('.img-bg').each(function() {
		var vertPos = 'center'
		if ( $(this).hasClass('top') ) {
			vertPos = 'top'
		} else if ( $(this).hasClass('bottom') ) {
			vertPos = 'bottom'
		}
		$(this).parent().css({
			'background': 'url("'+$(this).attr('src')+'") no-repeat  center '+vertPos,
			'background-size': 'cover'
		});
	});
	$('.card-full .characteristics .item ul li, .card-full .characteristics .item h5').each(function() {
		if ( $(this).find('span') ) {
			$(this).css({
				'padding-right': $(this).find('span').outerWidth()+10+'px'
			});
		}
	});
	function formLabel() {
		$('.form-e .item label span').each(function() {
			var m = (26-$(this).outerHeight())/2;
			$(this).css({
				'margin-top': m,
				'margin-bottom': m
			});
		});
	}
	function cardChar() {
		$('.card-full .characteristics .tab').each(function() {
			if ( !isMobile ) {
				var cols = 3;
			} else {
				var cols = 2;
			}
			var lines = Math.ceil($(this).find('.item').size()/cols);
			$(this).find('.item').height('auto');
			for ( var i=0; i<=lines; i++ ) {
				var max = 0;
				for ( var j=1; j<=cols; j++ ) {
					$(this).find('.item:nth-of-type('+eval(i*cols+j)+')').each(function() {
						var h = $(this).height(); 
						max = h > max ? h : max;
					});
				}
				for ( var j=1; j<=cols; j++ ) {
					$(this).find('.item:nth-of-type('+eval(i*cols+j)+')').height(max);
				}
			}
		});
	}
	var isMobile;
	function detectDevice() {
		if ( $('.menu-open').css('display') == 'none' ) {
			isMobile = false;
		} else {
			isMobile = true;
		}
	}
	function swapBlocks() {
		if ( isMobile ) {
			$('.director-i .quote button').detach().appendTo('.director-i .name');
		} else {
			$('.director-i .name button').detach().appendTo('.director-i .quote');
		}
	}
	function indexClients() {
		$('.clients-i .item div').each(function() {
			$(this).height($(this).parent().width()*16/27)
		});
		if ( $('.clients-i .slick-track').length > 0 ) {
			$('.clients-i .core').slick('unslick');
		}
		if ( Modernizr.mq('(max-width:759px)') ) {
			$('.clients-i .core').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				arrows: true,
				dots: true
			});
		}
	}
	function galleryImages() {
		$('.gallery-e, .gallery-b').each(function() {
			if ( $(this).find('.slick-track').length > 0 ) {
				$(this).slick('unslick');
			}
			$(this).find('.item').width($(this).width());
			var h = $(this).width()*434/570;
			$(this).outerHeight(h).find('.item').outerHeight(h).children('div').outerHeight(h-55);
			$(this).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				arrows: true,
				dots: false
			});
		});
	}
	function advantagesList() {
		var t = $('.advantages-b .list');
		if ( t.find('.slick-track').length > 0 ) {
			t.slick('unslick');
		}
		if ( Modernizr.mq('(max-width:759px)') ) {
			t.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				arrows: true,
				dots: true,
				adaptiveHeight: true
			});
		}
	}
	function changeText() {
		if ( Modernizr.mq('(max-width:759px)') ) {
			$('.delivery-b .form-e button').text('Узнать стоимость доставки');
		} else {
			$('.delivery-b .form-e button').text('Рассчитать стоимость доставки');
		}
	}
	$(window).on('resize load', function() {
		$('.title-e .bg').height($('.title-e').height());
		cardChar();
		formLabel();
		detectDevice();
		swapBlocks();
		indexClients();
		galleryImages();
		changeText();
		advantagesList();
		$('.advantages-b .certificates .line ul').mobileScroll();
	});
	$(window).trigger('resize');
	function customSelect() {
		$('select').selectmenu();
	}
	customSelect();
	$('select').on('selectmenuopen', function(event,ui) {
		var t = $(this).siblings('.ui-selectmenu-button').attr('aria-activedescendant');
		var str = $(this).attr('id').toString()+'-button';
		var e = $('[aria-labelledby="'+str+'"]');
		e.find('.ui-menu-item-wrapper').removeClass('current');
		e.find('div#'+t).addClass('current');
	});
	$('.photo-open').fancybox({
		padding: 0,
		margin: 0,
		width: $(window).width(),
		height: $(window).height(),
		helpers: {
			overlay: {
				locked: false
			},
			title: {
				type : 'over'
			}
		},
		beforeShow : function() {
			this.title = (this.title ? '' + this.title + '' : '') + (this.index + 1) + ' из ' + this.group.length;
		} 
	});
	$('input[type="checkbox"], input[type="radio"]').uniform();
	$('.form-e .add-group').on('click', function(e) {
		e.preventDefault();
		var element = 
		'<div class="type">\
			<div class="item">\
				<label><span>Вид продукции</span></label>\
				<select>\
					<option selected disabled>Выберите из списка</option>\
					<option>Вид 1</option>\
					<option>Вид 2</option>\
				</select>\
			</div>\
			<div class="item">\
				<label>Объем заказа</label>\
				<span class="inline number-2"><input type="text"></span>\
				<span class="sign">тонн</span>\
			</div>\
		</div>'
		$(this).siblings('.remove-group').css({
			'display': 'block'
		}).parent().before(element);
		customSelect();
	});
	$('.form-e .remove-group').on('click', function(e) {
		e.preventDefault();
		$(this).parent().prev('.type').remove();
		if ( $(this).parents('.group').find('.type').size() == 1 ) {
			$(this).hide();
		}
	});
	$('.card-full .characteristics .expand span').on('click', function(e) {
		e.preventDefault();
		$(this).parents('.characteristics').addClass('expanded');
		cardChar();
		$(this).parent().remove();
	});
	$('.articles-l .list li').each(function() {
		if ( $(this).find('img').length == 0 ) {
			$(this).addClass('noimg');
		}
	});
	$('.card-full .description .more a').on('click', function(e) {
		e.preventDefault();
		$(this).parents('.description').addClass('expand');
		$(this).parent().hide();
	});
	$('.menu-mini-show .main .open-sub a').on('click', function(e) {
		e.preventDefault();
		$(this).parents('.main').stop().slideUp(0).siblings('.sub').slideDown(0);
	});
	$('.menu-mini-show .sub h5').on('click', function(e) {
		e.preventDefault();
		$(this).parents('.sub').stop().slideUp(0).siblings('.main').slideDown(0);
	});
	$('header .menu-open').on('click', function(e) {
		e.preventDefault();
		var m = $('.menu-mini-show');
		if ( m.is(':hidden') ) {
			m.stop().fadeIn(100).css({
				'top': $('header').outerHeight()+2+'px',
				'height': $(window).height()-$('header').outerHeight()+2+'px'
			});
			$('header').addClass('dropped');
			$('body').addClass('scroll-hide');
		} else {
			$('header').removeClass('dropped');
			$('body').removeClass('scroll-hide');
			m.stop().fadeOut(100);
		}
		$(this).toggleClass('active');
	});
	$('html, body').on('click', function() {
		$('.menu-mini-show').stop().fadeOut(100);
		$('body').removeClass('scroll-hide');
		$('.menu-open').removeClass('active');
	});
	$('.menu-mini-show, .menu-open').click(function(e)  {
		e.stopPropagation();
	});
	$(window).on('scroll resize', function() {
		if ( $('.menu-mini-show').is(':visible') ) {
			$('.menu-mini-show').css({
				'height': $(window).height()-$('header').outerHeight()+2+'px'
			});
		}
	});
});