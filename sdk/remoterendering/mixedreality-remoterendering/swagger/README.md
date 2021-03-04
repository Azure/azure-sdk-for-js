# Azure Example TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
v3: true
package-name: "@azure/mixedreality-remoterendering"
title: RemoteRenderingRestClient
description: Azure Remote Rendering Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/2a65b0a2bbd9113b91c889f187d8778c2725c0b9/specification/mixedreality/data-plane/Microsoft.MixedReality/stable/2021-01-01/mr-arr.json
add-credentials: false
package-version: 1.0.0-beta.1
disable-async-iterators: true
hide-clients: true
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210121.2"
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.conversion
    transform: >
      $["x-ms-client-name"] = "AssetConversion";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.conversion_output
    transform: >
      $["x-ms-client-name"] = "AssetConversionOutput";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.conversion_settings
    transform: >
      $["x-ms-client-name"] = "AssetConversionOptions";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.conversion_input_settings
    transform: >
      $["x-ms-client-name"] = "AssetConversionInputOptions";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.conversion_output_settings
    transform: >
      $["x-ms-client-name"] = "AssetConversionOutputOptions";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.conversion_status
    transform: >
      $["x-ms-client-name"] = "AssetConversionStatus";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.error
    transform: >
      $["x-ms-client-name"] = "RemoteRenderingServiceError";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.session_properties
    transform: >
      $["x-ms-client-name"] = "RenderingSession";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.session_size
    transform: >
      $["x-ms-client-name"] = "RenderingServerSize";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.create_session_settings
    transform: >
      $["x-ms-client-name"] = "RenderingSessionOptions";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.session_status
    transform: >
      $["x-ms-client-name"] = "RenderingSessionStatus";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.update_session_settings
    transform: >
      $["x-ms-client-name"] = "UpdateSessionOptions";
```
