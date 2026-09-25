// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  IncomingQuotaTransferApproveRequest,
  IncomingQuotaTransferRejectRequest,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IncomingQuotaTransfersRejectOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  repeatabilityRequestId?: string;
  /** Specifies the date and time at which the request was first created. */
  repeatabilityFirstSent?: Date;
  /** The content of the action request */
  body?: IncomingQuotaTransferRejectRequest;
}

/** Optional parameters. */
export interface IncomingQuotaTransfersApproveOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  repeatabilityRequestId?: string;
  /** Specifies the date and time at which the request was first created. */
  repeatabilityFirstSent?: Date;
  /** The content of the action request */
  body?: IncomingQuotaTransferApproveRequest;
}

/** Optional parameters. */
export interface IncomingQuotaTransfersListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IncomingQuotaTransfersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IncomingQuotaTransfersGetOptionalParams extends OperationOptions {}
