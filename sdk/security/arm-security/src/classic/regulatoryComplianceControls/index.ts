// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, get } from "../../api/regulatoryComplianceControls/operations.js";
import type {
  RegulatoryComplianceControlsListOptionalParams,
  RegulatoryComplianceControlsGetOptionalParams,
} from "../../api/regulatoryComplianceControls/options.js";
import type { RegulatoryComplianceAPIRegulatoryComplianceControl } from "../../models/regulatoryComplianceAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RegulatoryComplianceControls operations. */
export interface RegulatoryComplianceControlsOperations {
  /** All supported regulatory compliance controls details and state for selected standard */
  list: (
    regulatoryComplianceStandardName: string,
    options?: RegulatoryComplianceControlsListOptionalParams,
  ) => PagedAsyncIterableIterator<RegulatoryComplianceAPIRegulatoryComplianceControl>;
  /** Selected regulatory compliance control details and state */
  get: (
    regulatoryComplianceStandardName: string,
    regulatoryComplianceControlName: string,
    options?: RegulatoryComplianceControlsGetOptionalParams,
  ) => Promise<RegulatoryComplianceAPIRegulatoryComplianceControl>;
}

function _getRegulatoryComplianceControls(context: SecurityCenterContext) {
  return {
    list: (
      regulatoryComplianceStandardName: string,
      options?: RegulatoryComplianceControlsListOptionalParams,
    ) => list(context, regulatoryComplianceStandardName, options),
    get: (
      regulatoryComplianceStandardName: string,
      regulatoryComplianceControlName: string,
      options?: RegulatoryComplianceControlsGetOptionalParams,
    ) => get(context, regulatoryComplianceStandardName, regulatoryComplianceControlName, options),
  };
}

export function _getRegulatoryComplianceControlsOperations(
  context: SecurityCenterContext,
): RegulatoryComplianceControlsOperations {
  return {
    ..._getRegulatoryComplianceControls(context),
  };
}
