// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchContext as Client } from "./index.js";
import {
  _BatchApplicationListResult,
  _batchApplicationListResultDeserializer,
  BatchApplication,
  batchApplicationDeserializer,
  batchErrorDeserializer,
  _BatchPoolListUsageMetricsResult,
  _batchPoolListUsageMetricsResultDeserializer,
  BatchPoolUsageMetrics,
  BatchPoolCreateOptions,
  batchPoolCreateOptionsSerializer,
  _BatchPoolListResult,
  _batchPoolListResultDeserializer,
  BatchPool,
  batchPoolDeserializer,
  AutoScaleRun,
  autoScaleRunDeserializer,
  BatchPoolUpdateOptions,
  batchPoolUpdateOptionsSerializer,
  BatchPoolEnableAutoScaleOptions,
  batchPoolEnableAutoScaleOptionsSerializer,
  BatchPoolEvaluateAutoScaleOptions,
  batchPoolEvaluateAutoScaleOptionsSerializer,
  BatchPoolResizeOptions,
  batchPoolResizeOptionsSerializer,
  BatchPoolReplaceOptions,
  batchPoolReplaceOptionsSerializer,
  BatchNodeRemoveOptions,
  batchNodeRemoveOptionsSerializer,
  _BatchAccountListSupportedImagesResult,
  _batchAccountListSupportedImagesResultDeserializer,
  BatchSupportedImage,
  _BatchPoolNodeCountsListResult,
  _batchPoolNodeCountsListResultDeserializer,
  BatchPoolNodeCounts,
  BatchJob,
  batchJobSerializer,
  batchJobDeserializer,
  BatchJobUpdateOptions,
  batchJobUpdateOptionsSerializer,
  BatchJobDisableOptions,
  batchJobDisableOptionsSerializer,
  batchJobTerminateOptionsSerializer,
  BatchJobCreateOptions,
  batchJobCreateOptionsSerializer,
  _BatchJobListResult,
  _batchJobListResultDeserializer,
  _BatchJobPreparationAndReleaseTaskStatusListResult,
  _batchJobPreparationAndReleaseTaskStatusListResultDeserializer,
  BatchJobPreparationAndReleaseTaskStatus,
  BatchTaskCountsResult,
  batchTaskCountsResultDeserializer,
  BatchJobSchedule,
  batchJobScheduleSerializer,
  batchJobScheduleDeserializer,
  BatchJobScheduleUpdateOptions,
  batchJobScheduleUpdateOptionsSerializer,
  BatchJobScheduleCreateOptions,
  batchJobScheduleCreateOptionsSerializer,
  _BatchJobScheduleListResult,
  _batchJobScheduleListResultDeserializer,
  BatchTaskCreateOptions,
  batchTaskCreateOptionsSerializer,
  _BatchTaskListResult,
  _batchTaskListResultDeserializer,
  BatchTask,
  batchTaskSerializer,
  batchTaskDeserializer,
  BatchTaskGroup,
  batchTaskGroupSerializer,
  BatchCreateTaskCollectionResult,
  batchCreateTaskCollectionResultDeserializer,
  _BatchTaskListSubtasksResult,
  _batchTaskListSubtasksResultDeserializer,
  BatchSubtask,
  _BatchNodeFileListResult,
  _batchNodeFileListResultDeserializer,
  BatchNodeFile,
  BatchNodeUserCreateOptions,
  batchNodeUserCreateOptionsSerializer,
  BatchNodeUserUpdateOptions,
  batchNodeUserUpdateOptionsSerializer,
  BatchNode,
  batchNodeDeserializer,
  batchNodeRebootOptionsSerializer,
  batchNodeReimageOptionsSerializer,
  batchNodeDeallocateOptionsSerializer,
  batchNodeDisableSchedulingOptionsSerializer,
  BatchNodeRemoteLoginSettings,
  batchNodeRemoteLoginSettingsDeserializer,
  UploadBatchServiceLogsOptions,
  uploadBatchServiceLogsOptionsSerializer,
  UploadBatchServiceLogsResult,
  uploadBatchServiceLogsResultDeserializer,
  _BatchNodeListResult,
  _batchNodeListResultDeserializer,
  BatchNodeVMExtension,
  batchNodeVMExtensionDeserializer,
  _BatchNodeVMExtensionListResult,
  _batchNodeVMExtensionListResultDeserializer,
} from "../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../static-helpers/pagingHelpers.js";
import { getBinaryResponse } from "../static-helpers/serialization/get-binary-response.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import {
  ListNodeFilesOptionalParams,
  GetNodeFilePropertiesOptionalParams,
  GetNodeFileOptionalParams,
  DeleteNodeFileOptionalParams,
  ListNodeExtensionsOptionalParams,
  GetNodeExtensionOptionalParams,
  ListNodesOptionalParams,
  UploadNodeLogsOptionalParams,
  GetNodeRemoteLoginSettingsOptionalParams,
  EnableNodeSchedulingOptionalParams,
  DisableNodeSchedulingOptionalParams,
  DeallocateNodeOptionalParams,
  ReimageNodeOptionalParams,
  StartNodeOptionalParams,
  RebootNodeOptionalParams,
  GetNodeOptionalParams,
  ReplaceNodeUserOptionalParams,
  DeleteNodeUserOptionalParams,
  CreateNodeUserOptionalParams,
  ListTaskFilesOptionalParams,
  GetTaskFilePropertiesOptionalParams,
  GetTaskFileOptionalParams,
  DeleteTaskFileOptionalParams,
  ReactivateTaskOptionalParams,
  TerminateTaskOptionalParams,
  ListSubTasksOptionalParams,
  ReplaceTaskOptionalParams,
  GetTaskOptionalParams,
  DeleteTaskOptionalParams,
  CreateTaskCollectionOptionalParams,
  ListTasksOptionalParams,
  CreateTaskOptionalParams,
  ListJobSchedulesOptionalParams,
  CreateJobScheduleOptionalParams,
  TerminateJobScheduleOptionalParams,
  EnableJobScheduleOptionalParams,
  DisableJobScheduleOptionalParams,
  ReplaceJobScheduleOptionalParams,
  UpdateJobScheduleOptionalParams,
  GetJobScheduleOptionalParams,
  DeleteJobScheduleOptionalParams,
  JobScheduleExistsOptionalParams,
  GetJobTaskCountsOptionalParams,
  ListJobPreparationAndReleaseTaskStatusOptionalParams,
  ListJobsFromScheduleOptionalParams,
  ListJobsOptionalParams,
  CreateJobOptionalParams,
  TerminateJobOptionalParams,
  EnableJobOptionalParams,
  DisableJobOptionalParams,
  ReplaceJobOptionalParams,
  UpdateJobOptionalParams,
  GetJobOptionalParams,
  DeleteJobOptionalParams,
  ListPoolNodeCountsOptionalParams,
  ListSupportedImagesOptionalParams,
  RemoveNodesOptionalParams,
  ReplacePoolPropertiesOptionalParams,
  StopPoolResizeOptionalParams,
  ResizePoolOptionalParams,
  EvaluatePoolAutoScaleOptionalParams,
  EnablePoolAutoScaleOptionalParams,
  DisablePoolAutoScaleOptionalParams,
  UpdatePoolOptionalParams,
  GetPoolOptionalParams,
  PoolExistsOptionalParams,
  DeletePoolOptionalParams,
  ListPoolsOptionalParams,
  CreatePoolOptionalParams,
  ListPoolUsageMetricsOptionalParams,
  GetApplicationOptionalParams,
  ListApplicationsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { getBatchNodeFileProperties } from "../static-helpers/fileProperties.js";
import type { PollerLike, OperationState } from "@azure/core-lro";
import {
  createDeletePoolPoller,
  createResizePoolPoller,
  createStopPoolResizePoller,
  createRemoveNodesPoller,
  createDeallocateNodePoller,
  createRebootNodePoller,
  createReimageNodePoller,
  createStartNodePoller,
  createDeleteJobPoller,
  createDisableJobPoller,
  createEnableJobPoller,
  createTerminateJobPoller,
  createDeleteJobSchedulePoller,
  createTerminateJobSchedulePoller,
} from "./lroPoller.js";

