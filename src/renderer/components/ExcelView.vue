<template>
    <div>
        <el-table :data="formatData" :fit="false" :border="true" :row-class-name="setRowClass">
            <el-table-column v-for="title in titles" v-bind:key="title" v-bind:prop="title" v-bind:label="title">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "excel-view",
    props: {
        data: Array
    },
    computed: {
        titles: function() {
            return this.formatData.reduce((a, c) => {
                const cKeys = Object.keys(c);
                if (cKeys.length > a.length) a = cKeys;
                return a;
            }, [])
        },
        formatData: function() {
            const that = thi s;
            return this.data.map((row) => {
                const separaterow = row.reduce((a, c) => a.concat(c), []);
                return separaterow.reduce((a, c, index) => {
                    const columnName = that.getColumnChar(index + 1);
                    a[columnName] = c;
                    return a;
                }, {})
            })
        }
    },
    methods: {
        getColumnChar(num) {
            for (var ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
                ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
            }
            return ret;
        },
        setRowClass(row, index) {
            return "basic-row"
        }
    }
}
</script>

<style>
.basic-row {
    max-height: 12px;
}
</style>
