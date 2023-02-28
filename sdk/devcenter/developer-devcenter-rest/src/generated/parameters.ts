// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { DevBox, Environment } from "./models";

export interface DevCenterListProjectsQueryParamProperties {
  /** An OData filter clause to apply to the operation. */
  filter?: string;
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface DevCenterListProjectsQueryParam {
  queryParameters?: DevCenterListProjectsQueryParamProperties;
}

export type DevCenterListProjectsParameters = DevCenterListProjectsQueryParam &
  RequestParameters;
export type DevCenterGetProjectParameters = RequestParameters;

export interface DevCenterListAllDevBoxesQueryParamProperties {
  /** An OData filter clause to apply to the operation. */
  filter?: string;
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface DevCenterListAllDevBoxesQueryParam {
  queryParameters?: DevCenterListAllDevBoxesQueryParamProperties;
}

export type DevCenterListAllDevBoxesParameters = DevCenterListAllDevBoxesQueryParam &
  RequestParameters;

export interface DevCenterListAllDevBoxesByUserQueryParamProperties {
  /** An OData filter clause to apply to the operation. */
  filter?: string;
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface DevCenterListAllDevBoxesByUserQueryParam {
  queryParameters?: DevCenterListAllDevBoxesByUserQueryParamProperties;
}

export type DevCenterListAllDevBoxesByUserParameters = DevCenterListAllDevBoxesByUserQueryParam &
  RequestParameters;

export interface DevBoxesListPoolsQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
  /** An OData filter clause to apply to the operation. */
  filter?: string;
}

export interface DevBoxesListPoolsQueryParam {
  queryParameters?: DevBoxesListPoolsQueryParamProperties;
}

export type DevBoxesListPoolsParameters = DevBoxesListPoolsQueryParam &
  RequestParameters;
export type DevBoxesGetPoolParameters = RequestParameters;

export interface DevBoxesListSchedulesByPoolQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
  /** An OData filter clause to apply to the operation. */
  filter?: string;
}

export interface DevBoxesListSchedulesByPoolQueryParam {
  queryParameters?: DevBoxesListSchedulesByPoolQueryParamProperties;
}

export type DevBoxesListSchedulesByPoolParameters = DevBoxesListSchedulesByPoolQueryParam &
  RequestParameters;
export type DevBoxesGetScheduleByPoolParameters = RequestParameters;

export interface DevBoxesListDevBoxesByUserQueryParamProperties {
  /** An OData filter clause to apply to the operation. */
  filter?: string;
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface DevBoxesListDevBoxesByUserQueryParam {
  queryParameters?: DevBoxesListDevBoxesByUserQueryParamProperties;
}

export type DevBoxesListDevBoxesByUserParameters = DevBoxesListDevBoxesByUserQueryParam &
  RequestParameters;
export type DevBoxesGetDevBoxByUserParameters = RequestParameters;

export interface DevBoxesCreateDevBoxBodyParam {
  /** Represents a environment. */
  body: DevBox;
}

export interface DevBoxesCreateDevBoxMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DevBoxesCreateDevBoxParameters = DevBoxesCreateDevBoxMediaTypesParam &
  DevBoxesCreateDevBoxBodyParam &
  RequestParameters;
export type DevBoxesDeleteDevBoxParameters = RequestParameters;
export type DevBoxesStartDevBoxParameters = RequestParameters;

export interface DevBoxesStopDevBoxQueryParamProperties {
  /** Optional parameter to hibernate the dev box. */
  hibernate?: boolean;
}

export interface DevBoxesStopDevBoxQueryParam {
  queryParameters?: DevBoxesStopDevBoxQueryParamProperties;
}

export type DevBoxesStopDevBoxParameters = DevBoxesStopDevBoxQueryParam &
  RequestParameters;
export type DevBoxesRestartDevBoxParameters = RequestParameters;
export type DevBoxesGetRemoteConnectionParameters = RequestParameters;
export type DevBoxesListActionsParameters = RequestParameters;
export type DevBoxesGetActionParameters = RequestParameters;
export type DevBoxesSkipActionParameters = RequestParameters;

export interface DevBoxesDelayActionQueryParamProperties {
  /** The time to delay the Dev Box action or actions until. */
  until: Date | string;
}

export interface DevBoxesDelayActionQueryParam {
  queryParameters: DevBoxesDelayActionQueryParamProperties;
}

export type DevBoxesDelayActionParameters = DevBoxesDelayActionQueryParam &
  RequestParameters;

export interface DevBoxesDelayActionsQueryParamProperties {
  /** The time to delay the Dev Box action or actions until. */
  until: Date | string;
}

export interface DevBoxesDelayActionsQueryParam {
  queryParameters: DevBoxesDelayActionsQueryParamProperties;
}

export type DevBoxesDelayActionsParameters = DevBoxesDelayActionsQueryParam &
  RequestParameters;

export interface EnvironmentsListEnvironmentsQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface EnvironmentsListEnvironmentsQueryParam {
  queryParameters?: EnvironmentsListEnvironmentsQueryParamProperties;
}

export type EnvironmentsListEnvironmentsParameters = EnvironmentsListEnvironmentsQueryParam &
  RequestParameters;

export interface EnvironmentsListEnvironmentsByUserQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface EnvironmentsListEnvironmentsByUserQueryParam {
  queryParameters?: EnvironmentsListEnvironmentsByUserQueryParamProperties;
}

export type EnvironmentsListEnvironmentsByUserParameters = EnvironmentsListEnvironmentsByUserQueryParam &
  RequestParameters;
export type EnvironmentsGetEnvironmentByUserParameters = RequestParameters;

export interface EnvironmentsCreateOrReplaceEnvironmentBodyParam {
  /** Represents an environment. */
  body: Environment;
}

export interface EnvironmentsCreateOrReplaceEnvironmentMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EnvironmentsCreateOrReplaceEnvironmentParameters = EnvironmentsCreateOrReplaceEnvironmentMediaTypesParam &
  EnvironmentsCreateOrReplaceEnvironmentBodyParam &
  RequestParameters;
export type EnvironmentsDeleteEnvironmentParameters = RequestParameters;

export interface EnvironmentsListCatalogsByProjectQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface EnvironmentsListCatalogsByProjectQueryParam {
  queryParameters?: EnvironmentsListCatalogsByProjectQueryParamProperties;
}

export type EnvironmentsListCatalogsByProjectParameters = EnvironmentsListCatalogsByProjectQueryParam &
  RequestParameters;
export type EnvironmentsGetCatalogParameters = RequestParameters;

export interface EnvironmentsListEnvironmentDefinitionsByProjectQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface EnvironmentsListEnvironmentDefinitionsByProjectQueryParam {
  queryParameters?: EnvironmentsListEnvironmentDefinitionsByProjectQueryParamProperties;
}

export type EnvironmentsListEnvironmentDefinitionsByProjectParameters = EnvironmentsListEnvironmentDefinitionsByProjectQueryParam &
  RequestParameters;

export interface EnvironmentsListEnvironmentDefinitionsByCatalogQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface EnvironmentsListEnvironmentDefinitionsByCatalogQueryParam {
  queryParameters?: EnvironmentsListEnvironmentDefinitionsByCatalogQueryParamProperties;
}

export type EnvironmentsListEnvironmentDefinitionsByCatalogParameters = EnvironmentsListEnvironmentDefinitionsByCatalogQueryParam &
  RequestParameters;
export type EnvironmentsGetEnvironmentDefinitionParameters = RequestParameters;

export interface EnvironmentsListEnvironmentTypesQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface EnvironmentsListEnvironmentTypesQueryParam {
  queryParameters?: EnvironmentsListEnvironmentTypesQueryParamProperties;
}

export type EnvironmentsListEnvironmentTypesParameters = EnvironmentsListEnvironmentTypesQueryParam &
  RequestParameters;
