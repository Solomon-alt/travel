<template>
<div>
    <div>{{namea}}</div>
    <div><button @click="update">改变父组件的值</button></div>
    <div>{{name}}</div>
</div>
  
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
export default defineComponent({
  name: "",
  props: {
    name:{
      type: String,
    },
  },
  components: {},
  //setup第一个参数是props,props的数据不能改
  setup(props, ctx) {
      const num =ref<number>(100)
    console.log(props.name);
    const namea = ref<any>(props.name)
    console.log(ctx);
    ctx.emit('send',num.value) // c传值给父组件

    //改变父组件的值
    const update =()=>{
        // instance!.parent.num=10             //!代表一定有
        //父组件向子组件传值加上v-model
        ctx.emit('update:name','tom')  //200改变后的值
    }
    return {
        props,
        namea,
        num,
        update,
    };
  },
});
</script>



<style lang="scss" scoped>
</style>