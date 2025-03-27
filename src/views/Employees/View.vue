<template>
    <div class="container">
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
                        <td>{{employee.name}}</td>
                        <td>{{employee.email}}</td>
                        <td>{{employee.password}}</td>
                        <td>
                            <RouterLink to="/" class="btn btn-success">Edit</RouterLink>
                            <button type="button" class="btn btn-danger">Delete</button>
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
            axios.get('http://127.0.0.1:8000/api/users').then(res=>{
                this.employees= res.data
                console.log(this.employees);
            });
        }
    }
}
</script>
  