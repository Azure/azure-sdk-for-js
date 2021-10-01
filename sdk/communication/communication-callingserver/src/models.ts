// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AbortSignalLike } from "@azure/abort-controller";
import { OperationOptions, TransferProgressEvent } from "@azure/core-http";
import { PhoneNumberIdentifier } from "@azure/communication-common";
import { AddParticipantResult, CallConnectionState, CancelAllMediaOperationsResult, MicrosoftTeamsUserIdentifierModel, OperationStatus, PlayAudioResult, ResultInfo, ToneValue } from "./generated/src";

export {
  PlayAudioResult
} from "./generated/src/models";
import * as coreHttp from "@azure/core-http";


/** Known values of {@link MediaType} that the service accepts. */
export const enum MediaType {
  Audio = "audio",
  Video = "video"
}

/** Known values of {@link EventSubscriptionType} that the service accepts. */
export const enum EventSubscriptionType {
  ParticipantsUpdated = "participantsUpdated",
  DtmfReceived = "dtmfReceived"
}



/** Known values of {@link OperationStatus} that the service accepts. */
export const enum KnownOperationStatus {
  NotStarted = "notStarted",
  Running = "running",
  Completed = "completed",
  Failed = "failed"
}



/**
 * Options to create a call.
 */
export interface CreateCallConnectionOptions extends OperationOptions {
  /** The alternate identity of the source of the call if dialing out to a pstn number */
  alternateCallerId?: PhoneNumberIdentifier;
  /** The subject. */
  subject?: string;
  /** The callback URI. */
  callbackUri: string;
  /** The requested modalities. */
  requestedMediaTypes: MediaType[];
  /** The requested call events to subscribe to. */
  requestedCallEvents: EventSubscriptionType[];
}

/**
 * Options to join a call.
 */
export interface JoinCallOptions extends OperationOptions {
  /** The subject. */
  subject?: string;
  /** The callback URI. */
  callbackUri: string;
  /** The requested modalities. */
  requestedMediaTypes?: MediaType[];
  /** The requested call events to subscribe to. */
  requestedCallEvents?: EventSubscriptionType[];
}

/**
 * Options to hang up a call.
 */
export type HangUpOptions = OperationOptions;

/**
 * Options to play audio.
 */
export type PlayAudioOptions = OperationOptions;


/** The play audio result event. */
export interface PlayAudioResultEvent {
  /** The result details. */
  resultInfo?: ResultInfo;
  /** The operation context. */
  operationContext?: string;
  /** The status of the operation */
  status: OperationStatus;
}

/** The subscribe to tone event */
export interface ToneReceivedEvent {
  /** The tone info. */
  toneInfo: ToneInfo;
  /** The call connection id. */
  callConnectionId?: string;
}

export interface AddParticipantResultEvent {
  /** The result details. */
  resultInfo?: ResultInfo;
  /** The operation context. */
  operationContext?: string;
  /** The status of the operation */
  status: OperationStatus;
}

/** The call connection state changed event. */
export interface CallConnectionStateChangedEvent {
  /** The server call.id. */
  serverCallId?: string;
  /** The call connection id. */
  callConnectionId?: string;
  /** The call connection state. */
  callConnectionState: CallConnectionState;
}

/** The information about the tone. */
export interface ToneInfo {
  /** The sequence id which can be used to determine if the same tone was played multiple times or if any tones were missed. */
  sequenceId: number;
  /** The tone value. */
  tone: ToneValue;
}

/** Contains response data for the cancelAllMediaOperations operation. */
export type CallConnectionsCancelAllMediaOperationsResponse = CancelAllMediaOperationsResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: CancelAllMediaOperationsResult;
  };
};

/** Contains response data for the addParticipant operation. */
export type CallConnectionsAddParticipantResponse = AddParticipantResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: AddParticipantResult;
  };
};

/** Contains response data for the playAudio operation. */
export type CallConnectionsPlayAudioResponse = PlayAudioResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: PlayAudioResult;
  };
};

