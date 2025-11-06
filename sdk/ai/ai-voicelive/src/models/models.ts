// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { stringToUint8Array } from "@azure/core-util";

/** Error object returned in case of API failure. */
export interface VoiceLiveErrorDetails {
  /** Error code, or null if unspecified. */
  code?: string;
  /** Human-readable error message. */
  message: string;
  /** Parameter name related to the error, if applicable. */
  param?: string;
  /** Type or category of the error. */
  type?: string;
  /** Event id of the error. */
  eventId?: string;
}

export function voiceLiveErrorDetailsDeserializer(item: any): VoiceLiveErrorDetails {
  return {
    code: item["code"],
    message: item["message"],
    param: item["param"],
    type: item["type"],
    eventId: item["event_id"],
  };
}

/** Standard error response envelope. */
export interface ErrorResponse {
  /** Error object returned in case of API failure. */
  error: VoiceLiveErrorDetails;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: voiceLiveErrorDetailsDeserializer(item["error"]),
  };
}

/** A single log probability entry for a token. */
export interface LogProbProperties {
  /** The token that was used to generate the log probability. */
  token: string;
  /** The log probability of the token. */
  logprob: number;
  /** The bytes that were used to generate the log probability. */
  bytes: number[];
}

export function logProbPropertiesDeserializer(item: any): LogProbProperties {
  return {
    token: item["token"],
    logprob: item["logprob"],
    bytes: item["bytes"].map((p: any) => {
      return p;
    }),
  };
}

/** A voicelive client event. */
export interface ClientEvent {
  /** The type of event. */
  /** The discriminator possible values: session.update, session.avatar.connect, input_audio.turn.start, input_audio.turn.append, input_audio.turn.end, input_audio.turn.cancel, input_audio.clear, input_audio_buffer.append, input_audio_buffer.commit, input_audio_buffer.clear, conversation.item.create, conversation.item.truncate, conversation.item.delete, response.create, response.cancel, conversation.item.retrieve */
  type: ClientEventType;
  eventId?: string;
}

export function clientEventSerializer(item: ClientEvent): any {
  return { type: item["type"], event_id: item["eventId"] };
}

/** Alias for ClientEventUnion */
export type ClientEventUnion =
  | ClientEventSessionUpdate
  | ClientEventSessionAvatarConnect
  | ClientEventInputAudioTurnStart
  | ClientEventInputAudioTurnAppend
  | ClientEventInputAudioTurnEnd
  | ClientEventInputAudioTurnCancel
  | ClientEventInputAudioClear
  | ClientEventInputAudioBufferAppend
  | ClientEventInputAudioBufferCommit
  | ClientEventInputAudioBufferClear
  | ClientEventConversationItemCreate
  | ClientEventConversationItemTruncate
  | ClientEventConversationItemDelete
  | ClientEventResponseCreate
  | ClientEventResponseCancel
  | ClientEventConversationItemRetrieve
  | ClientEvent;

export function clientEventUnionSerializer(item: ClientEventUnion): any {
  switch (item.type) {
    case "session.update":
      return clientEventSessionUpdateSerializer(item as ClientEventSessionUpdate);

    case "session.avatar.connect":
      return clientEventSessionAvatarConnectSerializer(item as ClientEventSessionAvatarConnect);

    case "input_audio.turn.start":
      return clientEventInputAudioTurnStartSerializer(item as ClientEventInputAudioTurnStart);

    case "input_audio.turn.append":
      return clientEventInputAudioTurnAppendSerializer(item as ClientEventInputAudioTurnAppend);

    case "input_audio.turn.end":
      return clientEventInputAudioTurnEndSerializer(item as ClientEventInputAudioTurnEnd);

    case "input_audio.turn.cancel":
      return clientEventInputAudioTurnCancelSerializer(item as ClientEventInputAudioTurnCancel);

    case "input_audio.clear":
      return clientEventInputAudioClearSerializer(item as ClientEventInputAudioClear);

    case "input_audio_buffer.append":
      return clientEventInputAudioBufferAppendSerializer(item as ClientEventInputAudioBufferAppend);

    case "input_audio_buffer.commit":
      return clientEventInputAudioBufferCommitSerializer(item as ClientEventInputAudioBufferCommit);

    case "input_audio_buffer.clear":
      return clientEventInputAudioBufferClearSerializer(item as ClientEventInputAudioBufferClear);

    case "conversation.item.create":
      return clientEventConversationItemCreateSerializer(item as ClientEventConversationItemCreate);

    case "conversation.item.truncate":
      return clientEventConversationItemTruncateSerializer(
        item as ClientEventConversationItemTruncate,
      );

    case "conversation.item.delete":
      return clientEventConversationItemDeleteSerializer(item as ClientEventConversationItemDelete);

    case "response.create":
      return clientEventResponseCreateSerializer(item as ClientEventResponseCreate);

    case "response.cancel":
      return clientEventResponseCancelSerializer(item as ClientEventResponseCancel);

    case "conversation.item.retrieve":
      return clientEventConversationItemRetrieveSerializer(
        item as ClientEventConversationItemRetrieve,
      );

    default:
      return clientEventSerializer(item);
  }
}

/** Client event types used in VoiceLive protocol. */
export enum KnownClientEventType {
  /** session.update */
  SessionUpdate = "session.update",
  /** input_audio_buffer.append */
  InputAudioBufferAppend = "input_audio_buffer.append",
  /** input_audio_buffer.commit */
  InputAudioBufferCommit = "input_audio_buffer.commit",
  /** input_audio_buffer.clear */
  InputAudioBufferClear = "input_audio_buffer.clear",
  /** input_audio.turn.start */
  InputAudioTurnStart = "input_audio.turn.start",
  /** input_audio.turn.append */
  InputAudioTurnAppend = "input_audio.turn.append",
  /** input_audio.turn.end */
  InputAudioTurnEnd = "input_audio.turn.end",
  /** input_audio.turn.cancel */
  InputAudioTurnCancel = "input_audio.turn.cancel",
  /** input_audio.clear */
  InputAudioClear = "input_audio.clear",
  /** conversation.item.create */
  ConversationItemCreate = "conversation.item.create",
  /** conversation.item.retrieve */
  ConversationItemRetrieve = "conversation.item.retrieve",
  /** conversation.item.truncate */
  ConversationItemTruncate = "conversation.item.truncate",
  /** conversation.item.delete */
  ConversationItemDelete = "conversation.item.delete",
  /** response.create */
  ResponseCreate = "response.create",
  /** response.cancel */
  ResponseCancel = "response.cancel",
  /** session.avatar.connect */
  SessionAvatarConnect = "session.avatar.connect",
}

/**
 * Client event types used in VoiceLive protocol. \
 * {@link KnownClientEventType} can be used interchangeably with ClientEventType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **session.update** \
 * **input_audio_buffer.append** \
 * **input_audio_buffer.commit** \
 * **input_audio_buffer.clear** \
 * **input_audio.turn.start** \
 * **input_audio.turn.append** \
 * **input_audio.turn.end** \
 * **input_audio.turn.cancel** \
 * **input_audio.clear** \
 * **conversation.item.create** \
 * **conversation.item.retrieve** \
 * **conversation.item.truncate** \
 * **conversation.item.delete** \
 * **response.create** \
 * **response.cancel** \
 * **session.avatar.connect**
 */
export type ClientEventType = string;

/**
 * Send this event to update the session’s default configuration.
 * The client may send this event at any time to update any field,
 * except for `voice`. However, note that once a session has been
 * initialized with a particular `model`, it can’t be changed to
 * another model using `session.update`.
 * When the server receives a `session.update`, it will respond
 * with a `session.updated` event showing the full, effective configuration.
 * Only the fields that are present are updated. To clear a field like
 * `instructions`, pass an empty string.
 */
export interface ClientEventSessionUpdate extends ClientEvent {
  /** The event type, must be `session.update`. */
  type: "session.update";
  session: RequestSession;
}

export function clientEventSessionUpdateSerializer(item: ClientEventSessionUpdate): any {
  return {
    type: item["type"],
    event_id: item["eventId"],
    session: requestSessionSerializer(item["session"]),
  };
}

/** Base for session configuration shared between request and response. */
export interface RequestSession {
  /** The model for the session. */
  model?: string;
  /** The modalities to be used in the session. */
  modalities?: Modality[];
  /** The animation configuration for the session. */
  animation?: Animation;
  /** The voice configuration for the session. */
  voice?: Voice;
  /** Optional instructions to guide the model's behavior throughout the session. */
  instructions?: string;
  /**
   * Input audio sampling rate in Hz. Available values:
   *
   * - For pcm16: 8000, 16000, 24000
   *
   * - For g711_alaw/g711_ulaw: 8000
   */
  inputAudioSamplingRate?: number;
  /** Input audio format. Default is 'pcm16'. */
  inputAudioFormat?: InputAudioFormat;
  /** Output audio format. Default is 'pcm16'. */
  outputAudioFormat?: OutputAudioFormat;
  /** Type of turn detection to use. */
  turnDetection?: TurnDetectionUnion;
  /** Configuration for input audio noise reduction. */
  inputAudioNoiseReduction?: AudioNoiseReduction;
  /** Configuration for echo cancellation during server-side audio processing. */
  inputAudioEchoCancellation?: AudioEchoCancellation;
  /** Configuration for avatar streaming and behavior during the session. */
  avatar?: AvatarConfig;
  /** Configuration for input audio transcription. */
  inputAudioTranscription?: AudioInputTranscriptionOptions;
  /** Types of timestamps to include in audio response content. */
  outputAudioTimestampTypes?: AudioTimestampType[];
  /** Configuration for tools to be used during the session, if applicable. */
  tools?: ToolUnion[];
  /** Specifies which tools the model is allowed to call during the session. */
  toolChoice?: ToolChoice;
  /** Controls the randomness of the model's output. Range: 0.0 to 1.0. Default is 0.7. */
  temperature?: number;
  /** Maximum number of tokens to generate in the response. Default is unlimited. */
  maxResponseOutputTokens?: number | "inf";
}

export function requestSessionSerializer(item: RequestSession): any {
  return {
    model: item["model"],
    modalities: !item["modalities"]
      ? item["modalities"]
      : item["modalities"].map((p: any) => {
          return p;
        }),
    animation: !item["animation"] ? item["animation"] : animationSerializer(item["animation"]),
    voice: !item["voice"] ? item["voice"] : voiceSerializer(item["voice"]),
    instructions: item["instructions"],
    input_audio_sampling_rate: item["inputAudioSamplingRate"],
    input_audio_format: item["inputAudioFormat"],
    output_audio_format: item["outputAudioFormat"],
    turn_detection: !item["turnDetection"]
      ? item["turnDetection"]
      : turnDetectionUnionSerializer(item["turnDetection"]),
    input_audio_noise_reduction: !item["inputAudioNoiseReduction"]
      ? item["inputAudioNoiseReduction"]
      : audioNoiseReductionSerializer(item["inputAudioNoiseReduction"]),
    input_audio_echo_cancellation: !item["inputAudioEchoCancellation"]
      ? item["inputAudioEchoCancellation"]
      : audioEchoCancellationSerializer(item["inputAudioEchoCancellation"]),
    avatar: !item["avatar"] ? item["avatar"] : avatarConfigSerializer(item["avatar"]),
    input_audio_transcription: !item["inputAudioTranscription"]
      ? item["inputAudioTranscription"]
      : audioInputTranscriptionOptionsSerializer(item["inputAudioTranscription"]),
    output_audio_timestamp_types: !item["outputAudioTimestampTypes"]
      ? item["outputAudioTimestampTypes"]
      : item["outputAudioTimestampTypes"].map((p: any) => {
          return p;
        }),
    tools: !item["tools"] ? item["tools"] : toolUnionArraySerializer(item["tools"]),
    tool_choice: !item["toolChoice"]
      ? item["toolChoice"]
      : toolChoiceSerializer(item["toolChoice"]),
    temperature: item["temperature"],
    max_response_output_tokens: !item["maxResponseOutputTokens"]
      ? item["maxResponseOutputTokens"]
      : _requestSessionMaxResponseOutputTokensSerializer(item["maxResponseOutputTokens"]),
  };
}

/** Supported modalities for the session. */
export enum KnownModality {
  /** Text modality. */
  Text = "text",
  /** Audio modality. */
  Audio = "audio",
  /** Animation modality. */
  Animation = "animation",
  /** Avatar modality. */
  Avatar = "avatar",
}

/**
 * Supported modalities for the session. \
 * {@link KnownModality} can be used interchangeably with Modality,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **text**: Text modality. \
 * **audio**: Audio modality. \
 * **animation**: Animation modality. \
 * **avatar**: Avatar modality.
 */
export type Modality = string;

/** Configuration for animation outputs including blendshapes and visemes metadata. */
export interface Animation {
  /** The name of the animation model to use. */
  modelName?: string;
  /** Set of output data types requested from the animation system. */
  outputs?: AnimationOutputType[];
}

export function animationSerializer(item: Animation): any {
  return {
    model_name: item["modelName"],
    outputs: !item["outputs"]
      ? item["outputs"]
      : item["outputs"].map((p: any) => {
          return p;
        }),
  };
}

export function animationDeserializer(item: any): Animation {
  return {
    modelName: item["model_name"],
    outputs: !item["outputs"]
      ? item["outputs"]
      : item["outputs"].map((p: any) => {
          return p;
        }),
  };
}

/** Specifies the types of animation data to output. */
export enum KnownAnimationOutputType {
  /** Blendshapes output type. */
  Blendshapes = "blendshapes",
  /** Viseme ID output type. */
  VisemeId = "viseme_id",
}

/**
 * Specifies the types of animation data to output. \
 * {@link KnownAnimationOutputType} can be used interchangeably with AnimationOutputType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **blendshapes**: Blendshapes output type. \
 * **viseme_id**: Viseme ID output type.
 */
export type AnimationOutputType = string;
/** Union of all supported voice configurations. */
export type Voice = OAIVoice | OpenAIVoice | AzureVoiceUnion;

export function voiceSerializer(item: Voice): any {
  return item;
}

export function voiceDeserializer(item: any): Voice {
  return item;
}

/** Supported OpenAI voice names (string enum). */
export enum KnownOAIVoice {
  /** Alloy voice. */
  Alloy = "alloy",
  /** Ash voice. */
  Ash = "ash",
  /** Ballard voice. */
  Ballad = "ballad",
  /** Coral voice. */
  Coral = "coral",
  /** Echo voice. */
  Echo = "echo",
  /** Sage voice. */
  Sage = "sage",
  /** Shimmer voice. */
  Shimmer = "shimmer",
  /** Verse voice. */
  Verse = "verse",
}

/**
 * Supported OpenAI voice names (string enum). \
 * {@link KnownOAIVoice} can be used interchangeably with OAIVoice,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **alloy**: Alloy voice. \
 * **ash**: Ash voice. \
 * **ballad**: Ballard voice. \
 * **coral**: Coral voice. \
 * **echo**: Echo voice. \
 * **sage**: Sage voice. \
 * **shimmer**: Shimmer voice. \
 * **verse**: Verse voice.
 */
export type OAIVoice = string;

/**
 * OpenAI voice configuration with explicit type field.
 *
 * This provides a unified interface for OpenAI voices, complementing the
 * existing string-based OAIVoice for backward compatibility.
 */
export interface OpenAIVoice {
  /** The type of the voice. */
  type: "openai";
  /** The name of the OpenAI voice. */
  name: OAIVoice;
}

export function openAIVoiceSerializer(item: OpenAIVoice): any {
  return { type: item["type"], name: item["name"] };
}

