// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HDInsightManagementContext } from "../../api/hdInsightManagementContext.js";
import {
  getAsyncOperationStatus,
  restartHosts,
  listHosts,
} from "../../api/virtualMachines/operations.js";
import type {
  VirtualMachinesGetAsyncOperationStatusOptionalParams,
  VirtualMachinesRestartHostsOptionalParams,
  VirtualMachinesListHostsOptionalParams,
} from "../../api/virtualMachines/options.js";
import type {
  AsyncOperationResult,
  VirtualMachinesListHostsResponse,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachines operations. */
export interface VirtualMachinesOperations {
  /** Gets the async operation status. */
  getAsyncOperationStatus: (
    resourceGroupName: string,
    clusterName: string,
    operationId: string,
    options?: VirtualMachinesGetAsyncOperationStatusOptionalParams,
  ) => Promise<AsyncOperationResult>;
  /** Restarts the specified HDInsight cluster hosts. */
  restartHosts: (
    resourceGroupName: string,
    clusterName: string,
    hosts: string[],
    options?: VirtualMachinesRestartHostsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restartHosts instead */
  beginRestartHosts: (
    resourceGroupName: string,
    clusterName: string,
    hosts: string[],
    options?: VirtualMachinesRestartHostsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restartHosts instead */
  beginRestartHostsAndWait: (
    resourceGroupName: string,
    clusterName: string,
    hosts: string[],
    options?: VirtualMachinesRestartHostsOptionalParams,
  ) => Promise<void>;
  /** Lists the HDInsight clusters hosts */
  listHosts: (
    resourceGroupName: string,
    clusterName: string,
    options?: VirtualMachinesListHostsOptionalParams,
  ) => Promise<VirtualMachinesListHostsResponse>;
}

function _getVirtualMachines(context: HDInsightManagementContext) {
  return {
    getAsyncOperationStatus: (
      resourceGroupName: string,
      clusterName: string,
      operationId: string,
      options?: VirtualMachinesGetAsyncOperationStatusOptionalParams,
    ) => getAsyncOperationStatus(context, resourceGroupName, clusterName, operationId, options),
    restartHosts: (
      resourceGroupName: string,
      clusterName: string,
      hosts: string[],
      options?: VirtualMachinesRestartHostsOptionalParams,
    ) => restartHosts(context, resourceGroupName, clusterName, hosts, options),
    beginRestartHosts: async (
      resourceGroupName: string,
      clusterName: string,
      hosts: string[],
      options?: VirtualMachinesRestartHostsOptionalParams,
    ) => {
      const poller = restartHosts(context, resourceGroupName, clusterName, hosts, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartHostsAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      hosts: string[],
      options?: VirtualMachinesRestartHostsOptionalParams,
    ) => {
      return await restartHosts(context, resourceGroupName, clusterName, hosts, options);
    },
    listHosts: (
      resourceGroupName: string,
      clusterName: string,
      options?: VirtualMachinesListHostsOptionalParams,
    ) => listHosts(context, resourceGroupName, clusterName, options),
  };
}

export function _getVirtualMachinesOperations(
  context: HDInsightManagementContext,
): VirtualMachinesOperations {
  return {
    ..._getVirtualMachines(context),
  };
}
