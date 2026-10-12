// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type { _VirtualNetworkApplianceCapabilityListResult } from "../../models/models.js";
import { _virtualNetworkApplianceCapabilityListResultDeserializer } from "../../models/models.js";
import type { VirtualNetworkApplianceCapabilityUnion } from "../../models/network/models.js";
import {
  virtualNetworkApplianceCapabilityUnionSerializer,
  virtualNetworkApplianceCapabilityUnionDeserializer,
} from "../../models/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualNetworkApplianceCapabilitiesListOptionalParams,
  VirtualNetworkApplianceCapabilitiesDeleteOptionalParams,
  VirtualNetworkApplianceCapabilitiesCreateOrUpdateOptionalParams,
  VirtualNetworkApplianceCapabilitiesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkApplianceName: string,
  options: VirtualNetworkApplianceCapabilitiesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkAppliances/{virtualNetworkApplianceName}/capabilities{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkApplianceName: virtualNetworkApplianceName,
      "api%2Dversion": "2026-03-01",
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
): Promise<_VirtualNetworkApplianceCapabilityListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _virtualNetworkApplianceCapabilityListResultDeserializer(result.body);
}

/** Gets all capabilities of a virtual network appliance. */
export function list(
  context: Client,
  resourceGroupName: string,
  virtualNetworkApplianceName: string,
  options: VirtualNetworkApplianceCapabilitiesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualNetworkApplianceCapabilityUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, virtualNetworkApplianceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-03-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkApplianceName: string,
  capabilityName: string,
  options: VirtualNetworkApplianceCapabilitiesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkAppliances/{virtualNetworkApplianceName}/capabilities/{capabilityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkApplianceName: virtualNetworkApplianceName,
      capabilityName: capabilityName,
      "api%2Dversion": "2026-03-01",
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
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the specified capability of a virtual network appliance. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  virtualNetworkApplianceName: string,
  capabilityName: string,
  options: VirtualNetworkApplianceCapabilitiesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        virtualNetworkApplianceName,
        capabilityName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2026-03-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkApplianceName: string,
  capabilityName: string,
  parameters: VirtualNetworkApplianceCapabilityUnion,
  options: VirtualNetworkApplianceCapabilitiesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkAppliances/{virtualNetworkApplianceName}/capabilities/{capabilityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkApplianceName: virtualNetworkApplianceName,
      capabilityName: capabilityName,
      "api%2Dversion": "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: virtualNetworkApplianceCapabilityUnionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkApplianceCapabilityUnion> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return virtualNetworkApplianceCapabilityUnionDeserializer(result.body);
}

/** Creates or updates a capability on a virtual network appliance. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  virtualNetworkApplianceName: string,
  capabilityName: string,
  parameters: VirtualNetworkApplianceCapabilityUnion,
  options: VirtualNetworkApplianceCapabilitiesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<VirtualNetworkApplianceCapabilityUnion>,
  VirtualNetworkApplianceCapabilityUnion
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        virtualNetworkApplianceName,
        capabilityName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2026-03-01",
  }) as PollerLike<
    OperationState<VirtualNetworkApplianceCapabilityUnion>,
    VirtualNetworkApplianceCapabilityUnion
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkApplianceName: string,
  capabilityName: string,
  options: VirtualNetworkApplianceCapabilitiesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkAppliances/{virtualNetworkApplianceName}/capabilities/{capabilityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkApplianceName: virtualNetworkApplianceName,
      capabilityName: capabilityName,
      "api%2Dversion": "2026-03-01",
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
): Promise<VirtualNetworkApplianceCapabilityUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return virtualNetworkApplianceCapabilityUnionDeserializer(result.body);
}

/** Gets the specified capability of a virtual network appliance. */
export async function get(
  context: Client,
  resourceGroupName: string,
  virtualNetworkApplianceName: string,
  capabilityName: string,
  options: VirtualNetworkApplianceCapabilitiesGetOptionalParams = { requestOptions: {} },
): Promise<VirtualNetworkApplianceCapabilityUnion> {
  const result = await _getSend(
    context,
    resourceGroupName,
    virtualNetworkApplianceName,
    capabilityName,
    options,
  );
  return _getDeserialize(result);
}
