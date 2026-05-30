// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EduEnrollmentsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EduEnrollmentsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EduEnrollmentsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EduEnrollmentsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EduEnrollmentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EduEnrollmentsGetOptionalParams extends OperationOptions {}
