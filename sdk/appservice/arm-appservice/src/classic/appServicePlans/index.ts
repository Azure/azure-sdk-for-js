// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  listRoutesForVnet,
  deleteVnetRoute,
  updateVnetRoute,
  createOrUpdateVnetRoute,
  getRouteForVnet,
  updateVnetGateway,
  getVnetGateway,
  listVnets,
  getVnetFromServerFarm,
  getHybridConnectionPlanLimit,
  listWebAppsByHybridConnection,
  listHybridConnectionKeys,
  deleteHybridConnection,
  getHybridConnection,
  rebootWorker,
  listUsages,
  getServerFarmSkus,
  listWebApps,
  restartWebApps,
  listHybridConnections,
  listCapabilities,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
  getServerFarmInstanceDetails,
  recycleManagedInstanceWorker,
  getServerFarmRdpPassword,
} from "../../api/appServicePlans/operations.js";
import type {
  AppServicePlansListRoutesForVnetOptionalParams,
  AppServicePlansDeleteVnetRouteOptionalParams,
  AppServicePlansUpdateVnetRouteOptionalParams,
  AppServicePlansCreateOrUpdateVnetRouteOptionalParams,
  AppServicePlansGetRouteForVnetOptionalParams,
  AppServicePlansUpdateVnetGatewayOptionalParams,
  AppServicePlansGetVnetGatewayOptionalParams,
  AppServicePlansListVnetsOptionalParams,
  AppServicePlansGetVnetFromServerFarmOptionalParams,
  AppServicePlansGetHybridConnectionPlanLimitOptionalParams,
  AppServicePlansListWebAppsByHybridConnectionOptionalParams,
  AppServicePlansListHybridConnectionKeysOptionalParams,
  AppServicePlansDeleteHybridConnectionOptionalParams,
  AppServicePlansGetHybridConnectionOptionalParams,
  AppServicePlansRebootWorkerOptionalParams,
  AppServicePlansListUsagesOptionalParams,
  AppServicePlansGetServerFarmSkusOptionalParams,
  AppServicePlansListWebAppsOptionalParams,
  AppServicePlansRestartWebAppsOptionalParams,
  AppServicePlansListHybridConnectionsOptionalParams,
  AppServicePlansListCapabilitiesOptionalParams,
  AppServicePlansListOptionalParams,
  AppServicePlansListByResourceGroupOptionalParams,
  AppServicePlansDeleteOptionalParams,
  AppServicePlansUpdateOptionalParams,
  AppServicePlansCreateOrUpdateOptionalParams,
  AppServicePlansGetOptionalParams,
  AppServicePlansGetServerFarmInstanceDetailsOptionalParams,
  AppServicePlansRecycleManagedInstanceWorkerOptionalParams,
  AppServicePlansGetServerFarmRdpPasswordOptionalParams,
} from "../../api/appServicePlans/options.js";
import type {
  Capability,
  Site,
  Operation,
  AppServicePlan,
  CsmUsageQuota,
  HybridConnection,
  VnetInfoResource,
  VnetRoute,
  VnetGateway,
  ServerFarmRdpDetails,
  ServerFarmInstanceDetails,
  AppServicePlanPatchResource,
  HybridConnectionKey,
  HybridConnectionLimits,
  AppServicePlansGetServerFarmSkusResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AppServicePlans operations. */
export interface AppServicePlansOperations {
  /** Description for Get all routes that are associated with a Virtual Network in an App Service plan. */
  listRoutesForVnet: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    options?: AppServicePlansListRoutesForVnetOptionalParams,
  ) => Promise<VnetRoute[]>;
  /** Description for Delete a Virtual Network route in an App Service plan. */
  deleteVnetRoute: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    routeName: string,
    options?: AppServicePlansDeleteVnetRouteOptionalParams,
  ) => Promise<void>;
  /** Description for Create or update a Virtual Network route in an App Service plan. */
  updateVnetRoute: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    routeName: string,
    route: VnetRoute,
    options?: AppServicePlansUpdateVnetRouteOptionalParams,
  ) => Promise<VnetRoute>;
  /** Description for Create or update a Virtual Network route in an App Service plan. */
  createOrUpdateVnetRoute: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    routeName: string,
    route: VnetRoute,
    options?: AppServicePlansCreateOrUpdateVnetRouteOptionalParams,
  ) => Promise<VnetRoute>;
  /** Description for Get a Virtual Network route in an App Service plan. */
  getRouteForVnet: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    routeName: string,
    options?: AppServicePlansGetRouteForVnetOptionalParams,
  ) => Promise<VnetRoute[]>;
  /** Description for Update a Virtual Network gateway. */
  updateVnetGateway: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    gatewayName: string,
    connectionEnvelope: VnetGateway,
    options?: AppServicePlansUpdateVnetGatewayOptionalParams,
  ) => Promise<VnetGateway>;
  /** Description for Get a Virtual Network gateway. */
  getVnetGateway: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    gatewayName: string,
    options?: AppServicePlansGetVnetGatewayOptionalParams,
  ) => Promise<VnetGateway>;
  /** Description for Get all Virtual Networks associated with an App Service plan. */
  listVnets: (
    resourceGroupName: string,
    name: string,
    options?: AppServicePlansListVnetsOptionalParams,
  ) => Promise<VnetInfoResource[]>;
  /** Description for Get a Virtual Network associated with an App Service plan. */
  getVnetFromServerFarm: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    options?: AppServicePlansGetVnetFromServerFarmOptionalParams,
  ) => Promise<VnetInfoResource>;
  /** Description for Get the maximum number of Hybrid Connections allowed in an App Service plan. */
  getHybridConnectionPlanLimit: (
    resourceGroupName: string,
    name: string,
    options?: AppServicePlansGetHybridConnectionPlanLimitOptionalParams,
  ) => Promise<HybridConnectionLimits>;
  /** Description for Get all apps that use a Hybrid Connection in an App Service Plan. */
  listWebAppsByHybridConnection: (
    resourceGroupName: string,
    name: string,
    namespaceName: string,
    relayName: string,
    options?: AppServicePlansListWebAppsByHybridConnectionOptionalParams,
  ) => PagedAsyncIterableIterator<string>;
  /** Description for Get the send key name and value of a Hybrid Connection. */
  listHybridConnectionKeys: (
    resourceGroupName: string,
    name: string,
    namespaceName: string,
    relayName: string,
    options?: AppServicePlansListHybridConnectionKeysOptionalParams,
  ) => Promise<HybridConnectionKey>;
  /** Description for Delete a Hybrid Connection in use in an App Service plan. */
  deleteHybridConnection: (
    resourceGroupName: string,
    name: string,
    namespaceName: string,
    relayName: string,
    options?: AppServicePlansDeleteHybridConnectionOptionalParams,
  ) => Promise<void>;
  /** Description for Retrieve a Hybrid Connection in use in an App Service plan. */
  getHybridConnection: (
    resourceGroupName: string,
    name: string,
    namespaceName: string,
    relayName: string,
    options?: AppServicePlansGetHybridConnectionOptionalParams,
  ) => Promise<HybridConnection>;
  /** Description for Reboot a worker machine in an App Service plan. */
  rebootWorker: (
    resourceGroupName: string,
    name: string,
    workerName: string,
    options?: AppServicePlansRebootWorkerOptionalParams,
  ) => Promise<void>;
  /** Description for Gets server farm usage information */
  listUsages: (
    resourceGroupName: string,
    name: string,
    options?: AppServicePlansListUsagesOptionalParams,
  ) => PagedAsyncIterableIterator<CsmUsageQuota>;
  /** Description for Gets all selectable SKUs for a given App Service Plan */
  getServerFarmSkus: (
    resourceGroupName: string,
    name: string,
    options?: AppServicePlansGetServerFarmSkusOptionalParams,
  ) => Promise<AppServicePlansGetServerFarmSkusResponse>;
  /** Description for Get all apps associated with an App Service plan. */
  listWebApps: (
    resourceGroupName: string,
    name: string,
    options?: AppServicePlansListWebAppsOptionalParams,
  ) => PagedAsyncIterableIterator<Site>;
  /** Description for Restart all apps in an App Service plan. */
  restartWebApps: (
    resourceGroupName: string,
    name: string,
    options?: AppServicePlansRestartWebAppsOptionalParams,
  ) => Promise<void>;
  /** Description for Retrieve all Hybrid Connections in use in an App Service plan. */
  listHybridConnections: (
    resourceGroupName: string,
    name: string,
    options?: AppServicePlansListHybridConnectionsOptionalParams,
  ) => PagedAsyncIterableIterator<HybridConnection>;
  /** Description for List all capabilities of an App Service plan. */
  listCapabilities: (
    resourceGroupName: string,
    name: string,
    options?: AppServicePlansListCapabilitiesOptionalParams,
  ) => Promise<Capability[]>;
  /** Description for Get all App Service plans for a subscription. */
  list: (options?: AppServicePlansListOptionalParams) => PagedAsyncIterableIterator<AppServicePlan>;
  /** Description for Get all App Service plans in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AppServicePlansListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AppServicePlan>;
  /** Description for Delete an App Service plan. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    name: string,
    options?: AppServicePlansDeleteOptionalParams,
  ) => Promise<void>;
  /** Description for Creates or updates an App Service Plan. */
  update: (
    resourceGroupName: string,
    name: string,
    appServicePlan: AppServicePlanPatchResource,
    options?: AppServicePlansUpdateOptionalParams,
  ) => Promise<AppServicePlan>;
  /** Description for Creates or updates an App Service Plan. */
  createOrUpdate: (
    resourceGroupName: string,
    name: string,
    appServicePlan: AppServicePlan,
    options?: AppServicePlansCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AppServicePlan>, AppServicePlan>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    name: string,
    appServicePlan: AppServicePlan,
    options?: AppServicePlansCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AppServicePlan>, AppServicePlan>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    name: string,
    appServicePlan: AppServicePlan,
    options?: AppServicePlansCreateOrUpdateOptionalParams,
  ) => Promise<AppServicePlan>;
  /** Description for Get an App Service plan. */
  get: (
    resourceGroupName: string,
    name: string,
    options?: AppServicePlansGetOptionalParams,
  ) => Promise<AppServicePlan>;
  /** Description for Get the instance details for an app service plan. */
  getServerFarmInstanceDetails: (
    resourceGroupName: string,
    name: string,
    options?: AppServicePlansGetServerFarmInstanceDetailsOptionalParams,
  ) => Promise<ServerFarmInstanceDetails>;
  /** Description for Recycles a managed instance worker machine. */
  recycleManagedInstanceWorker: (
    resourceGroupName: string,
    name: string,
    workerName: string,
    options?: AppServicePlansRecycleManagedInstanceWorkerOptionalParams,
  ) => Promise<Operation>;
  /** Description for Get the RDP password for an IsCustomMode ServerFarm. */
  getServerFarmRdpPassword: (
    resourceGroupName: string,
    name: string,
    options?: AppServicePlansGetServerFarmRdpPasswordOptionalParams,
  ) => Promise<ServerFarmRdpDetails>;
}

