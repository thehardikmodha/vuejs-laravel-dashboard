<template>
    <div>
        <ap-header/>
        <ap-side/>

        <a-lte-content>
            <b-container fluid="" slot="header">
                <b-row class="mb-2">
                    <b-col sm="6">
                        <h1 class="m-0 text-dark">{{ title }}</h1>
                    </b-col>
                    <b-col class="d-flex justify-content-end" sm="6">
                        <breadcrumbs :list="breadcrumbs" transition="breadcrumbs"/>
                    </b-col>
                </b-row>
            </b-container>
            <app-main/>
        </a-lte-content>

        <ap-footer/>
        <div @click="toggleSideBar" id="sidebar-overlay" v-a-lte-aside-toggle></div>
    </div>
</template>

<script>
    import ApHeader from "./components/AppHeader";
    import ApSide from "./components/AppSide";
    import ApFooter from "./components/AppFooter";
    import AppMain from "./components/AppMain";
    import Breadcrumbs from "./components/Breadcrumbs";

    export default {
        name: "Index",
        components: {Breadcrumbs, AppMain, ApFooter, ApHeader, ApSide},
        computed: {
            title() {
                let title = '';
                if (this.$route.meta && this.$route.meta.label) {
                    title = this.$route.meta.label;
                }
                if (this.$route.name) {
                    title = this.$route.name;
                }
                return title;
            },
            breadcrumbs() {
                return this.$route.matched;
            },
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('app/toggleSideBar');
            },
        }
    }
</script>

<style>
    .breadcrumb-item {
        transition: all 0.3s;
        white-space: nowrap;
    }

    .breadcrumbs-enter,
    .breadcrumbs-leave-to {
        opacity: 0;
    }

    .breadcrumbs-leave-active {
        position: absolute;
    }

    .content-wrapper {
        margin-bottom: 0 !important;
        margin-top: 0 !important;
        padding-top: calc(3.5rem + 1px);
        padding-bottom: calc(3.5rem + 1px);
        min-height: unset;
        overflow-x: hidden;
    }

    .modal-backdrop {
        background: rgba(54, 70, 93, 0.75) !important;
    }

    .modal-content {
        box-shadow: unset !important;
    }

    .modal.fade .modal-dialog {
        transition: unset !important;
        -webkit-transform: unset !important;
        transform: unset !important;
    }

    .nav-sidebar-child > .nav-item:hover > .nav-link {
        background-color: rgba(255, 255, 255, .1);
        color: #fff !important;
    }

    .nav-sidebar-child > .nav-item:hover > .active {
        background-color: #007bff !important;
        color: #fff !important;
    }
</style>
