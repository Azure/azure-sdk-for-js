// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  AutoScaleApiAutoscaleSettingResource,
  AutoScaleApiAutoscaleSettingResourcePatch,
  _AutoScaleApiAutoscaleSettingResourceCollection,
} from "../../models/autoScaleApi/models.js";
import {
  autoScaleApiAutoscaleSettingResourceSerializer,
  autoScaleApiAutoscaleSettingResourceDeserializer,
  autoScaleApiAutoscaleErrorResponseDeserializer,
  autoScaleApiAutoscaleSettingResourcePatchSerializer,
  _autoScaleApiAutoscaleSettingResourceCollectionDeserializer,
} from "../../models/autoScaleApi/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AutoscaleSettingsListBySubscriptionOptionalParams,
  AutoscaleSettingsListByResourceGroupOptionalParams,
  AutoscaleSettingsDeleteOptionalParams,
  AutoscaleSettingsUpdateOptionalParams,
  AutoscaleSettingsCreateOrUpdateOptionalParams,
  AutoscaleSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: AutoscaleSettingsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/autoscalesettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2022-10-01",
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
): Promise<_AutoScaleApiAutoscaleSettingResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = autoScaleApiAutoscaleErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _autoScaleApiAutoscaleSettingResourceCollectionDeserializer(result.body);
}

/** Lists the autoscale settings for a subscription */
export function listBySubscription(
  context: Client,
  options: AutoscaleSettingsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AutoScaleApiAutoscaleSettingResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-10-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AutoscaleSettingsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/autoscalesettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2022-10-01",
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
): Promise<_AutoScaleApiAutoscaleSettingResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = autoScaleApiAutoscaleErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _autoScaleApiAutoscaleSettingResourceCollectionDeserializer(result.body);
}

/** Lists the autoscale settings for a resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AutoscaleSettingsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AutoScaleApiAutoscaleSettingResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-10-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  autoscaleSettingName: string,
  options: AutoscaleSettingsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/autoscalesettings/{autoscaleSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      autoscaleSettingName: autoscaleSettingName,
      "api%2Dversion": "2022-10-01",
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
    if (result.body) {
      error.details = autoScaleApiAutoscaleErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes and autoscale setting */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  autoscaleSettingName: string,
  options: AutoscaleSettingsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, autoscaleSettingName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  autoscaleSettingName: string,
  autoscaleSettingResource: AutoScaleApiAutoscaleSettingResourcePatch,
  options: AutoscaleSettingsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/autoscalesettings/{autoscaleSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      autoscaleSettingName: autoscaleSettingName,
      "api%2Dversion": "2022-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: autoScaleApiAutoscaleSettingResourcePatchSerializer(autoscaleSettingResource),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AutoScaleApiAutoscaleSettingResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = autoScaleApiAutoscaleErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return autoScaleApiAutoscaleSettingResourceDeserializer(result.body);
}

/** Updates an existing AutoscaleSettingsResource. To update other fields use the CreateOrUpdate method. */
export async function update(
  context: Client,
  resourceGroupName: string,
  autoscaleSettingName: string,
  autoscaleSettingResource: AutoScaleApiAutoscaleSettingResourcePatch,
  options: AutoscaleSettingsUpdateOptionalParams = { requestOptions: {} },
): Promise<AutoScaleApiAutoscaleSettingResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    autoscaleSettingName,
    autoscaleSettingResource,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  autoscaleSettingName: string,
  parameters: AutoScaleApiAutoscaleSettingResource,
  options: AutoscaleSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/autoscalesettings/{autoscaleSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      autoscaleSettingName: autoscaleSettingName,
      "api%2Dversion": "2022-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: autoScaleApiAutoscaleSettingResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AutoScaleApiAutoscaleSettingResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = autoScaleApiAutoscaleErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return autoScaleApiAutoscaleSettingResourceDeserializer(result.body);
}

/** Creates or updates an autoscale setting. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  autoscaleSettingName: string,
  parameters: AutoScaleApiAutoscaleSettingResource,
  options: AutoscaleSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<AutoScaleApiAutoscaleSettingResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    autoscaleSettingName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  autoscaleSettingName: string,
  options: AutoscaleSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/autoscalesettings/{autoscaleSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      autoscaleSettingName: autoscaleSettingName,
      "api%2Dversion": "2022-10-01",
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
): Promise<AutoScaleApiAutoscaleSettingResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = autoScaleApiAutoscaleErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return autoScaleApiAutoscaleSettingResourceDeserializer(result.body);
}

/** Gets an autoscale setting */
export async function get(
  context: Client,
  resourceGroupName: string,
  autoscaleSettingName: string,
  options: AutoscaleSettingsGetOptionalParams = { requestOptions: {} },
): Promise<AutoScaleApiAutoscaleSettingResource> {
  const result = await _getSend(context, resourceGroupName, autoscaleSettingName, options);
  return _getDeserialize(result);
}
