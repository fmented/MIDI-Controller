<template>
<div>
    <div class="controls">
          <div>
              <label for="static">Static</label>
                <input type="checkbox" id="static" v-model="staticvel">
          </div>
          <div v-if="staticvel">
                <label for="vel">Velocity</label>
                <input type="range" id="vel" min="0" max="127" step="1" v-model="vel">
          </div>
          <div>
              <label for="reverse">Reverse</label>
                <input type="checkbox" id="reverse" v-model="reverse">
          </div>
      </div>
    <div :class="`section ${reverse?'reverse':''}`" :style="`--w:${size}px; --ratio:${ratio}`">
        <div :class="`drum`" ref="drum">
            <div :class="`cymbal hihat close image`" kit="Hihat Close" map="42"></div>
            <div :class="`cymbal hihat open image`" kit="Hihat Open" map="46"></div>
            <div :class="`cymbal crash left image`" kit="Crash" map="49"></div>
            <div :class="`cymbal crash right image`" kit="Ride" map="51"></div>
            <div :class="`tom floor image`" kit="Tom Floor" map="41"></div>
            <div :class="`kick left image`" kit="Kick Left" map="35"></div>
            <div :class="`kick right image`" kit="Kick Right" map="36"></div>
            <div :class="`tom lo image`" kit="Tom Low" map="45"></div>
            <div :class="`tom hi image`" kit="Tom High" map="50"></div>
            <div :class="`tom med image`" kit="Tom Med" map="48"></div>
            <div :class="`cymbal crash mid-left down image`" kit="China" map="52">        </div>
            <div :class="`cymbal crash mid-right down image`" kit="Crash" map="57"></div>
            <div :class="`snare image`" kit="Snare" map="38"></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props:{
        size:{
            type: Number,
            default: window.innerWidth
        },


        listen:{
            type: Boolean,
            default: true
        }

    },

    computed: {

        ratio(){
            return window.innerWidth/window.innerHeight
        },

    },

    watch:{

    },

    methods:{
            addListener(kits){
            kits.forEach(i => {

                if(this.$touch){
                i.ontouchstart = this.noteOn
                i.ontouchend = this.noteOff
                i.ontouchleave = this.noteOff
                }
                else{
                i.onpointerdown = this.noteOn
                i.onpointerup = this.noteOff
                i.onpointerleave = this.noteOff
                }
            });
            
        },

        removeListener(kits){
            kits.forEach(i => {
   

                if(this.$touch){
                    i.ontouchstart = undefined
                    i.ontouchend = undefined
                    i.ontouchleave = undefined
                } 
                else{
                    i.onpointerdown = undefined
                    i.onpointerup = undefined
                    i.onpointerleave = undefined
                }  
                
                
            });

        },

        noteOn(e){
            let el = e.target
            let map = el.getAttribute('map')
            if(this.active.includes(map)){
                return
            }
            this.active.push(map)
            el.classList.add('animation')
            let ev = {
                note: map,
                velocity: this.staticvel ? this.vel: this.$random_vel(),
            }
            this.$emit('noteOn', ev)
        },

        noteOff(e){
            let el = e.target
            let map = el.getAttribute('map')
            if(this.active.includes(map)){
                el.classList.remove('animation')
                let newList = this.active.filter(i=>i!=map)
                this.active = newList
                let ev = {
                    note: map,
                    velocity: 0,
                }
                this.$emit('noteOff', ev) 
            }
        }




    },

    data(){
        return{
            active: [],
            staticvel: false,
            vel: 80,
            reverse:false
        }
    },

    mounted(){
        this.$nextTick(
            function(){
                let kits = Array(...this.$refs.drum.children);
                if(this.listen) this.addListener(kits)
            }
        )
    }

}
</script>

<style scoped>

/* base */
    *{
        box-sizing: border-box;
    }

.reverse{
    transform: scaleX(-1);
}

    .section{
        position: relative;
        display: grid;
        overflow: hidden;
        width: 100vw;
        height: 80vh;
    }


    
    .drum{
        position: relative;

    }


    .cymbal{
        position: absolute;
        background-color: goldenrod;
        border-radius: 50%;
        border: 2px solid rgba(0, 0, 0, 0.4);
        transform-origin: 50% 50%;
        z-index: 5;
    }
    .hihat{
        width: 20%;
        height: calc(20% * var(--ratio));
    }
    .crash{
        width: 30%;
        height: calc(30% * var(--ratio));
    }
    .hihat.close{
        bottom: -5%;
        left: -5%;
        z-index: 1;
    }       
    .drum>div, .drum{
        display: grid;
        place-items: center;
        white-space: nowrap;
    }
    .tom{
        position: absolute;
        background-color: burlywood;
        border-radius: 50%;
        border: 5px solid silver;
        transform-origin: 50% 50%;
    }   
    .kick{
        position: absolute;
        background-color: grey;
        border-radius: 50%;
        border: 5px solid rgba(0, 0, 0, 0.5);
        height: calc(25% * var(--ratio));
        width: 25%;
        transform-origin: 50% 50%;
    }


