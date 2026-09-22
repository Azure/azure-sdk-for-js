// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DynatraceObservabilityContext } from "../../api/dynatraceObservabilityContext.js";
import {
  getMarketplaceSaaSResourceDetails,
  getAllConnectedResourcesCount,
  listLinkableEnvironments,
  getSSODetails,
  upgradePlan,
  listAppServices,
  getMetricStatus,
  listHosts,
  manageAgentInstallation,
  getVMHostPayload,
  listMonitoredResources,
  listBySubscriptionId,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/monitors/operations.js";
import type {
  MonitorsGetMarketplaceSaaSResourceDetailsOptionalParams,
  MonitorsGetAllConnectedResourcesCountOptionalParams,
  MonitorsListLinkableEnvironmentsOptionalParams,
  MonitorsGetSSODetailsOptionalParams,
  MonitorsUpgradePlanOptionalParams,
  MonitorsListAppServicesOptionalParams,
  MonitorsGetMetricStatusOptionalParams,
  MonitorsListHostsOptionalParams,
  MonitorsManageAgentInstallationOptionalParams,
  MonitorsGetVMHostPayloadOptionalParams,
  MonitorsListMonitoredResourcesOptionalParams,
  MonitorsListBySubscriptionIdOptionalParams,
  MonitorsListByResourceGroupOptionalParams,
  MonitorsDeleteOptionalParams,
  MonitorsUpdateOptionalParams,
  MonitorsCreateOrUpdateOptionalParams,
  MonitorsGetOptionalParams,
} from "../../api/monitors/options.js";
import type {
  MonitorResource,
  MonitorResourceUpdate,
  MonitoredResource,
  VMExtensionPayload,
  ManageAgentInstallationRequest,
  VMInfo,
  MetricsStatusResponse,
  AppServiceInfo,
  UpgradePlanRequest,
  SSODetailsResponse,
  LinkableEnvironmentRequest,
  LinkableEnvironmentResponse,
  MarketplaceSubscriptionIdRequest,
  ConnectedResourcesCountResponse,
  MarketplaceSaaSResourceDetailsRequest,
  MarketplaceSaaSResourceDetailsResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Monitors operations. */
export interface MonitorsOperations {
  /** Get Marketplace SaaS resource details */
  getMarketplaceSaaSResourceDetails: (
    request: MarketplaceSaaSResourceDetailsRequest,
    options?: MonitorsGetMarketplaceSaaSResourceDetailsOptionalParams,
  ) => Promise<MarketplaceSaaSResourceDetailsResponse>;
  /** Get the total number of connected resources for the given marketplace subscription Id */
  getAllConnectedResourcesCount: (
    request: MarketplaceSubscriptionIdRequest,
    options?: MonitorsGetAllConnectedResourcesCountOptionalParams,
  ) => Promise<ConnectedResourcesCountResponse>;
  /** Gets all the Dynatrace environments that a user can link a azure resource to */
  listLinkableEnvironments: (
    resourceGroupName: string,
    monitorName: string,
    request: LinkableEnvironmentRequest,
    options?: MonitorsListLinkableEnvironmentsOptionalParams,
  ) => PagedAsyncIterableIterator<LinkableEnvironmentResponse>;
  /** Gets the SSO configuration details from the partner. */
  getSSODetails: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsGetSSODetailsOptionalParams,
  ) => Promise<SSODetailsResponse>;
  /** Upgrades the billing Plan for Dynatrace monitor resource. */
  upgradePlan: (
    resourceGroupName: string,
    monitorName: string,
    request: UpgradePlanRequest,
    options?: MonitorsUpgradePlanOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use upgradePlan instead */
  beginUpgradePlan: (
    resourceGroupName: string,
    monitorName: string,
    request: UpgradePlanRequest,
    options?: MonitorsUpgradePlanOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use upgradePlan instead */
  beginUpgradePlanAndWait: (
    resourceGroupName: string,
    monitorName: string,
    request: UpgradePlanRequest,
    options?: MonitorsUpgradePlanOptionalParams,
  ) => Promise<void>;
  /** Gets list of App Services with Dynatrace PaaS OneAgent enabled */
  listAppServices: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsListAppServicesOptionalParams,
  ) => PagedAsyncIterableIterator<AppServiceInfo>;
  /** Get metric status */
  getMetricStatus: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsGetMetricStatusOptionalParams,
  ) => Promise<MetricsStatusResponse>;
  /** List the VM/VMSS resources currently being monitored by the Dynatrace resource. */
  listHosts: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsListHostsOptionalParams,
  ) => PagedAsyncIterableIterator<VMInfo>;
  /** Performs Dynatrace agent install/uninstall action through the Azure Dynatrace resource on the provided list of resources. */
  manageAgentInstallation: (
    resourceGroupName: string,
    monitorName: string,
    request: ManageAgentInstallationRequest,
    options?: MonitorsManageAgentInstallationOptionalParams,
  ) => Promise<void>;
  /** Returns the payload that needs to be passed in the request body for installing Dynatrace agent on a VM. */
  getVMHostPayload: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsGetVMHostPayloadOptionalParams,
  ) => Promise<VMExtensionPayload>;
  /** List the resources currently being monitored by the Dynatrace monitor resource. */
  listMonitoredResources: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsListMonitoredResourcesOptionalParams,
  ) => PagedAsyncIterableIterator<MonitoredResource>;
  /** List all MonitorResource by subscriptionId */
  listBySubscriptionId: (
    options?: MonitorsListBySubscriptionIdOptionalParams,
  ) => PagedAsyncIterableIterator<MonitorResource>;
  /** List MonitorResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: MonitorsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<MonitorResource>;
  /** Delete a MonitorResource */
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
  /** Update a MonitorResource */
  update: (
    resourceGroupName: string,
    monitorName: string,
    resource: MonitorResourceUpdate,
    options?: MonitorsUpdateOptionalParams,
  ) => Promise<MonitorResource>;
  /** Create a MonitorResource */
  createOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    resource: MonitorResource,
    options?: MonitorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MonitorResource>, MonitorResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    resource: MonitorResource,
    options?: MonitorsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MonitorResource>, MonitorResource>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    monitorName: string,
    resource: MonitorResource,
    options?: MonitorsCreateOrUpdateOptionalParams,
  ) => Promise<MonitorResource>;
  /** Get a MonitorResource */
  get: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsGetOptionalParams,
  ) => Promise<MonitorResource>;
}

