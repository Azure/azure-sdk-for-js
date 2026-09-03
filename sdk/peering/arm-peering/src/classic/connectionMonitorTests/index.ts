// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementContext } from "../../api/peeringManagementContext.js";
import {
  listByPeeringService,
  $delete,
  createOrUpdate,
  get,
} from "../../api/connectionMonitorTests/operations.js";
import {
  ConnectionMonitorTestsListByPeeringServiceOptionalParams,
  ConnectionMonitorTestsDeleteOptionalParams,
  ConnectionMonitorTestsCreateOrUpdateOptionalParams,
  ConnectionMonitorTestsGetOptionalParams,
} from "../../api/connectionMonitorTests/options.js";
import { ConnectionMonitorTest } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectionMonitorTests operations. */
export interface ConnectionMonitorTestsOperations {
  /** Lists all connection monitor tests under the given subscription, resource group and peering service. */
  listByPeeringService: (
    resourceGroupName: string,
    peeringServiceName: string,
    options?: ConnectionMonitorTestsListByPeeringServiceOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectionMonitorTest>;
  /** Deletes an existing connection monitor test with the specified name under the given subscription, resource group and peering service. */
  delete: (
    resourceGroupName: string,
    peeringServiceName: string,
    connectionMonitorTestName: string,
    options?: ConnectionMonitorTestsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a connection monitor test with the specified name under the given subscription, resource group and peering service. */
  createOrUpdate: (
    resourceGroupName: string,
    peeringServiceName: string,
    connectionMonitorTestName: string,
    connectionMonitorTest: ConnectionMonitorTest,
    options?: ConnectionMonitorTestsCreateOrUpdateOptionalParams,
  ) => Promise<ConnectionMonitorTest>;
  /** Gets an existing connection monitor test with the specified name under the given subscription, resource group and peering service. */
  get: (
    resourceGroupName: string,
    peeringServiceName: string,
    connectionMonitorTestName: string,
    options?: ConnectionMonitorTestsGetOptionalParams,
  ) => Promise<ConnectionMonitorTest>;
}

function _getConnectionMonitorTests(context: PeeringManagementContext) {
  return {
    listByPeeringService: (
      resourceGroupName: string,
      peeringServiceName: string,
      options?: ConnectionMonitorTestsListByPeeringServiceOptionalParams,
    ) => listByPeeringService(context, resourceGroupName, peeringServiceName, options),
    delete: (
      resourceGroupName: string,
      peeringServiceName: string,
      connectionMonitorTestName: string,
      options?: ConnectionMonitorTestsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, peeringServiceName, connectionMonitorTestName, options),
    createOrUpdate: (
      resourceGroupName: string,
      peeringServiceName: string,
      connectionMonitorTestName: string,
      connectionMonitorTest: ConnectionMonitorTest,
      options?: ConnectionMonitorTestsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        peeringServiceName,
        connectionMonitorTestName,
        connectionMonitorTest,
        options,
      ),
    get: (
      resourceGroupName: string,
      peeringServiceName: string,
      connectionMonitorTestName: string,
      options?: ConnectionMonitorTestsGetOptionalParams,
    ) => get(context, resourceGroupName, peeringServiceName, connectionMonitorTestName, options),
  };
}

export function _getConnectionMonitorTestsOperations(
  context: PeeringManagementContext,
): ConnectionMonitorTestsOperations {
  return {
    ..._getConnectionMonitorTests(context),
  };
}
