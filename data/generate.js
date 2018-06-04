const moment = require('moment')
const fs = require('fs')

const s = moment().set({'year': 2018, 'month': 0, 'date': 1, 'hour': 12})
const e = moment().set({'year': 2018, 'month': 11, 'date': 31, 'hour': 12})
let d = s
let r = []

moment.locale('fr')

function getDayInMonth (/* a moment object */ testDate, day /* 4: Thursday */, week /* 2: second week */) {
  if (testDate.weekday() !== day) return false
  return Math.ceil(testDate.date() / 7) === week
}
// [
//   {"2018-01-01": ["MENAGERES", "RECYCLABLES", "VERRE", "VEGETAUX", "ENCOMBRANTS"]},
//  ...
// ]

while (true) {
  let data = []
  let w = d.weekday()
  // ----------------------------------------------
  // business rules start below
  if (w === 3 || w === 6) { // mercredi, samedi
    data.push('MENAGERES')
  }
  if (w === 4) { // jeudi
    data.push('RECYCLABLES', 'VERRE')
  }
  if (w === 1 && d.isSameOrAfter('2018-02-26') && d.isSameOrBefore('2018-12-24')) { // lundi entre 26 fevr et 24 dec
    data.push('VEGETAUX')
  }
  // every second (2) Thursday (4) of the month, ENCOMBRANTS
  if (getDayInMonth(d, 4, 2)) {
    data.push('ENCOMBRANTS')
  }
  // ------------------------------------------------
  r.push({[d.format()]: data})
  // console.log(`${d.format()}: ${JSON.stringify(data)}`)
  d.add(1, 'days')
  if (d.isAfter(e)) break
}

fs.writeFileSync('test.json', JSON.stringify(r))
