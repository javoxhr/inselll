<script>
import { enterUser } from "@/services/services";
import { useStore } from "@/stores/counter";
// import Toast, { useToast } from 'vue-toastification';
// import 'vue-toastification/dist/index.css';

export default {
  props: {
    attend: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      store: useStore(),
      isSelected: false // Состояние чекбокса
    }
  },
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
  methods: {
    // Обработка изменения состояния чекбокса
    toggleSelection() {
      this.$emit('select-attend', { user: this.attend, selected: this.isSelected });
    },
    async enterUser() {
      const id = [{ user_id: this.attend?.Davomat?.user_id }];

      try {
        const res = await enterUser(id);
        if (res?.status == 200) {
          console.log(true);
          this.showSuccessNotification();
        }
      } catch {
        this.showErrorNotification();
      }
    },
    async closeUser() {
      const id = [{ user_id: this.attend?.Davomat?.user_id }];
      const res = await closeUser(id);
      console.log(res);
    }
  }
}
</script>

<template>
  <tr>
    <!-- Чекбокс для выбора работника -->
    <td style="text-align: center;" class="border p-2">
      <input
        type="checkbox"
        v-model="isSelected"
        @change="toggleSelection"
        class="check-inp w-[25px] h-[25px] mt-[6px]"
      />
    </td>
    <td class="border p-2">{{ attend?.user }}</td>
    <td class="border p-2">{{ attend?.Davomat?.kelgan_vaqt }}</td>
    <td class="border p-2">{{ attend?.Davomat?.ketgan_vaqt }}</td>
    <td class="border p-2">{{ attend?.Davomat?.money }}</td>
  </tr>

  <!-- Дополнительная строка для других действий -->
  <tr>
    <td colspan="5" class="border p-2">
      <div class="attend-btns flex items-center gap-[30px] mt-[20px]">
        <!-- <span style="color: rgba(178, 173, 173);">Выберите, если сотрудник пришел</span> -->
      </div>
    </td>
  </tr>
</template>

<style>
.check-inp {
    accent-color: rgb(197, 129, 21); /* Ваш оранжевый цвет */
}

</style>
