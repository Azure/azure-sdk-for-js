// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import {
  ImportUpdateInputItem,
  DeviceClass,
  Deployment,
  LogCollection,
} from "./models";

export interface DeviceUpdateListUpdatesHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceUpdateListUpdatesQueryParamProperties {
  /** Request updates matching a free-text search expression. */
  search?: string;
  /** Optional to filter updates by isDeployable property. */
  filter?: string;
}

export interface DeviceUpdateListUpdatesQueryParam {
  queryParameters?: DeviceUpdateListUpdatesQueryParamProperties;
}

export interface DeviceUpdateListUpdatesHeaderParam {
  headers?: RawHttpHeadersInput & DeviceUpdateListUpdatesHeaders;
}

export type DeviceUpdateListUpdatesParameters =
  DeviceUpdateListUpdatesQueryParam &
    DeviceUpdateListUpdatesHeaderParam &
    RequestParameters;

export interface DeviceUpdateGetUpdateHeaders {
  /**
   * Defines the If-None-Match condition. The operation will be performed only if
   * the ETag on the server does not match this value.
   */
  "if-none-match"?: string;
}

export interface DeviceUpdateGetUpdateHeaderParam {
  headers?: RawHttpHeadersInput & DeviceUpdateGetUpdateHeaders;
}

export type DeviceUpdateGetUpdateParameters = DeviceUpdateGetUpdateHeaderParam &
  RequestParameters;

export interface DeviceUpdateImportUpdateBodyParam {
  /** The update to be imported (see schema https://json.schemastore.org/azure-deviceupdate-import-manifest-5.0.json for details). */
  body: Array<ImportUpdateInputItem>;
}

export type DeviceUpdateImportUpdateParameters =
  DeviceUpdateImportUpdateBodyParam & RequestParameters;
export type DeviceUpdateDeleteUpdateParameters = RequestParameters;
export type DeviceUpdateListProvidersParameters = RequestParameters;
export type DeviceUpdateListNamesParameters = RequestParameters;
export type DeviceUpdateListVersionsParameters = RequestParameters;
export type DeviceUpdateListFilesParameters = RequestParameters;

export interface DeviceUpdateGetFileHeaders {
  /**
   * Defines the If-None-Match condition. The operation will be performed only if
   * the ETag on the server does not match this value.
   */
  "if-none-match"?: string;
}

export interface DeviceUpdateGetFileHeaderParam {
  headers?: RawHttpHeadersInput & DeviceUpdateGetFileHeaders;
}

export type DeviceUpdateGetFileParameters = DeviceUpdateGetFileHeaderParam &
  RequestParameters;

export interface DeviceUpdateListOperationStatusesHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceUpdateListOperationStatusesQueryParamProperties {
  /**
   * Optional to filter operations by status property. Only one specific filter is
   * supported: \"status eq 'NotStarted' or status eq 'Running'\"
   */
  filter?: string;
  /**
   * Specifies a non-negative integer n that limits the number of items returned
   * from a collection. The service returns the number of available items up to but
   * not greater than the specified value n.
   */
  top?: number;
}

export interface DeviceUpdateListOperationStatusesQueryParam {
  queryParameters?: DeviceUpdateListOperationStatusesQueryParamProperties;
}

export interface DeviceUpdateListOperationStatusesHeaderParam {
  headers?: RawHttpHeadersInput & DeviceUpdateListOperationStatusesHeaders;
}

export type DeviceUpdateListOperationStatusesParameters =
  DeviceUpdateListOperationStatusesQueryParam &
    DeviceUpdateListOperationStatusesHeaderParam &
    RequestParameters;

export interface DeviceUpdateGetOperationStatusHeaders {
  /**
   * Defines the If-None-Match condition. The operation will be performed only if
   * the ETag on the server does not match this value.
   */
  "if-none-match"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceUpdateGetOperationStatusHeaderParam {
  headers?: RawHttpHeadersInput & DeviceUpdateGetOperationStatusHeaders;
}

export type DeviceUpdateGetOperationStatusParameters =
  DeviceUpdateGetOperationStatusHeaderParam & RequestParameters;

export interface DeviceManagementListDeviceClassesHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementListDeviceClassesQueryParamProperties {
  /** Restricts the set of device classes returned. You can filter on friendly name. */
  filter?: string;
}

export interface DeviceManagementListDeviceClassesQueryParam {
  queryParameters?: DeviceManagementListDeviceClassesQueryParamProperties;
}

export interface DeviceManagementListDeviceClassesHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementListDeviceClassesHeaders;
}

export type DeviceManagementListDeviceClassesParameters =
  DeviceManagementListDeviceClassesQueryParam &
    DeviceManagementListDeviceClassesHeaderParam &
    RequestParameters;

export interface DeviceManagementGetDeviceClassHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementGetDeviceClassHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementGetDeviceClassHeaders;
}

export type DeviceManagementGetDeviceClassParameters =
  DeviceManagementGetDeviceClassHeaderParam & RequestParameters;

export interface DeviceManagementUpdateDeviceClassHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The resource instance. */
export type DeviceClassResourceMergeAndPatch = Partial<DeviceClass>;

export interface DeviceManagementUpdateDeviceClassBodyParam {
  /** The resource instance. */
  body: DeviceClassResourceMergeAndPatch;
}

export interface DeviceManagementUpdateDeviceClassHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementUpdateDeviceClassHeaders;
}

export interface DeviceManagementUpdateDeviceClassMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type DeviceManagementUpdateDeviceClassParameters =
  DeviceManagementUpdateDeviceClassHeaderParam &
    DeviceManagementUpdateDeviceClassMediaTypesParam &
    DeviceManagementUpdateDeviceClassBodyParam &
    RequestParameters;

export interface DeviceManagementDeleteDeviceClassHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementDeleteDeviceClassHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementDeleteDeviceClassHeaders;
}

export type DeviceManagementDeleteDeviceClassParameters =
  DeviceManagementDeleteDeviceClassHeaderParam & RequestParameters;
export type DeviceManagementListInstallableUpdatesForDeviceClassParameters =
  RequestParameters;

export interface DeviceManagementListDevicesHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementListDevicesQueryParamProperties {
  /**
   * Restricts the set of devices returned. You can filter on GroupId,
   * DeviceClassId, or GroupId and DeploymentStatus. Use DeploymentStatus eq null to
   * query for devices with no deployment status (that have never been deployed to).
   */
  filter?: string;
}

export interface DeviceManagementListDevicesQueryParam {
  queryParameters?: DeviceManagementListDevicesQueryParamProperties;
}

export interface DeviceManagementListDevicesHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementListDevicesHeaders;
}

export type DeviceManagementListDevicesParameters =
  DeviceManagementListDevicesQueryParam &
    DeviceManagementListDevicesHeaderParam &
    RequestParameters;

export interface DeviceManagementImportDevicesBodyParam {
  /**
   * The types of devices to import.
   *
   * Possible values: Devices, Modules, All
   */
  body: string;
}

export type DeviceManagementImportDevicesParameters =
  DeviceManagementImportDevicesBodyParam & RequestParameters;

export interface DeviceManagementGetDeviceHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementGetDeviceHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementGetDeviceHeaders;
}

export type DeviceManagementGetDeviceParameters =
  DeviceManagementGetDeviceHeaderParam & RequestParameters;
export type DeviceManagementGetDeviceModuleParameters = RequestParameters;
export type DeviceManagementGetUpdateComplianceParameters = RequestParameters;

export interface DeviceManagementListGroupsHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementListGroupsQueryParamProperties {
  /**
   * Orders the set of groups returned. You can order by groupId, deviceCount,
   * createdDate, subgroupsWithNewUpdatesAvailableCount,
   * subgroupsWithUpdatesInProgressCount, or subgroupsOnLatestUpdateCount.
   */
  orderby?: string;
}

export interface DeviceManagementListGroupsQueryParam {
  queryParameters?: DeviceManagementListGroupsQueryParamProperties;
}

export interface DeviceManagementListGroupsHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementListGroupsHeaders;
}

export type DeviceManagementListGroupsParameters =
  DeviceManagementListGroupsQueryParam &
    DeviceManagementListGroupsHeaderParam &
    RequestParameters;

export interface DeviceManagementGetGroupHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementGetGroupHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementGetGroupHeaders;
}

export type DeviceManagementGetGroupParameters =
  DeviceManagementGetGroupHeaderParam & RequestParameters;

export interface DeviceManagementDeleteGroupHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementDeleteGroupHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementDeleteGroupHeaders;
}

export type DeviceManagementDeleteGroupParameters =
  DeviceManagementDeleteGroupHeaderParam & RequestParameters;
export type DeviceManagementGetUpdateComplianceForGroupParameters =
  RequestParameters;
export type DeviceManagementListBestUpdatesForGroupParameters =
  RequestParameters;

export interface DeviceManagementListDeploymentsForGroupHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementListDeploymentsForGroupQueryParamProperties {
  /** Orders the set of deployments returned. You can order by start date. */
  orderby?: string;
}

export interface DeviceManagementListDeploymentsForGroupQueryParam {
  queryParameters?: DeviceManagementListDeploymentsForGroupQueryParamProperties;
}

