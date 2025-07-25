// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleContext } from "../../api/computeScheduleContext.js";
import { listByVms } from "../../api/scheduledActionExtension/operations.js";
import { ScheduledActionExtensionListByVmsOptionalParams } from "../../api/scheduledActionExtension/options.js";
import { ScheduledActionResources } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
