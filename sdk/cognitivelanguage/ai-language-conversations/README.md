# Azure ConversationAnalysis client library for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure ConversationAnalysis client.

The language service conversations API is a suite of natural language processing (NLP) skills that can be used to analyze structured conversations (textual or spoken). The synchronous API in this suite accepts a request and mediates among multiple language projects, such as LUIS Generally Available, Question Answering, Conversational Language Understanding, and then calls the best candidate service to handle the request. At last, it returns a response with the candidate service's response as a payload.

 In some cases, this API needs to forward requests and responses between the caller and an upstream service. The asynchronous APIs in this suite enable tasks like Conversation Summarization and Conversational PII detection.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-conversations) |
[Package (NPM)](https://www.npmjs.com/package/@azure/ai-language-conversations) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-conversations/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].

### Install the `@azure/ai-language-conversations` package

Install the Azure ConversationAnalysis client library for JavaScript with `npm`:

```bash
npm install @azure/ai-language-conversations
```

### Create and authenticate a `ConversationAnalysisClient`

To create a client object to access the Azure ConversationAnalysis API, you will need the `endpoint` of your Azure ConversationAnalysis resource and a `credential`. The Azure ConversationAnalysis client can use Azure Active Directory credentials to authenticate.
You can find the endpoint for your Azure ConversationAnalysis resource in the [Azure Portal][azure_portal].

You can authenticate with Azure Active Directory using a credential from the [@azure/identity][azure_identity] library or [an existing AAD Token](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token).

To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to **register a new AAD application and grant access to Azure ConversationAnalysis** by assigning the suitable role to your service principal (note: roles such as `"Owner"` will not grant the necessary permissions).
Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

For more information about how to create an Azure AD Application check out [this guide](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal).

```javascript
const { ConversationAnalysisClient } = require("@azure/ai-language-conversations");
const { DefaultAzureCredential } = require("@azure/identity");
// For client-side applications running in the browser, use InteractiveBrowserCredential instead of DefaultAzureCredential. See https://aka.ms/azsdk/js/identity/examples for more details.

const client = new ConversationAnalysisClient("<endpoint>", new DefaultAzureCredential());
// For client-side applications running in the browser, use this code instead:
// const credential = new InteractiveBrowserCredential({
//   tenantId: "<YOUR_TENANT_ID>",
//   clientId: "<YOUR_CLIENT_ID>"
// });
// const client = new ConversationAnalysisClient("<endpoint>", credential);
```


### JavaScript Bundle
To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### ConversationAnalysisClient

`ConversationAnalysisClient` is the primary interface for developers using the Azure ConversationAnalysis client library. Explore the methods on this client object to understand the different features of the Azure ConversationAnalysis service that you can access.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");
setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-conversations/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitivelanguage%2Fai-language-conversations%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
