# Release History

## 1.0.0-beta.6 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

- Return `usage` information when available.
- Return `error` information in `ContentFilterResults` when available.

### Other Changes

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
