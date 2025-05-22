# Release History

## 1.0.0-beta.8 (2025-05-21)

### Bugs Fixed

- Upgrading ai-agents package to fix bugs with bing grounding serialization and url encoding

### Other Changes

- Updated to OpenTelemetry v2 packages.

## 1.0.0-beta.7 (2025-05-16)

### Breaking changes

- Function `project.evaluations.createRun` is renamed to `project.evaluations.create`
- Function `project.redTeams.createRun` is renamed to `project.redTeams.createRun`
- The `targetConfig` of `RedTeam` is renamed to `target`
- Removes the optional parameters `top`, `skip`, and `maxpagesize` in `project.connections.list`.
- Removes the optional parameters `top`, `skip`, and `maxpagesize` in `project.deployments.list`.
- Removes the body parameter in `project.datasets.getCredentials`.

### Features Added

- Adds an optional `connectionName` field in `project.datasets.uploadFile` and `project.datasets.uploadFolder`.
- Adds a `fieldMapping` field in `AzureAISearchIndex` and `CosmosDBIndex`.

## 1.0.0-beta.6 (2025-05-15)

Major changes happened in this version as the client library switched to using the new AI Foundry data-plane REST APIs.
Please see updated samples.

### Breaking changes

- Endpoint URL is now needed to construct the `AIProjectClient`, instead of using the method
  `.fromConnectionString`. Find this endpoint URL in your AI Foundry project page.
- Agent operations that were previously part of the `azure.ai.projects` package have moved out to a separate new package
  `@azure/ai-agents` with a client named `AgentsClient`. See [here](https://www.npmjs.com/package/@azure/ai-agents) for more information. You can get the `AgentsClient` by calling `.agents` method on your `AIProjectClient`.
- Several changes to `.connections` operations. Please see new connection samples.

### Features added

- `.deployment` methods to enumerate the deployed AI models in your AI Foundry project.
- `.datasets` methods to upload documents and reference them. These documents will be used to augment the capability
  of your selected LLM (RAG pattern).
- `.indexes` methods to handle your AI search indexes and search queries, as part of RAG pattern.
- `.evaluations` methods to assess the performance of generative AI applications in the cloud.
- `.inference` methods to get an Azure AI Inference client for chat completions, text or image embeddings.
- `.telemetry` methods to enable OpenTelemetry tracing using the `enableTelemetry` function.

## 1.0.0-beta.5 (2025-04-18)

### Features Added

- Adding image input support with samples
- Adding list threads support and sample
- Adding sharepoint sample

### Bugs Fixed

- fixed an issue with tool_calls naming in convertOutputModelsFromWire

### Other Changes

- OpenAPI schema updates
- Using MODEL_DEPLOYMENT_NAME environment variable in samples

## 1.0.0-beta.4 (2025-03-31)

### Features Added

- Adding Fabric support and sample.
- Adding token usage sample

## 1.0.0-beta.3 (2025-03-21)

### Features Added

- Adding Azure Functions and OpenAPI tool support
- Upgrading core-lro package
- Adding Fabric support and sample.

### Bugs Fixed

- Addresses issue in search tool deserialization step during streaming.
- Addresses issue running samples

## 1.0.0-beta.2 (2024-12-19)

### Bugs Fixed

- Address issue creating tool definition from connection.
- Improve Error handling api call failure.

## 1.0.0-beta.1 (2024-12-19)

### Features Added

- This is the initial beta release for the Azure AI Projects SDK
