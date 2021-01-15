# Azure Mixed Reality Authentication Protocol Layer

> see [https://aka.ms/autorest](https://aka.ms/autorest)

Run `rushx generate:client` or `update.ps1` to generate code.

## Configuration

```yaml
package-name: "@azure/mixed-reality-authentication"
title: MixedRealityStsRestClient
description: Mixed Reality Authentication client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/craigktreasure/azure-rest-api-specs/6938d23da2be2a20b9998e002ef8b79e8d83e509/specification/mixedreality/data-plane/Microsoft.MixedReality/preview/2019-02-28-preview/mr-sts.json
add-credentials: false
use-extension:
  "@autorest/typescript": "6.0.0-dev.20200727.1"
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.
