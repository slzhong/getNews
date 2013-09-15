var http = require('http'),
	url = require('url'),
	request = require('request'),
	cheerio = require('cheerio');

var urlStr = 'http://info.scau.edu.cn/news-cate-2.asp';

http.createServer(function (req, res){
	var path = url.parse(req.url).pathname;
	path = (path == '/') ? 0 : parseInt(path.slice(1));
	request(urlStr, function (error, response, data){
		if(!error && response.statusCode == 200){
			var $ = cheerio.load(data);
			//the following code is for tests only, will be changed a json array later
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
}).listen(3000);
console.log('server listening on port 3000');