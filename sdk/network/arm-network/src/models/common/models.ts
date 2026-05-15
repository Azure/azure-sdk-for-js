// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Common resource representation. */
export interface Resource {
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

export function resourceSerializer(item: Resource): any {
  return { id: item["id"], location: item["location"], tags: item["tags"] };
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** An error response from the service. */
export interface CloudError {
  /** Cloud error body. */
  error?: CloudErrorBody;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cloudErrorBodyDeserializer(item["error"]),
  };
}

/** An error response from the service. */
export interface CloudErrorBody {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  code?: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message?: string;
  /** The target of the particular error. For example, the name of the property in error. */
  target?: string;
  /** A list of additional details about the error. */
  details?: CloudErrorBody[];
}

export function cloudErrorBodyDeserializer(item: any): CloudErrorBody {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : cloudErrorBodyArrayDeserializer(item["details"]),
  };
}

export function cloudErrorBodyArrayDeserializer(result: Array<CloudErrorBody>): any[] {
  return result.map((item) => {
    return cloudErrorBodyDeserializer(item);
  });
}

/** Provisioning states of a resource. */
export enum KnownProvisioningState {
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * Provisioning states of a resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Failed**: Failed \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting
 */
export type ProvisioningState = string;

export function applicationGatewayIPConfigurationArraySerializer(
  result: Array<ApplicationGatewayIPConfiguration>,
): any[] {
  return result.map((item) => {
    return applicationGatewayIPConfigurationSerializer(item);
  });
}

export function applicationGatewayIPConfigurationArrayDeserializer(
  result: Array<ApplicationGatewayIPConfiguration>,
): any[] {
  return result.map((item) => {
    return applicationGatewayIPConfigurationDeserializer(item);
  });
}

/** IP configuration of an application gateway. Currently 1 public and 1 private IP configuration is allowed. */
export interface ApplicationGatewayIPConfiguration extends SubResource {
  /** Name of the IP configuration that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
  /** Reference to the subnet resource. A subnet from where application gateway gets its private address. */
  subnet?: SubResource;
  /** The provisioning state of the application gateway IP configuration resource. */
  readonly provisioningState?: ProvisioningState;
}

export function applicationGatewayIPConfigurationSerializer(
  item: ApplicationGatewayIPConfiguration,
): any {
  return {
    id: item["id"],
    properties: areAllPropsUndefined(item, ["subnet"])
      ? undefined
      : _applicationGatewayIPConfigurationPropertiesSerializer(item),
    name: item["name"],
  };
}

export function applicationGatewayIPConfigurationDeserializer(
  item: any,
): ApplicationGatewayIPConfiguration {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _applicationGatewayIPConfigurationPropertiesDeserializer(item["properties"])),
    name: item["name"],
    etag: item["etag"],
    type: item["type"],
  };
}

/** Properties of IP configuration of an application gateway. */
export interface ApplicationGatewayIPConfigurationPropertiesFormat {
  /** Reference to the subnet resource. A subnet from where application gateway gets its private address. */
  subnet?: SubResource;
  /** The provisioning state of the application gateway IP configuration resource. */
  readonly provisioningState?: ProvisioningState;
}

export function applicationGatewayIPConfigurationPropertiesFormatSerializer(
  item: ApplicationGatewayIPConfigurationPropertiesFormat,
): any {
  return { subnet: !item["subnet"] ? item["subnet"] : subResourceSerializer(item["subnet"]) };
}

export function applicationGatewayIPConfigurationPropertiesFormatDeserializer(
  item: any,
): ApplicationGatewayIPConfigurationPropertiesFormat {
  return {
    subnet: !item["subnet"] ? item["subnet"] : subResourceDeserializer(item["subnet"]),
    provisioningState: item["provisioningState"],
  };
}

/** Reference to another subresource. */
export interface SubResource {
  /** Resource ID. */
  id?: string;
}

export function subResourceSerializer(item: SubResource): any {
  return { id: item["id"] };
}

export function subResourceDeserializer(item: any): SubResource {
  return {
    id: item["id"],
  };
}

/** IP address allocation method. */
export enum KnownIPAllocationMethod {
  /** Static */
  Static = "Static",
  /** Dynamic */
  Dynamic = "Dynamic",
}

/**
 * IP address allocation method. \
 * {@link KnownIPAllocationMethod} can be used interchangeably with IPAllocationMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Static**: Static \
 * **Dynamic**: Dynamic
 */
export type IPAllocationMethod = string;

export function applicationGatewayBackendAddressPoolArraySerializer(
  result: Array<ApplicationGatewayBackendAddressPool>,
): any[] {
  return result.map((item) => {
    return applicationGatewayBackendAddressPoolSerializer(item);
  });
}

export function applicationGatewayBackendAddressPoolArrayDeserializer(
  result: Array<ApplicationGatewayBackendAddressPool>,
): any[] {
  return result.map((item) => {
    return applicationGatewayBackendAddressPoolDeserializer(item);
  });
}

/** Backend Address Pool of an application gateway. */
export interface ApplicationGatewayBackendAddressPool extends SubResource {
  /** Name of the backend address pool that is unique within an Application Gateway. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
  /** Collection of references to IPs defined in network interfaces. */
  readonly backendIPConfigurations?: NetworkInterfaceIPConfiguration[];
  /** Backend addresses. */
  backendAddresses?: ApplicationGatewayBackendAddress[];
  /** The provisioning state of the backend address pool resource. */
  readonly provisioningState?: ProvisioningState;
}

export function applicationGatewayBackendAddressPoolSerializer(
  item: ApplicationGatewayBackendAddressPool,
): any {
  return {
    id: item["id"],
    properties: areAllPropsUndefined(item, ["backendAddresses"])
      ? undefined
      : _applicationGatewayBackendAddressPoolPropertiesSerializer(item),
    name: item["name"],
  };
}

export function applicationGatewayBackendAddressPoolDeserializer(
  item: any,
): ApplicationGatewayBackendAddressPool {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _applicationGatewayBackendAddressPoolPropertiesDeserializer(item["properties"])),
    name: item["name"],
    etag: item["etag"],
    type: item["type"],
  };
}

/** Properties of Backend Address Pool of an application gateway. */
export interface ApplicationGatewayBackendAddressPoolPropertiesFormat {
  /** Collection of references to IPs defined in network interfaces. */
  readonly backendIPConfigurations?: NetworkInterfaceIPConfiguration[];
  /** Backend addresses. */
  backendAddresses?: ApplicationGatewayBackendAddress[];
  /** The provisioning state of the backend address pool resource. */
  readonly provisioningState?: ProvisioningState;
}

export function applicationGatewayBackendAddressPoolPropertiesFormatSerializer(
  item: ApplicationGatewayBackendAddressPoolPropertiesFormat,
): any {
  return {
    backendAddresses: !item["backendAddresses"]
      ? item["backendAddresses"]
      : applicationGatewayBackendAddressArraySerializer(item["backendAddresses"]),
  };
}

export function applicationGatewayBackendAddressPoolPropertiesFormatDeserializer(
  item: any,
): ApplicationGatewayBackendAddressPoolPropertiesFormat {
  return {
    backendIPConfigurations: !item["backendIPConfigurations"]
      ? item["backendIPConfigurations"]
      : networkInterfaceIPConfigurationArrayDeserializer(item["backendIPConfigurations"]),
    backendAddresses: !item["backendAddresses"]
      ? item["backendAddresses"]
      : applicationGatewayBackendAddressArrayDeserializer(item["backendAddresses"]),
    provisioningState: item["provisioningState"],
  };
}

export function networkInterfaceIPConfigurationArraySerializer(
  result: Array<NetworkInterfaceIPConfiguration>,
): any[] {
  return result.map((item) => {
    return networkInterfaceIPConfigurationSerializer(item);
  });
}

export function networkInterfaceIPConfigurationArrayDeserializer(
  result: Array<NetworkInterfaceIPConfiguration>,
): any[] {
  return result.map((item) => {
    return networkInterfaceIPConfigurationDeserializer(item);
  });
}

/** IPConfiguration in a network interface. */
export interface NetworkInterfaceIPConfiguration extends SubResourceModel {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The reference to gateway load balancer frontend IP. */
  gatewayLoadBalancer?: SubResource;
  /** The reference to Virtual Network Taps. */
  virtualNetworkTaps?: VirtualNetworkTap[];
  /** The reference to ApplicationGatewayBackendAddressPool resource. */
  applicationGatewayBackendAddressPools?: ApplicationGatewayBackendAddressPool[];
  /** The reference to LoadBalancerBackendAddressPool resource. */
  loadBalancerBackendAddressPools?: BackendAddressPool[];
  /** A list of references of LoadBalancerInboundNatRules. */
  loadBalancerInboundNatRules?: InboundNatRule[];
  /** Private IP address of the IP configuration. It can be a single IP address or a CIDR block in the format <address>/<prefix-length>. */
  privateIPAddress?: string;
  /** The private IP address prefix length. If specified and the allocation method is dynamic, the service will allocate a CIDR block instead of a single IP address. */
  privateIPAddressPrefixLength?: number;
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: IPAllocationMethod;
  /** Whether the specific IP configuration is IPv4 or IPv6. Default is IPv4. */
  privateIPAddressVersion?: IPVersion;
  /** Subnet bound to the IP configuration. */
  subnet?: Subnet;
  /** Whether this is a primary customer address on the network interface. */
  primary?: boolean;
  /** Public IP address bound to the IP configuration. */
  publicIPAddress?: PublicIPAddress;
  /** Application security groups in which the IP configuration is included. */
  applicationSecurityGroups?: ApplicationSecurityGroup[];
  /** The provisioning state of the network interface IP configuration. */
  readonly provisioningState?: ProvisioningState;
  /** PrivateLinkConnection properties for the network interface. */
  readonly privateLinkConnectionProperties?: NetworkInterfaceIPConfigurationPrivateLinkConnectionProperties;
}

export function networkInterfaceIPConfigurationSerializer(
  item: NetworkInterfaceIPConfiguration,
): any {
  return {
    name: item["name"],
    id: item["id"],
    properties: areAllPropsUndefined(item, [
      "gatewayLoadBalancer",
      "virtualNetworkTaps",
      "applicationGatewayBackendAddressPools",
      "loadBalancerBackendAddressPools",
      "loadBalancerInboundNatRules",
      "privateIPAddress",
      "privateIPAddressPrefixLength",
      "privateIPAllocationMethod",
      "privateIPAddressVersion",
      "subnet",
      "primary",
      "publicIPAddress",
      "applicationSecurityGroups",
    ])
      ? undefined
      : _networkInterfaceIPConfigurationPropertiesSerializer(item),
  };
}

