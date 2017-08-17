
import Main from './Main.vue';

const Admin = resolve => require(['./components/admin/Admin.vue'], resolve);

export const routes = [
    { path: '/', component: Main },
    { path: '/admin', component: Admin }
];