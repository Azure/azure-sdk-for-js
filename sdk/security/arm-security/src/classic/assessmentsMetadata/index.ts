// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import {
  list,
  get,
  listBySubscription,
  deleteInSubscription,
  createInSubscription,
  getInSubscription,
} from "../../api/assessmentsMetadata/operations.js";
import type {
  AssessmentsMetadataListOptionalParams,
  AssessmentsMetadataGetOptionalParams,
  AssessmentsMetadataListBySubscriptionOptionalParams,
  AssessmentsMetadataDeleteInSubscriptionOptionalParams,
  AssessmentsMetadataCreateInSubscriptionOptionalParams,
  AssessmentsMetadataGetInSubscriptionOptionalParams,
} from "../../api/assessmentsMetadata/options.js";
import type { AssessmentAPISecurityAssessmentMetadataResponse } from "../../models/assessmentAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AssessmentsMetadata operations. */
export interface AssessmentsMetadataOperations {
  /** Get metadata information on all assessment types */
  list: (
    options?: AssessmentsMetadataListOptionalParams,
  ) => PagedAsyncIterableIterator<AssessmentAPISecurityAssessmentMetadataResponse>;
  /** Get metadata information on an assessment type */
  get: (
    assessmentMetadataName: string,
    options?: AssessmentsMetadataGetOptionalParams,
  ) => Promise<AssessmentAPISecurityAssessmentMetadataResponse>;
  /** Get metadata information on all assessment types in a specific subscription */
  listBySubscription: (
    options?: AssessmentsMetadataListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AssessmentAPISecurityAssessmentMetadataResponse>;
  /** Delete metadata information on an assessment type in a specific subscription, will cause the deletion of all the assessments of that type in that subscription */
  deleteInSubscription: (
    assessmentMetadataName: string,
    options?: AssessmentsMetadataDeleteInSubscriptionOptionalParams,
  ) => Promise<void>;
  /** Create metadata information on an assessment type in a specific subscription */
  createInSubscription: (
    assessmentMetadataName: string,
    assessmentMetadata: AssessmentAPISecurityAssessmentMetadataResponse,
    options?: AssessmentsMetadataCreateInSubscriptionOptionalParams,
  ) => Promise<AssessmentAPISecurityAssessmentMetadataResponse>;
  /** Get metadata information on an assessment type in a specific subscription */
  getInSubscription: (
    assessmentMetadataName: string,
    options?: AssessmentsMetadataGetInSubscriptionOptionalParams,
  ) => Promise<AssessmentAPISecurityAssessmentMetadataResponse>;
}

function _getAssessmentsMetadata(context: SecurityCenterContext) {
  return {
    list: (options?: AssessmentsMetadataListOptionalParams) => list(context, options),
    get: (assessmentMetadataName: string, options?: AssessmentsMetadataGetOptionalParams) =>
      get(context, assessmentMetadataName, options),
    listBySubscription: (options?: AssessmentsMetadataListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    deleteInSubscription: (
      assessmentMetadataName: string,
      options?: AssessmentsMetadataDeleteInSubscriptionOptionalParams,
    ) => deleteInSubscription(context, assessmentMetadataName, options),
    createInSubscription: (
      assessmentMetadataName: string,
      assessmentMetadata: AssessmentAPISecurityAssessmentMetadataResponse,
      options?: AssessmentsMetadataCreateInSubscriptionOptionalParams,
    ) => createInSubscription(context, assessmentMetadataName, assessmentMetadata, options),
    getInSubscription: (
      assessmentMetadataName: string,
      options?: AssessmentsMetadataGetInSubscriptionOptionalParams,
    ) => getInSubscription(context, assessmentMetadataName, options),
  };
}

export function _getAssessmentsMetadataOperations(
  context: SecurityCenterContext,
): AssessmentsMetadataOperations {
  return {
    ..._getAssessmentsMetadata(context),
  };
}
