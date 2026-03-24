// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByProduct,
  $delete,
  createOrUpdate,
  get,
} from "../../api/workspaceTagApiLink/operations.js";
import type {
  WorkspaceTagApiLinkListByProductOptionalParams,
  WorkspaceTagApiLinkDeleteOptionalParams,
  WorkspaceTagApiLinkCreateOrUpdateOptionalParams,
  WorkspaceTagApiLinkGetOptionalParams,
} from "../../api/workspaceTagApiLink/options.js";
import type { TagApiLinkContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceTagApiLink operations. */
export interface WorkspaceTagApiLinkOperations {
  /** Lists a collection of the API links associated with a tag. */
  listByProduct: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    tagId: string,
    options?: WorkspaceTagApiLinkListByProductOptionalParams,
  ) => PagedAsyncIterableIterator<TagApiLinkContract>;
  /** Deletes the specified API from the specified tag. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    tagId: string,
    apiLinkId: string,
    options?: WorkspaceTagApiLinkDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds an API to the specified tag via link. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    tagId: string,
    apiLinkId: string,
    parameters: TagApiLinkContract,
    options?: WorkspaceTagApiLinkCreateOrUpdateOptionalParams,
  ) => Promise<TagApiLinkContract>;
  /** Gets the API link for the tag. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    tagId: string,
    apiLinkId: string,
    options?: WorkspaceTagApiLinkGetOptionalParams,
  ) => Promise<TagApiLinkContract>;
}

function _getWorkspaceTagApiLink(context: ApiManagementContext) {
  return {
    listByProduct: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      tagId: string,
      options?: WorkspaceTagApiLinkListByProductOptionalParams,
    ) => listByProduct(context, resourceGroupName, serviceName, workspaceId, tagId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      tagId: string,
      apiLinkId: string,
      options?: WorkspaceTagApiLinkDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, workspaceId, tagId, apiLinkId, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      tagId: string,
      apiLinkId: string,
      parameters: TagApiLinkContract,
      options?: WorkspaceTagApiLinkCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        tagId,
        apiLinkId,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      tagId: string,
      apiLinkId: string,
      options?: WorkspaceTagApiLinkGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, tagId, apiLinkId, options),
  };
}

export function _getWorkspaceTagApiLinkOperations(
  context: ApiManagementContext,
): WorkspaceTagApiLinkOperations {
  return {
    ..._getWorkspaceTagApiLink(context),
  };
}
