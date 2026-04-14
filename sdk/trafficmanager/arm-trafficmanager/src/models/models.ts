// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Class representing a Traffic Manager endpoint. */
export interface Endpoint extends ProxyResource {
  /** The Azure Resource URI of the of the endpoint. Not applicable to endpoints of type 'ExternalEndpoints'. */
  targetResourceId?: string;
  /** The fully-qualified DNS name or IP address of the endpoint. Traffic Manager returns this value in DNS responses to direct traffic to this endpoint. */
  target?: string;
  /** The status of the endpoint. If the endpoint is Enabled, it is probed for endpoint health and is included in the traffic routing method. */
  endpointStatus?: EndpointStatus;
  /** The weight of this endpoint when using the 'Weighted' traffic routing method. Possible values are from 1 to 1000. */
  weight?: number;
  /** The priority of this endpoint when using the 'Priority' traffic routing method. Possible values are from 1 to 1000, lower values represent higher priority. This is an optional parameter.  If specified, it must be specified on all endpoints, and no two endpoints can share the same priority value. */
  priority?: number;
  /** Specifies the location of the external or nested endpoints when using the 'Performance' traffic routing method. */
  endpointLocation?: string;
  /** The monitoring status of the endpoint. */
  endpointMonitorStatus?: EndpointMonitorStatus;
  /** The minimum number of endpoints that must be available in the child profile in order for the parent profile to be considered available. Only applicable to endpoint of type 'NestedEndpoints'. */
  minChildEndpoints?: number;
  /** The minimum number of IPv4 (DNS record type A) endpoints that must be available in the child profile in order for the parent profile to be considered available. Only applicable to endpoint of type 'NestedEndpoints'. */
  minChildEndpointsIPv4?: number;
  /** The minimum number of IPv6 (DNS record type AAAA) endpoints that must be available in the child profile in order for the parent profile to be considered available. Only applicable to endpoint of type 'NestedEndpoints'. */
  minChildEndpointsIPv6?: number;
  /** The list of countries/regions mapped to this endpoint when using the 'Geographic' traffic routing method. Please consult Traffic Manager Geographic documentation for a full list of accepted values. */
  geoMapping?: string[];
  /** The list of subnets, IP addresses, and/or address ranges mapped to this endpoint when using the 'Subnet' traffic routing method. An empty list will match all ranges not covered by other endpoints. */
  subnets?: EndpointPropertiesSubnetsItem[];
  /** List of custom headers. */
  customHeaders?: EndpointPropertiesCustomHeadersItem[];
  /** If Always Serve is enabled, probing for endpoint health will be disabled and endpoints will be included in the traffic routing method. */
  alwaysServe?: AlwaysServe;
}

export function endpointSerializer(item: Endpoint): any {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: areAllPropsUndefined(item, [
      "targetResourceId",
      "target",
      "endpointStatus",
      "weight",
      "priority",
      "endpointLocation",
      "endpointMonitorStatus",
      "minChildEndpoints",
      "minChildEndpointsIPv4",
      "minChildEndpointsIPv6",
      "geoMapping",
      "subnets",
      "customHeaders",
      "alwaysServe",
    ])
      ? undefined
      : _endpointPropertiesSerializer(item),
  };
}

export function endpointDeserializer(item: any): Endpoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _endpointPropertiesDeserializer(item["properties"])),
  };
}

/** Class representing a Traffic Manager endpoint properties. */
export interface EndpointProperties {
  /** The Azure Resource URI of the of the endpoint. Not applicable to endpoints of type 'ExternalEndpoints'. */
  targetResourceId?: string;
  /** The fully-qualified DNS name or IP address of the endpoint. Traffic Manager returns this value in DNS responses to direct traffic to this endpoint. */
  target?: string;
  /** The status of the endpoint. If the endpoint is Enabled, it is probed for endpoint health and is included in the traffic routing method. */
  endpointStatus?: EndpointStatus;
  /** The weight of this endpoint when using the 'Weighted' traffic routing method. Possible values are from 1 to 1000. */
  weight?: number;
  /** The priority of this endpoint when using the 'Priority' traffic routing method. Possible values are from 1 to 1000, lower values represent higher priority. This is an optional parameter.  If specified, it must be specified on all endpoints, and no two endpoints can share the same priority value. */
  priority?: number;
  /** Specifies the location of the external or nested endpoints when using the 'Performance' traffic routing method. */
  endpointLocation?: string;
  /** The monitoring status of the endpoint. */
  endpointMonitorStatus?: EndpointMonitorStatus;
  /** The minimum number of endpoints that must be available in the child profile in order for the parent profile to be considered available. Only applicable to endpoint of type 'NestedEndpoints'. */
  minChildEndpoints?: number;
  /** The minimum number of IPv4 (DNS record type A) endpoints that must be available in the child profile in order for the parent profile to be considered available. Only applicable to endpoint of type 'NestedEndpoints'. */
  minChildEndpointsIPv4?: number;
  /** The minimum number of IPv6 (DNS record type AAAA) endpoints that must be available in the child profile in order for the parent profile to be considered available. Only applicable to endpoint of type 'NestedEndpoints'. */
  minChildEndpointsIPv6?: number;
  /** The list of countries/regions mapped to this endpoint when using the 'Geographic' traffic routing method. Please consult Traffic Manager Geographic documentation for a full list of accepted values. */
  geoMapping?: string[];
  /** The list of subnets, IP addresses, and/or address ranges mapped to this endpoint when using the 'Subnet' traffic routing method. An empty list will match all ranges not covered by other endpoints. */
  subnets?: EndpointPropertiesSubnetsItem[];
  /** List of custom headers. */
  customHeaders?: EndpointPropertiesCustomHeadersItem[];
  /** If Always Serve is enabled, probing for endpoint health will be disabled and endpoints will be included in the traffic routing method. */
  alwaysServe?: AlwaysServe;
}

