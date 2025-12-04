// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationIdentifier } from "@azure/communication-common";

import type {
  Tone} from "../generated/src/models/index.js";
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
  PlayStarted as RestPlayStarted,
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
  SendDtmfTonesCompleted as RestSendDtmfTonesCompleted,
  SendDtmfTonesFailed as RestSendDtmfTonesFailed,
  CancelAddParticipantSucceeded as RestCancelAddParticipantSucceeded,
  CancelAddParticipantFailed as RestCancelAddParticipantFailed,
  ConnectFailed as RestConnectFailed,
  HoldFailed as RestHoldFailed,
  AnswerFailed as RestAnswerFailed,
  CreateCallFailed as RestCreateCallFailed,
  TranscriptionStarted as RestTranscriptionStarted,
  TranscriptionStopped as RestTranscriptionStopped,
  TranscriptionUpdated as RestTranscriptionUpdated,
  TranscriptionFailed as RestTranscriptionFailed,
  MediaStreamingStarted as RestMediaStreamingStarted,
  MediaStreamingStopped as RestMediaStreamingStopped,
  MediaStreamingFailed as RestMediaStreamingFailed,
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
  | HoldFailed
  | ConnectFailed
  | MediaStreamingStarted
  | MediaStreamingStopped
  | MediaStreamingFailed
  | PlayStarted
  | StartRecordingFailed;
export {
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
  RestPlayStarted,
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
  RestCancelAddParticipantSucceeded,
  RestCancelAddParticipantFailed,
  RestConnectFailed,
  RestTranscriptionStarted,
  RestTranscriptionStopped,
  RestTranscriptionUpdated,
  RestTranscriptionFailed,
  RestHoldFailed,
  RestMediaStreamingStarted,
  RestMediaStreamingStopped,
  RestMediaStreamingFailed,
  RestCreateCallFailed,
  RestAnswerFailed,
};
export interface ResultInformation
  /**
   * @deprecated RestResultInformation is deprecated.
   * Use ResultInformation instead.
   */
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
  /**
   * @deprecated RestAddParticipantSucceeded is deprecated.
   * Use AddParticipantSucceeded instead.
   */
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
  /**
   * @deprecated RestAddParticipantFailed is deprecated.
   * Use AddParticipantFailed instead.
   */
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
  /**
   * @deprecated RestRemoveParticipantSucceeded is deprecated.
   * Use RemoveParticipantSucceeded instead.
   */
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
  /**
   * @deprecated RestRemoveParticipantFailed is deprecated.
   * Use RemoveParticipantFailed instead.
   */
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
  /**
   * @deprecated RestCallConnected is deprecated.
   * Use CallConnected instead.
   */
  extends Omit<
    RestCallConnected,
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
  kind: "CallConnected";
}

/** Event when all participants left and call was terminated. */
export interface CallDisconnected
  /**
   * @deprecated RestCallDisconnected is deprecated.
   * Use CallDisconnected instead.
   */
  extends Omit<
    RestCallDisconnected,
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
  kind: "CallDisconnected";
}

/** Event when transfer request was successful. */
export interface CallTransferAccepted
  /**
   * @deprecated RestCallTransferAccepted is deprecated.
   * Use CallTransferAccepted instead.
   */
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
  /**
   * @deprecated RestCallTransferFailed is deprecated.
   * Use CallTransferFailed instead.
   */
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
  /**
   * @deprecated RestParticipantsUpdated is deprecated.
   * Use ParticipantsUpdated instead.
   */
  extends Omit<
    RestParticipantsUpdated,
    "callConnectionId" | "serverCallId" | "correlationId" | "participants" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** The list of participants in the call. */
  participants: CallParticipant[];
  /** Contains the resulting SIP code/sub-code and message from NGC services. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "ParticipantsUpdated";
}

/** Event when Recording state has been changed. */
export interface RecordingStateChanged
  /**
   * @deprecated RestRecordingStateChanged is deprecated.
   * Use RecordingStateChanged instead.
   */
  extends Omit<
    RestRecordingStateChanged,
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
  kind: "RecordingStateChanged";
}

/** Event when StartRecording was failed. */
export interface StartRecordingFailed {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** The call recording id */
  recordingId?: string;
  /** kind of this event. */
  kind: "StartRecordingFailed";
}

/** Event when Media play was successfully started. */
export interface PlayStarted
  /**
   * @deprecated RestPlayStarted is deprecated.
   * Use PlayStarted instead.
   */
  extends Omit<
    RestPlayStarted,
    "callConnectionId" | "serverCallId" | "correlationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "PlayStarted";
}

/** Event when Media play was successfully completed. */
export interface PlayCompleted
  /**
   * @deprecated RestPlayCompleted is deprecated.
   * Use PlayCompleted instead.
   */
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
  /**
   * @deprecated RestPlayFailed is deprecated.
   * Use PlayFailed instead.
   */
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
  /**
   * @deprecated RestPlayCanceled is deprecated.
   * Use PlayCanceled instead.
   */
  extends Omit<
    RestPlayCanceled,
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
  kind: "PlayCanceled";
}

