// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CommunicationIdentifier,
  CommunicationUserIdentifier,
  MicrosoftTeamsUserIdentifier,
  MicrosoftTeamsAppIdentifier,
  PhoneNumberIdentifier,
  TeamsExtensionUserIdentifier,
} from "@azure/communication-common";
import type {
  CallConnectionStateModel,
  MediaStreamingSubscription,
  TranscriptionSubscription,
  MediaStreamingAudioChannelType,
  MediaStreamingContentType,
  AudioFormat,
  RedactionType,
} from "../generated/src/index.js";

export {
  CallConnectionStateModel,
  CallRejectReason,
  KnownCallRejectReason,
  KnownMediaStreamingAudioChannelType,
  KnownMediaStreamingContentType,
  KnownStreamingTransportType,
  RecognitionType,
  ChoiceResult,
  DtmfResult,
  SpeechResult,
  RecordingState,
  Tone,
  MediaStreamingAudioChannelType,
  MediaStreamingContentType,
  AudioFormat,
  TranscriptionUpdate,
  MediaStreamingUpdate,
} from "../generated/src/models/index.js";

/** Properties of a call connection */
export interface CallConnectionProperties {
  /** The call connection id. */
  callConnectionId?: string;
  /** The server call id. */
  serverCallId?: string;
  /**
   * The source caller Id, a phone number, that's shown to the PSTN participant being invited.
   * Required only when calling a PSTN callee.
   */
  sourceCallerIdNumber?: PhoneNumberIdentifier;
  /** Display name of the call if dialing out to a pstn number. */
  sourceDisplayName?: string;
  /** Source identity. */
  source?: CommunicationIdentifier;
  /** The targets of the call. */
  targetParticipants?: CommunicationIdentifier[];
  /** The state of the call connection. */
  callConnectionState?: CallConnectionStateModel;
  /** The callback URL. */
  callbackUrl?: string;
  /** The correlation ID. */
  correlationId?: string;
  /** Identity of the answering entity. Only populated when identity is provided in the request. */
  answeredby?: CommunicationUserIdentifier;
  /** Identity of the original Pstn target of an incoming Call. Only populated when the original target is a Pstn number. */
  answeredFor?: PhoneNumberIdentifier;
  /** Media streaming subscription */
  mediaStreamingSubscription?: MediaStreamingSubscription;
  /** Transcription Subscription. */
  transcriptionSubscription?: TranscriptionSubscription;
}

/** Contract model of an ACS call participant */
export interface CallParticipant {
  /** Communication identifier of the participant */
  identifier?: CommunicationIdentifier;
  /** Is participant muted */
  isMuted?: boolean;
  /** Is participant on hold. */
  isOnHold?: boolean;
}

/** The locator used for joining or taking action on a call. */
export interface CallLocator {
  id: string;
  kind: CallLocatorType;
}

/** Defines values for VoiceKind that the service accepts. */
export enum VoiceKind {
  /** Male */
  Male = "male",
  /** Female */
  Female = "female",
}

/** The PlaySource model. */
export interface PlaySource {
  /** @deprecated Not in use, instead use playsourcecacheid for similar functionality*/
  playsourcacheid?: string;
  /** Sets the play source cache id.*/
  playSourceCacheId?: string;
}

/** The FileSource model. */
export interface FileSource extends PlaySource {
  url: string;
  readonly kind: "fileSource";
}

/** The TextSource model. */
export interface TextSource extends PlaySource {
  text: string;
  sourceLocale?: string;
  voiceKind?: VoiceKind;
  voiceName?: string;
  customVoiceEndpointId?: string;
  readonly kind: "textSource";
}

/** The SsmlSource model. */
export interface SsmlSource extends PlaySource {
  ssmlText: string;
  customVoiceEndpointId?: string;
  readonly kind: "ssmlSource";
}

/** A Dtmf Tone. */
export enum DtmfTone {
  /** Zero */
  Zero = "zero",
  /** One */
  One = "one",
  /** Two */
  Two = "two",
  /** Three */
  Three = "three",
  /** Four */
  Four = "four",
  /** Five */
  Five = "five",
  /** Six */
  Six = "six",
  /** Seven */
  Seven = "seven",
  /** Eight */
  Eight = "eight",
  /** Nine */
  Nine = "nine",
  /** A */
  A = "a",
  /** B */
  B = "b",
  /** C */
  C = "c",
  /** D */
  D = "d",
  /** Pound */
  Pound = "pound",
  /** Asterisk */
  Asterisk = "asterisk",
}

