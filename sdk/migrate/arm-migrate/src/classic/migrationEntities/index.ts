// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateContext } from "../../api/migrateContext.js";
import { $delete, listByParent, get, create } from "../../api/migrationEntities/operations.js";
import type {
  MigrationEntitiesDeleteOptionalParams,
  MigrationEntitiesListByParentOptionalParams,
  MigrationEntitiesGetOptionalParams,
  MigrationEntitiesCreateOptionalParams,
} from "../../api/migrationEntities/options.js";
import type { MigrationEntity } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MigrationEntities operations. */
export interface MigrationEntitiesOperations {
  /** Delete a MigrationEntity */
  delete: (
    resourceGroupName: string,
    projectName: string,
    migrationEntityName: string,
    options?: MigrationEntitiesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List MigrationEntity resources by MigrateProject */
  listByParent: (
    resourceGroupName: string,
    projectName: string,
    options?: MigrationEntitiesListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<MigrationEntity>;
  /** Get a MigrationEntity */
  get: (
    resourceGroupName: string,
    projectName: string,
    migrationEntityName: string,
    options?: MigrationEntitiesGetOptionalParams,
  ) => Promise<MigrationEntity>;
  /** Create a MigrationEntity */
  create: (
    resourceGroupName: string,
    projectName: string,
    migrationEntityName: string,
    resource: MigrationEntity,
    options?: MigrationEntitiesCreateOptionalParams,
  ) => PollerLike<OperationState<MigrationEntity>, MigrationEntity>;
}

function _getMigrationEntities(context: MigrateContext) {
  return {
    delete: (
      resourceGroupName: string,
      projectName: string,
      migrationEntityName: string,
      options?: MigrationEntitiesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, projectName, migrationEntityName, options),
    listByParent: (
      resourceGroupName: string,
      projectName: string,
      options?: MigrationEntitiesListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, projectName, options),
    get: (
      resourceGroupName: string,
      projectName: string,
      migrationEntityName: string,
      options?: MigrationEntitiesGetOptionalParams,
    ) => get(context, resourceGroupName, projectName, migrationEntityName, options),
    create: (
      resourceGroupName: string,
      projectName: string,
      migrationEntityName: string,
      resource: MigrationEntity,
      options?: MigrationEntitiesCreateOptionalParams,
    ) => create(context, resourceGroupName, projectName, migrationEntityName, resource, options),
  };
}

export function _getMigrationEntitiesOperations(
  context: MigrateContext,
): MigrationEntitiesOperations {
  return {
    ..._getMigrationEntities(context),
  };
}
