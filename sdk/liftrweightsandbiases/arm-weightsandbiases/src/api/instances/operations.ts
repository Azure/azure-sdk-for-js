// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WeightsAndBiasesContext as Client } from "../index.js";
import {
  InstanceResource,
  instanceResourceSerializer,
  instanceResourceDeserializer,
  errorResponseDeserializer,
  InstanceResourceUpdate,
  instanceResourceUpdateSerializer,
  _InstanceResourceListResult,
  _instanceResourceListResultDeserializer,
} from "../../models/models.js";
import {
  InstancesListBySubscriptionOptionalParams,
  InstancesListByResourceGroupOptionalParams,
  InstancesDeleteOptionalParams,
  InstancesUpdateOptionalParams,
  InstancesCreateOrUpdateOptionalParams,
  InstancesGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: InstancesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.WeightsAndBiases/instances{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_InstanceResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _instanceResourceListResultDeserializer(result.body);
}

/** List InstanceResource resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: InstancesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<InstanceResource> {
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
  options: InstancesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_InstanceResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _instanceResourceListResultDeserializer(result.body);
}

/** List InstanceResource resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: InstancesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<InstanceResource> {
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
  instancename: string,
  options: InstancesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances/{instancename}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instancename: instancename,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a InstanceResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  instancename: string,
  options: InstancesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _$deleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _$deleteSend(context, resourceGroupName, instancename, options),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  instancename: string,
  properties: InstanceResourceUpdate,
  options: InstancesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances/{instancename}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instancename: instancename,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: instanceResourceUpdateSerializer(properties),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<InstanceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return instanceResourceDeserializer(result.body);
}

/** Update a InstanceResource */
export async function update(
  context: Client,
  resourceGroupName: string,
  instancename: string,
  properties: InstanceResourceUpdate,
  options: InstancesUpdateOptionalParams = { requestOptions: {} },
): Promise<InstanceResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    instancename,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  instancename: string,
  resource: InstanceResource,
  options: InstancesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances/{instancename}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instancename: instancename,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: instanceResourceSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<InstanceResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return instanceResourceDeserializer(result.body);
}

/** Create a InstanceResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  instancename: string,
  resource: InstanceResource,
  options: InstancesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<InstanceResource>, InstanceResource> {
  return getLongRunningPoller(
    context,
    _createOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateSend(
          context,
          resourceGroupName,
          instancename,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<InstanceResource>, InstanceResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  instancename: string,
  options: InstancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances/{instancename}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instancename: instancename,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<InstanceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return instanceResourceDeserializer(result.body);
}

/** Get a InstanceResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  instancename: string,
  options: InstancesGetOptionalParams = { requestOptions: {} },
): Promise<InstanceResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    instancename,
    options,
  );
  return _getDeserialize(result);
}
