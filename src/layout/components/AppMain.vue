<template>
    <section class="app-main">
        <transition mode="out-in" name="fade-transform">
            <keep-alive :include="cachedViews">
                <router-view :key="key"/>
            </keep-alive>
        </transition>
    </section>
</template>

<script>
    export default {
        name: 'AppMain',
        computed: {
            cachedViews() {
                return this.$store.state.tagsView.cachedViews;
            },
            key() {
                return this.$route.fullPath;
            },
        },
    };
</script>

