# Azure Maps Geolocation REST client library for JavaScript

Azure Maps Geolocation Client

\*\*If you are not familiar with our REST client, please spend 5 minutes to take a look at our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library, the REST client provides a light-weighted & developer friendly way to call azure rest api

Key links:

- [Source code][source_code]
- [Package (NPM)][npm_package]
- [API reference documentation][api_ref]
- [Samples][samples]
- [Product Information][product_info]

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge and Firefox.

### Prerequisites

- You must have an [Azure subscription][az_subscription] to use this package.
- An [Azure Maps account][az_maps_account_management]. You can create the resource via the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

If you use Azure CLI, replace `<resource-group-name>` and `<map-account-name>` of your choice, and select a proper [pricing tier][az_map_pricing] based on your needs via the `<sku-name>` parameter. Please refer to [Azure Maps Reference for Azure CLI][az_map_az_cli] for more details.

```bash
az maps account create --resource-group <resource-group-name> --name <map-account-name> --sku <sku-name>
```

### Install the `@azure-rest/maps-geolocation` package

Install the Azure Maps Geolocation REST client REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/maps-geolocation
```

### Create and authenticate a `MapsGeolocationClient`

You'll need a `credential` instance for authentication when creating the `MapsGeolocationClient` instance used to access the Azure Maps render APIs. You can use either an Azure Active Directory (Azure AD) credential or an Azure subscription key to authenticate. For more information on authentication, see [Authentication with Azure Maps][az_map_auth].

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
const MapsGeolocation = require("@azure-rest/maps-geolocation").default;
const { DefaultAzureCredential } = require("@azure/identity");
const credential = new DefaultAzureCredential();
const client = MapsGeolocation(credential, "<maps-account-client-id>");
```

#### Using a Subscription Key Credential

You can authenticate with your Azure Maps Subscription Key. Please install the `@azure/core-auth` package:

```bash
npm install @azure/core-auth
```

```javascript
const MapsGeolocation = require("@azure-rest/maps-geolocation").default;
const { AzureKeyCredential } = require("@azure/core-auth");
const credential = new AzureKeyCredential("<subscription-key>");
const client = MapsGeolocation(credential);
```

## Key concepts

### MapsGeolocationClient

`MapsGeolocationClient` is the primary interface for developers using the Azure Maps Geolocation client library. Explore the methods on this client object to understand the different features of the Azure Maps Geolocation service that you can access.

## Examples

You can get the country code from a IP address:

```javascript
const { isUnexpected } = require("@azure-rest/maps-geolocation");

const result = await client.path("/geolocation/ip/{format}", "json").get({
  queryParameters: { ip: "2001:4898:80e8:b::189" },
});

if (isUnexpected(result)) {
  throw result.body.error;
}
if (!result.body.countryRegion) {
  throw new Error("No country region was found for the IP address.");
}
console.log(`The country code for the IP address is ${result.body.countryRegion.isoCode}`);
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fmaps%2Fmaps-geolocation-rest%2FREADME.png)

[source_code]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-geolocation-rest
[npm_package]: https://www.npmjs.com/package/@azure-rest/maps-geolocation
[api_ref]: https://docs.microsoft.com/javascript/api/@azure-rest/maps-geolocation?view=azure-node-preview
[samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-geolocation-rest/samples
[product_info]: https://learn.microsoft.com/rest/api/maps/geolocation
[az_subscription]: https://azure.microsoft.com/free/
[az_maps_account_management]: https://docs.microsoft.com/azure/azure-maps/how-to-manage-account-keys
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://docs.microsoft.com/powershell/module/az.maps/new-azmapsaccount
[azure_cli]: https://docs.microsoft.com/cli/azure
[az_map_pricing]: https://docs.microsoft.com/azure/azure-maps/choose-pricing-tier
[az_map_az_cli]: https://docs.microsoft.com/cli/azure/maps/account?view=azure-cli-latest#az_maps_account_create
[az_map_auth]: https://learn.microsoft.com/azure/azure-maps/azure-maps-authentication
