# Azure Communication Services Call Automation

> see [https://aka.ms/autorest](https://aka.ms/autorest)

## Configuration

```yaml
package-name: "@azure/communication-call-automation"
title: CallAutomationApiClient
description: Call Automation Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-2024-06-15-preview
require:
  - https://github.com/Azure/azure-rest-api-specs/blob/2c0eb12fe6bbd0f30424c1e32427f2f8c3c3d14e/specification/communication/data-plane/CallAutomation/readme.md
package-version: 1.3.0-beta.1
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
      from: PlayOptions
      to: PlayOptionsInternal
  - rename-model:
      from: PlaySource
      to: PlaySourceInternal
  - rename-model:
      from: RecognizeInputType
      to: RecognizeInputTypeInternal
  - rename-model:
      from: TextSource
      to: TextSourceInternal
  - rename-model:
      from: SsmlSource
      to: SsmlSourceInternal
  - rename-model:
      from: CallIntelligenceOptions
      to: CallIntelligenceOptionsInternal
  - rename-model:
      from: CustomCallingContext
      to: CustomCallingContextInternal
```

```yaml
directive:
  from: swagger-document
  where: "$.definitions.ExternalStorage"
  transform: >
    $["x-ms-client-name"] = "RecordingStorage";
```

```yaml
directive:
  from: swagger-document
  where: "$.definitions.StartCallRecordingRequest.properties.externalStorage"
  transform: >
    $["x-ms-client-name"] = "recordingStorage";
```
