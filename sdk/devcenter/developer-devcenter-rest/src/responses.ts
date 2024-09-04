// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  PagedProjectOutput,
  ProjectOutput,
  OperationStatusOutput,
  PagedPoolOutput,
  PoolOutput,
  PagedDevBoxOutput,
  PagedScheduleOutput,
  ScheduleOutput,
  DevBoxOutput,
  RemoteConnectionOutput,
  PagedDevBoxActionOutput,
  DevBoxActionOutput,
  PagedDevBoxActionDelayResultOutput,
  PagedEnvironmentOutput,
  EnvironmentOutput,
  PagedCatalogOutput,
  CatalogOutput,
  PagedEnvironmentDefinitionOutput,
  EnvironmentDefinitionOutput,
  PagedEnvironmentTypeOutput,
} from "./outputModels.js";

/** The request has succeeded. */
export interface ListProjects200Response extends HttpResponse {
  status: "200";
  body: PagedProjectOutput;
}

export interface ListProjectsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListProjectsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListProjectsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetProject200Response extends HttpResponse {
  status: "200";
  body: ProjectOutput;
}

export interface GetProjectDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetProjectDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetProjectDefaultHeaders;
}

/** The request has succeeded. */
export interface Get200Response extends HttpResponse {
  status: "200";
  body: OperationStatusOutput;
}

export interface GetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetDefaultHeaders;
}

/** The request has succeeded. */
export interface ListPools200Response extends HttpResponse {
  status: "200";
  body: PagedPoolOutput;
}

export interface ListPoolsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListPoolsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListPoolsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetPool200Response extends HttpResponse {
  status: "200";
  body: PoolOutput;
}

export interface GetPoolDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetPoolDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetPoolDefaultHeaders;
}

/** The request has succeeded. */
export interface ListAllDevBoxes200Response extends HttpResponse {
  status: "200";
  body: PagedDevBoxOutput;
}

export interface ListAllDevBoxesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListAllDevBoxesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListAllDevBoxesDefaultHeaders;
}

/** The request has succeeded. */
export interface ListAllDevBoxesByUser200Response extends HttpResponse {
  status: "200";
  body: PagedDevBoxOutput;
}

export interface ListAllDevBoxesByUserDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListAllDevBoxesByUserDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListAllDevBoxesByUserDefaultHeaders;
}

/** The request has succeeded. */
export interface ListSchedulesByPool200Response extends HttpResponse {
  status: "200";
  body: PagedScheduleOutput;
}

export interface ListSchedulesByPoolDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListSchedulesByPoolDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListSchedulesByPoolDefaultHeaders;
}

/** The request has succeeded. */
export interface GetScheduleByPool200Response extends HttpResponse {
  status: "200";
  body: ScheduleOutput;
}

export interface GetScheduleByPoolDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetScheduleByPoolDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetScheduleByPoolDefaultHeaders;
}

/** The request has succeeded. */
export interface ListDevBoxesByUser200Response extends HttpResponse {
  status: "200";
  body: PagedDevBoxOutput;
}

export interface ListDevBoxesByUserDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListDevBoxesByUserDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListDevBoxesByUserDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDevBoxByUser200Response extends HttpResponse {
  status: "200";
  body: DevBoxOutput;
}

export interface GetDevBoxByUserDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDevBoxByUserDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetDevBoxByUserDefaultHeaders;
}

/** The request has succeeded. */
export interface CreateDevBox200Response extends HttpResponse {
  status: "200";
  body: DevBoxOutput;
}

export interface CreateDevBox201Headers {
  location: string;
  "operation-location": string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateDevBox201Response extends HttpResponse {
  status: "201";
  body: DevBoxOutput;
  headers: RawHttpHeaders & CreateDevBox201Headers;
}

export interface CreateDevBoxDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateDevBoxDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateDevBoxDefaultHeaders;
}

/** The final response for long-running createDevBox operation */
export interface CreateDevBoxLogicalResponse extends HttpResponse {
  status: "200";
  body: DevBoxOutput;
}

export interface DeleteDevBox202Headers {
  location: string;
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DeleteDevBox202Response extends HttpResponse {
  status: "202";
  body: OperationStatusOutput;
  headers: RawHttpHeaders & DeleteDevBox202Headers;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteDevBox204Response extends HttpResponse {
  status: "204";
}

export interface DeleteDevBoxDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteDevBoxDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteDevBoxDefaultHeaders;
}

/** The final response for long-running deleteDevBox operation */
export interface DeleteDevBoxLogicalResponse extends HttpResponse {
  status: "200";
  body: OperationStatusOutput;
}

export interface StartDevBox202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface StartDevBox202Response extends HttpResponse {
  status: "202";
  body: OperationStatusOutput;
  headers: RawHttpHeaders & StartDevBox202Headers;
}

export interface StartDevBoxDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StartDevBoxDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StartDevBoxDefaultHeaders;
}

/** The final response for long-running startDevBox operation */
export interface StartDevBoxLogicalResponse extends HttpResponse {
  status: "200";
  body: OperationStatusOutput;
}

export interface StopDevBox202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface StopDevBox202Response extends HttpResponse {
  status: "202";
  body: OperationStatusOutput;
  headers: RawHttpHeaders & StopDevBox202Headers;
}

export interface StopDevBoxDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StopDevBoxDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StopDevBoxDefaultHeaders;
}

/** The final response for long-running stopDevBox operation */
export interface StopDevBoxLogicalResponse extends HttpResponse {
  status: "200";
  body: OperationStatusOutput;
}

