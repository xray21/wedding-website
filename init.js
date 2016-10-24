var r = require("rethinkdb");

function connectToDB(callback){
	r.connect( {host: 'localhost', port: 28015}, (err, conn) =>	{
		handleErr(err);
		
		callback(conn);
	});
}

function handleErr(err){
	if (err){
		throw err;
	}
};

/**
r.db("Wedding")
  .table("requestLog")
  .pluck("reqIP")
  .map(function(fieldVal){ 
    console.log(fieldVal, typeof fieldval);
    return ((fieldVal.values())(0).split(":"))(0);
  })
  .map(function(ip){
    return {
      ip: ip,
    }
  })
  .group("ip")
  .count()
**/

connectToDB((conn) => {
	// Initialize Registries
	r.db("Wedding").table("Registries").insert([
		{
			id: 1,
			name: "Target",
			imgsrc: "target.jpg",
			link: "http://www.target.com/gift-registry/registry/RFci7IdXMdrqOAXf7w3OiA",
			enabled: true
		}, {
			id: 2 ,
			name: "Amazon",
			imgsrc: "amazon.png",
			link: "https://www.amazon.com/wedding/enrique-salazar-turner-nikki-king-sacramento-january-2017/registry/3HG2T1FXA5PIH",
			enabled: true
		}, {
			id: 3, 
			name: "Bed Bath & Beyond",
			imgsrc: "bedbathbeyond.jpg", 
			link: "#",
			enabled: false
		}
	], {upsert: true}).run(conn, (err, result) => {
		console.log(JSON.stringify(result, null, 2));
	});
	
	// Initialize Wedding Party Table
	/* console.log("initializing Wedding Party table");
	r.do(
		r.db("Wedding").table("WeddingPartyMembers").insert([
			{
				id: 1, 
				name: "Sarah King-Sharp",
				relationship: "Sister",
				type: "BRIDESMAID",
				title: "Maid-of-Honor",
				imageFileSpec: "sarah.jpg",
				order: 1
			}, {
				id: 2, 
				name: "Heather Jose",
				relationship: "Sister",
				type: "BRIDESMAID",
				title: "Bridesmaid",
				imageFileSpec: "heather.jpg",
				order: 2
			}, {
				id: 3, 
				name: "Christel Duff",
				relationship: "Cousin",
				type: "BRIDESMAID",
				title: "Bridesmaid",
				imageFileSpec: "christel.jpg",
				order: 3
			}, {
				id: 4, 
				name: "Sabrina Hamilton",
				relationship: "Friend",
				type: "BRIDESMAID",
				title: "Bridesmaid",
				imageFileSpec: "sabrina.jpg",
				order: 4
			}, {
				id: 5, 
				name: "Gloria Pace",
				relationship: "Friend",
				type: "BRIDESMAID",
				title: "Bridesmaid",
				imageFileSpec: "gloria.jpg",
				order: 5
			}, {
				id: 6, 
				name: "Setareh Tabrizi",
				relationship: "Friend",
				type: "BRIDESMAID",
				title: "Bridesmaid",
				imageFileSpec: "setbrizi.jpg",
				order: 6
			}
		], {upsert: true}),
		r.db("Wedding").table("WeddingPartyMembers").insert([
			{
				id: 7, 
				name: "Kory Harreschou",
				relationship: "Best Friend",
				type: "GROOMSMAN",
				title: "Best Man",
				imageFileSpec: "kory.jpg",
				order: 1
			}, {
				id: 8, 
				name: "Dominique Salazar-Turner",
				relationship: "Brother",
				type: "GROOMSMAN",
				title: "Groomsman",
				imageFileSpec: "dominique.jpg",
				order: 2
			}, {
				id: 9, 
				name: "Gabriel Cruz",
				relationship: "Friend",
				type: "GROOMSMAN",
				title: "Groomsman",
				imageFileSpec: "gabe.jpg",
				order: 3
			}, {
				id: 10, 
				name: "Daniel Hughes",
				relationship: "Friend",
				type: "GROOMSMAN",
				title: "Groomsman",
				imageFileSpec: "blackdaniel.jpg",
				order: 4
			}, {
				id: 11, 
				name: "Daniel Pace",
				relationship: "Friend",
				type: "GROOMSMAN",
				title: "Groomsman",
				imageFileSpec: "whitedaniel.jpg",
				order: 5
			}, {
				id: 12, 
				name: "Hugo Garcia",
				relationship: "Friend",
				type: "GROOMSMAN",
				title: "Groomsman",
				imageFileSpec: "hugo.jpg",
				order: 6
			}
		], {upsert: true})
	).run(conn, (err, result) => {
		console.log(JSON.stringify(result, null, 2));
	});*/
})