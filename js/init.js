var map = L.map('map',    {
				center: [50,18],
				zoom: 3,
				minZoom:5,
				
				doubleClickZoom: false,
				zoomControl: false
    		});							//tworzenie containera na mapę
			
map.createPane('labels');				//"warstwa" (nie mylić z layer) na mapie znajdująca się powyżej innych
map.getPane('labels').style.zIndex = 650;	// wyświetlająca labelsy
map.getPane('labels').style.pointerEvents = 'none'; 	//i nie reagująca na eventy myszki

var teren = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',{
  attribution: '© <a href="http://cartodb.com/attributions" title="Map tiles by CartoDB, under CC BY 3.0.">CartoDB</a> | © <a href="http://www.openstreetmap.org/copyright" title="Data by OpenStreetMap, under ODbL.">OpenStreetMap</a>'
}).addTo(map);		//warstwa mapy


var labels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png',{
	pane:'labels'  
}).addTo(map);		//warstwa nazw, wyświetlana w 'pane' stworzonym wcześniej

L.control.scale({position: 'bottomright'}).addTo(map);	//ręcznie dodane kontrolki zoomu w prawym rogu (domyślnie w lewym)

document.getElementById("data").innerHTML = '<b>choose data to show</b>';	//wyświetlany tekst w oknie z danymi po prawej


function init2(){		//uruchamiana przez zmianę checkboxów
	if (menu.className == 'window collapsed') {	//działa dopiero po zminimalizowaniu menu (po naciśnięciu przycisku)
		init1();
	}	
};


function init1(){		//funkcja uruchamiana po kliknięciu przycisku w menu początkowym, lub po zmianie zaznaczenia checkboxów już po zminimalizowaniu menu
 if (document.readyState === "complete") {		//menu zminimalizuje się po załadowaniu wszystkich danych
	if (menu.className != 'window collapsed') {		//sprawdzanie czy menu jest już zminimalizowane (czy wejście do fukcji zostało zainicjowane przez przycisk proceed
		dim.className = 'hide';		//wyłączanie zaciemnienia mapki
		jQuery('div.window').toggleClass('collapsed');	//minimalizowanie menu

	}	
	
document.getElementById("data").innerHTML = '<b>hover on region</b>';	//wyświetlany tekst w oknie z danymi po prawej
	
	var tick1 = document.getElementById("myCheck1").checked;
	var tick2 = document.getElementById("myCheck2").checked;	//zmienne przechowujące stan checkboxów

	var group = new L.featureGroup();
	
	if (tick1) {
		Poland.addTo(map);	
		group.addLayer(Poland);
	}
	else {

		map.removeLayer(Poland);
		group.removeLayer(Poland);
		if (typeof regionPL != "undefined") {
			map.removeLayer(regionPL);
		}		
		if (map.hasLayer(hogweedPoland)){

		map.removeLayer(hogweedPoland);
		}		
	}

	if (tick2) {
		Czech.addTo(map);
		group.addLayer(Czech);
	
	}
	else {
		map.removeLayer(Czech);
		group.removeLayer(Czech);
		if (typeof regionCZ != "undefined") {
			map.removeLayer(regionCZ);
		}			
	}
 if (jQuery.isEmptyObject(group.getLayers()) == false){
			map.fitBounds(group.getBounds());
		}
	

	
	legend.update(getColorPL);
 }
 
 if (wsp == "HOGWEED" && document.getElementById("myCheck1").checked) {
 hogweedPoland.addTo(map);
 }
 
  console.log(wspNazwa);
 if (wspNazwa == 'ticks' ){
 console.log("asd");
	var plik = "opisy/lymeDiseasePolandDesc.html";
		jQuery.get(plik, function(opis) {
		document.getElementById("info").innerHTML = opis;
		})
 } else{
 document.getElementById("info").innerHTML = "";
 }
 
 
};

var slownikWskaznikow = {			//tymczasowe do testów - docelowo nazwa radioValue ma odpowiadać nazwie danej wartości w geojsonie
	"ticks" : "LYME_DIS",
	"mosquito" : "LYME_TREND",
	"hogweed" : "HOGWEED",
};	

var wsp = slownikWskaznikow[jQuery('input[name="dane1"]:checked').val()];
var wspNazwa = jQuery('input[name="dane1"]:checked').val();


	
function check(radioValue) {



		wspNazwa = radioValue;
		wsp = slownikWskaznikow[radioValue];

	if (radioValue == 'ticks' ){
		WojPL.eachLayer(function (layer) {
			layer.setStyle(styleLymePL);
		});
		Poland.setStyle(styleLymePL);
		if (map.hasLayer(hogweedPoland)){
			map.removeLayer(hogweedPoland);
		}
		WojCZ.eachLayer(function (layer) {
			layer.setStyle(styleLymeCZ);
		});
		Czech.setStyle(styleLymeCZ);
		


	}
	else if (radioValue == 'mosquito' ) {
		WojPL.eachLayer(function (layer) {
			layer.setStyle(styleLymeTrendPL);
		});
		Poland.setStyle(styleLymeTrendPL);
		if (map.hasLayer(hogweedPoland)){
			map.removeLayer(hogweedPoland);
		}		
		WojCZ.eachLayer(function (layer) {
			layer.setStyle(noData);
		});
		Czech.setStyle(noData);
	}
	
	else if (radioValue == 'hogweed' ) {
		Poland.setStyle(noData);
		if (menu.className == 'window collapsed' && map.hasLayer(hogweedPoland) != true && document.getElementById("myCheck1").checked) {	//działa dopiero po zminimalizowaniu menu (po naciśnięciu przycisku)
				hogweedPoland.addTo(map);
		}	
		WojCZ.eachLayer(function (layer) {
			layer.setStyle(noData);
		});
		Czech.setStyle(noData);
	}	
	
	
	
if (menu.className == 'window collapsed'){
	legend.update();

	if (radioValue == 'ticks' ){
		var plik = "opisy/lymeDiseasePolandDesc.html";
		jQuery.get(plik, function(opis) {
			document.getElementById("info").innerHTML = opis;
		})
	} else{
 document.getElementById("info").innerHTML = "";
 }

}
}


new L.control.zoom({position: 'topright'}).addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    this.div = L.DomUtil.create('div', 'info legend');
	legend.update();
    return this.div;
};


legend.update = function () {

	if (wsp != "HOGWEED"){
	var grades = [0, 126, 251, 376, 501, 626, 751, 876, -1],
		labels = ["<b>low risk</b>", "", "", "", "", "", "", "<b>high risk</b></br>", "<b>no data</b>"];

	}
	else {
	var grades = [0, 876, -1],
		labels = ["<b>safe zone</b>", "<b>danger zone</b></br>", "<b>no data</b>"];

	}
		
	this.div.innerHTML = '';
	
	if (typeof getColorPL != "undefined") {
		this.div.innerHTML = '';
		for (var i = 0; i < grades.length; i++) {
			this.div.innerHTML +='<i style="background:' + getColorPL(grades[i]) + '"></i> ' + labels[i] + '<br>';
		}
	}
};
legend.addTo(map);


map.on('zoomstart', function() {
	map.removeLayer(labels);
});		

map.on('zoomend', function() {
	labels.addTo(map);
	
});
