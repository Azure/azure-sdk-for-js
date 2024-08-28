// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Application gateway resource. */
export interface ApplicationGateway extends Resource {
  /** Properties of the application gateway. */
  properties?: ApplicationGatewayPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** A list of availability zones denoting where the resource needs to come from. */
  zones?: Array<string>;
  /** The identity of the application gateway, if configured. */
  identity?: ManagedServiceIdentity;
}

/** Properties of the application gateway. */
export interface ApplicationGatewayPropertiesFormat {
  /** SKU of the application gateway resource. */
  sku?: ApplicationGatewaySku;
  /** SSL policy of the application gateway resource. */
  sslPolicy?: ApplicationGatewaySslPolicy;
  /** Operational state of the application gateway resource. */
  operationalState?: "Stopped" | "Starting" | "Running" | "Stopping";
  /** Subnets of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  gatewayIPConfigurations?: Array<ApplicationGatewayIPConfiguration>;
  /** Authentication certificates of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  authenticationCertificates?: Array<ApplicationGatewayAuthenticationCertificate>;
  /** Trusted Root certificates of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  trustedRootCertificates?: Array<ApplicationGatewayTrustedRootCertificate>;
  /** Trusted client certificates of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  trustedClientCertificates?: Array<ApplicationGatewayTrustedClientCertificate>;
  /** SSL certificates of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  sslCertificates?: Array<ApplicationGatewaySslCertificate>;
  /** Frontend IP addresses of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  frontendIPConfigurations?: Array<ApplicationGatewayFrontendIPConfiguration>;
  /** Frontend ports of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  frontendPorts?: Array<ApplicationGatewayFrontendPort>;
  /** Probes of the application gateway resource. */
  probes?: Array<ApplicationGatewayProbe>;
  /** Backend address pool of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  backendAddressPools?: Array<ApplicationGatewayBackendAddressPool>;
  /** Backend http settings of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  backendHttpSettingsCollection?: Array<ApplicationGatewayBackendHttpSettings>;
  /** Backend settings of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  backendSettingsCollection?: Array<ApplicationGatewayBackendSettings>;
  /** Http listeners of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  httpListeners?: Array<ApplicationGatewayHttpListener>;
  /** Listeners of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  listeners?: Array<ApplicationGatewayListener>;
  /** SSL profiles of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  sslProfiles?: Array<ApplicationGatewaySslProfile>;
  /** URL path map of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  urlPathMaps?: Array<ApplicationGatewayUrlPathMap>;
  /** Request routing rules of the application gateway resource. */
  requestRoutingRules?: Array<ApplicationGatewayRequestRoutingRule>;
  /** Routing rules of the application gateway resource. */
  routingRules?: Array<ApplicationGatewayRoutingRule>;
  /** Rewrite rules for the application gateway resource. */
  rewriteRuleSets?: Array<ApplicationGatewayRewriteRuleSet>;
  /** Redirect configurations of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  redirectConfigurations?: Array<ApplicationGatewayRedirectConfiguration>;
  /** Web application firewall configuration. */
  webApplicationFirewallConfiguration?: ApplicationGatewayWebApplicationFirewallConfiguration;
  /** Reference to the FirewallPolicy resource. */
  firewallPolicy?: SubResource;
  /** Whether HTTP2 is enabled on the application gateway resource. */
  enableHttp2?: boolean;
  /** Whether FIPS is enabled on the application gateway resource. */
  enableFips?: boolean;
  /** Autoscale Configuration. */
  autoscaleConfiguration?: ApplicationGatewayAutoscaleConfiguration;
  /** PrivateLink configurations on application gateway. */
  privateLinkConfigurations?: Array<ApplicationGatewayPrivateLinkConfiguration>;
  /** Private Endpoint connections on application gateway. */
  privateEndpointConnections?: Array<ApplicationGatewayPrivateEndpointConnection>;
  /** The resource GUID property of the application gateway resource. */
  resourceGuid?: string;
  /** The provisioning state of the application gateway resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Custom error configurations of the application gateway resource. */
  customErrorConfigurations?: Array<ApplicationGatewayCustomError>;
  /** If true, associates a firewall policy with an application gateway regardless whether the policy differs from the WAF Config. */
  forceFirewallPolicyAssociation?: boolean;
  /** Load distribution policies of the application gateway resource. */
  loadDistributionPolicies?: Array<ApplicationGatewayLoadDistributionPolicy>;
  /** Global Configuration. */
  globalConfiguration?: ApplicationGatewayGlobalConfiguration;
}

/** SKU of an application gateway. */
export interface ApplicationGatewaySku {
  /** Name of an application gateway SKU. */
  name?:
    | "Standard_Small"
    | "Standard_Medium"
    | "Standard_Large"
    | "WAF_Medium"
    | "WAF_Large"
    | "Standard_v2"
    | "WAF_v2";
  /** Tier of an application gateway. */
  tier?: "Standard" | "WAF" | "Standard_v2" | "WAF_v2";
  /** Capacity (instance count) of an application gateway. */
  capacity?: number;
}

/** Application Gateway Ssl policy. */
export interface ApplicationGatewaySslPolicy {
  /** Ssl protocols to be disabled on application gateway. */
  disabledSslProtocols?: Array<"TLSv1_0" | "TLSv1_1" | "TLSv1_2" | "TLSv1_3">;
  /** Type of Ssl Policy. */
  policyType?: "Predefined" | "Custom" | "CustomV2";
  /** Name of Ssl predefined policy. */
  policyName?:
    | "AppGwSslPolicy20150501"
    | "AppGwSslPolicy20170401"
    | "AppGwSslPolicy20170401S"
    | "AppGwSslPolicy20220101"
    | "AppGwSslPolicy20220101S";
  /** Ssl cipher suites to be enabled in the specified order to application gateway. */
  cipherSuites?: Array<
    | "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384"
    | "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256"
    | "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA"
    | "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA"
    | "TLS_DHE_RSA_WITH_AES_256_GCM_SHA384"
    | "TLS_DHE_RSA_WITH_AES_128_GCM_SHA256"
    | "TLS_DHE_RSA_WITH_AES_256_CBC_SHA"
    | "TLS_DHE_RSA_WITH_AES_128_CBC_SHA"
    | "TLS_RSA_WITH_AES_256_GCM_SHA384"
    | "TLS_RSA_WITH_AES_128_GCM_SHA256"
    | "TLS_RSA_WITH_AES_256_CBC_SHA256"
    | "TLS_RSA_WITH_AES_128_CBC_SHA256"
    | "TLS_RSA_WITH_AES_256_CBC_SHA"
    | "TLS_RSA_WITH_AES_128_CBC_SHA"
    | "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384"
    | "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256"
    | "TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384"
    | "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256"
    | "TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA"
    | "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA"
    | "TLS_DHE_DSS_WITH_AES_256_CBC_SHA256"
    | "TLS_DHE_DSS_WITH_AES_128_CBC_SHA256"
    | "TLS_DHE_DSS_WITH_AES_256_CBC_SHA"
    | "TLS_DHE_DSS_WITH_AES_128_CBC_SHA"
    | "TLS_RSA_WITH_3DES_EDE_CBC_SHA"
    | "TLS_DHE_DSS_WITH_3DES_EDE_CBC_SHA"
    | "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
    | "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
  >;
  /** Minimum version of Ssl protocol to be supported on application gateway. */
  minProtocolVersion?: "TLSv1_0" | "TLSv1_1" | "TLSv1_2" | "TLSv1_3";
}

