// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusManagementContext as Client } from "../index.js";
import type {
  SBAuthorizationRule,
  _SBAuthorizationRuleListResult,
  AccessKeys,
  CheckNameAvailability,
  CheckNameAvailabilityResult,
  RegenerateAccessKeyParameters,
  SBNamespace,
  SBNamespaceUpdateParameters,
  _SBNamespaceListResult,
  FailOver,
  NetworkRuleSet,
  _NetworkRuleSetListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  sbAuthorizationRuleSerializer,
  sbAuthorizationRuleDeserializer,
  _sbAuthorizationRuleListResultDeserializer,
  accessKeysDeserializer,
  checkNameAvailabilitySerializer,
  checkNameAvailabilityResultDeserializer,
  regenerateAccessKeyParametersSerializer,
  sbNamespaceSerializer,
  sbNamespaceDeserializer,
  sbNamespaceUpdateParametersSerializer,
  _sbNamespaceListResultDeserializer,
  failOverSerializer,
  failOverDeserializer,
  networkRuleSetSerializer,
  networkRuleSetDeserializer,
  _networkRuleSetListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NamespacesCheckNameAvailabilityOptionalParams,
  NamespacesRegenerateKeysOptionalParams,
  NamespacesListKeysOptionalParams,
  NamespacesListAuthorizationRulesOptionalParams,
  NamespacesDeleteAuthorizationRuleOptionalParams,
  NamespacesCreateOrUpdateAuthorizationRuleOptionalParams,
  NamespacesGetAuthorizationRuleOptionalParams,
  NamespacesListNetworkRuleSetsOptionalParams,
  NamespacesCreateOrUpdateNetworkRuleSetOptionalParams,
  NamespacesGetNetworkRuleSetOptionalParams,
  NamespacesFailoverOptionalParams,
  NamespacesListOptionalParams,
  NamespacesListByResourceGroupOptionalParams,
  NamespacesDeleteOptionalParams,
  NamespacesUpdateOptionalParams,
  NamespacesCreateOrUpdateOptionalParams,
  NamespacesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  parameters: CheckNameAvailability,
  options: NamespacesCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceBus/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
    body: checkNameAvailabilitySerializer(parameters),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return checkNameAvailabilityResultDeserializer(result.body);
}

