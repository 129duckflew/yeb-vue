import {getRequest} from "./axiosUtils";

export const initMenu=(router,store)=>{
    if (store.state.routes.length>0)return;
    getRequest('/system/config/menu')
        .then(data=>{
            if (data){
                let formatRoutes=formatRoutes(data);
                //添加到路由
                router.addRoutes(formatRoutes);
                store.commit('initRoutes',formatRoutes);
            }
        })
};
//格式化Routers
export const formatRoutes=routes=>{
    let fmtRoutes=[];
    routes.forEach(router=>{
        let {
            path,
            component,
            name,
            iconcls,
            children
        }=router;
        if (children&& children instanceof Array)
        {
            children=formatRoutes(children)
        }
        let fmRouter={
            path:path,
            name:name,
            iconcls:iconcls,
            children:children,
            component(resolve){
                require(['../views'+component+'.vue'],resolve)
            }
        };
        fmtRoutes.push(fmRouter)
        return fmtRoutes;
    })
};