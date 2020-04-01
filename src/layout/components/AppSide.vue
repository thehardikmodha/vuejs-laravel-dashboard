<template>
    <a-lte-aside :collapse="isCollapse" class="sidebar-light-dark" mini>
        <a-lte-aside-brand :header="title" :logo="require('./../../assets/logo.png')"/>

        <a-lte-aside-container>
            <a-lte-aside-user :image="require('./../../assets/avatar.jpg')" :username="name" class="h-auto"/>

            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column w-100 h-50" data-accordion="false"
                    data-widget="treeview" role="menu">
                    <sidebar-item :base-path="route.path" :item="route" :key="route.path" v-for="route in routes"/>
                </ul>
            </nav>
        </a-lte-aside-container>
    </a-lte-aside>
</template>

<script>
    import {mapGetters} from "vuex";
    import SidebarItem from "./SidebarItem";
    import settings from "../../settings";

    export default {
        name: 'ApSide',
        components: {SidebarItem},
        data() {
            return {
                title: settings.title,
                menu: [
                    // {
                    //     title: 'Dashboard',
                    //     icon: 'tachometer-alt',
                    //     to: '/',
                    // },
                    // {
                    //     title: 'UI Elements',
                    //     icon: 'tree',
                    //     children: [
                    //         {
                    //             title: 'General',
                    //             to: '/ui/general',
                    //         },
                    //         {
                    //             title: 'Icons',
                    //             to: '/ui/icons',
                    //         },
                    //         {
                    //             title: 'Buttons',
                    //             to: '/ui/buttons',
                    //         },
                    //     ],
                    // },
                ],
            };
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'permission_routers',
                'name',
                'avatar',
            ]),
            routes() {
                return this.$store.state.permission.routes;
            },
            isCollapse() {
                return !this.sidebar.opened;
            },
        },
    };
</script>
<style>
    img.elevation-2 {
        box-shadow: unset !important;
    }
</style>
