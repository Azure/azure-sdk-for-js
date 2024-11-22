// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationIdentifier } from "@azure/communication-common";

import type {
  RestAddParticipantSucceeded,
  RestAddParticipantFailed,
  RestRemoveParticipantSucceeded,
  RestRemoveParticipantFailed,
  RestCallConnected,
  RestCallDisconnected,
  RestCallTransferAccepted,
  RestCallTransferFailed,
  RestParticipantsUpdated,
  RestRecordingStateChanged,
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
  RestSendDtmfTonesCompleted,
  RestSendDtmfTonesFailed,
  Tone,
  RestCancelAddParticipantSucceeded,
  RestCancelAddParticipantFailed,
  RestTranscriptionStarted,
  RestTranscriptionStopped,
  RestTranscriptionUpdated,
  RestTranscriptionFailed,
  RestCreateCallFailed,
  RestAnswerFailed,
  RestHoldFailed,
} from "../generated/src/models/index.js";

import type { CallParticipant } from "./models.js";

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
  | SendDtmfTonesCompleted
  | SendDtmfTonesFailed
  | CancelAddParticipantSucceeded
  | CancelAddParticipantFailed
  | TranscriptionStarted
  | TranscriptionStopped
  | TranscriptionUpdated
  | TranscriptionFailed
  | CreateCallFailed
  | AnswerFailed
  | HoldFailed;

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

/** Event sent when Dtmf tone received from targeted participant in call. */
export interface ContinuousDtmfRecognitionToneReceived
  extends Omit<
    RestContinuousDtmfRecognitionToneReceived,
    | "sequenceId"
    | "tone"
    | "callConnectionId"
    | "serverCallId"
    | "correlationId"
    | "resultInformation"
  > {
  /** The sequence id which can be used to determine if the same tone was played multiple times or if any tones were missed. */
  sequenceId: number;
  /** Defines values for Tone. */
  tone: Tone;
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId or skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "ContinuousDtmfRecognitionToneReceived";
}

/** Event sent when failed to recognize continuous Dtmf tone. */
export interface ContinuousDtmfRecognitionToneFailed
  extends Omit<
    RestContinuousDtmfRecognitionToneFailed,
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
  kind: "ContinuousDtmfRecognitionToneFailed";
}

/** Event sent when continuous Dtmf recognition stopped. */
export interface ContinuousDtmfRecognitionStopped
  extends Omit<
    RestContinuousDtmfRecognitionStopped,
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
  kind: "ContinuousDtmfRecognitionStopped";
}

/** Event sent when Dtmf tones send successfully. */
export interface SendDtmfTonesCompleted
  extends Omit<
    RestSendDtmfTonesCompleted,
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
  kind: "SendDtmfTonesCompleted";
}

/** Event sent when Dtmf tones send failed. */
export interface SendDtmfTonesFailed
  extends Omit<
    RestSendDtmfTonesFailed,
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
  kind: "SendDtmfTonesFailed";
}

/** Successful cancel add participant event. */
export interface CancelAddParticipantSucceeded
  extends Omit<
    RestCancelAddParticipantSucceeded,
    "callConnectionId" | "serverCallId" | "correlationId" | "invitationId"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Invitation ID used to cancel the add participant request. */
  invitationId: string;
  /** kind of this event. */
  kind: "CancelAddParticipantSucceeded";
}

/** The failed to cancel add participant event. */
export interface CancelAddParticipantFailed
  extends Omit<
    RestCancelAddParticipantFailed,
    "callConnectionId" | "serverCallId" | "correlationId" | "invitationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Invitation ID used to cancel the add participant request. */
  invitationId: string;
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "CancelAddParticipantFailed";
}

export interface TranscriptionStarted
  extends Omit<
    RestTranscriptionStarted,
    "callConnectionId" | "serverCallId" | "correlationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: RestResultInformation;
  /** kind of this event. */
  kind: "TranscriptionStarted";
}

export interface TranscriptionStopped
  extends Omit<
    RestTranscriptionStopped,
    "callConnectionId" | "serverCallId" | "correlationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: RestResultInformation;
  /** kind of this event. */
  kind: "TranscriptionStopped";
}

export interface TranscriptionUpdated
  extends Omit<
    RestTranscriptionUpdated,
    "callConnectionId" | "serverCallId" | "correlationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: RestResultInformation;
  /** kind of this event. */
  kind: "TranscriptionUpdated";
}

export interface TranscriptionFailed
  extends Omit<
    RestTranscriptionFailed,
    "callConnectionId" | "serverCallId" | "correlationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: RestResultInformation;
  /** kind of this event. */
  kind: "TranscriptionFailed";
}

export interface CreateCallFailed
  extends Omit<
    RestCreateCallFailed,
    "callConnectionId" | "serverCallId" | "correlationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: RestResultInformation;
  /** kind of this event. */
  kind: "CreateCallFailed";
}

export interface AnswerFailed
  extends Omit<
    RestAnswerFailed,
    "callConnectionId" | "serverCallId" | "correlationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: RestResultInformation;
  /** kind of this event. */
  kind: "AnswerFailed";
}

export interface HoldFailed
  extends Omit<
    RestHoldFailed,
    "callConnectionId" | "serverCallId" | "correlationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: RestResultInformation;
  /** kind of this event. */
  kind: "HoldFailed";
}
