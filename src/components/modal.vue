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
