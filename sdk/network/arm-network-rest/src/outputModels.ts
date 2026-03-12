// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** An error response from the service. */
export interface CloudErrorOutput {
  /** Cloud error body. */
  error?: CloudErrorBodyOutput;
}

/** An error response from the service. */
export interface CloudErrorBodyOutput {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  code?: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message?: string;
  /** The target of the particular error. For example, the name of the property in error. */
  target?: string;
  /** A list of additional details about the error. */
  details?: Array<CloudErrorBodyOutput>;
}

/** Application gateway resource. */
export interface ApplicationGatewayOutput extends ResourceOutput {
  /** Properties of the application gateway. */
  properties?: ApplicationGatewayPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** A list of availability zones denoting where the resource needs to come from. */
  zones?: Array<string>;
  /** The identity of the application gateway, if configured. */
  identity?: ManagedServiceIdentityOutput;
}

/** Properties of the application gateway. */
export interface ApplicationGatewayPropertiesFormatOutput {
  /** SKU of the application gateway resource. */
  sku?: ApplicationGatewaySkuOutput;
  /** SSL policy of the application gateway resource. */
  sslPolicy?: ApplicationGatewaySslPolicyOutput;
  /** Operational state of the application gateway resource. */
  readonly operationalState?: "Stopped" | "Starting" | "Running" | "Stopping";
  /** Subnets of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  gatewayIPConfigurations?: Array<ApplicationGatewayIPConfigurationOutput>;
  /** Authentication certificates of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  authenticationCertificates?: Array<ApplicationGatewayAuthenticationCertificateOutput>;
  /** Trusted Root certificates of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  trustedRootCertificates?: Array<ApplicationGatewayTrustedRootCertificateOutput>;
  /** Trusted client certificates of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  trustedClientCertificates?: Array<ApplicationGatewayTrustedClientCertificateOutput>;
  /** SSL certificates of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  sslCertificates?: Array<ApplicationGatewaySslCertificateOutput>;
  /** Frontend IP addresses of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  frontendIPConfigurations?: Array<ApplicationGatewayFrontendIPConfigurationOutput>;
  /** Frontend ports of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  frontendPorts?: Array<ApplicationGatewayFrontendPortOutput>;
  /** Probes of the application gateway resource. */
  probes?: Array<ApplicationGatewayProbeOutput>;
  /** Backend address pool of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  backendAddressPools?: Array<ApplicationGatewayBackendAddressPoolOutput>;
  /** Backend http settings of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  backendHttpSettingsCollection?: Array<ApplicationGatewayBackendHttpSettingsOutput>;
  /** Backend settings of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  backendSettingsCollection?: Array<ApplicationGatewayBackendSettingsOutput>;
  /** Http listeners of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  httpListeners?: Array<ApplicationGatewayHttpListenerOutput>;
  /** Listeners of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  listeners?: Array<ApplicationGatewayListenerOutput>;
  /** SSL profiles of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  sslProfiles?: Array<ApplicationGatewaySslProfileOutput>;
  /** URL path map of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  urlPathMaps?: Array<ApplicationGatewayUrlPathMapOutput>;
  /** Request routing rules of the application gateway resource. */
  requestRoutingRules?: Array<ApplicationGatewayRequestRoutingRuleOutput>;
  /** Routing rules of the application gateway resource. */
  routingRules?: Array<ApplicationGatewayRoutingRuleOutput>;
  /** Rewrite rules for the application gateway resource. */
  rewriteRuleSets?: Array<ApplicationGatewayRewriteRuleSetOutput>;
  /** Redirect configurations of the application gateway resource. For default limits, see [Application Gateway limits](https://docs.microsoft.com/azure/azure-subscription-service-limits#application-gateway-limits). */
  redirectConfigurations?: Array<ApplicationGatewayRedirectConfigurationOutput>;
  /** Web application firewall configuration. */
  webApplicationFirewallConfiguration?: ApplicationGatewayWebApplicationFirewallConfigurationOutput;
  /** Reference to the FirewallPolicy resource. */
  firewallPolicy?: SubResourceOutput;
  /** Whether HTTP2 is enabled on the application gateway resource. */
  enableHttp2?: boolean;
  /** Whether FIPS is enabled on the application gateway resource. */
  enableFips?: boolean;
  /** Autoscale Configuration. */
  autoscaleConfiguration?: ApplicationGatewayAutoscaleConfigurationOutput;
  /** PrivateLink configurations on application gateway. */
  privateLinkConfigurations?: Array<ApplicationGatewayPrivateLinkConfigurationOutput>;
  /** Private Endpoint connections on application gateway. */
  readonly privateEndpointConnections?: Array<ApplicationGatewayPrivateEndpointConnectionOutput>;
  /** The resource GUID property of the application gateway resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the application gateway resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Custom error configurations of the application gateway resource. */
  customErrorConfigurations?: Array<ApplicationGatewayCustomErrorOutput>;
  /** If true, associates a firewall policy with an application gateway regardless whether the policy differs from the WAF Config. */
  forceFirewallPolicyAssociation?: boolean;
  /** Load distribution policies of the application gateway resource. */
  loadDistributionPolicies?: Array<ApplicationGatewayLoadDistributionPolicyOutput>;
  /** Global Configuration. */
  globalConfiguration?: ApplicationGatewayGlobalConfigurationOutput;
}

