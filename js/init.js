var map = L.map('map',    {
		center: [50,18],
		zoom: 3,
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

		
var group = new L.featureGroup();	//wszystkie aktualnie wyświetlane geojsony

$("document").ready(function() {

  $('.dropdown-menu').on('click', function(e) {
      if($(this).hasClass('dropdown-menu-form')) {
          e.stopPropagation();
      }
  });
});
			


var slownikWskaznikow = {				//przypisanie nazw dla zmiennych Danger Indexów
	"LYME_DIS" : "Lyme Disease D.I.",
	"HYALOMMA" : "Ticks - Hyalomma occurence",
	"IXODES_R" : "Ticks - Ixodes ricinus occurence",
	"AEDES_ALBO" : "Mosquitoes - Aedes albopictus occurence",	
	"HOGWEED" : "Sosnowsky's hogweed occurence",
	"MACROVIPER" : "MACROVIPER occurence",	
	"V_XANTHINA" : "V_XANTHINA occurence",	
	"V_AMMODYTE" : "V_AMMODYTE occurence",	
	"V_ASPIS" : "V_ASPIS occurence",	
	"V_BERUS" : "V_BERUS occurence",	
	"V_LATASTEI" : "V_LATASTEI occurence",	
};	

var wsp;			//aktualnie wybrany checkbox
var wspNazwa;		//nazwa wybranego Danger Indexu

function init(){		//funkcja uruchamiana po kliknięciu przycisku w menu początkowym
 
	if (document.readyState === "complete") {		//menu zminimalizuje się po załadowaniu wszystkich danych
		dim.className = 'hide';		//wyłączanie zaciemnienia mapki
		jQuery('div.window').toggleClass('collapsed');	//minimalizowanie menu
			
		document.getElementById("data").innerHTML = '<b>hover on region</b>';	//wyświetlany tekst w oknie z danymi po prawej
		check(jQuery('input[name="dane1"]:checked').val());			//sprawdzanie aktualnie wybranego checkboxa i ładowanie geojsonów
	}
};


function check(radioValue) {
	wspNazwa = slownikWskaznikow[radioValue];
	wsp = radioValue;
 
	if (menu.className == 'window collapsed') {	//działa dopiero po zminimalizowaniu menu (po naciśnięciu przycisku)
	
		if (typeof regionPL != "undefined") {
			map.removeLayer(regionPL);
		}	
		if (typeof regionCZ != "undefined") {
			map.removeLayer(regionCZ);
		}				
	
		if (radioValue == 'LYME_DIS' ){
			
			var plik = "opisy/lymeDiseasePolandDesc.html";
			jQuery.get(plik, function(opis) {
				document.getElementById("info").innerHTML = opis;
			})
		
			Poland.addTo(map);	
			group.addLayer(Poland);
			Czech.addTo(map);
			group.addLayer(Czech);
		
			WojPL.eachLayer(function (layer) {
				layer.setStyle(styleLymePL);
			});
			Poland.setStyle(styleLymePL);

			WojCZ.eachLayer(function (layer) {
				layer.setStyle(styleLymeCZ);
			});
			Czech.setStyle(styleLymeCZ);

			if (typeof clickRegion != "undefined") {
				map.addLayer(clickRegion);
				Poland.resetStyle(clickRegion);
				Czech.resetStyle(clickRegion);
			}			
		}
	
		if (radioValue == 'HYALOMMA' ){
			document.getElementById("info").innerHTML = "";
					
			Europe.addTo(map);
			group.addLayer(Europe);
			
			map.removeLayer(Poland);		
			map.removeLayer(Czech);
			group.removeLayer(Poland);
			group.removeLayer(Czech);
			
			Europe.setStyle(styleEUHYA);	
		}

		else if (radioValue == 'IXODES_R' ){
			document.getElementById("info").innerHTML = "";
					
			Europe.addTo(map);
			group.addLayer(Europe);
			

			map.removeLayer(Poland);			
			map.removeLayer(Czech);		
			group.removeLayer(Poland);
			group.removeLayer(Czech);
			
			Europe.setStyle(styleEUIXO);	
		}
	
		else if (radioValue == 'AEDES_ALBO' ) {
			document.getElementById("info").innerHTML = "";

			Europe.addTo(map);
			group.addLayer(Europe);

			map.removeLayer(Poland);			
			map.removeLayer(Czech);
			group.removeLayer(Poland);
			group.removeLayer(Czech);
			
			Europe.setStyle(styleEUAED);	
		}
		else if (radioValue == 'MACROVIPER' ) {
			document.getElementById("info").innerHTML = "";

			Europe.addTo(map);
			group.addLayer(Europe);

			map.removeLayer(Poland);			
			map.removeLayer(Czech);
			group.removeLayer(Poland);
			group.removeLayer(Czech);
			
			Europe.setStyle(styleEUMV);	
		}		
		else if (radioValue == 'V_XANTHINA' ) {
			document.getElementById("info").innerHTML = "";

			Europe.addTo(map);
			group.addLayer(Europe);

			map.removeLayer(Poland);			
			map.removeLayer(Czech);
			group.removeLayer(Poland);
			group.removeLayer(Czech);
			
			Europe.setStyle(styleEUVX);	
		}
		else if (radioValue == 'V_AMMODYTE' ) {
			document.getElementById("info").innerHTML = "";

			Europe.addTo(map);
			group.addLayer(Europe);

			map.removeLayer(Poland);			
			map.removeLayer(Czech);
			group.removeLayer(Poland);
			group.removeLayer(Czech);
			
			Europe.setStyle(styleEUVAM);	
		}
		else if (radioValue == 'V_ASPIS' ) {
			document.getElementById("info").innerHTML = "";

			Europe.addTo(map);
			group.addLayer(Europe);

			map.removeLayer(Poland);			
			map.removeLayer(Czech);
			group.removeLayer(Poland);
			group.removeLayer(Czech);
			
			Europe.setStyle(styleEUVAS);	
		}
		else if (radioValue == 'V_BERUS' ) {
			document.getElementById("info").innerHTML = "";

			Europe.addTo(map);
			group.addLayer(Europe);

			map.removeLayer(Poland);			
			map.removeLayer(Czech);
			group.removeLayer(Poland);
			group.removeLayer(Czech);
			
			Europe.setStyle(styleEUVB);	
		}
		else if (radioValue == 'V_LATASTEI' ) {
			document.getElementById("info").innerHTML = "";

			Europe.addTo(map);
			group.addLayer(Europe);

			map.removeLayer(Poland);			
			map.removeLayer(Czech);
			group.removeLayer(Poland);
			group.removeLayer(Czech);
			
			Europe.setStyle(styleEUVL);	
		}		
		
		else {
			map.removeLayer(Europe);		
			group.removeLayer(Europe);
		}
	
		if (radioValue == 'HOGWEED' ) {
			document.getElementById("info").innerHTML = "";

			Poland.addTo(map);	
			group.addLayer(Poland);
				
			Poland.setStyle(noData);
			
			if (map.hasLayer(hogweedPoland) != true) {
				hogweedPoland.addTo(map);
			}	

			map.removeLayer(Czech);		
			group.removeLayer(Czech);
		
		} else {
			if (map.hasLayer(hogweedPoland)){
				map.removeLayer(hogweedPoland);
			}			
		}
		
		
		if (jQuery.isEmptyObject(group.getLayers()) == false){
			map.fitBounds(group.getBounds());
		}	

		legend.update();

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
	var grades;
	var labels;

	if (wsp == "LYME_DIS"){
		grades = [0, 126, 251, 376, 501, 626, 751, 876, -1];
		labels = ["<b>low risk</b>", "", "", "", "", "", "", "<b>high risk</b></br>", "<b>no data</b>"];
	}
	else {
		grades = [0, 751, -1];
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