/* background */
    .image.hihat::after{
        border-radius: 50%;
        content: '';
        height: 100%;
        width: 100%;
        background-color: transparent;
        background-image: url('../assets/img/x-hat-o.webp');
        background-repeat: no-repeat;
        background-size: 110% 110%;
        background-position-x: center;
        background-position-y: 15%;
    }
    .image.crash:not(.right):not(.mid-left)::after{
        border-radius: 50%;
        content: '';
        height: 100%;
        width: 100%;
        background-color: transparent;
        background-image: url('../assets/img/x-crash.webp');
        background-repeat: no-repeat;
        background-size: 120% 120%;
        background-position-x: center;
        background-position-y: 25%;
    }
    .image.crash:not(.left):not(.mid-right)::after{
        border-radius: 50%;
        content: '';
        height: 100%;
        width: 100%;
        background-color: transparent;
        background-image: url('../assets/img/x-ride.webp');
        background-repeat: no-repeat;
        background-size: 110% 110%;
        background-position-x: center;
        background-position-y: 15%;
    }
    /* .image.crash.mid-left::after{
        transform: rotate(-90deg);
    }
    .image.crash.mid-right::after{
        transform: rotate(20deg);
    } */
    .image.kick::after{
        border-radius: 50%;
        content: '';
        height: 100%;
        width: 100%;
        background-color: transparent;
        background-image: url('../assets/img/x-kick.webp');
        background-repeat: no-repeat;
        background-size: 140% 170%;
        background-position-x: center;
        background-position-y: 40%;
    }
    .image.snare::after{
        border-radius: 50%;
        content: '';
        height: 100%;
        width: 100%;
        background-color: transparent;
        background-image: url('../assets/img/x-snare.webp');
        background-repeat: no-repeat;
        background-size: 160% 170%;
        background-position-x: center;
        background-position-y: 30%;
        transform: rotate(180deg);
    }
    .image.tom::after{
        border-radius: 50%;
        content: '';
        height: 100%;
        width: 100%;
        background-color: transparent;
        background-image: url('../assets/img/x-tom.webp');
        background-repeat: no-repeat;
        background-size: 140% 170%;
        background-position-x: center;
        background-position-y: 15%;
    }
    .drum>.image::after{
        filter: brightness(70%);
    }


/* position */

    .hihat.open{
        left: -2%;
        bottom: 22%;
        z-index: 2;
    }
    .crash.left{
        top: -10%;
        left: -10%;
        z-index: 3;
    }
    .crash.right{
        top: -10%;
        right: -5%;
        z-index: 3;
    }
    .crash.mid-left{
        top: -35%;
        left: 20%;
        z-index: 2;
    }
    .crash.mid-right{
        top: -35%;
        right: 20%;
        z-index: 4;
    }   
    .tom.floor{
        height: calc(25% * var(--ratio));
        width: 25%;

        bottom: 0%;
        right: -5%;
        z-index: 2;
    }
    .tom.lo{
        height: calc(20% * var(--ratio));
        width: 20%;
        top: 25%;
        right: 20%;
        z-index: 2;
    }
    .tom.hi{
        height: calc(20% * var(--ratio));
        width: 20%;
        top: 25%;
        left: 20%;
        z-index: 2;
    }
    .tom.med{
        height: calc(20% * var(--ratio));
        width: 20%;
        top: 10%;
        z-index: 2;
    }
    .kick.left{
        bottom: -10%;
        left: 20%;
    }
    .kick.right{
        bottom: -10%;
        right: 20%;
    }
    .snare{
        position: absolute;
        background-color: white;
        border-radius: 50%;
        border: 5px solid #de9922;
        height: calc(25% * var(--ratio));
        width: 25%;
        top: 40%;

    }

/* text */

    div.kit::before{
        z-index: 100;
        content: attr(kit);
        position: absolute;
        font-weight: bolder;
        color: turquoise;
        filter: brightness(200%);
    }
    div.map::before{
        z-index: 100;
        content: attr(map);
        position: absolute;
        font-weight: bolder;
        color: turquoise;
        filter: brightness(200%);
    }
    .down::before{
        z-index: 100;
        bottom: 25%;
    }
    .hihat:not(.open)::before{
        right: 10%;
        /* white-space: wrap; */
    }
    .cymbal.left::before,
    .cymbal.right::before{
        bottom: 25%;
    }



/* animation */
    .animation{
        filter: brightness(120%);
        transform: scale(1.2);
    }

    @keyframes hat{
        0%{
            transform: scale(0.96);
        }
        100%{
            transform: scale(1);
        }
    }
    @keyframes therest{
        0%{
            transform: scale(1.02);
            filter: brightness(80%);
        }
        100%{
            transform: scale(1);
            filter: brightness(100%);
        }
    }
    @keyframes crash2{
        0%{
            transform: rotate3d(-1,1,0, 30deg);
        }
        50%{
            transform: rotate3d(-1,1,0,-20deg );
        }
        100%{
            transform: rotate3d(-1,1,0, 10deg);
        }
    }
    @keyframes flip-ride{
        0%{
            transform:rotate3d(1,1,0,30deg);
        }
        50%{
            transform:rotate3d(1,1,0,-20deg);
        }
        100%{
            transform: rotate3d(1,1,0,5deg);
        }


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
    border: 2px solid white;
    color: grey;
    font-weight: bold;
    height: 80%;
}



</style>