// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  SchemasGetOptionalParams,
  SchemasCreateOrReplaceOptionalParams,
  SchemasDeleteOptionalParams,
  SchemasListBySchemaRegistryOptionalParams,
} from "../../api/options.js";
import {
  schemasGet,
  schemasCreateOrReplace,
  schemasDelete,
  schemasListBySchemaRegistry,
} from "../../api/schemas/index.js";
import { Schema } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Schemas operations. */
export interface SchemasOperations {
  /** Get a Schema */
  get: (
    resourceGroupName: string,
    schemaRegistryName: string,
    schemaName: string,
    options?: SchemasGetOptionalParams,
  ) => Promise<Schema>;
  /** Create a Schema */
  createOrReplace: (
    resourceGroupName: string,
    schemaRegistryName: string,
    schemaName: string,
    resource: Schema,
    options?: SchemasCreateOrReplaceOptionalParams,
  ) => Promise<Schema>;
  /** Delete a Schema */
  delete: (
    resourceGroupName: string,
    schemaRegistryName: string,
    schemaName: string,
    options?: SchemasDeleteOptionalParams,
  ) => Promise<void>;
  /** List Schema resources by SchemaRegistry */
  listBySchemaRegistry: (
    resourceGroupName: string,
    schemaRegistryName: string,
    options?: SchemasListBySchemaRegistryOptionalParams,
  ) => PagedAsyncIterableIterator<Schema>;
}

export function getSchemas(
  context: DeviceRegistryManagementContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      schemaRegistryName: string,
      schemaName: string,
      options?: SchemasGetOptionalParams,
    ) =>
      schemasGet(
        context,
        subscriptionId,
        resourceGroupName,
        schemaRegistryName,
        schemaName,
        options,
      ),
    createOrReplace: (
      resourceGroupName: string,
      schemaRegistryName: string,
      schemaName: string,
      resource: Schema,
      options?: SchemasCreateOrReplaceOptionalParams,
    ) =>
      schemasCreateOrReplace(
        context,
        subscriptionId,
        resourceGroupName,
        schemaRegistryName,
        schemaName,
        resource,
        options,
      ),
    delete: (
      resourceGroupName: string,
      schemaRegistryName: string,
      schemaName: string,
      options?: SchemasDeleteOptionalParams,
    ) =>
      schemasDelete(
        context,
        subscriptionId,
        resourceGroupName,
        schemaRegistryName,
        schemaName,
        options,
      ),
    listBySchemaRegistry: (
      resourceGroupName: string,
      schemaRegistryName: string,
      options?: SchemasListBySchemaRegistryOptionalParams,
    ) =>
      schemasListBySchemaRegistry(
        context,
        subscriptionId,
        resourceGroupName,
        schemaRegistryName,
        options,
      ),
  };
}

export function getSchemasOperations(
  context: DeviceRegistryManagementContext,
  subscriptionId: string,
): SchemasOperations {
  return {
    ...getSchemas(context, subscriptionId),
  };
}
