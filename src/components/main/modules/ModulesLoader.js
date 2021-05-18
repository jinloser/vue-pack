import Error from '@/components/main/404.vue';
import Users from '@/components/main/modules/system/users/index.vue';
import Roles from '@/components/main/modules/system/roles/index.vue';
import Modules from '@/components/main/modules/system/modules/index.vue';
import Main from "@/components/main/index.vue";
import Home from "@/components/main/home/index.vue";
export default class ModulesLoader {
    static loader(name) {
        switch (name) {
            case 'main': return Main;
            case 'home': return Home;
            case 'users': return Users;
            case 'roles': return Roles;
            case 'modules': return Modules;
        }
        return Error;
    }
    static initRouters(router, data, cache) {
        if (router.options.routes.length > 1) return;
        let list = [];
        data.forEach(d => {
            let index = list.findIndex(r => r.name == d.path);
            if (index >= 0) return;
            const rec = { path: "/" + d.path, name: d.path, component: this.loader(d.path) };
            if (d.children) {
                rec['children'] = this.initChildren(d.children, rec.path);
            }
            list.push(rec);
        });
        router.addRoutes(list);
        if (cache) {
            window.sessionStorage.setItem('routers', window.btoa(JSON.stringify(data)));
        }
    }
    static initChildren(children, parent) {
        const list = children.map(c => {
            const rec = { path: `${parent}/${c.path}`, name: c.path, component: this.loader(c.path) };
            if (c.children) {
                rec['children'] = this.initChildren(c.children, rec.path);
            }
            return rec;
        });
        return list;
    }
}