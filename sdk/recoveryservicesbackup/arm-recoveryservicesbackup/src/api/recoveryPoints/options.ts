// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RecoveryPointsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RecoveryPointsListOptionalParams extends OperationOptions {
  filter?: string;
}

/** Optional parameters. */
export interface RecoveryPointsGetOptionalParams extends OperationOptions {}
