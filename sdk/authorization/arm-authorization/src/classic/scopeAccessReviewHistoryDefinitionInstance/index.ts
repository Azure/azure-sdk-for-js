// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { generateDownloadUri } from "../../api/scopeAccessReviewHistoryDefinitionInstance/operations.js";
import type { ScopeAccessReviewHistoryDefinitionInstanceGenerateDownloadUriOptionalParams } from "../../api/scopeAccessReviewHistoryDefinitionInstance/options.js";
import type { AccessReviewHistoryInstance } from "../../models/microsoft/attributeNamespaces/models.js";

/** Interface representing a ScopeAccessReviewHistoryDefinitionInstance operations. */
export interface ScopeAccessReviewHistoryDefinitionInstanceOperations {
  /** Generates a uri which can be used to retrieve review history data. This URI has a TTL of 1 day and can be retrieved by fetching the accessReviewHistoryDefinition object. */
  generateDownloadUri: (
    scope: string,
    historyDefinitionId: string,
    instanceId: string,
    options?: ScopeAccessReviewHistoryDefinitionInstanceGenerateDownloadUriOptionalParams,
  ) => Promise<AccessReviewHistoryInstance>;
}

function _getScopeAccessReviewHistoryDefinitionInstance(context: AuthorizationManagementContext) {
  return {
    generateDownloadUri: (
      scope: string,
      historyDefinitionId: string,
      instanceId: string,
      options?: ScopeAccessReviewHistoryDefinitionInstanceGenerateDownloadUriOptionalParams,
    ) => generateDownloadUri(context, scope, historyDefinitionId, instanceId, options),
  };
}

export function _getScopeAccessReviewHistoryDefinitionInstanceOperations(
  context: AuthorizationManagementContext,
): ScopeAccessReviewHistoryDefinitionInstanceOperations {
  return {
    ..._getScopeAccessReviewHistoryDefinitionInstance(context),
  };
}
