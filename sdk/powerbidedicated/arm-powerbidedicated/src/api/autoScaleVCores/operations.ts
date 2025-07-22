// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PowerBIDedicatedContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  AutoScaleVCore,
  autoScaleVCoreSerializer,
  autoScaleVCoreDeserializer,
  AutoScaleVCoreUpdateParameters,
  autoScaleVCoreUpdateParametersSerializer,
  _AutoScaleVCoreListResult,
  _autoScaleVCoreListResultDeserializer,
} from "../../models/models.js";
import {
  AutoScaleVCoresListBySubscriptionOptionalParams,
  AutoScaleVCoresListByResourceGroupOptionalParams,
  AutoScaleVCoresDeleteOptionalParams,
  AutoScaleVCoresUpdateOptionalParams,
  AutoScaleVCoresCreateOptionalParams,
  AutoScaleVCoresGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: AutoScaleVCoresListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PowerBIDedicated/autoScaleVCores{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_AutoScaleVCoreListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _autoScaleVCoreListResultDeserializer(result.body);
}

/** Lists all the auto scale v-cores for the given subscription. */
export function listBySubscription(
  context: Client,
  options: AutoScaleVCoresListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AutoScaleVCore> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AutoScaleVCoresListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/autoScaleVCores{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AutoScaleVCoreListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _autoScaleVCoreListResultDeserializer(result.body);
}

/** Gets all the auto scale v-cores for the given resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AutoScaleVCoresListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AutoScaleVCore> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  vcoreName: string,
  options: AutoScaleVCoresDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/autoScaleVCores/{vcoreName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vcoreName: vcoreName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes the specified auto scale v-core. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  vcoreName: string,
  options: AutoScaleVCoresDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, vcoreName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  vcoreName: string,
  vCoreUpdateParameters: AutoScaleVCoreUpdateParameters,
  options: AutoScaleVCoresUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/autoScaleVCores/{vcoreName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vcoreName: vcoreName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: autoScaleVCoreUpdateParametersSerializer(vCoreUpdateParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<AutoScaleVCore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return autoScaleVCoreDeserializer(result.body);
}

/** Updates the current state of the specified auto scale v-core. */
export async function update(
  context: Client,
  resourceGroupName: string,
  vcoreName: string,
  vCoreUpdateParameters: AutoScaleVCoreUpdateParameters,
  options: AutoScaleVCoresUpdateOptionalParams = { requestOptions: {} },
): Promise<AutoScaleVCore> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    vcoreName,
    vCoreUpdateParameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  vcoreName: string,
  vCoreParameters: AutoScaleVCore,
  options: AutoScaleVCoresCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/autoScaleVCores/{vcoreName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vcoreName: vcoreName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: autoScaleVCoreSerializer(vCoreParameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<AutoScaleVCore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return autoScaleVCoreDeserializer(result.body);
}

/** Provisions the specified auto scale v-core based on the configuration specified in the request. */
export async function create(
  context: Client,
  resourceGroupName: string,
  vcoreName: string,
  vCoreParameters: AutoScaleVCore,
  options: AutoScaleVCoresCreateOptionalParams = { requestOptions: {} },
): Promise<AutoScaleVCore> {
  const result = await _createSend(context, resourceGroupName, vcoreName, vCoreParameters, options);
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vcoreName: string,
  options: AutoScaleVCoresGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/autoScaleVCores/{vcoreName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vcoreName: vcoreName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AutoScaleVCore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return autoScaleVCoreDeserializer(result.body);
}

/** Gets details about the specified auto scale v-core. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vcoreName: string,
  options: AutoScaleVCoresGetOptionalParams = { requestOptions: {} },
): Promise<AutoScaleVCore> {
  const result = await _getSend(context, resourceGroupName, vcoreName, options);
  return _getDeserialize(result);
}
