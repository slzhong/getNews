window.onload = function(){
	bindBtns();
}

function bindBtns(){
	var btns = $('li');
	for(var i = 0; i < btns.length; i++){
		(function(){
			btns[i].onclick = getData();
		})();
	}
}

function getData(){
	return function (e){
		var container = $('#list');
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				container.innerHTML = ajax.responseText;
			}
		}
		ajax.open('GET', '/news/' + e.target.getAttribute('url_str'), true);
		ajax.send();
	}
}

function $(selector){
	var type = selector.substr(0,1);
	selector = ( type == '.' || type == '#' ) ? selector.substr(1) : selector;
	if( type == '.' ){
		var result = [];
		var all = document.getElementsByTagName('*');
		for( var i=0; i < all.length; i++ ){
			if( all[i].className == selector ){
				result.push(all[i]);
			}
		}
		return result;
	}
	else if( type == "#" ){
		return document.getElementById(selector);
	}
	else{
		return document.getElementsByTagName(selector);
	}
}