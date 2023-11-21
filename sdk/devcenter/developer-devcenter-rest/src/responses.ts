// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  PagedProjectOutput,
  ProjectOutput,
  OperationStatusOutput,
  PagedPoolOutput,
  PoolOutput,
  PagedScheduleOutput,
  ScheduleOutput,
  PagedDevBoxOutput,
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
} from "./outputModels";

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
export interface GetProjectOperationStatus200Response extends HttpResponse {
  status: "200";
  body: OperationStatusOutput;
}

export interface GetProjectOperationStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetProjectOperationStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetProjectOperationStatusDefaultHeaders;
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
export interface ListSchedules200Response extends HttpResponse {
  status: "200";
  body: PagedScheduleOutput;
}

export interface ListSchedulesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListSchedulesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListSchedulesDefaultHeaders;
}

/** The request has succeeded. */
export interface GetSchedule200Response extends HttpResponse {
  status: "200";
  body: ScheduleOutput;
}

export interface GetScheduleDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetScheduleDefaultHeaders;
}

/** The request has succeeded. */
export interface ListDevBoxes200Response extends HttpResponse {
  status: "200";
  body: PagedDevBoxOutput;
}

export interface ListDevBoxesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListDevBoxesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListDevBoxesDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDevBox200Response extends HttpResponse {
  status: "200";
  body: DevBoxOutput;
}

export interface GetDevBoxDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDevBoxDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetDevBoxDefaultHeaders;
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

/** The final response for long-running CreateDevBox operation */
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

/** The final response for long-running DeleteDevBox operation */
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

/** The final response for long-running StartDevBox operation */
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

/** The final response for long-running StopDevBox operation */
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

/** The final response for long-running RestartDevBox operation */
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
export interface ListDevBoxActions200Response extends HttpResponse {
  status: "200";
  body: PagedDevBoxActionOutput;
}

export interface ListDevBoxActionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListDevBoxActionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListDevBoxActionsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDevBoxAction200Response extends HttpResponse {
  status: "200";
  body: DevBoxActionOutput;
}

export interface GetDevBoxActionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDevBoxActionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetDevBoxActionDefaultHeaders;
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
export interface DelayAllActions200Response extends HttpResponse {
  status: "200";
  body: PagedDevBoxActionDelayResultOutput;
}

export interface DelayAllActionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DelayAllActionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DelayAllActionsDefaultHeaders;
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
export interface ListAllEnvironments200Response extends HttpResponse {
  status: "200";
  body: PagedEnvironmentOutput;
}

export interface ListAllEnvironmentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListAllEnvironmentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListAllEnvironmentsDefaultHeaders;
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
export interface GetEnvironment200Response extends HttpResponse {
  status: "200";
  body: EnvironmentOutput;
}

export interface GetEnvironmentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetEnvironmentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetEnvironmentDefaultHeaders;
}

export interface CreateOrUpdateEnvironment201Headers {
  "operation-location": string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateOrUpdateEnvironment201Response extends HttpResponse {
  status: "201";
  body: EnvironmentOutput;
  headers: RawHttpHeaders & CreateOrUpdateEnvironment201Headers;
}

export interface CreateOrUpdateEnvironmentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateOrUpdateEnvironmentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateOrUpdateEnvironmentDefaultHeaders;
}

/** The final response for long-running CreateOrUpdateEnvironment operation */
export interface CreateOrUpdateEnvironmentLogicalResponse extends HttpResponse {
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

/** The final response for long-running DeleteEnvironment operation */
export interface DeleteEnvironmentLogicalResponse extends HttpResponse {
  status: "200";
  body: OperationStatusOutput;
}

/** The request has succeeded. */
export interface ListCatalogs200Response extends HttpResponse {
  status: "200";
  body: PagedCatalogOutput;
}

export interface ListCatalogsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListCatalogsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListCatalogsDefaultHeaders;
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
export interface ListEnvironmentDefinitions200Response extends HttpResponse {
  status: "200";
  body: PagedEnvironmentDefinitionOutput;
}

export interface ListEnvironmentDefinitionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListEnvironmentDefinitionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListEnvironmentDefinitionsDefaultHeaders;
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
