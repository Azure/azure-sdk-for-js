// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QuotaTransferCancelRequest } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface QuotaTransfersCancelOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  repeatabilityRequestId?: string;
  /** Specifies the date and time at which the request was first created. */
  repeatabilityFirstSent?: Date;
  /** The content of the action request */
  body?: QuotaTransferCancelRequest;
}

/** Optional parameters. */
export interface QuotaTransfersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface QuotaTransfersDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface QuotaTransfersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface QuotaTransfersGetOptionalParams extends OperationOptions {}
