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
  DevBoxesGetRemoteConnectionParameters,
  EnvironmentsListEnvironmentsParameters,
  EnvironmentsListEnvironmentsByUserParameters,
  EnvironmentsGetEnvironmentByUserParameters,
  EnvironmentsCreateOrUpdateEnvironmentParameters,
  EnvironmentsUpdateEnvironmentParameters,
  EnvironmentsDeleteEnvironmentParameters,
  EnvironmentsDeployEnvironmentActionParameters,
  EnvironmentsDeleteEnvironmentActionParameters,
  EnvironmentsCustomEnvironmentActionParameters,
  EnvironmentsListArtifactsByEnvironmentParameters,
  EnvironmentsListArtifactsByEnvironmentAndPathParameters,
  EnvironmentsListCatalogItemsParameters,
  EnvironmentsGetCatalogItemParameters,
  EnvironmentsListCatalogItemVersionsParameters,
  EnvironmentsGetCatalogItemVersionParameters,
  EnvironmentsListEnvironmentTypesParameters,
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
  DevBoxesDeleteDevBox200Response,
  DevBoxesDeleteDevBox202Response,
  DevBoxesDeleteDevBox204Response,
  DevBoxesDeleteDevBoxDefaultResponse,
  DevBoxesStartDevBox200Response,
  DevBoxesStartDevBox202Response,
  DevBoxesStartDevBoxDefaultResponse,
  DevBoxesStopDevBox200Response,
  DevBoxesStopDevBox202Response,
  DevBoxesStopDevBoxDefaultResponse,
  DevBoxesGetRemoteConnection200Response,
  DevBoxesGetRemoteConnectionDefaultResponse,
  EnvironmentsListEnvironments200Response,
  EnvironmentsListEnvironmentsDefaultResponse,
  EnvironmentsListEnvironmentsByUser200Response,
  EnvironmentsListEnvironmentsByUserDefaultResponse,
  EnvironmentsGetEnvironmentByUser200Response,
  EnvironmentsGetEnvironmentByUserDefaultResponse,
  EnvironmentsCreateOrUpdateEnvironment200Response,
  EnvironmentsCreateOrUpdateEnvironment201Response,
  EnvironmentsCreateOrUpdateEnvironmentDefaultResponse,
  EnvironmentsUpdateEnvironment200Response,
  EnvironmentsUpdateEnvironmentDefaultResponse,
  EnvironmentsDeleteEnvironment200Response,
  EnvironmentsDeleteEnvironment202Response,
  EnvironmentsDeleteEnvironment204Response,
  EnvironmentsDeleteEnvironmentDefaultResponse,
  EnvironmentsDeployEnvironmentAction200Response,
  EnvironmentsDeployEnvironmentAction202Response,
  EnvironmentsDeployEnvironmentActionDefaultResponse,
  EnvironmentsDeleteEnvironmentAction200Response,
  EnvironmentsDeleteEnvironmentAction202Response,
  EnvironmentsDeleteEnvironmentActionDefaultResponse,
  EnvironmentsCustomEnvironmentAction200Response,
  EnvironmentsCustomEnvironmentAction202Response,
  EnvironmentsCustomEnvironmentActionDefaultResponse,
  EnvironmentsListArtifactsByEnvironment200Response,
  EnvironmentsListArtifactsByEnvironmentDefaultResponse,
  EnvironmentsListArtifactsByEnvironmentAndPath200Response,
  EnvironmentsListArtifactsByEnvironmentAndPathDefaultResponse,
  EnvironmentsListCatalogItems200Response,
  EnvironmentsListCatalogItemsDefaultResponse,
  EnvironmentsGetCatalogItem200Response,
  EnvironmentsGetCatalogItemDefaultResponse,
  EnvironmentsListCatalogItemVersions200Response,
  EnvironmentsListCatalogItemVersionsDefaultResponse,
  EnvironmentsGetCatalogItemVersion200Response,
  EnvironmentsGetCatalogItemVersionDefaultResponse,
  EnvironmentsListEnvironmentTypes200Response,
  EnvironmentsListEnvironmentTypesDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface DevCenterListProjects {
  /** Lists all projects. */
  get(
    options?: DevCenterListProjectsParameters
  ): StreamableMethod<DevCenterListProjects200Response | DevCenterListProjectsDefaultResponse>;
}

