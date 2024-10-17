import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('counter', () => {
  const createUser = ref(false)
  const authSwitch = ref(false)
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : ''
  const noti = ref(false)
  const updateEmpShow = ref(true)
  const getItForUpdate = 0
  const updateInfoEmp = ref(false)
  const davomatShow = ref(false)
  const empShow = ref(true)
  const editInfo = ref({}); 
  return { 
    createUser,
    authSwitch,
    token,
    noti,
    updateEmpShow,
    getItForUpdate,
    updateInfoEmp,
    davomatShow,
    empShow,
    editInfo
  }
})
