const moment = require('moment')
const places = require('./places.js')
const fs = require('fs')
const ical = require('ical-generator')

const icsProps = {
  domain: 'poubelle-la-vie.fr',
  timezone: 'Europe/Paris',
  prodId: {
    company: 'Poubelle La Vie Inc.',
    product: 'Make Poubelles Great Again',
    language: 'FR'
  }
}

moment.locale('fr')
const s = moment().set({'year': 2018, 'month': 0, 'date': 1, 'hour': 12, 'second': 0})
const e = moment().set({'year': 2018, 'month': 11, 'date': 31, 'hour': 12, 'second': 0})
// const e = moment().set({'year': 2018, 'month': 'December', 'date': 2, 'hour': 12})

function generateYearArray (s, e) {
  let year = []
  var d = new Date(s)
  while (d <= e) {
    year.push(new Date(d))
    d.setDate(d.getDate() + 1)
  }
  return year
}
let year = generateYearArray(s.toDate(), e.toDate())

// stuff starts here
places.list().forEach((place) => {
  let json = []
  let reminderCalendar = [] // array containing reminderICS calendar events
  let eventCalendar = []

  year.forEach((day) => {
    const m = moment(day)
    const e = place.rules(m)
    json.push({[m.format()]: e})
    if (e.length > 0) {
      eventCalendar.push({
        start: m.toDate(),
        allDay: true,
        summary: `Aujourd'hui: ${e.join(' ')}`,
        description: `Eh oui, aujourd'hui c'est les poubelles suivantes : ${e.join(' ')}`
      })

      // we want to be alerted the day before, at 8pm, yes that means '19'
      const a = m.clone().subtract(1, 'days').hour(20).minute(0)
      const startDate = a.toDate()
      const endDate = a.clone().add(2, 'hours').toDate()
      // console.log(`startDate: ${startDate}`)
      reminderCalendar.push({
        start: startDate,
        end: endDate,
        summary: `Demain: ${e.join(' ')}`,
        description: `Rappel pour demain : Ne pas oublier de sortir les poubelles suivantes ce soir : ${e.join(' ')}`
      })
    }
  })
  const reminderICS = ical(icsProps)
  const eventICS = ical(icsProps)

  reminderICS.name(`Des rappels pour ${place.name}`)
  eventICS.name(`Quand les poubelles passent à ${place.name}`)
  reminderICS.events(reminderCalendar)
  eventICS.events(eventCalendar)
  reminderICS.saveSync(`../data/${s.year()}/${place.id}/reminders.ics`)
  eventICS.saveSync(`../data/${s.year()}/${place.id}/events.ics`)
  fs.writeFileSync(`../data/${s.year()}/${place.id}/data.json`, JSON.stringify(json, null, 2))
})
