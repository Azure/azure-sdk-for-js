// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RelayAPIContext } from "../../api/relayAPIContext.js";
import {
  listByNamespace,
  $delete,
  createOrUpdate,
  get,
  regenerateKeys,
  listKeys,
  listAuthorizationRules,
  deleteAuthorizationRule,
  createOrUpdateAuthorizationRule,
  getAuthorizationRule,
} from "../../api/hybridConnections/operations.js";
import type {
  HybridConnectionsListByNamespaceOptionalParams,
  HybridConnectionsDeleteOptionalParams,
  HybridConnectionsCreateOrUpdateOptionalParams,
  HybridConnectionsGetOptionalParams,
  HybridConnectionsRegenerateKeysOptionalParams,
  HybridConnectionsListKeysOptionalParams,
  HybridConnectionsListAuthorizationRulesOptionalParams,
  HybridConnectionsDeleteAuthorizationRuleOptionalParams,
  HybridConnectionsCreateOrUpdateAuthorizationRuleOptionalParams,
  HybridConnectionsGetAuthorizationRuleOptionalParams,
} from "../../api/hybridConnections/options.js";
import type {
  AuthorizationRule,
  AccessKeys,
  RegenerateAccessKeyParameters,
  HybridConnection,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a HybridConnections operations. */
export interface HybridConnectionsOperations {
  /** Lists the hybrid connection within the namespace. */
  listByNamespace: (
    resourceGroupName: string,
    namespaceName: string,
    options?: HybridConnectionsListByNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<HybridConnection>;
  /** Deletes a hybrid connection. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    hybridConnectionName: string,
    options?: HybridConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a service hybrid connection. This operation is idempotent. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    hybridConnectionName: string,
    parameters: HybridConnection,
    options?: HybridConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<HybridConnection>;
  /** Returns the description for the specified hybrid connection. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    hybridConnectionName: string,
    options?: HybridConnectionsGetOptionalParams,
  ) => Promise<HybridConnection>;
  /** Regenerates the primary or secondary connection strings to the hybrid connection. */
  regenerateKeys: (
    resourceGroupName: string,
    namespaceName: string,
    hybridConnectionName: string,
    authorizationRuleName: string,
    parameters: RegenerateAccessKeyParameters,
    options?: HybridConnectionsRegenerateKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Primary and secondary connection strings to the hybrid connection. */
  listKeys: (
    resourceGroupName: string,
    namespaceName: string,
    hybridConnectionName: string,
    authorizationRuleName: string,
    options?: HybridConnectionsListKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Authorization rules for a hybrid connection. */
  listAuthorizationRules: (
    resourceGroupName: string,
    namespaceName: string,
    hybridConnectionName: string,
    options?: HybridConnectionsListAuthorizationRulesOptionalParams,
  ) => PagedAsyncIterableIterator<AuthorizationRule>;
  /** Deletes a hybrid connection authorization rule. */
  deleteAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    hybridConnectionName: string,
    authorizationRuleName: string,
    options?: HybridConnectionsDeleteAuthorizationRuleOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an authorization rule for a hybrid connection. */
  createOrUpdateAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    hybridConnectionName: string,
    authorizationRuleName: string,
    parameters: AuthorizationRule,
    options?: HybridConnectionsCreateOrUpdateAuthorizationRuleOptionalParams,
  ) => Promise<AuthorizationRule>;
  /** Hybrid connection authorization rule for a hybrid connection by name. */
  getAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    hybridConnectionName: string,
    authorizationRuleName: string,
    options?: HybridConnectionsGetAuthorizationRuleOptionalParams,
  ) => Promise<AuthorizationRule>;
}

function _getHybridConnections(context: RelayAPIContext) {
  return {
    listByNamespace: (
      resourceGroupName: string,
      namespaceName: string,
      options?: HybridConnectionsListByNamespaceOptionalParams,
    ) => listByNamespace(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      hybridConnectionName: string,
      options?: HybridConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, hybridConnectionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      hybridConnectionName: string,
      parameters: HybridConnection,
      options?: HybridConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        hybridConnectionName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      hybridConnectionName: string,
      options?: HybridConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, hybridConnectionName, options),
    regenerateKeys: (
      resourceGroupName: string,
      namespaceName: string,
      hybridConnectionName: string,
      authorizationRuleName: string,
      parameters: RegenerateAccessKeyParameters,
      options?: HybridConnectionsRegenerateKeysOptionalParams,
    ) =>
      regenerateKeys(
        context,
        resourceGroupName,
        namespaceName,
        hybridConnectionName,
        authorizationRuleName,
        parameters,
        options,
      ),
    listKeys: (
      resourceGroupName: string,
      namespaceName: string,
      hybridConnectionName: string,
      authorizationRuleName: string,
      options?: HybridConnectionsListKeysOptionalParams,
    ) =>
      listKeys(
        context,
        resourceGroupName,
        namespaceName,
        hybridConnectionName,
        authorizationRuleName,
        options,
      ),
    listAuthorizationRules: (
      resourceGroupName: string,
      namespaceName: string,
      hybridConnectionName: string,
      options?: HybridConnectionsListAuthorizationRulesOptionalParams,
    ) =>
      listAuthorizationRules(
        context,
        resourceGroupName,
        namespaceName,
        hybridConnectionName,
        options,
      ),
    deleteAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      hybridConnectionName: string,
      authorizationRuleName: string,
      options?: HybridConnectionsDeleteAuthorizationRuleOptionalParams,
    ) =>
      deleteAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        hybridConnectionName,
        authorizationRuleName,
        options,
      ),
    createOrUpdateAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      hybridConnectionName: string,
      authorizationRuleName: string,
      parameters: AuthorizationRule,
      options?: HybridConnectionsCreateOrUpdateAuthorizationRuleOptionalParams,
    ) =>
      createOrUpdateAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        hybridConnectionName,
        authorizationRuleName,
        parameters,
        options,
      ),
    getAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      hybridConnectionName: string,
      authorizationRuleName: string,
      options?: HybridConnectionsGetAuthorizationRuleOptionalParams,
    ) =>
      getAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        hybridConnectionName,
        authorizationRuleName,
        options,
      ),
  };
}

export function _getHybridConnectionsOperations(
  context: RelayAPIContext,
): HybridConnectionsOperations {
  return {
    ..._getHybridConnections(context),
  };
}
