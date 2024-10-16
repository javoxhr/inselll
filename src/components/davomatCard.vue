<script>
import { enterUser } from "@/services/services"
import { useStore } from "@/stores/counter";

import Toast, { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

export default {
    setup() {
        const toast = useToast();

        return {
            showSuccessNotification() {
                toast.success("Amaliyot muvaffaqiyatli amalga oshirildi");
            },

            showErrorNotification() {
                toast.info("Hodim kelganlar ro'yhatida mavjud");
            }
        }
    },
    props: {
        attend: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            store: useStore(),
            id: 0
        }
    },
    methods: {
        async enterUser() {
            const id = [
                {
                    user_id: this.attend?.Davomat?.user_id
                }
            ]

            try {
                const res = await enterUser(id)
                if (res?.status == 200) {
                    console.log(true)
                    this.showSuccessNotification()
                }
            } catch {
                this.showErrorNotification()
            }
        },

        async closeUser() {
            const id = [
                {
                    user_id: this.attend?.Davomat?.user_id
                }
            ]
            const res = await closeUser(id)
            console.log(res)
        }
    }
}
</script>

<template>
    <div>
        <!-- <pre>{{ attend }}</pre> -->
        <div class="attend-card mt-[30px]">
            <div class="attend-card-wrapper flex items-center justify-between">
                <span style="color: rgba(178 173 173);">{{ attend?.user }}</span>
                <span style="color: rgba(178 173 173);">{{ attend?.Davomat?.kelgan_vaqt }}</span>
                <span style="color: rgba(178 173 173);">{{ attend?.Davomat?.ketgan_vaqt }}</span>
                <span style="color: rgba(178 173 173);">{{ attend?.Davomat?.money }}</span>
            </div>
            <div class="attend-btns flex items-center gap-[30px] mt-[20px]">
                <button @click="enterUser()" style="border: 1px solid #16a34a; color: rgba(178 173 173);"
                    class=" w-full p-[3px] rounded-[5px] text-[18px]">Keldi</button>
                <button style="border: 1px solid #f43f5e; color: rgba(178 173 173);"
                    class="w-full p-[3px] rounded-[5px] text-[18px]" @click="closeUser() ">Ketdi</button>
            </div>
        </div>
    </div>
</template>

<style></style>