<template>
   <div>
       <div>
           <el-input v-model="jl.name" size="small" style="width: 300px" placeholder="请输入职称名" prefix-icon="el-icon-plus"></el-input>
           <el-select v-model="jl.titleLevel" placeholder="请选择职称等级" size="small"
           style="margin-left: 10px">
               <el-option
                       v-for="item in titleLevels"
                       :key="item"
                       :label="item"
                       :value="item">
               </el-option>
           </el-select>
           <el-button size="small" type="primary" icon="el-icon-plus" @click="addJobLevel">添加</el-button>
       </div>
       <div>
           <el-table border stripe
                     :data="jls"
                     style="width: 100%"
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
                       label="职称名"
                       width="150">
               </el-table-column>
               <el-table-column
                       prop="titleLevel"
                       label="职称等级"
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
               <el-table-column label="操作" width="150">
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
                   <el-input style="width: 200px" size="small" v-model="updateJl.name" class="updateInput"></el-input>
                   <br>
                   <el-tag>职位等级</el-tag>
                   <el-select v-model="updateJl.titleLevel" placeholder="请选择职称等级" size="small" style="padding-top: 10px">
                       <el-option
                               v-for="item in titleLevels"
                               :key="item"
                               :label="item"
                               :value="item">
                       </el-option>
                   </el-select>
                   <el-switch
                           v-model="updateJl.enabled"
                           active-text="启用"
                           inactive-text="未启用">
                   </el-switch>
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
        name: "JobLevelManage",
        data(){
            return {
                jl:{
                    titleLevel:'',
                    name:''
                },
                jls:[],
                titleLevels:[
                    '正高级',
                    '副高级',
                    '中级',
                    '初级',
                    '员级'
                ],
                dialogVisible:false,
                multipleSelection:[],
                updateJl:{
                    titleLevel:'',
                    name:'',
                    enabled:''
                }
            }
        },
        created() {
            this.initJobLevel();
        },
        methods:{
            handleSelectionChange(val){
                this.multipleSelection=val;
                console.log(val)
            },
            doUpdate(){
                putRequest('/system/basic/joblevel/',this.updateJl)
                    .then(resp=>{
                        if (resp){
                            this.initJobLevel();
                            this.dialogVisible=false;
                        }
                    })
            },
            deleteMany(){
                this.$confirm('此操作将永久删除['+this.multipleSelection.length+']条职称信息 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids='?';
                    this.multipleSelection.forEach(item=>{
                        ids+='ids='+item.id+'&';
                    });
                    deleteRequest('/system/basic/joblevel/'+ids)
                        .then(resp=>{
                            if (resp)
                            {
                                this.initJobLevel();
                            }
                        })

                }).catch(() => {
                });
            },
            initJobLevel()
            {
                getRequest('/system/basic/joblevel/')
                    .then(resp=>{
                        if (resp)
                            this.jls=resp
                    })
            },
            showEditDialog(index, data)
            {
                Object.assign(this.updateJl,data);
                this.dialogVisible=true;
                this.updateJl.createDate='';
            },
            handleDelete(index, data) {
                this.$confirm('你是否要删除此职称?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteRequest('/system/basic/joblevel/'+data.id)
                        .then(resp=>{
                            if (resp)
                            {
                                this.initJobLevel();
                            }
                        });
                }).catch(() => {
                });
                console.log(index, data);
            },
            addJobLevel(){
                if (this.jl.name&&this.jl.titleLevel){
                    postRequest('/system/basic/joblevel/',this.jl)
                        .then(resp=>{
                            this.initJobLevel();
                            this.jl.name='';
                            this.jl.titleLevel='';
                        })
                }
                else {
                    this.$message.error("请填写所有字段！")
                }
            }
        }
    }
</script>

<style scoped>

</style>