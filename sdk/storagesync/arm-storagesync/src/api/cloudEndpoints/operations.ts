// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSyncContext as Client } from "../index.js";
import {
  storageSyncErrorDeserializer,
  CloudEndpoint,
  cloudEndpointDeserializer,
  CloudEndpointCreateParameters,
  cloudEndpointCreateParametersSerializer,
  _CloudEndpointArray,
  _cloudEndpointArrayDeserializer,
  BackupRequest,
  backupRequestSerializer,
  PostBackupResponse,
  postBackupResponseDeserializer,
  PreRestoreRequest,
  preRestoreRequestSerializer,
  PostRestoreRequest,
  postRestoreRequestSerializer,
  TriggerChangeDetectionParameters,
  triggerChangeDetectionParametersSerializer,
  CloudEndpointAfsShareMetadataCertificatePublicKeys,
  cloudEndpointAfsShareMetadataCertificatePublicKeysDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  CloudEndpointsAfsShareMetadataCertificatePublicKeysOptionalParams,
  CloudEndpointsTriggerChangeDetectionOptionalParams,
  CloudEndpointsPostRestoreOptionalParams,
  CloudEndpointsRestoreheartbeatOptionalParams,
  CloudEndpointsPreRestoreOptionalParams,
  CloudEndpointsPostBackupOptionalParams,
  CloudEndpointsPreBackupOptionalParams,
  CloudEndpointsListBySyncGroupOptionalParams,
  CloudEndpointsDeleteOptionalParams,
  CloudEndpointsCreateOptionalParams,
  CloudEndpointsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _afsShareMetadataCertificatePublicKeysSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  options: CloudEndpointsAfsShareMetadataCertificatePublicKeysOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}/afsShareMetadataCertificatePublicKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      cloudEndpointName: cloudEndpointName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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

export async function _afsShareMetadataCertificatePublicKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<CloudEndpointAfsShareMetadataCertificatePublicKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return cloudEndpointAfsShareMetadataCertificatePublicKeysDeserializer(result.body);
}

/** Get the AFS file share metadata signing certificate public keys. */
export async function afsShareMetadataCertificatePublicKeys(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  options: CloudEndpointsAfsShareMetadataCertificatePublicKeysOptionalParams = {
    requestOptions: {},
  },
): Promise<CloudEndpointAfsShareMetadataCertificatePublicKeys> {
  const result = await _afsShareMetadataCertificatePublicKeysSend(
    context,
    resourceGroupName,
    storageSyncServiceName,
    syncGroupName,
    cloudEndpointName,
    options,
  );
  return _afsShareMetadataCertificatePublicKeysDeserialize(result);
}

export function _triggerChangeDetectionSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  parameters: TriggerChangeDetectionParameters,
  options: CloudEndpointsTriggerChangeDetectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}/triggerChangeDetection{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      cloudEndpointName: cloudEndpointName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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
      body: triggerChangeDetectionParametersSerializer(parameters),
    });
}

export async function _triggerChangeDetectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Triggers detection of changes performed on Azure File share connected to the specified Azure File Sync Cloud Endpoint. */
export function triggerChangeDetection(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  parameters: TriggerChangeDetectionParameters,
  options: CloudEndpointsTriggerChangeDetectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _triggerChangeDetectionDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _triggerChangeDetectionSend(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _postRestoreSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  parameters: PostRestoreRequest,
  options: CloudEndpointsPostRestoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}/postrestore{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      cloudEndpointName: cloudEndpointName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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
      body: postRestoreRequestSerializer(parameters),
    });
}

export async function _postRestoreDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Post Restore a given CloudEndpoint. */
export function postRestore(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  parameters: PostRestoreRequest,
  options: CloudEndpointsPostRestoreOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _postRestoreDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _postRestoreSend(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _restoreheartbeatSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  options: CloudEndpointsRestoreheartbeatOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}/restoreheartbeat{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      cloudEndpointName: cloudEndpointName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _restoreheartbeatDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Restore Heartbeat a given CloudEndpoint. */
export async function restoreheartbeat(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  options: CloudEndpointsRestoreheartbeatOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _restoreheartbeatSend(
    context,
    resourceGroupName,
    storageSyncServiceName,
    syncGroupName,
    cloudEndpointName,
    options,
  );
  return _restoreheartbeatDeserialize(result);
}

export function _preRestoreSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  parameters: PreRestoreRequest,
  options: CloudEndpointsPreRestoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}/prerestore{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      cloudEndpointName: cloudEndpointName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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
      body: preRestoreRequestSerializer(parameters),
    });
}

export async function _preRestoreDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Pre Restore a given CloudEndpoint. */
export function preRestore(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  parameters: PreRestoreRequest,
  options: CloudEndpointsPreRestoreOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _preRestoreDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _preRestoreSend(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _postBackupSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  parameters: BackupRequest,
  options: CloudEndpointsPostBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}/postbackup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      cloudEndpointName: cloudEndpointName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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
      body: backupRequestSerializer(parameters),
    });
}

export async function _postBackupDeserialize(
  result: PathUncheckedResponse,
): Promise<PostBackupResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return postBackupResponseDeserializer(result.body);
}

/** Post Backup a given CloudEndpoint. */
export function postBackup(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  parameters: BackupRequest,
  options: CloudEndpointsPostBackupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PostBackupResponse>, PostBackupResponse> {
  return getLongRunningPoller(context, _postBackupDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _postBackupSend(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<PostBackupResponse>, PostBackupResponse>;
}

export function _preBackupSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  parameters: BackupRequest,
  options: CloudEndpointsPreBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}/prebackup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      cloudEndpointName: cloudEndpointName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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
      body: backupRequestSerializer(parameters),
    });
}

export async function _preBackupDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Pre Backup a given CloudEndpoint. */
export function preBackup(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  parameters: BackupRequest,
  options: CloudEndpointsPreBackupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _preBackupDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _preBackupSend(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listBySyncGroupSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  options: CloudEndpointsListBySyncGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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

export async function _listBySyncGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_CloudEndpointArray> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return _cloudEndpointArrayDeserializer(result.body);
}

/** Get a CloudEndpoint List. */
export function listBySyncGroup(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  options: CloudEndpointsListBySyncGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CloudEndpoint> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listBySyncGroupSend(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        options,
      ),
    _listBySyncGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2022-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  options: CloudEndpointsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      cloudEndpointName: cloudEndpointName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a given CloudEndpoint. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  options: CloudEndpointsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  parameters: CloudEndpointCreateParameters,
  options: CloudEndpointsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      cloudEndpointName: cloudEndpointName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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
      body: cloudEndpointCreateParametersSerializer(parameters),
    });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<CloudEndpoint> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return cloudEndpointDeserializer(result.body);
}

/** Create a new CloudEndpoint. */
export function create(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  parameters: CloudEndpointCreateParameters,
  options: CloudEndpointsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CloudEndpoint>, CloudEndpoint> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        cloudEndpointName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-09-01",
  }) as PollerLike<OperationState<CloudEndpoint>, CloudEndpoint>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  options: CloudEndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      cloudEndpointName: cloudEndpointName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CloudEndpoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return cloudEndpointDeserializer(result.body);
}

/** Get a given CloudEndpoint. */
export async function get(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  cloudEndpointName: string,
  options: CloudEndpointsGetOptionalParams = { requestOptions: {} },
): Promise<CloudEndpoint> {
  const result = await _getSend(
    context,
    resourceGroupName,
    storageSyncServiceName,
    syncGroupName,
    cloudEndpointName,
    options,
  );
  return _getDeserialize(result);
}
