// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { list } from "../../api/activityLogs/operations.js";
import type { ActivityLogsListOptionalParams } from "../../api/activityLogs/options.js";
import type { MicrosoftActivityLogsEventData } from "../../models/microsoft/activityLogs/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ActivityLogs operations. */
export interface ActivityLogsOperations {
  /** Provides the list of records from the activity logs. */
  list: (
    filter: string,
    options?: ActivityLogsListOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftActivityLogsEventData>;
}

function _getActivityLogs(context: MonitorContext) {
  return {
    list: (filter: string, options?: ActivityLogsListOptionalParams) =>
      list(context, filter, options),
  };
}

export function _getActivityLogsOperations(context: MonitorContext): ActivityLogsOperations {
  return {
    ..._getActivityLogs(context),
  };
}