/** Event when Media recognize was successfully completed. */
export interface RecognizeCompleted
  /**
   * @deprecated RestRecognizeCompleted is deprecated.
   * Use RecognizeCompleted instead.
   */
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
  /**
   * @deprecated RestRecognizeFailed is deprecated.
   * Use RecognizeFailed instead.
   */
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
  /**
   * @deprecated RestRecognizeCanceled is deprecated.
   * Use RecognizeCanceled instead.
   */
  extends Omit<
    RestRecognizeCanceled,
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
  kind: "RecognizeCanceled";
}

/** Event sent when Dtmf tone received from targeted participant in call. */
export interface ContinuousDtmfRecognitionToneReceived
  /**
   * @deprecated RestContinuousDtmfRecognitionToneReceived is deprecated.
   * Use ContinuousDtmfRecognitionToneReceived instead.
   */
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
  /**
   * @deprecated RestContinuousDtmfRecognitionToneFailed is deprecated.
   * Use ContinuousDtmfRecognitionToneFailed instead.
   */
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
  /**
   * @deprecated RestContinuousDtmfRecognitionStopped is deprecated.
   * Use ContinuousDtmfRecognitionStopped instead.
   */
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
  /**
   * @deprecated RestSendDtmfTonesCompleted is deprecated.
   * Use SendDtmfTonesCompleted instead.
   */
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
  /**
   * @deprecated RestSendDtmfTonesFailed is deprecated.
   * Use SendDtmfTonesFailed instead.
   */
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
  /**
   * @deprecated RestCancelAddParticipantSucceeded is deprecated.
   * Use CancelAddParticipantSucceeded instead.
   */
  extends Omit<
    RestCancelAddParticipantSucceeded,
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
  kind: "CancelAddParticipantSucceeded";
}

/** The failed to cancel add participant event. */
export interface CancelAddParticipantFailed
  /**
   * @deprecated RestCancelAddParticipantFailed is deprecated.
   * Use CancelAddParticipantFailed instead.
   */
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

export interface ConnectFailed
  /**
   * @deprecated RestConnectFailed is deprecated.
   * Use ConnectFailed instead.
   */
  extends Omit<
    RestConnectFailed,
    "callConnectionId" | "serverCallId" | "correlationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "ConnectFailed";
}

export interface HoldFailed
  /**
   * @deprecated RestHoldFailed is deprecated.
   * Use HoldFailed instead.
   */
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
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "HoldFailed";
}

export interface AnswerFailed
  /**
   * @deprecated RestAnswerFailed is deprecated.
   * Use AnswerFailed instead.
   */
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
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "AnswerFailed";
}

export interface CreateCallFailed
  /**
   * @deprecated RestCreateCallFailed is deprecated.
   * Use CreateCallFailed instead.
   */
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
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "CreateCallFailed";
}
export interface TranscriptionStarted
  /**
   * @deprecated RestTranscriptionStarted is deprecated.
   * Use TranscriptionStarted instead.
   */
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
  /**
   * @deprecated RestTranscriptionStopped is deprecated.
   * Use TranscriptionStopped instead.
   */
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
  /**
   * @deprecated RestTranscriptionUpdated is deprecated.
   * Use TranscriptionUpdated instead.
   */
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
  /**
   * @deprecated RestTranscriptionFailed is deprecated.
   * Use TranscriptionFailed instead.
   */
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

export interface MediaStreamingStarted
  /**
   * @deprecated RestMediaStreamingStarted is deprecated.
   * Use MediaStreamingStarted instead.
   */
  extends Omit<
    RestMediaStreamingStarted,
    "callConnectionId" | "serverCallId" | "correlationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "MediaStreamingStarted";
}

export interface MediaStreamingStopped
  /**
   * @deprecated RestMediaStreamingStopped is deprecated.
   * Use MediaStreamingStopped instead.
   */
  extends Omit<
    RestMediaStreamingStopped,
    "callConnectionId" | "serverCallId" | "correlationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "MediaStreamingStopped";
}

export interface MediaStreamingFailed
  /**
   * @deprecated RestMediaStreamingFailed is deprecated.
   * Use MediaStreamingFailed instead.
   */
  extends Omit<
    RestMediaStreamingFailed,
    "callConnectionId" | "serverCallId" | "correlationId" | "resultInformation"
  > {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "MediaStreamingFailed";
}

export interface CreateCallFailed
  /**
   * @deprecated RestCreateCallFailed is deprecated.
   * Use CreateCallFailed instead.
   */
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
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "CreateCallFailed";
}
export interface AnswerFailed
  /**
   * @deprecated RestAnswerFailed is deprecated.
   * Use AnswerFailed instead.
   */
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
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "AnswerFailed";
}
