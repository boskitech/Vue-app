import Vue from 'vue';
import Body from './components/Body.vue';
import Addtodo from './components/Addtodo.vue';
import List from './components/List.vue';
import ViewList from './components/ViewList.vue';
import Update from './components/Update.vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Body,
            children: [
                {
                    path: '/',
                    component: List
                },
                {
                    path: 'lists/:id',
                    name: 'viewlist',
                    component: ViewList
                },
                {
                    path: 'add:id',
                    name: 'Add',
                    component: Addtodo
                },
                {
                    path: 'update/:id',
                    name: 'updateTodo',
                    component: Update
                }
              ]
        }
    ]
})