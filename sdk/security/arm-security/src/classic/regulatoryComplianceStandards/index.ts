// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, get } from "../../api/regulatoryComplianceStandards/operations.js";
import type {
  RegulatoryComplianceStandardsListOptionalParams,
  RegulatoryComplianceStandardsGetOptionalParams,
} from "../../api/regulatoryComplianceStandards/options.js";
import type { RegulatoryComplianceStandard } from "../../models/regulatoryComplianceAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RegulatoryComplianceStandards operations. */
export interface RegulatoryComplianceStandardsOperations {
  /** Supported regulatory compliance standards details and state */
  list: (
    options?: RegulatoryComplianceStandardsListOptionalParams,
  ) => PagedAsyncIterableIterator<RegulatoryComplianceStandard>;
  /** Supported regulatory compliance details state for selected standard */
  get: (
    regulatoryComplianceStandardName: string,
    options?: RegulatoryComplianceStandardsGetOptionalParams,
  ) => Promise<RegulatoryComplianceStandard>;
}

function _getRegulatoryComplianceStandards(context: SecurityCenterContext) {
  return {
    list: (options?: RegulatoryComplianceStandardsListOptionalParams) => list(context, options),
    get: (
      regulatoryComplianceStandardName: string,
      options?: RegulatoryComplianceStandardsGetOptionalParams,
    ) => get(context, regulatoryComplianceStandardName, options),
  };
}

export function _getRegulatoryComplianceStandardsOperations(
  context: SecurityCenterContext,
): RegulatoryComplianceStandardsOperations {
  return {
    ..._getRegulatoryComplianceStandards(context),
  };
}
