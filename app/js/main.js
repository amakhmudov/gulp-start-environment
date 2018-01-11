// Check viewport of container, rahter its tablet or phone
function checkSize() {
	if ($(".responsive-tablet").css("float") == "left") {
		// you're on media query desktop viewport
	}

	if ($(".responsive-tablet").css("float") == "none") {
		// you're on media query tablet viewport
	}

	if ($(".responsive-phone").css("float") == "none") {
		// you're on media query phone viewport
	}
};


$(document).ready(function() {
	checkSize();
	var lastScrollTop = 0;
	
	
	// Background section-bg functionality
	var section = $(".section-bg");
    section.each(function () {

        if ($(this).attr("data-bg-img")) {
            $(this).css({
                "background-image": "url(" + $(this).data("bg-img") + ")"
            });
        }

        if ($(this).attr("data-bg-col")) {
            $(this).css({
                "background-color": $(this).data("bg-col")
            });
        }

        if ($(this).attr("data-height")) {
            $(this).css("height", $(this).data("height") + "px");
        }
    });



	// Block hover link functionality
	$(".clickable-block").click(function() {
		var linkObj = $(this).find("a");

		if (linkObj[0].hasAttribute("target")) {
			window.open(linkObj[0].href);
		} else {
			window.location = linkObj.attr("href");
		}

		return false;
	});


	// Hiding the elements if click event is out of elements
	$(document).on("click touchstart", function(e) {
		 var itemToClose = $(".item-to-close");

		if (!$(e.target).closest(itemToClose).length) {
			 $(itemToClose).removeClass("is_active");
		}
	});
	
	

	// ScrollTo functionality
	$(".scroll-to-link").click(function(e) {
		e.preventDefault();
		var target = $(this.hash);
		$("html").scrollTo(target, 1500, {
			easing: 'easeInOutExpo'
		});
	});


	$(window).resize(function(event) {
		checkSize();

	});
	// End of window.resize
	
		
	
	
	$(window).scroll(function(event){
		checkSize();
		
		var st = $(this).scrollTop();

		if (st < lastScrollTop) {
			//scroll up action goes here...
		} 
		if (st == 0) {
			// starting point action goes here
		}
		else {
			//scroll down action goes here...
		}

		lastScrollTop = st;

	})
	// End of window.scroll

});
// End of document.ready