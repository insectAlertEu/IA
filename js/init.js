var map = L.map('map',    {
		center: [50,18],
		zoom: 3,
		doubleClickZoom: false,
		zoomControl: false
	});							//tworzenie containera na mapę

map.createPane('labels');				//"warstwa" (nie mylić z layer) na mapie znajdująca się powyżej innych
map.getPane('labels').style.zIndex = 550;	// wyświetlająca labelsy
map.getPane('labels').style.pointerEvents = 'none'; 	//i nie reagująca na eventy myszki

var teren = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',{
  attribution: '© <a href="http://cartodb.com/attributions" title="Map tiles by CartoDB, under CC BY 3.0.">CartoDB</a> | © <a href="http://www.openstreetmap.org/copyright" title="Data by OpenStreetMap, under ODbL.">OpenStreetMap</a>'
}).addTo(map);		//warstwa mapy


var labels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png',{
	pane:'labels'
}).addTo(map);		//warstwa nazw, wyświetlana w 'pane' stworzonym wcześniej

L.control.scale({position: 'bottomright'}).addTo(map);	//ręcznie dodane kontrolki zoomu w prawym rogu (domyślnie w lewym)

document.getElementById("data").innerHTML = '<b>choose data to show</b>';	//wyświetlany tekst w oknie z danymi po prawej

var userJson = [];
var userData;





var group = new L.featureGroup();	//wszystkie aktualnie wyświetlane geojsony

$("document").ready(function() {
  $('.dropdown-menu').on('click', function(e) {
      if($(this).hasClass('dropdown-menu-form')) {
          e.stopPropagation();
      }
  });
});

var marker = null;
var locError;

$('#locate').on('change', function(){

		if (this.checked){
			map.locate({setView: false, watch:true, maxZoom: 10});
			setTimeout(function(){
				if (typeof locError != "undefined"){
					$('#locatelabel').tooltip('show');
					setTimeout(function(){
						$('#locatelabel').tooltip('hide');
					}, 4000);
				}		
			}, 50);
		}
		else {
			map.stopLocate();
			if (marker != null){
				map.removeLayer(marker);
				marker = null;
			}
		}

});


function onLocationFound(e) {
	locError = e.message;
    
	if (marker != null){
		marker.setLatLng(e.latlng);
	}
	else {
		map.setView(e.latlng, 10);
		marker = L.marker(e.latlng).addTo(map);
	}
	
	
}
map.on('locationfound', onLocationFound);

function onLocationError(e) {
	locError = e.message;

	$('#locatelabel').attr('title', locError)
					 .tooltip('fixTitle')
					 .tooltip('show');

	setTimeout(function(){
		
		$('#locatelabel').tooltip('hide');
	}, 4000);
	
	if (marker != null){
		map.removeLayer(marker);
		marker = null;
	}
}
map.on('locationerror', onLocationError);




var slownikWskaznikow = {				//przypisanie nazw dla zmiennych Danger Indexów
	"LYME_DIS" : "Castor bean tick",
	"HYALOMMA" : "Hyalomma marginatum tick",
	"IXODES_R" : "Castor bean tick",
	"AEDES_ALBO" : "Tiger mosquito",
	"HOGWEED" : "Sosnowsky hogweed",
	"MACROVIPER" : "Milos viper",
	"V_XANTHINA" : "Rock viper",
	"V_AMMODYTE" : "Horned viper",
	"V_ASPIS" : "Asp viper",
	"V_BERUS" : "Common European viper",
	"V_LATASTEI" : "Latastes viper",
};





var wsp;			//aktualnie wybrany checkbox
var wspNazwa;		//nazwa wybranego Danger Indexu

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({
	trigger : 'manual',
	delay: 200,
	animation: 'fadeIn',
	placement: 'bottom',
	});

});

