// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  TagsObject,
  NetworkVirtualAppliance,
  NetworkVirtualApplianceInstanceIds,
  NetworkVirtualApplianceBootDiagnosticParameters,
  NetworkVirtualApplianceInstanceId,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  tagsObjectSerializer,
  networkVirtualApplianceSerializer,
  networkVirtualApplianceDeserializer,
  networkVirtualApplianceInstanceIdsSerializer,
  networkVirtualApplianceInstanceIdsDeserializer,
  networkVirtualApplianceBootDiagnosticParametersSerializer,
  networkVirtualApplianceInstanceIdDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _NetworkVirtualApplianceListResult } from "../../models/models.js";
import { _networkVirtualApplianceListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkVirtualAppliancesGetBootDiagnosticLogsOptionalParams,
  NetworkVirtualAppliancesReimageOptionalParams,
  NetworkVirtualAppliancesRestartOptionalParams,
  NetworkVirtualAppliancesListOptionalParams,
  NetworkVirtualAppliancesListByResourceGroupOptionalParams,
  NetworkVirtualAppliancesDeleteOptionalParams,
  NetworkVirtualAppliancesUpdateTagsOptionalParams,
  NetworkVirtualAppliancesCreateOrUpdateOptionalParams,
  NetworkVirtualAppliancesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getBootDiagnosticLogsSend(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  request: NetworkVirtualApplianceBootDiagnosticParameters,
  options: NetworkVirtualAppliancesGetBootDiagnosticLogsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/getBootDiagnosticLogs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkVirtualApplianceName: networkVirtualApplianceName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: networkVirtualApplianceBootDiagnosticParametersSerializer(request),
  });
}

export async function _getBootDiagnosticLogsDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkVirtualApplianceInstanceId> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkVirtualApplianceInstanceIdDeserializer(result.body);
}

/** Retrieves the boot diagnostic logs for a VM instance belonging to the specified Network Virtual Appliance. */
export function getBootDiagnosticLogs(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  request: NetworkVirtualApplianceBootDiagnosticParameters,
  options: NetworkVirtualAppliancesGetBootDiagnosticLogsOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkVirtualApplianceInstanceId>,
  NetworkVirtualApplianceInstanceId
> {
  return getLongRunningPoller(context, _getBootDiagnosticLogsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getBootDiagnosticLogsSend(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        request,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<NetworkVirtualApplianceInstanceId>,
    NetworkVirtualApplianceInstanceId
  >;
}

export function _reimageSend(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  options: NetworkVirtualAppliancesReimageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/reimage{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkVirtualApplianceName: networkVirtualApplianceName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["networkVirtualApplianceInstanceIds"]
      ? options["networkVirtualApplianceInstanceIds"]
      : networkVirtualApplianceInstanceIdsSerializer(options["networkVirtualApplianceInstanceIds"]),
  });
}

export async function _reimageDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkVirtualApplianceInstanceIds> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkVirtualApplianceInstanceIdsDeserializer(result.body);
}

/** Reimages one VM belonging to the specified Network Virtual Appliance. */
export function reimage(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  options: NetworkVirtualAppliancesReimageOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkVirtualApplianceInstanceIds>,
  NetworkVirtualApplianceInstanceIds
> {
  return getLongRunningPoller(context, _reimageDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reimageSend(context, resourceGroupName, networkVirtualApplianceName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<NetworkVirtualApplianceInstanceIds>,
    NetworkVirtualApplianceInstanceIds
  >;
}

export function _restartSend(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  options: NetworkVirtualAppliancesRestartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/restart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkVirtualApplianceName: networkVirtualApplianceName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["networkVirtualApplianceInstanceIds"]
      ? options["networkVirtualApplianceInstanceIds"]
      : networkVirtualApplianceInstanceIdsSerializer(options["networkVirtualApplianceInstanceIds"]),
  });
}

export async function _restartDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkVirtualApplianceInstanceIds> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkVirtualApplianceInstanceIdsDeserializer(result.body);
}

/** Restarts one or more VMs belonging to the specified Network Virtual Appliance. */
export function restart(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  options: NetworkVirtualAppliancesRestartOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkVirtualApplianceInstanceIds>,
  NetworkVirtualApplianceInstanceIds
> {
  return getLongRunningPoller(context, _restartDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restartSend(context, resourceGroupName, networkVirtualApplianceName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<NetworkVirtualApplianceInstanceIds>,
    NetworkVirtualApplianceInstanceIds
  >;
}

export function _listSend(
  context: Client,
  options: NetworkVirtualAppliancesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/networkVirtualAppliances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkVirtualApplianceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _networkVirtualApplianceListResultDeserializer(result.body);
}

/** Gets all Network Virtual Appliances in a subscription. */
export function list(
  context: Client,
  options: NetworkVirtualAppliancesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkVirtualAppliance> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: NetworkVirtualAppliancesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkVirtualApplianceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _networkVirtualApplianceListResultDeserializer(result.body);
}

/** Lists all Network Virtual Appliances in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: NetworkVirtualAppliancesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkVirtualAppliance> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  options: NetworkVirtualAppliancesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkVirtualApplianceName: networkVirtualApplianceName,
      "api%2Dversion": "2025-05-01",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified Network Virtual Appliance. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  options: NetworkVirtualAppliancesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, networkVirtualApplianceName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  parameters: TagsObject,
  options: NetworkVirtualAppliancesUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkVirtualApplianceName: networkVirtualApplianceName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsObjectSerializer(parameters),
  });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkVirtualAppliance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkVirtualApplianceDeserializer(result.body);
}

/** Updates a Network Virtual Appliance. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  parameters: TagsObject,
  options: NetworkVirtualAppliancesUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<NetworkVirtualAppliance> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    networkVirtualApplianceName,
    parameters,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  parameters: NetworkVirtualAppliance,
  options: NetworkVirtualAppliancesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkVirtualApplianceName: networkVirtualApplianceName,
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
    body: networkVirtualApplianceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkVirtualAppliance> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkVirtualApplianceDeserializer(result.body);
}

/** Creates or updates the specified Network Virtual Appliance. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  parameters: NetworkVirtualAppliance,
  options: NetworkVirtualAppliancesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkVirtualAppliance>, NetworkVirtualAppliance> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<NetworkVirtualAppliance>, NetworkVirtualAppliance>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  options: NetworkVirtualAppliancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkVirtualApplianceName: networkVirtualApplianceName,
      "api%2Dversion": "2025-05-01",
      "%24expand": options?.expand,
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
): Promise<NetworkVirtualAppliance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkVirtualApplianceDeserializer(result.body);
}

/** Gets the specified Network Virtual Appliance. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  options: NetworkVirtualAppliancesGetOptionalParams = { requestOptions: {} },
): Promise<NetworkVirtualAppliance> {
  const result = await _getSend(context, resourceGroupName, networkVirtualApplianceName, options);
  return _getDeserialize(result);
}
