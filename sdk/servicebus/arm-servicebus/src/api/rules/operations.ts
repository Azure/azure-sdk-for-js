// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusManagementContext as Client } from "../index.js";
import type { Rule, _RuleListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  ruleSerializer,
  ruleDeserializer,
  _ruleListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RulesListBySubscriptionsOptionalParams,
  RulesDeleteOptionalParams,
  RulesCreateOrUpdateOptionalParams,
  RulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionsSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  subscriptionName: string,
  options: RulesListBySubscriptionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/subscriptions/{subscriptionName}/rules{?api%2Dversion,%24skip,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
      subscriptionName: subscriptionName,
      "api%2Dversion": context.apiVersion,
      "%24skip": options?.skip,
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listBySubscriptionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_RuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _ruleListResultDeserializer(result.body);
}

/** List all the rules within given topic-subscription */
export function listBySubscriptions(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  subscriptionName: string,
  options: RulesListBySubscriptionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Rule> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listBySubscriptionsSend(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        subscriptionName,
        options,
      ),
    _listBySubscriptionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  subscriptionName: string,
  ruleName: string,
  options: RulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/subscriptions/{subscriptionName}/rules/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
      subscriptionName: subscriptionName,
      ruleName: ruleName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes an existing rule. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  subscriptionName: string,
  ruleName: string,
  options: RulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    namespaceName,
    topicName,
    subscriptionName,
    ruleName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  subscriptionName: string,
  ruleName: string,
  parameters: Rule,
  options: RulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/subscriptions/{subscriptionName}/rules/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
      subscriptionName: subscriptionName,
      ruleName: ruleName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: ruleSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Rule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return ruleDeserializer(result.body);
}

/** Creates a new rule and updates an existing rule */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  subscriptionName: string,
  ruleName: string,
  parameters: Rule,
  options: RulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Rule> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    namespaceName,
    topicName,
    subscriptionName,
    ruleName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  subscriptionName: string,
  ruleName: string,
  options: RulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/subscriptions/{subscriptionName}/rules/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
      subscriptionName: subscriptionName,
      ruleName: ruleName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Rule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return ruleDeserializer(result.body);
}

/** Retrieves the description for the specified rule. */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  subscriptionName: string,
  ruleName: string,
  options: RulesGetOptionalParams = { requestOptions: {} },
): Promise<Rule> {
  const result = await _getSend(
    context,
    resourceGroupName,
    namespaceName,
    topicName,
    subscriptionName,
    ruleName,
    options,
  );
  return _getDeserialize(result);
}
