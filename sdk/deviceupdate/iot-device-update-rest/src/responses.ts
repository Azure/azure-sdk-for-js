// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  PagedUpdateOutput,
  UpdateOutput,
  StringsListOutput,
  UpdateFileOutput,
  PagedUpdateOperationOutput,
  UpdateOperationOutput,
  PagedDeviceClassOutput,
  DeviceClassOutput,
  PagedUpdateInfoOutput,
  PagedDeviceOutput,
  DeviceOutput,
  UpdateComplianceOutput,
  PagedGroupOutput,
  GroupOutput,
  PagedDeviceClassSubgroupUpdatableDevicesOutput,
  PagedDeploymentOutput,
  DeploymentOutput,
  DeploymentStatusOutput,
  PagedDeviceClassSubgroupOutput,
  DeviceClassSubgroupOutput,
  DeviceClassSubgroupUpdatableDevicesOutput,
  PagedDeviceClassSubgroupDeploymentOutput,
  DeviceClassSubgroupDeploymentOutput,
  DeviceClassSubgroupDeploymentStatusOutput,
  PagedDeploymentDeviceStateOutput,
  DeviceOperationOutput,
  PagedDeviceOperationOutput,
  PagedLogCollectionOutput,
  LogCollectionOutput,
  LogCollectionOperationDetailedStatusOutput,
  PagedDeviceHealthOutput,
  LimitsOutput,
} from "./outputModels";

export interface DeviceUpdateListUpdates200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceUpdateListUpdates200Response extends HttpResponse {
  status: "200";
  body: PagedUpdateOutput;
  headers: RawHttpHeaders & DeviceUpdateListUpdates200Headers;
}

export interface DeviceUpdateListUpdatesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceUpdateListUpdatesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceUpdateListUpdatesDefaultHeaders;
}

/** The request has succeeded. */
export interface DeviceUpdateGetUpdate200Response extends HttpResponse {
  status: "200";
  body: UpdateOutput;
}

export interface DeviceUpdateGetUpdateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceUpdateGetUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceUpdateGetUpdateDefaultHeaders;
}

export interface DeviceUpdateImportUpdate202Headers {
  "operation-location"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DeviceUpdateImportUpdate202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DeviceUpdateImportUpdate202Headers;
}

export interface DeviceUpdateImportUpdateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceUpdateImportUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceUpdateImportUpdateDefaultHeaders;
}

/** The final response for long-running importUpdate operation */
export interface DeviceUpdateImportUpdateLogicalResponse extends HttpResponse {
  status: "200";
}

export interface DeviceUpdateDeleteUpdate202Headers {
  "operation-location"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DeviceUpdateDeleteUpdate202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DeviceUpdateDeleteUpdate202Headers;
}

export interface DeviceUpdateDeleteUpdateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceUpdateDeleteUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceUpdateDeleteUpdateDefaultHeaders;
}

/** The final response for long-running deleteUpdate operation */
export interface DeviceUpdateDeleteUpdateLogicalResponse extends HttpResponse {
  status: "200";
}

/** The request has succeeded. */
export interface DeviceUpdateListProviders200Response extends HttpResponse {
  status: "200";
  body: StringsListOutput;
}

export interface DeviceUpdateListProvidersDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceUpdateListProvidersDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceUpdateListProvidersDefaultHeaders;
}

/** The request has succeeded. */
export interface DeviceUpdateListNames200Response extends HttpResponse {
  status: "200";
  body: StringsListOutput;
}

export interface DeviceUpdateListNamesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceUpdateListNamesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceUpdateListNamesDefaultHeaders;
}

/** The request has succeeded. */
export interface DeviceUpdateListVersions200Response extends HttpResponse {
  status: "200";
  body: StringsListOutput;
}

export interface DeviceUpdateListVersionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceUpdateListVersionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceUpdateListVersionsDefaultHeaders;
}

/** The request has succeeded. */
export interface DeviceUpdateListFiles200Response extends HttpResponse {
  status: "200";
  body: StringsListOutput;
}

export interface DeviceUpdateListFilesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceUpdateListFilesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceUpdateListFilesDefaultHeaders;
}

/** The request has succeeded. */
export interface DeviceUpdateGetFile200Response extends HttpResponse {
  status: "200";
  body: UpdateFileOutput;
}

