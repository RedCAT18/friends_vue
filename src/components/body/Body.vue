<template>
    <div class="container">
        <div class="row">
            <div class="col-md-5">
                <app-user-list></app-user-list>
            </div>
            <div class="col-md-2">
                <app-bridge></app-bridge>
            </div>
            <div class="col-md-5">
                <app-add-to-friends></app-add-to-friends>
            </div>
        </div>
        <transition name="fade">
            <div class="success" v-if="success">
                Friends added successfully.
            </div>
        </transition>
    </div>
</template>

<script>
    import UserList from './UserList.vue';
    import AddToFriends from './AddToFriends.vue';
    import Bridge from './Bridge.vue';
    import { eventBus } from '../../main.js';

    export default {
        components : {
            appUserList : UserList,
            appBridge : Bridge,
            appAddToFriends : AddToFriends,
        },
        data(){
           return {
               success: false
           }
        },
        beforeMount(){
            eventBus.$on('scs',data=>{
                if(data) this.success = true;
                setTimeout(()=> {this.success = false;} ,1000 );
            })
        }
    }
</script>

<style lang="scss">
    $textcolor: #191970;

    .success {
        color: $textcolor;
        background-color: #fff;
        padding: 20px;
        border: 1px solid $textcolor;
        border-radius: 10px;
        font-weight: 400;
        font-size: 2.3em;
        position: absolute;
        top: 40%;
        left: 30%;
        display:block;
        margin: 0 auto;
        z-index: 10;
    }

    .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-leave-to {
        opacity: 0;
    }
</style>