export function endpointPropertiesSerializer(item: EndpointProperties): any {
  return {
    targetResourceId: item["targetResourceId"],
    target: item["target"],
    endpointStatus: item["endpointStatus"],
    weight: item["weight"],
    priority: item["priority"],
    endpointLocation: item["endpointLocation"],
    endpointMonitorStatus: item["endpointMonitorStatus"],
    minChildEndpoints: item["minChildEndpoints"],
    minChildEndpointsIPv4: item["minChildEndpointsIPv4"],
    minChildEndpointsIPv6: item["minChildEndpointsIPv6"],
    geoMapping: !item["geoMapping"]
      ? item["geoMapping"]
      : item["geoMapping"].map((p: any) => {
          return p;
        }),
    subnets: !item["subnets"]
      ? item["subnets"]
      : endpointPropertiesSubnetsItemArraySerializer(item["subnets"]),
    customHeaders: !item["customHeaders"]
      ? item["customHeaders"]
      : endpointPropertiesCustomHeadersItemArraySerializer(item["customHeaders"]),
    alwaysServe: item["alwaysServe"],
  };
}

export function endpointPropertiesDeserializer(item: any): EndpointProperties {
  return {
    targetResourceId: item["targetResourceId"],
    target: item["target"],
    endpointStatus: item["endpointStatus"],
    weight: item["weight"],
    priority: item["priority"],
    endpointLocation: item["endpointLocation"],
    endpointMonitorStatus: item["endpointMonitorStatus"],
    minChildEndpoints: item["minChildEndpoints"],
    minChildEndpointsIPv4: item["minChildEndpointsIPv4"],
    minChildEndpointsIPv6: item["minChildEndpointsIPv6"],
    geoMapping: !item["geoMapping"]
      ? item["geoMapping"]
      : item["geoMapping"].map((p: any) => {
          return p;
        }),
    subnets: !item["subnets"]
      ? item["subnets"]
      : endpointPropertiesSubnetsItemArrayDeserializer(item["subnets"]),
    customHeaders: !item["customHeaders"]
      ? item["customHeaders"]
      : endpointPropertiesCustomHeadersItemArrayDeserializer(item["customHeaders"]),
    alwaysServe: item["alwaysServe"],
  };
}

/** The status of the endpoint. If the endpoint is Enabled, it is probed for endpoint health and is included in the traffic routing method. */
export enum KnownEndpointStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * The status of the endpoint. If the endpoint is Enabled, it is probed for endpoint health and is included in the traffic routing method. \
 * {@link KnownEndpointStatus} can be used interchangeably with EndpointStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type EndpointStatus = string;

/** The monitoring status of the endpoint. */
export enum KnownEndpointMonitorStatus {
  /** CheckingEndpoint */
  CheckingEndpoint = "CheckingEndpoint",
  /** Online */
  Online = "Online",
  /** Degraded */
  Degraded = "Degraded",
  /** Disabled */
  Disabled = "Disabled",
  /** Inactive */
  Inactive = "Inactive",
  /** Stopped */
  Stopped = "Stopped",
  /** Unmonitored */
  Unmonitored = "Unmonitored",
}

/**
 * The monitoring status of the endpoint. \
 * {@link KnownEndpointMonitorStatus} can be used interchangeably with EndpointMonitorStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CheckingEndpoint** \
 * **Online** \
 * **Degraded** \
 * **Disabled** \
 * **Inactive** \
 * **Stopped** \
 * **Unmonitored**
 */
export type EndpointMonitorStatus = string;

export function endpointPropertiesSubnetsItemArraySerializer(
  result: Array<EndpointPropertiesSubnetsItem>,
): any[] {
  return result.map((item) => {
    return endpointPropertiesSubnetsItemSerializer(item);
  });
}

export function endpointPropertiesSubnetsItemArrayDeserializer(
  result: Array<EndpointPropertiesSubnetsItem>,
): any[] {
  return result.map((item) => {
    return endpointPropertiesSubnetsItemDeserializer(item);
  });
}

/** Subnet first address, scope, and/or last address. */
export interface EndpointPropertiesSubnetsItem {
  /** First address in the subnet. */
  first?: string;
  /** Last address in the subnet. */
  last?: string;
  /** Block size (number of leading bits in the subnet mask). */
  scope?: number;
}

export function endpointPropertiesSubnetsItemSerializer(item: EndpointPropertiesSubnetsItem): any {
  return { first: item["first"], last: item["last"], scope: item["scope"] };
}

export function endpointPropertiesSubnetsItemDeserializer(
  item: any,
): EndpointPropertiesSubnetsItem {
  return {
    first: item["first"],
    last: item["last"],
    scope: item["scope"],
  };
}

export function endpointPropertiesCustomHeadersItemArraySerializer(
  result: Array<EndpointPropertiesCustomHeadersItem>,
): any[] {
  return result.map((item) => {
    return endpointPropertiesCustomHeadersItemSerializer(item);
  });
}

export function endpointPropertiesCustomHeadersItemArrayDeserializer(
  result: Array<EndpointPropertiesCustomHeadersItem>,
): any[] {
  return result.map((item) => {
    return endpointPropertiesCustomHeadersItemDeserializer(item);
  });
}

/** Custom header name and value. */
export interface EndpointPropertiesCustomHeadersItem {
  /** Header name. */
  name?: string;
  /** Header value. */
  value?: string;
}

export function endpointPropertiesCustomHeadersItemSerializer(
  item: EndpointPropertiesCustomHeadersItem,
): any {
  return { name: item["name"], value: item["value"] };
}

