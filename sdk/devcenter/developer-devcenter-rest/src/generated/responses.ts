// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  ProjectListResultOutput,
  CloudErrorOutput,
  ProjectOutput,
  DevBoxListResultOutput,
  PoolListResultOutput,
  PoolOutput,
  ScheduleListResultOutput,
  ScheduleOutput,
  DevBoxOutput,
  RemoteConnectionOutput,
  UpcomingActionsListResultOutput,
  UpcomingActionOutput,
  EnvironmentListResultOutput,
  EnvironmentOutput,
  CatalogItemListResultOutput,
  CatalogItemOutput,
  CatalogItemVersionListResultOutput,
  CatalogItemVersionOutput,
  EnvironmentTypeListResultOutput
} from "./outputModels";

/** Lists all projects. */
export interface DevCenterListProjects200Response extends HttpResponse {
  status: "200";
  body: ProjectListResultOutput;
}

/** Lists all projects. */
export interface DevCenterListProjectsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a project. */
export interface DevCenterGetProject200Response extends HttpResponse {
  status: "200";
  body: ProjectOutput;
}

/** Gets a project. */
export interface DevCenterGetProjectDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists Dev Boxes that the caller has access to in the DevCenter. */
export interface DevCenterListAllDevBoxes200Response extends HttpResponse {
  status: "200";
  body: DevBoxListResultOutput;
}

export interface DevCenterListAllDevBoxesDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists Dev Boxes that the caller has access to in the DevCenter. */
export interface DevCenterListAllDevBoxesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevCenterListAllDevBoxesDefaultHeaders;
}

/** Lists Dev Boxes in the Dev Center for a particular user. */
export interface DevCenterListAllDevBoxesByUser200Response
  extends HttpResponse {
  status: "200";
  body: DevBoxListResultOutput;
}

export interface DevCenterListAllDevBoxesByUserDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists Dev Boxes in the Dev Center for a particular user. */
export interface DevCenterListAllDevBoxesByUserDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevCenterListAllDevBoxesByUserDefaultHeaders;
}

/** Lists available pools */
export interface DevBoxesListPools200Response extends HttpResponse {
  status: "200";
  body: PoolListResultOutput;
}

export interface DevBoxesListPoolsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists available pools */
export interface DevBoxesListPoolsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesListPoolsDefaultHeaders;
}

/** Gets a pool */
export interface DevBoxesGetPool200Response extends HttpResponse {
  status: "200";
  body: PoolOutput;
}

export interface DevBoxesGetPoolDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Gets a pool */
export interface DevBoxesGetPoolDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesGetPoolDefaultHeaders;
}

/** Lists available schedules for a pool. */
export interface DevBoxesListSchedulesByPool200Response extends HttpResponse {
  status: "200";
  body: ScheduleListResultOutput;
}

export interface DevBoxesListSchedulesByPoolDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists available schedules for a pool. */
export interface DevBoxesListSchedulesByPoolDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesListSchedulesByPoolDefaultHeaders;
}

/** Gets a schedule. */
export interface DevBoxesGetScheduleByPool200Response extends HttpResponse {
  status: "200";
  body: ScheduleOutput;
}

export interface DevBoxesGetScheduleByPoolDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Gets a schedule. */
export interface DevBoxesGetScheduleByPoolDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesGetScheduleByPoolDefaultHeaders;
}

/** Lists Dev Boxes in the project for a particular user. */
export interface DevBoxesListDevBoxesByUser200Response extends HttpResponse {
  status: "200";
  body: DevBoxListResultOutput;
}

export interface DevBoxesListDevBoxesByUserDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists Dev Boxes in the project for a particular user. */
export interface DevBoxesListDevBoxesByUserDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesListDevBoxesByUserDefaultHeaders;
}

/** Gets a Dev Box */
export interface DevBoxesGetDevBoxByUser200Response extends HttpResponse {
  status: "200";
  body: DevBoxOutput;
}

export interface DevBoxesGetDevBoxByUserDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Gets a Dev Box */
export interface DevBoxesGetDevBoxByUserDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesGetDevBoxByUserDefaultHeaders;
}

/** Creates or updates a Dev Box. */
export interface DevBoxesCreateDevBox200Response extends HttpResponse {
  status: "200";
  body: DevBoxOutput;
}

/** Creates or updates a Dev Box. */
export interface DevBoxesCreateDevBox201Response extends HttpResponse {
  status: "201";
  body: DevBoxOutput;
}

export interface DevBoxesCreateDevBoxDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Creates or updates a Dev Box. */
export interface DevBoxesCreateDevBoxDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesCreateDevBoxDefaultHeaders;
}

