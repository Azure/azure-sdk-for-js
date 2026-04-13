// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { generateDownloadUri } from "../../api/accessReviewHistoryDefinitionInstance/operations.js";
import type { AccessReviewHistoryDefinitionInstanceGenerateDownloadUriOptionalParams } from "../../api/accessReviewHistoryDefinitionInstance/options.js";
import type { AccessReviewHistoryInstance } from "../../models/microsoft/attributeNamespaces/models.js";

/** Interface representing a AccessReviewHistoryDefinitionInstance operations. */
export interface AccessReviewHistoryDefinitionInstanceOperations {
  /** Generates a uri which can be used to retrieve review history data. This URI has a TTL of 1 day and can be retrieved by fetching the accessReviewHistoryDefinition object. */
  generateDownloadUri: (
    historyDefinitionId: string,
    instanceId: string,
    options?: AccessReviewHistoryDefinitionInstanceGenerateDownloadUriOptionalParams,
  ) => Promise<AccessReviewHistoryInstance>;
}

function _getAccessReviewHistoryDefinitionInstance(context: AuthorizationManagementContext) {
  return {
    generateDownloadUri: (
      historyDefinitionId: string,
      instanceId: string,
      options?: AccessReviewHistoryDefinitionInstanceGenerateDownloadUriOptionalParams,
    ) => generateDownloadUri(context, historyDefinitionId, instanceId, options),
  };
}

export function _getAccessReviewHistoryDefinitionInstanceOperations(
  context: AuthorizationManagementContext,
): AccessReviewHistoryDefinitionInstanceOperations {
  return {
    ..._getAccessReviewHistoryDefinitionInstance(context),
  };
}
