

 // proverra povezanosti aplikacije
// console.log("HELLO");

var fs= require("fs"),
 http = require('http'),
 options;


//  upisivanje slike sa neke lokacije

//lokacija sa koje se skida slika
options= {
	host: 'www.google.com',
	port:80,
	path: '/images/logos/ps_logo2.png'
}


//salje zahtev i rezultate smesta u res
var request= http.get(options, function(res){
							// varijabla treba da  uskladisti sliku(u binarnomm enkodingu)
							var imagedata= '';

							// encoding je binarni- vrsi se enkodovanje podataka
							res.setEncoding('binary');

							// 
							res.on('data', function(chunk){

								// varijabla skladisti sliku(u binarnomm enkodingu)
								imagedata+=chunk
							});

							//kada se zavrsi res, pristupa se skladistenju na zadatoj lokaciji

							res.on('end', function(){
											fs.writeFile('./data/logo.png', imagedata, 'binary', function(err){

															if(err){
																throw err
																console.log('File saved');
															}
														});
									});
						});


//otvaranje datoteke

fs.open("./data/data.txt", 'r', function(err, fd){
	if(err){
		console.log("Greska:" + err);
		fs.close(fd);
	}else{
		console.log("datoteka je otvorena ");
	}
});

//Citanje iz textualne datoteke


fs.readFile("./data/data.txt", 'utf8', function(err, fd){
	if(err){
		console.log("Greska:" + err);
		fs.close(fd);
	}else{
		console.log("Sadrzaj Datoteke:" +fd);
	}
});

// Iscitavanje slike
fs.readFile("./data/data.jpg",  function(err, fd){
	if(err){
		console.log("Greska:" + err);
		fs.close(fd);
	}else{
		
		http.createServer(function(req, res) {
	    res.writeHead(200, {'Content-Type': 'image/jpeg'});
	    res.end(fd); //  Salje sliku u pretrazivac
	  }).listen(8000); // port 8000 salje data.jpg
	  console.log('Server running at http://localhost:8000/');

	
	}
});

//Iscitavanje druge slike
fs.readFile("./data/logo.png",  function(err, fd){
	if(err){
		console.log("Greska:" + err);
		fs.close(fd);
	}else{
		
		http.createServer(function(req, res) {
	    res.writeHead(200, {'Content-Type': 'image/png'});
	    res.end(fd); //  Salje sliku u pretrazivac
	  }).listen(8001); //drugi port salje logo.png
	  console.log('Server running at http://localhost:8001/');

	
	}
});


