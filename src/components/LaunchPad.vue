<template>
  <instument-base>
      <div class="controls">
          <div>
              <label for="rowcount">Row</label>
                <input type="range" id="rowcount" min="1" max="4" step="1" v-model="row">
          </div>
          <div>
              <label for="cc">Send CC</label>
                <input type="checkbox" id="cc" v-model="cc">
          </div>
          <div v-if="cc">
              <label for="sw">Switch Mode</label>
                <input type="checkbox" id="sw" v-model="switchmode">
          </div>
          <div>
              <label for="static">Static</label>
                <input type="checkbox" id="static" v-model="staticvel">
          </div>
          <div v-if="staticvel">
                <label for="vel">Velocity</label>
                <input type="range" id="vel" min="0" max="127" step="1" v-model="vel">
          </div>
          <div>
              <label for="colcount">Column</label>
                <input type="range" id="colcount" min="1" max="8" step="1" v-model="column">
          </div>
      </div>
      <div class="wrapper">
          <div ref="pads" class="pad" v-for="i in total_pad" :key="i" :style="`--r:${row}; --c:${column};`" :note="note_start+i-1"></div>
      </div>
  </instument-base>
</template>

<script>
import InstumentBase from './InstumentBase.vue'
export default {
  components: { InstumentBase },
  data(){
      return{
          row: 3,
          column: 5,
          cc: false,
          switchmode: false,
          note_start: 60,
          vel: 80,
          staticvel: false,
          active_cc:[]
      }
  },

  computed:{
      total_pad(){
          return this.row * this.column
      },

      
  },

  methods:{

      touchstart(e){
          let el = e.target
          let note = el.getAttribute('note')

          if(!this.cc){
              if(this.staticvel) this.$emit('noteOn', {note:note, velocity:this.vel} )
              else this.$emit('noteOn', {note:note, velocity:this.$random_vel()} )
              el.classList.add('active')
          }
          else{
              if(this.switchmode){
                    if(this.active_cc.includes(note)) {
                      this.$emit('cc', {note:note, value:0} )
                      let list = this.active_cc.filter(i=>i!=note)
                      this.active_cc=list
                      el.classList.remove('active')
                      }
                    else{
                        this.$emit('cc', {note:note, value:127} )
                        this.active_cc.push(note)
                        el.classList.add('active')
                    }
                  
                }
                else{
                    if(this.staticvel) this.$emit('cc', {note:note, value:this.vel} )
                    else this.$emit('cc', {note:note, value:this.random_vel()} )
                    el.classList.add('active')
                }
              
          }
          
      },

      touchend(e){
          let el = e.target
          let note = el.getAttribute('note')
          if(!this.cc){
              this.$emit('noteOff', {note:note, velocity:0} )
              el.classList.remove('active')
          }
          else{
              if(!this.switchmode) {
              this.$emit('cc', {note:note, value:0})
              el.classList.remove('active')
              }
          }
      },
      add_listener(){
          
          this.$refs.pads.forEach(i=>{
              i.oncontextmenu = e=>e.preventDefault()
              if(this.$touch){
                i.ontouchstart = this.touchstart
                i.ontouchend = this.touchend
                i.ontouchleave = this.touchend 
              }
              else{
                i.onpointerdown = this.touchstart
                i.onpointerup = this.touchend
                i.onpointerleave = this.touchend
              }
              
              
          })
      }
  },



  mounted(){
      this.$nextTick(function(){
        this.add_listener()          
      })
  },
  updated(){
      this.add_listener() 
  }


}
</script>

<style scoped>
.pad{

    height: calc( 100% / var(--r) - 10px);
    width: calc( 100% / var(--c) - 10px);
    background-color: #222;
    border: 2px solid #9AB8AF;
    position: relative;
    margin: 5px;
    border-radius: 10%;
    display: grid;
    place-items: center;
    overflow: hidden;
}

.pad.active::after{
    content: '';
    border-radius: 50%;
    height: 40%;
    width: 40%;
    z-index: 10;
    filter: blur(5em);
    background-color: #23f;
}

.pad.active{
    border: 2px solid #3ef;
}

.wrapper>*,.wrapper{
    box-sizing: border-box;
}

.wrapper{
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 80vh;
    background-color: black;
    overflow: hidden;
}

.controls{
    height: 10vh;
    background-color: #222;
    display: flex;
    justify-content: space-evenly;
}






.controls>div{
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-width: 10%;
    max-width: 30%;
    overflow: hidden;
    background-color: black;
    border: 2px solid #9AB8AF;
    color: grey;
    font-weight: bold;
    height: 80%;
}

</style>