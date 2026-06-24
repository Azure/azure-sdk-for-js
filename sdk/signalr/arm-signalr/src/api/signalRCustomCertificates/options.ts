// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SignalRCustomCertificatesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignalRCustomCertificatesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignalRCustomCertificatesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SignalRCustomCertificatesGetOptionalParams extends OperationOptions {}
