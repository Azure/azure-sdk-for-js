// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByApi,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspaceApiSchema/operations.js";
import type {
  WorkspaceApiSchemaListByApiOptionalParams,
  WorkspaceApiSchemaDeleteOptionalParams,
  WorkspaceApiSchemaCreateOrUpdateOptionalParams,
  WorkspaceApiSchemaGetEntityTagOptionalParams,
  WorkspaceApiSchemaGetOptionalParams,
} from "../../api/workspaceApiSchema/options.js";
import type { SchemaContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WorkspaceApiSchema operations. */
export interface WorkspaceApiSchemaOperations {
  /** Get the schema configuration at the API level. */
  listByApi: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    options?: WorkspaceApiSchemaListByApiOptionalParams,
  ) => PagedAsyncIterableIterator<SchemaContract>;
  /** Deletes the schema configuration at the Api. */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    schemaId: string,
    ifMatch: string,
    options?: WorkspaceApiSchemaDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates schema configuration for the API. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    schemaId: string,
    parameters: SchemaContract,
    options?: WorkspaceApiSchemaCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SchemaContract>, SchemaContract>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    schemaId: string,
    parameters: SchemaContract,
    options?: WorkspaceApiSchemaCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SchemaContract>, SchemaContract>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    schemaId: string,
    parameters: SchemaContract,
    options?: WorkspaceApiSchemaCreateOrUpdateOptionalParams,
  ) => Promise<SchemaContract>;
  /** Gets the entity state (Etag) version of the schema specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    schemaId: string,
    options?: WorkspaceApiSchemaGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get the schema configuration at the API level. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    schemaId: string,
    options?: WorkspaceApiSchemaGetOptionalParams,
  ) => Promise<SchemaContract>;
}

function _getWorkspaceApiSchema(context: ApiManagementContext) {
  return {
    listByApi: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      options?: WorkspaceApiSchemaListByApiOptionalParams,
    ) => listByApi(context, resourceGroupName, serviceName, workspaceId, apiId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      schemaId: string,
      ifMatch: string,
      options?: WorkspaceApiSchemaDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        schemaId,
        ifMatch,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      schemaId: string,
      parameters: SchemaContract,
      options?: WorkspaceApiSchemaCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        schemaId,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      schemaId: string,
      parameters: SchemaContract,
      options?: WorkspaceApiSchemaCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        schemaId,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      schemaId: string,
      parameters: SchemaContract,
      options?: WorkspaceApiSchemaCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        schemaId,
        parameters,
        options,
      );
    },
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      schemaId: string,
      options?: WorkspaceApiSchemaGetEntityTagOptionalParams,
    ) =>
      getEntityTag(context, resourceGroupName, serviceName, workspaceId, apiId, schemaId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      schemaId: string,
      options?: WorkspaceApiSchemaGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, apiId, schemaId, options),
  };
}

export function _getWorkspaceApiSchemaOperations(
  context: ApiManagementContext,
): WorkspaceApiSchemaOperations {
  return {
    ..._getWorkspaceApiSchema(context),
  };
}
