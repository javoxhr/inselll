<script>
import { createEmp } from '@/services/services';
import { useStore } from '@/stores/counter';

export default {
    data() {
        return {
            store: useStore(),
            name: "",
            password: "",
            role: "",
            phone: "",
            kelishVaqti: "0",
            ketishVaqti: "0",
            maosh: '',

        }
    },
    methods: {
        async auth() {
            const data = {
                id: 0,
                name: this.name,
                password: this.password,
                role: this.role,
                phone: Number(this.phone),
                branch_id: 0,
                status: true,
                kelish_vaqti: this.kelishVaqti,
                ketish_vaqti: this.ketishVaqti,
                maosh: Number(this.maosh),
                telegram_id: 0
            };
            const res = await createEmp(data)
            console.log(res)
            return res
        }
    }
}
</script>

<template>
    <div>
        <div @click="store.createUser = false" v-if="store.createUser"
            style="background: rgba(47, 47, 47, 0.3); position: fixed; top: 0; left: 0;" class="overlay w-full h-full">
        </div>
        <div v-if="store.createUser" style="transform: translate(-50%, -50%); position: fixed; top: 50%; left: 50%;"
            class="create-emp w-[400px] bg-[#000] p-[20px]">
            <div class="create-emp-header flex items-center justify-between">
                <h2 class="text-[22px] pb-[10px]">Hodim qo'shish</h2>
                <button @click="store.createUser = false" class="text-indigo-600 text-[25px]">X</button>
            </div>

            <form @submit.prevent="auth()" class="flex flex-col gap-[10px]">
                <div class="create-input flex flex-col items-start gap-[5px]">
                    <label>Ism</label>
                    <input v-model="name" style="border: 1px solid;" class="bg-[#000] p-[5px] pl-[10px] w-full"
                        type="text">
                </div>
                <div class="create-input flex flex-col items-start gap-[5px]">
                    <label>Telfon raqam</label>
                    <input v-model="phone" style="border: 1px solid;" class="bg-[#000] p-[5px] pl-[10px] w-full"
                        type="text">
                </div>
                <div class="create-input flex flex-col items-start gap-[5px]">
                    <label>Parol</label>
                    <input v-model="password" style="border: 1px solid;" class="bg-[#000] p-[5px] pl-[10px] w-full"
                        type="password">
                </div>

                <div class="create-input flex flex-col items-start gap-[5px]">
                    <label>Maosh</label>
                    <div class="inp-wrp w-full flex items-center">
                        <input v-model="maosh" style="border: 1px solid;" class="bg-[#000] p-[5px] pl-[10px] w-full"
                            type="text" placeholder="Maosh">
                        <span class="p-[6px] bg-slate-400">so'm</span>
                    </div>
                </div>

                <div class="create-doble-inp flex aitems-center gap-[15px]">
                    <div class="create-input w-full flex flex-col items-start gap-[5px]">
                        <label>Kelish</label>
                        <input v-model="kelishVaqti" style="border: 1px solid;"
                            class="bg-[#000] p-[5px] pl-[10px] w-full" type="time">
                    </div>
                    <div class="create-input w-full flex flex-col items-start gap-[5px]">
                        <label>Ketish</label>
                        <input v-model="ketishVaqti" style="border: 1px solid;"
                            class="bg-[#000] p-[5px] pl-[10px] w-full" type="time">
                    </div>
                </div>

                <div class="create-input flex flex-col items-start gap-[5px]">
                    <label>Vazifa</label>
                    <input v-model="role" style="border: 1px solid;" class="bg-[#000] p-[5px] pl-[10px] w-full"
                        type="text">
                </div>

                <button class="bg-green-500 p-[3px] rounded-[2px] mt-[10px]">Create</button>
            </form>
        </div>
    </div>
</template>

<style>
.home {
    background: rgba(47, 47, 47, 0.3);
}
</style>