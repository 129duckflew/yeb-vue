<template>
    <div>
        <el-tabs  type="card" v-model="activeName">
            <el-tab-pane label="部门管理" name="DepManage">
                <dep-manage></dep-manage>
            </el-tab-pane>
            <el-tab-pane label="职位管理" name="PosManage">
                <pos-manage></pos-manage>
            </el-tab-pane>
            <el-tab-pane label="职称管理" name="JobLevelManage">
                <job-level-manage></job-level-manage>
            </el-tab-pane>
            <el-tab-pane label="奖惩规则" name="EcManage">
                <ec-manage></ec-manage>
            </el-tab-pane>
            <el-tab-pane label="权限组" name="PermisManage">
                <permis-manage></permis-manage>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import DepManage from "../../components/sys/DepManage";
    import EcManage from "../../components/sys/EcManage";
    import PermisManage from "../../components/sys/PermisManage";
    import JobLevelManage from "../../components/sys/JobLevelManage";
    import PosManage from "../../components/sys/PosManage";
    export default {
        name: "SysBasic",
        data(){
            return {
                activeName: 'PosManage'
            }
        },
        components:{
            DepManage,
            EcManage,
            PermisManage,
            PosManage,
            JobLevelManage
        }
    }
</script>

<style scoped>

</style>