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
input-file: ./servicebus-swagger-jose.json
model-date-time-as-string: true
optional-response-headers: true
use-extension:
  "@autorest/typescript": "~/projects/autorest.typescript"
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.
