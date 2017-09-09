<template>
    <div>
        <div>
            <el-button icon="arrow-left" @click.prevent="backToFiles">Back</el-button>
        </div>
        {{index}}{{filename}}
        <div v-if="fileDatas[index]">
            {{fileDatas[index][filename].data}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        index: [String, Number],
        filename: String
    },
    methods: {
        backToFiles() {
            this.$router.push({ name: "landing-page" });
        }
    },
    computed: {
        fileDatas: function() {
            return this.$store.state.fileDatas;
        }
    },
    components: {
    }
}
</script>

<style scoped>

</style>