export interface RestartDevBox202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface RestartDevBox202Response extends HttpResponse {
  status: "202";
  body: OperationStatusOutput;
  headers: RawHttpHeaders & RestartDevBox202Headers;
}

export interface RestartDevBoxDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface RestartDevBoxDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & RestartDevBoxDefaultHeaders;
}

/** The final response for long-running restartDevBox operation */
export interface RestartDevBoxLogicalResponse extends HttpResponse {
  status: "200";
  body: OperationStatusOutput;
}

/** The request has succeeded. */
export interface GetRemoteConnection200Response extends HttpResponse {
  status: "200";
  body: RemoteConnectionOutput;
}

export interface GetRemoteConnectionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetRemoteConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetRemoteConnectionDefaultHeaders;
}

/** The request has succeeded. */
export interface ListActions200Response extends HttpResponse {
  status: "200";
  body: PagedDevBoxActionOutput;
}

export interface ListActionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListActionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListActionsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAction200Response extends HttpResponse {
  status: "200";
  body: DevBoxActionOutput;
}

export interface GetActionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetActionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetActionDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface SkipAction204Response extends HttpResponse {
  status: "204";
}

export interface SkipActionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface SkipActionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & SkipActionDefaultHeaders;
}

/** The request has succeeded. */
export interface DelayAction200Response extends HttpResponse {
  status: "200";
  body: DevBoxActionOutput;
}

export interface DelayActionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DelayActionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DelayActionDefaultHeaders;
}

/** The request has succeeded. */
export interface DelayActions200Response extends HttpResponse {
  status: "200";
  body: PagedDevBoxActionDelayResultOutput;
}

export interface DelayActionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DelayActionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DelayActionsDefaultHeaders;
}

/** The request has succeeded. */
export interface ListEnvironments200Response extends HttpResponse {
  status: "200";
  body: PagedEnvironmentOutput;
}

export interface ListEnvironmentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListEnvironmentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListEnvironmentsDefaultHeaders;
}

/** The request has succeeded. */
export interface ListEnvironmentsByUser200Response extends HttpResponse {
  status: "200";
  body: PagedEnvironmentOutput;
}

export interface ListEnvironmentsByUserDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListEnvironmentsByUserDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListEnvironmentsByUserDefaultHeaders;
}

/** The request has succeeded. */
export interface GetEnvironmentByUser200Response extends HttpResponse {
  status: "200";
  body: EnvironmentOutput;
}

export interface GetEnvironmentByUserDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetEnvironmentByUserDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetEnvironmentByUserDefaultHeaders;
}

export interface CreateOrReplaceEnvironment201Headers {
  "operation-location": string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateOrReplaceEnvironment201Response extends HttpResponse {
  status: "201";
  body: EnvironmentOutput;
  headers: RawHttpHeaders & CreateOrReplaceEnvironment201Headers;
}

export interface CreateOrReplaceEnvironmentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateOrReplaceEnvironmentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateOrReplaceEnvironmentDefaultHeaders;
}

/** The final response for long-running createOrReplaceEnvironment operation */
export interface CreateOrReplaceEnvironmentLogicalResponse extends HttpResponse {
  status: "200";
  body: EnvironmentOutput;
}

export interface DeleteEnvironment202Headers {
  location: string;
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DeleteEnvironment202Response extends HttpResponse {
  status: "202";
  body: OperationStatusOutput;
  headers: RawHttpHeaders & DeleteEnvironment202Headers;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteEnvironment204Response extends HttpResponse {
  status: "204";
}

export interface DeleteEnvironmentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteEnvironmentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteEnvironmentDefaultHeaders;
}

/** The final response for long-running deleteEnvironment operation */
export interface DeleteEnvironmentLogicalResponse extends HttpResponse {
  status: "200";
  body: OperationStatusOutput;
}

/** The request has succeeded. */
export interface ListCatalogsByProject200Response extends HttpResponse {
  status: "200";
  body: PagedCatalogOutput;
}

export interface ListCatalogsByProjectDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListCatalogsByProjectDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListCatalogsByProjectDefaultHeaders;
}

/** The request has succeeded. */
export interface GetCatalog200Response extends HttpResponse {
  status: "200";
  body: CatalogOutput;
}

export interface GetCatalogDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetCatalogDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetCatalogDefaultHeaders;
}

/** The request has succeeded. */
export interface ListEnvironmentDefinitionsByProject200Response extends HttpResponse {
  status: "200";
  body: PagedEnvironmentDefinitionOutput;
}

export interface ListEnvironmentDefinitionsByProjectDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListEnvironmentDefinitionsByProjectDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListEnvironmentDefinitionsByProjectDefaultHeaders;
}

/** The request has succeeded. */
export interface ListEnvironmentDefinitionsByCatalog200Response extends HttpResponse {
  status: "200";
  body: PagedEnvironmentDefinitionOutput;
}

export interface ListEnvironmentDefinitionsByCatalogDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListEnvironmentDefinitionsByCatalogDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListEnvironmentDefinitionsByCatalogDefaultHeaders;
}

/** The request has succeeded. */
export interface GetEnvironmentDefinition200Response extends HttpResponse {
  status: "200";
  body: EnvironmentDefinitionOutput;
}

export interface GetEnvironmentDefinitionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetEnvironmentDefinitionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetEnvironmentDefinitionDefaultHeaders;
}

/** The request has succeeded. */
export interface ListEnvironmentTypes200Response extends HttpResponse {
  status: "200";
  body: PagedEnvironmentTypeOutput;
}

export interface ListEnvironmentTypesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListEnvironmentTypesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListEnvironmentTypesDefaultHeaders;
}
