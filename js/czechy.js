﻿Czech = L.geoJson(Czech,  {style: styleLymeCZ, onEachFeature: onEachFeatureCZ});

function getColorCZ(d) {
    return d > 4  ? '#bd0001' :
  	       d > 3  ? '#b76000' :
  	       d > 2  ? '#a7b200' :
  	       d > 1  ? '#46ad00' :
  	       d > 0  ? '#00a816' :
  		   '#ababab';
}


function styleLymeCZ(feature) {
	return {
	    fillColor: getColorCZ(feature.properties.LymeB2012),
		weight: 3,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.80,
		interactive:true,
	};
}
	

function highlightFeatureCZ(e) {
    this.setStyle({
		weight: 3,
		color: '#666',
		dashArray: '',
		fillOpacity: 1
    });
    this.bringToFront();


	// var plik = "opisy/"+this.feature.properties.NAME_ENG+".html";
	//var props = 'e.target.feature.properties.'+wsp+'';
	var props = 'e.target.feature.properties.LymeB2012';

	document.getElementById("data").innerHTML = '<b>' + this.feature.properties.NAME_ENG +'</b></br></br>' + wspNazwa +': '  + eval(props)  +'/5</br>'; //  + '<object type="text/html" data="'+plik+'"></object>';
	
}

function resetHighlightCZ(e) {	
    this.setStyle({
		weight: 3,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.80,
	});
    this.bringToBack();
	document.getElementById("data").innerHTML = "<b>hover on region</b>";

    }


var regionCZ; //dodawana nowa warstwa z powiatami
var clickRegion; //kliknięte województwo	
	

	
function zoomToFeatureCZ(e) {
	
		if (typeof clickRegion != "undefined") {
			map.addLayer(clickRegion);
			Czech.resetStyle(clickRegion);
		}
		if (typeof regionCZ != "undefined") {
			map.removeLayer(regionCZ);
		}
			
		clickRegion = this;
		map.removeLayer(clickRegion);
		map.fitBounds(this.getBounds());	
		regionCZ = WarstwyCZ[this.feature.properties.NAME_ENG];
		map.addLayer(regionCZ);
		regionCZ.eachLayer(function (layer) {
			layer.bringToBack()
	
		});
	
	
}	

function onEachFeatureCZ(feature, layer) {
    layer.on({
		mouseover: highlightFeatureCZ,
		mouseout: resetHighlightCZ,
		click: zoomToFeatureCZ,
    });
}



var CentralBohemian = L.geoJson(CentralBohemian,  {onEachFeature: onEachFeature});
var HradecKralove = L.geoJson(HradecKralove,  {onEachFeature: onEachFeature});
var KralovyVary = L.geoJson(KralovyVary,  {onEachFeature: onEachFeature});
var Liberec = L.geoJson(Liberec,  {onEachFeature: onEachFeature});
var MoravianSilesian = L.geoJson(MoravianSilesian,  {onEachFeature: onEachFeature});
var OlomoucRegion = L.geoJson(OlomoucRegion,  {onEachFeature: onEachFeature});
var PardubiceRegion = L.geoJson(PardubiceRegion,  {onEachFeature: onEachFeature});
var PlzenRegion = L.geoJson(PlzenRegion,  {onEachFeature: onEachFeature});
var Prague = L.geoJson(Prague,  {onEachFeature: onEachFeature});
var SouthBohemian = L.geoJson(SouthBohemian,  {onEachFeature: onEachFeature});
var SouthMoravian = L.geoJson(SouthMoravian,  {onEachFeature: onEachFeature});
var UstinadLabem = L.geoJson(UstinadLabem,  {onEachFeature: onEachFeature});
var VysocinaRegion = L.geoJson(VysocinaRegion,  {onEachFeature: onEachFeature});
var ZlinRegion = L.geoJson(ZlinRegion,  {onEachFeature: onEachFeature});



var WojCZ = L.featureGroup([CentralBohemian, HradecKralove, KralovyVary, Liberec, MoravianSilesian, OlomoucRegion, PardubiceRegion, PlzenRegion, Prague, SouthBohemian, SouthMoravian, UstinadLabem, VysocinaRegion, ZlinRegion]);
WojCZ.eachLayer(function (layer) {
    layer.setStyle(styleLymeCZ);
});


var WarstwyCZ = {
	"Central Bohemian" : CentralBohemian,
	"Hradec Kralove" : HradecKralove,
	"Kralovy Vary" : KralovyVary,
	"Liberec" : Liberec,
	"Moravian Silesian" : MoravianSilesian,
	"Olomouc Region" : OlomoucRegion,
	"Pardubice Region" : PardubiceRegion,
	"Plzen Region" : PlzenRegion,
	"Prague" : Prague,
	"South Bohemian" : SouthBohemian,
	"South Moravian" : SouthMoravian,
	"Usti nad Labem" : UstinadLabem,
	"Vysocina Region" : VysocinaRegion,
	"Zlin Region" : ZlinRegion
};	

	
function highlightFeatureCZregion(e) {
	this.setStyle({
		weight: 3,
		color: 'white',
		dashArray: '',
		fillOpacity: 1
	});
	this.bringToFront();
	
	var props = 'e.target.feature.properties.'+wsp+'';
	document.getElementById("data").innerHTML = '<b>' + this.feature.properties.Okres + '</b></br>' + wspNazwa +': ' + eval(props)  +'/5</br></br></br>';

}

function unZoomCZ(e) {
	if (typeof region != "undefined") {
		map.removeLayer(region);
	}
	if (typeof clickRegion != "undefined") {
		map.addLayer(clickRegion);

		Czech.resetStyle(clickRegion);
	}
	map.fitBounds(Czech.getBounds()); 
}

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeatureCZregion,
        mouseout: resetHighlightCZ,
        dblclick: unZoomCZ,
	});
}

	

	
