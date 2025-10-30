// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  VoiceLiveErrorDetails,
  ErrorResponse,
  LogProbProperties,
  ClientEvent,
  ClientEventUnion,
  KnownClientEventType,
  ClientEventType,
  ClientEventSessionUpdate,
  RequestSession,
  KnownModality,
  Modality,
  Animation,
  KnownAnimationOutputType,
  AnimationOutputType,
  Voice,
  KnownOAIVoice,
  OAIVoice,
  OpenAIVoice,
  AzureVoice,
  AzureVoiceUnion,
  KnownAzureVoiceType,
  AzureVoiceType,
  AzureCustomVoice,
  AzureStandardVoice,
  AzurePersonalVoice,
  KnownPersonalVoiceModels,
  PersonalVoiceModels,
  KnownInputAudioFormat,
  InputAudioFormat,
  KnownOutputAudioFormat,
  OutputAudioFormat,
  TurnDetection,
  TurnDetectionUnion,
  KnownTurnDetectionType,
  TurnDetectionType,
  ServerVad,
  EouDetection,
  EouDetectionUnion,
  AzureSemanticDetection,
  KnownEouThresholdLevel,
  EouThresholdLevel,
  AzureSemanticDetectionEn,
  AzureSemanticDetectionMultilingual,
  AzureSemanticVad,
  AzureSemanticVadEn,
  AzureSemanticVadMultilingual,
  AudioNoiseReduction,
  AudioEchoCancellation,
  AvatarConfig,
  IceServer,
  VideoParams,
  VideoCrop,
  VideoResolution,
  Background,
  AudioInputTranscriptionOptions,
  KnownAudioTimestampType,
  AudioTimestampType,
  Tool,
  ToolUnion,
  KnownToolType,
  ToolType,
  FunctionTool,
  ToolChoice,
  KnownToolChoiceLiteral,
  ToolChoiceLiteral,
  ToolChoiceObject,
  ToolChoiceObjectUnion,
  ToolChoiceFunctionObject,
  ClientEventSessionAvatarConnect,
  ClientEventInputAudioTurnStart,
  ClientEventInputAudioTurnAppend,
  ClientEventInputAudioTurnEnd,
  ClientEventInputAudioTurnCancel,
  ClientEventInputAudioClear,
  ClientEventInputAudioBufferAppend,
  ClientEventInputAudioBufferCommit,
  ClientEventInputAudioBufferClear,
  ClientEventConversationItemCreate,
  ConversationRequestItem,
  ConversationRequestItemUnion,
  KnownItemType,
  ItemType,
  MessageItem,
  MessageItemUnion,
  KnownMessageRole,
  MessageRole,
  MessageContentPart,
  MessageContentPartUnion,
  KnownContentPartType,
  ContentPartType,
  InputTextContentPart,
  InputAudioContentPart,
  OutputTextContentPart,
  KnownItemParamStatus,
  ItemParamStatus,
  SystemMessageItem,
  UserMessageItem,
  AssistantMessageItem,
  FunctionCallItem,
  FunctionCallOutputItem,
  ClientEventConversationItemTruncate,
  ClientEventConversationItemDelete,
  ClientEventResponseCreate,
  ResponseCreateParams,
  ClientEventResponseCancel,
  ClientEventConversationItemRetrieve,
  SessionBase,
  ConversationItemBase,
  Response,
  KnownResponseStatus,
  ResponseStatus,
  ResponseStatusDetails,
  ResponseStatusDetailsUnion,
  ResponseCancelledDetails,
  ResponseIncompleteDetails,
  ResponseFailedDetails,
  ResponseItem,
  ResponseItemUnion,
  ResponseMessageItem,
  ContentPart,
  ContentPartUnion,
  RequestTextContentPart,
  RequestAudioContentPart,
  ResponseTextContentPart,
  ResponseAudioContentPart,
  KnownResponseItemStatus,
  ResponseItemStatus,
  ResponseFunctionCallItem,
  ResponseFunctionCallOutputItem,
  TokenUsage,
  InputTokenDetails,
  CachedTokenDetails,
  OutputTokenDetails,
  ServerEvent,
  ServerEventUnion,
  KnownServerEventType,
  ServerEventType,
  ServerEventError,
  ServerEventErrorDetails,
  ServerEventSessionCreated,
  ResponseSession,
  AgentConfig,
  ServerEventSessionUpdated,
  ServerEventSessionAvatarConnecting,
  ServerEventInputAudioBufferCommitted,
  ServerEventInputAudioBufferCleared,
  ServerEventInputAudioBufferSpeechStarted,
  ServerEventInputAudioBufferSpeechStopped,
  ServerEventConversationItemCreated,
  ServerEventConversationItemInputAudioTranscriptionCompleted,
  ServerEventConversationItemInputAudioTranscriptionFailed,
  ServerEventConversationItemTruncated,
  ServerEventConversationItemDeleted,
  ServerEventResponseCreated,
  ServerEventResponseDone,
  ServerEventResponseOutputItemAdded,
  ServerEventResponseOutputItemDone,
  ServerEventResponseContentPartAdded,
  ServerEventResponseContentPartDone,
  ServerEventResponseTextDelta,
  ServerEventResponseTextDone,
  ServerEventResponseAudioTranscriptDelta,
  ServerEventResponseAudioTranscriptDone,
  ServerEventResponseAudioDelta,
  ServerEventResponseAudioDone,
  ServerEventResponseAnimationBlendshapeDelta,
  ServerEventResponseAnimationBlendshapeDone,
  ServerEventResponseAudioTimestampDelta,
  ServerEventResponseAudioTimestampDone,
  ServerEventResponseAnimationVisemeDelta,
  ServerEventResponseAnimationVisemeDone,
  ServerEventConversationItemInputAudioTranscriptionDelta,
  ServerEventConversationItemRetrieved,
  ServerEventResponseFunctionCallArgumentsDelta,
  ServerEventResponseFunctionCallArgumentsDone,
} from "./models/index.js";

