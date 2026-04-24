// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface HeatMapGetOptionalParams extends OperationOptions {
  /** The top left latitude,longitude pair of the rectangular viewport to query for. */
  topLeft?: number[];
  /** The bottom right latitude,longitude pair of the rectangular viewport to query for. */
  botRight?: number[];
}
