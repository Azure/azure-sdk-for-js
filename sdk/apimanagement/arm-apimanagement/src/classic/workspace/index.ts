// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspace/operations.js";
import type {
  WorkspaceListByServiceOptionalParams,
  WorkspaceDeleteOptionalParams,
  WorkspaceUpdateOptionalParams,
  WorkspaceCreateOrUpdateOptionalParams,
  WorkspaceGetEntityTagOptionalParams,
  WorkspaceGetOptionalParams,
} from "../../api/workspace/options.js";
import type { WorkspaceContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Workspace operations. */
export interface WorkspaceOperations {
  /** Lists all workspaces of the API Management service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: WorkspaceListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<WorkspaceContract>;
  /** Deletes the specified workspace. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    ifMatch: string,
    options?: WorkspaceDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the workspace specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    ifMatch: string,
    parameters: WorkspaceContract,
    options?: WorkspaceUpdateOptionalParams,
  ) => Promise<WorkspaceContract>;
  /** Creates a new workspace or updates an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    parameters: WorkspaceContract,
    options?: WorkspaceCreateOrUpdateOptionalParams,
  ) => Promise<WorkspaceContract>;
  /** Gets the entity state (Etag) version of the workspace specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    options?: WorkspaceGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the workspace specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    options?: WorkspaceGetOptionalParams,
  ) => Promise<WorkspaceContract>;
}

function _getWorkspace(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: WorkspaceListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      ifMatch: string,
      options?: WorkspaceDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, workspaceId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      ifMatch: string,
      parameters: WorkspaceContract,
      options?: WorkspaceUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, workspaceId, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      parameters: WorkspaceContract,
      options?: WorkspaceCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, workspaceId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      options?: WorkspaceGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, workspaceId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      options?: WorkspaceGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, options),
  };
}

export function _getWorkspaceOperations(context: ApiManagementContext): WorkspaceOperations {
  return {
    ..._getWorkspace(context),
  };
}