export function endpointPropertiesCustomHeadersItemDeserializer(
  item: any,
): EndpointPropertiesCustomHeadersItem {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** If Always Serve is enabled, probing for endpoint health will be disabled and endpoints will be included in the traffic routing method. */
export enum KnownAlwaysServe {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * If Always Serve is enabled, probing for endpoint health will be disabled and endpoints will be included in the traffic routing method. \
 * {@link KnownAlwaysServe} can be used interchangeably with AlwaysServe,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type AlwaysServe = string;

/** The resource model definition for a ARM proxy resource. It will have everything other than required location and tags */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource): any {
  return { id: item["id"], name: item["name"], type: item["type"] };
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** The core properties of ARM resources */
export interface Resource {
  /** Fully qualified resource Id for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/trafficManagerProfiles/{resourceName} */
  id?: string;
  /** The name of the resource */
  name?: string;
  /** The type of the resource. Ex- Microsoft.Network/trafficManagerProfiles. */
  type?: string;
}

export function resourceSerializer(item: Resource): any {
  return { id: item["id"], name: item["name"], type: item["type"] };
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** An error returned by the Azure Resource Manager */
export interface CloudError {
  /** The content of the error. */
  error?: CloudErrorBody;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cloudErrorBodyDeserializer(item["error"]),
  };
}

/** The content of an error returned by the Azure Resource Manager */
export interface CloudErrorBody {
  /** Error code */
  code?: string;
  /** Error message */
  message?: string;
  /** Error target */
  target?: string;
  /** Error details */
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

/** Class representing a Traffic Manager endpoint for update operations. */
export interface EndpointUpdate {
  /** Fully qualified resource Id for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/trafficManagerProfiles/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. Ex- Microsoft.Network/trafficManagerProfiles. */
  readonly type?: string;
  /** The properties of the Traffic Manager endpoint. */
  properties?: EndpointProperties;
}

export function endpointUpdateSerializer(item: EndpointUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : endpointPropertiesSerializer(item["properties"]),
  };
}

/** The result of the request or operation. */
export interface DeleteOperationResult {
  /** The result of the operation or request. */
  readonly operationResult?: boolean;
}

export function deleteOperationResultDeserializer(item: any): DeleteOperationResult {
  return {
    operationResult: item["boolean"],
  };
}

/** Class representing a Traffic Manager profile. */
export interface Profile extends TrackedResource {
  /** The status of the Traffic Manager profile. */
  profileStatus?: ProfileStatus;
  /** The traffic routing method of the Traffic Manager profile. */
  trafficRoutingMethod?: TrafficRoutingMethod;
  /** The DNS settings of the Traffic Manager profile. */
  dnsConfig?: DnsConfig;
  /** The endpoint monitoring settings of the Traffic Manager profile. */
  monitorConfig?: MonitorConfig;
  /** The list of endpoints in the Traffic Manager profile. */
  endpoints?: Endpoint[];
  /** Indicates whether Traffic View is 'Enabled' or 'Disabled' for the Traffic Manager profile. Null, indicates 'Disabled'. Enabling this feature will increase the cost of the Traffic Manage profile. */
  trafficViewEnrollmentStatus?: TrafficViewEnrollmentStatus;
  /** The list of allowed endpoint record types. */
  allowedEndpointRecordTypes?: AllowedEndpointRecordType[];
  /** Maximum number of endpoints to be returned for MultiValue routing type. */
  maxReturn?: number;
  /** When record type is set, a traffic manager profile will allow only endpoints that match this type. */
  recordType?: RecordType;
}

export function profileSerializer(item: Profile): any {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: areAllPropsUndefined(item, [
      "profileStatus",
      "trafficRoutingMethod",
      "dnsConfig",
      "monitorConfig",
      "endpoints",
      "trafficViewEnrollmentStatus",
      "allowedEndpointRecordTypes",
      "maxReturn",
      "recordType",
    ])
      ? undefined
      : _profilePropertiesSerializer(item),
  };
}

export function profileDeserializer(item: any): Profile {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _profilePropertiesDeserializer(item["properties"])),
  };
}

/** Class representing the Traffic Manager profile properties. */
export interface ProfileProperties {
  /** The status of the Traffic Manager profile. */
  profileStatus?: ProfileStatus;
  /** The traffic routing method of the Traffic Manager profile. */
  trafficRoutingMethod?: TrafficRoutingMethod;
  /** The DNS settings of the Traffic Manager profile. */
  dnsConfig?: DnsConfig;
  /** The endpoint monitoring settings of the Traffic Manager profile. */
  monitorConfig?: MonitorConfig;
  /** The list of endpoints in the Traffic Manager profile. */
  endpoints?: Endpoint[];
  /** Indicates whether Traffic View is 'Enabled' or 'Disabled' for the Traffic Manager profile. Null, indicates 'Disabled'. Enabling this feature will increase the cost of the Traffic Manage profile. */
  trafficViewEnrollmentStatus?: TrafficViewEnrollmentStatus;
  /** The list of allowed endpoint record types. */
  allowedEndpointRecordTypes?: AllowedEndpointRecordType[];
  /** Maximum number of endpoints to be returned for MultiValue routing type. */
  maxReturn?: number;
  /** When record type is set, a traffic manager profile will allow only endpoints that match this type. */
  recordType?: RecordType;
}

