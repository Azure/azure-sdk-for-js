// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BackupWorkloadItemsListOptionalParams extends OperationOptions {
  filter?: string;
  skipToken?: string;
}
