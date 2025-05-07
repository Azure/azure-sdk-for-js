// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskContext } from "../../api/durableTaskContext.js";
import { RetentionPolicy } from "../../models/models.js";
import {
  RetentionPoliciesListBySchedulerOptionalParams,
  RetentionPoliciesDeleteOptionalParams,
  RetentionPoliciesUpdateOptionalParams,
  RetentionPoliciesCreateOrReplaceOptionalParams,
  RetentionPoliciesGetOptionalParams,
} from "../../api/retentionPolicies/options.js";
import {
  listByScheduler,
  $delete,
  update,
  createOrReplace,
  get,
} from "../../api/retentionPolicies/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RetentionPolicies operations. */
export interface RetentionPoliciesOperations {
  /** List Retention Policies */
  listByScheduler: (
    resourceGroupName: string,
    schedulerName: string,
    options?: RetentionPoliciesListBySchedulerOptionalParams,
  ) => PagedAsyncIterableIterator<RetentionPolicy>;
  /** Delete a Retention Policy */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    schedulerName: string,
    options?: RetentionPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Retention Policy */
  update: (
    resourceGroupName: string,
    schedulerName: string,
    properties: RetentionPolicy,
    options?: RetentionPoliciesUpdateOptionalParams,
  ) => PollerLike<OperationState<RetentionPolicy>, RetentionPolicy>;
  /** Create or Update a Retention Policy */
  createOrReplace: (
    resourceGroupName: string,
    schedulerName: string,
    resource: RetentionPolicy,
    options?: RetentionPoliciesCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<RetentionPolicy>, RetentionPolicy>;
  /** Get a Retention Policy */
  get: (
    resourceGroupName: string,
    schedulerName: string,
    options?: RetentionPoliciesGetOptionalParams,
  ) => Promise<RetentionPolicy>;
}

function _getRetentionPolicies(context: DurableTaskContext) {
  return {
    listByScheduler: (
      resourceGroupName: string,
      schedulerName: string,
      options?: RetentionPoliciesListBySchedulerOptionalParams,
    ) => listByScheduler(context, resourceGroupName, schedulerName, options),
    delete: (
      resourceGroupName: string,
      schedulerName: string,
      options?: RetentionPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, schedulerName, options),
    update: (
      resourceGroupName: string,
      schedulerName: string,
      properties: RetentionPolicy,
      options?: RetentionPoliciesUpdateOptionalParams,
    ) => update(context, resourceGroupName, schedulerName, properties, options),
    createOrReplace: (
      resourceGroupName: string,
      schedulerName: string,
      resource: RetentionPolicy,
      options?: RetentionPoliciesCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, resourceGroupName, schedulerName, resource, options),
    get: (
      resourceGroupName: string,
      schedulerName: string,
      options?: RetentionPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, schedulerName, options),
  };
}

export function _getRetentionPoliciesOperations(
  context: DurableTaskContext,
): RetentionPoliciesOperations {
  return {
    ..._getRetentionPolicies(context),
  };
}
