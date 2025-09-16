<template>
  <div class="search-container">

    <input
    type="text"
    v-model="userInput"
    placeholder="Link to GetCapabilities"
    class="menu-input"
    />
    <button @click="submitUrl" class="submit-btn">Submit</button>

  </div>
</template>

<script>

import { useWmsStore } from '../stores/wmsStore';

export default {
  name: "Searchbox",
  data() {
    return {
      userInput: ""
    };
  },
  methods: {
    async submitUrl() {
      console.log("Submitted URL:", this.userInput);
      const wmsStore = useWmsStore();
      wmsStore.setUrl(this.userInput);
      try {
        await wmsStore.parseAndStoreCapabilities();
        console.log("Capabilities fetched and parsed successfully.");
        console.log("Available layers:", wmsStore.getLayerList);
        console.log("Layers dictionary:", wmsStore.getLayersDict);
        console.log("WMS Endpoint:", wmsStore.getWmsEndpoint);
        console.log("Styles dictionary:", wmsStore.getOutputFormats);
      } catch (err) {
        console.error("Erreur lors de la récupération des capacités :", err);
      }
    }
  }
};

</script>

<style scoped>
.search-container {
  width: 100%;
}

.menu-input {
  width: 80%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.submit-btn {
  padding: 6px 12px;
  margin-left: 8px;
  border: none;
  background-color: #007BFF;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
</style>
