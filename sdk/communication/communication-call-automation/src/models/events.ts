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
  ContinuousDtmfRecognitionToneReceived as RestContinuousDtmfRecognitionToneReceived,
  ContinuousDtmfRecognitionToneFailed as RestContinuousDtmfRecognitionToneFailed,
  ContinuousDtmfRecognitionStopped as RestContinuousDtmfRecognitionStopped,
  SendDtmfCompleted as RestSendDtmfCompleted,
  SendDtmfFailed as RestSendDtmfFailed,
  ToneInfo as RestToneInfo,
  Tone,
  AddParticipantCancelled as RestAddParticipantCancelled,
  CancelAddParticipantFailed as RestCancelAddParticipantFailed,
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
  | RecognizeFailed
  | ContinuousDtmfRecognitionToneReceived
  | ContinuousDtmfRecognitionToneFailed
  | ContinuousDtmfRecognitionStopped
  | SendDtmfCompleted
  | SendDtmfFailed
  | AddParticipantCancelled
  | CancelAddParticipantFailed;

export {
  RestAddParticipantSucceeded,
  RestAddParticipantFailed,
  RestRemoveParticipantSucceeded,
  RestRemoveParticipantFailed,
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
  RestContinuousDtmfRecognitionToneReceived,
  RestContinuousDtmfRecognitionToneFailed,
  RestContinuousDtmfRecognitionStopped,
  RestSendDtmfCompleted,
  RestSendDtmfFailed,
  RestToneInfo,
  RestAddParticipantCancelled,
  RestCancelAddParticipantFailed,
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
    | "callConnectionId"
    | "serverCallId"
    | "correlationId"
    | "resultInformation"
    | "transferee"
    | "transferTarget"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** Participant that was transferred away */
  transferee: CommunicationIdentifier;
  /** Target that transferee is transferred to */
  transferTarget: CommunicationIdentifier;
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

/** The information about the tone. */
export interface ToneInfo extends Omit<RestToneInfo, "sequenceId" | "tone"> {
  /** The sequence id which can be used to determine if the same tone was played multiple times or if any tones were missed. */
  sequenceId: number;
  /** Defines values for Tone. */
  tone: Tone;
}

/** Event sent when Dtmf tone received from targeted participant in call. */
export interface ContinuousDtmfRecognitionToneReceived
  extends Omit<
    RestContinuousDtmfRecognitionToneReceived,
    | "toneInfo"
    | "callConnectionId"
    | "serverCallId"
    | "correlationId"
    | "operationContext"
    | "resultInformation"
  > {
  /** Information about Tone. */
  toneInfo: ToneInfo;
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId or skype chain ID. */
  correlationId: string;
  /** Used by customers when calling mid-call actions to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "ContinuousDtmfRecognitionToneReceived";
}

/** Event sent when failed to recognize continuous Dtmf tone. */
export interface ContinuousDtmfRecognitionToneFailed
  extends Omit<
    RestContinuousDtmfRecognitionToneFailed,
    "callConnectionId" | "serverCallId" | "correlationId" | "operationContext" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used by customers when calling mid-call actions to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "ContinuousDtmfRecognitionToneFailed";
}

/** Event sent when continuous Dtmf recognition stopped. */
export interface ContinuousDtmfRecognitionStopped
  extends Omit<
    RestContinuousDtmfRecognitionStopped,
    "callConnectionId" | "serverCallId" | "correlationId" | "operationContext" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used by customers when calling mid-call actions to correlate the request to the response event. */
  operationContext: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "ContinuousDtmfRecognitionStopped";
}

/** Event sent when Dtmf tones send successfully. */
export interface SendDtmfCompleted
  extends Omit<
    RestSendDtmfCompleted,
    "callConnectionId" | "serverCallId" | "correlationId" | "operationContext" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used by customers when calling mid-call actions to correlate the request to the response event. */
  operationContext: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "SendDtmfCompleted";
}

/** Event sent when Dtmf tones send failed. */
export interface SendDtmfFailed
  extends Omit<
    RestSendDtmfFailed,
    "callConnectionId" | "serverCallId" | "correlationId" | "operationContext" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used by customers when calling mid-call actions to correlate the request to the response event. */
  operationContext: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "SendDtmfFailed";
}

/** The add participant cancelled event. */
export interface AddParticipantCancelled
  extends Omit<
    RestAddParticipantCancelled,
    "callConnectionId" | "serverCallId" | "correlationId" | "participant" | "invitationId" | "operationContext"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Invitation ID used to cancel the add participant request. */
  invitationId: string;
  /** Used by customers when calling mid-call actions to correlate the request to the response event. */
  operationContext?: string;
  /** The participant whoose invitation was cancelled. */
  participant?: CommunicationIdentifier;
  /** kind of this event. */
  kind: "AddParticipantCancelled";
}

/** The failed to cancel add participant event. */
export interface CancelAddParticipantFailed
  extends Omit<
    RestCancelAddParticipantFailed,
    "callConnectionId" | "serverCallId" | "correlationId" | "invitationId" | "operationContext" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Invitation ID used to cancel the add participant request. */
  invitationId: string;
  /** Used by customers when calling mid-call actions to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "CancelAddParticipantFailed";
}
