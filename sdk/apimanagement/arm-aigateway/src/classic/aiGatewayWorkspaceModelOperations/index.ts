// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByWorkspace } from "../../api/aiGatewayWorkspaceModelOperations/operations.js";
import type { AiGatewayWorkspaceModelOperationsListByWorkspaceOptionalParams } from "../../api/aiGatewayWorkspaceModelOperations/options.js";
import type { AiGatewayModelResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AiGatewayWorkspaceModelOperations operations. */
export interface AiGatewayWorkspaceModelOperationsOperations {
  /** Lists models from every model provider in an AI Gateway workspace. */
  listByWorkspace: (
    resourceGroupName: string,
    aiGatewayName: string,
    workspaceName: string,
    options?: AiGatewayWorkspaceModelOperationsListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<AiGatewayModelResource>;
}

function _getAiGatewayWorkspaceModelOperations(context: ApiManagementContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      aiGatewayName: string,
      workspaceName: string,
      options?: AiGatewayWorkspaceModelOperationsListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, aiGatewayName, workspaceName, options),
  };
}

export function _getAiGatewayWorkspaceModelOperationsOperations(
  context: ApiManagementContext,
): AiGatewayWorkspaceModelOperationsOperations {
  return {
    ..._getAiGatewayWorkspaceModelOperations(context),
  };
}
