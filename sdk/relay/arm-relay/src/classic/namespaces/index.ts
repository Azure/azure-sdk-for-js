// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RelayAPIContext } from "../../api/relayAPIContext.js";
import {
  checkNameAvailability,
  createOrUpdateNetworkRuleSet,
  getNetworkRuleSet,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
  regenerateKeys,
  listKeys,
  listAuthorizationRules,
  deleteAuthorizationRule,
  createOrUpdateAuthorizationRule,
  getAuthorizationRule,
} from "../../api/namespaces/operations.js";
import type {
  NamespacesCheckNameAvailabilityOptionalParams,
  NamespacesCreateOrUpdateNetworkRuleSetOptionalParams,
  NamespacesGetNetworkRuleSetOptionalParams,
  NamespacesListOptionalParams,
  NamespacesListByResourceGroupOptionalParams,
  NamespacesDeleteOptionalParams,
  NamespacesUpdateOptionalParams,
  NamespacesCreateOrUpdateOptionalParams,
  NamespacesGetOptionalParams,
  NamespacesRegenerateKeysOptionalParams,
  NamespacesListKeysOptionalParams,
  NamespacesListAuthorizationRulesOptionalParams,
  NamespacesDeleteAuthorizationRuleOptionalParams,
  NamespacesCreateOrUpdateAuthorizationRuleOptionalParams,
  NamespacesGetAuthorizationRuleOptionalParams,
} from "../../api/namespaces/options.js";
import type {
  AuthorizationRule,
  AccessKeys,
  RegenerateAccessKeyParameters,
  RelayNamespace,
  RelayUpdateParameters,
  NetworkRuleSet,
  CheckNameAvailability,
  CheckNameAvailabilityResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Namespaces operations. */
export interface NamespacesOperations {
  /** Check the specified namespace name availability. */
  checkNameAvailability: (
    parameters: CheckNameAvailability,
    options?: NamespacesCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResult>;
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
  /** Lists all the available namespaces within the subscription regardless of the resourceGroups. */
  list: (options?: NamespacesListOptionalParams) => PagedAsyncIterableIterator<RelayNamespace>;
  /** Lists all the available namespaces within the ResourceGroup. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NamespacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<RelayNamespace>;
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
  /** Creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent. */
  update: (
    resourceGroupName: string,
    namespaceName: string,
    parameters: RelayUpdateParameters,
    options?: NamespacesUpdateOptionalParams,
  ) => Promise<RelayNamespace>;
  /** Create Azure Relay namespace. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    parameters: RelayNamespace,
    options?: NamespacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<RelayNamespace>, RelayNamespace>;
  /** Returns the description for the specified namespace. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesGetOptionalParams,
  ) => Promise<RelayNamespace>;
  /** Regenerates the primary or secondary connection strings to the namespace. */
  regenerateKeys: (
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    parameters: RegenerateAccessKeyParameters,
    options?: NamespacesRegenerateKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Primary and secondary connection strings to the namespace. */
  listKeys: (
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    options?: NamespacesListKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Authorization rules for a namespace. */
  listAuthorizationRules: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesListAuthorizationRulesOptionalParams,
  ) => PagedAsyncIterableIterator<AuthorizationRule>;
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
    parameters: AuthorizationRule,
    options?: NamespacesCreateOrUpdateAuthorizationRuleOptionalParams,
  ) => Promise<AuthorizationRule>;
  /** Authorization rule for a namespace by name. */
  getAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    options?: NamespacesGetAuthorizationRuleOptionalParams,
  ) => Promise<AuthorizationRule>;
}

function _getNamespaces(context: RelayAPIContext) {
  return {
    checkNameAvailability: (
      parameters: CheckNameAvailability,
      options?: NamespacesCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, parameters, options),
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
      parameters: RelayUpdateParameters,
      options?: NamespacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, namespaceName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      parameters: RelayNamespace,
      options?: NamespacesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, namespaceName, parameters, options),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, options),
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
      parameters: AuthorizationRule,
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
  };
}

export function _getNamespacesOperations(context: RelayAPIContext): NamespacesOperations {
  return {
    ..._getNamespaces(context),
  };
}
