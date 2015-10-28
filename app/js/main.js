// Check viewport of container, rahter its tablet or phone
function checkSize() {
	if ($(".responsive-tablet").css("float") == "none" ){
		// you're on media query tablet resized viewport

	    }

    if ($(".responsive-phone").css("float") == "none" ){
		// you're on media query phone resized viewport

    }
};



$(document).ready(function() {
	checkSize();



	$(window).resize(function(event) {
		checkSize();
	});
	// End of window.resize

});
// End of document.ready
