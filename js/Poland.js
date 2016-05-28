Poland = L.geoJson(Poland,  {style: styleLymePL, onEachFeature: onEachFeaturePL});
hogweedPoland = L.geoJson(hogweedPoland,  {style: hogweed, onEachFeature: onEachFeaturePLhogweed});

function getColorPL(d) {
    return d > 875  ? '#bd0001' :
		   d > 750  ? '#ba3600' :
  	       d > 625  ? '#b76e00' :
  	       d > 500  ? '#b4a300' :
  	       d > 375  ? '#8bb100' :
  	       d > 250  ? '#53ae00' :
  	       d > 125  ? '#1daa00' :
		   d >= 0	? '#00a816' :
  		   '#ababab';
}

function getColorHogweed(d) {
    return d >= 1  ? '#ba3600' :
  	       d >= 0  ? '#00a816' :
  		   '#ababab';
}



function noData(feature) {
	return {
	    fillColor: '#ababab',
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '',
		fillOpacity: 0.80,
		interactive:false,
	};
}

function hidden(feature) {
	return {
	    fillColor: '#ababab',
		weight: 1.5,
		opacity: 0,
		color: 'white',
		dashArray: '',
		fillOpacity: 0,
		interactive:false,
	};
}

function safe(feature) {
	return {
	    fillColor: '#00a816',
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '',
		fillOpacity: 0.80,
		interactive:false,
	};
}

function hogweed(feature) {
	return {
	    fillColor: getColorHogweed(feature.properties.HOGWEED),
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '',
		fillOpacity: 0.80,
		interactive:true,		
	};
}

function styleLymePL(feature) {
	return {
	    fillColor: getColorPL(feature.properties.LYME_DIS),
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '',
		fillOpacity: 0.80,
		interactive:true,
	};
}
	
		
			

function highlightFeaturePL(e) {

if (!L.Browser.ie) {   
    this.bringToFront();
}
		this.setStyle({
		weight: 1.5,
		color: '#666',
		dashArray: '',
		fillOpacity: 1
     });
	


var props = 'e.target.feature.properties.'+wsp+'';
	var noSpaces = wspNazwa.replace(/\s/g, "");
var userObserve = 'e.target.feature.properties.'+noSpaces+'';

	info._div.innerHTML = '<b>' + e.target.feature.properties.NAME_ENG +'</b><br><br>' + wspNazwa +': </b>'  + eval(props)+'<br>'+'User observations: '+eval(userObserve);		//docelowo pozbyć się eval - jest ponoć niebezpieczna pod względem zabezpieczeń	
//document.getElementById("data").innerHTML

	
}

function resetHighlightPL(e) {	

    this.setStyle({
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '',
		fillOpacity: 0.80,
	});
  //  this.bringToBack();
	info._div.innerHTML = "<b>hover on region</b>";
//document.getElementById("data").innerHTML
    }


var regionPL; //dodawana nowa warstwa z powiatami
var regionHog; //dodawana nowa warstwa z powiatami
var clickRegion; //kliknięte województwo	
var clickRegionHog; //kliknięte województwo
	
function zoomToFeaturePL(e) {

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

			
		clickRegion = this;
		map.removeLayer(clickRegion);
		map.fitBounds(this.getBounds());	
		regionPL = WarstwyPL[this.feature.properties.NAME_ENG];
		map.addLayer(regionPL);
		regionPL.eachLayer(function (layer) {
			layer.bringToBack()
	
		});

	
}


function zoomToFeaturePLhogweed(e) {



		if (typeof clickRegionHog != "undefined") {
			map.addLayer(clickRegionHog);
			if (clickRegionHog.options.onEachFeature.name == "onEachFeaturePLhogweed"){
				hogweedPoland.resetStyle(clickRegionHog);
				if (typeof regionHog != "undefined") {
					map.removeLayer(regionHog);
				}
			}

		}

		clickRegionHog = this;
		map.removeLayer(clickRegionHog);
		map.fitBounds(this.getBounds());	
		regionHog = WarstwyPLhog[this.feature.properties.NAME_ENG];
		map.addLayer(regionHog);
		regionHog.eachLayer(function (layer) {
			layer.bringToBack()
	
		});
		
		
}	


function onEachFeaturePL(feature, layer) {

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
		
	if (feature.properties.LYME_TREND == -11){
	layer.bindLabel("Trend: no data", {pane:'labels'});
	}
	else{
	layer.bindLabel("Trend: " + feature.properties.LYME_TREND, {pane:'labels'});
	}
	
	
    layer.on({
		mouseover: highlightFeaturePL,
		mouseout: resetHighlightPL,
		click: zoomToFeaturePL,
		contextmenu: contextmenuPL
    });
}

function contextmenuPL(e) {
		    window.location.href = "observation.php"+"?region="+this.feature.properties.NAME_ENG+"&index="+wspNazwa;	
}	


function onEachFeaturePLhogweed(feature, layer) {

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
		mouseover: highlightFeaturePL,
		mouseout: resetHighlightPL,
		click: zoomToFeaturePLhogweed,
		contextmenu: contextmenuPL
    });
}

