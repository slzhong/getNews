
/*
 * GET home page.
 */

var http = require('http');
var url = require('url');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');

exports.index = function(req, res){
  res.render('index', { title: 'news of info@scau' });
};

exports.list = function(req, res){
	request('http://info.scau.edu.cn/' + req.params.urlStr + '?page=' + req.params.page, function (error, response, data){
		if(!error && response.statusCode == 200){
			var $ = cheerio.load(data);
			var result = [];
			var tr = $('.data-table tr');
			if(tr.length > 1){
				for(var i = 1; i < tr.length; i++){
					var data = {
						link : $($(tr[i]).children()[0]).html(),
						date : $($(tr[i]).children()[5]).text(),
						from : $($(tr[i]).children()[1]).text()
					}
					result.push(data);
				}
				res.writeHead(200, {"Content-Type":"text/html"});
				res.end(JSON.stringify(result));
			}
			else{
				res.writeHead(404);
				res.end();
			}
		}
		else{
			console.log(error);
		}
	});
}