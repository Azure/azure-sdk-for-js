// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProjectCostControlsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProjectCostControlsDeleteOptionalParams extends OperationOptions {
  /** Proceeds only if the current entity tag matches this value. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ProjectCostControlsUpdateOptionalParams extends OperationOptions {
  /** Proceeds only if the current entity tag matches this value. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ProjectCostControlsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Proceeds only if the current entity tag matches this value. */
  ifMatch?: string;
  /** Proceeds only if the current entity tag does not match this value. Use * to create only if absent. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface ProjectCostControlsCheckExistenceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProjectCostControlsGetOptionalParams extends OperationOptions {}