function init(){		//funkcja uruchamiana po kliknięciu przycisku w menu początkowym

	if (typeof wsp == "undefined") {
		$('#proceed').tooltip('show');
		setTimeout(function(){
		$('#proceed').tooltip('hide');
		}, 2000);
	}
	else {
		$('[data-toggle="tooltip"]').tooltip('destroy');

		if (document.readyState === "complete") {		//menu zminimalizuje się po załadowaniu wszystkich danych
			dim.className = 'hide';		//wyłączanie zaciemnienia mapki
			jQuery('div.window').toggleClass('collapsed');	//minimalizowanie menu

//			document.getElementById("data").innerHTML = '<b>hover on region</b>';	//wyświetlany tekst w oknie z danymi po prawej
			check(jQuery('input[name="dane1"]:checked').val());			//sprawdzanie aktualnie wybranego checkboxa i ładowanie geojsonów
		}
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
		if (typeof regionHog != "undefined") {
			map.removeLayer(regionHog);
		}		

		if (radioValue == 'LYME_DIS' ){

			// var plik = "opisy/lymeDiseasePolandDesc.html";
			// jQuery.get(plik, function(opis) {
				// document.getElementById("info").innerHTML = "";
			// })

			Poland.addTo(map);
			group.addLayer(Poland);
			Czech.addTo(map);
			group.addLayer(Czech);
			Belarus.addTo(map);
			group.addLayer(Belarus);

			WojPL.eachLayer(function (layer) {
				layer.setStyle(styleLymePL);
			});
			Poland.setStyle(styleLymePL);
			

			WojCZ.eachLayer(function (layer) {
				layer.setStyle(styleLymeCZ);
			});
			Czech.setStyle(styleLymeCZ);
			
			Belarus.setStyle(styleLymeBLR);


			if (typeof clickRegion != "undefined") {
				map.addLayer(clickRegion);
				// Poland.resetStyle(clickRegion);
				// Czech.resetStyle(clickRegion);
			}
		} else {
			map.removeLayer(Poland);
			group.removeLayer(Poland);
			map.removeLayer(Czech);
			group.removeLayer(Czech);
			map.removeLayer(Belarus);
			group.removeLayer(Belarus);
		}
				
		if (radioValue == 'HOGWEED' ) {
			document.getElementById("info").innerHTML = "";

			hogweedPoland.addTo(map);
			group.addLayer(hogweedPoland);

			WojPLhog.eachLayer(function (layer) {
				layer.setStyle(hogweed);
			});
			hogweedPoland.setStyle(hogweed);

			
			if (typeof clickRegionHog != "undefined") {
				map.addLayer(clickRegionHog);
			}
			
		} else {
				map.removeLayer(hogweedPoland);
				group.removeLayer(hogweedPoland);
		}

		if (radioValue == 'HYALOMMA' ){
			document.getElementById("info").innerHTML = "";

			Europe.addTo(map);
			group.addLayer(Europe);

					
			Europe.setStyle(styleEUHYA);
		}

		else if (radioValue == 'IXODES_R' ){
			document.getElementById("info").innerHTML = "";

			Europe.addTo(map);
			group.addLayer(Europe);

			
			Europe.setStyle(styleEUIXO);
		}

		else if (radioValue == 'AEDES_ALBO' ) {
			document.getElementById("info").innerHTML = "";

			Europe.addTo(map);
			group.addLayer(Europe);
			
			Europe.setStyle(styleEUAED);

			
		}
		else if (radioValue == 'MACROVIPER' ) {
			document.getElementById("info").innerHTML = "";

			Europe.addTo(map);
			group.addLayer(Europe);

					
			Europe.setStyle(styleEUMV);
		}
		else if (radioValue == 'V_XANTHINA' ) {
			document.getElementById("info").innerHTML = "";

			Europe.addTo(map);
			group.addLayer(Europe);

						
			Europe.setStyle(styleEUVX);
		}
		else if (radioValue == 'V_AMMODYTE' ) {
			document.getElementById("info").innerHTML = "";

			Europe.addTo(map);
			group.addLayer(Europe);

					
			Europe.setStyle(styleEUVAM);
		}
		else if (radioValue == 'V_ASPIS' ) {
			document.getElementById("info").innerHTML = "";

			Europe.addTo(map);
			group.addLayer(Europe);

		
			
			Europe.setStyle(styleEUVAS);
		}
		else if (radioValue == 'V_BERUS' ) {
			document.getElementById("info").innerHTML = "";

			Europe.addTo(map);
			group.addLayer(Europe);

					
			Europe.setStyle(styleEUVB);
		}
		else if (radioValue == 'V_LATASTEI' ) {
			document.getElementById("info").innerHTML = "";

			Europe.addTo(map);
			group.addLayer(Europe);

					
			Europe.setStyle(styleEUVL);
		}

		else {
			map.removeLayer(Europe);
			group.removeLayer(Europe);
		}



		if (jQuery.isEmptyObject(group.getLayers()) == false){
			map.fitBounds(group.getBounds());
		}

		legend.update();

	}
}



