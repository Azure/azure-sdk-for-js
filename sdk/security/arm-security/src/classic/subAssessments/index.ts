// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { listAll, list, get } from "../../api/subAssessments/operations.js";
import type {
  SubAssessmentsListAllOptionalParams,
  SubAssessmentsListOptionalParams,
  SubAssessmentsGetOptionalParams,
} from "../../api/subAssessments/options.js";
import type { SecuritySubAssessment } from "../../models/subAssessmentsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SubAssessments operations. */
export interface SubAssessmentsOperations {
  /** Get security sub-assessments on all your scanned resources inside a subscription scope */
  listAll: (
    scope: string,
    options?: SubAssessmentsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<SecuritySubAssessment>;
  /** Get security sub-assessments on all your scanned resources inside a scope */
  list: (
    scope: string,
    assessmentName: string,
    options?: SubAssessmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecuritySubAssessment>;
  /** Get a security sub-assessment on your scanned resource */
  get: (
    scope: string,
    assessmentName: string,
    subAssessmentName: string,
    options?: SubAssessmentsGetOptionalParams,
  ) => Promise<SecuritySubAssessment>;
}

function _getSubAssessments(context: SecurityCenterContext) {
  return {
    listAll: (scope: string, options?: SubAssessmentsListAllOptionalParams) =>
      listAll(context, scope, options),
    list: (scope: string, assessmentName: string, options?: SubAssessmentsListOptionalParams) =>
      list(context, scope, assessmentName, options),
    get: (
      scope: string,
      assessmentName: string,
      subAssessmentName: string,
      options?: SubAssessmentsGetOptionalParams,
    ) => get(context, scope, assessmentName, subAssessmentName, options),
  };
}

export function _getSubAssessmentsOperations(
  context: SecurityCenterContext,
): SubAssessmentsOperations {
  return {
    ..._getSubAssessments(context),
  };
}
