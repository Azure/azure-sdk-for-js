# Migrating to `openai`

**Note ⚠️**: This document is a work-in-progress and may change to reflect updates to the package. We value your feedback, please [create an issue](https://github.com/Azure/azure-sdk-for-js/issues/new/choose) to suggest any improvements or report any problems with this guide or with the package itself.

`openai@4.42.0`, the latest version of the official OpenAI JavaScript client library, features `AzureOpenAI`, a new client that supports the Azure OpenAI Service API, version "2022-12-01" and later. `AzureOpenAI` is now the preferred JavaScript client for interfacing with the Azure OpenAI service. This guide will highlight the differences and enhancements over other client libraries such as `@azure/openai@1.0.0-beta.12` and `@azure/openai-assistants@1.0.0-beta.5`, ensuring a smooth transition for users updating their implementations.

- `@azure/openai@1.0.0-beta.12` exports `OpenAIClient` that supports most of Azure OpenAI features such as chat completions, On Your Data, embeddings, and audio translation and transcription. It doesn't support Azure OpenAI Assistants.
- `@azure/openai-assistants@1.0.0-beta.5` exports `AssistantsClient` that supports Azure OpenAI Assistants v1 features.
- Both `OpenAIClient` and `AssistantsClient` will be deprecated in the coming weeks and will be removed in the future.
- `openai@4.42.0` exports `AzureOpenAI` which can connect to Azure OpenAI service and supports all of its features.

This document provides instructions for updating your application code to use `AzureOpenAI` provided by `openai`. In this document, the examples provided use TypeScript to provide type information, but all runtime behavior changes naturally apply to plain JavaScript as well.

## Authenticating the client

There are several ways to authenticate with the Azure OpenAI service and the recommended way is to use Microsoft Entra ID tokens. If your application doesn't use them already, it is highly recommended to switch to them. Refer to the [Azure Identity documentation](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md) for more information.

### Microsoft Entra ID (Formerly known as Azure Active Directory)

There are several ways to authenticate with the Azure OpenAI service using Microsoft Entra ID tokens. The default way is to use the `DefaultAzureCredential` class from the `@azure/identity` package but your application may be using a different credential class. For the purposes of this guide, we will assume that you are using the `DefaultAzureCredential` class. A credential can be created as follows:

```typescript
import { DefaultAzureCredential } from "@azure/identity";
const credential = new DefaultAzureCredential();
```

Which is then passed to the second argument of the client constructors of `OpenAIClient` and `AssistantsClient`.

However, in order to authenticate the `AzureOpenAI` client, we need to use the `getBearerTokenProvider` function from the `@azure/identity` package. This function creates a token provider that `AzureOpenAI` uses internally to obtain tokens for each request. The token provider is created as follows:

```typescript
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
const credential = new DefaultAzureCredential();
const scope = "https://cognitiveservices.azure.com/.default";
const azureADTokenProvider = getBearerTokenProvider(credential, scope);
```

`azureADTokenProvider` will be passed to the options object when creating the `AzureOpenAI` client.

### (⚠️ Highly Discouraged) API Key

API keys are not recommended for production use because they are less secure than other authentication methods. However, if you are using an API key to authenticate `OpenAIClient` or `AssistantsClient`, an `AzureKeyCredential` object must have been created as follows:

```typescript
import { AzureKeyCredential } from "@azure/openai";
const apiKey = new AzureKeyCredential("your API key");
```

Authenticating `AzureOpenAI` with an API key is as simple as setting the `AZURE_OPENAI_API_KEY` environment variable or as setting the `apiKey` string property in the options object when creating the `AzureOpenAI` client.

## Constructing the client

`OpenAIClient` and `AssistantsClient` are constructed similarly as follows:

Original code:

```typescript
import { OpenAIClient } from "@azure/openai";
const endpoint = "Your Azure OpenAI resource endpoint";
const client = new OpenAIClient(endpoint, credential);
```

If not set, the API version defaults to the last known one before the release of the client. Also, the client is not locked to a single model deployment, meaning that the deployment name has to be passed to each method that requires it.

On the other hand, the `AzureOpenAI` client is constructed as follows:

Migrated code:

```typescript
import { AzureOpenAI } from "openai";
const deployment = "Your Azure OpenAI deployment";
const apiVersion = "2024-04-01-preview";
const options = { azureADTokenProvider, deployment, apiVersion }
const client = new AzureOpenAI(options);
```

The endpoint of the Azure OpenAI resource can be specified by setting the `endpoint` option but it can also be loaded by the client from the environment variable `AZURE_OPENAI_ENDPOINT`. This is the recommended way to set the endpoint because it allows the client to be used in different environments without changing the code and also to protect the endpoint from being exposed in the code.
Note that the API version is required to be specified, this is necessary to ensure that existing code doesn't break between preview API versions. Refer to [API Versions Documentation](https://learn.microsoft.com/azure/ai-services/openai/api-version-deprecation) to learn more about Azure OpenAI API versions. Additionally, the `deployment` property is not required but it is recommended to be set. Once `deployment` is set, it is used as the default deployment for all operations that require it. If the client is not created with the `deployment` option, the `model` property in the options object should be set with the deployment name. However, audio operations such as `audio.transcriptions.create` require the client to be created with the `deployment` option set to the deployment name.

## API differences

There are key differences between the `OpenAIClient` and `AssistantsClient` clients and the `AzureOpenAI` client:

- Operations are represented as a flat list of methods in both `OpenAIClient` and `AssistantsClient`, e.g. `client.getChatCompletions(...)`. In `AzureOpenAI`, operations are grouped in nested groups, e.g. `client.chat.completions.create({ ... })`.
- `OpenAIClient` and `AssistantsClient` rename many of the names used in the Azure OpenAI service API. For example, snake case is used in the API but camel case is used in the client. In `AzureOpenAI`, names are kept the same as in the Azure OpenAI service API.

## Migration examples

The following sections provide examples of how to migrate from `OpenAIClient` and `AssistantsClient` to `AzureOpenAI`.

### Chat completions

The following example shows how to migrate the `getChatCompletions` method call.

Original code:

```typescript
const result = await client.getChatCompletions(deploymentName, messages, { maxTokens: 100 });
```

Migrated code:

```typescript
const result = await client.chat.completions.create({ messages, model: '', max_tokens: 100 });
```

Notice the following:

- The `getChatCompletions` method has been replaced with the `chat.completions.create` method
- The `messages` parameter is now passed in the options object with the `messages` property
- The `maxTokens` property has been renamed to `max_tokens` and the `deploymentName` parameter has been removed. Generally, the names of the properties in the `options` object are the same as in the Azure OpenAI service API, following the snake case convention instead of the camel case convention used in the `AssistantsClient`. This is true for all the properties across all requests and responses in the `AzureOpenAI` client
- The `deploymentName` parameter is not needed if the client was created with the `deployment` option. If the client was not created with the `deployment` option, the `model` property in the option object should be set with the deployment name.

### Streaming chat completions

The following example shows how to migrate the `streamChatCompletions` method call.

Original code:

```typescript
const stream = await client.streamChatCompletions(deploymentName, messages, { maxTokens: 100 });
```

Migrated code:

```typescript
const stream = await client.chat.completions.create({ model: '', messages, max_tokens: 100, stream: true });
```

### Azure On Your Data

The following example shows how to migrate a `getChatCompletions` method call that enables Azure On Your Data with Azure Search.

Original code:

```typescript
const azureSearchEndpoint = "Your Azure Search resource endpoint";
const azureSearchIndexName = "Your Azure Search index name";
const result = await client.getChatCompletions(deploymentName, messages, { azureExtensionOptions: { 
    data_sources: [{
      type: "azure_search",
      endpoint: azureSearchEndpoint,
      indexName: azureSearchIndexName,
      authentication: {
        type: "system_assigned_managed_identity",
      }
    }]
  } 
});
```

Migrated code:

```typescript
import "@azure/openai/types";

const azureSearchEndpoint = "Your Azure Search resource endpoint";
const azureSearchIndexName = "Your Azure Search index name";
const result = await client.chat.completions.create({
  model: '',
  messages,
  data_sources: [{
      type: "azure_search",
      parameters: {
        endpoint: azureSearchEndpoint,
        index_name: azureSearchIndexName,
        authentication: {
          type: "system_assigned_managed_identity",
        }
      }
  }]
});
```

Notice that:

- `"@azure/openai/types"` is imported which adds Azure-specific definitions (e.g. `data_sources`) to the client types
- The `azureExtensionOptions` property has been replaced with the inner `data_sources` property
- The `parameters` property has been added to wrap the parameters of the extension, which mirrors the schema of the Azure OpenAI service API
- camel case properties have been replaced with snake case properties

### Audio transcription

The following example shows how to migrate the `getAudioTranscription` method call.

Original code:

```typescript
import { readFile } from "fs/promises";

const audioFilePath = "path/to/audio/file";
const audio = await readFile(audioFilePath);
const result = await client.getAudioTranscription(deploymentName, audio);
```

Migrated code:

```typescript
import { createReadStream } from "fs";

const result = await client.audio.transcriptions.create({
  model: '',
  file: createReadStream(audioFilePath),
});
```

Notice that:

- The `getAudioTranscription` method has been replaced with the `audio.transcriptions.create` method
- The `AzureOpenAI` has to be constructed with the `deployment` option set to the deployment name in order to use audio operations such as `audio.transcriptions.create`
- The `model` property is required to be set in the options object but its value is not used in the operation so feel free to set it to any value
- The `file` property accepts a variety of types including `Buffer`, `fs.ReadaStream`, and `Blob` but in this example, a file is streamed from disk using `fs.createReadStream`

### Audio translation

The following example shows how to migrate the `getAudioTranslation` method call.

Original code:

```typescript
import { readFile } from "fs/promises";

const audioFilePath = "path/to/audio/file";
const audio = await readFile(audioFilePath);
const result = await client.getAudioTranslation(deploymentName, audio);
```

Migrated code:

```typescript
import { createReadStream } from "fs";

const result = await client.audio.translations.create({
  model: '',
  file: createReadStream(audioFilePath),
});
```

Notice that:

- The `getAudioTranslation` method has been replaced with the `audio.translations.create` method
- All other changes are the same as in the audio transcription example

### Assistants

The following examples show how to migrate some of the `AssistantsClient` methods.

#### Assistant creation

Original code:

```typescript
const options = {
  model: azureOpenAIDeployment,
  name: "Math Tutor",
  instructions:
    "You are a personal math tutor. Write and run JavaScript code to answer math questions.",
  tools: [{ type: "code_interpreter" }],
};
const assistantResponse = await assistantsClient.createAssistant(options);
```

Migrated code:

```typescript
const options = ...;
const assistantResponse = await assistantsClient.beta.assistants.create(
  options
);
```

Notice that:

- The `createAssistant` method has been replaced with the `beta.assistants.create` method

#### Thread creation

The following example shows how to migrate the `createThread` method call.

Original code:

```typescript
const assistantThread = await assistantsClient.createThread();
```

Migration code:

```typescript
const assistantThread = await assistantsClient.beta.threads.create();
```

Notice that:

- The `createThread` method has been replaced with the `beta.threads.create` method

#### Message creation

The following example shows how to migrate the `createMessage` method call.

Original code:

```typescript
const threadResponse = await assistantsClient.createMessage(
  assistantThread.id,
  role,
  message
);
```

Migration code:

```typescript
const threadResponse = await assistantsClient.beta.threads.messages.create(
  assistantThread.id,
  {
    role,
    content: message,
  }
);
```

Notice that:

- The `createMessage` method has been replaced with the `beta.threads.messages.create` method
- The message specification has been moved from a parameter list to an options object

#### Runs

To run an assistant on a thread, the `createRun` method is used to create a run and then a loop is used to poll the run status until it is in a terminal state. The following example shows how to migrate the run creation and polling.

Original code:

```typescript
let runResponse = await assistantsClient.createRun(assistantThread.id, {
  assistantId: assistantResponse.id,
});

do {
  await new Promise((r) => setTimeout(r, 500));
  runResponse = await assistantsClient.getRun(
    assistantThread.id,
    runResponse.id
  );
} while (
  runResponse.status === "queued" ||
  runResponse.status === "in_progress"
```

This code can be migrated and simplified by using the `createAndPoll` method which creates a run and polls it until it is in a terminal state.

Migration code:

```typescript
const runResponse = await assistantsClient.beta.threads.runs.createAndPoll(
  assistantThread.id,
  {
    assistant_id: assistantResponse.id,
  },
  { pollIntervalMs: 500 }
);
```

Notice that:

- The `createRun` method has been replaced with the `beta.threads.runs.create` and `createAndPoll` methods
- The `createAndPoll` method is used to create a run and poll it until it is in a terminal state

#### Processing Run results

Without paging, results had to be accessed manually page by page using the `data` property of the response object. For instance, accessing the first page can be done as follows:

Original code:

```typescript
for (const runMessageDatum of runMessages.data) {
  for (const item of runMessageDatum.content) {
    ...
  }
}
```

Pages can be looped through by using the `for await` loop.

Migration code:

```typescript
for await (const runMessageDatum of runMessages) {
  for (const item of runMessageDatum.content) {
    ...
  }
}
```

### Embeddings

The following example shows how to migrate the `getEmbeddings` method call.

Original code:

```typescript
const embeddings = await client.getEmbeddings(deploymentName, input);
```

Migrated code:

```typescript
const embeddings = await client.embeddings.create({ input, model: '' });
```

Notice that:

- The `getEmbeddings` method has been replaced with the `embeddings.create` method
- The `input` parameter is now passed in the options object with the `input` property
- The `deploymentName` parameter has been removed. The `deploymentName` parameter is not needed if the client was created with the `deployment` option. If the client was not created with the `deployment` option, the `model` property in the option object should be set with the deployment name

### Image generation

The following example shows how to migrate the `getImages` method call.

Original code:

```typescript
const results = await client.getImages(deploymentName, prompt, { n, size });
```

Migrated code:

```typescript
  const results = await client.images.generate({ prompt, model: '', n, size });
```

Notice that:

- The `getImages` method has been replaced with the `images.generate` method
- The `prompt` parameter is now passed in the options object with the `prompt` property
- The `deploymentName` parameter has been removed. The `deploymentName` parameter is not needed if the client was created with the `deployment` option. If the client was not created with the `deployment` option, the `model` property in the option object should be set with the deployment name

### Content filter

Content filter results is part of the chat completions response types in `OpenAIClient`. The following example shows how to access the content filter results.

Original code:

```typescript
const results = await client.getChatCompletions(deploymentName, messages);
for (const choice of results.choices) {
  if (!choice.contentFilterResults) {
    console.log("No content filter is found");
    return;
  }
  if (choice.contentFilterResults.error) {
    console.log(
      `Content filter ran into the error ${choice.contentFilterResults.error.code}: ${choice.contentFilterResults.error.message}`);
  }
  const { hate, sexual, selfHarm, violence } = choice.contentFilterResults;
  ...
}
```

However `AzureOpenAI` does not have a direct equivalent to the `contentFilterResults` property in the `ChatCompletion.Choice` interface. The content filter results can be accessed by importing `"@azure/openai/types"` and accessing the `content_filter_results` property.

Migrated code:

```typescript
import "@azure/openai/types";

const result = await client.chat.completions.create({ model: '', messages });
for (const choice of results.choices) {
  const filterResults = choice.content_filter_results;
  if (!filterResults) {
    console.log("No content filter is found");
    return;
  }
  if (filterResults.error) {
    console.log(
      `Content filter ran into the error ${filterResults.error.code}: ${filterResults.error.message}`);
  }
  const { hate, sexual, self_harm, violence } = filterResults;
  ...
}
```

Notice that:

- camel case properties have been replaced with snake case properties
- `"@azure/openai/types"` is imported which adds Azure-specific definitions (e.g. `content_filter_results`) to the client types, see the [Azure types](#azure-types) section for more information

## Comparing Types

The following table explores several type names from `@azure/openai` and shows their nearest `openai` equivalent. The names differences illustrate several of the above-mentioned changes. This table provides an overview, and more detail and code samples are provided in the following sections.

<!-- prettier-ignore -->
| Old Type Name | Nearest New Type | Symbol Type | Change description |
| ------------------------- | ------------------------- | ----------- | ----------------------------- |
| `OpenAIClient` | `AzureOpenAI` | Class | This class replaces the former and has no methods in common with it. See the section on `AzureOpenAI` below. |
| `AudioResult` | `Transcription`/`Transcription` | Interface | Depending on the calling operation, the two interfaces replace the former one |
| `AudioResultFormat` | inline union type of the `response_format` property | Alias | It doesn't exist |
| `AudioResultSimpleJson` | `Transcription`/`Transcription` | Interface | Depending on the calling operation, the two interfaces replace the former one |
| `AudioResultVerboseJson` | N/A | Interface | |
| `AudioSegment` | N/A | Interface |  |
| `AudioTranscriptionTask` | N/A | Alias |  |
| `AzureChatEnhancementConfiguration`, `AzureChatEnhancements`, `AzureChatExtensionConfiguration`, `AzureChatExtensionConfigurationUnion`, `AzureChatExtensionDataSourceResponseCitation`, `AzureChatExtensionsMessageContext`, `AzureChatExtensionType`, `AzureChatGroundingEnhancementConfiguration`, `AzureChatOCREnhancementConfiguration`, `AzureCosmosDBChatExtensionConfiguration`, `AzureCosmosDBFieldMappingOptions`, `AzureExtensionsOptions`, `AzureGroundingEnhancement`, `AzureGroundingEnhancementCoordinatePoint`, `AzureGroundingEnhancementLine`, `AzureGroundingEnhancementLineSpan`, `AzureMachineLearningIndexChatExtensionConfiguration`, `AzureSearchChatExtensionConfiguration`, `AzureSearchIndexFieldMappingOptions`, `AzureSearchQueryType`, `ContentFilterBlocklistIdResult`, `ContentFilterCitedDetectionResult`, `ContentFilterDetectionResult`, `ContentFilterErrorResults`, `ContentFilterResult`, `ContentFilterResultDetailsForPrompt`, `ContentFilterResultsForChoice`, `ContentFilterSeverity`, `ContentFilterResultsForPrompt`, `ContentFilterSuccessResultDetailsForPrompt`, `ContentFilterSuccessResultsForChoice`, `ElasticsearchChatExtensionConfiguration`, `ElasticsearchIndexFieldMappingOptions`, `ElasticsearchQueryType`, `ImageGenerationContentFilterResults`, `ImageGenerationPromptFilterResults`, `OnYourDataAccessTokenAuthenticationOptions`, `OnYourDataApiKeyAuthenticationOptions`, `OnYourDataAuthenticationOptions`, `OnYourDataAuthenticationOptionsUnion`, `OnYourDataConnectionStringAuthenticationOptions`, `OnYourDataDeploymentNameVectorizationSource`, `OnYourDataEncodedApiKeyAuthenticationOptions`, `OnYourDataEndpointVectorizationSource`, `OnYourDataKeyAndKeyIdAuthenticationOptions`, `OnYourDataModelIdVectorizationSource`, `OnYourDataSystemAssignedManagedIdentityAuthenticationOptions`, `OnYourDataUserAssignedManagedIdentityAuthenticationOptions`, `OnYourDataVectorizationSource`, `OnYourDataVectorizationSourceType`, `OnYourDataVectorizationSourceUnion`, `PineconeChatExtensionConfiguration`, `PineconeFieldMappingOptions`  | N/A | Interfaces and Aliases | See the Azure types section below |
| `AzureKeyCredential` | N/A | Class | The API key can be provided as a string value |
| `ChatChoice` | `ChatCompletion.Choice` | Interface | |
| `ChatChoiceLogProbabilityInfo` | `Logprobs` | Interface | |
| `ChatCompletions` | `ChatCompletion` and `ChatCompletionChunk` | Interface | |
| `ChatCompletionsFunctionToolCall` | `ChatCompletionMessageToolCall` | Interface | |
| `ChatRequestFunctionMessage` | `ChatCompletionFunctionMessageParam` | Interface |  |
| `ChatRequestMessage` | `ChatCompletionMessageParam` | Interface | |
| `ChatRequestMessageUnion` | `ChatCompletionMessageParam` | |
| `ChatRequestSystemMessage` | `ChatCompletionSystemMessageParam` | Interface | |
| `ChatRequestToolMessage` | `ChatCompletionToolMessageParam` | Interface | |
| `ChatRequestUserMessage` | `ChatCompletionUserMessageParam` | Interface | |
| `ChatResponseMessage` | `Delta` / `ChatCompletionMessage` | Interface | |
| `ChatRole` | N/A | Alias | |
| `ChatTokenLogProbabilityInfo` | `TopLogprob` | Interface | |
| `ChatTokenLogProbabilityResult` | `ChatCompletionTokenLogprob` | Interface | |
| `Choice` | `Choice` | Interface | |
| `Completions` | `Completion` | Interface | |
| `CompletionsFinishReason` | N/A | Alias | |
| `CompletionsLogProbabilityModel` | `Logprobs` | Interface | |
| `CompletionsUsage` | `CompletionUsage` | Interface | |
| `EmbeddingItem` | `Embedding` | Interface | |
| `Embeddings` | `CreateEmbeddingResponse` | Interface | |
| `EmbeddingsUsage` | `CreateEmbeddingResponse.Usage` | Interface | |
| `EventStream` | `Stream` | Interface | |
| `FunctionCall` | `FunctionCall` | Interface | |
| `FunctionCallPreset` | N/A | Alias | |
| `FunctionDefinition` | `Function` | Interface | |
| `FunctionName` | N/A | Alias | |
| `GetAudioTranscriptionOptions` | `TranscriptionCreateParams` | Interface | |
| `GetAudioTranslationOptions` | `TranslationCreateParams` | Interface | |
| `GetChatCompletionsOptions` | `ChatCompletionCreateParamsNonStreaming` and `ChatCompletionCreateParamsStreaming` | Interface | |
| `GetCompletionsOptions` | `CompletionCreateParams` | Interface | |
| `GetEmbeddingsOptions` | `EmbeddingCreateParams` | Interface | |
| `GetImagesOptions` | `ImageGenerateParams` | Interface | |
| `ImageGenerationData` | `Image` | Interface | |
| `ImageGenerationQuality` | N/A | Alias | |
| `ImageGenerationResponseFormat` | N/A | Alias | |
| `ImageGenerations` | `ImagesResponse` | Interface | |
| `ImageGenerationStyle` | N/A | Alias | |
| `ImageSize` | N/A | Alias | |
| `MaxTokensFinishDetails` | N/A | Interface | |
| `OpenAIClientOptions` | `AzureClientOptions` | Interface | |
| `OpenAIError` | `OpenAIError` | Interface | |
| `OpenAIKeyCredential` | N/A | Class | |
| `StopFinishDetails` | N/A | Interface | |

## Azure types

`AzureOpenAI` connects to the Azure OpenAI service and can call all the operations available in the service. However, the types of the requests and responses are inherited from the `OpenAI` and are not yet updated to reflect the additional features supported exclusively by the Azure OpenAI service. TypeScript users will need to import `"@azure/openai/types"` from `@azure/openai@2.0.0-beta.1` which will merge Azure-specific definitions into existing types. Examples in [the Migration examples](#migration-examples) section show how to do this.
