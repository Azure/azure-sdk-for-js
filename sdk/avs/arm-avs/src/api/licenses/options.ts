// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LicensesGetPropertiesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LicensesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LicensesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LicensesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LicensesListOptionalParams extends OperationOptions {}
