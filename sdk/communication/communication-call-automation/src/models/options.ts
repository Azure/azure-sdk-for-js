// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PhoneNumberIdentifier, CommunicationIdentifier } from "@azure/communication-common";
import { OperationOptions } from "@azure/core-client";
import {
  MediaStreamingConfiguration,
  CallRejectReason,
  FileSource,
  TextSource,
  SsmlSource,
  DtmfTone,
  Choice,
  RecordingContent,
  RecordingChannel,
  RecordingFormat,
  CallLocator,
  ChannelAffinity,
  CustomContext,
} from "./models";

/** Options to configure the recognize operation. */
export interface CallMediaRecognizeOptions extends OperationOptions {
  playPrompt?: FileSource | TextSource | SsmlSource;
  interruptCallMediaOperation?: boolean;
  stopCurrentOperations?: boolean;
  operationContext?: string;
  interruptPrompt?: boolean;
  initialSilenceTimeoutInSeconds?: number;
  speechModelEndpointId?: string;
  callbackUrl?: string;
}

/** The recognize configuration specific to Dtmf. */
export interface CallMediaRecognizeDtmfOptions extends CallMediaRecognizeOptions {
  /** Time to wait between DTMF inputs to stop recognizing. */
  interToneTimeoutInSeconds?: number;
  /** List of tones that will stop recognizing. */
  stopDtmfTones?: DtmfTone[];
  readonly kind: "callMediaRecognizeDtmfOptions";
}

/** The recognize configuration specific to Choices. */
export interface CallMediaRecognizeChoiceOptions extends CallMediaRecognizeOptions {
  /** The IvR choices for recognize. */
  choices: Choice[];
  readonly kind: "callMediaRecognizeChoiceOptions";
}

/** The recognize configuration specific to Speech. */
export interface CallMediaRecognizeSpeechOptions extends CallMediaRecognizeOptions {
  /** The length of end silence when user stops speaking and cogservice send response. */
  endSilenceTimeoutInMs?: number;
  readonly kind: "callMediaRecognizeSpeechOptions";
}

/** The recognize configuration for Speech or Dtmf  */
export interface CallMediaRecognizeSpeechOrDtmfOptions extends CallMediaRecognizeOptions {
  /** The length of end silence when user stops speaking and cogservice send response. */
  endSilenceTimeoutInMs?: number;
  /** Time to wait between DTMF inputs to stop recognizing. */
  interToneTimeoutInSeconds?: number;
  /** List of tones that will stop recognizing. */
  stopDtmfTones?: DtmfTone[];
  readonly kind: "callMediaRecognizeSpeechOrDtmfOptions";
}

/**
 * Options to create a call.
 */
export interface CreateCallOptions extends OperationOptions {
  /**
   * The source caller Id, a phone number, that's shown to the PSTN participant being invited.
   * Required only when calling a PSTN callee.
   */
  sourceCallIdNumber?: PhoneNumberIdentifier;
  /** Display name of the call if dialing out to a pstn number */
  sourceDisplayName?: string;
  /** The operation context. */
  operationContext?: string;
  /** The Azure cognitive services end point url. */
  azureCognitiveServicesEndpointUrl?: string;
  /** Configuration of Media streaming. */
  mediaStreamingConfiguration?: MediaStreamingConfiguration;
  /** The Custom Context. */
  customContext?: CustomContext;
}

/**
 * Options to answer a call.
 */
export interface AnswerCallOptions extends OperationOptions {
  /** The Azure cognitive services end point url. */
  azureCognitiveServicesEndpointUrl?: string;
  /** Configuration of Media streaming. */
  mediaStreamingConfiguration?: MediaStreamingConfiguration;
  /** The operation context. */
  operationContext?: string;
}

/**
 * Options to redirect call.
 */
export interface RedirectCallOptions extends OperationOptions {
  /** Headers for SIP calls */
  sipHeaders?: { [propertyName: string]: string };
  /** Headers for VOIP calls */
  voipHeaders?: { [propertyName: string]: string };
}

/**
 * Options to reject call.
 */
export interface RejectCallOptions extends OperationOptions {
  /** The rejection reason. */
  callRejectReason?: CallRejectReason;
}

/**
 * Options to transfer participants.
 */
export interface TransferCallToParticipantOptions extends OperationOptions {
  /** Used by customers when calling mid-call actions to correlate the request to the response event. */
  operationContext?: string;
  /** The Custom Context. */
  customContext?: CustomContext;
  /** Call back URI override for this request */
  callbackUrl?: string;
  /** Participant that is being transferred away */
  transferee?: CommunicationIdentifier;
}

