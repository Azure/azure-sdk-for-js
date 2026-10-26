// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlockContext as Client } from "../index.js";
import type {
  RecoverableVolumeGroup,
  _RecoverableVolumeGroupListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  recoverableVolumeGroupDeserializer,
  _recoverableVolumeGroupListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RecoverableVolumeGroupsDeleteOptionalParams,
  RecoverableVolumeGroupsListByStoragePoolOptionalParams,
  RecoverableVolumeGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  recoverableVolumeGroupName: string,
  options: RecoverableVolumeGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/recoverableVolumeGroups/{recoverableVolumeGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      recoverableVolumeGroupName: recoverableVolumeGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
/** Eradicate a recoverable volume group */
export function $delete(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  recoverableVolumeGroupName: string,
  options: RecoverableVolumeGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        storagePoolName,
        recoverableVolumeGroupName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByStoragePoolSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  options: RecoverableVolumeGroupsListByStoragePoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/recoverableVolumeGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _listByStoragePoolDeserialize(
  result: PathUncheckedResponse,
): Promise<_RecoverableVolumeGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _recoverableVolumeGroupListResultDeserializer(result.body);
}
/** List all recoverable volume groups in a storage pool */
export function listByStoragePool(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  options: RecoverableVolumeGroupsListByStoragePoolOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RecoverableVolumeGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByStoragePoolSend(context, resourceGroupName, storagePoolName, options),
    _listByStoragePoolDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  recoverableVolumeGroupName: string,
  options: RecoverableVolumeGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/recoverableVolumeGroups/{recoverableVolumeGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      recoverableVolumeGroupName: recoverableVolumeGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
): Promise<RecoverableVolumeGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return recoverableVolumeGroupDeserializer(result.body);
}
/** Get a recoverable volume group */
export async function get(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  recoverableVolumeGroupName: string,
  options: RecoverableVolumeGroupsGetOptionalParams = { requestOptions: {} },
): Promise<RecoverableVolumeGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    storagePoolName,
    recoverableVolumeGroupName,
    options,
  );
  return _getDeserialize(result);
}
