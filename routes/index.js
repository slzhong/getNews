
/*
 * GET home page.
 */

var http = require('http');
var url = require('url');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.news = function(req, res){
	request('http://info.scau.edu.cn/' + req.params.urlStr, function (error, response, data){
		if(!error && response.statusCode == 200){
			var $ = cheerio.load(data);
			//for tests only, will be changed to a json array later
			var html = 
			'<!doctype html>' +
			'<html>' +
			'<head>' +
			'<meta charset="UTF-8">' +
			'<title>' + $('title').text() + '</title>' +
			'</head>' +
			'<body>' +
			'<table>' +
			$('.data-table').children();
			'</table>' +
			'</body>' +
			'</html>';
			res.writeHead(200, {"Content-Type":"text/html"});
			res.end(html);
		}
		else{
			console.log(error);
		}
	});
}