export function _listNodeFilesSend(
  context: Client,
  poolId: string,
  nodeId: string,
  options: ListNodeFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes/{nodeId}/files{?api%2Dversion,timeOut,maxresults,%24filter,recursive}",
    {
      poolId: poolId,
      nodeId: nodeId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      maxresults: options?.maxresults,
      "%24filter": options?.filter,
      recursive: options?.recursive,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listNodeFilesDeserialize(
  result: PathUncheckedResponse,
): Promise<_BatchNodeFileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return _batchNodeFileListResultDeserializer(result.body);
}

/** Lists all of the files in Task directories on the specified Compute Node. */
export function listNodeFiles(
  context: Client,
  poolId: string,
  nodeId: string,
  options: ListNodeFilesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BatchNodeFile> {
  return buildPagedAsyncIterator(
    context,
    () => _listNodeFilesSend(context, poolId, nodeId, options),
    _listNodeFilesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "odata.nextLink",
      apiVersion: context.apiVersion ?? "2025-06-01",
    },
  );
}

export function _getNodeFilePropertiesSend(
  context: Client,
  poolId: string,
  nodeId: string,
  filePath: string,
  options: GetNodeFilePropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes/{nodeId}/files/{filePath}{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      nodeId: nodeId,
      filePath: filePath,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getNodeFilePropertiesDeserialize(
  result: PathUncheckedResponse,
): Promise<BatchNodeFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return getBatchNodeFileProperties(result.headers);
}

/** Gets the properties of the specified Compute Node file. */
export async function getNodeFileProperties(
  context: Client,
  poolId: string,
  nodeId: string,
  filePath: string,
  options: GetNodeFilePropertiesOptionalParams = { requestOptions: {} },
): Promise<BatchNodeFile> {
  const result = await _getNodeFilePropertiesSend(context, poolId, nodeId, filePath, options);
  return _getNodeFilePropertiesDeserialize(result);
}

export function _getNodeFileSend(
  context: Client,
  poolId: string,
  nodeId: string,
  filePath: string,
  options: GetNodeFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes/{nodeId}/files/{filePath}{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      nodeId: nodeId,
      filePath: filePath,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ocpRange !== undefined ? { "ocp-range": options?.ocpRange } : {}),
      accept: "application/octet-stream",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getNodeFileDeserialize(result: PathUncheckedResponse): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return result.body;
}

/** Returns the content of the specified Compute Node file. */
export async function getNodeFile(
  context: Client,
  poolId: string,
  nodeId: string,
  filePath: string,
  options: GetNodeFileOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const streamableMethod = _getNodeFileSend(context, poolId, nodeId, filePath, options);
  const result = await getBinaryResponse(streamableMethod);
  return _getNodeFileDeserialize(result);
}

export function _deleteNodeFileSend(
  context: Client,
  poolId: string,
  nodeId: string,
  filePath: string,
  options: DeleteNodeFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes/{nodeId}/files/{filePath}{?api%2Dversion,timeOut,recursive}",
    {
      poolId: poolId,
      nodeId: nodeId,
      filePath: filePath,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      recursive: options?.recursive,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteNodeFileDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes the specified file from the Compute Node. */
export async function deleteNodeFile(
  context: Client,
  poolId: string,
  nodeId: string,
  filePath: string,
  options: DeleteNodeFileOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteNodeFileSend(context, poolId, nodeId, filePath, options);
  return _deleteNodeFileDeserialize(result);
}

export function _listNodeExtensionsSend(
  context: Client,
  poolId: string,
  nodeId: string,
  options: ListNodeExtensionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes/{nodeId}/extensions{?api%2Dversion,timeOut,maxresults,%24select}",
    {
      poolId: poolId,
      nodeId: nodeId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      maxresults: options?.maxresults,
      "%24select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listNodeExtensionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_BatchNodeVMExtensionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return _batchNodeVMExtensionListResultDeserializer(result.body);
}

/** Lists the Compute Nodes Extensions in the specified Pool. */
export function listNodeExtensions(
  context: Client,
  poolId: string,
  nodeId: string,
  options: ListNodeExtensionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BatchNodeVMExtension> {
  return buildPagedAsyncIterator(
    context,
    () => _listNodeExtensionsSend(context, poolId, nodeId, options),
    _listNodeExtensionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "odata.nextLink",
      apiVersion: context.apiVersion ?? "2025-06-01",
    },
  );
}

export function _getNodeExtensionSend(
  context: Client,
  poolId: string,
  nodeId: string,
  extensionName: string,
  options: GetNodeExtensionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes/{nodeId}/extensions/{extensionName}{?api%2Dversion,timeOut,%24select}",
    {
      poolId: poolId,
      nodeId: nodeId,
      extensionName: extensionName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      "%24select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getNodeExtensionDeserialize(
  result: PathUncheckedResponse,
): Promise<BatchNodeVMExtension> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return batchNodeVMExtensionDeserializer(result.body);
}

/** Gets information about the specified Compute Node Extension. */
export async function getNodeExtension(
  context: Client,
  poolId: string,
  nodeId: string,
  extensionName: string,
  options: GetNodeExtensionOptionalParams = { requestOptions: {} },
): Promise<BatchNodeVMExtension> {
  const result = await _getNodeExtensionSend(context, poolId, nodeId, extensionName, options);
  return _getNodeExtensionDeserialize(result);
}

export function _listNodesSend(
  context: Client,
  poolId: string,
  options: ListNodesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes{?api%2Dversion,timeOut,maxresults,%24filter,%24select}",
    {
      poolId: poolId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      maxresults: options?.maxresults,
      "%24filter": options?.filter,
      "%24select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listNodesDeserialize(
  result: PathUncheckedResponse,
): Promise<_BatchNodeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return _batchNodeListResultDeserializer(result.body);
}

/** Lists the Compute Nodes in the specified Pool. */
export function listNodes(
  context: Client,
  poolId: string,
  options: ListNodesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BatchNode> {
  return buildPagedAsyncIterator(
    context,
    () => _listNodesSend(context, poolId, options),
    _listNodesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "odata.nextLink",
      apiVersion: context.apiVersion ?? "2025-06-01",
    },
  );
}

export function _uploadNodeLogsSend(
  context: Client,
  poolId: string,
  nodeId: string,
  uploadOptions: UploadBatchServiceLogsOptions,
  options: UploadNodeLogsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes/{nodeId}/uploadbatchservicelogs{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      nodeId: nodeId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: uploadBatchServiceLogsOptionsSerializer(uploadOptions),
  });
}

export async function _uploadNodeLogsDeserialize(
  result: PathUncheckedResponse,
): Promise<UploadBatchServiceLogsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return uploadBatchServiceLogsResultDeserializer(result.body);
}

/**
 * This is for gathering Azure Batch service log files in an automated fashion
 * from Compute Nodes if you are experiencing an error and wish to escalate to
 * Azure support. The Azure Batch service log files should be shared with Azure
 * support to aid in debugging issues with the Batch service.
 */
export async function uploadNodeLogs(
  context: Client,
  poolId: string,
  nodeId: string,
  uploadOptions: UploadBatchServiceLogsOptions,
  options: UploadNodeLogsOptionalParams = { requestOptions: {} },
): Promise<UploadBatchServiceLogsResult> {
  const result = await _uploadNodeLogsSend(context, poolId, nodeId, uploadOptions, options);
  return _uploadNodeLogsDeserialize(result);
}

export function _getNodeRemoteLoginSettingsSend(
  context: Client,
  poolId: string,
  nodeId: string,
  options: GetNodeRemoteLoginSettingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes/{nodeId}/remoteloginsettings{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      nodeId: nodeId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getNodeRemoteLoginSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<BatchNodeRemoteLoginSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return batchNodeRemoteLoginSettingsDeserializer(result.body);
}

/** Before you can remotely login to a Compute Node using the remote login settings, you must create a user Account on the Compute Node and configure access ports for SSH and RDP. For more information, see https://learn.microsoft.com/azure/batch/pool-endpoint-configuration */
export async function getNodeRemoteLoginSettings(
  context: Client,
  poolId: string,
  nodeId: string,
  options: GetNodeRemoteLoginSettingsOptionalParams = { requestOptions: {} },
): Promise<BatchNodeRemoteLoginSettings> {
  const result = await _getNodeRemoteLoginSettingsSend(context, poolId, nodeId, options);
  return _getNodeRemoteLoginSettingsDeserialize(result);
}

export function _enableNodeSchedulingSend(
  context: Client,
  poolId: string,
  nodeId: string,
  options: EnableNodeSchedulingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes/{nodeId}/enablescheduling{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      nodeId: nodeId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _enableNodeSchedulingDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * You can enable Task scheduling on a Compute Node only if its current scheduling
 * state is disabled
 */
export async function enableNodeScheduling(
  context: Client,
  poolId: string,
  nodeId: string,
  options: EnableNodeSchedulingOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _enableNodeSchedulingSend(context, poolId, nodeId, options);
  return _enableNodeSchedulingDeserialize(result);
}

export function _disableNodeSchedulingSend(
  context: Client,
  poolId: string,
  nodeId: string,
  options: DisableNodeSchedulingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes/{nodeId}/disablescheduling{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      nodeId: nodeId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: !options["options"]
      ? options["options"]
      : batchNodeDisableSchedulingOptionsSerializer(options["options"]),
  });
}

export async function _disableNodeSchedulingDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * You can disable Task scheduling on a Compute Node only if its current
 * scheduling state is enabled.
 */
export async function disableNodeScheduling(
  context: Client,
  poolId: string,
  nodeId: string,
  options: DisableNodeSchedulingOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _disableNodeSchedulingSend(context, poolId, nodeId, options);
  return _disableNodeSchedulingDeserialize(result);
}

export function _deallocateNodeSend(
  context: Client,
  poolId: string,
  nodeId: string,
  options: DeallocateNodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes/{nodeId}/deallocate{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      nodeId: nodeId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: !options["options"]
      ? options["options"]
      : batchNodeDeallocateOptionsSerializer(options["options"]),
  });
}

export async function _deallocateNodeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

export async function _deallocateNode(
  context: Client,
  poolId: string,
  nodeId: string,
  options: DeallocateNodeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deallocateNodeSend(context, poolId, nodeId, options);
  return _deallocateNodeDeserialize(result);
}

/** You can deallocate a Compute Node only if it is in an idle or running state. */
export function deallocateNode(
  context: Client,
  poolId: string,
  nodeId: string,
  options: DeallocateNodeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return createDeallocateNodePoller(context, poolId, nodeId, options);
}

export function _reimageNodeSend(
  context: Client,
  poolId: string,
  nodeId: string,
  options: ReimageNodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes/{nodeId}/reimage{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      nodeId: nodeId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: !options["options"]
      ? options["options"]
      : batchNodeReimageOptionsSerializer(options["options"]),
  });
}

export async function _reimageNodeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

export async function _reimageNode(
  context: Client,
  poolId: string,
  nodeId: string,
  options: ReimageNodeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _reimageNodeSend(context, poolId, nodeId, options);
  return _reimageNodeDeserialize(result);
}

/**
 * You can reinstall the operating system on a Compute Node only if it is in an
 * idle or running state. This API can be invoked only on Pools created with the
 * cloud service configuration property.
 */
export function reimageNode(
  context: Client,
  poolId: string,
  nodeId: string,
  options: ReimageNodeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return createReimageNodePoller(context, poolId, nodeId, options);
}

export function _startNodeSend(
  context: Client,
  poolId: string,
  nodeId: string,
  options: StartNodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes/{nodeId}/start{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      nodeId: nodeId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _startNodeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

export async function _startNode(
  context: Client,
  poolId: string,
  nodeId: string,
  options: StartNodeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _startNodeSend(context, poolId, nodeId, options);
  return _startNodeDeserialize(result);
}

/** You can start a Compute Node only if it has been deallocated. */
export function startNode(
  context: Client,
  poolId: string,
  nodeId: string,
  options: StartNodeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return createStartNodePoller(context, poolId, nodeId, options);
}

export function _rebootNodeSend(
  context: Client,
  poolId: string,
  nodeId: string,
  options: RebootNodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes/{nodeId}/reboot{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      nodeId: nodeId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: !options["options"]
      ? options["options"]
      : batchNodeRebootOptionsSerializer(options["options"]),
  });
}

export async function _rebootNodeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

export async function _rebootNode(
  context: Client,
  poolId: string,
  nodeId: string,
  options: RebootNodeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _rebootNodeSend(context, poolId, nodeId, options);
  return _rebootNodeDeserialize(result);
}

/** You can restart a Compute Node only if it is in an idle or running state. */
export function rebootNode(
  context: Client,
  poolId: string,
  nodeId: string,
  options: RebootNodeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return createRebootNodePoller(context, poolId, nodeId, options);
}

export function _getNodeSend(
  context: Client,
  poolId: string,
  nodeId: string,
  options: GetNodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes/{nodeId}{?api%2Dversion,timeOut,%24select}",
    {
      poolId: poolId,
      nodeId: nodeId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      "%24select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getNodeDeserialize(result: PathUncheckedResponse): Promise<BatchNode> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return batchNodeDeserializer(result.body);
}

/** Gets information about the specified Compute Node. */
export async function getNode(
  context: Client,
  poolId: string,
  nodeId: string,
  options: GetNodeOptionalParams = { requestOptions: {} },
): Promise<BatchNode> {
  const result = await _getNodeSend(context, poolId, nodeId, options);
  return _getNodeDeserialize(result);
}

export function _replaceNodeUserSend(
  context: Client,
  poolId: string,
  nodeId: string,
  userName: string,
  updateOptions: BatchNodeUserUpdateOptions,
  options: ReplaceNodeUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes/{nodeId}/users/{userName}{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      nodeId: nodeId,
      userName: userName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: batchNodeUserUpdateOptionsSerializer(updateOptions),
  });
}

export async function _replaceNodeUserDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * This operation replaces of all the updatable properties of the Account. For
 * example, if the expiryTime element is not specified, the current value is
 * replaced with the default value, not left unmodified. You can update a user
 * Account on a Compute Node only when it is in the idle or running state.
 */
export async function replaceNodeUser(
  context: Client,
  poolId: string,
  nodeId: string,
  userName: string,
  updateOptions: BatchNodeUserUpdateOptions,
  options: ReplaceNodeUserOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _replaceNodeUserSend(
    context,
    poolId,
    nodeId,
    userName,
    updateOptions,
    options,
  );
  return _replaceNodeUserDeserialize(result);
}

export function _deleteNodeUserSend(
  context: Client,
  poolId: string,
  nodeId: string,
  userName: string,
  options: DeleteNodeUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes/{nodeId}/users/{userName}{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      nodeId: nodeId,
      userName: userName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteNodeUserDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * You can delete a user Account to a Compute Node only when it is in the idle or
 * running state. Before you can remotely login to a Compute Node you must configure
 * access ports for SSH and RDP. For more information, see https://learn.microsoft.com/azure/batch/pool-endpoint-configuration
 */
export async function deleteNodeUser(
  context: Client,
  poolId: string,
  nodeId: string,
  userName: string,
  options: DeleteNodeUserOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteNodeUserSend(context, poolId, nodeId, userName, options);
  return _deleteNodeUserDeserialize(result);
}

export function _createNodeUserSend(
  context: Client,
  poolId: string,
  nodeId: string,
  user: BatchNodeUserCreateOptions,
  options: CreateNodeUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/nodes/{nodeId}/users{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      nodeId: nodeId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: batchNodeUserCreateOptionsSerializer(user),
  });
}

export async function _createNodeUserDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * You can add a user Account to a Compute Node only when it is in the idle or
 * running state. Before you can remotely login to a Compute Node you must configure access ports for SSH and RDP. For more information, see https://learn.microsoft.com/azure/batch/pool-endpoint-configuration
 *
 */
export async function createNodeUser(
  context: Client,
  poolId: string,
  nodeId: string,
  user: BatchNodeUserCreateOptions,
  options: CreateNodeUserOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _createNodeUserSend(context, poolId, nodeId, user, options);
  return _createNodeUserDeserialize(result);
}

export function _listTaskFilesSend(
  context: Client,
  jobId: string,
  taskId: string,
  options: ListTaskFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}/tasks/{taskId}/files{?api%2Dversion,timeOut,maxresults,%24filter,recursive}",
    {
      jobId: jobId,
      taskId: taskId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      maxresults: options?.maxresults,
      "%24filter": options?.filter,
      recursive: options?.recursive,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listTaskFilesDeserialize(
  result: PathUncheckedResponse,
): Promise<_BatchNodeFileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return _batchNodeFileListResultDeserializer(result.body);
}

/** Lists the files in a Task's directory on its Compute Node. */
export function listTaskFiles(
  context: Client,
  jobId: string,
  taskId: string,
  options: ListTaskFilesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BatchNodeFile> {
  return buildPagedAsyncIterator(
    context,
    () => _listTaskFilesSend(context, jobId, taskId, options),
    _listTaskFilesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "odata.nextLink",
      apiVersion: context.apiVersion ?? "2025-06-01",
    },
  );
}

export function _getTaskFilePropertiesSend(
  context: Client,
  jobId: string,
  taskId: string,
  filePath: string,
  options: GetTaskFilePropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}/tasks/{taskId}/files/{filePath}{?api%2Dversion,timeOut}",
    {
      jobId: jobId,
      taskId: taskId,
      filePath: filePath,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getTaskFilePropertiesDeserialize(
  result: PathUncheckedResponse,
): Promise<BatchNodeFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return getBatchNodeFileProperties(result.headers);
}

/** Gets the properties of the specified Task file. */
export async function getTaskFileProperties(
  context: Client,
  jobId: string,
  taskId: string,
  filePath: string,
  options: GetTaskFilePropertiesOptionalParams = { requestOptions: {} },
): Promise<BatchNodeFile> {
  const result = await _getTaskFilePropertiesSend(context, jobId, taskId, filePath, options);
  return _getTaskFilePropertiesDeserialize(result);
}

export function _getTaskFileSend(
  context: Client,
  jobId: string,
  taskId: string,
  filePath: string,
  options: GetTaskFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}/tasks/{taskId}/files/{filePath}{?api%2Dversion,timeOut}",
    {
      jobId: jobId,
      taskId: taskId,
      filePath: filePath,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ocpRange !== undefined ? { "ocp-range": options?.ocpRange } : {}),
      accept: "application/octet-stream",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getTaskFileDeserialize(result: PathUncheckedResponse): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return result.body;
}

/** Returns the content of the specified Task file. */
export async function getTaskFile(
  context: Client,
  jobId: string,
  taskId: string,
  filePath: string,
  options: GetTaskFileOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const streamableMethod = _getTaskFileSend(context, jobId, taskId, filePath, options);
  const result = await getBinaryResponse(streamableMethod);
  return _getTaskFileDeserialize(result);
}

export function _deleteTaskFileSend(
  context: Client,
  jobId: string,
  taskId: string,
  filePath: string,
  options: DeleteTaskFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}/tasks/{taskId}/files/{filePath}{?api%2Dversion,timeOut,recursive}",
    {
      jobId: jobId,
      taskId: taskId,
      filePath: filePath,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      recursive: options?.recursive,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteTaskFileDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes the specified Task file from the Compute Node where the Task ran. */
export async function deleteTaskFile(
  context: Client,
  jobId: string,
  taskId: string,
  filePath: string,
  options: DeleteTaskFileOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteTaskFileSend(context, jobId, taskId, filePath, options);
  return _deleteTaskFileDeserialize(result);
}

export function _reactivateTaskSend(
  context: Client,
  jobId: string,
  taskId: string,
  options: ReactivateTaskOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}/tasks/{taskId}/reactivate{?api%2Dversion,timeOut}",
    {
      jobId: jobId,
      taskId: taskId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _reactivateTaskDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * Reactivation makes a Task eligible to be retried again up to its maximum retry
 * count. The Task's state is changed to active. As the Task is no longer in the
 * completed state, any previous exit code or failure information is no longer
 * available after reactivation. Each time a Task is reactivated, its retry count
 * is reset to 0. Reactivation will fail for Tasks that are not completed or that
 * previously completed successfully (with an exit code of 0). Additionally, it
 * will fail if the Job has completed (or is terminating or deleting).
 */
export async function reactivateTask(
  context: Client,
  jobId: string,
  taskId: string,
  options: ReactivateTaskOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _reactivateTaskSend(context, jobId, taskId, options);
  return _reactivateTaskDeserialize(result);
}

export function _terminateTaskSend(
  context: Client,
  jobId: string,
  taskId: string,
  options: TerminateTaskOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}/tasks/{taskId}/terminate{?api%2Dversion,timeOut}",
    {
      jobId: jobId,
      taskId: taskId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _terminateTaskDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * When the Task has been terminated, it moves to the completed state. For
 * multi-instance Tasks, the terminate Task operation applies synchronously to the
 * primary task; subtasks are then terminated asynchronously in the background.
 */
export async function terminateTask(
  context: Client,
  jobId: string,
  taskId: string,
  options: TerminateTaskOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _terminateTaskSend(context, jobId, taskId, options);
  return _terminateTaskDeserialize(result);
}

export function _listSubTasksSend(
  context: Client,
  jobId: string,
  taskId: string,
  options: ListSubTasksOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}/tasks/{taskId}/subtasksinfo{?api%2Dversion,timeOut,%24select}",
    {
      jobId: jobId,
      taskId: taskId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      "%24select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listSubTasksDeserialize(
  result: PathUncheckedResponse,
): Promise<_BatchTaskListSubtasksResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return _batchTaskListSubtasksResultDeserializer(result.body);
}

/** If the Task is not a multi-instance Task then this returns an empty collection. */
export function listSubTasks(
  context: Client,
  jobId: string,
  taskId: string,
  options: ListSubTasksOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BatchSubtask> {
  return buildPagedAsyncIterator(
    context,
    () => _listSubTasksSend(context, jobId, taskId, options),
    _listSubTasksDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "odata.nextLink",
      apiVersion: context.apiVersion ?? "2025-06-01",
    },
  );
}

export function _replaceTaskSend(
  context: Client,
  jobId: string,
  taskId: string,
  task: BatchTask,
  options: ReplaceTaskOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}/tasks/{taskId}{?api%2Dversion,timeOut}",
    {
      jobId: jobId,
      taskId: taskId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
    body: batchTaskSerializer(task),
  });
}

export async function _replaceTaskDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Updates the properties of the specified Task. */
export async function replaceTask(
  context: Client,
  jobId: string,
  taskId: string,
  task: BatchTask,
  options: ReplaceTaskOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _replaceTaskSend(context, jobId, taskId, task, options);
  return _replaceTaskDeserialize(result);
}

export function _getTaskSend(
  context: Client,
  jobId: string,
  taskId: string,
  options: GetTaskOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}/tasks/{taskId}{?api%2Dversion,timeOut,%24select,%24expand}",
    {
      jobId: jobId,
      taskId: taskId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      "%24select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      "%24expand": !options?.expand
        ? options?.expand
        : options?.expand.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getTaskDeserialize(result: PathUncheckedResponse): Promise<BatchTask> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return batchTaskDeserializer(result.body);
}

/**
 * For multi-instance Tasks, information such as affinityId, executionInfo and
 * nodeInfo refer to the primary Task. Use the list subtasks API to retrieve
 * information about subtasks.
 */
export async function getTask(
  context: Client,
  jobId: string,
  taskId: string,
  options: GetTaskOptionalParams = { requestOptions: {} },
): Promise<BatchTask> {
  const result = await _getTaskSend(context, jobId, taskId, options);
  return _getTaskDeserialize(result);
}

export function _deleteTaskSend(
  context: Client,
  jobId: string,
  taskId: string,
  options: DeleteTaskOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}/tasks/{taskId}{?api%2Dversion,timeOut}",
    {
      jobId: jobId,
      taskId: taskId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteTaskDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * When a Task is deleted, all of the files in its directory on the Compute Node
 * where it ran are also deleted (regardless of the retention time). For
 * multi-instance Tasks, the delete Task operation applies synchronously to the
 * primary task; subtasks and their files are then deleted asynchronously in the
 * background.
 */
export async function deleteTask(
  context: Client,
  jobId: string,
  taskId: string,
  options: DeleteTaskOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteTaskSend(context, jobId, taskId, options);
  return _deleteTaskDeserialize(result);
}

export function _createTaskCollectionSend(
  context: Client,
  jobId: string,
  taskCollection: BatchTaskGroup,
  options: CreateTaskCollectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}/addtaskcollection{?api%2Dversion,timeOut}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: batchTaskGroupSerializer(taskCollection),
  });
}

export async function _createTaskCollectionDeserialize(
  result: PathUncheckedResponse,
): Promise<BatchCreateTaskCollectionResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return batchCreateTaskCollectionResultDeserializer(result.body);
}

/**
 * Note that each Task must have a unique ID. The Batch service may not return the
 * results for each Task in the same order the Tasks were submitted in this
 * request. If the server times out or the connection is closed during the
 * request, the request may have been partially or fully processed, or not at all.
 * In such cases, the user should re-issue the request. Note that it is up to the
 * user to correctly handle failures when re-issuing a request. For example, you
 * should use the same Task IDs during a retry so that if the prior operation
 * succeeded, the retry will not create extra Tasks unexpectedly. If the response
 * contains any Tasks which failed to add, a client can retry the request. In a
 * retry, it is most efficient to resubmit only Tasks that failed to add, and to
 * omit Tasks that were successfully added on the first attempt. The maximum
 * lifetime of a Task from addition to completion is 180 days. If a Task has not
 * completed within 180 days of being added it will be terminated by the Batch
 * service and left in whatever state it was in at that time.
 */
export async function createTaskCollection(
  context: Client,
  jobId: string,
  taskCollection: BatchTaskGroup,
  options: CreateTaskCollectionOptionalParams = { requestOptions: {} },
): Promise<BatchCreateTaskCollectionResult> {
  const result = await _createTaskCollectionSend(context, jobId, taskCollection, options);
  return _createTaskCollectionDeserialize(result);
}

export function _listTasksSend(
  context: Client,
  jobId: string,
  options: ListTasksOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}/tasks{?api%2Dversion,timeOut,maxresults,%24filter,%24select,%24expand}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      maxresults: options?.maxresults,
      "%24filter": options?.filter,
      "%24select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      "%24expand": !options?.expand
        ? options?.expand
        : options?.expand.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listTasksDeserialize(
  result: PathUncheckedResponse,
): Promise<_BatchTaskListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return _batchTaskListResultDeserializer(result.body);
}

