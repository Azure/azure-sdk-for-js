// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspaceGlobalSchema/operations.js";
import type {
  WorkspaceGlobalSchemaListByServiceOptionalParams,
  WorkspaceGlobalSchemaDeleteOptionalParams,
  WorkspaceGlobalSchemaCreateOrUpdateOptionalParams,
  WorkspaceGlobalSchemaGetEntityTagOptionalParams,
  WorkspaceGlobalSchemaGetOptionalParams,
} from "../../api/workspaceGlobalSchema/options.js";
import type { GlobalSchemaContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WorkspaceGlobalSchema operations. */
export interface WorkspaceGlobalSchemaOperations {
  /** Lists a collection of schemas registered with workspace in a service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    options?: WorkspaceGlobalSchemaListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<GlobalSchemaContract>;
  /** Deletes specific Schema. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    schemaId: string,
    ifMatch: string,
    options?: WorkspaceGlobalSchemaDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates new or updates existing specified Schema of the workspace in an API Management service instance. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    schemaId: string,
    parameters: GlobalSchemaContract,
    options?: WorkspaceGlobalSchemaCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GlobalSchemaContract>, GlobalSchemaContract>;
  /** Gets the entity state (Etag) version of the Schema specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    schemaId: string,
    options?: WorkspaceGlobalSchemaGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the Schema specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    schemaId: string,
    options?: WorkspaceGlobalSchemaGetOptionalParams,
  ) => Promise<GlobalSchemaContract>;
}

function _getWorkspaceGlobalSchema(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      options?: WorkspaceGlobalSchemaListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, workspaceId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      schemaId: string,
      ifMatch: string,
      options?: WorkspaceGlobalSchemaDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, workspaceId, schemaId, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      schemaId: string,
      parameters: GlobalSchemaContract,
      options?: WorkspaceGlobalSchemaCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        schemaId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      schemaId: string,
      options?: WorkspaceGlobalSchemaGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, workspaceId, schemaId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      schemaId: string,
      options?: WorkspaceGlobalSchemaGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, schemaId, options),
  };
}

export function _getWorkspaceGlobalSchemaOperations(
  context: ApiManagementContext,
): WorkspaceGlobalSchemaOperations {
  return {
    ..._getWorkspaceGlobalSchema(context),
  };
}
