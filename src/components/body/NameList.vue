<template>
        <option :value="item.id" @click="addToList(item)">
            {{item.id}} . {{item.name}}
        </option>
</template>

<script>
    import { eventBus } from '../../main.js';

    export default {
        props: ['item'],
        methods: {
            addToList : function(data){
                eventBus.$emit('addUser', data);
            }
        }
    }
</script>

<style lang="scss">
    option {
        padding: 0 10px;
    }
</style>