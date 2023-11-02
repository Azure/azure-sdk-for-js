# Azure TextTranslation REST client library for JavaScript

Text translation is a cloud-based REST API feature of the Translator service that uses neural
machine translation technology to enable quick and accurate source-to-target text translation
in real time across all supported languages.

The following methods are supported by the Text Translation feature:

Languages. Returns a list of languages supported by Translate, Transliterate, and Dictionary Lookup operations.

Translate. Renders single source-language text to multiple target-language texts with a single request.

Transliterate. Converts characters or letters of a source language to the corresponding characters or letters of a target language.

Detect. Returns the source code language code and a boolean variable denoting whether the detected language is supported for text translation and transliteration.

Dictionary lookup. Returns equivalent words for the source term in the target language.

Dictionary example Returns grammatical structure and context examples for the source term and target term pair.

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/ai-translation-text)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure-rest/ai-translation-text?view=azure-node-preview)

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.

### Install the `@azure-rest/ai-translation-text` package

Install the Azure TextTranslation REST client REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/ai-translation-text
```

### Create and authenticate a `TextTranslationClient`

To use an [Azure Active Directory (AAD) token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) 

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).
