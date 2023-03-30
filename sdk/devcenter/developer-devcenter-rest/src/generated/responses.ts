// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  ProjectListResultOutput,
  CloudErrorOutput,
  ProjectOutput,
  PoolListResultOutput,
  PoolOutput,
  ScheduleListResultOutput,
  ScheduleOutput,
  DevBoxListResultOutput,
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
export interface DevBoxesListSchedules200Response extends HttpResponse {
  status: "200";
  body: ScheduleListResultOutput;
}

export interface DevBoxesListSchedulesDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists available schedules for a pool. */
export interface DevBoxesListSchedulesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesListSchedulesDefaultHeaders;
}

/** Gets a schedule. */
export interface DevBoxesGetSchedule200Response extends HttpResponse {
  status: "200";
  body: ScheduleOutput;
}

export interface DevBoxesGetScheduleDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Gets a schedule. */
export interface DevBoxesGetScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesGetScheduleDefaultHeaders;
}

/** Lists Dev Boxes that the caller has access to in the DevCenter. */
export interface DevBoxesListAllDevBoxes200Response extends HttpResponse {
  status: "200";
  body: DevBoxListResultOutput;
}

export interface DevBoxesListAllDevBoxesDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists Dev Boxes that the caller has access to in the DevCenter. */
export interface DevBoxesListAllDevBoxesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesListAllDevBoxesDefaultHeaders;
}

/** Lists Dev Boxes in the Dev Center for a particular user. */
export interface DevBoxesListAllDevBoxesByUser200Response extends HttpResponse {
  status: "200";
  body: DevBoxListResultOutput;
}

export interface DevBoxesListAllDevBoxesByUserDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists Dev Boxes in the Dev Center for a particular user. */
export interface DevBoxesListAllDevBoxesByUserDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesListAllDevBoxesByUserDefaultHeaders;
}

/** Lists Dev Boxes in the project for a particular user. */
export interface DevBoxesListDevBoxes200Response extends HttpResponse {
  status: "200";
  body: DevBoxListResultOutput;
}

export interface DevBoxesListDevBoxesDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists Dev Boxes in the project for a particular user. */
export interface DevBoxesListDevBoxesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesListDevBoxesDefaultHeaders;
}

/** Gets a Dev Box */
export interface DevBoxesGetDevBox200Response extends HttpResponse {
  status: "200";
  body: DevBoxOutput;
}

export interface DevBoxesGetDevBoxDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Gets a Dev Box */
export interface DevBoxesGetDevBoxDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesGetDevBoxDefaultHeaders;
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
export interface DevBoxesDelayAllActions200Response extends HttpResponse {
  status: "200";
  body: DevBoxActionsDelayMultipleResultOutput;
}

export interface DevBoxesDelayAllActionsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Delays all actions. */
export interface DevBoxesDelayAllActionsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesDelayAllActionsDefaultHeaders;
}

/** Lists the environments for a project. */
export interface DeploymentEnvironmentsListAllEnvironments200Response
  extends HttpResponse {
  status: "200";
  body: EnvironmentListResultOutput;
}

export interface DeploymentEnvironmentsListAllEnvironmentsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists the environments for a project. */
export interface DeploymentEnvironmentsListAllEnvironmentsDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders &
    DeploymentEnvironmentsListAllEnvironmentsDefaultHeaders;
}

/** Lists the environments for a project and user. */
export interface DeploymentEnvironmentsListEnvironments200Response
  extends HttpResponse {
  status: "200";
  body: EnvironmentListResultOutput;
}

export interface DeploymentEnvironmentsListEnvironmentsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists the environments for a project and user. */
export interface DeploymentEnvironmentsListEnvironmentsDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders &
    DeploymentEnvironmentsListEnvironmentsDefaultHeaders;
}

/** Gets an environment */
export interface DeploymentEnvironmentsGetEnvironment200Response
  extends HttpResponse {
  status: "200";
  body: EnvironmentOutput;
}

export interface DeploymentEnvironmentsGetEnvironmentDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Gets an environment */
export interface DeploymentEnvironmentsGetEnvironmentDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DeploymentEnvironmentsGetEnvironmentDefaultHeaders;
}

export interface DeploymentEnvironmentsCreateOrUpdateEnvironment201Headers {
  /** URL to query for status of the operation. */
  "operation-location"?: string;
}

