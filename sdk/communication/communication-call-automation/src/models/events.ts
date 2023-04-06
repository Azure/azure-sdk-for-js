// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationIdentifier } from "@azure/communication-common";

import {
  AddParticipantSucceeded as RestAddParticipantSucceeded,
  AddParticipantFailed as RestAddParticipantFailed,
  RemoveParticipantSucceeded as RestRemoveParticipantSucceeded,
  RemoveParticipantFailed as RestRemoveParticipantFailed,
  CallConnected as RestCallConnected,
  CallDisconnected as RestCallDisconnected,
  CallTransferAccepted as RestCallTransferAccepted,
  CallTransferFailed as RestCallTransferFailed,
  ParticipantsUpdated as RestParticipantsUpdated,
  RecordingStateChanged as RestRecordingStateChanged,
  PlayCompleted as RestPlayCompleted,
  PlayFailed as RestPlayFailed,
  PlayCanceled as RestPlayCanceled,
  RecognizeCompleted as RestRecognizeCompleted,
  RecognizeFailed as RestRecognizeFailed,
  RecognizeCanceled as RestRecognizeCanceled,
  ResultInformation as RestResultInformation,
} from "../generated/src/models";

import { CallParticipant } from "./models";

/** Callback events for Call Automation */
export type CallAutomationEvent =
  | AddParticipantSucceeded
  | AddParticipantFailed
  | RemoveParticipantSucceeded
  | RemoveParticipantFailed
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
  RestAddParticipantSucceeded,
  RestAddParticipantFailed,
  RestCallConnected,
  RestCallDisconnected,
  RestCallTransferAccepted,
  RestCallTransferFailed,
  RestRecordingStateChanged,
  RestParticipantsUpdated,
  RestPlayCompleted,
  RestPlayFailed,
  RestPlayCanceled,
  RestRecognizeCompleted,
  RestRecognizeFailed,
  RestRecognizeCanceled,
  RestResultInformation,
};

export interface ResultInformation
  extends Omit<RestResultInformation, "code" | "subCode" | "message"> {
  /** The error code. */
  code: number;
  /** The sub code of error. */
  subCode: number;
  /** The detailed message of the error. */
  message: string;
}

/** The participant successfully added event. */
export interface AddParticipantSucceeded
  extends Omit<
    RestAddParticipantSucceeded,
    "callConnectionId" | "serverCallId" | "correlationId" | "participant" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** The participant in the call. */
  participant?: CommunicationIdentifier;
  /** kind of this event. */
  kind: "AddParticipantSucceeded";
}

/** The failed to add participant event. */
export interface AddParticipantFailed
  extends Omit<
    RestAddParticipantFailed,
    "callConnectionId" | "serverCallId" | "correlationId" | "participant" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** The participant in the call. */
  participant?: CommunicationIdentifier;
  /** kind of this event. */
  kind: "AddParticipantFailed";
}

/** The participant successfully removed event. */
export interface RemoveParticipantSucceeded
  extends Omit<
    RestRemoveParticipantSucceeded,
    "callConnectionId" | "serverCallId" | "correlationId" | "participant" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** The participant in the call. */
  participant?: CommunicationIdentifier;
  /** kind of this event. */
  kind: "RemoveParticipantSucceeded";
}

/** The failed to remove participant event. */
export interface RemoveParticipantFailed
  extends Omit<
    RestRemoveParticipantFailed,
    "callConnectionId" | "serverCallId" | "correlationId" | "participant" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** The participant in the call. */
  participant?: CommunicationIdentifier;
  /** kind of this event. */
  kind: "RemoveParticipantFailed";
}

/** Event when call was established. */
export interface CallConnected
  extends Omit<RestCallConnected, "callConnectionId" | "serverCallId" | "correlationId"> {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** kind of this event. */
  kind: "CallConnected";
}

/** Event when all participants left and call was terminated. */
export interface CallDisconnected
  extends Omit<RestCallDisconnected, "callConnectionId" | "serverCallId" | "correlationId"> {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** kind of this event. */
  kind: "CallDisconnected";
}

/** Event when transfer request was successful. */
export interface CallTransferAccepted
  extends Omit<
    RestCallTransferAccepted,
    "callConnectionId" | "serverCallId" | "correlationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "CallTransferAccepted";
}

/** Event when transfer request was failed. */
export interface CallTransferFailed
  extends Omit<
    RestCallTransferFailed,
    "callConnectionId" | "serverCallId" | "correlationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "CallTransferFailed";
}

/** Event when there was an update to participant(s). */
export interface ParticipantsUpdated
  extends Omit<
    RestParticipantsUpdated,
    "callConnectionId" | "serverCallId" | "correlationId" | "participants"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** The list of participants in the call. */
  participants: CallParticipant[];
  /** kind of this event. */
  kind: "ParticipantsUpdated";
}

/** Event when Recording state has been changed. */
export interface RecordingStateChanged
  extends Omit<RestRecordingStateChanged, "callConnectionId" | "serverCallId" | "correlationId"> {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** kind of this event. */
  kind: "RecordingStateChanged";
}

/** Event when Media play was successfully completed. */
export interface PlayCompleted
  extends Omit<
    RestPlayCompleted,
    "callConnectionId" | "serverCallId" | "correlationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** kind of this event. */
  kind: "PlayCompleted";
}

/** Event when Media play was failed. */
export interface PlayFailed
  extends Omit<
    RestPlayFailed,
    "callConnectionId" | "serverCallId" | "correlationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** kind of this event. */
  kind: "PlayFailed";
}

/** Event when Media play was canceled by Cancel operation. */
export interface PlayCanceled
  extends Omit<RestPlayCanceled, "callConnectionId" | "serverCallId" | "correlationId"> {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** kind of this event. */
  kind: "PlayCanceled";
}

/** Event when Media recognize was successfully completed. */
export interface RecognizeCompleted
  extends Omit<
    RestRecognizeCompleted,
    "callConnectionId" | "serverCallId" | "correlationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** kind of this event. */
  kind: "RecognizeCompleted";
}

/** Event when Media recognize was failed. */
export interface RecognizeFailed
  extends Omit<
    RestRecognizeFailed,
    "callConnectionId" | "serverCallId" | "correlationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** kind of this event. */
  kind: "RecognizeFailed";
}

/** Event when Media recognize was canceled by Cancel operation. */
export interface RecognizeCanceled
  extends Omit<RestRecognizeCanceled, "callConnectionId" | "serverCallId" | "correlationId"> {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** kind of this event. */
  kind: "RecognizeCanceled";
}
