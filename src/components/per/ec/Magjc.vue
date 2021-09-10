<template>
    <div>
        <el-table :data="empEcs" border stripe>
            <el-table-column label="用户编号" prop="eid" align="center">
            </el-table-column>
            <el-table-column
                    prop="ecType"
                    label="奖惩类型"
                    width="100"
            >
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.ecType"
                            type="danger">
                        惩罚
                    </el-tag>
                    <el-tag v-else
                            type="success">
                        奖励
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="奖惩分" prop="ecPoint" align="center">
            </el-table-column>
            <el-table-column label="奖惩日期" prop="ecDate">
            </el-table-column>
            <el-table-column
                    prop="ecType"
                    label="奖惩原因"
                    width="100"
            >
                <template slot-scope="scope">
                   <div>{{scope.row.ecReason}}</div>
                </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "Magjc",
         data(){
             return {
                 empEcs:[]
             }
        },
        methods:{
            initEmpEcs(){
                this.getRequest("/per/ec/")
                .then(resp=>{
                    if (resp)
                    {
                        this.empEcs=resp;
                    }
                })
            }
        },
        mounted() {
            this.initEmpEcs();
        }
    }
</script>

<style scoped>

</style>