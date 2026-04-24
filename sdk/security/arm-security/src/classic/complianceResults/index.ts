// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, get } from "../../api/complianceResults/operations.js";
import type {
  ComplianceResultsListOptionalParams,
  ComplianceResultsGetOptionalParams,
} from "../../api/complianceResults/options.js";
import type { ComplianceResultsAPIComplianceResult } from "../../models/complianceResultsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ComplianceResults operations. */
export interface ComplianceResultsOperations {
  /** Security compliance results in the subscription */
  list: (
    scope: string,
    options?: ComplianceResultsListOptionalParams,
  ) => PagedAsyncIterableIterator<ComplianceResultsAPIComplianceResult>;
  /** Security Compliance Result */
  get: (
    resourceId: string,
    complianceResultName: string,
    options?: ComplianceResultsGetOptionalParams,
  ) => Promise<ComplianceResultsAPIComplianceResult>;
}

function _getComplianceResults(context: SecurityCenterContext) {
  return {
    list: (scope: string, options?: ComplianceResultsListOptionalParams) =>
      list(context, scope, options),
    get: (
      resourceId: string,
      complianceResultName: string,
      options?: ComplianceResultsGetOptionalParams,
    ) => get(context, resourceId, complianceResultName, options),
  };
}

export function _getComplianceResultsOperations(
  context: SecurityCenterContext,
): ComplianceResultsOperations {
  return {
    ..._getComplianceResults(context),
  };
}
