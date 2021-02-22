<template>
  <div class="background">
    <div class="box-card">
      <div class="title">
        <div @click="login" :class="{ active: num === 1 }">登录</div>
        <div @click="registered" :class="{ active: num === 2 }">注册</div>
      </div>

      <div v-if="num === 1">
        <!-- 登录 -->
        <div class="container">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="form"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                v-model.trim="ruleForm.username"
                placeholder="用户名/手机"
              ></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model.trim="ruleForm.password"
                placeholder="密码"
                type="password"
                @keyup.enter="login1"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <span class="forget" @click="forget">忘记密码</span>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="login1" style="width: 410px"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 注册 -->
      <div v-else>
        <div class="container">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="forma"
            class="demo-ruleForm"
          >
            <el-form-item prop="mobile">
              <el-input
                v-model.trim="ruleForm.mobile"
                placeholder="用户名手机"
              ></el-input>
            </el-form-item>

            <el-form-item prop="verify">
              <div style="display: flex">
                <div style="flex: 70%">
                  <el-input
                    v-model.trim="ruleForm.verify"
                    placeholder="验证码"
                  ></el-input>
                </div>
                <div style="flex: 30%">
                  <el-button v-if="flag === true" @click="send" maxlength="6"
                    >发送验证码</el-button
                  >
                  <el-button v-else @click="send" disabled
                    >{{ time }}s后重新获得</el-button
                  >
                </div>
              </div>
            </el-form-item>

            <el-form-item prop="nickname">
              <el-input
                v-model.trim="ruleForm.nickname"
                placeholder="请输入昵称"
              ></el-input>
            </el-form-item>

            <el-form-item prop="password1">
              <el-input
                v-model.trim="ruleForm.password1"
                placeholder="密码"
                type="password"
              ></el-input>
            </el-form-item>

            <el-form-item prop="password2">
              <el-input
                v-model.trim="ruleForm.password2"
                placeholder="确认密码"
                type="password"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="registered1"
                style="width: 410px"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Rules } from "../../../types/index";
import { ElMessage } from "element-plus";
import api from "@/http/api";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

// 登录 =============================================================
export interface Model {
  username: string;
  password: string;
  mobile: string;
  verify: string;
  nickname: string;
  password1: string;
  password2: string;
}

export interface Rule {
  username: Rules[];
  password: Rules[];
  mobile: Rules[];
  verify: Rules[];
  nickname: Rules[];
  password1: Rules[];
  password2: Rules[];
}

export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup() {
    const form = ref<any>(null);
    const forma = ref<any>(null);
    const num = ref<number>(1);
    const username = ref<string>("");
    const router = useRouter();
    const flag = ref<boolean>(true);
    const time = ref<number>(60);

    const ruleForm = ref<Model>({
      username: "",
      password: "",
      mobile: "",
      verify: "",
      nickname: "",
      password1: "",
      password2: "",
    });
    const validatePass = (value: any, callback: any) => {
      if (value === "") {
        callback(Error("用户名不能为空"));
      } else {
        if (
          /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(
            value
          )
        ) {
          callback(Error("用户名手机格式错误"));
        }
      }
      callback();
    };
    const rules = ref<Rule>({
      username: [
        {
          trigger: "blur",
          required: true,
          message: "用户名不能为空",
        },
      ],
      password: [
        {
          required: true,
          message: "密码不能为空",
          trigger: "blur",
        },
      ],
      mobile: [
        {
          required: true,
          message: "手机号不能为空",
          trigger: "blur",
        },
      ],
      verify: [
        {
          required: true,
          message: "验证码不能为空",
          trigger: "blur",
        },
      ],
      nickname: [
        {
          required: true,
          message: "请输入昵称",
          trigger: "blur",
        },
      ],
      password1: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
      ],
      password2: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
      ],
    });
    // 记住密码 =============================================================
    const forget = () => {
      ElMessage.warning("后续实现");
    };
    let store = useStore();
    // 点击登录=============================================================
    const login1 = (): void => {
      form.value.validate((valid: boolean) => {
        if (valid) {
          api
            .login({
              username: ruleForm.value.username,
              password: ruleForm.value.password,
            })
            .then((res: any) => {
              if (res.token.length > 0) {
                localStorage.setItem(
                  "username",
                  JSON.stringify({ name: res.user.username })
                );
                localStorage.setItem("token", res.token);
                store.commit("modify");
                router.push("/");
                ElMessage.success("登陆成功");
              }
            });
        } else {
          ElMessage.error("表单验证有误");
        }
      });
    };

    // 点击注册 =============================================================
    const registered1 = (): void => {
      forma.value.validate((valid: boolean) => {
        if (valid) {
          api
            .register({
              username: ruleForm.value.mobile,
              nickname: ruleForm.value.nickname,
              captcha: ruleForm.value.verify,
              password: ruleForm.value.password1,
            })
            .then((res: any) => {
              if (res.token.length > 0) {
                localStorage.setItem(
                  "username",
                  JSON.stringify({ name: res.user.nickname })
                );
                localStorage.setItem("token", res.token);
                 store.commit("modify");
                router.push("/");
                ElMessage.success("注册成功");
              }
            })
            .catch((err: any) => {
              console.log(err);
            });
        } else {
          ElMessage.error("表单验证有误");
        }
      });
    };

    // 点击上方注册按钮====================================
    const registered = () => {
      num.value = 2;
      form.value.resetFields(); //重置登录表单值
    };

    // 点击上方登录====================================
    const login = (): void => {
      num.value = 1;
      forma.value.resetFields(); //重置注册表单值
    };
    // 点击发送验证码 =============================================================
    const send = (): void => {
      if (ruleForm.value.mobile.length === 0) {
        ElMessage.warning("请输入手机号");
      } else {
        if (!/^1[34578]\d{9}$/.test(ruleForm.value.mobile)) {
          ElMessage.warning("手机号输入有误请重新输入");
        } else {
          flag.value = false;
          const timer = setInterval(() => {
            time.value--;
            if (time.value === 0) {
              clearInterval(timer);
              flag.value = true;
            }
          }, 1000);
          api
            .captchas({ tel: ruleForm.value.mobile })
            .then((res: any) => {
              console.log(res);
              flag.value = true;
              ElMessage.success("模拟手机验证码000000");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    };
    return {
      username,
      num,
      login,
      registered,
      ruleForm,
      rules,
      login1,
      form,
      forget,
      registered1,
      forma,
      send,
      flag,
      time,
    };
  },
});
</script>

<style scoped lang='scss'>
.background {
  position: relative;
  height: 100vh;
  width: 100%;
  background: url(../../../assets/loginBackground.png);
  .box-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    .title {
      display: flex;
      div {
        flex: 50%;
        text-align: center;
        background: #eee;
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        cursor: pointer;
      }
    }
    .container {
      background: #fff;
      padding: 20px;
    }
  }
}
.forget {
  float: right;
  color: #409eff;
  font-size: 12px;
  cursor: pointer;
}
.active {
  border-top: 2px solid #ffa500 !important;
  color: #ffa500 !important;
  font-weight: 700 !important;
  background: #fff !important;
}
</style>