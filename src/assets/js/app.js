$(document).foundation();

$(document).ready(function(){

	var hash = window.location.hash.substr(1);

	var platform = $.restive.getPlatform();

	//console.log($.restive.getFormFactor());
	if(platform === "ios" || platform === "android") {
		$('.video-bg').addClass("invisible");
	} else {
		$('.video-bg').addClass("visible");
	}

	$(window).trigger('resize');

	$.fn.matchHeight._throttle = 60;

	//When the page is ready. Let's scroll based on the #hash in the url
	setTimeout(function(){
		if(hash.length != 0) {
			$('.sw-main-nav-item[data-scrollto="' + hash + '"] a').trigger('click');
		}

	}, 1000)

})


//matchHeight on the Technology section
	 $('.big-tile').matchHeight({
		 byRow : true
	 });

	 $('.small-tiles-1').matchHeight({
		 byRow : true
	 });

	 $('.small-tiles-2').matchHeight({
		 byRow : true
	 });
	 
	 $('.contact-cols').matchHeight({
		 byRow : true
	 });

//OFF CANVAS FUNCTIONALITY FOR PHONES AND TABLETS

$('#navToggle').on('click', toggleMobileNav);

function toggleMobileNav() {
	$(this).toggleClass('active');
	$('body').toggleClass('nav-active');

	if($(this).hasClass('active')) {
		$('.off-canvas-nav-wrap nav ul li').each(function(i){
			$(this).css('transition-delay', i*50 + 'ms');
		})
	} else {
		$('.off-canvas-nav-wrap nav ul li').each(function(i){
			//setTimeout(function(){
				$(this).attr('style',"");
			//}, 1000);
		})
	}
}



//ENABLE GOOGLE MAPS with GMAP3
var maps_apikey = "AIzaSyDB86sw0jRpCOkBWkv0DGoaQTOAey7ThNg"

$.gmap3(false); // disable gmap3 loader


if(Foundation.MediaQuery.current == "small"){

	$('section#home').css('min-height', $(window).height() - 50 + 'px');
/*
//let's adjust the height of the sections
$('section.primary').css('min-height', $(window).height() + 'px');
//$('section#home').css('height','auto');
} else {
	$('section#home').css('min-height', $(window).height() + 'px');
*/
}


//animation functions triggered by waypoints

function sectionAnimateIn(id, direction) {
	if (direction == "down") {

		switch(id) {
			case "home":
			//run animation here
			break;

			case "services" :
				//run animation here

			break;

			case "about":
			//run animation here
			break;

			case "contact" :
			//run animation here
			break;
		}

	}
}

//MOBILE NAV FUNCTIONALITY

$('#mobile-nav ul li a').on('click', function(e){
	$('body').toggleClass('nav-active');
	$('#navToggle').toggleClass('active');

	var scrollTarget = $(this).data('scrollto');
	//console.log(scrollTarget);
	var targetElement = $('#'+scrollTarget);
	var i = $(this).parent().index();
	//var $wrapper =
	var delay = setTimeout(function(){
		$('.site-content').scrollTo(targetElement,1000);
	}, 500);

});


//DESKTOP SPECIFIC JS

if(Foundation.MediaQuery.atLeast('large')){

	$('.desktop-nav').css('pointer-events' , 'none');

	$('.sw-main-nav-item').each(function(i){
		$(this).css({'transition-delay' : (i * 100) + 'ms', 'opacity' : 1, 'transform' : 'translate3d(0,0,0)'});
	})

	//once the last item is in view lets hide the type
	$('.sw-main-nav-item:last-child').one('transitionend', function(){

		var count = 0;

		var intvl = setInterval(function(){

			if(count < 7) {
				$('.sw-main-nav-item').eq(count).find('a').children('.sw-main-nav-item-txt').addClass("shy");
			} else {
				$('.desktop-nav').css('pointer-events' , 'auto');
				clearInterval(intvl);

			}

			count++;

		}, 100)

	})

	//reveal the type on hover
	$('.sw-main-nav-item').not('.external').on('mouseenter', function(){
		$(this).find('a').children('.sw-main-nav-item-txt').toggleClass('shy');
	}).on('mouseleave', function(){
		$(this).find('a').children('.sw-main-nav-item-txt').toggleClass('shy');
	})

	$('.sw-main-nav-item:not(.external) a').on('click', function(e){
		e.preventDefault();
		//reset all nav elements
		$(this).siblings().removeClass('active');
		//add the active class
		$(this).addClass('active');

		//scrollto section

		var destination = $(this).parent().attr('data-scrollto');




		var targetElement = $('#'+destination);
		//console.log(targetElement);

		//console.log($(this).attr('data-scrollto'));



		$('.site-content').scrollTo(targetElement, 1000, function(){
			//set the hash in the URL
			window.location.hash = destination; //we do this after the scroll is complete so we don't automatically jump
		});

	})

	//WAYPOINTS FOR UPDATING THE NAVIGATION

	var introwp = new Waypoint({
		element : $('.trigger')[0],
		handler : function(direction) {
			if(direction == "up"){
				$('.sw-main-nav-item').removeClass('active');
				$('#sw-main-nav').removeClass('reverse');
				$('.sw-main-nav-item').eq(0).addClass('active');
			}
		},
		context : $('.site-content')[0],
		offset : '60%'
	})

	var waypoints = $('.wp').waypoint({
		handler : function(direction) {
			var wpid = this.element.id;
			$('.sw-main-nav-item').removeClass('active');
			$('div[data-scrollto="' + wpid + '"]').addClass('active');



			switch (wpid) {
				case "clients":
					$('#sw-main-nav').addClass('reverse');
				break;
				case "opensrc":
					$('#sw-main-nav').addClass('reverse');
				break;
				case "blog":
					$('#sw-main-nav').addClass('reverse');
				break;
				default:
					$('#sw-main-nav').removeClass('reverse');
				break;
			}

		},
		context : $('.site-content')[0],
		offset : '50%'
	})

};