export interface DevBoxesDeleteDevBox202Headers {
  /** URL to query for status of the operation. */
  "operation-location"?: string;
}

/** Deletes a Dev Box. */
export interface DevBoxesDeleteDevBox202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & DevBoxesDeleteDevBox202Headers;
}

/** Deletes a Dev Box. */
export interface DevBoxesDeleteDevBox204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface DevBoxesDeleteDevBoxDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Deletes a Dev Box. */
export interface DevBoxesDeleteDevBoxDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesDeleteDevBoxDefaultHeaders;
}

export interface DevBoxesStartDevBox202Headers {
  /** URL to query for status of the operation. */
  "operation-location"?: string;
}

/** Starts a Dev Box */
export interface DevBoxesStartDevBox202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & DevBoxesStartDevBox202Headers;
}

export interface DevBoxesStartDevBoxDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Starts a Dev Box */
export interface DevBoxesStartDevBoxDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesStartDevBoxDefaultHeaders;
}

export interface DevBoxesStopDevBox202Headers {
  /** URL to query for status of the operation. */
  "operation-location"?: string;
}

/** Stops a Dev Box */
export interface DevBoxesStopDevBox202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & DevBoxesStopDevBox202Headers;
}

export interface DevBoxesStopDevBoxDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Stops a Dev Box */
export interface DevBoxesStopDevBoxDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesStopDevBoxDefaultHeaders;
}

/** Gets RDP Connection info */
export interface DevBoxesGetRemoteConnection200Response extends HttpResponse {
  status: "200";
  body: RemoteConnectionOutput;
}

export interface DevBoxesGetRemoteConnectionDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Gets RDP Connection info */
export interface DevBoxesGetRemoteConnectionDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesGetRemoteConnectionDefaultHeaders;
}

/** Lists upcoming actions on a Dev Box. */
export interface DevBoxesListUpcomingActions200Response extends HttpResponse {
  status: "200";
  body: UpcomingActionsListResultOutput;
}

export interface DevBoxesListUpcomingActionsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists upcoming actions on a Dev Box. */
export interface DevBoxesListUpcomingActionsDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesListUpcomingActionsDefaultHeaders;
}

/** Gets an Upcoming Action. */
export interface DevBoxesGetUpcomingAction200Response extends HttpResponse {
  status: "200";
  body: UpcomingActionOutput;
}

export interface DevBoxesGetUpcomingActionDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Gets an Upcoming Action. */
export interface DevBoxesGetUpcomingActionDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesGetUpcomingActionDefaultHeaders;
}

/** Skips an Upcoming Action. */
export interface DevBoxesSkipUpcomingAction204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface DevBoxesSkipUpcomingActionDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Skips an Upcoming Action. */
export interface DevBoxesSkipUpcomingActionDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesSkipUpcomingActionDefaultHeaders;
}

/** Delays an Upcoming Action. */
export interface DevBoxesDelayUpcomingAction200Response extends HttpResponse {
  status: "200";
  body: UpcomingActionOutput;
}

export interface DevBoxesDelayUpcomingActionDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Delays an Upcoming Action. */
export interface DevBoxesDelayUpcomingActionDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesDelayUpcomingActionDefaultHeaders;
}

/** Lists the environments for a project. */
export interface EnvironmentsListEnvironments200Response extends HttpResponse {
  status: "200";
  body: EnvironmentListResultOutput;
}

export interface EnvironmentsListEnvironmentsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists the environments for a project. */
export interface EnvironmentsListEnvironmentsDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsListEnvironmentsDefaultHeaders;
}

/** Lists the environments for a project and user. */
export interface EnvironmentsListEnvironmentsByUser200Response
  extends HttpResponse {
  status: "200";
  body: EnvironmentListResultOutput;
}

export interface EnvironmentsListEnvironmentsByUserDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists the environments for a project and user. */
export interface EnvironmentsListEnvironmentsByUserDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsListEnvironmentsByUserDefaultHeaders;
}

/** Gets an environment */
export interface EnvironmentsGetEnvironmentByUser200Response
  extends HttpResponse {
  status: "200";
  body: EnvironmentOutput;
}

export interface EnvironmentsGetEnvironmentByUserDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Gets an environment */
export interface EnvironmentsGetEnvironmentByUserDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsGetEnvironmentByUserDefaultHeaders;
}

/** Creates or updates an environment. */
export interface EnvironmentsCreateOrUpdateEnvironment200Response
  extends HttpResponse {
  status: "200";
  body: EnvironmentOutput;
}

export interface EnvironmentsCreateOrUpdateEnvironment201Headers {
  /** URL to query for status of the operation. */
  "operation-location"?: string;
}

