// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DevCenterClient } from "./devCenter/devCenterClient.js";
export type {
  Project,
  Pool,
  OsType,
  HardwareProfile,
  SkuName,
  HibernateSupport,
  StorageProfile,
  OsDisk,
  ImageReference,
  LocalAdministratorStatus,
  StopOnDisconnectConfiguration,
  StopOnDisconnectStatus,
  PoolHealthStatus,
  Schedule,
  ScheduledType,
  ScheduledFrequency,
  DevBox,
  DevBoxProvisioningState,
  PowerState,
  RemoteConnection,
  DevBoxAction,
  DevBoxActionType,
  DevBoxNextAction,
  DevBoxActionDelayResult,
  DevBoxActionDelayStatus,
  Environment,
  EnvironmentProvisioningState,
  Catalog,
  EnvironmentDefinition,
  EnvironmentDefinitionParameter,
  ParameterType,
  EnvironmentType,
  EnvironmentTypeStatus,
} from "./models/index.js";
export { KnownAPIVersions } from "./models/index.js";
export type {
  DevCenterClientOptionalParams,
  GetProjectOptionalParams,
  ListProjectsOptionalParams,
} from "./devCenter/api/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
export { DevBoxesClient } from "./devBoxes/devBoxesClient.js";
export type { RestorePollerOptions } from "./devBoxes/restorePollerHelpers.js";
export { restorePoller } from "./devBoxes/restorePollerHelpers.js";
export type {
  DevBoxesClientOptionalParams,
  DelayAllActionsOptionalParams,
  DelayActionOptionalParams,
  SkipActionOptionalParams,
  GetDevBoxActionOptionalParams,
  ListDevBoxActionsOptionalParams,
  GetRemoteConnectionOptionalParams,
  RestartDevBoxOptionalParams,
  StopDevBoxOptionalParams,
  StartDevBoxOptionalParams,
  DeleteDevBoxOptionalParams,
  CreateDevBoxOptionalParams,
  GetDevBoxOptionalParams,
  ListDevBoxesOptionalParams,
  ListAllDevBoxesByUserOptionalParams,
  ListAllDevBoxesOptionalParams,
  GetScheduleOptionalParams,
  ListSchedulesOptionalParams,
  GetPoolOptionalParams,
  ListPoolsOptionalParams,
} from "./devBoxes/api/index.js";
export { DeploymentEnvironmentsClient } from "./deploymentEnvironments/deploymentEnvironmentsClient.js";
export type { RestorePollerOptions as DeploymentEnvironmentsClientRestorePollerOptions } from "./deploymentEnvironments/restorePollerHelpers.js";
export { restorePoller as DeploymentEnvironmentsClientrestorePoller } from "./deploymentEnvironments/restorePollerHelpers.js";
export type {
  DeploymentEnvironmentsClientOptionalParams,
  ListEnvironmentTypesOptionalParams,
  GetEnvironmentDefinitionOptionalParams,
  ListEnvironmentDefinitionsByCatalogOptionalParams,
  ListEnvironmentDefinitionsOptionalParams,
  GetCatalogOptionalParams,
  ListCatalogsOptionalParams,
  DeleteEnvironmentOptionalParams,
  CreateOrUpdateEnvironmentOptionalParams,
  GetEnvironmentOptionalParams,
  ListEnvironmentsOptionalParams,
  ListAllEnvironmentsOptionalParams,
} from "./deploymentEnvironments/api/index.js";
