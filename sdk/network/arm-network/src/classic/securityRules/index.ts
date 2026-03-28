// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/securityRules/operations.js";
import type {
  SecurityRulesListOptionalParams,
  SecurityRulesDeleteOptionalParams,
  SecurityRulesCreateOrUpdateOptionalParams,
  SecurityRulesGetOptionalParams,
} from "../../api/securityRules/options.js";
import type { SecurityRule } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SecurityRules operations. */
export interface SecurityRulesOperations {
  /** Gets all security rules in a network security group. */
  list: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    options?: SecurityRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityRule>;
  /** Deletes the specified network security rule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    securityRuleName: string,
    options?: SecurityRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    securityRuleName: string,
    options?: SecurityRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    securityRuleName: string,
    options?: SecurityRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a security rule in the specified network security group. */
  createOrUpdate: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    securityRuleName: string,
    securityRuleParameters: SecurityRule,
    options?: SecurityRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SecurityRule>, SecurityRule>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    securityRuleName: string,
    securityRuleParameters: SecurityRule,
    options?: SecurityRulesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SecurityRule>, SecurityRule>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    securityRuleName: string,
    securityRuleParameters: SecurityRule,
    options?: SecurityRulesCreateOrUpdateOptionalParams,
  ) => Promise<SecurityRule>;
  /** Get the specified network security rule. */
  get: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    securityRuleName: string,
    options?: SecurityRulesGetOptionalParams,
  ) => Promise<SecurityRule>;
}

function _getSecurityRules(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      options?: SecurityRulesListOptionalParams,
    ) => list(context, resourceGroupName, networkSecurityGroupName, options),
    delete: (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      securityRuleName: string,
      options?: SecurityRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkSecurityGroupName, securityRuleName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      securityRuleName: string,
      options?: SecurityRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkSecurityGroupName,
        securityRuleName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      securityRuleName: string,
      options?: SecurityRulesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkSecurityGroupName,
        securityRuleName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      securityRuleName: string,
      securityRuleParameters: SecurityRule,
      options?: SecurityRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkSecurityGroupName,
        securityRuleName,
        securityRuleParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      securityRuleName: string,
      securityRuleParameters: SecurityRule,
      options?: SecurityRulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        networkSecurityGroupName,
        securityRuleName,
        securityRuleParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      securityRuleName: string,
      securityRuleParameters: SecurityRule,
      options?: SecurityRulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        networkSecurityGroupName,
        securityRuleName,
        securityRuleParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      securityRuleName: string,
      options?: SecurityRulesGetOptionalParams,
    ) => get(context, resourceGroupName, networkSecurityGroupName, securityRuleName, options),
  };
}

export function _getSecurityRulesOperations(
  context: NetworkManagementContext,
): SecurityRulesOperations {
  return {
    ..._getSecurityRules(context),
  };
}
