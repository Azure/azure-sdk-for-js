// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AccountCostControlsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccountCostControlsDeleteOptionalParams extends OperationOptions {
  /** Proceeds only if the current entity tag matches this value. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface AccountCostControlsUpdateOptionalParams extends OperationOptions {
  /** Proceeds only if the current entity tag matches this value. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface AccountCostControlsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Proceeds only if the current entity tag matches this value. */
  ifMatch?: string;
  /** Proceeds only if the current entity tag does not match this value. Use * to create only if absent. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface AccountCostControlsCheckExistenceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccountCostControlsGetOptionalParams extends OperationOptions {}
