<script>
import { useStore } from './stores/counter';
export default {
  computed: {
    showHeaderAndFooter() {
      return this.$route.name !== 'signUp';
    }
  },
  data() {
    return {
      mode: '#000',
      store: useStore()
    }
  },
  methods: {
    darkMod() {
      const body = document.querySelector('body')
      const modeBtnNig = document.querySelector('#mode-btn')
      const modeBtnDark = document.querySelector('#mode-btn-sub')
      modeBtnDark.style.display = 'none'
      modeBtnNig.addEventListener('click', () => {
        body.style.background = '#fff'
        modeBtnDark.style.display = 'flex'
        modeBtnNig.style.display = 'none'
        modeBtnDark.addEventListener('click', () => {
          body.style.background = '#000'
          modeBtnDark.style.display = 'none'
          modeBtnNig.style.display = 'block'
        })
      })
    }
  },
  mounted() {
    this.darkMod()
  }
}
</script>

<template>
  <div>
    <header v-if="showHeaderAndFooter" class="p-[20px]">
      <div class="header-wrapper flex items-center justify-between pt-[15px] w-full">
        <router-link to="/">
          <h2 class="text-[30px]"><img class="w-[150px]" src="@/assets/images/png/logo.png" alt=""></h2>
        </router-link>
        <div class="header-btns flex items-center gap-[20px]">
          <button id="mode-btn" class="w-300">
            <svg class="w-[30px]" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="rgba(178 173 173)">
              <title />
              <g data-name="Layer 88" id="Layer_88">
                <path
                  d="M18,27H14a2,2,0,0,1-2-2V21.16a10,10,0,0,1-6-9.47A10.14,10.14,0,0,1,15.69,2h0A10,10,0,0,1,20,21.16V25A2,2,0,0,1,18,27ZM15.75,4A8.12,8.12,0,0,0,8,11.75a8,8,0,0,0,5.33,7.79,1,1,0,0,1,.67.94V25h4V20.48a1,1,0,0,1,.67-.94,8,8,0,0,0,2.9-13.28A7.85,7.85,0,0,0,15.75,4Z" />
                <path d="M19,30H13a1,1,0,0,1,0-2h6a1,1,0,0,1,0,2Z" />
                <path
                  d="M15,24V19.48a9,9,0,0,1-6-8.76c.09-3,1.71-4.93,4.52-6.32C9.49,4.47,7.12,8,7,11.72a9,9,0,0,0,6,8.76V25a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1H16A1,1,0,0,1,15,24Z" />
              </g>
            </svg>
          </button>
          <button id="mode-btn-sub" class="w-300">
            <svg class="w-[30px]" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="rgba(178 173 173)">
              <title />
              <g data-name="Layer 88" id="Layer_88">
                <path
                  d="M18,27H14a2,2,0,0,1-2-2V21.16a10,10,0,0,1-6-9.47A10.14,10.14,0,0,1,15.69,2h0A10,10,0,0,1,20,21.16V25A2,2,0,0,1,18,27ZM15.75,4A8.12,8.12,0,0,0,8,11.75a8,8,0,0,0,5.33,7.79,1,1,0,0,1,.67.94V25h4V20.48a1,1,0,0,1,.67-.94,8,8,0,0,0,2.9-13.28A7.85,7.85,0,0,0,15.75,4Z" />
                <path d="M19,30H13a1,1,0,0,1,0-2h6a1,1,0,0,1,0,2Z" />
                <path
                  d="M15,24V19.48a9,9,0,0,1-6-8.76c.09-3,1.71-4.93,4.52-6.32C9.49,4.47,7.12,8,7,11.72a9,9,0,0,0,6,8.76V25a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1H16A1,1,0,0,1,15,24Z" />
              </g>
            </svg>
          </button>
          <button class="pt-[10px] pb-[10px] pl-[20px] pr-[20px] rounded-[10px] bg-orange-600">
            <svg class="w-[20px]" fill="#fff" id="Layer_1_1_" style="enable-background:new 0 0 16 16;" version="1.1"
              viewBox="0 0 16 16" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink">
              <path d="M13,5c0-2.761-2.239-5-5-5S3,2.239,3,5v5l-3,2v1h16v-1l-3-2V5z" />
              <path d="M10,14H6c0,1.105,0.895,2,2,2S10,15.105,10,14z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
    <router-view />
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: sans-serif;
  list-style: none;
  text-decoration: none;
}

html {
  height: 100%;
  scroll-behavior: smooth;
}

body {
  height: 100%;
  background: #000;
  color: #fff;
  transition: all .5s ease;
}

.body-active {
  background: #fff;
  color: #000;
}

.container {
  width: 100%;

}

.header-category {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.body-active {
  background: #fff;
}
</style>