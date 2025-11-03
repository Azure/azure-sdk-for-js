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
} from "../../api/topics/operations.js";
import type {
  TopicsListByNamespaceOptionalParams,
  TopicsDeleteOptionalParams,
  TopicsCreateOrUpdateOptionalParams,
  TopicsGetOptionalParams,
  TopicsRegenerateKeysOptionalParams,
  TopicsListKeysOptionalParams,
  TopicsListAuthorizationRulesOptionalParams,
  TopicsDeleteAuthorizationRuleOptionalParams,
  TopicsCreateOrUpdateAuthorizationRuleOptionalParams,
  TopicsGetAuthorizationRuleOptionalParams,
} from "../../api/topics/options.js";
import type {
  SBAuthorizationRule,
  AccessKeys,
  RegenerateAccessKeyParameters,
  SBTopic,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Topics operations. */
export interface TopicsOperations {
  /** Gets all the topics in a namespace. */
  listByNamespace: (
    resourceGroupName: string,
    namespaceName: string,
    options?: TopicsListByNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<SBTopic>;
  /** Deletes a topic from the specified namespace and resource group. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    options?: TopicsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a topic in the specified namespace. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    parameters: SBTopic,
    options?: TopicsCreateOrUpdateOptionalParams,
  ) => Promise<SBTopic>;
  /** Returns a description for the specified topic. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    options?: TopicsGetOptionalParams,
  ) => Promise<SBTopic>;
  /** Regenerates primary or secondary connection strings for the topic. */
  regenerateKeys: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    authorizationRuleName: string,
    parameters: RegenerateAccessKeyParameters,
    options?: TopicsRegenerateKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Gets the primary and secondary connection strings for the topic. */
  listKeys: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    authorizationRuleName: string,
    options?: TopicsListKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Gets authorization rules for a topic. */
  listAuthorizationRules: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    options?: TopicsListAuthorizationRulesOptionalParams,
  ) => PagedAsyncIterableIterator<SBAuthorizationRule>;
  /** Deletes a topic authorization rule. */
  deleteAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    authorizationRuleName: string,
    options?: TopicsDeleteAuthorizationRuleOptionalParams,
  ) => Promise<void>;
  /** Creates an authorization rule for the specified topic. */
  createOrUpdateAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    authorizationRuleName: string,
    parameters: SBAuthorizationRule,
    options?: TopicsCreateOrUpdateAuthorizationRuleOptionalParams,
  ) => Promise<SBAuthorizationRule>;
  /** Returns the specified authorization rule. */
  getAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    authorizationRuleName: string,
    options?: TopicsGetAuthorizationRuleOptionalParams,
  ) => Promise<SBAuthorizationRule>;
}

function _getTopics(context: ServiceBusManagementContext) {
  return {
    listByNamespace: (
      resourceGroupName: string,
      namespaceName: string,
      options?: TopicsListByNamespaceOptionalParams,
    ) => listByNamespace(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      options?: TopicsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, topicName, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      parameters: SBTopic,
      options?: TopicsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, namespaceName, topicName, parameters, options),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      options?: TopicsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, topicName, options),
    regenerateKeys: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      authorizationRuleName: string,
      parameters: RegenerateAccessKeyParameters,
      options?: TopicsRegenerateKeysOptionalParams,
    ) =>
      regenerateKeys(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        authorizationRuleName,
        parameters,
        options,
      ),
    listKeys: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      authorizationRuleName: string,
      options?: TopicsListKeysOptionalParams,
    ) =>
      listKeys(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        authorizationRuleName,
        options,
      ),
    listAuthorizationRules: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      options?: TopicsListAuthorizationRulesOptionalParams,
    ) => listAuthorizationRules(context, resourceGroupName, namespaceName, topicName, options),
    deleteAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      authorizationRuleName: string,
      options?: TopicsDeleteAuthorizationRuleOptionalParams,
    ) =>
      deleteAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        authorizationRuleName,
        options,
      ),
    createOrUpdateAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      authorizationRuleName: string,
      parameters: SBAuthorizationRule,
      options?: TopicsCreateOrUpdateAuthorizationRuleOptionalParams,
    ) =>
      createOrUpdateAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        authorizationRuleName,
        parameters,
        options,
      ),
    getAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      authorizationRuleName: string,
      options?: TopicsGetAuthorizationRuleOptionalParams,
    ) =>
      getAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        authorizationRuleName,
        options,
      ),
  };
}

export function _getTopicsOperations(context: ServiceBusManagementContext): TopicsOperations {
  return {
    ..._getTopics(context),
  };
}
