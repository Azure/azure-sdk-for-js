// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type {
  _GoldenGateDeploymentListResult,
  GoldenGateDeployment,
  GoldenGateDeploymentUpdate,
  AssignUnassignConnection,
  AssignedConnection,
  _AssignedConnectionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _goldenGateDeploymentListResultDeserializer,
  goldenGateDeploymentSerializer,
  goldenGateDeploymentDeserializer,
  goldenGateDeploymentUpdateSerializer,
  assignUnassignConnectionSerializer,
  assignedConnectionDeserializer,
  _assignedConnectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GoldenGateDeploymentsGetAssignedConnectionOptionalParams,
  GoldenGateDeploymentsListAssignedConnectionsByParentOptionalParams,
  GoldenGateDeploymentsUnassignConnectionOptionalParams,
  GoldenGateDeploymentsAssignConnectionOptionalParams,
  GoldenGateDeploymentsListByResourceGroupOptionalParams,
  GoldenGateDeploymentsDeleteOptionalParams,
  GoldenGateDeploymentsUpdateOptionalParams,
  GoldenGateDeploymentsGetOptionalParams,
  GoldenGateDeploymentsCreateOrUpdateOptionalParams,
  GoldenGateDeploymentsListBySubscriptionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getAssignedConnectionSend(
  context: Client,
  resourceGroupName: string,
  goldenGateDeploymentName: string,
  assignmentId: string,
  options: GoldenGateDeploymentsGetAssignedConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/goldenGateDeployments/{goldenGateDeploymentName}/assignedConnections/{assignmentId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      goldenGateDeploymentName: goldenGateDeploymentName,
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

export async function _getAssignedConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<AssignedConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return assignedConnectionDeserializer(result.body);
}

/** Get assigned connection by GoldenGate deployment. */
export async function getAssignedConnection(
  context: Client,
  resourceGroupName: string,
  goldenGateDeploymentName: string,
  assignmentId: string,
  options: GoldenGateDeploymentsGetAssignedConnectionOptionalParams = { requestOptions: {} },
): Promise<AssignedConnection> {
  const result = await _getAssignedConnectionSend(
    context,
    resourceGroupName,
    goldenGateDeploymentName,
    assignmentId,
    options,
  );
  return _getAssignedConnectionDeserialize(result);
}

export function _listAssignedConnectionsByParentSend(
  context: Client,
  resourceGroupName: string,
  goldenGateDeploymentName: string,
  options: GoldenGateDeploymentsListAssignedConnectionsByParentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/goldenGateDeployments/{goldenGateDeploymentName}/assignedConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      goldenGateDeploymentName: goldenGateDeploymentName,
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

export async function _listAssignedConnectionsByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_AssignedConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _assignedConnectionListResultDeserializer(result.body);
}

/** List assigned connections by GoldenGate deployment. */
export function listAssignedConnectionsByParent(
  context: Client,
  resourceGroupName: string,
  goldenGateDeploymentName: string,
  options: GoldenGateDeploymentsListAssignedConnectionsByParentOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AssignedConnection> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listAssignedConnectionsByParentSend(
        context,
        resourceGroupName,
        goldenGateDeploymentName,
        options,
      ),
    _listAssignedConnectionsByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _unassignConnectionSend(
  context: Client,
  resourceGroupName: string,
  goldenGateDeploymentName: string,
  body: AssignUnassignConnection,
  options: GoldenGateDeploymentsUnassignConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/goldenGateDeployments/{goldenGateDeploymentName}/unassignConnection{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      goldenGateDeploymentName: goldenGateDeploymentName,
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
    body: assignUnassignConnectionSerializer(body),
  });
}

export async function _unassignConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<AssignedConnection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return assignedConnectionDeserializer(result.body);
}

