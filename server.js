'use strict';

var http = require("http");
var express = require("express");
var fs = require("fs");
var util = require("util");
var r = require("rethinkdb");
var mustache = require("mustache")
var mustacheExpress = require("mustache-express");
var bodyParser = require("body-parser");

var app = express();

app.use(express.static("assets"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

/****************/
/**** ROUTES ****/
/****************/
/*app.get("*.htm*", (req, res) => {
	res.end(JSON.stringify({message:"You can't do that."}));
});*/

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
	
	logRequest(req, "RSVP");
	
	getTemplate("RSVP", (tmpl) => {
		var pageContent = mustache.render(tmpl, {});
		
		var data = {
			pageTitle: "RSVP To The Wedding", 
			pageContent: pageContent
		};
		
		res.render("mainView", data);
	});
});

// RSVP: GET
app.get("/RSVP-1/:code", (req, res) => {
	console.log("GET Request received at '/RSVP-1' endpoint with " + JSON.stringify(req.params));
	
	var params = req.params
	var code = req.params.code;
	
	// Sanitize value
	var code = sanitizeCode(code);
	
	// Look up family
	connectToDB((conn) => {
		r.db("Wedding").table("families").filter(r.row("code").downcase().eq(code)).run(conn)
		.then( cursor => cursor.toArray() )
		.then( result => {
			res.json( result.map(family => {
				return {
					rsvpMessage: family.rsvpMessage,
					songRequest: family.songRequest,
					members: family.members,
					code: family.code,
					familyName: family.familyName,
				}
			}));
		})
		.catch((err) => {
			handleErr(err);
		});
	});
});

// RSVP: POST
app.post("/RSVP", (req, res) => {
	console.log("POST Request received at '/RSVP' endpoint with code: " + req.body.code);
	var reqIP = logRequest(req, "RSVP");
	
	var code = sanitizeCode(req.body.code);
	var songRequest = sanitizeString(req.body.songRequest);
	var rsvpMessage = sanitizeString(req.body.rsvpMessage);
	var members = req.body.members;
	
	// Find family with code and update values
	// Gonna try me some promises
	connectToDB((conn) => {
		r.db("Wedding").table("families").filter(r.row("code").downcase().eq(code)).run(conn)
		.then( cursor => cursor.toArray() )
		.then( result => {
			// There should always only be one family per code.
			if(result.length !== 1){
				return Promise.reject("Fuckity fuck fuck");
			}
			
			return result[0];
		}).then(family => {
			family.songRequest = songRequest;
			family.rsvpMessage = rsvpMessage;
			
			family.members = family.members.map((curMember) => {
				let newMember = members.find((member) => {
					return member.name.toLowerCase() === curMember.name.toLowerCase();
				});
				
				if(newMember){
					curMember.attending = newMember.attending;
				}
				
				return curMember;
			});
			
			r.db("Wedding").table("families")
			  .filter(r.row("code").downcase().eq(code))
			  .update({
				  songRequest: family.songRequest,
				  rsvpMessage: family.rsvpMessage,
				  rsvpdOnce: true,
				  members: family.members,
				  reqIP: reqIP || "",
				  rsvpTime: (new Date()).toISOString(),
			  })
			  .run(conn, (err, result) => {
				  res.json({ success: !err });
			  });
		}).catch((err) => {
			handleErr(err);
		});
	}); 
});

function sanitizeCode(code){
	return sanitizeString(code).replace(/[ ]+/g, "").toLowerCase();
}

function sanitizeString(str){
	return (str || "").replace(/[^a-zA-Z0-9_\.\!\?\' ]+/g, "");
}

var getFamily = function(code){
	return r.db("Wedding").table("families").filter(r.row("code").downcase().eq(code))
}

// Wedding Party
app.get("/wedding-party", (req, res) => {
	console.log("GET Request received at '/wedding-party' endpoint");
	logRequest(req, "wedding-party");
	
	var contentData = {};
	
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
		});
	});
	
	return logObj.reqIP;
}

var server = http.createServer(app).listen(8081, function(){
	console.log(server.address());
});