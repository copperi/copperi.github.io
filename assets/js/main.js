(function($) {

	"use strict";

	// Methods/polyfills.

		// addEventsListener
			var addEventsListener=function(o,t,e){var n,i=t.split(" ");for(n in i)o.addEventListener(i[n],e)}

		// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
			!function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

	// Vars.
		var	body = document.querySelector('body');

	// Disable animations/transitions until everything's loaded.
		body.classList.add('is-loading');

		document.addEventListener('DOMContentLoaded', function() {
			body.classList.remove('is-loading');
		});
		// window.addEventListener('load', function() {
			// body.classList.remove('is-loading');
		// });
		
		// Nav.
		var	nav = document.querySelector('#nav'),
			navToggle = document.querySelector('a[href="#nav"]'),
			navClose = document.querySelector('#nav .close');

		
		// Hide function
			var hideNav=function(){
				nav.classList.remove('visible');
				body.classList.remove('menu-visible');
			};
			
		// Event: Prevent clicks/taps inside the nav from bubbling.
			addEventsListener(nav, 'click touchend', function(event) {
				event.stopPropagation();
			});

		// Event: Hide nav on body click/tap.
			addEventsListener(body, 'click touchend', function(event) {
				hideNav();
			});
			
		// Toggle.

			// Event: Toggle nav on click.
				navToggle.addEventListener('click', function(event) {

					event.preventDefault();
					event.stopPropagation();

					nav.classList.toggle('visible');
					body.classList.toggle('menu-visible');

				});

		
			// Event: Hide on ESC.
				window.addEventListener('keydown', function(event) {

					if (event.keyCode == 27)
						hideNav();

				});

			// Event: Hide nav on click.
				navClose.addEventListener('click', function(event) {

					event.preventDefault();
					event.stopPropagation();

					hideNav();

				});
				
		// Close on link click GRN
		var
			$this = $('#nav');
			
		$this.on('click', 'a', function(event) {

			var $a = $(this),
				href = $a.attr('href'),
				target = $a.attr('target');

			// if (!href || href == '#' || href == '' || href == '#' + id)
				// return;

			// Cancel original event.
				event.preventDefault();
				event.stopPropagation();

			// Hide panel.
				hideNav();
				body.classList.add('trans');
			// Redirect to href.
				window.setTimeout(function() {

					if (target == '_blank')
						window.open(href);
					else
						window.location.href = href;

				}, 500);

		});
		
		//Transition animation
		$('body').on('click', 'a', function(event) {
			var $a = $(this),
				href = $a.attr('href'),
				target = $a.attr('target');
				if (href.indexOf('#') != -1 || href.indexOf('tel') != -1 || href.indexOf('wa.me') != -1 || href.indexOf('mailto') != -1 || target == '_blank')
					return;
			// Cancel original event.
				event.preventDefault();
				event.stopPropagation();
				body.classList.add('trans');
				window.setTimeout(function() {

					if (target == '_blank')
						window.open(href);
					else
						window.location.href = href;

				}, 250);
		});
		
		// Scrolly links.
			$('.scrolly').scrolly({
				speed: 2000
			});
			
		
		//Modal
		$(document).ready(function(){
			
			var btn = document.getElementsByClassName('modal-open');
			for (var i = 0; i < btn.length; i++) {
				var thisBtn = btn[i];
				thisBtn.addEventListener("click", function(event){
					event.preventDefault();
					event.stopPropagation();
					var	modal = document.getElementById(this.getAttribute('data-modal'));
					modal.classList.toggle('show');
				});
								
			};
			
			var btnClose = document.getElementsByClassName('modal-close');
			for (var i = 0; i < btnClose.length; i++) {
				var thisBtn = btnClose[i];
				thisBtn.addEventListener("click", function(event){
					event.preventDefault();
					event.stopPropagation();
					var	modal = document.getElementById(this.getAttribute('data-close'));
					modal.classList.toggle('show');
				});
			};
			
		});
		
		$(document).ready(function(){
						
			window.addEventListener('click', function(event) {
				var modal = document.getElementsByClassName('modal');
				for (var i = 0; i < modal.length; i++) {
					var thisModal = modal[i];
					if (event.target == thisModal) {
						thisModal.classList.remove('show');
					}
				}
			});
			
		});	
		
		
		//Form submission
		$(document).ready(function(){
			$('.ajax-form').submit(function(event) {
				event.preventDefault();
				var form = $(this);
				$(".ajax-form").hide();
				$(".form-loading").fadeIn("200");
				$.ajax({
					dataType: "jsonp",
					url: "https://script.google.com/macros/s/AKfycbzsBxQ_0rkFBSPUoWywnvdjUfyippHomxBDDRHV2hpTmWIrYNc/exec",
					data: form.serialize()
						}).done(function(data) {
							$(".form-loading").hide();
							$(".form-succes").fadeIn("200");
							yaCounter21957292.reachGoal('order');
							ga('send', 'event', 'form', 'order');
							fbq('track', 'Lead');
						}).fail(function(data) {
							$(".form-loading").hide();
							$(".form-error").fadeIn("200");
						});
			  });
		});
		

})(jQuery);
