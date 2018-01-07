function clear() {
	document.getElementById('content').innerHTML = '';
}

function error(text) {
	var errorBox = document.createElement('div');
	errorBox.innerHTML = '<b>An error occured: </b>' + text;
	errorBox.style.marginBottom = '10px';
	errorBox.style.padding = '5px';
	errorBox.style.background = 'Tomato';
	errorBox.style.cursor = 'pointer';
	errorBox.onclick = function() {
		document.getElementById('errors').removeChild(errorBox);
	}
	document.getElementById('errors').appendChild(errorBox);
}
