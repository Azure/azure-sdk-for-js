// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementContext } from "../../api/eventHubManagementContext.js";
import {
  checkNameAvailability,
  regenerateKeys,
  listKeys,
  listAuthorizationRules,
  deleteAuthorizationRule,
  createOrUpdateAuthorizationRule,
  getAuthorizationRule,
  listNetworkRuleSet,
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
import {
  NamespacesCheckNameAvailabilityOptionalParams,
  NamespacesRegenerateKeysOptionalParams,
  NamespacesListKeysOptionalParams,
  NamespacesListAuthorizationRulesOptionalParams,
  NamespacesDeleteAuthorizationRuleOptionalParams,
  NamespacesCreateOrUpdateAuthorizationRuleOptionalParams,
  NamespacesGetAuthorizationRuleOptionalParams,
  NamespacesListNetworkRuleSetOptionalParams,
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
import {
  AuthorizationRule,
  AccessKeys,
  CheckNameAvailabilityParameter,
  CheckNameAvailabilityResult,
  RegenerateAccessKeyParameters,
  EHNamespace,
  FailOver,
  NetworkRuleSet,
  NetworkRuleSetListResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Namespaces operations. */
export interface NamespacesOperations {
  /** Check the give Namespace name availability. */
  checkNameAvailability: (
    parameters: CheckNameAvailabilityParameter,
    options?: NamespacesCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResult>;
  /** Regenerates the primary or secondary connection strings for the specified Namespace. */
  regenerateKeys: (
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    parameters: RegenerateAccessKeyParameters,
    options?: NamespacesRegenerateKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Gets the primary and secondary connection strings for the Namespace. */
  listKeys: (
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    options?: NamespacesListKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Gets a list of authorization rules for a Namespace. */
  listAuthorizationRules: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesListAuthorizationRulesOptionalParams,
  ) => PagedAsyncIterableIterator<AuthorizationRule>;
  /** Deletes an AuthorizationRule for a Namespace. */
  deleteAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    options?: NamespacesDeleteAuthorizationRuleOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an AuthorizationRule for a Namespace. */
  createOrUpdateAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    parameters: AuthorizationRule,
    options?: NamespacesCreateOrUpdateAuthorizationRuleOptionalParams,
  ) => Promise<AuthorizationRule>;
  /** Gets an AuthorizationRule for a Namespace by rule name. */
  getAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    options?: NamespacesGetAuthorizationRuleOptionalParams,
  ) => Promise<AuthorizationRule>;
  /** Gets NetworkRuleSet for a Namespace. */
  listNetworkRuleSet: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesListNetworkRuleSetOptionalParams,
  ) => Promise<NetworkRuleSetListResult>;
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
  /** @deprecated use failover instead */
  beginFailover: (
    resourceGroupName: string,
    namespaceName: string,
    parameters: FailOver,
    options?: NamespacesFailoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FailOver>, FailOver>>;
  /** @deprecated use failover instead */
  beginFailoverAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    parameters: FailOver,
    options?: NamespacesFailoverOptionalParams,
  ) => Promise<FailOver>;
  /** Lists all the available Namespaces within a subscription, irrespective of the resource groups. */
  list: (options?: NamespacesListOptionalParams) => PagedAsyncIterableIterator<EHNamespace>;
  /** Lists the available Namespaces within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NamespacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<EHNamespace>;
  /** Deletes an existing namespace. This operation also removes all associated resources under the namespace. */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent. */
  update: (
    resourceGroupName: string,
    namespaceName: string,
    parameters: EHNamespace,
    options?: NamespacesUpdateOptionalParams,
  ) => Promise<EHNamespace | undefined>;
  /** Creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    parameters: EHNamespace,
    options?: NamespacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EHNamespace>, EHNamespace>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    parameters: EHNamespace,
    options?: NamespacesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EHNamespace>, EHNamespace>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    parameters: EHNamespace,
    options?: NamespacesCreateOrUpdateOptionalParams,
  ) => Promise<EHNamespace>;
  /** Gets the description of the specified namespace. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesGetOptionalParams,
  ) => Promise<EHNamespace>;
}

function _getNamespaces(context: EventHubManagementContext) {
  return {
    checkNameAvailability: (
      parameters: CheckNameAvailabilityParameter,
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
    listNetworkRuleSet: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesListNetworkRuleSetOptionalParams,
    ) => listNetworkRuleSet(context, resourceGroupName, namespaceName, options),
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
    beginFailover: async (
      resourceGroupName: string,
      namespaceName: string,
      parameters: FailOver,
      options?: NamespacesFailoverOptionalParams,
    ) => {
      const poller = failover(context, resourceGroupName, namespaceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      parameters: FailOver,
      options?: NamespacesFailoverOptionalParams,
    ) => {
      return await failover(context, resourceGroupName, namespaceName, parameters, options);
    },
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
    beginDelete: async (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, namespaceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, namespaceName, options);
    },
    update: (
      resourceGroupName: string,
      namespaceName: string,
      parameters: EHNamespace,
      options?: NamespacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, namespaceName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      parameters: EHNamespace,
      options?: NamespacesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, namespaceName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      namespaceName: string,
      parameters: EHNamespace,
      options?: NamespacesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, namespaceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      parameters: EHNamespace,
      options?: NamespacesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, namespaceName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, options),
  };
}

export function _getNamespacesOperations(context: EventHubManagementContext): NamespacesOperations {
  return {
    ..._getNamespaces(context),
  };
}
