<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <h4>Employee Table
            <RouterLink to="/employee/create" class="btn btn-primary float-end">Add Employee</RouterLink>
          </h4>
        </div>
        <div class="card-body">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody v-if="this.employees.length >0">
                    <tr v-for="(employee,index) in this.employees":key='index'>
                        <td>{{employee.id}}</td>
                        <td><input v-if="employee.isEditing" v-model="employee.editableName" class="form-control" />
                            <span v-else>{{ employee.name }}</span></td>
                        <td><input v-if="employee.isEditing" v-model="employee.editableEmail" class="form-control" />
                            <span v-else>{{ employee.email }}</span></td>
                        <td><input v-if="employee.isEditing" v-model="employee.editablePhone" class="form-control" />
                            <span v-else>{{ employee.password }}</span></td>
                        <td>
                            <button v-if="!employee.isEditing" @click="editEmployee(employee)" class="btn btn-success">Edit</button>
                            <button v-if="employee.isEditing" @click="saveEmployee(employee)" class="btn btn-primary">Save</button>
                            <button v-if="employee.isEditing" @click="cancelEdit(employee)" class="btn btn-secondary">Cancel</button>
                            <button type="button" @click="deleteEmployee(employee.id)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="4">Loading.....</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  </template>


<script>
import axios from 'axios';

export default{
    name:'employees',
    data(){
        return{
            employees:[]
        }
    },
    mounted(){
        this.getEmployees();
    },
    methods:{
        getEmployees(){
            axios.get('http://127.0.0.1:8000/api/users').then(res => {
                this.employees = res.data.map(employee => ({
                    ...employee,
                    isEditing: false,
                    editableName: employee.name,
                    editableEmail: employee.email,
                    editablePhone: employee.password
                }));
            });
        },
        editEmployee(employee) {
            employee.isEditing = true;
        },
        cancelEdit(employee) {
            employee.editableName = employee.name;
            employee.editableEmail = employee.email;
            employee.editablePhone = employee.password;
            employee.isEditing = false;
        },
        saveEmployee(employee) {
            axios.put(`http://127.0.0.1:8000/api/user/${employee.id}`, {
                name: employee.editableName,
                email: employee.editableEmail,
                number: employee.editablePhone
            })
            .then(res => {
                alert("Employee updated successfully!",res.data.message);

                employee.name = employee.editableName;
                employee.email = employee.editableEmail;
                employee.password = employee.editablePhone;
                employee.isEditing = false;
            })
            .catch(error => {
                console.error("Error updating employee:", error);
            });
        },
        deleteEmployee(id){
            console.log(id);
            if(confirm('Are you sure ?')){
                axios.delete(`http://127.0.0.1:8000/api/user/${id}`).then(res=>{
                    alert(res.data.message);
                    this.getEmployees();
                }).catch(function(error){
                    if(error.response){
                        if(error.response.status==404){
                            alert(error.response.data.message);
                        }
                    }
                });
            }

        }
    }
}
</script>
  