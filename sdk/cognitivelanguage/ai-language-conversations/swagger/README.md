# Azure Conversations Client for JavaScript

> see https://aka.ms/autorest

### Setup

Install Autorest v3

```ps
npm install -g autorest
```

### Generation

```ps
cd <swagger-folder>
autorest
```

### Settings

```yaml
namespace: azure.ai.language.conversations
package-name: "@azure/ai-language-conversations"
license-header: MICROSOFT_MIT_NO_VERSION
source-code-folder-path: ./src/generated
typescript: true
add-credentials: false
hide-clients: true
v3: true
tag: release_2022_05_15_preview
package-version: 1.0.0-beta.1
modelerfour:
  lenient-model-deduplication: true
```

## Batch Execution

```yaml
batch:
  - tag: release_runtime_1_1_preview
```

## Runtime

These settings apply only when `--tag=release_runtime_1_1_preview` is specified on the command line.

```yaml $(tag) == 'release_runtime_1_1_preview'
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/e7f37e4e43b1d12fd1988fda3ed39624c4b23303/specification/cognitiveservices/data-plane/Language/preview/2022-05-15-preview/analyzeconversations.json
output-folder: ../
title: ConversationAnalysisClient
```

## Customizations

Customizations that should eventually be added to central autorest configuration.

### General customizations

```yaml
# Fix Endpoint parameter description and format.
- from: swagger-document
  where: $.parameters.Endpoint
  transform: |
    $["description"] = "Supported Cognitive Services endpoint (e.g., https://<resource-name>.cognitiveservices.azure.com).";
    $["format"] = "url";

# Define multilingual parameter as a boolean.
- where-operation: ConversationalAnalysisAuthoring_GetSupportedPrebuiltEntities
  transform: |
    var multilingualParam = $.parameters.find(param => param.name === "multilingual");
    multilingualParam.type = "boolean";
```

### Runtime API Directives

```yaml $(tag) == 'release_runtime_1_1_preview'
# Give analyze job LRO a return type
directive:
  - where-operation: AnalyzeConversation_SubmitJob
    transform: >
      $["responses"]["200"] = {
          "description": "dummy schema to get poller response when calling .result()",
          "schema": {
              "$ref": "#/definitions/AnalyzeConversationJobState"
          }
      };
```

```yaml $(tag) == 'release_runtime_1_1_preview'
# Rename Runtime client operation
directive:
  - rename-operation:
      from: ConversationAnalysis_AnalyzeConversation
      to: AnalyzeConversation
```

```yaml $(tag) == 'release_runtime_1_1_preview'
# Rename Runtime client async operation
directive:
  - rename-operation:
      from: AnalyzeConversation_SubmitJob
      to: ConversationAnalysis
```

```yaml $(tag) == 'release_runtime_1_1_preview'
# Rename analyze_conversation `body` to `tasks`
directive:
    - from: swagger-document
      where: $["paths"]["/:analyze-conversations"]["post"]
      transform: >
        $["parameters"][1]["x-ms-client-name"] = "task";
```

```yaml $(tag) == 'release_runtime_1_1_preview'
# Rename begin_conversation_analysis `body` to `tasks`
directive:
    - from: swagger-document
      where: $["paths"]["/analyze-conversations/jobs"]["post"]
      transform: >
        $["parameters"][1]["x-ms-client-name"] = "task";
```

```yaml $(tag) == 'release_runtime_1_1_preview'
# Remove async GET operation status
directive:
    - from: swagger-document
      where: $["paths"]
      transform: >
          delete $["/analyze-conversations/jobs/{jobId}"];
```

```yaml $(tag) == 'release_runtime_1_1_preview'
# Remove async cancel operation
directive:
    - from: swagger-document
      where: $["paths"]
      transform: >
          delete $["/analyze-conversations/jobs/{jobId}:cancel"];
```