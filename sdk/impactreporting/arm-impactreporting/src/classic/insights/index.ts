// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactContext } from "../../api/impactContext.js";
import { Insight } from "../../models/models.js";
import {
  InsightsDeleteOptionalParams,
  InsightsCreateOptionalParams,
  InsightsListBySubscriptionOptionalParams,
  InsightsGetOptionalParams,
} from "../../api/insights/options.js";
import { $delete, create, listBySubscription, get } from "../../api/insights/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Insights operations. */
export interface InsightsOperations {
  /** Delete Insight resource, This is Admin only operation */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    workloadImpactName: string,
    insightName: string,
    options?: InsightsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create Insight resource, This is Admin only operation */
  create: (
    workloadImpactName: string,
    insightName: string,
    resource: Insight,
    options?: InsightsCreateOptionalParams,
  ) => Promise<Insight>;
  /** List Insight resources by workloadImpactName */
  listBySubscription: (
    workloadImpactName: string,
    options?: InsightsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Insight>;
  /** Get Insight resources by workloadImpactName and insightName */
  get: (
    workloadImpactName: string,
    insightName: string,
    options?: InsightsGetOptionalParams,
  ) => Promise<Insight>;
}

function _getInsights(context: ImpactContext) {
  return {
    delete: (
      workloadImpactName: string,
      insightName: string,
      options?: InsightsDeleteOptionalParams,
    ) => $delete(context, workloadImpactName, insightName, options),
    create: (
      workloadImpactName: string,
      insightName: string,
      resource: Insight,
      options?: InsightsCreateOptionalParams,
    ) => create(context, workloadImpactName, insightName, resource, options),
    listBySubscription: (
      workloadImpactName: string,
      options?: InsightsListBySubscriptionOptionalParams,
    ) => listBySubscription(context, workloadImpactName, options),
    get: (workloadImpactName: string, insightName: string, options?: InsightsGetOptionalParams) =>
      get(context, workloadImpactName, insightName, options),
  };
}

export function _getInsightsOperations(context: ImpactContext): InsightsOperations {
  return {
    ..._getInsights(context),
  };
}
