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
tag: package-2023-10-03-preview
require:
  - https://github.com/Azure/azure-rest-api-specs/blob/156ff363e44f764ddd8a0a6adcd371610240ba15/specification/communication/data-plane/CallAutomation/readme.md
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
      from: AddParticipantSucceeded
      to: RestAddParticipantSucceeded
  - rename-model:
      from: AddParticipantFailed
      to: RestAddParticipantFailed
  - rename-model:
      from: RemoveParticipantSucceeded
      to: RestRemoveParticipantSucceeded
  - rename-model:
      from: RemoveParticipantFailed
      to: RestRemoveParticipantFailed
  - rename-model:
      from: CallConnected
      to: RestCallConnected
  - rename-model:
      from: CallDisconnected
      to: RestCallDisconnected
  - rename-model:
      from: CallTransferAccepted
      to: RestCallTransferAccepted
  - rename-model:
      from: CallTransferFailed
      to: RestCallTransferFailed
  - rename-model:
      from: RecordingStateChanged
      to: RestRecordingStateChanged
  - rename-model:
      from: TeamsRecordingStateChanged
      to: RestTeamsRecordingStateChanged
  - rename-model:
      from: TeamsComplianceRecordingStateChanged
      to: RestTeamsComplianceRecordingStateChanged
  - rename-model:
      from: ParticipantsUpdated
      to: RestParticipantsUpdated
  - rename-model:
      from: PlayCompleted
      to: RestPlayCompleted
  - rename-model:
      from: PlayFailed
      to: RestPlayFailed
  - rename-model:
      from: PlayCanceled
      to: RestPlayCanceled
  - rename-model:
      from: RecognizeCompleted
      to: RestRecognizeCompleted
  - rename-model:
      from: RecognizeFailed
      to: RestRecognizeFailed
  - rename-model:
      from: RecognizeCanceled
      to: RestRecognizeCanceled
  - rename-model:
      from: ResultInformation
      to: RestResultInformation
  - rename-model:
      from: ContinuousDtmfRecognitionToneReceived
      to: RestContinuousDtmfRecognitionToneReceived
  - rename-model:
      from: ContinuousDtmfRecognitionToneFailed
      to: RestContinuousDtmfRecognitionToneFailed
  - rename-model:
      from: ContinuousDtmfRecognitionStopped
      to: RestContinuousDtmfRecognitionStopped
  - rename-model:
      from: SendDtmfTonesCompleted
      to: RestSendDtmfTonesCompleted
  - rename-model:
      from: SendDtmfTonesFailed
      to: RestSendDtmfTonesFailed
  - rename-model:
      from: ToneInfo
      to: RestToneInfo
  - rename-model:
      from: CancelAddParticipantSucceeded
      to: RestCancelAddParticipantSucceeded
  - rename-model:
      from: CancelAddParticipantFailed
      to: RestCancelAddParticipantFailed
  - rename-model:
      from: CallIntelligenceOptions
      to: CallIntelligenceOptionsInternal
  - rename-model:
      from: CustomCallingContext
      to: CustomCallingContextInternal
  - rename-model:
      from: TranscriptionStarted
      to: RestTranscriptionStarted
  - rename-model:
      from: TranscriptionStopped
      to: RestTranscriptionStopped
  - rename-model:
      from: TranscriptionUpdated
      to: RestTranscriptionUpdated
  - rename-model:
      from: TranscriptionFailed
      to: RestTranscriptionFailed
  - rename-model:
      from: CreateCallFailed
      to: RestCreateCallFailed
  - rename-model:
      from: AnswerFailed
      to: RestAnswerFailed
  - rename-model:
      from: HoldFailed
      to: RestHoldFailed
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
