// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationIdentifier, PhoneNumberIdentifier } from "@azure/communication-common";
import {
  CallConnectionStateModel,
  CommunicationIdentifierModel,
  RecordingChannelType,
  RecordingContentType,
  RecordingFormatType,
  RecordingState,
  RecordingStorageType
} from "../generated/src";

export {
  CallRejectReason,
  KnownCallRejectReason,
  MediaStreamingConfiguration,
  MediaStreamingTransportType,
  MediaStreamingContentType,
  MediaStreamingAudioChannelType,
  CallConnectionStateModel,
  Gender
} from "../generated/src/models/index";

/** The caller. */
export interface CallSourceDto {
  /**
  * The source caller Id, a phone number, that's shown to the PSTN participant being invited.
  * Required only when calling a PSTN callee.
  */
  callerId?: PhoneNumberIdentifier;
  /** Display name of the call if dialing out to a pstn number */
  displayName?: string;
  /** The identifier of the source of the call */
  identifier: CommunicationIdentifier;
}

/** Properties of a call connection */
export interface CallConnectionPropertiesDto {
  /** The call connection id. */
  callConnectionId?: string;
  /** The server call id. */
  serverCallId?: string;
  /** The source of the call, which is the caller. */
  source?: CallSourceDto;
  /** The targets of the call. */
  targets?: CommunicationIdentifier[];
  /** The state of the call connection. */
  callConnectionState?: CallConnectionStateModel;
  /** The callback URI. */
  callbackUri?: string;
  /** SubscriptionId for media streaming */
  mediaSubscriptionId?: string;
}

/** Contract model of an ACS call participant */
export interface CallParticipant {
  /** Communication identifier of the participant */
  identifier?: CommunicationIdentifier;
  /** Is participant muted */
  isMuted?: boolean;
}

export interface ServerCallLocator {
  id: string;
  readonly kind?: "serverCallLocator";
}

export interface GroupCallLocator {
  id: string;
  readonly kind?: "groupCallLocator";
}

/** The request payload start for call recording operation with call locator. */
export interface StartCallRecordingRequestDto {
  /** The call locator. */
  callLocator: ServerCallLocator | GroupCallLocator;
  /** The uri to send notifications to. */
  recordingStateCallbackUri?: string;
  /** The content type of call recording. */
  recordingContentType?: RecordingContentType;
  /** The channel type of call recording. */
  recordingChannelType?: RecordingChannelType;
  /** The format type of call recording. */
  recordingFormatType?: RecordingFormatType;
  /**
   * The sequential order in which audio channels are assigned to participants in the unmixed recording.
   * When 'recordingChannelType' is set to 'unmixed' and `audioChannelParticipantOrdering is not specified,
   * the audio channel to participant mapping will be automatically assigned based on the order in which participant
   * first audio was detected.  Channel to participant mapping details can be found in the metadata of the recording.
   */
  audioChannelParticipantOrdering?: CommunicationIdentifierModel[];
  /** Recording storage mode. `External` enables bring your own storage. */
  recordingStorageType?: RecordingStorageType;
}

export interface RecordingStateResponseDto {
  recordingId?: string;
  recordingState?: RecordingState;
}

/** The PlaySource model. */
export interface PlaySource {
  playSourceId?: string;
}

/** The FileSource model. */
export interface FileSource extends PlaySource {
  uri: string;
  readonly kind?: "fileSource";
}

/** Options to configure the recognize operation. */
export interface CallMediaRecognizeOptions {
  recognizeInputType: RecognizeInputType,
  playPrompt: FileSource,
  interruptCallMediaOperation: boolean,
  stopCurrentOperations: boolean,
  operationContext: string,
  interruptPrompt: boolean,
  initialSilenceTimeoutInSeconds: number,
  targetParticipant: CommunicationIdentifier
}

/** The recognize configuration specific to Dtmf. */
export interface CallMediaRecognizeDtmfOptions extends CallMediaRecognizeOptions {
  interToneTimeoutInSeconds: number,
  maxTonesToCollect: number,
  stopDtmfTones: DtmfTone[],
  readonly kind?: "callMediaRecognizeDtmfOptions"
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
  Asterisk = "asterisk"
}

/** The type of the recognition that the service accepts. */
export enum RecognizeInputType {
  /** Dtmf */
  Dtmf = "dtmf",
  /** Choices */
  Choices = "choices"
}
