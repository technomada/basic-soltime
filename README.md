# Basic Web Application Series - Soltime
Countdown clock based on sleep cycles and synchronized to local sunrise.

* Get better sleep - Synchronize with 90 min sleep cycles and sunrise.
* Make better use of time - Displays countdown of remaining useful day hours.

How to use:
```
$ sudo docker run -d --env LAT=12.3456 --env LON=-123.45678 -p 8000:3000 technomada/basic-soltime
```
### Explainer
This premise of this web application is the assumption that it is useful and natural to wake up around the same time the sun rises.  Further it applies the concept of 90 minute natural full sleep cycles.  To accomplish this the clock uses your location to calculate sunrise and back calculates 90 minute increments to determine optimal sleep times (9hr, 7.5hr, 6hr before sunrise.)  The hours and minutes remaining to these optimal times are displayed in a clean simple interface.  As an aside, I find it also useful to be conscious of the number of productive hours remaining in the day to better adjust my goals and tasks.

### As a clock
![tablet with clock example](https://github.com/technomada/basic-soltime/raw/master/sol-clock.png)

I like to grab an old tablet and re-purpose it on a desk or table as a dedicated clock device.
