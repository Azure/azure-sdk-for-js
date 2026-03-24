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
} from "../../api/workspaceGroup/operations.js";
import type {
  WorkspaceGroupListByServiceOptionalParams,
  WorkspaceGroupDeleteOptionalParams,
  WorkspaceGroupUpdateOptionalParams,
  WorkspaceGroupCreateOrUpdateOptionalParams,
  WorkspaceGroupGetEntityTagOptionalParams,
  WorkspaceGroupGetOptionalParams,
} from "../../api/workspaceGroup/options.js";
import type {
  GroupContract,
  GroupCreateParameters,
  GroupUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceGroup operations. */
export interface WorkspaceGroupOperations {
  /** Lists a collection of groups defined within a workspace in a service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    options?: WorkspaceGroupListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<GroupContract>;
  /** Deletes specific group of the workspace in an API Management service instance. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    groupId: string,
    ifMatch: string,
    options?: WorkspaceGroupDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the group specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    groupId: string,
    ifMatch: string,
    parameters: GroupUpdateParameters,
    options?: WorkspaceGroupUpdateOptionalParams,
  ) => Promise<GroupContract>;
  /** Creates or Updates a group. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    groupId: string,
    parameters: GroupCreateParameters,
    options?: WorkspaceGroupCreateOrUpdateOptionalParams,
  ) => Promise<GroupContract>;
  /** Gets the entity state (Etag) version of the group specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    groupId: string,
    options?: WorkspaceGroupGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the group specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    groupId: string,
    options?: WorkspaceGroupGetOptionalParams,
  ) => Promise<GroupContract>;
}

function _getWorkspaceGroup(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      options?: WorkspaceGroupListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, workspaceId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      groupId: string,
      ifMatch: string,
      options?: WorkspaceGroupDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, workspaceId, groupId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      groupId: string,
      ifMatch: string,
      parameters: GroupUpdateParameters,
      options?: WorkspaceGroupUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        groupId,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      groupId: string,
      parameters: GroupCreateParameters,
      options?: WorkspaceGroupCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        groupId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      groupId: string,
      options?: WorkspaceGroupGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, workspaceId, groupId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      groupId: string,
      options?: WorkspaceGroupGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, groupId, options),
  };
}

export function _getWorkspaceGroupOperations(
  context: ApiManagementContext,
): WorkspaceGroupOperations {
  return {
    ..._getWorkspaceGroup(context),
  };
}
