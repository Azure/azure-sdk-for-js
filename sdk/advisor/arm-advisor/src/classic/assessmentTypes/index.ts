// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AdvisorManagementContext } from "../../api/advisorManagementContext.js";
import { list } from "../../api/assessmentTypes/operations.js";
import type { AssessmentTypesListOptionalParams } from "../../api/assessmentTypes/options.js";
import type { AssessmentTypeResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AssessmentTypes operations. */
export interface AssessmentTypesOperations {
  /** Get list of Azure Advisor assessment types. */
  list: (
    options?: AssessmentTypesListOptionalParams,
  ) => PagedAsyncIterableIterator<AssessmentTypeResult>;
}

function _getAssessmentTypes(context: AdvisorManagementContext) {
  return {
    list: (options?: AssessmentTypesListOptionalParams) => list(context, options),
  };
}

export function _getAssessmentTypesOperations(
  context: AdvisorManagementContext,
): AssessmentTypesOperations {
  return {
    ..._getAssessmentTypes(context),
  };
}
