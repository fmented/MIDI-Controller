<template>
  <div class="container">
      <div class="wrapper">
          <router-link to="/play"><span class="midi-home"></span></router-link>
          
           
            <label for="output">MIDI Device</label>
            <select name="output" id="output" v-model="device">
                <option disabled :value="undefined">Select MIDI Device</option>
                <option v-for="(v, i) in output" :key="'output'+i"
                :value="v">{{v.name}}</option>
            </select>
        </div>

        <div class="wrapper">
            <label for="output">MIDI Channel</label>
            <select name="channel" id="channel" v-model="channel">
                <option v-for="i in 16" :key="'channel'+i"
                :value="i-1">{{i}}</option>
            </select>
            <i class="midi-expand" v-if="!fullscreen" @click="toggleFullScreen"></i>
            <i class="midi-collapse" v-else  @click="toggleFullScreen"></i>
      </div>
      <div class="error-message" v-if="error">
          {{errorText}}

          <button @click="reload" v-if="midiSupport && showButton">
              <span class="midi-refresh"></span>
          </button>
          <button @click="error=false; showButton=true" v-if="midiSupport && !showButton">
              <span class="midi-midi"></span>
          </button>
      </div>
      
  </div>
</template>

<script>

export default {
    data(){
        
        return{
                output: [],
                device: undefined,
                channel: 0,
                error: true,
                errorText: '',
                fullscreen: false,
                midiSupport: false,
                showButton: true
            }
    },

    computed:{
        output_lenght_0(){
            return this.output.lenght == 0
        }
    },

    methods:{
        reload(){
            window.location.reload(true)
        },

        noteOn(val){
            if(this.device) this.device.send([0x90+this.channel, val.note, val.velocity]);
            else{
                this.error = true
                this.errorText = 'Please Select Your MIDI Device First'
                this.showButton = false
            }
        },
        noteOff(val){
            if(this.device) this.device.send([0x80+this.channel, val.note, val.velocity]);
            else{
                this.error = true
                this.errorText = 'Please Select Your MIDI Device First'
                this.showButton = false
            }
        },
        noteCC(val){
            if(this.device) this.device.send([0xB0+this.channel, val.note, val.value]);
            else{
                this.error = true
                this.errorText = 'Please Select Your MIDI Device First'
                this.showButton = false
            }

        },






        toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            this.fullscreen = true
        } 
        else {
            if (document.exitFullscreen) {
            document.exitFullscreen();
            this.fullscreen = false
            }
        }
        }
    },


    mounted(){
        let vm = this
        if ("requestMIDIAccess" in navigator) {
            navigator.requestMIDIAccess()
            .then((access)=>{
                vm.midiSupport = true
                const outputs = access.outputs;
                if(outputs.size<1){
                    vm.errorText = 'Please Connect MIDI Device and Tap Refresh to Continue'
                    return
                }

                outputs.forEach((midioutput) => {
                    vm.output.push(midioutput)
                    vm.error = false
                    midioutput.onstatechange = (e)=> {
                        if (e.target.connection=='closed'){
                            let list = vm.output.filter(i=>i!=e.target)
                            vm.output=list
                            if(list.length==0){
                                this.errorText = 'Please Connect MIDI Device and Tap Refresh to Continue'
                                this.error = true
                                }
                        }
                    }
                });
            })
            .catch(() => {
                vm.errorText = 'Permission Error'
                return
            });
        }
        else{
            this.errorText = 'No MIDI Support'
        }
    }

}
</script>

<style scoped>

.hide{
    display: none;
}

.error-message{
    position: absolute;
    display: flex;
    background-color: rgba(0,0,0,0.6);
    width: 100vw;
    height: 100vh;
    z-index: 100;
    font-size: 2em;
    user-select: none;
    color: #ccc;
    font-weight: bolder;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
/* .error-message>*{
    margin: 2rem;
} */

.error-message>button{
    margin: 2rem;
    padding-top: 5px;
    width: max-content;
    border: 2px solid white;
    font-size: 1.5em;
    background-color: rgba(0,0,0,0.8);
    color: #dcd;
}


.container{
    margin: 0;
    position: relative;
    height: 10vh;
    display: flex;
    justify-content: space-between;
}

.wrapper{
    position: relative;
    display: flex;
    justify-content: space-evenly;
    min-width: 50%;
    background-color: #444;
    color: #ccc;
    height: 10vh;
}

a:active, a:visited, a:hover, a{
    color: #ccc;
    text-decoration: none;
}

.wrapper>*{
    align-self: center;
    user-select: none;
    font-weight: bold;
}

.wrapper>select{
    min-width: 40%;
    max-width: 50%;
    background-color: #dcd;
    color: black;
    
}


</style>