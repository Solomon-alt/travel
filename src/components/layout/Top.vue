<template>
  <div class="box">
    <!-- 左侧标签 -->
    <h1 class="logo">
      <a href="#">旅游网</a>
    </h1>
    <!-- 中间菜单栏 -->
    <ul>
      <li
        v-for="(item, index) in menu"
        :key="item.id"
        @click="handle(index, item)"
        :class="{ active: index === num }"
      >
        {{ item.name }}
      </li>
    </ul>
    <!-- 右侧登录注册 -->
    <div class="login">
      <div v-if="!user" @click="login">登录/注册</div>
      <div v-else style="position: relative" class="all">
        <div style="display: flex">
          <div>
            <img
              src="http://157.122.54.189:9095/assets/images/avatar.jpg"
              style="width: 36px; margin-top: 12px"
              class="images"
            />
          </div>
          <div style="margin: 0 10px" class="usename">{{ user.name }}</div>
          <div>
            <i class="el-icon-caret-bottom"></i>
          </div>
        </div>
        <div class="exit">
          <div class="triangle"></div>
          <div class="person">
            <div @click="center">个人中心</div>
            <div @click="exit">退出</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, ComputedRef, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "首页",
  props: {},
  components: {},
  setup() {
    // 跳路由 =============================================================
    const router = useRouter();
    // 状态管理 =============================================================
    const store = useStore();
    // 用户名 =============================================================
    const username = ref<string | null>("");
    //   菜单栏====================================================================
    const menu = [
      { id: 1, name: "首页", path: "/" },
      { id: 2, name: "旅游攻略", path: "strategy" },
      { id: 3, name: "酒店", path: "hotel" },
      { id: 4, name: "国内机票", path: "ticket" },
    ];
    //动态绑定class =========================
    const num = ref<number>(0);

    // 菜单栏点击事件================================================================
    const handle = (index: any, item: any): void => {
      num.value = index;
      router.push(item.path);
      sessionStorage.setItem("index", index);
    };
    //点击登录注册时跳路由=========================================
    const login = (): void => {
      router.push("login");
    };
    onMounted(() => {
      // const uname = localStorage.getItem("username");
      // console.log(uname);
      // username.value = uname
      // // if (uname === null) {
      //   store.commit("modify",uname);
      // // }
      // // else {
      // //   store.commit("modify", false);
      // // } //利用状态管理 显示右侧登录
      let index = sessionStorage.getItem("index");
      if (index !== null) {
        num.value = Number(index);
      }
    });
    store.commit("modify");
    let user = ref<any>("");
    user = computed(() => {
      return store.state.getData;
    });
    // const flags: ComputedRef<boolean> = computed(() => {
    //   return store.state.getData; //利用状态管理
    // });

    // 点击个人中心 =============================================================
    const center = (): void => {
      router.push("/person");
    };
    // 点击退出 =============================================================
    const exit = (): void => {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      store.commit("modify");
    };
    return {
      menu,
      handle,
      num,
      login,
      username,
      center,
      exit,
      user,
    };
  },
});
</script>

<style scoped lang='scss'>
.box {
  display: flex;
  height: 60px;
  .logo {
    margin: 8px 0 0 330px;
    width: 156px;
    height: 43px;
    background: url(../../assets/logo.jpg);
    background-size: cover;
    a {
      display: block;
      width: 100%;
      height: 100%;
      text-indent: -9999px;
      overflow: hidden;
    }
  }
  ul {
    display: flex;
    margin-left: 20px;
    li {
      line-height: 60px;
      padding: 0 20px;
    }
    li:hover {
      cursor: pointer;
      border-bottom: 5px solid #409eff;
      color: #7fbeff;
    }
  }
  .login {
    line-height: 60px;
    margin-left: 400px;
    div {
      cursor: pointer;
      line-height: 60px;
    }
    .usename:hover {
      color: #7fbeff;
    }
  }
}
.active {
  color: white !important;
  background-color: #409eff !important;
}
.images:hover {
  cursor: pointer;
}
.exit {
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 6;
  display: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.triangle {
  position: absolute;
  top: -15px;
  left: 25px;
  height: 0;
  width: 0;
  border-width: 15px;
  border-style: solid;
  border-color: transparent transparent white transparent;
}
.person {
  padding: 10px 20px 0;
  background-color: white;
  margin-top: 15px;
  div:hover {
    color: #7fbeff;
  }
}
.all:hover .exit {
  display: block;
}
</style>