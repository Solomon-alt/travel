<template>
  <div>
    <div class="about" ref="dv">
      {{ num }}
    </div>
    <div>
      <child ref="child" v-model:name="name" @send="send"></child>
    </div>

    <!-- 登录注册 -->
    <div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script lang="ts">
import Child from "@/components/Child.vue";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Rules } from "../types/index";
import { ElMessage } from "element-plus";

//模拟登陆注册
export interface Model {
  username: string;
  password: string;
}
export interface Rule {
  username: Rules[];
  password: Rules[];
}

export default defineComponent({
  components: { Child },
  name: "about",
  setup() {
    const route = useRoute(); // this.$route
    const num = ref<number>(0);
    const name = ref<string>("jack"); //传值给子组件
    const child = ref<any>(null); // 获取整个组件
    const dv = ref<HTMLDivElement | null>(null); //获取单个dom元素
    const form = ref<any>(null);

    onMounted(() => {
      num.value = Number(route.query.num);
      console.log(child.value); // 打印结果为Proxy对象，所有的都在对象里面的target里面
      console.log(dv);
    }); // 路由传参

    //子组件传过来的值
    const send = (val: number) => {
      console.log(val);
    };

    //模拟登陆注册
    const ruleForm = ref<Model>({
      username: "",
      password: "",
    });
    const rules = ref<Rule>({
      username: [
        {
          required: true,
          message: "用户名不能为空",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "密码不能为空",
          trigger: "blur",
        },
      ],
    });
    const login = (): void => {
      form.value.validate((valid: boolean) => {
        if (valid) {
          ElMessage.success("登陆成功");
        } else {
          ElMessage.error("表单验证有误");
        }
      });
    };
    return {
      num,
      name,
      send,
      child,
      dv,
      ruleForm,
      rules,
      login,
      form,
    };
  },
});
</script>