export interface DeviceManagementListDeploymentsForGroupHeaderParam {
  headers?: RawHttpHeadersInput &
    DeviceManagementListDeploymentsForGroupHeaders;
}

export type DeviceManagementListDeploymentsForGroupParameters =
  DeviceManagementListDeploymentsForGroupQueryParam &
    DeviceManagementListDeploymentsForGroupHeaderParam &
    RequestParameters;

export interface DeviceManagementGetDeploymentHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementGetDeploymentHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementGetDeploymentHeaders;
}

export type DeviceManagementGetDeploymentParameters =
  DeviceManagementGetDeploymentHeaderParam & RequestParameters;

export interface DeviceManagementCreateOrUpdateDeploymentBodyParam {
  /** Deployment details. */
  body: Deployment;
}

export type DeviceManagementCreateOrUpdateDeploymentParameters =
  DeviceManagementCreateOrUpdateDeploymentBodyParam & RequestParameters;

export interface DeviceManagementDeleteDeploymentHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementDeleteDeploymentHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementDeleteDeploymentHeaders;
}

export type DeviceManagementDeleteDeploymentParameters =
  DeviceManagementDeleteDeploymentHeaderParam & RequestParameters;
export type DeviceManagementGetDeploymentStatusParameters = RequestParameters;

export interface DeviceManagementListDeviceClassSubgroupsForGroupHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementListDeviceClassSubgroupsForGroupQueryParamProperties {
  /**
   * Restricts the set of device class subgroups returned. You can filter on compat
   * properties by name and value. (i.e. filter=compatProperties/propertyName1 eq 'value1'
   * and compatProperties/propertyName2 eq 'value2')
   */
  filter?: string;
}

export interface DeviceManagementListDeviceClassSubgroupsForGroupQueryParam {
  queryParameters?: DeviceManagementListDeviceClassSubgroupsForGroupQueryParamProperties;
}

export interface DeviceManagementListDeviceClassSubgroupsForGroupHeaderParam {
  headers?: RawHttpHeadersInput &
    DeviceManagementListDeviceClassSubgroupsForGroupHeaders;
}

export type DeviceManagementListDeviceClassSubgroupsForGroupParameters =
  DeviceManagementListDeviceClassSubgroupsForGroupQueryParam &
    DeviceManagementListDeviceClassSubgroupsForGroupHeaderParam &
    RequestParameters;

export interface DeviceManagementGetDeviceClassSubgroupHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementGetDeviceClassSubgroupHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementGetDeviceClassSubgroupHeaders;
}

export type DeviceManagementGetDeviceClassSubgroupParameters =
  DeviceManagementGetDeviceClassSubgroupHeaderParam & RequestParameters;

export interface DeviceManagementDeleteDeviceClassSubgroupHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementDeleteDeviceClassSubgroupHeaderParam {
  headers?: RawHttpHeadersInput &
    DeviceManagementDeleteDeviceClassSubgroupHeaders;
}

export type DeviceManagementDeleteDeviceClassSubgroupParameters =
  DeviceManagementDeleteDeviceClassSubgroupHeaderParam & RequestParameters;
export type DeviceManagementGetDeviceClassSubgroupUpdateComplianceParameters =
  RequestParameters;
export type DeviceManagementGetBestUpdatesForDeviceClassSubgroupParameters =
  RequestParameters;

export interface DeviceManagementListDeploymentsForDeviceClassSubgroupHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementListDeploymentsForDeviceClassSubgroupQueryParamProperties {
  /** Orders the set of deployments returned. You can order by start date. */
  orderby?: string;
}

export interface DeviceManagementListDeploymentsForDeviceClassSubgroupQueryParam {
  queryParameters?: DeviceManagementListDeploymentsForDeviceClassSubgroupQueryParamProperties;
}

export interface DeviceManagementListDeploymentsForDeviceClassSubgroupHeaderParam {
  headers?: RawHttpHeadersInput &
    DeviceManagementListDeploymentsForDeviceClassSubgroupHeaders;
}

export type DeviceManagementListDeploymentsForDeviceClassSubgroupParameters =
  DeviceManagementListDeploymentsForDeviceClassSubgroupQueryParam &
    DeviceManagementListDeploymentsForDeviceClassSubgroupHeaderParam &
    RequestParameters;

export interface DeviceManagementGetDeploymentForDeviceClassSubgroupHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementGetDeploymentForDeviceClassSubgroupHeaderParam {
  headers?: RawHttpHeadersInput &
    DeviceManagementGetDeploymentForDeviceClassSubgroupHeaders;
}

