# Azure OpenAI library for JavaScript

The Azure OpenAI client library for JavaScript is a companion library to `openai` that provides richer types support for Azure OpenAI service exclusive features. It does not provide any client to connect to Azure OpenAI resources or to the non-Azure OpenAI inference endpoint, but only provide type support.

#### **_Migrating from @azure/openai version 1 advisory_ ⚠️**

Please see the [Migration Guide](https://github.com/azure/azure-sdk-for-js/blob/main/sdk/openai/openai/MIGRATION.md) for detailed instructions on how to update application code from version 1.x of the Azure OpenAI client library to the `openai` library.

## Getting started

The library is not intended to be used alone, but in companion with `openai` library to access OpenAI or Azure OpenAI service. Azure OpenAI is a managed service that allows developers to deploy, tune, and generate content from OpenAI models on Azure resources.

```typescript
import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import "@azure/openai/types";

const scope = "https://cognitiveservices.azure.com/.default";
const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);

const deployment = "gpt-4-1106-preview";
const apiVersion = "2024-04-01-preview";
const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });

```

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

### Prerequisites

If you'd like to use an Azure OpenAI resource, you must have an [Azure subscription](https://azure.microsoft.com/free/dotnet/)
and [Azure OpenAI access](https://learn.microsoft.com/azure/cognitive-services/openai/overview#how-do-i-get-access-to-azure-openai).
This will allow you to create an Azure OpenAI resource and get both a connection URL as well as API keys. For more information, see [Quickstart: Get started generating text using Azure OpenAI Service](https://learn.microsoft.com/azure/cognitive-services/openai/quickstart).

### Install the `@azure/openai` and `openai` package

Install the Azure OpenAI client library and the OpenAI library for JavaScript with `npm`:

```bash
npm install @azure/openai
npm install openai
```

### Create and authenticate a `OpenAIClient`
There are several ways to authenticate with the Azure OpenAI service and the recommended way is to use Microsoft Entra ID tokens. If your application doesn't use them already, it is highly recommended to switch to them. Refer to the [Azure Identity documentation](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md) for more information.

### Microsoft Entra ID (Formerly known as Azure Active Directory)

To use the [DefaultAzureCredential][defaultazurecredential] provider shown below,
or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to [register a new AAD application][register_aad_app] and grant access to OpenAI by assigning the `"Cognitive Services User"` role to your service principal (note: other roles such as `"Owner"` will not grant the necessary permissions, only `"Cognitive Services User"` will suffice to run the examples and the sample code).

In order to authenticate the `AzureOpenAI` client, we need to use the `getBearerTokenProvider` function from the `@azure/identity` package. This function creates a token provider that `AzureOpenAI` uses internally to obtain tokens for each request. The token provider is created as follows:

```typescript
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { AzureOpenAI } from 'openai';

const credential = new DefaultAzureCredential();
const scope = "https://cognitiveservices.azure.com/.default";
const azureADTokenProvider = getBearerTokenProvider(credential, scope);

const openai = new AzureOpenAI({ azureADTokenProvider });
```

### (⚠️ Highly Discouraged) API Key

API keys are not recommended for production use because they are less secure than other authentication methods. However, if you are using an API key, use the [Azure Portal][azure_portal] to browse to your OpenAI resource and retrieve an API key, or use the [Azure CLI][azure_cli] snippet below:

**Note:** Sometimes the API key is referred to as a "subscription key" or "subscription API key."

```PowerShell
az cognitiveservices account keys list --resource-group <your-resource-group-name> --name <your-resource-name>
```

Once you have an API key and endpoint, you can authenticate `AzureOpenAI` with an API key by setting the `AZURE_OPENAI_API_KEY` environment variable or as setting the `apiKey` string property in the options object when creating the `AzureOpenAI` client.


```typescript
import AzureOpenAI from 'openai';

const openai = new AzureOpenAI({
  apiKey: process.env['AZURE_OPENAI_API_KEY'], 
});
```

#### Using an API Key from OpenAI

To instead configure the client to connect to OpenAI's service, please use the `OpenAI` client from `openai` library and provide an API key from OpenAI's
developer portal. Once you have an API key, you can set the value as environment variable `OPENAI_API_KEY` to authenticate the client as follows:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], 
});
```

## Key concepts

The main concept to understand is that this is not a standalone library, but to be used in conjunction with `openai` library.

## Examples

#### Bring your own data


#### Parsing Content Filter

<!-- LINKS -->
[stainless_readme]: https://github.com/openai/openai-node?tab=readme-ov-file#microsoft-azure-openai
[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_portal]: https://portal.azure.com
[register_aad_app]: https://docs.microsoft.com/azure/cognitive-services/authentication#assign-a-role-to-a-service-principal
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
