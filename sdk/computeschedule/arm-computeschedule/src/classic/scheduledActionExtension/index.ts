// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeScheduleContext } from "../../api/computeScheduleContext.js";
import { listByVms } from "../../api/scheduledActionExtension/operations.js";
import type { ScheduledActionExtensionListByVmsOptionalParams } from "../../api/scheduledActionExtension/options.js";
import type { ScheduledActionResources } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScheduledActionExtension operations. */
export interface ScheduledActionExtensionOperations {
  /** List ScheduledActionResources resources by parent */
  listByVms: (
    resourceUri: string,
    options?: ScheduledActionExtensionListByVmsOptionalParams,
  ) => PagedAsyncIterableIterator<ScheduledActionResources>;
}

function _getScheduledActionExtension(context: ComputeScheduleContext) {
  return {
    listByVms: (resourceUri: string, options?: ScheduledActionExtensionListByVmsOptionalParams) =>
      listByVms(context, resourceUri, options),
  };
}

export function _getScheduledActionExtensionOperations(
  context: ComputeScheduleContext,
): ScheduledActionExtensionOperations {
  return {
    ..._getScheduledActionExtension(context),
  };
}
