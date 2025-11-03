// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusManagementContext } from "../../api/serviceBusManagementContext.js";
import { listBySubscriptions, $delete, createOrUpdate, get } from "../../api/rules/operations.js";
import type {
  RulesListBySubscriptionsOptionalParams,
  RulesDeleteOptionalParams,
  RulesCreateOrUpdateOptionalParams,
  RulesGetOptionalParams,
} from "../../api/rules/options.js";
import type { Rule } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Rules operations. */
export interface RulesOperations {
  /** List all the rules within given topic-subscription */
  listBySubscriptions: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    subscriptionName: string,
    options?: RulesListBySubscriptionsOptionalParams,
  ) => PagedAsyncIterableIterator<Rule>;
  /** Deletes an existing rule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    subscriptionName: string,
    ruleName: string,
    options?: RulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new rule and updates an existing rule */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    subscriptionName: string,
    ruleName: string,
    parameters: Rule,
    options?: RulesCreateOrUpdateOptionalParams,
  ) => Promise<Rule>;
  /** Retrieves the description for the specified rule. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    subscriptionName: string,
    ruleName: string,
    options?: RulesGetOptionalParams,
  ) => Promise<Rule>;
}

function _getRules(context: ServiceBusManagementContext) {
  return {
    listBySubscriptions: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      subscriptionName: string,
      options?: RulesListBySubscriptionsOptionalParams,
    ) =>
      listBySubscriptions(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        subscriptionName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      subscriptionName: string,
      ruleName: string,
      options?: RulesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        subscriptionName,
        ruleName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      subscriptionName: string,
      ruleName: string,
      parameters: Rule,
      options?: RulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        subscriptionName,
        ruleName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      subscriptionName: string,
      ruleName: string,
      options?: RulesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        subscriptionName,
        ruleName,
        options,
      ),
  };
}

export function _getRulesOperations(context: ServiceBusManagementContext): RulesOperations {
  return {
    ..._getRules(context),
  };
}