/** Creates or updates an environment. */
export interface DeploymentEnvironmentsCreateOrUpdateEnvironment201Response
  extends HttpResponse {
  status: "201";
  body: EnvironmentOutput;
  headers: RawHttpHeaders &
    DeploymentEnvironmentsCreateOrUpdateEnvironment201Headers;
}

export interface DeploymentEnvironmentsCreateOrUpdateEnvironmentDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Creates or updates an environment. */
export interface DeploymentEnvironmentsCreateOrUpdateEnvironmentDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders &
    DeploymentEnvironmentsCreateOrUpdateEnvironmentDefaultHeaders;
}

export interface DeploymentEnvironmentsDeleteEnvironment202Headers {
  /** URL to query for status of the operation. */
  "operation-location"?: string;
}

/** Deletes an environment and all its associated resources */
export interface DeploymentEnvironmentsDeleteEnvironment202Response
  extends HttpResponse {
  status: "202";
  body: OperationStatusOutput;
  headers: RawHttpHeaders & DeploymentEnvironmentsDeleteEnvironment202Headers;
}

/** Deletes an environment and all its associated resources */
export interface DeploymentEnvironmentsDeleteEnvironment204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface DeploymentEnvironmentsDeleteEnvironmentDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Deletes an environment and all its associated resources */
export interface DeploymentEnvironmentsDeleteEnvironmentDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders &
    DeploymentEnvironmentsDeleteEnvironmentDefaultHeaders;
}

/** Lists all of the catalogs available for a project. */
export interface DeploymentEnvironmentsListCatalogs200Response
  extends HttpResponse {
  status: "200";
  body: CatalogListResultOutput;
}

export interface DeploymentEnvironmentsListCatalogsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists all of the catalogs available for a project. */
export interface DeploymentEnvironmentsListCatalogsDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DeploymentEnvironmentsListCatalogsDefaultHeaders;
}

/** Gets the specified catalog within the project */
export interface DeploymentEnvironmentsGetCatalog200Response
  extends HttpResponse {
  status: "200";
  body: CatalogOutput;
}

export interface DeploymentEnvironmentsGetCatalogDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Gets the specified catalog within the project */
export interface DeploymentEnvironmentsGetCatalogDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DeploymentEnvironmentsGetCatalogDefaultHeaders;
}

/** Lists all environment definitions available for a project. */
export interface DeploymentEnvironmentsListEnvironmentDefinitions200Response
  extends HttpResponse {
  status: "200";
  body: EnvironmentDefinitionListResultOutput;
}

export interface DeploymentEnvironmentsListEnvironmentDefinitionsDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists all environment definitions available for a project. */
export interface DeploymentEnvironmentsListEnvironmentDefinitionsDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders &
    DeploymentEnvironmentsListEnvironmentDefinitionsDefaultHeaders;
}

/** Lists all environment definitions available within a catalog. */
export interface DeploymentEnvironmentsListEnvironmentDefinitionsByCatalog200Response
  extends HttpResponse {
  status: "200";
  body: EnvironmentDefinitionListResultOutput;
}

export interface DeploymentEnvironmentsListEnvironmentDefinitionsByCatalogDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists all environment definitions available within a catalog. */
export interface DeploymentEnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders &
    DeploymentEnvironmentsListEnvironmentDefinitionsByCatalogDefaultHeaders;
}

/** Get an environment definition from a catalog. */
export interface DeploymentEnvironmentsGetEnvironmentDefinition200Response
  extends HttpResponse {
  status: "200";
  body: EnvironmentDefinitionOutput;
}

export interface DeploymentEnvironmentsGetEnvironmentDefinitionDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get an environment definition from a catalog. */
export interface DeploymentEnvironmentsGetEnvironmentDefinitionDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders &
    DeploymentEnvironmentsGetEnvironmentDefinitionDefaultHeaders;
}

/** Lists all environment types configured for a project. */
export interface DeploymentEnvironmentsListEnvironmentTypes200Response
  extends HttpResponse {
  status: "200";
  body: EnvironmentTypeListResultOutput;
}

export interface DeploymentEnvironmentsListEnvironmentTypesDefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists all environment types configured for a project. */
export interface DeploymentEnvironmentsListEnvironmentTypesDefaultResponse
  extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders &
    DeploymentEnvironmentsListEnvironmentTypesDefaultHeaders;
}
