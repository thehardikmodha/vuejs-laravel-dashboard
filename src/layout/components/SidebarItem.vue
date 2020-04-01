<template>
    <div class="nav-sidebar-child" v-if="!item.hidden&&item.children">
        <template
                v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
            <!--      <a-lte-aside-nav-header :title="onlyOneChild.name" :key="onlyOneChild.meta.title" />-->
            <side-item :badge="onlyOneChild.meta.badge" :icon="onlyOneChild.meta.icon" :key="onlyOneChild.meta.title"
                       :title="'' + onlyOneChild.name" :to="resolvePath(onlyOneChild.path)"/>
        </template>

        <template :index="resolvePath(item.path)" v-else-if="item.meta">
            <sidebar-dropdown :base-url="item.path" :icon="item.meta.icon" :key="item.meta.title" :title="item.name">
                <template v-for="child in visibleChildren">
                    <side-item :icon="child.meta.icon" :key="child.meta.title" :title="child.meta.title"
                               :to="resolvePath(child.path)" v-if="child.meta"/>
                </template>
            </sidebar-dropdown>
        </template>
    </div>
</template>

<script>
    import path from 'path';
    import {isExternal} from './../../utils/validate';
    import SideItem from "./SideItem";
    import SidebarDropdown from "./SidebarDropdown";

    export default {
        name: 'SidebarItem',
        components: {SidebarDropdown, SideItem},
        props: {
            item: {
                type: Object,
                required: true,
            },
            isNest: {
                type: Boolean,
                default: false,
            },
            basePath: {
                type: String,
                default: '',
            },
        },
        data() {
            return {
                onlyOneChild: null,
            };
        },
        computed: {
            visibleChildren() {
                return this.item.children.filter(item => !item.hidden);
            },
        },
        methods: {
            hasOneShowingChild(children, parent) {
                const showingChildren = children.filter(item => {
                    if (item.hidden) {
                        return false;
                    } else {
                        // Temp set(will be used if only has one showing child)
                        this.onlyOneChild = item;
                        return true;
                    }
                });

                // When there is only one child router, the child router is displayed by default
                if (showingChildren.length === 1) {
                    return true;
                }

                // Show parent if there are no child router to display
                if (showingChildren.length === 0) {
                    this.onlyOneChild = {...parent, path: '', noShowingChildren: true};
                    return true;
                }

                return false;
            },
            resolvePath(routePath) {
                if (this.isExternalLink(routePath)) {
                    return routePath;
                }
                return path.resolve(this.basePath, routePath);
            },
            isExternalLink(routePath) {
                return isExternal(routePath);
            },
        },
    };
</script>
