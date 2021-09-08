<template>
    <div>
        <div>
           <el-input size="small" placeholder="添加职位" suffix-icon="el-icon=plus" v-model="position.name" class="addPosInput">
           </el-input>
            <el-button size="small" @click="addPos" icon="el-icon-plus" type="primary" class="addButton">添加</el-button>
        </div>
        <div class="posTable">
            <el-table border stripe
                     :data="positions"
                    style="width: 70%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职位"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间"
                        width="120 ">
                </el-table-column>
                <el-table-column label="启用" width="150">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.enabled" type="success">已经启用</el-tag>
                        <el-tag v-else type="danger">未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="showEditDialog(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" size="small"  :disabled="this.multipleSelection.length===0"@click="deleteMany" >批量删除</el-button>
            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%">
                <div>
                    <el-tag>职位名称</el-tag>
                    <el-input  size="small" v-model="updatePos.name" class="updateInput"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {deleteRequest, getRequest, postRequest, putRequest} from "../../utils/axiosUtils";

    export default {
        name: "PosManage",
        data(){
            return {
                position: {
                    "name": ''
                },
                updatePos: {
                    "name": ''
                },
                positions: [],
                dialogVisible:false,
                multipleSelection:[]
            }
        },
        created() {
            this.initPositions();
        },
        methods:{
            deleteMany(){
                this.$confirm('此操作将永久删除['+this.multipleSelection.length+']条职位信息 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids='?';
                    this.multipleSelection.forEach(item=>{
                        ids+='ids='+item.id+'&';
                    });
                    deleteRequest('/system/basic/position/'+ids)
                    .then(resp=>{
                        if (resp)
                        {
                            this.initPositions();
                        }
                    })

                }).catch(() => {
                });
            },
            handleSelectionChange(val){
              this.multipleSelection=val;
                console.log(val)
            },
            doUpdate(){
              putRequest('/system/basic/position/',this.updatePos)
                .then(resp=>{
                    if (resp){
                        this.initPositions();
                        this.dialogVisible=false;
                    }
                })
            },
            initPositions(){
                getRequest('/system/basic/position/')
                    .then(resp=>{
                        if (resp)
                            this.positions=resp
                    })
            },
            showEditDialog(index, data)
            {
                Object.assign(this.updatePos,data);
                this.dialogVisible=true;
                this.updatePos.createDate='';
            },
            handleDelete(index, data) {
                this.$confirm('你是否要删除此职位?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteRequest('/system/basic/position/'+data.id)
                    .then(resp=>{
                        if (resp)
                        {
                            this.initPositions();
                        }
                    });
                }).catch(() => {
                });
                console.log(index, data);
            },
            addPos(){
                if (this.position.name){
                    postRequest('/system/basic/position/',this.position)
                    .then(resp=>{
                        this.initPositions();
                        this.position.name='';
                    })
                }
                else {
                    this.$message.error("职位名不能为空")
                }
            }
        }
    }
</script>

<style scoped>
 .addPosInput{
        width: 300px;
 }
.addButton{
    margin-left: 8px;
}
    .posTable{
        padding-top: 10px;
    }
    .updateInput{
        width: 200px;
        margin-left: 8px;
    }
</style>