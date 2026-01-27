# Release History

## 1.5.1 (2026-01-22)

### Bugs Fixed

- Fixed `speechLanguage` property support in `CallMediaRecognizeSpeechOrDtmfOptions` to correctly pass speech language configuration for speech-or-DTMF recognition requests.

## 1.5.0 (2025-08-25)

### Features Added

- Added support for Teams multipersona users in create call, add participant, transfer, and redirect scenarios in OPS calls
- Added TeamsAppSource for use when creating outbound OPS calls
- Recording with the call connection ID is now supported. OPS calls can be recorded using the call connection ID.
- Added StartRecordingFailed event to indicate when the start recording API is unable to initiate the recording.
- Adds support for SIP headers prefixed with 'X-' and 'X-MS-Custom-' within the CustomCallingContext.

## 1.4.0 (2025-06-05)

### Features Added

- Real-time transcription support
- Audio and DTMF streaming capabilities
- Integration of ConnectAPI for seamless streaming and transcription
- Improved media streaming with bidirectional functionality, allowing audio formats in both directions, currently supporting sample rates of 24kHz and 16kHz
- Support for custom speech models has been integrated into transcription
- A confidence level for recognized speech has been introduced, ranging from 0.0 to 1.0 when available

## 1.5.0-beta.2 (2025-05-21)

### Bugs Fixed

- Fix to correctly reflect the client version in telemetry data.

## 1.5.0-beta.1 (2025-05-20)

### Features Added

- Added support for Teams multipersona users in add participant, transfer, and redirect scenarios in OPS calls
- Added TeamsAppSource for use when creating outbound OPS calls
- Added Incomingcall event to support incoming call notification for Teams multipersona users
- Recording with the call connection ID is now supported. OPS calls can be recorded using the call connection ID.
- Added StartRecordingFailed event to indicate when the start recording API is unable to initiate the recording.

## 1.4.0-beta.1 (2024-11-22)

### Features Added

- Added support for ConnectAPI to enable streaming and real-time transcription
- Enhanced media streaming with bidirectional capabilities, enabling support for audio formats in both directions. Currently, it supports sample rates of 24kHz and 16kHz

### Other Changes

- Introduced audio streaming and transcription data parsing capabilities.

## 1.3.0 (2024-11-22)

### Features Added

- Support multiple play sources for Play and Recognize
- Support for PlayStarted event in Play/Recognize
- Hold and Unhold the participant
- CallDisconnected now includes more information on why the call has ended
- Support to manage the rooms/servercall/group call using connect API
- Expose original PSTN number target from incoming call event in call connection properties
- Support for VoIP to PSTN transfer scenario

### Other Changes

- Added CreateCallFailed event to signify when create call API fails to establish a call
- Added AnswerFailed event to signify when answer call API fails to answer a call

## 1.3.0-beta.2 (2024-08-12)

### Bugs Fixed

- Group call now support the audio streaming

## 1.3.0-beta.1 (2024-08-02)

### Features Added

- Support multiple play sources for Play and Recognize
- Support for PlayStarted event in Play/Recognize
- Support for the real time transcription
- Monetization for real-time transcription and audio streaming
- Hold and Unhold the participant
- Support to manage the rooms/servercall/group call using connect API
- Support for the audio streaming
- Expose original PSTN number target from incoming call event in call connection properties
- Support for VoIP to PSTN transfer scenario

## 1.2.0 (2024-04-15)

### Features Added

- Support for Bring Your Own Storage recording option
- Support for PauseOnStart recording option
- Support for Recording state change with new recording kind's

### Other Changes

- Support for MicrosoftTeamsAppIdentifier CommunicationIdentifier

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
