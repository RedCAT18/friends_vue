<template>
    <div class="header-boundary">
        <div class="row">
            <div class="user-list col">
                <label for="username-list">Select user name</label>
                <select class="form-control form-control-sm" id="username-list">
                    <app-name-list v-for="user in users" :item="user" :id="user.id"></app-name-list>
                </select>
            </div>
            <div class="col submit-btn">
                <button type="submit" class="btn btn-sm btn-primary" @click="find_me">Select User</button>
            </div>
            <div class="go-list col">
                <i class="material-icons md-36" @click="add_page">add_circle_outline</i>
            </div>
        </div>
    </div>
</template>

<script>
    import NameList from '../body/NameList.vue';
    import api from '../../api';
    import { eventBus } from '../../main.js';

    export default {
        components: {
            appNameList : NameList
        },
        data(){
            return {
                users : [],
                selected : ''
            }
        },
        methods: {
            find_me: function(){
                let selected = parseInt(document.getElementById('username-list').value);

                this.selected = selected;
                eventBus.$emit('findMe', selected);
                api.getFriends(selected);
            },
            add_page: function(){
                this.$router.push('/')
            },
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