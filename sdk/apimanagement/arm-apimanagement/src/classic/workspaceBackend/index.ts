// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByWorkspace,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspaceBackend/operations.js";
import type {
  WorkspaceBackendListByWorkspaceOptionalParams,
  WorkspaceBackendDeleteOptionalParams,
  WorkspaceBackendUpdateOptionalParams,
  WorkspaceBackendCreateOrUpdateOptionalParams,
  WorkspaceBackendGetEntityTagOptionalParams,
  WorkspaceBackendGetOptionalParams,
} from "../../api/workspaceBackend/options.js";
import type { BackendContract, BackendUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceBackend operations. */
export interface WorkspaceBackendOperations {
  /** Lists a collection of backends in the specified workspace. */
  listByWorkspace: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    options?: WorkspaceBackendListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<BackendContract>;
  /** Deletes the specified backend. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    backendId: string,
    ifMatch: string,
    options?: WorkspaceBackendDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing backend. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    backendId: string,
    ifMatch: string,
    parameters: BackendUpdateParameters,
    options?: WorkspaceBackendUpdateOptionalParams,
  ) => Promise<BackendContract>;
  /** Creates or Updates a backend. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    backendId: string,
    parameters: BackendContract,
    options?: WorkspaceBackendCreateOrUpdateOptionalParams,
  ) => Promise<BackendContract>;
  /** Gets the entity state (Etag) version of the backend specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    backendId: string,
    options?: WorkspaceBackendGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the backend specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    backendId: string,
    options?: WorkspaceBackendGetOptionalParams,
  ) => Promise<BackendContract>;
}

function _getWorkspaceBackend(context: ApiManagementContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      options?: WorkspaceBackendListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, serviceName, workspaceId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      backendId: string,
      ifMatch: string,
      options?: WorkspaceBackendDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, workspaceId, backendId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      backendId: string,
      ifMatch: string,
      parameters: BackendUpdateParameters,
      options?: WorkspaceBackendUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        backendId,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      backendId: string,
      parameters: BackendContract,
      options?: WorkspaceBackendCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        backendId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      backendId: string,
      options?: WorkspaceBackendGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, workspaceId, backendId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      backendId: string,
      options?: WorkspaceBackendGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, backendId, options),
  };
}

export function _getWorkspaceBackendOperations(
  context: ApiManagementContext,
): WorkspaceBackendOperations {
  return {
    ..._getWorkspaceBackend(context),
  };
}
