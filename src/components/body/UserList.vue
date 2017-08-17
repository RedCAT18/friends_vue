<template>
    <div id="user-list">
        <div class="list-outline">
            <h2>User List</h2>
            <div class="list-body form-group">
                <select multiple class="form-control" size="20" id="user-list-form">
                    <app-name-list v-for="user in users" :item="user"></app-name-list>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
    import NameList from './NameList.vue';
    import api from '../../api';
    import { eventBus } from '../../main.js';

    export default {
        components: {
            appNameList : NameList,
        },
        data(){
            return {
                users : []
            }
        },
        beforeMount(){
            eventBus.$on('sendUser', (data) => {
                this.users = data;
            });
        }
    }
</script>

<style lang="scss">
    $textcolor: #191970;

    #user-list {
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
    }

</style>