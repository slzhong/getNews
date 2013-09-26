var GetNewsMain = {
	init : function(){
		GetNewsMain.bindEvent();
	},
	bindEvent : function(){
		$('li').bind('tap',GetNewsMain.getList());
		$('.back-btn').bind('tap',function(){ history.go(-1); });
	}
	getList : function(){
		return function (e){
			$.getJSON('/list/' + $(e.target).attr('urlstr') + '/' + $(e.target).attr('nextpage'),
			function(result){
				$.each(result, function(i, item){
					var link = $(Template.news_link);
					link.find('.news-link').attr('urlstr',item.link);
					link.find('.news-title').text(item.title);
					link.find('.news-from').text(item.from);
					link.find('.news-date').text(item.date);
					link.bind('tap',GetNewsMain.getArticle());
					$('#news-list').append(link);
				});
			});
		}
	},
	getArticle : function(){
		return function (e){
			$.getJSON('/article' + $(e.target).parent('.news-link').attr('urlstr'),
			function(result){
				$('#news-article-title').text(result.title);
				$('#news-article-content').html(result.content);
				$('#news-article-content').find('img').remove();
			});
		}
	}
}

window.onload = function(){
	GetNewsMain.init();
}
