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
require: https://github.com/Azure/azure-rest-api-specs/blob/60fcb275cbce38d343f9c35411786e672aba154e/specification/videoanalyzer/data-plane/readme.md
add-credentials: false
use-extension:
  "@autorest/typescript": "6.0.0-beta.13"
use-core-v2: true
modelerfour:
  naming:
    override:
      "@type": $DO_NOT_NORMALIZE$@type
directive:
  - from: swagger-document
    where: $.definitions
    transform:
      > #Deleting all of the request models that are not being used. The replacement for these models is the custom `createRequest` method.
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
          || definition == 'OnvifDeviceDiscoverRequest'
          || definition == 'OnvifDeviceGetRequest'
          || definition == 'RemoteDeviceAdapterSetRequest'
          || definition == 'RemoteDeviceAdapterSetRequestBody'
          || definition == 'RemoteDeviceAdapterListRequest'
          || definition == 'RemoteDeviceAdapterGetRequest'
          || definition == 'RemoteDeviceAdapterDeleteRequest'
          || definition == 'LivePipelineDeleteRequest') {
          delete $[definition];
        }
      }
```
