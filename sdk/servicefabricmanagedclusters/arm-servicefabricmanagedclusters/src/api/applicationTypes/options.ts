// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApplicationTypesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationTypesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApplicationTypesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationTypesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationTypesGetOptionalParams extends OperationOptions {}
