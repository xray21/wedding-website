
	var SlideshowManager = (function(){
		var SlideshowManager = function(photoList){
			var me = this;
			
			this.photoList = photoList;
			this.photoDir = "images/slideshow/"
			
			this.el = $("#slideshow");
			
			this.activeContainer = 1;	
			this.currentImg = Math.round(Math.random() * (this.photoList.length - 1));
			console.log(this.currentImg);
			this.currentZindex = -1;
			this.animating = false;
			this.slideshowSpeed = 6000;
			this.outSpeed = 2000;
			this.inSpeed = 500;
			
			this.interval = setInterval(function() {
				me.navigate("next");
			}, this.slideshowSpeed);
		}
		
		SlideshowManager.prototype.navigate = function(direction){
			var me = this;
			
			// Check if no animation is running. If it is, prevent the action
			if(me.animating) {
				return;
			}
			
			// Check which current image we need to show
			if(direction == "next") {
				me.currentImg++;
				if(me.currentImg >= me.photoList.length + 1) {
					me.currentImg = 1;
				}
			} 
			else {
				me.currentImg--;
				if(me.currentImg == 0) {
					me.currentImg = me.photoList.length;
				}
			}
			
			// Check which container we need to use
			var currentContainer = me.activeContainer;
			if(me.activeContainer == 1) {
				me.activeContainer = 0;
			} else {
				me.activeContainer = 1;
			}
			
			me.showImage(me.photoList[me.currentImg - 1], currentContainer, me.activeContainer);
		};
		
		SlideshowManager.prototype.showImage = function(photo, curContainerIndex, activeContainerIndex){
			var me = this;
			
			me.animating = true;
			
			// Make sure the new container is always on the background
			me.currentZindex--;
			
			// Set the background image of the new active container
			$("#img" + activeContainerIndex, me.el).css({
				"background-image" : "url(" + me.photoDir + photo + ")",
				"display" : "block",
				"z-index" : me.currentZindex
			});
			
			// Fade out the current container
			// and display the header text when animation is complete
			$("#img" + curContainerIndex, me.el).fadeOut(me.outSpeed, function() {
				me.animating = false;
			});
		};
		
		SlideshowManager.prototype.stopAnimation = function(){
			var me = this;
			me.clearInterval(interval);
		};
		
		return SlideshowManager;
	})();
	
	var slideshowManager;

	$(function() {
		var photos = [ 
			"1.jpg",	
			"2.jpg",
			"3.jpg",
			"4.jpg",
			"5.jpg",
			"6.jpg",
			"7.jpg",
			"8.jpg",
			"9.jpg",
			"10.jpg",
			"11.jpg"
		];
		
		slideshowManager = new SlideshowManager(photos);
		slideshowManager.navigate("next");
		
		// Backwards navigation
		$("#back").click(function() {
			stopAnimation();
			navigate("back");
		});
		
		// Forward navigation
		$("#next").click(function() {
			stopAnimation();
			navigate("next");
		});
	});

