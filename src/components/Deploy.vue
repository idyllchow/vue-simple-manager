<template>
  <!-- <section> -->
  <div>
    <div class="deploy">
      <div class="deploy-title">添加上线版本</div>
      <div style="height:1px;margin:0px auto;padding:0px;overflow:hidden; background-color:grey"></div>

      <el-form ref="versionInfoForm" :model="versionInfoForm" label-width="80px" :rules="versionInfoFormRules" style="margin:20px;width:60%;min-width:600px;">
        <el-form-item label="应用名称" prop="appName">
          <el-select v-model="versionInfoForm.appName" placeholder="请选择发布应用">
            <el-option label="实地通" value="sloa"></el-option>
            <el-option label="应用2" value="sltoken"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统平台" prop="osType">
          <el-select v-model="versionInfoForm.osType" placeholder="请选择发布平台">
            <el-option label="Android" value="Android"></el-option>
            <el-option label="iOS" value="iOS"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本号" prop="version">
          <el-input v-model="versionInfoForm.version" name="version" placeholder="请输入发布版本号"></el-input>
        </el-form-item>
        <el-form-item label="强制更新">
          <el-switch on-text="" off-text="" v-model="versionInfoForm.upgradeType"></el-switch>
        </el-form-item>
        <el-form-item label="A/B用户">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-autocomplete
            class="input-new-tag"
            :fetch-suggestions="querySearch"
            v-if="inputVisible"
            v-model="inputValue"
            placeholder="用户名"
            :trigger-on-focus="false"
            ref="saveTagInput"
            size="small"
            @select="handleSelect"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
            >
          </el-autocomplete>

          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 灰度用户</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-autocomplete class="inline-input" :fetch-suggestions="querySearch" placeholder="Please Input" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
        </el-form-item> -->
        <!-- <el-form-item label="上传应用">
          <el-upload
              :action="uploadActionUrl"
              :file-list="files"
              :limit="1"    
              :on-error="uploadError"
              :on-success="uploadSuccess"
              :on-remove="onRemoveTxt"
              :before-upload="onBeforeUpload">
              <el-button size="small" type="primary">点击上传</el-button>

          </el-upload>
        </el-form-item> -->
        <el-form-item label="更新提示">
          <el-input type="textarea" :rows=5 v-model="versionInfoForm.changeLog" ></el-input>
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
          <el-table-column prop="osType" label="系统平台" width="120" sortable>
          </el-table-column>
          <el-table-column prop="version" label="版本号" width="120"></el-table-column>
          <el-table-column prop="upgradeType" label="更新类型"  :formatter="formatUpgradeType" width="120"> <!-- :formatter="formatPlatform" -->
          </el-table-column>
          <el-table-column prop="createTime" label="添加时间" width="180" sortable>
          </el-table-column>
          <el-table-column prop="changeLog" label="更新日志" min-width="100" >
          </el-table-column>
      </el-table>
    </div>

    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :totalPages="totalPages" style="float:right;">
      </el-pagination>
    </el-col>
  </div>

  <!-- </section> -->
</template>

<script>
  import MainLayout from '../components/Main.vue'
  import { getHistoryDeploy, deploy } from '../api/api'
  import { allHumanResource, checkData } from '../api/humanResource'

  export default {
    components: {
      MainLayout
    },
    data() {
      return {
          versionInfoFormRules: {
              appName: [
                { required: true, message: '请选择应用名称', trigger: 'blur'}
              ],
              osType: [
                { required: true, message: '请选择系统平台', trigger: 'blur'}
              ],
              version: [
                { required: true, message: '请输入发布版本号', trigger: 'blur'}
              ]
          },
          totalPages: 0,
          pageSize: 7,
          page: 1,
          uploadActionUrl: 'uploadApp',
          files: [],
          versionInfoForm: {
            appName: '',
            osType: '',
            version: '',
            upgradeType: '3',
            grayscale:'',
            changeLog:''
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
      formatUpgradeType: function(row, column) {
        return row.upgradeType == 3 ? '强制更新' : '非强制更新';
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getHistory();
      },
      onBeforeUpload(file)
      {
        const isIMAGE = file.type === 'image/jpeg'||'image/gif'||'image/png';
        const isLt1M = file.size / 1024 / 1024 < 100;

        if (!isIMAGE) {
          this.$message.error('上传文件只能是图片格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传文件大小不能超过 100MB!');
        }
        return isIMAGE && isLt1M;
      },
      getHistory() {
        let para = {
          page: this.page
        };
        getHistoryDeploy(para).then((res) => {
          this.totalPages = res.data.totalPages;
          this.pageSize = res.data.pageSize;
          this.historyDeploys = res.data.data;
          
        
          // this.deployHistoys = res.data.deployHistoys;
        });

        // deploy(para).then((res) => {
        //         this.$message({
        //           message: '发布成功',
        //           type: 'success'
        //         });
        // });
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      querySearch: function(queryString, callback) {   
        var results = queryString ? allHumanResource.filter(this.createFilter(queryString)) : allHumanResource;
        console.log("=======query results: " + results);
        callback(results);
      },
      createFilter(queryString) {
        return (person) => {
          return (person.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
        };
      },
      handleSelect(item) {
        console.log("handle selected result value: " + item.value + "; loginId: " + item.loginId + "id: " + item.id);
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
      uploadSuccess(res, file) {

      },
      uploadError(res, file) {

      },
      onRemoveTxt(res, file) {

      },
      onBeforeUpload(res, file) {

      },
      
      onDeploy: function () {
        this.$refs.versionInfoForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认发布吗？', '提示', {}).then(() => {
              let para = Object.assign({}, this.versionInfoForm);
              para.upgradeType ? para.upgradeType = "3": para.upgradeType = "2";
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