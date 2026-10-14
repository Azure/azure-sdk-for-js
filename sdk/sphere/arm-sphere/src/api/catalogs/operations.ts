// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSphereContext as Client } from "../index.js";
import type {
  Catalog,
  CatalogUpdate,
  _CatalogListResult,
  CountDevicesResponse,
  _DeploymentListResult,
  Deployment,
  Image,
  ListDeviceGroupsRequest,
  _DeviceGroupListResult,
  DeviceGroup,
  _PagedDeviceInsight,
  DeviceInsight,
  _DeviceListResult,
  Device,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  catalogSerializer,
  catalogDeserializer,
  catalogUpdateSerializer,
  _catalogListResultDeserializer,
  countDevicesResponseDeserializer,
  _deploymentListResultDeserializer,
  imageSerializer,
  listDeviceGroupsRequestSerializer,
  _deviceGroupListResultDeserializer,
  _pagedDeviceInsightDeserializer,
  _deviceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CatalogsUploadImageOptionalParams,
  CatalogsListDevicesOptionalParams,
  CatalogsListDeviceInsightsOptionalParams,
  CatalogsListDeviceGroupsOptionalParams,
  CatalogsListDeploymentsOptionalParams,
  CatalogsCountDevicesOptionalParams,
  CatalogsListBySubscriptionOptionalParams,
  CatalogsListByResourceGroupOptionalParams,
  CatalogsDeleteOptionalParams,
  CatalogsUpdateOptionalParams,
  CatalogsCreateOrUpdateOptionalParams,
  CatalogsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _uploadImageSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  uploadImageRequest: Image,
  options: CatalogsUploadImageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/uploadImage{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: imageSerializer(uploadImageRequest),
  });
}

export async function _uploadImageDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Creates an image. Use this action when the image ID is unknown. */
export function uploadImage(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  uploadImageRequest: Image,
  options: CatalogsUploadImageOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _uploadImageDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _uploadImageSend(context, resourceGroupName, catalogName, uploadImageRequest, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listDevicesSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsListDevicesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/listDevices{?api%2Dversion,%24filter,%24top,%24skip,%24maxpagesize}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDevicesDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeviceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _deviceListResultDeserializer(result.body);
}

/** Lists devices for catalog. */
export function listDevices(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsListDevicesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Device> {
  return buildPagedAsyncIterator(
    context,
    () => _listDevicesSend(context, resourceGroupName, catalogName, options),
    _listDevicesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _listDeviceInsightsSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsListDeviceInsightsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/listDeviceInsights{?api%2Dversion,%24filter,%24top,%24skip,%24maxpagesize}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeviceInsightsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDeviceInsight> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _pagedDeviceInsightDeserializer(result.body);
}

/** Lists device insights for catalog. */
export function listDeviceInsights(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsListDeviceInsightsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeviceInsight> {
  return buildPagedAsyncIterator(
    context,
    () => _listDeviceInsightsSend(context, resourceGroupName, catalogName, options),
    _listDeviceInsightsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _listDeviceGroupsSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  listDeviceGroupsRequest: ListDeviceGroupsRequest,
  options: CatalogsListDeviceGroupsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/listDeviceGroups{?api%2Dversion,%24filter,%24top,%24skip,%24maxpagesize}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: listDeviceGroupsRequestSerializer(listDeviceGroupsRequest),
  });
}

export async function _listDeviceGroupsDeserialize(
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

/** List the device groups for the catalog. */
export function listDeviceGroups(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  listDeviceGroupsRequest: ListDeviceGroupsRequest,
  options: CatalogsListDeviceGroupsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeviceGroup> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listDeviceGroupsSend(
        context,
        resourceGroupName,
        catalogName,
        listDeviceGroupsRequest,
        options,
      ),
    _listDeviceGroupsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _listDeploymentsSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsListDeploymentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/listDeployments{?api%2Dversion,%24filter,%24top,%24skip,%24maxpagesize}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeploymentsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _deploymentListResultDeserializer(result.body);
}

/** Lists deployments for catalog. */
export function listDeployments(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsListDeploymentsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Deployment> {
  return buildPagedAsyncIterator(
    context,
    () => _listDeploymentsSend(context, resourceGroupName, catalogName, options),
    _listDeploymentsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _countDevicesSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsCountDevicesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/countDevices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
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

/** Counts devices in catalog. */
export async function countDevices(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsCountDevicesOptionalParams = { requestOptions: {} },
): Promise<CountDevicesResponse> {
  const result = await _countDevicesSend(context, resourceGroupName, catalogName, options);
  return _countDevicesDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: CatalogsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureSphere/catalogs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_CatalogListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _catalogListResultDeserializer(result.body);
}

/** List Catalog resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: CatalogsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Catalog> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: CatalogsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_CatalogListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _catalogListResultDeserializer(result.body);
}

/** List Catalog resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: CatalogsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Catalog> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
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

/** Delete a Catalog */
export function $delete(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, catalogName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  properties: CatalogUpdate,
  options: CatalogsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
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
    body: catalogUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Catalog> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return catalogDeserializer(result.body);
}

/** Update a Catalog */
export async function update(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  properties: CatalogUpdate,
  options: CatalogsUpdateOptionalParams = { requestOptions: {} },
): Promise<Catalog> {
  const result = await _updateSend(context, resourceGroupName, catalogName, properties, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  resource: Catalog,
  options: CatalogsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
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
    body: catalogSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Catalog> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return catalogDeserializer(result.body);
}

/** Create a Catalog */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  resource: Catalog,
  options: CatalogsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Catalog>, Catalog> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, catalogName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<Catalog>, Catalog>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Catalog> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return catalogDeserializer(result.body);
}

/** Get a Catalog */
export async function get(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  options: CatalogsGetOptionalParams = { requestOptions: {} },
): Promise<Catalog> {
  const result = await _getSend(context, resourceGroupName, catalogName, options);
  return _getDeserialize(result);
}
