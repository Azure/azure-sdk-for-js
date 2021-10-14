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

export interface UpdatesListUpdateIdsQueryParamProperties {
  /** Request updates matching a free-text search expression. */
  $search?: string;
  /** Filter updates by its properties. */
  $filter?: string;
}

export interface UpdatesListUpdateIdsQueryParam {
  queryParameters?: UpdatesListUpdateIdsQueryParamProperties;
}

export type UpdatesListUpdateIdsParameters = UpdatesListUpdateIdsQueryParam &
  RequestParameters;
export type UpdatesGetUpdateParameters = RequestParameters;
export type UpdatesDeleteUpdateParameters = RequestParameters;
export type UpdatesListProvidersParameters = RequestParameters;
export type UpdatesListNamesParameters = RequestParameters;

export interface UpdatesListVersionsQueryParamProperties {
  /** Filter updates by its properties. */
  $filter?: string;
}

export interface UpdatesListVersionsQueryParam {
  queryParameters?: UpdatesListVersionsQueryParamProperties;
}

export type UpdatesListVersionsParameters = UpdatesListVersionsQueryParam &
  RequestParameters;
export type UpdatesListFilesParameters = RequestParameters;
export type UpdatesGetFileParameters = RequestParameters;

export interface UpdatesListOperationsQueryParamProperties {
  /** Restricts the set of operations returned. Only one specific filter is supported: "status eq 'NotStarted' or status eq 'Running'" */
  $filter?: string;
  /** Specifies a non-negative integer n that limits the number of items returned from a collection. The service returns the number of available items up to but not greater than the specified value n. */
  $top?: number;
}

export interface UpdatesListOperationsQueryParam {
  queryParameters?: UpdatesListOperationsQueryParamProperties;
}

export type UpdatesListOperationsParameters = UpdatesListOperationsQueryParam &
  RequestParameters;
export type UpdatesGetOperationParameters = RequestParameters;
export type DevicesListDeviceClassesParameters = RequestParameters;
export type DevicesGetDeviceClassParameters = RequestParameters;
export type DevicesListDeviceClassDeviceIdsParameters = RequestParameters;
export type DevicesListDeviceClassInstallableUpdatesParameters = RequestParameters;

export interface DevicesListDevicesQueryParamProperties {
  /** Restricts the set of devices returned. You can only filter on device GroupId. */
  $filter?: string;
}

export interface DevicesListDevicesQueryParam {
  queryParameters?: DevicesListDevicesQueryParamProperties;
}

export type DevicesListDevicesParameters = DevicesListDevicesQueryParam &
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
export type DevicesListDeviceTagsParameters = RequestParameters;
export type DevicesGetDeviceTagParameters = RequestParameters;
export type DevicesListGroupsParameters = RequestParameters;
export type DevicesGetGroupParameters = RequestParameters;

export interface DevicesCreateOrUpdateGroupBodyParam {
  /** The group properties. */
  body: Group;
}

export type DevicesCreateOrUpdateGroupParameters = DevicesCreateOrUpdateGroupBodyParam &
  RequestParameters;
export type DevicesDeleteGroupParameters = RequestParameters;
export type DevicesGetGroupUpdateComplianceParameters = RequestParameters;

export interface DevicesListGroupBestUpdatesQueryParamProperties {
  /** Restricts the set of bestUpdates returned. You can filter on update Provider, Name and Version property. */
  $filter?: string;
}

export interface DevicesListGroupBestUpdatesQueryParam {
  queryParameters?: DevicesListGroupBestUpdatesQueryParamProperties;
}

export type DevicesListGroupBestUpdatesParameters = DevicesListGroupBestUpdatesQueryParam &
  RequestParameters;
export type DevicesGetOperationParameters = RequestParameters;

export interface DevicesListOperationsQueryParamProperties {
  /** Restricts the set of operations returned. Only one specific filter is supported: "status eq 'NotStarted' or status eq 'Running'" */
  $filter?: string;
  /** Specifies a non-negative integer n that limits the number of items returned from a collection. The service returns the number of available items up to but not greater than the specified value n. */
  $top?: number;
}

export interface DevicesListOperationsQueryParam {
  queryParameters?: DevicesListOperationsQueryParamProperties;
}

export type DevicesListOperationsParameters = DevicesListOperationsQueryParam &
  RequestParameters;

export interface DeploymentsListAllDeploymentsQueryParamProperties {
  /** Restricts the set of deployments returned. You can filter on update Provider, Name and Version property. */
  $filter?: string;
}

export interface DeploymentsListAllDeploymentsQueryParam {
  queryParameters?: DeploymentsListAllDeploymentsQueryParamProperties;
}

export type DeploymentsListAllDeploymentsParameters = DeploymentsListAllDeploymentsQueryParam &
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

export interface DeploymentsListDeploymentDevicesQueryParamProperties {
  /** Restricts the set of deployment device states returned. You can filter on deviceId and/or deviceState. */
  $filter?: string;
}

export interface DeploymentsListDeploymentDevicesQueryParam {
  queryParameters?: DeploymentsListDeploymentDevicesQueryParamProperties;
}

export type DeploymentsListDeploymentDevicesParameters = DeploymentsListDeploymentDevicesQueryParam &
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

export interface DiagnosticsUploadLogBodyParam {
  /** The deployment properties. */
  body: DiagnosticsOperation;
}

export type DiagnosticsUploadLogParameters = DiagnosticsUploadLogBodyParam &
  RequestParameters;
export type DiagnosticsGetOperationParameters = RequestParameters;
export type DiagnosticsGetOperationStatusParameters = RequestParameters;
export type DiagnosticsListOperationsParameters = RequestParameters;
