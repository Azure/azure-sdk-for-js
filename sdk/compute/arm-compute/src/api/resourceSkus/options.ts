// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ResourceSkusListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Only **location** filter is supported currently. */
  filter?: string;
  /** To Include Extended Locations information or not in the response. */
  includeExtendedLocations?: string;
}