/** Unassign a GoldenGate connection from a deployment. */
export function unassignConnection(
  context: Client,
  resourceGroupName: string,
  goldenGateDeploymentName: string,
  body: AssignUnassignConnection,
  options: GoldenGateDeploymentsUnassignConnectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AssignedConnection>, AssignedConnection> {
  return getLongRunningPoller(context, _unassignConnectionDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _unassignConnectionSend(context, resourceGroupName, goldenGateDeploymentName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<AssignedConnection>, AssignedConnection>;
}

export function _assignConnectionSend(
  context: Client,
  resourceGroupName: string,
  goldenGateDeploymentName: string,
  body: AssignUnassignConnection,
  options: GoldenGateDeploymentsAssignConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/goldenGateDeployments/{goldenGateDeploymentName}/assignConnection{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      goldenGateDeploymentName: goldenGateDeploymentName,
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
    body: assignUnassignConnectionSerializer(body),
  });
}

export async function _assignConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<AssignedConnection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return assignedConnectionDeserializer(result.body);
}

/** Assign a GoldenGate connection to a deployment. */
export function assignConnection(
  context: Client,
  resourceGroupName: string,
  goldenGateDeploymentName: string,
  body: AssignUnassignConnection,
  options: GoldenGateDeploymentsAssignConnectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AssignedConnection>, AssignedConnection> {
  return getLongRunningPoller(context, _assignConnectionDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _assignConnectionSend(context, resourceGroupName, goldenGateDeploymentName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<AssignedConnection>, AssignedConnection>;
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: GoldenGateDeploymentsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/goldenGateDeployments{?api%2Dversion}",
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
): Promise<_GoldenGateDeploymentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _goldenGateDeploymentListResultDeserializer(result.body);
}

/** List GoldenGateDeployment resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: GoldenGateDeploymentsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GoldenGateDeployment> {
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
  goldenGateDeploymentName: string,
  options: GoldenGateDeploymentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/goldenGateDeployments/{goldenGateDeploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      goldenGateDeploymentName: goldenGateDeploymentName,
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

/** Delete a GoldenGateDeployment */
export function $delete(
  context: Client,
  resourceGroupName: string,
  goldenGateDeploymentName: string,
  options: GoldenGateDeploymentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, goldenGateDeploymentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  goldenGateDeploymentName: string,
  properties: GoldenGateDeploymentUpdate,
  options: GoldenGateDeploymentsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/goldenGateDeployments/{goldenGateDeploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      goldenGateDeploymentName: goldenGateDeploymentName,
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
    body: goldenGateDeploymentUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<GoldenGateDeployment> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return goldenGateDeploymentDeserializer(result.body);
}

/** Update a GoldenGateDeployment */
export function update(
  context: Client,
  resourceGroupName: string,
  goldenGateDeploymentName: string,
  properties: GoldenGateDeploymentUpdate,
  options: GoldenGateDeploymentsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GoldenGateDeployment>, GoldenGateDeployment> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, goldenGateDeploymentName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<GoldenGateDeployment>, GoldenGateDeployment>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  goldenGateDeploymentName: string,
  options: GoldenGateDeploymentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/goldenGateDeployments/{goldenGateDeploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      goldenGateDeploymentName: goldenGateDeploymentName,
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
): Promise<GoldenGateDeployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return goldenGateDeploymentDeserializer(result.body);
}

/** Get a GoldenGateDeployment */
export async function get(
  context: Client,
  resourceGroupName: string,
  goldenGateDeploymentName: string,
  options: GoldenGateDeploymentsGetOptionalParams = { requestOptions: {} },
): Promise<GoldenGateDeployment> {
  const result = await _getSend(context, resourceGroupName, goldenGateDeploymentName, options);
  return _getDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  goldenGateDeploymentName: string,
  resource: GoldenGateDeployment,
  options: GoldenGateDeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/goldenGateDeployments/{goldenGateDeploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      goldenGateDeploymentName: goldenGateDeploymentName,
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
    body: goldenGateDeploymentSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<GoldenGateDeployment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return goldenGateDeploymentDeserializer(result.body);
}

/** Create a GoldenGateDeployment */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  goldenGateDeploymentName: string,
  resource: GoldenGateDeployment,
  options: GoldenGateDeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GoldenGateDeployment>, GoldenGateDeployment> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, goldenGateDeploymentName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<GoldenGateDeployment>, GoldenGateDeployment>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: GoldenGateDeploymentsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/goldenGateDeployments{?api%2Dversion}",
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
): Promise<_GoldenGateDeploymentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _goldenGateDeploymentListResultDeserializer(result.body);
}

/** List GoldenGateDeployment resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: GoldenGateDeploymentsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GoldenGateDeployment> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}
