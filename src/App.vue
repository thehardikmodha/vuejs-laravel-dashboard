<template>
    <div class="wrapper" id="app" style="background: #f4f6f9;">
        <router-view/>
    </div>
</template>

<script>
    import router from "./router";

    export default {
        name: 'App',
        mounted() {
            this._keyListener = function (e) {
                // Quick Sell Short cut
                if (e.key === 'q' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();

                    if (router.currentRoute.fullPath !== '/widget/quick-sell') {
                        router.push('/widget/quick-sell');
                    }
                }
            };

            document.addEventListener('keydown', this._keyListener.bind(this));
        },
        beforeDestroy() {
            document.removeEventListener('keydown', this._keyListener);
        },
    }
</script>

<style>
    #nprogress .bar {
        background: red !important;
    }

    #nprogress .peg {
        box-shadow: 0 0 10px red, 0 0 5px red !important;
    }

    #nprogress .spinner-icon {
        border-top-color: red !important;
        border-left-color: red !important;
    }

    *::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #F5F5F5;
    }

    *::-webkit-scrollbar {
        width: 12px;
        background-color: #F5F5F5;
    }

    *::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #555;
    }

</style>
