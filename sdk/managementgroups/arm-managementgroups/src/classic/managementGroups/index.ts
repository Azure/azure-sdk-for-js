// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagementGroupsAPIContext } from "../../api/managementGroupsAPIContext.js";
import {
  list,
  getDescendants,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/managementGroups/operations.js";
import type {
  ManagementGroupsListOptionalParams,
  ManagementGroupsGetDescendantsOptionalParams,
  ManagementGroupsDeleteOptionalParams,
  ManagementGroupsUpdateOptionalParams,
  ManagementGroupsCreateOrUpdateOptionalParams,
  ManagementGroupsGetOptionalParams,
} from "../../api/managementGroups/options.js";
import type {
  ManagementGroup,
  CreateManagementGroupRequest,
  PatchManagementGroupRequest,
  DescendantInfo,
  ManagementGroupInfo,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagementGroups operations. */
export interface ManagementGroupsOperations {
  /** List management groups for the authenticated user. */
  list: (
    options?: ManagementGroupsListOptionalParams,
  ) => PagedAsyncIterableIterator<ManagementGroupInfo>;
  /** List all entities that descend from a management group. */
  getDescendants: (
    groupId: string,
    options?: ManagementGroupsGetDescendantsOptionalParams,
  ) => PagedAsyncIterableIterator<DescendantInfo>;
  /**
   * Delete management group.
   * If a management group contains child resources, the request will fail.
   */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    groupId: string,
    options?: ManagementGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a management group. */
  update: (
    groupId: string,
    patchGroupRequest: PatchManagementGroupRequest,
    options?: ManagementGroupsUpdateOptionalParams,
  ) => Promise<ManagementGroup>;
  /**
   * Create or update a management group.
   * If a management group is already created and a subsequent create request is issued with different properties, the management group properties will be updated.
   */
  createOrUpdate: (
    groupId: string,
    createManagementGroupRequest: CreateManagementGroupRequest,
    options?: ManagementGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagementGroup>, ManagementGroup>;
  /** Get the details of the management group. */
  get: (groupId: string, options?: ManagementGroupsGetOptionalParams) => Promise<ManagementGroup>;
}

function _getManagementGroups(context: ManagementGroupsAPIContext) {
  return {
    list: (options?: ManagementGroupsListOptionalParams) => list(context, options),
    getDescendants: (groupId: string, options?: ManagementGroupsGetDescendantsOptionalParams) =>
      getDescendants(context, groupId, options),
    delete: (groupId: string, options?: ManagementGroupsDeleteOptionalParams) =>
      $delete(context, groupId, options),
    update: (
      groupId: string,
      patchGroupRequest: PatchManagementGroupRequest,
      options?: ManagementGroupsUpdateOptionalParams,
    ) => update(context, groupId, patchGroupRequest, options),
    createOrUpdate: (
      groupId: string,
      createManagementGroupRequest: CreateManagementGroupRequest,
      options?: ManagementGroupsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, groupId, createManagementGroupRequest, options),
    get: (groupId: string, options?: ManagementGroupsGetOptionalParams) =>
      get(context, groupId, options),
  };
}

export function _getManagementGroupsOperations(
  context: ManagementGroupsAPIContext,
): ManagementGroupsOperations {
  return {
    ..._getManagementGroups(context),
  };
}
