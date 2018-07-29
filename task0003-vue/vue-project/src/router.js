import Vue from 'vue'
import Router from 'vue-router'
// import TaskList from '@/components/taskList'
import { readdirSync } from 'fs'

Vue.use(Router)

let routes = []

const modules = readdirSync(`${__dirname}/modules`)

modules.forEach(module => {
  try {
    routes = routes.concat(require(`./modules/${module}/routes.js`).default)
  } catch (err) {
    console.warn(err.message)
  }
})

const router = new Router({
  routes
})

export default router
