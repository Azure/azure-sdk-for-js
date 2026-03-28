// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HDInsightManagementContext as Client } from "../index.js";
import type {
  AsyncOperationResult,
  VirtualMachinesListHostsResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  asyncOperationResultDeserializer,
  hostInfoDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualMachinesGetAsyncOperationStatusOptionalParams,
  VirtualMachinesRestartHostsOptionalParams,
  VirtualMachinesListHostsOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getAsyncOperationStatusSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  operationId: string,
  options: VirtualMachinesGetAsyncOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/restartHosts/azureasyncoperations/{operationId}{?api%2Dversion}",
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

export async function _getAsyncOperationStatusDeserialize(
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

/** Gets the async operation status. */
export async function getAsyncOperationStatus(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  operationId: string,
  options: VirtualMachinesGetAsyncOperationStatusOptionalParams = { requestOptions: {} },
): Promise<AsyncOperationResult> {
  const result = await _getAsyncOperationStatusSend(
    context,
    resourceGroupName,
    clusterName,
    operationId,
    options,
  );
  return _getAsyncOperationStatusDeserialize(result);
}

export function _restartHostsSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  hosts: string[],
  options: VirtualMachinesRestartHostsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/restartHosts{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: hosts.map((p: any) => {
      return p;
    }),
  });
}

export async function _restartHostsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Restarts the specified HDInsight cluster hosts. */
export function restartHosts(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  hosts: string[],
  options: VirtualMachinesRestartHostsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restartHostsDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restartHostsSend(context, resourceGroupName, clusterName, hosts, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listHostsSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: VirtualMachinesListHostsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/listHosts{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listHostsDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachinesListHostsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return {
    body: result.body.map((p: any) => {
      return hostInfoDeserializer(p);
    }),
  };
}

/** Lists the HDInsight clusters hosts */
export async function listHosts(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: VirtualMachinesListHostsOptionalParams = { requestOptions: {} },
): Promise<VirtualMachinesListHostsResponse> {
  const result = await _listHostsSend(context, resourceGroupName, clusterName, options);
  return _listHostsDeserialize(result);
}
