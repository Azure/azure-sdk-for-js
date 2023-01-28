// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PhoneNumberIdentifier, CommunicationIdentifier } from "@azure/communication-common";
import { OperationOptions } from "@azure/core-client";
import { MediaStreamingConfiguration } from "../models/models";
import { CallRejectReason } from "./models";

/**
 * Options to create a call.
 */
export interface CreateCallOptions extends OperationOptions {
    /** The operation context. */
    operationContext?: string;
    /** The Azure cognitive services end point url. */
    azureCognitiveServicesEndpointUrl?: string;
    /** Configuration of Media streaming. */
    mediaStreamingConfiguration?: MediaStreamingConfiguration
}

/**
 * Options to answer a call.
 */
export interface AnswerCallOptions extends OperationOptions {
    /** The Azure cognitive services end point url. */
    azureCognitiveServicesEndpointUrl?: string;
    /** Configuration of Media streaming. */
    mediaStreamingConfiguration?: MediaStreamingConfiguration
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
    /** The caller ID of the transferee when transferring to PSTN. */
    transfereeCallerId?: PhoneNumberIdentifier;
    /** Used by customers when calling mid-call actions to correlate the request to the response event. */
    operationContext?: string;
}

/** Options to add participants. */
export interface AddParticipantsOptions extends OperationOptions {
    /**
     * The source caller Id, a phone number, that's shown to the PSTN participant being invited.
     * Required only when inviting a PSTN participant.
     */
    sourceCallerId?: PhoneNumberIdentifier;
    /**
     * The display name of the source that is associated with this invite operation when
     * adding a PSTN participant or teams user.  Note: Will not update the display name in the roster.
     */
    sourceDisplayName?: string;
    /**
     * The identifier of the source of the call for this invite operation. If SourceDisplayName
     * is not set, the display name of the source will be used by default when adding a PSTN participant or teams user.
     */
    sourceIdentifier?: CommunicationIdentifier;
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