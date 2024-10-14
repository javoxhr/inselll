<script>
import { updateEmp } from '@/services/services';
import { useStore } from '@/stores/counter'
export default {
    data() {
        return {
            store: useStore()
        }
    },
    methods: {
        async update() {
            const body = {
                id: 30,
                name: "John Doe",
                password: "Insell",
                role: "seller",
                phone: 1234567890,
                status: true,
                kelish_vaqti: "0",
                ketish_vaqti: "0",
                maosh: 5000,
                telegram_id: 987654321
            };
            const res = await updateEmp(body);
            console.log(res);
        }
    }

}
</script>

<template>
    <div>
        <div v-if="store.updateInfoEmp" @click="store.updateInfoEmp = false" style="background: rgba(47, 47, 47, 0.3); position: fixed; top: 0; left: 0;" class="overlay w-full h-full">
        </div>
        <div v-if="store.updateInfoEmp" style="transform: translate(-50%, -50%); position: fixed; top: 50%; left: 50%;"
            class="create-emp w-[400px] bg-[#000] p-[20px]">
            <div class="create-emp-header flex items-center justify-between">
                <h2 class="text-[22px] pb-[10px]">Hodimni ma'lumotini o'zgartirish</h2>
                <button @click="store.updateInfoEmp = false" class="text-indigo-600 text-[25px]">X</button>
            </div>

            <form @submit.prevent="update()" class="flex flex-col gap-[10px]">
                <div class="create-input flex flex-col items-start gap-[5px]">
                    <label>Ism</label>
                    <input style="border: 1px solid;" class="bg-[#000] p-[5px] pl-[10px] w-full" type="text">
                </div>
                <div class="create-input flex flex-col items-start gap-[5px]">
                    <label>Telfon raqam</label>
                    <input style="border: 1px solid;" class="bg-[#000] p-[5px] pl-[10px] w-full" type="text">
                </div>
                <div class="create-input flex flex-col items-start gap-[5px]">
                    <label>Parol</label>
                    <input style="border: 1px solid;" class="bg-[#000] p-[5px] pl-[10px] w-full" type="password">
                </div>

                <div class="create-input flex flex-col items-start gap-[5px]">
                    <label>Maosh</label>
                    <div class="inp-wrp w-full flex items-center">
                        <input style="border: 1px solid;" class="bg-[#000] p-[5px] pl-[10px] w-full" type="text"
                            placeholder="Maosh">
                        <span class="p-[6px] bg-slate-400">so'm</span>
                    </div>
                </div>

                <div class="create-doble-inp flex aitems-center gap-[15px]">
                    <div class="create-input w-full flex flex-col items-start gap-[5px]">
                        <label>Kelish</label>
                        <input style="border: 1px solid;" class="bg-[#000] p-[5px] pl-[10px] w-full" type="time">
                    </div>
                    <div class="create-input w-full flex flex-col items-start gap-[5px]">
                        <label>Ketish</label>
                        <input style="border: 1px solid;" class="bg-[#000] p-[5px] pl-[10px] w-full" type="time">
                    </div>
                </div>

                <div class="create-input flex flex-col items-start gap-[5px]">
                    <label>Vazifa</label>
                    <input style="border: 1px solid;" class="bg-[#000] p-[5px] pl-[10px] w-full" type="text">
                </div>

                <button class="bg-green-500 p-[3px] rounded-[2px] mt-[10px]">Update</button>
            </form>
        </div>
    </div>
</template>

<style></style>