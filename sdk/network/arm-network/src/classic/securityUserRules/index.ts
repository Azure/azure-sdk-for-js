// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/securityUserRules/operations.js";
import {
  SecurityUserRulesListOptionalParams,
  SecurityUserRulesDeleteOptionalParams,
  SecurityUserRulesCreateOrUpdateOptionalParams,
  SecurityUserRulesGetOptionalParams,
} from "../../api/securityUserRules/options.js";
import { SecurityUserRule } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SecurityUserRules operations. */
export interface SecurityUserRulesOperations {
  /** Lists all Security User Rules in a rule collection. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    options?: SecurityUserRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityUserRule>;
  /** Deletes a security user rule. */
  delete: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    ruleName: string,
    options?: SecurityUserRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    ruleName: string,
    options?: SecurityUserRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    ruleName: string,
    options?: SecurityUserRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a security user rule. */
  createOrUpdate: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    ruleName: string,
    securityUserRule: SecurityUserRule,
    options?: SecurityUserRulesCreateOrUpdateOptionalParams,
  ) => Promise<SecurityUserRule>;
  /** Gets a security user rule. */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    ruleName: string,
    options?: SecurityUserRulesGetOptionalParams,
  ) => Promise<SecurityUserRule>;
}

function _getSecurityUserRules(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      ruleCollectionName: string,
      options?: SecurityUserRulesListOptionalParams,
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
      options?: SecurityUserRulesDeleteOptionalParams,
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
      options?: SecurityUserRulesDeleteOptionalParams,
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
      options?: SecurityUserRulesDeleteOptionalParams,
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
      securityUserRule: SecurityUserRule,
      options?: SecurityUserRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        ruleCollectionName,
        ruleName,
        securityUserRule,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      ruleCollectionName: string,
      ruleName: string,
      options?: SecurityUserRulesGetOptionalParams,
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

export function _getSecurityUserRulesOperations(
  context: NetworkManagementContext,
): SecurityUserRulesOperations {
  return {
    ..._getSecurityUserRules(context),
  };
}
