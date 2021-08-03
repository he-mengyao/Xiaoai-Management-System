import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/layout/Layout.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/login/Login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        name: 'Rigister',
        component: () =>
            import ('../views/register/Register.vue'),
        meta: {
            title: '注册'
        }
    },
    {
        path: '',
        component: Layout,
        children: [{
                path: '/',
                name: 'Home',
                component: Home,
                meta: {
                    title: '首页',
                    index: '/'
                }
            },
            {
                path: '/published',
                name: 'Published',
                component: () =>
                    import ('../views/published/Published.vue'),
                meta: {
                    title: '已发布',
                    index: '/published'
                }
            },
            {
                path: '/quit',
                name: 'Quit',
                component: () =>
                    import ('../views/quit/Quit.vue'),
                meta: {
                    title: '退出',
                    index: '/quit'
                }
            },
            {
                path: '/count',
                name: 'Count',
                component: () =>
                    import ('../views/count/Count.vue'),
                meta: {
                    title: '统计',
                    index: '/count'
                }
            },
            {
                path: '/publish',
                name: 'Publish',
                component: () =>
                    import ('../views/publish/Publish.vue'),
                meta: {
                    title: '发表文章',
                    index: '/publish'
                }
            }, {
                path: '/label',
                name: 'Label',
                component: () =>
                    import ('../views/label/Label.vue'),
                meta: {
                    title: '标签页',
                    index: '/label'

                }
            }, {
                path: '/excel',
                name: 'Excel',
                component: () =>
                    import ('../views/excel/Excel.vue'),
                meta: {
                    title: '导出excel',
                    index: '/excel'
                }
            }, {
                path: '/upload',
                name: 'Upload',
                component: () =>
                    import ('../views/upload/Upload.vue'),
                meta: {
                    title: '图片上传',
                    index: '/upload'
                }
            }, {
                path: '/list',
                name: 'List',
                component: () =>
                    import ('../views/list/List.vue'),
                meta: {
                    title: '列表',
                    index: '/list'
                }
            },
            {
                path: '/edit',
                name: 'Edit',
                component: () =>
                    import ('../views/edit/Edit.vue'),
                meta: {
                    title: '编辑',
                    index: '/published'
                }
            },
            {
                path: '/look',
                name: 'Look',
                component: () =>
                    import ('../views/look/Look.vue'),
                meta: {
                    title: '查看',
                    index: '/published'
                }
            },

        ]
    },
    {
        path: '*',
        name: '404',
        component: () =>
            import ('../views/404/404.vue'),
        meta: {
            title: '404'
        }
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    let user = JSON.parse(localStorage.getItem('user'))
    if (to.path === '/login' || to.path === '/register') {
        next()
    } else {
        user ? next() : next('/login')
    }
})
export default router