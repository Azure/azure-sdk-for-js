// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusManagementContext as Client } from "../index.js";
import type {
  SBAuthorizationRule,
  _SBAuthorizationRuleListResult,
  AccessKeys,
  RegenerateAccessKeyParameters,
  SBTopic,
  _SBTopicListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  sbAuthorizationRuleSerializer,
  sbAuthorizationRuleDeserializer,
  _sbAuthorizationRuleListResultDeserializer,
  accessKeysDeserializer,
  regenerateAccessKeyParametersSerializer,
  sbTopicSerializer,
  sbTopicDeserializer,
  _sbTopicListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByNamespaceSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: TopicsListByNamespaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics{?api%2Dversion,%24skip,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
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

export async function _listByNamespaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_SBTopicListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _sbTopicListResultDeserializer(result.body);
}

/** Gets all the topics in a namespace. */
export function listByNamespace(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: TopicsListByNamespaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SBTopic> {
  return buildPagedAsyncIterator(
    context,
    () => _listByNamespaceSend(context, resourceGroupName, namespaceName, options),
    _listByNamespaceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  options: TopicsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
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

/** Deletes a topic from the specified namespace and resource group. */
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
  options: TopicsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, namespaceName, topicName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  parameters: SBTopic,
  options: TopicsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
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
    body: sbTopicSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<SBTopic> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sbTopicDeserializer(result.body);
}

/** Creates a topic in the specified namespace. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  parameters: SBTopic,
  options: TopicsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<SBTopic> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    namespaceName,
    topicName,
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
  options: TopicsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SBTopic> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sbTopicDeserializer(result.body);
}

/** Returns a description for the specified topic. */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  options: TopicsGetOptionalParams = { requestOptions: {} },
): Promise<SBTopic> {
  const result = await _getSend(context, resourceGroupName, namespaceName, topicName, options);
  return _getDeserialize(result);
}

export function _regenerateKeysSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  authorizationRuleName: string,
  parameters: RegenerateAccessKeyParameters,
  options: TopicsRegenerateKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/authorizationRules/{authorizationRuleName}/regenerateKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
      authorizationRuleName: authorizationRuleName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: regenerateAccessKeyParametersSerializer(parameters),
  });
}

export async function _regenerateKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return accessKeysDeserializer(result.body);
}

/** Regenerates primary or secondary connection strings for the topic. */
export async function regenerateKeys(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  authorizationRuleName: string,
  parameters: RegenerateAccessKeyParameters,
  options: TopicsRegenerateKeysOptionalParams = { requestOptions: {} },
): Promise<AccessKeys> {
  const result = await _regenerateKeysSend(
    context,
    resourceGroupName,
    namespaceName,
    topicName,
    authorizationRuleName,
    parameters,
    options,
  );
  return _regenerateKeysDeserialize(result);
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  authorizationRuleName: string,
  options: TopicsListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/authorizationRules/{authorizationRuleName}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
      authorizationRuleName: authorizationRuleName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listKeysDeserialize(result: PathUncheckedResponse): Promise<AccessKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return accessKeysDeserializer(result.body);
}

/** Gets the primary and secondary connection strings for the topic. */
export async function listKeys(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  authorizationRuleName: string,
  options: TopicsListKeysOptionalParams = { requestOptions: {} },
): Promise<AccessKeys> {
  const result = await _listKeysSend(
    context,
    resourceGroupName,
    namespaceName,
    topicName,
    authorizationRuleName,
    options,
  );
  return _listKeysDeserialize(result);
}

export function _listAuthorizationRulesSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  options: TopicsListAuthorizationRulesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/authorizationRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
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

export async function _listAuthorizationRulesDeserialize(
  result: PathUncheckedResponse,
): Promise<_SBAuthorizationRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _sbAuthorizationRuleListResultDeserializer(result.body);
}

/** Gets authorization rules for a topic. */
export function listAuthorizationRules(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  options: TopicsListAuthorizationRulesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SBAuthorizationRule> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listAuthorizationRulesSend(context, resourceGroupName, namespaceName, topicName, options),
    _listAuthorizationRulesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deleteAuthorizationRuleSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  authorizationRuleName: string,
  options: TopicsDeleteAuthorizationRuleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/authorizationRules/{authorizationRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
      authorizationRuleName: authorizationRuleName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAuthorizationRuleDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a topic authorization rule. */
export async function deleteAuthorizationRule(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  authorizationRuleName: string,
  options: TopicsDeleteAuthorizationRuleOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteAuthorizationRuleSend(
    context,
    resourceGroupName,
    namespaceName,
    topicName,
    authorizationRuleName,
    options,
  );
  return _deleteAuthorizationRuleDeserialize(result);
}

export function _createOrUpdateAuthorizationRuleSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  authorizationRuleName: string,
  parameters: SBAuthorizationRule,
  options: TopicsCreateOrUpdateAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/authorizationRules/{authorizationRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
      authorizationRuleName: authorizationRuleName,
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
    body: sbAuthorizationRuleSerializer(parameters),
  });
}

export async function _createOrUpdateAuthorizationRuleDeserialize(
  result: PathUncheckedResponse,
): Promise<SBAuthorizationRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sbAuthorizationRuleDeserializer(result.body);
}

/** Creates an authorization rule for the specified topic. */
export async function createOrUpdateAuthorizationRule(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  authorizationRuleName: string,
  parameters: SBAuthorizationRule,
  options: TopicsCreateOrUpdateAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): Promise<SBAuthorizationRule> {
  const result = await _createOrUpdateAuthorizationRuleSend(
    context,
    resourceGroupName,
    namespaceName,
    topicName,
    authorizationRuleName,
    parameters,
    options,
  );
  return _createOrUpdateAuthorizationRuleDeserialize(result);
}

export function _getAuthorizationRuleSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  authorizationRuleName: string,
  options: TopicsGetAuthorizationRuleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/authorizationRules/{authorizationRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      topicName: topicName,
      authorizationRuleName: authorizationRuleName,
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

export async function _getAuthorizationRuleDeserialize(
  result: PathUncheckedResponse,
): Promise<SBAuthorizationRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sbAuthorizationRuleDeserializer(result.body);
}

/** Returns the specified authorization rule. */
export async function getAuthorizationRule(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  topicName: string,
  authorizationRuleName: string,
  options: TopicsGetAuthorizationRuleOptionalParams = { requestOptions: {} },
): Promise<SBAuthorizationRule> {
  const result = await _getAuthorizationRuleSend(
    context,
    resourceGroupName,
    namespaceName,
    topicName,
    authorizationRuleName,
    options,
  );
  return _getAuthorizationRuleDeserialize(result);
}
