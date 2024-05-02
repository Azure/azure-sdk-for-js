// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { DevBox, Environment } from "./models.js";

export type ListProjectsParameters = RequestParameters;
export type GetProjectParameters = RequestParameters;
export type GetParameters = RequestParameters;
export type ListPoolsParameters = RequestParameters;
export type GetPoolParameters = RequestParameters;
export type ListAllDevBoxesParameters = RequestParameters;
export type ListAllDevBoxesByUserParameters = RequestParameters;
export type ListSchedulesByPoolParameters = RequestParameters;
export type GetScheduleByPoolParameters = RequestParameters;
export type ListDevBoxesByUserParameters = RequestParameters;
export type GetDevBoxByUserParameters = RequestParameters;

export interface CreateDevBoxBodyParam {
  /** Represents the body request of a Dev Box creation. Dev Box Pool name is required. Optionally set the owner of the Dev Box as local administrator */
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
export type ListActionsParameters = RequestParameters;
export type GetActionParameters = RequestParameters;
export type SkipActionParameters = RequestParameters;

export interface DelayActionQueryParamProperties {
  /** The time to delay the Dev Box action or actions until. */
  until: Date | string;
}

export interface DelayActionQueryParam {
  queryParameters: DelayActionQueryParamProperties;
}

export type DelayActionParameters = DelayActionQueryParam & RequestParameters;

export interface DelayActionsQueryParamProperties {
  /** The time to delay the Dev Box action or actions until. */
  until: Date | string;
}

export interface DelayActionsQueryParam {
  queryParameters: DelayActionsQueryParamProperties;
}

export type DelayActionsParameters = DelayActionsQueryParam & RequestParameters;
export type ListEnvironmentsParameters = RequestParameters;
export type ListEnvironmentsByUserParameters = RequestParameters;
export type GetEnvironmentByUserParameters = RequestParameters;

export interface CreateOrReplaceEnvironmentBodyParam {
  /** Represents an environment. */
  body: Environment;
}

export type CreateOrReplaceEnvironmentParameters = CreateOrReplaceEnvironmentBodyParam &
  RequestParameters;
export type DeleteEnvironmentParameters = RequestParameters;
export type ListCatalogsByProjectParameters = RequestParameters;
export type GetCatalogParameters = RequestParameters;
export type ListEnvironmentDefinitionsByProjectParameters = RequestParameters;
export type ListEnvironmentDefinitionsByCatalogParameters = RequestParameters;
export type GetEnvironmentDefinitionParameters = RequestParameters;
export type ListEnvironmentTypesParameters = RequestParameters;
