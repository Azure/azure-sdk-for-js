# Azure AuthorizationManagement client library for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure AuthorizationManagement client.

Role based access control provides you a way to apply granular level policy administration down to individual resources or resource groups. These operations enable you to manage role assignments. A role assignment grants access to Azure Active Directory users.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/authorization/arm-authorization) |
[Package (NPM)](https://www.npmjs.com/package/@azure/arm-authorization) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/arm-authorization) |
[Samples](https://github.com/Azure-Samples/azure-samples-js-management)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge and Firefox.

### Prerequisites

- An [Azure subscription][azure_sub].

### Install the `@azure/arm-authorization` package

Install the Azure AuthorizationManagement client library for JavaScript with `npm`:

```bash
npm install @azure/arm-authorization
```

### Create and authenticate a `AuthorizationManagementClient`

To create a client object to access the Azure AuthorizationManagement API, you will need the `endpoint` of your Azure AuthorizationManagement resource and a `credential`. The Azure AuthorizationManagement client can use Azure Active Directory credentials to authenticate.
You can find the endpoint for your Azure AuthorizationManagement resource in the [Azure Portal][azure_portal].

#### Using an Azure Active Directory Credential

You can authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to **register a new AAD application and grant access to Azure AuthorizationManagement** by assigning the suitable role to your service principal (note: roles such as `"Owner"` will not grant the necessary permissions).
Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

For more information about how to create an Azure AD Application check out [this guide](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal).
```javascript
const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");
const subscriptionId = "00000000-0000-0000-0000-000000000000";
const client = new AuthorizationManagementClient(new DefaultAzureCredential(), subscriptionId);
```

## Key concepts

### AuthorizationManagementClient

`AuthorizationManagementClient` is the primary interface for developers using the Azure AuthorizationManagement client library. Explore the methods on this client object to understand the different features of the Azure AuthorizationManagement service that you can access.

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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fauthorization%2Farm-authorization%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