export function profilePropertiesSerializer(item: ProfileProperties): any {
  return {
    profileStatus: item["profileStatus"],
    trafficRoutingMethod: item["trafficRoutingMethod"],
    dnsConfig: !item["dnsConfig"] ? item["dnsConfig"] : dnsConfigSerializer(item["dnsConfig"]),
    monitorConfig: !item["monitorConfig"]
      ? item["monitorConfig"]
      : monitorConfigSerializer(item["monitorConfig"]),
    endpoints: !item["endpoints"] ? item["endpoints"] : endpointArraySerializer(item["endpoints"]),
    trafficViewEnrollmentStatus: item["trafficViewEnrollmentStatus"],
    allowedEndpointRecordTypes: !item["allowedEndpointRecordTypes"]
      ? item["allowedEndpointRecordTypes"]
      : item["allowedEndpointRecordTypes"].map((p: any) => {
          return p;
        }),
    maxReturn: item["maxReturn"],
    recordType: item["recordType"],
  };
}

export function profilePropertiesDeserializer(item: any): ProfileProperties {
  return {
    profileStatus: item["profileStatus"],
    trafficRoutingMethod: item["trafficRoutingMethod"],
    dnsConfig: !item["dnsConfig"] ? item["dnsConfig"] : dnsConfigDeserializer(item["dnsConfig"]),
    monitorConfig: !item["monitorConfig"]
      ? item["monitorConfig"]
      : monitorConfigDeserializer(item["monitorConfig"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointArrayDeserializer(item["endpoints"]),
    trafficViewEnrollmentStatus: item["trafficViewEnrollmentStatus"],
    allowedEndpointRecordTypes: !item["allowedEndpointRecordTypes"]
      ? item["allowedEndpointRecordTypes"]
      : item["allowedEndpointRecordTypes"].map((p: any) => {
          return p;
        }),
    maxReturn: item["maxReturn"],
    recordType: item["recordType"],
  };
}

/** The status of the Traffic Manager profile. */
export enum KnownProfileStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * The status of the Traffic Manager profile. \
 * {@link KnownProfileStatus} can be used interchangeably with ProfileStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type ProfileStatus = string;

/** The traffic routing method of the Traffic Manager profile. */
export enum KnownTrafficRoutingMethod {
  /** Performance */
  Performance = "Performance",
  /** Priority */
  Priority = "Priority",
  /** Weighted */
  Weighted = "Weighted",
  /** Geographic */
  Geographic = "Geographic",
  /** MultiValue */
  MultiValue = "MultiValue",
  /** Subnet */
  Subnet = "Subnet",
}

/**
 * The traffic routing method of the Traffic Manager profile. \
 * {@link KnownTrafficRoutingMethod} can be used interchangeably with TrafficRoutingMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Performance** \
 * **Priority** \
 * **Weighted** \
 * **Geographic** \
 * **MultiValue** \
 * **Subnet**
 */
export type TrafficRoutingMethod = string;

/** Class containing DNS settings in a Traffic Manager profile. */
export interface DnsConfig {
  /** The relative DNS name provided by this Traffic Manager profile. This value is combined with the DNS domain name used by Azure Traffic Manager to form the fully-qualified domain name (FQDN) of the profile. */
  relativeName?: string;
  /** The fully-qualified domain name (FQDN) of the Traffic Manager profile. This is formed from the concatenation of the RelativeName with the DNS domain used by Azure Traffic Manager. */
  readonly fqdn?: string;
  /** The DNS Time-To-Live (TTL), in seconds. This informs the local DNS resolvers and DNS clients how long to cache DNS responses provided by this Traffic Manager profile. */
  ttl?: number;
}

export function dnsConfigSerializer(item: DnsConfig): any {
  return { relativeName: item["relativeName"], ttl: item["ttl"] };
}

export function dnsConfigDeserializer(item: any): DnsConfig {
  return {
    relativeName: item["relativeName"],
    fqdn: item["fqdn"],
    ttl: item["ttl"],
  };
}

/** Class containing endpoint monitoring settings in a Traffic Manager profile. */
export interface MonitorConfig {
  /** The profile-level monitoring status of the Traffic Manager profile. */
  profileMonitorStatus?: ProfileMonitorStatus;
  /** The protocol (HTTP, HTTPS or TCP) used to probe for endpoint health. */
  protocol?: MonitorProtocol;
  /** The TCP port used to probe for endpoint health. */
  port?: number;
  /** The path relative to the endpoint domain name used to probe for endpoint health. */
  path?: string;
  /** The monitor interval for endpoints in this profile. This is the interval at which Traffic Manager will check the health of each endpoint in this profile. */
  intervalInSeconds?: number;
  /** The monitor timeout for endpoints in this profile. This is the time that Traffic Manager allows endpoints in this profile to response to the health check. */
  timeoutInSeconds?: number;
  /** The number of consecutive failed health check that Traffic Manager tolerates before declaring an endpoint in this profile Degraded after the next failed health check. */
  toleratedNumberOfFailures?: number;
  /** List of custom headers. */
  customHeaders?: MonitorConfigCustomHeadersItem[];
  /** List of expected status code ranges. */
  expectedStatusCodeRanges?: MonitorConfigExpectedStatusCodeRangesItem[];
}

export function monitorConfigSerializer(item: MonitorConfig): any {
  return {
    profileMonitorStatus: item["profileMonitorStatus"],
    protocol: item["protocol"],
    port: item["port"],
    path: item["path"],
    intervalInSeconds: item["intervalInSeconds"],
    timeoutInSeconds: item["timeoutInSeconds"],
    toleratedNumberOfFailures: item["toleratedNumberOfFailures"],
    customHeaders: !item["customHeaders"]
      ? item["customHeaders"]
      : monitorConfigCustomHeadersItemArraySerializer(item["customHeaders"]),
    expectedStatusCodeRanges: !item["expectedStatusCodeRanges"]
      ? item["expectedStatusCodeRanges"]
      : monitorConfigExpectedStatusCodeRangesItemArraySerializer(item["expectedStatusCodeRanges"]),
  };
}

export function monitorConfigDeserializer(item: any): MonitorConfig {
  return {
    profileMonitorStatus: item["profileMonitorStatus"],
    protocol: item["protocol"],
    port: item["port"],
    path: item["path"],
    intervalInSeconds: item["intervalInSeconds"],
    timeoutInSeconds: item["timeoutInSeconds"],
    toleratedNumberOfFailures: item["toleratedNumberOfFailures"],
    customHeaders: !item["customHeaders"]
      ? item["customHeaders"]
      : monitorConfigCustomHeadersItemArrayDeserializer(item["customHeaders"]),
    expectedStatusCodeRanges: !item["expectedStatusCodeRanges"]
      ? item["expectedStatusCodeRanges"]
      : monitorConfigExpectedStatusCodeRangesItemArrayDeserializer(
          item["expectedStatusCodeRanges"],
        ),
  };
}

/** The profile-level monitoring status of the Traffic Manager profile. */
export enum KnownProfileMonitorStatus {
  /** CheckingEndpoints */
  CheckingEndpoints = "CheckingEndpoints",
  /** Online */
  Online = "Online",
  /** Degraded */
  Degraded = "Degraded",
  /** Disabled */
  Disabled = "Disabled",
  /** Inactive */
  Inactive = "Inactive",
}

/**
 * The profile-level monitoring status of the Traffic Manager profile. \
 * {@link KnownProfileMonitorStatus} can be used interchangeably with ProfileMonitorStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CheckingEndpoints** \
 * **Online** \
 * **Degraded** \
 * **Disabled** \
 * **Inactive**
 */
export type ProfileMonitorStatus = string;

/** The protocol (HTTP, HTTPS or TCP) used to probe for endpoint health. */
export enum KnownMonitorProtocol {
  /** HTTP */
  Http = "HTTP",
  /** HTTPS */
  Https = "HTTPS",
  /** TCP */
  TCP = "TCP",
}

/**
 * The protocol (HTTP, HTTPS or TCP) used to probe for endpoint health. \
 * {@link KnownMonitorProtocol} can be used interchangeably with MonitorProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HTTP** \
 * **HTTPS** \
 * **TCP**
 */
export type MonitorProtocol = string;

export function monitorConfigCustomHeadersItemArraySerializer(
  result: Array<MonitorConfigCustomHeadersItem>,
): any[] {
  return result.map((item) => {
    return monitorConfigCustomHeadersItemSerializer(item);
  });
}

export function monitorConfigCustomHeadersItemArrayDeserializer(
  result: Array<MonitorConfigCustomHeadersItem>,
): any[] {
  return result.map((item) => {
    return monitorConfigCustomHeadersItemDeserializer(item);
  });
}

/** Custom header name and value. */
export interface MonitorConfigCustomHeadersItem {
  /** Header name. */
  name?: string;
  /** Header value. */
  value?: string;
}

export function monitorConfigCustomHeadersItemSerializer(
  item: MonitorConfigCustomHeadersItem,
): any {
  return { name: item["name"], value: item["value"] };
}

export function monitorConfigCustomHeadersItemDeserializer(
  item: any,
): MonitorConfigCustomHeadersItem {
  return {
    name: item["name"],
    value: item["value"],
  };
}

export function monitorConfigExpectedStatusCodeRangesItemArraySerializer(
  result: Array<MonitorConfigExpectedStatusCodeRangesItem>,
): any[] {
  return result.map((item) => {
    return monitorConfigExpectedStatusCodeRangesItemSerializer(item);
  });
}

export function monitorConfigExpectedStatusCodeRangesItemArrayDeserializer(
  result: Array<MonitorConfigExpectedStatusCodeRangesItem>,
): any[] {
  return result.map((item) => {
    return monitorConfigExpectedStatusCodeRangesItemDeserializer(item);
  });
}

/** Min and max value of a status code range. */
export interface MonitorConfigExpectedStatusCodeRangesItem {
  /** Min status code. */
  min?: number;
  /** Max status code. */
  max?: number;
}

export function monitorConfigExpectedStatusCodeRangesItemSerializer(
  item: MonitorConfigExpectedStatusCodeRangesItem,
): any {
  return { min: item["min"], max: item["max"] };
}

export function monitorConfigExpectedStatusCodeRangesItemDeserializer(
  item: any,
): MonitorConfigExpectedStatusCodeRangesItem {
  return {
    min: item["min"],
    max: item["max"],
  };
}

export function endpointArraySerializer(result: Array<Endpoint>): any[] {
  return result.map((item) => {
    return endpointSerializer(item);
  });
}

export function endpointArrayDeserializer(result: Array<Endpoint>): any[] {
  return result.map((item) => {
    return endpointDeserializer(item);
  });
}

/** Indicates whether Traffic View is 'Enabled' or 'Disabled' for the Traffic Manager profile. Null, indicates 'Disabled'. Enabling this feature will increase the cost of the Traffic Manage profile. */
export enum KnownTrafficViewEnrollmentStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates whether Traffic View is 'Enabled' or 'Disabled' for the Traffic Manager profile. Null, indicates 'Disabled'. Enabling this feature will increase the cost of the Traffic Manage profile. \
 * {@link KnownTrafficViewEnrollmentStatus} can be used interchangeably with TrafficViewEnrollmentStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type TrafficViewEnrollmentStatus = string;

/** The allowed type DNS record types for this profile. */
export enum KnownAllowedEndpointRecordType {
  /** DomainName */
  DomainName = "DomainName",
  /** IPv4Address */
  IPv4Address = "IPv4Address",
  /** IPv6Address */
  IPv6Address = "IPv6Address",
  /** Any */
  Any = "Any",
}

/**
 * The allowed type DNS record types for this profile. \
 * {@link KnownAllowedEndpointRecordType} can be used interchangeably with AllowedEndpointRecordType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DomainName** \
 * **IPv4Address** \
 * **IPv6Address** \
 * **Any**
 */
export type AllowedEndpointRecordType = string;

/** When record type is set, a traffic manager profile will allow only endpoints that match this type. */
export enum KnownRecordType {
  /** A record type. */
  A = "A",
  /** AAAA record type. */
  Aaaa = "AAAA",
  /** CNAME record type. */
  Cname = "CNAME",
}

/**
 * When record type is set, a traffic manager profile will allow only endpoints that match this type. \
 * {@link KnownRecordType} can be used interchangeably with RecordType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **A**: A record type. \
 * **AAAA**: AAAA record type. \
 * **CNAME**: CNAME record type.
 */
export type RecordType = string;

/** The resource model definition for a ARM tracked top level resource */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The Azure Region where the resource lives */
  location?: string;
}

export function trackedResourceSerializer(item: TrackedResource): any {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    tags: item["tags"],
    location: item["location"],
  };
}

