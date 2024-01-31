// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ListProjectsParameters,
  GetProjectParameters,
  GetProjectOperationStatusParameters,
  ListPoolsParameters,
  GetPoolParameters,
  ListSchedulesParameters,
  GetScheduleParameters,
  ListDevBoxesParameters,
  GetDevBoxParameters,
  CreateDevBoxParameters,
  DeleteDevBoxParameters,
  StartDevBoxParameters,
  StopDevBoxParameters,
  RestartDevBoxParameters,
  GetRemoteConnectionParameters,
  ListDevBoxActionsParameters,
  GetDevBoxActionParameters,
  SkipActionParameters,
  DelayActionParameters,
  DelayAllActionsParameters,
  ListAllDevBoxesParameters,
  ListAllDevBoxesByUserParameters,
  ListAllEnvironmentsParameters,
  ListEnvironmentsParameters,
  GetEnvironmentParameters,
  CreateOrUpdateEnvironmentParameters,
  DeleteEnvironmentParameters,
  ListCatalogsParameters,
  GetCatalogParameters,
  ListEnvironmentDefinitionsParameters,
  ListEnvironmentDefinitionsByCatalogParameters,
  GetEnvironmentDefinitionParameters,
  ListEnvironmentTypesParameters,
} from "./parameters";
import {
  ListProjects200Response,
  ListProjectsDefaultResponse,
  GetProject200Response,
  GetProjectDefaultResponse,
  GetProjectOperationStatus200Response,
  GetProjectOperationStatusDefaultResponse,
  ListPools200Response,
  ListPoolsDefaultResponse,
  GetPool200Response,
  GetPoolDefaultResponse,
  ListSchedules200Response,
  ListSchedulesDefaultResponse,
  GetSchedule200Response,
  GetScheduleDefaultResponse,
  ListDevBoxes200Response,
  ListDevBoxesDefaultResponse,
  GetDevBox200Response,
  GetDevBoxDefaultResponse,
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
  ListDevBoxActions200Response,
  ListDevBoxActionsDefaultResponse,
  GetDevBoxAction200Response,
  GetDevBoxActionDefaultResponse,
  SkipAction204Response,
  SkipActionDefaultResponse,
  DelayAction200Response,
  DelayActionDefaultResponse,
  DelayAllActions200Response,
  DelayAllActionsDefaultResponse,
  ListAllDevBoxes200Response,
  ListAllDevBoxesDefaultResponse,
  ListAllDevBoxesByUser200Response,
  ListAllDevBoxesByUserDefaultResponse,
  ListAllEnvironments200Response,
  ListAllEnvironmentsDefaultResponse,
  ListEnvironments200Response,
  ListEnvironmentsDefaultResponse,
  GetEnvironment200Response,
  GetEnvironmentDefaultResponse,
  CreateOrUpdateEnvironment201Response,
  CreateOrUpdateEnvironmentDefaultResponse,
  DeleteEnvironment202Response,
  DeleteEnvironment204Response,
  DeleteEnvironmentDefaultResponse,
  ListCatalogs200Response,
  ListCatalogsDefaultResponse,
  GetCatalog200Response,
  GetCatalogDefaultResponse,
  ListEnvironmentDefinitions200Response,
  ListEnvironmentDefinitionsDefaultResponse,
  ListEnvironmentDefinitionsByCatalog200Response,
  ListEnvironmentDefinitionsByCatalogDefaultResponse,
  GetEnvironmentDefinition200Response,
  GetEnvironmentDefinitionDefaultResponse,
  ListEnvironmentTypes200Response,
  ListEnvironmentTypesDefaultResponse,
} from "./responses";
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

export interface GetProjectOperationStatus {
  /** Get the status of an operation. */
  get(
    options?: GetProjectOperationStatusParameters,
  ): StreamableMethod<
    GetProjectOperationStatus200Response | GetProjectOperationStatusDefaultResponse
  >;
}

export interface ListPools {
  /** Lists available pools */
  get(
    options?: ListPoolsParameters,
  ): StreamableMethod<ListPools200Response | ListPoolsDefaultResponse>;
}

export interface GetPool {
  /** Gets a pool */
  get(options?: GetPoolParameters): StreamableMethod<GetPool200Response | GetPoolDefaultResponse>;
}

export interface ListSchedules {
  /** Lists available schedules for a pool. */
  get(
    options?: ListSchedulesParameters,
  ): StreamableMethod<ListSchedules200Response | ListSchedulesDefaultResponse>;
}

export interface GetSchedule {
  /** Gets a schedule. */
  get(
    options?: GetScheduleParameters,
  ): StreamableMethod<GetSchedule200Response | GetScheduleDefaultResponse>;
}

export interface ListDevBoxes {
  /** Lists Dev Boxes in the project for a particular user. */
  get(
    options?: ListDevBoxesParameters,
  ): StreamableMethod<ListDevBoxes200Response | ListDevBoxesDefaultResponse>;
}

export interface GetDevBox {
  /** Gets a Dev Box */
  get(
    options?: GetDevBoxParameters,
  ): StreamableMethod<GetDevBox200Response | GetDevBoxDefaultResponse>;
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
  /** Starts a Dev Box */
  post(
    options?: StartDevBoxParameters,
  ): StreamableMethod<StartDevBox202Response | StartDevBoxDefaultResponse>;
}

