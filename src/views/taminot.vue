<template>
  <div>
    <!-- <pre>{{ data }}</pre> -->
    <div class="taminot">
      <h2 class="text-[40px] text-orange-600 font-semibold text-uppercase">
        Ta'minotlar
      </h2>
      <div class="taminot-btns employees-btns flex items-center gap-[20px]">
        <button class="bg-orange-600 w-full p-[8px]" @click="hideOpen">
          Ta'minotlar
        </button>
        <button
          class="w-full p-[8px] button"
          style="border: 1px solid"
          @click="hub()"
        >
          Ta'minotchilar
        </button>
      </div>
      <div
        class="closee taminot-tab mt-1 p-2 w-full border border-whitesmoke rounded-lg"
        v-if="!isOpen"
      >
        <div class="row gap-2">
          <div class="col-12">
            <div class="col-md-6"></div>
          </div>
          <div class="row flex flex-wrap">
            <div class="col-md-6 flex-none w-1/2"></div>
            <div class="col-md-6 flex-none w-1/2 flex justify-end">
              <button
                class="pointer text-white bg-[#157347] border-[#146c43] p-2 rounded-[12px] font-normal leading-6 text-center transition-all duration-300 ease-in-out hover:opacity-80 flex items-center justify-center g-3"
              >
                <!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
                <svg
                  height="32px"
                  id="Layer_1"
                  style="enable-background: new 0 0 512 512"
                  version="1.1"
                  viewBox="0 0 512 512"
                  width="32px"
                  xml:space="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <path
                    d="M417.4,224H288V94.6c0-16.9-14.3-30.6-32-30.6c-17.7,0-32,13.7-32,30.6V224H94.6C77.7,224,64,238.3,64,256  c0,17.7,13.7,32,30.6,32H224v129.4c0,16.9,14.3,30.6,32,30.6c17.7,0,32-13.7,32-30.6V288h129.4c16.9,0,30.6-14.3,30.6-32  C448,238.3,434.3,224,417.4,224z"
                    fill="#fff"
                    stroke="#fff"
                  />
                </svg>
                Ta'minot qoshi'sh
              </button>
            </div>
          </div>
          <div class="row parties flex justify-between">
            <div class="col-md table-responsive w-1/2">
              Faol ta'minotlar
              <div class="crd" v-for="item in data?.data">
                <!-- <pre>{{ item }}</pre> -->
                <taminotCard v-for="itemSub in item" :taminotItem="itemSub" />
              </div>
            </div>
            <div class="col-md table-responsive max-h-[70vh] w-1/2">
              Yakunlangan ta'minotlar
              <div class="row m-0 p-0">
                <div class="col-12 mt-2 mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="open border border-white rounded-[12px] border-b mt-[10px]"
        v-if="isOpen"
      >
        <form class="flex items-center justify-end mt-[10px] mr-[10px]">
          <input
            style="border: 1px solid #fff; width: 260px"
            class="bg-[#000] p-[7px] pl-[15px] rounded-[3px]"
            type="text"
            placeholder="Qidiruv"
          />
          <button
            class="hover:opacity-80 transition-opacity duration-300 flex bg-blue-500 rounded-[3px] text-[20px] pt-[8px] pb-[6px] pl-[10px] pr-[10px]"
          >
            <svg
              class="w-[26px] h-[26px]"
              enable-background="new 0 0 32 32"
              id="Glyph"
              version="1.1"
              viewBox="0 0 32 32"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <path
                d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
                id="XMLID_223_"
                fill="#fff"
                stroke="#fff"
              />
            </svg>
          </button>
          <button
            type="button"
            class="hover:opacity-80 transition-opacity duration-300 bg-green-600 rounded-[3px] text-[20px] pt-[5px] pb-[5px] pl-[15px] pr-[15px]"
          >
            +
          </button>
        </form>
        <div
          class="card bg-[#02022e] border border-white rounded-lg w-[500px] m-[30px]"
        >
          <div
            class="card-body flex-1 p-4"
            v-for="item in data?.data?.market_data"
          >
            <h2>{{ item?.market }}</h2>
            <ul class="flex flex-col pl-0 mb-0 rounded">
              <!-- <pre>{{ item }}</pre> -->
              <div class="child-ul" v-for="item in data2?.data">
                <div class="li" v-for="item2 in item">
                  <li
                    v-if="item2.name"
                    class="flex justify-between bg-transparent border-transparent border-b border-b-[1px] text-sm px-4 py-2"
                  >
                    tell:
                    <a
                      href="#"
                      class="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                      ><span>+998</span>{{ item2?.phone }}</a
                    >
                  </li>
                </div>
                <!-- <div class="wrp flex items-center justify-between">
                        <span>tel</span>
                        <a href="#">+998 {{ item2?.phone }}</a>
                    </div>
    
                    <div class="manz">
                        <li class="border-b border-b-[#ffff]">
                           Manzil:
                           <span> {{ item2?.address }}</span>
                        </li>
                    </div>
                    <div class="balla">
                        <li class="border-b border-b-[#ffff]">
                           Ballans:
                           <span> {{ item2?.balances }}</span>
                        </li>
                    </div> -->
              </div>
              <div class="manz" v-for="item in data2?.data">
                <div class="man" v-for="item2 in item">
                  <li
                    v-if="item2?.address"
                    class="flex justify-between bg-transparent border-transparent border-b border-b-[1px] border-b-[var(--p-gray)] text-sm px-4 py-2"
                  >
                    <span>Manzil: </span>
                    <span>{{ item2?.address }}</span>
                  </li>
                </div>
              </div>
              <div class="ballans" v-for="item in data2?.data">
                <div class="ball" v-for="item2 in item">
                  <li
                    v-if="item2?.address"
                    class="flex justify-between bg-transparent border-transparent border-b border-b-[1px] border-b-[var(--p-gray)] text-sm px-4 py-2"
                  >
                    <span>Balans:</span>
                    <a href="#">{{ item?.balances }}</a>
                  </li>
                </div>
              </div>
            </ul>
            <transition name="modal-face">
              <div class="content">
                <ul class="list-group flex flex-col pl-0 mb-0 rounded">
                  <li
                    class="flex justify-between mt-[5px] mb-[5px] bg-black border-transparent border-b border-b-[1px] border-b-[var(--p-gray)] text-sm px-4 py-2 bg-[#02022e]"
                    @click="toggleMoney"
                  >
                    <span>Pul Berish</span>
                    <a href="#">
                      <!-- SVG Icon -->
                      <svg
                        height="28px"
                        id="Layer_1"
                        style="enable-background: new 0 0 512 512"
                        version="1.1"
                        viewBox="0 0 512 512"
                        width="28px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z"
                          fill="#fff"
                        />
                      </svg>
                    </a>
                  </li>

                  <!-- Плавное раскрытие div с классом 'money' -->
                  <transition
                    name="fade"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @leave="leave"
                  >
                    <div v-if="isMoneyVisible" class="list__group-body money">
                      <!-- Здесь ваш форма -->
                      <form>
                        <div
                          class="input-group relative flex flex-wrap items-stretch w-full"
                        >
                          <input
                            type="number"
                            class="form-control bg-transparent w-full rounded-[6px] border border-[#fff] text-sm px-4 py-2"
                            placeholder="Summa:"
                            step="any"
                            min="0"
                            required
                          />
                          <div class="valyuta rounded-[6px] border border-[#fff] bg-black">
                            <select>
                                valyuta 
                                <option></option>
                            </select>
                          </div>
                        </div>
                        <div
                          class="input-group relative flex flex-wrap items-stretch w-full"
                        >
                          <input
                            type="text"
                            class="form-control bg-transparent w-full rounded-[6px] border border-[#fff] text-sm px-4 py-2"
                            placeholder="Izoh:"
                            required
                          />
                        </div>
                        <div class="input-group relative flex flex-wrap items-stretch w-full">
                          <label class="col-12 w-full ">
                            Kassa
                            <select
                              class="form-select block w-full px-9 py-1.5 text-base font-normal leading-6 text-[#212529] bg-transparent rounded-[6px] border border-[#fff]"
                              required
                            >
                              <option value="9">12 - $</option>
                              <option value="1">Kassa 1 - so'm</option>
                              <option value="2">Kassa 2 - so'm</option>
                            </select>
                          </label>
                        </div>
                      </form>
                    </div>
                  </transition>
                </ul>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTaminotlar, getKassa } from "@/services/services";
