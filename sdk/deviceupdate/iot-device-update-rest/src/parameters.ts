// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import { Deployment, Group, ImportUpdateInputItem, LogCollectionOperation } from "./models";

export interface DeviceUpdateImportUpdateBodyParam {
  /** The update to be imported. */
  body: Array<ImportUpdateInputItem>;
}

export interface DeviceUpdateImportUpdateQueryParamProperties {
  /** Import update action. */
  action: "import";
}

export interface DeviceUpdateImportUpdateQueryParam {
  queryParameters: DeviceUpdateImportUpdateQueryParamProperties;
}

export interface DeviceUpdateImportUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DeviceUpdateImportUpdateParameters = DeviceUpdateImportUpdateQueryParam &
  DeviceUpdateImportUpdateMediaTypesParam &
  DeviceUpdateImportUpdateBodyParam &
  RequestParameters;

export interface DeviceUpdateListUpdatesQueryParamProperties {
  /** Request updates matching a free-text search expression. */
  $search?: string;
  /** Filter updates by its properties. */
  $filter?: string;
}

export interface DeviceUpdateListUpdatesQueryParam {
  queryParameters?: DeviceUpdateListUpdatesQueryParamProperties;
}

export type DeviceUpdateListUpdatesParameters = DeviceUpdateListUpdatesQueryParam &
  RequestParameters;

export interface DeviceUpdateGetUpdateHeaders {
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
}

export interface DeviceUpdateGetUpdateHeaderParam {
  headers: RawHttpHeadersInput & DeviceUpdateGetUpdateHeaders;
}

export type DeviceUpdateGetUpdateParameters = DeviceUpdateGetUpdateHeaderParam & RequestParameters;
export type DeviceUpdateDeleteUpdateParameters = RequestParameters;
export type DeviceUpdateListProvidersParameters = RequestParameters;
export type DeviceUpdateListNamesParameters = RequestParameters;

export interface DeviceUpdateListVersionsQueryParamProperties {
  /** Filter updates by its properties. */
  $filter?: string;
}

export interface DeviceUpdateListVersionsQueryParam {
  queryParameters?: DeviceUpdateListVersionsQueryParamProperties;
}

export type DeviceUpdateListVersionsParameters = DeviceUpdateListVersionsQueryParam &
  RequestParameters;
export type DeviceUpdateListFilesParameters = RequestParameters;

export interface DeviceUpdateGetFileHeaders {
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
}

export interface DeviceUpdateGetFileHeaderParam {
  headers: RawHttpHeadersInput & DeviceUpdateGetFileHeaders;
}

export type DeviceUpdateGetFileParameters = DeviceUpdateGetFileHeaderParam & RequestParameters;

export interface DeviceUpdateListOperationsQueryParamProperties {
  /** Restricts the set of operations returned. Only one specific filter is supported: "status eq 'NotStarted' or status eq 'Running'" */
  $filter?: string;
  /** Specifies a non-negative integer n that limits the number of items returned from a collection. The service returns the number of available items up to but not greater than the specified value n. */
  $top?: number;
}

export interface DeviceUpdateListOperationsQueryParam {
  queryParameters?: DeviceUpdateListOperationsQueryParamProperties;
}

export type DeviceUpdateListOperationsParameters = DeviceUpdateListOperationsQueryParam &
  RequestParameters;

export interface DeviceUpdateGetOperationHeaders {
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
}

export interface DeviceUpdateGetOperationHeaderParam {
  headers: RawHttpHeadersInput & DeviceUpdateGetOperationHeaders;
}

export type DeviceUpdateGetOperationParameters = DeviceUpdateGetOperationHeaderParam &
  RequestParameters;
export type DeviceManagementListDeviceClassesParameters = RequestParameters;
export type DeviceManagementGetDeviceClassParameters = RequestParameters;
export type DeviceManagementListInstallableUpdatesForDeviceClassParameters = RequestParameters;

export interface DeviceManagementListDevicesQueryParamProperties {
  /** Restricts the set of devices returned. You can filter on device GroupId or DeviceClassId. */
  $filter?: string;
}

export interface DeviceManagementListDevicesQueryParam {
  queryParameters?: DeviceManagementListDevicesQueryParamProperties;
}

export type DeviceManagementListDevicesParameters = DeviceManagementListDevicesQueryParam &
  RequestParameters;

export interface DeviceManagementImportDevicesBodyParam {
  /** The types of devices to import. */
  body: "Devices" | "Modules" | "All";
}

export interface DeviceManagementImportDevicesQueryParamProperties {
  /** Devices action. */
  action: "import";
}

export interface DeviceManagementImportDevicesQueryParam {
  queryParameters: DeviceManagementImportDevicesQueryParamProperties;
}

export interface DeviceManagementImportDevicesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DeviceManagementImportDevicesParameters = DeviceManagementImportDevicesQueryParam &
  DeviceManagementImportDevicesMediaTypesParam &
  DeviceManagementImportDevicesBodyParam &
  RequestParameters;
export type DeviceManagementGetDeviceParameters = RequestParameters;
export type DeviceManagementGetDeviceModuleParameters = RequestParameters;
export type DeviceManagementGetUpdateComplianceParameters = RequestParameters;
export type DeviceManagementListDeviceTagsParameters = RequestParameters;
export type DeviceManagementGetDeviceTagParameters = RequestParameters;
export type DeviceManagementListGroupsParameters = RequestParameters;
export type DeviceManagementGetGroupParameters = RequestParameters;