/** IP configuration of an application gateway. Currently 1 public and 1 private IP configuration is allowed. */
export interface ApplicationGatewayIPConfiguration extends SubResource {
  /** Properties of the application gateway IP configuration. */
  properties?: ApplicationGatewayIPConfigurationPropertiesFormat;
  /** Name of the IP configuration that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of IP configuration of an application gateway. */
export interface ApplicationGatewayIPConfigurationPropertiesFormat {
  /** Reference to the subnet resource. A subnet from where application gateway gets its private address. */
  subnet?: SubResource;
  /** The provisioning state of the application gateway IP configuration resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Reference to another subresource. */
export interface SubResource {
  /** Resource ID. */
  id?: string;
}

/** Authentication certificates of an application gateway. */
export interface ApplicationGatewayAuthenticationCertificate extends SubResource {
  /** Properties of the application gateway authentication certificate. */
  properties?: ApplicationGatewayAuthenticationCertificatePropertiesFormat;
  /** Name of the authentication certificate that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Authentication certificates properties of an application gateway. */
export interface ApplicationGatewayAuthenticationCertificatePropertiesFormat {
  /** Certificate public data. */
  data?: string;
  /** The provisioning state of the authentication certificate resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Trusted Root certificates of an application gateway. */
export interface ApplicationGatewayTrustedRootCertificate extends SubResource {
  /** Properties of the application gateway trusted root certificate. */
  properties?: ApplicationGatewayTrustedRootCertificatePropertiesFormat;
  /** Name of the trusted root certificate that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Trusted Root certificates properties of an application gateway. */
export interface ApplicationGatewayTrustedRootCertificatePropertiesFormat {
  /** Certificate public data. */
  data?: string;
  /** Secret Id of (base-64 encoded unencrypted pfx) 'Secret' or 'Certificate' object stored in KeyVault. */
  keyVaultSecretId?: string;
  /** The provisioning state of the trusted root certificate resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Trusted client certificates of an application gateway. */
export interface ApplicationGatewayTrustedClientCertificate extends SubResource {
  /** Properties of the application gateway trusted client certificate. */
  properties?: ApplicationGatewayTrustedClientCertificatePropertiesFormat;
  /** Name of the trusted client certificate that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Trusted client certificates properties of an application gateway. */
export interface ApplicationGatewayTrustedClientCertificatePropertiesFormat {
  /** Certificate public data. */
  data?: string;
  /** Validated certificate data. */
  validatedCertData?: string;
  /** Distinguished name of client certificate issuer. */
  clientCertIssuerDN?: string;
  /** The provisioning state of the trusted client certificate resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** SSL certificates of an application gateway. */
export interface ApplicationGatewaySslCertificate extends SubResource {
  /** Properties of the application gateway SSL certificate. */
  properties?: ApplicationGatewaySslCertificatePropertiesFormat;
  /** Name of the SSL certificate that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of SSL certificates of an application gateway. */
export interface ApplicationGatewaySslCertificatePropertiesFormat {
  /** Base-64 encoded pfx certificate. Only applicable in PUT Request. */
  data?: string;
  /** Password for the pfx file specified in data. Only applicable in PUT request. */
  password?: string;
  /** Base-64 encoded Public cert data corresponding to pfx specified in data. Only applicable in GET request. */
  publicCertData?: string;
  /** Secret Id of (base-64 encoded unencrypted pfx) 'Secret' or 'Certificate' object stored in KeyVault. */
  keyVaultSecretId?: string;
  /** The provisioning state of the SSL certificate resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Frontend IP configuration of an application gateway. */
export interface ApplicationGatewayFrontendIPConfiguration extends SubResource {
  /** Properties of the application gateway frontend IP configuration. */
  properties?: ApplicationGatewayFrontendIPConfigurationPropertiesFormat;
  /** Name of the frontend IP configuration that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of Frontend IP configuration of an application gateway. */
export interface ApplicationGatewayFrontendIPConfigurationPropertiesFormat {
  /** PrivateIPAddress of the network interface IP Configuration. */
  privateIPAddress?: string;
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: "Static" | "Dynamic";
  /** Reference to the subnet resource. */
  subnet?: SubResource;
  /** Reference to the PublicIP resource. */
  publicIPAddress?: SubResource;
  /** Reference to the application gateway private link configuration. */
  privateLinkConfiguration?: SubResource;
  /** The provisioning state of the frontend IP configuration resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Frontend port of an application gateway. */
export interface ApplicationGatewayFrontendPort extends SubResource {
  /** Properties of the application gateway frontend port. */
  properties?: ApplicationGatewayFrontendPortPropertiesFormat;
  /** Name of the frontend port that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of Frontend port of an application gateway. */
export interface ApplicationGatewayFrontendPortPropertiesFormat {
  /** Frontend port. */
  port?: number;
  /** The provisioning state of the frontend port resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Probe of the application gateway. */
export interface ApplicationGatewayProbe extends SubResource {
  /** Properties of the application gateway probe. */
  properties?: ApplicationGatewayProbePropertiesFormat;
  /** Name of the probe that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of probe of an application gateway. */
export interface ApplicationGatewayProbePropertiesFormat {
  /** The protocol used for the probe. */
  protocol?: "Http" | "Https" | "Tcp" | "Tls";
  /** Host name to send the probe to. */
  host?: string;
  /** Relative path of probe. Valid path starts from '/'. Probe is sent to <Protocol>://<host>:<port><path>. */
  path?: string;
  /** The probing interval in seconds. This is the time interval between two consecutive probes. Acceptable values are from 1 second to 86400 seconds. */
  interval?: number;
  /** The probe timeout in seconds. Probe marked as failed if valid response is not received with this timeout period. Acceptable values are from 1 second to 86400 seconds. */
  timeout?: number;
  /** The probe retry count. Backend server is marked down after consecutive probe failure count reaches UnhealthyThreshold. Acceptable values are from 1 second to 20. */
  unhealthyThreshold?: number;
  /** Whether the host header should be picked from the backend http settings. Default value is false. */
  pickHostNameFromBackendHttpSettings?: boolean;
  /** Whether the server name indication should be picked from the backend settings for Tls protocol. Default value is false. */
  pickHostNameFromBackendSettings?: boolean;
  /** Minimum number of servers that are always marked healthy. Default value is 0. */
  minServers?: number;
  /** Criterion for classifying a healthy probe response. */
  match?: ApplicationGatewayProbeHealthResponseMatch;
  /** The provisioning state of the probe resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Custom port which will be used for probing the backend servers. The valid value ranges from 1 to 65535. In case not set, port from http settings will be used. This property is valid for Standard_v2 and WAF_v2 only. */
  port?: number;
}

/** Application gateway probe health response match. */
export interface ApplicationGatewayProbeHealthResponseMatch {
  /** Body that must be contained in the health response. Default value is empty. */
  body?: string;
  /** Allowed ranges of healthy status codes. Default range of healthy status codes is 200-399. */
  statusCodes?: Array<string>;
}

/** Backend Address Pool of an application gateway. */
export interface ApplicationGatewayBackendAddressPool extends SubResource {
  /** Properties of the application gateway backend address pool. */
  properties?: ApplicationGatewayBackendAddressPoolPropertiesFormat;
  /** Name of the backend address pool that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of Backend Address Pool of an application gateway. */
export interface ApplicationGatewayBackendAddressPoolPropertiesFormat {
  /** Collection of references to IPs defined in network interfaces. */
  backendIPConfigurations?: Array<NetworkInterfaceIPConfiguration>;
  /** Backend addresses. */
  backendAddresses?: Array<ApplicationGatewayBackendAddress>;
  /** The provisioning state of the backend address pool resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** IPConfiguration in a network interface. */
export interface NetworkInterfaceIPConfiguration extends SubResource {
  /** Network interface IP configuration properties. */
  properties?: NetworkInterfaceIPConfigurationPropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Resource type. */
  type?: string;
}

/** Properties of IP configuration. */
export interface NetworkInterfaceIPConfigurationPropertiesFormat {
  /** The reference to gateway load balancer frontend IP. */
  gatewayLoadBalancer?: SubResource;
  /** The reference to Virtual Network Taps. */
  virtualNetworkTaps?: Array<VirtualNetworkTap>;
  /** The reference to ApplicationGatewayBackendAddressPool resource. */
  applicationGatewayBackendAddressPools?: Array<ApplicationGatewayBackendAddressPool>;
  /** The reference to LoadBalancerBackendAddressPool resource. */
  loadBalancerBackendAddressPools?: Array<BackendAddressPool>;
  /** A list of references of LoadBalancerInboundNatRules. */
  loadBalancerInboundNatRules?: Array<InboundNatRule>;
  /** Private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: "Static" | "Dynamic";
  /** Whether the specific IP configuration is IPv4 or IPv6. Default is IPv4. */
  privateIPAddressVersion?: "IPv4" | "IPv6";
  /** Subnet bound to the IP configuration. */
  subnet?: Subnet;
  /** Whether this is a primary customer address on the network interface. */
  primary?: boolean;
  /** Public IP address bound to the IP configuration. */
  publicIPAddress?: PublicIPAddress;
  /** Application security groups in which the IP configuration is included. */
  applicationSecurityGroups?: Array<ApplicationSecurityGroup>;
  /** The provisioning state of the network interface IP configuration. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** PrivateLinkConnection properties for the network interface. */
  privateLinkConnectionProperties?: NetworkInterfaceIPConfigurationPrivateLinkConnectionProperties;
}

/** Virtual Network Tap resource. */
export interface VirtualNetworkTap extends Resource {
  /** Virtual Network Tap Properties. */
  properties?: VirtualNetworkTapPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Virtual Network Tap properties. */
export interface VirtualNetworkTapPropertiesFormat {
  /** Specifies the list of resource IDs for the network interface IP configuration that needs to be tapped. */
  networkInterfaceTapConfigurations?: Array<NetworkInterfaceTapConfiguration>;
  /** The resource GUID property of the virtual network tap resource. */
  resourceGuid?: string;
  /** The provisioning state of the virtual network tap resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The reference to the private IP Address of the collector nic that will receive the tap. */
  destinationNetworkInterfaceIPConfiguration?: NetworkInterfaceIPConfiguration;
  /** The reference to the private IP address on the internal Load Balancer that will receive the tap. */
  destinationLoadBalancerFrontEndIPConfiguration?: FrontendIPConfiguration;
  /** The VXLAN destination port that will receive the tapped traffic. */
  destinationPort?: number;
}

/** Tap configuration in a Network Interface. */
export interface NetworkInterfaceTapConfiguration extends SubResource {
  /** Properties of the Virtual Network Tap configuration. */
  properties?: NetworkInterfaceTapConfigurationPropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Sub Resource type. */
  type?: string;
}

/** Properties of Virtual Network Tap configuration. */
export interface NetworkInterfaceTapConfigurationPropertiesFormat {
  /** The reference to the Virtual Network Tap resource. */
  virtualNetworkTap?: VirtualNetworkTap;
  /** The provisioning state of the network interface tap configuration resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Frontend IP address of the load balancer. */
export interface FrontendIPConfiguration extends SubResource {
  /** Properties of the load balancer probe. */
  properties?: FrontendIPConfigurationPropertiesFormat;
  /** The name of the resource that is unique within the set of frontend IP configurations used by the load balancer. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
  /** A list of availability zones denoting the IP allocated for the resource needs to come from. */
  zones?: Array<string>;
}

/** Properties of Frontend IP Configuration of the load balancer. */
export interface FrontendIPConfigurationPropertiesFormat {
  /** An array of references to inbound rules that use this frontend IP. */
  inboundNatRules?: Array<SubResource>;
  /** An array of references to inbound pools that use this frontend IP. */
  inboundNatPools?: Array<SubResource>;
  /** An array of references to outbound rules that use this frontend IP. */
  outboundRules?: Array<SubResource>;
  /** An array of references to load balancing rules that use this frontend IP. */
  loadBalancingRules?: Array<SubResource>;
  /** The private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** The Private IP allocation method. */
  privateIPAllocationMethod?: "Static" | "Dynamic";
  /** Whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. */
  privateIPAddressVersion?: "IPv4" | "IPv6";
  /** The reference to the subnet resource. */
  subnet?: Subnet;
  /** The reference to the Public IP resource. */
  publicIPAddress?: PublicIPAddress;
  /** The reference to the Public IP Prefix resource. */
  publicIPPrefix?: SubResource;
  /** The reference to gateway load balancer frontend IP. */
  gatewayLoadBalancer?: SubResource;
  /** The provisioning state of the frontend IP configuration resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Subnet in a virtual network resource. */
export interface Subnet extends SubResource {
  /** Properties of the subnet. */
  properties?: SubnetPropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Resource type. */
  type?: string;
}

/** Properties of the subnet. */
export interface SubnetPropertiesFormat {
  /** The address prefix for the subnet. */
  addressPrefix?: string;
  /** List of address prefixes for the subnet. */
  addressPrefixes?: Array<string>;
  /** The reference to the NetworkSecurityGroup resource. */
  networkSecurityGroup?: NetworkSecurityGroup;
  /** The reference to the RouteTable resource. */
  routeTable?: RouteTable;
  /** Nat gateway associated with this subnet. */
  natGateway?: SubResource;
  /** An array of service endpoints. */
  serviceEndpoints?: Array<ServiceEndpointPropertiesFormat>;
  /** An array of service endpoint policies. */
  serviceEndpointPolicies?: Array<ServiceEndpointPolicy>;
  /** An array of references to private endpoints. */
  privateEndpoints?: Array<PrivateEndpoint>;
  /** An array of references to the network interface IP configurations using subnet. */
  ipConfigurations?: Array<IPConfiguration>;
  /** Array of IP configuration profiles which reference this subnet. */
  ipConfigurationProfiles?: Array<IPConfigurationProfile>;
  /** Array of IpAllocation which reference this subnet. */
  ipAllocations?: Array<SubResource>;
  /** An array of references to the external resources using subnet. */
  resourceNavigationLinks?: Array<ResourceNavigationLink>;
  /** An array of references to services injecting into this subnet. */
  serviceAssociationLinks?: Array<ServiceAssociationLink>;
  /** An array of references to the delegations on the subnet. */
  delegations?: Array<Delegation>;
  /** A read-only string identifying the intention of use for this subnet based on delegations and other user-defined properties. */
  purpose?: string;
  /** The provisioning state of the subnet resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Enable or Disable apply network policies on private end point in the subnet. */
  privateEndpointNetworkPolicies?: "Enabled" | "Disabled";
  /** Enable or Disable apply network policies on private link service in the subnet. */
  privateLinkServiceNetworkPolicies?: "Enabled" | "Disabled";
  /** Application gateway IP configurations of virtual network resource. */
  applicationGatewayIpConfigurations?: Array<ApplicationGatewayIPConfiguration>;
}

/** NetworkSecurityGroup resource. */
export interface NetworkSecurityGroup extends Resource {
  /** Properties of the network security group. */
  properties?: NetworkSecurityGroupPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Network Security Group resource. */
export interface NetworkSecurityGroupPropertiesFormat {
  /** When enabled, flows created from Network Security Group connections will be re-evaluated when rules are updates. Initial enablement will trigger re-evaluation. */
  flushConnection?: boolean;
  /** A collection of security rules of the network security group. */
  securityRules?: Array<SecurityRule>;
  /** The default security rules of network security group. */
  defaultSecurityRules?: Array<SecurityRule>;
  /** A collection of references to network interfaces. */
  networkInterfaces?: Array<NetworkInterface>;
  /** A collection of references to subnets. */
  subnets?: Array<Subnet>;
  /** A collection of references to flow log resources. */
  flowLogs?: Array<FlowLog>;
  /** The resource GUID property of the network security group resource. */
  resourceGuid?: string;
  /** The provisioning state of the network security group resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Network security rule. */
export interface SecurityRule extends SubResource {
  /** Properties of the security rule. */
  properties?: SecurityRulePropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** The type of the resource. */
  type?: string;
}

/** Security rule resource. */
export interface SecurityRulePropertiesFormat {
  /** A description for this rule. Restricted to 140 chars. */
  description?: string;
  /** Network protocol this rule applies to. */
  protocol: "Tcp" | "Udp" | "Icmp" | "Esp" | "*" | "Ah";
  /** The source port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports. */
  sourcePortRange?: string;
  /** The destination port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports. */
  destinationPortRange?: string;
  /** The CIDR or source IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used. If this is an ingress rule, specifies where network traffic originates from. */
  sourceAddressPrefix?: string;
  /** The CIDR or source IP ranges. */
  sourceAddressPrefixes?: Array<string>;
  /** The application security group specified as source. */
  sourceApplicationSecurityGroups?: Array<ApplicationSecurityGroup>;
  /** The destination address prefix. CIDR or destination IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used. */
  destinationAddressPrefix?: string;
  /** The destination address prefixes. CIDR or destination IP ranges. */
  destinationAddressPrefixes?: Array<string>;
  /** The application security group specified as destination. */
  destinationApplicationSecurityGroups?: Array<ApplicationSecurityGroup>;
  /** The source port ranges. */
  sourcePortRanges?: Array<string>;
  /** The destination port ranges. */
  destinationPortRanges?: Array<string>;
  /** The network traffic is allowed or denied. */
  access: "Allow" | "Deny";
  /** The priority of the rule. The value can be between 100 and 4096. The priority number must be unique for each rule in the collection. The lower the priority number, the higher the priority of the rule. */
  priority?: number;
  /** The direction of the rule. The direction specifies if rule will be evaluated on incoming or outgoing traffic. */
  direction: "Inbound" | "Outbound";
  /** The provisioning state of the security rule resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** An application security group in a resource group. */
export interface ApplicationSecurityGroup extends Resource {
  /** Properties of the application security group. */
  properties?: ApplicationSecurityGroupPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Application security group properties. */
export interface ApplicationSecurityGroupPropertiesFormat {
  /** The resource GUID property of the application security group resource. It uniquely identifies a resource, even if the user changes its name or migrate the resource across subscriptions or resource groups. */
  resourceGuid?: string;
  /** The provisioning state of the application security group resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Common resource representation. */
export interface Resource {
  /** Resource ID. */
  id?: string;
  /** Resource name. */
  name?: string;
  /** Resource type. */
  type?: string;
  /** Resource location. */
  location?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** A network interface in a resource group. */
export interface NetworkInterface extends Resource {
  /** The extended location of the network interface. */
  extendedLocation?: ExtendedLocation;
  /** Properties of the network interface. */
  properties?: NetworkInterfacePropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** ExtendedLocation complex type. */
export interface ExtendedLocation {
  /** The name of the extended location. */
  name?: string;
  /** The type of the extended location. */
  type?: "EdgeZone";
}

/** NetworkInterface properties. */
export interface NetworkInterfacePropertiesFormat {
  /** The reference to a virtual machine. */
  virtualMachine?: SubResource;
  /** The reference to the NetworkSecurityGroup resource. */
  networkSecurityGroup?: NetworkSecurityGroup;
  /** A reference to the private endpoint to which the network interface is linked. */
  privateEndpoint?: PrivateEndpoint;
  /** A list of IPConfigurations of the network interface. */
  ipConfigurations?: Array<NetworkInterfaceIPConfiguration>;
  /** A list of TapConfigurations of the network interface. */
  tapConfigurations?: Array<NetworkInterfaceTapConfiguration>;
  /** The DNS settings in network interface. */
  dnsSettings?: NetworkInterfaceDnsSettings;
  /** The MAC address of the network interface. */
  macAddress?: string;
  /** Whether this is a primary network interface on a virtual machine. */
  primary?: boolean;
  /** Whether the virtual machine this nic is attached to supports encryption. */
  vnetEncryptionSupported?: boolean;
  /** If the network interface is configured for accelerated networking. Not applicable to VM sizes which require accelerated networking. */
  enableAcceleratedNetworking?: boolean;
  /** Indicates whether to disable tcp state tracking. */
  disableTcpStateTracking?: boolean;
  /** Indicates whether IP forwarding is enabled on this network interface. */
  enableIPForwarding?: boolean;
  /** A list of references to linked BareMetal resources. */
  hostedWorkloads?: Array<string>;
  /** A reference to the dscp configuration to which the network interface is linked. */
  dscpConfiguration?: SubResource;
  /** The resource GUID property of the network interface resource. */
  resourceGuid?: string;
  /** The provisioning state of the network interface resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** WorkloadType of the NetworkInterface for BareMetal resources */
  workloadType?: string;
  /** Type of Network Interface resource. */
  nicType?: "Standard" | "Elastic";
  /** Privatelinkservice of the network interface resource. */
  privateLinkService?: PrivateLinkService;
  /** Migration phase of Network Interface resource. */
  migrationPhase?: "None" | "Prepare" | "Commit" | "Abort" | "Committed";
  /** Auxiliary mode of Network Interface resource. */
  auxiliaryMode?: "None" | "MaxConnections" | "Floating";
}

/** Private endpoint resource. */
export interface PrivateEndpoint extends Resource {
  /** The extended location of the load balancer. */
  extendedLocation?: ExtendedLocation;
  /** Properties of the private endpoint. */
  properties?: PrivateEndpointProperties;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of the private endpoint. */
export interface PrivateEndpointProperties {
  /** The ID of the subnet from which the private IP will be allocated. */
  subnet?: Subnet;
  /** An array of references to the network interfaces created for this private endpoint. */
  networkInterfaces?: Array<NetworkInterface>;
  /** The provisioning state of the private endpoint resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** A grouping of information about the connection to the remote resource. */
  privateLinkServiceConnections?: Array<PrivateLinkServiceConnection>;
  /** A grouping of information about the connection to the remote resource. Used when the network admin does not have access to approve connections to the remote resource. */
  manualPrivateLinkServiceConnections?: Array<PrivateLinkServiceConnection>;
  /** An array of custom dns configurations. */
  customDnsConfigs?: Array<CustomDnsConfigPropertiesFormat>;
  /** Application security groups in which the private endpoint IP configuration is included. */
  applicationSecurityGroups?: Array<ApplicationSecurityGroup>;
  /** A list of IP configurations of the private endpoint. This will be used to map to the First Party Service's endpoints. */
  ipConfigurations?: Array<PrivateEndpointIPConfiguration>;
  /** The custom name of the network interface attached to the private endpoint. */
  customNetworkInterfaceName?: string;
}

/** PrivateLinkServiceConnection resource. */
export interface PrivateLinkServiceConnection extends SubResource {
  /** Properties of the private link service connection. */
  properties?: PrivateLinkServiceConnectionProperties;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** The resource type. */
  type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of the PrivateLinkServiceConnection. */
export interface PrivateLinkServiceConnectionProperties {
  /** The provisioning state of the private link service connection resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The resource id of private link service. */
  privateLinkServiceId?: string;
  /** The ID(s) of the group(s) obtained from the remote resource that this private endpoint should connect to. */
  groupIds?: Array<string>;
  /** A message passed to the owner of the remote resource with this connection request. Restricted to 140 chars. */
  requestMessage?: string;
  /** A collection of read-only information about the state of the connection to the remote resource. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: string;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

/** Contains custom Dns resolution configuration from customer. */
export interface CustomDnsConfigPropertiesFormat {
  /** Fqdn that resolves to private endpoint ip address. */
  fqdn?: string;
  /** A list of private ip addresses of the private endpoint. */
  ipAddresses?: Array<string>;
}

/** An IP Configuration of the private endpoint. */
export interface PrivateEndpointIPConfiguration {
  /** Properties of private endpoint IP configurations. */
  properties?: PrivateEndpointIPConfigurationProperties;
  /** The name of the resource that is unique within a resource group. */
  name?: string;
  /** The resource type. */
  type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of an IP Configuration of the private endpoint. */
export interface PrivateEndpointIPConfigurationProperties {
  /** The ID of a group obtained from the remote resource that this private endpoint should connect to. */
  groupId?: string;
  /** The member name of a group obtained from the remote resource that this private endpoint should connect to. */
  memberName?: string;
  /** A private ip address obtained from the private endpoint's subnet. */
  privateIPAddress?: string;
}

/** DNS settings of a network interface. */
export interface NetworkInterfaceDnsSettings {
  /** List of DNS servers IP addresses. Use 'AzureProvidedDNS' to switch to azure provided DNS resolution. 'AzureProvidedDNS' value cannot be combined with other IPs, it must be the only value in dnsServers collection. */
  dnsServers?: Array<string>;
  /** If the VM that uses this NIC is part of an Availability Set, then this list will have the union of all DNS servers from all NICs that are part of the Availability Set. This property is what is configured on each of those VMs. */
  appliedDnsServers?: Array<string>;
  /** Relative DNS name for this NIC used for internal communications between VMs in the same virtual network. */
  internalDnsNameLabel?: string;
  /** Fully qualified DNS name supporting internal communications between VMs in the same virtual network. */
  internalFqdn?: string;
  /** Even if internalDnsNameLabel is not specified, a DNS entry is created for the primary NIC of the VM. This DNS name can be constructed by concatenating the VM name with the value of internalDomainNameSuffix. */
  internalDomainNameSuffix?: string;
}

/** Private link service resource. */
export interface PrivateLinkService extends Resource {
  /** The extended location of the load balancer. */
  extendedLocation?: ExtendedLocation;
  /** Properties of the private link service. */
  properties?: PrivateLinkServiceProperties;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of the private link service. */
export interface PrivateLinkServiceProperties {
  /** An array of references to the load balancer IP configurations. */
  loadBalancerFrontendIpConfigurations?: Array<FrontendIPConfiguration>;
  /** An array of private link service IP configurations. */
  ipConfigurations?: Array<PrivateLinkServiceIpConfiguration>;
  /** An array of references to the network interfaces created for this private link service. */
  networkInterfaces?: Array<NetworkInterface>;
  /** The provisioning state of the private link service resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** An array of list about connections to the private endpoint. */
  privateEndpointConnections?: Array<PrivateEndpointConnection>;
  /** The visibility list of the private link service. */
  visibility?: PrivateLinkServicePropertiesVisibility;
  /** The auto-approval list of the private link service. */
  autoApproval?: PrivateLinkServicePropertiesAutoApproval;
  /** The list of Fqdn. */
  fqdns?: Array<string>;
  /** The alias of the private link service. */
  alias?: string;
  /** Whether the private link service is enabled for proxy protocol or not. */
  enableProxyProtocol?: boolean;
}

/** The private link service ip configuration. */
export interface PrivateLinkServiceIpConfiguration extends SubResource {
  /** Properties of the private link service ip configuration. */
  properties?: PrivateLinkServiceIpConfigurationProperties;
  /** The name of private link service ip configuration. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** The resource type. */
  type?: string;
}

/** Properties of private link service IP configuration. */
export interface PrivateLinkServiceIpConfigurationProperties {
  /** The private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: "Static" | "Dynamic";
  /** The reference to the subnet resource. */
  subnet?: Subnet;
  /** Whether the ip configuration is primary or not. */
  primary?: boolean;
  /** The provisioning state of the private link service IP configuration resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Whether the specific IP configuration is IPv4 or IPv6. Default is IPv4. */
  privateIPAddressVersion?: "IPv4" | "IPv6";
}

/** PrivateEndpointConnection resource. */
export interface PrivateEndpointConnection extends SubResource {
  /** Properties of the private end point connection. */
  properties?: PrivateEndpointConnectionProperties;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** The resource type. */
  type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of the PrivateEndpointConnectProperties. */
export interface PrivateEndpointConnectionProperties {
  /** The resource of private end point. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The consumer link id. */
  linkIdentifier?: string;
}

/** The visibility list of the private link service. */
export interface PrivateLinkServicePropertiesVisibility extends ResourceSet {}

/** The base resource set for visibility and auto-approval. */
export interface ResourceSet {
  /** The list of subscriptions. */
  subscriptions?: Array<string>;
}

/** The auto-approval list of the private link service. */
export interface PrivateLinkServicePropertiesAutoApproval extends ResourceSet {}

/** A flow log resource. */
export interface FlowLog extends Resource {
  /** Properties of the flow log. */
  properties?: FlowLogPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Parameters that define the configuration of flow log. */
export interface FlowLogPropertiesFormat {
  /** ID of network security group to which flow log will be applied. */
  targetResourceId: string;
  /** Guid of network security group to which flow log will be applied. */
  targetResourceGuid?: string;
  /** ID of the storage account which is used to store the flow log. */
  storageId: string;
  /** Flag to enable/disable flow logging. */
  enabled?: boolean;
  /** Parameters that define the retention policy for flow log. */
  retentionPolicy?: RetentionPolicyParameters;
  /** Parameters that define the flow log format. */
  format?: FlowLogFormatParameters;
  /** Parameters that define the configuration of traffic analytics. */
  flowAnalyticsConfiguration?: TrafficAnalyticsProperties;
  /** The provisioning state of the flow log. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Parameters that define the retention policy for flow log. */
export interface RetentionPolicyParameters {
  /** Number of days to retain flow log records. */
  days?: number;
  /** Flag to enable/disable retention. */
  enabled?: boolean;
}

/** Parameters that define the flow log format. */
export interface FlowLogFormatParameters {
  /** The file type of flow log. */
  type?: "JSON";
  /** The version (revision) of the flow log. */
  version?: number;
}

/** Parameters that define the configuration of traffic analytics. */
export interface TrafficAnalyticsProperties {
  /** Parameters that define the configuration of traffic analytics. */
  networkWatcherFlowAnalyticsConfiguration?: TrafficAnalyticsConfigurationProperties;
}

/** Parameters that define the configuration of traffic analytics. */
export interface TrafficAnalyticsConfigurationProperties {
  /** Flag to enable/disable traffic analytics. */
  enabled?: boolean;
  /** The resource guid of the attached workspace. */
  workspaceId?: string;
  /** The location of the attached workspace. */
  workspaceRegion?: string;
  /** Resource Id of the attached workspace. */
  workspaceResourceId?: string;
  /** The interval in minutes which would decide how frequently TA service should do flow analytics. */
  trafficAnalyticsInterval?: number;
}

/** Route table resource. */
export interface RouteTable extends Resource {
  /** Properties of the route table. */
  properties?: RouteTablePropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Route Table resource. */
export interface RouteTablePropertiesFormat {
  /** Collection of routes contained within a route table. */
  routes?: Array<Route>;
  /** A collection of references to subnets. */
  subnets?: Array<Subnet>;
  /** Whether to disable the routes learned by BGP on that route table. True means disable. */
  disableBgpRoutePropagation?: boolean;
  /** The provisioning state of the route table resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The resource GUID property of the route table. */
  resourceGuid?: string;
}

/** Route resource. */
export interface Route extends SubResource {
  /** Properties of the route. */
  properties?: RoutePropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** The type of the resource. */
  type?: string;
}

/** Route resource. */
export interface RoutePropertiesFormat {
  /** The destination CIDR to which the route applies. */
  addressPrefix?: string;
  /** The type of Azure hop the packet should be sent to. */
  nextHopType: "VirtualNetworkGateway" | "VnetLocal" | "Internet" | "VirtualAppliance" | "None";
  /** The IP address packets should be forwarded to. Next hop values are only allowed in routes where the next hop type is VirtualAppliance. */
  nextHopIpAddress?: string;
  /** The provisioning state of the route resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** A value indicating whether this route overrides overlapping BGP routes regardless of LPM. */
  hasBgpOverride?: boolean;
}

/** The service endpoint properties. */
export interface ServiceEndpointPropertiesFormat {
  /** The type of the endpoint service. */
  service?: string;
  /** A list of locations. */
  locations?: Array<string>;
  /** The provisioning state of the service endpoint resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Service End point policy resource. */
export interface ServiceEndpointPolicy extends Resource {
  /** Properties of the service end point policy. */
  properties?: ServiceEndpointPolicyPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Kind of service endpoint policy. This is metadata used for the Azure portal experience. */
  kind?: string;
}

/** Service Endpoint Policy resource. */
export interface ServiceEndpointPolicyPropertiesFormat {
  /** A collection of service endpoint policy definitions of the service endpoint policy. */
  serviceEndpointPolicyDefinitions?: Array<ServiceEndpointPolicyDefinition>;
  /** A collection of references to subnets. */
  subnets?: Array<Subnet>;
  /** The resource GUID property of the service endpoint policy resource. */
  resourceGuid?: string;
  /** The provisioning state of the service endpoint policy resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The alias indicating if the policy belongs to a service */
  serviceAlias?: string;
  /** A collection of contextual service endpoint policy. */
  contextualServiceEndpointPolicies?: Array<string>;
}

/** Service Endpoint policy definitions. */
export interface ServiceEndpointPolicyDefinition extends SubResource {
  /** Properties of the service endpoint policy definition. */
  properties?: ServiceEndpointPolicyDefinitionPropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** The type of the resource. */
  type?: string;
}

/** Service Endpoint policy definition resource. */
export interface ServiceEndpointPolicyDefinitionPropertiesFormat {
  /** A description for this rule. Restricted to 140 chars. */
  description?: string;
  /** Service endpoint name. */
  service?: string;
  /** A list of service resources. */
  serviceResources?: Array<string>;
  /** The provisioning state of the service endpoint policy definition resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** IP configuration. */
export interface IPConfiguration extends SubResource {
  /** Properties of the IP configuration. */
  properties?: IPConfigurationPropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of IP configuration. */
export interface IPConfigurationPropertiesFormat {
  /** The private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: "Static" | "Dynamic";
  /** The reference to the subnet resource. */
  subnet?: Subnet;
  /** The reference to the public IP resource. */
  publicIPAddress?: PublicIPAddress;
  /** The provisioning state of the IP configuration resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Public IP address resource. */
export interface PublicIPAddress extends Resource {
  /** The extended location of the public ip address. */
  extendedLocation?: ExtendedLocation;
  /** The public IP address SKU. */
  sku?: PublicIPAddressSku;
  /** Public IP address properties. */
  properties?: PublicIPAddressPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** A list of availability zones denoting the IP allocated for the resource needs to come from. */
  zones?: Array<string>;
}

/** SKU of a public IP address. */
export interface PublicIPAddressSku {
  /** Name of a public IP address SKU. */
  name?: "Basic" | "Standard";
  /** Tier of a public IP address SKU. */
  tier?: "Regional" | "Global";
}

/** Public IP address properties. */
export interface PublicIPAddressPropertiesFormat {
  /** The public IP address allocation method. */
  publicIPAllocationMethod?: "Static" | "Dynamic";
  /** The public IP address version. */
  publicIPAddressVersion?: "IPv4" | "IPv6";
  /** The IP configuration associated with the public IP address. */
  ipConfiguration?: IPConfiguration;
  /** The FQDN of the DNS record associated with the public IP address. */
  dnsSettings?: PublicIPAddressDnsSettings;
  /** The DDoS protection custom policy associated with the public IP address. */
  ddosSettings?: DdosSettings;
  /** The list of tags associated with the public IP address. */
  ipTags?: Array<IpTag>;
  /** The IP address associated with the public IP address resource. */
  ipAddress?: string;
  /** The Public IP Prefix this Public IP Address should be allocated from. */
  publicIPPrefix?: SubResource;
  /** The idle timeout of the public IP address. */
  idleTimeoutInMinutes?: number;
  /** The resource GUID property of the public IP address resource. */
  resourceGuid?: string;
  /** The provisioning state of the public IP address resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The service public IP address of the public IP address resource. */
  servicePublicIPAddress?: PublicIPAddress;
  /** The NatGateway for the Public IP address. */
  natGateway?: NatGateway;
  /** Migration phase of Public IP Address. */
  migrationPhase?: "None" | "Prepare" | "Commit" | "Abort" | "Committed";
  /** The linked public IP address of the public IP address resource. */
  linkedPublicIPAddress?: PublicIPAddress;
  /** Specify what happens to the public IP address when the VM using it is deleted */
  deleteOption?: "Delete" | "Detach";
}

/** Contains FQDN of the DNS record associated with the public IP address. */
export interface PublicIPAddressDnsSettings {
  /** The domain name label. The concatenation of the domain name label and the regionalized DNS zone make up the fully qualified domain name associated with the public IP address. If a domain name label is specified, an A DNS record is created for the public IP in the Microsoft Azure DNS system. */
  domainNameLabel?: string;
  /** The Fully Qualified Domain Name of the A DNS record associated with the public IP. This is the concatenation of the domainNameLabel and the regionalized DNS zone. */
  fqdn?: string;
  /** The reverse FQDN. A user-visible, fully qualified domain name that resolves to this public IP address. If the reverseFqdn is specified, then a PTR DNS record is created pointing from the IP address in the in-addr.arpa domain to the reverse FQDN. */
  reverseFqdn?: string;
}

/** Contains the DDoS protection settings of the public IP. */
export interface DdosSettings {
  /** The DDoS protection mode of the public IP */
  protectionMode?: "VirtualNetworkInherited" | "Enabled" | "Disabled";
  /** The DDoS protection plan associated with the public IP. Can only be set if ProtectionMode is Enabled */
  ddosProtectionPlan?: SubResource;
}

/** Contains the IpTag associated with the object. */
export interface IpTag {
  /** The IP tag type. Example: FirstPartyUsage. */
  ipTagType?: string;
  /** The value of the IP tag associated with the public IP. Example: SQL. */
  tag?: string;
}

/** Nat Gateway resource. */
export interface NatGateway extends Resource {
  /** The nat gateway SKU. */
  sku?: NatGatewaySku;
  /** Nat Gateway properties. */
  properties?: NatGatewayPropertiesFormat;
  /** A list of availability zones denoting the zone in which Nat Gateway should be deployed. */
  zones?: Array<string>;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** SKU of nat gateway. */
export interface NatGatewaySku {
  /** Name of Nat Gateway SKU. */
  name?: "Standard";
}

/** Nat Gateway properties. */
export interface NatGatewayPropertiesFormat {
  /** The idle timeout of the nat gateway. */
  idleTimeoutInMinutes?: number;
  /** An array of public ip addresses associated with the nat gateway resource. */
  publicIpAddresses?: Array<SubResource>;
  /** An array of public ip prefixes associated with the nat gateway resource. */
  publicIpPrefixes?: Array<SubResource>;
  /** An array of references to the subnets using this nat gateway resource. */
  subnets?: Array<SubResource>;
  /** The resource GUID property of the NAT gateway resource. */
  resourceGuid?: string;
  /** The provisioning state of the NAT gateway resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** IP configuration profile child resource. */
export interface IPConfigurationProfile extends SubResource {
  /** Properties of the IP configuration profile. */
  properties?: IPConfigurationProfilePropertiesFormat;
  /** The name of the resource. This name can be used to access the resource. */
  name?: string;
  /** Sub Resource type. */
  type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** IP configuration profile properties. */
export interface IPConfigurationProfilePropertiesFormat {
  /** The reference to the subnet resource to create a container network interface ip configuration. */
  subnet?: Subnet;
  /** The provisioning state of the IP configuration profile resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** ResourceNavigationLink resource. */
export interface ResourceNavigationLink extends SubResource {
  /** Resource navigation link properties format. */
  properties?: ResourceNavigationLinkFormat;
  /** Name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Resource type. */
  type?: string;
}

/** Properties of ResourceNavigationLink. */
export interface ResourceNavigationLinkFormat {
  /** Resource type of the linked resource. */
  linkedResourceType?: string;
  /** Link to the external resource. */
  link?: string;
  /** The provisioning state of the resource navigation link resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** ServiceAssociationLink resource. */
export interface ServiceAssociationLink extends SubResource {
  /** Resource navigation link properties format. */
  properties?: ServiceAssociationLinkPropertiesFormat;
  /** Name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Resource type. */
  type?: string;
}

/** Properties of ServiceAssociationLink. */
export interface ServiceAssociationLinkPropertiesFormat {
  /** Resource type of the linked resource. */
  linkedResourceType?: string;
  /** Link to the external resource. */
  link?: string;
  /** The provisioning state of the service association link resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** If true, the resource can be deleted. */
  allowDelete?: boolean;
  /** A list of locations. */
  locations?: Array<string>;
}

/** Details the service to which the subnet is delegated. */
export interface Delegation extends SubResource {
  /** Properties of the subnet. */
  properties?: ServiceDelegationPropertiesFormat;
  /** The name of the resource that is unique within a subnet. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Resource type. */
  type?: string;
}

/** Properties of a service delegation. */
export interface ServiceDelegationPropertiesFormat {
  /** The name of the service to whom the subnet should be delegated (e.g. Microsoft.Sql/servers). */
  serviceName?: string;
  /** The actions permitted to the service upon delegation. */
  actions?: Array<string>;
  /** The provisioning state of the service delegation resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Pool of backend IP addresses. */
export interface BackendAddressPool extends SubResource {
  /** Properties of load balancer backend address pool. */
  properties?: BackendAddressPoolPropertiesFormat;
  /** The name of the resource that is unique within the set of backend address pools used by the load balancer. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of the backend address pool. */
export interface BackendAddressPoolPropertiesFormat {
  /** The location of the backend address pool. */
  location?: string;
  /** An array of gateway load balancer tunnel interfaces. */
  tunnelInterfaces?: Array<GatewayLoadBalancerTunnelInterface>;
  /** An array of backend addresses. */
  loadBalancerBackendAddresses?: Array<LoadBalancerBackendAddress>;
  /** An array of references to IP addresses defined in network interfaces. */
  backendIPConfigurations?: Array<NetworkInterfaceIPConfiguration>;
  /** An array of references to load balancing rules that use this backend address pool. */
  loadBalancingRules?: Array<SubResource>;
  /** A reference to an outbound rule that uses this backend address pool. */
  outboundRule?: SubResource;
  /** An array of references to outbound rules that use this backend address pool. */
  outboundRules?: Array<SubResource>;
  /** An array of references to inbound NAT rules that use this backend address pool. */
  inboundNatRules?: Array<SubResource>;
  /** The provisioning state of the backend address pool resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Amount of seconds Load Balancer waits for before sending RESET to client and backend address. */
  drainPeriodInSeconds?: number;
}

/** Gateway load balancer tunnel interface of a load balancer backend address pool. */
export interface GatewayLoadBalancerTunnelInterface {
  /** Port of gateway load balancer tunnel interface. */
  port?: number;
  /** Identifier of gateway load balancer tunnel interface. */
  identifier?: number;
  /** Protocol of gateway load balancer tunnel interface. */
  protocol?: "None" | "Native" | "VXLAN";
  /** Traffic type of gateway load balancer tunnel interface. */
  type?: "None" | "Internal" | "External";
}

/** Load balancer backend addresses. */
export interface LoadBalancerBackendAddress {
  /** Properties of load balancer backend address pool. */
  properties?: LoadBalancerBackendAddressPropertiesFormat;
  /** Name of the backend address. */
  name?: string;
}

/** Properties of the load balancer backend addresses. */
export interface LoadBalancerBackendAddressPropertiesFormat {
  /** Reference to an existing virtual network. */
  virtualNetwork?: SubResource;
  /** Reference to an existing subnet. */
  subnet?: SubResource;
  /** IP Address belonging to the referenced virtual network. */
  ipAddress?: string;
  /** Reference to IP address defined in network interfaces. */
  networkInterfaceIPConfiguration?: SubResource;
  /** Reference to the frontend ip address configuration defined in regional loadbalancer. */
  loadBalancerFrontendIPConfiguration?: SubResource;
  /** Collection of inbound NAT rule port mappings. */
  inboundNatRulesPortMapping?: Array<NatRulePortMapping>;
  /** A list of administrative states which once set can override health probe so that Load Balancer will always forward new connections to backend, or deny new connections and reset existing connections. */
  adminState?: "None" | "Up" | "Down" | "Drain";
}

/** Individual port mappings for inbound NAT rule created for backend pool. */
export interface NatRulePortMapping {
  /** Name of inbound NAT rule. */
  inboundNatRuleName?: string;
  /** Frontend port. */
  frontendPort?: number;
  /** Backend port. */
  backendPort?: number;
}

/** Inbound NAT rule of the load balancer. */
export interface InboundNatRule extends SubResource {
  /** Properties of load balancer inbound NAT rule. */
  properties?: InboundNatRulePropertiesFormat;
  /** The name of the resource that is unique within the set of inbound NAT rules used by the load balancer. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of the inbound NAT rule. */
export interface InboundNatRulePropertiesFormat {
  /** A reference to frontend IP addresses. */
  frontendIPConfiguration?: SubResource;
  /** A reference to a private IP address defined on a network interface of a VM. Traffic sent to the frontend port of each of the frontend IP configurations is forwarded to the backend IP. */
  backendIPConfiguration?: NetworkInterfaceIPConfiguration;
  /** The reference to the transport protocol used by the load balancing rule. */
  protocol?: "Udp" | "Tcp" | "All";
  /** The port for the external endpoint. Port numbers for each rule must be unique within the Load Balancer. Acceptable values range from 1 to 65534. */
  frontendPort?: number;
  /** The port used for the internal endpoint. Acceptable values range from 1 to 65535. */
  backendPort?: number;
  /** The timeout for the TCP idle connection. The value can be set between 4 and 30 minutes. The default value is 4 minutes. This element is only used when the protocol is set to TCP. */
  idleTimeoutInMinutes?: number;
  /** Configures a virtual machine's endpoint for the floating IP capability required to configure a SQL AlwaysOn Availability Group. This setting is required when using the SQL AlwaysOn Availability Groups in SQL server. This setting can't be changed after you create the endpoint. */
  enableFloatingIP?: boolean;
  /** Receive bidirectional TCP Reset on TCP flow idle timeout or unexpected connection termination. This element is only used when the protocol is set to TCP. */
  enableTcpReset?: boolean;
  /** The port range start for the external endpoint. This property is used together with BackendAddressPool and FrontendPortRangeEnd. Individual inbound NAT rule port mappings will be created for each backend address from BackendAddressPool. Acceptable values range from 1 to 65534. */
  frontendPortRangeStart?: number;
  /** The port range end for the external endpoint. This property is used together with BackendAddressPool and FrontendPortRangeStart. Individual inbound NAT rule port mappings will be created for each backend address from BackendAddressPool. Acceptable values range from 1 to 65534. */
  frontendPortRangeEnd?: number;
  /** A reference to backendAddressPool resource. */
  backendAddressPool?: SubResource;
  /** The provisioning state of the inbound NAT rule resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** PrivateLinkConnection properties for the network interface. */
export interface NetworkInterfaceIPConfigurationPrivateLinkConnectionProperties {
  /** The group ID for current private link connection. */
  groupId?: string;
  /** The required member name for current private link connection. */
  requiredMemberName?: string;
  /** List of FQDNs for current private link connection. */
  fqdns?: Array<string>;
}

/** Backend address of an application gateway. */
export interface ApplicationGatewayBackendAddress {
  /** Fully qualified domain name (FQDN). */
  fqdn?: string;
  /** IP address. */
  ipAddress?: string;
}

/** Backend address pool settings of an application gateway. */
export interface ApplicationGatewayBackendHttpSettings extends SubResource {
  /** Properties of the application gateway backend HTTP settings. */
  properties?: ApplicationGatewayBackendHttpSettingsPropertiesFormat;
  /** Name of the backend http settings that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of Backend address pool settings of an application gateway. */
export interface ApplicationGatewayBackendHttpSettingsPropertiesFormat {
  /** The destination port on the backend. */
  port?: number;
  /** The protocol used to communicate with the backend. */
  protocol?: "Http" | "Https" | "Tcp" | "Tls";
  /** Cookie based affinity. */
  cookieBasedAffinity?: "Enabled" | "Disabled";
  /** Request timeout in seconds. Application Gateway will fail the request if response is not received within RequestTimeout. Acceptable values are from 1 second to 86400 seconds. */
  requestTimeout?: number;
  /** Probe resource of an application gateway. */
  probe?: SubResource;
  /** Array of references to application gateway authentication certificates. */
  authenticationCertificates?: Array<SubResource>;
  /** Array of references to application gateway trusted root certificates. */
  trustedRootCertificates?: Array<SubResource>;
  /** Connection draining of the backend http settings resource. */
  connectionDraining?: ApplicationGatewayConnectionDraining;
  /** Host header to be sent to the backend servers. */
  hostName?: string;
  /** Whether to pick host header should be picked from the host name of the backend server. Default value is false. */
  pickHostNameFromBackendAddress?: boolean;
  /** Cookie name to use for the affinity cookie. */
  affinityCookieName?: string;
  /** Whether the probe is enabled. Default value is false. */
  probeEnabled?: boolean;
  /** Path which should be used as a prefix for all HTTP requests. Null means no path will be prefixed. Default value is null. */
  path?: string;
  /** The provisioning state of the backend HTTP settings resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Connection draining allows open connections to a backend server to be active for a specified time after the backend server got removed from the configuration. */
export interface ApplicationGatewayConnectionDraining {
  /** Whether connection draining is enabled or not. */
  enabled: boolean;
  /** The number of seconds connection draining is active. Acceptable values are from 1 second to 3600 seconds. */
  drainTimeoutInSec: number;
}

/** Backend address pool settings of an application gateway. */
export interface ApplicationGatewayBackendSettings extends SubResource {
  /** Properties of the application gateway backend settings. */
  properties?: ApplicationGatewayBackendSettingsPropertiesFormat;
  /** Name of the backend settings that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of Backend address pool settings of an application gateway. */
export interface ApplicationGatewayBackendSettingsPropertiesFormat {
  /** The destination port on the backend. */
  port?: number;
  /** The protocol used to communicate with the backend. */
  protocol?: "Http" | "Https" | "Tcp" | "Tls";
  /** Connection timeout in seconds. Application Gateway will fail the request if response is not received within ConnectionTimeout. Acceptable values are from 1 second to 86400 seconds. */
  timeout?: number;
  /** Probe resource of an application gateway. */
  probe?: SubResource;
  /** Array of references to application gateway trusted root certificates. */
  trustedRootCertificates?: Array<SubResource>;
  /** Server name indication to be sent to the backend servers for Tls protocol. */
  hostName?: string;
  /** Whether to pick server name indication from the host name of the backend server for Tls protocol. Default value is false. */
  pickHostNameFromBackendAddress?: boolean;
  /** The provisioning state of the backend HTTP settings resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Http listener of an application gateway. */
export interface ApplicationGatewayHttpListener extends SubResource {
  /** Properties of the application gateway HTTP listener. */
  properties?: ApplicationGatewayHttpListenerPropertiesFormat;
  /** Name of the HTTP listener that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of HTTP listener of an application gateway. */
export interface ApplicationGatewayHttpListenerPropertiesFormat {
  /** Frontend IP configuration resource of an application gateway. */
  frontendIPConfiguration?: SubResource;
  /** Frontend port resource of an application gateway. */
  frontendPort?: SubResource;
  /** Protocol of the HTTP listener. */
  protocol?: "Http" | "Https" | "Tcp" | "Tls";
  /** Host name of HTTP listener. */
  hostName?: string;
  /** SSL certificate resource of an application gateway. */
  sslCertificate?: SubResource;
  /** SSL profile resource of the application gateway. */
  sslProfile?: SubResource;
  /** Applicable only if protocol is https. Enables SNI for multi-hosting. */
  requireServerNameIndication?: boolean;
  /** The provisioning state of the HTTP listener resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Custom error configurations of the HTTP listener. */
  customErrorConfigurations?: Array<ApplicationGatewayCustomError>;
  /** Reference to the FirewallPolicy resource. */
  firewallPolicy?: SubResource;
  /** List of Host names for HTTP Listener that allows special wildcard characters as well. */
  hostNames?: Array<string>;
}

/** Customer error of an application gateway. */
export interface ApplicationGatewayCustomError {
  /** Status code of the application gateway customer error. */
  statusCode?: "HttpStatus403" | "HttpStatus502";
  /** Error page URL of the application gateway customer error. */
  customErrorPageUrl?: string;
}

/** Listener of an application gateway. */
export interface ApplicationGatewayListener extends SubResource {
  /** Properties of the application gateway listener. */
  properties?: ApplicationGatewayListenerPropertiesFormat;
  /** Name of the listener that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of listener of an application gateway. */
export interface ApplicationGatewayListenerPropertiesFormat {
  /** Frontend IP configuration resource of an application gateway. */
  frontendIPConfiguration?: SubResource;
  /** Frontend port resource of an application gateway. */
  frontendPort?: SubResource;
  /** Protocol of the listener. */
  protocol?: "Http" | "Https" | "Tcp" | "Tls";
  /** SSL certificate resource of an application gateway. */
  sslCertificate?: SubResource;
  /** SSL profile resource of the application gateway. */
  sslProfile?: SubResource;
  /** The provisioning state of the listener resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** SSL profile of an application gateway. */
export interface ApplicationGatewaySslProfile extends SubResource {
  /** Properties of the application gateway SSL profile. */
  properties?: ApplicationGatewaySslProfilePropertiesFormat;
  /** Name of the SSL profile that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of SSL profile of an application gateway. */
export interface ApplicationGatewaySslProfilePropertiesFormat {
  /** Array of references to application gateway trusted client certificates. */
  trustedClientCertificates?: Array<SubResource>;
  /** SSL policy of the application gateway resource. */
  sslPolicy?: ApplicationGatewaySslPolicy;
  /** Client authentication configuration of the application gateway resource. */
  clientAuthConfiguration?: ApplicationGatewayClientAuthConfiguration;
  /** The provisioning state of the HTTP listener resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Application gateway client authentication configuration. */
export interface ApplicationGatewayClientAuthConfiguration {
  /** Verify client certificate issuer name on the application gateway. */
  verifyClientCertIssuerDN?: boolean;
  /** Verify client certificate revocation status. */
  verifyClientRevocation?: "None" | "OCSP";
}

/** UrlPathMaps give a url path to the backend mapping information for PathBasedRouting. */
export interface ApplicationGatewayUrlPathMap extends SubResource {
  /** Properties of the application gateway URL path map. */
  properties?: ApplicationGatewayUrlPathMapPropertiesFormat;
  /** Name of the URL path map that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of UrlPathMap of the application gateway. */
export interface ApplicationGatewayUrlPathMapPropertiesFormat {
  /** Default backend address pool resource of URL path map. */
  defaultBackendAddressPool?: SubResource;
  /** Default backend http settings resource of URL path map. */
  defaultBackendHttpSettings?: SubResource;
  /** Default Rewrite rule set resource of URL path map. */
  defaultRewriteRuleSet?: SubResource;
  /** Default redirect configuration resource of URL path map. */
  defaultRedirectConfiguration?: SubResource;
  /** Default Load Distribution Policy resource of URL path map. */
  defaultLoadDistributionPolicy?: SubResource;
  /** Path rule of URL path map resource. */
  pathRules?: Array<ApplicationGatewayPathRule>;
  /** The provisioning state of the URL path map resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Path rule of URL path map of an application gateway. */
export interface ApplicationGatewayPathRule extends SubResource {
  /** Properties of the application gateway path rule. */
  properties?: ApplicationGatewayPathRulePropertiesFormat;
  /** Name of the path rule that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of path rule of an application gateway. */
export interface ApplicationGatewayPathRulePropertiesFormat {
  /** Path rules of URL path map. */
  paths?: Array<string>;
  /** Backend address pool resource of URL path map path rule. */
  backendAddressPool?: SubResource;
  /** Backend http settings resource of URL path map path rule. */
  backendHttpSettings?: SubResource;
  /** Redirect configuration resource of URL path map path rule. */
  redirectConfiguration?: SubResource;
  /** Rewrite rule set resource of URL path map path rule. */
  rewriteRuleSet?: SubResource;
  /** Load Distribution Policy resource of URL path map path rule. */
  loadDistributionPolicy?: SubResource;
  /** The provisioning state of the path rule resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Reference to the FirewallPolicy resource. */
  firewallPolicy?: SubResource;
}

/** Request routing rule of an application gateway. */
export interface ApplicationGatewayRequestRoutingRule extends SubResource {
  /** Properties of the application gateway request routing rule. */
  properties?: ApplicationGatewayRequestRoutingRulePropertiesFormat;
  /** Name of the request routing rule that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of request routing rule of the application gateway. */
export interface ApplicationGatewayRequestRoutingRulePropertiesFormat {
  /** Rule type. */
  ruleType?: "Basic" | "PathBasedRouting";
  /** Priority of the request routing rule. */
  priority?: number;
  /** Backend address pool resource of the application gateway. */
  backendAddressPool?: SubResource;
  /** Backend http settings resource of the application gateway. */
  backendHttpSettings?: SubResource;
  /** Http listener resource of the application gateway. */
  httpListener?: SubResource;
  /** URL path map resource of the application gateway. */
  urlPathMap?: SubResource;
  /** Rewrite Rule Set resource in Basic rule of the application gateway. */
  rewriteRuleSet?: SubResource;
  /** Redirect configuration resource of the application gateway. */
  redirectConfiguration?: SubResource;
  /** Load Distribution Policy resource of the application gateway. */
  loadDistributionPolicy?: SubResource;
  /** The provisioning state of the request routing rule resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Routing rule of an application gateway. */
export interface ApplicationGatewayRoutingRule extends SubResource {
  /** Properties of the application gateway routing rule. */
  properties?: ApplicationGatewayRoutingRulePropertiesFormat;
  /** Name of the routing rule that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of routing rule of the application gateway. */
export interface ApplicationGatewayRoutingRulePropertiesFormat {
  /** Rule type. */
  ruleType?: "Basic" | "PathBasedRouting";
  /** Priority of the routing rule. */
  priority: number;
  /** Backend address pool resource of the application gateway. */
  backendAddressPool?: SubResource;
  /** Backend settings resource of the application gateway. */
  backendSettings?: SubResource;
  /** Listener resource of the application gateway. */
  listener?: SubResource;
  /** The provisioning state of the request routing rule resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Rewrite rule set of an application gateway. */
export interface ApplicationGatewayRewriteRuleSet extends SubResource {
  /** Properties of the application gateway rewrite rule set. */
  properties?: ApplicationGatewayRewriteRuleSetPropertiesFormat;
  /** Name of the rewrite rule set that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of rewrite rule set of the application gateway. */
export interface ApplicationGatewayRewriteRuleSetPropertiesFormat {
  /** Rewrite rules in the rewrite rule set. */
  rewriteRules?: Array<ApplicationGatewayRewriteRule>;
  /** The provisioning state of the rewrite rule set resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Rewrite rule of an application gateway. */
export interface ApplicationGatewayRewriteRule {
  /** Name of the rewrite rule that is unique within an Application Gateway. */
  name?: string;
  /** Rule Sequence of the rewrite rule that determines the order of execution of a particular rule in a RewriteRuleSet. */
  ruleSequence?: number;
  /** Conditions based on which the action set execution will be evaluated. */
  conditions?: Array<ApplicationGatewayRewriteRuleCondition>;
  /** Set of actions to be done as part of the rewrite Rule. */
  actionSet?: ApplicationGatewayRewriteRuleActionSet;
}

/** Set of conditions in the Rewrite Rule in Application Gateway. */
export interface ApplicationGatewayRewriteRuleCondition {
  /** The condition parameter of the RewriteRuleCondition. */
  variable?: string;
  /** The pattern, either fixed string or regular expression, that evaluates the truthfulness of the condition. */
  pattern?: string;
  /** Setting this parameter to truth value with force the pattern to do a case in-sensitive comparison. */
  ignoreCase?: boolean;
  /** Setting this value as truth will force to check the negation of the condition given by the user. */
  negate?: boolean;
}

/** Set of actions in the Rewrite Rule in Application Gateway. */
export interface ApplicationGatewayRewriteRuleActionSet {
  /** Request Header Actions in the Action Set. */
  requestHeaderConfigurations?: Array<ApplicationGatewayHeaderConfiguration>;
  /** Response Header Actions in the Action Set. */
  responseHeaderConfigurations?: Array<ApplicationGatewayHeaderConfiguration>;
  /** Url Configuration Action in the Action Set. */
  urlConfiguration?: ApplicationGatewayUrlConfiguration;
}

/** Header configuration of the Actions set in Application Gateway. */
export interface ApplicationGatewayHeaderConfiguration {
  /** Header name of the header configuration. */
  headerName?: string;
  /** Header value of the header configuration. */
  headerValue?: string;
}

/** Url configuration of the Actions set in Application Gateway. */
export interface ApplicationGatewayUrlConfiguration {
  /** Url path which user has provided for url rewrite. Null means no path will be updated. Default value is null. */
  modifiedPath?: string;
  /** Query string which user has provided for url rewrite. Null means no query string will be updated. Default value is null. */
  modifiedQueryString?: string;
  /** If set as true, it will re-evaluate the url path map provided in path based request routing rules using modified path. Default value is false. */
  reroute?: boolean;
}

/** Redirect configuration of an application gateway. */
export interface ApplicationGatewayRedirectConfiguration extends SubResource {
  /** Properties of the application gateway redirect configuration. */
  properties?: ApplicationGatewayRedirectConfigurationPropertiesFormat;
  /** Name of the redirect configuration that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of redirect configuration of the application gateway. */
export interface ApplicationGatewayRedirectConfigurationPropertiesFormat {
  /** HTTP redirection type. */
  redirectType?: "Permanent" | "Found" | "SeeOther" | "Temporary";
  /** Reference to a listener to redirect the request to. */
  targetListener?: SubResource;
  /** Url to redirect the request to. */
  targetUrl?: string;
  /** Include path in the redirected url. */
  includePath?: boolean;
  /** Include query string in the redirected url. */
  includeQueryString?: boolean;
  /** Request routing specifying redirect configuration. */
  requestRoutingRules?: Array<SubResource>;
  /** Url path maps specifying default redirect configuration. */
  urlPathMaps?: Array<SubResource>;
  /** Path rules specifying redirect configuration. */
  pathRules?: Array<SubResource>;
}

/** Application gateway web application firewall configuration. */
export interface ApplicationGatewayWebApplicationFirewallConfiguration {
  /** Whether the web application firewall is enabled or not. */
  enabled: boolean;
  /** Web application firewall mode. */
  firewallMode: "Detection" | "Prevention";
  /** The type of the web application firewall rule set. Possible values are: 'OWASP'. */
  ruleSetType: string;
  /** The version of the rule set type. */
  ruleSetVersion: string;
  /** The disabled rule groups. */
  disabledRuleGroups?: Array<ApplicationGatewayFirewallDisabledRuleGroup>;
  /** Whether allow WAF to check request Body. */
  requestBodyCheck?: boolean;
  /** Maximum request body size for WAF. */
  maxRequestBodySize?: number;
  /** Maximum request body size in Kb for WAF. */
  maxRequestBodySizeInKb?: number;
  /** Maximum file upload size in Mb for WAF. */
  fileUploadLimitInMb?: number;
  /** The exclusion list. */
  exclusions?: Array<ApplicationGatewayFirewallExclusion>;
}

/** Allows to disable rules within a rule group or an entire rule group. */
export interface ApplicationGatewayFirewallDisabledRuleGroup {
  /** The name of the rule group that will be disabled. */
  ruleGroupName: string;
  /** The list of rules that will be disabled. If null, all rules of the rule group will be disabled. */
  rules?: Array<number>;
}

/** Allow to exclude some variable satisfy the condition for the WAF check. */
export interface ApplicationGatewayFirewallExclusion {
  /** The variable to be excluded. */
  matchVariable: string;
  /** When matchVariable is a collection, operate on the selector to specify which elements in the collection this exclusion applies to. */
  selectorMatchOperator: string;
  /** When matchVariable is a collection, operator used to specify which elements in the collection this exclusion applies to. */
  selector: string;
}

/** Application Gateway autoscale configuration. */
export interface ApplicationGatewayAutoscaleConfiguration {
  /** Lower bound on number of Application Gateway capacity. */
  minCapacity: number;
  /** Upper bound on number of Application Gateway capacity. */
  maxCapacity?: number;
}

/** Private Link Configuration on an application gateway. */
export interface ApplicationGatewayPrivateLinkConfiguration extends SubResource {
  /** Properties of the application gateway private link configuration. */
  properties?: ApplicationGatewayPrivateLinkConfigurationProperties;
  /** Name of the private link configuration that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of private link configuration on an application gateway. */
export interface ApplicationGatewayPrivateLinkConfigurationProperties {
  /** An array of application gateway private link ip configurations. */
  ipConfigurations?: Array<ApplicationGatewayPrivateLinkIpConfiguration>;
  /** The provisioning state of the application gateway private link configuration. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** The application gateway private link ip configuration. */
export interface ApplicationGatewayPrivateLinkIpConfiguration extends SubResource {
  /** Properties of an application gateway private link ip configuration. */
  properties?: ApplicationGatewayPrivateLinkIpConfigurationProperties;
  /** The name of application gateway private link ip configuration. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** The resource type. */
  type?: string;
}

/** Properties of an application gateway private link IP configuration. */
export interface ApplicationGatewayPrivateLinkIpConfigurationProperties {
  /** The private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: "Static" | "Dynamic";
  /** Reference to the subnet resource. */
  subnet?: SubResource;
  /** Whether the ip configuration is primary or not. */
  primary?: boolean;
  /** The provisioning state of the application gateway private link IP configuration. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Private Endpoint connection on an application gateway. */
export interface ApplicationGatewayPrivateEndpointConnection extends SubResource {
  /** Properties of the application gateway private endpoint connection. */
  properties?: ApplicationGatewayPrivateEndpointConnectionProperties;
  /** Name of the private endpoint connection on an application gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of Private Link Resource of an application gateway. */
export interface ApplicationGatewayPrivateEndpointConnectionProperties {
  /** The resource of private end point. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the application gateway private endpoint connection resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The consumer link id. */
  linkIdentifier?: string;
}

/** Load Distribution Policy of an application gateway. */
export interface ApplicationGatewayLoadDistributionPolicy extends SubResource {
  /** Properties of the application gateway load distribution policy. */
  properties?: ApplicationGatewayLoadDistributionPolicyPropertiesFormat;
  /** Name of the load distribution policy that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of Load Distribution Policy of an application gateway. */
export interface ApplicationGatewayLoadDistributionPolicyPropertiesFormat {
  /** Load Distribution Targets resource of an application gateway. */
  loadDistributionTargets?: Array<ApplicationGatewayLoadDistributionTarget>;
  /** Load Distribution Targets resource of an application gateway. */
  loadDistributionAlgorithm?: "RoundRobin" | "LeastConnections" | "IpHash";
  /** The provisioning state of the Load Distribution Policy resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Load Distribution Target of an application gateway. */
export interface ApplicationGatewayLoadDistributionTarget extends SubResource {
  /** Properties of the application gateway load distribution target. */
  properties?: ApplicationGatewayLoadDistributionTargetPropertiesFormat;
  /** Name of the load distribution policy that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

export interface ApplicationGatewayLoadDistributionTargetPropertiesFormat {
  /** Weight per server. Range between 1 and 100. */
  weightPerServer?: number;
  /** Backend address pool resource of the application gateway. */
  backendAddressPool?: SubResource;
}

/** Application Gateway global configuration. */
export interface ApplicationGatewayGlobalConfiguration {
  /** Enable request buffering. */
  enableRequestBuffering?: boolean;
  /** Enable response buffering. */
  enableResponseBuffering?: boolean;
}

/** Identity for the resource. */
export interface ManagedServiceIdentity {
  /** The principal id of the system assigned identity. This property will only be provided for a system assigned identity. */
  principalId?: string;
  /** The tenant id of the system assigned identity. This property will only be provided for a system assigned identity. */
  tenantId?: string;
  /** The type of identity used for the resource. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the virtual machine. */
  type?: "SystemAssigned" | "UserAssigned" | "SystemAssigned, UserAssigned" | "None";
  /** The list of user identities associated with resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<
    string,
    Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties
  >;
}

export interface Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties {
  /** The principal id of user assigned identity. */
  principalId?: string;
  /** The client id of user assigned identity. */
  clientId?: string;
}

/** Tags object for patch operations. */
export interface TagsObject {
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** Details of on demand test probe request. */
export interface ApplicationGatewayOnDemandProbe {
  /** The protocol used for the probe. */
  protocol?: "Http" | "Https" | "Tcp" | "Tls";
  /** Host name to send the probe to. */
  host?: string;
  /** Relative path of probe. Valid path starts from '/'. Probe is sent to <Protocol>://<host>:<port><path>. */
  path?: string;
  /** The probe timeout in seconds. Probe marked as failed if valid response is not received with this timeout period. Acceptable values are from 1 second to 86400 seconds. */
  timeout?: number;
  /** Whether the host header should be picked from the backend http settings. Default value is false. */
  pickHostNameFromBackendHttpSettings?: boolean;
  /** Criterion for classifying a healthy probe response. */
  match?: ApplicationGatewayProbeHealthResponseMatch;
  /** Reference to backend pool of application gateway to which probe request will be sent. */
  backendAddressPool?: SubResource;
  /** Reference to backend http setting of application gateway to be used for test probe. */
  backendHttpSettings?: SubResource;
}

/** PrivateLink Resource of an application gateway. */
export interface ApplicationGatewayPrivateLinkResource extends SubResource {
  /** Properties of the application gateway private link resource. */
  properties?: ApplicationGatewayPrivateLinkResourceProperties;
  /** Name of the private link resource that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of a private link resource. */
export interface ApplicationGatewayPrivateLinkResourceProperties {
  /** Group identifier of private link resource. */
  groupId?: string;
  /** Required member names of private link resource. */
  requiredMembers?: Array<string>;
  /** Required DNS zone names of the the private link resource. */
  requiredZoneNames?: Array<string>;
}

/** A web application firewall rule set. */
export interface ApplicationGatewayFirewallRuleSet extends Resource {
  /** Properties of the application gateway firewall rule set. */
  properties?: ApplicationGatewayFirewallRuleSetPropertiesFormat;
}

/** Properties of the web application firewall rule set. */
export interface ApplicationGatewayFirewallRuleSetPropertiesFormat {
  /** The provisioning state of the web application firewall rule set. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The type of the web application firewall rule set. */
  ruleSetType: string;
  /** The version of the web application firewall rule set type. */
  ruleSetVersion: string;
  /** The rule groups of the web application firewall rule set. */
  ruleGroups: Array<ApplicationGatewayFirewallRuleGroup>;
  /** Tier of an application gateway that support the rule set. */
  tiers?: Array<"Standard" | "WAF" | "Standard_v2" | "WAF_v2">;
}

/** A web application firewall rule group. */
export interface ApplicationGatewayFirewallRuleGroup {
  /** The name of the web application firewall rule group. */
  ruleGroupName: string;
  /** The description of the web application firewall rule group. */
  description?: string;
  /** The rules of the web application firewall rule group. */
  rules: Array<ApplicationGatewayFirewallRule>;
}

/** A web application firewall rule. */
export interface ApplicationGatewayFirewallRule {
  /** The identifier of the web application firewall rule. */
  ruleId: number;
  /** The string representation of the web application firewall rule identifier. */
  ruleIdString?: string;
  /** The string representation of the web application firewall rule state. */
  state?: "Enabled" | "Disabled";
  /** The string representation of the web application firewall rule action. */
  action?: "None" | "AnomalyScoring" | "Allow" | "Block" | "Log";
  /** The description of the web application firewall rule. */
  description?: string;
}

/** Response for ApplicationGatewayAvailableSslOptions API service call. */
export interface ApplicationGatewayAvailableSslOptions extends Resource {
  /** Properties of the application gateway available SSL options. */
  properties?: ApplicationGatewayAvailableSslOptionsPropertiesFormat;
}

/** Properties of ApplicationGatewayAvailableSslOptions. */
export interface ApplicationGatewayAvailableSslOptionsPropertiesFormat {
  /** List of available Ssl predefined policy. */
  predefinedPolicies?: Array<SubResource>;
  /** Name of the Ssl predefined policy applied by default to application gateway. */
  defaultPolicy?:
    | "AppGwSslPolicy20150501"
    | "AppGwSslPolicy20170401"
    | "AppGwSslPolicy20170401S"
    | "AppGwSslPolicy20220101"
    | "AppGwSslPolicy20220101S";
  /** List of available Ssl cipher suites. */
  availableCipherSuites?: Array<
    | "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384"
    | "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256"
    | "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA"
    | "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA"
    | "TLS_DHE_RSA_WITH_AES_256_GCM_SHA384"
    | "TLS_DHE_RSA_WITH_AES_128_GCM_SHA256"
    | "TLS_DHE_RSA_WITH_AES_256_CBC_SHA"
    | "TLS_DHE_RSA_WITH_AES_128_CBC_SHA"
    | "TLS_RSA_WITH_AES_256_GCM_SHA384"
    | "TLS_RSA_WITH_AES_128_GCM_SHA256"
    | "TLS_RSA_WITH_AES_256_CBC_SHA256"
    | "TLS_RSA_WITH_AES_128_CBC_SHA256"
    | "TLS_RSA_WITH_AES_256_CBC_SHA"
    | "TLS_RSA_WITH_AES_128_CBC_SHA"
    | "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384"
    | "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256"
    | "TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384"
    | "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256"
    | "TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA"
    | "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA"
    | "TLS_DHE_DSS_WITH_AES_256_CBC_SHA256"
    | "TLS_DHE_DSS_WITH_AES_128_CBC_SHA256"
    | "TLS_DHE_DSS_WITH_AES_256_CBC_SHA"
    | "TLS_DHE_DSS_WITH_AES_128_CBC_SHA"
    | "TLS_RSA_WITH_3DES_EDE_CBC_SHA"
    | "TLS_DHE_DSS_WITH_3DES_EDE_CBC_SHA"
    | "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
    | "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
  >;
  /** List of available Ssl protocols. */
  availableProtocols?: Array<"TLSv1_0" | "TLSv1_1" | "TLSv1_2" | "TLSv1_3">;
}

/** An Ssl predefined policy. */
export interface ApplicationGatewaySslPredefinedPolicy extends SubResource {
  /** Name of the Ssl predefined policy. */
  name?: string;
  /** Properties of the application gateway SSL predefined policy. */
  properties?: ApplicationGatewaySslPredefinedPolicyPropertiesFormat;
}

/** Properties of ApplicationGatewaySslPredefinedPolicy. */
export interface ApplicationGatewaySslPredefinedPolicyPropertiesFormat {
  /** Ssl cipher suites to be enabled in the specified order for application gateway. */
  cipherSuites?: Array<
    | "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384"
    | "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256"
    | "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA"
    | "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA"
    | "TLS_DHE_RSA_WITH_AES_256_GCM_SHA384"
    | "TLS_DHE_RSA_WITH_AES_128_GCM_SHA256"
    | "TLS_DHE_RSA_WITH_AES_256_CBC_SHA"
    | "TLS_DHE_RSA_WITH_AES_128_CBC_SHA"
    | "TLS_RSA_WITH_AES_256_GCM_SHA384"
    | "TLS_RSA_WITH_AES_128_GCM_SHA256"
    | "TLS_RSA_WITH_AES_256_CBC_SHA256"
    | "TLS_RSA_WITH_AES_128_CBC_SHA256"
    | "TLS_RSA_WITH_AES_256_CBC_SHA"
    | "TLS_RSA_WITH_AES_128_CBC_SHA"
    | "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384"
    | "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256"
    | "TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384"
    | "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256"
    | "TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA"
    | "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA"
    | "TLS_DHE_DSS_WITH_AES_256_CBC_SHA256"
    | "TLS_DHE_DSS_WITH_AES_128_CBC_SHA256"
    | "TLS_DHE_DSS_WITH_AES_256_CBC_SHA"
    | "TLS_DHE_DSS_WITH_AES_128_CBC_SHA"
    | "TLS_RSA_WITH_3DES_EDE_CBC_SHA"
    | "TLS_DHE_DSS_WITH_3DES_EDE_CBC_SHA"
    | "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
    | "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
  >;
  /** Minimum version of Ssl protocol to be supported on application gateway. */
  minProtocolVersion?: "TLSv1_0" | "TLSv1_1" | "TLSv1_2" | "TLSv1_3";
}

/** Azure Firewall resource. */
export interface AzureFirewall extends Resource {
  /** Properties of the azure firewall. */
  properties?: AzureFirewallPropertiesFormat;
  /** A list of availability zones denoting where the resource needs to come from. */
  zones?: Array<string>;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of the Azure Firewall. */
export interface AzureFirewallPropertiesFormat {
  /** Collection of application rule collections used by Azure Firewall. */
  applicationRuleCollections?: Array<AzureFirewallApplicationRuleCollection>;
  /** Collection of NAT rule collections used by Azure Firewall. */
  natRuleCollections?: Array<AzureFirewallNatRuleCollection>;
  /** Collection of network rule collections used by Azure Firewall. */
  networkRuleCollections?: Array<AzureFirewallNetworkRuleCollection>;
  /** IP configuration of the Azure Firewall resource. */
  ipConfigurations?: Array<AzureFirewallIPConfiguration>;
  /** IP configuration of the Azure Firewall used for management traffic. */
  managementIpConfiguration?: AzureFirewallIPConfiguration;
  /** The provisioning state of the Azure firewall resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The operation mode for Threat Intelligence. */
  threatIntelMode?: "Alert" | "Deny" | "Off";
  /** The virtualHub to which the firewall belongs. */
  virtualHub?: SubResource;
  /** The firewallPolicy associated with this azure firewall. */
  firewallPolicy?: SubResource;
  /** IP addresses associated with AzureFirewall. */
  hubIPAddresses?: HubIPAddresses;
  /** IpGroups associated with AzureFirewall. */
  ipGroups?: Array<AzureFirewallIpGroups>;
  /** The Azure Firewall Resource SKU. */
  sku?: AzureFirewallSku;
  /** The additional properties used to further config this azure firewall. */
  additionalProperties?: Record<string, string>;
}

/** Application rule collection resource. */
export interface AzureFirewallApplicationRuleCollection extends SubResource {
  /** Properties of the azure firewall application rule collection. */
  properties?: AzureFirewallApplicationRuleCollectionPropertiesFormat;
  /** The name of the resource that is unique within the Azure firewall. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of the application rule collection. */
export interface AzureFirewallApplicationRuleCollectionPropertiesFormat {
  /** Priority of the application rule collection resource. */
  priority?: number;
  /** The action type of a rule collection. */
  action?: AzureFirewallRCAction;
  /** Collection of rules used by a application rule collection. */
  rules?: Array<AzureFirewallApplicationRule>;
  /** The provisioning state of the application rule collection resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Properties of the AzureFirewallRCAction. */
export interface AzureFirewallRCAction {
  /** The type of action. */
  type?: "Allow" | "Deny";
}

/** Properties of an application rule. */
export interface AzureFirewallApplicationRule {
  /** Name of the application rule. */
  name?: string;
  /** Description of the rule. */
  description?: string;
  /** List of source IP addresses for this rule. */
  sourceAddresses?: Array<string>;
  /** Array of ApplicationRuleProtocols. */
  protocols?: Array<AzureFirewallApplicationRuleProtocol>;
  /** List of FQDNs for this rule. */
  targetFqdns?: Array<string>;
  /** List of FQDN Tags for this rule. */
  fqdnTags?: Array<string>;
  /** List of source IpGroups for this rule. */
  sourceIpGroups?: Array<string>;
}

/** Properties of the application rule protocol. */
export interface AzureFirewallApplicationRuleProtocol {
  /** Protocol type. */
  protocolType?: "Http" | "Https" | "Mssql";
  /** Port number for the protocol, cannot be greater than 64000. This field is optional. */
  port?: number;
}

/** NAT rule collection resource. */
export interface AzureFirewallNatRuleCollection extends SubResource {
  /** Properties of the azure firewall NAT rule collection. */
  properties?: AzureFirewallNatRuleCollectionProperties;
  /** The name of the resource that is unique within the Azure firewall. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of the NAT rule collection. */
export interface AzureFirewallNatRuleCollectionProperties {
  /** Priority of the NAT rule collection resource. */
  priority?: number;
  /** The action type of a NAT rule collection. */
  action?: AzureFirewallNatRCAction;
  /** Collection of rules used by a NAT rule collection. */
  rules?: Array<AzureFirewallNatRule>;
  /** The provisioning state of the NAT rule collection resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** AzureFirewall NAT Rule Collection Action. */
export interface AzureFirewallNatRCAction {
  /** The type of action. */
  type?: "Snat" | "Dnat";
}

/** Properties of a NAT rule. */
export interface AzureFirewallNatRule {
  /** Name of the NAT rule. */
  name?: string;
  /** Description of the rule. */
  description?: string;
  /** List of source IP addresses for this rule. */
  sourceAddresses?: Array<string>;
  /** List of destination IP addresses for this rule. Supports IP ranges, prefixes, and service tags. */
  destinationAddresses?: Array<string>;
  /** List of destination ports. */
  destinationPorts?: Array<string>;
  /** Array of AzureFirewallNetworkRuleProtocols applicable to this NAT rule. */
  protocols?: Array<"TCP" | "UDP" | "Any" | "ICMP">;
  /** The translated address for this NAT rule. */
  translatedAddress?: string;
  /** The translated port for this NAT rule. */
  translatedPort?: string;
  /** The translated FQDN for this NAT rule. */
  translatedFqdn?: string;
  /** List of source IpGroups for this rule. */
  sourceIpGroups?: Array<string>;
}

/** Network rule collection resource. */
export interface AzureFirewallNetworkRuleCollection extends SubResource {
  /** Properties of the azure firewall network rule collection. */
  properties?: AzureFirewallNetworkRuleCollectionPropertiesFormat;
  /** The name of the resource that is unique within the Azure firewall. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of the network rule collection. */
export interface AzureFirewallNetworkRuleCollectionPropertiesFormat {
  /** Priority of the network rule collection resource. */
  priority?: number;
  /** The action type of a rule collection. */
  action?: AzureFirewallRCAction;
  /** Collection of rules used by a network rule collection. */
  rules?: Array<AzureFirewallNetworkRule>;
  /** The provisioning state of the network rule collection resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Properties of the network rule. */
export interface AzureFirewallNetworkRule {
  /** Name of the network rule. */
  name?: string;
  /** Description of the rule. */
  description?: string;
  /** Array of AzureFirewallNetworkRuleProtocols. */
  protocols?: Array<"TCP" | "UDP" | "Any" | "ICMP">;
  /** List of source IP addresses for this rule. */
  sourceAddresses?: Array<string>;
  /** List of destination IP addresses. */
  destinationAddresses?: Array<string>;
  /** List of destination ports. */
  destinationPorts?: Array<string>;
  /** List of destination FQDNs. */
  destinationFqdns?: Array<string>;
  /** List of source IpGroups for this rule. */
  sourceIpGroups?: Array<string>;
  /** List of destination IpGroups for this rule. */
  destinationIpGroups?: Array<string>;
}

/** IP configuration of an Azure Firewall. */
export interface AzureFirewallIPConfiguration extends SubResource {
  /** Properties of the azure firewall IP configuration. */
  properties?: AzureFirewallIPConfigurationPropertiesFormat;
  /** Name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of IP configuration of an Azure Firewall. */
export interface AzureFirewallIPConfigurationPropertiesFormat {
  /** The Firewall Internal Load Balancer IP to be used as the next hop in User Defined Routes. */
  privateIPAddress?: string;
  /** Reference to the subnet resource. This resource must be named 'AzureFirewallSubnet' or 'AzureFirewallManagementSubnet'. */
  subnet?: SubResource;
  /** Reference to the PublicIP resource. This field is a mandatory input if subnet is not null. */
  publicIPAddress?: SubResource;
  /** The provisioning state of the Azure firewall IP configuration resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** IP addresses associated with azure firewall. */
export interface HubIPAddresses {
  /** Public IP addresses associated with azure firewall. */
  publicIPs?: HubPublicIPAddresses;
  /** Private IP Address associated with azure firewall. */
  privateIPAddress?: string;
}

/** Public IP addresses associated with azure firewall. */
export interface HubPublicIPAddresses {
  /** The list of Public IP addresses associated with azure firewall or IP addresses to be retained. */
  addresses?: Array<AzureFirewallPublicIPAddress>;
  /** The number of Public IP addresses associated with azure firewall. */
  count?: number;
}

/** Public IP Address associated with azure firewall. */
export interface AzureFirewallPublicIPAddress {
  /** Public IP Address value. */
  address?: string;
}

/** IpGroups associated with azure firewall. */
export interface AzureFirewallIpGroups {
  /** Resource ID. */
  id?: string;
  /** The iteration number. */
  changeNumber?: string;
}

/** SKU of an Azure Firewall. */
export interface AzureFirewallSku {
  /** Name of an Azure Firewall SKU. */
  name?: "AZFW_VNet" | "AZFW_Hub";
  /** Tier of an Azure Firewall. */
  tier?: "Standard" | "Premium" | "Basic";
}

/** Azure Firewall FQDN Tag Resource. */
export interface AzureFirewallFqdnTag extends Resource {
  /** Properties of the azure firewall FQDN tag. */
  properties?: AzureFirewallFqdnTagPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Azure Firewall FQDN Tag Properties. */
export interface AzureFirewallFqdnTagPropertiesFormat {
  /** The provisioning state of the Azure firewall FQDN tag resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The name of this FQDN Tag. */
  fqdnTagName?: string;
}

/** Bastion Host resource. */
export interface BastionHost extends Resource {
  /** Represents the bastion host resource. */
  properties?: BastionHostPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** The sku of this Bastion Host. */
  sku?: Sku;
}

/** Properties of the Bastion Host. */
export interface BastionHostPropertiesFormat {
  /** IP configuration of the Bastion Host resource. */
  ipConfigurations?: Array<BastionHostIPConfiguration>;
  /** FQDN for the endpoint on which bastion host is accessible. */
  dnsName?: string;
  /** The provisioning state of the bastion host resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The scale units for the Bastion Host resource. */
  scaleUnits?: number;
  /** Enable/Disable Copy/Paste feature of the Bastion Host resource. */
  disableCopyPaste?: boolean;
  /** Enable/Disable File Copy feature of the Bastion Host resource. */
  enableFileCopy?: boolean;
  /** Enable/Disable IP Connect feature of the Bastion Host resource. */
  enableIpConnect?: boolean;
  /** Enable/Disable Shareable Link of the Bastion Host resource. */
  enableShareableLink?: boolean;
  /** Enable/Disable Tunneling feature of the Bastion Host resource. */
  enableTunneling?: boolean;
}

/** IP configuration of an Bastion Host. */
export interface BastionHostIPConfiguration extends SubResource {
  /** Represents the ip configuration associated with the resource. */
  properties?: BastionHostIPConfigurationPropertiesFormat;
  /** Name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Ip configuration type. */
  type?: string;
}

/** Properties of IP configuration of an Bastion Host. */
export interface BastionHostIPConfigurationPropertiesFormat {
  /** Reference of the subnet resource. */
  subnet: SubResource;
  /** Reference of the PublicIP resource. */
  publicIPAddress: SubResource;
  /** The provisioning state of the bastion host IP configuration resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Private IP allocation method. */
  privateIPAllocationMethod?: "Static" | "Dynamic";
}

/** The sku of this Bastion Host. */
export interface Sku {
  /** The name of this Bastion Host. */
  name?: "Basic" | "Standard";
}

/** Post request for all the Bastion Shareable Link endpoints. */
export interface BastionShareableLinkListRequest {
  /** List of VM references. */
  vms?: Array<BastionShareableLink>;
}

/** Bastion Shareable Link. */
export interface BastionShareableLink {
  /** Reference of the virtual machine resource. */
  vm: Vm;
  /** The unique Bastion Shareable Link to the virtual machine. */
  bsl?: string;
  /** The time when the link was created. */
  createdAt?: string;
  /** Optional field indicating the warning or error message related to the vm in case of partial failure. */
  message?: string;
}

/** Describes a Virtual Machine. */
export interface Vm extends Resource {}

/** List of session IDs. */
export interface SessionIds {
  /** List of session IDs. */
  sessionIds?: Array<string>;
}

/** Custom IP prefix resource. */
export interface CustomIpPrefix extends Resource {
  /** The extended location of the custom IP prefix. */
  extendedLocation?: ExtendedLocation;
  /** Custom IP prefix properties. */
  properties?: CustomIpPrefixPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** A list of availability zones denoting the IP allocated for the resource needs to come from. */
  zones?: Array<string>;
}

/** Custom IP prefix properties. */
export interface CustomIpPrefixPropertiesFormat {
  /** The ASN for CIDR advertising. Should be an integer as string. */
  asn?: string;
  /** The prefix range in CIDR notation. Should include the start address and the prefix length. */
  cidr?: string;
  /** Signed message for WAN validation. */
  signedMessage?: string;
  /** Authorization message for WAN validation. */
  authorizationMessage?: string;
  /** The Parent CustomIpPrefix for IPv6 /64 CustomIpPrefix. */
  customIpPrefixParent?: SubResource;
  /** The list of all Children for IPv6 /48 CustomIpPrefix. */
  childCustomIpPrefixes?: Array<SubResource>;
  /** The commissioned state of the Custom IP Prefix. */
  commissionedState?:
    | "Provisioning"
    | "Provisioned"
    | "Commissioning"
    | "CommissionedNoInternetAdvertise"
    | "Commissioned"
    | "Decommissioning"
    | "Deprovisioning"
    | "Deprovisioned";
  /** Whether to do express route advertise. */
  expressRouteAdvertise?: boolean;
  /** The Geo for CIDR advertising. Should be an Geo code. */
  geo?: "GLOBAL" | "AFRI" | "APAC" | "EURO" | "LATAM" | "NAM" | "ME" | "OCEANIA" | "AQ";
  /** Whether to Advertise the range to Internet. */
  noInternetAdvertise?: boolean;
  /** Type of custom IP prefix. Should be Singular, Parent, or Child. */
  prefixType?: "Singular" | "Parent" | "Child";
  /** The list of all referenced PublicIpPrefixes. */
  publicIpPrefixes?: Array<SubResource>;
  /** The resource GUID property of the custom IP prefix resource. */
  resourceGuid?: string;
  /** The reason why resource is in failed state. */
  failedReason?: string;
  /** The provisioning state of the custom IP prefix resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** A DDoS custom policy in a resource group. */
export interface DdosCustomPolicy extends Resource {
  /** Properties of the DDoS custom policy. */
  properties?: DdosCustomPolicyPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** DDoS custom policy properties. */
export interface DdosCustomPolicyPropertiesFormat {
  /** The resource GUID property of the DDoS custom policy resource. It uniquely identifies the resource, even if the user changes its name or migrate the resource across subscriptions or resource groups. */
  resourceGuid?: string;
  /** The provisioning state of the DDoS custom policy resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** A DDoS protection plan in a resource group. */
export interface DdosProtectionPlan {
  /** Resource ID. */
  id?: string;
  /** Resource name. */
  name?: string;
  /** Resource type. */
  type?: string;
  /** Resource location. */
  location?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Properties of the DDoS protection plan. */
  properties?: DdosProtectionPlanPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** DDoS protection plan properties. */
export interface DdosProtectionPlanPropertiesFormat {
  /** The resource GUID property of the DDoS protection plan resource. It uniquely identifies the resource, even if the user changes its name or migrate the resource across subscriptions or resource groups. */
  resourceGuid?: string;
  /** The provisioning state of the DDoS protection plan resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The list of public IPs associated with the DDoS protection plan resource. This list is read-only. */
  publicIpAddresses?: Array<SubResource>;
  /** The list of virtual networks associated with the DDoS protection plan resource. This list is read-only. */
  virtualNetworks?: Array<SubResource>;
}

/** Differentiated Services Code Point configuration for any given network interface */
export interface DscpConfiguration extends Resource {
  /** Properties of the network interface. */
  properties?: DscpConfigurationPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Differentiated Services Code Point configuration properties. */
export interface DscpConfigurationPropertiesFormat {
  /** List of markings to be used in the configuration. */
  markings?: Array<number>;
  /** Source IP ranges. */
  sourceIpRanges?: Array<QosIpRange>;
  /** Destination IP ranges. */
  destinationIpRanges?: Array<QosIpRange>;
  /** Sources port ranges. */
  sourcePortRanges?: Array<QosPortRange>;
  /** Destination port ranges. */
  destinationPortRanges?: Array<QosPortRange>;
  /** RNM supported protocol types. */
  protocol?: "DoNotUse" | "Icmp" | "Tcp" | "Udp" | "Gre" | "Esp" | "Ah" | "Vxlan" | "All";
  /** QoS object definitions */
  qosDefinitionCollection?: Array<QosDefinition>;
  /** Qos Collection ID generated by RNM. */
  qosCollectionId?: string;
  /** Associated Network Interfaces to the DSCP Configuration. */
  associatedNetworkInterfaces?: Array<NetworkInterface>;
  /** The resource GUID property of the DSCP Configuration resource. */
  resourceGuid?: string;
  /** The provisioning state of the DSCP Configuration resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Qos Traffic Profiler IP Range properties. */
export interface QosIpRange {
  /** Start IP Address. */
  startIP?: string;
  /** End IP Address. */
  endIP?: string;
}

/** Qos Traffic Profiler Port range properties. */
export interface QosPortRange {
  /** Qos Port Range start. */
  start?: number;
  /** Qos Port Range end. */
  end?: number;
}

/** Quality of Service defines the traffic configuration between endpoints. Mandatory to have one marking. */
export interface QosDefinition {
  /** List of markings to be used in the configuration. */
  markings?: Array<number>;
  /** Source IP ranges. */
  sourceIpRanges?: Array<QosIpRange>;
  /** Destination IP ranges. */
  destinationIpRanges?: Array<QosIpRange>;
  /** Sources port ranges. */
  sourcePortRanges?: Array<QosPortRange>;
  /** Destination port ranges. */
  destinationPortRanges?: Array<QosPortRange>;
  /** RNM supported protocol types. */
  protocol?: "DoNotUse" | "Icmp" | "Tcp" | "Udp" | "Gre" | "Esp" | "Ah" | "Vxlan" | "All";
}

/** Endpoint service. */
export interface EndpointServiceResult extends SubResource {
  /** Name of the endpoint service. */
  name?: string;
  /** Type of the endpoint service. */
  type?: string;
}

/** Authorization in an ExpressRouteCircuit resource. */
export interface ExpressRouteCircuitAuthorization extends SubResource {
  /** Properties of the express route circuit authorization. */
  properties?: AuthorizationPropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of ExpressRouteCircuitAuthorization. */
export interface AuthorizationPropertiesFormat {
  /** The authorization key. */
  authorizationKey?: string;
  /** The authorization use status. */
  authorizationUseStatus?: "Available" | "InUse";
  /** The provisioning state of the authorization resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Peering in an ExpressRouteCircuit resource. */
export interface ExpressRouteCircuitPeering extends SubResource {
  /** Properties of the express route circuit peering. */
  properties?: ExpressRouteCircuitPeeringPropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of the express route circuit peering. */
export interface ExpressRouteCircuitPeeringPropertiesFormat {
  /** The peering type. */
  peeringType?: "AzurePublicPeering" | "AzurePrivatePeering" | "MicrosoftPeering";
  /** The peering state. */
  state?: "Disabled" | "Enabled";
  /** The Azure ASN. */
  azureASN?: number;
  /** The peer ASN. */
  peerASN?: number;
  /** The primary address prefix. */
  primaryPeerAddressPrefix?: string;
  /** The secondary address prefix. */
  secondaryPeerAddressPrefix?: string;
  /** The primary port. */
  primaryAzurePort?: string;
  /** The secondary port. */
  secondaryAzurePort?: string;
  /** The shared key. */
  sharedKey?: string;
  /** The VLAN ID. */
  vlanId?: number;
  /** The Microsoft peering configuration. */
  microsoftPeeringConfig?: ExpressRouteCircuitPeeringConfig;
  /** The peering stats of express route circuit. */
  stats?: ExpressRouteCircuitStats;
  /** The provisioning state of the express route circuit peering resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The GatewayManager Etag. */
  gatewayManagerEtag?: string;
  /** Who was the last to modify the peering. */
  lastModifiedBy?: string;
  /** The reference to the RouteFilter resource. */
  routeFilter?: SubResource;
  /** The IPv6 peering configuration. */
  ipv6PeeringConfig?: Ipv6ExpressRouteCircuitPeeringConfig;
  /** The ExpressRoute connection. */
  expressRouteConnection?: ExpressRouteConnectionId;
  /** The list of circuit connections associated with Azure Private Peering for this circuit. */
  connections?: Array<ExpressRouteCircuitConnection>;
  /** The list of peered circuit connections associated with Azure Private Peering for this circuit. */
  peeredConnections?: Array<PeerExpressRouteCircuitConnection>;
}

/** Specifies the peering configuration. */
export interface ExpressRouteCircuitPeeringConfig {
  /** The reference to AdvertisedPublicPrefixes. */
  advertisedPublicPrefixes?: Array<string>;
  /** The communities of bgp peering. Specified for microsoft peering. */
  advertisedCommunities?: Array<string>;
  /** The advertised public prefix state of the Peering resource. */
  advertisedPublicPrefixesState?:
    | "NotConfigured"
    | "Configuring"
    | "Configured"
    | "ValidationNeeded";
  /** The legacy mode of the peering. */
  legacyMode?: number;
  /** The CustomerASN of the peering. */
  customerASN?: number;
  /** The RoutingRegistryName of the configuration. */
  routingRegistryName?: string;
}

/** Contains stats associated with the peering. */
export interface ExpressRouteCircuitStats {
  /** The Primary BytesIn of the peering. */
  primarybytesIn?: number;
  /** The primary BytesOut of the peering. */
  primarybytesOut?: number;
  /** The secondary BytesIn of the peering. */
  secondarybytesIn?: number;
  /** The secondary BytesOut of the peering. */
  secondarybytesOut?: number;
}

/** Contains IPv6 peering config. */
export interface Ipv6ExpressRouteCircuitPeeringConfig {
  /** The primary address prefix. */
  primaryPeerAddressPrefix?: string;
  /** The secondary address prefix. */
  secondaryPeerAddressPrefix?: string;
  /** The Microsoft peering configuration. */
  microsoftPeeringConfig?: ExpressRouteCircuitPeeringConfig;
  /** The reference to the RouteFilter resource. */
  routeFilter?: SubResource;
  /** The state of peering. */
  state?: "Disabled" | "Enabled";
}

/** The ID of the ExpressRouteConnection. */
export interface ExpressRouteConnectionId {
  /** The ID of the ExpressRouteConnection. */
  id?: string;
}

/** Express Route Circuit Connection in an ExpressRouteCircuitPeering resource. */
export interface ExpressRouteCircuitConnection extends SubResource {
  /** Properties of the express route circuit connection. */
  properties?: ExpressRouteCircuitConnectionPropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of the express route circuit connection. */
export interface ExpressRouteCircuitConnectionPropertiesFormat {
  /** Reference to Express Route Circuit Private Peering Resource of the circuit initiating connection. */
  expressRouteCircuitPeering?: SubResource;
  /** Reference to Express Route Circuit Private Peering Resource of the peered circuit. */
  peerExpressRouteCircuitPeering?: SubResource;
  /** /29 IP address space to carve out Customer addresses for tunnels. */
  addressPrefix?: string;
  /** The authorization key. */
  authorizationKey?: string;
  /** IPv6 Address PrefixProperties of the express route circuit connection. */
  ipv6CircuitConnectionConfig?: Ipv6CircuitConnectionConfig;
  /** Express Route Circuit connection state. */
  circuitConnectionStatus?: "Connected" | "Connecting" | "Disconnected";
  /** The provisioning state of the express route circuit connection resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** IPv6 Circuit Connection properties for global reach. */
export interface Ipv6CircuitConnectionConfig {
  /** /125 IP address space to carve out customer addresses for global reach. */
  addressPrefix?: string;
  /** Express Route Circuit connection state. */
  circuitConnectionStatus?: "Connected" | "Connecting" | "Disconnected";
}

/** Peer Express Route Circuit Connection in an ExpressRouteCircuitPeering resource. */
export interface PeerExpressRouteCircuitConnection extends SubResource {
  /** Properties of the peer express route circuit connection. */
  properties?: PeerExpressRouteCircuitConnectionPropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of the peer express route circuit connection. */
export interface PeerExpressRouteCircuitConnectionPropertiesFormat {
  /** Reference to Express Route Circuit Private Peering Resource of the circuit. */
  expressRouteCircuitPeering?: SubResource;
  /** Reference to Express Route Circuit Private Peering Resource of the peered circuit. */
  peerExpressRouteCircuitPeering?: SubResource;
  /** /29 IP address space to carve out Customer addresses for tunnels. */
  addressPrefix?: string;
  /** Express Route Circuit connection state. */
  circuitConnectionStatus?: "Connected" | "Connecting" | "Disconnected";
  /** The name of the express route circuit connection resource. */
  connectionName?: string;
  /** The resource guid of the authorization used for the express route circuit connection. */
  authResourceGuid?: string;
  /** The provisioning state of the peer express route circuit connection resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** ExpressRouteCircuit resource. */
export interface ExpressRouteCircuit extends Resource {
  /** The SKU. */
  sku?: ExpressRouteCircuitSku;
  /** Properties of the express route circuit. */
  properties?: ExpressRouteCircuitPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Contains SKU in an ExpressRouteCircuit. */
export interface ExpressRouteCircuitSku {
  /** The name of the SKU. */
  name?: string;
  /** The tier of the SKU. */
  tier?: "Standard" | "Premium" | "Basic" | "Local";
  /** The family of the SKU. */
  family?: "UnlimitedData" | "MeteredData";
}

/** Properties of ExpressRouteCircuit. */
export interface ExpressRouteCircuitPropertiesFormat {
  /** Allow classic operations. */
  allowClassicOperations?: boolean;
  /** The CircuitProvisioningState state of the resource. */
  circuitProvisioningState?: string;
  /** The ServiceProviderProvisioningState state of the resource. */
  serviceProviderProvisioningState?:
    | "NotProvisioned"
    | "Provisioning"
    | "Provisioned"
    | "Deprovisioning";
  /** The list of authorizations. */
  authorizations?: Array<ExpressRouteCircuitAuthorization>;
  /** The list of peerings. */
  peerings?: Array<ExpressRouteCircuitPeering>;
  /** The ServiceKey. */
  serviceKey?: string;
  /** The ServiceProviderNotes. */
  serviceProviderNotes?: string;
  /** The ServiceProviderProperties. */
  serviceProviderProperties?: ExpressRouteCircuitServiceProviderProperties;
  /** The reference to the ExpressRoutePort resource when the circuit is provisioned on an ExpressRoutePort resource. */
  expressRoutePort?: SubResource;
  /** The bandwidth of the circuit when the circuit is provisioned on an ExpressRoutePort resource. */
  bandwidthInGbps?: number;
  /** The identifier of the circuit traffic. Outer tag for QinQ encapsulation. */
  stag?: number;
  /** The provisioning state of the express route circuit resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The GatewayManager Etag. */
  gatewayManagerEtag?: string;
  /** Flag denoting global reach status. */
  globalReachEnabled?: boolean;
  /** The authorizationKey. */
  authorizationKey?: string;
}

/** Contains ServiceProviderProperties in an ExpressRouteCircuit. */
export interface ExpressRouteCircuitServiceProviderProperties {
  /** The serviceProviderName. */
  serviceProviderName?: string;
  /** The peering location. */
  peeringLocation?: string;
  /** The BandwidthInMbps. */
  bandwidthInMbps?: number;
}

/** A ExpressRouteResourceProvider object. */
export interface ExpressRouteServiceProvider extends Resource {
  /** Properties of the express route service provider. */
  properties?: ExpressRouteServiceProviderPropertiesFormat;
}

/** Properties of ExpressRouteServiceProvider. */
export interface ExpressRouteServiceProviderPropertiesFormat {
  /** A list of peering locations. */
  peeringLocations?: Array<string>;
  /** A list of bandwidths offered. */
  bandwidthsOffered?: Array<ExpressRouteServiceProviderBandwidthsOffered>;
  /** The provisioning state of the express route service provider resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Contains bandwidths offered in ExpressRouteServiceProvider resources. */
export interface ExpressRouteServiceProviderBandwidthsOffered {
  /** The OfferName. */
  offerName?: string;
  /** The ValueInMbps. */
  valueInMbps?: number;
}

/** ExpressRouteCrossConnection resource. */
export interface ExpressRouteCrossConnection extends Resource {
  /** Properties of the express route cross connection. */
  properties?: ExpressRouteCrossConnectionProperties;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of ExpressRouteCrossConnection. */
export interface ExpressRouteCrossConnectionProperties {
  /** The name of the primary port. */
  primaryAzurePort?: string;
  /** The name of the secondary port. */
  secondaryAzurePort?: string;
  /** The identifier of the circuit traffic. */
  sTag?: number;
  /** The peering location of the ExpressRoute circuit. */
  peeringLocation?: string;
  /** The circuit bandwidth In Mbps. */
  bandwidthInMbps?: number;
  /** The ExpressRouteCircuit. */
  expressRouteCircuit?: ExpressRouteCircuitReference;
  /** The provisioning state of the circuit in the connectivity provider system. */
  serviceProviderProvisioningState?:
    | "NotProvisioned"
    | "Provisioning"
    | "Provisioned"
    | "Deprovisioning";
  /** Additional read only notes set by the connectivity provider. */
  serviceProviderNotes?: string;
  /** The provisioning state of the express route cross connection resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The list of peerings. */
  peerings?: Array<ExpressRouteCrossConnectionPeering>;
}

/** Reference to an express route circuit. */
export interface ExpressRouteCircuitReference {
  /** Corresponding Express Route Circuit Id. */
  id?: string;
}

/** Peering in an ExpressRoute Cross Connection resource. */
export interface ExpressRouteCrossConnectionPeering extends SubResource {
  /** Properties of the express route cross connection peering. */
  properties?: ExpressRouteCrossConnectionPeeringProperties;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of express route cross connection peering. */
export interface ExpressRouteCrossConnectionPeeringProperties {
  /** The peering type. */
  peeringType?: "AzurePublicPeering" | "AzurePrivatePeering" | "MicrosoftPeering";
  /** The peering state. */
  state?: "Disabled" | "Enabled";
  /** The Azure ASN. */
  azureASN?: number;
  /** The peer ASN. */
  peerASN?: number;
  /** The primary address prefix. */
  primaryPeerAddressPrefix?: string;
  /** The secondary address prefix. */
  secondaryPeerAddressPrefix?: string;
  /** The primary port. */
  primaryAzurePort?: string;
  /** The secondary port. */
  secondaryAzurePort?: string;
  /** The shared key. */
  sharedKey?: string;
  /** The VLAN ID. */
  vlanId?: number;
  /** The Microsoft peering configuration. */
  microsoftPeeringConfig?: ExpressRouteCircuitPeeringConfig;
  /** The provisioning state of the express route cross connection peering resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The GatewayManager Etag. */
  gatewayManagerEtag?: string;
  /** Who was the last to modify the peering. */
  lastModifiedBy?: string;
  /** The IPv6 peering configuration. */
  ipv6PeeringConfig?: Ipv6ExpressRouteCircuitPeeringConfig;
}

/** Definition of the ExpressRoutePorts peering location resource. */
export interface ExpressRoutePortsLocation extends Resource {
  /** ExpressRoutePort peering location properties. */
  properties?: ExpressRoutePortsLocationPropertiesFormat;
}

/** Properties specific to ExpressRoutePorts peering location resources. */
export interface ExpressRoutePortsLocationPropertiesFormat {
  /** Address of peering location. */
  address?: string;
  /** Contact details of peering locations. */
  contact?: string;
  /** The inventory of available ExpressRoutePort bandwidths. */
  availableBandwidths?: Array<ExpressRoutePortsLocationBandwidths>;
  /** The provisioning state of the express route port location resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Real-time inventory of available ExpressRoute port bandwidths. */
export interface ExpressRoutePortsLocationBandwidths {
  /** Bandwidth descriptive name. */
  offerName?: string;
  /** Bandwidth value in Gbps. */
  valueInGbps?: number;
}

/** ExpressRoutePort resource definition. */
export interface ExpressRoutePort extends Resource {
  /** ExpressRoutePort properties. */
  properties?: ExpressRoutePortPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** The identity of ExpressRoutePort, if configured. */
  identity?: ManagedServiceIdentity;
}

/** Properties specific to ExpressRoutePort resources. */
export interface ExpressRoutePortPropertiesFormat {
  /** The name of the peering location that the ExpressRoutePort is mapped to physically. */
  peeringLocation?: string;
  /** Bandwidth of procured ports in Gbps. */
  bandwidthInGbps?: number;
  /** Aggregate Gbps of associated circuit bandwidths. */
  provisionedBandwidthInGbps?: number;
  /** Maximum transmission unit of the physical port pair(s). */
  mtu?: string;
  /** Encapsulation method on physical ports. */
  encapsulation?: "Dot1Q" | "QinQ";
  /** Ether type of the physical port. */
  etherType?: string;
  /** Date of the physical port allocation to be used in Letter of Authorization. */
  allocationDate?: string;
  /** The set of physical links of the ExpressRoutePort resource. */
  links?: Array<ExpressRouteLink>;
  /** Reference the ExpressRoute circuit(s) that are provisioned on this ExpressRoutePort resource. */
  circuits?: Array<SubResource>;
  /** The provisioning state of the express route port resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The resource GUID property of the express route port resource. */
  resourceGuid?: string;
  /** The billing type of the ExpressRoutePort resource. */
  billingType?: "MeteredData" | "UnlimitedData";
}

/** ExpressRouteLink child resource definition. */
export interface ExpressRouteLink extends SubResource {
  /** ExpressRouteLink properties. */
  properties?: ExpressRouteLinkPropertiesFormat;
  /** Name of child port resource that is unique among child port resources of the parent. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties specific to ExpressRouteLink resources. */
export interface ExpressRouteLinkPropertiesFormat {
  /** Name of Azure router associated with physical port. */
  routerName?: string;
  /** Name of Azure router interface. */
  interfaceName?: string;
  /** Mapping between physical port to patch panel port. */
  patchPanelId?: string;
  /** Mapping of physical patch panel to rack. */
  rackId?: string;
  /** Cololocation for ExpressRoute Hybrid Direct. */
  coloLocation?: string;
  /** Physical fiber port type. */
  connectorType?: "LC" | "SC";
  /** Administrative state of the physical port. */
  adminState?: "Enabled" | "Disabled";
  /** The provisioning state of the express route link resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** MacSec configuration. */
  macSecConfig?: ExpressRouteLinkMacSecConfig;
}

/** ExpressRouteLink Mac Security Configuration. */
export interface ExpressRouteLinkMacSecConfig {
  /** Keyvault Secret Identifier URL containing Mac security CKN key. */
  cknSecretIdentifier?: string;
  /** Keyvault Secret Identifier URL containing Mac security CAK key. */
  cakSecretIdentifier?: string;
  /** Mac security cipher. */
  cipher?: "GcmAes256" | "GcmAes128" | "GcmAesXpn128" | "GcmAesXpn256";
  /** Sci mode enabled/disabled. */
  sciState?: "Disabled" | "Enabled";
}

/** The customer name to be printed on a letter of authorization. */
export interface GenerateExpressRoutePortsLOARequest {
  /** The customer name. */
  customerName: string;
}

/** ExpressRoutePort Authorization resource definition. */
export interface ExpressRoutePortAuthorization extends SubResource {
  /** ExpressRoutePort properties. */
  properties?: ExpressRoutePortAuthorizationPropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of ExpressRoutePort Authorization. */
export interface ExpressRoutePortAuthorizationPropertiesFormat {
  /** The authorization key. */
  authorizationKey?: string;
  /** The authorization use status. */
  authorizationUseStatus?: "Available" | "InUse";
  /** The reference to the ExpressRoute circuit resource using the authorization. */
  circuitResourceUri?: string;
  /** The provisioning state of the authorization resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** ExpressRouteProviderPort resource. */
export interface ExpressRouteProviderPort extends Resource {
  /** Properties of the express route Service Provider Port. */
  properties?: ExpressRouteProviderPortProperties;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of ExpressRouteProviderPort. */
export interface ExpressRouteProviderPortProperties {
  /** The name of the port pair. */
  portPairDescriptor?: string;
  /** The name of the primary port. */
  primaryAzurePort?: string;
  /** The name of the secondary port. */
  secondaryAzurePort?: string;
  /** The peering location of the port pair. */
  peeringLocation?: string;
  /** Overprovisioning factor for the port pair. */
  overprovisionFactor?: number;
  /** Bandwidth of the port in Mbps */
  portBandwidthInMbps?: number;
  /** Used Bandwidth of the port in Mbps */
  usedBandwidthInMbps?: number;
  /** Remaining Bandwidth of the port in Mbps */
  remainingBandwidthInMbps?: number;
}

/** FirewallPolicy Resource. */
export interface FirewallPolicy extends Resource {
  /** Properties of the firewall policy. */
  properties?: FirewallPolicyPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** The identity of the firewall policy. */
  identity?: ManagedServiceIdentity;
}

/** Firewall Policy definition. */
export interface FirewallPolicyPropertiesFormat {
  /** List of references to FirewallPolicyRuleCollectionGroups. */
  ruleCollectionGroups?: Array<SubResource>;
  /** The provisioning state of the firewall policy resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The parent firewall policy from which rules are inherited. */
  basePolicy?: SubResource;
  /** List of references to Azure Firewalls that this Firewall Policy is associated with. */
  firewalls?: Array<SubResource>;
  /** List of references to Child Firewall Policies. */
  childPolicies?: Array<SubResource>;
  /** The operation mode for Threat Intelligence. */
  threatIntelMode?: "Alert" | "Deny" | "Off";
  /** ThreatIntel Whitelist for Firewall Policy. */
  threatIntelWhitelist?: FirewallPolicyThreatIntelWhitelist;
  /** Insights on Firewall Policy. */
  insights?: FirewallPolicyInsights;
  /** The private IP addresses/IP ranges to which traffic will not be SNAT. */
  snat?: FirewallPolicySnat;
  /** SQL Settings definition. */
  sql?: FirewallPolicySQL;
  /** DNS Proxy Settings definition. */
  dnsSettings?: DnsSettings;
  /** Explicit Proxy Settings definition. */
  explicitProxy?: ExplicitProxy;
  /** The configuration for Intrusion detection. */
  intrusionDetection?: FirewallPolicyIntrusionDetection;
  /** TLS Configuration definition. */
  transportSecurity?: FirewallPolicyTransportSecurity;
  /** The Firewall Policy SKU. */
  sku?: FirewallPolicySku;
}

/** ThreatIntel Whitelist for Firewall Policy. */
export interface FirewallPolicyThreatIntelWhitelist {
  /** List of IP addresses for the ThreatIntel Whitelist. */
  ipAddresses?: Array<string>;
  /** List of FQDNs for the ThreatIntel Whitelist. */
  fqdns?: Array<string>;
}

/** Firewall Policy Insights. */
export interface FirewallPolicyInsights {
  /** A flag to indicate if the insights are enabled on the policy. */
  isEnabled?: boolean;
  /** Number of days the insights should be enabled on the policy. */
  retentionDays?: number;
  /** Workspaces needed to configure the Firewall Policy Insights. */
  logAnalyticsResources?: FirewallPolicyLogAnalyticsResources;
}

/** Log Analytics Resources for Firewall Policy Insights. */
export interface FirewallPolicyLogAnalyticsResources {
  /** List of workspaces for Firewall Policy Insights. */
  workspaces?: Array<FirewallPolicyLogAnalyticsWorkspace>;
  /** The default workspace Id for Firewall Policy Insights. */
  defaultWorkspaceId?: SubResource;
}

/** Log Analytics Workspace for Firewall Policy Insights. */
export interface FirewallPolicyLogAnalyticsWorkspace {
  /** Region to configure the Workspace. */
  region?: string;
  /** The workspace Id for Firewall Policy Insights. */
  workspaceId?: SubResource;
}

/** The private IP addresses/IP ranges to which traffic will not be SNAT. */
export interface FirewallPolicySnat {
  /** List of private IP addresses/IP address ranges to not be SNAT. */
  privateRanges?: Array<string>;
  /** The operation mode for automatically learning private ranges to not be SNAT */
  autoLearnPrivateRanges?: "Enabled" | "Disabled";
}

/** SQL Settings in Firewall Policy. */
export interface FirewallPolicySQL {
  /** A flag to indicate if SQL Redirect traffic filtering is enabled. Turning on the flag requires no rule using port 11000-11999. */
  allowSqlRedirect?: boolean;
}

/** DNS Proxy Settings in Firewall Policy. */
export interface DnsSettings {
  /** List of Custom DNS Servers. */
  servers?: Array<string>;
  /** Enable DNS Proxy on Firewalls attached to the Firewall Policy. */
  enableProxy?: boolean;
  /** FQDNs in Network Rules are supported when set to true. */
  requireProxyForNetworkRules?: boolean;
}

/** Explicit Proxy Settings in Firewall Policy. */
export interface ExplicitProxy {
  /** When set to true, explicit proxy mode is enabled. */
  enableExplicitProxy?: boolean;
  /** Port number for explicit proxy http protocol, cannot be greater than 64000. */
  httpPort?: number;
  /** Port number for explicit proxy https protocol, cannot be greater than 64000. */
  httpsPort?: number;
  /** When set to true, pac file port and url needs to be provided. */
  enablePacFile?: boolean;
  /** Port number for firewall to serve PAC file. */
  pacFilePort?: number;
  /** SAS URL for PAC file. */
  pacFile?: string;
}

/** Configuration for intrusion detection mode and rules. */
export interface FirewallPolicyIntrusionDetection {
  /** Intrusion detection general state. */
  mode?: "Off" | "Alert" | "Deny";
  /** Intrusion detection configuration properties. */
  configuration?: FirewallPolicyIntrusionDetectionConfiguration;
}

/** The operation for configuring intrusion detection. */
export interface FirewallPolicyIntrusionDetectionConfiguration {
  /** List of specific signatures states. */
  signatureOverrides?: Array<FirewallPolicyIntrusionDetectionSignatureSpecification>;
  /** List of rules for traffic to bypass. */
  bypassTrafficSettings?: Array<FirewallPolicyIntrusionDetectionBypassTrafficSpecifications>;
  /** IDPS Private IP address ranges are used to identify traffic direction (i.e. inbound, outbound, etc.). By default, only ranges defined by IANA RFC 1918 are considered private IP addresses. To modify default ranges, specify your Private IP address ranges with this property */
  privateRanges?: Array<string>;
}

/** Intrusion detection signatures specification states. */
export interface FirewallPolicyIntrusionDetectionSignatureSpecification {
  /** Signature id. */
  id?: string;
  /** The signature state. */
  mode?: "Off" | "Alert" | "Deny";
}

/** Intrusion detection bypass traffic specification. */
export interface FirewallPolicyIntrusionDetectionBypassTrafficSpecifications {
  /** Name of the bypass traffic rule. */
  name?: string;
  /** Description of the bypass traffic rule. */
  description?: string;
  /** The rule bypass protocol. */
  protocol?: "TCP" | "UDP" | "ICMP" | "ANY";
  /** List of source IP addresses or ranges for this rule. */
  sourceAddresses?: Array<string>;
  /** List of destination IP addresses or ranges for this rule. */
  destinationAddresses?: Array<string>;
  /** List of destination ports or ranges. */
  destinationPorts?: Array<string>;
  /** List of source IpGroups for this rule. */
  sourceIpGroups?: Array<string>;
  /** List of destination IpGroups for this rule. */
  destinationIpGroups?: Array<string>;
}

/** Configuration needed to perform TLS termination & initiation. */
export interface FirewallPolicyTransportSecurity {
  /** The CA used for intermediate CA generation. */
  certificateAuthority?: FirewallPolicyCertificateAuthority;
}

/** Trusted Root certificates properties for tls. */
export interface FirewallPolicyCertificateAuthority {
  /** Secret Id of (base-64 encoded unencrypted pfx) 'Secret' or 'Certificate' object stored in KeyVault. */
  keyVaultSecretId?: string;
  /** Name of the CA certificate. */
  name?: string;
}

/** SKU of Firewall policy. */
export interface FirewallPolicySku {
  /** Tier of Firewall Policy. */
  tier?: "Standard" | "Premium" | "Basic";
}

/** Rule Collection Group resource. */
export interface FirewallPolicyRuleCollectionGroup extends SubResource {
  /** The properties of the firewall policy rule collection group. */
  properties?: FirewallPolicyRuleCollectionGroupProperties;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Rule Group type. */
  type?: string;
}

/** Properties of the rule collection group. */
export interface FirewallPolicyRuleCollectionGroupProperties {
  /** Priority of the Firewall Policy Rule Collection Group resource. */
  priority?: number;
  /** Group of Firewall Policy rule collections. */
  ruleCollections?: Array<FirewallPolicyRuleCollection>;
  /** The provisioning state of the firewall policy rule collection group resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Properties of the rule collection. */
export interface FirewallPolicyRuleCollectionParent {
  /** The name of the rule collection. */
  name?: string;
  /** Priority of the Firewall Policy Rule Collection resource. */
  priority?: number;
  ruleCollectionType:
    | "FirewallPolicyRuleCollection"
    | "FirewallPolicyNatRuleCollection"
    | "FirewallPolicyFilterRuleCollection";
}

/** Will describe the query to run against the IDPS signatures DB */
export interface IdpsQueryObject {
  /** Contain all filters names and values */
  filters?: Array<FilterItems>;
  /** Search term in all columns */
  search?: string;
  /** Column to sort response by */
  orderBy?: OrderBy;
  /** The number of the results to return in each page */
  resultsPerPage?: number;
  /** The number of records matching the filter to skip */
  skip?: number;
}

/** Will contain the filter name and values to operate on */
export interface FilterItems {
  /** The name of the field we would like to filter */
  field?: string;
  /** List of values to filter the current field by */
  values?: Array<string>;
}

/** Describes a column to sort */
export interface OrderBy {
  /** Describes the actual column name to sort by */
  field?: string;
  /** Describes if results should be in ascending/descending order */
  order?: "Ascending" | "Descending";
}

/** Contains all specific policy signatures overrides for the IDPS */
export interface SignaturesOverrides {
  /** Contains the name of the resource (default) */
  name?: string;
  /** Will contain the resource id of the signature override resource */
  id?: string;
  /** Will contain the type of the resource: Microsoft.Network/firewallPolicies/intrusionDetectionSignaturesOverrides */
  type?: string;
  /** Will contain the properties of the resource (the actual signature overrides) */
  properties?: SignaturesOverridesProperties;
}

/** Will contain the properties of the resource (the actual signature overrides) */
export interface SignaturesOverridesProperties {
  /** Dictionary of <string> */
  signatures?: Record<string, string>;
}

/** Describes the filter values possibles for a given column */
export interface SignatureOverridesFilterValuesQuery {
  /** Describes the name of the column which values will be returned */
  filterName?: string;
}

/** IpAllocation resource. */
export interface IpAllocation extends Resource {
  /** Properties of the IpAllocation. */
  properties?: IpAllocationPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of the IpAllocation. */
export interface IpAllocationPropertiesFormat {
  /** The Subnet that using the prefix of this IpAllocation resource. */
  subnet?: SubResource;
  /** The VirtualNetwork that using the prefix of this IpAllocation resource. */
  virtualNetwork?: SubResource;
  /** The type for the IpAllocation. */
  type?: "Undefined" | "Hypernet";
  /** The address prefix for the IpAllocation. */
  prefix?: string;
  /** The address prefix length for the IpAllocation. */
  prefixLength?: number;
  /** The address prefix Type for the IpAllocation. */
  prefixType?: "IPv4" | "IPv6";
  /** The IPAM allocation ID. */
  ipamAllocationId?: string;
  /** IpAllocation tags. */
  allocationTags?: Record<string, string>;
}

/** The IpGroups resource information. */
export interface IpGroup extends Resource {
  /** Properties of the IpGroups. */
  properties?: IpGroupPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** The IpGroups property information. */
export interface IpGroupPropertiesFormat {
  /** The provisioning state of the IpGroups resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** IpAddresses/IpAddressPrefixes in the IpGroups resource. */
  ipAddresses?: Array<string>;
  /** List of references to Firewall resources that this IpGroups is associated with. */
  firewalls?: Array<SubResource>;
  /** List of references to Firewall Policies resources that this IpGroups is associated with. */
  firewallPolicies?: Array<SubResource>;
}

/** LoadBalancer resource. */
export interface LoadBalancer extends Resource {
  /** The extended location of the load balancer. */
  extendedLocation?: ExtendedLocation;
  /** The load balancer SKU. */
  sku?: LoadBalancerSku;
  /** Properties of load balancer. */
  properties?: LoadBalancerPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** SKU of a load balancer. */
export interface LoadBalancerSku {
  /** Name of a load balancer SKU. */
  name?: "Basic" | "Standard" | "Gateway";
  /** Tier of a load balancer SKU. */
  tier?: "Regional" | "Global";
}

/** Properties of the load balancer. */
export interface LoadBalancerPropertiesFormat {
  /** Object representing the frontend IPs to be used for the load balancer. */
  frontendIPConfigurations?: Array<FrontendIPConfiguration>;
  /** Collection of backend address pools used by a load balancer. */
  backendAddressPools?: Array<BackendAddressPool>;
  /** Object collection representing the load balancing rules Gets the provisioning. */
  loadBalancingRules?: Array<LoadBalancingRule>;
  /** Collection of probe objects used in the load balancer. */
  probes?: Array<Probe>;
  /** Collection of inbound NAT Rules used by a load balancer. Defining inbound NAT rules on your load balancer is mutually exclusive with defining an inbound NAT pool. Inbound NAT pools are referenced from virtual machine scale sets. NICs that are associated with individual virtual machines cannot reference an Inbound NAT pool. They have to reference individual inbound NAT rules. */
  inboundNatRules?: Array<InboundNatRule>;
  /** Defines an external port range for inbound NAT to a single backend port on NICs associated with a load balancer. Inbound NAT rules are created automatically for each NIC associated with the Load Balancer using an external port from this range. Defining an Inbound NAT pool on your Load Balancer is mutually exclusive with defining inbound NAT rules. Inbound NAT pools are referenced from virtual machine scale sets. NICs that are associated with individual virtual machines cannot reference an inbound NAT pool. They have to reference individual inbound NAT rules. */
  inboundNatPools?: Array<InboundNatPool>;
  /** The outbound rules. */
  outboundRules?: Array<OutboundRule>;
  /** The resource GUID property of the load balancer resource. */
  resourceGuid?: string;
  /** The provisioning state of the load balancer resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** A load balancing rule for a load balancer. */
export interface LoadBalancingRule extends SubResource {
  /** Properties of load balancer load balancing rule. */
  properties?: LoadBalancingRulePropertiesFormat;
  /** The name of the resource that is unique within the set of load balancing rules used by the load balancer. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of the load balancer. */
export interface LoadBalancingRulePropertiesFormat {
  /** A reference to frontend IP addresses. */
  frontendIPConfiguration?: SubResource;
  /** A reference to a pool of DIPs. Inbound traffic is randomly load balanced across IPs in the backend IPs. */
  backendAddressPool?: SubResource;
  /** An array of references to pool of DIPs. */
  backendAddressPools?: Array<SubResource>;
  /** The reference to the load balancer probe used by the load balancing rule. */
  probe?: SubResource;
  /** The reference to the transport protocol used by the load balancing rule. */
  protocol: "Udp" | "Tcp" | "All";
  /** The load distribution policy for this rule. */
  loadDistribution?: "Default" | "SourceIP" | "SourceIPProtocol";
  /** The port for the external endpoint. Port numbers for each rule must be unique within the Load Balancer. Acceptable values are between 0 and 65534. Note that value 0 enables "Any Port". */
  frontendPort: number;
  /** The port used for internal connections on the endpoint. Acceptable values are between 0 and 65535. Note that value 0 enables "Any Port". */
  backendPort?: number;
  /** The timeout for the TCP idle connection. The value can be set between 4 and 30 minutes. The default value is 4 minutes. This element is only used when the protocol is set to TCP. */
  idleTimeoutInMinutes?: number;
  /** Configures a virtual machine's endpoint for the floating IP capability required to configure a SQL AlwaysOn Availability Group. This setting is required when using the SQL AlwaysOn Availability Groups in SQL server. This setting can't be changed after you create the endpoint. */
  enableFloatingIP?: boolean;
  /** Receive bidirectional TCP Reset on TCP flow idle timeout or unexpected connection termination. This element is only used when the protocol is set to TCP. */
  enableTcpReset?: boolean;
  /** Configures SNAT for the VMs in the backend pool to use the publicIP address specified in the frontend of the load balancing rule. */
  disableOutboundSnat?: boolean;
  /** The provisioning state of the load balancing rule resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** A load balancer probe. */
export interface Probe extends SubResource {
  /** Properties of load balancer probe. */
  properties?: ProbePropertiesFormat;
  /** The name of the resource that is unique within the set of probes used by the load balancer. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Load balancer probe resource. */
export interface ProbePropertiesFormat {
  /** The load balancer rules that use this probe. */
  loadBalancingRules?: Array<SubResource>;
  /** The protocol of the end point. If 'Tcp' is specified, a received ACK is required for the probe to be successful. If 'Http' or 'Https' is specified, a 200 OK response from the specifies URI is required for the probe to be successful. */
  protocol: "Http" | "Tcp" | "Https";
  /** The port for communicating the probe. Possible values range from 1 to 65535, inclusive. */
  port: number;
  /** The interval, in seconds, for how frequently to probe the endpoint for health status. Typically, the interval is slightly less than half the allocated timeout period (in seconds) which allows two full probes before taking the instance out of rotation. The default value is 15, the minimum value is 5. */
  intervalInSeconds?: number;
  /** The number of probes where if no response, will result in stopping further traffic from being delivered to the endpoint. This values allows endpoints to be taken out of rotation faster or slower than the typical times used in Azure. */
  numberOfProbes?: number;
  /** The number of consecutive successful or failed probes in order to allow or deny traffic from being delivered to this endpoint. After failing the number of consecutive probes equal to this value, the endpoint will be taken out of rotation and require the same number of successful consecutive probes to be placed back in rotation. */
  probeThreshold?: number;
  /** The URI used for requesting health status from the VM. Path is required if a protocol is set to http. Otherwise, it is not allowed. There is no default value. */
  requestPath?: string;
  /** The provisioning state of the probe resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Inbound NAT pool of the load balancer. */
export interface InboundNatPool extends SubResource {
  /** Properties of load balancer inbound nat pool. */
  properties?: InboundNatPoolPropertiesFormat;
  /** The name of the resource that is unique within the set of inbound NAT pools used by the load balancer. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Properties of Inbound NAT pool. */
export interface InboundNatPoolPropertiesFormat {
  /** A reference to frontend IP addresses. */
  frontendIPConfiguration?: SubResource;
  /** The reference to the transport protocol used by the inbound NAT pool. */
  protocol: "Udp" | "Tcp" | "All";
  /** The first port number in the range of external ports that will be used to provide Inbound Nat to NICs associated with a load balancer. Acceptable values range between 1 and 65534. */
  frontendPortRangeStart: number;
  /** The last port number in the range of external ports that will be used to provide Inbound Nat to NICs associated with a load balancer. Acceptable values range between 1 and 65535. */
  frontendPortRangeEnd: number;
  /** The port used for internal connections on the endpoint. Acceptable values are between 1 and 65535. */
  backendPort: number;
  /** The timeout for the TCP idle connection. The value can be set between 4 and 30 minutes. The default value is 4 minutes. This element is only used when the protocol is set to TCP. */
  idleTimeoutInMinutes?: number;
  /** Configures a virtual machine's endpoint for the floating IP capability required to configure a SQL AlwaysOn Availability Group. This setting is required when using the SQL AlwaysOn Availability Groups in SQL server. This setting can't be changed after you create the endpoint. */
  enableFloatingIP?: boolean;
  /** Receive bidirectional TCP Reset on TCP flow idle timeout or unexpected connection termination. This element is only used when the protocol is set to TCP. */
  enableTcpReset?: boolean;
  /** The provisioning state of the inbound NAT pool resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Outbound rule of the load balancer. */
export interface OutboundRule extends SubResource {
  /** Properties of load balancer outbound rule. */
  properties?: OutboundRulePropertiesFormat;
  /** The name of the resource that is unique within the set of outbound rules used by the load balancer. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Type of the resource. */
  type?: string;
}

/** Outbound rule of the load balancer. */
export interface OutboundRulePropertiesFormat {
  /** The number of outbound ports to be used for NAT. */
  allocatedOutboundPorts?: number;
  /** The Frontend IP addresses of the load balancer. */
  frontendIPConfigurations: Array<SubResource>;
  /** A reference to a pool of DIPs. Outbound traffic is randomly load balanced across IPs in the backend IPs. */
  backendAddressPool: SubResource;
  /** The provisioning state of the outbound rule resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The protocol for the outbound rule in load balancer. */
  protocol: "Tcp" | "Udp" | "All";
  /** Receive bidirectional TCP Reset on TCP flow idle timeout or unexpected connection termination. This element is only used when the protocol is set to TCP. */
  enableTcpReset?: boolean;
  /** The timeout for the TCP idle connection. */
  idleTimeoutInMinutes?: number;
}

/** The request for a VIP swap. */
export interface LoadBalancerVipSwapRequest {
  /** A list of frontend IP configuration resources that should swap VIPs. */
  frontendIPConfigurations?: Array<LoadBalancerVipSwapRequestFrontendIPConfiguration>;
}

/** VIP swap request's frontend IP configuration object. */
export interface LoadBalancerVipSwapRequestFrontendIPConfiguration {
  /** The ID of frontend IP configuration resource. */
  id?: string;
  /** The properties of VIP swap request's frontend IP configuration object. */
  properties?: LoadBalancerVipSwapRequestFrontendIPConfigurationProperties;
}

/** The properties of VIP swap request's frontend IP configuration object. */
export interface LoadBalancerVipSwapRequestFrontendIPConfigurationProperties {
  /** A reference to public IP address resource. */
  publicIPAddress?: SubResource;
}

/** The request for a QueryInboundNatRulePortMapping API. Either IpConfiguration or IpAddress should be set */
export interface QueryInboundNatRulePortMappingRequest {
  /** NetworkInterfaceIPConfiguration set in load balancer backend address. */
  ipConfiguration?: SubResource;
  /** IP address set in load balancer backend address. */
  ipAddress?: string;
}

/** The Managed Network resource */
export interface NetworkManager extends Resource {
  /** The network manager properties */
  properties?: NetworkManagerProperties;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** The system metadata related to this resource. */
  systemData?: SystemData;
}

/** Properties of Managed Network */
export interface NetworkManagerProperties {
  /** A description of the network manager. */
  description?: string;
  /** Scope of Network Manager. */
  networkManagerScopes: NetworkManagerPropertiesNetworkManagerScopes;
  /** Scope Access. */
  networkManagerScopeAccesses: Array<"SecurityAdmin" | "Connectivity">;
  /** The provisioning state of the network manager resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Scope of Network Manager. */
export interface NetworkManagerPropertiesNetworkManagerScopes {
  /** List of management groups. */
  managementGroups?: Array<string>;
  /** List of subscriptions. */
  subscriptions?: Array<string>;
  /** List of cross tenant scopes. */
  crossTenantScopes?: Array<CrossTenantScopes>;
}

/** Cross tenant scopes. */
export interface CrossTenantScopes {
  /** Tenant ID. */
  tenantId?: string;
  /** List of management groups. */
  managementGroups?: Array<string>;
  /** List of subscriptions. */
  subscriptions?: Array<string>;
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: "User" | "Application" | "ManagedIdentity" | "Key";
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date | string;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: "User" | "Application" | "ManagedIdentity" | "Key";
  /** The type of identity that last modified the resource. */
  lastModifiedAt?: Date | string;
}

/** Object for patch operations. */
export interface PatchObject {
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** Network Manager Commit. */
export interface NetworkManagerCommit {
  /** Commit Id. */
  commitId?: string;
  /** List of target locations. */
  targetLocations: Array<string>;
  /** List of configuration ids. */
  configurationIds?: Array<string>;
  /** Commit Type. */
  commitType: "SecurityAdmin" | "Connectivity";
}

/** Network Manager Deployment Status Parameter. */
export interface NetworkManagerDeploymentStatusParameter {
  /** List of locations. */
  regions?: Array<string>;
  /** List of deployment types. */
  deploymentTypes?: Array<"SecurityAdmin" | "Connectivity">;
  /** Continuation token for pagination, capturing the next page size and offset, as well as the context of the query. */
  skipToken?: string;
}

/** Effective Virtual Networks Parameter. */
export interface ActiveConfigurationParameter {
  /** List of regions. */
  regions?: Array<string>;
  /** When present, the value can be passed to a subsequent query call (together with the same query and scopes used in the current request) to retrieve the next page of data. */
  skipToken?: string;
}

/** Properties of network manager connectivity configuration */
export interface ConnectivityConfigurationProperties {
  /** A description of the connectivity configuration. */
  description?: string;
  /** Connectivity topology type. */
  connectivityTopology: "HubAndSpoke" | "Mesh";
  /** List of hubItems */
  hubs?: Array<Hub>;
  /** Flag if global mesh is supported. */
  isGlobal?: "False" | "True";
  /** Groups for configuration */
  appliesToGroups: Array<ConnectivityGroupItem>;
  /** The provisioning state of the connectivity configuration resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Flag if need to remove current existing peerings. */
  deleteExistingPeering?: "False" | "True";
}

/** Hub Item. */
export interface Hub {
  /** Resource Id. */
  resourceId?: string;
  /** Resource Type. */
  resourceType?: string;
}

/** Connectivity group item. */
export interface ConnectivityGroupItem {
  /** Network group Id. */
  networkGroupId: string;
  /** Flag if need to use hub gateway. */
  useHubGateway?: "False" | "True";
  /** Flag if global is supported. */
  isGlobal?: "False" | "True";
  /** Group connectivity type. */
  groupConnectivity: "None" | "DirectlyConnected";
}

/** Properties of network group */
export interface NetworkGroupProperties {
  /** A description of the network group. */
  description?: string;
  /** The provisioning state of the scope assignment resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Network manager security group item. */
export interface NetworkManagerSecurityGroupItem {
  /** Network manager group Id. */
  networkGroupId: string;
}

/** The Network Manager Connection resource */
export interface NetworkManagerConnection extends ChildResource {
  /** The scope connection properties */
  properties?: NetworkManagerConnectionProperties;
  /** The system metadata related to this resource. */
  systemData?: SystemData;
}

/** Information about the network manager connection. */
export interface NetworkManagerConnectionProperties {
  /** Network Manager Id. */
  networkManagerId?: string;
  /** Connection state. */
  connectionState?: "Connected" | "Pending" | "Conflict" | "Revoked" | "Rejected";
  /** A description of the network manager connection. */
  description?: string;
}

/** Proxy resource representation. */
export interface ChildResource {
  /** Resource ID. */
  id?: string;
  /** Resource name. */
  name?: string;
  /** Resource type. */
  type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** The network manager connectivity configuration resource */
export interface ConnectivityConfiguration extends ChildResource {
  /** Properties of a network manager connectivity configuration */
  properties?: ConnectivityConfigurationProperties;
  /** The system metadata related to this resource. */
  systemData?: SystemData;
}

/** Query Request Options */
export interface QueryRequestOptions {
  /** When present, the value can be passed to a subsequent query call (together with the same query and scopes used in the current request) to retrieve the next page of data. */
  skipToken?: string;
}

/** The network group resource */
export interface NetworkGroup extends ChildResource {
  /** The Network Group properties */
  properties?: NetworkGroupProperties;
  /** The system metadata related to this resource. */
  systemData?: SystemData;
}

/** StaticMember Item. */
export interface StaticMember extends ChildResource {
  /** The Static Member properties */
  properties?: StaticMemberProperties;
  /** The system metadata related to this resource. */
  systemData?: SystemData;
}

/** Properties of static member. */
export interface StaticMemberProperties {
  /** Resource Id. */
  resourceId?: string;
  /** Resource region. */
  region?: string;
  /** The provisioning state of the scope assignment resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** The Scope Connections resource */
export interface ScopeConnection extends ChildResource {
  /** The scope connection properties */
  properties?: ScopeConnectionProperties;
  /** The system metadata related to this resource. */
  systemData?: SystemData;
}

/** Scope connection. */
export interface ScopeConnectionProperties {
  /** Tenant ID. */
  tenantId?: string;
  /** Resource ID. */
  resourceId?: string;
  /** Connection State */
  connectionState?: "Connected" | "Pending" | "Conflict" | "Revoked" | "Rejected";
  /** A description of the scope connection. */
  description?: string;
}

/** Defines the security admin configuration */
export interface SecurityAdminConfiguration extends ChildResource {
  /** Indicates the properties for the network manager security admin configuration. */
  properties?: SecurityAdminConfigurationPropertiesFormat;
  /** The system metadata related to this resource. */
  systemData?: SystemData;
}

/** Defines the security admin configuration properties. */
export interface SecurityAdminConfigurationPropertiesFormat {
  /** A description of the security configuration. */
  description?: string;
  /** Enum list of network intent policy based services. */
  applyOnNetworkIntentPolicyBasedServices?: Array<"None" | "All" | "AllowRulesOnly">;
  /** The provisioning state of the resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Defines the admin rule collection. */
export interface AdminRuleCollection extends ChildResource {
  /** Indicates the properties for the network manager admin rule collection. */
  properties?: AdminRuleCollectionPropertiesFormat;
  /** The system metadata related to this resource. */
  systemData?: SystemData;
}

/** Defines the admin rule collection properties. */
export interface AdminRuleCollectionPropertiesFormat {
  /** A description of the admin rule collection. */
  description?: string;
  /** Groups for configuration */
  appliesToGroups: Array<NetworkManagerSecurityGroupItem>;
  /** The provisioning state of the resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Network base admin rule. */
export interface BaseAdminRuleParent extends ChildResource {
  /** The system metadata related to this resource. */
  systemData?: SystemData;
  kind: "BaseAdminRule" | "Custom" | "Default";
}

/** Network profile resource. */
export interface NetworkProfile extends Resource {
  /** Network profile properties. */
  properties?: NetworkProfilePropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Network profile properties. */
export interface NetworkProfilePropertiesFormat {
  /** List of child container network interfaces. */
  containerNetworkInterfaces?: Array<ContainerNetworkInterface>;
  /** List of chid container network interface configurations. */
  containerNetworkInterfaceConfigurations?: Array<ContainerNetworkInterfaceConfiguration>;
  /** The resource GUID property of the network profile resource. */
  resourceGuid?: string;
  /** The provisioning state of the network profile resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Container network interface child resource. */
export interface ContainerNetworkInterface extends SubResource {
  /** Container network interface properties. */
  properties?: ContainerNetworkInterfacePropertiesFormat;
  /** The name of the resource. This name can be used to access the resource. */
  name?: string;
  /** Sub Resource type. */
  type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of container network interface. */
export interface ContainerNetworkInterfacePropertiesFormat {
  /** Container network interface configuration from which this container network interface is created. */
  containerNetworkInterfaceConfiguration?: ContainerNetworkInterfaceConfiguration;
  /** Reference to the container to which this container network interface is attached. */
  container?: Container;
  /** Reference to the ip configuration on this container nic. */
  ipConfigurations?: Array<ContainerNetworkInterfaceIpConfiguration>;
  /** The provisioning state of the container network interface resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Container network interface configuration child resource. */
export interface ContainerNetworkInterfaceConfiguration extends SubResource {
  /** Container network interface configuration properties. */
  properties?: ContainerNetworkInterfaceConfigurationPropertiesFormat;
  /** The name of the resource. This name can be used to access the resource. */
  name?: string;
  /** Sub Resource type. */
  type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Container network interface configuration properties. */
export interface ContainerNetworkInterfaceConfigurationPropertiesFormat {
  /** A list of ip configurations of the container network interface configuration. */
  ipConfigurations?: Array<IPConfigurationProfile>;
  /** A list of container network interfaces created from this container network interface configuration. */
  containerNetworkInterfaces?: Array<SubResource>;
  /** The provisioning state of the container network interface configuration resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Reference to container resource in remote resource provider. */
export interface Container extends SubResource {}

/** The ip configuration for a container network interface. */
export interface ContainerNetworkInterfaceIpConfiguration {
  /** Properties of the container network interface IP configuration. */
  properties?: ContainerNetworkInterfaceIpConfigurationPropertiesFormat;
  /** The name of the resource. This name can be used to access the resource. */
  name?: string;
  /** Sub Resource type. */
  type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of the container network interface IP configuration. */
export interface ContainerNetworkInterfaceIpConfigurationPropertiesFormat {
  /** The provisioning state of the container network interface IP configuration resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** NetworkVirtualAppliance Resource. */
export interface NetworkVirtualAppliance extends Resource {
  /** Properties of the Network Virtual Appliance. */
  properties?: NetworkVirtualAppliancePropertiesFormat;
  /** The service principal that has read access to cloud-init and config blob. */
  identity?: ManagedServiceIdentity;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Network Virtual Appliance definition. */
export interface NetworkVirtualAppliancePropertiesFormat {
  /** Network Virtual Appliance SKU. */
  nvaSku?: VirtualApplianceSkuProperties;
  /** Address Prefix. */
  addressPrefix?: string;
  /** BootStrapConfigurationBlobs storage URLs. */
  bootStrapConfigurationBlobs?: Array<string>;
  /** The Virtual Hub where Network Virtual Appliance is being deployed. */
  virtualHub?: SubResource;
  /** CloudInitConfigurationBlob storage URLs. */
  cloudInitConfigurationBlobs?: Array<string>;
  /** CloudInitConfiguration string in plain text. */
  cloudInitConfiguration?: string;
  /** VirtualAppliance ASN. */
  virtualApplianceAsn?: number;
  /** Public key for SSH login. */
  sshPublicKey?: string;
  /** List of Virtual Appliance Network Interfaces. */
  virtualApplianceNics?: Array<VirtualApplianceNicProperties>;
  /** List of references to VirtualApplianceSite. */
  virtualApplianceSites?: Array<SubResource>;
  /** List of references to InboundSecurityRules. */
  inboundSecurityRules?: Array<SubResource>;
  /** The provisioning state of the resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Network Virtual Appliance Sku Properties. */
export interface VirtualApplianceSkuProperties {
  /** Virtual Appliance Vendor. */
  vendor?: string;
  /** Virtual Appliance Scale Unit. */
  bundledScaleUnit?: string;
  /** Virtual Appliance Version. */
  marketPlaceVersion?: string;
}

/** Network Virtual Appliance NIC properties. */
export interface VirtualApplianceNicProperties {
  /** NIC name. */
  name?: string;
  /** Public IP address. */
  publicIpAddress?: string;
  /** Private IP address. */
  privateIpAddress?: string;
}

/** Virtual Appliance Site resource. */
export interface VirtualApplianceSite extends SubResource {
  /** The properties of the Virtual Appliance Sites. */
  properties?: VirtualApplianceSiteProperties;
  /** Name of the virtual appliance site. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Site type. */
  type?: string;
}

/** Properties of the rule group. */
export interface VirtualApplianceSiteProperties {
  /** Address Prefix. */
  addressPrefix?: string;
  /** Office 365 Policy. */
  o365Policy?: Office365PolicyProperties;
  /** The provisioning state of the resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Network Virtual Appliance Sku Properties. */
export interface Office365PolicyProperties {
  /** Office 365 breakout categories. */
  breakOutCategories?: BreakOutCategoryPolicies;
}

/** Network Virtual Appliance Sku Properties. */
export interface BreakOutCategoryPolicies {
  /** Flag to control breakout of o365 allow category. */
  allow?: boolean;
  /** Flag to control breakout of o365 optimize category. */
  optimize?: boolean;
  /** Flag to control breakout of o365 default category. */
  default?: boolean;
}

/** Definition of the NetworkVirtualApplianceSkus resource. */
export interface NetworkVirtualApplianceSku extends Resource {
  /** NetworkVirtualApplianceSku properties. */
  properties?: NetworkVirtualApplianceSkuPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties specific to NetworkVirtualApplianceSkus. */
export interface NetworkVirtualApplianceSkuPropertiesFormat {
  /** Network Virtual Appliance Sku vendor. */
  vendor?: string;
  /** Available Network Virtual Appliance versions. */
  availableVersions?: Array<string>;
  /** The list of scale units available. */
  availableScaleUnits?: Array<NetworkVirtualApplianceSkuInstances>;
}

/** List of available Sku and instances. */
export interface NetworkVirtualApplianceSkuInstances {
  /** Scale Unit. */
  scaleUnit?: string;
  /** Instance Count. */
  instanceCount?: number;
}

/** NVA Inbound Security Rule resource. */
export interface InboundSecurityRule extends SubResource {
  /** The properties of the Inbound Security Rules. */
  properties?: InboundSecurityRuleProperties;
  /** Name of security rule collection. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** NVA inbound security rule type. */
  type?: string;
}

/** Properties of the Inbound Security Rules resource. */
export interface InboundSecurityRuleProperties {
  /** List of allowed rules. */
  rules?: Array<InboundSecurityRules>;
  /** The provisioning state of the resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Properties of the Inbound Security Rules resource. */
export interface InboundSecurityRules {
  /** Protocol. This should be either TCP or UDP. */
  protocol?: "TCP" | "UDP";
  /** The CIDR or source IP range. Only /30, /31 and /32 Ip ranges are allowed. */
  sourceAddressPrefix?: string;
  /** NVA port ranges to be opened up. One needs to provide specific ports. */
  destinationPortRange?: number;
}

/** Network watcher in a resource group. */
export interface NetworkWatcher extends Resource {
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Properties of the network watcher. */
  properties?: NetworkWatcherPropertiesFormat;
}

/** The network watcher properties. */
export interface NetworkWatcherPropertiesFormat {
  /** The provisioning state of the network watcher resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Parameters that define the representation of topology. */
export interface TopologyParameters {
  /** The name of the target resource group to perform topology on. */
  targetResourceGroupName?: string;
  /** The reference to the Virtual Network resource. */
  targetVirtualNetwork?: SubResource;
  /** The reference to the Subnet resource. */
  targetSubnet?: SubResource;
}

/** Parameters that define the IP flow to be verified. */
export interface VerificationIPFlowParameters {
  /** The ID of the target resource to perform next-hop on. */
  targetResourceId: string;
  /** The direction of the packet represented as a 5-tuple. */
  direction: "Inbound" | "Outbound";
  /** Protocol to be verified on. */
  protocol: "TCP" | "UDP";
  /** The local port. Acceptable values are a single integer in the range (0-65535). Support for * for the source port, which depends on the direction. */
  localPort: string;
  /** The remote port. Acceptable values are a single integer in the range (0-65535). Support for * for the source port, which depends on the direction. */
  remotePort: string;
  /** The local IP address. Acceptable values are valid IPv4 addresses. */
  localIPAddress: string;
  /** The remote IP address. Acceptable values are valid IPv4 addresses. */
  remoteIPAddress: string;
  /** The NIC ID. (If VM has multiple NICs and IP forwarding is enabled on any of them, then this parameter must be specified. Otherwise optional). */
  targetNicResourceId?: string;
}

/** Parameters that define the source and destination endpoint. */
export interface NextHopParameters {
  /** The resource identifier of the target resource against which the action is to be performed. */
  targetResourceId: string;
  /** The source IP address. */
  sourceIPAddress: string;
  /** The destination IP address. */
  destinationIPAddress: string;
  /** The NIC ID. (If VM has multiple NICs and IP forwarding is enabled on any of the nics, then this parameter must be specified. Otherwise optional). */
  targetNicResourceId?: string;
}

/** Parameters that define the VM to check security groups for. */
export interface SecurityGroupViewParameters {
  /** ID of the target VM. */
  targetResourceId: string;
}

/** Parameters that define the create packet capture operation. */
export interface PacketCapture {
  /** Properties of the packet capture. */
  properties: PacketCaptureParameters;
}

/** Parameters that define the create packet capture operation. */
export interface PacketCaptureParameters {
  /** The ID of the targeted resource, only AzureVM and AzureVMSS as target type are currently supported. */
  target: string;
  /** A list of AzureVMSS instances which can be included or excluded to run packet capture. If both included and excluded are empty, then the packet capture will run on all instances of AzureVMSS. */
  scope?: PacketCaptureMachineScope;
  /** Target type of the resource provided. */
  targetType?: "AzureVM" | "AzureVMSS";
  /** Number of bytes captured per packet, the remaining bytes are truncated. */
  bytesToCapturePerPacket?: number;
  /** Maximum size of the capture output. */
  totalBytesPerSession?: number;
  /** Maximum duration of the capture session in seconds. */
  timeLimitInSeconds?: number;
  /** The storage location for a packet capture session. */
  storageLocation: PacketCaptureStorageLocation;
  /** A list of packet capture filters. */
  filters?: Array<PacketCaptureFilter>;
}

/** A list of AzureVMSS instances which can be included or excluded to run packet capture. If both included and excluded are empty, then the packet capture will run on all instances of AzureVMSS. */
export interface PacketCaptureMachineScope {
  /** List of AzureVMSS instances to run packet capture on. */
  include?: Array<string>;
  /** List of AzureVMSS instances which has to be excluded from the AzureVMSS from running packet capture. */
  exclude?: Array<string>;
}

/** The storage location for a packet capture session. */
export interface PacketCaptureStorageLocation {
  /** The ID of the storage account to save the packet capture session. Required if no local file path is provided. */
  storageId?: string;
  /** The URI of the storage path to save the packet capture. Must be a well-formed URI describing the location to save the packet capture. */
  storagePath?: string;
  /** A valid local path on the targeting VM. Must include the name of the capture file (*.cap). For linux virtual machine it must start with /var/captures. Required if no storage ID is provided, otherwise optional. */
  filePath?: string;
}

/** Filter that is applied to packet capture request. Multiple filters can be applied. */
export interface PacketCaptureFilter {
  /** Protocol to be filtered on. */
  protocol?: "TCP" | "UDP" | "Any";
  /** Local IP Address to be filtered on. Notation: "127.0.0.1" for single address entry. "127.0.0.1-127.0.0.255" for range. "127.0.0.1;127.0.0.5"? for multiple entries. Multiple ranges not currently supported. Mixing ranges with multiple entries not currently supported. Default = null. */
  localIPAddress?: string;
  /** Local IP Address to be filtered on. Notation: "127.0.0.1" for single address entry. "127.0.0.1-127.0.0.255" for range. "127.0.0.1;127.0.0.5;" for multiple entries. Multiple ranges not currently supported. Mixing ranges with multiple entries not currently supported. Default = null. */
  remoteIPAddress?: string;
  /** Local port to be filtered on. Notation: "80" for single port entry."80-85" for range. "80;443;" for multiple entries. Multiple ranges not currently supported. Mixing ranges with multiple entries not currently supported. Default = null. */
  localPort?: string;
  /** Remote port to be filtered on. Notation: "80" for single port entry."80-85" for range. "80;443;" for multiple entries. Multiple ranges not currently supported. Mixing ranges with multiple entries not currently supported. Default = null. */
  remotePort?: string;
}

/** The properties of a packet capture session. */
export interface PacketCaptureResultProperties extends PacketCaptureParameters {
  /** The provisioning state of the packet capture session. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Parameters that define the resource to troubleshoot. */
export interface TroubleshootingParameters {
  /** The target resource to troubleshoot. */
  targetResourceId: string;
  /** Properties of the troubleshooting resource. */
  properties: TroubleshootingProperties;
}

/** Storage location provided for troubleshoot. */
export interface TroubleshootingProperties {
  /** The ID for the storage account to save the troubleshoot result. */
  storageId: string;
  /** The path to the blob to save the troubleshoot result in. */
  storagePath: string;
}

/** Parameters that define the resource to query the troubleshooting result. */
export interface QueryTroubleshootingParameters {
  /** The target resource ID to query the troubleshooting result. */
  targetResourceId: string;
}

/** Information on the configuration of flow log and traffic analytics (optional) . */
export interface FlowLogInformation {
  /** The ID of the resource to configure for flow log and traffic analytics (optional) . */
  targetResourceId: string;
  /** Properties of the flow log. */
  properties: FlowLogProperties;
  /** Parameters that define the configuration of traffic analytics. */
  flowAnalyticsConfiguration?: TrafficAnalyticsProperties;
}

/** Parameters that define the configuration of flow log. */
export interface FlowLogProperties {
  /** ID of the storage account which is used to store the flow log. */
  storageId: string;
  /** Flag to enable/disable flow logging. */
  enabled: boolean;
  /** Parameters that define the retention policy for flow log. */
  retentionPolicy?: RetentionPolicyParameters;
  /** Parameters that define the flow log format. */
  format?: FlowLogFormatParameters;
}

/** Parameters that define a resource to query flow log and traffic analytics (optional) status. */
export interface FlowLogStatusParameters {
  /** The target resource where getting the flow log and traffic analytics (optional) status. */
  targetResourceId: string;
}

/** Parameters that determine how the connectivity check will be performed. */
export interface ConnectivityParameters {
  /** The source of the connection. */
  source: ConnectivitySource;
  /** The destination of connection. */
  destination: ConnectivityDestination;
  /** Network protocol. */
  protocol?: "Tcp" | "Http" | "Https" | "Icmp";
  /** Configuration of the protocol. */
  protocolConfiguration?: ProtocolConfiguration;
  /** Preferred IP version of the connection. */
  preferredIPVersion?: "IPv4" | "IPv6";
}

/** Parameters that define the source of the connection. */
export interface ConnectivitySource {
  /** The ID of the resource from which a connectivity check will be initiated. */
  resourceId: string;
  /** The source port from which a connectivity check will be performed. */
  port?: number;
}

/** Parameters that define destination of connection. */
export interface ConnectivityDestination {
  /** The ID of the resource to which a connection attempt will be made. */
  resourceId?: string;
  /** The IP address or URI the resource to which a connection attempt will be made. */
  address?: string;
  /** Port on which check connectivity will be performed. */
  port?: number;
}

/** Configuration of the protocol. */
export interface ProtocolConfiguration {
  /** HTTP configuration of the connectivity check. */
  HTTPConfiguration?: HttpConfiguration;
}

/** HTTP configuration of the connectivity check. */
export interface HttpConfiguration {
  /** HTTP method. */
  method?: "Get";
  /** List of HTTP headers. */
  headers?: Array<HttpHeader>;
  /** Valid status codes. */
  validStatusCodes?: Array<number>;
}

/** The HTTP header. */
export interface HttpHeader {
  /** The name in HTTP header. */
  name?: string;
  /** The value in HTTP header. */
  value?: string;
}

/** Geographic and time constraints for Azure reachability report. */
export interface AzureReachabilityReportParameters {
  /** Parameters that define a geographic location. */
  providerLocation: AzureReachabilityReportLocation;
  /** List of Internet service providers. */
  providers?: Array<string>;
  /** Optional Azure regions to scope the query to. */
  azureLocations?: Array<string>;
  /** The start time for the Azure reachability report. */
  startTime: Date | string;
  /** The end time for the Azure reachability report. */
  endTime: Date | string;
}

/** Parameters that define a geographic location. */
export interface AzureReachabilityReportLocation {
  /** The name of the country. */
  country: string;
  /** The name of the state. */
  state?: string;
  /** The name of the city or town. */
  city?: string;
}

/** Constraints that determine the list of available Internet service providers. */
export interface AvailableProvidersListParameters {
  /** A list of Azure regions. */
  azureLocations?: Array<string>;
  /** The country for available providers list. */
  country?: string;
  /** The state for available providers list. */
  state?: string;
  /** The city or town for available providers list. */
  city?: string;
}

/** Parameters to get network configuration diagnostic. */
export interface NetworkConfigurationDiagnosticParameters {
  /** The ID of the target resource to perform network configuration diagnostic. Valid options are VM, NetworkInterface, VMSS/NetworkInterface and Application Gateway. */
  targetResourceId: string;
  /** Verbosity level. */
  verbosityLevel?: "Normal" | "Minimum" | "Full";
  /** List of network configuration diagnostic profiles. */
  profiles: Array<NetworkConfigurationDiagnosticProfile>;
}

/** Parameters to compare with network configuration. */
export interface NetworkConfigurationDiagnosticProfile {
  /** The direction of the traffic. */
  direction: "Inbound" | "Outbound";
  /** Protocol to be verified on. Accepted values are '*', TCP, UDP. */
  protocol: string;
  /** Traffic source. Accepted values are '*', IP Address/CIDR, Service Tag. */
  source: string;
  /** Traffic destination. Accepted values are: '*', IP Address/CIDR, Service Tag. */
  destination: string;
  /** Traffic destination port. Accepted values are '*' and a single port in the range (0 - 65535). */
  destinationPort: string;
}

/** Parameters that define the operation to create a connection monitor. */
export interface ConnectionMonitor {
  /** Connection monitor location. */
  location?: string;
  /** Connection monitor tags. */
  tags?: Record<string, string>;
  /** Properties of the connection monitor. */
  properties: ConnectionMonitorParameters;
}

/** Parameters that define the operation to create a connection monitor. */
export interface ConnectionMonitorParameters {
  /** Describes the source of connection monitor. */
  source?: ConnectionMonitorSource;
  /** Describes the destination of connection monitor. */
  destination?: ConnectionMonitorDestination;
  /** Determines if the connection monitor will start automatically once created. */
  autoStart?: boolean;
  /** Monitoring interval in seconds. */
  monitoringIntervalInSeconds?: number;
  /** List of connection monitor endpoints. */
  endpoints?: Array<ConnectionMonitorEndpoint>;
  /** List of connection monitor test configurations. */
  testConfigurations?: Array<ConnectionMonitorTestConfiguration>;
  /** List of connection monitor test groups. */
  testGroups?: Array<ConnectionMonitorTestGroup>;
  /** List of connection monitor outputs. */
  outputs?: Array<ConnectionMonitorOutput>;
  /** Optional notes to be associated with the connection monitor. */
  notes?: string;
}

/** Describes the source of connection monitor. */
export interface ConnectionMonitorSource {
  /** The ID of the resource used as the source by connection monitor. */
  resourceId: string;
  /** The source port used by connection monitor. */
  port?: number;
}

/** Describes the destination of connection monitor. */
export interface ConnectionMonitorDestination {
  /** The ID of the resource used as the destination by connection monitor. */
  resourceId?: string;
  /** Address of the connection monitor destination (IP or domain name). */
  address?: string;
  /** The destination port used by connection monitor. */
  port?: number;
}

/** Describes the connection monitor endpoint. */
export interface ConnectionMonitorEndpoint {
  /** The name of the connection monitor endpoint. */
  name: string;
  /** The endpoint type. */
  type?:
    | "AzureVM"
    | "AzureVNet"
    | "AzureSubnet"
    | "ExternalAddress"
    | "MMAWorkspaceMachine"
    | "MMAWorkspaceNetwork"
    | "AzureArcVM"
    | "AzureVMSS";
  /** Resource ID of the connection monitor endpoint. */
  resourceId?: string;
  /** Address of the connection monitor endpoint (IP or domain name). */
  address?: string;
  /** Filter for sub-items within the endpoint. */
  filter?: ConnectionMonitorEndpointFilter;
  /** Endpoint scope. */
  scope?: ConnectionMonitorEndpointScope;
  /** Test coverage for the endpoint. */
  coverageLevel?: "Default" | "Low" | "BelowAverage" | "Average" | "AboveAverage" | "Full";
}

/** Describes the connection monitor endpoint filter. */
export interface ConnectionMonitorEndpointFilter {
  /** The behavior of the endpoint filter. Currently only 'Include' is supported. */
  type?: "Include";
  /** List of items in the filter. */
  items?: Array<ConnectionMonitorEndpointFilterItem>;
}

/** Describes the connection monitor endpoint filter item. */
export interface ConnectionMonitorEndpointFilterItem {
  /** The type of item included in the filter. Currently only 'AgentAddress' is supported. */
  type?: "AgentAddress";
  /** The address of the filter item. */
  address?: string;
}

/** Describes the connection monitor endpoint scope. */
export interface ConnectionMonitorEndpointScope {
  /** List of items which needs to be included to the endpoint scope. */
  include?: Array<ConnectionMonitorEndpointScopeItem>;
  /** List of items which needs to be excluded from the endpoint scope. */
  exclude?: Array<ConnectionMonitorEndpointScopeItem>;
}

/** Describes the connection monitor endpoint scope item. */
export interface ConnectionMonitorEndpointScopeItem {
  /** The address of the endpoint item. Supported types are IPv4/IPv6 subnet mask or IPv4/IPv6 IP address. */
  address?: string;
}

/** Describes a connection monitor test configuration. */
export interface ConnectionMonitorTestConfiguration {
  /** The name of the connection monitor test configuration. */
  name: string;
  /** The frequency of test evaluation, in seconds. */
  testFrequencySec?: number;
  /** The protocol to use in test evaluation. */
  protocol: "Tcp" | "Http" | "Icmp";
  /** The preferred IP version to use in test evaluation. The connection monitor may choose to use a different version depending on other parameters. */
  preferredIPVersion?: "IPv4" | "IPv6";
  /** The parameters used to perform test evaluation over HTTP. */
  httpConfiguration?: ConnectionMonitorHttpConfiguration;
  /** The parameters used to perform test evaluation over TCP. */
  tcpConfiguration?: ConnectionMonitorTcpConfiguration;
  /** The parameters used to perform test evaluation over ICMP. */
  icmpConfiguration?: ConnectionMonitorIcmpConfiguration;
  /** The threshold for declaring a test successful. */
  successThreshold?: ConnectionMonitorSuccessThreshold;
}

/** Describes the HTTP configuration. */
export interface ConnectionMonitorHttpConfiguration {
  /** The port to connect to. */
  port?: number;
  /** The HTTP method to use. */
  method?: "Get" | "Post";
  /** The path component of the URI. For instance, "/dir1/dir2". */
  path?: string;
  /** The HTTP headers to transmit with the request. */
  requestHeaders?: Array<HttpHeader>;
  /** HTTP status codes to consider successful. For instance, "2xx,301-304,418". */
  validStatusCodeRanges?: Array<string>;
  /** Value indicating whether HTTPS is preferred over HTTP in cases where the choice is not explicit. */
  preferHTTPS?: boolean;
}

/** Describes the TCP configuration. */
export interface ConnectionMonitorTcpConfiguration {
  /** The port to connect to. */
  port?: number;
  /** Value indicating whether path evaluation with trace route should be disabled. */
  disableTraceRoute?: boolean;
  /** Destination port behavior. */
  destinationPortBehavior?: "None" | "ListenIfAvailable";
}

/** Describes the ICMP configuration. */
export interface ConnectionMonitorIcmpConfiguration {
  /** Value indicating whether path evaluation with trace route should be disabled. */
  disableTraceRoute?: boolean;
}

/** Describes the threshold for declaring a test successful. */
export interface ConnectionMonitorSuccessThreshold {
  /** The maximum percentage of failed checks permitted for a test to evaluate as successful. */
  checksFailedPercent?: number;
  /** The maximum round-trip time in milliseconds permitted for a test to evaluate as successful. */
  roundTripTimeMs?: number;
}

/** Describes the connection monitor test group. */
export interface ConnectionMonitorTestGroup {
  /** The name of the connection monitor test group. */
  name: string;
  /** Value indicating whether test group is disabled. */
  disable?: boolean;
  /** List of test configuration names. */
  testConfigurations: Array<string>;
  /** List of source endpoint names. */
  sources: Array<string>;
  /** List of destination endpoint names. */
  destinations: Array<string>;
}

/** Describes a connection monitor output destination. */
export interface ConnectionMonitorOutput {
  /** Connection monitor output destination type. Currently, only "Workspace" is supported. */
  type?: "Workspace";
  /** Describes the settings for producing output into a log analytics workspace. */
  workspaceSettings?: ConnectionMonitorWorkspaceSettings;
}

/** Describes the settings for producing output into a log analytics workspace. */
export interface ConnectionMonitorWorkspaceSettings {
  /** Log analytics workspace resource ID. */
  workspaceResourceId?: string;
}

/** Describes the properties of a connection monitor. */
export interface ConnectionMonitorResultProperties extends ConnectionMonitorParameters {
  /** The provisioning state of the connection monitor. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The date and time when the connection monitor was started. */
  startTime?: Date | string;
  /** The monitoring status of the connection monitor. */
  monitoringStatus?: string;
  /** Type of connection monitor. */
  connectionMonitorType?: "MultiEndpoint" | "SingleSourceDestination";
}

/** Private dns zone group resource. */
export interface PrivateDnsZoneGroup extends SubResource {
  /** Name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Properties of the private dns zone group. */
  properties?: PrivateDnsZoneGroupPropertiesFormat;
}

/** Properties of the private dns zone group. */
export interface PrivateDnsZoneGroupPropertiesFormat {
  /** The provisioning state of the private dns zone group resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** A collection of private dns zone configurations of the private dns zone group. */
  privateDnsZoneConfigs?: Array<PrivateDnsZoneConfig>;
}

/** PrivateDnsZoneConfig resource. */
export interface PrivateDnsZoneConfig {
  /** Name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** Properties of the private dns zone configuration. */
  properties?: PrivateDnsZonePropertiesFormat;
}

/** Properties of the private dns zone configuration resource. */
export interface PrivateDnsZonePropertiesFormat {
  /** The resource id of the private dns zone. */
  privateDnsZoneId?: string;
  /** A collection of information regarding a recordSet, holding information to identify private resources. */
  recordSets?: Array<RecordSet>;
}

/** A collective group of information about the record set information. */
export interface RecordSet {
  /** Resource record type. */
  recordType?: string;
  /** Recordset name. */
  recordSetName?: string;
  /** Fqdn that resolves to private endpoint ip address. */
  fqdn?: string;
  /** The provisioning state of the recordset. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Recordset time to live. */
  ttl?: number;
  /** The private ip address of the private endpoint. */
  ipAddresses?: Array<string>;
}

/** Request body of the CheckPrivateLinkServiceVisibility API service call. */
export interface CheckPrivateLinkServiceVisibilityRequest {
  /** The alias of the private link service. */
  privateLinkServiceAlias?: string;
}

/** Public IP prefix resource. */
export interface PublicIPPrefix extends Resource {
  /** The extended location of the public ip address. */
  extendedLocation?: ExtendedLocation;
  /** The public IP prefix SKU. */
  sku?: PublicIPPrefixSku;
  /** Public IP prefix properties. */
  properties?: PublicIPPrefixPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** A list of availability zones denoting the IP allocated for the resource needs to come from. */
  zones?: Array<string>;
}

/** SKU of a public IP prefix. */
export interface PublicIPPrefixSku {
  /** Name of a public IP prefix SKU. */
  name?: "Standard";
  /** Tier of a public IP prefix SKU. */
  tier?: "Regional" | "Global";
}

/** Public IP prefix properties. */
export interface PublicIPPrefixPropertiesFormat {
  /** The public IP address version. */
  publicIPAddressVersion?: "IPv4" | "IPv6";
  /** The list of tags associated with the public IP prefix. */
  ipTags?: Array<IpTag>;
  /** The Length of the Public IP Prefix. */
  prefixLength?: number;
  /** The allocated Prefix. */
  ipPrefix?: string;
  /** The list of all referenced PublicIPAddresses. */
  publicIPAddresses?: Array<ReferencedPublicIpAddress>;
  /** The reference to load balancer frontend IP configuration associated with the public IP prefix. */
  loadBalancerFrontendIpConfiguration?: SubResource;
  /** The customIpPrefix that this prefix is associated with. */
  customIPPrefix?: SubResource;
  /** The resource GUID property of the public IP prefix resource. */
  resourceGuid?: string;
  /** The provisioning state of the public IP prefix resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** NatGateway of Public IP Prefix. */
  natGateway?: NatGateway;
}

/** Reference to a public IP address. */
export interface ReferencedPublicIpAddress {
  /** The PublicIPAddress Reference. */
  id?: string;
}

/** Route Filter Resource. */
export interface RouteFilter extends Resource {
  /** Properties of the route filter. */
  properties?: RouteFilterPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Route Filter Resource. */
export interface RouteFilterPropertiesFormat {
  /** Collection of RouteFilterRules contained within a route filter. */
  rules?: Array<RouteFilterRule>;
  /** A collection of references to express route circuit peerings. */
  peerings?: Array<ExpressRouteCircuitPeering>;
  /** A collection of references to express route circuit ipv6 peerings. */
  ipv6Peerings?: Array<ExpressRouteCircuitPeering>;
  /** The provisioning state of the route filter resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Route Filter Rule Resource. */
export interface RouteFilterRule extends SubResource {
  /** Properties of the route filter rule. */
  properties?: RouteFilterRulePropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** Resource location. */
  location?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Route Filter Rule Resource. */
export interface RouteFilterRulePropertiesFormat {
  /** The access type of the rule. */
  access: "Allow" | "Deny";
  /** The rule type of the rule. */
  routeFilterRuleType: "Community";
  /** The collection for bgp community values to filter on. e.g. ['12076:5010','12076:5020']. */
  communities: Array<string>;
  /** The provisioning state of the route filter rule resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Security Partner Provider resource. */
export interface SecurityPartnerProvider extends Resource {
  /** Properties of the Security Partner Provider. */
  properties?: SecurityPartnerProviderPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of the Security Partner Provider. */
export interface SecurityPartnerProviderPropertiesFormat {
  /** The provisioning state of the Security Partner Provider resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The security provider name. */
  securityProviderName?: "ZScaler" | "IBoss" | "Checkpoint";
  /** The connection status with the Security Partner Provider. */
  connectionStatus?: "Unknown" | "PartiallyConnected" | "Connected" | "NotConnected";
  /** The virtualHub to which the Security Partner Provider belongs. */
  virtualHub?: SubResource;
}

/** Service Community Properties. */
export interface BgpServiceCommunity extends Resource {
  /** Properties of the BGP service community. */
  properties?: BgpServiceCommunityPropertiesFormat;
}

/** Properties of Service Community. */
export interface BgpServiceCommunityPropertiesFormat {
  /** The name of the bgp community. e.g. Skype. */
  serviceName?: string;
  /** A list of bgp communities. */
  bgpCommunities?: Array<BGPCommunity>;
}

/** Contains bgp community information offered in Service Community resources. */
export interface BGPCommunity {
  /** The region which the service support. e.g. For O365, region is Global. */
  serviceSupportedRegion?: string;
  /** The name of the bgp community. e.g. Skype. */
  communityName?: string;
  /** The value of the bgp community. For more information: https://docs.microsoft.com/en-us/azure/expressroute/expressroute-routing. */
  communityValue?: string;
  /** The prefixes that the bgp community contains. */
  communityPrefixes?: Array<string>;
  /** Customer is authorized to use bgp community or not. */
  isAuthorizedToUse?: boolean;
  /** The service group of the bgp community contains. */
  serviceGroup?: string;
}

/** Virtual Network resource. */
export interface VirtualNetwork extends Resource {
  /** The extended location of the virtual network. */
  extendedLocation?: ExtendedLocation;
  /** Properties of the virtual network. */
  properties?: VirtualNetworkPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of the virtual network. */
export interface VirtualNetworkPropertiesFormat {
  /** The AddressSpace that contains an array of IP address ranges that can be used by subnets. */
  addressSpace?: AddressSpace;
  /** The dhcpOptions that contains an array of DNS servers available to VMs deployed in the virtual network. */
  dhcpOptions?: DhcpOptions;
  /** The FlowTimeout value (in minutes) for the Virtual Network */
  flowTimeoutInMinutes?: number;
  /** A list of subnets in a Virtual Network. */
  subnets?: Array<Subnet>;
  /** A list of peerings in a Virtual Network. */
  virtualNetworkPeerings?: Array<VirtualNetworkPeering>;
  /** The resourceGuid property of the Virtual Network resource. */
  resourceGuid?: string;
  /** The provisioning state of the virtual network resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Indicates if DDoS protection is enabled for all the protected resources in the virtual network. It requires a DDoS protection plan associated with the resource. */
  enableDdosProtection?: boolean;
  /** Indicates if VM protection is enabled for all the subnets in the virtual network. */
  enableVmProtection?: boolean;
  /** The DDoS protection plan associated with the virtual network. */
  ddosProtectionPlan?: SubResource;
  /** Bgp Communities sent over ExpressRoute with each route corresponding to a prefix in this VNET. */
  bgpCommunities?: VirtualNetworkBgpCommunities;
  /** Indicates if encryption is enabled on virtual network and if VM without encryption is allowed in encrypted VNet. */
  encryption?: VirtualNetworkEncryption;
  /** Array of IpAllocation which reference this VNET. */
  ipAllocations?: Array<SubResource>;
}

/** AddressSpace contains an array of IP address ranges that can be used by subnets of the virtual network. */
export interface AddressSpace {
  /** A list of address blocks reserved for this virtual network in CIDR notation. */
  addressPrefixes?: Array<string>;
}

/** DhcpOptions contains an array of DNS servers available to VMs deployed in the virtual network. Standard DHCP option for a subnet overrides VNET DHCP options. */
export interface DhcpOptions {
  /** The list of DNS servers IP addresses. */
  dnsServers?: Array<string>;
}

/** Peerings in a virtual network resource. */
export interface VirtualNetworkPeering extends SubResource {
  /** Properties of the virtual network peering. */
  properties?: VirtualNetworkPeeringPropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Resource type. */
  type?: string;
}

/** Properties of the virtual network peering. */
export interface VirtualNetworkPeeringPropertiesFormat {
  /** Whether the VMs in the local virtual network space would be able to access the VMs in remote virtual network space. */
  allowVirtualNetworkAccess?: boolean;
  /** Whether the forwarded traffic from the VMs in the local virtual network will be allowed/disallowed in remote virtual network. */
  allowForwardedTraffic?: boolean;
  /** If gateway links can be used in remote virtual networking to link to this virtual network. */
  allowGatewayTransit?: boolean;
  /** If remote gateways can be used on this virtual network. If the flag is set to true, and allowGatewayTransit on remote peering is also true, virtual network will use gateways of remote virtual network for transit. Only one peering can have this flag set to true. This flag cannot be set if virtual network already has a gateway. */
  useRemoteGateways?: boolean;
  /** The reference to the remote virtual network. The remote virtual network can be in the same or different region (preview). See here to register for the preview and learn more (https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-create-peering). */
  remoteVirtualNetwork?: SubResource;
  /** The reference to the address space peered with the remote virtual network. */
  remoteAddressSpace?: AddressSpace;
  /** The reference to the current address space of the remote virtual network. */
  remoteVirtualNetworkAddressSpace?: AddressSpace;
  /** The reference to the remote virtual network's Bgp Communities. */
  remoteBgpCommunities?: VirtualNetworkBgpCommunities;
  /** The reference to the remote virtual network's encryption */
  remoteVirtualNetworkEncryption?: VirtualNetworkEncryption;
  /** The status of the virtual network peering. */
  peeringState?: "Initiated" | "Connected" | "Disconnected";
  /** The peering sync status of the virtual network peering. */
  peeringSyncLevel?:
    | "FullyInSync"
    | "RemoteNotInSync"
    | "LocalNotInSync"
    | "LocalAndRemoteNotInSync";
  /** The provisioning state of the virtual network peering resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** If we need to verify the provisioning state of the remote gateway. */
  doNotVerifyRemoteGateways?: boolean;
  /** The resourceGuid property of the Virtual Network peering resource. */
  resourceGuid?: string;
}

/** Bgp Communities sent over ExpressRoute with each route corresponding to a prefix in this VNET. */
export interface VirtualNetworkBgpCommunities {
  /** The BGP community associated with the virtual network. */
  virtualNetworkCommunity: string;
  /** The BGP community associated with the region of the virtual network. */
  regionalCommunity?: string;
}

/** Indicates if encryption is enabled on virtual network and if VM without encryption is allowed in encrypted VNet. */
export interface VirtualNetworkEncryption {
  /** Indicates if encryption is enabled on the virtual network. */
  enabled: boolean;
  /** If the encrypted VNet allows VM that does not support encryption */
  enforcement?: "DropUnencrypted" | "AllowUnencrypted";
}

/** Details of PrepareNetworkPolicies for Subnet. */
export interface PrepareNetworkPoliciesRequest {
  /** The name of the service for which subnet is being prepared for. */
  serviceName?: string;
  /** A list of NetworkIntentPolicyConfiguration. */
  networkIntentPolicyConfigurations?: Array<NetworkIntentPolicyConfiguration>;
}

/** Details of NetworkIntentPolicyConfiguration for PrepareNetworkPoliciesRequest. */
export interface NetworkIntentPolicyConfiguration {
  /** The name of the Network Intent Policy for storing in target subscription. */
  networkIntentPolicyName?: string;
  /** Source network intent policy. */
  sourceNetworkIntentPolicy?: NetworkIntentPolicy;
}

/** Network Intent Policy resource. */
export interface NetworkIntentPolicy extends Resource {
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Details of UnprepareNetworkPolicies for Subnet. */
export interface UnprepareNetworkPoliciesRequest {
  /** The name of the service for which subnet is being unprepared for. */
  serviceName?: string;
}

/** A common class for general resource information. */
export interface VirtualNetworkGateway extends Resource {
  /** Properties of the virtual network gateway. */
  properties: VirtualNetworkGatewayPropertiesFormat;
  /** The extended location of type local virtual network gateway. */
  extendedLocation?: ExtendedLocation;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** VirtualNetworkGateway properties. */
export interface VirtualNetworkGatewayPropertiesFormat {
  /** IP configurations for virtual network gateway. */
  ipConfigurations?: Array<VirtualNetworkGatewayIPConfiguration>;
  /** The type of this virtual network gateway. */
  gatewayType?: "Vpn" | "ExpressRoute" | "LocalGateway";
  /** The type of this virtual network gateway. */
  vpnType?: "PolicyBased" | "RouteBased";
  /** The generation for this VirtualNetworkGateway. Must be None if gatewayType is not VPN. */
  vpnGatewayGeneration?: "None" | "Generation1" | "Generation2";
  /** Whether BGP is enabled for this virtual network gateway or not. */
  enableBgp?: boolean;
  /** Whether private IP needs to be enabled on this gateway for connections or not. */
  enablePrivateIpAddress?: boolean;
  /** ActiveActive flag. */
  activeActive?: boolean;
  /** disableIPSecReplayProtection flag. */
  disableIPSecReplayProtection?: boolean;
  /** The reference to the LocalNetworkGateway resource which represents local network site having default routes. Assign Null value in case of removing existing default site setting. */
  gatewayDefaultSite?: SubResource;
  /** The reference to the VirtualNetworkGatewaySku resource which represents the SKU selected for Virtual network gateway. */
  sku?: VirtualNetworkGatewaySku;
  /** The reference to the VpnClientConfiguration resource which represents the P2S VpnClient configurations. */
  vpnClientConfiguration?: VpnClientConfiguration;
  /** The reference to the VirtualNetworkGatewayPolicyGroup resource which represents the available VirtualNetworkGatewayPolicyGroup for the gateway. */
  virtualNetworkGatewayPolicyGroups?: Array<VirtualNetworkGatewayPolicyGroup>;
  /** Virtual network gateway's BGP speaker settings. */
  bgpSettings?: BgpSettings;
  /** The reference to the address space resource which represents the custom routes address space specified by the customer for virtual network gateway and VpnClient. */
  customRoutes?: AddressSpace;
  /** The resource GUID property of the virtual network gateway resource. */
  resourceGuid?: string;
  /** The provisioning state of the virtual network gateway resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Whether dns forwarding is enabled or not. */
  enableDnsForwarding?: boolean;
  /** The IP address allocated by the gateway to which dns requests can be sent. */
  inboundDnsForwardingEndpoint?: string;
  /** Customer vnet resource id. VirtualNetworkGateway of type local gateway is associated with the customer vnet. */
  vNetExtendedLocationResourceId?: string;
  /** NatRules for virtual network gateway. */
  natRules?: Array<VirtualNetworkGatewayNatRule>;
  /** EnableBgpRouteTranslationForNat flag. */
  enableBgpRouteTranslationForNat?: boolean;
}

/** IP configuration for virtual network gateway. */
export interface VirtualNetworkGatewayIPConfiguration extends SubResource {
  /** Properties of the virtual network gateway ip configuration. */
  properties?: VirtualNetworkGatewayIPConfigurationPropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of VirtualNetworkGatewayIPConfiguration. */
export interface VirtualNetworkGatewayIPConfigurationPropertiesFormat {
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: "Static" | "Dynamic";
  /** The reference to the subnet resource. */
  subnet?: SubResource;
  /** The reference to the public IP resource. */
  publicIPAddress?: SubResource;
  /** Private IP Address for this gateway. */
  privateIPAddress?: string;
  /** The provisioning state of the virtual network gateway IP configuration resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** VirtualNetworkGatewaySku details. */
export interface VirtualNetworkGatewaySku {
  /** Gateway SKU name. */
  name?:
    | "Basic"
    | "HighPerformance"
    | "Standard"
    | "UltraPerformance"
    | "VpnGw1"
    | "VpnGw2"
    | "VpnGw3"
    | "VpnGw4"
    | "VpnGw5"
    | "VpnGw1AZ"
    | "VpnGw2AZ"
    | "VpnGw3AZ"
    | "VpnGw4AZ"
    | "VpnGw5AZ"
    | "ErGw1AZ"
    | "ErGw2AZ"
    | "ErGw3AZ";
  /** Gateway SKU tier. */
  tier?:
    | "Basic"
    | "HighPerformance"
    | "Standard"
    | "UltraPerformance"
    | "VpnGw1"
    | "VpnGw2"
    | "VpnGw3"
    | "VpnGw4"
    | "VpnGw5"
    | "VpnGw1AZ"
    | "VpnGw2AZ"
    | "VpnGw3AZ"
    | "VpnGw4AZ"
    | "VpnGw5AZ"
    | "ErGw1AZ"
    | "ErGw2AZ"
    | "ErGw3AZ";
  /** The capacity. */
  capacity?: number;
}

/** VpnClientConfiguration for P2S client. */
export interface VpnClientConfiguration {
  /** The reference to the address space resource which represents Address space for P2S VpnClient. */
  vpnClientAddressPool?: AddressSpace;
  /** VpnClientRootCertificate for virtual network gateway. */
  vpnClientRootCertificates?: Array<VpnClientRootCertificate>;
  /** VpnClientRevokedCertificate for Virtual network gateway. */
  vpnClientRevokedCertificates?: Array<VpnClientRevokedCertificate>;
  /** VpnClientProtocols for Virtual network gateway. */
  vpnClientProtocols?: Array<"IkeV2" | "SSTP" | "OpenVPN">;
  /** VPN authentication types for the virtual network gateway.. */
  vpnAuthenticationTypes?: Array<"Certificate" | "Radius" | "AAD">;
  /** VpnClientIpsecPolicies for virtual network gateway P2S client. */
  vpnClientIpsecPolicies?: Array<IpsecPolicy>;
  /** The radius server address property of the VirtualNetworkGateway resource for vpn client connection. */
  radiusServerAddress?: string;
  /** The radius secret property of the VirtualNetworkGateway resource for vpn client connection. */
  radiusServerSecret?: string;
  /** The radiusServers property for multiple radius server configuration. */
  radiusServers?: Array<RadiusServer>;
  /** The AADTenant property of the VirtualNetworkGateway resource for vpn client connection used for AAD authentication. */
  aadTenant?: string;
  /** The AADAudience property of the VirtualNetworkGateway resource for vpn client connection used for AAD authentication. */
  aadAudience?: string;
  /** The AADIssuer property of the VirtualNetworkGateway resource for vpn client connection used for AAD authentication. */
  aadIssuer?: string;
  /** per ip address pool connection policy for virtual network gateway P2S client. */
  vngClientConnectionConfigurations?: Array<VngClientConnectionConfiguration>;
}

/** VPN client root certificate of virtual network gateway. */
export interface VpnClientRootCertificate extends SubResource {
  /** Properties of the vpn client root certificate. */
  properties: VpnClientRootCertificatePropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of SSL certificates of application gateway. */
export interface VpnClientRootCertificatePropertiesFormat {
  /** The certificate public data. */
  publicCertData: string;
  /** The provisioning state of the VPN client root certificate resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** VPN client revoked certificate of virtual network gateway. */
export interface VpnClientRevokedCertificate extends SubResource {
  /** Properties of the vpn client revoked certificate. */
  properties?: VpnClientRevokedCertificatePropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of the revoked VPN client certificate of virtual network gateway. */
export interface VpnClientRevokedCertificatePropertiesFormat {
  /** The revoked VPN client certificate thumbprint. */
  thumbprint?: string;
  /** The provisioning state of the VPN client revoked certificate resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** An IPSec Policy configuration for a virtual network gateway connection. */
export interface IpsecPolicy {
  /** The IPSec Security Association (also called Quick Mode or Phase 2 SA) lifetime in seconds for a site to site VPN tunnel. */
  saLifeTimeSeconds: number;
  /** The IPSec Security Association (also called Quick Mode or Phase 2 SA) payload size in KB for a site to site VPN tunnel. */
  saDataSizeKilobytes: number;
  /** The IPSec encryption algorithm (IKE phase 1). */
  ipsecEncryption:
    | "None"
    | "DES"
    | "DES3"
    | "AES128"
    | "AES192"
    | "AES256"
    | "GCMAES128"
    | "GCMAES192"
    | "GCMAES256";
  /** The IPSec integrity algorithm (IKE phase 1). */
  ipsecIntegrity: "MD5" | "SHA1" | "SHA256" | "GCMAES128" | "GCMAES192" | "GCMAES256";
  /** The IKE encryption algorithm (IKE phase 2). */
  ikeEncryption: "DES" | "DES3" | "AES128" | "AES192" | "AES256" | "GCMAES256" | "GCMAES128";
  /** The IKE integrity algorithm (IKE phase 2). */
  ikeIntegrity: "MD5" | "SHA1" | "SHA256" | "SHA384" | "GCMAES256" | "GCMAES128";
  /** The DH Group used in IKE Phase 1 for initial SA. */
  dhGroup:
    | "None"
    | "DHGroup1"
    | "DHGroup2"
    | "DHGroup14"
    | "DHGroup2048"
    | "ECP256"
    | "ECP384"
    | "DHGroup24";
  /** The Pfs Group used in IKE Phase 2 for new child SA. */
  pfsGroup:
    | "None"
    | "PFS1"
    | "PFS2"
    | "PFS2048"
    | "ECP256"
    | "ECP384"
    | "PFS24"
    | "PFS14"
    | "PFSMM";
}

/** Radius Server Settings. */
export interface RadiusServer {
  /** The address of this radius server. */
  radiusServerAddress: string;
  /** The initial score assigned to this radius server. */
  radiusServerScore?: number;
  /** The secret used for this radius server. */
  radiusServerSecret?: string;
}

/** A vpn client connection configuration for client connection configuration. */
export interface VngClientConnectionConfiguration extends SubResource {
  /** Properties of the vpn client root certificate. */
  properties?: VngClientConnectionConfigurationProperties;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of VngClientConnectionConfiguration. */
export interface VngClientConnectionConfigurationProperties {
  /** The reference to the address space resource which represents Address space for P2S VpnClient. */
  vpnClientAddressPool: AddressSpace;
  /** List of references to virtualNetworkGatewayPolicyGroups */
  virtualNetworkGatewayPolicyGroups: Array<SubResource>;
  /** The provisioning state of the VngClientConnectionConfiguration resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Parameters for VirtualNetworkGatewayPolicyGroup. */
export interface VirtualNetworkGatewayPolicyGroup extends SubResource {
  /** Properties of tVirtualNetworkGatewayPolicyGroup. */
  properties?: VirtualNetworkGatewayPolicyGroupProperties;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of VirtualNetworkGatewayPolicyGroup. */
export interface VirtualNetworkGatewayPolicyGroupProperties {
  /** Shows if this is a Default VirtualNetworkGatewayPolicyGroup or not. */
  isDefault: boolean;
  /** Priority for VirtualNetworkGatewayPolicyGroup. */
  priority: number;
  /** Multiple PolicyMembers for VirtualNetworkGatewayPolicyGroup. */
  policyMembers: Array<VirtualNetworkGatewayPolicyGroupMember>;
  /** List of references to vngClientConnectionConfigurations. */
  vngClientConnectionConfigurations?: Array<SubResource>;
  /** The provisioning state of the VirtualNetworkGatewayPolicyGroup resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Vpn Client Connection configuration PolicyGroup member */
export interface VirtualNetworkGatewayPolicyGroupMember {
  /** Name of the VirtualNetworkGatewayPolicyGroupMember. */
  name?: string;
  /** The Vpn Policy member attribute type. */
  attributeType?: "CertificateGroupId" | "AADGroupId" | "RadiusAzureGroupId";
  /** The value of Attribute used for this VirtualNetworkGatewayPolicyGroupMember. */
  attributeValue?: string;
}

/** BGP settings details. */
export interface BgpSettings {
  /** The BGP speaker's ASN. */
  asn?: number;
  /** The BGP peering address and BGP identifier of this BGP speaker. */
  bgpPeeringAddress?: string;
  /** The weight added to routes learned from this BGP speaker. */
  peerWeight?: number;
  /** BGP peering address with IP configuration ID for virtual network gateway. */
  bgpPeeringAddresses?: Array<IPConfigurationBgpPeeringAddress>;
}

/** Properties of IPConfigurationBgpPeeringAddress. */
export interface IPConfigurationBgpPeeringAddress {
  /** The ID of IP configuration which belongs to gateway. */
  ipconfigurationId?: string;
  /** The list of default BGP peering addresses which belong to IP configuration. */
  defaultBgpIpAddresses?: Array<string>;
  /** The list of custom BGP peering addresses which belong to IP configuration. */
  customBgpIpAddresses?: Array<string>;
  /** The list of tunnel public IP addresses which belong to IP configuration. */
  tunnelIpAddresses?: Array<string>;
}

/** VirtualNetworkGatewayNatRule Resource. */
export interface VirtualNetworkGatewayNatRule extends SubResource {
  /** Properties of the Virtual Network Gateway NAT rule. */
  properties?: VirtualNetworkGatewayNatRuleProperties;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Resource type. */
  type?: string;
}

/** Parameters for VirtualNetworkGatewayNatRule. */
export interface VirtualNetworkGatewayNatRuleProperties {
  /** The provisioning state of the NAT Rule resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The type of NAT rule for VPN NAT. */
  type?: "Static" | "Dynamic";
  /** The Source NAT direction of a VPN NAT. */
  mode?: "EgressSnat" | "IngressSnat";
  /** The private IP address internal mapping for NAT. */
  internalMappings?: Array<VpnNatRuleMapping>;
  /** The private IP address external mapping for NAT. */
  externalMappings?: Array<VpnNatRuleMapping>;
  /** The IP Configuration ID this NAT rule applies to. */
  ipConfigurationId?: string;
}

/** Vpn NatRule mapping. */
export interface VpnNatRuleMapping {
  /** Address space for Vpn NatRule mapping. */
  addressSpace?: string;
  /** Port range for Vpn NatRule mapping. */
  portRange?: string;
}

/** A common class for general resource information. */
export interface VirtualNetworkGatewayConnectionListEntity extends Resource {
  /** Properties of the virtual network gateway connection. */
  properties: VirtualNetworkGatewayConnectionListEntityPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** VirtualNetworkGatewayConnection properties. */
export interface VirtualNetworkGatewayConnectionListEntityPropertiesFormat {
  /** The authorizationKey. */
  authorizationKey?: string;
  /** The reference to virtual network gateway resource. */
  virtualNetworkGateway1: VirtualNetworkConnectionGatewayReference;
  /** The reference to virtual network gateway resource. */
  virtualNetworkGateway2?: VirtualNetworkConnectionGatewayReference;
  /** The reference to local network gateway resource. */
  localNetworkGateway2?: VirtualNetworkConnectionGatewayReference;
  /** Gateway connection type. */
  connectionType: "IPsec" | "Vnet2Vnet" | "ExpressRoute" | "VPNClient";
  /** Connection protocol used for this connection. */
  connectionProtocol?: "IKEv2" | "IKEv1";
  /** The routing weight. */
  routingWeight?: number;
  /** The connection mode for this connection. */
  connectionMode?: "Default" | "ResponderOnly" | "InitiatorOnly";
  /** The IPSec shared key. */
  sharedKey?: string;
  /** Virtual Network Gateway connection status. */
  connectionStatus?: "Unknown" | "Connecting" | "Connected" | "NotConnected";
  /** Collection of all tunnels' connection health status. */
  tunnelConnectionStatus?: Array<TunnelConnectionHealth>;
  /** The egress bytes transferred in this connection. */
  egressBytesTransferred?: number;
  /** The ingress bytes transferred in this connection. */
  ingressBytesTransferred?: number;
  /** The reference to peerings resource. */
  peer?: SubResource;
  /** EnableBgp flag. */
  enableBgp?: boolean;
  /** GatewayCustomBgpIpAddresses to be used for virtual network gateway Connection. */
  gatewayCustomBgpIpAddresses?: Array<GatewayCustomBgpIpAddressIpConfiguration>;
  /** Enable policy-based traffic selectors. */
  usePolicyBasedTrafficSelectors?: boolean;
  /** The IPSec Policies to be considered by this connection. */
  ipsecPolicies?: Array<IpsecPolicy>;
  /** The Traffic Selector Policies to be considered by this connection. */
  trafficSelectorPolicies?: Array<TrafficSelectorPolicy>;
  /** The resource GUID property of the virtual network gateway connection resource. */
  resourceGuid?: string;
  /** The provisioning state of the virtual network gateway connection resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Bypass ExpressRoute Gateway for data forwarding. */
  expressRouteGatewayBypass?: boolean;
  /** Bypass the ExpressRoute gateway when accessing private-links. ExpressRoute FastPath (expressRouteGatewayBypass) must be enabled. */
  enablePrivateLinkFastPath?: boolean;
}

/** A reference to VirtualNetworkGateway or LocalNetworkGateway resource. */
export interface VirtualNetworkConnectionGatewayReference {
  /** The ID of VirtualNetworkGateway or LocalNetworkGateway resource. */
  id: string;
}

/** VirtualNetworkGatewayConnection properties. */
export interface TunnelConnectionHealth {
  /** Tunnel name. */
  tunnel?: string;
  /** Virtual Network Gateway connection status. */
  connectionStatus?: "Unknown" | "Connecting" | "Connected" | "NotConnected";
  /** The Ingress Bytes Transferred in this connection. */
  ingressBytesTransferred?: number;
  /** The Egress Bytes Transferred in this connection. */
  egressBytesTransferred?: number;
  /** The time at which connection was established in Utc format. */
  lastConnectionEstablishedUtcTime?: string;
}

/** GatewayCustomBgpIpAddressIpConfiguration for a virtual network gateway connection. */
export interface GatewayCustomBgpIpAddressIpConfiguration {
  /** The IpconfigurationId of ipconfiguration which belongs to gateway. */
  ipConfigurationId: string;
  /** The custom BgpPeeringAddress which belongs to IpconfigurationId. */
  customBgpIpAddress: string;
}

/** An traffic selector policy for a virtual network gateway connection. */
export interface TrafficSelectorPolicy {
  /** A collection of local address spaces in CIDR format. */
  localAddressRanges: Array<string>;
  /** A collection of remote address spaces in CIDR format. */
  remoteAddressRanges: Array<string>;
}

/** Vpn Client Parameters for package generation. */
export interface VpnClientParameters {
  /** VPN client Processor Architecture. */
  processorArchitecture?: "Amd64" | "X86";
  /** VPN client authentication method. */
  authenticationMethod?: "EAPTLS" | "EAPMSCHAPv2";
  /** The public certificate data for the radius server authentication certificate as a Base-64 encoded string. Required only if external radius authentication has been configured with EAPTLS authentication. */
  radiusServerAuthCertificate?: string;
  /** A list of client root certificates public certificate data encoded as Base-64 strings. Optional parameter for external radius based authentication with EAPTLS. */
  clientRootCertificates?: Array<string>;
}

/** An IPSec parameters for a virtual network gateway P2S connection. */
export interface VpnClientIPsecParameters {
  /** The IPSec Security Association (also called Quick Mode or Phase 2 SA) lifetime in seconds for P2S client. */
  saLifeTimeSeconds: number;
  /** The IPSec Security Association (also called Quick Mode or Phase 2 SA) payload size in KB for P2S client.. */
  saDataSizeKilobytes: number;
  /** The IPSec encryption algorithm (IKE phase 1). */
  ipsecEncryption:
    | "None"
    | "DES"
    | "DES3"
    | "AES128"
    | "AES192"
    | "AES256"
    | "GCMAES128"
    | "GCMAES192"
    | "GCMAES256";
  /** The IPSec integrity algorithm (IKE phase 1). */
  ipsecIntegrity: "MD5" | "SHA1" | "SHA256" | "GCMAES128" | "GCMAES192" | "GCMAES256";
  /** The IKE encryption algorithm (IKE phase 2). */
  ikeEncryption: "DES" | "DES3" | "AES128" | "AES192" | "AES256" | "GCMAES256" | "GCMAES128";
  /** The IKE integrity algorithm (IKE phase 2). */
  ikeIntegrity: "MD5" | "SHA1" | "SHA256" | "SHA384" | "GCMAES256" | "GCMAES128";
  /** The DH Group used in IKE Phase 1 for initial SA. */
  dhGroup:
    | "None"
    | "DHGroup1"
    | "DHGroup2"
    | "DHGroup14"
    | "DHGroup2048"
    | "ECP256"
    | "ECP384"
    | "DHGroup24";
  /** The Pfs Group used in IKE Phase 2 for new child SA. */
  pfsGroup:
    | "None"
    | "PFS1"
    | "PFS2"
    | "PFS2048"
    | "ECP256"
    | "ECP384"
    | "PFS24"
    | "PFS14"
    | "PFSMM";
}

/** Vpn device configuration script generation parameters. */
export interface VpnDeviceScriptParameters {
  /** The vendor for the vpn device. */
  vendor?: string;
  /** The device family for the vpn device. */
  deviceFamily?: string;
  /** The firmware version for the vpn device. */
  firmwareVersion?: string;
}

/** Start packet capture parameters on virtual network gateway. */
export interface VpnPacketCaptureStartParameters {
  /** Start Packet capture parameters. */
  filterData?: string;
}

/** Stop packet capture parameters. */
export interface VpnPacketCaptureStopParameters {
  /** SAS url for packet capture on virtual network gateway. */
  sasUrl?: string;
}

/** A common class for general resource information. */
export interface VirtualNetworkGatewayConnection extends Resource {
  /** Properties of the virtual network gateway connection. */
  properties: VirtualNetworkGatewayConnectionPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** VirtualNetworkGatewayConnection properties. */
export interface VirtualNetworkGatewayConnectionPropertiesFormat {
  /** The authorizationKey. */
  authorizationKey?: string;
  /** The reference to virtual network gateway resource. */
  virtualNetworkGateway1: VirtualNetworkGateway;
  /** The reference to virtual network gateway resource. */
  virtualNetworkGateway2?: VirtualNetworkGateway;
  /** The reference to local network gateway resource. */
  localNetworkGateway2?: LocalNetworkGateway;
  /** List of ingress NatRules. */
  ingressNatRules?: Array<SubResource>;
  /** List of egress NatRules. */
  egressNatRules?: Array<SubResource>;
  /** Gateway connection type. */
  connectionType: "IPsec" | "Vnet2Vnet" | "ExpressRoute" | "VPNClient";
  /** Connection protocol used for this connection. */
  connectionProtocol?: "IKEv2" | "IKEv1";
  /** The routing weight. */
  routingWeight?: number;
  /** The dead peer detection timeout of this connection in seconds. */
  dpdTimeoutSeconds?: number;
  /** The connection mode for this connection. */
  connectionMode?: "Default" | "ResponderOnly" | "InitiatorOnly";
  /** The IPSec shared key. */
  sharedKey?: string;
  /** Virtual Network Gateway connection status. */
  connectionStatus?: "Unknown" | "Connecting" | "Connected" | "NotConnected";
  /** Collection of all tunnels' connection health status. */
  tunnelConnectionStatus?: Array<TunnelConnectionHealth>;
  /** The egress bytes transferred in this connection. */
  egressBytesTransferred?: number;
  /** The ingress bytes transferred in this connection. */
  ingressBytesTransferred?: number;
  /** The reference to peerings resource. */
  peer?: SubResource;
  /** EnableBgp flag. */
  enableBgp?: boolean;
  /** GatewayCustomBgpIpAddresses to be used for virtual network gateway Connection. */
  gatewayCustomBgpIpAddresses?: Array<GatewayCustomBgpIpAddressIpConfiguration>;
  /** Use private local Azure IP for the connection. */
  useLocalAzureIpAddress?: boolean;
  /** Enable policy-based traffic selectors. */
  usePolicyBasedTrafficSelectors?: boolean;
  /** The IPSec Policies to be considered by this connection. */
  ipsecPolicies?: Array<IpsecPolicy>;
  /** The Traffic Selector Policies to be considered by this connection. */
  trafficSelectorPolicies?: Array<TrafficSelectorPolicy>;
  /** The resource GUID property of the virtual network gateway connection resource. */
  resourceGuid?: string;
  /** The provisioning state of the virtual network gateway connection resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Bypass ExpressRoute Gateway for data forwarding. */
  expressRouteGatewayBypass?: boolean;
  /** Bypass the ExpressRoute gateway when accessing private-links. ExpressRoute FastPath (expressRouteGatewayBypass) must be enabled. */
  enablePrivateLinkFastPath?: boolean;
}

/** A common class for general resource information. */
export interface LocalNetworkGateway extends Resource {
  /** Properties of the local network gateway. */
  properties: LocalNetworkGatewayPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** LocalNetworkGateway properties. */
export interface LocalNetworkGatewayPropertiesFormat {
  /** Local network site address space. */
  localNetworkAddressSpace?: AddressSpace;
  /** IP address of local network gateway. */
  gatewayIpAddress?: string;
  /** FQDN of local network gateway. */
  fqdn?: string;
  /** Local network gateway's BGP speaker settings. */
  bgpSettings?: BgpSettings;
  /** The resource GUID property of the local network gateway resource. */
  resourceGuid?: string;
  /** The provisioning state of the local network gateway resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Response for GetConnectionSharedKey API service call. */
export interface ConnectionSharedKey extends SubResource {
  /** The virtual network connection shared key value. */
  value: string;
}

/** The virtual network connection reset shared key. */
export interface ConnectionResetSharedKey {
  /** The virtual network connection reset shared key length, should between 1 and 128. */
  keyLength: number;
}

/** List of p2s vpn connections to be disconnected. */
export interface P2SVpnConnectionRequest {
  /** List of p2s vpn connection Ids. */
  vpnConnectionIds?: Array<string>;
}

/** VirtualRouter Resource. */
export interface VirtualRouter extends Resource {
  /** Properties of the Virtual Router. */
  properties?: VirtualRouterPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Virtual Router definition. */
export interface VirtualRouterPropertiesFormat {
  /** VirtualRouter ASN. */
  virtualRouterAsn?: number;
  /** VirtualRouter IPs. */
  virtualRouterIps?: Array<string>;
  /** The Subnet on which VirtualRouter is hosted. */
  hostedSubnet?: SubResource;
  /** The Gateway on which VirtualRouter is hosted. */
  hostedGateway?: SubResource;
  /** List of references to VirtualRouterPeerings. */
  peerings?: Array<SubResource>;
  /** The provisioning state of the resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Virtual Router Peering resource. */
export interface VirtualRouterPeering extends SubResource {
  /** The properties of the Virtual Router Peering. */
  properties?: VirtualRouterPeeringProperties;
  /** Name of the virtual router peering that is unique within a virtual router. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Peering type. */
  type?: string;
}

/** Properties of the rule group. */
export interface VirtualRouterPeeringProperties {
  /** Peer ASN. */
  peerAsn?: number;
  /** Peer IP. */
  peerIp?: string;
  /** The provisioning state of the resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** VirtualWAN Resource. */
export interface VirtualWAN extends Resource {
  /** Properties of the virtual WAN. */
  properties?: VirtualWanProperties;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Parameters for VirtualWAN. */
export interface VirtualWanProperties {
  /** Vpn encryption to be disabled or not. */
  disableVpnEncryption?: boolean;
  /** List of VirtualHubs in the VirtualWAN. */
  virtualHubs?: Array<SubResource>;
  /** List of VpnSites in the VirtualWAN. */
  vpnSites?: Array<SubResource>;
  /** True if branch to branch traffic is allowed. */
  allowBranchToBranchTraffic?: boolean;
  /** True if Vnet to Vnet traffic is allowed. */
  allowVnetToVnetTraffic?: boolean;
  /** The office local breakout category. */
  office365LocalBreakoutCategory?: "Optimize" | "OptimizeAndAllow" | "All" | "None";
  /** The provisioning state of the virtual WAN resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The type of the VirtualWAN. */
  type?: string;
}

/** VpnSite Resource. */
export interface VpnSite extends Resource {
  /** Properties of the VPN site. */
  properties?: VpnSiteProperties;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Parameters for VpnSite. */
export interface VpnSiteProperties {
  /** The VirtualWAN to which the vpnSite belongs. */
  virtualWan?: SubResource;
  /** The device properties. */
  deviceProperties?: DeviceProperties;
  /** The ip-address for the vpn-site. */
  ipAddress?: string;
  /** The key for vpn-site that can be used for connections. */
  siteKey?: string;
  /** The AddressSpace that contains an array of IP address ranges. */
  addressSpace?: AddressSpace;
  /** The set of bgp properties. */
  bgpProperties?: BgpSettings;
  /** The provisioning state of the VPN site resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** IsSecuritySite flag. */
  isSecuritySite?: boolean;
  /** List of all vpn site links. */
  vpnSiteLinks?: Array<VpnSiteLink>;
  /** Office365 Policy. */
  o365Policy?: O365PolicyProperties;
}

/** List of properties of the device. */
export interface DeviceProperties {
  /** Name of the device Vendor. */
  deviceVendor?: string;
  /** Model of the device. */
  deviceModel?: string;
  /** Link speed. */
  linkSpeedInMbps?: number;
}

/** VpnSiteLink Resource. */
export interface VpnSiteLink extends SubResource {
  /** Properties of the VPN site link. */
  properties?: VpnSiteLinkProperties;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** Resource type. */
  type?: string;
}

/** Parameters for VpnSite. */
export interface VpnSiteLinkProperties {
  /** The link provider properties. */
  linkProperties?: VpnLinkProviderProperties;
  /** The ip-address for the vpn-site-link. */
  ipAddress?: string;
  /** FQDN of vpn-site-link. */
  fqdn?: string;
  /** The set of bgp properties. */
  bgpProperties?: VpnLinkBgpSettings;
  /** The provisioning state of the VPN site link resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** List of properties of a link provider. */
export interface VpnLinkProviderProperties {
  /** Name of the link provider. */
  linkProviderName?: string;
  /** Link speed. */
  linkSpeedInMbps?: number;
}

/** BGP settings details for a link. */
export interface VpnLinkBgpSettings {
  /** The BGP speaker's ASN. */
  asn?: number;
  /** The BGP peering address and BGP identifier of this BGP speaker. */
  bgpPeeringAddress?: string;
}

/** The Office365 breakout policy. */
export interface O365PolicyProperties {
  /** Office365 breakout categories. */
  breakOutCategories?: O365BreakOutCategoryPolicies;
}

/** Office365 breakout categories. */
export interface O365BreakOutCategoryPolicies {
  /** Flag to control allow category. */
  allow?: boolean;
  /** Flag to control optimize category. */
  optimize?: boolean;
  /** Flag to control default category. */
  default?: boolean;
}

/** List of Vpn-Sites. */
export interface GetVpnSitesConfigurationRequest {
  /** List of resource-ids of the vpn-sites for which config is to be downloaded. */
  vpnSites?: Array<string>;
  /** The sas-url to download the configurations for vpn-sites. */
  outputBlobSasUrl: string;
}

/** VpnServerConfiguration Resource. */
export interface VpnServerConfiguration extends Resource {
  /** Properties of the P2SVpnServer configuration. */
  properties?: VpnServerConfigurationProperties;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Parameters for VpnServerConfiguration. */
export interface VpnServerConfigurationProperties {
  /** The name of the VpnServerConfiguration that is unique within a resource group. */
  name?: string;
  /** VPN protocols for the VpnServerConfiguration. */
  vpnProtocols?: Array<"IkeV2" | "OpenVPN">;
  /** VPN authentication types for the VpnServerConfiguration. */
  vpnAuthenticationTypes?: Array<"Certificate" | "Radius" | "AAD">;
  /** VPN client root certificate of VpnServerConfiguration. */
  vpnClientRootCertificates?: Array<VpnServerConfigVpnClientRootCertificate>;
  /** VPN client revoked certificate of VpnServerConfiguration. */
  vpnClientRevokedCertificates?: Array<VpnServerConfigVpnClientRevokedCertificate>;
  /** Radius Server root certificate of VpnServerConfiguration. */
  radiusServerRootCertificates?: Array<VpnServerConfigRadiusServerRootCertificate>;
  /** Radius client root certificate of VpnServerConfiguration. */
  radiusClientRootCertificates?: Array<VpnServerConfigRadiusClientRootCertificate>;
  /** VpnClientIpsecPolicies for VpnServerConfiguration. */
  vpnClientIpsecPolicies?: Array<IpsecPolicy>;
  /** The radius server address property of the VpnServerConfiguration resource for point to site client connection. */
  radiusServerAddress?: string;
  /** The radius secret property of the VpnServerConfiguration resource for point to site client connection. */
  radiusServerSecret?: string;
  /** Multiple Radius Server configuration for VpnServerConfiguration. */
  radiusServers?: Array<RadiusServer>;
  /** The set of aad vpn authentication parameters. */
  aadAuthenticationParameters?: AadAuthenticationParameters;
  /** The provisioning state of the VpnServerConfiguration resource. Possible values are: 'Updating', 'Deleting', and 'Failed'. */
  provisioningState?: string;
  /** List of references to P2SVpnGateways. */
  p2SVpnGateways?: Array<P2SVpnGateway>;
  /** List of all VpnServerConfigurationPolicyGroups. */
  configurationPolicyGroups?: Array<VpnServerConfigurationPolicyGroup>;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Properties of VPN client root certificate of VpnServerConfiguration. */
export interface VpnServerConfigVpnClientRootCertificate {
  /** The certificate name. */
  name?: string;
  /** The certificate public data. */
  publicCertData?: string;
}

/** Properties of the revoked VPN client certificate of VpnServerConfiguration. */
export interface VpnServerConfigVpnClientRevokedCertificate {
  /** The certificate name. */
  name?: string;
  /** The revoked VPN client certificate thumbprint. */
  thumbprint?: string;
}

/** Properties of Radius Server root certificate of VpnServerConfiguration. */
export interface VpnServerConfigRadiusServerRootCertificate {
  /** The certificate name. */
  name?: string;
  /** The certificate public data. */
  publicCertData?: string;
}

/** Properties of the Radius client root certificate of VpnServerConfiguration. */
export interface VpnServerConfigRadiusClientRootCertificate {
  /** The certificate name. */
  name?: string;
  /** The Radius client root certificate thumbprint. */
  thumbprint?: string;
}

/** AAD Vpn authentication type related parameters. */
export interface AadAuthenticationParameters {
  /** AAD Vpn authentication parameter AAD tenant. */
  aadTenant?: string;
  /** AAD Vpn authentication parameter AAD audience. */
  aadAudience?: string;
  /** AAD Vpn authentication parameter AAD issuer. */
  aadIssuer?: string;
}

/** P2SVpnGateway Resource. */
export interface P2SVpnGateway extends Resource {
  /** Properties of the P2SVpnGateway. */
  properties?: P2SVpnGatewayProperties;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Parameters for P2SVpnGateway. */
export interface P2SVpnGatewayProperties {
  /** The VirtualHub to which the gateway belongs. */
  virtualHub?: SubResource;
  /** List of all p2s connection configurations of the gateway. */
  p2SConnectionConfigurations?: Array<P2SConnectionConfiguration>;
  /** The provisioning state of the P2S VPN gateway resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The scale unit for this p2s vpn gateway. */
  vpnGatewayScaleUnit?: number;
  /** The VpnServerConfiguration to which the p2sVpnGateway is attached to. */
  vpnServerConfiguration?: SubResource;
  /** All P2S VPN clients' connection health status. */
  vpnClientConnectionHealth?: VpnClientConnectionHealth;
  /** List of all customer specified DNS servers IP addresses. */
  customDnsServers?: Array<string>;
  /** Enable Routing Preference property for the Public IP Interface of the P2SVpnGateway. */
  isRoutingPreferenceInternet?: boolean;
}

/** P2SConnectionConfiguration Resource. */
export interface P2SConnectionConfiguration extends SubResource {
  /** Properties of the P2S connection configuration. */
  properties?: P2SConnectionConfigurationProperties;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Parameters for P2SConnectionConfiguration. */
export interface P2SConnectionConfigurationProperties {
  /** The reference to the address space resource which represents Address space for P2S VpnClient. */
  vpnClientAddressPool?: AddressSpace;
  /** The Routing Configuration indicating the associated and propagated route tables on this connection. */
  routingConfiguration?: RoutingConfiguration;
  /** Flag indicating whether the enable internet security flag is turned on for the P2S Connections or not. */
  enableInternetSecurity?: boolean;
  /** List of Configuration Policy Groups that this P2SConnectionConfiguration is attached to. */
  configurationPolicyGroupAssociations?: Array<SubResource>;
  /** List of previous Configuration Policy Groups that this P2SConnectionConfiguration was attached to. */
  previousConfigurationPolicyGroupAssociations?: Array<VpnServerConfigurationPolicyGroup>;
  /** The provisioning state of the P2SConnectionConfiguration resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Routing Configuration indicating the associated and propagated route tables for this connection. */
export interface RoutingConfiguration {
  /** The resource id RouteTable associated with this RoutingConfiguration. */
  associatedRouteTable?: SubResource;
  /** The list of RouteTables to advertise the routes to. */
  propagatedRouteTables?: PropagatedRouteTable;
  /** List of routes that control routing from VirtualHub into a virtual network connection. */
  vnetRoutes?: VnetRoute;
  /** The resource id of the RouteMap associated with this RoutingConfiguration for inbound learned routes. */
  inboundRouteMap?: SubResource;
  /** The resource id of theRouteMap associated with this RoutingConfiguration for outbound advertised routes. */
  outboundRouteMap?: SubResource;
}

/** The list of RouteTables to advertise the routes to. */
export interface PropagatedRouteTable {
  /** The list of labels. */
  labels?: Array<string>;
  /** The list of resource ids of all the RouteTables. */
  ids?: Array<SubResource>;
}

/** List of routes that control routing from VirtualHub into a virtual network connection. */
export interface VnetRoute {
  /** Configuration for static routes on this HubVnetConnection. */
  staticRoutesConfig?: StaticRoutesConfig;
  /** List of all Static Routes. */
  staticRoutes?: Array<StaticRoute>;
  /** The list of references to HubBgpConnection objects. */
  bgpConnections?: Array<SubResource>;
}

/** Configuration for static routes on this HubVnetConnectionConfiguration for static routes on this HubVnetConnection. */
export interface StaticRoutesConfig {
  /** Boolean indicating whether static routes on this connection are automatically propagate to route tables which this connection propagates to. */
  propagateStaticRoutes?: boolean;
  /** Parameter determining whether NVA in spoke vnet is bypassed for traffic with destination in spoke. */
  vnetLocalRouteOverrideCriteria?: "Contains" | "Equal";
}

/** List of all Static Routes. */
export interface StaticRoute {
  /** The name of the StaticRoute that is unique within a VnetRoute. */
  name?: string;
  /** List of all address prefixes. */
  addressPrefixes?: Array<string>;
  /** The ip address of the next hop. */
  nextHopIpAddress?: string;
}

/** VpnServerConfigurationPolicyGroup Resource. */
export interface VpnServerConfigurationPolicyGroup extends SubResource {
  /** Properties of the VpnServerConfigurationPolicyGroup. */
  properties?: VpnServerConfigurationPolicyGroupProperties;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** Resource type. */
  type?: string;
}

/** Parameters for VpnServerConfigurationPolicyGroup. */
export interface VpnServerConfigurationPolicyGroupProperties {
  /** Shows if this is a Default VpnServerConfigurationPolicyGroup or not. */
  isDefault?: boolean;
  /** Priority for VpnServerConfigurationPolicyGroup. */
  priority?: number;
  /** Multiple PolicyMembers for VpnServerConfigurationPolicyGroup. */
  policyMembers?: Array<VpnServerConfigurationPolicyGroupMember>;
  /** List of references to P2SConnectionConfigurations. */
  p2SConnectionConfigurations?: Array<SubResource>;
  /** The provisioning state of the VpnServerConfigurationPolicyGroup resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** VpnServerConfiguration PolicyGroup member */
export interface VpnServerConfigurationPolicyGroupMember {
  /** Name of the VpnServerConfigurationPolicyGroupMember. */
  name?: string;
  /** The Vpn Policy member attribute type. */
  attributeType?: "CertificateGroupId" | "AADGroupId" | "RadiusAzureGroupId";
  /** The value of Attribute used for this VpnServerConfigurationPolicyGroupMember. */
  attributeValue?: string;
}

/** VpnClientConnectionHealth properties. */
export interface VpnClientConnectionHealth {
  /** Total of the Ingress Bytes Transferred in this P2S Vpn connection. */
  totalIngressBytesTransferred?: number;
  /** Total of the Egress Bytes Transferred in this connection. */
  totalEgressBytesTransferred?: number;
  /** The total of p2s vpn clients connected at this time to this P2SVpnGateway. */
  vpnClientConnectionsCount?: number;
  /** List of allocated ip addresses to the connected p2s vpn clients. */
  allocatedIpAddresses?: Array<string>;
}

/** VirtualHub Resource. */
export interface VirtualHub extends Resource {
  /** Properties of the virtual hub. */
  properties?: VirtualHubProperties;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Kind of service virtual hub. This is metadata used for the Azure portal experience for Route Server. */
  kind?: string;
}

/** Parameters for VirtualHub. */
export interface VirtualHubProperties {
  /** The VirtualWAN to which the VirtualHub belongs. */
  virtualWan?: SubResource;
  /** The VpnGateway associated with this VirtualHub. */
  vpnGateway?: SubResource;
  /** The P2SVpnGateway associated with this VirtualHub. */
  p2SVpnGateway?: SubResource;
  /** The expressRouteGateway associated with this VirtualHub. */
  expressRouteGateway?: SubResource;
  /** The azureFirewall associated with this VirtualHub. */
  azureFirewall?: SubResource;
  /** The securityPartnerProvider associated with this VirtualHub. */
  securityPartnerProvider?: SubResource;
  /** Address-prefix for this VirtualHub. */
  addressPrefix?: string;
  /** The routeTable associated with this virtual hub. */
  routeTable?: VirtualHubRouteTable;
  /** The provisioning state of the virtual hub resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The Security Provider name. */
  securityProviderName?: string;
  /** List of all virtual hub route table v2s associated with this VirtualHub. */
  virtualHubRouteTableV2s?: Array<VirtualHubRouteTableV2>;
  /** The sku of this VirtualHub. */
  sku?: string;
  /** The routing state. */
  routingState?: "None" | "Provisioned" | "Provisioning" | "Failed";
  /** List of references to Bgp Connections. */
  bgpConnections?: Array<SubResource>;
  /** List of references to IpConfigurations. */
  ipConfigurations?: Array<SubResource>;
  /** List of references to RouteMaps. */
  routeMaps?: Array<SubResource>;
  /** VirtualRouter ASN. */
  virtualRouterAsn?: number;
  /** VirtualRouter IPs. */
  virtualRouterIps?: Array<string>;
  /** Flag to control transit for VirtualRouter hub. */
  allowBranchToBranchTraffic?: boolean;
  /** The preferred gateway to route on-prem traffic */
  preferredRoutingGateway?: "ExpressRoute" | "VpnGateway" | "None";
  /** The hubRoutingPreference of this VirtualHub. */
  hubRoutingPreference?: "ExpressRoute" | "VpnGateway" | "ASPath";
  /** The VirtualHub Router autoscale configuration. */
  virtualRouterAutoScaleConfiguration?: VirtualRouterAutoScaleConfiguration;
}

/** VirtualHub route table. */
export interface VirtualHubRouteTable {
  /** List of all routes. */
  routes?: Array<VirtualHubRoute>;
}

/** VirtualHub route. */
export interface VirtualHubRoute {
  /** List of all addressPrefixes. */
  addressPrefixes?: Array<string>;
  /** NextHop ip address. */
  nextHopIpAddress?: string;
}

/** VirtualHubRouteTableV2 Resource. */
export interface VirtualHubRouteTableV2 extends SubResource {
  /** Properties of the virtual hub route table v2. */
  properties?: VirtualHubRouteTableV2Properties;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Parameters for VirtualHubRouteTableV2. */
export interface VirtualHubRouteTableV2Properties {
  /** List of all routes. */
  routes?: Array<VirtualHubRouteV2>;
  /** List of all connections attached to this route table v2. */
  attachedConnections?: Array<string>;
  /** The provisioning state of the virtual hub route table v2 resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** VirtualHubRouteTableV2 route. */
export interface VirtualHubRouteV2 {
  /** The type of destinations. */
  destinationType?: string;
  /** List of all destinations. */
  destinations?: Array<string>;
  /** The type of next hops. */
  nextHopType?: string;
  /** NextHops ip address. */
  nextHops?: Array<string>;
}

/** The VirtualHub Router autoscale configuration. */
export interface VirtualRouterAutoScaleConfiguration {
  /** The minimum number of scale units for VirtualHub Router. */
  minCapacity?: number;
}

/** The RouteMap child resource of a Virtual hub. */
export interface RouteMap extends SubResource {
  /** Properties of the RouteMap resource. */
  properties?: RouteMapProperties;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Resource type. */
  type?: string;
}

/** Properties of RouteMap resource */
export interface RouteMapProperties {
  /** List of connections which have this RoutMap associated for inbound traffic. */
  associatedInboundConnections?: Array<string>;
  /** List of connections which have this RoutMap associated for outbound traffic. */
  associatedOutboundConnections?: Array<string>;
  /** List of RouteMap rules to be applied. */
  rules?: Array<RouteMapRule>;
  /** The provisioning state of the RouteMap resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** A RouteMap Rule. */
export interface RouteMapRule {
  /** The unique name for the rule. */
  name?: string;
  /** List of matching criterion which will be applied to traffic. */
  matchCriteria?: Array<Criterion>;
  /** List of actions which will be applied on a match. */
  actions?: Array<Action>;
  /** Next step after rule is evaluated. Current supported behaviors are 'Continue'(to next rule) and 'Terminate'. */
  nextStepIfMatched?: "Unknown" | "Continue" | "Terminate";
}

/** A matching criteria which matches routes based on route prefix, community, and AS path. */
export interface Criterion {
  /** List of route prefixes which this criteria matches. */
  routePrefix?: Array<string>;
  /** List of BGP communities which this criteria matches. */
  community?: Array<string>;
  /** List of AS paths which this criteria matches. */
  asPath?: Array<string>;
  /** Match condition to apply RouteMap rules. */
  matchCondition?: "Unknown" | "Contains" | "Equals" | "NotContains" | "NotEquals";
}

/** Action to be taken on a route matching a RouteMap criterion. */
export interface Action {
  /** Type of action to be taken. Supported types are 'Remove', 'Add', 'Replace', and 'Drop.' */
  type?: "Unknown" | "Remove" | "Add" | "Replace" | "Drop";
  /** List of parameters relevant to the action.For instance if type is drop then parameters has list of prefixes to be dropped.If type is add, parameters would have list of ASN numbers to be added */
  parameters?: Array<Parameter>;
}

/** Parameters for an Action. */
export interface Parameter {
  /** List of route prefixes. */
  routePrefix?: Array<string>;
  /** List of BGP communities. */
  community?: Array<string>;
  /** List of AS paths. */
  asPath?: Array<string>;
}

/** HubVirtualNetworkConnection Resource. */
export interface HubVirtualNetworkConnection extends SubResource {
  /** Properties of the hub virtual network connection. */
  properties?: HubVirtualNetworkConnectionProperties;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Parameters for HubVirtualNetworkConnection. */
export interface HubVirtualNetworkConnectionProperties {
  /** Reference to the remote virtual network. */
  remoteVirtualNetwork?: SubResource;
  /** Deprecated: VirtualHub to RemoteVnet transit to enabled or not. */
  allowHubToRemoteVnetTransit?: boolean;
  /** Deprecated: Allow RemoteVnet to use Virtual Hub's gateways. */
  allowRemoteVnetToUseHubVnetGateways?: boolean;
  /** Enable internet security. */
  enableInternetSecurity?: boolean;
  /** The Routing Configuration indicating the associated and propagated route tables on this connection. */
  routingConfiguration?: RoutingConfiguration;
  /** The provisioning state of the hub virtual network connection resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** VpnGateway Resource. */
export interface VpnGateway extends Resource {
  /** Properties of the VPN gateway. */
  properties?: VpnGatewayProperties;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Parameters for VpnGateway. */
export interface VpnGatewayProperties {
  /** The VirtualHub to which the gateway belongs. */
  virtualHub?: SubResource;
  /** List of all vpn connections to the gateway. */
  connections?: Array<VpnConnection>;
  /** Local network gateway's BGP speaker settings. */
  bgpSettings?: BgpSettings;
  /** The provisioning state of the VPN gateway resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The scale unit for this vpn gateway. */
  vpnGatewayScaleUnit?: number;
  /** List of all IPs configured on the gateway. */
  ipConfigurations?: Array<VpnGatewayIpConfiguration>;
  /** Enable BGP routes translation for NAT on this VpnGateway. */
  enableBgpRouteTranslationForNat?: boolean;
  /** Enable Routing Preference property for the Public IP Interface of the VpnGateway. */
  isRoutingPreferenceInternet?: boolean;
  /** List of all the nat Rules associated with the gateway. */
  natRules?: Array<VpnGatewayNatRule>;
}

/** VpnConnection Resource. */
export interface VpnConnection extends SubResource {
  /** Properties of the VPN connection. */
  properties?: VpnConnectionProperties;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Parameters for VpnConnection. */
export interface VpnConnectionProperties {
  /** Id of the connected vpn site. */
  remoteVpnSite?: SubResource;
  /** Routing weight for vpn connection. */
  routingWeight?: number;
  /** DPD timeout in seconds for vpn connection. */
  dpdTimeoutSeconds?: number;
  /** The connection status. */
  connectionStatus?: "Unknown" | "Connecting" | "Connected" | "NotConnected";
  /** Connection protocol used for this connection. */
  vpnConnectionProtocolType?: "IKEv2" | "IKEv1";
  /** Ingress bytes transferred. */
  ingressBytesTransferred?: number;
  /** Egress bytes transferred. */
  egressBytesTransferred?: number;
  /** Expected bandwidth in MBPS. */
  connectionBandwidth?: number;
  /** SharedKey for the vpn connection. */
  sharedKey?: string;
  /** EnableBgp flag. */
  enableBgp?: boolean;
  /** Enable policy-based traffic selectors. */
  usePolicyBasedTrafficSelectors?: boolean;
  /** The IPSec Policies to be considered by this connection. */
  ipsecPolicies?: Array<IpsecPolicy>;
  /** The Traffic Selector Policies to be considered by this connection. */
  trafficSelectorPolicies?: Array<TrafficSelectorPolicy>;
  /** EnableBgp flag. */
  enableRateLimiting?: boolean;
  /** Enable internet security. */
  enableInternetSecurity?: boolean;
  /** Use local azure ip to initiate connection. */
  useLocalAzureIpAddress?: boolean;
  /** The provisioning state of the VPN connection resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** List of all vpn site link connections to the gateway. */
  vpnLinkConnections?: Array<VpnSiteLinkConnection>;
  /** The Routing Configuration indicating the associated and propagated route tables on this connection. */
  routingConfiguration?: RoutingConfiguration;
}

/** VpnSiteLinkConnection Resource. */
export interface VpnSiteLinkConnection extends SubResource {
  /** Properties of the VPN site link connection. */
  properties?: VpnSiteLinkConnectionProperties;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Resource type. */
  type?: string;
}

/** Parameters for VpnConnection. */
export interface VpnSiteLinkConnectionProperties {
  /** Id of the connected vpn site link. */
  vpnSiteLink?: SubResource;
  /** Routing weight for vpn connection. */
  routingWeight?: number;
  /** Vpn link connection mode. */
  vpnLinkConnectionMode?: "Default" | "ResponderOnly" | "InitiatorOnly";
  /** The connection status. */
  connectionStatus?: "Unknown" | "Connecting" | "Connected" | "NotConnected";
  /** Connection protocol used for this connection. */
  vpnConnectionProtocolType?: "IKEv2" | "IKEv1";
  /** Ingress bytes transferred. */
  ingressBytesTransferred?: number;
  /** Egress bytes transferred. */
  egressBytesTransferred?: number;
  /** Expected bandwidth in MBPS. */
  connectionBandwidth?: number;
  /** SharedKey for the vpn connection. */
  sharedKey?: string;
  /** EnableBgp flag. */
  enableBgp?: boolean;
  /** vpnGatewayCustomBgpAddresses used by this connection. */
  vpnGatewayCustomBgpAddresses?: Array<GatewayCustomBgpIpAddressIpConfiguration>;
  /** Enable policy-based traffic selectors. */
  usePolicyBasedTrafficSelectors?: boolean;
  /** The IPSec Policies to be considered by this connection. */
  ipsecPolicies?: Array<IpsecPolicy>;
  /** EnableBgp flag. */
  enableRateLimiting?: boolean;
  /** Use local azure ip to initiate connection. */
  useLocalAzureIpAddress?: boolean;
  /** The provisioning state of the VPN site link connection resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** List of ingress NatRules. */
  ingressNatRules?: Array<SubResource>;
  /** List of egress NatRules. */
  egressNatRules?: Array<SubResource>;
}

/** IP Configuration of a VPN Gateway Resource. */
export interface VpnGatewayIpConfiguration {
  /** The identifier of the IP configuration for a VPN Gateway. */
  id?: string;
  /** The public IP address of this IP configuration. */
  publicIpAddress?: string;
  /** The private IP address of this IP configuration. */
  privateIpAddress?: string;
}

/** VpnGatewayNatRule Resource. */
export interface VpnGatewayNatRule extends SubResource {
  /** Properties of the VpnGateway NAT rule. */
  properties?: VpnGatewayNatRuleProperties;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Resource type. */
  type?: string;
}

/** Parameters for VpnGatewayNatRule. */
export interface VpnGatewayNatRuleProperties {
  /** The provisioning state of the NAT Rule resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The type of NAT rule for VPN NAT. */
  type?: "Static" | "Dynamic";
  /** The Source NAT direction of a VPN NAT. */
  mode?: "EgressSnat" | "IngressSnat";
  /** The private IP address internal mapping for NAT. */
  internalMappings?: Array<VpnNatRuleMapping>;
  /** The private IP address external mapping for NAT. */
  externalMappings?: Array<VpnNatRuleMapping>;
  /** The IP Configuration ID this NAT rule applies to. */
  ipConfigurationId?: string;
  /** List of egress VpnSiteLinkConnections. */
  egressVpnSiteLinkConnections?: Array<SubResource>;
  /** List of ingress VpnSiteLinkConnections. */
  ingressVpnSiteLinkConnections?: Array<SubResource>;
}

/** Start packet capture parameters. */
export interface VpnGatewayPacketCaptureStartParameters {
  /** Start Packet capture parameters on vpn gateway. */
  filterData?: string;
}

/** Stop packet capture parameters. */
export interface VpnGatewayPacketCaptureStopParameters {
  /** SAS url for packet capture on vpn gateway. */
  sasUrl?: string;
}

/** Vpn Connection packet capture parameters supplied to start packet capture on gateway connection. */
export interface VpnConnectionPacketCaptureStartParameters {
  /** Start Packet capture parameters on vpn connection. */
  filterData?: string;
  /** List of site link connection names. */
  linkConnectionNames?: Array<string>;
}

/** Vpn Connection packet capture parameters supplied to stop packet capture on gateway connection. */
export interface VpnConnectionPacketCaptureStopParameters {
  /** SAS url for packet capture on vpn connection. */
  sasUrl?: string;
  /** List of site link connection names. */
  linkConnectionNames?: Array<string>;
}

/** Vpn Client Parameters for package generation. */
export interface P2SVpnProfileParameters {
  /** VPN client authentication method. */
  authenticationMethod?: "EAPTLS" | "EAPMSCHAPv2";
}

/** List of P2S Vpn connection health request. */
export interface P2SVpnConnectionHealthRequest {
  /** The list of p2s vpn user names whose p2s vpn connection detailed health to retrieve for. */
  vpnUserNamesFilter?: Array<string>;
  /** The sas-url to download the P2S Vpn connection health detail. */
  outputBlobSasUrl?: string;
}

/** Virtual Wan Vpn profile parameters Vpn profile generation. */
export interface VirtualWanVpnProfileParameters {
  /** VpnServerConfiguration partial resource uri with which VirtualWan is associated to. */
  vpnServerConfigurationResourceId?: string;
  /** VPN client authentication method. */
  authenticationMethod?: "EAPTLS" | "EAPMSCHAPv2";
}

/** ExpressRoute gateway resource. */
export interface ExpressRouteGateway extends Resource {
  /** Properties of the express route gateway. */
  properties?: ExpressRouteGatewayProperties;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** ExpressRoute gateway resource properties. */
export interface ExpressRouteGatewayProperties {
  /** Configuration for auto scaling. */
  autoScaleConfiguration?: ExpressRouteGatewayPropertiesAutoScaleConfiguration;
  /** List of ExpressRoute connections to the ExpressRoute gateway. */
  expressRouteConnections?: Array<ExpressRouteConnection>;
  /** The provisioning state of the express route gateway resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The Virtual Hub where the ExpressRoute gateway is or will be deployed. */
  virtualHub: VirtualHubId;
}

/** Configuration for auto scaling. */
export interface ExpressRouteGatewayPropertiesAutoScaleConfiguration {
  /** Minimum and maximum number of scale units to deploy. */
  bounds?: ExpressRouteGatewayPropertiesAutoScaleConfigurationBounds;
}

/** Minimum and maximum number of scale units to deploy. */
export interface ExpressRouteGatewayPropertiesAutoScaleConfigurationBounds {
  /** Minimum number of scale units deployed for ExpressRoute gateway. */
  min?: number;
  /** Maximum number of scale units deployed for ExpressRoute gateway. */
  max?: number;
}

/** ExpressRouteConnection resource. */
export interface ExpressRouteConnection extends SubResource {
  /** Properties of the express route connection. */
  properties?: ExpressRouteConnectionProperties;
  /** The name of the resource. */
  name: string;
}

/** Properties of the ExpressRouteConnection subresource. */
export interface ExpressRouteConnectionProperties {
  /** The provisioning state of the express route connection resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The ExpressRoute circuit peering. */
  expressRouteCircuitPeering: ExpressRouteCircuitPeeringId;
  /** Authorization key to establish the connection. */
  authorizationKey?: string;
  /** The routing weight associated to the connection. */
  routingWeight?: number;
  /** Enable internet security. */
  enableInternetSecurity?: boolean;
  /** Enable FastPath to vWan Firewall hub. */
  expressRouteGatewayBypass?: boolean;
  /** Bypass the ExpressRoute gateway when accessing private-links. ExpressRoute FastPath (expressRouteGatewayBypass) must be enabled. */
  enablePrivateLinkFastPath?: boolean;
  /** The Routing Configuration indicating the associated and propagated route tables on this connection. */
  routingConfiguration?: RoutingConfiguration;
}

/** ExpressRoute circuit peering identifier. */
export interface ExpressRouteCircuitPeeringId {
  /** The ID of the ExpressRoute circuit peering. */
  id?: string;
}

/** Virtual Hub identifier. */
export interface VirtualHubId {
  /** The resource URI for the Virtual Hub where the ExpressRoute gateway is or will be deployed. The Virtual Hub resource and the ExpressRoute gateway resource reside in the same subscription. */
  id?: string;
}

/** Virtual Appliance Site resource. */
export interface BgpConnection extends SubResource {
  /** The properties of the Bgp connections. */
  properties?: BgpConnectionProperties;
  /** Name of the connection. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Connection type. */
  type?: string;
}

/** Properties of the bgp connection. */
export interface BgpConnectionProperties {
  /** Peer ASN. */
  peerAsn?: number;
  /** Peer IP. */
  peerIp?: string;
  /** The reference to the HubVirtualNetworkConnection resource. */
  hubVirtualNetworkConnection?: SubResource;
  /** The provisioning state of the resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The current state of the VirtualHub to Peer. */
  connectionState?: "Unknown" | "Connecting" | "Connected" | "NotConnected";
}

/** IpConfigurations. */
export interface HubIpConfiguration extends SubResource {
  /** The properties of the Virtual Hub IPConfigurations. */
  properties?: HubIPConfigurationPropertiesFormat;
  /** Name of the Ip Configuration. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Ipconfiguration type. */
  type?: string;
}

/** Properties of IP configuration. */
export interface HubIPConfigurationPropertiesFormat {
  /** The private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: "Static" | "Dynamic";
  /** The reference to the subnet resource. */
  subnet?: Subnet;
  /** The reference to the public IP resource. */
  publicIPAddress?: PublicIPAddress;
  /** The provisioning state of the IP configuration resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** RouteTable resource in a virtual hub. */
export interface HubRouteTable extends SubResource {
  /** Properties of the RouteTable resource. */
  properties?: HubRouteTableProperties;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Resource type. */
  type?: string;
}

/** Parameters for RouteTable. */
export interface HubRouteTableProperties {
  /** List of all routes. */
  routes?: Array<HubRoute>;
  /** List of labels associated with this route table. */
  labels?: Array<string>;
  /** List of all connections associated with this route table. */
  associatedConnections?: Array<string>;
  /** List of all connections that advertise to this route table. */
  propagatingConnections?: Array<string>;
  /** The provisioning state of the RouteTable resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** RouteTable route. */
export interface HubRoute {
  /** The name of the Route that is unique within a RouteTable. This name can be used to access this route. */
  name: string;
  /** The type of destinations (eg: CIDR, ResourceId, Service). */
  destinationType: string;
  /** List of all destinations. */
  destinations: Array<string>;
  /** The type of next hop (eg: ResourceId). */
  nextHopType: string;
  /** NextHop resource ID. */
  nextHop: string;
}

/** The parameters specifying the resource whose effective routes are being requested. */
export interface EffectiveRoutesParameters {
  /** The resource whose effective routes are being requested. */
  resourceId?: string;
  /** The type of the specified resource like RouteTable, ExpressRouteConnection, HubVirtualNetworkConnection, VpnConnection and P2SConnection. */
  virtualWanResourceType?: string;
}

/** The parameters specifying the connection resource whose inbound routes are being requested. */
export interface GetInboundRoutesParameters {
  /** The connection resource whose inbound routes are being requested. */
  resourceUri?: string;
  /** The type of the specified connection resource like ExpressRouteConnection, HubVirtualNetworkConnection, VpnConnection and P2SConnection. */
  connectionType?: string;
}

/** The parameters specifying the connection resource whose outbound routes are being requested. */
export interface GetOutboundRoutesParameters {
  /** The connection resource whose outbound routes are being requested. */
  resourceUri?: string;
  /** The type of the specified connection resource like ExpressRouteConnection, HubVirtualNetworkConnection, VpnConnection and P2SConnection. */
  connectionType?: string;
}

/** The routing intent child resource of a Virtual hub. */
export interface RoutingIntent extends SubResource {
  /** Properties of the RoutingIntent resource. */
  properties?: RoutingIntentProperties;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Resource type. */
  type?: string;
}

/** The properties of a RoutingIntent resource. */
export interface RoutingIntentProperties {
  /** List of routing policies. */
  routingPolicies?: Array<RoutingPolicy>;
  /** The provisioning state of the RoutingIntent resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** The routing policy object used in a RoutingIntent resource. */
export interface RoutingPolicy {
  /** The unique name for the routing policy. */
  name: string;
  /** List of all destinations which this routing policy is applicable to (for example: Internet, PrivateTraffic). */
  destinations: Array<string>;
  /** The next hop resource id on which this routing policy is applicable to. */
  nextHop: string;
}

/** Defines web application firewall policy. */
export interface WebApplicationFirewallPolicy extends Resource {
  /** Properties of the web application firewall policy. */
  properties?: WebApplicationFirewallPolicyPropertiesFormat;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Defines web application firewall policy properties. */
export interface WebApplicationFirewallPolicyPropertiesFormat {
  /** The PolicySettings for policy. */
  policySettings?: PolicySettings;
  /** The custom rules inside the policy. */
  customRules?: Array<WebApplicationFirewallCustomRule>;
  /** A collection of references to application gateways. */
  applicationGateways?: Array<ApplicationGateway>;
  /** The provisioning state of the web application firewall policy resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Resource status of the policy. */
  resourceState?: "Creating" | "Enabling" | "Enabled" | "Disabling" | "Disabled" | "Deleting";
  /** Describes the managedRules structure. */
  managedRules: ManagedRulesDefinition;
  /** A collection of references to application gateway http listeners. */
  httpListeners?: Array<SubResource>;
  /** A collection of references to application gateway path rules. */
  pathBasedRules?: Array<SubResource>;
}

/** Defines contents of a web application firewall global configuration. */
export interface PolicySettings {
  /** The state of the policy. */
  state?: "Disabled" | "Enabled";
  /** The mode of the policy. */
  mode?: "Prevention" | "Detection";
  /** Whether to allow WAF to check request Body. */
  requestBodyCheck?: boolean;
  /** Maximum request body size in Kb for WAF. */
  maxRequestBodySizeInKb?: number;
  /** Maximum file upload size in Mb for WAF. */
  fileUploadLimitInMb?: number;
}

/** Defines contents of a web application rule. */
export interface WebApplicationFirewallCustomRule {
  /** The name of the resource that is unique within a policy. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Priority of the rule. Rules with a lower value will be evaluated before rules with a higher value. */
  priority: number;
  /** The rule type. */
  ruleType: "MatchRule" | "Invalid";
  /** List of match conditions. */
  matchConditions: Array<MatchCondition>;
  /** Type of Actions. */
  action: "Allow" | "Block" | "Log";
}

/** Define match conditions. */
export interface MatchCondition {
  /** List of match variables. */
  matchVariables: Array<MatchVariable>;
  /** The operator to be matched. */
  operator:
    | "IPMatch"
    | "Equal"
    | "Contains"
    | "LessThan"
    | "GreaterThan"
    | "LessThanOrEqual"
    | "GreaterThanOrEqual"
    | "BeginsWith"
    | "EndsWith"
    | "Regex"
    | "GeoMatch"
    | "Any";
  /** Whether this is negate condition or not. */
  negationConditon?: boolean;
  /** Match value. */
  matchValues: Array<string>;
  /** List of transforms. */
  transforms?: Array<
    | "Uppercase"
    | "Lowercase"
    | "Trim"
    | "UrlDecode"
    | "UrlEncode"
    | "RemoveNulls"
    | "HtmlEntityDecode"
  >;
}

/** Define match variables. */
export interface MatchVariable {
  /** Match Variable. */
  variableName:
    | "RemoteAddr"
    | "RequestMethod"
    | "QueryString"
    | "PostArgs"
    | "RequestUri"
    | "RequestHeaders"
    | "RequestBody"
    | "RequestCookies";
  /** The selector of match variable. */
  selector?: string;
}

/** Allow to exclude some variable satisfy the condition for the WAF check. */
export interface ManagedRulesDefinition {
  /** The Exclusions that are applied on the policy. */
  exclusions?: Array<OwaspCrsExclusionEntry>;
  /** The managed rule sets that are associated with the policy. */
  managedRuleSets: Array<ManagedRuleSet>;
}

/** Allow to exclude some variable satisfy the condition for the WAF check. */
export interface OwaspCrsExclusionEntry {
  /** The variable to be excluded. */
  matchVariable:
    | "RequestHeaderNames"
    | "RequestCookieNames"
    | "RequestArgNames"
    | "RequestHeaderKeys"
    | "RequestHeaderValues"
    | "RequestCookieKeys"
    | "RequestCookieValues"
    | "RequestArgKeys"
    | "RequestArgValues";
  /** When matchVariable is a collection, operate on the selector to specify which elements in the collection this exclusion applies to. */
  selectorMatchOperator: "Equals" | "Contains" | "StartsWith" | "EndsWith" | "EqualsAny";
  /** When matchVariable is a collection, operator used to specify which elements in the collection this exclusion applies to. */
  selector: string;
  /** The managed rule sets that are associated with the exclusion. */
  exclusionManagedRuleSets?: Array<ExclusionManagedRuleSet>;
}

/** Defines a managed rule set for Exclusions. */
export interface ExclusionManagedRuleSet {
  /** Defines the rule set type to use. */
  ruleSetType: string;
  /** Defines the version of the rule set to use. */
  ruleSetVersion: string;
  /** Defines the rule groups to apply to the rule set. */
  ruleGroups?: Array<ExclusionManagedRuleGroup>;
}

/** Defines a managed rule group to use for exclusion. */
export interface ExclusionManagedRuleGroup {
  /** The managed rule group for exclusion. */
  ruleGroupName: string;
  /** List of rules that will be excluded. If none specified, all rules in the group will be excluded. */
  rules?: Array<ExclusionManagedRule>;
}

/** Defines a managed rule to use for exclusion. */
export interface ExclusionManagedRule {
  /** Identifier for the managed rule. */
  ruleId: string;
}

/** Defines a managed rule set. */
export interface ManagedRuleSet {
  /** Defines the rule set type to use. */
  ruleSetType: string;
  /** Defines the version of the rule set to use. */
  ruleSetVersion: string;
  /** Defines the rule group overrides to apply to the rule set. */
  ruleGroupOverrides?: Array<ManagedRuleGroupOverride>;
}

/** Defines a managed rule group override setting. */
export interface ManagedRuleGroupOverride {
  /** The managed rule group to override. */
  ruleGroupName: string;
  /** List of rules that will be disabled. If none specified, all rules in the group will be disabled. */
  rules?: Array<ManagedRuleOverride>;
}

/** Defines a managed rule group override setting. */
export interface ManagedRuleOverride {
  /** Identifier for the managed rule. */
  ruleId: string;
  /** The state of the managed rule. Defaults to Disabled if not specified. */
  state?: "Disabled" | "Enabled";
  /** Describes the override action to be applied when rule matches. */
  action?: "AnomalyScoring" | "Allow" | "Block" | "Log";
}

/** SwapResource to represent slot type on the specified cloud service. */
export interface SwapResource {
  /** Resource Id. */
  id?: string;
  /** Resource name. */
  name?: string;
  /** Resource type. */
  type?: string;
  /** Swap resource properties */
  properties?: SwapResourceProperties;
}

/** Swap resource properties */
export interface SwapResourceProperties {
  /** Specifies slot info on a cloud service */
  slotType?: "Production" | "Staging";
}

/** Firewall Policy NAT Rule Collection. */
export interface FirewallPolicyNatRuleCollection extends FirewallPolicyRuleCollectionParent {
  /** The action type of a Nat rule collection. */
  action?: FirewallPolicyNatRuleCollectionAction;
  /** List of rules included in a rule collection. */
  rules?: Array<FirewallPolicyRule>;
  ruleCollectionType: "FirewallPolicyNatRuleCollection";
}

/** Properties of the FirewallPolicyNatRuleCollectionAction. */
export interface FirewallPolicyNatRuleCollectionAction {
  /** The type of action. */
  type?: "DNAT";
}

/** Properties of a rule. */
export interface FirewallPolicyRuleParent {
  /** Name of the rule. */
  name?: string;
  /** Description of the rule. */
  description?: string;
  ruleType: "FirewallPolicyRule" | "ApplicationRule" | "NatRule" | "NetworkRule";
}

/** Firewall Policy Filter Rule Collection. */
export interface FirewallPolicyFilterRuleCollection extends FirewallPolicyRuleCollectionParent {
  /** The action type of a Filter rule collection. */
  action?: FirewallPolicyFilterRuleCollectionAction;
  /** List of rules included in a rule collection. */
  rules?: Array<FirewallPolicyRule>;
  ruleCollectionType: "FirewallPolicyFilterRuleCollection";
}

/** Properties of the FirewallPolicyFilterRuleCollectionAction. */
export interface FirewallPolicyFilterRuleCollectionAction {
  /** The type of action. */
  type?: "Allow" | "Deny";
}

/** Rule of type application. */
export interface ApplicationRule extends FirewallPolicyRuleParent {
  /** List of source IP addresses for this rule. */
  sourceAddresses?: Array<string>;
  /** List of destination IP addresses or Service Tags. */
  destinationAddresses?: Array<string>;
  /** Array of Application Protocols. */
  protocols?: Array<FirewallPolicyRuleApplicationProtocol>;
  /** List of FQDNs for this rule. */
  targetFqdns?: Array<string>;
  /** List of Urls for this rule condition. */
  targetUrls?: Array<string>;
  /** List of FQDN Tags for this rule. */
  fqdnTags?: Array<string>;
  /** List of source IpGroups for this rule. */
  sourceIpGroups?: Array<string>;
  /** Terminate TLS connections for this rule. */
  terminateTLS?: boolean;
  /** List of destination azure web categories. */
  webCategories?: Array<string>;
  ruleType: "ApplicationRule";
}

/** Properties of the application rule protocol. */
export interface FirewallPolicyRuleApplicationProtocol {
  /** Protocol type. */
  protocolType?: "Http" | "Https";
  /** Port number for the protocol, cannot be greater than 64000. */
  port?: number;
}

/** Rule of type nat. */
export interface NatRule extends FirewallPolicyRuleParent {
  /** Array of FirewallPolicyRuleNetworkProtocols. */
  ipProtocols?: Array<"TCP" | "UDP" | "Any" | "ICMP">;
  /** List of source IP addresses for this rule. */
  sourceAddresses?: Array<string>;
  /** List of destination IP addresses or Service Tags. */
  destinationAddresses?: Array<string>;
  /** List of destination ports. */
  destinationPorts?: Array<string>;
  /** The translated address for this NAT rule. */
  translatedAddress?: string;
  /** The translated port for this NAT rule. */
  translatedPort?: string;
  /** List of source IpGroups for this rule. */
  sourceIpGroups?: Array<string>;
  /** The translated FQDN for this NAT rule. */
  translatedFqdn?: string;
  ruleType: "NatRule";
}

/** Rule of type network. */
export interface NetworkRule extends FirewallPolicyRuleParent {
  /** Array of FirewallPolicyRuleNetworkProtocols. */
  ipProtocols?: Array<"TCP" | "UDP" | "Any" | "ICMP">;
  /** List of source IP addresses for this rule. */
  sourceAddresses?: Array<string>;
  /** List of destination IP addresses or Service Tags. */
  destinationAddresses?: Array<string>;
  /** List of destination ports. */
  destinationPorts?: Array<string>;
  /** List of source IpGroups for this rule. */
  sourceIpGroups?: Array<string>;
  /** List of destination IpGroups for this rule. */
  destinationIpGroups?: Array<string>;
  /** List of destination FQDNs. */
  destinationFqdns?: Array<string>;
  ruleType: "NetworkRule";
}

/** Security admin rule resource. */
export interface AdminPropertiesFormat {
  /** A description for this rule. Restricted to 140 chars. */
  description?: string;
  /** Network protocol this rule applies to. */
  protocol: "Tcp" | "Udp" | "Icmp" | "Esp" | "Any" | "Ah";
  /** The CIDR or source IP ranges. */
  sources?: Array<AddressPrefixItem>;
  /** The destination address prefixes. CIDR or destination IP ranges. */
  destinations?: Array<AddressPrefixItem>;
  /** The source port ranges. */
  sourcePortRanges?: Array<string>;
  /** The destination port ranges. */
  destinationPortRanges?: Array<string>;
  /** Indicates the access allowed for this particular rule */
  access: "Allow" | "Deny" | "AlwaysAllow";
  /** The priority of the rule. The value can be between 1 and 4096. The priority number must be unique for each rule in the collection. The lower the priority number, the higher the priority of the rule. */
  priority: number;
  /** Indicates if the traffic matched against the rule in inbound or outbound. */
  direction: "Inbound" | "Outbound";
  /** The provisioning state of the resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Address prefix item. */
export interface AddressPrefixItem {
  /** Address prefix. */
  addressPrefix?: string;
  /** Address prefix type. */
  addressPrefixType?: "IPPrefix" | "ServiceTag";
}

/** Security default admin rule resource. */
export interface DefaultAdminPropertiesFormat {
  /** A description for this rule. Restricted to 140 chars. */
  description?: string;
  /** Default rule flag. */
  flag?: string;
  /** Network protocol this rule applies to. */
  protocol?: "Tcp" | "Udp" | "Icmp" | "Esp" | "Any" | "Ah";
  /** The CIDR or source IP ranges. */
  sources?: Array<AddressPrefixItem>;
  /** The destination address prefixes. CIDR or destination IP ranges. */
  destinations?: Array<AddressPrefixItem>;
  /** The source port ranges. */
  sourcePortRanges?: Array<string>;
  /** The destination port ranges. */
  destinationPortRanges?: Array<string>;
  /** Indicates the access allowed for this particular rule */
  access?: "Allow" | "Deny" | "AlwaysAllow";
  /** The priority of the rule. The value can be between 1 and 4096. The priority number must be unique for each rule in the collection. The lower the priority number, the higher the priority of the rule. */
  priority?: number;
  /** Indicates if the traffic matched against the rule in inbound or outbound. */
  direction?: "Inbound" | "Outbound";
  /** The provisioning state of the resource. */
  provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Network admin rule. */
export interface AdminRule extends BaseAdminRuleParent {
  /** Indicates the properties of the security admin rule */
  properties?: AdminPropertiesFormat;
  kind: "Custom";
}

/** Network default admin rule. */
export interface DefaultAdminRule extends BaseAdminRuleParent {
  /** Indicates the properties of the security admin rule */
  properties?: DefaultAdminPropertiesFormat;
  kind: "Default";
}

/** Route Filter Rule Resource. */
export interface PatchRouteFilterRule extends SubResource {
  /** Properties of the route filter rule. */
  properties?: RouteFilterRulePropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
}

/** Route Filter Resource. */
export interface PatchRouteFilter extends SubResource {
  /** Properties of the route filter. */
  properties?: RouteFilterPropertiesFormat;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Resource type. */
  type?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** Properties of the rule collection. */
export type FirewallPolicyRuleCollection =
  | FirewallPolicyNatRuleCollection
  | FirewallPolicyFilterRuleCollection;
/** Network base admin rule. */
export type BaseAdminRule = AdminRule | DefaultAdminRule;
/** Properties of a rule. */
export type FirewallPolicyRule = ApplicationRule | NatRule | NetworkRule;
