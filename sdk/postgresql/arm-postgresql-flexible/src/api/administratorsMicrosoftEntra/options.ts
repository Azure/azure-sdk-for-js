// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AdministratorsMicrosoftEntraListByServerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AdministratorsMicrosoftEntraDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AdministratorsMicrosoftEntraCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AdministratorsMicrosoftEntraGetOptionalParams extends OperationOptions {}
