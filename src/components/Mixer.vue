<template>
  <instument-base>
      <div class="wrapper">
          <fader class="fader" v-for="i in 10" :key="i" :note="base+i-1" @slide="send"
          :style="`--pos:${i-1};`"/>
      </div>
      
  </instument-base>
</template>

<script>
import Fader from './Fader.vue'
import InstumentBase from './InstumentBase.vue'
export default {
  components: { InstumentBase, Fader },
    

  data(){
      return{
          base: 60
      }
  },

  methods:{
      send(e){
          this.$emit('cc', e)
      }
  }

}
</script>

<style scoped>
.wrapper{
    background-color: black;
    height: 90vh;
    display: flex;
    position: relative;
    flex-direction: row;
}

.fader{
    left: calc(var(--pos) * 10vw);
    margin: 0;
    }

</style>