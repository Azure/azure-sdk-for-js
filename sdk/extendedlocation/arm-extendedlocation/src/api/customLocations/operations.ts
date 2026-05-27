// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CustomLocationsManagementContext as Client } from "../index.js";
import {
  _CustomLocationOperationsList,
  _customLocationOperationsListDeserializer,
  CustomLocationOperation,
  errorResponseDeserializer,
  CustomLocation,
  customLocationSerializer,
  customLocationDeserializer,
  PatchableCustomLocations,
  patchableCustomLocationsSerializer,
  _CustomLocationListResult,
  _customLocationListResultDeserializer,
  _EnabledResourceTypesListResult,
  _enabledResourceTypesListResultDeserializer,
  EnabledResourceType,
  CustomLocationFindTargetResourceGroupProperties,
  customLocationFindTargetResourceGroupPropertiesSerializer,
  CustomLocationFindTargetResourceGroupResult,
  customLocationFindTargetResourceGroupResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  CustomLocationsFindTargetResourceGroupOptionalParams,
  CustomLocationsListEnabledResourceTypesOptionalParams,
  CustomLocationsListBySubscriptionOptionalParams,
  CustomLocationsListByResourceGroupOptionalParams,
  CustomLocationsDeleteOptionalParams,
  CustomLocationsUpdateOptionalParams,
  CustomLocationsCreateOrUpdateOptionalParams,
  CustomLocationsGetOptionalParams,
  CustomLocationsListOperationsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _findTargetResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: CustomLocationFindTargetResourceGroupProperties,
  options: CustomLocationsFindTargetResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ExtendedLocation/customLocations/{resourceName}/findTargetResourceGroup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2021-08-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: customLocationFindTargetResourceGroupPropertiesSerializer(parameters),
  });
}

export async function _findTargetResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<CustomLocationFindTargetResourceGroupResult> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return customLocationFindTargetResourceGroupResultDeserializer(result.body);
}

/** Returns the target resource group associated with the resource sync rules of the Custom Location that match the rules passed in with the Find Target Resource Group Request. */
export async function findTargetResourceGroup(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: CustomLocationFindTargetResourceGroupProperties,
  options: CustomLocationsFindTargetResourceGroupOptionalParams = { requestOptions: {} },
): Promise<CustomLocationFindTargetResourceGroupResult> {
  const result = await _findTargetResourceGroupSend(
    context,
    resourceGroupName,
    resourceName,
    parameters,
    options,
  );
  return _findTargetResourceGroupDeserialize(result);
}

export function _listEnabledResourceTypesSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: CustomLocationsListEnabledResourceTypesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ExtendedLocation/customLocations/{resourceName}/enabledResourceTypes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2021-08-31-preview",
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

export async function _listEnabledResourceTypesDeserialize(
  result: PathUncheckedResponse,
): Promise<_EnabledResourceTypesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _enabledResourceTypesListResultDeserializer(result.body);
}

/** Gets the list of the Enabled Resource Types. */
export function listEnabledResourceTypes(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: CustomLocationsListEnabledResourceTypesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EnabledResourceType> {
  return buildPagedAsyncIterator(
    context,
    () => _listEnabledResourceTypesSend(context, resourceGroupName, resourceName, options),
    _listEnabledResourceTypesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2021-08-31-preview",
    },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  options: CustomLocationsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ExtendedLocation/customLocations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2021-08-31-preview",
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
): Promise<_CustomLocationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _customLocationListResultDeserializer(result.body);
}

/** Gets a list of Custom Locations in the specified subscription. The operation returns properties of each Custom Location */
export function listBySubscription(
  context: Client,
  options: CustomLocationsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CustomLocation> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2021-08-31-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: CustomLocationsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ExtendedLocation/customLocations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2021-08-31-preview",
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
): Promise<_CustomLocationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _customLocationListResultDeserializer(result.body);
}

/** Gets a list of Custom Locations in the specified subscription and resource group. The operation returns properties of each Custom Location. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: CustomLocationsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CustomLocation> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2021-08-31-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: CustomLocationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ExtendedLocation/customLocations/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2021-08-31-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the Custom Location with the specified Resource Name, Resource Group, and Subscription Id. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: CustomLocationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, resourceName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2021-08-31-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: PatchableCustomLocations,
  options: CustomLocationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ExtendedLocation/customLocations/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2021-08-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: patchableCustomLocationsSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<CustomLocation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return customLocationDeserializer(result.body);
}

/** Updates a Custom Location with the specified Resource Name in the specified Resource Group and Subscription. */
export async function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: PatchableCustomLocations,
  options: CustomLocationsUpdateOptionalParams = { requestOptions: {} },
): Promise<CustomLocation> {
  const result = await _updateSend(context, resourceGroupName, resourceName, parameters, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: CustomLocation,
  options: CustomLocationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ExtendedLocation/customLocations/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2021-08-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: customLocationSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CustomLocation> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return customLocationDeserializer(result.body);
}

/** Creates or updates a Custom Location in the specified Subscription and Resource Group */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: CustomLocation,
  options: CustomLocationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CustomLocation>, CustomLocation> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, resourceName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2021-08-31-preview",
  }) as PollerLike<OperationState<CustomLocation>, CustomLocation>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: CustomLocationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ExtendedLocation/customLocations/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2021-08-31-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CustomLocation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return customLocationDeserializer(result.body);
}

/** Gets the details of the customLocation with a specified resource group and name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: CustomLocationsGetOptionalParams = { requestOptions: {} },
): Promise<CustomLocation> {
  const result = await _getSend(context, resourceGroupName, resourceName, options);
  return _getDeserialize(result);
}

export function _listOperationsSend(
  context: Client,
  options: CustomLocationsListOperationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.ExtendedLocation/operations{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2021-08-31-preview",
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

export async function _listOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_CustomLocationOperationsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _customLocationOperationsListDeserializer(result.body);
}

/** Lists all available Custom Locations operations. */
export function listOperations(
  context: Client,
  options: CustomLocationsListOperationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CustomLocationOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _listOperationsSend(context, options),
    _listOperationsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2021-08-31-preview",
    },
  );
}
