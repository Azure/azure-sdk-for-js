// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BackupEnginesListOptionalParams extends OperationOptions {
  filter?: string;
  skipToken?: string;
}

/** Optional parameters. */
export interface BackupEnginesGetOptionalParams extends OperationOptions {
  filter?: string;
  skipToken?: string;
}
