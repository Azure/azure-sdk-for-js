// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusManagementContext as Client } from "../index.js";
import type {
  SBAuthorizationRule,
  _SBAuthorizationRuleListResult,
  AccessKeys,
  RegenerateAccessKeyParameters,
  SBQueue,
  _SBQueueListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  sbAuthorizationRuleSerializer,
  sbAuthorizationRuleDeserializer,
  _sbAuthorizationRuleListResultDeserializer,
  accessKeysDeserializer,
  regenerateAccessKeyParametersSerializer,
  sbQueueSerializer,
  sbQueueDeserializer,
  _sbQueueListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByNamespaceSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: QueuesListByNamespaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues{?api%2Dversion,%24skip,%24top}",
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
): Promise<_SBQueueListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _sbQueueListResultDeserializer(result.body);
}

/** Gets the queues within a namespace. */
export function listByNamespace(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: QueuesListByNamespaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SBQueue> {
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
  queueName: string,
  options: QueuesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues/{queueName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      queueName: queueName,
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

/** Deletes a queue from the specified namespace in a resource group. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  queueName: string,
  options: QueuesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, namespaceName, queueName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  queueName: string,
  parameters: SBQueue,
  options: QueuesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues/{queueName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      queueName: queueName,
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
    body: sbQueueSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<SBQueue> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sbQueueDeserializer(result.body);
}

/** Creates or updates a Service Bus queue. This operation is idempotent. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  queueName: string,
  parameters: SBQueue,
  options: QueuesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<SBQueue> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    namespaceName,
    queueName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  queueName: string,
  options: QueuesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues/{queueName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      queueName: queueName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SBQueue> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sbQueueDeserializer(result.body);
}

/** Returns a description for the specified queue. */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  queueName: string,
  options: QueuesGetOptionalParams = { requestOptions: {} },
): Promise<SBQueue> {
  const result = await _getSend(context, resourceGroupName, namespaceName, queueName, options);
  return _getDeserialize(result);
}

export function _regenerateKeysSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  queueName: string,
  authorizationRuleName: string,
  parameters: RegenerateAccessKeyParameters,
  options: QueuesRegenerateKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues/{queueName}/authorizationRules/{authorizationRuleName}/regenerateKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      queueName: queueName,
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

/** Regenerates the primary or secondary connection strings to the queue. */
export async function regenerateKeys(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  queueName: string,
  authorizationRuleName: string,
  parameters: RegenerateAccessKeyParameters,
  options: QueuesRegenerateKeysOptionalParams = { requestOptions: {} },
): Promise<AccessKeys> {
  const result = await _regenerateKeysSend(
    context,
    resourceGroupName,
    namespaceName,
    queueName,
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
  queueName: string,
  authorizationRuleName: string,
  options: QueuesListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues/{queueName}/authorizationRules/{authorizationRuleName}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      queueName: queueName,
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

/** Primary and secondary connection strings to the queue. */
export async function listKeys(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  queueName: string,
  authorizationRuleName: string,
  options: QueuesListKeysOptionalParams = { requestOptions: {} },
): Promise<AccessKeys> {
  const result = await _listKeysSend(
    context,
    resourceGroupName,
    namespaceName,
    queueName,
    authorizationRuleName,
    options,
  );
  return _listKeysDeserialize(result);
}

export function _listAuthorizationRulesSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  queueName: string,
  options: QueuesListAuthorizationRulesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues/{queueName}/authorizationRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      queueName: queueName,
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

/** Gets all authorization rules for a queue. */
export function listAuthorizationRules(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  queueName: string,
  options: QueuesListAuthorizationRulesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SBAuthorizationRule> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listAuthorizationRulesSend(context, resourceGroupName, namespaceName, queueName, options),
    _listAuthorizationRulesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deleteAuthorizationRuleSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  queueName: string,
  authorizationRuleName: string,
  options: QueuesDeleteAuthorizationRuleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues/{queueName}/authorizationRules/{authorizationRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      queueName: queueName,
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

/** Deletes a queue authorization rule. */
export async function deleteAuthorizationRule(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  queueName: string,
  authorizationRuleName: string,
  options: QueuesDeleteAuthorizationRuleOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteAuthorizationRuleSend(
    context,
    resourceGroupName,
    namespaceName,
    queueName,
    authorizationRuleName,
    options,
  );
  return _deleteAuthorizationRuleDeserialize(result);
}

export function _createOrUpdateAuthorizationRuleSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  queueName: string,
  authorizationRuleName: string,
  parameters: SBAuthorizationRule,
  options: QueuesCreateOrUpdateAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues/{queueName}/authorizationRules/{authorizationRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      queueName: queueName,
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

/** Creates an authorization rule for a queue. */
export async function createOrUpdateAuthorizationRule(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  queueName: string,
  authorizationRuleName: string,
  parameters: SBAuthorizationRule,
  options: QueuesCreateOrUpdateAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): Promise<SBAuthorizationRule> {
  const result = await _createOrUpdateAuthorizationRuleSend(
    context,
    resourceGroupName,
    namespaceName,
    queueName,
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
  queueName: string,
  authorizationRuleName: string,
  options: QueuesGetAuthorizationRuleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues/{queueName}/authorizationRules/{authorizationRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      queueName: queueName,
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

/** Gets an authorization rule for a queue by rule name. */
export async function getAuthorizationRule(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  queueName: string,
  authorizationRuleName: string,
  options: QueuesGetAuthorizationRuleOptionalParams = { requestOptions: {} },
): Promise<SBAuthorizationRule> {
  const result = await _getAuthorizationRuleSend(
    context,
    resourceGroupName,
    namespaceName,
    queueName,
    authorizationRuleName,
    options,
  );
  return _getAuthorizationRuleDeserialize(result);
}
