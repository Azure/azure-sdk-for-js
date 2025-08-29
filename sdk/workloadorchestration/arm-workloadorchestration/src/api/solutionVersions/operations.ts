// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SolutionVersion,
  solutionVersionSerializer,
  solutionVersionDeserializer,
  _SolutionVersionListResult,
  _solutionVersionListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SolutionVersionsListBySolutionOptionalParams,
  SolutionVersionsDeleteOptionalParams,
  SolutionVersionsUpdateOptionalParams,
  SolutionVersionsCreateOrUpdateOptionalParams,
  SolutionVersionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySolutionSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  options: SolutionVersionsListBySolutionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      solutionName: solutionName,
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

export async function _listBySolutionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SolutionVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _solutionVersionListResultDeserializer(result.body);
}

/** List Solution Version Resources */
export function listBySolution(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  options: SolutionVersionsListBySolutionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SolutionVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySolutionSend(context, resourceGroupName, targetName, solutionName, options),
    _listBySolutionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  solutionVersionName: string,
  options: SolutionVersionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/versions/{solutionVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      solutionName: solutionName,
      solutionVersionName: solutionVersionName,
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

/** Delete a Solution Version Resource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  solutionVersionName: string,
  options: SolutionVersionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        targetName,
        solutionName,
        solutionVersionName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  solutionVersionName: string,
  properties: SolutionVersion,
  options: SolutionVersionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/versions/{solutionVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      solutionName: solutionName,
      solutionVersionName: solutionVersionName,
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
    body: solutionVersionSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SolutionVersion> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return solutionVersionDeserializer(result.body);
}

/** Update a Solution Version Resource */
export function update(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  solutionVersionName: string,
  properties: SolutionVersion,
  options: SolutionVersionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SolutionVersion>, SolutionVersion> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        targetName,
        solutionName,
        solutionVersionName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<SolutionVersion>, SolutionVersion>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  solutionVersionName: string,
  resource: SolutionVersion,
  options: SolutionVersionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/versions/{solutionVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      solutionName: solutionName,
      solutionVersionName: solutionVersionName,
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
    body: solutionVersionSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SolutionVersion> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return solutionVersionDeserializer(result.body);
}

/** Create or update a Solution Version Resource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  solutionVersionName: string,
  resource: SolutionVersion,
  options: SolutionVersionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<SolutionVersion>, SolutionVersion> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        targetName,
        solutionName,
        solutionVersionName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<SolutionVersion>, SolutionVersion>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  solutionVersionName: string,
  options: SolutionVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/versions/{solutionVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      targetName: targetName,
      solutionName: solutionName,
      solutionVersionName: solutionVersionName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SolutionVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return solutionVersionDeserializer(result.body);
}

/** Get a Solution Version Resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  targetName: string,
  solutionName: string,
  solutionVersionName: string,
  options: SolutionVersionsGetOptionalParams = { requestOptions: {} },
): Promise<SolutionVersion> {
  const result = await _getSend(
    context,
    resourceGroupName,
    targetName,
    solutionName,
    solutionVersionName,
    options,
  );
  return _getDeserialize(result);
}
