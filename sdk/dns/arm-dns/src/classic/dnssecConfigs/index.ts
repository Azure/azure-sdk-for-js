// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkContext } from "../../api/networkContext.js";
import { DnssecConfig } from "../../models/models.js";
import {
  DnssecConfigsListByDnsZoneOptionalParams,
  DnssecConfigsDeleteOptionalParams,
  DnssecConfigsCreateOrUpdateOptionalParams,
  DnssecConfigsGetOptionalParams,
} from "../../api/dnssecConfigs/options.js";
import { listByDnsZone, $delete, createOrUpdate, get } from "../../api/dnssecConfigs/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DnssecConfigs operations. */
export interface DnssecConfigsOperations {
  /** Lists the DNSSEC configurations in a DNS zone. */
  listByDnsZone: (
    resourceGroupName: string,
    zoneName: string,
    options?: DnssecConfigsListByDnsZoneOptionalParams,
  ) => PagedAsyncIterableIterator<DnssecConfig>;
  /** Deletes the DNSSEC configuration on a DNS zone. This operation cannot be undone. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    zoneName: string,
    options?: DnssecConfigsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates the DNSSEC configuration on a DNS zone. */
  createOrUpdate: (
    resourceGroupName: string,
    zoneName: string,
    options?: DnssecConfigsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DnssecConfig>, DnssecConfig>;
  /** Gets the DNSSEC configuration. */
  get: (
    resourceGroupName: string,
    zoneName: string,
    options?: DnssecConfigsGetOptionalParams,
  ) => Promise<DnssecConfig>;
}

function _getDnssecConfigs(context: NetworkContext) {
  return {
    listByDnsZone: (
      resourceGroupName: string,
      zoneName: string,
      options?: DnssecConfigsListByDnsZoneOptionalParams,
    ) => listByDnsZone(context, resourceGroupName, zoneName, options),
    delete: (
      resourceGroupName: string,
      zoneName: string,
      options?: DnssecConfigsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, zoneName, options),
    createOrUpdate: (
      resourceGroupName: string,
      zoneName: string,
      options?: DnssecConfigsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, zoneName, options),
    get: (resourceGroupName: string, zoneName: string, options?: DnssecConfigsGetOptionalParams) =>
      get(context, resourceGroupName, zoneName, options),
  };
}

export function _getDnssecConfigsOperations(context: NetworkContext): DnssecConfigsOperations {
  return {
    ..._getDnssecConfigs(context),
  };
}
