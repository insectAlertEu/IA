Europe = L.geoJson(Europe,  {style: noData, onEachFeature: onEachFeatureEU});

function getColorEU(d) {
    return d >= 1  ? '#ba3600' :
  	       d >= 0  ? '#00a816' :
  		   '#ababab';
}


function styleEUHYA(feature) {
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
	
function styleEUIXO(feature) {
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

function styleEUAED(feature) {
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

function styleEUMV(feature) {
	return {
	    fillColor: getColorEU(feature.properties.MACROVIPER),
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.80,
		interactive:true,
	};
}	
	
function styleEUVX(feature) {
	return {
	    fillColor: getColorEU(feature.properties.V_XANTHINA),
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.80,
		interactive:true,
	};
}	

function styleEUVAM(feature) {
	return {
	    fillColor: getColorEU(feature.properties.V_AMMODYTE),
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.80,
		interactive:true,
	};
}	

function styleEUVAS(feature) {
	return {
	    fillColor: getColorEU(feature.properties.V_ASPIS),
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.80,
		interactive:true,
	};
}	

function styleEUVB(feature) {
	return {
	    fillColor: getColorEU(feature.properties.V_BERUS),
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.80,
		interactive:true,
	};
}	

function styleEUVL(feature) {
	return {
	    fillColor: getColorEU(feature.properties.V_LATASTEI),
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
	var noSpaces = wspNazwa.replace(/\s/g, '');
	var userObserve = 'e.target.feature.properties.'+noSpaces+'';


	info._div.innerHTML = '<b>' + this.feature.properties.NAME_ENG +'</b><br><br>' + wspNazwa +': '  + eval(props)  +'<br>'+'User observations: '+eval(userObserve); //  + '<object type="text/html" data="'+plik+'"></object>';
	//document.getElementById("data").innerHTML
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
	info._div.innerHTML = "<b>hover on region</b>";
//document.getElementById("data").innerHTML
    }


	
function zoomToFeatureEU(e) {
	
		map.fitBounds(this.getBounds());	

}	


function onEachFeatureEU(feature, layer) {

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
		mouseover: highlightFeatureEU,
		mouseout: resetHighlightEU,
		click: zoomToFeatureEU,
		contextmenu: contextmenuPL
    });
}
	

