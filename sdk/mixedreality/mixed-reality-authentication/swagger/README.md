# Azure Mixed Reality Authentication Protocol Layer

> see [https://aka.ms/autorest](https://aka.ms/autorest)

Run `rushx generate:client` to generate code.

## Configuration

```yaml
package-name: "@azure/mixed-reality-authentication"
title: MixedRealityStsRestClient
description: Mixed Reality Authentication client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/aa19725fe79aea2a9dc580f3c66f77f89cc34563/specification/mixedreality/data-plane/Microsoft.MixedReality/preview/2019-02-28-preview/mr-sts.json
add-credentials: false
use-extension:
  "@autorest/typescript": "6.0.0-beta.15"
hide-clients: true
package-version: 1.0.0-beta.2
v3: true
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.
