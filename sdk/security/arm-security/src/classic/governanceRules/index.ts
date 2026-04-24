// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import {
  operationResults,
  execute,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/governanceRules/operations.js";
import type {
  GovernanceRulesOperationResultsOptionalParams,
  GovernanceRulesExecuteOptionalParams,
  GovernanceRulesListOptionalParams,
  GovernanceRulesDeleteOptionalParams,
  GovernanceRulesCreateOrUpdateOptionalParams,
  GovernanceRulesGetOptionalParams,
} from "../../api/governanceRules/options.js";
import type {
  GovernanceAPIGovernanceRule,
  GovernanceAPIOperationResult,
} from "../../models/governanceAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GovernanceRules operations. */
export interface GovernanceRulesOperations {
  /** Get governance rules long run operation result for the requested scope by ruleId and operationId */
  operationResults: (
    scope: string,
    ruleId: string,
    operationId: string,
    options?: GovernanceRulesOperationResultsOptionalParams,
  ) => Promise<GovernanceAPIOperationResult>;
  /** Execute a governance rule */
  execute: (
    scope: string,
    ruleId: string,
    options?: GovernanceRulesExecuteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use execute instead */
  beginExecute: (
    scope: string,
    ruleId: string,
    options?: GovernanceRulesExecuteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use execute instead */
  beginExecuteAndWait: (
    scope: string,
    ruleId: string,
    options?: GovernanceRulesExecuteOptionalParams,
  ) => Promise<void>;
  /** Get a list of all relevant governance rules over a scope */
  list: (
    scope: string,
    options?: GovernanceRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<GovernanceAPIGovernanceRule>;
  /** Delete a Governance rule over a given scope */
  delete: (
    scope: string,
    ruleId: string,
    options?: GovernanceRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    scope: string,
    ruleId: string,
    options?: GovernanceRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    scope: string,
    ruleId: string,
    options?: GovernanceRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a governance rule over a given scope */
  createOrUpdate: (
    scope: string,
    ruleId: string,
    governanceRule: GovernanceAPIGovernanceRule,
    options?: GovernanceRulesCreateOrUpdateOptionalParams,
  ) => Promise<GovernanceAPIGovernanceRule>;
  /** Get a specific governance rule for the requested scope by ruleId */
  get: (
    scope: string,
    ruleId: string,
    options?: GovernanceRulesGetOptionalParams,
  ) => Promise<GovernanceAPIGovernanceRule>;
}

function _getGovernanceRules(context: SecurityCenterContext) {
  return {
    operationResults: (
      scope: string,
      ruleId: string,
      operationId: string,
      options?: GovernanceRulesOperationResultsOptionalParams,
    ) => operationResults(context, scope, ruleId, operationId, options),
    execute: (scope: string, ruleId: string, options?: GovernanceRulesExecuteOptionalParams) =>
      execute(context, scope, ruleId, options),
    beginExecute: async (
      scope: string,
      ruleId: string,
      options?: GovernanceRulesExecuteOptionalParams,
    ) => {
      const poller = execute(context, scope, ruleId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginExecuteAndWait: async (
      scope: string,
      ruleId: string,
      options?: GovernanceRulesExecuteOptionalParams,
    ) => {
      return await execute(context, scope, ruleId, options);
    },
    list: (scope: string, options?: GovernanceRulesListOptionalParams) =>
      list(context, scope, options),
    delete: (scope: string, ruleId: string, options?: GovernanceRulesDeleteOptionalParams) =>
      $delete(context, scope, ruleId, options),
    beginDelete: async (
      scope: string,
      ruleId: string,
      options?: GovernanceRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, scope, ruleId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      scope: string,
      ruleId: string,
      options?: GovernanceRulesDeleteOptionalParams,
    ) => {
      return await $delete(context, scope, ruleId, options);
    },
    createOrUpdate: (
      scope: string,
      ruleId: string,
      governanceRule: GovernanceAPIGovernanceRule,
      options?: GovernanceRulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, scope, ruleId, governanceRule, options),
    get: (scope: string, ruleId: string, options?: GovernanceRulesGetOptionalParams) =>
      get(context, scope, ruleId, options),
  };
}

export function _getGovernanceRulesOperations(
  context: SecurityCenterContext,
): GovernanceRulesOperations {
  return {
    ..._getGovernanceRules(context),
  };
}
