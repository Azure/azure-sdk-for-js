// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
import {
  listByFirewall,
  $delete,
  createOrUpdate,
  get,
} from "../../api/logIngestionSettingsResources/operations.js";
import type {
  LogIngestionSettingsResourcesListByFirewallOptionalParams,
  LogIngestionSettingsResourcesDeleteOptionalParams,
  LogIngestionSettingsResourcesCreateOrUpdateOptionalParams,
  LogIngestionSettingsResourcesGetOptionalParams,
} from "../../api/logIngestionSettingsResources/options.js";
import type { LogIngestionSettingsResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LogIngestionSettingsResources operations. */
export interface LogIngestionSettingsResourcesOperations {
  /** List the Log Ingestion Settings under a firewall. The resource is a singleton (name is fixed to 'default'), so the response contains at most one entry. */
  listByFirewall: (
    resourceGroupName: string,
    firewallName: string,
    options?: LogIngestionSettingsResourcesListByFirewallOptionalParams,
  ) => PagedAsyncIterableIterator<LogIngestionSettingsResource>;
  /** Delete (clear) the Log Ingestion Settings for a firewall. SYNC — soft-clears the DCR destination on the partner (logs have no partner delete API). Returns 200 on success or 204 when nothing is configured. */
  delete: (
    resourceGroupName: string,
    firewallName: string,
    options?: LogIngestionSettingsResourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update the Log Ingestion Settings for a firewall. SYNC — forwards to the partner and returns 200 OK (or 201 Created on first create) with the persisted settings. commonDestination.monitorConfigurationsV2 (dcrId, logIngestionEndpoint, dcrImmutableId, streamName) drives where the firewall logs are ingested. */
  createOrUpdate: (
    resourceGroupName: string,
    firewallName: string,
    resource: LogIngestionSettingsResource,
    options?: LogIngestionSettingsResourcesCreateOrUpdateOptionalParams,
  ) => Promise<LogIngestionSettingsResource>;
  /** Get the Log Ingestion Settings for a firewall. Live read from the partner. Returns 200 OK with the current settings, or 404 when log ingestion has not been configured. */
  get: (
    resourceGroupName: string,
    firewallName: string,
    options?: LogIngestionSettingsResourcesGetOptionalParams,
  ) => Promise<LogIngestionSettingsResource>;
}
function _getLogIngestionSettingsResources(context: PaloAltoNetworksCloudngfwContext) {
  return {
    listByFirewall: (
      resourceGroupName: string,
      firewallName: string,
      options?: LogIngestionSettingsResourcesListByFirewallOptionalParams,
    ) => listByFirewall(context, resourceGroupName, firewallName, options),
    delete: (
      resourceGroupName: string,
      firewallName: string,
      options?: LogIngestionSettingsResourcesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, firewallName, options),
    createOrUpdate: (
      resourceGroupName: string,
      firewallName: string,
      resource: LogIngestionSettingsResource,
      options?: LogIngestionSettingsResourcesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, firewallName, resource, options),
    get: (
      resourceGroupName: string,
      firewallName: string,
      options?: LogIngestionSettingsResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, firewallName, options),
  };
}
export function _getLogIngestionSettingsResourcesOperations(
  context: PaloAltoNetworksCloudngfwContext,
): LogIngestionSettingsResourcesOperations {
  return {
    ..._getLogIngestionSettingsResources(context),
  };
}
