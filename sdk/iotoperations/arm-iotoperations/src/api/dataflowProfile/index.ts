// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  IoTOperationsContext as Client,
  DataflowProfileCreateOrUpdateOptionalParams,
  DataflowProfileDeleteOptionalParams,
  DataflowProfileGetOptionalParams,
  DataflowProfileListByResourceGroupOptionalParams,
} from "../index.js";
import {
  DataflowProfileResource,
  dataflowProfileResourceSerializer,
  dataflowProfileResourceDeserializer,
  _DataflowProfileResourceListResult,
  _dataflowProfileResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _dataflowProfileGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  options: DataflowProfileGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/dataflowProfiles/{dataflowProfileName}",
      subscriptionId,
      resourceGroupName,
      instanceName,
      dataflowProfileName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _dataflowProfileGetDeserialize(
  result: PathUncheckedResponse,
): Promise<DataflowProfileResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return dataflowProfileResourceDeserializer(result.body);
}

/** Get a DataflowProfileResource */
export async function dataflowProfileGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  options: DataflowProfileGetOptionalParams = { requestOptions: {} },
): Promise<DataflowProfileResource> {
  const result = await _dataflowProfileGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    instanceName,
    dataflowProfileName,
    options,
  );
  return _dataflowProfileGetDeserialize(result);
}

export function _dataflowProfileCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  resource: DataflowProfileResource,
  options: DataflowProfileCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/dataflowProfiles/{dataflowProfileName}",
      subscriptionId,
      resourceGroupName,
      instanceName,
      dataflowProfileName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: dataflowProfileResourceSerializer(resource),
    });
}

export async function _dataflowProfileCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DataflowProfileResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return dataflowProfileResourceDeserializer(result.body);
}

/** Create a DataflowProfileResource */
export function dataflowProfileCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  resource: DataflowProfileResource,
  options: DataflowProfileCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<DataflowProfileResource>,
  DataflowProfileResource
> {
  return getLongRunningPoller(
    context,
    _dataflowProfileCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _dataflowProfileCreateOrUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          instanceName,
          dataflowProfileName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<
    OperationState<DataflowProfileResource>,
    DataflowProfileResource
  >;
}

export function _dataflowProfileDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  options: DataflowProfileDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/dataflowProfiles/{dataflowProfileName}",
      subscriptionId,
      resourceGroupName,
      instanceName,
      dataflowProfileName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _dataflowProfileDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a DataflowProfileResource */
export function dataflowProfileDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  options: DataflowProfileDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _dataflowProfileDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _dataflowProfileDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          instanceName,
          dataflowProfileName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _dataflowProfileListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  options: DataflowProfileListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/dataflowProfiles",
      subscriptionId,
      resourceGroupName,
      instanceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _dataflowProfileListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DataflowProfileResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _dataflowProfileResourceListResultDeserializer(result.body);
}

/** List DataflowProfileResource resources by InstanceResource */
export function dataflowProfileListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  options: DataflowProfileListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DataflowProfileResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _dataflowProfileListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        options,
      ),
    _dataflowProfileListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