export interface DeviceUpdateGetFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceUpdateGetFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceUpdateGetFileDefaultHeaders;
}

export interface DeviceUpdateListOperationStatuses200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceUpdateListOperationStatuses200Response
  extends HttpResponse {
  status: "200";
  body: PagedUpdateOperationOutput;
  headers: RawHttpHeaders & DeviceUpdateListOperationStatuses200Headers;
}

export interface DeviceUpdateListOperationStatusesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceUpdateListOperationStatusesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceUpdateListOperationStatusesDefaultHeaders;
}

export interface DeviceUpdateGetOperationStatus200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceUpdateGetOperationStatus200Response
  extends HttpResponse {
  status: "200";
  body: UpdateOperationOutput;
  headers: RawHttpHeaders & DeviceUpdateGetOperationStatus200Headers;
}

export interface DeviceUpdateGetOperationStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceUpdateGetOperationStatusDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceUpdateGetOperationStatusDefaultHeaders;
}

export interface DeviceManagementListDeviceClasses200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementListDeviceClasses200Response
  extends HttpResponse {
  status: "200";
  body: PagedDeviceClassOutput;
  headers: RawHttpHeaders & DeviceManagementListDeviceClasses200Headers;
}

export interface DeviceManagementListDeviceClassesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementListDeviceClassesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementListDeviceClassesDefaultHeaders;
}

export interface DeviceManagementGetDeviceClass200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementGetDeviceClass200Response
  extends HttpResponse {
  status: "200";
  body: DeviceClassOutput;
  headers: RawHttpHeaders & DeviceManagementGetDeviceClass200Headers;
}

export interface DeviceManagementGetDeviceClassDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementGetDeviceClassDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementGetDeviceClassDefaultHeaders;
}

export interface DeviceManagementUpdateDeviceClass200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementUpdateDeviceClass200Response
  extends HttpResponse {
  status: "200";
  body: DeviceClassOutput;
  headers: RawHttpHeaders & DeviceManagementUpdateDeviceClass200Headers;
}

export interface DeviceManagementUpdateDeviceClassDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementUpdateDeviceClassDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementUpdateDeviceClassDefaultHeaders;
}

export interface DeviceManagementDeleteDeviceClass204Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeviceManagementDeleteDeviceClass204Response
  extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & DeviceManagementDeleteDeviceClass204Headers;
}

export interface DeviceManagementDeleteDeviceClassDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementDeleteDeviceClassDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementDeleteDeviceClassDefaultHeaders;
}

/** The request has succeeded. */
export interface DeviceManagementListInstallableUpdatesForDeviceClass200Response
  extends HttpResponse {
  status: "200";
  body: PagedUpdateInfoOutput;
}

export interface DeviceManagementListInstallableUpdatesForDeviceClassDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementListInstallableUpdatesForDeviceClassDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    DeviceManagementListInstallableUpdatesForDeviceClassDefaultHeaders;
}

export interface DeviceManagementListDevices200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementListDevices200Response extends HttpResponse {
  status: "200";
  body: PagedDeviceOutput;
  headers: RawHttpHeaders & DeviceManagementListDevices200Headers;
}

export interface DeviceManagementListDevicesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementListDevicesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementListDevicesDefaultHeaders;
}

export interface DeviceManagementImportDevices202Headers {
  "operation-location"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DeviceManagementImportDevices202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DeviceManagementImportDevices202Headers;
}

export interface DeviceManagementImportDevicesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementImportDevicesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementImportDevicesDefaultHeaders;
}

/** The final response for long-running importDevices operation */
export interface DeviceManagementImportDevicesLogicalResponse
  extends HttpResponse {
  status: "200";
}

export interface DeviceManagementGetDevice200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementGetDevice200Response extends HttpResponse {
  status: "200";
  body: DeviceOutput;
  headers: RawHttpHeaders & DeviceManagementGetDevice200Headers;
}

export interface DeviceManagementGetDeviceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementGetDeviceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementGetDeviceDefaultHeaders;
}

/** The request has succeeded. */
export interface DeviceManagementGetDeviceModule200Response
  extends HttpResponse {
  status: "200";
  body: DeviceOutput;
}

export interface DeviceManagementGetDeviceModuleDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementGetDeviceModuleDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementGetDeviceModuleDefaultHeaders;
}

/** The request has succeeded. */
export interface DeviceManagementGetUpdateCompliance200Response
  extends HttpResponse {
  status: "200";
  body: UpdateComplianceOutput;
}

export interface DeviceManagementGetUpdateComplianceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementGetUpdateComplianceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementGetUpdateComplianceDefaultHeaders;
}

export interface DeviceManagementListGroups200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementListGroups200Response extends HttpResponse {
  status: "200";
  body: PagedGroupOutput;
  headers: RawHttpHeaders & DeviceManagementListGroups200Headers;
}

export interface DeviceManagementListGroupsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementListGroupsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementListGroupsDefaultHeaders;
}

export interface DeviceManagementGetGroup200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementGetGroup200Response extends HttpResponse {
  status: "200";
  body: GroupOutput;
  headers: RawHttpHeaders & DeviceManagementGetGroup200Headers;
}

export interface DeviceManagementGetGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementGetGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementGetGroupDefaultHeaders;
}

export interface DeviceManagementDeleteGroup204Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeviceManagementDeleteGroup204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & DeviceManagementDeleteGroup204Headers;
}

export interface DeviceManagementDeleteGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementDeleteGroupDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementDeleteGroupDefaultHeaders;
}

/** The request has succeeded. */
export interface DeviceManagementGetUpdateComplianceForGroup200Response
  extends HttpResponse {
  status: "200";
  body: UpdateComplianceOutput;
}

export interface DeviceManagementGetUpdateComplianceForGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementGetUpdateComplianceForGroupDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    DeviceManagementGetUpdateComplianceForGroupDefaultHeaders;
}

/** The request has succeeded. */
export interface DeviceManagementListBestUpdatesForGroup200Response
  extends HttpResponse {
  status: "200";
  body: PagedDeviceClassSubgroupUpdatableDevicesOutput;
}

export interface DeviceManagementListBestUpdatesForGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementListBestUpdatesForGroupDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    DeviceManagementListBestUpdatesForGroupDefaultHeaders;
}

export interface DeviceManagementListDeploymentsForGroup200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementListDeploymentsForGroup200Response
  extends HttpResponse {
  status: "200";
  body: PagedDeploymentOutput;
  headers: RawHttpHeaders & DeviceManagementListDeploymentsForGroup200Headers;
}

export interface DeviceManagementListDeploymentsForGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementListDeploymentsForGroupDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    DeviceManagementListDeploymentsForGroupDefaultHeaders;
}

export interface DeviceManagementGetDeployment200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementGetDeployment200Response extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
  headers: RawHttpHeaders & DeviceManagementGetDeployment200Headers;
}

export interface DeviceManagementGetDeploymentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementGetDeploymentDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementGetDeploymentDefaultHeaders;
}

/** The request has succeeded. */
export interface DeviceManagementCreateOrUpdateDeployment200Response
  extends HttpResponse {
  status: "200";
  body: DeploymentOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface DeviceManagementCreateOrUpdateDeployment201Response
  extends HttpResponse {
  status: "201";
  body: DeploymentOutput;
}

export interface DeviceManagementCreateOrUpdateDeploymentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementCreateOrUpdateDeploymentDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    DeviceManagementCreateOrUpdateDeploymentDefaultHeaders;
}

export interface DeviceManagementDeleteDeployment204Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeviceManagementDeleteDeployment204Response
  extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & DeviceManagementDeleteDeployment204Headers;
}

export interface DeviceManagementDeleteDeploymentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementDeleteDeploymentDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementDeleteDeploymentDefaultHeaders;
}

/** The request has succeeded. */
export interface DeviceManagementGetDeploymentStatus200Response
  extends HttpResponse {
  status: "200";
  body: DeploymentStatusOutput;
}

export interface DeviceManagementGetDeploymentStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementGetDeploymentStatusDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementGetDeploymentStatusDefaultHeaders;
}

export interface DeviceManagementListDeviceClassSubgroupsForGroup200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementListDeviceClassSubgroupsForGroup200Response
  extends HttpResponse {
  status: "200";
  body: PagedDeviceClassSubgroupOutput;
  headers: RawHttpHeaders &
    DeviceManagementListDeviceClassSubgroupsForGroup200Headers;
}

