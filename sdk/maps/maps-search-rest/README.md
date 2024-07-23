# Azure Maps Search REST client library for JavaScript

Azure Maps Search Client

\*\*If you are not familiar with our REST client, please spend 5 minutes to take a look at our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library, the REST client provides a light-weighted & developer friendly way to call azure rest api

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-search-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/maps-search)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure-rest/maps-search?view=azure-node-preview)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-search-rest/samples)
- [Product Information](https://docs.microsoft.com/rest/api/maps/search)

| Package Version | Service Version |
| --------------- | --------------- |
| ^1.0.0          | V1              |
| ^2.0.0          | V2              |

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
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

To create a client object to access the Azure Maps Search APIs, you will need a `credential` object. The Azure Maps Search client can use a Microsoft Entra ID credential or an Azure Key credential to authenticate.

#### Using a Microsoft Entra ID Credential

You can authenticate with Microsoft Entra ID using the [Azure Identity library](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity). To use the [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential) provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to register a new Microsoft Entra ID application and grant access to Azure Maps by assigning the suitable role to your service principal. Please refer to the [Manage authentication](https://docs.microsoft.com/azure/azure-maps/how-to-manage-authentication) page.

Set the values of the client ID, tenant ID, and client secret of the Microsoft Entra ID application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

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

#### Using a Shared Access Signature (SAS) Token Credential

Shared access signature (SAS) tokens are authentication tokens created using the JSON Web token (JWT) format and are cryptographically signed to prove authentication for an application to the Azure Maps REST API.

You can get the SAS token using [`AzureMapsManagementClient.accounts.listSas`](https://learn.microsoft.com/javascript/api/%40azure/arm-maps/accounts?view=azure-node-latest#@azure-arm-maps-accounts-listsas) from ["@azure/arm-maps"](https://www.npmjs.com/package/@azure/arm-maps) package. Please follow the section [Create and authenticate a `AzureMapsManagementClient`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/arm-maps#create-and-authenticate-a-azuremapsmanagementclient) to setup first.

Second, follow [Managed identities for Azure Maps](https://techcommunity.microsoft.com/t5/azure-maps-blog/managed-identities-for-azure-maps/ba-p/3666312) to create a managed identity for your Azure Maps account. Copy the principal ID (object ID) of the managed identity.

Third, you will need to install["@azure/core-auth"](https://www.npmjs.com/package/@azure/core-auth)package to use `AzureSASCredential`:

```bash
npm install @azure/core-auth
```

Finally, you can use the SAS token to authenticate the client:

```javascript
const MapsSearch = require("@azure-rest/maps-search").default;
const { AzureSASCredential } = require("@azure/core-auth");
const { DefaultAzureCredential } = require("@azure/identity");
const { AzureMapsManagementClient } = require("@azure/arm-maps");

const subscriptionId = "<subscription ID of the map account>";
const resourceGroupName = "<resource group name of the map account>";
const accountName = "<name of the map account>";
const mapsAccountSasParameters = {
  start: "<start time in ISO format>", // e.g. "2023-11-24T03:51:53.161Z"
  expiry: "<expiry time in ISO format>", // maximum value to start + 1 day
  maxRatePerSecond: 500,
  principalId: "<principle ID (object ID) of the managed identity>",
  signingKey: "primaryKey",
};
const credential = new DefaultAzureCredential();
const managementClient = new AzureMapsManagementClient(credential, subscriptionId);
const { accountSasToken } = await managementClient.accounts.listSas(
  resourceGroupName,
  accountName,
  mapsAccountSasParameters,
);
if (accountSasToken === undefined) {
  throw new Error("No accountSasToken was found for the Maps Account.");
}
const sasCredential = new AzureSASCredential(accountSasToken);
const client = MapsSearch(sasCredential);
```

## Key concepts

### MapsSearchClient

`MapsSearchClient` is the primary interface for developers using the Azure Maps Search client library. Explore the methods on this client object to understand the different features of the Azure Maps Search service that you can access.

## Examples

The following sections provide several code snippets covering some of the most common Azure Maps Search tasks, including:

- [Request latitude and longitude coordinates for an address](#request-latitude-and-longitude-coordinates-for-an-address)
- [Make a Reverse Address Search to translate coordinate location to street address](#make-a-reverse-address-search-to-translate-coordinate-location-to-street-address)

### Request latitude and longitude coordinates for an address

You can use an authenticated client to convert an address into latitude and longitude coordinates. This process is also called geocoding. In addition to returning the coordinates, the response will also return detailed address properties such as postal code, admin districts, and country/region information.

```javascript
const MapsSearch = require("@azure-rest/maps-search").default;
const { AzureKeyCredential } = require("@azure/core-auth");
const { isUnexpected } = require("@azure-rest/maps-search");

/** Initialize the MapsSearchClient */
const client = MapsSearch(new AzureKeyCredential("<subscription-key>"));

async function main() {
  /** Make a request to the geocoding API */
  const response = await client
    .path("/geocode")
    .get({ queryParameters: { query: "400 Broad, Seattle" } });
  /** Handle error response */
  if (isUnexpected(response)) {
    throw response.body.error;
  }
  /** Log the response body. */
  if (!response.body.features) {
    console.log(`No coordinates found for the address.`);
  } else {
    console.log(`The followings are the possible coordinates of the address:`);
    for (const result of response.body.features) {
      const [lon, lat] = result.geometry.coordinates;
      console.log(`Latitude: ${lat}, Longitude ${lon}`);
      console.log("Postal code: ", result.properties?.address?.postalCode);
      console.log("Admin districts: ", result.properties?.address?.adminDistricts?.join(", "));
      console.log("Country region: ", result.properties?.address?.countryRegion);
    }
  }
}

main().catch((err) => {
  console.log(err);
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

async function main() {
  /** Make the request. */
  const response = await client.path("/reverseGeocode").get({
    queryParameters: { coordinates: [-121.89, 37.337] }, // [longitude, latitude],
  });
  /** Handle error response. */
  if (isUnexpected(response)) {
    throw response.body.error;
  }
  if (!response.body.features || response.body.features.length === 0) {
    console.log("No results found.");
  } else {
    /** Log the response body. */
    for (const feature of response.body.features) {
      if (feature.properties?.address?.formattedAddress) {
        console.log(feature.properties.address.formattedAddress);
      } else {
        console.log("No address found.");
      }
    }
  }
}

main().catch((err) => {
  console.log(err);
});
```

## Use V1 SDK

We'll bring all the V1 features to V2 in the near future, but if you want to use V1 SDK, you can install the packages as below:

```bash
npm install @azure-rest/map-search-v1@npm:@azure-rest/map-search@^1.0.0
npm install @azure-rest/map-search-v2@npm:@azure-rest/map-search@^2.0.0
```

Then, you can import the two packages:

```javascript
const MapsSearchV1 = require("@azure-rest/map-search-v1").default;
const MapsSearchV2 = require("@azure-rest/map-search-v2").default;
```

In the following example, we want to accept an address and search POIs around it. We'll use V2 SDK to get the coordinate of the address(/geocode), and use V1 SDK to search POIs around it(/search/nearby).

```javascript
const MapsSearchV1 = require("@azure-rest/map-search-v1").default;
const MapsSearchV2 = require("@azure-rest/map-search-v2").default;
const { AzureKeyCredential } = require("@azure/core-auth");
const { isUnexpected: isUnexpectedV1 } = require("@azure-rest/maps-search-v1");
const { isUnexpected: isUnexpectedV2 } = require("@azure-rest/maps-search-v2");

/** Initialize the MapsSearchClient */
const clientV1 = MapsSearchV1(new AzureKeyCredential("<subscription-key>"));
const clientV2 = MapsSearchV2(new AzureKeyCredential("<subscription-key>"));

async function searchNearby(address) {
  /** Make a request to the geocoding API */
  const geocodeResponse = await clientV2
    .path("/geocode")
    .get({ queryParameters: { query: address } });
  /** Handle error response */
  if (isUnexpectedV2(geocodeResponse)) {
    throw geocodeResponse.body.error;
  }

  const [lon, lat] = geocodeResponse.body.features[0].geometry.coordinates;

  /** Make a request to the search nearby API */
  const nearByResponse = await clientV1.path("/search/nearby/{format}", "json").get({
    queryParameters: { lat, lon },
  });
  /** Handle error response */
  if (isUnexpectedV1(nearByResponse)) {
    throw nearByResponse.body.error;
  }
  /** Log response body */
  for (const results of nearByResponse.body.results) {
    console.log(
      `${result.poi ? result.poi.name + ":" : ""} ${result.address.freeformAddress}. (${
        result.position.lat
      }, ${result.position.lon})\n`,
    );
  }
}

async function main() {
  searchNearBy("15127 NE 24th Street, Redmond, WA 98052");
}

main().catch((err) => {
  console.log(err);
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
