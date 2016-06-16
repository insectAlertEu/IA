Belarus = L.geoJson(Belarus,  {style: styleLymeBLR, onEachFeature: onEachFeatureBLR});

function getColorBLR(d) {
    return d > 40  ? '#bd0001' :
  	       d > 30  ? '#b76000' :
  	       d > 20  ? '#a7b200' :
  	       d > 10  ? '#46ad00' :
  	       d > 0  ? '#00a816' :
  		   '#ababab';
}


function styleLymeBLR(feature) {
	return {
	    fillColor: getColorBLR(feature.properties.INFECTED),
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '',
		fillOpacity: 0.80,
		interactive:true,
	};
}

function styleLymeBLR2(feature) {
	return {
	    fillColor: getColorBLR(feature.properties.INFECTED),
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '',
		fillOpacity: 0.20,
		interactive:true,
	};
}
	

function highlightFeatureBLR(e) {

if ($('#layer1').prop('checked')==1){
    this.setStyle({
		weight: 1,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.3,
	});

}
else {
    this.setStyle({
		weight: 1,
		color: '#666',
		dashArray: '',
		fillOpacity: 1,
	});

};
	if (!L.Browser.ie) {   
		this.bringToFront();
	}

	var props = 'e.target.feature.properties.INFECTED';
	var noSpaces = wspNazwa.replace(/\s/g, '');
	var userObserve = 'e.target.feature.properties.'+noSpaces+'';
	

	info._div.innerHTML = '<b>' + this.feature.properties.NAME_ENG +'</b><br><br>' + wspNazwa +': '  + eval(props)+'<br>'+'User observations: '+eval(userObserve);

}

function resetHighlightBLR(e) {	
   if ($('#layer1').prop('checked')==1){
    this.setStyle({
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '',
		fillOpacity: 0.20,
	});

}
else {
    this.setStyle({
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '',
		fillOpacity: 0.80,
	});

	};
    this.bringToBack();
	info._div.innerHTML = "<b>hover on region</b>";
//document.getElementById("data").innerHTML
    }


function zoomToFeatureBLR(e) {
	

		if (typeof clickRegion != "undefined") {
			map.addLayer(clickRegion);
			if (clickRegion.options.onEachFeature.name == "onEachFeaturePL"){
				Poland.resetStyle(clickRegion);
				if (typeof regionPL != "undefined") {
					map.removeLayer(regionPL);
				}
			}
			else if (clickRegion.options.onEachFeature.name == "onEachFeatureCZ"){
				Czech.resetStyle(clickRegion);
				if (typeof regionCZ != "undefined") {
					map.removeLayer(regionCZ);
				}
			}
		
		}

		

		map.fitBounds(this.getBounds());	
		
	
	
}	

function onEachFeatureBLR(feature, layer) {

	userData = userJson.data.filter(function (el) {
		return el.Region === feature.properties.NAME_ENG; 
	});
	
	for (var key in slownikWskaznikow) {
		if (slownikWskaznikow.hasOwnProperty(key)) {
			var prop = userData.filter(function (el) {
				return el.Index === slownikWskaznikow[key]; 
			});
			
			var noSpaces = slownikWskaznikow[key].replace(/\s/g, "");
			feature.properties[noSpaces]=prop.length;
			
		}
	}	
	

    layer.on({
		mouseover: highlightFeatureBLR,
		mouseout: resetHighlightBLR,
		click: zoomToFeatureBLR,
		contextmenu: contextmenuPL
    });
}