/**
 * For multi-instance Tasks, information such as affinityId, executionInfo and
 * nodeInfo refer to the primary Task. Use the list subtasks API to retrieve
 * information about subtasks.
 */
export function listTasks(
  context: Client,
  jobId: string,
  options: ListTasksOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BatchTask> {
  return buildPagedAsyncIterator(
    context,
    () => _listTasksSend(context, jobId, options),
    _listTasksDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "odata.nextLink",
      apiVersion: context.apiVersion ?? "2025-06-01",
    },
  );
}

export function _createTaskSend(
  context: Client,
  jobId: string,
  task: BatchTaskCreateOptions,
  options: CreateTaskOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}/tasks{?api%2Dversion,timeOut}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: batchTaskCreateOptionsSerializer(task),
  });
}

export async function _createTaskDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * The maximum lifetime of a Task from addition to completion is 180 days. If a
 * Task has not completed within 180 days of being added it will be terminated by
 * the Batch service and left in whatever state it was in at that time.
 */
export async function createTask(
  context: Client,
  jobId: string,
  task: BatchTaskCreateOptions,
  options: CreateTaskOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _createTaskSend(context, jobId, task, options);
  return _createTaskDeserialize(result);
}

export function _listJobSchedulesSend(
  context: Client,
  options: ListJobSchedulesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobschedules{?api%2Dversion,timeOut,maxresults,%24filter,%24select,%24expand}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      maxresults: options?.maxresults,
      "%24filter": options?.filter,
      "%24select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      "%24expand": !options?.expand
        ? options?.expand
        : options?.expand.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listJobSchedulesDeserialize(
  result: PathUncheckedResponse,
): Promise<_BatchJobScheduleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return _batchJobScheduleListResultDeserializer(result.body);
}

