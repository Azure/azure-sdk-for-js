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
# input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/1a8a869d1a96dc007f116d320f5c2659323bbe7c/specification/cognitiveservices/data-plane/FormRecognizer/stable/v2.1/FormRecognizer.json
input-file: ./FormRecognizer.json
override-client-name: GeneratedClient
add-credentials: false
typescript: true
package-version: "4.0.0-beta.5"
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
