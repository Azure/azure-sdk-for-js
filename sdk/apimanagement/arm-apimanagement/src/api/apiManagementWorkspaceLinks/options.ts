// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApiManagementWorkspaceLinksListByServiceOptionalParams extends OperationOptions {
  /** Number of records to return. */
  top?: number;
  /** Skip token for retrieving the next page of results. */
  skipToken?: string;
}
