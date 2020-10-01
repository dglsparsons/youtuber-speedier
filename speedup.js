/* Set all videos to 2.5x speed by default */
for (v of document.getElementsByTagName("video")) {
  v.playbackRate = 2.5;
}

const STYLES = `
.speed-control {
  width: 5rem;
  height: 5rem;
  border-radius: 5rem;
  border: none;
  background-color: #00ffc5;
  cursor: pointer;
}

.speed-control:hover{
  background-color: #08a682;
}

.speed-display {
  padding: 2rem;
}

.controls {
  position: fixed;
  border-radius: 5rem;
  bottom: 0;
  background: #cad8de;
  color: black;
  left: calc(50vw - 2.5rem);
  font-weight: bold;
}
`

class SpeedControls extends HTMLElement {
  constructor() {
    super()
    const shadowDOM = this.attachShadow({mode: 'open'})

    const style = document.createElement('style')
    style.innerHTML = STYLES
    shadowDOM.appendChild(style)

    const controls = document.createElement('div')
    controls.classList.add('controls')

    const speed = document.createElement('span')
    speed.innerHTML = '2.5x'
    speed.classList.add('speed-display')

    const slower = document.createElement('button')
    slower.innerHTML = '-'
    slower.classList.add('speed-control')
    slower.addEventListener('click', () => {
      for (v of document.getElementsByTagName("video")) {
        v.playbackRate = (Math.round(v.playbackRate * 10) - 1) / 10;
        shadowDOM.querySelector('.speed-display').innerHTML = v.playbackRate.toFixed(1) + 'x'
      }
    })

    const faster = document.createElement('button')
    faster.innerHTML = '+'
    faster.classList.add('speed-control')
    faster.addEventListener('click', () => {
      for (v of document.getElementsByTagName("video")) {
        v.playbackRate = (Math.round(v.playbackRate * 10) + 1) / 10;
        shadowDOM.querySelector('.speed-display').innerHTML = v.playbackRate.toFixed(1) + 'x'
      }
    })

    controls.appendChild(slower)
    controls.appendChild(speed)
    controls.appendChild(faster)
    shadowDOM.appendChild(controls)
  }
}

window.customElements.define('speed-controls', SpeedControls)
document.body.appendChild(new SpeedControls())
