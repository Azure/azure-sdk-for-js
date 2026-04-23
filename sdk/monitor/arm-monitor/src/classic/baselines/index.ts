// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { list } from "../../api/baselines/operations.js";
import type { BaselinesListOptionalParams } from "../../api/baselines/options.js";
import type { SingleMetricBaseline } from "../../models/microsoft/metricBaselines/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Baselines operations. */
export interface BaselinesOperations {
  /** **Lists the metric baseline values for a resource**. */
  list: (
    resourceUri: string,
    options?: BaselinesListOptionalParams,
  ) => PagedAsyncIterableIterator<SingleMetricBaseline>;
}

function _getBaselines(context: MonitorContext) {
  return {
    list: (resourceUri: string, options?: BaselinesListOptionalParams) =>
      list(context, resourceUri, options),
  };
}

export function _getBaselinesOperations(context: MonitorContext): BaselinesOperations {
  return {
    ..._getBaselines(context),
  };
}
