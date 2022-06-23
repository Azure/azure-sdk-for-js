// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import { ImportUpdateInputItem, PatchBody, Deployment, LogCollection } from "./models";

export interface DeviceUpdateListUpdatesQueryParamProperties {
  /** Request updates matching a free-text search expression. */
  search?: string;
  /** Filter updates by its properties. */
  filter?: string;
}

export interface DeviceUpdateListUpdatesQueryParam {
  queryParameters?: DeviceUpdateListUpdatesQueryParamProperties;
}

export type DeviceUpdateListUpdatesParameters = DeviceUpdateListUpdatesQueryParam &
  RequestParameters;

export interface DeviceUpdateImportUpdateBodyParam {
  /** The update to be imported. */
  body: Array<ImportUpdateInputItem>;
}

export interface DeviceUpdateImportUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DeviceUpdateImportUpdateParameters = DeviceUpdateImportUpdateMediaTypesParam &
  DeviceUpdateImportUpdateBodyParam &
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
  filter?: string;
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
  filter?: string;
  /** Specifies a non-negative integer n that limits the number of items returned from a collection. The service returns the number of available items up to but not greater than the specified value n. */
  top?: number;
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

export interface DeviceManagementUpdateDeviceClassBodyParam {
  /** The device class json merge patch body. Currently only supports patching friendlyName */
  body: PatchBody;
}

export interface DeviceManagementUpdateDeviceClassMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type DeviceManagementUpdateDeviceClassParameters = DeviceManagementUpdateDeviceClassMediaTypesParam &
  DeviceManagementUpdateDeviceClassBodyParam &
  RequestParameters;
export type DeviceManagementDeleteDeviceClassParameters = RequestParameters;
export type DeviceManagementListInstallableUpdatesForDeviceClassParameters = RequestParameters;

export interface DeviceManagementListDevicesQueryParamProperties {
  /** Restricts the set of devices returned. You can filter on GroupId, DeviceClassId, or GroupId and DeploymentStatus. */
  filter?: string;
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

export interface DeviceManagementImportDevicesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DeviceManagementImportDevicesParameters = DeviceManagementImportDevicesMediaTypesParam &
  DeviceManagementImportDevicesBodyParam &
  RequestParameters;
export type DeviceManagementGetDeviceParameters = RequestParameters;
export type DeviceManagementGetDeviceModuleParameters = RequestParameters;
export type DeviceManagementGetUpdateComplianceParameters = RequestParameters;

export interface DeviceManagementListGroupsQueryParamProperties {
  /** Orders the set of groups returned. You can order by any combination of groupId, device count, created date, subgroupsWithNewUpdatesAvailableCount, subgroupsWithUpdatesInProgressCount, or subgroupsOnLatestUpdateCount. */
  orderby?: string;
}

export interface DeviceManagementListGroupsQueryParam {
  queryParameters?: DeviceManagementListGroupsQueryParamProperties;
}

export type DeviceManagementListGroupsParameters = DeviceManagementListGroupsQueryParam &
  RequestParameters;
export type DeviceManagementGetGroupParameters = RequestParameters;
export type DeviceManagementDeleteGroupParameters = RequestParameters;
export type DeviceManagementGetUpdateComplianceForGroupParameters = RequestParameters;

export interface DeviceManagementListBestUpdatesForGroupQueryParamProperties {
  /** Restricts the set of bestUpdates returned. You can filter on update Provider, Name and Version property. This filter is deprecated and should not be used. */
  filter?: string;
}

export interface DeviceManagementListBestUpdatesForGroupQueryParam {
  queryParameters?: DeviceManagementListBestUpdatesForGroupQueryParamProperties;
}

export type DeviceManagementListBestUpdatesForGroupParameters = DeviceManagementListBestUpdatesForGroupQueryParam &
  RequestParameters;

export interface DeviceManagementListDeploymentsForGroupQueryParamProperties {
  /** Orders the set of deployments returned. You can order by start date. */
  orderby?: string;
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

export interface DeviceManagementListDeviceClassSubgroupsForGroupQueryParamProperties {
  /** Restricts the set of device class subgroups returned. You can filter on compat properties by name and value. */
  filter?: string;
}

export interface DeviceManagementListDeviceClassSubgroupsForGroupQueryParam {
  queryParameters?: DeviceManagementListDeviceClassSubgroupsForGroupQueryParamProperties;
}

export type DeviceManagementListDeviceClassSubgroupsForGroupParameters = DeviceManagementListDeviceClassSubgroupsForGroupQueryParam &
  RequestParameters;
export type DeviceManagementGetDeviceClassSubgroupParameters = RequestParameters;
export type DeviceManagementDeleteDeviceClassSubgroupParameters = RequestParameters;
export type DeviceManagementGetDeviceClassSubgroupUpdateComplianceParameters = RequestParameters;
export type DeviceManagementGetBestUpdatesForDeviceClassSubgroupParameters = RequestParameters;

export interface DeviceManagementListDeploymentsForDeviceClassSubgroupQueryParamProperties {
  /** Orders the set of deployments returned. You can order by start date. */
  orderby?: string;
}

export interface DeviceManagementListDeploymentsForDeviceClassSubgroupQueryParam {
  queryParameters?: DeviceManagementListDeploymentsForDeviceClassSubgroupQueryParamProperties;
}

export type DeviceManagementListDeploymentsForDeviceClassSubgroupParameters = DeviceManagementListDeploymentsForDeviceClassSubgroupQueryParam &
  RequestParameters;
export type DeviceManagementGetDeploymentForDeviceClassSubgroupParameters = RequestParameters;
export type DeviceManagementDeleteDeploymentForDeviceClassSubgroupParameters = RequestParameters;
export type DeviceManagementStopDeploymentParameters = RequestParameters;
export type DeviceManagementRetryDeploymentParameters = RequestParameters;
export type DeviceManagementGetDeviceClassSubgroupDeploymentStatusParameters = RequestParameters;

export interface DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentQueryParamProperties {
  /** Restricts the set of deployment device states returned. You can filter on deviceId and moduleId and/or deviceState. */
  filter?: string;
}

export interface DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentQueryParam {
  queryParameters?: DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentQueryParamProperties;
}

export type DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentParameters = DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentQueryParam &
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
  filter?: string;
  /** Specifies a non-negative integer n that limits the number of items returned from a collection. The service returns the number of available items up to but not greater than the specified value n. */
  top?: number;
}

export interface DeviceManagementListOperationsQueryParam {
  queryParameters?: DeviceManagementListOperationsQueryParamProperties;
}

export type DeviceManagementListOperationsParameters = DeviceManagementListOperationsQueryParam &
  RequestParameters;

export interface DeviceManagementStartLogCollectionBodyParam {
  /** The log collection properties. */
  body: LogCollection;
}

export interface DeviceManagementStartLogCollectionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DeviceManagementStartLogCollectionParameters = DeviceManagementStartLogCollectionMediaTypesParam &
  DeviceManagementStartLogCollectionBodyParam &
  RequestParameters;
export type DeviceManagementGetLogCollectionParameters = RequestParameters;
export type DeviceManagementListLogCollectionsParameters = RequestParameters;
export type DeviceManagementGetLogCollectionDetailedStatusParameters = RequestParameters;

export interface DeviceManagementListDeviceHealthQueryParamProperties {
  /** Filter list by specified properties. */
  filter: string;
}

export interface DeviceManagementListDeviceHealthQueryParam {
  queryParameters: DeviceManagementListDeviceHealthQueryParamProperties;
}

export type DeviceManagementListDeviceHealthParameters = DeviceManagementListDeviceHealthQueryParam &
  RequestParameters;
