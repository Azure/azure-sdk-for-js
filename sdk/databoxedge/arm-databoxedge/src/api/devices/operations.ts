// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataBoxEdgeManagementContext as Client } from "../index.js";
import type {
  NetworkSettings,
  DataBoxEdgeDevice,
  DataBoxEdgeDevicePatch,
  _DataBoxEdgeDeviceList,
  GenerateCertResponse,
  DataBoxEdgeDeviceExtendedInfo,
  SecuritySettings,
  DataBoxEdgeDeviceExtendedInfoPatch,
  UploadCertificateRequest,
  UploadCertificateResponse,
  UpdateSummary,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  networkSettingsDeserializer,
  dataBoxEdgeDeviceSerializer,
  dataBoxEdgeDeviceDeserializer,
  dataBoxEdgeDevicePatchSerializer,
  _dataBoxEdgeDeviceListDeserializer,
  generateCertResponseDeserializer,
  dataBoxEdgeDeviceExtendedInfoDeserializer,
  securitySettingsSerializer,
  dataBoxEdgeDeviceExtendedInfoPatchSerializer,
  uploadCertificateRequestSerializer,
  uploadCertificateResponseDeserializer,
  updateSummaryDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DevicesGetUpdateSummaryOptionalParams,
  DevicesUploadCertificateOptionalParams,
  DevicesUpdateExtendedInformationOptionalParams,
  DevicesCreateOrUpdateSecuritySettingsOptionalParams,
  DevicesScanForUpdatesOptionalParams,
  DevicesInstallUpdatesOptionalParams,
  DevicesGetExtendedInformationOptionalParams,
  DevicesGenerateCertificateOptionalParams,
  DevicesDownloadUpdatesOptionalParams,
  DevicesListBySubscriptionOptionalParams,
  DevicesListByResourceGroupOptionalParams,
  DevicesDeleteOptionalParams,
  DevicesUpdateOptionalParams,
  DevicesCreateOrUpdateOptionalParams,
  DevicesGetOptionalParams,
  DevicesGetNetworkSettingsOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getUpdateSummarySend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DevicesGetUpdateSummaryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/updateSummary/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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

export async function _getUpdateSummaryDeserialize(
  result: PathUncheckedResponse,
): Promise<UpdateSummary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return updateSummaryDeserializer(result.body);
}

/** Gets information about the availability of updates based on the last scan of the device. It also gets information about any ongoing download or install jobs on the device. */
export async function getUpdateSummary(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DevicesGetUpdateSummaryOptionalParams = { requestOptions: {} },
): Promise<UpdateSummary> {
  const result = await _getUpdateSummarySend(context, deviceName, resourceGroupName, options);
  return _getUpdateSummaryDeserialize(result);
}

export function _uploadCertificateSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  parameters: UploadCertificateRequest,
  options: DevicesUploadCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/uploadCertificate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: uploadCertificateRequestSerializer(parameters),
  });
}

export async function _uploadCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<UploadCertificateResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return uploadCertificateResponseDeserializer(result.body);
}

/** Uploads registration certificate for the device. */
export async function uploadCertificate(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  parameters: UploadCertificateRequest,
  options: DevicesUploadCertificateOptionalParams = { requestOptions: {} },
): Promise<UploadCertificateResponse> {
  const result = await _uploadCertificateSend(
    context,
    deviceName,
    resourceGroupName,
    parameters,
    options,
  );
  return _uploadCertificateDeserialize(result);
}

export function _updateExtendedInformationSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  parameters: DataBoxEdgeDeviceExtendedInfoPatch,
  options: DevicesUpdateExtendedInformationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/updateExtendedInformation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dataBoxEdgeDeviceExtendedInfoPatchSerializer(parameters),
  });
}

export async function _updateExtendedInformationDeserialize(
  result: PathUncheckedResponse,
): Promise<DataBoxEdgeDeviceExtendedInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return dataBoxEdgeDeviceExtendedInfoDeserializer(result.body);
}

/** Gets additional information for the specified Data Box Edge/Data Box Gateway device. */
export async function updateExtendedInformation(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  parameters: DataBoxEdgeDeviceExtendedInfoPatch,
  options: DevicesUpdateExtendedInformationOptionalParams = { requestOptions: {} },
): Promise<DataBoxEdgeDeviceExtendedInfo> {
  const result = await _updateExtendedInformationSend(
    context,
    deviceName,
    resourceGroupName,
    parameters,
    options,
  );
  return _updateExtendedInformationDeserialize(result);
}

export function _createOrUpdateSecuritySettingsSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  securitySettings: SecuritySettings,
  options: DevicesCreateOrUpdateSecuritySettingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/securitySettings/default/update{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: securitySettingsSerializer(securitySettings),
  });
}

export async function _createOrUpdateSecuritySettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Updates the security settings on a Data Box Edge/Data Box Gateway device. */
export function createOrUpdateSecuritySettings(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  securitySettings: SecuritySettings,
  options: DevicesCreateOrUpdateSecuritySettingsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _createOrUpdateSecuritySettingsDeserialize,
    ["202", "204", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateSecuritySettingsSend(
          context,
          deviceName,
          resourceGroupName,
          securitySettings,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2023-12-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _scanForUpdatesSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DevicesScanForUpdatesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/scanForUpdates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _scanForUpdatesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Scans for updates on a Data Box Edge/Data Box Gateway device. */
export function scanForUpdates(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DevicesScanForUpdatesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _scanForUpdatesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _scanForUpdatesSend(context, deviceName, resourceGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2023-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _installUpdatesSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DevicesInstallUpdatesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/installUpdates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _installUpdatesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Installs the updates on the Data Box Edge/Data Box Gateway device. */
export function installUpdates(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DevicesInstallUpdatesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _installUpdatesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _installUpdatesSend(context, deviceName, resourceGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2023-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getExtendedInformationSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DevicesGetExtendedInformationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/getExtendedInformation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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

export async function _getExtendedInformationDeserialize(
  result: PathUncheckedResponse,
): Promise<DataBoxEdgeDeviceExtendedInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return dataBoxEdgeDeviceExtendedInfoDeserializer(result.body);
}

/** Gets additional information for the specified Azure Stack Edge/Data Box Gateway device. */
export async function getExtendedInformation(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DevicesGetExtendedInformationOptionalParams = { requestOptions: {} },
): Promise<DataBoxEdgeDeviceExtendedInfo> {
  const result = await _getExtendedInformationSend(context, deviceName, resourceGroupName, options);
  return _getExtendedInformationDeserialize(result);
}

export function _generateCertificateSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DevicesGenerateCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/generateCertificate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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

export async function _generateCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<GenerateCertResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return generateCertResponseDeserializer(result.body);
}

/** Generates certificate for activation key. */
export async function generateCertificate(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DevicesGenerateCertificateOptionalParams = { requestOptions: {} },
): Promise<GenerateCertResponse> {
  const result = await _generateCertificateSend(context, deviceName, resourceGroupName, options);
  return _generateCertificateDeserialize(result);
}

export function _downloadUpdatesSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DevicesDownloadUpdatesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/downloadUpdates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _downloadUpdatesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Downloads the updates on a Data Box Edge/Data Box Gateway device. */
export function downloadUpdates(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DevicesDownloadUpdatesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _downloadUpdatesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _downloadUpdatesSend(context, deviceName, resourceGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2023-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: DevicesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
      "%24expand": options?.expand,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_DataBoxEdgeDeviceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _dataBoxEdgeDeviceListDeserializer(result.body);
}

/** Gets all the Data Box Edge/Data Box Gateway devices in a subscription. */
export function listBySubscription(
  context: Client,
  options: DevicesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DataBoxEdgeDevice> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-12-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: DevicesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
      "%24expand": options?.expand,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DataBoxEdgeDeviceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _dataBoxEdgeDeviceListDeserializer(result.body);
}

/** Gets all the Data Box Edge/Data Box Gateway devices in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: DevicesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DataBoxEdgeDevice> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DevicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the Data Box Edge/Data Box Gateway device. */
export function $delete(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DevicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, deviceName, resourceGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2023-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  parameters: DataBoxEdgeDevicePatch,
  options: DevicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dataBoxEdgeDevicePatchSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<DataBoxEdgeDevice> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return dataBoxEdgeDeviceDeserializer(result.body);
}

/** Modifies a Data Box Edge/Data Box Gateway resource. */
export async function update(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  parameters: DataBoxEdgeDevicePatch,
  options: DevicesUpdateOptionalParams = { requestOptions: {} },
): Promise<DataBoxEdgeDevice> {
  const result = await _updateSend(context, deviceName, resourceGroupName, parameters, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  dataBoxEdgeDevice: DataBoxEdgeDevice,
  options: DevicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dataBoxEdgeDeviceSerializer(dataBoxEdgeDevice),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DataBoxEdgeDevice> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return dataBoxEdgeDeviceDeserializer(result.body);
}

/** Creates or updates a Data Box Edge/Data Box Gateway resource. */
export async function createOrUpdate(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  dataBoxEdgeDevice: DataBoxEdgeDevice,
  options: DevicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<DataBoxEdgeDevice> {
  const result = await _createOrUpdateSend(
    context,
    deviceName,
    resourceGroupName,
    dataBoxEdgeDevice,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DevicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DataBoxEdgeDevice> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return dataBoxEdgeDeviceDeserializer(result.body);
}

/** Gets the properties of the Data Box Edge/Data Box Gateway device. */
export async function get(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DevicesGetOptionalParams = { requestOptions: {} },
): Promise<DataBoxEdgeDevice> {
  const result = await _getSend(context, deviceName, resourceGroupName, options);
  return _getDeserialize(result);
}

export function _getNetworkSettingsSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DevicesGetNetworkSettingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/networkSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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

export async function _getNetworkSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return networkSettingsDeserializer(result.body);
}

/** Gets the network settings of the specified Data Box Edge/Data Box Gateway device. */
export async function getNetworkSettings(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DevicesGetNetworkSettingsOptionalParams = { requestOptions: {} },
): Promise<NetworkSettings> {
  const result = await _getNetworkSettingsSend(context, deviceName, resourceGroupName, options);
  return _getNetworkSettingsDeserialize(result);
}
