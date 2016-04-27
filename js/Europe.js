Europe = L.geoJson(Europe,  {style: noData, onEachFeature: onEachFeatureEU});

function getColorEU(d) {
    return d >= 1  ? '#ba3600' :
  	       d >= 0  ? '#00a816' :
  		   '#ababab';
}


function styleLymeEUHYA(feature) {
	return {
	    fillColor: getColorEU(feature.properties.HYALOMMA),
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.80,
		interactive:true,
	};
}
	
function styleLymeEUIXO(feature) {
	return {
	    fillColor: getColorEU(feature.properties.IXODES_R),
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.80,
		interactive:true,
	};
}

function styleLymeEUAED(feature) {
	return {
	    fillColor: getColorEU(feature.properties.AEDES_ALBO),
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.80,
		interactive:true,
	};
}	

function highlightFeatureEU(e) {
    this.setStyle({
		weight: 1.5,
		color: '#666',
		dashArray: '',
		fillOpacity: 1
    });
if (!L.Browser.ie) {   
    this.bringToFront();
}


	
	var props = 'e.target.feature.properties.'+wsp+'';
	

	document.getElementById("data").innerHTML = '<b>' + this.feature.properties.NAME_ENG +'</b></br></br>' + wspNazwa +': '  + eval(props)  +'</br>'; //  + '<object type="text/html" data="'+plik+'"></object>';
	
}

function resetHighlightEU(e) {	
    this.setStyle({
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.80,
	});
    this.bringToBack();
	document.getElementById("data").innerHTML = "<b>hover on region</b>";

    }


	
function zoomToFeatureEU(e) {
	
		map.fitBounds(this.getBounds());	
		
	
	
}	

function onEachFeatureEU(feature, layer) {
    layer.on({
		mouseover: highlightFeatureEU,
		mouseout: resetHighlightEU,
		click: zoomToFeatureEU,
    });
}
	

