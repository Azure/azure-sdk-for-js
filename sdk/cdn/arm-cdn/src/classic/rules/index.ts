// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import { listByRuleSet, $delete, update, create, get } from "../../api/rules/operations.js";
import type {
  RulesListByRuleSetOptionalParams,
  RulesDeleteOptionalParams,
  RulesUpdateOptionalParams,
  RulesCreateOptionalParams,
  RulesGetOptionalParams,
} from "../../api/rules/options.js";
import type { Rule, RuleUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Rules operations. */
export interface RulesOperations {
  /** Lists all of the existing delivery rules within a rule set. */
  listByRuleSet: (
    resourceGroupName: string,
    profileName: string,
    ruleSetName: string,
    options?: RulesListByRuleSetOptionalParams,
  ) => PagedAsyncIterableIterator<Rule>;
  /** Deletes an existing delivery rule within a rule set. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    ruleSetName: string,
    ruleName: string,
    options?: RulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an existing delivery rule within a rule set. */
  update: (
    resourceGroupName: string,
    profileName: string,
    ruleSetName: string,
    ruleName: string,
    ruleUpdateProperties: RuleUpdateParameters,
    options?: RulesUpdateOptionalParams,
  ) => PollerLike<OperationState<Rule>, Rule>;
  /** Creates a new delivery rule within the specified rule set. */
  create: (
    resourceGroupName: string,
    profileName: string,
    ruleSetName: string,
    ruleName: string,
    rule: Rule,
    options?: RulesCreateOptionalParams,
  ) => PollerLike<OperationState<Rule>, Rule>;
  /** Gets an existing delivery rule within a rule set. */
  get: (
    resourceGroupName: string,
    profileName: string,
    ruleSetName: string,
    ruleName: string,
    options?: RulesGetOptionalParams,
  ) => Promise<Rule>;
}

function _getRules(context: CdnManagementContext) {
  return {
    listByRuleSet: (
      resourceGroupName: string,
      profileName: string,
      ruleSetName: string,
      options?: RulesListByRuleSetOptionalParams,
    ) => listByRuleSet(context, resourceGroupName, profileName, ruleSetName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      ruleSetName: string,
      ruleName: string,
      options?: RulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, ruleSetName, ruleName, options),
    update: (
      resourceGroupName: string,
      profileName: string,
      ruleSetName: string,
      ruleName: string,
      ruleUpdateProperties: RuleUpdateParameters,
      options?: RulesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        profileName,
        ruleSetName,
        ruleName,
        ruleUpdateProperties,
        options,
      ),
    create: (
      resourceGroupName: string,
      profileName: string,
      ruleSetName: string,
      ruleName: string,
      rule: Rule,
      options?: RulesCreateOptionalParams,
    ) => create(context, resourceGroupName, profileName, ruleSetName, ruleName, rule, options),
    get: (
      resourceGroupName: string,
      profileName: string,
      ruleSetName: string,
      ruleName: string,
      options?: RulesGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, ruleSetName, ruleName, options),
  };
}

export function _getRulesOperations(context: CdnManagementContext): RulesOperations {
  return {
    ..._getRules(context),
  };
}
