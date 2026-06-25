// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EasmContext as Client } from "./index.js";
import {
  _PagedAssetResource,
  _pagedAssetResourceDeserializer,
  assetResourceUnionDeserializer,
  AssetResourceUnion,
  AssetUpdateData,
  assetUpdateDataSerializer,
  Task,
  taskDeserializer,
  AssetsExportRequest,
  assetsExportRequestSerializer,
  ObservationPageResult,
  observationPageResultDeserializer,
  DeltaDetailsRequest,
  deltaDetailsRequestSerializer,
  _DeltaPageResult,
  _deltaPageResultDeserializer,
  DeltaResult,
  DeltaSummaryRequest,
  deltaSummaryRequestSerializer,
  DeltaSummaryResult,
  deltaSummaryResultDeserializer,
  _PagedDataConnection,
  _pagedDataConnectionDeserializer,
  dataConnectionUnionDeserializer,
  DataConnectionUnion,
  dataConnectionDataUnionSerializer,
  DataConnectionDataUnion,
  ValidateResult,
  validateResultDeserializer,
  _PagedDiscoGroup,
  _pagedDiscoGroupDeserializer,
  DiscoGroup,
  discoGroupDeserializer,
  DiscoRunResult,
  DiscoGroupData,
  discoGroupDataSerializer,
  _DiscoRunPageResult,
  _discoRunPageResultDeserializer,
  AssetChainRequest,
  assetChainRequestSerializer,
  AssetChainSummaryResult,
  assetChainSummaryResultDeserializer,
  _PagedDiscoTemplate,
  _pagedDiscoTemplateDeserializer,
  DiscoTemplate,
  discoTemplateDeserializer,
  ReportBillableAssetSummaryResult,
  reportBillableAssetSummaryResultDeserializer,
  ReportAssetSnapshotRequest,
  reportAssetSnapshotRequestSerializer,
  ReportAssetSnapshotResult,
  reportAssetSnapshotResultDeserializer,
  ReportAssetSummaryRequest,
  reportAssetSummaryRequestSerializer,
  ReportAssetSummaryResult,
  reportAssetSummaryResultDeserializer,
  ReportAssetSnapshotExportRequest,
  reportAssetSnapshotExportRequestSerializer,
  _PagedSavedFilter,
  _pagedSavedFilterDeserializer,
  SavedFilter,
  savedFilterDeserializer,
  SavedFilterData,
  savedFilterDataSerializer,
  _PagedTask,
  _pagedTaskDeserializer,
  _PagedCisaCveResult,
  _pagedCisaCveResultDeserializer,
  CisaCveResult,
  cisaCveResultDeserializer,
  _PagedPolicy,
  _pagedPolicyDeserializer,
  Policy,
  policySerializer,
  policyDeserializer,
} from "../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import {
  CreateOrReplacePolicyOptionalParams,
  DeletePolicyOptionalParams,
  GetPolicyOptionalParams,
  ListPolicyOptionalParams,
  GetCisaCveOptionalParams,
  GetCisaCvesOptionalParams,
  DownloadTaskOptionalParams,
  RunTaskOptionalParams,
  CancelTaskOptionalParams,
  GetTaskOptionalParams,
  ListTaskOptionalParams,
  DeleteSavedFilterOptionalParams,
  CreateOrReplaceSavedFilterOptionalParams,
  GetSavedFilterOptionalParams,
  ListSavedFilterOptionalParams,
  GetSnapshotExportOptionalParams,
  GetSummaryOptionalParams,
  GetSnapshotOptionalParams,
  GetBillableOptionalParams,
  GetDiscoTemplateOptionalParams,
  ListDiscoTemplateOptionalParams,
  DismissAssetChainOptionalParams,
  GetAssetChainSummaryOptionalParams,
  ListRunsOptionalParams,
  RunDiscoGroupOptionalParams,
  CreateOrReplaceDiscoGroupOptionalParams,
  DeleteDiscoGroupOptionalParams,
  GetDiscoGroupOptionalParams,
  ValidateDiscoGroupOptionalParams,
  ListDiscoGroupOptionalParams,
  DeleteDataConnectionOptionalParams,
  CreateOrReplaceDataConnectionOptionalParams,
  GetDataConnectionOptionalParams,
  ValidateDataConnectionOptionalParams,
  ListDataConnectionOptionalParams,
  GetDeltaSummaryOptionalParams,
  GetDeltaDetailsOptionalParams,
  GetObservationsOptionalParams,
  GetAssetsExportOptionalParams,
  GetAssetResourceOptionalParams,
  UpdateAssetsOptionalParams,
  ListAssetResourceOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _createOrReplacePolicySend(
  context: Client,
  policyName: string,
  body: Policy,
  options: CreateOrReplacePolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/policies/{policyName}{?api%2Dversion}",
    {
      policyName: policyName,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: policySerializer(body),
    });
}

