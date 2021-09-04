<template>
    <div>
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="200px">
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
                    <router-view/>
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

            }
        },
        methods:{
        },
        computed:{
            routes(){
                return this.$store.state.routes;
            }
        }
    }
</script>

<style scoped>

</style>