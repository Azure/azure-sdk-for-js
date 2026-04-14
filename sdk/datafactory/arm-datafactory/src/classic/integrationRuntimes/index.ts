// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import {
  createLinkedIntegrationRuntime,
  removeLinks,
  upgrade,
  getMonitoringData,
  syncCredentials,
  stop,
  start,
  listAuthKeys,
  regenerateAuthKey,
  getConnectionInfo,
  listOutboundNetworkDependenciesEndpoints,
  getStatus,
  listByFactory,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/integrationRuntimes/operations.js";
import type {
  IntegrationRuntimesCreateLinkedIntegrationRuntimeOptionalParams,
  IntegrationRuntimesRemoveLinksOptionalParams,
  IntegrationRuntimesUpgradeOptionalParams,
  IntegrationRuntimesGetMonitoringDataOptionalParams,
  IntegrationRuntimesSyncCredentialsOptionalParams,
  IntegrationRuntimesStopOptionalParams,
  IntegrationRuntimesStartOptionalParams,
  IntegrationRuntimesListAuthKeysOptionalParams,
  IntegrationRuntimesRegenerateAuthKeyOptionalParams,
  IntegrationRuntimesGetConnectionInfoOptionalParams,
  IntegrationRuntimesListOutboundNetworkDependenciesEndpointsOptionalParams,
  IntegrationRuntimesGetStatusOptionalParams,
  IntegrationRuntimesListByFactoryOptionalParams,
  IntegrationRuntimesDeleteOptionalParams,
  IntegrationRuntimesUpdateOptionalParams,
  IntegrationRuntimesCreateOrUpdateOptionalParams,
  IntegrationRuntimesGetOptionalParams,
} from "../../api/integrationRuntimes/options.js";
import type {
  IntegrationRuntimeResource,
  UpdateIntegrationRuntimeRequest,
  IntegrationRuntimeStatusResponse,
  IntegrationRuntimeOutboundNetworkDependenciesEndpointsResponse,
  IntegrationRuntimeConnectionInfo,
  IntegrationRuntimeRegenerateKeyParameters,
  IntegrationRuntimeAuthKeys,
  IntegrationRuntimeMonitoringData,
  LinkedIntegrationRuntimeRequest,
  CreateLinkedIntegrationRuntimeRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IntegrationRuntimes operations. */
export interface IntegrationRuntimesOperations {
  /** Create a linked integration runtime entry in a shared integration runtime. */
  createLinkedIntegrationRuntime: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    createLinkedIntegrationRuntimeRequest: CreateLinkedIntegrationRuntimeRequest,
    options?: IntegrationRuntimesCreateLinkedIntegrationRuntimeOptionalParams,
  ) => Promise<IntegrationRuntimeStatusResponse>;
  /** Remove all linked integration runtimes under specific data factory in a self-hosted integration runtime. */
  removeLinks: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    linkedIntegrationRuntimeRequest: LinkedIntegrationRuntimeRequest,
    options?: IntegrationRuntimesRemoveLinksOptionalParams,
  ) => Promise<void>;
  /** Upgrade self-hosted integration runtime to latest version if availability. */
  upgrade: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesUpgradeOptionalParams,
  ) => Promise<void>;
  /** Get the integration runtime monitoring data, which includes the monitor data for all the nodes under this integration runtime. */
  getMonitoringData: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesGetMonitoringDataOptionalParams,
  ) => Promise<IntegrationRuntimeMonitoringData>;
  /** Force the integration runtime to synchronize credentials across integration runtime nodes, and this will override the credentials across all worker nodes with those available on the dispatcher node. If you already have the latest credential backup file, you should manually import it (preferred) on any self-hosted integration runtime node than using this API directly. */
  syncCredentials: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesSyncCredentialsOptionalParams,
  ) => Promise<void>;
  /** Stops a ManagedReserved type integration runtime. */
  stop: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Starts a ManagedReserved type integration runtime. */
  start: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesStartOptionalParams,
  ) => PollerLike<
    OperationState<IntegrationRuntimeStatusResponse>,
    IntegrationRuntimeStatusResponse
  >;
  /** Retrieves the authentication keys for an integration runtime. */
  listAuthKeys: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesListAuthKeysOptionalParams,
  ) => Promise<IntegrationRuntimeAuthKeys>;
  /** Regenerates the authentication key for an integration runtime. */
  regenerateAuthKey: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    regenerateKeyParameters: IntegrationRuntimeRegenerateKeyParameters,
    options?: IntegrationRuntimesRegenerateAuthKeyOptionalParams,
  ) => Promise<IntegrationRuntimeAuthKeys>;
  /** Gets the on-premises integration runtime connection information for encrypting the on-premises data source credentials. */
  getConnectionInfo: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesGetConnectionInfoOptionalParams,
  ) => Promise<IntegrationRuntimeConnectionInfo>;
  /** Gets the list of outbound network dependencies for a given Azure-SSIS integration runtime. */
  listOutboundNetworkDependenciesEndpoints: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesListOutboundNetworkDependenciesEndpointsOptionalParams,
  ) => Promise<IntegrationRuntimeOutboundNetworkDependenciesEndpointsResponse>;
  /** Gets detailed status information for an integration runtime. */
  getStatus: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesGetStatusOptionalParams,
  ) => Promise<IntegrationRuntimeStatusResponse>;
  /** Lists integration runtimes. */
  listByFactory: (
    resourceGroupName: string,
    factoryName: string,
    options?: IntegrationRuntimesListByFactoryOptionalParams,
  ) => PagedAsyncIterableIterator<IntegrationRuntimeResource>;
  /** Deletes an integration runtime. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an integration runtime. */
  update: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    updateIntegrationRuntimeRequest: UpdateIntegrationRuntimeRequest,
    options?: IntegrationRuntimesUpdateOptionalParams,
  ) => Promise<IntegrationRuntimeResource>;
  /** Creates or updates an integration runtime. */
  createOrUpdate: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    integrationRuntime: IntegrationRuntimeResource,
    options?: IntegrationRuntimesCreateOrUpdateOptionalParams,
  ) => Promise<IntegrationRuntimeResource>;
  /** Gets an integration runtime. */
  get: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimesGetOptionalParams,
  ) => Promise<IntegrationRuntimeResource>;
}

