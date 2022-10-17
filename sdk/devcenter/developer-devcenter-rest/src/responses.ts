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
  EnvironmentListResultOutput,
  EnvironmentOutput,
  ArtifactListResultOutput,
  CatalogItemListResultOutput,
  CatalogItemOutput,
  CatalogItemVersionListResultOutput,
  CatalogItemVersionOutput,
  EnvironmentTypeListResultOutput,
} from "./outputModels";

/** Lists all projects. */
export interface DevCenterListProjects200Response extends HttpResponse {
  status: "200";
  body: ProjectListResultOutput;
}

/** Lists all projects. */
export interface DevCenterListProjectsdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a project. */
export interface DevCenterGetProject200Response extends HttpResponse {
  status: "200";
  body: ProjectOutput;
}

/** Gets a project. */
export interface DevCenterGetProjectdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists Dev Boxes that the caller has access to in the DevCenter. */
export interface DevCenterListAllDevBoxes200Response extends HttpResponse {
  status: "200";
  body: DevBoxListResultOutput;
}

export interface DevCenterListAllDevBoxesdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists Dev Boxes that the caller has access to in the DevCenter. */
export interface DevCenterListAllDevBoxesdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevCenterListAllDevBoxesdefaultHeaders;
}

/** Lists Dev Boxes in the Dev Center for a particular user. */
export interface DevCenterListAllDevBoxesByUser200Response extends HttpResponse {
  status: "200";
  body: DevBoxListResultOutput;
}

export interface DevCenterListAllDevBoxesByUserdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists Dev Boxes in the Dev Center for a particular user. */
export interface DevCenterListAllDevBoxesByUserdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevCenterListAllDevBoxesByUserdefaultHeaders;
}

/** Lists available pools */
export interface DevBoxesListPools200Response extends HttpResponse {
  status: "200";
  body: PoolListResultOutput;
}

export interface DevBoxesListPoolsdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists available pools */
export interface DevBoxesListPoolsdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesListPoolsdefaultHeaders;
}

/** Gets a pool */
export interface DevBoxesGetPool200Response extends HttpResponse {
  status: "200";
  body: PoolOutput;
}

export interface DevBoxesGetPooldefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Gets a pool */
export interface DevBoxesGetPooldefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesGetPooldefaultHeaders;
}

/** Lists available schedules for a pool. */
export interface DevBoxesListSchedulesByPool200Response extends HttpResponse {
  status: "200";
  body: ScheduleListResultOutput;
}

export interface DevBoxesListSchedulesByPooldefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists available schedules for a pool. */
export interface DevBoxesListSchedulesByPooldefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesListSchedulesByPooldefaultHeaders;
}

/** Gets a schedule. */
export interface DevBoxesGetScheduleByPool200Response extends HttpResponse {
  status: "200";
  body: ScheduleOutput;
}

export interface DevBoxesGetScheduleByPooldefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Gets a schedule. */
export interface DevBoxesGetScheduleByPooldefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesGetScheduleByPooldefaultHeaders;
}

/** Lists Dev Boxes in the project for a particular user. */
export interface DevBoxesListDevBoxesByUser200Response extends HttpResponse {
  status: "200";
  body: DevBoxListResultOutput;
}

export interface DevBoxesListDevBoxesByUserdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists Dev Boxes in the project for a particular user. */
export interface DevBoxesListDevBoxesByUserdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesListDevBoxesByUserdefaultHeaders;
}

/** Gets a Dev Box */
export interface DevBoxesGetDevBoxByUser200Response extends HttpResponse {
  status: "200";
  body: DevBoxOutput;
}

export interface DevBoxesGetDevBoxByUserdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Gets a Dev Box */
export interface DevBoxesGetDevBoxByUserdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesGetDevBoxByUserdefaultHeaders;
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

export interface DevBoxesCreateDevBoxdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Creates or updates a Dev Box. */
export interface DevBoxesCreateDevBoxdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesCreateDevBoxdefaultHeaders;
}

/** Deletes a Dev Box. */
export interface DevBoxesDeleteDevBox200Response extends HttpResponse {
  status: "200";
  body: DevBoxOutput;
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

export interface DevBoxesDeleteDevBoxdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Deletes a Dev Box. */
export interface DevBoxesDeleteDevBoxdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesDeleteDevBoxdefaultHeaders;
}