/** A Recognition Choice */
export interface RecognitionChoice {
  /** Identifier for a given choice */
  label: string;
  /** List of phrases to recognize */
  phrases: string[];
  tone?: DtmfTone;
}

/** The type of the recognition that the service accepts. */
export enum RecognizeInputType {
  /** Dtmf */
  Dtmf = "dtmf",
}

/** Call invitee details. */
export interface CallInvite {
  /** The Target's PhoneNumberIdentifier, CommunicationUserIdentifier, MicrosoftTeamsUserIdentifier, MicrosoftTeamsAppIdentifier or TeamsExtensionUserIdentifier. */
  readonly targetParticipant:
    | PhoneNumberIdentifier
    | CommunicationUserIdentifier
    | MicrosoftTeamsUserIdentifier
    | MicrosoftTeamsAppIdentifier
    | TeamsExtensionUserIdentifier;
  /** Caller's phone number identifier. */
  readonly sourceCallIdNumber?: PhoneNumberIdentifier;
  sourceDisplayName?: string;
  /** Used by customer to send custom context to targets. */
  customCallingContext?: CustomCallingContext;
}

/** The locator type of a call. */
export type CallLocatorType = "serverCallLocator" | "groupCallLocator" | "roomCallLocator";

/** The content type of a call recording. */
export type RecordingContent = "audio" | "audioVideo";

/** The channel type of a call recording. */
export type RecordingChannel = "mixed" | "unmixed";

/** The format type of a call recording. */
export type RecordingFormat = "mp3" | "mp4" | "wav";

/** The format type of a call recording. */
export type RecordingKind = "azureCommunicationServices" | "teams" | "teamsCompliance";

/** The storage type of a call recording. */
export type RecordingStorageKind = "azureCommunicationServices" | "azureBlobStorage";

/** Channel affinity for a participant */
export interface ChannelAffinity {
  /** Channel number to which bitstream from a particular participant will be written. */
  channel?: number;
  /**
   * The identifier for the participant whose bitstream will be written to the channel
   * represented by the channel number.
   */
  targetParticipant: CommunicationIdentifier;
}

/** The recording storage */
export interface RecordingStorage {
  /** Defines the kind of recording storage */
  recordingStorageKind: RecordingStorageKind;
  /** Uri of a container or a location within a container */
  recordingDestinationContainerUrl?: string;
}

interface CustomCallingContextHeader {
  key: string;
  value: string;
}

/** VOIP header. */
export interface VoipHeader extends CustomCallingContextHeader {
  kind: "voip";
}

/** SIP User To User header. */
export interface SipUserToUserHeader extends CustomCallingContextHeader {
  kind: "sipuui";
}

/** SIP Custom header. */
export interface SipCustomHeader extends CustomCallingContextHeader {
  kind: "sipx";
  sipHeaderPrefix?: SipHeaderPrefix;
}

/** The type of the Sip header prefix. */
export type SipHeaderPrefix = "X-" | "X-MS-Custom-";

/** Custom Calling Context */
export type CustomCallingContext = (
  | VoipHeader
  | SipUserToUserHeader
  | SipCustomHeader
  | TeamsPhoneCallDetails
)[];

/** AI options for the call. */
export interface CallIntelligenceOptions {
  /** The identifier of the Cognitive Service resource assigned to this call. */
  cognitiveServicesEndpoint?: string;
}

/** Options for media streaming. */
export interface MediaStreamingOptions {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  transportType: "websocket";
  /** The audio channel type to stream, e.g., unmixed audio, mixed audio. */
  audioChannelType: MediaStreamingAudioChannelType;
  /** The transport URL for media streaming. */
  transportUrl?: string;
  contentType?: MediaStreamingContentType;
  /** A value indicating whether the media streaming should start immediately after the call is answered. */
  startMediaStreaming?: boolean;
  /** A value indicating whether bidirectional streaming is enabled. */
  enableBidirectional?: boolean;
  /** The audio format used for encoding, including sample rate and channel type. The default is Pcm16KMono. */
  audioFormat?: AudioFormat;
  /** A value that indicates whether to stream the DTMF tones. */
  enableDtmfTones?: boolean;
}

