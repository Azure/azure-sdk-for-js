# Azure Example TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/video-analyzer-edge"
title: GeneratedClient
description: Example Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
require: https://github.com/Azure/azure-rest-api-specs/blob/55b3e2d075398ec62f9322829494ff6a4323e299/specification/videoanalyzer/data-plane/readme.md
add-credentials: false
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210223.1"
modelerfour:
  naming:
    override:
      "@type": $DO_NOT_NORMALIZE$@type
directive:
  - from: swagger-document
    where: $.definitions
    transform: >
      for (const definition in $) {
        if (definition == 'PipelineTopologySetRequest' 
          || definition == 'PipelineTopologySetRequestBody'
          || definition == 'LivePipelineSetRequest'
          || definition == 'LivePipelineSetRequestBody'
          || definition == 'MethodRequestEmptyBodyBase'
          || definition == 'PipelineTopologyListRequest'
          || definition == 'PipelineTopologyGetRequest'
          || definition == 'PipelineTopologyDeleteRequest'
          || definition == 'LivePipelineListRequest'
          || definition == 'LivePipelineGetRequest'
          || definition == 'LivePipelineActivateRequest'
          || definition == 'LivePipelineDeactivateRequest'
          || definition == 'LivePipelineDeleteRequest') {
          delete $[definition];
        }
      }
```

<!-- modelerfour:
  naming:
    override:
      type: \@type  -->
