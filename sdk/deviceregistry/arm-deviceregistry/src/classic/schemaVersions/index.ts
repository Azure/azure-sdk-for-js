// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  listBySchema,
  $delete,
  createOrReplace,
  get,
} from "../../api/schemaVersions/operations.js";
import type {
  SchemaVersionsListBySchemaOptionalParams,
  SchemaVersionsDeleteOptionalParams,
  SchemaVersionsCreateOrReplaceOptionalParams,
  SchemaVersionsGetOptionalParams,
} from "../../api/schemaVersions/options.js";
import type { SchemaVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SchemaVersions operations. */
export interface SchemaVersionsOperations {
  /** List SchemaVersion resources by Schema */
  listBySchema: (
    resourceGroupName: string,
    schemaRegistryName: string,
    schemaName: string,
    options?: SchemaVersionsListBySchemaOptionalParams,
  ) => PagedAsyncIterableIterator<SchemaVersion>;
  /** Delete a SchemaVersion */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    schemaRegistryName: string,
    schemaName: string,
    schemaVersionName: string,
    options?: SchemaVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a SchemaVersion */
  createOrReplace: (
    resourceGroupName: string,
    schemaRegistryName: string,
    schemaName: string,
    schemaVersionName: string,
    resource: SchemaVersion,
    options?: SchemaVersionsCreateOrReplaceOptionalParams,
  ) => Promise<SchemaVersion>;
  /** Get a SchemaVersion */
  get: (
    resourceGroupName: string,
    schemaRegistryName: string,
    schemaName: string,
    schemaVersionName: string,
    options?: SchemaVersionsGetOptionalParams,
  ) => Promise<SchemaVersion>;
}

function _getSchemaVersions(context: DeviceRegistryManagementContext) {
  return {
    listBySchema: (
      resourceGroupName: string,
      schemaRegistryName: string,
      schemaName: string,
      options?: SchemaVersionsListBySchemaOptionalParams,
    ) => listBySchema(context, resourceGroupName, schemaRegistryName, schemaName, options),
    delete: (
      resourceGroupName: string,
      schemaRegistryName: string,
      schemaName: string,
      schemaVersionName: string,
      options?: SchemaVersionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        schemaRegistryName,
        schemaName,
        schemaVersionName,
        options,
      ),
    createOrReplace: (
      resourceGroupName: string,
      schemaRegistryName: string,
      schemaName: string,
      schemaVersionName: string,
      resource: SchemaVersion,
      options?: SchemaVersionsCreateOrReplaceOptionalParams,
    ) =>
      createOrReplace(
        context,
        resourceGroupName,
        schemaRegistryName,
        schemaName,
        schemaVersionName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      schemaRegistryName: string,
      schemaName: string,
      schemaVersionName: string,
      options?: SchemaVersionsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, schemaRegistryName, schemaName, schemaVersionName, options),
  };
}

export function _getSchemaVersionsOperations(
  context: DeviceRegistryManagementContext,
): SchemaVersionsOperations {
  return {
    ..._getSchemaVersions(context),
  };
}
