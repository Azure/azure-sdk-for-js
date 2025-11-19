// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricClient } from "./managedNetworkFabricClient.js";
import {
  _updateAdministrativeStateDeserialize,
  _$deleteDeserialize,
  _updateDeserialize,
  _createDeserialize,
} from "./api/networkMonitors/operations.js";
import {
  _commitConfigurationDeserialize,
  _validateConfigurationDeserialize,
  _updateAdministrativeStateDeserialize as _updateAdministrativeStateDeserializeRoutePolicies,
  _$deleteDeserialize as _$deleteDeserializeRoutePolicies,
  _updateDeserialize as _updateDeserializeRoutePolicies,
  _createDeserialize as _createDeserializeRoutePolicies,
} from "./api/routePolicies/operations.js";
import {
  _resyncDeserialize,
  _updateAdministrativeStateDeserialize as _updateAdministrativeStateDeserializeNetworkTaps,
  _$deleteDeserialize as _$deleteDeserializeNetworkTaps,
  _updateDeserialize as _updateDeserializeNetworkTaps,
  _createDeserialize as _createDeserializeNetworkTaps,
} from "./api/networkTaps/operations.js";
import {
  _validateConfigurationDeserialize as _validateConfigurationDeserializeNetworkTapRules,
  _resyncDeserialize as _resyncDeserializeNetworkTapRules,
  _updateAdministrativeStateDeserialize as _updateAdministrativeStateDeserializeNetworkTapRules,
  _$deleteDeserialize as _$deleteDeserializeNetworkTapRules,
  _updateDeserialize as _updateDeserializeNetworkTapRules,
  _createDeserialize as _createDeserializeNetworkTapRules,
} from "./api/networkTapRules/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeNetworkRacks,
  _updateDeserialize as _updateDeserializeNetworkRacks,
  _createDeserialize as _createDeserializeNetworkRacks,
} from "./api/networkRacks/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeNetworkPacketBrokers,
  _updateDeserialize as _updateDeserializeNetworkPacketBrokers,
  _createDeserialize as _createDeserializeNetworkPacketBrokers,
} from "./api/networkPacketBrokers/operations.js";
import {
  _updateBfdAdministrativeStateDeserialize,
  _updateAdministrativeStateDeserialize as _updateAdministrativeStateDeserializeNetworkToNetworkInterconnects,
  _$deleteDeserialize as _$deleteDeserializeNetworkToNetworkInterconnects,
  _updateDeserialize as _updateDeserializeNetworkToNetworkInterconnects,
  _createDeserialize as _createDeserializeNetworkToNetworkInterconnects,
} from "./api/networkToNetworkInterconnects/operations.js";
import {
  _armConfigurationDiffDeserialize,
  _viewDeviceConfigurationDeserialize,
  _lockFabricDeserialize,
  _discardCommitBatchDeserialize,
  _commitBatchStatusDeserialize,
  _commitConfigurationDeserialize as _commitConfigurationDeserializeNetworkFabrics,
  _getTopologyDeserialize,
  _validateConfigurationDeserialize as _validateConfigurationDeserializeNetworkFabrics,
  _updateInfraManagementBfdConfigurationDeserialize,
  _updateWorkloadManagementBfdConfigurationDeserialize,
  _refreshConfigurationDeserialize,
  _upgradeDeserialize,
  _deprovisionDeserialize,
  _provisionDeserialize,
  _$deleteDeserialize as _$deleteDeserializeNetworkFabrics,
  _updateDeserialize as _updateDeserializeNetworkFabrics,
  _createDeserialize as _createDeserializeNetworkFabrics,
} from "./api/networkFabrics/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeNetworkFabricControllers,
  _updateDeserialize as _updateDeserializeNetworkFabricControllers,
  _createDeserialize as _createDeserializeNetworkFabricControllers,
} from "./api/networkFabricControllers/operations.js";
import {
  _updateAdministrativeStateDeserialize as _updateAdministrativeStateDeserializeNetworkInterfaces,
  _$deleteDeserialize as _$deleteDeserializeNetworkInterfaces,
  _updateDeserialize as _updateDeserializeNetworkInterfaces,
  _createDeserialize as _createDeserializeNetworkInterfaces,
} from "./api/networkInterfaces/operations.js";
import {
  _runRwCommandDeserialize,
  _runRoCommandDeserialize,
  _upgradeDeserialize as _upgradeDeserializeNetworkDevices,
  _updateAdministrativeStateDeserialize as _updateAdministrativeStateDeserializeNetworkDevices,
  _refreshConfigurationDeserialize as _refreshConfigurationDeserializeNetworkDevices,
  _rebootDeserialize,
  _$deleteDeserialize as _$deleteDeserializeNetworkDevices,
  _updateDeserialize as _updateDeserializeNetworkDevices,
  _createDeserialize as _createDeserializeNetworkDevices,
} from "./api/networkDevices/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeNeighborGroups,
  _updateDeserialize as _updateDeserializeNeighborGroups,
  _createDeserialize as _createDeserializeNeighborGroups,
} from "./api/neighborGroups/operations.js";
import {
  _updateBfdAdministrativeStateDeserialize as _updateBfdAdministrativeStateDeserializeExternalNetworks,
  _updateAdministrativeStateDeserialize as _updateAdministrativeStateDeserializeExternalNetworks,
  _$deleteDeserialize as _$deleteDeserializeExternalNetworks,
  _updateDeserialize as _updateDeserializeExternalNetworks,
  _createDeserialize as _createDeserializeExternalNetworks,
} from "./api/externalNetworks/operations.js";
import {
  _updateBfdAdministrativeStateDeserialize as _updateBfdAdministrativeStateDeserializeInternalNetworks,
  _updateBgpAdministrativeStateDeserialize,
  _updateAdministrativeStateDeserialize as _updateAdministrativeStateDeserializeInternalNetworks,
  _$deleteDeserialize as _$deleteDeserializeInternalNetworks,
  _updateDeserialize as _updateDeserializeInternalNetworks,
  _createDeserialize as _createDeserializeInternalNetworks,
} from "./api/internalNetworks/operations.js";
import {
  _commitConfigurationDeserialize as _commitConfigurationDeserializeL3IsolationDomains,
  _validateConfigurationDeserialize as _validateConfigurationDeserializeL3IsolationDomains,
  _updateAdministrativeStateDeserialize as _updateAdministrativeStateDeserializeL3IsolationDomains,
  _$deleteDeserialize as _$deleteDeserializeL3IsolationDomains,
  _updateDeserialize as _updateDeserializeL3IsolationDomains,
  _createDeserialize as _createDeserializeL3IsolationDomains,
} from "./api/l3IsolationDomains/operations.js";
import {
  _commitConfigurationDeserialize as _commitConfigurationDeserializeL2IsolationDomains,
  _validateConfigurationDeserialize as _validateConfigurationDeserializeL2IsolationDomains,
  _updateAdministrativeStateDeserialize as _updateAdministrativeStateDeserializeL2IsolationDomains,
  _$deleteDeserialize as _$deleteDeserializeL2IsolationDomains,
  _updateDeserialize as _updateDeserializeL2IsolationDomains,
  _createDeserialize as _createDeserializeL2IsolationDomains,
} from "./api/l2IsolationDomains/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeIpPrefixes,
  _updateDeserialize as _updateDeserializeIpPrefixes,
  _createDeserialize as _createDeserializeIpPrefixes,
} from "./api/ipPrefixes/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeIpExtendedCommunities,
  _updateDeserialize as _updateDeserializeIpExtendedCommunities,
  _createDeserialize as _createDeserializeIpExtendedCommunities,
} from "./api/ipExtendedCommunities/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeIpCommunities,
  _updateDeserialize as _updateDeserializeIpCommunities,
  _createDeserialize as _createDeserializeIpCommunities,
} from "./api/ipCommunities/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeInternetGateways,
  _updateDeserialize as _updateDeserializeInternetGateways,
  _createDeserialize as _createDeserializeInternetGateways,
} from "./api/internetGateways/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeInternetGatewayRules,
  _updateDeserialize as _updateDeserializeInternetGatewayRules,
  _createDeserialize as _createDeserializeInternetGatewayRules,
} from "./api/internetGatewayRules/operations.js";
import {
  _validateConfigurationDeserialize as _validateConfigurationDeserializeAccessControlLists,
  _resyncDeserialize as _resyncDeserializeAccessControlLists,
  _updateAdministrativeStateDeserialize as _updateAdministrativeStateDeserializeAccessControlLists,
  _$deleteDeserialize as _$deleteDeserializeAccessControlLists,
  _updateDeserialize as _updateDeserializeAccessControlLists,
  _createDeserialize as _createDeserializeAccessControlLists,
} from "./api/accessControlLists/operations.js";
import { getLongRunningPoller } from "./static-helpers/pollingHelpers.js";
import type { OperationOptions, PathUncheckedResponse } from "@azure-rest/core-client";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { PollerLike, OperationState, ResourceLocationConfig } from "@azure/core-lro";
import { deserializeState } from "@azure/core-lro";

