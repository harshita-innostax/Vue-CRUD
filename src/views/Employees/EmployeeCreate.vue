<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Employee Details</h4>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="">Name</label>
                    <input type="text" v-model="model.employee.name" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="">Email</label>
                    <input type="email" v-model="model.employee.email" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="">Phone Number</label>
                    <input type="text" v-model="model.employee.number" class="form-control"/>
                </div>
                <div class="mb-3">
                    <button type="button" class="btn btn-primary" @click="saveData">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    name:'employeeCreate',
    data(){
        return{
            model:{
                employee:{
                    name:'',
                    email:'',
                    number:'',
                }
            }
        }
    },
    methods:{
        saveData(){
            console.log(this.model.employee);
            axios.post('http://127.0.0.1:8000/api/user',this.model.employee).then(res=>{
                console.log(res);
                this.$router.push('/employees');
            })

        }
    }
}
</script>