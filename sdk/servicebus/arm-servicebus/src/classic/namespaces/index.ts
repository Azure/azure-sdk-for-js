// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusManagementContext } from "../../api/serviceBusManagementContext.js";
import {
  checkNameAvailability,
  regenerateKeys,
  listKeys,
  listAuthorizationRules,
  deleteAuthorizationRule,
  createOrUpdateAuthorizationRule,
  getAuthorizationRule,
  listNetworkRuleSets,
  createOrUpdateNetworkRuleSet,
  getNetworkRuleSet,
  failover,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/namespaces/operations.js";
import type {
  NamespacesCheckNameAvailabilityOptionalParams,
  NamespacesRegenerateKeysOptionalParams,
  NamespacesListKeysOptionalParams,
  NamespacesListAuthorizationRulesOptionalParams,
  NamespacesDeleteAuthorizationRuleOptionalParams,
  NamespacesCreateOrUpdateAuthorizationRuleOptionalParams,
  NamespacesGetAuthorizationRuleOptionalParams,
  NamespacesListNetworkRuleSetsOptionalParams,
  NamespacesCreateOrUpdateNetworkRuleSetOptionalParams,
  NamespacesGetNetworkRuleSetOptionalParams,
  NamespacesFailoverOptionalParams,
  NamespacesListOptionalParams,
  NamespacesListByResourceGroupOptionalParams,
  NamespacesDeleteOptionalParams,
  NamespacesUpdateOptionalParams,
  NamespacesCreateOrUpdateOptionalParams,
  NamespacesGetOptionalParams,
} from "../../api/namespaces/options.js";
import type {
  SBAuthorizationRule,
  AccessKeys,
  CheckNameAvailability,
  CheckNameAvailabilityResult,
  RegenerateAccessKeyParameters,
  SBNamespace,
  SBNamespaceUpdateParameters,
  FailOver,
  NetworkRuleSet,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Namespaces operations. */
export interface NamespacesOperations {
  /** Check the give namespace name availability. */
  checkNameAvailability: (
    parameters: CheckNameAvailability,
    options?: NamespacesCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResult>;
  /** Regenerates the primary or secondary connection strings for the namespace. */
  regenerateKeys: (
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    parameters: RegenerateAccessKeyParameters,
    options?: NamespacesRegenerateKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Gets the primary and secondary connection strings for the namespace. */
  listKeys: (
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    options?: NamespacesListKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Gets the authorization rules for a namespace. */
  listAuthorizationRules: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesListAuthorizationRulesOptionalParams,
  ) => PagedAsyncIterableIterator<SBAuthorizationRule>;
  /** Deletes a namespace authorization rule. */
  deleteAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    options?: NamespacesDeleteAuthorizationRuleOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an authorization rule for a namespace. */
  createOrUpdateAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    parameters: SBAuthorizationRule,
    options?: NamespacesCreateOrUpdateAuthorizationRuleOptionalParams,
  ) => Promise<SBAuthorizationRule>;
  /** Gets an authorization rule for a namespace by rule name. */
  getAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    options?: NamespacesGetAuthorizationRuleOptionalParams,
  ) => Promise<SBAuthorizationRule>;
  /** Gets list of NetworkRuleSet for a Namespace. */
  listNetworkRuleSets: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesListNetworkRuleSetsOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkRuleSet>;
  /** Create or update NetworkRuleSet for a Namespace. */
  createOrUpdateNetworkRuleSet: (
    resourceGroupName: string,
    namespaceName: string,
    parameters: NetworkRuleSet,
    options?: NamespacesCreateOrUpdateNetworkRuleSetOptionalParams,
  ) => Promise<NetworkRuleSet>;
  /** Gets NetworkRuleSet for a Namespace. */
  getNetworkRuleSet: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesGetNetworkRuleSetOptionalParams,
  ) => Promise<NetworkRuleSet>;
  /** GeoDR Failover */
  failover: (
    resourceGroupName: string,
    namespaceName: string,
    parameters: FailOver,
    options?: NamespacesFailoverOptionalParams,
  ) => PollerLike<OperationState<FailOver>, FailOver>;
  /** Gets all the available namespaces within the subscription, irrespective of the resource groups. */
  list: (options?: NamespacesListOptionalParams) => PagedAsyncIterableIterator<SBNamespace>;
  /** Gets the available namespaces within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NamespacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SBNamespace>;
  /** Deletes an existing namespace. This operation also removes all associated resources under the namespace. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a service namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent. */
  update: (
    resourceGroupName: string,
    namespaceName: string,
    parameters: SBNamespaceUpdateParameters,
    options?: NamespacesUpdateOptionalParams,
  ) => Promise<SBNamespace | null>;
  /** Creates or updates a service namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    parameters: SBNamespace,
    options?: NamespacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SBNamespace>, SBNamespace>;
  /** Gets a description for the specified namespace. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesGetOptionalParams,
  ) => Promise<SBNamespace>;
}

function _getNamespaces(context: ServiceBusManagementContext) {
  return {
    checkNameAvailability: (
      parameters: CheckNameAvailability,
      options?: NamespacesCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, parameters, options),
    regenerateKeys: (
      resourceGroupName: string,
      namespaceName: string,
      authorizationRuleName: string,
      parameters: RegenerateAccessKeyParameters,
      options?: NamespacesRegenerateKeysOptionalParams,
    ) =>
      regenerateKeys(
        context,
        resourceGroupName,
        namespaceName,
        authorizationRuleName,
        parameters,
        options,
      ),
    listKeys: (
      resourceGroupName: string,
      namespaceName: string,
      authorizationRuleName: string,
      options?: NamespacesListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, namespaceName, authorizationRuleName, options),
    listAuthorizationRules: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesListAuthorizationRulesOptionalParams,
    ) => listAuthorizationRules(context, resourceGroupName, namespaceName, options),
    deleteAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      authorizationRuleName: string,
      options?: NamespacesDeleteAuthorizationRuleOptionalParams,
    ) =>
      deleteAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        authorizationRuleName,
        options,
      ),
    createOrUpdateAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      authorizationRuleName: string,
      parameters: SBAuthorizationRule,
      options?: NamespacesCreateOrUpdateAuthorizationRuleOptionalParams,
    ) =>
      createOrUpdateAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        authorizationRuleName,
        parameters,
        options,
      ),
    getAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      authorizationRuleName: string,
      options?: NamespacesGetAuthorizationRuleOptionalParams,
    ) =>
      getAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        authorizationRuleName,
        options,
      ),
    listNetworkRuleSets: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesListNetworkRuleSetsOptionalParams,
    ) => listNetworkRuleSets(context, resourceGroupName, namespaceName, options),
    createOrUpdateNetworkRuleSet: (
      resourceGroupName: string,
      namespaceName: string,
      parameters: NetworkRuleSet,
      options?: NamespacesCreateOrUpdateNetworkRuleSetOptionalParams,
    ) =>
      createOrUpdateNetworkRuleSet(context, resourceGroupName, namespaceName, parameters, options),
    getNetworkRuleSet: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesGetNetworkRuleSetOptionalParams,
    ) => getNetworkRuleSet(context, resourceGroupName, namespaceName, options),
    failover: (
      resourceGroupName: string,
      namespaceName: string,
      parameters: FailOver,
      options?: NamespacesFailoverOptionalParams,
    ) => failover(context, resourceGroupName, namespaceName, parameters, options),
    list: (options?: NamespacesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NamespacesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, options),
    update: (
      resourceGroupName: string,
      namespaceName: string,
      parameters: SBNamespaceUpdateParameters,
      options?: NamespacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, namespaceName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      parameters: SBNamespace,
      options?: NamespacesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, namespaceName, parameters, options),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, options),
  };
}

export function _getNamespacesOperations(
  context: ServiceBusManagementContext,
): NamespacesOperations {
  return {
    ..._getNamespaces(context),
  };
}
