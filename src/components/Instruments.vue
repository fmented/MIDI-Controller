<template>
  <instument-base>
      <div class="wrapper" ref="ins">
          <figure>         
              <img src="../assets/maskable/piano.svg" alt="piano" srcset="" class="m">    
              <figcaption>Piano</figcaption>   
          </figure>
          <figure>       
              <img src="../assets/maskable/launchpad.svg" alt="launchpad" srcset=""  class="m">
              <figcaption>Launchpad</figcaption>
          </figure>
          <figure>
              <img src="../assets/maskable/mixer.svg" alt="mixer" srcset="">
              <figcaption>Mixer</figcaption>
          </figure>
          <figure>
              <img src="../assets/maskable/drum.svg" alt="drum" srcset="">
              <figcaption>Drum</figcaption>
          </figure>
      </div>

      
  </instument-base>
</template>

<script>
import InstumentBase from './InstumentBase.vue'
export default {
  components: { InstumentBase },
  mounted(){
      this.$nextTick(function(){
          let x = Array(...this.$refs.ins.children)
          x.forEach(e=>{
              let img = Array(...e.children).filter(i=>i.localName == 'img')[0]
              let route = img.getAttribute('alt')
              img.onclick = ()=>this.$router.push('play/'+route)
          })
      })
  }


}
</script>

<style scoped>
.wrapper{
    height: 90vh;
    position: relative;
    display: flex;
    flex-wrap: wrap;
}

figure{
    height: 40%;
    width: 40%;
    margin: 2.5%
}

figure>img{
    width: 70%;
    height: 70%;
    filter: invert(.7);
}

img.m{
    width: 60%;
    height: 60%;
}

img.p{
    width: 50%;
    height: 50%;
    margin: 2.5%;
}

figure>figcaption{
    font-size: 1em;
    font-weight: bolder;
    color: #aaa;
}

</style>