<template>
    <div>
        <div v-for="(item, index) of fileDatas" v-bind:key="index">
            <el-card class="box-card">
                <div slot="header" class="card-header">
                    <span class="el-icon-document"> {{index+1}}</span>
                    <span class="el-icon-close" @click="removeFile(index)"></span>
                </div>
                <div class="file-selection">
                    <select-file :file="item.file1" @uploadFile="uploadFile(index, 'file1')($event)"></select-file>
                    <select-file :file="item.file2" @uploadFile="uploadFile(index, 'file2')($event)"></select-file>
                </div>
            </el-card>
        </div>
        {{testing}}
        <div class="button-group">
            <el-button icon="plus" type="text" v-on:click="addFileGroup">Add New</el-button>
            <el-button icon="search" type="primary" v-on:click="compareListFiles">Compare</el-button>
        </div>
    </div>
</template>

<script>
import SelectFile from "./SelectFile"

export default {
    data: function() {
        return {
            fileDatas: []
        }
    },
    methods: {
        addFileGroup() {
            let self = this;
            self.fileDatas.push({
                file1: {
                    name: ""
                },
                file2: {
                    name: ""
                },
                results: {}
            })
        },
        removeFile(index) {
            this.fileDatas.splice(index, 1);
        },
        uploadFile(index, fileorder) {
            let editedFile = this.fileDatas[index][fileorder];
            return function(filename) {
                editedFile.name = filename;
            }
        },
        compareListFiles() {
            this.fileDatas.forEach((file) => {
                const resultPromise = window.CompareFile(file.file1.name, file.file2.name);
                debugger;
                resultPromise.then((data) =>  {
                    file.results = data;
                })
            });
        }
    },
    computed: {
        testing: function() {
            return this.$store.state.fileDatas
        }
    },
    //life cycle hook
    created: function() {
        this.addFileGroup();
    },
    components: {
        SelectFile
    }
}
</script>

<style>
.file-selection {
    display: flex;
    justify-content: space-around;
    padding: 5px;
}

.card-header {
    font-style: italic;
    color: gray;
    margin: -9px;
    display: flex;
    justify-content: space-between;
}

.box-card {
    margin: 10px;
}

.button-group {
    display: flex;
    justify-content: center;
}

.button-group button {
    margin: 20px
}
</style>
