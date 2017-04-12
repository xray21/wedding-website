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


connectToDB((conn) => {
	
	// Initialize Families
	r.db("Wedding").table("families").insert([
		{
			code: "BeerNeurosciencePortland",
			familyName: "Lindzi Wessel and David Grayson",
			members: [{
				name: "Lindzi Wessel",
				attending: false
			}, {
				name: "David Grayson",
				attending: false
			}],
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "ThePredicament",
			familyName: "Henri Wayne Cacal",
			members: [{
				name: "Henri Cacal",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "FrickinEyan",
			familyName: "Erika Friedman",
			members: [{
				name: "Erika Friedman",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "WatchesGainMaturity",
			familyName: "Xavier Willie Turner",
			members: [{
				name: "Xavier Turner",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "RaidersBoatInstitute",
			familyName: "Robert J. Watson",
			members: [{
				name: "Robert Watson",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "YepThatWasMoe",
			familyName: "Daniel Charles Hughes",
			members: [{
				name: "Daniel Hughes",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "MyGuitarGentlyWeeps",
			familyName: "Donna Marie Salazar",
			members: [{
				name: "Donna Salazar",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "HardyPastyHike",
			familyName: "Margaret Rys",
			members: [{
				name: "Margaret Rys",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "ChikaChikaChika",
			familyName: "Jasleen Kaur Sandhu",
			members: [{
				name: "Jasleen Sandhu",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "TooManyFireballShots",
			familyName: "Gabriel Cruz",
			members: [{
				name: "Gabriel Cruz",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "DatTequilaTho",
			familyName: "Erin O'Ray",
			members: [{
				name: "Erin O'Ray",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "DatBurningManTho",
			familyName: "Tashina Brito",
			members: [{
				name: "Tashina Brito",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "Racista",
			familyName: "Hugo Garcia",
			members: [{
				name: "Hugo Garcia",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "LockPullSeat",
			familyName: "William Turner",
			members: [{
				name: "William Turner",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "HumanityUnitingEffectively",
			familyName: "Julia Marino",
			members: [{
				name: "Julia Marino",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "HeadOfJesus",
			familyName: "The Yuba People",
			members: [{
				name: "Ami Helwig",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "MoreThanMeetsTheEye",
			familyName: "The Yuba People",
			members: [{
				name: "Raechel Jordan",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "MimosaRunnerMan",
			familyName: "Yoshi Fuentes",
			members: [{
				name: "Yoshi Fuentes",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "JollyJuiceDentist",
			familyName: "Renee Tanabe",
			members: [{
				name: "Renee Tanabe",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "InTheHeezyFoSheezy",
			familyName: "Setareh Tabrizi",
			members: [{
				name: "Setareh Tabrizi",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "AprilBadgePlan",
			familyName: "Delores King",
			members: [{
				name: "Delores King",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "PongoPulpOmen",
			familyName: "Cassandra Snow",
			members: [{
				name: "Cassandra Snow",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "WoodenRookAlien",
			familyName: "The Waters",
			members: [{
				name: "Daniel Waters",
				attending: false
			}, {
				name: "Alicia Waters",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "GolfWinePoker",
			familyName: "The Harreschous",
			members: [{
				name: "Kent Harreschou",
				attending: false
			}, {
				name: "Max Harreschou",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "TheCakeIsALie",
			familyName: "The Grigas Family",
			members: [{
				name: "Matthew Grigas",
				attending: false
			}, {
				name: "Mazie Grigas",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "NishikiPipeworksMidtown",
			familyName: "The Mondragóns",
			members: [{
				name: "Kristen Rini Mondragón",
				attending: false
			}, {
				name: "Elsa Ceniceros Mondragón",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "YourLackOfBeerDisturbsMe",
			familyName: "Paul Heimburg and Aynsley Wille",
			members: [{
				name: "Paul Heimburg",
				attending: false
			}, {
				name: "Aynsley Wille",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "StraightOuttaCompton",
			familyName: "The Comptons",
			members: [{
				name: "Bradley Compton",
				attending: false
			}, {
				name: "Erin Compton",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "CreepingRustyMeat",
			familyName: "Dominique Salazar-Turner and Jessica Harrison",
			members: [{
				name: "Dominique Salazar-Turner",
				attending: false
			}, {
				name: "Jessica Harrison",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "PeytonOnSundayMorning",
			familyName: "Nam Hoang Lê",
			members: [{
				name: "Nam Hoang Lê",
				attending: false
			}, {
				name: "+1",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "DaHikingCrew",
			familyName: "Thy Minh Hang and Tu Nguyen",
			members: [{
				name: "Thy Minh Hang",
				attending: false
			}, {
				name: "Tu Nguyen",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "SparkplugQuiltCanal",
			familyName: "The Henrys",
			members: [{
				name: "Linda Henry",
				attending: false
			}, {
				name: "Brian Henry",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "TheLuckyDerby",
			familyName: "Rachel Moen and Ian Kennedy",
			members: [{
				name: "Rachel Moen",
				attending: false
			}, {
				name: "Ian Kennedy",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "WeirdScience",
			familyName: "The Northcutts",
			members: [{
				name: "Michael Northcutt",
				attending: false
			}, {
				name: "Meggin Northcutt",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "BloodBeamDaily",
			familyName: "The Longs",
			members: [{
				name: "Madeline Long",
				attending: false
			}, {
				name: "David Long",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "MaximEqualToken",
			familyName: "The Salazars",
			members: [{
				name: "Raymond Salazar",
				attending: false
			}, {
				name: "Cheryl Salazar",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "AsianTreeMenu",
			familyName: "The Longs",
			members: [{
				name: "Gary Long",
				attending: false
			}, {
				name: "Anita Long",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "OvalCondoSound",
			familyName: "Stepheni Henry and Anthony Lee",
			members: [{
				name: "Stepheni Henry",
				attending: false
			}, {
				name: "Anthony Lee",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "SmartMonadPearl",
			familyName: "Jason Long",
			members: [{
				name: "Jason Long",
				attending: false
			}, {
				name: "+1",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "CrimstopherCrimbulus",
			familyName: "Kelly Chan and Edward Nieh",
			members: [{
				name: "Kelly Chan",
				attending: false
			}, {
				name: "Edward Nieh",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "TheFunnyShow",
			familyName: "Sarah Rys and Josh Young",
			members: [{
				name: "Sarah Rys",
				attending: false
			}, {
				name: "Josh Young",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "Snickerdoodles",
			familyName: "The Fulliloves",
			members: [{
				name: "Felecia Fullilove",
				attending: false
			}, {
				name: "Michael Fullilove",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "LikeAG6",
			familyName: "CJ Deleon and Jay Reza",
			members: [{
				name: "CJ Deleon",
				attending: false
			}, {
				name: "Jay Reza",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "FermiSpiritBunny",
			familyName: "The Salazars",
			members: [{
				name: "Jerry Salazar",
				attending: false
			}, {
				name: "Jane Salazar",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "SurpriseButtSecks",
			familyName: "The Hollinger Family",
			members: [{
				name: "Dylan Hollinger",
				attending: false
			}, {
				name: "Alicia Hollinger",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "NappyPorchHavens",
			familyName: "The Halls",
			members: [{
				name: "Raquel Hall",
				attending: false
			}, {
				name: "Joseph Hall",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "LibelSockGourd",
			familyName: "Matthew Yamamoto",
			members: [{
				name: "Matthew Yamamoto",
				attending: false
			}, {
				name: "Matthew's Girlfriend",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "TeethArborSkunk",
			familyName: "Adam Stark",
			members: [{
				name: "Adam Stark",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "AfricanAmericanChair",
			familyName: "The Yuba People",
			members: [{
				name: "Melodie Guerra",
				attending: false
			}, {
				name: "Jamie Guerra",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "HeyThereDelilah",
			familyName: "The Paces",
			members: [{
				name: "Daniel Pace",
				attending: false
			}, {
				name: "Gloria Pace",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "MelonWhiskBluff",
			familyName: "The Johnsons",
			members: [{
				name: "Brian Johnson",
				attending: false
			}, {
				name: "Cindy Johnson",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "StiffRoadFeud",
			familyName: "The Tanabe Family",
			members: [{
				name: "Jacob Tanabe",
				attending: false
			}, {
				name: "Tiffany Tanabe",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "ShowtunesAreTheBest",
			familyName: "Julian Barley-Brinson",
			members: [{
				name: "Julian Barley-Brinson",
				attending: false
			}, {
				name: "+1",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "TheBestMentor",
			familyName: "The Mitchells",
			members: [{
				name: "Stephanie Mitchell",
				attending: false
			}, {
				name: "Harwood Mitchell",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "MyCatsAreMyKids",
			familyName: "The Bertalans",
			members: [{
				name: "Rocio Bertalan",
				attending: false
			}, {
				name: "Ferenc Bertalan",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "KingPestKiller",
			familyName: "The King Family",
			members: [{
				name: "Melvin King",
				attending: false
			}, {
				name: "Spencer King",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "DisneyFanatics",
			familyName: "The McDaniels",
			members: [{
				name: "Christi McDaniel",
				attending: false
			}, {
				name: "Ricky McDaniel",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "PsalmDairyChow",
			familyName: "Ken Tanabe and Kandace Chin",
			members: [{
				name: "Ken Tanabe",
				attending: false
			}, {
				name: "Kandace Chin",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "StormSatyrLift",
			familyName: "The Oakleys",
			members: [{
				name: "Bethany Oakley",
				attending: false
			}, {
				name: "Brandon Oakley",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "SettlersOfCatan",
			familyName: "The Duffs",
			members: [{
				name: "Christel Duff",
				attending: false
			}, {
				name: "Cody Duff",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "MayTheForceBeWithYou",
			familyName: "The Jose Family",
			members: [{
				name: "Heather Jose",
				attending: false
			}, {
				name: "Kelly Jose",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "WeAreFarmers",
			familyName: "The Waters",
			members: [{
				name: "Joel Waters",
				attending: false
			}, {
				name: "Paige Waters",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "SugarFlowLatch",
			familyName: "The Waters",
			members: [{
				name: "Larry Waters",
				attending: false
			}, {
				name: "Margie Waters",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "WineHawkTroll",
			familyName: "The Poole Family",
			members: [{
				name: "Brian Poole",
				attending: false
			}, {
				name: "Patricia Poole",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "AlgaeFoodMonth",
			familyName: "The Tanabes",
			members: [{
				name: "Dwayne Tanabe",
				attending: false
			}, {
				name: "Jenine Tanabe",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "EpicTopazYear",
			familyName: "The Waters",
			members: [{
				name: "Samuel Waters",
				attending: false
			}, {
				name: "Talia Waters",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "HometownMom",
			familyName: "Julie Parker",
			members: [{
				name: "Julie Parker",
				attending: false
			}, {
				name: "+1",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "ArtistMommyToBe",
			familyName: "Cierra Dornfeld and Brian Maguire",
			members: [{
				name: "Cierra Dornfeld",
				attending: false
			}, {
				name: "Brian Maguire",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "EndOfZeWorld",
			familyName: "Sabrina Hamilton",
			members: [{
				name: "Sabrina Hamilton",
				attending: false
			}, {
				name: "Mekye Kitsye",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "NighthawkNerds",
			familyName: "Jessie Storrs and Curtis Fugate",
			members: [{
				name: "Jessie Storrs",
				attending: false
			}, {
				name: "Curtis Fugate",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "WhoAreThesePeople",
			familyName: "The Harreschous",
			members: [{
				name: "Kory Harreschou",
				attending: false
			}, {
				name: "Brooklyn Dulgar",
				attending: false
			}, {
				name: "Teresa Harreschou",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "ModernUmbraVirus",
			familyName: "The Sanchez Family",
			members: [{
				name: "Arnold Sanchez",
				attending: false
			}, {
				name: "Jennifer Sanchez",
				attending: false
			}, {
				name: "Jordan Sanchez",
				attending: false
			}, {
				name: "Gabby Sanchez",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "ILoveMyDog",
			familyName: "The King Family",
			members: [{
				name: "Rodney King",
				attending: false
			}, {
				name: "Cindy King",
				attending: false
			}, {
				name: "Jordan King",
				attending: false
			}, {
				name: "Justin King",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "GenXSucks",
			familyName: "The Sharp Family",
			members: [{
				name: "Sarah Sharp",
				attending: false
			}, {
				name: "Jeff Sharp",
				attending: false
			}, {
				name: "Tyler Sharp",
				attending: false
			}, {
				name: "Kayleigh Sharp",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}, {
			code: "UpperDozenDrake",
			familyName: "The Snow Family",
			members: [{
				name: "Timothy Snow",
				attending: false
			}, {
				name: "Elaine Snow",
				attending: false
			}, {
				name: "Alex Snow",
				attending: false
			}, {
				name: "Zach Snow",
				attending: false
			}],
			songRequest: "", 
			rsvpMessage: "",
			rsvpdOnce: false
		}
	]).run(conn, (err, result) => {
		console.log(JSON.stringify(result, null, 2));
	});
});