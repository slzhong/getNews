window.onload = function(){
	bindBtns();
}

function bindBtns(){
	var btns = $('li');
	for(var i = 0; i < btns.length; i++){
		(function(){
			btns[i].onclick = getList();
		})();
	}
}

function getList(){
	return function (e){
		var container = $('#list');
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function(){
			container.innerHTML = '';
			if(ajax.readyState == 4 && ajax.status == 200){
				e.target.setAttribute('nextpage', parseInt(e.target.getAttribute('nextpage')) + 1);
				var obj = eval('(' + ajax.responseText + ')');
				for(var i = 0; i < obj.length; i++){
					var listItem = document.createElement('div');
					listItem.className = 'list-item';
					listItem.innerHTML = obj[i].link + obj[i].date + obj[i].from;
					container.appendChild(listItem);
				}
			}
		}
		ajax.open('GET', '/list/' + e.target.getAttribute('urlstr') + '/' + e.target.getAttribute('nextpage'), true);
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