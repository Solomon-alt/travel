<template>
 <div>
     <div><top></top></div>
     <div><router-view></router-view></div>
     <div><foot></foot></div>
 </div>
</template>

<script>
import {defineComponent} from 'vue'
import top from '@/components/layout/Top'
import foot from '@/components/layout/Foot'
 export default defineComponent({
   name: '',
   props: {
   },
   components: {
       top,
       foot,
   },
   setup() {
   return {}
   }
 })
</script>

<style scoped lang='scss'>

</style>