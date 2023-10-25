// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationIdentifier,
  CommunicationUserIdentifier,
  MicrosoftTeamsUserIdentifier,
  PhoneNumberIdentifier,
} from "@azure/communication-common";
import { CallConnectionStateModel } from "../generated/src";

export {
  CallConnectionStateModel,
  CallRejectReason,
  KnownCallRejectReason,
  KnownMediaStreamingAudioChannelType,
  KnownMediaStreamingContentType,
  KnownMediaStreamingTransportType,
  MediaStreamingAudioChannelType,
  MediaStreamingConfiguration,
  MediaStreamingContentType,
  MediaStreamingTransportType,
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
  /** SubscriptionId for media streaming */
  mediaSubscriptionId?: string;
  /** The correlation ID. */
  correlationId?: string;
  /** Identity of the answering entity. Only populated when identity is provided in the request. */
  answeredby?: CommunicationUserIdentifier;
}

/** Contract model of an ACS call participant */
export interface CallParticipant {
  /** Communication identifier of the participant */
  identifier?: CommunicationIdentifier;
  /** Is participant muted */
  isMuted?: boolean;
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
  playsourcacheid?: string;
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
  /** The Target's PhoneNumberIdentifier, CommunicationUserIdentifier or MicrosoftTeamsUserIdentifier. */
  readonly targetParticipant:
    | PhoneNumberIdentifier
    | CommunicationUserIdentifier
    | MicrosoftTeamsUserIdentifier;
  /** Caller's phone number identifier. */
  readonly sourceCallIdNumber?: PhoneNumberIdentifier;
  sourceDisplayName?: string;
  /** Used by customer to send custom context to targets. */
  customContext?: CustomContext;
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
export type RecordingStorage = "acs" | "blobStorage";

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

interface CustomContextHeader {
  key: string;
  value: string;
}

/** SIPCustomHeader */
export interface SIPCustomHeader extends CustomContextHeader {}

/** SIPUserToUserHeader */
export interface SIPUserToUserHeader extends CustomContextHeader {}

/** VoipHeader */
export interface VoipHeader extends CustomContextHeader {}

/** Custom Context SIP header */
export class SIPCustomHeader implements CustomContextHeader {
  // Create a new SIP custom header.
  constructor(key: string, value: string) {
    this.key = "X-MS-Custom-" + key;
    this.value = value;
  }
}

/** Custom Context SIP User-to-User header */
export class SIPUserToUserHeader implements CustomContextHeader {
  // Create a new SIP UUI header.
  constructor(value: string) {
    this.key = "User-to-User";
    this.value = value;
  }
}

/** Custom Context VOIP header */
export class VoipHeader implements CustomContextHeader {
  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}

/** Custom Context */
export class CustomContext {
  /** Dictionary of VOIP headers. */
  public voipHeaders: { [key: string]: string };

  /** Dictionary of SIP headers. */
  public sipHeaders: { [key: string]: string };

  // Creates a new CustomContext.
  constructor(sipHeaders: { [key: string]: string }, voipHeaders: { [key: string]: string }) {
    this.sipHeaders = sipHeaders;
    this.voipHeaders = voipHeaders;
  }

  /** Add a custom context sip or voip header. */
  public add(header: CustomContextHeader): void {
    if (header instanceof SIPUserToUserHeader) {
      if (this.sipHeaders == null) {
        throw new Error("Cannot add sip header, SipHeaders is null.");
      }
      this.sipHeaders[header.key] = header.value;
    } else if (header instanceof SIPCustomHeader) {
      if (this.sipHeaders == null) {
        throw new Error("Cannot add sip header, SipHeaders is null.");
      }
      this.sipHeaders[header.key] = header.value;
    } else if (header instanceof VoipHeader) {
      if (this.voipHeaders == null) {
        throw new Error("Cannot add voip header, VoipHeaders is null");
      }
      this.voipHeaders[header.key] = header.value;
    } else {
      throw new Error("Unknown custom context header type.");
    }
  }
}
