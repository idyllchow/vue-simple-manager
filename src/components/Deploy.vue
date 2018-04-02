<template>
  <!-- <section> -->
  <div>
    <div class="deploy">
      <div class="deploy-title">添加上线版本</div>
      <div style="height:1px;margin:0px auto;padding:0px;overflow:hidden; background-color:grey"></div>

      <el-form ref="deployForm" :model="deployForm" label-width="80px" :rules="deployFormRules" style="margin:20px;width:60%;min-width:600px;">
        <el-form-item label="应用名称" prop="appName">
          <el-select v-model="deployForm.appName" placeholder="请选择发布应用">
            <el-option label="实地通" value="sloa"></el-option>
            <el-option label="应用2" value="sltoken"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统平台" prop="platform">
          <el-select v-model="deployForm.platform" placeholder="请选择发布平台">
            <el-option label="Android" value="Android"></el-option>
            <el-option label="iOS" value="iOS"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本号" prop="version">
          <el-input v-model="deployForm.version" name="version" placeholder="请输入发布版本号"></el-input>
        </el-form-item>
        <el-form-item label="强制更新">
          <el-switch on-text="" off-text="" v-model="deployForm.upgradeType"></el-switch>
        </el-form-item>
        <el-form-item label="A/B用户">
          <el-autocomplete v-model="deployForm.targetUser" name="oauser" :fetch-suggestions="querySearchAsync"  @select="handleSelect" placeholder="请输入灰度用户名"></el-autocomplete>
        </el-form-item>
        <el-form-item label="更新提示">
          <el-input type="textarea" :rows=5 v-model="deployForm.changelog" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onDeploy">立即发布</el-button>
        </el-form-item>

      </el-form>
    </div>

    <p style="margin: 20px 0px -5px 30px">历史版本</p>
    <div class="deploy-history">
      <el-table :data="infos" highlight-current-row v-loading="loading" style="width: 100%;">
          <el-table-column type="index" width="80">
          </el-table-column>
          <el-table-column prop="appName" label="应用名称" width="120" sortable>
          </el-table-column>
          <el-table-column prop="platform" label="系统平台" width="120" :formatter="formatPlatform" sortable>
          </el-table-column>
          <el-table-column prop="version" label="版本号" width="120"></el-table-column>
          <el-table-column prop="upgradeType" label="更新类型" width="120">
          </el-table-column>
          <el-table-column prop="dateTime" label="添加时间" width="180" sortable>
          </el-table-column>
          <el-table-column prop="appName" label="更新日志" min-width="100" >
          </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- </section> -->
</template>

<script>
  import MainLayout from '../components/Main.vue'
  import { getHistoryList, queryHr, deploy } from '../api/api'

  export default {
    components: {
      MainLayout
    },
    data() {
      return {
          deployFormRules: {
              appName: [
                { required: true, message: '请选择应用名称', trigger: 'blur'}
              ],
              platform: [
                { required: true, message: '请选择系统平台', trigger: 'blur'}
              ],
              version: [
                { required: true, message: '请输入发布版本号', trigger: 'blur'}
              ]
          },
          deployForm: {
          appName: '',
          platform: '',
          version: '',
          upgradeType: false,
          targetUser:'',
          changelog:'',
        },
          loading: false,
          infos: []
      }
    },
    methods: {
      //更新类型转换
      formatPlatform: function(row, column) {
        return row.platform == 1 ? '强制更新' : '非强制更新';
      },
      getHistoryList: function () {

      },
      querySearchAsync: function(queryString, callback) {

      },
      handleSelect: function (item) {
            console.log(item);
            this.isShowList = true;
      },
      onDeploy: function () {
        this.$refs.deployForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认发布吗？', '提示', {}).then(() => {
              let para = Object.assign({}, this.deployForm);
              deploy(para).then((res) => {
                this.$message({
                  message: '发布成功',
                  type: 'success'
                });
              });
            });
          }
        });
      },
      mounted:function(){
        this.getHistoryList();
      }
    }
  }
</script>

<style>
.deploy {
  background-color: #fff;
  height: 600px;
  margin: 10px;
  position: relative;
  z-index: 100;
  border: 1px solid grey;
}
.deploy-title {
    background-color: #D3D3D3;
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-weight: bold;
  }
.deploy-history {
  background-color: #fff;
  height: 400px;
  margin: 10px;
  position: relative;
  z-index: 100;
  border: 1px solid grey;
}
</style>