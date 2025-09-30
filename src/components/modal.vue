<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-content">
        <header class="modal-header">
          <slot name="header">
            <h3 v-if="typeof header  !== 'undefined'" v-html="header.innerHTML"></h3>
          </slot>
          <button class="modal-close-button" @click="closeModal">&times;</button>
        </header>
        <section class="modal-body" v-html="content.outerHTML">
          
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button @click="closeModal" class="close">Close</button>
          </slot>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean
  },
  content: {
    type: Object
  },
  header:{
    type: Object
  }
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style >
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  min-width: 300px;

}


.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.modal-close-button {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  margin-left: auto;
  order: 2;
}
.modal-body figure img {
    width:100%;
    height:100%;
    object-fit:cover;
}
.modal-footer {
    display:flex;
    flex-direction:row;
}
.modal-footer button.close {
     margin-left: auto;
  order: 2;
}
/* Vue Transition styles for fading */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>