// Main client export
export {
  VoiceLiveClient,
  VoiceLiveClientOptions,
  ConnectOptions,
  SendEventOptions,
  AudioStreamOptions,
  TurnOptions
} from "./voiceLiveClient.js";

// WebSocket and connection exports
export {
  ConnectionState
} from "./websocket/connectionManager.js";

// Error exports
export {
  VoiceLiveError,
  VoiceLiveConnectionError,
  VoiceLiveAuthenticationError,
  VoiceLiveProtocolError,
  VoiceLiveErrorCodes,
  VoiceLiveErrorClassifier
} from "./errors/index.js";

// Authentication exports
export {
  CredentialHandler,
  VoiceLiveCredential
} from "./auth/credentialHandler.js";

// Enhanced event system exports
export {
  VoiceLiveEventEmitter,
  VoiceLiveEventMap,
  EventListener,
  ConnectedEventArgs,
  DisconnectedEventArgs,
  ReconnectingEventArgs,
  ReconnectedEventArgs,
  ErrorEventArgs,
  RawMessageEventArgs,
  RawSentEventArgs
} from "./events/voiceLiveEventEmitter.js";

export {
  EnhancedVoiceLiveEventEmitter,
  EventFilter,
  EventTransform,
  EventStreamOptions
} from "./events/enhancedEventEmitter.js";

// Streaming exports
export {
  ResponseStreamer,
  TextStreamChunk,
  AudioStreamChunk,
  AnimationStreamChunk,
  StreamChunk,
  StreamingOptions
} from "./streaming/responseStreamer.js";

export {
  VoiceLiveAsyncIterators,
  ConversationHistoryOptions,
  StreamingTextOptions,
  PagedResult,
  AsyncIterableWithPages
} from "./streaming/asyncIterators.js";

// Media processing exports
export {
  AudioProcessor,
  AudioFormat,
  AudioChunk,
  AudioProcessingOptions
} from "./media/audioProcessor.js";

export {
  VideoProcessor,
  VideoFrame,
  AvatarFrame,
  BlendshapeConfig,
  VisemeConfig
} from "./media/videoProcessor.js";

// Avatar management exports
export {
  AvatarManager,
  AvatarConfiguration,
  AvatarState,
  AvatarEventHandlers,
  BlendshapeFrame,
  VisemeFrame
} from "./avatar/avatarManager.js";
