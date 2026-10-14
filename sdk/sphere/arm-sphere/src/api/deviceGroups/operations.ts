// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSphereContext as Client } from "../index.js";
import type {
  CountDevicesResponse,
  _DeviceGroupListResult,
  DeviceGroup,
  DeviceGroupUpdate,
  ClaimDevicesRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  countDevicesResponseDeserializer,
  _deviceGroupListResultDeserializer,
  deviceGroupSerializer,
  deviceGroupDeserializer,
  deviceGroupUpdateSerializer,
  claimDevicesRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DeviceGroupsCountDevicesOptionalParams,
  DeviceGroupsClaimDevicesOptionalParams,
  DeviceGroupsListByProductOptionalParams,
  DeviceGroupsDeleteOptionalParams,
  DeviceGroupsUpdateOptionalParams,
  DeviceGroupsCreateOrUpdateOptionalParams,
  DeviceGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _countDevicesSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DeviceGroupsCountDevicesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/countDevices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      productName: productName,
      deviceGroupName: deviceGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
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

export async function _countDevicesDeserialize(
  result: PathUncheckedResponse,
): Promise<CountDevicesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return countDevicesResponseDeserializer(result.body);
}

/** Counts devices in device group. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export async function countDevices(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DeviceGroupsCountDevicesOptionalParams = { requestOptions: {} },
): Promise<CountDevicesResponse> {
  const result = await _countDevicesSend(
    context,
    resourceGroupName,
    catalogName,
    productName,
    deviceGroupName,
    options,
  );
  return _countDevicesDeserialize(result);
}

export function _claimDevicesSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  claimDevicesRequest: ClaimDevicesRequest,
  options: DeviceGroupsClaimDevicesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/claimDevices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      productName: productName,
      deviceGroupName: deviceGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: claimDevicesRequestSerializer(claimDevicesRequest),
  });
}

export async function _claimDevicesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Bulk claims the devices. Use '.unassigned' or '.default' for the device group and product names when bulk claiming devices to a catalog only. */
export function claimDevices(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  claimDevicesRequest: ClaimDevicesRequest,
  options: DeviceGroupsClaimDevicesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _claimDevicesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _claimDevicesSend(
        context,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        claimDevicesRequest,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByProductSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: DeviceGroupsListByProductOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups{?api%2Dversion,%24filter,%24top,%24skip,%24maxpagesize}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      productName: productName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
      "%24maxpagesize": options?.maxpagesize,
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

export async function _listByProductDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeviceGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _deviceGroupListResultDeserializer(result.body);
}

/** List DeviceGroup resources by Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. */
export function listByProduct(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  options: DeviceGroupsListByProductOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeviceGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByProductSend(context, resourceGroupName, catalogName, productName, options),
    _listByProductDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DeviceGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      productName: productName,
      deviceGroupName: deviceGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
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
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DeviceGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, catalogName, productName, deviceGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  properties: DeviceGroupUpdate,
  options: DeviceGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      productName: productName,
      deviceGroupName: deviceGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deviceGroupUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<DeviceGroup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deviceGroupDeserializer(result.body);
}

/** Update a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export function update(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  properties: DeviceGroupUpdate,
  options: DeviceGroupsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeviceGroup>, DeviceGroup> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<DeviceGroup>, DeviceGroup>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  resource: DeviceGroup,
  options: DeviceGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      productName: productName,
      deviceGroupName: deviceGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deviceGroupSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeviceGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deviceGroupDeserializer(result.body);
}

/** Create a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  resource: DeviceGroup,
  options: DeviceGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeviceGroup>, DeviceGroup> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<DeviceGroup>, DeviceGroup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DeviceGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      productName: productName,
      deviceGroupName: deviceGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DeviceGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deviceGroupDeserializer(result.body);
}

/** Get a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DeviceGroupsGetOptionalParams = { requestOptions: {} },
): Promise<DeviceGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    catalogName,
    productName,
    deviceGroupName,
    options,
  );
  return _getDeserialize(result);
}
