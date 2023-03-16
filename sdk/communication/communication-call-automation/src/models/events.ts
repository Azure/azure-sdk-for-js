// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationIdentifier } from "@azure/communication-common";

import {
  CallConnected as RestCallConnected,
  CallDisconnected as RestCallDisconnected,
  CallTransferAccepted as RestCallTransferAccepted,
  CallTransferFailed as RestCallTransferFailed,
  RecordingStateChanged as RestRecordingStateChanged,
  PlayCompleted as RestPlayCompleted,
  PlayFailed as RestPlayFailed,
  PlayCanceled as RestPlayCanceled,
  RecognizeCompleted as RestRecognizeCompleted,
  RecognizeFailed as RestRecognizeFailed,
  RecognizeCanceled as RestRecognizeCanceled,
  ResultInformation,
} from "../generated/src/models";

import { CallParticipant } from "./models";

/** Callback events for Call Automation */
export type CallAutomationEvent =
  | AddParticipantSucceeded
  | AddParticipantFailed
  | CallConnected
  | CallDisconnected
  | CallTransferAccepted
  | CallTransferFailed
  | ParticipantsUpdated
  | RecordingStateChanged
  | PlayCompleted
  | PlayFailed
  | PlayCanceled
  | RecognizeCompleted
  | RecognizeCanceled
  | RecognizeFailed;

export {
  RestCallConnected,
  RestCallDisconnected,
  RestCallTransferAccepted,
  RestCallTransferFailed,
  RestRecordingStateChanged,
  RestPlayCompleted,
  RestPlayFailed,
  RestPlayCanceled,
  RestRecognizeCompleted,
  RestRecognizeFailed,
  RestRecognizeCanceled,
  ResultInformation,
};

/** The participant successfully added event. */
export interface AddParticipantSucceeded {
  /** Call connection ID. */
  callConnectionId?: string;
  /** Server call ID. */
  serverCallId?: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId?: string;
  /** Used by customers when calling mid-call actions to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** The participant in the call. */
  participant?: CommunicationIdentifier;
  /** kind of this event. */
  kind: "AddParticipantSucceeded";
}

/** The failed to add participant event. */
export interface AddParticipantFailed {
  /** Call connection ID. */
  callConnectionId?: string;
  /** Server call ID. */
  serverCallId?: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId?: string;
  /** Used by customers when calling mid-call actions to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** The participant in the call. */
  participant?: CommunicationIdentifier;
  /** kind of this event. */
  kind: "AddParticipantFailed";
}

/** Event when call was established. */
export interface CallConnected extends RestCallConnected {
  /** kind of this event. */
  kind: "CallConnected";
}

/** Event when all participants left and call was terminated. */
export interface CallDisconnected extends RestCallDisconnected {
  /** kind of this event. */
  kind: "CallDisconnected";
}

/** Event when transfer request was successful. */
export interface CallTransferAccepted extends RestCallTransferAccepted {
  /** kind of this event. */
  kind: "CallTransferAccepted";
}

/** Event when transfer request was failed. */
export interface CallTransferFailed extends RestCallTransferFailed {
  /** kind of this event. */
  kind: "CallTransferFailed";
}

/** Event when there was an update to participant(s). */
export interface ParticipantsUpdated {
  /** Call connection ID. */
  callConnectionId?: string;
  /** Server call ID. */
  serverCallId?: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId?: string;
  /** The list of participants in the call. */
  participants?: CallParticipant[];
  /** kind of this event. */
  kind: "ParticipantsUpdated";
}

/** Event when Recording state has been changed. */
export interface RecordingStateChanged extends RestRecordingStateChanged {
  /** kind of this event. */
  kind: "RecordingStateChanged";
}

/** Event when Media play was successfully completed. */
export interface PlayCompleted extends RestPlayCompleted {
  /** kind of this event. */
  kind: "PlayCompleted";
}

/** Event when Media play was failed. */
export interface PlayFailed extends RestPlayFailed {
  /** kind of this event. */
  kind: "PlayFailed";
}

/** Event when Media play was canceled by Cancel operation. */
export interface PlayCanceled extends RestPlayCanceled {
  /** kind of this event. */
  kind: "PlayCanceled";
}

/** Event when Media recognize was successfully completed. */
export interface RecognizeCompleted extends RestRecognizeCompleted {
  /** kind of this event. */
  kind: "RecognizeCompleted";
}

/** Event when Media recognize was failed. */
export interface RecognizeFailed extends RestRecognizeFailed {
  /** kind of this event. */
  kind: "RecognizeFailed";
}

/** Event when Media recognize was canceled by Cancel operation. */
export interface RecognizeCanceled extends RestRecognizeCanceled {
  /** kind of this event. */
  kind: "RecognizeCanceled";
}
