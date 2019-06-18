/* FILTERABLE IMAGES JS*/

$(document).ready(function(){
	"use strict"
	
	//initiate colorbox
	$('.mg1, .mg2, .mg3, .mg5, .mg6').colorbox({rel: function() { return $(this).data('rel')}});
		
	$('.mg-item').hover(function(){
		$(this).find('.mg-caption').toggleClass('mg-caption-active');
		$(this).find('img').toggleClass('mg-item-grayscale');
	});
		  
	$('.mgAll').click(function(){
		$(this).addClass('selected-mg');
		$(this).parent().find('.mg1b, .mg2b, .mg3b, .mg4b, .mg5b, .mg6b').removeClass('selected-mg');
		$('.mg1, .mg2, .mg3, .mg4, .mg5').show(400); 
		$('.mg-item img').removeClass('mg-item-grayscale');
		$('.mg-item').removeClass('mg-item-scale');
		 return false;		  
	}); 
	  
	$('.mg1b').click(function(){
		$(this).addClass('selected-mg');
		$(this).parent().find('.mg2b, .mg3b, .mg4b, .mg5b, .mg6b, .mgAll').removeClass('selected-mg');
		$('.mg-item img').removeClass('mg-item-grayscale');
		$('.mg-item').removeClass('mg-item-scale');
		$('.mg1').show(400); 
		$('.mg1 img').addClass('mg-item-grayscale');
		$('.mg2, .mg3, .mg4, .mg5, .mg6').addClass('mg-item-scale');  
		return false;  
	});
	
	$('.mg2b').click(function(){ 
		$(this).addClass('selected-mg');
		$(this).parent().find('.mg1b, .mg3b, .mg4b, .mg5b, .mg6b, .mgAll').removeClass('selected-mg');
		$('.mg-item img').removeClass('mg-item-grayscale');
		$('.mg-item').removeClass('mg-item-scale');
		$('.mg2').show(400); 
		$('.mg2 img').addClass('mg-item-grayscale');
		$('.mg1, .mg3, .mg4, .mg5, .mg6').addClass('mg-item-scale');  
		return false;  
	});
	
	$('.mg3b').click(function(){
		$(this).addClass('selected-mg');
		$(this).parent().find('.mg2b, .mg1b, .mg4b, .mg5b, .mg6b, .mgAll').removeClass('selected-mg');
		$('.mg-item img').removeClass('mg-item-grayscale');
		$('.mg-item').removeClass('mg-item-scale');
		$('.mg3').show(400); 
		$('.mg3 img').addClass('mg-item-grayscale');
		$('.mg1, .mg2, .mg4, .mg5, .mg6').addClass('mg-item-scale');  
		return false;  
	});
	
	$('.mg4b').click(function(){ 
		$(this).addClass('selected-mg');
		$(this).parent().find('.mg2b, .mg3b, .mg1b, .mg5b, .mg6b, .mgAll').removeClass('selected-mg');
		$('.mg-item img').removeClass('mg-item-grayscale');
		$('.mg-item').removeClass('mg-item-scale');
		$('.mg4').show(400); 
		$('.mg4 img').addClass('mg-item-grayscale');
		$('.mg1, .mg2, .mg3, .mg5, .mg6').addClass('mg-item-scale');  
		return false;  
	});
	
	$('.mg5b').click(function(){ 
		$(this).addClass('selected-mg');
		$(this).parent().find('.mg2b, .mg3b, .mg4b, .mg1b, .mg6b, .mgAll').removeClass('selected-mg');
		$('.mg-item img').removeClass('mg-item-grayscale');
		$('.mg-item').removeClass('mg-item-scale');
		$('.mg5').show(400); 
		$('.mg5 img').addClass('mg-item-grayscale');
		$('.mg1, .mg2, .mg3, .mg4, .mg6').addClass('mg-item-scale');  
		return false;  
	});
	
	$('.mg6b').click(function(){ 
		$(this).addClass('selected-mg');
		$(this).parent().find('.mg2b, .mg3b, .mg4b, .mg5b, .mg1b, .mgAll').removeClass('selected-mg');
		$('.mg-item img').removeClass('mg-item-grayscale');
		$('.mg-item').removeClass('mg-item-scale');
		$('.mg6').show(400); 
		$('.mg6 img').addClass('mg-item-grayscale');
		$('.mg1, .mg2, .mg3, .mg4, .mg5').addClass('mg-item-scale');  
		return false;  
	});	
	
	$(function() {
		$("img.preload").show().lazyload({effect : "fadeIn", threshold : 200});
	});
	
	/*MODAL CENTER*/
	function adjustModalMaxHeightAndPosition(){
		  $('.modal').each(function(){
		    if($(this).hasClass('in') == false){
		      $(this).show();
		    };
		    var contentHeight = $(window).height() - 60;
		    var headerHeight = $(this).find('.modal-header').outerHeight() || 2;
		    var footerHeight = $(this).find('.modal-footer').outerHeight() || 2;

		    $(this).find('.modal-content').css({
		      'max-height': function () {
		        return contentHeight;
		      }
		    });

		    $(this).find('.modal-body').css({
		      'max-height': function () {
		        return contentHeight - (headerHeight + footerHeight);
		      }
		    });

		    $(this).find('.modal-dialog').addClass('modal-dialog-center').css({
		      'margin-top': function () {
		        return -($(this).outerHeight() / 2);
		      },
		      'margin-left': function () {
		        return -($(this).outerWidth() / 2);
		      }
		    });
		    if($(this).hasClass('in') == false){
		      $(this).hide();
		    };
		  });
		};
		if ($(window).height() >= 320){
		  $(window).resize(adjustModalMaxHeightAndPosition).trigger("resize");
		}

});

