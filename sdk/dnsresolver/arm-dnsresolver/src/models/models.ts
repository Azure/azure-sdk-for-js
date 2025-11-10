// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Describes a DNS resolver. */
export interface DnsResolver extends TrackedResource {
  /** Properties of the DNS resolver. */
  properties: DnsResolverProperties;
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
}

export function dnsResolverSerializer(item: DnsResolver): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: dnsResolverPropertiesSerializer(item["properties"]),
  };
}

export function dnsResolverDeserializer(item: any): DnsResolver {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: dnsResolverPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Represents the properties of a DNS resolver. */
export interface DnsResolverProperties {
  /** The reference to the virtual network. This cannot be changed after creation. */
  virtualNetwork: SubResource;
  /** The current status of the DNS resolver. This is a read-only property and any attempt to set this value will be ignored. */
  readonly dnsResolverState?: DnsResolverState;
  /** The current provisioning state of the DNS resolver. This is a read-only property and any attempt to set this value will be ignored. */
  readonly provisioningState?: ProvisioningState;
  /** The resourceGuid property of the DNS resolver resource. */
  readonly resourceGuid?: string;
}

export function dnsResolverPropertiesSerializer(item: DnsResolverProperties): any {
  return { virtualNetwork: subResourceSerializer(item["virtualNetwork"]) };
}

export function dnsResolverPropertiesDeserializer(item: any): DnsResolverProperties {
  return {
    virtualNetwork: subResourceDeserializer(item["virtualNetwork"]),
    dnsResolverState: item["dnsResolverState"],
    provisioningState: item["provisioningState"],
    resourceGuid: item["resourceGuid"],
  };
}

/** Reference to another ARM resource. */
export interface SubResource {
  /** Resource ID. */
  id: string;
}

export function subResourceSerializer(item: SubResource): any {
  return { id: item["id"] };
}

export function subResourceDeserializer(item: any): SubResource {
  return {
    id: item["id"],
  };
}

/** The current status of the DNS resolver. This is a read-only property and any attempt to set this value will be ignored. */
export enum KnownDnsResolverState {
  /** Connected */
  Connected = "Connected",
  /** Disconnected */
  Disconnected = "Disconnected",
}

/**
 * The current status of the DNS resolver. This is a read-only property and any attempt to set this value will be ignored. \
 * {@link KnownDnsResolverState} can be used interchangeably with DnsResolverState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Connected** \
 * **Disconnected**
 */
export type DnsResolverState = string;

/** The current provisioning state of the resource. */
export enum KnownProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * The current provisioning state of the resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled**
 */
export type ProvisioningState = string;

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): any {
  return { tags: item["tags"], location: item["location"] };
}

export function trackedResourceDeserializer(item: any): TrackedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    tags: item["tags"],
    location: item["location"],
  };
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(item: Resource): any {
  return item;
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** An error message */
export interface CloudError {
  /** The error message body */
  error?: CloudErrorBody;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cloudErrorBodyDeserializer(item["error"]),
  };
}

