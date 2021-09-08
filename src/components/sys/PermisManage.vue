<template>
    <div>
        <div class="permissTool">
            <el-input placeholder="请输入角色英文名" size="small" v-model="role.name" >
                <template slot="prepend">ROLE_</template>
            </el-input>
            <el-input v-model="role.nameZh" size="small" placeholder="请输入角色中文名"></el-input>
            <el-button type="primary" size="small" icon="el-icon-plus" @click="addRole">添加</el-button>
        </div>
        <div class="permissMain">
            <el-collapse v-model="activeNames" @change="handleChange" accordion>
                <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roles" :key="index">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>可访问的资源</span>
                            <el-button  style="float: right; padding: 3px 0" icon="el-icon-delete" @click="doDelete(r)" type="danger">删除</el-button>
                        </div>
                        <div>
                            <el-tree ref="tree" show-checkbox :default-checked-keys="selectMenus" node-key="id" :data="allMenus" :props="defaultProps" >
                            </el-tree>
                            <div>
                                <el-button @click="cancleUpdate" >取消修改</el-button>
                                <el-button type="primary" @click="doUpdate(r.id,index)">确定修改</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    import {getRequest} from "../../utils/axiosUtils";

    export default {
        name: "PermisManage",
        data(){
            return{
                role:{
                    name:'',
                    nameZh:'',
                },
                activeNames: ['1'],
                roles:[],
                allMenus:[],
                defaultProps:{
                    label:'name',
                    children:'children'
                },
                selectMenus:[]
            }
        },
        methods: {
            doDelete(r){
                this.$confirm('此操作将永久删除['+r.nameZh+']是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/system/basic/role/'+r.id)
                        .then(resp=>{
                            if (resp)
                            {
                               this.initRoles();
                            }
                        })
                }).catch(() => {
                });
            },
            addRole(){
              if (this.role.name&&this.role.nameZh)
              {
                  let roleValue={};
                  Object.assign(roleValue,this.role);
                  roleValue.name="ROLE_"+roleValue.name;
                  this.postRequest('/system/basic/role/',roleValue)
                  .then(resp=>{
                      console.log(resp);
                      this.role={}
                      this.initRoles();
                  })
              }
              else
              {
                  this.$message.error("请输入所有字段");
              }
            },
            cancleUpdate(){
                this.activeNames=[];
            },
            doUpdate(rid,index){
                let tree=this.$refs.tree[index];
                let checkedKeys = tree.getCheckedKeys(true);

                let url='/system/basic/role/menu/?rid='+rid;

                checkedKeys.forEach(checkedKey=>{
                    url+='&mids='+checkedKey
                    console.log(checkedKey)
                });
                this.putRequest(url)
                .then(resp=>{
                    if (resp)
                    {
                        this.activeNames=[];
                    }
                })
            },
            initRoles()
            {
                getRequest('/system/basic/role/')
                    .then(resp=>{
                        if (resp)
                            this.roles=resp
                    })
            },
            initAllMenus()
            {
                getRequest('/system/basic/menu/')
                    .then(resp=>{
                        if (resp)
                            this.allMenus=resp
                    })
            },
            initCheckedMenus(rid)
            {
                getRequest('/system/basic/role/mid/'+rid)
                    .then(resp=>{
                        if (resp)
                            this.selectMenus=resp
                    })
            },
            handleChange(rid) {
                if (rid)
                {
                    this.initAllMenus();
                    this.initCheckedMenus(rid);
                }
            }
        },
        created() {
            this.initRoles();
        }
    }
</script>

<style scoped>
.permissTool{
    display: flex;
}
.permissTool .el-input{
    width: 250px;
    margin-right: 10px;
    justify-content: flex-start;
}
    .permissMain{
        margin-top: 10px;
        width: 500px;
    }
</style>