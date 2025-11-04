// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RelayAPIContext as Client } from "../index.js";
import type {
  AuthorizationRule,
  _AuthorizationRuleListResult,
  AccessKeys,
  RegenerateAccessKeyParameters,
  RelayNamespace,
  RelayUpdateParameters,
  _RelayNamespaceListResult,
  NetworkRuleSet,
  CheckNameAvailability,
  CheckNameAvailabilityResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  authorizationRuleSerializer,
  authorizationRuleDeserializer,
  _authorizationRuleListResultDeserializer,
  accessKeysDeserializer,
  regenerateAccessKeyParametersSerializer,
  relayNamespaceSerializer,
  relayNamespaceDeserializer,
  relayUpdateParametersSerializer,
  _relayNamespaceListResultDeserializer,
  networkRuleSetSerializer,
  networkRuleSetDeserializer,
  checkNameAvailabilitySerializer,
  checkNameAvailabilityResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NamespacesCheckNameAvailabilityOptionalParams,
  NamespacesCreateOrUpdateNetworkRuleSetOptionalParams,
  NamespacesGetNetworkRuleSetOptionalParams,
  NamespacesListOptionalParams,
  NamespacesListByResourceGroupOptionalParams,
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
    "/subscriptions/{subscriptionId}/providers/Microsoft.Relay/checkNameAvailability{?api%2Dversion}",
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

/** Check the specified namespace name availability. */
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/networkRuleSets/default{?api%2Dversion}",
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/networkRuleSets/default{?api%2Dversion}",
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

export function _listSend(
  context: Client,
  options: NamespacesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Relay/namespaces{?api%2Dversion}",
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
): Promise<_RelayNamespaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _relayNamespaceListResultDeserializer(result.body);
}

/** Lists all the available namespaces within the subscription regardless of the resourceGroups. */
export function list(
  context: Client,
  options: NamespacesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RelayNamespace> {
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces{?api%2Dversion}",
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
): Promise<_RelayNamespaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _relayNamespaceListResultDeserializer(result.body);
}

/** Lists all the available namespaces within the ResourceGroup. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: NamespacesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RelayNamespace> {
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}{?api%2Dversion}",
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
  parameters: RelayUpdateParameters,
  options: NamespacesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}{?api%2Dversion}",
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
    body: relayUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<RelayNamespace> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return relayNamespaceDeserializer(result.body);
}

/** Creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent. */
export async function update(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  parameters: RelayUpdateParameters,
  options: NamespacesUpdateOptionalParams = { requestOptions: {} },
): Promise<RelayNamespace> {
  const result = await _updateSend(context, resourceGroupName, namespaceName, parameters, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  parameters: RelayNamespace,
  options: NamespacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}{?api%2Dversion}",
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
    body: relayNamespaceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<RelayNamespace> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return relayNamespaceDeserializer(result.body);
}

/** Create Azure Relay namespace. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  parameters: RelayNamespace,
  options: NamespacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RelayNamespace>, RelayNamespace> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, namespaceName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<RelayNamespace>, RelayNamespace>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RelayNamespace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return relayNamespaceDeserializer(result.body);
}

/** Returns the description for the specified namespace. */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespacesGetOptionalParams = { requestOptions: {} },
): Promise<RelayNamespace> {
  const result = await _getSend(context, resourceGroupName, namespaceName, options);
  return _getDeserialize(result);
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}/regenerateKeys{?api%2Dversion}",
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

/** Regenerates the primary or secondary connection strings to the namespace. */
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}/listKeys{?api%2Dversion}",
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

/** Primary and secondary connection strings to the namespace. */
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/authorizationRules{?api%2Dversion}",
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
): Promise<_AuthorizationRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _authorizationRuleListResultDeserializer(result.body);
}

/** Authorization rules for a namespace. */
export function listAuthorizationRules(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespacesListAuthorizationRulesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AuthorizationRule> {
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}{?api%2Dversion}",
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
  parameters: AuthorizationRule,
  options: NamespacesCreateOrUpdateAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}{?api%2Dversion}",
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
    body: authorizationRuleSerializer(parameters),
  });
}

export async function _createOrUpdateAuthorizationRuleDeserialize(
  result: PathUncheckedResponse,
): Promise<AuthorizationRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return authorizationRuleDeserializer(result.body);
}

/** Creates or updates an authorization rule for a namespace. */
export async function createOrUpdateAuthorizationRule(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  authorizationRuleName: string,
  parameters: AuthorizationRule,
  options: NamespacesCreateOrUpdateAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): Promise<AuthorizationRule> {
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}{?api%2Dversion}",
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
): Promise<AuthorizationRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return authorizationRuleDeserializer(result.body);
}

/** Authorization rule for a namespace by name. */
export async function getAuthorizationRule(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  authorizationRuleName: string,
  options: NamespacesGetAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): Promise<AuthorizationRule> {
  const result = await _getAuthorizationRuleSend(
    context,
    resourceGroupName,
    namespaceName,
    authorizationRuleName,
    options,
  );
  return _getAuthorizationRuleDeserialize(result);
}