/** A phone number. */
export interface PhoneNumberIdentifierModel {
  /** The phone number in E.164 format. */
  value: string;
}

/** Identifies a participant in Azure Communication services. A participant is, for example, a phone number or an Azure communication user. This model must be interpreted as a union: Apart from rawId, at most one further property may be set. */
export interface CommunicationIdentifierModel {
  /** Raw Id of the identifier. Optional in requests, required in responses. */
  rawId?: string;
  /** The communication user. */
  communicationUser?: CommunicationUserIdentifierModel;
  /** The phone number. */
  phoneNumber?: PhoneNumberIdentifierModel;
  /** The Microsoft Teams user. */
  microsoftTeamsUser?: MicrosoftTeamsUserIdentifierModel;
}

/** A user that got created with an Azure Communication Services resource. */
export interface CommunicationUserIdentifierModel {
  /** The Id of the communication user. */
  id: string;
}

/** Known values of {@link ToneValue} that the service accepts. */
export const enum KnownToneValue {
  Tone0 = "tone0",
  Tone1 = "tone1",
  Tone2 = "tone2",
  Tone3 = "tone3",
  Tone4 = "tone4",
  Tone5 = "tone5",
  Tone6 = "tone6",
  Tone7 = "tone7",
  Tone8 = "tone8",
  Tone9 = "tone9",
  Star = "star",
  Pound = "pound",
  A = "a",
  B = "b",
  C = "c",
  D = "d",
  Flash = "flash"
}

/** Known values of {@link CallConnectionState} that the service accepts. */
export const enum KnownCallConnectionState {
  Incoming = "incoming",
  Connecting = "connecting",
  Connected = "connected",
  Disconnecting = "disconnecting",
  Disconnected = "disconnected"
}


/** Defines values for CallingServerEventType. */
export const enum CallingServerEventType {

  /** The call connection state change event type. */
  CALL_CONNECTION_STATE_CHANGED_EVENT = "Microsoft.Communication.CallConnectionStateChanged",

  /** The add participant result event type. */
  ADD_PARTICIPANT_RESULT_EVENT = "Microsoft.Communication.AddParticipantResult",

  /** The call recording state change event type. */
  CALL_RECORDING_STATE_CHANGED_EVENT = "Microsoft.Communication.CallRecordingStateChanged",

  /** The play audio result event type. */
  PLAY_AUDIO_RESULT_EVENT = "Microsoft.Communication.PlayAudioResult",

  /** The participants updated event type. */
  PARTICIPANTS_UPDATED_EVENT = "Microsoft.Communication.ParticipantsUpdated",

  /** The subscribe to tone event type. */
  TONE_RECEIVED_EVENT = "Microsoft.Communication.DtmfReceived",
}

/**
 * Options to start recording.
 */
export type StartRecordingOptions = OperationOptions;
/**
* Options to pause recording.
*/
export type PauseRecordingOptions = OperationOptions;
/**
 * Options to resume recording.
 */
export type ResumeRecordingOptions = OperationOptions;
/**
 * Options to stop recording.
 */
export type StopRecordingOptions = OperationOptions;
/**
 * Options to download content.
 */
export interface DownloadContentOptions extends OperationOptions {
   /** Return only the bytes of the blob in the specified range. */
   range?: string;
}
/**
 * Options to get recording file.
 */
export type GetRecordingFileOptions = OperationOptions;
/**
 * Options  to get recording state.
 */
export type GetRecordingStateOptions = OperationOptions;

export interface ContentDownloadOptions extends OperationOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Call back to receive events on the progress of download operation.
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original body download stream unexpected ends.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * With this option, every additional retry means an additional `FileClient.download()` request will be made
   * from the broken point, until the requested range has been successfully downloaded or maxRetryRequests is reached.
   *
   * Default value is 5, please set a larger value when loading large files in poor network.
   */
  maxRetryRequests?: number;
}