export type DeviceManagementGetDeploymentForDeviceClassSubgroupParameters =
  DeviceManagementGetDeploymentForDeviceClassSubgroupHeaderParam &
    RequestParameters;

export interface DeviceManagementDeleteDeploymentForDeviceClassSubgroupHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementDeleteDeploymentForDeviceClassSubgroupHeaderParam {
  headers?: RawHttpHeadersInput &
    DeviceManagementDeleteDeploymentForDeviceClassSubgroupHeaders;
}

export type DeviceManagementDeleteDeploymentForDeviceClassSubgroupParameters =
  DeviceManagementDeleteDeploymentForDeviceClassSubgroupHeaderParam &
    RequestParameters;

export interface DeviceManagementStopDeploymentHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementStopDeploymentHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementStopDeploymentHeaders;
}

export type DeviceManagementStopDeploymentParameters =
  DeviceManagementStopDeploymentHeaderParam & RequestParameters;

export interface DeviceManagementRetryDeploymentHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementRetryDeploymentHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementRetryDeploymentHeaders;
}

export type DeviceManagementRetryDeploymentParameters =
  DeviceManagementRetryDeploymentHeaderParam & RequestParameters;
export type DeviceManagementGetDeviceClassSubgroupDeploymentStatusParameters =
  RequestParameters;

export interface DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentQueryParamProperties {
  /**
   * Restricts the set of deployment device states returned. You can filter on
   * deviceId and moduleId and/or deviceState.
   */
  filter?: string;
}

export interface DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentQueryParam {
  queryParameters?: DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentQueryParamProperties;
}

export interface DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentHeaderParam {
  headers?: RawHttpHeadersInput &
    DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentHeaders;
}

export type DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentParameters =
  DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentQueryParam &
    DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentHeaderParam &
    RequestParameters;

export interface DeviceManagementGetOperationStatusHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementGetOperationStatusHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementGetOperationStatusHeaders;
}

export type DeviceManagementGetOperationStatusParameters =
  DeviceManagementGetOperationStatusHeaderParam & RequestParameters;

export interface DeviceManagementListOperationStatusesHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementListOperationStatusesQueryParamProperties {
  /** Restricts the set of operations returned. Only one specific filter is supported: \"status eq 'NotStarted' or status eq 'Running'\" */
  filter?: string;
  /**
   * Specifies a non-negative integer n that limits the number of items returned
   * from a collection. The service returns the number of available items up to but
   * not greater than the specified value n.
   */
  top?: number;
}

export interface DeviceManagementListOperationStatusesQueryParam {
  queryParameters?: DeviceManagementListOperationStatusesQueryParamProperties;
}

export interface DeviceManagementListOperationStatusesHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementListOperationStatusesHeaders;
}

export type DeviceManagementListOperationStatusesParameters =
  DeviceManagementListOperationStatusesQueryParam &
    DeviceManagementListOperationStatusesHeaderParam &
    RequestParameters;

export interface DeviceManagementListLogCollectionsHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementListLogCollectionsHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementListLogCollectionsHeaders;
}

export type DeviceManagementListLogCollectionsParameters =
  DeviceManagementListLogCollectionsHeaderParam & RequestParameters;

export interface DeviceManagementGetLogCollectionHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementGetLogCollectionHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementGetLogCollectionHeaders;
}

export type DeviceManagementGetLogCollectionParameters =
  DeviceManagementGetLogCollectionHeaderParam & RequestParameters;

export interface DeviceManagementStartLogCollectionBodyParam {
  /** Log collection details. */
  body: LogCollection;
}

export type DeviceManagementStartLogCollectionParameters =
  DeviceManagementStartLogCollectionBodyParam & RequestParameters;
export type DeviceManagementGetLogCollectionDetailedStatusParameters =
  RequestParameters;

export interface DeviceManagementListHealthOfDevicesHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeviceManagementListHealthOfDevicesQueryParamProperties {
  /**
   * Restricts the set of devices for which device health is returned. You can
   * filter on status, device id and module id.
   */
  filter?: string;
}

export interface DeviceManagementListHealthOfDevicesQueryParam {
  queryParameters?: DeviceManagementListHealthOfDevicesQueryParamProperties;
}

export interface DeviceManagementListHealthOfDevicesHeaderParam {
  headers?: RawHttpHeadersInput & DeviceManagementListHealthOfDevicesHeaders;
}

export type DeviceManagementListHealthOfDevicesParameters =
  DeviceManagementListHealthOfDevicesQueryParam &
    DeviceManagementListHealthOfDevicesHeaderParam &
    RequestParameters;
export type InstanceManagementGetLimitsParameters = RequestParameters;
