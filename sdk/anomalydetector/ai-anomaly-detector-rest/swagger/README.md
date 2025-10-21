# Azure Form Recognizer Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure-rest/ai-anomaly-detector"
title: AnomalyDetectorRest
description: AnomalyDetector Rest Client
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/cognitiveservices/data-plane/AnomalyDetector/readme.md
generate-metadata: true
generate-sample: true
add-credentials: true
package-version: "1.0.0-beta.3"
rest-level-client: true
generate-test: true
# use-extension:
#   "@autorest/typescript": "6.0.0-rc.1.20220928.1"
use-extension:
  "@autorest/modelerfour": "https://tinyurl.com/2dx6b9fg"
module-kind: esm
use-extension:
  "@autorest/typescript": "6.0.34"
```

```yaml
directive:
  - from: swagger-document
    where: $.paths
    transform: >
      for (const path of Object.keys($)) {
         const newPath = path.replace("/{ApiVersion}", "");
         $[newPath] = $[path];
         delete $[path];
      }
```

```yaml
directive:
  - from: swagger-document
    where: $.paths..parameters
    transform: >
      if($[0]["$ref"] === "#/parameters/ApiVersion") {
        $.shift()
      }
```

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-parameterized-host"]
    transform: >
      $.hostTemplate = "{Endpoint}/anomalydetector/{ApiVersion}";
      $.parameters.push({"$ref": "#/parameters/ApiVersion"})
```
