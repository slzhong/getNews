window.onload = function(){
	bindBtns();
}

function bindBtns(){
	var btns = $('li');
	for(var i = 0; i < btns.length; i++){
		btns[i].onclick = getList();
	}
}

function getList(){
	return function (e){
		var container = $('#news-list');
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function(){
			container.innerHTML = '';
			if(ajax.readyState == 4 && ajax.status == 200){
				e.target.setAttribute('nextpage', parseInt(e.target.getAttribute('nextpage')) + 1);
				var obj = eval('(' + ajax.responseText + ')');
				for(var i = 0; i < obj.length; i++){
					var list = document.createElement('li');
					var listItem = document.createElement('a');
					listItem.className = 'list-item';
					listItem.setAttribute('href', '#news-article-page');
					listItem.setAttribute('urlstr', obj[i].link);
					listItem.innerHTML = obj[i].title + '&nbsp;&nbsp;' + obj[i].date + '&nbsp;&nbsp;' + obj[i].from;
					list.appendChild(listItem);
					container.appendChild(list);
				}
				var link = $('.list-item');
				for(var i = 0; i < link.length; i++){
					link[i].onclick = getContent();
				}
			}
		}
		ajax.open('GET', '/list/' + e.target.getAttribute('urlstr') + '/' + e.target.getAttribute('nextpage'), true);
		ajax.send();
	}
}

function getContent(){
	return function (e){
		var container = $('#news-article');
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function(){
			container.innerHTML = '';
			if(ajax.readyState == 4 && ajax.status == 200){
				var obj = eval('(' + ajax.responseText + ')');
				var h1 = document.createElement('h1');
				h1.innerHTML = obj.title;
				container.appendChild(h1);
				container.innerHTML += obj.content;
				var img = $('img');
				for(var i = 0; i < img.length; i++){
					img[i].setAttribute('src', 'http://info.scau.edu.cn/' + img[i].getAttribute('src'));
				}
			}
		}
		ajax.open('GET', '/article' + e.target.getAttribute('urlstr'), true);
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