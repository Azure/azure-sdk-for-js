# Azure Maps Render client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Maps Render in some common scenarios.

| **File Name**                                                 | **Description**                                                |
| ------------------------------------------------------------- | -------------------------------------------------------------- |
| [getCopyrightCaption.js][getcopyrightcaption]                 | How to get the copyright caption.                              |
| [getCopyrightForTile.js][getcopyrightfortile]                 | How to get the copyright of a certain tile.                    |
| [getCopyrightForWorld.js][getcopyrightforworld]               | How to get the copyright all around the world.                 |
| [getCopyrightFromBoundingBox.js][getcopyrightfromboundingbox] | How to get the copyright of tiles in a given bounding box.     |
| [getMapAttribution.js][getmapattribution]                     | How to get the copyright attribution of a certain tileset.     |
| [getMapStaticImage.js][getmapstaticimage]                     | How to get the map static image with pins and paths specified. |
| [getMapTileInBrowser.js][getmaptileinbrowser]                 | How to get the map tile and render on the **browser**.         |
| [getMapTileInNode.js][getmaptileinnode]                       | How to get the map tile and store it as a file in **Node.js**. |
| [getMapTileset.js][getmaptileset]                             | How to get the metadata of a certain tileset.                  |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node getCopyrightCaption.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env MAPS_RESOURCE_CLIENT_ID="<maps resource client id>" node getCopyrightCaption.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[getcopyrightcaption]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-render-rest/samples/v2-beta/javascript/getCopyrightCaption.js
[getcopyrightfortile]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-render-rest/samples/v2-beta/javascript/getCopyrightForTile.js
[getcopyrightforworld]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-render-rest/samples/v2-beta/javascript/getCopyrightForWorld.js
[getcopyrightfromboundingbox]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-render-rest/samples/v2-beta/javascript/getCopyrightFromBoundingBox.js
[getmapattribution]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-render-rest/samples/v2-beta/javascript/getMapAttribution.js
[getmapstaticimage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-render-rest/samples/v2-beta/javascript/getMapStaticImage.js
[getmaptileinbrowser]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-render-rest/samples/v2-beta/javascript/getMapTileInBrowser.js
[getmaptileinnode]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-render-rest/samples/v2-beta/javascript/getMapTileInNode.js
[getmaptileset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-render-rest/samples/v2-beta/javascript/getMapTileset.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure-rest/maps-render
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuremapsresource]: https://learn.microsoft.com/azure/azure-maps/how-to-create-template
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-render-rest/README.md
