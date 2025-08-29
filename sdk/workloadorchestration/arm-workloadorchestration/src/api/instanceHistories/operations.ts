// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  InstanceHistory,
  instanceHistoryDeserializer,
  _InstanceHistoryListResult,
  _instanceHistoryListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  InstanceHistoriesListByInstanceOptionalParams,
  InstanceHistoriesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByInstanceSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  instanceName: string,
  options: InstanceHistoriesListByInstanceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/instances/{instanceName}/histories{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      solutionName: solutionName,
      instanceName: instanceName,
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

export async function _listByInstanceDeserialize(
  result: PathUncheckedResponse,
): Promise<_InstanceHistoryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _instanceHistoryListResultDeserializer(result.body);
}

/** List InstanceHistory Resources */
export function listByInstance(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  instanceName: string,
  options: InstanceHistoriesListByInstanceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<InstanceHistory> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByInstanceSend(
        context,
        resourceGroupName,
        targetName,
        solutionName,
        instanceName,
        options,
      ),
    _listByInstanceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  instanceName: string,
  instanceHistoryName: string,
  options: InstanceHistoriesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/instances/{instanceName}/histories/{instanceHistoryName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      solutionName: solutionName,
      instanceName: instanceName,
      instanceHistoryName: instanceHistoryName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<InstanceHistory> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return instanceHistoryDeserializer(result.body);
}

/** Get InstanceHistory Resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  instanceName: string,
  instanceHistoryName: string,
  options: InstanceHistoriesGetOptionalParams = { requestOptions: {} },
): Promise<InstanceHistory> {
  const result = await _getSend(
    context,
    resourceGroupName,
    targetName,
    solutionName,
    instanceName,
    instanceHistoryName,
    options,
  );
  return _getDeserialize(result);
}
