// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import {
  ImportUpdateInputItem,
  Group,
  Deployment,
  LogCollectionOperation
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

export interface UpdatesImportUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type UpdatesImportUpdateParameters = UpdatesImportUpdateQueryParam &
  UpdatesImportUpdateMediaTypesParam &
  UpdatesImportUpdateBodyParam &
  RequestParameters;

export interface UpdatesListUpdatesQueryParamProperties {
  /** Request updates matching a free-text search expression. */
  $search?: string;
  /** Filter updates by its properties. */
  $filter?: string;
}

export interface UpdatesListUpdatesQueryParam {
  queryParameters?: UpdatesListUpdatesQueryParamProperties;
}

export type UpdatesListUpdatesParameters = UpdatesListUpdatesQueryParam &
  RequestParameters;

export interface UpdatesGetUpdateHeaders {
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
}

export interface UpdatesGetUpdateHeaderParam {
  headers: RawHttpHeadersInput & UpdatesGetUpdateHeaders;
}

export type UpdatesGetUpdateParameters = UpdatesGetUpdateHeaderParam &
  RequestParameters;
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

export interface UpdatesGetFileHeaders {
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
}

export interface UpdatesGetFileHeaderParam {
  headers: RawHttpHeadersInput & UpdatesGetFileHeaders;
}

export type UpdatesGetFileParameters = UpdatesGetFileHeaderParam &
  RequestParameters;

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

export interface UpdatesGetOperationHeaders {
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
}

export interface UpdatesGetOperationHeaderParam {
  headers: RawHttpHeadersInput & UpdatesGetOperationHeaders;
}

export type UpdatesGetOperationParameters = UpdatesGetOperationHeaderParam &
  RequestParameters;
export type ManagementListDeviceClassesParameters = RequestParameters;
export type ManagementGetDeviceClassParameters = RequestParameters;
export type ManagementListInstallableUpdatesForDeviceClassParameters = RequestParameters;

export interface ManagementListDevicesQueryParamProperties {
  /** Restricts the set of devices returned. You can filter on device GroupId or DeviceClassId. */
  $filter?: string;
}

export interface ManagementListDevicesQueryParam {
  queryParameters?: ManagementListDevicesQueryParamProperties;
}

export type ManagementListDevicesParameters = ManagementListDevicesQueryParam &
  RequestParameters;

export interface ManagementImportDevicesBodyParam {
  /** The types of devices to import. */
  body: "Devices" | "Modules" | "All";
}

export interface ManagementImportDevicesQueryParamProperties {
  /** Devices action. */
  action: "import";
}

export interface ManagementImportDevicesQueryParam {
  queryParameters: ManagementImportDevicesQueryParamProperties;
}

export interface ManagementImportDevicesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ManagementImportDevicesParameters = ManagementImportDevicesQueryParam &
  ManagementImportDevicesMediaTypesParam &
  ManagementImportDevicesBodyParam &
  RequestParameters;
export type ManagementGetDeviceParameters = RequestParameters;
export type ManagementGetDeviceModuleParameters = RequestParameters;
export type ManagementGetUpdateComplianceParameters = RequestParameters;
export type ManagementListDeviceTagsParameters = RequestParameters;
export type ManagementGetDeviceTagParameters = RequestParameters;
export type ManagementListGroupsParameters = RequestParameters;
export type ManagementGetGroupParameters = RequestParameters;

export interface ManagementCreateOrUpdateGroupBodyParam {
  /** The group properties. */
  body: Group;
}

export interface ManagementCreateOrUpdateGroupMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ManagementCreateOrUpdateGroupParameters = ManagementCreateOrUpdateGroupMediaTypesParam &
  ManagementCreateOrUpdateGroupBodyParam &
  RequestParameters;
export type ManagementDeleteGroupParameters = RequestParameters;
export type ManagementGetGroupUpdateComplianceParameters = RequestParameters;

export interface ManagementListBestUpdatesForGroupQueryParamProperties {
  /** Restricts the set of bestUpdates returned. You can filter on update Provider, Name and Version property. */
  $filter?: string;
}

