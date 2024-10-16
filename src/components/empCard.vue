<script>
import { useStore } from '@/stores/counter';
export default {
    data() {
        return {
            store: useStore()
        }
    },
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    methods: {
        updateUser() {
            this.store.editInfo = this.user;
            this.store.updateInfoEmp = true;
        }
    },
}
</script>

<template>
    <div>
        <div style="border: 1px solid rgba(178 173 173); width: 300px;" class="emp-card p-[20px] rounded-[10px]">
            <div class="emp-card-wrapper flex flex-col gap-[20px]">
                <span style="color: rgba(178 173 173);">Vazifasi: {{ user?.role }}</span>
                <span style="color: rgba(178 173 173);">Balanisi {{ user?.balance }}</span>
                <span style="color: rgba(178 173 173);">Maoushi: {{ user?.maosh }}</span>
                <span style="color: rgba(178 173 173);">ish vaqti kelishi: {{ user?.ish_vaqti_kelish }}</span>
                <span style="color: rgba(178 173 173);">ish vaqti ketishi: {{ user?.ish_vaqti_ketish }}</span>
                <span style="color: rgba(178 173 173);">telefon raqami: {{ user?.phone}}</span>
                <button @click="updateUser()" class="bg-cyan-700 p-[6px] flex items-center justify-center rounded-[5px]">
                    <svg height="18px" version="1.1" viewBox="0 0 18 18" width="18px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#fff" id="Core" transform="translate(-213.000000, -129.000000)"><g id="create" transform="translate(213.000000, 129.000000)"><path d="M0,14.2 L0,18 L3.8,18 L14.8,6.9 L11,3.1 L0,14.2 L0,14.2 Z M17.7,4 C18.1,3.6 18.1,3 17.7,2.6 L15.4,0.3 C15,-0.1 14.4,-0.1 14,0.3 L12.2,2.1 L16,5.9 L17.7,4 L17.7,4 Z" id="Shape"/></g></g></g></svg>
                </button>
            </div>
        </div>
    </div>
</template>

<style>

</style>