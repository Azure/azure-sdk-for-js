// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  DevBox,
  Environment,
  EnvironmentUpdateProperties,
  ActionRequest
} from "./models";

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
export type DevBoxesGetRemoteConnectionParameters = RequestParameters;
export type DevBoxesListUpcomingActionsParameters = RequestParameters;
export type DevBoxesGetUpcomingActionParameters = RequestParameters;
export type DevBoxesSkipUpcomingActionParameters = RequestParameters;

export interface DevBoxesDelayUpcomingActionQueryParamProperties {
  /** The delayed action time (UTC). */
  delayUntil: Date | string;
}

export interface DevBoxesDelayUpcomingActionQueryParam {
  queryParameters: DevBoxesDelayUpcomingActionQueryParamProperties;
}

export type DevBoxesDelayUpcomingActionParameters = DevBoxesDelayUpcomingActionQueryParam &
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

export interface EnvironmentsCreateOrUpdateEnvironmentBodyParam {
  /** Represents a environment. */
  body: Environment;
}

export interface EnvironmentsCreateOrUpdateEnvironmentMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EnvironmentsCreateOrUpdateEnvironmentParameters = EnvironmentsCreateOrUpdateEnvironmentMediaTypesParam &
  EnvironmentsCreateOrUpdateEnvironmentBodyParam &
  RequestParameters;

export interface EnvironmentsUpdateEnvironmentBodyParam {
  /** Updatable environment properties. */
  body: EnvironmentUpdateProperties;
}

export interface EnvironmentsUpdateEnvironmentMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type EnvironmentsUpdateEnvironmentParameters = EnvironmentsUpdateEnvironmentMediaTypesParam &
  EnvironmentsUpdateEnvironmentBodyParam &
  RequestParameters;
export type EnvironmentsDeleteEnvironmentParameters = RequestParameters;

export interface EnvironmentsDeployEnvironmentActionBodyParam {
  /** Action properties overriding the environment's default values. */
  body: ActionRequest;
}

export interface EnvironmentsDeployEnvironmentActionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EnvironmentsDeployEnvironmentActionParameters = EnvironmentsDeployEnvironmentActionMediaTypesParam &
  EnvironmentsDeployEnvironmentActionBodyParam &
  RequestParameters;

export interface EnvironmentsCustomEnvironmentActionBodyParam {
  /** Action properties overriding the environment's default values. */
  body: ActionRequest;
}

export interface EnvironmentsCustomEnvironmentActionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EnvironmentsCustomEnvironmentActionParameters = EnvironmentsCustomEnvironmentActionMediaTypesParam &
  EnvironmentsCustomEnvironmentActionBodyParam &
  RequestParameters;

export interface EnvironmentsListCatalogItemsQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface EnvironmentsListCatalogItemsQueryParam {
  queryParameters?: EnvironmentsListCatalogItemsQueryParamProperties;
}

export type EnvironmentsListCatalogItemsParameters = EnvironmentsListCatalogItemsQueryParam &
  RequestParameters;
export type EnvironmentsGetCatalogItemParameters = RequestParameters;

export interface EnvironmentsListCatalogItemVersionsQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface EnvironmentsListCatalogItemVersionsQueryParam {
  queryParameters?: EnvironmentsListCatalogItemVersionsQueryParamProperties;
}

export type EnvironmentsListCatalogItemVersionsParameters = EnvironmentsListCatalogItemVersionsQueryParam &
  RequestParameters;
export type EnvironmentsGetCatalogItemVersionParameters = RequestParameters;

export interface EnvironmentsListEnvironmentTypesQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface EnvironmentsListEnvironmentTypesQueryParam {
  queryParameters?: EnvironmentsListEnvironmentTypesQueryParamProperties;
}

export type EnvironmentsListEnvironmentTypesParameters = EnvironmentsListEnvironmentTypesQueryParam &
  RequestParameters;
