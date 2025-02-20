// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactContext } from "../../api/impactContext.js";
import {
  WorkloadImpactsListBySubscriptionOptionalParams,
  WorkloadImpactsDeleteOptionalParams,
  WorkloadImpactsGetOptionalParams,
  WorkloadImpactsCreateOptionalParams,
} from "../../api/options.js";
import {
  workloadImpactsListBySubscription,
  workloadImpactsDelete,
  workloadImpactsGet,
  workloadImpactsCreate,
} from "../../api/workloadImpacts/index.js";
import { WorkloadImpact } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WorkloadImpacts operations. */
export interface WorkloadImpactsOperations {
  /** List WorkloadImpact resources by subscription ID */
  listBySubscription: (
    options?: WorkloadImpactsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadImpact>;
  /** Delete a WorkloadImpact */
  delete: (
    workloadImpactName: string,
    options?: WorkloadImpactsDeleteOptionalParams,
  ) => Promise<void>;
  /** Get a WorkloadImpact */
  get: (
    workloadImpactName: string,
    options?: WorkloadImpactsGetOptionalParams,
  ) => Promise<WorkloadImpact>;
  /** Create a WorkloadImpact */
  create: (
    workloadImpactName: string,
    resource: WorkloadImpact,
    options?: WorkloadImpactsCreateOptionalParams,
  ) => PollerLike<OperationState<WorkloadImpact>, WorkloadImpact>;
}

function _getWorkloadImpacts(context: ImpactContext) {
  return {
    listBySubscription: (options?: WorkloadImpactsListBySubscriptionOptionalParams) =>
      workloadImpactsListBySubscription(context, options),
    delete: (workloadImpactName: string, options?: WorkloadImpactsDeleteOptionalParams) =>
      workloadImpactsDelete(context, workloadImpactName, options),
    get: (workloadImpactName: string, options?: WorkloadImpactsGetOptionalParams) =>
      workloadImpactsGet(context, workloadImpactName, options),
    create: (
      workloadImpactName: string,
      resource: WorkloadImpact,
      options?: WorkloadImpactsCreateOptionalParams,
    ) => workloadImpactsCreate(context, workloadImpactName, resource, options),
  };
}

export function _getWorkloadImpactsOperations(context: ImpactContext): WorkloadImpactsOperations {
  return {
    ..._getWorkloadImpacts(context),
  };
}
