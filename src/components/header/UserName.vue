<template>
    <option :value="item.id">
        {{item.id}} . {{item.name}}
    </option>
</template>

<script>
    import { eventBus } from '../../main.js';

    export default {
        props: ['item'],
    }
</script>

<style lang="scss">
    option {
        padding: 0 10px;
    }
</style>