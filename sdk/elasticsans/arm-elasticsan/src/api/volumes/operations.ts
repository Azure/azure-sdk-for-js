// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ElasticSanManagementContext as Client } from "../index.js";
import type {
  Volume,
  VolumeUpdate,
  _VolumeList,
  VolumeNameList,
  PreValidationResponse,
  DiskSnapshotList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  volumeSerializer,
  volumeDeserializer,
  volumeUpdateSerializer,
  _volumeListDeserializer,
  volumeNameListSerializer,
  preValidationResponseDeserializer,
  diskSnapshotListSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VolumesPreRestoreOptionalParams,
  VolumesPreBackupOptionalParams,
  VolumesListByVolumeGroupOptionalParams,
  VolumesDeleteOptionalParams,
  VolumesUpdateOptionalParams,
  VolumesCreateOptionalParams,
  VolumesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _preRestoreSend(
  context: Client,
  resourceGroupName: string,
  elasticSanName: string,
  volumeGroupName: string,
  parameters: DiskSnapshotList,
  options: VolumesPreRestoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ElasticSan/elasticSans/{elasticSanName}/volumegroups/{volumeGroupName}/preRestore{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      elasticSanName: elasticSanName,
      volumeGroupName: volumeGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: diskSnapshotListSerializer(parameters),
  });
}

export async function _preRestoreDeserialize(
  result: PathUncheckedResponse,
): Promise<PreValidationResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return preValidationResponseDeserializer(result.body);
}

/** Validate whether a list of backed up disk snapshots can be restored into ElasticSan volumes. */
export function preRestore(
  context: Client,
  resourceGroupName: string,
  elasticSanName: string,
  volumeGroupName: string,
  parameters: DiskSnapshotList,
  options: VolumesPreRestoreOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PreValidationResponse>, PreValidationResponse> {
  return getLongRunningPoller(context, _preRestoreDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _preRestoreSend(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01",
  }) as PollerLike<OperationState<PreValidationResponse>, PreValidationResponse>;
}

export function _preBackupSend(
  context: Client,
  resourceGroupName: string,
  elasticSanName: string,
  volumeGroupName: string,
  parameters: VolumeNameList,
  options: VolumesPreBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ElasticSan/elasticSans/{elasticSanName}/volumegroups/{volumeGroupName}/preBackup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      elasticSanName: elasticSanName,
      volumeGroupName: volumeGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: volumeNameListSerializer(parameters),
  });
}

export async function _preBackupDeserialize(
  result: PathUncheckedResponse,
): Promise<PreValidationResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return preValidationResponseDeserializer(result.body);
}

/** Validate whether a disk snapshot backup can be taken for list of volumes. */
export function preBackup(
  context: Client,
  resourceGroupName: string,
  elasticSanName: string,
  volumeGroupName: string,
  parameters: VolumeNameList,
  options: VolumesPreBackupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PreValidationResponse>, PreValidationResponse> {
  return getLongRunningPoller(context, _preBackupDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _preBackupSend(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01",
  }) as PollerLike<OperationState<PreValidationResponse>, PreValidationResponse>;
}

export function _listByVolumeGroupSend(
  context: Client,
  resourceGroupName: string,
  elasticSanName: string,
  volumeGroupName: string,
  options: VolumesListByVolumeGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ElasticSan/elasticSans/{elasticSanName}/volumegroups/{volumeGroupName}/volumes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      elasticSanName: elasticSanName,
      volumeGroupName: volumeGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01",
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

export async function _listByVolumeGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_VolumeList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _volumeListDeserializer(result.body);
}

/** List Volumes in a VolumeGroup. */
export function listByVolumeGroup(
  context: Client,
  resourceGroupName: string,
  elasticSanName: string,
  volumeGroupName: string,
  options: VolumesListByVolumeGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Volume> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByVolumeGroupSend(context, resourceGroupName, elasticSanName, volumeGroupName, options),
    _listByVolumeGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  elasticSanName: string,
  volumeGroupName: string,
  volumeName: string,
  options: VolumesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ElasticSan/elasticSans/{elasticSanName}/volumegroups/{volumeGroupName}/volumes/{volumeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      elasticSanName: elasticSanName,
      volumeGroupName: volumeGroupName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.xMsDeleteSnapshots !== undefined
        ? { "x-ms-delete-snapshots": options?.xMsDeleteSnapshots }
        : {}),
      ...(options?.xMsForceDelete !== undefined
        ? { "x-ms-force-delete": options?.xMsForceDelete }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete an Volume. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  elasticSanName: string,
  volumeGroupName: string,
  volumeName: string,
  options: VolumesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        volumeName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  elasticSanName: string,
  volumeGroupName: string,
  volumeName: string,
  parameters: VolumeUpdate,
  options: VolumesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ElasticSan/elasticSans/{elasticSanName}/volumegroups/{volumeGroupName}/volumes/{volumeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      elasticSanName: elasticSanName,
      volumeGroupName: volumeGroupName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: volumeUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Volume> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return volumeDeserializer(result.body);
}

/** Update an Volume. */
export function update(
  context: Client,
  resourceGroupName: string,
  elasticSanName: string,
  volumeGroupName: string,
  volumeName: string,
  parameters: VolumeUpdate,
  options: VolumesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Volume>, Volume> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        volumeName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01",
  }) as PollerLike<OperationState<Volume>, Volume>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  elasticSanName: string,
  volumeGroupName: string,
  volumeName: string,
  parameters: Volume,
  options: VolumesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ElasticSan/elasticSans/{elasticSanName}/volumegroups/{volumeGroupName}/volumes/{volumeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      elasticSanName: elasticSanName,
      volumeGroupName: volumeGroupName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: volumeSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Volume> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return volumeDeserializer(result.body);
}

/** Create a Volume. */
export function create(
  context: Client,
  resourceGroupName: string,
  elasticSanName: string,
  volumeGroupName: string,
  volumeName: string,
  parameters: Volume,
  options: VolumesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Volume>, Volume> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        volumeName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01",
  }) as PollerLike<OperationState<Volume>, Volume>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  elasticSanName: string,
  volumeGroupName: string,
  volumeName: string,
  options: VolumesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ElasticSan/elasticSans/{elasticSanName}/volumegroups/{volumeGroupName}/volumes/{volumeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      elasticSanName: elasticSanName,
      volumeGroupName: volumeGroupName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Volume> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return volumeDeserializer(result.body);
}

/** Get an Volume. */
export async function get(
  context: Client,
  resourceGroupName: string,
  elasticSanName: string,
  volumeGroupName: string,
  volumeName: string,
  options: VolumesGetOptionalParams = { requestOptions: {} },
): Promise<Volume> {
  const result = await _getSend(
    context,
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
    volumeName,
    options,
  );
  return _getDeserialize(result);
}
