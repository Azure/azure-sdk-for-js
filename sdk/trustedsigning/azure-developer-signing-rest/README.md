# Azure Signing REST client library for JavaScript

Azure Developer Signing is a service that provides managed artifact signing for all.

Use the package of Azure Developer Signing to:

> Perform signing of bits and access signing related information.

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/developer-signing/azure-developer-signing-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/developer-signing)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure-rest/developer-signing?view=azure-node-preview)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/developer-signing/azure-developer-signing-rest/samples)

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.
- You must have an existing Trusted Signing account.
- You must have confirmed your identity using the Identity Validation resource.
- You must have an existing Certificate Profile created.

### Install the `@azure-rest/developer-signing` package

Install the Azure Signing REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/developer-signing
```

### Create and authenticate a `SigningClient`

To use an [Azure Active Directory (AAD) token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) 

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET

## Key concepts

### REST Client

This client is one of our REST clients. We highly recommend you read how to use a REST client [here](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md).

# Developer Signing Concepts

This library interacts with the Azure Developer Signing service using two principal concepts, these are:

- `Trusted Signing Accounts` – A Signing Account is the logical container holding certificate profiles and identity validations and is considered a Azure Developer Signing resource.
- `Certificate Profile` – A Certificate Profile is the template with the information that is used in the issued certificates. It is a sub-resource to a Code Signing Account resource.
- `Identity Validation` - An Identity Validation resource is the identity of the legal business or individual. This information will be in the Subject Name of the certificates and therefore is a pre-requisite resource to be able to create a Certificate Profile.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).
