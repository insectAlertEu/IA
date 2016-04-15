Polska = L.geoJson(Polska,  {style: stylePLB2014, onEachFeature: onEachFeaturePL});


function getColorPL(d) {
    return d > 875  ? '#d73027' :
		   d > 750  ? '#f46d43' :
  	       d > 625  ? '#fdae61' :
  	       d > 500  ? '#fee08b' :
  	       d > 375  ? '#d9ef8b' :
  	       d > 250  ? '#a6d96a' :
  	       d > 125  ? '#66bd63' :
		   d > 0	? '#1a9850' :
  		   '#000000';
}


function stylePLB2014(feature) {
	return {
	    fillColor: getColorPL(feature.properties.LYME_DIS),
		weight: 3,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.70,
	};
}
	
function stylePLBWsk(feature) {
	return {
	    fillColor: getColorPL(feature.properties.LYME_TREND),
		weight: 3,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.70,
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


var plik = "opisy/"+this.feature.properties.NAME_ENG+".txt";
	
jQuery.get(plik, function(opis) {
	document.getElementById("data").innerHTML = '<b>' + e.target.feature.properties.NAME_ENG +'</b></br></br>' + wsp +': </b>'  + e.target.feature.properties.LYME_DIS  +'</br></br></br>'  + opis;
});
}

function resetHighlightPL(e) {	
    this.setStyle({
		weight: 3,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.70,
	});
    this.bringToBack();
	document.getElementById("data").innerHTML = "<b>hover on region</b>";

    }


var region; //dodawana nowa warstwa z powiatami
var clickRegion; //kliknięte województwo	
	

	
function zoomToFeaturePL(e) {

		if (typeof clickRegion != "undefined") {
			map.addLayer(clickRegion);
			if (clickRegion.options.onEachFeature.name == onEachFeaturePL){
			Polska.resetStyle(clickRegion);
			}
			else if (clickRegion.options.onEachFeature.name == onEachFeatureCZ){
			Czechy.resetStyle(clickRegion);
			}
		}
		if (typeof region != "undefined") {
			map.removeLayer(region);
		}
			
		clickRegion = this;
		map.removeLayer(clickRegion);
		map.fitBounds(this.getBounds(), {
			}
			);	
		region = WarstwyPL[this.feature.properties.NAME_ENG];
		map.addLayer(region);
		region.eachLayer(function (layer) {
			layer.bringToBack()
	
		});
	
	
}	

function onEachFeaturePL(feature, layer) {
    layer.on({
		mouseover: highlightFeaturePL,
		mouseout: resetHighlightPL,
		click: zoomToFeaturePL,
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
    layer.setStyle(stylePLB2014);
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
	document.getElementById("data").innerHTML = '<b>' + this.feature.properties.NAME_PL +' '+ this.feature.properties.TYPE + '</b></br>' + 'Ticks: ' + this.feature.properties.LYME_DIS;

}

function unZoomPL(e) {
	if (typeof region != "undefined") {
		map.removeLayer(region);
	}
	if (typeof clickRegion != "undefined") {
		map.addLayer(clickRegion);

		Polska.resetStyle(clickRegion);
	}
	map.fitBounds(Polska.getBounds()); 
}

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeaturePLregion,
        mouseout: resetHighlightPL,
        dblclick: unZoomPL,
	});
}

	

