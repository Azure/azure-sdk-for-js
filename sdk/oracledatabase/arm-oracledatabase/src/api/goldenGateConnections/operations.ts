// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type {
  _GoldenGateConnectionListResult,
  GoldenGateConnection,
  GoldenGateConnectionUpdate,
  AssignUnassignDeployment,
  AssignedDeployment,
  _AssignedDeploymentListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _goldenGateConnectionListResultDeserializer,
  goldenGateConnectionSerializer,
  goldenGateConnectionDeserializer,
  goldenGateConnectionUpdateSerializer,
  assignUnassignDeploymentSerializer,
  assignedDeploymentDeserializer,
  _assignedDeploymentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GoldenGateConnectionsGetAssignedDeploymentOptionalParams,
  GoldenGateConnectionsListAssignedDeploymentsByParentOptionalParams,
  GoldenGateConnectionsUnassignDeploymentOptionalParams,
  GoldenGateConnectionsAssignDeploymentOptionalParams,
  GoldenGateConnectionsListByResourceGroupOptionalParams,
  GoldenGateConnectionsDeleteOptionalParams,
  GoldenGateConnectionsUpdateOptionalParams,
  GoldenGateConnectionsGetOptionalParams,
  GoldenGateConnectionsCreateOrUpdateOptionalParams,
  GoldenGateConnectionsListBySubscriptionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getAssignedDeploymentSend(
  context: Client,
  resourceGroupName: string,
  goldenGateConnectionName: string,
  assignmentId: string,
  options: GoldenGateConnectionsGetAssignedDeploymentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/goldenGateConnections/{goldenGateConnectionName}/assignedDeployments/{assignmentId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      goldenGateConnectionName: goldenGateConnectionName,
      assignmentId: assignmentId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getAssignedDeploymentDeserialize(
  result: PathUncheckedResponse,
): Promise<AssignedDeployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return assignedDeploymentDeserializer(result.body);
}

/** Get assigned deployment by GoldenGate connection. */
export async function getAssignedDeployment(
  context: Client,
  resourceGroupName: string,
  goldenGateConnectionName: string,
  assignmentId: string,
  options: GoldenGateConnectionsGetAssignedDeploymentOptionalParams = { requestOptions: {} },
): Promise<AssignedDeployment> {
  const result = await _getAssignedDeploymentSend(
    context,
    resourceGroupName,
    goldenGateConnectionName,
    assignmentId,
    options,
  );
  return _getAssignedDeploymentDeserialize(result);
}

export function _listAssignedDeploymentsByParentSend(
  context: Client,
  resourceGroupName: string,
  goldenGateConnectionName: string,
  options: GoldenGateConnectionsListAssignedDeploymentsByParentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/goldenGateConnections/{goldenGateConnectionName}/assignedDeployments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      goldenGateConnectionName: goldenGateConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listAssignedDeploymentsByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_AssignedDeploymentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _assignedDeploymentListResultDeserializer(result.body);
}

/** List assigned deployments by GoldenGate connection. */
export function listAssignedDeploymentsByParent(
  context: Client,
  resourceGroupName: string,
  goldenGateConnectionName: string,
  options: GoldenGateConnectionsListAssignedDeploymentsByParentOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AssignedDeployment> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listAssignedDeploymentsByParentSend(
        context,
        resourceGroupName,
        goldenGateConnectionName,
        options,
      ),
    _listAssignedDeploymentsByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _unassignDeploymentSend(
  context: Client,
  resourceGroupName: string,
  goldenGateConnectionName: string,
  body: AssignUnassignDeployment,
  options: GoldenGateConnectionsUnassignDeploymentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/goldenGateConnections/{goldenGateConnectionName}/unassignDeployment{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      goldenGateConnectionName: goldenGateConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: assignUnassignDeploymentSerializer(body),
  });
}

export async function _unassignDeploymentDeserialize(
  result: PathUncheckedResponse,
): Promise<AssignedDeployment> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return assignedDeploymentDeserializer(result.body);
}