/** Options for media streaming. */
export interface TranscriptionOptions {
  /** Specifies the Locale used for transcription, e.g., en-CA or en-AU. */
  locale?: string;
  /** Polymorphic discriminator, which specifies the different types this object can be */
  transportType: "websocket";
  /** The URL used for live transcription transport. */
  transportUrl?: string;
  /** The ID of the deployed custom model in GUID format. The GUID is generated by Azure Speech Studio, e.g., a259c255-1cdw-4ed7-a693-dd58563b6f6a. */
  speechModelEndpointId?: string;
  /** Indicates whether the transcription should start immediately after the call is answered. */
  startTranscription?: boolean;
  /** Enables intermediate results for the transcribed speech. */
  enableIntermediateResults?: boolean;
  /** PII redaction configuration options. */
  piiRedactionOptions?: PiiRedactionOptions;
  /** Indicating if sentiment analysis should be enabled. */
  enableSentimentAnalysis?: boolean;
  /**
   * List of locales for Language Identification.
   * Supports upto 4 locales in the format: ["en-us", "fr-fr", "hi-in"] etc.
   */
  locales?: string[];
  /** Summarization configuration options. */
  summarizationOptions?: SummarizationOptions;
}

/** PII redaction configuration options. */
export interface PiiRedactionOptions {
  /** Value indicating if PII redaction is enabled. */
  enable?: boolean;
  /** Value indicating the PII redaction type to be used. */
  redactionType?: RedactionType;
}

/** Configuration options for call summarization. */
export interface SummarizationOptions {
  /** Indicating whether end call summary should be enabled. */
  enableEndCallSummary?: boolean;
  /** Locale for summarization (e.g., en-US). */
  locale?: string;
}

/** Teams phone call details */
export interface TeamsPhoneCallDetails {
  kind: "teamsPhoneCallDetails";
  /** Container for details relating to the original caller of the call */
  teamsPhoneCallerDetails?: TeamsPhoneCallerDetails;
  /** Container for details relating to the entity responsible for the creation of these call details */
  teamsPhoneSourceDetails?: TeamsPhoneSourceDetails;
  /** Id to exclusively identify this call session. IVR will use this for their telemetry/reporting. */
  sessionId?: string;
  /** The intent of the call */
  intent?: string;
  /** A very short description (max 48 chars) of the reason for the call. To be displayed in Teams CallNotification */
  callTopic?: string;
  /** A summary of the call thus far. It will be displayed on a side panel in the Teams UI */
  callContext?: string;
  /** Url for fetching the transcript of the call */
  transcriptUrl?: string;
  /** Sentiment of the call thus far */
  callSentiment?: string;
  /** Recommendations for resolving the issue based on the customer's intent and interaction history */
  suggestedActions?: string;
}

/** Container for details relating to the original caller of the call */
export interface TeamsPhoneCallerDetails {
  /** Caller's ID */
  caller: CommunicationIdentifier;
  /** Caller's name */
  name: string;
  /** Caller's phone number */
  phoneNumber: string;
  /** Caller's record ID (ex in CRM) */
  recordId?: string;
  /** Caller's screen pop URL */
  screenPopUrl?: string;
  /** Flag indicating whether the caller was authenticated */
  isAuthenticated?: boolean;
  /** A set of key value pairs (max 10, any additional entries would be ignored) which a bot author wants to pass to the Teams Client for display to the agent */
  additionalCallerInformation?:  Record<string, string>;
}

/** Container for details relating to the entity responsible for the creation of these call details */
export interface TeamsPhoneSourceDetails {
  /** ID of the source entity passing along the call details (ex. Application Instance ID of - CQ/AA) */
  source: CommunicationIdentifier;
  /** Language of the source entity passing along the call details, passed in the ISO-639 standard */
  language: string;
  /** Status of the source entity passing along the call details */
  status: string;
  /** Intended targets of the source entity passing along the call details */
  intendedTargets?: Record<string, CommunicationIdentifier>;
}
