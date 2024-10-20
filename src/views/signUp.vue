<script>
import { token } from "@/services/services"
import { useStore } from "@/stores/counter";

import Toast, { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

export default {
    setup() {
        const toast = useToast();

        return {
            showSuccessNotification() {
                toast.success("Xush kelibsiz!");
            },

            showErrorNotification() {
                toast.error("Login yoki parolda xatolik");
            }
        }
    },
    data() {
        return {
            store: useStore(),
            userName: "",
            passWord: ""
        }
    },
    methods: {
        async auth() {
            try {
                const res = await token(this.userName, this.passWord)
                console.log(res.status)
                if (res.status == 200) {
                    this.showSuccessNotification()
                } else {
                    this.showErrorNotification()
                }
            } catch {
                this.showErrorNotification()
            }
        }
    }
}
</script>

<template>
    <!-- <div @click="store.authSwitch = false" v-if="store.authSwitch"
        class="auth-overlay w-full h-full fixed inset-0 bg-black bg-opacity-50">
    </div> -->
    <div class="signUp-wrapper">
        <div style="border: 2px solid #fff;" class="modal-window w-[350px] rounded-[10px] p-[20px] h-[350px] flex flex-col gap-[10px]">
            <h2 class="text-[30px]"><img class="w-[130px]" src="@/assets/images/png/logo.png" alt=""></h2>
            <h1 class="text-[30px]">Authorization</h1>
            <form @submit.prevent="auth()" class="flex flex-col gap-[20px] items-start w-full mt-[10px]">
                <input class="pt-[5px] w-full bg-transparent pb-[5px] rounded-[5px] p-[9px] border-[1px] border-white"
                    type="text" placeholder="User name" v-model="userName">
                <input class="pt-[5px] w-full bg-transparent pb-[5px] rounded-[5px] p-[9px] border-[1px] border-white"
                    type="password" placeholder="password" v-model="passWord">
                <button class="p-[10px] bg-green-600 rounded-[5px]">Ro'yixatdan o'tish</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.signUp-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
}
</style>