/** SKU of an application gateway. */
export interface ApplicationGatewaySkuOutput {
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
export interface ApplicationGatewaySslPolicyOutput {
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
export interface ApplicationGatewayIPConfigurationOutput extends SubResourceOutput {
  /** Properties of the application gateway IP configuration. */
  properties?: ApplicationGatewayIPConfigurationPropertiesFormatOutput;
  /** Name of the IP configuration that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of IP configuration of an application gateway. */
export interface ApplicationGatewayIPConfigurationPropertiesFormatOutput {
  /** Reference to the subnet resource. A subnet from where application gateway gets its private address. */
  subnet?: SubResourceOutput;
  /** The provisioning state of the application gateway IP configuration resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Reference to another subresource. */
export interface SubResourceOutput {
  /** Resource ID. */
  id?: string;
}

/** Authentication certificates of an application gateway. */
export interface ApplicationGatewayAuthenticationCertificateOutput extends SubResourceOutput {
  /** Properties of the application gateway authentication certificate. */
  properties?: ApplicationGatewayAuthenticationCertificatePropertiesFormatOutput;
  /** Name of the authentication certificate that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Authentication certificates properties of an application gateway. */
export interface ApplicationGatewayAuthenticationCertificatePropertiesFormatOutput {
  /** Certificate public data. */
  data?: string;
  /** The provisioning state of the authentication certificate resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Trusted Root certificates of an application gateway. */
export interface ApplicationGatewayTrustedRootCertificateOutput extends SubResourceOutput {
  /** Properties of the application gateway trusted root certificate. */
  properties?: ApplicationGatewayTrustedRootCertificatePropertiesFormatOutput;
  /** Name of the trusted root certificate that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Trusted Root certificates properties of an application gateway. */
export interface ApplicationGatewayTrustedRootCertificatePropertiesFormatOutput {
  /** Certificate public data. */
  data?: string;
  /** Secret Id of (base-64 encoded unencrypted pfx) 'Secret' or 'Certificate' object stored in KeyVault. */
  keyVaultSecretId?: string;
  /** The provisioning state of the trusted root certificate resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Trusted client certificates of an application gateway. */
export interface ApplicationGatewayTrustedClientCertificateOutput extends SubResourceOutput {
  /** Properties of the application gateway trusted client certificate. */
  properties?: ApplicationGatewayTrustedClientCertificatePropertiesFormatOutput;
  /** Name of the trusted client certificate that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Trusted client certificates properties of an application gateway. */
export interface ApplicationGatewayTrustedClientCertificatePropertiesFormatOutput {
  /** Certificate public data. */
  data?: string;
  /** Validated certificate data. */
  readonly validatedCertData?: string;
  /** Distinguished name of client certificate issuer. */
  readonly clientCertIssuerDN?: string;
  /** The provisioning state of the trusted client certificate resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** SSL certificates of an application gateway. */
export interface ApplicationGatewaySslCertificateOutput extends SubResourceOutput {
  /** Properties of the application gateway SSL certificate. */
  properties?: ApplicationGatewaySslCertificatePropertiesFormatOutput;
  /** Name of the SSL certificate that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of SSL certificates of an application gateway. */
export interface ApplicationGatewaySslCertificatePropertiesFormatOutput {
  /** Base-64 encoded pfx certificate. Only applicable in PUT Request. */
  data?: string;
  /** Password for the pfx file specified in data. Only applicable in PUT request. */
  password?: string;
  /** Base-64 encoded Public cert data corresponding to pfx specified in data. Only applicable in GET request. */
  readonly publicCertData?: string;
  /** Secret Id of (base-64 encoded unencrypted pfx) 'Secret' or 'Certificate' object stored in KeyVault. */
  keyVaultSecretId?: string;
  /** The provisioning state of the SSL certificate resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Frontend IP configuration of an application gateway. */
export interface ApplicationGatewayFrontendIPConfigurationOutput extends SubResourceOutput {
  /** Properties of the application gateway frontend IP configuration. */
  properties?: ApplicationGatewayFrontendIPConfigurationPropertiesFormatOutput;
  /** Name of the frontend IP configuration that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of Frontend IP configuration of an application gateway. */
export interface ApplicationGatewayFrontendIPConfigurationPropertiesFormatOutput {
  /** PrivateIPAddress of the network interface IP Configuration. */
  privateIPAddress?: string;
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: "Static" | "Dynamic";
  /** Reference to the subnet resource. */
  subnet?: SubResourceOutput;
  /** Reference to the PublicIP resource. */
  publicIPAddress?: SubResourceOutput;
  /** Reference to the application gateway private link configuration. */
  privateLinkConfiguration?: SubResourceOutput;
  /** The provisioning state of the frontend IP configuration resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Frontend port of an application gateway. */
export interface ApplicationGatewayFrontendPortOutput extends SubResourceOutput {
  /** Properties of the application gateway frontend port. */
  properties?: ApplicationGatewayFrontendPortPropertiesFormatOutput;
  /** Name of the frontend port that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of Frontend port of an application gateway. */
export interface ApplicationGatewayFrontendPortPropertiesFormatOutput {
  /** Frontend port. */
  port?: number;
  /** The provisioning state of the frontend port resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Probe of the application gateway. */
export interface ApplicationGatewayProbeOutput extends SubResourceOutput {
  /** Properties of the application gateway probe. */
  properties?: ApplicationGatewayProbePropertiesFormatOutput;
  /** Name of the probe that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of probe of an application gateway. */
export interface ApplicationGatewayProbePropertiesFormatOutput {
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
  match?: ApplicationGatewayProbeHealthResponseMatchOutput;
  /** The provisioning state of the probe resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Custom port which will be used for probing the backend servers. The valid value ranges from 1 to 65535. In case not set, port from http settings will be used. This property is valid for Standard_v2 and WAF_v2 only. */
  port?: number;
}

/** Application gateway probe health response match. */
export interface ApplicationGatewayProbeHealthResponseMatchOutput {
  /** Body that must be contained in the health response. Default value is empty. */
  body?: string;
  /** Allowed ranges of healthy status codes. Default range of healthy status codes is 200-399. */
  statusCodes?: Array<string>;
}

/** Backend Address Pool of an application gateway. */
export interface ApplicationGatewayBackendAddressPoolOutput extends SubResourceOutput {
  /** Properties of the application gateway backend address pool. */
  properties?: ApplicationGatewayBackendAddressPoolPropertiesFormatOutput;
  /** Name of the backend address pool that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of Backend Address Pool of an application gateway. */
export interface ApplicationGatewayBackendAddressPoolPropertiesFormatOutput {
  /** Collection of references to IPs defined in network interfaces. */
  readonly backendIPConfigurations?: Array<NetworkInterfaceIPConfigurationOutput>;
  /** Backend addresses. */
  backendAddresses?: Array<ApplicationGatewayBackendAddressOutput>;
  /** The provisioning state of the backend address pool resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** IPConfiguration in a network interface. */
export interface NetworkInterfaceIPConfigurationOutput extends SubResourceOutput {
  /** Network interface IP configuration properties. */
  properties?: NetworkInterfaceIPConfigurationPropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Resource type. */
  type?: string;
}

/** Properties of IP configuration. */
export interface NetworkInterfaceIPConfigurationPropertiesFormatOutput {
  /** The reference to gateway load balancer frontend IP. */
  gatewayLoadBalancer?: SubResourceOutput;
  /** The reference to Virtual Network Taps. */
  virtualNetworkTaps?: Array<VirtualNetworkTapOutput>;
  /** The reference to ApplicationGatewayBackendAddressPool resource. */
  applicationGatewayBackendAddressPools?: Array<ApplicationGatewayBackendAddressPoolOutput>;
  /** The reference to LoadBalancerBackendAddressPool resource. */
  loadBalancerBackendAddressPools?: Array<BackendAddressPoolOutput>;
  /** A list of references of LoadBalancerInboundNatRules. */
  loadBalancerInboundNatRules?: Array<InboundNatRuleOutput>;
  /** Private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: "Static" | "Dynamic";
  /** Whether the specific IP configuration is IPv4 or IPv6. Default is IPv4. */
  privateIPAddressVersion?: "IPv4" | "IPv6";
  /** Subnet bound to the IP configuration. */
  subnet?: SubnetOutput;
  /** Whether this is a primary customer address on the network interface. */
  primary?: boolean;
  /** Public IP address bound to the IP configuration. */
  publicIPAddress?: PublicIPAddressOutput;
  /** Application security groups in which the IP configuration is included. */
  applicationSecurityGroups?: Array<ApplicationSecurityGroupOutput>;
  /** The provisioning state of the network interface IP configuration. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** PrivateLinkConnection properties for the network interface. */
  readonly privateLinkConnectionProperties?: NetworkInterfaceIPConfigurationPrivateLinkConnectionPropertiesOutput;
}

/** Virtual Network Tap resource. */
export interface VirtualNetworkTapOutput extends ResourceOutput {
  /** Virtual Network Tap Properties. */
  properties?: VirtualNetworkTapPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Virtual Network Tap properties. */
export interface VirtualNetworkTapPropertiesFormatOutput {
  /** Specifies the list of resource IDs for the network interface IP configuration that needs to be tapped. */
  readonly networkInterfaceTapConfigurations?: Array<NetworkInterfaceTapConfigurationOutput>;
  /** The resource GUID property of the virtual network tap resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the virtual network tap resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The reference to the private IP Address of the collector nic that will receive the tap. */
  destinationNetworkInterfaceIPConfiguration?: NetworkInterfaceIPConfigurationOutput;
  /** The reference to the private IP address on the internal Load Balancer that will receive the tap. */
  destinationLoadBalancerFrontEndIPConfiguration?: FrontendIPConfigurationOutput;
  /** The VXLAN destination port that will receive the tapped traffic. */
  destinationPort?: number;
}

/** Tap configuration in a Network Interface. */
export interface NetworkInterfaceTapConfigurationOutput extends SubResourceOutput {
  /** Properties of the Virtual Network Tap configuration. */
  properties?: NetworkInterfaceTapConfigurationPropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Sub Resource type. */
  readonly type?: string;
}

/** Properties of Virtual Network Tap configuration. */
export interface NetworkInterfaceTapConfigurationPropertiesFormatOutput {
  /** The reference to the Virtual Network Tap resource. */
  virtualNetworkTap?: VirtualNetworkTapOutput;
  /** The provisioning state of the network interface tap configuration resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Frontend IP address of the load balancer. */
export interface FrontendIPConfigurationOutput extends SubResourceOutput {
  /** Properties of the load balancer probe. */
  properties?: FrontendIPConfigurationPropertiesFormatOutput;
  /** The name of the resource that is unique within the set of frontend IP configurations used by the load balancer. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
  /** A list of availability zones denoting the IP allocated for the resource needs to come from. */
  zones?: Array<string>;
}

/** Properties of Frontend IP Configuration of the load balancer. */
export interface FrontendIPConfigurationPropertiesFormatOutput {
  /** An array of references to inbound rules that use this frontend IP. */
  readonly inboundNatRules?: Array<SubResourceOutput>;
  /** An array of references to inbound pools that use this frontend IP. */
  readonly inboundNatPools?: Array<SubResourceOutput>;
  /** An array of references to outbound rules that use this frontend IP. */
  readonly outboundRules?: Array<SubResourceOutput>;
  /** An array of references to load balancing rules that use this frontend IP. */
  readonly loadBalancingRules?: Array<SubResourceOutput>;
  /** The private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** The Private IP allocation method. */
  privateIPAllocationMethod?: "Static" | "Dynamic";
  /** Whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. */
  privateIPAddressVersion?: "IPv4" | "IPv6";
  /** The reference to the subnet resource. */
  subnet?: SubnetOutput;
  /** The reference to the Public IP resource. */
  publicIPAddress?: PublicIPAddressOutput;
  /** The reference to the Public IP Prefix resource. */
  publicIPPrefix?: SubResourceOutput;
  /** The reference to gateway load balancer frontend IP. */
  gatewayLoadBalancer?: SubResourceOutput;
  /** The provisioning state of the frontend IP configuration resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Subnet in a virtual network resource. */
export interface SubnetOutput extends SubResourceOutput {
  /** Properties of the subnet. */
  properties?: SubnetPropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Resource type. */
  type?: string;
}

/** Properties of the subnet. */
export interface SubnetPropertiesFormatOutput {
  /** The address prefix for the subnet. */
  addressPrefix?: string;
  /** List of address prefixes for the subnet. */
  addressPrefixes?: Array<string>;
  /** The reference to the NetworkSecurityGroup resource. */
  networkSecurityGroup?: NetworkSecurityGroupOutput;
  /** The reference to the RouteTable resource. */
  routeTable?: RouteTableOutput;
  /** Nat gateway associated with this subnet. */
  natGateway?: SubResourceOutput;
  /** An array of service endpoints. */
  serviceEndpoints?: Array<ServiceEndpointPropertiesFormatOutput>;
  /** An array of service endpoint policies. */
  serviceEndpointPolicies?: Array<ServiceEndpointPolicyOutput>;
  /** An array of references to private endpoints. */
  readonly privateEndpoints?: Array<PrivateEndpointOutput>;
  /** An array of references to the network interface IP configurations using subnet. */
  readonly ipConfigurations?: Array<IPConfigurationOutput>;
  /** Array of IP configuration profiles which reference this subnet. */
  readonly ipConfigurationProfiles?: Array<IPConfigurationProfileOutput>;
  /** Array of IpAllocation which reference this subnet. */
  ipAllocations?: Array<SubResourceOutput>;
  /** An array of references to the external resources using subnet. */
  readonly resourceNavigationLinks?: Array<ResourceNavigationLinkOutput>;
  /** An array of references to services injecting into this subnet. */
  readonly serviceAssociationLinks?: Array<ServiceAssociationLinkOutput>;
  /** An array of references to the delegations on the subnet. */
  delegations?: Array<DelegationOutput>;
  /** A read-only string identifying the intention of use for this subnet based on delegations and other user-defined properties. */
  readonly purpose?: string;
  /** The provisioning state of the subnet resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Enable or Disable apply network policies on private end point in the subnet. */
  privateEndpointNetworkPolicies?: "Enabled" | "Disabled";
  /** Enable or Disable apply network policies on private link service in the subnet. */
  privateLinkServiceNetworkPolicies?: "Enabled" | "Disabled";
  /** Application gateway IP configurations of virtual network resource. */
  applicationGatewayIpConfigurations?: Array<ApplicationGatewayIPConfigurationOutput>;
}

/** NetworkSecurityGroup resource. */
export interface NetworkSecurityGroupOutput extends ResourceOutput {
  /** Properties of the network security group. */
  properties?: NetworkSecurityGroupPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Network Security Group resource. */
export interface NetworkSecurityGroupPropertiesFormatOutput {
  /** When enabled, flows created from Network Security Group connections will be re-evaluated when rules are updates. Initial enablement will trigger re-evaluation. */
  flushConnection?: boolean;
  /** A collection of security rules of the network security group. */
  securityRules?: Array<SecurityRuleOutput>;
  /** The default security rules of network security group. */
  readonly defaultSecurityRules?: Array<SecurityRuleOutput>;
  /** A collection of references to network interfaces. */
  readonly networkInterfaces?: Array<NetworkInterfaceOutput>;
  /** A collection of references to subnets. */
  readonly subnets?: Array<SubnetOutput>;
  /** A collection of references to flow log resources. */
  readonly flowLogs?: Array<FlowLogOutput>;
  /** The resource GUID property of the network security group resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the network security group resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Network security rule. */
export interface SecurityRuleOutput extends SubResourceOutput {
  /** Properties of the security rule. */
  properties?: SecurityRulePropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The type of the resource. */
  type?: string;
}

/** Security rule resource. */
export interface SecurityRulePropertiesFormatOutput {
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
  sourceApplicationSecurityGroups?: Array<ApplicationSecurityGroupOutput>;
  /** The destination address prefix. CIDR or destination IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used. */
  destinationAddressPrefix?: string;
  /** The destination address prefixes. CIDR or destination IP ranges. */
  destinationAddressPrefixes?: Array<string>;
  /** The application security group specified as destination. */
  destinationApplicationSecurityGroups?: Array<ApplicationSecurityGroupOutput>;
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
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** An application security group in a resource group. */
export interface ApplicationSecurityGroupOutput extends ResourceOutput {
  /** Properties of the application security group. */
  properties?: ApplicationSecurityGroupPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Application security group properties. */
export interface ApplicationSecurityGroupPropertiesFormatOutput {
  /** The resource GUID property of the application security group resource. It uniquely identifies a resource, even if the user changes its name or migrate the resource across subscriptions or resource groups. */
  readonly resourceGuid?: string;
  /** The provisioning state of the application security group resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Common resource representation. */
export interface ResourceOutput {
  /** Resource ID. */
  id?: string;
  /** Resource name. */
  readonly name?: string;
  /** Resource type. */
  readonly type?: string;
  /** Resource location. */
  location?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** A network interface in a resource group. */
export interface NetworkInterfaceOutput extends ResourceOutput {
  /** The extended location of the network interface. */
  extendedLocation?: ExtendedLocationOutput;
  /** Properties of the network interface. */
  properties?: NetworkInterfacePropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** ExtendedLocation complex type. */
export interface ExtendedLocationOutput {
  /** The name of the extended location. */
  name?: string;
  /** The type of the extended location. */
  type?: "EdgeZone";
}

/** NetworkInterface properties. */
export interface NetworkInterfacePropertiesFormatOutput {
  /** The reference to a virtual machine. */
  readonly virtualMachine?: SubResourceOutput;
  /** The reference to the NetworkSecurityGroup resource. */
  networkSecurityGroup?: NetworkSecurityGroupOutput;
  /** A reference to the private endpoint to which the network interface is linked. */
  readonly privateEndpoint?: PrivateEndpointOutput;
  /** A list of IPConfigurations of the network interface. */
  ipConfigurations?: Array<NetworkInterfaceIPConfigurationOutput>;
  /** A list of TapConfigurations of the network interface. */
  readonly tapConfigurations?: Array<NetworkInterfaceTapConfigurationOutput>;
  /** The DNS settings in network interface. */
  dnsSettings?: NetworkInterfaceDnsSettingsOutput;
  /** The MAC address of the network interface. */
  readonly macAddress?: string;
  /** Whether this is a primary network interface on a virtual machine. */
  readonly primary?: boolean;
  /** Whether the virtual machine this nic is attached to supports encryption. */
  readonly vnetEncryptionSupported?: boolean;
  /** If the network interface is configured for accelerated networking. Not applicable to VM sizes which require accelerated networking. */
  enableAcceleratedNetworking?: boolean;
  /** Indicates whether to disable tcp state tracking. */
  disableTcpStateTracking?: boolean;
  /** Indicates whether IP forwarding is enabled on this network interface. */
  enableIPForwarding?: boolean;
  /** A list of references to linked BareMetal resources. */
  readonly hostedWorkloads?: Array<string>;
  /** A reference to the dscp configuration to which the network interface is linked. */
  readonly dscpConfiguration?: SubResourceOutput;
  /** The resource GUID property of the network interface resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the network interface resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** WorkloadType of the NetworkInterface for BareMetal resources */
  workloadType?: string;
  /** Type of Network Interface resource. */
  nicType?: "Standard" | "Elastic";
  /** Privatelinkservice of the network interface resource. */
  privateLinkService?: PrivateLinkServiceOutput;
  /** Migration phase of Network Interface resource. */
  migrationPhase?: "None" | "Prepare" | "Commit" | "Abort" | "Committed";
  /** Auxiliary mode of Network Interface resource. */
  auxiliaryMode?: "None" | "MaxConnections" | "Floating";
}

/** Private endpoint resource. */
export interface PrivateEndpointOutput extends ResourceOutput {
  /** The extended location of the load balancer. */
  extendedLocation?: ExtendedLocationOutput;
  /** Properties of the private endpoint. */
  properties?: PrivateEndpointPropertiesOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of the private endpoint. */
export interface PrivateEndpointPropertiesOutput {
  /** The ID of the subnet from which the private IP will be allocated. */
  subnet?: SubnetOutput;
  /** An array of references to the network interfaces created for this private endpoint. */
  readonly networkInterfaces?: Array<NetworkInterfaceOutput>;
  /** The provisioning state of the private endpoint resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** A grouping of information about the connection to the remote resource. */
  privateLinkServiceConnections?: Array<PrivateLinkServiceConnectionOutput>;
  /** A grouping of information about the connection to the remote resource. Used when the network admin does not have access to approve connections to the remote resource. */
  manualPrivateLinkServiceConnections?: Array<PrivateLinkServiceConnectionOutput>;
  /** An array of custom dns configurations. */
  customDnsConfigs?: Array<CustomDnsConfigPropertiesFormatOutput>;
  /** Application security groups in which the private endpoint IP configuration is included. */
  applicationSecurityGroups?: Array<ApplicationSecurityGroupOutput>;
  /** A list of IP configurations of the private endpoint. This will be used to map to the First Party Service's endpoints. */
  ipConfigurations?: Array<PrivateEndpointIPConfigurationOutput>;
  /** The custom name of the network interface attached to the private endpoint. */
  customNetworkInterfaceName?: string;
}

/** PrivateLinkServiceConnection resource. */
export interface PrivateLinkServiceConnectionOutput extends SubResourceOutput {
  /** Properties of the private link service connection. */
  properties?: PrivateLinkServiceConnectionPropertiesOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** The resource type. */
  readonly type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of the PrivateLinkServiceConnection. */
export interface PrivateLinkServiceConnectionPropertiesOutput {
  /** The provisioning state of the private link service connection resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The resource id of private link service. */
  privateLinkServiceId?: string;
  /** The ID(s) of the group(s) obtained from the remote resource that this private endpoint should connect to. */
  groupIds?: Array<string>;
  /** A message passed to the owner of the remote resource with this connection request. Restricted to 140 chars. */
  requestMessage?: string;
  /** A collection of read-only information about the state of the connection to the remote resource. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateOutput;
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionStateOutput {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: string;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

/** Contains custom Dns resolution configuration from customer. */
export interface CustomDnsConfigPropertiesFormatOutput {
  /** Fqdn that resolves to private endpoint ip address. */
  fqdn?: string;
  /** A list of private ip addresses of the private endpoint. */
  ipAddresses?: Array<string>;
}

/** An IP Configuration of the private endpoint. */
export interface PrivateEndpointIPConfigurationOutput {
  /** Properties of private endpoint IP configurations. */
  properties?: PrivateEndpointIPConfigurationPropertiesOutput;
  /** The name of the resource that is unique within a resource group. */
  name?: string;
  /** The resource type. */
  readonly type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of an IP Configuration of the private endpoint. */
export interface PrivateEndpointIPConfigurationPropertiesOutput {
  /** The ID of a group obtained from the remote resource that this private endpoint should connect to. */
  groupId?: string;
  /** The member name of a group obtained from the remote resource that this private endpoint should connect to. */
  memberName?: string;
  /** A private ip address obtained from the private endpoint's subnet. */
  privateIPAddress?: string;
}

/** DNS settings of a network interface. */
export interface NetworkInterfaceDnsSettingsOutput {
  /** List of DNS servers IP addresses. Use 'AzureProvidedDNS' to switch to azure provided DNS resolution. 'AzureProvidedDNS' value cannot be combined with other IPs, it must be the only value in dnsServers collection. */
  dnsServers?: Array<string>;
  /** If the VM that uses this NIC is part of an Availability Set, then this list will have the union of all DNS servers from all NICs that are part of the Availability Set. This property is what is configured on each of those VMs. */
  readonly appliedDnsServers?: Array<string>;
  /** Relative DNS name for this NIC used for internal communications between VMs in the same virtual network. */
  internalDnsNameLabel?: string;
  /** Fully qualified DNS name supporting internal communications between VMs in the same virtual network. */
  readonly internalFqdn?: string;
  /** Even if internalDnsNameLabel is not specified, a DNS entry is created for the primary NIC of the VM. This DNS name can be constructed by concatenating the VM name with the value of internalDomainNameSuffix. */
  readonly internalDomainNameSuffix?: string;
}

/** Private link service resource. */
export interface PrivateLinkServiceOutput extends ResourceOutput {
  /** The extended location of the load balancer. */
  extendedLocation?: ExtendedLocationOutput;
  /** Properties of the private link service. */
  properties?: PrivateLinkServicePropertiesOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of the private link service. */
export interface PrivateLinkServicePropertiesOutput {
  /** An array of references to the load balancer IP configurations. */
  loadBalancerFrontendIpConfigurations?: Array<FrontendIPConfigurationOutput>;
  /** An array of private link service IP configurations. */
  ipConfigurations?: Array<PrivateLinkServiceIpConfigurationOutput>;
  /** An array of references to the network interfaces created for this private link service. */
  readonly networkInterfaces?: Array<NetworkInterfaceOutput>;
  /** The provisioning state of the private link service resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** An array of list about connections to the private endpoint. */
  readonly privateEndpointConnections?: Array<PrivateEndpointConnectionOutput>;
  /** The visibility list of the private link service. */
  visibility?: PrivateLinkServicePropertiesVisibilityOutput;
  /** The auto-approval list of the private link service. */
  autoApproval?: PrivateLinkServicePropertiesAutoApprovalOutput;
  /** The list of Fqdn. */
  fqdns?: Array<string>;
  /** The alias of the private link service. */
  readonly alias?: string;
  /** Whether the private link service is enabled for proxy protocol or not. */
  enableProxyProtocol?: boolean;
}

/** The private link service ip configuration. */
export interface PrivateLinkServiceIpConfigurationOutput extends SubResourceOutput {
  /** Properties of the private link service ip configuration. */
  properties?: PrivateLinkServiceIpConfigurationPropertiesOutput;
  /** The name of private link service ip configuration. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The resource type. */
  readonly type?: string;
}

/** Properties of private link service IP configuration. */
export interface PrivateLinkServiceIpConfigurationPropertiesOutput {
  /** The private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: "Static" | "Dynamic";
  /** The reference to the subnet resource. */
  subnet?: SubnetOutput;
  /** Whether the ip configuration is primary or not. */
  primary?: boolean;
  /** The provisioning state of the private link service IP configuration resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Whether the specific IP configuration is IPv4 or IPv6. Default is IPv4. */
  privateIPAddressVersion?: "IPv4" | "IPv6";
}

/** PrivateEndpointConnection resource. */
export interface PrivateEndpointConnectionOutput extends SubResourceOutput {
  /** Properties of the private end point connection. */
  properties?: PrivateEndpointConnectionPropertiesOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** The resource type. */
  readonly type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of the PrivateEndpointConnectProperties. */
export interface PrivateEndpointConnectionPropertiesOutput {
  /** The resource of private end point. */
  readonly privateEndpoint?: PrivateEndpointOutput;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateOutput;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The consumer link id. */
  readonly linkIdentifier?: string;
}

/** The visibility list of the private link service. */
export interface PrivateLinkServicePropertiesVisibilityOutput extends ResourceSetOutput {}

/** The base resource set for visibility and auto-approval. */
export interface ResourceSetOutput {
  /** The list of subscriptions. */
  subscriptions?: Array<string>;
}

/** The auto-approval list of the private link service. */
export interface PrivateLinkServicePropertiesAutoApprovalOutput extends ResourceSetOutput {}

/** A flow log resource. */
export interface FlowLogOutput extends ResourceOutput {
  /** Properties of the flow log. */
  properties?: FlowLogPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Parameters that define the configuration of flow log. */
export interface FlowLogPropertiesFormatOutput {
  /** ID of network security group to which flow log will be applied. */
  targetResourceId: string;
  /** Guid of network security group to which flow log will be applied. */
  readonly targetResourceGuid?: string;
  /** ID of the storage account which is used to store the flow log. */
  storageId: string;
  /** Flag to enable/disable flow logging. */
  enabled?: boolean;
  /** Parameters that define the retention policy for flow log. */
  retentionPolicy?: RetentionPolicyParametersOutput;
  /** Parameters that define the flow log format. */
  format?: FlowLogFormatParametersOutput;
  /** Parameters that define the configuration of traffic analytics. */
  flowAnalyticsConfiguration?: TrafficAnalyticsPropertiesOutput;
  /** The provisioning state of the flow log. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Parameters that define the retention policy for flow log. */
export interface RetentionPolicyParametersOutput {
  /** Number of days to retain flow log records. */
  days?: number;
  /** Flag to enable/disable retention. */
  enabled?: boolean;
}

/** Parameters that define the flow log format. */
export interface FlowLogFormatParametersOutput {
  /** The file type of flow log. */
  type?: "JSON";
  /** The version (revision) of the flow log. */
  version?: number;
}

/** Parameters that define the configuration of traffic analytics. */
export interface TrafficAnalyticsPropertiesOutput {
  /** Parameters that define the configuration of traffic analytics. */
  networkWatcherFlowAnalyticsConfiguration?: TrafficAnalyticsConfigurationPropertiesOutput;
}

/** Parameters that define the configuration of traffic analytics. */
export interface TrafficAnalyticsConfigurationPropertiesOutput {
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
export interface RouteTableOutput extends ResourceOutput {
  /** Properties of the route table. */
  properties?: RouteTablePropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Route Table resource. */
export interface RouteTablePropertiesFormatOutput {
  /** Collection of routes contained within a route table. */
  routes?: Array<RouteOutput>;
  /** A collection of references to subnets. */
  readonly subnets?: Array<SubnetOutput>;
  /** Whether to disable the routes learned by BGP on that route table. True means disable. */
  disableBgpRoutePropagation?: boolean;
  /** The provisioning state of the route table resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The resource GUID property of the route table. */
  readonly resourceGuid?: string;
}

/** Route resource. */
export interface RouteOutput extends SubResourceOutput {
  /** Properties of the route. */
  properties?: RoutePropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The type of the resource. */
  type?: string;
}

/** Route resource. */
export interface RoutePropertiesFormatOutput {
  /** The destination CIDR to which the route applies. */
  addressPrefix?: string;
  /** The type of Azure hop the packet should be sent to. */
  nextHopType: "VirtualNetworkGateway" | "VnetLocal" | "Internet" | "VirtualAppliance" | "None";
  /** The IP address packets should be forwarded to. Next hop values are only allowed in routes where the next hop type is VirtualAppliance. */
  nextHopIpAddress?: string;
  /** The provisioning state of the route resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** A value indicating whether this route overrides overlapping BGP routes regardless of LPM. */
  hasBgpOverride?: boolean;
}

/** The service endpoint properties. */
export interface ServiceEndpointPropertiesFormatOutput {
  /** The type of the endpoint service. */
  service?: string;
  /** A list of locations. */
  locations?: Array<string>;
  /** The provisioning state of the service endpoint resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Service End point policy resource. */
export interface ServiceEndpointPolicyOutput extends ResourceOutput {
  /** Properties of the service end point policy. */
  properties?: ServiceEndpointPolicyPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Kind of service endpoint policy. This is metadata used for the Azure portal experience. */
  readonly kind?: string;
}

/** Service Endpoint Policy resource. */
export interface ServiceEndpointPolicyPropertiesFormatOutput {
  /** A collection of service endpoint policy definitions of the service endpoint policy. */
  serviceEndpointPolicyDefinitions?: Array<ServiceEndpointPolicyDefinitionOutput>;
  /** A collection of references to subnets. */
  readonly subnets?: Array<SubnetOutput>;
  /** The resource GUID property of the service endpoint policy resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the service endpoint policy resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The alias indicating if the policy belongs to a service */
  serviceAlias?: string;
  /** A collection of contextual service endpoint policy. */
  contextualServiceEndpointPolicies?: Array<string>;
}

/** Service Endpoint policy definitions. */
export interface ServiceEndpointPolicyDefinitionOutput extends SubResourceOutput {
  /** Properties of the service endpoint policy definition. */
  properties?: ServiceEndpointPolicyDefinitionPropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The type of the resource. */
  type?: string;
}

/** Service Endpoint policy definition resource. */
export interface ServiceEndpointPolicyDefinitionPropertiesFormatOutput {
  /** A description for this rule. Restricted to 140 chars. */
  description?: string;
  /** Service endpoint name. */
  service?: string;
  /** A list of service resources. */
  serviceResources?: Array<string>;
  /** The provisioning state of the service endpoint policy definition resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** IP configuration. */
export interface IPConfigurationOutput extends SubResourceOutput {
  /** Properties of the IP configuration. */
  properties?: IPConfigurationPropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of IP configuration. */
export interface IPConfigurationPropertiesFormatOutput {
  /** The private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: "Static" | "Dynamic";
  /** The reference to the subnet resource. */
  subnet?: SubnetOutput;
  /** The reference to the public IP resource. */
  publicIPAddress?: PublicIPAddressOutput;
  /** The provisioning state of the IP configuration resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Public IP address resource. */
export interface PublicIPAddressOutput extends ResourceOutput {
  /** The extended location of the public ip address. */
  extendedLocation?: ExtendedLocationOutput;
  /** The public IP address SKU. */
  sku?: PublicIPAddressSkuOutput;
  /** Public IP address properties. */
  properties?: PublicIPAddressPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** A list of availability zones denoting the IP allocated for the resource needs to come from. */
  zones?: Array<string>;
}

/** SKU of a public IP address. */
export interface PublicIPAddressSkuOutput {
  /** Name of a public IP address SKU. */
  name?: "Basic" | "Standard";
  /** Tier of a public IP address SKU. */
  tier?: "Regional" | "Global";
}

/** Public IP address properties. */
export interface PublicIPAddressPropertiesFormatOutput {
  /** The public IP address allocation method. */
  publicIPAllocationMethod?: "Static" | "Dynamic";
  /** The public IP address version. */
  publicIPAddressVersion?: "IPv4" | "IPv6";
  /** The IP configuration associated with the public IP address. */
  readonly ipConfiguration?: IPConfigurationOutput;
  /** The FQDN of the DNS record associated with the public IP address. */
  dnsSettings?: PublicIPAddressDnsSettingsOutput;
  /** The DDoS protection custom policy associated with the public IP address. */
  ddosSettings?: DdosSettingsOutput;
  /** The list of tags associated with the public IP address. */
  ipTags?: Array<IpTagOutput>;
  /** The IP address associated with the public IP address resource. */
  ipAddress?: string;
  /** The Public IP Prefix this Public IP Address should be allocated from. */
  publicIPPrefix?: SubResourceOutput;
  /** The idle timeout of the public IP address. */
  idleTimeoutInMinutes?: number;
  /** The resource GUID property of the public IP address resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the public IP address resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The service public IP address of the public IP address resource. */
  servicePublicIPAddress?: PublicIPAddressOutput;
  /** The NatGateway for the Public IP address. */
  natGateway?: NatGatewayOutput;
  /** Migration phase of Public IP Address. */
  migrationPhase?: "None" | "Prepare" | "Commit" | "Abort" | "Committed";
  /** The linked public IP address of the public IP address resource. */
  linkedPublicIPAddress?: PublicIPAddressOutput;
  /** Specify what happens to the public IP address when the VM using it is deleted */
  deleteOption?: "Delete" | "Detach";
}

/** Contains FQDN of the DNS record associated with the public IP address. */
export interface PublicIPAddressDnsSettingsOutput {
  /** The domain name label. The concatenation of the domain name label and the regionalized DNS zone make up the fully qualified domain name associated with the public IP address. If a domain name label is specified, an A DNS record is created for the public IP in the Microsoft Azure DNS system. */
  domainNameLabel?: string;
  /** The Fully Qualified Domain Name of the A DNS record associated with the public IP. This is the concatenation of the domainNameLabel and the regionalized DNS zone. */
  fqdn?: string;
  /** The reverse FQDN. A user-visible, fully qualified domain name that resolves to this public IP address. If the reverseFqdn is specified, then a PTR DNS record is created pointing from the IP address in the in-addr.arpa domain to the reverse FQDN. */
  reverseFqdn?: string;
}

/** Contains the DDoS protection settings of the public IP. */
export interface DdosSettingsOutput {
  /** The DDoS protection mode of the public IP */
  protectionMode?: "VirtualNetworkInherited" | "Enabled" | "Disabled";
  /** The DDoS protection plan associated with the public IP. Can only be set if ProtectionMode is Enabled */
  ddosProtectionPlan?: SubResourceOutput;
}

/** Contains the IpTag associated with the object. */
export interface IpTagOutput {
  /** The IP tag type. Example: FirstPartyUsage. */
  ipTagType?: string;
  /** The value of the IP tag associated with the public IP. Example: SQL. */
  tag?: string;
}

/** Nat Gateway resource. */
export interface NatGatewayOutput extends ResourceOutput {
  /** The nat gateway SKU. */
  sku?: NatGatewaySkuOutput;
  /** Nat Gateway properties. */
  properties?: NatGatewayPropertiesFormatOutput;
  /** A list of availability zones denoting the zone in which Nat Gateway should be deployed. */
  zones?: Array<string>;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** SKU of nat gateway. */
export interface NatGatewaySkuOutput {
  /** Name of Nat Gateway SKU. */
  name?: "Standard";
}

/** Nat Gateway properties. */
export interface NatGatewayPropertiesFormatOutput {
  /** The idle timeout of the nat gateway. */
  idleTimeoutInMinutes?: number;
  /** An array of public ip addresses associated with the nat gateway resource. */
  publicIpAddresses?: Array<SubResourceOutput>;
  /** An array of public ip prefixes associated with the nat gateway resource. */
  publicIpPrefixes?: Array<SubResourceOutput>;
  /** An array of references to the subnets using this nat gateway resource. */
  readonly subnets?: Array<SubResourceOutput>;
  /** The resource GUID property of the NAT gateway resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the NAT gateway resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** IP configuration profile child resource. */
export interface IPConfigurationProfileOutput extends SubResourceOutput {
  /** Properties of the IP configuration profile. */
  properties?: IPConfigurationProfilePropertiesFormatOutput;
  /** The name of the resource. This name can be used to access the resource. */
  name?: string;
  /** Sub Resource type. */
  readonly type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** IP configuration profile properties. */
export interface IPConfigurationProfilePropertiesFormatOutput {
  /** The reference to the subnet resource to create a container network interface ip configuration. */
  subnet?: SubnetOutput;
  /** The provisioning state of the IP configuration profile resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** ResourceNavigationLink resource. */
export interface ResourceNavigationLinkOutput extends SubResourceOutput {
  /** Resource navigation link properties format. */
  properties?: ResourceNavigationLinkFormatOutput;
  /** Name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Resource type. */
  readonly type?: string;
}

/** Properties of ResourceNavigationLink. */
export interface ResourceNavigationLinkFormatOutput {
  /** Resource type of the linked resource. */
  linkedResourceType?: string;
  /** Link to the external resource. */
  link?: string;
  /** The provisioning state of the resource navigation link resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** ServiceAssociationLink resource. */
export interface ServiceAssociationLinkOutput extends SubResourceOutput {
  /** Resource navigation link properties format. */
  properties?: ServiceAssociationLinkPropertiesFormatOutput;
  /** Name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Resource type. */
  readonly type?: string;
}

/** Properties of ServiceAssociationLink. */
export interface ServiceAssociationLinkPropertiesFormatOutput {
  /** Resource type of the linked resource. */
  linkedResourceType?: string;
  /** Link to the external resource. */
  link?: string;
  /** The provisioning state of the service association link resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** If true, the resource can be deleted. */
  allowDelete?: boolean;
  /** A list of locations. */
  locations?: Array<string>;
}

/** Details the service to which the subnet is delegated. */
export interface DelegationOutput extends SubResourceOutput {
  /** Properties of the subnet. */
  properties?: ServiceDelegationPropertiesFormatOutput;
  /** The name of the resource that is unique within a subnet. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Resource type. */
  type?: string;
}

/** Properties of a service delegation. */
export interface ServiceDelegationPropertiesFormatOutput {
  /** The name of the service to whom the subnet should be delegated (e.g. Microsoft.Sql/servers). */
  serviceName?: string;
  /** The actions permitted to the service upon delegation. */
  readonly actions?: Array<string>;
  /** The provisioning state of the service delegation resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Pool of backend IP addresses. */
export interface BackendAddressPoolOutput extends SubResourceOutput {
  /** Properties of load balancer backend address pool. */
  properties?: BackendAddressPoolPropertiesFormatOutput;
  /** The name of the resource that is unique within the set of backend address pools used by the load balancer. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of the backend address pool. */
export interface BackendAddressPoolPropertiesFormatOutput {
  /** The location of the backend address pool. */
  location?: string;
  /** An array of gateway load balancer tunnel interfaces. */
  tunnelInterfaces?: Array<GatewayLoadBalancerTunnelInterfaceOutput>;
  /** An array of backend addresses. */
  loadBalancerBackendAddresses?: Array<LoadBalancerBackendAddressOutput>;
  /** An array of references to IP addresses defined in network interfaces. */
  readonly backendIPConfigurations?: Array<NetworkInterfaceIPConfigurationOutput>;
  /** An array of references to load balancing rules that use this backend address pool. */
  readonly loadBalancingRules?: Array<SubResourceOutput>;
  /** A reference to an outbound rule that uses this backend address pool. */
  readonly outboundRule?: SubResourceOutput;
  /** An array of references to outbound rules that use this backend address pool. */
  readonly outboundRules?: Array<SubResourceOutput>;
  /** An array of references to inbound NAT rules that use this backend address pool. */
  readonly inboundNatRules?: Array<SubResourceOutput>;
  /** The provisioning state of the backend address pool resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Amount of seconds Load Balancer waits for before sending RESET to client and backend address. */
  drainPeriodInSeconds?: number;
}

/** Gateway load balancer tunnel interface of a load balancer backend address pool. */
export interface GatewayLoadBalancerTunnelInterfaceOutput {
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
export interface LoadBalancerBackendAddressOutput {
  /** Properties of load balancer backend address pool. */
  properties?: LoadBalancerBackendAddressPropertiesFormatOutput;
  /** Name of the backend address. */
  name?: string;
}

/** Properties of the load balancer backend addresses. */
export interface LoadBalancerBackendAddressPropertiesFormatOutput {
  /** Reference to an existing virtual network. */
  virtualNetwork?: SubResourceOutput;
  /** Reference to an existing subnet. */
  subnet?: SubResourceOutput;
  /** IP Address belonging to the referenced virtual network. */
  ipAddress?: string;
  /** Reference to IP address defined in network interfaces. */
  readonly networkInterfaceIPConfiguration?: SubResourceOutput;
  /** Reference to the frontend ip address configuration defined in regional loadbalancer. */
  loadBalancerFrontendIPConfiguration?: SubResourceOutput;
  /** Collection of inbound NAT rule port mappings. */
  readonly inboundNatRulesPortMapping?: Array<NatRulePortMappingOutput>;
  /** A list of administrative states which once set can override health probe so that Load Balancer will always forward new connections to backend, or deny new connections and reset existing connections. */
  adminState?: "None" | "Up" | "Down" | "Drain";
}

/** Individual port mappings for inbound NAT rule created for backend pool. */
export interface NatRulePortMappingOutput {
  /** Name of inbound NAT rule. */
  inboundNatRuleName?: string;
  /** Frontend port. */
  frontendPort?: number;
  /** Backend port. */
  backendPort?: number;
}

/** Inbound NAT rule of the load balancer. */
export interface InboundNatRuleOutput extends SubResourceOutput {
  /** Properties of load balancer inbound NAT rule. */
  properties?: InboundNatRulePropertiesFormatOutput;
  /** The name of the resource that is unique within the set of inbound NAT rules used by the load balancer. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of the inbound NAT rule. */
export interface InboundNatRulePropertiesFormatOutput {
  /** A reference to frontend IP addresses. */
  frontendIPConfiguration?: SubResourceOutput;
  /** A reference to a private IP address defined on a network interface of a VM. Traffic sent to the frontend port of each of the frontend IP configurations is forwarded to the backend IP. */
  readonly backendIPConfiguration?: NetworkInterfaceIPConfigurationOutput;
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
  backendAddressPool?: SubResourceOutput;
  /** The provisioning state of the inbound NAT rule resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** PrivateLinkConnection properties for the network interface. */
export interface NetworkInterfaceIPConfigurationPrivateLinkConnectionPropertiesOutput {
  /** The group ID for current private link connection. */
  readonly groupId?: string;
  /** The required member name for current private link connection. */
  readonly requiredMemberName?: string;
  /** List of FQDNs for current private link connection. */
  readonly fqdns?: Array<string>;
}

/** Backend address of an application gateway. */
export interface ApplicationGatewayBackendAddressOutput {
  /** Fully qualified domain name (FQDN). */
  fqdn?: string;
  /** IP address. */
  ipAddress?: string;
}

/** Backend address pool settings of an application gateway. */
export interface ApplicationGatewayBackendHttpSettingsOutput extends SubResourceOutput {
  /** Properties of the application gateway backend HTTP settings. */
  properties?: ApplicationGatewayBackendHttpSettingsPropertiesFormatOutput;
  /** Name of the backend http settings that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of Backend address pool settings of an application gateway. */
export interface ApplicationGatewayBackendHttpSettingsPropertiesFormatOutput {
  /** The destination port on the backend. */
  port?: number;
  /** The protocol used to communicate with the backend. */
  protocol?: "Http" | "Https" | "Tcp" | "Tls";
  /** Cookie based affinity. */
  cookieBasedAffinity?: "Enabled" | "Disabled";
  /** Request timeout in seconds. Application Gateway will fail the request if response is not received within RequestTimeout. Acceptable values are from 1 second to 86400 seconds. */
  requestTimeout?: number;
  /** Probe resource of an application gateway. */
  probe?: SubResourceOutput;
  /** Array of references to application gateway authentication certificates. */
  authenticationCertificates?: Array<SubResourceOutput>;
  /** Array of references to application gateway trusted root certificates. */
  trustedRootCertificates?: Array<SubResourceOutput>;
  /** Connection draining of the backend http settings resource. */
  connectionDraining?: ApplicationGatewayConnectionDrainingOutput;
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
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Connection draining allows open connections to a backend server to be active for a specified time after the backend server got removed from the configuration. */
export interface ApplicationGatewayConnectionDrainingOutput {
  /** Whether connection draining is enabled or not. */
  enabled: boolean;
  /** The number of seconds connection draining is active. Acceptable values are from 1 second to 3600 seconds. */
  drainTimeoutInSec: number;
}

/** Backend address pool settings of an application gateway. */
export interface ApplicationGatewayBackendSettingsOutput extends SubResourceOutput {
  /** Properties of the application gateway backend settings. */
  properties?: ApplicationGatewayBackendSettingsPropertiesFormatOutput;
  /** Name of the backend settings that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of Backend address pool settings of an application gateway. */
export interface ApplicationGatewayBackendSettingsPropertiesFormatOutput {
  /** The destination port on the backend. */
  port?: number;
  /** The protocol used to communicate with the backend. */
  protocol?: "Http" | "Https" | "Tcp" | "Tls";
  /** Connection timeout in seconds. Application Gateway will fail the request if response is not received within ConnectionTimeout. Acceptable values are from 1 second to 86400 seconds. */
  timeout?: number;
  /** Probe resource of an application gateway. */
  probe?: SubResourceOutput;
  /** Array of references to application gateway trusted root certificates. */
  trustedRootCertificates?: Array<SubResourceOutput>;
  /** Server name indication to be sent to the backend servers for Tls protocol. */
  hostName?: string;
  /** Whether to pick server name indication from the host name of the backend server for Tls protocol. Default value is false. */
  pickHostNameFromBackendAddress?: boolean;
  /** The provisioning state of the backend HTTP settings resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Http listener of an application gateway. */
export interface ApplicationGatewayHttpListenerOutput extends SubResourceOutput {
  /** Properties of the application gateway HTTP listener. */
  properties?: ApplicationGatewayHttpListenerPropertiesFormatOutput;
  /** Name of the HTTP listener that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of HTTP listener of an application gateway. */
export interface ApplicationGatewayHttpListenerPropertiesFormatOutput {
  /** Frontend IP configuration resource of an application gateway. */
  frontendIPConfiguration?: SubResourceOutput;
  /** Frontend port resource of an application gateway. */
  frontendPort?: SubResourceOutput;
  /** Protocol of the HTTP listener. */
  protocol?: "Http" | "Https" | "Tcp" | "Tls";
  /** Host name of HTTP listener. */
  hostName?: string;
  /** SSL certificate resource of an application gateway. */
  sslCertificate?: SubResourceOutput;
  /** SSL profile resource of the application gateway. */
  sslProfile?: SubResourceOutput;
  /** Applicable only if protocol is https. Enables SNI for multi-hosting. */
  requireServerNameIndication?: boolean;
  /** The provisioning state of the HTTP listener resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Custom error configurations of the HTTP listener. */
  customErrorConfigurations?: Array<ApplicationGatewayCustomErrorOutput>;
  /** Reference to the FirewallPolicy resource. */
  firewallPolicy?: SubResourceOutput;
  /** List of Host names for HTTP Listener that allows special wildcard characters as well. */
  hostNames?: Array<string>;
}

/** Customer error of an application gateway. */
export interface ApplicationGatewayCustomErrorOutput {
  /** Status code of the application gateway customer error. */
  statusCode?: "HttpStatus403" | "HttpStatus502";
  /** Error page URL of the application gateway customer error. */
  customErrorPageUrl?: string;
}

/** Listener of an application gateway. */
export interface ApplicationGatewayListenerOutput extends SubResourceOutput {
  /** Properties of the application gateway listener. */
  properties?: ApplicationGatewayListenerPropertiesFormatOutput;
  /** Name of the listener that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of listener of an application gateway. */
export interface ApplicationGatewayListenerPropertiesFormatOutput {
  /** Frontend IP configuration resource of an application gateway. */
  frontendIPConfiguration?: SubResourceOutput;
  /** Frontend port resource of an application gateway. */
  frontendPort?: SubResourceOutput;
  /** Protocol of the listener. */
  protocol?: "Http" | "Https" | "Tcp" | "Tls";
  /** SSL certificate resource of an application gateway. */
  sslCertificate?: SubResourceOutput;
  /** SSL profile resource of the application gateway. */
  sslProfile?: SubResourceOutput;
  /** The provisioning state of the listener resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** SSL profile of an application gateway. */
export interface ApplicationGatewaySslProfileOutput extends SubResourceOutput {
  /** Properties of the application gateway SSL profile. */
  properties?: ApplicationGatewaySslProfilePropertiesFormatOutput;
  /** Name of the SSL profile that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of SSL profile of an application gateway. */
export interface ApplicationGatewaySslProfilePropertiesFormatOutput {
  /** Array of references to application gateway trusted client certificates. */
  trustedClientCertificates?: Array<SubResourceOutput>;
  /** SSL policy of the application gateway resource. */
  sslPolicy?: ApplicationGatewaySslPolicyOutput;
  /** Client authentication configuration of the application gateway resource. */
  clientAuthConfiguration?: ApplicationGatewayClientAuthConfigurationOutput;
  /** The provisioning state of the HTTP listener resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Application gateway client authentication configuration. */
export interface ApplicationGatewayClientAuthConfigurationOutput {
  /** Verify client certificate issuer name on the application gateway. */
  verifyClientCertIssuerDN?: boolean;
  /** Verify client certificate revocation status. */
  verifyClientRevocation?: "None" | "OCSP";
}

/** UrlPathMaps give a url path to the backend mapping information for PathBasedRouting. */
export interface ApplicationGatewayUrlPathMapOutput extends SubResourceOutput {
  /** Properties of the application gateway URL path map. */
  properties?: ApplicationGatewayUrlPathMapPropertiesFormatOutput;
  /** Name of the URL path map that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of UrlPathMap of the application gateway. */
export interface ApplicationGatewayUrlPathMapPropertiesFormatOutput {
  /** Default backend address pool resource of URL path map. */
  defaultBackendAddressPool?: SubResourceOutput;
  /** Default backend http settings resource of URL path map. */
  defaultBackendHttpSettings?: SubResourceOutput;
  /** Default Rewrite rule set resource of URL path map. */
  defaultRewriteRuleSet?: SubResourceOutput;
  /** Default redirect configuration resource of URL path map. */
  defaultRedirectConfiguration?: SubResourceOutput;
  /** Default Load Distribution Policy resource of URL path map. */
  defaultLoadDistributionPolicy?: SubResourceOutput;
  /** Path rule of URL path map resource. */
  pathRules?: Array<ApplicationGatewayPathRuleOutput>;
  /** The provisioning state of the URL path map resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Path rule of URL path map of an application gateway. */
export interface ApplicationGatewayPathRuleOutput extends SubResourceOutput {
  /** Properties of the application gateway path rule. */
  properties?: ApplicationGatewayPathRulePropertiesFormatOutput;
  /** Name of the path rule that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of path rule of an application gateway. */
export interface ApplicationGatewayPathRulePropertiesFormatOutput {
  /** Path rules of URL path map. */
  paths?: Array<string>;
  /** Backend address pool resource of URL path map path rule. */
  backendAddressPool?: SubResourceOutput;
  /** Backend http settings resource of URL path map path rule. */
  backendHttpSettings?: SubResourceOutput;
  /** Redirect configuration resource of URL path map path rule. */
  redirectConfiguration?: SubResourceOutput;
  /** Rewrite rule set resource of URL path map path rule. */
  rewriteRuleSet?: SubResourceOutput;
  /** Load Distribution Policy resource of URL path map path rule. */
  loadDistributionPolicy?: SubResourceOutput;
  /** The provisioning state of the path rule resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Reference to the FirewallPolicy resource. */
  firewallPolicy?: SubResourceOutput;
}

/** Request routing rule of an application gateway. */
export interface ApplicationGatewayRequestRoutingRuleOutput extends SubResourceOutput {
  /** Properties of the application gateway request routing rule. */
  properties?: ApplicationGatewayRequestRoutingRulePropertiesFormatOutput;
  /** Name of the request routing rule that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of request routing rule of the application gateway. */
export interface ApplicationGatewayRequestRoutingRulePropertiesFormatOutput {
  /** Rule type. */
  ruleType?: "Basic" | "PathBasedRouting";
  /** Priority of the request routing rule. */
  priority?: number;
  /** Backend address pool resource of the application gateway. */
  backendAddressPool?: SubResourceOutput;
  /** Backend http settings resource of the application gateway. */
  backendHttpSettings?: SubResourceOutput;
  /** Http listener resource of the application gateway. */
  httpListener?: SubResourceOutput;
  /** URL path map resource of the application gateway. */
  urlPathMap?: SubResourceOutput;
  /** Rewrite Rule Set resource in Basic rule of the application gateway. */
  rewriteRuleSet?: SubResourceOutput;
  /** Redirect configuration resource of the application gateway. */
  redirectConfiguration?: SubResourceOutput;
  /** Load Distribution Policy resource of the application gateway. */
  loadDistributionPolicy?: SubResourceOutput;
  /** The provisioning state of the request routing rule resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Routing rule of an application gateway. */
export interface ApplicationGatewayRoutingRuleOutput extends SubResourceOutput {
  /** Properties of the application gateway routing rule. */
  properties?: ApplicationGatewayRoutingRulePropertiesFormatOutput;
  /** Name of the routing rule that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of routing rule of the application gateway. */
export interface ApplicationGatewayRoutingRulePropertiesFormatOutput {
  /** Rule type. */
  ruleType?: "Basic" | "PathBasedRouting";
  /** Priority of the routing rule. */
  priority: number;
  /** Backend address pool resource of the application gateway. */
  backendAddressPool?: SubResourceOutput;
  /** Backend settings resource of the application gateway. */
  backendSettings?: SubResourceOutput;
  /** Listener resource of the application gateway. */
  listener?: SubResourceOutput;
  /** The provisioning state of the request routing rule resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Rewrite rule set of an application gateway. */
export interface ApplicationGatewayRewriteRuleSetOutput extends SubResourceOutput {
  /** Properties of the application gateway rewrite rule set. */
  properties?: ApplicationGatewayRewriteRuleSetPropertiesFormatOutput;
  /** Name of the rewrite rule set that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of rewrite rule set of the application gateway. */
export interface ApplicationGatewayRewriteRuleSetPropertiesFormatOutput {
  /** Rewrite rules in the rewrite rule set. */
  rewriteRules?: Array<ApplicationGatewayRewriteRuleOutput>;
  /** The provisioning state of the rewrite rule set resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Rewrite rule of an application gateway. */
export interface ApplicationGatewayRewriteRuleOutput {
  /** Name of the rewrite rule that is unique within an Application Gateway. */
  name?: string;
  /** Rule Sequence of the rewrite rule that determines the order of execution of a particular rule in a RewriteRuleSet. */
  ruleSequence?: number;
  /** Conditions based on which the action set execution will be evaluated. */
  conditions?: Array<ApplicationGatewayRewriteRuleConditionOutput>;
  /** Set of actions to be done as part of the rewrite Rule. */
  actionSet?: ApplicationGatewayRewriteRuleActionSetOutput;
}

/** Set of conditions in the Rewrite Rule in Application Gateway. */
export interface ApplicationGatewayRewriteRuleConditionOutput {
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
export interface ApplicationGatewayRewriteRuleActionSetOutput {
  /** Request Header Actions in the Action Set. */
  requestHeaderConfigurations?: Array<ApplicationGatewayHeaderConfigurationOutput>;
  /** Response Header Actions in the Action Set. */
  responseHeaderConfigurations?: Array<ApplicationGatewayHeaderConfigurationOutput>;
  /** Url Configuration Action in the Action Set. */
  urlConfiguration?: ApplicationGatewayUrlConfigurationOutput;
}

/** Header configuration of the Actions set in Application Gateway. */
export interface ApplicationGatewayHeaderConfigurationOutput {
  /** Header name of the header configuration. */
  headerName?: string;
  /** Header value of the header configuration. */
  headerValue?: string;
}

/** Url configuration of the Actions set in Application Gateway. */
export interface ApplicationGatewayUrlConfigurationOutput {
  /** Url path which user has provided for url rewrite. Null means no path will be updated. Default value is null. */
  modifiedPath?: string;
  /** Query string which user has provided for url rewrite. Null means no query string will be updated. Default value is null. */
  modifiedQueryString?: string;
  /** If set as true, it will re-evaluate the url path map provided in path based request routing rules using modified path. Default value is false. */
  reroute?: boolean;
}

/** Redirect configuration of an application gateway. */
export interface ApplicationGatewayRedirectConfigurationOutput extends SubResourceOutput {
  /** Properties of the application gateway redirect configuration. */
  properties?: ApplicationGatewayRedirectConfigurationPropertiesFormatOutput;
  /** Name of the redirect configuration that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of redirect configuration of the application gateway. */
export interface ApplicationGatewayRedirectConfigurationPropertiesFormatOutput {
  /** HTTP redirection type. */
  redirectType?: "Permanent" | "Found" | "SeeOther" | "Temporary";
  /** Reference to a listener to redirect the request to. */
  targetListener?: SubResourceOutput;
  /** Url to redirect the request to. */
  targetUrl?: string;
  /** Include path in the redirected url. */
  includePath?: boolean;
  /** Include query string in the redirected url. */
  includeQueryString?: boolean;
  /** Request routing specifying redirect configuration. */
  requestRoutingRules?: Array<SubResourceOutput>;
  /** Url path maps specifying default redirect configuration. */
  urlPathMaps?: Array<SubResourceOutput>;
  /** Path rules specifying redirect configuration. */
  pathRules?: Array<SubResourceOutput>;
}

/** Application gateway web application firewall configuration. */
export interface ApplicationGatewayWebApplicationFirewallConfigurationOutput {
  /** Whether the web application firewall is enabled or not. */
  enabled: boolean;
  /** Web application firewall mode. */
  firewallMode: "Detection" | "Prevention";
  /** The type of the web application firewall rule set. Possible values are: 'OWASP'. */
  ruleSetType: string;
  /** The version of the rule set type. */
  ruleSetVersion: string;
  /** The disabled rule groups. */
  disabledRuleGroups?: Array<ApplicationGatewayFirewallDisabledRuleGroupOutput>;
  /** Whether allow WAF to check request Body. */
  requestBodyCheck?: boolean;
  /** Maximum request body size for WAF. */
  maxRequestBodySize?: number;
  /** Maximum request body size in Kb for WAF. */
  maxRequestBodySizeInKb?: number;
  /** Maximum file upload size in Mb for WAF. */
  fileUploadLimitInMb?: number;
  /** The exclusion list. */
  exclusions?: Array<ApplicationGatewayFirewallExclusionOutput>;
}

/** Allows to disable rules within a rule group or an entire rule group. */
export interface ApplicationGatewayFirewallDisabledRuleGroupOutput {
  /** The name of the rule group that will be disabled. */
  ruleGroupName: string;
  /** The list of rules that will be disabled. If null, all rules of the rule group will be disabled. */
  rules?: Array<number>;
}

/** Allow to exclude some variable satisfy the condition for the WAF check. */
export interface ApplicationGatewayFirewallExclusionOutput {
  /** The variable to be excluded. */
  matchVariable: string;
  /** When matchVariable is a collection, operate on the selector to specify which elements in the collection this exclusion applies to. */
  selectorMatchOperator: string;
  /** When matchVariable is a collection, operator used to specify which elements in the collection this exclusion applies to. */
  selector: string;
}

/** Application Gateway autoscale configuration. */
export interface ApplicationGatewayAutoscaleConfigurationOutput {
  /** Lower bound on number of Application Gateway capacity. */
  minCapacity: number;
  /** Upper bound on number of Application Gateway capacity. */
  maxCapacity?: number;
}

/** Private Link Configuration on an application gateway. */
export interface ApplicationGatewayPrivateLinkConfigurationOutput extends SubResourceOutput {
  /** Properties of the application gateway private link configuration. */
  properties?: ApplicationGatewayPrivateLinkConfigurationPropertiesOutput;
  /** Name of the private link configuration that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of private link configuration on an application gateway. */
export interface ApplicationGatewayPrivateLinkConfigurationPropertiesOutput {
  /** An array of application gateway private link ip configurations. */
  ipConfigurations?: Array<ApplicationGatewayPrivateLinkIpConfigurationOutput>;
  /** The provisioning state of the application gateway private link configuration. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** The application gateway private link ip configuration. */
export interface ApplicationGatewayPrivateLinkIpConfigurationOutput extends SubResourceOutput {
  /** Properties of an application gateway private link ip configuration. */
  properties?: ApplicationGatewayPrivateLinkIpConfigurationPropertiesOutput;
  /** The name of application gateway private link ip configuration. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The resource type. */
  readonly type?: string;
}

/** Properties of an application gateway private link IP configuration. */
export interface ApplicationGatewayPrivateLinkIpConfigurationPropertiesOutput {
  /** The private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: "Static" | "Dynamic";
  /** Reference to the subnet resource. */
  subnet?: SubResourceOutput;
  /** Whether the ip configuration is primary or not. */
  primary?: boolean;
  /** The provisioning state of the application gateway private link IP configuration. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Private Endpoint connection on an application gateway. */
export interface ApplicationGatewayPrivateEndpointConnectionOutput extends SubResourceOutput {
  /** Properties of the application gateway private endpoint connection. */
  properties?: ApplicationGatewayPrivateEndpointConnectionPropertiesOutput;
  /** Name of the private endpoint connection on an application gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of Private Link Resource of an application gateway. */
export interface ApplicationGatewayPrivateEndpointConnectionPropertiesOutput {
  /** The resource of private end point. */
  readonly privateEndpoint?: PrivateEndpointOutput;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateOutput;
  /** The provisioning state of the application gateway private endpoint connection resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The consumer link id. */
  readonly linkIdentifier?: string;
}

/** Load Distribution Policy of an application gateway. */
export interface ApplicationGatewayLoadDistributionPolicyOutput extends SubResourceOutput {
  /** Properties of the application gateway load distribution policy. */
  properties?: ApplicationGatewayLoadDistributionPolicyPropertiesFormatOutput;
  /** Name of the load distribution policy that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of Load Distribution Policy of an application gateway. */
export interface ApplicationGatewayLoadDistributionPolicyPropertiesFormatOutput {
  /** Load Distribution Targets resource of an application gateway. */
  loadDistributionTargets?: Array<ApplicationGatewayLoadDistributionTargetOutput>;
  /** Load Distribution Targets resource of an application gateway. */
  loadDistributionAlgorithm?: "RoundRobin" | "LeastConnections" | "IpHash";
  /** The provisioning state of the Load Distribution Policy resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Load Distribution Target of an application gateway. */
export interface ApplicationGatewayLoadDistributionTargetOutput extends SubResourceOutput {
  /** Properties of the application gateway load distribution target. */
  properties?: ApplicationGatewayLoadDistributionTargetPropertiesFormatOutput;
  /** Name of the load distribution policy that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

export interface ApplicationGatewayLoadDistributionTargetPropertiesFormatOutput {
  /** Weight per server. Range between 1 and 100. */
  weightPerServer?: number;
  /** Backend address pool resource of the application gateway. */
  backendAddressPool?: SubResourceOutput;
}

/** Application Gateway global configuration. */
export interface ApplicationGatewayGlobalConfigurationOutput {
  /** Enable request buffering. */
  enableRequestBuffering?: boolean;
  /** Enable response buffering. */
  enableResponseBuffering?: boolean;
}

/** Identity for the resource. */
export interface ManagedServiceIdentityOutput {
  /** The principal id of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant id of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of identity used for the resource. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the virtual machine. */
  type?: "SystemAssigned" | "UserAssigned" | "SystemAssigned, UserAssigned" | "None";
  /** The list of user identities associated with resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<
    string,
    Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesOutput
  >;
}

export interface Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesOutput {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

/** Response for ListApplicationGateways API service call. */
export interface ApplicationGatewayListResultOutput {
  /** List of an application gateways in a resource group. */
  value?: Array<ApplicationGatewayOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** Response for ApplicationGatewayBackendHealth API service call. */
export interface ApplicationGatewayBackendHealthOutput {
  /** A list of ApplicationGatewayBackendHealthPool resources. */
  backendAddressPools?: Array<ApplicationGatewayBackendHealthPoolOutput>;
}

/** Application gateway BackendHealth pool. */
export interface ApplicationGatewayBackendHealthPoolOutput {
  /** Reference to an ApplicationGatewayBackendAddressPool resource. */
  backendAddressPool?: ApplicationGatewayBackendAddressPoolOutput;
  /** List of ApplicationGatewayBackendHealthHttpSettings resources. */
  backendHttpSettingsCollection?: Array<ApplicationGatewayBackendHealthHttpSettingsOutput>;
}

/** Application gateway BackendHealthHttp settings. */
export interface ApplicationGatewayBackendHealthHttpSettingsOutput {
  /** Reference to an ApplicationGatewayBackendHttpSettings resource. */
  backendHttpSettings?: ApplicationGatewayBackendHttpSettingsOutput;
  /** List of ApplicationGatewayBackendHealthServer resources. */
  servers?: Array<ApplicationGatewayBackendHealthServerOutput>;
}

/** Application gateway backendhealth http settings. */
export interface ApplicationGatewayBackendHealthServerOutput {
  /** IP address or FQDN of backend server. */
  address?: string;
  /** Reference to IP configuration of backend server. */
  ipConfiguration?: NetworkInterfaceIPConfigurationOutput;
  /** Health of backend server. */
  health?: "Unknown" | "Up" | "Down" | "Partial" | "Draining";
  /** Health Probe Log. */
  healthProbeLog?: string;
}

/** Result of on demand test probe. */
export interface ApplicationGatewayBackendHealthOnDemandOutput {
  /** Reference to an ApplicationGatewayBackendAddressPool resource. */
  backendAddressPool?: ApplicationGatewayBackendAddressPoolOutput;
  /** Application gateway BackendHealthHttp settings. */
  backendHealthHttpSettings?: ApplicationGatewayBackendHealthHttpSettingsOutput;
}

/** Response for ListApplicationGatewayPrivateLinkResources API service call. Gets all private link resources for an application gateway. */
export interface ApplicationGatewayPrivateLinkResourceListResultOutput {
  /** List of private link resources of an application gateway. */
  value?: Array<ApplicationGatewayPrivateLinkResourceOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** PrivateLink Resource of an application gateway. */
export interface ApplicationGatewayPrivateLinkResourceOutput extends SubResourceOutput {
  /** Properties of the application gateway private link resource. */
  properties?: ApplicationGatewayPrivateLinkResourcePropertiesOutput;
  /** Name of the private link resource that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of a private link resource. */
export interface ApplicationGatewayPrivateLinkResourcePropertiesOutput {
  /** Group identifier of private link resource. */
  readonly groupId?: string;
  /** Required member names of private link resource. */
  readonly requiredMembers?: Array<string>;
  /** Required DNS zone names of the the private link resource. */
  requiredZoneNames?: Array<string>;
}

/** Response for ListApplicationGatewayPrivateEndpointConnection API service call. Gets all private endpoint connections for an application gateway. */
export interface ApplicationGatewayPrivateEndpointConnectionListResultOutput {
  /** List of private endpoint connections on an application gateway. */
  value?: Array<ApplicationGatewayPrivateEndpointConnectionOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** Common error representation. */
export interface ErrorModelOutput {
  /** Error code. */
  code?: string;
  /** Error message. */
  message?: string;
  /** Error target. */
  target?: string;
  /** Error details. */
  details?: Array<ErrorDetailsOutput>;
  /** Inner error message. */
  innerError?: string;
}

/** Common error details representation. */
export interface ErrorDetailsOutput {
  /** Error code. */
  code?: string;
  /** Error target. */
  target?: string;
  /** Error message. */
  message?: string;
}

/** Response for ApplicationGatewayAvailableWafRuleSets API service call. */
export interface ApplicationGatewayAvailableWafRuleSetsResultOutput {
  /** The list of application gateway rule sets. */
  value?: Array<ApplicationGatewayFirewallRuleSetOutput>;
}

/** A web application firewall rule set. */
export interface ApplicationGatewayFirewallRuleSetOutput extends ResourceOutput {
  /** Properties of the application gateway firewall rule set. */
  properties?: ApplicationGatewayFirewallRuleSetPropertiesFormatOutput;
}

/** Properties of the web application firewall rule set. */
export interface ApplicationGatewayFirewallRuleSetPropertiesFormatOutput {
  /** The provisioning state of the web application firewall rule set. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The type of the web application firewall rule set. */
  ruleSetType: string;
  /** The version of the web application firewall rule set type. */
  ruleSetVersion: string;
  /** The rule groups of the web application firewall rule set. */
  ruleGroups: Array<ApplicationGatewayFirewallRuleGroupOutput>;
  /** Tier of an application gateway that support the rule set. */
  tiers?: Array<"Standard" | "WAF" | "Standard_v2" | "WAF_v2">;
}

/** A web application firewall rule group. */
export interface ApplicationGatewayFirewallRuleGroupOutput {
  /** The name of the web application firewall rule group. */
  ruleGroupName: string;
  /** The description of the web application firewall rule group. */
  description?: string;
  /** The rules of the web application firewall rule group. */
  rules: Array<ApplicationGatewayFirewallRuleOutput>;
}

/** A web application firewall rule. */
export interface ApplicationGatewayFirewallRuleOutput {
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
export interface ApplicationGatewayAvailableSslOptionsOutput extends ResourceOutput {
  /** Properties of the application gateway available SSL options. */
  properties?: ApplicationGatewayAvailableSslOptionsPropertiesFormatOutput;
}

/** Properties of ApplicationGatewayAvailableSslOptions. */
export interface ApplicationGatewayAvailableSslOptionsPropertiesFormatOutput {
  /** List of available Ssl predefined policy. */
  predefinedPolicies?: Array<SubResourceOutput>;
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

/** Response for ApplicationGatewayAvailableSslOptions API service call. */
export interface ApplicationGatewayAvailableSslPredefinedPoliciesOutput {
  /** List of available Ssl predefined policy. */
  value?: Array<ApplicationGatewaySslPredefinedPolicyOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** An Ssl predefined policy. */
export interface ApplicationGatewaySslPredefinedPolicyOutput extends SubResourceOutput {
  /** Name of the Ssl predefined policy. */
  name?: string;
  /** Properties of the application gateway SSL predefined policy. */
  properties?: ApplicationGatewaySslPredefinedPolicyPropertiesFormatOutput;
}

/** Properties of ApplicationGatewaySslPredefinedPolicy. */
export interface ApplicationGatewaySslPredefinedPolicyPropertiesFormatOutput {
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

/** Response for ApplicationGatewayWafDynamicManifest API service call. */
export interface ApplicationGatewayWafDynamicManifestResultOutput {
  /** Resource ID. */
  id?: string;
  /** Resource name. */
  readonly name?: string;
  /** Resource type. */
  readonly type?: string;
  /** Properties of the ApplicationGatewayWafDynamicManifest . */
  properties?: ApplicationGatewayWafDynamicManifestPropertiesResultOutput;
}

/** Properties of ApplicationGatewayWafDynamicManifest. */
export interface ApplicationGatewayWafDynamicManifestPropertiesResultOutput {
  /** The default ruleset. */
  defaultRuleSet?: DefaultRuleSetPropertyFormatOutput;
  /** The available rulesets. */
  availableRuleSets?: Array<ApplicationGatewayFirewallManifestRuleSetOutput>;
}

/** the default web application firewall rule set. */
export interface DefaultRuleSetPropertyFormatOutput {
  /** The type of the web application firewall rule set. */
  ruleSetType?: string;
  /** The version of the web application firewall rule set type. */
  ruleSetVersion?: string;
}

/** Properties of the web application firewall rule set. */
export interface ApplicationGatewayFirewallManifestRuleSetOutput {
  /** The type of the web application firewall rule set. */
  ruleSetType: string;
  /** The version of the web application firewall rule set type. */
  ruleSetVersion: string;
  /** The rule set status */
  status?: "Preview" | "GA" | "Supported" | "Deprecated";
  /** Tier of an application gateway that support the rule set. */
  tiers?: Array<"Standard" | "WAF" | "Standard_v2" | "WAF_v2">;
  /** The rule groups of the web application firewall rule set. */
  ruleGroups: Array<ApplicationGatewayFirewallRuleGroupOutput>;
}

/** Response for ApplicationGatewayWafDynamicManifests API service call. */
export interface ApplicationGatewayWafDynamicManifestResultListOutput {
  /** The list of application gateway waf manifest. */
  value?: Array<ApplicationGatewayWafDynamicManifestResultOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** A list of application security groups. */
export interface ApplicationSecurityGroupListResultOutput {
  /** A list of application security groups. */
  value?: Array<ApplicationSecurityGroupOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** An array of available delegations. */
export interface AvailableDelegationsResultOutput {
  /** An array of available delegations. */
  value?: Array<AvailableDelegationOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** The serviceName of an AvailableDelegation indicates a possible delegation for a subnet. */
export interface AvailableDelegationOutput {
  /** The name of the AvailableDelegation resource. */
  name?: string;
  /** A unique identifier of the AvailableDelegation resource. */
  id?: string;
  /** Resource type. */
  type?: string;
  /** The name of the service and resource. */
  serviceName?: string;
  /** The actions permitted to the service upon delegation. */
  actions?: Array<string>;
}

/** An array of available service aliases. */
export interface AvailableServiceAliasesResultOutput {
  /** An array of available service aliases. */
  value?: Array<AvailableServiceAliasOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** The available service alias. */
export interface AvailableServiceAliasOutput {
  /** The name of the service alias. */
  name?: string;
  /** The ID of the service alias. */
  id?: string;
  /** The type of the resource. */
  type?: string;
  /** The resource name of the service alias. */
  resourceName?: string;
}

/** Azure Firewall resource. */
export interface AzureFirewallOutput extends ResourceOutput {
  /** Properties of the azure firewall. */
  properties?: AzureFirewallPropertiesFormatOutput;
  /** A list of availability zones denoting where the resource needs to come from. */
  zones?: Array<string>;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of the Azure Firewall. */
export interface AzureFirewallPropertiesFormatOutput {
  /** Collection of application rule collections used by Azure Firewall. */
  applicationRuleCollections?: Array<AzureFirewallApplicationRuleCollectionOutput>;
  /** Collection of NAT rule collections used by Azure Firewall. */
  natRuleCollections?: Array<AzureFirewallNatRuleCollectionOutput>;
  /** Collection of network rule collections used by Azure Firewall. */
  networkRuleCollections?: Array<AzureFirewallNetworkRuleCollectionOutput>;
  /** IP configuration of the Azure Firewall resource. */
  ipConfigurations?: Array<AzureFirewallIPConfigurationOutput>;
  /** IP configuration of the Azure Firewall used for management traffic. */
  managementIpConfiguration?: AzureFirewallIPConfigurationOutput;
  /** The provisioning state of the Azure firewall resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The operation mode for Threat Intelligence. */
  threatIntelMode?: "Alert" | "Deny" | "Off";
  /** The virtualHub to which the firewall belongs. */
  virtualHub?: SubResourceOutput;
  /** The firewallPolicy associated with this azure firewall. */
  firewallPolicy?: SubResourceOutput;
  /** IP addresses associated with AzureFirewall. */
  hubIPAddresses?: HubIPAddressesOutput;
  /** IpGroups associated with AzureFirewall. */
  readonly ipGroups?: Array<AzureFirewallIpGroupsOutput>;
  /** The Azure Firewall Resource SKU. */
  sku?: AzureFirewallSkuOutput;
  /** The additional properties used to further config this azure firewall. */
  additionalProperties?: Record<string, string>;
}

/** Application rule collection resource. */
export interface AzureFirewallApplicationRuleCollectionOutput extends SubResourceOutput {
  /** Properties of the azure firewall application rule collection. */
  properties?: AzureFirewallApplicationRuleCollectionPropertiesFormatOutput;
  /** The name of the resource that is unique within the Azure firewall. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of the application rule collection. */
export interface AzureFirewallApplicationRuleCollectionPropertiesFormatOutput {
  /** Priority of the application rule collection resource. */
  priority?: number;
  /** The action type of a rule collection. */
  action?: AzureFirewallRCActionOutput;
  /** Collection of rules used by a application rule collection. */
  rules?: Array<AzureFirewallApplicationRuleOutput>;
  /** The provisioning state of the application rule collection resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Properties of the AzureFirewallRCAction. */
export interface AzureFirewallRCActionOutput {
  /** The type of action. */
  type?: "Allow" | "Deny";
}

/** Properties of an application rule. */
export interface AzureFirewallApplicationRuleOutput {
  /** Name of the application rule. */
  name?: string;
  /** Description of the rule. */
  description?: string;
  /** List of source IP addresses for this rule. */
  sourceAddresses?: Array<string>;
  /** Array of ApplicationRuleProtocols. */
  protocols?: Array<AzureFirewallApplicationRuleProtocolOutput>;
  /** List of FQDNs for this rule. */
  targetFqdns?: Array<string>;
  /** List of FQDN Tags for this rule. */
  fqdnTags?: Array<string>;
  /** List of source IpGroups for this rule. */
  sourceIpGroups?: Array<string>;
}

/** Properties of the application rule protocol. */
export interface AzureFirewallApplicationRuleProtocolOutput {
  /** Protocol type. */
  protocolType?: "Http" | "Https" | "Mssql";
  /** Port number for the protocol, cannot be greater than 64000. This field is optional. */
  port?: number;
}

/** NAT rule collection resource. */
export interface AzureFirewallNatRuleCollectionOutput extends SubResourceOutput {
  /** Properties of the azure firewall NAT rule collection. */
  properties?: AzureFirewallNatRuleCollectionPropertiesOutput;
  /** The name of the resource that is unique within the Azure firewall. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of the NAT rule collection. */
export interface AzureFirewallNatRuleCollectionPropertiesOutput {
  /** Priority of the NAT rule collection resource. */
  priority?: number;
  /** The action type of a NAT rule collection. */
  action?: AzureFirewallNatRCActionOutput;
  /** Collection of rules used by a NAT rule collection. */
  rules?: Array<AzureFirewallNatRuleOutput>;
  /** The provisioning state of the NAT rule collection resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** AzureFirewall NAT Rule Collection Action. */
export interface AzureFirewallNatRCActionOutput {
  /** The type of action. */
  type?: "Snat" | "Dnat";
}

/** Properties of a NAT rule. */
export interface AzureFirewallNatRuleOutput {
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
export interface AzureFirewallNetworkRuleCollectionOutput extends SubResourceOutput {
  /** Properties of the azure firewall network rule collection. */
  properties?: AzureFirewallNetworkRuleCollectionPropertiesFormatOutput;
  /** The name of the resource that is unique within the Azure firewall. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of the network rule collection. */
export interface AzureFirewallNetworkRuleCollectionPropertiesFormatOutput {
  /** Priority of the network rule collection resource. */
  priority?: number;
  /** The action type of a rule collection. */
  action?: AzureFirewallRCActionOutput;
  /** Collection of rules used by a network rule collection. */
  rules?: Array<AzureFirewallNetworkRuleOutput>;
  /** The provisioning state of the network rule collection resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Properties of the network rule. */
export interface AzureFirewallNetworkRuleOutput {
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
export interface AzureFirewallIPConfigurationOutput extends SubResourceOutput {
  /** Properties of the azure firewall IP configuration. */
  properties?: AzureFirewallIPConfigurationPropertiesFormatOutput;
  /** Name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of IP configuration of an Azure Firewall. */
export interface AzureFirewallIPConfigurationPropertiesFormatOutput {
  /** The Firewall Internal Load Balancer IP to be used as the next hop in User Defined Routes. */
  readonly privateIPAddress?: string;
  /** Reference to the subnet resource. This resource must be named 'AzureFirewallSubnet' or 'AzureFirewallManagementSubnet'. */
  subnet?: SubResourceOutput;
  /** Reference to the PublicIP resource. This field is a mandatory input if subnet is not null. */
  publicIPAddress?: SubResourceOutput;
  /** The provisioning state of the Azure firewall IP configuration resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** IP addresses associated with azure firewall. */
export interface HubIPAddressesOutput {
  /** Public IP addresses associated with azure firewall. */
  publicIPs?: HubPublicIPAddressesOutput;
  /** Private IP Address associated with azure firewall. */
  privateIPAddress?: string;
}

/** Public IP addresses associated with azure firewall. */
export interface HubPublicIPAddressesOutput {
  /** The list of Public IP addresses associated with azure firewall or IP addresses to be retained. */
  addresses?: Array<AzureFirewallPublicIPAddressOutput>;
  /** The number of Public IP addresses associated with azure firewall. */
  count?: number;
}

/** Public IP Address associated with azure firewall. */
export interface AzureFirewallPublicIPAddressOutput {
  /** Public IP Address value. */
  address?: string;
}

/** IpGroups associated with azure firewall. */
export interface AzureFirewallIpGroupsOutput {
  /** Resource ID. */
  readonly id?: string;
  /** The iteration number. */
  readonly changeNumber?: string;
}

/** SKU of an Azure Firewall. */
export interface AzureFirewallSkuOutput {
  /** Name of an Azure Firewall SKU. */
  name?: "AZFW_VNet" | "AZFW_Hub";
  /** Tier of an Azure Firewall. */
  tier?: "Standard" | "Premium" | "Basic";
}

/** Response for ListAzureFirewalls API service call. */
export interface AzureFirewallListResultOutput {
  /** List of Azure Firewalls in a resource group. */
  value?: Array<AzureFirewallOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** List of SNAT IP Prefixes learnt by firewall to not SNAT */
export interface IPPrefixesListOutput {
  /** IP Prefix value. */
  ipPrefixes?: Array<string>;
}

/** Response for ListAzureFirewallFqdnTags API service call. */
export interface AzureFirewallFqdnTagListResultOutput {
  /** List of Azure Firewall FQDN Tags in a resource group. */
  value?: Array<AzureFirewallFqdnTagOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** Azure Firewall FQDN Tag Resource. */
export interface AzureFirewallFqdnTagOutput extends ResourceOutput {
  /** Properties of the azure firewall FQDN tag. */
  properties?: AzureFirewallFqdnTagPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Azure Firewall FQDN Tag Properties. */
export interface AzureFirewallFqdnTagPropertiesFormatOutput {
  /** The provisioning state of the Azure firewall FQDN tag resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The name of this FQDN Tag. */
  readonly fqdnTagName?: string;
}

/** Azure Web Category Resource. */
export interface AzureWebCategoryOutput {
  /** Properties of the Azure Web Category. */
  properties?: AzureWebCategoryPropertiesFormatOutput;
  /** Resource ID. */
  id?: string;
  /** Resource name. */
  readonly name?: string;
  /** Resource type. */
  readonly type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Azure Web Category Properties. */
export interface AzureWebCategoryPropertiesFormatOutput {
  /** The name of the group that the category belongs to. */
  readonly group?: string;
}

/** Response for ListAzureWebCategories API service call. */
export interface AzureWebCategoryListResultOutput {
  /** List of Azure Web Categories for a given Subscription. */
  value?: Array<AzureWebCategoryOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** Bastion Host resource. */
export interface BastionHostOutput extends ResourceOutput {
  /** Represents the bastion host resource. */
  properties?: BastionHostPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The sku of this Bastion Host. */
  sku?: SkuOutput;
}

/** Properties of the Bastion Host. */
export interface BastionHostPropertiesFormatOutput {
  /** IP configuration of the Bastion Host resource. */
  ipConfigurations?: Array<BastionHostIPConfigurationOutput>;
  /** FQDN for the endpoint on which bastion host is accessible. */
  dnsName?: string;
  /** The provisioning state of the bastion host resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
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
export interface BastionHostIPConfigurationOutput extends SubResourceOutput {
  /** Represents the ip configuration associated with the resource. */
  properties?: BastionHostIPConfigurationPropertiesFormatOutput;
  /** Name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Ip configuration type. */
  readonly type?: string;
}

/** Properties of IP configuration of an Bastion Host. */
export interface BastionHostIPConfigurationPropertiesFormatOutput {
  /** Reference of the subnet resource. */
  subnet: SubResourceOutput;
  /** Reference of the PublicIP resource. */
  publicIPAddress: SubResourceOutput;
  /** The provisioning state of the bastion host IP configuration resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Private IP allocation method. */
  privateIPAllocationMethod?: "Static" | "Dynamic";
}

/** The sku of this Bastion Host. */
export interface SkuOutput {
  /** The name of this Bastion Host. */
  name?: "Basic" | "Standard";
}

/** Response for ListBastionHosts API service call. */
export interface BastionHostListResultOutput {
  /** List of Bastion Hosts in a resource group. */
  value?: Array<BastionHostOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** Bastion Shareable Link. */
export interface BastionShareableLinkOutput {
  /** Reference of the virtual machine resource. */
  vm: VmOutput;
  /** The unique Bastion Shareable Link to the virtual machine. */
  readonly bsl?: string;
  /** The time when the link was created. */
  readonly createdAt?: string;
  /** Optional field indicating the warning or error message related to the vm in case of partial failure. */
  readonly message?: string;
}

/** Describes a Virtual Machine. */
export interface VmOutput extends ResourceOutput {}

/** Response for all the Bastion Shareable Link endpoints. */
export interface BastionShareableLinkListResultOutput {
  /** List of Bastion Shareable Links for the request. */
  value?: Array<BastionShareableLinkOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Response for GetActiveSessions. */
export interface BastionActiveSessionListResultOutput {
  /** List of active sessions on the bastion. */
  value?: Array<BastionActiveSessionOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** The session detail for a target. */
export interface BastionActiveSessionOutput {
  /** A unique id for the session. */
  readonly sessionId?: string;
  /** The time when the session started. */
  readonly startTime?: Record<string, unknown>;
  /** The subscription id for the target virtual machine. */
  readonly targetSubscriptionId?: string;
  /** The type of the resource. */
  readonly resourceType?: string;
  /** The host name of the target. */
  readonly targetHostName?: string;
  /** The resource group of the target. */
  readonly targetResourceGroup?: string;
  /** The user name who is active on this session. */
  readonly userName?: string;
  /** The IP Address of the target. */
  readonly targetIpAddress?: string;
  /** The protocol used to connect to the target. */
  readonly protocol?: "SSH" | "RDP";
  /** The resource id of the target. */
  readonly targetResourceId?: string;
  /** Duration in mins the session has been active. */
  readonly sessionDurationInMins?: number;
}

/** Response for DisconnectActiveSessions. */
export interface BastionSessionDeleteResultOutput {
  /** List of sessions with their corresponding state. */
  value?: Array<BastionSessionStateOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** The session state detail for a target. */
export interface BastionSessionStateOutput {
  /** A unique id for the session. */
  readonly sessionId?: string;
  /** Used for extra information. */
  readonly message?: string;
  /** The state of the session. Disconnected/Failed/NotFound. */
  readonly state?: string;
}

/** Response for the CheckDnsNameAvailability API service call. */
export interface DnsNameAvailabilityResultOutput {
  /** Domain availability (True/False). */
  available?: boolean;
}

/** Response for the ListNetworkInterface API service call. */
export interface NetworkInterfaceListResultOutput {
  /** A list of network interfaces in a resource group. */
  value?: Array<NetworkInterfaceOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Response for ListPublicIpAddresses API service call. */
export interface PublicIPAddressListResultOutput {
  /** A list of public IP addresses that exists in a resource group. */
  value?: Array<PublicIPAddressOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Custom IP prefix resource. */
export interface CustomIpPrefixOutput extends ResourceOutput {
  /** The extended location of the custom IP prefix. */
  extendedLocation?: ExtendedLocationOutput;
  /** Custom IP prefix properties. */
  properties?: CustomIpPrefixPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** A list of availability zones denoting the IP allocated for the resource needs to come from. */
  zones?: Array<string>;
}

/** Custom IP prefix properties. */
export interface CustomIpPrefixPropertiesFormatOutput {
  /** The ASN for CIDR advertising. Should be an integer as string. */
  asn?: string;
  /** The prefix range in CIDR notation. Should include the start address and the prefix length. */
  cidr?: string;
  /** Signed message for WAN validation. */
  signedMessage?: string;
  /** Authorization message for WAN validation. */
  authorizationMessage?: string;
  /** The Parent CustomIpPrefix for IPv6 /64 CustomIpPrefix. */
  customIpPrefixParent?: SubResourceOutput;
  /** The list of all Children for IPv6 /48 CustomIpPrefix. */
  readonly childCustomIpPrefixes?: Array<SubResourceOutput>;
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
  readonly publicIpPrefixes?: Array<SubResourceOutput>;
  /** The resource GUID property of the custom IP prefix resource. */
  readonly resourceGuid?: string;
  /** The reason why resource is in failed state. */
  readonly failedReason?: string;
  /** The provisioning state of the custom IP prefix resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Response for ListCustomIpPrefixes API service call. */
export interface CustomIpPrefixListResultOutput {
  /** A list of Custom IP prefixes that exists in a resource group. */
  value?: Array<CustomIpPrefixOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** A DDoS custom policy in a resource group. */
export interface DdosCustomPolicyOutput extends ResourceOutput {
  /** Properties of the DDoS custom policy. */
  properties?: DdosCustomPolicyPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** DDoS custom policy properties. */
export interface DdosCustomPolicyPropertiesFormatOutput {
  /** The resource GUID property of the DDoS custom policy resource. It uniquely identifies the resource, even if the user changes its name or migrate the resource across subscriptions or resource groups. */
  readonly resourceGuid?: string;
  /** The provisioning state of the DDoS custom policy resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** A DDoS protection plan in a resource group. */
export interface DdosProtectionPlanOutput {
  /** Resource ID. */
  readonly id?: string;
  /** Resource name. */
  readonly name?: string;
  /** Resource type. */
  readonly type?: string;
  /** Resource location. */
  location?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Properties of the DDoS protection plan. */
  properties?: DdosProtectionPlanPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** DDoS protection plan properties. */
export interface DdosProtectionPlanPropertiesFormatOutput {
  /** The resource GUID property of the DDoS protection plan resource. It uniquely identifies the resource, even if the user changes its name or migrate the resource across subscriptions or resource groups. */
  readonly resourceGuid?: string;
  /** The provisioning state of the DDoS protection plan resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The list of public IPs associated with the DDoS protection plan resource. This list is read-only. */
  readonly publicIpAddresses?: Array<SubResourceOutput>;
  /** The list of virtual networks associated with the DDoS protection plan resource. This list is read-only. */
  readonly virtualNetworks?: Array<SubResourceOutput>;
}

/** A list of DDoS protection plans. */
export interface DdosProtectionPlanListResultOutput {
  /** A list of DDoS protection plans. */
  value?: Array<DdosProtectionPlanOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Differentiated Services Code Point configuration for any given network interface */
export interface DscpConfigurationOutput extends ResourceOutput {
  /** Properties of the network interface. */
  properties?: DscpConfigurationPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Differentiated Services Code Point configuration properties. */
export interface DscpConfigurationPropertiesFormatOutput {
  /** List of markings to be used in the configuration. */
  markings?: Array<number>;
  /** Source IP ranges. */
  sourceIpRanges?: Array<QosIpRangeOutput>;
  /** Destination IP ranges. */
  destinationIpRanges?: Array<QosIpRangeOutput>;
  /** Sources port ranges. */
  sourcePortRanges?: Array<QosPortRangeOutput>;
  /** Destination port ranges. */
  destinationPortRanges?: Array<QosPortRangeOutput>;
  /** RNM supported protocol types. */
  protocol?: "DoNotUse" | "Icmp" | "Tcp" | "Udp" | "Gre" | "Esp" | "Ah" | "Vxlan" | "All";
  /** QoS object definitions */
  qosDefinitionCollection?: Array<QosDefinitionOutput>;
  /** Qos Collection ID generated by RNM. */
  readonly qosCollectionId?: string;
  /** Associated Network Interfaces to the DSCP Configuration. */
  readonly associatedNetworkInterfaces?: Array<NetworkInterfaceOutput>;
  /** The resource GUID property of the DSCP Configuration resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the DSCP Configuration resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Qos Traffic Profiler IP Range properties. */
export interface QosIpRangeOutput {
  /** Start IP Address. */
  startIP?: string;
  /** End IP Address. */
  endIP?: string;
}

/** Qos Traffic Profiler Port range properties. */
export interface QosPortRangeOutput {
  /** Qos Port Range start. */
  start?: number;
  /** Qos Port Range end. */
  end?: number;
}

/** Quality of Service defines the traffic configuration between endpoints. Mandatory to have one marking. */
export interface QosDefinitionOutput {
  /** List of markings to be used in the configuration. */
  markings?: Array<number>;
  /** Source IP ranges. */
  sourceIpRanges?: Array<QosIpRangeOutput>;
  /** Destination IP ranges. */
  destinationIpRanges?: Array<QosIpRangeOutput>;
  /** Sources port ranges. */
  sourcePortRanges?: Array<QosPortRangeOutput>;
  /** Destination port ranges. */
  destinationPortRanges?: Array<QosPortRangeOutput>;
  /** RNM supported protocol types. */
  protocol?: "DoNotUse" | "Icmp" | "Tcp" | "Udp" | "Gre" | "Esp" | "Ah" | "Vxlan" | "All";
}

/** Response for the DscpConfigurationList API service call. */
export interface DscpConfigurationListResultOutput {
  /** A list of dscp configurations in a resource group. */
  value?: Array<DscpConfigurationOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Response for the ListAvailableEndpointServices API service call. */
export interface EndpointServicesListResultOutput {
  /** List of available endpoint services in a region. */
  value?: Array<EndpointServiceResultOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Endpoint service. */
export interface EndpointServiceResultOutput extends SubResourceOutput {
  /** Name of the endpoint service. */
  readonly name?: string;
  /** Type of the endpoint service. */
  readonly type?: string;
}

/** Authorization in an ExpressRouteCircuit resource. */
export interface ExpressRouteCircuitAuthorizationOutput extends SubResourceOutput {
  /** Properties of the express route circuit authorization. */
  properties?: AuthorizationPropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of ExpressRouteCircuitAuthorization. */
export interface AuthorizationPropertiesFormatOutput {
  /** The authorization key. */
  authorizationKey?: string;
  /** The authorization use status. */
  authorizationUseStatus?: "Available" | "InUse";
  /** The provisioning state of the authorization resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Response for ListAuthorizations API service call retrieves all authorizations that belongs to an ExpressRouteCircuit. */
export interface AuthorizationListResultOutput {
  /** The authorizations in an ExpressRoute Circuit. */
  value?: Array<ExpressRouteCircuitAuthorizationOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Peering in an ExpressRouteCircuit resource. */
export interface ExpressRouteCircuitPeeringOutput extends SubResourceOutput {
  /** Properties of the express route circuit peering. */
  properties?: ExpressRouteCircuitPeeringPropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of the express route circuit peering. */
export interface ExpressRouteCircuitPeeringPropertiesFormatOutput {
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
  microsoftPeeringConfig?: ExpressRouteCircuitPeeringConfigOutput;
  /** The peering stats of express route circuit. */
  stats?: ExpressRouteCircuitStatsOutput;
  /** The provisioning state of the express route circuit peering resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The GatewayManager Etag. */
  gatewayManagerEtag?: string;
  /** Who was the last to modify the peering. */
  readonly lastModifiedBy?: string;
  /** The reference to the RouteFilter resource. */
  routeFilter?: SubResourceOutput;
  /** The IPv6 peering configuration. */
  ipv6PeeringConfig?: Ipv6ExpressRouteCircuitPeeringConfigOutput;
  /** The ExpressRoute connection. */
  expressRouteConnection?: ExpressRouteConnectionIdOutput;
  /** The list of circuit connections associated with Azure Private Peering for this circuit. */
  connections?: Array<ExpressRouteCircuitConnectionOutput>;
  /** The list of peered circuit connections associated with Azure Private Peering for this circuit. */
  readonly peeredConnections?: Array<PeerExpressRouteCircuitConnectionOutput>;
}

/** Specifies the peering configuration. */
export interface ExpressRouteCircuitPeeringConfigOutput {
  /** The reference to AdvertisedPublicPrefixes. */
  advertisedPublicPrefixes?: Array<string>;
  /** The communities of bgp peering. Specified for microsoft peering. */
  advertisedCommunities?: Array<string>;
  /** The advertised public prefix state of the Peering resource. */
  readonly advertisedPublicPrefixesState?:
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
export interface ExpressRouteCircuitStatsOutput {
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
export interface Ipv6ExpressRouteCircuitPeeringConfigOutput {
  /** The primary address prefix. */
  primaryPeerAddressPrefix?: string;
  /** The secondary address prefix. */
  secondaryPeerAddressPrefix?: string;
  /** The Microsoft peering configuration. */
  microsoftPeeringConfig?: ExpressRouteCircuitPeeringConfigOutput;
  /** The reference to the RouteFilter resource. */
  routeFilter?: SubResourceOutput;
  /** The state of peering. */
  state?: "Disabled" | "Enabled";
}

/** The ID of the ExpressRouteConnection. */
export interface ExpressRouteConnectionIdOutput {
  /** The ID of the ExpressRouteConnection. */
  readonly id?: string;
}

/** Express Route Circuit Connection in an ExpressRouteCircuitPeering resource. */
export interface ExpressRouteCircuitConnectionOutput extends SubResourceOutput {
  /** Properties of the express route circuit connection. */
  properties?: ExpressRouteCircuitConnectionPropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of the express route circuit connection. */
export interface ExpressRouteCircuitConnectionPropertiesFormatOutput {
  /** Reference to Express Route Circuit Private Peering Resource of the circuit initiating connection. */
  expressRouteCircuitPeering?: SubResourceOutput;
  /** Reference to Express Route Circuit Private Peering Resource of the peered circuit. */
  peerExpressRouteCircuitPeering?: SubResourceOutput;
  /** /29 IP address space to carve out Customer addresses for tunnels. */
  addressPrefix?: string;
  /** The authorization key. */
  authorizationKey?: string;
  /** IPv6 Address PrefixProperties of the express route circuit connection. */
  ipv6CircuitConnectionConfig?: Ipv6CircuitConnectionConfigOutput;
  /** Express Route Circuit connection state. */
  readonly circuitConnectionStatus?: "Connected" | "Connecting" | "Disconnected";
  /** The provisioning state of the express route circuit connection resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** IPv6 Circuit Connection properties for global reach. */
export interface Ipv6CircuitConnectionConfigOutput {
  /** /125 IP address space to carve out customer addresses for global reach. */
  addressPrefix?: string;
  /** Express Route Circuit connection state. */
  readonly circuitConnectionStatus?: "Connected" | "Connecting" | "Disconnected";
}

/** Peer Express Route Circuit Connection in an ExpressRouteCircuitPeering resource. */
export interface PeerExpressRouteCircuitConnectionOutput extends SubResourceOutput {
  /** Properties of the peer express route circuit connection. */
  properties?: PeerExpressRouteCircuitConnectionPropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of the peer express route circuit connection. */
export interface PeerExpressRouteCircuitConnectionPropertiesFormatOutput {
  /** Reference to Express Route Circuit Private Peering Resource of the circuit. */
  expressRouteCircuitPeering?: SubResourceOutput;
  /** Reference to Express Route Circuit Private Peering Resource of the peered circuit. */
  peerExpressRouteCircuitPeering?: SubResourceOutput;
  /** /29 IP address space to carve out Customer addresses for tunnels. */
  addressPrefix?: string;
  /** Express Route Circuit connection state. */
  readonly circuitConnectionStatus?: "Connected" | "Connecting" | "Disconnected";
  /** The name of the express route circuit connection resource. */
  connectionName?: string;
  /** The resource guid of the authorization used for the express route circuit connection. */
  authResourceGuid?: string;
  /** The provisioning state of the peer express route circuit connection resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Response for ListPeering API service call retrieves all peerings that belong to an ExpressRouteCircuit. */
export interface ExpressRouteCircuitPeeringListResultOutput {
  /** The peerings in an express route circuit. */
  value?: Array<ExpressRouteCircuitPeeringOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Response for ListConnections API service call retrieves all global reach connections that belongs to a Private Peering for an ExpressRouteCircuit. */
export interface ExpressRouteCircuitConnectionListResultOutput {
  /** The global reach connection associated with Private Peering in an ExpressRoute Circuit. */
  value?: Array<ExpressRouteCircuitConnectionOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Response for ListPeeredConnections API service call retrieves all global reach peer circuit connections that belongs to a Private Peering for an ExpressRouteCircuit. */
export interface PeerExpressRouteCircuitConnectionListResultOutput {
  /** The global reach peer circuit connection associated with Private Peering in an ExpressRoute Circuit. */
  value?: Array<PeerExpressRouteCircuitConnectionOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** ExpressRouteCircuit resource. */
export interface ExpressRouteCircuitOutput extends ResourceOutput {
  /** The SKU. */
  sku?: ExpressRouteCircuitSkuOutput;
  /** Properties of the express route circuit. */
  properties?: ExpressRouteCircuitPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Contains SKU in an ExpressRouteCircuit. */
export interface ExpressRouteCircuitSkuOutput {
  /** The name of the SKU. */
  name?: string;
  /** The tier of the SKU. */
  tier?: "Standard" | "Premium" | "Basic" | "Local";
  /** The family of the SKU. */
  family?: "UnlimitedData" | "MeteredData";
}

/** Properties of ExpressRouteCircuit. */
export interface ExpressRouteCircuitPropertiesFormatOutput {
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
  authorizations?: Array<ExpressRouteCircuitAuthorizationOutput>;
  /** The list of peerings. */
  peerings?: Array<ExpressRouteCircuitPeeringOutput>;
  /** The ServiceKey. */
  serviceKey?: string;
  /** The ServiceProviderNotes. */
  serviceProviderNotes?: string;
  /** The ServiceProviderProperties. */
  serviceProviderProperties?: ExpressRouteCircuitServiceProviderPropertiesOutput;
  /** The reference to the ExpressRoutePort resource when the circuit is provisioned on an ExpressRoutePort resource. */
  expressRoutePort?: SubResourceOutput;
  /** The bandwidth of the circuit when the circuit is provisioned on an ExpressRoutePort resource. */
  bandwidthInGbps?: number;
  /** The identifier of the circuit traffic. Outer tag for QinQ encapsulation. */
  readonly stag?: number;
  /** The provisioning state of the express route circuit resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The GatewayManager Etag. */
  gatewayManagerEtag?: string;
  /** Flag denoting global reach status. */
  globalReachEnabled?: boolean;
  /** The authorizationKey. */
  authorizationKey?: string;
}

/** Contains ServiceProviderProperties in an ExpressRouteCircuit. */
export interface ExpressRouteCircuitServiceProviderPropertiesOutput {
  /** The serviceProviderName. */
  serviceProviderName?: string;
  /** The peering location. */
  peeringLocation?: string;
  /** The BandwidthInMbps. */
  bandwidthInMbps?: number;
}

/** Response for ListArpTable associated with the Express Route Circuits API. */
export interface ExpressRouteCircuitsArpTableListResultOutput {
  /** A list of the ARP tables. */
  value?: Array<ExpressRouteCircuitArpTableOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** The ARP table associated with the ExpressRouteCircuit. */
export interface ExpressRouteCircuitArpTableOutput {
  /** Entry age in minutes. */
  age?: number;
  /** Interface address. */
  interface?: string;
  /** The IP address. */
  ipAddress?: string;
  /** The MAC address. */
  macAddress?: string;
}

/** Response for ListRoutesTable associated with the Express Route Circuits API. */
export interface ExpressRouteCircuitsRoutesTableListResultOutput {
  /** The list of routes table. */
  value?: Array<ExpressRouteCircuitRoutesTableOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** The routes table associated with the ExpressRouteCircuit. */
export interface ExpressRouteCircuitRoutesTableOutput {
  /** IP address of a network entity. */
  network?: string;
  /** NextHop address. */
  nextHop?: string;
  /** Local preference value as set with the set local-preference route-map configuration command. */
  locPrf?: string;
  /** Route Weight. */
  weight?: number;
  /** Autonomous system paths to the destination network. */
  path?: string;
}

/** Response for ListRoutesTable associated with the Express Route Circuits API. */
export interface ExpressRouteCircuitsRoutesTableSummaryListResultOutput {
  /** A list of the routes table. */
  value?: Array<ExpressRouteCircuitRoutesTableSummaryOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** The routes table associated with the ExpressRouteCircuit. */
export interface ExpressRouteCircuitRoutesTableSummaryOutput {
  /** IP address of the neighbor. */
  neighbor?: string;
  /** BGP version number spoken to the neighbor. */
  v?: number;
  /** Autonomous system number. */
  as?: number;
  /** The length of time that the BGP session has been in the Established state, or the current status if not in the Established state. */
  upDown?: string;
  /** Current state of the BGP session, and the number of prefixes that have been received from a neighbor or peer group. */
  statePfxRcd?: string;
}

/** Response for ListExpressRouteCircuit API service call. */
export interface ExpressRouteCircuitListResultOutput {
  /** A list of ExpressRouteCircuits in a resource group. */
  value?: Array<ExpressRouteCircuitOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Response for the ListExpressRouteServiceProvider API service call. */
export interface ExpressRouteServiceProviderListResultOutput {
  /** A list of ExpressRouteResourceProvider resources. */
  value?: Array<ExpressRouteServiceProviderOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** A ExpressRouteResourceProvider object. */
export interface ExpressRouteServiceProviderOutput extends ResourceOutput {
  /** Properties of the express route service provider. */
  properties?: ExpressRouteServiceProviderPropertiesFormatOutput;
}

/** Properties of ExpressRouteServiceProvider. */
export interface ExpressRouteServiceProviderPropertiesFormatOutput {
  /** A list of peering locations. */
  peeringLocations?: Array<string>;
  /** A list of bandwidths offered. */
  bandwidthsOffered?: Array<ExpressRouteServiceProviderBandwidthsOfferedOutput>;
  /** The provisioning state of the express route service provider resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Contains bandwidths offered in ExpressRouteServiceProvider resources. */
export interface ExpressRouteServiceProviderBandwidthsOfferedOutput {
  /** The OfferName. */
  offerName?: string;
  /** The ValueInMbps. */
  valueInMbps?: number;
}

/** Response for ListExpressRouteCrossConnection API service call. */
export interface ExpressRouteCrossConnectionListResultOutput {
  /** A list of ExpressRouteCrossConnection resources. */
  value?: Array<ExpressRouteCrossConnectionOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** ExpressRouteCrossConnection resource. */
export interface ExpressRouteCrossConnectionOutput extends ResourceOutput {
  /** Properties of the express route cross connection. */
  properties?: ExpressRouteCrossConnectionPropertiesOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of ExpressRouteCrossConnection. */
export interface ExpressRouteCrossConnectionPropertiesOutput {
  /** The name of the primary port. */
  readonly primaryAzurePort?: string;
  /** The name of the secondary port. */
  readonly secondaryAzurePort?: string;
  /** The identifier of the circuit traffic. */
  readonly sTag?: number;
  /** The peering location of the ExpressRoute circuit. */
  readonly peeringLocation?: string;
  /** The circuit bandwidth In Mbps. */
  readonly bandwidthInMbps?: number;
  /** The ExpressRouteCircuit. */
  expressRouteCircuit?: ExpressRouteCircuitReferenceOutput;
  /** The provisioning state of the circuit in the connectivity provider system. */
  serviceProviderProvisioningState?:
    | "NotProvisioned"
    | "Provisioning"
    | "Provisioned"
    | "Deprovisioning";
  /** Additional read only notes set by the connectivity provider. */
  serviceProviderNotes?: string;
  /** The provisioning state of the express route cross connection resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The list of peerings. */
  peerings?: Array<ExpressRouteCrossConnectionPeeringOutput>;
}

/** Reference to an express route circuit. */
export interface ExpressRouteCircuitReferenceOutput {
  /** Corresponding Express Route Circuit Id. */
  id?: string;
}

/** Peering in an ExpressRoute Cross Connection resource. */
export interface ExpressRouteCrossConnectionPeeringOutput extends SubResourceOutput {
  /** Properties of the express route cross connection peering. */
  properties?: ExpressRouteCrossConnectionPeeringPropertiesOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of express route cross connection peering. */
export interface ExpressRouteCrossConnectionPeeringPropertiesOutput {
  /** The peering type. */
  peeringType?: "AzurePublicPeering" | "AzurePrivatePeering" | "MicrosoftPeering";
  /** The peering state. */
  state?: "Disabled" | "Enabled";
  /** The Azure ASN. */
  readonly azureASN?: number;
  /** The peer ASN. */
  peerASN?: number;
  /** The primary address prefix. */
  primaryPeerAddressPrefix?: string;
  /** The secondary address prefix. */
  secondaryPeerAddressPrefix?: string;
  /** The primary port. */
  readonly primaryAzurePort?: string;
  /** The secondary port. */
  readonly secondaryAzurePort?: string;
  /** The shared key. */
  sharedKey?: string;
  /** The VLAN ID. */
  vlanId?: number;
  /** The Microsoft peering configuration. */
  microsoftPeeringConfig?: ExpressRouteCircuitPeeringConfigOutput;
  /** The provisioning state of the express route cross connection peering resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The GatewayManager Etag. */
  gatewayManagerEtag?: string;
  /** Who was the last to modify the peering. */
  readonly lastModifiedBy?: string;
  /** The IPv6 peering configuration. */
  ipv6PeeringConfig?: Ipv6ExpressRouteCircuitPeeringConfigOutput;
}

/** Response for ListPeering API service call retrieves all peerings that belong to an ExpressRouteCrossConnection. */
export interface ExpressRouteCrossConnectionPeeringListOutput {
  /** The peerings in an express route cross connection. */
  value?: Array<ExpressRouteCrossConnectionPeeringOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Response for ListRoutesTable associated with the Express Route Cross Connections. */
export interface ExpressRouteCrossConnectionsRoutesTableSummaryListResultOutput {
  /** A list of the routes table. */
  value?: Array<ExpressRouteCrossConnectionRoutesTableSummaryOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** The routes table associated with the ExpressRouteCircuit. */
export interface ExpressRouteCrossConnectionRoutesTableSummaryOutput {
  /** IP address of Neighbor router. */
  neighbor?: string;
  /** Autonomous system number. */
  asn?: number;
  /** The length of time that the BGP session has been in the Established state, or the current status if not in the Established state. */
  upDown?: string;
  /** Current state of the BGP session, and the number of prefixes that have been received from a neighbor or peer group. */
  stateOrPrefixesReceived?: string;
}

/** Response for ListExpressRoutePortsLocations API service call. */
export interface ExpressRoutePortsLocationListResultOutput {
  /** The list of all ExpressRoutePort peering locations. */
  value?: Array<ExpressRoutePortsLocationOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Definition of the ExpressRoutePorts peering location resource. */
export interface ExpressRoutePortsLocationOutput extends ResourceOutput {
  /** ExpressRoutePort peering location properties. */
  properties?: ExpressRoutePortsLocationPropertiesFormatOutput;
}

/** Properties specific to ExpressRoutePorts peering location resources. */
export interface ExpressRoutePortsLocationPropertiesFormatOutput {
  /** Address of peering location. */
  readonly address?: string;
  /** Contact details of peering locations. */
  readonly contact?: string;
  /** The inventory of available ExpressRoutePort bandwidths. */
  availableBandwidths?: Array<ExpressRoutePortsLocationBandwidthsOutput>;
  /** The provisioning state of the express route port location resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Real-time inventory of available ExpressRoute port bandwidths. */
export interface ExpressRoutePortsLocationBandwidthsOutput {
  /** Bandwidth descriptive name. */
  readonly offerName?: string;
  /** Bandwidth value in Gbps. */
  readonly valueInGbps?: number;
}

/** ExpressRoutePort resource definition. */
export interface ExpressRoutePortOutput extends ResourceOutput {
  /** ExpressRoutePort properties. */
  properties?: ExpressRoutePortPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The identity of ExpressRoutePort, if configured. */
  identity?: ManagedServiceIdentityOutput;
}

/** Properties specific to ExpressRoutePort resources. */
export interface ExpressRoutePortPropertiesFormatOutput {
  /** The name of the peering location that the ExpressRoutePort is mapped to physically. */
  peeringLocation?: string;
  /** Bandwidth of procured ports in Gbps. */
  bandwidthInGbps?: number;
  /** Aggregate Gbps of associated circuit bandwidths. */
  readonly provisionedBandwidthInGbps?: number;
  /** Maximum transmission unit of the physical port pair(s). */
  readonly mtu?: string;
  /** Encapsulation method on physical ports. */
  encapsulation?: "Dot1Q" | "QinQ";
  /** Ether type of the physical port. */
  readonly etherType?: string;
  /** Date of the physical port allocation to be used in Letter of Authorization. */
  readonly allocationDate?: string;
  /** The set of physical links of the ExpressRoutePort resource. */
  links?: Array<ExpressRouteLinkOutput>;
  /** Reference the ExpressRoute circuit(s) that are provisioned on this ExpressRoutePort resource. */
  readonly circuits?: Array<SubResourceOutput>;
  /** The provisioning state of the express route port resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The resource GUID property of the express route port resource. */
  readonly resourceGuid?: string;
  /** The billing type of the ExpressRoutePort resource. */
  billingType?: "MeteredData" | "UnlimitedData";
}

/** ExpressRouteLink child resource definition. */
export interface ExpressRouteLinkOutput extends SubResourceOutput {
  /** ExpressRouteLink properties. */
  properties?: ExpressRouteLinkPropertiesFormatOutput;
  /** Name of child port resource that is unique among child port resources of the parent. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties specific to ExpressRouteLink resources. */
export interface ExpressRouteLinkPropertiesFormatOutput {
  /** Name of Azure router associated with physical port. */
  readonly routerName?: string;
  /** Name of Azure router interface. */
  readonly interfaceName?: string;
  /** Mapping between physical port to patch panel port. */
  readonly patchPanelId?: string;
  /** Mapping of physical patch panel to rack. */
  readonly rackId?: string;
  /** Cololocation for ExpressRoute Hybrid Direct. */
  readonly coloLocation?: string;
  /** Physical fiber port type. */
  readonly connectorType?: "LC" | "SC";
  /** Administrative state of the physical port. */
  adminState?: "Enabled" | "Disabled";
  /** The provisioning state of the express route link resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** MacSec configuration. */
  macSecConfig?: ExpressRouteLinkMacSecConfigOutput;
}

/** ExpressRouteLink Mac Security Configuration. */
export interface ExpressRouteLinkMacSecConfigOutput {
  /** Keyvault Secret Identifier URL containing Mac security CKN key. */
  cknSecretIdentifier?: string;
  /** Keyvault Secret Identifier URL containing Mac security CAK key. */
  cakSecretIdentifier?: string;
  /** Mac security cipher. */
  cipher?: "GcmAes256" | "GcmAes128" | "GcmAesXpn128" | "GcmAesXpn256";
  /** Sci mode enabled/disabled. */
  sciState?: "Disabled" | "Enabled";
}

/** Response for ListExpressRoutePorts API service call. */
export interface ExpressRoutePortListResultOutput {
  /** A list of ExpressRoutePort resources. */
  value?: Array<ExpressRoutePortOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Response for ListExpressRouteLinks API service call. */
export interface ExpressRouteLinkListResultOutput {
  /** The list of ExpressRouteLink sub-resources. */
  value?: Array<ExpressRouteLinkOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Response for GenerateExpressRoutePortsLOA API service call. */
export interface GenerateExpressRoutePortsLOAResultOutput {
  /** The content as a base64 encoded string. */
  encodedContent?: string;
}

/** ExpressRoutePort Authorization resource definition. */
export interface ExpressRoutePortAuthorizationOutput extends SubResourceOutput {
  /** ExpressRoutePort properties. */
  properties?: ExpressRoutePortAuthorizationPropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of ExpressRoutePort Authorization. */
export interface ExpressRoutePortAuthorizationPropertiesFormatOutput {
  /** The authorization key. */
  readonly authorizationKey?: string;
  /** The authorization use status. */
  readonly authorizationUseStatus?: "Available" | "InUse";
  /** The reference to the ExpressRoute circuit resource using the authorization. */
  readonly circuitResourceUri?: string;
  /** The provisioning state of the authorization resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Response for ListExpressRoutePortAuthorizations API service call. */
export interface ExpressRoutePortAuthorizationListResultOutput {
  /** The authorizations in an ExpressRoute Port. */
  value?: Array<ExpressRoutePortAuthorizationOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Response for ListExpressRouteProviderPort API service call. */
export interface ExpressRouteProviderPortListResultOutput {
  /** A list of ExpressRouteProviderPort resources. */
  value?: Array<ExpressRouteProviderPortOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** ExpressRouteProviderPort resource. */
export interface ExpressRouteProviderPortOutput extends ResourceOutput {
  /** Properties of the express route Service Provider Port. */
  properties?: ExpressRouteProviderPortPropertiesOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of ExpressRouteProviderPort. */
export interface ExpressRouteProviderPortPropertiesOutput {
  /** The name of the port pair. */
  readonly portPairDescriptor?: string;
  /** The name of the primary port. */
  readonly primaryAzurePort?: string;
  /** The name of the secondary port. */
  readonly secondaryAzurePort?: string;
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
export interface FirewallPolicyOutput extends ResourceOutput {
  /** Properties of the firewall policy. */
  properties?: FirewallPolicyPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The identity of the firewall policy. */
  identity?: ManagedServiceIdentityOutput;
}

/** Firewall Policy definition. */
export interface FirewallPolicyPropertiesFormatOutput {
  /** List of references to FirewallPolicyRuleCollectionGroups. */
  readonly ruleCollectionGroups?: Array<SubResourceOutput>;
  /** The provisioning state of the firewall policy resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The parent firewall policy from which rules are inherited. */
  basePolicy?: SubResourceOutput;
  /** List of references to Azure Firewalls that this Firewall Policy is associated with. */
  readonly firewalls?: Array<SubResourceOutput>;
  /** List of references to Child Firewall Policies. */
  readonly childPolicies?: Array<SubResourceOutput>;
  /** The operation mode for Threat Intelligence. */
  threatIntelMode?: "Alert" | "Deny" | "Off";
  /** ThreatIntel Whitelist for Firewall Policy. */
  threatIntelWhitelist?: FirewallPolicyThreatIntelWhitelistOutput;
  /** Insights on Firewall Policy. */
  insights?: FirewallPolicyInsightsOutput;
  /** The private IP addresses/IP ranges to which traffic will not be SNAT. */
  snat?: FirewallPolicySnatOutput;
  /** SQL Settings definition. */
  sql?: FirewallPolicySQLOutput;
  /** DNS Proxy Settings definition. */
  dnsSettings?: DnsSettingsOutput;
  /** Explicit Proxy Settings definition. */
  explicitProxy?: ExplicitProxyOutput;
  /** The configuration for Intrusion detection. */
  intrusionDetection?: FirewallPolicyIntrusionDetectionOutput;
  /** TLS Configuration definition. */
  transportSecurity?: FirewallPolicyTransportSecurityOutput;
  /** The Firewall Policy SKU. */
  sku?: FirewallPolicySkuOutput;
}

/** ThreatIntel Whitelist for Firewall Policy. */
export interface FirewallPolicyThreatIntelWhitelistOutput {
  /** List of IP addresses for the ThreatIntel Whitelist. */
  ipAddresses?: Array<string>;
  /** List of FQDNs for the ThreatIntel Whitelist. */
  fqdns?: Array<string>;
}

/** Firewall Policy Insights. */
export interface FirewallPolicyInsightsOutput {
  /** A flag to indicate if the insights are enabled on the policy. */
  isEnabled?: boolean;
  /** Number of days the insights should be enabled on the policy. */
  retentionDays?: number;
  /** Workspaces needed to configure the Firewall Policy Insights. */
  logAnalyticsResources?: FirewallPolicyLogAnalyticsResourcesOutput;
}

/** Log Analytics Resources for Firewall Policy Insights. */
export interface FirewallPolicyLogAnalyticsResourcesOutput {
  /** List of workspaces for Firewall Policy Insights. */
  workspaces?: Array<FirewallPolicyLogAnalyticsWorkspaceOutput>;
  /** The default workspace Id for Firewall Policy Insights. */
  defaultWorkspaceId?: SubResourceOutput;
}

/** Log Analytics Workspace for Firewall Policy Insights. */
export interface FirewallPolicyLogAnalyticsWorkspaceOutput {
  /** Region to configure the Workspace. */
  region?: string;
  /** The workspace Id for Firewall Policy Insights. */
  workspaceId?: SubResourceOutput;
}

/** The private IP addresses/IP ranges to which traffic will not be SNAT. */
export interface FirewallPolicySnatOutput {
  /** List of private IP addresses/IP address ranges to not be SNAT. */
  privateRanges?: Array<string>;
  /** The operation mode for automatically learning private ranges to not be SNAT */
  autoLearnPrivateRanges?: "Enabled" | "Disabled";
}

/** SQL Settings in Firewall Policy. */
export interface FirewallPolicySQLOutput {
  /** A flag to indicate if SQL Redirect traffic filtering is enabled. Turning on the flag requires no rule using port 11000-11999. */
  allowSqlRedirect?: boolean;
}

/** DNS Proxy Settings in Firewall Policy. */
export interface DnsSettingsOutput {
  /** List of Custom DNS Servers. */
  servers?: Array<string>;
  /** Enable DNS Proxy on Firewalls attached to the Firewall Policy. */
  enableProxy?: boolean;
  /** FQDNs in Network Rules are supported when set to true. */
  requireProxyForNetworkRules?: boolean;
}

/** Explicit Proxy Settings in Firewall Policy. */
export interface ExplicitProxyOutput {
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
export interface FirewallPolicyIntrusionDetectionOutput {
  /** Intrusion detection general state. */
  mode?: "Off" | "Alert" | "Deny";
  /** Intrusion detection configuration properties. */
  configuration?: FirewallPolicyIntrusionDetectionConfigurationOutput;
}

/** The operation for configuring intrusion detection. */
export interface FirewallPolicyIntrusionDetectionConfigurationOutput {
  /** List of specific signatures states. */
  signatureOverrides?: Array<FirewallPolicyIntrusionDetectionSignatureSpecificationOutput>;
  /** List of rules for traffic to bypass. */
  bypassTrafficSettings?: Array<FirewallPolicyIntrusionDetectionBypassTrafficSpecificationsOutput>;
  /** IDPS Private IP address ranges are used to identify traffic direction (i.e. inbound, outbound, etc.). By default, only ranges defined by IANA RFC 1918 are considered private IP addresses. To modify default ranges, specify your Private IP address ranges with this property */
  privateRanges?: Array<string>;
}

/** Intrusion detection signatures specification states. */
export interface FirewallPolicyIntrusionDetectionSignatureSpecificationOutput {
  /** Signature id. */
  id?: string;
  /** The signature state. */
  mode?: "Off" | "Alert" | "Deny";
}

/** Intrusion detection bypass traffic specification. */
export interface FirewallPolicyIntrusionDetectionBypassTrafficSpecificationsOutput {
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
export interface FirewallPolicyTransportSecurityOutput {
  /** The CA used for intermediate CA generation. */
  certificateAuthority?: FirewallPolicyCertificateAuthorityOutput;
}

/** Trusted Root certificates properties for tls. */
export interface FirewallPolicyCertificateAuthorityOutput {
  /** Secret Id of (base-64 encoded unencrypted pfx) 'Secret' or 'Certificate' object stored in KeyVault. */
  keyVaultSecretId?: string;
  /** Name of the CA certificate. */
  name?: string;
}

/** SKU of Firewall policy. */
export interface FirewallPolicySkuOutput {
  /** Tier of Firewall Policy. */
  tier?: "Standard" | "Premium" | "Basic";
}

/** Response for ListFirewallPolicies API service call. */
export interface FirewallPolicyListResultOutput {
  /** List of Firewall Policies in a resource group. */
  value?: Array<FirewallPolicyOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** Rule Collection Group resource. */
export interface FirewallPolicyRuleCollectionGroupOutput extends SubResourceOutput {
  /** The properties of the firewall policy rule collection group. */
  properties?: FirewallPolicyRuleCollectionGroupPropertiesOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Rule Group type. */
  readonly type?: string;
}

/** Properties of the rule collection group. */
export interface FirewallPolicyRuleCollectionGroupPropertiesOutput {
  /** Priority of the Firewall Policy Rule Collection Group resource. */
  priority?: number;
  /** Group of Firewall Policy rule collections. */
  ruleCollections?: Array<FirewallPolicyRuleCollectionOutput>;
  /** The provisioning state of the firewall policy rule collection group resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Properties of the rule collection. */
export interface FirewallPolicyRuleCollectionOutputParent {
  /** The name of the rule collection. */
  name?: string;
  /** Priority of the Firewall Policy Rule Collection resource. */
  priority?: number;
  ruleCollectionType:
    | "FirewallPolicyRuleCollection"
    | "FirewallPolicyNatRuleCollection"
    | "FirewallPolicyFilterRuleCollection";
}

/** Response for ListFirewallPolicyRuleCollectionGroups API service call. */
export interface FirewallPolicyRuleCollectionGroupListResultOutput {
  /** List of FirewallPolicyRuleCollectionGroups in a FirewallPolicy. */
  value?: Array<FirewallPolicyRuleCollectionGroupOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** Query result */
export interface QueryResultsOutput {
  /** Number of total records matching the query. */
  matchingRecordsCount?: number;
  /** Array containing the results of the query */
  signatures?: Array<SingleQueryResultOutput>;
}

export interface SingleQueryResultOutput {
  /** The ID of the signature */
  signatureId?: number;
  /** The current mode enforced, 0 - Disabled, 1 - Alert, 2 -Deny */
  mode?: "0" | "1" | "2";
  /** Describes the severity of signature: 1 - Low, 2 - Medium, 3 - High */
  severity?: "1" | "2" | "3";
  /** Describes in which direction signature is being enforced: 0 - Inbound, 1 - OutBound, 2 - Bidirectional */
  direction?: "0" | "1" | "2";
  /** Describes the groups the signature belongs to */
  group?: string;
  /** Describes what is the signature enforces */
  description?: string;
  /** Describes the protocol the signatures is being enforced in */
  protocol?: string;
  /** Describes the list of source ports related to this signature */
  sourcePorts?: Array<string>;
  /** Describes the list of destination ports related to this signature */
  destinationPorts?: Array<string>;
  /** Describes the last updated time of the signature (provided from 3rd party vendor) */
  lastUpdated?: string;
  /** Describes if this override is inherited from base policy or not */
  inheritedFromParentPolicy?: boolean;
}

/** Contains all specific policy signatures overrides for the IDPS */
export interface SignaturesOverridesOutput {
  /** Contains the name of the resource (default) */
  name?: string;
  /** Will contain the resource id of the signature override resource */
  id?: string;
  /** Will contain the type of the resource: Microsoft.Network/firewallPolicies/intrusionDetectionSignaturesOverrides */
  type?: string;
  /** Will contain the properties of the resource (the actual signature overrides) */
  properties?: SignaturesOverridesPropertiesOutput;
}

/** Will contain the properties of the resource (the actual signature overrides) */
export interface SignaturesOverridesPropertiesOutput {
  /** Dictionary of <string> */
  signatures?: Record<string, string>;
}

/** Describes the list of all possible values for a specific filter value */
export interface SignatureOverridesFilterValuesResponseOutput {
  /** Describes the possible values */
  filterValues?: Array<string>;
}

/** Describes an object containing an array with a single item */
export interface SignaturesOverridesListOutput {
  /** Describes a list consisting exactly one item describing the policy's signature override status */
  value?: Array<SignaturesOverridesOutput>;
}

/** IpAllocation resource. */
export interface IpAllocationOutput extends ResourceOutput {
  /** Properties of the IpAllocation. */
  properties?: IpAllocationPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of the IpAllocation. */
export interface IpAllocationPropertiesFormatOutput {
  /** The Subnet that using the prefix of this IpAllocation resource. */
  readonly subnet?: SubResourceOutput;
  /** The VirtualNetwork that using the prefix of this IpAllocation resource. */
  readonly virtualNetwork?: SubResourceOutput;
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

/** Response for the ListIpAllocations API service call. */
export interface IpAllocationListResultOutput {
  /** A list of IpAllocation resources. */
  value?: Array<IpAllocationOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** The IpGroups resource information. */
export interface IpGroupOutput extends ResourceOutput {
  /** Properties of the IpGroups. */
  properties?: IpGroupPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** The IpGroups property information. */
export interface IpGroupPropertiesFormatOutput {
  /** The provisioning state of the IpGroups resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** IpAddresses/IpAddressPrefixes in the IpGroups resource. */
  ipAddresses?: Array<string>;
  /** List of references to Firewall resources that this IpGroups is associated with. */
  readonly firewalls?: Array<SubResourceOutput>;
  /** List of references to Firewall Policies resources that this IpGroups is associated with. */
  readonly firewallPolicies?: Array<SubResourceOutput>;
}

/** Response for the ListIpGroups API service call. */
export interface IpGroupListResultOutput {
  /** The list of IpGroups information resources. */
  value?: Array<IpGroupOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** LoadBalancer resource. */
export interface LoadBalancerOutput extends ResourceOutput {
  /** The extended location of the load balancer. */
  extendedLocation?: ExtendedLocationOutput;
  /** The load balancer SKU. */
  sku?: LoadBalancerSkuOutput;
  /** Properties of load balancer. */
  properties?: LoadBalancerPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** SKU of a load balancer. */
export interface LoadBalancerSkuOutput {
  /** Name of a load balancer SKU. */
  name?: "Basic" | "Standard" | "Gateway";
  /** Tier of a load balancer SKU. */
  tier?: "Regional" | "Global";
}

/** Properties of the load balancer. */
export interface LoadBalancerPropertiesFormatOutput {
  /** Object representing the frontend IPs to be used for the load balancer. */
  frontendIPConfigurations?: Array<FrontendIPConfigurationOutput>;
  /** Collection of backend address pools used by a load balancer. */
  backendAddressPools?: Array<BackendAddressPoolOutput>;
  /** Object collection representing the load balancing rules Gets the provisioning. */
  loadBalancingRules?: Array<LoadBalancingRuleOutput>;
  /** Collection of probe objects used in the load balancer. */
  probes?: Array<ProbeOutput>;
  /** Collection of inbound NAT Rules used by a load balancer. Defining inbound NAT rules on your load balancer is mutually exclusive with defining an inbound NAT pool. Inbound NAT pools are referenced from virtual machine scale sets. NICs that are associated with individual virtual machines cannot reference an Inbound NAT pool. They have to reference individual inbound NAT rules. */
  inboundNatRules?: Array<InboundNatRuleOutput>;
  /** Defines an external port range for inbound NAT to a single backend port on NICs associated with a load balancer. Inbound NAT rules are created automatically for each NIC associated with the Load Balancer using an external port from this range. Defining an Inbound NAT pool on your Load Balancer is mutually exclusive with defining inbound NAT rules. Inbound NAT pools are referenced from virtual machine scale sets. NICs that are associated with individual virtual machines cannot reference an inbound NAT pool. They have to reference individual inbound NAT rules. */
  inboundNatPools?: Array<InboundNatPoolOutput>;
  /** The outbound rules. */
  outboundRules?: Array<OutboundRuleOutput>;
  /** The resource GUID property of the load balancer resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the load balancer resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** A load balancing rule for a load balancer. */
export interface LoadBalancingRuleOutput extends SubResourceOutput {
  /** Properties of load balancer load balancing rule. */
  properties?: LoadBalancingRulePropertiesFormatOutput;
  /** The name of the resource that is unique within the set of load balancing rules used by the load balancer. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of the load balancer. */
export interface LoadBalancingRulePropertiesFormatOutput {
  /** A reference to frontend IP addresses. */
  frontendIPConfiguration?: SubResourceOutput;
  /** A reference to a pool of DIPs. Inbound traffic is randomly load balanced across IPs in the backend IPs. */
  backendAddressPool?: SubResourceOutput;
  /** An array of references to pool of DIPs. */
  backendAddressPools?: Array<SubResourceOutput>;
  /** The reference to the load balancer probe used by the load balancing rule. */
  probe?: SubResourceOutput;
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
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** A load balancer probe. */
export interface ProbeOutput extends SubResourceOutput {
  /** Properties of load balancer probe. */
  properties?: ProbePropertiesFormatOutput;
  /** The name of the resource that is unique within the set of probes used by the load balancer. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Load balancer probe resource. */
export interface ProbePropertiesFormatOutput {
  /** The load balancer rules that use this probe. */
  readonly loadBalancingRules?: Array<SubResourceOutput>;
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
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Inbound NAT pool of the load balancer. */
export interface InboundNatPoolOutput extends SubResourceOutput {
  /** Properties of load balancer inbound nat pool. */
  properties?: InboundNatPoolPropertiesFormatOutput;
  /** The name of the resource that is unique within the set of inbound NAT pools used by the load balancer. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Properties of Inbound NAT pool. */
export interface InboundNatPoolPropertiesFormatOutput {
  /** A reference to frontend IP addresses. */
  frontendIPConfiguration?: SubResourceOutput;
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
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Outbound rule of the load balancer. */
export interface OutboundRuleOutput extends SubResourceOutput {
  /** Properties of load balancer outbound rule. */
  properties?: OutboundRulePropertiesFormatOutput;
  /** The name of the resource that is unique within the set of outbound rules used by the load balancer. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
}

/** Outbound rule of the load balancer. */
export interface OutboundRulePropertiesFormatOutput {
  /** The number of outbound ports to be used for NAT. */
  allocatedOutboundPorts?: number;
  /** The Frontend IP addresses of the load balancer. */
  frontendIPConfigurations: Array<SubResourceOutput>;
  /** A reference to a pool of DIPs. Outbound traffic is randomly load balanced across IPs in the backend IPs. */
  backendAddressPool: SubResourceOutput;
  /** The provisioning state of the outbound rule resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The protocol for the outbound rule in load balancer. */
  protocol: "Tcp" | "Udp" | "All";
  /** Receive bidirectional TCP Reset on TCP flow idle timeout or unexpected connection termination. This element is only used when the protocol is set to TCP. */
  enableTcpReset?: boolean;
  /** The timeout for the TCP idle connection. */
  idleTimeoutInMinutes?: number;
}

/** Response for ListLoadBalancers API service call. */
export interface LoadBalancerListResultOutput {
  /** A list of load balancers in a resource group. */
  value?: Array<LoadBalancerOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Response for ListBackendAddressPool API service call. */
export interface LoadBalancerBackendAddressPoolListResultOutput {
  /** A list of backend address pools in a load balancer. */
  value?: Array<BackendAddressPoolOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Response for ListFrontendIPConfiguration API service call. */
export interface LoadBalancerFrontendIPConfigurationListResultOutput {
  /** A list of frontend IP configurations in a load balancer. */
  value?: Array<FrontendIPConfigurationOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Response for ListInboundNatRule API service call. */
export interface InboundNatRuleListResultOutput {
  /** A list of inbound NAT rules in a load balancer. */
  value?: Array<InboundNatRuleOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Response for ListLoadBalancingRule API service call. */
export interface LoadBalancerLoadBalancingRuleListResultOutput {
  /** A list of load balancing rules in a load balancer. */
  value?: Array<LoadBalancingRuleOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Response for ListOutboundRule API service call. */
export interface LoadBalancerOutboundRuleListResultOutput {
  /** A list of outbound rules in a load balancer. */
  value?: Array<OutboundRuleOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Response for ListProbe API service call. */
export interface LoadBalancerProbeListResultOutput {
  /** A list of probes in a load balancer. */
  value?: Array<ProbeOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** The response for a QueryInboundNatRulePortMapping API. */
export interface BackendAddressInboundNatRulePortMappingsOutput {
  /** Collection of inbound NAT rule port mappings. */
  inboundNatRulePortMappings?: Array<InboundNatRulePortMappingOutput>;
}

/** Individual port mappings for inbound NAT rule created for backend pool. */
export interface InboundNatRulePortMappingOutput {
  /** Name of inbound NAT rule. */
  readonly inboundNatRuleName?: string;
  /** The reference to the transport protocol used by the inbound NAT rule. */
  readonly protocol?: "Udp" | "Tcp" | "All";
  /** Frontend port. */
  readonly frontendPort?: number;
  /** Backend port. */
  readonly backendPort?: number;
}

/** Response for ListNatGateways API service call. */
export interface NatGatewayListResultOutput {
  /** A list of Nat Gateways that exists in a resource group. */
  value?: Array<NatGatewayOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Response for list effective route API service call. */
export interface EffectiveRouteListResultOutput {
  /** A list of effective routes. */
  value?: Array<EffectiveRouteOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Effective Route. */
export interface EffectiveRouteOutput {
  /** The name of the user defined route. This is optional. */
  name?: string;
  /** If true, on-premises routes are not propagated to the network interfaces in the subnet. */
  disableBgpRoutePropagation?: boolean;
  /** Who created the route. */
  source?: "Unknown" | "User" | "VirtualNetworkGateway" | "Default";
  /** The value of effective route. */
  state?: "Active" | "Invalid";
  /** The address prefixes of the effective routes in CIDR notation. */
  addressPrefix?: Array<string>;
  /** The IP address of the next hop of the effective route. */
  nextHopIpAddress?: Array<string>;
  /** The type of Azure hop the packet should be sent to. */
  nextHopType?: "VirtualNetworkGateway" | "VnetLocal" | "Internet" | "VirtualAppliance" | "None";
}

/** Response for list effective network security groups API service call. */
export interface EffectiveNetworkSecurityGroupListResultOutput {
  /** A list of effective network security groups. */
  value?: Array<EffectiveNetworkSecurityGroupOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Effective network security group. */
export interface EffectiveNetworkSecurityGroupOutput {
  /** The ID of network security group that is applied. */
  networkSecurityGroup?: SubResourceOutput;
  /** Associated resources. */
  association?: EffectiveNetworkSecurityGroupAssociationOutput;
  /** A collection of effective security rules. */
  effectiveSecurityRules?: Array<EffectiveNetworkSecurityRuleOutput>;
  /** Mapping of tags to list of IP Addresses included within the tag. */
  tagMap?: string;
}

/** The effective network security group association. */
export interface EffectiveNetworkSecurityGroupAssociationOutput {
  /** The ID of the Azure network manager if assigned. */
  networkManager?: SubResourceOutput;
  /** The ID of the subnet if assigned. */
  subnet?: SubResourceOutput;
  /** The ID of the network interface if assigned. */
  networkInterface?: SubResourceOutput;
}

/** Effective network security rules. */
export interface EffectiveNetworkSecurityRuleOutput {
  /** The name of the security rule specified by the user (if created by the user). */
  name?: string;
  /** The network protocol this rule applies to. */
  protocol?: "Tcp" | "Udp" | "All";
  /** The source port or range. */
  sourcePortRange?: string;
  /** The destination port or range. */
  destinationPortRange?: string;
  /** The source port ranges. Expected values include a single integer between 0 and 65535, a range using '-' as separator (e.g. 100-400), or an asterisk (*). */
  sourcePortRanges?: Array<string>;
  /** The destination port ranges. Expected values include a single integer between 0 and 65535, a range using '-' as separator (e.g. 100-400), or an asterisk (*). */
  destinationPortRanges?: Array<string>;
  /** The source address prefix. */
  sourceAddressPrefix?: string;
  /** The destination address prefix. */
  destinationAddressPrefix?: string;
  /** The source address prefixes. Expected values include CIDR IP ranges, Default Tags (VirtualNetwork, AzureLoadBalancer, Internet), System Tags, and the asterisk (*). */
  sourceAddressPrefixes?: Array<string>;
  /** The destination address prefixes. Expected values include CIDR IP ranges, Default Tags (VirtualNetwork, AzureLoadBalancer, Internet), System Tags, and the asterisk (*). */
  destinationAddressPrefixes?: Array<string>;
  /** The expanded source address prefix. */
  expandedSourceAddressPrefix?: Array<string>;
  /** Expanded destination address prefix. */
  expandedDestinationAddressPrefix?: Array<string>;
  /** Whether network traffic is allowed or denied. */
  access?: "Allow" | "Deny";
  /** The priority of the rule. */
  priority?: number;
  /** The direction of the rule. */
  direction?: "Inbound" | "Outbound";
}

/** Response for list ip configurations API service call. */
export interface NetworkInterfaceIPConfigurationListResultOutput {
  /** A list of ip configurations. */
  value?: Array<NetworkInterfaceIPConfigurationOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Response for list ip configurations API service call. */
export interface NetworkInterfaceLoadBalancerListResultOutput {
  /** A list of load balancers. */
  value?: Array<LoadBalancerOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Response for list tap configurations API service call. */
export interface NetworkInterfaceTapConfigurationListResultOutput {
  /** A list of tap configurations. */
  value?: Array<NetworkInterfaceTapConfigurationOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** The Managed Network resource */
export interface NetworkManagerOutput extends ResourceOutput {
  /** The network manager properties */
  properties?: NetworkManagerPropertiesOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The system metadata related to this resource. */
  readonly systemData?: SystemDataOutput;
}

/** Properties of Managed Network */
export interface NetworkManagerPropertiesOutput {
  /** A description of the network manager. */
  description?: string;
  /** Scope of Network Manager. */
  networkManagerScopes: NetworkManagerPropertiesNetworkManagerScopesOutput;
  /** Scope Access. */
  networkManagerScopeAccesses: Array<"SecurityAdmin" | "Connectivity">;
  /** The provisioning state of the network manager resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Scope of Network Manager. */
export interface NetworkManagerPropertiesNetworkManagerScopesOutput {
  /** List of management groups. */
  managementGroups?: Array<string>;
  /** List of subscriptions. */
  subscriptions?: Array<string>;
  /** List of cross tenant scopes. */
  readonly crossTenantScopes?: Array<CrossTenantScopesOutput>;
}

/** Cross tenant scopes. */
export interface CrossTenantScopesOutput {
  /** Tenant ID. */
  readonly tenantId?: string;
  /** List of management groups. */
  readonly managementGroups?: Array<string>;
  /** List of subscriptions. */
  readonly subscriptions?: Array<string>;
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemDataOutput {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: "User" | "Application" | "ManagedIdentity" | "Key";
  /** The timestamp of resource creation (UTC). */
  createdAt?: string;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: "User" | "Application" | "ManagedIdentity" | "Key";
  /** The type of identity that last modified the resource. */
  lastModifiedAt?: string;
}

/** Network Manager Commit. */
export interface NetworkManagerCommitOutput {
  /** Commit Id. */
  readonly commitId?: string;
  /** List of target locations. */
  targetLocations: Array<string>;
  /** List of configuration ids. */
  configurationIds?: Array<string>;
  /** Commit Type. */
  commitType: "SecurityAdmin" | "Connectivity";
}

/** A list of Network Manager Deployment Status */
export interface NetworkManagerDeploymentStatusListResultOutput {
  /** Gets a page of Network Manager Deployment Status */
  value?: Array<NetworkManagerDeploymentStatusOutput>;
  /** When present, the value can be passed to a subsequent query call (together with the same query and scopes used in the current request) to retrieve the next page of data. */
  skipToken?: string;
}

/** Network Manager Deployment Status. */
export interface NetworkManagerDeploymentStatusOutput {
  /** Commit Time. */
  commitTime?: string;
  /** Region Name. */
  region?: string;
  /** Deployment Status. */
  deploymentStatus?: "NotStarted" | "Deploying" | "Deployed" | "Failed";
  /** List of configuration ids. */
  configurationIds?: Array<string>;
  /** Configuration Deployment Type. */
  deploymentType?: "SecurityAdmin" | "Connectivity";
  /** Error Message. */
  errorMessage?: string;
}

/** Result of the request to list NetworkManager. It contains a list of network managers and a URL link to get the next set of results. */
export interface NetworkManagerListResultOutput {
  /** Gets a page of NetworkManager */
  value?: Array<NetworkManagerOutput>;
  /** Gets the URL to get the next page of results. */
  nextLink?: string;
}

/** Result of the request to list active connectivity configurations. It contains a list of active connectivity configurations and a skiptoken to get the next set of results. */
export interface ActiveConnectivityConfigurationsListResultOutput {
  /** Gets a page of active connectivity configurations. */
  value?: Array<ActiveConnectivityConfigurationOutput>;
  /** When present, the value can be passed to a subsequent query call (together with the same query and scopes used in the current request) to retrieve the next page of data. */
  skipToken?: string;
}

/** Active connectivity configuration. */
export interface ActiveConnectivityConfigurationOutput extends EffectiveConnectivityConfigurationOutput {
  /** Deployment time string. */
  commitTime?: string;
  /** Deployment region. */
  region?: string;
}

/** The network manager effective connectivity configuration */
export interface EffectiveConnectivityConfigurationOutput {
  /** Connectivity configuration ID. */
  id?: string;
  /** Properties of a network manager connectivity configuration */
  properties?: ConnectivityConfigurationPropertiesOutput;
  /** Effective configuration groups. */
  configurationGroups?: Array<ConfigurationGroupOutput>;
}

/** Properties of network manager connectivity configuration */
export interface ConnectivityConfigurationPropertiesOutput {
  /** A description of the connectivity configuration. */
  description?: string;
  /** Connectivity topology type. */
  connectivityTopology: "HubAndSpoke" | "Mesh";
  /** List of hubItems */
  hubs?: Array<HubOutput>;
  /** Flag if global mesh is supported. */
  isGlobal?: "False" | "True";
  /** Groups for configuration */
  appliesToGroups: Array<ConnectivityGroupItemOutput>;
  /** The provisioning state of the connectivity configuration resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Flag if need to remove current existing peerings. */
  deleteExistingPeering?: "False" | "True";
}

/** Hub Item. */
export interface HubOutput {
  /** Resource Id. */
  resourceId?: string;
  /** Resource Type. */
  resourceType?: string;
}

/** Connectivity group item. */
export interface ConnectivityGroupItemOutput {
  /** Network group Id. */
  networkGroupId: string;
  /** Flag if need to use hub gateway. */
  useHubGateway?: "False" | "True";
  /** Flag if global is supported. */
  isGlobal?: "False" | "True";
  /** Group connectivity type. */
  groupConnectivity: "None" | "DirectlyConnected";
}

/** The network configuration group resource */
export interface ConfigurationGroupOutput {
  /** Network group ID. */
  id?: string;
  /** The network configuration group properties */
  properties?: NetworkGroupPropertiesOutput;
}

/** Properties of network group */
export interface NetworkGroupPropertiesOutput {
  /** A description of the network group. */
  description?: string;
  /** The provisioning state of the scope assignment resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Result of the request to list active security admin rules. It contains a list of active security admin rules and a skiptoken to get the next set of results. */
export interface ActiveSecurityAdminRulesListResultOutput {
  /** Gets a page of active security admin rules. */
  value?: Array<ActiveBaseSecurityAdminRuleOutput>;
  /** When present, the value can be passed to a subsequent query call (together with the same query and scopes used in the current request) to retrieve the next page of data. */
  skipToken?: string;
}

/** Network base admin rule. */
export interface ActiveBaseSecurityAdminRuleOutputParent {
  /** Resource ID. */
  id?: string;
  /** Deployment time string. */
  commitTime?: string;
  /** Deployment region. */
  region?: string;
  /** A description of the security admin configuration. */
  configurationDescription?: string;
  /** A description of the rule collection. */
  ruleCollectionDescription?: string;
  /** Groups for rule collection */
  ruleCollectionAppliesToGroups?: Array<NetworkManagerSecurityGroupItemOutput>;
  /** Effective configuration groups. */
  ruleGroups?: Array<ConfigurationGroupOutput>;
  kind: "ActiveBaseSecurityAdminRule" | "Custom" | "Default";
}

/** Network manager security group item. */
export interface NetworkManagerSecurityGroupItemOutput {
  /** Network manager group Id. */
  networkGroupId: string;
}

/** The Network Manager Connection resource */
export interface NetworkManagerConnectionOutput extends ChildResourceOutput {
  /** The scope connection properties */
  properties?: NetworkManagerConnectionPropertiesOutput;
  /** The system metadata related to this resource. */
  readonly systemData?: SystemDataOutput;
}

/** Information about the network manager connection. */
export interface NetworkManagerConnectionPropertiesOutput {
  /** Network Manager Id. */
  networkManagerId?: string;
  /** Connection state. */
  readonly connectionState?: "Connected" | "Pending" | "Conflict" | "Revoked" | "Rejected";
  /** A description of the network manager connection. */
  description?: string;
}

/** Proxy resource representation. */
export interface ChildResourceOutput {
  /** Resource ID. */
  readonly id?: string;
  /** Resource name. */
  readonly name?: string;
  /** Resource type. */
  readonly type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** List of network manager connections. */
export interface NetworkManagerConnectionListResultOutput {
  /** List of network manager connections. */
  value?: Array<NetworkManagerConnectionOutput>;
  /** Gets the URL to get the next page of results. */
  nextLink?: string;
}

/** The network manager connectivity configuration resource */
export interface ConnectivityConfigurationOutput extends ChildResourceOutput {
  /** Properties of a network manager connectivity configuration */
  properties?: ConnectivityConfigurationPropertiesOutput;
  /** The system metadata related to this resource. */
  readonly systemData?: SystemDataOutput;
}

/** Result of the request to list network manager connectivity configurations. It contains a list of configurations and a link to get the next set of results. */
export interface ConnectivityConfigurationListResultOutput {
  /** Gets a page of Connectivity Configurations */
  value?: Array<ConnectivityConfigurationOutput>;
  /** Gets the URL to get the next page of results. */
  nextLink?: string;
}

/** Result of the request to list networkManagerEffectiveConnectivityConfiguration. It contains a list of groups and a skiptoken to get the next set of results. */
export interface NetworkManagerEffectiveConnectivityConfigurationListResultOutput {
  /** Gets a page of NetworkManagerEffectiveConnectivityConfiguration */
  value?: Array<EffectiveConnectivityConfigurationOutput>;
  /** When present, the value can be passed to a subsequent query call (together with the same query and scopes used in the current request) to retrieve the next page of data. */
  skipToken?: string;
}

/** Result of the request to list networkManagerEffectiveSecurityAdminRules. It contains a list of groups and a skiptoken to get the next set of results. */
export interface NetworkManagerEffectiveSecurityAdminRulesListResultOutput {
  /** Gets a page of NetworkManagerEffectiveSecurityAdminRules */
  value?: Array<EffectiveBaseSecurityAdminRuleOutput>;
  /** When present, the value can be passed to a subsequent query call (together with the same query and scopes used in the current request) to retrieve the next page of data. */
  skipToken?: string;
}

/** Network base admin rule. */
export interface EffectiveBaseSecurityAdminRuleOutputParent {
  /** Resource ID. */
  id?: string;
  /** A description of the security admin configuration. */
  configurationDescription?: string;
  /** A description of the rule collection. */
  ruleCollectionDescription?: string;
  /** Groups for rule collection */
  ruleCollectionAppliesToGroups?: Array<NetworkManagerSecurityGroupItemOutput>;
  /** Effective configuration groups. */
  ruleGroups?: Array<ConfigurationGroupOutput>;
  kind: "EffectiveBaseSecurityAdminRule" | "Custom" | "Default";
}

/** The network group resource */
export interface NetworkGroupOutput extends ChildResourceOutput {
  /** The Network Group properties */
  properties?: NetworkGroupPropertiesOutput;
  /** The system metadata related to this resource. */
  readonly systemData?: SystemDataOutput;
}

/** Result of the request to list NetworkGroup. It contains a list of groups and a URL link to get the next set of results. */
export interface NetworkGroupListResultOutput {
  /** Gets a page of NetworkGroup */
  value?: Array<NetworkGroupOutput>;
  /** Gets the URL to get the next set of results. */
  nextLink?: string;
}

/** StaticMember Item. */
export interface StaticMemberOutput extends ChildResourceOutput {
  /** The Static Member properties */
  properties?: StaticMemberPropertiesOutput;
  /** The system metadata related to this resource. */
  readonly systemData?: SystemDataOutput;
}

/** Properties of static member. */
export interface StaticMemberPropertiesOutput {
  /** Resource Id. */
  resourceId?: string;
  /** Resource region. */
  readonly region?: string;
  /** The provisioning state of the scope assignment resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Result of the request to list StaticMember. It contains a list of groups and a URL link to get the next set of results. */
export interface StaticMemberListResultOutput {
  /** Gets a page of StaticMember */
  value?: Array<StaticMemberOutput>;
  /** Gets the URL to get the next set of results. */
  nextLink?: string;
}

/** The Scope Connections resource */
export interface ScopeConnectionOutput extends ChildResourceOutput {
  /** The scope connection properties */
  properties?: ScopeConnectionPropertiesOutput;
  /** The system metadata related to this resource. */
  readonly systemData?: SystemDataOutput;
}

/** Scope connection. */
export interface ScopeConnectionPropertiesOutput {
  /** Tenant ID. */
  tenantId?: string;
  /** Resource ID. */
  resourceId?: string;
  /** Connection State */
  readonly connectionState?: "Connected" | "Pending" | "Conflict" | "Revoked" | "Rejected";
  /** A description of the scope connection. */
  description?: string;
}

/** List of scope connections. */
export interface ScopeConnectionListResultOutput {
  /** List of scope connections. */
  value?: Array<ScopeConnectionOutput>;
  /** Gets the URL to get the next page of results. */
  nextLink?: string;
}

/** A list of network manager security admin configurations */
export interface SecurityAdminConfigurationListResultOutput {
  /** Gets a page of security admin configurations */
  value?: Array<SecurityAdminConfigurationOutput>;
  /** Gets the URL to get the next page of results. */
  nextLink?: string;
}

/** Defines the security admin configuration */
export interface SecurityAdminConfigurationOutput extends ChildResourceOutput {
  /** Indicates the properties for the network manager security admin configuration. */
  properties?: SecurityAdminConfigurationPropertiesFormatOutput;
  /** The system metadata related to this resource. */
  readonly systemData?: SystemDataOutput;
}

/** Defines the security admin configuration properties. */
export interface SecurityAdminConfigurationPropertiesFormatOutput {
  /** A description of the security configuration. */
  description?: string;
  /** Enum list of network intent policy based services. */
  applyOnNetworkIntentPolicyBasedServices?: Array<"None" | "All" | "AllowRulesOnly">;
  /** The provisioning state of the resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Security admin configuration rule collection list result. */
export interface AdminRuleCollectionListResultOutput {
  /** A list of network manager security admin configuration rule collections */
  value?: Array<AdminRuleCollectionOutput>;
  /** Gets the URL to get the next set of results. */
  nextLink?: string;
}

/** Defines the admin rule collection. */
export interface AdminRuleCollectionOutput extends ChildResourceOutput {
  /** Indicates the properties for the network manager admin rule collection. */
  properties?: AdminRuleCollectionPropertiesFormatOutput;
  /** The system metadata related to this resource. */
  readonly systemData?: SystemDataOutput;
}

/** Defines the admin rule collection properties. */
export interface AdminRuleCollectionPropertiesFormatOutput {
  /** A description of the admin rule collection. */
  description?: string;
  /** Groups for configuration */
  appliesToGroups: Array<NetworkManagerSecurityGroupItemOutput>;
  /** The provisioning state of the resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** security configuration admin rule list result. */
export interface AdminRuleListResultOutput {
  /** A list of admin rules */
  value?: Array<BaseAdminRuleOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Network base admin rule. */
export interface BaseAdminRuleOutputParent extends ChildResourceOutput {
  /** The system metadata related to this resource. */
  readonly systemData?: SystemDataOutput;
  kind: "BaseAdminRule" | "Custom" | "Default";
}

/** Network profile resource. */
export interface NetworkProfileOutput extends ResourceOutput {
  /** Network profile properties. */
  properties?: NetworkProfilePropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Network profile properties. */
export interface NetworkProfilePropertiesFormatOutput {
  /** List of child container network interfaces. */
  readonly containerNetworkInterfaces?: Array<ContainerNetworkInterfaceOutput>;
  /** List of chid container network interface configurations. */
  containerNetworkInterfaceConfigurations?: Array<ContainerNetworkInterfaceConfigurationOutput>;
  /** The resource GUID property of the network profile resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the network profile resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Container network interface child resource. */
export interface ContainerNetworkInterfaceOutput extends SubResourceOutput {
  /** Container network interface properties. */
  properties?: ContainerNetworkInterfacePropertiesFormatOutput;
  /** The name of the resource. This name can be used to access the resource. */
  name?: string;
  /** Sub Resource type. */
  readonly type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of container network interface. */
export interface ContainerNetworkInterfacePropertiesFormatOutput {
  /** Container network interface configuration from which this container network interface is created. */
  readonly containerNetworkInterfaceConfiguration?: ContainerNetworkInterfaceConfigurationOutput;
  /** Reference to the container to which this container network interface is attached. */
  container?: ContainerOutput;
  /** Reference to the ip configuration on this container nic. */
  readonly ipConfigurations?: Array<ContainerNetworkInterfaceIpConfigurationOutput>;
  /** The provisioning state of the container network interface resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Container network interface configuration child resource. */
export interface ContainerNetworkInterfaceConfigurationOutput extends SubResourceOutput {
  /** Container network interface configuration properties. */
  properties?: ContainerNetworkInterfaceConfigurationPropertiesFormatOutput;
  /** The name of the resource. This name can be used to access the resource. */
  name?: string;
  /** Sub Resource type. */
  readonly type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Container network interface configuration properties. */
export interface ContainerNetworkInterfaceConfigurationPropertiesFormatOutput {
  /** A list of ip configurations of the container network interface configuration. */
  ipConfigurations?: Array<IPConfigurationProfileOutput>;
  /** A list of container network interfaces created from this container network interface configuration. */
  containerNetworkInterfaces?: Array<SubResourceOutput>;
  /** The provisioning state of the container network interface configuration resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Reference to container resource in remote resource provider. */
export interface ContainerOutput extends SubResourceOutput {}

/** The ip configuration for a container network interface. */
export interface ContainerNetworkInterfaceIpConfigurationOutput {
  /** Properties of the container network interface IP configuration. */
  properties?: ContainerNetworkInterfaceIpConfigurationPropertiesFormatOutput;
  /** The name of the resource. This name can be used to access the resource. */
  name?: string;
  /** Sub Resource type. */
  readonly type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of the container network interface IP configuration. */
export interface ContainerNetworkInterfaceIpConfigurationPropertiesFormatOutput {
  /** The provisioning state of the container network interface IP configuration resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Response for ListNetworkProfiles API service call. */
export interface NetworkProfileListResultOutput {
  /** A list of network profiles that exist in a resource group. */
  value?: Array<NetworkProfileOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Response for ListNetworkSecurityGroups API service call. */
export interface NetworkSecurityGroupListResultOutput {
  /** A list of NetworkSecurityGroup resources. */
  value?: Array<NetworkSecurityGroupOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Response for ListSecurityRule API service call. Retrieves all security rules that belongs to a network security group. */
export interface SecurityRuleListResultOutput {
  /** The security rules in a network security group. */
  value?: Array<SecurityRuleOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** NetworkVirtualAppliance Resource. */
export interface NetworkVirtualApplianceOutput extends ResourceOutput {
  /** Properties of the Network Virtual Appliance. */
  properties?: NetworkVirtualAppliancePropertiesFormatOutput;
  /** The service principal that has read access to cloud-init and config blob. */
  identity?: ManagedServiceIdentityOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Network Virtual Appliance definition. */
export interface NetworkVirtualAppliancePropertiesFormatOutput {
  /** Network Virtual Appliance SKU. */
  nvaSku?: VirtualApplianceSkuPropertiesOutput;
  /** Address Prefix. */
  readonly addressPrefix?: string;
  /** BootStrapConfigurationBlobs storage URLs. */
  bootStrapConfigurationBlobs?: Array<string>;
  /** The Virtual Hub where Network Virtual Appliance is being deployed. */
  virtualHub?: SubResourceOutput;
  /** CloudInitConfigurationBlob storage URLs. */
  cloudInitConfigurationBlobs?: Array<string>;
  /** CloudInitConfiguration string in plain text. */
  cloudInitConfiguration?: string;
  /** VirtualAppliance ASN. */
  virtualApplianceAsn?: number;
  /** Public key for SSH login. */
  sshPublicKey?: string;
  /** List of Virtual Appliance Network Interfaces. */
  readonly virtualApplianceNics?: Array<VirtualApplianceNicPropertiesOutput>;
  /** List of references to VirtualApplianceSite. */
  readonly virtualApplianceSites?: Array<SubResourceOutput>;
  /** List of references to InboundSecurityRules. */
  readonly inboundSecurityRules?: Array<SubResourceOutput>;
  /** The provisioning state of the resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Network Virtual Appliance Sku Properties. */
export interface VirtualApplianceSkuPropertiesOutput {
  /** Virtual Appliance Vendor. */
  vendor?: string;
  /** Virtual Appliance Scale Unit. */
  bundledScaleUnit?: string;
  /** Virtual Appliance Version. */
  marketPlaceVersion?: string;
}

/** Network Virtual Appliance NIC properties. */
export interface VirtualApplianceNicPropertiesOutput {
  /** NIC name. */
  readonly name?: string;
  /** Public IP address. */
  readonly publicIpAddress?: string;
  /** Private IP address. */
  readonly privateIpAddress?: string;
}

/** Response for ListNetworkVirtualAppliances API service call. */
export interface NetworkVirtualApplianceListResultOutput {
  /** List of Network Virtual Appliances. */
  value?: Array<NetworkVirtualApplianceOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** Virtual Appliance Site resource. */
export interface VirtualApplianceSiteOutput extends SubResourceOutput {
  /** The properties of the Virtual Appliance Sites. */
  properties?: VirtualApplianceSitePropertiesOutput;
  /** Name of the virtual appliance site. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Site type. */
  readonly type?: string;
}

/** Properties of the rule group. */
export interface VirtualApplianceSitePropertiesOutput {
  /** Address Prefix. */
  addressPrefix?: string;
  /** Office 365 Policy. */
  o365Policy?: Office365PolicyPropertiesOutput;
  /** The provisioning state of the resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Network Virtual Appliance Sku Properties. */
export interface Office365PolicyPropertiesOutput {
  /** Office 365 breakout categories. */
  breakOutCategories?: BreakOutCategoryPoliciesOutput;
}

/** Network Virtual Appliance Sku Properties. */
export interface BreakOutCategoryPoliciesOutput {
  /** Flag to control breakout of o365 allow category. */
  allow?: boolean;
  /** Flag to control breakout of o365 optimize category. */
  optimize?: boolean;
  /** Flag to control breakout of o365 default category. */
  default?: boolean;
}

/** Response for ListNetworkVirtualApplianceSites API service call. */
export interface NetworkVirtualApplianceSiteListResultOutput {
  /** List of Network Virtual Appliance sites. */
  value?: Array<VirtualApplianceSiteOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** Response for ListNetworkVirtualApplianceSkus API service call. */
export interface NetworkVirtualApplianceSkuListResultOutput {
  /** List of Network Virtual Appliance Skus that are available. */
  value?: Array<NetworkVirtualApplianceSkuOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** Definition of the NetworkVirtualApplianceSkus resource. */
export interface NetworkVirtualApplianceSkuOutput extends ResourceOutput {
  /** NetworkVirtualApplianceSku properties. */
  properties?: NetworkVirtualApplianceSkuPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties specific to NetworkVirtualApplianceSkus. */
export interface NetworkVirtualApplianceSkuPropertiesFormatOutput {
  /** Network Virtual Appliance Sku vendor. */
  readonly vendor?: string;
  /** Available Network Virtual Appliance versions. */
  readonly availableVersions?: Array<string>;
  /** The list of scale units available. */
  availableScaleUnits?: Array<NetworkVirtualApplianceSkuInstancesOutput>;
}

/** List of available Sku and instances. */
export interface NetworkVirtualApplianceSkuInstancesOutput {
  /** Scale Unit. */
  readonly scaleUnit?: string;
  /** Instance Count. */
  readonly instanceCount?: number;
}

/** NVA Inbound Security Rule resource. */
export interface InboundSecurityRuleOutput extends SubResourceOutput {
  /** The properties of the Inbound Security Rules. */
  properties?: InboundSecurityRulePropertiesOutput;
  /** Name of security rule collection. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** NVA inbound security rule type. */
  readonly type?: string;
}

/** Properties of the Inbound Security Rules resource. */
export interface InboundSecurityRulePropertiesOutput {
  /** List of allowed rules. */
  rules?: Array<InboundSecurityRulesOutput>;
  /** The provisioning state of the resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Properties of the Inbound Security Rules resource. */
export interface InboundSecurityRulesOutput {
  /** Protocol. This should be either TCP or UDP. */
  protocol?: "TCP" | "UDP";
  /** The CIDR or source IP range. Only /30, /31 and /32 Ip ranges are allowed. */
  sourceAddressPrefix?: string;
  /** NVA port ranges to be opened up. One needs to provide specific ports. */
  destinationPortRange?: number;
}

/** Network watcher in a resource group. */
export interface NetworkWatcherOutput extends ResourceOutput {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Properties of the network watcher. */
  properties?: NetworkWatcherPropertiesFormatOutput;
}

/** The network watcher properties. */
export interface NetworkWatcherPropertiesFormatOutput {
  /** The provisioning state of the network watcher resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** The error object. */
export interface ErrorResponseOutput {
  /** The error details object. */
  error?: ErrorDetailsOutput;
}

/** Response for ListNetworkWatchers API service call. */
export interface NetworkWatcherListResultOutput {
  /** List of network watcher resources. */
  value?: Array<NetworkWatcherOutput>;
}

/** Topology of the specified resource group. */
export interface TopologyOutput {
  /** GUID representing the operation id. */
  readonly id?: string;
  /** The datetime when the topology was initially created for the resource group. */
  readonly createdDateTime?: string;
  /** The datetime when the topology was last modified. */
  readonly lastModified?: string;
  /** A list of topology resources. */
  resources?: Array<TopologyResourceOutput>;
}

/** The network resource topology information for the given resource group. */
export interface TopologyResourceOutput {
  /** Name of the resource. */
  name?: string;
  /** ID of the resource. */
  id?: string;
  /** Resource location. */
  location?: string;
  /** Holds the associations the resource has with other resources in the resource group. */
  associations?: Array<TopologyAssociationOutput>;
}

/** Resources that have an association with the parent resource. */
export interface TopologyAssociationOutput {
  /** The name of the resource that is associated with the parent resource. */
  name?: string;
  /** The ID of the resource that is associated with the parent resource. */
  resourceId?: string;
  /** The association type of the child resource to the parent resource. */
  associationType?: "Associated" | "Contains";
}

/** Results of IP flow verification on the target resource. */
export interface VerificationIPFlowResultOutput {
  /** Indicates whether the traffic is allowed or denied. */
  access?: "Allow" | "Deny";
  /** Name of the rule. If input is not matched against any security rule, it is not displayed. */
  ruleName?: string;
}

/** The information about next hop from the specified VM. */
export interface NextHopResultOutput {
  /** Next hop type. */
  nextHopType?:
    | "Internet"
    | "VirtualAppliance"
    | "VirtualNetworkGateway"
    | "VnetLocal"
    | "HyperNetGateway"
    | "None";
  /** Next hop IP Address. */
  nextHopIpAddress?: string;
  /** The resource identifier for the route table associated with the route being returned. If the route being returned does not correspond to any user created routes then this field will be the string 'System Route'. */
  routeTableId?: string;
}

/** The information about security rules applied to the specified VM. */
export interface SecurityGroupViewResultOutput {
  /** List of network interfaces on the specified VM. */
  networkInterfaces?: Array<SecurityGroupNetworkInterfaceOutput>;
}

/** Network interface and all its associated security rules. */
export interface SecurityGroupNetworkInterfaceOutput {
  /** ID of the network interface. */
  id?: string;
  /** All security rules associated with the network interface. */
  securityRuleAssociations?: SecurityRuleAssociationsOutput;
}

/** All security rules associated with the network interface. */
export interface SecurityRuleAssociationsOutput {
  /** Network interface and it's custom security rules. */
  networkInterfaceAssociation?: NetworkInterfaceAssociationOutput;
  /** Subnet and it's custom security rules. */
  subnetAssociation?: SubnetAssociationOutput;
  /** Collection of default security rules of the network security group. */
  defaultSecurityRules?: Array<SecurityRuleOutput>;
  /** Collection of effective security rules. */
  effectiveSecurityRules?: Array<EffectiveNetworkSecurityRuleOutput>;
}

/** Network interface and its custom security rules. */
export interface NetworkInterfaceAssociationOutput {
  /** Network interface ID. */
  readonly id?: string;
  /** Collection of custom security rules. */
  securityRules?: Array<SecurityRuleOutput>;
}

/** Subnet and it's custom security rules. */
export interface SubnetAssociationOutput {
  /** Subnet ID. */
  readonly id?: string;
  /** Collection of custom security rules. */
  securityRules?: Array<SecurityRuleOutput>;
}

/** Parameters that define the create packet capture operation. */
export interface PacketCaptureParametersOutput {
  /** The ID of the targeted resource, only AzureVM and AzureVMSS as target type are currently supported. */
  target: string;
  /** A list of AzureVMSS instances which can be included or excluded to run packet capture. If both included and excluded are empty, then the packet capture will run on all instances of AzureVMSS. */
  scope?: PacketCaptureMachineScopeOutput;
  /** Target type of the resource provided. */
  targetType?: "AzureVM" | "AzureVMSS";
  /** Number of bytes captured per packet, the remaining bytes are truncated. */
  bytesToCapturePerPacket?: number;
  /** Maximum size of the capture output. */
  totalBytesPerSession?: number;
  /** Maximum duration of the capture session in seconds. */
  timeLimitInSeconds?: number;
  /** The storage location for a packet capture session. */
  storageLocation: PacketCaptureStorageLocationOutput;
  /** A list of packet capture filters. */
  filters?: Array<PacketCaptureFilterOutput>;
}

/** A list of AzureVMSS instances which can be included or excluded to run packet capture. If both included and excluded are empty, then the packet capture will run on all instances of AzureVMSS. */
export interface PacketCaptureMachineScopeOutput {
  /** List of AzureVMSS instances to run packet capture on. */
  include?: Array<string>;
  /** List of AzureVMSS instances which has to be excluded from the AzureVMSS from running packet capture. */
  exclude?: Array<string>;
}

/** The storage location for a packet capture session. */
export interface PacketCaptureStorageLocationOutput {
  /** The ID of the storage account to save the packet capture session. Required if no local file path is provided. */
  storageId?: string;
  /** The URI of the storage path to save the packet capture. Must be a well-formed URI describing the location to save the packet capture. */
  storagePath?: string;
  /** A valid local path on the targeting VM. Must include the name of the capture file (*.cap). For linux virtual machine it must start with /var/captures. Required if no storage ID is provided, otherwise optional. */
  filePath?: string;
}

/** Filter that is applied to packet capture request. Multiple filters can be applied. */
export interface PacketCaptureFilterOutput {
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

/** Information about packet capture session. */
export interface PacketCaptureResultOutput {
  /** Name of the packet capture session. */
  readonly name?: string;
  /** ID of the packet capture operation. */
  readonly id?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Properties of the packet capture result. */
  properties?: PacketCaptureResultPropertiesOutput;
}

/** The properties of a packet capture session. */
export interface PacketCaptureResultPropertiesOutput extends PacketCaptureParametersOutput {
  /** The provisioning state of the packet capture session. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Status of packet capture session. */
export interface PacketCaptureQueryStatusResultOutput {
  /** The name of the packet capture resource. */
  name?: string;
  /** The ID of the packet capture resource. */
  id?: string;
  /** The start time of the packet capture session. */
  captureStartTime?: string;
  /** The status of the packet capture session. */
  packetCaptureStatus?: "NotStarted" | "Running" | "Stopped" | "Error" | "Unknown";
  /** The reason the current packet capture session was stopped. */
  stopReason?: string;
  /** List of errors of packet capture session. */
  packetCaptureError?: Array<
    "InternalError" | "AgentStopped" | "CaptureFailed" | "LocalFileFailed" | "StorageFailed"
  >;
}

/** List of packet capture sessions. */
export interface PacketCaptureListResultOutput {
  /** Information about packet capture sessions. */
  value?: Array<PacketCaptureResultOutput>;
}

/** Troubleshooting information gained from specified resource. */
export interface TroubleshootingResultOutput {
  /** The start time of the troubleshooting. */
  startTime?: string;
  /** The end time of the troubleshooting. */
  endTime?: string;
  /** The result code of the troubleshooting. */
  code?: string;
  /** Information from troubleshooting. */
  results?: Array<TroubleshootingDetailsOutput>;
}

/** Information gained from troubleshooting of specified resource. */
export interface TroubleshootingDetailsOutput {
  /** The id of the get troubleshoot operation. */
  id?: string;
  /** Reason type of failure. */
  reasonType?: string;
  /** A summary of troubleshooting. */
  summary?: string;
  /** Details on troubleshooting results. */
  detail?: string;
  /** List of recommended actions. */
  recommendedActions?: Array<TroubleshootingRecommendedActionsOutput>;
}

/** Recommended actions based on discovered issues. */
export interface TroubleshootingRecommendedActionsOutput {
  /** ID of the recommended action. */
  actionId?: string;
  /** Description of recommended actions. */
  actionText?: string;
  /** The uri linking to a documentation for the recommended troubleshooting actions. */
  actionUri?: string;
  /** The information from the URI for the recommended troubleshooting actions. */
  actionUriText?: string;
}

/** Information on the configuration of flow log and traffic analytics (optional) . */
export interface FlowLogInformationOutput {
  /** The ID of the resource to configure for flow log and traffic analytics (optional) . */
  targetResourceId: string;
  /** Properties of the flow log. */
  properties: FlowLogPropertiesOutput;
  /** Parameters that define the configuration of traffic analytics. */
  flowAnalyticsConfiguration?: TrafficAnalyticsPropertiesOutput;
}

/** Parameters that define the configuration of flow log. */
export interface FlowLogPropertiesOutput {
  /** ID of the storage account which is used to store the flow log. */
  storageId: string;
  /** Flag to enable/disable flow logging. */
  enabled: boolean;
  /** Parameters that define the retention policy for flow log. */
  retentionPolicy?: RetentionPolicyParametersOutput;
  /** Parameters that define the flow log format. */
  format?: FlowLogFormatParametersOutput;
}

/** The HTTP header. */
export interface HttpHeaderOutput {
  /** The name in HTTP header. */
  name?: string;
  /** The value in HTTP header. */
  value?: string;
}

/** Information on the connectivity status. */
export interface ConnectivityInformationOutput {
  /** List of hops between the source and the destination. */
  readonly hops?: Array<ConnectivityHopOutput>;
  /** The connection status. */
  readonly connectionStatus?: "Unknown" | "Connected" | "Disconnected" | "Degraded";
  /** Average latency in milliseconds. */
  readonly avgLatencyInMs?: number;
  /** Minimum latency in milliseconds. */
  readonly minLatencyInMs?: number;
  /** Maximum latency in milliseconds. */
  readonly maxLatencyInMs?: number;
  /** Total number of probes sent. */
  readonly probesSent?: number;
  /** Number of failed probes. */
  readonly probesFailed?: number;
}

/** Information about a hop between the source and the destination. */
export interface ConnectivityHopOutput {
  /** The type of the hop. */
  readonly type?: string;
  /** The ID of the hop. */
  readonly id?: string;
  /** The IP address of the hop. */
  readonly address?: string;
  /** The ID of the resource corresponding to this hop. */
  readonly resourceId?: string;
  /** List of next hop identifiers. */
  readonly nextHopIds?: Array<string>;
  /** List of previous hop identifiers. */
  readonly previousHopIds?: Array<string>;
  /** List of hop links. */
  readonly links?: Array<HopLinkOutput>;
  /** List of previous hop links. */
  readonly previousLinks?: Array<HopLinkOutput>;
  /** List of issues. */
  readonly issues?: Array<ConnectivityIssueOutput>;
}

/** Hop link. */
export interface HopLinkOutput {
  /** The ID of the next hop. */
  readonly nextHopId?: string;
  /** Link type. */
  readonly linkType?: string;
  /** Hop link properties. */
  properties?: HopLinkPropertiesOutput;
  /** List of issues. */
  readonly issues?: Array<ConnectivityIssueOutput>;
  /** Provides additional context on links. */
  readonly context?: Record<string, string>;
  /** Resource ID. */
  readonly resourceId?: string;
}

/** Hop link properties. */
export interface HopLinkPropertiesOutput {
  /** Minimum roundtrip time in milliseconds. */
  readonly roundTripTimeMin?: number;
  /** Average roundtrip time in milliseconds. */
  readonly roundTripTimeAvg?: number;
  /** Maximum roundtrip time in milliseconds. */
  readonly roundTripTimeMax?: number;
}

/** Information about an issue encountered in the process of checking for connectivity. */
export interface ConnectivityIssueOutput {
  /** The origin of the issue. */
  readonly origin?: "Local" | "Inbound" | "Outbound";
  /** The severity of the issue. */
  readonly severity?: "Error" | "Warning";
  /** The type of issue. */
  readonly type?:
    | "Unknown"
    | "AgentStopped"
    | "GuestFirewall"
    | "DnsResolution"
    | "SocketBind"
    | "NetworkSecurityRule"
    | "UserDefinedRoute"
    | "PortThrottled"
    | "Platform";
  /** Provides additional context on the issue. */
  readonly context?: Array<Record<string, string>>;
}

/** Parameters that define a geographic location. */
export interface AzureReachabilityReportLocationOutput {
  /** The name of the country. */
  country: string;
  /** The name of the state. */
  state?: string;
  /** The name of the city or town. */
  city?: string;
}

/** Azure reachability report details. */
export interface AzureReachabilityReportOutput {
  /** The aggregation level of Azure reachability report. Can be Country, State or City. */
  aggregationLevel: string;
  /** Parameters that define a geographic location. */
  providerLocation: AzureReachabilityReportLocationOutput;
  /** List of Azure reachability report items. */
  reachabilityReport: Array<AzureReachabilityReportItemOutput>;
}

/** Azure reachability report details for a given provider location. */
export interface AzureReachabilityReportItemOutput {
  /** The Internet service provider. */
  provider?: string;
  /** The Azure region. */
  azureLocation?: string;
  /** List of latency details for each of the time series. */
  latencies?: Array<AzureReachabilityReportLatencyInfoOutput>;
}

/** Details on latency for a time series. */
export interface AzureReachabilityReportLatencyInfoOutput {
  /** The time stamp. */
  timeStamp?: string;
  /** The relative latency score between 1 and 100, higher values indicating a faster connection. */
  score?: number;
}

/** List of available countries with details. */
export interface AvailableProvidersListOutput {
  /** List of available countries. */
  countries: Array<AvailableProvidersListCountryOutput>;
}

/** Country details. */
export interface AvailableProvidersListCountryOutput {
  /** The country name. */
  countryName?: string;
  /** A list of Internet service providers. */
  providers?: Array<string>;
  /** List of available states in the country. */
  states?: Array<AvailableProvidersListStateOutput>;
}

/** State details. */
export interface AvailableProvidersListStateOutput {
  /** The state name. */
  stateName?: string;
  /** A list of Internet service providers. */
  providers?: Array<string>;
  /** List of available cities or towns in the state. */
  cities?: Array<AvailableProvidersListCityOutput>;
}

/** City or town details. */
export interface AvailableProvidersListCityOutput {
  /** The city or town name. */
  cityName?: string;
  /** A list of Internet service providers. */
  providers?: Array<string>;
}

/** Parameters to compare with network configuration. */
export interface NetworkConfigurationDiagnosticProfileOutput {
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

/** Results of network configuration diagnostic on the target resource. */
export interface NetworkConfigurationDiagnosticResponseOutput {
  /** List of network configuration diagnostic results. */
  readonly results?: Array<NetworkConfigurationDiagnosticResultOutput>;
}

/** Network configuration diagnostic result corresponded to provided traffic query. */
export interface NetworkConfigurationDiagnosticResultOutput {
  /** Network configuration diagnostic profile. */
  profile?: NetworkConfigurationDiagnosticProfileOutput;
  /** Network security group result. */
  networkSecurityGroupResult?: NetworkSecurityGroupResultOutput;
}

/** Network configuration diagnostic result corresponded provided traffic query. */
export interface NetworkSecurityGroupResultOutput {
  /** The network traffic is allowed or denied. */
  securityRuleAccessResult?: "Allow" | "Deny";
  /** List of results network security groups diagnostic. */
  readonly evaluatedNetworkSecurityGroups?: Array<EvaluatedNetworkSecurityGroupOutput>;
}

/** Results of network security group evaluation. */
export interface EvaluatedNetworkSecurityGroupOutput {
  /** Network security group ID. */
  networkSecurityGroupId?: string;
  /** Resource ID of nic or subnet to which network security group is applied. */
  appliedTo?: string;
  /** Matched network security rule. */
  matchedRule?: MatchedRuleOutput;
  /** List of network security rules evaluation results. */
  readonly rulesEvaluationResult?: Array<NetworkSecurityRulesEvaluationResultOutput>;
}

/** Matched rule. */
export interface MatchedRuleOutput {
  /** Name of the matched network security rule. */
  ruleName?: string;
  /** The network traffic is allowed or denied. Possible values are 'Allow' and 'Deny'. */
  action?: string;
}

/** Network security rules evaluation result. */
export interface NetworkSecurityRulesEvaluationResultOutput {
  /** Name of the network security rule. */
  name?: string;
  /** Value indicating whether protocol is matched. */
  protocolMatched?: boolean;
  /** Value indicating whether source is matched. */
  sourceMatched?: boolean;
  /** Value indicating whether source port is matched. */
  sourcePortMatched?: boolean;
  /** Value indicating whether destination is matched. */
  destinationMatched?: boolean;
  /** Value indicating whether destination port is matched. */
  destinationPortMatched?: boolean;
}

/** Parameters that define the operation to create a connection monitor. */
export interface ConnectionMonitorParametersOutput {
  /** Describes the source of connection monitor. */
  source?: ConnectionMonitorSourceOutput;
  /** Describes the destination of connection monitor. */
  destination?: ConnectionMonitorDestinationOutput;
  /** Determines if the connection monitor will start automatically once created. */
  autoStart?: boolean;
  /** Monitoring interval in seconds. */
  monitoringIntervalInSeconds?: number;
  /** List of connection monitor endpoints. */
  endpoints?: Array<ConnectionMonitorEndpointOutput>;
  /** List of connection monitor test configurations. */
  testConfigurations?: Array<ConnectionMonitorTestConfigurationOutput>;
  /** List of connection monitor test groups. */
  testGroups?: Array<ConnectionMonitorTestGroupOutput>;
  /** List of connection monitor outputs. */
  outputs?: Array<ConnectionMonitorOutputOutput>;
  /** Optional notes to be associated with the connection monitor. */
  notes?: string;
}

/** Describes the source of connection monitor. */
export interface ConnectionMonitorSourceOutput {
  /** The ID of the resource used as the source by connection monitor. */
  resourceId: string;
  /** The source port used by connection monitor. */
  port?: number;
}

/** Describes the destination of connection monitor. */
export interface ConnectionMonitorDestinationOutput {
  /** The ID of the resource used as the destination by connection monitor. */
  resourceId?: string;
  /** Address of the connection monitor destination (IP or domain name). */
  address?: string;
  /** The destination port used by connection monitor. */
  port?: number;
}

/** Describes the connection monitor endpoint. */
export interface ConnectionMonitorEndpointOutput {
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
  filter?: ConnectionMonitorEndpointFilterOutput;
  /** Endpoint scope. */
  scope?: ConnectionMonitorEndpointScopeOutput;
  /** Test coverage for the endpoint. */
  coverageLevel?: "Default" | "Low" | "BelowAverage" | "Average" | "AboveAverage" | "Full";
}

/** Describes the connection monitor endpoint filter. */
export interface ConnectionMonitorEndpointFilterOutput {
  /** The behavior of the endpoint filter. Currently only 'Include' is supported. */
  type?: "Include";
  /** List of items in the filter. */
  items?: Array<ConnectionMonitorEndpointFilterItemOutput>;
}

/** Describes the connection monitor endpoint filter item. */
export interface ConnectionMonitorEndpointFilterItemOutput {
  /** The type of item included in the filter. Currently only 'AgentAddress' is supported. */
  type?: "AgentAddress";
  /** The address of the filter item. */
  address?: string;
}

/** Describes the connection monitor endpoint scope. */
export interface ConnectionMonitorEndpointScopeOutput {
  /** List of items which needs to be included to the endpoint scope. */
  include?: Array<ConnectionMonitorEndpointScopeItemOutput>;
  /** List of items which needs to be excluded from the endpoint scope. */
  exclude?: Array<ConnectionMonitorEndpointScopeItemOutput>;
}

/** Describes the connection monitor endpoint scope item. */
export interface ConnectionMonitorEndpointScopeItemOutput {
  /** The address of the endpoint item. Supported types are IPv4/IPv6 subnet mask or IPv4/IPv6 IP address. */
  address?: string;
}

/** Describes a connection monitor test configuration. */
export interface ConnectionMonitorTestConfigurationOutput {
  /** The name of the connection monitor test configuration. */
  name: string;
  /** The frequency of test evaluation, in seconds. */
  testFrequencySec?: number;
  /** The protocol to use in test evaluation. */
  protocol: "Tcp" | "Http" | "Icmp";
  /** The preferred IP version to use in test evaluation. The connection monitor may choose to use a different version depending on other parameters. */
  preferredIPVersion?: "IPv4" | "IPv6";
  /** The parameters used to perform test evaluation over HTTP. */
  httpConfiguration?: ConnectionMonitorHttpConfigurationOutput;
  /** The parameters used to perform test evaluation over TCP. */
  tcpConfiguration?: ConnectionMonitorTcpConfigurationOutput;
  /** The parameters used to perform test evaluation over ICMP. */
  icmpConfiguration?: ConnectionMonitorIcmpConfigurationOutput;
  /** The threshold for declaring a test successful. */
  successThreshold?: ConnectionMonitorSuccessThresholdOutput;
}

/** Describes the HTTP configuration. */
export interface ConnectionMonitorHttpConfigurationOutput {
  /** The port to connect to. */
  port?: number;
  /** The HTTP method to use. */
  method?: "Get" | "Post";
  /** The path component of the URI. For instance, "/dir1/dir2". */
  path?: string;
  /** The HTTP headers to transmit with the request. */
  requestHeaders?: Array<HttpHeaderOutput>;
  /** HTTP status codes to consider successful. For instance, "2xx,301-304,418". */
  validStatusCodeRanges?: Array<string>;
  /** Value indicating whether HTTPS is preferred over HTTP in cases where the choice is not explicit. */
  preferHTTPS?: boolean;
}

/** Describes the TCP configuration. */
export interface ConnectionMonitorTcpConfigurationOutput {
  /** The port to connect to. */
  port?: number;
  /** Value indicating whether path evaluation with trace route should be disabled. */
  disableTraceRoute?: boolean;
  /** Destination port behavior. */
  destinationPortBehavior?: "None" | "ListenIfAvailable";
}

/** Describes the ICMP configuration. */
export interface ConnectionMonitorIcmpConfigurationOutput {
  /** Value indicating whether path evaluation with trace route should be disabled. */
  disableTraceRoute?: boolean;
}

/** Describes the threshold for declaring a test successful. */
export interface ConnectionMonitorSuccessThresholdOutput {
  /** The maximum percentage of failed checks permitted for a test to evaluate as successful. */
  checksFailedPercent?: number;
  /** The maximum round-trip time in milliseconds permitted for a test to evaluate as successful. */
  roundTripTimeMs?: number;
}

/** Describes the connection monitor test group. */
export interface ConnectionMonitorTestGroupOutput {
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
export interface ConnectionMonitorOutputOutput {
  /** Connection monitor output destination type. Currently, only "Workspace" is supported. */
  type?: "Workspace";
  /** Describes the settings for producing output into a log analytics workspace. */
  workspaceSettings?: ConnectionMonitorWorkspaceSettingsOutput;
}

/** Describes the settings for producing output into a log analytics workspace. */
export interface ConnectionMonitorWorkspaceSettingsOutput {
  /** Log analytics workspace resource ID. */
  workspaceResourceId?: string;
}

/** Information about the connection monitor. */
export interface ConnectionMonitorResultOutput {
  /** Name of the connection monitor. */
  readonly name?: string;
  /** ID of the connection monitor. */
  readonly id?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Connection monitor type. */
  readonly type?: string;
  /** Connection monitor location. */
  location?: string;
  /** Connection monitor tags. */
  tags?: Record<string, string>;
  /** Properties of the connection monitor result. */
  properties?: ConnectionMonitorResultPropertiesOutput;
}

/** Describes the properties of a connection monitor. */
export interface ConnectionMonitorResultPropertiesOutput extends ConnectionMonitorParametersOutput {
  /** The provisioning state of the connection monitor. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The date and time when the connection monitor was started. */
  readonly startTime?: string;
  /** The monitoring status of the connection monitor. */
  readonly monitoringStatus?: string;
  /** Type of connection monitor. */
  readonly connectionMonitorType?: "MultiEndpoint" | "SingleSourceDestination";
}

/** List of connection states snapshots. */
export interface ConnectionMonitorQueryResultOutput {
  /** Status of connection monitor source. */
  sourceStatus?: "Unknown" | "Active" | "Inactive";
  /** Information about connection states. */
  states?: Array<ConnectionStateSnapshotOutput>;
}

/** Connection state snapshot. */
export interface ConnectionStateSnapshotOutput {
  /** The connection state. */
  connectionState?: "Reachable" | "Unreachable" | "Unknown";
  /** The start time of the connection snapshot. */
  startTime?: string;
  /** The end time of the connection snapshot. */
  endTime?: string;
  /** Connectivity analysis evaluation state. */
  evaluationState?: "NotStarted" | "InProgress" | "Completed";
  /** Average latency in ms. */
  avgLatencyInMs?: number;
  /** Minimum latency in ms. */
  minLatencyInMs?: number;
  /** Maximum latency in ms. */
  maxLatencyInMs?: number;
  /** The number of sent probes. */
  probesSent?: number;
  /** The number of failed probes. */
  probesFailed?: number;
  /** List of hops between the source and the destination. */
  readonly hops?: Array<ConnectivityHopOutput>;
}

/** List of connection monitors. */
export interface ConnectionMonitorListResultOutput {
  /** Information about connection monitors. */
  value?: Array<ConnectionMonitorResultOutput>;
}

/** List of flow logs. */
export interface FlowLogListResultOutput {
  /** Information about flow log resource. */
  value?: Array<FlowLogOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Result of the request to list Network operations. It contains a list of operations and a URL link to get the next set of results. */
export interface OperationListResultOutput {
  /** List of Network operations supported by the Network resource provider. */
  value?: Array<OperationOutput>;
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** Network REST API operation definition. */
export interface OperationOutput {
  /** Operation name: {provider}/{resource}/{operation}. */
  name?: string;
  /** Display metadata associated with the operation. */
  display?: OperationDisplayOutput;
  /** Origin of the operation. */
  origin?: string;
  /** Operation properties format. */
  properties?: OperationPropertiesFormatOutput;
}

/** Display metadata associated with the operation. */
export interface OperationDisplayOutput {
  /** Service provider: Microsoft Network. */
  provider?: string;
  /** Resource on which the operation is performed. */
  resource?: string;
  /** Type of the operation: get, read, delete, etc. */
  operation?: string;
  /** Description of the operation. */
  description?: string;
}

/** Description of operation properties format. */
export interface OperationPropertiesFormatOutput {
  /** Specification of the service. */
  serviceSpecification?: OperationPropertiesFormatServiceSpecificationOutput;
}

/** Specification of the service. */
export interface OperationPropertiesFormatServiceSpecificationOutput {
  /** Operation service specification. */
  metricSpecifications?: Array<MetricSpecificationOutput>;
  /** Operation log specification. */
  logSpecifications?: Array<LogSpecificationOutput>;
}

/** Description of metrics specification. */
export interface MetricSpecificationOutput {
  /** The name of the metric. */
  name?: string;
  /** The display name of the metric. */
  displayName?: string;
  /** The description of the metric. */
  displayDescription?: string;
  /** Units the metric to be displayed in. */
  unit?: string;
  /** The aggregation type. */
  aggregationType?: string;
  /** List of availability. */
  availabilities?: Array<AvailabilityOutput>;
  /** Whether regional MDM account enabled. */
  enableRegionalMdmAccount?: boolean;
  /** Whether gaps would be filled with zeros. */
  fillGapWithZero?: boolean;
  /** Pattern for the filter of the metric. */
  metricFilterPattern?: string;
  /** List of dimensions. */
  dimensions?: Array<DimensionOutput>;
  /** Whether the metric is internal. */
  isInternal?: boolean;
  /** The source MDM account. */
  sourceMdmAccount?: string;
  /** The source MDM namespace. */
  sourceMdmNamespace?: string;
  /** The resource Id dimension name override. */
  resourceIdDimensionNameOverride?: string;
}

/** Availability of the metric. */
export interface AvailabilityOutput {
  /** The time grain of the availability. */
  timeGrain?: string;
  /** The retention of the availability. */
  retention?: string;
  /** Duration of the availability blob. */
  blobDuration?: string;
}

/** Dimension of the metric. */
export interface DimensionOutput {
  /** The name of the dimension. */
  name?: string;
  /** The display name of the dimension. */
  displayName?: string;
  /** The internal name of the dimension. */
  internalName?: string;
}

/** Description of logging specification. */
export interface LogSpecificationOutput {
  /** The name of the specification. */
  name?: string;
  /** The display name of the specification. */
  displayName?: string;
  /** Duration of the blob. */
  blobDuration?: string;
}

/** Response for the ListPrivateEndpoints API service call. */
export interface PrivateEndpointListResultOutput {
  /** A list of private endpoint resources in a resource group. */
  value?: Array<PrivateEndpointOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** An array of available PrivateEndpoint types. */
export interface AvailablePrivateEndpointTypesResultOutput {
  /** An array of available privateEndpoint type. */
  value?: Array<AvailablePrivateEndpointTypeOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** The information of an AvailablePrivateEndpointType. */
export interface AvailablePrivateEndpointTypeOutput {
  /** The name of the service and resource. */
  name?: string;
  /** A unique identifier of the AvailablePrivateEndpoint Type resource. */
  id?: string;
  /** Resource type. */
  type?: string;
  /** The name of the service and resource. */
  resourceName?: string;
  /** Display name of the resource. */
  displayName?: string;
}

/** Private dns zone group resource. */
export interface PrivateDnsZoneGroupOutput extends SubResourceOutput {
  /** Name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Properties of the private dns zone group. */
  properties?: PrivateDnsZoneGroupPropertiesFormatOutput;
}

/** Properties of the private dns zone group. */
export interface PrivateDnsZoneGroupPropertiesFormatOutput {
  /** The provisioning state of the private dns zone group resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** A collection of private dns zone configurations of the private dns zone group. */
  privateDnsZoneConfigs?: Array<PrivateDnsZoneConfigOutput>;
}

/** PrivateDnsZoneConfig resource. */
export interface PrivateDnsZoneConfigOutput {
  /** Name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** Properties of the private dns zone configuration. */
  properties?: PrivateDnsZonePropertiesFormatOutput;
}

/** Properties of the private dns zone configuration resource. */
export interface PrivateDnsZonePropertiesFormatOutput {
  /** The resource id of the private dns zone. */
  privateDnsZoneId?: string;
  /** A collection of information regarding a recordSet, holding information to identify private resources. */
  readonly recordSets?: Array<RecordSetOutput>;
}

/** A collective group of information about the record set information. */
export interface RecordSetOutput {
  /** Resource record type. */
  recordType?: string;
  /** Recordset name. */
  recordSetName?: string;
  /** Fqdn that resolves to private endpoint ip address. */
  fqdn?: string;
  /** The provisioning state of the recordset. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Recordset time to live. */
  ttl?: number;
  /** The private ip address of the private endpoint. */
  ipAddresses?: Array<string>;
}

/** Response for the ListPrivateDnsZoneGroups API service call. */
export interface PrivateDnsZoneGroupListResultOutput {
  /** A list of private dns zone group resources in a private endpoint. */
  value?: Array<PrivateDnsZoneGroupOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Response for the ListPrivateLinkService API service call. */
export interface PrivateLinkServiceListResultOutput {
  /** A list of PrivateLinkService resources in a resource group. */
  value?: Array<PrivateLinkServiceOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Response for the ListPrivateEndpointConnection API service call. */
export interface PrivateEndpointConnectionListResultOutput {
  /** A list of PrivateEndpointConnection resources for a specific private link service. */
  value?: Array<PrivateEndpointConnectionOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Response for the CheckPrivateLinkServiceVisibility API service call. */
export interface PrivateLinkServiceVisibilityOutput {
  /** Private Link Service Visibility (True/False). */
  visible?: boolean;
}

/** An array of private link service id that can be linked to a private end point with auto approved. */
export interface AutoApprovedPrivateLinkServicesResultOutput {
  /** An array of auto approved private link service. */
  value?: Array<AutoApprovedPrivateLinkServiceOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** The information of an AutoApprovedPrivateLinkService. */
export interface AutoApprovedPrivateLinkServiceOutput {
  /** The id of the private link service resource. */
  privateLinkService?: string;
}

/** Response for GetPublicIpAddressDdosProtectionStatusOperation API service call. */
export interface PublicIpDdosProtectionStatusResultOutput {
  /** Public IP ARM resource ID */
  publicIpAddressId?: string;
  /** IP Address of the Public IP Resource */
  publicIpAddress?: string;
  /** Value indicating whether the IP address is DDoS workload protected or not. */
  isWorkloadProtected?: "False" | "True";
  /**  DDoS protection plan Resource Id of a if IP address is protected through a plan. */
  ddosProtectionPlanId?: string;
}

/** Public IP prefix resource. */
export interface PublicIPPrefixOutput extends ResourceOutput {
  /** The extended location of the public ip address. */
  extendedLocation?: ExtendedLocationOutput;
  /** The public IP prefix SKU. */
  sku?: PublicIPPrefixSkuOutput;
  /** Public IP prefix properties. */
  properties?: PublicIPPrefixPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** A list of availability zones denoting the IP allocated for the resource needs to come from. */
  zones?: Array<string>;
}

/** SKU of a public IP prefix. */
export interface PublicIPPrefixSkuOutput {
  /** Name of a public IP prefix SKU. */
  name?: "Standard";
  /** Tier of a public IP prefix SKU. */
  tier?: "Regional" | "Global";
}

/** Public IP prefix properties. */
export interface PublicIPPrefixPropertiesFormatOutput {
  /** The public IP address version. */
  publicIPAddressVersion?: "IPv4" | "IPv6";
  /** The list of tags associated with the public IP prefix. */
  ipTags?: Array<IpTagOutput>;
  /** The Length of the Public IP Prefix. */
  prefixLength?: number;
  /** The allocated Prefix. */
  readonly ipPrefix?: string;
  /** The list of all referenced PublicIPAddresses. */
  readonly publicIPAddresses?: Array<ReferencedPublicIpAddressOutput>;
  /** The reference to load balancer frontend IP configuration associated with the public IP prefix. */
  readonly loadBalancerFrontendIpConfiguration?: SubResourceOutput;
  /** The customIpPrefix that this prefix is associated with. */
  customIPPrefix?: SubResourceOutput;
  /** The resource GUID property of the public IP prefix resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the public IP prefix resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** NatGateway of Public IP Prefix. */
  natGateway?: NatGatewayOutput;
}

/** Reference to a public IP address. */
export interface ReferencedPublicIpAddressOutput {
  /** The PublicIPAddress Reference. */
  id?: string;
}

/** Response for ListPublicIpPrefixes API service call. */
export interface PublicIPPrefixListResultOutput {
  /** A list of public IP prefixes that exists in a resource group. */
  value?: Array<PublicIPPrefixOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Route Filter Resource. */
export interface RouteFilterOutput extends ResourceOutput {
  /** Properties of the route filter. */
  properties?: RouteFilterPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Route Filter Resource. */
export interface RouteFilterPropertiesFormatOutput {
  /** Collection of RouteFilterRules contained within a route filter. */
  rules?: Array<RouteFilterRuleOutput>;
  /** A collection of references to express route circuit peerings. */
  readonly peerings?: Array<ExpressRouteCircuitPeeringOutput>;
  /** A collection of references to express route circuit ipv6 peerings. */
  readonly ipv6Peerings?: Array<ExpressRouteCircuitPeeringOutput>;
  /** The provisioning state of the route filter resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Route Filter Rule Resource. */
export interface RouteFilterRuleOutput extends SubResourceOutput {
  /** Properties of the route filter rule. */
  properties?: RouteFilterRulePropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** Resource location. */
  location?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Route Filter Rule Resource. */
export interface RouteFilterRulePropertiesFormatOutput {
  /** The access type of the rule. */
  access: "Allow" | "Deny";
  /** The rule type of the rule. */
  routeFilterRuleType: "Community";
  /** The collection for bgp community values to filter on. e.g. ['12076:5010','12076:5020']. */
  communities: Array<string>;
  /** The provisioning state of the route filter rule resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Response for the ListRouteFilters API service call. */
export interface RouteFilterListResultOutput {
  /** A list of route filters in a resource group. */
  value?: Array<RouteFilterOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Response for the ListRouteFilterRules API service call. */
export interface RouteFilterRuleListResultOutput {
  /** A list of RouteFilterRules in a resource group. */
  value?: Array<RouteFilterRuleOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Response for the ListRouteTable API service call. */
export interface RouteTableListResultOutput {
  /** A list of route tables in a resource group. */
  value?: Array<RouteTableOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Response for the ListRoute API service call. */
export interface RouteListResultOutput {
  /** A list of routes in a resource group. */
  value?: Array<RouteOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Security Partner Provider resource. */
export interface SecurityPartnerProviderOutput extends ResourceOutput {
  /** Properties of the Security Partner Provider. */
  properties?: SecurityPartnerProviderPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of the Security Partner Provider. */
export interface SecurityPartnerProviderPropertiesFormatOutput {
  /** The provisioning state of the Security Partner Provider resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The security provider name. */
  securityProviderName?: "ZScaler" | "IBoss" | "Checkpoint";
  /** The connection status with the Security Partner Provider. */
  readonly connectionStatus?: "Unknown" | "PartiallyConnected" | "Connected" | "NotConnected";
  /** The virtualHub to which the Security Partner Provider belongs. */
  virtualHub?: SubResourceOutput;
}

/** Response for ListSecurityPartnerProviders API service call. */
export interface SecurityPartnerProviderListResultOutput {
  /** List of Security Partner Providers in a resource group. */
  value?: Array<SecurityPartnerProviderOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** Response for the ListServiceCommunity API service call. */
export interface BgpServiceCommunityListResultOutput {
  /** A list of service community resources. */
  value?: Array<BgpServiceCommunityOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Service Community Properties. */
export interface BgpServiceCommunityOutput extends ResourceOutput {
  /** Properties of the BGP service community. */
  properties?: BgpServiceCommunityPropertiesFormatOutput;
}

/** Properties of Service Community. */
export interface BgpServiceCommunityPropertiesFormatOutput {
  /** The name of the bgp community. e.g. Skype. */
  serviceName?: string;
  /** A list of bgp communities. */
  bgpCommunities?: Array<BGPCommunityOutput>;
}

/** Contains bgp community information offered in Service Community resources. */
export interface BGPCommunityOutput {
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

/** Response for ListServiceEndpointPolicies API service call. */
export interface ServiceEndpointPolicyListResultOutput {
  /** A list of ServiceEndpointPolicy resources. */
  value?: Array<ServiceEndpointPolicyOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Response for ListServiceEndpointPolicyDefinition API service call. Retrieves all service endpoint policy definition that belongs to a service endpoint policy. */
export interface ServiceEndpointPolicyDefinitionListResultOutput {
  /** The service endpoint policy definition in a service endpoint policy. */
  value?: Array<ServiceEndpointPolicyDefinitionOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Response for the ListServiceTags API service call. */
export interface ServiceTagsListResultOutput {
  /** The name of the cloud. */
  readonly name?: string;
  /** The ID of the cloud. */
  readonly id?: string;
  /** The azure resource type. */
  readonly type?: string;
  /** The iteration number. */
  readonly changeNumber?: string;
  /** The name of the cloud. */
  readonly cloud?: string;
  /** The list of service tag information resources. */
  readonly values?: Array<ServiceTagInformationOutput>;
  /** The URL to get next page of service tag information resources. */
  readonly nextLink?: string;
}

/** The service tag information. */
export interface ServiceTagInformationOutput {
  /** Properties of the service tag information. */
  readonly properties?: ServiceTagInformationPropertiesFormatOutput;
  /** The name of service tag. */
  readonly name?: string;
  /** The ID of service tag. */
  readonly id?: string;
  /** The iteration number of service tag object for region. */
  readonly serviceTagChangeNumber?: string;
}

/** Properties of the service tag information. */
export interface ServiceTagInformationPropertiesFormatOutput {
  /** The iteration number of service tag. */
  readonly changeNumber?: string;
  /** The region of service tag. */
  readonly region?: string;
  /** The name of system service. */
  readonly systemService?: string;
  /** The list of IP address prefixes. */
  readonly addressPrefixes?: Array<string>;
  /** The state of the service tag. */
  readonly state?: string;
}

/** Response for Get ServiceTagInformation API service call. Retrieves the list of service tag information resources. */
export interface ServiceTagInformationListResultOutput {
  /** The list of service tag information resources. */
  value?: Array<ServiceTagInformationOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** The list usages operation response. */
export interface UsagesListResultOutput {
  /** The list network resource usages. */
  value?: Array<UsageOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** The network resource usage. */
export interface UsageOutput {
  /** Resource identifier. */
  readonly id?: string;
  /** An enum describing the unit of measurement. */
  unit: "Count";
  /** The current value of the usage. */
  currentValue: number;
  /** The limit of usage. */
  limit: number;
  /** The name of the type of usage. */
  name: UsageNameOutput;
}

/** The usage names. */
export interface UsageNameOutput {
  /** A string describing the resource name. */
  value?: string;
  /** A localized string describing the resource name. */
  localizedValue?: string;
}

/** Virtual Network resource. */
export interface VirtualNetworkOutput extends ResourceOutput {
  /** The extended location of the virtual network. */
  extendedLocation?: ExtendedLocationOutput;
  /** Properties of the virtual network. */
  properties?: VirtualNetworkPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of the virtual network. */
export interface VirtualNetworkPropertiesFormatOutput {
  /** The AddressSpace that contains an array of IP address ranges that can be used by subnets. */
  addressSpace?: AddressSpaceOutput;
  /** The dhcpOptions that contains an array of DNS servers available to VMs deployed in the virtual network. */
  dhcpOptions?: DhcpOptionsOutput;
  /** The FlowTimeout value (in minutes) for the Virtual Network */
  flowTimeoutInMinutes?: number;
  /** A list of subnets in a Virtual Network. */
  subnets?: Array<SubnetOutput>;
  /** A list of peerings in a Virtual Network. */
  virtualNetworkPeerings?: Array<VirtualNetworkPeeringOutput>;
  /** The resourceGuid property of the Virtual Network resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the virtual network resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Indicates if DDoS protection is enabled for all the protected resources in the virtual network. It requires a DDoS protection plan associated with the resource. */
  enableDdosProtection?: boolean;
  /** Indicates if VM protection is enabled for all the subnets in the virtual network. */
  enableVmProtection?: boolean;
  /** The DDoS protection plan associated with the virtual network. */
  ddosProtectionPlan?: SubResourceOutput;
  /** Bgp Communities sent over ExpressRoute with each route corresponding to a prefix in this VNET. */
  bgpCommunities?: VirtualNetworkBgpCommunitiesOutput;
  /** Indicates if encryption is enabled on virtual network and if VM without encryption is allowed in encrypted VNet. */
  encryption?: VirtualNetworkEncryptionOutput;
  /** Array of IpAllocation which reference this VNET. */
  ipAllocations?: Array<SubResourceOutput>;
}

/** AddressSpace contains an array of IP address ranges that can be used by subnets of the virtual network. */
export interface AddressSpaceOutput {
  /** A list of address blocks reserved for this virtual network in CIDR notation. */
  addressPrefixes?: Array<string>;
}

/** DhcpOptions contains an array of DNS servers available to VMs deployed in the virtual network. Standard DHCP option for a subnet overrides VNET DHCP options. */
export interface DhcpOptionsOutput {
  /** The list of DNS servers IP addresses. */
  dnsServers?: Array<string>;
}

/** Peerings in a virtual network resource. */
export interface VirtualNetworkPeeringOutput extends SubResourceOutput {
  /** Properties of the virtual network peering. */
  properties?: VirtualNetworkPeeringPropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Resource type. */
  type?: string;
}

/** Properties of the virtual network peering. */
export interface VirtualNetworkPeeringPropertiesFormatOutput {
  /** Whether the VMs in the local virtual network space would be able to access the VMs in remote virtual network space. */
  allowVirtualNetworkAccess?: boolean;
  /** Whether the forwarded traffic from the VMs in the local virtual network will be allowed/disallowed in remote virtual network. */
  allowForwardedTraffic?: boolean;
  /** If gateway links can be used in remote virtual networking to link to this virtual network. */
  allowGatewayTransit?: boolean;
  /** If remote gateways can be used on this virtual network. If the flag is set to true, and allowGatewayTransit on remote peering is also true, virtual network will use gateways of remote virtual network for transit. Only one peering can have this flag set to true. This flag cannot be set if virtual network already has a gateway. */
  useRemoteGateways?: boolean;
  /** The reference to the remote virtual network. The remote virtual network can be in the same or different region (preview). See here to register for the preview and learn more (https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-create-peering). */
  remoteVirtualNetwork?: SubResourceOutput;
  /** The reference to the address space peered with the remote virtual network. */
  remoteAddressSpace?: AddressSpaceOutput;
  /** The reference to the current address space of the remote virtual network. */
  remoteVirtualNetworkAddressSpace?: AddressSpaceOutput;
  /** The reference to the remote virtual network's Bgp Communities. */
  remoteBgpCommunities?: VirtualNetworkBgpCommunitiesOutput;
  /** The reference to the remote virtual network's encryption */
  readonly remoteVirtualNetworkEncryption?: VirtualNetworkEncryptionOutput;
  /** The status of the virtual network peering. */
  peeringState?: "Initiated" | "Connected" | "Disconnected";
  /** The peering sync status of the virtual network peering. */
  peeringSyncLevel?:
    | "FullyInSync"
    | "RemoteNotInSync"
    | "LocalNotInSync"
    | "LocalAndRemoteNotInSync";
  /** The provisioning state of the virtual network peering resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** If we need to verify the provisioning state of the remote gateway. */
  doNotVerifyRemoteGateways?: boolean;
  /** The resourceGuid property of the Virtual Network peering resource. */
  readonly resourceGuid?: string;
}

/** Bgp Communities sent over ExpressRoute with each route corresponding to a prefix in this VNET. */
export interface VirtualNetworkBgpCommunitiesOutput {
  /** The BGP community associated with the virtual network. */
  virtualNetworkCommunity: string;
  /** The BGP community associated with the region of the virtual network. */
  readonly regionalCommunity?: string;
}

/** Indicates if encryption is enabled on virtual network and if VM without encryption is allowed in encrypted VNet. */
export interface VirtualNetworkEncryptionOutput {
  /** Indicates if encryption is enabled on the virtual network. */
  enabled: boolean;
  /** If the encrypted VNet allows VM that does not support encryption */
  enforcement?: "DropUnencrypted" | "AllowUnencrypted";
}

/** Response for the ListVirtualNetworks API service call. */
export interface VirtualNetworkListResultOutput {
  /** A list of VirtualNetwork resources in a resource group. */
  value?: Array<VirtualNetworkOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Network Intent Policy resource. */
export interface NetworkIntentPolicyOutput extends ResourceOutput {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Response for ResourceNavigationLinks_List operation. */
export interface ResourceNavigationLinksListResultOutput {
  /** The resource navigation links in a subnet. */
  value?: Array<ResourceNavigationLinkOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Response for ServiceAssociationLinks_List operation. */
export interface ServiceAssociationLinksListResultOutput {
  /** The service association links in a subnet. */
  value?: Array<ServiceAssociationLinkOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Response for ListSubnets API service callRetrieves all subnet that belongs to a virtual network. */
export interface SubnetListResultOutput {
  /** The subnets in a virtual network. */
  value?: Array<SubnetOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Response for ListSubnets API service call. Retrieves all subnets that belong to a virtual network. */
export interface VirtualNetworkPeeringListResultOutput {
  /** The peerings in a virtual network. */
  value?: Array<VirtualNetworkPeeringOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Response for CheckIPAddressAvailability API service call. */
export interface IPAddressAvailabilityResultOutput {
  /** Private IP address availability. */
  available?: boolean;
  /** Contains other available private IP addresses if the asked for address is taken. */
  availableIPAddresses?: Array<string>;
  /** Private IP address platform reserved. */
  isPlatformReserved?: boolean;
}

/** Response for the virtual networks GetUsage API service call. */
export interface VirtualNetworkListUsageResultOutput {
  /** VirtualNetwork usage stats. */
  readonly value?: Array<VirtualNetworkUsageOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** Usage details for subnet. */
export interface VirtualNetworkUsageOutput {
  /** Indicates number of IPs used from the Subnet. */
  readonly currentValue?: number;
  /** Subnet identifier. */
  readonly id?: string;
  /** Indicates the size of the subnet. */
  readonly limit?: number;
  /** The name containing common and localized value for usage. */
  readonly name?: VirtualNetworkUsageNameOutput;
  /** Usage units. Returns 'Count'. */
  readonly unit?: string;
}

/** Usage strings container. */
export interface VirtualNetworkUsageNameOutput {
  /** Localized subnet size and usage string. */
  readonly localizedValue?: string;
  /** Subnet size and usage string. */
  readonly value?: string;
}

/** Response for GetVirtualNetworkDdosProtectionStatusOperation. */
export interface VirtualNetworkDdosProtectionStatusResultOutput {
  /** The Ddos Protection Status Result for each public ip under a virtual network. */
  value?: Array<PublicIpDdosProtectionStatusResultOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** A common class for general resource information. */
export interface VirtualNetworkGatewayOutput extends ResourceOutput {
  /** Properties of the virtual network gateway. */
  properties: VirtualNetworkGatewayPropertiesFormatOutput;
  /** The extended location of type local virtual network gateway. */
  extendedLocation?: ExtendedLocationOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** VirtualNetworkGateway properties. */
export interface VirtualNetworkGatewayPropertiesFormatOutput {
  /** IP configurations for virtual network gateway. */
  ipConfigurations?: Array<VirtualNetworkGatewayIPConfigurationOutput>;
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
  gatewayDefaultSite?: SubResourceOutput;
  /** The reference to the VirtualNetworkGatewaySku resource which represents the SKU selected for Virtual network gateway. */
  sku?: VirtualNetworkGatewaySkuOutput;
  /** The reference to the VpnClientConfiguration resource which represents the P2S VpnClient configurations. */
  vpnClientConfiguration?: VpnClientConfigurationOutput;
  /** The reference to the VirtualNetworkGatewayPolicyGroup resource which represents the available VirtualNetworkGatewayPolicyGroup for the gateway. */
  virtualNetworkGatewayPolicyGroups?: Array<VirtualNetworkGatewayPolicyGroupOutput>;
  /** Virtual network gateway's BGP speaker settings. */
  bgpSettings?: BgpSettingsOutput;
  /** The reference to the address space resource which represents the custom routes address space specified by the customer for virtual network gateway and VpnClient. */
  customRoutes?: AddressSpaceOutput;
  /** The resource GUID property of the virtual network gateway resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the virtual network gateway resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Whether dns forwarding is enabled or not. */
  enableDnsForwarding?: boolean;
  /** The IP address allocated by the gateway to which dns requests can be sent. */
  readonly inboundDnsForwardingEndpoint?: string;
  /** Customer vnet resource id. VirtualNetworkGateway of type local gateway is associated with the customer vnet. */
  vNetExtendedLocationResourceId?: string;
  /** NatRules for virtual network gateway. */
  natRules?: Array<VirtualNetworkGatewayNatRuleOutput>;
  /** EnableBgpRouteTranslationForNat flag. */
  enableBgpRouteTranslationForNat?: boolean;
}

/** IP configuration for virtual network gateway. */
export interface VirtualNetworkGatewayIPConfigurationOutput extends SubResourceOutput {
  /** Properties of the virtual network gateway ip configuration. */
  properties?: VirtualNetworkGatewayIPConfigurationPropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of VirtualNetworkGatewayIPConfiguration. */
export interface VirtualNetworkGatewayIPConfigurationPropertiesFormatOutput {
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: "Static" | "Dynamic";
  /** The reference to the subnet resource. */
  subnet?: SubResourceOutput;
  /** The reference to the public IP resource. */
  publicIPAddress?: SubResourceOutput;
  /** Private IP Address for this gateway. */
  readonly privateIPAddress?: string;
  /** The provisioning state of the virtual network gateway IP configuration resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** VirtualNetworkGatewaySku details. */
export interface VirtualNetworkGatewaySkuOutput {
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
  readonly capacity?: number;
}

/** VpnClientConfiguration for P2S client. */
export interface VpnClientConfigurationOutput {
  /** The reference to the address space resource which represents Address space for P2S VpnClient. */
  vpnClientAddressPool?: AddressSpaceOutput;
  /** VpnClientRootCertificate for virtual network gateway. */
  vpnClientRootCertificates?: Array<VpnClientRootCertificateOutput>;
  /** VpnClientRevokedCertificate for Virtual network gateway. */
  vpnClientRevokedCertificates?: Array<VpnClientRevokedCertificateOutput>;
  /** VpnClientProtocols for Virtual network gateway. */
  vpnClientProtocols?: Array<"IkeV2" | "SSTP" | "OpenVPN">;
  /** VPN authentication types for the virtual network gateway.. */
  vpnAuthenticationTypes?: Array<"Certificate" | "Radius" | "AAD">;
  /** VpnClientIpsecPolicies for virtual network gateway P2S client. */
  vpnClientIpsecPolicies?: Array<IpsecPolicyOutput>;
  /** The radius server address property of the VirtualNetworkGateway resource for vpn client connection. */
  radiusServerAddress?: string;
  /** The radius secret property of the VirtualNetworkGateway resource for vpn client connection. */
  radiusServerSecret?: string;
  /** The radiusServers property for multiple radius server configuration. */
  radiusServers?: Array<RadiusServerOutput>;
  /** The AADTenant property of the VirtualNetworkGateway resource for vpn client connection used for AAD authentication. */
  aadTenant?: string;
  /** The AADAudience property of the VirtualNetworkGateway resource for vpn client connection used for AAD authentication. */
  aadAudience?: string;
  /** The AADIssuer property of the VirtualNetworkGateway resource for vpn client connection used for AAD authentication. */
  aadIssuer?: string;
  /** per ip address pool connection policy for virtual network gateway P2S client. */
  vngClientConnectionConfigurations?: Array<VngClientConnectionConfigurationOutput>;
}

/** VPN client root certificate of virtual network gateway. */
export interface VpnClientRootCertificateOutput extends SubResourceOutput {
  /** Properties of the vpn client root certificate. */
  properties: VpnClientRootCertificatePropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of SSL certificates of application gateway. */
export interface VpnClientRootCertificatePropertiesFormatOutput {
  /** The certificate public data. */
  publicCertData: string;
  /** The provisioning state of the VPN client root certificate resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** VPN client revoked certificate of virtual network gateway. */
export interface VpnClientRevokedCertificateOutput extends SubResourceOutput {
  /** Properties of the vpn client revoked certificate. */
  properties?: VpnClientRevokedCertificatePropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of the revoked VPN client certificate of virtual network gateway. */
export interface VpnClientRevokedCertificatePropertiesFormatOutput {
  /** The revoked VPN client certificate thumbprint. */
  thumbprint?: string;
  /** The provisioning state of the VPN client revoked certificate resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** An IPSec Policy configuration for a virtual network gateway connection. */
export interface IpsecPolicyOutput {
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
export interface RadiusServerOutput {
  /** The address of this radius server. */
  radiusServerAddress: string;
  /** The initial score assigned to this radius server. */
  radiusServerScore?: number;
  /** The secret used for this radius server. */
  radiusServerSecret?: string;
}

/** A vpn client connection configuration for client connection configuration. */
export interface VngClientConnectionConfigurationOutput extends SubResourceOutput {
  /** Properties of the vpn client root certificate. */
  properties?: VngClientConnectionConfigurationPropertiesOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of VngClientConnectionConfiguration. */
export interface VngClientConnectionConfigurationPropertiesOutput {
  /** The reference to the address space resource which represents Address space for P2S VpnClient. */
  vpnClientAddressPool: AddressSpaceOutput;
  /** List of references to virtualNetworkGatewayPolicyGroups */
  virtualNetworkGatewayPolicyGroups: Array<SubResourceOutput>;
  /** The provisioning state of the VngClientConnectionConfiguration resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Parameters for VirtualNetworkGatewayPolicyGroup. */
export interface VirtualNetworkGatewayPolicyGroupOutput extends SubResourceOutput {
  /** Properties of tVirtualNetworkGatewayPolicyGroup. */
  properties?: VirtualNetworkGatewayPolicyGroupPropertiesOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of VirtualNetworkGatewayPolicyGroup. */
export interface VirtualNetworkGatewayPolicyGroupPropertiesOutput {
  /** Shows if this is a Default VirtualNetworkGatewayPolicyGroup or not. */
  isDefault: boolean;
  /** Priority for VirtualNetworkGatewayPolicyGroup. */
  priority: number;
  /** Multiple PolicyMembers for VirtualNetworkGatewayPolicyGroup. */
  policyMembers: Array<VirtualNetworkGatewayPolicyGroupMemberOutput>;
  /** List of references to vngClientConnectionConfigurations. */
  readonly vngClientConnectionConfigurations?: Array<SubResourceOutput>;
  /** The provisioning state of the VirtualNetworkGatewayPolicyGroup resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Vpn Client Connection configuration PolicyGroup member */
export interface VirtualNetworkGatewayPolicyGroupMemberOutput {
  /** Name of the VirtualNetworkGatewayPolicyGroupMember. */
  name?: string;
  /** The Vpn Policy member attribute type. */
  attributeType?: "CertificateGroupId" | "AADGroupId" | "RadiusAzureGroupId";
  /** The value of Attribute used for this VirtualNetworkGatewayPolicyGroupMember. */
  attributeValue?: string;
}

/** BGP settings details. */
export interface BgpSettingsOutput {
  /** The BGP speaker's ASN. */
  asn?: number;
  /** The BGP peering address and BGP identifier of this BGP speaker. */
  bgpPeeringAddress?: string;
  /** The weight added to routes learned from this BGP speaker. */
  peerWeight?: number;
  /** BGP peering address with IP configuration ID for virtual network gateway. */
  bgpPeeringAddresses?: Array<IPConfigurationBgpPeeringAddressOutput>;
}

/** Properties of IPConfigurationBgpPeeringAddress. */
export interface IPConfigurationBgpPeeringAddressOutput {
  /** The ID of IP configuration which belongs to gateway. */
  ipconfigurationId?: string;
  /** The list of default BGP peering addresses which belong to IP configuration. */
  readonly defaultBgpIpAddresses?: Array<string>;
  /** The list of custom BGP peering addresses which belong to IP configuration. */
  customBgpIpAddresses?: Array<string>;
  /** The list of tunnel public IP addresses which belong to IP configuration. */
  readonly tunnelIpAddresses?: Array<string>;
}

/** VirtualNetworkGatewayNatRule Resource. */
export interface VirtualNetworkGatewayNatRuleOutput extends SubResourceOutput {
  /** Properties of the Virtual Network Gateway NAT rule. */
  properties?: VirtualNetworkGatewayNatRulePropertiesOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Resource type. */
  readonly type?: string;
}

/** Parameters for VirtualNetworkGatewayNatRule. */
export interface VirtualNetworkGatewayNatRulePropertiesOutput {
  /** The provisioning state of the NAT Rule resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The type of NAT rule for VPN NAT. */
  type?: "Static" | "Dynamic";
  /** The Source NAT direction of a VPN NAT. */
  mode?: "EgressSnat" | "IngressSnat";
  /** The private IP address internal mapping for NAT. */
  internalMappings?: Array<VpnNatRuleMappingOutput>;
  /** The private IP address external mapping for NAT. */
  externalMappings?: Array<VpnNatRuleMappingOutput>;
  /** The IP Configuration ID this NAT rule applies to. */
  ipConfigurationId?: string;
}

/** Vpn NatRule mapping. */
export interface VpnNatRuleMappingOutput {
  /** Address space for Vpn NatRule mapping. */
  addressSpace?: string;
  /** Port range for Vpn NatRule mapping. */
  portRange?: string;
}

/** Response for the ListVirtualNetworkGateways API service call. */
export interface VirtualNetworkGatewayListResultOutput {
  /** A list of VirtualNetworkGateway resources that exists in a resource group. */
  value?: Array<VirtualNetworkGatewayOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** Response for the VirtualNetworkGatewayListConnections API service call. */
export interface VirtualNetworkGatewayListConnectionsResultOutput {
  /** A list of VirtualNetworkGatewayConnection resources that exists in a resource group. */
  value?: Array<VirtualNetworkGatewayConnectionListEntityOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** A common class for general resource information. */
export interface VirtualNetworkGatewayConnectionListEntityOutput extends ResourceOutput {
  /** Properties of the virtual network gateway connection. */
  properties: VirtualNetworkGatewayConnectionListEntityPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** VirtualNetworkGatewayConnection properties. */
export interface VirtualNetworkGatewayConnectionListEntityPropertiesFormatOutput {
  /** The authorizationKey. */
  authorizationKey?: string;
  /** The reference to virtual network gateway resource. */
  virtualNetworkGateway1: VirtualNetworkConnectionGatewayReferenceOutput;
  /** The reference to virtual network gateway resource. */
  virtualNetworkGateway2?: VirtualNetworkConnectionGatewayReferenceOutput;
  /** The reference to local network gateway resource. */
  localNetworkGateway2?: VirtualNetworkConnectionGatewayReferenceOutput;
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
  readonly connectionStatus?: "Unknown" | "Connecting" | "Connected" | "NotConnected";
  /** Collection of all tunnels' connection health status. */
  readonly tunnelConnectionStatus?: Array<TunnelConnectionHealthOutput>;
  /** The egress bytes transferred in this connection. */
  readonly egressBytesTransferred?: number;
  /** The ingress bytes transferred in this connection. */
  readonly ingressBytesTransferred?: number;
  /** The reference to peerings resource. */
  peer?: SubResourceOutput;
  /** EnableBgp flag. */
  enableBgp?: boolean;
  /** GatewayCustomBgpIpAddresses to be used for virtual network gateway Connection. */
  gatewayCustomBgpIpAddresses?: Array<GatewayCustomBgpIpAddressIpConfigurationOutput>;
  /** Enable policy-based traffic selectors. */
  usePolicyBasedTrafficSelectors?: boolean;
  /** The IPSec Policies to be considered by this connection. */
  ipsecPolicies?: Array<IpsecPolicyOutput>;
  /** The Traffic Selector Policies to be considered by this connection. */
  trafficSelectorPolicies?: Array<TrafficSelectorPolicyOutput>;
  /** The resource GUID property of the virtual network gateway connection resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the virtual network gateway connection resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Bypass ExpressRoute Gateway for data forwarding. */
  expressRouteGatewayBypass?: boolean;
  /** Bypass the ExpressRoute gateway when accessing private-links. ExpressRoute FastPath (expressRouteGatewayBypass) must be enabled. */
  enablePrivateLinkFastPath?: boolean;
}

/** A reference to VirtualNetworkGateway or LocalNetworkGateway resource. */
export interface VirtualNetworkConnectionGatewayReferenceOutput {
  /** The ID of VirtualNetworkGateway or LocalNetworkGateway resource. */
  id: string;
}

/** VirtualNetworkGatewayConnection properties. */
export interface TunnelConnectionHealthOutput {
  /** Tunnel name. */
  readonly tunnel?: string;
  /** Virtual Network Gateway connection status. */
  readonly connectionStatus?: "Unknown" | "Connecting" | "Connected" | "NotConnected";
  /** The Ingress Bytes Transferred in this connection. */
  readonly ingressBytesTransferred?: number;
  /** The Egress Bytes Transferred in this connection. */
  readonly egressBytesTransferred?: number;
  /** The time at which connection was established in Utc format. */
  readonly lastConnectionEstablishedUtcTime?: string;
}

/** GatewayCustomBgpIpAddressIpConfiguration for a virtual network gateway connection. */
export interface GatewayCustomBgpIpAddressIpConfigurationOutput {
  /** The IpconfigurationId of ipconfiguration which belongs to gateway. */
  ipConfigurationId: string;
  /** The custom BgpPeeringAddress which belongs to IpconfigurationId. */
  customBgpIpAddress: string;
}

/** An traffic selector policy for a virtual network gateway connection. */
export interface TrafficSelectorPolicyOutput {
  /** A collection of local address spaces in CIDR format. */
  localAddressRanges: Array<string>;
  /** A collection of remote address spaces in CIDR format. */
  remoteAddressRanges: Array<string>;
}

/** Response for list BGP peer status API service call. */
export interface BgpPeerStatusListResultOutput {
  /** List of BGP peers. */
  value?: Array<BgpPeerStatusOutput>;
}

/** BGP peer status details. */
export interface BgpPeerStatusOutput {
  /** The virtual network gateway's local address. */
  readonly localAddress?: string;
  /** The remote BGP peer. */
  readonly neighbor?: string;
  /** The autonomous system number of the remote BGP peer. */
  readonly asn?: number;
  /** The BGP peer state. */
  readonly state?: "Unknown" | "Stopped" | "Idle" | "Connecting" | "Connected";
  /** For how long the peering has been up. */
  readonly connectedDuration?: string;
  /** The number of routes learned from this peer. */
  readonly routesReceived?: number;
  /** The number of BGP messages sent. */
  readonly messagesSent?: number;
  /** The number of BGP messages received. */
  readonly messagesReceived?: number;
}

/** List of virtual network gateway routes. */
export interface GatewayRouteListResultOutput {
  /** List of gateway routes. */
  value?: Array<GatewayRouteOutput>;
}

/** Gateway routing details. */
export interface GatewayRouteOutput {
  /** The gateway's local address. */
  readonly localAddress?: string;
  /** The route's network prefix. */
  readonly network?: string;
  /** The route's next hop. */
  readonly nextHop?: string;
  /** The peer this route was learned from. */
  readonly sourcePeer?: string;
  /** The source this route was learned from. */
  readonly origin?: string;
  /** The route's AS path sequence. */
  readonly asPath?: string;
  /** The route's weight. */
  readonly weight?: number;
}

/** An IPSec parameters for a virtual network gateway P2S connection. */
export interface VpnClientIPsecParametersOutput {
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

/** A common class for general resource information. */
export interface VirtualNetworkGatewayConnectionOutput extends ResourceOutput {
  /** Properties of the virtual network gateway connection. */
  properties: VirtualNetworkGatewayConnectionPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** VirtualNetworkGatewayConnection properties. */
export interface VirtualNetworkGatewayConnectionPropertiesFormatOutput {
  /** The authorizationKey. */
  authorizationKey?: string;
  /** The reference to virtual network gateway resource. */
  virtualNetworkGateway1: VirtualNetworkGatewayOutput;
  /** The reference to virtual network gateway resource. */
  virtualNetworkGateway2?: VirtualNetworkGatewayOutput;
  /** The reference to local network gateway resource. */
  localNetworkGateway2?: LocalNetworkGatewayOutput;
  /** List of ingress NatRules. */
  ingressNatRules?: Array<SubResourceOutput>;
  /** List of egress NatRules. */
  egressNatRules?: Array<SubResourceOutput>;
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
  readonly connectionStatus?: "Unknown" | "Connecting" | "Connected" | "NotConnected";
  /** Collection of all tunnels' connection health status. */
  readonly tunnelConnectionStatus?: Array<TunnelConnectionHealthOutput>;
  /** The egress bytes transferred in this connection. */
  readonly egressBytesTransferred?: number;
  /** The ingress bytes transferred in this connection. */
  readonly ingressBytesTransferred?: number;
  /** The reference to peerings resource. */
  peer?: SubResourceOutput;
  /** EnableBgp flag. */
  enableBgp?: boolean;
  /** GatewayCustomBgpIpAddresses to be used for virtual network gateway Connection. */
  gatewayCustomBgpIpAddresses?: Array<GatewayCustomBgpIpAddressIpConfigurationOutput>;
  /** Use private local Azure IP for the connection. */
  useLocalAzureIpAddress?: boolean;
  /** Enable policy-based traffic selectors. */
  usePolicyBasedTrafficSelectors?: boolean;
  /** The IPSec Policies to be considered by this connection. */
  ipsecPolicies?: Array<IpsecPolicyOutput>;
  /** The Traffic Selector Policies to be considered by this connection. */
  trafficSelectorPolicies?: Array<TrafficSelectorPolicyOutput>;
  /** The resource GUID property of the virtual network gateway connection resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the virtual network gateway connection resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Bypass ExpressRoute Gateway for data forwarding. */
  expressRouteGatewayBypass?: boolean;
  /** Bypass the ExpressRoute gateway when accessing private-links. ExpressRoute FastPath (expressRouteGatewayBypass) must be enabled. */
  enablePrivateLinkFastPath?: boolean;
}

/** A common class for general resource information. */
export interface LocalNetworkGatewayOutput extends ResourceOutput {
  /** Properties of the local network gateway. */
  properties: LocalNetworkGatewayPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** LocalNetworkGateway properties. */
export interface LocalNetworkGatewayPropertiesFormatOutput {
  /** Local network site address space. */
  localNetworkAddressSpace?: AddressSpaceOutput;
  /** IP address of local network gateway. */
  gatewayIpAddress?: string;
  /** FQDN of local network gateway. */
  fqdn?: string;
  /** Local network gateway's BGP speaker settings. */
  bgpSettings?: BgpSettingsOutput;
  /** The resource GUID property of the local network gateway resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the local network gateway resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Response for GetConnectionSharedKey API service call. */
export interface ConnectionSharedKeyOutput extends SubResourceOutput {
  /** The virtual network connection shared key value. */
  value: string;
}

/** Response for the ListVirtualNetworkGatewayConnections API service call. */
export interface VirtualNetworkGatewayConnectionListResultOutput {
  /** A list of VirtualNetworkGatewayConnection resources that exists in a resource group. */
  value?: Array<VirtualNetworkGatewayConnectionOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** The virtual network connection reset shared key. */
export interface ConnectionResetSharedKeyOutput {
  /** The virtual network connection reset shared key length, should between 1 and 128. */
  keyLength: number;
}

/** Response for ListLocalNetworkGateways API service call. */
export interface LocalNetworkGatewayListResultOutput {
  /** A list of local network gateways that exists in a resource group. */
  value?: Array<LocalNetworkGatewayOutput>;
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

/** List of virtual network gateway vpn client connection health. */
export interface VpnClientConnectionHealthDetailListResultOutput {
  /** List of vpn client connection health. */
  value?: Array<VpnClientConnectionHealthDetailOutput>;
}

/** VPN client connection health detail. */
export interface VpnClientConnectionHealthDetailOutput {
  /** The vpn client Id. */
  readonly vpnConnectionId?: string;
  /** The duration time of a connected vpn client. */
  readonly vpnConnectionDuration?: number;
  /** The start time of a connected vpn client. */
  readonly vpnConnectionTime?: string;
  /** The public Ip of a connected vpn client. */
  readonly publicIpAddress?: string;
  /** The assigned private Ip of a connected vpn client. */
  readonly privateIpAddress?: string;
  /** The user name of a connected vpn client. */
  readonly vpnUserName?: string;
  /** The max band width. */
  readonly maxBandwidth?: number;
  /** The egress packets per second. */
  readonly egressPacketsTransferred?: number;
  /** The egress bytes per second. */
  readonly egressBytesTransferred?: number;
  /** The ingress packets per second. */
  readonly ingressPacketsTransferred?: number;
  /** The ingress bytes per second. */
  readonly ingressBytesTransferred?: number;
  /** The max packets transferred per second. */
  readonly maxPacketsPerSecond?: number;
}

/** Result of the request to list all nat rules to a virtual network gateway. It contains a list of Nat rules and a URL nextLink to get the next set of results. */
export interface ListVirtualNetworkGatewayNatRulesResultOutput {
  /** List of Nat Rules. */
  value?: Array<VirtualNetworkGatewayNatRuleOutput>;
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** Response for ListVirtualNetworkTap API service call. */
export interface VirtualNetworkTapListResultOutput {
  /** A list of VirtualNetworkTaps in a resource group. */
  value?: Array<VirtualNetworkTapOutput>;
  /** The URL to get the next set of results. */
  nextLink?: string;
}

/** VirtualRouter Resource. */
export interface VirtualRouterOutput extends ResourceOutput {
  /** Properties of the Virtual Router. */
  properties?: VirtualRouterPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Virtual Router definition. */
export interface VirtualRouterPropertiesFormatOutput {
  /** VirtualRouter ASN. */
  virtualRouterAsn?: number;
  /** VirtualRouter IPs. */
  virtualRouterIps?: Array<string>;
  /** The Subnet on which VirtualRouter is hosted. */
  hostedSubnet?: SubResourceOutput;
  /** The Gateway on which VirtualRouter is hosted. */
  hostedGateway?: SubResourceOutput;
  /** List of references to VirtualRouterPeerings. */
  readonly peerings?: Array<SubResourceOutput>;
  /** The provisioning state of the resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Response for ListVirtualRouters API service call. */
export interface VirtualRouterListResultOutput {
  /** List of Virtual Routers. */
  value?: Array<VirtualRouterOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** Virtual Router Peering resource. */
export interface VirtualRouterPeeringOutput extends SubResourceOutput {
  /** The properties of the Virtual Router Peering. */
  properties?: VirtualRouterPeeringPropertiesOutput;
  /** Name of the virtual router peering that is unique within a virtual router. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Peering type. */
  readonly type?: string;
}

/** Properties of the rule group. */
export interface VirtualRouterPeeringPropertiesOutput {
  /** Peer ASN. */
  peerAsn?: number;
  /** Peer IP. */
  peerIp?: string;
  /** The provisioning state of the resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Response for ListVirtualRouterPeerings API service call. */
export interface VirtualRouterPeeringListResultOutput {
  /** List of VirtualRouterPeerings in a VirtualRouter. */
  value?: Array<VirtualRouterPeeringOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** VirtualWAN Resource. */
export interface VirtualWANOutput extends ResourceOutput {
  /** Properties of the virtual WAN. */
  properties?: VirtualWanPropertiesOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Parameters for VirtualWAN. */
export interface VirtualWanPropertiesOutput {
  /** Vpn encryption to be disabled or not. */
  disableVpnEncryption?: boolean;
  /** List of VirtualHubs in the VirtualWAN. */
  readonly virtualHubs?: Array<SubResourceOutput>;
  /** List of VpnSites in the VirtualWAN. */
  readonly vpnSites?: Array<SubResourceOutput>;
  /** True if branch to branch traffic is allowed. */
  allowBranchToBranchTraffic?: boolean;
  /** True if Vnet to Vnet traffic is allowed. */
  allowVnetToVnetTraffic?: boolean;
  /** The office local breakout category. */
  readonly office365LocalBreakoutCategory?: "Optimize" | "OptimizeAndAllow" | "All" | "None";
  /** The provisioning state of the virtual WAN resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The type of the VirtualWAN. */
  type?: string;
}

/** Result of the request to list VirtualWANs. It contains a list of VirtualWANs and a URL nextLink to get the next set of results. */
export interface ListVirtualWANsResultOutput {
  /** List of VirtualWANs. */
  value?: Array<VirtualWANOutput>;
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** VpnSite Resource. */
export interface VpnSiteOutput extends ResourceOutput {
  /** Properties of the VPN site. */
  properties?: VpnSitePropertiesOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Parameters for VpnSite. */
export interface VpnSitePropertiesOutput {
  /** The VirtualWAN to which the vpnSite belongs. */
  virtualWan?: SubResourceOutput;
  /** The device properties. */
  deviceProperties?: DevicePropertiesOutput;
  /** The ip-address for the vpn-site. */
  ipAddress?: string;
  /** The key for vpn-site that can be used for connections. */
  siteKey?: string;
  /** The AddressSpace that contains an array of IP address ranges. */
  addressSpace?: AddressSpaceOutput;
  /** The set of bgp properties. */
  bgpProperties?: BgpSettingsOutput;
  /** The provisioning state of the VPN site resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** IsSecuritySite flag. */
  isSecuritySite?: boolean;
  /** List of all vpn site links. */
  vpnSiteLinks?: Array<VpnSiteLinkOutput>;
  /** Office365 Policy. */
  o365Policy?: O365PolicyPropertiesOutput;
}

/** List of properties of the device. */
export interface DevicePropertiesOutput {
  /** Name of the device Vendor. */
  deviceVendor?: string;
  /** Model of the device. */
  deviceModel?: string;
  /** Link speed. */
  linkSpeedInMbps?: number;
}

/** VpnSiteLink Resource. */
export interface VpnSiteLinkOutput extends SubResourceOutput {
  /** Properties of the VPN site link. */
  properties?: VpnSiteLinkPropertiesOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** Resource type. */
  readonly type?: string;
}

/** Parameters for VpnSite. */
export interface VpnSiteLinkPropertiesOutput {
  /** The link provider properties. */
  linkProperties?: VpnLinkProviderPropertiesOutput;
  /** The ip-address for the vpn-site-link. */
  ipAddress?: string;
  /** FQDN of vpn-site-link. */
  fqdn?: string;
  /** The set of bgp properties. */
  bgpProperties?: VpnLinkBgpSettingsOutput;
  /** The provisioning state of the VPN site link resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** List of properties of a link provider. */
export interface VpnLinkProviderPropertiesOutput {
  /** Name of the link provider. */
  linkProviderName?: string;
  /** Link speed. */
  linkSpeedInMbps?: number;
}

/** BGP settings details for a link. */
export interface VpnLinkBgpSettingsOutput {
  /** The BGP speaker's ASN. */
  asn?: number;
  /** The BGP peering address and BGP identifier of this BGP speaker. */
  bgpPeeringAddress?: string;
}

/** The Office365 breakout policy. */
export interface O365PolicyPropertiesOutput {
  /** Office365 breakout categories. */
  breakOutCategories?: O365BreakOutCategoryPoliciesOutput;
}

/** Office365 breakout categories. */
export interface O365BreakOutCategoryPoliciesOutput {
  /** Flag to control allow category. */
  allow?: boolean;
  /** Flag to control optimize category. */
  optimize?: boolean;
  /** Flag to control default category. */
  default?: boolean;
}

/** Result of the request to list VpnSites. It contains a list of VpnSites and a URL nextLink to get the next set of results. */
export interface ListVpnSitesResultOutput {
  /** List of VpnSites. */
  value?: Array<VpnSiteOutput>;
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** Result of the request to list VpnSiteLinks. It contains a list of VpnSiteLinks and a URL nextLink to get the next set of results. */
export interface ListVpnSiteLinksResultOutput {
  /** List of VpnSitesLinks. */
  value?: Array<VpnSiteLinkOutput>;
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** Collection of SecurityProviders. */
export interface VirtualWanSecurityProvidersOutput {
  /** List of VirtualWAN security providers. */
  supportedProviders?: Array<VirtualWanSecurityProviderOutput>;
}

/** Collection of SecurityProviders. */
export interface VirtualWanSecurityProviderOutput {
  /** Name of the security provider. */
  name?: string;
  /** Url of the security provider. */
  url?: string;
  /** Name of the security provider. */
  readonly type?: "External" | "Native";
}

/** VpnServerConfiguration Resource. */
export interface VpnServerConfigurationOutput extends ResourceOutput {
  /** Properties of the P2SVpnServer configuration. */
  properties?: VpnServerConfigurationPropertiesOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Parameters for VpnServerConfiguration. */
export interface VpnServerConfigurationPropertiesOutput {
  /** The name of the VpnServerConfiguration that is unique within a resource group. */
  name?: string;
  /** VPN protocols for the VpnServerConfiguration. */
  vpnProtocols?: Array<"IkeV2" | "OpenVPN">;
  /** VPN authentication types for the VpnServerConfiguration. */
  vpnAuthenticationTypes?: Array<"Certificate" | "Radius" | "AAD">;
  /** VPN client root certificate of VpnServerConfiguration. */
  vpnClientRootCertificates?: Array<VpnServerConfigVpnClientRootCertificateOutput>;
  /** VPN client revoked certificate of VpnServerConfiguration. */
  vpnClientRevokedCertificates?: Array<VpnServerConfigVpnClientRevokedCertificateOutput>;
  /** Radius Server root certificate of VpnServerConfiguration. */
  radiusServerRootCertificates?: Array<VpnServerConfigRadiusServerRootCertificateOutput>;
  /** Radius client root certificate of VpnServerConfiguration. */
  radiusClientRootCertificates?: Array<VpnServerConfigRadiusClientRootCertificateOutput>;
  /** VpnClientIpsecPolicies for VpnServerConfiguration. */
  vpnClientIpsecPolicies?: Array<IpsecPolicyOutput>;
  /** The radius server address property of the VpnServerConfiguration resource for point to site client connection. */
  radiusServerAddress?: string;
  /** The radius secret property of the VpnServerConfiguration resource for point to site client connection. */
  radiusServerSecret?: string;
  /** Multiple Radius Server configuration for VpnServerConfiguration. */
  radiusServers?: Array<RadiusServerOutput>;
  /** The set of aad vpn authentication parameters. */
  aadAuthenticationParameters?: AadAuthenticationParametersOutput;
  /** The provisioning state of the VpnServerConfiguration resource. Possible values are: 'Updating', 'Deleting', and 'Failed'. */
  readonly provisioningState?: string;
  /** List of references to P2SVpnGateways. */
  readonly p2SVpnGateways?: Array<P2SVpnGatewayOutput>;
  /** List of all VpnServerConfigurationPolicyGroups. */
  configurationPolicyGroups?: Array<VpnServerConfigurationPolicyGroupOutput>;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Properties of VPN client root certificate of VpnServerConfiguration. */
export interface VpnServerConfigVpnClientRootCertificateOutput {
  /** The certificate name. */
  name?: string;
  /** The certificate public data. */
  publicCertData?: string;
}

/** Properties of the revoked VPN client certificate of VpnServerConfiguration. */
export interface VpnServerConfigVpnClientRevokedCertificateOutput {
  /** The certificate name. */
  name?: string;
  /** The revoked VPN client certificate thumbprint. */
  thumbprint?: string;
}

/** Properties of Radius Server root certificate of VpnServerConfiguration. */
export interface VpnServerConfigRadiusServerRootCertificateOutput {
  /** The certificate name. */
  name?: string;
  /** The certificate public data. */
  publicCertData?: string;
}

/** Properties of the Radius client root certificate of VpnServerConfiguration. */
export interface VpnServerConfigRadiusClientRootCertificateOutput {
  /** The certificate name. */
  name?: string;
  /** The Radius client root certificate thumbprint. */
  thumbprint?: string;
}

/** AAD Vpn authentication type related parameters. */
export interface AadAuthenticationParametersOutput {
  /** AAD Vpn authentication parameter AAD tenant. */
  aadTenant?: string;
  /** AAD Vpn authentication parameter AAD audience. */
  aadAudience?: string;
  /** AAD Vpn authentication parameter AAD issuer. */
  aadIssuer?: string;
}

/** P2SVpnGateway Resource. */
export interface P2SVpnGatewayOutput extends ResourceOutput {
  /** Properties of the P2SVpnGateway. */
  properties?: P2SVpnGatewayPropertiesOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Parameters for P2SVpnGateway. */
export interface P2SVpnGatewayPropertiesOutput {
  /** The VirtualHub to which the gateway belongs. */
  virtualHub?: SubResourceOutput;
  /** List of all p2s connection configurations of the gateway. */
  p2SConnectionConfigurations?: Array<P2SConnectionConfigurationOutput>;
  /** The provisioning state of the P2S VPN gateway resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The scale unit for this p2s vpn gateway. */
  vpnGatewayScaleUnit?: number;
  /** The VpnServerConfiguration to which the p2sVpnGateway is attached to. */
  vpnServerConfiguration?: SubResourceOutput;
  /** All P2S VPN clients' connection health status. */
  readonly vpnClientConnectionHealth?: VpnClientConnectionHealthOutput;
  /** List of all customer specified DNS servers IP addresses. */
  customDnsServers?: Array<string>;
  /** Enable Routing Preference property for the Public IP Interface of the P2SVpnGateway. */
  isRoutingPreferenceInternet?: boolean;
}

/** P2SConnectionConfiguration Resource. */
export interface P2SConnectionConfigurationOutput extends SubResourceOutput {
  /** Properties of the P2S connection configuration. */
  properties?: P2SConnectionConfigurationPropertiesOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Parameters for P2SConnectionConfiguration. */
export interface P2SConnectionConfigurationPropertiesOutput {
  /** The reference to the address space resource which represents Address space for P2S VpnClient. */
  vpnClientAddressPool?: AddressSpaceOutput;
  /** The Routing Configuration indicating the associated and propagated route tables on this connection. */
  routingConfiguration?: RoutingConfigurationOutput;
  /** Flag indicating whether the enable internet security flag is turned on for the P2S Connections or not. */
  enableInternetSecurity?: boolean;
  /** List of Configuration Policy Groups that this P2SConnectionConfiguration is attached to. */
  readonly configurationPolicyGroupAssociations?: Array<SubResourceOutput>;
  /** List of previous Configuration Policy Groups that this P2SConnectionConfiguration was attached to. */
  readonly previousConfigurationPolicyGroupAssociations?: Array<VpnServerConfigurationPolicyGroupOutput>;
  /** The provisioning state of the P2SConnectionConfiguration resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Routing Configuration indicating the associated and propagated route tables for this connection. */
export interface RoutingConfigurationOutput {
  /** The resource id RouteTable associated with this RoutingConfiguration. */
  associatedRouteTable?: SubResourceOutput;
  /** The list of RouteTables to advertise the routes to. */
  propagatedRouteTables?: PropagatedRouteTableOutput;
  /** List of routes that control routing from VirtualHub into a virtual network connection. */
  vnetRoutes?: VnetRouteOutput;
  /** The resource id of the RouteMap associated with this RoutingConfiguration for inbound learned routes. */
  inboundRouteMap?: SubResourceOutput;
  /** The resource id of theRouteMap associated with this RoutingConfiguration for outbound advertised routes. */
  outboundRouteMap?: SubResourceOutput;
}

/** The list of RouteTables to advertise the routes to. */
export interface PropagatedRouteTableOutput {
  /** The list of labels. */
  labels?: Array<string>;
  /** The list of resource ids of all the RouteTables. */
  ids?: Array<SubResourceOutput>;
}

/** List of routes that control routing from VirtualHub into a virtual network connection. */
export interface VnetRouteOutput {
  /** Configuration for static routes on this HubVnetConnection. */
  staticRoutesConfig?: StaticRoutesConfigOutput;
  /** List of all Static Routes. */
  staticRoutes?: Array<StaticRouteOutput>;
  /** The list of references to HubBgpConnection objects. */
  readonly bgpConnections?: Array<SubResourceOutput>;
}

/** Configuration for static routes on this HubVnetConnectionConfiguration for static routes on this HubVnetConnection. */
export interface StaticRoutesConfigOutput {
  /** Boolean indicating whether static routes on this connection are automatically propagate to route tables which this connection propagates to. */
  readonly propagateStaticRoutes?: boolean;
  /** Parameter determining whether NVA in spoke vnet is bypassed for traffic with destination in spoke. */
  vnetLocalRouteOverrideCriteria?: "Contains" | "Equal";
}

/** List of all Static Routes. */
export interface StaticRouteOutput {
  /** The name of the StaticRoute that is unique within a VnetRoute. */
  name?: string;
  /** List of all address prefixes. */
  addressPrefixes?: Array<string>;
  /** The ip address of the next hop. */
  nextHopIpAddress?: string;
}

/** VpnServerConfigurationPolicyGroup Resource. */
export interface VpnServerConfigurationPolicyGroupOutput extends SubResourceOutput {
  /** Properties of the VpnServerConfigurationPolicyGroup. */
  properties?: VpnServerConfigurationPolicyGroupPropertiesOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** Resource type. */
  readonly type?: string;
}

/** Parameters for VpnServerConfigurationPolicyGroup. */
export interface VpnServerConfigurationPolicyGroupPropertiesOutput {
  /** Shows if this is a Default VpnServerConfigurationPolicyGroup or not. */
  isDefault?: boolean;
  /** Priority for VpnServerConfigurationPolicyGroup. */
  priority?: number;
  /** Multiple PolicyMembers for VpnServerConfigurationPolicyGroup. */
  policyMembers?: Array<VpnServerConfigurationPolicyGroupMemberOutput>;
  /** List of references to P2SConnectionConfigurations. */
  readonly p2SConnectionConfigurations?: Array<SubResourceOutput>;
  /** The provisioning state of the VpnServerConfigurationPolicyGroup resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** VpnServerConfiguration PolicyGroup member */
export interface VpnServerConfigurationPolicyGroupMemberOutput {
  /** Name of the VpnServerConfigurationPolicyGroupMember. */
  name?: string;
  /** The Vpn Policy member attribute type. */
  attributeType?: "CertificateGroupId" | "AADGroupId" | "RadiusAzureGroupId";
  /** The value of Attribute used for this VpnServerConfigurationPolicyGroupMember. */
  attributeValue?: string;
}

/** VpnClientConnectionHealth properties. */
export interface VpnClientConnectionHealthOutput {
  /** Total of the Ingress Bytes Transferred in this P2S Vpn connection. */
  readonly totalIngressBytesTransferred?: number;
  /** Total of the Egress Bytes Transferred in this connection. */
  readonly totalEgressBytesTransferred?: number;
  /** The total of p2s vpn clients connected at this time to this P2SVpnGateway. */
  vpnClientConnectionsCount?: number;
  /** List of allocated ip addresses to the connected p2s vpn clients. */
  allocatedIpAddresses?: Array<string>;
}

/** Result of the request to list all VpnServerConfigurations. It contains a list of VpnServerConfigurations and a URL nextLink to get the next set of results. */
export interface ListVpnServerConfigurationsResultOutput {
  /** List of VpnServerConfigurations. */
  value?: Array<VpnServerConfigurationOutput>;
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** Result of the request to list VpnServerConfigurationPolicyGroups. It contains a list of VpnServerConfigurationPolicyGroups and a URL nextLink to get the next set of results. */
export interface ListVpnServerConfigurationPolicyGroupsResultOutput {
  /** List of VpnServerConfigurationPolicyGroups. */
  value?: Array<VpnServerConfigurationPolicyGroupOutput>;
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** VirtualHub Resource. */
export interface VirtualHubOutput extends ResourceOutput {
  /** Properties of the virtual hub. */
  properties?: VirtualHubPropertiesOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Kind of service virtual hub. This is metadata used for the Azure portal experience for Route Server. */
  readonly kind?: string;
}

/** Parameters for VirtualHub. */
export interface VirtualHubPropertiesOutput {
  /** The VirtualWAN to which the VirtualHub belongs. */
  virtualWan?: SubResourceOutput;
  /** The VpnGateway associated with this VirtualHub. */
  vpnGateway?: SubResourceOutput;
  /** The P2SVpnGateway associated with this VirtualHub. */
  p2SVpnGateway?: SubResourceOutput;
  /** The expressRouteGateway associated with this VirtualHub. */
  expressRouteGateway?: SubResourceOutput;
  /** The azureFirewall associated with this VirtualHub. */
  azureFirewall?: SubResourceOutput;
  /** The securityPartnerProvider associated with this VirtualHub. */
  securityPartnerProvider?: SubResourceOutput;
  /** Address-prefix for this VirtualHub. */
  addressPrefix?: string;
  /** The routeTable associated with this virtual hub. */
  routeTable?: VirtualHubRouteTableOutput;
  /** The provisioning state of the virtual hub resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The Security Provider name. */
  securityProviderName?: string;
  /** List of all virtual hub route table v2s associated with this VirtualHub. */
  virtualHubRouteTableV2s?: Array<VirtualHubRouteTableV2Output>;
  /** The sku of this VirtualHub. */
  sku?: string;
  /** The routing state. */
  readonly routingState?: "None" | "Provisioned" | "Provisioning" | "Failed";
  /** List of references to Bgp Connections. */
  readonly bgpConnections?: Array<SubResourceOutput>;
  /** List of references to IpConfigurations. */
  readonly ipConfigurations?: Array<SubResourceOutput>;
  /** List of references to RouteMaps. */
  readonly routeMaps?: Array<SubResourceOutput>;
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
  virtualRouterAutoScaleConfiguration?: VirtualRouterAutoScaleConfigurationOutput;
}

/** VirtualHub route table. */
export interface VirtualHubRouteTableOutput {
  /** List of all routes. */
  routes?: Array<VirtualHubRouteOutput>;
}

/** VirtualHub route. */
export interface VirtualHubRouteOutput {
  /** List of all addressPrefixes. */
  addressPrefixes?: Array<string>;
  /** NextHop ip address. */
  nextHopIpAddress?: string;
}

/** VirtualHubRouteTableV2 Resource. */
export interface VirtualHubRouteTableV2Output extends SubResourceOutput {
  /** Properties of the virtual hub route table v2. */
  properties?: VirtualHubRouteTableV2PropertiesOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Parameters for VirtualHubRouteTableV2. */
export interface VirtualHubRouteTableV2PropertiesOutput {
  /** List of all routes. */
  routes?: Array<VirtualHubRouteV2Output>;
  /** List of all connections attached to this route table v2. */
  attachedConnections?: Array<string>;
  /** The provisioning state of the virtual hub route table v2 resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** VirtualHubRouteTableV2 route. */
export interface VirtualHubRouteV2Output {
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
export interface VirtualRouterAutoScaleConfigurationOutput {
  /** The minimum number of scale units for VirtualHub Router. */
  minCapacity?: number;
}

/** Result of the request to list VirtualHubs. It contains a list of VirtualHubs and a URL nextLink to get the next set of results. */
export interface ListVirtualHubsResultOutput {
  /** List of VirtualHubs. */
  value?: Array<VirtualHubOutput>;
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** The RouteMap child resource of a Virtual hub. */
export interface RouteMapOutput extends SubResourceOutput {
  /** Properties of the RouteMap resource. */
  properties?: RouteMapPropertiesOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  readonly name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Resource type. */
  readonly type?: string;
}

/** Properties of RouteMap resource */
export interface RouteMapPropertiesOutput {
  /** List of connections which have this RoutMap associated for inbound traffic. */
  associatedInboundConnections?: Array<string>;
  /** List of connections which have this RoutMap associated for outbound traffic. */
  associatedOutboundConnections?: Array<string>;
  /** List of RouteMap rules to be applied. */
  rules?: Array<RouteMapRuleOutput>;
  /** The provisioning state of the RouteMap resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** A RouteMap Rule. */
export interface RouteMapRuleOutput {
  /** The unique name for the rule. */
  name?: string;
  /** List of matching criterion which will be applied to traffic. */
  matchCriteria?: Array<CriterionOutput>;
  /** List of actions which will be applied on a match. */
  actions?: Array<ActionOutput>;
  /** Next step after rule is evaluated. Current supported behaviors are 'Continue'(to next rule) and 'Terminate'. */
  nextStepIfMatched?: "Unknown" | "Continue" | "Terminate";
}

/** A matching criteria which matches routes based on route prefix, community, and AS path. */
export interface CriterionOutput {
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
export interface ActionOutput {
  /** Type of action to be taken. Supported types are 'Remove', 'Add', 'Replace', and 'Drop.' */
  type?: "Unknown" | "Remove" | "Add" | "Replace" | "Drop";
  /** List of parameters relevant to the action.For instance if type is drop then parameters has list of prefixes to be dropped.If type is add, parameters would have list of ASN numbers to be added */
  parameters?: Array<ParameterOutput>;
}

/** Parameters for an Action. */
export interface ParameterOutput {
  /** List of route prefixes. */
  routePrefix?: Array<string>;
  /** List of BGP communities. */
  community?: Array<string>;
  /** List of AS paths. */
  asPath?: Array<string>;
}

/** List of RouteMaps and a URL nextLink to get the next set of results. */
export interface ListRouteMapsResultOutput {
  /** List of RouteMaps. */
  value?: Array<RouteMapOutput>;
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** HubVirtualNetworkConnection Resource. */
export interface HubVirtualNetworkConnectionOutput extends SubResourceOutput {
  /** Properties of the hub virtual network connection. */
  properties?: HubVirtualNetworkConnectionPropertiesOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Parameters for HubVirtualNetworkConnection. */
export interface HubVirtualNetworkConnectionPropertiesOutput {
  /** Reference to the remote virtual network. */
  remoteVirtualNetwork?: SubResourceOutput;
  /** Deprecated: VirtualHub to RemoteVnet transit to enabled or not. */
  allowHubToRemoteVnetTransit?: boolean;
  /** Deprecated: Allow RemoteVnet to use Virtual Hub's gateways. */
  allowRemoteVnetToUseHubVnetGateways?: boolean;
  /** Enable internet security. */
  enableInternetSecurity?: boolean;
  /** The Routing Configuration indicating the associated and propagated route tables on this connection. */
  routingConfiguration?: RoutingConfigurationOutput;
  /** The provisioning state of the hub virtual network connection resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** List of HubVirtualNetworkConnections and a URL nextLink to get the next set of results. */
export interface ListHubVirtualNetworkConnectionsResultOutput {
  /** List of HubVirtualNetworkConnections. */
  value?: Array<HubVirtualNetworkConnectionOutput>;
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** VpnGateway Resource. */
export interface VpnGatewayOutput extends ResourceOutput {
  /** Properties of the VPN gateway. */
  properties?: VpnGatewayPropertiesOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Parameters for VpnGateway. */
export interface VpnGatewayPropertiesOutput {
  /** The VirtualHub to which the gateway belongs. */
  virtualHub?: SubResourceOutput;
  /** List of all vpn connections to the gateway. */
  connections?: Array<VpnConnectionOutput>;
  /** Local network gateway's BGP speaker settings. */
  bgpSettings?: BgpSettingsOutput;
  /** The provisioning state of the VPN gateway resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The scale unit for this vpn gateway. */
  vpnGatewayScaleUnit?: number;
  /** List of all IPs configured on the gateway. */
  readonly ipConfigurations?: Array<VpnGatewayIpConfigurationOutput>;
  /** Enable BGP routes translation for NAT on this VpnGateway. */
  enableBgpRouteTranslationForNat?: boolean;
  /** Enable Routing Preference property for the Public IP Interface of the VpnGateway. */
  isRoutingPreferenceInternet?: boolean;
  /** List of all the nat Rules associated with the gateway. */
  natRules?: Array<VpnGatewayNatRuleOutput>;
}

/** VpnConnection Resource. */
export interface VpnConnectionOutput extends SubResourceOutput {
  /** Properties of the VPN connection. */
  properties?: VpnConnectionPropertiesOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Parameters for VpnConnection. */
export interface VpnConnectionPropertiesOutput {
  /** Id of the connected vpn site. */
  remoteVpnSite?: SubResourceOutput;
  /** Routing weight for vpn connection. */
  routingWeight?: number;
  /** DPD timeout in seconds for vpn connection. */
  dpdTimeoutSeconds?: number;
  /** The connection status. */
  readonly connectionStatus?: "Unknown" | "Connecting" | "Connected" | "NotConnected";
  /** Connection protocol used for this connection. */
  vpnConnectionProtocolType?: "IKEv2" | "IKEv1";
  /** Ingress bytes transferred. */
  readonly ingressBytesTransferred?: number;
  /** Egress bytes transferred. */
  readonly egressBytesTransferred?: number;
  /** Expected bandwidth in MBPS. */
  connectionBandwidth?: number;
  /** SharedKey for the vpn connection. */
  sharedKey?: string;
  /** EnableBgp flag. */
  enableBgp?: boolean;
  /** Enable policy-based traffic selectors. */
  usePolicyBasedTrafficSelectors?: boolean;
  /** The IPSec Policies to be considered by this connection. */
  ipsecPolicies?: Array<IpsecPolicyOutput>;
  /** The Traffic Selector Policies to be considered by this connection. */
  trafficSelectorPolicies?: Array<TrafficSelectorPolicyOutput>;
  /** EnableBgp flag. */
  enableRateLimiting?: boolean;
  /** Enable internet security. */
  enableInternetSecurity?: boolean;
  /** Use local azure ip to initiate connection. */
  useLocalAzureIpAddress?: boolean;
  /** The provisioning state of the VPN connection resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** List of all vpn site link connections to the gateway. */
  vpnLinkConnections?: Array<VpnSiteLinkConnectionOutput>;
  /** The Routing Configuration indicating the associated and propagated route tables on this connection. */
  routingConfiguration?: RoutingConfigurationOutput;
}

/** VpnSiteLinkConnection Resource. */
export interface VpnSiteLinkConnectionOutput extends SubResourceOutput {
  /** Properties of the VPN site link connection. */
  properties?: VpnSiteLinkConnectionPropertiesOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Resource type. */
  readonly type?: string;
}

/** Parameters for VpnConnection. */
export interface VpnSiteLinkConnectionPropertiesOutput {
  /** Id of the connected vpn site link. */
  vpnSiteLink?: SubResourceOutput;
  /** Routing weight for vpn connection. */
  routingWeight?: number;
  /** Vpn link connection mode. */
  vpnLinkConnectionMode?: "Default" | "ResponderOnly" | "InitiatorOnly";
  /** The connection status. */
  readonly connectionStatus?: "Unknown" | "Connecting" | "Connected" | "NotConnected";
  /** Connection protocol used for this connection. */
  vpnConnectionProtocolType?: "IKEv2" | "IKEv1";
  /** Ingress bytes transferred. */
  readonly ingressBytesTransferred?: number;
  /** Egress bytes transferred. */
  readonly egressBytesTransferred?: number;
  /** Expected bandwidth in MBPS. */
  connectionBandwidth?: number;
  /** SharedKey for the vpn connection. */
  sharedKey?: string;
  /** EnableBgp flag. */
  enableBgp?: boolean;
  /** vpnGatewayCustomBgpAddresses used by this connection. */
  vpnGatewayCustomBgpAddresses?: Array<GatewayCustomBgpIpAddressIpConfigurationOutput>;
  /** Enable policy-based traffic selectors. */
  usePolicyBasedTrafficSelectors?: boolean;
  /** The IPSec Policies to be considered by this connection. */
  ipsecPolicies?: Array<IpsecPolicyOutput>;
  /** EnableBgp flag. */
  enableRateLimiting?: boolean;
  /** Use local azure ip to initiate connection. */
  useLocalAzureIpAddress?: boolean;
  /** The provisioning state of the VPN site link connection resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** List of ingress NatRules. */
  ingressNatRules?: Array<SubResourceOutput>;
  /** List of egress NatRules. */
  egressNatRules?: Array<SubResourceOutput>;
}

/** IP Configuration of a VPN Gateway Resource. */
export interface VpnGatewayIpConfigurationOutput {
  /** The identifier of the IP configuration for a VPN Gateway. */
  id?: string;
  /** The public IP address of this IP configuration. */
  publicIpAddress?: string;
  /** The private IP address of this IP configuration. */
  privateIpAddress?: string;
}

/** VpnGatewayNatRule Resource. */
export interface VpnGatewayNatRuleOutput extends SubResourceOutput {
  /** Properties of the VpnGateway NAT rule. */
  properties?: VpnGatewayNatRulePropertiesOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Resource type. */
  readonly type?: string;
}

/** Parameters for VpnGatewayNatRule. */
export interface VpnGatewayNatRulePropertiesOutput {
  /** The provisioning state of the NAT Rule resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The type of NAT rule for VPN NAT. */
  type?: "Static" | "Dynamic";
  /** The Source NAT direction of a VPN NAT. */
  mode?: "EgressSnat" | "IngressSnat";
  /** The private IP address internal mapping for NAT. */
  internalMappings?: Array<VpnNatRuleMappingOutput>;
  /** The private IP address external mapping for NAT. */
  externalMappings?: Array<VpnNatRuleMappingOutput>;
  /** The IP Configuration ID this NAT rule applies to. */
  ipConfigurationId?: string;
  /** List of egress VpnSiteLinkConnections. */
  readonly egressVpnSiteLinkConnections?: Array<SubResourceOutput>;
  /** List of ingress VpnSiteLinkConnections. */
  readonly ingressVpnSiteLinkConnections?: Array<SubResourceOutput>;
}

/** Result of the request to list VpnGateways. It contains a list of VpnGateways and a URL nextLink to get the next set of results. */
export interface ListVpnGatewaysResultOutput {
  /** List of VpnGateways. */
  value?: Array<VpnGatewayOutput>;
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** Result of the request to list all vpn connections to a virtual wan vpn gateway. It contains a list of Vpn Connections and a URL nextLink to get the next set of results. */
export interface ListVpnConnectionsResultOutput {
  /** List of Vpn Connections. */
  value?: Array<VpnConnectionOutput>;
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** Result of the request to list all vpn connections to a virtual wan vpn gateway. It contains a list of Vpn Connections and a URL nextLink to get the next set of results. */
export interface ListVpnSiteLinkConnectionsResultOutput {
  /** List of VpnSiteLinkConnections. */
  value?: Array<VpnSiteLinkConnectionOutput>;
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** Result of the request to list all nat rules to a virtual wan vpn gateway. It contains a list of Nat rules and a URL nextLink to get the next set of results. */
export interface ListVpnGatewayNatRulesResultOutput {
  /** List of Nat Rules. */
  value?: Array<VpnGatewayNatRuleOutput>;
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** Result of the request to list P2SVpnGateways. It contains a list of P2SVpnGateways and a URL nextLink to get the next set of results. */
export interface ListP2SVpnGatewaysResultOutput {
  /** List of P2SVpnGateways. */
  value?: Array<P2SVpnGatewayOutput>;
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** Vpn Profile Response for package generation. */
export interface VpnProfileResponseOutput {
  /** URL to the VPN profile. */
  profileUrl?: string;
}

/** P2S Vpn connection detailed health written to sas url. */
export interface P2SVpnConnectionHealthOutput {
  /** Returned sas url of the blob to which the p2s vpn connection detailed health will be written. */
  sasUrl?: string;
}

/** VpnServerConfigurations list associated with VirtualWan Response. */
export interface VpnServerConfigurationsResponseOutput {
  /** List of VpnServerConfigurations associated with VirtualWan. */
  vpnServerConfigurationResourceIds?: Array<string>;
}

/** List of VirtualHubRouteTableV2s and a URL nextLink to get the next set of results. */
export interface ListVirtualHubRouteTableV2SResultOutput {
  /** List of VirtualHubRouteTableV2s. */
  value?: Array<VirtualHubRouteTableV2Output>;
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** List of ExpressRoute gateways. */
export interface ExpressRouteGatewayListOutput {
  /** List of ExpressRoute gateways. */
  value?: Array<ExpressRouteGatewayOutput>;
}

/** ExpressRoute gateway resource. */
export interface ExpressRouteGatewayOutput extends ResourceOutput {
  /** Properties of the express route gateway. */
  properties?: ExpressRouteGatewayPropertiesOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** ExpressRoute gateway resource properties. */
export interface ExpressRouteGatewayPropertiesOutput {
  /** Configuration for auto scaling. */
  autoScaleConfiguration?: ExpressRouteGatewayPropertiesAutoScaleConfigurationOutput;
  /** List of ExpressRoute connections to the ExpressRoute gateway. */
  expressRouteConnections?: Array<ExpressRouteConnectionOutput>;
  /** The provisioning state of the express route gateway resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The Virtual Hub where the ExpressRoute gateway is or will be deployed. */
  virtualHub: VirtualHubIdOutput;
}

/** Configuration for auto scaling. */
export interface ExpressRouteGatewayPropertiesAutoScaleConfigurationOutput {
  /** Minimum and maximum number of scale units to deploy. */
  bounds?: ExpressRouteGatewayPropertiesAutoScaleConfigurationBoundsOutput;
}

/** Minimum and maximum number of scale units to deploy. */
export interface ExpressRouteGatewayPropertiesAutoScaleConfigurationBoundsOutput {
  /** Minimum number of scale units deployed for ExpressRoute gateway. */
  min?: number;
  /** Maximum number of scale units deployed for ExpressRoute gateway. */
  max?: number;
}

/** ExpressRouteConnection resource. */
export interface ExpressRouteConnectionOutput extends SubResourceOutput {
  /** Properties of the express route connection. */
  properties?: ExpressRouteConnectionPropertiesOutput;
  /** The name of the resource. */
  name: string;
}

/** Properties of the ExpressRouteConnection subresource. */
export interface ExpressRouteConnectionPropertiesOutput {
  /** The provisioning state of the express route connection resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The ExpressRoute circuit peering. */
  expressRouteCircuitPeering: ExpressRouteCircuitPeeringIdOutput;
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
  routingConfiguration?: RoutingConfigurationOutput;
}

/** ExpressRoute circuit peering identifier. */
export interface ExpressRouteCircuitPeeringIdOutput {
  /** The ID of the ExpressRoute circuit peering. */
  id?: string;
}

/** Virtual Hub identifier. */
export interface VirtualHubIdOutput {
  /** The resource URI for the Virtual Hub where the ExpressRoute gateway is or will be deployed. The Virtual Hub resource and the ExpressRoute gateway resource reside in the same subscription. */
  id?: string;
}

/** ExpressRouteConnection list. */
export interface ExpressRouteConnectionListOutput {
  /** The list of ExpressRoute connections. */
  value?: Array<ExpressRouteConnectionOutput>;
}

/** Virtual Appliance Site resource. */
export interface BgpConnectionOutput extends SubResourceOutput {
  /** The properties of the Bgp connections. */
  properties?: BgpConnectionPropertiesOutput;
  /** Name of the connection. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Connection type. */
  readonly type?: string;
}

/** Properties of the bgp connection. */
export interface BgpConnectionPropertiesOutput {
  /** Peer ASN. */
  peerAsn?: number;
  /** Peer IP. */
  peerIp?: string;
  /** The reference to the HubVirtualNetworkConnection resource. */
  hubVirtualNetworkConnection?: SubResourceOutput;
  /** The provisioning state of the resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** The current state of the VirtualHub to Peer. */
  readonly connectionState?: "Unknown" | "Connecting" | "Connected" | "NotConnected";
}

/** VirtualHubBgpConnections list. */
export interface ListVirtualHubBgpConnectionResultsOutput {
  /** The list of VirtualHubBgpConnections. */
  value?: Array<BgpConnectionOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** List of virtual router peer routes. */
export interface PeerRouteListOutput {
  /** List of peer routes. */
  value?: Array<PeerRouteOutput>;
}

/** Peer routing details. */
export interface PeerRouteOutput {
  /** The peer's local address. */
  readonly localAddress?: string;
  /** The route's network prefix. */
  readonly network?: string;
  /** The route's next hop. */
  readonly nextHop?: string;
  /** The peer this route was learned from. */
  readonly sourcePeer?: string;
  /** The source this route was learned from. */
  readonly origin?: string;
  /** The route's AS path sequence. */
  readonly asPath?: string;
  /** The route's weight. */
  readonly weight?: number;
}

/** IpConfigurations. */
export interface HubIpConfigurationOutput extends SubResourceOutput {
  /** The properties of the Virtual Hub IPConfigurations. */
  properties?: HubIPConfigurationPropertiesFormatOutput;
  /** Name of the Ip Configuration. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Ipconfiguration type. */
  readonly type?: string;
}

/** Properties of IP configuration. */
export interface HubIPConfigurationPropertiesFormatOutput {
  /** The private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: "Static" | "Dynamic";
  /** The reference to the subnet resource. */
  subnet?: SubnetOutput;
  /** The reference to the public IP resource. */
  publicIPAddress?: PublicIPAddressOutput;
  /** The provisioning state of the IP configuration resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** VirtualHubIpConfigurations list. */
export interface ListVirtualHubIpConfigurationResultsOutput {
  /** The list of VirtualHubIpConfigurations. */
  value?: Array<HubIpConfigurationOutput>;
  /** URL to get the next set of results. */
  nextLink?: string;
}

/** RouteTable resource in a virtual hub. */
export interface HubRouteTableOutput extends SubResourceOutput {
  /** Properties of the RouteTable resource. */
  properties?: HubRouteTablePropertiesOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Resource type. */
  readonly type?: string;
}

/** Parameters for RouteTable. */
export interface HubRouteTablePropertiesOutput {
  /** List of all routes. */
  routes?: Array<HubRouteOutput>;
  /** List of labels associated with this route table. */
  labels?: Array<string>;
  /** List of all connections associated with this route table. */
  readonly associatedConnections?: Array<string>;
  /** List of all connections that advertise to this route table. */
  readonly propagatingConnections?: Array<string>;
  /** The provisioning state of the RouteTable resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** RouteTable route. */
export interface HubRouteOutput {
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

/** List of RouteTables and a URL nextLink to get the next set of results. */
export interface ListHubRouteTablesResultOutput {
  /** List of RouteTables. */
  value?: Array<HubRouteTableOutput>;
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** The routing intent child resource of a Virtual hub. */
export interface RoutingIntentOutput extends SubResourceOutput {
  /** Properties of the RoutingIntent resource. */
  properties?: RoutingIntentPropertiesOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Resource type. */
  readonly type?: string;
}

/** The properties of a RoutingIntent resource. */
export interface RoutingIntentPropertiesOutput {
  /** List of routing policies. */
  routingPolicies?: Array<RoutingPolicyOutput>;
  /** The provisioning state of the RoutingIntent resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** The routing policy object used in a RoutingIntent resource. */
export interface RoutingPolicyOutput {
  /** The unique name for the routing policy. */
  name: string;
  /** List of all destinations which this routing policy is applicable to (for example: Internet, PrivateTraffic). */
  destinations: Array<string>;
  /** The next hop resource id on which this routing policy is applicable to. */
  nextHop: string;
}

/** List of the routing intent result and a URL nextLink to get the next set of results. */
export interface ListRoutingIntentResultOutput {
  /** List of RoutingIntent resource. */
  value?: Array<RoutingIntentOutput>;
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** Result of the request to list WebApplicationFirewallPolicies. It contains a list of WebApplicationFirewallPolicy objects and a URL link to get the next set of results. */
export interface WebApplicationFirewallPolicyListResultOutput {
  /** List of WebApplicationFirewallPolicies within a resource group. */
  readonly value?: Array<WebApplicationFirewallPolicyOutput>;
  /** URL to get the next set of WebApplicationFirewallPolicy objects if there are any. */
  readonly nextLink?: string;
}

/** Defines web application firewall policy. */
export interface WebApplicationFirewallPolicyOutput extends ResourceOutput {
  /** Properties of the web application firewall policy. */
  properties?: WebApplicationFirewallPolicyPropertiesFormatOutput;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Defines web application firewall policy properties. */
export interface WebApplicationFirewallPolicyPropertiesFormatOutput {
  /** The PolicySettings for policy. */
  policySettings?: PolicySettingsOutput;
  /** The custom rules inside the policy. */
  customRules?: Array<WebApplicationFirewallCustomRuleOutput>;
  /** A collection of references to application gateways. */
  readonly applicationGateways?: Array<ApplicationGatewayOutput>;
  /** The provisioning state of the web application firewall policy resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
  /** Resource status of the policy. */
  readonly resourceState?:
    | "Creating"
    | "Enabling"
    | "Enabled"
    | "Disabling"
    | "Disabled"
    | "Deleting";
  /** Describes the managedRules structure. */
  managedRules: ManagedRulesDefinitionOutput;
  /** A collection of references to application gateway http listeners. */
  readonly httpListeners?: Array<SubResourceOutput>;
  /** A collection of references to application gateway path rules. */
  readonly pathBasedRules?: Array<SubResourceOutput>;
}

/** Defines contents of a web application firewall global configuration. */
export interface PolicySettingsOutput {
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
export interface WebApplicationFirewallCustomRuleOutput {
  /** The name of the resource that is unique within a policy. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Priority of the rule. Rules with a lower value will be evaluated before rules with a higher value. */
  priority: number;
  /** The rule type. */
  ruleType: "MatchRule" | "Invalid";
  /** List of match conditions. */
  matchConditions: Array<MatchConditionOutput>;
  /** Type of Actions. */
  action: "Allow" | "Block" | "Log";
}

/** Define match conditions. */
export interface MatchConditionOutput {
  /** List of match variables. */
  matchVariables: Array<MatchVariableOutput>;
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
export interface MatchVariableOutput {
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
export interface ManagedRulesDefinitionOutput {
  /** The Exclusions that are applied on the policy. */
  exclusions?: Array<OwaspCrsExclusionEntryOutput>;
  /** The managed rule sets that are associated with the policy. */
  managedRuleSets: Array<ManagedRuleSetOutput>;
}

/** Allow to exclude some variable satisfy the condition for the WAF check. */
export interface OwaspCrsExclusionEntryOutput {
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
  exclusionManagedRuleSets?: Array<ExclusionManagedRuleSetOutput>;
}

/** Defines a managed rule set for Exclusions. */
export interface ExclusionManagedRuleSetOutput {
  /** Defines the rule set type to use. */
  ruleSetType: string;
  /** Defines the version of the rule set to use. */
  ruleSetVersion: string;
  /** Defines the rule groups to apply to the rule set. */
  ruleGroups?: Array<ExclusionManagedRuleGroupOutput>;
}

/** Defines a managed rule group to use for exclusion. */
export interface ExclusionManagedRuleGroupOutput {
  /** The managed rule group for exclusion. */
  ruleGroupName: string;
  /** List of rules that will be excluded. If none specified, all rules in the group will be excluded. */
  rules?: Array<ExclusionManagedRuleOutput>;
}

/** Defines a managed rule to use for exclusion. */
export interface ExclusionManagedRuleOutput {
  /** Identifier for the managed rule. */
  ruleId: string;
}

/** Defines a managed rule set. */
export interface ManagedRuleSetOutput {
  /** Defines the rule set type to use. */
  ruleSetType: string;
  /** Defines the version of the rule set to use. */
  ruleSetVersion: string;
  /** Defines the rule group overrides to apply to the rule set. */
  ruleGroupOverrides?: Array<ManagedRuleGroupOverrideOutput>;
}

/** Defines a managed rule group override setting. */
export interface ManagedRuleGroupOverrideOutput {
  /** The managed rule group to override. */
  ruleGroupName: string;
  /** List of rules that will be disabled. If none specified, all rules in the group will be disabled. */
  rules?: Array<ManagedRuleOverrideOutput>;
}

/** Defines a managed rule group override setting. */
export interface ManagedRuleOverrideOutput {
  /** Identifier for the managed rule. */
  ruleId: string;
  /** The state of the managed rule. Defaults to Disabled if not specified. */
  state?: "Disabled" | "Enabled";
  /** Describes the override action to be applied when rule matches. */
  action?: "AnomalyScoring" | "Allow" | "Block" | "Log";
}

/** SwapResource to represent slot type on the specified cloud service. */
export interface SwapResourceOutput {
  /** Resource Id. */
  readonly id?: string;
  /** Resource name. */
  readonly name?: string;
  /** Resource type. */
  readonly type?: string;
  /** Swap resource properties */
  properties?: SwapResourcePropertiesOutput;
}

/** Swap resource properties */
export interface SwapResourcePropertiesOutput {
  /** Specifies slot info on a cloud service */
  slotType?: "Production" | "Staging";
}

/** SwapResource List with single entry to represent slot type on the specified cloud service. */
export interface SwapResourceListResultOutput {
  value?: Array<SwapResourceOutput>;
}

/** Firewall Policy NAT Rule Collection. */
export interface FirewallPolicyNatRuleCollectionOutput extends FirewallPolicyRuleCollectionOutputParent {
  /** The action type of a Nat rule collection. */
  action?: FirewallPolicyNatRuleCollectionActionOutput;
  /** List of rules included in a rule collection. */
  rules?: Array<FirewallPolicyRuleOutput>;
  ruleCollectionType: "FirewallPolicyNatRuleCollection";
}

/** Properties of the FirewallPolicyNatRuleCollectionAction. */
export interface FirewallPolicyNatRuleCollectionActionOutput {
  /** The type of action. */
  type?: "DNAT";
}

/** Properties of a rule. */
export interface FirewallPolicyRuleOutputParent {
  /** Name of the rule. */
  name?: string;
  /** Description of the rule. */
  description?: string;
  ruleType: "FirewallPolicyRule" | "ApplicationRule" | "NatRule" | "NetworkRule";
}

/** Firewall Policy Filter Rule Collection. */
export interface FirewallPolicyFilterRuleCollectionOutput extends FirewallPolicyRuleCollectionOutputParent {
  /** The action type of a Filter rule collection. */
  action?: FirewallPolicyFilterRuleCollectionActionOutput;
  /** List of rules included in a rule collection. */
  rules?: Array<FirewallPolicyRuleOutput>;
  ruleCollectionType: "FirewallPolicyFilterRuleCollection";
}

/** Properties of the FirewallPolicyFilterRuleCollectionAction. */
export interface FirewallPolicyFilterRuleCollectionActionOutput {
  /** The type of action. */
  type?: "Allow" | "Deny";
}

/** Rule of type application. */
export interface ApplicationRuleOutput extends FirewallPolicyRuleOutputParent {
  /** List of source IP addresses for this rule. */
  sourceAddresses?: Array<string>;
  /** List of destination IP addresses or Service Tags. */
  destinationAddresses?: Array<string>;
  /** Array of Application Protocols. */
  protocols?: Array<FirewallPolicyRuleApplicationProtocolOutput>;
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
export interface FirewallPolicyRuleApplicationProtocolOutput {
  /** Protocol type. */
  protocolType?: "Http" | "Https";
  /** Port number for the protocol, cannot be greater than 64000. */
  port?: number;
}

/** Rule of type nat. */
export interface NatRuleOutput extends FirewallPolicyRuleOutputParent {
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
export interface NetworkRuleOutput extends FirewallPolicyRuleOutputParent {
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

/** Network admin rule. */
export interface ActiveSecurityAdminRuleOutput extends ActiveBaseSecurityAdminRuleOutputParent {
  /** Indicates the properties of the security admin rule */
  properties?: AdminPropertiesFormatOutput;
  kind: "Custom";
}

/** Security admin rule resource. */
export interface AdminPropertiesFormatOutput {
  /** A description for this rule. Restricted to 140 chars. */
  description?: string;
  /** Network protocol this rule applies to. */
  protocol: "Tcp" | "Udp" | "Icmp" | "Esp" | "Any" | "Ah";
  /** The CIDR or source IP ranges. */
  sources?: Array<AddressPrefixItemOutput>;
  /** The destination address prefixes. CIDR or destination IP ranges. */
  destinations?: Array<AddressPrefixItemOutput>;
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
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Address prefix item. */
export interface AddressPrefixItemOutput {
  /** Address prefix. */
  addressPrefix?: string;
  /** Address prefix type. */
  addressPrefixType?: "IPPrefix" | "ServiceTag";
}

/** Network default admin rule. */
export interface ActiveDefaultSecurityAdminRuleOutput extends ActiveBaseSecurityAdminRuleOutputParent {
  /** Indicates the properties of the default security admin rule */
  properties?: DefaultAdminPropertiesFormatOutput;
  kind: "Default";
}

/** Security default admin rule resource. */
export interface DefaultAdminPropertiesFormatOutput {
  /** A description for this rule. Restricted to 140 chars. */
  readonly description?: string;
  /** Default rule flag. */
  flag?: string;
  /** Network protocol this rule applies to. */
  readonly protocol?: "Tcp" | "Udp" | "Icmp" | "Esp" | "Any" | "Ah";
  /** The CIDR or source IP ranges. */
  readonly sources?: Array<AddressPrefixItemOutput>;
  /** The destination address prefixes. CIDR or destination IP ranges. */
  readonly destinations?: Array<AddressPrefixItemOutput>;
  /** The source port ranges. */
  readonly sourcePortRanges?: Array<string>;
  /** The destination port ranges. */
  readonly destinationPortRanges?: Array<string>;
  /** Indicates the access allowed for this particular rule */
  readonly access?: "Allow" | "Deny" | "AlwaysAllow";
  /** The priority of the rule. The value can be between 1 and 4096. The priority number must be unique for each rule in the collection. The lower the priority number, the higher the priority of the rule. */
  readonly priority?: number;
  /** Indicates if the traffic matched against the rule in inbound or outbound. */
  readonly direction?: "Inbound" | "Outbound";
  /** The provisioning state of the resource. */
  readonly provisioningState?: "Succeeded" | "Updating" | "Deleting" | "Failed";
}

/** Network admin rule. */
export interface EffectiveSecurityAdminRuleOutput extends EffectiveBaseSecurityAdminRuleOutputParent {
  /** Indicates the properties of the security admin rule */
  properties?: AdminPropertiesFormatOutput;
  kind: "Custom";
}

/** Network default admin rule. */
export interface EffectiveDefaultSecurityAdminRuleOutput extends EffectiveBaseSecurityAdminRuleOutputParent {
  /** Indicates the properties of the default security admin rule */
  properties?: DefaultAdminPropertiesFormatOutput;
  kind: "Default";
}

/** Network admin rule. */
export interface AdminRuleOutput extends BaseAdminRuleOutputParent {
  /** Indicates the properties of the security admin rule */
  properties?: AdminPropertiesFormatOutput;
  kind: "Custom";
}

/** Network default admin rule. */
export interface DefaultAdminRuleOutput extends BaseAdminRuleOutputParent {
  /** Indicates the properties of the security admin rule */
  properties?: DefaultAdminPropertiesFormatOutput;
  kind: "Default";
}

/** Route Filter Rule Resource. */
export interface PatchRouteFilterRuleOutput extends SubResourceOutput {
  /** Properties of the route filter rule. */
  properties?: RouteFilterRulePropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  readonly name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
}

/** Route Filter Resource. */
export interface PatchRouteFilterOutput extends SubResourceOutput {
  /** Properties of the route filter. */
  properties?: RouteFilterPropertiesFormatOutput;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  readonly name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Resource type. */
  readonly type?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** Properties of the rule collection. */
export type FirewallPolicyRuleCollectionOutput =
  | FirewallPolicyNatRuleCollectionOutput
  | FirewallPolicyFilterRuleCollectionOutput;
/** Network base admin rule. */
export type ActiveBaseSecurityAdminRuleOutput =
  | ActiveSecurityAdminRuleOutput
  | ActiveDefaultSecurityAdminRuleOutput;
/** Network base admin rule. */
export type EffectiveBaseSecurityAdminRuleOutput =
  | EffectiveSecurityAdminRuleOutput
  | EffectiveDefaultSecurityAdminRuleOutput;
/** Network base admin rule. */
export type BaseAdminRuleOutput = AdminRuleOutput | DefaultAdminRuleOutput;
/** Properties of a rule. */
export type FirewallPolicyRuleOutput = ApplicationRuleOutput | NatRuleOutput | NetworkRuleOutput;