var Dolnoslaskie= new L.GeoJSON.AJAX('geojson/PL/Lower Silesian Voivodeship.geojson', {onEachFeature:onEachFeaturePLregion});
//var Dolnoslaskie = L.geoJson(Dolnoslaskie,  {onEachFeature: onEachFeaturePLregion});
var KujawskoPomorskie = new L.GeoJSON.AJAX('geojson/PL/Kuyavian-Pomeranian Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregion});
var Lodzkie = new L.GeoJSON.AJAX('geojson/PL/Lodz Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregion});
var Lubelskie = new L.GeoJSON.AJAX('geojson/PL/Lublin Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregion});
var Lubuskie = new L.GeoJSON.AJAX('geojson/PL/Lubusz Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregion});
var Malopolskie = new L.GeoJSON.AJAX('geojson/PL/Lesser Poland Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregion});
var Mazowieckie = new L.GeoJSON.AJAX('geojson/PL/Masovian Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregion});
var Opolskie = new L.GeoJSON.AJAX('geojson/PL/Opole Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregion});
var Podkarpackie = new L.GeoJSON.AJAX('geojson/PL/Podkarpackie Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregion});
var Podlaskie = new L.GeoJSON.AJAX('geojson/PL/Podlaskie Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregion});
var Pomorskie = new L.GeoJSON.AJAX('geojson/PL/Pomeranian Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregion});
var Slaskie = new L.GeoJSON.AJAX('geojson/PL/Silesian Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregion});
var Swietokrzyskie = new L.GeoJSON.AJAX('geojson/PL/Swietokrzyskie Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregion});
var WarminskoMazurskie = new L.GeoJSON.AJAX('geojson/PL/Warmian-Masurian Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregion});
var Wielkopolskie = new L.GeoJSON.AJAX('geojson/PL/Greater Poland Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregion});
var ZachodnioPomorskie = new L.GeoJSON.AJAX('geojson/PL/West Pomeranian Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregion});



var WojPL = L.featureGroup([Dolnoslaskie, KujawskoPomorskie, Lodzkie, Lubelskie, Lubuskie, Malopolskie, Mazowieckie, Opolskie, Podkarpackie, Podlaskie, Pomorskie, Slaskie, Swietokrzyskie, WarminskoMazurskie, Wielkopolskie, ZachodnioPomorskie]);
WojPL.eachLayer(function (layer) {
    layer.setStyle(styleLymePL);
});


var WarstwyPL = {
	"Lower Silesian Voivodeship" : Dolnoslaskie,
	"Kuyavian-Pomeranian Voivodeship" : KujawskoPomorskie,
	"Lodz Voivodeship" : Lodzkie,
	"Lublin Voivodeship" : Lubelskie,
	"Lubusz Voivodeship" : Lubuskie,
	"Lesser Poland Voivodeship" : Malopolskie,
	"Masovian Voivodeship" : Mazowieckie,
	"Opole Voivodeship" : Opolskie,
	"Podkarpackie Voivodeship" : Podkarpackie,
	"Podlaskie Voivodeship" : Podlaskie,
	"Pomeranian Voivodeship" : Pomorskie,
	"Silesian Voivodeship" : Slaskie,
	"Swietokrzyskie Voivodeship" : Swietokrzyskie,
	"Warmian-Masurian Voivodeship" : WarminskoMazurskie,
	"Greater Poland Voivodeship" : Wielkopolskie,
	"West Pomeranian Voivodeship" : ZachodnioPomorskie
};	

var H_Dolnoslaskie= new L.GeoJSON.AJAX('geojson/PL/H_Lower Silesian Voivodeship.geojson', {onEachFeature:onEachFeaturePLregionHog});

var H_KujawskoPomorskie = new L.GeoJSON.AJAX('geojson/PL/H_Kuyavian-Pomeranian Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregionHog});
var H_Lodzkie = new L.GeoJSON.AJAX('geojson/PL/H_Lodz Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregionHog});
var H_Lubelskie = new L.GeoJSON.AJAX('geojson/PL/H_Lublin Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregionHog});
var H_Lubuskie = new L.GeoJSON.AJAX('geojson/PL/H_Lubusz Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregionHog});
var H_Malopolskie = new L.GeoJSON.AJAX('geojson/PL/H_Lesser Poland Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregionHog});
var H_Mazowieckie = new L.GeoJSON.AJAX('geojson/PL/H_Masovian Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregionHog});
var H_Opolskie = new L.GeoJSON.AJAX('geojson/PL/H_Opole Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregionHog});
var H_Podkarpackie = new L.GeoJSON.AJAX('geojson/PL/H_Podkarpackie Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregionHog});
var H_Podlaskie = new L.GeoJSON.AJAX('geojson/PL/H_Podlaskie Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregionHog});
var H_Pomorskie = new L.GeoJSON.AJAX('geojson/PL/H_Pomeranian Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregionHog});
var H_Slaskie = new L.GeoJSON.AJAX('geojson/PL/H_Silesian Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregionHog});
var H_Swietokrzyskie = new L.GeoJSON.AJAX('geojson/PL/H_Swietokrzyskie Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregionHog});
var H_WarminskoMazurskie = new L.GeoJSON.AJAX('geojson/PL/H_Warmian-Masurian Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregionHog});
var H_Wielkopolskie = new L.GeoJSON.AJAX('geojson/PL/H_Greater Poland Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregionHog});
var H_ZachodnioPomorskie = new L.GeoJSON.AJAX('geojson/PL/H_West Pomeranian Voivodeship.geojson',  {onEachFeature: onEachFeaturePLregionHog});


var WojPLhog = L.featureGroup([H_Dolnoslaskie, H_KujawskoPomorskie, H_Lodzkie, H_Lubelskie, H_Lubuskie, H_Malopolskie, H_Mazowieckie, H_Opolskie, H_Podkarpackie, H_Podlaskie, H_Pomorskie, H_Slaskie, H_Swietokrzyskie, H_WarminskoMazurskie, H_Wielkopolskie, H_ZachodnioPomorskie]);
WojPLhog.eachLayer(function (layer) {
    layer.setStyle(hogweed);
});





var WarstwyPLhog = {
	"Lower Silesian Voivodeship" : H_Dolnoslaskie,
	"Kuyavian-Pomeranian Voivodeship" : H_KujawskoPomorskie,
	"Lodz Voivodeship" : H_Lodzkie,
	"Lublin Voivodeship" : H_Lubelskie,
	"Lubusz Voivodeship" : H_Lubuskie,
	"Lesser Poland Voivodeship" : H_Malopolskie,
	"Masovian Voivodeship" : H_Mazowieckie,
	"Opole Voivodeship" : H_Opolskie,
	"Podkarpackie Voivodeship" : H_Podkarpackie,
	"Podlaskie Voivodeship" : H_Podlaskie,
	"Pomeranian Voivodeship" : H_Pomorskie,
	"Silesian Voivodeship" : H_Slaskie,
	"Swietokrzyskie Voivodeship" : H_Swietokrzyskie,
	"Warmian-Masurian Voivodeship" : H_WarminskoMazurskie,
	"Greater Poland Voivodeship" : H_Wielkopolskie,
	"West Pomeranian Voivodeship" : H_ZachodnioPomorskie
};	


	
function highlightFeaturePLregion(e) {


	this.setStyle({
		weight: 1.5,
		color: 'white',
		dashArray: '',
		fillOpacity: 1
	});
if (!L.Browser.ie) {   
    this.bringToFront();
}


	
	var props = 'e.target.feature.properties.'+wsp+'';

	var noSpaces = wspNazwa.replace(/\s/g, "");
	var userObserve = 'e.target.feature.properties.'+noSpaces+'';
	
	info._div.innerHTML = '<b>' + this.feature.properties.NAME_PL +' '+ this.feature.properties.TYPE +'</b><br><br>' + wspNazwa +': '  + eval(props)+'<br>'+'User observations: '+eval(userObserve);	
//document.getElementById("data").innerHTML	
}

function unZoomPL(e) {
	if (typeof regionPL != "undefined") {
		map.removeLayer(regionPL);
	}
	if (typeof regionHog != "undefined") {
		map.removeLayer(regionHog);
	}	
	
	if (typeof clickRegion != "undefined") {
		map.addLayer(clickRegion);

		Poland.resetStyle(clickRegion);
	}
	map.fitBounds(Poland.getBounds()); 
}

function unZoomPLhog(e) {
	
	if (typeof regionHog != "undefined") {
		map.removeLayer(regionHog);
	}	
	
	if (typeof clickRegionHog != "undefined") {
		map.addLayer(clickRegionHog);

		hogweedPoland.resetStyle(clickRegionHog);
	}
	map.fitBounds(hogweedPoland.getBounds()); 
}



function onEachFeaturePLregion(feature, layer) {

	userData = userJson.data.filter(function (el) {
		return el.Region === feature.properties.NAME_PL +' '+ feature.properties.TYPE; 
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

	if (feature.properties.LYME_TREND == -11){
	layer.bindLabel("Trend: no data", {pane:'labels'});
	}
	else{
	layer.bindLabel("Trend: " + feature.properties.LYME_TREND, {pane:'labels'});
	}
	layer.on({
		mouseover: highlightFeaturePLregion,
        mouseout: resetHighlightPL,
        dblclick: unZoomPL,
		contextmenu: contextmenuPLregion
	});
}
function contextmenuPLregion(e) {
		    window.location.href = "observation.php"+"?region="+this.feature.properties.NAME_PL +' '+ this.feature.properties.TYPE+"&index="+wspNazwa;	
}	
	
function onEachFeaturePLregionHog(feature, layer) {

	userData = userJson.data.filter(function (el) {
		return el.Region === feature.properties.NAME_PL; 
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
		mouseover: highlightFeaturePLregion,
        mouseout: resetHighlightPL,
        dblclick: unZoomPLhog,
		contextmenu: contextmenuPLregionHog
	});
}

function contextmenuPLregionHog(e) {
		    window.location.href = "observation.php"+"?region="+this.feature.properties.NAME_PL +"&index="+wspNazwa;	
}	
