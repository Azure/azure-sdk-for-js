// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VmSkusListOptionalParams extends OperationOptions {
  /** To Include Extended Locations information or not in the response. */
  includeExtendedLocations?: boolean;
}
