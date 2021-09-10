<template>
    <div>
        <div>
            <div style="display: flex;justify-content: space-between">
                <div>
                    <el-input placeholder="请输入员工名进行搜索，可以直接回车搜索..." prefix-icon="el-icon-search"
                              clearable
                              @clear="initEmps"
                              style="width: 350px;margin-right: 10px" v-model="keyword"
                              @keydown.enter.native="initEmps" :disabled="showAdvanceSearchView"></el-input>
                    <el-button icon="el-icon-search" type="primary" @click="initEmps" :disabled="showAdvanceSearchView">
                        搜索
                    </el-button>
                    <el-button type="primary" @click="showAdvanceSearchView = !showAdvanceSearchView">
                        <i :class="showAdvanceSearchView?'fa fa-angle-double-up':'fa fa-angle-double-down'"
                           aria-hidden="true"></i>
                        高级搜索
                    </el-button>
                </div>
            </div>
            <transition name="slide-fade">
                <div v-show="showAdvanceSearchView"
                     style="border: 1px solid #409eff;border-radius: 5px;box-sizing: border-box;padding: 5px;margin: 10px 0px;">
                    <el-row>
                        <el-col :span="5">
                            政治面貌:
                            <el-select v-model="searchValue.politicId" placeholder="政治面貌" size="mini"
                                       style="width: 130px;">
                                <el-option
                                        v-for="item in politicsstatus"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            民族:
                            <el-select v-model="searchValue.nationId" placeholder="民族" size="mini"
                                       style="width: 130px;">
                                <el-option
                                        v-for="item in nations"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            职位:
                            <el-select v-model="searchValue.posId" placeholder="职位" size="mini" style="width: 130px;">
                                <el-option
                                        v-for="item in positions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            职称:
                            <el-select v-model="searchValue.jobLevelId" placeholder="职称" size="mini"
                                       style="width: 130px;">
                                <el-option
                                        v-for="item in joblevels"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="7">
                            聘用形式:
                            <el-radio-group v-model="searchValue.engageForm">
                                <el-radio label="劳动合同">劳动合同</el-radio>
                                <el-radio label="劳务合同">劳务合同</el-radio>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 10px">
                        <el-col :span="5">
                            所属部门:
                            <el-popover
                                    placement="right"
                                    title="请选择部门"
                                    width="200"
                                    trigger="manual"
                                    v-model="popVisible2">
                                <el-tree default-expand-all :data="allDeps" :props="defaultProps"
                                         @node-click="searvhViewHandleNodeClick"></el-tree>
                                <div slot="reference"
                                     style="width: 130px;display: inline-flex;font-size: 13px;border: 1px solid #dedede;height: 26px;border-radius: 5px;cursor: pointer;align-items: center;padding-left: 8px;box-sizing: border-box;margin-left: 3px"
                                     @click="showDepView2">{{inputDepName}}
                                </div>
                            </el-popover>
                        </el-col>
                        <el-col :span="10">
                            入职日期:
                            <el-date-picker
                                    v-model="searchValue.beginDateScope"
                                    type="daterange"
                                    size="mini"
                                    unlink-panels
                                    value-format="yyyy-MM-dd"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="5" :offset="4">
                            <el-button size="mini">取消</el-button>
                            <el-button size="mini" icon="el-icon-search" type="primary" @click="initEmps('advanced')">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>
            </transition>
        </div>
        <div style="margin-top: 10px">
            <el-table
                    :data="emps"
                    stripe
                    border
                    v-loading="loading"
                    element-loading-text="正在加载..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        fixed
                        align="left"
                        label="姓名"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="workID"
                        label="工号"
                        align="left"
                        width="85">
                </el-table-column>
                <el-table-column
                        prop="gender"
                        label="性别"
                        align="left"
                        width="85">
                </el-table-column>
                <el-table-column
                        prop="birthday"
                        width="95"
                        align="left"
                        label="出生日期">
                </el-table-column>
                <el-table-column
                        prop="idCard"
                        width="150"
                        align="left"
                        label="身份证号码">
                </el-table-column>
                <el-table-column
                        prop="wedlock"
                        width="70"
                        label="婚姻状况">
                </el-table-column>
                <el-table-column
                        prop="nation.name"
                        width="50"
                        label="民族">
                </el-table-column>
                <el-table-column
                        prop="nativePlace"
                        width="80"
                        label="籍贯">
                </el-table-column>
                <el-table-column
                        prop="politicsStatus.name"
                        label="政治面貌">
                </el-table-column>
                <el-table-column
                        prop="email"
                        width="180"
                        align="left"
                        label="电子邮件">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        width="100"
                        align="left"
                        label="电话号码">
                </el-table-column>
                <el-table-column
                        prop="address"
                        width="220"
                        align="left"
                        label="联系地址">
                </el-table-column>
                <el-table-column
                        prop="department.name"
                        width="100"
                        align="left"
                        label="所属部门">
                </el-table-column>
                <el-table-column
                        prop="position.name"
                        width="100"
                        label="职位">
                </el-table-column>
                <el-table-column
                        prop="jobLevel.name"
                        width="100"
                        label="职称">
                </el-table-column>
                <el-table-column
                        prop="engageForm"
                        width="100"
                        align="left"
                        label="聘用形式">
                </el-table-column>
                <el-table-column
                        prop="tiptopDegree"
                        width="80"
                        align="left"
                        label="最高学历">
                </el-table-column>
                <el-table-column
                        prop="specialty"
                        width="150"
                        align="left"
                        label="专业">
                </el-table-column>
                <el-table-column
                        prop="school"
                        width="150"
                        align="left"
                        label="毕业院校">
                </el-table-column>
                <el-table-column
                        prop="beginDate"
                        width="95"
                        align="left"
                        label="入职日期">
                </el-table-column>
                <el-table-column
                        prop="conversionTime"
                        width="95"
                        align="left"
                        label="转正日期">
                </el-table-column>
                <el-table-column
                        prop="beginContract"
                        width="95"
                        align="left"
                        label="合同起始日期">
                </el-table-column>
                <el-table-column
                        prop="endContract"
                        width="95"
                        align="left"
                        label="合同截止日期">
                </el-table-column>
                <el-table-column
                        width="100"
                        align="left"
                        label="合同期限">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.contractTerm}}</el-tag>
                        年
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        width="200"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button style="padding: 3px" size="mini" type="primary" @click="showEcDialog(scope.row)">
                            添加奖惩
                        </el-button>
                        <el-button style="padding: 3px" size="mini" type="primary" @click="showEmpEcs(scope.row)">
                            奖惩记录
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: flex-end">
                <el-pagination
                        background
                        @current-change="currentChange"
                        @size-change="sizeChange"
                        layout="sizes, prev, pager, next, jumper, ->, total, slot"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="添加奖惩"
                   :visible.sync="addEcDialogVisible"
                   width="36.42%"
                   center>

            <el-form :model="employeeec" :rules="rules" style="text-align: center" ref="empEcForm">
                <el-row >
                    <el-col :offset="6">
                        <el-form-item label="奖惩类型:">
                            <el-switch
                                    v-model="employeeec.ecType"
                                    inactive-color="#13ce66"
                                    active-color="#ff4949"
                                    active-text="惩罚"
                                    inactive-text="奖励">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :offset="6">
                        <el-form-item label="奖惩分:">
                            <el-input-number v-model="employeeec.ecPoint" :min="1" :max="10" ></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-input type="textarea"
                              placeholder="奖惩原因描述"
                              v-model="employeeec.ecReason"
                              maxlength="100"
                              :autosize="{ minRows: 4, maxRows: 6}"
                              show-word-limit
                              style="margin-top: 20px"
                    >
                    </el-input>
                </el-row>
                <el-row>
                    <el-input type="textarea"
                              placeholder="备注"
                              v-model="employeeec.remark"
                              maxlength="30"
                              show-word-limit
                              style="margin-top: 20px"
                    >
                    </el-input>
                </el-row>
               <el-row>
                   <el-col :offset="8">
                       <el-form-item>
                           <el-button @click="addEcDialogVisible = false">取 消</el-button>
                           <el-button type="primary"
                                      @click="doAddEmpEc">确 定</el-button>
                       </el-form-item>
                   </el-col>
               </el-row>
            </el-form>

        </el-dialog>
        <el-dialog title="员工奖惩记录"
                   :visible.sync="empEcsVisible"
                   width="36.42%"
                   center>
            <el-table :data="empEcs" border stripe>
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
            </el-table>
            只展示近期数据 查看详情请前往管理页面
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Addjc",
        data() {
            return {
                searchValue: {
                    politicId: null,
                    nationId: null,
                    jobLevelId: null,
                    posId: null,
                    engageForm: null,
                    departmentId: null,
                    beginDateScope: null
                },
                empEcs:[],
                title: '',
                showAdvanceSearchView: false,
                allDeps: [],
                emps: [],
                loading: false,
                empEcsVisible:false,
                addEcDialogVisible:false,
                popVisible: false,
                popVisible2: false,
                dialogVisible: false,
                total: 0,
                currentPage: 1,
                keyword: '',
                pageSize: 10,
                nations: [],
                joblevels: [],
                politicsstatus: [],
                positions: [],
                tiptopDegrees: ['本科', '大专', '硕士', '博士', '高中', '初中', '小学', '其他'],
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                inputDepName: '所属部门',
                emp: {
                    name: "javaboy",
                    gender: "男",
                    birthday: "1989-12-31",
                    idCard: "610122199001011256",
                    wedlock: "已婚",
                    nationId: 1,
                    nativePlace: "陕西",
                    politicId: 13,
                    email: "laowang@qq.com",
                    phone: "18565558897",
                    address: "深圳市南山区",
                    departmentId: null,
                    jobLevelId: 9,
                    posId: 29,
                    engageForm: "劳务合同",
                    tiptopDegree: "本科",
                    specialty: "信息管理与信息系统",
                    school: "深圳大学",
                    beginDate: "2017-12-31",
                    workState: "在职",
                    workID: "00000057",
                    contractTerm: 2,
                    conversionTime: "2018-03-31",
                    notworkDate: null,
                    beginContract: "2017-12-31",
                    endContract: "2019-12-31",
                    workAge: null
                },
                employeeec:{
                    ecReason:'',
                    remark:'',
                    ecPoint:'',
                    ecType:1,
                    eid:'',
                },
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                rules: {
                    name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    gender: [{required: true, message: '请输入性别', trigger: 'blur'}],
                    birthday: [{required: true, message: '请输入出生日期', trigger: 'blur'}],
                    idCard: [{required: true, message: '请输入身份证号码', trigger: 'blur'}, {
                        pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                        message: '身份证号码格式不正确',
                        trigger: 'blur'
                    }],
                    wedlock: [{required: true, message: '请输入婚姻状况', trigger: 'blur'}],
                    nationId: [{required: true, message: '请输入您组', trigger: 'blur'}],
                    nativePlace: [{required: true, message: '请输入籍贯', trigger: 'blur'}],
                    politicId: [{required: true, message: '请输入政治面貌', trigger: 'blur'}],
                    email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'}, {
                        type: 'email',
                        message: '邮箱格式不正确',
                        trigger: 'blur'
                    }],
                    phone: [{required: true, message: '请输入电话号码', trigger: 'blur'}],
                    address: [{required: true, message: '请输入员工地址', trigger: 'blur'}],
                    departmentId: [{required: true, message: '请输入部门名称', trigger: 'blur'}],
                    jobLevelId: [{required: true, message: '请输入职称', trigger: 'blur'}],
                    posId: [{required: true, message: '请输入职位', trigger: 'blur'}],
                    engageForm: [{required: true, message: '请输入聘用形式', trigger: 'blur'}],
                    tiptopDegree: [{required: true, message: '请输入学历', trigger: 'blur'}],
                    specialty: [{required: true, message: '请输入专业', trigger: 'blur'}],
                    school: [{required: true, message: '请输入毕业院校', trigger: 'blur'}],
                    beginDate: [{required: true, message: '请输入入职日期', trigger: 'blur'}],
                    workState: [{required: true, message: '请输入工作状态', trigger: 'blur'}],
                    workID: [{required: true, message: '请输入工号', trigger: 'blur'}],
                    contractTerm: [{required: true, message: '请输入合同期限', trigger: 'blur'}],
                    conversionTime: [{required: true, message: '请输入转正日期', trigger: 'blur'}],
                    notworkDate: [{required: true, message: '请输入离职日期', trigger: 'blur'}],
                    beginContract: [{required: true, message: '请输入合同起始日期', trigger: 'blur'}],
                    endContract: [{required: true, message: '请输入合同结束日期', trigger: 'blur'}],
                    workAge: [{required: true, message: '请输入工龄', trigger: 'blur'}],
                }
            }
        },
        mounted() {
            this.initEmps();
            this.initData();
            this.initPositions();
        },
        methods: {
            showEmpEcs(emp){
                this.empEcsVisible=true;
                this.getRequest("/per/ec/"+emp.id)
                .then(resp=>{
                    this.empEcs=resp;
                })
            },
            doAddEmpEc(){
                //发送添加奖惩的请求信息
                this.employeeec.ecType=this.employeeec.ecType?1:0;
                console.log(this.employeeec);
                this.postRequest("/per/ec/",this.employeeec)
                    .then(resp=>{
                        if (resp)
                        {
                            this.addEcDialogVisible=false;
                        }
                    })
                .catch(error=>{
                    console.log(error)
                })
            },
            showEcDialog(empEc){
              this.addEcDialogVisible=true;
              this.employeeec.eid=empEc.id;
            },
            searvhViewHandleNodeClick(data) {
                this.inputDepName = data.name;
                this.searchValue.departmentId = data.id;
                this.popVisible2 = !this.popVisible2
            },
            emptyEmp() {
                this.emp = {
                    name: "",
                    gender: "",
                    birthday: "",
                    idCard: "",
                    wedlock: "",
                    nationId: 1,
                    nativePlace: "",
                    politicId: 13,
                    email: "",
                    phone: "",
                    address: "",
                    departmentId: null,
                    jobLevelId: 9,
                    posId: 29,
                    engageForm: "",
                    tiptopDegree: "",
                    specialty: "",
                    school: "",
                    beginDate: "",
                    workID: "",
                    contractTerm: 2,
                    conversionTime: "",
                    notworkDate: null,
                    beginContract: "",
                    endContract: "",
                    workAge: null
                }
                this.inputDepName = '';
            },

            handleNodeClick(data) {
                this.inputDepName = data.name;
                this.emp.departmentId = data.id;
                this.popVisible = !this.popVisible
            },
            showDepView() {
                this.popVisible = !this.popVisible
            },
            showDepView2() {
                this.popVisible2 = !this.popVisible2
            },
            initPositions() {
                this.getRequest('/employee/basic/position').then(resp => {
                    if (resp) {
                        this.positions = resp;
                    }
                })
            },
            getMaxWordID() {
                this.getRequest("/employee/basic/workid").then(resp => {
                    if (resp) {
                        console.log("最大工号"+JSON.stringify(resp));
                        this.emp.workID = resp.obj;
                    }
                })
            },
            initData() {
                if (!window.sessionStorage.getItem("nations")) {
                    this.getRequest('/employee/basic/nation').then(resp => {
                        if (resp) {
                            this.nations = resp;
                            window.sessionStorage.setItem("nations", JSON.stringify(resp));
                        }
                    })
                } else {
                    this.nations = JSON.parse(window.sessionStorage.getItem("nations"));
                }
                if (!window.sessionStorage.getItem("joblevels")) {
                    this.getRequest('/employee/basic/joblevel').then(resp => {
                        if (resp) {
                            this.joblevels = resp;
                            window.sessionStorage.setItem("joblevels", JSON.stringify(resp));
                        }
                    })
                } else {
                    this.joblevels = JSON.parse(window.sessionStorage.getItem("joblevels"));
                }

                if (!window.sessionStorage.getItem("politicsstatus")) {
                    this.getRequest('/employee/basic/politicsstatus').then(resp => {
                        if (resp) {
                            this.politicsstatus = resp;
                            window.sessionStorage.setItem("politicsstatus", JSON.stringify(resp));
                        }
                    })
                } else {
                    this.politicsstatus = JSON.parse(window.sessionStorage.getItem("politicsstatus"));
                }
                if (!window.sessionStorage.getItem("deps")) {
                    this.getRequest('/employee/basic/department').then(resp => {
                        if (resp) {
                            this.allDeps = resp;
                            window.sessionStorage.setItem("deps", JSON.stringify(resp));
                        }
                    })
                } else {
                    this.allDeps = JSON.parse(window.sessionStorage.getItem("deps"));
                }
            },
            sizeChange(pageSize) {
                this.pageSize = pageSize;
                this.initEmps();
            },
            currentChange(currentPage) {
                this.currentPage = currentPage;
                this.initEmps('advanced');
            },

            initEmps(type) {
                this.loading = true;
                let url = '/employee/basic/?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize;
                if (type && type == 'advanced') {
                    if (this.searchValue.politicId) {
                        url += '&politicId=' + this.searchValue.politicId;
                    }
                    if (this.searchValue.nationId) {
                        url += '&nationId=' + this.searchValue.nationId;
                    }
                    if (this.searchValue.jobLevelId) {
                        url += '&jobLevelId=' + this.searchValue.jobLevelId;
                    }
                    if (this.searchValue.posId) {
                        url += '&posId=' + this.searchValue.posId;
                    }
                    if (this.searchValue.engageForm) {
                        url += '&engageForm=' + this.searchValue.engageForm;
                    }
                    if (this.searchValue.departmentId) {
                        url += '&departmentId=' + this.searchValue.departmentId;
                    }
                    if (this.searchValue.beginDateScope) {
                        url += '&beginDateScope=' + this.searchValue.beginDateScope;
                    }
                } else {
                    url += "&name=" + this.keyword;
                }
                this.getRequest(url).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.emps = resp.data;
                        this.total = resp.total;
                    }
                });
            }
        }
    }
</script>

<style>
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .8s ease;
    }

    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