export interface ManagementListBestUpdatesForGroupQueryParam {
  queryParameters?: ManagementListBestUpdatesForGroupQueryParamProperties;
}

export type ManagementListBestUpdatesForGroupParameters = ManagementListBestUpdatesForGroupQueryParam &
  RequestParameters;

export interface ManagementListDeploymentsForGroupQueryParamProperties {
  /** Restricts the set of deployments returned. You can filter on update Provider, Name and Version property. */
  $filter?: string;
}

export interface ManagementListDeploymentsForGroupQueryParam {
  queryParameters?: ManagementListDeploymentsForGroupQueryParamProperties;
}

export type ManagementListDeploymentsForGroupParameters = ManagementListDeploymentsForGroupQueryParam &
  RequestParameters;
export type ManagementGetDeploymentParameters = RequestParameters;

export interface ManagementCreateOrUpdateDeploymentBodyParam {
  /** The deployment properties. */
  body: Deployment;
}

export interface ManagementCreateOrUpdateDeploymentMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ManagementCreateOrUpdateDeploymentParameters = ManagementCreateOrUpdateDeploymentMediaTypesParam &
  ManagementCreateOrUpdateDeploymentBodyParam &
  RequestParameters;
export type ManagementDeleteDeploymentParameters = RequestParameters;
export type ManagementGetDeploymentStatusParameters = RequestParameters;

export interface ManagementListDeploymentDevicesQueryParamProperties {
  /** Restricts the set of deployment device states returned. You can filter on deviceId and moduleId and/or deviceState. */
  $filter?: string;
}

export interface ManagementListDeploymentDevicesQueryParam {
  queryParameters?: ManagementListDeploymentDevicesQueryParamProperties;
}

export type ManagementListDeploymentDevicesParameters = ManagementListDeploymentDevicesQueryParam &
  RequestParameters;

export interface ManagementGetOperationHeaders {
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
}

export interface ManagementGetOperationHeaderParam {
  headers: RawHttpHeadersInput & ManagementGetOperationHeaders;
}

export type ManagementGetOperationParameters = ManagementGetOperationHeaderParam &
  RequestParameters;

export interface ManagementListOperationsQueryParamProperties {
  /** Restricts the set of operations returned. Only one specific filter is supported: "status eq 'NotStarted' or status eq 'Running'" */
  $filter?: string;
  /** Specifies a non-negative integer n that limits the number of items returned from a collection. The service returns the number of available items up to but not greater than the specified value n. */
  $top?: number;
}

export interface ManagementListOperationsQueryParam {
  queryParameters?: ManagementListOperationsQueryParamProperties;
}

export type ManagementListOperationsParameters = ManagementListOperationsQueryParam &
  RequestParameters;

export interface ManagementCollectLogsBodyParam {
  /** The deployment properties. */
  body: LogCollectionOperation;
}

export interface ManagementCollectLogsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ManagementCollectLogsParameters = ManagementCollectLogsMediaTypesParam &
  ManagementCollectLogsBodyParam &
  RequestParameters;
export type ManagementGetLogCollectionOperationParameters = RequestParameters;
export type ManagementListLogCollectionOperationsParameters = RequestParameters;
export type ManagementGetLogCollectionOperationDetailedStatusParameters = RequestParameters;

export interface ManagementStopDeploymentQueryParamProperties {
  /** Cancel deployment action. */
  action: "cancel";
}

export interface ManagementStopDeploymentQueryParam {
  queryParameters: ManagementStopDeploymentQueryParamProperties;
}

export type ManagementStopDeploymentParameters = ManagementStopDeploymentQueryParam &
  RequestParameters;

export interface ManagementRetryDeploymentQueryParamProperties {
  /** Retry deployment action. */
  action: "retry";
}

export interface ManagementRetryDeploymentQueryParam {
  queryParameters: ManagementRetryDeploymentQueryParamProperties;
}

export type ManagementRetryDeploymentParameters = ManagementRetryDeploymentQueryParam &
  RequestParameters;
