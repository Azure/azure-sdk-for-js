// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservabilityContext } from "../../api/newRelicObservabilityContext.js";
import { list } from "../../api/plans/operations.js";
import { PlansListOptionalParams } from "../../api/plans/options.js";
import { PlanDataResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Plans operations. */
export interface PlansOperations {
  /** Lists the plans data linked to your organization, providing an overview of the available plans */
  list: (options?: PlansListOptionalParams) => PagedAsyncIterableIterator<PlanDataResource>;
}

function _getPlans(context: NewRelicObservabilityContext) {
  return {
    list: (options?: PlansListOptionalParams) => list(context, options),
  };
}

export function _getPlansOperations(context: NewRelicObservabilityContext): PlansOperations {
  return {
    ..._getPlans(context),
  };
}
