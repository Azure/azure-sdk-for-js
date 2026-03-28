// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/staticMembers/operations.js";
import type {
  StaticMembersListOptionalParams,
  StaticMembersDeleteOptionalParams,
  StaticMembersCreateOrUpdateOptionalParams,
  StaticMembersGetOptionalParams,
} from "../../api/staticMembers/options.js";
import type { StaticMember } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a StaticMembers operations. */
export interface StaticMembersOperations {
  /** Lists the specified static member. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    networkGroupName: string,
    options?: StaticMembersListOptionalParams,
  ) => PagedAsyncIterableIterator<StaticMember>;
  /** Deletes a static member. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkManagerName: string,
    networkGroupName: string,
    staticMemberName: string,
    options?: StaticMembersDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a static member. */
  createOrUpdate: (
    resourceGroupName: string,
    networkManagerName: string,
    networkGroupName: string,
    staticMemberName: string,
    parameters: StaticMember,
    options?: StaticMembersCreateOrUpdateOptionalParams,
  ) => Promise<StaticMember>;
  /** Gets the specified static member. */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    networkGroupName: string,
    staticMemberName: string,
    options?: StaticMembersGetOptionalParams,
  ) => Promise<StaticMember>;
}

function _getStaticMembers(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      networkGroupName: string,
      options?: StaticMembersListOptionalParams,
    ) => list(context, resourceGroupName, networkManagerName, networkGroupName, options),
    delete: (
      resourceGroupName: string,
      networkManagerName: string,
      networkGroupName: string,
      staticMemberName: string,
      options?: StaticMembersDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        networkManagerName,
        networkGroupName,
        staticMemberName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      networkManagerName: string,
      networkGroupName: string,
      staticMemberName: string,
      parameters: StaticMember,
      options?: StaticMembersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkManagerName,
        networkGroupName,
        staticMemberName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkManagerName: string,
      networkGroupName: string,
      staticMemberName: string,
      options?: StaticMembersGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        networkManagerName,
        networkGroupName,
        staticMemberName,
        options,
      ),
  };
}

export function _getStaticMembersOperations(
  context: NetworkManagementContext,
): StaticMembersOperations {
  return {
    ..._getStaticMembers(context),
  };
}
