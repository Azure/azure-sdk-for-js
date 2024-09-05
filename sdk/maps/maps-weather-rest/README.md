# Azure MapsWeather REST client library for JavaScript

Azure Maps Weather Client

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

### Install the `@azure-rest/maps-weather` package

Install the Azure Maps Weather REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/maps-weather
```

### Create and authenticate a `MapsWeatherClient`

You'll need a `credential` instance for authentication when creating the `MapsWeatherClient` instance used to access the Azure Maps weather APIs. You can use either a Microsoft Entra ID credential or an Azure subscription key to authenticate. For more information on authentication, see [Authentication with Azure Maps][az_map_auth].

#### Using an Microsoft Entra ID credential

To use an [Microsoft Entra ID token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with Microsoft Entra ID, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity)

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.

You'll need to register the new Microsoft Entra ID application and grant access to Azure Maps by assigning the required role to your service principal. For more information, see [Host a daemon on non-Azure resources](https://learn.microsoft.com/azure/azure-maps/how-to-secure-daemon-app#host-a-daemon-on-non-azure-resources). Set the values of the client ID, tenant ID, and client secret of the Microsoft Entra ID application as environment variables:
`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

You will also need to specify the Azure Maps resource you intend to use by specifying the `clientId` in the client options.
The Azure Maps resource client id can be found in the Authentication sections in the Azure Maps resource. Please refer to the [documentation](https://docs.microsoft.com/azure/azure-maps/how-to-manage-authentication#view-authentication-details) on how to find it.

```javascript
const MapsWeather = require("@azure-rest/maps-weather").default;
const { DefaultAzureCredential } = require("@azure/identity");

const credential = new DefaultAzureCredential();
const client = MapsWeather(credential, "<maps-account-client-id>");
```

#### Using a Subscription Key Credential

You can authenticate with your Azure Maps Subscription Key. Please install the["@azure/core-auth"](https://www.npmjs.com/package/@azure/core-auth)package:

```bash
npm install @azure/core-auth
```

```javascript
const MapsWeather = require("@azure-rest/maps-weather").default;
const { AzureKeyCredential } = require("@azure/core-auth");

const credential = new AzureKeyCredential("<subscription-key>");
const client = MapsWeather(credential);
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
const MapsWeather = require("@azure-rest/maps-weather").default;
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
const client = MapsWeather(sasCredential);
```

## Key concepts

### MapsWeatherClient

`MapsWeatherClient` is the primary interface for developers using the Azure Maps Weather client library. Explore the methods on this client object to understand the different features of the Azure Maps Weather service that you can access.

## Examples

### Get Daily Air Quality Forecasts

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const MapsWeather = require("@azure-rest/maps-weather").default;

async function main() {
    const credential = new DefaultAzureCredential();
    const client = MapsWeather(credential, "<maps-account-client-id>");
    const response = await client.path("/weather/airQuality/forecasts/daily/{format}", "json").get({
        queryParameters: { query: [47.641268, -122.125679], duration: 5 }
    });
    console.log(response.body);
}
main();
```

### Get Hourly Air Quality Forecasts

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const MapsWeather = require("@azure-rest/maps-weather").default;

async function main() {
    const credential = new DefaultAzureCredential();
    const client = MapsWeather(credential, "<maps-account-client-id>");
    const response = await client.path("/weather/airQuality/forecasts/hourly/{format}", "json").get({
        queryParameters: { query: [47.641268, -122.125679], duration: 24 }
    });
    console.log(response.body);
}
main();
```

## Troubleshooting

### Enable Logging

Enable logging for HTTP requests and responses by setting the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, you can set the log level programmatically with `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");
setLogLevel("info");
```

For more detailed logging setup, check the [@azure/logger documentation](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next Steps

Check out the [samples directory][samples] for detailed examples.

## Contributing

For contributing to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md).

## Related Projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fmaps%2Fmaps-weather-rest%2FREADME.png)

[source_code]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-weather-rest
[npm_package]: https://www.npmjs.com/package/@azure-rest/maps-weather
[api_ref]: https://docs.microsoft.com/javascript/api/@azure-rest/maps-weather?view=azure-node-preview
[samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-weather-rest/samples
[product_info]: https://docs.microsoft.com/rest/api/maps/weather
[nodejs_release]: https://github.com/nodejs/release#release-schedule
[az_subscription]: https://azure.microsoft.com/free/
[az_maps_account_management]: https://docs.microsoft.com/azure/azure-maps/how-to-manage-account-keys
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://docs.microsoft.com/powershell/module/az.maps/new-azmapsaccount
[azure_cli]: https://docs.microsoft.com/cli/azure
[az_map_auth]: https://learn.microsoft.com/azure/azure-maps/azure-maps-authentication
