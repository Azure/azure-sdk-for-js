// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContentStoreContext } from "../../api/contentStoreContext.js";
import { listByCloudAccount, $delete, createOrupdate, get } from "../../api/plans/operations.js";
import type {
  PlansListByCloudAccountOptionalParams,
  PlansDeleteOptionalParams,
  PlansCreateOrupdateOptionalParams,
  PlansGetOptionalParams,
} from "../../api/plans/options.js";
import type { CommvaultPlan } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Plans operations. */
export interface PlansOperations {
  /** List CommvaultPlan resources by CloudAccount */
  listByCloudAccount: (
    resourceGroupName: string,
    cloudAccountName: string,
    options?: PlansListByCloudAccountOptionalParams,
  ) => PagedAsyncIterableIterator<CommvaultPlan>;
  /** Delete a CommvaultPlan */
  delete: (
    resourceGroupName: string,
    cloudAccountName: string,
    planName: string,
    options?: PlansDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a CommvaultPlan */
  createOrupdate: (
    resourceGroupName: string,
    cloudAccountName: string,
    planName: string,
    resource: CommvaultPlan,
    options?: PlansCreateOrupdateOptionalParams,
  ) => PollerLike<OperationState<CommvaultPlan>, CommvaultPlan>;
  /** Get a CommvaultPlan */
  get: (
    resourceGroupName: string,
    cloudAccountName: string,
    planName: string,
    options?: PlansGetOptionalParams,
  ) => Promise<CommvaultPlan>;
}

function _getPlans(context: ContentStoreContext) {
  return {
    listByCloudAccount: (
      resourceGroupName: string,
      cloudAccountName: string,
      options?: PlansListByCloudAccountOptionalParams,
    ) => listByCloudAccount(context, resourceGroupName, cloudAccountName, options),
    delete: (
      resourceGroupName: string,
      cloudAccountName: string,
      planName: string,
      options?: PlansDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cloudAccountName, planName, options),
    createOrupdate: (
      resourceGroupName: string,
      cloudAccountName: string,
      planName: string,
      resource: CommvaultPlan,
      options?: PlansCreateOrupdateOptionalParams,
    ) => createOrupdate(context, resourceGroupName, cloudAccountName, planName, resource, options),
    get: (
      resourceGroupName: string,
      cloudAccountName: string,
      planName: string,
      options?: PlansGetOptionalParams,
    ) => get(context, resourceGroupName, cloudAccountName, planName, options),
  };
}

export function _getPlansOperations(context: ContentStoreContext): PlansOperations {
  return {
    ..._getPlans(context),
  };
}
