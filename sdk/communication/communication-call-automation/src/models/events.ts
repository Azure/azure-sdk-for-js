// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationIdentifier } from "@azure/communication-common";

import type {
  Tone,
  ChoiceResult,
  DtmfResult,
  RecognitionType,
  SpeechResult,
  MediaStreamingUpdate,
  TranscriptionUpdate,
  RecordingKind,
  SipDiagnosticInfo,
} from "../generated/src/models/index.js";

import type { CallParticipant, RecordingState, CustomCallingContext } from "./models.js";

/** Callback events for Call Automation */
export type CallAutomationEvent =
  | AddParticipantSucceeded
  | AddParticipantFailed
  | RemoveParticipantSucceeded
  | RemoveParticipantFailed
  | MoveParticipantSucceeded
  | MoveParticipantFailed
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
  | StartRecordingFailed
  | PlayStarted
  | PlayPaused
  | PlayResumed
  | HoldAudioStarted
  | HoldAudioPaused
  | HoldAudioResumed
  | HoldAudioCompleted
  | IncomingCall
  | TranscriptionCallSummaryUpdated;

export interface ResultInformation {
  /** The error code. */
  code: number;
  /** The sub code of error. */
  subCode: number;
  /** The detailed message of the error. */
  message: string;
  /**
   * Sip response from SBC. This can be helpful to troubleshoot PSTN call if this result was unexpected.
   * This is only applicable for PSTN calls and will be null if SBC/Carrier does not provide this information.
   * Do not solely rely on this information for troubleshooting, as it may not always be available.
   */
  sipDetails?: SipDiagnosticInfo;
  /**
   * Q850 cause from SBC. This can be helpful to troubleshoot call issues if this result was unexpected.
   * This is only applicable for PSTN calls and will be null if SBC/Carrier does not provide this information.
   * Do not solely rely on this information for troubleshooting, as it may not always be available.
   */
  q850Details?: SipDiagnosticInfo;
}

/** The participant successfully added event. */
export interface AddParticipantSucceeded {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** The participant in the call. */
  participant?: CommunicationIdentifier;
  /** kind of this event. */
  kind: "AddParticipantSucceeded";
}

/** The failed to add participant event. */
export interface AddParticipantFailed {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** The participant in the call. */
  participant?: CommunicationIdentifier;
  /** kind of this event. */
  kind: "AddParticipantFailed";
}

/** The participant successfully removed event. */
export interface RemoveParticipantSucceeded {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** The participant in the call. */
  participant?: CommunicationIdentifier;
  /** kind of this event. */
  kind: "RemoveParticipantSucceeded";
}

/** The failed to remove participant event. */
export interface RemoveParticipantFailed {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** The participant in the call. */
  participant?: CommunicationIdentifier;
  /** kind of this event. */
  kind: "RemoveParticipantFailed";
}

/** The participant successfully moved event. */
export interface MoveParticipantSucceeded {
  /** The CallConnectionId for the call you want to move the participant from */
  fromCall?: string;
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** The participant in the call. */
  participant?: CommunicationIdentifier;
  /** kind of this event. */
  kind: "MoveParticipantSucceeded";
}

/** The failed to move participant event. */
export interface MoveParticipantFailed {
  /** The CallConnectionId for the call you want to move the participant from */
  fromCall?: string;
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** The participant in the call. */
  participant?: CommunicationIdentifier;
  /** kind of this event. */
  kind: "MoveParticipantFailed";
}

/** Event when call was established. */
export interface CallConnected {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "CallConnected";
}

/** Event when call was initiated. */
export interface IncomingCall {
  /** Call connection ID. */
  callConnectionId: string;
  /** The communication identifier of the target user.*/
  to?: CommunicationIdentifier;
  /** The communication identifier of the user who initiated the call.*/
  from?: CommunicationIdentifier;
  /** Display name of caller.*/
  callerDisplayName?: string;
  /** Custom Context of Incoming Call */
  customContext?: CustomCallingContext;
  /** Incoming call context.*/
  incomingCallContext?: string;
  /** The communication identifier of the user on behalf of whom the call is made.*/
  onBehalfOfCallee?: CommunicationIdentifier;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "IncomingCall";
}

/** Event when all participants left and call was terminated. */
export interface CallDisconnected {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "CallDisconnected";
}

/** Event when transfer request was successful. */
export interface CallTransferAccepted {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** Participant that was transferred away */
  transferee: CommunicationIdentifier;
  /** Target that transferee is transferred to */
  transferTarget: CommunicationIdentifier;
  /** kind of this event. */
  kind: "CallTransferAccepted";
}

/** Event when transfer request was failed. */
export interface CallTransferFailed {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "CallTransferFailed";
}

/** Event when there was an update to participant(s). */
export interface ParticipantsUpdated {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** The list of participants in the call. */
  participants: CallParticipant[];
  /** The Sequence Number of the event */
  sequenceNumber?: number;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "ParticipantsUpdated";
}

/** Event when Recording state has been changed. */
export interface RecordingStateChanged {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** The call recording id*/
  recordingId?: string;
  state?: RecordingState;
  /** The time of the recording started*/
  startDateTime?: Date;
  recordingKind?: RecordingKind;
  /** kind of this event. */
  kind: "RecordingStateChanged";
}

/** Event when Media play was successfully completed. */
export interface PlayCompleted {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** kind of this event. */
  kind: "PlayCompleted";
}

/** Event when Media play was failed. */
export interface PlayFailed {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the index of the failed play source. */
  failedPlaySourceIndex?: number;
  /** kind of this event. */
  kind: "PlayFailed";
}

/** Event when Media play was canceled by Cancel operation. */
export interface PlayCanceled {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "PlayCanceled";
}

