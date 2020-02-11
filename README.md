# Poubelle la vie (working title)

Has two parts:
1. a mechanism to generate ICS calendar data for rubbish collection (`generate-data`)
2. some embryonic idea to switch on/off Hue lights based on that data (`ambient`)

At this time, only the first one does kind of work.

* [data/2020/78480-1/events.ics](data/2020/78480-1/events.ics) a link to my town's (and zone's) collection dates
* [data/2020/78480-1/reminders.ics](data/2020/78480-1/reminders.ics) a link to the reminders (i.e. when the light should go on, or Alexa should remind us)

----


This is an _IoT_ project to:

* have a Philips Hue light bulb display the colour of the bins for the next day
* allow interaction with Alexa and Google Home to ask questions about next days or bins
* provide a calendar for Google Calendar or other ICS-compliant calendaring apps

To set up the Philips Hue script, use this crontab entry:

```
0 18 * * * /usr/bin/env node /home/pi/dechets/ambient/index.js  > /tmp/debug.log
```

Every day, at 6pm local time it will check and switch a light on, if appropriate. The last part (dump any output in a debug log) is optional.

`sudo crontab -e` to edit, and `sudo crontab -l` to list contents of file. If not using `sudo` you'll create a crontab file for the current user which may not be what you want.

TODO:

- [ ] Switch it off again
- [ ] If there are several bins to put out, alternate lighting, softly.
