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

const s = moment().set({'year': 2018, 'month': 0, 'date': 1, 'hour': 10, 'minute': 0, 'second': 0})
const e = moment().set({'year': 2018, 'month': 11, 'date': 31, 'hour': 10, 'minute': 0, 'second': 0})

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
places().forEach((place) => {
  const json = []
  const reminderCalendar = [] // array containing reminderICS calendar events
  const eventCalendar = []

  year.forEach((day) => {
    const m = moment(day)
    const e = place.rules(m)
    json.push({[m.format()]: e})

    if (e.length > 0) {
      // push events in an array for the event calendar (alexa etc.)
      eventCalendar.push({
        start: m.toDate(),
        allDay: true,
        summary: `${e.join(', ')}`,
        description: `Eh oui, aujourd'hui, ${m.format('dddd')}, c'est les poubelles suivantes : ${e.join(' ')}`
      })

      // we want to be alerted the day before, at 8pm
      const alertDate = m.clone().subtract(1, 'days').hour(20).minute(0).second(0)

      // push events in an array for the reminder calendar (ambient)
      reminderCalendar.push({
        start: alertDate.toDate(),
        end: alertDate.clone().add(2, 'hours').toDate(),
        summary: `Demain: ${e.join(', ')}`,
        description: `Rappel pour demain, ${m.format('dddd')} : Ne pas oublier de sortir les poubelles suivantes ce soir : ${e.join(' ')}`
      })
    }
  })
  const reminderICS = ical(icsProps)
  const eventICS = ical(icsProps)

  reminderICS.name(`Des rappels pour ${place.name}`)
  eventICS.name(`Quand les poubelles passent à ${place.name}`)

  reminderICS.events(reminderCalendar)
  eventICS.events(eventCalendar)
  const savePath = `../data/${s.year()}/${place.id}`
  reminderICS.saveSync(`${savePath}/reminders.ics`)
  eventICS.saveSync(`${savePath}/events.ics`)
  fs.writeFileSync(`${savePath}/data.json`, JSON.stringify(json, null, 2))
})