/** Starts a Dev Box */
export interface DevBoxesStartDevBox200Response extends HttpResponse {
  status: "200";
  body: DevBoxOutput;
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

export interface DevBoxesStartDevBoxdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Starts a Dev Box */
export interface DevBoxesStartDevBoxdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesStartDevBoxdefaultHeaders;
}

/** Stops a Dev Box */
export interface DevBoxesStopDevBox200Response extends HttpResponse {
  status: "200";
  body: DevBoxOutput;
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

export interface DevBoxesStopDevBoxdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Stops a Dev Box */
export interface DevBoxesStopDevBoxdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesStopDevBoxdefaultHeaders;
}

/** Gets RDP Connection info */
export interface DevBoxesGetRemoteConnection200Response extends HttpResponse {
  status: "200";
  body: RemoteConnectionOutput;
}

export interface DevBoxesGetRemoteConnectiondefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Gets RDP Connection info */
export interface DevBoxesGetRemoteConnectiondefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & DevBoxesGetRemoteConnectiondefaultHeaders;
}

/** Lists the environments for a project. */
export interface EnvironmentsListEnvironments200Response extends HttpResponse {
  status: "200";
  body: EnvironmentListResultOutput;
}

export interface EnvironmentsListEnvironmentsdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists the environments for a project. */
export interface EnvironmentsListEnvironmentsdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsListEnvironmentsdefaultHeaders;
}

/** Lists the environments for a project and user. */
export interface EnvironmentsListEnvironmentsByUser200Response extends HttpResponse {
  status: "200";
  body: EnvironmentListResultOutput;
}

export interface EnvironmentsListEnvironmentsByUserdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists the environments for a project and user. */
export interface EnvironmentsListEnvironmentsByUserdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsListEnvironmentsByUserdefaultHeaders;
}

/** Gets an environment */
export interface EnvironmentsGetEnvironmentByUser200Response extends HttpResponse {
  status: "200";
  body: EnvironmentOutput;
}

export interface EnvironmentsGetEnvironmentByUserdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Gets an environment */
export interface EnvironmentsGetEnvironmentByUserdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsGetEnvironmentByUserdefaultHeaders;
}

/** Creates or updates an environment. */
export interface EnvironmentsCreateOrUpdateEnvironment200Response extends HttpResponse {
  status: "200";
  body: EnvironmentOutput;
}

export interface EnvironmentsCreateOrUpdateEnvironment201Headers {
  /** URL to query for status of the operation. */
  "operation-location"?: string;
}

/** Creates or updates an environment. */
export interface EnvironmentsCreateOrUpdateEnvironment201Response extends HttpResponse {
  status: "201";
  body: EnvironmentOutput;
  headers: RawHttpHeaders & EnvironmentsCreateOrUpdateEnvironment201Headers;
}

export interface EnvironmentsCreateOrUpdateEnvironmentdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Creates or updates an environment. */
export interface EnvironmentsCreateOrUpdateEnvironmentdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsCreateOrUpdateEnvironmentdefaultHeaders;
}

/** Partially updates an environment */
export interface EnvironmentsUpdateEnvironment200Response extends HttpResponse {
  status: "200";
  body: EnvironmentOutput;
}

export interface EnvironmentsUpdateEnvironmentdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Partially updates an environment */
export interface EnvironmentsUpdateEnvironmentdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsUpdateEnvironmentdefaultHeaders;
}

/** Deletes an environment and all it's associated resources */
export interface EnvironmentsDeleteEnvironment200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

export interface EnvironmentsDeleteEnvironment202Headers {
  /** URL to query for status of the operation. */
  "operation-location"?: string;
}

/** Deletes an environment and all it's associated resources */
export interface EnvironmentsDeleteEnvironment202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & EnvironmentsDeleteEnvironment202Headers;
}

/** Deletes an environment and all it's associated resources */
export interface EnvironmentsDeleteEnvironment204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface EnvironmentsDeleteEnvironmentdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Deletes an environment and all it's associated resources */
export interface EnvironmentsDeleteEnvironmentdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsDeleteEnvironmentdefaultHeaders;
}

/** Executes a deploy action */
export interface EnvironmentsDeployEnvironmentAction200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

export interface EnvironmentsDeployEnvironmentAction202Headers {
  /** URL to query for status of the operation. */
  "operation-location"?: string;
}

/** Executes a deploy action */
export interface EnvironmentsDeployEnvironmentAction202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & EnvironmentsDeployEnvironmentAction202Headers;
}

