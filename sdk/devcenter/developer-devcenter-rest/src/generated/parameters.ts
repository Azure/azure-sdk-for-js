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

export interface DevBoxesListSchedulesQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
  /** An OData filter clause to apply to the operation. */
  filter?: string;
}

export interface DevBoxesListSchedulesQueryParam {
  queryParameters?: DevBoxesListSchedulesQueryParamProperties;
}

export type DevBoxesListSchedulesParameters = DevBoxesListSchedulesQueryParam &
  RequestParameters;
export type DevBoxesGetScheduleParameters = RequestParameters;

export interface DevBoxesListAllDevBoxesQueryParamProperties {
  /** An OData filter clause to apply to the operation. */
  filter?: string;
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface DevBoxesListAllDevBoxesQueryParam {
  queryParameters?: DevBoxesListAllDevBoxesQueryParamProperties;
}

export type DevBoxesListAllDevBoxesParameters = DevBoxesListAllDevBoxesQueryParam &
  RequestParameters;

export interface DevBoxesListAllDevBoxesByUserQueryParamProperties {
  /** An OData filter clause to apply to the operation. */
  filter?: string;
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface DevBoxesListAllDevBoxesByUserQueryParam {
  queryParameters?: DevBoxesListAllDevBoxesByUserQueryParamProperties;
}

export type DevBoxesListAllDevBoxesByUserParameters = DevBoxesListAllDevBoxesByUserQueryParam &
  RequestParameters;

export interface DevBoxesListDevBoxesQueryParamProperties {
  /** An OData filter clause to apply to the operation. */
  filter?: string;
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface DevBoxesListDevBoxesQueryParam {
  queryParameters?: DevBoxesListDevBoxesQueryParamProperties;
}

export type DevBoxesListDevBoxesParameters = DevBoxesListDevBoxesQueryParam &
  RequestParameters;
export type DevBoxesGetDevBoxParameters = RequestParameters;

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

export interface DevBoxesDelayAllActionsQueryParamProperties {
  /** The time to delay the Dev Box action or actions until. */
  until: Date | string;
}

export interface DevBoxesDelayAllActionsQueryParam {
  queryParameters: DevBoxesDelayAllActionsQueryParamProperties;
}

export type DevBoxesDelayAllActionsParameters = DevBoxesDelayAllActionsQueryParam &
  RequestParameters;

export interface DeploymentEnvironmentsListAllEnvironmentsQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface DeploymentEnvironmentsListAllEnvironmentsQueryParam {
  queryParameters?: DeploymentEnvironmentsListAllEnvironmentsQueryParamProperties;
}

export type DeploymentEnvironmentsListAllEnvironmentsParameters = DeploymentEnvironmentsListAllEnvironmentsQueryParam &
  RequestParameters;

export interface DeploymentEnvironmentsListEnvironmentsQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface DeploymentEnvironmentsListEnvironmentsQueryParam {
  queryParameters?: DeploymentEnvironmentsListEnvironmentsQueryParamProperties;
}

export type DeploymentEnvironmentsListEnvironmentsParameters = DeploymentEnvironmentsListEnvironmentsQueryParam &
  RequestParameters;
export type DeploymentEnvironmentsGetEnvironmentParameters = RequestParameters;

export interface DeploymentEnvironmentsCreateOrUpdateEnvironmentBodyParam {
  /** Represents an environment. */
  body: Environment;
}

export interface DeploymentEnvironmentsCreateOrUpdateEnvironmentMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DeploymentEnvironmentsCreateOrUpdateEnvironmentParameters = DeploymentEnvironmentsCreateOrUpdateEnvironmentMediaTypesParam &
  DeploymentEnvironmentsCreateOrUpdateEnvironmentBodyParam &
  RequestParameters;
export type DeploymentEnvironmentsDeleteEnvironmentParameters = RequestParameters;

export interface DeploymentEnvironmentsListCatalogsQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface DeploymentEnvironmentsListCatalogsQueryParam {
  queryParameters?: DeploymentEnvironmentsListCatalogsQueryParamProperties;
}

export type DeploymentEnvironmentsListCatalogsParameters = DeploymentEnvironmentsListCatalogsQueryParam &
  RequestParameters;
export type DeploymentEnvironmentsGetCatalogParameters = RequestParameters;

export interface DeploymentEnvironmentsListEnvironmentDefinitionsQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface DeploymentEnvironmentsListEnvironmentDefinitionsQueryParam {
  queryParameters?: DeploymentEnvironmentsListEnvironmentDefinitionsQueryParamProperties;
}

export type DeploymentEnvironmentsListEnvironmentDefinitionsParameters = DeploymentEnvironmentsListEnvironmentDefinitionsQueryParam &
  RequestParameters;

export interface DeploymentEnvironmentsListEnvironmentDefinitionsByCatalogQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface DeploymentEnvironmentsListEnvironmentDefinitionsByCatalogQueryParam {
  queryParameters?: DeploymentEnvironmentsListEnvironmentDefinitionsByCatalogQueryParamProperties;
}

export type DeploymentEnvironmentsListEnvironmentDefinitionsByCatalogParameters = DeploymentEnvironmentsListEnvironmentDefinitionsByCatalogQueryParam &
  RequestParameters;
export type DeploymentEnvironmentsGetEnvironmentDefinitionParameters = RequestParameters;

export interface DeploymentEnvironmentsListEnvironmentTypesQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface DeploymentEnvironmentsListEnvironmentTypesQueryParam {
  queryParameters?: DeploymentEnvironmentsListEnvironmentTypesQueryParamProperties;
}

export type DeploymentEnvironmentsListEnvironmentTypesParameters = DeploymentEnvironmentsListEnvironmentTypesQueryParam &
  RequestParameters;