/* CAROUSEL */

/* contact.jsp carousel */
$(document).ready(function() {
	 
	  var owl = $(".contact-carousel");
	 
	  owl.owlCarousel({
	     
	      itemsCustom : [
	        [0, 2],
	        [450, 4],
	        [600, 7],
	        [700, 9],
	        [1000, 10],
	        [1200, 12],
	        [1400, 13],
	        [1600, 15]
	      ],
	      
	      navigation : false,
	      pagination: false,
	      slideSpeed : 200,
	      paginationSpeed : 400,
	      stopOnHover:true,
	      autoPlay:2000,
	      autoHeight:true,
	 
	  });
	 
});

/* contribution.jsp carousel */

$(document).ready(function() {
	 
	  var owl = $(".contri-carousel");
	 
	  owl.owlCarousel({
	     
	      itemsCustom : [
	        [0, 2],
	        [450, 4],
	        [600, 7],
	        [700, 9],
	        [1000, 10],
	        [1200, 12],
	        [1400, 13],
	        [1600, 15]
	      ],
	      
	      navigation : false,
	      pagination: false,
	      slideSpeed : 200,
	      paginationSpeed : 400,
	      stopOnHover:true,
	      autoPlay:2000,
	      autoHeight:true,
	 
	  });
	 
});

/*back to top*/

jQuery(document).ready(function() {
    var offset = 220;
    var duration = 500;
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.back-to-top').fadeIn(duration);
        } else {
            jQuery('.back-to-top').fadeOut(duration);
        }
    });
    
    jQuery('.back-to-top').click(function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
    })
});

/*MODAL JS FOR LOGIN */
$(document).ready(function() {
		
	$("#btn-register").on('click', function() {
		   $("#register").show();
		   $("#register2").show();
		   $("#register3").show();
		   $("#login").hide();
		   $("#login2").hide();
		   $("#login3").hide();
	});
	
	$("#btn-login").on('click', function() {
		   $("#login").show();
		   $("#login2").show();
		   $("#login3").show();
		   $("#register").hide();
		   $("#register2").hide();
		   $("#register3").hide();
	});

});

/*$("#find").click(function(){
		$("#address").geocomplete({
		  map: "#map_canvas",
		  mapOptions: {
			  scrollwheel: true
		  },
			markerOptions: {
		    draggable: true
		    
		  },
		  location: "#address",
		  componentRestrictions: { country: 'sg' }
		});
	});*/

$("#find").click(function() {
	var mapOptions = {
		    zoom: 17,
		  };
		  var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
		  
		  var geocoder = new google.maps.Geocoder();
		  
		  var address = $('#address').val();
		  
		  geocoder.geocode( { 'address': address}, function(results, status) {
			  if (status == google.maps.GeocoderStatus.OK) {
				  map.setCenter(results[0].geometry.location);
				  
				  var marker = new google.maps.Marker({
					  map: map, 
					  position: results[0].geometry.location
				  });
			  } else {
				  alert("Geocode was not successful for the following reason: " + status);
			  }
		  });
});

/*BUTTON PIN*/	

$("#btn-pin").click(function() {
	  var myLatlng = new google.maps.LatLng(1.294149,103.852807);
	  var mapOptions = {
	    zoom: 17,
	    center: myLatlng
	  };
	  var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

	  var marker = new google.maps.Marker({
	      position: myLatlng,
	      map: map,
	      icon: {
	    	  url: 'images/restaurant.png'
	      }
	  });
});
	
$("#btn-pin2").click(function() {
	  var myLatlng = new google.maps.LatLng(1.294210,103.849198);
	  var mapOptions = {
	    zoom: 17,
	    center: myLatlng
	  };
	  var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

	  var marker = new google.maps.Marker({
	      position: myLatlng,
	      map: map,
	      icon: {
	    	  url: 'images/drinks.png'
	      }
	  });
});

/* CLEAR INPUT CROSS */

jQuery(function($) {
	 
	  function tog(v){return v?'addClass':'removeClass';} 
	  
	  $(document).on('input', '.clearable', function(){
	    $(this)[tog(this.value)]('x');
	  }).on('mousemove', '.x', function( e ){
	    $(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');   
	  }).on('click', '.onX', function(){
	    $(this).removeClass('x onX').val('');
	  });
	  
});

/* RANGE SLIDER */
 
$("#rslider").ionRangeSlider({
    min: 1,
    max: 50,
    step: 5,
    postfix: " km",
    from: 1,
    hideMinMax: true,
    hideFromTo: false
});