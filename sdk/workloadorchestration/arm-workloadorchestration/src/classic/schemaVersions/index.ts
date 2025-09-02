// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  listBySchema,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/schemaVersions/operations.js";
import {
  SchemaVersionsListBySchemaOptionalParams,
  SchemaVersionsDeleteOptionalParams,
  SchemaVersionsUpdateOptionalParams,
  SchemaVersionsCreateOrUpdateOptionalParams,
  SchemaVersionsGetOptionalParams,
} from "../../api/schemaVersions/options.js";
import { SchemaVersion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SchemaVersions operations. */
export interface SchemaVersionsOperations {
  /** List by specified resource group */
  listBySchema: (
    resourceGroupName: string,
    schemaName: string,
    options?: SchemaVersionsListBySchemaOptionalParams,
  ) => PagedAsyncIterableIterator<SchemaVersion>;
  /** Delete a Schema Version Resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    schemaName: string,
    schemaVersionName: string,
    options?: SchemaVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** update a Schema Version Resource */
  update: (
    resourceGroupName: string,
    schemaName: string,
    schemaVersionName: string,
    properties: SchemaVersion,
    options?: SchemaVersionsUpdateOptionalParams,
  ) => Promise<SchemaVersion>;
  /** Create or update a Schema Version Resource */
  createOrUpdate: (
    resourceGroupName: string,
    schemaName: string,
    schemaVersionName: string,
    resource: SchemaVersion,
    options?: SchemaVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SchemaVersion>, SchemaVersion>;
  /** Get a Schema Version Resource */
  get: (
    resourceGroupName: string,
    schemaName: string,
    schemaVersionName: string,
    options?: SchemaVersionsGetOptionalParams,
  ) => Promise<SchemaVersion>;
}

function _getSchemaVersions(context: WorkloadOrchestrationManagementContext) {
  return {
    listBySchema: (
      resourceGroupName: string,
      schemaName: string,
      options?: SchemaVersionsListBySchemaOptionalParams,
    ) => listBySchema(context, resourceGroupName, schemaName, options),
    delete: (
      resourceGroupName: string,
      schemaName: string,
      schemaVersionName: string,
      options?: SchemaVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, schemaName, schemaVersionName, options),
    update: (
      resourceGroupName: string,
      schemaName: string,
      schemaVersionName: string,
      properties: SchemaVersion,
      options?: SchemaVersionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, schemaName, schemaVersionName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      schemaName: string,
      schemaVersionName: string,
      resource: SchemaVersion,
      options?: SchemaVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, schemaName, schemaVersionName, resource, options),
    get: (
      resourceGroupName: string,
      schemaName: string,
      schemaVersionName: string,
      options?: SchemaVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, schemaName, schemaVersionName, options),
  };
}

export function _getSchemaVersionsOperations(
  context: WorkloadOrchestrationManagementContext,
): SchemaVersionsOperations {
  return {
    ..._getSchemaVersions(context),
  };
}
