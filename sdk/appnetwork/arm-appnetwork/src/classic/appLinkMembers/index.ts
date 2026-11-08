// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppLinkContext } from "../../api/appLinkContext.js";
import {
  listByAppLink,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/appLinkMembers/operations.js";
import type {
  AppLinkMembersListByAppLinkOptionalParams,
  AppLinkMembersDeleteOptionalParams,
  AppLinkMembersUpdateOptionalParams,
  AppLinkMembersCreateOrUpdateOptionalParams,
  AppLinkMembersGetOptionalParams,
} from "../../api/appLinkMembers/options.js";
import type { AppLinkMember, AppLinkMemberUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AppLinkMembers operations. */
export interface AppLinkMembersOperations {
  /** List the members of an Azure Kubernetes Application Network resource. */
  listByAppLink: (
    resourceGroupName: string,
    appLinkName: string,
    options?: AppLinkMembersListByAppLinkOptionalParams,
  ) => PagedAsyncIterableIterator<AppLinkMember>;
  /** Remove a member from an Azure Kubernetes Application Network resource. */
  delete: (
    resourceGroupName: string,
    appLinkName: string,
    appLinkMemberName: string,
    options?: AppLinkMembersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a member of an Azure Kubernetes Application Network resource. */
  update: (
    resourceGroupName: string,
    appLinkName: string,
    appLinkMemberName: string,
    properties: AppLinkMemberUpdate,
    options?: AppLinkMembersUpdateOptionalParams,
  ) => PollerLike<OperationState<AppLinkMember>, AppLinkMember>;
  /** Create a member of an Azure Kubernetes Application Network resource. */
  createOrUpdate: (
    resourceGroupName: string,
    appLinkName: string,
    appLinkMemberName: string,
    resource: AppLinkMember,
    options?: AppLinkMembersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AppLinkMember>, AppLinkMember>;
  /** Get a member of an Azure Kubernetes Application Network resource. */
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
