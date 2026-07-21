// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationRule } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AutomationRulesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AutomationRulesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AutomationRulesCreateOrUpdateOptionalParams extends OperationOptions {
  /** The automation rule */
  automationRuleToUpsert?: AutomationRule;
}

/** Optional parameters. */
export interface AutomationRulesGetOptionalParams extends OperationOptions {}
