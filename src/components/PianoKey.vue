<template>
    <instument-base>
    <div class="controls">
        <button @click="lo_trans">Transpose -</button>
        <button @click="lo_octave">Octave -</button>
        <div>
            <span>OCTAVE {{octave}}</span>
            <span>TRANSPOSE {{transpose}}</span>
        </div>
        
        <button @click="hi_octave">Octave +</button>
        <button @click="hi_trans">Transpose +</button>
    </div>
    <div class="wrapper" ref="keys">
        <div v-for="(v, i) in keys" :key="i"
        :class="v.class" :style="`--x-pos:${v.pos};`"
        :note="v.key"
        ></div>
    </div>
    </instument-base>
</template>

<script>
import InstumentBase from './InstumentBase.vue'
export default {
  components: { InstumentBase },
    computed:{
  

        octave_key(){
            return this.octave * 12
        },

        keys(){
            let k = []
            let current_pos = 0
            for(let i = 0; i<25; i++){
                if(this.whiteKeys.includes(i%12)){
                    
                    k.push({
                        pos: current_pos,
                        key : i,
                        class: 'white',
                    })
                    current_pos+=1
                }
                else{
                    k.push({
                        pos: current_pos,
                        key : i,
                        class: 'black',
                    })
                }
            }
            return k
        }



    },

    data(){
        return{
            whiteKeys: [0,2,4,5,7,9,11],
            active:[],
            notes: ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B',],
            transpose: 0,
            octave: 0,
            maxKey:127,
            minKey: 0,
            lowest:60,
            maxTranspose: 11,
            minTranspose: -11,
            maxOctave: 3,
            minOctave: -3

        }
    },

    methods:{
        addListener(piano_keys){
            piano_keys.forEach(i => { 
                i.oncontextmenu = e=>e.preventDefault()
                let vm = this
                if(this.$touch){
                    i.ontouchstart = (e)=>{
                        this.triggerNoteOn(e.target)
                        e.preventDefault()
                        }

                    i.ontouchend = (e)=>this.triggerNoteOff(e.target)
                    i.ontouchleave = (e)=>this.triggerNoteOff(e.target)
                    i.ontouchcancel = (e)=>setTimeout(
                        function(){
                            vm.triggerNoteOff(e.target)
                        }, 500)
                } 
                else{       

                    i.onpointerdown = (e)=>{
                        this.triggerNoteOn(e.target)
                        e.preventDefault()
                        }

                    i.onpointerup = (e)=>this.triggerNoteOff(e.target)
                    i.onpointerleave = (e)=>this.triggerNoteOff(e.target)
                    i.onpointercancel = (e)=>setTimeout(
                        function(){
                            vm.triggerNoteOff(e.target)
                        }, 500)
                }
                 
                
            });
            
        },


        triggerNoteOn(el){
            let note = el.getAttribute('note')
            if(this.active.includes(note)){
                this.triggerNoteOff(el)
            }
            this.active.push(note)
            el.classList.add('active')
            let notenum = Number(note)+this.lowest+this.transpose+this.octave_key
            this.$emit('noteOn',{note:notenum, velocity:this.$random_vel()})
        },

        triggerNoteOff(el){
            let note = el.getAttribute('note')
            if(this.active.includes(note)){
                let newList = this.active.filter(i=>i!=note)
                this.active = newList
                el.classList.remove('active')
                let notenum = Number(note)+this.lowest+this.transpose+this.octave_key
                this.$emit('noteOff',{note:notenum, velocity:0})
            }
        },

        hi_octave(){
            if(this.octave<this.maxOctave) this.octave+=1
        },
        lo_octave(){
            if(this.octave>this.minOctave) this.octave-=1
        },
        hi_trans(){
            if(this.transpose<this.maxTranspose) this.transpose+=1
        },
        lo_trans(){
            if(this.transpose>this.minTranspose) this.transpose-=1
        },
    },

    mounted(){
        this.$nextTick(
            function(){
                let keys = Array(...this.$refs.keys.children);
                this.addListener(keys)

            }
        )
    }



}
</script>

<style scope>
.piano,
.piano>*{
    box-sizing: border-box;
    position: relative;
}

.wrapper{
    position: relative;
    width: 100vw;
    height: 80vh;
    margin: 5px solid gray;
    display: flex;
}

.controls{
    height: 10vh;
    background-color: #222;
    display: flex;
    justify-content: space-evenly;
}




.controls>*{
    height: 80%;
    align-self: center;
    min-width: 10%;
    background-color: black;
    border: 2px solid #9AB8AF;
    color: grey;
    font-weight: bold;
}

.controls>div{
    display: grid;
    place-items: center;
    font-size: 0.7em;
    min-width: 15%;
    max-width: 25%;
    color: #ed3446;
}

.white{
    position: absolute;
    width: 6.666666666666%;
    left: calc(var(--x-pos) * 6.666666666666% );
    background-color: #ACB8AF;
    border: 2px solid gray;
    height: 100%;
    z-index: 0;
}

.black{
    position: absolute;
    width: 3.333333333333%;
    left: calc((var(--x-pos) * 6.666666666666%) - (3.333333333333% / 2) );
    background-color: black;
    border: 2px solid grey;
    height: 70%;
    z-index: 10;
}

.black.active, .white.active{
    background-color: #ed3446;
    filter: brightness(80%);
}



</style>