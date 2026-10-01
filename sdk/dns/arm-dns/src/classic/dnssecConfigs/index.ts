// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsManagementContext } from "../../api/dnsManagementContext.js";
import { listByDnsZone, $delete, createOrUpdate, get } from "../../api/dnssecConfigs/operations.js";
import {
  DnssecConfigsListByDnsZoneOptionalParams,
  DnssecConfigsDeleteOptionalParams,
  DnssecConfigsCreateOrUpdateOptionalParams,
  DnssecConfigsGetOptionalParams,
} from "../../api/dnssecConfigs/options.js";
import { DnssecConfig } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  delete: (
    resourceGroupName: string,
    zoneName: string,
    options?: DnssecConfigsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    zoneName: string,
    options?: DnssecConfigsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    zoneName: string,
    options?: DnssecConfigsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the DNSSEC configuration on a DNS zone. */
  createOrUpdate: (
    resourceGroupName: string,
    zoneName: string,
    options?: DnssecConfigsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DnssecConfig>, DnssecConfig>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    zoneName: string,
    options?: DnssecConfigsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DnssecConfig>, DnssecConfig>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    zoneName: string,
    options?: DnssecConfigsCreateOrUpdateOptionalParams,
  ) => Promise<DnssecConfig>;
  /** Gets the DNSSEC configuration. */
  get: (
    resourceGroupName: string,
    zoneName: string,
    options?: DnssecConfigsGetOptionalParams,
  ) => Promise<DnssecConfig>;
}

function _getDnssecConfigs(context: DnsManagementContext) {
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
    beginDelete: async (
      resourceGroupName: string,
      zoneName: string,
      options?: DnssecConfigsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, zoneName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      zoneName: string,
      options?: DnssecConfigsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, zoneName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      zoneName: string,
      options?: DnssecConfigsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, zoneName, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      zoneName: string,
      options?: DnssecConfigsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, zoneName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      zoneName: string,
      options?: DnssecConfigsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, zoneName, options);
    },
    get: (resourceGroupName: string, zoneName: string, options?: DnssecConfigsGetOptionalParams) =>
      get(context, resourceGroupName, zoneName, options),
  };
}

export function _getDnssecConfigsOperations(
  context: DnsManagementContext,
): DnssecConfigsOperations {
  return {
    ..._getDnssecConfigs(context),
  };
}
