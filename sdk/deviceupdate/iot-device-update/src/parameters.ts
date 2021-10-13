// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  ImportUpdateInputItem,
  Group,
  Deployment,
  DiagnosticsOperation
} from "./models";

export interface UpdatesImportUpdateBodyParam {
  /** The update to be imported. */
  body: Array<ImportUpdateInputItem>;
}

export interface UpdatesImportUpdateQueryParamProperties {
  /** Import update action. */
  action: "import";
}

export interface UpdatesImportUpdateQueryParam {
  queryParameters: UpdatesImportUpdateQueryParamProperties;
}

export type UpdatesImportUpdateParameters = UpdatesImportUpdateQueryParam &
  UpdatesImportUpdateBodyParam &
  RequestParameters;

export interface UpdatesGetUpdateIdsQueryParamProperties {
  /** Request updates matching a free-text search expression. */
  $search?: string;
  /** Filter updates by its properties. */
  $filter?: string;
}

export interface UpdatesGetUpdateIdsQueryParam {
  queryParameters?: UpdatesGetUpdateIdsQueryParamProperties;
}

export type UpdatesGetUpdateIdsParameters = UpdatesGetUpdateIdsQueryParam &
  RequestParameters;
export type UpdatesGetUpdateParameters = RequestParameters;
export type UpdatesDeleteUpdateParameters = RequestParameters;
export type UpdatesGetProvidersParameters = RequestParameters;
export type UpdatesGetNamesParameters = RequestParameters;

export interface UpdatesGetVersionsQueryParamProperties {
  /** Filter updates by its properties. */
  $filter?: string;
}

export interface UpdatesGetVersionsQueryParam {
  queryParameters?: UpdatesGetVersionsQueryParamProperties;
}

export type UpdatesGetVersionsParameters = UpdatesGetVersionsQueryParam &
  RequestParameters;
export type UpdatesGetFilesParameters = RequestParameters;
export type UpdatesGetFileParameters = RequestParameters;

export interface UpdatesGetOperationsQueryParamProperties {
  /** Restricts the set of operations returned. Only one specific filter is supported: "status eq 'NotStarted' or status eq 'Running'" */
  $filter?: string;
  /** Specifies a non-negative integer n that limits the number of items returned from a collection. The service returns the number of available items up to but not greater than the specified value n. */
  $top?: number;
}

export interface UpdatesGetOperationsQueryParam {
  queryParameters?: UpdatesGetOperationsQueryParamProperties;
}

export type UpdatesGetOperationsParameters = UpdatesGetOperationsQueryParam &
  RequestParameters;
export type UpdatesGetOperationParameters = RequestParameters;
export type DevicesGetAllDeviceClassesParameters = RequestParameters;
export type DevicesGetDeviceClassParameters = RequestParameters;
export type DevicesGetDeviceClassDeviceIdsParameters = RequestParameters;
export type DevicesGetDeviceClassInstallableUpdatesParameters = RequestParameters;

export interface DevicesGetAllDevicesQueryParamProperties {
  /** Restricts the set of devices returned. You can only filter on device GroupId. */
  $filter?: string;
}

export interface DevicesGetAllDevicesQueryParam {
  queryParameters?: DevicesGetAllDevicesQueryParamProperties;
}

export type DevicesGetAllDevicesParameters = DevicesGetAllDevicesQueryParam &
  RequestParameters;

export interface DevicesImportDevicesBodyParam {
  /** The types of devices to import. */
  body: "Devices" | "Modules" | "All";
}

export interface DevicesImportDevicesQueryParamProperties {
  /** Devices action. */
  action: "import";
}

export interface DevicesImportDevicesQueryParam {
  queryParameters: DevicesImportDevicesQueryParamProperties;
}

export type DevicesImportDevicesParameters = DevicesImportDevicesQueryParam &
  DevicesImportDevicesBodyParam &
  RequestParameters;
export type DevicesGetDeviceParameters = RequestParameters;
export type DevicesGetUpdateComplianceParameters = RequestParameters;
export type DevicesGetAllDeviceTagsParameters = RequestParameters;
export type DevicesGetDeviceTagParameters = RequestParameters;
export type DevicesGetAllGroupsParameters = RequestParameters;
export type DevicesGetGroupParameters = RequestParameters;

