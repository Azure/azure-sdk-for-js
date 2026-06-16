// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementGroupsAPIContext } from "../../api/managementGroupsAPIContext.js";
import {
  list,
  listDescendants,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/managementGroups/operations.js";
import {
  ManagementGroupsListOptionalParams,
  ManagementGroupsListDescendantsOptionalParams,
  ManagementGroupsDeleteOptionalParams,
  ManagementGroupsUpdateOptionalParams,
  ManagementGroupsCreateOrUpdateOptionalParams,
  ManagementGroupsGetOptionalParams,
} from "../../api/managementGroups/options.js";
import {
  ManagementGroup,
  CreateManagementGroupRequest,
  PatchManagementGroupRequest,
  DescendantInfo,
  ManagementGroupInfo,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagementGroups operations. */
export interface ManagementGroupsOperations {
  /** List management groups for the authenticated user. */
  list: (
    options?: ManagementGroupsListOptionalParams,
  ) => PagedAsyncIterableIterator<ManagementGroupInfo>;
  /** List all entities that descend from a management group. */
  listDescendants: (
    groupId: string,
    options?: ManagementGroupsListDescendantsOptionalParams,
  ) => PagedAsyncIterableIterator<DescendantInfo>;
  /**
   * Delete management group.
   * If a management group contains child resources, the request will fail.
   */
  delete: (
    groupId: string,
    options?: ManagementGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    groupId: string,
    options?: ManagementGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    groupId: string,
    options?: ManagementGroupsDeleteOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    groupId: string,
    createManagementGroupRequest: CreateManagementGroupRequest,
    options?: ManagementGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagementGroup>, ManagementGroup>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    groupId: string,
    createManagementGroupRequest: CreateManagementGroupRequest,
    options?: ManagementGroupsCreateOrUpdateOptionalParams,
  ) => Promise<ManagementGroup>;
  /** Get the details of the management group. */
  get: (groupId: string, options?: ManagementGroupsGetOptionalParams) => Promise<ManagementGroup>;
}

function _getManagementGroups(context: ManagementGroupsAPIContext) {
  return {
    list: (options?: ManagementGroupsListOptionalParams) => list(context, options),
    listDescendants: (groupId: string, options?: ManagementGroupsListDescendantsOptionalParams) =>
      listDescendants(context, groupId, options),
    delete: (groupId: string, options?: ManagementGroupsDeleteOptionalParams) =>
      $delete(context, groupId, options),
    beginDelete: async (groupId: string, options?: ManagementGroupsDeleteOptionalParams) => {
      const poller = $delete(context, groupId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (groupId: string, options?: ManagementGroupsDeleteOptionalParams) => {
      return await $delete(context, groupId, options);
    },
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
    beginCreateOrUpdate: async (
      groupId: string,
      createManagementGroupRequest: CreateManagementGroupRequest,
      options?: ManagementGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, groupId, createManagementGroupRequest, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      groupId: string,
      createManagementGroupRequest: CreateManagementGroupRequest,
      options?: ManagementGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, groupId, createManagementGroupRequest, options);
    },
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
