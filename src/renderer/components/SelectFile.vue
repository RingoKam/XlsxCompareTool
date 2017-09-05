<template>
  <div class="selectfile">
    <div class="fileTitle">{{filename}}</div>
    <el-button class="select-file-button" icon="upload2" v-on:click="openFile">Select File</el-button>
  </div>
</template>

<script>
const electron = window.require('electron').remote;

export default {
  name: 'select-file',
  props:
  {
    file: {
      type: Object,
      required: true
    }
  },
  computed: {
    filename: function() {
      return this.file.name ? this.getFileName(this.file.name) : "* file location *"
    }
  },
  methods: {
    openFile: function() {
      electron.dialog.showOpenDialog({
        title: "Select file",
      }, (filePath) => {
        if (filePath && filePath[0]) {
          this.$emit("uploadFile", filePath[0]);
        }
      });
    },
    getFileName: function(filename) {
      const fileNameArray = filename.split("/");
      return fileNameArray[fileNameArray.length - 1];
    }
  }
}
</script>

<style>
.selectfile {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.fileTitle {
  margin-bottom: 10px;
}

.select-file-button {
  align-self: center;
}
</style>
