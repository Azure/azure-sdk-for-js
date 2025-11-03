// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusManagementContext } from "../../api/serviceBusManagementContext.js";
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
} from "../../api/queues/operations.js";
import type {
  QueuesListByNamespaceOptionalParams,
  QueuesDeleteOptionalParams,
  QueuesCreateOrUpdateOptionalParams,
  QueuesGetOptionalParams,
  QueuesRegenerateKeysOptionalParams,
  QueuesListKeysOptionalParams,
  QueuesListAuthorizationRulesOptionalParams,
  QueuesDeleteAuthorizationRuleOptionalParams,
  QueuesCreateOrUpdateAuthorizationRuleOptionalParams,
  QueuesGetAuthorizationRuleOptionalParams,
} from "../../api/queues/options.js";
import type {
  SBAuthorizationRule,
  AccessKeys,
  RegenerateAccessKeyParameters,
  SBQueue,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Queues operations. */
export interface QueuesOperations {
  /** Gets the queues within a namespace. */
  listByNamespace: (
    resourceGroupName: string,
    namespaceName: string,
    options?: QueuesListByNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<SBQueue>;
  /** Deletes a queue from the specified namespace in a resource group. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    queueName: string,
    options?: QueuesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a Service Bus queue. This operation is idempotent. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    queueName: string,
    parameters: SBQueue,
    options?: QueuesCreateOrUpdateOptionalParams,
  ) => Promise<SBQueue>;
  /** Returns a description for the specified queue. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    queueName: string,
    options?: QueuesGetOptionalParams,
  ) => Promise<SBQueue>;
  /** Regenerates the primary or secondary connection strings to the queue. */
  regenerateKeys: (
    resourceGroupName: string,
    namespaceName: string,
    queueName: string,
    authorizationRuleName: string,
    parameters: RegenerateAccessKeyParameters,
    options?: QueuesRegenerateKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Primary and secondary connection strings to the queue. */
  listKeys: (
    resourceGroupName: string,
    namespaceName: string,
    queueName: string,
    authorizationRuleName: string,
    options?: QueuesListKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Gets all authorization rules for a queue. */
  listAuthorizationRules: (
    resourceGroupName: string,
    namespaceName: string,
    queueName: string,
    options?: QueuesListAuthorizationRulesOptionalParams,
  ) => PagedAsyncIterableIterator<SBAuthorizationRule>;
  /** Deletes a queue authorization rule. */
  deleteAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    queueName: string,
    authorizationRuleName: string,
    options?: QueuesDeleteAuthorizationRuleOptionalParams,
  ) => Promise<void>;
  /** Creates an authorization rule for a queue. */
  createOrUpdateAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    queueName: string,
    authorizationRuleName: string,
    parameters: SBAuthorizationRule,
    options?: QueuesCreateOrUpdateAuthorizationRuleOptionalParams,
  ) => Promise<SBAuthorizationRule>;
  /** Gets an authorization rule for a queue by rule name. */
  getAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    queueName: string,
    authorizationRuleName: string,
    options?: QueuesGetAuthorizationRuleOptionalParams,
  ) => Promise<SBAuthorizationRule>;
}

function _getQueues(context: ServiceBusManagementContext) {
  return {
    listByNamespace: (
      resourceGroupName: string,
      namespaceName: string,
      options?: QueuesListByNamespaceOptionalParams,
    ) => listByNamespace(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      queueName: string,
      options?: QueuesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, queueName, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      queueName: string,
      parameters: SBQueue,
      options?: QueuesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, namespaceName, queueName, parameters, options),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      queueName: string,
      options?: QueuesGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, queueName, options),
    regenerateKeys: (
      resourceGroupName: string,
      namespaceName: string,
      queueName: string,
      authorizationRuleName: string,
      parameters: RegenerateAccessKeyParameters,
      options?: QueuesRegenerateKeysOptionalParams,
    ) =>
      regenerateKeys(
        context,
        resourceGroupName,
        namespaceName,
        queueName,
        authorizationRuleName,
        parameters,
        options,
      ),
    listKeys: (
      resourceGroupName: string,
      namespaceName: string,
      queueName: string,
      authorizationRuleName: string,
      options?: QueuesListKeysOptionalParams,
    ) =>
      listKeys(
        context,
        resourceGroupName,
        namespaceName,
        queueName,
        authorizationRuleName,
        options,
      ),
    listAuthorizationRules: (
      resourceGroupName: string,
      namespaceName: string,
      queueName: string,
      options?: QueuesListAuthorizationRulesOptionalParams,
    ) => listAuthorizationRules(context, resourceGroupName, namespaceName, queueName, options),
    deleteAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      queueName: string,
      authorizationRuleName: string,
      options?: QueuesDeleteAuthorizationRuleOptionalParams,
    ) =>
      deleteAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        queueName,
        authorizationRuleName,
        options,
      ),
    createOrUpdateAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      queueName: string,
      authorizationRuleName: string,
      parameters: SBAuthorizationRule,
      options?: QueuesCreateOrUpdateAuthorizationRuleOptionalParams,
    ) =>
      createOrUpdateAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        queueName,
        authorizationRuleName,
        parameters,
        options,
      ),
    getAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      queueName: string,
      authorizationRuleName: string,
      options?: QueuesGetAuthorizationRuleOptionalParams,
    ) =>
      getAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        queueName,
        authorizationRuleName,
        options,
      ),
  };
}

export function _getQueuesOperations(context: ServiceBusManagementContext): QueuesOperations {
  return {
    ..._getQueues(context),
  };
}
