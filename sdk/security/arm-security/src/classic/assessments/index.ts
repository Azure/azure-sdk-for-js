// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/assessments/operations.js";
import type {
  AssessmentsListOptionalParams,
  AssessmentsDeleteOptionalParams,
  AssessmentsCreateOrUpdateOptionalParams,
  AssessmentsGetOptionalParams,
} from "../../api/assessments/options.js";
import type {
  AssessmentAPISecurityAssessmentResponse,
  AssessmentAPISecurityAssessment,
} from "../../models/assessmentAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Assessments operations. */
export interface AssessmentsOperations {
  /** Get security assessments on all your scanned resources inside a scope */
  list: (
    scope: string,
    options?: AssessmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<AssessmentAPISecurityAssessmentResponse>;
  /** Delete a security assessment on your resource. An assessment metadata that describes this assessment must be predefined with the same name before inserting the assessment result */
  delete: (
    resourceId: string,
    assessmentName: string,
    options?: AssessmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a security assessment on your resource. An assessment metadata that describes this assessment must be predefined with the same name before inserting the assessment result */
  createOrUpdate: (
    resourceId: string,
    assessmentName: string,
    assessment: AssessmentAPISecurityAssessment,
    options?: AssessmentsCreateOrUpdateOptionalParams,
  ) => Promise<AssessmentAPISecurityAssessmentResponse>;
  /** Get a security assessment on your scanned resource */
  get: (
    resourceId: string,
    assessmentName: string,
    options?: AssessmentsGetOptionalParams,
  ) => Promise<AssessmentAPISecurityAssessmentResponse>;
}

function _getAssessments(context: SecurityCenterContext) {
  return {
    list: (scope: string, options?: AssessmentsListOptionalParams) => list(context, scope, options),
    delete: (
      resourceId: string,
      assessmentName: string,
      options?: AssessmentsDeleteOptionalParams,
    ) => $delete(context, resourceId, assessmentName, options),
    createOrUpdate: (
      resourceId: string,
      assessmentName: string,
      assessment: AssessmentAPISecurityAssessment,
      options?: AssessmentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceId, assessmentName, assessment, options),
    get: (resourceId: string, assessmentName: string, options?: AssessmentsGetOptionalParams) =>
      get(context, resourceId, assessmentName, options),
  };
}

export function _getAssessmentsOperations(context: SecurityCenterContext): AssessmentsOperations {
  return {
    ..._getAssessments(context),
  };
}
