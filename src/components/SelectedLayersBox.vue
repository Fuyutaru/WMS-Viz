<template>
  <div class="selected-layers-box">
    <h4>Selected WMS Layers</h4>
    <ul v-if="selectedNames.length > 0">
      <li v-for="name in selectedNames" :key="name" class="layer-item">
        <span>{{ name }}</span>
        <button @click="removeLayer(name)">Remove</button>
      </li>
    </ul>
    <div v-else class="empty-message">
      No layers selected.
    </div>
  </div>
</template>

<script>
import { useWmsStore } from "../stores/wmsStore";

export default {
  name: "SelectedLayersBox",
  computed: {
    wmsStore() {
      return useWmsStore();
    },
    selectedNames() {
      return Object.keys(this.wmsStore.selectedLayer || {});
    },
  },
  methods: {
    removeLayer(name) {
      this.wmsStore.removeSelectedLayer(name);
    },
  },
};
</script>

<style scoped>
.selected-layers-box {
  border: 1px solid #bbb;
  padding: 0.75rem;
  border-radius: 6px;
  background: #f5f5f5;
  max-width: 300px;
}

.selected-layers-box h4 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.layer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}

.layer-item button {
  background-color: #dc3545;
  border: none;
  color: white;
  padding: 4px 8px;
  font-size: 0.85rem;
  border-radius: 3px;
  cursor: pointer;
}

.layer-item button:hover {
  background-color: #c82333;
}

.empty-message {
  font-style: italic;
  color: #666;
}
</style>
