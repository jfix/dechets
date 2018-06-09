const moment = require('moment')
const places = require('./places.js')
const fs = require('fs')
const ics = require('ics')

moment.locale('fr')
const s = moment().set({'year': 2018, 'month': 'January', 'date': 1, 'hour': 12})
const e = moment().set({'year': 2018, 'month': 12, 'date': 31, 'hour': 12})
// const e = moment().set({'year': 2018, 'month': 'December', 'date': 2, 'hour': 12})

function generateYearArray (s, e) {
  let y = []
  var d = new Date(s)
  while (d <= e) {
    y.push(new Date(d))
    d.setDate(d.getDate() + 1)
  }
  return y
}
let y = generateYearArray(s.toDate(), e.toDate())

// stuff starts here
places.list().forEach((place) => {
  let r = []
  let c = [] // array containing ics calendar events
  y.forEach((day) => {
    const m = moment(day)
    const e = place.rules(m)
    r.push({[m.format()]: e})
    if (e.length > 0) {
      // we want to be alerted the day before, at 8pm, yes that means '19'
      const a = m.clone().subtract(1, 'day').hour(19).minute(0)
      const startDate = a.format('YYYY-M-D-h-mm').split('-')
      console.log(`startDate: ${startDate}`)
      c.push({
        start: startDate,
        duration: { minutes: 120 },
        title: `Demain: ${e.join(' ')}`,
        description: `Ne pas oublier de sortir les poubelles suivantes : ${e.join(' ')}`
      })
    }
  })
  ics.createEvents(c, (error, value) => {
    if (!error) fs.writeFileSync(`${s.year()}/${place.id}.ics`, value)
    else console.log(`ICAL error: ${error}`)
  })
  fs.writeFileSync(`${s.year()}/${place.id}.json`, JSON.stringify(r, null, 2))
})