export async function _createOrReplacePolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<Policy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return policyDeserializer(result.body);
}

/** Create a policy with a given policyName. */
export async function createOrReplacePolicy(
  context: Client,
  policyName: string,
  body: Policy,
  options: CreateOrReplacePolicyOptionalParams = { requestOptions: {} },
): Promise<Policy> {
  const result = await _createOrReplacePolicySend(context, policyName, body, options);
  return _createOrReplacePolicyDeserialize(result);
}

export function _deletePolicySend(
  context: Client,
  policyName: string,
  options: DeletePolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/policies/{policyName}{?api%2Dversion}",
    {
      policyName: policyName,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deletePolicyDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a policy with a given policyName. */
export async function deletePolicy(
  context: Client,
  policyName: string,
  options: DeletePolicyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deletePolicySend(context, policyName, options);
  return _deletePolicyDeserialize(result);
}

export function _getPolicySend(
  context: Client,
  policyName: string,
  options: GetPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/policies/{policyName}{?api%2Dversion}",
    {
      policyName: policyName,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getPolicyDeserialize(result: PathUncheckedResponse): Promise<Policy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return policyDeserializer(result.body);
}

/** Retrieve a policy with a given policyName. */
export async function getPolicy(
  context: Client,
  policyName: string,
  options: GetPolicyOptionalParams = { requestOptions: {} },
): Promise<Policy> {
  const result = await _getPolicySend(context, policyName, options);
  return _getPolicyDeserialize(result);
}

export function _listPolicySend(
  context: Client,
  options: ListPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/policies{?api%2Dversion,filter,skip,maxpagesize}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
      filter: options?.filter,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listPolicyDeserialize(result: PathUncheckedResponse): Promise<_PagedPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedPolicyDeserializer(result.body);
}

/** Retrieve a list of policies for the provided search parameters. */
export function listPolicy(
  context: Client,
  options: ListPolicyOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Policy> {
  return buildPagedAsyncIterator(
    context,
    () => _listPolicySend(context, options),
    _listPolicyDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-10-01-preview",
    },
  );
}

export function _getCisaCveSend(
  context: Client,
  cveId: string,
  options: GetCisaCveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/cisaCves/{cveId}{?api%2Dversion}",
    {
      cveId: cveId,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getCisaCveDeserialize(
  result: PathUncheckedResponse,
): Promise<CisaCveResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return cisaCveResultDeserializer(result.body);
}

/** Retrieve details of CisaCve by cveId */
export async function getCisaCve(
  context: Client,
  cveId: string,
  options: GetCisaCveOptionalParams = { requestOptions: {} },
): Promise<CisaCveResult> {
  const result = await _getCisaCveSend(context, cveId, options);
  return _getCisaCveDeserialize(result);
}

export function _getCisaCvesSend(
  context: Client,
  options: GetCisaCvesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/cisaCves{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getCisaCvesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedCisaCveResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedCisaCveResultDeserializer(result.body);
}

/** Retrieve a list of CisaCves for the provided search parameters. */
export function getCisaCves(
  context: Client,
  options: GetCisaCvesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CisaCveResult> {
  return buildPagedAsyncIterator(
    context,
    () => _getCisaCvesSend(context, options),
    _getCisaCvesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-10-01-preview",
    },
  );
}

export function _downloadTaskSend(
  context: Client,
  taskId: string,
  options: DownloadTaskOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tasks/{taskId}:download{?api%2Dversion}",
    {
      taskId: taskId,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _downloadTaskDeserialize(result: PathUncheckedResponse): Promise<Task> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return taskDeserializer(result.body);
}

/** Download a task. */
export async function downloadTask(
  context: Client,
  taskId: string,
  options: DownloadTaskOptionalParams = { requestOptions: {} },
): Promise<Task> {
  const result = await _downloadTaskSend(context, taskId, options);
  return _downloadTaskDeserialize(result);
}

export function _runTaskSend(
  context: Client,
  taskId: string,
  options: RunTaskOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tasks/{taskId}:run{?api%2Dversion}",
    {
      taskId: taskId,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _runTaskDeserialize(result: PathUncheckedResponse): Promise<Task> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return taskDeserializer(result.body);
}

/** Run a task by taskId. */
export async function runTask(
  context: Client,
  taskId: string,
  options: RunTaskOptionalParams = { requestOptions: {} },
): Promise<Task> {
  const result = await _runTaskSend(context, taskId, options);
  return _runTaskDeserialize(result);
}

export function _cancelTaskSend(
  context: Client,
  taskId: string,
  options: CancelTaskOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tasks/{taskId}:cancel{?api%2Dversion}",
    {
      taskId: taskId,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _cancelTaskDeserialize(result: PathUncheckedResponse): Promise<Task> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return taskDeserializer(result.body);
}

/** Cancel a task by taskId. */
export async function cancelTask(
  context: Client,
  taskId: string,
  options: CancelTaskOptionalParams = { requestOptions: {} },
): Promise<Task> {
  const result = await _cancelTaskSend(context, taskId, options);
  return _cancelTaskDeserialize(result);
}

export function _getTaskSend(
  context: Client,
  taskId: string,
  options: GetTaskOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tasks/{taskId}{?api%2Dversion}",
    {
      taskId: taskId,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getTaskDeserialize(result: PathUncheckedResponse): Promise<Task> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return taskDeserializer(result.body);
}

/** Retrieve a task by taskId. */
export async function getTask(
  context: Client,
  taskId: string,
  options: GetTaskOptionalParams = { requestOptions: {} },
): Promise<Task> {
  const result = await _getTaskSend(context, taskId, options);
  return _getTaskDeserialize(result);
}

export function _listTaskSend(
  context: Client,
  options: ListTaskOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tasks{?api%2Dversion,filter,orderby,skip,maxpagesize}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
      filter: options?.filter,
      orderby: options?.orderby,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listTaskDeserialize(result: PathUncheckedResponse): Promise<_PagedTask> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedTaskDeserializer(result.body);
}

/** Retrieve a list of tasks for the provided search parameters. */
export function listTask(
  context: Client,
  options: ListTaskOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Task> {
  return buildPagedAsyncIterator(
    context,
    () => _listTaskSend(context, options),
    _listTaskDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-10-01-preview",
    },
  );
}

export function _deleteSavedFilterSend(
  context: Client,
  filterName: string,
  options: DeleteSavedFilterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/savedFilters/{filterName}{?api%2Dversion}",
    {
      filterName: filterName,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSavedFilterDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a saved filter with a given filterName. */
export async function deleteSavedFilter(
  context: Client,
  filterName: string,
  options: DeleteSavedFilterOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSavedFilterSend(context, filterName, options);
  return _deleteSavedFilterDeserialize(result);
}

export function _createOrReplaceSavedFilterSend(
  context: Client,
  filterName: string,
  body: SavedFilterData,
  options: CreateOrReplaceSavedFilterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/savedFilters/{filterName}{?api%2Dversion}",
    {
      filterName: filterName,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: savedFilterDataSerializer(body),
    });
}

export async function _createOrReplaceSavedFilterDeserialize(
  result: PathUncheckedResponse,
): Promise<SavedFilter> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return savedFilterDeserializer(result.body);
}

/** Create or replace a saved filter with a given filterName. */
export async function createOrReplaceSavedFilter(
  context: Client,
  filterName: string,
  body: SavedFilterData,
  options: CreateOrReplaceSavedFilterOptionalParams = { requestOptions: {} },
): Promise<SavedFilter> {
  const result = await _createOrReplaceSavedFilterSend(context, filterName, body, options);
  return _createOrReplaceSavedFilterDeserialize(result);
}

export function _getSavedFilterSend(
  context: Client,
  filterName: string,
  options: GetSavedFilterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/savedFilters/{filterName}{?api%2Dversion}",
    {
      filterName: filterName,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getSavedFilterDeserialize(
  result: PathUncheckedResponse,
): Promise<SavedFilter> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return savedFilterDeserializer(result.body);
}

/** Retrieve a saved filter by filterName. */
export async function getSavedFilter(
  context: Client,
  filterName: string,
  options: GetSavedFilterOptionalParams = { requestOptions: {} },
): Promise<SavedFilter> {
  const result = await _getSavedFilterSend(context, filterName, options);
  return _getSavedFilterDeserialize(result);
}

export function _listSavedFilterSend(
  context: Client,
  options: ListSavedFilterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/savedFilters{?api%2Dversion,filter,skip,maxpagesize}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
      filter: options?.filter,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listSavedFilterDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedSavedFilter> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedSavedFilterDeserializer(result.body);
}

/** Retrieve a list of saved filters for the provided search parameters. */
export function listSavedFilter(
  context: Client,
  options: ListSavedFilterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SavedFilter> {
  return buildPagedAsyncIterator(
    context,
    () => _listSavedFilterSend(context, options),
    _listSavedFilterDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-10-01-preview",
    },
  );
}

export function _getSnapshotExportSend(
  context: Client,
  body: ReportAssetSnapshotExportRequest,
  options: GetSnapshotExportOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/reports/assets:getSnapshotExport{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: reportAssetSnapshotExportRequestSerializer(body),
    });
}

export async function _getSnapshotExportDeserialize(result: PathUncheckedResponse): Promise<Task> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return taskDeserializer(result.body);
}

/** Get the most recent snapshot of asset summary values for the snapshot request exported to a file. */
export async function getSnapshotExport(
  context: Client,
  body: ReportAssetSnapshotExportRequest,
  options: GetSnapshotExportOptionalParams = { requestOptions: {} },
): Promise<Task> {
  const result = await _getSnapshotExportSend(context, body, options);
  return _getSnapshotExportDeserialize(result);
}

export function _getSummarySend(
  context: Client,
  body: ReportAssetSummaryRequest,
  options: GetSummaryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/reports/assets:getSummary{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: reportAssetSummaryRequestSerializer(body),
    });
}

export async function _getSummaryDeserialize(
  result: PathUncheckedResponse,
): Promise<ReportAssetSummaryResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return reportAssetSummaryResultDeserializer(result.body);
}

/** Get asset summary details for the summary request. */
export async function getSummary(
  context: Client,
  body: ReportAssetSummaryRequest,
  options: GetSummaryOptionalParams = { requestOptions: {} },
): Promise<ReportAssetSummaryResult> {
  const result = await _getSummarySend(context, body, options);
  return _getSummaryDeserialize(result);
}

export function _getSnapshotSend(
  context: Client,
  body: ReportAssetSnapshotRequest,
  options: GetSnapshotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/reports/assets:getSnapshot{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: reportAssetSnapshotRequestSerializer(body),
    });
}

export async function _getSnapshotDeserialize(
  result: PathUncheckedResponse,
): Promise<ReportAssetSnapshotResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return reportAssetSnapshotResultDeserializer(result.body);
}

/** Get the most recent snapshot of asset summary values for the snapshot request. */
export async function getSnapshot(
  context: Client,
  body: ReportAssetSnapshotRequest,
  options: GetSnapshotOptionalParams = { requestOptions: {} },
): Promise<ReportAssetSnapshotResult> {
  const result = await _getSnapshotSend(context, body, options);
  return _getSnapshotDeserialize(result);
}

export function _getBillableSend(
  context: Client,
  options: GetBillableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/reports/assets:getBillable{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getBillableDeserialize(
  result: PathUncheckedResponse,
): Promise<ReportBillableAssetSummaryResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return reportBillableAssetSummaryResultDeserializer(result.body);
}

/** Get billable assets summary for the workspace. */
export async function getBillable(
  context: Client,
  options: GetBillableOptionalParams = { requestOptions: {} },
): Promise<ReportBillableAssetSummaryResult> {
  const result = await _getBillableSend(context, options);
  return _getBillableDeserialize(result);
}

export function _getDiscoTemplateSend(
  context: Client,
  templateId: string,
  options: GetDiscoTemplateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/discoTemplates/{templateId}{?api%2Dversion}",
    {
      templateId: templateId,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDiscoTemplateDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoTemplate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return discoTemplateDeserializer(result.body);
}

/** Retrieve a disco template with a given templateId. */
export async function getDiscoTemplate(
  context: Client,
  templateId: string,
  options: GetDiscoTemplateOptionalParams = { requestOptions: {} },
): Promise<DiscoTemplate> {
  const result = await _getDiscoTemplateSend(context, templateId, options);
  return _getDiscoTemplateDeserialize(result);
}

export function _listDiscoTemplateSend(
  context: Client,
  options: ListDiscoTemplateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/discoTemplates{?api%2Dversion,filter,skip,maxpagesize}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
      filter: options?.filter,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDiscoTemplateDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDiscoTemplate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedDiscoTemplateDeserializer(result.body);
}

/** Retrieve a list of disco templates for the provided search parameters. */
export function listDiscoTemplate(
  context: Client,
  options: ListDiscoTemplateOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DiscoTemplate> {
  return buildPagedAsyncIterator(
    context,
    () => _listDiscoTemplateSend(context, options),
    _listDiscoTemplateDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-10-01-preview",
    },
  );
}

export function _dismissAssetChainSend(
  context: Client,
  body: AssetChainRequest,
  options: DismissAssetChainOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/discoGroups:dismissAssetChain{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: assetChainRequestSerializer(body),
    });
}

export async function _dismissAssetChainDeserialize(result: PathUncheckedResponse): Promise<Task> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return taskDeserializer(result.body);
}

/** Dismiss discovery chain for a given asset chain source */
export async function dismissAssetChain(
  context: Client,
  body: AssetChainRequest,
  options: DismissAssetChainOptionalParams = { requestOptions: {} },
): Promise<Task> {
  const result = await _dismissAssetChainSend(context, body, options);
  return _dismissAssetChainDeserialize(result);
}

export function _getAssetChainSummarySend(
  context: Client,
  body: AssetChainRequest,
  options: GetAssetChainSummaryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/discoGroups:getAssetChainSummary{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: assetChainRequestSerializer(body),
    });
}

export async function _getAssetChainSummaryDeserialize(
  result: PathUncheckedResponse,
): Promise<AssetChainSummaryResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return assetChainSummaryResultDeserializer(result.body);
}

/** Retrieve an asset chain summary. */
export async function getAssetChainSummary(
  context: Client,
  body: AssetChainRequest,
  options: GetAssetChainSummaryOptionalParams = { requestOptions: {} },
): Promise<AssetChainSummaryResult> {
  const result = await _getAssetChainSummarySend(context, body, options);
  return _getAssetChainSummaryDeserialize(result);
}

export function _listRunsSend(
  context: Client,
  groupName: string,
  options: ListRunsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/discoGroups/{groupName}/runs{?api%2Dversion,filter,skip,maxpagesize}",
    {
      groupName: groupName,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
      filter: options?.filter,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listRunsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DiscoRunPageResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _discoRunPageResultDeserializer(result.body);
}

/** Retrieve a collection of discovery run results for a discovery group with a given groupName. */
export function listRuns(
  context: Client,
  groupName: string,
  options: ListRunsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DiscoRunResult> {
  return buildPagedAsyncIterator(
    context,
    () => _listRunsSend(context, groupName, options),
    _listRunsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-10-01-preview",
    },
  );
}

export function _runDiscoGroupSend(
  context: Client,
  groupName: string,
  options: RunDiscoGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/discoGroups/{groupName}:run{?api%2Dversion}",
    {
      groupName: groupName,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _runDiscoGroupDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Run a discovery group with a given groupName. */
export async function runDiscoGroup(
  context: Client,
  groupName: string,
  options: RunDiscoGroupOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _runDiscoGroupSend(context, groupName, options);
  return _runDiscoGroupDeserialize(result);
}

export function _createOrReplaceDiscoGroupSend(
  context: Client,
  groupName: string,
  body: DiscoGroupData,
  options: CreateOrReplaceDiscoGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/discoGroups/{groupName}{?api%2Dversion}",
    {
      groupName: groupName,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: discoGroupDataSerializer(body),
    });
}

export async function _createOrReplaceDiscoGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return discoGroupDeserializer(result.body);
}

/** Create a discovery group with a given groupName. */
export async function createOrReplaceDiscoGroup(
  context: Client,
  groupName: string,
  body: DiscoGroupData,
  options: CreateOrReplaceDiscoGroupOptionalParams = { requestOptions: {} },
): Promise<DiscoGroup> {
  const result = await _createOrReplaceDiscoGroupSend(context, groupName, body, options);
  return _createOrReplaceDiscoGroupDeserialize(result);
}

export function _deleteDiscoGroupSend(
  context: Client,
  groupName: string,
  options: DeleteDiscoGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/discoGroups/{groupName}{?api%2Dversion}",
    {
      groupName: groupName,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteDiscoGroupDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a discovery group with a given discovery group name. */
export async function deleteDiscoGroup(
  context: Client,
  groupName: string,
  options: DeleteDiscoGroupOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteDiscoGroupSend(context, groupName, options);
  return _deleteDiscoGroupDeserialize(result);
}

export function _getDiscoGroupSend(
  context: Client,
  groupName: string,
  options: GetDiscoGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/discoGroups/{groupName}{?api%2Dversion}",
    {
      groupName: groupName,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDiscoGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return discoGroupDeserializer(result.body);
}

/** Retrieve a discovery group with a given groupName. */
export async function getDiscoGroup(
  context: Client,
  groupName: string,
  options: GetDiscoGroupOptionalParams = { requestOptions: {} },
): Promise<DiscoGroup> {
  const result = await _getDiscoGroupSend(context, groupName, options);
  return _getDiscoGroupDeserialize(result);
}

export function _validateDiscoGroupSend(
  context: Client,
  body: DiscoGroupData,
  options: ValidateDiscoGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/discoGroups:validate{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: discoGroupDataSerializer(body),
    });
}

export async function _validateDiscoGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return validateResultDeserializer(result.body);
}

/** Validate a discovery group with a given groupName. */
export async function validateDiscoGroup(
  context: Client,
  body: DiscoGroupData,
  options: ValidateDiscoGroupOptionalParams = { requestOptions: {} },
): Promise<ValidateResult> {
  const result = await _validateDiscoGroupSend(context, body, options);
  return _validateDiscoGroupDeserialize(result);
}

export function _listDiscoGroupSend(
  context: Client,
  options: ListDiscoGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/discoGroups{?api%2Dversion,filter,skip,maxpagesize}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
      filter: options?.filter,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDiscoGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDiscoGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedDiscoGroupDeserializer(result.body);
}

/** Retrieve a list of discovery group for the provided search parameters. */
export function listDiscoGroup(
  context: Client,
  options: ListDiscoGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DiscoGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listDiscoGroupSend(context, options),
    _listDiscoGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-10-01-preview",
    },
  );
}

export function _deleteDataConnectionSend(
  context: Client,
  dataConnectionName: string,
  options: DeleteDataConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/dataConnections/{dataConnectionName}{?api%2Dversion}",
    {
      dataConnectionName: dataConnectionName,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteDataConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a data connection with a given dataConnectionName. */
export async function deleteDataConnection(
  context: Client,
  dataConnectionName: string,
  options: DeleteDataConnectionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteDataConnectionSend(context, dataConnectionName, options);
  return _deleteDataConnectionDeserialize(result);
}

export function _createOrReplaceDataConnectionSend(
  context: Client,
  dataConnectionName: string,
  body: DataConnectionDataUnion,
  options: CreateOrReplaceDataConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/dataConnections/{dataConnectionName}{?api%2Dversion}",
    {
      dataConnectionName: dataConnectionName,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: dataConnectionDataUnionSerializer(body),
    });
}

export async function _createOrReplaceDataConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<DataConnectionUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return dataConnectionUnionDeserializer(result.body);
}

/** Create or replace a data connection with a given dataConnectionName. */
export async function createOrReplaceDataConnection(
  context: Client,
  dataConnectionName: string,
  body: DataConnectionDataUnion,
  options: CreateOrReplaceDataConnectionOptionalParams = { requestOptions: {} },
): Promise<DataConnectionUnion> {
  const result = await _createOrReplaceDataConnectionSend(
    context,
    dataConnectionName,
    body,
    options,
  );
  return _createOrReplaceDataConnectionDeserialize(result);
}

export function _getDataConnectionSend(
  context: Client,
  dataConnectionName: string,
  options: GetDataConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/dataConnections/{dataConnectionName}{?api%2Dversion}",
    {
      dataConnectionName: dataConnectionName,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDataConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<DataConnectionUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return dataConnectionUnionDeserializer(result.body);
}

/** Retrieve a data connection with a given dataConnectionName. */
export async function getDataConnection(
  context: Client,
  dataConnectionName: string,
  options: GetDataConnectionOptionalParams = { requestOptions: {} },
): Promise<DataConnectionUnion> {
  const result = await _getDataConnectionSend(context, dataConnectionName, options);
  return _getDataConnectionDeserialize(result);
}

export function _validateDataConnectionSend(
  context: Client,
  body: DataConnectionDataUnion,
  options: ValidateDataConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/dataConnections:validate{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: dataConnectionDataUnionSerializer(body),
    });
}

export async function _validateDataConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return validateResultDeserializer(result.body);
}

/** Validate a data connection with a given dataConnectionName. */
export async function validateDataConnection(
  context: Client,
  body: DataConnectionDataUnion,
  options: ValidateDataConnectionOptionalParams = { requestOptions: {} },
): Promise<ValidateResult> {
  const result = await _validateDataConnectionSend(context, body, options);
  return _validateDataConnectionDeserialize(result);
}

export function _listDataConnectionSend(
  context: Client,
  options: ListDataConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/dataConnections{?api%2Dversion,skip,maxpagesize}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDataConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDataConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedDataConnectionDeserializer(result.body);
}

/** Retrieve a list of data connections. */
export function listDataConnection(
  context: Client,
  options: ListDataConnectionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DataConnectionUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listDataConnectionSend(context, options),
    _listDataConnectionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-10-01-preview",
    },
  );
}