/** Lists all of the Job Schedules in the specified Account. */
export function listJobSchedules(
  context: Client,
  options: ListJobSchedulesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BatchJobSchedule> {
  return buildPagedAsyncIterator(
    context,
    () => _listJobSchedulesSend(context, options),
    _listJobSchedulesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "odata.nextLink",
      apiVersion: context.apiVersion ?? "2025-06-01",
    },
  );
}

export function _createJobScheduleSend(
  context: Client,
  jobSchedule: BatchJobScheduleCreateOptions,
  options: CreateJobScheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobschedules{?api%2Dversion,timeOut}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: batchJobScheduleCreateOptionsSerializer(jobSchedule),
  });
}

export async function _createJobScheduleDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Creates a Job Schedule to the specified Account. */
export async function createJobSchedule(
  context: Client,
  jobSchedule: BatchJobScheduleCreateOptions,
  options: CreateJobScheduleOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _createJobScheduleSend(context, jobSchedule, options);
  return _createJobScheduleDeserialize(result);
}

export function _terminateJobScheduleSend(
  context: Client,
  jobScheduleId: string,
  options: TerminateJobScheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobschedules/{jobScheduleId}/terminate{?api%2Dversion,timeOut,force}",
    {
      jobScheduleId: jobScheduleId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      force: options?.force,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _terminateJobScheduleDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

export async function _terminateJobSchedule(
  context: Client,
  jobScheduleId: string,
  options: TerminateJobScheduleOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _terminateJobScheduleSend(context, jobScheduleId, options);
  return _terminateJobScheduleDeserialize(result);
}

/** Terminates a Job Schedule. */
export function terminateJobSchedule(
  context: Client,
  jobScheduleId: string,
  options: TerminateJobScheduleOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return createTerminateJobSchedulePoller(context, jobScheduleId, options);
}

export function _enableJobScheduleSend(
  context: Client,
  jobScheduleId: string,
  options: EnableJobScheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobschedules/{jobScheduleId}/enable{?api%2Dversion,timeOut}",
    {
      jobScheduleId: jobScheduleId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _enableJobScheduleDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Enables a Job Schedule. */
export async function enableJobSchedule(
  context: Client,
  jobScheduleId: string,
  options: EnableJobScheduleOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _enableJobScheduleSend(context, jobScheduleId, options);
  return _enableJobScheduleDeserialize(result);
}

export function _disableJobScheduleSend(
  context: Client,
  jobScheduleId: string,
  options: DisableJobScheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobschedules/{jobScheduleId}/disable{?api%2Dversion,timeOut}",
    {
      jobScheduleId: jobScheduleId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _disableJobScheduleDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** No new Jobs will be created until the Job Schedule is enabled again. */
export async function disableJobSchedule(
  context: Client,
  jobScheduleId: string,
  options: DisableJobScheduleOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _disableJobScheduleSend(context, jobScheduleId, options);
  return _disableJobScheduleDeserialize(result);
}

export function _replaceJobScheduleSend(
  context: Client,
  jobScheduleId: string,
  jobSchedule: BatchJobSchedule,
  options: ReplaceJobScheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobschedules/{jobScheduleId}{?api%2Dversion,timeOut}",
    {
      jobScheduleId: jobScheduleId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
    body: batchJobScheduleSerializer(jobSchedule),
  });
}

export async function _replaceJobScheduleDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * This fully replaces all the updatable properties of the Job Schedule. For
 * example, if the schedule property is not specified with this request, then the
 * Batch service will remove the existing schedule. Changes to a Job Schedule only
 * impact Jobs created by the schedule after the update has taken place; currently
 * running Jobs are unaffected.
 */
export async function replaceJobSchedule(
  context: Client,
  jobScheduleId: string,
  jobSchedule: BatchJobSchedule,
  options: ReplaceJobScheduleOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _replaceJobScheduleSend(context, jobScheduleId, jobSchedule, options);
  return _replaceJobScheduleDeserialize(result);
}

export function _updateJobScheduleSend(
  context: Client,
  jobScheduleId: string,
  jobSchedule: BatchJobScheduleUpdateOptions,
  options: UpdateJobScheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobschedules/{jobScheduleId}{?api%2Dversion,timeOut}",
    {
      jobScheduleId: jobScheduleId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
    body: batchJobScheduleUpdateOptionsSerializer(jobSchedule),
  });
}

export async function _updateJobScheduleDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * This replaces only the Job Schedule properties specified in the request. For
 * example, if the schedule property is not specified with this request, then the
 * Batch service will keep the existing schedule. Changes to a Job Schedule only
 * impact Jobs created by the schedule after the update has taken place; currently
 * running Jobs are unaffected.
 */
export async function updateJobSchedule(
  context: Client,
  jobScheduleId: string,
  jobSchedule: BatchJobScheduleUpdateOptions,
  options: UpdateJobScheduleOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateJobScheduleSend(context, jobScheduleId, jobSchedule, options);
  return _updateJobScheduleDeserialize(result);
}

export function _getJobScheduleSend(
  context: Client,
  jobScheduleId: string,
  options: GetJobScheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobschedules/{jobScheduleId}{?api%2Dversion,timeOut,%24select,%24expand}",
    {
      jobScheduleId: jobScheduleId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      "%24select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      "%24expand": !options?.expand
        ? options?.expand
        : options?.expand.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getJobScheduleDeserialize(
  result: PathUncheckedResponse,
): Promise<BatchJobSchedule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return batchJobScheduleDeserializer(result.body);
}

/** Gets information about the specified Job Schedule. */
export async function getJobSchedule(
  context: Client,
  jobScheduleId: string,
  options: GetJobScheduleOptionalParams = { requestOptions: {} },
): Promise<BatchJobSchedule> {
  const result = await _getJobScheduleSend(context, jobScheduleId, options);
  return _getJobScheduleDeserialize(result);
}

export function _deleteJobScheduleSend(
  context: Client,
  jobScheduleId: string,
  options: DeleteJobScheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobschedules/{jobScheduleId}{?api%2Dversion,timeOut,force}",
    {
      jobScheduleId: jobScheduleId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      force: options?.force,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteJobScheduleDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

export async function _deleteJobSchedule(
  context: Client,
  jobScheduleId: string,
  options: DeleteJobScheduleOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteJobScheduleSend(context, jobScheduleId, options);
  return _deleteJobScheduleDeserialize(result);
}

/**
 * When you delete a Job Schedule, this also deletes all Jobs and Tasks under that
 * schedule. When Tasks are deleted, all the files in their working directories on
 * the Compute Nodes are also deleted (the retention period is ignored). The Job
 * Schedule statistics are no longer accessible once the Job Schedule is deleted,
 * though they are still counted towards Account lifetime statistics.
 */
export function deleteJobSchedule(
  context: Client,
  jobScheduleId: string,
  options: DeleteJobScheduleOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return createDeleteJobSchedulePoller(context, jobScheduleId, options);
}

export function _jobScheduleExistsSend(
  context: Client,
  jobScheduleId: string,
  options: JobScheduleExistsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobschedules/{jobScheduleId}{?api%2Dversion,timeOut}",
    {
      jobScheduleId: jobScheduleId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _jobScheduleExistsDeserialize(
  result: PathUncheckedResponse,
): Promise<boolean> {
  const expectedStatuses = ["200", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return result.status === "200";
}

/** Checks the specified Job Schedule exists. */
export async function jobScheduleExists(
  context: Client,
  jobScheduleId: string,
  options: JobScheduleExistsOptionalParams = { requestOptions: {} },
): Promise<boolean> {
  const result = await _jobScheduleExistsSend(context, jobScheduleId, options);
  return _jobScheduleExistsDeserialize(result);
}

export function _getJobTaskCountsSend(
  context: Client,
  jobId: string,
  options: GetJobTaskCountsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}/taskcounts{?api%2Dversion,timeOut}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getJobTaskCountsDeserialize(
  result: PathUncheckedResponse,
): Promise<BatchTaskCountsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return batchTaskCountsResultDeserializer(result.body);
}

/**
 * Task counts provide a count of the Tasks by active, running or completed Task
 * state, and a count of Tasks which succeeded or failed. Tasks in the preparing
 * state are counted as running. Note that the numbers returned may not always be
 * up to date. If you need exact task counts, use a list query.
 */
export async function getJobTaskCounts(
  context: Client,
  jobId: string,
  options: GetJobTaskCountsOptionalParams = { requestOptions: {} },
): Promise<BatchTaskCountsResult> {
  const result = await _getJobTaskCountsSend(context, jobId, options);
  return _getJobTaskCountsDeserialize(result);
}

export function _listJobPreparationAndReleaseTaskStatusSend(
  context: Client,
  jobId: string,
  options: ListJobPreparationAndReleaseTaskStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}/jobpreparationandreleasetaskstatus{?api%2Dversion,timeOut,maxresults,%24filter,%24select}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      maxresults: options?.maxresults,
      "%24filter": options?.filter,
      "%24select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listJobPreparationAndReleaseTaskStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<_BatchJobPreparationAndReleaseTaskStatusListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return _batchJobPreparationAndReleaseTaskStatusListResultDeserializer(result.body);
}

/**
 * This API returns the Job Preparation and Job Release Task status on all Compute
 * Nodes that have run the Job Preparation or Job Release Task. This includes
 * Compute Nodes which have since been removed from the Pool. If this API is
 * invoked on a Job which has no Job Preparation or Job Release Task, the Batch
 * service returns HTTP status code 409 (Conflict) with an error code of
 * JobPreparationTaskNotSpecified.
 */
export function listJobPreparationAndReleaseTaskStatus(
  context: Client,
  jobId: string,
  options: ListJobPreparationAndReleaseTaskStatusOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BatchJobPreparationAndReleaseTaskStatus> {
  return buildPagedAsyncIterator(
    context,
    () => _listJobPreparationAndReleaseTaskStatusSend(context, jobId, options),
    _listJobPreparationAndReleaseTaskStatusDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "odata.nextLink",
      apiVersion: context.apiVersion ?? "2025-06-01",
    },
  );
}

export function _listJobsFromScheduleSend(
  context: Client,
  jobScheduleId: string,
  options: ListJobsFromScheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobschedules/{jobScheduleId}/jobs{?api%2Dversion,timeOut,maxresults,%24filter,%24select,%24expand}",
    {
      jobScheduleId: jobScheduleId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      maxresults: options?.maxresults,
      "%24filter": options?.filter,
      "%24select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      "%24expand": !options?.expand
        ? options?.expand
        : options?.expand.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listJobsFromScheduleDeserialize(
  result: PathUncheckedResponse,
): Promise<_BatchJobListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return _batchJobListResultDeserializer(result.body);
}

/** Lists the Jobs that have been created under the specified Job Schedule. */
export function listJobsFromSchedule(
  context: Client,
  jobScheduleId: string,
  options: ListJobsFromScheduleOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BatchJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listJobsFromScheduleSend(context, jobScheduleId, options),
    _listJobsFromScheduleDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "odata.nextLink",
      apiVersion: context.apiVersion ?? "2025-06-01",
    },
  );
}

export function _listJobsSend(
  context: Client,
  options: ListJobsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs{?api%2Dversion,timeOut,maxresults,%24filter,%24select,%24expand}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      maxresults: options?.maxresults,
      "%24filter": options?.filter,
      "%24select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      "%24expand": !options?.expand
        ? options?.expand
        : options?.expand.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listJobsDeserialize(
  result: PathUncheckedResponse,
): Promise<_BatchJobListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return _batchJobListResultDeserializer(result.body);
}

/** Lists all of the Jobs in the specified Account. */
export function listJobs(
  context: Client,
  options: ListJobsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BatchJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listJobsSend(context, options),
    _listJobsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "odata.nextLink",
      apiVersion: context.apiVersion ?? "2025-06-01",
    },
  );
}

export function _createJobSend(
  context: Client,
  job: BatchJobCreateOptions,
  options: CreateJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs{?api%2Dversion,timeOut}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: batchJobCreateOptionsSerializer(job),
  });
}

export async function _createJobDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * The Batch service supports two ways to control the work done as part of a Job.
 * In the first approach, the user specifies a Job Manager Task. The Batch service
 * launches this Task when it is ready to start the Job. The Job Manager Task
 * controls all other Tasks that run under this Job, by using the Task APIs. In
 * the second approach, the user directly controls the execution of Tasks under an
 * active Job, by using the Task APIs. Also note: when naming Jobs, avoid
 * including sensitive information such as user names or secret project names.
 * This information may appear in telemetry logs accessible to Microsoft Support
 * engineers.
 */
export async function createJob(
  context: Client,
  job: BatchJobCreateOptions,
  options: CreateJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _createJobSend(context, job, options);
  return _createJobDeserialize(result);
}

export function _terminateJobSend(
  context: Client,
  jobId: string,
  options: TerminateJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}/terminate{?api%2Dversion,timeOut,force}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      force: options?.force,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
    body: !options["options"]
      ? options["options"]
      : batchJobTerminateOptionsSerializer(options["options"]),
  });
}

