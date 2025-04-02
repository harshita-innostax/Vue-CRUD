<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>
          Employee Table
          <button @click="openCreateModal" class="btn btn-primary float-end">
            Add Employee
          </button>
          >
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
          <tbody v-if="this.employees.length > 0">
            <tr v-for="(employee, index) in this.employees" :key="index">
              <td>{{ employee.id }}</td>
              <td>
                <input
                  v-if="employee.isEditing"
                  v-model="employee.editableName"
                  class="form-control"
                />
                <span v-else>{{ employee.name }}</span>
              </td>
              <td>
                <input
                  v-if="employee.isEditing"
                  v-model="employee.editableEmail"
                  class="form-control"
                />
                <span v-else>{{ employee.email }}</span>
              </td>
              <td>
                <input
                  v-if="employee.isEditing"
                  v-model="employee.editablePhone"
                  class="form-control"
                />
                <span v-else>{{ employee.password }}</span>
              </td>
              <td>
                <button
                  v-if="!employee.isEditing"
                  @click="editEmployee(employee)"
                  class="btn btn-success"
                >
                  Edit
                </button>
                <button
                  v-if="employee.isEditing"
                  @click="saveEmployee(employee)"
                  class="btn btn-primary"
                >
                  Save
                </button>
                <button
                  v-if="employee.isEditing"
                  @click="cancelEdit(employee)"
                  class="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  @click="openDeleteModal(employee.id)"
                  class="btn btn-danger"
                >
                  Delete
                </button>
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
    <CustomModal
      :show="showDeleteModal"
      :confirmText="'Yes, Delete'"
      @confirm="deleteEmployee"
      @close="showDeleteModal = false"
    >
      <h4>Are you sure you want to delete this employee?</h4>
    </CustomModal>

    <CustomModal
      :show="showCreateModal"
      :confirmText="'Create Employee'"
      @confirm="createEmployee"
      @close="showCreateModal = false"
    >
      <h4>Add Employee Details</h4>
      <input
        v-model="newEmployee.name"
        class="form-control mb-2"
        placeholder="Name"
      />
      <input
        v-model="newEmployee.email"
        class="form-control mb-2"
        placeholder="Email"
      />
      <input
        v-model="newEmployee.number"
        class="form-control mb-2"
        placeholder="Phone Number"
      />
    </CustomModal>
  </div>
</template>

<script>
import axios from "axios";
import CustomModal from "./CustomModal.vue";

export default {
  name: "employees",
  components: {
    CustomModal,
  },
  data() {
    return {
      employees: [],
      showDeleteModal: false,
      showCreateModal: false,
      selectedEmployeeId: null,
      newEmployee: {
        name: "",
        email: "",
        number: "",
      },
    };
  },
  mounted() {
    this.getEmployees();
  },
  methods: {
    getEmployees() {
      axios.get("http://127.0.0.1:8000/api/users").then((res) => {
        this.employees = res.data.map((employee) => ({
          ...employee,
          isEditing: false,
          editableName: employee.name,
          editableEmail: employee.email,
          editablePhone: employee.password,
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
      axios
        .put(`http://127.0.0.1:8000/api/user/${employee.id}`, {
          name: employee.editableName,
          email: employee.editableEmail,
          number: employee.editablePhone,
        })
        .then((res) => {
          alert("Employee updated successfully!", res.data.message);

          employee.name = employee.editableName;
          employee.email = employee.editableEmail;
          employee.password = employee.editablePhone;
          employee.isEditing = false;
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    },
    openDeleteModal(id) {
      this.selectedEmployeeId = id;
      this.showDeleteModal = true;
      console.log(this.showDeleteModal);
    },
    deleteEmployee(id) {
      if (this.selectedEmployeeId) {
        axios
          .delete(`http://127.0.0.1:8000/api/user/${this.selectedEmployeeId}`)
          .then(() => {
            this.getEmployees();
          })
          .catch(function (error) {
            if (error.response) {
              if (error.response.status == 404) {
                alert(error.response.data.message);
              }
            }
          })
          .finally(() => {
            this.showDeleteModal = false; // Close modal
          });
      }
    },
    openCreateModal() {
      this.showCreateModal = true;
    },
    createEmployee() {
      axios
        .post("http://127.0.0.1:8000/api/user", this.newEmployee)
        .then(() => {
          this.getEmployees();
          this.showCreateModal = false;
          this.newEmployee = { name: "", email: "", number: "" };
        });
    },
  },
};
</script>
