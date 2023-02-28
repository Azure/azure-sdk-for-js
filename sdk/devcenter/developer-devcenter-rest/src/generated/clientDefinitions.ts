// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DevCenterListProjectsParameters,
  DevCenterGetProjectParameters,
  DevCenterListAllDevBoxesParameters,
  DevCenterListAllDevBoxesByUserParameters,
  DevBoxesListPoolsParameters,
  DevBoxesGetPoolParameters,
  DevBoxesListSchedulesByPoolParameters,
  DevBoxesGetScheduleByPoolParameters,
  DevBoxesListDevBoxesByUserParameters,
  DevBoxesGetDevBoxByUserParameters,
  DevBoxesCreateDevBoxParameters,
  DevBoxesDeleteDevBoxParameters,
  DevBoxesStartDevBoxParameters,
  DevBoxesStopDevBoxParameters,
  DevBoxesRestartDevBoxParameters,
  DevBoxesGetRemoteConnectionParameters,
  DevBoxesListActionsParameters,
  DevBoxesGetActionParameters,
  DevBoxesSkipActionParameters,
  DevBoxesDelayActionParameters,
  DevBoxesDelayActionsParameters,
  EnvironmentsListEnvironmentsParameters,
  EnvironmentsListEnvironmentsByUserParameters,
  EnvironmentsGetEnvironmentByUserParameters,
  EnvironmentsCreateOrReplaceEnvironmentParameters,
  EnvironmentsDeleteEnvironmentParameters,
  EnvironmentsListCatalogsByProjectParameters,
  EnvironmentsGetCatalogParameters,
  EnvironmentsListEnvironmentDefinitionsByProjectParameters,
  EnvironmentsListEnvironmentDefinitionsByCatalogParameters,
  EnvironmentsGetEnvironmentDefinitionParameters,
  EnvironmentsListEnvironmentTypesParameters
} from "./parameters";
import {
  DevCenterListProjects200Response,
  DevCenterListProjectsDefaultResponse,
  DevCenterGetProject200Response,
  DevCenterGetProjectDefaultResponse,
  DevCenterListAllDevBoxes200Response,
  DevCenterListAllDevBoxesDefaultResponse,
  DevCenterListAllDevBoxesByUser200Response,
  DevCenterListAllDevBoxesByUserDefaultResponse,
  DevBoxesListPools200Response,
  DevBoxesListPoolsDefaultResponse,
  DevBoxesGetPool200Response,
  DevBoxesGetPoolDefaultResponse,
  DevBoxesListSchedulesByPool200Response,
  DevBoxesListSchedulesByPoolDefaultResponse,
  DevBoxesGetScheduleByPool200Response,
  DevBoxesGetScheduleByPoolDefaultResponse,
  DevBoxesListDevBoxesByUser200Response,
  DevBoxesListDevBoxesByUserDefaultResponse,
  DevBoxesGetDevBoxByUser200Response,
  DevBoxesGetDevBoxByUserDefaultResponse,
  DevBoxesCreateDevBox200Response,
  DevBoxesCreateDevBox201Response,
  DevBoxesCreateDevBoxDefaultResponse,
  DevBoxesDeleteDevBox202Response,
  DevBoxesDeleteDevBox204Response,
  DevBoxesDeleteDevBoxDefaultResponse,
  DevBoxesStartDevBox202Response,
  DevBoxesStartDevBoxDefaultResponse,
  DevBoxesStopDevBox202Response,
  DevBoxesStopDevBoxDefaultResponse,
  DevBoxesRestartDevBox202Response,
  DevBoxesRestartDevBoxDefaultResponse,
  DevBoxesGetRemoteConnection200Response,
  DevBoxesGetRemoteConnectionDefaultResponse,
  DevBoxesListActions200Response,
  DevBoxesListActionsDefaultResponse,
  DevBoxesGetAction200Response,
  DevBoxesGetActionDefaultResponse,
  DevBoxesSkipAction204Response,
  DevBoxesSkipActionDefaultResponse,
  DevBoxesDelayAction200Response,
  DevBoxesDelayActionDefaultResponse,
  DevBoxesDelayActions200Response,
  DevBoxesDelayActionsDefaultResponse,
  EnvironmentsListEnvironments200Response,
  EnvironmentsListEnvironmentsDefaultResponse,
  EnvironmentsListEnvironmentsByUser200Response,
  EnvironmentsListEnvironmentsByUserDefaultResponse,
  EnvironmentsGetEnvironmentByUser200Response,
  EnvironmentsGetEnvironmentByUserDefaultResponse,
  EnvironmentsCreateOrReplaceEnvironment201Response,
  EnvironmentsCreateOrReplaceEnvironmentDefaultResponse,
  EnvironmentsDeleteEnvironment202Response,
  EnvironmentsDeleteEnvironment204Response,
  EnvironmentsDeleteEnvironmentDefaultResponse,
  EnvironmentsListCatalogsByProject200Response,
  EnvironmentsListCatalogsByProjectDefaultResponse,
  EnvironmentsGetCatalog200Response,
  EnvironmentsGetCatalogDefaultResponse,
  EnvironmentsListEnvironmentDefinitionsByProject200Response,
  EnvironmentsListEnvironmentDefinitionsByProjectDefaultResponse,
  EnvironmentsListEnvironmentDefinitionsByCatalog200Response,
  EnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse,
  EnvironmentsGetEnvironmentDefinition200Response,
  EnvironmentsGetEnvironmentDefinitionDefaultResponse,
  EnvironmentsListEnvironmentTypes200Response,
  EnvironmentsListEnvironmentTypesDefaultResponse
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface DevCenterListProjects {
  /** Lists all projects. */
  get(
    options?: DevCenterListProjectsParameters
  ): StreamableMethod<
    DevCenterListProjects200Response | DevCenterListProjectsDefaultResponse
  >;
}

export interface DevCenterGetProject {
  /** Gets a project. */
  get(
    options?: DevCenterGetProjectParameters
  ): StreamableMethod<
    DevCenterGetProject200Response | DevCenterGetProjectDefaultResponse
  >;
}

export interface DevCenterListAllDevBoxes {
  /** Lists Dev Boxes that the caller has access to in the DevCenter. */
  get(
    options?: DevCenterListAllDevBoxesParameters
  ): StreamableMethod<
    | DevCenterListAllDevBoxes200Response
    | DevCenterListAllDevBoxesDefaultResponse
  >;
}

export interface DevCenterListAllDevBoxesByUser {
  /** Lists Dev Boxes in the Dev Center for a particular user. */
  get(
    options?: DevCenterListAllDevBoxesByUserParameters
  ): StreamableMethod<
    | DevCenterListAllDevBoxesByUser200Response
    | DevCenterListAllDevBoxesByUserDefaultResponse
  >;
}

export interface DevBoxesListPools {
  /** Lists available pools */
  get(
    options?: DevBoxesListPoolsParameters
  ): StreamableMethod<
    DevBoxesListPools200Response | DevBoxesListPoolsDefaultResponse
  >;
}

export interface DevBoxesGetPool {
  /** Gets a pool */
  get(
    options?: DevBoxesGetPoolParameters
  ): StreamableMethod<
    DevBoxesGetPool200Response | DevBoxesGetPoolDefaultResponse
  >;
}

export interface DevBoxesListSchedulesByPool {
  /** Lists available schedules for a pool. */
  get(
    options?: DevBoxesListSchedulesByPoolParameters
  ): StreamableMethod<
    | DevBoxesListSchedulesByPool200Response
    | DevBoxesListSchedulesByPoolDefaultResponse
  >;
}

export interface DevBoxesGetScheduleByPool {
  /** Gets a schedule. */
  get(
    options?: DevBoxesGetScheduleByPoolParameters
  ): StreamableMethod<
    | DevBoxesGetScheduleByPool200Response
    | DevBoxesGetScheduleByPoolDefaultResponse
  >;
}

export interface DevBoxesListDevBoxesByUser {
  /** Lists Dev Boxes in the project for a particular user. */
  get(
    options?: DevBoxesListDevBoxesByUserParameters
  ): StreamableMethod<
    | DevBoxesListDevBoxesByUser200Response
    | DevBoxesListDevBoxesByUserDefaultResponse
  >;
}

export interface DevBoxesGetDevBoxByUser {
  /** Gets a Dev Box */
  get(
    options?: DevBoxesGetDevBoxByUserParameters
  ): StreamableMethod<
    DevBoxesGetDevBoxByUser200Response | DevBoxesGetDevBoxByUserDefaultResponse
  >;
  /** Creates or replaces a Dev Box. */
  put(
    options: DevBoxesCreateDevBoxParameters
  ): StreamableMethod<
    | DevBoxesCreateDevBox200Response
    | DevBoxesCreateDevBox201Response
    | DevBoxesCreateDevBoxDefaultResponse
  >;
  /** Deletes a Dev Box. */
  delete(
    options?: DevBoxesDeleteDevBoxParameters
  ): StreamableMethod<
    | DevBoxesDeleteDevBox202Response
    | DevBoxesDeleteDevBox204Response
    | DevBoxesDeleteDevBoxDefaultResponse
  >;
}

export interface DevBoxesStartDevBox {
  /** Starts a Dev Box */
  post(
    options?: DevBoxesStartDevBoxParameters
  ): StreamableMethod<
    DevBoxesStartDevBox202Response | DevBoxesStartDevBoxDefaultResponse
  >;
}

export interface DevBoxesStopDevBox {
  /** Stops a Dev Box */
  post(
    options?: DevBoxesStopDevBoxParameters
  ): StreamableMethod<
    DevBoxesStopDevBox202Response | DevBoxesStopDevBoxDefaultResponse
  >;
}

export interface DevBoxesRestartDevBox {
  /** Restarts a Dev Box */
  post(
    options?: DevBoxesRestartDevBoxParameters
  ): StreamableMethod<
    DevBoxesRestartDevBox202Response | DevBoxesRestartDevBoxDefaultResponse
  >;
}

export interface DevBoxesGetRemoteConnection {
  /** Gets RDP Connection info */
  get(
    options?: DevBoxesGetRemoteConnectionParameters
  ): StreamableMethod<
    | DevBoxesGetRemoteConnection200Response
    | DevBoxesGetRemoteConnectionDefaultResponse
  >;
}

export interface DevBoxesListActions {
  /** Lists actions on a Dev Box. */
  get(
    options?: DevBoxesListActionsParameters
  ): StreamableMethod<
    DevBoxesListActions200Response | DevBoxesListActionsDefaultResponse
  >;
}

export interface DevBoxesGetAction {
  /** Gets an action. */
  get(
    options?: DevBoxesGetActionParameters
  ): StreamableMethod<
    DevBoxesGetAction200Response | DevBoxesGetActionDefaultResponse
  >;
}

export interface DevBoxesSkipAction {
  /** Skips an occurrence of an action. */
  post(
    options?: DevBoxesSkipActionParameters
  ): StreamableMethod<
    DevBoxesSkipAction204Response | DevBoxesSkipActionDefaultResponse
  >;
}

export interface DevBoxesDelayAction {
  /** Delays the occurrence of an action. */
  post(
    options: DevBoxesDelayActionParameters
  ): StreamableMethod<
    DevBoxesDelayAction200Response | DevBoxesDelayActionDefaultResponse
  >;
}

export interface DevBoxesDelayActions {
  /** Delays all actions. */
  post(
    options: DevBoxesDelayActionsParameters
  ): StreamableMethod<
    DevBoxesDelayActions200Response | DevBoxesDelayActionsDefaultResponse
  >;
}

export interface EnvironmentsListEnvironments {
  /** Lists the environments for a project. */
  get(
    options?: EnvironmentsListEnvironmentsParameters
  ): StreamableMethod<
    | EnvironmentsListEnvironments200Response
    | EnvironmentsListEnvironmentsDefaultResponse
  >;
}

export interface EnvironmentsListEnvironmentsByUser {
  /** Lists the environments for a project and user. */
  get(
    options?: EnvironmentsListEnvironmentsByUserParameters
  ): StreamableMethod<
    | EnvironmentsListEnvironmentsByUser200Response
    | EnvironmentsListEnvironmentsByUserDefaultResponse
  >;
}

export interface EnvironmentsGetEnvironmentByUser {
  /** Gets an environment */
  get(
    options?: EnvironmentsGetEnvironmentByUserParameters
  ): StreamableMethod<
    | EnvironmentsGetEnvironmentByUser200Response
    | EnvironmentsGetEnvironmentByUserDefaultResponse
  >;
  /** Creates or updates an environment. */
  put(
    options: EnvironmentsCreateOrReplaceEnvironmentParameters
  ): StreamableMethod<
    | EnvironmentsCreateOrReplaceEnvironment201Response
    | EnvironmentsCreateOrReplaceEnvironmentDefaultResponse
  >;
  /** Deletes an environment and all its associated resources */
  delete(
    options?: EnvironmentsDeleteEnvironmentParameters
  ): StreamableMethod<
    | EnvironmentsDeleteEnvironment202Response
    | EnvironmentsDeleteEnvironment204Response
    | EnvironmentsDeleteEnvironmentDefaultResponse
  >;
}

export interface EnvironmentsListCatalogsByProject {
  /** Lists all of the catalogs available for a project. */
  get(
    options?: EnvironmentsListCatalogsByProjectParameters
  ): StreamableMethod<
    | EnvironmentsListCatalogsByProject200Response
    | EnvironmentsListCatalogsByProjectDefaultResponse
  >;
}

export interface EnvironmentsGetCatalog {
  /** Gets the specified catalog within the project */
  get(
    options?: EnvironmentsGetCatalogParameters
  ): StreamableMethod<
    EnvironmentsGetCatalog200Response | EnvironmentsGetCatalogDefaultResponse
  >;
}

export interface EnvironmentsListEnvironmentDefinitionsByProject {
  /** Lists all environment definitions available for a project. */
  get(
    options?: EnvironmentsListEnvironmentDefinitionsByProjectParameters
  ): StreamableMethod<
    | EnvironmentsListEnvironmentDefinitionsByProject200Response
    | EnvironmentsListEnvironmentDefinitionsByProjectDefaultResponse
  >;
}

export interface EnvironmentsListEnvironmentDefinitionsByCatalog {
  /** Lists all environment definitions available within a catalog. */
  get(
    options?: EnvironmentsListEnvironmentDefinitionsByCatalogParameters
  ): StreamableMethod<
    | EnvironmentsListEnvironmentDefinitionsByCatalog200Response
    | EnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse
  >;
}

export interface EnvironmentsGetEnvironmentDefinition {
  /** Get an environment definition from a catalog. */
  get(
    options?: EnvironmentsGetEnvironmentDefinitionParameters
  ): StreamableMethod<
    | EnvironmentsGetEnvironmentDefinition200Response
    | EnvironmentsGetEnvironmentDefinitionDefaultResponse
  >;
}

export interface EnvironmentsListEnvironmentTypes {
  /** Lists all environment types configured for a project. */
  get(
    options?: EnvironmentsListEnvironmentTypesParameters
  ): StreamableMethod<
    | EnvironmentsListEnvironmentTypes200Response
    | EnvironmentsListEnvironmentTypesDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/projects' has methods for the following verbs: get */
  (path: "/projects"): DevCenterListProjects;
  /** Resource for '/projects/\{projectName\}' has methods for the following verbs: get */
  (path: "/projects/{projectName}", projectName: string): DevCenterGetProject;
  /** Resource for '/devboxes' has methods for the following verbs: get */
  (path: "/devboxes"): DevCenterListAllDevBoxes;
  /** Resource for '/users/\{userId\}/devboxes' has methods for the following verbs: get */
  (
    path: "/users/{userId}/devboxes",
    userId: string
  ): DevCenterListAllDevBoxesByUser;
  /** Resource for '/projects/\{projectName\}/pools' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/pools",
    projectName: string
  ): DevBoxesListPools;
  /** Resource for '/projects/\{projectName\}/pools/\{poolName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/pools/{poolName}",
    projectName: string,
    poolName: string
  ): DevBoxesGetPool;
  /** Resource for '/projects/\{projectName\}/pools/\{poolName\}/schedules' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/pools/{poolName}/schedules",
    projectName: string,
    poolName: string
  ): DevBoxesListSchedulesByPool;
  /** Resource for '/projects/\{projectName\}/pools/\{poolName\}/schedules/\{scheduleName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/pools/{poolName}/schedules/{scheduleName}",
    projectName: string,
    poolName: string,
    scheduleName: string
  ): DevBoxesGetScheduleByPool;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes",
    projectName: string,
    userId: string
  ): DevBoxesListDevBoxesByUser;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}",
    projectName: string,
    userId: string,
    devBoxName: string
  ): DevBoxesGetDevBoxByUser;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}:start' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:start",
    projectName: string,
    userId: string,
    devBoxName: string
  ): DevBoxesStartDevBox;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}:stop' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:stop",
    projectName: string,
    userId: string,
    devBoxName: string
  ): DevBoxesStopDevBox;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}:restart' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:restart",
    projectName: string,
    userId: string,
    devBoxName: string
  ): DevBoxesRestartDevBox;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/remoteConnection' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/remoteConnection",
    projectName: string,
    userId: string,
    devBoxName: string
  ): DevBoxesGetRemoteConnection;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/actions' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions",
    projectName: string,
    userId: string,
    devBoxName: string
  ): DevBoxesListActions;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/actions/\{actionName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}",
    projectName: string,
    userId: string,
    devBoxName: string,
    actionName: string
  ): DevBoxesGetAction;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/actions/\{actionName\}:skip' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}:skip",
    projectName: string,
    userId: string,
    devBoxName: string,
    actionName: string
  ): DevBoxesSkipAction;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/actions/\{actionName\}:delay' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}:delay",
    projectName: string,
    userId: string,
    devBoxName: string,
    actionName: string
  ): DevBoxesDelayAction;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/actions:delay' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions:delay",
    projectName: string,
    userId: string,
    devBoxName: string
  ): DevBoxesDelayActions;
  /** Resource for '/projects/\{projectName\}/environments' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/environments",
    projectName: string
  ): EnvironmentsListEnvironments;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/environments",
    projectName: string,
    userId: string
  ): EnvironmentsListEnvironmentsByUser;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}",
    projectName: string,
    userId: string,
    environmentName: string
  ): EnvironmentsGetEnvironmentByUser;
  /** Resource for '/projects/\{projectName\}/catalogs' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogs",
    projectName: string
  ): EnvironmentsListCatalogsByProject;
  /** Resource for '/projects/\{projectName\}/catalogs/\{catalogName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogs/{catalogName}",
    projectName: string,
    catalogName: string
  ): EnvironmentsGetCatalog;
  /** Resource for '/projects/\{projectName\}/environmentDefinitions' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/environmentDefinitions",
    projectName: string
  ): EnvironmentsListEnvironmentDefinitionsByProject;
  /** Resource for '/projects/\{projectName\}/catalogs/\{catalogName\}/environmentDefinitions' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions",
    projectName: string,
    catalogName: string
  ): EnvironmentsListEnvironmentDefinitionsByCatalog;
  /** Resource for '/projects/\{projectName\}/catalogs/\{catalogName\}/environmentDefinitions/\{definitionName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions/{definitionName}",
    projectName: string,
    catalogName: string,
    definitionName: string
  ): EnvironmentsGetEnvironmentDefinition;
  /** Resource for '/projects/\{projectName\}/environmentTypes' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/environmentTypes",
    projectName: string
  ): EnvironmentsListEnvironmentTypes;
}

export type AzureDevCenterClient = Client & {
  path: Routes;
};