export function _getDeltaSummarySend(
  context: Client,
  body: DeltaSummaryRequest,
  options: GetDeltaSummaryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assets:getDeltaSummary{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: deltaSummaryRequestSerializer(body),
    });
}

export async function _getDeltaSummaryDeserialize(
  result: PathUncheckedResponse,
): Promise<DeltaSummaryResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return deltaSummaryResultDeserializer(result.body);
}

/** Retrieve a list of deltas with overall summary changes for the provided time range. */
export async function getDeltaSummary(
  context: Client,
  body: DeltaSummaryRequest,
  options: GetDeltaSummaryOptionalParams = { requestOptions: {} },
): Promise<DeltaSummaryResult> {
  const result = await _getDeltaSummarySend(context, body, options);
  return _getDeltaSummaryDeserialize(result);
}

export function _getDeltaDetailsSend(
  context: Client,
  body: DeltaDetailsRequest,
  options: GetDeltaDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assets:getDeltaDetails{?api%2Dversion,skip,maxpagesize}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: deltaDetailsRequestSerializer(body),
    });
}

export async function _getDeltaDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeltaPageResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _deltaPageResultDeserializer(result.body);
}

/** Retrieve a list of deltas for the provided time range. */
export function getDeltaDetails(
  context: Client,
  body: DeltaDetailsRequest,
  options: GetDeltaDetailsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeltaResult> {
  return buildPagedAsyncIterator(
    context,
    () => _getDeltaDetailsSend(context, body, options),
    _getDeltaDetailsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-10-01-preview",
    },
  );
}

