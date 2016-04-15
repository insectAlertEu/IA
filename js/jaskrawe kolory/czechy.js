Czechy = L.geoJson(Czechy,  {style: styleCZB2014, onEachFeature: onEachFeatureCZ});

function getColorCZ(d) {
    return d > 4  ? '#d73027' :
  	       d > 3  ? '#fdae61' :
  	       d > 2  ? '#ffffbf' :
  	       d > 1  ? '#a6d96a' :
  	       d > 0  ? '#1a9850' :
  		   '#000000';
}


function styleCZB2014(feature) {
	return {
	    fillColor: getColorCZ(feature.properties.LymeB2012),
		weight: 3,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.70,
	};
}
	
function styleCZBWsk(feature) {
	return {
	    fillColor: getColorCZ(feature.properties.LymeB2011),
		weight: 3,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.70,
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

	document.getElementById("data").innerHTML = '<b>' + this.feature.properties.NAME_ENG +'</b></br>' + wsp +': </b>'  + this.feature.properties.LymeB2012  +'</br>';//  + '<object type="text/html" data="'+plik+'"></object>';

}

function resetHighlightCZ(e) {	
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
	

	
function zoomToFeatureCZ(e) {
	
		if (typeof clickRegion != "undefined") {
			map.addLayer(clickRegion);
			Czechy.resetStyle(clickRegion);
		}
		if (typeof region != "undefined") {
			map.removeLayer(region);
		}
			
		clickRegion = this;
		map.removeLayer(clickRegion);
		map.fitBounds(this.getBounds(), {
			}
			);	
		region = WarstwyCZ[this.feature.properties.NAME_ENG];
		map.addLayer(region);
		region.eachLayer(function (layer) {
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
var UstiNadLabem = L.geoJson(UstiNadLabem,  {onEachFeature: onEachFeature});
var VysocinaRegion = L.geoJson(VysocinaRegion,  {onEachFeature: onEachFeature});
var ZlinRegion = L.geoJson(ZlinRegion,  {onEachFeature: onEachFeature});



var WojCZ = L.featureGroup([CentralBohemian, HradecKralove, KralovyVary, Liberec, MoravianSilesian, OlomoucRegion, PardubiceRegion, PlzenRegion, Prague, SouthBohemian, SouthMoravian, UstiNadLabem, VysocinaRegion, ZlinRegion]);
WojCZ.eachLayer(function (layer) {
    layer.setStyle(styleCZB2014);
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
	"Usti Nad Labem" : UstiNadLabem,
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
	document.getElementById("data").innerHTML = '<b>' + this.feature.properties.Okres + '</b></br>' + 'Ticks: ' + this.feature.properties.LymeB2012;

}

function unZoomCZ(e) {
	if (typeof region != "undefined") {
		map.removeLayer(region);
	}
	if (typeof clickRegion != "undefined") {
		map.addLayer(clickRegion);

		Czechy.resetStyle(clickRegion);
	}
	map.fitBounds(Czechy.getBounds()); 
}

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeatureCZregion,
        mouseout: resetHighlightCZ,
        dblclick: unZoomCZ,
	});
}

	

	

