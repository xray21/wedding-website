var http = require("http");
var express = require("express");
var fs = require("fs");
var util = require("util");
var r = require("rethinkdb");
var mustache = require("mustache")
var mustacheExpress = require("mustache-express");

var app = express();

app.use(express.static("assets"));

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

/****************/
/**** ROUTES ****/
/****************/
app.get("*.htm*", (req, res) => {
	res.end(JSON.stringify({message:"You can't do that."}));
});

app.get("/", (req, res) => {
	console.log("GET Request received at '/' endpoint");
	res.redirect("/wedding/home");
});

// Home: Slideshow, Pictures, dates, venue info
app.get("/home", (req, res) => {
	console.log("GET Request received at '/home' endpoint");
	
	logRequest(req, "home");
	
	connectToDB((conn) => {
		r.db("Wedding").table("Registries")
		  .orderBy(r.row("id"))
		  .run(conn, (err, cursor) => {
			cursor.toArray((err, result) => {
				getTemplate("home", (tmpl) => {
					data = {
						registries: result,
					};
					
					var pageContent = mustache.render(tmpl, data);
					
					var data = {
						pageTitle: "Home", 
						pageContent: pageContent
					};
					
					res.render("mainView", data);
				});
			});
		});
	});
});

// About Us
app.get("/about-us", (req, res) => {
	console.log("GET Request received at '/about-us' endpoint");
	logRequest(req, "about-us");
	
	getTemplate("aboutUs", (tmpl) => {
		var pageContent = mustache.render(tmpl, {});
		
		var data = {
			pageTitle: "About Nikki and Enrique", 
			pageContent: pageContent
		};
		
		res.render("mainView", data);
	});
});

// RSVP: GET
app.get("/RSVP", (req, res) => {
	console.log("GET Request received at '/RSVP' endpoint");
});

// RSVP: POST
app.post("/RSVP", (req, res) => {
});

// Wedding Party
app.get("/wedding-party", (req, res) => {
	var contentData = {};
	
	console.log("GET Request received at '/wedding-party' endpoint");
	logRequest(req, "wedding-party");
	
	connectToDB((conn) => {
		r.db("Wedding").table("WeddingPartyMembers")
		  .filter(r.row("type").eq("BRIDESMAID"))
		  .orderBy(r.row("order"))
		  .run(conn, (err, cursor) => {
			cursor.toArray((err, result) => {
				handleErr(err);
				
				contentData.bridesmaids = result; 
				
				r.db("Wedding").table("WeddingPartyMembers")
				 .filter(r.row("type").eq("GROOMSMAN"))
				 .orderBy(r.row("order"))
				 .run(conn, (err, cursor) => {
					cursor.toArray((err, result) => {
						handleErr(err);
						
						contentData.groomsman = result; 
						
						getTemplate("weddingParty", (tmpl) => {
							var pageContent = mustache.render(tmpl, contentData);
				
							var data = {
								pageTitle: "Wedding Party", 
								pageContent: pageContent
							};
						
							res.render("mainView", data);
						});		
					});
				});
			});
		});
	});
});

// Venue Map
app.get("/venue", (req, res) => {
	console.log("GET Request received at '/venue' endpoint");
	logRequest(req, "venue");
	
	getTemplate("venueLocation", (tmpl) => {
		var pageContent = mustache.render(tmpl, {});
		
		var data = {
			pageTitle: "Venue Location", 
			pageContent: pageContent
		};
		
		res.render("mainView", data);
	});
});

// Registries
app.get("/registries", (req, res) => {
	console.log("GET Request received at '/registries' endpoint");
	logRequest(req, "registries");
	
	connectToDB((conn) => {
		r.db("Wedding").table("Registries")
		  .orderBy(r.row("id"))
		  .run(conn, (err, cursor) => {
			cursor.toArray((err, result) => {
				getTemplate("registries", (tmpl) => {
					data = {
						registries: result,
					};
					
					var pageContent = mustache.render(tmpl, data);
					
					var data = {
						pageTitle: "Home", 
						pageContent: pageContent
					};
					
					res.render("mainView", data);
				});
			});
		});
	});
});

// Picture Gallery
app.get("/gallery", (req, res) => {
	console.log("GET Request received at '/gallery' endpoint");
	logRequest(req, "gallery");
	
	getTemplate("photoGallery", (tmpl) => {
		var pageContent = mustache.render(tmpl, {});
		
		var data = {
			pageTitle: "Photo Gallery", 
			pageContent: pageContent
		};
		
		res.render("mainView", data);
	});
});

// Admin Page
app.get("/admin", (req, res) => {
});

/**************************/
/**** HELPER FUNCTIONS ****/
/**************************/
function connectToDB(callback){
	r.connect( {host: 'localhost', port: 28015}, (err, conn) =>	{
		handleErr(err);
		
		callback(conn);
	});
}

function getTemplate(templateName, callback){
	fs.readFile(__dirname + "/views/" + templateName + ".mustache", (err, data) => {
		handleErr(err);
		
		callback(data.toString());
	});
}

function handleErr(err){
	if (err){
		throw err;
	}
};

function logJSON(obj){
	console.log(JSON.stringify(obj, null, 2));
}

function logRequest(req, type){
	var logFileName = "reqLog.txt";
	var logObj = {};
	logObj.reqIP = req.headers['x-forwarded-for'];
	
	if(!logObj.reqIP || logObj.reqIP === ""){
		logObj.reqIP = "unknown";
	}
	
	logObj.type = type;
	logObj.reqURI = req.headers['x-original-url'];
	logObj.reqTime = (new Date()).toISOString();
	
	connectToDB((conn) => {
		r.db("Wedding").table("requestLog").insert(logObj).run(conn, (err, result) => {
			if(err){
				console.log(err);
				return;
			}
			//console.log(JSON.stringify(result, null, 2));
		});
	});
}

var server = http.createServer(app).listen(8081, function(){
	console.log(server.address());
});