<template>
  <div class="menu-container">
    <button @click="toggleMenu" class="toggle-btn">
      <span v-if="isCollapsed">☰</span>
      <span v-else>×</span>
    </button>

    <div v-show="!isCollapsed" class="menu-box">
        <searchbox />
        <add-box />
    </div>

  </div>
</template>

<script>
import Searchbox from './searchbox.vue';
import addBox from './addBox.vue';

export default {
    name: "Menu",
    components: {
        Searchbox,
        addBox
    },
    data() {
        return {
            isCollapsed: false,
            userInput: ""
    };
    },
    methods: {
        toggleMenu() {
            this.isCollapsed = !this.isCollapsed;
        }
    }
};
</script>

<style scoped>
.menu-container {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
}

.toggle-btn {
  background: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 6px 10px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.menu-box {
  margin-top: 8px;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  width: 400px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.25);
}

</style>