/** Check the give namespace name availability. */
export async function checkNameAvailability(
  context: Client,
  parameters: CheckNameAvailability,
  options: NamespacesCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckNameAvailabilityResult> {
  const result = await _checkNameAvailabilitySend(context, parameters, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _regenerateKeysSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  authorizationRuleName: string,
  parameters: RegenerateAccessKeyParameters,
  options: NamespacesRegenerateKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/AuthorizationRules/{authorizationRuleName}/regenerateKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
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

/** Regenerates the primary or secondary connection strings for the namespace. */
export async function regenerateKeys(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  authorizationRuleName: string,
  parameters: RegenerateAccessKeyParameters,
  options: NamespacesRegenerateKeysOptionalParams = { requestOptions: {} },
): Promise<AccessKeys> {
  const result = await _regenerateKeysSend(
    context,
    resourceGroupName,
    namespaceName,
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
  authorizationRuleName: string,
  options: NamespacesListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/AuthorizationRules/{authorizationRuleName}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
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

/** Gets the primary and secondary connection strings for the namespace. */
export async function listKeys(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  authorizationRuleName: string,
  options: NamespacesListKeysOptionalParams = { requestOptions: {} },
): Promise<AccessKeys> {
  const result = await _listKeysSend(
    context,
    resourceGroupName,
    namespaceName,
    authorizationRuleName,
    options,
  );
  return _listKeysDeserialize(result);
}

export function _listAuthorizationRulesSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespacesListAuthorizationRulesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/authorizationRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
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

/** Gets the authorization rules for a namespace. */
export function listAuthorizationRules(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespacesListAuthorizationRulesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SBAuthorizationRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listAuthorizationRulesSend(context, resourceGroupName, namespaceName, options),
    _listAuthorizationRulesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deleteAuthorizationRuleSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  authorizationRuleName: string,
  options: NamespacesDeleteAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/AuthorizationRules/{authorizationRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
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

/** Deletes a namespace authorization rule. */
export async function deleteAuthorizationRule(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  authorizationRuleName: string,
  options: NamespacesDeleteAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _deleteAuthorizationRuleSend(
    context,
    resourceGroupName,
    namespaceName,
    authorizationRuleName,
    options,
  );
  return _deleteAuthorizationRuleDeserialize(result);
}

export function _createOrUpdateAuthorizationRuleSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  authorizationRuleName: string,
  parameters: SBAuthorizationRule,
  options: NamespacesCreateOrUpdateAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/AuthorizationRules/{authorizationRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
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

/** Creates or updates an authorization rule for a namespace. */
export async function createOrUpdateAuthorizationRule(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  authorizationRuleName: string,
  parameters: SBAuthorizationRule,
  options: NamespacesCreateOrUpdateAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): Promise<SBAuthorizationRule> {
  const result = await _createOrUpdateAuthorizationRuleSend(
    context,
    resourceGroupName,
    namespaceName,
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
  authorizationRuleName: string,
  options: NamespacesGetAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/AuthorizationRules/{authorizationRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
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

/** Gets an authorization rule for a namespace by rule name. */
export async function getAuthorizationRule(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  authorizationRuleName: string,
  options: NamespacesGetAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): Promise<SBAuthorizationRule> {
  const result = await _getAuthorizationRuleSend(
    context,
    resourceGroupName,
    namespaceName,
    authorizationRuleName,
    options,
  );
  return _getAuthorizationRuleDeserialize(result);
}

export function _listNetworkRuleSetsSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespacesListNetworkRuleSetsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/networkRuleSets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
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

export async function _listNetworkRuleSetsDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkRuleSetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _networkRuleSetListResultDeserializer(result.body);
}

/** Gets list of NetworkRuleSet for a Namespace. */
export function listNetworkRuleSets(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespacesListNetworkRuleSetsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkRuleSet> {
  return buildPagedAsyncIterator(
    context,
    () => _listNetworkRuleSetsSend(context, resourceGroupName, namespaceName, options),
    _listNetworkRuleSetsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _createOrUpdateNetworkRuleSetSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  parameters: NetworkRuleSet,
  options: NamespacesCreateOrUpdateNetworkRuleSetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/networkRuleSets/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
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
    body: networkRuleSetSerializer(parameters),
  });
}

export async function _createOrUpdateNetworkRuleSetDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkRuleSet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return networkRuleSetDeserializer(result.body);
}

/** Create or update NetworkRuleSet for a Namespace. */
export async function createOrUpdateNetworkRuleSet(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  parameters: NetworkRuleSet,
  options: NamespacesCreateOrUpdateNetworkRuleSetOptionalParams = {
    requestOptions: {},
  },
): Promise<NetworkRuleSet> {
  const result = await _createOrUpdateNetworkRuleSetSend(
    context,
    resourceGroupName,
    namespaceName,
    parameters,
    options,
  );
  return _createOrUpdateNetworkRuleSetDeserialize(result);
}

export function _getNetworkRuleSetSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespacesGetNetworkRuleSetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/networkRuleSets/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
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

export async function _getNetworkRuleSetDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkRuleSet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return networkRuleSetDeserializer(result.body);
}

/** Gets NetworkRuleSet for a Namespace. */
export async function getNetworkRuleSet(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespacesGetNetworkRuleSetOptionalParams = { requestOptions: {} },
): Promise<NetworkRuleSet> {
  const result = await _getNetworkRuleSetSend(context, resourceGroupName, namespaceName, options);
  return _getNetworkRuleSetDeserialize(result);
}

export function _failoverSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  parameters: FailOver,
  options: NamespacesFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/failover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: failOverSerializer(parameters),
  });
}

export async function _failoverDeserialize(result: PathUncheckedResponse): Promise<FailOver> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return failOverDeserializer(result.body);
}

/** GeoDR Failover */
export function failover(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  parameters: FailOver,
  options: NamespacesFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FailOver>, FailOver> {
  return getLongRunningPoller(context, _failoverDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _failoverSend(context, resourceGroupName, namespaceName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<FailOver>, FailOver>;
}

export function _listSend(
  context: Client,
  options: NamespacesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceBus/namespaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_SBNamespaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _sbNamespaceListResultDeserializer(result.body);
}

/** Gets all the available namespaces within the subscription, irrespective of the resource groups. */
export function list(
  context: Client,
  options: NamespacesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SBNamespace> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: NamespacesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SBNamespaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _sbNamespaceListResultDeserializer(result.body);
}

/** Gets the available namespaces within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: NamespacesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SBNamespace> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespacesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes an existing namespace. This operation also removes all associated resources under the namespace. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespacesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, namespaceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  parameters: SBNamespaceUpdateParameters,
  options: NamespacesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: sbNamespaceUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SBNamespace> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sbNamespaceDeserializer(result.body);
}

/** Updates a service namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent. */
export async function update(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  parameters: SBNamespaceUpdateParameters,
  options: NamespacesUpdateOptionalParams = { requestOptions: {} },
): Promise<SBNamespace | null> {
  const result = await _updateSend(context, resourceGroupName, namespaceName, parameters, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  parameters: SBNamespace,
  options: NamespacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
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
    body: sbNamespaceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SBNamespace> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sbNamespaceDeserializer(result.body);
}

/** Creates or updates a service namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  parameters: SBNamespace,
  options: NamespacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SBNamespace>, SBNamespace> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, namespaceName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<SBNamespace>, SBNamespace>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SBNamespace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sbNamespaceDeserializer(result.body);
}

/** Gets a description for the specified namespace. */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespacesGetOptionalParams = { requestOptions: {} },
): Promise<SBNamespace> {
  const result = await _getSend(context, resourceGroupName, namespaceName, options);
  return _getDeserialize(result);
}
