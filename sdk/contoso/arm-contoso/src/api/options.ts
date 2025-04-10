// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EmployeesListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface EmployeesListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface EmployeesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EmployeesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EmployeesCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EmployeesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OperationsListOptionalParams extends OperationOptions {}
