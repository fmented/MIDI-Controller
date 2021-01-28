<template>
  <div>
        <midi ref="device"/>
        <router-view @noteOn="noteOn" @noteOff="noteOff" @cc="noteCC"/>
  </div>
</template>

<script>
import Midi from '../components/MidiCheck'
export default {
  components:{
    Midi    
  },
  methods:{
    noteOn(a){
      this.$refs.device.noteOn(a)
    },
    noteOff(a){
      this.$refs.device.noteOff(a)
    },
    noteCC(a){
      this.$refs.device.noteCC(a)
    },

    print(val){
      console.log(val)
    }
    
  },

  mounted(){
}
  
}
</script>

<style>
*{
  box-sizing: border-box;
  margin: 0;
}


</style>
