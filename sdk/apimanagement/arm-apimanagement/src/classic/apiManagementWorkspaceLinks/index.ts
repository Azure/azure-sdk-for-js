// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByService } from "../../api/apiManagementWorkspaceLinks/operations.js";
import type { ApiManagementWorkspaceLinksListByServiceOptionalParams } from "../../api/apiManagementWorkspaceLinks/options.js";
import type { ApiManagementWorkspaceLinksResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiManagementWorkspaceLinks operations. */
export interface ApiManagementWorkspaceLinksOperations {
  /** List all API Management workspaceLinks for a service. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiManagementWorkspaceLinksListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<ApiManagementWorkspaceLinksResource>;
}

function _getApiManagementWorkspaceLinks(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiManagementWorkspaceLinksListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
  };
}

export function _getApiManagementWorkspaceLinksOperations(
  context: ApiManagementContext,
): ApiManagementWorkspaceLinksOperations {
  return {
    ..._getApiManagementWorkspaceLinks(context),
  };
}
