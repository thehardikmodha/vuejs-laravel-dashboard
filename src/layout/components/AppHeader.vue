<template>
    <a-lte-header border-bottom>
        <b-navbar class="navbar-expand" type="light" variant="white">
            <b-navbar-nav>
                <b-nav-item @click="toggleSideBar" v-a-lte-aside-toggle>
                    <font-awesome-icon icon="bars"/>
                </b-nav-item>
                <b-nav-item class="d-none d-sm-inline-block" to="/">Home</b-nav-item>
                <b-nav-item class="d-none d-sm-inline-block" to="">Contact</b-nav-item>
            </b-navbar-nav>

            <b-nav-form class="ml-3">
                <b-input-group size="sm">
                    <b-form-input class="form-control-navbar" placeholder="Search..."/>
                    <b-input-group-append>
                        <b-button variant="navbar">
                            <font-awesome-icon icon="search"/>
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-nav-form>

            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown no-caret right>
                    <template slot="button-content">
                        <font-awesome-icon icon="comments"/>
                        <b-badge class="navbar-badge" variant="danger">3</b-badge>
                    </template>
                    <b-dropdown-item to="">1</b-dropdown-item>
                    <b-dropdown-item to="">2</b-dropdown-item>
                    <b-dropdown-item to="">3</b-dropdown-item>
                    <b-dropdown-item to="">4</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown no-caret right>
                    <template slot="button-content">
                        <font-awesome-icon icon="bell"/>
                        <b-badge class="navbar-badge" variant="warning">15</b-badge>
                    </template>
                    <b-dropdown-item to="">1</b-dropdown-item>
                    <b-dropdown-item to="">2</b-dropdown-item>
                    <b-dropdown-item to="">3</b-dropdown-item>
                    <b-dropdown-item to="">4</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item @click="logoutConfirm">
                    <b>Logout</b>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </a-lte-header>
</template>

<script>
    import Swal from 'sweetalert2';
    import {message} from "../../utils/message";

    export default {
        name: "ApHeader",
        methods: {
            toggleSideBar() {
                this.$store.dispatch('app/toggleSideBar');
            },
            logoutConfirm() {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You want to logout!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Logout!'
                }).then((result) => {
                    if (result.value) {
                        this.logoutNow()
                    }
                })
            },
            async logoutNow() {
                await this.$store.dispatch('user/logout');
                this.$router.push(`/login?redirect=${this.$route.fullPath}`);
                message('success', 'successfully logged out.')
            }
        },
    }
</script>

<style scoped>

</style>
