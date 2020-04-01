<template>
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-header">
                    <b-button @click="openCreateModel" variant="primary">Add New</b-button>
                    <el-select @change="getUsersList" class="float-right" placeholder="Short Direction"
                               v-model="short_direction">
                        <el-option value="asc"/>
                        <el-option value="desc"/>
                    </el-select>
                    <el-select @change="getUsersList" class="float-right" v-model="selected_role">
                        <el-option :value="null" label="select role"/>
                        <el-option :key="role" :label="role" :value="role" v-for="role in roles"/>
                    </el-select>
                    <el-select @change="getUsersList" class="float-right" v-model="perPage">
                        <el-option label="items per page 5" value="5"/>
                        <el-option label="items per page 10" value="10"/>
                        <el-option label="items per page 15" value="15"/>
                        <el-option label="items per page 20" value="20"/>
                        <el-option label="items per page 50" value="50"/>
                        <el-option label="items per page 100" value="100"/>
                    </el-select>
                </div>
                <!-- /.card-header -->
                <b-overlay :show="loadingTable">
                    <div class="card-body">
                        <b-table :fields="fields" :items="items" bordered hover responsive="sm" sticky-header=""
                                 striped>

                            <template v-slot:cell(roles)="roles">
                                <span :key="role.id" class="badge badge-info right mr-1" v-for="role in roles.value">{{ role.name }}</span>
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
                <!-- /.card-body -->
                <div class="card-footer clearfix">
                    <b-pagination
                            :per-page="perPage"
                            :total-rows="total"
                            @input="getUsersList"
                            v-model="currentPage"
                    ></b-pagination>
                </div>
            </div>
        </div>

        <b-modal centered content-class="swal2-show" hide-footer id="add_new" modal-class="modal hide"
                 title="Add New User">
            <b-form @submit.prevent="createUser()">
                <b-form-group
                        id="input-group-1"
                        label="Full name:"
                        label-for="input-11"
                >
                    <b-row>
                        <b-col>
                            <b-form-input
                                    autofocus
                                    id="input-11"
                                    placeholder="First Name"
                                    required
                                    type="text"
                                    v-model="temp.fname"
                            ></b-form-input>
                        </b-col>
                        <b-col>
                            <b-form-input
                                    id="input-12"
                                    placeholder="Last Name"
                                    required
                                    type="text"
                                    v-model="temp.lname"
                            ></b-form-input>
                        </b-col>
                    </b-row>
                </b-form-group>

                <b-form-group id="input-group-2" label="Your email address:" label-for="input-2">
                    <b-form-input
                            id="input-2"
                            placeholder="Enter email address"
                            required
                            type="email"
                            v-model="tempCreateData.email"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="Your phone number:" label-for="input-3">
                    <b-form-input
                            id="input-3"
                            placeholder="Enter phone number"
                            required
                            type="tel"
                            v-model="tempCreateData.phone"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-4" label="User roles:" label-for="input-3">
                    <multiselect
                            :multiple="true"
                            :options="roles"
                            v-model="tempCreateData.roles">
                    </multiselect>
                </b-form-group>

                <b-overlay :show="creating">
                    <b-button :disabled="creating" block type="submit" variant="primary">Add User</b-button>
                </b-overlay>
            </b-form>
        </b-modal>

    </div>
</template>

<script>
    import Role from './../../api/role';
    import UserResource from './../../api/user'
    import {message} from "../../utils/message";

    export default {
        name: "index",
        data() {
            return {
                loadingTable: false,
                creating: false,
                currentPage: 1,
                total: 0,
                perPage: 15,
                short_direction: 'desc',
                selected_role: null,
                items: [],
                fields: [
                    {key: "id", label: "ID", thStyle: {width: '150px'}},
                    'name',
                    'email',
                    'phone',
                    'roles',
                    {key: "action", label: "Actions", thStyle: {width: '150px'}}
                ],
                temp: {
                    fname: '',
                    lname: '',
                },
                tempCreateData: {
                    email: '',
                    phone: '',
                    roles: [],
                },
                roles: []
            }
        },
        computed: {
            createData() {
                return {
                    name: this.temp.fname + ' ' + this.temp.lname,
                    ...this.tempCreateData
                }
            }
        },
        methods: {
            createUser() {
                this.creating = true;
                let data = {
                    name: this.createData.name,
                    email: this.createData.email,
                    phone: this.createData.phone,
                    roles: this.createData.roles,
                };
                new UserResource().create(data).then(response => {
                    if (response.data.status) {
                        this.$bvModal.hide('add_new');
                        message('success', response.data.message);
                        this.getUsersList();
                    } else {
                        message('info', response.data.message)
                    }
                    this.creating = false;
                });
            },
            openCreateModel() {
                this.temp = {
                    fname: '',
                    lname: '',
                };
                this.tempCreateData = {
                    email: '',
                    phone: '',
                    roles: [],
                };
                this.$bvModal.show('add_new');
            },
            async getRolesList() {
                await new Role().list({}).then(response => {
                    if (response.data.status) {
                        response.data.data.roles.forEach(role => {
                            this.roles.push(role.name);
                        });
                    }
                });
            },
            async getUsersList() {
                this.loadingTable = true;
                await new UserResource().list({
                    page: this.currentPage,
                    perPage: this.perPage,
                    short_direction: this.short_direction,
                    role: this.selected_role,
                }).then(response => {
                    if (response.data.status) {
                        this.currentPage = response.data.data.current_page;
                        this.total = response.data.data.total;
                        this.items = [];

                        response.data.data.data.forEach(user => {
                            this.items.push({
                                ...user,
                                action: null
                            });

                        });
                    }
                    this.loadingTable = false;
                });
            }
        },
        mounted: function () {
            this.getUsersList();
            this.getRolesList();
        }
    }
</script>
