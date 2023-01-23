// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { CallRejectReason } from "../generated/src/models/index";

/**
 * Options to create a call.
 */
export interface CreateCallOptions extends OperationOptions {
    /** The operation context. */
    operationContext?: string;
    /** The Azure cognitive services end point url. */
    azureCognitiveServicesEndpointUrl?: string;
}

/**
 * Options to answer a call.
 */
export interface AnswerCallOptions extends OperationOptions {
    /** The Azure cognitive services end point url. */
    azureCognitiveServicesEndpointUrl?: string;
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
