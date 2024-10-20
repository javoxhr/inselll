<script>
import { getUsers } from '@/services/services.js';
import { fetchDavomatFromApi } from '@/services/services.js';
import createEmp from '@/components/createEmp.vue';
import empCard from '@/components/empCard.vue';
import register from '@/components/register.vue';
import { useStore } from '@/stores/counter';
import updateEmp from '@/components/updateEmp.vue';
import davomatCard from '@/components/davomatCard.vue';
import { enterUser, closeUser } from "@/services/services";
import { useToast } from 'vue-toastification';

export default {
  components: {
    createEmp,
    empCard,
    register,
    updateEmp,
    davomatCard
  },
  data() {
    return {
      users: [],
      store: useStore(),
      limit: 5,
      page: 0,
      loading: false,
      davomatUsers: {
        page: 0,
        current_page: 0,
        limit: 25,
        data: [],
        user_data: []
      },
      noMoreData: false,
      selectedUsers: [],
      toast: null
    }
  },
  mounted() {
    this.toast = useToast();
  },
  methods: {
    async fetchUsers() {
      if (this.loading || this.noMoreData) return;
      this.loading = true;

      try {
        const res = await getUsers(this.page);

        console.log('Текущая страница:', this.page);
        console.log('Ответ API:', res);

        if (res && res.users && Array.isArray(res.users)) {
          console.log('Количество пользователей:', res.users.length);
          this.users.push(...res.users);
          console.log('Текущий массив пользователей:', this.users);

          if (res.pages > this.page) {
            this.page += 1;
            console.log('Данные загружены, продолжаем скроллирование');
          } else {
            this.noMoreData = true;
            console.log('Больше нет страниц для загрузки');
          }
        } else {
          console.warn('Получены некорректные данные от API.');
        }
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error.message || error);
        localStorage.removeItem('data')
        window.location.reload(true)
      } finally {
        this.loading = false;
        this.scrollToTop();
      }
    },

    handleSelection({ user, selected }) {
      if (selected) {
        this.selectedUsers.push(user)
      } else {
        this.selectedUsers = this.selectedUsers.filter(u => u.id !== user.id);
      }
    },

    toggleAll(event) {
      const checked = event.target.checked;
      this.selectedUsers = checked ? [...this.davomatUsers] : [];
    },

    async submitAttendance() {
      if (this.selectedUsers.length === 0) {
        this.toast.error("Выберите хотя бы одного пользователя");
        return;
      }

      const userIds = this.selectedUsers.map(user => ({ user_id: user.Davomat.user_id }));

      try {
        const res = await enterUser(userIds);
        if (res?.status === 200) {
          this.toast.success("Amalyot bajarildi");
          this.selectedUsers = [];
        }
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
        this.toast.info("Hodim kelganlar ro'yhatida mavjud");
      }
    },

    async submitAttendanceClose() {
      if (this.selectedUsers.length === 0) {
        this.toast.error("Выберите хотя бы одного пользователя");
        return;
      }

      const userIds = this.selectedUsers.map(user => ({ user_id: user.Davomat.davomat_id }));

      try {
        const res = await closeUser(userIds);
        if (res?.status === 200) {
          this.toast.success("Amaliyot muvaffaqiyatli amalga oshirildi");
          this.selectedUsers = [];
        }
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
        this.toast.info("Hodim kelganlar ro'yhatida mavjud");
      }
    },

    scrollToTop() {
      const container = this.$refs.userContainer;

      if (container) {
        container.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } else {
        console.warn('Контейнер не найден.');
      }
    },


    handleScroll(event) {
      const { scrollTop, scrollHeight, clientHeight } = event.target;

      if (scrollTop + clientHeight >= scrollHeight - 10 && !this.loading && !this.noMoreData) {
        this.fetchUsers();
      }
    },

    async getDavomat() {
      try {
        const branchId = 1
        const userId = 32
        const fromTime = '2024-01-01'
        const toTime = '2024-12-31'
        const page = 0
        const limit = 25

        const res = await fetchDavomatFromApi(branchId, userId, fromTime, toTime, page, limit);

        this.davomatUsers = res.data;
        console.log(this.davomatUsers);


        // res.data.user_data for(user)
        // res.data.data.filter((e){ user.id == e})

        // res.data.user_data.forEach((el)=> { 
        //   res.data.data.forEach((us)=> {
        //     if(el.id == us?.Davomat.user_id) {
        //       console.log(el.id)
        //       console.log(us.id)
        //     }
        //   })
        // })


      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    },
    findDavomat(id) {
      let obj = this.davomatUsers.data.find((e) => {
        return e.Davomat.user_id == id
      })
      return obj
    }


  },

  mounted() {
    this.fetchUsers();
    this.getDavomat();
    this.toast = useToast();
    // if(!this.store.data.data.access_token) {
    //   console.log(true)
    // } else {
    //   console.log(false)
    //   window.location.href = "signUp"
    // }
  }
}
</script>

