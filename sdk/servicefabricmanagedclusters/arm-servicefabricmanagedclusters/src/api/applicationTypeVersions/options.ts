// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApplicationTypeVersionsListByApplicationTypesOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationTypeVersionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApplicationTypeVersionsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationTypeVersionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApplicationTypeVersionsGetOptionalParams extends OperationOptions {}
