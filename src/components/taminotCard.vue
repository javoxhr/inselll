<template>
  <div>
    <!-- {{ taminotItem }} -->
    <div class="row m-0 p-0" v-if="taminotItem?.time">
      <div class="col-12 mt-2 mt-2">
        <div
          class="block bg-[#02022e] p-10 text-white rounded-[12px] pointer border-[#9c9c9c]"
        >
        {{ taminotItem?.time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        taminotItem: {
            type: Object,
            required: true
        }
    },
    methods: {

    },
}
</script>
