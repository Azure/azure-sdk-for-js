# Release History

## 1.0.0-beta.5 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

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