export interface DeviceManagementListDeviceClassSubgroupsForGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementListDeviceClassSubgroupsForGroupDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    DeviceManagementListDeviceClassSubgroupsForGroupDefaultHeaders;
}

export interface DeviceManagementGetDeviceClassSubgroup200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementGetDeviceClassSubgroup200Response
  extends HttpResponse {
  status: "200";
  body: DeviceClassSubgroupOutput;
  headers: RawHttpHeaders & DeviceManagementGetDeviceClassSubgroup200Headers;
}

export interface DeviceManagementGetDeviceClassSubgroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementGetDeviceClassSubgroupDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    DeviceManagementGetDeviceClassSubgroupDefaultHeaders;
}

export interface DeviceManagementDeleteDeviceClassSubgroup204Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeviceManagementDeleteDeviceClassSubgroup204Response
  extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & DeviceManagementDeleteDeviceClassSubgroup204Headers;
}

export interface DeviceManagementDeleteDeviceClassSubgroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementDeleteDeviceClassSubgroupDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    DeviceManagementDeleteDeviceClassSubgroupDefaultHeaders;
}

/** The request has succeeded. */
export interface DeviceManagementGetDeviceClassSubgroupUpdateCompliance200Response
  extends HttpResponse {
  status: "200";
  body: UpdateComplianceOutput;
}

export interface DeviceManagementGetDeviceClassSubgroupUpdateComplianceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementGetDeviceClassSubgroupUpdateComplianceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    DeviceManagementGetDeviceClassSubgroupUpdateComplianceDefaultHeaders;
}

/** The request has succeeded. */
export interface DeviceManagementGetBestUpdatesForDeviceClassSubgroup200Response
  extends HttpResponse {
  status: "200";
  body: DeviceClassSubgroupUpdatableDevicesOutput;
}

export interface DeviceManagementGetBestUpdatesForDeviceClassSubgroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementGetBestUpdatesForDeviceClassSubgroupDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    DeviceManagementGetBestUpdatesForDeviceClassSubgroupDefaultHeaders;
}

export interface DeviceManagementListDeploymentsForDeviceClassSubgroup200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementListDeploymentsForDeviceClassSubgroup200Response
  extends HttpResponse {
  status: "200";
  body: PagedDeviceClassSubgroupDeploymentOutput;
  headers: RawHttpHeaders &
    DeviceManagementListDeploymentsForDeviceClassSubgroup200Headers;
}

export interface DeviceManagementListDeploymentsForDeviceClassSubgroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementListDeploymentsForDeviceClassSubgroupDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    DeviceManagementListDeploymentsForDeviceClassSubgroupDefaultHeaders;
}

export interface DeviceManagementGetDeploymentForDeviceClassSubgroup200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementGetDeploymentForDeviceClassSubgroup200Response
  extends HttpResponse {
  status: "200";
  body: DeviceClassSubgroupDeploymentOutput;
  headers: RawHttpHeaders &
    DeviceManagementGetDeploymentForDeviceClassSubgroup200Headers;
}

export interface DeviceManagementGetDeploymentForDeviceClassSubgroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementGetDeploymentForDeviceClassSubgroupDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    DeviceManagementGetDeploymentForDeviceClassSubgroupDefaultHeaders;
}

export interface DeviceManagementDeleteDeploymentForDeviceClassSubgroup204Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeviceManagementDeleteDeploymentForDeviceClassSubgroup204Response
  extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders &
    DeviceManagementDeleteDeploymentForDeviceClassSubgroup204Headers;
}

export interface DeviceManagementDeleteDeploymentForDeviceClassSubgroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementDeleteDeploymentForDeviceClassSubgroupDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    DeviceManagementDeleteDeploymentForDeviceClassSubgroupDefaultHeaders;
}

export interface DeviceManagementStopDeployment200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementStopDeployment200Response
  extends HttpResponse {
  status: "200";
  body: DeviceClassSubgroupDeploymentOutput;
  headers: RawHttpHeaders & DeviceManagementStopDeployment200Headers;
}

export interface DeviceManagementStopDeploymentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementStopDeploymentDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementStopDeploymentDefaultHeaders;
}

