const places = [
  {
    'id': '78480-1',
    'name': 'Verneuil-sur-Seine, zone rose',
    'zip': '78480',
    'rules': (d) => {
      let data = []
      let w = d.weekday()
      // ----------------------------------------------
      // business rules start below
      if (w === 2 || w === 5) { // mardi, vendredi
        data.push('MENAGERES')
      }
      if (w === 3) { // mercredi
        data.push('RECYCLABLES', 'VERRE')
      }
      if (w === 1 && d.isSameOrAfter('2018-02-26') && d.isSameOrBefore('2018-12-24')) { // lundi entre 26 fevr et 24 dec
        data.push('VEGETAUX')
      }
      // every third (3) Thursday (4) of the month, ENCOMBRANTS
      if (getDayInMonth(d, 4, 3)) {
        data.push('ENCOMBRANTS')
      }
      // -----------------------------------------------
      return data
    }
  },
  {
    'id': '78480-2',
    'name': 'Verneuil-sur-Seine, zone orange',
    'zip': '78480',
    'rules': (d) => {
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
      return data
    }
  }
]

function getDayInMonth (/* a moment object */ testDate, day /* 4: Thursday */, week /* 2: second week */) {
  if (testDate.weekday() !== day) return false
  return Math.ceil(testDate.date() / 7) === week
}

const Places = function () {}
Places.prototype.list = function () {
  return places
}
module.exports = new Places()
