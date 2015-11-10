'use strict';

$(document).ready(function() {
	$('#doConvert').click(function(e) {
		e.preventDefault();
		var source = $('#source').val();
		var dest = convertGeoJSON(source);
		$('#destination').val(JSON.stringify(dest, null, 2));
	});

	$('#filePicker').change(function(e) {
		console.log("filePicker changed", e.target.files);
		var file = e.target.files[0];
		var reader = new FileReader();
		reader.onload = (function(f) {
			return function(e) {
				console.log("some file data", e);
				var xml = e.target.result;
				var dest = convertGeoJSON(xml);
				$('#destination').val(JSON.stringify(dest, null, 2));
			};
		})(file);
		reader.readAsText(file);
		console.log("file", file);
	});
});

function convertGeoJSON(source) {
	try { 
		var sourceData = $.parseXML(source);
	} catch(e) {
		alert("invalid xml");
		return;
	}
	var dest = osmtogeojson(sourceData, {
		flatProperties: true
	});
	return dest;	
}

// function convertGeoJSON(source) {
//     source.features.forEach(function(feature) {
// 		var tags = feature.properties.tags;
// 		for (key in tags) {
// 			feature.properties[key] = tags[key];
// 		}
// 		delete feature.properties.tags;
// 	});
// 	return source;
// }