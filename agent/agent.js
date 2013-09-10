var ng = require('nodegrass'),
	http = require('http'),
	url = require('url');

http.createServer(function(req,res){
	var pathname = url.parse(req.url).pathname;
	if(pathname === '/'){
		ng.get('http://info.scau.edu.cn/news-cate-2.asp',function(data){
			res.writeHeader(200,{'Content-Type':'text/html;charset=utf-8'});
			res.write(data + '\n');
			res.end();
		},'utf8');
	}
}).listen(3000);
console.log('listening 3000');