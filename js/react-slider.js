/**
	Author: Edgar G. Plata
**/

window.reactSlider = (function () {
	'use strict';

	var reactSlider = function(element, options) {

		element = document.querySelector(element);
		// If the element does not exist
		// Return
		if (!element) {
			return;
		}

		// Controls Element
		var leftControl = element.querySelector('.react-slider-left');
		var rightControl = element.querySelector('.react-slider-right');

		// Total Images
		var totalImages = element.querySelectorAll('img').length;

		// Slider Container
		var sliderContainer = element.querySelector('.react-slider-container');

		// Default slide
		var start = 0;
		var imageView = 1;

		// Options
		var o = options || {},
			animationSpeed = o.animationSpeed || 1,
			autoPlay = o.autoPlay || true,
			paginate = o.paginate || false,
			sliderSpeed = o.sliderSpeed || 5;
			
		
		// Set the speed
		sliderContainer.style.transition = "left "+animationSpeed+"s ease";
		
		
		// Slideshow moving forward
		var moveForward = true;
		
		
		
		// Executed when user resizes browser
		function onWindowResize() {
			var width = element.offsetWidth;
			start = (imageView - 1) * width;
			sliderContainer.style.left="-"+start+"px";
			return;
		}
		
		
		// Images are responsive
		// Determine when user resizes browser
		var resize;
		window.onresize = function() {
			clearTimeout(resize);
			resize = setTimeout(onWindowResize, 150);
			return;
		};
		
		
		
		function slideLeft() {
			
			//Get element width
			var width = element.offsetWidth;
			
			// Get max width
			var maxWidth = (totalImages - 1) * width;
			
			
			// If user clicks but is on last image
			if (start === maxWidth) {
				moveForward = false;
				return;
			}
			
			imageView++;
			start = start + width;
			sliderContainer.style.left="-"+start+"px";
			
			// Check again whether start is at end
			if (start === maxWidth) {
				moveForward = false;
			}
			
			return;
			
		} // End slideLeft
		
		
		
		function slideRight() {
		
			//Get element width
			var width = element.offsetWidth;
			
			// If user clicks but is on first image
			if (start === 0) {
				moveForward = true;
				return;
			}
			
			imageView--;
			start = start - width;
			sliderContainer.style.left="-"+start+"px";
			
			// Check again if user is back at first image
			if (start === 0) {
				moveForward = true;
			}
			
			return;
			
		} // End slideRight
		
		
		
		function moveSlideshow() {
			switch(moveForward) {
				case true:
					slideLeft();
					break;
				case false:
					slideRight();
					break;
			}
			
			return;
		}
		
				
		// Controls
		if (leftControl.addEventListener) {
			leftControl.addEventListener('click', slideRight);
		}
		
		if (leftControl.attachEvent) {
			leftControl.attachEvent('click', slideRight);
		}
		
		if (rightControl.addEventListener) {
			rightControl.addEventListener('click', slideLeft);
		}
		
		if (rightControl.attachEvent) {
			rightControl.attachEvent('click', slideLeft);
		}
		
		// Set slideshow speed in seconds
		sliderSpeed = sliderSpeed * 1000;
		
		if (autoPlay === true || autoPlay === 'true') {
			// Start slideshow
			setInterval(moveSlideshow, sliderSpeed);
		}
		
		
	}; // End slider function
	
	return function(element, options) {
		return reactSlider(element, options);
	};
	
})();