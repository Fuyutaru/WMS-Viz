<template>
  <div class="wms-box">
    <label>
      Layer:
      <select v-model="selectedLayer">
        <option disabled value="">-- Select a layer --</option>
        <option
          v-for="layer in wmsStore.getLayerList"
          :key="layer.name"
          :value="layer.name"
          :style="{ color: wmsStore.selectedLayer[layer.name] ? 'red' : 'black' }"
        >
          {{ layer.title || layer.name }}
        </option>
      </select>
    </label>

    <label>
      Format:
      <select v-model="selectedFormat">
        <option disabled value="">-- Select a format --</option>
        <option
          v-for="fmt in wmsStore.getOutputFormats"
          :key="fmt"
          :value="fmt"
        >
          {{ fmt }}
        </option>
      </select>
    </label>

    <label>
      Version:
      <input type="text" v-model="selectedVersion" placeholder="e.g. 1.3.0" />
    </label>

    <button @click="addLayer">Add</button>
  </div>
</template>

<script>
import { useWmsStore } from '../stores/wmsStore';

export default {
  name: "addBox",
  data() {
    return {
      selectedLayer: "",
      selectedFormat: "",
      selectedVersion: "1.3.0",
    };
  },
  computed: {
    wmsStore() {
      return useWmsStore();
    },
  },
  methods: {
    addLayer() {
      if (!this.selectedLayer || !this.selectedFormat || !this.selectedVersion) {
        alert("Please select layer, format, and version");
        return;
      }

      const layer = this.wmsStore.layersDict[this.selectedLayer];
      if (layer) {
        layer.selectedFormat = this.selectedFormat;
        layer.selectedVersion = this.selectedVersion;
        this.wmsStore.addSelectedLayer(layer);
      }

      console.log("Added WMS layer:", {
        name: this.selectedLayer,
        format: this.selectedFormat,
        version: this.selectedVersion,
      });

      console.log("Layer details:", this.wmsStore.getSelectedLayer);
    },
  },
};
</script>

<style scoped>
.wms-box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fafafa;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

select,
input,
button {
  margin-top: 4px;
  padding: 6px;
  font-size: 14px;
}

button {
  align-self: flex-start;
  cursor: pointer;
  background-color: #007BFF;
  color: white;
  border-radius: 3px;
  padding: 6px 12px;
  border: none;
}
</style>