//GOOGLE MAP for footer
function initMap() {

	var mapstyle = [
  {
    "featureType": "water",
    "stylers": [
      { "color": "#92cefa" }
    ]
  },{
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      { "color": "#7bb7e3" }
    ]
  },{
    "featureType": "poi",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      { "color": "#e8f4ff" }
    ]
  },{
    "featureType": "landscape.man_made",
    "stylers": [
      { "color": "#d2ebff" }
    ]
  },{
  }
]
//let's make a map

	var swMap = new google.maps.Map($('#swMap')[0], {
		center: {lat : 37.4418834, lng : -122.1430195},
	    zoom:10,
	    mapTypeControl: false,
	    streetViewControl: false,
	    zoomControl:true,
	    scrollwheel:false,
	    styles:mapstyle
	})

	var setMarkers = setTimeout(addMarkers, 200);

	var markers = [];

	var marker1,
	marker2,
	marker3,
	marker4,
	marker5,
	marker6;

	function addMarkers(){
		marker1 = new google.maps.Marker({
			position : new google.maps.LatLng(37.4418834, -122.1430195),
			map : swMap,
			icon : "./assets/img/map_marker.png"
		})

		marker2 = new google.maps.Marker({
			position : {lat :43.0108124, lng:-78.7781186},
			map : swMap,
			icon : "./assets/img/map_marker.png"
		})

		marker3 = new google.maps.Marker({
			position : {lat :42.7009627, lng:-82.9588953},
			map : swMap,
			icon : "./assets/img/map_marker.png"
		})

		marker4 = new google.maps.Marker({
			position : {lat :49.2560908, lng:-124.7815661},
			map : swMap,
			icon : "./assets/img/map_marker.png"
		})

		// Berlin, Germany
		marker5 = new google.maps.Marker({
			position : {lat :52.52, lng:13.4050},
			map : swMap,
			icon : "./assets/img/map_marker.png"
		})

		// Skipton, UK
		marker6 = new google.maps.Marker({
			position : {lat :	53.9628495, lng:-2.0162787},
			map : swMap,
			icon : "./assets/img/map_marker.png"
		})

		// Brisbane, AU
		marker7 = new google.maps.Marker({
			position : {lat :-27.4710, lng:153.0234},
			map : swMap,
			icon : "./assets/img/map_marker.png"
		})

		// Los Angeles CA
		marker8 = new google.maps.Marker({
			position : {lat :34.05, lng:-118.2437},
			map : swMap,
			icon : "./assets/img/map_marker.png"
		})

		markers.push(marker1, marker2, marker3, marker4, marker5, marker6, marker7, marker8);

		clearTimeout(setMarkers);
	}

		$('.location-item').on('click', function(){
			var id = parseFloat($(this).data('marker')) - 1;
			//var center = new google.maps.LatLng(markers[id].position.lat, markers[id].position.lng);
			swMap.setCenter({lat : markers[id].getPosition().lat(), lng : markers[id].getPosition().lng()});
		})


}

//CONTACT FORM=====================================================
$('#contactForm').on('submit', function(e){
	e.preventDefault();
	$('#responseDisplay').css('display','block');
	var formData = $('#contactForm').serialize();

	$.ajax({
		url : /*http://YOURWEBHOSTGOESHERE*/+ "sw_mailer.php",
		type:"POST",
		data : formData
	}).done(function(response){
		//console.log("YAY");
		$('#msgHead').text("Your message was sent.");
		$('#msgBody').text("Thanks. We'll be in touch shortly.")
		$('#responseDisplay').addClass('success');
		$('#contactForm')[0].reset(); //rest the form

		//hide the message and reset the form
		setTimeout(killFormMessage, 4000);

	}).fail(function(response){
		//console.log("BOO");
		$('#msgHead').text("Oops. Something went wrong.");
		$('#msgBody').text("Please double check all fields and resubmit the form.")
		$('#responseDisplay').addClass('error');
		$('#contactForm')[0].reset(); //rest the form

		setTimeout(killFormMessage, 4000);
	})

})

function killFormMessage() {
	$('#msgHead').text("");
	$('#msgBody').text("");
	if($('#responseDisplay').hasClass('success')) {
		$('#responseDisplay').removeClass('success');
	} else {
		$('#responseDisplay').removeClass('error');
	}
	$('#responseDisplay').css('display' , 'none');
}
