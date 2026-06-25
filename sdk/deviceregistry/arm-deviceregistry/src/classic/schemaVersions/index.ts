// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  listBySchema,
  $delete,
  createOrReplace,
  get,
} from "../../api/schemaVersions/operations.js";
import {
  SchemaVersionsListBySchemaOptionalParams,
  SchemaVersionsDeleteOptionalParams,
  SchemaVersionsCreateOrReplaceOptionalParams,
  SchemaVersionsGetOptionalParams,
} from "../../api/schemaVersions/options.js";
import { SchemaVersion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
