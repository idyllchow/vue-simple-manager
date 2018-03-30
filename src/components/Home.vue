<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <a class="logo" href="/">
        <img src="../assets/seedland-32.png">
      <span>应用发布平台</span>
      </a>
      <a class="userinfo">
        <img src="../assets/img_head.png">
        <span>管理员</span>
      </a>
    </el-col>
    <!-- <slot></slot> -->
    <div class="tab">
      <router-link to="/"> <button class="tablinks" >主页</button></router-link>
      <router-link to="/deploy"> <button class="tablinks" >应用发布</button></router-link>
      <router-link to="/about"> <button class="tablinks" >关于</button></router-link>
    </div>
    <!-- Tab content -->
    <!-- <div id="London" class="tabcontent">
      <h3>London</h3>
      <p>London is the capital city of England.</p>
    </div>

    <div id="Paris" class="tabcontent">
      <h3>Paris</h3>
      <p>Paris is the capital of France.</p>
    </div>

    <div id="Tokyo" class="tabcontent">
      <h3>Tokyo</h3>
      <p>Tokyo is the capital of Japan.</p>
    </div> -->
    <router-view></router-view>

  </el-row>
</template>

<script>
  // import VLink from '../components/VLink.vue'

  // export default {
  //   components: {
  //     VLink
  //   }
  // }
</script> 

<style>
body {
    margin: 0px;
    padding: 0px;
    /* background: url(assets/bg1.jpg) center !important; */
    /* background: url('images/login_bg.png') no-repeat center top; */
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  margin: 0px;
}
/*.userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
}*/
.header {
  /*background-color: #D3D3D3;*/
  width: 100%;
  height: 55px;
  border-style: 5px solid red;
  position: relative;
  z-index: 100;
}
.logo{
  font-size: 1.5em;
  line-height: 55px;
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: 300;
  text-decoration: none;
}
.logo img{
  vertical-align: middle;
  margin-left: 36px;
  margin-right: 16px;
  width: 40px;
  height: 40px;
}
.userinfo {
  font-size: 0.8em;
  line-height: 55px;
  margin-right: 56px;
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: 200;
  float: right;
  text-decoration: none;
}
.userinfo img{
  vertical-align: middle;
  margin-top: -8px;
  margin-right: 6px;
  width: 35px;
  height: 35px;
}
#wapper {
  position: relative;
}
/* Style the tab */
.tab {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
}

/* Style the buttons that are used to open the tab content */
.tab button {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
}

/* Change background color of buttons on hover */
.tab button:hover {
    background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
    background-color: blue;
}

.content-container {
        flex:1;
        overflow-y: scroll;
        padding: 20px;
}

.breadcrumb-container {
          
}
.content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
}

/* Style the tab content */
/*.tabcontent {
    display: none;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-top: none;
}*/
</style>
