<template>
    <div>
        <div class="result-title">
            {{filetitle}}
        </div>
        <div class="result-button">
            <el-button type="text">Found matching {{file.results.found.length}} row</el-button>
            <el-badge :value="file.results.added.length">
                <el-button type="danger" :plain="true" :disabled="file.results.added.length === 0" @click.prevent="goToFile(index, 'file2')">Missing From File 1</el-button>
            </el-badge>
            <el-badge :value="file.results.missing.length">
                <el-button type="danger" :plain="true" :disabled="file.results.missing.length === 0" @click.prevent="goToFile(index, 'file2')">Missing From File 2</el-button>
            </el-badge>
        </div>
    </div>
</template>

<script>
export default {
    name: "compare-result",
    props: {
        file: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    computed: {
        filetitle: function() {
            return `Results of ${this.getFileName(this.file.file1.name)} vs ${this.getFileName(this.file.file2.name)}`
        }
    },
    methods: {
        getFileName: function(filename) {
            const fileNameArray = filename.split("/");
            return fileNameArray[fileNameArray.length - 1];
        },
        goToFile: function(index, filename) {
            debugger;
            this.$router.push({
                name: "Compare",
                params: {
                    index,
                    filename
                }
            })
        }
    }
}
</script>

<style scoped>
.result-title {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    font-size: 20px;
}

.result-button {
    display: flex;
    justify-content: space-around;
}
</style>
