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
  OperationStatusOutput,
  RemoteConnectionOutput,
  DevBoxActionsListResultOutput,
  DevBoxActionOutput,
  DevBoxActionsDelayMultipleResultOutput,
  EnvironmentListResultOutput,
  EnvironmentOutput,
  CatalogListResultOutput,
  CatalogOutput,
  EnvironmentDefinitionListResultOutput,
  EnvironmentDefinitionOutput,
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

/** Creates or replaces a Dev Box. */
export interface DevBoxesCreateDevBox200Response extends HttpResponse {
  status: "200";
  body: DevBoxOutput;
}

/** Creates or replaces a Dev Box. */
export interface DevBoxesCreateDevBox201Response extends HttpResponse {
  status: "201";
  body: DevBoxOutput;
}

export interface DevBoxesCreateDevBoxDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Creates or replaces a Dev Box. */
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
  body: OperationStatusOutput;
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
  body: OperationStatusOutput;
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
  body: OperationStatusOutput;
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

export interface DevBoxesRestartDevBox202Headers {
  /** URL to query for status of the operation. */
  "operation-location"?: string;
}

/** Restarts a Dev Box */
export interface DevBoxesRestartDevBox202Response extends HttpResponse {
  status: "202";
  body: OperationStatusOutput;
  headers: RawHttpHeaders & DevBoxesRestartDevBox202Headers;
}

export interface DevBoxesRestartDevBoxDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Restarts a Dev Box */
export interface DevBoxesRestartDevBoxDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesRestartDevBoxDefaultHeaders;
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

/** Lists actions on a Dev Box. */
export interface DevBoxesListActions200Response extends HttpResponse {
  status: "200";
  body: DevBoxActionsListResultOutput;
}

export interface DevBoxesListActionsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists actions on a Dev Box. */
export interface DevBoxesListActionsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesListActionsDefaultHeaders;
}

/** Gets an action. */
export interface DevBoxesGetAction200Response extends HttpResponse {
  status: "200";
  body: DevBoxActionOutput;
}

export interface DevBoxesGetActionDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Gets an action. */
export interface DevBoxesGetActionDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesGetActionDefaultHeaders;
}

/** Skips an occurrence of an action. */
export interface DevBoxesSkipAction204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface DevBoxesSkipActionDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Skips an occurrence of an action. */
export interface DevBoxesSkipActionDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesSkipActionDefaultHeaders;
}

/** Delays the occurrence of an action. */
export interface DevBoxesDelayAction200Response extends HttpResponse {
  status: "200";
  body: DevBoxActionOutput;
}

export interface DevBoxesDelayActionDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Delays the occurrence of an action. */
export interface DevBoxesDelayActionDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesDelayActionDefaultHeaders;
}

/** Delays all actions. */
export interface DevBoxesDelayActions200Response extends HttpResponse {
  status: "200";
  body: DevBoxActionsDelayMultipleResultOutput;
}

export interface DevBoxesDelayActionsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Delays all actions. */
export interface DevBoxesDelayActionsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesDelayActionsDefaultHeaders;
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

export interface EnvironmentsCreateOrReplaceEnvironment201Headers {
  /** URL to query for status of the operation. */
  "operation-location"?: string;
}

/** Creates or updates an environment. */
export interface EnvironmentsCreateOrReplaceEnvironment201Response
  extends HttpResponse {
  status: "201";
  body: EnvironmentOutput;
  headers: RawHttpHeaders & EnvironmentsCreateOrReplaceEnvironment201Headers;
}

export interface EnvironmentsCreateOrReplaceEnvironmentDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Creates or updates an environment. */
export interface EnvironmentsCreateOrReplaceEnvironmentDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders &
    EnvironmentsCreateOrReplaceEnvironmentDefaultHeaders;
}

export interface EnvironmentsDeleteEnvironment202Headers {
  /** URL to query for status of the operation. */
  "operation-location"?: string;
}

/** Deletes an environment and all its associated resources */
export interface EnvironmentsDeleteEnvironment202Response extends HttpResponse {
  status: "202";
  body: OperationStatusOutput;
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

/** Lists all of the catalogs available for a project. */
export interface EnvironmentsListCatalogsByProject200Response
  extends HttpResponse {
  status: "200";
  body: CatalogListResultOutput;
}

export interface EnvironmentsListCatalogsByProjectDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists all of the catalogs available for a project. */
export interface EnvironmentsListCatalogsByProjectDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsListCatalogsByProjectDefaultHeaders;
}

/** Gets the specified catalog within the project */
export interface EnvironmentsGetCatalog200Response extends HttpResponse {
  status: "200";
  body: CatalogOutput;
}

export interface EnvironmentsGetCatalogDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Gets the specified catalog within the project */
export interface EnvironmentsGetCatalogDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsGetCatalogDefaultHeaders;
}

/** Lists all environment definitions available for a project. */
export interface EnvironmentsListEnvironmentDefinitionsByProject200Response
  extends HttpResponse {
  status: "200";
  body: EnvironmentDefinitionListResultOutput;
}

export interface EnvironmentsListEnvironmentDefinitionsByProjectDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists all environment definitions available for a project. */
export interface EnvironmentsListEnvironmentDefinitionsByProjectDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders &
    EnvironmentsListEnvironmentDefinitionsByProjectDefaultHeaders;
}

/** Lists all environment definitions available within a catalog. */
export interface EnvironmentsListEnvironmentDefinitionsByCatalog200Response
  extends HttpResponse {
  status: "200";
  body: EnvironmentDefinitionListResultOutput;
}

export interface EnvironmentsListEnvironmentDefinitionsByCatalogDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists all environment definitions available within a catalog. */
export interface EnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders &
    EnvironmentsListEnvironmentDefinitionsByCatalogDefaultHeaders;
}

/** Get an environment definition from a catalog. */
export interface EnvironmentsGetEnvironmentDefinition200Response
  extends HttpResponse {
  status: "200";
  body: EnvironmentDefinitionOutput;
}

export interface EnvironmentsGetEnvironmentDefinitionDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get an environment definition from a catalog. */
export interface EnvironmentsGetEnvironmentDefinitionDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsGetEnvironmentDefinitionDefaultHeaders;
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