export function trackedResourceDeserializer(item: any): TrackedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** Parameters supplied to update a Traffic Manager profile. */
export interface ProfileUpdate {
  /** Fully qualified resource Id for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/trafficManagerProfiles/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. Ex- Microsoft.Network/trafficManagerProfiles. */
  readonly type?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The Azure Region where the resource lives */
  readonly location?: string;
  /** The properties of the Traffic Manager profile. */
  properties?: ProfilePropertiesUpdate;
}

export function profileUpdateSerializer(item: ProfileUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : profilePropertiesUpdateSerializer(item["properties"]),
  };
}

/** Class representing the Traffic Manager profile properties for update operations. */
export interface ProfilePropertiesUpdate {
  /** The status of the Traffic Manager profile. */
  profileStatus?: ProfileStatus;
  /** The traffic routing method of the Traffic Manager profile. */
  trafficRoutingMethod?: TrafficRoutingMethod;
  /** The DNS settings of the Traffic Manager profile. */
  dnsConfig?: DnsConfig;
  /** The endpoint monitoring settings of the Traffic Manager profile. */
  monitorConfig?: MonitorConfig;
  /** The list of endpoints in the Traffic Manager profile. */
  endpoints?: EndpointUpdate[];
  /** Indicates whether Traffic View is 'Enabled' or 'Disabled' for the Traffic Manager profile. Null, indicates 'Disabled'. Enabling this feature will increase the cost of the Traffic Manage profile. */
  trafficViewEnrollmentStatus?: TrafficViewEnrollmentStatus;
  /** The list of allowed endpoint record types. */
  allowedEndpointRecordTypes?: AllowedEndpointRecordType[];
  /** Maximum number of endpoints to be returned for MultiValue routing type. */
  maxReturn?: number;
  /** When record type is set, a traffic manager profile will allow only endpoints that match this type. */
  recordType?: RecordType;
}

