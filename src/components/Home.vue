<template>
  <div>
  <el-row class="container">
    <el-col :span="24" class="header">
      <a class="logo" href="/" style="font-size:21px font-weight: bold">
        <img src="../assets/seedland-32.png">
      <span>应用管理平台</span>
      </a>
      <el-col :span="3"  class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><img :src="this.userAvatar"/> {{userName}} </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
      
    <!-- <router-view></router-view> -->

  </el-row>

  <div style="margin-top:55px" >
    <el-tabs v-model="activeName" type="border-card" >
      <el-tab-pane label="应用配置" name="first">
        <AutoConfig/>
      </el-tab-pane>
      <el-tab-pane label="应用发布" name="second">
        <Deploy/>
      </el-tab-pane>
      <el-tab-pane label="统计数据" name="third">
        <Stats/>
      </el-tab-pane>
      <el-tab-pane label="关于" name="fouth">   
        <About/>   
      </el-tab-pane>
    </el-tabs>
    </div>

  </div>
</template>

<script>
  import AutoConfig from './AutoConfig.vue'
  import Deploy from './Deploy.vue'
  import Stats from './Stats.vue'
  import About from './About.vue'

  export default {
    components: {
      AutoConfig,
      Deploy,
      Stats,
      About
    },
    data() {
      return {
        sysName: '应用管理平台',
        collapsed: false,
        userName: '',
        userAvatar: '',
        activeName: 'second',
        form: {

        }
      }
    },
    methods: {
      logout: function () {
        var _this = this;
        this.$confirm('确认退出吗？', '提示', {

        }).then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch(() => {

        });
      }
    },
    mounted() {
      var user = sessionStorage.getItem('user');
      console.log(user);
      if (user) {
        console.log("========user info======" + user)
        user = JSON.parse(user);
        this.userName = user.name || '';
        this.userAvatar = user.avatar || '';
      }
    }
  }
</script> 

<style >

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
  .userinfo-inner {
          cursor: pointer;
          color:#fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
  }
}
.userinfo img{
  vertical-align: middle;
  margin: 10px 0px 10px 10px;
  border-radius: 20px;
  width: 40px;
  height: 40px;
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
