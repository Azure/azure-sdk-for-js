// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext as Client } from "../index.js";
import type {
  InstanceFailoverGroup,
  _InstanceFailoverGroupListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  instanceFailoverGroupSerializer,
  instanceFailoverGroupDeserializer,
  _instanceFailoverGroupListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  InstanceFailoverGroupsForceFailoverAllowDataLossOptionalParams,
  InstanceFailoverGroupsFailoverOptionalParams,
  InstanceFailoverGroupsListByLocationOptionalParams,
  InstanceFailoverGroupsDeleteOptionalParams,
  InstanceFailoverGroupsCreateOrUpdateOptionalParams,
  InstanceFailoverGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _forceFailoverAllowDataLossSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  failoverGroupName: string,
  options: InstanceFailoverGroupsForceFailoverAllowDataLossOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/instanceFailoverGroups/{failoverGroupName}/forceFailoverAllowDataLoss{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
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
): Promise<InstanceFailoverGroup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return instanceFailoverGroupDeserializer(result.body);
}

/** Fails over from the current primary managed instance to this managed instance. This operation might result in data loss. */
export function forceFailoverAllowDataLoss(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  failoverGroupName: string,
  options: InstanceFailoverGroupsForceFailoverAllowDataLossOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<InstanceFailoverGroup>, InstanceFailoverGroup> {
  return getLongRunningPoller(
    context,
    _forceFailoverAllowDataLossDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _forceFailoverAllowDataLossSend(
          context,
          resourceGroupName,
          locationName,
          failoverGroupName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  ) as PollerLike<OperationState<InstanceFailoverGroup>, InstanceFailoverGroup>;
}

export function _failoverSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  failoverGroupName: string,
  options: InstanceFailoverGroupsFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/instanceFailoverGroups/{failoverGroupName}/failover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
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

export async function _failoverDeserialize(
  result: PathUncheckedResponse,
): Promise<InstanceFailoverGroup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return instanceFailoverGroupDeserializer(result.body);
}

/** Fails over from the current primary managed instance to this managed instance. */
export function failover(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  failoverGroupName: string,
  options: InstanceFailoverGroupsFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<InstanceFailoverGroup>, InstanceFailoverGroup> {
  return getLongRunningPoller(context, _failoverDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _failoverSend(context, resourceGroupName, locationName, failoverGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<InstanceFailoverGroup>, InstanceFailoverGroup>;
}

export function _listByLocationSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  options: InstanceFailoverGroupsListByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/instanceFailoverGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
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

export async function _listByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<_InstanceFailoverGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _instanceFailoverGroupListResultDeserializer(result.body);
}

/** Lists the failover groups in a location. */
export function listByLocation(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  options: InstanceFailoverGroupsListByLocationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<InstanceFailoverGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByLocationSend(context, resourceGroupName, locationName, options),
    _listByLocationDeserialize,
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
  locationName: string,
  failoverGroupName: string,
  options: InstanceFailoverGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/instanceFailoverGroups/{failoverGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
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
  locationName: string,
  failoverGroupName: string,
  options: InstanceFailoverGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, locationName, failoverGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  failoverGroupName: string,
  parameters: InstanceFailoverGroup,
  options: InstanceFailoverGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/instanceFailoverGroups/{failoverGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
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
    body: instanceFailoverGroupSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<InstanceFailoverGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return instanceFailoverGroupDeserializer(result.body);
}

/** Creates or updates a failover group. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  failoverGroupName: string,
  parameters: InstanceFailoverGroup,
  options: InstanceFailoverGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<InstanceFailoverGroup>, InstanceFailoverGroup> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        locationName,
        failoverGroupName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<InstanceFailoverGroup>, InstanceFailoverGroup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  failoverGroupName: string,
  options: InstanceFailoverGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/instanceFailoverGroups/{failoverGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<InstanceFailoverGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return instanceFailoverGroupDeserializer(result.body);
}

/** Gets a failover group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  failoverGroupName: string,
  options: InstanceFailoverGroupsGetOptionalParams = { requestOptions: {} },
): Promise<InstanceFailoverGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    locationName,
    failoverGroupName,
    options,
  );
  return _getDeserialize(result);
}
