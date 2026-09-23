// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  abortMigration,
  commitMigration,
  executeMigration,
  prepareMigration,
  getBootDiagnosticLogs,
  reimage,
  restart,
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  NetworkVirtualAppliancesAbortMigrationOptionalParams,
  NetworkVirtualAppliancesCommitMigrationOptionalParams,
  NetworkVirtualAppliancesExecuteMigrationOptionalParams,
  NetworkVirtualAppliancesPrepareMigrationOptionalParams,
  NetworkVirtualAppliancesGetBootDiagnosticLogsOptionalParams,
  NetworkVirtualAppliancesReimageOptionalParams,
  NetworkVirtualAppliancesRestartOptionalParams,
  NetworkVirtualAppliancesListOptionalParams,
  NetworkVirtualAppliancesListByResourceGroupOptionalParams,
  NetworkVirtualAppliancesDeleteOptionalParams,
  NetworkVirtualAppliancesUpdateTagsOptionalParams,
  NetworkVirtualAppliancesCreateOrUpdateOptionalParams,
  NetworkVirtualAppliancesGetOptionalParams,
} from "./options.js";
