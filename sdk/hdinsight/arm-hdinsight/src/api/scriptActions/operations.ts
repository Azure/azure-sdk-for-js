// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HDInsightManagementContext as Client } from "../index.js";
import type {
  AsyncOperationResult,
  _ScriptActionsList,
  RuntimeScriptActionDetail,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  asyncOperationResultDeserializer,
  _scriptActionsListDeserializer,
  runtimeScriptActionDetailDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ScriptActionsGetExecutionDetailOptionalParams,
  ScriptActionsGetExecutionAsyncOperationStatusOptionalParams,
  ScriptActionsListByClusterOptionalParams,
  ScriptActionsDeleteOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getExecutionDetailSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  scriptExecutionId: string,
  options: ScriptActionsGetExecutionDetailOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/scriptExecutionHistory/{scriptExecutionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      scriptExecutionId: scriptExecutionId,
      "api%2Dversion": context.apiVersion ?? "2025-01-15-preview",
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

export async function _getExecutionDetailDeserialize(
  result: PathUncheckedResponse,
): Promise<RuntimeScriptActionDetail> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return runtimeScriptActionDetailDeserializer(result.body);
}

/** Gets the script execution detail for the given script execution ID. */
export async function getExecutionDetail(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  scriptExecutionId: string,
  options: ScriptActionsGetExecutionDetailOptionalParams = { requestOptions: {} },
): Promise<RuntimeScriptActionDetail> {
  const result = await _getExecutionDetailSend(
    context,
    resourceGroupName,
    clusterName,
    scriptExecutionId,
    options,
  );
  return _getExecutionDetailDeserialize(result);
}

export function _getExecutionAsyncOperationStatusSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  operationId: string,
  options: ScriptActionsGetExecutionAsyncOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/executeScriptActions/azureasyncoperations/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-01-15-preview",
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

export async function _getExecutionAsyncOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<AsyncOperationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return asyncOperationResultDeserializer(result.body);
}

/** Gets the async operation status of execution operation. */
export async function getExecutionAsyncOperationStatus(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  operationId: string,
  options: ScriptActionsGetExecutionAsyncOperationStatusOptionalParams = { requestOptions: {} },
): Promise<AsyncOperationResult> {
  const result = await _getExecutionAsyncOperationStatusSend(
    context,
    resourceGroupName,
    clusterName,
    operationId,
    options,
  );
  return _getExecutionAsyncOperationStatusDeserialize(result);
}

export function _listByClusterSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ScriptActionsListByClusterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/scriptActions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-01-15-preview",
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

export async function _listByClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_ScriptActionsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _scriptActionsListDeserializer(result.body);
}

/** Lists all the persisted script actions for the specified cluster. */
export function listByCluster(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ScriptActionsListByClusterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RuntimeScriptActionDetail> {
  return buildPagedAsyncIterator(
    context,
    () => _listByClusterSend(context, resourceGroupName, clusterName, options),
    _listByClusterDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-01-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  scriptName: string,
  options: ScriptActionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/scriptActions/{scriptName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      scriptName: scriptName,
      "api%2Dversion": context.apiVersion ?? "2025-01-15-preview",
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

/** Deletes a specified persisted script action of the cluster. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  scriptName: string,
  options: ScriptActionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, clusterName, scriptName, options);
  return _$deleteDeserialize(result);
}
