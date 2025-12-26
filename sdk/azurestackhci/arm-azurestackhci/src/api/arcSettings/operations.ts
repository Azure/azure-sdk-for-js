// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext as Client } from "../index.js";
import type {
  ArcSetting,
  ArcSettingsPatch,
  _ArcSettingList,
  PasswordCredential,
  ArcIdentityResponse,
  ReconcileArcSettingsRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  arcSettingSerializer,
  arcSettingDeserializer,
  arcSettingsPatchSerializer,
  _arcSettingListDeserializer,
  passwordCredentialDeserializer,
  arcIdentityResponseDeserializer,
  reconcileArcSettingsRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ArcSettingsInitializeDisableProcessOptionalParams,
  ArcSettingsConsentAndInstallDefaultExtensionsOptionalParams,
  ArcSettingsReconcileOptionalParams,
  ArcSettingsCreateIdentityOptionalParams,
  ArcSettingsGeneratePasswordOptionalParams,
  ArcSettingsListByClusterOptionalParams,
  ArcSettingsDeleteOptionalParams,
  ArcSettingsUpdateOptionalParams,
  ArcSettingsCreateOptionalParams,
  ArcSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _initializeDisableProcessSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  options: ArcSettingsInitializeDisableProcessOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/initializeDisableProcess{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      arcSettingName: arcSettingName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _initializeDisableProcessDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Initializes ARC Disable process on the cluster */
export function initializeDisableProcess(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  options: ArcSettingsInitializeDisableProcessOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _initializeDisableProcessDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _initializeDisableProcessSend(
          context,
          resourceGroupName,
          clusterName,
          arcSettingName,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _consentAndInstallDefaultExtensionsSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  options: ArcSettingsConsentAndInstallDefaultExtensionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/consentAndInstallDefaultExtensions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      arcSettingName: arcSettingName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _consentAndInstallDefaultExtensionsDeserialize(
  result: PathUncheckedResponse,
): Promise<ArcSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return arcSettingDeserializer(result.body);
}

/** Add consent time for default extensions and initiate extensions installation */
export async function consentAndInstallDefaultExtensions(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  options: ArcSettingsConsentAndInstallDefaultExtensionsOptionalParams = { requestOptions: {} },
): Promise<ArcSetting> {
  const result = await _consentAndInstallDefaultExtensionsSend(
    context,
    resourceGroupName,
    clusterName,
    arcSettingName,
    options,
  );
  return _consentAndInstallDefaultExtensionsDeserialize(result);
}

export function _reconcileSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  reconcileArcSettingsRequest: ReconcileArcSettingsRequest,
  options: ArcSettingsReconcileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/reconcile{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      arcSettingName: arcSettingName,
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
    body: reconcileArcSettingsRequestSerializer(reconcileArcSettingsRequest),
  });
}

export async function _reconcileDeserialize(result: PathUncheckedResponse): Promise<ArcSetting> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return arcSettingDeserializer(result.body);
}

/** Reconcile Arc Settings with information related to all nodes. */
export function reconcile(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  reconcileArcSettingsRequest: ReconcileArcSettingsRequest,
  options: ArcSettingsReconcileOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ArcSetting>, ArcSetting> {
  return getLongRunningPoller(context, _reconcileDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reconcileSend(
        context,
        resourceGroupName,
        clusterName,
        arcSettingName,
        reconcileArcSettingsRequest,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ArcSetting>, ArcSetting>;
}

export function _createIdentitySend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  options: ArcSettingsCreateIdentityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/createArcIdentity{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      arcSettingName: arcSettingName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _createIdentityDeserialize(
  result: PathUncheckedResponse,
): Promise<ArcIdentityResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return arcIdentityResponseDeserializer(result.body);
}

/** Create Aad identity for arc settings. */
export function createIdentity(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  options: ArcSettingsCreateIdentityOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ArcIdentityResponse>, ArcIdentityResponse> {
  return getLongRunningPoller(context, _createIdentityDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createIdentitySend(context, resourceGroupName, clusterName, arcSettingName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ArcIdentityResponse>, ArcIdentityResponse>;
}

export function _generatePasswordSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  options: ArcSettingsGeneratePasswordOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/generatePassword{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      arcSettingName: arcSettingName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _generatePasswordDeserialize(
  result: PathUncheckedResponse,
): Promise<PasswordCredential> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return passwordCredentialDeserializer(result.body);
}

/** Generate password for arc settings. */
export async function generatePassword(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  options: ArcSettingsGeneratePasswordOptionalParams = { requestOptions: {} },
): Promise<PasswordCredential> {
  const result = await _generatePasswordSend(
    context,
    resourceGroupName,
    clusterName,
    arcSettingName,
    options,
  );
  return _generatePasswordDeserialize(result);
}

export function _listByClusterSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ArcSettingsListByClusterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
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

export async function _listByClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_ArcSettingList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _arcSettingListDeserializer(result.body);
}

/** Get ArcSetting resources of HCI Cluster. */
export function listByCluster(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ArcSettingsListByClusterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ArcSetting> {
  return buildPagedAsyncIterator(
    context,
    () => _listByClusterSend(context, resourceGroupName, clusterName, options),
    _listByClusterDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  options: ArcSettingsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      arcSettingName: arcSettingName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete ArcSetting resource details of HCI Cluster. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  options: ArcSettingsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, arcSettingName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  arcSetting: ArcSettingsPatch,
  options: ArcSettingsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      arcSettingName: arcSettingName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: arcSettingsPatchSerializer(arcSetting),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ArcSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return arcSettingDeserializer(result.body);
}

/** Update ArcSettings for HCI cluster. */
export async function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  arcSetting: ArcSettingsPatch,
  options: ArcSettingsUpdateOptionalParams = { requestOptions: {} },
): Promise<ArcSetting> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    clusterName,
    arcSettingName,
    arcSetting,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  arcSetting: ArcSetting,
  options: ArcSettingsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      arcSettingName: arcSettingName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: arcSettingSerializer(arcSetting),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<ArcSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return arcSettingDeserializer(result.body);
}

/** Create ArcSetting for HCI cluster. */
export async function create(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  arcSetting: ArcSetting,
  options: ArcSettingsCreateOptionalParams = { requestOptions: {} },
): Promise<ArcSetting> {
  const result = await _createSend(
    context,
    resourceGroupName,
    clusterName,
    arcSettingName,
    arcSetting,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  options: ArcSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      arcSettingName: arcSettingName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ArcSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return arcSettingDeserializer(result.body);
}

/** Get ArcSetting resource details of HCI Cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  options: ArcSettingsGetOptionalParams = { requestOptions: {} },
): Promise<ArcSetting> {
  const result = await _getSend(context, resourceGroupName, clusterName, arcSettingName, options);
  return _getDeserialize(result);
}
