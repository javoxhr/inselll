<script>
import { updateEmp } from '@/services/services';
import { useStore } from '@/stores/counter'

export default {
    setup() {
        const store = useStore();

        return {
            store
        };
    },
    computed: {
        id() {
            return this.store.editInfo?.id;
        },
        name: {
            get() {
                return this.store.editInfo?.name;
            },
            set(value) {
                this.store.editInfo.name = value;
            }
        },
        password: {
            get() {
                return this.store.editInfo?.password_hash;
            },
            set(value) {
                this.store.editInfo.password_hash = value;
            }
        },
        role: {
            get() {
                return this.store.editInfo?.role;
            },
            set(value) {
                this.store.editInfo.role = value;
            }
        },
        phone: {
            get() {
                return this.store.editInfo?.phone;
            },
            set(value) {
                this.store.editInfo.phone = parseInt(value, 10); // Преобразование в число
            }
        },
        maosh: {
            get() {
                return this.store.editInfo?.maosh;
            },
            set(value) {
                this.store.editInfo.maosh = value;
            }
        },
        kelish_vaqti: {
            get() {
                return this.store.editInfo?.kelish_vaqti ? this.store.editInfo?.kelish_vaqti : "0";
            },
            set(value) {
                this.store.editInfo.kelish_vaqti = value;
            }
        },
        ketish_vaqti: {
            get() {
                return this.store.editInfo?.ketish_vaqti ? this.store.editInfo?.ketish_vaqti : "0";
            },
            set(value) {
                this.store.editInfo.ketish_vaqti = value;
            }
        },
        telegram_id: {
            get() {
                return this.store.editInfo?.telegram_id;
            },
            set(value) {
                this.store.editInfo.telegram_id = value;
            }
        },
    },
    methods: {
        async update() {
            const body = {
                id: this.id,
                name: this.name,
                password: this.password,
                role: this.role,
                phone: this.phone,
                status: true,
                kelish_vaqti: this.kelish_vaqti,
                ketish_vaqti: this.ketish_vaqti,
                maosh: this.maosh,
                telegram_id: this.telegram_id
            };
            console.log("Request body:", body)
            const res = await updateEmp(body);
            console.log(res);
        }
    },
}
</script>

<template>
    <div>
        <div v-if="store.updateInfoEmp" @click="store.updateInfoEmp = false"
            style="background: rgba(47, 47, 47, 0.3); position: fixed; top: 0; left: 0;" class="overlay w-full h-full">
        </div>
        <Transition name="modal-fade">
            <div v-if="store.updateInfoEmp"
                style="transform: translate(-50%, -50%); position: fixed; top: 50%; left: 50%;"
                class="create-emp w-[400px] bg-[#000] p-[20px]">
                <div class="create-emp-header flex items-center justify-between">
                    <h2 class="text-[22px] pb-[10px]">Hodimni ma'lumotini o'zgartirish</h2>
                    <button @click="store.updateInfoEmp = false" class="text-indigo-600 text-[25px]">X</button>
                </div>

                <form @submit.prevent="update()" class="flex flex-col gap-[10px]">
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
                            <input v-model="kelish_vaqti" style="border: 1px solid;" class="bg-[#000] p-[5px] pl-[10px] w-full"
                                type="time">
                        </div>
                        <div class="create-input w-full flex flex-col items-start gap-[5px]">
                            <label>Ketish</label>
                            <input v-model="ketish_vaqti" style="border: 1px solid;" class="bg-[#000] p-[5px] pl-[10px] w-full"
                                type="time">
                        </div>
                    </div>

                    <div class="create-input flex flex-col items-start gap-[5px]">
                        <label>Vazifa</label>
                        <input v-model="role" style="border: 1px solid;" class="bg-[#000] p-[5px] pl-[10px] w-full"
                            type="text">
                    </div>

                    <button class="bg-green-500 p-[3px] rounded-[2px] mt-[10px]">Update</button>
                </form>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.modal-fade-enter-active, 
.modal-fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.modal-fade-enter-from, 
.modal-fade-leave-to {
    opacity: 0;
    transform: scale(0.9) translate(-50%, -50%);
}

.modal-fade-enter-to, 
.modal-fade-leave-from {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
}
</style>
