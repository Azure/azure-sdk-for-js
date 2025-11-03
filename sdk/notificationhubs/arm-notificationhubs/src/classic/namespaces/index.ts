// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NotificationHubsManagementContext } from "../../api/notificationHubsManagementContext.js";
import {
  checkAvailability,
  getPnsCredentials,
  listAll,
  list,
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
  NamespacesCheckAvailabilityOptionalParams,
  NamespacesGetPnsCredentialsOptionalParams,
  NamespacesListAllOptionalParams,
  NamespacesListOptionalParams,
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
  SharedAccessAuthorizationRuleResource,
  ResourceListKeys,
  PolicyKeyResource,
  NamespaceResource,
  NamespacePatchParameters,
  PnsCredentialsResource,
  CheckAvailabilityParameters,
  CheckAvailabilityResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Namespaces operations. */
export interface NamespacesOperations {
  /** Checks the availability of the given service namespace across all Azure subscriptions. This is useful because the domain name is created based on the service namespace name. */
  checkAvailability: (
    parameters: CheckAvailabilityParameters,
    options?: NamespacesCheckAvailabilityOptionalParams,
  ) => Promise<CheckAvailabilityResult>;
  /** Lists the PNS credentials associated with a namespace. */
  getPnsCredentials: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesGetPnsCredentialsOptionalParams,
  ) => Promise<PnsCredentialsResource>;
  /** Lists all the available namespaces within the subscription. */
  listAll: (
    options?: NamespacesListAllOptionalParams,
  ) => PagedAsyncIterableIterator<NamespaceResource>;
  /** Lists the available namespaces within a resource group. */
  list: (
    resourceGroupName: string,
    options?: NamespacesListOptionalParams,
  ) => PagedAsyncIterableIterator<NamespaceResource>;
  /** Deletes an existing namespace. This operation also removes all associated notificationHubs under the namespace. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesDeleteOptionalParams,
  ) => Promise<void>;
  /** Patches the existing namespace. */
  update: (
    resourceGroupName: string,
    namespaceName: string,
    parameters: NamespacePatchParameters,
    options?: NamespacesUpdateOptionalParams,
  ) => Promise<NamespaceResource>;
  /** Creates / Updates a Notification Hub namespace. This operation is idempotent. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    parameters: NamespaceResource,
    options?: NamespacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NamespaceResource>, NamespaceResource>;
  /** Returns the given namespace. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesGetOptionalParams,
  ) => Promise<NamespaceResource>;
  /** Regenerates the Primary/Secondary Keys to the Namespace Authorization Rule */
  regenerateKeys: (
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    parameters: PolicyKeyResource,
    options?: NamespacesRegenerateKeysOptionalParams,
  ) => Promise<ResourceListKeys>;
  /** Gets the Primary and Secondary ConnectionStrings to the namespace. */
  listKeys: (
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    options?: NamespacesListKeysOptionalParams,
  ) => Promise<ResourceListKeys>;
  /** Gets the authorization rules for a namespace. */
  listAuthorizationRules: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesListAuthorizationRulesOptionalParams,
  ) => PagedAsyncIterableIterator<SharedAccessAuthorizationRuleResource>;
  /** Deletes a namespace authorization rule */
  deleteAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    options?: NamespacesDeleteAuthorizationRuleOptionalParams,
  ) => Promise<void>;
  /** Creates an authorization rule for a namespace */
  createOrUpdateAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    parameters: SharedAccessAuthorizationRuleResource,
    options?: NamespacesCreateOrUpdateAuthorizationRuleOptionalParams,
  ) => Promise<SharedAccessAuthorizationRuleResource>;
  /** Gets an authorization rule for a namespace by name. */
  getAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    options?: NamespacesGetAuthorizationRuleOptionalParams,
  ) => Promise<SharedAccessAuthorizationRuleResource>;
}

function _getNamespaces(context: NotificationHubsManagementContext) {
  return {
    checkAvailability: (
      parameters: CheckAvailabilityParameters,
      options?: NamespacesCheckAvailabilityOptionalParams,
    ) => checkAvailability(context, parameters, options),
    getPnsCredentials: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesGetPnsCredentialsOptionalParams,
    ) => getPnsCredentials(context, resourceGroupName, namespaceName, options),
    listAll: (options?: NamespacesListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: NamespacesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, options),
    update: (
      resourceGroupName: string,
      namespaceName: string,
      parameters: NamespacePatchParameters,
      options?: NamespacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, namespaceName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      parameters: NamespaceResource,
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
      parameters: PolicyKeyResource,
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
      parameters: SharedAccessAuthorizationRuleResource,
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

export function _getNamespacesOperations(
  context: NotificationHubsManagementContext,
): NamespacesOperations {
  return {
    ..._getNamespaces(context),
  };
}
