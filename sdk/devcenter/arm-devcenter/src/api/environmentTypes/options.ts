// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EnvironmentTypesListByDevCenterOptionalParams extends OperationOptions {
  /** The maximum number of resources to return from the operation. Example: '$top=10'. */
  top?: number;
}

/** Optional parameters. */
export interface EnvironmentTypesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnvironmentTypesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnvironmentTypesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnvironmentTypesGetOptionalParams extends OperationOptions {}
