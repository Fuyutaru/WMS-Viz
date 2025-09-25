# WMS-Viz

## installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Project Setup

```sh
npm install
```

### Enable proxy

In this project's root directory, run the following command to enable the proxy:

```sh
node server.js
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## How to use

1. Replace the link by your personal link. The link should be able to get you getcapabilities xml file from Geoserver.
2. Click on the submit button.
3. You can select a WMS layer from the dropdown.
4. You have to select a format and the recommended format is image/png.
5. You can change the version to 1.1.1 or 1.3.0.
6. Click on the Add button to add the layer to the map. You can add multiple layers to the map.
7. You can remove a layer by clicking on the remove button next to the layer name.
