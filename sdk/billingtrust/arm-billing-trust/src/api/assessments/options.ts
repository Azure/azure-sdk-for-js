// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AssessmentsListUploadTokenOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AssessmentsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AssessmentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AssessmentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AssessmentsGetOptionalParams extends OperationOptions {}