export async function _terminateJobDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

export async function _terminateJob(
  context: Client,
  jobId: string,
  options: TerminateJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _terminateJobSend(context, jobId, options);
  return _terminateJobDeserialize(result);
}

/**
 * When a Terminate Job request is received, the Batch service sets the Job to the
 * terminating state. The Batch service then terminates any running Tasks
 * associated with the Job and runs any required Job release Tasks. Then the Job
 * moves into the completed state. If there are any Tasks in the Job in the active
 * state, they will remain in the active state. Once a Job is terminated, new
 * Tasks cannot be added and any remaining active Tasks will not be scheduled.
 */
export function terminateJob(
  context: Client,
  jobId: string,
  options: TerminateJobOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return createTerminateJobPoller(context, jobId, options);
}

export function _enableJobSend(
  context: Client,
  jobId: string,
  options: EnableJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}/enable{?api%2Dversion,timeOut}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _enableJobDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

export async function _enableJob(
  context: Client,
  jobId: string,
  options: EnableJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _enableJobSend(context, jobId, options);
  return _enableJobDeserialize(result);
}

/**
 * When you call this API, the Batch service sets a disabled Job to the enabling
 * state. After the this operation is completed, the Job moves to the active
 * state, and scheduling of new Tasks under the Job resumes. The Batch service
 * does not allow a Task to remain in the active state for more than 180 days.
 * Therefore, if you enable a Job containing active Tasks which were added more
 * than 180 days ago, those Tasks will not run.
 */
