// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TrafficFiltersDeleteOptionalParams extends OperationOptions {
  /** Ruleset Id of the filter */
  rulesetId?: string;
}
