import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import { eventBus } from '../main.js';

Vue.use(VueRouter);
Vue.use(VueResource);


export default ({
    getUser : function(){
       return Vue.http.get('user');
    },
    selectUser : function(id){
        return Vue.http.post('user', id).then(response => {
            let userData = response.body;
            eventBus.$emit('sendUser', userData);
        });
    },
    saveFriends : function(data){
        return Vue.http.post('save', data);
    },
    getFriends : function(id){
        return Vue.http.post('list', id).then(response=>{
            let userData = response.body;
            eventBus.$emit('sendFriends', userData);
        });
    },
    deleteFriends : function(data){
        return Vue.http.post('delete', data);
    }
})

