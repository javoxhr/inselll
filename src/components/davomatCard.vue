<script>
export default {
    props: {
        attend: {
            type: Object,
            required: true
        }
    },
    data() {
        
    },
    methods: {

    }
}
</script>

<template>
    <div>
        <!-- <pre>{{ attend }}</pre> -->
        <div class="attend-card mt-[30px]">
            <div class="attend-card-wrapper flex items-center justify-between">
                <span>{{ attend?.user }}</span>
                <span>{{ attend?.Davomat?.kelgan_vaqt }}</span>
                <span>{{ attend?.Davomat?.ketgan_vaqt }}</span>
                <span>{{ attend?.Davomat?.money }}</span>
            </div>
            <div class="attend-btns flex items-center gap-[30px] mt-[20px]">
                <button style="border: 1px solid #16a34a;" class=" w-full p-[3px] rounded-[5px] text-[18px]">Keldi</button>
                <button style="border: 1px solid #f43f5e;" class="w-full p-[3px] rounded-[5px] text-[18px]">Ketdi</button>
            </div>
        </div>
    </div>
</template>

<style>

</style>