export interface DevCenterGetProject {
  /** Gets a project. */
  get(
    options?: DevCenterGetProjectParameters
  ): StreamableMethod<DevCenterGetProject200Response | DevCenterGetProjectDefaultResponse>;
}

export interface DevCenterListAllDevBoxes {
  /** Lists Dev Boxes that the caller has access to in the DevCenter. */
  get(
    options?: DevCenterListAllDevBoxesParameters
  ): StreamableMethod<
    DevCenterListAllDevBoxes200Response | DevCenterListAllDevBoxesDefaultResponse
  >;
}

export interface DevCenterListAllDevBoxesByUser {
  /** Lists Dev Boxes in the Dev Center for a particular user. */
  get(
    options?: DevCenterListAllDevBoxesByUserParameters
  ): StreamableMethod<
    DevCenterListAllDevBoxesByUser200Response | DevCenterListAllDevBoxesByUserDefaultResponse
  >;
}

export interface DevBoxesListPools {
  /** Lists available pools */
  get(
    options?: DevBoxesListPoolsParameters
  ): StreamableMethod<DevBoxesListPools200Response | DevBoxesListPoolsDefaultResponse>;
}

export interface DevBoxesGetPool {
  /** Gets a pool */
  get(
    options?: DevBoxesGetPoolParameters
  ): StreamableMethod<DevBoxesGetPool200Response | DevBoxesGetPoolDefaultResponse>;
}

export interface DevBoxesListSchedulesByPool {
  /** Lists available schedules for a pool. */
  get(
    options?: DevBoxesListSchedulesByPoolParameters
  ): StreamableMethod<
    DevBoxesListSchedulesByPool200Response | DevBoxesListSchedulesByPoolDefaultResponse
  >;
}

export interface DevBoxesGetScheduleByPool {
  /** Gets a schedule. */
  get(
    options?: DevBoxesGetScheduleByPoolParameters
  ): StreamableMethod<
    DevBoxesGetScheduleByPool200Response | DevBoxesGetScheduleByPoolDefaultResponse
  >;
}

export interface DevBoxesListDevBoxesByUser {
  /** Lists Dev Boxes in the project for a particular user. */
  get(
    options?: DevBoxesListDevBoxesByUserParameters
  ): StreamableMethod<
    DevBoxesListDevBoxesByUser200Response | DevBoxesListDevBoxesByUserDefaultResponse
  >;
}

export interface DevBoxesGetDevBoxByUser {
  /** Gets a Dev Box */
  get(
    options?: DevBoxesGetDevBoxByUserParameters
  ): StreamableMethod<DevBoxesGetDevBoxByUser200Response | DevBoxesGetDevBoxByUserDefaultResponse>;
  /** Creates or updates a Dev Box. */
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
    | DevBoxesDeleteDevBox200Response
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
    | DevBoxesStartDevBox200Response
    | DevBoxesStartDevBox202Response
    | DevBoxesStartDevBoxDefaultResponse
  >;
}

export interface DevBoxesStopDevBox {
  /** Stops a Dev Box */
  post(
    options?: DevBoxesStopDevBoxParameters
  ): StreamableMethod<
    | DevBoxesStopDevBox200Response
    | DevBoxesStopDevBox202Response
    | DevBoxesStopDevBoxDefaultResponse
  >;
}

export interface DevBoxesGetRemoteConnection {
  /** Gets RDP Connection info */
  get(
    options?: DevBoxesGetRemoteConnectionParameters
  ): StreamableMethod<
    DevBoxesGetRemoteConnection200Response | DevBoxesGetRemoteConnectionDefaultResponse
  >;
}

