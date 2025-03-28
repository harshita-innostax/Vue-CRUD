import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmployeesView from "../views/Employees/EmployeesView.vue"
import EmployeeCreate from "../views/Employees/EmployeeCreate.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/employees',
      name: 'employee',
      component: EmployeesView,
    },
    {
      path: '/employee/create',
      name: 'employeeCreate',
      component: EmployeeCreate,
    }
  ],
})

export default router
