# Release History

## 1.3.0-beta.1 (Unreleased)

### Features Added


### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.1.0 (2023-11-23)

### Features Added

- Mid Call actions support overriding callback url.
- Cancel adding Participant invitation.
- Support transfer a participant in a group call to another participant.
- Add Custom Context payload to Transfer and AddParticipant API.

## 1.1.0-beta.3 (2023-10-19)

### Bug fixes

- Await on downlaodToPath method will now properly wait untill download completes.

## 1.1.0-beta.2 (2023-08-30)

### Features Added

- Add MicrosoftTeamsUserIdentifier to CallInvite model.

## 1.1.0-beta.1 (2023-08-17)

### Features Added

- Play and recognize supports TTS and SSML source prompts.
- Recognize supports choices and freeform speech.
- Start/Stop continuous DTMF recognition by subscribing/unsubscribing to tones.
- Send DTMF tones to a participant in the call.
- Mute participant in the call.

### Breaking Changes

- Maximum number of DTMF tones to be collected for startRecognizing is now need to set in DTMF sepecific recognizeOptions.

## 1.0.0 (2023-06-14)

Call Automation enables developers to build call workflows. Personalise customer interactions by listening to call events and take actions based on your business logic.

### Features Added

- Create outbound calls to an Azure Communication Service user or a phone number.
- Answer/Redirect/Reject incoming call from an Azure Communication Service user or a phone number.
- Transfer the call to another participant.
- List, add or remove participants from the call.
- Hangup or terminate the call.
- Play audio files to one or more participants in the call.
- Recognize incoming DTMF in the call.
- Record calls with option to start/resume/stop.
- Record mixed and unmixed audio recordings.
- Download recordings.
- Parse various events happening in the call, such as CallConnected and PlayCompleted event.
