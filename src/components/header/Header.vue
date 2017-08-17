<template>
    <div class="header-boundary">
        <div class="row">
            <div class="user-list col">
                <label for="username-list">Select user name</label>
                <select class="form-control form-control-sm" id="username-list">
                    <app-user-name v-for="user in users" :item="user" :id="user.id"></app-user-name>
                </select>
            </div>
            <div class="col submit-btn">
                <button type="submit" class="btn btn-sm btn-primary" @click="selectUser">Select User</button>
            </div>
            <div class="go-list col">
                <!--<i class="material-icons md-36" @click="add_page">add_circle_outline</i>-->
                <i class="material-icons md-36" @click="admin_page">view_list</i>
            </div>
        </div>
    </div>
</template>

<script>
    import UserName from './UserName.vue';
    import api from '../../api';
    import { eventBus } from '../../main.js';

    export default {
        components: {
            appUserName : UserName
        },
        data(){
            return {
                users : [],
                selected : ''
            }
        },
        methods: {
            selectUser: function(){
                let selected = parseInt(document.getElementById('username-list').value);
                this.selected = selected;
                eventBus.$emit('userName', selected);
                api.selectUser(selected);
            },
            add_page: function(){
              this.$router.push('/')
            },
            admin_page: function(){
                this.$router.push('/admin');
            }
        },
        created(){
            api.getUser().then(response=>{
                this.users = response.body;

            });
        }
    }
</script>

<style lang="scss">
    $textcolor: #191970;

    .header-boundary {
        color: $textcolor;
        border-bottom: 1px solid $textcolor;
        .row {
            margin: 0;
            padding: 10px;
            .user-list {
                font-size: 10pt;
            }
            .submit-btn {
                padding-top: 25px;
            }
            .go-list {
                text-align: right;
                .material-icons.md-36 {
                    padding-top: 20px;
                    padding-right: 10px;
                    font-size: 36px;
                    cursor: pointer;
                }
            }
        }
    }
</style>