// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext as Client } from "../index.js";
import type {
  FailoverGroup,
  FailoverGroupUpdate,
  _FailoverGroupListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  failoverGroupSerializer,
  failoverGroupDeserializer,
  failoverGroupUpdateSerializer,
  _failoverGroupListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FailoverGroupsTryPlannedBeforeForcedFailoverOptionalParams,
  FailoverGroupsForceFailoverAllowDataLossOptionalParams,
  FailoverGroupsFailoverOptionalParams,
  FailoverGroupsListByServerOptionalParams,
  FailoverGroupsDeleteOptionalParams,
  FailoverGroupsUpdateOptionalParams,
  FailoverGroupsCreateOrUpdateOptionalParams,
  FailoverGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _tryPlannedBeforeForcedFailoverSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  failoverGroupName: string,
  options: FailoverGroupsTryPlannedBeforeForcedFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}/tryPlannedBeforeForcedFailover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      failoverGroupName: failoverGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _tryPlannedBeforeForcedFailoverDeserialize(
  result: PathUncheckedResponse,
): Promise<FailoverGroup> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return failoverGroupDeserializer(result.body);
}

/** Fails over from the current primary server to this server. This operation tries planned before forced failover but might still result in data loss. */
export function tryPlannedBeforeForcedFailover(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  failoverGroupName: string,
  options: FailoverGroupsTryPlannedBeforeForcedFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FailoverGroup>, FailoverGroup> {
  return getLongRunningPoller(
    context,
    _tryPlannedBeforeForcedFailoverDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _tryPlannedBeforeForcedFailoverSend(
          context,
          resourceGroupName,
          serverName,
          failoverGroupName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  ) as PollerLike<OperationState<FailoverGroup>, FailoverGroup>;
}

export function _forceFailoverAllowDataLossSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  failoverGroupName: string,
  options: FailoverGroupsForceFailoverAllowDataLossOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}/forceFailoverAllowDataLoss{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      failoverGroupName: failoverGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _forceFailoverAllowDataLossDeserialize(
  result: PathUncheckedResponse,
): Promise<FailoverGroup> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return failoverGroupDeserializer(result.body);
}

/** Fails over from the current primary server to this server. This operation might result in data loss. */
export function forceFailoverAllowDataLoss(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  failoverGroupName: string,
  options: FailoverGroupsForceFailoverAllowDataLossOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FailoverGroup>, FailoverGroup> {
  return getLongRunningPoller(
    context,
    _forceFailoverAllowDataLossDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _forceFailoverAllowDataLossSend(
          context,
          resourceGroupName,
          serverName,
          failoverGroupName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  ) as PollerLike<OperationState<FailoverGroup>, FailoverGroup>;
}

export function _failoverSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  failoverGroupName: string,
  options: FailoverGroupsFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}/failover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      failoverGroupName: failoverGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _failoverDeserialize(result: PathUncheckedResponse): Promise<FailoverGroup> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return failoverGroupDeserializer(result.body);
}

/** Fails over from the current primary server to this server. */
export function failover(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  failoverGroupName: string,
  options: FailoverGroupsFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FailoverGroup>, FailoverGroup> {
  return getLongRunningPoller(context, _failoverDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _failoverSend(context, resourceGroupName, serverName, failoverGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<FailoverGroup>, FailoverGroup>;
}

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: FailoverGroupsListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByServerDeserialize(
  result: PathUncheckedResponse,
): Promise<_FailoverGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _failoverGroupListResultDeserializer(result.body);
}

/** Lists the failover groups in a server. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: FailoverGroupsListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FailoverGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServerSend(context, resourceGroupName, serverName, options),
    _listByServerDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  failoverGroupName: string,
  options: FailoverGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      failoverGroupName: failoverGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a failover group. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  failoverGroupName: string,
  options: FailoverGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, serverName, failoverGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  failoverGroupName: string,
  parameters: FailoverGroupUpdate,
  options: FailoverGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      failoverGroupName: failoverGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: failoverGroupUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<FailoverGroup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return failoverGroupDeserializer(result.body);
}

/** Updates a failover group. */
export function update(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  failoverGroupName: string,
  parameters: FailoverGroupUpdate,
  options: FailoverGroupsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FailoverGroup>, FailoverGroup> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, serverName, failoverGroupName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<FailoverGroup>, FailoverGroup>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  failoverGroupName: string,
  parameters: FailoverGroup,
  options: FailoverGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      failoverGroupName: failoverGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: failoverGroupSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FailoverGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return failoverGroupDeserializer(result.body);
}

/** Creates or updates a failover group. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  failoverGroupName: string,
  parameters: FailoverGroup,
  options: FailoverGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FailoverGroup>, FailoverGroup> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serverName,
        failoverGroupName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<FailoverGroup>, FailoverGroup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  failoverGroupName: string,
  options: FailoverGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      failoverGroupName: failoverGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<FailoverGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return failoverGroupDeserializer(result.body);
}

/** Gets a failover group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  failoverGroupName: string,
  options: FailoverGroupsGetOptionalParams = { requestOptions: {} },
): Promise<FailoverGroup> {
  const result = await _getSend(context, resourceGroupName, serverName, failoverGroupName, options);
  return _getDeserialize(result);
}
