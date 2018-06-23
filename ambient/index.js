const huejay = require('huejay')

huejay.discover()
  .then(bridges => {
    const bridge = bridges[0]
    const client = new huejay.Client({
      host: bridge.ip,
      port: 80,
      username: bridge.id,
      timeout: 15000
    })
    client.bridge.isAuthenticated()
      .then(() => {
        console.log(`Auth OK`)
      })
      .catch(error => {
        console.log(`ERR: ${JSON.stringify(error.stack)}`)
      })
    // client.users.getAll()
    //   .then(users => {
    //     for (let user of users) {
    //       console.log(`Username: ${user.username}`)
    //     }
    //   })
    //   .catch(error => {
    //     console.log(`${error.message}`)
    //   })

    // user name: T9JvqwW2z7nON3iISPizHsSMianQWvT007BDUue6

    //  as created by bridge clip UI: fQ4vCRXmWvAt1RBd7TUmFHykpjsaagiP0OGnEFDx

    // const user = new client.users.User
    // client.users.create(user)
    //   .then(user => {
    //     console.log(`New user created - Username: ${user.username}`)
    //   })
    //   .catch(error => {
    //     if (error instanceof huejay.Error && error.type === 101) {
    //       return console.log(`Link button not pressed. Try again...`)
    //     }
    //     console.log(error.stack)
    //   })
    // client.lights.getAll()
    //   .then(lights => {
    //     for (let light of lights) {
    //       console.log(`Light [${light.id}]: ${light.name}`)
    //       console.log(`  Type:             ${light.type}`)
    //       console.log(`  Unique ID:        ${light.uniqueId}`)
    //       console.log(`  Manufacturer:     ${light.manufacturer}`)
    //       console.log(`  Model Id:         ${light.modelId}`)
    //       console.log('  Model:')
    //       console.log(`    Id:             ${light.model.id}`)
    //       console.log(`    Manufacturer:   ${light.model.manufacturer}`)
    //       console.log(`    Name:           ${light.model.name}`)
    //       console.log(`    Type:           ${light.model.type}`)
    //       console.log(`    Color Gamut:    ${light.model.colorGamut}`)
    //       console.log(`    Friends of Hue: ${light.model.friendsOfHue}`)
    //       console.log(`  Software Version: ${light.softwareVersion}`)
    //       console.log('  State:')
    //       console.log(`    On:         ${light.on}`)
    //       console.log(`    Reachable:  ${light.reachable}`)
    //       console.log(`    Brightness: ${light.brightness}`)
    //       console.log(`    Color mode: ${light.colorMode}`)
    //       console.log(`    Hue:        ${light.hue}`)
    //       console.log(`    Saturation: ${light.saturation}`)
    //       console.log(`    X/Y:        ${light.xy[0]}, ${light.xy[1]}`)
    //       console.log(`    Color Temp: ${light.colorTemp}`)
    //       console.log(`    Alert:      ${light.alert}`)
    //       console.log(`    Effect:     ${light.effect}`)
    //       console.log()
    //     }
    //   })
    //   .catch(error => {
    //     console.log(`An error occurred: ${error.message}`)
    //   })
  })
  .catch(error => {
    console.log(`An error occurred: ${error.message}`)
  })
// const client = new huejay.Client({
//   host:     '123.0.12.34',
//   port:     80,               // Optional
//   username: 'bridgeusername', // Optional
//   timeout:  15000,            // Optional, timeout in milliseconds (15000 is the default)
// })