export function profilePropertiesUpdateSerializer(item: ProfilePropertiesUpdate): any {
  return {
    profileStatus: item["profileStatus"],
    trafficRoutingMethod: item["trafficRoutingMethod"],
    dnsConfig: !item["dnsConfig"] ? item["dnsConfig"] : dnsConfigSerializer(item["dnsConfig"]),
    monitorConfig: !item["monitorConfig"]
      ? item["monitorConfig"]
      : monitorConfigSerializer(item["monitorConfig"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointUpdateArraySerializer(item["endpoints"]),
    trafficViewEnrollmentStatus: item["trafficViewEnrollmentStatus"],
    allowedEndpointRecordTypes: !item["allowedEndpointRecordTypes"]
      ? item["allowedEndpointRecordTypes"]
      : item["allowedEndpointRecordTypes"].map((p: any) => {
          return p;
        }),
    maxReturn: item["maxReturn"],
    recordType: item["recordType"],
  };
}

export function endpointUpdateArraySerializer(result: Array<EndpointUpdate>): any[] {
  return result.map((item) => {
    return endpointUpdateSerializer(item);
  });
}

/** The response of a Profile list operation. */
export interface _ProfileListResult {
  /** The Profile items on this page */
  value: Profile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _profileListResultDeserializer(item: any): _ProfileListResult {
  return {
    value: profileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function profileArraySerializer(result: Array<Profile>): any[] {
  return result.map((item) => {
    return profileSerializer(item);
  });
}

export function profileArrayDeserializer(result: Array<Profile>): any[] {
  return result.map((item) => {
    return profileDeserializer(item);
  });
}

/** Parameters supplied to check Traffic Manager name operation. */
export interface CheckTrafficManagerRelativeDnsNameAvailabilityParameters {
  /** The name of the resource. */
  name?: string;
  /** The type of the resource. */
  type?: string;
}

export function checkTrafficManagerRelativeDnsNameAvailabilityParametersSerializer(
  item: CheckTrafficManagerRelativeDnsNameAvailabilityParameters,
): any {
  return { name: item["name"], type: item["type"] };
}

/** Class representing a Traffic Manager Name Availability response. */
export interface TrafficManagerNameAvailability {
  /** The relative name. */
  name?: string;
  /** Traffic Manager profile resource type. */
  type?: string;
  /** Describes whether the relative name is available or not. */
  nameAvailable?: boolean;
  /** The reason why the name is not available, when applicable. */
  reason?: string;
  /** Descriptive message that explains why the name is not available, when applicable. */
  message?: string;
}

export function trafficManagerNameAvailabilityDeserializer(
  item: any,
): TrafficManagerNameAvailability {
  return {
    name: item["name"],
    type: item["type"],
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Class representing the Geographic hierarchy used with the Geographic traffic routing method. */
export interface TrafficManagerGeographicHierarchy extends ProxyResource {
  /** The region at the root of the hierarchy from all the regions in the hierarchy can be retrieved. */
  geographicHierarchy?: Region;
}

export function trafficManagerGeographicHierarchyDeserializer(
  item: any,
): TrafficManagerGeographicHierarchy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _trafficManagerGeographicHierarchyPropertiesDeserializer(item["properties"])),
  };
}

/** Class representing the properties of the Geographic hierarchy used with the Geographic traffic routing method. */
export interface GeographicHierarchyProperties {
  /** The region at the root of the hierarchy from all the regions in the hierarchy can be retrieved. */
  geographicHierarchy?: Region;
}

export function geographicHierarchyPropertiesDeserializer(
  item: any,
): GeographicHierarchyProperties {
  return {
    geographicHierarchy: !item["geographicHierarchy"]
      ? item["geographicHierarchy"]
      : regionDeserializer(item["geographicHierarchy"]),
  };
}

/** Class representing a region in the Geographic hierarchy used with the Geographic traffic routing method. */
export interface Region {
  /** The code of the region */
  code?: string;
  /** The name of the region */
  name?: string;
  /** The list of Regions grouped under this Region in the Geographic Hierarchy. */
  regions?: Region[];
}

export function regionDeserializer(item: any): Region {
  return {
    code: item["code"],
    name: item["name"],
    regions: !item["regions"] ? item["regions"] : regionArrayDeserializer(item["regions"]),
  };
}

export function regionArrayDeserializer(result: Array<Region>): any[] {
  return result.map((item) => {
    return regionDeserializer(item);
  });
}

/** Class representing a Traffic Manager HeatMap. */
export interface HeatMapModel extends ProxyResource {
  /** The beginning of the time window for this HeatMap, inclusive. */
  startTime?: Date;
  /** The ending of the time window for this HeatMap, exclusive. */
  endTime?: Date;
  /** The endpoints used in this HeatMap calculation. */
  endpoints?: HeatMapEndpoint[];
  /** The traffic flows produced in this HeatMap calculation. */
  trafficFlows?: TrafficFlow[];
}

export function heatMapModelDeserializer(item: any): HeatMapModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _heatMapModelPropertiesDeserializer(item["properties"])),
  };
}

/** Class representing a Traffic Manager HeatMap properties. */
export interface HeatMapProperties {
  /** The beginning of the time window for this HeatMap, inclusive. */
  startTime?: Date;
  /** The ending of the time window for this HeatMap, exclusive. */
  endTime?: Date;
  /** The endpoints used in this HeatMap calculation. */
  endpoints?: HeatMapEndpoint[];
  /** The traffic flows produced in this HeatMap calculation. */
  trafficFlows?: TrafficFlow[];
}

export function heatMapPropertiesDeserializer(item: any): HeatMapProperties {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : heatMapEndpointArrayDeserializer(item["endpoints"]),
    trafficFlows: !item["trafficFlows"]
      ? item["trafficFlows"]
      : trafficFlowArrayDeserializer(item["trafficFlows"]),
  };
}

