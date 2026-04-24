// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, get } from "../../api/regulatoryComplianceAssessments/operations.js";
import type {
  RegulatoryComplianceAssessmentsListOptionalParams,
  RegulatoryComplianceAssessmentsGetOptionalParams,
} from "../../api/regulatoryComplianceAssessments/options.js";
import type { RegulatoryComplianceAPIRegulatoryComplianceAssessment } from "../../models/regulatoryComplianceAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RegulatoryComplianceAssessments operations. */
export interface RegulatoryComplianceAssessmentsOperations {
  /** Details and state of assessments mapped to selected regulatory compliance control */
  list: (
    regulatoryComplianceStandardName: string,
    regulatoryComplianceControlName: string,
    options?: RegulatoryComplianceAssessmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<RegulatoryComplianceAPIRegulatoryComplianceAssessment>;
  /** Supported regulatory compliance details and state for selected assessment */
  get: (
    regulatoryComplianceStandardName: string,
    regulatoryComplianceControlName: string,
    regulatoryComplianceAssessmentName: string,
    options?: RegulatoryComplianceAssessmentsGetOptionalParams,
  ) => Promise<RegulatoryComplianceAPIRegulatoryComplianceAssessment>;
}

function _getRegulatoryComplianceAssessments(context: SecurityCenterContext) {
  return {
    list: (
      regulatoryComplianceStandardName: string,
      regulatoryComplianceControlName: string,
      options?: RegulatoryComplianceAssessmentsListOptionalParams,
    ) => list(context, regulatoryComplianceStandardName, regulatoryComplianceControlName, options),
    get: (
      regulatoryComplianceStandardName: string,
      regulatoryComplianceControlName: string,
      regulatoryComplianceAssessmentName: string,
      options?: RegulatoryComplianceAssessmentsGetOptionalParams,
    ) =>
      get(
        context,
        regulatoryComplianceStandardName,
        regulatoryComplianceControlName,
        regulatoryComplianceAssessmentName,
        options,
      ),
  };
}

export function _getRegulatoryComplianceAssessmentsOperations(
  context: SecurityCenterContext,
): RegulatoryComplianceAssessmentsOperations {
  return {
    ..._getRegulatoryComplianceAssessments(context),
  };
}
