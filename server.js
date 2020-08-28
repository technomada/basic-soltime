const express = require('express')
const path = require('path')
const CONFIG = require('./config.js')

// upg: provide config (if secure)
//
// upg: pull solar noon localy and provide delta adjust?  though that's calcable?  give slack.. or better yet.. use permissions to show clock?

;(async n=>{
	// server
	//
	let app = express()

	console.log(process.env)

	let {LAT,LON} = process.env

	console.log({LAT,LON})
	LAT = LAT || 0
	LON = LON || 0

	// upg: how to get from settings
	app.get('/config',async (req,res)=>{
		
		res.json({lat:LAT, lon:LON})

		//res.json({lat:49.53933, lon:-21.182341})
		})


	app.use(express.static(path.join(__dirname,'www')))

	let {port} = CONFIG
	app.listen(port,async n=>{
		console.log('port ready',port)
		})
	})();
