// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UsagesListByInstancePoolOptionalParams extends OperationOptions {
  /** Optional request parameter to include managed instance usages within the instance pool. */
  expandChildren?: boolean;
}
