<template>
             <div class="fader" ref="fader">
              <div class="slider">
                  <div class="thumb" ref="thumb" :style="`--move:${value}%;`"></div>
              </div>
          </div>
         

</template>

<script>
export default {
    props:{
        note:{
            type:Number
        }
    },
  data(){
      return{
          value: 0,
          pressed: false,
          starting_point: undefined,
          vel: null
      }
  },

  methods:{
      slide(e){
          let pos = e.clientY || e.touches[0].clientY
          if(this.pressed){
              if(pos<this.starting_point){
                  if(this.value<300) this.value+=2
                  this.vel = Math.floor(this.value/4.6875)+64-1;
              }
              else{
                  if(this.value>-300) this.value-=2
                  this.vel = Math.floor(this.value/4.6875)+64;
              }
              this.$emit('slide', {note:this.note, value:this.vel})
            }
      }
  },

  mounted(){
      this.$nextTick(
          function(){
              let vm = this
              this.$refs.fader.onmousemove = this.slide
              this.$refs.fader.onmousedown = (e)=>{vm.pressed=true; vm.starting_point=e.clientY}
              this.$refs.fader.onmouseup = ()=>{vm.pressed=false}
              this.$refs.fader.onmouseleave = ()=>{vm.pressed=false}
              this.$refs.fader.ontouchmove = this.slide
              this.$refs.fader.ontouchstart = (e)=>{vm.pressed=true; vm.starting_point=e.touches[0].clientY}
              this.$refs.fader.ontouchend = ()=>{vm.pressed=false}
              this.$refs.fader.ontouchleave = ()=>{vm.pressed=false}
              
          }
      )
  }

}
</script>

<style scoped>

.slider{
    width: 80%;
    height: 20%;
    background-color: black;
    display: grid;
    place-items: center;
    border-radius: 5px;
}

.slider>.thumb{
    height: 200%;
    width: 15%;
    background: repeating-linear-gradient(
        90deg,
        black,
        #222 5px,
        #eee 5px,
        #eee 10px
    );
    transform: translateX(var(--move));

}

.fader{
    width: 90vh;
    height: 10vw;
    transform: rotate(-90deg) translateX(-100%);
    transform-origin: 0% 0%;
    background-color: #222;
    position: absolute;
    display: grid;
    place-items: center;

}



</style>