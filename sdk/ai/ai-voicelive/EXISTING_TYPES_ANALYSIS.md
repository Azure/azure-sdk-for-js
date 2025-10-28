# Existing Types Analysis - Voice Live SDK

## Overview
This document maps all existing generated types in the Voice Live SDK to understand the current type system and identify entry points for client implementation.

## Core Event System

### Client Events (`ClientEventUnion`)
Events that the client sends to the server:

#### Session Management
- `ClientEventSessionUpdate` - Updates session configuration
- `ClientEventSessionAvatarConnect` - Establishes avatar media connection with SDP

#### Audio Input Management
- `ClientEventInputAudioTurnStart` - Start new audio input turn
- `ClientEventInputAudioTurnAppend` - Append audio data to turn  
- `ClientEventInputAudioTurnEnd` - End audio input turn
- `ClientEventInputAudioTurnCancel` - Cancel in-progress turn
- `ClientEventInputAudioClear` - Clear all input audio

#### Audio Buffer Management
- `ClientEventInputAudioBufferAppend` - Append audio to buffer (up to 15MB)
- `ClientEventInputAudioBufferCommit` - Commit buffer to conversation
- `ClientEventInputAudioBufferClear` - Clear audio buffer

#### Conversation Management
- `ClientEventConversationItemCreate` - Add item to conversation
- `ClientEventConversationItemTruncate` - Truncate assistant audio
- `ClientEventConversationItemDelete` - Remove item from conversation
- `ClientEventConversationItemRetrieve` - Get server's item representation

#### Response Management
- `ClientEventResponseCreate` - Trigger model inference
- `ClientEventResponseCancel` - Cancel in-progress response

### Server Events (`ServerEventUnion`)
Events that the server sends to the client:

#### Session Events
- `ServerEventSessionCreated` - Session established with default config
- `ServerEventSessionUpdated` - Session updated successfully
- `ServerEventSessionAvatarConnecting` - Avatar connection SDP answer
- `ServerEventError` - Error occurred (recoverable/non-recoverable)

#### Audio Buffer Events
- `ServerEventInputAudioBufferCommitted` - Buffer committed to conversation
- `ServerEventInputAudioBufferCleared` - Buffer cleared by client
- `ServerEventInputAudioBufferSpeechStarted` - VAD detected speech start
- `ServerEventInputAudioBufferSpeechStopped` - VAD detected speech end

#### Conversation Events
- `ServerEventConversationItemCreated` - New item added to conversation
- `ServerEventConversationItemTruncated` - Item truncated by client
- `ServerEventConversationItemDeleted` - Item removed from conversation
- `ServerEventConversationItemRetrieved` - Item retrieved by client request

#### Transcription Events
- `ServerEventConversationItemInputAudioTranscriptionCompleted` - Input transcription done
- `ServerEventConversationItemInputAudioTranscriptionFailed` - Input transcription failed
- `ServerEventConversationItemInputAudioTranscriptionDelta` - Input transcription streaming

#### Response Events
- `ServerEventResponseCreated` - Response generation started
- `ServerEventResponseDone` - Response generation completed
- `ServerEventResponseOutputItemAdded` - New output item created
- `ServerEventResponseOutputItemDone` - Output item completed
- `ServerEventResponseContentPartAdded` - Content part added to item
- `ServerEventResponseContentPartDone` - Content part completed

#### Response Content Streaming
- `ServerEventResponseTextDelta` - Text content streaming
- `ServerEventResponseTextDone` - Text content completed
- `ServerEventResponseAudioTranscriptDelta` - Audio transcript streaming
- `ServerEventResponseAudioTranscriptDone` - Audio transcript completed
- `ServerEventResponseAudioDelta` - Audio data streaming
- `ServerEventResponseAudioDone` - Audio data completed

#### Animation/Avatar Events
- `ServerEventResponseAnimationBlendshapeDelta` - Blendshape animation frames
- `ServerEventResponseAnimationBlendshapeDone` - Blendshape animation completed
- `ServerEventResponseAnimationVisemeDelta` - Viseme animation data
- `ServerEventResponseAnimationVisemeDone` - Viseme animation completed
- `ServerEventResponseAudioTimestampDelta` - Word-level audio timestamps
- `ServerEventResponseAudioTimestampDone` - Audio timestamps completed

#### Function Call Events
- `ServerEventResponseFunctionCallArgumentsDelta` - Function arguments streaming
- `ServerEventResponseFunctionCallArgumentsDone` - Function arguments completed