export interface DevicesCreateOrUpdateGroupBodyParam {
  /** The group properties. */
  body: Group;
}

export type DevicesCreateOrUpdateGroupParameters = DevicesCreateOrUpdateGroupBodyParam &
  RequestParameters;
export type DevicesDeleteGroupParameters = RequestParameters;
export type DevicesGetGroupUpdateComplianceParameters = RequestParameters;

export interface DevicesGetGroupBestUpdatesQueryParamProperties {
  /** Restricts the set of bestUpdates returned. You can filter on update Provider, Name and Version property. */
  $filter?: string;
}

export interface DevicesGetGroupBestUpdatesQueryParam {
  queryParameters?: DevicesGetGroupBestUpdatesQueryParamProperties;
}

export type DevicesGetGroupBestUpdatesParameters = DevicesGetGroupBestUpdatesQueryParam &
  RequestParameters;
export type DevicesGetOperationParameters = RequestParameters;

export interface DevicesGetOperationsQueryParamProperties {
  /** Restricts the set of operations returned. Only one specific filter is supported: "status eq 'NotStarted' or status eq 'Running'" */
  $filter?: string;
  /** Specifies a non-negative integer n that limits the number of items returned from a collection. The service returns the number of available items up to but not greater than the specified value n. */
  $top?: number;
}

export interface DevicesGetOperationsQueryParam {
  queryParameters?: DevicesGetOperationsQueryParamProperties;
}

export type DevicesGetOperationsParameters = DevicesGetOperationsQueryParam &
  RequestParameters;

export interface DeploymentsGetAllDeploymentsQueryParamProperties {
  /** Restricts the set of deployments returned. You can filter on update Provider, Name and Version property. */
  $filter?: string;
}

export interface DeploymentsGetAllDeploymentsQueryParam {
  queryParameters?: DeploymentsGetAllDeploymentsQueryParamProperties;
}

export type DeploymentsGetAllDeploymentsParameters = DeploymentsGetAllDeploymentsQueryParam &
  RequestParameters;
export type DeploymentsGetDeploymentParameters = RequestParameters;

export interface DeploymentsCreateOrUpdateDeploymentBodyParam {
  /** The deployment properties. */
  body: Deployment;
}

export type DeploymentsCreateOrUpdateDeploymentParameters = DeploymentsCreateOrUpdateDeploymentBodyParam &
  RequestParameters;
export type DeploymentsDeleteDeploymentParameters = RequestParameters;
export type DeploymentsGetDeploymentStatusParameters = RequestParameters;

export interface DeploymentsGetDeploymentDevicesQueryParamProperties {
  /** Restricts the set of deployment device states returned. You can filter on deviceId and/or deviceState. */
  $filter?: string;
}

export interface DeploymentsGetDeploymentDevicesQueryParam {
  queryParameters?: DeploymentsGetDeploymentDevicesQueryParamProperties;
}

export type DeploymentsGetDeploymentDevicesParameters = DeploymentsGetDeploymentDevicesQueryParam &
  RequestParameters;

export interface DeploymentsCancelDeploymentQueryParamProperties {
  /** Cancel deployment action. */
  action: "cancel";
}

export interface DeploymentsCancelDeploymentQueryParam {
  queryParameters: DeploymentsCancelDeploymentQueryParamProperties;
}

export type DeploymentsCancelDeploymentParameters = DeploymentsCancelDeploymentQueryParam &
  RequestParameters;

export interface DeploymentsRetryDeploymentQueryParamProperties {
  /** Retry deployment action. */
  action: "retry";
}

export interface DeploymentsRetryDeploymentQueryParam {
  queryParameters: DeploymentsRetryDeploymentQueryParamProperties;
}

export type DeploymentsRetryDeploymentParameters = DeploymentsRetryDeploymentQueryParam &
  RequestParameters;

export interface DiagnosticsPutOperationBodyParam {
  /** The deployment properties. */
  body: DiagnosticsOperation;
}

export type DiagnosticsPutOperationParameters = DiagnosticsPutOperationBodyParam &
  RequestParameters;
export type DiagnosticsGetOperationParameters = RequestParameters;
export type DiagnosticsGetOperationStatusParameters = RequestParameters;
export type DiagnosticsGetOperationsParameters = RequestParameters;
