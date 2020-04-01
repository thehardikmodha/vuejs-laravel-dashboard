<template>
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-header">
                    <b-button @click="openCreateModel" variant="primary">Add New</b-button>
                </div>
                <!-- /.card-header -->
                <b-overlay :show="loadingTable">
                    <div class="card-body">
                        <b-table :fields="fields" :items="items" bordered hover responsive="sm" sticky-header striped>

                            <template v-slot:cell(name)="row">
                                <b-badge class="px-4 py-2 text-md">{{ row.value }}</b-badge>
                            </template>

                            <template v-slot:cell(action)>
                                <b-button-group class="w-100">
                                    <b-button variant="primary">Edit</b-button>
                                    <b-button variant="danger">Delete</b-button>
                                </b-button-group>
                            </template>

                        </b-table>
                    </div>
                </b-overlay>
            </div>
        </div>

        <b-modal centered content-class="swal2-show" hide-footer id="add_new" modal-class="modal hide"
                 title="Add New User">
            <b-form @submit.prevent="create()">

                <b-form-group id="input-group-2" label="Role Name:" label-for="user-name">
                    <b-form-input
                            autofocus
                            id="user-name"
                            placeholder="Enter role name (must be unique)"
                            required
                            type="text"
                            v-model="createData.name"
                    ></b-form-input>
                </b-form-group>

                <b-overlay :show="creating">
                    <b-button :disabled="creating" block type="submit" variant="primary">Add User</b-button>
                </b-overlay>
            </b-form>
        </b-modal>

    </div>
</template>

<script>
    import Role from "../../api/role";
    import {message} from "../../utils/message";

    export default {
        name: "index",
        data() {
            return {
                loadingTable: false,
                creating: false,
                items: [],
                fields: [
                    {key: "id", label: "ID", thStyle: {width: '150px'}},
                    {key: "name", label: "Role Name"},
                    {key: "action", label: "Actions", thStyle: {width: '150px'}}
                ],
                createData: {
                    name: '',
                }
            }
        },
        methods: {
            async getRolesList() {
                this.loadingTable = true;
                await new Role().list({}).then(response => {
                    if (response.data.status) {
                        response.data.data.roles.forEach(role => {
                            this.items.push(role);
                        });
                    }
                    this.loadingTable = false;
                });
            },
            openCreateModel() {
                this.createData = {
                    name: '',
                };
                this.$bvModal.show('add_new');
            },
            create() {
                this.creating = true;
                let data = {
                    name: this.createData.name,
                };
                new Role().create(data).then(response => {
                    if (response.data.status) {
                        this.$bvModal.hide('add_new');
                        message('success', response.data.message);
                        this.getRolesList();
                    } else {
                        message('info', response.data.message)
                    }
                    this.creating = false;
                });
            },
        },
        mounted: function () {
            this.getRolesList();
        }
    }
</script>

<style scoped>
    .width-150 {
        width: 150px;
    }
</style>
