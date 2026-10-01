// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContentStoreContext as Client } from "../index.js";
import type {
  ProtectionGroup,
  _ProtectionGroupListResult,
  StopBackupProtectionGroupRequest,
  RestoreProtectionItemRequest,
  RestoreProtectionItemResponse,
  BackupProtectionGroupRequest,
  BackupProtectionGroupResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  protectionGroupSerializer,
  protectionGroupDeserializer,
  _protectionGroupListResultDeserializer,
  stopBackupProtectionGroupRequestSerializer,
  restoreProtectionItemRequestSerializer,
  restoreProtectionItemResponseDeserializer,
  backupProtectionGroupRequestSerializer,
  backupProtectionGroupResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProtectionGroupsBackupOptionalParams,
  ProtectionGroupsResumeBackupOptionalParams,
  ProtectionGroupsRestoreOptionalParams,
  ProtectionGroupsStopBackupOptionalParams,
  ProtectionGroupsListByCloudAccountOptionalParams,
  ProtectionGroupsDeleteOptionalParams,
  ProtectionGroupsCreateOrupdateOptionalParams,
  ProtectionGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _backupSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  request: BackupProtectionGroupRequest,
  options: ProtectionGroupsBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/protectionGroups/{protectionGroupName}/backup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      protectionGroupName: protectionGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: backupProtectionGroupRequestSerializer(request),
  });
}

export async function _backupDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupProtectionGroupResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return backupProtectionGroupResponseDeserializer(result.body);
}

/** Ad-hoc backup of protected items resource in given protection group. */
export async function backup(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  request: BackupProtectionGroupRequest,
  options: ProtectionGroupsBackupOptionalParams = { requestOptions: {} },
): Promise<BackupProtectionGroupResponse> {
  const result = await _backupSend(
    context,
    resourceGroupName,
    cloudAccountName,
    protectionGroupName,
    request,
    options,
  );
  return _backupDeserialize(result);
}

export function _resumeBackupSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  options: ProtectionGroupsResumeBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/protectionGroups/{protectionGroupName}/resumeBackup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      protectionGroupName: protectionGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resumeBackupDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Resume Backup for a Protection Group. */
export async function resumeBackup(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  options: ProtectionGroupsResumeBackupOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resumeBackupSend(
    context,
    resourceGroupName,
    cloudAccountName,
    protectionGroupName,
    options,
  );
  return _resumeBackupDeserialize(result);
}

export function _restoreSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  request: RestoreProtectionItemRequest,
  options: ProtectionGroupsRestoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/protectionGroups/{protectionGroupName}/restore{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      protectionGroupName: protectionGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: restoreProtectionItemRequestSerializer(request),
  });
}

export async function _restoreDeserialize(
  result: PathUncheckedResponse,
): Promise<RestoreProtectionItemResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return restoreProtectionItemResponseDeserializer(result.body);
}

/** Restore resource for a protected items in given protection group. */
export async function restore(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  request: RestoreProtectionItemRequest,
  options: ProtectionGroupsRestoreOptionalParams = { requestOptions: {} },
): Promise<RestoreProtectionItemResponse> {
  const result = await _restoreSend(
    context,
    resourceGroupName,
    cloudAccountName,
    protectionGroupName,
    request,
    options,
  );
  return _restoreDeserialize(result);
}

export function _stopBackupSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  request: StopBackupProtectionGroupRequest,
  options: ProtectionGroupsStopBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/protectionGroups/{protectionGroupName}/stopBackup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      protectionGroupName: protectionGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: stopBackupProtectionGroupRequestSerializer(request),
  });
}

export async function _stopBackupDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Stop Backup for a Protection Group */
export function stopBackup(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  request: StopBackupProtectionGroupRequest,
  options: ProtectionGroupsStopBackupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _stopBackupDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopBackupSend(
        context,
        resourceGroupName,
        cloudAccountName,
        protectionGroupName,
        request,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-03-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByCloudAccountSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  options: ProtectionGroupsListByCloudAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/protectionGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
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

export async function _listByCloudAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProtectionGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _protectionGroupListResultDeserializer(result.body);
}

/** List ProtectionGroup resources by CloudAccount */
export function listByCloudAccount(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  options: ProtectionGroupsListByCloudAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProtectionGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByCloudAccountSend(context, resourceGroupName, cloudAccountName, options),
    _listByCloudAccountDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-03-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  options: ProtectionGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/protectionGroups/{protectionGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      protectionGroupName: protectionGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
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

/** Delete a ProtectionGroup */
export function $delete(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  options: ProtectionGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, cloudAccountName, protectionGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-03-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrupdateSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  resource: ProtectionGroup,
  options: ProtectionGroupsCreateOrupdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/protectionGroups/{protectionGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      protectionGroupName: protectionGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: protectionGroupSerializer(resource),
  });
}

export async function _createOrupdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProtectionGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return protectionGroupDeserializer(result.body);
}

/** Create a ProtectionGroup */
export function createOrupdate(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  resource: ProtectionGroup,
  options: ProtectionGroupsCreateOrupdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ProtectionGroup>, ProtectionGroup> {
  return getLongRunningPoller(context, _createOrupdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrupdateSend(
        context,
        resourceGroupName,
        cloudAccountName,
        protectionGroupName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-07-03-preview",
  }) as PollerLike<OperationState<ProtectionGroup>, ProtectionGroup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  options: ProtectionGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/protectionGroups/{protectionGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      protectionGroupName: protectionGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ProtectionGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return protectionGroupDeserializer(result.body);
}

/** Get a ProtectionGroup */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  options: ProtectionGroupsGetOptionalParams = { requestOptions: {} },
): Promise<ProtectionGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    cloudAccountName,
    protectionGroupName,
    options,
  );
  return _getDeserialize(result);
}
