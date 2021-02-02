# Azure Text Analytics TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/eventgrid"
package-version: "3.0.0-beta.3"
title: GeneratedClient
description: EventGrid Client
generate-metadata: false
add-credentials: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file:
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/eventgrid/data-plane/Microsoft.Storage/stable/2018-01-01/Storage.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/eventgrid/data-plane/Microsoft.EventHub/stable/2018-01-01/EventHub.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/eventgrid/data-plane/Microsoft.Resources/stable/2018-01-01/Resources.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/eventgrid/data-plane/Microsoft.EventGrid/stable/2018-01-01/EventGrid.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/eventgrid/data-plane/Microsoft.Devices/stable/2018-01-01/IotHub.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/eventgrid/data-plane/Microsoft.ContainerRegistry/stable/2018-01-01/ContainerRegistry.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/eventgrid/data-plane/Microsoft.ServiceBus/stable/2018-01-01/ServiceBus.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/eventgrid/data-plane/Microsoft.Media/stable/2018-01-01/MediaServices.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/eventgrid/data-plane/Microsoft.Maps/stable/2018-01-01/Maps.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/eventgrid/data-plane/Microsoft.AppConfiguration/stable/2018-01-01/AppConfiguration.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/eventgrid/data-plane/Microsoft.SignalRService/stable/2018-01-01/SignalRService.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/eventgrid/data-plane/Microsoft.KeyVault/stable/2018-01-01/KeyVault.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/eventgrid/data-plane/Microsoft.MachineLearningServices/stable/2018-01-01/MachineLearningServices.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/eventgrid/data-plane/Microsoft.Cache/stable/2018-01-01/RedisCache.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/eventgrid/data-plane/Microsoft.Web/stable/2018-01-01/Web.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/eventgrid/data-plane/Microsoft.Communication/stable/2018-01-01/AzureCommunicationServices.json
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210121.2"
hide-clients: true
```

## Customizations

### Use the "EventData" suffix on the Azure Resource Manager Event types, instead of just "Data"

```yaml
directive:
  - from: swagger-document
    where: $.definitions
    transform: >
      ["Write", "Delete", "Action"].forEach(action => {
        ["Success", "Failure", "Cancel"].forEach(status => {
          if ($[`Resource${action}${status}Data`]) {
            $[`Resource${action}${status}Data`]["x-ms-client-name"] = `Resource${action}${status}EventData`;
          }
        });
      });
```

### Remove the "Properties" suffix from some Azure Communication Services types

```yaml
directive:
  - from: swagger-document
    where: $.definitions
    transform: >
      ["ACSChatThreadEventBase", "ACSChatMessageEventBase", "ACSChatEventBase", "ACSChatThreadMember",  "AcsSmsEventBase", "AcsSmsDeliveryAttempt"].forEach(cleanName => {
        if ($[`${cleanName}Properties`]) {
          $[`${cleanName}Properties`]["x-ms-client-name"] = cleanName;
        }
      });
```
