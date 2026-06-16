// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
import {
  listByFirewall,
  $delete,
  createOrUpdate,
  get,
} from "../../api/customCaptureConfigurationsFirewallResources/operations.js";
import type {
  CustomCaptureConfigurationsFirewallResourcesListByFirewallOptionalParams,
  CustomCaptureConfigurationsFirewallResourcesDeleteOptionalParams,
  CustomCaptureConfigurationsFirewallResourcesCreateOrUpdateOptionalParams,
  CustomCaptureConfigurationsFirewallResourcesGetOptionalParams,
} from "../../api/customCaptureConfigurationsFirewallResources/options.js";
import type { CustomCaptureConfigurationsFirewallResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CustomCaptureConfigurationsFirewallResources operations. */
export interface CustomCaptureConfigurationsFirewallResourcesOperations {
  /** List Custom Capture Configurations under a firewall. The resource is a singleton (name is fixed to 'default'), so the response contains at most one entry. */
  listByFirewall: (
    resourceGroupName: string,
    firewallName: string,
    options?: CustomCaptureConfigurationsFirewallResourcesListByFirewallOptionalParams,
  ) => PagedAsyncIterableIterator<CustomCaptureConfigurationsFirewallResource>;
  /** Delete the Custom Capture Configuration on a firewall. SYNC — clears any in-progress or terminal capture state. Returns 200 on success or 204 when no configuration exists. */
  delete: (
    resourceGroupName: string,
    firewallName: string,
    options?: CustomCaptureConfigurationsFirewallResourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Start a Custom Capture Configuration on a firewall. SYNC — returns 200 OK + body immediately. Body's properties.pcapStatus reflects current state (typically InProgress). Caller polls GET on its own clock using properties.nextCheckInSeconds as the cadence hint. */
  createOrUpdate: (
    resourceGroupName: string,
    firewallName: string,
    resource: CustomCaptureConfigurationsFirewallResource,
    options?: CustomCaptureConfigurationsFirewallResourcesCreateOrUpdateOptionalParams,
  ) => Promise<CustomCaptureConfigurationsFirewallResource>;
  /** Get the current Custom Capture Configuration for a firewall. Always returns 200 OK + body. Caller reads properties.pcapStatus to know whether to keep polling. Body field properties.nextCheckInSeconds advises when to poll next (omitted on terminal states). */
  get: (
    resourceGroupName: string,
    firewallName: string,
    options?: CustomCaptureConfigurationsFirewallResourcesGetOptionalParams,
  ) => Promise<CustomCaptureConfigurationsFirewallResource>;
}

function _getCustomCaptureConfigurationsFirewallResources(
  context: PaloAltoNetworksCloudngfwContext,
) {
  return {
    listByFirewall: (
      resourceGroupName: string,
      firewallName: string,
      options?: CustomCaptureConfigurationsFirewallResourcesListByFirewallOptionalParams,
    ) => listByFirewall(context, resourceGroupName, firewallName, options),
    delete: (
      resourceGroupName: string,
      firewallName: string,
      options?: CustomCaptureConfigurationsFirewallResourcesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, firewallName, options),
    createOrUpdate: (
      resourceGroupName: string,
      firewallName: string,
      resource: CustomCaptureConfigurationsFirewallResource,
      options?: CustomCaptureConfigurationsFirewallResourcesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, firewallName, resource, options),
    get: (
      resourceGroupName: string,
      firewallName: string,
      options?: CustomCaptureConfigurationsFirewallResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, firewallName, options),
  };
}

export function _getCustomCaptureConfigurationsFirewallResourcesOperations(
  context: PaloAltoNetworksCloudngfwContext,
): CustomCaptureConfigurationsFirewallResourcesOperations {
  return {
    ..._getCustomCaptureConfigurationsFirewallResources(context),
  };
}
