// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type {
  _AutonomousDatabaseListResult,
  AutonomousDatabase,
  DisasterRecoveryConfigurationDetails,
  AutonomousDatabaseUpdate,
  PeerDbDetails,
  GenerateAutonomousDatabaseWalletDetails,
  AutonomousDatabaseWalletFile,
  RestoreAutonomousDatabaseDetails,
  AutonomousDatabaseLifecycleAction,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _autonomousDatabaseListResultDeserializer,
  autonomousDatabaseSerializer,
  autonomousDatabaseDeserializer,
  disasterRecoveryConfigurationDetailsSerializer,
  autonomousDatabaseUpdateSerializer,
  peerDbDetailsSerializer,
  generateAutonomousDatabaseWalletDetailsSerializer,
  autonomousDatabaseWalletFileDeserializer,
  restoreAutonomousDatabaseDetailsSerializer,
  autonomousDatabaseLifecycleActionSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AutonomousDatabasesActionOptionalParams,
  AutonomousDatabasesChangeDisasterRecoveryConfigurationOptionalParams,
  AutonomousDatabasesShrinkOptionalParams,
  AutonomousDatabasesRestoreOptionalParams,
  AutonomousDatabasesGenerateWalletOptionalParams,
  AutonomousDatabasesFailoverOptionalParams,
  AutonomousDatabasesSwitchoverOptionalParams,
  AutonomousDatabasesListByResourceGroupOptionalParams,
  AutonomousDatabasesUpdateOptionalParams,
  AutonomousDatabasesDeleteOptionalParams,
  AutonomousDatabasesGetOptionalParams,
  AutonomousDatabasesCreateOrUpdateOptionalParams,
  AutonomousDatabasesListBySubscriptionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _actionSend(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  body: AutonomousDatabaseLifecycleAction,
  options: AutonomousDatabasesActionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}/action{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      autonomousdatabasename: autonomousdatabasename,
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
    body: autonomousDatabaseLifecycleActionSerializer(body),
  });
}

export async function _actionDeserialize(
  result: PathUncheckedResponse,
): Promise<AutonomousDatabase> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return autonomousDatabaseDeserializer(result.body);
}

/** Perform Lifecycle Management Action on Autonomous Database */
export function action(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  body: AutonomousDatabaseLifecycleAction,
  options: AutonomousDatabasesActionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase> {
  return getLongRunningPoller(context, _actionDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _actionSend(context, resourceGroupName, autonomousdatabasename, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase>;
}

export function _changeDisasterRecoveryConfigurationSend(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  body: DisasterRecoveryConfigurationDetails,
  options: AutonomousDatabasesChangeDisasterRecoveryConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}/changeDisasterRecoveryConfiguration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      autonomousdatabasename: autonomousdatabasename,
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
    body: disasterRecoveryConfigurationDetailsSerializer(body),
  });
}

export async function _changeDisasterRecoveryConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<AutonomousDatabase> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return autonomousDatabaseDeserializer(result.body);
}

/** Perform ChangeDisasterRecoveryConfiguration action on Autonomous Database */
export function changeDisasterRecoveryConfiguration(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  body: DisasterRecoveryConfigurationDetails,
  options: AutonomousDatabasesChangeDisasterRecoveryConfigurationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase> {
  return getLongRunningPoller(
    context,
    _changeDisasterRecoveryConfigurationDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _changeDisasterRecoveryConfigurationSend(
          context,
          resourceGroupName,
          autonomousdatabasename,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase>;
}

export function _shrinkSend(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  options: AutonomousDatabasesShrinkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}/shrink{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      autonomousdatabasename: autonomousdatabasename,
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

export async function _shrinkDeserialize(
  result: PathUncheckedResponse,
): Promise<AutonomousDatabase> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return autonomousDatabaseDeserializer(result.body);
}

/** This operation shrinks the current allocated storage down to the current actual used data storage. */
export function shrink(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  options: AutonomousDatabasesShrinkOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase> {
  return getLongRunningPoller(context, _shrinkDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _shrinkSend(context, resourceGroupName, autonomousdatabasename, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase>;
}

export function _restoreSend(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  body: RestoreAutonomousDatabaseDetails,
  options: AutonomousDatabasesRestoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}/restore{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      autonomousdatabasename: autonomousdatabasename,
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
    body: restoreAutonomousDatabaseDetailsSerializer(body),
  });
}

export async function _restoreDeserialize(
  result: PathUncheckedResponse,
): Promise<AutonomousDatabase> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return autonomousDatabaseDeserializer(result.body);
}

/** Restores an Autonomous Database based on the provided request parameters. */
export function restore(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  body: RestoreAutonomousDatabaseDetails,
  options: AutonomousDatabasesRestoreOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase> {
  return getLongRunningPoller(context, _restoreDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restoreSend(context, resourceGroupName, autonomousdatabasename, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase>;
}

export function _generateWalletSend(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  body: GenerateAutonomousDatabaseWalletDetails,
  options: AutonomousDatabasesGenerateWalletOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}/generateWallet{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      autonomousdatabasename: autonomousdatabasename,
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
    body: generateAutonomousDatabaseWalletDetailsSerializer(body),
  });
}

export async function _generateWalletDeserialize(
  result: PathUncheckedResponse,
): Promise<AutonomousDatabaseWalletFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return autonomousDatabaseWalletFileDeserializer(result.body);
}

/** Generate wallet action on Autonomous Database */
export async function generateWallet(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  body: GenerateAutonomousDatabaseWalletDetails,
  options: AutonomousDatabasesGenerateWalletOptionalParams = {
    requestOptions: {},
  },
): Promise<AutonomousDatabaseWalletFile> {
  const result = await _generateWalletSend(
    context,
    resourceGroupName,
    autonomousdatabasename,
    body,
    options,
  );
  return _generateWalletDeserialize(result);
}

export function _failoverSend(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  body: PeerDbDetails,
  options: AutonomousDatabasesFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}/failover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      autonomousdatabasename: autonomousdatabasename,
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
    body: peerDbDetailsSerializer(body),
  });
}

