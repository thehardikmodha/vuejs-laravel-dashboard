<template>
    <transition-group :name="transition" class="breadcrumb" tag="ol">
        <li :class="{ 'breadcrumb-item': true, active: isLast(index) }" :key="item.path" v-for="(item, index) in list">
            <template v-if="isLast(index)">{{ showName(item) }}</template>
            <template v-else-if="item.redirect">
                <router-link :to="item.redirect" v-if="item.redirect !== 'noredirect'">{{ showName(item) }}
                </router-link>
                <template v-else>{{ showName(item) }}</template>
            </template>
            <router-link :to="item" v-else>{{ showName(item) }}</router-link>
        </li>
    </transition-group>
</template>

<script>
    export default {
        name: 'Breadcrumbs',
        props: {
            list: {
                type: Array,
                required: true,
            },
            transition: {
                type: String,
                default: 'breadcrumb',
            },
        },
        methods: {
            isLast(index) {
                return index === this.list.length - 1;
            },
            showName(item) {
                if (item.meta && item.meta.label) {
                    return item.meta.label;
                }
                if (item.name) {
                    return item.name;
                }

                return '';
            },
        },
    };
</script>
