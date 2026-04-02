// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { ReachabilityAnalysisRun } from "../../models/microsoft/network/models.js";
import {
  commonErrorResponseDeserializer,
  reachabilityAnalysisRunSerializer,
  reachabilityAnalysisRunDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _ReachabilityAnalysisRunListResult } from "../../models/models.js";
import { _reachabilityAnalysisRunListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReachabilityAnalysisRunsListOptionalParams,
  ReachabilityAnalysisRunsDeleteOptionalParams,
  ReachabilityAnalysisRunsCreateOptionalParams,
  ReachabilityAnalysisRunsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  workspaceName: string,
  options: ReachabilityAnalysisRunsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/verifierWorkspaces/{workspaceName}/reachabilityAnalysisRuns{?api%2Dversion,skipToken,skip,top,sortKey,sortValue}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      workspaceName: workspaceName,
      "api%2Dversion": "2025-05-01",
      skipToken: options?.skipToken,
      skip: options?.skip,
      top: options?.top,
      sortKey: options?.sortKey,
      sortValue: options?.sortValue,
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
): Promise<_ReachabilityAnalysisRunListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return _reachabilityAnalysisRunListResultDeserializer(result.body);
}

/** Gets list of Reachability Analysis Runs. */
export function list(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  workspaceName: string,
  options: ReachabilityAnalysisRunsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReachabilityAnalysisRun> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, networkManagerName, workspaceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  workspaceName: string,
  reachabilityAnalysisRunName: string,
  options: ReachabilityAnalysisRunsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/verifierWorkspaces/{workspaceName}/reachabilityAnalysisRuns/{reachabilityAnalysisRunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      workspaceName: workspaceName,
      reachabilityAnalysisRunName: reachabilityAnalysisRunName,
      "api%2Dversion": "2025-05-01",
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
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes Reachability Analysis Run. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  workspaceName: string,
  reachabilityAnalysisRunName: string,
  options: ReachabilityAnalysisRunsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        networkManagerName,
        workspaceName,
        reachabilityAnalysisRunName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  workspaceName: string,
  reachabilityAnalysisRunName: string,
  body: ReachabilityAnalysisRun,
  options: ReachabilityAnalysisRunsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/verifierWorkspaces/{workspaceName}/reachabilityAnalysisRuns/{reachabilityAnalysisRunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      workspaceName: workspaceName,
      reachabilityAnalysisRunName: reachabilityAnalysisRunName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: reachabilityAnalysisRunSerializer(body),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ReachabilityAnalysisRun> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return reachabilityAnalysisRunDeserializer(result.body);
}

/** Creates Reachability Analysis Runs. */
export async function create(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  workspaceName: string,
  reachabilityAnalysisRunName: string,
  body: ReachabilityAnalysisRun,
  options: ReachabilityAnalysisRunsCreateOptionalParams = { requestOptions: {} },
): Promise<ReachabilityAnalysisRun> {
  const result = await _createSend(
    context,
    resourceGroupName,
    networkManagerName,
    workspaceName,
    reachabilityAnalysisRunName,
    body,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  workspaceName: string,
  reachabilityAnalysisRunName: string,
  options: ReachabilityAnalysisRunsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/verifierWorkspaces/{workspaceName}/reachabilityAnalysisRuns/{reachabilityAnalysisRunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      workspaceName: workspaceName,
      reachabilityAnalysisRunName: reachabilityAnalysisRunName,
      "api%2Dversion": "2025-05-01",
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
): Promise<ReachabilityAnalysisRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return reachabilityAnalysisRunDeserializer(result.body);
}

/** Gets Reachability Analysis Run. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  workspaceName: string,
  reachabilityAnalysisRunName: string,
  options: ReachabilityAnalysisRunsGetOptionalParams = { requestOptions: {} },
): Promise<ReachabilityAnalysisRun> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkManagerName,
    workspaceName,
    reachabilityAnalysisRunName,
    options,
  );
  return _getDeserialize(result);
}