export function heatMapEndpointArrayDeserializer(result: Array<HeatMapEndpoint>): any[] {
  return result.map((item) => {
    return heatMapEndpointDeserializer(item);
  });
}

/** Class which is a sparse representation of a Traffic Manager endpoint. */
export interface HeatMapEndpoint {
  /** The ARM Resource ID of this Traffic Manager endpoint. */
  resourceId?: string;
  /** A number uniquely identifying this endpoint in query experiences. */
  endpointId?: number;
}

export function heatMapEndpointDeserializer(item: any): HeatMapEndpoint {
  return {
    resourceId: item["resourceId"],
    endpointId: item["endpointId"],
  };
}

export function trafficFlowArrayDeserializer(result: Array<TrafficFlow>): any[] {
  return result.map((item) => {
    return trafficFlowDeserializer(item);
  });
}

/** Class representing a Traffic Manager HeatMap traffic flow properties. */
export interface TrafficFlow {
  /** The IP address that this query experience originated from. */
  sourceIp?: string;
  /** The approximate latitude that these queries originated from. */
  latitude?: number;
  /** The approximate longitude that these queries originated from. */
  longitude?: number;
  /** The query experiences produced in this HeatMap calculation. */
  queryExperiences?: QueryExperience[];
}

export function trafficFlowDeserializer(item: any): TrafficFlow {
  return {
    sourceIp: item["sourceIp"],
    latitude: item["latitude"],
    longitude: item["longitude"],
    queryExperiences: !item["queryExperiences"]
      ? item["queryExperiences"]
      : queryExperienceArrayDeserializer(item["queryExperiences"]),
  };
}

export function queryExperienceArrayDeserializer(result: Array<QueryExperience>): any[] {
  return result.map((item) => {
    return queryExperienceDeserializer(item);
  });
}

/** Class representing a Traffic Manager HeatMap query experience properties. */
export interface QueryExperience {
  /** The id of the endpoint from the 'endpoints' array which these queries were routed to. */
  endpointId: number;
  /** The number of queries originating from this location. */
  queryCount: number;
  /** The latency experienced by queries originating from this location. */
  latency?: number;
}

export function queryExperienceDeserializer(item: any): QueryExperience {
  return {
    endpointId: item["endpointId"],
    queryCount: item["queryCount"],
    latency: item["latency"],
  };
}

/** Class representing Traffic Manager User Metrics. */
export interface UserMetricsModel extends ProxyResource {
  /** The key returned by the User Metrics operation. */
  key?: string;
}

