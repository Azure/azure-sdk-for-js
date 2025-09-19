// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitoringTagRules } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TagRulesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagRulesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TagRulesCreateOrUpdateOptionalParams extends OperationOptions {
  /** request body of MonitoringTagRules */
  body?: MonitoringTagRules;
}

/** Optional parameters. */
export interface TagRulesGetOptionalParams extends OperationOptions {}