export function enableJob(
  context: Client,
  jobId: string,
  options: EnableJobOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return createEnableJobPoller(context, jobId, options);
}

export function _disableJobSend(
  context: Client,
  jobId: string,
  disableOptions: BatchJobDisableOptions,
  options: DisableJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}/disable{?api%2Dversion,timeOut}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
    body: batchJobDisableOptionsSerializer(disableOptions),
  });
}

export async function _disableJobDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

export async function _disableJob(
  context: Client,
  jobId: string,
  disableOptions: BatchJobDisableOptions,
  options: DisableJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _disableJobSend(context, jobId, disableOptions, options);
  return _disableJobDeserialize(result);
}

/**
 * The Batch Service immediately moves the Job to the disabling state. Batch then
 * uses the disableTasks parameter to determine what to do with the currently
 * running Tasks of the Job. The Job remains in the disabling state until the
 * disable operation is completed and all Tasks have been dealt with according to
 * the disableTasks option; the Job then moves to the disabled state. No new Tasks
 * are started under the Job until it moves back to active state. If you try to
 * disable a Job that is in any state other than active, disabling, or disabled,
 * the request fails with status code 409.
 */
export function disableJob(
  context: Client,
  jobId: string,
  disableOptions: BatchJobDisableOptions,
  options: DisableJobOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return createDisableJobPoller(context, jobId, disableOptions, options);
}

export function _replaceJobSend(
  context: Client,
  jobId: string,
  job: BatchJob,
  options: ReplaceJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}{?api%2Dversion,timeOut}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
    body: batchJobSerializer(job),
  });
}

export async function _replaceJobDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * This fully replaces all the updatable properties of the Job. For example, if
 * the Job has constraints associated with it and if constraints is not specified
 * with this request, then the Batch service will remove the existing constraints.
 */
export async function replaceJob(
  context: Client,
  jobId: string,
  job: BatchJob,
  options: ReplaceJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _replaceJobSend(context, jobId, job, options);
  return _replaceJobDeserialize(result);
}

export function _updateJobSend(
  context: Client,
  jobId: string,
  job: BatchJobUpdateOptions,
  options: UpdateJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}{?api%2Dversion,timeOut}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
    body: batchJobUpdateOptionsSerializer(job),
  });
}

export async function _updateJobDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * This replaces only the Job properties specified in the request. For example, if
 * the Job has constraints, and a request does not specify the constraints
 * element, then the Job keeps the existing constraints.
 */
export async function updateJob(
  context: Client,
  jobId: string,
  job: BatchJobUpdateOptions,
  options: UpdateJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateJobSend(context, jobId, job, options);
  return _updateJobDeserialize(result);
}

export function _getJobSend(
  context: Client,
  jobId: string,
  options: GetJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}{?api%2Dversion,timeOut,%24select,%24expand}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      "%24select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      "%24expand": !options?.expand
        ? options?.expand
        : options?.expand.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getJobDeserialize(result: PathUncheckedResponse): Promise<BatchJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return batchJobDeserializer(result.body);
}

/** Gets information about the specified Job. */
export async function getJob(
  context: Client,
  jobId: string,
  options: GetJobOptionalParams = { requestOptions: {} },
): Promise<BatchJob> {
  const result = await _getJobSend(context, jobId, options);
  return _getJobDeserialize(result);
}

