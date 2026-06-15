// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByService } from "../../api/workspaceApiRevision/operations.js";
import type { WorkspaceApiRevisionListByServiceOptionalParams } from "../../api/workspaceApiRevision/options.js";
import type { ApiRevisionContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceApiRevision operations. */
export interface WorkspaceApiRevisionOperations {
  /** Lists all revisions of an API. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    options?: WorkspaceApiRevisionListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<ApiRevisionContract>;
}

function _getWorkspaceApiRevision(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      options?: WorkspaceApiRevisionListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, workspaceId, apiId, options),
  };
}

export function _getWorkspaceApiRevisionOperations(
  context: ApiManagementContext,
): WorkspaceApiRevisionOperations {
  return {
    ..._getWorkspaceApiRevision(context),
  };
}
