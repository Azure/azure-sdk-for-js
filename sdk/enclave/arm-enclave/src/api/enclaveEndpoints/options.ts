// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EnclaveEndpointsHandleApprovalDeletionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EnclaveEndpointsHandleApprovalCreationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EnclaveEndpointsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnclaveEndpointsListByEnclaveResourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnclaveEndpointsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EnclaveEndpointsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EnclaveEndpointsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EnclaveEndpointsGetOptionalParams extends OperationOptions {}
