
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

exports.news = function(req, res){
	request('http://info.scau.edu.cn/' + req.params.urlStr, function (error, response, data){
		if(!error && response.statusCode == 200){
			var $ = cheerio.load(data);
			var result = '';
			var tr = $('.data-table tr');
			console.log(tr.length);
			for(var i = 1; i < tr.length; i++){
				result += $(tr[i]).text() + '<br><br>';
			}
			res.writeHead(200, {"Content-Type":"text/html"});
			res.end(result);
		}
		else{
			console.log(error);
		}
	});
}