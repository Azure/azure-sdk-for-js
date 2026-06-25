// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateLinkScopesGetValidationDetailsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateLinkScopesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateLinkScopesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateLinkScopesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateLinkScopesUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateLinkScopesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateLinkScopesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateLinkScopesGetValidationDetailsForMachineOptionalParams extends OperationOptions {}
