// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import { ImportUpdateInputItem, PatchBody, Deployment, LogCollection } from "./models";

export interface DeviceUpdateListUpdatesQueryParamProperties {
  /** Request updates matching a free-text search expression. */
  search?: string;
  /** Optional to filter updates by isDeployable property. */
  filter?: string;
}

export interface DeviceUpdateListUpdatesQueryParam {
  queryParameters?: DeviceUpdateListUpdatesQueryParamProperties;
}

export type DeviceUpdateListUpdatesParameters = DeviceUpdateListUpdatesQueryParam &
  RequestParameters;

export interface DeviceUpdateImportUpdateBodyParam {
  /** The update to be imported (see schema https://json.schemastore.org/azure-deviceupdate-import-manifest-5.0.json for details). */
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
  /** Optional to filter updates by isDeployable property. */
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

export interface DeviceUpdateListOperationStatusesQueryParamProperties {
  /** Optional to filter operations by status property. Only one specific filter is supported: "status eq 'NotStarted' or status eq 'Running'" */
  filter?: string;
  /** Specifies a non-negative integer n that limits the number of items returned from a collection. The service returns the number of available items up to but not greater than the specified value n. */
  top?: number;
}

export interface DeviceUpdateListOperationStatusesQueryParam {
  queryParameters?: DeviceUpdateListOperationStatusesQueryParamProperties;
}

export type DeviceUpdateListOperationStatusesParameters =
  DeviceUpdateListOperationStatusesQueryParam & RequestParameters;

export interface DeviceUpdateGetOperationStatusHeaders {
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
}

export interface DeviceUpdateGetOperationStatusHeaderParam {
  headers: RawHttpHeadersInput & DeviceUpdateGetOperationStatusHeaders;
}

export type DeviceUpdateGetOperationStatusParameters = DeviceUpdateGetOperationStatusHeaderParam &
  RequestParameters;

export interface DeviceManagementListDeviceClassesQueryParamProperties {
  /** Restricts the set of device classes returned. You can filter on friendly name. */
  filter?: string;
}

export interface DeviceManagementListDeviceClassesQueryParam {
  queryParameters?: DeviceManagementListDeviceClassesQueryParamProperties;
}

export type DeviceManagementListDeviceClassesParameters =
  DeviceManagementListDeviceClassesQueryParam & RequestParameters;
export type DeviceManagementGetDeviceClassParameters = RequestParameters;

export interface DeviceManagementUpdateDeviceClassBodyParam {
  /** The device class json merge patch body. Currently only supports patching friendlyName. */
  body: PatchBody;
}

export interface DeviceManagementUpdateDeviceClassMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type DeviceManagementUpdateDeviceClassParameters =
  DeviceManagementUpdateDeviceClassMediaTypesParam &
    DeviceManagementUpdateDeviceClassBodyParam &
    RequestParameters;
export type DeviceManagementDeleteDeviceClassParameters = RequestParameters;
export type DeviceManagementListInstallableUpdatesForDeviceClassParameters = RequestParameters;

export interface DeviceManagementListDevicesQueryParamProperties {
  /** Restricts the set of devices returned. You can filter on GroupId, DeviceClassId, or GroupId and DeploymentStatus. Use DeploymentStatus eq null to query for devices with no deployment status (that have never been deployed to). */
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
  /** Orders the set of groups returned. You can order by groupId, deviceCount, createdDate, subgroupsWithNewUpdatesAvailableCount, subgroupsWithUpdatesInProgressCount, or subgroupsOnLatestUpdateCount. */
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
export type DeviceManagementListBestUpdatesForGroupParameters = RequestParameters;

export interface DeviceManagementListDeploymentsForGroupQueryParamProperties {
  /** Orders the set of deployments returned. You can order by start date. */
  orderby?: string;
}

export interface DeviceManagementListDeploymentsForGroupQueryParam {
  queryParameters?: DeviceManagementListDeploymentsForGroupQueryParamProperties;
}

export type DeviceManagementListDeploymentsForGroupParameters =
  DeviceManagementListDeploymentsForGroupQueryParam & RequestParameters;
export type DeviceManagementGetDeploymentParameters = RequestParameters;

export interface DeviceManagementCreateOrUpdateDeploymentBodyParam {
  /** The deployment properties. */
  body: Deployment;
}

export interface DeviceManagementCreateOrUpdateDeploymentMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DeviceManagementCreateOrUpdateDeploymentParameters =
  DeviceManagementCreateOrUpdateDeploymentMediaTypesParam &
    DeviceManagementCreateOrUpdateDeploymentBodyParam &
    RequestParameters;
export type DeviceManagementDeleteDeploymentParameters = RequestParameters;
export type DeviceManagementGetDeploymentStatusParameters = RequestParameters;

export interface DeviceManagementListDeviceClassSubgroupsForGroupQueryParamProperties {
  /** Restricts the set of device class subgroups returned. You can filter on compat properties by name and value. (i.e. filter=compatProperties/propertyName1 eq 'value1' and compatProperties/propertyName2 eq 'value2') */
  filter?: string;
}

export interface DeviceManagementListDeviceClassSubgroupsForGroupQueryParam {
  queryParameters?: DeviceManagementListDeviceClassSubgroupsForGroupQueryParamProperties;
}

export type DeviceManagementListDeviceClassSubgroupsForGroupParameters =
  DeviceManagementListDeviceClassSubgroupsForGroupQueryParam & RequestParameters;
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

export type DeviceManagementListDeploymentsForDeviceClassSubgroupParameters =
  DeviceManagementListDeploymentsForDeviceClassSubgroupQueryParam & RequestParameters;
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

export type DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentParameters =
  DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentQueryParam & RequestParameters;

export interface DeviceManagementGetOperationStatusHeaders {
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
}

export interface DeviceManagementGetOperationStatusHeaderParam {
  headers: RawHttpHeadersInput & DeviceManagementGetOperationStatusHeaders;
}

export type DeviceManagementGetOperationStatusParameters =
  DeviceManagementGetOperationStatusHeaderParam & RequestParameters;

export interface DeviceManagementListOperationStatusesQueryParamProperties {
  /** Restricts the set of operations returned. Only one specific filter is supported: "status eq 'NotStarted' or status eq 'Running'" */
  filter?: string;
  /** Specifies a non-negative integer n that limits the number of items returned from a collection. The service returns the number of available items up to but not greater than the specified value n. */
  top?: number;
}

export interface DeviceManagementListOperationStatusesQueryParam {
  queryParameters?: DeviceManagementListOperationStatusesQueryParamProperties;
}

export type DeviceManagementListOperationStatusesParameters =
  DeviceManagementListOperationStatusesQueryParam & RequestParameters;

export interface DeviceManagementStartLogCollectionBodyParam {
  /** The log collection properties. */
  body: LogCollection;
}

export interface DeviceManagementStartLogCollectionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DeviceManagementStartLogCollectionParameters =
  DeviceManagementStartLogCollectionMediaTypesParam &
    DeviceManagementStartLogCollectionBodyParam &
    RequestParameters;
export type DeviceManagementGetLogCollectionParameters = RequestParameters;
export type DeviceManagementListLogCollectionsParameters = RequestParameters;
export type DeviceManagementGetLogCollectionDetailedStatusParameters = RequestParameters;

export interface DeviceManagementListHealthOfDevicesQueryParamProperties {
  /** Restricts the set of devices for which device health is returned. You can filter on status, device id and module id. */
  filter: string;
}

export interface DeviceManagementListHealthOfDevicesQueryParam {
  queryParameters: DeviceManagementListHealthOfDevicesQueryParamProperties;
}

export type DeviceManagementListHealthOfDevicesParameters =
  DeviceManagementListHealthOfDevicesQueryParam & RequestParameters;
