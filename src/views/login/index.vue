<template>
    <a-lte-layout-login>
        <div class="login-logo">
            <a><b>Optical</b> Surface</a>
        </div>
        <div class="card-body login-card-body">
            <p class="login-box-msg">Sign in to start your session</p>

            <form @submit.prevent="login">
                <div class="input-group mb-3">
                    <input class="form-control" placeholder="Email address" ref="email" title="email address"
                           type="email" v-model="user.email">
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <span class="fas fa-envelope"></span>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input class="form-control" placeholder="Password" title="password" type="password"
                           v-model="user.password">
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <span class="fas fa-lock"></span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <!-- /.col -->
                    <div class="col-12">
                        <b-overlay :show="loading" rounded="sm">
                            <button :disabled="loading" class="btn btn-primary btn-block" type="submit">Sign In</button>
                        </b-overlay>
                    </div>
                    <!-- /.col -->
                </div>
            </form>

            <p class="m-1">
                <router-link to="/forgot/password">I forgot my password</router-link>
            </p>
        </div>
    </a-lte-layout-login>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                },
                loading: false
            }
        },
        mounted() {
            this.$refs.email.focus();
        },
        methods: {
            login() {
                if (!this.loading) {
                    this.loading = true;
                    this.$store.dispatch('user/login', this.user)
                        .then(() => {
                            this.loading = false;
                            this.$router.push({path: this.redirect || '/'});
                        }, () => {
                            this.loading = false;
                        })
                        .catch(() => {
                        })
                }
            }
        }
    }
</script>

<style scoped>

</style>
