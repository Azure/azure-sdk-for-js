// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureNetworkFabricManagementServiceAPIContext,
  AzureNetworkFabricManagementServiceAPIOptionalParams,
  createAzureNetworkFabricManagementServiceAPI,
} from "./api/index.js";
import {
  AccessControlListsOperations,
  _getAccessControlListsOperations,
} from "./classic/accessControlLists/index.js";
import {
  ExternalNetworksOperations,
  _getExternalNetworksOperations,
} from "./classic/externalNetworks/index.js";
import {
  InternalNetworksOperations,
  _getInternalNetworksOperations,
} from "./classic/internalNetworks/index.js";
import {
  InternetGatewayRulesOperations,
  _getInternetGatewayRulesOperations,
} from "./classic/internetGatewayRules/index.js";
import {
  InternetGatewaysOperations,
  _getInternetGatewaysOperations,
} from "./classic/internetGateways/index.js";
import {
  IpCommunitiesOperations,
  _getIpCommunitiesOperations,
} from "./classic/ipCommunities/index.js";
import {
  IpExtendedCommunitiesOperations,
  _getIpExtendedCommunitiesOperations,
} from "./classic/ipExtendedCommunities/index.js";
import { IpPrefixesOperations, _getIpPrefixesOperations } from "./classic/ipPrefixes/index.js";
import {
  L2IsolationDomainsOperations,
  _getL2IsolationDomainsOperations,
} from "./classic/l2IsolationDomains/index.js";
import {
  L3IsolationDomainsOperations,
  _getL3IsolationDomainsOperations,
} from "./classic/l3IsolationDomains/index.js";
import {
  NeighborGroupsOperations,
  _getNeighborGroupsOperations,
} from "./classic/neighborGroups/index.js";
import {
  NetworkBootstrapDevicesOperations,
  _getNetworkBootstrapDevicesOperations,
} from "./classic/networkBootstrapDevices/index.js";
import {
  NetworkBootstrapInterfacesOperations,
  _getNetworkBootstrapInterfacesOperations,
} from "./classic/networkBootstrapInterfaces/index.js";
import {
  NetworkDeviceSkusOperations,
  _getNetworkDeviceSkusOperations,
} from "./classic/networkDeviceSkus/index.js";
import {
  NetworkDevicesOperations,
  _getNetworkDevicesOperations,
} from "./classic/networkDevices/index.js";
import {
  NetworkFabricControllersOperations,
  _getNetworkFabricControllersOperations,
} from "./classic/networkFabricControllers/index.js";
import {
  NetworkFabricSkusOperations,
  _getNetworkFabricSkusOperations,
} from "./classic/networkFabricSkus/index.js";
import {
  NetworkFabricsOperations,
  _getNetworkFabricsOperations,
} from "./classic/networkFabrics/index.js";
import {
  NetworkInterfacesOperations,
  _getNetworkInterfacesOperations,
} from "./classic/networkInterfaces/index.js";
import {
  NetworkMonitorsOperations,
  _getNetworkMonitorsOperations,
} from "./classic/networkMonitors/index.js";
import {
  NetworkPacketBrokersOperations,
  _getNetworkPacketBrokersOperations,
} from "./classic/networkPacketBrokers/index.js";
import {
  NetworkRacksOperations,
  _getNetworkRacksOperations,
} from "./classic/networkRacks/index.js";
import {
  NetworkTapRulesOperations,
  _getNetworkTapRulesOperations,
} from "./classic/networkTapRules/index.js";
import { NetworkTapsOperations, _getNetworkTapsOperations } from "./classic/networkTaps/index.js";
import {
  NetworkToNetworkInterconnectsOperations,
  _getNetworkToNetworkInterconnectsOperations,
} from "./classic/networkToNetworkInterconnects/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  RoutePoliciesOperations,
  _getRoutePoliciesOperations,
} from "./classic/routePolicies/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { AzureNetworkFabricManagementServiceAPIOptionalParams } from "./api/azureNetworkFabricManagementServiceAPIContext.js";

export class AzureNetworkFabricManagementServiceAPI {
  private _client: AzureNetworkFabricManagementServiceAPIContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Self service experience for Azure Network Fabric API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AzureNetworkFabricManagementServiceAPIOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAzureNetworkFabricManagementServiceAPI(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.networkBootstrapInterfaces = _getNetworkBootstrapInterfacesOperations(this._client);
    this.networkBootstrapDevices = _getNetworkBootstrapDevicesOperations(this._client);
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

  /** The operation groups for networkBootstrapInterfaces */
  public readonly networkBootstrapInterfaces: NetworkBootstrapInterfacesOperations;
  /** The operation groups for networkBootstrapDevices */
  public readonly networkBootstrapDevices: NetworkBootstrapDevicesOperations;
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
