<template>
    <div>
        <app-admin-header></app-admin-header>
        <div class="container">
            <div id="friend-list">
                <h2>Friends List</h2>
                <p>If you want disconnect with someone in this list, click names and press 'remove' button.</p>
                <div class="list-body form-group">
                    <ul>
                        <app-friend-name v-for="user in friends" :item="user" id="friends"></app-friend-name>
                    </ul>
                </div>
                <div class="save-btn">
                    <button type="submit" class="btn btn-primary btn-block" @click="deleteFriends">Remove</button>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="success" v-if="success">
                Friends deleted successfully.
            </div>
        </transition>
    </div>
</template>

<script>
    import AdminHeader from './AdminHeader.vue';
    import FriendName from './FriendName.vue';

    import { eventBus } from '../../main.js';
    import api from '../../api';

    export default {
        components: {
            appFriendName : FriendName,
            appAdminHeader : AdminHeader
        },
        data(){
            return {
                userId: 0,
                friends: [],
                selectedUsers: [],
                success: false
            }
        },
        methods: {
            deleteFriends : function(){
//                console.log(this.userId);
                let data = { userId : this.userId, friendsId : this.selectedUsers };
                api.deleteFriends(data).then(response=>{
                    if(response.body.success == 1) {
                        this.success = true;
                        setTimeout(()=> {this.success = false;} ,1000 );
                        api.getFriends(this.userId);
//                        document.getElementsByClassName('friend-checkbox').checked = false;

                    }
                });
                this.selectedUsers = [];
            }
        },
        beforeMount(){
            eventBus.$on('findMe', (id)=>{
                this.userId = id;
                this.selectedUsers = [];
            });
            eventBus.$on('sendFriends', (data)=>{
//                console.log(data);
               this.friends = data;
            });
            eventBus.$on('selectToDelete', (id)=>{
                let checkUser = this.selectedUsers.indexOf(id);
                if( checkUser != -1){
                    this.selectedUsers.splice(checkUser, 1);
                } else {
                    //리스트에 없으면 추가
                    this.selectedUsers.push(id);
                }
            });

        }
    }
</script>

<style lang="scss">
    $textcolor: #191970;

    #friend-list {
        width: 50%;
        display: block;
        margin: 40px auto;
        color: $textcolor;
        padding: 30px;
        h2 {
            text-align: center;
            margin: 0;
            padding: 20px;
        }
        .list-body {
            border: 1px solid #e7e7e7;
            border-radius: 10px;
            font-size: 10pt;
            ul {
                padding: 10px;
            }
        }
        .save-btn{
            button{
                float:right;
            }
        clear:both;
        }
    }
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
