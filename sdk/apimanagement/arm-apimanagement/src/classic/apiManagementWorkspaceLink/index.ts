// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { get } from "../../api/apiManagementWorkspaceLink/operations.js";
import type { ApiManagementWorkspaceLinkGetOptionalParams } from "../../api/apiManagementWorkspaceLink/options.js";
import type { ApiManagementWorkspaceLinksResource } from "../../models/models.js";

/** Interface representing a ApiManagementWorkspaceLink operations. */
export interface ApiManagementWorkspaceLinkOperations {
  /** Gets an API Management WorkspaceLink resource description. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    options?: ApiManagementWorkspaceLinkGetOptionalParams,
  ) => Promise<ApiManagementWorkspaceLinksResource>;
}

function _getApiManagementWorkspaceLink(context: ApiManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      options?: ApiManagementWorkspaceLinkGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, options),
  };
}

export function _getApiManagementWorkspaceLinkOperations(
  context: ApiManagementContext,
): ApiManagementWorkspaceLinkOperations {
  return {
    ..._getApiManagementWorkspaceLink(context),
  };
}