export interface RestorePollerOptions<
  TResult,
  TResponse extends PathUncheckedResponse = PathUncheckedResponse,
> extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;
  /** Deserialization function for raw response body */
  processResponseBody?: (result: TResponse) => Promise<TResult>;
}

/**
 * Creates a poller from the serialized state of another poller. This can be
 * useful when you want to create pollers on a different host or a poller
 * needs to be constructed after the original one is not in scope.
 */
export function restorePoller<TResponse extends PathUncheckedResponse, TResult>(
  client: ManagedNetworkFabricClient,
  serializedState: string,
  sourceOperation: (...args: any[]) => PollerLike<OperationState<TResult>, TResult>,
  options?: RestorePollerOptions<TResult>,
): PollerLike<OperationState<TResult>, TResult> {
  const pollerConfig = deserializeState(serializedState).config;
  const { initialRequestUrl, requestMethod, metadata } = pollerConfig;
  if (!initialRequestUrl || !requestMethod) {
    throw new Error(
      `Invalid serialized state: ${serializedState} for sourceOperation ${sourceOperation?.name}`,
    );
  }
  const resourceLocationConfig = metadata?.["resourceLocationConfig"] as
    | ResourceLocationConfig
    | undefined;
  const { deserializer, expectedStatuses = [] } =
    getDeserializationHelper(initialRequestUrl, requestMethod) ?? {};
  const deserializeHelper = options?.processResponseBody ?? deserializer;
  if (!deserializeHelper) {
    throw new Error(
      `Please ensure the operation is in this client! We can't find its deserializeHelper for ${sourceOperation?.name}.`,
    );
  }
  return getLongRunningPoller(
    (client as any)["_client"] ?? client,
    deserializeHelper as (result: TResponse) => Promise<TResult>,
    expectedStatuses,
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      resourceLocationConfig,
      restoreFrom: serializedState,
      initialRequestUrl,
    },
  );
}

