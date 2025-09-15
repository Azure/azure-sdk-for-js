// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlaywrightManagementContext } from "../../api/playwrightManagementContext.js";
import {
  checkNameAvailability,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/playwrightWorkspaces/operations.js";
import {
  PlaywrightWorkspacesCheckNameAvailabilityOptionalParams,
  PlaywrightWorkspacesListBySubscriptionOptionalParams,
  PlaywrightWorkspacesListByResourceGroupOptionalParams,
  PlaywrightWorkspacesDeleteOptionalParams,
  PlaywrightWorkspacesUpdateOptionalParams,
  PlaywrightWorkspacesCreateOrUpdateOptionalParams,
  PlaywrightWorkspacesGetOptionalParams,
} from "../../api/playwrightWorkspaces/options.js";
import {
  PlaywrightWorkspace,
  PlaywrightWorkspaceUpdate,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PlaywrightWorkspaces operations. */
export interface PlaywrightWorkspacesOperations {
  /** Checks if a Playwright workspace name is available globally. */
  checkNameAvailability: (
    body: CheckNameAvailabilityRequest,
    options?: PlaywrightWorkspacesCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
  /** List PlaywrightWorkspace resources by subscription ID */
  listBySubscription: (
    options?: PlaywrightWorkspacesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PlaywrightWorkspace>;
  /** List PlaywrightWorkspace resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PlaywrightWorkspacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PlaywrightWorkspace>;
  /** Deletes a Playwright workspace resource asynchronously. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    playwrightWorkspaceName: string,
    options?: PlaywrightWorkspacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a Playwright workspace resource synchronously. */
  update: (
    resourceGroupName: string,
    playwrightWorkspaceName: string,
    properties: PlaywrightWorkspaceUpdate,
    options?: PlaywrightWorkspacesUpdateOptionalParams,
  ) => Promise<PlaywrightWorkspace>;
  /** Create a PlaywrightWorkspace */
  createOrUpdate: (
    resourceGroupName: string,
    playwrightWorkspaceName: string,
    resource: PlaywrightWorkspace,
    options?: PlaywrightWorkspacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PlaywrightWorkspace>, PlaywrightWorkspace>;
  /** Get a PlaywrightWorkspace */
  get: (
    resourceGroupName: string,
    playwrightWorkspaceName: string,
    options?: PlaywrightWorkspacesGetOptionalParams,
  ) => Promise<PlaywrightWorkspace>;
}

function _getPlaywrightWorkspaces(context: PlaywrightManagementContext) {
  return {
    checkNameAvailability: (
      body: CheckNameAvailabilityRequest,
      options?: PlaywrightWorkspacesCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, body, options),
    listBySubscription: (options?: PlaywrightWorkspacesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PlaywrightWorkspacesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      playwrightWorkspaceName: string,
      options?: PlaywrightWorkspacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, playwrightWorkspaceName, options),
    update: (
      resourceGroupName: string,
      playwrightWorkspaceName: string,
      properties: PlaywrightWorkspaceUpdate,
      options?: PlaywrightWorkspacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, playwrightWorkspaceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      playwrightWorkspaceName: string,
      resource: PlaywrightWorkspace,
      options?: PlaywrightWorkspacesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, playwrightWorkspaceName, resource, options),
    get: (
      resourceGroupName: string,
      playwrightWorkspaceName: string,
      options?: PlaywrightWorkspacesGetOptionalParams,
    ) => get(context, resourceGroupName, playwrightWorkspaceName, options),
  };
}

export function _getPlaywrightWorkspacesOperations(
  context: PlaywrightManagementContext,
): PlaywrightWorkspacesOperations {
  return {
    ..._getPlaywrightWorkspaces(context),
  };
}