/** Options to add participants. */
export interface AddParticipantOptions extends OperationOptions {
  /**
   * Gets or sets the timeout to wait for the invited participant to pickup.
   * The maximum value of this is 180 seconds
   */
  invitationTimeoutInSeconds?: number;
  /** Used by customers when calling mid-call actions to correlate the request to the response event. */
  operationContext?: string;
  /** Call back URI override for this request */
  callbackUrl?: string;
}

/**
 * Options to remove participants.
 */
export interface RemoveParticipantsOption extends OperationOptions {
  /** Used by customers when calling mid-call actions to correlate the request to the response event. */
  operationContext?: string;
  /** Call back URI override for this request */
  callbackUrl?: string;
}

/**
 * Options to mute participants.
 */
export interface MuteParticipantsOption extends OperationOptions {
  /** Used by customers when calling mid-call actions to correlate the request to the response event. */
  operationContext?: string;
}

/**
 * Options to play audio.
 */
export interface PlayOptions extends OperationOptions {
  /** Determine if it is looping */
  loop?: boolean;
  /** The value to identify context of the operation. */
  operationContext?: string;
  /** Call back URI override for this request */
  callbackUrl?: string;
}

/**
 * Options to get call connection properties.
 */
export type GetCallConnectionPropertiesOptions = OperationOptions;

/**
 * Options to hang up the call
 */
export type HangUpOptions = OperationOptions;

/**
 * Options to get a participant.
 */
export type GetParticipantOptions = OperationOptions;

/**
 * Options to get a start a recording.
 */
export interface StartRecordingOptions extends OperationOptions {
  /** The call locator. */
  callLocator: CallLocator;
  /** The url to send notifications to. */
  recordingStateCallbackEndpointUrl?: string;
  /** The content type of call recording. */
  recordingContent?: RecordingContent;
  /** The channel type of call recording. */
  recordingChannel?: RecordingChannel;
  /** The format type of call recording. */
  recordingFormat?: RecordingFormat;
  /** Pause on start call recording option. */
  pauseOnStart?: boolean;
  /**
   * The sequential order in which audio channels are assigned to participants in the unmixed recording.
   * When 'recordingChannelType' is set to 'unmixed' and `audioChannelParticipantOrdering` is not specified,
   * the audio channel to participant mapping will be automatically assigned based on the order in which participant
   * first audio was detected.  Channel to participant mapping details can be found in the metadata of the recording.
   */
  audioChannelParticipantOrdering?: CommunicationIdentifier[];
  /**
   * The channel affinity of call recording
   * When 'recordingChannelType' is set to 'unmixed', if channelAffinity is not specified, 'channel' will be automatically assigned.
   * Channel-Participant mapping details can be found in the metadata of the recording.
   */
  channelAffinity?: ChannelAffinity[];
}

/**
 * Options to get a stop a recording.
 */
export type StopRecordingOptions = OperationOptions;

/**
 * Options to get a pause a recording.
 */
export type PauseRecordingOptions = OperationOptions;

/**
 * Options to get recording properties.
 */
export type GetRecordingPropertiesOptions = OperationOptions;

/**
 * Options to resume recording.
 */
export type ResumeRecordingOptions = OperationOptions;

/**
 * Options to delete recording.
 */
export type DeleteRecordingOptions = OperationOptions;

/**
 * Options to download recording.
 */
export interface DownloadRecordingOptions extends OperationOptions {
  /** Offset byte to start download from. */
  offset?: number;
  /** Max content length in bytes. */
  length?: number;
}

/**
 * Options to continuous Dtmf recognition.
 */
export interface ContinuousDtmfRecognitionOptions extends OperationOptions {
  /** The value to identify context of the operation. */
  operationContext?: string;
  /** Call back URI override for this request */
  callbackUrl?: string;
}

/**
 * Options to send Dtmf tone.
 */
export interface SendDtmfOptions extends OperationOptions {
  /** The value to identify context of the operation. */
  operationContext?: string;
  /** Call back URI override for this request */
  callbackUrl?: string;
}

/** Options for cancelling add participant request. */
export interface CancelAddParticipantOptions extends OperationOptions {
  /** The value to identify context of the operation. */
  operationContext?: string;
  /** Call back URI override for this request */
  callbackUrl?: string;
}
