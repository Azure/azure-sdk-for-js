# Release History

## 2.1.0-beta.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.0.0 (2024-11-18)

This release marks the first stable library version for `@azure/openai` and it exposes Azure-exclusive features supported in the latest Azure OpenAI Service stable `api-version` label of `2024-10-21`.

The following features are supported in this release:

- Azure OpenAI On Your Data which enables you to run advanced AI models, without needing to train or fine-tune models, on your own enterprise data located in an Azure Search index or in an vector store in Azure Cosmos DB.
- Azure OpenAI content filtering which detects and prevents the output of harmful content.

### Breaking Changes

- Models related to features still in preview have been removed.

## 2.0.0-beta.3 (2024-11-05)

This release adds types for Azure features supported in Azure OpenAI Service API version 2024-08-01-preview.

### Features Added

- Add support for connecting to MongoDB in Azure On Your Data.
- Add support for citation information in Azure On Your Data responses.
- Add support for content filtering in image generation.

### Breaking Changes

- Remove the Azure ML connection in Azure On Your Data.
- Remove the enhancements feature from chat completions.
- Remove the now deprecated `finish_details` field in chat completion responses. Use `finish_reason` instead.
- Remove the `role_information` field from the On Your Data request models.

## 2.0.0-beta.2 (2024-09-09)

### Features Added

- Adds `CompletionChoice` interface with content filter result.
- Updates the `license` property to be optional in `ContentFilterCitedDetectionResultOutput`.
- Updates `custom_blocklists` type in `ContentFilterResultsForChoiceOutput` to `ContentFilterDetailedResults`.

### Bugs Fixed

- Add `@azure-rest/core-client` as a dependency so TypeScript users don't have to import it manually in their code.

## 2.0.0-beta.1 (2024-07-22)

### Features Added

- Adds subpath `@azure/openai/types` which exports types for Azure On Your Data and Azure content filtering. Checkout the [samples folder](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai/samples) for examples of how to import it.

### Breaking Changes

