// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ListProjectsParameters,
  GetProjectParameters,
  GetParameters,
  ListPoolsParameters,
  GetPoolParameters,
  ListAllDevBoxesParameters,
  ListAllDevBoxesByUserParameters,
  ListSchedulesByPoolParameters,
  GetScheduleByPoolParameters,
  ListDevBoxesByUserParameters,
  GetDevBoxByUserParameters,
  CreateDevBoxParameters,
  DeleteDevBoxParameters,
  StartDevBoxParameters,
  StopDevBoxParameters,
  RestartDevBoxParameters,
  GetRemoteConnectionParameters,
  ListActionsParameters,
  GetActionParameters,
  SkipActionParameters,
  DelayActionParameters,
  DelayActionsParameters,
  ListEnvironmentsParameters,
  ListEnvironmentsByUserParameters,
  GetEnvironmentByUserParameters,
  CreateOrReplaceEnvironmentParameters,
  DeleteEnvironmentParameters,
  ListCatalogsByProjectParameters,
  GetCatalogParameters,
  ListEnvironmentDefinitionsByProjectParameters,
  ListEnvironmentDefinitionsByCatalogParameters,
  GetEnvironmentDefinitionParameters,
  ListEnvironmentTypesParameters,
} from "./parameters.js";
import {
  ListProjects200Response,
  ListProjectsDefaultResponse,
  GetProject200Response,
  GetProjectDefaultResponse,
  Get200Response,
  GetDefaultResponse,
  ListPools200Response,
  ListPoolsDefaultResponse,
  GetPool200Response,
  GetPoolDefaultResponse,
  ListAllDevBoxes200Response,
  ListAllDevBoxesDefaultResponse,
  ListAllDevBoxesByUser200Response,
  ListAllDevBoxesByUserDefaultResponse,
  ListSchedulesByPool200Response,
  ListSchedulesByPoolDefaultResponse,
  GetScheduleByPool200Response,
  GetScheduleByPoolDefaultResponse,
  ListDevBoxesByUser200Response,
  ListDevBoxesByUserDefaultResponse,
  GetDevBoxByUser200Response,
  GetDevBoxByUserDefaultResponse,
  CreateDevBox200Response,
  CreateDevBox201Response,
  CreateDevBoxDefaultResponse,
  DeleteDevBox202Response,
  DeleteDevBox204Response,
  DeleteDevBoxDefaultResponse,
  StartDevBox202Response,
  StartDevBoxDefaultResponse,
  StopDevBox202Response,
  StopDevBoxDefaultResponse,
  RestartDevBox202Response,
  RestartDevBoxDefaultResponse,
  GetRemoteConnection200Response,
  GetRemoteConnectionDefaultResponse,
  ListActions200Response,
  ListActionsDefaultResponse,
  GetAction200Response,
  GetActionDefaultResponse,
  SkipAction204Response,
  SkipActionDefaultResponse,
  DelayAction200Response,
  DelayActionDefaultResponse,
  DelayActions200Response,
  DelayActionsDefaultResponse,
  ListEnvironments200Response,
  ListEnvironmentsDefaultResponse,
  ListEnvironmentsByUser200Response,
  ListEnvironmentsByUserDefaultResponse,
  GetEnvironmentByUser200Response,
  GetEnvironmentByUserDefaultResponse,
  CreateOrReplaceEnvironment201Response,
  CreateOrReplaceEnvironmentDefaultResponse,
  DeleteEnvironment202Response,
  DeleteEnvironment204Response,
  DeleteEnvironmentDefaultResponse,
  ListCatalogsByProject200Response,
  ListCatalogsByProjectDefaultResponse,
  GetCatalog200Response,
  GetCatalogDefaultResponse,
  ListEnvironmentDefinitionsByProject200Response,
  ListEnvironmentDefinitionsByProjectDefaultResponse,
  ListEnvironmentDefinitionsByCatalog200Response,
  ListEnvironmentDefinitionsByCatalogDefaultResponse,
  GetEnvironmentDefinition200Response,
  GetEnvironmentDefinitionDefaultResponse,
  ListEnvironmentTypes200Response,
  ListEnvironmentTypesDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface ListProjects {
  /** Lists all projects. */
  get(
    options?: ListProjectsParameters,
  ): StreamableMethod<ListProjects200Response | ListProjectsDefaultResponse>;
}

export interface GetProject {
  /** Gets a project. */
  get(
    options?: GetProjectParameters,
  ): StreamableMethod<GetProject200Response | GetProjectDefaultResponse>;
}

export interface Get {
  /** Get the status of an operation. */
  get(options?: GetParameters): StreamableMethod<Get200Response | GetDefaultResponse>;
}

export interface ListPools {
  /** Lists available pools. */
  get(
    options?: ListPoolsParameters,
  ): StreamableMethod<ListPools200Response | ListPoolsDefaultResponse>;
}

export interface GetPool {
  /** Gets a pool. */
  get(options?: GetPoolParameters): StreamableMethod<GetPool200Response | GetPoolDefaultResponse>;
}

export interface ListAllDevBoxes {
  /** Lists Dev Boxes that the caller has access to in the DevCenter. */
  get(
    options?: ListAllDevBoxesParameters,
  ): StreamableMethod<ListAllDevBoxes200Response | ListAllDevBoxesDefaultResponse>;
}

export interface ListAllDevBoxesByUser {
  /** Lists Dev Boxes in the Dev Center for a particular user. */
  get(
    options?: ListAllDevBoxesByUserParameters,
  ): StreamableMethod<ListAllDevBoxesByUser200Response | ListAllDevBoxesByUserDefaultResponse>;
}

export interface ListSchedulesByPool {
  /** Lists all schedules within a pool that are configured by your project administrator. */
  get(
    options?: ListSchedulesByPoolParameters,
  ): StreamableMethod<ListSchedulesByPool200Response | ListSchedulesByPoolDefaultResponse>;
}

export interface GetScheduleByPool {
  /** Gets a schedule. */
  get(
    options?: GetScheduleByPoolParameters,
  ): StreamableMethod<GetScheduleByPool200Response | GetScheduleByPoolDefaultResponse>;
}

export interface ListDevBoxesByUser {
  /** Lists Dev Boxes in the project for a particular user. */
  get(
    options?: ListDevBoxesByUserParameters,
  ): StreamableMethod<ListDevBoxesByUser200Response | ListDevBoxesByUserDefaultResponse>;
}

export interface GetDevBoxByUser {
  /** Gets a Dev Box. */
  get(
    options?: GetDevBoxByUserParameters,
  ): StreamableMethod<GetDevBoxByUser200Response | GetDevBoxByUserDefaultResponse>;
  /** Creates or replaces a Dev Box. */
  put(
    options: CreateDevBoxParameters,
  ): StreamableMethod<
    CreateDevBox200Response | CreateDevBox201Response | CreateDevBoxDefaultResponse
  >;
  /** Deletes a Dev Box. */
  delete(
    options?: DeleteDevBoxParameters,
  ): StreamableMethod<
    DeleteDevBox202Response | DeleteDevBox204Response | DeleteDevBoxDefaultResponse
  >;
}

export interface StartDevBox {
  /** Starts a Dev Box. */
  post(
    options?: StartDevBoxParameters,
  ): StreamableMethod<StartDevBox202Response | StartDevBoxDefaultResponse>;
}

export interface StopDevBox {
  /** Stops a Dev Box. */
  post(
    options?: StopDevBoxParameters,
  ): StreamableMethod<StopDevBox202Response | StopDevBoxDefaultResponse>;
}

export interface RestartDevBox {
  /** Restarts a Dev Box. */
  post(
    options?: RestartDevBoxParameters,
  ): StreamableMethod<RestartDevBox202Response | RestartDevBoxDefaultResponse>;
}

export interface GetRemoteConnection {
  /** Gets RDP Connection info. */
  get(
    options?: GetRemoteConnectionParameters,
  ): StreamableMethod<GetRemoteConnection200Response | GetRemoteConnectionDefaultResponse>;
}

export interface ListActions {
  /** Lists actions on a Dev Box. */
  get(
    options?: ListActionsParameters,
  ): StreamableMethod<ListActions200Response | ListActionsDefaultResponse>;
}

export interface GetAction {
  /** Gets an action. */
  get(
    options?: GetActionParameters,
  ): StreamableMethod<GetAction200Response | GetActionDefaultResponse>;
}

export interface SkipAction {
  /** Skips an occurrence of an action. */
  post(
    options?: SkipActionParameters,
  ): StreamableMethod<SkipAction204Response | SkipActionDefaultResponse>;
}

export interface DelayAction {
  /** Delays the occurrence of an action. */
  post(
    options: DelayActionParameters,
  ): StreamableMethod<DelayAction200Response | DelayActionDefaultResponse>;
}

export interface DelayActions {
  /** Delays all actions. */
  post(
    options: DelayActionsParameters,
  ): StreamableMethod<DelayActions200Response | DelayActionsDefaultResponse>;
}

export interface ListEnvironments {
  /** Lists the environments for a project. */
  get(
    options?: ListEnvironmentsParameters,
  ): StreamableMethod<ListEnvironments200Response | ListEnvironmentsDefaultResponse>;
}

export interface ListEnvironmentsByUser {
  /** Lists the environments for a project and user. */
  get(
    options?: ListEnvironmentsByUserParameters,
  ): StreamableMethod<ListEnvironmentsByUser200Response | ListEnvironmentsByUserDefaultResponse>;
}

export interface GetEnvironmentByUser {
  /** Gets an environment. */
  get(
    options?: GetEnvironmentByUserParameters,
  ): StreamableMethod<GetEnvironmentByUser200Response | GetEnvironmentByUserDefaultResponse>;
  /** Creates or updates an environment. */
  put(
    options: CreateOrReplaceEnvironmentParameters,
  ): StreamableMethod<
    CreateOrReplaceEnvironment201Response | CreateOrReplaceEnvironmentDefaultResponse
  >;
  /** Deletes an environment and all its associated resources */
  delete(
    options?: DeleteEnvironmentParameters,
  ): StreamableMethod<
    DeleteEnvironment202Response | DeleteEnvironment204Response | DeleteEnvironmentDefaultResponse
  >;
}

export interface ListCatalogsByProject {
  /** Lists all of the catalogs available for a project. */
  get(
    options?: ListCatalogsByProjectParameters,
  ): StreamableMethod<ListCatalogsByProject200Response | ListCatalogsByProjectDefaultResponse>;
}

export interface GetCatalog {
  /** Gets the specified catalog within the project. */
  get(
    options?: GetCatalogParameters,
  ): StreamableMethod<GetCatalog200Response | GetCatalogDefaultResponse>;
}

export interface ListEnvironmentDefinitionsByProject {
  /** Lists all environment definitions available for a project. */
  get(
    options?: ListEnvironmentDefinitionsByProjectParameters,
  ): StreamableMethod<
    | ListEnvironmentDefinitionsByProject200Response
    | ListEnvironmentDefinitionsByProjectDefaultResponse
  >;
}

export interface ListEnvironmentDefinitionsByCatalog {
  /** Lists all environment definitions available within a catalog. */
  get(
    options?: ListEnvironmentDefinitionsByCatalogParameters,
  ): StreamableMethod<
    | ListEnvironmentDefinitionsByCatalog200Response
    | ListEnvironmentDefinitionsByCatalogDefaultResponse
  >;
}

export interface GetEnvironmentDefinition {
  /** Get an environment definition from a catalog. */
  get(
    options?: GetEnvironmentDefinitionParameters,
  ): StreamableMethod<
    GetEnvironmentDefinition200Response | GetEnvironmentDefinitionDefaultResponse
  >;
}

export interface ListEnvironmentTypes {
  /** Lists all environment types configured for a project. */
  get(
    options?: ListEnvironmentTypesParameters,
  ): StreamableMethod<ListEnvironmentTypes200Response | ListEnvironmentTypesDefaultResponse>;
}

export interface Routes {
  /** Resource for '/projects' has methods for the following verbs: get */
  (path: "/projects"): ListProjects;
  /** Resource for '/projects/\{projectName\}' has methods for the following verbs: get */
  (path: "/projects/{projectName}", projectName: string): GetProject;
  /** Resource for '/projects/\{projectName\}/operationstatuses/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/operationstatuses/{operationId}",
    projectName: string,
    operationId: string,
  ): Get;
  /** Resource for '/projects/\{projectName\}/pools' has methods for the following verbs: get */
  (path: "/projects/{projectName}/pools", projectName: string): ListPools;
  /** Resource for '/projects/\{projectName\}/pools/\{poolName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/pools/{poolName}",
    projectName: string,
    poolName: string,
  ): GetPool;
  /** Resource for '/devboxes' has methods for the following verbs: get */
  (path: "/devboxes"): ListAllDevBoxes;
  /** Resource for '/users/\{userId\}/devboxes' has methods for the following verbs: get */
  (path: "/users/{userId}/devboxes", userId: string): ListAllDevBoxesByUser;
  /** Resource for '/projects/\{projectName\}/pools/\{poolName\}/schedules' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/pools/{poolName}/schedules",
    projectName: string,
    poolName: string,
  ): ListSchedulesByPool;
  /** Resource for '/projects/\{projectName\}/pools/\{poolName\}/schedules/\{scheduleName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/pools/{poolName}/schedules/{scheduleName}",
    projectName: string,
    poolName: string,
    scheduleName: string,
  ): GetScheduleByPool;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes",
    projectName: string,
    userId: string,
  ): ListDevBoxesByUser;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): GetDevBoxByUser;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}:start' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:start",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): StartDevBox;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}:stop' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:stop",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): StopDevBox;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}:restart' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:restart",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): RestartDevBox;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/remoteConnection' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/remoteConnection",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): GetRemoteConnection;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/actions' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): ListActions;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/actions/\{actionName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}",
    projectName: string,
    userId: string,
    devBoxName: string,
    actionName: string,
  ): GetAction;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/actions/\{actionName\}:skip' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}:skip",
    projectName: string,
    userId: string,
    devBoxName: string,
    actionName: string,
  ): SkipAction;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/actions/\{actionName\}:delay' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}:delay",
    projectName: string,
    userId: string,
    devBoxName: string,
    actionName: string,
  ): DelayAction;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/actions:delay' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions:delay",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): DelayActions;
  /** Resource for '/projects/\{projectName\}/environments' has methods for the following verbs: get */
  (path: "/projects/{projectName}/environments", projectName: string): ListEnvironments;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/environments",
    projectName: string,
    userId: string,
  ): ListEnvironmentsByUser;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}",
    projectName: string,
    userId: string,
    environmentName: string,
  ): GetEnvironmentByUser;
  /** Resource for '/projects/\{projectName\}/catalogs' has methods for the following verbs: get */
  (path: "/projects/{projectName}/catalogs", projectName: string): ListCatalogsByProject;
  /** Resource for '/projects/\{projectName\}/catalogs/\{catalogName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogs/{catalogName}",
    projectName: string,
    catalogName: string,
  ): GetCatalog;
  /** Resource for '/projects/\{projectName\}/environmentDefinitions' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/environmentDefinitions",
    projectName: string,
  ): ListEnvironmentDefinitionsByProject;
  /** Resource for '/projects/\{projectName\}/catalogs/\{catalogName\}/environmentDefinitions' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions",
    projectName: string,
    catalogName: string,
  ): ListEnvironmentDefinitionsByCatalog;
  /** Resource for '/projects/\{projectName\}/catalogs/\{catalogName\}/environmentDefinitions/\{definitionName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions/{definitionName}",
    projectName: string,
    catalogName: string,
    definitionName: string,
  ): GetEnvironmentDefinition;
  /** Resource for '/projects/\{projectName\}/environmentTypes' has methods for the following verbs: get */
  (path: "/projects/{projectName}/environmentTypes", projectName: string): ListEnvironmentTypes;
}

export type AzureDeveloperDevCenterClient = Client & {
  path: Routes;
};
