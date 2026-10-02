// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateContext } from "../../api/migrateContext.js";
import {
  importWavePlan,
  fetchSasUri,
  getWavePlans,
  createWavesFromPlan,
  refreshEntities,
  generateWavePlan,
} from "../../api/migrateProjects/operations.js";
import type {
  MigrateProjectsImportWavePlanOptionalParams,
  MigrateProjectsFetchSasUriOptionalParams,
  MigrateProjectsGetWavePlansOptionalParams,
  MigrateProjectsCreateWavesFromPlanOptionalParams,
  MigrateProjectsRefreshEntitiesOptionalParams,
  MigrateProjectsGenerateWavePlanOptionalParams,
} from "../../api/migrateProjects/options.js";
import type {
  GenerateWavePlanRequest,
  GenerateWavePlanResponse,
  RefreshEntitiesRequest,
  RefreshEntitiesResponse,
  CreateWavesFromPlanRequest,
  CreateWavesFromPlanResponse,
  GetWavePlansRequest,
  GetWavePlansResponse,
  FetchSasUriRequest,
  FetchSasUriResponse,
  ImportWavePlanRequest,
  ImportWavePlanResponse,
} from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MigrateProjects operations. */
export interface MigrateProjectsOperations {
  /** Ingest a customer-uploaded wave-plan CSV and produce the updated wave-plan artifacts. Long-running operation. */
  importWavePlan: (
    resourceGroupName: string,
    projectName: string,
    body: ImportWavePlanRequest,
    options?: MigrateProjectsImportWavePlanOptionalParams,
  ) => PollerLike<OperationState<ImportWavePlanResponse>, ImportWavePlanResponse>;
  /** Mint a write-only SAS URI for customer CSV uploads, later consumed by importWavePlan. */
  fetchSasUri: (
    resourceGroupName: string,
    projectName: string,
    body: FetchSasUriRequest,
    options?: MigrateProjectsFetchSasUriOptionalParams,
  ) => Promise<FetchSasUriResponse>;
  /** List wave plans previously generated for a given assessment, optionally scoped to a migration path. */
  getWavePlans: (
    resourceGroupName: string,
    projectName: string,
    body: GetWavePlansRequest,
    options?: MigrateProjectsGetWavePlansOptionalParams,
  ) => Promise<GetWavePlansResponse>;
  /** Create waves from a previously generated wave plan based on assessment data and selected wave names. */
  createWavesFromPlan: (
    resourceGroupName: string,
    projectName: string,
    body: CreateWavesFromPlanRequest,
    options?: MigrateProjectsCreateWavesFromPlanOptionalParams,
  ) => PollerLike<OperationState<CreateWavesFromPlanResponse>, CreateWavesFromPlanResponse>;
  /** Refresh execution status for migration entities and groups within a migrate project. This operation triggers status updates from partner migration services. */
  refreshEntities: (
    resourceGroupName: string,
    projectName: string,
    body: RefreshEntitiesRequest,
    options?: MigrateProjectsRefreshEntitiesOptionalParams,
  ) => PollerLike<OperationState<RefreshEntitiesResponse>, RefreshEntitiesResponse>;
  /** A long-running resource action. */
  generateWavePlan: (
    resourceGroupName: string,
    projectName: string,
    body: GenerateWavePlanRequest,
    options?: MigrateProjectsGenerateWavePlanOptionalParams,
  ) => PollerLike<OperationState<GenerateWavePlanResponse>, GenerateWavePlanResponse>;
}

function _getMigrateProjects(context: MigrateContext) {
  return {
    importWavePlan: (
      resourceGroupName: string,
      projectName: string,
      body: ImportWavePlanRequest,
      options?: MigrateProjectsImportWavePlanOptionalParams,
    ) => importWavePlan(context, resourceGroupName, projectName, body, options),
    fetchSasUri: (
      resourceGroupName: string,
      projectName: string,
      body: FetchSasUriRequest,
      options?: MigrateProjectsFetchSasUriOptionalParams,
    ) => fetchSasUri(context, resourceGroupName, projectName, body, options),
    getWavePlans: (
      resourceGroupName: string,
      projectName: string,
      body: GetWavePlansRequest,
      options?: MigrateProjectsGetWavePlansOptionalParams,
    ) => getWavePlans(context, resourceGroupName, projectName, body, options),
    createWavesFromPlan: (
      resourceGroupName: string,
      projectName: string,
      body: CreateWavesFromPlanRequest,
      options?: MigrateProjectsCreateWavesFromPlanOptionalParams,
    ) => createWavesFromPlan(context, resourceGroupName, projectName, body, options),
    refreshEntities: (
      resourceGroupName: string,
      projectName: string,
      body: RefreshEntitiesRequest,
      options?: MigrateProjectsRefreshEntitiesOptionalParams,
    ) => refreshEntities(context, resourceGroupName, projectName, body, options),
    generateWavePlan: (
      resourceGroupName: string,
      projectName: string,
      body: GenerateWavePlanRequest,
      options?: MigrateProjectsGenerateWavePlanOptionalParams,
    ) => generateWavePlan(context, resourceGroupName, projectName, body, options),
  };
}

export function _getMigrateProjectsOperations(context: MigrateContext): MigrateProjectsOperations {
  return {
    ..._getMigrateProjects(context),
  };
}