export interface EnvironmentsListEnvironments {
  /** Lists the environments for a project. */
  get(
    options?: EnvironmentsListEnvironmentsParameters
  ): StreamableMethod<
    EnvironmentsListEnvironments200Response | EnvironmentsListEnvironmentsDefaultResponse
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
    EnvironmentsGetEnvironmentByUser200Response | EnvironmentsGetEnvironmentByUserDefaultResponse
  >;
  /** Creates or updates an environment. */
  put(
    options: EnvironmentsCreateOrUpdateEnvironmentParameters
  ): StreamableMethod<
    | EnvironmentsCreateOrUpdateEnvironment200Response
    | EnvironmentsCreateOrUpdateEnvironment201Response
    | EnvironmentsCreateOrUpdateEnvironmentDefaultResponse
  >;
  /** Partially updates an environment */
  patch(
    options: EnvironmentsUpdateEnvironmentParameters
  ): StreamableMethod<
    EnvironmentsUpdateEnvironment200Response | EnvironmentsUpdateEnvironmentDefaultResponse
  >;
  /** Deletes an environment and all it's associated resources */
  delete(
    options?: EnvironmentsDeleteEnvironmentParameters
  ): StreamableMethod<
    | EnvironmentsDeleteEnvironment200Response
    | EnvironmentsDeleteEnvironment202Response
    | EnvironmentsDeleteEnvironment204Response
    | EnvironmentsDeleteEnvironmentDefaultResponse
  >;
}

export interface EnvironmentsDeployEnvironmentAction {
  /** Executes a deploy action */
  post(
    options: EnvironmentsDeployEnvironmentActionParameters
  ): StreamableMethod<
    | EnvironmentsDeployEnvironmentAction200Response
    | EnvironmentsDeployEnvironmentAction202Response
    | EnvironmentsDeployEnvironmentActionDefaultResponse
  >;
}

export interface EnvironmentsDeleteEnvironmentAction {
  /** Executes a delete action */
  post(
    options: EnvironmentsDeleteEnvironmentActionParameters
  ): StreamableMethod<
    | EnvironmentsDeleteEnvironmentAction200Response
    | EnvironmentsDeleteEnvironmentAction202Response
    | EnvironmentsDeleteEnvironmentActionDefaultResponse
  >;
}

export interface EnvironmentsCustomEnvironmentAction {
  /** Executes a custom action */
  post(
    options: EnvironmentsCustomEnvironmentActionParameters
  ): StreamableMethod<
    | EnvironmentsCustomEnvironmentAction200Response
    | EnvironmentsCustomEnvironmentAction202Response
    | EnvironmentsCustomEnvironmentActionDefaultResponse
  >;
}

export interface EnvironmentsListArtifactsByEnvironment {
  /** Lists the artifacts for an environment */
  get(
    options?: EnvironmentsListArtifactsByEnvironmentParameters
  ): StreamableMethod<
    | EnvironmentsListArtifactsByEnvironment200Response
    | EnvironmentsListArtifactsByEnvironmentDefaultResponse
  >;
}

export interface EnvironmentsListArtifactsByEnvironmentAndPath {
  /** Lists the artifacts for an environment at a specified path, or returns the file at the path. */
  get(
    options?: EnvironmentsListArtifactsByEnvironmentAndPathParameters
  ): StreamableMethod<
    | EnvironmentsListArtifactsByEnvironmentAndPath200Response
    | EnvironmentsListArtifactsByEnvironmentAndPathDefaultResponse
  >;
}

export interface EnvironmentsListCatalogItems {
  /** Lists latest version of all catalog items available for a project. */
  get(
    options?: EnvironmentsListCatalogItemsParameters
  ): StreamableMethod<
    EnvironmentsListCatalogItems200Response | EnvironmentsListCatalogItemsDefaultResponse
  >;
}

export interface EnvironmentsGetCatalogItem {
  /** Get a catalog item from a project. */
  get(
    options?: EnvironmentsGetCatalogItemParameters
  ): StreamableMethod<
    EnvironmentsGetCatalogItem200Response | EnvironmentsGetCatalogItemDefaultResponse
  >;
}

