<template>
    <div>
        <div v-for="(item, index) of fileDatas" v-bind:key="index">
            <div v-bind:class="resultStatusClass(item)">
                <el-card class="box-card" v-loading="loading && ready(item)">
                    <div slot="header" class="card-header">
                        <span class="el-icon-document"> {{index+1}}</span>
                        <span class="el-icon-close" @click="removeFile(index)"></span>
                    </div>
                    <transition name="el-zoom-in-top">
                        <div v-if="ready(item)" class="file-selection">
                            <select-file :file="item.file1" @uploadFile="uploadFile(index, 'file1')($event)"></select-file>
                            <select-file :file="item.file2" @uploadFile="uploadFile(index, 'file2')($event)"></select-file>
                        </div>
                        <div v-else>
                            <CompareResult :file="item" :index="index"></CompareResult>
                        </div>
                    </transition>
                </el-card>
            </div>
        </div>
        <div class="button-group">
            <el-button icon="plus" type="text" v-on:click="addFileGroup">Add New</el-button>
            <el-button icon="search" type="primary" v-on:click="compareListFiles">Compare</el-button>
        </div>
    </div>
</template>

<script>
    import SelectFile from "./SelectFile"
    import CompareResult from "./CompareResult"
    
    export default {
        methods: {
            addFileGroup() {
                let self = this;
                self.$store.dispatch("addNewFile", {
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
                this.$store.dispatch("removeFile", index);
            },
            uploadFile(index, fileorder) {
                const self = this;
                return function(filename) {
                    self.$store.dispatch("updateFileName", {
                        index,
                        fileorder,
                        filename
                    })
                }
            },
            compareListFiles() {
                this.$store.dispatch("compareFiles");
                // this.$router.push("Compare");
            },
            ready(file) {
                return !(file.results && file.results.added && file.results.missing);
            },
            resultStatusClass(file) {
                if (file.results && file.results.missing && file.results.added) {
                    if (file.results.missing.length > 0 || file.results.added.length > 0) {
                        return "not-match";
                    }
                    return "match";
                }
                return "";
            }
        },
        computed: {
            fileDatas: function() {
                return this.$store.state.fileDatas
            },
            loading: function() {
                return this.$store.state.loading
            }
        },
        //life cycle hook
        created: function() {
            if (this.fileDatas.length === 0)
                this.addFileGroup();
        },
        components: {
            SelectFile,
            CompareResult
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
    
    
    /* match start */
    
    .match .el-card__header {
        background-color: #17AA1C;
    }
    
    .match .card-header {
        color: white;
    }
    
    
    /* match end */
    
    
    /* not-match start */
    
    .not-match .el-card__header {
        background-color: #FD7346;
    }
    
    .not-match .card-header {
        color: white;
        font-style: normal;
        font-weight: bold;
    }
    
    
    /* not-match end */
</style>
