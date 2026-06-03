// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext } from "../../api/azureResilienceManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/enrollments/operations.js";
import {
  EnrollmentsListOptionalParams,
  EnrollmentsDeleteOptionalParams,
  EnrollmentsCreateOrUpdateOptionalParams,
  EnrollmentsGetOptionalParams,
} from "../../api/enrollments/options.js";
import { Enrollment } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Enrollments operations. */
export interface EnrollmentsOperations {
  /** List Enrollments by Usage Plan. */
  list: (
    resourceGroupName: string,
    usagePlanName: string,
    options?: EnrollmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<Enrollment>;
  /** Delete an Enrollment. */
  delete: (
    resourceGroupName: string,
    usagePlanName: string,
    enrollmentName: string,
    options?: EnrollmentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    usagePlanName: string,
    enrollmentName: string,
    options?: EnrollmentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    usagePlanName: string,
    enrollmentName: string,
    options?: EnrollmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update an Enrollment. */
  createOrUpdate: (
    resourceGroupName: string,
    usagePlanName: string,
    enrollmentName: string,
    resource: Enrollment,
    options?: EnrollmentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Enrollment>, Enrollment>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    usagePlanName: string,
    enrollmentName: string,
    resource: Enrollment,
    options?: EnrollmentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Enrollment>, Enrollment>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    usagePlanName: string,
    enrollmentName: string,
    resource: Enrollment,
    options?: EnrollmentsCreateOrUpdateOptionalParams,
  ) => Promise<Enrollment>;
  /** Get an Enrollment. */
  get: (
    resourceGroupName: string,
    usagePlanName: string,
    enrollmentName: string,
    options?: EnrollmentsGetOptionalParams,
  ) => Promise<Enrollment>;
}

function _getEnrollments(context: AzureResilienceManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      usagePlanName: string,
      options?: EnrollmentsListOptionalParams,
    ) => list(context, resourceGroupName, usagePlanName, options),
    delete: (
      resourceGroupName: string,
      usagePlanName: string,
      enrollmentName: string,
      options?: EnrollmentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, usagePlanName, enrollmentName, options),
    beginDelete: async (
      resourceGroupName: string,
      usagePlanName: string,
      enrollmentName: string,
      options?: EnrollmentsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, usagePlanName, enrollmentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      usagePlanName: string,
      enrollmentName: string,
      options?: EnrollmentsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, usagePlanName, enrollmentName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      usagePlanName: string,
      enrollmentName: string,
      resource: Enrollment,
      options?: EnrollmentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, usagePlanName, enrollmentName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      usagePlanName: string,
      enrollmentName: string,
      resource: Enrollment,
      options?: EnrollmentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        usagePlanName,
        enrollmentName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      usagePlanName: string,
      enrollmentName: string,
      resource: Enrollment,
      options?: EnrollmentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        usagePlanName,
        enrollmentName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      usagePlanName: string,
      enrollmentName: string,
      options?: EnrollmentsGetOptionalParams,
    ) => get(context, resourceGroupName, usagePlanName, enrollmentName, options),
  };
}

export function _getEnrollmentsOperations(
  context: AzureResilienceManagementContext,
): EnrollmentsOperations {
  return {
    ..._getEnrollments(context),
  };
}
