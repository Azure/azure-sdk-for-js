// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProgramEnrollmentContext } from "../../api/programEnrollmentContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/eduEnrollments/operations.js";
import {
  EduEnrollmentsListBySubscriptionOptionalParams,
  EduEnrollmentsListByResourceGroupOptionalParams,
  EduEnrollmentsDeleteOptionalParams,
  EduEnrollmentsUpdateOptionalParams,
  EduEnrollmentsCreateOrUpdateOptionalParams,
  EduEnrollmentsGetOptionalParams,
} from "../../api/eduEnrollments/options.js";
import { EduEnrollment, EduEnrollmentPatch } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EduEnrollments operations. */
export interface EduEnrollmentsOperations {
  /** List EduEnrollment resources by subscription ID */
  listBySubscription: (
    options?: EduEnrollmentsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<EduEnrollment>;
  /** List EduEnrollment resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: EduEnrollmentsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<EduEnrollment>;
  /** Delete a EduEnrollment */
  delete: (
    resourceGroupName: string,
    enrollmentName: string,
    options?: EduEnrollmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a EduEnrollment */
  update: (
    resourceGroupName: string,
    enrollmentName: string,
    properties: EduEnrollmentPatch,
    options?: EduEnrollmentsUpdateOptionalParams,
  ) => Promise<EduEnrollment>;
  /** Create a EduEnrollment */
  createOrUpdate: (
    resourceGroupName: string,
    enrollmentName: string,
    resource: EduEnrollment,
    options?: EduEnrollmentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EduEnrollment>, EduEnrollment>;
  /** Get a EduEnrollment */
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
