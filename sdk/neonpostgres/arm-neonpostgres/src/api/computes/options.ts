// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ComputesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ComputesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ComputesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ComputesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ComputesGetOptionalParams extends OperationOptions {}
