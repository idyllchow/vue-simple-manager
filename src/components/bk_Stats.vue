<template>
  <div class="stats">
    <!-- action="http://10.3.31.34:8080/pic/upload" -->
    <el-upload
  class="avatar-uploader"
  :action="uploadUrl"
  name="uploadFile"
  :show-file-list="false"
  :on-error="onError"
  :on-success="onSuccess"
  :before-upload="beforeUpload">
  <img v-if="uploadFile" :src="uploadFile" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </div>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
  export default {
    data() {
      return {      
        uploadUrl: 'http://192.168.64.175:8080/test/pic/upload',
        // uploadUrl: 'http://10.3.31.34:8080/pic/upload',
        imageUrl: ''
      };
    },
    methods: {
      onSuccess(res, file) {
        alert('上传成功！' + res.url)
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg'||'image/gif'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      onError(response, file) {
        console.log('上传失败，请重试！' + this.uploadUrl)
      }
    }
  }
</script>

<style>
  .stats {
  background-color: #fff;
  height: 700px;
  margin: 10px;
  position: relative;
  z-index: 100;
  border: 1px solid grey;
}
</style>