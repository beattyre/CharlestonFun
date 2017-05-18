var map;
function initmap() {
		map = new L.map('map');
		var osmTile = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var osmAttributes = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
		var osm = L.tileLayer(osmTile, {
				minZoom: 8,
				maxZoom: 20,
				attribution: osmAttributes,
    });
		map.setView(new L.LatLng(32.8211, -79.9705), 11);
		map.addLayer(osm);
};

initmap();
	
// Load Charleston Point Data

$.getJSON("https://rawgit.com/beattyre/CharlestonFun/master/data/CharlestonDestinations.geojson", function(data){
  var destinations =  L.geoJson(data, {
	  pointToLayer: function(feature, latlng){
			var marker = L.marker(latlng);
			marker.bindPopup('<b>Destination:</b> ' + feature.properties.NAME + '<br>' + '<b>Type:</b> ' + feature.properties.TYPE);
			return marker;
	  }
  }).addTo(map);
  var clusters = L.markerClusterGroup({
  	maxClusterRadius: 500, showCoverageOnHover: false, singleMarkerMode: true, 
 	});
  clusters.addLayer(destinations);
  map.addLayer(clusters);
  clusters.refreshClusters();
});
	
