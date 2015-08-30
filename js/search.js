$(function(){

	// Google maps scripts
	var map;
	var infoWindow;
	var service;
	var brainstation = {lat: 43.650033, lng: -79.391594 };
	var markersArr = [];

	// Listener for checkboxes
	$('[name=searchquery]').on('change.radiocheck', function(){

		// Clear map markers
		clearOverlays();	

		// Create a service and render markers for each checkbox
		$('[name=searchquery]:checked').each(function(){
			var request = {
				location: brainstation,
				radius: 1000,
				keyword: $(this).val()
			};
			service = new google.maps.places.PlacesService(map);

			service.nearbySearch(request, callback);
		});
	});

	// Initialize google maps
	initMap();

	function initMap(){

		map = new google.maps.Map(document.getElementById('google-map'), {
			center: brainstation,
			zoom: 12
		});

		infoWindow = new google.maps.InfoWindow();
	};

	// function performSearch() {
	// 	var keyword = ''; 
	// 	$('[name=searchquery]:checked').each(function(){
	// 		keyword += $(this).val() + '';
	// 	});

	// 	var request = {
	// 		bounds: map.getBounds(),
	// 		keyword: keyword
	// 	};
	// 	service.radarSearch(request, callback);
	// };

	function callback(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				createMarker(results[i]);
			}
		}
	};

	function createMarker(place) {
		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
			map: map,
			position: placeLoc
		});

		markersArr.push(marker);

		google.maps.event.addListener(marker, 'click', function() {
			service.getDetails(place, function(result, status) {
				if (status !== google.maps.places.PlacesServiceStatus.OK) {
					console.error(status);
					return;
				}

				var name = (typeof result.name === 'undefined') ? 'no business name' : result.name;	
				var address = (typeof result.formatted_address === 'undefined') ? 'no address' : result.formatted_address;
				var pNumber = (typeof result.formatted_phone_number === 'undefined') ? '<em>no phone number</em>' : result.formatted_phone_number;
				var website = (typeof result.website === 'undefined') ? '<em>no website</em>' : '<a href="'+result.website+'">'+result.website+'</a>';

				infoWindow.setContent('<strong>' + name + '</strong><br/>'+ address + '<br/>'+pNumber + '<br/>' + website);
				infoWindow.open(map, marker);
			});
		});
	};

	function clearOverlays() {
		for (var i = 0; i < markersArr.length; i++ ) {
			markersArr[i].setMap(null);
		}
		markersArr.length = 0;
	};

});

