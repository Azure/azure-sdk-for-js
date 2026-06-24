// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  triggerUnionSerializer,
  triggerUnionDeserializer,
  TriggerUnion,
  _TriggerList,
  _triggerListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  TriggersListByDataBoxEdgeDeviceOptionalParams,
  TriggersDeleteOptionalParams,
  TriggersCreateOrUpdateOptionalParams,
  TriggersGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByDataBoxEdgeDeviceSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: TriggersListByDataBoxEdgeDeviceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/triggers{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByDataBoxEdgeDeviceDeserialize(
  result: PathUncheckedResponse,
): Promise<_TriggerList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _triggerListDeserializer(result.body);
}

/** Lists all the triggers configured in the device. */
export function listByDataBoxEdgeDevice(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: TriggersListByDataBoxEdgeDeviceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TriggerUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDataBoxEdgeDeviceSend(context, deviceName, resourceGroupName, options),
    _listByDataBoxEdgeDeviceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  deviceName: string,
  name: string,
  resourceGroupName: string,
  options: TriggersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/triggers/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the trigger on the gateway device. */
export function $delete(
  context: Client,
  deviceName: string,
  name: string,
  resourceGroupName: string,
  options: TriggersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, deviceName, name, resourceGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2023-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  deviceName: string,
  name: string,
  resourceGroupName: string,
  trigger: TriggerUnion,
  options: TriggersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/triggers/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: triggerUnionSerializer(trigger),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<TriggerUnion> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return triggerUnionDeserializer(result.body);
}

/** Creates or updates a trigger. */
export function createOrUpdate(
  context: Client,
  deviceName: string,
  name: string,
  resourceGroupName: string,
  trigger: TriggerUnion,
  options: TriggersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TriggerUnion>, TriggerUnion> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, deviceName, name, resourceGroupName, trigger, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2023-12-01",
  }) as PollerLike<OperationState<TriggerUnion>, TriggerUnion>;
}

export function _getSend(
  context: Client,
  deviceName: string,
  name: string,
  resourceGroupName: string,
  options: TriggersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/triggers/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TriggerUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return triggerUnionDeserializer(result.body);
}

/** Get a specific trigger by name. */
export async function get(
  context: Client,
  deviceName: string,
  name: string,
  resourceGroupName: string,
  options: TriggersGetOptionalParams = { requestOptions: {} },
): Promise<TriggerUnion> {
  const result = await _getSend(context, deviceName, name, resourceGroupName, options);
  return _getDeserialize(result);
}
