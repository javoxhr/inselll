import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('counter', () => {
  const createUser = ref(false)
  const authSwitch = ref(false)
  const data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : {}
  // if(!data?.data) {
  //   window.location.href = 'signUp'
  // } else {
  //   window.location.href = '/'
  // }
  const noti = ref(false)
  const updateEmpShow = ref(true)
  const getItForUpdate = 0
  const updateInfoEmp = ref(false)
  const davomatShow = ref(false)
  const empShow = ref(true)
  const editInfo = ref({}); 
  const isSelected = false
  return { 
    createUser,
    authSwitch,
    data,
    noti,
    updateEmpShow,
    getItForUpdate,
    updateInfoEmp,
    davomatShow,
    empShow,
    editInfo,
    isSelected
  }
})
