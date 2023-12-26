import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import './assets/main.scss'
import { createServer } from 'miragejs'
import DB from '../database.mock.json'

createServer({
  routes() {
    this.get("/api/categories", () => DB.categories)
    this.get("/api/products", () => DB.products)
  },
})

createApp(App).use(store).mount('#app')
