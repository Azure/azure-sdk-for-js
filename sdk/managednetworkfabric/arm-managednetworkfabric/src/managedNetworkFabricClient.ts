// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ManagedNetworkFabricContext,
  ManagedNetworkFabricClientOptionalParams,
} from "./api/index.js";
import { createManagedNetworkFabric } from "./api/index.js";
import type { AccessControlListsOperations } from "./classic/accessControlLists/index.js";
import { _getAccessControlListsOperations } from "./classic/accessControlLists/index.js";
import type { ExternalNetworksOperations } from "./classic/externalNetworks/index.js";
import { _getExternalNetworksOperations } from "./classic/externalNetworks/index.js";
import type { InternalNetworksOperations } from "./classic/internalNetworks/index.js";
import { _getInternalNetworksOperations } from "./classic/internalNetworks/index.js";
import type { InternetGatewayRulesOperations } from "./classic/internetGatewayRules/index.js";
import { _getInternetGatewayRulesOperations } from "./classic/internetGatewayRules/index.js";
import type { InternetGatewaysOperations } from "./classic/internetGateways/index.js";
import { _getInternetGatewaysOperations } from "./classic/internetGateways/index.js";
import type { IpCommunitiesOperations } from "./classic/ipCommunities/index.js";
import { _getIpCommunitiesOperations } from "./classic/ipCommunities/index.js";
import type { IpExtendedCommunitiesOperations } from "./classic/ipExtendedCommunities/index.js";
import { _getIpExtendedCommunitiesOperations } from "./classic/ipExtendedCommunities/index.js";
import type { IpPrefixesOperations } from "./classic/ipPrefixes/index.js";
import { _getIpPrefixesOperations } from "./classic/ipPrefixes/index.js";
import type { L2IsolationDomainsOperations } from "./classic/l2IsolationDomains/index.js";
import { _getL2IsolationDomainsOperations } from "./classic/l2IsolationDomains/index.js";
import type { L3IsolationDomainsOperations } from "./classic/l3IsolationDomains/index.js";
import { _getL3IsolationDomainsOperations } from "./classic/l3IsolationDomains/index.js";
import type { NeighborGroupsOperations } from "./classic/neighborGroups/index.js";
import { _getNeighborGroupsOperations } from "./classic/neighborGroups/index.js";
import type { NetworkDeviceSkusOperations } from "./classic/networkDeviceSkus/index.js";
import { _getNetworkDeviceSkusOperations } from "./classic/networkDeviceSkus/index.js";
import type { NetworkDevicesOperations } from "./classic/networkDevices/index.js";
import { _getNetworkDevicesOperations } from "./classic/networkDevices/index.js";
import type { NetworkFabricControllersOperations } from "./classic/networkFabricControllers/index.js";
import { _getNetworkFabricControllersOperations } from "./classic/networkFabricControllers/index.js";
import type { NetworkFabricSkusOperations } from "./classic/networkFabricSkus/index.js";
import { _getNetworkFabricSkusOperations } from "./classic/networkFabricSkus/index.js";
import type { NetworkFabricsOperations } from "./classic/networkFabrics/index.js";
import { _getNetworkFabricsOperations } from "./classic/networkFabrics/index.js";
import type { NetworkInterfacesOperations } from "./classic/networkInterfaces/index.js";
import { _getNetworkInterfacesOperations } from "./classic/networkInterfaces/index.js";
import type { NetworkMonitorsOperations } from "./classic/networkMonitors/index.js";
import { _getNetworkMonitorsOperations } from "./classic/networkMonitors/index.js";
import type { NetworkPacketBrokersOperations } from "./classic/networkPacketBrokers/index.js";
import { _getNetworkPacketBrokersOperations } from "./classic/networkPacketBrokers/index.js";
import type { NetworkRacksOperations } from "./classic/networkRacks/index.js";
import { _getNetworkRacksOperations } from "./classic/networkRacks/index.js";
import type { NetworkTapRulesOperations } from "./classic/networkTapRules/index.js";
import { _getNetworkTapRulesOperations } from "./classic/networkTapRules/index.js";
import type { NetworkTapsOperations } from "./classic/networkTaps/index.js";
import { _getNetworkTapsOperations } from "./classic/networkTaps/index.js";
import type { NetworkToNetworkInterconnectsOperations } from "./classic/networkToNetworkInterconnects/index.js";
import { _getNetworkToNetworkInterconnectsOperations } from "./classic/networkToNetworkInterconnects/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { RoutePoliciesOperations } from "./classic/routePolicies/index.js";
import { _getRoutePoliciesOperations } from "./classic/routePolicies/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ManagedNetworkFabricClientOptionalParams } from "./api/managedNetworkFabricContext.js";