/** Event when Media recognize was successfully completed. */
export interface RecognizeCompleted {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /**
   * Determines the sub-type of the recognize operation.
   * In case of cancel operation the this field is not set and is returned empty
   */
  recognitionType?: RecognitionType;
  /** Defines the result for RecognitionType = Dtmf */
  dtmfResult?: DtmfResult;
  /** Defines the result for RecognitionType = Choices */
  choiceResult?: ChoiceResult;
  /** Defines the result for RecognitionType = Speech and SpeechOrDtmf */
  speechResult?: SpeechResult;
  /** kind of this event. */
  kind: "RecognizeCompleted";
}

/** Event when Media recognize was failed. */
export interface RecognizeFailed {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the index of the failed play source. */
  failedPlaySourceIndex?: number;
  /** kind of this event. */
  kind: "RecognizeFailed";
}

/** Event when Media recognize was canceled by Cancel operation. */
export interface RecognizeCanceled {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "RecognizeCanceled";
}

/** Event sent when Dtmf tone received from targeted participant in call. */
export interface ContinuousDtmfRecognitionToneReceived {
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
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "ContinuousDtmfRecognitionToneReceived";
}

/** Event sent when failed to recognize continuous Dtmf tone. */
export interface ContinuousDtmfRecognitionToneFailed {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "ContinuousDtmfRecognitionToneFailed";
}

/** Event sent when continuous Dtmf recognition stopped. */
export interface ContinuousDtmfRecognitionStopped {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "ContinuousDtmfRecognitionStopped";
}

/** Event sent when Dtmf tones send successfully. */
export interface SendDtmfTonesCompleted {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "SendDtmfTonesCompleted";
}

/** Event sent when Dtmf tones send failed. */
export interface SendDtmfTonesFailed {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "SendDtmfTonesFailed";
}

/** Successful cancel add participant event. */
export interface CancelAddParticipantSucceeded {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** Invitation ID used to cancel the add participant request. */
  invitationId: string;
  /** kind of this event. */
  kind: "CancelAddParticipantSucceeded";
}

/** The failed to cancel add participant event. */
export interface CancelAddParticipantFailed {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Invitation ID used to cancel the add participant request. */
  invitationId: string;
  /** Contains the resulting SIP code/sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "CancelAddParticipantFailed";
}

export interface TranscriptionStarted {
  /** Defines the result for TranscriptionUpdate with the current status and the details about the status */
  transcriptionUpdate?: TranscriptionUpdate;
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "TranscriptionStarted";
}

export interface TranscriptionStopped {
  /** Defines the result for TranscriptionUpdate with the current status and the details about the status */
  transcriptionUpdate?: TranscriptionUpdate;
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "TranscriptionStopped";
}

export interface TranscriptionUpdated {
  /** Defines the result for TranscriptionUpdate with the current status and the details about the status */
  transcriptionUpdate?: TranscriptionUpdate;
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "TranscriptionUpdated";
}

export interface TranscriptionFailed {
  /** Defines the result for TranscriptionUpdate with the current status and the details about the status */
  transcriptionUpdate?: TranscriptionUpdate;
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "TranscriptionFailed";
}

export interface CreateCallFailed {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "CreateCallFailed";
}

export interface AnswerFailed {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "AnswerFailed";
}

export interface HoldFailed {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "HoldFailed";
}

export interface ConnectFailed {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "ConnectFailed";
}

export interface MediaStreamingStarted {
  /** Defines the result for MediaStreamingUpdate with the current status and the details about the status */
  mediaStreamingUpdate?: MediaStreamingUpdate;
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "MediaStreamingStarted";
}

export interface MediaStreamingStopped {
  /** Defines the result for MediaStreamingUpdate with the current status and the details about the status */
  mediaStreamingUpdate?: MediaStreamingUpdate;
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "MediaStreamingStopped";
}

export interface MediaStreamingFailed {
  /** Defines the result for MediaStreamingUpdate with the current status and the details about the status */
  mediaStreamingUpdate?: MediaStreamingUpdate;
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "MediaStreamingFailed";
}

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
export interface PlayStarted {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "PlayStarted";
}

/** Event when Media play was successfully paused. */
export interface PlayPaused {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "PlayPaused";
}

/** Event when Media play was successfully paused. */
export interface PlayResumed {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "PlayResumed";
}

/** Event when hold audio play was successfully started. */
export interface HoldAudioStarted {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "HoldAudioStarted";
}

/** Event when hold audio play was successfully paused. */
export interface HoldAudioPaused {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "HoldAudioPaused";
}

/** Event when hold audio play was successfully resumed. */
export interface HoldAudioResumed {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "HoldAudioResumed";
}

/** Event when hold audio play was successfully completed. */
export interface HoldAudioCompleted {
  /** Call connection ID. */
  callConnectionId: string;
  /** Server call ID. */
  serverCallId: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId: string;
  /** Used this to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "HoldAudioCompleted";
}

export interface TranscriptionCallSummaryUpdated {
  /**
   * Defines the result for TranscriptionUpdate with the current status and the details about the status
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  transcriptionUpdate?: TranscriptionUpdate;
  /** Call connection ID. */
  callConnectionId?: string;
  /** Server call ID. */
  serverCallId?: string;
  /** Correlation ID for event to call correlation. Also called ChainId for skype chain ID. */
  correlationId?: string;
  /** Used by customers when calling mid-call actions to correlate the request to the response event. */
  operationContext?: string;
  /** Contains the resulting SIP code, sub-code and message. */
  resultInformation?: ResultInformation;
  /** kind of this event. */
  kind: "TranscriptionCallSummaryUpdated";
}
