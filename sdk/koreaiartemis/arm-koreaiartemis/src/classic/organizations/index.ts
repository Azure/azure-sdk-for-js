// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentPlatformContext } from "../../api/agentPlatformContext.js";
import {
  listWorkspaces,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/organizations/operations.js";
import type {
  OrganizationsListWorkspacesOptionalParams,
  OrganizationsListBySubscriptionOptionalParams,
  OrganizationsListByResourceGroupOptionalParams,
  OrganizationsDeleteOptionalParams,
  OrganizationsUpdateOptionalParams,
  OrganizationsCreateOptionalParams,
  OrganizationsGetOptionalParams,
} from "../../api/organizations/options.js";
import type {
  OrganizationResource,
  OrganizationResourceUpdate,
  ListWorkspacesResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Organizations operations. */
export interface OrganizationsOperations {
  /**
   * Lists all Workspaces in the Kore Organization, including Workspaces not managed through Liftr.
   *
   * This discovery operation uses POST because its response combines ARM-tracked
   * Workspaces with Kore-only Workspaces that have no ARM resource ID and cannot
   * be represented by the standard Workspaces collection GET.
   */
  listWorkspaces: (
    resourceGroupName: string,
    organizationName: string,
    options?: OrganizationsListWorkspacesOptionalParams,
  ) => Promise<ListWorkspacesResponse>;
  /** List Organizations in a Subscription. */
  listBySubscription: (
    options?: OrganizationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<OrganizationResource>;
  /** List Organizations in a Resource Group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: OrganizationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<OrganizationResource>;
  /**
   * Delete an Organization (long-running).
   *
   * Permanently removes the Organization and cascades the deletion to all
   * child Workspaces at the partner. This operation is irreversible.
   */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    options?: OrganizationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update mutable properties of an Organization (long-running). */
  update: (
    resourceGroupName: string,
    organizationName: string,
    properties: OrganizationResourceUpdate,
    options?: OrganizationsUpdateOptionalParams,
  ) => PollerLike<OperationState<OrganizationResource>, OrganizationResource>;
  /** Create or update an Organization (long-running). */
  create: (
    resourceGroupName: string,
    organizationName: string,
    resource: OrganizationResource,
    options?: OrganizationsCreateOptionalParams,
  ) => PollerLike<OperationState<OrganizationResource>, OrganizationResource>;
  /** Get an Organization. */
  get: (
    resourceGroupName: string,
    organizationName: string,
    options?: OrganizationsGetOptionalParams,
  ) => Promise<OrganizationResource>;
}

function _getOrganizations(context: AgentPlatformContext) {
  return {
    listWorkspaces: (
      resourceGroupName: string,
      organizationName: string,
      options?: OrganizationsListWorkspacesOptionalParams,
    ) => listWorkspaces(context, resourceGroupName, organizationName, options),
    listBySubscription: (options?: OrganizationsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: OrganizationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      options?: OrganizationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, organizationName, options),
    update: (
      resourceGroupName: string,
      organizationName: string,
      properties: OrganizationResourceUpdate,
      options?: OrganizationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, organizationName, properties, options),
    create: (
      resourceGroupName: string,
      organizationName: string,
      resource: OrganizationResource,
      options?: OrganizationsCreateOptionalParams,
    ) => create(context, resourceGroupName, organizationName, resource, options),
    get: (
      resourceGroupName: string,
      organizationName: string,
      options?: OrganizationsGetOptionalParams,
    ) => get(context, resourceGroupName, organizationName, options),
  };
}

export function _getOrganizationsOperations(
  context: AgentPlatformContext,
): OrganizationsOperations {
  return {
    ..._getOrganizations(context),
  };
}