- `OpenAIClient` has been deleted. Follow the [migration guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/MIGRATION.md) to use `AzureOpenAI` from the official [OpenAI client library for JavaScript](https://www.npmjs.com/package/openai) instead.

## 1.0.0-beta.12 (2024-04-01)

### Features Added

- Adds a new property `logprobs` in `ChatChoice` to support log probabilities for this chat choice
- Adds new properties `logprobs` and `topLogprobs` in `ChatCompletionsOptions` class to support log probabilities for chat completions
- Adds `dimensions` in `GetEmbeddingsOptions`.
when using Azure OpenAI, specifies the input type to use for embedding search.
- Updates the default service API version to `2024-03-01-preview`
- Returns content filter results and prompt filter results for image generations through `contentFilterResults` and `promptFilterResults` properties

### Breaking Changes

- `AzureChatExtensionConfiguration`, `OnYourDataAuthenticationOptions`, `OnYourDataVectorizationSource`, `OnYourDataVectorizationSourceType`, `ChatCompletionsNamedToolSelection`, `ChatCompletionsToolDefinition`, `ChatCompletionsToolCall`, `ChatMessageContentItem`, `ChatRequestMessage`, `ChatFinishDetails` are renamed with `Union` postfix.
- `AzureCognitiveSearchQueryType`, `ChatMessageImageDetailLevel`, `ElasticsearchQueryType`, `FunctionCallPreset`, `ImageGenerationQuality`, `ImageGenerationResponseFormat`, `ImageSize`, `ImageGenerationStyle`, `OnYourDataAuthenticationType`, `OnYourDataVectorizationSourceType`  union types no longer have fixed values.
- `prompFilterResults` property in `ChatCompletions`, `prompFilterResults` property in `Choice`, `toolCalls` in `ChatResponseMessage` are now optional

Changes to "bring your own data" features:
- Introduces a new type: `AzureChatExtensionDataSourceResponseCitation`
- For `AzureChatExtensionsMessageContext`, replaced `messages` property with `citations` and added `intent` as a string
- Rename `AzureCognitiveSearch` to `AzureSearch`
- `embeddingDependency` is a required property for `AzureCosmosDBChatExtensionConfiguration`
- All extension configuration `type` properties are changed into snake casing. For example, type `AzureCosmosDB` is changed into `azure_cosmos_db`in `AzureCosmosDBChatExtensionConfiguration`
- All authentication `type` properties are changed into snake casing. For example, type `ConnectionString` is changed into `connection_string`in `OnYourDataConnectionStringAuthenticationOptions`
- New properties are added to `AzureCosmosDBFieldMappingOptions`: `contentFields`, `contentFieldsSeparator`, `filepathField`, `titleField`, and `urlField`.
- Adds additional support for different authentication options, including access token and encoded API key authentication
- `embeddingDependency` is required in `PineconeChatExtensionConfiguration`
- `contentField` is required in `PineconeFieldMappingOptions`

### Bugs Fixed

- Fix a bug where `ChatCompletionsFunctionToolCall` did not expose the `index` property for the streaming mode.

## 1.0.0-beta.11 (2024-01-25)

### Bugs Fixed

- Fix a bug where `toolChoice` field in the input options to chat completion methods wasn't defined correctly.
- Fix a bug where the service returns undefined `choices` in chat completion methods.
- Fix a bug in chat completion methods where the returned stream was causing an error in Bun.

## 1.0.0-beta.10 (2024-01-03)

### Bugs Fixed

- Fix `responseFormat` behavior in `getAudioTranscription` and `getAudioTranslation` methods where request wasn't properly formed if it wasn't specified.

## 1.0.0-beta.9 (2024-01-02)

### Breaking Changes

- `listChatCompletions` and `listCompletions` are renamed to `streamChatCompletions` and `streamCompletions` respectively and their return types are updated to be a `ReadableStream`. For example, `streamChatCompletions` can be used as follows:

```js
  const events = await client.streamChatCompletions(deploymentId, messages);
  for await (const event of events) {
    // use event ...
  }
```

## 1.0.0-beta.8 (2023-12-07)

Following OpenAI's November Dev Day and Microsoft's 2023 Ignite conference, this update brings a slew of new
features and changes to the client library.

### Features Added

- `-1106` model feature support for `gpt-35-turbo` and `gpt-4-turbo`, including use of `seed`, `system_fingerprint`, parallel function calling via tools, "JSON mode" for guaranteed function outputs, and more
- `dall-e-3` image generation capabilities via `getImages`, featuring higher model quality, automatic prompt revisions by `gpt-4`, and customizable quality/style settings
- Greatly expanded "On Your Data" capabilities in Azure OpenAI, including many new data source options and authentication mechanisms
- Early support for `gpt-4-vision-preview`, which allows the hybrid use of text and images as input to enable scenarios like "describe this image for me"
- Support for Azure enhancements to `gpt-4-vision-preview` results that include grounding and OCR features

### Breaking Changes

`ChatMessage` changes:

- The singular `ChatMessage` type has been replaced by `ChatRequestMessage` and `ChatResponseMessage`, the former of
    which is a union of special message structures such as `ChatRequestSystemMessage` and
    `ChatRequestUserMessage`.

Dall-e-3:

- Azure OpenAI now uses `dall-e-3` model deployments for its image generation API and such a valid deployment must
    be provided to the `GetImageGenerations` method.

On Your Data:

- The `AzureExtensionChatConfiguration` type has been updated to inline the parameters of the extension into the
    configuration object itself.

## 1.0.0-beta.7 (2023-10-25)

### Bugs Fixed

- Support Cloudflare workers by only setting the available fields in the `Request` class for the Fetch API.
- Wait before stop listening to the abort signal until after the response stream has been drained to allow for aborting prolonged responses.

### Other Changes

- NodeJS v18 is now the minimum version supported. Check out the [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule) for more information on NodeJS support timelines. And check out the [Microsoft Support Policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md#microsoft-support-policy) for more information on Microsoft support timelines.

## 1.0.0-beta.6 (2023-09-21)

### Features Added

- Introduces speech to text and translation capabilities for a wide variety of audio file formats.
  - Adds `getAudioTranscription` and `getAudioTranslation` methods for transcribing and translating audio files. The result can be either a simple JSON structure with just a `text` field or a more detailed JSON structure containing the text alongside additional information. In addition, VTT (Web Video Text Tracks), SRT (SubRip Text), and plain text formats are also supported. The type of the result depends on the `format` parameter if specified, otherwise, a simple JSON output is assumed. The methods could take as input an optional text prompt to guide the model's style or continue a previous audio segment. The language of the prompt should match that of the audio file.
  - The available model at the time of this release supports the following list of audio file formats: m4a, mp3, wav, ogg, flac, webm, mp4, mpga, mpeg, and oga.

### Bugs Fixed

- Returns `usage` information when available.
- Fixes a bug where errors weren't properly being thrown from the streaming methods.
- Returns `error` information in `ContentFilterResults` when available.
- Fixes parsing of `functionCall` in `ChatMessage` objects.

## 1.0.0-beta.5 (2023-08-25)

### Features Added

- (Azure OpenAI specific) Chat completions with your own data is now supported, see [Azure OpenAI's quickstart guide](https://learn.microsoft.com/azure/ai-services/openai/use-your-data-quickstart?tabs=command-line&pivots=programming-language-studio) for details.
  - A list of AzureExtensionChatConfiguration may be populated on `ChatCompletionsOptions` via its `azureExtensionOption.extensions` property. These configurations include a type together with a JSON Schema representation of its parameters. The type is used to determine which extension to use when generating chat completions. See the `bringYourOwnData.js` sample for an example of how to use this feature.
- Functions for chat completions are now supported: see [OpenAI's blog post on the topic](https://openai.com/blog/function-calling-and-other-api-updates) for much more detail.
  - A list of `FunctionDefinition` objects may be populated on `ChatCompletionsOptions` via its `functions` property. These definitions include a name and description together with a serialized JSON Schema representation of its parameters.
  - **NOTE**: Chat Functions requires a minimum of the `-0613` model versions for `gpt-4` and `gpt-3.5-turbo`/`gpt-35-turbo`. Please ensure you're using these later model versions, as Functions are not supported with older model revisions. For Azure OpenAI, you can update a deployment's model version or create a new model deployment with an updated version via the Azure AI Studio interface, also accessible through Azure Portal.
- (Azure OpenAI specific) Completions and Chat Completions responses now include embedded content filter annotations for prompts and responses

### Breaking Changes

- Remove `beginAzureBatchImageGeneration` and `getAzureBatchImageGenerationOperationStatus` methods. 
- `getImages` has been updated to return the image URLs/payloads directly, rather than requiring the user to call `getAzureBatchImageGenerationOperationStatus` to retrieve them.

## 1.0.0-beta.4 (2023-08-09)

### Features Added

- Exporting individual capabilities as separate functions to be used in code-size-concious applications. For example, streaming completions can be imported individually as follows:

```js
import { listCompletions, createOpenAI } from "@azure/openai/api";
const client = createOpenAI(endpoint, new AzureKeyCredential(azureApiKey));
const events = listCompletions(client, prompt, deploymentId, { maxTokens: 128 });
```

### Bugs Fixed

- Fix a bug where server-sent events were not being parsed correctly.

## 1.0.0-beta.3 (2023-07-13)

### Features Added

- Added support for batch image generation via `beginAzureBatchImageGeneration` and `getAzureBatchImageGenerationOperationStatus`.
- Added GetImages convenience API for above, as well as supporting ImageGenerationOptions and ImageGenerationResponse aliases.

## 1.0.0-beta.2 (2023-06-06)

### Bugs Fixed

- Fix a bug where the customer-passed options for credentials were overwritten by the defaults values.

## 1.0.0-beta.1 (2023-05-22)

- This is the initial beta release for Azure OpenAI inference capabilities, including completions, chat completions, and embeddings.