/** Unassign a GoldenGate deployment from a connection. */
export function unassignDeployment(
  context: Client,
  resourceGroupName: string,
  goldenGateConnectionName: string,
  body: AssignUnassignDeployment,
  options: GoldenGateConnectionsUnassignDeploymentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AssignedDeployment>, AssignedDeployment> {
  return getLongRunningPoller(context, _unassignDeploymentDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _unassignDeploymentSend(context, resourceGroupName, goldenGateConnectionName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<AssignedDeployment>, AssignedDeployment>;
}

export function _assignDeploymentSend(
  context: Client,
  resourceGroupName: string,
  goldenGateConnectionName: string,
  body: AssignUnassignDeployment,
  options: GoldenGateConnectionsAssignDeploymentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/goldenGateConnections/{goldenGateConnectionName}/assignDeployment{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      goldenGateConnectionName: goldenGateConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: assignUnassignDeploymentSerializer(body),
  });
}

export async function _assignDeploymentDeserialize(
  result: PathUncheckedResponse,
): Promise<AssignedDeployment> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return assignedDeploymentDeserializer(result.body);
}

/** Assign a GoldenGate deployment to a connection. */
export function assignDeployment(
  context: Client,
  resourceGroupName: string,
  goldenGateConnectionName: string,
  body: AssignUnassignDeployment,
  options: GoldenGateConnectionsAssignDeploymentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AssignedDeployment>, AssignedDeployment> {
  return getLongRunningPoller(context, _assignDeploymentDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _assignDeploymentSend(context, resourceGroupName, goldenGateConnectionName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<AssignedDeployment>, AssignedDeployment>;
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: GoldenGateConnectionsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/goldenGateConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_GoldenGateConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _goldenGateConnectionListResultDeserializer(result.body);
}

/** List GoldenGateConnection resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: GoldenGateConnectionsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GoldenGateConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  goldenGateConnectionName: string,
  options: GoldenGateConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/goldenGateConnections/{goldenGateConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      goldenGateConnectionName: goldenGateConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a GoldenGateConnection */
export function $delete(
  context: Client,
  resourceGroupName: string,
  goldenGateConnectionName: string,
  options: GoldenGateConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, goldenGateConnectionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  goldenGateConnectionName: string,
  properties: GoldenGateConnectionUpdate,
  options: GoldenGateConnectionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/goldenGateConnections/{goldenGateConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      goldenGateConnectionName: goldenGateConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: goldenGateConnectionUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<GoldenGateConnection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return goldenGateConnectionDeserializer(result.body);
}

/** Update a GoldenGateConnection */
export function update(
  context: Client,
  resourceGroupName: string,
  goldenGateConnectionName: string,
  properties: GoldenGateConnectionUpdate,
  options: GoldenGateConnectionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GoldenGateConnection>, GoldenGateConnection> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, goldenGateConnectionName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<GoldenGateConnection>, GoldenGateConnection>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  goldenGateConnectionName: string,
  options: GoldenGateConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/goldenGateConnections/{goldenGateConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      goldenGateConnectionName: goldenGateConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<GoldenGateConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return goldenGateConnectionDeserializer(result.body);
}

/** Get a GoldenGateConnection */
export async function get(
  context: Client,
  resourceGroupName: string,
  goldenGateConnectionName: string,
  options: GoldenGateConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<GoldenGateConnection> {
  const result = await _getSend(context, resourceGroupName, goldenGateConnectionName, options);
  return _getDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  goldenGateConnectionName: string,
  resource: GoldenGateConnection,
  options: GoldenGateConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/goldenGateConnections/{goldenGateConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      goldenGateConnectionName: goldenGateConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: goldenGateConnectionSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<GoldenGateConnection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return goldenGateConnectionDeserializer(result.body);
}

/** Create a GoldenGateConnection */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  goldenGateConnectionName: string,
  resource: GoldenGateConnection,
  options: GoldenGateConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GoldenGateConnection>, GoldenGateConnection> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, goldenGateConnectionName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<GoldenGateConnection>, GoldenGateConnection>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: GoldenGateConnectionsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/goldenGateConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_GoldenGateConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _goldenGateConnectionListResultDeserializer(result.body);
}

/** List GoldenGateConnection resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: GoldenGateConnectionsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GoldenGateConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}
