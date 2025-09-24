<template>
  <div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
    <Menu />
  </div>
</template>

<script>
import { Map, NavigationControl } from 'maplibre-gl';
import { shallowRef, onMounted, onUnmounted, markRaw, watch } from 'vue';
import 'maplibre-gl/dist/maplibre-gl.css';
import Menu from './Menu.vue';
import { useWmsStore } from '../stores/wmsStore';

export default {
  name: "Map",
  components: {
    Menu
  },
  setup () {
    const mapContainer = shallowRef(null);
    const map = shallowRef(null);
    const wmsStore = useWmsStore();

    onMounted(() => {
      const apiKey = 'nnaHgHcef9CvFhMovW7D';

      const initialState = { lng: 29.096, lat: 44.439663, zoom: 5 };

      // base map
      map.value = markRaw(new Map({
        container: mapContainer.value,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom
      }));

      map.value.addControl(new NavigationControl(), 'top-right');

      const userWmsUrl = "https://geoserver2.geoecomar.ro/geoserver/wms"


      watch(
        () => ({ ...wmsStore.selectedLayer }),
        (newLayers, oldLayers) => {
          if (!map.value) return;

          const newLayerNames = Object.keys(newLayers);
          const oldLayerNames = oldLayers ? Object.keys(oldLayers) : [];

          newLayerNames.forEach((name) => {
            const layer = newLayers[name];
            const sourceId = `wms-source-${name}`;
            const layerId = `wms-layer-${name}`;

            if (!map.value.getSource(sourceId)) {
              map.value.addSource(sourceId, {
                type: "raster",
                tiles: [
                  'http://localhost:3001/proxy?target=' + encodeURIComponent(`${wmsStore.wmsEndpoint}?`) +
                    `version=${layer.selectedVersion}&request=GetMap&` +
                    `layers=${layer.name}&styles=&bbox={bbox-epsg-3857}&` +
                    `width=256&height=256&` +
                    `srs=EPSG:3857&format=${layer.selectedFormat}&transparent=true`,
                ],
                tileSize: 256,
              });

              map.value.addLayer({
                id: layerId,
                type: "raster",
                source: sourceId,
              });
            }
          });

          oldLayerNames.forEach((name) => {
            if (!newLayerNames.includes(name)) {
              const sourceId = `wms-source-${name}`;
              const layerId = `wms-layer-${name}`;

              if (map.value.getLayer(layerId)) {
                map.value.removeLayer(layerId);
              }
              if (map.value.getSource(sourceId)) {
                map.value.removeSource(sourceId);
              }
            }
          });
        },
        { deep: true, immediate: true }
      );
    })

    onUnmounted(() => {
      map.value?.remove();
    })

    return {
      map, mapContainer
    };
  }
};
</script>


<style scoped>
/* @import 'maplibre-gl/dist/maplibre-gl.css'; */

.map-wrap {
  position: relative;
  width: 100%;
  /* height: calc(100vh - 77px); */
  height: calc(100vh - 68px);
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}

</style>