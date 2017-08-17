<template>
    <div>
        <app-header></app-header>
        <app-body></app-body>
    </div>
</template>

<script>
    import Header from './components/header/Header.vue';
    import Body from './components/body/Body.vue';

    export default {
        components: {
            appHeader : Header,
            appBody : Body
        },
        data () {
            return {

            }
        }
    }
</script>

<style lang="scss">
    * {
        font-family: 'Raleway', sans-serif;
    }

</style>
