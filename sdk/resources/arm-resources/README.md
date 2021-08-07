# Azure ResourceManagement client library for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure ResourceManagement client.

Provides operations for working with resources and resource groups.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/resources/arm-resources) |
[Package (NPM)](https://www.npmjs.com/package/@azure/arm-resources) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/arm-resources) |
[Samples](https://github.com/Azure-Samples/azure-samples-js-management)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge and Firefox.

### Prerequisites

- An [Azure subscription][azure_sub].

### Install the `@azure/arm-resources` package

Install the Azure ResourceManagement client library for JavaScript with `npm`:

```bash
npm install @azure/arm-resources
```

### Create and authenticate a `ResourceManagementClient`

To create a client object to access the Azure ResourceManagement API, you will need the `endpoint` of your Azure ResourceManagement resource and a `credential`. The Azure ResourceManagement client can use Azure Active Directory credentials to authenticate.
You can find the endpoint for your Azure ResourceManagement resource in the [Azure Portal][azure_portal].

#### Using an Azure Active Directory Credential

You can authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to register a new AAD application and grant access to Azure ResourceManagement by assigning the suitable role to your service principal (note: roles such as `"Owner"` will not grant the necessary permissions).
Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```javascript
const { ResourceManagementClient } = require("@azure/arm-resources");
const { DefaultAzureCredential } = require("@azure/identity");
const client = new ResourceManagementClient("<endpoint>", new DefaultAzureCredential());
```

## Key concepts

### ResourceManagementClient

`ResourceManagementClient` is the primary interface for developers using the Azure ResourceManagement client library. Explore the methods on this client object to understand the different features of the Azure ResourceManagement service that you can access.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";
setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure-Samples/azure-samples-js-management) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fresources%2Farm-resources%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential
