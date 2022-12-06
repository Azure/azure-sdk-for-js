# Azure Maps Search client library for JavaScript/TypeScript

The Azure Maps Search Service is a set of RESTful APIs designed to help developers search addresses, places, and business listings by name, category, and other geographic information. In addition to supporting traditional geocoding, services can also reverse geocode addresses and cross streets based on latitudes and longitudes. Latitude and longitude values returned by the search can be used as parameters in other Azure Maps services, such as [Route](https://docs.microsoft.com/rest/api/maps/route) and [Weather](https://docs.microsoft.com/rest/api/maps/weather) services.

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure Maps Search client.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-search) |
[Package (NPM)](https://www.npmjs.com/package/@azure/maps-search) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-search/samples) |
[Product Information](https://docs.microsoft.com/rest/api/maps/search)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge and Firefox.

### Prerequisites

- An [Azure subscription][azure_sub].
- An [Azure Maps account](https://docs.microsoft.com/azure/azure-maps/how-to-manage-account-keys). You can create the resource via the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

If you use Azure CLI, replace `<resource-group-name>` and `<map-account-name>` of your choice, and select a proper [pricing tier](https://docs.microsoft.com/azure/azure-maps/choose-pricing-tier) based on your needs via the `<sku-name>` parameter. Please refer to [this page](https://docs.microsoft.com/cli/azure/maps/account?view=azure-cli-latest#az_maps_account_create) for more details.

```bash
az maps account create --resource-group <resource-group-name> --name <map-account-name> --sku <sku-name>
```

### Install the `@azure/maps-search` package

Install the Azure Maps Search client library with `npm`:

```bash
npm install @azure/maps-search
```

### Create and authenticate a `MapsSearchClient`

To create a client object to access the Azure Maps Search APIs, you will need a `credential` object. The Azure Maps Search client can use an Azure Active Directory credential or an Azure Key credential to authenticate.

#### Using an Azure Active Directory Credential

You can authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to register a new AAD application and grant access to Azure Maps by assigning the suitable role to your service principal. Please refer to the [Manage authentication](https://docs.microsoft.com/azure/azure-maps/how-to-manage-authentication) page.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

You will also need to specify the Azure Maps resource you intend to use by specifying the `clientId` in the client options.
The Azure Maps resource client id can be found in the Authentication sections in the Azure Maps resource. Please refer to the [documentation](https://docs.microsoft.com/azure/azure-maps/how-to-manage-authentication#view-authentication-details) on how to find it.

```javascript
const { MapsSearchClient } = require("@azure/maps-search");
const { DefaultAzureCredential } = require("@azure/identity");

const credential = new DefaultAzureCredential();
const client = new MapsSearchClient(credential, "<maps-account-client-id>");
```

#### Using a Subscription Key Credential

You can authenticate with your Azure Maps Subscription Key.

```javascript
const { MapsSearchClient, AzureKeyCredential } = require("@azure/maps-search");

const credential = new AzureKeyCredential("<subscription-key>");
const client = new MapsSearchClient(credential);
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
const searchResult = await client.searchAddress("400 Broad, Seattle");
for (const {
  position: { lat, lon },
} of searchResult.results) {
  console.log(`Latitude: ${lat}, Longitude: ${lon}`);
}
```

### Search for an address or Point of Interest

You can use Fuzzy Search to search an address or a point of interest (POI). The following example demonstrates how to search for `pizza` over the scope of a specific country (`France`, in this example).

```javascript
const fuzzySearchResult = await client.fuzzySearch({ query: "pizza", countryCodeFilter: ["fr"] });
for (const result of fuzzySearchResult.results) {
  console.log(result);
}
```

### Make a Reverse Address Search to translate coordinate location to street address

You can translate coordinates into human readable street addresses. This process is also called reverse geocoding.
This is often used for applications that consume GPS feeds and want to discover addresses at specific coordinate points.

```javascript
const coordinates = [47.59118, -122.3327]; // [latitude, longitude]

const addresses = await client.reverseSearchAddress(coordinates).result;
for (const { address } of addresses) {
  console.log(address);
}
```

### Translate coordinate location into a human understandable cross street

Translate coordinate location into a human understandable cross street by using Search Address Reverse Cross Street API. Most often, this is needed in tracking applications that receive a GPS feed from a device or asset, and wish to know where the coordinate is located.

```javascript
const coordinates = [47.59118, -122.3327]; // [latitude, longitude]

const addresses = await client.reverseSearchCrossStreetAddress(coordinates).result;
for (const { address } of addresses) {
  console.log(address);
}
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");
setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-search/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/tree/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fmaps%2Fmaps-search%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://docs.microsoft.com/powershell/module/az.maps/new-azmapsaccount
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
