// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  reconcile,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/networkSecurityPerimeterAccessRules/operations.js";
import type {
  NetworkSecurityPerimeterAccessRulesReconcileOptionalParams,
  NetworkSecurityPerimeterAccessRulesListOptionalParams,
  NetworkSecurityPerimeterAccessRulesDeleteOptionalParams,
  NetworkSecurityPerimeterAccessRulesCreateOrUpdateOptionalParams,
  NetworkSecurityPerimeterAccessRulesGetOptionalParams,
} from "../../api/networkSecurityPerimeterAccessRules/options.js";
import type { NspAccessRule } from "../../models/microsoft/network/models.js";
import type { NetworkSecurityPerimeterAccessRulesReconcileResponse } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NetworkSecurityPerimeterAccessRules operations. */
export interface NetworkSecurityPerimeterAccessRulesOperations {
  /** Reconcile NSP access rules */
  reconcile: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    profileName: string,
    accessRuleName: string,
    parameters: any,
    options?: NetworkSecurityPerimeterAccessRulesReconcileOptionalParams,
  ) => Promise<NetworkSecurityPerimeterAccessRulesReconcileResponse>;
  /** Lists the NSP access rules in the specified NSP profile. */
  list: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    profileName: string,
    options?: NetworkSecurityPerimeterAccessRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<NspAccessRule>;
  /** Deletes an NSP access rule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    profileName: string,
    accessRuleName: string,
    options?: NetworkSecurityPerimeterAccessRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a network access rule. */
  createOrUpdate: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    profileName: string,
    accessRuleName: string,
    parameters: NspAccessRule,
    options?: NetworkSecurityPerimeterAccessRulesCreateOrUpdateOptionalParams,
  ) => Promise<NspAccessRule>;
  /** Gets the specified NSP access rule by name. */
  get: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    profileName: string,
    accessRuleName: string,
    options?: NetworkSecurityPerimeterAccessRulesGetOptionalParams,
  ) => Promise<NspAccessRule>;
}

function _getNetworkSecurityPerimeterAccessRules(context: NetworkManagementContext) {
  return {
    reconcile: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      profileName: string,
      accessRuleName: string,
      parameters: any,
      options?: NetworkSecurityPerimeterAccessRulesReconcileOptionalParams,
    ) =>
      reconcile(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        profileName,
        accessRuleName,
        parameters,
        options,
      ),
    list: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      profileName: string,
      options?: NetworkSecurityPerimeterAccessRulesListOptionalParams,
    ) => list(context, resourceGroupName, networkSecurityPerimeterName, profileName, options),
    delete: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      profileName: string,
      accessRuleName: string,
      options?: NetworkSecurityPerimeterAccessRulesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        profileName,
        accessRuleName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      profileName: string,
      accessRuleName: string,
      parameters: NspAccessRule,
      options?: NetworkSecurityPerimeterAccessRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        profileName,
        accessRuleName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      profileName: string,
      accessRuleName: string,
      options?: NetworkSecurityPerimeterAccessRulesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        profileName,
        accessRuleName,
        options,
      ),
  };
}

export function _getNetworkSecurityPerimeterAccessRulesOperations(
  context: NetworkManagementContext,
): NetworkSecurityPerimeterAccessRulesOperations {
  return {
    ..._getNetworkSecurityPerimeterAccessRules(context),
  };
}