export function _deleteJobSend(
  context: Client,
  jobId: string,
  options: DeleteJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{jobId}{?api%2Dversion,timeOut,force}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      force: options?.force,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteJobDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

export async function _deleteJob(
  context: Client,
  jobId: string,
  options: DeleteJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteJobSend(context, jobId, options);
  return _deleteJobDeserialize(result);
}

/**
 * Deleting a Job also deletes all Tasks that are part of that Job, and all Job
 * statistics. This also overrides the retention period for Task data; that is, if
 * the Job contains Tasks which are still retained on Compute Nodes, the Batch
 * services deletes those Tasks' working directories and all their contents.  When
 * a Delete Job request is received, the Batch service sets the Job to the
 * deleting state. All update operations on a Job that is in deleting state will
 * fail with status code 409 (Conflict), with additional information indicating
 * that the Job is being deleted.
 */
export function deleteJob(
  context: Client,
  jobId: string,
  options: DeleteJobOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return createDeleteJobPoller(context, jobId, options);
}

export function _listPoolNodeCountsSend(
  context: Client,
  options: ListPoolNodeCountsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/nodecounts{?api%2Dversion,timeOut,maxresults,%24filter}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      maxresults: options?.maxresults,
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listPoolNodeCountsDeserialize(
  result: PathUncheckedResponse,
): Promise<_BatchPoolNodeCountsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return _batchPoolNodeCountsListResultDeserializer(result.body);
}

/**
 * Gets the number of Compute Nodes in each state, grouped by Pool. Note that the
 * numbers returned may not always be up to date. If you need exact node counts,
 * use a list query.
 */
export function listPoolNodeCounts(
  context: Client,
  options: ListPoolNodeCountsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BatchPoolNodeCounts> {
  return buildPagedAsyncIterator(
    context,
    () => _listPoolNodeCountsSend(context, options),
    _listPoolNodeCountsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "odata.nextLink",
      apiVersion: context.apiVersion ?? "2025-06-01",
    },
  );
}

export function _listSupportedImagesSend(
  context: Client,
  options: ListSupportedImagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/supportedimages{?api%2Dversion,timeOut,maxresults,%24filter}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      maxresults: options?.maxresults,
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listSupportedImagesDeserialize(
  result: PathUncheckedResponse,
): Promise<_BatchAccountListSupportedImagesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return _batchAccountListSupportedImagesResultDeserializer(result.body);
}

/** Lists all Virtual Machine Images supported by the Azure Batch service. */
export function listSupportedImages(
  context: Client,
  options: ListSupportedImagesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BatchSupportedImage> {
  return buildPagedAsyncIterator(
    context,
    () => _listSupportedImagesSend(context, options),
    _listSupportedImagesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "odata.nextLink",
      apiVersion: context.apiVersion ?? "2025-06-01",
    },
  );
}

export function _removeNodesSend(
  context: Client,
  poolId: string,
  removeOptions: BatchNodeRemoveOptions,
  options: RemoveNodesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/removenodes{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
    body: batchNodeRemoveOptionsSerializer(removeOptions),
  });
}

export async function _removeNodesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

export async function _removeNodes(
  context: Client,
  poolId: string,
  removeOptions: BatchNodeRemoveOptions,
  options: RemoveNodesOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _removeNodesSend(context, poolId, removeOptions, options);
  return _removeNodesDeserialize(result);
}

/**
 * This operation can only run when the allocation state of the Pool is steady.
 * When this operation runs, the allocation state changes from steady to resizing.
 * Each request may remove up to 100 nodes.
 */
export function removeNodes(
  context: Client,
  poolId: string,
  removeOptions: BatchNodeRemoveOptions,
  options: RemoveNodesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return createRemoveNodesPoller(context, poolId, removeOptions, options);
}

export function _replacePoolPropertiesSend(
  context: Client,
  poolId: string,
  pool: BatchPoolReplaceOptions,
  options: ReplacePoolPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/updateproperties{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: batchPoolReplaceOptionsSerializer(pool),
  });
}

export async function _replacePoolPropertiesDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * This fully replaces all the updatable properties of the Pool. For example, if
 * the Pool has a StartTask associated with it and if StartTask is not specified
 * with this request, then the Batch service will remove the existing StartTask.
 */
export async function replacePoolProperties(
  context: Client,
  poolId: string,
  pool: BatchPoolReplaceOptions,
  options: ReplacePoolPropertiesOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _replacePoolPropertiesSend(context, poolId, pool, options);
  return _replacePoolPropertiesDeserialize(result);
}

export function _stopPoolResizeSend(
  context: Client,
  poolId: string,
  options: StopPoolResizeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/stopresize{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _stopPoolResizeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

export async function _stopPoolResize(
  context: Client,
  poolId: string,
  options: StopPoolResizeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopPoolResizeSend(context, poolId, options);
  return _stopPoolResizeDeserialize(result);
}

/**
 * This does not restore the Pool to its previous state before the resize
 * operation: it only stops any further changes being made, and the Pool maintains
 * its current state. After stopping, the Pool stabilizes at the number of Compute
 * Nodes it was at when the stop operation was done. During the stop operation,
 * the Pool allocation state changes first to stopping and then to steady. A
 * resize operation need not be an explicit resize Pool request; this API can also
 * be used to halt the initial sizing of the Pool when it is created.
 */
export function stopPoolResize(
  context: Client,
  poolId: string,
  options: StopPoolResizeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return createStopPoolResizePoller(context, poolId, options);
}

export function _resizePoolSend(
  context: Client,
  poolId: string,
  resizeOptions: BatchPoolResizeOptions,
  options: ResizePoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/resize{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
    body: batchPoolResizeOptionsSerializer(resizeOptions),
  });
}

export async function _resizePoolDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

export async function _resizePool(
  context: Client,
  poolId: string,
  resizeOptions: BatchPoolResizeOptions,
  options: ResizePoolOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resizePoolSend(context, poolId, resizeOptions, options);
  return _resizePoolDeserialize(result);
}

/**
 * You can only resize a Pool when its allocation state is steady. If the Pool is
 * already resizing, the request fails with status code 409. When you resize a
 * Pool, the Pool's allocation state changes from steady to resizing. You cannot
 * resize Pools which are configured for automatic scaling. If you try to do this,
 * the Batch service returns an error 409. If you resize a Pool downwards, the
 * Batch service chooses which Compute Nodes to remove. To remove specific Compute
 * Nodes, use the Pool remove Compute Nodes API instead.
 */
export function resizePool(
  context: Client,
  poolId: string,
  resizeOptions: BatchPoolResizeOptions,
  options: ResizePoolOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return createResizePoolPoller(context, poolId, resizeOptions, options);
}

export function _evaluatePoolAutoScaleSend(
  context: Client,
  poolId: string,
  evaluateAutoScaleOptions: BatchPoolEvaluateAutoScaleOptions,
  options: EvaluatePoolAutoScaleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/evaluateautoscale{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: batchPoolEvaluateAutoScaleOptionsSerializer(evaluateAutoScaleOptions),
  });
}

export async function _evaluatePoolAutoScaleDeserialize(
  result: PathUncheckedResponse,
): Promise<AutoScaleRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return autoScaleRunDeserializer(result.body);
}

/**
 * This API is primarily for validating an autoscale formula, as it simply returns
 * the result without applying the formula to the Pool. The Pool must have auto
 * scaling enabled in order to evaluate a formula.
 */
export async function evaluatePoolAutoScale(
  context: Client,
  poolId: string,
  evaluateAutoScaleOptions: BatchPoolEvaluateAutoScaleOptions,
  options: EvaluatePoolAutoScaleOptionalParams = { requestOptions: {} },
): Promise<AutoScaleRun> {
  const result = await _evaluatePoolAutoScaleSend(
    context,
    poolId,
    evaluateAutoScaleOptions,
    options,
  );
  return _evaluatePoolAutoScaleDeserialize(result);
}

export function _enablePoolAutoScaleSend(
  context: Client,
  poolId: string,
  enableAutoScaleOptions: BatchPoolEnableAutoScaleOptions,
  options: EnablePoolAutoScaleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/enableautoscale{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
    body: batchPoolEnableAutoScaleOptionsSerializer(enableAutoScaleOptions),
  });
}

export async function _enablePoolAutoScaleDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * You cannot enable automatic scaling on a Pool if a resize operation is in
 * progress on the Pool. If automatic scaling of the Pool is currently disabled,
 * you must specify a valid autoscale formula as part of the request. If automatic
 * scaling of the Pool is already enabled, you may specify a new autoscale formula
 * and/or a new evaluation interval. You cannot call this API for the same Pool
 * more than once every 30 seconds.
 */
export async function enablePoolAutoScale(
  context: Client,
  poolId: string,
  enableAutoScaleOptions: BatchPoolEnableAutoScaleOptions,
  options: EnablePoolAutoScaleOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _enablePoolAutoScaleSend(context, poolId, enableAutoScaleOptions, options);
  return _enablePoolAutoScaleDeserialize(result);
}