function _getMonitors(context: DynatraceObservabilityContext) {
  return {
    getMarketplaceSaaSResourceDetails: (
      request: MarketplaceSaaSResourceDetailsRequest,
      options?: MonitorsGetMarketplaceSaaSResourceDetailsOptionalParams,
    ) => getMarketplaceSaaSResourceDetails(context, request, options),
    getAllConnectedResourcesCount: (
      request: MarketplaceSubscriptionIdRequest,
      options?: MonitorsGetAllConnectedResourcesCountOptionalParams,
    ) => getAllConnectedResourcesCount(context, request, options),
    listLinkableEnvironments: (
      resourceGroupName: string,
      monitorName: string,
      request: LinkableEnvironmentRequest,
      options?: MonitorsListLinkableEnvironmentsOptionalParams,
    ) => listLinkableEnvironments(context, resourceGroupName, monitorName, request, options),
    getSSODetails: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsGetSSODetailsOptionalParams,
    ) => getSSODetails(context, resourceGroupName, monitorName, options),
    upgradePlan: (
      resourceGroupName: string,
      monitorName: string,
      request: UpgradePlanRequest,
      options?: MonitorsUpgradePlanOptionalParams,
    ) => upgradePlan(context, resourceGroupName, monitorName, request, options),
    beginUpgradePlan: async (
      resourceGroupName: string,
      monitorName: string,
      request: UpgradePlanRequest,
      options?: MonitorsUpgradePlanOptionalParams,
    ) => {
      const poller = upgradePlan(context, resourceGroupName, monitorName, request, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpgradePlanAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      request: UpgradePlanRequest,
      options?: MonitorsUpgradePlanOptionalParams,
    ) => {
      return await upgradePlan(context, resourceGroupName, monitorName, request, options);
    },
    listAppServices: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsListAppServicesOptionalParams,
    ) => listAppServices(context, resourceGroupName, monitorName, options),
    getMetricStatus: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsGetMetricStatusOptionalParams,
    ) => getMetricStatus(context, resourceGroupName, monitorName, options),
    listHosts: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsListHostsOptionalParams,
    ) => listHosts(context, resourceGroupName, monitorName, options),
    manageAgentInstallation: (
      resourceGroupName: string,
      monitorName: string,
      request: ManageAgentInstallationRequest,
      options?: MonitorsManageAgentInstallationOptionalParams,
    ) => manageAgentInstallation(context, resourceGroupName, monitorName, request, options),
    getVMHostPayload: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsGetVMHostPayloadOptionalParams,
    ) => getVMHostPayload(context, resourceGroupName, monitorName, options),
    listMonitoredResources: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsListMonitoredResourcesOptionalParams,
    ) => listMonitoredResources(context, resourceGroupName, monitorName, options),
    listBySubscriptionId: (options?: MonitorsListBySubscriptionIdOptionalParams) =>
      listBySubscriptionId(context, options),
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
      resource: MonitorResourceUpdate,
      options?: MonitorsUpdateOptionalParams,
    ) => update(context, resourceGroupName, monitorName, resource, options),
    createOrUpdate: (
      resourceGroupName: string,
      monitorName: string,
      resource: MonitorResource,
      options?: MonitorsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, monitorName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      monitorName: string,
      resource: MonitorResource,
      options?: MonitorsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, monitorName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      resource: MonitorResource,
      options?: MonitorsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, monitorName, resource, options);
    },
    get: (resourceGroupName: string, monitorName: string, options?: MonitorsGetOptionalParams) =>
      get(context, resourceGroupName, monitorName, options),
  };
}

export function _getMonitorsOperations(context: DynatraceObservabilityContext): MonitorsOperations {
  return {
    ..._getMonitors(context),
  };
}
