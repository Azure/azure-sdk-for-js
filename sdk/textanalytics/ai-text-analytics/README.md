# Azure Text Analytics client library for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure Text Analytics client.

TextAnalytics Client

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics) |
[Package (NPM)](https://www.npmjs.com/package/@azure/ai-text-analytics) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/ai-text-analytics) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/samples)

## Getting started

### Currently supported environments

- Node.js version 10.x.x or higher
- Browser JavaScript

### Prerequisites

- An [Azure subscription][azure_sub].

### Install the `@azure/ai-text-analytics` package

Install the Azure Text Analytics client library for JavaScript with `npm`:

```bash
npm install @azure/ai-text-analytics
```

### Create and authenticate a `TextAnalyticsClient`

To create a client object to access the Azure Text Analytics API, you will need the `endpoint` of your Azure Text Analytics resource and a `credential`. The Azure Text Analytics client can use Azure Active Directory credentials to authenticate.
You can find the endpoint for your Azure Text Analytics resource in the [Azure Portal][azure_portal].

#### Using an Azure Active Directory Credential

You can authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to register a new AAD application and grant access to Azure Text Analytics by assigning the suitable role to your service principal (note: roles such as `"Owner"` will not grant the necessary permissions).
Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```javascript
const { TextAnalyticsClient } = require("@azure/ai-text-analytics");
const { DefaultAzureCredential } = require("@azure/identity");
const client = new TextAnalyticsClient("<endpoint>", new DefaultAzureCredential());
```

## Key concepts

### TextAnalyticsClient

`TextAnalyticsClient` is the primary interface for developers using the Azure Text Analytics client library. Explore the methods on this client object to understand the different features of the Azure Text Analytics service that you can access.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";
setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

-![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftextanalytics%2Fai-text-analytics%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential
