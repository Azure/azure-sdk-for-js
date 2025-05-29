import * as coreClient from "@azure/core-client";
import * as coreAuth from "@azure/core-auth";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { ApplicationGateways, ApplicationGatewayPrivateLinkResources, ApplicationGatewayPrivateEndpointConnections, ApplicationGatewayWafDynamicManifestsDefault, ApplicationGatewayWafDynamicManifests, ApplicationSecurityGroups, AvailableDelegations, AvailableResourceGroupDelegations, AvailableServiceAliases, AzureFirewalls, AzureFirewallFqdnTags, WebCategories, BastionHosts, NetworkInterfaces, PublicIPAddresses, VipSwap, CustomIPPrefixes, DdosCustomPolicies, DdosProtectionPlans, DscpConfigurationOperations, AvailableEndpointServices, ExpressRouteCircuitAuthorizations, ExpressRouteCircuitPeerings, ExpressRouteCircuitConnections, PeerExpressRouteCircuitConnections, ExpressRouteCircuits, ExpressRouteServiceProviders, ExpressRouteCrossConnections, ExpressRouteCrossConnectionPeerings, ExpressRoutePortsLocations, ExpressRoutePorts, ExpressRouteLinks, ExpressRoutePortAuthorizations, ExpressRouteProviderPortsLocation, FirewallPolicies, FirewallPolicyRuleCollectionGroups, FirewallPolicyIdpsSignatures, FirewallPolicyIdpsSignaturesOverrides, FirewallPolicyIdpsSignaturesFilterValues, FirewallPolicyDrafts, FirewallPolicyDeployments, FirewallPolicyRuleCollectionGroupDrafts, IpamPools, StaticCidrs, IpAllocations, IpGroups, LoadBalancers, LoadBalancerBackendAddressPools, LoadBalancerFrontendIPConfigurations, InboundNatRules, LoadBalancerLoadBalancingRules, LoadBalancerOutboundRules, LoadBalancerNetworkInterfaces, LoadBalancerProbes, NatGateways, NetworkInterfaceIPConfigurations, NetworkInterfaceLoadBalancers, NetworkInterfaceTapConfigurations, NetworkManagers, NetworkManagerCommits, NetworkManagerDeploymentStatusOperations, SubscriptionNetworkManagerConnections, ManagementGroupNetworkManagerConnections, ConnectivityConfigurations, NetworkGroups, StaticMembers, NetworkManagerRoutingConfigurations, RoutingRuleCollections, RoutingRules, ScopeConnections, SecurityAdminConfigurations, AdminRuleCollections, AdminRules, SecurityUserConfigurations, SecurityUserRuleCollections, SecurityUserRules, NetworkProfiles, NetworkSecurityGroups, SecurityRules, DefaultSecurityRules, ReachabilityAnalysisIntents, ReachabilityAnalysisRuns, VerifierWorkspaces, NetworkVirtualAppliances, VirtualApplianceSites, VirtualApplianceSkus, InboundSecurityRuleOperations, NetworkWatchers, PacketCaptures, ConnectionMonitors, FlowLogs, Operations, PrivateEndpoints, AvailablePrivateEndpointTypes, PrivateDnsZoneGroups, PrivateLinkServices, PublicIPPrefixes, RouteFilters, RouteFilterRules, RouteTables, Routes, SecurityPartnerProviders, BgpServiceCommunities, ServiceEndpointPolicies, ServiceEndpointPolicyDefinitions, ServiceTags, ServiceTagInformationOperations, Usages, VirtualNetworks, Subnets, ResourceNavigationLinks, ServiceAssociationLinks, VirtualNetworkPeerings, VirtualNetworkGateways, VirtualNetworkGatewayConnections, LocalNetworkGateways, VirtualNetworkGatewayNatRules, VirtualNetworkTaps, VirtualRouters, VirtualRouterPeerings, VirtualWans, VpnSites, VpnSiteLinks, VpnSitesConfiguration, VpnServerConfigurations, ConfigurationPolicyGroups, VirtualHubs, RouteMaps, HubVirtualNetworkConnections, VpnGateways, VpnLinkConnections, VpnConnections, VpnSiteLinkConnections, NatRules, P2SVpnGateways, VpnServerConfigurationsAssociatedWithVirtualWan, VirtualHubRouteTableV2S, ExpressRouteGateways, ExpressRouteConnections, NetworkVirtualApplianceConnections, VirtualHubBgpConnection, VirtualHubBgpConnections, VirtualHubIpConfiguration, HubRouteTables, RoutingIntentOperations, WebApplicationFirewallPolicies } from "./operationsInterfaces/index.js";
import { NetworkManagementClientOptionalParams, BastionShareableLink, BastionShareableLinkListRequest, PutBastionShareableLinkOptionalParams, GetBastionShareableLinkOptionalParams, BastionActiveSession, GetActiveSessionsOptionalParams, BastionSessionState, SessionIds, DisconnectActiveSessionsOptionalParams, DeleteBastionShareableLinkOptionalParams, BastionShareableLinkTokenListRequest, DeleteBastionShareableLinkByTokenOptionalParams, DeleteBastionShareableLinkByTokenResponse, CheckDnsNameAvailabilityOptionalParams, CheckDnsNameAvailabilityResponse, ExpressRouteProviderPortOptionalParams, ExpressRouteProviderPortResponse, ActiveConfigurationParameter, ListActiveConnectivityConfigurationsOptionalParams, ListActiveConnectivityConfigurationsResponse, ListActiveSecurityAdminRulesOptionalParams, ListActiveSecurityAdminRulesResponse, QueryRequestOptions, ListNetworkManagerEffectiveConnectivityConfigurationsOptionalParams, ListNetworkManagerEffectiveConnectivityConfigurationsResponse, ListNetworkManagerEffectiveSecurityAdminRulesOptionalParams, ListNetworkManagerEffectiveSecurityAdminRulesResponse, SupportedSecurityProvidersOptionalParams, SupportedSecurityProvidersResponse, VirtualWanVpnProfileParameters, GeneratevirtualwanvpnserverconfigurationvpnprofileOptionalParams, GeneratevirtualwanvpnserverconfigurationvpnprofileResponse } from "./models/index.js";
export declare class NetworkManagementClient extends coreClient.ServiceClient {
    $host: string;
    subscriptionId?: string;
    /**
     * Initializes a new instance of the NetworkManagementClient class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param subscriptionId The subscription credentials which uniquely identify the Microsoft Azure
     *                       subscription. The subscription ID forms part of the URI for every service call.
     * @param options The parameter options
     */
    constructor(credentials: coreAuth.TokenCredential, subscriptionId: string, options?: NetworkManagementClientOptionalParams);
    constructor(credentials: coreAuth.TokenCredential, options?: NetworkManagementClientOptionalParams);
    /**
     * Creates a Bastion Shareable Links for all the VMs specified in the request.
     * @param resourceGroupName The name of the resource group.
     * @param bastionHostName The name of the Bastion Host.
     * @param bslRequest Post request for Create/Delete/Get Bastion Shareable Link endpoints.
     * @param options The options parameters.
     */
    beginListPutBastionShareableLinkAndWait(resourceGroupName: string, bastionHostName: string, bslRequest: BastionShareableLinkListRequest, options?: PutBastionShareableLinkOptionalParams): PagedAsyncIterableIterator<BastionShareableLink>;
    private putBastionShareableLinkPagingPage;
    private putBastionShareableLinkPagingAll;
    /**
     * Return the Bastion Shareable Links for all the VMs specified in the request.
     * @param resourceGroupName The name of the resource group.
     * @param bastionHostName The name of the Bastion Host.
     * @param bslRequest Post request for Create/Delete/Get Bastion Shareable Link endpoints.
     * @param options The options parameters.
     */
    listBastionShareableLink(resourceGroupName: string, bastionHostName: string, bslRequest: BastionShareableLinkListRequest, options?: GetBastionShareableLinkOptionalParams): PagedAsyncIterableIterator<BastionShareableLink>;
    private getBastionShareableLinkPagingPage;
    private getBastionShareableLinkPagingAll;
    /**
     * Returns the list of currently active sessions on the Bastion.
     * @param resourceGroupName The name of the resource group.
     * @param bastionHostName The name of the Bastion Host.
     * @param options The options parameters.
     */
    beginListActiveSessionsAndWait(resourceGroupName: string, bastionHostName: string, options?: GetActiveSessionsOptionalParams): PagedAsyncIterableIterator<BastionActiveSession>;
    private getActiveSessionsPagingPage;
    private getActiveSessionsPagingAll;
    /**
     * Returns the list of currently active sessions on the Bastion.
     * @param resourceGroupName The name of the resource group.
     * @param bastionHostName The name of the Bastion Host.
     * @param sessionIds The list of sessionids to disconnect.
     * @param options The options parameters.
     */
    listDisconnectActiveSessions(resourceGroupName: string, bastionHostName: string, sessionIds: SessionIds, options?: DisconnectActiveSessionsOptionalParams): PagedAsyncIterableIterator<BastionSessionState>;
    private disconnectActiveSessionsPagingPage;
    private disconnectActiveSessionsPagingAll;
    /**
     * Creates a Bastion Shareable Links for all the VMs specified in the request.
     * @param resourceGroupName The name of the resource group.
     * @param bastionHostName The name of the Bastion Host.
     * @param bslRequest Post request for Create/Delete/Get Bastion Shareable Link endpoints.
     * @param options The options parameters.
     */
    private _putBastionShareableLink;
    /**
     * Deletes the Bastion Shareable Links for all the VMs specified in the request.
     * @param resourceGroupName The name of the resource group.
     * @param bastionHostName The name of the Bastion Host.
     * @param bslRequest Post request for Create/Delete/Get Bastion Shareable Link endpoints.
     * @param options The options parameters.
     */
    beginDeleteBastionShareableLink(resourceGroupName: string, bastionHostName: string, bslRequest: BastionShareableLinkListRequest, options?: DeleteBastionShareableLinkOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the Bastion Shareable Links for all the VMs specified in the request.
     * @param resourceGroupName The name of the resource group.
     * @param bastionHostName The name of the Bastion Host.
     * @param bslRequest Post request for Create/Delete/Get Bastion Shareable Link endpoints.
     * @param options The options parameters.
     */
    beginDeleteBastionShareableLinkAndWait(resourceGroupName: string, bastionHostName: string, bslRequest: BastionShareableLinkListRequest, options?: DeleteBastionShareableLinkOptionalParams): Promise<void>;
    /**
     * Deletes the Bastion Shareable Links for all the tokens specified in the request.
     * @param resourceGroupName The name of the resource group.
     * @param bastionHostName The name of the Bastion Host.
     * @param bslTokenRequest Post request for Delete Bastion Shareable Link By Token endpoint.
     * @param options The options parameters.
     */
    beginDeleteBastionShareableLinkByToken(resourceGroupName: string, bastionHostName: string, bslTokenRequest: BastionShareableLinkTokenListRequest, options?: DeleteBastionShareableLinkByTokenOptionalParams): Promise<SimplePollerLike<OperationState<DeleteBastionShareableLinkByTokenResponse>, DeleteBastionShareableLinkByTokenResponse>>;
    /**
     * Deletes the Bastion Shareable Links for all the tokens specified in the request.
     * @param resourceGroupName The name of the resource group.
     * @param bastionHostName The name of the Bastion Host.
     * @param bslTokenRequest Post request for Delete Bastion Shareable Link By Token endpoint.
     * @param options The options parameters.
     */
    beginDeleteBastionShareableLinkByTokenAndWait(resourceGroupName: string, bastionHostName: string, bslTokenRequest: BastionShareableLinkTokenListRequest, options?: DeleteBastionShareableLinkByTokenOptionalParams): Promise<DeleteBastionShareableLinkByTokenResponse>;
    /**
     * Return the Bastion Shareable Links for all the VMs specified in the request.
     * @param resourceGroupName The name of the resource group.
     * @param bastionHostName The name of the Bastion Host.
     * @param bslRequest Post request for Create/Delete/Get Bastion Shareable Link endpoints.
     * @param options The options parameters.
     */
    private _getBastionShareableLink;
    /**
     * Returns the list of currently active sessions on the Bastion.
     * @param resourceGroupName The name of the resource group.
     * @param bastionHostName The name of the Bastion Host.
     * @param options The options parameters.
     */
    private _getActiveSessions;
    /**
     * Returns the list of currently active sessions on the Bastion.
     * @param resourceGroupName The name of the resource group.
     * @param bastionHostName The name of the Bastion Host.
     * @param sessionIds The list of sessionids to disconnect.
     * @param options The options parameters.
     */
    private _disconnectActiveSessions;
    /**
     * Checks whether a domain name in the cloudapp.azure.com zone is available for use.
     * @param location The location of the domain name.
     * @param domainNameLabel The domain name to be verified. It must conform to the following regular
     *                        expression: ^[a-z][a-z0-9-]{1,61}[a-z0-9]$.
     * @param options The options parameters.
     */
    checkDnsNameAvailability(location: string, domainNameLabel: string, options?: CheckDnsNameAvailabilityOptionalParams): Promise<CheckDnsNameAvailabilityResponse>;
    /**
     * Retrieves detail of a provider port.
     * @param providerport The name of the provider port.
     * @param options The options parameters.
     */
    expressRouteProviderPort(providerport: string, options?: ExpressRouteProviderPortOptionalParams): Promise<ExpressRouteProviderPortResponse>;
    /**
     * Lists active connectivity configurations in a network manager.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param parameters Active Configuration Parameter.
     * @param options The options parameters.
     */
    listActiveConnectivityConfigurations(resourceGroupName: string, networkManagerName: string, parameters: ActiveConfigurationParameter, options?: ListActiveConnectivityConfigurationsOptionalParams): Promise<ListActiveConnectivityConfigurationsResponse>;
    /**
     * Lists active security admin rules in a network manager.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param parameters Active Configuration Parameter.
     * @param options The options parameters.
     */
    listActiveSecurityAdminRules(resourceGroupName: string, networkManagerName: string, parameters: ActiveConfigurationParameter, options?: ListActiveSecurityAdminRulesOptionalParams): Promise<ListActiveSecurityAdminRulesResponse>;
    /**
     * List all effective connectivity configurations applied on a virtual network.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param parameters Parameters supplied to list correct page.
     * @param options The options parameters.
     */
    listNetworkManagerEffectiveConnectivityConfigurations(resourceGroupName: string, virtualNetworkName: string, parameters: QueryRequestOptions, options?: ListNetworkManagerEffectiveConnectivityConfigurationsOptionalParams): Promise<ListNetworkManagerEffectiveConnectivityConfigurationsResponse>;
    /**
     * List all effective security admin rules applied on a virtual network.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param parameters Parameters supplied to list correct page.
     * @param options The options parameters.
     */
    listNetworkManagerEffectiveSecurityAdminRules(resourceGroupName: string, virtualNetworkName: string, parameters: QueryRequestOptions, options?: ListNetworkManagerEffectiveSecurityAdminRulesOptionalParams): Promise<ListNetworkManagerEffectiveSecurityAdminRulesResponse>;
    /**
     * Gives the supported security providers for the virtual wan.
     * @param resourceGroupName The resource group name.
     * @param virtualWANName The name of the VirtualWAN for which supported security providers are needed.
     * @param options The options parameters.
     */
    supportedSecurityProviders(resourceGroupName: string, virtualWANName: string, options?: SupportedSecurityProvidersOptionalParams): Promise<SupportedSecurityProvidersResponse>;
    /**
     * Generates a unique VPN profile for P2S clients for VirtualWan and associated VpnServerConfiguration
     * combination in the specified resource group.
     * @param resourceGroupName The resource group name.
     * @param virtualWANName The name of the VirtualWAN whose associated VpnServerConfigurations is needed.
     * @param vpnClientParams Parameters supplied to the generate VirtualWan VPN profile generation
     *                        operation.
     * @param options The options parameters.
     */
    beginGeneratevirtualwanvpnserverconfigurationvpnprofile(resourceGroupName: string, virtualWANName: string, vpnClientParams: VirtualWanVpnProfileParameters, options?: GeneratevirtualwanvpnserverconfigurationvpnprofileOptionalParams): Promise<SimplePollerLike<OperationState<GeneratevirtualwanvpnserverconfigurationvpnprofileResponse>, GeneratevirtualwanvpnserverconfigurationvpnprofileResponse>>;
    /**
     * Generates a unique VPN profile for P2S clients for VirtualWan and associated VpnServerConfiguration
     * combination in the specified resource group.
     * @param resourceGroupName The resource group name.
     * @param virtualWANName The name of the VirtualWAN whose associated VpnServerConfigurations is needed.
     * @param vpnClientParams Parameters supplied to the generate VirtualWan VPN profile generation
     *                        operation.
     * @param options The options parameters.
     */
    beginGeneratevirtualwanvpnserverconfigurationvpnprofileAndWait(resourceGroupName: string, virtualWANName: string, vpnClientParams: VirtualWanVpnProfileParameters, options?: GeneratevirtualwanvpnserverconfigurationvpnprofileOptionalParams): Promise<GeneratevirtualwanvpnserverconfigurationvpnprofileResponse>;
    /**
     * PutBastionShareableLinkNext
     * @param resourceGroupName The name of the resource group.
     * @param bastionHostName The name of the Bastion Host.
     * @param bslRequest Post request for Create/Delete/Get Bastion Shareable Link endpoints.
     * @param nextLink The nextLink from the previous successful call to the PutBastionShareableLink
     *                 method.
     * @param options The options parameters.
     */
    private _putBastionShareableLinkNext;
    /**
     * GetBastionShareableLinkNext
     * @param resourceGroupName The name of the resource group.
     * @param bastionHostName The name of the Bastion Host.
     * @param bslRequest Post request for Create/Delete/Get Bastion Shareable Link endpoints.
     * @param nextLink The nextLink from the previous successful call to the GetBastionShareableLink
     *                 method.
     * @param options The options parameters.
     */
    private _getBastionShareableLinkNext;
    /**
     * GetActiveSessionsNext
     * @param resourceGroupName The name of the resource group.
     * @param bastionHostName The name of the Bastion Host.
     * @param nextLink The nextLink from the previous successful call to the GetActiveSessions method.
     * @param options The options parameters.
     */
    private _getActiveSessionsNext;
    /**
     * DisconnectActiveSessionsNext
     * @param resourceGroupName The name of the resource group.
     * @param bastionHostName The name of the Bastion Host.
     * @param sessionIds The list of sessionids to disconnect.
     * @param nextLink The nextLink from the previous successful call to the DisconnectActiveSessions
     *                 method.
     * @param options The options parameters.
     */
    private _disconnectActiveSessionsNext;
    applicationGateways: ApplicationGateways;
    applicationGatewayPrivateLinkResources: ApplicationGatewayPrivateLinkResources;
    applicationGatewayPrivateEndpointConnections: ApplicationGatewayPrivateEndpointConnections;
    applicationGatewayWafDynamicManifestsDefault: ApplicationGatewayWafDynamicManifestsDefault;
    applicationGatewayWafDynamicManifests: ApplicationGatewayWafDynamicManifests;
    applicationSecurityGroups: ApplicationSecurityGroups;
    availableDelegations: AvailableDelegations;
    availableResourceGroupDelegations: AvailableResourceGroupDelegations;
    availableServiceAliases: AvailableServiceAliases;
    azureFirewalls: AzureFirewalls;
    azureFirewallFqdnTags: AzureFirewallFqdnTags;
    webCategories: WebCategories;
    bastionHosts: BastionHosts;
    networkInterfaces: NetworkInterfaces;
    publicIPAddresses: PublicIPAddresses;
    vipSwap: VipSwap;
    customIPPrefixes: CustomIPPrefixes;
    ddosCustomPolicies: DdosCustomPolicies;
    ddosProtectionPlans: DdosProtectionPlans;
    dscpConfigurationOperations: DscpConfigurationOperations;
    availableEndpointServices: AvailableEndpointServices;
    expressRouteCircuitAuthorizations: ExpressRouteCircuitAuthorizations;
    expressRouteCircuitPeerings: ExpressRouteCircuitPeerings;
    expressRouteCircuitConnections: ExpressRouteCircuitConnections;
    peerExpressRouteCircuitConnections: PeerExpressRouteCircuitConnections;
    expressRouteCircuits: ExpressRouteCircuits;
    expressRouteServiceProviders: ExpressRouteServiceProviders;
    expressRouteCrossConnections: ExpressRouteCrossConnections;
    expressRouteCrossConnectionPeerings: ExpressRouteCrossConnectionPeerings;
    expressRoutePortsLocations: ExpressRoutePortsLocations;
    expressRoutePorts: ExpressRoutePorts;
    expressRouteLinks: ExpressRouteLinks;
    expressRoutePortAuthorizations: ExpressRoutePortAuthorizations;
    expressRouteProviderPortsLocation: ExpressRouteProviderPortsLocation;
    firewallPolicies: FirewallPolicies;
    firewallPolicyRuleCollectionGroups: FirewallPolicyRuleCollectionGroups;
    firewallPolicyIdpsSignatures: FirewallPolicyIdpsSignatures;
    firewallPolicyIdpsSignaturesOverrides: FirewallPolicyIdpsSignaturesOverrides;
    firewallPolicyIdpsSignaturesFilterValues: FirewallPolicyIdpsSignaturesFilterValues;
    firewallPolicyDrafts: FirewallPolicyDrafts;
    firewallPolicyDeployments: FirewallPolicyDeployments;
    firewallPolicyRuleCollectionGroupDrafts: FirewallPolicyRuleCollectionGroupDrafts;
    ipamPools: IpamPools;
    staticCidrs: StaticCidrs;
    ipAllocations: IpAllocations;
    ipGroups: IpGroups;
    loadBalancers: LoadBalancers;
    loadBalancerBackendAddressPools: LoadBalancerBackendAddressPools;
    loadBalancerFrontendIPConfigurations: LoadBalancerFrontendIPConfigurations;
    inboundNatRules: InboundNatRules;
    loadBalancerLoadBalancingRules: LoadBalancerLoadBalancingRules;
    loadBalancerOutboundRules: LoadBalancerOutboundRules;
    loadBalancerNetworkInterfaces: LoadBalancerNetworkInterfaces;
    loadBalancerProbes: LoadBalancerProbes;
    natGateways: NatGateways;
    networkInterfaceIPConfigurations: NetworkInterfaceIPConfigurations;
    networkInterfaceLoadBalancers: NetworkInterfaceLoadBalancers;
    networkInterfaceTapConfigurations: NetworkInterfaceTapConfigurations;
    networkManagers: NetworkManagers;
    networkManagerCommits: NetworkManagerCommits;
    networkManagerDeploymentStatusOperations: NetworkManagerDeploymentStatusOperations;
    subscriptionNetworkManagerConnections: SubscriptionNetworkManagerConnections;
    managementGroupNetworkManagerConnections: ManagementGroupNetworkManagerConnections;
    connectivityConfigurations: ConnectivityConfigurations;
    networkGroups: NetworkGroups;
    staticMembers: StaticMembers;
    networkManagerRoutingConfigurations: NetworkManagerRoutingConfigurations;
    routingRuleCollections: RoutingRuleCollections;
    routingRules: RoutingRules;
    scopeConnections: ScopeConnections;
    securityAdminConfigurations: SecurityAdminConfigurations;
    adminRuleCollections: AdminRuleCollections;
    adminRules: AdminRules;
    securityUserConfigurations: SecurityUserConfigurations;
    securityUserRuleCollections: SecurityUserRuleCollections;
    securityUserRules: SecurityUserRules;
    networkProfiles: NetworkProfiles;
    networkSecurityGroups: NetworkSecurityGroups;
    securityRules: SecurityRules;
    defaultSecurityRules: DefaultSecurityRules;
    reachabilityAnalysisIntents: ReachabilityAnalysisIntents;
    reachabilityAnalysisRuns: ReachabilityAnalysisRuns;
    verifierWorkspaces: VerifierWorkspaces;
    networkVirtualAppliances: NetworkVirtualAppliances;
    virtualApplianceSites: VirtualApplianceSites;
    virtualApplianceSkus: VirtualApplianceSkus;
    inboundSecurityRuleOperations: InboundSecurityRuleOperations;
    networkWatchers: NetworkWatchers;
    packetCaptures: PacketCaptures;
    connectionMonitors: ConnectionMonitors;
    flowLogs: FlowLogs;
    operations: Operations;
    privateEndpoints: PrivateEndpoints;
    availablePrivateEndpointTypes: AvailablePrivateEndpointTypes;
    privateDnsZoneGroups: PrivateDnsZoneGroups;
    privateLinkServices: PrivateLinkServices;
    publicIPPrefixes: PublicIPPrefixes;
    routeFilters: RouteFilters;
    routeFilterRules: RouteFilterRules;
    routeTables: RouteTables;
    routes: Routes;
    securityPartnerProviders: SecurityPartnerProviders;
    bgpServiceCommunities: BgpServiceCommunities;
    serviceEndpointPolicies: ServiceEndpointPolicies;
    serviceEndpointPolicyDefinitions: ServiceEndpointPolicyDefinitions;
    serviceTags: ServiceTags;
    serviceTagInformationOperations: ServiceTagInformationOperations;
    usages: Usages;
    virtualNetworks: VirtualNetworks;
    subnets: Subnets;
    resourceNavigationLinks: ResourceNavigationLinks;
    serviceAssociationLinks: ServiceAssociationLinks;
    virtualNetworkPeerings: VirtualNetworkPeerings;
    virtualNetworkGateways: VirtualNetworkGateways;
    virtualNetworkGatewayConnections: VirtualNetworkGatewayConnections;
    localNetworkGateways: LocalNetworkGateways;
    virtualNetworkGatewayNatRules: VirtualNetworkGatewayNatRules;
    virtualNetworkTaps: VirtualNetworkTaps;
    virtualRouters: VirtualRouters;
    virtualRouterPeerings: VirtualRouterPeerings;
    virtualWans: VirtualWans;
    vpnSites: VpnSites;
    vpnSiteLinks: VpnSiteLinks;
    vpnSitesConfiguration: VpnSitesConfiguration;
    vpnServerConfigurations: VpnServerConfigurations;
    configurationPolicyGroups: ConfigurationPolicyGroups;
    virtualHubs: VirtualHubs;
    routeMaps: RouteMaps;
    hubVirtualNetworkConnections: HubVirtualNetworkConnections;
    vpnGateways: VpnGateways;
    vpnLinkConnections: VpnLinkConnections;
    vpnConnections: VpnConnections;
    vpnSiteLinkConnections: VpnSiteLinkConnections;
    natRules: NatRules;
    p2SVpnGateways: P2SVpnGateways;
    vpnServerConfigurationsAssociatedWithVirtualWan: VpnServerConfigurationsAssociatedWithVirtualWan;
    virtualHubRouteTableV2S: VirtualHubRouteTableV2S;
    expressRouteGateways: ExpressRouteGateways;
    expressRouteConnections: ExpressRouteConnections;
    networkVirtualApplianceConnections: NetworkVirtualApplianceConnections;
    virtualHubBgpConnection: VirtualHubBgpConnection;
    virtualHubBgpConnections: VirtualHubBgpConnections;
    virtualHubIpConfiguration: VirtualHubIpConfiguration;
    hubRouteTables: HubRouteTables;
    routingIntentOperations: RoutingIntentOperations;
    webApplicationFirewallPolicies: WebApplicationFirewallPolicies;
}
//# sourceMappingURL=networkManagementClient.d.ts.map