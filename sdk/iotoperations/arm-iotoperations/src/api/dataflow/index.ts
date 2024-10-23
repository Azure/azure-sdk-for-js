// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  IoTOperationsContext as Client,
  DataflowCreateOrUpdateOptionalParams,
  DataflowDeleteOptionalParams,
  DataflowGetOptionalParams,
  DataflowListByResourceGroupOptionalParams,
} from "../index.js";
import {
  DataflowResource,
  dataflowResourceSerializer,
  dataflowResourceDeserializer,
  _DataflowResourceListResult,
  _dataflowResourceListResultDeserializer,
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

export function _dataflowGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  dataflowName: string,
  options: DataflowGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/dataflowProfiles/{dataflowProfileName}/dataflows/{dataflowName}",
      subscriptionId,
      resourceGroupName,
      instanceName,
      dataflowProfileName,
      dataflowName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _dataflowGetDeserialize(
  result: PathUncheckedResponse,
): Promise<DataflowResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return dataflowResourceDeserializer(result.body);
}

/** Get a DataflowResource */
export async function dataflowGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  dataflowName: string,
  options: DataflowGetOptionalParams = { requestOptions: {} },
): Promise<DataflowResource> {
  const result = await _dataflowGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    instanceName,
    dataflowProfileName,
    dataflowName,
    options,
  );
  return _dataflowGetDeserialize(result);
}

export function _dataflowCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  dataflowName: string,
  resource: DataflowResource,
  options: DataflowCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/dataflowProfiles/{dataflowProfileName}/dataflows/{dataflowName}",
      subscriptionId,
      resourceGroupName,
      instanceName,
      dataflowProfileName,
      dataflowName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: dataflowResourceSerializer(resource),
    });
}

export async function _dataflowCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DataflowResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return dataflowResourceDeserializer(result.body);
}

/** Create a DataflowResource */
export function dataflowCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  dataflowName: string,
  resource: DataflowResource,
  options: DataflowCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DataflowResource>, DataflowResource> {
  return getLongRunningPoller(
    context,
    _dataflowCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _dataflowCreateOrUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          instanceName,
          dataflowProfileName,
          dataflowName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<DataflowResource>, DataflowResource>;
}

export function _dataflowDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  dataflowName: string,
  options: DataflowDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/dataflowProfiles/{dataflowProfileName}/dataflows/{dataflowName}",
      subscriptionId,
      resourceGroupName,
      instanceName,
      dataflowProfileName,
      dataflowName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _dataflowDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a DataflowResource */
export function dataflowDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  dataflowName: string,
  options: DataflowDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _dataflowDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _dataflowDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          instanceName,
          dataflowProfileName,
          dataflowName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _dataflowListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  options: DataflowListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/dataflowProfiles/{dataflowProfileName}/dataflows",
      subscriptionId,
      resourceGroupName,
      instanceName,
      dataflowProfileName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _dataflowListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DataflowResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _dataflowResourceListResultDeserializer(result.body);
}

/** List DataflowResource resources by DataflowProfileResource */
export function dataflowListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  dataflowProfileName: string,
  options: DataflowListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DataflowResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _dataflowListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        dataflowProfileName,
        options,
      ),
    _dataflowListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
