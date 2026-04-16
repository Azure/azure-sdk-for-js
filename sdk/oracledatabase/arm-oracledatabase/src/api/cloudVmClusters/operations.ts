// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type {
  _CloudVmClusterListResult,
  CloudVmCluster,
  CloudVmClusterUpdate,
  AddRemoveDbNode,
  PrivateIpAddressesFilter,
  PrivateIpAddressProperties,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _cloudVmClusterListResultDeserializer,
  cloudVmClusterSerializer,
  cloudVmClusterDeserializer,
  cloudVmClusterUpdateSerializer,
  addRemoveDbNodeSerializer,
  privateIpAddressesFilterSerializer,
  privateIpAddressPropertiesArrayDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CloudVmClustersListPrivateIpAddressesOptionalParams,
  CloudVmClustersRemoveVmsOptionalParams,
  CloudVmClustersAddVmsOptionalParams,
  CloudVmClustersListByResourceGroupOptionalParams,
  CloudVmClustersDeleteOptionalParams,
  CloudVmClustersUpdateOptionalParams,
  CloudVmClustersGetOptionalParams,
  CloudVmClustersCreateOrUpdateOptionalParams,
  CloudVmClustersListBySubscriptionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listPrivateIpAddressesSend(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  body: PrivateIpAddressesFilter,
  options: CloudVmClustersListPrivateIpAddressesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}/listPrivateIpAddresses{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudvmclustername: cloudvmclustername,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: privateIpAddressesFilterSerializer(body),
  });
}

export async function _listPrivateIpAddressesDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateIpAddressProperties[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return privateIpAddressPropertiesArrayDeserializer(result.body);
}

/** List Private IP Addresses by the provided filter */
export async function listPrivateIpAddresses(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  body: PrivateIpAddressesFilter,
  options: CloudVmClustersListPrivateIpAddressesOptionalParams = {
    requestOptions: {},
  },
): Promise<PrivateIpAddressProperties[]> {
  const result = await _listPrivateIpAddressesSend(
    context,
    resourceGroupName,
    cloudvmclustername,
    body,
    options,
  );
  return _listPrivateIpAddressesDeserialize(result);
}

export function _removeVmsSend(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  body: AddRemoveDbNode,
  options: CloudVmClustersRemoveVmsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}/removeVms{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudvmclustername: cloudvmclustername,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: addRemoveDbNodeSerializer(body),
  });
}

export async function _removeVmsDeserialize(
  result: PathUncheckedResponse,
): Promise<CloudVmCluster> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return cloudVmClusterDeserializer(result.body);
}

/** Remove VMs from the VM Cluster */
export function removeVms(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  body: AddRemoveDbNode,
  options: CloudVmClustersRemoveVmsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CloudVmCluster>, CloudVmCluster> {
  return getLongRunningPoller(context, _removeVmsDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _removeVmsSend(context, resourceGroupName, cloudvmclustername, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<CloudVmCluster>, CloudVmCluster>;
}

export function _addVmsSend(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  body: AddRemoveDbNode,
  options: CloudVmClustersAddVmsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}/addVms{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudvmclustername: cloudvmclustername,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: addRemoveDbNodeSerializer(body),
  });
}

export async function _addVmsDeserialize(result: PathUncheckedResponse): Promise<CloudVmCluster> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return cloudVmClusterDeserializer(result.body);
}

/** Add VMs to the VM Cluster */
export function addVms(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  body: AddRemoveDbNode,
  options: CloudVmClustersAddVmsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CloudVmCluster>, CloudVmCluster> {
  return getLongRunningPoller(context, _addVmsDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _addVmsSend(context, resourceGroupName, cloudvmclustername, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<CloudVmCluster>, CloudVmCluster>;
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: CloudVmClustersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters{?api%2Dversion}",
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
): Promise<_CloudVmClusterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _cloudVmClusterListResultDeserializer(result.body);
}

/** List CloudVmCluster resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: CloudVmClustersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<CloudVmCluster> {
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
  cloudvmclustername: string,
  options: CloudVmClustersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudvmclustername: cloudvmclustername,
      "api%2Dversion": context.apiVersion,
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

/** Delete a CloudVmCluster */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  options: CloudVmClustersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, cloudvmclustername, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  properties: CloudVmClusterUpdate,
  options: CloudVmClustersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudvmclustername: cloudvmclustername,
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
    body: cloudVmClusterUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<CloudVmCluster> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return cloudVmClusterDeserializer(result.body);
}

/** Update a CloudVmCluster */
export function update(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  properties: CloudVmClusterUpdate,
  options: CloudVmClustersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CloudVmCluster>, CloudVmCluster> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, cloudvmclustername, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<CloudVmCluster>, CloudVmCluster>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  options: CloudVmClustersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudvmclustername: cloudvmclustername,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CloudVmCluster> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return cloudVmClusterDeserializer(result.body);
}

/** Get a CloudVmCluster */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  options: CloudVmClustersGetOptionalParams = { requestOptions: {} },
): Promise<CloudVmCluster> {
  const result = await _getSend(context, resourceGroupName, cloudvmclustername, options);
  return _getDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  resource: CloudVmCluster,
  options: CloudVmClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudvmclustername: cloudvmclustername,
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
    body: cloudVmClusterSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CloudVmCluster> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return cloudVmClusterDeserializer(result.body);
}

/** Create a CloudVmCluster */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  resource: CloudVmCluster,
  options: CloudVmClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CloudVmCluster>, CloudVmCluster> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, cloudvmclustername, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<CloudVmCluster>, CloudVmCluster>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: CloudVmClustersListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/cloudVmClusters{?api%2Dversion}",
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
): Promise<_CloudVmClusterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _cloudVmClusterListResultDeserializer(result.body);
}

/** List CloudVmCluster resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: CloudVmClustersListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<CloudVmCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
