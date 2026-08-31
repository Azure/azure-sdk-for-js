// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProgramEnrollmentContext } from "../../api/programEnrollmentContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/eduEnrollments/operations.js";
import type {
  EduEnrollmentsListBySubscriptionOptionalParams,
  EduEnrollmentsListByResourceGroupOptionalParams,
  EduEnrollmentsDeleteOptionalParams,
  EduEnrollmentsUpdateOptionalParams,
  EduEnrollmentsCreateOrUpdateOptionalParams,
  EduEnrollmentsGetOptionalParams,
} from "../../api/eduEnrollments/options.js";
import type { EduEnrollment, EduEnrollmentPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EduEnrollments operations. */
export interface EduEnrollmentsOperations {
  /** Lists the edu enrollments in a subscription. */
  listBySubscription: (
    options?: EduEnrollmentsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<EduEnrollment>;
  /** Lists the edu enrollments in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: EduEnrollmentsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<EduEnrollment>;
  /** Deletes the specified edu enrollment. */
  delete: (
    resourceGroupName: string,
    enrollmentName: string,
    options?: EduEnrollmentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the specified edu enrollment. */
  update: (
    resourceGroupName: string,
    enrollmentName: string,
    properties: EduEnrollmentPatch,
    options?: EduEnrollmentsUpdateOptionalParams,
  ) => Promise<EduEnrollment>;
  /** Creates or updates the specified edu enrollment. */
  createOrUpdate: (
    resourceGroupName: string,
    enrollmentName: string,
    resource: EduEnrollment,
    options?: EduEnrollmentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EduEnrollment>, EduEnrollment>;
  /** Gets the specified edu enrollment. */
  get: (
    resourceGroupName: string,
    enrollmentName: string,
    options?: EduEnrollmentsGetOptionalParams,
  ) => Promise<EduEnrollment>;
}

function _getEduEnrollments(context: ProgramEnrollmentContext) {
  return {
    listBySubscription: (options?: EduEnrollmentsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: EduEnrollmentsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      enrollmentName: string,
      options?: EduEnrollmentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, enrollmentName, options),
    update: (
      resourceGroupName: string,
      enrollmentName: string,
      properties: EduEnrollmentPatch,
      options?: EduEnrollmentsUpdateOptionalParams,
    ) => update(context, resourceGroupName, enrollmentName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      enrollmentName: string,
      resource: EduEnrollment,
      options?: EduEnrollmentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, enrollmentName, resource, options),
    get: (
      resourceGroupName: string,
      enrollmentName: string,
      options?: EduEnrollmentsGetOptionalParams,
    ) => get(context, resourceGroupName, enrollmentName, options),
  };
}

export function _getEduEnrollmentsOperations(
  context: ProgramEnrollmentContext,
): EduEnrollmentsOperations {
  return {
    ..._getEduEnrollments(context),
  };
}
