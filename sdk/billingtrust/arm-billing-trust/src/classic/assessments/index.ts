// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingTrustContext } from "../../api/billingTrustContext.js";
import {
  listUploadToken,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/assessments/operations.js";
import type {
  AssessmentsListUploadTokenOptionalParams,
  AssessmentsListOptionalParams,
  AssessmentsDeleteOptionalParams,
  AssessmentsCreateOrUpdateOptionalParams,
  AssessmentsGetOptionalParams,
} from "../../api/assessments/options.js";
import type { Assessment, GenerateUploadTokenResponse } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Assessments operations. */
export interface AssessmentsOperations {
  /** Request a time-bound, principal-bound upload token for supplemental document uploads. */
  listUploadToken: (
    resourceUri: string,
    options?: AssessmentsListUploadTokenOptionalParams,
  ) => Promise<GenerateUploadTokenResponse>;
  /** List Assessment resources by parent */
  list: (
    resourceUri: string,
    options?: AssessmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<Assessment>;
  /** Delete an assessment. Long-running operation — returns 202 + 204 + default with `Azure-AsyncOperation` (preferred) and `Location` polling headers. */
  delete: (
    resourceUri: string,
    options?: AssessmentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update an Assessment. Long-running operation — returns 200 (replace) or 201 (create) with the `Azure-AsyncOperation` polling header on both responses. */
  createOrUpdate: (
    resourceUri: string,
    resource: Assessment,
    options?: AssessmentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get a Assessment */
  get: (resourceUri: string, options?: AssessmentsGetOptionalParams) => Promise<Assessment>;
}

function _getAssessments(context: BillingTrustContext) {
  return {
    listUploadToken: (resourceUri: string, options?: AssessmentsListUploadTokenOptionalParams) =>
      listUploadToken(context, resourceUri, options),
    list: (resourceUri: string, options?: AssessmentsListOptionalParams) =>
      list(context, resourceUri, options),
    delete: (resourceUri: string, options?: AssessmentsDeleteOptionalParams) =>
      $delete(context, resourceUri, options),
    createOrUpdate: (
      resourceUri: string,
      resource: Assessment,
      options?: AssessmentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceUri, resource, options),
    get: (resourceUri: string, options?: AssessmentsGetOptionalParams) =>
      get(context, resourceUri, options),
  };
}

export function _getAssessmentsOperations(context: BillingTrustContext): AssessmentsOperations {
  return {
    ..._getAssessments(context),
  };
}
