# Release History

## 1.1.0-beta.1 (Unreleased)

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
