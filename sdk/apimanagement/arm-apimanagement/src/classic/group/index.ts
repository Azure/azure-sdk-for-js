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
} from "../../api/group/operations.js";
import type {
  GroupListByServiceOptionalParams,
  GroupDeleteOptionalParams,
  GroupUpdateOptionalParams,
  GroupCreateOrUpdateOptionalParams,
  GroupGetEntityTagOptionalParams,
  GroupGetOptionalParams,
} from "../../api/group/options.js";
import type {
  GroupContract,
  GroupCreateParameters,
  GroupUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Group operations. */
export interface GroupOperations {
  /** Lists a collection of groups defined within a service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: GroupListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<GroupContract>;
  /** Deletes specific group of the API Management service instance. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    groupId: string,
    ifMatch: string,
    options?: GroupDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the group specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    groupId: string,
    ifMatch: string,
    parameters: GroupUpdateParameters,
    options?: GroupUpdateOptionalParams,
  ) => Promise<GroupContract>;
  /** Creates or Updates a group. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    groupId: string,
    parameters: GroupCreateParameters,
    options?: GroupCreateOrUpdateOptionalParams,
  ) => Promise<GroupContract>;
  /** Gets the entity state (Etag) version of the group specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    groupId: string,
    options?: GroupGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the group specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    groupId: string,
    options?: GroupGetOptionalParams,
  ) => Promise<GroupContract>;
}

function _getGroup(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: GroupListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      groupId: string,
      ifMatch: string,
      options?: GroupDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, groupId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      groupId: string,
      ifMatch: string,
      parameters: GroupUpdateParameters,
      options?: GroupUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, groupId, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      groupId: string,
      parameters: GroupCreateParameters,
      options?: GroupCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, groupId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      groupId: string,
      options?: GroupGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, groupId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      groupId: string,
      options?: GroupGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, groupId, options),
  };
}

export function _getGroupOperations(context: ApiManagementContext): GroupOperations {
  return {
    ..._getGroup(context),
  };
}
