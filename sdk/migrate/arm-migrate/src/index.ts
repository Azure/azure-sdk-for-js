// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { MigrateClient } from "./migrateClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  GenerateWavePlanRequest,
  GenerateWavePlanResponse,
  ProvisioningState,
  PlanSource,
  ArtifactProperties,
  WavePlanSummary,
  RefreshEntitiesRequest,
  RefreshEntitiesResponse,
  CreateWavesFromPlanRequest,
  WaveSelectionItem,
  CreateWavesFromPlanResponse,
  GetWavePlansRequest,
  GetWavePlansResponse,
  WavePlanListItem,
  FetchSasUriRequest,
  FetchSasUriResponse,
  ImportWavePlanRequest,
  ImportWavePlanResponse,
  Wave,
  WaveProperties,
  Arg,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  MigrationEntity,
  MigrationEntityProperties,
  Strategy,
  MigrationSpecificPropertiesBase,
  MigrationSpecificPropertiesBaseUnion,
  MigrationSpecificPropertiesInstanceType,
  ServerMigrationSpecificProperties,
  MigrationEntityGroup,
  MigrationEntityGroupProperties,
  TaskCreate,
  TaskPropertiesCreate,
  TaskScope,
  Task,
  TaskProperties,
  TaskType,
  TaskSummaryRequest,
  TaskSummaryResponse,
  TaskSummaryItem,
  TaskStatusCounts,
  TaskStatusCountMap,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownPlanSource,
  KnownCreatedByType,
  KnownStrategy,
  KnownMigrationSpecificPropertiesInstanceType,
  KnownTaskScope,
  KnownTaskType,
  KnownApiVersions,
} from "./models/index.js";
export type { MigrateClientOptionalParams } from "./api/index.js";
export type {
  MigrateProjectsImportWavePlanOptionalParams,
  MigrateProjectsFetchSasUriOptionalParams,
  MigrateProjectsGetWavePlansOptionalParams,
  MigrateProjectsCreateWavesFromPlanOptionalParams,
  MigrateProjectsRefreshEntitiesOptionalParams,
  MigrateProjectsGenerateWavePlanOptionalParams,
} from "./api/migrateProjects/index.js";
export type {
  MigrationEntitiesDeleteOptionalParams,
  MigrationEntitiesListByParentOptionalParams,
  MigrationEntitiesGetOptionalParams,
  MigrationEntitiesCreateOptionalParams,
} from "./api/migrationEntities/index.js";
export type {
  MigrationEntityGroupsDeleteOptionalParams,
  MigrationEntityGroupsListByParentOptionalParams,
  MigrationEntityGroupsGetOptionalParams,
  MigrationEntityGroupsCreateOptionalParams,
} from "./api/migrationEntityGroups/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  TasksGetSummaryOptionalParams,
  TasksDeleteOptionalParams,
  TasksListByParentOptionalParams,
  TasksGetOptionalParams,
  TasksCreateOptionalParams,
} from "./api/tasks/index.js";
export type {
  WavesRefreshOptionalParams,
  WavesDeleteOptionalParams,
  WavesListByParentOptionalParams,
  WavesGetOptionalParams,
  WavesCreateOptionalParams,
} from "./api/waves/index.js";
export type {
  MigrateProjectsOperations,
  MigrationEntitiesOperations,
  MigrationEntityGroupsOperations,
  OperationsOperations,
  TasksOperations,
  WavesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
