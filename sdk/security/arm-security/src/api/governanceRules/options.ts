// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GovernanceAPIExecuteGovernanceRuleParams } from "../../models/governanceAPI/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GovernanceRulesOperationResultsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GovernanceRulesExecuteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Execute governance rule over a given scope */
  executeGovernanceRuleParams?: GovernanceAPIExecuteGovernanceRuleParams;
}

/** Optional parameters. */
export interface GovernanceRulesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GovernanceRulesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GovernanceRulesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GovernanceRulesGetOptionalParams extends OperationOptions {}
