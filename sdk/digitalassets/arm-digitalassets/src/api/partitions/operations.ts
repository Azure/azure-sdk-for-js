// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DigitalAssetsContext as Client } from "../index.js";
import type { Partition, PartitionTagsUpdate, _PartitionListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  partitionSerializer,
  partitionDeserializer,
  partitionTagsUpdateSerializer,
  _partitionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PartitionsListByParentOptionalParams,
  PartitionsDeleteOptionalParams,
  PartitionsUpdateOptionalParams,
  PartitionsCreateOrUpdateOptionalParams,
  PartitionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  zkpRollupName: string,
  options: PartitionsListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalAssets/zkpRollups/{zkpRollupName}/partitions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      zkpRollupName: zkpRollupName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_PartitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _partitionListResultDeserializer(result.body);
}

/** List Partition resources by ZkpRollup */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  zkpRollupName: string,
  options: PartitionsListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Partition> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, zkpRollupName, options),
    _listByParentDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  zkpRollupName: string,
  partitionName: string,
  options: PartitionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalAssets/zkpRollups/{zkpRollupName}/partitions/{partitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      zkpRollupName: zkpRollupName,
      partitionName: partitionName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a Partition */
export function $delete(
  context: Client,
  resourceGroupName: string,
  zkpRollupName: string,
  partitionName: string,
  options: PartitionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, zkpRollupName, partitionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  zkpRollupName: string,
  partitionName: string,
  properties: PartitionTagsUpdate,
  options: PartitionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalAssets/zkpRollups/{zkpRollupName}/partitions/{partitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      zkpRollupName: zkpRollupName,
      partitionName: partitionName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: partitionTagsUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Partition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return partitionDeserializer(result.body);
}

/** Update a Partition */
export async function update(
  context: Client,
  resourceGroupName: string,
  zkpRollupName: string,
  partitionName: string,
  properties: PartitionTagsUpdate,
  options: PartitionsUpdateOptionalParams = { requestOptions: {} },
): Promise<Partition> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    zkpRollupName,
    partitionName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  zkpRollupName: string,
  partitionName: string,
  resource: Partition,
  options: PartitionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalAssets/zkpRollups/{zkpRollupName}/partitions/{partitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      zkpRollupName: zkpRollupName,
      partitionName: partitionName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: partitionSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Partition> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return partitionDeserializer(result.body);
}

/** Creates or replaces a partition. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  zkpRollupName: string,
  partitionName: string,
  resource: Partition,
  options: PartitionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Partition>, Partition> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        zkpRollupName,
        partitionName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<Partition>, Partition>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  zkpRollupName: string,
  partitionName: string,
  options: PartitionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalAssets/zkpRollups/{zkpRollupName}/partitions/{partitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      zkpRollupName: zkpRollupName,
      partitionName: partitionName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Partition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return partitionDeserializer(result.body);
}

/** Get a Partition */
export async function get(
  context: Client,
  resourceGroupName: string,
  zkpRollupName: string,
  partitionName: string,
  options: PartitionsGetOptionalParams = { requestOptions: {} },
): Promise<Partition> {
  const result = await _getSend(context, resourceGroupName, zkpRollupName, partitionName, options);
  return _getDeserialize(result);
}
