// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceUpdateContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  UpdateInfo,
  _DeviceClassesList,
  _deviceClassesListDeserializer,
  DeviceClass,
  deviceClassDeserializer,
  PatchBody,
  patchBodySerializer,
  _UpdateInfoList,
  _updateInfoListDeserializer,
  _DevicesList,
  _devicesListDeserializer,
  Device,
  deviceDeserializer,
  DeviceOperation,
  deviceOperationDeserializer,
  UpdateCompliance,
  updateComplianceDeserializer,
  _GroupsList,
  _groupsListDeserializer,
  Group,
  groupDeserializer,
  _DeviceClassSubgroupUpdatableDevicesList,
  _deviceClassSubgroupUpdatableDevicesListDeserializer,
  DeviceClassSubgroupUpdatableDevices,
  deviceClassSubgroupUpdatableDevicesDeserializer,
  _DeploymentsList,
  _deploymentsListDeserializer,
  Deployment,
  deploymentSerializer,
  deploymentDeserializer,
  DeploymentStatus,
  deploymentStatusDeserializer,
  DeviceClassSubgroupDeploymentStatus,
  deviceClassSubgroupDeploymentStatusDeserializer,
  _DeviceClassSubgroupsList,
  _deviceClassSubgroupsListDeserializer,
  DeviceClassSubgroup,
  deviceClassSubgroupDeserializer,
  _DeploymentDeviceStatesList,
  _deploymentDeviceStatesListDeserializer,
  DeploymentDeviceState,
  _DeviceOperationsList,
  _deviceOperationsListDeserializer,
  LogCollection,
  logCollectionSerializer,
  logCollectionDeserializer,
  _LogCollectionList,
  _logCollectionListDeserializer,
  LogCollectionOperationDetailedStatus,
  logCollectionOperationDetailedStatusDeserializer,
  _DeviceHealthList,
  _deviceHealthListDeserializer,
  DeviceHealth,
  ImportType,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DeviceManagementDeleteDeploymentForDeviceClassSubgroupOptionalParams,
  DeviceManagementDeleteDeploymentOptionalParams,
  DeviceManagementListHealthOfDevicesOptionalParams,
  DeviceManagementGetLogCollectionDetailedStatusOptionalParams,
  DeviceManagementListLogCollectionsOptionalParams,
  DeviceManagementGetLogCollectionOptionalParams,
  DeviceManagementStartLogCollectionOptionalParams,
  DeviceManagementListOperationStatusesOptionalParams,
  DeviceManagementGetOperationStatusOptionalParams,
  DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentOptionalParams,
  DeviceManagementGetDeviceClassSubgroupDeploymentStatusOptionalParams,
  DeviceManagementRetryDeploymentOptionalParams,
  DeviceManagementStopDeploymentOptionalParams,
  DeviceManagementGetDeploymentForDeviceClassSubgroupOptionalParams,
  DeviceManagementListDeploymentsForDeviceClassSubgroupOptionalParams,
  DeviceManagementGetBestUpdatesForDeviceClassSubgroupOptionalParams,
  DeviceManagementGetDeviceClassSubgroupUpdateComplianceOptionalParams,
  DeviceManagementDeleteDeviceClassSubgroupOptionalParams,
  DeviceManagementGetDeviceClassSubgroupOptionalParams,
  DeviceManagementListDeviceClassSubgroupsForGroupOptionalParams,
  DeviceManagementGetDeploymentStatusOptionalParams,
  DeviceManagementCreateOrUpdateDeploymentOptionalParams,
  DeviceManagementGetDeploymentOptionalParams,
  DeviceManagementListDeploymentsForGroupOptionalParams,
  DeviceManagementListBestUpdatesForGroupOptionalParams,
  DeviceManagementGetUpdateComplianceForGroupOptionalParams,
  DeviceManagementDeleteGroupOptionalParams,
  DeviceManagementGetGroupOptionalParams,
  DeviceManagementListGroupsOptionalParams,
  DeviceManagementGetUpdateComplianceOptionalParams,
  DeviceManagementGetDeviceModuleOptionalParams,
  DeviceManagementGetDeviceOptionalParams,
  DeviceManagementImportDevicesOptionalParams,
  DeviceManagementListDevicesOptionalParams,
  DeviceManagementListInstallableUpdatesForDeviceClassOptionalParams,
  DeviceManagementDeleteDeviceClassOptionalParams,
  DeviceManagementUpdateDeviceClassOptionalParams,
  DeviceManagementGetDeviceClassOptionalParams,
  DeviceManagementListDeviceClassesOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _deleteDeploymentForDeviceClassSubgroupSend(
  context: Client,
  groupId: string,
  deviceClassId: string,
  deploymentId: string,
  options: DeviceManagementDeleteDeploymentForDeviceClassSubgroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      deviceClassId: deviceClassId,
      deploymentId: deploymentId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteDeploymentForDeviceClassSubgroupDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
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

/** Deletes a device class subgroup deployment. */
export async function deleteDeploymentForDeviceClassSubgroup(
  context: Client,
  groupId: string,
  deviceClassId: string,
  deploymentId: string,
  options: DeviceManagementDeleteDeploymentForDeviceClassSubgroupOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _deleteDeploymentForDeviceClassSubgroupSend(
    context,
    groupId,
    deviceClassId,
    deploymentId,
    options,
  );
  return _deleteDeploymentForDeviceClassSubgroupDeserialize(result);
}

export function _deleteDeploymentSend(
  context: Client,
  groupId: string,
  deploymentId: string,
  options: DeviceManagementDeleteDeploymentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      deploymentId: deploymentId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteDeploymentDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Deletes a deployment. */
export async function deleteDeployment(
  context: Client,
  groupId: string,
  deploymentId: string,
  options: DeviceManagementDeleteDeploymentOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteDeploymentSend(context, groupId, deploymentId, options);
  return _deleteDeploymentDeserialize(result);
}

export function _listHealthOfDevicesSend(
  context: Client,
  filter: string,
  options: DeviceManagementListHealthOfDevicesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/deviceDiagnostics/deviceHealth{?api%2Dversion,filter}",
    {
      instanceId: context.instanceId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
      filter: filter,
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

export async function _listHealthOfDevicesDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeviceHealthList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _deviceHealthListDeserializer(result.body);
}

/** Get list of device health */
export function listHealthOfDevices(
  context: Client,
  filter: string,
  options: DeviceManagementListHealthOfDevicesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeviceHealth> {
  return buildPagedAsyncIterator(
    context,
    () => _listHealthOfDevicesSend(context, filter, options),
    _listHealthOfDevicesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _getLogCollectionDetailedStatusSend(
  context: Client,
  logCollectionId: string,
  options: DeviceManagementGetLogCollectionDetailedStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/deviceDiagnostics/logCollections/{operationId}/detailedStatus{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      operationId: logCollectionId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getLogCollectionDetailedStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<LogCollectionOperationDetailedStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logCollectionOperationDetailedStatusDeserializer(result.body);
}

/** Get log collection with detailed status */
export async function getLogCollectionDetailedStatus(
  context: Client,
  logCollectionId: string,
  options: DeviceManagementGetLogCollectionDetailedStatusOptionalParams = { requestOptions: {} },
): Promise<LogCollectionOperationDetailedStatus> {
  const result = await _getLogCollectionDetailedStatusSend(context, logCollectionId, options);
  return _getLogCollectionDetailedStatusDeserialize(result);
}

export function _listLogCollectionsSend(
  context: Client,
  options: DeviceManagementListLogCollectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/deviceDiagnostics/logCollections{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _listLogCollectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_LogCollectionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _logCollectionListDeserializer(result.body);
}

/** Get all device diagnostics log collections */
export function listLogCollections(
  context: Client,
  options: DeviceManagementListLogCollectionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LogCollection> {
  return buildPagedAsyncIterator(
    context,
    () => _listLogCollectionsSend(context, options),
    _listLogCollectionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _getLogCollectionSend(
  context: Client,
  logCollectionId: string,
  options: DeviceManagementGetLogCollectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/deviceDiagnostics/logCollections/{operationId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      operationId: logCollectionId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getLogCollectionDeserialize(
  result: PathUncheckedResponse,
): Promise<LogCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logCollectionDeserializer(result.body);
}

/** Get the device diagnostics log collection */
export async function getLogCollection(
  context: Client,
  logCollectionId: string,
  options: DeviceManagementGetLogCollectionOptionalParams = { requestOptions: {} },
): Promise<LogCollection> {
  const result = await _getLogCollectionSend(context, logCollectionId, options);
  return _getLogCollectionDeserialize(result);
}

export function _startLogCollectionSend(
  context: Client,
  logCollectionId: string,
  logCollection: LogCollection,
  options: DeviceManagementStartLogCollectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/deviceDiagnostics/logCollections/{operationId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      operationId: logCollectionId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: logCollectionSerializer(logCollection),
  });
}

export async function _startLogCollectionDeserialize(
  result: PathUncheckedResponse,
): Promise<LogCollection> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logCollectionDeserializer(result.body);
}

/** Start the device diagnostics log collection on specified devices. */
export async function startLogCollection(
  context: Client,
  logCollectionId: string,
  logCollection: LogCollection,
  options: DeviceManagementStartLogCollectionOptionalParams = { requestOptions: {} },
): Promise<LogCollection> {
  const result = await _startLogCollectionSend(context, logCollectionId, logCollection, options);
  return _startLogCollectionDeserialize(result);
}

export function _listOperationStatusesSend(
  context: Client,
  options: DeviceManagementListOperationStatusesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/operations{?api%2Dversion,filter,top}",
    {
      instanceId: context.instanceId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
      filter: options?.filter,
      top: options?.top,
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

export async function _listOperationStatusesDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeviceOperationsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _deviceOperationsListDeserializer(result.body);
}

/**
 * Get a list of all device import operations. Completed operations are kept for 7
 * days before auto-deleted.
 */
export function listOperationStatuses(
  context: Client,
  options: DeviceManagementListOperationStatusesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeviceOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _listOperationStatusesSend(context, options),
    _listOperationStatusesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _getOperationStatusSend(
  context: Client,
  operationId: string,
  options: DeviceManagementGetOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/operations/{operationId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<DeviceOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deviceOperationDeserializer(result.body);
}

/** Retrieve operation status. */
export async function getOperationStatus(
  context: Client,
  operationId: string,
  options: DeviceManagementGetOperationStatusOptionalParams = { requestOptions: {} },
): Promise<DeviceOperation> {
  const result = await _getOperationStatusSend(context, operationId, options);
  return _getOperationStatusDeserialize(result);
}

export function _listDeviceStatesForDeviceClassSubgroupDeploymentSend(
  context: Client,
  groupId: string,
  deviceClassId: string,
  deploymentId: string,
  options: DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}/devicestates{?api%2Dversion,filter}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      deviceClassId: deviceClassId,
      deploymentId: deploymentId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
      filter: options?.filter,
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

export async function _listDeviceStatesForDeviceClassSubgroupDeploymentDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentDeviceStatesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _deploymentDeviceStatesListDeserializer(result.body);
}

/**
 * Gets a list of devices in a deployment along with their state. Useful for
 * getting a list of failed devices.
 */
export function listDeviceStatesForDeviceClassSubgroupDeployment(
  context: Client,
  groupId: string,
  deviceClassId: string,
  deploymentId: string,
  options: DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DeploymentDeviceState> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listDeviceStatesForDeviceClassSubgroupDeploymentSend(
        context,
        groupId,
        deviceClassId,
        deploymentId,
        options,
      ),
    _listDeviceStatesForDeviceClassSubgroupDeploymentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _getDeviceClassSubgroupDeploymentStatusSend(
  context: Client,
  groupId: string,
  deviceClassId: string,
  deploymentId: string,
  options: DeviceManagementGetDeviceClassSubgroupDeploymentStatusOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}/status{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      deviceClassId: deviceClassId,
      deploymentId: deploymentId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getDeviceClassSubgroupDeploymentStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<DeviceClassSubgroupDeploymentStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deviceClassSubgroupDeploymentStatusDeserializer(result.body);
}

/**
 * Gets the status of a deployment including a breakdown of how many devices in
 * the deployment are in progress, completed, or failed.
 */
export async function getDeviceClassSubgroupDeploymentStatus(
  context: Client,
  groupId: string,
  deviceClassId: string,
  deploymentId: string,
  options: DeviceManagementGetDeviceClassSubgroupDeploymentStatusOptionalParams = {
    requestOptions: {},
  },
): Promise<DeviceClassSubgroupDeploymentStatus> {
  const result = await _getDeviceClassSubgroupDeploymentStatusSend(
    context,
    groupId,
    deviceClassId,
    deploymentId,
    options,
  );
  return _getDeviceClassSubgroupDeploymentStatusDeserialize(result);
}

export function _retryDeploymentSend(
  context: Client,
  groupId: string,
  deviceClassId: string,
  deploymentId: string,
  options: DeviceManagementRetryDeploymentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}:retry{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      deviceClassId: deviceClassId,
      deploymentId: deploymentId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _retryDeploymentDeserialize(
  result: PathUncheckedResponse,
): Promise<Deployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deploymentDeserializer(result.body);
}

/** Retries a deployment with failed devices. */
export async function retryDeployment(
  context: Client,
  groupId: string,
  deviceClassId: string,
  deploymentId: string,
  options: DeviceManagementRetryDeploymentOptionalParams = { requestOptions: {} },
): Promise<Deployment> {
  const result = await _retryDeploymentSend(context, groupId, deviceClassId, deploymentId, options);
  return _retryDeploymentDeserialize(result);
}

export function _stopDeploymentSend(
  context: Client,
  groupId: string,
  deviceClassId: string,
  deploymentId: string,
  options: DeviceManagementStopDeploymentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}:cancel{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      deviceClassId: deviceClassId,
      deploymentId: deploymentId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _stopDeploymentDeserialize(
  result: PathUncheckedResponse,
): Promise<Deployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deploymentDeserializer(result.body);
}

/** Stops a deployment. */
export async function stopDeployment(
  context: Client,
  groupId: string,
  deviceClassId: string,
  deploymentId: string,
  options: DeviceManagementStopDeploymentOptionalParams = { requestOptions: {} },
): Promise<Deployment> {
  const result = await _stopDeploymentSend(context, groupId, deviceClassId, deploymentId, options);
  return _stopDeploymentDeserialize(result);
}

export function _getDeploymentForDeviceClassSubgroupSend(
  context: Client,
  groupId: string,
  deviceClassId: string,
  deploymentId: string,
  options: DeviceManagementGetDeploymentForDeviceClassSubgroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments/{deploymentId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      deviceClassId: deviceClassId,
      deploymentId: deploymentId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getDeploymentForDeviceClassSubgroupDeserialize(
  result: PathUncheckedResponse,
): Promise<Deployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deploymentDeserializer(result.body);
}

/** Gets the deployment properties. */
export async function getDeploymentForDeviceClassSubgroup(
  context: Client,
  groupId: string,
  deviceClassId: string,
  deploymentId: string,
  options: DeviceManagementGetDeploymentForDeviceClassSubgroupOptionalParams = {
    requestOptions: {},
  },
): Promise<Deployment> {
  const result = await _getDeploymentForDeviceClassSubgroupSend(
    context,
    groupId,
    deviceClassId,
    deploymentId,
    options,
  );
  return _getDeploymentForDeviceClassSubgroupDeserialize(result);
}

export function _listDeploymentsForDeviceClassSubgroupSend(
  context: Client,
  groupId: string,
  deviceClassId: string,
  options: DeviceManagementListDeploymentsForDeviceClassSubgroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/deployments{?api%2Dversion,orderby}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      deviceClassId: deviceClassId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
      orderby: options?.orderBy,
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

export async function _listDeploymentsForDeviceClassSubgroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _deploymentsListDeserializer(result.body);
}

/** Gets a list of deployments for a device class subgroup. */
export function listDeploymentsForDeviceClassSubgroup(
  context: Client,
  groupId: string,
  deviceClassId: string,
  options: DeviceManagementListDeploymentsForDeviceClassSubgroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<Deployment> {
  return buildPagedAsyncIterator(
    context,
    () => _listDeploymentsForDeviceClassSubgroupSend(context, groupId, deviceClassId, options),
    _listDeploymentsForDeviceClassSubgroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _getBestUpdatesForDeviceClassSubgroupSend(
  context: Client,
  groupId: string,
  deviceClassId: string,
  options: DeviceManagementGetBestUpdatesForDeviceClassSubgroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/bestUpdates{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      deviceClassId: deviceClassId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getBestUpdatesForDeviceClassSubgroupDeserialize(
  result: PathUncheckedResponse,
): Promise<DeviceClassSubgroupUpdatableDevices> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deviceClassSubgroupUpdatableDevicesDeserializer(result.body);
}

/**
 * Get the best available update for a device class subgroup and a count of how
 * many devices need this update.
 */
export async function getBestUpdatesForDeviceClassSubgroup(
  context: Client,
  groupId: string,
  deviceClassId: string,
  options: DeviceManagementGetBestUpdatesForDeviceClassSubgroupOptionalParams = {
    requestOptions: {},
  },
): Promise<DeviceClassSubgroupUpdatableDevices> {
  const result = await _getBestUpdatesForDeviceClassSubgroupSend(
    context,
    groupId,
    deviceClassId,
    options,
  );
  return _getBestUpdatesForDeviceClassSubgroupDeserialize(result);
}

export function _getDeviceClassSubgroupUpdateComplianceSend(
  context: Client,
  groupId: string,
  deviceClassId: string,
  options: DeviceManagementGetDeviceClassSubgroupUpdateComplianceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}/updateCompliance{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      deviceClassId: deviceClassId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getDeviceClassSubgroupUpdateComplianceDeserialize(
  result: PathUncheckedResponse,
): Promise<UpdateCompliance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return updateComplianceDeserializer(result.body);
}

/**
 * Get device class subgroup update compliance information such as how many
 * devices are on their latest update, how many need new updates, and how many are
 * in progress on receiving a new update.
 */
export async function getDeviceClassSubgroupUpdateCompliance(
  context: Client,
  groupId: string,
  deviceClassId: string,
  options: DeviceManagementGetDeviceClassSubgroupUpdateComplianceOptionalParams = {
    requestOptions: {},
  },
): Promise<UpdateCompliance> {
  const result = await _getDeviceClassSubgroupUpdateComplianceSend(
    context,
    groupId,
    deviceClassId,
    options,
  );
  return _getDeviceClassSubgroupUpdateComplianceDeserialize(result);
}

export function _deleteDeviceClassSubgroupSend(
  context: Client,
  groupId: string,
  deviceClassId: string,
  options: DeviceManagementDeleteDeviceClassSubgroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      deviceClassId: deviceClassId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteDeviceClassSubgroupDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
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

/**
 * Deletes a device class subgroup. This subgroup is automatically created when a
 * Device Update-enabled device is connected to the hub and reports its
 * properties. Groups, subgroups, and deployments are not automatically cleaned up
 * but are retained for history purposes. Users can call this method to delete a
 * subgroup if they do not need to retain any of the history of the subgroup and
 * no longer need it. If a device is ever connected again for this subgroup after
 * the subgroup was deleted it will be automatically re-created but there will be
 * no history.
 */
export async function deleteDeviceClassSubgroup(
  context: Client,
  groupId: string,
  deviceClassId: string,
  options: DeviceManagementDeleteDeviceClassSubgroupOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteDeviceClassSubgroupSend(context, groupId, deviceClassId, options);
  return _deleteDeviceClassSubgroupDeserialize(result);
}

export function _getDeviceClassSubgroupSend(
  context: Client,
  groupId: string,
  deviceClassId: string,
  options: DeviceManagementGetDeviceClassSubgroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups/{deviceClassId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      deviceClassId: deviceClassId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getDeviceClassSubgroupDeserialize(
  result: PathUncheckedResponse,
): Promise<DeviceClassSubgroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deviceClassSubgroupDeserializer(result.body);
}

/**
 * Gets device class subgroup details. A device class subgroup is the set of
 * devices within the group that share the same device class. All devices within
 * the same device class are compatible with the same updates.
 */
export async function getDeviceClassSubgroup(
  context: Client,
  groupId: string,
  deviceClassId: string,
  options: DeviceManagementGetDeviceClassSubgroupOptionalParams = { requestOptions: {} },
): Promise<DeviceClassSubgroup> {
  const result = await _getDeviceClassSubgroupSend(context, groupId, deviceClassId, options);
  return _getDeviceClassSubgroupDeserialize(result);
}

export function _listDeviceClassSubgroupsForGroupSend(
  context: Client,
  groupId: string,
  options: DeviceManagementListDeviceClassSubgroupsForGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/deviceClassSubgroups{?api%2Dversion,filter}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
      filter: options?.filter,
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

export async function _listDeviceClassSubgroupsForGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeviceClassSubgroupsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _deviceClassSubgroupsListDeserializer(result.body);
}

/**
 * Get the device class subgroups for the group. A device class subgroup is the
 * set of devices within the group that share the same device class. All devices
 * within the same device class are compatible with the same updates.
 */
export function listDeviceClassSubgroupsForGroup(
  context: Client,
  groupId: string,
  options: DeviceManagementListDeviceClassSubgroupsForGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeviceClassSubgroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listDeviceClassSubgroupsForGroupSend(context, groupId, options),
    _listDeviceClassSubgroupsForGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _getDeploymentStatusSend(
  context: Client,
  groupId: string,
  deploymentId: string,
  options: DeviceManagementGetDeploymentStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}/status{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      deploymentId: deploymentId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getDeploymentStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deploymentStatusDeserializer(result.body);
}

/**
 * Gets the status of a deployment including a breakdown of how many devices in
 * the deployment are in progress, completed, or failed.
 */
export async function getDeploymentStatus(
  context: Client,
  groupId: string,
  deploymentId: string,
  options: DeviceManagementGetDeploymentStatusOptionalParams = { requestOptions: {} },
): Promise<DeploymentStatus> {
  const result = await _getDeploymentStatusSend(context, groupId, deploymentId, options);
  return _getDeploymentStatusDeserialize(result);
}

export function _createOrUpdateDeploymentSend(
  context: Client,
  groupId: string,
  deploymentId: string,
  deployment: Deployment,
  options: DeviceManagementCreateOrUpdateDeploymentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      deploymentId: deploymentId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deploymentSerializer(deployment),
  });
}

export async function _createOrUpdateDeploymentDeserialize(
  result: PathUncheckedResponse,
): Promise<Deployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deploymentDeserializer(result.body);
}

/** Creates or updates a deployment. */
export async function createOrUpdateDeployment(
  context: Client,
  groupId: string,
  deploymentId: string,
  deployment: Deployment,
  options: DeviceManagementCreateOrUpdateDeploymentOptionalParams = { requestOptions: {} },
): Promise<Deployment> {
  const result = await _createOrUpdateDeploymentSend(
    context,
    groupId,
    deploymentId,
    deployment,
    options,
  );
  return _createOrUpdateDeploymentDeserialize(result);
}

export function _getDeploymentSend(
  context: Client,
  groupId: string,
  deploymentId: string,
  options: DeviceManagementGetDeploymentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      deploymentId: deploymentId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getDeploymentDeserialize(
  result: PathUncheckedResponse,
): Promise<Deployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deploymentDeserializer(result.body);
}

/** Gets the deployment properties. */
export async function getDeployment(
  context: Client,
  groupId: string,
  deploymentId: string,
  options: DeviceManagementGetDeploymentOptionalParams = { requestOptions: {} },
): Promise<Deployment> {
  const result = await _getDeploymentSend(context, groupId, deploymentId, options);
  return _getDeploymentDeserialize(result);
}

export function _listDeploymentsForGroupSend(
  context: Client,
  groupId: string,
  options: DeviceManagementListDeploymentsForGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/deployments{?api%2Dversion,orderby}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
      orderby: options?.orderBy,
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

export async function _listDeploymentsForGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _deploymentsListDeserializer(result.body);
}

/** Gets a list of deployments for a device group. */
export function listDeploymentsForGroup(
  context: Client,
  groupId: string,
  options: DeviceManagementListDeploymentsForGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Deployment> {
  return buildPagedAsyncIterator(
    context,
    () => _listDeploymentsForGroupSend(context, groupId, options),
    _listDeploymentsForGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _listBestUpdatesForGroupSend(
  context: Client,
  groupId: string,
  options: DeviceManagementListBestUpdatesForGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/bestUpdates{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _listBestUpdatesForGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeviceClassSubgroupUpdatableDevicesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _deviceClassSubgroupUpdatableDevicesListDeserializer(result.body);
}

/**
 * Get the best available updates for a device group and a count of how many
 * devices need each update.
 */
export function listBestUpdatesForGroup(
  context: Client,
  groupId: string,
  options: DeviceManagementListBestUpdatesForGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeviceClassSubgroupUpdatableDevices> {
  return buildPagedAsyncIterator(
    context,
    () => _listBestUpdatesForGroupSend(context, groupId, options),
    _listBestUpdatesForGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _getUpdateComplianceForGroupSend(
  context: Client,
  groupId: string,
  options: DeviceManagementGetUpdateComplianceForGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}/updateCompliance{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getUpdateComplianceForGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<UpdateCompliance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return updateComplianceDeserializer(result.body);
}

/**
 * Get device group update compliance information such as how many devices are on
 * their latest update, how many need new updates, and how many are in progress on
 * receiving a new update.
 */
export async function getUpdateComplianceForGroup(
  context: Client,
  groupId: string,
  options: DeviceManagementGetUpdateComplianceForGroupOptionalParams = { requestOptions: {} },
): Promise<UpdateCompliance> {
  const result = await _getUpdateComplianceForGroupSend(context, groupId, options);
  return _getUpdateComplianceForGroupDeserialize(result);
}

export function _deleteGroupSend(
  context: Client,
  groupId: string,
  options: DeviceManagementDeleteGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteGroupDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/**
 * Deletes a device group. This group is automatically created when a Device
 * Update-enabled device is connected to the hub and reports its properties.
 * Groups, subgroups, and deployments are not automatically cleaned up but are
 * retained for history purposes. Users can call this method to delete a group if
 * they do not need to retain any of the history of the group and no longer need
 * it. If a device is ever connected again for this group after the group was
 * deleted it will be automatically re-created but there will be no history.
 */
export async function deleteGroup(
  context: Client,
  groupId: string,
  options: DeviceManagementDeleteGroupOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteGroupSend(context, groupId, options);
  return _deleteGroupDeserialize(result);
}

export function _getGroupSend(
  context: Client,
  groupId: string,
  options: DeviceManagementGetGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups/{groupId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getGroupDeserialize(result: PathUncheckedResponse): Promise<Group> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return groupDeserializer(result.body);
}

/** Gets the device group properties. */
export async function getGroup(
  context: Client,
  groupId: string,
  options: DeviceManagementGetGroupOptionalParams = { requestOptions: {} },
): Promise<Group> {
  const result = await _getGroupSend(context, groupId, options);
  return _getGroupDeserialize(result);
}

export function _listGroupsSend(
  context: Client,
  options: DeviceManagementListGroupsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/groups{?api%2Dversion,orderby}",
    {
      instanceId: context.instanceId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
      orderby: options?.orderBy,
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

export async function _listGroupsDeserialize(result: PathUncheckedResponse): Promise<_GroupsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _groupsListDeserializer(result.body);
}

/**
 * Gets a list of all device groups.  The $default group will always be returned
 * first.
 */
export function listGroups(
  context: Client,
  options: DeviceManagementListGroupsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Group> {
  return buildPagedAsyncIterator(
    context,
    () => _listGroupsSend(context, options),
    _listGroupsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _getUpdateComplianceSend(
  context: Client,
  options: DeviceManagementGetUpdateComplianceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/updateCompliance{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getUpdateComplianceDeserialize(
  result: PathUncheckedResponse,
): Promise<UpdateCompliance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return updateComplianceDeserializer(result.body);
}

/**
 * Gets the breakdown of how many devices are on their latest update, have new
 * updates available, or are in progress receiving new updates.
 */
export async function getUpdateCompliance(
  context: Client,
  options: DeviceManagementGetUpdateComplianceOptionalParams = { requestOptions: {} },
): Promise<UpdateCompliance> {
  const result = await _getUpdateComplianceSend(context, options);
  return _getUpdateComplianceDeserialize(result);
}

export function _getDeviceModuleSend(
  context: Client,
  deviceId: string,
  moduleId: string,
  options: DeviceManagementGetDeviceModuleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/devices/{deviceId}/modules/{moduleId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      deviceId: deviceId,
      moduleId: moduleId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getDeviceModuleDeserialize(result: PathUncheckedResponse): Promise<Device> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deviceDeserializer(result.body);
}

/**
 * Gets the device module properties and latest deployment status for a device
 * module connected to Device Update for IoT Hub.
 */
export async function getDeviceModule(
  context: Client,
  deviceId: string,
  moduleId: string,
  options: DeviceManagementGetDeviceModuleOptionalParams = { requestOptions: {} },
): Promise<Device> {
  const result = await _getDeviceModuleSend(context, deviceId, moduleId, options);
  return _getDeviceModuleDeserialize(result);
}

export function _getDeviceSend(
  context: Client,
  deviceId: string,
  options: DeviceManagementGetDeviceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/devices/{deviceId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      deviceId: deviceId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getDeviceDeserialize(result: PathUncheckedResponse): Promise<Device> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deviceDeserializer(result.body);
}

/**
 * Gets the device properties and latest deployment status for a device connected
 * to Device Update for IoT Hub.
 */
export async function getDevice(
  context: Client,
  deviceId: string,
  options: DeviceManagementGetDeviceOptionalParams = { requestOptions: {} },
): Promise<Device> {
  const result = await _getDeviceSend(context, deviceId, options);
  return _getDeviceDeserialize(result);
}

export function _importDevicesSend(
  context: Client,
  importType: ImportType,
  options: DeviceManagementImportDevicesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/devices:import{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: importType,
  });
}

export async function _importDevicesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/**
 * Import existing devices from IoT Hub. This is a long-running-operation; use
 * Operation-Location response header value to check for operation status.
 */
export function importDevices(
  context: Client,
  importType: ImportType,
  options: DeviceManagementImportDevicesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _importDevicesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _importDevicesSend(context, importType, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listDevicesSend(
  context: Client,
  options: DeviceManagementListDevicesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/devices{?api%2Dversion,filter}",
    {
      instanceId: context.instanceId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
      filter: options?.filter,
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

export async function _listDevicesDeserialize(
  result: PathUncheckedResponse,
): Promise<_DevicesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _devicesListDeserializer(result.body);
}

/** Gets a list of devices connected to Device Update for IoT Hub. */
export function listDevices(
  context: Client,
  options: DeviceManagementListDevicesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Device> {
  return buildPagedAsyncIterator(
    context,
    () => _listDevicesSend(context, options),
    _listDevicesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _listInstallableUpdatesForDeviceClassSend(
  context: Client,
  deviceClassId: string,
  options: DeviceManagementListInstallableUpdatesForDeviceClassOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/deviceClasses/{deviceClassId}/installableUpdates{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      deviceClassId: deviceClassId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _listInstallableUpdatesForDeviceClassDeserialize(
  result: PathUncheckedResponse,
): Promise<_UpdateInfoList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _updateInfoListDeserializer(result.body);
}

/** Gets a list of installable updates for a device class. */
export function listInstallableUpdatesForDeviceClass(
  context: Client,
  deviceClassId: string,
  options: DeviceManagementListInstallableUpdatesForDeviceClassOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<UpdateInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listInstallableUpdatesForDeviceClassSend(context, deviceClassId, options),
    _listInstallableUpdatesForDeviceClassDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _deleteDeviceClassSend(
  context: Client,
  deviceClassId: string,
  options: DeviceManagementDeleteDeviceClassOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/deviceClasses/{deviceClassId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      deviceClassId: deviceClassId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteDeviceClassDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/**
 * Deletes a device class. Device classes are created automatically when Device
 * Update-enabled devices are connected to the hub but are not automatically
 * cleaned up since they are referenced by DeviceClassSubgroups. If the user has
 * deleted all DeviceClassSubgroups for a device class they can also delete the
 * device class to remove the records from the system and to stop checking the
 * compatibility of this device class with new updates. If a device is ever
 * reconnected for this device class it will be re-created.
 */
export async function deleteDeviceClass(
  context: Client,
  deviceClassId: string,
  options: DeviceManagementDeleteDeviceClassOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteDeviceClassSend(context, deviceClassId, options);
  return _deleteDeviceClassDeserialize(result);
}

export function _updateDeviceClassSend(
  context: Client,
  deviceClassId: string,
  deviceClassPatch: PatchBody,
  options: DeviceManagementUpdateDeviceClassOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/deviceClasses/{deviceClassId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      deviceClassId: deviceClassId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/merge-patch+json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: patchBodySerializer(deviceClassPatch),
  });
}

export async function _updateDeviceClassDeserialize(
  result: PathUncheckedResponse,
): Promise<DeviceClass> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deviceClassDeserializer(result.body);
}

/** Update device class details. */
export async function updateDeviceClass(
  context: Client,
  deviceClassId: string,
  deviceClassPatch: PatchBody,
  options: DeviceManagementUpdateDeviceClassOptionalParams = { requestOptions: {} },
): Promise<DeviceClass> {
  const result = await _updateDeviceClassSend(context, deviceClassId, deviceClassPatch, options);
  return _updateDeviceClassDeserialize(result);
}

export function _getDeviceClassSend(
  context: Client,
  deviceClassId: string,
  options: DeviceManagementGetDeviceClassOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/deviceClasses/{deviceClassId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      deviceClassId: deviceClassId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getDeviceClassDeserialize(
  result: PathUncheckedResponse,
): Promise<DeviceClass> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deviceClassDeserializer(result.body);
}

/** Gets the properties of a device class. */
export async function getDeviceClass(
  context: Client,
  deviceClassId: string,
  options: DeviceManagementGetDeviceClassOptionalParams = { requestOptions: {} },
): Promise<DeviceClass> {
  const result = await _getDeviceClassSend(context, deviceClassId, options);
  return _getDeviceClassDeserialize(result);
}

export function _listDeviceClassesSend(
  context: Client,
  options: DeviceManagementListDeviceClassesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/management/deviceClasses{?api%2Dversion,filter}",
    {
      instanceId: context.instanceId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
      filter: options?.filter,
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

export async function _listDeviceClassesDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeviceClassesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _deviceClassesListDeserializer(result.body);
}

/**
 * Gets a list of all device classes (sets of devices compatible with the same
 * updates based on the model Id and compat properties reported in the Device
 * Update PnP interface in IoT Hub) for all devices connected to Device Update for
 * IoT Hub.
 */
export function listDeviceClasses(
  context: Client,
  options: DeviceManagementListDeviceClassesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeviceClass> {
  return buildPagedAsyncIterator(
    context,
    () => _listDeviceClassesSend(context, options),
    _listDeviceClassesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}