export function _getObservationsSend(
  context: Client,
  assetId: string,
  options: GetObservationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assets/{assetId}:getObservations{?api%2Dversion,filter,orderby,skip,maxpagesize}",
    {
      assetId: assetId,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
      filter: options?.filter,
      orderby: options?.orderby,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getObservationsDeserialize(
  result: PathUncheckedResponse,
): Promise<ObservationPageResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return observationPageResultDeserializer(result.body);
}

/** Retrieve observations on an asset */
export async function getObservations(
  context: Client,
  assetId: string,
  options: GetObservationsOptionalParams = { requestOptions: {} },
): Promise<ObservationPageResult> {
  const result = await _getObservationsSend(context, assetId, options);
  return _getObservationsDeserialize(result);
}

export function _getAssetsExportSend(
  context: Client,
  body: AssetsExportRequest,
  options: GetAssetsExportOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assets:export{?api%2Dversion,filter,orderby}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
      filter: options?.filter,
      orderby: options?.orderby,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: assetsExportRequestSerializer(body),
    });
}

export async function _getAssetsExportDeserialize(result: PathUncheckedResponse): Promise<Task> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return taskDeserializer(result.body);
}

/** Export a list of assets for the provided search parameters. */
export async function getAssetsExport(
  context: Client,
  body: AssetsExportRequest,
  options: GetAssetsExportOptionalParams = { requestOptions: {} },
): Promise<Task> {
  const result = await _getAssetsExportSend(context, body, options);
  return _getAssetsExportDeserialize(result);
}