## Core Configuration Types

### Session Configuration
- `RequestSession` - Client session configuration (for updates)
- `ResponseSession` - Server session state (includes ID and agent config)
- `AgentConfig` - AI Agents integration configuration

### Voice Configuration
- `Voice` - Union of all voice types
- `OAIVoice` - OpenAI voice names (string enum)
- `OpenAIVoice` - Structured OpenAI voice with type field
- `AzureVoiceUnion` - Azure voice configurations
  - `AzureCustomVoice` - Custom voice with endpoint
  - `AzureStandardVoice` - Standard Azure voices
  - `AzurePersonalVoice` - Personal voice with model selection

### Audio Configuration
- `InputAudioFormat` - pcm16, g711_ulaw, g711_alaw
- `OutputAudioFormat` - pcm16 variants, g711 formats
- `AudioNoiseReduction` - Noise reduction configuration
- `AudioEchoCancellation` - Echo cancellation settings
- `AudioInputTranscriptionOptions` - Transcription models and settings

### Turn Detection
- `TurnDetectionUnion` - VAD configuration options
  - `ServerVad` - Basic server-side VAD
  - `AzureSemanticVad` - Azure semantic VAD (default)
  - `AzureSemanticVadEn` - English-optimized semantic VAD
  - `AzureSemanticVadMultilingual` - Multilingual semantic VAD
- `EouDetectionUnion` - End-of-utterance detection models

### Animation/Avatar Configuration
- `Animation` - Animation output types (blendshapes, visemes)
- `AvatarConfig` - Avatar streaming configuration
- `VideoParams` - Video encoding parameters
- `IceServer` - WebRTC ICE server configuration

## Conversation Types

### Items
- `ConversationRequestItemUnion` - Items client can create
- `ResponseItemUnion` - Items in server responses
- `MessageItemUnion` - Message items by role
  - `SystemMessageItem` - System instructions
  - `UserMessageItem` - User messages
  - `AssistantMessageItem` - Assistant responses
- `FunctionCallItem` - Function call items
- `FunctionCallOutputItem` - Function call results

### Content Parts
- `MessageContentPartUnion` - Content parts in messages
  - `InputTextContentPart` - User text input
  - `InputAudioContentPart` - User audio input
  - `OutputTextContentPart` - Assistant text output
- `ContentPartUnion` - Extended content parts including audio
  - `ResponseTextContentPart` - Response text content
  - `ResponseAudioContentPart` - Response audio content

### Tools
- `ToolUnion` - Available tool types
- `FunctionTool` - Function tool definition
- `ToolChoice` - Tool selection strategy

## Response Types
- `Response` - Complete response object with metadata
- `ResponseStatus` - Response completion status
- `ResponseStatusDetailsUnion` - Failure/cancellation details
- `TokenUsage` - Token consumption statistics

## Error Types
- `VoiceLiveErrorDetails` - Structured error information
- `ErrorResponse` - Standard error response envelope

## Modalities and Formats
- `Modality` - text, audio, animation, avatar
- `AnimationOutputType` - blendshapes, viseme_id
- `AudioTimestampType` - word-level timestamps

## Entry Points for Client Implementation

### Primary Client Interface
The client should implement:
1. **Connection Management** - WebSocket connection lifecycle
2. **Session Management** - Send `ClientEventSessionUpdate`, handle `ServerEventSessionCreated/Updated`
3. **Audio Input** - Buffer management and turn-based input
4. **Response Generation** - Send `ClientEventResponseCreate`, handle response events
5. **Conversation Management** - CRUD operations on conversation items

### Event Flow Patterns
1. **Session Initialization**: Connect → `session.created` → Configure session
2. **Audio Input**: Buffer audio → VAD triggers → Transcription → Response generation
3. **Manual Response**: Send `response.create` → Stream response events → Response complete
4. **Avatar Integration**: Send SDP offer → Receive SDP answer → WebRTC connection

### Critical Serialization/Deserialization
- All events have `*Serializer` and `*Deserializer` functions
- Audio data uses Base64 encoding with `stringToUint8Array` conversion
- Complex unions use discriminated serialization by type field

## Code Generation Compatibility Notes
- DO NOT modify files in `src/models/` - they are generated
- All customizations must be in separate files
- Use the existing serializer/deserializer functions
- Follow discriminated union patterns for extensibility
- Maintain backward compatibility with existing event structure