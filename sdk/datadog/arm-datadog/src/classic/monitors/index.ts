// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogContext } from "../../api/microsoftDatadogContext.js";
import {
  refreshSetPasswordLink,
  listMonitoredResources,
  listLinkedResources,
  listHosts,
  setDefaultKey,
  getDefaultKey,
  listApiKeys,
  getDefaultApplicationKey,
  manageSreAgentConnectors,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/monitors/operations.js";
import {
  MonitorsRefreshSetPasswordLinkOptionalParams,
  MonitorsListMonitoredResourcesOptionalParams,
  MonitorsListLinkedResourcesOptionalParams,
  MonitorsListHostsOptionalParams,
  MonitorsSetDefaultKeyOptionalParams,
  MonitorsGetDefaultKeyOptionalParams,
  MonitorsListApiKeysOptionalParams,
  MonitorsGetDefaultApplicationKeyOptionalParams,
  MonitorsManageSreAgentConnectorsOptionalParams,
  MonitorsListOptionalParams,
  MonitorsListByResourceGroupOptionalParams,
  MonitorsDeleteOptionalParams,
  MonitorsUpdateOptionalParams,
  MonitorsCreateOptionalParams,
  MonitorsGetOptionalParams,
} from "../../api/monitors/options.js";
import {
  DatadogMonitorResource,
  SreAgentConnectorRequest,
  SreAgentConfigurationListResponse,
  DatadogApplicationKey,
  DatadogApiKey,
  DatadogHost,
  LinkedResource,
  MonitoredResource,
  DatadogSetPasswordLink,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Monitors operations. */
export interface MonitorsOperations {
  /** Refresh the set password link and return a latest one. */
  refreshSetPasswordLink: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsRefreshSetPasswordLinkOptionalParams,
  ) => Promise<DatadogSetPasswordLink>;
  /** List the resources currently being monitored by the Datadog monitor resource. */
  listMonitoredResources: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsListMonitoredResourcesOptionalParams,
  ) => PagedAsyncIterableIterator<MonitoredResource>;
  /** List all Azure resources associated to the same Datadog organization as the target resource. */
  listLinkedResources: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsListLinkedResourcesOptionalParams,
  ) => PagedAsyncIterableIterator<LinkedResource>;
  /** List the hosts for a given monitor resource. */
  listHosts: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsListHostsOptionalParams,
  ) => PagedAsyncIterableIterator<DatadogHost>;
  /** Set the default api key. */
  setDefaultKey: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsSetDefaultKeyOptionalParams,
  ) => Promise<void>;
  /** Get the default api key. */
  getDefaultKey: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsGetDefaultKeyOptionalParams,
  ) => Promise<DatadogApiKey>;
  /** List the api keys for a given monitor resource. */
  listApiKeys: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsListApiKeysOptionalParams,
  ) => PagedAsyncIterableIterator<DatadogApiKey>;
  /** Get the default application key. */
  getDefaultApplicationKey: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsGetDefaultApplicationKeyOptionalParams,
  ) => Promise<DatadogApplicationKey>;
  /** Manages Datadog MCP connectors to add/remove for the SRE Agent. */
  manageSreAgentConnectors: (
    resourceGroupName: string,
    monitorName: string,
    request: SreAgentConnectorRequest,
    options?: MonitorsManageSreAgentConnectorsOptionalParams,
  ) => Promise<SreAgentConfigurationListResponse>;
  /** List all monitors under the specified subscription. */
  list: (
    options?: MonitorsListOptionalParams,
  ) => PagedAsyncIterableIterator<DatadogMonitorResource>;
  /** List all monitors under the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: MonitorsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DatadogMonitorResource>;
  /** Delete a monitor resource. */
  delete: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a monitor resource. */
  update: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsUpdateOptionalParams,
  ) => PollerLike<OperationState<DatadogMonitorResource>, DatadogMonitorResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DatadogMonitorResource>, DatadogMonitorResource>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsUpdateOptionalParams,
  ) => Promise<DatadogMonitorResource>;
  /** Create a monitor resource. */
  create: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsCreateOptionalParams,
  ) => PollerLike<OperationState<DatadogMonitorResource>, DatadogMonitorResource>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DatadogMonitorResource>, DatadogMonitorResource>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsCreateOptionalParams,
  ) => Promise<DatadogMonitorResource>;
  /** Get the properties of a specific monitor resource. */
  get: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsGetOptionalParams,
  ) => Promise<DatadogMonitorResource>;
}

function _getMonitors(context: MicrosoftDatadogContext) {
  return {
    refreshSetPasswordLink: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsRefreshSetPasswordLinkOptionalParams,
    ) => refreshSetPasswordLink(context, resourceGroupName, monitorName, options),
    listMonitoredResources: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsListMonitoredResourcesOptionalParams,
    ) => listMonitoredResources(context, resourceGroupName, monitorName, options),
    listLinkedResources: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsListLinkedResourcesOptionalParams,
    ) => listLinkedResources(context, resourceGroupName, monitorName, options),
    listHosts: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsListHostsOptionalParams,
    ) => listHosts(context, resourceGroupName, monitorName, options),
    setDefaultKey: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsSetDefaultKeyOptionalParams,
    ) => setDefaultKey(context, resourceGroupName, monitorName, options),
    getDefaultKey: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsGetDefaultKeyOptionalParams,
    ) => getDefaultKey(context, resourceGroupName, monitorName, options),
    listApiKeys: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsListApiKeysOptionalParams,
    ) => listApiKeys(context, resourceGroupName, monitorName, options),
    getDefaultApplicationKey: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsGetDefaultApplicationKeyOptionalParams,
    ) => getDefaultApplicationKey(context, resourceGroupName, monitorName, options),
    manageSreAgentConnectors: (
      resourceGroupName: string,
      monitorName: string,
      request: SreAgentConnectorRequest,
      options?: MonitorsManageSreAgentConnectorsOptionalParams,
    ) => manageSreAgentConnectors(context, resourceGroupName, monitorName, request, options),
    list: (options?: MonitorsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: MonitorsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, monitorName, options),
    beginDelete: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, monitorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, monitorName, options);
    },
    update: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsUpdateOptionalParams,
    ) => update(context, resourceGroupName, monitorName, options),
    beginUpdate: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, monitorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, monitorName, options);
    },
    create: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsCreateOptionalParams,
    ) => create(context, resourceGroupName, monitorName, options),
    beginCreate: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, monitorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, monitorName, options);
    },
    get: (resourceGroupName: string, monitorName: string, options?: MonitorsGetOptionalParams) =>
      get(context, resourceGroupName, monitorName, options),
  };
}

export function _getMonitorsOperations(context: MicrosoftDatadogContext): MonitorsOperations {
  return {
    ..._getMonitors(context),
  };
}
