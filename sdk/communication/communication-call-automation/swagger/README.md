# Azure Communication Services Call Automation

> see [https://aka.ms/autorest](https://aka.ms/autorest)

## Configuration

```yaml
package-name: azure-communication-call-automation
title: CallAutomationApiClient
description: Call Automation Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: V2023-01-15-preview
input-file: https://raw.githubusercontent.com/williamzhao87/azure-rest-api-specs/dev-communication-CallAutomation-v4-2023-01-15/specification/communication/data-plane/CallAutomation/preview/2023-01-15-preview/communicationservicescallautomation.json
package-version: 1.0.0-beta.1
model-date-time-as-string: false
optional-response-headers: true
typescript: true
azure-arm: false
add-credentials: false
use-extension:
  "@autorest/typescript": "latest"
directive:
- rename-model:
    from: AcsCallParticipant
    to: AcsCallParticipantInternal
- rename-model:
    from: AddParticipantsRequest
    to: AddParticipantsRequestInternal
- rename-model:
    from: AddParticipantsResponse
    to: AddParticipantsResponseInternal
- rename-model:
    from: CallConnectionProperties
    to: CallConnectionPropertiesInternal
```