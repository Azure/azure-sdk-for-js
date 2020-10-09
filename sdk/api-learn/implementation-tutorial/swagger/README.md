# Azure Example TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/implementation-tutorial"
title: GeneratedClient
description: Example Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: ./appconfiguration.json
add-credentials: false
package-version: 1.0.0-beta.1
use-extension:
  "@autorest/typescript": "6.0.0-dev.20200826.1"
```

### Rename KeyValue to ConfigurationSetting

```yaml
directive:
  - from: swagger-document
    where: $.definitions.KeyValue
    transform: >
      $["x-ms-client-name"] = "ConfigurationSetting";
```

### Rename locked to isReadOnly

```yaml
directive:
  - from: swagger-document
    where: $.definitions.KeyValue.properties.locked
    transform: >
      $["x-ms-client-name"] = "isReadOnly";
```