<template>
  <div class="pl-[20px] pr-[20px]">
    <updateEmp v-if="store.updateEmpShow" />
    <register />
    <button @click="store.authSwitch = true"
      class="p-[10px] bg-orange-600 rounded-[5px] absolute top-[110px] right-[30px]">Authorization</button>
    <div class="w-full flex gap-[20px]">
      <div class="left-nav-bar-items flex flex-col gap-[10px] mt-[20px]">
        <div style="border: 1px solid rgba(178 173 173);"
          class="left-nav-bar-item p-[10px] flex flex-col items-center w-[130px] gap-[5px] rounded-[5px]">
          <svg class="w-[20px]" id="Layer_1_1_" fill="rgba(178 173 173)" style="enable-background:new 0 0 16 16;"
            version="1.1" viewBox="0 0 16 16" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <polygon
              points="15,5 11,5 11,15 10,15 10,0 6,0 6,15 5,15 5,8 1,8 1,15 0,15 0,16 1,16 5,16 6,16 10,16 11,16 15,16 16,16 16,15   15,15 " />
          </svg>
          <span class="text-[14px] text-[#c9c9c9]">Hisobotlar</span>
        </div>

        <div
          class="left-nav-bar-item p-[10px] bg-orange-600 flex flex-col items-center w-[130px] gap-[5px] rounded-[5px]">
          <!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.0//EN' 'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'><svg
            enable-background="new 0 0 24 24" class="w-[30px]" fill="rgba(178 173 173)" id="Layer_1" version="1.0"
            viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <g>
              <path
                d="M9,9c0-1.7,1.3-3,3-3s3,1.3,3,3c0,1.7-1.3,3-3,3S9,10.7,9,9z M12,14c-4.6,0-6,3.3-6,3.3V19h12v-1.7C18,17.3,16.6,14,12,14z   " />
            </g>
            <g>
              <g>
                <circle cx="18.5" cy="8.5" r="2.5" />
              </g>
              <g>
                <path
                  d="M18.5,13c-1.2,0-2.1,0.3-2.8,0.8c2.3,1.1,3.2,3,3.2,3.2l0,0.1H23v-1.3C23,15.7,21.9,13,18.5,13z" />
              </g>
            </g>
            <g>
              <g>
                <circle cx="18.5" cy="8.5" r="2.5" />
              </g>
              <g>
                <path
                  d="M18.5,13c-1.2,0-2.1,0.3-2.8,0.8c2.3,1.1,3.2,3,3.2,3.2l0,0.1H23v-1.3C23,15.7,21.9,13,18.5,13z" />
              </g>
            </g>
            <g>
              <g>
                <circle cx="5.5" cy="8.5" r="2.5" />
              </g>
              <g>
                <path d="M5.5,13c1.2,0,2.1,0.3,2.8,0.8c-2.3,1.1-3.2,3-3.2,3.2l0,0.1H1v-1.3C1,15.7,2.1,13,5.5,13z" />
              </g>
            </g>
          </svg>
          <span class="text-[14px] text-[#c9c9c9]">Hodimlar</span>
        </div>

        <div style="border: 1px solid rgba(178 173 173);"
          class="left-nav-bar-item p-[10px] flex flex-col items-center w-[130px] gap-[5px] rounded-[5px]">
          <svg class="w-[23px]" fill="rgba(178 173 173)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title />
            <g id="invoice">
              <path
                d="M22,9H19V2a1,1,0,0,0-1.6-.8L15.33,2.75C12.21.42,13.1.42,10,2.75,6.89.42,7.77.42,4.66,2.75L2.6,1.2A1,1,0,0,0,1,2V20a3,3,0,0,0,3,3H20a3,3,0,0,0,3-3V10A1,1,0,0,0,22,9ZM4,21a1,1,0,0,1-1-1V4c2,1.47,1.41,1.44,4.33-.75,3.1,2.33,2.22,2.33,5.33,0,3,2.24,2.42,2.19,4.34.75,0,16.75-.08,16.3.17,17Zm17-1a1,1,0,0,1-2,0V11h2Z" />
              <path d="M6,10H9A1,1,0,0,0,9,8H6A1,1,0,0,0,6,10Z" />
              <path d="M14,12H6a1,1,0,0,0,0,2h8A1,1,0,0,0,14,12Z" />
              <path d="M14,16H6a1,1,0,0,0,0,2h8A1,1,0,0,0,14,16Z" />
            </g>
          </svg>
          <span class="text-[14px] text-[#c9c9c9]">Savdo</span>
        </div>

        <div style="border: 1px solid rgba(178 173 173);"
          class="left-nav-bar-item p-[10px] flex flex-col items-center w-[130px] gap-[5px] rounded-[5px]">
          <!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.0//EN' 'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'><svg
            enable-background="new 0 0 24 24" class="w-[23px]" fill="rgba(178 173 173)" id="Layer_1" version="1.0"
            viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <g>
              <circle cx="18.5" cy="6.5" r="2.5" />
            </g>
            <g>
              <circle cx="5.5" cy="6.5" r="2.5" />
            </g>
            <g>
              <circle cx="12" cy="5" r="3" />
            </g>
            <path
              d="M18.5,10c-0.5,0-1.6,0.2-2,0.5c0,0,0.5,1.1,0.5,2.5c0,0-1.2-4-5-4s-5,4-5,4c0-1.4,0.5-2.5,0.5-2.5C7.1,10.2,6,10,5.5,10  C3.8,10,2,12,2,13.3V19c0,1.1,0.9,2,2,2h2.9c0.9-0.9,2.5-2,5.1-2s4.2,1.1,5.1,2H20c1.1,0,2-0.9,2-2v-5.7C22,12,20,10,18.5,10z   M12,18c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5s2.5,1.1,2.5,2.5C14.5,16.9,13.4,18,12,18z" />
          </svg>
          <span class="text-[14px] text-[#c9c9c9]">Mijozlar</span>
        </div>

        <div style="border: 1px solid rgba(178 173 173);"
          class="left-nav-bar-item p-[10px] flex flex-col items-center w-[130px] gap-[5px] rounded-[5px]">
          <!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg
            class="w-[25px]" enable-background="new 0 0 32 32" version="1.1" viewBox="0 0 32 32" xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Layer_1" />
            <g id="Layer_2">
              <g>
                <line fill="rgba(178 173 173)" stroke="rgba(178 173 173)" stroke-linecap="round" stroke-linejoin="round"
                  stroke-miterlimit="10" stroke-width="2" x1="16" x2="16" y1="10" y2="12" />
                <line fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                  stroke-width="2" x1="16" x2="16" y1="20" y2="22" />
                <path d="    M14,20h3c1.1,0,2-0.9,2-2s-0.9-2-2-2h-2c-1.1,0-2-0.9-2-2s0.9-2,2-2h3" fill="none"
                  stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                  stroke-width="2" />
                <path d="    M16,6c5.5,0,10,4.5,10,10s-4.5,10-10,10S6,21.5,6,16v-3" fill="none"
                  stroke="rgba(178 173 173)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                  stroke-width="2" />
                <polyline fill="rgba(178 173 173)" points="    10,17 6,13 2,17   " stroke="rgba(178 173 173)"
                  stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <path d="    M16,2c7.7,0,14,6.3,14,14s-6.3,14-14,14" fill="none" stroke="rgba(178 173 173)"
                  stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
              </g>
            </g>
          </svg>
          <span class="text-[14px] text-[#c9c9c9]">Nasiyalar</span>
        </div>

        <div style="border: 1px solid rgba(178 173 173);"
          class="left-nav-bar-item p-[10px] flex flex-col items-center w-[130px] gap-[5px] rounded-[5px]">
          <svg height="24" fill="rgba(178 173 173)" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20,8 L20,4 L4,4 L4,8 L20,8 Z M20,16 L4,16 L4,20 L20,20 L20,16 Z M4,2 L20,2 C21.1045695,2 22,2.8954305 22,4 L22,20 C22,21.1045695 21.1045695,22 20,22 L4,22 C2.8954305,22 2,21.1045695 2,20 L2,4 C2,2.8954305 2.8954305,2 4,2 Z M4,10 L4,14 L20,14 L20,10 L4,10 Z M8,11 L15,11 L15,13 L8,13 L8,11 Z M17,7 C16.4477153,7 16,6.55228475 16,6 C16,5.44771525 16.4477153,5 17,5 C17.5522847,5 18,5.44771525 18,6 C18,6.55228475 17.5522847,7 17,7 Z M17,13 C16.4477153,13 16,12.5522847 16,12 C16,11.4477153 16.4477153,11 17,11 C17.5522847,11 18,11.4477153 18,12 C18,12.5522847 17.5522847,13 17,13 Z M17,19 C16.4477153,19 16,18.5522847 16,18 C16,17.4477153 16.4477153,17 17,17 C17.5522847,17 18,17.4477153 18,18 C18,18.5522847 17.5522847,19 17,19 Z"
              fill-rule="evenodd" />
          </svg>
          <span class="text-[14px] text-[#c9c9c9]">Ta'minotlar</span>
        </div>

        <div style="border: 1px solid rgba(178 173 173);"
          class="left-nav-bar-item p-[10px] flex flex-col items-center w-[130px] gap-[5px] rounded-[5px]">
          <svg fill="rgba(178 173 173)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 10c3.976 0 8-1.374 8-4s-4.024-4-8-4-8 1.374-8 4 4.024 4 8 4z" />
            <path d="M4 10c0 2.626 4.024 4 8 4s8-1.374 8-4V8c0 2.626-4.024 4-8 4s-8-1.374-8-4v2z" />
            <path d="M4 14c0 2.626 4.024 4 8 4s8-1.374 8-4v-2c0 2.626-4.024 4-8 4s-8-1.374-8-4v2z" />
            <path d="M4 18c0 2.626 4.024 4 8 4s8-1.374 8-4v-2c0 2.626-4.024 4-8 4s-8-1.374-8-4v2z" />
          </svg>
          <span class="text-[14px] text-[#c9c9c9]">Kassa</span>
        </div>

        <div style="border: 1px solid rgba(178 173 173);"
          class="left-nav-bar-item p-[10px] flex flex-col items-center w-[130px] gap-[5px] rounded-[5px]">
          <svg class="w-[20px]" id="Layer_1_1_" fill="rgba(178 173 173)" style="enable-background:new 0 0 16 16;"
            version="1.1" viewBox="0 0 16 16" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <polygon
              points="15,5 11,5 11,15 10,15 10,0 6,0 6,15 5,15 5,8 1,8 1,15 0,15 0,16 1,16 5,16 6,16 10,16 11,16 15,16 16,16 16,15   15,15 " />
          </svg>
          <span class="text-[14px] text-[#c9c9c9]">Harajatlar</span>
        </div>

        <div style="border: 1px solid rgba(178 173 173);"
          class="left-nav-bar-item p-[10px] flex flex-col items-center w-[130px] gap-[5px] rounded-[5px]">
          <svg class="w-[20px]" id="Layer_1_1_" fill="rgba(178 173 173)" style="enable-background:new 0 0 16 16;"
            version="1.1" viewBox="0 0 16 16" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <polygon
              points="15,5 11,5 11,15 10,15 10,0 6,0 6,15 5,15 5,8 1,8 1,15 0,15 0,16 1,16 5,16 6,16 10,16 11,16 15,16 16,16 16,15   15,15 " />
          </svg>
          <span class="text-[14px] text-[#c9c9c9]">Mahsulotlar</span>
        </div>

        <div style="border: 1px solid rgba(178 173 173);"
          class="left-nav-bar-item p-[10px] flex flex-col items-center w-[130px] gap-[5px] rounded-[5px]">
          <svg class="w-[20px]" id="Layer_1_1_" fill="rgba(178 173 173)" style="enable-background:new 0 0 16 16;"
            version="1.1" viewBox="0 0 16 16" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <polygon
              points="15,5 11,5 11,15 10,15 10,0 6,0 6,15 5,15 5,8 1,8 1,15 0,15 0,16 1,16 5,16 6,16 10,16 11,16 15,16 16,16 16,15   15,15 " />
          </svg>
          <span class="text-[14px] text-[#c9c9c9]">Omborlar</span>
        </div>
      </div>

      <div class="employees w-full">
        <div class="employees-wrapper">
          <h2 class="text-[40px] text-orange-600 font-semibold">HODIMLAR</h2>
          <div class="employees-btns flex items-center gap-[20px]">
            <button style="border: 1px solid;" :style="{ 'color': store.empShow ? '#fff' : 'rgba(178 173 173)' }"
              class="w-full p-[8px] text-[#fff]" :class="{ 'bg-orange-600': store.empShow }"
              @click="store.empShow = true, store.davomatShow = false">Hodimlar</button>
            <button style="border: 1px solid;" :style="{ 'color': store.davomatShow ? '#fff' : 'rgba(178 173 173)' }"
              class="w-full p-[8px]" :class="{ 'bg-orange-600': store.davomatShow }"
              @click="store.empShow = false, store.davomatShow = true">Davomat</button>
          </div>
          <div class="employees-info mt-[11px]" v-if="store.empShow">
            <div class="employees-info-search">
              <form class="flex items-center">
                <input style="border: 1px solid rgba(178 173 173); width: 260px;"
                  class="bg-transparent p-[7px] pl-[15px] rounded-[3px]" type="text" placeholder="Qidiruv">
                <button @click="store.createUser = !store.createUser" type="button"
                  class="bg-green-600 rounded-[3px] text-[20px] pt-[5px] pb-[5px] pl-[15px] pr-[15px]">+</button>
              </form>
              <createEmp />
            </div>

            <div ref="userContainer" @scroll="handleScroll" style="overflow: auto; height: 700px;"
              class="emp-cards-wrapper flex flex-col gap-[20px] mt-[20px]">
              <div v-for="user in users" :key="user.id">
                <empCard :user="user" />
              </div>
            </div>
          </div>

          <div class="attend mt-[40px]" v-if="store.davomatShow">
            <!-- <pre>
              {{ davomatUsers.user_data }}
            </pre> -->
            <div style="border: 1px solid rgba(178 173 173);" class="attend-wrapper rounded-[10px] p-[15px] pb-[30px]">
              <button v-if="selectedUsers.length" @click="submitAttendance"
                class="pt-[10px] pb-[10px] pl-[20px] pr-[20px] bg-green-600 fixed bottom-2 rounded-[5px] right-[190px]">
                Keldi {{ selectedUsers.length }} ta hodim
              </button>
              <button v-if="selectedUsers.length" @click="submitAttendanceClose"
                class="pt-[10px] pb-[10px] pl-[20px] pr-[20px] bg-red-600 fixed bottom-2 rounded-[5px] right-5">
                Ketdi {{ selectedUsers.length }} ta hodim
              </button>
              <table class="w-full border-collapse">
                <thead>
                  <tr class="attend-top pb-[12px] mt-[10px]">
                    <th style="color: rgba(178, 173, 173);" class="border p-2">
                      <input class="check-inp w-[25px] h-[25px] mt-[6px]" type="checkbox" @change="toggleAll" />
                    </th>
                    <th style="color: rgba(178, 173, 173);" class="border p-2">Ismi</th>
                    <th style="color: rgba(178, 173, 173);" class="border p-2">Keldi</th>
                    <th style="color: rgba(178, 173, 173);" class="border p-2">Ketdi</th>
                    <th style="color: rgba(178, 173, 173);" class="border p-2">Jarima/Bonus</th>
                  </tr>
                </thead>

                <tbody>
                  <!-- <davomatCard v-for="(item) in users" :key="item.id" :attend="item" @select-attend="handleSelection" /> -->
                  <tr v-for="item in davomatUsers?.user_data" :key="item">
                    <td style="text-align: center;" class="border p-2">
                      <input type="checkbox" v-model="isSelected" @change="toggleSelection"
                        class="check-inp w-[25px] h-[25px] mt-[6px]" />
                    </td>
                    <td style="color: rgba(178, 173, 173);" class="border p-2" @click="closeUser()">{{ item?.name }}
                    </td>
                    <td style="color: rgba(178, 173, 173);" class="border p-2">{{
                      findDavomat(item.id)?.Davomat?.kelgan_vaqt }}</td>
                    <td style="color: rgba(178, 173, 173);" class="border p-2">{{
                      findDavomat(item.id)?.Davomat?.ketgan_vaqt }}</td>
                    <td style="color: rgba(178, 173, 173);" class="border p-2 flex flex-col">{{ findDavomat(item.id)?.Davomat?.money }} <span>{{ findDavomat(item.id)?.Davomat.money2 }}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style>
.left-nav-bar-items {
  width: 150px;
  height: 700px;
  overflow: auto;
}

.left-nav-bar-items::-webkit-scrollbar {
  display: none;
}

.emp-cards-wrapper::-webkit-scrollbar {
  display: none;
}
</style>