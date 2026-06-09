// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AdvisorManagementContext } from "../../api/advisorManagementContext.js";
import { list, $delete, put, get } from "../../api/assessments/operations.js";
import type {
  AssessmentsListOptionalParams,
  AssessmentsDeleteOptionalParams,
  AssessmentsPutOptionalParams,
  AssessmentsGetOptionalParams,
} from "../../api/assessments/options.js";
import type { AssessmentResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Assessments operations. */
export interface AssessmentsOperations {
  /** Get list of Azure Advisor assessments. */
  list: (options?: AssessmentsListOptionalParams) => PagedAsyncIterableIterator<AssessmentResult>;
  /** Delete an existing Azure Advisor assessment. */
  delete: (assessmentName: string, options?: AssessmentsDeleteOptionalParams) => Promise<void>;
  /** Create or Overwrite Azure Advisor assessment. */
  put: (
    assessmentName: string,
    assessmentContract: AssessmentResult,
    options?: AssessmentsPutOptionalParams,
  ) => Promise<AssessmentResult>;
  /** Get an existing Azure Advisor assessment. */
  get: (
    assessmentName: string,
    options?: AssessmentsGetOptionalParams,
  ) => Promise<AssessmentResult>;
}

function _getAssessments(context: AdvisorManagementContext) {
  return {
    list: (options?: AssessmentsListOptionalParams) => list(context, options),
    delete: (assessmentName: string, options?: AssessmentsDeleteOptionalParams) =>
      $delete(context, assessmentName, options),
    put: (
      assessmentName: string,
      assessmentContract: AssessmentResult,
      options?: AssessmentsPutOptionalParams,
    ) => put(context, assessmentName, assessmentContract, options),
    get: (assessmentName: string, options?: AssessmentsGetOptionalParams) =>
      get(context, assessmentName, options),
  };
}

export function _getAssessmentsOperations(
  context: AdvisorManagementContext,
): AssessmentsOperations {
  return {
    ..._getAssessments(context),
  };
}
