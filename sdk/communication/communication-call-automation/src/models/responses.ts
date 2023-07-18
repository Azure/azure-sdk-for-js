// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CallConnection } from "../callConnection";
import { CallConnectionProperties, CallParticipant } from "./models";
import { RecordingState } from "../generated/src";
/**
 * The interface used as parent of [action]CallResult
 */
interface CallResult {
  /*
   * The callConnectionProperties
   */
  callConnectionProperties: CallConnectionProperties;

  /*
   * The callConnection
   */
  callConnection: CallConnection;
}

/**
 * CreateCall result
 */
export type CreateCallResult = CallResult;

/**
 * AnswerCall result
 */
export type AnswerCallResult = CallResult;

/** The response payload for getting participants of the call. */
export interface ListParticipantsResult {
  /** List of the current participants in the call. */
  values?: CallParticipant[];
  /** Continue of the list of participants */
  nextLink?: string;
}

/** The response payload for adding participants to the call. */
export interface AddParticipantResult {
  /** List of current participants in the call. */
  participant?: CallParticipant;
  /** The operation context provided by client. */
  operationContext?: string;
}

/** The response payload for transferring the call. */
export interface TransferCallResult {
  /** The operation context provided by client. */
  operationContext?: string;
}

/** The response payload for removing participants from the call. */
export interface RemoveParticipantResult {
  /** The operation context provided by client. */
  operationContext?: string;
}

/** The response payload for muting participants from the call. */
export interface MuteParticipantsResult {
  /** The operation context provided by client. */
  operationContext?: string;
}

/** The response payload for starting a call recording or getting call recording state. */
export interface RecordingStateResult {
  recordingId: string;
  recordingState: RecordingState;
}
