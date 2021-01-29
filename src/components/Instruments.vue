<template>
  <instument-base>
      <div class="wrapper" ref="ins">
          <figure>         
              <img src="../assets/maskable/piano.svg" alt="piano" srcset="" class="m">    
          </figure>
          <figure>       
              <img src="../assets/maskable/launchpad.svg" alt="launchpad" srcset=""  class="m">
          </figure>
          <figure>
              <img src="../assets/maskable/mixer.svg" alt="mixer" srcset="">
          </figure>
          <figure>
              <img src="../assets/maskable/drum.svg" alt="drum" srcset="">
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
    height: 38%;
    width: 45%;
    margin: 2.5%;
    border-radius: 20%;;
}

figure>img{
    width: 100%;
    height: 100%;
    filter: invert(.8);
}



img.m{

    width: 100%;
    height: 90%;
    padding-top: 5%;
}

figure>figcaption{
    font-size: 1em;
    font-weight: bolder;
    color: #9AB8AF;
}

</style>