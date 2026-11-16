// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NeuroShieldFindingsRollbackOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NeuroShieldFindingsMitigateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NeuroShieldFindingsListByNeuroShieldOptionalParams extends OperationOptions {
  /** The maximum number of items to return. */
  top?: number;
  /** The continuation token used to retrieve the next page. */
  skipToken?: string;
}

/** Optional parameters. */
export interface NeuroShieldFindingsListOptionalParams extends OperationOptions {
  /** The maximum number of items to return. */
  top?: number;
  /** The continuation token used to retrieve the next page. */
  skipToken?: string;
}

/** Optional parameters. */
export interface NeuroShieldFindingsGetOptionalParams extends OperationOptions {}