import taminotCard from "@/components/taminotCard.vue";
import { taminot } from "@/services/services";
export default {
  components: {
    taminotCard,
  },
  data() {
    return {
      data: {},
      data2: {},
      isOpen: false,
      isMoneyVisible: false, // состояние для управления видимостью div
    };
  },
  methods: {
    async getTaminotlar() {
      const res = await getTaminotlar();
      console.log(res);
      this.data = res;
    },
    async taminot() {
      const body = {
        code: "string",
        category_name: "string",
        product_type_name: "string",
        product_type_name2: "string",
        quantity: 0,
        olchov_birligi: "string",
        price: 0,
        currency_id: 30,
        market_id: 0,
        party_id: 0,
      };
      const res = await taminot(body);
      console.log(res);
    },
    async getKassa() {
      const res = await getKassa();
      console.log(res);
      this.data2 = res;
    },
    // Метод для скрытия блока "open" и отображения блока "closee"
    hideOpen() {
      this.isOpen = false;
    },
    // Метод для отображения блока "open" и скрытия блока "closee"
    showOpen() {
      this.isOpen = true;
    },
    toggleMoney() {
      this.isMoneyVisible = !this.isMoneyVisible; // при клике меняем состояние
    },
    beforeEnter(el) {
      el.style.height = "0";
    },
    enter(el, done) {
      el.offsetHeight; // Force reflow
      el.style.transition = "height 0.5s ease-out";
      el.style.height = "auto";
      done();
    },
    leave(el, done) {
      el.style.transition = "height 0.5s ease-in";
      el.style.height = "0";
      done();
    },
    hub() {
        this.showOpen()
        this.getKassa()
    }
  },
  mounted() {
    this.getTaminotlar();
    // this.getKassa();
  },
};
</script>

<style>
input[type="number"] {
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none; /* Убирает стрелки в Chrome, Safari, Edge */
  margin: 0;
}

.custom-input-group
  > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(
    .valid-feedback
  ):not(.invalid-tooltip):not(.invalid-feedback) {
  margin-left: -1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.open {
  display: none;
  transition: all 0.3s ease-in-out;
}

.open {
  display: block;
}

.closee {
  display: block;
}
.fade-enter-active,
.fade-leave-active {
  transition: height 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  height: 0;
}
</style>
