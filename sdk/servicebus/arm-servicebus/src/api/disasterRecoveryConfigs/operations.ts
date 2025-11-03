// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusManagementContext as Client } from "../index.js";
import type {
  SBAuthorizationRule,
  _SBAuthorizationRuleListResult,
  AccessKeys,
  CheckNameAvailability,
  CheckNameAvailabilityResult,
  ArmDisasterRecovery,
  _ArmDisasterRecoveryListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  sbAuthorizationRuleDeserializer,
  _sbAuthorizationRuleListResultDeserializer,
  accessKeysDeserializer,
  checkNameAvailabilitySerializer,
  checkNameAvailabilityResultDeserializer,
  armDisasterRecoverySerializer,
  armDisasterRecoveryDeserializer,
  _armDisasterRecoveryListResultDeserializer,
  failoverPropertiesSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DisasterRecoveryConfigsFailOverOptionalParams,
  DisasterRecoveryConfigsBreakPairingOptionalParams,
  DisasterRecoveryConfigsListOptionalParams,
  DisasterRecoveryConfigsDeleteOptionalParams,
  DisasterRecoveryConfigsCreateOrUpdateOptionalParams,
  DisasterRecoveryConfigsGetOptionalParams,
  DisasterRecoveryConfigsCheckNameAvailabilityOptionalParams,
  DisasterRecoveryConfigsListKeysOptionalParams,
  DisasterRecoveryConfigsListAuthorizationRulesOptionalParams,
  DisasterRecoveryConfigsGetAuthorizationRuleOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _failOverSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  alias: string,
  options: DisasterRecoveryConfigsFailOverOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}/failover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      alias: alias,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["parameters"]
      ? options["parameters"]
      : failoverPropertiesSerializer(options["parameters"]),
  });
}

export async function _failOverDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Invokes GEO DR failover and reconfigure the alias to point to the secondary namespace */
export async function failOver(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  alias: string,
  options: DisasterRecoveryConfigsFailOverOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _failOverSend(context, resourceGroupName, namespaceName, alias, options);
  return _failOverDeserialize(result);
}

export function _breakPairingSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  alias: string,
  options: DisasterRecoveryConfigsBreakPairingOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}/breakPairing{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      alias: alias,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _breakPairingDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** This operation disables the Disaster Recovery and stops replicating changes from primary to secondary namespaces */
export async function breakPairing(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  alias: string,
  options: DisasterRecoveryConfigsBreakPairingOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _breakPairingSend(context, resourceGroupName, namespaceName, alias, options);
  return _breakPairingDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: DisasterRecoveryConfigsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ArmDisasterRecoveryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _armDisasterRecoveryListResultDeserializer(result.body);
}

/** Gets all Alias(Disaster Recovery configurations) */
export function list(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: DisasterRecoveryConfigsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ArmDisasterRecovery> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, namespaceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  alias: string,
  options: DisasterRecoveryConfigsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      alias: alias,
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

/** Deletes an Alias(Disaster Recovery configuration) */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  alias: string,
  options: DisasterRecoveryConfigsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, namespaceName, alias, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  alias: string,
  parameters: ArmDisasterRecovery,
  options: DisasterRecoveryConfigsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      alias: alias,
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
    body: armDisasterRecoverySerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ArmDisasterRecovery> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return armDisasterRecoveryDeserializer(result.body);
}

/** Creates or updates a new Alias(Disaster Recovery configuration) */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  alias: string,
  parameters: ArmDisasterRecovery,
  options: DisasterRecoveryConfigsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<ArmDisasterRecovery> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    namespaceName,
    alias,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  alias: string,
  options: DisasterRecoveryConfigsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      alias: alias,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ArmDisasterRecovery> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return armDisasterRecoveryDeserializer(result.body);
}

/** Retrieves Alias(Disaster Recovery configuration) for primary or secondary namespace */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  alias: string,
  options: DisasterRecoveryConfigsGetOptionalParams = { requestOptions: {} },
): Promise<ArmDisasterRecovery> {
  const result = await _getSend(context, resourceGroupName, namespaceName, alias, options);
  return _getDeserialize(result);
}

export function _checkNameAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  parameters: CheckNameAvailability,
  options: DisasterRecoveryConfigsCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs/CheckNameAvailability{?api%2Dversion}",
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
  resourceGroupName: string,
  namespaceName: string,
  parameters: CheckNameAvailability,
  options: DisasterRecoveryConfigsCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckNameAvailabilityResult> {
  const result = await _checkNameAvailabilitySend(
    context,
    resourceGroupName,
    namespaceName,
    parameters,
    options,
  );
  return _checkNameAvailabilityDeserialize(result);
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  alias: string,
  authorizationRuleName: string,
  options: DisasterRecoveryConfigsListKeysOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}/authorizationRules/{authorizationRuleName}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      alias: alias,
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
  alias: string,
  authorizationRuleName: string,
  options: DisasterRecoveryConfigsListKeysOptionalParams = {
    requestOptions: {},
  },
): Promise<AccessKeys> {
  const result = await _listKeysSend(
    context,
    resourceGroupName,
    namespaceName,
    alias,
    authorizationRuleName,
    options,
  );
  return _listKeysDeserialize(result);
}

export function _listAuthorizationRulesSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  alias: string,
  options: DisasterRecoveryConfigsListAuthorizationRulesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}/authorizationRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      alias: alias,
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
  alias: string,
  options: DisasterRecoveryConfigsListAuthorizationRulesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SBAuthorizationRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listAuthorizationRulesSend(context, resourceGroupName, namespaceName, alias, options),
    _listAuthorizationRulesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getAuthorizationRuleSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  alias: string,
  authorizationRuleName: string,
  options: DisasterRecoveryConfigsGetAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}/authorizationRules/{authorizationRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      alias: alias,
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
  alias: string,
  authorizationRuleName: string,
  options: DisasterRecoveryConfigsGetAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): Promise<SBAuthorizationRule> {
  const result = await _getAuthorizationRuleSend(
    context,
    resourceGroupName,
    namespaceName,
    alias,
    authorizationRuleName,
    options,
  );
  return _getAuthorizationRuleDeserialize(result);
}
