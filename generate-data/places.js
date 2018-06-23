const places = [
  {
    'id': '78480-1',
    'name': 'Verneuil-sur-Seine, zone rose',
    'zip': '78480',
    'rules': (d) => {
      const data = []
      let w = d.weekday() /* zero-based!!! lundi = 0, dimanche = 6 */
      // ----------------------------------------------
      // business rules start below
      if (w === 1 || w === 4) { // mardi, vendredi
        data.push('MENAGERES')
      }
      if (w === 2) { // mercredi
        data.push('RECYCLABLES', 'VERRE')
      }
      if (w === 0 && d.isSameOrAfter('2018-02-26') && d.isSameOrBefore('2018-12-24')) { // lundi entre 26 fevr et 24 dec
        data.push('VEGETAUX')
      }
      // every third (3) Thursday (3, zero-based) of the month, ENCOMBRANTS
      if (getDayInMonth(d, /* Thursday */ 3, /* week */ 3)) {
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
      const data = []
      let w = d.weekday() /* zero-based!!! lundi = 0, dimanche = 6 */
      // ----------------------------------------------
      // business rules start below
      if (w === 2 || w === 5) { // mercredi, samedi
        data.push('MENAGERES')
      }
      if (w === 3) { // jeudi
        data.push('RECYCLABLES', 'VERRE')
      }
      if (w === 0 && d.isSameOrAfter('2018-02-26') && d.isSameOrBefore('2018-12-24')) { // lundi entre 26 fevr et 24 dec
        data.push('VEGETAUX')
      }
      // every second (2) Thursday (3, zero-based) of the month, ENCOMBRANTS
      if (getDayInMonth(d, /* Thursday */ 3, /* week */ 2)) {
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

const Places = function () {
  return places
}
module.exports = Places
