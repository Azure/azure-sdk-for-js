// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDatabricksManagementContext } from "../../api/azureDatabricksManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/accessConnectors/operations.js";
import type {
  AccessConnectorsListBySubscriptionOptionalParams,
  AccessConnectorsListByResourceGroupOptionalParams,
  AccessConnectorsDeleteOptionalParams,
  AccessConnectorsUpdateOptionalParams,
  AccessConnectorsCreateOrUpdateOptionalParams,
  AccessConnectorsGetOptionalParams,
} from "../../api/accessConnectors/options.js";
import type { AccessConnector, AccessConnectorUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AccessConnectors operations. */
export interface AccessConnectorsOperations {
  /** Gets all the Azure Databricks Access Connectors within a subscription. */
  listBySubscription: (
    options?: AccessConnectorsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AccessConnector>;
  /** Gets all the Azure Databricks Access Connectors within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AccessConnectorsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AccessConnector>;
  /** Deletes the Azure Databricks Access Connector. */
  delete: (
    resourceGroupName: string,
    connectorName: string,
    options?: AccessConnectorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    connectorName: string,
    options?: AccessConnectorsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    connectorName: string,
    options?: AccessConnectorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an Azure Databricks Access Connector. */
  update: (
    resourceGroupName: string,
    connectorName: string,
    parameters: AccessConnectorUpdate,
    options?: AccessConnectorsUpdateOptionalParams,
  ) => PollerLike<OperationState<AccessConnector>, AccessConnector>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    connectorName: string,
    parameters: AccessConnectorUpdate,
    options?: AccessConnectorsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AccessConnector>, AccessConnector>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    connectorName: string,
    parameters: AccessConnectorUpdate,
    options?: AccessConnectorsUpdateOptionalParams,
  ) => Promise<AccessConnector>;
  /** Creates or updates Azure Databricks Access Connector. */
  createOrUpdate: (
    resourceGroupName: string,
    connectorName: string,
    parameters: AccessConnector,
    options?: AccessConnectorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AccessConnector>, AccessConnector>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    connectorName: string,
    parameters: AccessConnector,
    options?: AccessConnectorsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AccessConnector>, AccessConnector>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    connectorName: string,
    parameters: AccessConnector,
    options?: AccessConnectorsCreateOrUpdateOptionalParams,
  ) => Promise<AccessConnector>;
  /** Gets an Azure Databricks Access Connector. */
  get: (
    resourceGroupName: string,
    connectorName: string,
    options?: AccessConnectorsGetOptionalParams,
  ) => Promise<AccessConnector>;
}

function _getAccessConnectors(context: AzureDatabricksManagementContext) {
  return {
    listBySubscription: (options?: AccessConnectorsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AccessConnectorsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      connectorName: string,
      options?: AccessConnectorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, connectorName, options),
    beginDelete: async (
      resourceGroupName: string,
      connectorName: string,
      options?: AccessConnectorsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, connectorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      connectorName: string,
      options?: AccessConnectorsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, connectorName, options);
    },
    update: (
      resourceGroupName: string,
      connectorName: string,
      parameters: AccessConnectorUpdate,
      options?: AccessConnectorsUpdateOptionalParams,
    ) => update(context, resourceGroupName, connectorName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      connectorName: string,
      parameters: AccessConnectorUpdate,
      options?: AccessConnectorsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, connectorName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      connectorName: string,
      parameters: AccessConnectorUpdate,
      options?: AccessConnectorsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, connectorName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      connectorName: string,
      parameters: AccessConnector,
      options?: AccessConnectorsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, connectorName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      connectorName: string,
      parameters: AccessConnector,
      options?: AccessConnectorsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, connectorName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      connectorName: string,
      parameters: AccessConnector,
      options?: AccessConnectorsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, connectorName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      connectorName: string,
      options?: AccessConnectorsGetOptionalParams,
    ) => get(context, resourceGroupName, connectorName, options),
  };
}

export function _getAccessConnectorsOperations(
  context: AzureDatabricksManagementContext,
): AccessConnectorsOperations {
  return {
    ..._getAccessConnectors(context),
  };
}
