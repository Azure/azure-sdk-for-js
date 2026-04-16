// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import { listByLocation, get } from "../../api/dnsPrivateViews/operations.js";
import type {
  DnsPrivateViewsListByLocationOptionalParams,
  DnsPrivateViewsGetOptionalParams,
} from "../../api/dnsPrivateViews/options.js";
import type { DnsPrivateView } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DnsPrivateViews operations. */
export interface DnsPrivateViewsOperations {
  /** List DnsPrivateView resources by SubscriptionLocationResource */
  listByLocation: (
    location: string,
    options?: DnsPrivateViewsListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<DnsPrivateView>;
  /** Get a DnsPrivateView */
  get: (
    location: string,
    dnsprivateviewocid: string,
    options?: DnsPrivateViewsGetOptionalParams,
  ) => Promise<DnsPrivateView>;
}

function _getDnsPrivateViews(context: OracleDatabaseManagementContext) {
  return {
    listByLocation: (location: string, options?: DnsPrivateViewsListByLocationOptionalParams) =>
      listByLocation(context, location, options),
    get: (
      location: string,
      dnsprivateviewocid: string,
      options?: DnsPrivateViewsGetOptionalParams,
    ) => get(context, location, dnsprivateviewocid, options),
  };
}

export function _getDnsPrivateViewsOperations(
  context: OracleDatabaseManagementContext,
): DnsPrivateViewsOperations {
  return {
    ..._getDnsPrivateViews(context),
  };
}
