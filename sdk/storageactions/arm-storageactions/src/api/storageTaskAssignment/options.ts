// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface StorageTaskAssignmentListOptionalParams extends OperationOptions {
  /** Optional, specifies the maximum number of Storage Task Assignment Resource IDs to be included in the list response. */
  maxpagesize?: number;
}