export interface EnvironmentsDeployEnvironmentActiondefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Executes a deploy action */
export interface EnvironmentsDeployEnvironmentActiondefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsDeployEnvironmentActiondefaultHeaders;
}

/** Executes a delete action */
export interface EnvironmentsDeleteEnvironmentAction200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

export interface EnvironmentsDeleteEnvironmentAction202Headers {
  /** URL to query for status of the operation. */
  "operation-location"?: string;
}

/** Executes a delete action */
export interface EnvironmentsDeleteEnvironmentAction202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & EnvironmentsDeleteEnvironmentAction202Headers;
}

export interface EnvironmentsDeleteEnvironmentActiondefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Executes a delete action */
export interface EnvironmentsDeleteEnvironmentActiondefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsDeleteEnvironmentActiondefaultHeaders;
}

/** Executes a custom action */
export interface EnvironmentsCustomEnvironmentAction200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

export interface EnvironmentsCustomEnvironmentAction202Headers {
  /** URL to query for status of the operation. */
  "operation-location"?: string;
}

/** Executes a custom action */
export interface EnvironmentsCustomEnvironmentAction202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & EnvironmentsCustomEnvironmentAction202Headers;
}

export interface EnvironmentsCustomEnvironmentActiondefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Executes a custom action */
export interface EnvironmentsCustomEnvironmentActiondefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsCustomEnvironmentActiondefaultHeaders;
}

/** Lists the artifacts for an environment */
export interface EnvironmentsListArtifactsByEnvironment200Response extends HttpResponse {
  status: "200";
  body: ArtifactListResultOutput;
}

export interface EnvironmentsListArtifactsByEnvironmentdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists the artifacts for an environment */
export interface EnvironmentsListArtifactsByEnvironmentdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsListArtifactsByEnvironmentdefaultHeaders;
}

/** Lists the artifacts for an environment at a specified path, or returns the file at the path. */
export interface EnvironmentsListArtifactsByEnvironmentAndPath200Response extends HttpResponse {
  status: "200";
  body: ArtifactListResultOutput;
}

export interface EnvironmentsListArtifactsByEnvironmentAndPathdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists the artifacts for an environment at a specified path, or returns the file at the path. */
export interface EnvironmentsListArtifactsByEnvironmentAndPathdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsListArtifactsByEnvironmentAndPathdefaultHeaders;
}

/** Lists latest version of all catalog items available for a project. */
export interface EnvironmentsListCatalogItems200Response extends HttpResponse {
  status: "200";
  body: CatalogItemListResultOutput;
}

export interface EnvironmentsListCatalogItemsdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists latest version of all catalog items available for a project. */
export interface EnvironmentsListCatalogItemsdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsListCatalogItemsdefaultHeaders;
}

/** Get a catalog item from a project. */
export interface EnvironmentsGetCatalogItem200Response extends HttpResponse {
  status: "200";
  body: CatalogItemOutput;
}

export interface EnvironmentsGetCatalogItemdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get a catalog item from a project. */
export interface EnvironmentsGetCatalogItemdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsGetCatalogItemdefaultHeaders;
}

/** List all versions of a catalog item from a project. */
export interface EnvironmentsListCatalogItemVersions200Response extends HttpResponse {
  status: "200";
  body: CatalogItemVersionListResultOutput;
}

export interface EnvironmentsListCatalogItemVersionsdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** List all versions of a catalog item from a project. */
export interface EnvironmentsListCatalogItemVersionsdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsListCatalogItemVersionsdefaultHeaders;
}

/** Get a specific catalog item version from a project. */
export interface EnvironmentsGetCatalogItemVersion200Response extends HttpResponse {
  status: "200";
  body: CatalogItemVersionOutput;
}

export interface EnvironmentsGetCatalogItemVersiondefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Get a specific catalog item version from a project. */
export interface EnvironmentsGetCatalogItemVersiondefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsGetCatalogItemVersiondefaultHeaders;
}

/** Lists all environment types configured for a project. */
export interface EnvironmentsListEnvironmentTypes200Response extends HttpResponse {
  status: "200";
  body: EnvironmentTypeListResultOutput;
}

export interface EnvironmentsListEnvironmentTypesdefaultHeaders {
  /** The error code for specific error that occurred. */
  "x-ms-error-code"?: string;
}

/** Lists all environment types configured for a project. */
export interface EnvironmentsListEnvironmentTypesdefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
  headers: RawHttpHeaders & EnvironmentsListEnvironmentTypesdefaultHeaders;
}
