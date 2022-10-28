import VueRouter from 'vue-router'
import routes from "./routes";

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
    return originalPush.call(this, location).catch(err => err)
}



export default new VueRouter({
    mode:'history',
    routes,
    scrollBehavior(to, from, savePosition) {
        return {y: 0}
    }
})
