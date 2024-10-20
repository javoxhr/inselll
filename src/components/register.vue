<script>
import { token } from "@/services/services"
import { useStore } from "@/stores/counter";

// import Toast, { useToast } from 'vue-toastification';
// import 'vue-toastification/dist/index.css';

export default {
    setup() {
        // const toast = useToast();

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
    <div @click="store.authSwitch = false" v-if="store.authSwitch"
        class="auth-overlay w-full h-full fixed inset-0 bg-black bg-opacity-50">
    </div>
    <transition name="modal-fade">
        <div v-if="store.authSwitch"
            class="modal-window fixed w-[350px] rounded-[10px] p-[20px] h-[250px] inset-x-[41%] inset-y-[33%] border-[1px] border-white" style="background:  rgb(67, 67, 67);">
            <h1 class="text-[25px]">Authorization</h1>
            <button class="text-[22px] text-indigo-600 absolute top-[10px] right-[10px]"
                @click="store.authSwitch = false">X</button>
            <form @submit.prevent="auth()" class="flex flex-col gap-[20px] items-start w-full mt-[10px]">
                <input class="pt-[5px] w-full bg-transparent pb-[5px] rounded-[5px] p-[9px] border-[1px] border-white"
                    type="text" placeholder="User name" v-model="userName">
                <input class="pt-[5px] w-full bg-transparent pb-[5px] rounded-[5px] p-[9px] border-[1px] border-white"
                    type="password" placeholder="password" v-model="passWord">
                <button class="p-[10px] bg-green-600 rounded-[5px]">Ro'yixatdan o'tish</button>
            </form>
        </div>
    </transition>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
    transform: translateY(-50%) translateX(-50%) scale(0.95);

}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
    transform: translateY(-50%) translateX(-25%) scale(0.95);
}

.modal-fade-enter-to,
.modal-fade-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
}

</style>
