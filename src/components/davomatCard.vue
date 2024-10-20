<script>
import { closeUser } from "@/services/services"
import { useStore } from '@/stores/counter';
import { enterUser } from "@/services/services";
import { useStore } from "@/stores/counter";
import Toast, { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

export default {
  props: {
    attend: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isSelected: false,
      store: useStore()
    }
  },
  methods: {
    toggleSelection() {
      this.$emit('select-attend', { user: this.attend, selected: this.isSelected });
    },
    async closeUser() {
      const data = [
        {
          davomat_id: 3
        }
      ]
      const res = await closeUser(data)
      console.log(res)
    }
  }
}
</script>


<template>
  <tr>
    <td style="text-align: center;" class="border p-2">
      <input type="checkbox" v-model="isSelected" @change="toggleSelection"
        class="check-inp w-[25px] h-[25px] mt-[6px]" />
    </td>
    <td style="color: rgba(178, 173, 173);" class="border p-2" @click="closeUser()">{{ attend?.user }}</td>
    <td style="color: rgba(178, 173, 173);" class="border p-2">{{ attend?.kelgan_vaqt }}</td>
    <td style="color: rgba(178, 173, 173);" class="border p-2">{{ attend?.Davomat?.ketgan_vaqt }}</td>
    <td style="color: rgba(178, 173, 173);" class="border p-2">{{ attend?.Davomat?.money }}</td>
  </tr>
</template>

<style scoped>
.check-inp {
  accent-color: rgb(197, 129, 21);
}
</style>
