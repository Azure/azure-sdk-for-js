// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityState,
  get,
} from "../../api/workspaceTag/operations.js";
import type {
  WorkspaceTagListByServiceOptionalParams,
  WorkspaceTagDeleteOptionalParams,
  WorkspaceTagUpdateOptionalParams,
  WorkspaceTagCreateOrUpdateOptionalParams,
  WorkspaceTagGetEntityStateOptionalParams,
  WorkspaceTagGetOptionalParams,
} from "../../api/workspaceTag/options.js";
import type { TagContract, TagCreateUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceTag operations. */
export interface WorkspaceTagOperations {
  /** Lists a collection of tags defined within a workspace in a service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    options?: WorkspaceTagListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<TagContract>;
  /** Deletes specific tag of the workspace in an API Management service instance. */
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
    ifMatch: string,
    options?: WorkspaceTagDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the tag specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    tagId: string,
    ifMatch: string,
    parameters: TagCreateUpdateParameters,
    options?: WorkspaceTagUpdateOptionalParams,
  ) => Promise<TagContract>;
  /** Creates a tag. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    tagId: string,
    parameters: TagCreateUpdateParameters,
    options?: WorkspaceTagCreateOrUpdateOptionalParams,
  ) => Promise<TagContract>;
  /** Gets the entity state version of the tag specified by its identifier. */
  getEntityState: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    tagId: string,
    options?: WorkspaceTagGetEntityStateOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the tag specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    tagId: string,
    options?: WorkspaceTagGetOptionalParams,
  ) => Promise<TagContract>;
}

function _getWorkspaceTag(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      options?: WorkspaceTagListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, workspaceId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      tagId: string,
      ifMatch: string,
      options?: WorkspaceTagDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, workspaceId, tagId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      tagId: string,
      ifMatch: string,
      parameters: TagCreateUpdateParameters,
      options?: WorkspaceTagUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        tagId,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      tagId: string,
      parameters: TagCreateUpdateParameters,
      options?: WorkspaceTagCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        tagId,
        parameters,
        options,
      ),
    getEntityState: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      tagId: string,
      options?: WorkspaceTagGetEntityStateOptionalParams,
    ) => getEntityState(context, resourceGroupName, serviceName, workspaceId, tagId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      tagId: string,
      options?: WorkspaceTagGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, tagId, options),
  };
}

export function _getWorkspaceTagOperations(context: ApiManagementContext): WorkspaceTagOperations {
  return {
    ..._getWorkspaceTag(context),
  };
}
