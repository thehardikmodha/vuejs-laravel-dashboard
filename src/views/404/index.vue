<template>
    <div></div>
</template>
<script>
    import {message} from "../../utils/message";

    export default {
        name: "index",
        mounted() {
            message('error', '404 Page Not Found.');
        }
    }
</script>