export function userMetricsModelDeserializer(item: any): UserMetricsModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _userMetricsModelPropertiesDeserializer(item["properties"])),
  };
}

/** Class representing a Traffic Manager Real User Metrics key response. */
export interface UserMetricsProperties {
  /** The key returned by the User Metrics operation. */
  key?: string;
}

export function userMetricsPropertiesDeserializer(item: any): UserMetricsProperties {
  return {
    key: item["key"],
  };
}

/** Type of EndpointType */
export type EndpointType = "AzureEndpoints" | "ExternalEndpoints" | "NestedEndpoints";
/** Type of HeatMapType */
export type HeatMapType = "default";

/** The available API versions. */
export enum KnownVersions {
  /** The 2022-04-01 API version. */
  V20220401 = "2022-04-01",
  /** The 2024-04-01-preview API version. */
  V20240401Preview = "2024-04-01-preview",
}

export function _endpointPropertiesSerializer(item: Endpoint): any {
  return {
    targetResourceId: item["targetResourceId"],
    target: item["target"],
    endpointStatus: item["endpointStatus"],
    weight: item["weight"],
    priority: item["priority"],
    endpointLocation: item["endpointLocation"],
    endpointMonitorStatus: item["endpointMonitorStatus"],
    minChildEndpoints: item["minChildEndpoints"],
    minChildEndpointsIPv4: item["minChildEndpointsIPv4"],
    minChildEndpointsIPv6: item["minChildEndpointsIPv6"],
    geoMapping: !item["geoMapping"]
      ? item["geoMapping"]
      : item["geoMapping"].map((p: any) => {
          return p;
        }),
    subnets: !item["subnets"]
      ? item["subnets"]
      : endpointPropertiesSubnetsItemArraySerializer(item["subnets"]),
    customHeaders: !item["customHeaders"]
      ? item["customHeaders"]
      : endpointPropertiesCustomHeadersItemArraySerializer(item["customHeaders"]),
    alwaysServe: item["alwaysServe"],
  };
}

export function _endpointPropertiesDeserializer(item: any) {
  return {
    targetResourceId: item["targetResourceId"],
    target: item["target"],
    endpointStatus: item["endpointStatus"],
    weight: item["weight"],
    priority: item["priority"],
    endpointLocation: item["endpointLocation"],
    endpointMonitorStatus: item["endpointMonitorStatus"],
    minChildEndpoints: item["minChildEndpoints"],
    minChildEndpointsIPv4: item["minChildEndpointsIPv4"],
    minChildEndpointsIPv6: item["minChildEndpointsIPv6"],
    geoMapping: !item["geoMapping"]
      ? item["geoMapping"]
      : item["geoMapping"].map((p: any) => {
          return p;
        }),
    subnets: !item["subnets"]
      ? item["subnets"]
      : endpointPropertiesSubnetsItemArrayDeserializer(item["subnets"]),
    customHeaders: !item["customHeaders"]
      ? item["customHeaders"]
      : endpointPropertiesCustomHeadersItemArrayDeserializer(item["customHeaders"]),
    alwaysServe: item["alwaysServe"],
  };
}

export function _profilePropertiesSerializer(item: Profile): any {
  return {
    profileStatus: item["profileStatus"],
    trafficRoutingMethod: item["trafficRoutingMethod"],
    dnsConfig: !item["dnsConfig"] ? item["dnsConfig"] : dnsConfigSerializer(item["dnsConfig"]),
    monitorConfig: !item["monitorConfig"]
      ? item["monitorConfig"]
      : monitorConfigSerializer(item["monitorConfig"]),
    endpoints: !item["endpoints"] ? item["endpoints"] : endpointArraySerializer(item["endpoints"]),
    trafficViewEnrollmentStatus: item["trafficViewEnrollmentStatus"],
    allowedEndpointRecordTypes: !item["allowedEndpointRecordTypes"]
      ? item["allowedEndpointRecordTypes"]
      : item["allowedEndpointRecordTypes"].map((p: any) => {
          return p;
        }),
    maxReturn: item["maxReturn"],
    recordType: item["recordType"],
  };
}

export function _profilePropertiesDeserializer(item: any) {
  return {
    profileStatus: item["profileStatus"],
    trafficRoutingMethod: item["trafficRoutingMethod"],
    dnsConfig: !item["dnsConfig"] ? item["dnsConfig"] : dnsConfigDeserializer(item["dnsConfig"]),
    monitorConfig: !item["monitorConfig"]
      ? item["monitorConfig"]
      : monitorConfigDeserializer(item["monitorConfig"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointArrayDeserializer(item["endpoints"]),
    trafficViewEnrollmentStatus: item["trafficViewEnrollmentStatus"],
    allowedEndpointRecordTypes: !item["allowedEndpointRecordTypes"]
      ? item["allowedEndpointRecordTypes"]
      : item["allowedEndpointRecordTypes"].map((p: any) => {
          return p;
        }),
    maxReturn: item["maxReturn"],
    recordType: item["recordType"],
  };
}

export function _trafficManagerGeographicHierarchyPropertiesDeserializer(item: any) {
  return {
    geographicHierarchy: !item["geographicHierarchy"]
      ? item["geographicHierarchy"]
      : regionDeserializer(item["geographicHierarchy"]),
  };
}

export function _heatMapModelPropertiesDeserializer(item: any) {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : heatMapEndpointArrayDeserializer(item["endpoints"]),
    trafficFlows: !item["trafficFlows"]
      ? item["trafficFlows"]
      : trafficFlowArrayDeserializer(item["trafficFlows"]),
  };
}

export function _userMetricsModelPropertiesDeserializer(item: any) {
  return {
    key: item["key"],
  };
}
