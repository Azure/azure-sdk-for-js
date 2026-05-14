// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import {
  TagsObject,
  tagsObjectSerializer,
  VirtualNetworkAppliance,
  virtualNetworkApplianceSerializer,
  virtualNetworkApplianceDeserializer,
} from "../../models/microsoft/network/models.js";
import {
  _VirtualNetworkApplianceListResult,
  _virtualNetworkApplianceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  VirtualNetworkAppliancesListAllOptionalParams,
  VirtualNetworkAppliancesListOptionalParams,
  VirtualNetworkAppliancesDeleteOptionalParams,
  VirtualNetworkAppliancesUpdateTagsOptionalParams,
  VirtualNetworkAppliancesCreateOrUpdateOptionalParams,
  VirtualNetworkAppliancesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listAllSend(
  context: Client,
  options: VirtualNetworkAppliancesListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/virtualNetworkAppliances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-07-01",
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualNetworkApplianceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _virtualNetworkApplianceListResultDeserializer(result.body);
}

/** Gets all virtual network appliances in a subscription. */
export function listAll(
  context: Client,
  options: VirtualNetworkAppliancesListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualNetworkAppliance> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-07-01" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: VirtualNetworkAppliancesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkAppliances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2025-07-01",
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
): Promise<_VirtualNetworkApplianceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _virtualNetworkApplianceListResultDeserializer(result.body);
}

/** Gets all virtual network appliances in a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: VirtualNetworkAppliancesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualNetworkAppliance> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-07-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkApplianceName: string,
  options: VirtualNetworkAppliancesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkAppliances/{virtualNetworkApplianceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkApplianceName: virtualNetworkApplianceName,
      "api%2Dversion": "2025-07-01",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified virtual network appliance. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  virtualNetworkApplianceName: string,
  options: VirtualNetworkAppliancesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, virtualNetworkApplianceName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-07-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkApplianceName: string,
  parameters: TagsObject,
  options: VirtualNetworkAppliancesUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkAppliances/{virtualNetworkApplianceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkApplianceName: virtualNetworkApplianceName,
      "api%2Dversion": "2025-07-01",
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
): Promise<VirtualNetworkAppliance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkApplianceDeserializer(result.body);
}

/** Updates a virtual network appliance tags. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  virtualNetworkApplianceName: string,
  parameters: TagsObject,
  options: VirtualNetworkAppliancesUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<VirtualNetworkAppliance> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    virtualNetworkApplianceName,
    parameters,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkApplianceName: string,
  parameters: VirtualNetworkAppliance,
  options: VirtualNetworkAppliancesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkAppliances/{virtualNetworkApplianceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkApplianceName: virtualNetworkApplianceName,
      "api%2Dversion": "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: virtualNetworkApplianceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkAppliance> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkApplianceDeserializer(result.body);
}

/** Creates or updates a virtual network appliance. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  virtualNetworkApplianceName: string,
  parameters: VirtualNetworkAppliance,
  options: VirtualNetworkAppliancesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualNetworkAppliance>, VirtualNetworkAppliance> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        virtualNetworkApplianceName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-07-01",
  }) as PollerLike<OperationState<VirtualNetworkAppliance>, VirtualNetworkAppliance>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkApplianceName: string,
  options: VirtualNetworkAppliancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkAppliances/{virtualNetworkApplianceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkApplianceName: virtualNetworkApplianceName,
      "api%2Dversion": "2025-07-01",
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
): Promise<VirtualNetworkAppliance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkApplianceDeserializer(result.body);
}

/** Gets information about the specified virtual network appliance. */
export async function get(
  context: Client,
  resourceGroupName: string,
  virtualNetworkApplianceName: string,
  options: VirtualNetworkAppliancesGetOptionalParams = { requestOptions: {} },
): Promise<VirtualNetworkAppliance> {
  const result = await _getSend(context, resourceGroupName, virtualNetworkApplianceName, options);
  return _getDeserialize(result);
}
