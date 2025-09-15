# Azure Communication Services Toll Free Verification Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure-tools/communication-toll-free-verification"
description: Toll Free Verification client
package-version: 1.0.0-beta.2
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
input-file: ./swagger.json
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
add-credentials: false
skip-enum-validation: true
title: Toll Free Verification Client
use-extension:
  "@autorest/typescript": "6.0.34"
tracing-info:
  namespace: "Microsoft.Communication"
  packagePrefix: "Azure.Communication"
typescript:
  generate-metadata: false
  azure-arm: false
module-kind: esm
```

## Customizations

### Disable extensible enums

```yaml
directive:
  - from: swagger-document
    where: $.definitions[*].properties[*]["x-ms-enum"]
    transform: >
      if ($.modelAsString) {
        $.modelAsString = false
      }
  - from: swagger-document
    where: $.definitions[*].properties[*].items["x-ms-enum"]
    transform: >
      if ($.modelAsString) {
        $.modelAsString = false
      }    
```
