Czech = L.geoJson(Czech,  {style: styleLymeCZ, onEachFeature: onEachFeatureCZ});

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
		weight: 1.5,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.80,
		interactive:true,
	};
}
	

function highlightFeatureCZ(e) {
    this.setStyle({
		weight: 1.5,
		color: '#666',
		dashArray: '',
		fillOpacity: 1
    });
if (!L.Browser.ie) {   
    this.bringToFront();
}


	// var plik = "opisy/"+this.feature.properties.NAME_ENG+".html";
	//var props = 'e.target.feature.properties.'+wsp+'';
	var props = 'e.target.feature.properties.LymeB2012';
	var noSpaces = wspNazwa.replace(/\s/g, '');
	var userObserve = 'e.target.feature.properties.'+noSpaces+'';


	info._div.innerHTML = '<b>' + this.feature.properties.NAME_ENG +'</b><br><br>' + wspNazwa +': '  + eval(props)  +'/5<br>'+'User observations: '+eval(userObserve); //  + '<object type="text/html" data="'+plik+'"></object>';
//document.getElementById("data").innerHTML	
}

function resetHighlightCZ(e) {	
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


var regionCZ; //dodawana nowa warstwa z powiatami
//var clickRegion; //kliknięte województwo - jest już zdefiniowany w Poland.js
	

	
function zoomToFeatureCZ(e) {
	

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
		regionCZ = WarstwyCZ[this.feature.properties.NAME_ENG];
		map.addLayer(regionCZ);
		regionCZ.eachLayer(function (layer) {
			layer.bringToBack()
	
		});
	console.log(regionCZ);
	
}	

function onEachFeatureCZ(feature, layer) {

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
		mouseover: highlightFeatureCZ,
		mouseout: resetHighlightCZ,
		click: zoomToFeatureCZ,
		contextmenu: contextmenuPL
    });
}


var CentralBohemian= new L.GeoJSON.AJAX('geojson/CZ/Central Bohemian.geojson', {onEachFeature:onEachFeatureCZregion});
var HradecKralove = new L.GeoJSON.AJAX('geojson/CZ/Hradec Kralove.geojson',  {onEachFeature: onEachFeatureCZregion});
var KralovyVary = new L.GeoJSON.AJAX('geojson/CZ/Kralovy Vary.geojson',  {onEachFeature: onEachFeatureCZregion});
var Liberec = new L.GeoJSON.AJAX('geojson/CZ/Liberec.geojson',  {onEachFeature: onEachFeatureCZregion});
var MoravianSilesian = new L.GeoJSON.AJAX('geojson/CZ/Moravian Silesian.geojson',  {onEachFeature: onEachFeatureCZregion});
var OlomoucRegion = new L.GeoJSON.AJAX('geojson/CZ/Olomouc Region.geojson',  {onEachFeature: onEachFeatureCZregion});
var PardubiceRegion = new L.GeoJSON.AJAX('geojson/CZ/Pardubice Region.geojson',  {onEachFeature: onEachFeatureCZregion});
var PlzenRegion = new L.GeoJSON.AJAX('geojson/CZ/Plzen Region.geojson',  {onEachFeature: onEachFeatureCZregion});
var Prague = new L.GeoJSON.AJAX('geojson/CZ/Prague.geojson',  {onEachFeature: onEachFeatureCZregion});
var SouthBohemian = new L.GeoJSON.AJAX('geojson/CZ/South Bohemian.geojson',  {onEachFeature: onEachFeatureCZregion});
var SouthMoravian = new L.GeoJSON.AJAX('geojson/CZ/South Moravian.geojson',  {onEachFeature: onEachFeatureCZregion});
var UstinadLabem = new L.GeoJSON.AJAX('geojson/CZ/Usti Nad Labem.geojson',  {onEachFeature: onEachFeatureCZregion});
var VysocinaRegion = new L.GeoJSON.AJAX('geojson/CZ/Vysocina Region.geojson',  {onEachFeature: onEachFeatureCZregion});
var ZlinRegion = new L.GeoJSON.AJAX('geojson/CZ/Zlin Region.geojson',  {onEachFeature: onEachFeatureCZregion});




// var CentralBohemian = L.geoJson(CentralBohemian,  {onEachFeature: onEachFeatureCZregion});
// var HradecKralove = L.geoJson(HradecKralove,  {onEachFeature: onEachFeatureCZregion});
// var KralovyVary = L.geoJson(KralovyVary,  {onEachFeature: onEachFeatureCZregion});
// var Liberec = L.geoJson(Liberec,  {onEachFeature: onEachFeatureCZregion});
// var MoravianSilesian = L.geoJson(MoravianSilesian,  {onEachFeature: onEachFeatureCZregion});
// var OlomoucRegion = L.geoJson(OlomoucRegion,  {onEachFeature: onEachFeatureCZregion});
// var PardubiceRegion = L.geoJson(PardubiceRegion,  {onEachFeature: onEachFeatureCZregion});
// var PlzenRegion = L.geoJson(PlzenRegion,  {onEachFeature: onEachFeatureCZregion});
// var Prague = L.geoJson(Prague,  {onEachFeature: onEachFeatureCZregion});
// var SouthBohemian = L.geoJson(SouthBohemian,  {onEachFeature: onEachFeatureCZregion});
// var SouthMoravian = L.geoJson(SouthMoravian,  {onEachFeature: onEachFeatureCZregion});
// var UstinadLabem = L.geoJson(UstinadLabem,  {onEachFeature: onEachFeatureCZregion});
// var VysocinaRegion = L.geoJson(VysocinaRegion,  {onEachFeature: onEachFeatureCZregion});
// var ZlinRegion = L.geoJson(ZlinRegion,  {onEachFeature: onEachFeatureCZregion});



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
		weight: 1.5,
		color: 'white',
		dashArray: '',
		fillOpacity: 1
	});
if (!L.Browser.ie) {   
    this.bringToFront();
}
	
	var props = 'e.target.feature.properties.LymeB2012';
	var noSpaces = wspNazwa.replace(/\s/g, '');
	var userObserve = 'e.target.feature.properties.'+noSpaces+'';
	

	info._div.innerHTML = '<b>' + this.feature.properties.Okres + '</b><br><br>' + wspNazwa +': ' + eval(props)  +'/5<br>'+'User observations: '+eval(userObserve);
//document.getElementById("data").innerHTML
}

function unZoomCZ(e) {
	if (typeof regionCZ != "undefined") {
		map.removeLayer(regionCZ);
	}
	if (typeof clickRegion != "undefined") {
		map.addLayer(clickRegion);

		Czech.resetStyle(clickRegion);
	}
	map.fitBounds(Czech.getBounds()); 
}

function contextmenuCZregion(e) {
		    window.location.href = "observation.php"+"?region="+this.feature.properties.Okres+"&index="+wspNazwa;	
}	

function onEachFeatureCZregion(feature, layer) {

	userData = userJson.data.filter(function (el) {
		return el.Region === feature.properties.Okres; 
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
		mouseover: highlightFeatureCZregion,
        mouseout: resetHighlightCZ,
        dblclick: unZoomCZ,
		contextmenu: contextmenuCZregion
			
	});
	
	
}