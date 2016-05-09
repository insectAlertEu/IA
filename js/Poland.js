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
	    fillColor: '#bd0001',
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

	info._div.innerHTML = '<b>' + e.target.feature.properties.NAME_ENG +'</b></br></br>' + wspNazwa +': </b>'  + eval(props)  +'</br>';		//docelowo pozbyć się eval - jest ponoć niebezpieczna pod względem zabezpieczeń	
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
var clickRegion; //kliknięte województwo	
	

	
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
		map.fitBounds(this.getBounds());	
}	

function onEachFeaturePL(feature, layer) {
	
	if (feature.properties.LYME_TREND == -11){
	layer.bindLabel("no data", {pane:'labels'});
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
		    window.location.href = "observation.html"+"?"+this.feature.properties.NAME_ENG;	
}	


function onEachFeaturePLhogweed(feature, layer) {
    layer.on({
		mouseover: highlightFeaturePL,
		mouseout: resetHighlightPL,
		click: zoomToFeaturePLhogweed,
    });
}

var Dolnoslaskie = L.geoJson(Dolnoslaskie,  {onEachFeature: onEachFeaturePLregion});
var KujawskoPomorskie = L.geoJson(KujawskoPomorskie,  {onEachFeature: onEachFeaturePLregion});
var Lodzkie = L.geoJson(Lodzkie,  {onEachFeature: onEachFeaturePLregion});
var Lubelskie = L.geoJson(Lubelskie,  {onEachFeature: onEachFeaturePLregion});
var Lubuskie = L.geoJson(Lubuskie,  {onEachFeature: onEachFeaturePLregion});
var Malopolskie = L.geoJson(Malopolskie,  {onEachFeature: onEachFeaturePLregion});
var Mazowieckie = L.geoJson(Mazowieckie,  {onEachFeature: onEachFeaturePLregion});
var Opolskie = L.geoJson(Opolskie,  {onEachFeature: onEachFeaturePLregion});
var Podkarpackie = L.geoJson(Podkarpackie,  {onEachFeature: onEachFeaturePLregion});
var Podlaskie = L.geoJson(Podlaskie,  {onEachFeature: onEachFeaturePLregion});
var Pomorskie = L.geoJson(Pomorskie,  {onEachFeature: onEachFeaturePLregion});
var Slaskie = L.geoJson(Slaskie,  {onEachFeature: onEachFeaturePLregion});
var Swietokrzyskie = L.geoJson(Swietokrzyskie,  {onEachFeature: onEachFeaturePLregion});
var WarminskoMazurskie = L.geoJson(WarminskoMazurskie,  {onEachFeature: onEachFeaturePLregion});
var Wielkopolskie = L.geoJson(Wielkopolskie,  {onEachFeature: onEachFeaturePLregion});
var ZachodnioPomorskie = L.geoJson(ZachodnioPomorskie,  {onEachFeature: onEachFeaturePLregion});



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
	
	info._div.innerHTML = '<b>' + this.feature.properties.NAME_PL +' '+ this.feature.properties.TYPE +'</b></br></br>' + wspNazwa +': </b>'  + eval(props)  +'</br></br></br>';
//document.getElementById("data").innerHTML	
}

function unZoomPL(e) {
	if (typeof regionPL != "undefined") {
		map.removeLayer(regionPL);
	}
	if (typeof clickRegion != "undefined") {
		map.addLayer(clickRegion);

		Poland.resetStyle(clickRegion);
	}
	map.fitBounds(Poland.getBounds()); 
}

function onEachFeaturePLregion(feature, layer) {

	if (feature.properties.LYME_TREND == -11){
	layer.bindLabel("no data", {pane:'labels'});
	}
	else{
	layer.bindLabel("Trend: " + feature.properties.LYME_TREND, {pane:'labels'});
	}
	layer.on({
		mouseover: highlightFeaturePLregion,
        mouseout: resetHighlightPL,
        dblclick: unZoomPL,
		contextmenu: contextmenuPL
	});
}

	

