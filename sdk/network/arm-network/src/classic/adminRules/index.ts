// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/adminRules/operations.js";
import type {
  AdminRulesListOptionalParams,
  AdminRulesDeleteOptionalParams,
  AdminRulesCreateOrUpdateOptionalParams,
  AdminRulesGetOptionalParams,
} from "../../api/adminRules/options.js";
import type { BaseAdminRuleUnion } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AdminRules operations. */
export interface AdminRulesOperations {
  /** List all network manager security configuration admin rules. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    options?: AdminRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<BaseAdminRuleUnion>;
  /** Deletes an admin rule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    ruleName: string,
    options?: AdminRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    ruleName: string,
    options?: AdminRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    ruleName: string,
    options?: AdminRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an admin rule. */
  createOrUpdate: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    ruleName: string,
    adminRule: BaseAdminRuleUnion,
    options?: AdminRulesCreateOrUpdateOptionalParams,
  ) => Promise<BaseAdminRuleUnion>;
  /** Gets a network manager security configuration admin rule. */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    ruleName: string,
    options?: AdminRulesGetOptionalParams,
  ) => Promise<BaseAdminRuleUnion>;
}

function _getAdminRules(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      ruleCollectionName: string,
      options?: AdminRulesListOptionalParams,
    ) =>
      list(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        ruleCollectionName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      ruleCollectionName: string,
      ruleName: string,
      options?: AdminRulesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        ruleCollectionName,
        ruleName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      ruleCollectionName: string,
      ruleName: string,
      options?: AdminRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        ruleCollectionName,
        ruleName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      ruleCollectionName: string,
      ruleName: string,
      options?: AdminRulesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        ruleCollectionName,
        ruleName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      ruleCollectionName: string,
      ruleName: string,
      adminRule: BaseAdminRuleUnion,
      options?: AdminRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        ruleCollectionName,
        ruleName,
        adminRule,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      ruleCollectionName: string,
      ruleName: string,
      options?: AdminRulesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        ruleCollectionName,
        ruleName,
        options,
      ),
  };
}

export function _getAdminRulesOperations(context: NetworkManagementContext): AdminRulesOperations {
  return {
    ..._getAdminRules(context),
  };
}
