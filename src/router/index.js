import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView'
import ProjectDetail from '@/components/ProjectDetail'
import LocationView from '@/views/LocationView'
import NpcView from '@/views/NpcView'
import ItemView from '@/views/ItemView'
import CutSceneView from '@/views/CutSceneView'
import FamilyTreeView from '@/views/FamilyTreeView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },

  {
    path: '/projects/:id',
    name: 'projectDetail',
    component: ProjectDetail,
  },

  {
    path: '/locations/:id?',
    name: 'locationView',
    component: LocationView,
  },

  {
    path: '/npc/:id?',
    name: 'NpcView',
    component: NpcView,
  },

  {
    path: '/family-tree',
    name: 'FamilyTreeView',
    component: FamilyTreeView,
  },

  {
    path: '/items/:id?',
    name: 'ItemView',
    component: ItemView,
  },

  {
    path: '/cut-scenes/:id?',
    name: 'CutSceneView',
    component: CutSceneView,
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