var info = L.control({ position: 'topright' });

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};
info.update = function (props) {

			info._div.innerHTML = document.getElementById("data").innerHTML

};
info.addTo(map);


new L.control.zoom({position: 'topright'}).addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    this.div = L.DomUtil.create('div', 'legend');
	legend.update();
    return this.div;
};

legend.update = function () {
	var grades;
	var labels;

	if (wsp == "LYME_DIS"){
		grades = [0, 126, 251, 376, 501, 626, 751, 876, -1];
		labels = ["<b>low risk</b>", "", "", "", "", "", "", "<b>high risk</b><br>", "<b>no data</b>"];
	}
	else {
		grades = [0, 751, -1];
		labels = ["<b>safe zone</b>", "<b>danger zone</b><br>", "<b>no data</b>"];
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

$.ajaxSetup({ cache: false });

// jQuery.ajax({
	// type: "GET",
	// url: 'log.json',
	// dataType: 'json',
	// error: function (XMLHttpRequest, textStatus, errorThrown) {console.log('error ', errorThrown);},
// })
// .done(function( script, textStatus ) {
    // console.log( textStatus );
	// userJson = script;
	
	
	// jQuery.ajax({
		// type: "GET",
		// url: 'js/Poland.js',
		// dataType: 'script',
		// error: function (XMLHttpRequest, textStatus, errorThrown) {console.log('error ', errorThrown);},
	// })
	// .done(function( script, textStatus ) {
		// console.log( textStatus );

		// jQuery.ajax({
			// type: "GET",
			// url: 'js/Czech.js',
			// dataType: 'script',
			// error: function (XMLHttpRequest, textStatus, errorThrown) {console.log('error ', errorThrown);},
		// })
		// .done(function( script, textStatus ) {
			// console.log( textStatus );

		// })
	
		// jQuery.ajax({
			// type: "GET",
			// url: 'js/Belarus.js',
			// dataType: 'script',
			// error: function (XMLHttpRequest, textStatus, errorThrown) {console.log('error ', errorThrown);},
		// })
		// .done(function( script, textStatus ) {
			// console.log( textStatus );

		// })
	
	
		// jQuery.ajax({
			// type: "GET",
			// url: 'js/Europe.js',
			// dataType: 'script',
			// error: function (XMLHttpRequest, textStatus, errorThrown) {console.log('error ', errorThrown);},
		// })
		// .done(function( script, textStatus ) {
			// console.log( textStatus );

		// })


	
		
	// })
// });






var jqXHR = $.getJSON("log.json", function(json) {
    userJson = json;
})
.done(function() {
    
		$.getScript("js/Poland.js")
		.done(function( script, textStatus ) {
			console.log( textStatus );
			
					$.getScript("js/Czech.js")
				.done(function( script, textStatus ) {
					console.log( textStatus );

				  })
				  .fail(function( jqxhr, settings, exception ) {
					console.log( jqxhr );
					console.log( settings );
					console.log( exception );
				});


				$.getScript("js/Belarus.js")
				.done(function( script, textStatus ) {
					console.log( textStatus );
				  })
				  .fail(function( jqxhr, settings, exception ) {
					console.log( exception );
				});

				$.getScript("js/Europe.js")
				.done(function( script, textStatus ) {
					console.log( textStatus );
				  })
				  .fail(function( jqxhr, settings, exception ) {
					console.log( exception );
				});
		  })
		  .fail(function( jqxhr, settings, exception ) {
			console.log( exception );
		});

		
  });

