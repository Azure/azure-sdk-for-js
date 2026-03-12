// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProviderContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  CloudHsmCluster,
  cloudHsmClusterSerializer,
  cloudHsmClusterDeserializer,
  CloudHsmClusterPatchParameters,
  cloudHsmClusterPatchParametersSerializer,
  _CloudHsmClusterListResult,
  _cloudHsmClusterListResultDeserializer,
  backupRequestPropertiesSerializer,
  BackupResult,
  backupResultDeserializer,
  RestoreRequestProperties,
  restoreRequestPropertiesSerializer,
  RestoreResult,
  restoreResultDeserializer,
} from "../../models/models.js";
import {
  CloudHsmClustersRestoreOptionalParams,
  CloudHsmClustersValidateRestorePropertiesOptionalParams,
  CloudHsmClustersBackupOptionalParams,
  CloudHsmClustersValidateBackupPropertiesOptionalParams,
  CloudHsmClustersListBySubscriptionOptionalParams,
  CloudHsmClustersListByResourceGroupOptionalParams,
  CloudHsmClustersDeleteOptionalParams,
  CloudHsmClustersUpdateOptionalParams,
  CloudHsmClustersCreateOrUpdateOptionalParams,
  CloudHsmClustersGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _restoreSend(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  restoreRequestProperties: RestoreRequestProperties,
  options: CloudHsmClustersRestoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}/restore{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudHsmClusterName: cloudHsmClusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: restoreRequestPropertiesSerializer(restoreRequestProperties),
  });
}

export async function _restoreDeserialize(result: PathUncheckedResponse): Promise<RestoreResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return restoreResultDeserializer(result.body);
}

/** Restores all key materials of a specified Cloud HSM Cluster */
export function restore(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  restoreRequestProperties: RestoreRequestProperties,
  options: CloudHsmClustersRestoreOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RestoreResult>, RestoreResult> {
  return getLongRunningPoller(context, _restoreDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restoreSend(
        context,
        resourceGroupName,
        cloudHsmClusterName,
        restoreRequestProperties,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<RestoreResult>, RestoreResult>;
}

export function _validateRestorePropertiesSend(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  options: CloudHsmClustersValidateRestorePropertiesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}/validateRestoreProperties{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudHsmClusterName: cloudHsmClusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["restoreRequestProperties"]
      ? options["restoreRequestProperties"]
      : restoreRequestPropertiesSerializer(options["restoreRequestProperties"]),
  });
}

export async function _validateRestorePropertiesDeserialize(
  result: PathUncheckedResponse,
): Promise<RestoreResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return restoreResultDeserializer(result.body);
}

/** Queued validating pre restore operation */
export function validateRestoreProperties(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  options: CloudHsmClustersValidateRestorePropertiesOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<RestoreResult>, RestoreResult> {
  return getLongRunningPoller(context, _validateRestorePropertiesDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateRestorePropertiesSend(context, resourceGroupName, cloudHsmClusterName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<RestoreResult>, RestoreResult>;
}

export function _backupSend(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  options: CloudHsmClustersBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}/backup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudHsmClusterName: cloudHsmClusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["backupRequestProperties"]
      ? options["backupRequestProperties"]
      : backupRequestPropertiesSerializer(options["backupRequestProperties"]),
  });
}

export async function _backupDeserialize(result: PathUncheckedResponse): Promise<BackupResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupResultDeserializer(result.body);
}

/** Create a backup of the Cloud HSM Cluster in the specified subscription */
export function backup(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  options: CloudHsmClustersBackupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BackupResult>, BackupResult> {
  return getLongRunningPoller(context, _backupDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _backupSend(context, resourceGroupName, cloudHsmClusterName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<BackupResult>, BackupResult>;
}

export function _validateBackupPropertiesSend(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  options: CloudHsmClustersValidateBackupPropertiesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}/validateBackupProperties{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudHsmClusterName: cloudHsmClusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["backupRequestProperties"]
      ? options["backupRequestProperties"]
      : backupRequestPropertiesSerializer(options["backupRequestProperties"]),
  });
}

export async function _validateBackupPropertiesDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupResultDeserializer(result.body);
}

/** Pre Backup operation to validate whether the customer can perform a backup on the Cloud HSM Cluster resource in the specified subscription. */
export function validateBackupProperties(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  options: CloudHsmClustersValidateBackupPropertiesOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<BackupResult>, BackupResult> {
  return getLongRunningPoller(context, _validateBackupPropertiesDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateBackupPropertiesSend(context, resourceGroupName, cloudHsmClusterName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<BackupResult>, BackupResult>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: CloudHsmClustersListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters{?api%2Dversion,%24skiptoken}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
      "%24skiptoken": options?.skiptoken,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_CloudHsmClusterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _cloudHsmClusterListResultDeserializer(result.body);
}

/** The List operation gets information about the Cloud HSM Clusters associated with the subscription. */
export function listBySubscription(
  context: Client,
  options: CloudHsmClustersListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<CloudHsmCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: CloudHsmClustersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters{?api%2Dversion,%24skiptoken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
      "%24skiptoken": options?.skiptoken,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_CloudHsmClusterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _cloudHsmClusterListResultDeserializer(result.body);
}

/** The List operation gets information about the Cloud HSM Clusters associated with the subscription and within the specified resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: CloudHsmClustersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<CloudHsmCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  options: CloudHsmClustersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudHsmClusterName: cloudHsmClusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes the specified Cloud HSM Cluster */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  options: CloudHsmClustersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, cloudHsmClusterName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  body: CloudHsmClusterPatchParameters,
  options: CloudHsmClustersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudHsmClusterName: cloudHsmClusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: cloudHsmClusterPatchParametersSerializer(body),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<CloudHsmCluster> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return cloudHsmClusterDeserializer(result.body);
}

/** Update a Cloud HSM Cluster in the specified subscription. */
export function update(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  body: CloudHsmClusterPatchParameters,
  options: CloudHsmClustersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CloudHsmCluster>, CloudHsmCluster> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, cloudHsmClusterName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<CloudHsmCluster>, CloudHsmCluster>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  body: CloudHsmCluster,
  options: CloudHsmClustersCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudHsmClusterName: cloudHsmClusterName,
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
    body: cloudHsmClusterSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CloudHsmCluster> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return cloudHsmClusterDeserializer(result.body);
}

/** Create or Update a Cloud HSM Cluster in the specified subscription. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  body: CloudHsmCluster,
  options: CloudHsmClustersCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<CloudHsmCluster>, CloudHsmCluster> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, cloudHsmClusterName, body, options),
    resourceLocationConfig: "original-uri",
  }) as PollerLike<OperationState<CloudHsmCluster>, CloudHsmCluster>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  options: CloudHsmClustersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudHsmClusterName: cloudHsmClusterName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CloudHsmCluster> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return cloudHsmClusterDeserializer(result.body);
}

/** Gets the specified Cloud HSM Cluster */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  options: CloudHsmClustersGetOptionalParams = { requestOptions: {} },
): Promise<CloudHsmCluster> {
  const result = await _getSend(context, resourceGroupName, cloudHsmClusterName, options);
  return _getDeserialize(result);
}
