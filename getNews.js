window.onload = function(){
	getIframe();
}

function getIframe(){
	var iframe = document.getElementById('iframe');
	var inner = iframe.contentWindow;
	console.log(inner);
}