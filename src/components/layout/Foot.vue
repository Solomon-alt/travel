<template>
  <div class="box">
    <div class="w">
      <dl>
        <dt>闲云旅游旅游网</dt>
        <dd>上亿旅行者共同打造的"旅行神器"</dd>
        <dd><span>60,000</span>多个全球旅游目的地</dd>
        <dd><span>600,000</span>个细分目的地新玩法</dd>
        <dd><span>760,000,000</span>次攻略下载</dd>
        <dd><span>38,000</span>家旅游产品供应商</dd>
      </dl>
      <dl>
        <dt>关于我们</dt>
        <dd>隐私政策 商标声明</dd>
        <dd>服务协议 游记协议</dd>
        <dd>商城平台服务协议</dd>
        <dd>网络信息侵权通知指引</dd>
        <dd>闲云旅游旅游网服务监督员</dd>
        <dd>网站地图加入闲云旅游</dd>
      </dl>
      <dl>
        <dt>旅行服务</dt>
        <dd>旅游攻略 酒店预订</dd>
        <dd>旅游特价 国际租车</dd>
        <dd>旅游问答 旅游保险</dd>
        <dd>旅游指南 订火车票</dd>
        <dd>旅游资讯 APP下载</dd>
      </dl>
      <div>
        <div class="img"></div>
        <div class="attention">关注我们</div>
      </div>
    </div>
    <div class="foot">京ICP备08001421号 京公网安备110108007702 Copyright © 2016-2019 博学谷 All Rights Reserved</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup() {
    return {};
  },
});
</script>

<style scoped lang='scss'>
.box {
  width: 100%;
  color: white;
  background-color: #333;
  .w {
    padding: 40px 120px 40px 50px;
    border-bottom: 1px solid white;
    display: flex;
    dl {
      margin-right: 120px;
      dt {
        font-size: 18px;
        height: 40px;
      }
      dd {
        font-size: 14px;
        height: 30px;
        span {
          color: #ff8c27;
        }
      }
    }
    .img {
      width: 175px;
      height: 175px;
     cursor: pointer;
      background: url(http://157.122.54.189:9093/images/1556522965.png);
      background-size: cover;
    }
    .attention{
        text-align: center;
    }
  }
}
.foot{
    text-align: center;
    line-height: 145px;
}
</style>