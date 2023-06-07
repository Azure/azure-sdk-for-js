# Azure Maps Search REST client library for JavaScript

Azure Maps Search Client

\*\*If you are not familiar with our REST client, please spend 5 minutes to take a look at our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library, the REST client provides a light-weighted & developer friendly way to call azure rest api

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-search-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/maps-search)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure-rest/maps-search?view=azure-node-preview)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-search-rest/samples)
- [Product Information](https://docs.microsoft.com/rest/api/maps/search)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge and Firefox.

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.
- An [Azure Maps account](https://docs.microsoft.com/azure/azure-maps/how-to-manage-account-keys). You can create the resource via the [Azure Portal](https://portal.azure.com), the [Azure PowerShell](https://docs.microsoft.com/powershell/module/az.maps/new-azmapsaccount), or the [Azure CLI](https://docs.microsoft.com/cli/azure).

If you use Azure CLI, replace `<resource-group-name>` and `<map-account-name>` of your choice, and select a proper [pricing tier](https://docs.microsoft.com/azure/azure-maps/choose-pricing-tier) based on your needs via the `<sku-name>` parameter. Please refer to [this page](https://docs.microsoft.com/cli/azure/maps/account?view=azure-cli-latest#az_maps_account_create) for more details.

```bash
az maps account create --resource-group <resource-group-name> --name <map-account-name> --sku <sku-name>
```

### Install the `@azure-rest/maps-search` package

Install the Azure Maps Search REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/maps-search
```

### Create and authenticate a `MapsSearchClient`

To create a client object to access the Azure Maps Search APIs, you will need a `credential` object. The Azure Maps Search client can use an Azure Active Directory credential or an Azure Key credential to authenticate.

#### Using an Azure Active Directory Credential

You can authenticate with Azure Active Directory using the [Azure Identity library](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity). To use the [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential) provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to register a new AAD application and grant access to Azure Maps by assigning the suitable role to your service principal. Please refer to the [Manage authentication](https://docs.microsoft.com/azure/azure-maps/how-to-manage-authentication) page.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

You will also need to specify the Azure Maps resource you intend to use by specifying the `clientId` in the client options.
The Azure Maps resource client id can be found in the Authentication sections in the Azure Maps resource. Please refer to the [documentation](https://docs.microsoft.com/azure/azure-maps/how-to-manage-authentication#view-authentication-details) on how to find it.

```javascript
const MapsSearch = require("@azure-rest/maps-search").default;
const { DefaultAzureCredential } = require("@azure/identity");

const credential = new DefaultAzureCredential();
const client = MapsSearch(credential, "<maps-account-client-id>");
```

#### Using a Subscription Key Credential

You can authenticate with your Azure Maps Subscription Key.

```javascript
const MapsSearch = require("@azure-rest/maps-search").default;
const { AzureKeyCredential } = require("@azure/core-auth");

const credential = new AzureKeyCredential("<subscription-key>");
const client = MapsSearch(credential);
```

## Key concepts

### MapsSearchClient

`MapsSearchClient` is the primary interface for developers using the Azure Maps Search client library. Explore the methods on this client object to understand the different features of the Azure Maps Search service that you can access.

## Examples

The following sections provide several code snippets covering some of the most common Azure Maps Search tasks, including:

- [Request latitude and longitude coordinates for an address](#request-latitude-and-longitude-coordinates-for-an-address)
- [Search for an address or Point of Interest](#search-for-an-address-or-point-of-interest)
- [Make a Reverse Address Search to translate coordinate location to street address](#make-a-reverse-address-search-to-translate-coordinate-location-to-street-address)
- [Translate coordinate location into a human understandable cross street](#translate-coordinate-location-into-a-human-understandable-cross-street)

### Request latitude and longitude coordinates for an address

You can use an authenticated client to convert an address into latitude and longitude coordinates. This process is also called geocoding. In addition to returning the coordinates, the response will also return detailed address properties such as street, postal code, municipality, and country/region information.

```javascript
const MapsSearch = require("@azure-rest/maps-search").default;
const { AzureKeyCredential } = require("@azure/core-auth");
const { isUnexpected } = require("@azure-rest/maps-search");

/** Initialize the MapsSearchClient */
const client = MapsSearch(new AzureKeyCredential("<subscription-key>"));
/** Make a request to the geocoding API */
const response = await client
  .path("/search/address/{format}", "json")
  .get({ queryParameters: { query: "400 Broad, Seattle" } });
/** Handle error response */
if (isUnexpected(response)) {
  throw response.body.error;
}
/** Log the response body. */
console.log(`The followings are the possible coordinates of the address:`);
response.body.results.forEach((result) => {
  const { lat, lon } = result.position;
  console.log(`Latitude: ${lat}, Longitude: ${lon}`);
});
```

### Search for an address or Point of Interest

You can use Fuzzy Search to search an address or a point of interest (POI). The following example demonstrates how to search for `pizza` over the scope of a specific country (`France`, in this example).

```javascript
const MapsSearch = require("@azure-rest/maps-search").default;
const { AzureKeyCredential } = require("@azure/core-auth");
const { isUnexpected } = require("@azure-rest/maps-search");

/** Initialize the MapsSearchClient */
const client = MapsSearch(new AzureKeyCredential("<subscription-key>"));
/** Make a request */
const response = await client
  .path("/search/fuzzy/{format}", "json")
  .get({ queryParameters: { query: "pizza", countrySet: ["fr"] } });
/** Handle the error response */
if (isUnexpected(response)) {
  throw response.body.error;
}
/** Log the response body */
response.body.results.forEach((result) => {
  console.log(`Address: ${result.address.freeformAddress}`);
  console.log(`Coordinate: (${result.position.lat}, ${result.position.lon})\n`);
});
```

### Make a Reverse Address Search to translate coordinate location to street address

You can translate coordinates into human readable street addresses. This process is also called reverse geocoding.
This is often used for applications that consume GPS feeds and want to discover addresses at specific coordinate points.

```javascript
const MapsSearch = require("@azure-rest/maps-search").default;
const { AzureKeyCredential } = require("@azure/core-auth");
const { isUnexpected } = require("@azure-rest/maps-search");

/** Initialize the MapsSearchClient */
const client = MapsSearch(new AzureKeyCredential("<subscription-key>"));
/** Make the request. */
const response = await client.path("/search/address/reverse/{format}", "json").get({
  queryParameters: { query: [37.337, -121.89] }, // [latitude, longitude],
});
/** Handle error response. */
if (isUnexpected(response)) {
  throw response.body.error;
}
/** Log the response body. */
response.body.addresses.forEach((address) => {
  console.log(address.address.freeformAddress);
});
```

### Translate coordinate location into a human understandable cross street

Translate coordinate location into a human understandable cross street by using Search Address Reverse Cross Street API. Most often, this is needed in tracking applications that receive a GPS feed from a device or asset, and wish to know where the coordinate is located.

```javascript
const MapsSearch = require("@azure-rest/maps-search").default;
const { AzureKeyCredential } = require("@azure/core-auth");
const { isUnexpected } = require("@azure-rest/maps-search");

/** Initialize the MapsSearchClient */
const client = MapsSearch(new AzureKeyCredential("<subscription-key>"));
/** Make the request. */
const response = await client.path("/search/address/reverse/crossStreet/{format}", "json").get({
  queryParameters: { query: [37.337, -121.89] },
});
/** Handle error response */
if (isUnexpected(response)) {
  throw response.body.error;
}
/** Log the response body */
response.body.addresses.forEach(({ address }) => {
  if (!address) {
    throw Error("Unexpected error: address is undefined");
  }
  console.log(address.streetName);
});
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fmaps%2Fmap-search-rest%2FREADME.png)