export interface StopDevBox {
  /** Stops a Dev Box */
  post(
    options?: StopDevBoxParameters,
  ): StreamableMethod<StopDevBox202Response | StopDevBoxDefaultResponse>;
}

export interface RestartDevBox {
  /** Restarts a Dev Box */
  post(
    options?: RestartDevBoxParameters,
  ): StreamableMethod<RestartDevBox202Response | RestartDevBoxDefaultResponse>;
}

export interface GetRemoteConnection {
  /** Gets RDP Connection info */
  get(
    options?: GetRemoteConnectionParameters,
  ): StreamableMethod<GetRemoteConnection200Response | GetRemoteConnectionDefaultResponse>;
}

export interface ListDevBoxActions {
  /** Lists actions on a Dev Box. */
  get(
    options?: ListDevBoxActionsParameters,
  ): StreamableMethod<ListDevBoxActions200Response | ListDevBoxActionsDefaultResponse>;
}

export interface GetDevBoxAction {
  /** Gets an action. */
  get(
    options?: GetDevBoxActionParameters,
  ): StreamableMethod<GetDevBoxAction200Response | GetDevBoxActionDefaultResponse>;
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

export interface DelayAllActions {
  /** Delays all actions. */
  post(
    options: DelayAllActionsParameters,
  ): StreamableMethod<DelayAllActions200Response | DelayAllActionsDefaultResponse>;
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

export interface ListAllEnvironments {
  /** Lists the environments for a project. */
  get(
    options?: ListAllEnvironmentsParameters,
  ): StreamableMethod<ListAllEnvironments200Response | ListAllEnvironmentsDefaultResponse>;
}

export interface ListEnvironments {
  /** Lists the environments for a project and user. */
  get(
    options?: ListEnvironmentsParameters,
  ): StreamableMethod<ListEnvironments200Response | ListEnvironmentsDefaultResponse>;
}

export interface GetEnvironment {
  /** Gets an environment */
  get(
    options?: GetEnvironmentParameters,
  ): StreamableMethod<GetEnvironment200Response | GetEnvironmentDefaultResponse>;
  /** Creates or updates an environment. */
  put(
    options: CreateOrUpdateEnvironmentParameters,
  ): StreamableMethod<
    CreateOrUpdateEnvironment201Response | CreateOrUpdateEnvironmentDefaultResponse
  >;
  /** Deletes an environment and all its associated resources */
  delete(
    options?: DeleteEnvironmentParameters,
  ): StreamableMethod<
    DeleteEnvironment202Response | DeleteEnvironment204Response | DeleteEnvironmentDefaultResponse
  >;
}

export interface ListCatalogs {
  /** Lists all of the catalogs available for a project. */
  get(
    options?: ListCatalogsParameters,
  ): StreamableMethod<ListCatalogs200Response | ListCatalogsDefaultResponse>;
}

export interface GetCatalog {
  /** Gets the specified catalog within the project */
  get(
    options?: GetCatalogParameters,
  ): StreamableMethod<GetCatalog200Response | GetCatalogDefaultResponse>;
}

export interface ListEnvironmentDefinitions {
  /** Lists all environment definitions available for a project. */
  get(
    options?: ListEnvironmentDefinitionsParameters,
  ): StreamableMethod<
    ListEnvironmentDefinitions200Response | ListEnvironmentDefinitionsDefaultResponse
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
  ): GetProjectOperationStatus;
  /** Resource for '/projects/\{projectName\}/pools' has methods for the following verbs: get */
  (path: "/projects/{projectName}/pools", projectName: string): ListPools;
  /** Resource for '/projects/\{projectName\}/pools/\{poolName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/pools/{poolName}",
    projectName: string,
    poolName: string,
  ): GetPool;
  /** Resource for '/projects/\{projectName\}/pools/\{poolName\}/schedules' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/pools/{poolName}/schedules",
    projectName: string,
    poolName: string,
  ): ListSchedules;
  /** Resource for '/projects/\{projectName\}/pools/\{poolName\}/schedules/\{scheduleName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/pools/{poolName}/schedules/{scheduleName}",
    projectName: string,
    poolName: string,
    scheduleName: string,
  ): GetSchedule;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes",
    projectName: string,
    userId: string,
  ): ListDevBoxes;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): GetDevBox;
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
  ): ListDevBoxActions;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/actions/\{actionName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}",
    projectName: string,
    userId: string,
    devBoxName: string,
    actionName: string,
  ): GetDevBoxAction;
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
  ): DelayAllActions;
  /** Resource for '/devboxes' has methods for the following verbs: get */
  (path: "/devboxes"): ListAllDevBoxes;
  /** Resource for '/users/\{userId\}/devboxes' has methods for the following verbs: get */
  (path: "/users/{userId}/devboxes", userId: string): ListAllDevBoxesByUser;
  /** Resource for '/projects/\{projectName\}/environments' has methods for the following verbs: get */
  (path: "/projects/{projectName}/environments", projectName: string): ListAllEnvironments;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/environments",
    projectName: string,
    userId: string,
  ): ListEnvironments;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}",
    projectName: string,
    userId: string,
    environmentName: string,
  ): GetEnvironment;
  /** Resource for '/projects/\{projectName\}/catalogs' has methods for the following verbs: get */
  (path: "/projects/{projectName}/catalogs", projectName: string): ListCatalogs;
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
  ): ListEnvironmentDefinitions;
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
