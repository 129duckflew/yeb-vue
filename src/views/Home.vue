<template>
    <div>
        <el-container >
            <el-header class="homeHeader">
                <div class="title">
                    人事管理系统
                </div>
                <el-dropdown class="userInfo" @command="commandHandler">
                     <span class="el-dropdown-link">
                      {{user.name}}
                     <i class="el-icon-arrow-down el-icon--right">
                         <img :src="user.userFace">
                     </i>
                     </span>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item  command="setting">设置</el-dropdown-item>
                        <el-dropdown-item  command="logout" divided>
                          退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="200px" class="menu">
                    <!--                <el-menu :default-openeds="['1', '3']" router>-->
                    <el-menu router unique-opened>
                        <el-submenu :index="index+''" v-for="(item,index) in routes" :key="index" v-if="!item.hidden">
                            <template slot="title">
                                <i :class="item.iconCls" style="color: aquamarine; margin-right: 5px" ></i>
                                <span>{{item.name}}</span>
                            </template>
                            <el-menu-item :index="children.path" v-for="(children,indexj) in item.children" :key="indexj">
                                {{children.name}}
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb v-if="this.$router.currentRoute.path!=='/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="/">{{this.$route.name}}</a></el-breadcrumb-item>
                    </el-breadcrumb>
                    <router-view class="homeRouterView"/>
                    <div class="homeWelcome" v-if="$router.currentRoute.path==='/home'">
                        欢迎使用人事管理系统
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data(){
            return{
                user: JSON.parse(window.sessionStorage.getItem('user'))
            }
        },
        methods:{
            commandHandler(command){
                if (command==="logout"){
                    this.$confirm('此操作将退出登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.postRequest('/logout').then(resp=>{
                            if (resp)
                            {
                                window.sessionStorage.removeItem('tokenStr');
                                window.sessionStorage.removeItem('user');
                                this.$store.commit('initRoutes',[]);
                                this.$router.replace('/')
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }
                else if (command==='setting')
                {

                }
                else if (command===''){

                }
            },
        },
        computed:{
            routes(){
                return this.$store.state.routes;
            }
        }
    }
</script>

<style scoped>
    .homeHeader{
        background: goldenrod;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        box-sizing: border-box;
        margin-bottom: 30px;

    }
    .title{
        font-size: 25px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        color: white;

    }
    .menu{
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }
    .userInfo{
        cursor: pointer;
    }
    .el-dropdown-link img{
        width: 55px;
        margin-left: 5px;
        height: 55px;
    }
    .homeWelcome{
        text-align: center;
        font-size: 30px ;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        color: coral;
        padding-top: 50px;
    }
    .homeRouterView{
        margin-top: 20px;
    }
</style>