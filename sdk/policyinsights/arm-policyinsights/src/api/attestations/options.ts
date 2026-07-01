// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AttestationsListForSubscriptionQueryOptions,
  AttestationsListForResourceGroupQueryOptions,
  AttestationsListForResourceQueryOptions,
} from "../../models/policyInsightsManagementClient/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AttestationsListForResourceOptionalParams extends OperationOptions {
  queryOptions?: AttestationsListForResourceQueryOptions;
}

/** Optional parameters. */
export interface AttestationsDeleteAtResourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AttestationsCreateOrUpdateAtResourceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AttestationsGetAtResourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AttestationsListForResourceGroupOptionalParams extends OperationOptions {
  queryOptions?: AttestationsListForResourceGroupQueryOptions;
}

/** Optional parameters. */
export interface AttestationsDeleteAtResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AttestationsCreateOrUpdateAtResourceGroupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AttestationsGetAtResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AttestationsListForSubscriptionOptionalParams extends OperationOptions {
  queryOptions?: AttestationsListForSubscriptionQueryOptions;
}

/** Optional parameters. */
export interface AttestationsDeleteAtSubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AttestationsCreateOrUpdateAtSubscriptionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AttestationsGetAtSubscriptionOptionalParams extends OperationOptions {}
