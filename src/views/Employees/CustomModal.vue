<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  show: Boolean,
  confirmText: String,
});
const emit = defineEmits(["confirm", "close"]);

const confirmAction = () => {
  emit("confirm");
};

const closeModal = () => {
  emit("close");
};
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <slot></slot>
      <div class="modal-actions">
        <button
          v-if="confirmText"
          @click="confirmAction"
          class="btn btn-danger"
        >
          {{ confirmText }}
        </button>
        <button @click="closeModal" class="btn btn-secondary">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 450px;
  height: 250px;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
}
.modal-actions {
  margin-top: 10px;
}
.btn {
  margin: 10px;
}
</style>
