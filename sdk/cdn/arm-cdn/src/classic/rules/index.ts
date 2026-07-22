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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    profileName: string,
    ruleSetName: string,
    ruleName: string,
    options?: RulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    profileName: string,
    ruleSetName: string,
    ruleName: string,
    options?: RulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing delivery rule within a rule set. */
  update: (
    resourceGroupName: string,
    profileName: string,
    ruleSetName: string,
    ruleName: string,
    ruleUpdateProperties: RuleUpdateParameters,
    options?: RulesUpdateOptionalParams,
  ) => PollerLike<OperationState<Rule>, Rule>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    profileName: string,
    ruleSetName: string,
    ruleName: string,
    ruleUpdateProperties: RuleUpdateParameters,
    options?: RulesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Rule>, Rule>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    profileName: string,
    ruleSetName: string,
    ruleName: string,
    ruleUpdateProperties: RuleUpdateParameters,
    options?: RulesUpdateOptionalParams,
  ) => Promise<Rule>;
  /** Creates a new delivery rule within the specified rule set. */
  create: (
    resourceGroupName: string,
    profileName: string,
    ruleSetName: string,
    ruleName: string,
    rule: Rule,
    options?: RulesCreateOptionalParams,
  ) => PollerLike<OperationState<Rule>, Rule>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    profileName: string,
    ruleSetName: string,
    ruleName: string,
    rule: Rule,
    options?: RulesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Rule>, Rule>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    profileName: string,
    ruleSetName: string,
    ruleName: string,
    rule: Rule,
    options?: RulesCreateOptionalParams,
  ) => Promise<Rule>;
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
    beginDelete: async (
      resourceGroupName: string,
      profileName: string,
      ruleSetName: string,
      ruleName: string,
      options?: RulesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        profileName,
        ruleSetName,
        ruleName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      profileName: string,
      ruleSetName: string,
      ruleName: string,
      options?: RulesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, profileName, ruleSetName, ruleName, options);
    },
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
    beginUpdate: async (
      resourceGroupName: string,
      profileName: string,
      ruleSetName: string,
      ruleName: string,
      ruleUpdateProperties: RuleUpdateParameters,
      options?: RulesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        profileName,
        ruleSetName,
        ruleName,
        ruleUpdateProperties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      ruleSetName: string,
      ruleName: string,
      ruleUpdateProperties: RuleUpdateParameters,
      options?: RulesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        profileName,
        ruleSetName,
        ruleName,
        ruleUpdateProperties,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      profileName: string,
      ruleSetName: string,
      ruleName: string,
      rule: Rule,
      options?: RulesCreateOptionalParams,
    ) => create(context, resourceGroupName, profileName, ruleSetName, ruleName, rule, options),
    beginCreate: async (
      resourceGroupName: string,
      profileName: string,
      ruleSetName: string,
      ruleName: string,
      rule: Rule,
      options?: RulesCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        profileName,
        ruleSetName,
        ruleName,
        rule,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      ruleSetName: string,
      ruleName: string,
      rule: Rule,
      options?: RulesCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        profileName,
        ruleSetName,
        ruleName,
        rule,
        options,
      );
    },
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
