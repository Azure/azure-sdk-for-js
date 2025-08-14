// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementContext } from "../../api/azureStackHcivmManagementContext.js";
import {
  listByNetworkSecurityGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/securityRules/operations.js";
import {
  SecurityRulesListByNetworkSecurityGroupOptionalParams,
  SecurityRulesDeleteOptionalParams,
  SecurityRulesCreateOrUpdateOptionalParams,
  SecurityRulesGetOptionalParams,
} from "../../api/securityRules/options.js";
import { SecurityRule } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SecurityRules operations. */
export interface SecurityRulesOperations {
  /** Gets all security rules in a Network Security Group. */
  listByNetworkSecurityGroup: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    options?: SecurityRulesListByNetworkSecurityGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityRule>;
  /** Deletes the specified security rule. */
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
  /** Creates or updates a security rule in the specified resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    securityRuleName: string,
    resource: SecurityRule,
    options?: SecurityRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SecurityRule>, SecurityRule>;
  /** Gets the specified security rule. */
  get: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    securityRuleName: string,
    options?: SecurityRulesGetOptionalParams,
  ) => Promise<SecurityRule>;
}

function _getSecurityRules(context: AzureStackHCIVMManagementContext) {
  return {
    listByNetworkSecurityGroup: (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      options?: SecurityRulesListByNetworkSecurityGroupOptionalParams,
    ) => listByNetworkSecurityGroup(context, resourceGroupName, networkSecurityGroupName, options),
    delete: (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      securityRuleName: string,
      options?: SecurityRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkSecurityGroupName, securityRuleName, options),
    createOrUpdate: (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      securityRuleName: string,
      resource: SecurityRule,
      options?: SecurityRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkSecurityGroupName,
        securityRuleName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      securityRuleName: string,
      options?: SecurityRulesGetOptionalParams,
    ) => get(context, resourceGroupName, networkSecurityGroupName, securityRuleName, options),
  };
}

export function _getSecurityRulesOperations(
  context: AzureStackHCIVMManagementContext,
): SecurityRulesOperations {
  return {
    ..._getSecurityRules(context),
  };
}