function _getAppServicePlans(context: WebSiteManagementContext) {
  return {
    listRoutesForVnet: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      options?: AppServicePlansListRoutesForVnetOptionalParams,
    ) => listRoutesForVnet(context, resourceGroupName, name, vnetName, options),
    deleteVnetRoute: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      routeName: string,
      options?: AppServicePlansDeleteVnetRouteOptionalParams,
    ) => deleteVnetRoute(context, resourceGroupName, name, vnetName, routeName, options),
    updateVnetRoute: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      routeName: string,
      route: VnetRoute,
      options?: AppServicePlansUpdateVnetRouteOptionalParams,
    ) => updateVnetRoute(context, resourceGroupName, name, vnetName, routeName, route, options),
    createOrUpdateVnetRoute: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      routeName: string,
      route: VnetRoute,
      options?: AppServicePlansCreateOrUpdateVnetRouteOptionalParams,
    ) =>
      createOrUpdateVnetRoute(
        context,
        resourceGroupName,
        name,
        vnetName,
        routeName,
        route,
        options,
      ),
    getRouteForVnet: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      routeName: string,
      options?: AppServicePlansGetRouteForVnetOptionalParams,
    ) => getRouteForVnet(context, resourceGroupName, name, vnetName, routeName, options),
    updateVnetGateway: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      gatewayName: string,
      connectionEnvelope: VnetGateway,
      options?: AppServicePlansUpdateVnetGatewayOptionalParams,
    ) =>
      updateVnetGateway(
        context,
        resourceGroupName,
        name,
        vnetName,
        gatewayName,
        connectionEnvelope,
        options,
      ),
    getVnetGateway: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      gatewayName: string,
      options?: AppServicePlansGetVnetGatewayOptionalParams,
    ) => getVnetGateway(context, resourceGroupName, name, vnetName, gatewayName, options),
    listVnets: (
      resourceGroupName: string,
      name: string,
      options?: AppServicePlansListVnetsOptionalParams,
    ) => listVnets(context, resourceGroupName, name, options),
    getVnetFromServerFarm: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      options?: AppServicePlansGetVnetFromServerFarmOptionalParams,
    ) => getVnetFromServerFarm(context, resourceGroupName, name, vnetName, options),
    getHybridConnectionPlanLimit: (
      resourceGroupName: string,
      name: string,
      options?: AppServicePlansGetHybridConnectionPlanLimitOptionalParams,
    ) => getHybridConnectionPlanLimit(context, resourceGroupName, name, options),
    listWebAppsByHybridConnection: (
      resourceGroupName: string,
      name: string,
      namespaceName: string,
      relayName: string,
      options?: AppServicePlansListWebAppsByHybridConnectionOptionalParams,
    ) =>
      listWebAppsByHybridConnection(
        context,
        resourceGroupName,
        name,
        namespaceName,
        relayName,
        options,
      ),
    listHybridConnectionKeys: (
      resourceGroupName: string,
      name: string,
      namespaceName: string,
      relayName: string,
      options?: AppServicePlansListHybridConnectionKeysOptionalParams,
    ) =>
      listHybridConnectionKeys(context, resourceGroupName, name, namespaceName, relayName, options),
    deleteHybridConnection: (
      resourceGroupName: string,
      name: string,
      namespaceName: string,
      relayName: string,
      options?: AppServicePlansDeleteHybridConnectionOptionalParams,
    ) =>
      deleteHybridConnection(context, resourceGroupName, name, namespaceName, relayName, options),
    getHybridConnection: (
      resourceGroupName: string,
      name: string,
      namespaceName: string,
      relayName: string,
      options?: AppServicePlansGetHybridConnectionOptionalParams,
    ) => getHybridConnection(context, resourceGroupName, name, namespaceName, relayName, options),
    rebootWorker: (
      resourceGroupName: string,
      name: string,
      workerName: string,
      options?: AppServicePlansRebootWorkerOptionalParams,
    ) => rebootWorker(context, resourceGroupName, name, workerName, options),
    listUsages: (
      resourceGroupName: string,
      name: string,
      options?: AppServicePlansListUsagesOptionalParams,
    ) => listUsages(context, resourceGroupName, name, options),
    getServerFarmSkus: (
      resourceGroupName: string,
      name: string,
      options?: AppServicePlansGetServerFarmSkusOptionalParams,
    ) => getServerFarmSkus(context, resourceGroupName, name, options),
    listWebApps: (
      resourceGroupName: string,
      name: string,
      options?: AppServicePlansListWebAppsOptionalParams,
    ) => listWebApps(context, resourceGroupName, name, options),
    restartWebApps: (
      resourceGroupName: string,
      name: string,
      options?: AppServicePlansRestartWebAppsOptionalParams,
    ) => restartWebApps(context, resourceGroupName, name, options),
    listHybridConnections: (
      resourceGroupName: string,
      name: string,
      options?: AppServicePlansListHybridConnectionsOptionalParams,
    ) => listHybridConnections(context, resourceGroupName, name, options),
    listCapabilities: (
      resourceGroupName: string,
      name: string,
      options?: AppServicePlansListCapabilitiesOptionalParams,
    ) => listCapabilities(context, resourceGroupName, name, options),
    list: (options?: AppServicePlansListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AppServicePlansListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      name: string,
      options?: AppServicePlansDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, name, options),
    update: (
      resourceGroupName: string,
      name: string,
      appServicePlan: AppServicePlanPatchResource,
      options?: AppServicePlansUpdateOptionalParams,
    ) => update(context, resourceGroupName, name, appServicePlan, options),
    createOrUpdate: (
      resourceGroupName: string,
      name: string,
      appServicePlan: AppServicePlan,
      options?: AppServicePlansCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, name, appServicePlan, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      name: string,
      appServicePlan: AppServicePlan,
      options?: AppServicePlansCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, name, appServicePlan, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      name: string,
      appServicePlan: AppServicePlan,
      options?: AppServicePlansCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, name, appServicePlan, options);
    },
    get: (resourceGroupName: string, name: string, options?: AppServicePlansGetOptionalParams) =>
      get(context, resourceGroupName, name, options),
    getServerFarmInstanceDetails: (
      resourceGroupName: string,
      name: string,
      options?: AppServicePlansGetServerFarmInstanceDetailsOptionalParams,
    ) => getServerFarmInstanceDetails(context, resourceGroupName, name, options),
    recycleManagedInstanceWorker: (
      resourceGroupName: string,
      name: string,
      workerName: string,
      options?: AppServicePlansRecycleManagedInstanceWorkerOptionalParams,
    ) => recycleManagedInstanceWorker(context, resourceGroupName, name, workerName, options),
    getServerFarmRdpPassword: (
      resourceGroupName: string,
      name: string,
      options?: AppServicePlansGetServerFarmRdpPasswordOptionalParams,
    ) => getServerFarmRdpPassword(context, resourceGroupName, name, options),
  };
}

export function _getAppServicePlansOperations(
  context: WebSiteManagementContext,
): AppServicePlansOperations {
  return {
    ..._getAppServicePlans(context),
  };
}
