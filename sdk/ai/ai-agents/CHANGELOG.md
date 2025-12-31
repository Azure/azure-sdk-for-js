# Release History

## 1.2.0-beta.2 (2025-09-26)

### Features Added

- Add `ToolUtility.createBrowserAutomationTool` to support browser automation tool in agent

## 1.2.0-beta.1 (2025-09-18)

### Features Added

- Add `MCPTool.mergeResources` to support multiple MCP tools in one agent
- Add `OpenApiTool` to easily call multiple open APIs in one agent
- Add `messages.delete` to support delete message in thread
- Add back the features removed in previous stable release:
  - MCP tool
  - Deep Research tool
  - Sharepoint tool
  - BingCustomSearch tool
  - MicrosoftFabric tool

## 1.1.0 (2025-07-31)

For stable version of the client library, the client library now uses version v1 of the AI Foundry [data plane REST APIs](https://learn.microsoft.com/rest/api/aifoundry/aiagents/operation-groups?view=rest-aifoundry-aiagents-v1).

### Breaking changes

- Features that are still in preview were removed from this stable release. This includes
  - Remove MCP tool
  - Remove Deep Research tool
  - Remove Sharepoint tool
  - Remove BingCustomSearch tool
  - Remove MicrosoftFabric tool

## 1.1.0-beta.3 (2025-07-30)

### Bugs Fixed

- Fix method `runs.createAndPoll` missing required parameter `json_schema` but get `jsonSchema`

## 1.1.0-beta.2 (2025-07-23)

### Bugs Fixed

- Fixed [Github issue](https://github.com/Azure/azure-sdk-for-js/issues/35203) with `messages.create` method type error when upload image file.
- Fixed [Github issue](https://github.com/Azure/azure-sdk-for-js/issues/34885) with `runs.create` method deserialization of stream event data.

## 1.1.0-beta.1 (2025-07-21)

### Features Added

- Add MCP tool
- Add Deep Research tool
- Add Deep Research sample
- Add back agent tool `SharepointGroundingTool`, `BingCustomSearchTool`, `MicrosoftFabricTool`, `SharepointTool`

### Breaking changes

- The `DeepResearchDetails` type has been updated: the field `deepResearchBingGroundingConnections` has been renamed to `bingGroundingConnections` and the field `deepResearchModel` has been renamed to `model`.

## 1.0.0 (2025-06-29)

- First stable release of Azure AI Agents client library

### Breaking changes

- `AgentsClient` constructor parameter `credential` type  `KeyCredential | TokenCredential` is update to `TokenCredential`

## 1.0.0-beta.6 (2025-06-27)

### Bugs Fixed

- Fixed an issue with event data of `submitToolOutputs` stream mode

## 1.0.0-beta.5 (2025-06-25)

### Bugs Fixed

- Fixed an issue with event data parsing

## 1.0.0-beta.4 (2025-06-10)

### Features Added

- Adding connected agents sample

### Bugs Fixed

- Fixed an issue with streaming serialization
- Fixed an issue with streaming using the `.submitToolOutputs` method.
- Fixed an issue with codeInterpreterWithStreaming sample inconsistently writing file to disk

## 1.0.0-beta.3 (2025-05-20)

### Features Added

- Adds `runs.createAndPoll` method that automatically polls for the result.
- Adds `resumeFrom` option in polling operations.

### Bugs Fixed

- fixed an issue with bing grounding serialization
- fixed an issue with url encoding

## 1.0.0-beta.2 (2025-05-16)

### Bugs Fixed

- fixed an issue with file upload ReadableStream type

## 1.0.0-beta.1 (2025-05-13)

### Features Added

- This is the initial version of the Azure AI Agents client library, splitting off Agents functionality from the Azure AI Projects library.