function _getIntegrationRuntimes(context: DataFactoryManagementContext) {
  return {
    createLinkedIntegrationRuntime: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      createLinkedIntegrationRuntimeRequest: CreateLinkedIntegrationRuntimeRequest,
      options?: IntegrationRuntimesCreateLinkedIntegrationRuntimeOptionalParams,
    ) =>
      createLinkedIntegrationRuntime(
        context,
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        createLinkedIntegrationRuntimeRequest,
        options,
      ),
    removeLinks: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      linkedIntegrationRuntimeRequest: LinkedIntegrationRuntimeRequest,
      options?: IntegrationRuntimesRemoveLinksOptionalParams,
    ) =>
      removeLinks(
        context,
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        linkedIntegrationRuntimeRequest,
        options,
      ),
    upgrade: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      options?: IntegrationRuntimesUpgradeOptionalParams,
    ) => upgrade(context, resourceGroupName, factoryName, integrationRuntimeName, options),
    getMonitoringData: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      options?: IntegrationRuntimesGetMonitoringDataOptionalParams,
    ) =>
      getMonitoringData(context, resourceGroupName, factoryName, integrationRuntimeName, options),
    syncCredentials: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      options?: IntegrationRuntimesSyncCredentialsOptionalParams,
    ) => syncCredentials(context, resourceGroupName, factoryName, integrationRuntimeName, options),
    stop: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      options?: IntegrationRuntimesStopOptionalParams,
    ) => stop(context, resourceGroupName, factoryName, integrationRuntimeName, options),
    start: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      options?: IntegrationRuntimesStartOptionalParams,
    ) => start(context, resourceGroupName, factoryName, integrationRuntimeName, options),
    listAuthKeys: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      options?: IntegrationRuntimesListAuthKeysOptionalParams,
    ) => listAuthKeys(context, resourceGroupName, factoryName, integrationRuntimeName, options),
    regenerateAuthKey: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      regenerateKeyParameters: IntegrationRuntimeRegenerateKeyParameters,
      options?: IntegrationRuntimesRegenerateAuthKeyOptionalParams,
    ) =>
      regenerateAuthKey(
        context,
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        regenerateKeyParameters,
        options,
      ),
    getConnectionInfo: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      options?: IntegrationRuntimesGetConnectionInfoOptionalParams,
    ) =>
      getConnectionInfo(context, resourceGroupName, factoryName, integrationRuntimeName, options),
    listOutboundNetworkDependenciesEndpoints: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      options?: IntegrationRuntimesListOutboundNetworkDependenciesEndpointsOptionalParams,
    ) =>
      listOutboundNetworkDependenciesEndpoints(
        context,
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        options,
      ),
    getStatus: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      options?: IntegrationRuntimesGetStatusOptionalParams,
    ) => getStatus(context, resourceGroupName, factoryName, integrationRuntimeName, options),
    listByFactory: (
      resourceGroupName: string,
      factoryName: string,
      options?: IntegrationRuntimesListByFactoryOptionalParams,
    ) => listByFactory(context, resourceGroupName, factoryName, options),
    delete: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      options?: IntegrationRuntimesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, factoryName, integrationRuntimeName, options),
    update: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      updateIntegrationRuntimeRequest: UpdateIntegrationRuntimeRequest,
      options?: IntegrationRuntimesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        updateIntegrationRuntimeRequest,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      integrationRuntime: IntegrationRuntimeResource,
      options?: IntegrationRuntimesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        integrationRuntime,
        options,
      ),
    get: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      options?: IntegrationRuntimesGetOptionalParams,
    ) => get(context, resourceGroupName, factoryName, integrationRuntimeName, options),
  };
}

export function _getIntegrationRuntimesOperations(
  context: DataFactoryManagementContext,
): IntegrationRuntimesOperations {
  return {
    ..._getIntegrationRuntimes(context),
  };
}