interface DeserializationHelper {
  deserializer: (result: PathUncheckedResponse) => Promise<any>;
  expectedStatuses: string[];
}

const deserializeMap: Record<string, DeserializationHelper> = {
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkMonitors/{networkMonitorName}/updateAdministrativeState":
    {
      deserializer: _updateAdministrativeStateDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkMonitors/{networkMonitorName}":
    {
      deserializer: _$deleteDeserialize,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkMonitors/{networkMonitorName}":
    {
      deserializer: _updateDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkMonitors/{networkMonitorName}":
    {
      deserializer: _createDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/routePolicies/{routePolicyName}/commitConfiguration":
    {
      deserializer: _commitConfigurationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/routePolicies/{routePolicyName}/validateConfiguration":
    {
      deserializer: _validateConfigurationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/routePolicies/{routePolicyName}/updateAdministrativeState":
    {
      deserializer: _updateAdministrativeStateDeserializeRoutePolicies,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/routePolicies/{routePolicyName}":
    {
      deserializer: _$deleteDeserializeRoutePolicies,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/routePolicies/{routePolicyName}":
    {
      deserializer: _updateDeserializeRoutePolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/routePolicies/{routePolicyName}":
    {
      deserializer: _createDeserializeRoutePolicies,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTaps/{networkTapName}/resync":
    {
      deserializer: _resyncDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTaps/{networkTapName}/updateAdministrativeState":
    {
      deserializer: _updateAdministrativeStateDeserializeNetworkTaps,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTaps/{networkTapName}":
    {
      deserializer: _$deleteDeserializeNetworkTaps,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTaps/{networkTapName}":
    {
      deserializer: _updateDeserializeNetworkTaps,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTaps/{networkTapName}":
    {
      deserializer: _createDeserializeNetworkTaps,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTapRules/{networkTapRuleName}/validateConfiguration":
    {
      deserializer: _validateConfigurationDeserializeNetworkTapRules,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTapRules/{networkTapRuleName}/resync":
    {
      deserializer: _resyncDeserializeNetworkTapRules,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTapRules/{networkTapRuleName}/updateAdministrativeState":
    {
      deserializer: _updateAdministrativeStateDeserializeNetworkTapRules,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTapRules/{networkTapRuleName}":
    {
      deserializer: _$deleteDeserializeNetworkTapRules,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTapRules/{networkTapRuleName}":
    {
      deserializer: _updateDeserializeNetworkTapRules,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTapRules/{networkTapRuleName}":
    {
      deserializer: _createDeserializeNetworkTapRules,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkRacks/{networkRackName}":
    {
      deserializer: _$deleteDeserializeNetworkRacks,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkRacks/{networkRackName}":
    {
      deserializer: _updateDeserializeNetworkRacks,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkRacks/{networkRackName}":
    {
      deserializer: _createDeserializeNetworkRacks,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkPacketBrokers/{networkPacketBrokerName}":
    {
      deserializer: _$deleteDeserializeNetworkPacketBrokers,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkPacketBrokers/{networkPacketBrokerName}":
    {
      deserializer: _updateDeserializeNetworkPacketBrokers,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkPacketBrokers/{networkPacketBrokerName}":
    {
      deserializer: _createDeserializeNetworkPacketBrokers,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/networkToNetworkInterconnects/{networkToNetworkInterconnectName}/updateBfdAdministrativeState":
    {
      deserializer: _updateBfdAdministrativeStateDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/networkToNetworkInterconnects/{networkToNetworkInterconnectName}/updateAdministrativeState":
    {
      deserializer: _updateAdministrativeStateDeserializeNetworkToNetworkInterconnects,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/networkToNetworkInterconnects/{networkToNetworkInterconnectName}":
    {
      deserializer: _$deleteDeserializeNetworkToNetworkInterconnects,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/networkToNetworkInterconnects/{networkToNetworkInterconnectName}":
    {
      deserializer: _updateDeserializeNetworkToNetworkInterconnects,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/networkToNetworkInterconnects/{networkToNetworkInterconnectName}":
    {
      deserializer: _createDeserializeNetworkToNetworkInterconnects,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/armConfigurationDiff":
    {
      deserializer: _armConfigurationDiffDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/viewDeviceConfiguration":
    {
      deserializer: _viewDeviceConfigurationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/lockFabric":
    {
      deserializer: _lockFabricDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/discardCommitBatch":
    {
      deserializer: _discardCommitBatchDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/commitBatchStatus":
    {
      deserializer: _commitBatchStatusDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/commitConfiguration":
    {
      deserializer: _commitConfigurationDeserializeNetworkFabrics,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/getTopology":
    {
      deserializer: _getTopologyDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/validateConfiguration":
    {
      deserializer: _validateConfigurationDeserializeNetworkFabrics,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/updateInfraManagementBfdConfiguration":
    {
      deserializer: _updateInfraManagementBfdConfigurationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/updateWorkloadManagementBfdConfiguration":
    {
      deserializer: _updateWorkloadManagementBfdConfigurationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/refreshConfiguration":
    {
      deserializer: _refreshConfigurationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/upgrade":
    {
      deserializer: _upgradeDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/deprovision":
    {
      deserializer: _deprovisionDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/provision":
    {
      deserializer: _provisionDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}":
    {
      deserializer: _$deleteDeserializeNetworkFabrics,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}":
    {
      deserializer: _updateDeserializeNetworkFabrics,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}":
    {
      deserializer: _createDeserializeNetworkFabrics,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabricControllers/{networkFabricControllerName}":
    {
      deserializer: _$deleteDeserializeNetworkFabricControllers,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabricControllers/{networkFabricControllerName}":
    {
      deserializer: _updateDeserializeNetworkFabricControllers,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabricControllers/{networkFabricControllerName}":
    {
      deserializer: _createDeserializeNetworkFabricControllers,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/networkInterfaces/{networkInterfaceName}/updateAdministrativeState":
    {
      deserializer: _updateAdministrativeStateDeserializeNetworkInterfaces,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/networkInterfaces/{networkInterfaceName}":
    {
      deserializer: _$deleteDeserializeNetworkInterfaces,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/networkInterfaces/{networkInterfaceName}":
    {
      deserializer: _updateDeserializeNetworkInterfaces,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/networkInterfaces/{networkInterfaceName}":
    {
      deserializer: _createDeserializeNetworkInterfaces,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/runRwCommand":
    {
      deserializer: _runRwCommandDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/runRoCommand":
    {
      deserializer: _runRoCommandDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/upgrade":
    {
      deserializer: _upgradeDeserializeNetworkDevices,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/updateAdministrativeState":
    {
      deserializer: _updateAdministrativeStateDeserializeNetworkDevices,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/refreshConfiguration":
    {
      deserializer: _refreshConfigurationDeserializeNetworkDevices,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/reboot":
    {
      deserializer: _rebootDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}":
    {
      deserializer: _$deleteDeserializeNetworkDevices,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}":
    {
      deserializer: _updateDeserializeNetworkDevices,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}":
    {
      deserializer: _createDeserializeNetworkDevices,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/neighborGroups/{neighborGroupName}":
    {
      deserializer: _$deleteDeserializeNeighborGroups,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/neighborGroups/{neighborGroupName}":
    {
      deserializer: _updateDeserializeNeighborGroups,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/neighborGroups/{neighborGroupName}":
    {
      deserializer: _createDeserializeNeighborGroups,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}/updateBfdAdministrativeState":
    {
      deserializer: _updateBfdAdministrativeStateDeserializeExternalNetworks,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}/updateAdministrativeState":
    {
      deserializer: _updateAdministrativeStateDeserializeExternalNetworks,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}":
    {
      deserializer: _$deleteDeserializeExternalNetworks,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}":
    {
      deserializer: _updateDeserializeExternalNetworks,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}":
    {
      deserializer: _createDeserializeExternalNetworks,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}/updateBfdAdministrativeState":
    {
      deserializer: _updateBfdAdministrativeStateDeserializeInternalNetworks,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}/updateBgpAdministrativeState":
    {
      deserializer: _updateBgpAdministrativeStateDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}/updateAdministrativeState":
    {
      deserializer: _updateAdministrativeStateDeserializeInternalNetworks,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}":
    {
      deserializer: _$deleteDeserializeInternalNetworks,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}":
    {
      deserializer: _updateDeserializeInternalNetworks,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}":
    {
      deserializer: _createDeserializeInternalNetworks,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/commitConfiguration":
    {
      deserializer: _commitConfigurationDeserializeL3IsolationDomains,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/validateConfiguration":
    {
      deserializer: _validateConfigurationDeserializeL3IsolationDomains,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/updateAdministrativeState":
    {
      deserializer: _updateAdministrativeStateDeserializeL3IsolationDomains,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}":
    {
      deserializer: _$deleteDeserializeL3IsolationDomains,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}":
    {
      deserializer: _updateDeserializeL3IsolationDomains,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}":
    {
      deserializer: _createDeserializeL3IsolationDomains,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains/{l2IsolationDomainName}/commitConfiguration":
    {
      deserializer: _commitConfigurationDeserializeL2IsolationDomains,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains/{l2IsolationDomainName}/validateConfiguration":
    {
      deserializer: _validateConfigurationDeserializeL2IsolationDomains,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains/{l2IsolationDomainName}/updateAdministrativeState":
    {
      deserializer: _updateAdministrativeStateDeserializeL2IsolationDomains,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains/{l2IsolationDomainName}":
    {
      deserializer: _$deleteDeserializeL2IsolationDomains,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains/{l2IsolationDomainName}":
    {
      deserializer: _updateDeserializeL2IsolationDomains,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains/{l2IsolationDomainName}":
    {
      deserializer: _createDeserializeL2IsolationDomains,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipPrefixes/{ipPrefixName}":
    {
      deserializer: _$deleteDeserializeIpPrefixes,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipPrefixes/{ipPrefixName}":
    {
      deserializer: _updateDeserializeIpPrefixes,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipPrefixes/{ipPrefixName}":
    {
      deserializer: _createDeserializeIpPrefixes,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipExtendedCommunities/{ipExtendedCommunityName}":
    {
      deserializer: _$deleteDeserializeIpExtendedCommunities,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipExtendedCommunities/{ipExtendedCommunityName}":
    {
      deserializer: _updateDeserializeIpExtendedCommunities,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipExtendedCommunities/{ipExtendedCommunityName}":
    {
      deserializer: _createDeserializeIpExtendedCommunities,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipCommunities/{ipCommunityName}":
    {
      deserializer: _$deleteDeserializeIpCommunities,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipCommunities/{ipCommunityName}":
    {
      deserializer: _updateDeserializeIpCommunities,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipCommunities/{ipCommunityName}":
    {
      deserializer: _createDeserializeIpCommunities,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/internetGateways/{internetGatewayName}":
    {
      deserializer: _$deleteDeserializeInternetGateways,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/internetGateways/{internetGatewayName}":
    {
      deserializer: _updateDeserializeInternetGateways,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/internetGateways/{internetGatewayName}":
    {
      deserializer: _createDeserializeInternetGateways,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/internetGatewayRules/{internetGatewayRuleName}":
    {
      deserializer: _$deleteDeserializeInternetGatewayRules,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/internetGatewayRules/{internetGatewayRuleName}":
    {
      deserializer: _updateDeserializeInternetGatewayRules,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/internetGatewayRules/{internetGatewayRuleName}":
    {
      deserializer: _createDeserializeInternetGatewayRules,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists/{accessControlListName}/validateConfiguration":
    {
      deserializer: _validateConfigurationDeserializeAccessControlLists,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists/{accessControlListName}/resync":
    {
      deserializer: _resyncDeserializeAccessControlLists,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists/{accessControlListName}/updateAdministrativeState":
    {
      deserializer: _updateAdministrativeStateDeserializeAccessControlLists,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists/{accessControlListName}":
    {
      deserializer: _$deleteDeserializeAccessControlLists,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists/{accessControlListName}":
    {
      deserializer: _updateDeserializeAccessControlLists,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists/{accessControlListName}":
    {
      deserializer: _createDeserializeAccessControlLists,
      expectedStatuses: ["200", "201", "202"],
    },
};

function getDeserializationHelper(
  urlStr: string,
  method: string,
): DeserializationHelper | undefined {
  const path = new URL(urlStr).pathname;
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: DeserializationHelper | undefined;

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(deserializeMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || "",
        );

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