export function openAIVoiceDeserializer(item: any): OpenAIVoice {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** Base for Azure voice configurations. */
export interface AzureVoice {
  /** The type of the Azure voice. */
  /** The discriminator possible values: azure-custom, azure-standard, azure-personal */
  type: AzureVoiceType;
}

export function azureVoiceSerializer(item: AzureVoice): any {
  return { type: item["type"] };
}

export function azureVoiceDeserializer(item: any): AzureVoice {
  return {
    type: item["type"],
  };
}

/** Alias for AzureVoiceUnion */
export type AzureVoiceUnion =
  | AzureCustomVoice
  | AzureStandardVoice
  | AzurePersonalVoice
  | AzureVoice;

export function azureVoiceUnionSerializer(item: AzureVoiceUnion): any {
  switch (item.type) {
    case "azure-custom":
      return azureCustomVoiceSerializer(item as AzureCustomVoice);

    case "azure-standard":
      return azureStandardVoiceSerializer(item as AzureStandardVoice);

    case "azure-personal":
      return azurePersonalVoiceSerializer(item as AzurePersonalVoice);

    default:
      return azureVoiceSerializer(item);
  }
}

export function azureVoiceUnionDeserializer(item: any): AzureVoiceUnion {
  switch (item.type) {
    case "azure-custom":
      return azureCustomVoiceDeserializer(item as AzureCustomVoice);

    case "azure-standard":
      return azureStandardVoiceDeserializer(item as AzureStandardVoice);

    case "azure-personal":
      return azurePersonalVoiceDeserializer(item as AzurePersonalVoice);

    default:
      return azureVoiceDeserializer(item);
  }
}

/** Union of all supported Azure voice types. */
export enum KnownAzureVoiceType {
  /** Azure custom voice. */
  AzureCustom = "azure-custom",
  /** Azure standard voice. */
  AzureStandard = "azure-standard",
  /** Azure personal voice. */
  AzurePersonal = "azure-personal",
}

/**
 * Union of all supported Azure voice types. \
 * {@link KnownAzureVoiceType} can be used interchangeably with AzureVoiceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **azure-custom**: Azure custom voice. \
 * **azure-standard**: Azure standard voice. \
 * **azure-personal**: Azure personal voice.
 */
export type AzureVoiceType = string;

/** Azure custom voice configuration. */
export interface AzureCustomVoice extends AzureVoice {
  type: "azure-custom";
  /** Voice name cannot be empty. */
  name: string;
  /** Endpoint ID cannot be empty. */
  endpointId: string;
  /** Temperature must be between 0.0 and 1.0. */
  temperature?: number;
  customLexiconUrl?: string;
  preferLocales?: string[];
  locale?: string;
  style?: string;
  pitch?: string;
  rate?: string;
  volume?: string;
}

export function azureCustomVoiceSerializer(item: AzureCustomVoice): any {
  return {
    type: item["type"],
    name: item["name"],
    endpoint_id: item["endpointId"],
    temperature: item["temperature"],
    custom_lexicon_url: item["customLexiconUrl"],
    prefer_locales: !item["preferLocales"]
      ? item["preferLocales"]
      : item["preferLocales"].map((p: any) => {
          return p;
        }),
    locale: item["locale"],
    style: item["style"],
    pitch: item["pitch"],
    rate: item["rate"],
    volume: item["volume"],
  };
}

export function azureCustomVoiceDeserializer(item: any): AzureCustomVoice {
  return {
    type: item["type"],
    name: item["name"],
    endpointId: item["endpoint_id"],
    temperature: item["temperature"],
    customLexiconUrl: item["custom_lexicon_url"],
    preferLocales: !item["prefer_locales"]
      ? item["prefer_locales"]
      : item["prefer_locales"].map((p: any) => {
          return p;
        }),
    locale: item["locale"],
    style: item["style"],
    pitch: item["pitch"],
    rate: item["rate"],
    volume: item["volume"],
  };
}

/** Azure standard voice configuration. */
export interface AzureStandardVoice extends AzureVoice {
  type: "azure-standard";
  /** Voice name cannot be empty. */
  name: string;
  /** Temperature must be between 0.0 and 1.0. */
  temperature?: number;
  customLexiconUrl?: string;
  preferLocales?: string[];
  locale?: string;
  style?: string;
  pitch?: string;
  rate?: string;
  volume?: string;
}

export function azureStandardVoiceSerializer(item: AzureStandardVoice): any {
  return {
    type: item["type"],
    name: item["name"],
    temperature: item["temperature"],
    custom_lexicon_url: item["customLexiconUrl"],
    prefer_locales: !item["preferLocales"]
      ? item["preferLocales"]
      : item["preferLocales"].map((p: any) => {
          return p;
        }),
    locale: item["locale"],
    style: item["style"],
    pitch: item["pitch"],
    rate: item["rate"],
    volume: item["volume"],
  };
}

export function azureStandardVoiceDeserializer(item: any): AzureStandardVoice {
  return {
    type: item["type"],
    name: item["name"],
    temperature: item["temperature"],
    customLexiconUrl: item["custom_lexicon_url"],
    preferLocales: !item["prefer_locales"]
      ? item["prefer_locales"]
      : item["prefer_locales"].map((p: any) => {
          return p;
        }),
    locale: item["locale"],
    style: item["style"],
    pitch: item["pitch"],
    rate: item["rate"],
    volume: item["volume"],
  };
}

/** Azure personal voice configuration. */
export interface AzurePersonalVoice extends AzureVoice {
  type: "azure-personal";
  /** Voice name cannot be empty. */
  name: string;
  /** Temperature must be between 0.0 and 1.0. */
  temperature?: number;
  /** Underlying neural model to use for personal voice. */
  model: PersonalVoiceModels;
}

export function azurePersonalVoiceSerializer(item: AzurePersonalVoice): any {
  return {
    type: item["type"],
    name: item["name"],
    temperature: item["temperature"],
    model: item["model"],
  };
}

export function azurePersonalVoiceDeserializer(item: any): AzurePersonalVoice {
  return {
    type: item["type"],
    name: item["name"],
    temperature: item["temperature"],
    model: item["model"],
  };
}

/** PersonalVoice models */
export enum KnownPersonalVoiceModels {
  /** Use the latest Dragon model. */
  DragonLatestNeural = "DragonLatestNeural",
  /** Use the latest Phoenix model. */
  PhoenixLatestNeural = "PhoenixLatestNeural",
  /** Use the Phoenix V2 model. */
  PhoenixV2Neural = "PhoenixV2Neural",
}

/**
 * PersonalVoice models \
 * {@link KnownPersonalVoiceModels} can be used interchangeably with PersonalVoiceModels,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DragonLatestNeural**: Use the latest Dragon model. \
 * **PhoenixLatestNeural**: Use the latest Phoenix model. \
 * **PhoenixV2Neural**: Use the Phoenix V2 model.
 */
export type PersonalVoiceModels = string;

/** Input audio format types supported. */
export enum KnownInputAudioFormat {
  /** 16-bit PCM audio format at default sampling rate (24kHz) */
  Pcm16 = "pcm16",
  /** G.711 μ-law (mu-law) audio format at 8kHz sampling rate */
  G711Ulaw = "g711_ulaw",
  /** G.711 A-law audio format at 8kHz sampling rate */
  G711Alaw = "g711_alaw",
}

/**
 * Input audio format types supported. \
 * {@link KnownInputAudioFormat} can be used interchangeably with InputAudioFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **pcm16**: 16-bit PCM audio format at default sampling rate (24kHz) \
 * **g711_ulaw**: G.711 μ-law (mu-law) audio format at 8kHz sampling rate \
 * **g711_alaw**: G.711 A-law audio format at 8kHz sampling rate
 */
export type InputAudioFormat = string;

/** Output audio format types supported. */
export enum KnownOutputAudioFormat {
  /** 16-bit PCM audio format at default sampling rate (24kHz) */
  Pcm16 = "pcm16",
  /** 16-bit PCM audio format at 8kHz sampling rate */
  Pcm168000Hz = "pcm16-8000hz",
  /** 16-bit PCM audio format at 16kHz sampling rate */
  Pcm1616000Hz = "pcm16-16000hz",
  /** G.711 μ-law (mu-law) audio format at 8kHz sampling rate */
  G711Ulaw = "g711_ulaw",
  /** G.711 A-law audio format at 8kHz sampling rate */
  G711Alaw = "g711_alaw",
}

/**
 * Output audio format types supported. \
 * {@link KnownOutputAudioFormat} can be used interchangeably with OutputAudioFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **pcm16**: 16-bit PCM audio format at default sampling rate (24kHz) \
 * **pcm16-8000hz**: 16-bit PCM audio format at 8kHz sampling rate \
 * **pcm16-16000hz**: 16-bit PCM audio format at 16kHz sampling rate \
 * **g711_ulaw**: G.711 μ-law (mu-law) audio format at 8kHz sampling rate \
 * **g711_alaw**: G.711 A-law audio format at 8kHz sampling rate
 */
export type OutputAudioFormat = string;

/** Top-level union for turn detection configuration. */
export interface TurnDetection {
  type: TurnDetectionType;
}

export function turnDetectionSerializer(item: TurnDetection): any {
  return { type: item["type"] };
}

export function turnDetectionDeserializer(item: any): TurnDetection {
  return {
    type: item["type"],
  };
}

/** Alias for TurnDetectionUnion */
export type TurnDetectionUnion =
  | ServerVad
  | AzureSemanticVad
  | AzureSemanticVadEn
  | AzureSemanticVadMultilingual
  | TurnDetection;

export function turnDetectionUnionSerializer(item: TurnDetectionUnion): any {
  switch (item.type) {
    case "server_vad":
      return serverVadSerializer(item as ServerVad);

    case "azure_semantic_vad":
      return azureSemanticVadSerializer(item as AzureSemanticVad);

    case "azure_semantic_vad_en":
      return azureSemanticVadEnSerializer(item as AzureSemanticVadEn);

    case "azure_semantic_vad_multilingual":
      return azureSemanticVadMultilingualSerializer(item as AzureSemanticVadMultilingual);

    default:
      return turnDetectionSerializer(item);
  }
}

export function turnDetectionUnionDeserializer(item: any): TurnDetectionUnion {
  switch (item.type) {
    case "server_vad":
      return serverVadDeserializer(item as ServerVad);

    case "azure_semantic_vad":
      return azureSemanticVadDeserializer(item as AzureSemanticVad);

    case "azure_semantic_vad_en":
      return azureSemanticVadEnDeserializer(item as AzureSemanticVadEn);

    case "azure_semantic_vad_multilingual":
      return azureSemanticVadMultilingualDeserializer(item as AzureSemanticVadMultilingual);

    default:
      return turnDetectionDeserializer(item);
  }
}

/** Known values of {@link TurnDetectionType} that the service accepts. */
export enum KnownTurnDetectionType {
  /** server_vad */
  ServerVad = "server_vad",
  /** azure_semantic_vad */
  AzureSemanticVad = "azure_semantic_vad",
  /** azure_semantic_vad_en */
  AzureSemanticVadEn = "azure_semantic_vad_en",
  /** azure_semantic_vad_multilingual */
  AzureSemanticVadMultilingual = "azure_semantic_vad_multilingual",
}

/** Type of TurnDetectionType */
export type TurnDetectionType = string;

/** Base model for VAD-based turn detection. */
export interface ServerVad extends TurnDetection {
  type: "server_vad";
  threshold?: number;
  prefixPaddingMs?: number;
  silenceDurationMs?: number;
  endOfUtteranceDetection?: EouDetectionUnion;
  autoTruncate?: boolean;
  createResponse?: boolean;
  interruptResponse?: boolean;
}

export function serverVadSerializer(item: ServerVad): any {
  return {
    type: item["type"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefixPaddingMs"],
    silence_duration_ms: item["silenceDurationMs"],
    end_of_utterance_detection: !item["endOfUtteranceDetection"]
      ? item["endOfUtteranceDetection"]
      : eouDetectionUnionSerializer(item["endOfUtteranceDetection"]),
    auto_truncate: item["autoTruncate"],
    create_response: item["createResponse"],
    interrupt_response: item["interruptResponse"],
  };
}

export function serverVadDeserializer(item: any): ServerVad {
  return {
    type: item["type"],
    threshold: item["threshold"],
    prefixPaddingMs: item["prefix_padding_ms"],
    silenceDurationMs: item["silence_duration_ms"],
    endOfUtteranceDetection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : eouDetectionUnionDeserializer(item["end_of_utterance_detection"]),
    autoTruncate: item["auto_truncate"],
    createResponse: item["create_response"],
    interruptResponse: item["interrupt_response"],
  };
}

/** Top-level union for end-of-utterance (EOU) semantic detection configuration. */
export interface EouDetection {
  model: string;
}

export function eouDetectionSerializer(item: EouDetection): any {
  return { model: item["model"] };
}

export function eouDetectionDeserializer(item: any): EouDetection {
  return {
    model: item["model"],
  };
}

/** Alias for EouDetectionUnion */
export type EouDetectionUnion =
  | AzureSemanticDetection
  | AzureSemanticDetectionEn
  | AzureSemanticDetectionMultilingual
  | EouDetection;

export function eouDetectionUnionSerializer(item: EouDetectionUnion): any {
  switch (item.model) {
    case "semantic_detection_v1":
      return azureSemanticDetectionSerializer(item as AzureSemanticDetection);

    case "semantic_detection_v1_en":
      return azureSemanticDetectionEnSerializer(item as AzureSemanticDetectionEn);

    case "semantic_detection_v1_multilingual":
      return azureSemanticDetectionMultilingualSerializer(
        item as AzureSemanticDetectionMultilingual,
      );

    default:
      return eouDetectionSerializer(item);
  }
}

export function eouDetectionUnionDeserializer(item: any): EouDetectionUnion {
  switch (item.model) {
    case "semantic_detection_v1":
      return azureSemanticDetectionDeserializer(item as AzureSemanticDetection);

    case "semantic_detection_v1_en":
      return azureSemanticDetectionEnDeserializer(item as AzureSemanticDetectionEn);

    case "semantic_detection_v1_multilingual":
      return azureSemanticDetectionMultilingualDeserializer(
        item as AzureSemanticDetectionMultilingual,
      );

    default:
      return eouDetectionDeserializer(item);
  }
}

/** Azure semantic end-of-utterance detection (default). */
export interface AzureSemanticDetection extends EouDetection {
  model: "semantic_detection_v1";
  /** Threshold level setting. Recommended instead of `threshold`. One of `low`, `medium`, `high`, or `default`. */
  thresholdLevel?: EouThresholdLevel;
  /** Timeout in milliseconds. Recommended instead of `timeout`. */
  timeoutMs?: number;
}

export function azureSemanticDetectionSerializer(item: AzureSemanticDetection): any {
  return {
    model: item["model"],
    threshold_level: item["thresholdLevel"],
    timeout_ms: item["timeoutMs"],
  };
}

export function azureSemanticDetectionDeserializer(item: any): AzureSemanticDetection {
  return {
    model: item["model"],
    thresholdLevel: item["threshold_level"],
    timeoutMs: item["timeout_ms"],
  };
}

/** Threshold level settings for Azure semantic end-of-utterance detection. */
export enum KnownEouThresholdLevel {
  /** Low sensitivity threshold level. */
  Low = "low",
  /** Medium sensitivity threshold level. */
  Medium = "medium",
  /** High sensitivity threshold level. */
  High = "high",
  /** Default sensitivity threshold level. */
  Default = "default",
}

/**
 * Threshold level settings for Azure semantic end-of-utterance detection. \
 * {@link KnownEouThresholdLevel} can be used interchangeably with EouThresholdLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **low**: Low sensitivity threshold level. \
 * **medium**: Medium sensitivity threshold level. \
 * **high**: High sensitivity threshold level. \
 * **default**: Default sensitivity threshold level.
 */
export type EouThresholdLevel = string;

/** Azure semantic end-of-utterance detection (English-optimized). */
export interface AzureSemanticDetectionEn extends EouDetection {
  model: "semantic_detection_v1_en";
  /** Threshold level setting. Recommended instead of `threshold`. One of `low`, `medium`, `high`, or `default`. */
  thresholdLevel?: EouThresholdLevel;
  /** Timeout in milliseconds. Recommended instead of `timeout`. */
  timeoutMs?: number;
}

export function azureSemanticDetectionEnSerializer(item: AzureSemanticDetectionEn): any {
  return {
    model: item["model"],
    threshold_level: item["thresholdLevel"],
    timeout_ms: item["timeoutMs"],
  };
}

export function azureSemanticDetectionEnDeserializer(item: any): AzureSemanticDetectionEn {
  return {
    model: item["model"],
    thresholdLevel: item["threshold_level"],
    timeoutMs: item["timeout_ms"],
  };
}

/** Azure semantic end-of-utterance detection (multilingual). */
export interface AzureSemanticDetectionMultilingual extends EouDetection {
  model: "semantic_detection_v1_multilingual";
  /** Threshold level setting. Recommended instead of `threshold`. One of `low`, `medium`, `high`, or `default`. */
  thresholdLevel?: EouThresholdLevel;
  /** Timeout in milliseconds. Recommended instead of `timeout`. */
  timeoutMs?: number;
}

export function azureSemanticDetectionMultilingualSerializer(
  item: AzureSemanticDetectionMultilingual,
): any {
  return {
    model: item["model"],
    threshold_level: item["thresholdLevel"],
    timeout_ms: item["timeoutMs"],
  };
}

export function azureSemanticDetectionMultilingualDeserializer(
  item: any,
): AzureSemanticDetectionMultilingual {
  return {
    model: item["model"],
    thresholdLevel: item["threshold_level"],
    timeoutMs: item["timeout_ms"],
  };
}

/** Server Speech Detection (Azure semantic VAD, default variant). */
export interface AzureSemanticVad extends TurnDetection {
  type: "azure_semantic_vad";
  threshold?: number;
  prefixPaddingMs?: number;
  silenceDurationMs?: number;
  endOfUtteranceDetection?: EouDetectionUnion;
  speechDurationMs?: number;
  removeFillerWords?: boolean;
  languages?: string[];
  autoTruncate?: boolean;
  createResponse?: boolean;
  interruptResponse?: boolean;
}

export function azureSemanticVadSerializer(item: AzureSemanticVad): any {
  return {
    type: item["type"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefixPaddingMs"],
    silence_duration_ms: item["silenceDurationMs"],
    end_of_utterance_detection: !item["endOfUtteranceDetection"]
      ? item["endOfUtteranceDetection"]
      : eouDetectionUnionSerializer(item["endOfUtteranceDetection"]),
    speech_duration_ms: item["speechDurationMs"],
    remove_filler_words: item["removeFillerWords"],
    languages: !item["languages"]
      ? item["languages"]
      : item["languages"].map((p: any) => {
          return p;
        }),
    auto_truncate: item["autoTruncate"],
    create_response: item["createResponse"],
    interrupt_response: item["interruptResponse"],
  };
}

export function azureSemanticVadDeserializer(item: any): AzureSemanticVad {
  return {
    type: item["type"],
    threshold: item["threshold"],
    prefixPaddingMs: item["prefix_padding_ms"],
    silenceDurationMs: item["silence_duration_ms"],
    endOfUtteranceDetection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : eouDetectionUnionDeserializer(item["end_of_utterance_detection"]),
    speechDurationMs: item["speech_duration_ms"],
    removeFillerWords: item["remove_filler_words"],
    languages: !item["languages"]
      ? item["languages"]
      : item["languages"].map((p: any) => {
          return p;
        }),
    autoTruncate: item["auto_truncate"],
    createResponse: item["create_response"],
    interruptResponse: item["interrupt_response"],
  };
}

/** Server Speech Detection (Azure semantic VAD, English-only). */
export interface AzureSemanticVadEn extends TurnDetection {
  type: "azure_semantic_vad_en";
  threshold?: number;
  prefixPaddingMs?: number;
  silenceDurationMs?: number;
  endOfUtteranceDetection?: EouDetectionUnion;
  speechDurationMs?: number;
  removeFillerWords?: boolean;
  autoTruncate?: boolean;
  createResponse?: boolean;
  interruptResponse?: boolean;
}

export function azureSemanticVadEnSerializer(item: AzureSemanticVadEn): any {
  return {
    type: item["type"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefixPaddingMs"],
    silence_duration_ms: item["silenceDurationMs"],
    end_of_utterance_detection: !item["endOfUtteranceDetection"]
      ? item["endOfUtteranceDetection"]
      : eouDetectionUnionSerializer(item["endOfUtteranceDetection"]),
    speech_duration_ms: item["speechDurationMs"],
    remove_filler_words: item["removeFillerWords"],
    auto_truncate: item["autoTruncate"],
    create_response: item["createResponse"],
    interrupt_response: item["interruptResponse"],
  };
}

export function azureSemanticVadEnDeserializer(item: any): AzureSemanticVadEn {
  return {
    type: item["type"],
    threshold: item["threshold"],
    prefixPaddingMs: item["prefix_padding_ms"],
    silenceDurationMs: item["silence_duration_ms"],
    endOfUtteranceDetection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : eouDetectionUnionDeserializer(item["end_of_utterance_detection"]),
    speechDurationMs: item["speech_duration_ms"],
    removeFillerWords: item["remove_filler_words"],
    autoTruncate: item["auto_truncate"],
    createResponse: item["create_response"],
    interruptResponse: item["interrupt_response"],
  };
}

/** Server Speech Detection (Azure semantic VAD). */
export interface AzureSemanticVadMultilingual extends TurnDetection {
  type: "azure_semantic_vad_multilingual";
  threshold?: number;
  prefixPaddingMs?: number;
  silenceDurationMs?: number;
  endOfUtteranceDetection?: EouDetectionUnion;
  speechDurationMs?: number;
  removeFillerWords?: boolean;
  languages?: string[];
  autoTruncate?: boolean;
  createResponse?: boolean;
  interruptResponse?: boolean;
}

export function azureSemanticVadMultilingualSerializer(item: AzureSemanticVadMultilingual): any {
  return {
    type: item["type"],
    threshold: item["threshold"],
    prefix_padding_ms: item["prefixPaddingMs"],
    silence_duration_ms: item["silenceDurationMs"],
    end_of_utterance_detection: !item["endOfUtteranceDetection"]
      ? item["endOfUtteranceDetection"]
      : eouDetectionUnionSerializer(item["endOfUtteranceDetection"]),
    speech_duration_ms: item["speechDurationMs"],
    remove_filler_words: item["removeFillerWords"],
    languages: !item["languages"]
      ? item["languages"]
      : item["languages"].map((p: any) => {
          return p;
        }),
    auto_truncate: item["autoTruncate"],
    create_response: item["createResponse"],
    interrupt_response: item["interruptResponse"],
  };
}

export function azureSemanticVadMultilingualDeserializer(item: any): AzureSemanticVadMultilingual {
  return {
    type: item["type"],
    threshold: item["threshold"],
    prefixPaddingMs: item["prefix_padding_ms"],
    silenceDurationMs: item["silence_duration_ms"],
    endOfUtteranceDetection: !item["end_of_utterance_detection"]
      ? item["end_of_utterance_detection"]
      : eouDetectionUnionDeserializer(item["end_of_utterance_detection"]),
    speechDurationMs: item["speech_duration_ms"],
    removeFillerWords: item["remove_filler_words"],
    languages: !item["languages"]
      ? item["languages"]
      : item["languages"].map((p: any) => {
          return p;
        }),
    autoTruncate: item["auto_truncate"],
    createResponse: item["create_response"],
    interruptResponse: item["interrupt_response"],
  };
}

/** Configuration for input audio noise reduction. */
export interface AudioNoiseReduction {
  /** The type of noise reduction model. */
  type: string;
}

export function audioNoiseReductionSerializer(item: AudioNoiseReduction): any {
  return { type: item["type"] };
}

export function audioNoiseReductionDeserializer(item: any): AudioNoiseReduction {
  return {
    type: item["type"],
  };
}

/** Echo cancellation configuration for server-side audio processing. */
export interface AudioEchoCancellation {
  /** The type of echo cancellation model to use. */
  type: "server_echo_cancellation";
}

export function audioEchoCancellationSerializer(item: AudioEchoCancellation): any {
  return { type: item["type"] };
}

export function audioEchoCancellationDeserializer(item: any): AudioEchoCancellation {
  return {
    type: item["type"],
  };
}

/** Configuration for avatar streaming and behavior during the session. */
export interface AvatarConfig {
  /** Optional list of ICE servers to use for WebRTC connection establishment. */
  iceServers?: IceServer[];
  /** The character name or ID used for the avatar. */
  character: string;
  /** Optional avatar style, such as emotional tone or speaking style. */
  style?: string;
  /** Indicates whether the avatar is customized or not. */
  customized: boolean;
  /** Optional video configuration including resolution, bitrate, and codec. */
  video?: VideoParams;
}

export function avatarConfigSerializer(item: AvatarConfig): any {
  return {
    ice_servers: !item["iceServers"]
      ? item["iceServers"]
      : iceServerArraySerializer(item["iceServers"]),
    character: item["character"],
    style: item["style"],
    customized: item["customized"],
    video: !item["video"] ? item["video"] : videoParamsSerializer(item["video"]),
  };
}

export function avatarConfigDeserializer(item: any): AvatarConfig {
  return {
    iceServers: !item["ice_servers"]
      ? item["ice_servers"]
      : iceServerArrayDeserializer(item["ice_servers"]),
    character: item["character"],
    style: item["style"],
    customized: item["customized"],
    video: !item["video"] ? item["video"] : videoParamsDeserializer(item["video"]),
  };
}

export function iceServerArraySerializer(result: Array<IceServer>): any[] {
  return result.map((item) => {
    return iceServerSerializer(item);
  });
}

export function iceServerArrayDeserializer(result: Array<IceServer>): any[] {
  return result.map((item) => {
    return iceServerDeserializer(item);
  });
}

/** ICE server configuration for WebRTC connection negotiation. */
export interface IceServer {
  /** List of ICE server URLs (e.g., TURN or STUN endpoints). */
  urls: string[];
  /** Optional username used for authentication with the ICE server. */
  username?: string;
  /** Optional credential (e.g., password or token) used for authentication. */
  credential?: string;
}

export function iceServerSerializer(item: IceServer): any {
  return {
    urls: item["urls"].map((p: any) => {
      return p;
    }),
    username: item["username"],
    credential: item["credential"],
  };
}

export function iceServerDeserializer(item: any): IceServer {
  return {
    urls: item["urls"].map((p: any) => {
      return p;
    }),
    username: item["username"],
    credential: item["credential"],
  };
}

/** Video streaming parameters for avatar. */
export interface VideoParams {
  /** Bitrate in bits per second (e.g., 2000000 for 2 Mbps). */
  bitrate?: number;
  /** Codec to use for encoding. Currently only 'h264' is supported. */
  codec?: "h264";
  /** Optional cropping settings for the video stream. */
  crop?: VideoCrop;
  /** Optional resolution settings for the video stream. */
  resolution?: VideoResolution;
  /** Optional background settings for the video. Allows specifying either a solid color or an image URL. */
  background?: Background;
  /** Group of Pictures (GOP) size for video encoding. Controls the interval between keyframes, affecting compression efficiency and seeking performance. */
  gopSize?: number;
}

export function videoParamsSerializer(item: VideoParams): any {
  return {
    bitrate: item["bitrate"],
    codec: item["codec"],
    crop: !item["crop"] ? item["crop"] : videoCropSerializer(item["crop"]),
    resolution: !item["resolution"]
      ? item["resolution"]
      : videoResolutionSerializer(item["resolution"]),
    background: !item["background"] ? item["background"] : backgroundSerializer(item["background"]),
    gop_size: item["gopSize"],
  };
}

export function videoParamsDeserializer(item: any): VideoParams {
  return {
    bitrate: item["bitrate"],
    codec: item["codec"],
    crop: !item["crop"] ? item["crop"] : videoCropDeserializer(item["crop"]),
    resolution: !item["resolution"]
      ? item["resolution"]
      : videoResolutionDeserializer(item["resolution"]),
    background: !item["background"]
      ? item["background"]
      : backgroundDeserializer(item["background"]),
    gopSize: item["gop_size"],
  };
}

/** Defines a video crop rectangle using top-left and bottom-right coordinates. */
export interface VideoCrop {
  /** Top-left corner of the crop region. Array of [x, y], must be non-negative integers. */
  topLeft: number[];
  /** Bottom-right corner of the crop region. Array of [x, y], must be non-negative integers. */
  bottomRight: number[];
}

export function videoCropSerializer(item: VideoCrop): any {
  return {
    top_left: item["topLeft"].map((p: any) => {
      return p;
    }),
    bottom_right: item["bottomRight"].map((p: any) => {
      return p;
    }),
  };
}

export function videoCropDeserializer(item: any): VideoCrop {
  return {
    topLeft: item["top_left"].map((p: any) => {
      return p;
    }),
    bottomRight: item["bottom_right"].map((p: any) => {
      return p;
    }),
  };
}

/** Resolution of the video feed in pixels. */
export interface VideoResolution {
  /** Width of the video in pixels. Must be greater than 0. */
  width: number;
  /** Height of the video in pixels. Must be greater than 0. */
  height: number;
}

export function videoResolutionSerializer(item: VideoResolution): any {
  return { width: item["width"], height: item["height"] };
}

export function videoResolutionDeserializer(item: any): VideoResolution {
  return {
    width: item["width"],
    height: item["height"],
  };
}

/** Defines a video background, either a solid color or an image URL (mutually exclusive). */
export interface Background {
  /** Background color in hex format (e.g., `#00FF00FF`). Cannot be set if `image_url` is provided. */
  color?: string;
  /** Background image URL. Cannot be set if `color` is provided. */
  imageUrl?: string;
}

export function backgroundSerializer(item: Background): any {
  return { color: item["color"], image_url: item["imageUrl"] };
}

export function backgroundDeserializer(item: any): Background {
  return {
    color: item["color"],
    imageUrl: item["image_url"],
  };
}

/** Configuration for input audio transcription. */
export interface AudioInputTranscriptionOptions {
  /**
   * The transcription model to use. Supported values:
   * 'whisper-1', 'gpt-4o-transcribe', 'gpt-4o-mini-transcribe',
   * 'azure-speech'.
   */
  model: string;
  /** Optional language code in BCP-47 (e.g., 'en-US'), or ISO-639-1 (e.g., 'en'), or multi languages with auto detection, (e.g., 'en,zh'). */
  language?: string;
  /** Optional configuration for custom speech models. */
  customSpeech?: Record<string, string>;
  /** Optional list of phrase hints to bias recognition. */
  phraseList?: string[];
}

export function audioInputTranscriptionOptionsSerializer(
  item: AudioInputTranscriptionOptions,
): any {
  return {
    model: item["model"],
    language: item["language"],
    custom_speech: item["customSpeech"],
    phrase_list: !item["phraseList"]
      ? item["phraseList"]
      : item["phraseList"].map((p: any) => {
          return p;
        }),
  };
}

export function audioInputTranscriptionOptionsDeserializer(
  item: any,
): AudioInputTranscriptionOptions {
  return {
    model: item["model"],
    language: item["language"],
    customSpeech: item["custom_speech"],
    phraseList: !item["phrase_list"]
      ? item["phrase_list"]
      : item["phrase_list"].map((p: any) => {
          return p;
        }),
  };
}

/** Output timestamp types supported in audio response content. */
export enum KnownAudioTimestampType {
  /** Timestamps per word in the output audio. */
  Word = "word",
}

/**
 * Output timestamp types supported in audio response content. \
 * {@link KnownAudioTimestampType} can be used interchangeably with AudioTimestampType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **word**: Timestamps per word in the output audio.
 */
export type AudioTimestampType = string;

export function toolUnionArraySerializer(result: Array<ToolUnion>): any[] {
  return result.map((item) => {
    return toolUnionSerializer(item);
  });
}

export function toolUnionArrayDeserializer(result: Array<ToolUnion>): any[] {
  return result.map((item) => {
    return toolUnionDeserializer(item);
  });
}

/** The base representation of a voicelive tool definition. */
export interface Tool {
  type: ToolType;
}

export function toolSerializer(item: Tool): any {
  return { type: item["type"] };
}

export function toolDeserializer(item: any): Tool {
  return {
    type: item["type"],
  };
}

/** Alias for ToolUnion */
export type ToolUnion = FunctionTool | Tool;

export function toolUnionSerializer(item: ToolUnion): any {
  switch (item.type) {
    case "function":
      return functionToolSerializer(item as FunctionTool);

    default:
      return toolSerializer(item);
  }
}

export function toolUnionDeserializer(item: any): ToolUnion {
  switch (item.type) {
    case "function":
      return functionToolDeserializer(item as FunctionTool);

    default:
      return toolDeserializer(item);
  }
}

/**
 * The supported tool type discriminators for voicelive tools.
 * Currently, only 'function' tools are supported.
 */
export enum KnownToolType {
  /** function */
  Function = "function",
}

/**
 * The supported tool type discriminators for voicelive tools.
 * Currently, only 'function' tools are supported. \
 * {@link KnownToolType} can be used interchangeably with ToolType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **function**
 */
export type ToolType = string;

/** The definition of a function tool as used by the voicelive endpoint. */
export interface FunctionTool extends Tool {
  type: "function";
  name: string;
  description?: string;
  parameters?: any;
}

export function functionToolSerializer(item: FunctionTool): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    parameters: item["parameters"],
  };
}

export function functionToolDeserializer(item: any): FunctionTool {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    parameters: item["parameters"],
  };
}

/**
 * The combined set of available representations for a voicelive tool_choice parameter, encompassing both string
 * literal options like 'auto' as well as structured references to defined tools.
 */
export type ToolChoice = ToolChoiceLiteral | ToolChoiceObjectUnion;

export function toolChoiceSerializer(item: ToolChoice): any {
  return item;
}

export function toolChoiceDeserializer(item: any): ToolChoice {
  return item;
}

/** The available set of mode-level, string literal tool_choice options for the voicelive endpoint. */
export enum KnownToolChoiceLiteral {
  /** Specifies that the model should freely determine which tool or tools, if any, to call. */
  Auto = "auto",
  /** Specifies that the model should call no tools whatsoever. */
  None = "none",
  /** Specifies that the model should call at least one tool. */
  Required = "required",
}

/**
 * The available set of mode-level, string literal tool_choice options for the voicelive endpoint. \
 * {@link KnownToolChoiceLiteral} can be used interchangeably with ToolChoiceLiteral,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **auto**: Specifies that the model should freely determine which tool or tools, if any, to call. \
 * **none**: Specifies that the model should call no tools whatsoever. \
 * **required**: Specifies that the model should call at least one tool.
 */
export type ToolChoiceLiteral = string;

/** A base representation for a voicelive tool_choice selecting a named tool. */
export interface ToolChoiceObject {
  type: ToolType;
}

export function toolChoiceObjectSerializer(item: ToolChoiceObject): any {
  return { type: item["type"] };
}

export function toolChoiceObjectDeserializer(item: any): ToolChoiceObject {
  return {
    type: item["type"],
  };
}

/** Alias for ToolChoiceObjectUnion */
export type ToolChoiceObjectUnion = ToolChoiceFunctionObject | ToolChoiceObject;

export function toolChoiceObjectUnionSerializer(item: ToolChoiceObjectUnion): any {
  switch (item.type) {
    case "function":
      return toolChoiceFunctionObjectSerializer(item as ToolChoiceFunctionObject);

    default:
      return toolChoiceObjectSerializer(item);
  }
}

export function toolChoiceObjectUnionDeserializer(item: any): ToolChoiceObjectUnion {
  switch (item.type) {
    case "function":
      return toolChoiceFunctionObjectDeserializer(item as ToolChoiceFunctionObject);

    default:
      return toolChoiceObjectDeserializer(item);
  }
}

/** The representation of a voicelive tool_choice selecting a named function tool. */
export interface ToolChoiceFunctionObject extends ToolChoiceObject {
  type: "function";
  name: string;
}

export function toolChoiceFunctionObjectSerializer(item: ToolChoiceFunctionObject): any {
  return { type: item["type"], name: item["name"] };
}

export function toolChoiceFunctionObjectDeserializer(item: any): ToolChoiceFunctionObject {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** Alias for _RequestSessionMaxResponseOutputTokens */
export type _RequestSessionMaxResponseOutputTokens = number | "inf";

export function _requestSessionMaxResponseOutputTokensSerializer(
  item: _RequestSessionMaxResponseOutputTokens,
): any {
  return item;
}

export function _requestSessionMaxResponseOutputTokensDeserializer(
  item: any,
): _RequestSessionMaxResponseOutputTokens {
  return item;
}

/**
 * Sent when the client connects and provides its SDP (Session Description Protocol)
 *
 * for avatar-related media negotiation.
 */
export interface ClientEventSessionAvatarConnect extends ClientEvent {
  /** The event type, must be 'session.avatar.connect'. */
  type: "session.avatar.connect";
  /** The client's SDP offer. */
  clientSdp: string;
}

export function clientEventSessionAvatarConnectSerializer(
  item: ClientEventSessionAvatarConnect,
): any {
  return {
    type: item["type"],
    event_id: item["eventId"],
    client_sdp: item["clientSdp"],
  };
}

/** Indicates the start of a new audio input turn. */
export interface ClientEventInputAudioTurnStart extends ClientEvent {
  /** The event type, must be 'input_audio.turn.start'. */
  type: "input_audio.turn.start";
  /** Unique identifier for the input audio turn. */
  turnId: string;
}

export function clientEventInputAudioTurnStartSerializer(
  item: ClientEventInputAudioTurnStart,
): any {
  return {
    type: item["type"],
    event_id: item["eventId"],
    turn_id: item["turnId"],
  };
}

/** Appends audio data to an ongoing input turn. */
export interface ClientEventInputAudioTurnAppend extends ClientEvent {
  /** The event type, must be 'input_audio.turn.append'. */
  type: "input_audio.turn.append";
  /** The ID of the turn this audio is part of. */
  turnId: string;
  /** Base64-encoded audio chunk. */
  audio: string;
}

export function clientEventInputAudioTurnAppendSerializer(
  item: ClientEventInputAudioTurnAppend,
): any {
  return {
    type: item["type"],
    event_id: item["eventId"],
    turn_id: item["turnId"],
    audio: item["audio"],
  };
}

/** Marks the end of an audio input turn. */
export interface ClientEventInputAudioTurnEnd extends ClientEvent {
  /** The event type, must be 'input_audio.turn.end'. */
  type: "input_audio.turn.end";
  /** The ID of the audio turn being ended. */
  turnId: string;
}

export function clientEventInputAudioTurnEndSerializer(item: ClientEventInputAudioTurnEnd): any {
  return {
    type: item["type"],
    event_id: item["eventId"],
    turn_id: item["turnId"],
  };
}

/** Cancels an in-progress input audio turn. */
export interface ClientEventInputAudioTurnCancel extends ClientEvent {
  /** The event type, must be 'input_audio.turn.cancel'. */
  type: "input_audio.turn.cancel";
  /** The ID of the turn to cancel. */
  turnId: string;
}

export function clientEventInputAudioTurnCancelSerializer(
  item: ClientEventInputAudioTurnCancel,
): any {
  return {
    type: item["type"],
    event_id: item["eventId"],
    turn_id: item["turnId"],
  };
}

/** Clears all input audio currently being streamed. */
export interface ClientEventInputAudioClear extends ClientEvent {
  /** The event type, must be 'input_audio.clear'. */
  type: "input_audio.clear";
}

export function clientEventInputAudioClearSerializer(item: ClientEventInputAudioClear): any {
  return { type: item["type"], event_id: item["eventId"] };
}

/**
 * Send this event to append audio bytes to the input audio buffer. The audio
 * buffer is temporary storage you can write to and later commit. In Server VAD
 * mode, the audio buffer is used to detect speech and the server will decide
 * when to commit. When Server VAD is disabled, you must commit the audio buffer
 * manually.
 *
 * The client may choose how much audio to place in each event up to a maximum
 * of 15 MiB, for example streaming smaller chunks from the client may allow the
 * VAD to be more responsive. Unlike made other client events, the server will
 * not send a confirmation response to this event.
 */
export interface ClientEventInputAudioBufferAppend extends ClientEvent {
  /** The event type, must be `input_audio_buffer.append`. */
  type: "input_audio_buffer.append";
  /**
   * Base64-encoded audio. This must be in the format specified by the
   * `input_audio_format` field in the session configuration.
   */
  audio: string;
}

export function clientEventInputAudioBufferAppendSerializer(
  item: ClientEventInputAudioBufferAppend,
): any {
  return {
    type: item["type"],
    event_id: item["eventId"],
    audio: item["audio"],
  };
}

/**
 * Send this event to commit the user input audio buffer, which will create a
 * new user message item in the conversation. This event will produce an error
 * if the input audio buffer is empty. When in Server VAD mode, the client does
 * not need to send this event, the server will commit the audio buffer
 * automatically.
 * Committing the input audio buffer will trigger input audio transcription
 * (if enabled in session configuration), but it will not create a response
 * from the model. The server will respond with an `input_audio_buffer.committed`
 * event.
 */
export interface ClientEventInputAudioBufferCommit extends ClientEvent {
  /** The event type, must be `input_audio_buffer.commit`. */
  type: "input_audio_buffer.commit";
}

export function clientEventInputAudioBufferCommitSerializer(
  item: ClientEventInputAudioBufferCommit,
): any {
  return { type: item["type"], event_id: item["eventId"] };
}

/**
 * Send this event to clear the audio bytes in the buffer. The server will
 * respond with an `input_audio_buffer.cleared` event.
 */
export interface ClientEventInputAudioBufferClear extends ClientEvent {
  /** The event type, must be `input_audio_buffer.clear`. */
  type: "input_audio_buffer.clear";
}

export function clientEventInputAudioBufferClearSerializer(
  item: ClientEventInputAudioBufferClear,
): any {
  return { type: item["type"], event_id: item["eventId"] };
}

/**
 * Add a new Item to the Conversation's context, including messages, function
 * calls, and function call responses. This event can be used both to populate a
 * "history" of the conversation and to add new items mid-stream, but has the
 * current limitation that it cannot populate assistant audio messages.
 * If successful, the server will respond with a `conversation.item.created`
 * event, otherwise an `error` event will be sent.
 */
export interface ClientEventConversationItemCreate extends ClientEvent {
  /** The event type, must be `conversation.item.create`. */
  type: "conversation.item.create";
  /** Optional client-generated ID used to identify this event. */
  eventId?: string;
  /**
   * The ID of the preceding item after which the new item will be inserted.
   * If not set, the new item will be appended to the end of the conversation.
   * If set to `root`, the new item will be added to the beginning of the conversation.
   * If set to an existing ID, it allows an item to be inserted mid-conversation. If the
   * ID cannot be found, an error will be returned and the item will not be added.
   */
  previousItemId?: string;
  item?: ConversationRequestItemUnion;
}

export function clientEventConversationItemCreateSerializer(
  item: ClientEventConversationItemCreate,
): any {
  return {
    type: item["type"],
    event_id: item["eventId"],
    previous_item_id: item["previousItemId"],
    item: !item["item"] ? item["item"] : conversationRequestItemUnionSerializer(item["item"]),
  };
}

/** Base for any response item; discriminated by `type`. */
export interface ConversationRequestItem {
  type: ItemType;
  id?: string;
}

export function conversationRequestItemSerializer(item: ConversationRequestItem): any {
  return { type: item["type"], id: item["id"] };
}

export function conversationRequestItemDeserializer(item: any): ConversationRequestItem {
  return {
    type: item["type"],
    id: item["id"],
  };
}

/** Alias for ConversationRequestItemUnion */
export type ConversationRequestItemUnion =
  | MessageItemUnion
  | FunctionCallItem
  | FunctionCallOutputItem
  | ConversationRequestItem;

export function conversationRequestItemUnionSerializer(item: ConversationRequestItemUnion): any {
  switch (item.type) {
    case "message":
      return messageItemUnionSerializer(item as MessageItemUnion);

    case "function_call":
      return functionCallItemSerializer(item as FunctionCallItem);

    case "function_call_output":
      return functionCallOutputItemSerializer(item as FunctionCallOutputItem);

    default:
      return conversationRequestItemSerializer(item);
  }
}

export function conversationRequestItemUnionDeserializer(item: any): ConversationRequestItemUnion {
  switch (item.type) {
    case "message":
      return messageItemUnionDeserializer(item as MessageItemUnion);

    case "function_call":
      return functionCallItemDeserializer(item as FunctionCallItem);

    case "function_call_output":
      return functionCallOutputItemDeserializer(item as FunctionCallOutputItem);

    default:
      return conversationRequestItemDeserializer(item);
  }
}

/** Known values of {@link ItemType} that the service accepts. */
export enum KnownItemType {
  /** message */
  Message = "message",
  /** function_call */
  FunctionCall = "function_call",
  /** function_call_output */
  FunctionCallOutput = "function_call_output",
}

/** Type of ItemType */
export type ItemType = string;

/** A message item within a conversation. */
export interface MessageItem extends ConversationRequestItem {
  /** The type of the item; must be 'message' for message items. */
  type: "message";
  /** The role of the message origionator. */
  /** The discriminator possible values: system, user, assistant */
  role: MessageRole;
  /** The content parts of the message. */
  content: MessageContentPartUnion[];
  /** Processing status of the message item. */
  status?: ItemParamStatus;
}

export function messageItemSerializer(item: MessageItem): any {
  return {
    type: item["type"],
    id: item["id"],
    role: item["role"],
    content: messageContentPartUnionArraySerializer(item["content"]),
    status: item["status"],
  };
}

export function messageItemDeserializer(item: any): MessageItem {
  return {
    type: item["type"],
    id: item["id"],
    role: item["role"],
    content: messageContentPartUnionArrayDeserializer(item["content"]),
    status: item["status"],
  };
}

/** Alias for MessageItemUnion */
export type MessageItemUnion =
  | SystemMessageItem
  | UserMessageItem
  | AssistantMessageItem
  | MessageItem;

export function messageItemUnionSerializer(item: MessageItemUnion): any {
  switch (item.role) {
    case "system":
      return systemMessageItemSerializer(item as SystemMessageItem);

    case "user":
      return userMessageItemSerializer(item as UserMessageItem);

    case "assistant":
      return assistantMessageItemSerializer(item as AssistantMessageItem);

    default:
      return messageItemSerializer(item);
  }
}

export function messageItemUnionDeserializer(item: any): MessageItemUnion {
  switch (item.role) {
    case "system":
      return systemMessageItemDeserializer(item as SystemMessageItem);

    case "user":
      return userMessageItemDeserializer(item as UserMessageItem);

    case "assistant":
      return assistantMessageItemDeserializer(item as AssistantMessageItem);

    default:
      return messageItemDeserializer(item);
  }
}

/** Known values of {@link MessageRole} that the service accepts. */
export enum KnownMessageRole {
  /** system */
  System = "system",
  /** user */
  User = "user",
  /** assistant */
  Assistant = "assistant",
}

/** Type of MessageRole */
export type MessageRole = string;

export function messageContentPartUnionArraySerializer(
  result: Array<MessageContentPartUnion>,
): any[] {
  return result.map((item) => {
    return messageContentPartUnionSerializer(item);
  });
}

export function messageContentPartUnionArrayDeserializer(
  result: Array<MessageContentPartUnion>,
): any[] {
  return result.map((item) => {
    return messageContentPartUnionDeserializer(item);
  });
}

/** Base for any message content part; discriminated by `type`. */
export interface MessageContentPart {
  /** The type of the content part. */
  /** The discriminator possible values: input_text, input_audio, text */
  type: ContentPartType;
}

export function messageContentPartSerializer(item: MessageContentPart): any {
  return { type: item["type"] };
}

export function messageContentPartDeserializer(item: any): MessageContentPart {
  return {
    type: item["type"],
  };
}

/** Alias for MessageContentPartUnion */
export type MessageContentPartUnion =
  | InputTextContentPart
  | InputAudioContentPart
  | OutputTextContentPart
  | MessageContentPart;

export function messageContentPartUnionSerializer(item: MessageContentPartUnion): any {
  switch (item.type) {
    case "input_text":
      return inputTextContentPartSerializer(item as InputTextContentPart);

    case "input_audio":
      return inputAudioContentPartSerializer(item as InputAudioContentPart);

    case "text":
      return outputTextContentPartSerializer(item as OutputTextContentPart);

    default:
      return messageContentPartSerializer(item);
  }
}

export function messageContentPartUnionDeserializer(item: any): MessageContentPartUnion {
  switch (item.type) {
    case "input_text":
      return inputTextContentPartDeserializer(item as InputTextContentPart);

    case "input_audio":
      return inputAudioContentPartDeserializer(item as InputAudioContentPart);

    case "text":
      return outputTextContentPartDeserializer(item as OutputTextContentPart);

    default:
      return messageContentPartDeserializer(item);
  }
}

/** Known values of {@link ContentPartType} that the service accepts. */
export enum KnownContentPartType {
  /** input_text */
  InputText = "input_text",
  /** input_audio */
  InputAudio = "input_audio",
  /** text */
  Text = "text",
  /** audio */
  Audio = "audio",
}

/** Type of ContentPartType */
export type ContentPartType = string;

/** Input text content part. */
export interface InputTextContentPart extends MessageContentPart {
  type: "input_text";
  text: string;
}

export function inputTextContentPartSerializer(item: InputTextContentPart): any {
  return { type: item["type"], text: item["text"] };
}

export function inputTextContentPartDeserializer(item: any): InputTextContentPart {
  return {
    type: item["type"],
    text: item["text"],
  };
}

/** Input audio content part. */
export interface InputAudioContentPart extends MessageContentPart {
  type: "input_audio";
  audio: string;
  transcript?: string;
}

export function inputAudioContentPartSerializer(item: InputAudioContentPart): any {
  return {
    type: item["type"],
    audio: item["audio"],
    transcript: item["transcript"],
  };
}

export function inputAudioContentPartDeserializer(item: any): InputAudioContentPart {
  return {
    type: item["type"],
    audio: item["audio"],
    transcript: item["transcript"],
  };
}

/** Output text content part. */
export interface OutputTextContentPart extends MessageContentPart {
  /** The type of the content part. */
  type: "text";
  /** The text content. */
  text: string;
}

export function outputTextContentPartSerializer(item: OutputTextContentPart): any {
  return { type: item["type"], text: item["text"] };
}

export function outputTextContentPartDeserializer(item: any): OutputTextContentPart {
  return {
    type: item["type"],
    text: item["text"],
  };
}

/** Indicates the processing status of an item or parameter. */
export enum KnownItemParamStatus {
  /** Item or parameter is still being processed. */
  Completed = "completed",
  /** Item or parameter is not yet complete. */
  Incomplete = "incomplete",
}

/**
 * Indicates the processing status of an item or parameter. \
 * {@link KnownItemParamStatus} can be used interchangeably with ItemParamStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **completed**: Item or parameter is still being processed. \
 * **incomplete**: Item or parameter is not yet complete.
 */
export type ItemParamStatus = string;

/** A system message item within a conversation. */
export interface SystemMessageItem extends MessageItem {
  role: "system";
}

export function systemMessageItemSerializer(item: SystemMessageItem): any {
  return {
    type: item["type"],
    role: item["role"],
    content: messageContentPartUnionArraySerializer(item["content"]),
    status: item["status"],
    id: item["id"],
  };
}

export function systemMessageItemDeserializer(item: any): SystemMessageItem {
  return {
    type: item["type"],
    role: item["role"],
    content: messageContentPartUnionArrayDeserializer(item["content"]),
    status: item["status"],
    id: item["id"],
  };
}

/** A user message item within a conversation. */
export interface UserMessageItem extends MessageItem {
  role: "user";
}

export function userMessageItemSerializer(item: UserMessageItem): any {
  return {
    type: item["type"],
    role: item["role"],
    content: messageContentPartUnionArraySerializer(item["content"]),
    status: item["status"],
    id: item["id"],
  };
}

export function userMessageItemDeserializer(item: any): UserMessageItem {
  return {
    type: item["type"],
    role: item["role"],
    content: messageContentPartUnionArrayDeserializer(item["content"]),
    status: item["status"],
    id: item["id"],
  };
}

/** An assistant message item within a conversation. */
export interface AssistantMessageItem extends MessageItem {
  role: "assistant";
}

export function assistantMessageItemSerializer(item: AssistantMessageItem): any {
  return {
    type: item["type"],
    role: item["role"],
    content: messageContentPartUnionArraySerializer(item["content"]),
    status: item["status"],
    id: item["id"],
  };
}

export function assistantMessageItemDeserializer(item: any): AssistantMessageItem {
  return {
    type: item["type"],
    role: item["role"],
    content: messageContentPartUnionArrayDeserializer(item["content"]),
    status: item["status"],
    id: item["id"],
  };
}

/** A function call item within a conversation. */
export interface FunctionCallItem extends ConversationRequestItem {
  type: "function_call";
  name: string;
  callId: string;
  arguments: string;
  status?: ItemParamStatus;
}

export function functionCallItemSerializer(item: FunctionCallItem): any {
  return {
    type: item["type"],
    id: item["id"],
    name: item["name"],
    call_id: item["callId"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

export function functionCallItemDeserializer(item: any): FunctionCallItem {
  return {
    type: item["type"],
    id: item["id"],
    name: item["name"],
    callId: item["call_id"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

/** A function call output item within a conversation. */
export interface FunctionCallOutputItem extends ConversationRequestItem {
  type: "function_call_output";
  callId: string;
  output: string;
  status?: ItemParamStatus;
}

export function functionCallOutputItemSerializer(item: FunctionCallOutputItem): any {
  return {
    type: item["type"],
    id: item["id"],
    call_id: item["callId"],
    output: item["output"],
    status: item["status"],
  };
}

export function functionCallOutputItemDeserializer(item: any): FunctionCallOutputItem {
  return {
    type: item["type"],
    id: item["id"],
    callId: item["call_id"],
    output: item["output"],
    status: item["status"],
  };
}

/**
 * Send this event to truncate a previous assistant message’s audio. The server
 * will produce audio faster than voicelive, so this event is useful when the user
 * interrupts to truncate audio that has already been sent to the client but not
 * yet played. This will synchronize the server's understanding of the audio with
 * the client's playback.
 * Truncating audio will delete the server-side text transcript to ensure there
 * is not text in the context that hasn't been heard by the user.
 * If successful, the server will respond with a `conversation.item.truncated`
 * event.
 */
export interface ClientEventConversationItemTruncate extends ClientEvent {
  /** The event type, must be `conversation.item.truncate`. */
  type: "conversation.item.truncate";
  /**
   * The ID of the assistant message item to truncate. Only assistant message
   * items can be truncated.
   */
  itemId: string;
  /** The index of the content part to truncate. Set this to 0. */
  contentIndex: number;
  /**
   * Inclusive duration up to which audio is truncated, in milliseconds. If
   * the audio_end_ms is greater than the actual audio duration, the server
   * will respond with an error.
   */
  audioEndMs: number;
}

export function clientEventConversationItemTruncateSerializer(
  item: ClientEventConversationItemTruncate,
): any {
  return {
    type: item["type"],
    event_id: item["eventId"],
    item_id: item["itemId"],
    content_index: item["contentIndex"],
    audio_end_ms: item["audioEndMs"],
  };
}

/**
 * Send this event when you want to remove any item from the conversation
 * history. The server will respond with a `conversation.item.deleted` event,
 * unless the item does not exist in the conversation history, in which case the
 * server will respond with an error.
 */
export interface ClientEventConversationItemDelete extends ClientEvent {
  /** The event type, must be `conversation.item.delete`. */
  type: "conversation.item.delete";
  /** The ID of the item to delete. */
  itemId: string;
}

export function clientEventConversationItemDeleteSerializer(
  item: ClientEventConversationItemDelete,
): any {
  return {
    type: item["type"],
    event_id: item["eventId"],
    item_id: item["itemId"],
  };
}

/**
 * This event instructs the server to create a Response, which means triggering
 * model inference. When in Server VAD mode, the server will create Responses
 * automatically.
 * A Response will include at least one Item, and may have two, in which case
 * the second will be a function call. These Items will be appended to the
 * conversation history.
 * The server will respond with a `response.created` event, events for Items
 * and content created, and finally a `response.done` event to indicate the
 * Response is complete.
 * The `response.create` event includes inference configuration like
 * `instructions`, and `temperature`. These fields will override the Session's
 * configuration for this Response only.
 */
export interface ClientEventResponseCreate extends ClientEvent {
  /** The event type, must be `response.create`. */
  type: "response.create";
  response?: ResponseCreateParams;
  /** additional instructions (system prompt) appended to the default instructions of the session. Only affects this response only. */
  additionalInstructions?: string;
}

export function clientEventResponseCreateSerializer(item: ClientEventResponseCreate): any {
  return {
    type: item["type"],
    event_id: item["eventId"],
    response: !item["response"]
      ? item["response"]
      : responseCreateParamsSerializer(item["response"]),
    additional_instructions: item["additionalInstructions"],
  };
}

/** Create a new VoiceLive response with these parameters */
export interface ResponseCreateParams {
  /** Whether to commit the response to the conversation. Defaults to true. */
  commit?: boolean;
  /** Whether to cancel any ongoing generation before starting this one. Defaults to true. */
  cancelPrevious?: boolean;
  /** Input items to append to the conversation context before generating a response. */
  appendInputItems?: ConversationRequestItemUnion[];
  /**
   * Input items to be used as the context for this response.
   * An empty array clears previous context.
   */
  inputItems?: ConversationRequestItemUnion[];
  /**
   * The set of modalities the model can respond with. To disable audio,
   * set this to ["text"].
   */
  modalities?: Modality[];
  /**
   * The default system instructions (i.e. system message) prepended to model
   * calls. This field allows the client to guide the model on desired
   * responses. The model can be instructed on response content and format,
   * (e.g. "be extremely succinct", "act friendly", "here are examples of good
   * responses") and on audio behavior (e.g. "talk quickly", "inject emotion
   * into your voice", "laugh frequently"). The instructions are not guaranteed
   * to be followed by the model, but they provide guidance to the model on the
   * desired behavior.
   *
   * Note that the server sets default instructions which will be used if this
   * field is not set and are visible in the `session.created` event at the
   * start of the session.
   */
  instructions?: string;
  /** supported voice identifiers and configurations. */
  voice?: Voice;
  /** The format of output audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`. */
  outputAudioFormat?: OutputAudioFormat;
  /** Tools (functions) available to the model. */
  tools?: ToolUnion[];
  /**
   * How the model chooses tools. Options are `auto`, `none`, `required`, or
   * specify a function, like `{"type": "function", "function": {"name": "my_function"}}`.
   */
  toolChoice?: string;
  /** Sampling temperature for the model, limited to [0.6, 1.2]. Defaults to 0.8. */
  temperature?: number;
  /**
   * Maximum number of output tokens for a single assistant response,
   * inclusive of tool calls. Provide an integer between 1 and 4096 to
   * limit output tokens, or `inf` for the maximum available tokens for a
   * given model. Defaults to `inf`.
   */
  maxOutputTokens?: number | "inf";
}

export function responseCreateParamsSerializer(item: ResponseCreateParams): any {
  return {
    commit: item["commit"],
    cancel_previous: item["cancelPrevious"],
    append_input_items: !item["appendInputItems"]
      ? item["appendInputItems"]
      : conversationRequestItemUnionArraySerializer(item["appendInputItems"]),
    input_items: !item["inputItems"]
      ? item["inputItems"]
      : conversationRequestItemUnionArraySerializer(item["inputItems"]),
    modalities: !item["modalities"]
      ? item["modalities"]
      : item["modalities"].map((p: any) => {
          return p;
        }),
    instructions: item["instructions"],
    voice: !item["voice"] ? item["voice"] : voiceSerializer(item["voice"]),
    output_audio_format: item["outputAudioFormat"],
    tools: !item["tools"] ? item["tools"] : toolUnionArraySerializer(item["tools"]),
    tool_choice: item["toolChoice"],
    temperature: item["temperature"],
    max_output_tokens: !item["maxOutputTokens"]
      ? item["maxOutputTokens"]
      : _responseCreateParamsMaxOutputTokensSerializer(item["maxOutputTokens"]),
  };
}

export function responseCreateParamsDeserializer(item: any): ResponseCreateParams {
  return {
    commit: item["commit"],
    cancelPrevious: item["cancel_previous"],
    appendInputItems: !item["append_input_items"]
      ? item["append_input_items"]
      : conversationRequestItemUnionArrayDeserializer(item["append_input_items"]),
    inputItems: !item["input_items"]
      ? item["input_items"]
      : conversationRequestItemUnionArrayDeserializer(item["input_items"]),
    modalities: !item["modalities"]
      ? item["modalities"]
      : item["modalities"].map((p: any) => {
          return p;
        }),
    instructions: item["instructions"],
    voice: !item["voice"] ? item["voice"] : voiceDeserializer(item["voice"]),
    outputAudioFormat: item["output_audio_format"],
    tools: !item["tools"] ? item["tools"] : toolUnionArrayDeserializer(item["tools"]),
    toolChoice: item["tool_choice"],
    temperature: item["temperature"],
    maxOutputTokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : _responseCreateParamsMaxOutputTokensDeserializer(item["max_output_tokens"]),
  };
}

export function conversationRequestItemUnionArraySerializer(
  result: Array<ConversationRequestItemUnion>,
): any[] {
  return result.map((item) => {
    return conversationRequestItemUnionSerializer(item);
  });
}

export function conversationRequestItemUnionArrayDeserializer(
  result: Array<ConversationRequestItemUnion>,
): any[] {
  return result.map((item) => {
    return conversationRequestItemUnionDeserializer(item);
  });
}

/** Alias for _ResponseCreateParamsMaxOutputTokens */
export type _ResponseCreateParamsMaxOutputTokens = number | "inf";

export function _responseCreateParamsMaxOutputTokensSerializer(
  item: _ResponseCreateParamsMaxOutputTokens,
): any {
  return item;
}

export function _responseCreateParamsMaxOutputTokensDeserializer(
  item: any,
): _ResponseCreateParamsMaxOutputTokens {
  return item;
}

/**
 * Send this event to cancel an in-progress response. The server will respond
 * with a `response.cancelled` event or an error if there is no response to
 * cancel.
 */
export interface ClientEventResponseCancel extends ClientEvent {
  /** The event type, must be `response.cancel`. */
  type: "response.cancel";
  /**
   * A specific response ID to cancel - if not provided, will cancel an
   * in-progress response in the default conversation.
   */
  responseId?: string;
}

export function clientEventResponseCancelSerializer(item: ClientEventResponseCancel): any {
  return {
    type: item["type"],
    event_id: item["eventId"],
    response_id: item["responseId"],
  };
}

/**
 * Send this event when you want to retrieve the server's representation of a specific item in the conversation history. This is useful, for example, to inspect user audio after noise cancellation and VAD.
 * The server will respond with a `conversation.item.retrieved` event,
 * unless the item does not exist in the conversation history, in which case the
 * server will respond with an error.
 */
export interface ClientEventConversationItemRetrieve extends ClientEvent {
  /** The event type, must be `conversation.item.retrieve`. */
  type: "conversation.item.retrieve";
  /** The ID of the item to retrieve. */
  itemId: string;
}

export function clientEventConversationItemRetrieveSerializer(
  item: ClientEventConversationItemRetrieve,
): any {
  return {
    type: item["type"],
    event_id: item["eventId"],
    item_id: item["itemId"],
  };
}

/** VoiceLive session object configuration. */
export interface SessionBase {}

export function sessionBaseDeserializer(item: any): SessionBase {
  return item;
}

/** The item to add to the conversation. */
export interface ConversationItemBase {}

export function conversationItemBaseSerializer(item: ConversationItemBase): any {
  return item;
}

/** The response resource. */
export interface Response {
  /** The unique ID of the response. */
  id?: string;
  /** The object type, must be `realtime.response`. */
  object?: "realtime.response";
  /**
   * The final status of the response.
   *
   * One of: `completed`, `cancelled`, `failed`, `incomplete`, or `in_progress`.
   */
  status?: ResponseStatus;
  /** Additional details about the status. */
  statusDetails?: ResponseStatusDetailsUnion;
  /** The list of output items generated by the response. */
  output?: ResponseItemUnion[];
  /**
   * Usage statistics for the Response, this will correspond to billing. A
   * VoiceLive API session will maintain a conversation context and append new
   * Items to the Conversation, thus output from previous turns (text and
   * audio tokens) will become the input for later turns.
   */
  usage?: TokenUsage;
  /**
   * Which conversation the response is added to, determined by the `conversation`
   * field in the `response.create` event. If `auto`, the response will be added to
   * the default conversation and the value of `conversation_id` will be an id like
   * `conv_1234`. If `none`, the response will not be added to any conversation and
   * the value of `conversation_id` will be `null`. If responses are being triggered
   * by server VAD, the response will be added to the default conversation, thus
   * the `conversation_id` will be an id like `conv_1234`.
   */
  conversationId?: string;
  /** supported voice identifiers and configurations. */
  voice?: Voice;
  /**
   * The set of modalities the model used to respond. If there are multiple modalities,
   * the model will pick one, for example if `modalities` is `["text", "audio"]`, the model
   * could be responding in either text or audio.
   */
  modalities?: Modality[];
  /** The format of output audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`. */
  outputAudioFormat?: OutputAudioFormat;
  /** Sampling temperature for the model, limited to [0.6, 1.2]. Defaults to 0.8. */
  temperature?: number;
  /**
   * Maximum number of output tokens for a single assistant response,
   * inclusive of tool calls, that was used in this response.
   */
  maxOutputTokens?: number | "inf";
}

export function responseDeserializer(item: any): Response {
  return {
    id: item["id"],
    object: item["object"],
    status: item["status"],
    statusDetails: !item["status_details"]
      ? item["status_details"]
      : responseStatusDetailsUnionDeserializer(item["status_details"]),
    output: !item["output"] ? item["output"] : responseItemUnionArrayDeserializer(item["output"]),
    usage: !item["usage"] ? item["usage"] : tokenUsageDeserializer(item["usage"]),
    conversationId: item["conversation_id"],
    voice: !item["voice"] ? item["voice"] : voiceDeserializer(item["voice"]),
    modalities: !item["modalities"]
      ? item["modalities"]
      : item["modalities"].map((p: any) => {
          return p;
        }),
    outputAudioFormat: item["output_audio_format"],
    temperature: item["temperature"],
    maxOutputTokens: !item["max_output_tokens"]
      ? item["max_output_tokens"]
      : _responseMaxOutputTokensDeserializer(item["max_output_tokens"]),
  };
}

/** Terminal status of a response. */
export enum KnownResponseStatus {
  /** completed */
  Completed = "completed",
  /** cancelled */
  Cancelled = "cancelled",
  /** failed */
  Failed = "failed",
  /** incomplete */
  Incomplete = "incomplete",
  /** in_progress */
  InProgress = "in_progress",
}

/**
 * Terminal status of a response. \
 * {@link KnownResponseStatus} can be used interchangeably with ResponseStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **completed** \
 * **cancelled** \
 * **failed** \
 * **incomplete** \
 * **in_progress**
 */
export type ResponseStatus = string;

/** Base for all non-success response details. */
export interface ResponseStatusDetails {
  type: ResponseStatus;
}

export function responseStatusDetailsDeserializer(item: any): ResponseStatusDetails {
  return {
    type: item["type"],
  };
}

/** Alias for ResponseStatusDetailsUnion */
export type ResponseStatusDetailsUnion =
  | ResponseCancelledDetails
  | ResponseIncompleteDetails
  | ResponseFailedDetails
  | ResponseStatusDetails;

export function responseStatusDetailsUnionDeserializer(item: any): ResponseStatusDetailsUnion {
  switch (item.type) {
    case "cancelled":
      return responseCancelledDetailsDeserializer(item as ResponseCancelledDetails);

    case "incomplete":
      return responseIncompleteDetailsDeserializer(item as ResponseIncompleteDetails);

    case "failed":
      return responseFailedDetailsDeserializer(item as ResponseFailedDetails);

    default:
      return responseStatusDetailsDeserializer(item);
  }
}

/** Details for a cancelled response. */
export interface ResponseCancelledDetails extends ResponseStatusDetails {
  type: "cancelled";
  reason: string;
}

export function responseCancelledDetailsDeserializer(item: any): ResponseCancelledDetails {
  return {
    type: item["type"],
    reason: item["reason"],
  };
}

/** Details for an incomplete response. */
export interface ResponseIncompleteDetails extends ResponseStatusDetails {
  type: "incomplete";
  reason: string;
}

export function responseIncompleteDetailsDeserializer(item: any): ResponseIncompleteDetails {
  return {
    type: item["type"],
    reason: item["reason"],
  };
}

/** Details for a failed response. */
export interface ResponseFailedDetails extends ResponseStatusDetails {
  type: "failed";
  error: any;
}

export function responseFailedDetailsDeserializer(item: any): ResponseFailedDetails {
  return {
    type: item["type"],
    error: item["error"],
  };
}

export function responseItemUnionArrayDeserializer(result: Array<ResponseItemUnion>): any[] {
  return result.map((item) => {
    return responseItemUnionDeserializer(item);
  });
}

/** Base for any response item; discriminated by `type`. */
export interface ResponseItem {
  type: ItemType;
  id?: string;
  object?: "realtime.item";
}

export function responseItemDeserializer(item: any): ResponseItem {
  return {
    type: item["type"],
    id: item["id"],
    object: item["object"],
  };
}

/** Alias for ResponseItemUnion */
export type ResponseItemUnion =
  | ResponseMessageItem
  | ResponseFunctionCallItem
  | ResponseFunctionCallOutputItem
  | ResponseItem;

export function responseItemUnionDeserializer(item: any): ResponseItemUnion {
  switch (item.type) {
    case "message":
      return responseMessageItemDeserializer(item as ResponseMessageItem);

    case "function_call":
      return responseFunctionCallItemDeserializer(item as ResponseFunctionCallItem);

    case "function_call_output":
      return responseFunctionCallOutputItemDeserializer(item as ResponseFunctionCallOutputItem);

    default:
      return responseItemDeserializer(item);
  }
}

/** Base type for message item within a conversation. */
export interface ResponseMessageItem extends ResponseItem {
  type: "message";
  role: MessageRole;
  content: ContentPartUnion[];
  status: ResponseItemStatus;
}

export function responseMessageItemDeserializer(item: any): ResponseMessageItem {
  return {
    type: item["type"],
    id: item["id"],
    object: item["object"],
    role: item["role"],
    content: contentPartUnionArrayDeserializer(item["content"]),
    status: item["status"],
  };
}

export function contentPartUnionArraySerializer(result: Array<ContentPartUnion>): any[] {
  return result.map((item) => {
    return contentPartUnionSerializer(item);
  });
}

export function contentPartUnionArrayDeserializer(result: Array<ContentPartUnion>): any[] {
  return result.map((item) => {
    return contentPartUnionDeserializer(item);
  });
}

/** Base for any content part; discriminated by `type`. */
export interface ContentPart {
  type: ContentPartType;
}

export function contentPartSerializer(item: ContentPart): any {
  return { type: item["type"] };
}

export function contentPartDeserializer(item: any): ContentPart {
  return {
    type: item["type"],
  };
}

/** Alias for ContentPartUnion */
export type ContentPartUnion =
  | RequestTextContentPart
  | RequestAudioContentPart
  | ResponseTextContentPart
  | ResponseAudioContentPart
  | ContentPart;

export function contentPartUnionSerializer(item: ContentPartUnion): any {
  switch (item.type) {
    case "input_text":
      return requestTextContentPartSerializer(item as RequestTextContentPart);

    case "input_audio":
      return requestAudioContentPartSerializer(item as RequestAudioContentPart);

    default:
      return contentPartSerializer(item);
  }
}

export function contentPartUnionDeserializer(item: any): ContentPartUnion {
  switch (item.type) {
    case "input_text":
      return requestTextContentPartDeserializer(item as RequestTextContentPart);

    case "input_audio":
      return requestAudioContentPartDeserializer(item as RequestAudioContentPart);

    case "text":
      return responseTextContentPartDeserializer(item as ResponseTextContentPart);

    case "audio":
      return responseAudioContentPartDeserializer(item as ResponseAudioContentPart);

    default:
      return contentPartDeserializer(item);
  }
}

/** A text content part for a request. */
export interface RequestTextContentPart extends ContentPart {
  type: "input_text";
  text?: string;
}

export function requestTextContentPartSerializer(item: RequestTextContentPart): any {
  return { type: item["type"], text: item["text"] };
}

export function requestTextContentPartDeserializer(item: any): RequestTextContentPart {
  return {
    type: item["type"],
    text: item["text"],
  };
}

/** An audio content part for a request. */
export interface RequestAudioContentPart extends ContentPart {
  type: "input_audio";
  transcript?: string;
}

export function requestAudioContentPartSerializer(item: RequestAudioContentPart): any {
  return { type: item["type"], transcript: item["transcript"] };
}

export function requestAudioContentPartDeserializer(item: any): RequestAudioContentPart {
  return {
    type: item["type"],
    transcript: item["transcript"],
  };
}

/** A text content part for a response. */
export interface ResponseTextContentPart extends ContentPart {
  type: "text";
  text?: string;
}

export function responseTextContentPartDeserializer(item: any): ResponseTextContentPart {
  return {
    type: item["type"],
    text: item["text"],
  };
}

/** An audio content part for a response. */
export interface ResponseAudioContentPart extends ContentPart {
  type: "audio";
  transcript?: string;
}

export function responseAudioContentPartDeserializer(item: any): ResponseAudioContentPart {
  return {
    type: item["type"],
    transcript: item["transcript"],
  };
}

/** Indicates the processing status of a response item. */
export enum KnownResponseItemStatus {
  /** Item that is in progress. */
  InProgress = "in_progress",
  /** Item has been fully processed and is complete. */
  Completed = "completed",
  /** Item has been processed but is incomplete. */
  Incomplete = "incomplete",
}

/**
 * Indicates the processing status of a response item. \
 * {@link KnownResponseItemStatus} can be used interchangeably with ResponseItemStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **in_progress**: Item that is in progress. \
 * **completed**: Item has been fully processed and is complete. \
 * **incomplete**: Item has been processed but is incomplete.
 */
export type ResponseItemStatus = string;

/** A function call item within a conversation. */
export interface ResponseFunctionCallItem extends ResponseItem {
  type: "function_call";
  name: string;
  callId: string;
  arguments: string;
  status: ResponseItemStatus;
}

export function responseFunctionCallItemDeserializer(item: any): ResponseFunctionCallItem {
  return {
    type: item["type"],
    id: item["id"],
    object: item["object"],
    name: item["name"],
    callId: item["call_id"],
    arguments: item["arguments"],
    status: item["status"],
  };
}

/** A function call output item within a conversation. */
export interface ResponseFunctionCallOutputItem extends ResponseItem {
  type: "function_call_output";
  callId: string;
  output: string;
}

export function responseFunctionCallOutputItemDeserializer(
  item: any,
): ResponseFunctionCallOutputItem {
  return {
    type: item["type"],
    id: item["id"],
    object: item["object"],
    callId: item["call_id"],
    output: item["output"],
  };
}

/** Overall usage statistics for a response. */
export interface TokenUsage {
  /** Total number of tokens (input + output). */
  totalTokens: number;
  /** Number of input tokens. */
  inputTokens: number;
  /** Number of output tokens. */
  outputTokens: number;
  /** Detailed breakdown of input tokens. */
  inputTokenDetails: InputTokenDetails;
  /** Detailed breakdown of output tokens. */
  outputTokenDetails: OutputTokenDetails;
}

export function tokenUsageDeserializer(item: any): TokenUsage {
  return {
    totalTokens: item["total_tokens"],
    inputTokens: item["input_tokens"],
    outputTokens: item["output_tokens"],
    inputTokenDetails: inputTokenDetailsDeserializer(item["input_token_details"]),
    outputTokenDetails: outputTokenDetailsDeserializer(item["output_token_details"]),
  };
}

/** Details of input token usage. */
export interface InputTokenDetails {
  /** Number of cached tokens used in the input. */
  cachedTokens: number;
  /** Number of text tokens used in the input. */
  textTokens: number;
  /** Number of audio tokens used in the input. */
  audioTokens: number;
  /** Details of cached token usage. */
  cachedTokensDetails: CachedTokenDetails;
}

export function inputTokenDetailsDeserializer(item: any): InputTokenDetails {
  return {
    cachedTokens: item["cached_tokens"],
    textTokens: item["text_tokens"],
    audioTokens: item["audio_tokens"],
    cachedTokensDetails: cachedTokenDetailsDeserializer(item["cached_tokens_details"]),
  };
}

/** Details of output token usage. */
export interface CachedTokenDetails {
  /** Number of cached text tokens. */
  textTokens: number;
  /** Number of cached audio tokens. */
  audioTokens: number;
}

export function cachedTokenDetailsDeserializer(item: any): CachedTokenDetails {
  return {
    textTokens: item["text_tokens"],
    audioTokens: item["audio_tokens"],
  };
}

/** Details of output token usage. */
export interface OutputTokenDetails {
  /** Number of text tokens generated in the output. */
  textTokens: number;
  /** Number of audio tokens generated in the output. */
  audioTokens: number;
}

export function outputTokenDetailsDeserializer(item: any): OutputTokenDetails {
  return {
    textTokens: item["text_tokens"],
    audioTokens: item["audio_tokens"],
  };
}

/** Alias for _ResponseMaxOutputTokens */
export type _ResponseMaxOutputTokens = number | "inf";

export function _responseMaxOutputTokensDeserializer(item: any): _ResponseMaxOutputTokens {
  return item;
}

/** A voicelive server event. */
export interface ServerEvent {
  /** The type of event. */
  /** The discriminator possible values: error, session.created, session.updated, session.avatar.connecting, input_audio_buffer.committed, input_audio_buffer.cleared, input_audio_buffer.speech_started, input_audio_buffer.speech_stopped, conversation.item.created, conversation.item.input_audio_transcription.completed, conversation.item.input_audio_transcription.failed, conversation.item.truncated, conversation.item.deleted, response.created, response.done, response.output_item.added, response.output_item.done, response.content_part.added, response.content_part.done, response.text.delta, response.text.done, response.audio_transcript.delta, response.audio_transcript.done, response.audio.delta, response.audio.done, response.animation_blendshapes.delta, response.animation_blendshapes.done, response.audio_timestamp.delta, response.audio_timestamp.done, response.animation_viseme.delta, response.animation_viseme.done, conversation.item.input_audio_transcription.delta, conversation.item.retrieved, response.function_call_arguments.delta, response.function_call_arguments.done */
  type: ServerEventType;
  eventId?: string;
}

export function serverEventDeserializer(item: any): ServerEvent {
  return {
    type: item["type"],
    eventId: item["event_id"],
  };
}

/** Alias for ServerEventUnion */
export type ServerEventUnion =
  | ServerEventError
  | ServerEventSessionCreated
  | ServerEventSessionUpdated
  | ServerEventSessionAvatarConnecting
  | ServerEventInputAudioBufferCommitted
  | ServerEventInputAudioBufferCleared
  | ServerEventInputAudioBufferSpeechStarted
  | ServerEventInputAudioBufferSpeechStopped
  | ServerEventConversationItemCreated
  | ServerEventConversationItemInputAudioTranscriptionCompleted
  | ServerEventConversationItemInputAudioTranscriptionFailed
  | ServerEventConversationItemTruncated
  | ServerEventConversationItemDeleted
  | ServerEventResponseCreated
  | ServerEventResponseDone
  | ServerEventResponseOutputItemAdded
  | ServerEventResponseOutputItemDone
  | ServerEventResponseContentPartAdded
  | ServerEventResponseContentPartDone
  | ServerEventResponseTextDelta
  | ServerEventResponseTextDone
  | ServerEventResponseAudioTranscriptDelta
  | ServerEventResponseAudioTranscriptDone
  | ServerEventResponseAudioDelta
  | ServerEventResponseAudioDone
  | ServerEventResponseAnimationBlendshapeDelta
  | ServerEventResponseAnimationBlendshapeDone
  | ServerEventResponseAudioTimestampDelta
  | ServerEventResponseAudioTimestampDone
  | ServerEventResponseAnimationVisemeDelta
  | ServerEventResponseAnimationVisemeDone
  | ServerEventConversationItemInputAudioTranscriptionDelta
  | ServerEventConversationItemRetrieved
  | ServerEventResponseFunctionCallArgumentsDelta
  | ServerEventResponseFunctionCallArgumentsDone
  | ServerEvent;

export function serverEventUnionDeserializer(item: any): ServerEventUnion {
  switch (item.type) {
    case "error":
      return serverEventErrorDeserializer(item as ServerEventError);

    case "session.created":
      return serverEventSessionCreatedDeserializer(item as ServerEventSessionCreated);

    case "session.updated":
      return serverEventSessionUpdatedDeserializer(item as ServerEventSessionUpdated);

    case "session.avatar.connecting":
      return serverEventSessionAvatarConnectingDeserializer(
        item as ServerEventSessionAvatarConnecting,
      );

    case "input_audio_buffer.committed":
      return serverEventInputAudioBufferCommittedDeserializer(
        item as ServerEventInputAudioBufferCommitted,
      );

    case "input_audio_buffer.cleared":
      return serverEventInputAudioBufferClearedDeserializer(
        item as ServerEventInputAudioBufferCleared,
      );

    case "input_audio_buffer.speech_started":
      return serverEventInputAudioBufferSpeechStartedDeserializer(
        item as ServerEventInputAudioBufferSpeechStarted,
      );

    case "input_audio_buffer.speech_stopped":
      return serverEventInputAudioBufferSpeechStoppedDeserializer(
        item as ServerEventInputAudioBufferSpeechStopped,
      );

    case "conversation.item.created":
      return serverEventConversationItemCreatedDeserializer(
        item as ServerEventConversationItemCreated,
      );

    case "conversation.item.input_audio_transcription.completed":
      return serverEventConversationItemInputAudioTranscriptionCompletedDeserializer(
        item as ServerEventConversationItemInputAudioTranscriptionCompleted,
      );

    case "conversation.item.input_audio_transcription.failed":
      return serverEventConversationItemInputAudioTranscriptionFailedDeserializer(
        item as ServerEventConversationItemInputAudioTranscriptionFailed,
      );

    case "conversation.item.truncated":
      return serverEventConversationItemTruncatedDeserializer(
        item as ServerEventConversationItemTruncated,
      );

    case "conversation.item.deleted":
      return serverEventConversationItemDeletedDeserializer(
        item as ServerEventConversationItemDeleted,
      );

    case "response.created":
      return serverEventResponseCreatedDeserializer(item as ServerEventResponseCreated);

    case "response.done":
      return serverEventResponseDoneDeserializer(item as ServerEventResponseDone);

    case "response.output_item.added":
      return serverEventResponseOutputItemAddedDeserializer(
        item as ServerEventResponseOutputItemAdded,
      );

    case "response.output_item.done":
      return serverEventResponseOutputItemDoneDeserializer(
        item as ServerEventResponseOutputItemDone,
      );

    case "response.content_part.added":
      return serverEventResponseContentPartAddedDeserializer(
        item as ServerEventResponseContentPartAdded,
      );

    case "response.content_part.done":
      return serverEventResponseContentPartDoneDeserializer(
        item as ServerEventResponseContentPartDone,
      );

    case "response.text.delta":
      return serverEventResponseTextDeltaDeserializer(item as ServerEventResponseTextDelta);

    case "response.text.done":
      return serverEventResponseTextDoneDeserializer(item as ServerEventResponseTextDone);

    case "response.audio_transcript.delta":
      return serverEventResponseAudioTranscriptDeltaDeserializer(
        item as ServerEventResponseAudioTranscriptDelta,
      );

    case "response.audio_transcript.done":
      return serverEventResponseAudioTranscriptDoneDeserializer(
        item as ServerEventResponseAudioTranscriptDone,
      );

    case "response.audio.delta":
      return serverEventResponseAudioDeltaDeserializer(item as ServerEventResponseAudioDelta);

    case "response.audio.done":
      return serverEventResponseAudioDoneDeserializer(item as ServerEventResponseAudioDone);

    case "response.animation_blendshapes.delta":
      return serverEventResponseAnimationBlendshapeDeltaDeserializer(
        item as ServerEventResponseAnimationBlendshapeDelta,
      );

    case "response.animation_blendshapes.done":
      return serverEventResponseAnimationBlendshapeDoneDeserializer(
        item as ServerEventResponseAnimationBlendshapeDone,
      );

    case "response.audio_timestamp.delta":
      return serverEventResponseAudioTimestampDeltaDeserializer(
        item as ServerEventResponseAudioTimestampDelta,
      );

    case "response.audio_timestamp.done":
      return serverEventResponseAudioTimestampDoneDeserializer(
        item as ServerEventResponseAudioTimestampDone,
      );

    case "response.animation_viseme.delta":
      return serverEventResponseAnimationVisemeDeltaDeserializer(
        item as ServerEventResponseAnimationVisemeDelta,
      );

    case "response.animation_viseme.done":
      return serverEventResponseAnimationVisemeDoneDeserializer(
        item as ServerEventResponseAnimationVisemeDone,
      );

    case "conversation.item.input_audio_transcription.delta":
      return serverEventConversationItemInputAudioTranscriptionDeltaDeserializer(
        item as ServerEventConversationItemInputAudioTranscriptionDelta,
      );

    case "conversation.item.retrieved":
      return serverEventConversationItemRetrievedDeserializer(
        item as ServerEventConversationItemRetrieved,
      );

    case "response.function_call_arguments.delta":
      return serverEventResponseFunctionCallArgumentsDeltaDeserializer(
        item as ServerEventResponseFunctionCallArgumentsDelta,
      );

    case "response.function_call_arguments.done":
      return serverEventResponseFunctionCallArgumentsDoneDeserializer(
        item as ServerEventResponseFunctionCallArgumentsDone,
      );

    default:
      return serverEventDeserializer(item);
  }
}

/** Server event types used in VoiceLive protocol. */
export enum KnownServerEventType {
  /** error */
  Error = "error",
  /** session.avatar.connecting */
  SessionAvatarConnecting = "session.avatar.connecting",
  /** session.created */
  SessionCreated = "session.created",
  /** session.updated */
  SessionUpdated = "session.updated",
  /** conversation.item.input_audio_transcription.completed */
  ConversationItemInputAudioTranscriptionCompleted = "conversation.item.input_audio_transcription.completed",
  /** conversation.item.input_audio_transcription.delta */
  ConversationItemInputAudioTranscriptionDelta = "conversation.item.input_audio_transcription.delta",
  /** conversation.item.input_audio_transcription.failed */
  ConversationItemInputAudioTranscriptionFailed = "conversation.item.input_audio_transcription.failed",
  /** conversation.item.created */
  ConversationItemCreated = "conversation.item.created",
  /** conversation.item.retrieved */
  ConversationItemRetrieved = "conversation.item.retrieved",
  /** conversation.item.truncated */
  ConversationItemTruncated = "conversation.item.truncated",
  /** conversation.item.deleted */
  ConversationItemDeleted = "conversation.item.deleted",
  /** input_audio_buffer.committed */
  InputAudioBufferCommitted = "input_audio_buffer.committed",
  /** input_audio_buffer.cleared */
  InputAudioBufferCleared = "input_audio_buffer.cleared",
  /** input_audio_buffer.speech_started */
  InputAudioBufferSpeechStarted = "input_audio_buffer.speech_started",
  /** input_audio_buffer.speech_stopped */
  InputAudioBufferSpeechStopped = "input_audio_buffer.speech_stopped",
  /** response.created */
  ResponseCreated = "response.created",
  /** response.done */
  ResponseDone = "response.done",
  /** response.output_item.added */
  ResponseOutputItemAdded = "response.output_item.added",
  /** response.output_item.done */
  ResponseOutputItemDone = "response.output_item.done",
  /** response.content_part.added */
  ResponseContentPartAdded = "response.content_part.added",
  /** response.content_part.done */
  ResponseContentPartDone = "response.content_part.done",
  /** response.text.delta */
  ResponseTextDelta = "response.text.delta",
  /** response.text.done */
  ResponseTextDone = "response.text.done",
  /** response.audio_transcript.delta */
  ResponseAudioTranscriptDelta = "response.audio_transcript.delta",
  /** response.audio_transcript.done */
  ResponseAudioTranscriptDone = "response.audio_transcript.done",
  /** response.audio.delta */
  ResponseAudioDelta = "response.audio.delta",
  /** response.audio.done */
  ResponseAudioDone = "response.audio.done",
  /** response.animation_blendshapes.delta */
  ResponseAnimationBlendshapesDelta = "response.animation_blendshapes.delta",
  /** response.animation_blendshapes.done */
  ResponseAnimationBlendshapesDone = "response.animation_blendshapes.done",
  /** response.audio_timestamp.delta */
  ResponseAudioTimestampDelta = "response.audio_timestamp.delta",
  /** response.audio_timestamp.done */
  ResponseAudioTimestampDone = "response.audio_timestamp.done",
  /** response.animation_viseme.delta */
  ResponseAnimationVisemeDelta = "response.animation_viseme.delta",
  /** response.animation_viseme.done */
  ResponseAnimationVisemeDone = "response.animation_viseme.done",
  /** response.function_call_arguments.delta */
  ResponseFunctionCallArgumentsDelta = "response.function_call_arguments.delta",
  /** response.function_call_arguments.done */
  ResponseFunctionCallArgumentsDone = "response.function_call_arguments.done",
}

/**
 * Server event types used in VoiceLive protocol. \
 * {@link KnownServerEventType} can be used interchangeably with ServerEventType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **error** \
 * **session.avatar.connecting** \
 * **session.created** \
 * **session.updated** \
 * **conversation.item.input_audio_transcription.completed** \
 * **conversation.item.input_audio_transcription.delta** \
 * **conversation.item.input_audio_transcription.failed** \
 * **conversation.item.created** \
 * **conversation.item.retrieved** \
 * **conversation.item.truncated** \
 * **conversation.item.deleted** \
 * **input_audio_buffer.committed** \
 * **input_audio_buffer.cleared** \
 * **input_audio_buffer.speech_started** \
 * **input_audio_buffer.speech_stopped** \
 * **response.created** \
 * **response.done** \
 * **response.output_item.added** \
 * **response.output_item.done** \
 * **response.content_part.added** \
 * **response.content_part.done** \
 * **response.text.delta** \
 * **response.text.done** \
 * **response.audio_transcript.delta** \
 * **response.audio_transcript.done** \
 * **response.audio.delta** \
 * **response.audio.done** \
 * **response.animation_blendshapes.delta** \
 * **response.animation_blendshapes.done** \
 * **response.audio_timestamp.delta** \
 * **response.audio_timestamp.done** \
 * **response.animation_viseme.delta** \
 * **response.animation_viseme.done** \
 * **response.function_call_arguments.delta** \
 * **response.function_call_arguments.done**
 */
export type ServerEventType = string;

/**
 * Returned when an error occurs, which could be a client problem or a server
 * problem. Most errors are recoverable and the session will stay open, we
 * recommend to implementors to monitor and log error messages by default.
 */
export interface ServerEventError extends ServerEvent {
  /** The event type, must be `error`. */
  type: "error";
  /** Details of the error. */
  error: ServerEventErrorDetails;
}

export function serverEventErrorDeserializer(item: any): ServerEventError {
  return {
    type: item["type"],
    eventId: item["event_id"],
    error: serverEventErrorDetailsDeserializer(item["error"]),
  };
}

/** Details of the error. */
export interface ServerEventErrorDetails {
  /** The type of error (e.g., "invalid_request_error", "server_error"). */
  type: string;
  /** Error code, if any. */
  code?: string;
  /** A human-readable error message. */
  message: string;
  /** Parameter related to the error, if any. */
  param?: string;
  /** The event_id of the client event that caused the error, if applicable. */
  eventId?: string;
}

export function serverEventErrorDetailsDeserializer(item: any): ServerEventErrorDetails {
  return {
    type: item["type"],
    code: item["code"],
    message: item["message"],
    param: item["param"],
    eventId: item["event_id"],
  };
}

/**
 * Returned when a Session is created. Emitted automatically when a new
 * connection is established as the first server event. This event will contain
 * the default Session configuration.
 */
export interface ServerEventSessionCreated extends ServerEvent {
  /** The event type, must be `session.created`. */
  type: "session.created";
  session: ResponseSession;
}

export function serverEventSessionCreatedDeserializer(item: any): ServerEventSessionCreated {
  return {
    type: item["type"],
    eventId: item["event_id"],
    session: responseSessionDeserializer(item["session"]),
  };
}

/** Base for session configuration in the response. */
export interface ResponseSession {
  /** The model for the session. */
  model?: string;
  /** The modalities to be used in the session. */
  modalities?: Modality[];
  /** The animation configuration for the session. */
  animation?: Animation;
  /** The voice configuration for the session. */
  voice?: Voice;
  /** Optional instructions to guide the model's behavior throughout the session. */
  instructions?: string;
  /**
   * Input audio sampling rate in Hz. Available values:
   *
   * - For pcm16: 8000, 16000, 24000
   *
   * - For g711_alaw/g711_ulaw: 8000
   */
  inputAudioSamplingRate?: number;
  /** Input audio format. Default is 'pcm16'. */
  inputAudioFormat?: InputAudioFormat;
  /** Output audio format. Default is 'pcm16'. */
  outputAudioFormat?: OutputAudioFormat;
  /** Type of turn detection to use. */
  turnDetection?: TurnDetectionUnion;
  /** Configuration for input audio noise reduction. */
  inputAudioNoiseReduction?: AudioNoiseReduction;
  /** Configuration for echo cancellation during server-side audio processing. */
  inputAudioEchoCancellation?: AudioEchoCancellation;
  /** Configuration for avatar streaming and behavior during the session. */
  avatar?: AvatarConfig;
  /** Configuration for input audio transcription. */
  inputAudioTranscription?: AudioInputTranscriptionOptions;
  /** Types of timestamps to include in audio response content. */
  outputAudioTimestampTypes?: AudioTimestampType[];
  /** Configuration for tools to be used during the session, if applicable. */
  tools?: ToolUnion[];
  /** Specifies which tools the model is allowed to call during the session. */
  toolChoice?: ToolChoice;
  /** Controls the randomness of the model's output. Range: 0.0 to 1.0. Default is 0.7. */
  temperature?: number;
  /** Maximum number of tokens to generate in the response. Default is unlimited. */
  maxResponseOutputTokens?: number | "inf";
  /** The agent configuration for the session, if applicable. */
  agent?: AgentConfig;
  /** The unique identifier for the session. */
  id?: string;
}

export function responseSessionSerializer(item: ResponseSession): any {
  return {
    model: item["model"],
    modalities: !item["modalities"]
      ? item["modalities"]
      : item["modalities"].map((p: any) => {
          return p;
        }),
    animation: !item["animation"] ? item["animation"] : animationSerializer(item["animation"]),
    voice: !item["voice"] ? item["voice"] : voiceSerializer(item["voice"]),
    instructions: item["instructions"],
    input_audio_sampling_rate: item["inputAudioSamplingRate"],
    input_audio_format: item["inputAudioFormat"],
    output_audio_format: item["outputAudioFormat"],
    turn_detection: !item["turnDetection"]
      ? item["turnDetection"]
      : turnDetectionUnionSerializer(item["turnDetection"]),
    input_audio_noise_reduction: !item["inputAudioNoiseReduction"]
      ? item["inputAudioNoiseReduction"]
      : audioNoiseReductionSerializer(item["inputAudioNoiseReduction"]),
    input_audio_echo_cancellation: !item["inputAudioEchoCancellation"]
      ? item["inputAudioEchoCancellation"]
      : audioEchoCancellationSerializer(item["inputAudioEchoCancellation"]),
    avatar: !item["avatar"] ? item["avatar"] : avatarConfigSerializer(item["avatar"]),
    input_audio_transcription: !item["inputAudioTranscription"]
      ? item["inputAudioTranscription"]
      : audioInputTranscriptionOptionsSerializer(item["inputAudioTranscription"]),
    output_audio_timestamp_types: !item["outputAudioTimestampTypes"]
      ? item["outputAudioTimestampTypes"]
      : item["outputAudioTimestampTypes"].map((p: any) => {
          return p;
        }),
    tools: !item["tools"] ? item["tools"] : toolUnionArraySerializer(item["tools"]),
    tool_choice: !item["toolChoice"]
      ? item["toolChoice"]
      : toolChoiceSerializer(item["toolChoice"]),
    temperature: item["temperature"],
    max_response_output_tokens: !item["maxResponseOutputTokens"]
      ? item["maxResponseOutputTokens"]
      : _requestSessionMaxResponseOutputTokensSerializer(item["maxResponseOutputTokens"]),
    agent: !item["agent"] ? item["agent"] : agentConfigSerializer(item["agent"]),
    id: item["id"],
  };
}

export function responseSessionDeserializer(item: any): ResponseSession {
  return {
    model: item["model"],
    modalities: !item["modalities"]
      ? item["modalities"]
      : item["modalities"].map((p: any) => {
          return p;
        }),
    animation: !item["animation"] ? item["animation"] : animationDeserializer(item["animation"]),
    voice: !item["voice"] ? item["voice"] : voiceDeserializer(item["voice"]),
    instructions: item["instructions"],
    inputAudioSamplingRate: item["input_audio_sampling_rate"],
    inputAudioFormat: item["input_audio_format"],
    outputAudioFormat: item["output_audio_format"],
    turnDetection: !item["turn_detection"]
      ? item["turn_detection"]
      : turnDetectionUnionDeserializer(item["turn_detection"]),
    inputAudioNoiseReduction: !item["input_audio_noise_reduction"]
      ? item["input_audio_noise_reduction"]
      : audioNoiseReductionDeserializer(item["input_audio_noise_reduction"]),
    inputAudioEchoCancellation: !item["input_audio_echo_cancellation"]
      ? item["input_audio_echo_cancellation"]
      : audioEchoCancellationDeserializer(item["input_audio_echo_cancellation"]),
    avatar: !item["avatar"] ? item["avatar"] : avatarConfigDeserializer(item["avatar"]),
    inputAudioTranscription: !item["input_audio_transcription"]
      ? item["input_audio_transcription"]
      : audioInputTranscriptionOptionsDeserializer(item["input_audio_transcription"]),
    outputAudioTimestampTypes: !item["output_audio_timestamp_types"]
      ? item["output_audio_timestamp_types"]
      : item["output_audio_timestamp_types"].map((p: any) => {
          return p;
        }),
    tools: !item["tools"] ? item["tools"] : toolUnionArrayDeserializer(item["tools"]),
    toolChoice: !item["tool_choice"]
      ? item["tool_choice"]
      : toolChoiceDeserializer(item["tool_choice"]),
    temperature: item["temperature"],
    maxResponseOutputTokens: !item["max_response_output_tokens"]
      ? item["max_response_output_tokens"]
      : _requestSessionMaxResponseOutputTokensDeserializer(item["max_response_output_tokens"]),
    agent: !item["agent"] ? item["agent"] : agentConfigDeserializer(item["agent"]),
    id: item["id"],
  };
}

/** Configuration for the agent. */
export interface AgentConfig {
  /** The type of agent to use. */
  type: "agent";
  /** The name of the agent. */
  name: string;
  /** Optional description of the agent. */
  description?: string;
  /** The ID of the agent. */
  agentId: string;
  /** The ID of the conversation thread. */
  threadId: string;
}

export function agentConfigSerializer(item: AgentConfig): any {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    agent_id: item["agentId"],
    thread_id: item["threadId"],
  };
}

export function agentConfigDeserializer(item: any): AgentConfig {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    agentId: item["agent_id"],
    threadId: item["thread_id"],
  };
}

/**
 * Returned when a session is updated with a `session.update` event, unless
 * there is an error.
 */
export interface ServerEventSessionUpdated extends ServerEvent {
  /** The event type, must be `session.updated`. */
  type: "session.updated";
  session: ResponseSession;
}

export function serverEventSessionUpdatedDeserializer(item: any): ServerEventSessionUpdated {
  return {
    type: item["type"],
    eventId: item["event_id"],
    session: responseSessionDeserializer(item["session"]),
  };
}

/** Sent when the server is in the process of establishing an avatar media connection and provides its SDP answer. */
export interface ServerEventSessionAvatarConnecting extends ServerEvent {
  /** The event type, must be 'session.avatar.connecting'. */
  type: "session.avatar.connecting";
  /** The server's SDP answer for the avatar connection. */
  serverSdp: string;
}

export function serverEventSessionAvatarConnectingDeserializer(
  item: any,
): ServerEventSessionAvatarConnecting {
  return {
    type: item["type"],
    eventId: item["event_id"],
    serverSdp: item["server_sdp"],
  };
}

/**
 * Returned when an input audio buffer is committed, either by the client or
 * automatically in server VAD mode. The `item_id` property is the ID of the user
 * message item that will be created, thus a `conversation.item.created` event
 * will also be sent to the client.
 */
export interface ServerEventInputAudioBufferCommitted extends ServerEvent {
  /** The event type, must be `input_audio_buffer.committed`. */
  type: "input_audio_buffer.committed";
  /** The ID of the preceding item after which the new item will be inserted. */
  previousItemId?: string;
  /** The ID of the user message item that will be created. */
  itemId: string;
}

export function serverEventInputAudioBufferCommittedDeserializer(
  item: any,
): ServerEventInputAudioBufferCommitted {
  return {
    type: item["type"],
    eventId: item["event_id"],
    previousItemId: item["previous_item_id"],
    itemId: item["item_id"],
  };
}

/**
 * Returned when the input audio buffer is cleared by the client with a
 * `input_audio_buffer.clear` event.
 */
export interface ServerEventInputAudioBufferCleared extends ServerEvent {
  /** The event type, must be `input_audio_buffer.cleared`. */
  type: "input_audio_buffer.cleared";
}

export function serverEventInputAudioBufferClearedDeserializer(
  item: any,
): ServerEventInputAudioBufferCleared {
  return {
    type: item["type"],
    eventId: item["event_id"],
  };
}

/**
 * Sent by the server when in `server_vad` mode to indicate that speech has been
 * detected in the audio buffer. This can happen any time audio is added to the
 * buffer (unless speech is already detected). The client may want to use this
 * event to interrupt audio playback or provide visual feedback to the user.
 * The client should expect to receive a `input_audio_buffer.speech_stopped` event
 * when speech stops. The `item_id` property is the ID of the user message item
 * that will be created when speech stops and will also be included in the
 * `input_audio_buffer.speech_stopped` event (unless the client manually commits
 * the audio buffer during VAD activation).
 */
export interface ServerEventInputAudioBufferSpeechStarted extends ServerEvent {
  /** The event type, must be `input_audio_buffer.speech_started`. */
  type: "input_audio_buffer.speech_started";
  /**
   * Milliseconds from the start of all audio written to the buffer during the
   * session when speech was first detected. This will correspond to the
   * beginning of audio sent to the model, and thus includes the
   * `prefix_padding_ms` configured in the Session.
   */
  audioStartMs: number;
  /** The ID of the user message item that will be created when speech stops. */
  itemId: string;
}

export function serverEventInputAudioBufferSpeechStartedDeserializer(
  item: any,
): ServerEventInputAudioBufferSpeechStarted {
  return {
    type: item["type"],
    eventId: item["event_id"],
    audioStartMs: item["audio_start_ms"],
    itemId: item["item_id"],
  };
}

/**
 * Returned in `server_vad` mode when the server detects the end of speech in
 * the audio buffer. The server will also send an `conversation.item.created`
 * event with the user message item that is created from the audio buffer.
 */
export interface ServerEventInputAudioBufferSpeechStopped extends ServerEvent {
  /** The event type, must be `input_audio_buffer.speech_stopped`. */
  type: "input_audio_buffer.speech_stopped";
  /**
   * Milliseconds since the session started when speech stopped. This will
   * correspond to the end of audio sent to the model, and thus includes the
   * `min_silence_duration_ms` configured in the Session.
   */
  audioEndMs: number;
  /** The ID of the user message item that will be created. */
  itemId: string;
}

export function serverEventInputAudioBufferSpeechStoppedDeserializer(
  item: any,
): ServerEventInputAudioBufferSpeechStopped {
  return {
    type: item["type"],
    eventId: item["event_id"],
    audioEndMs: item["audio_end_ms"],
    itemId: item["item_id"],
  };
}

/**
 * Returned when a conversation item is created. There are several scenarios that produce this event:
 * - The server is generating a Response, which if successful will produce
 * either one or two Items, which will be of type `message`
 * (role `assistant`) or type `function_call`.
 * - The input audio buffer has been committed, either by the client or the
 * server (in `server_vad` mode). The server will take the content of the
 * input audio buffer and add it to a new user message Item.
 * - The client has sent a `conversation.item.create` event to add a new Item
 * to the Conversation.
 */
export interface ServerEventConversationItemCreated extends ServerEvent {
  /** The event type, must be `conversation.item.created`. */
  type: "conversation.item.created";
  /**
   * The ID of the preceding item in the Conversation context, allows the
   * client to understand the order of the conversation.
   */
  previousItemId?: string;
  item?: ResponseItemUnion;
}

export function serverEventConversationItemCreatedDeserializer(
  item: any,
): ServerEventConversationItemCreated {
  return {
    type: item["type"],
    eventId: item["event_id"],
    previousItemId: item["previous_item_id"],
    item: !item["item"] ? item["item"] : responseItemUnionDeserializer(item["item"]),
  };
}

/**
 * This event is the output of audio transcription for user audio written to the
 * user audio buffer. Transcription begins when the input audio buffer is
 * committed by the client or server (in `server_vad` mode). Transcription runs
 * asynchronously with Response creation, so this event may come before or after
 * the Response events.
 * VoiceLive API models accept audio natively, and thus input transcription is a
 * separate process run on a separate ASR (Automatic Speech Recognition) model.
 * The transcript may diverge somewhat from the model's interpretation, and
 * should be treated as a rough guide.
 */
export interface ServerEventConversationItemInputAudioTranscriptionCompleted extends ServerEvent {
  /**
   * The event type, must be
   * `conversation.item.input_audio_transcription.completed`.
   */
  type: "conversation.item.input_audio_transcription.completed";
  /** The ID of the user message item containing the audio. */
  itemId: string;
  /** The index of the content part containing the audio. */
  contentIndex: number;
  /** The transcribed text. */
  transcript: string;
}

export function serverEventConversationItemInputAudioTranscriptionCompletedDeserializer(
  item: any,
): ServerEventConversationItemInputAudioTranscriptionCompleted {
  return {
    type: item["type"],
    eventId: item["event_id"],
    itemId: item["item_id"],
    contentIndex: item["content_index"],
    transcript: item["transcript"],
  };
}

/**
 * Returned when input audio transcription is configured, and a transcription
 * request for a user message failed. These events are separate from other
 * `error` events so that the client can identify the related Item.
 */
export interface ServerEventConversationItemInputAudioTranscriptionFailed extends ServerEvent {
  /**
   * The event type, must be
   * `conversation.item.input_audio_transcription.failed`.
   */
  type: "conversation.item.input_audio_transcription.failed";
  /** The ID of the user message item. */
  itemId: string;
  /** The index of the content part containing the audio. */
  contentIndex: number;
  /** Details of the transcription error. */
  error: VoiceLiveErrorDetails;
}

export function serverEventConversationItemInputAudioTranscriptionFailedDeserializer(
  item: any,
): ServerEventConversationItemInputAudioTranscriptionFailed {
  return {
    type: item["type"],
    eventId: item["event_id"],
    itemId: item["item_id"],
    contentIndex: item["content_index"],
    error: voiceLiveErrorDetailsDeserializer(item["error"]),
  };
}

/**
 * Returned when an earlier assistant audio message item is truncated by the
 * client with a `conversation.item.truncate` event. This event is used to
 * synchronize the server's understanding of the audio with the client's playback.
 * This action will truncate the audio and remove the server-side text transcript
 * to ensure there is no text in the context that hasn't been heard by the user.
 */
export interface ServerEventConversationItemTruncated extends ServerEvent {
  /** The event type, must be `conversation.item.truncated`. */
  type: "conversation.item.truncated";
  /** The ID of the assistant message item that was truncated. */
  itemId: string;
  /** The index of the content part that was truncated. */
  contentIndex: number;
  /** The duration up to which the audio was truncated, in milliseconds. */
  audioEndMs: number;
  eventId?: string;
}

export function serverEventConversationItemTruncatedDeserializer(
  item: any,
): ServerEventConversationItemTruncated {
  return {
    type: item["type"],
    eventId: item["event_id"],
    itemId: item["item_id"],
    contentIndex: item["content_index"],
    audioEndMs: item["audio_end_ms"],
  };
}

/**
 * Returned when an item in the conversation is deleted by the client with a
 * `conversation.item.delete` event. This event is used to synchronize the
 * server's understanding of the conversation history with the client's view.
 */
export interface ServerEventConversationItemDeleted extends ServerEvent {
  /** The event type, must be `conversation.item.deleted`. */
  type: "conversation.item.deleted";
  /** The ID of the item that was deleted. */
  itemId: string;
  eventId?: string;
}

export function serverEventConversationItemDeletedDeserializer(
  item: any,
): ServerEventConversationItemDeleted {
  return {
    type: item["type"],
    eventId: item["event_id"],
    itemId: item["item_id"],
  };
}

/**
 * Returned when a new Response is created. The first event of response creation,
 * where the response is in an initial state of `in_progress`.
 */
export interface ServerEventResponseCreated extends ServerEvent {
  /** The event type, must be `response.created`. */
  type: "response.created";
  response: Response;
}

export function serverEventResponseCreatedDeserializer(item: any): ServerEventResponseCreated {
  return {
    type: item["type"],
    eventId: item["event_id"],
    response: responseDeserializer(item["response"]),
  };
}

/**
 * Returned when a Response is done streaming. Always emitted, no matter the
 * final state. The Response object included in the `response.done` event will
 * include all output Items in the Response but will omit the raw audio data.
 */
export interface ServerEventResponseDone extends ServerEvent {
  /** The event type, must be `response.done`. */
  type: "response.done";
  response: Response;
}

export function serverEventResponseDoneDeserializer(item: any): ServerEventResponseDone {
  return {
    type: item["type"],
    eventId: item["event_id"],
    response: responseDeserializer(item["response"]),
  };
}

/** Returned when a new Item is created during Response generation. */
export interface ServerEventResponseOutputItemAdded extends ServerEvent {
  /** The event type, must be `response.output_item.added`. */
  type: "response.output_item.added";
  /** The ID of the Response to which the item belongs. */
  responseId: string;
  /** The index of the output item in the Response. */
  outputIndex: number;
  item?: ResponseItemUnion;
}

export function serverEventResponseOutputItemAddedDeserializer(
  item: any,
): ServerEventResponseOutputItemAdded {
  return {
    type: item["type"],
    eventId: item["event_id"],
    responseId: item["response_id"],
    outputIndex: item["output_index"],
    item: !item["item"] ? item["item"] : responseItemUnionDeserializer(item["item"]),
  };
}

/**
 * Returned when an Item is done streaming. Also emitted when a Response is
 * interrupted, incomplete, or cancelled.
 */
export interface ServerEventResponseOutputItemDone extends ServerEvent {
  /** The event type, must be `response.output_item.done`. */
  type: "response.output_item.done";
  /** The ID of the Response to which the item belongs. */
  responseId: string;
  /** The index of the output item in the Response. */
  outputIndex: number;
  item?: ResponseItemUnion;
}

export function serverEventResponseOutputItemDoneDeserializer(
  item: any,
): ServerEventResponseOutputItemDone {
  return {
    type: item["type"],
    eventId: item["event_id"],
    responseId: item["response_id"],
    outputIndex: item["output_index"],
    item: !item["item"] ? item["item"] : responseItemUnionDeserializer(item["item"]),
  };
}

/**
 * Returned when a new content part is added to an assistant message item during
 * response generation.
 */
export interface ServerEventResponseContentPartAdded extends ServerEvent {
  /** The event type, must be `response.content_part.added`. */
  type: "response.content_part.added";
  /** The ID of the response. */
  responseId: string;
  /** The ID of the item to which the content part was added. */
  itemId: string;
  /** The index of the output item in the response. */
  outputIndex: number;
  /** The index of the content part in the item's content array. */
  contentIndex: number;
  /** The content part that was added. */
  part: ContentPartUnion;
}

export function serverEventResponseContentPartAddedDeserializer(
  item: any,
): ServerEventResponseContentPartAdded {
  return {
    type: item["type"],
    eventId: item["event_id"],
    responseId: item["response_id"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
    part: contentPartUnionDeserializer(item["part"]),
  };
}

/**
 * Returned when a content part is done streaming in an assistant message item.
 * Also emitted when a Response is interrupted, incomplete, or cancelled.
 */
export interface ServerEventResponseContentPartDone extends ServerEvent {
  /** The event type, must be `response.content_part.done`. */
  type: "response.content_part.done";
  /** The ID of the response. */
  responseId: string;
  /** The ID of the item. */
  itemId: string;
  /** The index of the output item in the response. */
  outputIndex: number;
  /** The index of the content part in the item's content array. */
  contentIndex: number;
  /** The content part that is done. */
  part: ContentPartUnion;
}

export function serverEventResponseContentPartDoneDeserializer(
  item: any,
): ServerEventResponseContentPartDone {
  return {
    type: item["type"],
    eventId: item["event_id"],
    responseId: item["response_id"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
    part: contentPartUnionDeserializer(item["part"]),
  };
}

/** Returned when the text value of a "text" content part is updated. */
export interface ServerEventResponseTextDelta extends ServerEvent {
  /** The event type, must be `response.text.delta`. */
  type: "response.text.delta";
  /** The ID of the response. */
  responseId: string;
  /** The ID of the item. */
  itemId: string;
  /** The index of the output item in the response. */
  outputIndex: number;
  /** The index of the content part in the item's content array. */
  contentIndex: number;
  /** The text delta. */
  delta: string;
}

export function serverEventResponseTextDeltaDeserializer(item: any): ServerEventResponseTextDelta {
  return {
    type: item["type"],
    eventId: item["event_id"],
    responseId: item["response_id"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
    delta: item["delta"],
  };
}

/**
 * Returned when the text value of a "text" content part is done streaming. Also
 * emitted when a Response is interrupted, incomplete, or cancelled.
 */
export interface ServerEventResponseTextDone extends ServerEvent {
  /** The event type, must be `response.text.done`. */
  type: "response.text.done";
  /** The ID of the response. */
  responseId: string;
  /** The ID of the item. */
  itemId: string;
  /** The index of the output item in the response. */
  outputIndex: number;
  /** The index of the content part in the item's content array. */
  contentIndex: number;
  /** The final text content. */
  text: string;
}

export function serverEventResponseTextDoneDeserializer(item: any): ServerEventResponseTextDone {
  return {
    type: item["type"],
    eventId: item["event_id"],
    responseId: item["response_id"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
    text: item["text"],
  };
}

/** Returned when the model-generated transcription of audio output is updated. */
export interface ServerEventResponseAudioTranscriptDelta extends ServerEvent {
  /** The event type, must be `response.audio_transcript.delta`. */
  type: "response.audio_transcript.delta";
  /** The ID of the response. */
  responseId: string;
  /** The ID of the item. */
  itemId: string;
  /** The index of the output item in the response. */
  outputIndex: number;
  /** The index of the content part in the item's content array. */
  contentIndex: number;
  /** The transcript delta. */
  delta: string;
}

export function serverEventResponseAudioTranscriptDeltaDeserializer(
  item: any,
): ServerEventResponseAudioTranscriptDelta {
  return {
    type: item["type"],
    eventId: item["event_id"],
    responseId: item["response_id"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
    delta: item["delta"],
  };
}

/**
 * Returned when the model-generated transcription of audio output is done
 * streaming. Also emitted when a Response is interrupted, incomplete, or
 * cancelled.
 */
export interface ServerEventResponseAudioTranscriptDone extends ServerEvent {
  /** The event type, must be `response.audio_transcript.done`. */
  type: "response.audio_transcript.done";
  /** The ID of the response. */
  responseId: string;
  /** The ID of the item. */
  itemId: string;
  /** The index of the output item in the response. */
  outputIndex: number;
  /** The index of the content part in the item's content array. */
  contentIndex: number;
  /** The final transcript of the audio. */
  transcript: string;
}

export function serverEventResponseAudioTranscriptDoneDeserializer(
  item: any,
): ServerEventResponseAudioTranscriptDone {
  return {
    type: item["type"],
    eventId: item["event_id"],
    responseId: item["response_id"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
    transcript: item["transcript"],
  };
}

/** Returned when the model-generated audio is updated. */
export interface ServerEventResponseAudioDelta extends ServerEvent {
  /** The event type, must be `response.audio.delta`. */
  type: "response.audio.delta";
  /** The ID of the response. */
  responseId: string;
  /** The ID of the item. */
  itemId: string;
  /** The index of the output item in the response. */
  outputIndex: number;
  /** The index of the content part in the item's content array. */
  contentIndex: number;
  /** Base64-encoded audio data delta. */
  delta: Uint8Array;
}

export function serverEventResponseAudioDeltaDeserializer(
  item: any,
): ServerEventResponseAudioDelta {
  return {
    type: item["type"],
    eventId: item["event_id"],
    responseId: item["response_id"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
    delta:
      typeof item["delta"] === "string"
        ? stringToUint8Array(item["delta"], "base64")
        : item["delta"],
  };
}

/**
 * Returned when the model-generated audio is done. Also emitted when a Response
 * is interrupted, incomplete, or cancelled.
 */
export interface ServerEventResponseAudioDone extends ServerEvent {
  /** The event type, must be `response.audio.done`. */
  type: "response.audio.done";
  /** The ID of the response. */
  responseId: string;
  /** The ID of the item. */
  itemId: string;
  /** The index of the output item in the response. */
  outputIndex: number;
  /** The index of the content part in the item's content array. */
  contentIndex: number;
}

export function serverEventResponseAudioDoneDeserializer(item: any): ServerEventResponseAudioDone {
  return {
    type: item["type"],
    eventId: item["event_id"],
    responseId: item["response_id"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
  };
}

/** Represents a delta update of blendshape animation frames for a specific output of a response. */
export interface ServerEventResponseAnimationBlendshapeDelta extends ServerEvent {
  type: "response.animation_blendshapes.delta";
  responseId: string;
  itemId: string;
  outputIndex: number;
  contentIndex: number;
  frames: number[][] | string;
  frameIndex: number;
}

export function serverEventResponseAnimationBlendshapeDeltaDeserializer(
  item: any,
): ServerEventResponseAnimationBlendshapeDelta {
  return {
    type: item["type"],
    eventId: item["event_id"],
    responseId: item["response_id"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
    frames: _serverEventResponseAnimationBlendshapeDeltaFramesDeserializer(item["frames"]),
    frameIndex: item["frame_index"],
  };
}

/** Alias for _ServerEventResponseAnimationBlendshapeDeltaFrames */
export type _ServerEventResponseAnimationBlendshapeDeltaFrames = number[][] | string;

export function _serverEventResponseAnimationBlendshapeDeltaFramesDeserializer(
  item: any,
): _ServerEventResponseAnimationBlendshapeDeltaFrames {
  return item;
}

/** Indicates the completion of blendshape animation processing for a specific output of a response. */
export interface ServerEventResponseAnimationBlendshapeDone extends ServerEvent {
  type: "response.animation_blendshapes.done";
  responseId: string;
  itemId: string;
  outputIndex: number;
}

export function serverEventResponseAnimationBlendshapeDoneDeserializer(
  item: any,
): ServerEventResponseAnimationBlendshapeDone {
  return {
    type: item["type"],
    eventId: item["event_id"],
    responseId: item["response_id"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
  };
}

/** Represents a word-level audio timestamp delta for a response. */
export interface ServerEventResponseAudioTimestampDelta extends ServerEvent {
  type: "response.audio_timestamp.delta";
  responseId: string;
  itemId: string;
  outputIndex: number;
  contentIndex: number;
  audioOffsetMs: number;
  audioDurationMs: number;
  text: string;
  timestampType: "word";
}

export function serverEventResponseAudioTimestampDeltaDeserializer(
  item: any,
): ServerEventResponseAudioTimestampDelta {
  return {
    type: item["type"],
    eventId: item["event_id"],
    responseId: item["response_id"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
    audioOffsetMs: item["audio_offset_ms"],
    audioDurationMs: item["audio_duration_ms"],
    text: item["text"],
    timestampType: item["timestamp_type"],
  };
}

/** Indicates completion of audio timestamp delivery for a response. */
export interface ServerEventResponseAudioTimestampDone extends ServerEvent {
  type: "response.audio_timestamp.done";
  responseId: string;
  itemId: string;
  outputIndex: number;
  contentIndex: number;
}

export function serverEventResponseAudioTimestampDoneDeserializer(
  item: any,
): ServerEventResponseAudioTimestampDone {
  return {
    type: item["type"],
    eventId: item["event_id"],
    responseId: item["response_id"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
  };
}

/** Represents a viseme ID delta update for animation based on audio. */
export interface ServerEventResponseAnimationVisemeDelta extends ServerEvent {
  type: "response.animation_viseme.delta";
  responseId: string;
  itemId: string;
  outputIndex: number;
  contentIndex: number;
  audioOffsetMs: number;
  visemeId: number;
}

export function serverEventResponseAnimationVisemeDeltaDeserializer(
  item: any,
): ServerEventResponseAnimationVisemeDelta {
  return {
    type: item["type"],
    eventId: item["event_id"],
    responseId: item["response_id"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
    audioOffsetMs: item["audio_offset_ms"],
    visemeId: item["viseme_id"],
  };
}

/** Indicates completion of viseme animation delivery for a response. */
export interface ServerEventResponseAnimationVisemeDone extends ServerEvent {
  type: "response.animation_viseme.done";
  responseId: string;
  itemId: string;
  outputIndex: number;
  contentIndex: number;
}

export function serverEventResponseAnimationVisemeDoneDeserializer(
  item: any,
): ServerEventResponseAnimationVisemeDone {
  return {
    type: item["type"],
    eventId: item["event_id"],
    responseId: item["response_id"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    contentIndex: item["content_index"],
  };
}

/** Returned when the text value of an input audio transcription content part is updated. */
export interface ServerEventConversationItemInputAudioTranscriptionDelta extends ServerEvent {
  /** The event type, must be `conversation.item.input_audio_transcription.delta`. */
  type: "conversation.item.input_audio_transcription.delta";
  /** The ID of the item. */
  itemId: string;
  /** The index of the content part in the item's content array. */
  contentIndex?: number;
  /** The text delta. */
  delta?: string;
  /** The log probabilities of the transcription. */
  logprobs?: LogProbProperties[];
}

export function serverEventConversationItemInputAudioTranscriptionDeltaDeserializer(
  item: any,
): ServerEventConversationItemInputAudioTranscriptionDelta {
  return {
    type: item["type"],
    eventId: item["event_id"],
    itemId: item["item_id"],
    contentIndex: item["content_index"],
    delta: item["delta"],
    logprobs: !item["logprobs"]
      ? item["logprobs"]
      : logProbPropertiesArrayDeserializer(item["logprobs"]),
  };
}

export function logProbPropertiesArrayDeserializer(result: Array<LogProbProperties>): any[] {
  return result.map((item) => {
    return logProbPropertiesDeserializer(item);
  });
}

/** Returned when a conversation item is retrieved with `conversation.item.retrieve`. */
export interface ServerEventConversationItemRetrieved extends ServerEvent {
  /** The event type, must be `conversation.item.retrieved`. */
  type: "conversation.item.retrieved";
  item?: ResponseItemUnion;
  eventId?: string;
}

export function serverEventConversationItemRetrievedDeserializer(
  item: any,
): ServerEventConversationItemRetrieved {
  return {
    type: item["type"],
    eventId: item["event_id"],
    item: !item["item"] ? item["item"] : responseItemUnionDeserializer(item["item"]),
  };
}

/** Returned when the model-generated function call arguments are updated. */
export interface ServerEventResponseFunctionCallArgumentsDelta extends ServerEvent {
  /** The event type, must be `response.function_call_arguments.delta`. */
  type: "response.function_call_arguments.delta";
  /** The ID of the response. */
  responseId: string;
  /** The ID of the function call item. */
  itemId: string;
  /** The index of the output item in the response. */
  outputIndex: number;
  /** The ID of the function call. */
  callId: string;
  /** The arguments delta as a JSON string. */
  delta: string;
}

export function serverEventResponseFunctionCallArgumentsDeltaDeserializer(
  item: any,
): ServerEventResponseFunctionCallArgumentsDelta {
  return {
    type: item["type"],
    eventId: item["event_id"],
    responseId: item["response_id"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    callId: item["call_id"],
    delta: item["delta"],
  };
}

/**
 * Returned when the model-generated function call arguments are done streaming.
 * Also emitted when a Response is interrupted, incomplete, or cancelled.
 */
export interface ServerEventResponseFunctionCallArgumentsDone extends ServerEvent {
  /** The event type, must be `response.function_call_arguments.done`. */
  type: "response.function_call_arguments.done";
  /** The ID of the response. */
  responseId: string;
  /** The ID of the function call item. */
  itemId: string;
  /** The index of the output item in the response. */
  outputIndex: number;
  /** The ID of the function call. */
  callId: string;
  /** The final arguments as a JSON string. */
  arguments: string;
  /** The name of the function call. */
  name: string;
}

export function serverEventResponseFunctionCallArgumentsDoneDeserializer(
  item: any,
): ServerEventResponseFunctionCallArgumentsDone {
  return {
    type: item["type"],
    eventId: item["event_id"],
    responseId: item["response_id"],
    itemId: item["item_id"],
    outputIndex: item["output_index"],
    callId: item["call_id"],
    arguments: item["arguments"],
    name: item["name"],
  };
}
