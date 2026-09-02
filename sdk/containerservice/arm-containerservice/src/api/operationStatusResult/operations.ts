// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext as Client } from "../index.js";
import type { _OperationStatusResultList, OperationStatusResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _operationStatusResultListDeserializer,
  operationStatusResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  OperationStatusResultGetOptionalParams,
  OperationStatusResultListOptionalParams,
  OperationStatusResultGetByAgentPoolOptionalParams,
  OperationStatusResultListByAgentPoolOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  operationId: string,
  options: OperationStatusResultGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/operations/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2026-06-02-preview",
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
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Get the status of a specific operation in the specified managed cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  operationId: string,
  options: OperationStatusResultGetOptionalParams = { requestOptions: {} },
): Promise<OperationStatusResult> {
  const result = await _getSend(context, resourceGroupName, resourceName, operationId, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: OperationStatusResultListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/operations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-06-02-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_OperationStatusResultList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _operationStatusResultListDeserializer(result.body);
}

/** Gets a list of operations in the specified managedCluster */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: OperationStatusResultListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<OperationStatusResult> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-06-02-preview",
    },
  );
}

export function _getByAgentPoolSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  operationId: string,
  options: OperationStatusResultGetByAgentPoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/operations/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      agentPoolName: agentPoolName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2026-06-02-preview",
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

export async function _getByAgentPoolDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Get the status of a specific operation in the specified agent pool. */
export async function getByAgentPool(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  operationId: string,
  options: OperationStatusResultGetByAgentPoolOptionalParams = { requestOptions: {} },
): Promise<OperationStatusResult> {
  const result = await _getByAgentPoolSend(
    context,
    resourceGroupName,
    resourceName,
    agentPoolName,
    operationId,
    options,
  );
  return _getByAgentPoolDeserialize(result);
}

export function _listByAgentPoolSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  options: OperationStatusResultListByAgentPoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/operations{?api%2Dversion,activeOnly}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      agentPoolName: agentPoolName,
      "api%2Dversion": context.apiVersion ?? "2026-06-02-preview",
      activeOnly: options?.activeOnly,
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

export async function _listByAgentPoolDeserialize(
  result: PathUncheckedResponse,
): Promise<_OperationStatusResultList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _operationStatusResultListDeserializer(result.body);
}

/** Gets a list of operations in the specified agent pool. */
export function listByAgentPool(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  options: OperationStatusResultListByAgentPoolOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<OperationStatusResult> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAgentPoolSend(context, resourceGroupName, resourceName, agentPoolName, options),
    _listByAgentPoolDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-06-02-preview",
    },
  );
}
