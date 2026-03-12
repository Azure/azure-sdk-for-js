# Azure Communication Services Short Codes Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-short-codes"
description: Short code acquiring and management client
package-version: 1.0.0-beta.6
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
input-file: ./shortcodes.json
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
add-credentials: false
skip-enum-validation: true
v3: true
title: Short Codes Client
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

### Fix the "type" property from the Program Brief Attachment model. It was being generated as "typeParam" and not being serialized correctly when sending the request.

```yaml
directive:
  - from: swagger-document
    where: $.definitions.ProgramBriefAttachment.properties.type
    transform: >
      $["x-ms-client-name"] = "type_param_attachment";

modelerfour:
  naming:
    override:
      "type_param_attachment": $DO_NOT_NORMALIZE$type
```