export class ManagedNetworkFabricClient {
  private _client: ManagedNetworkFabricContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Self service experience for Azure Network Fabric API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ManagedNetworkFabricClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createManagedNetworkFabric(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.networkMonitors = _getNetworkMonitorsOperations(this._client);
    this.routePolicies = _getRoutePoliciesOperations(this._client);
    this.networkTaps = _getNetworkTapsOperations(this._client);
    this.networkTapRules = _getNetworkTapRulesOperations(this._client);
    this.networkRacks = _getNetworkRacksOperations(this._client);
    this.networkPacketBrokers = _getNetworkPacketBrokersOperations(this._client);
    this.networkToNetworkInterconnects = _getNetworkToNetworkInterconnectsOperations(this._client);
    this.networkFabrics = _getNetworkFabricsOperations(this._client);
    this.networkFabricSkus = _getNetworkFabricSkusOperations(this._client);
    this.networkFabricControllers = _getNetworkFabricControllersOperations(this._client);
    this.networkInterfaces = _getNetworkInterfacesOperations(this._client);
    this.networkDevices = _getNetworkDevicesOperations(this._client);
    this.networkDeviceSkus = _getNetworkDeviceSkusOperations(this._client);
    this.neighborGroups = _getNeighborGroupsOperations(this._client);
    this.externalNetworks = _getExternalNetworksOperations(this._client);
    this.internalNetworks = _getInternalNetworksOperations(this._client);
    this.l3IsolationDomains = _getL3IsolationDomainsOperations(this._client);
    this.l2IsolationDomains = _getL2IsolationDomainsOperations(this._client);
    this.ipPrefixes = _getIpPrefixesOperations(this._client);
    this.ipExtendedCommunities = _getIpExtendedCommunitiesOperations(this._client);
    this.ipCommunities = _getIpCommunitiesOperations(this._client);
    this.internetGateways = _getInternetGatewaysOperations(this._client);
    this.internetGatewayRules = _getInternetGatewayRulesOperations(this._client);
    this.accessControlLists = _getAccessControlListsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for networkMonitors */
  public readonly networkMonitors: NetworkMonitorsOperations;
  /** The operation groups for routePolicies */
  public readonly routePolicies: RoutePoliciesOperations;
  /** The operation groups for networkTaps */
  public readonly networkTaps: NetworkTapsOperations;
  /** The operation groups for networkTapRules */
  public readonly networkTapRules: NetworkTapRulesOperations;
  /** The operation groups for networkRacks */
  public readonly networkRacks: NetworkRacksOperations;
  /** The operation groups for networkPacketBrokers */
  public readonly networkPacketBrokers: NetworkPacketBrokersOperations;
  /** The operation groups for networkToNetworkInterconnects */
  public readonly networkToNetworkInterconnects: NetworkToNetworkInterconnectsOperations;
  /** The operation groups for networkFabrics */
  public readonly networkFabrics: NetworkFabricsOperations;
  /** The operation groups for networkFabricSkus */
  public readonly networkFabricSkus: NetworkFabricSkusOperations;
  /** The operation groups for networkFabricControllers */
  public readonly networkFabricControllers: NetworkFabricControllersOperations;
  /** The operation groups for networkInterfaces */
  public readonly networkInterfaces: NetworkInterfacesOperations;
  /** The operation groups for networkDevices */
  public readonly networkDevices: NetworkDevicesOperations;
  /** The operation groups for networkDeviceSkus */
  public readonly networkDeviceSkus: NetworkDeviceSkusOperations;
  /** The operation groups for neighborGroups */
  public readonly neighborGroups: NeighborGroupsOperations;
  /** The operation groups for externalNetworks */
  public readonly externalNetworks: ExternalNetworksOperations;
  /** The operation groups for internalNetworks */
  public readonly internalNetworks: InternalNetworksOperations;
  /** The operation groups for l3IsolationDomains */
  public readonly l3IsolationDomains: L3IsolationDomainsOperations;
  /** The operation groups for l2IsolationDomains */
  public readonly l2IsolationDomains: L2IsolationDomainsOperations;
  /** The operation groups for ipPrefixes */
  public readonly ipPrefixes: IpPrefixesOperations;
  /** The operation groups for ipExtendedCommunities */
  public readonly ipExtendedCommunities: IpExtendedCommunitiesOperations;
  /** The operation groups for ipCommunities */
  public readonly ipCommunities: IpCommunitiesOperations;
  /** The operation groups for internetGateways */
  public readonly internetGateways: InternetGatewaysOperations;
  /** The operation groups for internetGatewayRules */
  public readonly internetGatewayRules: InternetGatewayRulesOperations;
  /** The operation groups for accessControlLists */
  public readonly accessControlLists: AccessControlListsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