export interface DeviceManagementRetryDeployment200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementRetryDeployment200Response
  extends HttpResponse {
  status: "200";
  body: DeviceClassSubgroupDeploymentOutput;
  headers: RawHttpHeaders & DeviceManagementRetryDeployment200Headers;
}

export interface DeviceManagementRetryDeploymentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementRetryDeploymentDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementRetryDeploymentDefaultHeaders;
}

/** The request has succeeded. */
export interface DeviceManagementGetDeviceClassSubgroupDeploymentStatus200Response
  extends HttpResponse {
  status: "200";
  body: DeviceClassSubgroupDeploymentStatusOutput;
}

export interface DeviceManagementGetDeviceClassSubgroupDeploymentStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementGetDeviceClassSubgroupDeploymentStatusDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    DeviceManagementGetDeviceClassSubgroupDeploymentStatusDefaultHeaders;
}

export interface DeviceManagementListDeviceStatesForDeviceClassSubgroupDeployment200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementListDeviceStatesForDeviceClassSubgroupDeployment200Response
  extends HttpResponse {
  status: "200";
  body: PagedDeploymentDeviceStateOutput;
  headers: RawHttpHeaders &
    DeviceManagementListDeviceStatesForDeviceClassSubgroupDeployment200Headers;
}

export interface DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentDefaultHeaders;
}

export interface DeviceManagementGetOperationStatus200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementGetOperationStatus200Response
  extends HttpResponse {
  status: "200";
  body: DeviceOperationOutput;
  headers: RawHttpHeaders & DeviceManagementGetOperationStatus200Headers;
}

export interface DeviceManagementGetOperationStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementGetOperationStatusDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementGetOperationStatusDefaultHeaders;
}

export interface DeviceManagementListOperationStatuses200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementListOperationStatuses200Response
  extends HttpResponse {
  status: "200";
  body: PagedDeviceOperationOutput;
  headers: RawHttpHeaders & DeviceManagementListOperationStatuses200Headers;
}

export interface DeviceManagementListOperationStatusesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementListOperationStatusesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementListOperationStatusesDefaultHeaders;
}

export interface DeviceManagementListLogCollections200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementListLogCollections200Response
  extends HttpResponse {
  status: "200";
  body: PagedLogCollectionOutput;
  headers: RawHttpHeaders & DeviceManagementListLogCollections200Headers;
}

export interface DeviceManagementListLogCollectionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementListLogCollectionsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementListLogCollectionsDefaultHeaders;
}

export interface DeviceManagementGetLogCollection200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementGetLogCollection200Response
  extends HttpResponse {
  status: "200";
  body: LogCollectionOutput;
  headers: RawHttpHeaders & DeviceManagementGetLogCollection200Headers;
}

export interface DeviceManagementGetLogCollectionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementGetLogCollectionDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementGetLogCollectionDefaultHeaders;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface DeviceManagementStartLogCollection201Response
  extends HttpResponse {
  status: "201";
  body: LogCollectionOutput;
}

export interface DeviceManagementStartLogCollectionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementStartLogCollectionDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementStartLogCollectionDefaultHeaders;
}

/** The request has succeeded. */
export interface DeviceManagementGetLogCollectionDetailedStatus200Response
  extends HttpResponse {
  status: "200";
  body: LogCollectionOperationDetailedStatusOutput;
}

export interface DeviceManagementGetLogCollectionDetailedStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementGetLogCollectionDetailedStatusDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    DeviceManagementGetLogCollectionDetailedStatusDefaultHeaders;
}

export interface DeviceManagementListHealthOfDevices200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DeviceManagementListHealthOfDevices200Response
  extends HttpResponse {
  status: "200";
  body: PagedDeviceHealthOutput;
  headers: RawHttpHeaders & DeviceManagementListHealthOfDevices200Headers;
}

export interface DeviceManagementListHealthOfDevicesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeviceManagementListHealthOfDevicesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeviceManagementListHealthOfDevicesDefaultHeaders;
}

/** The request has succeeded. */
export interface InstanceManagementGetLimits200Response extends HttpResponse {
  status: "200";
  body: LimitsOutput;
}

export interface InstanceManagementGetLimitsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface InstanceManagementGetLimitsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & InstanceManagementGetLimitsDefaultHeaders;
}