export function _disablePoolAutoScaleSend(
  context: Client,
  poolId: string,
  options: DisablePoolAutoScaleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}/disableautoscale{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _disablePoolAutoScaleDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Disables automatic scaling for a Pool. */
export async function disablePoolAutoScale(
  context: Client,
  poolId: string,
  options: DisablePoolAutoScaleOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _disablePoolAutoScaleSend(context, poolId, options);
  return _disablePoolAutoScaleDeserialize(result);
}

export function _updatePoolSend(
  context: Client,
  poolId: string,
  pool: BatchPoolUpdateOptions,
  options: UpdatePoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
    body: batchPoolUpdateOptionsSerializer(pool),
  });
}

export async function _updatePoolDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * This only replaces the Pool properties specified in the request. For example,
 * if the Pool has a StartTask associated with it, and a request does not specify
 * a StartTask element, then the Pool keeps the existing StartTask.
 */
export async function updatePool(
  context: Client,
  poolId: string,
  pool: BatchPoolUpdateOptions,
  options: UpdatePoolOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updatePoolSend(context, poolId, pool, options);
  return _updatePoolDeserialize(result);
}

export function _getPoolSend(
  context: Client,
  poolId: string,
  options: GetPoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}{?api%2Dversion,timeOut,%24select,%24expand}",
    {
      poolId: poolId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      "%24select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      "%24expand": !options?.expand
        ? options?.expand
        : options?.expand.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getPoolDeserialize(result: PathUncheckedResponse): Promise<BatchPool> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return batchPoolDeserializer(result.body);
}

/** Gets information about the specified Pool. */
export async function getPool(
  context: Client,
  poolId: string,
  options: GetPoolOptionalParams = { requestOptions: {} },
): Promise<BatchPool> {
  const result = await _getPoolSend(context, poolId, options);
  return _getPoolDeserialize(result);
}

export function _poolExistsSend(
  context: Client,
  poolId: string,
  options: PoolExistsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _poolExistsDeserialize(result: PathUncheckedResponse): Promise<boolean> {
  const expectedStatuses = ["404", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return result.status === "200";
}

/** Gets basic properties of a Pool. */
export async function poolExists(
  context: Client,
  poolId: string,
  options: PoolExistsOptionalParams = { requestOptions: {} },
): Promise<boolean> {
  const result = await _poolExistsSend(context, poolId, options);
  return _poolExistsDeserialize(result);
}

export function _deletePoolSend(
  context: Client,
  poolId: string,
  options: DeletePoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools/{poolId}{?api%2Dversion,timeOut}",
    {
      poolId: poolId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...(options?.ifModifiedSince !== undefined
        ? {
            "if-modified-since": !options?.ifModifiedSince
              ? options?.ifModifiedSince
              : options?.ifModifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifUnmodifiedSince !== undefined
        ? {
            "if-unmodified-since": !options?.ifUnmodifiedSince
              ? options?.ifUnmodifiedSince
              : options?.ifUnmodifiedSince.toUTCString(),
          }
        : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deletePoolDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

export async function _deletePool(
  context: Client,
  poolId: string,
  options: DeletePoolOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deletePoolSend(context, poolId, options);
  return _deletePoolDeserialize(result);
}

/**
 * When you request that a Pool be deleted, the following actions occur: the Pool
 * state is set to deleting; any ongoing resize operation on the Pool are stopped;
 * the Batch service starts resizing the Pool to zero Compute Nodes; any Tasks
 * running on existing Compute Nodes are terminated and requeued (as if a resize
 * Pool operation had been requested with the default requeue option); finally,
 * the Pool is removed from the system. Because running Tasks are requeued, the
 * user can rerun these Tasks by updating their Job to target a different Pool.
 * The Tasks can then run on the new Pool. If you want to override the requeue
 * behavior, then you should call resize Pool explicitly to shrink the Pool to
 * zero size before deleting the Pool. If you call an Update, Patch or Delete API
 * on a Pool in the deleting state, it will fail with HTTP status code 409 with
 * error code PoolBeingDeleted.
 */
export function deletePool(
  context: Client,
  poolId: string,
  options: DeletePoolOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return createDeletePoolPoller(context, poolId, options);
}

export function _listPoolsSend(
  context: Client,
  options: ListPoolsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools{?api%2Dversion,timeOut,maxresults,%24filter,%24select,%24expand}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      maxresults: options?.maxresults,
      "%24filter": options?.filter,
      "%24select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      "%24expand": !options?.expand
        ? options?.expand
        : options?.expand.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listPoolsDeserialize(
  result: PathUncheckedResponse,
): Promise<_BatchPoolListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return _batchPoolListResultDeserializer(result.body);
}

/** Lists all of the Pools in the specified Account. */
export function listPools(
  context: Client,
  options: ListPoolsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BatchPool> {
  return buildPagedAsyncIterator(
    context,
    () => _listPoolsSend(context, options),
    _listPoolsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "odata.nextLink",
      apiVersion: context.apiVersion ?? "2025-06-01",
    },
  );
}

export function _createPoolSend(
  context: Client,
  pool: BatchPoolCreateOptions,
  options: CreatePoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/pools{?api%2Dversion,timeOut}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json; odata=minimalmetadata",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: batchPoolCreateOptionsSerializer(pool),
  });
}

export async function _createPoolDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * When naming Pools, avoid including sensitive information such as user names or
 * secret project names. This information may appear in telemetry logs accessible
 * to Microsoft Support engineers.
 */
export async function createPool(
  context: Client,
  pool: BatchPoolCreateOptions,
  options: CreatePoolOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _createPoolSend(context, pool, options);
  return _createPoolDeserialize(result);
}

export function _listPoolUsageMetricsSend(
  context: Client,
  options: ListPoolUsageMetricsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/poolusagemetrics{?api%2Dversion,timeOut,maxresults,startTime,endtime,%24filter}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      maxresults: options?.maxresults,
      startTime: !options?.starttime ? options?.starttime : options?.starttime.toISOString(),
      endtime: !options?.endtime ? options?.endtime : options?.endtime.toISOString(),
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listPoolUsageMetricsDeserialize(
  result: PathUncheckedResponse,
): Promise<_BatchPoolListUsageMetricsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return _batchPoolListUsageMetricsResultDeserializer(result.body);
}

/**
 * If you do not specify a $filter clause including a poolId, the response
 * includes all Pools that existed in the Account in the time range of the
 * returned aggregation intervals. If you do not specify a $filter clause
 * including a startTime or endTime these filters default to the start and end
 * times of the last aggregation interval currently available; that is, only the
 * last aggregation interval is returned.
 */
export function listPoolUsageMetrics(
  context: Client,
  options: ListPoolUsageMetricsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BatchPoolUsageMetrics> {
  return buildPagedAsyncIterator(
    context,
    () => _listPoolUsageMetricsSend(context, options),
    _listPoolUsageMetricsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "odata.nextLink",
      apiVersion: context.apiVersion ?? "2025-06-01",
    },
  );
}

export function _getApplicationSend(
  context: Client,
  applicationId: string,
  options: GetApplicationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/applications/{applicationId}{?api%2Dversion,timeOut}",
    {
      applicationId: applicationId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getApplicationDeserialize(
  result: PathUncheckedResponse,
): Promise<BatchApplication> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return batchApplicationDeserializer(result.body);
}

/**
 * This operation returns only Applications and versions that are available for
 * use on Compute Nodes; that is, that can be used in an Package reference. For
 * administrator information about Applications and versions that are not yet
 * available to Compute Nodes, use the Azure portal or the Azure Resource Manager
 * API.
 */
export async function getApplication(
  context: Client,
  applicationId: string,
  options: GetApplicationOptionalParams = { requestOptions: {} },
): Promise<BatchApplication> {
  const result = await _getApplicationSend(context, applicationId, options);
  return _getApplicationDeserialize(result);
}

export function _listApplicationsSend(
  context: Client,
  options: ListApplicationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/applications{?api%2Dversion,timeOut,maxresults}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      timeOut: options?.timeOutInSeconds,
      maxresults: options?.maxresults,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.returnClientRequestId !== undefined
        ? { "return-client-request-id": options?.returnClientRequestId }
        : {}),
      ...(options?.ocpdate !== undefined
        ? { "ocp-date": !options?.ocpdate ? options?.ocpdate : options?.ocpdate.toUTCString() }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listApplicationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_BatchApplicationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = batchErrorDeserializer(result.body);
    throw error;
  }

  return _batchApplicationListResultDeserializer(result.body);
}

/**
 * This operation returns only Applications and versions that are available for
 * use on Compute Nodes; that is, that can be used in an Package reference. For
 * administrator information about applications and versions that are not yet
 * available to Compute Nodes, use the Azure portal or the Azure Resource Manager
 * API.
 */
export function listApplications(
  context: Client,
  options: ListApplicationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BatchApplication> {
  return buildPagedAsyncIterator(
    context,
    () => _listApplicationsSend(context, options),
    _listApplicationsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "odata.nextLink",
      apiVersion: context.apiVersion ?? "2025-06-01",
    },
  );
}
