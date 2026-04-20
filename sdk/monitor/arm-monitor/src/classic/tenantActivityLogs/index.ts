// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { list } from "../../api/tenantActivityLogs/operations.js";
import type { TenantActivityLogsListOptionalParams } from "../../api/tenantActivityLogs/options.js";
import type { MicrosoftActivityLogsEventData } from "../../models/microsoft/activityLogs/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TenantActivityLogs operations. */
export interface TenantActivityLogsOperations {
  /** Gets the Activity Logs for the Tenant.<br>Everything that is applicable to the API to get the Activity Logs for the subscription is applicable to this API (the parameters, $filter, etc.).<br>One thing to point out here is that this API does *not* retrieve the logs at the individual subscription of the tenant but only surfaces the logs that were generated at the tenant level. */
  list: (
    options?: TenantActivityLogsListOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftActivityLogsEventData>;
}

function _getTenantActivityLogs(context: MonitorContext) {
  return {
    list: (options?: TenantActivityLogsListOptionalParams) => list(context, options),
  };
}

export function _getTenantActivityLogsOperations(
  context: MonitorContext,
): TenantActivityLogsOperations {
  return {
    ..._getTenantActivityLogs(context),
  };
}
