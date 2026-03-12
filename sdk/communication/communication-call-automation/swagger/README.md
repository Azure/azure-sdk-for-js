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
module-kind: esm
tag: package-2025-06-15
require:
  - https://github.com/Azure/azure-rest-api-specs/blob/b359b43e76ee17d4f1c5aa83b58577653c0fb51b/specification/communication/data-plane/CallAutomation/readme.md
package-version: 1.5.1
model-date-time-as-string: false
optional-response-headers: true
typescript: true
azure-arm: false
add-credentials: false
use-extension:
  "@autorest/typescript": "6.0.34"
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
      from: MediaStreamingOptions
      to: MediaStreamingOptionsInternal
  - rename-model:
      from: TranscriptionOptions
      to: TranscriptionOptionsInternal
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
  - rename-model:
      from: MediaStreamingOptions
      to: MediaStreamingOptionsInternal
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

```yaml
directive:
  from: swagger-document
  where: "$.definitions.TranscriptionResultType.x-ms-enum"
  transform: >
    $["name"] = "TranscriptionResultState";
```

```yaml
directive:
  from: swagger-document
  where: "$.definitions.TranscriptionSubscription.properties.subscribedResultTypes"
  transform: >
    $["x-ms-client-name"] = "subscribedResultStates";
```
