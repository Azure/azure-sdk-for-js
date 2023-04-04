// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DevCenterListProjectsParameters,
  DevCenterGetProjectParameters,
  DevBoxesListPoolsParameters,
  DevBoxesGetPoolParameters,
  DevBoxesListSchedulesParameters,
  DevBoxesGetScheduleParameters,
  DevBoxesListAllDevBoxesParameters,
  DevBoxesListAllDevBoxesByUserParameters,
  DevBoxesListDevBoxesParameters,
  DevBoxesGetDevBoxParameters,
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
  DevBoxesDelayAllActionsParameters,
  DeploymentEnvironmentsListAllEnvironmentsParameters,
  DeploymentEnvironmentsListEnvironmentsParameters,
  DeploymentEnvironmentsGetEnvironmentParameters,
  DeploymentEnvironmentsCreateOrUpdateEnvironmentParameters,
  DeploymentEnvironmentsDeleteEnvironmentParameters,
  DeploymentEnvironmentsListCatalogsParameters,
  DeploymentEnvironmentsGetCatalogParameters,
  DeploymentEnvironmentsListEnvironmentDefinitionsParameters,
  DeploymentEnvironmentsListEnvironmentDefinitionsByCatalogParameters,
  DeploymentEnvironmentsGetEnvironmentDefinitionParameters,
  DeploymentEnvironmentsListEnvironmentTypesParameters
} from "./parameters";
import {
  DevCenterListProjects200Response,
  DevCenterListProjectsDefaultResponse,
  DevCenterGetProject200Response,
  DevCenterGetProjectDefaultResponse,
  DevBoxesListPools200Response,
  DevBoxesListPoolsDefaultResponse,
  DevBoxesGetPool200Response,
  DevBoxesGetPoolDefaultResponse,
  DevBoxesListSchedules200Response,
  DevBoxesListSchedulesDefaultResponse,
  DevBoxesGetSchedule200Response,
  DevBoxesGetScheduleDefaultResponse,
  DevBoxesListAllDevBoxes200Response,
  DevBoxesListAllDevBoxesDefaultResponse,
  DevBoxesListAllDevBoxesByUser200Response,
  DevBoxesListAllDevBoxesByUserDefaultResponse,
  DevBoxesListDevBoxes200Response,
  DevBoxesListDevBoxesDefaultResponse,
  DevBoxesGetDevBox200Response,
  DevBoxesGetDevBoxDefaultResponse,
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
  DevBoxesDelayAllActions200Response,
  DevBoxesDelayAllActionsDefaultResponse,
  DeploymentEnvironmentsListAllEnvironments200Response,
  DeploymentEnvironmentsListAllEnvironmentsDefaultResponse,
  DeploymentEnvironmentsListEnvironments200Response,
  DeploymentEnvironmentsListEnvironmentsDefaultResponse,
  DeploymentEnvironmentsGetEnvironment200Response,
  DeploymentEnvironmentsGetEnvironmentDefaultResponse,
  DeploymentEnvironmentsCreateOrUpdateEnvironment201Response,
  DeploymentEnvironmentsCreateOrUpdateEnvironmentDefaultResponse,
  DeploymentEnvironmentsDeleteEnvironment202Response,
  DeploymentEnvironmentsDeleteEnvironment204Response,
  DeploymentEnvironmentsDeleteEnvironmentDefaultResponse,
  DeploymentEnvironmentsListCatalogs200Response,
  DeploymentEnvironmentsListCatalogsDefaultResponse,
  DeploymentEnvironmentsGetCatalog200Response,
  DeploymentEnvironmentsGetCatalogDefaultResponse,
  DeploymentEnvironmentsListEnvironmentDefinitions200Response,
  DeploymentEnvironmentsListEnvironmentDefinitionsDefaultResponse,
  DeploymentEnvironmentsListEnvironmentDefinitionsByCatalog200Response,
  DeploymentEnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse,
  DeploymentEnvironmentsGetEnvironmentDefinition200Response,
  DeploymentEnvironmentsGetEnvironmentDefinitionDefaultResponse,
  DeploymentEnvironmentsListEnvironmentTypes200Response,
  DeploymentEnvironmentsListEnvironmentTypesDefaultResponse
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

export interface DevBoxesListSchedules {
  /** Lists available schedules for a pool. */
  get(
    options?: DevBoxesListSchedulesParameters
  ): StreamableMethod<
    DevBoxesListSchedules200Response | DevBoxesListSchedulesDefaultResponse
  >;
}

export interface DevBoxesGetSchedule {
  /** Gets a schedule. */
  get(
    options?: DevBoxesGetScheduleParameters
  ): StreamableMethod<
    DevBoxesGetSchedule200Response | DevBoxesGetScheduleDefaultResponse
  >;
}

export interface DevBoxesListAllDevBoxes {
  /** Lists Dev Boxes that the caller has access to in the DevCenter. */
  get(
    options?: DevBoxesListAllDevBoxesParameters
  ): StreamableMethod<
    DevBoxesListAllDevBoxes200Response | DevBoxesListAllDevBoxesDefaultResponse
  >;
}

export interface DevBoxesListAllDevBoxesByUser {
  /** Lists Dev Boxes in the Dev Center for a particular user. */
  get(
    options?: DevBoxesListAllDevBoxesByUserParameters
  ): StreamableMethod<
    | DevBoxesListAllDevBoxesByUser200Response
    | DevBoxesListAllDevBoxesByUserDefaultResponse
  >;
}

export interface DevBoxesListDevBoxes {
  /** Lists Dev Boxes in the project for a particular user. */
  get(
    options?: DevBoxesListDevBoxesParameters
  ): StreamableMethod<
    DevBoxesListDevBoxes200Response | DevBoxesListDevBoxesDefaultResponse
  >;
}

export interface DevBoxesGetDevBox {
  /** Gets a Dev Box */
  get(
    options?: DevBoxesGetDevBoxParameters
  ): StreamableMethod<
    DevBoxesGetDevBox200Response | DevBoxesGetDevBoxDefaultResponse
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

export interface DevBoxesDelayAllActions {
  /** Delays all actions. */
  post(
    options: DevBoxesDelayAllActionsParameters
  ): StreamableMethod<
    DevBoxesDelayAllActions200Response | DevBoxesDelayAllActionsDefaultResponse
  >;
}

export interface DeploymentEnvironmentsListAllEnvironments {
  /** Lists the environments for a project. */
  get(
    options?: DeploymentEnvironmentsListAllEnvironmentsParameters
  ): StreamableMethod<
    | DeploymentEnvironmentsListAllEnvironments200Response
    | DeploymentEnvironmentsListAllEnvironmentsDefaultResponse
  >;
}

export interface DeploymentEnvironmentsListEnvironments {
  /** Lists the environments for a project and user. */
  get(
    options?: DeploymentEnvironmentsListEnvironmentsParameters
  ): StreamableMethod<
    | DeploymentEnvironmentsListEnvironments200Response
    | DeploymentEnvironmentsListEnvironmentsDefaultResponse
  >;
}

export interface DeploymentEnvironmentsGetEnvironment {
  /** Gets an environment */
  get(
    options?: DeploymentEnvironmentsGetEnvironmentParameters
  ): StreamableMethod<
    | DeploymentEnvironmentsGetEnvironment200Response
    | DeploymentEnvironmentsGetEnvironmentDefaultResponse
  >;
  /** Creates or updates an environment. */
  put(
    options: DeploymentEnvironmentsCreateOrUpdateEnvironmentParameters
  ): StreamableMethod<
    | DeploymentEnvironmentsCreateOrUpdateEnvironment201Response
    | DeploymentEnvironmentsCreateOrUpdateEnvironmentDefaultResponse
  >;
  /** Deletes an environment and all its associated resources */
  delete(
    options?: DeploymentEnvironmentsDeleteEnvironmentParameters
  ): StreamableMethod<
    | DeploymentEnvironmentsDeleteEnvironment202Response
    | DeploymentEnvironmentsDeleteEnvironment204Response
    | DeploymentEnvironmentsDeleteEnvironmentDefaultResponse
  >;
}

export interface DeploymentEnvironmentsListCatalogs {
  /** Lists all of the catalogs available for a project. */
  get(
    options?: DeploymentEnvironmentsListCatalogsParameters
  ): StreamableMethod<
    | DeploymentEnvironmentsListCatalogs200Response
    | DeploymentEnvironmentsListCatalogsDefaultResponse
  >;
}

export interface DeploymentEnvironmentsGetCatalog {
  /** Gets the specified catalog within the project */
  get(
    options?: DeploymentEnvironmentsGetCatalogParameters
  ): StreamableMethod<
    | DeploymentEnvironmentsGetCatalog200Response
    | DeploymentEnvironmentsGetCatalogDefaultResponse
  >;
}

export interface DeploymentEnvironmentsListEnvironmentDefinitions {
  /** Lists all environment definitions available for a project. */
  get(
    options?: DeploymentEnvironmentsListEnvironmentDefinitionsParameters
  ): StreamableMethod<
    | DeploymentEnvironmentsListEnvironmentDefinitions200Response
    | DeploymentEnvironmentsListEnvironmentDefinitionsDefaultResponse
  >;
}

export interface DeploymentEnvironmentsListEnvironmentDefinitionsByCatalog {
  /** Lists all environment definitions available within a catalog. */
  get(
    options?: DeploymentEnvironmentsListEnvironmentDefinitionsByCatalogParameters
  ): StreamableMethod<
    | DeploymentEnvironmentsListEnvironmentDefinitionsByCatalog200Response
    | DeploymentEnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse
  >;
}

export interface DeploymentEnvironmentsGetEnvironmentDefinition {
  /** Get an environment definition from a catalog. */
  get(
    options?: DeploymentEnvironmentsGetEnvironmentDefinitionParameters
  ): StreamableMethod<
    | DeploymentEnvironmentsGetEnvironmentDefinition200Response
    | DeploymentEnvironmentsGetEnvironmentDefinitionDefaultResponse
  >;
}

export interface DeploymentEnvironmentsListEnvironmentTypes {
  /** Lists all environment types configured for a project. */
  get(
    options?: DeploymentEnvironmentsListEnvironmentTypesParameters
  ): StreamableMethod<
    | DeploymentEnvironmentsListEnvironmentTypes200Response
    | DeploymentEnvironmentsListEnvironmentTypesDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/projects' has methods for the following verbs: get */
  (path: "/projects"): DevCenterListProjects;
  /** Resource for '/projects/\{projectName\}' has methods for the following verbs: get */
  (path: "/projects/{projectName}", projectName: string): DevCenterGetProject;
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
  ): DevBoxesListSchedules;
  /** Resource for '/projects/\{projectName\}/pools/\{poolName\}/schedules/\{scheduleName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/pools/{poolName}/schedules/{scheduleName}",
    projectName: string,
    poolName: string,
    scheduleName: string
  ): DevBoxesGetSchedule;
  /** Resource for '/devboxes' has methods for the following verbs: get */
  (path: "/devboxes"): DevBoxesListAllDevBoxes;
  /** Resource for '/users/\{userId\}/devboxes' has methods for the following verbs: get */
  (
    path: "/users/{userId}/devboxes",
    userId: string
  ): DevBoxesListAllDevBoxesByUser;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes",
    projectName: string,
    userId: string
  ): DevBoxesListDevBoxes;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}",
    projectName: string,
    userId: string,
    devBoxName: string
  ): DevBoxesGetDevBox;
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
  ): DevBoxesDelayAllActions;
  /** Resource for '/projects/\{projectName\}/environments' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/environments",
    projectName: string
  ): DeploymentEnvironmentsListAllEnvironments;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/environments",
    projectName: string,
    userId: string
  ): DeploymentEnvironmentsListEnvironments;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}",
    projectName: string,
    userId: string,
    environmentName: string
  ): DeploymentEnvironmentsGetEnvironment;
  /** Resource for '/projects/\{projectName\}/catalogs' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogs",
    projectName: string
  ): DeploymentEnvironmentsListCatalogs;
  /** Resource for '/projects/\{projectName\}/catalogs/\{catalogName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogs/{catalogName}",
    projectName: string,
    catalogName: string
  ): DeploymentEnvironmentsGetCatalog;
  /** Resource for '/projects/\{projectName\}/environmentDefinitions' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/environmentDefinitions",
    projectName: string
  ): DeploymentEnvironmentsListEnvironmentDefinitions;
  /** Resource for '/projects/\{projectName\}/catalogs/\{catalogName\}/environmentDefinitions' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions",
    projectName: string,
    catalogName: string
  ): DeploymentEnvironmentsListEnvironmentDefinitionsByCatalog;
  /** Resource for '/projects/\{projectName\}/catalogs/\{catalogName\}/environmentDefinitions/\{definitionName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions/{definitionName}",
    projectName: string,
    catalogName: string,
    definitionName: string
  ): DeploymentEnvironmentsGetEnvironmentDefinition;
  /** Resource for '/projects/\{projectName\}/environmentTypes' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/environmentTypes",
    projectName: string
  ): DeploymentEnvironmentsListEnvironmentTypes;
}

export type AzureDevCenterClient = Client & {
  path: Routes;
};
