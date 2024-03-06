// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AddParticipantSucceeded,
  AddParticipantFailed,
  CallConnected,
  PlayCanceled,
  RecognizeCanceled,
  PlayCompleted,
  PlayFailed,
  RemoveParticipantSucceeded,
  RemoveParticipantFailed,
  SendDtmfTonesCompleted,
  SendDtmfTonesFailed,
  RecognizeCompleted,
  RecognizeFailed,
  CallTransferAccepted,
  CallTransferFailed,
  CancelAddParticipantSucceeded,
  CancelAddParticipantFailed,
  CreateCallFailed,
  AnswerFailed,
} from "../models/events";

/**
 * AddParticipant event result
 */
export interface AddParticipantEventResult {
  /** returns true if add participant was successful */
  isSuccess: boolean;

  /** contains success event if the result was successful */
  successResult?: AddParticipantSucceeded;

  /** contains failure event if the result was failure */
  failureResult?: AddParticipantFailed;
}

/**
 * AnswerCall event result
 */
export interface AnswerCallEventResult {
  /** returns true if answer call was successful */
  isSuccess: boolean;
  /** contains success event if the result was successful */
  successResult?: CallConnected;
  /** contains failure event if the result was failure */
  failureResult?: AnswerFailed;
}

/**
 * CancelAllMediaOperations event result
 */
export interface CancelAllMediaOperationsEventResult {
  /** returns true if cancel all media was successful */
  isSuccess: boolean;
  /** contains play cancel event if play media was canceled */
  playCanceledSuccessResult?: PlayCanceled;
  /** contains recognize cancel event if recognize media was canceled */
  recognizeCanceledSuccessResult?: RecognizeCanceled;
}

/**
 * CreateCall event result
 */
export interface CreateCallEventResult {
  /** returns true if create call was successful */
  isSuccess: boolean;
  /** contains success event if the result was successful */
  successResult?: CallConnected;
  /** contains failure event if the result was failure */
  failureResult?: CreateCallFailed;
}

/**
 * Play event result
 */
export interface PlayEventResult {
  /** returns true if play was successful */
  isSuccess: boolean;
  /** contains success event if the result was successful */
  successResult?: PlayCompleted;
  /** contains failure event if the result was failure */
  failureResult?: PlayFailed;
}

/**
 * RemoveParticipant event result
 */
export interface RemoveParticipantEventResult {
  /** returns true if remove participant was successful */
  isSuccess: boolean;
  /** contains success event if the result was successful */
  successResult?: RemoveParticipantSucceeded;
  /** contains failure event if the result was failure */
  failureResult?: RemoveParticipantFailed;
}

/**
 * SendDtmf event result
 */
export interface SendDtmfEventResult {
  /** returns true if send dtmf was successful */
  isSuccess: boolean;
  /** contains success event if the result was successful */
  successResult?: SendDtmfTonesCompleted;
  /** contains failure event if the result was failure */
  failureResult?: SendDtmfTonesFailed;
}

/**
 * StartRecognizing event result
 */
export interface StartRecognizingEventResult {
  /** returns true if recognize was successful */
  isSuccess: boolean;
  /** contains success event if the result was successful */
  successResult?: RecognizeCompleted;
  /** contains failure event if the result was failure */
  failureResult?: RecognizeFailed;
}

/**
 * TransferCallToParticipant event result
 */
export interface TransferCallToParticipantEventResult {
  /** returns true if transfer call to participant was successful */
  isSuccess: boolean;
  /** contains success event if the result was successful */
  successResult?: CallTransferAccepted;
  /** contains failure event if the result was failure */
  failureResult?: CallTransferFailed;
}

/**
 * TransferCallToParticipant event result
 */
export interface CancelAddParticipantEventResult {
  /** returns true if cancel add participant was successful */
  isSuccess: boolean;
  /** contains success event if the result was successful */
  successResult?: CancelAddParticipantSucceeded;
  /** contains failure event if the result was failure */
  failureResult?: CancelAddParticipantFailed;
}
