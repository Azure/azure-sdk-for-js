// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CostControlsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CostControlsDeleteOptionalParams extends OperationOptions {
  /** Proceeds only when the current entity tag matches this value. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface CostControlsUpdateOptionalParams extends OperationOptions {
  /** Proceeds only when the current entity tag matches this value. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface CostControlsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Proceeds only when the current entity tag matches this value. */
  ifMatch?: string;
  /** Proceeds only when the current entity tag does not match this value. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface CostControlsGetOptionalParams extends OperationOptions {}