export function _getAssetResourceSend(
  context: Client,
  assetId: string,
  options: GetAssetResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assets/{assetId}{?api%2Dversion}",
    {
      assetId: assetId,
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getAssetResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<AssetResourceUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return assetResourceUnionDeserializer(result.body);
}

/** Retrieve an asset by assetId. */
export async function getAssetResource(
  context: Client,
  assetId: string,
  options: GetAssetResourceOptionalParams = { requestOptions: {} },
): Promise<AssetResourceUnion> {
  const result = await _getAssetResourceSend(context, assetId, options);
  return _getAssetResourceDeserialize(result);
}

export function _updateAssetsSend(
  context: Client,
  filter: string,
  body: AssetUpdateData,
  options: UpdateAssetsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assets{?api%2Dversion,filter}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
      filter: filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: assetUpdateDataSerializer(body),
    });
}

export async function _updateAssetsDeserialize(result: PathUncheckedResponse): Promise<Task> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return taskDeserializer(result.body);
}

/** Update labels on assets matching the provided filter. */
export async function updateAssets(
  context: Client,
  filter: string,
  body: AssetUpdateData,
  options: UpdateAssetsOptionalParams = { requestOptions: {} },
): Promise<Task> {
  const result = await _updateAssetsSend(context, filter, body, options);
  return _updateAssetsDeserialize(result);
}

export function _listAssetResourceSend(
  context: Client,
  options: ListAssetResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assets{?api%2Dversion,filter,orderby,skip,maxpagesize,mark,responseType,responseIncludes,recentOnly}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-10-01-preview",
      filter: options?.filter,
      orderby: options?.orderby,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
      mark: options?.mark,
      responseType: options?.responseType,
      responseIncludes: !options?.responseIncludes
        ? options?.responseIncludes
        : options?.responseIncludes.map((p: any) => {
            return p;
          }),
      recentOnly: options?.recentOnly,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listAssetResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedAssetResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedAssetResourceDeserializer(result.body);
}

/** Retrieve a list of assets for the provided search parameters. */
export function listAssetResource(
  context: Client,
  options: ListAssetResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AssetResourceUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listAssetResourceSend(context, options),
    _listAssetResourceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-10-01-preview",
    },
  );
}