export function networkInterfaceIPConfigurationDeserializer(
  item: any,
): NetworkInterfaceIPConfiguration {
  return {
    name: item["name"],
    type: item["type"],
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _networkInterfaceIPConfigurationPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Properties of IP configuration. */
export interface NetworkInterfaceIPConfigurationPropertiesFormat {
  /** The reference to gateway load balancer frontend IP. */
  gatewayLoadBalancer?: SubResource;
  /** The reference to Virtual Network Taps. */
  virtualNetworkTaps?: VirtualNetworkTap[];
  /** The reference to ApplicationGatewayBackendAddressPool resource. */
  applicationGatewayBackendAddressPools?: ApplicationGatewayBackendAddressPool[];
  /** The reference to LoadBalancerBackendAddressPool resource. */
  loadBalancerBackendAddressPools?: BackendAddressPool[];
  /** A list of references of LoadBalancerInboundNatRules. */
  loadBalancerInboundNatRules?: InboundNatRule[];
  /** Private IP address of the IP configuration. It can be a single IP address or a CIDR block in the format <address>/<prefix-length>. */
  privateIPAddress?: string;
  /** The private IP address prefix length. If specified and the allocation method is dynamic, the service will allocate a CIDR block instead of a single IP address. */
  privateIPAddressPrefixLength?: number;
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: IPAllocationMethod;
  /** Whether the specific IP configuration is IPv4 or IPv6. Default is IPv4. */
  privateIPAddressVersion?: IPVersion;
  /** Subnet bound to the IP configuration. */
  subnet?: Subnet;
  /** Whether this is a primary customer address on the network interface. */
  primary?: boolean;
  /** Public IP address bound to the IP configuration. */
  publicIPAddress?: PublicIPAddress;
  /** Application security groups in which the IP configuration is included. */
  applicationSecurityGroups?: ApplicationSecurityGroup[];
  /** The provisioning state of the network interface IP configuration. */
  readonly provisioningState?: ProvisioningState;
  /** PrivateLinkConnection properties for the network interface. */
  readonly privateLinkConnectionProperties?: NetworkInterfaceIPConfigurationPrivateLinkConnectionProperties;
}

export function networkInterfaceIPConfigurationPropertiesFormatSerializer(
  item: NetworkInterfaceIPConfigurationPropertiesFormat,
): any {
  return {
    gatewayLoadBalancer: !item["gatewayLoadBalancer"]
      ? item["gatewayLoadBalancer"]
      : subResourceSerializer(item["gatewayLoadBalancer"]),
    virtualNetworkTaps: !item["virtualNetworkTaps"]
      ? item["virtualNetworkTaps"]
      : virtualNetworkTapArraySerializer(item["virtualNetworkTaps"]),
    applicationGatewayBackendAddressPools: !item["applicationGatewayBackendAddressPools"]
      ? item["applicationGatewayBackendAddressPools"]
      : applicationGatewayBackendAddressPoolArraySerializer(
          item["applicationGatewayBackendAddressPools"],
        ),
    loadBalancerBackendAddressPools: !item["loadBalancerBackendAddressPools"]
      ? item["loadBalancerBackendAddressPools"]
      : backendAddressPoolArraySerializer(item["loadBalancerBackendAddressPools"]),
    loadBalancerInboundNatRules: !item["loadBalancerInboundNatRules"]
      ? item["loadBalancerInboundNatRules"]
      : inboundNatRuleArraySerializer(item["loadBalancerInboundNatRules"]),
    privateIPAddress: item["privateIPAddress"],
    privateIPAddressPrefixLength: item["privateIPAddressPrefixLength"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    privateIPAddressVersion: item["privateIPAddressVersion"],
    subnet: !item["subnet"] ? item["subnet"] : subnetSerializer(item["subnet"]),
    primary: item["primary"],
    publicIPAddress: !item["publicIPAddress"]
      ? item["publicIPAddress"]
      : publicIPAddressSerializer(item["publicIPAddress"]),
    applicationSecurityGroups: !item["applicationSecurityGroups"]
      ? item["applicationSecurityGroups"]
      : applicationSecurityGroupArraySerializer(item["applicationSecurityGroups"]),
  };
}

export function networkInterfaceIPConfigurationPropertiesFormatDeserializer(
  item: any,
): NetworkInterfaceIPConfigurationPropertiesFormat {
  return {
    gatewayLoadBalancer: !item["gatewayLoadBalancer"]
      ? item["gatewayLoadBalancer"]
      : subResourceDeserializer(item["gatewayLoadBalancer"]),
    virtualNetworkTaps: !item["virtualNetworkTaps"]
      ? item["virtualNetworkTaps"]
      : virtualNetworkTapArrayDeserializer(item["virtualNetworkTaps"]),
    applicationGatewayBackendAddressPools: !item["applicationGatewayBackendAddressPools"]
      ? item["applicationGatewayBackendAddressPools"]
      : applicationGatewayBackendAddressPoolArrayDeserializer(
          item["applicationGatewayBackendAddressPools"],
        ),
    loadBalancerBackendAddressPools: !item["loadBalancerBackendAddressPools"]
      ? item["loadBalancerBackendAddressPools"]
      : backendAddressPoolArrayDeserializer(item["loadBalancerBackendAddressPools"]),
    loadBalancerInboundNatRules: !item["loadBalancerInboundNatRules"]
      ? item["loadBalancerInboundNatRules"]
      : inboundNatRuleArrayDeserializer(item["loadBalancerInboundNatRules"]),
    privateIPAddress: item["privateIPAddress"],
    privateIPAddressPrefixLength: item["privateIPAddressPrefixLength"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    privateIPAddressVersion: item["privateIPAddressVersion"],
    subnet: !item["subnet"] ? item["subnet"] : subnetDeserializer(item["subnet"]),
    primary: item["primary"],
    publicIPAddress: !item["publicIPAddress"]
      ? item["publicIPAddress"]
      : publicIPAddressDeserializer(item["publicIPAddress"]),
    applicationSecurityGroups: !item["applicationSecurityGroups"]
      ? item["applicationSecurityGroups"]
      : applicationSecurityGroupArrayDeserializer(item["applicationSecurityGroups"]),
    provisioningState: item["provisioningState"],
    privateLinkConnectionProperties: !item["privateLinkConnectionProperties"]
      ? item["privateLinkConnectionProperties"]
      : networkInterfaceIPConfigurationPrivateLinkConnectionPropertiesDeserializer(
          item["privateLinkConnectionProperties"],
        ),
  };
}

export function virtualNetworkTapArraySerializer(result: Array<VirtualNetworkTap>): any[] {
  return result.map((item) => {
    return virtualNetworkTapSerializer(item);
  });
}

export function virtualNetworkTapArrayDeserializer(result: Array<VirtualNetworkTap>): any[] {
  return result.map((item) => {
    return virtualNetworkTapDeserializer(item);
  });
}

/** Virtual Network Tap resource. */
export interface VirtualNetworkTap extends Resource {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Specifies the list of resource IDs for the network interface IP configuration that needs to be tapped. */
  readonly networkInterfaceTapConfigurations?: NetworkInterfaceTapConfiguration[];
  /** The resource GUID property of the virtual network tap resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the virtual network tap resource. */
  readonly provisioningState?: ProvisioningState;
  /** The reference to the private IP Address of the collector nic that will receive the tap. */
  destinationNetworkInterfaceIPConfiguration?: NetworkInterfaceIPConfiguration;
  /** The reference to the private IP address on the internal Load Balancer that will receive the tap. */
  destinationLoadBalancerFrontEndIPConfiguration?: FrontendIPConfiguration;
  /** The VXLAN destination port that will receive the tapped traffic. */
  destinationPort?: number;
}

export function virtualNetworkTapSerializer(item: VirtualNetworkTap): any {
  return {
    id: item["id"],
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "destinationNetworkInterfaceIPConfiguration",
      "destinationLoadBalancerFrontEndIPConfiguration",
      "destinationPort",
    ])
      ? undefined
      : _virtualNetworkTapPropertiesSerializer(item),
  };
}

export function virtualNetworkTapDeserializer(item: any): VirtualNetworkTap {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _virtualNetworkTapPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Virtual Network Tap properties. */
export interface VirtualNetworkTapPropertiesFormat {
  /** Specifies the list of resource IDs for the network interface IP configuration that needs to be tapped. */
  readonly networkInterfaceTapConfigurations?: NetworkInterfaceTapConfiguration[];
  /** The resource GUID property of the virtual network tap resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the virtual network tap resource. */
  readonly provisioningState?: ProvisioningState;
  /** The reference to the private IP Address of the collector nic that will receive the tap. */
  destinationNetworkInterfaceIPConfiguration?: NetworkInterfaceIPConfiguration;
  /** The reference to the private IP address on the internal Load Balancer that will receive the tap. */
  destinationLoadBalancerFrontEndIPConfiguration?: FrontendIPConfiguration;
  /** The VXLAN destination port that will receive the tapped traffic. */
  destinationPort?: number;
}

export function virtualNetworkTapPropertiesFormatSerializer(
  item: VirtualNetworkTapPropertiesFormat,
): any {
  return {
    destinationNetworkInterfaceIPConfiguration: !item["destinationNetworkInterfaceIPConfiguration"]
      ? item["destinationNetworkInterfaceIPConfiguration"]
      : networkInterfaceIPConfigurationSerializer(
          item["destinationNetworkInterfaceIPConfiguration"],
        ),
    destinationLoadBalancerFrontEndIPConfiguration: !item[
      "destinationLoadBalancerFrontEndIPConfiguration"
    ]
      ? item["destinationLoadBalancerFrontEndIPConfiguration"]
      : frontendIPConfigurationSerializer(item["destinationLoadBalancerFrontEndIPConfiguration"]),
    destinationPort: item["destinationPort"],
  };
}

export function virtualNetworkTapPropertiesFormatDeserializer(
  item: any,
): VirtualNetworkTapPropertiesFormat {
  return {
    networkInterfaceTapConfigurations: !item["networkInterfaceTapConfigurations"]
      ? item["networkInterfaceTapConfigurations"]
      : networkInterfaceTapConfigurationArrayDeserializer(
          item["networkInterfaceTapConfigurations"],
        ),
    resourceGuid: item["resourceGuid"],
    provisioningState: item["provisioningState"],
    destinationNetworkInterfaceIPConfiguration: !item["destinationNetworkInterfaceIPConfiguration"]
      ? item["destinationNetworkInterfaceIPConfiguration"]
      : networkInterfaceIPConfigurationDeserializer(
          item["destinationNetworkInterfaceIPConfiguration"],
        ),
    destinationLoadBalancerFrontEndIPConfiguration: !item[
      "destinationLoadBalancerFrontEndIPConfiguration"
    ]
      ? item["destinationLoadBalancerFrontEndIPConfiguration"]
      : frontendIPConfigurationDeserializer(item["destinationLoadBalancerFrontEndIPConfiguration"]),
    destinationPort: item["destinationPort"],
  };
}

export function networkInterfaceTapConfigurationArraySerializer(
  result: Array<NetworkInterfaceTapConfiguration>,
): any[] {
  return result.map((item) => {
    return networkInterfaceTapConfigurationSerializer(item);
  });
}

export function networkInterfaceTapConfigurationArrayDeserializer(
  result: Array<NetworkInterfaceTapConfiguration>,
): any[] {
  return result.map((item) => {
    return networkInterfaceTapConfigurationDeserializer(item);
  });
}

/** Tap configuration in a Network Interface. */
export interface NetworkInterfaceTapConfiguration extends SubResourceModel {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The reference to the Virtual Network Tap resource. */
  virtualNetworkTap?: VirtualNetworkTap;
  /** The provisioning state of the network interface tap configuration resource. */
  readonly provisioningState?: ProvisioningState;
}

export function networkInterfaceTapConfigurationSerializer(
  item: NetworkInterfaceTapConfiguration,
): any {
  return {
    name: item["name"],
    id: item["id"],
    properties: areAllPropsUndefined(item, ["virtualNetworkTap"])
      ? undefined
      : _networkInterfaceTapConfigurationPropertiesSerializer(item),
  };
}

export function networkInterfaceTapConfigurationDeserializer(
  item: any,
): NetworkInterfaceTapConfiguration {
  return {
    name: item["name"],
    type: item["type"],
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _networkInterfaceTapConfigurationPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Properties of Virtual Network Tap configuration. */
export interface NetworkInterfaceTapConfigurationPropertiesFormat {
  /** The reference to the Virtual Network Tap resource. */
  virtualNetworkTap?: VirtualNetworkTap;
  /** The provisioning state of the network interface tap configuration resource. */
  readonly provisioningState?: ProvisioningState;
}

export function networkInterfaceTapConfigurationPropertiesFormatSerializer(
  item: NetworkInterfaceTapConfigurationPropertiesFormat,
): any {
  return {
    virtualNetworkTap: !item["virtualNetworkTap"]
      ? item["virtualNetworkTap"]
      : virtualNetworkTapSerializer(item["virtualNetworkTap"]),
  };
}

export function networkInterfaceTapConfigurationPropertiesFormatDeserializer(
  item: any,
): NetworkInterfaceTapConfigurationPropertiesFormat {
  return {
    virtualNetworkTap: !item["virtualNetworkTap"]
      ? item["virtualNetworkTap"]
      : virtualNetworkTapDeserializer(item["virtualNetworkTap"]),
    provisioningState: item["provisioningState"],
  };
}

/** Frontend IP address of the load balancer. */
export interface FrontendIPConfiguration extends SubResourceModel {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** A list of availability zones denoting the IP allocated for the resource needs to come from. */
  zones?: string[];
  /** An array of references to inbound rules that use this frontend IP. */
  readonly inboundNatRules?: SubResource[];
  /** An array of references to inbound pools that use this frontend IP. */
  readonly inboundNatPools?: SubResource[];
  /** An array of references to outbound rules that use this frontend IP. */
  readonly outboundRules?: SubResource[];
  /** An array of references to load balancing rules that use this frontend IP. */
  readonly loadBalancingRules?: SubResource[];
  /** The private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** The Private IP allocation method. */
  privateIPAllocationMethod?: IPAllocationMethod;
  /** Whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. */
  privateIPAddressVersion?: IPVersion;
  /** The reference to the subnet resource. */
  subnet?: Subnet;
  /** The reference to the Public IP resource. */
  publicIPAddress?: PublicIPAddress;
  /** The reference to the Public IP Prefix resource. */
  publicIPPrefix?: SubResource;
  /** The reference to gateway load balancer frontend IP. */
  gatewayLoadBalancer?: SubResource;
  /** The provisioning state of the frontend IP configuration resource. */
  readonly provisioningState?: ProvisioningState;
}

export function frontendIPConfigurationSerializer(item: FrontendIPConfiguration): any {
  return {
    name: item["name"],
    id: item["id"],
    properties: areAllPropsUndefined(item, [
      "privateIPAddress",
      "privateIPAllocationMethod",
      "privateIPAddressVersion",
      "subnet",
      "publicIPAddress",
      "publicIPPrefix",
      "gatewayLoadBalancer",
    ])
      ? undefined
      : _frontendIPConfigurationPropertiesSerializer(item),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function frontendIPConfigurationDeserializer(item: any): FrontendIPConfiguration {
  return {
    name: item["name"],
    type: item["type"],
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _frontendIPConfigurationPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** Properties of Frontend IP Configuration of the load balancer. */
export interface FrontendIPConfigurationPropertiesFormat {
  /** An array of references to inbound rules that use this frontend IP. */
  readonly inboundNatRules?: SubResource[];
  /** An array of references to inbound pools that use this frontend IP. */
  readonly inboundNatPools?: SubResource[];
  /** An array of references to outbound rules that use this frontend IP. */
  readonly outboundRules?: SubResource[];
  /** An array of references to load balancing rules that use this frontend IP. */
  readonly loadBalancingRules?: SubResource[];
  /** The private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** The Private IP allocation method. */
  privateIPAllocationMethod?: IPAllocationMethod;
  /** Whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. */
  privateIPAddressVersion?: IPVersion;
  /** The reference to the subnet resource. */
  subnet?: Subnet;
  /** The reference to the Public IP resource. */
  publicIPAddress?: PublicIPAddress;
  /** The reference to the Public IP Prefix resource. */
  publicIPPrefix?: SubResource;
  /** The reference to gateway load balancer frontend IP. */
  gatewayLoadBalancer?: SubResource;
  /** The provisioning state of the frontend IP configuration resource. */
  readonly provisioningState?: ProvisioningState;
}

export function frontendIPConfigurationPropertiesFormatSerializer(
  item: FrontendIPConfigurationPropertiesFormat,
): any {
  return {
    privateIPAddress: item["privateIPAddress"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    privateIPAddressVersion: item["privateIPAddressVersion"],
    subnet: !item["subnet"] ? item["subnet"] : subnetSerializer(item["subnet"]),
    publicIPAddress: !item["publicIPAddress"]
      ? item["publicIPAddress"]
      : publicIPAddressSerializer(item["publicIPAddress"]),
    publicIPPrefix: !item["publicIPPrefix"]
      ? item["publicIPPrefix"]
      : subResourceSerializer(item["publicIPPrefix"]),
    gatewayLoadBalancer: !item["gatewayLoadBalancer"]
      ? item["gatewayLoadBalancer"]
      : subResourceSerializer(item["gatewayLoadBalancer"]),
  };
}

export function frontendIPConfigurationPropertiesFormatDeserializer(
  item: any,
): FrontendIPConfigurationPropertiesFormat {
  return {
    inboundNatRules: !item["inboundNatRules"]
      ? item["inboundNatRules"]
      : subResourceArrayDeserializer(item["inboundNatRules"]),
    inboundNatPools: !item["inboundNatPools"]
      ? item["inboundNatPools"]
      : subResourceArrayDeserializer(item["inboundNatPools"]),
    outboundRules: !item["outboundRules"]
      ? item["outboundRules"]
      : subResourceArrayDeserializer(item["outboundRules"]),
    loadBalancingRules: !item["loadBalancingRules"]
      ? item["loadBalancingRules"]
      : subResourceArrayDeserializer(item["loadBalancingRules"]),
    privateIPAddress: item["privateIPAddress"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    privateIPAddressVersion: item["privateIPAddressVersion"],
    subnet: !item["subnet"] ? item["subnet"] : subnetDeserializer(item["subnet"]),
    publicIPAddress: !item["publicIPAddress"]
      ? item["publicIPAddress"]
      : publicIPAddressDeserializer(item["publicIPAddress"]),
    publicIPPrefix: !item["publicIPPrefix"]
      ? item["publicIPPrefix"]
      : subResourceDeserializer(item["publicIPPrefix"]),
    gatewayLoadBalancer: !item["gatewayLoadBalancer"]
      ? item["gatewayLoadBalancer"]
      : subResourceDeserializer(item["gatewayLoadBalancer"]),
    provisioningState: item["provisioningState"],
  };
}

export function subResourceArraySerializer(result: Array<SubResource>): any[] {
  return result.map((item) => {
    return subResourceSerializer(item);
  });
}

export function subResourceArrayDeserializer(result: Array<SubResource>): any[] {
  return result.map((item) => {
    return subResourceDeserializer(item);
  });
}

/** IP address version. */
export enum KnownIPVersion {
  /** IPv4 */
  IPv4 = "IPv4",
  /** IPv6 */
  IPv6 = "IPv6",
}

/**
 * IP address version. \
 * {@link KnownIPVersion} can be used interchangeably with IPVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPv4**: IPv4 \
 * **IPv6**: IPv6
 */
export type IPVersion = string;

/** Subnet in a virtual network resource. */
export interface Subnet extends SubResourceModel {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The address prefix for the subnet. */
  addressPrefix?: string;
  /** List of address prefixes for the subnet. */
  addressPrefixes?: string[];
  /** The reference to the NetworkSecurityGroup resource. */
  networkSecurityGroup?: NetworkSecurityGroup;
  /** The reference to the RouteTable resource. */
  routeTable?: RouteTable;
  /** Nat gateway associated with this subnet. */
  natGateway?: SubResource;
  /** An array of service endpoints. */
  serviceEndpoints?: ServiceEndpointPropertiesFormat[];
  /** An array of service endpoint policies. */
  serviceEndpointPolicies?: ServiceEndpointPolicy[];
  /** An array of references to private endpoints. */
  readonly privateEndpoints?: PrivateEndpoint[];
  /** An array of references to the network interface IP configurations using subnet. */
  readonly ipConfigurations?: IPConfiguration[];
  /** Array of IP configuration profiles which reference this subnet. */
  readonly ipConfigurationProfiles?: IPConfigurationProfile[];
  /** Array of IpAllocation which reference this subnet. */
  ipAllocations?: SubResource[];
  /** An array of references to the external resources using subnet. */
  readonly resourceNavigationLinks?: ResourceNavigationLink[];
  /** An array of references to services injecting into this subnet. */
  readonly serviceAssociationLinks?: ServiceAssociationLink[];
  /** An array of references to the delegations on the subnet. */
  delegations?: Delegation[];
  /** A read-only string identifying the intention of use for this subnet based on delegations and other user-defined properties. */
  readonly purpose?: string;
  /** The provisioning state of the subnet resource. */
  readonly provisioningState?: ProvisioningState;
  /** Enable or Disable apply network policies on private end point in the subnet. */
  privateEndpointNetworkPolicies?: VirtualNetworkPrivateEndpointNetworkPolicies;
  /** Enable or Disable apply network policies on private link service in the subnet. */
  privateLinkServiceNetworkPolicies?: VirtualNetworkPrivateLinkServiceNetworkPolicies;
  /** Application gateway IP configurations of virtual network resource. */
  applicationGatewayIPConfigurations?: ApplicationGatewayIPConfiguration[];
  /** Set this property to Tenant to allow sharing subnet with other subscriptions in your AAD tenant. This property can only be set if defaultOutboundAccess is set to false, both properties can only be set if subnet is empty. */
  sharingScope?: SharingScope;
  /** Set this property to false to disable default outbound connectivity for all VMs in the subnet. */
  defaultOutboundAccess?: boolean;
  /** A list of IPAM Pools for allocating IP address prefixes. */
  ipamPoolPrefixAllocations?: IpamPoolPrefixAllocation[];
  /** Reference to an existing service gateway. */
  serviceGateway?: SubResource;
}

export function subnetSerializer(item: Subnet): any {
  return {
    name: item["name"],
    id: item["id"],
    properties: areAllPropsUndefined(item, [
      "addressPrefix",
      "addressPrefixes",
      "networkSecurityGroup",
      "routeTable",
      "natGateway",
      "serviceEndpoints",
      "serviceEndpointPolicies",
      "ipAllocations",
      "delegations",
      "privateEndpointNetworkPolicies",
      "privateLinkServiceNetworkPolicies",
      "applicationGatewayIPConfigurations",
      "sharingScope",
      "defaultOutboundAccess",
      "ipamPoolPrefixAllocations",
      "serviceGateway",
    ])
      ? undefined
      : _subnetPropertiesSerializer(item),
  };
}

export function subnetDeserializer(item: any): Subnet {
  return {
    name: item["name"],
    type: item["type"],
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _subnetPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Properties of the subnet. */
export interface SubnetPropertiesFormat {
  /** The address prefix for the subnet. */
  addressPrefix?: string;
  /** List of address prefixes for the subnet. */
  addressPrefixes?: string[];
  /** The reference to the NetworkSecurityGroup resource. */
  networkSecurityGroup?: NetworkSecurityGroup;
  /** The reference to the RouteTable resource. */
  routeTable?: RouteTable;
  /** Nat gateway associated with this subnet. */
  natGateway?: SubResource;
  /** An array of service endpoints. */
  serviceEndpoints?: ServiceEndpointPropertiesFormat[];
  /** An array of service endpoint policies. */
  serviceEndpointPolicies?: ServiceEndpointPolicy[];
  /** An array of references to private endpoints. */
  readonly privateEndpoints?: PrivateEndpoint[];
  /** An array of references to the network interface IP configurations using subnet. */
  readonly ipConfigurations?: IPConfiguration[];
  /** Array of IP configuration profiles which reference this subnet. */
  readonly ipConfigurationProfiles?: IPConfigurationProfile[];
  /** Array of IpAllocation which reference this subnet. */
  ipAllocations?: SubResource[];
  /** An array of references to the external resources using subnet. */
  readonly resourceNavigationLinks?: ResourceNavigationLink[];
  /** An array of references to services injecting into this subnet. */
  readonly serviceAssociationLinks?: ServiceAssociationLink[];
  /** An array of references to the delegations on the subnet. */
  delegations?: Delegation[];
  /** A read-only string identifying the intention of use for this subnet based on delegations and other user-defined properties. */
  readonly purpose?: string;
  /** The provisioning state of the subnet resource. */
  readonly provisioningState?: ProvisioningState;
  /** Enable or Disable apply network policies on private end point in the subnet. */
  privateEndpointNetworkPolicies?: VirtualNetworkPrivateEndpointNetworkPolicies;
  /** Enable or Disable apply network policies on private link service in the subnet. */
  privateLinkServiceNetworkPolicies?: VirtualNetworkPrivateLinkServiceNetworkPolicies;
  /** Application gateway IP configurations of virtual network resource. */
  applicationGatewayIPConfigurations?: ApplicationGatewayIPConfiguration[];
  /** Set this property to Tenant to allow sharing subnet with other subscriptions in your AAD tenant. This property can only be set if defaultOutboundAccess is set to false, both properties can only be set if subnet is empty. */
  sharingScope?: SharingScope;
  /** Set this property to false to disable default outbound connectivity for all VMs in the subnet. */
  defaultOutboundAccess?: boolean;
  /** A list of IPAM Pools for allocating IP address prefixes. */
  ipamPoolPrefixAllocations?: IpamPoolPrefixAllocation[];
  /** Reference to an existing service gateway. */
  serviceGateway?: SubResource;
}

export function subnetPropertiesFormatSerializer(item: SubnetPropertiesFormat): any {
  return {
    addressPrefix: item["addressPrefix"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : networkSecurityGroupSerializer(item["networkSecurityGroup"]),
    routeTable: !item["routeTable"] ? item["routeTable"] : routeTableSerializer(item["routeTable"]),
    natGateway: !item["natGateway"]
      ? item["natGateway"]
      : subResourceSerializer(item["natGateway"]),
    serviceEndpoints: !item["serviceEndpoints"]
      ? item["serviceEndpoints"]
      : serviceEndpointPropertiesFormatArraySerializer(item["serviceEndpoints"]),
    serviceEndpointPolicies: !item["serviceEndpointPolicies"]
      ? item["serviceEndpointPolicies"]
      : serviceEndpointPolicyArraySerializer(item["serviceEndpointPolicies"]),
    ipAllocations: !item["ipAllocations"]
      ? item["ipAllocations"]
      : subResourceArraySerializer(item["ipAllocations"]),
    delegations: !item["delegations"]
      ? item["delegations"]
      : delegationArraySerializer(item["delegations"]),
    privateEndpointNetworkPolicies: item["privateEndpointNetworkPolicies"],
    privateLinkServiceNetworkPolicies: item["privateLinkServiceNetworkPolicies"],
    applicationGatewayIPConfigurations: !item["applicationGatewayIPConfigurations"]
      ? item["applicationGatewayIPConfigurations"]
      : applicationGatewayIPConfigurationArraySerializer(
          item["applicationGatewayIPConfigurations"],
        ),
    sharingScope: item["sharingScope"],
    defaultOutboundAccess: item["defaultOutboundAccess"],
    ipamPoolPrefixAllocations: !item["ipamPoolPrefixAllocations"]
      ? item["ipamPoolPrefixAllocations"]
      : ipamPoolPrefixAllocationArraySerializer(item["ipamPoolPrefixAllocations"]),
    serviceGateway: !item["serviceGateway"]
      ? item["serviceGateway"]
      : subResourceSerializer(item["serviceGateway"]),
  };
}

export function subnetPropertiesFormatDeserializer(item: any): SubnetPropertiesFormat {
  return {
    addressPrefix: item["addressPrefix"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : networkSecurityGroupDeserializer(item["networkSecurityGroup"]),
    routeTable: !item["routeTable"]
      ? item["routeTable"]
      : routeTableDeserializer(item["routeTable"]),
    natGateway: !item["natGateway"]
      ? item["natGateway"]
      : subResourceDeserializer(item["natGateway"]),
    serviceEndpoints: !item["serviceEndpoints"]
      ? item["serviceEndpoints"]
      : serviceEndpointPropertiesFormatArrayDeserializer(item["serviceEndpoints"]),
    serviceEndpointPolicies: !item["serviceEndpointPolicies"]
      ? item["serviceEndpointPolicies"]
      : serviceEndpointPolicyArrayDeserializer(item["serviceEndpointPolicies"]),
    privateEndpoints: !item["privateEndpoints"]
      ? item["privateEndpoints"]
      : privateEndpointArrayDeserializer(item["privateEndpoints"]),
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : ipConfigurationArrayDeserializer(item["ipConfigurations"]),
    ipConfigurationProfiles: !item["ipConfigurationProfiles"]
      ? item["ipConfigurationProfiles"]
      : ipConfigurationProfileArrayDeserializer(item["ipConfigurationProfiles"]),
    ipAllocations: !item["ipAllocations"]
      ? item["ipAllocations"]
      : subResourceArrayDeserializer(item["ipAllocations"]),
    resourceNavigationLinks: !item["resourceNavigationLinks"]
      ? item["resourceNavigationLinks"]
      : resourceNavigationLinkArrayDeserializer(item["resourceNavigationLinks"]),
    serviceAssociationLinks: !item["serviceAssociationLinks"]
      ? item["serviceAssociationLinks"]
      : serviceAssociationLinkArrayDeserializer(item["serviceAssociationLinks"]),
    delegations: !item["delegations"]
      ? item["delegations"]
      : delegationArrayDeserializer(item["delegations"]),
    purpose: item["purpose"],
    provisioningState: item["provisioningState"],
    privateEndpointNetworkPolicies: item["privateEndpointNetworkPolicies"],
    privateLinkServiceNetworkPolicies: item["privateLinkServiceNetworkPolicies"],
    applicationGatewayIPConfigurations: !item["applicationGatewayIPConfigurations"]
      ? item["applicationGatewayIPConfigurations"]
      : applicationGatewayIPConfigurationArrayDeserializer(
          item["applicationGatewayIPConfigurations"],
        ),
    sharingScope: item["sharingScope"],
    defaultOutboundAccess: item["defaultOutboundAccess"],
    ipamPoolPrefixAllocations: !item["ipamPoolPrefixAllocations"]
      ? item["ipamPoolPrefixAllocations"]
      : ipamPoolPrefixAllocationArrayDeserializer(item["ipamPoolPrefixAllocations"]),
    serviceGateway: !item["serviceGateway"]
      ? item["serviceGateway"]
      : subResourceDeserializer(item["serviceGateway"]),
  };
}

/** NetworkSecurityGroup resource. */
export interface NetworkSecurityGroup extends Resource {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** When enabled, flows created from Network Security Group connections will be re-evaluated when rules are updates. Initial enablement will trigger re-evaluation. */
  flushConnection?: boolean;
  /** A collection of security rules of the network security group. */
  securityRules?: SecurityRule[];
  /** The default security rules of network security group. */
  readonly defaultSecurityRules?: SecurityRule[];
  /** A collection of references to network interfaces. */
  readonly networkInterfaces?: NetworkInterface[];
  /** A collection of references to subnets. */
  readonly subnets?: Subnet[];
  /** A collection of references to flow log resources. */
  readonly flowLogs?: FlowLog[];
  /** The resource GUID property of the network security group resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the network security group resource. */
  readonly provisioningState?: ProvisioningState;
}

export function networkSecurityGroupSerializer(item: NetworkSecurityGroup): any {
  return {
    id: item["id"],
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["flushConnection", "securityRules"])
      ? undefined
      : _networkSecurityGroupPropertiesSerializer(item),
  };
}

export function networkSecurityGroupDeserializer(item: any): NetworkSecurityGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _networkSecurityGroupPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Network Security Group resource. */
export interface NetworkSecurityGroupPropertiesFormat {
  /** When enabled, flows created from Network Security Group connections will be re-evaluated when rules are updates. Initial enablement will trigger re-evaluation. */
  flushConnection?: boolean;
  /** A collection of security rules of the network security group. */
  securityRules?: SecurityRule[];
  /** The default security rules of network security group. */
  readonly defaultSecurityRules?: SecurityRule[];
  /** A collection of references to network interfaces. */
  readonly networkInterfaces?: NetworkInterface[];
  /** A collection of references to subnets. */
  readonly subnets?: Subnet[];
  /** A collection of references to flow log resources. */
  readonly flowLogs?: FlowLog[];
  /** The resource GUID property of the network security group resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the network security group resource. */
  readonly provisioningState?: ProvisioningState;
}

export function networkSecurityGroupPropertiesFormatSerializer(
  item: NetworkSecurityGroupPropertiesFormat,
): any {
  return {
    flushConnection: item["flushConnection"],
    securityRules: !item["securityRules"]
      ? item["securityRules"]
      : securityRuleArraySerializer(item["securityRules"]),
  };
}

export function networkSecurityGroupPropertiesFormatDeserializer(
  item: any,
): NetworkSecurityGroupPropertiesFormat {
  return {
    flushConnection: item["flushConnection"],
    securityRules: !item["securityRules"]
      ? item["securityRules"]
      : securityRuleArrayDeserializer(item["securityRules"]),
    defaultSecurityRules: !item["defaultSecurityRules"]
      ? item["defaultSecurityRules"]
      : securityRuleArrayDeserializer(item["defaultSecurityRules"]),
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceArrayDeserializer(item["networkInterfaces"]),
    subnets: !item["subnets"] ? item["subnets"] : subnetArrayDeserializer(item["subnets"]),
    flowLogs: !item["flowLogs"] ? item["flowLogs"] : flowLogArrayDeserializer(item["flowLogs"]),
    resourceGuid: item["resourceGuid"],
    provisioningState: item["provisioningState"],
  };
}

export function securityRuleArraySerializer(result: Array<SecurityRule>): any[] {
  return result.map((item) => {
    return securityRuleSerializer(item);
  });
}

export function securityRuleArrayDeserializer(result: Array<SecurityRule>): any[] {
  return result.map((item) => {
    return securityRuleDeserializer(item);
  });
}

/** Network security rule. */
export interface SecurityRule extends SubResourceModel {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** A description for this rule. Restricted to 140 chars. */
  description?: string;
  /** Network protocol this rule applies to. */
  protocol?: SecurityRuleProtocol;
  /** The source port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports. */
  sourcePortRange?: string;
  /** The destination port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports. */
  destinationPortRange?: string;
  /** The CIDR or source IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used. If this is an ingress rule, specifies where network traffic originates from. */
  sourceAddressPrefix?: string;
  /** The CIDR or source IP ranges. */
  sourceAddressPrefixes?: string[];
  /** The application security group specified as source. */
  sourceApplicationSecurityGroups?: ApplicationSecurityGroup[];
  /** The destination address prefix. CIDR or destination IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used. */
  destinationAddressPrefix?: string;
  /** The destination address prefixes. CIDR or destination IP ranges. */
  destinationAddressPrefixes?: string[];
  /** The application security group specified as destination. */
  destinationApplicationSecurityGroups?: ApplicationSecurityGroup[];
  /** The source port ranges. */
  sourcePortRanges?: string[];
  /** The destination port ranges. */
  destinationPortRanges?: string[];
  /** The network traffic is allowed or denied. */
  access?: SecurityRuleAccess;
  /** The priority of the rule. The value can be between 100 and 4096. The priority number must be unique for each rule in the collection. The lower the priority number, the higher the priority of the rule. */
  priority?: number;
  /** The direction of the rule. The direction specifies if rule will be evaluated on incoming or outgoing traffic. */
  direction?: SecurityRuleDirection;
  /** The provisioning state of the security rule resource. */
  readonly provisioningState?: ProvisioningState;
}

export function securityRuleSerializer(item: SecurityRule): any {
  return {
    name: item["name"],
    id: item["id"],
    properties: areAllPropsUndefined(item, [
      "description",
      "protocol",
      "sourcePortRange",
      "destinationPortRange",
      "sourceAddressPrefix",
      "sourceAddressPrefixes",
      "sourceApplicationSecurityGroups",
      "destinationAddressPrefix",
      "destinationAddressPrefixes",
      "destinationApplicationSecurityGroups",
      "sourcePortRanges",
      "destinationPortRanges",
      "access",
      "priority",
      "direction",
    ])
      ? undefined
      : _securityRulePropertiesSerializer(item),
  };
}

export function securityRuleDeserializer(item: any): SecurityRule {
  return {
    name: item["name"],
    type: item["type"],
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _securityRulePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Security rule resource. */
export interface SecurityRulePropertiesFormat {
  /** A description for this rule. Restricted to 140 chars. */
  description?: string;
  /** Network protocol this rule applies to. */
  protocol: SecurityRuleProtocol;
  /** The source port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports. */
  sourcePortRange?: string;
  /** The destination port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports. */
  destinationPortRange?: string;
  /** The CIDR or source IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used. If this is an ingress rule, specifies where network traffic originates from. */
  sourceAddressPrefix?: string;
  /** The CIDR or source IP ranges. */
  sourceAddressPrefixes?: string[];
  /** The application security group specified as source. */
  sourceApplicationSecurityGroups?: ApplicationSecurityGroup[];
  /** The destination address prefix. CIDR or destination IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used. */
  destinationAddressPrefix?: string;
  /** The destination address prefixes. CIDR or destination IP ranges. */
  destinationAddressPrefixes?: string[];
  /** The application security group specified as destination. */
  destinationApplicationSecurityGroups?: ApplicationSecurityGroup[];
  /** The source port ranges. */
  sourcePortRanges?: string[];
  /** The destination port ranges. */
  destinationPortRanges?: string[];
  /** The network traffic is allowed or denied. */
  access: SecurityRuleAccess;
  /** The priority of the rule. The value can be between 100 and 4096. The priority number must be unique for each rule in the collection. The lower the priority number, the higher the priority of the rule. */
  priority: number;
  /** The direction of the rule. The direction specifies if rule will be evaluated on incoming or outgoing traffic. */
  direction: SecurityRuleDirection;
  /** The provisioning state of the security rule resource. */
  readonly provisioningState?: ProvisioningState;
}

export function securityRulePropertiesFormatSerializer(item: SecurityRulePropertiesFormat): any {
  return {
    description: item["description"],
    protocol: item["protocol"],
    sourcePortRange: item["sourcePortRange"],
    destinationPortRange: item["destinationPortRange"],
    sourceAddressPrefix: item["sourceAddressPrefix"],
    sourceAddressPrefixes: !item["sourceAddressPrefixes"]
      ? item["sourceAddressPrefixes"]
      : item["sourceAddressPrefixes"].map((p: any) => {
          return p;
        }),
    sourceApplicationSecurityGroups: !item["sourceApplicationSecurityGroups"]
      ? item["sourceApplicationSecurityGroups"]
      : applicationSecurityGroupArraySerializer(item["sourceApplicationSecurityGroups"]),
    destinationAddressPrefix: item["destinationAddressPrefix"],
    destinationAddressPrefixes: !item["destinationAddressPrefixes"]
      ? item["destinationAddressPrefixes"]
      : item["destinationAddressPrefixes"].map((p: any) => {
          return p;
        }),
    destinationApplicationSecurityGroups: !item["destinationApplicationSecurityGroups"]
      ? item["destinationApplicationSecurityGroups"]
      : applicationSecurityGroupArraySerializer(item["destinationApplicationSecurityGroups"]),
    sourcePortRanges: !item["sourcePortRanges"]
      ? item["sourcePortRanges"]
      : item["sourcePortRanges"].map((p: any) => {
          return p;
        }),
    destinationPortRanges: !item["destinationPortRanges"]
      ? item["destinationPortRanges"]
      : item["destinationPortRanges"].map((p: any) => {
          return p;
        }),
    access: item["access"],
    priority: item["priority"],
    direction: item["direction"],
  };
}

export function securityRulePropertiesFormatDeserializer(item: any): SecurityRulePropertiesFormat {
  return {
    description: item["description"],
    protocol: item["protocol"],
    sourcePortRange: item["sourcePortRange"],
    destinationPortRange: item["destinationPortRange"],
    sourceAddressPrefix: item["sourceAddressPrefix"],
    sourceAddressPrefixes: !item["sourceAddressPrefixes"]
      ? item["sourceAddressPrefixes"]
      : item["sourceAddressPrefixes"].map((p: any) => {
          return p;
        }),
    sourceApplicationSecurityGroups: !item["sourceApplicationSecurityGroups"]
      ? item["sourceApplicationSecurityGroups"]
      : applicationSecurityGroupArrayDeserializer(item["sourceApplicationSecurityGroups"]),
    destinationAddressPrefix: item["destinationAddressPrefix"],
    destinationAddressPrefixes: !item["destinationAddressPrefixes"]
      ? item["destinationAddressPrefixes"]
      : item["destinationAddressPrefixes"].map((p: any) => {
          return p;
        }),
    destinationApplicationSecurityGroups: !item["destinationApplicationSecurityGroups"]
      ? item["destinationApplicationSecurityGroups"]
      : applicationSecurityGroupArrayDeserializer(item["destinationApplicationSecurityGroups"]),
    sourcePortRanges: !item["sourcePortRanges"]
      ? item["sourcePortRanges"]
      : item["sourcePortRanges"].map((p: any) => {
          return p;
        }),
    destinationPortRanges: !item["destinationPortRanges"]
      ? item["destinationPortRanges"]
      : item["destinationPortRanges"].map((p: any) => {
          return p;
        }),
    access: item["access"],
    priority: item["priority"],
    direction: item["direction"],
    provisioningState: item["provisioningState"],
  };
}

/** Network protocol this rule applies to. */
export enum KnownSecurityRuleProtocol {
  /** Tcp */
  Tcp = "Tcp",
  /** Udp */
  Udp = "Udp",
  /** Icmp */
  Icmp = "Icmp",
  /** Esp */
  Esp = "Esp",
  /** * */
  Asterisk = "*",
  /** Ah */
  Ah = "Ah",
}

/**
 * Network protocol this rule applies to. \
 * {@link KnownSecurityRuleProtocol} can be used interchangeably with SecurityRuleProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Tcp**: Tcp \
 * **Udp**: Udp \
 * **Icmp**: Icmp \
 * **Esp**: Esp \
 * *****: * \
 * **Ah**: Ah
 */
export type SecurityRuleProtocol = string;

export function applicationSecurityGroupArraySerializer(
  result: Array<ApplicationSecurityGroup>,
): any[] {
  return result.map((item) => {
    return applicationSecurityGroupSerializer(item);
  });
}

export function applicationSecurityGroupArrayDeserializer(
  result: Array<ApplicationSecurityGroup>,
): any[] {
  return result.map((item) => {
    return applicationSecurityGroupDeserializer(item);
  });
}

/** An application security group in a resource group. */
export interface ApplicationSecurityGroup extends Resource {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The resource GUID property of the application security group resource. It uniquely identifies a resource, even if the user changes its name or migrate the resource across subscriptions or resource groups. */
  readonly resourceGuid?: string;
  /** The provisioning state of the application security group resource. */
  readonly provisioningState?: ProvisioningState;
}

export function applicationSecurityGroupSerializer(item: ApplicationSecurityGroup): any {
  return {
    id: item["id"],
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [])
      ? undefined
      : _applicationSecurityGroupPropertiesSerializer(item),
  };
}

export function applicationSecurityGroupDeserializer(item: any): ApplicationSecurityGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _applicationSecurityGroupPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Application security group properties. */
export interface ApplicationSecurityGroupPropertiesFormat {
  /** The resource GUID property of the application security group resource. It uniquely identifies a resource, even if the user changes its name or migrate the resource across subscriptions or resource groups. */
  readonly resourceGuid?: string;
  /** The provisioning state of the application security group resource. */
  readonly provisioningState?: ProvisioningState;
}

export function applicationSecurityGroupPropertiesFormatSerializer(
  _item: ApplicationSecurityGroupPropertiesFormat,
): any {
  return {};
}

export function applicationSecurityGroupPropertiesFormatDeserializer(
  item: any,
): ApplicationSecurityGroupPropertiesFormat {
  return {
    resourceGuid: item["resourceGuid"],
    provisioningState: item["provisioningState"],
  };
}

/** Whether network traffic is allowed or denied. */
export enum KnownSecurityRuleAccess {
  /** Allow */
  Allow = "Allow",
  /** Deny */
  Deny = "Deny",
}

/**
 * Whether network traffic is allowed or denied. \
 * {@link KnownSecurityRuleAccess} can be used interchangeably with SecurityRuleAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**: Allow \
 * **Deny**: Deny
 */
export type SecurityRuleAccess = string;

/** The direction of the rule. The direction specifies if rule will be evaluated on incoming or outgoing traffic. */
export enum KnownSecurityRuleDirection {
  /** Inbound */
  Inbound = "Inbound",
  /** Outbound */
  Outbound = "Outbound",
}

/**
 * The direction of the rule. The direction specifies if rule will be evaluated on incoming or outgoing traffic. \
 * {@link KnownSecurityRuleDirection} can be used interchangeably with SecurityRuleDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inbound**: Inbound \
 * **Outbound**: Outbound
 */
export type SecurityRuleDirection = string;

export function networkInterfaceArraySerializer(result: Array<NetworkInterface>): any[] {
  return result.map((item) => {
    return networkInterfaceSerializer(item);
  });
}

export function networkInterfaceArrayDeserializer(result: Array<NetworkInterface>): any[] {
  return result.map((item) => {
    return networkInterfaceDeserializer(item);
  });
}

/** A network interface in a resource group. */
export interface NetworkInterface extends Resource {
  /** The extended location of the network interface. */
  extendedLocation?: ExtendedLocation;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The reference to a virtual machine. */
  readonly virtualMachine?: SubResource;
  /** The reference to the NetworkSecurityGroup resource. */
  networkSecurityGroup?: NetworkSecurityGroup;
  /** A reference to the private endpoint to which the network interface is linked. */
  readonly privateEndpoint?: PrivateEndpoint;
  /** A list of IPConfigurations of the network interface. */
  ipConfigurations?: NetworkInterfaceIPConfiguration[];
  /** A list of TapConfigurations of the network interface. */
  readonly tapConfigurations?: NetworkInterfaceTapConfiguration[];
  /** The DNS settings in network interface. */
  dnsSettings?: NetworkInterfaceDnsSettings;
  /** The MAC address of the network interface. */
  readonly macAddress?: string;
  /** Whether this is a primary network interface on a virtual machine. */
  readonly primary?: boolean;
  /** Whether the virtual machine this nic is attached to supports encryption. */
  readonly vnetEncryptionSupported?: boolean;
  /** Whether default outbound connectivity for nic was configured or not. */
  readonly defaultOutboundConnectivityEnabled?: boolean;
  /** If the network interface is configured for accelerated networking. Not applicable to VM sizes which require accelerated networking. */
  enableAcceleratedNetworking?: boolean;
  /** Indicates whether to disable tcp state tracking. */
  disableTcpStateTracking?: boolean;
  /** Indicates whether IP forwarding is enabled on this network interface. */
  enableIPForwarding?: boolean;
  /** A list of references to linked BareMetal resources. */
  readonly hostedWorkloads?: string[];
  /** A reference to the dscp configuration to which the network interface is linked. */
  readonly dscpConfiguration?: SubResource;
  /** The resource GUID property of the network interface resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the network interface resource. */
  readonly provisioningState?: ProvisioningState;
  /** WorkloadType of the NetworkInterface for BareMetal resources */
  workloadType?: string;
  /** Type of Network Interface resource. */
  nicType?: NetworkInterfaceNicType;
  /** Privatelinkservice of the network interface resource. */
  privateLinkService?: PrivateLinkService;
  /** Migration phase of Network Interface resource. */
  migrationPhase?: NetworkInterfaceMigrationPhase;
  /** Auxiliary mode of Network Interface resource. */
  auxiliaryMode?: NetworkInterfaceAuxiliaryMode;
  /** Auxiliary sku of Network Interface resource. */
  auxiliarySku?: NetworkInterfaceAuxiliarySku;
}

export function networkInterfaceSerializer(item: NetworkInterface): any {
  return {
    id: item["id"],
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "networkSecurityGroup",
      "ipConfigurations",
      "dnsSettings",
      "enableAcceleratedNetworking",
      "disableTcpStateTracking",
      "enableIPForwarding",
      "workloadType",
      "nicType",
      "privateLinkService",
      "migrationPhase",
      "auxiliaryMode",
      "auxiliarySku",
    ])
      ? undefined
      : _networkInterfacePropertiesSerializer(item),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function networkInterfaceDeserializer(item: any): NetworkInterface {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _networkInterfacePropertiesDeserializer(item["properties"])),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    etag: item["etag"],
  };
}

/** NetworkInterface properties. */
export interface NetworkInterfacePropertiesFormat {
  /** The reference to a virtual machine. */
  readonly virtualMachine?: SubResource;
  /** The reference to the NetworkSecurityGroup resource. */
  networkSecurityGroup?: NetworkSecurityGroup;
  /** A reference to the private endpoint to which the network interface is linked. */
  readonly privateEndpoint?: PrivateEndpoint;
  /** A list of IPConfigurations of the network interface. */
  ipConfigurations?: NetworkInterfaceIPConfiguration[];
  /** A list of TapConfigurations of the network interface. */
  readonly tapConfigurations?: NetworkInterfaceTapConfiguration[];
  /** The DNS settings in network interface. */
  dnsSettings?: NetworkInterfaceDnsSettings;
  /** The MAC address of the network interface. */
  readonly macAddress?: string;
  /** Whether this is a primary network interface on a virtual machine. */
  readonly primary?: boolean;
  /** Whether the virtual machine this nic is attached to supports encryption. */
  readonly vnetEncryptionSupported?: boolean;
  /** Whether default outbound connectivity for nic was configured or not. */
  readonly defaultOutboundConnectivityEnabled?: boolean;
  /** If the network interface is configured for accelerated networking. Not applicable to VM sizes which require accelerated networking. */
  enableAcceleratedNetworking?: boolean;
  /** Indicates whether to disable tcp state tracking. */
  disableTcpStateTracking?: boolean;
  /** Indicates whether IP forwarding is enabled on this network interface. */
  enableIPForwarding?: boolean;
  /** A list of references to linked BareMetal resources. */
  readonly hostedWorkloads?: string[];
  /** A reference to the dscp configuration to which the network interface is linked. */
  readonly dscpConfiguration?: SubResource;
  /** The resource GUID property of the network interface resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the network interface resource. */
  readonly provisioningState?: ProvisioningState;
  /** WorkloadType of the NetworkInterface for BareMetal resources */
  workloadType?: string;
  /** Type of Network Interface resource. */
  nicType?: NetworkInterfaceNicType;
  /** Privatelinkservice of the network interface resource. */
  privateLinkService?: PrivateLinkService;
  /** Migration phase of Network Interface resource. */
  migrationPhase?: NetworkInterfaceMigrationPhase;
  /** Auxiliary mode of Network Interface resource. */
  auxiliaryMode?: NetworkInterfaceAuxiliaryMode;
  /** Auxiliary sku of Network Interface resource. */
  auxiliarySku?: NetworkInterfaceAuxiliarySku;
}

export function networkInterfacePropertiesFormatSerializer(
  item: NetworkInterfacePropertiesFormat,
): any {
  return {
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : networkSecurityGroupSerializer(item["networkSecurityGroup"]),
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : networkInterfaceIPConfigurationArraySerializer(item["ipConfigurations"]),
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : networkInterfaceDnsSettingsSerializer(item["dnsSettings"]),
    enableAcceleratedNetworking: item["enableAcceleratedNetworking"],
    disableTcpStateTracking: item["disableTcpStateTracking"],
    enableIPForwarding: item["enableIPForwarding"],
    workloadType: item["workloadType"],
    nicType: item["nicType"],
    privateLinkService: !item["privateLinkService"]
      ? item["privateLinkService"]
      : privateLinkServiceSerializer(item["privateLinkService"]),
    migrationPhase: item["migrationPhase"],
    auxiliaryMode: item["auxiliaryMode"],
    auxiliarySku: item["auxiliarySku"],
  };
}

export function networkInterfacePropertiesFormatDeserializer(
  item: any,
): NetworkInterfacePropertiesFormat {
  return {
    virtualMachine: !item["virtualMachine"]
      ? item["virtualMachine"]
      : subResourceDeserializer(item["virtualMachine"]),
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : networkSecurityGroupDeserializer(item["networkSecurityGroup"]),
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : networkInterfaceIPConfigurationArrayDeserializer(item["ipConfigurations"]),
    tapConfigurations: !item["tapConfigurations"]
      ? item["tapConfigurations"]
      : networkInterfaceTapConfigurationArrayDeserializer(item["tapConfigurations"]),
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : networkInterfaceDnsSettingsDeserializer(item["dnsSettings"]),
    macAddress: item["macAddress"],
    primary: item["primary"],
    vnetEncryptionSupported: item["vnetEncryptionSupported"],
    defaultOutboundConnectivityEnabled: item["defaultOutboundConnectivityEnabled"],
    enableAcceleratedNetworking: item["enableAcceleratedNetworking"],
    disableTcpStateTracking: item["disableTcpStateTracking"],
    enableIPForwarding: item["enableIPForwarding"],
    hostedWorkloads: !item["hostedWorkloads"]
      ? item["hostedWorkloads"]
      : item["hostedWorkloads"].map((p: any) => {
          return p;
        }),
    dscpConfiguration: !item["dscpConfiguration"]
      ? item["dscpConfiguration"]
      : subResourceDeserializer(item["dscpConfiguration"]),
    resourceGuid: item["resourceGuid"],
    provisioningState: item["provisioningState"],
    workloadType: item["workloadType"],
    nicType: item["nicType"],
    privateLinkService: !item["privateLinkService"]
      ? item["privateLinkService"]
      : privateLinkServiceDeserializer(item["privateLinkService"]),
    migrationPhase: item["migrationPhase"],
    auxiliaryMode: item["auxiliaryMode"],
    auxiliarySku: item["auxiliarySku"],
  };
}

/** Private endpoint resource. */
export interface PrivateEndpoint extends Resource {
  /** The extended location of the load balancer. */
  extendedLocation?: ExtendedLocation;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The ID of the subnet from which the private IP will be allocated. */
  subnet?: Subnet;
  /** An array of references to the network interfaces created for this private endpoint. */
  readonly networkInterfaces?: NetworkInterface[];
  /** The provisioning state of the private endpoint resource. */
  readonly provisioningState?: ProvisioningState;
  /** Specifies the IP version type for the private IPs of the private endpoint. If not defined, this defaults to IPv4. */
  ipVersionType?: PrivateEndpointIPVersionType;
  /** A grouping of information about the connection to the remote resource. */
  privateLinkServiceConnections?: PrivateLinkServiceConnection[];
  /** A grouping of information about the connection to the remote resource. Used when the network admin does not have access to approve connections to the remote resource. */
  manualPrivateLinkServiceConnections?: PrivateLinkServiceConnection[];
  /** An array of custom dns configurations. */
  customDnsConfigs?: CustomDnsConfigPropertiesFormat[];
  /** Application security groups in which the private endpoint IP configuration is included. */
  applicationSecurityGroups?: ApplicationSecurityGroup[];
  /** A list of IP configurations of the private endpoint. This will be used to map to the First Party Service's endpoints. */
  ipConfigurations?: PrivateEndpointIPConfiguration[];
  /** The custom name of the network interface attached to the private endpoint. */
  customNetworkInterfaceName?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return {
    id: item["id"],
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "subnet",
      "ipVersionType",
      "privateLinkServiceConnections",
      "manualPrivateLinkServiceConnections",
      "customDnsConfigs",
      "applicationSecurityGroups",
      "ipConfigurations",
      "customNetworkInterfaceName",
    ])
      ? undefined
      : _privateEndpointPropertiesSerializer(item),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointPropertiesDeserializer(item["properties"])),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    etag: item["etag"],
  };
}

/** Properties of the private endpoint. */
export interface PrivateEndpointProperties {
  /** The ID of the subnet from which the private IP will be allocated. */
  subnet?: Subnet;
  /** An array of references to the network interfaces created for this private endpoint. */
  readonly networkInterfaces?: NetworkInterface[];
  /** The provisioning state of the private endpoint resource. */
  readonly provisioningState?: ProvisioningState;
  /** Specifies the IP version type for the private IPs of the private endpoint. If not defined, this defaults to IPv4. */
  ipVersionType?: PrivateEndpointIPVersionType;
  /** A grouping of information about the connection to the remote resource. */
  privateLinkServiceConnections?: PrivateLinkServiceConnection[];
  /** A grouping of information about the connection to the remote resource. Used when the network admin does not have access to approve connections to the remote resource. */
  manualPrivateLinkServiceConnections?: PrivateLinkServiceConnection[];
  /** An array of custom dns configurations. */
  customDnsConfigs?: CustomDnsConfigPropertiesFormat[];
  /** Application security groups in which the private endpoint IP configuration is included. */
  applicationSecurityGroups?: ApplicationSecurityGroup[];
  /** A list of IP configurations of the private endpoint. This will be used to map to the First Party Service's endpoints. */
  ipConfigurations?: PrivateEndpointIPConfiguration[];
  /** The custom name of the network interface attached to the private endpoint. */
  customNetworkInterfaceName?: string;
}

export function privateEndpointPropertiesSerializer(item: PrivateEndpointProperties): any {
  return {
    subnet: !item["subnet"] ? item["subnet"] : subnetSerializer(item["subnet"]),
    ipVersionType: item["ipVersionType"],
    privateLinkServiceConnections: !item["privateLinkServiceConnections"]
      ? item["privateLinkServiceConnections"]
      : privateLinkServiceConnectionArraySerializer(item["privateLinkServiceConnections"]),
    manualPrivateLinkServiceConnections: !item["manualPrivateLinkServiceConnections"]
      ? item["manualPrivateLinkServiceConnections"]
      : privateLinkServiceConnectionArraySerializer(item["manualPrivateLinkServiceConnections"]),
    customDnsConfigs: !item["customDnsConfigs"]
      ? item["customDnsConfigs"]
      : customDnsConfigPropertiesFormatArraySerializer(item["customDnsConfigs"]),
    applicationSecurityGroups: !item["applicationSecurityGroups"]
      ? item["applicationSecurityGroups"]
      : applicationSecurityGroupArraySerializer(item["applicationSecurityGroups"]),
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : privateEndpointIPConfigurationArraySerializer(item["ipConfigurations"]),
    customNetworkInterfaceName: item["customNetworkInterfaceName"],
  };
}

export function privateEndpointPropertiesDeserializer(item: any): PrivateEndpointProperties {
  return {
    subnet: !item["subnet"] ? item["subnet"] : subnetDeserializer(item["subnet"]),
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceArrayDeserializer(item["networkInterfaces"]),
    provisioningState: item["provisioningState"],
    ipVersionType: item["ipVersionType"],
    privateLinkServiceConnections: !item["privateLinkServiceConnections"]
      ? item["privateLinkServiceConnections"]
      : privateLinkServiceConnectionArrayDeserializer(item["privateLinkServiceConnections"]),
    manualPrivateLinkServiceConnections: !item["manualPrivateLinkServiceConnections"]
      ? item["manualPrivateLinkServiceConnections"]
      : privateLinkServiceConnectionArrayDeserializer(item["manualPrivateLinkServiceConnections"]),
    customDnsConfigs: !item["customDnsConfigs"]
      ? item["customDnsConfigs"]
      : customDnsConfigPropertiesFormatArrayDeserializer(item["customDnsConfigs"]),
    applicationSecurityGroups: !item["applicationSecurityGroups"]
      ? item["applicationSecurityGroups"]
      : applicationSecurityGroupArrayDeserializer(item["applicationSecurityGroups"]),
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : privateEndpointIPConfigurationArrayDeserializer(item["ipConfigurations"]),
    customNetworkInterfaceName: item["customNetworkInterfaceName"],
  };
}

/** Specifies the IP version type for the private IPs of the private endpoint. If not defined, this defaults to IPv4. */
export enum KnownPrivateEndpointIPVersionType {
  /** Indicates that the Private IPs of the private endpoint will be IPv4 only. */
  IPv4 = "IPv4",
  /** Indicates that the Private IPs of the private endpoint will be IPv6 only. */
  IPv6 = "IPv6",
  /** Indicates that the Private IPs of the private endpoint can be both IPv4 and IPv6. */
  DualStack = "DualStack",
}

/**
 * Specifies the IP version type for the private IPs of the private endpoint. If not defined, this defaults to IPv4. \
 * {@link KnownPrivateEndpointIPVersionType} can be used interchangeably with PrivateEndpointIPVersionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPv4**: Indicates that the Private IPs of the private endpoint will be IPv4 only. \
 * **IPv6**: Indicates that the Private IPs of the private endpoint will be IPv6 only. \
 * **DualStack**: Indicates that the Private IPs of the private endpoint can be both IPv4 and IPv6.
 */
export type PrivateEndpointIPVersionType = string;

export function privateLinkServiceConnectionArraySerializer(
  result: Array<PrivateLinkServiceConnection>,
): any[] {
  return result.map((item) => {
    return privateLinkServiceConnectionSerializer(item);
  });
}

export function privateLinkServiceConnectionArrayDeserializer(
  result: Array<PrivateLinkServiceConnection>,
): any[] {
  return result.map((item) => {
    return privateLinkServiceConnectionDeserializer(item);
  });
}

/** PrivateLinkServiceConnection resource. */
export interface PrivateLinkServiceConnection extends SubResource {
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** The resource type. */
  readonly type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The provisioning state of the private link service connection resource. */
  readonly provisioningState?: ProvisioningState;
  /** The resource id of private link service. */
  privateLinkServiceId?: string;
  /** The ID(s) of the group(s) obtained from the remote resource that this private endpoint should connect to. */
  groupIds?: string[];
  /** A message passed to the owner of the remote resource with this connection request. Restricted to 140 chars. */
  requestMessage?: string;
  /** A collection of read-only information about the state of the connection to the remote resource. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

export function privateLinkServiceConnectionSerializer(item: PrivateLinkServiceConnection): any {
  return {
    id: item["id"],
    properties: areAllPropsUndefined(item, [
      "privateLinkServiceId",
      "groupIds",
      "requestMessage",
      "privateLinkServiceConnectionState",
    ])
      ? undefined
      : _privateLinkServiceConnectionPropertiesSerializer(item),
    name: item["name"],
  };
}

export function privateLinkServiceConnectionDeserializer(item: any): PrivateLinkServiceConnection {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkServiceConnectionPropertiesDeserializer(item["properties"])),
    name: item["name"],
    type: item["type"],
    etag: item["etag"],
  };
}

/** Properties of the PrivateLinkServiceConnection. */
export interface PrivateLinkServiceConnectionProperties {
  /** The provisioning state of the private link service connection resource. */
  readonly provisioningState?: ProvisioningState;
  /** The resource id of private link service. */
  privateLinkServiceId?: string;
  /** The ID(s) of the group(s) obtained from the remote resource that this private endpoint should connect to. */
  groupIds?: string[];
  /** A message passed to the owner of the remote resource with this connection request. Restricted to 140 chars. */
  requestMessage?: string;
  /** A collection of read-only information about the state of the connection to the remote resource. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

export function privateLinkServiceConnectionPropertiesSerializer(
  item: PrivateLinkServiceConnectionProperties,
): any {
  return {
    privateLinkServiceId: item["privateLinkServiceId"],
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    requestMessage: item["requestMessage"],
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function privateLinkServiceConnectionPropertiesDeserializer(
  item: any,
): PrivateLinkServiceConnectionProperties {
  return {
    provisioningState: item["provisioningState"],
    privateLinkServiceId: item["privateLinkServiceId"],
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    requestMessage: item["requestMessage"],
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
  };
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

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

export function customDnsConfigPropertiesFormatArraySerializer(
  result: Array<CustomDnsConfigPropertiesFormat>,
): any[] {
  return result.map((item) => {
    return customDnsConfigPropertiesFormatSerializer(item);
  });
}

export function customDnsConfigPropertiesFormatArrayDeserializer(
  result: Array<CustomDnsConfigPropertiesFormat>,
): any[] {
  return result.map((item) => {
    return customDnsConfigPropertiesFormatDeserializer(item);
  });
}

/** Contains custom Dns resolution configuration from customer. */
export interface CustomDnsConfigPropertiesFormat {
  /** Fqdn that resolves to private endpoint ip address. */
  fqdn?: string;
  /** A list of private ip addresses of the private endpoint. */
  ipAddresses?: string[];
}

export function customDnsConfigPropertiesFormatSerializer(
  item: CustomDnsConfigPropertiesFormat,
): any {
  return {
    fqdn: item["fqdn"],
    ipAddresses: !item["ipAddresses"]
      ? item["ipAddresses"]
      : item["ipAddresses"].map((p: any) => {
          return p;
        }),
  };
}

export function customDnsConfigPropertiesFormatDeserializer(
  item: any,
): CustomDnsConfigPropertiesFormat {
  return {
    fqdn: item["fqdn"],
    ipAddresses: !item["ipAddresses"]
      ? item["ipAddresses"]
      : item["ipAddresses"].map((p: any) => {
          return p;
        }),
  };
}

export function privateEndpointIPConfigurationArraySerializer(
  result: Array<PrivateEndpointIPConfiguration>,
): any[] {
  return result.map((item) => {
    return privateEndpointIPConfigurationSerializer(item);
  });
}

export function privateEndpointIPConfigurationArrayDeserializer(
  result: Array<PrivateEndpointIPConfiguration>,
): any[] {
  return result.map((item) => {
    return privateEndpointIPConfigurationDeserializer(item);
  });
}

/** An IP Configuration of the private endpoint. */
export interface PrivateEndpointIPConfiguration {
  /** The name of the resource that is unique within a resource group. */
  name?: string;
  /** The resource type. */
  readonly type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The ID of a group obtained from the remote resource that this private endpoint should connect to. */
  groupId?: string;
  /** The member name of a group obtained from the remote resource that this private endpoint should connect to. */
  memberName?: string;
  /** A private ip address obtained from the private endpoint's subnet. */
  privateIPAddress?: string;
}

export function privateEndpointIPConfigurationSerializer(
  item: PrivateEndpointIPConfiguration,
): any {
  return {
    properties: areAllPropsUndefined(item, ["groupId", "memberName", "privateIPAddress"])
      ? undefined
      : _privateEndpointIPConfigurationPropertiesSerializer(item),
    name: item["name"],
  };
}

export function privateEndpointIPConfigurationDeserializer(
  item: any,
): PrivateEndpointIPConfiguration {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointIPConfigurationPropertiesDeserializer(item["properties"])),
    name: item["name"],
    type: item["type"],
    etag: item["etag"],
  };
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

export function privateEndpointIPConfigurationPropertiesSerializer(
  item: PrivateEndpointIPConfigurationProperties,
): any {
  return {
    groupId: item["groupId"],
    memberName: item["memberName"],
    privateIPAddress: item["privateIPAddress"],
  };
}

export function privateEndpointIPConfigurationPropertiesDeserializer(
  item: any,
): PrivateEndpointIPConfigurationProperties {
  return {
    groupId: item["groupId"],
    memberName: item["memberName"],
    privateIPAddress: item["privateIPAddress"],
  };
}

/** ExtendedLocation complex type. */
export interface ExtendedLocation {
  /** The name of the extended location. */
  name?: string;
  /** The type of the extended location. */
  type?: ExtendedLocationTypes;
}

export function extendedLocationSerializer(item: ExtendedLocation): any {
  return { name: item["name"], type: item["type"] };
}

export function extendedLocationDeserializer(item: any): ExtendedLocation {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The supported ExtendedLocation types. Currently only EdgeZone is supported in Microsoft.Network resources. */
export enum KnownExtendedLocationTypes {
  /** EdgeZone */
  EdgeZone = "EdgeZone",
}

/**
 * The supported ExtendedLocation types. Currently only EdgeZone is supported in Microsoft.Network resources. \
 * {@link KnownExtendedLocationTypes} can be used interchangeably with ExtendedLocationTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EdgeZone**: EdgeZone
 */
export type ExtendedLocationTypes = string;

/** DNS settings of a network interface. */
export interface NetworkInterfaceDnsSettings {
  /** List of DNS servers IP addresses. Use 'AzureProvidedDNS' to switch to azure provided DNS resolution. 'AzureProvidedDNS' value cannot be combined with other IPs, it must be the only value in dnsServers collection. */
  dnsServers?: string[];
  /** If the VM that uses this NIC is part of an Availability Set, then this list will have the union of all DNS servers from all NICs that are part of the Availability Set. This property is what is configured on each of those VMs. */
  readonly appliedDnsServers?: string[];
  /** Relative DNS name for this NIC used for internal communications between VMs in the same virtual network. */
  internalDnsNameLabel?: string;
  /** Fully qualified DNS name supporting internal communications between VMs in the same virtual network. */
  readonly internalFqdn?: string;
  /** Even if internalDnsNameLabel is not specified, a DNS entry is created for the primary NIC of the VM. This DNS name can be constructed by concatenating the VM name with the value of internalDomainNameSuffix. */
  readonly internalDomainNameSuffix?: string;
}

export function networkInterfaceDnsSettingsSerializer(item: NetworkInterfaceDnsSettings): any {
  return {
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
    internalDnsNameLabel: item["internalDnsNameLabel"],
  };
}

export function networkInterfaceDnsSettingsDeserializer(item: any): NetworkInterfaceDnsSettings {
  return {
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
    appliedDnsServers: !item["appliedDnsServers"]
      ? item["appliedDnsServers"]
      : item["appliedDnsServers"].map((p: any) => {
          return p;
        }),
    internalDnsNameLabel: item["internalDnsNameLabel"],
    internalFqdn: item["internalFqdn"],
    internalDomainNameSuffix: item["internalDomainNameSuffix"],
  };
}

/** Type of Network Interface resource. */
export enum KnownNetworkInterfaceNicType {
  /** Standard */
  Standard = "Standard",
  /** Elastic */
  Elastic = "Elastic",
}

/**
 * Type of Network Interface resource. \
 * {@link KnownNetworkInterfaceNicType} can be used interchangeably with NetworkInterfaceNicType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**: Standard \
 * **Elastic**: Elastic
 */
export type NetworkInterfaceNicType = string;

/** Private link service resource. */
export interface PrivateLinkService extends Resource {
  /** The extended location of the load balancer. */
  extendedLocation?: ExtendedLocation;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** An array of references to the load balancer IP configurations. */
  loadBalancerFrontendIpConfigurations?: FrontendIPConfiguration[];
  /** An array of private link service IP configurations. */
  ipConfigurations?: PrivateLinkServiceIpConfiguration[];
  /** The destination IP address of the private link service. */
  destinationIPAddress?: string;
  /** The access mode of the private link service. */
  accessMode?: AccessMode;
  /** An array of references to the network interfaces created for this private link service. */
  readonly networkInterfaces?: NetworkInterface[];
  /** The provisioning state of the private link service resource. */
  readonly provisioningState?: ProvisioningState;
  /** An array of list about connections to the private endpoint. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** The visibility list of the private link service. */
  visibility?: PrivateLinkServicePropertiesVisibility;
  /** The auto-approval list of the private link service. */
  autoApproval?: PrivateLinkServicePropertiesAutoApproval;
  /** The list of Fqdn. */
  fqdns?: string[];
  /** The alias of the private link service. */
  readonly alias?: string;
  /** Whether the private link service is enabled for proxy protocol or not. */
  enableProxyProtocol?: boolean;
}

export function privateLinkServiceSerializer(item: PrivateLinkService): any {
  return {
    id: item["id"],
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "loadBalancerFrontendIpConfigurations",
      "ipConfigurations",
      "destinationIPAddress",
      "accessMode",
      "visibility",
      "autoApproval",
      "fqdns",
      "enableProxyProtocol",
    ])
      ? undefined
      : _privateLinkServicePropertiesSerializer(item),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function privateLinkServiceDeserializer(item: any): PrivateLinkService {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkServicePropertiesDeserializer(item["properties"])),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    etag: item["etag"],
  };
}

/** Properties of the private link service. */
export interface PrivateLinkServiceProperties {
  /** An array of references to the load balancer IP configurations. */
  loadBalancerFrontendIpConfigurations?: FrontendIPConfiguration[];
  /** An array of private link service IP configurations. */
  ipConfigurations?: PrivateLinkServiceIpConfiguration[];
  /** The destination IP address of the private link service. */
  destinationIPAddress?: string;
  /** The access mode of the private link service. */
  accessMode?: AccessMode;
  /** An array of references to the network interfaces created for this private link service. */
  readonly networkInterfaces?: NetworkInterface[];
  /** The provisioning state of the private link service resource. */
  readonly provisioningState?: ProvisioningState;
  /** An array of list about connections to the private endpoint. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** The visibility list of the private link service. */
  visibility?: PrivateLinkServicePropertiesVisibility;
  /** The auto-approval list of the private link service. */
  autoApproval?: PrivateLinkServicePropertiesAutoApproval;
  /** The list of Fqdn. */
  fqdns?: string[];
  /** The alias of the private link service. */
  readonly alias?: string;
  /** Whether the private link service is enabled for proxy protocol or not. */
  enableProxyProtocol?: boolean;
}

export function privateLinkServicePropertiesSerializer(item: PrivateLinkServiceProperties): any {
  return {
    loadBalancerFrontendIpConfigurations: !item["loadBalancerFrontendIpConfigurations"]
      ? item["loadBalancerFrontendIpConfigurations"]
      : frontendIPConfigurationArraySerializer(item["loadBalancerFrontendIpConfigurations"]),
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : privateLinkServiceIpConfigurationArraySerializer(item["ipConfigurations"]),
    destinationIPAddress: item["destinationIPAddress"],
    accessMode: item["accessMode"],
    visibility: !item["visibility"]
      ? item["visibility"]
      : privateLinkServicePropertiesVisibilitySerializer(item["visibility"]),
    autoApproval: !item["autoApproval"]
      ? item["autoApproval"]
      : privateLinkServicePropertiesAutoApprovalSerializer(item["autoApproval"]),
    fqdns: !item["fqdns"]
      ? item["fqdns"]
      : item["fqdns"].map((p: any) => {
          return p;
        }),
    enableProxyProtocol: item["enableProxyProtocol"],
  };
}

export function privateLinkServicePropertiesDeserializer(item: any): PrivateLinkServiceProperties {
  return {
    loadBalancerFrontendIpConfigurations: !item["loadBalancerFrontendIpConfigurations"]
      ? item["loadBalancerFrontendIpConfigurations"]
      : frontendIPConfigurationArrayDeserializer(item["loadBalancerFrontendIpConfigurations"]),
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : privateLinkServiceIpConfigurationArrayDeserializer(item["ipConfigurations"]),
    destinationIPAddress: item["destinationIPAddress"],
    accessMode: item["accessMode"],
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceArrayDeserializer(item["networkInterfaces"]),
    provisioningState: item["provisioningState"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    visibility: !item["visibility"]
      ? item["visibility"]
      : privateLinkServicePropertiesVisibilityDeserializer(item["visibility"]),
    autoApproval: !item["autoApproval"]
      ? item["autoApproval"]
      : privateLinkServicePropertiesAutoApprovalDeserializer(item["autoApproval"]),
    fqdns: !item["fqdns"]
      ? item["fqdns"]
      : item["fqdns"].map((p: any) => {
          return p;
        }),
    alias: item["alias"],
    enableProxyProtocol: item["enableProxyProtocol"],
  };
}

export function frontendIPConfigurationArraySerializer(
  result: Array<FrontendIPConfiguration>,
): any[] {
  return result.map((item) => {
    return frontendIPConfigurationSerializer(item);
  });
}

export function frontendIPConfigurationArrayDeserializer(
  result: Array<FrontendIPConfiguration>,
): any[] {
  return result.map((item) => {
    return frontendIPConfigurationDeserializer(item);
  });
}

export function privateLinkServiceIpConfigurationArraySerializer(
  result: Array<PrivateLinkServiceIpConfiguration>,
): any[] {
  return result.map((item) => {
    return privateLinkServiceIpConfigurationSerializer(item);
  });
}

export function privateLinkServiceIpConfigurationArrayDeserializer(
  result: Array<PrivateLinkServiceIpConfiguration>,
): any[] {
  return result.map((item) => {
    return privateLinkServiceIpConfigurationDeserializer(item);
  });
}

/** The private link service ip configuration. */
export interface PrivateLinkServiceIpConfiguration extends SubResource {
  /** The name of private link service ip configuration. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The resource type. */
  readonly type?: string;
  /** The private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: IPAllocationMethod;
  /** The reference to the subnet resource. */
  subnet?: Subnet;
  /** Whether the ip configuration is primary or not. */
  primary?: boolean;
  /** The provisioning state of the private link service IP configuration resource. */
  readonly provisioningState?: ProvisioningState;
  /** Whether the specific IP configuration is IPv4 or IPv6. Default is IPv4. */
  privateIPAddressVersion?: IPVersion;
}

export function privateLinkServiceIpConfigurationSerializer(
  item: PrivateLinkServiceIpConfiguration,
): any {
  return {
    id: item["id"],
    properties: areAllPropsUndefined(item, [
      "privateIPAddress",
      "privateIPAllocationMethod",
      "subnet",
      "primary",
      "privateIPAddressVersion",
    ])
      ? undefined
      : _privateLinkServiceIpConfigurationPropertiesSerializer(item),
    name: item["name"],
  };
}

export function privateLinkServiceIpConfigurationDeserializer(
  item: any,
): PrivateLinkServiceIpConfiguration {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkServiceIpConfigurationPropertiesDeserializer(item["properties"])),
    name: item["name"],
    etag: item["etag"],
    type: item["type"],
  };
}

/** Properties of private link service IP configuration. */
export interface PrivateLinkServiceIpConfigurationProperties {
  /** The private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: IPAllocationMethod;
  /** The reference to the subnet resource. */
  subnet?: Subnet;
  /** Whether the ip configuration is primary or not. */
  primary?: boolean;
  /** The provisioning state of the private link service IP configuration resource. */
  readonly provisioningState?: ProvisioningState;
  /** Whether the specific IP configuration is IPv4 or IPv6. Default is IPv4. */
  privateIPAddressVersion?: IPVersion;
}

export function privateLinkServiceIpConfigurationPropertiesSerializer(
  item: PrivateLinkServiceIpConfigurationProperties,
): any {
  return {
    privateIPAddress: item["privateIPAddress"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    subnet: !item["subnet"] ? item["subnet"] : subnetSerializer(item["subnet"]),
    primary: item["primary"],
    privateIPAddressVersion: item["privateIPAddressVersion"],
  };
}

export function privateLinkServiceIpConfigurationPropertiesDeserializer(
  item: any,
): PrivateLinkServiceIpConfigurationProperties {
  return {
    privateIPAddress: item["privateIPAddress"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    subnet: !item["subnet"] ? item["subnet"] : subnetDeserializer(item["subnet"]),
    primary: item["primary"],
    provisioningState: item["provisioningState"],
    privateIPAddressVersion: item["privateIPAddressVersion"],
  };
}

/** The access mode of the private link service. */
export enum KnownAccessMode {
  /** Allows unrestricted access to the private link service. */
  Default = "Default",
  /** Limits access to subscriptions which are inside visibility list only. */
  Restricted = "Restricted",
}

/**
 * The access mode of the private link service. \
 * {@link KnownAccessMode} can be used interchangeably with AccessMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Allows unrestricted access to the private link service. \
 * **Restricted**: Limits access to subscriptions which are inside visibility list only.
 */
export type AccessMode = string;

export function privateEndpointConnectionArraySerializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** PrivateEndpointConnection resource. */
export interface PrivateEndpointConnection extends SubResourceModel {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The resource of private end point. */
  readonly privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: ProvisioningState;
  /** The consumer link id. */
  readonly linkIdentifier?: string;
  /** The location of the private endpoint. */
  readonly privateEndpointLocation?: string;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    name: item["name"],
    id: item["id"],
    properties: areAllPropsUndefined(item, ["privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    name: item["name"],
    type: item["type"],
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Properties of the PrivateEndpointConnectProperties. */
export interface PrivateEndpointConnectionProperties {
  /** The resource of private end point. */
  readonly privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: ProvisioningState;
  /** The consumer link id. */
  readonly linkIdentifier?: string;
  /** The location of the private endpoint. */
  readonly privateEndpointLocation?: string;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
    linkIdentifier: item["linkIdentifier"],
    privateEndpointLocation: item["privateEndpointLocation"],
  };
}

/** The visibility list of the private link service. */
export interface PrivateLinkServicePropertiesVisibility extends ResourceSet {}

export function privateLinkServicePropertiesVisibilitySerializer(
  item: PrivateLinkServicePropertiesVisibility,
): any {
  return {
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : item["subscriptions"].map((p: any) => {
          return p;
        }),
  };
}

export function privateLinkServicePropertiesVisibilityDeserializer(
  item: any,
): PrivateLinkServicePropertiesVisibility {
  return {
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : item["subscriptions"].map((p: any) => {
          return p;
        }),
  };
}

/** The auto-approval list of the private link service. */
export interface PrivateLinkServicePropertiesAutoApproval extends ResourceSet {}

export function privateLinkServicePropertiesAutoApprovalSerializer(
  item: PrivateLinkServicePropertiesAutoApproval,
): any {
  return {
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : item["subscriptions"].map((p: any) => {
          return p;
        }),
  };
}

export function privateLinkServicePropertiesAutoApprovalDeserializer(
  item: any,
): PrivateLinkServicePropertiesAutoApproval {
  return {
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : item["subscriptions"].map((p: any) => {
          return p;
        }),
  };
}

/** Migration phase of Network Interface resource. */
export enum KnownNetworkInterfaceMigrationPhase {
  /** None */
  None = "None",
  /** Prepare */
  Prepare = "Prepare",
  /** Commit */
  Commit = "Commit",
  /** Abort */
  Abort = "Abort",
  /** Committed */
  Committed = "Committed",
}

/**
 * Migration phase of Network Interface resource. \
 * {@link KnownNetworkInterfaceMigrationPhase} can be used interchangeably with NetworkInterfaceMigrationPhase,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Prepare**: Prepare \
 * **Commit**: Commit \
 * **Abort**: Abort \
 * **Committed**: Committed
 */
export type NetworkInterfaceMigrationPhase = string;

/** Auxiliary mode of Network Interface resource. */
export enum KnownNetworkInterfaceAuxiliaryMode {
  /** None */
  None = "None",
  /** MaxConnections */
  MaxConnections = "MaxConnections",
  /** Floating */
  Floating = "Floating",
  /** AcceleratedConnections */
  AcceleratedConnections = "AcceleratedConnections",
}

/**
 * Auxiliary mode of Network Interface resource. \
 * {@link KnownNetworkInterfaceAuxiliaryMode} can be used interchangeably with NetworkInterfaceAuxiliaryMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **MaxConnections**: MaxConnections \
 * **Floating**: Floating \
 * **AcceleratedConnections**: AcceleratedConnections
 */
export type NetworkInterfaceAuxiliaryMode = string;

/** Auxiliary sku of Network Interface resource. */
export enum KnownNetworkInterfaceAuxiliarySku {
  /** None */
  None = "None",
  /** A1 */
  A1 = "A1",
  /** A2 */
  A2 = "A2",
  /** A4 */
  A4 = "A4",
  /** A8 */
  A8 = "A8",
}

/**
 * Auxiliary sku of Network Interface resource. \
 * {@link KnownNetworkInterfaceAuxiliarySku} can be used interchangeably with NetworkInterfaceAuxiliarySku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **A1**: A1 \
 * **A2**: A2 \
 * **A4**: A4 \
 * **A8**: A8
 */
export type NetworkInterfaceAuxiliarySku = string;

export function subnetArraySerializer(result: Array<Subnet>): any[] {
  return result.map((item) => {
    return subnetSerializer(item);
  });
}

export function subnetArrayDeserializer(result: Array<Subnet>): any[] {
  return result.map((item) => {
    return subnetDeserializer(item);
  });
}

export function flowLogArraySerializer(result: Array<FlowLog>): any[] {
  return result.map((item) => {
    return flowLogSerializer(item);
  });
}

export function flowLogArrayDeserializer(result: Array<FlowLog>): any[] {
  return result.map((item) => {
    return flowLogDeserializer(item);
  });
}

/** A flow log resource. */
export interface FlowLog extends Resource {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** FlowLog resource Managed Identity */
  identity?: ManagedServiceIdentity;
  /** ID of network security group to which flow log will be applied. */
  targetResourceId?: string;
  /** Guid of network security group to which flow log will be applied. */
  readonly targetResourceGuid?: string;
  /** ID of the storage account which is used to store the flow log. */
  storageId?: string;
  /** Optional field to filter network traffic logs based on SrcIP, SrcPort, DstIP, DstPort, Protocol, Encryption, Direction and Action. If not specified, all network traffic will be logged. */
  enabledFilteringCriteria?: string;
  /** Optional field to filter network traffic logs based on flow states. Value of this field could be any comma separated combination string of letters B,C,E or D. B represents Begin, when a flow is created. C represents Continue for an ongoing flow generated at every five-minute interval. E represents End, when a flow is terminated. D represents Deny, when a flow is denied. If not specified, all network traffic will be logged. */
  recordTypes?: string;
  /** Flag to enable/disable flow logging. */
  enabled?: boolean;
  /** Parameters that define the retention policy for flow log. */
  retentionPolicy?: RetentionPolicyParameters;
  /** Parameters that define the flow log format. */
  format?: FlowLogFormatParameters;
  /** Parameters that define the configuration of traffic analytics. */
  flowAnalyticsConfiguration?: TrafficAnalyticsProperties;
  /** The provisioning state of the flow log. */
  readonly provisioningState?: ProvisioningState;
}

export function flowLogSerializer(item: FlowLog): any {
  return {
    id: item["id"],
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "targetResourceId",
      "storageId",
      "enabledFilteringCriteria",
      "recordTypes",
      "enabled",
      "retentionPolicy",
      "format",
      "flowAnalyticsConfiguration",
    ])
      ? undefined
      : _flowLogPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function flowLogDeserializer(item: any): FlowLog {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _flowLogPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Parameters that define the configuration of flow log. */
export interface FlowLogPropertiesFormat {
  /** ID of network security group to which flow log will be applied. */
  targetResourceId: string;
  /** Guid of network security group to which flow log will be applied. */
  readonly targetResourceGuid?: string;
  /** ID of the storage account which is used to store the flow log. */
  storageId: string;
  /** Optional field to filter network traffic logs based on SrcIP, SrcPort, DstIP, DstPort, Protocol, Encryption, Direction and Action. If not specified, all network traffic will be logged. */
  enabledFilteringCriteria?: string;
  /** Optional field to filter network traffic logs based on flow states. Value of this field could be any comma separated combination string of letters B,C,E or D. B represents Begin, when a flow is created. C represents Continue for an ongoing flow generated at every five-minute interval. E represents End, when a flow is terminated. D represents Deny, when a flow is denied. If not specified, all network traffic will be logged. */
  recordTypes?: string;
  /** Flag to enable/disable flow logging. */
  enabled?: boolean;
  /** Parameters that define the retention policy for flow log. */
  retentionPolicy?: RetentionPolicyParameters;
  /** Parameters that define the flow log format. */
  format?: FlowLogFormatParameters;
  /** Parameters that define the configuration of traffic analytics. */
  flowAnalyticsConfiguration?: TrafficAnalyticsProperties;
  /** The provisioning state of the flow log. */
  readonly provisioningState?: ProvisioningState;
}

export function flowLogPropertiesFormatSerializer(item: FlowLogPropertiesFormat): any {
  return {
    targetResourceId: item["targetResourceId"],
    storageId: item["storageId"],
    enabledFilteringCriteria: item["enabledFilteringCriteria"],
    recordTypes: item["recordTypes"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyParametersSerializer(item["retentionPolicy"]),
    format: !item["format"] ? item["format"] : flowLogFormatParametersSerializer(item["format"]),
    flowAnalyticsConfiguration: !item["flowAnalyticsConfiguration"]
      ? item["flowAnalyticsConfiguration"]
      : trafficAnalyticsPropertiesSerializer(item["flowAnalyticsConfiguration"]),
  };
}

export function flowLogPropertiesFormatDeserializer(item: any): FlowLogPropertiesFormat {
  return {
    targetResourceId: item["targetResourceId"],
    targetResourceGuid: item["targetResourceGuid"],
    storageId: item["storageId"],
    enabledFilteringCriteria: item["enabledFilteringCriteria"],
    recordTypes: item["recordTypes"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyParametersDeserializer(item["retentionPolicy"]),
    format: !item["format"] ? item["format"] : flowLogFormatParametersDeserializer(item["format"]),
    flowAnalyticsConfiguration: !item["flowAnalyticsConfiguration"]
      ? item["flowAnalyticsConfiguration"]
      : trafficAnalyticsPropertiesDeserializer(item["flowAnalyticsConfiguration"]),
    provisioningState: item["provisioningState"],
  };
}

/** Parameters that define the retention policy for flow log. */
export interface RetentionPolicyParameters {
  /** Number of days to retain flow log records. */
  days?: number;
  /** Flag to enable/disable retention. */
  enabled?: boolean;
}

export function retentionPolicyParametersSerializer(item: RetentionPolicyParameters): any {
  return { days: item["days"], enabled: item["enabled"] };
}

export function retentionPolicyParametersDeserializer(item: any): RetentionPolicyParameters {
  return {
    days: item["days"],
    enabled: item["enabled"],
  };
}

/** Parameters that define the flow log format. */
export interface FlowLogFormatParameters {
  /** The file type of flow log. */
  type?: FlowLogFormatType;
  /** The version (revision) of the flow log. */
  version?: number;
}

export function flowLogFormatParametersSerializer(item: FlowLogFormatParameters): any {
  return { type: item["type"], version: item["version"] };
}

export function flowLogFormatParametersDeserializer(item: any): FlowLogFormatParameters {
  return {
    type: item["type"],
    version: item["version"],
  };
}

/** The file type of flow log. */
export enum KnownFlowLogFormatType {
  /** JSON */
  Json = "JSON",
}

/**
 * The file type of flow log. \
 * {@link KnownFlowLogFormatType} can be used interchangeably with FlowLogFormatType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **JSON**: JSON
 */
export type FlowLogFormatType = string;

/** Parameters that define the configuration of traffic analytics. */
export interface TrafficAnalyticsProperties {
  /** Parameters that define the configuration of traffic analytics. */
  networkWatcherFlowAnalyticsConfiguration?: TrafficAnalyticsConfigurationProperties;
}

export function trafficAnalyticsPropertiesSerializer(item: TrafficAnalyticsProperties): any {
  return {
    networkWatcherFlowAnalyticsConfiguration: !item["networkWatcherFlowAnalyticsConfiguration"]
      ? item["networkWatcherFlowAnalyticsConfiguration"]
      : trafficAnalyticsConfigurationPropertiesSerializer(
          item["networkWatcherFlowAnalyticsConfiguration"],
        ),
  };
}

export function trafficAnalyticsPropertiesDeserializer(item: any): TrafficAnalyticsProperties {
  return {
    networkWatcherFlowAnalyticsConfiguration: !item["networkWatcherFlowAnalyticsConfiguration"]
      ? item["networkWatcherFlowAnalyticsConfiguration"]
      : trafficAnalyticsConfigurationPropertiesDeserializer(
          item["networkWatcherFlowAnalyticsConfiguration"],
        ),
  };
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

export function trafficAnalyticsConfigurationPropertiesSerializer(
  item: TrafficAnalyticsConfigurationProperties,
): any {
  return {
    enabled: item["enabled"],
    workspaceId: item["workspaceId"],
    workspaceRegion: item["workspaceRegion"],
    workspaceResourceId: item["workspaceResourceId"],
    trafficAnalyticsInterval: item["trafficAnalyticsInterval"],
  };
}

export function trafficAnalyticsConfigurationPropertiesDeserializer(
  item: any,
): TrafficAnalyticsConfigurationProperties {
  return {
    enabled: item["enabled"],
    workspaceId: item["workspaceId"],
    workspaceRegion: item["workspaceRegion"],
    workspaceResourceId: item["workspaceResourceId"],
    trafficAnalyticsInterval: item["trafficAnalyticsInterval"],
  };
}

/** Identity for the resource. */
export interface ManagedServiceIdentity {
  /** The principal id of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant id of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of identity used for the resource. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the virtual machine. */
  type?: ResourceIdentityType;
  /** The list of user identities associated with resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<
    string,
    Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties
  >;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesRecordSerializer(
          item["userAssignedIdentities"],
        ),
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesRecordDeserializer(
          item["userAssignedIdentities"],
        ),
  };
}

/** The type of identity used for the resource. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the virtual machine. */
export type ResourceIdentityType =
  | "SystemAssigned"
  | "UserAssigned"
  | "SystemAssigned, UserAssigned"
  | "None";

export function components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesRecordSerializer(
  item: Record<
    string,
    Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties
  >,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesSerializer(
          item[key],
        );
  });
  return result;
}

export function components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesRecordDeserializer(
  item: Record<string, any>,
): Record<
  string,
  Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties
> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesDeserializer(
          item[key],
        );
  });
  return result;
}

/** model interface Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties */
export interface Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

export function components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesSerializer(
  _item: Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties,
): any {
  return {};
}

export function components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesDeserializer(
  item: any,
): Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Route table resource. */
export interface RouteTable extends Resource {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Collection of routes contained within a route table. */
  routes?: Route[];
  /** A collection of references to subnets. */
  readonly subnets?: Subnet[];
  /** Whether to disable the routes learned by BGP on that route table. True means disable. */
  disableBgpRoutePropagation?: boolean;
  /** The provisioning state of the route table resource. */
  readonly provisioningState?: ProvisioningState;
  /** The resource GUID property of the route table. */
  readonly resourceGuid?: string;
}

export function routeTableSerializer(item: RouteTable): any {
  return {
    id: item["id"],
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["routes", "disableBgpRoutePropagation"])
      ? undefined
      : _routeTablePropertiesSerializer(item),
  };
}

export function routeTableDeserializer(item: any): RouteTable {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _routeTablePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Route Table resource. */
export interface RouteTablePropertiesFormat {
  /** Collection of routes contained within a route table. */
  routes?: Route[];
  /** A collection of references to subnets. */
  readonly subnets?: Subnet[];
  /** Whether to disable the routes learned by BGP on that route table. True means disable. */
  disableBgpRoutePropagation?: boolean;
  /** The provisioning state of the route table resource. */
  readonly provisioningState?: ProvisioningState;
  /** The resource GUID property of the route table. */
  readonly resourceGuid?: string;
}

export function routeTablePropertiesFormatSerializer(item: RouteTablePropertiesFormat): any {
  return {
    routes: !item["routes"] ? item["routes"] : routeArraySerializer(item["routes"]),
    disableBgpRoutePropagation: item["disableBgpRoutePropagation"],
  };
}

export function routeTablePropertiesFormatDeserializer(item: any): RouteTablePropertiesFormat {
  return {
    routes: !item["routes"] ? item["routes"] : routeArrayDeserializer(item["routes"]),
    subnets: !item["subnets"] ? item["subnets"] : subnetArrayDeserializer(item["subnets"]),
    disableBgpRoutePropagation: item["disableBgpRoutePropagation"],
    provisioningState: item["provisioningState"],
    resourceGuid: item["resourceGuid"],
  };
}

export function routeArraySerializer(result: Array<Route>): any[] {
  return result.map((item) => {
    return routeSerializer(item);
  });
}

export function routeArrayDeserializer(result: Array<Route>): any[] {
  return result.map((item) => {
    return routeDeserializer(item);
  });
}

/** Route resource. */
export interface Route extends SubResourceModel {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The destination CIDR to which the route applies. */
  addressPrefix?: string;
  /** The type of Azure hop the packet should be sent to. */
  nextHopType?: RouteNextHopType;
  /** The IP address packets should be forwarded to. Next hop values are only allowed in routes where the next hop type is VirtualAppliance. */
  nextHopIpAddress?: string;
  /** The provisioning state of the route resource. */
  readonly provisioningState?: ProvisioningState;
  /** A value indicating whether this route overrides overlapping BGP routes regardless of LPM. */
  readonly hasBgpOverride?: boolean;
}

export function routeSerializer(item: Route): any {
  return {
    name: item["name"],
    id: item["id"],
    properties: areAllPropsUndefined(item, ["addressPrefix", "nextHopType", "nextHopIpAddress"])
      ? undefined
      : _routePropertiesSerializer(item),
  };
}

export function routeDeserializer(item: any): Route {
  return {
    name: item["name"],
    type: item["type"],
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _routePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Route resource. */
export interface RoutePropertiesFormat {
  /** The destination CIDR to which the route applies. */
  addressPrefix?: string;
  /** The type of Azure hop the packet should be sent to. */
  nextHopType: RouteNextHopType;
  /** The IP address packets should be forwarded to. Next hop values are only allowed in routes where the next hop type is VirtualAppliance. */
  nextHopIpAddress?: string;
  /** The provisioning state of the route resource. */
  readonly provisioningState?: ProvisioningState;
  /** A value indicating whether this route overrides overlapping BGP routes regardless of LPM. */
  readonly hasBgpOverride?: boolean;
}

export function routePropertiesFormatSerializer(item: RoutePropertiesFormat): any {
  return {
    addressPrefix: item["addressPrefix"],
    nextHopType: item["nextHopType"],
    nextHopIpAddress: item["nextHopIpAddress"],
  };
}

export function routePropertiesFormatDeserializer(item: any): RoutePropertiesFormat {
  return {
    addressPrefix: item["addressPrefix"],
    nextHopType: item["nextHopType"],
    nextHopIpAddress: item["nextHopIpAddress"],
    provisioningState: item["provisioningState"],
    hasBgpOverride: item["hasBgpOverride"],
  };
}

/** The type of Azure hop the packet should be sent to. */
export enum KnownRouteNextHopType {
  /** VirtualNetworkGateway */
  VirtualNetworkGateway = "VirtualNetworkGateway",
  /** VnetLocal */
  VnetLocal = "VnetLocal",
  /** Internet */
  Internet = "Internet",
  /** VirtualAppliance */
  VirtualAppliance = "VirtualAppliance",
  /** None */
  None = "None",
}

/**
 * The type of Azure hop the packet should be sent to. \
 * {@link KnownRouteNextHopType} can be used interchangeably with RouteNextHopType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VirtualNetworkGateway**: VirtualNetworkGateway \
 * **VnetLocal**: VnetLocal \
 * **Internet**: Internet \
 * **VirtualAppliance**: VirtualAppliance \
 * **None**: None
 */
export type RouteNextHopType = string;

export function serviceEndpointPropertiesFormatArraySerializer(
  result: Array<ServiceEndpointPropertiesFormat>,
): any[] {
  return result.map((item) => {
    return serviceEndpointPropertiesFormatSerializer(item);
  });
}

export function serviceEndpointPropertiesFormatArrayDeserializer(
  result: Array<ServiceEndpointPropertiesFormat>,
): any[] {
  return result.map((item) => {
    return serviceEndpointPropertiesFormatDeserializer(item);
  });
}

/** The service endpoint properties. */
export interface ServiceEndpointPropertiesFormat {
  /** The type of the endpoint service. */
  service?: string;
  /** SubResource as network identifier. */
  networkIdentifier?: SubResource;
  /** A list of locations. */
  locations?: string[];
  /** The provisioning state of the service endpoint resource. */
  readonly provisioningState?: ProvisioningState;
}

export function serviceEndpointPropertiesFormatSerializer(
  item: ServiceEndpointPropertiesFormat,
): any {
  return {
    service: item["service"],
    networkIdentifier: !item["networkIdentifier"]
      ? item["networkIdentifier"]
      : subResourceSerializer(item["networkIdentifier"]),
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
  };
}

export function serviceEndpointPropertiesFormatDeserializer(
  item: any,
): ServiceEndpointPropertiesFormat {
  return {
    service: item["service"],
    networkIdentifier: !item["networkIdentifier"]
      ? item["networkIdentifier"]
      : subResourceDeserializer(item["networkIdentifier"]),
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

export function serviceEndpointPolicyArraySerializer(result: Array<ServiceEndpointPolicy>): any[] {
  return result.map((item) => {
    return serviceEndpointPolicySerializer(item);
  });
}

export function serviceEndpointPolicyArrayDeserializer(
  result: Array<ServiceEndpointPolicy>,
): any[] {
  return result.map((item) => {
    return serviceEndpointPolicyDeserializer(item);
  });
}

/** Service End point policy resource. */
export interface ServiceEndpointPolicy extends Resource {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Kind of service endpoint policy. This is metadata used for the Azure portal experience. */
  readonly kind?: string;
  /** A collection of service endpoint policy definitions of the service endpoint policy. */
  serviceEndpointPolicyDefinitions?: ServiceEndpointPolicyDefinition[];
  /** A collection of references to subnets. */
  readonly subnets?: Subnet[];
  /** The resource GUID property of the service endpoint policy resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the service endpoint policy resource. */
  readonly provisioningState?: ProvisioningState;
  /** The alias indicating if the policy belongs to a service */
  serviceAlias?: string;
  /** A collection of contextual service endpoint policy. */
  contextualServiceEndpointPolicies?: string[];
}

export function serviceEndpointPolicySerializer(item: ServiceEndpointPolicy): any {
  return {
    id: item["id"],
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "serviceEndpointPolicyDefinitions",
      "serviceAlias",
      "contextualServiceEndpointPolicies",
    ])
      ? undefined
      : _serviceEndpointPolicyPropertiesSerializer(item),
  };
}

export function serviceEndpointPolicyDeserializer(item: any): ServiceEndpointPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _serviceEndpointPolicyPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    kind: item["kind"],
  };
}

/** Service Endpoint Policy resource. */
export interface ServiceEndpointPolicyPropertiesFormat {
  /** A collection of service endpoint policy definitions of the service endpoint policy. */
  serviceEndpointPolicyDefinitions?: ServiceEndpointPolicyDefinition[];
  /** A collection of references to subnets. */
  readonly subnets?: Subnet[];
  /** The resource GUID property of the service endpoint policy resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the service endpoint policy resource. */
  readonly provisioningState?: ProvisioningState;
  /** The alias indicating if the policy belongs to a service */
  serviceAlias?: string;
  /** A collection of contextual service endpoint policy. */
  contextualServiceEndpointPolicies?: string[];
}

export function serviceEndpointPolicyPropertiesFormatSerializer(
  item: ServiceEndpointPolicyPropertiesFormat,
): any {
  return {
    serviceEndpointPolicyDefinitions: !item["serviceEndpointPolicyDefinitions"]
      ? item["serviceEndpointPolicyDefinitions"]
      : serviceEndpointPolicyDefinitionArraySerializer(item["serviceEndpointPolicyDefinitions"]),
    serviceAlias: item["serviceAlias"],
    contextualServiceEndpointPolicies: !item["contextualServiceEndpointPolicies"]
      ? item["contextualServiceEndpointPolicies"]
      : item["contextualServiceEndpointPolicies"].map((p: any) => {
          return p;
        }),
  };
}

export function serviceEndpointPolicyPropertiesFormatDeserializer(
  item: any,
): ServiceEndpointPolicyPropertiesFormat {
  return {
    serviceEndpointPolicyDefinitions: !item["serviceEndpointPolicyDefinitions"]
      ? item["serviceEndpointPolicyDefinitions"]
      : serviceEndpointPolicyDefinitionArrayDeserializer(item["serviceEndpointPolicyDefinitions"]),
    subnets: !item["subnets"] ? item["subnets"] : subnetArrayDeserializer(item["subnets"]),
    resourceGuid: item["resourceGuid"],
    provisioningState: item["provisioningState"],
    serviceAlias: item["serviceAlias"],
    contextualServiceEndpointPolicies: !item["contextualServiceEndpointPolicies"]
      ? item["contextualServiceEndpointPolicies"]
      : item["contextualServiceEndpointPolicies"].map((p: any) => {
          return p;
        }),
  };
}

export function serviceEndpointPolicyDefinitionArraySerializer(
  result: Array<ServiceEndpointPolicyDefinition>,
): any[] {
  return result.map((item) => {
    return serviceEndpointPolicyDefinitionSerializer(item);
  });
}

export function serviceEndpointPolicyDefinitionArrayDeserializer(
  result: Array<ServiceEndpointPolicyDefinition>,
): any[] {
  return result.map((item) => {
    return serviceEndpointPolicyDefinitionDeserializer(item);
  });
}

/** Service Endpoint policy definitions. */
export interface ServiceEndpointPolicyDefinition extends SubResourceModel {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** A description for this rule. Restricted to 140 chars. */
  description?: string;
  /** Service endpoint name. */
  service?: string;
  /** A list of service resources. */
  serviceResources?: string[];
  /** The provisioning state of the service endpoint policy definition resource. */
  readonly provisioningState?: ProvisioningState;
}

export function serviceEndpointPolicyDefinitionSerializer(
  item: ServiceEndpointPolicyDefinition,
): any {
  return {
    name: item["name"],
    id: item["id"],
    properties: areAllPropsUndefined(item, ["description", "service", "serviceResources"])
      ? undefined
      : _serviceEndpointPolicyDefinitionPropertiesSerializer(item),
  };
}

export function serviceEndpointPolicyDefinitionDeserializer(
  item: any,
): ServiceEndpointPolicyDefinition {
  return {
    name: item["name"],
    type: item["type"],
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _serviceEndpointPolicyDefinitionPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Service Endpoint policy definition resource. */
export interface ServiceEndpointPolicyDefinitionPropertiesFormat {
  /** A description for this rule. Restricted to 140 chars. */
  description?: string;
  /** Service endpoint name. */
  service?: string;
  /** A list of service resources. */
  serviceResources?: string[];
  /** The provisioning state of the service endpoint policy definition resource. */
  readonly provisioningState?: ProvisioningState;
}

export function serviceEndpointPolicyDefinitionPropertiesFormatSerializer(
  item: ServiceEndpointPolicyDefinitionPropertiesFormat,
): any {
  return {
    description: item["description"],
    service: item["service"],
    serviceResources: !item["serviceResources"]
      ? item["serviceResources"]
      : item["serviceResources"].map((p: any) => {
          return p;
        }),
  };
}

export function serviceEndpointPolicyDefinitionPropertiesFormatDeserializer(
  item: any,
): ServiceEndpointPolicyDefinitionPropertiesFormat {
  return {
    description: item["description"],
    service: item["service"],
    serviceResources: !item["serviceResources"]
      ? item["serviceResources"]
      : item["serviceResources"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

export function privateEndpointArraySerializer(result: Array<PrivateEndpoint>): any[] {
  return result.map((item) => {
    return privateEndpointSerializer(item);
  });
}

export function privateEndpointArrayDeserializer(result: Array<PrivateEndpoint>): any[] {
  return result.map((item) => {
    return privateEndpointDeserializer(item);
  });
}

export function ipConfigurationArrayDeserializer(result: Array<IPConfiguration>): any[] {
  return result.map((item) => {
    return ipConfigurationDeserializer(item);
  });
}

/** IP configuration. */
export interface IPConfiguration extends SubResource {
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: IPAllocationMethod;
  /** The reference to the subnet resource. */
  subnet?: Subnet;
  /** The reference to the public IP resource. */
  publicIPAddress?: PublicIPAddress;
  /** The provisioning state of the IP configuration resource. */
  readonly provisioningState?: ProvisioningState;
}

export function ipConfigurationDeserializer(item: any): IPConfiguration {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _ipConfigurationPropertiesDeserializer(item["properties"])),
    name: item["name"],
    etag: item["etag"],
  };
}

/** Properties of IP configuration. */
export interface IPConfigurationPropertiesFormat {
  /** The private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** The private IP address allocation method. */
  privateIPAllocationMethod?: IPAllocationMethod;
  /** The reference to the subnet resource. */
  subnet?: Subnet;
  /** The reference to the public IP resource. */
  publicIPAddress?: PublicIPAddress;
  /** The provisioning state of the IP configuration resource. */
  readonly provisioningState?: ProvisioningState;
}

export function ipConfigurationPropertiesFormatDeserializer(
  item: any,
): IPConfigurationPropertiesFormat {
  return {
    privateIPAddress: item["privateIPAddress"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    subnet: !item["subnet"] ? item["subnet"] : subnetDeserializer(item["subnet"]),
    publicIPAddress: !item["publicIPAddress"]
      ? item["publicIPAddress"]
      : publicIPAddressDeserializer(item["publicIPAddress"]),
    provisioningState: item["provisioningState"],
  };
}

/** Public IP address resource. */
export interface PublicIPAddress extends Resource {
  /** The extended location of the public ip address. */
  extendedLocation?: ExtendedLocation;
  /** The public IP address SKU. */
  sku?: PublicIPAddressSku;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** A list of availability zones denoting the IP allocated for the resource needs to come from. */
  zones?: string[];
  /** The public IP address allocation method. */
  publicIPAllocationMethod?: IPAllocationMethod;
  /** The public IP address version. */
  publicIPAddressVersion?: IPVersion;
  /** The IP configuration associated with the public IP address. */
  readonly ipConfiguration?: IPConfiguration;
  /** The FQDN of the DNS record associated with the public IP address. */
  dnsSettings?: PublicIPAddressDnsSettings;
  /** The DDoS protection custom policy associated with the public IP address. */
  ddosSettings?: DdosSettings;
  /** The list of tags associated with the public IP address. */
  ipTags?: IpTag[];
  /** The IP address associated with the public IP address resource. */
  ipAddress?: string;
  /** The Public IP Prefix this Public IP Address should be allocated from. */
  publicIPPrefix?: SubResource;
  /** The idle timeout of the public IP address. */
  idleTimeoutInMinutes?: number;
  /** The resource GUID property of the public IP address resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the public IP address resource. */
  readonly provisioningState?: ProvisioningState;
  /** The service public IP address of the public IP address resource. */
  servicePublicIPAddress?: PublicIPAddress;
  /** The NatGateway for the Public IP address. */
  natGateway?: NatGateway;
  /** Migration phase of Public IP Address. */
  migrationPhase?: PublicIPAddressMigrationPhase;
  /** The linked public IP address of the public IP address resource. */
  linkedPublicIPAddress?: PublicIPAddress;
  /** Specify what happens to the public IP address when the VM using it is deleted */
  deleteOption?: DeleteOptions;
}

export function publicIPAddressSerializer(item: PublicIPAddress): any {
  return {
    id: item["id"],
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "publicIPAllocationMethod",
      "publicIPAddressVersion",
      "dnsSettings",
      "ddosSettings",
      "ipTags",
      "ipAddress",
      "publicIPPrefix",
      "idleTimeoutInMinutes",
      "servicePublicIPAddress",
      "natGateway",
      "migrationPhase",
      "linkedPublicIPAddress",
      "deleteOption",
    ])
      ? undefined
      : _publicIPAddressPropertiesSerializer(item),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
    sku: !item["sku"] ? item["sku"] : publicIPAddressSkuSerializer(item["sku"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function publicIPAddressDeserializer(item: any): PublicIPAddress {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _publicIPAddressPropertiesDeserializer(item["properties"])),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    sku: !item["sku"] ? item["sku"] : publicIPAddressSkuDeserializer(item["sku"]),
    etag: item["etag"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** Public IP address properties. */
export interface PublicIPAddressPropertiesFormat {
  /** The public IP address allocation method. */
  publicIPAllocationMethod?: IPAllocationMethod;
  /** The public IP address version. */
  publicIPAddressVersion?: IPVersion;
  /** The IP configuration associated with the public IP address. */
  readonly ipConfiguration?: IPConfiguration;
  /** The FQDN of the DNS record associated with the public IP address. */
  dnsSettings?: PublicIPAddressDnsSettings;
  /** The DDoS protection custom policy associated with the public IP address. */
  ddosSettings?: DdosSettings;
  /** The list of tags associated with the public IP address. */
  ipTags?: IpTag[];
  /** The IP address associated with the public IP address resource. */
  ipAddress?: string;
  /** The Public IP Prefix this Public IP Address should be allocated from. */
  publicIPPrefix?: SubResource;
  /** The idle timeout of the public IP address. */
  idleTimeoutInMinutes?: number;
  /** The resource GUID property of the public IP address resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the public IP address resource. */
  readonly provisioningState?: ProvisioningState;
  /** The service public IP address of the public IP address resource. */
  servicePublicIPAddress?: PublicIPAddress;
  /** The NatGateway for the Public IP address. */
  natGateway?: NatGateway;
  /** Migration phase of Public IP Address. */
  migrationPhase?: PublicIPAddressMigrationPhase;
  /** The linked public IP address of the public IP address resource. */
  linkedPublicIPAddress?: PublicIPAddress;
  /** Specify what happens to the public IP address when the VM using it is deleted */
  deleteOption?: DeleteOptions;
}

export function publicIPAddressPropertiesFormatSerializer(
  item: PublicIPAddressPropertiesFormat,
): any {
  return {
    publicIPAllocationMethod: item["publicIPAllocationMethod"],
    publicIPAddressVersion: item["publicIPAddressVersion"],
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : publicIPAddressDnsSettingsSerializer(item["dnsSettings"]),
    ddosSettings: !item["ddosSettings"]
      ? item["ddosSettings"]
      : ddosSettingsSerializer(item["ddosSettings"]),
    ipTags: !item["ipTags"] ? item["ipTags"] : ipTagArraySerializer(item["ipTags"]),
    ipAddress: item["ipAddress"],
    publicIPPrefix: !item["publicIPPrefix"]
      ? item["publicIPPrefix"]
      : subResourceSerializer(item["publicIPPrefix"]),
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    servicePublicIPAddress: !item["servicePublicIPAddress"]
      ? item["servicePublicIPAddress"]
      : publicIPAddressSerializer(item["servicePublicIPAddress"]),
    natGateway: !item["natGateway"] ? item["natGateway"] : natGatewaySerializer(item["natGateway"]),
    migrationPhase: item["migrationPhase"],
    linkedPublicIPAddress: !item["linkedPublicIPAddress"]
      ? item["linkedPublicIPAddress"]
      : publicIPAddressSerializer(item["linkedPublicIPAddress"]),
    deleteOption: item["deleteOption"],
  };
}

export function publicIPAddressPropertiesFormatDeserializer(
  item: any,
): PublicIPAddressPropertiesFormat {
  return {
    publicIPAllocationMethod: item["publicIPAllocationMethod"],
    publicIPAddressVersion: item["publicIPAddressVersion"],
    ipConfiguration: !item["ipConfiguration"]
      ? item["ipConfiguration"]
      : ipConfigurationDeserializer(item["ipConfiguration"]),
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : publicIPAddressDnsSettingsDeserializer(item["dnsSettings"]),
    ddosSettings: !item["ddosSettings"]
      ? item["ddosSettings"]
      : ddosSettingsDeserializer(item["ddosSettings"]),
    ipTags: !item["ipTags"] ? item["ipTags"] : ipTagArrayDeserializer(item["ipTags"]),
    ipAddress: item["ipAddress"],
    publicIPPrefix: !item["publicIPPrefix"]
      ? item["publicIPPrefix"]
      : subResourceDeserializer(item["publicIPPrefix"]),
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    resourceGuid: item["resourceGuid"],
    provisioningState: item["provisioningState"],
    servicePublicIPAddress: !item["servicePublicIPAddress"]
      ? item["servicePublicIPAddress"]
      : publicIPAddressDeserializer(item["servicePublicIPAddress"]),
    natGateway: !item["natGateway"]
      ? item["natGateway"]
      : natGatewayDeserializer(item["natGateway"]),
    migrationPhase: item["migrationPhase"],
    linkedPublicIPAddress: !item["linkedPublicIPAddress"]
      ? item["linkedPublicIPAddress"]
      : publicIPAddressDeserializer(item["linkedPublicIPAddress"]),
    deleteOption: item["deleteOption"],
  };
}

/** Contains FQDN of the DNS record associated with the public IP address. */
export interface PublicIPAddressDnsSettings {
  /** The domain name label. The concatenation of the domain name label and the regionalized DNS zone make up the fully qualified domain name associated with the public IP address. If a domain name label is specified, an A DNS record is created for the public IP in the Microsoft Azure DNS system. */
  domainNameLabel?: string;
  /** The domain name label scope. If a domain name label and a domain name label scope are specified, an A DNS record is created for the public IP in the Microsoft Azure DNS system with a hashed value includes in FQDN. */
  domainNameLabelScope?: PublicIpAddressDnsSettingsDomainNameLabelScope;
  /** The Fully Qualified Domain Name of the A DNS record associated with the public IP. This is the concatenation of the domainNameLabel and the regionalized DNS zone. */
  fqdn?: string;
  /** The reverse FQDN. A user-visible, fully qualified domain name that resolves to this public IP address. If the reverseFqdn is specified, then a PTR DNS record is created pointing from the IP address in the in-addr.arpa domain to the reverse FQDN. */
  reverseFqdn?: string;
}

export function publicIPAddressDnsSettingsSerializer(item: PublicIPAddressDnsSettings): any {
  return {
    domainNameLabel: item["domainNameLabel"],
    domainNameLabelScope: item["domainNameLabelScope"],
    fqdn: item["fqdn"],
    reverseFqdn: item["reverseFqdn"],
  };
}

export function publicIPAddressDnsSettingsDeserializer(item: any): PublicIPAddressDnsSettings {
  return {
    domainNameLabel: item["domainNameLabel"],
    domainNameLabelScope: item["domainNameLabelScope"],
    fqdn: item["fqdn"],
    reverseFqdn: item["reverseFqdn"],
  };
}

/** The domain name label scope. If a domain name label and a domain name label scope are specified, an A DNS record is created for the public IP in the Microsoft Azure DNS system with a hashed value includes in FQDN. */
export type PublicIpAddressDnsSettingsDomainNameLabelScope =
  | "TenantReuse"
  | "SubscriptionReuse"
  | "ResourceGroupReuse"
  | "NoReuse";

/** Contains the DDoS protection settings of the public IP. */
export interface DdosSettings {
  /** The DDoS protection mode of the public IP */
  protectionMode?: DdosSettingsProtectionMode;
  /** The DDoS protection plan associated with the public IP. Can only be set if ProtectionMode is Enabled */
  ddosProtectionPlan?: SubResource;
}

export function ddosSettingsSerializer(item: DdosSettings): any {
  return {
    protectionMode: item["protectionMode"],
    ddosProtectionPlan: !item["ddosProtectionPlan"]
      ? item["ddosProtectionPlan"]
      : subResourceSerializer(item["ddosProtectionPlan"]),
  };
}

export function ddosSettingsDeserializer(item: any): DdosSettings {
  return {
    protectionMode: item["protectionMode"],
    ddosProtectionPlan: !item["ddosProtectionPlan"]
      ? item["ddosProtectionPlan"]
      : subResourceDeserializer(item["ddosProtectionPlan"]),
  };
}

/** The DDoS protection mode of the public IP */
export enum KnownDdosSettingsProtectionMode {
  /** VirtualNetworkInherited */
  VirtualNetworkInherited = "VirtualNetworkInherited",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * The DDoS protection mode of the public IP \
 * {@link KnownDdosSettingsProtectionMode} can be used interchangeably with DdosSettingsProtectionMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VirtualNetworkInherited**: VirtualNetworkInherited \
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type DdosSettingsProtectionMode = string;

export function ipTagArraySerializer(result: Array<IpTag>): any[] {
  return result.map((item) => {
    return ipTagSerializer(item);
  });
}

export function ipTagArrayDeserializer(result: Array<IpTag>): any[] {
  return result.map((item) => {
    return ipTagDeserializer(item);
  });
}

/** Contains the IpTag associated with the object. */
export interface IpTag {
  /** The IP tag type. Example: FirstPartyUsage. */
  ipTagType?: string;
  /** The value of the IP tag associated with the public IP. Example: SQL. */
  tag?: string;
}

export function ipTagSerializer(item: IpTag): any {
  return { ipTagType: item["ipTagType"], tag: item["tag"] };
}

export function ipTagDeserializer(item: any): IpTag {
  return {
    ipTagType: item["ipTagType"],
    tag: item["tag"],
  };
}

/** Nat Gateway resource. */
export interface NatGateway extends Resource {
  /** The nat gateway SKU. */
  sku?: NatGatewaySku;
  /** A list of availability zones denoting the zone in which Nat Gateway should be deployed. */
  zones?: string[];
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The idle timeout of the nat gateway. */
  idleTimeoutInMinutes?: number;
  /** An array of public ip addresses V4 associated with the nat gateway resource. */
  publicIpAddresses?: SubResource[];
  /** An array of public ip addresses V6 associated with the nat gateway resource. */
  publicIpAddressesV6?: SubResource[];
  /** An array of public ip prefixes V4 associated with the nat gateway resource. */
  publicIpPrefixes?: SubResource[];
  /** An array of public ip prefixes V6 associated with the nat gateway resource. */
  publicIpPrefixesV6?: SubResource[];
  /** An array of references to the subnets using this nat gateway resource. */
  readonly subnets?: SubResource[];
  /** A reference to the source virtual network using this nat gateway resource. */
  sourceVirtualNetwork?: SubResource;
  /** Reference to an existing service gateway. */
  serviceGateway?: SubResource;
  /** The resource GUID property of the NAT gateway resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the NAT gateway resource. */
  readonly provisioningState?: ProvisioningState;
}

export function natGatewaySerializer(item: NatGateway): any {
  return {
    id: item["id"],
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "idleTimeoutInMinutes",
      "publicIpAddresses",
      "publicIpAddressesV6",
      "publicIpPrefixes",
      "publicIpPrefixesV6",
      "sourceVirtualNetwork",
      "serviceGateway",
    ])
      ? undefined
      : _natGatewayPropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : natGatewaySkuSerializer(item["sku"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function natGatewayDeserializer(item: any): NatGateway {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _natGatewayPropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : natGatewaySkuDeserializer(item["sku"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    etag: item["etag"],
  };
}

/** Nat Gateway properties. */
export interface NatGatewayPropertiesFormat {
  /** The idle timeout of the nat gateway. */
  idleTimeoutInMinutes?: number;
  /** An array of public ip addresses V4 associated with the nat gateway resource. */
  publicIpAddresses?: SubResource[];
  /** An array of public ip addresses V6 associated with the nat gateway resource. */
  publicIpAddressesV6?: SubResource[];
  /** An array of public ip prefixes V4 associated with the nat gateway resource. */
  publicIpPrefixes?: SubResource[];
  /** An array of public ip prefixes V6 associated with the nat gateway resource. */
  publicIpPrefixesV6?: SubResource[];
  /** An array of references to the subnets using this nat gateway resource. */
  readonly subnets?: SubResource[];
  /** A reference to the source virtual network using this nat gateway resource. */
  sourceVirtualNetwork?: SubResource;
  /** Reference to an existing service gateway. */
  serviceGateway?: SubResource;
  /** The resource GUID property of the NAT gateway resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the NAT gateway resource. */
  readonly provisioningState?: ProvisioningState;
}

export function natGatewayPropertiesFormatSerializer(item: NatGatewayPropertiesFormat): any {
  return {
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    publicIpAddresses: !item["publicIpAddresses"]
      ? item["publicIpAddresses"]
      : subResourceArraySerializer(item["publicIpAddresses"]),
    publicIpAddressesV6: !item["publicIpAddressesV6"]
      ? item["publicIpAddressesV6"]
      : subResourceArraySerializer(item["publicIpAddressesV6"]),
    publicIpPrefixes: !item["publicIpPrefixes"]
      ? item["publicIpPrefixes"]
      : subResourceArraySerializer(item["publicIpPrefixes"]),
    publicIpPrefixesV6: !item["publicIpPrefixesV6"]
      ? item["publicIpPrefixesV6"]
      : subResourceArraySerializer(item["publicIpPrefixesV6"]),
    sourceVirtualNetwork: !item["sourceVirtualNetwork"]
      ? item["sourceVirtualNetwork"]
      : subResourceSerializer(item["sourceVirtualNetwork"]),
    serviceGateway: !item["serviceGateway"]
      ? item["serviceGateway"]
      : subResourceSerializer(item["serviceGateway"]),
  };
}

export function natGatewayPropertiesFormatDeserializer(item: any): NatGatewayPropertiesFormat {
  return {
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    publicIpAddresses: !item["publicIpAddresses"]
      ? item["publicIpAddresses"]
      : subResourceArrayDeserializer(item["publicIpAddresses"]),
    publicIpAddressesV6: !item["publicIpAddressesV6"]
      ? item["publicIpAddressesV6"]
      : subResourceArrayDeserializer(item["publicIpAddressesV6"]),
    publicIpPrefixes: !item["publicIpPrefixes"]
      ? item["publicIpPrefixes"]
      : subResourceArrayDeserializer(item["publicIpPrefixes"]),
    publicIpPrefixesV6: !item["publicIpPrefixesV6"]
      ? item["publicIpPrefixesV6"]
      : subResourceArrayDeserializer(item["publicIpPrefixesV6"]),
    subnets: !item["subnets"] ? item["subnets"] : subResourceArrayDeserializer(item["subnets"]),
    sourceVirtualNetwork: !item["sourceVirtualNetwork"]
      ? item["sourceVirtualNetwork"]
      : subResourceDeserializer(item["sourceVirtualNetwork"]),
    serviceGateway: !item["serviceGateway"]
      ? item["serviceGateway"]
      : subResourceDeserializer(item["serviceGateway"]),
    resourceGuid: item["resourceGuid"],
    provisioningState: item["provisioningState"],
  };
}

/** SKU of nat gateway. */
export interface NatGatewaySku {
  /** Name of Nat Gateway SKU. */
  name?: NatGatewaySkuName;
}

export function natGatewaySkuSerializer(item: NatGatewaySku): any {
  return { name: item["name"] };
}

export function natGatewaySkuDeserializer(item: any): NatGatewaySku {
  return {
    name: item["name"],
  };
}

/** Name of Nat Gateway SKU. */
export enum KnownNatGatewaySkuName {
  /** Standard */
  Standard = "Standard",
  /** StandardV2 */
  StandardV2 = "StandardV2",
}

/**
 * Name of Nat Gateway SKU. \
 * {@link KnownNatGatewaySkuName} can be used interchangeably with NatGatewaySkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**: Standard \
 * **StandardV2**: StandardV2
 */
export type NatGatewaySkuName = string;

/** Migration phase of Public IP Address. */
export enum KnownPublicIPAddressMigrationPhase {
  /** None */
  None = "None",
  /** Prepare */
  Prepare = "Prepare",
  /** Commit */
  Commit = "Commit",
  /** Abort */
  Abort = "Abort",
  /** Committed */
  Committed = "Committed",
}

/**
 * Migration phase of Public IP Address. \
 * {@link KnownPublicIPAddressMigrationPhase} can be used interchangeably with PublicIPAddressMigrationPhase,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Prepare**: Prepare \
 * **Commit**: Commit \
 * **Abort**: Abort \
 * **Committed**: Committed
 */
export type PublicIPAddressMigrationPhase = string;

/** Specify what happens to the public IP address when the VM using it is deleted */
export enum KnownDeleteOptions {
  /** Delete */
  Delete = "Delete",
  /** Detach */
  Detach = "Detach",
}

/**
 * Specify what happens to the public IP address when the VM using it is deleted \
 * {@link KnownDeleteOptions} can be used interchangeably with DeleteOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delete**: Delete \
 * **Detach**: Detach
 */
export type DeleteOptions = string;

/** SKU of a public IP address. */
export interface PublicIPAddressSku {
  /** Name of a public IP address SKU. */
  name?: PublicIPAddressSkuName;
  /** Tier of a public IP address SKU. */
  tier?: PublicIPAddressSkuTier;
}

export function publicIPAddressSkuSerializer(item: PublicIPAddressSku): any {
  return { name: item["name"], tier: item["tier"] };
}

export function publicIPAddressSkuDeserializer(item: any): PublicIPAddressSku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** Name of a public IP address SKU. */
export enum KnownPublicIPAddressSkuName {
  /** Basic */
  Basic = "Basic",
  /** Standard */
  Standard = "Standard",
  /** StandardV2 */
  StandardV2 = "StandardV2",
}

/**
 * Name of a public IP address SKU. \
 * {@link KnownPublicIPAddressSkuName} can be used interchangeably with PublicIPAddressSkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic**: Basic \
 * **Standard**: Standard \
 * **StandardV2**: StandardV2
 */
export type PublicIPAddressSkuName = string;

/** Tier of a public IP address SKU. */
export enum KnownPublicIPAddressSkuTier {
  /** Regional */
  Regional = "Regional",
  /** Global */
  Global = "Global",
}

/**
 * Tier of a public IP address SKU. \
 * {@link KnownPublicIPAddressSkuTier} can be used interchangeably with PublicIPAddressSkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regional**: Regional \
 * **Global**: Global
 */
export type PublicIPAddressSkuTier = string;

export function ipConfigurationProfileArraySerializer(
  result: Array<IPConfigurationProfile>,
): any[] {
  return result.map((item) => {
    return ipConfigurationProfileSerializer(item);
  });
}

export function ipConfigurationProfileArrayDeserializer(
  result: Array<IPConfigurationProfile>,
): any[] {
  return result.map((item) => {
    return ipConfigurationProfileDeserializer(item);
  });
}

/** IP configuration profile child resource. */
export interface IPConfigurationProfile extends SubResource {
  /** The name of the resource. This name can be used to access the resource. */
  name?: string;
  /** Sub Resource type. */
  readonly type?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The reference to the subnet resource to create a container network interface ip configuration. */
  subnet?: Subnet;
  /** The provisioning state of the IP configuration profile resource. */
  readonly provisioningState?: ProvisioningState;
}

export function ipConfigurationProfileSerializer(item: IPConfigurationProfile): any {
  return {
    id: item["id"],
    properties: areAllPropsUndefined(item, ["subnet"])
      ? undefined
      : _ipConfigurationProfilePropertiesSerializer(item),
    name: item["name"],
  };
}

export function ipConfigurationProfileDeserializer(item: any): IPConfigurationProfile {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _ipConfigurationProfilePropertiesDeserializer(item["properties"])),
    name: item["name"],
    type: item["type"],
    etag: item["etag"],
  };
}

/** IP configuration profile properties. */
export interface IPConfigurationProfilePropertiesFormat {
  /** The reference to the subnet resource to create a container network interface ip configuration. */
  subnet?: Subnet;
  /** The provisioning state of the IP configuration profile resource. */
  readonly provisioningState?: ProvisioningState;
}

export function ipConfigurationProfilePropertiesFormatSerializer(
  item: IPConfigurationProfilePropertiesFormat,
): any {
  return { subnet: !item["subnet"] ? item["subnet"] : subnetSerializer(item["subnet"]) };
}

export function ipConfigurationProfilePropertiesFormatDeserializer(
  item: any,
): IPConfigurationProfilePropertiesFormat {
  return {
    subnet: !item["subnet"] ? item["subnet"] : subnetDeserializer(item["subnet"]),
    provisioningState: item["provisioningState"],
  };
}

export function resourceNavigationLinkArrayDeserializer(
  result: Array<ResourceNavigationLink>,
): any[] {
  return result.map((item) => {
    return resourceNavigationLinkDeserializer(item);
  });
}

/** ResourceNavigationLink resource. */
export interface ResourceNavigationLink extends SubResource {
  /** Name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** Resource navigation link identifier. */
  readonly id?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Resource type. */
  readonly type?: string;
  /** Resource type of the linked resource. */
  linkedResourceType?: string;
  /** Link to the external resource. */
  link?: string;
  /** The provisioning state of the resource navigation link resource. */
  readonly provisioningState?: ProvisioningState;
}

export function resourceNavigationLinkDeserializer(item: any): ResourceNavigationLink {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _resourceNavigationLinkPropertiesDeserializer(item["properties"])),
    name: item["name"],
    etag: item["etag"],
    type: item["type"],
  };
}

/** Properties of ResourceNavigationLink. */
export interface ResourceNavigationLinkFormat {
  /** Resource type of the linked resource. */
  linkedResourceType?: string;
  /** Link to the external resource. */
  link?: string;
  /** The provisioning state of the resource navigation link resource. */
  readonly provisioningState?: ProvisioningState;
}

export function resourceNavigationLinkFormatDeserializer(item: any): ResourceNavigationLinkFormat {
  return {
    linkedResourceType: item["linkedResourceType"],
    link: item["link"],
    provisioningState: item["provisioningState"],
  };
}

export function serviceAssociationLinkArrayDeserializer(
  result: Array<ServiceAssociationLink>,
): any[] {
  return result.map((item) => {
    return serviceAssociationLinkDeserializer(item);
  });
}

/** ServiceAssociationLink resource. */
export interface ServiceAssociationLink extends SubResource {
  /** Name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Resource type. */
  readonly type?: string;
  /** Resource type of the linked resource. */
  linkedResourceType?: string;
  /** Link to the external resource. */
  link?: string;
  /** The provisioning state of the service association link resource. */
  readonly provisioningState?: ProvisioningState;
  /** If true, the resource can be deleted. */
  allowDelete?: boolean;
  /** A list of locations. */
  locations?: string[];
}

export function serviceAssociationLinkDeserializer(item: any): ServiceAssociationLink {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _serviceAssociationLinkPropertiesDeserializer(item["properties"])),
    name: item["name"],
    etag: item["etag"],
    type: item["type"],
  };
}

/** Properties of ServiceAssociationLink. */
export interface ServiceAssociationLinkPropertiesFormat {
  /** Resource type of the linked resource. */
  linkedResourceType?: string;
  /** Link to the external resource. */
  link?: string;
  /** The provisioning state of the service association link resource. */
  readonly provisioningState?: ProvisioningState;
  /** If true, the resource can be deleted. */
  allowDelete?: boolean;
  /** A list of locations. */
  locations?: string[];
}

export function serviceAssociationLinkPropertiesFormatDeserializer(
  item: any,
): ServiceAssociationLinkPropertiesFormat {
  return {
    linkedResourceType: item["linkedResourceType"],
    link: item["link"],
    provisioningState: item["provisioningState"],
    allowDelete: item["allowDelete"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
  };
}

export function delegationArraySerializer(result: Array<Delegation>): any[] {
  return result.map((item) => {
    return delegationSerializer(item);
  });
}

export function delegationArrayDeserializer(result: Array<Delegation>): any[] {
  return result.map((item) => {
    return delegationDeserializer(item);
  });
}

/** Details the service to which the subnet is delegated. */
export interface Delegation extends SubResource {
  /** The name of the resource that is unique within a subnet. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Resource type. */
  type?: string;
  /** The name of the service to whom the subnet should be delegated (e.g. Microsoft.Sql/servers). */
  serviceName?: string;
  /** The actions permitted to the service upon delegation. */
  readonly actions?: string[];
  /** The provisioning state of the service delegation resource. */
  readonly provisioningState?: ProvisioningState;
}

export function delegationSerializer(item: Delegation): any {
  return {
    id: item["id"],
    properties: areAllPropsUndefined(item, ["serviceName"])
      ? undefined
      : _delegationPropertiesSerializer(item),
    name: item["name"],
    type: item["type"],
  };
}

export function delegationDeserializer(item: any): Delegation {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _delegationPropertiesDeserializer(item["properties"])),
    name: item["name"],
    etag: item["etag"],
    type: item["type"],
  };
}

/** Properties of a service delegation. */
export interface ServiceDelegationPropertiesFormat {
  /** The name of the service to whom the subnet should be delegated (e.g. Microsoft.Sql/servers). */
  serviceName?: string;
  /** The actions permitted to the service upon delegation. */
  readonly actions?: string[];
  /** The provisioning state of the service delegation resource. */
  readonly provisioningState?: ProvisioningState;
}

export function serviceDelegationPropertiesFormatSerializer(
  item: ServiceDelegationPropertiesFormat,
): any {
  return { serviceName: item["serviceName"] };
}

export function serviceDelegationPropertiesFormatDeserializer(
  item: any,
): ServiceDelegationPropertiesFormat {
  return {
    serviceName: item["serviceName"],
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** Enable or Disable apply network policies on private end point in the subnet. */
export enum KnownVirtualNetworkPrivateEndpointNetworkPolicies {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** NetworkSecurityGroupEnabled */
  NetworkSecurityGroupEnabled = "NetworkSecurityGroupEnabled",
  /** RouteTableEnabled */
  RouteTableEnabled = "RouteTableEnabled",
}

/**
 * Enable or Disable apply network policies on private end point in the subnet. \
 * {@link KnownVirtualNetworkPrivateEndpointNetworkPolicies} can be used interchangeably with VirtualNetworkPrivateEndpointNetworkPolicies,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled \
 * **NetworkSecurityGroupEnabled**: NetworkSecurityGroupEnabled \
 * **RouteTableEnabled**: RouteTableEnabled
 */
export type VirtualNetworkPrivateEndpointNetworkPolicies = string;

/** Enable or Disable apply network policies on private link service in the subnet. */
export enum KnownVirtualNetworkPrivateLinkServiceNetworkPolicies {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Enable or Disable apply network policies on private link service in the subnet. \
 * {@link KnownVirtualNetworkPrivateLinkServiceNetworkPolicies} can be used interchangeably with VirtualNetworkPrivateLinkServiceNetworkPolicies,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type VirtualNetworkPrivateLinkServiceNetworkPolicies = string;

/** Set this property to Tenant to allow sharing subnet with other subscriptions in your AAD tenant. This property can only be set if defaultOutboundAccess is set to false, both properties can only be set if subnet is empty. */
export enum KnownSharingScope {
  /** Tenant */
  Tenant = "Tenant",
  /** DelegatedServices */
  DelegatedServices = "DelegatedServices",
}

/**
 * Set this property to Tenant to allow sharing subnet with other subscriptions in your AAD tenant. This property can only be set if defaultOutboundAccess is set to false, both properties can only be set if subnet is empty. \
 * {@link KnownSharingScope} can be used interchangeably with SharingScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Tenant**: Tenant \
 * **DelegatedServices**: DelegatedServices
 */
export type SharingScope = string;

export function ipamPoolPrefixAllocationArraySerializer(
  result: Array<IpamPoolPrefixAllocation>,
): any[] {
  return result.map((item) => {
    return ipamPoolPrefixAllocationSerializer(item);
  });
}

export function ipamPoolPrefixAllocationArrayDeserializer(
  result: Array<IpamPoolPrefixAllocation>,
): any[] {
  return result.map((item) => {
    return ipamPoolPrefixAllocationDeserializer(item);
  });
}

/** IpamPool prefix allocation reference. */
export interface IpamPoolPrefixAllocation {
  /** Number of IP addresses to allocate. */
  numberOfIpAddresses?: string;
  /** List of assigned IP address prefixes in the IpamPool of the associated resource. */
  readonly allocatedAddressPrefixes?: string[];
  /** Resource id of the associated Azure IpamPool resource. */
  id?: string;
}

export function ipamPoolPrefixAllocationSerializer(item: IpamPoolPrefixAllocation): any {
  return {
    pool: areAllPropsUndefined(item, ["id"])
      ? undefined
      : _ipamPoolPrefixAllocationPoolSerializer(item),
    numberOfIpAddresses: item["numberOfIpAddresses"],
  };
}

export function ipamPoolPrefixAllocationDeserializer(item: any): IpamPoolPrefixAllocation {
  return {
    ...(!item["pool"] ? item["pool"] : _ipamPoolPrefixAllocationPoolDeserializer(item["pool"])),
    numberOfIpAddresses: item["numberOfIpAddresses"],
    allocatedAddressPrefixes: !item["allocatedAddressPrefixes"]
      ? item["allocatedAddressPrefixes"]
      : item["allocatedAddressPrefixes"].map((p: any) => {
          return p;
        }),
  };
}

/** model interface IpamPoolPrefixAllocationPool */
export interface IpamPoolPrefixAllocationPool {
  /** Resource id of the associated Azure IpamPool resource. */
  id?: string;
}

export function ipamPoolPrefixAllocationPoolSerializer(item: IpamPoolPrefixAllocationPool): any {
  return { id: item["id"] };
}

export function ipamPoolPrefixAllocationPoolDeserializer(item: any): IpamPoolPrefixAllocationPool {
  return {
    id: item["id"],
  };
}

export function backendAddressPoolArraySerializer(result: Array<BackendAddressPool>): any[] {
  return result.map((item) => {
    return backendAddressPoolSerializer(item);
  });
}

export function backendAddressPoolArrayDeserializer(result: Array<BackendAddressPool>): any[] {
  return result.map((item) => {
    return backendAddressPoolDeserializer(item);
  });
}

/** Pool of backend IP addresses. */
export interface BackendAddressPool extends SubResourceModel {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The location of the backend address pool. */
  location?: string;
  /** An array of gateway load balancer tunnel interfaces. */
  tunnelInterfaces?: GatewayLoadBalancerTunnelInterface[];
  /** An array of backend addresses. */
  loadBalancerBackendAddresses?: LoadBalancerBackendAddress[];
  /** An array of references to IP addresses defined in network interfaces. */
  readonly backendIPConfigurations?: NetworkInterfaceIPConfiguration[];
  /** An array of references to load balancing rules that use this backend address pool. */
  readonly loadBalancingRules?: SubResource[];
  /** A reference to an outbound rule that uses this backend address pool. */
  readonly outboundRule?: SubResource;
  /** An array of references to outbound rules that use this backend address pool. */
  readonly outboundRules?: SubResource[];
  /** An array of references to inbound NAT rules that use this backend address pool. */
  readonly inboundNatRules?: SubResource[];
  /** The provisioning state of the backend address pool resource. */
  readonly provisioningState?: ProvisioningState;
  /** Amount of seconds Load Balancer waits for before sending RESET to client and backend address. */
  drainPeriodInSeconds?: number;
  /** A reference to a virtual network. */
  virtualNetwork?: SubResource;
  /** Backend address synchronous mode for the backend pool */
  syncMode?: SyncMode;
}

export function backendAddressPoolSerializer(item: BackendAddressPool): any {
  return {
    name: item["name"],
    id: item["id"],
    properties: areAllPropsUndefined(item, [
      "location",
      "tunnelInterfaces",
      "loadBalancerBackendAddresses",
      "drainPeriodInSeconds",
      "virtualNetwork",
      "syncMode",
    ])
      ? undefined
      : _backendAddressPoolPropertiesSerializer(item),
  };
}

export function backendAddressPoolDeserializer(item: any): BackendAddressPool {
  return {
    name: item["name"],
    type: item["type"],
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _backendAddressPoolPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Properties of the backend address pool. */
export interface BackendAddressPoolPropertiesFormat {
  /** The location of the backend address pool. */
  location?: string;
  /** An array of gateway load balancer tunnel interfaces. */
  tunnelInterfaces?: GatewayLoadBalancerTunnelInterface[];
  /** An array of backend addresses. */
  loadBalancerBackendAddresses?: LoadBalancerBackendAddress[];
  /** An array of references to IP addresses defined in network interfaces. */
  readonly backendIPConfigurations?: NetworkInterfaceIPConfiguration[];
  /** An array of references to load balancing rules that use this backend address pool. */
  readonly loadBalancingRules?: SubResource[];
  /** A reference to an outbound rule that uses this backend address pool. */
  readonly outboundRule?: SubResource;
  /** An array of references to outbound rules that use this backend address pool. */
  readonly outboundRules?: SubResource[];
  /** An array of references to inbound NAT rules that use this backend address pool. */
  readonly inboundNatRules?: SubResource[];
  /** The provisioning state of the backend address pool resource. */
  readonly provisioningState?: ProvisioningState;
  /** Amount of seconds Load Balancer waits for before sending RESET to client and backend address. */
  drainPeriodInSeconds?: number;
  /** A reference to a virtual network. */
  virtualNetwork?: SubResource;
  /** Backend address synchronous mode for the backend pool */
  syncMode?: SyncMode;
}

export function backendAddressPoolPropertiesFormatSerializer(
  item: BackendAddressPoolPropertiesFormat,
): any {
  return {
    location: item["location"],
    tunnelInterfaces: !item["tunnelInterfaces"]
      ? item["tunnelInterfaces"]
      : gatewayLoadBalancerTunnelInterfaceArraySerializer(item["tunnelInterfaces"]),
    loadBalancerBackendAddresses: !item["loadBalancerBackendAddresses"]
      ? item["loadBalancerBackendAddresses"]
      : loadBalancerBackendAddressArraySerializer(item["loadBalancerBackendAddresses"]),
    drainPeriodInSeconds: item["drainPeriodInSeconds"],
    virtualNetwork: !item["virtualNetwork"]
      ? item["virtualNetwork"]
      : subResourceSerializer(item["virtualNetwork"]),
    syncMode: item["syncMode"],
  };
}

export function backendAddressPoolPropertiesFormatDeserializer(
  item: any,
): BackendAddressPoolPropertiesFormat {
  return {
    location: item["location"],
    tunnelInterfaces: !item["tunnelInterfaces"]
      ? item["tunnelInterfaces"]
      : gatewayLoadBalancerTunnelInterfaceArrayDeserializer(item["tunnelInterfaces"]),
    loadBalancerBackendAddresses: !item["loadBalancerBackendAddresses"]
      ? item["loadBalancerBackendAddresses"]
      : loadBalancerBackendAddressArrayDeserializer(item["loadBalancerBackendAddresses"]),
    backendIPConfigurations: !item["backendIPConfigurations"]
      ? item["backendIPConfigurations"]
      : networkInterfaceIPConfigurationArrayDeserializer(item["backendIPConfigurations"]),
    loadBalancingRules: !item["loadBalancingRules"]
      ? item["loadBalancingRules"]
      : subResourceArrayDeserializer(item["loadBalancingRules"]),
    outboundRule: !item["outboundRule"]
      ? item["outboundRule"]
      : subResourceDeserializer(item["outboundRule"]),
    outboundRules: !item["outboundRules"]
      ? item["outboundRules"]
      : subResourceArrayDeserializer(item["outboundRules"]),
    inboundNatRules: !item["inboundNatRules"]
      ? item["inboundNatRules"]
      : subResourceArrayDeserializer(item["inboundNatRules"]),
    provisioningState: item["provisioningState"],
    drainPeriodInSeconds: item["drainPeriodInSeconds"],
    virtualNetwork: !item["virtualNetwork"]
      ? item["virtualNetwork"]
      : subResourceDeserializer(item["virtualNetwork"]),
    syncMode: item["syncMode"],
  };
}

export function gatewayLoadBalancerTunnelInterfaceArraySerializer(
  result: Array<GatewayLoadBalancerTunnelInterface>,
): any[] {
  return result.map((item) => {
    return gatewayLoadBalancerTunnelInterfaceSerializer(item);
  });
}

export function gatewayLoadBalancerTunnelInterfaceArrayDeserializer(
  result: Array<GatewayLoadBalancerTunnelInterface>,
): any[] {
  return result.map((item) => {
    return gatewayLoadBalancerTunnelInterfaceDeserializer(item);
  });
}

/** Gateway load balancer tunnel interface of a load balancer backend address pool. */
export interface GatewayLoadBalancerTunnelInterface {
  /** Port of gateway load balancer tunnel interface. */
  port?: number;
  /** Identifier of gateway load balancer tunnel interface. */
  identifier?: number;
  /** Protocol of gateway load balancer tunnel interface. */
  protocol?: GatewayLoadBalancerTunnelProtocol;
  /** Traffic type of gateway load balancer tunnel interface. */
  type?: GatewayLoadBalancerTunnelInterfaceType;
}

export function gatewayLoadBalancerTunnelInterfaceSerializer(
  item: GatewayLoadBalancerTunnelInterface,
): any {
  return {
    port: item["port"],
    identifier: item["identifier"],
    protocol: item["protocol"],
    type: item["type"],
  };
}

export function gatewayLoadBalancerTunnelInterfaceDeserializer(
  item: any,
): GatewayLoadBalancerTunnelInterface {
  return {
    port: item["port"],
    identifier: item["identifier"],
    protocol: item["protocol"],
    type: item["type"],
  };
}

/** Protocol of gateway load balancer tunnel interface. */
export enum KnownGatewayLoadBalancerTunnelProtocol {
  /** None */
  None = "None",
  /** Native */
  Native = "Native",
  /** VXLAN */
  Vxlan = "VXLAN",
}

/**
 * Protocol of gateway load balancer tunnel interface. \
 * {@link KnownGatewayLoadBalancerTunnelProtocol} can be used interchangeably with GatewayLoadBalancerTunnelProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Native**: Native \
 * **VXLAN**: VXLAN
 */
export type GatewayLoadBalancerTunnelProtocol = string;

/** Traffic type of gateway load balancer tunnel interface. */
export enum KnownGatewayLoadBalancerTunnelInterfaceType {
  /** None */
  None = "None",
  /** Internal */
  Internal = "Internal",
  /** External */
  External = "External",
}

/**
 * Traffic type of gateway load balancer tunnel interface. \
 * {@link KnownGatewayLoadBalancerTunnelInterfaceType} can be used interchangeably with GatewayLoadBalancerTunnelInterfaceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Internal**: Internal \
 * **External**: External
 */
export type GatewayLoadBalancerTunnelInterfaceType = string;

export function loadBalancerBackendAddressArraySerializer(
  result: Array<LoadBalancerBackendAddress>,
): any[] {
  return result.map((item) => {
    return loadBalancerBackendAddressSerializer(item);
  });
}

export function loadBalancerBackendAddressArrayDeserializer(
  result: Array<LoadBalancerBackendAddress>,
): any[] {
  return result.map((item) => {
    return loadBalancerBackendAddressDeserializer(item);
  });
}

/** Load balancer backend addresses. */
export interface LoadBalancerBackendAddress {
  /** Name of the backend address. */
  name?: string;
  /** Reference to an existing virtual network. */
  virtualNetwork?: SubResource;
  /** Reference to an existing subnet. */
  subnet?: SubResource;
  /** IP Address belonging to the referenced virtual network. */
  ipAddress?: string;
  /** Reference to IP address defined in network interfaces. */
  readonly networkInterfaceIPConfiguration?: SubResource;
  /** Reference to the frontend ip address configuration defined in regional loadbalancer. */
  loadBalancerFrontendIPConfiguration?: SubResource;
  /** Collection of inbound NAT rule port mappings. */
  readonly inboundNatRulesPortMapping?: NatRulePortMapping[];
  /** A list of administrative states which once set can override health probe so that Load Balancer will always forward new connections to backend, or deny new connections and reset existing connections. */
  adminState?: LoadBalancerBackendAddressAdminState;
}

export function loadBalancerBackendAddressSerializer(item: LoadBalancerBackendAddress): any {
  return {
    properties: areAllPropsUndefined(item, [
      "virtualNetwork",
      "subnet",
      "ipAddress",
      "loadBalancerFrontendIPConfiguration",
      "adminState",
    ])
      ? undefined
      : _loadBalancerBackendAddressPropertiesSerializer(item),
    name: item["name"],
  };
}

export function loadBalancerBackendAddressDeserializer(item: any): LoadBalancerBackendAddress {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _loadBalancerBackendAddressPropertiesDeserializer(item["properties"])),
    name: item["name"],
  };
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
  readonly networkInterfaceIPConfiguration?: SubResource;
  /** Reference to the frontend ip address configuration defined in regional loadbalancer. */
  loadBalancerFrontendIPConfiguration?: SubResource;
  /** Collection of inbound NAT rule port mappings. */
  readonly inboundNatRulesPortMapping?: NatRulePortMapping[];
  /** A list of administrative states which once set can override health probe so that Load Balancer will always forward new connections to backend, or deny new connections and reset existing connections. */
  adminState?: LoadBalancerBackendAddressAdminState;
}

export function loadBalancerBackendAddressPropertiesFormatSerializer(
  item: LoadBalancerBackendAddressPropertiesFormat,
): any {
  return {
    virtualNetwork: !item["virtualNetwork"]
      ? item["virtualNetwork"]
      : subResourceSerializer(item["virtualNetwork"]),
    subnet: !item["subnet"] ? item["subnet"] : subResourceSerializer(item["subnet"]),
    ipAddress: item["ipAddress"],
    loadBalancerFrontendIPConfiguration: !item["loadBalancerFrontendIPConfiguration"]
      ? item["loadBalancerFrontendIPConfiguration"]
      : subResourceSerializer(item["loadBalancerFrontendIPConfiguration"]),
    adminState: item["adminState"],
  };
}

export function loadBalancerBackendAddressPropertiesFormatDeserializer(
  item: any,
): LoadBalancerBackendAddressPropertiesFormat {
  return {
    virtualNetwork: !item["virtualNetwork"]
      ? item["virtualNetwork"]
      : subResourceDeserializer(item["virtualNetwork"]),
    subnet: !item["subnet"] ? item["subnet"] : subResourceDeserializer(item["subnet"]),
    ipAddress: item["ipAddress"],
    networkInterfaceIPConfiguration: !item["networkInterfaceIPConfiguration"]
      ? item["networkInterfaceIPConfiguration"]
      : subResourceDeserializer(item["networkInterfaceIPConfiguration"]),
    loadBalancerFrontendIPConfiguration: !item["loadBalancerFrontendIPConfiguration"]
      ? item["loadBalancerFrontendIPConfiguration"]
      : subResourceDeserializer(item["loadBalancerFrontendIPConfiguration"]),
    inboundNatRulesPortMapping: !item["inboundNatRulesPortMapping"]
      ? item["inboundNatRulesPortMapping"]
      : natRulePortMappingArrayDeserializer(item["inboundNatRulesPortMapping"]),
    adminState: item["adminState"],
  };
}

export function natRulePortMappingArrayDeserializer(result: Array<NatRulePortMapping>): any[] {
  return result.map((item) => {
    return natRulePortMappingDeserializer(item);
  });
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

export function natRulePortMappingDeserializer(item: any): NatRulePortMapping {
  return {
    inboundNatRuleName: item["inboundNatRuleName"],
    frontendPort: item["frontendPort"],
    backendPort: item["backendPort"],
  };
}

/** A list of administrative states which once set can override health probe so that Load Balancer will always forward new connections to backend, or deny new connections and reset existing connections. */
export enum KnownLoadBalancerBackendAddressAdminState {
  /** None */
  None = "None",
  /** Up */
  Up = "Up",
  /** Down */
  Down = "Down",
}

/**
 * A list of administrative states which once set can override health probe so that Load Balancer will always forward new connections to backend, or deny new connections and reset existing connections. \
 * {@link KnownLoadBalancerBackendAddressAdminState} can be used interchangeably with LoadBalancerBackendAddressAdminState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Up**: Up \
 * **Down**: Down
 */
export type LoadBalancerBackendAddressAdminState = string;

/** Backend address synchronous mode for the backend pool */
export enum KnownSyncMode {
  /** Automatic */
  Automatic = "Automatic",
  /** Manual */
  Manual = "Manual",
}

/**
 * Backend address synchronous mode for the backend pool \
 * {@link KnownSyncMode} can be used interchangeably with SyncMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Automatic**: Automatic \
 * **Manual**: Manual
 */
export type SyncMode = string;

export function inboundNatRuleArraySerializer(result: Array<InboundNatRule>): any[] {
  return result.map((item) => {
    return inboundNatRuleSerializer(item);
  });
}

export function inboundNatRuleArrayDeserializer(result: Array<InboundNatRule>): any[] {
  return result.map((item) => {
    return inboundNatRuleDeserializer(item);
  });
}

/** Inbound NAT rule of the load balancer. */
export interface InboundNatRule extends SubResourceModel {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** A reference to frontend IP addresses. */
  frontendIPConfiguration?: SubResource;
  /** A reference to a private IP address defined on a network interface of a VM. Traffic sent to the frontend port of each of the frontend IP configurations is forwarded to the backend IP. */
  readonly backendIPConfiguration?: NetworkInterfaceIPConfiguration;
  /** The reference to the transport protocol used by the load balancing rule. */
  protocol?: TransportProtocol;
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
  readonly provisioningState?: ProvisioningState;
}

export function inboundNatRuleSerializer(item: InboundNatRule): any {
  return {
    name: item["name"],
    id: item["id"],
    properties: areAllPropsUndefined(item, [
      "frontendIPConfiguration",
      "protocol",
      "frontendPort",
      "backendPort",
      "idleTimeoutInMinutes",
      "enableFloatingIP",
      "enableTcpReset",
      "frontendPortRangeStart",
      "frontendPortRangeEnd",
      "backendAddressPool",
    ])
      ? undefined
      : _inboundNatRulePropertiesSerializer(item),
  };
}

export function inboundNatRuleDeserializer(item: any): InboundNatRule {
  return {
    name: item["name"],
    type: item["type"],
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _inboundNatRulePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Properties of the inbound NAT rule. */
export interface InboundNatRulePropertiesFormat {
  /** A reference to frontend IP addresses. */
  frontendIPConfiguration?: SubResource;
  /** A reference to a private IP address defined on a network interface of a VM. Traffic sent to the frontend port of each of the frontend IP configurations is forwarded to the backend IP. */
  readonly backendIPConfiguration?: NetworkInterfaceIPConfiguration;
  /** The reference to the transport protocol used by the load balancing rule. */
  protocol?: TransportProtocol;
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
  readonly provisioningState?: ProvisioningState;
}

export function inboundNatRulePropertiesFormatSerializer(
  item: InboundNatRulePropertiesFormat,
): any {
  return {
    frontendIPConfiguration: !item["frontendIPConfiguration"]
      ? item["frontendIPConfiguration"]
      : subResourceSerializer(item["frontendIPConfiguration"]),
    protocol: item["protocol"],
    frontendPort: item["frontendPort"],
    backendPort: item["backendPort"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    enableFloatingIP: item["enableFloatingIP"],
    enableTcpReset: item["enableTcpReset"],
    frontendPortRangeStart: item["frontendPortRangeStart"],
    frontendPortRangeEnd: item["frontendPortRangeEnd"],
    backendAddressPool: !item["backendAddressPool"]
      ? item["backendAddressPool"]
      : subResourceSerializer(item["backendAddressPool"]),
  };
}

export function inboundNatRulePropertiesFormatDeserializer(
  item: any,
): InboundNatRulePropertiesFormat {
  return {
    frontendIPConfiguration: !item["frontendIPConfiguration"]
      ? item["frontendIPConfiguration"]
      : subResourceDeserializer(item["frontendIPConfiguration"]),
    backendIPConfiguration: !item["backendIPConfiguration"]
      ? item["backendIPConfiguration"]
      : networkInterfaceIPConfigurationDeserializer(item["backendIPConfiguration"]),
    protocol: item["protocol"],
    frontendPort: item["frontendPort"],
    backendPort: item["backendPort"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    enableFloatingIP: item["enableFloatingIP"],
    enableTcpReset: item["enableTcpReset"],
    frontendPortRangeStart: item["frontendPortRangeStart"],
    frontendPortRangeEnd: item["frontendPortRangeEnd"],
    backendAddressPool: !item["backendAddressPool"]
      ? item["backendAddressPool"]
      : subResourceDeserializer(item["backendAddressPool"]),
    provisioningState: item["provisioningState"],
  };
}

/** The transport protocol for the endpoint. */
export enum KnownTransportProtocol {
  /** Udp */
  Udp = "Udp",
  /** Tcp */
  Tcp = "Tcp",
  /** All */
  All = "All",
  /** Quic */
  Quic = "Quic",
}

/**
 * The transport protocol for the endpoint. \
 * {@link KnownTransportProtocol} can be used interchangeably with TransportProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Udp**: Udp \
 * **Tcp**: Tcp \
 * **All**: All \
 * **Quic**: Quic
 */
export type TransportProtocol = string;

/** PrivateLinkConnection properties for the network interface. */
export interface NetworkInterfaceIPConfigurationPrivateLinkConnectionProperties {
  /** The group ID for current private link connection. */
  readonly groupId?: string;
  /** The required member name for current private link connection. */
  readonly requiredMemberName?: string;
  /** List of FQDNs for current private link connection. */
  readonly fqdns?: string[];
}

export function networkInterfaceIPConfigurationPrivateLinkConnectionPropertiesDeserializer(
  item: any,
): NetworkInterfaceIPConfigurationPrivateLinkConnectionProperties {
  return {
    groupId: item["groupId"],
    requiredMemberName: item["requiredMemberName"],
    fqdns: !item["fqdns"]
      ? item["fqdns"]
      : item["fqdns"].map((p: any) => {
          return p;
        }),
  };
}

export function applicationGatewayBackendAddressArraySerializer(
  result: Array<ApplicationGatewayBackendAddress>,
): any[] {
  return result.map((item) => {
    return applicationGatewayBackendAddressSerializer(item);
  });
}

export function applicationGatewayBackendAddressArrayDeserializer(
  result: Array<ApplicationGatewayBackendAddress>,
): any[] {
  return result.map((item) => {
    return applicationGatewayBackendAddressDeserializer(item);
  });
}

/** Backend address of an application gateway. */
export interface ApplicationGatewayBackendAddress {
  /** Fully qualified domain name (FQDN). */
  fqdn?: string;
  /** IP address. */
  ipAddress?: string;
}

export function applicationGatewayBackendAddressSerializer(
  item: ApplicationGatewayBackendAddress,
): any {
  return { fqdn: item["fqdn"], ipAddress: item["ipAddress"] };
}

export function applicationGatewayBackendAddressDeserializer(
  item: any,
): ApplicationGatewayBackendAddress {
  return {
    fqdn: item["fqdn"],
    ipAddress: item["ipAddress"],
  };
}

/** Reference to another subresource. */
export interface SubResourceModel extends SubResource {
  /** Name of the resource. */
  name?: string;
  /** Resource type. */
  readonly type?: string;
}

export function subResourceModelSerializer(item: SubResourceModel): any {
  return { id: item["id"], name: item["name"] };
}

export function subResourceModelDeserializer(item: any): SubResourceModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** The base resource set for visibility and auto-approval. */
export interface ResourceSet {
  /** The list of subscriptions. */
  subscriptions?: string[];
}

export function resourceSetSerializer(item: ResourceSet): any {
  return {
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : item["subscriptions"].map((p: any) => {
          return p;
        }),
  };
}

export function resourceSetDeserializer(item: any): ResourceSet {
  return {
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : item["subscriptions"].map((p: any) => {
          return p;
        }),
  };
}

export function publicIPAddressArraySerializer(result: Array<PublicIPAddress>): any[] {
  return result.map((item) => {
    return publicIPAddressSerializer(item);
  });
}

export function publicIPAddressArrayDeserializer(result: Array<PublicIPAddress>): any[] {
  return result.map((item) => {
    return publicIPAddressDeserializer(item);
  });
}

/** LoadBalancer resource. */
export interface LoadBalancer extends Resource {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The extended location of the load balancer. */
  extendedLocation?: ExtendedLocation;
  /** The load balancer SKU. */
  sku?: LoadBalancerSku;
  /** Object representing the frontend IPs to be used for the load balancer. */
  frontendIPConfigurations?: FrontendIPConfiguration[];
  /** Collection of backend address pools used by a load balancer. */
  backendAddressPools?: BackendAddressPool[];
  /** Object collection representing the load balancing rules Gets the provisioning. */
  loadBalancingRules?: LoadBalancingRule[];
  /** Collection of probe objects used in the load balancer. */
  probes?: Probe[];
  /** Collection of inbound NAT Rules used by a load balancer. Defining inbound NAT rules on your load balancer is mutually exclusive with defining an inbound NAT pool. Inbound NAT pools are referenced from virtual machine scale sets. NICs that are associated with individual virtual machines cannot reference an Inbound NAT pool. They have to reference individual inbound NAT rules. */
  inboundNatRules?: InboundNatRule[];
  /** Defines an external port range for inbound NAT to a single backend port on NICs associated with a load balancer. Inbound NAT rules are created automatically for each NIC associated with the Load Balancer using an external port from this range. Defining an Inbound NAT pool on your Load Balancer is mutually exclusive with defining inbound NAT rules. Inbound NAT pools are referenced from virtual machine scale sets. NICs that are associated with individual virtual machines cannot reference an inbound NAT pool. They have to reference individual inbound NAT rules. */
  inboundNatPools?: InboundNatPool[];
  /** The outbound rules. */
  outboundRules?: OutboundRule[];
  /** The resource GUID property of the load balancer resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the load balancer resource. */
  readonly provisioningState?: ProvisioningState;
  /** Indicates the scope of the load balancer: external (Public) or internal (Private). */
  scope?: LoadBalancerScope;
}

export function loadBalancerSerializer(item: LoadBalancer): any {
  return {
    id: item["id"],
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "frontendIPConfigurations",
      "backendAddressPools",
      "loadBalancingRules",
      "probes",
      "inboundNatRules",
      "inboundNatPools",
      "outboundRules",
      "scope",
    ])
      ? undefined
      : _loadBalancerPropertiesSerializer(item),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
    sku: !item["sku"] ? item["sku"] : loadBalancerSkuSerializer(item["sku"]),
  };
}

export function loadBalancerDeserializer(item: any): LoadBalancer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _loadBalancerPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    sku: !item["sku"] ? item["sku"] : loadBalancerSkuDeserializer(item["sku"]),
  };
}

/** Properties of the load balancer. */
export interface LoadBalancerPropertiesFormat {
  /** Object representing the frontend IPs to be used for the load balancer. */
  frontendIPConfigurations?: FrontendIPConfiguration[];
  /** Collection of backend address pools used by a load balancer. */
  backendAddressPools?: BackendAddressPool[];
  /** Object collection representing the load balancing rules Gets the provisioning. */
  loadBalancingRules?: LoadBalancingRule[];
  /** Collection of probe objects used in the load balancer. */
  probes?: Probe[];
  /** Collection of inbound NAT Rules used by a load balancer. Defining inbound NAT rules on your load balancer is mutually exclusive with defining an inbound NAT pool. Inbound NAT pools are referenced from virtual machine scale sets. NICs that are associated with individual virtual machines cannot reference an Inbound NAT pool. They have to reference individual inbound NAT rules. */
  inboundNatRules?: InboundNatRule[];
  /** Defines an external port range for inbound NAT to a single backend port on NICs associated with a load balancer. Inbound NAT rules are created automatically for each NIC associated with the Load Balancer using an external port from this range. Defining an Inbound NAT pool on your Load Balancer is mutually exclusive with defining inbound NAT rules. Inbound NAT pools are referenced from virtual machine scale sets. NICs that are associated with individual virtual machines cannot reference an inbound NAT pool. They have to reference individual inbound NAT rules. */
  inboundNatPools?: InboundNatPool[];
  /** The outbound rules. */
  outboundRules?: OutboundRule[];
  /** The resource GUID property of the load balancer resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the load balancer resource. */
  readonly provisioningState?: ProvisioningState;
  /** Indicates the scope of the load balancer: external (Public) or internal (Private). */
  scope?: LoadBalancerScope;
}

export function loadBalancerPropertiesFormatSerializer(item: LoadBalancerPropertiesFormat): any {
  return {
    frontendIPConfigurations: !item["frontendIPConfigurations"]
      ? item["frontendIPConfigurations"]
      : frontendIPConfigurationArraySerializer(item["frontendIPConfigurations"]),
    backendAddressPools: !item["backendAddressPools"]
      ? item["backendAddressPools"]
      : backendAddressPoolArraySerializer(item["backendAddressPools"]),
    loadBalancingRules: !item["loadBalancingRules"]
      ? item["loadBalancingRules"]
      : loadBalancingRuleArraySerializer(item["loadBalancingRules"]),
    probes: !item["probes"] ? item["probes"] : probeArraySerializer(item["probes"]),
    inboundNatRules: !item["inboundNatRules"]
      ? item["inboundNatRules"]
      : inboundNatRuleArraySerializer(item["inboundNatRules"]),
    inboundNatPools: !item["inboundNatPools"]
      ? item["inboundNatPools"]
      : inboundNatPoolArraySerializer(item["inboundNatPools"]),
    outboundRules: !item["outboundRules"]
      ? item["outboundRules"]
      : outboundRuleArraySerializer(item["outboundRules"]),
    scope: item["scope"],
  };
}

export function loadBalancerPropertiesFormatDeserializer(item: any): LoadBalancerPropertiesFormat {
  return {
    frontendIPConfigurations: !item["frontendIPConfigurations"]
      ? item["frontendIPConfigurations"]
      : frontendIPConfigurationArrayDeserializer(item["frontendIPConfigurations"]),
    backendAddressPools: !item["backendAddressPools"]
      ? item["backendAddressPools"]
      : backendAddressPoolArrayDeserializer(item["backendAddressPools"]),
    loadBalancingRules: !item["loadBalancingRules"]
      ? item["loadBalancingRules"]
      : loadBalancingRuleArrayDeserializer(item["loadBalancingRules"]),
    probes: !item["probes"] ? item["probes"] : probeArrayDeserializer(item["probes"]),
    inboundNatRules: !item["inboundNatRules"]
      ? item["inboundNatRules"]
      : inboundNatRuleArrayDeserializer(item["inboundNatRules"]),
    inboundNatPools: !item["inboundNatPools"]
      ? item["inboundNatPools"]
      : inboundNatPoolArrayDeserializer(item["inboundNatPools"]),
    outboundRules: !item["outboundRules"]
      ? item["outboundRules"]
      : outboundRuleArrayDeserializer(item["outboundRules"]),
    resourceGuid: item["resourceGuid"],
    provisioningState: item["provisioningState"],
    scope: item["scope"],
  };
}

export function loadBalancingRuleArraySerializer(result: Array<LoadBalancingRule>): any[] {
  return result.map((item) => {
    return loadBalancingRuleSerializer(item);
  });
}

export function loadBalancingRuleArrayDeserializer(result: Array<LoadBalancingRule>): any[] {
  return result.map((item) => {
    return loadBalancingRuleDeserializer(item);
  });
}

/** A load balancing rule for a load balancer. */
export interface LoadBalancingRule extends SubResourceModel {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** A reference to frontend IP addresses. */
  frontendIPConfiguration?: SubResource;
  /** A reference to a pool of DIPs. Inbound traffic is randomly load balanced across IPs in the backend IPs. */
  backendAddressPool?: SubResource;
  /** An array of references to pool of DIPs. */
  backendAddressPools?: SubResource[];
  /** The reference to the load balancer probe used by the load balancing rule. */
  probe?: SubResource;
  /** The reference to the transport protocol used by the load balancing rule. */
  protocol?: TransportProtocol;
  /** The load distribution policy for this rule. */
  loadDistribution?: LoadDistribution;
  /** The port for the external endpoint. Port numbers for each rule must be unique within the Load Balancer. Acceptable values are between 0 and 65534. Note that value 0 enables "Any Port". */
  frontendPort?: number;
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
  /** Defines whether connections between 2 communicating endpoints can be tracked and associated to the same backend VM over its lifetime when using UDP protocol. */
  enableConnectionTracking?: boolean;
  /** The provisioning state of the load balancing rule resource. */
  readonly provisioningState?: ProvisioningState;
}

export function loadBalancingRuleSerializer(item: LoadBalancingRule): any {
  return {
    name: item["name"],
    id: item["id"],
    properties: areAllPropsUndefined(item, [
      "frontendIPConfiguration",
      "backendAddressPool",
      "backendAddressPools",
      "probe",
      "protocol",
      "loadDistribution",
      "frontendPort",
      "backendPort",
      "idleTimeoutInMinutes",
      "enableFloatingIP",
      "enableTcpReset",
      "disableOutboundSnat",
      "enableConnectionTracking",
    ])
      ? undefined
      : _loadBalancingRulePropertiesSerializer(item),
  };
}

export function loadBalancingRuleDeserializer(item: any): LoadBalancingRule {
  return {
    name: item["name"],
    type: item["type"],
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _loadBalancingRulePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Properties of the load balancer. */
export interface LoadBalancingRulePropertiesFormat {
  /** A reference to frontend IP addresses. */
  frontendIPConfiguration?: SubResource;
  /** A reference to a pool of DIPs. Inbound traffic is randomly load balanced across IPs in the backend IPs. */
  backendAddressPool?: SubResource;
  /** An array of references to pool of DIPs. */
  backendAddressPools?: SubResource[];
  /** The reference to the load balancer probe used by the load balancing rule. */
  probe?: SubResource;
  /** The reference to the transport protocol used by the load balancing rule. */
  protocol: TransportProtocol;
  /** The load distribution policy for this rule. */
  loadDistribution?: LoadDistribution;
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
  /** Defines whether connections between 2 communicating endpoints can be tracked and associated to the same backend VM over its lifetime when using UDP protocol. */
  enableConnectionTracking?: boolean;
  /** The provisioning state of the load balancing rule resource. */
  readonly provisioningState?: ProvisioningState;
}

export function loadBalancingRulePropertiesFormatSerializer(
  item: LoadBalancingRulePropertiesFormat,
): any {
  return {
    frontendIPConfiguration: !item["frontendIPConfiguration"]
      ? item["frontendIPConfiguration"]
      : subResourceSerializer(item["frontendIPConfiguration"]),
    backendAddressPool: !item["backendAddressPool"]
      ? item["backendAddressPool"]
      : subResourceSerializer(item["backendAddressPool"]),
    backendAddressPools: !item["backendAddressPools"]
      ? item["backendAddressPools"]
      : subResourceArraySerializer(item["backendAddressPools"]),
    probe: !item["probe"] ? item["probe"] : subResourceSerializer(item["probe"]),
    protocol: item["protocol"],
    loadDistribution: item["loadDistribution"],
    frontendPort: item["frontendPort"],
    backendPort: item["backendPort"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    enableFloatingIP: item["enableFloatingIP"],
    enableTcpReset: item["enableTcpReset"],
    disableOutboundSnat: item["disableOutboundSnat"],
    enableConnectionTracking: item["enableConnectionTracking"],
  };
}

export function loadBalancingRulePropertiesFormatDeserializer(
  item: any,
): LoadBalancingRulePropertiesFormat {
  return {
    frontendIPConfiguration: !item["frontendIPConfiguration"]
      ? item["frontendIPConfiguration"]
      : subResourceDeserializer(item["frontendIPConfiguration"]),
    backendAddressPool: !item["backendAddressPool"]
      ? item["backendAddressPool"]
      : subResourceDeserializer(item["backendAddressPool"]),
    backendAddressPools: !item["backendAddressPools"]
      ? item["backendAddressPools"]
      : subResourceArrayDeserializer(item["backendAddressPools"]),
    probe: !item["probe"] ? item["probe"] : subResourceDeserializer(item["probe"]),
    protocol: item["protocol"],
    loadDistribution: item["loadDistribution"],
    frontendPort: item["frontendPort"],
    backendPort: item["backendPort"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    enableFloatingIP: item["enableFloatingIP"],
    enableTcpReset: item["enableTcpReset"],
    disableOutboundSnat: item["disableOutboundSnat"],
    enableConnectionTracking: item["enableConnectionTracking"],
    provisioningState: item["provisioningState"],
  };
}

/** The load distribution policy for this rule. */
export enum KnownLoadDistribution {
  /** Default */
  Default = "Default",
  /** SourceIP */
  SourceIP = "SourceIP",
  /** SourceIPProtocol */
  SourceIPProtocol = "SourceIPProtocol",
}

/**
 * The load distribution policy for this rule. \
 * {@link KnownLoadDistribution} can be used interchangeably with LoadDistribution,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default \
 * **SourceIP**: SourceIP \
 * **SourceIPProtocol**: SourceIPProtocol
 */
export type LoadDistribution = string;

export function probeArraySerializer(result: Array<Probe>): any[] {
  return result.map((item) => {
    return probeSerializer(item);
  });
}

export function probeArrayDeserializer(result: Array<Probe>): any[] {
  return result.map((item) => {
    return probeDeserializer(item);
  });
}

/** A load balancer probe. */
export interface Probe extends SubResourceModel {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The load balancer rules that use this probe. */
  readonly loadBalancingRules?: SubResource[];
  /** The protocol of the end point. If 'Tcp' is specified, a received ACK is required for the probe to be successful. If 'Http' or 'Https' is specified, a 200 OK response from the specifies URI is required for the probe to be successful. */
  protocol?: ProbeProtocol;
  /** The port for communicating the probe. Possible values range from 1 to 65535, inclusive. */
  port?: number;
  /** The interval, in seconds, for how frequently to probe the endpoint for health status. Typically, the interval is slightly less than half the allocated timeout period (in seconds) which allows two full probes before taking the instance out of rotation. The default value is 15, the minimum value is 5. */
  intervalInSeconds?: number;
  /** Determines how new connections are handled by the load balancer when all backend instances are probed down. */
  noHealthyBackendsBehavior?: ProbeNoHealthyBackendsBehavior;
  /** The number of probes where if no response, will result in stopping further traffic from being delivered to the endpoint. This values allows endpoints to be taken out of rotation faster or slower than the typical times used in Azure. */
  numberOfProbes?: number;
  /** The number of consecutive successful or failed probes in order to allow or deny traffic from being delivered to this endpoint. After failing the number of consecutive probes equal to this value, the endpoint will be taken out of rotation and require the same number of successful consecutive probes to be placed back in rotation. */
  probeThreshold?: number;
  /** The URI used for requesting health status from the VM. Path is required if a protocol is set to http. Otherwise, it is not allowed. There is no default value. */
  requestPath?: string;
  /** The provisioning state of the probe resource. */
  readonly provisioningState?: ProvisioningState;
}

export function probeSerializer(item: Probe): any {
  return {
    name: item["name"],
    id: item["id"],
    properties: areAllPropsUndefined(item, [
      "protocol",
      "port",
      "intervalInSeconds",
      "noHealthyBackendsBehavior",
      "numberOfProbes",
      "probeThreshold",
      "requestPath",
    ])
      ? undefined
      : _probePropertiesSerializer(item),
  };
}

export function probeDeserializer(item: any): Probe {
  return {
    name: item["name"],
    type: item["type"],
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _probePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Load balancer probe resource. */
export interface ProbePropertiesFormat {
  /** The load balancer rules that use this probe. */
  readonly loadBalancingRules?: SubResource[];
  /** The protocol of the end point. If 'Tcp' is specified, a received ACK is required for the probe to be successful. If 'Http' or 'Https' is specified, a 200 OK response from the specifies URI is required for the probe to be successful. */
  protocol: ProbeProtocol;
  /** The port for communicating the probe. Possible values range from 1 to 65535, inclusive. */
  port: number;
  /** The interval, in seconds, for how frequently to probe the endpoint for health status. Typically, the interval is slightly less than half the allocated timeout period (in seconds) which allows two full probes before taking the instance out of rotation. The default value is 15, the minimum value is 5. */
  intervalInSeconds?: number;
  /** Determines how new connections are handled by the load balancer when all backend instances are probed down. */
  noHealthyBackendsBehavior?: ProbeNoHealthyBackendsBehavior;
  /** The number of probes where if no response, will result in stopping further traffic from being delivered to the endpoint. This values allows endpoints to be taken out of rotation faster or slower than the typical times used in Azure. */
  numberOfProbes?: number;
  /** The number of consecutive successful or failed probes in order to allow or deny traffic from being delivered to this endpoint. After failing the number of consecutive probes equal to this value, the endpoint will be taken out of rotation and require the same number of successful consecutive probes to be placed back in rotation. */
  probeThreshold?: number;
  /** The URI used for requesting health status from the VM. Path is required if a protocol is set to http. Otherwise, it is not allowed. There is no default value. */
  requestPath?: string;
  /** The provisioning state of the probe resource. */
  readonly provisioningState?: ProvisioningState;
}

export function probePropertiesFormatSerializer(item: ProbePropertiesFormat): any {
  return {
    protocol: item["protocol"],
    port: item["port"],
    intervalInSeconds: item["intervalInSeconds"],
    noHealthyBackendsBehavior: item["noHealthyBackendsBehavior"],
    numberOfProbes: item["numberOfProbes"],
    probeThreshold: item["probeThreshold"],
    requestPath: item["requestPath"],
  };
}

export function probePropertiesFormatDeserializer(item: any): ProbePropertiesFormat {
  return {
    loadBalancingRules: !item["loadBalancingRules"]
      ? item["loadBalancingRules"]
      : subResourceArrayDeserializer(item["loadBalancingRules"]),
    protocol: item["protocol"],
    port: item["port"],
    intervalInSeconds: item["intervalInSeconds"],
    noHealthyBackendsBehavior: item["noHealthyBackendsBehavior"],
    numberOfProbes: item["numberOfProbes"],
    probeThreshold: item["probeThreshold"],
    requestPath: item["requestPath"],
    provisioningState: item["provisioningState"],
  };
}

/** The protocol of the end point. If 'Tcp' is specified, a received ACK is required for the probe to be successful. If 'Http' or 'Https' is specified, a 200 OK response from the specifies URI is required for the probe to be successful. */
export enum KnownProbeProtocol {
  /** Http */
  Http = "Http",
  /** Tcp */
  Tcp = "Tcp",
  /** Https */
  Https = "Https",
}

/**
 * The protocol of the end point. If 'Tcp' is specified, a received ACK is required for the probe to be successful. If 'Http' or 'Https' is specified, a 200 OK response from the specifies URI is required for the probe to be successful. \
 * {@link KnownProbeProtocol} can be used interchangeably with ProbeProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Http**: Http \
 * **Tcp**: Tcp \
 * **Https**: Https
 */
export type ProbeProtocol = string;

/** Determines how new connections are handled by the load balancer when all backend instances are probed down. */
export enum KnownProbeNoHealthyBackendsBehavior {
  /** No new flows will be sent to the backend pool. */
  AllProbedDown = "AllProbedDown",
  /** When all backend instances are probed down, incoming packets will be sent to all instances. */
  AllProbedUp = "AllProbedUp",
}

/**
 * Determines how new connections are handled by the load balancer when all backend instances are probed down. \
 * {@link KnownProbeNoHealthyBackendsBehavior} can be used interchangeably with ProbeNoHealthyBackendsBehavior,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AllProbedDown**: No new flows will be sent to the backend pool. \
 * **AllProbedUp**: When all backend instances are probed down, incoming packets will be sent to all instances.
 */
export type ProbeNoHealthyBackendsBehavior = string;

export function inboundNatPoolArraySerializer(result: Array<InboundNatPool>): any[] {
  return result.map((item) => {
    return inboundNatPoolSerializer(item);
  });
}

export function inboundNatPoolArrayDeserializer(result: Array<InboundNatPool>): any[] {
  return result.map((item) => {
    return inboundNatPoolDeserializer(item);
  });
}

/** Inbound NAT pool of the load balancer. */
export interface InboundNatPool extends SubResource {
  /** The name of the resource that is unique within the set of inbound NAT pools used by the load balancer. This name can be used to access the resource. */
  name?: string;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Type of the resource. */
  readonly type?: string;
  /** A reference to frontend IP addresses. */
  frontendIPConfiguration?: SubResource;
  /** The reference to the transport protocol used by the inbound NAT pool. */
  protocol?: TransportProtocol;
  /** The first port number in the range of external ports that will be used to provide Inbound Nat to NICs associated with a load balancer. Acceptable values range between 1 and 65534. */
  frontendPortRangeStart?: number;
  /** The last port number in the range of external ports that will be used to provide Inbound Nat to NICs associated with a load balancer. Acceptable values range between 1 and 65535. */
  frontendPortRangeEnd?: number;
  /** The port used for internal connections on the endpoint. Acceptable values are between 1 and 65535. */
  backendPort?: number;
  /** The timeout for the TCP idle connection. The value can be set between 4 and 30 minutes. The default value is 4 minutes. This element is only used when the protocol is set to TCP. */
  idleTimeoutInMinutes?: number;
  /** Configures a virtual machine's endpoint for the floating IP capability required to configure a SQL AlwaysOn Availability Group. This setting is required when using the SQL AlwaysOn Availability Groups in SQL server. This setting can't be changed after you create the endpoint. */
  enableFloatingIP?: boolean;
  /** Receive bidirectional TCP Reset on TCP flow idle timeout or unexpected connection termination. This element is only used when the protocol is set to TCP. */
  enableTcpReset?: boolean;
  /** The provisioning state of the inbound NAT pool resource. */
  readonly provisioningState?: ProvisioningState;
}

export function inboundNatPoolSerializer(item: InboundNatPool): any {
  return {
    id: item["id"],
    properties: areAllPropsUndefined(item, [
      "frontendIPConfiguration",
      "protocol",
      "frontendPortRangeStart",
      "frontendPortRangeEnd",
      "backendPort",
      "idleTimeoutInMinutes",
      "enableFloatingIP",
      "enableTcpReset",
    ])
      ? undefined
      : _inboundNatPoolPropertiesSerializer(item),
    name: item["name"],
  };
}

export function inboundNatPoolDeserializer(item: any): InboundNatPool {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _inboundNatPoolPropertiesDeserializer(item["properties"])),
    name: item["name"],
    etag: item["etag"],
    type: item["type"],
  };
}

/** Properties of Inbound NAT pool. */
export interface InboundNatPoolPropertiesFormat {
  /** A reference to frontend IP addresses. */
  frontendIPConfiguration?: SubResource;
  /** The reference to the transport protocol used by the inbound NAT pool. */
  protocol: TransportProtocol;
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
  readonly provisioningState?: ProvisioningState;
}

export function inboundNatPoolPropertiesFormatSerializer(
  item: InboundNatPoolPropertiesFormat,
): any {
  return {
    frontendIPConfiguration: !item["frontendIPConfiguration"]
      ? item["frontendIPConfiguration"]
      : subResourceSerializer(item["frontendIPConfiguration"]),
    protocol: item["protocol"],
    frontendPortRangeStart: item["frontendPortRangeStart"],
    frontendPortRangeEnd: item["frontendPortRangeEnd"],
    backendPort: item["backendPort"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    enableFloatingIP: item["enableFloatingIP"],
    enableTcpReset: item["enableTcpReset"],
  };
}

export function inboundNatPoolPropertiesFormatDeserializer(
  item: any,
): InboundNatPoolPropertiesFormat {
  return {
    frontendIPConfiguration: !item["frontendIPConfiguration"]
      ? item["frontendIPConfiguration"]
      : subResourceDeserializer(item["frontendIPConfiguration"]),
    protocol: item["protocol"],
    frontendPortRangeStart: item["frontendPortRangeStart"],
    frontendPortRangeEnd: item["frontendPortRangeEnd"],
    backendPort: item["backendPort"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    enableFloatingIP: item["enableFloatingIP"],
    enableTcpReset: item["enableTcpReset"],
    provisioningState: item["provisioningState"],
  };
}

export function outboundRuleArraySerializer(result: Array<OutboundRule>): any[] {
  return result.map((item) => {
    return outboundRuleSerializer(item);
  });
}

export function outboundRuleArrayDeserializer(result: Array<OutboundRule>): any[] {
  return result.map((item) => {
    return outboundRuleDeserializer(item);
  });
}

/** Outbound rule of the load balancer. */
export interface OutboundRule extends SubResourceModel {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The number of outbound ports to be used for NAT. */
  allocatedOutboundPorts?: number;
  /** The Frontend IP addresses of the load balancer. */
  frontendIPConfigurations?: SubResource[];
  /** A reference to a pool of DIPs. Outbound traffic is randomly load balanced across IPs in the backend IPs. */
  backendAddressPool?: SubResource;
  /** The provisioning state of the outbound rule resource. */
  readonly provisioningState?: ProvisioningState;
  /** The protocol for the outbound rule in load balancer. */
  protocol?: LoadBalancerOutboundRuleProtocol;
  /** Receive bidirectional TCP Reset on TCP flow idle timeout or unexpected connection termination. This element is only used when the protocol is set to TCP. */
  enableTcpReset?: boolean;
  /** The timeout for the TCP idle connection. */
  idleTimeoutInMinutes?: number;
}

export function outboundRuleSerializer(item: OutboundRule): any {
  return {
    name: item["name"],
    id: item["id"],
    properties: areAllPropsUndefined(item, [
      "allocatedOutboundPorts",
      "frontendIPConfigurations",
      "backendAddressPool",
      "protocol",
      "enableTcpReset",
      "idleTimeoutInMinutes",
    ])
      ? undefined
      : _outboundRulePropertiesSerializer(item),
  };
}

export function outboundRuleDeserializer(item: any): OutboundRule {
  return {
    name: item["name"],
    type: item["type"],
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _outboundRulePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Outbound rule of the load balancer. */
export interface OutboundRulePropertiesFormat {
  /** The number of outbound ports to be used for NAT. */
  allocatedOutboundPorts?: number;
  /** The Frontend IP addresses of the load balancer. */
  frontendIPConfigurations: SubResource[];
  /** A reference to a pool of DIPs. Outbound traffic is randomly load balanced across IPs in the backend IPs. */
  backendAddressPool: SubResource;
  /** The provisioning state of the outbound rule resource. */
  readonly provisioningState?: ProvisioningState;
  /** The protocol for the outbound rule in load balancer. */
  protocol: LoadBalancerOutboundRuleProtocol;
  /** Receive bidirectional TCP Reset on TCP flow idle timeout or unexpected connection termination. This element is only used when the protocol is set to TCP. */
  enableTcpReset?: boolean;
  /** The timeout for the TCP idle connection. */
  idleTimeoutInMinutes?: number;
}

export function outboundRulePropertiesFormatSerializer(item: OutboundRulePropertiesFormat): any {
  return {
    allocatedOutboundPorts: item["allocatedOutboundPorts"],
    frontendIPConfigurations: subResourceArraySerializer(item["frontendIPConfigurations"]),
    backendAddressPool: subResourceSerializer(item["backendAddressPool"]),
    protocol: item["protocol"],
    enableTcpReset: item["enableTcpReset"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
  };
}

export function outboundRulePropertiesFormatDeserializer(item: any): OutboundRulePropertiesFormat {
  return {
    allocatedOutboundPorts: item["allocatedOutboundPorts"],
    frontendIPConfigurations: subResourceArrayDeserializer(item["frontendIPConfigurations"]),
    backendAddressPool: subResourceDeserializer(item["backendAddressPool"]),
    provisioningState: item["provisioningState"],
    protocol: item["protocol"],
    enableTcpReset: item["enableTcpReset"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
  };
}

/** The protocol for the outbound rule in load balancer. */
export enum KnownLoadBalancerOutboundRuleProtocol {
  /** Tcp */
  Tcp = "Tcp",
  /** Udp */
  Udp = "Udp",
  /** All */
  All = "All",
}

/**
 * The protocol for the outbound rule in load balancer. \
 * {@link KnownLoadBalancerOutboundRuleProtocol} can be used interchangeably with LoadBalancerOutboundRuleProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Tcp**: Tcp \
 * **Udp**: Udp \
 * **All**: All
 */
export type LoadBalancerOutboundRuleProtocol = string;

/** Indicates the scope of the load balancer: external (Public) or internal (Private). */
export enum KnownLoadBalancerScope {
  /** Public */
  Public = "Public",
  /** Private */
  Private = "Private",
}

/**
 * Indicates the scope of the load balancer: external (Public) or internal (Private). \
 * {@link KnownLoadBalancerScope} can be used interchangeably with LoadBalancerScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Public**: Public \
 * **Private**: Private
 */
export type LoadBalancerScope = string;

/** SKU of a load balancer. */
export interface LoadBalancerSku {
  /** Name of a load balancer SKU. */
  name?: LoadBalancerSkuName;
  /** Tier of a load balancer SKU. */
  tier?: LoadBalancerSkuTier;
}

export function loadBalancerSkuSerializer(item: LoadBalancerSku): any {
  return { name: item["name"], tier: item["tier"] };
}

export function loadBalancerSkuDeserializer(item: any): LoadBalancerSku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** Name of a load balancer SKU. */
export enum KnownLoadBalancerSkuName {
  /** Basic */
  Basic = "Basic",
  /** Standard */
  Standard = "Standard",
  /** Gateway */
  Gateway = "Gateway",
}

/**
 * Name of a load balancer SKU. \
 * {@link KnownLoadBalancerSkuName} can be used interchangeably with LoadBalancerSkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic**: Basic \
 * **Standard**: Standard \
 * **Gateway**: Gateway
 */
export type LoadBalancerSkuName = string;

/** Tier of a load balancer SKU. */
export enum KnownLoadBalancerSkuTier {
  /** Regional */
  Regional = "Regional",
  /** Global */
  Global = "Global",
}

/**
 * Tier of a load balancer SKU. \
 * {@link KnownLoadBalancerSkuTier} can be used interchangeably with LoadBalancerSkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regional**: Regional \
 * **Global**: Global
 */
export type LoadBalancerSkuTier = string;

export function loadBalancerArraySerializer(result: Array<LoadBalancer>): any[] {
  return result.map((item) => {
    return loadBalancerSerializer(item);
  });
}

export function loadBalancerArrayDeserializer(result: Array<LoadBalancer>): any[] {
  return result.map((item) => {
    return loadBalancerDeserializer(item);
  });
}

export function natGatewayArraySerializer(result: Array<NatGateway>): any[] {
  return result.map((item) => {
    return natGatewaySerializer(item);
  });
}

export function natGatewayArrayDeserializer(result: Array<NatGateway>): any[] {
  return result.map((item) => {
    return natGatewayDeserializer(item);
  });
}

export function networkSecurityGroupArraySerializer(result: Array<NetworkSecurityGroup>): any[] {
  return result.map((item) => {
    return networkSecurityGroupSerializer(item);
  });
}

export function networkSecurityGroupArrayDeserializer(result: Array<NetworkSecurityGroup>): any[] {
  return result.map((item) => {
    return networkSecurityGroupDeserializer(item);
  });
}

/** Network watcher in a resource group. */
export interface NetworkWatcher extends Resource {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The provisioning state of the network watcher resource. */
  readonly provisioningState?: ProvisioningState;
}

export function networkWatcherSerializer(item: NetworkWatcher): any {
  return {
    id: item["id"],
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [])
      ? undefined
      : _networkWatcherPropertiesSerializer(item),
  };
}

export function networkWatcherDeserializer(item: any): NetworkWatcher {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _networkWatcherPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** The network watcher properties. */
export interface NetworkWatcherPropertiesFormat {
  /** The provisioning state of the network watcher resource. */
  readonly provisioningState?: ProvisioningState;
}

export function networkWatcherPropertiesFormatSerializer(
  _item: NetworkWatcherPropertiesFormat,
): any {
  return {};
}

export function networkWatcherPropertiesFormatDeserializer(
  item: any,
): NetworkWatcherPropertiesFormat {
  return {
    provisioningState: item["provisioningState"],
  };
}

export function networkWatcherArraySerializer(result: Array<NetworkWatcher>): any[] {
  return result.map((item) => {
    return networkWatcherSerializer(item);
  });
}

export function networkWatcherArrayDeserializer(result: Array<NetworkWatcher>): any[] {
  return result.map((item) => {
    return networkWatcherDeserializer(item);
  });
}

export function privateLinkServiceArraySerializer(result: Array<PrivateLinkService>): any[] {
  return result.map((item) => {
    return privateLinkServiceSerializer(item);
  });
}

export function privateLinkServiceArrayDeserializer(result: Array<PrivateLinkService>): any[] {
  return result.map((item) => {
    return privateLinkServiceDeserializer(item);
  });
}

export function routeTableArraySerializer(result: Array<RouteTable>): any[] {
  return result.map((item) => {
    return routeTableSerializer(item);
  });
}

export function routeTableArrayDeserializer(result: Array<RouteTable>): any[] {
  return result.map((item) => {
    return routeTableDeserializer(item);
  });
}

/** Virtual Network resource. */
export interface VirtualNetwork extends Resource {
  /** The extended location of the virtual network. */
  extendedLocation?: ExtendedLocation;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The AddressSpace that contains an array of IP address ranges that can be used by subnets. */
  addressSpace?: AddressSpace;
  /** The dhcpOptions that contains an array of DNS servers available to VMs deployed in the virtual network. */
  dhcpOptions?: DhcpOptions;
  /** The FlowTimeout value (in minutes) for the Virtual Network */
  flowTimeoutInMinutes?: number;
  /** A list of subnets in a Virtual Network. */
  subnets?: Subnet[];
  /** A list of peerings in a Virtual Network. */
  virtualNetworkPeerings?: VirtualNetworkPeering[];
  /** The resourceGuid property of the Virtual Network resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the virtual network resource. */
  readonly provisioningState?: ProvisioningState;
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
  ipAllocations?: SubResource[];
  /** A collection of references to flow log resources. */
  readonly flowLogs?: FlowLog[];
  /** Private Endpoint VNet Policies. */
  privateEndpointVNetPolicies?: PrivateEndpointVNetPolicies;
  /** A reference to the default public nat gateway being used by this virtual network resource. */
  readonly defaultPublicNatGateway?: SubResource;
}

export function virtualNetworkSerializer(item: VirtualNetwork): any {
  return {
    id: item["id"],
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "addressSpace",
      "dhcpOptions",
      "flowTimeoutInMinutes",
      "subnets",
      "virtualNetworkPeerings",
      "enableDdosProtection",
      "enableVmProtection",
      "ddosProtectionPlan",
      "bgpCommunities",
      "encryption",
      "ipAllocations",
      "privateEndpointVNetPolicies",
    ])
      ? undefined
      : _virtualNetworkPropertiesSerializer(item),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function virtualNetworkDeserializer(item: any): VirtualNetwork {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _virtualNetworkPropertiesDeserializer(item["properties"])),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    etag: item["etag"],
  };
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
  subnets?: Subnet[];
  /** A list of peerings in a Virtual Network. */
  virtualNetworkPeerings?: VirtualNetworkPeering[];
  /** The resourceGuid property of the Virtual Network resource. */
  readonly resourceGuid?: string;
  /** The provisioning state of the virtual network resource. */
  readonly provisioningState?: ProvisioningState;
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
  ipAllocations?: SubResource[];
  /** A collection of references to flow log resources. */
  readonly flowLogs?: FlowLog[];
  /** Private Endpoint VNet Policies. */
  privateEndpointVNetPolicies?: PrivateEndpointVNetPolicies;
  /** A reference to the default public nat gateway being used by this virtual network resource. */
  readonly defaultPublicNatGateway?: SubResource;
}

export function virtualNetworkPropertiesFormatSerializer(
  item: VirtualNetworkPropertiesFormat,
): any {
  return {
    addressSpace: !item["addressSpace"]
      ? item["addressSpace"]
      : addressSpaceSerializer(item["addressSpace"]),
    dhcpOptions: !item["dhcpOptions"]
      ? item["dhcpOptions"]
      : dhcpOptionsSerializer(item["dhcpOptions"]),
    flowTimeoutInMinutes: item["flowTimeoutInMinutes"],
    subnets: !item["subnets"] ? item["subnets"] : subnetArraySerializer(item["subnets"]),
    virtualNetworkPeerings: !item["virtualNetworkPeerings"]
      ? item["virtualNetworkPeerings"]
      : virtualNetworkPeeringArraySerializer(item["virtualNetworkPeerings"]),
    enableDdosProtection: item["enableDdosProtection"],
    enableVmProtection: item["enableVmProtection"],
    ddosProtectionPlan: !item["ddosProtectionPlan"]
      ? item["ddosProtectionPlan"]
      : subResourceSerializer(item["ddosProtectionPlan"]),
    bgpCommunities: !item["bgpCommunities"]
      ? item["bgpCommunities"]
      : virtualNetworkBgpCommunitiesSerializer(item["bgpCommunities"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : virtualNetworkEncryptionSerializer(item["encryption"]),
    ipAllocations: !item["ipAllocations"]
      ? item["ipAllocations"]
      : subResourceArraySerializer(item["ipAllocations"]),
    privateEndpointVNetPolicies: item["privateEndpointVNetPolicies"],
  };
}

export function virtualNetworkPropertiesFormatDeserializer(
  item: any,
): VirtualNetworkPropertiesFormat {
  return {
    addressSpace: !item["addressSpace"]
      ? item["addressSpace"]
      : addressSpaceDeserializer(item["addressSpace"]),
    dhcpOptions: !item["dhcpOptions"]
      ? item["dhcpOptions"]
      : dhcpOptionsDeserializer(item["dhcpOptions"]),
    flowTimeoutInMinutes: item["flowTimeoutInMinutes"],
    subnets: !item["subnets"] ? item["subnets"] : subnetArrayDeserializer(item["subnets"]),
    virtualNetworkPeerings: !item["virtualNetworkPeerings"]
      ? item["virtualNetworkPeerings"]
      : virtualNetworkPeeringArrayDeserializer(item["virtualNetworkPeerings"]),
    resourceGuid: item["resourceGuid"],
    provisioningState: item["provisioningState"],
    enableDdosProtection: item["enableDdosProtection"],
    enableVmProtection: item["enableVmProtection"],
    ddosProtectionPlan: !item["ddosProtectionPlan"]
      ? item["ddosProtectionPlan"]
      : subResourceDeserializer(item["ddosProtectionPlan"]),
    bgpCommunities: !item["bgpCommunities"]
      ? item["bgpCommunities"]
      : virtualNetworkBgpCommunitiesDeserializer(item["bgpCommunities"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : virtualNetworkEncryptionDeserializer(item["encryption"]),
    ipAllocations: !item["ipAllocations"]
      ? item["ipAllocations"]
      : subResourceArrayDeserializer(item["ipAllocations"]),
    flowLogs: !item["flowLogs"] ? item["flowLogs"] : flowLogArrayDeserializer(item["flowLogs"]),
    privateEndpointVNetPolicies: item["privateEndpointVNetPolicies"],
    defaultPublicNatGateway: !item["defaultPublicNatGateway"]
      ? item["defaultPublicNatGateway"]
      : subResourceDeserializer(item["defaultPublicNatGateway"]),
  };
}

/** AddressSpace contains an array of IP address ranges that can be used by subnets of the virtual network. */
export interface AddressSpace {
  /** A list of address blocks reserved for this virtual network in CIDR notation. */
  addressPrefixes?: string[];
  /** A list of IPAM Pools allocating IP address prefixes. */
  ipamPoolPrefixAllocations?: IpamPoolPrefixAllocation[];
}

export function addressSpaceSerializer(item: AddressSpace): any {
  return {
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    ipamPoolPrefixAllocations: !item["ipamPoolPrefixAllocations"]
      ? item["ipamPoolPrefixAllocations"]
      : ipamPoolPrefixAllocationArraySerializer(item["ipamPoolPrefixAllocations"]),
  };
}

export function addressSpaceDeserializer(item: any): AddressSpace {
  return {
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    ipamPoolPrefixAllocations: !item["ipamPoolPrefixAllocations"]
      ? item["ipamPoolPrefixAllocations"]
      : ipamPoolPrefixAllocationArrayDeserializer(item["ipamPoolPrefixAllocations"]),
  };
}

/** DhcpOptions contains an array of DNS servers available to VMs deployed in the virtual network. Standard DHCP option for a subnet overrides VNET DHCP options. */
export interface DhcpOptions {
  /** The list of DNS servers IP addresses. */
  dnsServers?: string[];
}

export function dhcpOptionsSerializer(item: DhcpOptions): any {
  return {
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
  };
}

export function dhcpOptionsDeserializer(item: any): DhcpOptions {
  return {
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
  };
}

export function virtualNetworkPeeringArraySerializer(result: Array<VirtualNetworkPeering>): any[] {
  return result.map((item) => {
    return virtualNetworkPeeringSerializer(item);
  });
}

export function virtualNetworkPeeringArrayDeserializer(
  result: Array<VirtualNetworkPeering>,
): any[] {
  return result.map((item) => {
    return virtualNetworkPeeringDeserializer(item);
  });
}

/** Peerings in a virtual network resource. */
export interface VirtualNetworkPeering extends SubResourceModel {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
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
  /** The local address space of the local virtual network that is peered. */
  localAddressSpace?: AddressSpace;
  /** The current local address space of the local virtual network that is peered. */
  localVirtualNetworkAddressSpace?: AddressSpace;
  /** The reference to the address space peered with the remote virtual network. */
  remoteAddressSpace?: AddressSpace;
  /** The reference to the current address space of the remote virtual network. */
  remoteVirtualNetworkAddressSpace?: AddressSpace;
  /** The reference to the remote virtual network's Bgp Communities. */
  remoteBgpCommunities?: VirtualNetworkBgpCommunities;
  /** The reference to the remote virtual network's encryption */
  readonly remoteVirtualNetworkEncryption?: VirtualNetworkEncryption;
  /** The status of the virtual network peering. */
  peeringState?: VirtualNetworkPeeringState;
  /** The peering sync status of the virtual network peering. */
  peeringSyncLevel?: VirtualNetworkPeeringLevel;
  /** The provisioning state of the virtual network peering resource. */
  readonly provisioningState?: ProvisioningState;
  /** If we need to verify the provisioning state of the remote gateway. */
  doNotVerifyRemoteGateways?: boolean;
  /** The resourceGuid property of the Virtual Network peering resource. */
  readonly resourceGuid?: string;
  /** Whether complete virtual network address space is peered. */
  peerCompleteVnets?: boolean;
  /** Whether only Ipv6 address space is peered for subnet peering. */
  enableOnlyIPv6Peering?: boolean;
  /** List of local subnet names that are subnet peered with remote virtual network. */
  localSubnetNames?: string[];
  /** List of remote subnet names from remote virtual network that are subnet peered. */
  remoteSubnetNames?: string[];
}

export function virtualNetworkPeeringSerializer(item: VirtualNetworkPeering): any {
  return {
    name: item["name"],
    id: item["id"],
    properties: areAllPropsUndefined(item, [
      "allowVirtualNetworkAccess",
      "allowForwardedTraffic",
      "allowGatewayTransit",
      "useRemoteGateways",
      "remoteVirtualNetwork",
      "localAddressSpace",
      "localVirtualNetworkAddressSpace",
      "remoteAddressSpace",
      "remoteVirtualNetworkAddressSpace",
      "remoteBgpCommunities",
      "peeringState",
      "peeringSyncLevel",
      "doNotVerifyRemoteGateways",
      "peerCompleteVnets",
      "enableOnlyIPv6Peering",
      "localSubnetNames",
      "remoteSubnetNames",
    ])
      ? undefined
      : _virtualNetworkPeeringPropertiesSerializer(item),
  };
}

export function virtualNetworkPeeringDeserializer(item: any): VirtualNetworkPeering {
  return {
    name: item["name"],
    type: item["type"],
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _virtualNetworkPeeringPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
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
  /** The local address space of the local virtual network that is peered. */
  localAddressSpace?: AddressSpace;
  /** The current local address space of the local virtual network that is peered. */
  localVirtualNetworkAddressSpace?: AddressSpace;
  /** The reference to the address space peered with the remote virtual network. */
  remoteAddressSpace?: AddressSpace;
  /** The reference to the current address space of the remote virtual network. */
  remoteVirtualNetworkAddressSpace?: AddressSpace;
  /** The reference to the remote virtual network's Bgp Communities. */
  remoteBgpCommunities?: VirtualNetworkBgpCommunities;
  /** The reference to the remote virtual network's encryption */
  readonly remoteVirtualNetworkEncryption?: VirtualNetworkEncryption;
  /** The status of the virtual network peering. */
  peeringState?: VirtualNetworkPeeringState;
  /** The peering sync status of the virtual network peering. */
  peeringSyncLevel?: VirtualNetworkPeeringLevel;
  /** The provisioning state of the virtual network peering resource. */
  readonly provisioningState?: ProvisioningState;
  /** If we need to verify the provisioning state of the remote gateway. */
  doNotVerifyRemoteGateways?: boolean;
  /** The resourceGuid property of the Virtual Network peering resource. */
  readonly resourceGuid?: string;
  /** Whether complete virtual network address space is peered. */
  peerCompleteVnets?: boolean;
  /** Whether only Ipv6 address space is peered for subnet peering. */
  enableOnlyIPv6Peering?: boolean;
  /** List of local subnet names that are subnet peered with remote virtual network. */
  localSubnetNames?: string[];
  /** List of remote subnet names from remote virtual network that are subnet peered. */
  remoteSubnetNames?: string[];
}

export function virtualNetworkPeeringPropertiesFormatSerializer(
  item: VirtualNetworkPeeringPropertiesFormat,
): any {
  return {
    allowVirtualNetworkAccess: item["allowVirtualNetworkAccess"],
    allowForwardedTraffic: item["allowForwardedTraffic"],
    allowGatewayTransit: item["allowGatewayTransit"],
    useRemoteGateways: item["useRemoteGateways"],
    remoteVirtualNetwork: !item["remoteVirtualNetwork"]
      ? item["remoteVirtualNetwork"]
      : subResourceSerializer(item["remoteVirtualNetwork"]),
    localAddressSpace: !item["localAddressSpace"]
      ? item["localAddressSpace"]
      : addressSpaceSerializer(item["localAddressSpace"]),
    localVirtualNetworkAddressSpace: !item["localVirtualNetworkAddressSpace"]
      ? item["localVirtualNetworkAddressSpace"]
      : addressSpaceSerializer(item["localVirtualNetworkAddressSpace"]),
    remoteAddressSpace: !item["remoteAddressSpace"]
      ? item["remoteAddressSpace"]
      : addressSpaceSerializer(item["remoteAddressSpace"]),
    remoteVirtualNetworkAddressSpace: !item["remoteVirtualNetworkAddressSpace"]
      ? item["remoteVirtualNetworkAddressSpace"]
      : addressSpaceSerializer(item["remoteVirtualNetworkAddressSpace"]),
    remoteBgpCommunities: !item["remoteBgpCommunities"]
      ? item["remoteBgpCommunities"]
      : virtualNetworkBgpCommunitiesSerializer(item["remoteBgpCommunities"]),
    peeringState: item["peeringState"],
    peeringSyncLevel: item["peeringSyncLevel"],
    doNotVerifyRemoteGateways: item["doNotVerifyRemoteGateways"],
    peerCompleteVnets: item["peerCompleteVnets"],
    enableOnlyIPv6Peering: item["enableOnlyIPv6Peering"],
    localSubnetNames: !item["localSubnetNames"]
      ? item["localSubnetNames"]
      : item["localSubnetNames"].map((p: any) => {
          return p;
        }),
    remoteSubnetNames: !item["remoteSubnetNames"]
      ? item["remoteSubnetNames"]
      : item["remoteSubnetNames"].map((p: any) => {
          return p;
        }),
  };
}

export function virtualNetworkPeeringPropertiesFormatDeserializer(
  item: any,
): VirtualNetworkPeeringPropertiesFormat {
  return {
    allowVirtualNetworkAccess: item["allowVirtualNetworkAccess"],
    allowForwardedTraffic: item["allowForwardedTraffic"],
    allowGatewayTransit: item["allowGatewayTransit"],
    useRemoteGateways: item["useRemoteGateways"],
    remoteVirtualNetwork: !item["remoteVirtualNetwork"]
      ? item["remoteVirtualNetwork"]
      : subResourceDeserializer(item["remoteVirtualNetwork"]),
    localAddressSpace: !item["localAddressSpace"]
      ? item["localAddressSpace"]
      : addressSpaceDeserializer(item["localAddressSpace"]),
    localVirtualNetworkAddressSpace: !item["localVirtualNetworkAddressSpace"]
      ? item["localVirtualNetworkAddressSpace"]
      : addressSpaceDeserializer(item["localVirtualNetworkAddressSpace"]),
    remoteAddressSpace: !item["remoteAddressSpace"]
      ? item["remoteAddressSpace"]
      : addressSpaceDeserializer(item["remoteAddressSpace"]),
    remoteVirtualNetworkAddressSpace: !item["remoteVirtualNetworkAddressSpace"]
      ? item["remoteVirtualNetworkAddressSpace"]
      : addressSpaceDeserializer(item["remoteVirtualNetworkAddressSpace"]),
    remoteBgpCommunities: !item["remoteBgpCommunities"]
      ? item["remoteBgpCommunities"]
      : virtualNetworkBgpCommunitiesDeserializer(item["remoteBgpCommunities"]),
    remoteVirtualNetworkEncryption: !item["remoteVirtualNetworkEncryption"]
      ? item["remoteVirtualNetworkEncryption"]
      : virtualNetworkEncryptionDeserializer(item["remoteVirtualNetworkEncryption"]),
    peeringState: item["peeringState"],
    peeringSyncLevel: item["peeringSyncLevel"],
    provisioningState: item["provisioningState"],
    doNotVerifyRemoteGateways: item["doNotVerifyRemoteGateways"],
    resourceGuid: item["resourceGuid"],
    peerCompleteVnets: item["peerCompleteVnets"],
    enableOnlyIPv6Peering: item["enableOnlyIPv6Peering"],
    localSubnetNames: !item["localSubnetNames"]
      ? item["localSubnetNames"]
      : item["localSubnetNames"].map((p: any) => {
          return p;
        }),
    remoteSubnetNames: !item["remoteSubnetNames"]
      ? item["remoteSubnetNames"]
      : item["remoteSubnetNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Bgp Communities sent over ExpressRoute with each route corresponding to a prefix in this VNET. */
export interface VirtualNetworkBgpCommunities {
  /** The BGP community associated with the virtual network. */
  virtualNetworkCommunity: string;
  /** The BGP community associated with the region of the virtual network. */
  readonly regionalCommunity?: string;
}

export function virtualNetworkBgpCommunitiesSerializer(item: VirtualNetworkBgpCommunities): any {
  return { virtualNetworkCommunity: item["virtualNetworkCommunity"] };
}

export function virtualNetworkBgpCommunitiesDeserializer(item: any): VirtualNetworkBgpCommunities {
  return {
    virtualNetworkCommunity: item["virtualNetworkCommunity"],
    regionalCommunity: item["regionalCommunity"],
  };
}

/** Indicates if encryption is enabled on virtual network and if VM without encryption is allowed in encrypted VNet. */
export interface VirtualNetworkEncryption {
  /** Indicates if encryption is enabled on the virtual network. */
  enabled: boolean;
  /** If the encrypted VNet allows VM that does not support encryption. This field is for future support, AllowUnencrypted is the only supported value at general availability. */
  enforcement?: VirtualNetworkEncryptionEnforcement;
}

export function virtualNetworkEncryptionSerializer(item: VirtualNetworkEncryption): any {
  return { enabled: item["enabled"], enforcement: item["enforcement"] };
}

export function virtualNetworkEncryptionDeserializer(item: any): VirtualNetworkEncryption {
  return {
    enabled: item["enabled"],
    enforcement: item["enforcement"],
  };
}

/** If the encrypted VNet allows VM that does not support encryption. This field is for future support, AllowUnencrypted is the only supported value at general availability. */
export enum KnownVirtualNetworkEncryptionEnforcement {
  /** DropUnencrypted */
  DropUnencrypted = "DropUnencrypted",
  /** AllowUnencrypted */
  AllowUnencrypted = "AllowUnencrypted",
}

/**
 * If the encrypted VNet allows VM that does not support encryption. This field is for future support, AllowUnencrypted is the only supported value at general availability. \
 * {@link KnownVirtualNetworkEncryptionEnforcement} can be used interchangeably with VirtualNetworkEncryptionEnforcement,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DropUnencrypted**: DropUnencrypted \
 * **AllowUnencrypted**: AllowUnencrypted
 */
export type VirtualNetworkEncryptionEnforcement = string;

/** The status of the virtual network peering. */
export enum KnownVirtualNetworkPeeringState {
  /** Initiated */
  Initiated = "Initiated",
  /** Connected */
  Connected = "Connected",
  /** Disconnected */
  Disconnected = "Disconnected",
}

/**
 * The status of the virtual network peering. \
 * {@link KnownVirtualNetworkPeeringState} can be used interchangeably with VirtualNetworkPeeringState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Initiated**: Initiated \
 * **Connected**: Connected \
 * **Disconnected**: Disconnected
 */
export type VirtualNetworkPeeringState = string;

/** The peering sync status of the virtual network peering. */
export enum KnownVirtualNetworkPeeringLevel {
  /** FullyInSync */
  FullyInSync = "FullyInSync",
  /** RemoteNotInSync */
  RemoteNotInSync = "RemoteNotInSync",
  /** LocalNotInSync */
  LocalNotInSync = "LocalNotInSync",
  /** LocalAndRemoteNotInSync */
  LocalAndRemoteNotInSync = "LocalAndRemoteNotInSync",
}

/**
 * The peering sync status of the virtual network peering. \
 * {@link KnownVirtualNetworkPeeringLevel} can be used interchangeably with VirtualNetworkPeeringLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FullyInSync**: FullyInSync \
 * **RemoteNotInSync**: RemoteNotInSync \
 * **LocalNotInSync**: LocalNotInSync \
 * **LocalAndRemoteNotInSync**: LocalAndRemoteNotInSync
 */
export type VirtualNetworkPeeringLevel = string;

/** Private Endpoint VNet Policies. */
export enum KnownPrivateEndpointVNetPolicies {
  /** Disabled */
  Disabled = "Disabled",
  /** Basic */
  Basic = "Basic",
}

/**
 * Private Endpoint VNet Policies. \
 * {@link KnownPrivateEndpointVNetPolicies} can be used interchangeably with PrivateEndpointVNetPolicies,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Basic**: Basic
 */
export type PrivateEndpointVNetPolicies = string;

export function virtualNetworkArraySerializer(result: Array<VirtualNetwork>): any[] {
  return result.map((item) => {
    return virtualNetworkSerializer(item);
  });
}

export function virtualNetworkArrayDeserializer(result: Array<VirtualNetwork>): any[] {
  return result.map((item) => {
    return virtualNetworkDeserializer(item);
  });
}

export function _applicationGatewayIPConfigurationPropertiesSerializer(
  item: ApplicationGatewayIPConfiguration,
): any {
  return { subnet: !item["subnet"] ? item["subnet"] : subResourceSerializer(item["subnet"]) };
}

export function _applicationGatewayIPConfigurationPropertiesDeserializer(item: any) {
  return {
    subnet: !item["subnet"] ? item["subnet"] : subResourceDeserializer(item["subnet"]),
    provisioningState: item["provisioningState"],
  };
}

export function _networkInterfaceTapConfigurationPropertiesSerializer(
  item: NetworkInterfaceTapConfiguration,
): any {
  return {
    virtualNetworkTap: !item["virtualNetworkTap"]
      ? item["virtualNetworkTap"]
      : virtualNetworkTapSerializer(item["virtualNetworkTap"]),
  };
}

export function _networkInterfaceTapConfigurationPropertiesDeserializer(item: any) {
  return {
    virtualNetworkTap: !item["virtualNetworkTap"]
      ? item["virtualNetworkTap"]
      : virtualNetworkTapDeserializer(item["virtualNetworkTap"]),
    provisioningState: item["provisioningState"],
  };
}

export function _applicationSecurityGroupPropertiesSerializer(
  _item: ApplicationSecurityGroup,
): any {
  return {};
}

export function _applicationSecurityGroupPropertiesDeserializer(item: any) {
  return {
    resourceGuid: item["resourceGuid"],
    provisioningState: item["provisioningState"],
  };
}

export function _securityRulePropertiesSerializer(item: SecurityRule): any {
  return {
    description: item["description"],
    protocol: item["protocol"],
    sourcePortRange: item["sourcePortRange"],
    destinationPortRange: item["destinationPortRange"],
    sourceAddressPrefix: item["sourceAddressPrefix"],
    sourceAddressPrefixes: !item["sourceAddressPrefixes"]
      ? item["sourceAddressPrefixes"]
      : item["sourceAddressPrefixes"].map((p: any) => {
          return p;
        }),
    sourceApplicationSecurityGroups: !item["sourceApplicationSecurityGroups"]
      ? item["sourceApplicationSecurityGroups"]
      : applicationSecurityGroupArraySerializer(item["sourceApplicationSecurityGroups"]),
    destinationAddressPrefix: item["destinationAddressPrefix"],
    destinationAddressPrefixes: !item["destinationAddressPrefixes"]
      ? item["destinationAddressPrefixes"]
      : item["destinationAddressPrefixes"].map((p: any) => {
          return p;
        }),
    destinationApplicationSecurityGroups: !item["destinationApplicationSecurityGroups"]
      ? item["destinationApplicationSecurityGroups"]
      : applicationSecurityGroupArraySerializer(item["destinationApplicationSecurityGroups"]),
    sourcePortRanges: !item["sourcePortRanges"]
      ? item["sourcePortRanges"]
      : item["sourcePortRanges"].map((p: any) => {
          return p;
        }),
    destinationPortRanges: !item["destinationPortRanges"]
      ? item["destinationPortRanges"]
      : item["destinationPortRanges"].map((p: any) => {
          return p;
        }),
    access: item["access"],
    priority: item["priority"],
    direction: item["direction"],
  };
}

export function _securityRulePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    protocol: item["protocol"],
    sourcePortRange: item["sourcePortRange"],
    destinationPortRange: item["destinationPortRange"],
    sourceAddressPrefix: item["sourceAddressPrefix"],
    sourceAddressPrefixes: !item["sourceAddressPrefixes"]
      ? item["sourceAddressPrefixes"]
      : item["sourceAddressPrefixes"].map((p: any) => {
          return p;
        }),
    sourceApplicationSecurityGroups: !item["sourceApplicationSecurityGroups"]
      ? item["sourceApplicationSecurityGroups"]
      : applicationSecurityGroupArrayDeserializer(item["sourceApplicationSecurityGroups"]),
    destinationAddressPrefix: item["destinationAddressPrefix"],
    destinationAddressPrefixes: !item["destinationAddressPrefixes"]
      ? item["destinationAddressPrefixes"]
      : item["destinationAddressPrefixes"].map((p: any) => {
          return p;
        }),
    destinationApplicationSecurityGroups: !item["destinationApplicationSecurityGroups"]
      ? item["destinationApplicationSecurityGroups"]
      : applicationSecurityGroupArrayDeserializer(item["destinationApplicationSecurityGroups"]),
    sourcePortRanges: !item["sourcePortRanges"]
      ? item["sourcePortRanges"]
      : item["sourcePortRanges"].map((p: any) => {
          return p;
        }),
    destinationPortRanges: !item["destinationPortRanges"]
      ? item["destinationPortRanges"]
      : item["destinationPortRanges"].map((p: any) => {
          return p;
        }),
    access: item["access"],
    priority: item["priority"],
    direction: item["direction"],
    provisioningState: item["provisioningState"],
  };
}

export function _privateLinkServiceConnectionPropertiesSerializer(
  item: PrivateLinkServiceConnection,
): any {
  return {
    privateLinkServiceId: item["privateLinkServiceId"],
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    requestMessage: item["requestMessage"],
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _privateLinkServiceConnectionPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    privateLinkServiceId: item["privateLinkServiceId"],
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    requestMessage: item["requestMessage"],
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _privateEndpointIPConfigurationPropertiesSerializer(
  item: PrivateEndpointIPConfiguration,
): any {
  return {
    groupId: item["groupId"],
    memberName: item["memberName"],
    privateIPAddress: item["privateIPAddress"],
  };
}

export function _privateEndpointIPConfigurationPropertiesDeserializer(item: any) {
  return {
    groupId: item["groupId"],
    memberName: item["memberName"],
    privateIPAddress: item["privateIPAddress"],
  };
}

export function _privateEndpointPropertiesSerializer(item: PrivateEndpoint): any {
  return {
    subnet: !item["subnet"] ? item["subnet"] : subnetSerializer(item["subnet"]),
    ipVersionType: item["ipVersionType"],
    privateLinkServiceConnections: !item["privateLinkServiceConnections"]
      ? item["privateLinkServiceConnections"]
      : privateLinkServiceConnectionArraySerializer(item["privateLinkServiceConnections"]),
    manualPrivateLinkServiceConnections: !item["manualPrivateLinkServiceConnections"]
      ? item["manualPrivateLinkServiceConnections"]
      : privateLinkServiceConnectionArraySerializer(item["manualPrivateLinkServiceConnections"]),
    customDnsConfigs: !item["customDnsConfigs"]
      ? item["customDnsConfigs"]
      : customDnsConfigPropertiesFormatArraySerializer(item["customDnsConfigs"]),
    applicationSecurityGroups: !item["applicationSecurityGroups"]
      ? item["applicationSecurityGroups"]
      : applicationSecurityGroupArraySerializer(item["applicationSecurityGroups"]),
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : privateEndpointIPConfigurationArraySerializer(item["ipConfigurations"]),
    customNetworkInterfaceName: item["customNetworkInterfaceName"],
  };
}

export function _privateEndpointPropertiesDeserializer(item: any) {
  return {
    subnet: !item["subnet"] ? item["subnet"] : subnetDeserializer(item["subnet"]),
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceArrayDeserializer(item["networkInterfaces"]),
    provisioningState: item["provisioningState"],
    ipVersionType: item["ipVersionType"],
    privateLinkServiceConnections: !item["privateLinkServiceConnections"]
      ? item["privateLinkServiceConnections"]
      : privateLinkServiceConnectionArrayDeserializer(item["privateLinkServiceConnections"]),
    manualPrivateLinkServiceConnections: !item["manualPrivateLinkServiceConnections"]
      ? item["manualPrivateLinkServiceConnections"]
      : privateLinkServiceConnectionArrayDeserializer(item["manualPrivateLinkServiceConnections"]),
    customDnsConfigs: !item["customDnsConfigs"]
      ? item["customDnsConfigs"]
      : customDnsConfigPropertiesFormatArrayDeserializer(item["customDnsConfigs"]),
    applicationSecurityGroups: !item["applicationSecurityGroups"]
      ? item["applicationSecurityGroups"]
      : applicationSecurityGroupArrayDeserializer(item["applicationSecurityGroups"]),
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : privateEndpointIPConfigurationArrayDeserializer(item["ipConfigurations"]),
    customNetworkInterfaceName: item["customNetworkInterfaceName"],
  };
}

export function _privateLinkServiceIpConfigurationPropertiesSerializer(
  item: PrivateLinkServiceIpConfiguration,
): any {
  return {
    privateIPAddress: item["privateIPAddress"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    subnet: !item["subnet"] ? item["subnet"] : subnetSerializer(item["subnet"]),
    primary: item["primary"],
    privateIPAddressVersion: item["privateIPAddressVersion"],
  };
}

export function _privateLinkServiceIpConfigurationPropertiesDeserializer(item: any) {
  return {
    privateIPAddress: item["privateIPAddress"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    subnet: !item["subnet"] ? item["subnet"] : subnetDeserializer(item["subnet"]),
    primary: item["primary"],
    provisioningState: item["provisioningState"],
    privateIPAddressVersion: item["privateIPAddressVersion"],
  };
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
    linkIdentifier: item["linkIdentifier"],
    privateEndpointLocation: item["privateEndpointLocation"],
  };
}

export function _privateLinkServicePropertiesSerializer(item: PrivateLinkService): any {
  return {
    loadBalancerFrontendIpConfigurations: !item["loadBalancerFrontendIpConfigurations"]
      ? item["loadBalancerFrontendIpConfigurations"]
      : frontendIPConfigurationArraySerializer(item["loadBalancerFrontendIpConfigurations"]),
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : privateLinkServiceIpConfigurationArraySerializer(item["ipConfigurations"]),
    destinationIPAddress: item["destinationIPAddress"],
    accessMode: item["accessMode"],
    visibility: !item["visibility"]
      ? item["visibility"]
      : privateLinkServicePropertiesVisibilitySerializer(item["visibility"]),
    autoApproval: !item["autoApproval"]
      ? item["autoApproval"]
      : privateLinkServicePropertiesAutoApprovalSerializer(item["autoApproval"]),
    fqdns: !item["fqdns"]
      ? item["fqdns"]
      : item["fqdns"].map((p: any) => {
          return p;
        }),
    enableProxyProtocol: item["enableProxyProtocol"],
  };
}

export function _privateLinkServicePropertiesDeserializer(item: any) {
  return {
    loadBalancerFrontendIpConfigurations: !item["loadBalancerFrontendIpConfigurations"]
      ? item["loadBalancerFrontendIpConfigurations"]
      : frontendIPConfigurationArrayDeserializer(item["loadBalancerFrontendIpConfigurations"]),
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : privateLinkServiceIpConfigurationArrayDeserializer(item["ipConfigurations"]),
    destinationIPAddress: item["destinationIPAddress"],
    accessMode: item["accessMode"],
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceArrayDeserializer(item["networkInterfaces"]),
    provisioningState: item["provisioningState"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    visibility: !item["visibility"]
      ? item["visibility"]
      : privateLinkServicePropertiesVisibilityDeserializer(item["visibility"]),
    autoApproval: !item["autoApproval"]
      ? item["autoApproval"]
      : privateLinkServicePropertiesAutoApprovalDeserializer(item["autoApproval"]),
    fqdns: !item["fqdns"]
      ? item["fqdns"]
      : item["fqdns"].map((p: any) => {
          return p;
        }),
    alias: item["alias"],
    enableProxyProtocol: item["enableProxyProtocol"],
  };
}

export function _networkInterfacePropertiesSerializer(item: NetworkInterface): any {
  return {
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : networkSecurityGroupSerializer(item["networkSecurityGroup"]),
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : networkInterfaceIPConfigurationArraySerializer(item["ipConfigurations"]),
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : networkInterfaceDnsSettingsSerializer(item["dnsSettings"]),
    enableAcceleratedNetworking: item["enableAcceleratedNetworking"],
    disableTcpStateTracking: item["disableTcpStateTracking"],
    enableIPForwarding: item["enableIPForwarding"],
    workloadType: item["workloadType"],
    nicType: item["nicType"],
    privateLinkService: !item["privateLinkService"]
      ? item["privateLinkService"]
      : privateLinkServiceSerializer(item["privateLinkService"]),
    migrationPhase: item["migrationPhase"],
    auxiliaryMode: item["auxiliaryMode"],
    auxiliarySku: item["auxiliarySku"],
  };
}

export function _networkInterfacePropertiesDeserializer(item: any) {
  return {
    virtualMachine: !item["virtualMachine"]
      ? item["virtualMachine"]
      : subResourceDeserializer(item["virtualMachine"]),
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : networkSecurityGroupDeserializer(item["networkSecurityGroup"]),
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : networkInterfaceIPConfigurationArrayDeserializer(item["ipConfigurations"]),
    tapConfigurations: !item["tapConfigurations"]
      ? item["tapConfigurations"]
      : networkInterfaceTapConfigurationArrayDeserializer(item["tapConfigurations"]),
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : networkInterfaceDnsSettingsDeserializer(item["dnsSettings"]),
    macAddress: item["macAddress"],
    primary: item["primary"],
    vnetEncryptionSupported: item["vnetEncryptionSupported"],
    defaultOutboundConnectivityEnabled: item["defaultOutboundConnectivityEnabled"],
    enableAcceleratedNetworking: item["enableAcceleratedNetworking"],
    disableTcpStateTracking: item["disableTcpStateTracking"],
    enableIPForwarding: item["enableIPForwarding"],
    hostedWorkloads: !item["hostedWorkloads"]
      ? item["hostedWorkloads"]
      : item["hostedWorkloads"].map((p: any) => {
          return p;
        }),
    dscpConfiguration: !item["dscpConfiguration"]
      ? item["dscpConfiguration"]
      : subResourceDeserializer(item["dscpConfiguration"]),
    resourceGuid: item["resourceGuid"],
    provisioningState: item["provisioningState"],
    workloadType: item["workloadType"],
    nicType: item["nicType"],
    privateLinkService: !item["privateLinkService"]
      ? item["privateLinkService"]
      : privateLinkServiceDeserializer(item["privateLinkService"]),
    migrationPhase: item["migrationPhase"],
    auxiliaryMode: item["auxiliaryMode"],
    auxiliarySku: item["auxiliarySku"],
  };
}

export function _flowLogPropertiesSerializer(item: FlowLog): any {
  return {
    targetResourceId: item["targetResourceId"],
    storageId: item["storageId"],
    enabledFilteringCriteria: item["enabledFilteringCriteria"],
    recordTypes: item["recordTypes"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyParametersSerializer(item["retentionPolicy"]),
    format: !item["format"] ? item["format"] : flowLogFormatParametersSerializer(item["format"]),
    flowAnalyticsConfiguration: !item["flowAnalyticsConfiguration"]
      ? item["flowAnalyticsConfiguration"]
      : trafficAnalyticsPropertiesSerializer(item["flowAnalyticsConfiguration"]),
  };
}

export function _flowLogPropertiesDeserializer(item: any) {
  return {
    targetResourceId: item["targetResourceId"],
    targetResourceGuid: item["targetResourceGuid"],
    storageId: item["storageId"],
    enabledFilteringCriteria: item["enabledFilteringCriteria"],
    recordTypes: item["recordTypes"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyParametersDeserializer(item["retentionPolicy"]),
    format: !item["format"] ? item["format"] : flowLogFormatParametersDeserializer(item["format"]),
    flowAnalyticsConfiguration: !item["flowAnalyticsConfiguration"]
      ? item["flowAnalyticsConfiguration"]
      : trafficAnalyticsPropertiesDeserializer(item["flowAnalyticsConfiguration"]),
    provisioningState: item["provisioningState"],
  };
}

export function _networkSecurityGroupPropertiesSerializer(item: NetworkSecurityGroup): any {
  return {
    flushConnection: item["flushConnection"],
    securityRules: !item["securityRules"]
      ? item["securityRules"]
      : securityRuleArraySerializer(item["securityRules"]),
  };
}

export function _networkSecurityGroupPropertiesDeserializer(item: any) {
  return {
    flushConnection: item["flushConnection"],
    securityRules: !item["securityRules"]
      ? item["securityRules"]
      : securityRuleArrayDeserializer(item["securityRules"]),
    defaultSecurityRules: !item["defaultSecurityRules"]
      ? item["defaultSecurityRules"]
      : securityRuleArrayDeserializer(item["defaultSecurityRules"]),
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceArrayDeserializer(item["networkInterfaces"]),
    subnets: !item["subnets"] ? item["subnets"] : subnetArrayDeserializer(item["subnets"]),
    flowLogs: !item["flowLogs"] ? item["flowLogs"] : flowLogArrayDeserializer(item["flowLogs"]),
    resourceGuid: item["resourceGuid"],
    provisioningState: item["provisioningState"],
  };
}

export function _routePropertiesSerializer(item: Route): any {
  return {
    addressPrefix: item["addressPrefix"],
    nextHopType: item["nextHopType"],
    nextHopIpAddress: item["nextHopIpAddress"],
  };
}

export function _routePropertiesDeserializer(item: any) {
  return {
    addressPrefix: item["addressPrefix"],
    nextHopType: item["nextHopType"],
    nextHopIpAddress: item["nextHopIpAddress"],
    provisioningState: item["provisioningState"],
    hasBgpOverride: item["hasBgpOverride"],
  };
}

export function _routeTablePropertiesSerializer(item: RouteTable): any {
  return {
    routes: !item["routes"] ? item["routes"] : routeArraySerializer(item["routes"]),
    disableBgpRoutePropagation: item["disableBgpRoutePropagation"],
  };
}

export function _routeTablePropertiesDeserializer(item: any) {
  return {
    routes: !item["routes"] ? item["routes"] : routeArrayDeserializer(item["routes"]),
    subnets: !item["subnets"] ? item["subnets"] : subnetArrayDeserializer(item["subnets"]),
    disableBgpRoutePropagation: item["disableBgpRoutePropagation"],
    provisioningState: item["provisioningState"],
    resourceGuid: item["resourceGuid"],
  };
}

export function _serviceEndpointPolicyDefinitionPropertiesSerializer(
  item: ServiceEndpointPolicyDefinition,
): any {
  return {
    description: item["description"],
    service: item["service"],
    serviceResources: !item["serviceResources"]
      ? item["serviceResources"]
      : item["serviceResources"].map((p: any) => {
          return p;
        }),
  };
}

export function _serviceEndpointPolicyDefinitionPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    service: item["service"],
    serviceResources: !item["serviceResources"]
      ? item["serviceResources"]
      : item["serviceResources"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

export function _serviceEndpointPolicyPropertiesSerializer(item: ServiceEndpointPolicy): any {
  return {
    serviceEndpointPolicyDefinitions: !item["serviceEndpointPolicyDefinitions"]
      ? item["serviceEndpointPolicyDefinitions"]
      : serviceEndpointPolicyDefinitionArraySerializer(item["serviceEndpointPolicyDefinitions"]),
    serviceAlias: item["serviceAlias"],
    contextualServiceEndpointPolicies: !item["contextualServiceEndpointPolicies"]
      ? item["contextualServiceEndpointPolicies"]
      : item["contextualServiceEndpointPolicies"].map((p: any) => {
          return p;
        }),
  };
}

export function _serviceEndpointPolicyPropertiesDeserializer(item: any) {
  return {
    serviceEndpointPolicyDefinitions: !item["serviceEndpointPolicyDefinitions"]
      ? item["serviceEndpointPolicyDefinitions"]
      : serviceEndpointPolicyDefinitionArrayDeserializer(item["serviceEndpointPolicyDefinitions"]),
    subnets: !item["subnets"] ? item["subnets"] : subnetArrayDeserializer(item["subnets"]),
    resourceGuid: item["resourceGuid"],
    provisioningState: item["provisioningState"],
    serviceAlias: item["serviceAlias"],
    contextualServiceEndpointPolicies: !item["contextualServiceEndpointPolicies"]
      ? item["contextualServiceEndpointPolicies"]
      : item["contextualServiceEndpointPolicies"].map((p: any) => {
          return p;
        }),
  };
}

export function _natGatewayPropertiesSerializer(item: NatGateway): any {
  return {
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    publicIpAddresses: !item["publicIpAddresses"]
      ? item["publicIpAddresses"]
      : subResourceArraySerializer(item["publicIpAddresses"]),
    publicIpAddressesV6: !item["publicIpAddressesV6"]
      ? item["publicIpAddressesV6"]
      : subResourceArraySerializer(item["publicIpAddressesV6"]),
    publicIpPrefixes: !item["publicIpPrefixes"]
      ? item["publicIpPrefixes"]
      : subResourceArraySerializer(item["publicIpPrefixes"]),
    publicIpPrefixesV6: !item["publicIpPrefixesV6"]
      ? item["publicIpPrefixesV6"]
      : subResourceArraySerializer(item["publicIpPrefixesV6"]),
    sourceVirtualNetwork: !item["sourceVirtualNetwork"]
      ? item["sourceVirtualNetwork"]
      : subResourceSerializer(item["sourceVirtualNetwork"]),
    serviceGateway: !item["serviceGateway"]
      ? item["serviceGateway"]
      : subResourceSerializer(item["serviceGateway"]),
  };
}

export function _natGatewayPropertiesDeserializer(item: any) {
  return {
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    publicIpAddresses: !item["publicIpAddresses"]
      ? item["publicIpAddresses"]
      : subResourceArrayDeserializer(item["publicIpAddresses"]),
    publicIpAddressesV6: !item["publicIpAddressesV6"]
      ? item["publicIpAddressesV6"]
      : subResourceArrayDeserializer(item["publicIpAddressesV6"]),
    publicIpPrefixes: !item["publicIpPrefixes"]
      ? item["publicIpPrefixes"]
      : subResourceArrayDeserializer(item["publicIpPrefixes"]),
    publicIpPrefixesV6: !item["publicIpPrefixesV6"]
      ? item["publicIpPrefixesV6"]
      : subResourceArrayDeserializer(item["publicIpPrefixesV6"]),
    subnets: !item["subnets"] ? item["subnets"] : subResourceArrayDeserializer(item["subnets"]),
    sourceVirtualNetwork: !item["sourceVirtualNetwork"]
      ? item["sourceVirtualNetwork"]
      : subResourceDeserializer(item["sourceVirtualNetwork"]),
    serviceGateway: !item["serviceGateway"]
      ? item["serviceGateway"]
      : subResourceDeserializer(item["serviceGateway"]),
    resourceGuid: item["resourceGuid"],
    provisioningState: item["provisioningState"],
  };
}

export function _publicIPAddressPropertiesSerializer(item: PublicIPAddress): any {
  return {
    publicIPAllocationMethod: item["publicIPAllocationMethod"],
    publicIPAddressVersion: item["publicIPAddressVersion"],
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : publicIPAddressDnsSettingsSerializer(item["dnsSettings"]),
    ddosSettings: !item["ddosSettings"]
      ? item["ddosSettings"]
      : ddosSettingsSerializer(item["ddosSettings"]),
    ipTags: !item["ipTags"] ? item["ipTags"] : ipTagArraySerializer(item["ipTags"]),
    ipAddress: item["ipAddress"],
    publicIPPrefix: !item["publicIPPrefix"]
      ? item["publicIPPrefix"]
      : subResourceSerializer(item["publicIPPrefix"]),
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    servicePublicIPAddress: !item["servicePublicIPAddress"]
      ? item["servicePublicIPAddress"]
      : publicIPAddressSerializer(item["servicePublicIPAddress"]),
    natGateway: !item["natGateway"] ? item["natGateway"] : natGatewaySerializer(item["natGateway"]),
    migrationPhase: item["migrationPhase"],
    linkedPublicIPAddress: !item["linkedPublicIPAddress"]
      ? item["linkedPublicIPAddress"]
      : publicIPAddressSerializer(item["linkedPublicIPAddress"]),
    deleteOption: item["deleteOption"],
  };
}

export function _publicIPAddressPropertiesDeserializer(item: any) {
  return {
    publicIPAllocationMethod: item["publicIPAllocationMethod"],
    publicIPAddressVersion: item["publicIPAddressVersion"],
    ipConfiguration: !item["ipConfiguration"]
      ? item["ipConfiguration"]
      : ipConfigurationDeserializer(item["ipConfiguration"]),
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : publicIPAddressDnsSettingsDeserializer(item["dnsSettings"]),
    ddosSettings: !item["ddosSettings"]
      ? item["ddosSettings"]
      : ddosSettingsDeserializer(item["ddosSettings"]),
    ipTags: !item["ipTags"] ? item["ipTags"] : ipTagArrayDeserializer(item["ipTags"]),
    ipAddress: item["ipAddress"],
    publicIPPrefix: !item["publicIPPrefix"]
      ? item["publicIPPrefix"]
      : subResourceDeserializer(item["publicIPPrefix"]),
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    resourceGuid: item["resourceGuid"],
    provisioningState: item["provisioningState"],
    servicePublicIPAddress: !item["servicePublicIPAddress"]
      ? item["servicePublicIPAddress"]
      : publicIPAddressDeserializer(item["servicePublicIPAddress"]),
    natGateway: !item["natGateway"]
      ? item["natGateway"]
      : natGatewayDeserializer(item["natGateway"]),
    migrationPhase: item["migrationPhase"],
    linkedPublicIPAddress: !item["linkedPublicIPAddress"]
      ? item["linkedPublicIPAddress"]
      : publicIPAddressDeserializer(item["linkedPublicIPAddress"]),
    deleteOption: item["deleteOption"],
  };
}

export function _ipConfigurationPropertiesDeserializer(item: any) {
  return {
    privateIPAddress: item["privateIPAddress"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    subnet: !item["subnet"] ? item["subnet"] : subnetDeserializer(item["subnet"]),
    publicIPAddress: !item["publicIPAddress"]
      ? item["publicIPAddress"]
      : publicIPAddressDeserializer(item["publicIPAddress"]),
    provisioningState: item["provisioningState"],
  };
}

export function _ipConfigurationProfilePropertiesSerializer(item: IPConfigurationProfile): any {
  return { subnet: !item["subnet"] ? item["subnet"] : subnetSerializer(item["subnet"]) };
}

export function _ipConfigurationProfilePropertiesDeserializer(item: any) {
  return {
    subnet: !item["subnet"] ? item["subnet"] : subnetDeserializer(item["subnet"]),
    provisioningState: item["provisioningState"],
  };
}

export function _resourceNavigationLinkPropertiesDeserializer(item: any) {
  return {
    linkedResourceType: item["linkedResourceType"],
    link: item["link"],
    provisioningState: item["provisioningState"],
  };
}

export function _serviceAssociationLinkPropertiesDeserializer(item: any) {
  return {
    linkedResourceType: item["linkedResourceType"],
    link: item["link"],
    provisioningState: item["provisioningState"],
    allowDelete: item["allowDelete"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
  };
}

export function _delegationPropertiesSerializer(item: Delegation): any {
  return { serviceName: item["serviceName"] };
}

export function _delegationPropertiesDeserializer(item: any) {
  return {
    serviceName: item["serviceName"],
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

export function _ipamPoolPrefixAllocationPoolSerializer(item: IpamPoolPrefixAllocation): any {
  return { id: item["id"] };
}

export function _ipamPoolPrefixAllocationPoolDeserializer(item: any) {
  return {
    id: item["id"],
  };
}

export function _subnetPropertiesSerializer(item: Subnet): any {
  return {
    addressPrefix: item["addressPrefix"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : networkSecurityGroupSerializer(item["networkSecurityGroup"]),
    routeTable: !item["routeTable"] ? item["routeTable"] : routeTableSerializer(item["routeTable"]),
    natGateway: !item["natGateway"]
      ? item["natGateway"]
      : subResourceSerializer(item["natGateway"]),
    serviceEndpoints: !item["serviceEndpoints"]
      ? item["serviceEndpoints"]
      : serviceEndpointPropertiesFormatArraySerializer(item["serviceEndpoints"]),
    serviceEndpointPolicies: !item["serviceEndpointPolicies"]
      ? item["serviceEndpointPolicies"]
      : serviceEndpointPolicyArraySerializer(item["serviceEndpointPolicies"]),
    ipAllocations: !item["ipAllocations"]
      ? item["ipAllocations"]
      : subResourceArraySerializer(item["ipAllocations"]),
    delegations: !item["delegations"]
      ? item["delegations"]
      : delegationArraySerializer(item["delegations"]),
    privateEndpointNetworkPolicies: item["privateEndpointNetworkPolicies"],
    privateLinkServiceNetworkPolicies: item["privateLinkServiceNetworkPolicies"],
    applicationGatewayIPConfigurations: !item["applicationGatewayIPConfigurations"]
      ? item["applicationGatewayIPConfigurations"]
      : applicationGatewayIPConfigurationArraySerializer(
          item["applicationGatewayIPConfigurations"],
        ),
    sharingScope: item["sharingScope"],
    defaultOutboundAccess: item["defaultOutboundAccess"],
    ipamPoolPrefixAllocations: !item["ipamPoolPrefixAllocations"]
      ? item["ipamPoolPrefixAllocations"]
      : ipamPoolPrefixAllocationArraySerializer(item["ipamPoolPrefixAllocations"]),
    serviceGateway: !item["serviceGateway"]
      ? item["serviceGateway"]
      : subResourceSerializer(item["serviceGateway"]),
  };
}

export function _subnetPropertiesDeserializer(item: any) {
  return {
    addressPrefix: item["addressPrefix"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : networkSecurityGroupDeserializer(item["networkSecurityGroup"]),
    routeTable: !item["routeTable"]
      ? item["routeTable"]
      : routeTableDeserializer(item["routeTable"]),
    natGateway: !item["natGateway"]
      ? item["natGateway"]
      : subResourceDeserializer(item["natGateway"]),
    serviceEndpoints: !item["serviceEndpoints"]
      ? item["serviceEndpoints"]
      : serviceEndpointPropertiesFormatArrayDeserializer(item["serviceEndpoints"]),
    serviceEndpointPolicies: !item["serviceEndpointPolicies"]
      ? item["serviceEndpointPolicies"]
      : serviceEndpointPolicyArrayDeserializer(item["serviceEndpointPolicies"]),
    privateEndpoints: !item["privateEndpoints"]
      ? item["privateEndpoints"]
      : privateEndpointArrayDeserializer(item["privateEndpoints"]),
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : ipConfigurationArrayDeserializer(item["ipConfigurations"]),
    ipConfigurationProfiles: !item["ipConfigurationProfiles"]
      ? item["ipConfigurationProfiles"]
      : ipConfigurationProfileArrayDeserializer(item["ipConfigurationProfiles"]),
    ipAllocations: !item["ipAllocations"]
      ? item["ipAllocations"]
      : subResourceArrayDeserializer(item["ipAllocations"]),
    resourceNavigationLinks: !item["resourceNavigationLinks"]
      ? item["resourceNavigationLinks"]
      : resourceNavigationLinkArrayDeserializer(item["resourceNavigationLinks"]),
    serviceAssociationLinks: !item["serviceAssociationLinks"]
      ? item["serviceAssociationLinks"]
      : serviceAssociationLinkArrayDeserializer(item["serviceAssociationLinks"]),
    delegations: !item["delegations"]
      ? item["delegations"]
      : delegationArrayDeserializer(item["delegations"]),
    purpose: item["purpose"],
    provisioningState: item["provisioningState"],
    privateEndpointNetworkPolicies: item["privateEndpointNetworkPolicies"],
    privateLinkServiceNetworkPolicies: item["privateLinkServiceNetworkPolicies"],
    applicationGatewayIPConfigurations: !item["applicationGatewayIPConfigurations"]
      ? item["applicationGatewayIPConfigurations"]
      : applicationGatewayIPConfigurationArrayDeserializer(
          item["applicationGatewayIPConfigurations"],
        ),
    sharingScope: item["sharingScope"],
    defaultOutboundAccess: item["defaultOutboundAccess"],
    ipamPoolPrefixAllocations: !item["ipamPoolPrefixAllocations"]
      ? item["ipamPoolPrefixAllocations"]
      : ipamPoolPrefixAllocationArrayDeserializer(item["ipamPoolPrefixAllocations"]),
    serviceGateway: !item["serviceGateway"]
      ? item["serviceGateway"]
      : subResourceDeserializer(item["serviceGateway"]),
  };
}

export function _frontendIPConfigurationPropertiesSerializer(item: FrontendIPConfiguration): any {
  return {
    privateIPAddress: item["privateIPAddress"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    privateIPAddressVersion: item["privateIPAddressVersion"],
    subnet: !item["subnet"] ? item["subnet"] : subnetSerializer(item["subnet"]),
    publicIPAddress: !item["publicIPAddress"]
      ? item["publicIPAddress"]
      : publicIPAddressSerializer(item["publicIPAddress"]),
    publicIPPrefix: !item["publicIPPrefix"]
      ? item["publicIPPrefix"]
      : subResourceSerializer(item["publicIPPrefix"]),
    gatewayLoadBalancer: !item["gatewayLoadBalancer"]
      ? item["gatewayLoadBalancer"]
      : subResourceSerializer(item["gatewayLoadBalancer"]),
  };
}

export function _frontendIPConfigurationPropertiesDeserializer(item: any) {
  return {
    inboundNatRules: !item["inboundNatRules"]
      ? item["inboundNatRules"]
      : subResourceArrayDeserializer(item["inboundNatRules"]),
    inboundNatPools: !item["inboundNatPools"]
      ? item["inboundNatPools"]
      : subResourceArrayDeserializer(item["inboundNatPools"]),
    outboundRules: !item["outboundRules"]
      ? item["outboundRules"]
      : subResourceArrayDeserializer(item["outboundRules"]),
    loadBalancingRules: !item["loadBalancingRules"]
      ? item["loadBalancingRules"]
      : subResourceArrayDeserializer(item["loadBalancingRules"]),
    privateIPAddress: item["privateIPAddress"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    privateIPAddressVersion: item["privateIPAddressVersion"],
    subnet: !item["subnet"] ? item["subnet"] : subnetDeserializer(item["subnet"]),
    publicIPAddress: !item["publicIPAddress"]
      ? item["publicIPAddress"]
      : publicIPAddressDeserializer(item["publicIPAddress"]),
    publicIPPrefix: !item["publicIPPrefix"]
      ? item["publicIPPrefix"]
      : subResourceDeserializer(item["publicIPPrefix"]),
    gatewayLoadBalancer: !item["gatewayLoadBalancer"]
      ? item["gatewayLoadBalancer"]
      : subResourceDeserializer(item["gatewayLoadBalancer"]),
    provisioningState: item["provisioningState"],
  };
}

export function _virtualNetworkTapPropertiesSerializer(item: VirtualNetworkTap): any {
  return {
    destinationNetworkInterfaceIPConfiguration: !item["destinationNetworkInterfaceIPConfiguration"]
      ? item["destinationNetworkInterfaceIPConfiguration"]
      : networkInterfaceIPConfigurationSerializer(
          item["destinationNetworkInterfaceIPConfiguration"],
        ),
    destinationLoadBalancerFrontEndIPConfiguration: !item[
      "destinationLoadBalancerFrontEndIPConfiguration"
    ]
      ? item["destinationLoadBalancerFrontEndIPConfiguration"]
      : frontendIPConfigurationSerializer(item["destinationLoadBalancerFrontEndIPConfiguration"]),
    destinationPort: item["destinationPort"],
  };
}

export function _virtualNetworkTapPropertiesDeserializer(item: any) {
  return {
    networkInterfaceTapConfigurations: !item["networkInterfaceTapConfigurations"]
      ? item["networkInterfaceTapConfigurations"]
      : networkInterfaceTapConfigurationArrayDeserializer(
          item["networkInterfaceTapConfigurations"],
        ),
    resourceGuid: item["resourceGuid"],
    provisioningState: item["provisioningState"],
    destinationNetworkInterfaceIPConfiguration: !item["destinationNetworkInterfaceIPConfiguration"]
      ? item["destinationNetworkInterfaceIPConfiguration"]
      : networkInterfaceIPConfigurationDeserializer(
          item["destinationNetworkInterfaceIPConfiguration"],
        ),
    destinationLoadBalancerFrontEndIPConfiguration: !item[
      "destinationLoadBalancerFrontEndIPConfiguration"
    ]
      ? item["destinationLoadBalancerFrontEndIPConfiguration"]
      : frontendIPConfigurationDeserializer(item["destinationLoadBalancerFrontEndIPConfiguration"]),
    destinationPort: item["destinationPort"],
  };
}

export function _loadBalancerBackendAddressPropertiesSerializer(
  item: LoadBalancerBackendAddress,
): any {
  return {
    virtualNetwork: !item["virtualNetwork"]
      ? item["virtualNetwork"]
      : subResourceSerializer(item["virtualNetwork"]),
    subnet: !item["subnet"] ? item["subnet"] : subResourceSerializer(item["subnet"]),
    ipAddress: item["ipAddress"],
    loadBalancerFrontendIPConfiguration: !item["loadBalancerFrontendIPConfiguration"]
      ? item["loadBalancerFrontendIPConfiguration"]
      : subResourceSerializer(item["loadBalancerFrontendIPConfiguration"]),
    adminState: item["adminState"],
  };
}

export function _loadBalancerBackendAddressPropertiesDeserializer(item: any) {
  return {
    virtualNetwork: !item["virtualNetwork"]
      ? item["virtualNetwork"]
      : subResourceDeserializer(item["virtualNetwork"]),
    subnet: !item["subnet"] ? item["subnet"] : subResourceDeserializer(item["subnet"]),
    ipAddress: item["ipAddress"],
    networkInterfaceIPConfiguration: !item["networkInterfaceIPConfiguration"]
      ? item["networkInterfaceIPConfiguration"]
      : subResourceDeserializer(item["networkInterfaceIPConfiguration"]),
    loadBalancerFrontendIPConfiguration: !item["loadBalancerFrontendIPConfiguration"]
      ? item["loadBalancerFrontendIPConfiguration"]
      : subResourceDeserializer(item["loadBalancerFrontendIPConfiguration"]),
    inboundNatRulesPortMapping: !item["inboundNatRulesPortMapping"]
      ? item["inboundNatRulesPortMapping"]
      : natRulePortMappingArrayDeserializer(item["inboundNatRulesPortMapping"]),
    adminState: item["adminState"],
  };
}

export function _backendAddressPoolPropertiesSerializer(item: BackendAddressPool): any {
  return {
    location: item["location"],
    tunnelInterfaces: !item["tunnelInterfaces"]
      ? item["tunnelInterfaces"]
      : gatewayLoadBalancerTunnelInterfaceArraySerializer(item["tunnelInterfaces"]),
    loadBalancerBackendAddresses: !item["loadBalancerBackendAddresses"]
      ? item["loadBalancerBackendAddresses"]
      : loadBalancerBackendAddressArraySerializer(item["loadBalancerBackendAddresses"]),
    drainPeriodInSeconds: item["drainPeriodInSeconds"],
    virtualNetwork: !item["virtualNetwork"]
      ? item["virtualNetwork"]
      : subResourceSerializer(item["virtualNetwork"]),
    syncMode: item["syncMode"],
  };
}

export function _backendAddressPoolPropertiesDeserializer(item: any) {
  return {
    location: item["location"],
    tunnelInterfaces: !item["tunnelInterfaces"]
      ? item["tunnelInterfaces"]
      : gatewayLoadBalancerTunnelInterfaceArrayDeserializer(item["tunnelInterfaces"]),
    loadBalancerBackendAddresses: !item["loadBalancerBackendAddresses"]
      ? item["loadBalancerBackendAddresses"]
      : loadBalancerBackendAddressArrayDeserializer(item["loadBalancerBackendAddresses"]),
    backendIPConfigurations: !item["backendIPConfigurations"]
      ? item["backendIPConfigurations"]
      : networkInterfaceIPConfigurationArrayDeserializer(item["backendIPConfigurations"]),
    loadBalancingRules: !item["loadBalancingRules"]
      ? item["loadBalancingRules"]
      : subResourceArrayDeserializer(item["loadBalancingRules"]),
    outboundRule: !item["outboundRule"]
      ? item["outboundRule"]
      : subResourceDeserializer(item["outboundRule"]),
    outboundRules: !item["outboundRules"]
      ? item["outboundRules"]
      : subResourceArrayDeserializer(item["outboundRules"]),
    inboundNatRules: !item["inboundNatRules"]
      ? item["inboundNatRules"]
      : subResourceArrayDeserializer(item["inboundNatRules"]),
    provisioningState: item["provisioningState"],
    drainPeriodInSeconds: item["drainPeriodInSeconds"],
    virtualNetwork: !item["virtualNetwork"]
      ? item["virtualNetwork"]
      : subResourceDeserializer(item["virtualNetwork"]),
    syncMode: item["syncMode"],
  };
}

export function _inboundNatRulePropertiesSerializer(item: InboundNatRule): any {
  return {
    frontendIPConfiguration: !item["frontendIPConfiguration"]
      ? item["frontendIPConfiguration"]
      : subResourceSerializer(item["frontendIPConfiguration"]),
    protocol: item["protocol"],
    frontendPort: item["frontendPort"],
    backendPort: item["backendPort"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    enableFloatingIP: item["enableFloatingIP"],
    enableTcpReset: item["enableTcpReset"],
    frontendPortRangeStart: item["frontendPortRangeStart"],
    frontendPortRangeEnd: item["frontendPortRangeEnd"],
    backendAddressPool: !item["backendAddressPool"]
      ? item["backendAddressPool"]
      : subResourceSerializer(item["backendAddressPool"]),
  };
}

export function _inboundNatRulePropertiesDeserializer(item: any) {
  return {
    frontendIPConfiguration: !item["frontendIPConfiguration"]
      ? item["frontendIPConfiguration"]
      : subResourceDeserializer(item["frontendIPConfiguration"]),
    backendIPConfiguration: !item["backendIPConfiguration"]
      ? item["backendIPConfiguration"]
      : networkInterfaceIPConfigurationDeserializer(item["backendIPConfiguration"]),
    protocol: item["protocol"],
    frontendPort: item["frontendPort"],
    backendPort: item["backendPort"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    enableFloatingIP: item["enableFloatingIP"],
    enableTcpReset: item["enableTcpReset"],
    frontendPortRangeStart: item["frontendPortRangeStart"],
    frontendPortRangeEnd: item["frontendPortRangeEnd"],
    backendAddressPool: !item["backendAddressPool"]
      ? item["backendAddressPool"]
      : subResourceDeserializer(item["backendAddressPool"]),
    provisioningState: item["provisioningState"],
  };
}

export function _networkInterfaceIPConfigurationPropertiesSerializer(
  item: NetworkInterfaceIPConfiguration,
): any {
  return {
    gatewayLoadBalancer: !item["gatewayLoadBalancer"]
      ? item["gatewayLoadBalancer"]
      : subResourceSerializer(item["gatewayLoadBalancer"]),
    virtualNetworkTaps: !item["virtualNetworkTaps"]
      ? item["virtualNetworkTaps"]
      : virtualNetworkTapArraySerializer(item["virtualNetworkTaps"]),
    applicationGatewayBackendAddressPools: !item["applicationGatewayBackendAddressPools"]
      ? item["applicationGatewayBackendAddressPools"]
      : applicationGatewayBackendAddressPoolArraySerializer(
          item["applicationGatewayBackendAddressPools"],
        ),
    loadBalancerBackendAddressPools: !item["loadBalancerBackendAddressPools"]
      ? item["loadBalancerBackendAddressPools"]
      : backendAddressPoolArraySerializer(item["loadBalancerBackendAddressPools"]),
    loadBalancerInboundNatRules: !item["loadBalancerInboundNatRules"]
      ? item["loadBalancerInboundNatRules"]
      : inboundNatRuleArraySerializer(item["loadBalancerInboundNatRules"]),
    privateIPAddress: item["privateIPAddress"],
    privateIPAddressPrefixLength: item["privateIPAddressPrefixLength"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    privateIPAddressVersion: item["privateIPAddressVersion"],
    subnet: !item["subnet"] ? item["subnet"] : subnetSerializer(item["subnet"]),
    primary: item["primary"],
    publicIPAddress: !item["publicIPAddress"]
      ? item["publicIPAddress"]
      : publicIPAddressSerializer(item["publicIPAddress"]),
    applicationSecurityGroups: !item["applicationSecurityGroups"]
      ? item["applicationSecurityGroups"]
      : applicationSecurityGroupArraySerializer(item["applicationSecurityGroups"]),
  };
}

export function _networkInterfaceIPConfigurationPropertiesDeserializer(item: any) {
  return {
    gatewayLoadBalancer: !item["gatewayLoadBalancer"]
      ? item["gatewayLoadBalancer"]
      : subResourceDeserializer(item["gatewayLoadBalancer"]),
    virtualNetworkTaps: !item["virtualNetworkTaps"]
      ? item["virtualNetworkTaps"]
      : virtualNetworkTapArrayDeserializer(item["virtualNetworkTaps"]),
    applicationGatewayBackendAddressPools: !item["applicationGatewayBackendAddressPools"]
      ? item["applicationGatewayBackendAddressPools"]
      : applicationGatewayBackendAddressPoolArrayDeserializer(
          item["applicationGatewayBackendAddressPools"],
        ),
    loadBalancerBackendAddressPools: !item["loadBalancerBackendAddressPools"]
      ? item["loadBalancerBackendAddressPools"]
      : backendAddressPoolArrayDeserializer(item["loadBalancerBackendAddressPools"]),
    loadBalancerInboundNatRules: !item["loadBalancerInboundNatRules"]
      ? item["loadBalancerInboundNatRules"]
      : inboundNatRuleArrayDeserializer(item["loadBalancerInboundNatRules"]),
    privateIPAddress: item["privateIPAddress"],
    privateIPAddressPrefixLength: item["privateIPAddressPrefixLength"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    privateIPAddressVersion: item["privateIPAddressVersion"],
    subnet: !item["subnet"] ? item["subnet"] : subnetDeserializer(item["subnet"]),
    primary: item["primary"],
    publicIPAddress: !item["publicIPAddress"]
      ? item["publicIPAddress"]
      : publicIPAddressDeserializer(item["publicIPAddress"]),
    applicationSecurityGroups: !item["applicationSecurityGroups"]
      ? item["applicationSecurityGroups"]
      : applicationSecurityGroupArrayDeserializer(item["applicationSecurityGroups"]),
    provisioningState: item["provisioningState"],
    privateLinkConnectionProperties: !item["privateLinkConnectionProperties"]
      ? item["privateLinkConnectionProperties"]
      : networkInterfaceIPConfigurationPrivateLinkConnectionPropertiesDeserializer(
          item["privateLinkConnectionProperties"],
        ),
  };
}

export function _applicationGatewayBackendAddressPoolPropertiesSerializer(
  item: ApplicationGatewayBackendAddressPool,
): any {
  return {
    backendAddresses: !item["backendAddresses"]
      ? item["backendAddresses"]
      : applicationGatewayBackendAddressArraySerializer(item["backendAddresses"]),
  };
}

export function _applicationGatewayBackendAddressPoolPropertiesDeserializer(item: any) {
  return {
    backendIPConfigurations: !item["backendIPConfigurations"]
      ? item["backendIPConfigurations"]
      : networkInterfaceIPConfigurationArrayDeserializer(item["backendIPConfigurations"]),
    backendAddresses: !item["backendAddresses"]
      ? item["backendAddresses"]
      : applicationGatewayBackendAddressArrayDeserializer(item["backendAddresses"]),
    provisioningState: item["provisioningState"],
  };
}

export function _loadBalancingRulePropertiesSerializer(item: LoadBalancingRule): any {
  return {
    frontendIPConfiguration: !item["frontendIPConfiguration"]
      ? item["frontendIPConfiguration"]
      : subResourceSerializer(item["frontendIPConfiguration"]),
    backendAddressPool: !item["backendAddressPool"]
      ? item["backendAddressPool"]
      : subResourceSerializer(item["backendAddressPool"]),
    backendAddressPools: !item["backendAddressPools"]
      ? item["backendAddressPools"]
      : subResourceArraySerializer(item["backendAddressPools"]),
    probe: !item["probe"] ? item["probe"] : subResourceSerializer(item["probe"]),
    protocol: item["protocol"],
    loadDistribution: item["loadDistribution"],
    frontendPort: item["frontendPort"],
    backendPort: item["backendPort"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    enableFloatingIP: item["enableFloatingIP"],
    enableTcpReset: item["enableTcpReset"],
    disableOutboundSnat: item["disableOutboundSnat"],
    enableConnectionTracking: item["enableConnectionTracking"],
  };
}

export function _loadBalancingRulePropertiesDeserializer(item: any) {
  return {
    frontendIPConfiguration: !item["frontendIPConfiguration"]
      ? item["frontendIPConfiguration"]
      : subResourceDeserializer(item["frontendIPConfiguration"]),
    backendAddressPool: !item["backendAddressPool"]
      ? item["backendAddressPool"]
      : subResourceDeserializer(item["backendAddressPool"]),
    backendAddressPools: !item["backendAddressPools"]
      ? item["backendAddressPools"]
      : subResourceArrayDeserializer(item["backendAddressPools"]),
    probe: !item["probe"] ? item["probe"] : subResourceDeserializer(item["probe"]),
    protocol: item["protocol"],
    loadDistribution: item["loadDistribution"],
    frontendPort: item["frontendPort"],
    backendPort: item["backendPort"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    enableFloatingIP: item["enableFloatingIP"],
    enableTcpReset: item["enableTcpReset"],
    disableOutboundSnat: item["disableOutboundSnat"],
    enableConnectionTracking: item["enableConnectionTracking"],
    provisioningState: item["provisioningState"],
  };
}

export function _probePropertiesSerializer(item: Probe): any {
  return {
    protocol: item["protocol"],
    port: item["port"],
    intervalInSeconds: item["intervalInSeconds"],
    noHealthyBackendsBehavior: item["noHealthyBackendsBehavior"],
    numberOfProbes: item["numberOfProbes"],
    probeThreshold: item["probeThreshold"],
    requestPath: item["requestPath"],
  };
}

export function _probePropertiesDeserializer(item: any) {
  return {
    loadBalancingRules: !item["loadBalancingRules"]
      ? item["loadBalancingRules"]
      : subResourceArrayDeserializer(item["loadBalancingRules"]),
    protocol: item["protocol"],
    port: item["port"],
    intervalInSeconds: item["intervalInSeconds"],
    noHealthyBackendsBehavior: item["noHealthyBackendsBehavior"],
    numberOfProbes: item["numberOfProbes"],
    probeThreshold: item["probeThreshold"],
    requestPath: item["requestPath"],
    provisioningState: item["provisioningState"],
  };
}

export function _inboundNatPoolPropertiesSerializer(item: InboundNatPool): any {
  return {
    frontendIPConfiguration: !item["frontendIPConfiguration"]
      ? item["frontendIPConfiguration"]
      : subResourceSerializer(item["frontendIPConfiguration"]),
    protocol: item["protocol"],
    frontendPortRangeStart: item["frontendPortRangeStart"],
    frontendPortRangeEnd: item["frontendPortRangeEnd"],
    backendPort: item["backendPort"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    enableFloatingIP: item["enableFloatingIP"],
    enableTcpReset: item["enableTcpReset"],
  };
}

export function _inboundNatPoolPropertiesDeserializer(item: any) {
  return {
    frontendIPConfiguration: !item["frontendIPConfiguration"]
      ? item["frontendIPConfiguration"]
      : subResourceDeserializer(item["frontendIPConfiguration"]),
    protocol: item["protocol"],
    frontendPortRangeStart: item["frontendPortRangeStart"],
    frontendPortRangeEnd: item["frontendPortRangeEnd"],
    backendPort: item["backendPort"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    enableFloatingIP: item["enableFloatingIP"],
    enableTcpReset: item["enableTcpReset"],
    provisioningState: item["provisioningState"],
  };
}

export function _outboundRulePropertiesSerializer(item: OutboundRule): any {
  return {
    allocatedOutboundPorts: item["allocatedOutboundPorts"],
    frontendIPConfigurations: !item["frontendIPConfigurations"]
      ? item["frontendIPConfigurations"]
      : subResourceArraySerializer(item["frontendIPConfigurations"]),
    backendAddressPool: !item["backendAddressPool"]
      ? item["backendAddressPool"]
      : subResourceSerializer(item["backendAddressPool"]),
    protocol: item["protocol"],
    enableTcpReset: item["enableTcpReset"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
  };
}

export function _outboundRulePropertiesDeserializer(item: any) {
  return {
    allocatedOutboundPorts: item["allocatedOutboundPorts"],
    frontendIPConfigurations: !item["frontendIPConfigurations"]
      ? item["frontendIPConfigurations"]
      : subResourceArrayDeserializer(item["frontendIPConfigurations"]),
    backendAddressPool: !item["backendAddressPool"]
      ? item["backendAddressPool"]
      : subResourceDeserializer(item["backendAddressPool"]),
    provisioningState: item["provisioningState"],
    protocol: item["protocol"],
    enableTcpReset: item["enableTcpReset"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
  };
}

export function _loadBalancerPropertiesSerializer(item: LoadBalancer): any {
  return {
    frontendIPConfigurations: !item["frontendIPConfigurations"]
      ? item["frontendIPConfigurations"]
      : frontendIPConfigurationArraySerializer(item["frontendIPConfigurations"]),
    backendAddressPools: !item["backendAddressPools"]
      ? item["backendAddressPools"]
      : backendAddressPoolArraySerializer(item["backendAddressPools"]),
    loadBalancingRules: !item["loadBalancingRules"]
      ? item["loadBalancingRules"]
      : loadBalancingRuleArraySerializer(item["loadBalancingRules"]),
    probes: !item["probes"] ? item["probes"] : probeArraySerializer(item["probes"]),
    inboundNatRules: !item["inboundNatRules"]
      ? item["inboundNatRules"]
      : inboundNatRuleArraySerializer(item["inboundNatRules"]),
    inboundNatPools: !item["inboundNatPools"]
      ? item["inboundNatPools"]
      : inboundNatPoolArraySerializer(item["inboundNatPools"]),
    outboundRules: !item["outboundRules"]
      ? item["outboundRules"]
      : outboundRuleArraySerializer(item["outboundRules"]),
    scope: item["scope"],
  };
}

export function _loadBalancerPropertiesDeserializer(item: any) {
  return {
    frontendIPConfigurations: !item["frontendIPConfigurations"]
      ? item["frontendIPConfigurations"]
      : frontendIPConfigurationArrayDeserializer(item["frontendIPConfigurations"]),
    backendAddressPools: !item["backendAddressPools"]
      ? item["backendAddressPools"]
      : backendAddressPoolArrayDeserializer(item["backendAddressPools"]),
    loadBalancingRules: !item["loadBalancingRules"]
      ? item["loadBalancingRules"]
      : loadBalancingRuleArrayDeserializer(item["loadBalancingRules"]),
    probes: !item["probes"] ? item["probes"] : probeArrayDeserializer(item["probes"]),
    inboundNatRules: !item["inboundNatRules"]
      ? item["inboundNatRules"]
      : inboundNatRuleArrayDeserializer(item["inboundNatRules"]),
    inboundNatPools: !item["inboundNatPools"]
      ? item["inboundNatPools"]
      : inboundNatPoolArrayDeserializer(item["inboundNatPools"]),
    outboundRules: !item["outboundRules"]
      ? item["outboundRules"]
      : outboundRuleArrayDeserializer(item["outboundRules"]),
    resourceGuid: item["resourceGuid"],
    provisioningState: item["provisioningState"],
    scope: item["scope"],
  };
}

export function _networkWatcherPropertiesSerializer(_item: NetworkWatcher): any {
  return {};
}

export function _networkWatcherPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
  };
}

export function _virtualNetworkPeeringPropertiesSerializer(item: VirtualNetworkPeering): any {
  return {
    allowVirtualNetworkAccess: item["allowVirtualNetworkAccess"],
    allowForwardedTraffic: item["allowForwardedTraffic"],
    allowGatewayTransit: item["allowGatewayTransit"],
    useRemoteGateways: item["useRemoteGateways"],
    remoteVirtualNetwork: !item["remoteVirtualNetwork"]
      ? item["remoteVirtualNetwork"]
      : subResourceSerializer(item["remoteVirtualNetwork"]),
    localAddressSpace: !item["localAddressSpace"]
      ? item["localAddressSpace"]
      : addressSpaceSerializer(item["localAddressSpace"]),
    localVirtualNetworkAddressSpace: !item["localVirtualNetworkAddressSpace"]
      ? item["localVirtualNetworkAddressSpace"]
      : addressSpaceSerializer(item["localVirtualNetworkAddressSpace"]),
    remoteAddressSpace: !item["remoteAddressSpace"]
      ? item["remoteAddressSpace"]
      : addressSpaceSerializer(item["remoteAddressSpace"]),
    remoteVirtualNetworkAddressSpace: !item["remoteVirtualNetworkAddressSpace"]
      ? item["remoteVirtualNetworkAddressSpace"]
      : addressSpaceSerializer(item["remoteVirtualNetworkAddressSpace"]),
    remoteBgpCommunities: !item["remoteBgpCommunities"]
      ? item["remoteBgpCommunities"]
      : virtualNetworkBgpCommunitiesSerializer(item["remoteBgpCommunities"]),
    peeringState: item["peeringState"],
    peeringSyncLevel: item["peeringSyncLevel"],
    doNotVerifyRemoteGateways: item["doNotVerifyRemoteGateways"],
    peerCompleteVnets: item["peerCompleteVnets"],
    enableOnlyIPv6Peering: item["enableOnlyIPv6Peering"],
    localSubnetNames: !item["localSubnetNames"]
      ? item["localSubnetNames"]
      : item["localSubnetNames"].map((p: any) => {
          return p;
        }),
    remoteSubnetNames: !item["remoteSubnetNames"]
      ? item["remoteSubnetNames"]
      : item["remoteSubnetNames"].map((p: any) => {
          return p;
        }),
  };
}

export function _virtualNetworkPeeringPropertiesDeserializer(item: any) {
  return {
    allowVirtualNetworkAccess: item["allowVirtualNetworkAccess"],
    allowForwardedTraffic: item["allowForwardedTraffic"],
    allowGatewayTransit: item["allowGatewayTransit"],
    useRemoteGateways: item["useRemoteGateways"],
    remoteVirtualNetwork: !item["remoteVirtualNetwork"]
      ? item["remoteVirtualNetwork"]
      : subResourceDeserializer(item["remoteVirtualNetwork"]),
    localAddressSpace: !item["localAddressSpace"]
      ? item["localAddressSpace"]
      : addressSpaceDeserializer(item["localAddressSpace"]),
    localVirtualNetworkAddressSpace: !item["localVirtualNetworkAddressSpace"]
      ? item["localVirtualNetworkAddressSpace"]
      : addressSpaceDeserializer(item["localVirtualNetworkAddressSpace"]),
    remoteAddressSpace: !item["remoteAddressSpace"]
      ? item["remoteAddressSpace"]
      : addressSpaceDeserializer(item["remoteAddressSpace"]),
    remoteVirtualNetworkAddressSpace: !item["remoteVirtualNetworkAddressSpace"]
      ? item["remoteVirtualNetworkAddressSpace"]
      : addressSpaceDeserializer(item["remoteVirtualNetworkAddressSpace"]),
    remoteBgpCommunities: !item["remoteBgpCommunities"]
      ? item["remoteBgpCommunities"]
      : virtualNetworkBgpCommunitiesDeserializer(item["remoteBgpCommunities"]),
    remoteVirtualNetworkEncryption: !item["remoteVirtualNetworkEncryption"]
      ? item["remoteVirtualNetworkEncryption"]
      : virtualNetworkEncryptionDeserializer(item["remoteVirtualNetworkEncryption"]),
    peeringState: item["peeringState"],
    peeringSyncLevel: item["peeringSyncLevel"],
    provisioningState: item["provisioningState"],
    doNotVerifyRemoteGateways: item["doNotVerifyRemoteGateways"],
    resourceGuid: item["resourceGuid"],
    peerCompleteVnets: item["peerCompleteVnets"],
    enableOnlyIPv6Peering: item["enableOnlyIPv6Peering"],
    localSubnetNames: !item["localSubnetNames"]
      ? item["localSubnetNames"]
      : item["localSubnetNames"].map((p: any) => {
          return p;
        }),
    remoteSubnetNames: !item["remoteSubnetNames"]
      ? item["remoteSubnetNames"]
      : item["remoteSubnetNames"].map((p: any) => {
          return p;
        }),
  };
}

export function _virtualNetworkPropertiesSerializer(item: VirtualNetwork): any {
  return {
    addressSpace: !item["addressSpace"]
      ? item["addressSpace"]
      : addressSpaceSerializer(item["addressSpace"]),
    dhcpOptions: !item["dhcpOptions"]
      ? item["dhcpOptions"]
      : dhcpOptionsSerializer(item["dhcpOptions"]),
    flowTimeoutInMinutes: item["flowTimeoutInMinutes"],
    subnets: !item["subnets"] ? item["subnets"] : subnetArraySerializer(item["subnets"]),
    virtualNetworkPeerings: !item["virtualNetworkPeerings"]
      ? item["virtualNetworkPeerings"]
      : virtualNetworkPeeringArraySerializer(item["virtualNetworkPeerings"]),
    enableDdosProtection: item["enableDdosProtection"],
    enableVmProtection: item["enableVmProtection"],
    ddosProtectionPlan: !item["ddosProtectionPlan"]
      ? item["ddosProtectionPlan"]
      : subResourceSerializer(item["ddosProtectionPlan"]),
    bgpCommunities: !item["bgpCommunities"]
      ? item["bgpCommunities"]
      : virtualNetworkBgpCommunitiesSerializer(item["bgpCommunities"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : virtualNetworkEncryptionSerializer(item["encryption"]),
    ipAllocations: !item["ipAllocations"]
      ? item["ipAllocations"]
      : subResourceArraySerializer(item["ipAllocations"]),
    privateEndpointVNetPolicies: item["privateEndpointVNetPolicies"],
  };
}

export function _virtualNetworkPropertiesDeserializer(item: any) {
  return {
    addressSpace: !item["addressSpace"]
      ? item["addressSpace"]
      : addressSpaceDeserializer(item["addressSpace"]),
    dhcpOptions: !item["dhcpOptions"]
      ? item["dhcpOptions"]
      : dhcpOptionsDeserializer(item["dhcpOptions"]),
    flowTimeoutInMinutes: item["flowTimeoutInMinutes"],
    subnets: !item["subnets"] ? item["subnets"] : subnetArrayDeserializer(item["subnets"]),
    virtualNetworkPeerings: !item["virtualNetworkPeerings"]
      ? item["virtualNetworkPeerings"]
      : virtualNetworkPeeringArrayDeserializer(item["virtualNetworkPeerings"]),
    resourceGuid: item["resourceGuid"],
    provisioningState: item["provisioningState"],
    enableDdosProtection: item["enableDdosProtection"],
    enableVmProtection: item["enableVmProtection"],
    ddosProtectionPlan: !item["ddosProtectionPlan"]
      ? item["ddosProtectionPlan"]
      : subResourceDeserializer(item["ddosProtectionPlan"]),
    bgpCommunities: !item["bgpCommunities"]
      ? item["bgpCommunities"]
      : virtualNetworkBgpCommunitiesDeserializer(item["bgpCommunities"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : virtualNetworkEncryptionDeserializer(item["encryption"]),
    ipAllocations: !item["ipAllocations"]
      ? item["ipAllocations"]
      : subResourceArrayDeserializer(item["ipAllocations"]),
    flowLogs: !item["flowLogs"] ? item["flowLogs"] : flowLogArrayDeserializer(item["flowLogs"]),
    privateEndpointVNetPolicies: item["privateEndpointVNetPolicies"],
    defaultPublicNatGateway: !item["defaultPublicNatGateway"]
      ? item["defaultPublicNatGateway"]
      : subResourceDeserializer(item["defaultPublicNatGateway"]),
  };
}
