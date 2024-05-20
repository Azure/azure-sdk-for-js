// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationIdentifier,
  CommunicationUserIdentifier,
  MicrosoftTeamsUserIdentifier,
  MicrosoftTeamsAppIdentifier,
  PhoneNumberIdentifier,
} from "@azure/communication-common";
import {
  CallConnectionStateModel,
  MediaStreamingSubscription,
  TranscriptionSubscription,
} from "../generated/src";

export {
  CallConnectionStateModel,
  CallRejectReason,
  KnownCallRejectReason,
  KnownMediaStreamingAudioChannelType,
  KnownMediaStreamingContentType,
  KnownMediaStreamingTransportType,
  MediaStreamingAudioChannelType,
  MediaStreamingOptions,
  MediaStreamingContentType,
  MediaStreamingTransportType,
  MediaStreamingSubscription,
  TranscriptionOptions,
  TranscriptionTransportType,
  TranscriptionSubscription,
  RecognitionType,
  ChoiceResult,
  DtmfResult,
  SpeechResult,
  RecordingState,
  Tone,
} from "../generated/src/models/index";

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
  /** Subscription for media streaming */
  mediaStreamingSubscription?: MediaStreamingSubscription;
  /** Subscription for transcription */
  transcriptionSubscription?: TranscriptionSubscription;
  /** The correlation ID. */
  correlationId?: string;
  /** Identity of the answering entity. Only populated when identity is provided in the request. */
  answeredby?: CommunicationUserIdentifier;
  /** Identity of the original Pstn target of an incoming Call. Only populated when the original target is a Pstn number. */
  answeredFor?: PhoneNumberIdentifier;
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
  /** Choices */
  Choices = "choices",
}

/** Call invitee details. */
export interface CallInvite {
  /** The Target's PhoneNumberIdentifier, CommunicationUserIdentifier, MicrosoftTeamsUserIdentifier or MicrosoftTeamsAppIdentifier. */
  readonly targetParticipant:
    | PhoneNumberIdentifier
    | CommunicationUserIdentifier
    | MicrosoftTeamsUserIdentifier
    | MicrosoftTeamsAppIdentifier;
  /** Caller's phone number identifier. */
  readonly sourceCallIdNumber?: PhoneNumberIdentifier;
  sourceDisplayName?: string;
  /** Used by customer to send custom context to targets. */
  customCallingContext?: CustomCallingContext;
}

/** The locator type of a call. */
export type CallLocatorType = "serverCallLocator" | "groupCallLocator";

/** The content type of a call recording. */
export type RecordingContent = "audio" | "audioVideo";

/** The channel type of a call recording. */
export type RecordingChannel = "mixed" | "unmixed";

/** The format type of a call recording. */
export type RecordingFormat = "mp3" | "mp4" | "wav";

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
}

/** Custom Calling Context */
export type CustomCallingContext = (VoipHeader | SipUserToUserHeader | SipCustomHeader)[];

/** AI options for the call. */
export interface CallIntelligenceOptions {
  /** The identifier of the Cognitive Service resource assigned to this call. */
  cognitiveServicesEndpoint?: string;
}
