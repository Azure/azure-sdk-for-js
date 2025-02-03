// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  SchemaVersionsGetOptionalParams,
  SchemaVersionsCreateOrReplaceOptionalParams,
  SchemaVersionsDeleteOptionalParams,
  SchemaVersionsListBySchemaOptionalParams,
} from "../../api/options.js";
import {
  schemaVersionsGet,
  schemaVersionsCreateOrReplace,
  schemaVersionsDelete,
  schemaVersionsListBySchema,
} from "../../api/schemaVersions/index.js";
import { SchemaVersion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SchemaVersions operations. */
export interface SchemaVersionsOperations {
  /** Get a SchemaVersion */
  get: (
    resourceGroupName: string,
    schemaRegistryName: string,
    schemaName: string,
    schemaVersionName: string,
    options?: SchemaVersionsGetOptionalParams,
  ) => Promise<SchemaVersion>;
  /** Create a SchemaVersion */
  createOrReplace: (
    resourceGroupName: string,
    schemaRegistryName: string,
    schemaName: string,
    schemaVersionName: string,
    resource: SchemaVersion,
    options?: SchemaVersionsCreateOrReplaceOptionalParams,
  ) => Promise<SchemaVersion>;
  /** Delete a SchemaVersion */
  delete: (
    resourceGroupName: string,
    schemaRegistryName: string,
    schemaName: string,
    schemaVersionName: string,
    options?: SchemaVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** List SchemaVersion resources by Schema */
  listBySchema: (
    resourceGroupName: string,
    schemaRegistryName: string,
    schemaName: string,
    options?: SchemaVersionsListBySchemaOptionalParams,
  ) => PagedAsyncIterableIterator<SchemaVersion>;
}

export function getSchemaVersions(
  context: DeviceRegistryManagementContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      schemaRegistryName: string,
      schemaName: string,
      schemaVersionName: string,
      options?: SchemaVersionsGetOptionalParams,
    ) =>
      schemaVersionsGet(
        context,
        subscriptionId,
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
      schemaVersionsCreateOrReplace(
        context,
        subscriptionId,
        resourceGroupName,
        schemaRegistryName,
        schemaName,
        schemaVersionName,
        resource,
        options,
      ),
    delete: (
      resourceGroupName: string,
      schemaRegistryName: string,
      schemaName: string,
      schemaVersionName: string,
      options?: SchemaVersionsDeleteOptionalParams,
    ) =>
      schemaVersionsDelete(
        context,
        subscriptionId,
        resourceGroupName,
        schemaRegistryName,
        schemaName,
        schemaVersionName,
        options,
      ),
    listBySchema: (
      resourceGroupName: string,
      schemaRegistryName: string,
      schemaName: string,
      options?: SchemaVersionsListBySchemaOptionalParams,
    ) =>
      schemaVersionsListBySchema(
        context,
        subscriptionId,
        resourceGroupName,
        schemaRegistryName,
        schemaName,
        options,
      ),
  };
}

export function getSchemaVersionsOperations(
  context: DeviceRegistryManagementContext,
  subscriptionId: string,
): SchemaVersionsOperations {
  return {
    ...getSchemaVersions(context, subscriptionId),
  };
}
