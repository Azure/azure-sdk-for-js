// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  VMScaleSetLifecycleHookEvent,
  VMScaleSetLifecycleHookEventUpdate,
  _VMScaleSetLifecycleHookEventListResult,
} from "../../models/compute/models.js";
import {
  vmScaleSetLifecycleHookEventDeserializer,
  vmScaleSetLifecycleHookEventUpdateSerializer,
  _vmScaleSetLifecycleHookEventListResultDeserializer,
} from "../../models/compute/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualMachineScaleSetLifeCycleHookEventsListOptionalParams,
  VirtualMachineScaleSetLifeCycleHookEventsUpdateOptionalParams,
  VirtualMachineScaleSetLifeCycleHookEventsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetLifeCycleHookEventsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/lifecycleHookEvents{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": "2025-11-01",
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
): Promise<_VMScaleSetLifecycleHookEventListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _vmScaleSetLifecycleHookEventListResultDeserializer(result.body);
}

/** Gets a list of virtual machine scale set lifecycle hook events created for a virtual machine scale set resource. */
export function list(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetLifeCycleHookEventsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VMScaleSetLifecycleHookEvent> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, vmScaleSetName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-11-01" },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  lifecycleHookEventName: string,
  properties: VMScaleSetLifecycleHookEventUpdate,
  options: VirtualMachineScaleSetLifeCycleHookEventsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/lifecycleHookEvents/{lifecycleHookEventName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      lifecycleHookEventName: lifecycleHookEventName,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: vmScaleSetLifecycleHookEventUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<VMScaleSetLifecycleHookEvent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vmScaleSetLifecycleHookEventDeserializer(result.body);
}

/** The operation to update a virtual machine scale set lifecycle hook event. */
export async function update(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  lifecycleHookEventName: string,
  properties: VMScaleSetLifecycleHookEventUpdate,
  options: VirtualMachineScaleSetLifeCycleHookEventsUpdateOptionalParams = { requestOptions: {} },
): Promise<VMScaleSetLifecycleHookEvent> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    vmScaleSetName,
    lifecycleHookEventName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  lifecycleHookEventName: string,
  options: VirtualMachineScaleSetLifeCycleHookEventsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/lifecycleHookEvents/{lifecycleHookEventName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      lifecycleHookEventName: lifecycleHookEventName,
      "api%2Dversion": "2025-11-01",
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
): Promise<VMScaleSetLifecycleHookEvent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vmScaleSetLifecycleHookEventDeserializer(result.body);
}

/** Gets a virtual machine scale set lifecycle hook event. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  lifecycleHookEventName: string,
  options: VirtualMachineScaleSetLifeCycleHookEventsGetOptionalParams = { requestOptions: {} },
): Promise<VMScaleSetLifecycleHookEvent> {
  const result = await _getSend(
    context,
    resourceGroupName,
    vmScaleSetName,
    lifecycleHookEventName,
    options,
  );
  return _getDeserialize(result);
}
