// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type {
  VCenter,
  AddVCenterRequest,
  UpdateVCenterRequest,
  _VCenterCollection,
} from "../../models/models.js";
import {
  vCenterDeserializer,
  addVCenterRequestSerializer,
  updateVCenterRequestSerializer,
  _vCenterCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReplicationvCentersListOptionalParams,
  ReplicationvCentersListByReplicationFabricsOptionalParams,
  ReplicationvCentersDeleteOptionalParams,
  ReplicationvCentersUpdateOptionalParams,
  ReplicationvCentersCreateOptionalParams,
  ReplicationvCentersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationvCentersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationvCenters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_VCenterCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _vCenterCollectionDeserializer(result.body);
}

/** Lists the vCenter servers registered in the vault. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationvCentersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VCenter> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _listByReplicationFabricsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  options: ReplicationvCentersListByReplicationFabricsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationvCenters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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

export async function _listByReplicationFabricsDeserialize(
  result: PathUncheckedResponse,
): Promise<_VCenterCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _vCenterCollectionDeserializer(result.body);
}

/** Lists the vCenter servers registered in a fabric. */
export function listByReplicationFabrics(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  options: ReplicationvCentersListByReplicationFabricsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VCenter> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByReplicationFabricsSend(context, resourceGroupName, resourceName, fabricName, options),
    _listByReplicationFabricsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  vcenterName: string,
  options: ReplicationvCentersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationvCenters/{vcenterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      vcenterName: vcenterName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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
    throw createRestError(result);
  }

  return;
}

/** The operation to remove(unregister) a registered vCenter server from the vault. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  vcenterName: string,
  options: ReplicationvCentersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, resourceName, fabricName, vcenterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  vcenterName: string,
  updateVCenterRequest: UpdateVCenterRequest,
  options: ReplicationvCentersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationvCenters/{vcenterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      vcenterName: vcenterName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateVCenterRequestSerializer(updateVCenterRequest),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<VCenter> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return vCenterDeserializer(result.body);
}

/** The operation to update a registered vCenter. */
export function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  vcenterName: string,
  updateVCenterRequest: UpdateVCenterRequest,
  options: ReplicationvCentersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VCenter>, VCenter> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        vcenterName,
        updateVCenterRequest,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<VCenter>, VCenter>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  vcenterName: string,
  addVCenterRequest: AddVCenterRequest,
  options: ReplicationvCentersCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationvCenters/{vcenterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      vcenterName: vcenterName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: addVCenterRequestSerializer(addVCenterRequest),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<VCenter> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return vCenterDeserializer(result.body);
}

/** The operation to create a vCenter object.. */
export function create(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  vcenterName: string,
  addVCenterRequest: AddVCenterRequest,
  options: ReplicationvCentersCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VCenter>, VCenter> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        vcenterName,
        addVCenterRequest,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<VCenter>, VCenter>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  vcenterName: string,
  options: ReplicationvCentersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationvCenters/{vcenterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      vcenterName: vcenterName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VCenter> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return vCenterDeserializer(result.body);
}

/** Gets the details of a registered vCenter server(Add vCenter server). */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  vcenterName: string,
  options: ReplicationvCentersGetOptionalParams = { requestOptions: {} },
): Promise<VCenter> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    fabricName,
    vcenterName,
    options,
  );
  return _getDeserialize(result);
}
