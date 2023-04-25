# Azure LoadTest client library for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure LoadTest client.

LoadTest client provides access to LoadTest Resource and it's status operations.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/loadtesting/arm-loadtesting) |
[Package (NPM)](https://www.npmjs.com/package/@azure/arm-loadtesting) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/arm-loadtesting) |
[Samples](https://github.com/Azure-Samples/azure-samples-js-management)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].

### Install the `@azure/arm-loadtesting` package

Install the Azure LoadTest client library for JavaScript with `npm`:

```bash
npm install @azure/arm-loadtesting
```

### Create and authenticate a `LoadTestClient`

To create a client object to access the Azure LoadTest API, you will need the `endpoint` of your Azure LoadTest resource and a `credential`. The Azure LoadTest client can use Azure Active Directory credentials to authenticate.
You can find the endpoint for your Azure LoadTest resource in the [Azure Portal][azure_portal].

You can authenticate with Azure Active Directory using a credential from the [@azure/identity][azure_identity] library or [an existing AAD Token](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token).

To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to **register a new AAD application and grant access to Azure LoadTest** by assigning the suitable role to your service principal (note: roles such as `"Owner"` will not grant the necessary permissions).
Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

For more information about how to create an Azure AD Application check out [this guide](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal).

```javascript
const { LoadTestClient } = require("@azure/arm-loadtesting");
const { DefaultAzureCredential } = require("@azure/identity");
// For client-side applications running in the browser, use InteractiveBrowserCredential instead of DefaultAzureCredential. See https://aka.ms/azsdk/js/identity/examples for more details.

const subscriptionId = "00000000-0000-0000-0000-000000000000";
const client = new LoadTestClient(new DefaultAzureCredential(), subscriptionId);

// For client-side applications running in the browser, use this code instead:
// const credential = new InteractiveBrowserCredential({
//   tenantId: "<YOUR_TENANT_ID>",
//   clientId: "<YOUR_CLIENT_ID>"
// });
// const client = new LoadTestClient(credential, subscriptionId);
```

### Create an Azure Load Testing resource

Create a new Azure Load Testing resource.
```javascript
loadTestResourceCreatePayload = {
  location: "westus2"
};

const resource = await client.loadTests.beginCreateOrUpdateAndWait(
  "sample-rg",
  "sample-loadtesting-resource",
  loadTestResourceCreatePayload
);

console.log(resource);
```

Create a new Azure Load Testing resource with managed identity and customer managed key encryption.
```javascript
loadTestResourceCreatePayload = {
  location: "westus2",
  tags: { team: "testing" },
  identity: {
    type: 'SystemAssigned, UserAssigned',
    userAssignedIdentities: {
      '/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/sample-rg/providers/microsoft.managedidentity/userassignedidentities/identity1': {}
    }
  },
  encryption: {
    identity: {
      type: 'UserAssigned',
      resourceId: '/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/sample-rg/providers/microsoft.managedidentity/userassignedidentities/identity1'
    },
    keyUrl: 'https://sample-kv.vault.azure.net/keys/cmkkey/2d1ccd5c50234ea2a0858fe148b69cde'
  }
};

const resource = await client.loadTests.beginCreateOrUpdateAndWait(
  "sample-rg",
  "sample-loadtesting-resource",
  loadTestResourceCreatePayload
);

console.log(resource);
```

### Get an Azure Load Testing resource

```javascript
let resourceName = 'sample-loadtesting-resource';
let resourceGroupName = 'sample-rg';

const resource = await client.loadTests.get(
  resourceGroupName,
  resourceName
);

console.log(resource);
```

### Update an Azure Load Testing resource

```javascript
loadTestResourcePatchPayload = {
  tags: { team: "testing-dev" },
  identity: {
    type: 'SystemAssigned, UserAssigned',
    userAssignedIdentities: {
      // removing a user-assigned managed identity by assigning the value in the payload as null
      '/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/sample-rg/providers/microsoft.managedidentity/userassignedidentities/identity1': null,
      '/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/sample-rg/providers/microsoft.managedidentity/userassignedidentities/identity2': {}
    }
  },
  encryption: {
    // use system-assigned managed identity for CMK encryption
    identity: {
      type: 'SystemAssigned',
      resourceId: null
    },
    keyUrl: 'https://sample-kv.vault.azure.net/keys/cmkkey/2d1ccd5c50234ea2a0858fe148b69cde'
  }
};

const resource = await client.loadTests.beginUpdateAndWait(
  "sample-rg",
  "sample-loadtesting-resource",
  loadTestResourcePatchPayload
);

console.log(resource);
```

### Delete an Azure Load Testing resource

```javascript
let resourceName = 'sample-loadtesting-resource';
let resourceGroupName = 'sample-rg';

const result = await client.loadTests.beginDeleteAndWait(
  resourceGroupName,
  resourceName
);
```

### JavaScript Bundle
To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### LoadTestClient

`LoadTestClient` is the primary interface for developers using the Azure LoadTest client library. Explore the methods on this client object to understand the different features of the Azure LoadTest service that you can access.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");
setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure-Samples/azure-samples-js-management) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Floadtestservice%2Farm-loadtesting%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
