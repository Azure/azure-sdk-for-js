# Azure Form Recognizer Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/ai-form-recognizer"
title: FormRecognizerClient
description: FormRecognizer Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/cognitiveservices/data-plane/FormRecognizer/stable/2023-07-31/FormRecognizer.json
override-client-name: GeneratedClient
add-credentials: false
typescript: true
package-version: "5.0.0"
use-extension:
  "@autorest/typescript": "6.0.0-alpha.20.20220622.1"
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### Remove LRO declarations

Form Recognizer uses nonstandard LROs, so we remove these definitions.

```yaml
directive:
  - from: swagger-document
    where: $.paths[*][*]
    transform: >
      if ($["x-ms-long-running-operation"]) {
          delete $["x-ms-long-running-operation"];
      }
```

### Make `stringIndexType` a client-level parameter

```yaml
directive:
  - from: swagger-document
    where: $.parameters.QueryStringIndexType
    transform: $["x-ms-parameter-location"] = "client";
```

### Suffix `DateTime` -> `On`

```yaml
directive:
  - from: swagger-document
    where: $.definitions[*].properties
    transform: >
      for (let p of Object.keys($).filter((k) => k.endsWith("DateTime"))) {
        const name = p;
        
        if (p.startsWith("expiration")) {
          p = p.replace("expiration", "expires");
        }

        $[name]["x-ms-client-name"] = p.replace(/DateTime$/, "On");
      }
```

But we'll opt-out for `CopyAuthorization#expirationDateTime`.

```yaml
directive:
  - from: swagger-document
    where: $.definitions.CopyAuthorization.properties.expirationDateTime
    transform: >
      delete $["x-ms-client-name"];
```

### Unset `format: uuid` for Id parameters

```yaml
directive:
  - from: swagger-document
    where: $.parameters.PathModelId
    transform: >
      delete $["format"];
  - from: swagger-document
    where: $.parameters.PathOperationId
    transform: >
      delete $["format"];
```
