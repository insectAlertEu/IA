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
		$('div.window').toggleClass('collapsed');	//minimalizowanie menu

	}	
	
document.getElementById("data").innerHTML = '<b>hover on region</b>';	//wyświetlany tekst w oknie z danymi po prawej
	
	var tick1 = document.getElementById("myCheck1").checked;
	var tick2 = document.getElementById("myCheck2").checked;	//zmienne przechowujące stan checkboxów
	var tick3 = document.getElementById("myCheck2").checked;
	
	if (tick1) {
		Polska.addTo(map);	
		map.fitBounds(Polska.getBounds());	
	}
	else {
		map.removeLayer(Polska);
		if (typeof region != "undefined") {
			map.removeLayer(region);
		}		
	}

	if (tick2) {
		Czechy.addTo(map);
		map.fitBounds(Czechy.getBounds());	
	}
	else {
		map.removeLayer(Czechy);
		if (typeof region != "undefined") {
			map.removeLayer(region);
		}			
	}

	if (tick2 && tick1) {
		var group = new L.featureGroup([Polska, Czechy]);
		map.fitBounds(group.getBounds());

	}
	
	legend.update(getColorPL);
 }
 else{
		//	$('div.loading').toggleClass('show'); 
	 
 }
};



var wsp = 'LYME_DIS';

	
function check(wspolczynnik) {

		wsp = wspolczynnik;

	if (wspolczynnik == 'LYME_DIS' ){
		WojPL.eachLayer(function (layer) {
			layer.setStyle(stylePLB2014);
		});
		Polska.setStyle(stylePLB2014);

	}
	else if (wspolczynnik == 'LYME_TREND' ) {
		WojPL.eachLayer(function (layer) {
			layer.setStyle(stylePLBWsk);
		});
		Polska.setStyle(stylePLBWsk);
		wsp = 'LYME_TREND';
	}
 

}


new L.control.zoom({position: 'topright'}).addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    this.div = L.DomUtil.create('div', 'info legend');
	legend.update();
    return this.div;
};


legend.update = function (getColor) {
	var grades = [0, 125, 250, 375, 500, 625, 750, 875, -1],
		labels = ["<b>low risk</b>", "", "", "", "", "", "", "<b>high risk</b></br>", "<b>no data</b>"];

	this.div.innerHTML = '';
	
	if (typeof getColor != "undefined") {
		this.div.innerHTML = '';
		for (var i = 0; i < grades.length; i++) {
			this.div.innerHTML +='<i style="background:' + getColor(grades[i] + 1) + '"></i> ' + labels[i] + '<br>';
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
