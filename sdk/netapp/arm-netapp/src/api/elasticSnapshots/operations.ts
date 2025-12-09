// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type { ElasticSnapshot, _ElasticSnapshotListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  elasticSnapshotSerializer,
  elasticSnapshotDeserializer,
  _elasticSnapshotListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ElasticSnapshotsListByElasticVolumeOptionalParams,
  ElasticSnapshotsDeleteOptionalParams,
  ElasticSnapshotsCreateOrUpdateOptionalParams,
  ElasticSnapshotsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByElasticVolumeSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: ElasticSnapshotsListByElasticVolumeOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}/elasticVolumes/{volumeName}/elasticSnapshots{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
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

export async function _listByElasticVolumeDeserialize(
  result: PathUncheckedResponse,
): Promise<_ElasticSnapshotListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _elasticSnapshotListResultDeserializer(result.body);
}

/** List ElasticSnapshot resources by ElasticVolume */
export function listByElasticVolume(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: ElasticSnapshotsListByElasticVolumeOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ElasticSnapshot> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByElasticVolumeSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        options,
      ),
    _listByElasticVolumeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  snapshotName: string,
  options: ElasticSnapshotsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}/elasticVolumes/{volumeName}/elasticSnapshots/{snapshotName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      snapshotName: snapshotName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a ElasticSnapshot */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  snapshotName: string,
  options: ElasticSnapshotsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        snapshotName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  snapshotName: string,
  body: ElasticSnapshot,
  options: ElasticSnapshotsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}/elasticVolumes/{volumeName}/elasticSnapshots/{snapshotName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      snapshotName: snapshotName,
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
    body: elasticSnapshotSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ElasticSnapshot> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return elasticSnapshotDeserializer(result.body);
}

/** Create a ElasticSnapshot */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  snapshotName: string,
  body: ElasticSnapshot,
  options: ElasticSnapshotsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ElasticSnapshot>, ElasticSnapshot> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        snapshotName,
        body,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ElasticSnapshot>, ElasticSnapshot>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  snapshotName: string,
  options: ElasticSnapshotsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}/elasticVolumes/{volumeName}/elasticSnapshots/{snapshotName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      snapshotName: snapshotName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ElasticSnapshot> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return elasticSnapshotDeserializer(result.body);
}

/** Get a ElasticSnapshot */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  snapshotName: string,
  options: ElasticSnapshotsGetOptionalParams = { requestOptions: {} },
): Promise<ElasticSnapshot> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    poolName,
    volumeName,
    snapshotName,
    options,
  );
  return _getDeserialize(result);
}
