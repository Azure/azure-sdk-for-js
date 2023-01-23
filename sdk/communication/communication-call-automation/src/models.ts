// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { CallRejectReason } from "./generated/src";

/**
 * Options to reject call.
 */
export interface RejectCallOptions extends OperationOptions {
    /** The rejection reason. */
    callRejectReason?: CallRejectReason;
}
