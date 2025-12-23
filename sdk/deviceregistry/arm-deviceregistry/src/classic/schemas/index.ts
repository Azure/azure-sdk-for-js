// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  listBySchemaRegistry,
  $delete,
  createOrReplace,
  get,
} from "../../api/schemas/operations.js";
import type {
  SchemasListBySchemaRegistryOptionalParams,
  SchemasDeleteOptionalParams,
  SchemasCreateOrReplaceOptionalParams,
  SchemasGetOptionalParams,
} from "../../api/schemas/options.js";
import type { Schema } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Schemas operations. */
export interface SchemasOperations {
  /** List Schema resources by SchemaRegistry */
  listBySchemaRegistry: (
    resourceGroupName: string,
    schemaRegistryName: string,
    options?: SchemasListBySchemaRegistryOptionalParams,
  ) => PagedAsyncIterableIterator<Schema>;
  /** Delete a Schema */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    schemaRegistryName: string,
    schemaName: string,
    options?: SchemasDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a Schema */
  createOrReplace: (
    resourceGroupName: string,
    schemaRegistryName: string,
    schemaName: string,
    resource: Schema,
    options?: SchemasCreateOrReplaceOptionalParams,
  ) => Promise<Schema>;
  /** Get a Schema */
  get: (
    resourceGroupName: string,
    schemaRegistryName: string,
    schemaName: string,
    options?: SchemasGetOptionalParams,
  ) => Promise<Schema>;
}

function _getSchemas(context: DeviceRegistryManagementContext) {
  return {
    listBySchemaRegistry: (
      resourceGroupName: string,
      schemaRegistryName: string,
      options?: SchemasListBySchemaRegistryOptionalParams,
    ) => listBySchemaRegistry(context, resourceGroupName, schemaRegistryName, options),
    delete: (
      resourceGroupName: string,
      schemaRegistryName: string,
      schemaName: string,
      options?: SchemasDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, schemaRegistryName, schemaName, options),
    createOrReplace: (
      resourceGroupName: string,
      schemaRegistryName: string,
      schemaName: string,
      resource: Schema,
      options?: SchemasCreateOrReplaceOptionalParams,
    ) =>
      createOrReplace(
        context,
        resourceGroupName,
        schemaRegistryName,
        schemaName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      schemaRegistryName: string,
      schemaName: string,
      options?: SchemasGetOptionalParams,
    ) => get(context, resourceGroupName, schemaRegistryName, schemaName, options),
  };
}

export function _getSchemasOperations(context: DeviceRegistryManagementContext): SchemasOperations {
  return {
    ..._getSchemas(context),
  };
}
