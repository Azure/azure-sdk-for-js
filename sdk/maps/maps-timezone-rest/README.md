
# Azure MapsTimezone REST client library for JavaScript

Azure Maps Timezone Client

**If you are not familiar with our REST client, please spend 5 minutes to take a look at our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library. The REST client provides a lightweight and developer-friendly way to call Azure REST APIs.**

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-timezone-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/maps-timezone)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure-rest/maps-timezone?view=azure-node-preview)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-timezone-rest/samples)

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.

### Install the `@azure-rest/maps-timezone` package

Install the Azure Maps Timezone REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/maps-timezone
```

### Create and authenticate a `MapsTimezoneClient`

You'll need a `credential` instance for authentication when creating the `MapsTimezoneClient` instance used to access the Azure Maps timezone APIs. You can use either a Microsoft Entra ID credential or an Azure subscription key to authenticate. For more information on authentication, see [Authentication with Azure Maps](https://learn.microsoft.com/azure/azure-maps/azure-maps-authentication).

#### Using an Microsoft Entra ID credential

To use an [Microsoft Entra ID token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token), provide an instance of the desired credential type obtained from the [@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity).

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use. As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential) can be used to authenticate the client.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```javascript
const MapsTimezone = require("@azure-rest/maps-timezone").default;
const { DefaultAzureCredential } = require("@azure/identity");

const credential = new DefaultAzureCredential();
const client = MapsTimezone(credential);
```

#### Using a Subscription Key Credential

You can authenticate with your Azure Maps Subscription Key. Please install the `@azure/core-auth` package:

```bash
npm install @azure/core-auth
```

```javascript
const MapsTimezone = require("@azure-rest/maps-timezone").default;
const { AzureKeyCredential } = require("@azure/core-auth");

const credential = new AzureKeyCredential("<subscription-key>");
const client = MapsTimezone(credential);
```

#### Using a Shared Access Signature (SAS) Token Credential

Shared access signature (SAS) tokens are authentication tokens created using the JSON Web token (JWT) format and are cryptographically signed to prove authentication for an application to the Azure Maps REST API.

You can get the SAS token using [`AzureMapsManagementClient.accounts.listSas`](https://learn.microsoft.com/javascript/api/%40azure/arm-maps/accounts?view=azure-node-latest#@azure-arm-maps-accounts-listsas) from the `@azure/arm-maps` package. Please follow the section [Create and authenticate an `AzureMapsManagementClient`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/arm-maps#create-and-authenticate-an-azuremapsmanagementclient) to set up first.

Second, follow [Managed identities for Azure Maps](https://techcommunity.microsoft.com/t5/azure-maps-blog/managed-identities-for-azure-maps/ba-p/3666312) to create a managed identity for your Azure Maps account. Copy the principal ID (object ID) of the managed identity.

Finally, you can use the SAS token to authenticate the client:

```javascript
const MapsTimezone = require("@azure-rest/maps-timezone").default;
const { AzureSASCredential } = require("@azure/core-auth");
const { DefaultAzureCredential } = require("@azure/identity");
const { AzureMapsManagementClient } = require("@azure/arm-maps");

const subscriptionId = "<subscription ID of the map account>";
const resourceGroupName = "<resource group name of the map account>";
const accountName = "<name of the map account>";
const mapsAccountSasParameters = {
  start: "<start time in ISO format>", // e.g., "2023-11-24T03:51:53.161Z"
  expiry: "<expiry time in ISO format>", // maximum value to start + 1 day
  maxRatePerSecond: 500,
  principalId: "<principal ID (object ID) of the managed identity>",
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
const client = MapsTimezone(sasCredential);
```

## Key concepts

### MapsTimezoneClient

`MapsTimezoneClient` is the primary interface for developers using the Azure Maps Timezone client library. Explore the methods on this client object to understand the different features of the Azure Maps Timezone service that you can access.

## Examples

The following sections provide several code snippets covering some of the most common Azure Maps Timezone tasks, including:

- [Get timezone by ID](#get-timezone-by-id)
- [Get timezone by coordinates](#get-timezone-by-coordinates)
- [Get Windows timezone IDs](#get-windows-timezone-ids)
- [Get IANA timezone IDs](#get-iana-timezone-ids)
- [Get IANA version](#get-iana-version)
- [Convert Windows timezone to IANA](#convert-windows-timezone-to-iana)

### Get timezone by ID

You can get timezone information for a specific IANA time zone ID.

```javascript
const response = await client.path("/timezone/byId/{format}", "json").get({
    queryParameters: {
        query: "America/New_York"
    },
});

if (isUnexpected(response)) {
    throw response.body.error;
}

console.log(response.body);
```

### Get timezone by coordinates

You can get timezone information for a specific latitude-longitude pair.

```javascript
const response = await client.path("/timezone/byCoordinates/{format}", "json").get({
    queryParameters: {
        query: [40.7128, -74.0060]
    },
});

if (isUnexpected(response)) {
    throw response.body.error;
}

console.log(response.body);
```

### Get Windows timezone IDs

You can get a list of Windows Time Zone IDs.

```javascript
const response = await client.path("/timezone/enumWindows/{format}", "json").get();

if (isUnexpected(response)) {
    throw response.body.error;
}

console.log(response.body);
```

### Get IANA timezone IDs

You can get a list of IANA Time Zone IDs.

```javascript
const response = await client.path("/timezone/enumIana/{format}", "json").get();

if (isUnexpected(response)) {
    throw response.body.error;
}

console.log(response.body);
```

### Get IANA version

You can get the current IANA version number.

```javascript
const response = await client.path("/timezone/ianaVersion/{format}", "json").get();

if (isUnexpected(response)) {
    throw response.body.error;
}

console.log(response.body.Version);
```

### Convert Windows timezone to IANA

You can convert a Windows Time Zone ID to a corresponding IANA ID.

```javascript
const response = await client.path("/timezone/windowsToIana/{format}", "json").get({
    queryParameters: { query: "Eastern Standard Time" },
});

if (isUnexpected(response)) {
    throw response.body.error;
} else if (response.body) {
    console.log(response.body.map((ianaId) => ianaId).join(", "));
} else {
    console.error("No data returned");
}
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

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-timezone-rest/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)
