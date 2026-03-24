// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByProduct,
  $delete,
  createOrUpdate,
  get,
} from "../../api/workspaceTagOperationLink/operations.js";
import type {
  WorkspaceTagOperationLinkListByProductOptionalParams,
  WorkspaceTagOperationLinkDeleteOptionalParams,
  WorkspaceTagOperationLinkCreateOrUpdateOptionalParams,
  WorkspaceTagOperationLinkGetOptionalParams,
} from "../../api/workspaceTagOperationLink/options.js";
import type { TagOperationLinkContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceTagOperationLink operations. */
export interface WorkspaceTagOperationLinkOperations {
  /** Lists a collection of the operation links associated with a tag. */
  listByProduct: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    tagId: string,
    options?: WorkspaceTagOperationLinkListByProductOptionalParams,
  ) => PagedAsyncIterableIterator<TagOperationLinkContract>;
  /** Deletes the specified operation from the specified tag. */
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
    operationLinkId: string,
    options?: WorkspaceTagOperationLinkDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds an operation to the specified tag via link. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    tagId: string,
    operationLinkId: string,
    parameters: TagOperationLinkContract,
    options?: WorkspaceTagOperationLinkCreateOrUpdateOptionalParams,
  ) => Promise<TagOperationLinkContract>;
  /** Gets the operation link for the tag. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    tagId: string,
    operationLinkId: string,
    options?: WorkspaceTagOperationLinkGetOptionalParams,
  ) => Promise<TagOperationLinkContract>;
}

function _getWorkspaceTagOperationLink(context: ApiManagementContext) {
  return {
    listByProduct: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      tagId: string,
      options?: WorkspaceTagOperationLinkListByProductOptionalParams,
    ) => listByProduct(context, resourceGroupName, serviceName, workspaceId, tagId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      tagId: string,
      operationLinkId: string,
      options?: WorkspaceTagOperationLinkDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        tagId,
        operationLinkId,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      tagId: string,
      operationLinkId: string,
      parameters: TagOperationLinkContract,
      options?: WorkspaceTagOperationLinkCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        tagId,
        operationLinkId,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      tagId: string,
      operationLinkId: string,
      options?: WorkspaceTagOperationLinkGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, tagId, operationLinkId, options),
  };
}

export function _getWorkspaceTagOperationLinkOperations(
  context: ApiManagementContext,
): WorkspaceTagOperationLinkOperations {
  return {
    ..._getWorkspaceTagOperationLink(context),
  };
}
