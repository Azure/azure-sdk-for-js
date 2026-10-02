// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateContext } from "../../api/migrateContext.js";
import { $delete, listByParent, get, create } from "../../api/migrationEntityGroups/operations.js";
import type {
  MigrationEntityGroupsDeleteOptionalParams,
  MigrationEntityGroupsListByParentOptionalParams,
  MigrationEntityGroupsGetOptionalParams,
  MigrationEntityGroupsCreateOptionalParams,
} from "../../api/migrationEntityGroups/options.js";
import type { MigrationEntityGroup } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MigrationEntityGroups operations. */
export interface MigrationEntityGroupsOperations {
  /** Delete a MigrationEntityGroup */
  delete: (
    resourceGroupName: string,
    projectName: string,
    migrationEntityGroupName: string,
    options?: MigrationEntityGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List MigrationEntityGroup resources by MigrateProject */
  listByParent: (
    resourceGroupName: string,
    projectName: string,
    options?: MigrationEntityGroupsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<MigrationEntityGroup>;
  /** Get a MigrationEntityGroup */
  get: (
    resourceGroupName: string,
    projectName: string,
    migrationEntityGroupName: string,
    options?: MigrationEntityGroupsGetOptionalParams,
  ) => Promise<MigrationEntityGroup>;
  /** Create a MigrationEntityGroup */
  create: (
    resourceGroupName: string,
    projectName: string,
    migrationEntityGroupName: string,
    resource: MigrationEntityGroup,
    options?: MigrationEntityGroupsCreateOptionalParams,
  ) => PollerLike<OperationState<MigrationEntityGroup>, MigrationEntityGroup>;
}

function _getMigrationEntityGroups(context: MigrateContext) {
  return {
    delete: (
      resourceGroupName: string,
      projectName: string,
      migrationEntityGroupName: string,
      options?: MigrationEntityGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, projectName, migrationEntityGroupName, options),
    listByParent: (
      resourceGroupName: string,
      projectName: string,
      options?: MigrationEntityGroupsListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, projectName, options),
    get: (
      resourceGroupName: string,
      projectName: string,
      migrationEntityGroupName: string,
      options?: MigrationEntityGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, projectName, migrationEntityGroupName, options),
    create: (
      resourceGroupName: string,
      projectName: string,
      migrationEntityGroupName: string,
      resource: MigrationEntityGroup,
      options?: MigrationEntityGroupsCreateOptionalParams,
    ) =>
      create(context, resourceGroupName, projectName, migrationEntityGroupName, resource, options),
  };
}

export function _getMigrationEntityGroupsOperations(
  context: MigrateContext,
): MigrationEntityGroupsOperations {
  return {
    ..._getMigrationEntityGroups(context),
  };
}
