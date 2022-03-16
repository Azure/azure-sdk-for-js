# Azure Maps Render client library for JavaScript/TypeScript

The Azure Maps Render Service is a set of RESTful APIs designed to help developers retrieve maps rendering data such as map tiles, copyright attribution, and metadata for a tileset.

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure Render client.

Azure Maps Render REST APIs

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-render) |
[Package (NPM)](https://www.npmjs.com/package/@azure/maps-render) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/maps-render) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-render/samples) |
[Product Information](https://docs.microsoft.com/rest/api/maps/render-v2)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge and Firefox.

### Prerequisites

- An [Azure subscription][azure_sub].
- An [Azure Maps account](https://docs.microsoft.com/azure/azure-maps/how-to-manage-account-keys). You can create the resource via [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

If you use Azure CLI, replace `<resource-group-name>` and `<account-name>` of your choice, and select a proper [pricing tier](https://docs.microsoft.com/azure/azure-maps/choose-pricing-tier) based on your needs via the `<sku-name>` parameter. Please refer to [this page](https://docs.microsoft.com/cli/azure/maps/account?view=azure-cli-latest#az_maps_account_create) for more details.

```bash
az maps account create --resource-group <resource-group-name> --account-name <account-name> --sku <sku-name>
```

### Install the `@azure/maps-render` package

Install the Azure Maps Render client library with `npm`:

```bash
npm install @azure/maps-render
```

### Create and authenticate a `RenderClient`

To create a client object to access the Azure Maps Render API, you will need a `credential` object. The Azure Maps Render client can use an Azure Active Directory credential to authenticate.

#### Using an Azure Active Directory Credential

You can authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to register a new AAD application and grant access to Azure Maps by assigning the suitable role to your service principal. Please refer to the [Manage authentication](https://docs.microsoft.com/azure/azure-maps/how-to-manage-authentication) page.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```javascript
const { RenderClient } = require("@azure/maps-render");
const { DefaultAzureCredential } = require("@azure/identity");
const client = new RenderClient(new DefaultAzureCredential());
```

## Key concepts

### RenderClient

`RenderClient` is the primary interface for developers using the Azure Maps Render client library. Explore the methods on this client object to understand the different features of the Azure Maps Render service that you can access.

## Examples

The following sections provide several code snippets covering some of the most common Azure Maps Render tasks, including:

- [Request map tiles in vector or raster formats](#request-map-tiles-in-vector-or-raster-formats)
- [Request map copyright attribution information](#request-map-copyright-attribution-information)
- [Request metadata for a tileset](#request-metadata-for-a-tileset)

### Request map tiles in vector or raster formats

```javascript
const credential = new DefaultAzureCredential();
const operationOptions = {
  requestOptions: {
    customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID },
  },
};

const client = new RenderClient(credential);
const mapTileOptions = { tileSize: "512" };
const tileIndex = { z: 6, x: 9, y: 22 };
const response = await client.getMapTileV2("microsoft.base", tileIndex, {
  ...mapTileOptions,
  ...operationOptions,
});
```

The response will contain the tile object based on the request parameters.

### Request map copyright attribution information

```javascript
const credential = new DefaultAzureCredential();
const operationOptions = {
  requestOptions: {
    customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID },
  },
};

const client = new RenderClient(credential).renderV2;
const attribution = await client.getMapAttribution(
  "microsoft.base",
  6,
  [-122.414162, 47.57949, -122.247157, 47.668372],
  operationOptions
);
```

Response

```yaml
{ copyrights: ['<a data-azure-maps-attribution-tileset="microsoft.base">&copy;2021 TomTom</a>'] }
```

### Request metadata for a tileset

```javascript
const credential = new DefaultAzureCredential();
const operationOptions = {
  requestOptions: {
    customHeaders: { "x-ms-client-id": process.env.MAPS_CLIENT_ID },
  },
};

const client = new RenderClient(credential).renderV2;
const metadata = await client.getMapTileset("microsoft.base", operationOptions);
```

Response

```yaml
{
  tilejson: "2.2.0",
  name: "microsoft.base",
  version: "1.0.0",
  attribution: '<a data-azure-maps-attribution-tileset="microsoft.base">&copy;2021 TomTom</a>',
  scheme: "xyz",
  tiles:
    [
      "https://atlas.microsoft.com/map/tile?api-version=2.1&tilesetId=microsoft.base&zoom={z}&x={x}&y={y}",
    ],
  grids: [],
  data: [],
  minzoom: 0,
  maxzoom: 22,
  bounds: [-180, -90, 180, 90],
}
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";
setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-render/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/tree/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fmaps%2Fmaps-render%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
