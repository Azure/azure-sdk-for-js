// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspaceGlobalSchema/operations.js";
import {
  WorkspaceGlobalSchemaListByServiceOptionalParams,
  WorkspaceGlobalSchemaDeleteOptionalParams,
  WorkspaceGlobalSchemaCreateOrUpdateOptionalParams,
  WorkspaceGlobalSchemaGetEntityTagOptionalParams,
  WorkspaceGlobalSchemaGetOptionalParams,
} from "../../api/workspaceGlobalSchema/options.js";
import { GlobalSchemaContract } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    schemaId: string,
    parameters: GlobalSchemaContract,
    options?: WorkspaceGlobalSchemaCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GlobalSchemaContract>, GlobalSchemaContract>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    schemaId: string,
    parameters: GlobalSchemaContract,
    options?: WorkspaceGlobalSchemaCreateOrUpdateOptionalParams,
  ) => Promise<GlobalSchemaContract>;
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      schemaId: string,
      parameters: GlobalSchemaContract,
      options?: WorkspaceGlobalSchemaCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
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
      schemaId: string,
      parameters: GlobalSchemaContract,
      options?: WorkspaceGlobalSchemaCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        schemaId,
        parameters,
        options,
      );
    },
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
