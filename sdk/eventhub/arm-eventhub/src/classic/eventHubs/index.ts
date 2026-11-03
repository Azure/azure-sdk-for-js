// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventHubManagementContext } from "../../api/eventHubManagementContext.js";
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
} from "../../api/eventHubs/operations.js";
import type {
  EventHubsListByNamespaceOptionalParams,
  EventHubsDeleteOptionalParams,
  EventHubsCreateOrUpdateOptionalParams,
  EventHubsGetOptionalParams,
  EventHubsRegenerateKeysOptionalParams,
  EventHubsListKeysOptionalParams,
  EventHubsListAuthorizationRulesOptionalParams,
  EventHubsDeleteAuthorizationRuleOptionalParams,
  EventHubsCreateOrUpdateAuthorizationRuleOptionalParams,
  EventHubsGetAuthorizationRuleOptionalParams,
} from "../../api/eventHubs/options.js";
import type {
  AuthorizationRule,
  AccessKeys,
  RegenerateAccessKeyParameters,
  Eventhub,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EventHubs operations. */
export interface EventHubsOperations {
  /** Gets all the Event Hubs in a Namespace. */
  listByNamespace: (
    resourceGroupName: string,
    namespaceName: string,
    options?: EventHubsListByNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<Eventhub>;
  /** Deletes an Event Hub from the specified Namespace and resource group. */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    options?: EventHubsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a new Event Hub as a nested resource within a Namespace. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    parameters: Eventhub,
    options?: EventHubsCreateOrUpdateOptionalParams,
  ) => Promise<Eventhub>;
  /** Gets an Event Hubs description for the specified Event Hub. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    options?: EventHubsGetOptionalParams,
  ) => Promise<Eventhub>;
  /** Regenerates the ACS and SAS connection strings for the Event Hub. */
  regenerateKeys: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    authorizationRuleName: string,
    parameters: RegenerateAccessKeyParameters,
    options?: EventHubsRegenerateKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Gets the ACS and SAS connection strings for the Event Hub. */
  listKeys: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    authorizationRuleName: string,
    options?: EventHubsListKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Gets the authorization rules for an Event Hub. */
  listAuthorizationRules: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    options?: EventHubsListAuthorizationRulesOptionalParams,
  ) => PagedAsyncIterableIterator<AuthorizationRule>;
  /** Deletes an Event Hub AuthorizationRule. */
  deleteAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    authorizationRuleName: string,
    options?: EventHubsDeleteAuthorizationRuleOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an AuthorizationRule for the specified Event Hub. Creation/update of the AuthorizationRule will take a few seconds to take effect. */
  createOrUpdateAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    authorizationRuleName: string,
    parameters: AuthorizationRule,
    options?: EventHubsCreateOrUpdateAuthorizationRuleOptionalParams,
  ) => Promise<AuthorizationRule>;
  /** Gets an AuthorizationRule for an Event Hub by rule name. */
  getAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    authorizationRuleName: string,
    options?: EventHubsGetAuthorizationRuleOptionalParams,
  ) => Promise<AuthorizationRule>;
}

function _getEventHubs(context: EventHubManagementContext) {
  return {
    listByNamespace: (
      resourceGroupName: string,
      namespaceName: string,
      options?: EventHubsListByNamespaceOptionalParams,
    ) => listByNamespace(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      options?: EventHubsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, eventHubName, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      parameters: Eventhub,
      options?: EventHubsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, namespaceName, eventHubName, parameters, options),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      options?: EventHubsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, eventHubName, options),
    regenerateKeys: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      authorizationRuleName: string,
      parameters: RegenerateAccessKeyParameters,
      options?: EventHubsRegenerateKeysOptionalParams,
    ) =>
      regenerateKeys(
        context,
        resourceGroupName,
        namespaceName,
        eventHubName,
        authorizationRuleName,
        parameters,
        options,
      ),
    listKeys: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      authorizationRuleName: string,
      options?: EventHubsListKeysOptionalParams,
    ) =>
      listKeys(
        context,
        resourceGroupName,
        namespaceName,
        eventHubName,
        authorizationRuleName,
        options,
      ),
    listAuthorizationRules: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      options?: EventHubsListAuthorizationRulesOptionalParams,
    ) => listAuthorizationRules(context, resourceGroupName, namespaceName, eventHubName, options),
    deleteAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      authorizationRuleName: string,
      options?: EventHubsDeleteAuthorizationRuleOptionalParams,
    ) =>
      deleteAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        eventHubName,
        authorizationRuleName,
        options,
      ),
    createOrUpdateAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      authorizationRuleName: string,
      parameters: AuthorizationRule,
      options?: EventHubsCreateOrUpdateAuthorizationRuleOptionalParams,
    ) =>
      createOrUpdateAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        eventHubName,
        authorizationRuleName,
        parameters,
        options,
      ),
    getAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      authorizationRuleName: string,
      options?: EventHubsGetAuthorizationRuleOptionalParams,
    ) =>
      getAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        eventHubName,
        authorizationRuleName,
        options,
      ),
  };
}

export function _getEventHubsOperations(context: EventHubManagementContext): EventHubsOperations {
  return {
    ..._getEventHubs(context),
  };
}