export async function _failoverDeserialize(
  result: PathUncheckedResponse,
): Promise<AutonomousDatabase> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return autonomousDatabaseDeserializer(result.body);
}

/** Perform failover action on Autonomous Database */
export function failover(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  body: PeerDbDetails,
  options: AutonomousDatabasesFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase> {
  return getLongRunningPoller(context, _failoverDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _failoverSend(context, resourceGroupName, autonomousdatabasename, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase>;
}

export function _switchoverSend(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  body: PeerDbDetails,
  options: AutonomousDatabasesSwitchoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}/switchover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      autonomousdatabasename: autonomousdatabasename,
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
    body: peerDbDetailsSerializer(body),
  });
}

export async function _switchoverDeserialize(
  result: PathUncheckedResponse,
): Promise<AutonomousDatabase> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return autonomousDatabaseDeserializer(result.body);
}

/** Perform switchover action on Autonomous Database */
export function switchover(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  body: PeerDbDetails,
  options: AutonomousDatabasesSwitchoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase> {
  return getLongRunningPoller(context, _switchoverDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _switchoverSend(context, resourceGroupName, autonomousdatabasename, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase>;
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AutonomousDatabasesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases{?api%2Dversion}",
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
): Promise<_AutonomousDatabaseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _autonomousDatabaseListResultDeserializer(result.body);
}

/** List AutonomousDatabase resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AutonomousDatabasesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AutonomousDatabase> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  properties: AutonomousDatabaseUpdate,
  options: AutonomousDatabasesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      autonomousdatabasename: autonomousdatabasename,
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
    body: autonomousDatabaseUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AutonomousDatabase> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return autonomousDatabaseDeserializer(result.body);
}

/** Update a AutonomousDatabase */
export function update(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  properties: AutonomousDatabaseUpdate,
  options: AutonomousDatabasesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, autonomousdatabasename, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  options: AutonomousDatabasesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      autonomousdatabasename: autonomousdatabasename,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a AutonomousDatabase */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  options: AutonomousDatabasesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, autonomousdatabasename, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  options: AutonomousDatabasesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      autonomousdatabasename: autonomousdatabasename,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AutonomousDatabase> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return autonomousDatabaseDeserializer(result.body);
}

/** Get a AutonomousDatabase */
export async function get(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  options: AutonomousDatabasesGetOptionalParams = { requestOptions: {} },
): Promise<AutonomousDatabase> {
  const result = await _getSend(context, resourceGroupName, autonomousdatabasename, options);
  return _getDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  resource: AutonomousDatabase,
  options: AutonomousDatabasesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      autonomousdatabasename: autonomousdatabasename,
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
    body: autonomousDatabaseSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AutonomousDatabase> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return autonomousDatabaseDeserializer(result.body);
}

/** Create a AutonomousDatabase */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  autonomousdatabasename: string,
  resource: AutonomousDatabase,
  options: AutonomousDatabasesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, autonomousdatabasename, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: AutonomousDatabasesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/autonomousDatabases{?api%2Dversion}",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_AutonomousDatabaseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _autonomousDatabaseListResultDeserializer(result.body);
}

/** List AutonomousDatabase resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: AutonomousDatabasesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AutonomousDatabase> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
