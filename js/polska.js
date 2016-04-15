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
		weight: 3,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.80,
		interactive:false,
	};
}

function safe(feature) {
	return {
	    fillColor: '#00a816',
		weight: 3,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.80,
		interactive:false,
	};
}

function hogweed(feature) {
	return {
	    fillColor: '#bd0001',
		weight: 3,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.80,
		interactive:true,		
	};
}

function styleLymePL(feature) {
	return {
	    fillColor: getColorPL(feature.properties.LYME_DIS),
		weight: 3,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.80,
		interactive:true,
	};
}
	
function styleLymeTrendPL(feature) {
	return {
	    fillColor: getColorPL(feature.properties.LYME_TREND),
		weight: 3,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.80,
		interactive:true,
	};
}


		
			

function highlightFeaturePL(e) {
    this.setStyle({
		weight: 3,
		color: '#666',
		dashArray: '',
		fillOpacity: 1
    });
    this.bringToFront();



var props = 'e.target.feature.properties.'+wsp+'';

	document.getElementById("data").innerHTML = '<b>' + e.target.feature.properties.NAME_ENG +'</b></br></br>' + wspNazwa +': </b>'  + eval(props)  +'</br>';		//docelowo pozbyć się eval - jest ponoć niebezpieczna pod względem zabezpieczeń	


	
}

function resetHighlightPL(e) {	
    this.setStyle({
		weight: 3,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.80,
	});
  //  this.bringToBack();
	document.getElementById("data").innerHTML = "<b>hover on region</b>";

    }


var regionPL; //dodawana nowa warstwa z powiatami
var clickRegion; //kliknięte województwo	
	

	
function zoomToFeaturePL(e) {

		if (typeof clickRegion != "undefined") {
			map.addLayer(clickRegion);
			if (clickRegion.options.onEachFeature.name == onEachFeaturePL){
			Poland.resetStyle(clickRegion);
			}
			else if (clickRegion.options.onEachFeature.name == onEachFeatureCZ){
			Czech.resetStyle(clickRegion);
			}
		}
		if (typeof regionPL != "undefined") {
			map.removeLayer(regionPL);
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

	layer.bindLabel("Trend: " + feature.properties.LYME_TREND, {pane:'labels'});
    layer.on({
		mouseover: highlightFeaturePL,
		mouseout: resetHighlightPL,
		click: zoomToFeaturePL,
    });
}

function onEachFeaturePLhogweed(feature, layer) {
    layer.on({
		mouseover: highlightFeaturePL,
		mouseout: resetHighlightPL,
		click: zoomToFeaturePLhogweed,
    });
}

var Dolnoslaskie = L.geoJson(Dolnoslaskie,  {onEachFeature: onEachFeature});
var KujawskoPomorskie = L.geoJson(KujawskoPomorskie,  {onEachFeature: onEachFeature});
var Lodzkie = L.geoJson(Lodzkie,  {onEachFeature: onEachFeature});
var Lubelskie = L.geoJson(Lubelskie,  {onEachFeature: onEachFeature});
var Lubuskie = L.geoJson(Lubuskie,  {onEachFeature: onEachFeature});
var Malopolskie = L.geoJson(Malopolskie,  {onEachFeature: onEachFeature});
var Mazowieckie = L.geoJson(Mazowieckie,  {onEachFeature: onEachFeature});
var Opolskie = L.geoJson(Opolskie,  {onEachFeature: onEachFeature});
var Podkarpackie = L.geoJson(Podkarpackie,  {onEachFeature: onEachFeature});
var Podlaskie = L.geoJson(Podlaskie,  {onEachFeature: onEachFeature});
var Pomorskie = L.geoJson(Pomorskie,  {onEachFeature: onEachFeature});
var Slaskie = L.geoJson(Slaskie,  {onEachFeature: onEachFeature});
var Swietokrzyskie = L.geoJson(Swietokrzyskie,  {onEachFeature: onEachFeature});
var WarminskoMazurskie = L.geoJson(WarminskoMazurskie,  {onEachFeature: onEachFeature});
var Wielkopolskie = L.geoJson(Wielkopolskie,  {onEachFeature: onEachFeature});
var ZachodnioPomorskie = L.geoJson(ZachodnioPomorskie,  {onEachFeature: onEachFeature});



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
		weight: 3,
		color: 'white',
		dashArray: '',
		fillOpacity: 1
	});
	this.bringToFront();
	
	var props = 'e.target.feature.properties.'+wsp+'';
	
	document.getElementById("data").innerHTML = '<b>' + this.feature.properties.NAME_PL +' '+ this.feature.properties.TYPE +'</b></br></br>' + wspNazwa +': </b>'  + eval(props)  +'</br></br></br>';
	
}

function unZoomPL(e) {
	if (typeof region != "undefined") {
		map.removeLayer(region);
	}
	if (typeof clickRegion != "undefined") {
		map.addLayer(clickRegion);

		Poland.resetStyle(clickRegion);
	}
	map.fitBounds(Poland.getBounds()); 
}

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeaturePLregion,
        mouseout: resetHighlightPL,
        dblclick: unZoomPL,
	});
}

	

