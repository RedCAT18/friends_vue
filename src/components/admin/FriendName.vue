<template>
    <div class="friend-name form-check">
        <li>
            <input type="checkbox" class="friend-checkbox form-check-input" @click="chooseFriend(item.id)"> {{item.id}} . {{item.name}}
        </li>
    </div>
</template>

<script>
    import { eventBus } from '../../main.js';

    export default {
        props: ['item'],
        methods: {
            chooseFriend: function(id){
                eventBus.$emit('selectToDelete', id);
            }
        }
    }
</script>

<style lang="scss">
    .friend-name{
        padding: 5px;
        li {
            list-style-type: none;
            padding: 0 10px;
            font-size: 11pt;
        }
    }
</style>