export interface EnvironmentsListCatalogItemVersions {
  /** List all versions of a catalog item from a project. */
  get(
    options?: EnvironmentsListCatalogItemVersionsParameters
  ): StreamableMethod<
    | EnvironmentsListCatalogItemVersions200Response
    | EnvironmentsListCatalogItemVersionsDefaultResponse
  >;
}

export interface EnvironmentsGetCatalogItemVersion {
  /** Get a specific catalog item version from a project. */
  get(
    options?: EnvironmentsGetCatalogItemVersionParameters
  ): StreamableMethod<
    EnvironmentsGetCatalogItemVersion200Response | EnvironmentsGetCatalogItemVersionDefaultResponse
  >;
}

export interface EnvironmentsListEnvironmentTypes {
  /** Lists all environment types configured for a project. */
  get(
    options?: EnvironmentsListEnvironmentTypesParameters
  ): StreamableMethod<
    EnvironmentsListEnvironmentTypes200Response | EnvironmentsListEnvironmentTypesDefaultResponse
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
  (path: "/users/{userId}/devboxes", userId: string): DevCenterListAllDevBoxesByUser;
  /** Resource for '/projects/\{projectName\}/pools' has methods for the following verbs: get */
  (path: "/projects/{projectName}/pools", projectName: string): DevBoxesListPools;
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
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/remoteConnection' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/remoteConnection",
    projectName: string,
    userId: string,
    devBoxName: string
  ): DevBoxesGetRemoteConnection;
  /** Resource for '/projects/\{projectName\}/environments' has methods for the following verbs: get */
  (path: "/projects/{projectName}/environments", projectName: string): EnvironmentsListEnvironments;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/environments",
    projectName: string,
    userId: string
  ): EnvironmentsListEnvironmentsByUser;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}",
    projectName: string,
    userId: string,
    environmentName: string
  ): EnvironmentsGetEnvironmentByUser;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}:deploy' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}:deploy",
    projectName: string,
    userId: string,
    environmentName: string
  ): EnvironmentsDeployEnvironmentAction;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}:delete' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}:delete",
    projectName: string,
    userId: string,
    environmentName: string
  ): EnvironmentsDeleteEnvironmentAction;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}:custom' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}:custom",
    projectName: string,
    userId: string,
    environmentName: string
  ): EnvironmentsCustomEnvironmentAction;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}/artifacts' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}/artifacts",
    projectName: string,
    userId: string,
    environmentName: string
  ): EnvironmentsListArtifactsByEnvironment;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}/artifacts/\{artifactPath\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}/artifacts/{artifactPath}",
    projectName: string,
    userId: string,
    environmentName: string,
    artifactPath: string
  ): EnvironmentsListArtifactsByEnvironmentAndPath;
  /** Resource for '/projects/\{projectName\}/catalogItems' has methods for the following verbs: get */
  (path: "/projects/{projectName}/catalogItems", projectName: string): EnvironmentsListCatalogItems;
  /** Resource for '/projects/\{projectName\}/catalogItems/\{catalogItemId\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogItems/{catalogItemId}",
    projectName: string,
    catalogItemId: string
  ): EnvironmentsGetCatalogItem;
  /** Resource for '/projects/\{projectName\}/catalogItems/\{catalogItemId\}/versions' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogItems/{catalogItemId}/versions",
    projectName: string,
    catalogItemId: string
  ): EnvironmentsListCatalogItemVersions;
  /** Resource for '/projects/\{projectName\}/catalogItems/\{catalogItemId\}/versions/\{version\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogItems/{catalogItemId}/versions/{version}",
    projectName: string,
    catalogItemId: string,
    version: string
  ): EnvironmentsGetCatalogItemVersion;
  /** Resource for '/projects/\{projectName\}/environmentTypes' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/environmentTypes",
    projectName: string
  ): EnvironmentsListEnvironmentTypes;
}

export type AzureDevCenterClient = Client & {
  path: Routes;
};
