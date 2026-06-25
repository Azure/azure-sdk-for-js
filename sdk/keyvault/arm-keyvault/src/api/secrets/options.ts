// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SecretsListOptionalParams extends OperationOptions {
  /** Maximum number of results to return. */
  top?: number;
}

/** Optional parameters. */
export interface SecretsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SecretsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SecretsGetOptionalParams extends OperationOptions {}
