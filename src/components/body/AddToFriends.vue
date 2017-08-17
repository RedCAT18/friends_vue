<template>
    <div id="add-to-friends">
        <div class="list-outline">
            <h2>Add To Friends</h2>
            <div class="list-body form-group">
                <select multiple class="form-control" size="20" id="add-list-form">
                    <app-name-list v-for="user in selectedUsers" :item="user"></app-name-list>
                </select>
            </div>
        </div>
        <div class="save-btn">
            <button class="btn btn-primary btn-block" @click="saveFriends">Save</button>
        </div>
    </div>
</template>

<script>
    import { eventBus } from '../../main.js';
    import api from '../../api';
    import NameList from './NameList.vue';

    export default {
        components: {
            appNameList : NameList
        },
        data(){
            return {
                userId: 0,
                selectedUsers : [],
                msg: ''
            }
        },
        methods: {
            saveFriends: function(){
                let friendsId = [];
                for(let user of this.selectedUsers) {
                    friendsId.push(user.id);
                }
                let data = { userId:this.userId, friendsId : friendsId };
                api.saveFriends(data).then(response=>{
                    if(response.body.success == 1) {
                        eventBus.$emit('scs', true);
                    }
                });
                this.userId = 0;
                this.selectedUsers = [];
            }
        },
        beforeMount(){
            eventBus.$on('userName', (id)=>{
                this.userId = this.userId || id;
                this.selectedUsers = [];
            });

            eventBus.$on('successMsg', (msg)=>{
                this.msg = msg;
//                console.log(this.msg);
            });

            eventBus.$on('addUser', (data)=>{
                //이미 리스트에 있는 유저일 경우 리스트에서 제외한다
                let checkUser = this.selectedUsers.indexOf(data);
                if( checkUser != -1){
                    this.selectedUsers.splice(checkUser, 1);
                } else {
                    //리스트에 없으면 추가
                    this.selectedUsers.push(data);
                }
//                console.log(this.selectedUsers);
            });
        }
    }
</script>

<style lang="scss">
    $textcolor: #191970;

    #add-to-friends {
        color: $textcolor;
        padding: 30px;
        h2 {
            text-align: center;
            margin: 0;
            padding: 20px;
        }
        .list-body {
            border-radius: 10px;
            font-size: 10pt;
        }
        .save-btn{
            button{
                float:right;
            }
            clear:both;
        }
    }
</style>