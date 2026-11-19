// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext } from "../../api/networkSecurityManagementContext.js";
import {
  listByParent,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/members/operations.js";
import type {
  MembersListByParentOptionalParams,
  MembersDeleteOptionalParams,
  MembersUpdateOptionalParams,
  MembersCreateOrUpdateOptionalParams,
  MembersGetOptionalParams,
} from "../../api/members/options.js";
import type { Member, MemberTagsUpdate } from "../../models/microsoft/networkSecurity/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Members operations. */
export interface MembersOperations {
  /** List Member resources by AgentFabric */
  listByParent: (
    resourceGroupName: string,
    agentFabricName: string,
    options?: MembersListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<Member>;
  /** Delete a Member */
  delete: (
    resourceGroupName: string,
    agentFabricName: string,
    memberName: string,
    options?: MembersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Member */
  update: (
    resourceGroupName: string,
    agentFabricName: string,
    memberName: string,
    properties: MemberTagsUpdate,
    options?: MembersUpdateOptionalParams,
  ) => PollerLike<OperationState<Member>, Member>;
  /** Create a Member */
  createOrUpdate: (
    resourceGroupName: string,
    agentFabricName: string,
    memberName: string,
    resource: Member,
    options?: MembersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Member>, Member>;
  /** Get a Member */
  get: (
    resourceGroupName: string,
    agentFabricName: string,
    memberName: string,
    options?: MembersGetOptionalParams,
  ) => Promise<Member>;
}

function _getMembers(context: NetworkSecurityManagementContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      agentFabricName: string,
      options?: MembersListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, agentFabricName, options),
    delete: (
      resourceGroupName: string,
      agentFabricName: string,
      memberName: string,
      options?: MembersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, agentFabricName, memberName, options),
    update: (
      resourceGroupName: string,
      agentFabricName: string,
      memberName: string,
      properties: MemberTagsUpdate,
      options?: MembersUpdateOptionalParams,
    ) => update(context, resourceGroupName, agentFabricName, memberName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      agentFabricName: string,
      memberName: string,
      resource: Member,
      options?: MembersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, agentFabricName, memberName, resource, options),
    get: (
      resourceGroupName: string,
      agentFabricName: string,
      memberName: string,
      options?: MembersGetOptionalParams,
    ) => get(context, resourceGroupName, agentFabricName, memberName, options),
  };
}

export function _getMembersOperations(
  context: NetworkSecurityManagementContext,
): MembersOperations {
  return {
    ..._getMembers(context),
  };
}
