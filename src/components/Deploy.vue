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
          <!-- <el-autocomplete v-model="deployForm.targetUser" name="oauser" :fetch-suggestions="querySearchAsync"  @select="handleSelect" placeholder="请输入灰度用户名"></el-autocomplete> -->
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
            >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 灰度用户</el-button>
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
      <el-table :data="historyDeploys" highlight-current-row v-loading="loading" style="width: 100%;">
          <el-table-column type="index" width="80">
          </el-table-column>
          <el-table-column prop="appName" label="应用名称" width="120" sortable>
          </el-table-column>
          <el-table-column prop="platform" label="系统平台" width="120" sortable>
          </el-table-column>
          <el-table-column prop="version" label="版本号" width="120"></el-table-column>
          <el-table-column prop="upgradeType" label="更新类型"  width="120"> <!-- :formatter="formatPlatform" -->
          </el-table-column>
          <el-table-column prop="dateTime" label="添加时间" width="180" sortable>
          </el-table-column>
          <el-table-column prop="changelog" label="更新日志" min-width="100" >
          </el-table-column>
      </el-table>
    </div>

    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="7" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
  </div>

  <!-- </section> -->
</template>

<script>
  import MainLayout from '../components/Main.vue'
  import { getHistoryDeploy, queryHr, deploy } from '../api/api'

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
          total: 0,
          page: 1,
          deployForm: {
            appName: '',
            platform: '',
            version: '',
            upgradeType: false,
            targetUser:'',
            changelog:'',
        },
          loading: false,
          historyDeploys: [],
          dynamicTags: [],
          inputVisible: false,
          inputValue: ''
      }
    },
    methods: {
      //更新类型转换
      formatPlatform: function(row, column) {
        return row.platform == 1 ? '强制更新' : '非强制更新';
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getHistory();
      },
      getHistory() {
        let para = {
          page: this.page
        };
        getHistoryDeploy(para).then((res) => {
          this.historyDeploys = res.data.historyDeploys;
          console.log("=========getHistoryDeploy result========" + this.page);
        
          // this.deployHistoys = res.data.deployHistoys;
        });

        // deploy(para).then((res) => {
        //         this.$message({
        //           message: '发布成功',
        //           type: 'success'
        //         });
        // });
      },
      querySearchAsync: function(queryString, callback) {

      },
      handleSelect: function (item) {
            console.log(item);
            this.isShowList = true;
      },

      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
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
      }
    },
    mounted() {
        this.getHistory();
    }
  }
</script>

<style>
.deploy {
  background-color: #fff;
  height: 700px;
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
  
  margin: 10px;
  position: relative;
  z-index: 100;
  border: 1px solid grey;
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>