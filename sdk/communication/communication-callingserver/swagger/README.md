# Azure Communication Services CallingServer Protocol Layer

> see [https://aka.ms/autorest](https://aka.ms/autorest)

### Generation
```ps
cd <communication-callingserver-folder>
rushx build:autorest
```

## Configuration

```yaml
package-name: azure-communication-callingserver
title: CallingServerApiClient
description: CallingServer Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-2021-11-15-preview
require: https://raw.githubusercontent.com/navali-msft/azure-rest-api-specs/c55dac6666919f6c7d6d2a280c6e002c647b15f6/specification/communication/data-plane/CallingServer/readme.md
model-date-time-as-string: false
optional-response-headers: true
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210217.1"
azure-arm: false
add-credentials: false
package-version: 1.0.0-beta.1
```
