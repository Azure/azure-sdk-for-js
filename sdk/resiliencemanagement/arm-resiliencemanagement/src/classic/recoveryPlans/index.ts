// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext } from "../../api/azureResilienceManagementContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/recoveryPlans/operations.js";
import {
  RecoveryPlansListOptionalParams,
  RecoveryPlansDeleteOptionalParams,
  RecoveryPlansUpdateOptionalParams,
  RecoveryPlansCreateOrUpdateOptionalParams,
  RecoveryPlansGetOptionalParams,
} from "../../api/recoveryPlans/options.js";
import { RecoveryPlan } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RecoveryPlans operations. */
export interface RecoveryPlansOperations {
  /** List RecoveryPlan resources by tenant */
  list: (
    serviceGroupName: string,
    options?: RecoveryPlansListOptionalParams,
  ) => PagedAsyncIterableIterator<RecoveryPlan>;
  /** Delete a RecoveryPlan */
  delete: (
    serviceGroupName: string,
    recoveryPlanName: string,
    options?: RecoveryPlansDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    serviceGroupName: string,
    recoveryPlanName: string,
    options?: RecoveryPlansDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    serviceGroupName: string,
    recoveryPlanName: string,
    options?: RecoveryPlansDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a RecoveryPlan */
  update: (
    serviceGroupName: string,
    recoveryPlanName: string,
    properties: RecoveryPlan,
    options?: RecoveryPlansUpdateOptionalParams,
  ) => PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
  /** @deprecated use update instead */
  beginUpdate: (
    serviceGroupName: string,
    recoveryPlanName: string,
    properties: RecoveryPlan,
    options?: RecoveryPlansUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RecoveryPlan>, RecoveryPlan>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    serviceGroupName: string,
    recoveryPlanName: string,
    properties: RecoveryPlan,
    options?: RecoveryPlansUpdateOptionalParams,
  ) => Promise<RecoveryPlan>;
  /** Create a RecoveryPlan */
  createOrUpdate: (
    serviceGroupName: string,
    recoveryPlanName: string,
    resource: RecoveryPlan,
    options?: RecoveryPlansCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    serviceGroupName: string,
    recoveryPlanName: string,
    resource: RecoveryPlan,
    options?: RecoveryPlansCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RecoveryPlan>, RecoveryPlan>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    serviceGroupName: string,
    recoveryPlanName: string,
    resource: RecoveryPlan,
    options?: RecoveryPlansCreateOrUpdateOptionalParams,
  ) => Promise<RecoveryPlan>;
  /** Get a RecoveryPlan */
  get: (
    serviceGroupName: string,
    recoveryPlanName: string,
    options?: RecoveryPlansGetOptionalParams,
  ) => Promise<RecoveryPlan>;
}

function _getRecoveryPlans(context: AzureResilienceManagementContext) {
  return {
    list: (serviceGroupName: string, options?: RecoveryPlansListOptionalParams) =>
      list(context, serviceGroupName, options),
    delete: (
      serviceGroupName: string,
      recoveryPlanName: string,
      options?: RecoveryPlansDeleteOptionalParams,
    ) => $delete(context, serviceGroupName, recoveryPlanName, options),
    beginDelete: async (
      serviceGroupName: string,
      recoveryPlanName: string,
      options?: RecoveryPlansDeleteOptionalParams,
    ) => {
      const poller = $delete(context, serviceGroupName, recoveryPlanName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      serviceGroupName: string,
      recoveryPlanName: string,
      options?: RecoveryPlansDeleteOptionalParams,
    ) => {
      return await $delete(context, serviceGroupName, recoveryPlanName, options);
    },
    update: (
      serviceGroupName: string,
      recoveryPlanName: string,
      properties: RecoveryPlan,
      options?: RecoveryPlansUpdateOptionalParams,
    ) => update(context, serviceGroupName, recoveryPlanName, properties, options),
    beginUpdate: async (
      serviceGroupName: string,
      recoveryPlanName: string,
      properties: RecoveryPlan,
      options?: RecoveryPlansUpdateOptionalParams,
    ) => {
      const poller = update(context, serviceGroupName, recoveryPlanName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      serviceGroupName: string,
      recoveryPlanName: string,
      properties: RecoveryPlan,
      options?: RecoveryPlansUpdateOptionalParams,
    ) => {
      return await update(context, serviceGroupName, recoveryPlanName, properties, options);
    },
    createOrUpdate: (
      serviceGroupName: string,
      recoveryPlanName: string,
      resource: RecoveryPlan,
      options?: RecoveryPlansCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, serviceGroupName, recoveryPlanName, resource, options),
    beginCreateOrUpdate: async (
      serviceGroupName: string,
      recoveryPlanName: string,
      resource: RecoveryPlan,
      options?: RecoveryPlansCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, serviceGroupName, recoveryPlanName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      serviceGroupName: string,
      recoveryPlanName: string,
      resource: RecoveryPlan,
      options?: RecoveryPlansCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, serviceGroupName, recoveryPlanName, resource, options);
    },
    get: (
      serviceGroupName: string,
      recoveryPlanName: string,
      options?: RecoveryPlansGetOptionalParams,
    ) => get(context, serviceGroupName, recoveryPlanName, options),
  };
}

export function _getRecoveryPlansOperations(
  context: AzureResilienceManagementContext,
): RecoveryPlansOperations {
  return {
    ..._getRecoveryPlans(context),
  };
}
