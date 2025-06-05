// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import { DnsPrivateZone } from "../../models/models.js";
import {
  DnsPrivateZonesListByLocationOptionalParams,
  DnsPrivateZonesGetOptionalParams,
} from "../../api/dnsPrivateZones/options.js";
import { listByLocation, get } from "../../api/dnsPrivateZones/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DnsPrivateZones operations. */
export interface DnsPrivateZonesOperations {
  /** List DnsPrivateZone resources by SubscriptionLocationResource */
  listByLocation: (
    location: string,
    options?: DnsPrivateZonesListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<DnsPrivateZone>;
  /** Get a DnsPrivateZone */
  get: (
    location: string,
    dnsprivatezonename: string,
    options?: DnsPrivateZonesGetOptionalParams,
  ) => Promise<DnsPrivateZone>;
}

function _getDnsPrivateZones(context: OracleDatabaseManagementContext) {
  return {
    listByLocation: (location: string, options?: DnsPrivateZonesListByLocationOptionalParams) =>
      listByLocation(context, location, options),
    get: (
      location: string,
      dnsprivatezonename: string,
      options?: DnsPrivateZonesGetOptionalParams,
    ) => get(context, location, dnsprivatezonename, options),
  };
}

export function _getDnsPrivateZonesOperations(
  context: OracleDatabaseManagementContext,
): DnsPrivateZonesOperations {
  return {
    ..._getDnsPrivateZones(context),
  };
}
