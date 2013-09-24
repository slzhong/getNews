// window.onload = function(){
// 	bindBtns();
// }

// function bindBtns(){
// 	$('li').bind('tap',function(){
// 		alert('taped');
// 	});
// }

// function getList(){
// 	return function (e){
// 		var container = $('#news-list');
// 		var ajax = new XMLHttpRequest();
// 		ajax.onreadystatechange = function(){
// 			container.innerHTML = '';
// 			if(ajax.readyState == 4 && ajax.status == 200){
// 				e.target.setAttribute('nextpage', parseInt(e.target.getAttribute('nextpage')) + 1);
// 				var obj = eval('(' + ajax.responseText + ')');
// 				for(var i = 0; i < obj.length; i++){
// 					var list = document.createElement('li');
// 					var listItem = document.createElement('a');
// 					listItem.className = 'list-item';
// 					listItem.setAttribute('href', '#news-article-page');
// 					listItem.setAttribute('urlstr', obj[i].link);
// 					listItem.innerHTML = obj[i].title + '&nbsp;&nbsp;' + obj[i].date + '&nbsp;&nbsp;' + obj[i].from;
// 					list.appendChild(listItem);
// 					container.appendChild(list);
// 				}
// 				var link = $('.list-item');
// 				for(var i = 0; i < link.length; i++){
// 					link[i].onclick = getContent();
// 				}
// 			}
// 		}
// 		ajax.open('GET', '/list/' + e.target.getAttribute('urlstr') + '/' + e.target.getAttribute('nextpage'), true);
// 		ajax.send();
// 	}
// }

// function getContent(){
// 	return function (e){
// 		var container = $('#news-article');
// 		var ajax = new XMLHttpRequest();
// 		ajax.onreadystatechange = function(){
// 			container.innerHTML = '';
// 			if(ajax.readyState == 4 && ajax.status == 200){
// 				var obj = eval('(' + ajax.responseText + ')');
// 				var h1 = document.createElement('h1');
// 				h1.innerHTML = obj.title;
// 				container.appendChild(h1);
// 				container.innerHTML += obj.content;
// 				var img = $('img');
// 				for(var i = 0; i < img.length; i++){
// 					img[i].setAttribute('src', 'http://info.scau.edu.cn/' + img[i].getAttribute('src'));
// 				}
// 			}
// 		}
// 		ajax.open('GET', '/article' + e.target.getAttribute('urlstr'), true);
// 		ajax.send();
// 	}
// }

//name space
var GetNewsMain = {
	init : function(){
		$('li').bind('tap',GetNewsMain.getList());
	},
	getList : function(){
		return function (e){
			$.getJSON('/list/' + $(e.target).attr('urlstr') + '/' + $(e.target).attr('nextpage'),
			function(result){
				$.each(result, function(i, item){
					console.log(item.title);
				});
			});
		}
	}
}

window.onload = function(){
	GetNewsMain.init();
}