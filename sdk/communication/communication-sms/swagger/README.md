# Azure Communication Services SMS Protocol Layer

> see [https://aka.ms/autorest](https://aka.ms/autorest)

## Configuration

```yaml
package-name: azure-communication-sms
title: SmsApiClient
description: SMS Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
input-file: https://github.com/Azure/azure-rest-api-specs/blob/users/shamkh/featureSendSmsChanges/specification/communication/data-plane/Microsoft.CommunicationServicesSms/stable/2021-03-07/communicationservicessms.json
model-date-time-as-string: false
optional-response-headers: true
use: "@microsoft.azure/autorest.typescript@5.0.1"
azure-arm: false
directive:
    - rename-model:
        from: SendSmsResponseItem
        to: SendSmsResult
```
