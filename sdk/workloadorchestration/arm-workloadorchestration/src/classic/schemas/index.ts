// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  removeVersion,
  createVersion,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/schemas/operations.js";
import {
  SchemasListBySubscriptionOptionalParams,
  SchemasListByResourceGroupOptionalParams,
  SchemasRemoveVersionOptionalParams,
  SchemasCreateVersionOptionalParams,
  SchemasDeleteOptionalParams,
  SchemasUpdateOptionalParams,
  SchemasCreateOrUpdateOptionalParams,
  SchemasGetOptionalParams,
} from "../../api/schemas/options.js";
import {
  Schema,
  SchemaUpdate,
  SchemaVersionWithUpdateType,
  SchemaVersion,
  VersionParameter,
  RemoveVersionResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Schemas operations. */
export interface SchemasOperations {
  /** List by subscription */
  listBySubscription: (
    options?: SchemasListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Schema>;
  /** List by specified resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SchemasListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Schema>;
  /** Remove Schema Version Resource */
  removeVersion: (
    resourceGroupName: string,
    schemaName: string,
    body: VersionParameter,
    options?: SchemasRemoveVersionOptionalParams,
  ) => Promise<RemoveVersionResponse>;
  /** Create a Schema Version Resource */
  createVersion: (
    resourceGroupName: string,
    schemaName: string,
    body: SchemaVersionWithUpdateType,
    options?: SchemasCreateVersionOptionalParams,
  ) => PollerLike<OperationState<SchemaVersion>, SchemaVersion>;
  /** Delete a Schema Resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    schemaName: string,
    options?: SchemasDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** update a Schema Resource */
  update: (
    resourceGroupName: string,
    schemaName: string,
    properties: SchemaUpdate,
    options?: SchemasUpdateOptionalParams,
  ) => Promise<Schema>;
  /** Create or update a Schema Resource */
  createOrUpdate: (
    resourceGroupName: string,
    schemaName: string,
    resource: Schema,
    options?: SchemasCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Schema>, Schema>;
  /** Get a Schema Resource */
  get: (
    resourceGroupName: string,
    schemaName: string,
    options?: SchemasGetOptionalParams,
  ) => Promise<Schema>;
}

function _getSchemas(context: WorkloadOrchestrationManagementContext) {
  return {
    listBySubscription: (options?: SchemasListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SchemasListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    removeVersion: (
      resourceGroupName: string,
      schemaName: string,
      body: VersionParameter,
      options?: SchemasRemoveVersionOptionalParams,
    ) => removeVersion(context, resourceGroupName, schemaName, body, options),
    createVersion: (
      resourceGroupName: string,
      schemaName: string,
      body: SchemaVersionWithUpdateType,
      options?: SchemasCreateVersionOptionalParams,
    ) => createVersion(context, resourceGroupName, schemaName, body, options),
    delete: (
      resourceGroupName: string,
      schemaName: string,
      options?: SchemasDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, schemaName, options),
    update: (
      resourceGroupName: string,
      schemaName: string,
      properties: SchemaUpdate,
      options?: SchemasUpdateOptionalParams,
    ) => update(context, resourceGroupName, schemaName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      schemaName: string,
      resource: Schema,
      options?: SchemasCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, schemaName, resource, options),
    get: (resourceGroupName: string, schemaName: string, options?: SchemasGetOptionalParams) =>
      get(context, resourceGroupName, schemaName, options),
  };
}

export function _getSchemasOperations(
  context: WorkloadOrchestrationManagementContext,
): SchemasOperations {
  return {
    ..._getSchemas(context),
  };
}
