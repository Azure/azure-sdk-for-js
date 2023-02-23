# Azure MapsRender REST client library for JavaScript

Azure Maps Render Client

\*\*If you are not familiar with our REST client, please spend 5 minutes to take a look at our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library, the REST client provides a light-weighted & developer friendly way to call azure rest api

Key links:

- [Source code][source_code]
- [Package (NPM)][npm_package]
- [API reference documentation][api_ref]
- [Product Information][product_info]

## Getting started

### Currently supported environments

- [LTS versions of Node.js][nodejs_release]
- Latest versions of Safari, Chrome, Edge and Firefox.

### Prerequisites

- You must have an [Azure subscription][az_subscription] to use this package.
- An [Azure Maps account][az_maps_account_management]. You can create the resource via the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

If you use Azure CLI, replace `<resource-group-name>` and `<map-account-name>` of your choice, and select a proper [pricing tier][az_map_pricing] based on your needs via the `<sku-name>` parameter. Please refer to [Azure Maps Reference for Azure CLI][az_map_az_cli] for more details.

```bash
az maps account create --resource-group <resource-group-name> --name <map-account-name> --sku <sku-name>
```

### Install the `@azure-rest/maps-render` package

Install the Azure Maps Render REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/maps-render
```

### Create and authenticate a `MapsRenderClient`

You'll need a `credential` instance for authentication when creating the `MapsRenderClient` instance used to access the Azure Maps render APIs. You can use either an Azure Active Directory (Azure AD) credential or an Azure subscription key to authenticate. For more information on authentication, see [Authentication with Azure Maps][az_map_auth].

#### Using an Azure AD credential

To use an [Azure Active Directory (AAD) token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity)

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.

You'll need to register the new Azure AD application and grant access to Azure Maps by assigning the required role to your service principal. For more information, see [Host a daemon on non-Azure resources](https://learn.microsoft.com/azure/azure-maps/how-to-secure-daemon-app#host-a-daemon-on-non-azure-resources). Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

You will also need to specify the Azure Maps resource you intend to use by specifying the `clientId` in the client options.
The Azure Maps resource client id can be found in the Authentication sections in the Azure Maps resource. Please refer to the [documentation](https://docs.microsoft.com/azure/azure-maps/how-to-manage-authentication#view-authentication-details) on how to find it.

```javascript
const MapsRender = require("@azure-rest/maps-render").default;
const { DefaultAzureCredential } = require("@azure/identity");

const credential = new DefaultAzureCredential();
const client = MapsRender(credential, "<maps-account-client-id>");
```

#### Using a Subscription Key Credential

You can authenticate with your Azure Maps Subscription Key. Please install the `@azure/core-auth` package:

```bash
npm install @azure/core-auth
```

```javascript
const MapsRender = require("@azure-rest/maps-render").default;
const { AzureKeyCredential } = require("@azure/core-auth");

const credential = new AzureKeyCredential("<subscription-key>");
const client = MapsRender(credential);
```

## Key concepts

### MapsRenderClient

`MapsRenderClient` is the primary interface for developers using the Azure Maps Render client library. Explore the methods on this client object to understand the different features of the Azure Maps Render service that you can access.

## Examples

The following sections provide several code snippets covering some of the most common Azure Maps Render tasks, including:

- [Request map tiles in vector or raster formats](#request-map-tiles-in-vector-or-raster-formats)
- [Request map copyright attribution information](#request-map-copyright-attribution-information)
- [Request metadata for a tileset](#request-metadata-for-a-tileset)

### Request map tiles in vector or raster formats

You can request map tiles in vector or raster formats. These tiles are typically to be integrated into a map control or SDK.
Some example tiles that can be requested are Azure Maps road tiles, real-time Weather Radar tiles or the map tiles created using [Azure Maps Creator](https://docs.microsoft.com/shows/internet-of-things-show/introducing-azure-maps-creator).

```javascript
const { createWriteStream } = require("fs");
const { positionToTileXY } = require("@azure-rest/maps-render");

const zoom = 6;
// Use the helper function `positionToTileXY` to get the tile index from the coordinate.
const { x, y } = positionToTileXY([47.61559, -122.33817], 6, "256");
const response = await client
  .path("/map/tile")
  .get({
    queryParameters: {
      tilesetId: "microsoft.base.road",
      zoom,
      x,
      y,
    },
  })
  .asNodeStream();

// Handle the error.
if (!response.body) {
  throw Error("No response body");
}
response.body.pipe(createWriteStream("tile.png"));
```

### Request map copyright attribution information

You can request map copyright attribution information for a section of a tileset.
A tileset is a collection of raster or vector data broken up into a uniform grid of square tiles at preset zoom levels. Every tileset has a tilesetId to use when making requests. The supported tilesetIds are listed [here](https://docs.microsoft.com/rest/api/maps/render-v2/get-map-attribution?tabs=HTTP#tilesetid).

```javascript
const { isUnexpected } = require("@azure-rest/maps-render");

const response = await client.path("/map/attribution").get({
  queryParameters: {
    tilesetId: "microsoft.base",
    zoom: 6,
    /** The order is [SouthwestCorner_Longitude, SouthwestCorner_Latitude, NortheastCorner_Longitude, NortheastCorner_Latitude] */
    bounds: [-122.414162, 47.57949, -122.247157, 47.668372],
  },
});

// Handle exception.
if (isUnexpected(response)) {
  throw response.body.error;
}

console.log("Copyright attribution for microsoft.base: ");
response.body.copyrights.forEach((copyright) => console.log(copyright));
```

### Request metadata for a tileset

You can request metadata for a tileset in TileJSON format using the following code snippet.

```javascript
const { isUnexpected } = require("@azure-rest/maps-render");

const response = await client.path("/map/tileset").get({
  queryParameters: {
    tilesetId: "microsoft.base",
  },
});

if (isUnexpected(response)) {
  throw response.body.error;
}

console.log("The metadata of Microsoft Base tileset: ");
const { maxzoom, minzoom, bounds = [] } = response.body;
console.log(`The zoom range started from ${minzoom} to ${maxzoom}`);
console.log(
  `The left bound is ${bounds[0]}, bottom bound is ${bounds[1]}, right bound is ${bounds[2]}, and top bound is ${bounds[3]}`
);
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples][samples] directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fmaps%2Fmaps-render-rest%2FREADME.png)

[source_code]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-render-rest
[npm_package]: https://www.npmjs.com/package/@azure-rest/maps-render
[api_ref]: https://docs.microsoft.com/javascript/api/@azure-rest/maps-render?view=azure-node-preview
[samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-render-rest/samples
[product_info]: https://docs.microsoft.com/rest/api/maps/render-v2
[nodejs_release]: https://nodejs.org/about/releases/
[az_subscription]: https://azure.microsoft.com/free/
[az_maps_account_management]: https://docs.microsoft.com/azure/azure-maps/how-to-manage-account-keys
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://docs.microsoft.com/powershell/module/az.maps/new-azmapsaccount
[azure_cli]: https://docs.microsoft.com/cli/azure
[az_map_pricing]: https://docs.microsoft.com/azure/azure-maps/choose-pricing-tier
[az_map_az_cli]: https://docs.microsoft.com/cli/azure/maps/account?view=azure-cli-latest#az_maps_account_create
[az_map_auth]: https://learn.microsoft.com/azure/azure-maps/azure-maps-authentication
