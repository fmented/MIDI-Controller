
let url = window.location.href.replace(window.location.origin+'/MIDI-Controller/', '')
localStorage.setItem('goto', url)
window.location.href = window.location.origin + '/MIDI-Controller/'