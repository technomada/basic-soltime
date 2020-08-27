;(async n=>{
	console.log('run',SunCalc)

	let config = false

	document.body.onclick = n=>{
		//toggle fullscreen // upg: use polyfill
		if(document.fullscreen)
			document.exitFullscreen()
		else
			document.documentElement.requestFullscreen() 
		}//func

	const delta = n=>{
		// seconds till next sunrise
		let now = Date.now()
		let {lat,lon} = config
		console.log({lat,lon})
		let {sunrise} = SunCalc.getTimes(n, lat, lon);
		sunrise = sunrise.getTime()

		return {delta_sunrise:(sunrise-now)/1000,sunrise:sunrise/1000}
		}

	const tick = n=>{
		let unow = Date.now()/1000

		let now = new Date()
		let {delta_sunrise,sunrise} = delta(now)
		let d = delta_sunrise
		let s = sunrise
		if(d < 0){
			//use tomorrow // upg: use moment js to deal with proper +1 day?  (or calcuate time till tomorow and add that)
			let {delta_sunrise,sunrise} = delta(now.getTime()+(24*60*60*1000))
			d = delta_sunrise
			s = sunrise
			}


		console.log({d,s})
		let h = Math.floor(d / (60*60))
		let m = Math.floor((d - (h*60*60))/60)
		console.log({h,m})

		let a = s-(60*60*9)
		let b = s-(60*60*7.5)
		let c = s-(60*60*6)

		let aa = a-unow
		let bb = b-unow
		let cc = c-unow

		console.log({aa,bb,cc})

		const show = (d,n)=>{ // display, time till target
			let h = Math.floor(n/(60*60))
			n = n - (h*60*60)
			let m = Math.floor(n/60)
			n = n - (m*60)
			let s = Math.floor(n)
			if(h > 0 || m > 15)
				m = (Math.floor(m / 15)) *15

			let str = d
			if(h > 0)
				str += ' '+h

			str += ' '+((''+m).padStart(2,'0'))

			document.querySelector('.display').textContent = str
			}

		if(aa > 0){
			show(aa<=(90*60)?':D':'',aa)
			}
		else
		if(bb > 0){
			show(':)',bb)	
			}
		else
		if(cc > 0){
			show(':|',cc)
			}
		else
			document.querySelector('.display').textContent = ':('

		setTimeout(tick,60000)
	}//func


	if ('wakeLock' in navigator) {
		console.log('wakeable!')


		// The wake lock sentinel.
		let wakeLock = null;

		// Function that attempts to request a screen wake lock.
		const requestWakeLock = async () => {
		  try {
		    wakeLock = await navigator.wakeLock.request('screen');
		    wakeLock.addEventListener('release', () => {
		      console.log('Screen Wake Lock was released');
		    });
		    console.log('Screen Wake Lock is active');
		  } catch (err) {
		    console.error(`${err.name}, ${err.message}`);
		  }
		};

		// Request a screen wake lock…
		await requestWakeLock();
		// …and release it again after 5s.
		//window.setTimeout(() => {
		//  wakeLock.release();
		//  wakeLock = null;
		//}, 5000);
	
		const handleVisibilityChange = () => {
		  if (wakeLock !== null && document.visibilityState === 'visible') {
		    requestWakeLock();
		  }
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);

		}
	else
		console.log('not wakable.')

	config = await fetch('./config')
	config = await config.json() // upg: on error
	console.log(config)
	tick()


	/*
	//let str = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
	
	solarNoon: Tue Apr 28 2020 07:59:01 GMT-0400 (Eastern Daylight Time) {}
	nadir: Mon Apr 27 2020 19:59:01 GMT-0400 (Eastern Daylight Time) {}
	sunrise: Tue Apr 28 2020 00:38:31 GMT-0400 (Eastern Daylight Time) {}
	sunset: Tue Apr 28 2020 15:19:30 GMT-0400 (Eastern Daylight Time) {}
	sunriseEnd: Tue Apr 28 2020 00:42:16 GMT-0400 (Eastern Daylight Time) {}
	sunsetStart: Tue Apr 28 2020 15:15:45 GMT-0400 (Eastern Daylight Time) {}
	dawn: Tue Apr 28 2020 00:00:48 GMT-0400 (Eastern Daylight Time) {}
	dusk: Tue Apr 28 2020 15:57:13 GMT-0400 (Eastern Daylight Time) {}
	nauticalDawn: Mon Apr 27 2020 23:12:25 GMT-0400 (Eastern Daylight Time) {}
	nauticalDusk: Tue Apr 28 2020 16:45:37 GMT-0400 (Eastern Daylight Time) {}
	nightEnd: Mon Apr 27 2020 22:13:43 GMT-0400 (Eastern Daylight Time) {}
	night: Tue Apr 28 2020 17:44:18 GMT-0400 (Eastern Daylight Time) {}
	goldenHourEnd: Tue Apr 28 2020 01:25:16 GMT-0400 (Eastern Daylight Time) {}
	goldenHour: Tue Apr 28 2020 14:32:45 GMT-0400 (Eastern Daylight Time) {}
	*/
	})();
