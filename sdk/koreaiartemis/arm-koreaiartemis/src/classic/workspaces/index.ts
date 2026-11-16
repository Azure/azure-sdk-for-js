// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentPlatformContext } from "../../api/agentPlatformContext.js";
import {
  getDetails,
  listLinkedSaaS,
  linkSaaS,
  listByOrganization,
  $delete,
  createOrUpdate,
  get,
} from "../../api/workspaces/operations.js";
import type {
  WorkspacesGetDetailsOptionalParams,
  WorkspacesListLinkedSaaSOptionalParams,
  WorkspacesLinkSaaSOptionalParams,
  WorkspacesListByOrganizationOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesCreateOrUpdateOptionalParams,
  WorkspacesGetOptionalParams,
} from "../../api/workspaces/options.js";
import type {
  WorkspaceResource,
  WorkspaceSaaSData,
  WorkspaceLinkedSaaSListResponse,
  WorkspaceDetail,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Workspaces operations. */
export interface WorkspacesOperations {
  /** Returns the complete Workspace details reported by Kore, including its projects. */
  getDetails: (
    resourceGroupName: string,
    organizationName: string,
    workspaceName: string,
    options?: WorkspacesGetDetailsOptionalParams,
  ) => Promise<WorkspaceDetail>;
  /** Returns the list of SaaS resources linked to the workspace. */
  listLinkedSaaS: (
    resourceGroupName: string,
    organizationName: string,
    workspaceName: string,
    options?: WorkspacesListLinkedSaaSOptionalParams,
  ) => Promise<WorkspaceLinkedSaaSListResponse>;
  /** Links SaaS resources to the workspace. Accepts the full list of SaaS assets to be linked. */
  linkSaaS: (
    resourceGroupName: string,
    organizationName: string,
    workspaceName: string,
    body: WorkspaceSaaSData,
    options?: WorkspacesLinkSaaSOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List Workspaces under an Organization. */
  listByOrganization: (
    resourceGroupName: string,
    organizationName: string,
    options?: WorkspacesListByOrganizationOptionalParams,
  ) => PagedAsyncIterableIterator<WorkspaceResource>;
  /** Delete a Workspace under an Organization (long-running). */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    workspaceName: string,
    options?: WorkspacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a Workspace under an Organization (long-running). */
  createOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    workspaceName: string,
    resource: WorkspaceResource,
    options?: WorkspacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<WorkspaceResource>, WorkspaceResource>;
  /** Get a Workspace under an Organization. */
  get: (
    resourceGroupName: string,
    organizationName: string,
    workspaceName: string,
    options?: WorkspacesGetOptionalParams,
  ) => Promise<WorkspaceResource>;
}

function _getWorkspaces(context: AgentPlatformContext) {
  return {
    getDetails: (
      resourceGroupName: string,
      organizationName: string,
      workspaceName: string,
      options?: WorkspacesGetDetailsOptionalParams,
    ) => getDetails(context, resourceGroupName, organizationName, workspaceName, options),
    listLinkedSaaS: (
      resourceGroupName: string,
      organizationName: string,
      workspaceName: string,
      options?: WorkspacesListLinkedSaaSOptionalParams,
    ) => listLinkedSaaS(context, resourceGroupName, organizationName, workspaceName, options),
    linkSaaS: (
      resourceGroupName: string,
      organizationName: string,
      workspaceName: string,
      body: WorkspaceSaaSData,
      options?: WorkspacesLinkSaaSOptionalParams,
    ) => linkSaaS(context, resourceGroupName, organizationName, workspaceName, body, options),
    listByOrganization: (
      resourceGroupName: string,
      organizationName: string,
      options?: WorkspacesListByOrganizationOptionalParams,
    ) => listByOrganization(context, resourceGroupName, organizationName, options),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      workspaceName: string,
      options?: WorkspacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, organizationName, workspaceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      organizationName: string,
      workspaceName: string,
      resource: WorkspaceResource,
      options?: WorkspacesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        organizationName,
        workspaceName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      organizationName: string,
      workspaceName: string,
      options?: WorkspacesGetOptionalParams,
    ) => get(context, resourceGroupName, organizationName, workspaceName, options),
  };
}

export function _getWorkspacesOperations(context: AgentPlatformContext): WorkspacesOperations {
  return {
    ..._getWorkspaces(context),
  };
}
