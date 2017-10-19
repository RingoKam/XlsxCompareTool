<template>
    <div>
        <div class="nav-bar">
            <el-button icon="arrow-left" @click.prevent="backToFiles">Back</el-button>
            <div class="center-this">File vs File2</div>
            <div>One Last</div>
        </div>
        <div>
            <el-progress :percentage="fileMatchPercent(index)"></el-progress>
        </div>

        <div v-if="fileDatas[index]" class="compare-view">
            <div class="excel-page">
                <excel-view :data="fileDatas[index]['file1'].data"></excel-view>
            </div>
            <div class="excel-page">
                <excel-view :data="fileDatas[index]['file2'].data"></excel-view>
            </div>
        </div>
    </div>
</template>

<script>
import excelView from "./ExcelView"

export default {
    props: {
        index: [String, Number],
        filename: String
    },
    methods: {
        backToFiles() {
            this.$router.push({ name: "landing-page" });
        },
        fileMatchPercent(index) {
            if (this.$store.state.fileDatas.length > 0) {
                const added = this.$store.state.fileDatas[index].results.added.length;
                const found = this.$store.state.fileDatas[index].results.found.length;
                const missing = this.$store.state.fileDatas[index].results.missing.length;
                return (found / (added + missing)) * 100;
            }
        }
    },
    computed: {
        fileDatas: function() {
            return this.$store.state.fileDatas;
        },
        title: function() {
        }
    },
    components: {
        excelView
    }
}
</script>

<style scoped>
.compare-view {
    display: flex;
    justify-content: space-around;
}

.excel-page {
    width: 50%
}

.nav-bar {
    display: flex;
    justify-content: space-between;
}

.center-this {
    align-self: center;
}
</style>
