// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NeuroShieldMitigationsRollbackOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NeuroShieldMitigationsExecuteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NeuroShieldMitigationsListByNeuroShieldOptionalParams extends OperationOptions {
  /** The maximum number of items to return. */
  top?: number;
  /** The continuation token used to retrieve the next page. */
  skipToken?: string;
}

/** Optional parameters. */
export interface NeuroShieldMitigationsListOptionalParams extends OperationOptions {
  /** The maximum number of items to return. */
  top?: number;
  /** The continuation token used to retrieve the next page. */
  skipToken?: string;
}

/** Optional parameters. */
export interface NeuroShieldMitigationsGetOptionalParams extends OperationOptions {}
