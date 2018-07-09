#!/usr/bin/env node

const request = require('request')
require('dotenv').config({path: '_env'})
const moment = require('moment')
const ical = require('node-ical')

const calUrl = `${process.env.BASE_CALENDAR_URL}/2018/78480-2/reminders.ics`
const today = moment()

const getColors = (eventSummary) => {
  // Event summary: "Demain: VEGETAUX" or "Demain: VEGETAUX, ENCOMBRANTS"
  const bins = eventSummary.split(': ')[1].split(', ')
  let colors = []
  bins.forEach((bin) => {
    colors.push(process.env[bin])
  })
  return colors
}

const switchOn = (colors) => {
  const color = colors[0]
  console.log(`color found: ${color}`)
  request.put({
    url: process.env.LIGHT_URL,
    json: {
      'on': true,
      'hue': parseInt(color, 10),
      'bri': 100
    }
  }, (err, httpResponse, body) => {
    if (err) {
      return console.error('upload failed:', err)
    }
    console.log('Upload successful!  Server responded with:', body)
  })
}

const switchOff = () => {
  request.put({url: process.env.LIGHT_URL, json: {'on': false}})
}

ical.fromURL(calUrl, {}, (err, data) => {
  if (err) console.log(err)
  for (let k in data) {
    if (data.hasOwnProperty(k)) {
      const ev = data[k]
      const date = moment(ev.start)
      if (moment(date).isSame(today, 'day')) {
        const colors = getColors(ev.summary)
        if (colors.length < 1) {
          console.log(`DECHETS INCONNUS ? --> ${ev.summary}`)
        }
        return switchOn(colors)
      }
    }
  }
  console.log(`Pas de collecte de dechets demain, ${today.add(1, 'days')} !`)
})