/** Creates or updates an environment. */
export interface EnvironmentsCreateOrUpdateEnvironment201Response
  extends HttpResponse {
  status: "201";
  body: EnvironmentOutput;
  headers: RawHttpHeaders & EnvironmentsCreateOrUpdateEnvironment201Headers;
}

export interface EnvironmentsCreateOrUpdateEnvironmentDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Creates or updates an environment. */
export interface EnvironmentsCreateOrUpdateEnvironmentDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsCreateOrUpdateEnvironmentDefaultHeaders;
}

/** Partially updates an environment */
export interface EnvironmentsUpdateEnvironment200Response extends HttpResponse {
  status: "200";
  body: EnvironmentOutput;
}

export interface EnvironmentsUpdateEnvironmentDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Partially updates an environment */
export interface EnvironmentsUpdateEnvironmentDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsUpdateEnvironmentDefaultHeaders;
}

/** Deletes an environment and all its associated resources */
export interface EnvironmentsDeleteEnvironment200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

export interface EnvironmentsDeleteEnvironment202Headers {
  /** URL to query for status of the operation. */
  "operation-location"?: string;
}

/** Deletes an environment and all its associated resources */
export interface EnvironmentsDeleteEnvironment202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & EnvironmentsDeleteEnvironment202Headers;
}

/** Deletes an environment and all its associated resources */
export interface EnvironmentsDeleteEnvironment204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface EnvironmentsDeleteEnvironmentDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Deletes an environment and all its associated resources */
export interface EnvironmentsDeleteEnvironmentDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsDeleteEnvironmentDefaultHeaders;
}

/** Executes a deploy action */
export interface EnvironmentsDeployEnvironmentAction200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

export interface EnvironmentsDeployEnvironmentAction202Headers {
  /** URL to query for status of the operation. */
  "operation-location"?: string;
}

/** Executes a deploy action */
export interface EnvironmentsDeployEnvironmentAction202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & EnvironmentsDeployEnvironmentAction202Headers;
}

export interface EnvironmentsDeployEnvironmentActionDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Executes a deploy action */
export interface EnvironmentsDeployEnvironmentActionDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsDeployEnvironmentActionDefaultHeaders;
}

/** Executes a custom action */
export interface EnvironmentsCustomEnvironmentAction200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

export interface EnvironmentsCustomEnvironmentAction202Headers {
  /** URL to query for status of the operation. */
  "operation-location"?: string;
}

/** Executes a custom action */
export interface EnvironmentsCustomEnvironmentAction202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & EnvironmentsCustomEnvironmentAction202Headers;
}

export interface EnvironmentsCustomEnvironmentActionDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Executes a custom action */
export interface EnvironmentsCustomEnvironmentActionDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsCustomEnvironmentActionDefaultHeaders;
}

/** Lists latest version of all catalog items available for a project. */
export interface EnvironmentsListCatalogItems200Response extends HttpResponse {
  status: "200";
  body: CatalogItemListResultOutput;
}

export interface EnvironmentsListCatalogItemsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists latest version of all catalog items available for a project. */
export interface EnvironmentsListCatalogItemsDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsListCatalogItemsDefaultHeaders;
}

/** Get a catalog item from a project. */
export interface EnvironmentsGetCatalogItem200Response extends HttpResponse {
  status: "200";
  body: CatalogItemOutput;
}

export interface EnvironmentsGetCatalogItemDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get a catalog item from a project. */
export interface EnvironmentsGetCatalogItemDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsGetCatalogItemDefaultHeaders;
}

/** List all versions of a catalog item from a project. */
export interface EnvironmentsListCatalogItemVersions200Response
  extends HttpResponse {
  status: "200";
  body: CatalogItemVersionListResultOutput;
}

export interface EnvironmentsListCatalogItemVersionsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** List all versions of a catalog item from a project. */
export interface EnvironmentsListCatalogItemVersionsDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsListCatalogItemVersionsDefaultHeaders;
}

/** Get a specific catalog item version from a project. */
export interface EnvironmentsGetCatalogItemVersion200Response
  extends HttpResponse {
  status: "200";
  body: CatalogItemVersionOutput;
}

export interface EnvironmentsGetCatalogItemVersionDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get a specific catalog item version from a project. */
export interface EnvironmentsGetCatalogItemVersionDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsGetCatalogItemVersionDefaultHeaders;
}

/** Lists all environment types configured for a project. */
export interface EnvironmentsListEnvironmentTypes200Response
  extends HttpResponse {
  status: "200";
  body: EnvironmentTypeListResultOutput;
}

export interface EnvironmentsListEnvironmentTypesDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists all environment types configured for a project. */
export interface EnvironmentsListEnvironmentTypesDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsListEnvironmentTypesDefaultHeaders;
}
