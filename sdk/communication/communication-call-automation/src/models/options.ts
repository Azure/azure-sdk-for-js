// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PhoneNumberIdentifier } from "@azure/communication-common";
import { OperationOptions } from "@azure/core-client";
import { MediaStreamingConfiguration } from "../models/models";
import { CallRejectReason } from "./models";
import { CallRecordingStartRecordingOptionalParams as RestCallRecordingStartRecordingOptions } from "../generated/src/models";

export { RestCallRecordingStartRecordingOptions };

/**
 * Options to create a call.
 */
export interface CreateCallOptions extends OperationOptions {
    /**
    * The source caller Id, a phone number, that's shown to the PSTN participant being invited.
    * Required only when calling a PSTN callee.
    */
    sourceCallIdNumber?: PhoneNumberIdentifier;
    /** Display name of the call if dialing out to a pstn number */
    sourceDisplayName?: string;
    /** The operation context. */
    operationContext?: string;
    /** The Azure cognitive services end point url. */
    azureCognitiveServicesEndpointUrl?: string;
    /** Configuration of Media streaming. */
    mediaStreamingConfiguration?: MediaStreamingConfiguration;
}

/**
 * Options to answer a call.
 */
export interface AnswerCallOptions extends OperationOptions {
  /** The Azure cognitive services end point url. */
  azureCognitiveServicesEndpointUrl?: string;
  /** Configuration of Media streaming. */
  mediaStreamingConfiguration?: MediaStreamingConfiguration;
}

/**
 * Options to redirect call.
 */
export type RedirectCallOptions = OperationOptions;

/**
 * Options to reject call.
 */
export interface RejectCallOptions extends OperationOptions {
  /** The rejection reason. */
  callRejectReason?: CallRejectReason;
}

/**
 * Options to transfer participants.
 */
export interface TransferCallToParticipantOptions extends OperationOptions {
  /** Used by customers when calling mid-call actions to correlate the request to the response event. */
  operationContext?: string;
}

/** Options to add participants. */
export interface AddParticipantOptions extends OperationOptions {
  /**
   * Gets or sets the timeout to wait for the invited participant to pickup.
   * The maximum value of this is 180 seconds
   */
  invitationTimeoutInSeconds?: number;
  /** Used by customers when calling mid-call actions to correlate the request to the response event. */
  operationContext?: string;
}

/**
 * Options to remove participants.
 */
export interface RemoveParticipantsOptions extends OperationOptions {
  /** Used by customers when calling mid-call actions to correlate the request to the response event. */
  operationContext?: string;
}

/**
 * Options to get call connection properties.
 */
export type GetCallConnectionPropertiesOptions = OperationOptions;

/**
 * Options to hang up the call
 */
export type HangUpOptions = OperationOptions;

/**
 * Options to get a participant.
 */
export type GetParticipantOptions = OperationOptions;

/**
 * Options to get a start a recording.
 */
export type CallRecordingStartRecordingOptions = RestCallRecordingStartRecordingOptions;

/**
 * Options to get a stop a recording.
 */
export type CallRecordingStopRecordingOptions = OperationOptions;

/**
 * Options to get a pause a recording.
 */
export type CallRecordingPauseRecordingOptions = OperationOptions;

/**
 * Options to get recording properties.
 */
export type CallRecordingGetRecordingPropertiesOptions = OperationOptions;

/**
 * Options to resume recording.
 */
export type CallRecordingResumeRecordingOptionalParams = OperationOptions;
