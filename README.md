# Poubelle la vie (working title)

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
