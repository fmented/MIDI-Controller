<template>
<div class="info">
  <div>
    <h1>MIDI CONTROLLER</h1>
  </div>
        
        <div>
          <img
          :src="require('../assets/logo.png')"
          class="my-3"
          height="200"
          width="200"
          alt="Logo"
        />
        </div>
<div v-if="!shown">
        <h2>
          What is this?
        </h2>

        <p>
          This is a Progressive Web Application that can turn your device into a 
          <a href="https://en.wikipedia.org/wiki/MIDI">MIDI</a> Controller using <a href="https://caniuse.com/midi">Web MIDI API</a>

        </p>

        <h2>What can I do with this?</h2>
        <p>
          You need a MIDI output device or any software / app that can create virtual MIDI connection to make this work. 
          Example : <a href="https://play.google.com/store/apps/details?id=net.volcanomobile.fluidsynthmidi&hl=en&gl=US" target="_blank">FluidSynth</a>
          <br>
          And if your device is running Android 6 or above, you can use it to control your <a href="https://en.m.wikipedia.org/wiki/Digital_audio_workstation" target="_blank">DAW</a>
          using USB connection like these apps: <a href="https://play.google.com/store/apps/details?id=de.humatic.tdaw&hl=en&gl=US" target="_blank">TouchDAW</a>, <a href="https://play.google.com/store/apps/details?id=com.seemayr.midicontroller&hl=en&gl=US" target="_blank"> MIDI Controller</a>
        </p>



        <details>
          <summary>How?</summary>
           <figure>
          <figcaption><b>Go to Setting</b></figcaption>
          <img src="../assets/tutor/Screenshot_2021-01-28-11-35-08-00.jpg" alt="setting" height="520" width="270">
        </figure>
        <br>
        <figure>
          <figcaption><b>Find Developer Options</b></figcaption>
          <img src="../assets/tutor/Screenshot_2021-01-28-11-35-22-38.jpg" alt="dev" height="520" width="270">
        </figure>
        <br>
        <figure>
          <figcaption><b>Scroll down to the Networking section</b></figcaption>
          <img src="../assets/tutor/Screenshot_2021-01-28-11-35-38-20.jpg" alt="network" height="520" width="270">
        </figure>
        <br>
        <figure>
          <figcaption><b>Tap on Select USB Configuration and set it to MIDI</b></figcaption>
          <img src="../assets/tutor/Screenshot_2021-01-28-11-36-00-81.jpg" alt="usb" height="520" width="270">
        </figure>
        <br>
        <figure>
          <figcaption><b>Go to this <a href="/play">page</a> and tap on MIDI Device option <br>
          Normally it would be registered as USB Peripheral Port
          </b></figcaption>
          <img src="../assets/tutor/Screenshot_2021-01-28-11-39-15-51.jpg" alt="option" height="180" width="400">
        </figure>
        <br>
        <figure>
          <figcaption><b>Make sure to enable it on your DAW, the name could be different for every device</b></figcaption>
          <img src="../assets/tutor/daw.png" alt="daw" height="350" width="600">
        </figure>
        </details>
</div>

        <button @click="$router.push('play')">Start Now</button>
       





</div>
</template>

<script>
  export default {
    name: 'Info',
    data(){
      return {
        shown: localStorage.getItem('shown')
      }
    },

    beforeDestroy(){
      localStorage.setItem('shown', true)
    },

    created(){
      if(this.shown){
        this.$router.push('play')
      }
    },

    beforeMount(){
      let url = localStorage.getItem('goto')
      if(url){
        this.$router.push(url)
        localStorage.removeItem('goto')
      }
    }
  }
</script>

<style scoped>
button{
  height: 2rem;
  margin: 0.5rem;
  background-color: #333;
  border-radius: 5%;
  border: 2px solid #9AB8AF;
  width: 12rem;
  font-weight: bold;
  font-size: 1.2em;
  margin-top: 1rem;

}

summary{
  font-size: 1em;
  font-weight: bolder;
  outline: none;
}

.info>*, img{
  color: #9AB8AF;
  filter: drop-shadow(15px 15px 12px #111);
}

a:link, a:visited{
  color: #9AB8AF;
}

a:active, a:hover{
  color: #ddeddd;
}
</style>
