// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PhoneNumberIdentifier, CommunicationIdentifier } from "@azure/communication-common";
import { OperationOptions } from "@azure/core-client";
import {
  MediaStreamingConfiguration,
  CallRejectReason,
  RecognizeInputType,
  FileSource,
  DtmfTone,
  RecordingContent,
  RecordingChannel,
  RecordingFormat,
  RecordingStorage,
  CallLocator,
} from "./models";

/** Options to configure the recognize operation. */
export interface CallMediaRecognizeOptions extends OperationOptions {
  recognizeInputType: RecognizeInputType;
  playPrompt?: FileSource;
  interruptCallMediaOperation?: boolean;
  stopCurrentOperations?: boolean;
  operationContext?: string;
  interruptPrompt?: boolean;
  initialSilenceTimeoutInSeconds?: number;
  targetParticipant: CommunicationIdentifier;
}

/** The recognize configuration specific to Dtmf. */
export interface CallMediaRecognizeDtmfOptions extends CallMediaRecognizeOptions {
  interToneTimeoutInSeconds?: number;
  maxTonesToCollect: number;
  stopDtmfTones?: DtmfTone[];
  readonly kind?: "callMediaRecognizeDtmfOptions";
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
  /** Headers for SIP calls */
  sipHeaders?: { [propertyName: string]: string };
  /** Headers for VOIP calls */
  voipHeaders?: { [propertyName: string]: string };
}

/**
 * Options to answer a call.
 */
export interface AnswerCallOptions extends OperationOptions {
  /** The Azure cognitive services end point url. */
  azureCognitiveServicesEndpointUrl?: string;
  /** Configuration of Media streaming. */
  mediaStreamingConfiguration?: MediaStreamingConfiguration;
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
}

/**
 * Options to remove participants.
 */
export interface RemoveParticipantsOptions extends OperationOptions {
  /** Used by customers when calling mid-call actions to correlate the request to the response event. */
  operationContext?: string;
}

/**
 * Options to play audio.
 */
export interface PlayOptions extends OperationOptions {
  loop?: boolean;
  operationContext?: string;
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
  /** The uri to send notifications to. */
  recordingStateCallbackEndpoint?: string;
  /** The content type of call recording. */
  recordingContent?: RecordingContent;
  /** The channel type of call recording. */
  recordingChannel?: RecordingChannel;
  /** The format type of call recording. */
  recordingFormat?: RecordingFormat;
  /**
   * The sequential order in which audio channels are assigned to participants in the unmixed recording.
   * When 'recordingChannelType' is set to 'unmixed' and `audioChannelParticipantOrdering` is not specified,
   * the audio channel to participant mapping will be automatically assigned based on the order in which participant
   * first audio was detected.  Channel to participant mapping details can be found in the metadata of the recording.
   */
  audioChannelParticipantOrdering?: CommunicationIdentifier[];
  /** Recording storage mode. `External` enables bring your own storage. */
  recordingStorageType?: RecordingStorage;
  /** The location where recording is stored, when RecordingStorageType is set to 'BlobStorage'. */
  externalStorageLocation?: string;
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
