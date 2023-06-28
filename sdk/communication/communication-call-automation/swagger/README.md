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
tag: V2023-06-15-preview
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/cbf3cbc6c3c9502aec42c340bc6a076f3d1899a5/specification/communication/data-plane/CallAutomation/preview/2023-06-15-preview/communicationservicescallautomation.json
package-version: 1.0.0
model-date-time-as-string: false
optional-response-headers: true
typescript: true
azure-arm: false
add-credentials: false
use-extension:
  "@autorest/typescript": "latest"
directive:
  - rename-model:
      from: CallParticipant
      to: CallParticipantInternal
  - rename-model:
      from: CallConnectionProperties
      to: CallConnectionPropertiesInternal
  - rename-model:
      from: CallConnection
      to: CallConnectionInternal
  - rename-model:
      from: CallMedia
      to: CallMediaInternal
  - rename-model:
      from: CallRecording
      to: CallRecordingInternal
  - rename-model:
      from: FileSource
      to: FileSourceInternal
  - rename-model:
      from: TextSource
      to: TextSourceInternal
  - rename-model:
      from: SsmlSource
      to: SsmlSourceInternal
  - rename-model:
      from: PlayOptions
      to: PlayOptionsInternal
  - rename-model:
      from: PlaySource
      to: PlaySourceInternal
  - rename-model:
      from: RecognizeInputType
      to: RecognizeInputTypeInternal
```
