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
  SendDtmfCompleted,
  SendDtmfFailed,
  RecognizeCompleted,
  RecognizeFailed,
  CallTransferAccepted,
  CallTransferFailed,
} from "../models/events";

/**
 * AddParticipant event result
 */
export interface AddParticipantEventResult {
  isSuccess: boolean;
  successResult?: AddParticipantSucceeded;
  failureResult?: AddParticipantFailed;
}

/**
 * AnswerCall event result
 */
export interface AnswerCallEventResult {
  isSuccess: boolean;
  successResult?: CallConnected;
}

/**
 * CancelAllMediaOperations event result
 */
export interface CancelAllMediaOperationsEventResult {
  isSuccess: boolean;
  playCanceledSuccessResult?: PlayCanceled;
  recognizeCanceledSuccessResult?: RecognizeCanceled;
}

/**
 * CreateCall event result
 */
export interface CreateCallEventResult {
  isSuccess: boolean;
  successResult?: CallConnected;
}

/**
 * Play event result
 */
export interface PlayEventResult {
  isSuccess: boolean;
  successResult?: PlayCompleted;
  failureResult?: PlayFailed;
}

/**
 * RemoveParticipant event result
 */
export interface RemoveParticipantEventResult {
  isSuccess: boolean;
  successResult?: RemoveParticipantSucceeded;
  failureResult?: RemoveParticipantFailed;
}

/**
 * SendDtmf event result
 */
export interface SendDtmfEventResult {
  isSuccess: boolean;
  successResult?: SendDtmfCompleted;
  failureResult?: SendDtmfFailed;
}

/**
 * StartRecognizing event result
 */
export interface StartRecognizingEventResult {
  isSuccess: boolean;
  successResult?: RecognizeCompleted;
  failureResult?: RecognizeFailed;
}

/**
 * TransferCallToParticipant event result
 */
export interface TransferCallToParticipantEventResult {
  isSuccess: boolean;
  successResult?: CallTransferAccepted;
  failureResult?: CallTransferFailed;
}