/** The body of an error message */
export interface CloudErrorBody {
  /** The error code */
  code?: string;
  /** A description of what caused the error */
  message?: string;
  /** The target resource of the error message */
  target?: string;
  /** Extra error information */
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

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** Describes a DNS resolver for PATCH operation. */
export interface DnsResolverPatch {
  /** Tags for DNS Resolver. */
  tags?: Record<string, string>;
}

export function dnsResolverPatchSerializer(item: DnsResolverPatch): any {
  return { tags: item["tags"] };
}

/** The response of a DnsResolver list operation. */
export interface _DnsResolverListResult {
  /** The DnsResolver items on this page */
  value: DnsResolver[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dnsResolverListResultDeserializer(item: any): _DnsResolverListResult {
  return {
    value: dnsResolverArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dnsResolverArraySerializer(result: Array<DnsResolver>): any[] {
  return result.map((item) => {
    return dnsResolverSerializer(item);
  });
}

export function dnsResolverArrayDeserializer(result: Array<DnsResolver>): any[] {
  return result.map((item) => {
    return dnsResolverDeserializer(item);
  });
}

/** The response to an enumeration operation on sub-resources. */
export interface _SubResourceListResult {
  /** The SubResource items on this page */
  value: SubResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _subResourceListResultDeserializer(item: any): _SubResourceListResult {
  return {
    value: subResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
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

/** Describes an inbound endpoint for a DNS resolver. */
export interface InboundEndpoint extends TrackedResource {
  /** Properties of the inbound endpoint. */
  properties: InboundEndpointProperties;
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
}

export function inboundEndpointSerializer(item: InboundEndpoint): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: inboundEndpointPropertiesSerializer(item["properties"]),
  };
}

export function inboundEndpointDeserializer(item: any): InboundEndpoint {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: inboundEndpointPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Represents the properties of an inbound endpoint for a DNS resolver. */
export interface InboundEndpointProperties {
  /** IP configurations for the inbound endpoint. */
  ipConfigurations: IpConfiguration[];
  /** The current provisioning state of the inbound endpoint. This is a read-only property and any attempt to set this value will be ignored. */
  readonly provisioningState?: ProvisioningState;
  /** The resourceGuid property of the inbound endpoint resource. */
  readonly resourceGuid?: string;
}

export function inboundEndpointPropertiesSerializer(item: InboundEndpointProperties): any {
  return {
    ipConfigurations: ipConfigurationArraySerializer(item["ipConfigurations"]),
  };
}

export function inboundEndpointPropertiesDeserializer(item: any): InboundEndpointProperties {
  return {
    ipConfigurations: ipConfigurationArrayDeserializer(item["ipConfigurations"]),
    provisioningState: item["provisioningState"],
    resourceGuid: item["resourceGuid"],
  };
}

export function ipConfigurationArraySerializer(result: Array<IpConfiguration>): any[] {
  return result.map((item) => {
    return ipConfigurationSerializer(item);
  });
}

export function ipConfigurationArrayDeserializer(result: Array<IpConfiguration>): any[] {
  return result.map((item) => {
    return ipConfigurationDeserializer(item);
  });
}

/** IP configuration. */
export interface IpConfiguration {
  /** The reference to the subnet bound to the IP configuration. */
  subnet: SubResource;
  /** Private IP address of the IP configuration. */
  privateIpAddress?: string;
  /** Private IP address allocation method. */
  privateIpAllocationMethod?: IpAllocationMethod;
}

export function ipConfigurationSerializer(item: IpConfiguration): any {
  return {
    subnet: subResourceSerializer(item["subnet"]),
    privateIpAddress: item["privateIpAddress"],
    privateIpAllocationMethod: item["privateIpAllocationMethod"],
  };
}

export function ipConfigurationDeserializer(item: any): IpConfiguration {
  return {
    subnet: subResourceDeserializer(item["subnet"]),
    privateIpAddress: item["privateIpAddress"],
    privateIpAllocationMethod: item["privateIpAllocationMethod"],
  };
}

/** Private IP address allocation method. */
export enum KnownIpAllocationMethod {
  /** Static */
  Static = "Static",
  /** Dynamic */
  Dynamic = "Dynamic",
}

/**
 * Private IP address allocation method. \
 * {@link KnownIpAllocationMethod} can be used interchangeably with IpAllocationMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Static** \
 * **Dynamic**
 */
export type IpAllocationMethod = string;

/** Describes an inbound endpoint for a DNS resolver for PATCH operation. */
export interface InboundEndpointPatch {
  /** Tags for inbound endpoint. */
  tags?: Record<string, string>;
}

export function inboundEndpointPatchSerializer(item: InboundEndpointPatch): any {
  return { tags: item["tags"] };
}

/** The response of a InboundEndpoint list operation. */
export interface _InboundEndpointListResult {
  /** The InboundEndpoint items on this page */
  value: InboundEndpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _inboundEndpointListResultDeserializer(item: any): _InboundEndpointListResult {
  return {
    value: inboundEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function inboundEndpointArraySerializer(result: Array<InboundEndpoint>): any[] {
  return result.map((item) => {
    return inboundEndpointSerializer(item);
  });
}

export function inboundEndpointArrayDeserializer(result: Array<InboundEndpoint>): any[] {
  return result.map((item) => {
    return inboundEndpointDeserializer(item);
  });
}

/** Describes an outbound endpoint for a DNS resolver. */
export interface OutboundEndpoint extends TrackedResource {
  /** Properties of the outbound endpoint. */
  properties: OutboundEndpointProperties;
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
}

export function outboundEndpointSerializer(item: OutboundEndpoint): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: outboundEndpointPropertiesSerializer(item["properties"]),
  };
}

export function outboundEndpointDeserializer(item: any): OutboundEndpoint {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: outboundEndpointPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Represents the properties of an outbound endpoint for a DNS resolver. */
export interface OutboundEndpointProperties {
  /** The reference to the subnet used for the outbound endpoint. */
  subnet: SubResource;
  /** The current provisioning state of the outbound endpoint. This is a read-only property and any attempt to set this value will be ignored. */
  readonly provisioningState?: ProvisioningState;
  /** The resourceGuid property of the outbound endpoint resource. */
  readonly resourceGuid?: string;
}

export function outboundEndpointPropertiesSerializer(item: OutboundEndpointProperties): any {
  return { subnet: subResourceSerializer(item["subnet"]) };
}

export function outboundEndpointPropertiesDeserializer(item: any): OutboundEndpointProperties {
  return {
    subnet: subResourceDeserializer(item["subnet"]),
    provisioningState: item["provisioningState"],
    resourceGuid: item["resourceGuid"],
  };
}

/** Describes an outbound endpoint for a DNS resolver for PATCH operation. */
export interface OutboundEndpointPatch {
  /** Tags for outbound endpoint. */
  tags?: Record<string, string>;
}

export function outboundEndpointPatchSerializer(item: OutboundEndpointPatch): any {
  return { tags: item["tags"] };
}

/** The response of a OutboundEndpoint list operation. */
export interface _OutboundEndpointListResult {
  /** The OutboundEndpoint items on this page */
  value: OutboundEndpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _outboundEndpointListResultDeserializer(item: any): _OutboundEndpointListResult {
  return {
    value: outboundEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function outboundEndpointArraySerializer(result: Array<OutboundEndpoint>): any[] {
  return result.map((item) => {
    return outboundEndpointSerializer(item);
  });
}

export function outboundEndpointArrayDeserializer(result: Array<OutboundEndpoint>): any[] {
  return result.map((item) => {
    return outboundEndpointDeserializer(item);
  });
}

/** Describes a DNS forwarding ruleset. */
export interface DnsForwardingRuleset extends TrackedResource {
  /** Properties of the DNS forwarding ruleset. */
  properties: DnsForwardingRulesetProperties;
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
}

export function dnsForwardingRulesetSerializer(item: DnsForwardingRuleset): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: dnsForwardingRulesetPropertiesSerializer(item["properties"]),
  };
}

export function dnsForwardingRulesetDeserializer(item: any): DnsForwardingRuleset {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: dnsForwardingRulesetPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Represents the properties of a DNS forwarding ruleset. */
export interface DnsForwardingRulesetProperties {
  /** The reference to the DNS resolver outbound endpoints that are used to route DNS queries matching the forwarding rules in the ruleset to the target DNS servers. */
  dnsResolverOutboundEndpoints: SubResource[];
  /** The current provisioning state of the DNS forwarding ruleset. This is a read-only property and any attempt to set this value will be ignored. */
  readonly provisioningState?: ProvisioningState;
  /** The resourceGuid for the DNS forwarding ruleset. */
  readonly resourceGuid?: string;
}

export function dnsForwardingRulesetPropertiesSerializer(
  item: DnsForwardingRulesetProperties,
): any {
  return {
    dnsResolverOutboundEndpoints: subResourceArraySerializer(item["dnsResolverOutboundEndpoints"]),
  };
}

export function dnsForwardingRulesetPropertiesDeserializer(
  item: any,
): DnsForwardingRulesetProperties {
  return {
    dnsResolverOutboundEndpoints: subResourceArrayDeserializer(
      item["dnsResolverOutboundEndpoints"],
    ),
    provisioningState: item["provisioningState"],
    resourceGuid: item["resourceGuid"],
  };
}

/** Describes a DNS forwarding ruleset PATCH operation. */
export interface DnsForwardingRulesetPatch {
  /** The reference to the DNS resolver outbound endpoints that are used to route DNS queries matching the forwarding rules in the ruleset to the target DNS servers. */
  dnsResolverOutboundEndpoints?: SubResource[];
  /** Tags for DNS Resolver. */
  tags?: Record<string, string>;
}

export function dnsForwardingRulesetPatchSerializer(item: DnsForwardingRulesetPatch): any {
  return {
    dnsResolverOutboundEndpoints: !item["dnsResolverOutboundEndpoints"]
      ? item["dnsResolverOutboundEndpoints"]
      : subResourceArraySerializer(item["dnsResolverOutboundEndpoints"]),
    tags: item["tags"],
  };
}

/** The response of a DnsForwardingRuleset list operation. */
export interface _DnsForwardingRulesetListResult {
  /** The DnsForwardingRuleset items on this page */
  value: DnsForwardingRuleset[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dnsForwardingRulesetListResultDeserializer(
  item: any,
): _DnsForwardingRulesetListResult {
  return {
    value: dnsForwardingRulesetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dnsForwardingRulesetArraySerializer(result: Array<DnsForwardingRuleset>): any[] {
  return result.map((item) => {
    return dnsForwardingRulesetSerializer(item);
  });
}

export function dnsForwardingRulesetArrayDeserializer(result: Array<DnsForwardingRuleset>): any[] {
  return result.map((item) => {
    return dnsForwardingRulesetDeserializer(item);
  });
}

/** The response to an enumeration operation on Virtual Network DNS Forwarding Ruleset. */
export interface _VirtualNetworkDnsForwardingRulesetListResult {
  /** The VirtualNetworkDnsForwardingRuleset items on this page */
  value: VirtualNetworkDnsForwardingRuleset[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualNetworkDnsForwardingRulesetListResultDeserializer(
  item: any,
): _VirtualNetworkDnsForwardingRulesetListResult {
  return {
    value: virtualNetworkDnsForwardingRulesetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualNetworkDnsForwardingRulesetArrayDeserializer(
  result: Array<VirtualNetworkDnsForwardingRuleset>,
): any[] {
  return result.map((item) => {
    return virtualNetworkDnsForwardingRulesetDeserializer(item);
  });
}

/** Reference to DNS forwarding ruleset and associated virtual network link. */
export interface VirtualNetworkDnsForwardingRuleset {
  /** DNS Forwarding Ruleset Resource ID. */
  id?: string;
  /** Properties of the virtual network link sub-resource reference. */
  properties?: VirtualNetworkLinkSubResourceProperties;
}

export function virtualNetworkDnsForwardingRulesetDeserializer(
  item: any,
): VirtualNetworkDnsForwardingRuleset {
  return {
    id: item["id"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualNetworkLinkSubResourcePropertiesDeserializer(item["properties"]),
  };
}

/** The reference to the virtual network link that associates between the DNS forwarding ruleset and virtual network. */
export interface VirtualNetworkLinkSubResourceProperties {
  /** The reference to the virtual network link. */
  virtualNetworkLink?: SubResource;
}

export function virtualNetworkLinkSubResourcePropertiesDeserializer(
  item: any,
): VirtualNetworkLinkSubResourceProperties {
  return {
    virtualNetworkLink: !item["virtualNetworkLink"]
      ? item["virtualNetworkLink"]
      : subResourceDeserializer(item["virtualNetworkLink"]),
  };
}

/** Describes a forwarding rule within a DNS forwarding ruleset. */
export interface ForwardingRule extends ProxyResource {
  /** Properties of the forwarding rule. */
  properties: ForwardingRuleProperties;
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
}

export function forwardingRuleSerializer(item: ForwardingRule): any {
  return { properties: forwardingRulePropertiesSerializer(item["properties"]) };
}

export function forwardingRuleDeserializer(item: any): ForwardingRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: forwardingRulePropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Represents the properties of a forwarding rule within a DNS forwarding ruleset. */
export interface ForwardingRuleProperties {
  /** The domain name for the forwarding rule. */
  domainName: string;
  /** DNS servers to forward the DNS query to. */
  targetDnsServers: TargetDnsServer[];
  /** Metadata attached to the forwarding rule. */
  metadata?: Record<string, string>;
  /** The state of forwarding rule. */
  forwardingRuleState?: ForwardingRuleState;
  /** The current provisioning state of the forwarding rule. This is a read-only property and any attempt to set this value will be ignored. */
  readonly provisioningState?: ProvisioningState;
}

export function forwardingRulePropertiesSerializer(item: ForwardingRuleProperties): any {
  return {
    domainName: item["domainName"],
    targetDnsServers: targetDnsServerArraySerializer(item["targetDnsServers"]),
    metadata: item["metadata"],
    forwardingRuleState: item["forwardingRuleState"],
  };
}

export function forwardingRulePropertiesDeserializer(item: any): ForwardingRuleProperties {
  return {
    domainName: item["domainName"],
    targetDnsServers: targetDnsServerArrayDeserializer(item["targetDnsServers"]),
    metadata: item["metadata"],
    forwardingRuleState: item["forwardingRuleState"],
    provisioningState: item["provisioningState"],
  };
}

export function targetDnsServerArraySerializer(result: Array<TargetDnsServer>): any[] {
  return result.map((item) => {
    return targetDnsServerSerializer(item);
  });
}

export function targetDnsServerArrayDeserializer(result: Array<TargetDnsServer>): any[] {
  return result.map((item) => {
    return targetDnsServerDeserializer(item);
  });
}

/** Describes a server to forward the DNS queries to. */
export interface TargetDnsServer {
  /** DNS server IP address. */
  ipAddress: string;
  /** DNS server port. */
  port?: number;
}

export function targetDnsServerSerializer(item: TargetDnsServer): any {
  return { ipAddress: item["ipAddress"], port: item["port"] };
}

export function targetDnsServerDeserializer(item: any): TargetDnsServer {
  return {
    ipAddress: item["ipAddress"],
    port: item["port"],
  };
}

/** The state of forwarding rule. */
export enum KnownForwardingRuleState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * The state of forwarding rule. \
 * {@link KnownForwardingRuleState} can be used interchangeably with ForwardingRuleState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type ForwardingRuleState = string;

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource): any {
  return item;
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Describes a forwarding rule for PATCH operation. */
export interface ForwardingRulePatch {
  /** Updatable properties of the forwarding rule. */
  properties?: ForwardingRulePatchProperties;
}

export function forwardingRulePatchSerializer(item: ForwardingRulePatch): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : forwardingRulePatchPropertiesSerializer(item["properties"]),
  };
}

/** Represents the updatable properties of a forwarding rule within a DNS forwarding ruleset. */
export interface ForwardingRulePatchProperties {
  /** DNS servers to forward the DNS query to. */
  targetDnsServers?: TargetDnsServer[];
  /** Metadata attached to the forwarding rule. */
  metadata?: Record<string, string>;
  /** The state of forwarding rule. */
  forwardingRuleState?: ForwardingRuleState;
}

export function forwardingRulePatchPropertiesSerializer(item: ForwardingRulePatchProperties): any {
  return {
    targetDnsServers: !item["targetDnsServers"]
      ? item["targetDnsServers"]
      : targetDnsServerArraySerializer(item["targetDnsServers"]),
    metadata: item["metadata"],
    forwardingRuleState: item["forwardingRuleState"],
  };
}

/** The response of a ForwardingRule list operation. */
export interface _ForwardingRuleListResult {
  /** The ForwardingRule items on this page */
  value: ForwardingRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _forwardingRuleListResultDeserializer(item: any): _ForwardingRuleListResult {
  return {
    value: forwardingRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function forwardingRuleArraySerializer(result: Array<ForwardingRule>): any[] {
  return result.map((item) => {
    return forwardingRuleSerializer(item);
  });
}

export function forwardingRuleArrayDeserializer(result: Array<ForwardingRule>): any[] {
  return result.map((item) => {
    return forwardingRuleDeserializer(item);
  });
}

/** Describes a virtual network link. */
export interface VirtualNetworkLink extends ProxyResource {
  /** Properties of the virtual network link. */
  properties: VirtualNetworkLinkProperties;
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
}

export function virtualNetworkLinkSerializer(item: VirtualNetworkLink): any {
  return {
    properties: virtualNetworkLinkPropertiesSerializer(item["properties"]),
  };
}

export function virtualNetworkLinkDeserializer(item: any): VirtualNetworkLink {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: virtualNetworkLinkPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Represents the properties of a virtual network link. */
export interface VirtualNetworkLinkProperties {
  /** The reference to the virtual network. This cannot be changed after creation. */
  virtualNetwork: SubResource;
  /** Metadata attached to the virtual network link. */
  metadata?: Record<string, string>;
  /** The current provisioning state of the virtual network link. This is a read-only property and any attempt to set this value will be ignored. */
  readonly provisioningState?: ProvisioningState;
}

export function virtualNetworkLinkPropertiesSerializer(item: VirtualNetworkLinkProperties): any {
  return {
    virtualNetwork: subResourceSerializer(item["virtualNetwork"]),
    metadata: item["metadata"],
  };
}

export function virtualNetworkLinkPropertiesDeserializer(item: any): VirtualNetworkLinkProperties {
  return {
    virtualNetwork: subResourceDeserializer(item["virtualNetwork"]),
    metadata: item["metadata"],
    provisioningState: item["provisioningState"],
  };
}

/** Describes a virtual network link for PATCH operation. */
export interface VirtualNetworkLinkPatch {
  /** Updatable properties of the virtual network link. */
  properties?: VirtualNetworkLinkPatchProperties;
}

export function virtualNetworkLinkPatchSerializer(item: VirtualNetworkLinkPatch): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : virtualNetworkLinkPatchPropertiesSerializer(item["properties"]),
  };
}

/** Represents the updatable properties of the virtual network link. */
export interface VirtualNetworkLinkPatchProperties {
  /** Metadata attached to the virtual network link. */
  metadata?: Record<string, string>;
}

export function virtualNetworkLinkPatchPropertiesSerializer(
  item: VirtualNetworkLinkPatchProperties,
): any {
  return { metadata: item["metadata"] };
}

/** The response of a VirtualNetworkLink list operation. */
export interface _VirtualNetworkLinkListResult {
  /** The VirtualNetworkLink items on this page */
  value: VirtualNetworkLink[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualNetworkLinkListResultDeserializer(
  item: any,
): _VirtualNetworkLinkListResult {
  return {
    value: virtualNetworkLinkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualNetworkLinkArraySerializer(result: Array<VirtualNetworkLink>): any[] {
  return result.map((item) => {
    return virtualNetworkLinkSerializer(item);
  });
}

export function virtualNetworkLinkArrayDeserializer(result: Array<VirtualNetworkLink>): any[] {
  return result.map((item) => {
    return virtualNetworkLinkDeserializer(item);
  });
}

/** Describes a DNS resolver policy. */
export interface DnsResolverPolicy extends TrackedResource {
  /** Properties of the DNS resolver policy. */
  properties?: DnsResolverPolicyProperties;
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
}

export function dnsResolverPolicySerializer(item: DnsResolverPolicy): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : dnsResolverPolicyPropertiesSerializer(item["properties"]),
  };
}

export function dnsResolverPolicyDeserializer(item: any): DnsResolverPolicy {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dnsResolverPolicyPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Represents the properties of a DNS resolver policy. */
export interface DnsResolverPolicyProperties {
  /** The current provisioning state of the DNS resolver policy. This is a read-only property and any attempt to set this value will be ignored. */
  readonly provisioningState?: ProvisioningState;
  /** The resourceGuid property of the DNS resolver policy resource. */
  readonly resourceGuid?: string;
}

export function dnsResolverPolicyPropertiesSerializer(item: DnsResolverPolicyProperties): any {
  return item;
}

export function dnsResolverPolicyPropertiesDeserializer(item: any): DnsResolverPolicyProperties {
  return {
    provisioningState: item["provisioningState"],
    resourceGuid: item["resourceGuid"],
  };
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** Describes a DNS resolver policy for PATCH operation. */
export interface DnsResolverPolicyPatch {
  /** Tags for DNS resolver policy. */
  tags?: Record<string, string>;
}

export function dnsResolverPolicyPatchSerializer(item: DnsResolverPolicyPatch): any {
  return { tags: item["tags"] };
}

/** The response of a DnsResolverPolicy list operation. */
export interface _DnsResolverPolicyListResult {
  /** The DnsResolverPolicy items on this page */
  value: DnsResolverPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dnsResolverPolicyListResultDeserializer(item: any): _DnsResolverPolicyListResult {
  return {
    value: dnsResolverPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dnsResolverPolicyArraySerializer(result: Array<DnsResolverPolicy>): any[] {
  return result.map((item) => {
    return dnsResolverPolicySerializer(item);
  });
}

export function dnsResolverPolicyArrayDeserializer(result: Array<DnsResolverPolicy>): any[] {
  return result.map((item) => {
    return dnsResolverPolicyDeserializer(item);
  });
}

/** Describes a DNS security rule. */
export interface DnsSecurityRule extends TrackedResource {
  /** Properties of the DNS security rule. */
  properties: DnsSecurityRuleProperties;
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
}

export function dnsSecurityRuleSerializer(item: DnsSecurityRule): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: dnsSecurityRulePropertiesSerializer(item["properties"]),
  };
}

export function dnsSecurityRuleDeserializer(item: any): DnsSecurityRule {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: dnsSecurityRulePropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Represents the properties of a DNS security rule. */
export interface DnsSecurityRuleProperties {
  /** The priority of the DNS security rule. */
  priority: number;
  /** The action to take on DNS requests that match the DNS security rule. */
  action: DnsSecurityRuleAction;
  /** DNS resolver policy domains lists that the DNS security rule applies to. */
  dnsResolverDomainLists?: SubResource[];
  /** Managed domain lists that the DNS security rule applies to. */
  managedDomainLists?: ManagedDomainList[];
  /** The state of DNS security rule. */
  dnsSecurityRuleState?: DnsSecurityRuleState;
  /** The current provisioning state of the DNS security rule. This is a read-only property and any attempt to set this value will be ignored. */
  readonly provisioningState?: ProvisioningState;
}

export function dnsSecurityRulePropertiesSerializer(item: DnsSecurityRuleProperties): any {
  return {
    priority: item["priority"],
    action: dnsSecurityRuleActionSerializer(item["action"]),
    dnsResolverDomainLists: !item["dnsResolverDomainLists"]
      ? item["dnsResolverDomainLists"]
      : subResourceArraySerializer(item["dnsResolverDomainLists"]),
    managedDomainLists: !item["managedDomainLists"]
      ? item["managedDomainLists"]
      : item["managedDomainLists"].map((p: any) => {
          return p;
        }),
    dnsSecurityRuleState: item["dnsSecurityRuleState"],
  };
}

export function dnsSecurityRulePropertiesDeserializer(item: any): DnsSecurityRuleProperties {
  return {
    priority: item["priority"],
    action: dnsSecurityRuleActionDeserializer(item["action"]),
    dnsResolverDomainLists: !item["dnsResolverDomainLists"]
      ? item["dnsResolverDomainLists"]
      : subResourceArrayDeserializer(item["dnsResolverDomainLists"]),
    managedDomainLists: !item["managedDomainLists"]
      ? item["managedDomainLists"]
      : item["managedDomainLists"].map((p: any) => {
          return p;
        }),
    dnsSecurityRuleState: item["dnsSecurityRuleState"],
    provisioningState: item["provisioningState"],
  };
}

/** The action to take on DNS requests that match the DNS security rule. */
export interface DnsSecurityRuleAction {
  /** The type of action to take. */
  actionType?: ActionType;
}

export function dnsSecurityRuleActionSerializer(item: DnsSecurityRuleAction): any {
  return { actionType: item["actionType"] };
}

export function dnsSecurityRuleActionDeserializer(item: any): DnsSecurityRuleAction {
  return {
    actionType: item["actionType"],
  };
}

/** The type of action to take. */
export enum KnownActionType {
  /** Allow */
  Allow = "Allow",
  /** Alert */
  Alert = "Alert",
  /** Block */
  Block = "Block",
}

/**
 * The type of action to take. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow** \
 * **Alert** \
 * **Block**
 */
export type ActionType = string;

/** Describes Managed Domain List options for DNS security rules. */
export enum KnownManagedDomainList {
  /** Domain list managed by Azure DNS Threat Intelligence. */
  AzureDnsThreatIntel = "AzureDnsThreatIntel",
}

/**
 * Describes Managed Domain List options for DNS security rules. \
 * {@link KnownManagedDomainList} can be used interchangeably with ManagedDomainList,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureDnsThreatIntel**: Domain list managed by Azure DNS Threat Intelligence.
 */
export type ManagedDomainList = string;

/** The state of DNS security rule. */
export enum KnownDnsSecurityRuleState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * The state of DNS security rule. \
 * {@link KnownDnsSecurityRuleState} can be used interchangeably with DnsSecurityRuleState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type DnsSecurityRuleState = string;

/** Describes a DNS security rule for PATCH operation. */
export interface DnsSecurityRulePatch {
  /** Updatable properties of the DNS security rule. */
  properties?: DnsSecurityRulePatchProperties;
  /** Tags for DNS security rule. */
  tags?: Record<string, string>;
}

export function dnsSecurityRulePatchSerializer(item: DnsSecurityRulePatch): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : dnsSecurityRulePatchPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** Represents the updatable properties of a DNS security rule. */
export interface DnsSecurityRulePatchProperties {
  /** The action to take on DNS requests that match the DNS security rule. */
  action?: DnsSecurityRuleAction;
  /** DNS resolver policy domains lists that the DNS security rule applies to. */
  dnsResolverDomainLists?: SubResource[];
  /** Managed domain lists that the DNS security rule applies to. */
  managedDomainLists?: ManagedDomainList[];
  /** The state of DNS security rule. */
  dnsSecurityRuleState?: DnsSecurityRuleState;
  /** The priority of the DNS security rule. */
  priority?: number;
}

export function dnsSecurityRulePatchPropertiesSerializer(
  item: DnsSecurityRulePatchProperties,
): any {
  return {
    action: !item["action"] ? item["action"] : dnsSecurityRuleActionSerializer(item["action"]),
    dnsResolverDomainLists: !item["dnsResolverDomainLists"]
      ? item["dnsResolverDomainLists"]
      : subResourceArraySerializer(item["dnsResolverDomainLists"]),
    managedDomainLists: !item["managedDomainLists"]
      ? item["managedDomainLists"]
      : item["managedDomainLists"].map((p: any) => {
          return p;
        }),
    dnsSecurityRuleState: item["dnsSecurityRuleState"],
    priority: item["priority"],
  };
}

/** The response of a DnsSecurityRule list operation. */
export interface _DnsSecurityRuleListResult {
  /** The DnsSecurityRule items on this page */
  value: DnsSecurityRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dnsSecurityRuleListResultDeserializer(item: any): _DnsSecurityRuleListResult {
  return {
    value: dnsSecurityRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dnsSecurityRuleArraySerializer(result: Array<DnsSecurityRule>): any[] {
  return result.map((item) => {
    return dnsSecurityRuleSerializer(item);
  });
}

export function dnsSecurityRuleArrayDeserializer(result: Array<DnsSecurityRule>): any[] {
  return result.map((item) => {
    return dnsSecurityRuleDeserializer(item);
  });
}

/** Describes a DNS resolver policy virtual network link. */
export interface DnsResolverPolicyVirtualNetworkLink extends TrackedResource {
  /** Properties of the DNS resolver policy virtual network link. */
  properties: DnsResolverPolicyVirtualNetworkLinkProperties;
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
}

export function dnsResolverPolicyVirtualNetworkLinkSerializer(
  item: DnsResolverPolicyVirtualNetworkLink,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: dnsResolverPolicyVirtualNetworkLinkPropertiesSerializer(item["properties"]),
  };
}

export function dnsResolverPolicyVirtualNetworkLinkDeserializer(
  item: any,
): DnsResolverPolicyVirtualNetworkLink {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: dnsResolverPolicyVirtualNetworkLinkPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Represents the properties of a DNS resolver policy virtual network link. */
export interface DnsResolverPolicyVirtualNetworkLinkProperties {
  /** The reference to the virtual network. This cannot be changed after creation. */
  virtualNetwork: SubResource;
  /** The current provisioning state of the DNS resolver policy virtual network link. This is a read-only property and any attempt to set this value will be ignored. */
  readonly provisioningState?: ProvisioningState;
}

export function dnsResolverPolicyVirtualNetworkLinkPropertiesSerializer(
  item: DnsResolverPolicyVirtualNetworkLinkProperties,
): any {
  return { virtualNetwork: subResourceSerializer(item["virtualNetwork"]) };
}

export function dnsResolverPolicyVirtualNetworkLinkPropertiesDeserializer(
  item: any,
): DnsResolverPolicyVirtualNetworkLinkProperties {
  return {
    virtualNetwork: subResourceDeserializer(item["virtualNetwork"]),
    provisioningState: item["provisioningState"],
  };
}

/** Describes a DNS resolver policy virtual network link for PATCH operation. */
export interface DnsResolverPolicyVirtualNetworkLinkPatch {
  /** Tags for the DNS resolver policy virtual network link. */
  tags?: Record<string, string>;
}

export function dnsResolverPolicyVirtualNetworkLinkPatchSerializer(
  item: DnsResolverPolicyVirtualNetworkLinkPatch,
): any {
  return { tags: item["tags"] };
}

/** The response of a DnsResolverPolicyVirtualNetworkLink list operation. */
export interface _DnsResolverPolicyVirtualNetworkLinkListResult {
  /** The DnsResolverPolicyVirtualNetworkLink items on this page */
  value: DnsResolverPolicyVirtualNetworkLink[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dnsResolverPolicyVirtualNetworkLinkListResultDeserializer(
  item: any,
): _DnsResolverPolicyVirtualNetworkLinkListResult {
  return {
    value: dnsResolverPolicyVirtualNetworkLinkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dnsResolverPolicyVirtualNetworkLinkArraySerializer(
  result: Array<DnsResolverPolicyVirtualNetworkLink>,
): any[] {
  return result.map((item) => {
    return dnsResolverPolicyVirtualNetworkLinkSerializer(item);
  });
}

export function dnsResolverPolicyVirtualNetworkLinkArrayDeserializer(
  result: Array<DnsResolverPolicyVirtualNetworkLink>,
): any[] {
  return result.map((item) => {
    return dnsResolverPolicyVirtualNetworkLinkDeserializer(item);
  });
}

/** Describes a DNS resolver domain list. */
export interface DnsResolverDomainList extends TrackedResource {
  /** Properties of the DNS resolver domain list. */
  properties?: DnsResolverDomainListProperties;
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
}

export function dnsResolverDomainListSerializer(item: DnsResolverDomainList): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : dnsResolverDomainListPropertiesSerializer(item["properties"]),
  };
}

export function dnsResolverDomainListDeserializer(item: any): DnsResolverDomainList {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dnsResolverDomainListPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Represents the properties of a DNS resolver domain list. */
export interface DnsResolverDomainListProperties {
  /** The domains in the domain list. Will be null if user is using large domain list. */
  domains?: string[];
  /** The URL for bulk upload or download for domain lists containing larger set of domains. This will be populated if domains is empty or null. */
  readonly domainsUrl?: string;
  /** The current provisioning state of the DNS resolver domain list. This is a read-only property and any attempt to set this value will be ignored. */
  readonly provisioningState?: ProvisioningState;
  /** The resourceGuid property of the DNS resolver domain list resource. */
  readonly resourceGuid?: string;
}

export function dnsResolverDomainListPropertiesSerializer(
  item: DnsResolverDomainListProperties,
): any {
  return {
    domains: !item["domains"]
      ? item["domains"]
      : item["domains"].map((p: any) => {
          return p;
        }),
  };
}

export function dnsResolverDomainListPropertiesDeserializer(
  item: any,
): DnsResolverDomainListProperties {
  return {
    domains: !item["domains"]
      ? item["domains"]
      : item["domains"].map((p: any) => {
          return p;
        }),
    domainsUrl: item["domainsUrl"],
    provisioningState: item["provisioningState"],
    resourceGuid: item["resourceGuid"],
  };
}

/** Describes a DNS resolver domain list for PATCH operation. */
export interface DnsResolverDomainListPatch {
  /** Updatable properties of the DNS resolver domain list. */
  properties?: DnsResolverDomainListPatchProperties;
  /** Tags for DNS resolver domain list. */
  tags?: Record<string, string>;
}

export function dnsResolverDomainListPatchSerializer(item: DnsResolverDomainListPatch): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : dnsResolverDomainListPatchPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** Represents the updatable properties of a DNS resolver domain list. */
export interface DnsResolverDomainListPatchProperties {
  /** The domains in the domain list. */
  domains?: string[];
}

export function dnsResolverDomainListPatchPropertiesSerializer(
  item: DnsResolverDomainListPatchProperties,
): any {
  return {
    domains: !item["domains"]
      ? item["domains"]
      : item["domains"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a DnsResolverDomainList list operation. */
export interface _DnsResolverDomainListListResult {
  /** The DnsResolverDomainList items on this page */
  value: DnsResolverDomainList[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dnsResolverDomainListListResultDeserializer(
  item: any,
): _DnsResolverDomainListListResult {
  return {
    value: dnsResolverDomainListArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dnsResolverDomainListArraySerializer(result: Array<DnsResolverDomainList>): any[] {
  return result.map((item) => {
    return dnsResolverDomainListSerializer(item);
  });
}

export function dnsResolverDomainListArrayDeserializer(
  result: Array<DnsResolverDomainList>,
): any[] {
  return result.map((item) => {
    return dnsResolverDomainListDeserializer(item);
  });
}

/** Describes a DNS resolver domain list for bulk UPLOAD or DOWNLOAD operations. */
export interface DnsResolverDomainListBulk {
  /** Properties of the DNS resolver domain list upload or download request. */
  properties: DnsResolverDomainListBulkProperties;
}

export function dnsResolverDomainListBulkSerializer(item: DnsResolverDomainListBulk): any {
  return {
    properties: dnsResolverDomainListBulkPropertiesSerializer(item["properties"]),
  };
}

/** Describes DNS resolver domain list properties for bulk UPLOAD or DOWNLOAD operations. */
export interface DnsResolverDomainListBulkProperties {
  /** The storage account blob file URL to be used in the bulk upload or download request of DNS resolver domain list. */
  storageUrl: string;
  /** The action to take in the request, Upload or Download. */
  action: Action;
}

export function dnsResolverDomainListBulkPropertiesSerializer(
  item: DnsResolverDomainListBulkProperties,
): any {
  return { storageUrl: item["storageUrl"], action: item["action"] };
}

/** The action type in requests for bulk upload or download of a DNS resolver domain list. */
export enum KnownAction {
  /** Upload */
  Upload = "Upload",
  /** Download */
  Download = "Download",
}

/**
 * The action type in requests for bulk upload or download of a DNS resolver domain list. \
 * {@link KnownAction} can be used interchangeably with Action,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Upload** \
 * **Download**
 */
export type Action = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-05-01 API version. */
  V20250501 = "2025-05-01",
  /** The 2025-10-01-Preview API version. */
  V20251001Preview = "2025-10-01-preview",
}
