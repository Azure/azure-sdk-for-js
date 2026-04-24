// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  IoTSecuritySolutionModel,
  UpdateIotSecuritySolutionData,
  _IoTSecuritySolutionsList,
} from "../../models/ioTSecurityAPI/models.js";
import {
  ioTSecuritySolutionModelSerializer,
  ioTSecuritySolutionModelDeserializer,
  updateIotSecuritySolutionDataSerializer,
  _ioTSecuritySolutionsListDeserializer,
} from "../../models/ioTSecurityAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  IotSecuritySolutionListBySubscriptionOptionalParams,
  IotSecuritySolutionListByResourceGroupOptionalParams,
  IotSecuritySolutionDeleteOptionalParams,
  IotSecuritySolutionUpdateOptionalParams,
  IotSecuritySolutionCreateOrUpdateOptionalParams,
  IotSecuritySolutionGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: IotSecuritySolutionListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/iotSecuritySolutions{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2019-08-01",
      "%24filter": options?.filter,
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
): Promise<_IoTSecuritySolutionsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _ioTSecuritySolutionsListDeserializer(result.body);
}

/** Use this method to get the list of IoT Security solutions by subscription. */
export function listBySubscription(
  context: Client,
  options: IotSecuritySolutionListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IoTSecuritySolutionModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2019-08-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: IotSecuritySolutionListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/iotSecuritySolutions{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2019-08-01",
      "%24filter": options?.filter,
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
): Promise<_IoTSecuritySolutionsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _ioTSecuritySolutionsListDeserializer(result.body);
}

/** Use this method to get the list IoT Security solutions organized by resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: IotSecuritySolutionListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IoTSecuritySolutionModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2019-08-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  options: IotSecuritySolutionDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/iotSecuritySolutions/{solutionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionName: solutionName,
      "api%2Dversion": "2019-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Use this method to delete yours IoT Security solution */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  options: IotSecuritySolutionDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, solutionName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  updateIotSecuritySolutionData: UpdateIotSecuritySolutionData,
  options: IotSecuritySolutionUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/iotSecuritySolutions/{solutionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionName: solutionName,
      "api%2Dversion": "2019-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateIotSecuritySolutionDataSerializer(updateIotSecuritySolutionData),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<IoTSecuritySolutionModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return ioTSecuritySolutionModelDeserializer(result.body);
}

/** Use this method to update existing IoT Security solution tags or user defined resources. To update other fields use the CreateOrUpdate method. */
export async function update(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  updateIotSecuritySolutionData: UpdateIotSecuritySolutionData,
  options: IotSecuritySolutionUpdateOptionalParams = { requestOptions: {} },
): Promise<IoTSecuritySolutionModel> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    solutionName,
    updateIotSecuritySolutionData,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  iotSecuritySolutionData: IoTSecuritySolutionModel,
  options: IotSecuritySolutionCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/iotSecuritySolutions/{solutionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionName: solutionName,
      "api%2Dversion": "2019-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: ioTSecuritySolutionModelSerializer(iotSecuritySolutionData),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<IoTSecuritySolutionModel> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return ioTSecuritySolutionModelDeserializer(result.body);
}

/** Use this method to create or update yours IoT Security solution */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  iotSecuritySolutionData: IoTSecuritySolutionModel,
  options: IotSecuritySolutionCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<IoTSecuritySolutionModel> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    solutionName,
    iotSecuritySolutionData,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  options: IotSecuritySolutionGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/iotSecuritySolutions/{solutionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionName: solutionName,
      "api%2Dversion": "2019-08-01",
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
): Promise<IoTSecuritySolutionModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return ioTSecuritySolutionModelDeserializer(result.body);
}

/** User this method to get details of a specific IoT Security solution based on solution name */
export async function get(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  options: IotSecuritySolutionGetOptionalParams = { requestOptions: {} },
): Promise<IoTSecuritySolutionModel> {
  const result = await _getSend(context, resourceGroupName, solutionName, options);
  return _getDeserialize(result);
}
