// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  MonitoringMetricConfiguration,
  monitoringMetricConfigurationSerializer,
  monitoringMetricConfigurationDeserializer,
  _MonitoringMetricConfigurationList,
  _monitoringMetricConfigurationListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  MonitoringConfigListOptionalParams,
  MonitoringConfigDeleteOptionalParams,
  MonitoringConfigCreateOrUpdateOptionalParams,
  MonitoringConfigGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  deviceName: string,
  roleName: string,
  resourceGroupName: string,
  options: MonitoringConfigListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/roles/{roleName}/monitoringConfig{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      roleName: roleName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_MonitoringMetricConfigurationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _monitoringMetricConfigurationListDeserializer(result.body);
}

/** Lists metric configurations in a role. */
export function list(
  context: Client,
  deviceName: string,
  roleName: string,
  resourceGroupName: string,
  options: MonitoringConfigListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MonitoringMetricConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, deviceName, roleName, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  deviceName: string,
  roleName: string,
  resourceGroupName: string,
  options: MonitoringConfigDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/roles/{roleName}/monitoringConfig/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      roleName: roleName,
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

/** deletes a new metric configuration for a role. */
export function $delete(
  context: Client,
  deviceName: string,
  roleName: string,
  resourceGroupName: string,
  options: MonitoringConfigDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, deviceName, roleName, resourceGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2023-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  deviceName: string,
  roleName: string,
  resourceGroupName: string,
  monitoringMetricConfiguration: MonitoringMetricConfiguration,
  options: MonitoringConfigCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/roles/{roleName}/monitoringConfig/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      roleName: roleName,
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
      body: monitoringMetricConfigurationSerializer(monitoringMetricConfiguration),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MonitoringMetricConfiguration> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return monitoringMetricConfigurationDeserializer(result.body);
}

/** Creates a new metric configuration or updates an existing one for a role. */
export function createOrUpdate(
  context: Client,
  deviceName: string,
  roleName: string,
  resourceGroupName: string,
  monitoringMetricConfiguration: MonitoringMetricConfiguration,
  options: MonitoringConfigCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MonitoringMetricConfiguration>, MonitoringMetricConfiguration> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        deviceName,
        roleName,
        resourceGroupName,
        monitoringMetricConfiguration,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2023-12-01",
  }) as PollerLike<OperationState<MonitoringMetricConfiguration>, MonitoringMetricConfiguration>;
}

export function _getSend(
  context: Client,
  deviceName: string,
  roleName: string,
  resourceGroupName: string,
  options: MonitoringConfigGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/roles/{roleName}/monitoringConfig/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      roleName: roleName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<MonitoringMetricConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return monitoringMetricConfigurationDeserializer(result.body);
}

/** Gets a  metric configuration of a role. */
export async function get(
  context: Client,
  deviceName: string,
  roleName: string,
  resourceGroupName: string,
  options: MonitoringConfigGetOptionalParams = { requestOptions: {} },
): Promise<MonitoringMetricConfiguration> {
  const result = await _getSend(context, deviceName, roleName, resourceGroupName, options);
  return _getDeserialize(result);
}
