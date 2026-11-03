// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RuleSet } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RuleSetsListResourceUsageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RuleSetsListByProfileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RuleSetsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RuleSetsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Resource create parameters. */
  resource?: RuleSet;
}

/** Optional parameters. */
export interface RuleSetsGetOptionalParams extends OperationOptions {}
