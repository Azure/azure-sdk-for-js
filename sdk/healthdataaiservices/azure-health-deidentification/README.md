# Azure Deidentification REST client library for JavaScript

Health Deidentification Service

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthdataaiservices/azure-health-deidentification)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/azure-health-deidentification)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure-rest/health-deidentification?view=azure-node-preview)

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.

### Install the `@azure-rest/azure-health-deidentification` package

Install the Azure Deidentification REST client REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/azure-health-deidentification
```

### Create and authenticate a `DeidentificationClient`

To use an [Azure Active Directory (AAD) token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity).

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

Set the value of the environment variable `DEID_SERVICE_ENDPOINT` to the `ServiceUrl` of the Deidentification Service you created.

![Service Url Location](documentation/images/ServiceUrl_Location.png)

The samples folder contains simple code examples to Deidentify text.

## Key concepts

Operation Modes:

- Tag: Will return the offset, length, and PHI category of deidentified text.
- Redact: Will return output text with placeholder stubbed text. See [redaction format tutorial](https://learn.microsoft.com/azure/healthcare-apis/deidentification/redaction-format) for more information.
- Surrogate: Will return output text with synthetic replacements.
  - Input: `My name is John Smith`
  - Output: `My name is Tom Jones`

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).
