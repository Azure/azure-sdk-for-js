// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppLinkContext } from "../../api/appLinkContext.js";
import {
  listByAppLink,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/appLinkMembers/operations.js";
import {
  AppLinkMembersListByAppLinkOptionalParams,
  AppLinkMembersDeleteOptionalParams,
  AppLinkMembersUpdateOptionalParams,
  AppLinkMembersCreateOrUpdateOptionalParams,
  AppLinkMembersGetOptionalParams,
} from "../../api/appLinkMembers/options.js";
import { AppLinkMember, AppLinkMemberUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AppLinkMembers operations. */
export interface AppLinkMembersOperations {
  /** List AppLinkMember resources by AppLink. */
  listByAppLink: (
    resourceGroupName: string,
    appLinkName: string,
    options?: AppLinkMembersListByAppLinkOptionalParams,
  ) => PagedAsyncIterableIterator<AppLinkMember>;
  /** Delete an AppLinkMember. */
  delete: (
    resourceGroupName: string,
    appLinkName: string,
    appLinkMemberName: string,
    options?: AppLinkMembersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update an AppLinkMember. */
  update: (
    resourceGroupName: string,
    appLinkName: string,
    appLinkMemberName: string,
    properties: AppLinkMemberUpdate,
    options?: AppLinkMembersUpdateOptionalParams,
  ) => PollerLike<OperationState<AppLinkMember>, AppLinkMember>;
  /** Create an AppLinkMember. */
  createOrUpdate: (
    resourceGroupName: string,
    appLinkName: string,
    appLinkMemberName: string,
    resource: AppLinkMember,
    options?: AppLinkMembersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AppLinkMember>, AppLinkMember>;
  /** Get an AppLinkMember. */
  get: (
    resourceGroupName: string,
    appLinkName: string,
    appLinkMemberName: string,
    options?: AppLinkMembersGetOptionalParams,
  ) => Promise<AppLinkMember>;
}

function _getAppLinkMembers(context: AppLinkContext) {
  return {
    listByAppLink: (
      resourceGroupName: string,
      appLinkName: string,
      options?: AppLinkMembersListByAppLinkOptionalParams,
    ) => listByAppLink(context, resourceGroupName, appLinkName, options),
    delete: (
      resourceGroupName: string,
      appLinkName: string,
      appLinkMemberName: string,
      options?: AppLinkMembersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, appLinkName, appLinkMemberName, options),
    update: (
      resourceGroupName: string,
      appLinkName: string,
      appLinkMemberName: string,
      properties: AppLinkMemberUpdate,
      options?: AppLinkMembersUpdateOptionalParams,
    ) => update(context, resourceGroupName, appLinkName, appLinkMemberName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      appLinkName: string,
      appLinkMemberName: string,
      resource: AppLinkMember,
      options?: AppLinkMembersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, appLinkName, appLinkMemberName, resource, options),
    get: (
      resourceGroupName: string,
      appLinkName: string,
      appLinkMemberName: string,
      options?: AppLinkMembersGetOptionalParams,
    ) => get(context, resourceGroupName, appLinkName, appLinkMemberName, options),
  };
}

export function _getAppLinkMembersOperations(context: AppLinkContext): AppLinkMembersOperations {
  return {
    ..._getAppLinkMembers(context),
  };
}
