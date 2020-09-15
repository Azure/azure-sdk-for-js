# Azure Storage TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: azure-service-bus
package-version: 7.0.0-preview.5
title: ServiceBusManagementClientInternal
description: Service Bus Management Client
enable-xml: true
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/1f4095f20a2b89c056c40e85b17af7a534bffc4d/specification/servicebus/data-plane/servicebus-swagger.json
model-date-time-as-string: true
optional-response-headers: true
use-extension:
  "@autorest/typescript": "~/projects/autorest.typescript"
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.
