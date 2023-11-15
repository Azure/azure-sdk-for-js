// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { DevBox, Environment } from "./models";

export interface ListProjectsQueryParamProperties {
  /** An OData filter clause to apply to the operation. */
  filter?: string;
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface ListProjectsQueryParam {
  queryParameters?: ListProjectsQueryParamProperties;
}

export type ListProjectsParameters = ListProjectsQueryParam & RequestParameters;
export type GetProjectParameters = RequestParameters;
export type GetProjectOperationStatusParameters = RequestParameters;

export interface ListPoolsQueryParamProperties {
  /** An OData filter clause to apply to the operation. */
  filter?: string;
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface ListPoolsQueryParam {
  queryParameters?: ListPoolsQueryParamProperties;
}

export type ListPoolsParameters = ListPoolsQueryParam & RequestParameters;
export type GetPoolParameters = RequestParameters;

export interface ListSchedulesQueryParamProperties {
  /** An OData filter clause to apply to the operation. */
  filter?: string;
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface ListSchedulesQueryParam {
  queryParameters?: ListSchedulesQueryParamProperties;
}

export type ListSchedulesParameters = ListSchedulesQueryParam &
  RequestParameters;
export type GetScheduleParameters = RequestParameters;

export interface ListDevBoxesQueryParamProperties {
  /** An OData filter clause to apply to the operation. */
  filter?: string;
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface ListDevBoxesQueryParam {
  queryParameters?: ListDevBoxesQueryParamProperties;
}

export type ListDevBoxesParameters = ListDevBoxesQueryParam & RequestParameters;
export type GetDevBoxParameters = RequestParameters;

export interface CreateDevBoxBodyParam {
  /** Represents a environment. */
  body: DevBox;
}

export type CreateDevBoxParameters = CreateDevBoxBodyParam & RequestParameters;
export type DeleteDevBoxParameters = RequestParameters;
export type StartDevBoxParameters = RequestParameters;

export interface StopDevBoxQueryParamProperties {
  /** Optional parameter to hibernate the dev box. */
  hibernate?: boolean;
}

export interface StopDevBoxQueryParam {
  queryParameters?: StopDevBoxQueryParamProperties;
}

export type StopDevBoxParameters = StopDevBoxQueryParam & RequestParameters;
export type RestartDevBoxParameters = RequestParameters;
export type GetRemoteConnectionParameters = RequestParameters;
export type ListDevBoxActionsParameters = RequestParameters;
export type GetDevBoxActionParameters = RequestParameters;
export type SkipActionParameters = RequestParameters;

export interface DelayActionQueryParamProperties {
  /** The time to delay the Dev Box action or actions until. */
  until: Date | string;
}

export interface DelayActionQueryParam {
  queryParameters: DelayActionQueryParamProperties;
}

export type DelayActionParameters = DelayActionQueryParam & RequestParameters;

export interface DelayAllActionsQueryParamProperties {
  /** The time to delay the Dev Box action or actions until. */
  until: Date | string;
}

export interface DelayAllActionsQueryParam {
  queryParameters: DelayAllActionsQueryParamProperties;
}

export type DelayAllActionsParameters = DelayAllActionsQueryParam &
  RequestParameters;

export interface ListAllDevBoxesQueryParamProperties {
  /** An OData filter clause to apply to the operation. */
  filter?: string;
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface ListAllDevBoxesQueryParam {
  queryParameters?: ListAllDevBoxesQueryParamProperties;
}

export type ListAllDevBoxesParameters = ListAllDevBoxesQueryParam &
  RequestParameters;

export interface ListAllDevBoxesByUserQueryParamProperties {
  /** An OData filter clause to apply to the operation. */
  filter?: string;
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface ListAllDevBoxesByUserQueryParam {
  queryParameters?: ListAllDevBoxesByUserQueryParamProperties;
}

export type ListAllDevBoxesByUserParameters = ListAllDevBoxesByUserQueryParam &
  RequestParameters;

export interface ListAllEnvironmentsQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface ListAllEnvironmentsQueryParam {
  queryParameters?: ListAllEnvironmentsQueryParamProperties;
}

export type ListAllEnvironmentsParameters = ListAllEnvironmentsQueryParam &
  RequestParameters;

export interface ListEnvironmentsQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface ListEnvironmentsQueryParam {
  queryParameters?: ListEnvironmentsQueryParamProperties;
}

export type ListEnvironmentsParameters = ListEnvironmentsQueryParam &
  RequestParameters;
export type GetEnvironmentParameters = RequestParameters;

export interface CreateOrUpdateEnvironmentBodyParam {
  /** Represents an environment. */
  body: Environment;
}

export type CreateOrUpdateEnvironmentParameters =
  CreateOrUpdateEnvironmentBodyParam & RequestParameters;
export type DeleteEnvironmentParameters = RequestParameters;

export interface ListCatalogsQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface ListCatalogsQueryParam {
  queryParameters?: ListCatalogsQueryParamProperties;
}

export type ListCatalogsParameters = ListCatalogsQueryParam & RequestParameters;
export type GetCatalogParameters = RequestParameters;

export interface ListEnvironmentDefinitionsQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface ListEnvironmentDefinitionsQueryParam {
  queryParameters?: ListEnvironmentDefinitionsQueryParamProperties;
}

export type ListEnvironmentDefinitionsParameters =
  ListEnvironmentDefinitionsQueryParam & RequestParameters;

export interface ListEnvironmentDefinitionsByCatalogQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface ListEnvironmentDefinitionsByCatalogQueryParam {
  queryParameters?: ListEnvironmentDefinitionsByCatalogQueryParamProperties;
}

export type ListEnvironmentDefinitionsByCatalogParameters =
  ListEnvironmentDefinitionsByCatalogQueryParam & RequestParameters;
export type GetEnvironmentDefinitionParameters = RequestParameters;

export interface ListEnvironmentTypesQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface ListEnvironmentTypesQueryParam {
  queryParameters?: ListEnvironmentTypesQueryParamProperties;
}

export type ListEnvironmentTypesParameters = ListEnvironmentTypesQueryParam &
  RequestParameters;