export interface DeviceManagementCreateOrUpdateGroupBodyParam {
  /** The group properties. */
  body: Group;
}

export interface DeviceManagementCreateOrUpdateGroupMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DeviceManagementCreateOrUpdateGroupParameters = DeviceManagementCreateOrUpdateGroupMediaTypesParam &
  DeviceManagementCreateOrUpdateGroupBodyParam &
  RequestParameters;
export type DeviceManagementDeleteGroupParameters = RequestParameters;
export type DeviceManagementGetGroupUpdateComplianceParameters = RequestParameters;

export interface DeviceManagementListBestUpdatesForGroupQueryParamProperties {
  /** Restricts the set of bestUpdates returned. You can filter on update Provider, Name and Version property. */
  $filter?: string;
}

export interface DeviceManagementListBestUpdatesForGroupQueryParam {
  queryParameters?: DeviceManagementListBestUpdatesForGroupQueryParamProperties;
}

export type DeviceManagementListBestUpdatesForGroupParameters = DeviceManagementListBestUpdatesForGroupQueryParam &
  RequestParameters;

export interface DeviceManagementListDeploymentsForGroupQueryParamProperties {
  /** Restricts the set of deployments returned. You can filter on update Provider, Name and Version property. */
  $filter?: string;
}

export interface DeviceManagementListDeploymentsForGroupQueryParam {
  queryParameters?: DeviceManagementListDeploymentsForGroupQueryParamProperties;
}

export type DeviceManagementListDeploymentsForGroupParameters = DeviceManagementListDeploymentsForGroupQueryParam &
  RequestParameters;
export type DeviceManagementGetDeploymentParameters = RequestParameters;

export interface DeviceManagementCreateOrUpdateDeploymentBodyParam {
  /** The deployment properties. */
  body: Deployment;
}

export interface DeviceManagementCreateOrUpdateDeploymentMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DeviceManagementCreateOrUpdateDeploymentParameters = DeviceManagementCreateOrUpdateDeploymentMediaTypesParam &
  DeviceManagementCreateOrUpdateDeploymentBodyParam &
  RequestParameters;
export type DeviceManagementDeleteDeploymentParameters = RequestParameters;
export type DeviceManagementGetDeploymentStatusParameters = RequestParameters;

export interface DeviceManagementListDeploymentDevicesQueryParamProperties {
  /** Restricts the set of deployment device states returned. You can filter on deviceId and moduleId and/or deviceState. */
  $filter?: string;
}

export interface DeviceManagementListDeploymentDevicesQueryParam {
  queryParameters?: DeviceManagementListDeploymentDevicesQueryParamProperties;
}

export type DeviceManagementListDeploymentDevicesParameters = DeviceManagementListDeploymentDevicesQueryParam &
  RequestParameters;

export interface DeviceManagementGetOperationHeaders {
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
}

export interface DeviceManagementGetOperationHeaderParam {
  headers: RawHttpHeadersInput & DeviceManagementGetOperationHeaders;
}

export type DeviceManagementGetOperationParameters = DeviceManagementGetOperationHeaderParam &
  RequestParameters;

export interface DeviceManagementListOperationsQueryParamProperties {
  /** Restricts the set of operations returned. Only one specific filter is supported: "status eq 'NotStarted' or status eq 'Running'" */
  $filter?: string;
  /** Specifies a non-negative integer n that limits the number of items returned from a collection. The service returns the number of available items up to but not greater than the specified value n. */
  $top?: number;
}

export interface DeviceManagementListOperationsQueryParam {
  queryParameters?: DeviceManagementListOperationsQueryParamProperties;
}

export type DeviceManagementListOperationsParameters = DeviceManagementListOperationsQueryParam &
  RequestParameters;

export interface DeviceManagementCollectLogsBodyParam {
  /** The deployment properties. */
  body: LogCollectionOperation;
}

export interface DeviceManagementCollectLogsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DeviceManagementCollectLogsParameters = DeviceManagementCollectLogsMediaTypesParam &
  DeviceManagementCollectLogsBodyParam &
  RequestParameters;
export type DeviceManagementGetLogCollectionOperationParameters = RequestParameters;
export type DeviceManagementListLogCollectionOperationsParameters = RequestParameters;
export type DeviceManagementGetLogCollectionOperationDetailedStatusParameters = RequestParameters;

export interface DeviceManagementStopDeploymentQueryParamProperties {
  /** Cancel deployment action. */
  action: "cancel";
}

export interface DeviceManagementStopDeploymentQueryParam {
  queryParameters: DeviceManagementStopDeploymentQueryParamProperties;
}

export type DeviceManagementStopDeploymentParameters = DeviceManagementStopDeploymentQueryParam &
  RequestParameters;

export interface DeviceManagementRetryDeploymentQueryParamProperties {
  /** Retry deployment action. */
  action: "retry";
}

export interface DeviceManagementRetryDeploymentQueryParam {
  queryParameters: DeviceManagementRetryDeploymentQueryParamProperties;
}

export type DeviceManagementRetryDeploymentParameters = DeviceManagementRetryDeploymentQueryParam &
  RequestParameters;
