# swfc

REST API for Star Wars Force Collection data

# NOT YET IMPLEMENTED

Everything is very much a work in progress at this point. Just building out a basic framework to eventually build out into something hopefully usefull. 

# Current routes:
* Info routes:
	* GET /localhost:3000/heartbeat (shows the service is up and running)
* Data Routes: (ALL MOCK FOR NOW)
	* GET /localhost:3000/cards/123
	* GET /localhost:3000/vehicles/123
	* GET /localhost:3000/vehicleParts/123

# Future plans
* Hook up to a SQL backend
* Vehicles
* Stack Cards
* Cards
* Planets
* Map Quests
* Quests
* Vehicle Parts
* Pilots 
* Co-Pilots
* Affliations (ex/ Clone, Jedi, Sith, Rebel, etc)
* Ranking Data (BMans, Savage, etc.)
* Full CRUD on all routes
* Personal data (card binder, formations, BP's, etc)

# FAQ
 * **Why Node?** Because that's what i've been focused on lately. I know this could have been better suited in [INSERT LANGUAGE HERE], but this is what I wanted to get some practice in, so....yeah.
 * **When will 'X' be ready?** I have no idea. This is a downtime project. It may very well never be ready. I'll see what I can do.
 * **I'm going to steal this.** Ok. All yours. 
 * **Where will the data come from?** Great question. As far as I know, there is no API available from SWFC, and I have no intention of trying to scrape it, so I guess it will all have to be manual. If you know of a better way....please, please, please tell me. 
 * **Where will this be used?** Not sure yet. I hope to eventually build out a UI of my own, but feel free to build your own if you so desire. I'll likely post out my hosted version of this service for all to use, if/when I ever get that far. 
 * **Can I contribute?** Sure, but please be patient with me. This is my first real foray into the whole open source thing. 