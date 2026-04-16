# Azure Maps Render client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Maps Render in some common scenarios.

| **File Name**                                                 | **Description**                                                |
| ------------------------------------------------------------- | -------------------------------------------------------------- |
| [getCopyrightCaption.ts][getcopyrightcaption]                 | How to get the copyright caption.                              |
| [getCopyrightForTile.ts][getcopyrightfortile]                 | How to get the copyright of a certain tile.                    |
| [getCopyrightForWorld.ts][getcopyrightforworld]               | How to get the copyright all around the world.                 |
| [getCopyrightFromBoundingBox.ts][getcopyrightfromboundingbox] | How to get the copyright of tiles in a given bounding box.     |
| [getMapAttribution.ts][getmapattribution]                     | How to get the copyright attribution of a certain tileset.     |
| [getMapStaticImage.ts][getmapstaticimage]                     | How to get the map static image with pins and paths specified. |
| [getMapTileInBrowser.ts][getmaptileinbrowser]                 | How to get the map tile and render on the **browser**.         |
| [getMapTileInNode.ts][getmaptileinnode]                       | How to get the map tile and store it as a file in **Node.js**. |
| [getMapTileset.ts][getmaptileset]                             | How to get the metadata of a certain tileset.                  |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Maps Resource][createinstance_azuremapsresource]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/getCopyrightCaption.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env MAPS_RESOURCE_CLIENT_ID="<maps resource client id>" node dist/getCopyrightCaption.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[getcopyrightcaption]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-render-rest/samples/v2-beta/typescript/src/getCopyrightCaption.ts
[getcopyrightfortile]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-render-rest/samples/v2-beta/typescript/src/getCopyrightForTile.ts
[getcopyrightforworld]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-render-rest/samples/v2-beta/typescript/src/getCopyrightForWorld.ts
[getcopyrightfromboundingbox]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-render-rest/samples/v2-beta/typescript/src/getCopyrightFromBoundingBox.ts
[getmapattribution]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-render-rest/samples/v2-beta/typescript/src/getMapAttribution.ts
[getmapstaticimage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-render-rest/samples/v2-beta/typescript/src/getMapStaticImage.ts
[getmaptileinbrowser]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-render-rest/samples/v2-beta/typescript/src/getMapTileInBrowser.ts
[getmaptileinnode]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-render-rest/samples/v2-beta/typescript/src/getMapTileInNode.ts
[getmaptileset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-render-rest/samples/v2-beta/typescript/src/getMapTileset.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure-rest/maps-render
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuremapsresource]: https://learn.microsoft.com/azure/azure-maps/how-to-create-template
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-render-rest/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
