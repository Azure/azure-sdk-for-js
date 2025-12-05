// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeDiskContext as Client } from "../index.js";
import type {
  GrantAccessData,
  AccessUri,
  OkResponse,
  DiskRestorePoint,
  _DiskRestorePointList,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  grantAccessDataSerializer,
  accessUriDeserializer,
  okResponseDeserializer,
  diskRestorePointDeserializer,
  _diskRestorePointListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DiskRestorePointsRevokeAccessOptionalParams,
  DiskRestorePointsGrantAccessOptionalParams,
  DiskRestorePointsListByRestorePointOptionalParams,
  DiskRestorePointsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _revokeAccessSend(
  context: Client,
  resourceGroupName: string,
  restorePointCollectionName: string,
  vmRestorePointName: string,
  diskRestorePointName: string,
  options: DiskRestorePointsRevokeAccessOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}/endGetAccess{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      restorePointCollectionName: restorePointCollectionName,
      vmRestorePointName: vmRestorePointName,
      diskRestorePointName: diskRestorePointName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _revokeAccessDeserialize(result: PathUncheckedResponse): Promise<OkResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return okResponseDeserializer(result.body);
}

/** Revokes access to a diskRestorePoint. */
export function revokeAccess(
  context: Client,
  resourceGroupName: string,
  restorePointCollectionName: string,
  vmRestorePointName: string,
  diskRestorePointName: string,
  options: DiskRestorePointsRevokeAccessOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _revokeAccessDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _revokeAccessSend(
        context,
        resourceGroupName,
        restorePointCollectionName,
        vmRestorePointName,
        diskRestorePointName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _grantAccessSend(
  context: Client,
  resourceGroupName: string,
  restorePointCollectionName: string,
  vmRestorePointName: string,
  diskRestorePointName: string,
  grantAccessData: GrantAccessData,
  options: DiskRestorePointsGrantAccessOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}/beginGetAccess{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      restorePointCollectionName: restorePointCollectionName,
      vmRestorePointName: vmRestorePointName,
      diskRestorePointName: diskRestorePointName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: grantAccessDataSerializer(grantAccessData),
  });
}

export async function _grantAccessDeserialize(result: PathUncheckedResponse): Promise<AccessUri> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return accessUriDeserializer(result.body);
}

/** Grants access to a diskRestorePoint. */
export function grantAccess(
  context: Client,
  resourceGroupName: string,
  restorePointCollectionName: string,
  vmRestorePointName: string,
  diskRestorePointName: string,
  grantAccessData: GrantAccessData,
  options: DiskRestorePointsGrantAccessOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AccessUri>, AccessUri> {
  return getLongRunningPoller(context, _grantAccessDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _grantAccessSend(
        context,
        resourceGroupName,
        restorePointCollectionName,
        vmRestorePointName,
        diskRestorePointName,
        grantAccessData,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<AccessUri>, AccessUri>;
}

export function _listByRestorePointSend(
  context: Client,
  resourceGroupName: string,
  restorePointCollectionName: string,
  vmRestorePointName: string,
  options: DiskRestorePointsListByRestorePointOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      restorePointCollectionName: restorePointCollectionName,
      vmRestorePointName: vmRestorePointName,
      "api%2Dversion": context.apiVersion,
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

export async function _listByRestorePointDeserialize(
  result: PathUncheckedResponse,
): Promise<_DiskRestorePointList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _diskRestorePointListDeserializer(result.body);
}

/** Lists diskRestorePoints under a vmRestorePoint. */
export function listByRestorePoint(
  context: Client,
  resourceGroupName: string,
  restorePointCollectionName: string,
  vmRestorePointName: string,
  options: DiskRestorePointsListByRestorePointOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DiskRestorePoint> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByRestorePointSend(
        context,
        resourceGroupName,
        restorePointCollectionName,
        vmRestorePointName,
        options,
      ),
    _listByRestorePointDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  restorePointCollectionName: string,
  vmRestorePointName: string,
  diskRestorePointName: string,
  options: DiskRestorePointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      restorePointCollectionName: restorePointCollectionName,
      vmRestorePointName: vmRestorePointName,
      diskRestorePointName: diskRestorePointName,
      "api%2Dversion": context.apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DiskRestorePoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return diskRestorePointDeserializer(result.body);
}

/** Get disk restorePoint resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  restorePointCollectionName: string,
  vmRestorePointName: string,
  diskRestorePointName: string,
  options: DiskRestorePointsGetOptionalParams = { requestOptions: {} },
): Promise<DiskRestorePoint> {
  const result = await _getSend(
    context,
    resourceGroupName,
    restorePointCollectionName,
    vmRestorePointName,
    diskRestorePointName,
    options,
  );
  return _getDeserialize(result);
}
