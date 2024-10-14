<script>
import {token} from "@/services/services"
import { useStore } from "@/stores/counter";
export default {
    data() {
        return {
            store: useStore(),
            userName: "",
            passWord: ""
        }
    },
    methods: {
        async auth() {
            const res = await token(this.userName, this.passWord)
            console.log(res)
        }
    }
}
</script>

<template>
    <div @click="store.authSwitch = false" v-if="store.authSwitch" style="background: rgba(47, 47, 47, 0.3);" class="auth-overlay w-full h-full fixed inset-0 bg-indigo-500">
    </div>
    <div v-if="store.authSwitch" style="transform: translate(-50%, -50%); border: 1px solid #fff;"
        class="fixed w-[350px] rounded-[10px] p-[20px] h-[250px] inset-x-[50%] inset-y-[50%] bg-[#000]">
        <h1 class="text-[25px]">Authorization</h1>
        <button class="text-[22px] text-indigo-600 absolute top-[10px] right-[10px]" @click="store.authSwitch = false">X</button>
        <form @submit.prevent="auth()" class="flex flex-col gap-[20px] items-start w-full mt-[10px]">
            <input style="border: 1px solid #fff;" class="pt-[5px] w-full bg-[#000] pb-[5px] rounded-[5px] p-[9px]"
                type="text" placeholder="User name" v-model="userName">
            <input style="border: 1px solid #fff;" class="pt-[5px] bg-[#000] pb-[5px] w-full rounded-[5px] p-[9px]"
                type="password" placeholder="password" v-model="passWord">
            <button class="p-[10px] bg-green-600 rounded-[5px]">Ro'yixatdan o'tish</button>
        </form>
    </div>
</template>

<style></style>