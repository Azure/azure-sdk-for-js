// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CallConnection } from "../callConnection";
import { CallConnectionProperties, CallParticipant } from "./models";
import { RecordingState } from "../generated/src";
import {
  AddParticipantEventResult,
  AnswerCallEventResult,
  CancelAllMediaOperationsEventResult,
  CreateCallEventResult,
  PlayEventResult,
  RemoveParticipantEventResult,
  SendDtmfEventResult,
  StartRecognizingEventResult,
  TransferCallToParticipantEventResult,
  CancelAddParticipantEventResult,
} from "../eventprocessor/eventResponses";
import { AbortSignalLike } from "@azure/abort-controller";

/**
 * CreateCall result
 */
export interface CreateCallResult {
  /** The callConnectionProperties */
  callConnectionProperties: CallConnectionProperties;

  /** The callConnection */
  callConnection: CallConnection;

  /** Waiting for event processor to process the event */
  waitForEventProcessor(
    abortSignal?: AbortSignalLike,
    timeoutInMs?: number,
  ): Promise<CreateCallEventResult>;
}

/**
 * AnswerCall result
 */
export interface AnswerCallResult {
  /** The callConnectionProperties */
  callConnectionProperties: CallConnectionProperties;

  /** The callConnection */
  callConnection: CallConnection;

  /** Waiting for event processor to process the event */
  waitForEventProcessor(
    abortSignal?: AbortSignalLike,
    timeoutInMs?: number,
  ): Promise<AnswerCallEventResult>;
}

/** The response payload for getting participants of the call. */
export interface ListParticipantsResult {
  /** List of the current participants in the call. */
  values?: CallParticipant[];
  /** Continue of the list of participants */
  nextLink?: string;
}

/** The response payload for adding participants to the call. */
export interface AddParticipantResult {
  /** invitation ID used to add the participant. */
  invitationId?: string;
  /** List of current participants in the call. */
  participant?: CallParticipant;
  /** The operation context provided by client. */
  operationContext?: string;
  /** Waiting for event processor to process the event */
  waitForEventProcessor(
    abortSignal?: AbortSignalLike,
    timeoutInMs?: number,
  ): Promise<AddParticipantEventResult>;
}

/** The response payload for transferring the call. */
export interface TransferCallResult {
  /** The operation context provided by client. */
  operationContext?: string;
  /** Waiting for event processor to process the event */
  waitForEventProcessor(
    abortSignal?: AbortSignalLike,
    timeoutInMs?: number,
  ): Promise<TransferCallToParticipantEventResult>;
}

/** The response payload for removing participants from the call. */
export interface RemoveParticipantResult {
  /** The operation context provided by client. */
  operationContext?: string;
  /** Waiting for event processor to process the event */
  waitForEventProcessor(
    abortSignal?: AbortSignalLike,
    timeoutInMs?: number,
  ): Promise<RemoveParticipantEventResult>;
}

/** The response payload for muting participant from the call. */
export interface MuteParticipantResult {
  /** The operation context provided by client. */
  operationContext?: string;
}

/** The response payload for starting a call recording or getting call recording state. */
export interface RecordingStateResult {
  recordingId: string;
  recordingKind: string;
  recordingState: RecordingState;
}

/** The response payload for starting a call recording or getting call recording state. */
export interface CancelAllMediaOperationsResult {
  /** Waiting for event processor to process the event */
  waitForEventProcessor(
    abortSignal?: AbortSignalLike,
    timeoutInMs?: number,
  ): Promise<CancelAllMediaOperationsEventResult>;
}

/** The response from play. */
export interface PlayResult {
  /** Waiting for event processor to process the event */
  waitForEventProcessor(
    abortSignal?: AbortSignalLike,
    timeoutInMs?: number,
  ): Promise<PlayEventResult>;
}

/** The response payload for sending DTMF tones. */
export interface SendDtmfTonesResult {
  /** The operation context provided by client. */
  operationContext?: string;
  /** Waiting for event processor to process the event */
  waitForEventProcessor(
    abortSignal?: AbortSignalLike,
    timeoutInMs?: number,
  ): Promise<SendDtmfEventResult>;
}

/** The response from recognizing. */
export interface StartRecognizingResult {
  /** Waiting for event processor to process the event */
  waitForEventProcessor(
    abortSignal?: AbortSignalLike,
    timeoutInMs?: number,
  ): Promise<StartRecognizingEventResult>;
}

/** The response payload for cancelling add participant request. */
export interface CancelAddParticipantOperationResult {
  /** the invitation ID used to cancel the add participant request. */
  invitationId?: string;
  /** The operation context provided by client. */
  operationContext?: string;
  /** Waiting for event processor to process the event */
  waitForEventProcessor(
    abortSignal?: AbortSignalLike,
    timeoutInMs?: number,
  ): Promise<CancelAddParticipantEventResult>;
}
