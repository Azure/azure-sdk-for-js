// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  readonly actionType?: ActionType;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    actionType: item["actionType"],
  };
}

/** Localized display information for an operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  readonly provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  readonly resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  readonly operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  readonly description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export enum KnownOrigin {
  /** Indicates the operation is initiated by a user. */
  User = "user",
  /** Indicates the operation is initiated by a system. */
  System = "system",
  /** Indicates the operation is initiated by a user or system. */
  UserSystem = "user,system",
}

/**
 * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: Indicates the operation is initiated by a user. \
 * **system**: Indicates the operation is initiated by a system. \
 * **user,system**: Indicates the operation is initiated by a user or system.
 */
export type Origin = string;

/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export enum KnownActionType {
  /** Actions are for internal-only APIs. */
  Internal = "Internal",
}

/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**: Actions are for internal-only APIs.
 */
export type ActionType = string;

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

/** AccessBridge represents a managed access bridge resource. */
export interface AccessBridge extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The extended location of the resource. This property is required when creating the resource. */
  extendedLocation: ExtendedLocation;
  /** The IPv4 subnet from which the access bridge allocates an address. This subnet must be part of the internal network specified by networkId. */
  ipv4ConnectedPrefix?: string;
  /** The IPv6 subnet from which the access bridge allocates an address. This subnet must be part of the internal network specified by networkId. */
  ipv6ConnectedPrefix?: string;
  /** The resource ID of the internal network in a layer 3 isolation domain containing the IP subnets to use. */
  networkId: string;
  /** The list of security rules enforced by the access bridge. */
  securityRules?: AccessBridgeSecurityRule[];
  /** The detailed status reported by the access bridge. */
  readonly detailedStatus?: AccessBridgeDetailedStatus;
  /** The descriptive message that accompanies the detailed status. */
  readonly detailedStatusMessage?: string;
  /** The observed endpoints that clients should use to reach the access bridge. */
  readonly endpoints?: AccessBridgeEndpoint[];
  /** The protocol advertised by the access bridge endpoints. */
  readonly protocol?: TransportProtocol;
  /** The provisioning state of the access bridge. */
  readonly provisioningState?: AccessBridgeProvisioningState;
}

export function accessBridgeSerializer(item: AccessBridge): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _accessBridgePropertiesSerializer(item),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function accessBridgeDeserializer(item: any): AccessBridge {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._accessBridgePropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** AccessBridgeProperties captures the input and status for an access bridge. */
export interface AccessBridgeProperties {
  /** The IPv4 subnet from which the access bridge allocates an address. This subnet must be part of the internal network specified by networkId. */
  ipv4ConnectedPrefix?: string;
  /** The IPv6 subnet from which the access bridge allocates an address. This subnet must be part of the internal network specified by networkId. */
  ipv6ConnectedPrefix?: string;
  /** The resource ID of the internal network in a layer 3 isolation domain containing the IP subnets to use. */
  networkId: string;
  /** The list of security rules enforced by the access bridge. */
  securityRules?: AccessBridgeSecurityRule[];
  /** The detailed status reported by the access bridge. */
  readonly detailedStatus?: AccessBridgeDetailedStatus;
  /** The descriptive message that accompanies the detailed status. */
  readonly detailedStatusMessage?: string;
  /** The observed endpoints that clients should use to reach the access bridge. */
  readonly endpoints?: AccessBridgeEndpoint[];
  /** The protocol advertised by the access bridge endpoints. */
  readonly protocol?: TransportProtocol;
  /** The provisioning state of the access bridge. */
  readonly provisioningState?: AccessBridgeProvisioningState;
}

export function accessBridgePropertiesSerializer(item: AccessBridgeProperties): any {
  return {
    ipv4ConnectedPrefix: item["ipv4ConnectedPrefix"],
    ipv6ConnectedPrefix: item["ipv6ConnectedPrefix"],
    networkId: item["networkId"],
    securityRules: !item["securityRules"]
      ? item["securityRules"]
      : accessBridgeSecurityRuleArraySerializer(item["securityRules"]),
  };
}

export function accessBridgePropertiesDeserializer(item: any): AccessBridgeProperties {
  return {
    ipv4ConnectedPrefix: item["ipv4ConnectedPrefix"],
    ipv6ConnectedPrefix: item["ipv6ConnectedPrefix"],
    networkId: item["networkId"],
    securityRules: !item["securityRules"]
      ? item["securityRules"]
      : accessBridgeSecurityRuleArrayDeserializer(item["securityRules"]),
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : accessBridgeEndpointArrayDeserializer(item["endpoints"]),
    protocol: item["protocol"],
    provisioningState: item["provisioningState"],
  };
}

export function accessBridgeSecurityRuleArraySerializer(
  result: Array<AccessBridgeSecurityRule>,
): any[] {
  return result.map((item) => {
    return accessBridgeSecurityRuleSerializer(item);
  });
}

export function accessBridgeSecurityRuleArrayDeserializer(
  result: Array<AccessBridgeSecurityRule>,
): any[] {
  return result.map((item) => {
    return accessBridgeSecurityRuleDeserializer(item);
  });
}

/** AccessBridgeSecurityRule captures an individual access rule enforced by the bridge. */
export interface AccessBridgeSecurityRule {
  /** The user provided value describing this rule. */
  description?: string;
  /** The direction of allowed network traffic based on the rule. */
  direction: SecurityRuleDirection;
  /** The set of IPv4 addresses permitted as the source or destination of the security rule. For as single address, utilize a /32 (CIDR notation). One or both Ipv4Addresses and Ipv6Addresses must be specified. Example formats: 10.10.10.10-10.10.10.20 or 10.10.10.10/24. */
  ipv4Addresses?: string[];
  /** The set of IPv6 addresses permitted as the source or destination of the security rule. For as single address, utilize a /128 (CIDR notation). One or both Ipv4Addresses and Ipv6Addresses must be specified. Example formats: 2001:db8:abcd::1-2001:db8:abcd::ff or 2001:db8:abcd::1/64. */
  ipv6Addresses?: string[];
  /** The source or destination port or port range. Example 24562 or 24562-24570. */
  port: string;
}

export function accessBridgeSecurityRuleSerializer(item: AccessBridgeSecurityRule): any {
  return {
    description: item["description"],
    direction: item["direction"],
    ipv4Addresses: !item["ipv4Addresses"]
      ? item["ipv4Addresses"]
      : item["ipv4Addresses"].map((p: any) => {
          return p;
        }),
    ipv6Addresses: !item["ipv6Addresses"]
      ? item["ipv6Addresses"]
      : item["ipv6Addresses"].map((p: any) => {
          return p;
        }),
    port: item["port"],
  };
}

export function accessBridgeSecurityRuleDeserializer(item: any): AccessBridgeSecurityRule {
  return {
    description: item["description"],
    direction: item["direction"],
    ipv4Addresses: !item["ipv4Addresses"]
      ? item["ipv4Addresses"]
      : item["ipv4Addresses"].map((p: any) => {
          return p;
        }),
    ipv6Addresses: !item["ipv6Addresses"]
      ? item["ipv6Addresses"]
      : item["ipv6Addresses"].map((p: any) => {
          return p;
        }),
    port: item["port"],
  };
}

/** The direction of allowed network traffic based on the rule. */
export enum KnownSecurityRuleDirection {
  /** Inbound traffic toward the on-premsises cluster. */
  Inbound = "Inbound",
  /** Outbound traffic from the on-premises cluster. */
  Outbound = "Outbound",
}

/**
 * The direction of allowed network traffic based on the rule. \
 * {@link KnownSecurityRuleDirection} can be used interchangeably with SecurityRuleDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inbound**: Inbound traffic toward the on-premsises cluster. \
 * **Outbound**: Outbound traffic from the on-premises cluster.
 */
export type SecurityRuleDirection = string;

/** The detailed status reported by the access bridge. */
export enum KnownAccessBridgeDetailedStatus {
  /** The access bridge is healthy and operating normally. */
  Running = "Running",
  /** The access bridge is experiencing degraded performance or partial outages. */
  Degraded = "Degraded",
  /** The access bridge is not operational. */
  Failed = "Failed",
}

/**
 * The detailed status reported by the access bridge. \
 * {@link KnownAccessBridgeDetailedStatus} can be used interchangeably with AccessBridgeDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running**: The access bridge is healthy and operating normally. \
 * **Degraded**: The access bridge is experiencing degraded performance or partial outages. \
 * **Failed**: The access bridge is not operational.
 */
export type AccessBridgeDetailedStatus = string;

export function accessBridgeEndpointArrayDeserializer(result: Array<AccessBridgeEndpoint>): any[] {
  return result.map((item) => {
    return accessBridgeEndpointDeserializer(item);
  });
}

/** AccessBridgeEndpoint describes a single advertised service endpoint. */
export interface AccessBridgeEndpoint {
  /** The fully qualified domain name used to describe the certificate name for the endpoint. */
  readonly fqdn?: string;
  /** The IPv4 address associated with the endpoint. */
  readonly ipv4Address?: string;
  /** The IPv6 address associated with the endpoint. */
  readonly ipv6Address?: string;
  /** The name that identifies the type of endpoint (for example VIP or host). */
  readonly name?: string;
}

export function accessBridgeEndpointDeserializer(item: any): AccessBridgeEndpoint {
  return {
    fqdn: item["fqdn"],
    ipv4Address: item["ipv4Address"],
    ipv6Address: item["ipv6Address"],
    name: item["name"],
  };
}

/** The protocol advertised by the access bridge endpoints. */
export enum KnownTransportProtocol {
  /** The TCP transport protocol. */
  TCP = "TCP",
  /** The UDP transport protocol. */
  UDP = "UDP",
}

/**
 * The protocol advertised by the access bridge endpoints. \
 * {@link KnownTransportProtocol} can be used interchangeably with TransportProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TCP**: The TCP transport protocol. \
 * **UDP**: The UDP transport protocol.
 */
export type TransportProtocol = string;

/** The provisioning state of the access bridge. */
export enum KnownAccessBridgeProvisioningState {
  /** The Accepted status. */
  Accepted = "Accepted",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Failed status. */
  Failed = "Failed",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
  /** The Succeeded status. */
  Succeeded = "Succeeded",
}

/**
 * The provisioning state of the access bridge. \
 * {@link KnownAccessBridgeProvisioningState} can be used interchangeably with AccessBridgeProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: The Accepted status. \
 * **Canceled**: The Canceled status. \
 * **Failed**: The Failed status. \
 * **Provisioning**: The Provisioning status. \
 * **Succeeded**: The Succeeded status.
 */
export type AccessBridgeProvisioningState = string;

/** The allowed names for the access bridge. */
export enum KnownAccessBridgeAllowedName {
  /** The access bridge for bare metal machine bastion access. */
  Bastion = "Bastion",
  /** The access bridge for cluster access to private vault. */
  PrivateVault = "PrivateVault",
  /** The access bridge for access to the storage dashboard. */
  StorageDashboard = "StorageDashboard",
}

/**
 * The allowed names for the access bridge. \
 * {@link KnownAccessBridgeAllowedName} can be used interchangeably with AccessBridgeAllowedName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Bastion**: The access bridge for bare metal machine bastion access. \
 * **PrivateVault**: The access bridge for cluster access to private vault. \
 * **StorageDashboard**: The access bridge for access to the storage dashboard.
 */
export type AccessBridgeAllowedName = string;

/** The complex type of the extended location. */
export interface ExtendedLocation {
  /** The name of the extended location. */
  name: string;
  /** The type of the extended location. */
  type: ExtendedLocationType;
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

/** The supported ExtendedLocation types. */
export enum KnownExtendedLocationType {
  /** Azure Edge Zones location type */
  EdgeZone = "EdgeZone",
  /** Azure Custom Locations type */
  CustomLocation = "CustomLocation",
}

/**
 * The supported ExtendedLocation types. \
 * {@link KnownExtendedLocationType} can be used interchangeably with ExtendedLocationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EdgeZone**: Azure Edge Zones location type \
 * **CustomLocation**: Azure Custom Locations type
 */
export type ExtendedLocationType = string;

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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
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

export function resourceSerializer(_item: Resource): any {
  return {};
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

/** AccessBridgePatchParameters represents the payload for a PATCH request to an access bridge. */
export interface AccessBridgePatchParameters {
  /** The list of the resource properties. */
  properties?: AccessBridgePatchProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function accessBridgePatchParametersSerializer(item: AccessBridgePatchParameters): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : accessBridgePatchPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** AccessBridgePatchProperties identifies the mutable properties for patch operations. */
export interface AccessBridgePatchProperties {
  /** The list of security rules enforced by the access bridge. */
  securityRules?: AccessBridgeSecurityRule[];
}

export function accessBridgePatchPropertiesSerializer(item: AccessBridgePatchProperties): any {
  return {
    securityRules: !item["securityRules"]
      ? item["securityRules"]
      : accessBridgeSecurityRuleArraySerializer(item["securityRules"]),
  };
}

/** The current status of an async operation. */
export interface OperationStatusResult {
  /** The end time of the operation. */
  readonly endTime?: Date;
  /** If present, details of the operation error. */
  readonly error?: ErrorDetail;
  /** Fully qualified ID for the async operation. */
  readonly id?: string;
  /** Name of the async operation. */
  readonly name?: string;
  /** The operations list. */
  readonly operations?: OperationStatusResult[];
  /** Percent of the operation that is complete. */
  readonly percentComplete?: number;
  /** Fully qualified ID of the resource against which the original async operation was started. */
  readonly resourceId?: string;
  /** The start time of the operation. */
  readonly startTime?: Date;
  /** Operation status. */
  status: string;
  /** For actions that run commands or scripts, the exit code of the script execution. */
  readonly exitCode?: string;
  /** For actions that run commands or scripts, the leading bytes of the output of the script execution. */
  readonly outputHead?: string;
  /** For actions that run commands or scripts, a reference to the location of the result. */
  readonly resultRef?: string;
  /** For actions that run commands or scripts, the URL where the full output of the script output can be retrieved. */
  readonly resultUrl?: string;
}

export function operationStatusResultDeserializer(item: any): OperationStatusResult {
  return {
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    id: item["id"],
    name: item["name"],
    operations: !item["operations"]
      ? item["operations"]
      : operationStatusResultArrayDeserializer(item["operations"]),
    percentComplete: item["percentComplete"],
    ...(!item["properties"]
      ? item["properties"]
      : _operationStatusResultPropertiesDeserializer(item["properties"])),
    resourceId: item["resourceId"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    status: item["status"],
  };
}

export function operationStatusResultArrayDeserializer(
  result: Array<OperationStatusResult>,
): any[] {
  return result.map((item) => {
    return operationStatusResultDeserializer(item);
  });
}

/** OperationStatusResultProperties represents additional properties of the operation status result. */
export interface OperationStatusResultProperties {
  /** For actions that run commands or scripts, the exit code of the script execution. */
  readonly exitCode?: string;
  /** For actions that run commands or scripts, the leading bytes of the output of the script execution. */
  readonly outputHead?: string;
  /** For actions that run commands or scripts, a reference to the location of the result. */
  readonly resultRef?: string;
  /** For actions that run commands or scripts, the URL where the full output of the script output can be retrieved. */
  readonly resultUrl?: string;
}

export function operationStatusResultPropertiesDeserializer(
  item: any,
): OperationStatusResultProperties {
  return {
    exitCode: item["exitCode"],
    outputHead: item["outputHead"],
    resultRef: item["resultRef"],
    resultUrl: item["resultUrl"],
  };
}

/** AccessBridgeList represents a paged list of access bridges. */
export interface _AccessBridgeList {
  /** The AccessBridge items on this page */
  value: AccessBridge[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _accessBridgeListDeserializer(item: any): _AccessBridgeList {
  return {
    value: accessBridgeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function accessBridgeArraySerializer(result: Array<AccessBridge>): any[] {
  return result.map((item) => {
    return accessBridgeSerializer(item);
  });
}

export function accessBridgeArrayDeserializer(result: Array<AccessBridge>): any[] {
  return result.map((item) => {
    return accessBridgeDeserializer(item);
  });
}

/** BareMetalMachine represents the physical machine in the rack. */
export interface BareMetalMachine extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The extended location of the resource. This property is required when creating the resource. */
  extendedLocation: ExtendedLocation;
  /** The connection string for the baseboard management controller including IP address and protocol. */
  bmcConnectionString: string;
  /** The credentials of the baseboard management controller on this bare metal machine. */
  bmcCredentials: AdministrativeCredentials;
  /** The MAC address of the BMC device. */
  bmcMacAddress: string;
  /** The MAC address of a NIC connected to the PXE network. */
  bootMacAddress: string;
  /** The custom details provided by the customer. */
  machineDetails: string;
  /** The OS-level hostname assigned to this machine. */
  machineName: string;
  /** The unique internal identifier of the bare metal machine SKU. */
  machineSkuId: string;
  /** The resource ID of the rack where this bare metal machine resides. */
  rackId: string;
  /** The rack slot in which this bare metal machine is located, ordered from the bottom up i.e. the lowest slot is 1. */
  rackSlot: number;
  /** The serial number of the bare metal machine. */
  serialNumber: string;
  /** The current state of any in progress or completed actions. The most recent known instance of each action type is shown. */
  readonly actionStates?: ActionState[];
  /** The list of resource IDs for the other Microsoft.NetworkCloud resources that have attached this network. */
  readonly associatedResourceIds?: string[];
  /** The IPv4 address of the BMC interface for the bare metal machine. */
  readonly bmcIpv4Address?: string;
  /** The IPv6 address of the BMC interface for the bare metal machine. */
  readonly bmcIpv6Address?: string;
  /** The CA certificate information issued by the platform for connecting to TLS interfaces for the bare metal machine. Callers add this certificate to the trusted CA store on the Kubernetes control plane nodes to allow secure communication with the bare metal machine. */
  readonly caCertificate?: CertificateInfo;
  /** The resource ID of the cluster this bare metal machine is associated with. */
  readonly clusterId?: string;
  /** The cordon status of the bare metal machine. */
  readonly cordonStatus?: BareMetalMachineCordonStatus;
  /** The more detailed status of the bare metal machine. */
  readonly detailedStatus?: BareMetalMachineDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The hardware inventory, including information acquired from the model/sku information and from the ironic inspector. */
  readonly hardwareInventory?: HardwareInventory;
  /** The details of the latest hardware validation performed for this bare metal machine. */
  readonly hardwareValidationStatus?: HardwareValidationStatus;
  /** Field Deprecated. These fields will be empty/omitted. The list of the resource IDs for the HybridAksClusters that have nodes hosted on this bare metal machine. */
  readonly hybridAksClustersAssociatedIds?: string[];
  /** The name of this machine represented by the host object in the Cluster's Kubernetes control plane. */
  readonly kubernetesNodeName?: string;
  /** The version of Kubernetes running on this machine. */
  readonly kubernetesVersion?: string;
  /** The cluster version that has been applied to this machine during deployment or a version update. */
  machineClusterVersion?: string;
  /** The list of roles that are assigned to the cluster node running on this machine. */
  readonly machineRoles?: string[];
  /** The monitoring configuration status of the bare metal machine. */
  readonly monitoringConfigurationStatus?: BareMetalMachineMonitoringConfigurationStatus;
  /** The IPv4 address that is assigned to the bare metal machine during the cluster deployment. */
  readonly oamIpv4Address?: string;
  /** The IPv6 address that is assigned to the bare metal machine during the cluster deployment. */
  readonly oamIpv6Address?: string;
  /** The image that is currently provisioned to the OS disk. */
  readonly osImage?: string;
  /** The power state derived from the baseboard management controller. */
  readonly powerState?: BareMetalMachinePowerState;
  /** The indicator of whether the bare metal machine is ready to receive workloads. */
  readonly readyState?: BareMetalMachineReadyState;
  /** The runtime protection status of the bare metal machine. */
  readonly runtimeProtectionStatus?: RuntimeProtectionStatus;
  /** The list of statuses that represent secret rotation activity. */
  readonly secretRotationStatus?: SecretRotationStatus[];
  /** The discovered value of the machine's service tag. */
  readonly serviceTag?: string;
  /** Field Deprecated. These fields will be empty/omitted. The list of the resource IDs for the VirtualMachines that are hosted on this bare metal machine. */
  readonly virtualMachinesAssociatedIds?: string[];
  /** The provisioning state of the bare metal machine. */
  readonly provisioningState?: BareMetalMachineProvisioningState;
}

export function bareMetalMachineSerializer(item: BareMetalMachine): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _bareMetalMachinePropertiesSerializer(item),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function bareMetalMachineDeserializer(item: any): BareMetalMachine {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._bareMetalMachinePropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** BareMetalMachineProperties represents the properties of a bare metal machine. */
export interface BareMetalMachineProperties {
  /** The connection string for the baseboard management controller including IP address and protocol. */
  bmcConnectionString: string;
  /** The credentials of the baseboard management controller on this bare metal machine. */
  bmcCredentials: AdministrativeCredentials;
  /** The MAC address of the BMC device. */
  bmcMacAddress: string;
  /** The MAC address of a NIC connected to the PXE network. */
  bootMacAddress: string;
  /** The custom details provided by the customer. */
  machineDetails: string;
  /** The OS-level hostname assigned to this machine. */
  machineName: string;
  /** The unique internal identifier of the bare metal machine SKU. */
  machineSkuId: string;
  /** The resource ID of the rack where this bare metal machine resides. */
  rackId: string;
  /** The rack slot in which this bare metal machine is located, ordered from the bottom up i.e. the lowest slot is 1. */
  rackSlot: number;
  /** The serial number of the bare metal machine. */
  serialNumber: string;
  /** The current state of any in progress or completed actions. The most recent known instance of each action type is shown. */
  readonly actionStates?: ActionState[];
  /** The list of resource IDs for the other Microsoft.NetworkCloud resources that have attached this network. */
  readonly associatedResourceIds?: string[];
  /** The IPv4 address of the BMC interface for the bare metal machine. */
  readonly bmcIpv4Address?: string;
  /** The IPv6 address of the BMC interface for the bare metal machine. */
  readonly bmcIpv6Address?: string;
  /** The CA certificate information issued by the platform for connecting to TLS interfaces for the bare metal machine. Callers add this certificate to the trusted CA store on the Kubernetes control plane nodes to allow secure communication with the bare metal machine. */
  readonly caCertificate?: CertificateInfo;
  /** The resource ID of the cluster this bare metal machine is associated with. */
  readonly clusterId?: string;
  /** The cordon status of the bare metal machine. */
  readonly cordonStatus?: BareMetalMachineCordonStatus;
  /** The more detailed status of the bare metal machine. */
  readonly detailedStatus?: BareMetalMachineDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The hardware inventory, including information acquired from the model/sku information and from the ironic inspector. */
  readonly hardwareInventory?: HardwareInventory;
  /** The details of the latest hardware validation performed for this bare metal machine. */
  readonly hardwareValidationStatus?: HardwareValidationStatus;
  /** Field Deprecated. These fields will be empty/omitted. The list of the resource IDs for the HybridAksClusters that have nodes hosted on this bare metal machine. */
  readonly hybridAksClustersAssociatedIds?: string[];
  /** The name of this machine represented by the host object in the Cluster's Kubernetes control plane. */
  readonly kubernetesNodeName?: string;
  /** The version of Kubernetes running on this machine. */
  readonly kubernetesVersion?: string;
  /** The cluster version that has been applied to this machine during deployment or a version update. */
  machineClusterVersion?: string;
  /** The list of roles that are assigned to the cluster node running on this machine. */
  readonly machineRoles?: string[];
  /** The monitoring configuration status of the bare metal machine. */
  readonly monitoringConfigurationStatus?: BareMetalMachineMonitoringConfigurationStatus;
  /** The IPv4 address that is assigned to the bare metal machine during the cluster deployment. */
  readonly oamIpv4Address?: string;
  /** The IPv6 address that is assigned to the bare metal machine during the cluster deployment. */
  readonly oamIpv6Address?: string;
  /** The image that is currently provisioned to the OS disk. */
  readonly osImage?: string;
  /** The power state derived from the baseboard management controller. */
  readonly powerState?: BareMetalMachinePowerState;
  /** The indicator of whether the bare metal machine is ready to receive workloads. */
  readonly readyState?: BareMetalMachineReadyState;
  /** The runtime protection status of the bare metal machine. */
  readonly runtimeProtectionStatus?: RuntimeProtectionStatus;
  /** The list of statuses that represent secret rotation activity. */
  readonly secretRotationStatus?: SecretRotationStatus[];
  /** The discovered value of the machine's service tag. */
  readonly serviceTag?: string;
  /** Field Deprecated. These fields will be empty/omitted. The list of the resource IDs for the VirtualMachines that are hosted on this bare metal machine. */
  readonly virtualMachinesAssociatedIds?: string[];
  /** The provisioning state of the bare metal machine. */
  readonly provisioningState?: BareMetalMachineProvisioningState;
}

export function bareMetalMachinePropertiesSerializer(item: BareMetalMachineProperties): any {
  return {
    bmcConnectionString: item["bmcConnectionString"],
    bmcCredentials: administrativeCredentialsSerializer(item["bmcCredentials"]),
    bmcMacAddress: item["bmcMacAddress"],
    bootMacAddress: item["bootMacAddress"],
    machineDetails: item["machineDetails"],
    machineName: item["machineName"],
    machineSkuId: item["machineSkuId"],
    rackId: item["rackId"],
    rackSlot: item["rackSlot"],
    serialNumber: item["serialNumber"],
    machineClusterVersion: item["machineClusterVersion"],
  };
}

export function bareMetalMachinePropertiesDeserializer(item: any): BareMetalMachineProperties {
  return {
    bmcConnectionString: item["bmcConnectionString"],
    bmcCredentials: administrativeCredentialsDeserializer(item["bmcCredentials"]),
    bmcMacAddress: item["bmcMacAddress"],
    bootMacAddress: item["bootMacAddress"],
    machineDetails: item["machineDetails"],
    machineName: item["machineName"],
    machineSkuId: item["machineSkuId"],
    rackId: item["rackId"],
    rackSlot: item["rackSlot"],
    serialNumber: item["serialNumber"],
    actionStates: !item["actionStates"]
      ? item["actionStates"]
      : actionStateArrayDeserializer(item["actionStates"]),
    associatedResourceIds: !item["associatedResourceIds"]
      ? item["associatedResourceIds"]
      : item["associatedResourceIds"].map((p: any) => {
          return p;
        }),
    bmcIpv4Address: item["bmcIpv4Address"],
    bmcIpv6Address: item["bmcIpv6Address"],
    caCertificate: !item["caCertificate"]
      ? item["caCertificate"]
      : certificateInfoDeserializer(item["caCertificate"]),
    clusterId: item["clusterId"],
    cordonStatus: item["cordonStatus"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    hardwareInventory: !item["hardwareInventory"]
      ? item["hardwareInventory"]
      : hardwareInventoryDeserializer(item["hardwareInventory"]),
    hardwareValidationStatus: !item["hardwareValidationStatus"]
      ? item["hardwareValidationStatus"]
      : hardwareValidationStatusDeserializer(item["hardwareValidationStatus"]),
    hybridAksClustersAssociatedIds: !item["hybridAksClustersAssociatedIds"]
      ? item["hybridAksClustersAssociatedIds"]
      : item["hybridAksClustersAssociatedIds"].map((p: any) => {
          return p;
        }),
    kubernetesNodeName: item["kubernetesNodeName"],
    kubernetesVersion: item["kubernetesVersion"],
    machineClusterVersion: item["machineClusterVersion"],
    machineRoles: !item["machineRoles"]
      ? item["machineRoles"]
      : item["machineRoles"].map((p: any) => {
          return p;
        }),
    monitoringConfigurationStatus: !item["monitoringConfigurationStatus"]
      ? item["monitoringConfigurationStatus"]
      : bareMetalMachineMonitoringConfigurationStatusDeserializer(
          item["monitoringConfigurationStatus"],
        ),
    oamIpv4Address: item["oamIpv4Address"],
    oamIpv6Address: item["oamIpv6Address"],
    osImage: item["osImage"],
    powerState: item["powerState"],
    readyState: item["readyState"],
    runtimeProtectionStatus: !item["runtimeProtectionStatus"]
      ? item["runtimeProtectionStatus"]
      : runtimeProtectionStatusDeserializer(item["runtimeProtectionStatus"]),
    secretRotationStatus: !item["secretRotationStatus"]
      ? item["secretRotationStatus"]
      : secretRotationStatusArrayDeserializer(item["secretRotationStatus"]),
    serviceTag: item["serviceTag"],
    virtualMachinesAssociatedIds: !item["virtualMachinesAssociatedIds"]
      ? item["virtualMachinesAssociatedIds"]
      : item["virtualMachinesAssociatedIds"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** AdministrativeCredentials represents the admin credentials for the device requiring password-based authentication. */
export interface AdministrativeCredentials {
  /** The password of the administrator of the device used during initialization. */
  password: string;
  /** The username of the administrator of the device used during initialization. */
  username: string;
}

export function administrativeCredentialsSerializer(item: AdministrativeCredentials): any {
  return { password: item["password"], username: item["username"] };
}

export function administrativeCredentialsDeserializer(item: any): AdministrativeCredentials {
  return {
    password: item["password"],
    username: item["username"],
  };
}

export function actionStateArrayDeserializer(result: Array<ActionState>): any[] {
  return result.map((item) => {
    return actionStateDeserializer(item);
  });
}

/** ActionState represents the state of an action taken against a resource. This can be used to represent both explicitly and implicitly defined action types. */
export interface ActionState {
  /** The representation of the action for which this is a status. Matches ARM resource action format when the action is an ARM-based action. */
  readonly actionType?: string;
  /** The correlation ID for the original action request. Omitted if there is no related correlation ID. */
  readonly correlationId?: string;
  /** The timestamp of when the action reached its final, terminal state. Uses ISO 8601 format. */
  readonly endTime?: string;
  /** The description providing additional context for the status value. May be empty or contain guidance in the case of a failure. */
  readonly message?: string;
  /** The timestamp of when the action began, in ISO 8601 format. */
  readonly startTime?: string;
  /** The status of the action. */
  readonly status?: ActionStateStatus;
  /** The ordered list of the individual steps which make up the action. */
  readonly stepStates?: StepState[];
}

export function actionStateDeserializer(item: any): ActionState {
  return {
    actionType: item["actionType"],
    correlationId: item["correlationId"],
    endTime: item["endTime"],
    message: item["message"],
    startTime: item["startTime"],
    status: item["status"],
    stepStates: !item["stepStates"]
      ? item["stepStates"]
      : stepStateArrayDeserializer(item["stepStates"]),
  };
}

/** The status of the action. */
export enum KnownActionStateStatus {
  /** The completed status. */
  Completed = "Completed",
  /** The in-progress status. */
  InProgress = "InProgress",
  /** The failed status. */
  Failed = "Failed",
}

/**
 * The status of the action. \
 * {@link KnownActionStateStatus} can be used interchangeably with ActionStateStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Completed**: The completed status. \
 * **InProgress**: The in-progress status. \
 * **Failed**: The failed status.
 */
export type ActionStateStatus = string;

export function stepStateArrayDeserializer(result: Array<StepState>): any[] {
  return result.map((item) => {
    return stepStateDeserializer(item);
  });
}

/** StepState represents the state of a step in an action. */
export interface StepState {
  /** The timestamp for when processing of the step reached its terminal state, in ISO 8601 format. */
  readonly endTime?: string;
  /** The message providing additional context for the status value. May be empty, or contain diagnostic information in the case of a failure. */
  readonly message?: string;
  /** The timestamp for when processing of the step began, in ISO 8601 format. */
  readonly startTime?: string;
  /** The status of the step. A value of Completed or Failed indicates a terminal state for the step. */
  readonly status?: StepStateStatus;
  /** The name for the step. */
  readonly stepName?: string;
}

export function stepStateDeserializer(item: any): StepState {
  return {
    endTime: item["endTime"],
    message: item["message"],
    startTime: item["startTime"],
    status: item["status"],
    stepName: item["stepName"],
  };
}

/** The status of the step. A value of Completed or Failed indicates a terminal state for the step. */
export enum KnownStepStateStatus {
  /** The completed status. */
  Completed = "Completed",
  /** The in-progress status. */
  InProgress = "InProgress",
  /** The failed status. */
  Failed = "Failed",
  /** The not started status. */
  NotStarted = "NotStarted",
}

/**
 * The status of the step. A value of Completed or Failed indicates a terminal state for the step. \
 * {@link KnownStepStateStatus} can be used interchangeably with StepStateStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Completed**: The completed status. \
 * **InProgress**: The in-progress status. \
 * **Failed**: The failed status. \
 * **NotStarted**: The not started status.
 */
export type StepStateStatus = string;

/** CertificateInfo represents the non-private information of an X.509 Certificate. */
export interface CertificateInfo {
  /** The hash value of the X.509 Certificate. */
  readonly hash?: string;
  /** The textual value of the X.509 Certificate. */
  readonly value?: string;
}

export function certificateInfoDeserializer(item: any): CertificateInfo {
  return {
    hash: item["hash"],
    value: item["value"],
  };
}

/** The cordon status of the bare metal machine. */
export enum KnownBareMetalMachineCordonStatus {
  /** The bare metal machine is cordoned. */
  Cordoned = "Cordoned",
  /** The bare metal machine is uncordoned. */
  Uncordoned = "Uncordoned",
}

/**
 * The cordon status of the bare metal machine. \
 * {@link KnownBareMetalMachineCordonStatus} can be used interchangeably with BareMetalMachineCordonStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Cordoned**: The bare metal machine is cordoned. \
 * **Uncordoned**: The bare metal machine is uncordoned.
 */
export type BareMetalMachineCordonStatus = string;

/** The more detailed status of the bare metal machine. */
export enum KnownBareMetalMachineDetailedStatus {
  /** The Preparing status. */
  Preparing = "Preparing",
  /** The Error status. */
  Error = "Error",
  /** The Available status. */
  Available = "Available",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
  /** The Provisioned status. */
  Provisioned = "Provisioned",
  /** The Deprovisioning status. */
  Deprovisioning = "Deprovisioning",
}

/**
 * The more detailed status of the bare metal machine. \
 * {@link KnownBareMetalMachineDetailedStatus} can be used interchangeably with BareMetalMachineDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Preparing**: The Preparing status. \
 * **Error**: The Error status. \
 * **Available**: The Available status. \
 * **Provisioning**: The Provisioning status. \
 * **Provisioned**: The Provisioned status. \
 * **Deprovisioning**: The Deprovisioning status.
 */
export type BareMetalMachineDetailedStatus = string;

/** HardwareInventory represents the hardware configuration of this machine as exposed to the customer, including information acquired from the model/sku information and from the ironic inspector. */
export interface HardwareInventory {
  /** Freeform data extracted from the environment about this machine. This information varies depending on the specific hardware and configuration. */
  readonly additionalHostInformation?: string;
  /** The list of network interfaces and associated details for the bare metal machine. */
  readonly interfaces?: HardwareInventoryNetworkInterface[];
  /** Field Deprecated. Will be removed in an upcoming version. The list of network interface cards and associated details for the bare metal machine. */
  readonly nics?: Nic[];
}

export function hardwareInventoryDeserializer(item: any): HardwareInventory {
  return {
    additionalHostInformation: item["additionalHostInformation"],
    interfaces: !item["interfaces"]
      ? item["interfaces"]
      : hardwareInventoryNetworkInterfaceArrayDeserializer(item["interfaces"]),
    nics: !item["nics"] ? item["nics"] : nicArrayDeserializer(item["nics"]),
  };
}

export function hardwareInventoryNetworkInterfaceArrayDeserializer(
  result: Array<HardwareInventoryNetworkInterface>,
): any[] {
  return result.map((item) => {
    return hardwareInventoryNetworkInterfaceDeserializer(item);
  });
}

/** HardwareInventoryNetworkInterface represents the network interface details as part of a hardware inventory. */
export interface HardwareInventoryNetworkInterface {
  /** The current status of the link. */
  readonly linkStatus?: string;
  /** The MAC address associated with this interface. */
  readonly macAddress?: string;
  /** The name of the interface. */
  readonly name?: string;
  /** The resource ID of the network interface for the port on the switch that this machine's interface is connected to. */
  readonly networkInterfaceId?: string;
}

export function hardwareInventoryNetworkInterfaceDeserializer(
  item: any,
): HardwareInventoryNetworkInterface {
  return {
    linkStatus: item["linkStatus"],
    macAddress: item["macAddress"],
    name: item["name"],
    networkInterfaceId: item["networkInterfaceId"],
  };
}

export function nicArrayDeserializer(result: Array<Nic>): any[] {
  return result.map((item) => {
    return nicDeserializer(item);
  });
}

/** Type Deprecated. Will be removed in an upcoming version. Nic represents the network interface card details. */
export interface Nic {
  /** The information about the device connected to this NIC. */
  readonly lldpNeighbor?: LldpNeighbor;
  /** The MAC address associated with this NIC. */
  readonly macAddress?: string;
  /** The name of the NIC/interface. */
  readonly name?: string;
}

export function nicDeserializer(item: any): Nic {
  return {
    lldpNeighbor: !item["lldpNeighbor"]
      ? item["lldpNeighbor"]
      : lldpNeighborDeserializer(item["lldpNeighbor"]),
    macAddress: item["macAddress"],
    name: item["name"],
  };
}

/** Type Deprecated. Will be removed in an upcoming version. LldpNeighbor represents the details about the device connected to the NIC. */
export interface LldpNeighbor {
  /** The descriptive information about the port on the connected device. */
  readonly portDescription?: string;
  /** The system-assigned name of the port on the connected device. */
  readonly portName?: string;
  /** The descriptive information about the connected device. */
  readonly systemDescription?: string;
  /** The system-assigned name of the connected device. */
  readonly systemName?: string;
}

export function lldpNeighborDeserializer(item: any): LldpNeighbor {
  return {
    portDescription: item["portDescription"],
    portName: item["portName"],
    systemDescription: item["systemDescription"],
    systemName: item["systemName"],
  };
}

/** HardwareValidationStatus represents the latest hardware validation details performed for this bare metal machine. */
export interface HardwareValidationStatus {
  /** The timestamp of the hardware validation execution. */
  readonly lastValidationTime?: Date;
  /** The outcome of the hardware validation. */
  readonly result?: BareMetalMachineHardwareValidationResult;
}

export function hardwareValidationStatusDeserializer(item: any): HardwareValidationStatus {
  return {
    lastValidationTime: !item["lastValidationTime"]
      ? item["lastValidationTime"]
      : new Date(item["lastValidationTime"]),
    result: item["result"],
  };
}

/** The outcome of the hardware validation. */
export enum KnownBareMetalMachineHardwareValidationResult {
  /** The hardware validation passed. */
  Pass = "Pass",
  /** The hardware validation failed. */
  Fail = "Fail",
}

/**
 * The outcome of the hardware validation. \
 * {@link KnownBareMetalMachineHardwareValidationResult} can be used interchangeably with BareMetalMachineHardwareValidationResult,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pass**: The hardware validation passed. \
 * **Fail**: The hardware validation failed.
 */
export type BareMetalMachineHardwareValidationResult = string;

/** BareMetalMachineMonitoringConfigurationStatus represents the monitoring configuration status of the bare metal machine. */
export interface BareMetalMachineMonitoringConfigurationStatus {
  /** The log level for the monitoring configuration status of the bare metal machine. */
  logLevel?: BareMetalMachineMetricsConfigurationStatusLogLevel;
  /** The metrics level for the monitoring configuration status of the bare metal machine. */
  metricsLevel?: BareMetalMachineMetricsConfigurationStatusMetricsLevel;
}

export function bareMetalMachineMonitoringConfigurationStatusDeserializer(
  item: any,
): BareMetalMachineMonitoringConfigurationStatus {
  return {
    logLevel: item["logLevel"],
    metricsLevel: item["metricsLevel"],
  };
}

/** The log level for the monitoring configuration status of the bare metal machine. */
export enum KnownBareMetalMachineMetricsConfigurationStatusLogLevel {
  /** Logs are emitted at the default log level. */
  Default = "Default",
  /** Logs are emitted at the Nexus log level. */
  Nexus = "Nexus",
}

/**
 * The log level for the monitoring configuration status of the bare metal machine. \
 * {@link KnownBareMetalMachineMetricsConfigurationStatusLogLevel} can be used interchangeably with BareMetalMachineMetricsConfigurationStatusLogLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Logs are emitted at the default log level. \
 * **Nexus**: Logs are emitted at the Nexus log level.
 */
export type BareMetalMachineMetricsConfigurationStatusLogLevel = string;

/** The metrics level for the monitoring configuration status of the bare metal machine. */
export enum KnownBareMetalMachineMetricsConfigurationStatusMetricsLevel {
  /** Metrics are emitted at the default metrics level. */
  Default = "Default",
  /** Metrics are emitted at the Nexus metrics level. */
  Nexus = "Nexus",
}

/**
 * The metrics level for the monitoring configuration status of the bare metal machine. \
 * {@link KnownBareMetalMachineMetricsConfigurationStatusMetricsLevel} can be used interchangeably with BareMetalMachineMetricsConfigurationStatusMetricsLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Metrics are emitted at the default metrics level. \
 * **Nexus**: Metrics are emitted at the Nexus metrics level.
 */
export type BareMetalMachineMetricsConfigurationStatusMetricsLevel = string;

/** The power state derived from the baseboard management controller. */
export enum KnownBareMetalMachinePowerState {
  /** The bare metal machine was marked as powered on in the latest check of the baseboard management controller. */
  On = "On",
  /** The bare metal machine was marked as powered off in the latest check of the baseboard management controller. */
  Off = "Off",
}

/**
 * The power state derived from the baseboard management controller. \
 * {@link KnownBareMetalMachinePowerState} can be used interchangeably with BareMetalMachinePowerState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **On**: The bare metal machine was marked as powered on in the latest check of the baseboard management controller. \
 * **Off**: The bare metal machine was marked as powered off in the latest check of the baseboard management controller.
 */
export type BareMetalMachinePowerState = string;

/** The indicator of whether the bare metal machine is ready to receive workloads. */
export enum KnownBareMetalMachineReadyState {
  /** The bare metal machine is ready to receive workloads. */
  True = "True",
  /** The bare metal machine is not ready to receive workloads. */
  False = "False",
}

/**
 * The indicator of whether the bare metal machine is ready to receive workloads. \
 * {@link KnownBareMetalMachineReadyState} can be used interchangeably with BareMetalMachineReadyState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: The bare metal machine is ready to receive workloads. \
 * **False**: The bare metal machine is not ready to receive workloads.
 */
export type BareMetalMachineReadyState = string;

/** RuntimeProtectionStatus represents the runtime protection status of the bare metal machine. */
export interface RuntimeProtectionStatus {
  /** The runtime protection agent health status. */
  readonly agentHealthStatus?: RuntimeProtectionAgentHealthStatus;
  /** The runtime protection agent health status issues, if present. */
  readonly agentHealthStatusIssues?: string[];
  /** The runtime protection agent license status. */
  readonly agentLicenseStatus?: RuntimeProtectionAgentLicenseStatus;
  /** The definition update mode for runtime protection. */
  readonly definitionUpdateMode?: RuntimeProtectionDefinitionUpdateMode;
  /** The timestamp when the malware definitions were last updated. */
  readonly definitionsLastUpdated?: Date;
  /** The version of the malware definitions. */
  readonly definitionsVersion?: string;
  /** The enforcement level set for the runtime protection on the bare metal machine. */
  readonly enforcementLevel?: RuntimeProtectionEnforcementLevel;
  /** The timestamp of the most recently completed scan, or empty if there has never been a scan. */
  readonly scanCompletedTime?: Date;
  /** The timestamp of the most recently scheduled scan, or empty if no scan has been scheduled. */
  readonly scanScheduledTime?: Date;
  /** The timestamp of the most recently started scan, or empty if there has never been a scan. */
  readonly scanStartedTime?: Date;
}

export function runtimeProtectionStatusDeserializer(item: any): RuntimeProtectionStatus {
  return {
    agentHealthStatus: item["agentHealthStatus"],
    agentHealthStatusIssues: !item["agentHealthStatusIssues"]
      ? item["agentHealthStatusIssues"]
      : item["agentHealthStatusIssues"].map((p: any) => {
          return p;
        }),
    agentLicenseStatus: item["agentLicenseStatus"],
    definitionUpdateMode: item["definitionUpdateMode"],
    definitionsLastUpdated: !item["definitionsLastUpdated"]
      ? item["definitionsLastUpdated"]
      : new Date(item["definitionsLastUpdated"]),
    definitionsVersion: item["definitionsVersion"],
    enforcementLevel: item["enforcementLevel"],
    scanCompletedTime: !item["scanCompletedTime"]
      ? item["scanCompletedTime"]
      : new Date(item["scanCompletedTime"]),
    scanScheduledTime: !item["scanScheduledTime"]
      ? item["scanScheduledTime"]
      : new Date(item["scanScheduledTime"]),
    scanStartedTime: !item["scanStartedTime"]
      ? item["scanStartedTime"]
      : new Date(item["scanStartedTime"]),
  };
}

/** The runtime protection agent health status. */
export enum KnownRuntimeProtectionAgentHealthStatus {
  /** The runtime protection agent is healthy. */
  Healthy = "Healthy",
  /** The runtime protection agent has health issues. */
  Unhealthy = "Unhealthy",
}

/**
 * The runtime protection agent health status. \
 * {@link KnownRuntimeProtectionAgentHealthStatus} can be used interchangeably with RuntimeProtectionAgentHealthStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Healthy**: The runtime protection agent is healthy. \
 * **Unhealthy**: The runtime protection agent has health issues.
 */
export type RuntimeProtectionAgentHealthStatus = string;

/** The runtime protection agent license status. */
export enum KnownRuntimeProtectionAgentLicenseStatus {
  /** The runtime protection agent license is valid. */
  Licensed = "Licensed",
  /** The runtime protection agent license is not valid. */
  Unlicensed = "Unlicensed",
}

/**
 * The runtime protection agent license status. \
 * {@link KnownRuntimeProtectionAgentLicenseStatus} can be used interchangeably with RuntimeProtectionAgentLicenseStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Licensed**: The runtime protection agent license is valid. \
 * **Unlicensed**: The runtime protection agent license is not valid.
 */
export type RuntimeProtectionAgentLicenseStatus = string;

/** The definition update mode for runtime protection. */
export enum KnownRuntimeProtectionDefinitionUpdateMode {
  /** Update definitions automatically through the connected runtime protection agent. */
  Automatic = "Automatic",
  /** Do not update definitions. */
  None = "None",
}

/**
 * The definition update mode for runtime protection. \
 * {@link KnownRuntimeProtectionDefinitionUpdateMode} can be used interchangeably with RuntimeProtectionDefinitionUpdateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Automatic**: Update definitions automatically through the connected runtime protection agent. \
 * **None**: Do not update definitions.
 */
export type RuntimeProtectionDefinitionUpdateMode = string;

/** The mode of operation for runtime protection. */
export enum KnownRuntimeProtectionEnforcementLevel {
  /** Real-time scans detect but do not remediate detected issues. */
  Audit = "Audit",
  /** Real-time scans are disabled and can not be triggered. */
  Disabled = "Disabled",
  /** Real-time scans are disabled but can be triggered to remediate detected issues. */
  OnDemand = "OnDemand",
  /** Real-time scans are disabled but can be triggered to detect issues without remediation. */
  Passive = "Passive",
  /** Real-time scans detect and remediate detected issues. */
  RealTime = "RealTime",
}

/**
 * The mode of operation for runtime protection. \
 * {@link KnownRuntimeProtectionEnforcementLevel} can be used interchangeably with RuntimeProtectionEnforcementLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Audit**: Real-time scans detect but do not remediate detected issues. \
 * **Disabled**: Real-time scans are disabled and can not be triggered. \
 * **OnDemand**: Real-time scans are disabled but can be triggered to remediate detected issues. \
 * **Passive**: Real-time scans are disabled but can be triggered to detect issues without remediation. \
 * **RealTime**: Real-time scans detect and remediate detected issues.
 */
export type RuntimeProtectionEnforcementLevel = string;

export function secretRotationStatusArrayDeserializer(result: Array<SecretRotationStatus>): any[] {
  return result.map((item) => {
    return secretRotationStatusDeserializer(item);
  });
}

/** SecretRotationStatus represents the status of a secret rotation. */
export interface SecretRotationStatus {
  /** The maximum number of days the secret may be used before it must be changed. */
  readonly expirePeriodDays?: number;
  /** The date and time when the secret was last changed. */
  readonly lastRotationTime?: Date;
  /** The number of days a secret exists before rotations will be attempted. */
  readonly rotationPeriodDays?: number;
  /** The reference to the secret in a key vault. */
  readonly secretArchiveReference?: SecretArchiveReference;
  /** The type name used to identify the purpose of the secret. */
  readonly secretType?: string;
}

export function secretRotationStatusDeserializer(item: any): SecretRotationStatus {
  return {
    expirePeriodDays: item["expirePeriodDays"],
    lastRotationTime: !item["lastRotationTime"]
      ? item["lastRotationTime"]
      : new Date(item["lastRotationTime"]),
    rotationPeriodDays: item["rotationPeriodDays"],
    secretArchiveReference: !item["secretArchiveReference"]
      ? item["secretArchiveReference"]
      : secretArchiveReferenceDeserializer(item["secretArchiveReference"]),
    secretType: item["secretType"],
  };
}

/** SecretArchiveReference represents the reference to a secret in a key vault. */
export interface SecretArchiveReference {
  /** The resource ID of the key vault containing the secret. */
  readonly keyVaultId?: string;
  /** The URI of the key containing the secret. */
  readonly keyVaultUri?: string;
  /** The name of the secret in the key vault. */
  readonly secretName?: string;
  /** The version of the secret in the key vault. */
  readonly secretVersion?: string;
}

export function secretArchiveReferenceDeserializer(item: any): SecretArchiveReference {
  return {
    keyVaultId: item["keyVaultId"],
    keyVaultUri: item["keyVaultUri"],
    secretName: item["secretName"],
    secretVersion: item["secretVersion"],
  };
}

/** The provisioning state of the bare metal machine. */
export enum KnownBareMetalMachineProvisioningState {
  /** The Succeeded status. */
  Succeeded = "Succeeded",
  /** The Failed status. */
  Failed = "Failed",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
  /** The Accepted status. */
  Accepted = "Accepted",
}

/**
 * The provisioning state of the bare metal machine. \
 * {@link KnownBareMetalMachineProvisioningState} can be used interchangeably with BareMetalMachineProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The Succeeded status. \
 * **Failed**: The Failed status. \
 * **Canceled**: The Canceled status. \
 * **Provisioning**: The Provisioning status. \
 * **Accepted**: The Accepted status.
 */
export type BareMetalMachineProvisioningState = string;

/** BareMetalMachinePatchParameters represents the body of the request to patch bare metal machine properties. */
export interface BareMetalMachinePatchParameters {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The details provided by the customer during the creation of rack manifests that allows for custom data to be associated with this machine. */
  machineDetails?: string;
}

export function bareMetalMachinePatchParametersSerializer(
  item: BareMetalMachinePatchParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, ["machineDetails"])
      ? undefined
      : _bareMetalMachinePatchParametersPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** BareMetalMachinePatchProperties represents the properties of the bare metal machine that can be patched. */
export interface BareMetalMachinePatchProperties {
  /** The details provided by the customer during the creation of rack manifests that allows for custom data to be associated with this machine. */
  machineDetails?: string;
}

export function bareMetalMachinePatchPropertiesSerializer(
  item: BareMetalMachinePatchProperties,
): any {
  return { machineDetails: item["machineDetails"] };
}

/** BareMetalMachineList represents a list of bare metal machines. */
export interface _BareMetalMachineList {
  /** The BareMetalMachine items on this page */
  value: BareMetalMachine[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _bareMetalMachineListDeserializer(item: any): _BareMetalMachineList {
  return {
    value: bareMetalMachineArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function bareMetalMachineArraySerializer(result: Array<BareMetalMachine>): any[] {
  return result.map((item) => {
    return bareMetalMachineSerializer(item);
  });
}

export function bareMetalMachineArrayDeserializer(result: Array<BareMetalMachine>): any[] {
  return result.map((item) => {
    return bareMetalMachineDeserializer(item);
  });
}

/** BareMetalMachineCordonParameters represents the body of the request to evacuate workloads from node on a bare metal machine. */
export interface BareMetalMachineCordonParameters {
  /** The indicator of whether to evacuate the node workload when the bare metal machine is cordoned. */
  evacuate?: BareMetalMachineEvacuate;
}

export function bareMetalMachineCordonParametersSerializer(
  item: BareMetalMachineCordonParameters,
): any {
  return { evacuate: item["evacuate"] };
}

/** The indicator of whether to evacuate the node workload when the bare metal machine is cordoned. */
export enum KnownBareMetalMachineEvacuate {
  /** Evacuate workloads from the node when the bare metal machine is cordoned. */
  True = "True",
  /** Do not evacuate workloads from the node when the bare metal machine is cordoned. */
  False = "False",
}

/**
 * The indicator of whether to evacuate the node workload when the bare metal machine is cordoned. \
 * {@link KnownBareMetalMachineEvacuate} can be used interchangeably with BareMetalMachineEvacuate,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: Evacuate workloads from the node when the bare metal machine is cordoned. \
 * **False**: Do not evacuate workloads from the node when the bare metal machine is cordoned.
 */
export type BareMetalMachineEvacuate = string;

/** BareMetalMachinePowerOffParameters represents the body of the request to power off bare metal machine. */
export interface BareMetalMachinePowerOffParameters {
  /** The indicator of whether to skip the graceful OS shutdown and power off the bare metal machine immediately. */
  skipShutdown?: BareMetalMachineSkipShutdown;
}

export function bareMetalMachinePowerOffParametersSerializer(
  item: BareMetalMachinePowerOffParameters,
): any {
  return { skipShutdown: item["skipShutdown"] };
}

/** The indicator of whether to skip the graceful OS shutdown and power off the bare metal machine immediately. */
export enum KnownBareMetalMachineSkipShutdown {
  /** Skip the graceful OS shutdown and power off the bare metal machine immediately. */
  True = "True",
  /** Do not skip the graceful OS shutdown and power off the bare metal machine immediately. */
  False = "False",
}

/**
 * The indicator of whether to skip the graceful OS shutdown and power off the bare metal machine immediately. \
 * {@link KnownBareMetalMachineSkipShutdown} can be used interchangeably with BareMetalMachineSkipShutdown,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: Skip the graceful OS shutdown and power off the bare metal machine immediately. \
 * **False**: Do not skip the graceful OS shutdown and power off the bare metal machine immediately.
 */
export type BareMetalMachineSkipShutdown = string;

/** BareMetalMachineReimageParameters represents the body of the request to reimage a bare metal machine. */
export interface BareMetalMachineReimageParameters {
  /** The safeguard mode to use for the reimage action, where None indicates to bypass safeguards and All indicates to utilize all safeguards. If not specified, the default is All. */
  safeguardMode?: BareMetalMachineReimageSafeguardMode;
}

export function bareMetalMachineReimageParametersSerializer(
  item: BareMetalMachineReimageParameters,
): any {
  return { safeguardMode: item["safeguardMode"] };
}

/** The safeguard mode to use for the reimage action, where None indicates to bypass safeguards and All indicates to utilize all safeguards. */
export enum KnownBareMetalMachineReimageSafeguardMode {
  /** Run all pre‑operation validation checks before performing the reimage. If any check fails, the request is rejected and no changes are made. */
  All = "All",
  /** Skip all safeguards and perform the reimage without running pre‑operation validation checks. */
  None = "None",
}

/**
 * The safeguard mode to use for the reimage action, where None indicates to bypass safeguards and All indicates to utilize all safeguards. \
 * {@link KnownBareMetalMachineReimageSafeguardMode} can be used interchangeably with BareMetalMachineReimageSafeguardMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **All**: Run all pre‑operation validation checks before performing the reimage. If any check fails, the request is rejected and no changes are made. \
 * **None**: Skip all safeguards and perform the reimage without running pre‑operation validation checks.
 */
export type BareMetalMachineReimageSafeguardMode = string;

/** BareMetalMachineReplaceParameters represents the body of the request to physically swap a bare metal machine for another. */
export interface BareMetalMachineReplaceParameters {
  /** The credentials of the baseboard management controller on this bare metal machine. The password field is expected to be an Azure Key Vault key URL. Until the cluster is converted to utilize managed identity by setting the secret archive settings, the actual password value should be provided instead. */
  bmcCredentials?: AdministrativeCredentials;
  /** The MAC address of the BMC device. */
  bmcMacAddress?: string;
  /** The MAC address of a NIC connected to the PXE network. */
  bootMacAddress?: string;
  /** The OS-level hostname assigned to this machine. */
  machineName?: string;
  /** The safeguard mode to use for the replace action, where None indicates to bypass safeguards and All indicates to utilize all safeguards. */
  safeguardMode?: BareMetalMachineReplaceSafeguardMode;
  /** The serial number of the bare metal machine. */
  serialNumber?: string;
  /** The indicator of whether to bypass clearing storage while replacing a bare metal machine. */
  storagePolicy?: BareMetalMachineReplaceStoragePolicy;
}

export function bareMetalMachineReplaceParametersSerializer(
  item: BareMetalMachineReplaceParameters,
): any {
  return {
    bmcCredentials: !item["bmcCredentials"]
      ? item["bmcCredentials"]
      : administrativeCredentialsSerializer(item["bmcCredentials"]),
    bmcMacAddress: item["bmcMacAddress"],
    bootMacAddress: item["bootMacAddress"],
    machineName: item["machineName"],
    safeguardMode: item["safeguardMode"],
    serialNumber: item["serialNumber"],
    storagePolicy: item["storagePolicy"],
  };
}

/** The safeguard mode to use for the replace action, where None indicates to bypass safeguards and All indicates to utilize all safeguards. */
export enum KnownBareMetalMachineReplaceSafeguardMode {
  /** All safeguards will be utilized during the replace action. */
  All = "All",
  /** No safeguards will be utilized during the replace action. */
  None = "None",
}

/**
 * The safeguard mode to use for the replace action, where None indicates to bypass safeguards and All indicates to utilize all safeguards. \
 * {@link KnownBareMetalMachineReplaceSafeguardMode} can be used interchangeably with BareMetalMachineReplaceSafeguardMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **All**: All safeguards will be utilized during the replace action. \
 * **None**: No safeguards will be utilized during the replace action.
 */
export type BareMetalMachineReplaceSafeguardMode = string;

/** The indicator of whether to bypass clearing storage while replacing a bare metal machine. */
export enum KnownBareMetalMachineReplaceStoragePolicy {
  /** Storage will be preserved and not cleared during the replace action. */
  Preserve = "Preserve",
  /** Storage will be cleared during the replace action. */
  DiscardAll = "DiscardAll",
}

/**
 * The indicator of whether to bypass clearing storage while replacing a bare metal machine. \
 * {@link KnownBareMetalMachineReplaceStoragePolicy} can be used interchangeably with BareMetalMachineReplaceStoragePolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Preserve**: Storage will be preserved and not cleared during the replace action. \
 * **DiscardAll**: Storage will be cleared during the replace action.
 */
export type BareMetalMachineReplaceStoragePolicy = string;

/** BareMetalMachineRunCommandParameters represents the body of the request to execute a script on the bare metal machine. */
export interface BareMetalMachineRunCommandParameters {
  /** The list of string arguments that will be passed to the script in order as separate arguments. */
  arguments?: string[];
  /** The maximum time the script is allowed to run. If the execution time exceeds the maximum, the script will be stopped, any output produced until then will be captured, and the exit code matching a timeout will be returned (252). */
  limitTimeSeconds: number;
  /** The base64 encoded script to execute on the bare metal machine. */
  script: string;
}

export function bareMetalMachineRunCommandParametersSerializer(
  item: BareMetalMachineRunCommandParameters,
): any {
  return {
    arguments: !item["arguments"]
      ? item["arguments"]
      : item["arguments"].map((p: any) => {
          return p;
        }),
    limitTimeSeconds: item["limitTimeSeconds"],
    script: item["script"],
  };
}

/** BareMetalMachineRunDataExtractsParameters represents the body of request containing list of curated data extraction commands to run on the bare metal machine. */
export interface BareMetalMachineRunDataExtractsParameters {
  /** The list of curated data extraction commands to be executed directly against the target machine. */
  commands: BareMetalMachineCommandSpecification[];
  /** The maximum time the commands are allowed to run. If the execution time exceeds the maximum, the script will be stopped, any output produced until then will be captured, and the exit code matching a timeout will be returned (252). */
  limitTimeSeconds: number;
}

export function bareMetalMachineRunDataExtractsParametersSerializer(
  item: BareMetalMachineRunDataExtractsParameters,
): any {
  return {
    commands: bareMetalMachineCommandSpecificationArraySerializer(item["commands"]),
    limitTimeSeconds: item["limitTimeSeconds"],
  };
}

export function bareMetalMachineCommandSpecificationArraySerializer(
  result: Array<BareMetalMachineCommandSpecification>,
): any[] {
  return result.map((item) => {
    return bareMetalMachineCommandSpecificationSerializer(item);
  });
}

/** BareMetalMachineCommandSpecification represents the command and optional arguments to exercise against the bare metal machine. */
export interface BareMetalMachineCommandSpecification {
  /** The list of string arguments that will be passed to the script in order as separate arguments. */
  arguments?: string[];
  /** The command to execute against the bare metal machine. */
  command: string;
}

export function bareMetalMachineCommandSpecificationSerializer(
  item: BareMetalMachineCommandSpecification,
): any {
  return {
    arguments: !item["arguments"]
      ? item["arguments"]
      : item["arguments"].map((p: any) => {
          return p;
        }),
    command: item["command"],
  };
}

/** BareMetalMachineRunReadCommandsParameters represents the body of request containing list of read-only commands to run on the bare metal machine. */
export interface BareMetalMachineRunReadCommandsParameters {
  /** The list of read-only commands to be executed directly against the target machine. */
  commands: BareMetalMachineCommandSpecification[];
  /** The maximum time the commands are allowed to run. If the execution time exceeds the maximum, the script will be stopped, any output produced until then will be captured, and the exit code matching a timeout will be returned (252). */
  limitTimeSeconds: number;
}

export function bareMetalMachineRunReadCommandsParametersSerializer(
  item: BareMetalMachineRunReadCommandsParameters,
): any {
  return {
    commands: bareMetalMachineCommandSpecificationArraySerializer(item["commands"]),
    limitTimeSeconds: item["limitTimeSeconds"],
  };
}

/** Upon creation, the additional services that are provided by the platform will be allocated and represented in the status of this resource. All resources associated with this cloud services network will be part of the same layer 2 (L2) isolation domain. At least one service network must be created but may be reused across many virtual machines and/or Hybrid AKS clusters. */
export interface CloudServicesNetwork extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The extended location of the resource. This property is required when creating the resource. */
  extendedLocation: ExtendedLocation;
  /** The list of egress endpoints. This allows for connection from a Hybrid AKS cluster to the specified endpoint. */
  additionalEgressEndpoints?: EgressEndpoint[];
  /** The indicator of whether the platform default endpoints are allowed for the egress traffic. */
  enableDefaultEgressEndpoints?: CloudServicesNetworkEnableDefaultEgressEndpoints;
  /** The storage options for the cloud services network. */
  storageOptions?: CloudServicesNetworkStorageOptions;
  /** The list of resource IDs for the other Microsoft.NetworkCloud resources that have attached this network. */
  readonly associatedResourceIds?: string[];
  /** The resource ID of the Network Cloud cluster this cloud services network is associated with. */
  readonly clusterId?: string;
  /** The more detailed status of the cloud services network. */
  readonly detailedStatus?: CloudServicesNetworkDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The full list of additional and default egress endpoints that are currently enabled. */
  readonly enabledEgressEndpoints?: EgressEndpoint[];
  /** Field Deprecated. These fields will be empty/omitted. The list of Hybrid AKS cluster resource IDs that are associated with this cloud services network. */
  readonly hybridAksClustersAssociatedIds?: string[];
  /** The name of the interface that will be present in the virtual machine to represent this network. */
  readonly interfaceName?: string;
  /** The storage status for the cloud services network. */
  readonly storageStatus?: CloudServicesNetworkStorageStatus;
  /** Field Deprecated. These fields will be empty/omitted. The list of virtual machine resource IDs, excluding any Hybrid AKS virtual machines, that are currently using this cloud services network. */
  readonly virtualMachinesAssociatedIds?: string[];
  /** The provisioning state of the cloud services network. */
  readonly provisioningState?: CloudServicesNetworkProvisioningState;
}

export function cloudServicesNetworkSerializer(item: CloudServicesNetwork): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "additionalEgressEndpoints",
      "enableDefaultEgressEndpoints",
      "storageOptions",
    ])
      ? undefined
      : _cloudServicesNetworkPropertiesSerializer(item),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function cloudServicesNetworkDeserializer(item: any): CloudServicesNetwork {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _cloudServicesNetworkPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** CloudServicesNetworkProperties represents properties of the cloud services network. */
export interface CloudServicesNetworkProperties {
  /** The list of egress endpoints. This allows for connection from a Hybrid AKS cluster to the specified endpoint. */
  additionalEgressEndpoints?: EgressEndpoint[];
  /** The indicator of whether the platform default endpoints are allowed for the egress traffic. */
  enableDefaultEgressEndpoints?: CloudServicesNetworkEnableDefaultEgressEndpoints;
  /** The storage options for the cloud services network. */
  storageOptions?: CloudServicesNetworkStorageOptions;
  /** The list of resource IDs for the other Microsoft.NetworkCloud resources that have attached this network. */
  readonly associatedResourceIds?: string[];
  /** The resource ID of the Network Cloud cluster this cloud services network is associated with. */
  readonly clusterId?: string;
  /** The more detailed status of the cloud services network. */
  readonly detailedStatus?: CloudServicesNetworkDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The full list of additional and default egress endpoints that are currently enabled. */
  readonly enabledEgressEndpoints?: EgressEndpoint[];
  /** Field Deprecated. These fields will be empty/omitted. The list of Hybrid AKS cluster resource IDs that are associated with this cloud services network. */
  readonly hybridAksClustersAssociatedIds?: string[];
  /** The name of the interface that will be present in the virtual machine to represent this network. */
  readonly interfaceName?: string;
  /** The storage status for the cloud services network. */
  readonly storageStatus?: CloudServicesNetworkStorageStatus;
  /** Field Deprecated. These fields will be empty/omitted. The list of virtual machine resource IDs, excluding any Hybrid AKS virtual machines, that are currently using this cloud services network. */
  readonly virtualMachinesAssociatedIds?: string[];
  /** The provisioning state of the cloud services network. */
  readonly provisioningState?: CloudServicesNetworkProvisioningState;
}

export function cloudServicesNetworkPropertiesSerializer(
  item: CloudServicesNetworkProperties,
): any {
  return {
    additionalEgressEndpoints: !item["additionalEgressEndpoints"]
      ? item["additionalEgressEndpoints"]
      : egressEndpointArraySerializer(item["additionalEgressEndpoints"]),
    enableDefaultEgressEndpoints: item["enableDefaultEgressEndpoints"],
    storageOptions: !item["storageOptions"]
      ? item["storageOptions"]
      : cloudServicesNetworkStorageOptionsSerializer(item["storageOptions"]),
  };
}

export function cloudServicesNetworkPropertiesDeserializer(
  item: any,
): CloudServicesNetworkProperties {
  return {
    additionalEgressEndpoints: !item["additionalEgressEndpoints"]
      ? item["additionalEgressEndpoints"]
      : egressEndpointArrayDeserializer(item["additionalEgressEndpoints"]),
    enableDefaultEgressEndpoints: item["enableDefaultEgressEndpoints"],
    storageOptions: !item["storageOptions"]
      ? item["storageOptions"]
      : cloudServicesNetworkStorageOptionsDeserializer(item["storageOptions"]),
    associatedResourceIds: !item["associatedResourceIds"]
      ? item["associatedResourceIds"]
      : item["associatedResourceIds"].map((p: any) => {
          return p;
        }),
    clusterId: item["clusterId"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    enabledEgressEndpoints: !item["enabledEgressEndpoints"]
      ? item["enabledEgressEndpoints"]
      : egressEndpointArrayDeserializer(item["enabledEgressEndpoints"]),
    hybridAksClustersAssociatedIds: !item["hybridAksClustersAssociatedIds"]
      ? item["hybridAksClustersAssociatedIds"]
      : item["hybridAksClustersAssociatedIds"].map((p: any) => {
          return p;
        }),
    interfaceName: item["interfaceName"],
    storageStatus: !item["storageStatus"]
      ? item["storageStatus"]
      : cloudServicesNetworkStorageStatusDeserializer(item["storageStatus"]),
    virtualMachinesAssociatedIds: !item["virtualMachinesAssociatedIds"]
      ? item["virtualMachinesAssociatedIds"]
      : item["virtualMachinesAssociatedIds"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

export function egressEndpointArraySerializer(result: Array<EgressEndpoint>): any[] {
  return result.map((item) => {
    return egressEndpointSerializer(item);
  });
}

export function egressEndpointArrayDeserializer(result: Array<EgressEndpoint>): any[] {
  return result.map((item) => {
    return egressEndpointDeserializer(item);
  });
}

/** EgressEndpoint represents the connection from a cloud services network to the specified endpoint for a common purpose. */
export interface EgressEndpoint {
  /** The descriptive category name of endpoints accessible by the AKS agent node. For example, azure-resource-management, API server, etc. The platform egress endpoints provided by default will use the category 'default'. */
  category: string;
  /** The list of endpoint dependencies. */
  endpoints: EndpointDependency[];
}

export function egressEndpointSerializer(item: EgressEndpoint): any {
  return {
    category: item["category"],
    endpoints: endpointDependencyArraySerializer(item["endpoints"]),
  };
}

export function egressEndpointDeserializer(item: any): EgressEndpoint {
  return {
    category: item["category"],
    endpoints: endpointDependencyArrayDeserializer(item["endpoints"]),
  };
}

export function endpointDependencyArraySerializer(result: Array<EndpointDependency>): any[] {
  return result.map((item) => {
    return endpointDependencySerializer(item);
  });
}

export function endpointDependencyArrayDeserializer(result: Array<EndpointDependency>): any[] {
  return result.map((item) => {
    return endpointDependencyDeserializer(item);
  });
}

/** EndpointDependency represents the definition of an endpoint, including the domain and details. */
export interface EndpointDependency {
  /** The domain name of the dependency. */
  domainName: string;
  /** The port of this endpoint. */
  port?: number;
}

export function endpointDependencySerializer(item: EndpointDependency): any {
  return { domainName: item["domainName"], port: item["port"] };
}

export function endpointDependencyDeserializer(item: any): EndpointDependency {
  return {
    domainName: item["domainName"],
    port: item["port"],
  };
}

/** The indicator of whether the platform default endpoints are allowed for the egress traffic. */
export enum KnownCloudServicesNetworkEnableDefaultEgressEndpoints {
  /** Enable default egress endpoints. */
  True = "True",
  /** Disable default egress endpoints. */
  False = "False",
}

/**
 * The indicator of whether the platform default endpoints are allowed for the egress traffic. \
 * {@link KnownCloudServicesNetworkEnableDefaultEgressEndpoints} can be used interchangeably with CloudServicesNetworkEnableDefaultEgressEndpoints,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: Enable default egress endpoints. \
 * **False**: Disable default egress endpoints.
 */
export type CloudServicesNetworkEnableDefaultEgressEndpoints = string;

/** CloudServicesNetworkStorageOptions represents the storage options for the cloud services network. */
export interface CloudServicesNetworkStorageOptions {
  /** The indicator to enable shared storage on the cloud services network. If not specified, the allocation will align with the standard storage enablement. */
  mode?: CloudServicesNetworkStorageMode;
  /** The requested storage allocation for the volume in Mebibytes. */
  sizeMiB?: number;
  /** The resource ID of the storage appliance that hosts the storage. */
  storageApplianceId?: string;
}

export function cloudServicesNetworkStorageOptionsSerializer(
  item: CloudServicesNetworkStorageOptions,
): any {
  return {
    mode: item["mode"],
    sizeMiB: item["sizeMiB"],
    storageApplianceId: item["storageApplianceId"],
  };
}

export function cloudServicesNetworkStorageOptionsDeserializer(
  item: any,
): CloudServicesNetworkStorageOptions {
  return {
    mode: item["mode"],
    sizeMiB: item["sizeMiB"],
    storageApplianceId: item["storageApplianceId"],
  };
}

/** The indicator to enable shared storage on the cloud services network. If not specified, the allocation will align with the standard storage enablement. */
export enum KnownCloudServicesNetworkStorageMode {
  /** No shared storage. */
  None = "None",
  /** Standard shared storage. */
  Standard = "Standard",
}

/**
 * The indicator to enable shared storage on the cloud services network. If not specified, the allocation will align with the standard storage enablement. \
 * {@link KnownCloudServicesNetworkStorageMode} can be used interchangeably with CloudServicesNetworkStorageMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No shared storage. \
 * **Standard**: Standard shared storage.
 */
export type CloudServicesNetworkStorageMode = string;

/** The more detailed status of the cloud services network. */
export enum KnownCloudServicesNetworkDetailedStatus {
  /** The Error status. */
  Error = "Error",
  /** The Available status. */
  Available = "Available",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
}

/**
 * The more detailed status of the cloud services network. \
 * {@link KnownCloudServicesNetworkDetailedStatus} can be used interchangeably with CloudServicesNetworkDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Error**: The Error status. \
 * **Available**: The Available status. \
 * **Provisioning**: The Provisioning status.
 */
export type CloudServicesNetworkDetailedStatus = string;

/** CloudServicesNetworkStorageStatus represents the storage status of the cloud services network. */
export interface CloudServicesNetworkStorageStatus {
  /** The indicator of if shared storage is enabled on the cloud services network. */
  readonly mode?: CloudServicesNetworkStorageMode;
  /** The size in Mebibytes of the storage allocation. */
  readonly sizeMiB?: number;
  /** The status of the storage allocation for the cloud services network. */
  readonly status?: CloudServicesNetworkStorageStatusStatus;
  /** The description for the status of the shared storage. */
  readonly statusMessage?: string;
  /** The resource ID of the volume created to host the shared storage. */
  readonly volumeId?: string;
}

export function cloudServicesNetworkStorageStatusDeserializer(
  item: any,
): CloudServicesNetworkStorageStatus {
  return {
    mode: item["mode"],
    sizeMiB: item["sizeMiB"],
    status: item["status"],
    statusMessage: item["statusMessage"],
    volumeId: item["volumeId"],
  };
}

/** The status of the storage allocation for the cloud services network. */
export enum KnownCloudServicesNetworkStorageStatusStatus {
  /** The storage allocation is available */
  Available = "Available",
  /** The storage allocation is expanding the volume. */
  ExpandingVolume = "ExpandingVolume",
  /** The expansion of the storage allocation has failed. */
  ExpansionFailed = "ExpansionFailed",
  /** The storage allocation is initializing. */
  Initializing = "Initializing",
  /** The storage allocation has no status. */
  None = "None",
  /** The storage allocation is being repaired. */
  Repairing = "Repairing",
}

/**
 * The status of the storage allocation for the cloud services network. \
 * {@link KnownCloudServicesNetworkStorageStatusStatus} can be used interchangeably with CloudServicesNetworkStorageStatusStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Available**: The storage allocation is available \
 * **ExpandingVolume**: The storage allocation is expanding the volume. \
 * **ExpansionFailed**: The expansion of the storage allocation has failed. \
 * **Initializing**: The storage allocation is initializing. \
 * **None**: The storage allocation has no status. \
 * **Repairing**: The storage allocation is being repaired.
 */
export type CloudServicesNetworkStorageStatusStatus = string;

/** The provisioning state of the cloud services network. */
export enum KnownCloudServicesNetworkProvisioningState {
  /** The Succeeded status. */
  Succeeded = "Succeeded",
  /** The Failed status. */
  Failed = "Failed",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
  /** The Accepted status. */
  Accepted = "Accepted",
}

/**
 * The provisioning state of the cloud services network. \
 * {@link KnownCloudServicesNetworkProvisioningState} can be used interchangeably with CloudServicesNetworkProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The Succeeded status. \
 * **Failed**: The Failed status. \
 * **Canceled**: The Canceled status. \
 * **Provisioning**: The Provisioning status. \
 * **Accepted**: The Accepted status.
 */
export type CloudServicesNetworkProvisioningState = string;

/** CloudServicesNetworkPatchParameters represents the body of the request to patch the cloud services network. */
export interface CloudServicesNetworkPatchParameters {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The list of egress endpoints. This allows for connection from a Hybrid AKS cluster to the specified endpoint. */
  additionalEgressEndpoints?: EgressEndpoint[];
  /** The indicator of whether the platform default endpoints are allowed for the egress traffic. */
  enableDefaultEgressEndpoints?: CloudServicesNetworkEnableDefaultEgressEndpoints;
  /** The storage options for the cloud services network. */
  storageOptions?: CloudServicesNetworkStorageOptionsPatch;
}

export function cloudServicesNetworkPatchParametersSerializer(
  item: CloudServicesNetworkPatchParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "additionalEgressEndpoints",
      "enableDefaultEgressEndpoints",
      "storageOptions",
    ])
      ? undefined
      : _cloudServicesNetworkPatchParametersPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** CloudServicesNetworkPatchProperties represents the properties of the cloud services network that can be updated using a patch request. */
export interface CloudServicesNetworkPatchProperties {
  /** The list of egress endpoints. This allows for connection from a Hybrid AKS cluster to the specified endpoint. */
  additionalEgressEndpoints?: EgressEndpoint[];
  /** The indicator of whether the platform default endpoints are allowed for the egress traffic. */
  enableDefaultEgressEndpoints?: CloudServicesNetworkEnableDefaultEgressEndpoints;
  /** The storage options for the cloud services network. */
  storageOptions?: CloudServicesNetworkStorageOptionsPatch;
}

export function cloudServicesNetworkPatchPropertiesSerializer(
  item: CloudServicesNetworkPatchProperties,
): any {
  return {
    additionalEgressEndpoints: !item["additionalEgressEndpoints"]
      ? item["additionalEgressEndpoints"]
      : egressEndpointArraySerializer(item["additionalEgressEndpoints"]),
    enableDefaultEgressEndpoints: item["enableDefaultEgressEndpoints"],
    storageOptions: !item["storageOptions"]
      ? item["storageOptions"]
      : cloudServicesNetworkStorageOptionsPatchSerializer(item["storageOptions"]),
  };
}

/** CloudServicesNetworkStorageOptionsPatch represents the patchable storage options for the cloud services network. */
export interface CloudServicesNetworkStorageOptionsPatch {
  /** The indicator to enable shared storage on the cloud services network. */
  mode?: CloudServicesNetworkStorageMode;
  /** The requested storage allocation for the volume in Mebibytes. */
  sizeMiB?: number;
  /** The resource ID of the storage appliance that hosts the storage. */
  storageApplianceId?: string;
}

export function cloudServicesNetworkStorageOptionsPatchSerializer(
  item: CloudServicesNetworkStorageOptionsPatch,
): any {
  return {
    mode: item["mode"],
    sizeMiB: item["sizeMiB"],
    storageApplianceId: item["storageApplianceId"],
  };
}

/** CloudServicesNetworkList represents a list of cloud services networks. */
export interface _CloudServicesNetworkList {
  /** The CloudServicesNetwork items on this page */
  value: CloudServicesNetwork[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _cloudServicesNetworkListDeserializer(item: any): _CloudServicesNetworkList {
  return {
    value: cloudServicesNetworkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cloudServicesNetworkArraySerializer(result: Array<CloudServicesNetwork>): any[] {
  return result.map((item) => {
    return cloudServicesNetworkSerializer(item);
  });
}

export function cloudServicesNetworkArrayDeserializer(result: Array<CloudServicesNetwork>): any[] {
  return result.map((item) => {
    return cloudServicesNetworkDeserializer(item);
  });
}

/** ClusterManager represents a control-plane to manage one or more on-premises clusters. */
export interface ClusterManager extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** The kind of the cluster manager. */
  kind?: DeploymentType;
  /** The resource ID of the Log Analytics workspace that is used for the logs collection. */
  analyticsWorkspaceId?: string;
  /** The Azure availability zones within the region that will be used to support the cluster manager resource. */
  availabilityZones?: string[];
  /** The list of the cluster versions the manager supports. It is used as input in clusterVersion property of a cluster resource. */
  readonly clusterVersions?: ClusterAvailableVersion[];
  /** The detailed status that provides additional information about the cluster manager. */
  readonly detailedStatus?: ClusterManagerDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The resource ID of the fabric controller that has one to one mapping with the cluster manager. */
  fabricControllerId: string;
  /** The configuration of the managed resource group associated with the resource. */
  managedResourceGroupConfiguration?: ManagedResourceGroupConfiguration;
  /** The extended location (custom location) that represents the cluster manager's control plane location. This extended location is used when creating cluster and rack manifest resources. */
  readonly managerExtendedLocation?: ExtendedLocation;
  /** The provisioning state of the cluster manager. */
  readonly provisioningState?: ClusterManagerProvisioningState;
  /** The relay configuration for the cluster manager. */
  readonly relayConfiguration?: ClusterManagerRelayConfiguration;
  /** The size of the Azure virtual machines to use for hosting the cluster manager resource. */
  vmSize?: string;
}

export function clusterManagerSerializer(item: ClusterManager): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _clusterManagerPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    kind: item["kind"],
  };
}

export function clusterManagerDeserializer(item: any): ClusterManager {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._clusterManagerPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    kind: item["kind"],
  };
}

/** ClusterManagerProperties represents the properties of a cluster manager. */
export interface ClusterManagerProperties {
  /** The resource ID of the Log Analytics workspace that is used for the logs collection. */
  analyticsWorkspaceId?: string;
  /** The Azure availability zones within the region that will be used to support the cluster manager resource. */
  availabilityZones?: string[];
  /** The list of the cluster versions the manager supports. It is used as input in clusterVersion property of a cluster resource. */
  readonly clusterVersions?: ClusterAvailableVersion[];
  /** The detailed status that provides additional information about the cluster manager. */
  readonly detailedStatus?: ClusterManagerDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The resource ID of the fabric controller that has one to one mapping with the cluster manager. */
  fabricControllerId: string;
  /** The configuration of the managed resource group associated with the resource. */
  managedResourceGroupConfiguration?: ManagedResourceGroupConfiguration;
  /** The extended location (custom location) that represents the cluster manager's control plane location. This extended location is used when creating cluster and rack manifest resources. */
  readonly managerExtendedLocation?: ExtendedLocation;
  /** The provisioning state of the cluster manager. */
  readonly provisioningState?: ClusterManagerProvisioningState;
  /** The relay configuration for the cluster manager. */
  readonly relayConfiguration?: ClusterManagerRelayConfiguration;
  /** The size of the Azure virtual machines to use for hosting the cluster manager resource. */
  vmSize?: string;
}

export function clusterManagerPropertiesSerializer(item: ClusterManagerProperties): any {
  return {
    analyticsWorkspaceId: item["analyticsWorkspaceId"],
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    fabricControllerId: item["fabricControllerId"],
    managedResourceGroupConfiguration: !item["managedResourceGroupConfiguration"]
      ? item["managedResourceGroupConfiguration"]
      : managedResourceGroupConfigurationSerializer(item["managedResourceGroupConfiguration"]),
    vmSize: item["vmSize"],
  };
}

export function clusterManagerPropertiesDeserializer(item: any): ClusterManagerProperties {
  return {
    analyticsWorkspaceId: item["analyticsWorkspaceId"],
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    clusterVersions: !item["clusterVersions"]
      ? item["clusterVersions"]
      : clusterAvailableVersionArrayDeserializer(item["clusterVersions"]),
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    fabricControllerId: item["fabricControllerId"],
    managedResourceGroupConfiguration: !item["managedResourceGroupConfiguration"]
      ? item["managedResourceGroupConfiguration"]
      : managedResourceGroupConfigurationDeserializer(item["managedResourceGroupConfiguration"]),
    managerExtendedLocation: !item["managerExtendedLocation"]
      ? item["managerExtendedLocation"]
      : extendedLocationDeserializer(item["managerExtendedLocation"]),
    provisioningState: item["provisioningState"],
    relayConfiguration: !item["relayConfiguration"]
      ? item["relayConfiguration"]
      : clusterManagerRelayConfigurationDeserializer(item["relayConfiguration"]),
    vmSize: item["vmSize"],
  };
}

export function clusterAvailableVersionArrayDeserializer(
  result: Array<ClusterAvailableVersion>,
): any[] {
  return result.map((item) => {
    return clusterAvailableVersionDeserializer(item);
  });
}

/** ClusterAvailableVersion represents the cluster version that the cluster manager can be asked to create and manage. */
export interface ClusterAvailableVersion {
  /** The last date the version of the platform is supported. */
  readonly supportExpiryDate?: string;
  /** The version of the cluster to be deployed. */
  readonly targetClusterVersion?: string;
}

export function clusterAvailableVersionDeserializer(item: any): ClusterAvailableVersion {
  return {
    supportExpiryDate: item["supportExpiryDate"],
    targetClusterVersion: item["targetClusterVersion"],
  };
}

/** The detailed status that provides additional information about the cluster manager. */
export enum KnownClusterManagerDetailedStatus {
  /** The Error status. */
  Error = "Error",
  /** The Available status. */
  Available = "Available",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
  /** The ProvisioningFailed status. */
  ProvisioningFailed = "ProvisioningFailed",
  /** The Updating status. */
  Updating = "Updating",
  /** The UpdateFailed status. */
  UpdateFailed = "UpdateFailed",
}

/**
 * The detailed status that provides additional information about the cluster manager. \
 * {@link KnownClusterManagerDetailedStatus} can be used interchangeably with ClusterManagerDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Error**: The Error status. \
 * **Available**: The Available status. \
 * **Provisioning**: The Provisioning status. \
 * **ProvisioningFailed**: The ProvisioningFailed status. \
 * **Updating**: The Updating status. \
 * **UpdateFailed**: The UpdateFailed status.
 */
export type ClusterManagerDetailedStatus = string;

/** ManagedResourceGroupConfiguration represents the configuration of the resource group managed by Azure. */
export interface ManagedResourceGroupConfiguration {
  /** The location of the managed resource group. If not specified, the location of the parent resource is chosen. */
  location?: string;
  /** The name for the managed resource group. If not specified, the unique name is automatically generated. */
  name?: string;
}

export function managedResourceGroupConfigurationSerializer(
  item: ManagedResourceGroupConfiguration,
): any {
  return { location: item["location"], name: item["name"] };
}

export function managedResourceGroupConfigurationDeserializer(
  item: any,
): ManagedResourceGroupConfiguration {
  return {
    location: item["location"],
    name: item["name"],
  };
}

/** The provisioning state of the cluster manager. */
export enum KnownClusterManagerProvisioningState {
  /** The Succeeded status. */
  Succeeded = "Succeeded",
  /** The Failed status. */
  Failed = "Failed",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
  /** The Accepted status. */
  Accepted = "Accepted",
  /** The Updating status. */
  Updating = "Updating",
}

/**
 * The provisioning state of the cluster manager. \
 * {@link KnownClusterManagerProvisioningState} can be used interchangeably with ClusterManagerProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The Succeeded status. \
 * **Failed**: The Failed status. \
 * **Canceled**: The Canceled status. \
 * **Provisioning**: The Provisioning status. \
 * **Accepted**: The Accepted status. \
 * **Updating**: The Updating status.
 */
export type ClusterManagerProvisioningState = string;

/** ClusterManagerRelayConfiguration represents the relay configuration for the cluster manager. */
export interface ClusterManagerRelayConfiguration {
  /** The resource ID of the Azure relay namespace managed by the cluster manager. */
  relayNamespaceId?: string;
}

export function clusterManagerRelayConfigurationDeserializer(
  item: any,
): ClusterManagerRelayConfiguration {
  return {
    relayNamespaceId: item["relayNamespaceId"],
  };
}

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : Object.fromEntries(
          Object.entries(item["userAssignedIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
  };
}

/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
export enum KnownManagedServiceIdentityType {
  /** No managed identity. */
  None = "None",
  /** System assigned managed identity. */
  SystemAssigned = "SystemAssigned",
  /** User assigned managed identity. */
  UserAssigned = "UserAssigned",
  /** System and user assigned managed identity. */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned,UserAssigned**: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The type (kind) of the cluster. When specified, the value must exactly match the kind configured on the cluster manager that manages the cluster. If omitted, the service will default the value to the kind value of the cluster manager. */
export enum KnownDeploymentType {
  /** Azure Operator Nexus */
  Nexus = "Nexus",
  /** Azure Local */
  AzureLocal = "AzureLocal",
}

/**
 * The type (kind) of the cluster. When specified, the value must exactly match the kind configured on the cluster manager that manages the cluster. If omitted, the service will default the value to the kind value of the cluster manager. \
 * {@link KnownDeploymentType} can be used interchangeably with DeploymentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Nexus**: Azure Operator Nexus \
 * **AzureLocal**: Azure Local
 */
export type DeploymentType = string;

/** ClusterManagerPatchParameters represents the body of the request to patch the cluster properties. */
export interface ClusterManagerPatchParameters {
  /** The identity for the resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function clusterManagerPatchParametersSerializer(item: ClusterManagerPatchParameters): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
  };
}

/** ClusterManagerList represents a list of cluster manager objects. */
export interface _ClusterManagerList {
  /** The ClusterManager items on this page */
  value: ClusterManager[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clusterManagerListDeserializer(item: any): _ClusterManagerList {
  return {
    value: clusterManagerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clusterManagerArraySerializer(result: Array<ClusterManager>): any[] {
  return result.map((item) => {
    return clusterManagerSerializer(item);
  });
}

export function clusterManagerArrayDeserializer(result: Array<ClusterManager>): any[] {
  return result.map((item) => {
    return clusterManagerDeserializer(item);
  });
}

/** ClusterManagerUpdateRelayPrivateEndpointConnectionParameters represents the body of the request to approve or reject the relay private endpoint connection for the private relay managed by a cluster manager. */
export interface ClusterManagerUpdateRelayPrivateEndpointConnectionParameters {
  /** The state to set for the private endpoint connection. */
  connectionState: RelayPrivateEndpointConnectionState;
  /** The description to associate with the private endpoint connection. */
  description?: string;
  /** The resource ID of private endpoint to be permitted or denied connection to the relay namespace. */
  privateEndpointResourceId: string;
}

export function clusterManagerUpdateRelayPrivateEndpointConnectionParametersSerializer(
  item: ClusterManagerUpdateRelayPrivateEndpointConnectionParameters,
): any {
  return {
    connectionState: item["connectionState"],
    description: item["description"],
    privateEndpointResourceId: item["privateEndpointResourceId"],
  };
}

/** The state to set for the private endpoint connection. */
export enum KnownRelayPrivateEndpointConnectionState {
  /** The private endpoint connection is approved. */
  Approved = "Approved",
  /** The private endpoint connection is rejected. */
  Rejected = "Rejected",
}

/**
 * The state to set for the private endpoint connection. \
 * {@link KnownRelayPrivateEndpointConnectionState} can be used interchangeably with RelayPrivateEndpointConnectionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Approved**: The private endpoint connection is approved. \
 * **Rejected**: The private endpoint connection is rejected.
 */
export type RelayPrivateEndpointConnectionState = string;

/** Cluster represents the on-premises Network Cloud cluster. */
export interface Cluster extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The extended location of the resource. This property is required when creating the resource. */
  extendedLocation: ExtendedLocation;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** The type (kind) of the cluster. When specified, the value must exactly match the kind configured on the cluster manager that manages the cluster. If omitted, the service will default the value to the kind value of the cluster manager. */
  kind?: DeploymentType;
  /** The rack definition that is intended to reflect only a single rack in a single rack cluster, or an aggregator rack in a multi-rack cluster. */
  aggregatorOrSingleRackDefinition: RackDefinition;
  /** The settings for the log analytics workspace used for output of logs from this cluster. */
  analyticsOutputSettings?: AnalyticsOutputSettings;
  /** Field Deprecated. The resource ID of the Log Analytics Workspace that will be used for storing relevant logs. */
  analyticsWorkspaceId?: string;
  /** The customer-provided location information to identify where the cluster resides. */
  clusterLocation?: string;
  /** Field Deprecated: Use managed identity to provide cluster privileges. The service principal to be used by the cluster during Arc Appliance installation. */
  clusterServicePrincipal?: ServicePrincipalInformation;
  /** The type of rack configuration for the cluster. */
  clusterType: ClusterType;
  /** The current runtime version of the cluster. */
  clusterVersion: string;
  /** The settings for commands run in this cluster, such as bare metal machine run read only commands and data extracts. */
  commandOutputSettings?: CommandOutputSettings;
  /** The validation threshold indicating the allowable failures of compute machines during environment validation and deployment. */
  computeDeploymentThreshold?: ValidationThreshold;
  /** The list of rack definitions for the compute racks in a multi-rack cluster, or an empty list in a single-rack cluster. */
  computeRackDefinitions?: RackDefinition[];
  /** The configuration of the managed resource group associated with the resource. */
  managedResourceGroupConfiguration?: ManagedResourceGroupConfiguration;
  /** The resource ID of the Network Fabric associated with the cluster. */
  networkFabricId: string;
  /** The settings for cluster runtime protection. */
  runtimeProtectionConfiguration?: RuntimeProtectionConfiguration;
  /** The configuration for use of a key vault to store secrets for later retrieval by the operator. */
  secretArchive?: ClusterSecretArchive;
  /** The settings for the secret archive used to hold credentials for the cluster. */
  secretArchiveSettings?: SecretArchiveSettings;
  /** The strategy for updating the cluster. */
  updateStrategy?: ClusterUpdateStrategy;
  /** The settings for how security vulnerability scanning is applied to the cluster. */
  vulnerabilityScanningSettings?: VulnerabilityScanningSettings;
  /** The current state of any in progress or completed actions. The most recent known instance of each action type is shown. */
  readonly actionStates?: ActionState[];
  /** The list of cluster runtime version upgrades available for this cluster. */
  readonly availableUpgradeVersions?: ClusterAvailableUpgradeVersion[];
  /** The capacity supported by this cluster. */
  readonly clusterCapacity?: ClusterCapacity;
  /** The latest heartbeat status between the cluster manager and the cluster. */
  readonly clusterConnectionStatus?: ClusterConnectionStatus;
  /** The extended location (custom location) that represents the cluster's control plane location. This extended location is used to route the requests of child objects of the cluster that are handled by the platform operator. */
  readonly clusterExtendedLocation?: ExtendedLocation;
  /** The latest connectivity status between cluster manager and the cluster. */
  readonly clusterManagerConnectionStatus?: ClusterManagerConnectionStatus;
  /** The resource ID of the cluster manager that manages this cluster. This is set by the Cluster Manager when the cluster is created. */
  readonly clusterManagerId?: string;
  /** The current detailed status of the cluster. */
  readonly detailedStatus?: ClusterDetailedStatus;
  /** The descriptive message about the detailed status. */
  readonly detailedStatusMessage?: string;
  /** Field Deprecated. This field will not be populated in an upcoming version. The extended location (custom location) that represents the Hybrid AKS control plane location. This extended location is used when creating provisioned clusters (Hybrid AKS clusters). */
  readonly hybridAksExtendedLocation?: ExtendedLocation;
  /** The date and time of the end of the last successful version update for the cluster. */
  readonly lastSuccessfulVersionUpdateTime?: Date;
  /** The list of credentials that are managed for the cluster and can be rotated on-demand. */
  readonly managedCredentials?: string[];
  /** The count of Manual Action Taken (MAT) events that have not been validated. */
  readonly manualActionCount?: number;
  /** The support end date of the runtime version of the cluster. */
  readonly supportExpiryDate?: string;
  /** The list of workload resource IDs that are hosted within this cluster. */
  readonly workloadResourceIds?: string[];
  /** The provisioning state of the cluster. */
  readonly provisioningState?: ClusterProvisioningState;
}

export function clusterSerializer(item: Cluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _clusterPropertiesSerializer(item),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    kind: item["kind"],
  };
}

export function clusterDeserializer(item: any): Cluster {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._clusterPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    kind: item["kind"],
  };
}

/** ClusterProperties represents the properties of a cluster. */
export interface ClusterProperties {
  /** The rack definition that is intended to reflect only a single rack in a single rack cluster, or an aggregator rack in a multi-rack cluster. */
  aggregatorOrSingleRackDefinition: RackDefinition;
  /** The settings for the log analytics workspace used for output of logs from this cluster. */
  analyticsOutputSettings?: AnalyticsOutputSettings;
  /** Field Deprecated. The resource ID of the Log Analytics Workspace that will be used for storing relevant logs. */
  analyticsWorkspaceId?: string;
  /** The customer-provided location information to identify where the cluster resides. */
  clusterLocation?: string;
  /** Field Deprecated: Use managed identity to provide cluster privileges. The service principal to be used by the cluster during Arc Appliance installation. */
  clusterServicePrincipal?: ServicePrincipalInformation;
  /** The type of rack configuration for the cluster. */
  clusterType: ClusterType;
  /** The current runtime version of the cluster. */
  clusterVersion: string;
  /** The settings for commands run in this cluster, such as bare metal machine run read only commands and data extracts. */
  commandOutputSettings?: CommandOutputSettings;
  /** The validation threshold indicating the allowable failures of compute machines during environment validation and deployment. */
  computeDeploymentThreshold?: ValidationThreshold;
  /** The list of rack definitions for the compute racks in a multi-rack cluster, or an empty list in a single-rack cluster. */
  computeRackDefinitions?: RackDefinition[];
  /** The configuration of the managed resource group associated with the resource. */
  managedResourceGroupConfiguration?: ManagedResourceGroupConfiguration;
  /** The resource ID of the Network Fabric associated with the cluster. */
  networkFabricId: string;
  /** The settings for cluster runtime protection. */
  runtimeProtectionConfiguration?: RuntimeProtectionConfiguration;
  /** The configuration for use of a key vault to store secrets for later retrieval by the operator. */
  secretArchive?: ClusterSecretArchive;
  /** The settings for the secret archive used to hold credentials for the cluster. */
  secretArchiveSettings?: SecretArchiveSettings;
  /** The strategy for updating the cluster. */
  updateStrategy?: ClusterUpdateStrategy;
  /** The settings for how security vulnerability scanning is applied to the cluster. */
  vulnerabilityScanningSettings?: VulnerabilityScanningSettings;
  /** The current state of any in progress or completed actions. The most recent known instance of each action type is shown. */
  readonly actionStates?: ActionState[];
  /** The list of cluster runtime version upgrades available for this cluster. */
  readonly availableUpgradeVersions?: ClusterAvailableUpgradeVersion[];
  /** The capacity supported by this cluster. */
  readonly clusterCapacity?: ClusterCapacity;
  /** The latest heartbeat status between the cluster manager and the cluster. */
  readonly clusterConnectionStatus?: ClusterConnectionStatus;
  /** The extended location (custom location) that represents the cluster's control plane location. This extended location is used to route the requests of child objects of the cluster that are handled by the platform operator. */
  readonly clusterExtendedLocation?: ExtendedLocation;
  /** The latest connectivity status between cluster manager and the cluster. */
  readonly clusterManagerConnectionStatus?: ClusterManagerConnectionStatus;
  /** The resource ID of the cluster manager that manages this cluster. This is set by the Cluster Manager when the cluster is created. */
  readonly clusterManagerId?: string;
  /** The current detailed status of the cluster. */
  readonly detailedStatus?: ClusterDetailedStatus;
  /** The descriptive message about the detailed status. */
  readonly detailedStatusMessage?: string;
  /** Field Deprecated. This field will not be populated in an upcoming version. The extended location (custom location) that represents the Hybrid AKS control plane location. This extended location is used when creating provisioned clusters (Hybrid AKS clusters). */
  readonly hybridAksExtendedLocation?: ExtendedLocation;
  /** The date and time of the end of the last successful version update for the cluster. */
  readonly lastSuccessfulVersionUpdateTime?: Date;
  /** The list of credentials that are managed for the cluster and can be rotated on-demand. */
  readonly managedCredentials?: string[];
  /** The count of Manual Action Taken (MAT) events that have not been validated. */
  readonly manualActionCount?: number;
  /** The support end date of the runtime version of the cluster. */
  readonly supportExpiryDate?: string;
  /** The list of workload resource IDs that are hosted within this cluster. */
  readonly workloadResourceIds?: string[];
  /** The provisioning state of the cluster. */
  readonly provisioningState?: ClusterProvisioningState;
}

export function clusterPropertiesSerializer(item: ClusterProperties): any {
  return {
    aggregatorOrSingleRackDefinition: rackDefinitionSerializer(
      item["aggregatorOrSingleRackDefinition"],
    ),
    analyticsOutputSettings: !item["analyticsOutputSettings"]
      ? item["analyticsOutputSettings"]
      : analyticsOutputSettingsSerializer(item["analyticsOutputSettings"]),
    analyticsWorkspaceId: item["analyticsWorkspaceId"],
    clusterLocation: item["clusterLocation"],
    clusterServicePrincipal: !item["clusterServicePrincipal"]
      ? item["clusterServicePrincipal"]
      : servicePrincipalInformationSerializer(item["clusterServicePrincipal"]),
    clusterType: item["clusterType"],
    clusterVersion: item["clusterVersion"],
    commandOutputSettings: !item["commandOutputSettings"]
      ? item["commandOutputSettings"]
      : commandOutputSettingsSerializer(item["commandOutputSettings"]),
    computeDeploymentThreshold: !item["computeDeploymentThreshold"]
      ? item["computeDeploymentThreshold"]
      : validationThresholdSerializer(item["computeDeploymentThreshold"]),
    computeRackDefinitions: !item["computeRackDefinitions"]
      ? item["computeRackDefinitions"]
      : rackDefinitionArraySerializer(item["computeRackDefinitions"]),
    managedResourceGroupConfiguration: !item["managedResourceGroupConfiguration"]
      ? item["managedResourceGroupConfiguration"]
      : managedResourceGroupConfigurationSerializer(item["managedResourceGroupConfiguration"]),
    networkFabricId: item["networkFabricId"],
    runtimeProtectionConfiguration: !item["runtimeProtectionConfiguration"]
      ? item["runtimeProtectionConfiguration"]
      : runtimeProtectionConfigurationSerializer(item["runtimeProtectionConfiguration"]),
    secretArchive: !item["secretArchive"]
      ? item["secretArchive"]
      : clusterSecretArchiveSerializer(item["secretArchive"]),
    secretArchiveSettings: !item["secretArchiveSettings"]
      ? item["secretArchiveSettings"]
      : secretArchiveSettingsSerializer(item["secretArchiveSettings"]),
    updateStrategy: !item["updateStrategy"]
      ? item["updateStrategy"]
      : clusterUpdateStrategySerializer(item["updateStrategy"]),
    vulnerabilityScanningSettings: !item["vulnerabilityScanningSettings"]
      ? item["vulnerabilityScanningSettings"]
      : vulnerabilityScanningSettingsSerializer(item["vulnerabilityScanningSettings"]),
  };
}

export function clusterPropertiesDeserializer(item: any): ClusterProperties {
  return {
    aggregatorOrSingleRackDefinition: rackDefinitionDeserializer(
      item["aggregatorOrSingleRackDefinition"],
    ),
    analyticsOutputSettings: !item["analyticsOutputSettings"]
      ? item["analyticsOutputSettings"]
      : analyticsOutputSettingsDeserializer(item["analyticsOutputSettings"]),
    analyticsWorkspaceId: item["analyticsWorkspaceId"],
    clusterLocation: item["clusterLocation"],
    clusterServicePrincipal: !item["clusterServicePrincipal"]
      ? item["clusterServicePrincipal"]
      : servicePrincipalInformationDeserializer(item["clusterServicePrincipal"]),
    clusterType: item["clusterType"],
    clusterVersion: item["clusterVersion"],
    commandOutputSettings: !item["commandOutputSettings"]
      ? item["commandOutputSettings"]
      : commandOutputSettingsDeserializer(item["commandOutputSettings"]),
    computeDeploymentThreshold: !item["computeDeploymentThreshold"]
      ? item["computeDeploymentThreshold"]
      : validationThresholdDeserializer(item["computeDeploymentThreshold"]),
    computeRackDefinitions: !item["computeRackDefinitions"]
      ? item["computeRackDefinitions"]
      : rackDefinitionArrayDeserializer(item["computeRackDefinitions"]),
    managedResourceGroupConfiguration: !item["managedResourceGroupConfiguration"]
      ? item["managedResourceGroupConfiguration"]
      : managedResourceGroupConfigurationDeserializer(item["managedResourceGroupConfiguration"]),
    networkFabricId: item["networkFabricId"],
    runtimeProtectionConfiguration: !item["runtimeProtectionConfiguration"]
      ? item["runtimeProtectionConfiguration"]
      : runtimeProtectionConfigurationDeserializer(item["runtimeProtectionConfiguration"]),
    secretArchive: !item["secretArchive"]
      ? item["secretArchive"]
      : clusterSecretArchiveDeserializer(item["secretArchive"]),
    secretArchiveSettings: !item["secretArchiveSettings"]
      ? item["secretArchiveSettings"]
      : secretArchiveSettingsDeserializer(item["secretArchiveSettings"]),
    updateStrategy: !item["updateStrategy"]
      ? item["updateStrategy"]
      : clusterUpdateStrategyDeserializer(item["updateStrategy"]),
    vulnerabilityScanningSettings: !item["vulnerabilityScanningSettings"]
      ? item["vulnerabilityScanningSettings"]
      : vulnerabilityScanningSettingsDeserializer(item["vulnerabilityScanningSettings"]),
    actionStates: !item["actionStates"]
      ? item["actionStates"]
      : actionStateArrayDeserializer(item["actionStates"]),
    availableUpgradeVersions: !item["availableUpgradeVersions"]
      ? item["availableUpgradeVersions"]
      : clusterAvailableUpgradeVersionArrayDeserializer(item["availableUpgradeVersions"]),
    clusterCapacity: !item["clusterCapacity"]
      ? item["clusterCapacity"]
      : clusterCapacityDeserializer(item["clusterCapacity"]),
    clusterConnectionStatus: item["clusterConnectionStatus"],
    clusterExtendedLocation: !item["clusterExtendedLocation"]
      ? item["clusterExtendedLocation"]
      : extendedLocationDeserializer(item["clusterExtendedLocation"]),
    clusterManagerConnectionStatus: item["clusterManagerConnectionStatus"],
    clusterManagerId: item["clusterManagerId"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    hybridAksExtendedLocation: !item["hybridAksExtendedLocation"]
      ? item["hybridAksExtendedLocation"]
      : extendedLocationDeserializer(item["hybridAksExtendedLocation"]),
    lastSuccessfulVersionUpdateTime: !item["lastSuccessfulVersionUpdateTime"]
      ? item["lastSuccessfulVersionUpdateTime"]
      : new Date(item["lastSuccessfulVersionUpdateTime"]),
    managedCredentials: !item["managedCredentials"]
      ? item["managedCredentials"]
      : item["managedCredentials"].map((p: any) => {
          return p;
        }),
    manualActionCount: item["manualActionCount"],
    supportExpiryDate: item["supportExpiryDate"],
    workloadResourceIds: !item["workloadResourceIds"]
      ? item["workloadResourceIds"]
      : item["workloadResourceIds"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** RackDefinition represents details regarding the rack. */
export interface RackDefinition {
  /** The zone name used for this rack when created. Availability zones are used for workload placement. */
  availabilityZone?: string;
  /** The unordered list of bare metal machine configuration. */
  bareMetalMachineConfigurationData?: BareMetalMachineConfigurationData[];
  /** The resource ID of the network rack that matches this rack definition. */
  networkRackId: string;
  /** The free-form description of the rack's location. */
  rackLocation?: string;
  /** The unique identifier for the rack within Network Cloud cluster. An alternate unique alphanumeric value other than a serial number may be provided if desired. */
  rackSerialNumber: string;
  /** The resource ID of the sku for the rack being added. */
  rackSkuId: string;
  /** The list of storage appliance configuration data for this rack. */
  storageApplianceConfigurationData?: StorageApplianceConfigurationData[];
}

export function rackDefinitionSerializer(item: RackDefinition): any {
  return {
    availabilityZone: item["availabilityZone"],
    bareMetalMachineConfigurationData: !item["bareMetalMachineConfigurationData"]
      ? item["bareMetalMachineConfigurationData"]
      : bareMetalMachineConfigurationDataArraySerializer(item["bareMetalMachineConfigurationData"]),
    networkRackId: item["networkRackId"],
    rackLocation: item["rackLocation"],
    rackSerialNumber: item["rackSerialNumber"],
    rackSkuId: item["rackSkuId"],
    storageApplianceConfigurationData: !item["storageApplianceConfigurationData"]
      ? item["storageApplianceConfigurationData"]
      : storageApplianceConfigurationDataArraySerializer(item["storageApplianceConfigurationData"]),
  };
}

export function rackDefinitionDeserializer(item: any): RackDefinition {
  return {
    availabilityZone: item["availabilityZone"],
    bareMetalMachineConfigurationData: !item["bareMetalMachineConfigurationData"]
      ? item["bareMetalMachineConfigurationData"]
      : bareMetalMachineConfigurationDataArrayDeserializer(
          item["bareMetalMachineConfigurationData"],
        ),
    networkRackId: item["networkRackId"],
    rackLocation: item["rackLocation"],
    rackSerialNumber: item["rackSerialNumber"],
    rackSkuId: item["rackSkuId"],
    storageApplianceConfigurationData: !item["storageApplianceConfigurationData"]
      ? item["storageApplianceConfigurationData"]
      : storageApplianceConfigurationDataArrayDeserializer(
          item["storageApplianceConfigurationData"],
        ),
  };
}

export function bareMetalMachineConfigurationDataArraySerializer(
  result: Array<BareMetalMachineConfigurationData>,
): any[] {
  return result.map((item) => {
    return bareMetalMachineConfigurationDataSerializer(item);
  });
}

export function bareMetalMachineConfigurationDataArrayDeserializer(
  result: Array<BareMetalMachineConfigurationData>,
): any[] {
  return result.map((item) => {
    return bareMetalMachineConfigurationDataDeserializer(item);
  });
}

/** BareMetalMachineConfigurationData represents configuration for the bare metal machine. */
export interface BareMetalMachineConfigurationData {
  /** The connection string for the baseboard management controller including IP address and protocol. */
  readonly bmcConnectionString?: string;
  /** The credentials of the baseboard management controller on this bare metal machine. The password field is expected to be an Azure Key Vault key URL. Until the cluster is converted to utilize managed identity by setting the secret archive settings, the actual password value should be provided instead. */
  bmcCredentials: AdministrativeCredentials;
  /** The MAC address of the BMC for this machine. */
  bmcMacAddress: string;
  /** The MAC address associated with the PXE NIC card. */
  bootMacAddress: string;
  /** The free-form additional information about the machine, e.g. an asset tag. */
  machineDetails?: string;
  /** The user-provided name for the bare metal machine created from this specification. If not provided, the machine name will be generated programmatically. */
  machineName?: string;
  /** The slot the physical machine is in the rack based on the BOM configuration. */
  rackSlot: number;
  /** The serial number of the machine. Hardware suppliers may use an alternate value. For example, service tag. */
  serialNumber: string;
}

export function bareMetalMachineConfigurationDataSerializer(
  item: BareMetalMachineConfigurationData,
): any {
  return {
    bmcCredentials: administrativeCredentialsSerializer(item["bmcCredentials"]),
    bmcMacAddress: item["bmcMacAddress"],
    bootMacAddress: item["bootMacAddress"],
    machineDetails: item["machineDetails"],
    machineName: item["machineName"],
    rackSlot: item["rackSlot"],
    serialNumber: item["serialNumber"],
  };
}

export function bareMetalMachineConfigurationDataDeserializer(
  item: any,
): BareMetalMachineConfigurationData {
  return {
    bmcConnectionString: item["bmcConnectionString"],
    bmcCredentials: administrativeCredentialsDeserializer(item["bmcCredentials"]),
    bmcMacAddress: item["bmcMacAddress"],
    bootMacAddress: item["bootMacAddress"],
    machineDetails: item["machineDetails"],
    machineName: item["machineName"],
    rackSlot: item["rackSlot"],
    serialNumber: item["serialNumber"],
  };
}

export function storageApplianceConfigurationDataArraySerializer(
  result: Array<StorageApplianceConfigurationData>,
): any[] {
  return result.map((item) => {
    return storageApplianceConfigurationDataSerializer(item);
  });
}

export function storageApplianceConfigurationDataArrayDeserializer(
  result: Array<StorageApplianceConfigurationData>,
): any[] {
  return result.map((item) => {
    return storageApplianceConfigurationDataDeserializer(item);
  });
}

/** StorageApplianceConfigurationData represents configuration for the storage application. */
export interface StorageApplianceConfigurationData {
  /** The credentials of the administrative interface on this storage appliance. The password field is expected to be an Azure Key Vault key URL. Until the cluster is converted to utilize managed identity by setting the secret archive settings, the actual password value should be provided instead. */
  adminCredentials: AdministrativeCredentials;
  /** The slot that storage appliance is in the rack based on the BOM configuration. */
  rackSlot: number;
  /** The serial number of the appliance. */
  serialNumber: string;
  /** The user-provided name for the storage appliance that will be created from this specification. */
  storageApplianceName?: string;
}

export function storageApplianceConfigurationDataSerializer(
  item: StorageApplianceConfigurationData,
): any {
  return {
    adminCredentials: administrativeCredentialsSerializer(item["adminCredentials"]),
    rackSlot: item["rackSlot"],
    serialNumber: item["serialNumber"],
    storageApplianceName: item["storageApplianceName"],
  };
}

export function storageApplianceConfigurationDataDeserializer(
  item: any,
): StorageApplianceConfigurationData {
  return {
    adminCredentials: administrativeCredentialsDeserializer(item["adminCredentials"]),
    rackSlot: item["rackSlot"],
    serialNumber: item["serialNumber"],
    storageApplianceName: item["storageApplianceName"],
  };
}

/** AnalyticsOutputSettings represents the settings for the log analytics workspace used for output of logs from this cluster. */
export interface AnalyticsOutputSettings {
  /** The resource ID of the analytics workspace that is to be used by the specified identity. */
  analyticsWorkspaceId?: string;
  /** The selection of the managed identity to use with this analytics workspace. The identity type must be either system assigned or user assigned. */
  associatedIdentity?: IdentitySelector;
}

export function analyticsOutputSettingsSerializer(item: AnalyticsOutputSettings): any {
  return {
    analyticsWorkspaceId: item["analyticsWorkspaceId"],
    associatedIdentity: !item["associatedIdentity"]
      ? item["associatedIdentity"]
      : identitySelectorSerializer(item["associatedIdentity"]),
  };
}

export function analyticsOutputSettingsDeserializer(item: any): AnalyticsOutputSettings {
  return {
    analyticsWorkspaceId: item["analyticsWorkspaceId"],
    associatedIdentity: !item["associatedIdentity"]
      ? item["associatedIdentity"]
      : identitySelectorDeserializer(item["associatedIdentity"]),
  };
}

/** IdentitySelector represents the selection of a managed identity for use. */
export interface IdentitySelector {
  /** The type of managed identity that is being selected. */
  identityType?: ManagedServiceIdentitySelectorType;
  /** The user assigned managed identity resource ID to use. Mutually exclusive with a system assigned identity type. */
  userAssignedIdentityResourceId?: string;
}

export function identitySelectorSerializer(item: IdentitySelector): any {
  return {
    identityType: item["identityType"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

export function identitySelectorDeserializer(item: any): IdentitySelector {
  return {
    identityType: item["identityType"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

/** The type of managed identity that is being selected. */
export enum KnownManagedServiceIdentitySelectorType {
  /** System assigned identity selection. */
  SystemAssignedIdentity = "SystemAssignedIdentity",
  /** User assigned identity selection. */
  UserAssignedIdentity = "UserAssignedIdentity",
}

/**
 * The type of managed identity that is being selected. \
 * {@link KnownManagedServiceIdentitySelectorType} can be used interchangeably with ManagedServiceIdentitySelectorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssignedIdentity**: System assigned identity selection. \
 * **UserAssignedIdentity**: User assigned identity selection.
 */
export type ManagedServiceIdentitySelectorType = string;

/** ServicePrincipalInformation represents the details of the service principal to be used by the cluster during Arc Appliance installation. */
export interface ServicePrincipalInformation {
  /** The application ID, also known as client ID, of the service principal. */
  applicationId: string;
  /** The password of the service principal. */
  password: string;
  /** The principal ID, also known as the object ID, of the service principal. */
  principalId: string;
  /** The tenant ID, also known as the directory ID, of the tenant in which the service principal is created. */
  tenantId: string;
}

export function servicePrincipalInformationSerializer(item: ServicePrincipalInformation): any {
  return {
    applicationId: item["applicationId"],
    password: item["password"],
    principalId: item["principalId"],
    tenantId: item["tenantId"],
  };
}

export function servicePrincipalInformationDeserializer(item: any): ServicePrincipalInformation {
  return {
    applicationId: item["applicationId"],
    password: item["password"],
    principalId: item["principalId"],
    tenantId: item["tenantId"],
  };
}

/** The type of rack configuration for the cluster. */
export enum KnownClusterType {
  /** Single rack configuration. */
  SingleRack = "SingleRack",
  /** Multi-rack configuration. */
  MultiRack = "MultiRack",
}

/**
 * The type of rack configuration for the cluster. \
 * {@link KnownClusterType} can be used interchangeably with ClusterType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SingleRack**: Single rack configuration. \
 * **MultiRack**: Multi-rack configuration.
 */
export type ClusterType = string;

/** CommandOutputSettings represents the settings for commands run within the cluster such as bare metal machine run read-only commands. */
export interface CommandOutputSettings {
  /** The selection of the managed identity to use with this storage account container. The identity type must be either system assigned or user assigned. */
  associatedIdentity?: IdentitySelector;
  /** The URL of the storage account container that is to be used by the specified identities. */
  containerUrl?: string;
  /** The list of optional overrides allowing for association of storage containers and identities to specific types of command output. If a type is not overridden, the default identity and storage container will be utilized. */
  overrides?: CommandOutputOverride[];
}

export function commandOutputSettingsSerializer(item: CommandOutputSettings): any {
  return {
    associatedIdentity: !item["associatedIdentity"]
      ? item["associatedIdentity"]
      : identitySelectorSerializer(item["associatedIdentity"]),
    containerUrl: item["containerUrl"],
    overrides: !item["overrides"]
      ? item["overrides"]
      : commandOutputOverrideArraySerializer(item["overrides"]),
  };
}

export function commandOutputSettingsDeserializer(item: any): CommandOutputSettings {
  return {
    associatedIdentity: !item["associatedIdentity"]
      ? item["associatedIdentity"]
      : identitySelectorDeserializer(item["associatedIdentity"]),
    containerUrl: item["containerUrl"],
    overrides: !item["overrides"]
      ? item["overrides"]
      : commandOutputOverrideArrayDeserializer(item["overrides"]),
  };
}

export function commandOutputOverrideArraySerializer(result: Array<CommandOutputOverride>): any[] {
  return result.map((item) => {
    return commandOutputOverrideSerializer(item);
  });
}

export function commandOutputOverrideArrayDeserializer(
  result: Array<CommandOutputOverride>,
): any[] {
  return result.map((item) => {
    return commandOutputOverrideDeserializer(item);
  });
}

/** CommandOutputOverride represents an overridden value for the command output settings. */
export interface CommandOutputOverride {
  /** The selection of the managed identity to use with this storage account container. The identity type must be either system assigned or user assigned. */
  associatedIdentity?: IdentitySelector;
  /** The type of command output for the override. */
  commandOutputType?: CommandOutputType;
  /** The URL of the storage account container that is to be used by the specified identities. */
  containerUrl?: string;
}

export function commandOutputOverrideSerializer(item: CommandOutputOverride): any {
  return {
    associatedIdentity: !item["associatedIdentity"]
      ? item["associatedIdentity"]
      : identitySelectorSerializer(item["associatedIdentity"]),
    commandOutputType: item["commandOutputType"],
    containerUrl: item["containerUrl"],
  };
}

export function commandOutputOverrideDeserializer(item: any): CommandOutputOverride {
  return {
    associatedIdentity: !item["associatedIdentity"]
      ? item["associatedIdentity"]
      : identitySelectorDeserializer(item["associatedIdentity"]),
    commandOutputType: item["commandOutputType"],
    containerUrl: item["containerUrl"],
  };
}

/** The type of command output for the override. */
export enum KnownCommandOutputType {
  /** BareMetalMachineRunCommand output type */
  BareMetalMachineRunCommand = "BareMetalMachineRunCommand",
  /** BareMetalMachineRunDataExtracts output type */
  BareMetalMachineRunDataExtracts = "BareMetalMachineRunDataExtracts",
  /** BareMetalMachineRunReadCommands output type */
  BareMetalMachineRunReadCommands = "BareMetalMachineRunReadCommands",
  /** ClusterSupportAdministrativeActions output type supporting administrative actions that can be run on a cluster for support purposes. */
  ClusterSupportAdministrativeActions = "ClusterSupportAdministrativeActions",
  /** StorageRunReadCommands output type */
  StorageRunReadCommands = "StorageRunReadCommands",
  /** BareMetalMachineRunDataExtractsRestricted output type */
  BareMetalMachineRunDataExtractsRestricted = "BareMetalMachineRunDataExtractsRestricted",
}

/**
 * The type of command output for the override. \
 * {@link KnownCommandOutputType} can be used interchangeably with CommandOutputType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BareMetalMachineRunCommand**: BareMetalMachineRunCommand output type \
 * **BareMetalMachineRunDataExtracts**: BareMetalMachineRunDataExtracts output type \
 * **BareMetalMachineRunReadCommands**: BareMetalMachineRunReadCommands output type \
 * **ClusterSupportAdministrativeActions**: ClusterSupportAdministrativeActions output type supporting administrative actions that can be run on a cluster for support purposes. \
 * **StorageRunReadCommands**: StorageRunReadCommands output type \
 * **BareMetalMachineRunDataExtractsRestricted**: BareMetalMachineRunDataExtractsRestricted output type
 */
export type CommandOutputType = string;

/** ValidationThreshold indicates allowed machine and node hardware and deployment failures. */
export interface ValidationThreshold {
  /** Selection of how the type evaluation is applied to the cluster calculation. */
  grouping: ValidationThresholdGrouping;
  /** Selection of how the threshold should be evaluated. */
  type: ValidationThresholdType;
  /** The numeric threshold value. */
  value: number;
}

export function validationThresholdSerializer(item: ValidationThreshold): any {
  return { grouping: item["grouping"], type: item["type"], value: item["value"] };
}

export function validationThresholdDeserializer(item: any): ValidationThreshold {
  return {
    grouping: item["grouping"],
    type: item["type"],
    value: item["value"],
  };
}

/** Selection of how the type evaluation is applied to the cluster calculation. */
export enum KnownValidationThresholdGrouping {
  /** The threshold is calculated for the whole cluster. */
  PerCluster = "PerCluster",
  /** The threshold is calculated for each rack in the cluster. */
  PerRack = "PerRack",
}

/**
 * Selection of how the type evaluation is applied to the cluster calculation. \
 * {@link KnownValidationThresholdGrouping} can be used interchangeably with ValidationThresholdGrouping,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PerCluster**: The threshold is calculated for the whole cluster. \
 * **PerRack**: The threshold is calculated for each rack in the cluster.
 */
export type ValidationThresholdGrouping = string;

/** Selection of how the threshold should be evaluated. */
export enum KnownValidationThresholdType {
  /** The threshold is evaluated based on the count of successful operations. */
  CountSuccess = "CountSuccess",
  /** The threshold is evaluated based on the percentage of successful operations. */
  PercentSuccess = "PercentSuccess",
}

/**
 * Selection of how the threshold should be evaluated. \
 * {@link KnownValidationThresholdType} can be used interchangeably with ValidationThresholdType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CountSuccess**: The threshold is evaluated based on the count of successful operations. \
 * **PercentSuccess**: The threshold is evaluated based on the percentage of successful operations.
 */
export type ValidationThresholdType = string;

export function rackDefinitionArraySerializer(result: Array<RackDefinition>): any[] {
  return result.map((item) => {
    return rackDefinitionSerializer(item);
  });
}

export function rackDefinitionArrayDeserializer(result: Array<RackDefinition>): any[] {
  return result.map((item) => {
    return rackDefinitionDeserializer(item);
  });
}

/** RuntimeProtectionConfiguration represents the runtime protection configuration for the cluster. */
export interface RuntimeProtectionConfiguration {
  /** The definition update mode for runtime protection. */
  definitionUpdateMode?: RuntimeProtectionDefinitionUpdateMode;
  /** The mode of operation for runtime protection. */
  enforcementLevel?: RuntimeProtectionEnforcementLevel;
}

export function runtimeProtectionConfigurationSerializer(
  item: RuntimeProtectionConfiguration,
): any {
  return {
    definitionUpdateMode: item["definitionUpdateMode"],
    enforcementLevel: item["enforcementLevel"],
  };
}

export function runtimeProtectionConfigurationDeserializer(
  item: any,
): RuntimeProtectionConfiguration {
  return {
    definitionUpdateMode: item["definitionUpdateMode"],
    enforcementLevel: item["enforcementLevel"],
  };
}

/** ClusterSecretArchive configures the key vault to archive the secrets of the cluster for later retrieval. */
export interface ClusterSecretArchive {
  /** The resource ID of the key vault to archive the secrets of the cluster. */
  keyVaultId: string;
  /** The indicator if the specified key vault should be used to archive the secrets of the cluster. */
  useKeyVault?: ClusterSecretArchiveEnabled;
}

export function clusterSecretArchiveSerializer(item: ClusterSecretArchive): any {
  return { keyVaultId: item["keyVaultId"], useKeyVault: item["useKeyVault"] };
}

export function clusterSecretArchiveDeserializer(item: any): ClusterSecretArchive {
  return {
    keyVaultId: item["keyVaultId"],
    useKeyVault: item["useKeyVault"],
  };
}

/** The indicator if the specified key vault should be used to archive the secrets of the cluster. */
export enum KnownClusterSecretArchiveEnabled {
  /** Enable the cluster secret archive with the specified key vault. */
  True = "True",
  /** Disable use of the cluster secret archive even if a key vault is specified. */
  False = "False",
}

/**
 * The indicator if the specified key vault should be used to archive the secrets of the cluster. \
 * {@link KnownClusterSecretArchiveEnabled} can be used interchangeably with ClusterSecretArchiveEnabled,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: Enable the cluster secret archive with the specified key vault. \
 * **False**: Disable use of the cluster secret archive even if a key vault is specified.
 */
export type ClusterSecretArchiveEnabled = string;

/** SecretArchiveSettings represents the settings for the secret archive used to hold credentials for the cluster. */
export interface SecretArchiveSettings {
  /** The selection of the managed identity to use with this vault URI. The identity type must be either system assigned or user assigned. */
  associatedIdentity?: IdentitySelector;
  /** The URI for the key vault used as the secret archive. */
  vaultUri?: string;
}

export function secretArchiveSettingsSerializer(item: SecretArchiveSettings): any {
  return {
    associatedIdentity: !item["associatedIdentity"]
      ? item["associatedIdentity"]
      : identitySelectorSerializer(item["associatedIdentity"]),
    vaultUri: item["vaultUri"],
  };
}

export function secretArchiveSettingsDeserializer(item: any): SecretArchiveSettings {
  return {
    associatedIdentity: !item["associatedIdentity"]
      ? item["associatedIdentity"]
      : identitySelectorDeserializer(item["associatedIdentity"]),
    vaultUri: item["vaultUri"],
  };
}

/** ClusterUpdateStrategy represents the strategy for updating the cluster. */
export interface ClusterUpdateStrategy {
  /** The maximum number of worker nodes that can be offline within the increment of update, e.g., rack-by-rack. Limited by the maximum number of machines in the increment. Defaults to the whole increment size. */
  maxUnavailable?: number;
  /** The mode of operation for runtime protection. */
  strategyType: ClusterUpdateStrategyType;
  /** Selection of how the threshold should be evaluated. */
  thresholdType: ValidationThresholdType;
  /** The numeric threshold value. */
  thresholdValue: number;
  /** The time to wait between the increments of update defined by the strategy. */
  waitTimeMinutes?: number;
}

export function clusterUpdateStrategySerializer(item: ClusterUpdateStrategy): any {
  return {
    maxUnavailable: item["maxUnavailable"],
    strategyType: item["strategyType"],
    thresholdType: item["thresholdType"],
    thresholdValue: item["thresholdValue"],
    waitTimeMinutes: item["waitTimeMinutes"],
  };
}

export function clusterUpdateStrategyDeserializer(item: any): ClusterUpdateStrategy {
  return {
    maxUnavailable: item["maxUnavailable"],
    strategyType: item["strategyType"],
    thresholdType: item["thresholdType"],
    thresholdValue: item["thresholdValue"],
    waitTimeMinutes: item["waitTimeMinutes"],
  };
}

/** The mode of operation for runtime protection. */
export enum KnownClusterUpdateStrategyType {
  /** Update the cluster in rack-by-rack increments. */
  Rack = "Rack",
  /** Pause after each rack is updated. */
  PauseAfterRack = "PauseAfterRack",
}

/**
 * The mode of operation for runtime protection. \
 * {@link KnownClusterUpdateStrategyType} can be used interchangeably with ClusterUpdateStrategyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Rack**: Update the cluster in rack-by-rack increments. \
 * **PauseAfterRack**: Pause after each rack is updated.
 */
export type ClusterUpdateStrategyType = string;

/** VulnerabilityScanningSettings represents the settings for how security vulnerability scanning is applied to the cluster. */
export interface VulnerabilityScanningSettings {
  /** The mode selection for container vulnerability scanning. */
  containerScan?: VulnerabilityScanningSettingsContainerScan;
}

export function vulnerabilityScanningSettingsSerializer(item: VulnerabilityScanningSettings): any {
  return { containerScan: item["containerScan"] };
}

export function vulnerabilityScanningSettingsDeserializer(
  item: any,
): VulnerabilityScanningSettings {
  return {
    containerScan: item["containerScan"],
  };
}

/** The mode selection for container vulnerability scanning. */
export enum KnownVulnerabilityScanningSettingsContainerScan {
  /** Disable container vulnerability scanning for the cluster. */
  Disabled = "Disabled",
  /** Enable container vulnerability scanning for the cluster. */
  Enabled = "Enabled",
}

/**
 * The mode selection for container vulnerability scanning. \
 * {@link KnownVulnerabilityScanningSettingsContainerScan} can be used interchangeably with VulnerabilityScanningSettingsContainerScan,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disable container vulnerability scanning for the cluster. \
 * **Enabled**: Enable container vulnerability scanning for the cluster.
 */
export type VulnerabilityScanningSettingsContainerScan = string;

export function clusterAvailableUpgradeVersionArrayDeserializer(
  result: Array<ClusterAvailableUpgradeVersion>,
): any[] {
  return result.map((item) => {
    return clusterAvailableUpgradeVersionDeserializer(item);
  });
}

/** ClusterAvailableUpgradeVersion represents the various cluster upgrade parameters. */
export interface ClusterAvailableUpgradeVersion {
  /** The indicator of whether the control plane will be impacted during the upgrade. */
  readonly controlImpact?: ControlImpact;
  /** The expected duration needed for this upgrade. */
  readonly expectedDuration?: string;
  /** The impact description including the specific details and release notes. */
  readonly impactDescription?: string;
  /** The last date the version of the platform is supported. */
  readonly supportExpiryDate?: string;
  /** The target version this cluster will be upgraded to. */
  readonly targetClusterVersion?: string;
  /** The indicator of whether the workload will be impacted during the upgrade. */
  readonly workloadImpact?: WorkloadImpact;
}

export function clusterAvailableUpgradeVersionDeserializer(
  item: any,
): ClusterAvailableUpgradeVersion {
  return {
    controlImpact: item["controlImpact"],
    expectedDuration: item["expectedDuration"],
    impactDescription: item["impactDescription"],
    supportExpiryDate: item["supportExpiryDate"],
    targetClusterVersion: item["targetClusterVersion"],
    workloadImpact: item["workloadImpact"],
  };
}

/** The indicator of whether the control plane will be impacted during the upgrade. */
export enum KnownControlImpact {
  /** The control plane will be impacted during the upgrade. */
  True = "True",
  /** The control plane will not be impacted during the upgrade. */
  False = "False",
}

/**
 * The indicator of whether the control plane will be impacted during the upgrade. \
 * {@link KnownControlImpact} can be used interchangeably with ControlImpact,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: The control plane will be impacted during the upgrade. \
 * **False**: The control plane will not be impacted during the upgrade.
 */
export type ControlImpact = string;

/** The indicator of whether the workload will be impacted during the upgrade. */
export enum KnownWorkloadImpact {
  /** The workload will be impacted during the upgrade. */
  True = "True",
  /** The workload will not be impacted during the upgrade. */
  False = "False",
}

/**
 * The indicator of whether the workload will be impacted during the upgrade. \
 * {@link KnownWorkloadImpact} can be used interchangeably with WorkloadImpact,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: The workload will be impacted during the upgrade. \
 * **False**: The workload will not be impacted during the upgrade.
 */
export type WorkloadImpact = string;

/** ClusterCapacity represents various details regarding compute capacity. */
export interface ClusterCapacity {
  /** The remaining appliance-based storage in GB available for workload use. Measured in gibibytes. */
  availableApplianceStorageGB?: number;
  /** The remaining number of cores that are available in this cluster for workload use. */
  availableCoreCount?: number;
  /** The remaining machine or host-based storage in GB available for workload use. Measured in gibibytes. */
  availableHostStorageGB?: number;
  /** The remaining memory in GB that are available in this cluster for workload use. Measured in gibibytes. */
  availableMemoryGB?: number;
  /** The total appliance-based storage in GB supported by this cluster for workload use. Measured in gibibytes. */
  totalApplianceStorageGB?: number;
  /** The total number of cores that are supported by this cluster for workload use. */
  totalCoreCount?: number;
  /** The total machine or host-based storage in GB supported by this cluster for workload use. Measured in gibibytes. */
  totalHostStorageGB?: number;
  /** The total memory supported by this cluster for workload use. Measured in gibibytes. */
  totalMemoryGB?: number;
}

export function clusterCapacityDeserializer(item: any): ClusterCapacity {
  return {
    availableApplianceStorageGB: item["availableApplianceStorageGB"],
    availableCoreCount: item["availableCoreCount"],
    availableHostStorageGB: item["availableHostStorageGB"],
    availableMemoryGB: item["availableMemoryGB"],
    totalApplianceStorageGB: item["totalApplianceStorageGB"],
    totalCoreCount: item["totalCoreCount"],
    totalHostStorageGB: item["totalHostStorageGB"],
    totalMemoryGB: item["totalMemoryGB"],
  };
}

/** The latest heartbeat status between the cluster manager and the cluster. */
export enum KnownClusterConnectionStatus {
  /** The latest heartbeat status is healthy. */
  Connected = "Connected",
  /** The latest heartbeat status is unhealthy. */
  Disconnected = "Disconnected",
  /** Too many of the latest heartbeats were missed. */
  Timeout = "Timeout",
  /** Could not determine the latest heartbeat status. */
  Undefined = "Undefined",
}

/**
 * The latest heartbeat status between the cluster manager and the cluster. \
 * {@link KnownClusterConnectionStatus} can be used interchangeably with ClusterConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Connected**: The latest heartbeat status is healthy. \
 * **Disconnected**: The latest heartbeat status is unhealthy. \
 * **Timeout**: Too many of the latest heartbeats were missed. \
 * **Undefined**: Could not determine the latest heartbeat status.
 */
export type ClusterConnectionStatus = string;

/** The latest connectivity status between cluster manager and the cluster. */
export enum KnownClusterManagerConnectionStatus {
  /** The latest connectivity status is healthy. */
  Connected = "Connected",
  /** Connectivity could not be established. */
  Unreachable = "Unreachable",
}

/**
 * The latest connectivity status between cluster manager and the cluster. \
 * {@link KnownClusterManagerConnectionStatus} can be used interchangeably with ClusterManagerConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Connected**: The latest connectivity status is healthy. \
 * **Unreachable**: Connectivity could not be established.
 */
export type ClusterManagerConnectionStatus = string;

/** The current detailed status of the cluster. */
export enum KnownClusterDetailedStatus {
  /** The PendingDeployment status. */
  PendingDeployment = "PendingDeployment",
  /** The Deploying status. */
  Deploying = "Deploying",
  /** The Running status. */
  Running = "Running",
  /** The Updating status. */
  Updating = "Updating",
  /** The UpdatePaused status. */
  UpdatePaused = "UpdatePaused",
  /** The Degraded status. */
  Degraded = "Degraded",
  /** The Deleting status. */
  Deleting = "Deleting",
  /** The Disconnected status. */
  Disconnected = "Disconnected",
  /** The Failed status. */
  Failed = "Failed",
}

/**
 * The current detailed status of the cluster. \
 * {@link KnownClusterDetailedStatus} can be used interchangeably with ClusterDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PendingDeployment**: The PendingDeployment status. \
 * **Deploying**: The Deploying status. \
 * **Running**: The Running status. \
 * **Updating**: The Updating status. \
 * **UpdatePaused**: The UpdatePaused status. \
 * **Degraded**: The Degraded status. \
 * **Deleting**: The Deleting status. \
 * **Disconnected**: The Disconnected status. \
 * **Failed**: The Failed status.
 */
export type ClusterDetailedStatus = string;

/** The provisioning state of the cluster. */
export enum KnownClusterProvisioningState {
  /** The Succeeded status. */
  Succeeded = "Succeeded",
  /** The Failed status. */
  Failed = "Failed",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Accepted status. */
  Accepted = "Accepted",
  /** The Validating status. */
  Validating = "Validating",
  /** The Updating status. */
  Updating = "Updating",
}

/**
 * The provisioning state of the cluster. \
 * {@link KnownClusterProvisioningState} can be used interchangeably with ClusterProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The Succeeded status. \
 * **Failed**: The Failed status. \
 * **Canceled**: The Canceled status. \
 * **Accepted**: The Accepted status. \
 * **Validating**: The Validating status. \
 * **Updating**: The Updating status.
 */
export type ClusterProvisioningState = string;

/** ClusterPatchParameters represents the body of the request to patch the cluster properties. */
export interface ClusterPatchParameters {
  /** The identity for the resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The rack definition that is intended to reflect only a single rack in a single rack cluster, or an aggregator rack in a multi-rack cluster. */
  aggregatorOrSingleRackDefinition?: RackDefinition;
  /** The settings for the log analytics workspace used for output of logs from this cluster. */
  analyticsOutputSettings?: AnalyticsOutputSettings;
  /** The customer-provided location information to identify where the cluster resides. */
  clusterLocation?: string;
  /** Field Deprecated: Use managed identity to provide cluster privileges. The service principal to be used by the cluster during Arc Appliance installation. */
  clusterServicePrincipal?: ServicePrincipalInformation;
  /** The settings for commands run in this cluster, such as bare metal machine run read only commands and data extracts. */
  commandOutputSettings?: CommandOutputSettings;
  /** The validation threshold indicating the allowable failures of compute machines during environment validation and deployment. */
  computeDeploymentThreshold?: ValidationThreshold;
  /** The list of rack definitions for the compute racks in a multi-rack cluster, or an empty list in a single-rack cluster. */
  computeRackDefinitions?: RackDefinition[];
  /** The settings for cluster runtime protection. */
  runtimeProtectionConfiguration?: RuntimeProtectionConfiguration;
  /** The configuration for use of a key vault to store secrets for later retrieval by the operator. */
  secretArchive?: ClusterSecretArchive;
  /** The settings for the secret archive used to hold credentials for the cluster. */
  secretArchiveSettings?: SecretArchiveSettings;
  /** The strategy for updating the cluster. */
  updateStrategy?: ClusterUpdateStrategy;
  /** The settings for how security vulnerability scanning is applied to the cluster. */
  vulnerabilityScanningSettings?: VulnerabilityScanningSettingsPatch;
}

export function clusterPatchParametersSerializer(item: ClusterPatchParameters): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, [
      "aggregatorOrSingleRackDefinition",
      "analyticsOutputSettings",
      "clusterLocation",
      "clusterServicePrincipal",
      "commandOutputSettings",
      "computeDeploymentThreshold",
      "computeRackDefinitions",
      "runtimeProtectionConfiguration",
      "secretArchive",
      "secretArchiveSettings",
      "updateStrategy",
      "vulnerabilityScanningSettings",
    ])
      ? undefined
      : _clusterPatchParametersPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** ClusterPatchProperties represents the properties of the cluster for patching. */
export interface ClusterPatchProperties {
  /** The rack definition that is intended to reflect only a single rack in a single rack cluster, or an aggregator rack in a multi-rack cluster. */
  aggregatorOrSingleRackDefinition?: RackDefinition;
  /** The settings for the log analytics workspace used for output of logs from this cluster. */
  analyticsOutputSettings?: AnalyticsOutputSettings;
  /** The customer-provided location information to identify where the cluster resides. */
  clusterLocation?: string;
  /** Field Deprecated: Use managed identity to provide cluster privileges. The service principal to be used by the cluster during Arc Appliance installation. */
  clusterServicePrincipal?: ServicePrincipalInformation;
  /** The settings for commands run in this cluster, such as bare metal machine run read only commands and data extracts. */
  commandOutputSettings?: CommandOutputSettings;
  /** The validation threshold indicating the allowable failures of compute machines during environment validation and deployment. */
  computeDeploymentThreshold?: ValidationThreshold;
  /** The list of rack definitions for the compute racks in a multi-rack cluster, or an empty list in a single-rack cluster. */
  computeRackDefinitions?: RackDefinition[];
  /** The settings for cluster runtime protection. */
  runtimeProtectionConfiguration?: RuntimeProtectionConfiguration;
  /** The configuration for use of a key vault to store secrets for later retrieval by the operator. */
  secretArchive?: ClusterSecretArchive;
  /** The settings for the secret archive used to hold credentials for the cluster. */
  secretArchiveSettings?: SecretArchiveSettings;
  /** The strategy for updating the cluster. */
  updateStrategy?: ClusterUpdateStrategy;
  /** The settings for how security vulnerability scanning is applied to the cluster. */
  vulnerabilityScanningSettings?: VulnerabilityScanningSettingsPatch;
}

export function clusterPatchPropertiesSerializer(item: ClusterPatchProperties): any {
  return {
    aggregatorOrSingleRackDefinition: !item["aggregatorOrSingleRackDefinition"]
      ? item["aggregatorOrSingleRackDefinition"]
      : rackDefinitionSerializer(item["aggregatorOrSingleRackDefinition"]),
    analyticsOutputSettings: !item["analyticsOutputSettings"]
      ? item["analyticsOutputSettings"]
      : analyticsOutputSettingsSerializer(item["analyticsOutputSettings"]),
    clusterLocation: item["clusterLocation"],
    clusterServicePrincipal: !item["clusterServicePrincipal"]
      ? item["clusterServicePrincipal"]
      : servicePrincipalInformationSerializer(item["clusterServicePrincipal"]),
    commandOutputSettings: !item["commandOutputSettings"]
      ? item["commandOutputSettings"]
      : commandOutputSettingsSerializer(item["commandOutputSettings"]),
    computeDeploymentThreshold: !item["computeDeploymentThreshold"]
      ? item["computeDeploymentThreshold"]
      : validationThresholdSerializer(item["computeDeploymentThreshold"]),
    computeRackDefinitions: !item["computeRackDefinitions"]
      ? item["computeRackDefinitions"]
      : rackDefinitionArraySerializer(item["computeRackDefinitions"]),
    runtimeProtectionConfiguration: !item["runtimeProtectionConfiguration"]
      ? item["runtimeProtectionConfiguration"]
      : runtimeProtectionConfigurationSerializer(item["runtimeProtectionConfiguration"]),
    secretArchive: !item["secretArchive"]
      ? item["secretArchive"]
      : clusterSecretArchiveSerializer(item["secretArchive"]),
    secretArchiveSettings: !item["secretArchiveSettings"]
      ? item["secretArchiveSettings"]
      : secretArchiveSettingsSerializer(item["secretArchiveSettings"]),
    updateStrategy: !item["updateStrategy"]
      ? item["updateStrategy"]
      : clusterUpdateStrategySerializer(item["updateStrategy"]),
    vulnerabilityScanningSettings: !item["vulnerabilityScanningSettings"]
      ? item["vulnerabilityScanningSettings"]
      : vulnerabilityScanningSettingsPatchSerializer(item["vulnerabilityScanningSettings"]),
  };
}

/** VulnerabilityScanningSettingsPatch represents the settings for how security vulnerability scanning is applied to the cluster. */
export interface VulnerabilityScanningSettingsPatch {
  /** The mode selection for container vulnerability scanning. */
  containerScan?: VulnerabilityScanningSettingsContainerScan;
}

export function vulnerabilityScanningSettingsPatchSerializer(
  item: VulnerabilityScanningSettingsPatch,
): any {
  return { containerScan: item["containerScan"] };
}

/** ClusterList represents a list of clusters. */
export interface _ClusterList {
  /** The Cluster items on this page */
  value: Cluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clusterListDeserializer(item: any): _ClusterList {
  return {
    value: clusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clusterArraySerializer(result: Array<Cluster>): any[] {
  return result.map((item) => {
    return clusterSerializer(item);
  });
}

export function clusterArrayDeserializer(result: Array<Cluster>): any[] {
  return result.map((item) => {
    return clusterDeserializer(item);
  });
}

/** ClusterContinueUpdateVersionParameters represents the body of the request to continue the update of a cluster version. */
export interface ClusterContinueUpdateVersionParameters {
  /** The mode by which the cluster will target the next grouping of servers to continue the update. */
  machineGroupTargetingMode?: ClusterContinueUpdateVersionMachineGroupTargetingMode;
  /** Specifies how safeguards are applied during the continue update version operation. Use All to run all pre‑operation validation checks. Use None to bypass safeguards. If not specified, the default is All. */
  safeguardMode?: ClusterContinueUpdateVersionSafeguardMode;
}

export function clusterContinueUpdateVersionParametersSerializer(
  item: ClusterContinueUpdateVersionParameters,
): any {
  return {
    machineGroupTargetingMode: item["machineGroupTargetingMode"],
    safeguardMode: item["safeguardMode"],
  };
}

/** The mode by which the cluster will target the next grouping of servers to continue the update. */
export enum KnownClusterContinueUpdateVersionMachineGroupTargetingMode {
  /** Racks will be targeted for update in alphabetical order based on the rack name. */
  AlphaByRack = "AlphaByRack",
}

/**
 * The mode by which the cluster will target the next grouping of servers to continue the update. \
 * {@link KnownClusterContinueUpdateVersionMachineGroupTargetingMode} can be used interchangeably with ClusterContinueUpdateVersionMachineGroupTargetingMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AlphaByRack**: Racks will be targeted for update in alphabetical order based on the rack name.
 */
export type ClusterContinueUpdateVersionMachineGroupTargetingMode = string;

/** ClusterContinueUpdateVersionSafeguardMode represents the mode of the cluster continue update safeguards. */
export enum KnownClusterContinueUpdateVersionSafeguardMode {
  /** Run all pre‑operation validation checks before continuing the version update. If any check fails, the request is rejected and no changes are made. */
  All = "All",
  /** Skip all safeguards and continue the version update without running pre‑operation validation checks. */
  None = "None",
}

/**
 * ClusterContinueUpdateVersionSafeguardMode represents the mode of the cluster continue update safeguards. \
 * {@link KnownClusterContinueUpdateVersionSafeguardMode} can be used interchangeably with ClusterContinueUpdateVersionSafeguardMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **All**: Run all pre‑operation validation checks before continuing the version update. If any check fails, the request is rejected and no changes are made. \
 * **None**: Skip all safeguards and continue the version update without running pre‑operation validation checks.
 */
export type ClusterContinueUpdateVersionSafeguardMode = string;

/** ClusterDeployParameters represents the body of the request to deploy cluster. */
export interface ClusterDeployParameters {
  /** The names of bare metal machines in the cluster that should be skipped during environment validation. */
  skipValidationsForMachines?: string[];
}

export function clusterDeployParametersSerializer(item: ClusterDeployParameters): any {
  return {
    skipValidationsForMachines: !item["skipValidationsForMachines"]
      ? item["skipValidationsForMachines"]
      : item["skipValidationsForMachines"].map((p: any) => {
          return p;
        }),
  };
}

/** ClusterInspectParameters represents the body of the request to inspect the cluster. */
export interface ClusterInspectParameters {
  /** Additional actions supplement the default non-disruptive cluster inspection. Additional actions may be disallowed if the cluster is in a deployed and running state. */
  additionalActions?: ClusterInspectAdditionalAction[];
  /** Indicates which devices are included in the inspection. By default, all devices that can be targeted will be included in the inspection. */
  filterDevices?: FilterDevices;
}

export function clusterInspectParametersSerializer(item: ClusterInspectParameters): any {
  return {
    additionalActions: !item["additionalActions"]
      ? item["additionalActions"]
      : item["additionalActions"].map((p: any) => {
          return p;
        }),
    filterDevices: !item["filterDevices"]
      ? item["filterDevices"]
      : filterDevicesSerializer(item["filterDevices"]),
  };
}

/** Additional actions supplement the default non-disruptive cluster inspection. Additional actions may be disallowed if the cluster is in a deployed and running state. */
export enum KnownClusterInspectAdditionalAction {
  /** Indicates that hardware reset should be performed during inspection. */
  ResetHardware = "ResetHardware",
}

/**
 * Additional actions supplement the default non-disruptive cluster inspection. Additional actions may be disallowed if the cluster is in a deployed and running state. \
 * {@link KnownClusterInspectAdditionalAction} can be used interchangeably with ClusterInspectAdditionalAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ResetHardware**: Indicates that hardware reset should be performed during inspection.
 */
export type ClusterInspectAdditionalAction = string;

/** FilterDevices defines the filtered target of the inspection. */
export interface FilterDevices {
  /** The list of bare metal machine names to include in the inspection. */
  bareMetalMachineNames?: string[];
  /** The list of rack names to include in the inspection. */
  rackNames?: string[];
}

export function filterDevicesSerializer(item: FilterDevices): any {
  return {
    bareMetalMachineNames: !item["bareMetalMachineNames"]
      ? item["bareMetalMachineNames"]
      : item["bareMetalMachineNames"].map((p: any) => {
          return p;
        }),
    rackNames: !item["rackNames"]
      ? item["rackNames"]
      : item["rackNames"].map((p: any) => {
          return p;
        }),
  };
}

/** ClusterRotateCredentialParameters represents the body of the request to rotate cluster credentials. */
export interface ClusterRotateCredentialParameters {
  /** The list of credential names for the credentials to rotate. */
  credentials: string[];
}

export function clusterRotateCredentialParametersSerializer(
  item: ClusterRotateCredentialParameters,
): any {
  return {
    credentials: item["credentials"].map((p: any) => {
      return p;
    }),
  };
}

/** ClusterScanRuntimeParameters defines the parameters for the cluster scan runtime operation. */
export interface ClusterScanRuntimeParameters {
  /** The choice of if the scan operation should run the scan. */
  scanActivity?: ClusterScanRuntimeParametersScanActivity;
}

export function clusterScanRuntimeParametersSerializer(item: ClusterScanRuntimeParameters): any {
  return { scanActivity: item["scanActivity"] };
}

/** The choice of if the scan operation should run the scan. */
export enum KnownClusterScanRuntimeParametersScanActivity {
  /** Scan the cluster. */
  Scan = "Scan",
  /** Do not scan the cluster. */
  Skip = "Skip",
}

/**
 * The choice of if the scan operation should run the scan. \
 * {@link KnownClusterScanRuntimeParametersScanActivity} can be used interchangeably with ClusterScanRuntimeParametersScanActivity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Scan**: Scan the cluster. \
 * **Skip**: Do not scan the cluster.
 */
export type ClusterScanRuntimeParametersScanActivity = string;

/** ClusterUpdateVersionParameters represents the body of the request to update cluster version. */
export interface ClusterUpdateVersionParameters {
  /** Specifies how safeguards are applied during the update version operation. Use All to run all pre‑operation validation checks. Use None to bypass safeguards. If not specified, the default is All. */
  safeguardMode?: ClusterUpdateVersionSafeguardMode;
  /** The version to be applied to the cluster during update. */
  targetClusterVersion: string;
}

export function clusterUpdateVersionParametersSerializer(
  item: ClusterUpdateVersionParameters,
): any {
  return {
    safeguardMode: item["safeguardMode"],
    targetClusterVersion: item["targetClusterVersion"],
  };
}

/** ClusterUpdateVersionSafeguardMode represents the mode of the cluster update safeguards. */
export enum KnownClusterUpdateVersionSafeguardMode {
  /** Run all pre‑operation validation checks before performing the version update. If any check fails, the request is rejected and no changes are made. */
  All = "All",
  /** Skip all safeguards and perform the version update without running pre‑operation validation checks. */
  None = "None",
}

/**
 * ClusterUpdateVersionSafeguardMode represents the mode of the cluster update safeguards. \
 * {@link KnownClusterUpdateVersionSafeguardMode} can be used interchangeably with ClusterUpdateVersionSafeguardMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **All**: Run all pre‑operation validation checks before performing the version update. If any check fails, the request is rejected and no changes are made. \
 * **None**: Skip all safeguards and perform the version update without running pre‑operation validation checks.
 */
export type ClusterUpdateVersionSafeguardMode = string;

/** KubernetesCluster represents the Kubernetes cluster hosted on Network Cloud. */
export interface KubernetesCluster extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The extended location of the resource. This property is required when creating the resource. */
  extendedLocation: ExtendedLocation;
  /** The Azure Active Directory Integration properties. */
  aadConfiguration?: AadConfiguration;
  /** The administrative credentials that will be applied to the control plane and agent pool nodes that do not specify their own values. */
  administratorConfiguration?: AdministratorConfiguration;
  /** The defining characteristics of the control plane for this Kubernetes Cluster. */
  controlPlaneNodeConfiguration: ControlPlaneNodeConfiguration;
  /** The agent pools that are created with this Kubernetes cluster for running critical system services and workloads. This data in this field is only used during creation, and the field will be empty following the creation of the Kubernetes Cluster. After creation, the management of agent pools is done using the agentPools sub-resource. */
  initialAgentPoolConfigurations: InitialAgentPoolConfiguration[];
  /** The Kubernetes version for this cluster. */
  kubernetesVersion: string;
  /** The configuration of the managed resource group associated with the resource. */
  managedResourceGroupConfiguration?: ManagedResourceGroupConfiguration;
  /** The configuration of the Kubernetes cluster networking, including the attachment of networks that span the cluster. */
  networkConfiguration: NetworkConfiguration;
  /** The full list of network resource IDs that are attached to this cluster, including those attached only to specific agent pools. */
  readonly attachedNetworkIds?: string[];
  /** The list of versions that this Kubernetes cluster can be upgraded to. */
  readonly availableUpgrades?: AvailableUpgrade[];
  /** The resource ID of the Network Cloud cluster. */
  readonly clusterId?: string;
  /** The resource ID of the connected cluster set up when this Kubernetes cluster is created. */
  readonly connectedClusterId?: string;
  /** The current running version of Kubernetes on the control plane. */
  readonly controlPlaneKubernetesVersion?: string;
  /** The current status of the Kubernetes cluster. */
  readonly detailedStatus?: KubernetesClusterDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The current feature settings. */
  readonly featureStatuses?: FeatureStatus[];
  /** The details of the nodes in this cluster. */
  readonly nodes?: KubernetesClusterNode[];
  /** The provisioning state of the Kubernetes cluster resource. */
  readonly provisioningState?: KubernetesClusterProvisioningState;
}

export function kubernetesClusterSerializer(item: KubernetesCluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _kubernetesClusterPropertiesSerializer(item),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function kubernetesClusterDeserializer(item: any): KubernetesCluster {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._kubernetesClusterPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** KubernetesClusterProperties represents the properties of Kubernetes cluster resource. */
export interface KubernetesClusterProperties {
  /** The Azure Active Directory Integration properties. */
  aadConfiguration?: AadConfiguration;
  /** The administrative credentials that will be applied to the control plane and agent pool nodes that do not specify their own values. */
  administratorConfiguration?: AdministratorConfiguration;
  /** The defining characteristics of the control plane for this Kubernetes Cluster. */
  controlPlaneNodeConfiguration: ControlPlaneNodeConfiguration;
  /** The agent pools that are created with this Kubernetes cluster for running critical system services and workloads. This data in this field is only used during creation, and the field will be empty following the creation of the Kubernetes Cluster. After creation, the management of agent pools is done using the agentPools sub-resource. */
  initialAgentPoolConfigurations: InitialAgentPoolConfiguration[];
  /** The Kubernetes version for this cluster. */
  kubernetesVersion: string;
  /** The configuration of the managed resource group associated with the resource. */
  managedResourceGroupConfiguration?: ManagedResourceGroupConfiguration;
  /** The configuration of the Kubernetes cluster networking, including the attachment of networks that span the cluster. */
  networkConfiguration: NetworkConfiguration;
  /** The full list of network resource IDs that are attached to this cluster, including those attached only to specific agent pools. */
  readonly attachedNetworkIds?: string[];
  /** The list of versions that this Kubernetes cluster can be upgraded to. */
  readonly availableUpgrades?: AvailableUpgrade[];
  /** The resource ID of the Network Cloud cluster. */
  readonly clusterId?: string;
  /** The resource ID of the connected cluster set up when this Kubernetes cluster is created. */
  readonly connectedClusterId?: string;
  /** The current running version of Kubernetes on the control plane. */
  readonly controlPlaneKubernetesVersion?: string;
  /** The current status of the Kubernetes cluster. */
  readonly detailedStatus?: KubernetesClusterDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The current feature settings. */
  readonly featureStatuses?: FeatureStatus[];
  /** The details of the nodes in this cluster. */
  readonly nodes?: KubernetesClusterNode[];
  /** The provisioning state of the Kubernetes cluster resource. */
  readonly provisioningState?: KubernetesClusterProvisioningState;
}

export function kubernetesClusterPropertiesSerializer(item: KubernetesClusterProperties): any {
  return {
    aadConfiguration: !item["aadConfiguration"]
      ? item["aadConfiguration"]
      : aadConfigurationSerializer(item["aadConfiguration"]),
    administratorConfiguration: !item["administratorConfiguration"]
      ? item["administratorConfiguration"]
      : administratorConfigurationSerializer(item["administratorConfiguration"]),
    controlPlaneNodeConfiguration: controlPlaneNodeConfigurationSerializer(
      item["controlPlaneNodeConfiguration"],
    ),
    initialAgentPoolConfigurations: initialAgentPoolConfigurationArraySerializer(
      item["initialAgentPoolConfigurations"],
    ),
    kubernetesVersion: item["kubernetesVersion"],
    managedResourceGroupConfiguration: !item["managedResourceGroupConfiguration"]
      ? item["managedResourceGroupConfiguration"]
      : managedResourceGroupConfigurationSerializer(item["managedResourceGroupConfiguration"]),
    networkConfiguration: networkConfigurationSerializer(item["networkConfiguration"]),
  };
}

export function kubernetesClusterPropertiesDeserializer(item: any): KubernetesClusterProperties {
  return {
    aadConfiguration: !item["aadConfiguration"]
      ? item["aadConfiguration"]
      : aadConfigurationDeserializer(item["aadConfiguration"]),
    administratorConfiguration: !item["administratorConfiguration"]
      ? item["administratorConfiguration"]
      : administratorConfigurationDeserializer(item["administratorConfiguration"]),
    controlPlaneNodeConfiguration: controlPlaneNodeConfigurationDeserializer(
      item["controlPlaneNodeConfiguration"],
    ),
    initialAgentPoolConfigurations: initialAgentPoolConfigurationArrayDeserializer(
      item["initialAgentPoolConfigurations"],
    ),
    kubernetesVersion: item["kubernetesVersion"],
    managedResourceGroupConfiguration: !item["managedResourceGroupConfiguration"]
      ? item["managedResourceGroupConfiguration"]
      : managedResourceGroupConfigurationDeserializer(item["managedResourceGroupConfiguration"]),
    networkConfiguration: networkConfigurationDeserializer(item["networkConfiguration"]),
    attachedNetworkIds: !item["attachedNetworkIds"]
      ? item["attachedNetworkIds"]
      : item["attachedNetworkIds"].map((p: any) => {
          return p;
        }),
    availableUpgrades: !item["availableUpgrades"]
      ? item["availableUpgrades"]
      : availableUpgradeArrayDeserializer(item["availableUpgrades"]),
    clusterId: item["clusterId"],
    connectedClusterId: item["connectedClusterId"],
    controlPlaneKubernetesVersion: item["controlPlaneKubernetesVersion"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    featureStatuses: !item["featureStatuses"]
      ? item["featureStatuses"]
      : featureStatusArrayDeserializer(item["featureStatuses"]),
    nodes: !item["nodes"] ? item["nodes"] : kubernetesClusterNodeArrayDeserializer(item["nodes"]),
    provisioningState: item["provisioningState"],
  };
}

/** AadConfiguration represents the Azure Active Directory Integration properties. */
export interface AadConfiguration {
  /** The list of Azure Active Directory group object IDs that will have an administrative role on the Kubernetes cluster. */
  adminGroupObjectIds: string[];
}

export function aadConfigurationSerializer(item: AadConfiguration): any {
  return {
    adminGroupObjectIds: item["adminGroupObjectIds"].map((p: any) => {
      return p;
    }),
  };
}

export function aadConfigurationDeserializer(item: any): AadConfiguration {
  return {
    adminGroupObjectIds: item["adminGroupObjectIds"].map((p: any) => {
      return p;
    }),
  };
}

/** AdministratorConfiguration represents the administrative credentials that will be applied to the control plane and agent pool nodes in Kubernetes clusters. */
export interface AdministratorConfiguration {
  /** The user name for the administrator that will be applied to the operating systems that run Kubernetes nodes. If not supplied, a user name will be chosen by the service. */
  adminUsername?: string;
  /** The SSH configuration for the operating systems that run the nodes in the Kubernetes cluster. In some cases, specification of public keys may be required to produce a working environment. */
  sshPublicKeys?: SshPublicKey[];
}

export function administratorConfigurationSerializer(item: AdministratorConfiguration): any {
  return {
    adminUsername: item["adminUsername"],
    sshPublicKeys: !item["sshPublicKeys"]
      ? item["sshPublicKeys"]
      : sshPublicKeyArraySerializer(item["sshPublicKeys"]),
  };
}

export function administratorConfigurationDeserializer(item: any): AdministratorConfiguration {
  return {
    adminUsername: item["adminUsername"],
    sshPublicKeys: !item["sshPublicKeys"]
      ? item["sshPublicKeys"]
      : sshPublicKeyArrayDeserializer(item["sshPublicKeys"]),
  };
}

export function sshPublicKeyArraySerializer(result: Array<SshPublicKey>): any[] {
  return result.map((item) => {
    return sshPublicKeySerializer(item);
  });
}

export function sshPublicKeyArrayDeserializer(result: Array<SshPublicKey>): any[] {
  return result.map((item) => {
    return sshPublicKeyDeserializer(item);
  });
}

/** SshPublicKey represents the public key used to authenticate with a resource through SSH. */
export interface SshPublicKey {
  /** The SSH public key data. */
  keyData: string;
}

export function sshPublicKeySerializer(item: SshPublicKey): any {
  return { keyData: item["keyData"] };
}

export function sshPublicKeyDeserializer(item: any): SshPublicKey {
  return {
    keyData: item["keyData"],
  };
}

/** ControlPlaneNodeConfiguration represents the selection of virtual machines and size of the control plane for a Kubernetes cluster. */
export interface ControlPlaneNodeConfiguration {
  /** The administrator credentials to be used for the nodes in the control plane. */
  administratorConfiguration?: AdministratorConfiguration;
  /** The list of availability zones of the Network Cloud cluster to be used for the provisioning of nodes in the control plane. If not specified, all availability zones will be used. */
  availabilityZones?: string[];
  /** The number of virtual machines that use this configuration. */
  count: number;
  /** The name of the VM SKU supplied during creation. */
  vmSkuName: string;
}

export function controlPlaneNodeConfigurationSerializer(item: ControlPlaneNodeConfiguration): any {
  return {
    administratorConfiguration: !item["administratorConfiguration"]
      ? item["administratorConfiguration"]
      : administratorConfigurationSerializer(item["administratorConfiguration"]),
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    count: item["count"],
    vmSkuName: item["vmSkuName"],
  };
}

export function controlPlaneNodeConfigurationDeserializer(
  item: any,
): ControlPlaneNodeConfiguration {
  return {
    administratorConfiguration: !item["administratorConfiguration"]
      ? item["administratorConfiguration"]
      : administratorConfigurationDeserializer(item["administratorConfiguration"]),
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    count: item["count"],
    vmSkuName: item["vmSkuName"],
  };
}

export function initialAgentPoolConfigurationArraySerializer(
  result: Array<InitialAgentPoolConfiguration>,
): any[] {
  return result.map((item) => {
    return initialAgentPoolConfigurationSerializer(item);
  });
}

export function initialAgentPoolConfigurationArrayDeserializer(
  result: Array<InitialAgentPoolConfiguration>,
): any[] {
  return result.map((item) => {
    return initialAgentPoolConfigurationDeserializer(item);
  });
}

/** InitialAgentPoolConfiguration specifies the configuration of a pool of virtual machines that are initially defined with a Kubernetes cluster. */
export interface InitialAgentPoolConfiguration {
  /** The administrator credentials to be used for the nodes in this agent pool. */
  administratorConfiguration?: AdministratorConfiguration;
  /** The configurations that will be applied to each agent in this agent pool. */
  agentOptions?: AgentOptions;
  /** The configuration of networks being attached to the agent pool for use by the workloads that run on this Kubernetes cluster. */
  attachedNetworkConfiguration?: AttachedNetworkConfiguration;
  /** The list of availability zones of the Network Cloud cluster used for the provisioning of nodes in this agent pool. If not specified, all availability zones will be used. */
  availabilityZones?: string[];
  /** The number of virtual machines that use this configuration. */
  count: number;
  /** The labels applied to the nodes in this agent pool. */
  labels?: KubernetesLabel[];
  /** The selection of how this agent pool is utilized, either as a system pool or a user pool. System pools run the features and critical services for the Kubernetes Cluster, while user pools are dedicated to user workloads. Every Kubernetes cluster must contain at least one system node pool with at least one node. */
  mode: AgentPoolMode;
  /** The taints applied to the nodes in this agent pool. */
  taints?: KubernetesLabel[];
  /** The configuration of the agent pool. */
  upgradeSettings?: AgentPoolUpgradeSettings;
  /** The name of the VM SKU that determines the size of resources allocated for node VMs. */
  vmSkuName: string;
  /** The name that will be used for the agent pool resource representing this agent pool. */
  name: string;
}

export function initialAgentPoolConfigurationSerializer(item: InitialAgentPoolConfiguration): any {
  return {
    administratorConfiguration: !item["administratorConfiguration"]
      ? item["administratorConfiguration"]
      : administratorConfigurationSerializer(item["administratorConfiguration"]),
    agentOptions: !item["agentOptions"]
      ? item["agentOptions"]
      : agentOptionsSerializer(item["agentOptions"]),
    attachedNetworkConfiguration: !item["attachedNetworkConfiguration"]
      ? item["attachedNetworkConfiguration"]
      : attachedNetworkConfigurationSerializer(item["attachedNetworkConfiguration"]),
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    count: item["count"],
    labels: !item["labels"] ? item["labels"] : kubernetesLabelArraySerializer(item["labels"]),
    mode: item["mode"],
    taints: !item["taints"] ? item["taints"] : kubernetesLabelArraySerializer(item["taints"]),
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsSerializer(item["upgradeSettings"]),
    vmSkuName: item["vmSkuName"],
    name: item["name"],
  };
}

export function initialAgentPoolConfigurationDeserializer(
  item: any,
): InitialAgentPoolConfiguration {
  return {
    administratorConfiguration: !item["administratorConfiguration"]
      ? item["administratorConfiguration"]
      : administratorConfigurationDeserializer(item["administratorConfiguration"]),
    agentOptions: !item["agentOptions"]
      ? item["agentOptions"]
      : agentOptionsDeserializer(item["agentOptions"]),
    attachedNetworkConfiguration: !item["attachedNetworkConfiguration"]
      ? item["attachedNetworkConfiguration"]
      : attachedNetworkConfigurationDeserializer(item["attachedNetworkConfiguration"]),
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    count: item["count"],
    labels: !item["labels"] ? item["labels"] : kubernetesLabelArrayDeserializer(item["labels"]),
    mode: item["mode"],
    taints: !item["taints"] ? item["taints"] : kubernetesLabelArrayDeserializer(item["taints"]),
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsDeserializer(item["upgradeSettings"]),
    vmSkuName: item["vmSkuName"],
    name: item["name"],
  };
}

/** AgentOptions are configurations that will be applied to each agent in an agent pool. */
export interface AgentOptions {
  /** The number of hugepages to allocate. */
  hugepagesCount: number;
  /** The size of the hugepages to allocate. */
  hugepagesSize?: HugepagesSize;
}

export function agentOptionsSerializer(item: AgentOptions): any {
  return { hugepagesCount: item["hugepagesCount"], hugepagesSize: item["hugepagesSize"] };
}

export function agentOptionsDeserializer(item: any): AgentOptions {
  return {
    hugepagesCount: item["hugepagesCount"],
    hugepagesSize: item["hugepagesSize"],
  };
}

/** The size of the hugepages to allocate. */
export enum KnownHugepagesSize {
  /** 2M hugepages */
  TwoM = "2M",
  /** 1G hugepages */
  OneG = "1G",
}

/**
 * The size of the hugepages to allocate. \
 * {@link KnownHugepagesSize} can be used interchangeably with HugepagesSize,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **2M**: 2M hugepages \
 * **1G**: 1G hugepages
 */
export type HugepagesSize = string;

/** AttachedNetworkConfiguration represents the set of workload networks to attach to a resource. */
export interface AttachedNetworkConfiguration {
  /** The list of Layer 2 Networks and related configuration for attachment. */
  l2Networks?: L2NetworkAttachmentConfiguration[];
  /** The list of Layer 3 Networks and related configuration for attachment. */
  l3Networks?: L3NetworkAttachmentConfiguration[];
  /** The list of Trunked Networks and related configuration for attachment. */
  trunkedNetworks?: TrunkedNetworkAttachmentConfiguration[];
}

export function attachedNetworkConfigurationSerializer(item: AttachedNetworkConfiguration): any {
  return {
    l2Networks: !item["l2Networks"]
      ? item["l2Networks"]
      : l2NetworkAttachmentConfigurationArraySerializer(item["l2Networks"]),
    l3Networks: !item["l3Networks"]
      ? item["l3Networks"]
      : l3NetworkAttachmentConfigurationArraySerializer(item["l3Networks"]),
    trunkedNetworks: !item["trunkedNetworks"]
      ? item["trunkedNetworks"]
      : trunkedNetworkAttachmentConfigurationArraySerializer(item["trunkedNetworks"]),
  };
}

export function attachedNetworkConfigurationDeserializer(item: any): AttachedNetworkConfiguration {
  return {
    l2Networks: !item["l2Networks"]
      ? item["l2Networks"]
      : l2NetworkAttachmentConfigurationArrayDeserializer(item["l2Networks"]),
    l3Networks: !item["l3Networks"]
      ? item["l3Networks"]
      : l3NetworkAttachmentConfigurationArrayDeserializer(item["l3Networks"]),
    trunkedNetworks: !item["trunkedNetworks"]
      ? item["trunkedNetworks"]
      : trunkedNetworkAttachmentConfigurationArrayDeserializer(item["trunkedNetworks"]),
  };
}

export function l2NetworkAttachmentConfigurationArraySerializer(
  result: Array<L2NetworkAttachmentConfiguration>,
): any[] {
  return result.map((item) => {
    return l2NetworkAttachmentConfigurationSerializer(item);
  });
}

export function l2NetworkAttachmentConfigurationArrayDeserializer(
  result: Array<L2NetworkAttachmentConfiguration>,
): any[] {
  return result.map((item) => {
    return l2NetworkAttachmentConfigurationDeserializer(item);
  });
}

/** L2NetworkAttachmentConfiguration represents the configuration of the attachment of a Layer 2 network. */
export interface L2NetworkAttachmentConfiguration {
  /** The resource ID of the network that is being configured for attachment. */
  networkId: string;
  /** The indicator of how this network will be utilized by the Kubernetes cluster. */
  pluginType?: KubernetesPluginType;
}

export function l2NetworkAttachmentConfigurationSerializer(
  item: L2NetworkAttachmentConfiguration,
): any {
  return { networkId: item["networkId"], pluginType: item["pluginType"] };
}

export function l2NetworkAttachmentConfigurationDeserializer(
  item: any,
): L2NetworkAttachmentConfiguration {
  return {
    networkId: item["networkId"],
    pluginType: item["pluginType"],
  };
}

/** The indicator of how this network will be utilized by the Kubernetes cluster. */
export enum KnownKubernetesPluginType {
  /** DPDK plugin type */
  Dpdk = "DPDK",
  /** SRIOV plugin type */
  Sriov = "SRIOV",
  /** OSDevice plugin type */
  OSDevice = "OSDevice",
  /** MACVLAN plugin type */
  Macvlan = "MACVLAN",
  /** IPVLAN plugin type */
  Ipvlan = "IPVLAN",
}

/**
 * The indicator of how this network will be utilized by the Kubernetes cluster. \
 * {@link KnownKubernetesPluginType} can be used interchangeably with KubernetesPluginType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DPDK**: DPDK plugin type \
 * **SRIOV**: SRIOV plugin type \
 * **OSDevice**: OSDevice plugin type \
 * **MACVLAN**: MACVLAN plugin type \
 * **IPVLAN**: IPVLAN plugin type
 */
export type KubernetesPluginType = string;

export function l3NetworkAttachmentConfigurationArraySerializer(
  result: Array<L3NetworkAttachmentConfiguration>,
): any[] {
  return result.map((item) => {
    return l3NetworkAttachmentConfigurationSerializer(item);
  });
}

export function l3NetworkAttachmentConfigurationArrayDeserializer(
  result: Array<L3NetworkAttachmentConfiguration>,
): any[] {
  return result.map((item) => {
    return l3NetworkAttachmentConfigurationDeserializer(item);
  });
}

/** L3NetworkAttachmentConfiguration represents the configuration of the attachment of a Layer 3 network. */
export interface L3NetworkAttachmentConfiguration {
  /** The indication of whether this network will or will not perform IP address management and allocate IP addresses when attached. */
  ipamEnabled?: L3NetworkConfigurationIpamEnabled;
  /** The resource ID of the network that is being configured for attachment. */
  networkId: string;
  /** The indicator of how this network will be utilized by the Kubernetes cluster. */
  pluginType?: KubernetesPluginType;
}

export function l3NetworkAttachmentConfigurationSerializer(
  item: L3NetworkAttachmentConfiguration,
): any {
  return {
    ipamEnabled: item["ipamEnabled"],
    networkId: item["networkId"],
    pluginType: item["pluginType"],
  };
}

export function l3NetworkAttachmentConfigurationDeserializer(
  item: any,
): L3NetworkAttachmentConfiguration {
  return {
    ipamEnabled: item["ipamEnabled"],
    networkId: item["networkId"],
    pluginType: item["pluginType"],
  };
}

/** The indication of whether this network will or will not perform IP address management and allocate IP addresses when attached. */
export enum KnownL3NetworkConfigurationIpamEnabled {
  /** IP address management enabled. */
  True = "True",
  /** IP address management disabled. */
  False = "False",
}

/**
 * The indication of whether this network will or will not perform IP address management and allocate IP addresses when attached. \
 * {@link KnownL3NetworkConfigurationIpamEnabled} can be used interchangeably with L3NetworkConfigurationIpamEnabled,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: IP address management enabled. \
 * **False**: IP address management disabled.
 */
export type L3NetworkConfigurationIpamEnabled = string;

export function trunkedNetworkAttachmentConfigurationArraySerializer(
  result: Array<TrunkedNetworkAttachmentConfiguration>,
): any[] {
  return result.map((item) => {
    return trunkedNetworkAttachmentConfigurationSerializer(item);
  });
}

export function trunkedNetworkAttachmentConfigurationArrayDeserializer(
  result: Array<TrunkedNetworkAttachmentConfiguration>,
): any[] {
  return result.map((item) => {
    return trunkedNetworkAttachmentConfigurationDeserializer(item);
  });
}

/** TrunkedNetworkAttachmentConfiguration represents the configuration of the attachment of a trunked network. */
export interface TrunkedNetworkAttachmentConfiguration {
  /** The resource ID of the network that is being configured for attachment. */
  networkId: string;
  /** The indicator of how this network will be utilized by the Kubernetes cluster. */
  pluginType?: KubernetesPluginType;
}

export function trunkedNetworkAttachmentConfigurationSerializer(
  item: TrunkedNetworkAttachmentConfiguration,
): any {
  return { networkId: item["networkId"], pluginType: item["pluginType"] };
}

export function trunkedNetworkAttachmentConfigurationDeserializer(
  item: any,
): TrunkedNetworkAttachmentConfiguration {
  return {
    networkId: item["networkId"],
    pluginType: item["pluginType"],
  };
}

export function kubernetesLabelArraySerializer(result: Array<KubernetesLabel>): any[] {
  return result.map((item) => {
    return kubernetesLabelSerializer(item);
  });
}

export function kubernetesLabelArrayDeserializer(result: Array<KubernetesLabel>): any[] {
  return result.map((item) => {
    return kubernetesLabelDeserializer(item);
  });
}

/** KubernetesLabel represents a single entry for a Kubernetes label or taint such as those used on a node or pod. */
export interface KubernetesLabel {
  /** The name of the label or taint. */
  key: string;
  /** The value of the label or taint. */
  value: string;
}

export function kubernetesLabelSerializer(item: KubernetesLabel): any {
  return { key: item["key"], value: item["value"] };
}

export function kubernetesLabelDeserializer(item: any): KubernetesLabel {
  return {
    key: item["key"],
    value: item["value"],
  };
}

/** The selection of how this agent pool is utilized, either as a system pool or a user pool. System pools run the features and critical services for the Kubernetes Cluster, while user pools are dedicated to user workloads. Every Kubernetes cluster must contain at least one system node pool with at least one node. */
export enum KnownAgentPoolMode {
  /** System agent pool */
  System = "System",
  /** User agent pool */
  User = "User",
  /** Not applicable */
  NotApplicable = "NotApplicable",
}

/**
 * The selection of how this agent pool is utilized, either as a system pool or a user pool. System pools run the features and critical services for the Kubernetes Cluster, while user pools are dedicated to user workloads. Every Kubernetes cluster must contain at least one system node pool with at least one node. \
 * {@link KnownAgentPoolMode} can be used interchangeably with AgentPoolMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **System**: System agent pool \
 * **User**: User agent pool \
 * **NotApplicable**: Not applicable
 */
export type AgentPoolMode = string;

/** AgentPoolUpgradeSettings specifies the upgrade settings for an agent pool. */
export interface AgentPoolUpgradeSettings {
  /** The maximum time in seconds that is allowed for a node drain to complete before proceeding with the upgrade of the agent pool. If not specified during creation, a value of 1800 seconds is used. */
  drainTimeout?: number;
  /** The maximum number or percentage of nodes that are surged during upgrade. This can either be set to an integer (e.g. '5') or a percentage (e.g. '50%'). If a percentage is specified, it is the percentage of the total agent pool size at the time of the upgrade. For percentages, fractional nodes are rounded up. If not specified during creation, a value of 1 is used. One of MaxSurge and MaxUnavailable must be greater than 0. */
  maxSurge?: string;
  /** The maximum number or percentage of nodes that can be unavailable during upgrade. This can either be set to an integer (e.g. '5') or a percentage (e.g. '50%'). If a percentage is specified, it is the percentage of the total agent pool size at the time of the upgrade. For percentages, fractional nodes are rounded up. If not specified during creation, a value of 0 is used. One of MaxSurge and MaxUnavailable must be greater than 0. */
  maxUnavailable?: string;
}

export function agentPoolUpgradeSettingsSerializer(item: AgentPoolUpgradeSettings): any {
  return {
    drainTimeout: item["drainTimeout"],
    maxSurge: item["maxSurge"],
    maxUnavailable: item["maxUnavailable"],
  };
}

export function agentPoolUpgradeSettingsDeserializer(item: any): AgentPoolUpgradeSettings {
  return {
    drainTimeout: item["drainTimeout"],
    maxSurge: item["maxSurge"],
    maxUnavailable: item["maxUnavailable"],
  };
}

/** NetworkConfiguration specifies the Kubernetes cluster network related configuration. */
export interface NetworkConfiguration {
  /** The configuration of networks being attached to the cluster for use by the workloads that run on this Kubernetes cluster. */
  attachedNetworkConfiguration?: AttachedNetworkConfiguration;
  /** The configuration of the BGP service load balancer for this Kubernetes cluster. A maximum of one service load balancer may be specified, either Layer 2 or BGP. */
  bgpServiceLoadBalancerConfiguration?: BgpServiceLoadBalancerConfiguration;
  /** The resource ID of the associated Cloud Services network. */
  cloudServicesNetworkId: string;
  /** The resource ID of the Layer 3 network that is used for creation of the Container Networking Interface network. */
  cniNetworkId: string;
  /** The IP address assigned to the Kubernetes DNS service. It must be within the Kubernetes service address range specified in service CIDR. */
  dnsServiceIp?: string;
  /** The configuration of the Layer 2 service load balancer for this Kubernetes cluster. A maximum of one service load balancer may be specified, either Layer 2 or BGP. */
  l2ServiceLoadBalancerConfiguration?: L2ServiceLoadBalancerConfiguration;
  /** The CIDR notation IP ranges from which to assign pod IPs. One IPv4 CIDR is expected for single-stack networking. Two CIDRs, one for each IP family (IPv4/IPv6), is expected for dual-stack networking. */
  podCidrs?: string[];
  /** The CIDR notation IP ranges from which to assign service IPs. One IPv4 CIDR is expected for single-stack networking. Two CIDRs, one for each IP family (IPv4/IPv6), is expected for dual-stack networking. */
  serviceCidrs?: string[];
}

export function networkConfigurationSerializer(item: NetworkConfiguration): any {
  return {
    attachedNetworkConfiguration: !item["attachedNetworkConfiguration"]
      ? item["attachedNetworkConfiguration"]
      : attachedNetworkConfigurationSerializer(item["attachedNetworkConfiguration"]),
    bgpServiceLoadBalancerConfiguration: !item["bgpServiceLoadBalancerConfiguration"]
      ? item["bgpServiceLoadBalancerConfiguration"]
      : bgpServiceLoadBalancerConfigurationSerializer(item["bgpServiceLoadBalancerConfiguration"]),
    cloudServicesNetworkId: item["cloudServicesNetworkId"],
    cniNetworkId: item["cniNetworkId"],
    dnsServiceIp: item["dnsServiceIp"],
    l2ServiceLoadBalancerConfiguration: !item["l2ServiceLoadBalancerConfiguration"]
      ? item["l2ServiceLoadBalancerConfiguration"]
      : l2ServiceLoadBalancerConfigurationSerializer(item["l2ServiceLoadBalancerConfiguration"]),
    podCidrs: !item["podCidrs"]
      ? item["podCidrs"]
      : item["podCidrs"].map((p: any) => {
          return p;
        }),
    serviceCidrs: !item["serviceCidrs"]
      ? item["serviceCidrs"]
      : item["serviceCidrs"].map((p: any) => {
          return p;
        }),
  };
}

export function networkConfigurationDeserializer(item: any): NetworkConfiguration {
  return {
    attachedNetworkConfiguration: !item["attachedNetworkConfiguration"]
      ? item["attachedNetworkConfiguration"]
      : attachedNetworkConfigurationDeserializer(item["attachedNetworkConfiguration"]),
    bgpServiceLoadBalancerConfiguration: !item["bgpServiceLoadBalancerConfiguration"]
      ? item["bgpServiceLoadBalancerConfiguration"]
      : bgpServiceLoadBalancerConfigurationDeserializer(
          item["bgpServiceLoadBalancerConfiguration"],
        ),
    cloudServicesNetworkId: item["cloudServicesNetworkId"],
    cniNetworkId: item["cniNetworkId"],
    dnsServiceIp: item["dnsServiceIp"],
    l2ServiceLoadBalancerConfiguration: !item["l2ServiceLoadBalancerConfiguration"]
      ? item["l2ServiceLoadBalancerConfiguration"]
      : l2ServiceLoadBalancerConfigurationDeserializer(item["l2ServiceLoadBalancerConfiguration"]),
    podCidrs: !item["podCidrs"]
      ? item["podCidrs"]
      : item["podCidrs"].map((p: any) => {
          return p;
        }),
    serviceCidrs: !item["serviceCidrs"]
      ? item["serviceCidrs"]
      : item["serviceCidrs"].map((p: any) => {
          return p;
        }),
  };
}

/** BgpServiceLoadBalancerConfiguration represents the configuration of a BGP service load balancer. */
export interface BgpServiceLoadBalancerConfiguration {
  /** The association of IP address pools to the communities and peers, allowing for announcement of IPs. */
  bgpAdvertisements?: BgpAdvertisement[];
  /** The list of additional BgpPeer entities that the Kubernetes cluster will peer with. All peering must be explicitly defined. */
  bgpPeers?: ServiceLoadBalancerBgpPeer[];
  /** The indicator to specify if the load balancer peers with the network fabric. */
  fabricPeeringEnabled?: FabricPeeringEnabled;
  /** The list of pools of IP addresses that can be allocated to load balancer services. */
  ipAddressPools?: IpAddressPool[];
}

export function bgpServiceLoadBalancerConfigurationSerializer(
  item: BgpServiceLoadBalancerConfiguration,
): any {
  return {
    bgpAdvertisements: !item["bgpAdvertisements"]
      ? item["bgpAdvertisements"]
      : bgpAdvertisementArraySerializer(item["bgpAdvertisements"]),
    bgpPeers: !item["bgpPeers"]
      ? item["bgpPeers"]
      : serviceLoadBalancerBgpPeerArraySerializer(item["bgpPeers"]),
    fabricPeeringEnabled: item["fabricPeeringEnabled"],
    ipAddressPools: !item["ipAddressPools"]
      ? item["ipAddressPools"]
      : ipAddressPoolArraySerializer(item["ipAddressPools"]),
  };
}

export function bgpServiceLoadBalancerConfigurationDeserializer(
  item: any,
): BgpServiceLoadBalancerConfiguration {
  return {
    bgpAdvertisements: !item["bgpAdvertisements"]
      ? item["bgpAdvertisements"]
      : bgpAdvertisementArrayDeserializer(item["bgpAdvertisements"]),
    bgpPeers: !item["bgpPeers"]
      ? item["bgpPeers"]
      : serviceLoadBalancerBgpPeerArrayDeserializer(item["bgpPeers"]),
    fabricPeeringEnabled: item["fabricPeeringEnabled"],
    ipAddressPools: !item["ipAddressPools"]
      ? item["ipAddressPools"]
      : ipAddressPoolArrayDeserializer(item["ipAddressPools"]),
  };
}

export function bgpAdvertisementArraySerializer(result: Array<BgpAdvertisement>): any[] {
  return result.map((item) => {
    return bgpAdvertisementSerializer(item);
  });
}

export function bgpAdvertisementArrayDeserializer(result: Array<BgpAdvertisement>): any[] {
  return result.map((item) => {
    return bgpAdvertisementDeserializer(item);
  });
}

/** BgpAdvertisement represents the association of IP address pools to the communities and peers. */
export interface BgpAdvertisement {
  /** The indicator of if this advertisement is also made to the network fabric associated with the Network Cloud Cluster. This field is ignored if fabricPeeringEnabled is set to False. */
  advertiseToFabric?: AdvertiseToFabric;
  /** The names of the BGP communities to be associated with the announcement, utilizing a BGP community string in 1234:1234 format. */
  communities?: string[];
  /** The names of the IP address pools associated with this announcement. */
  ipAddressPools: string[];
  /** The names of the BGP peers to limit this advertisement to. If no values are specified, all BGP peers will receive this advertisement. */
  peers?: string[];
}

export function bgpAdvertisementSerializer(item: BgpAdvertisement): any {
  return {
    advertiseToFabric: item["advertiseToFabric"],
    communities: !item["communities"]
      ? item["communities"]
      : item["communities"].map((p: any) => {
          return p;
        }),
    ipAddressPools: item["ipAddressPools"].map((p: any) => {
      return p;
    }),
    peers: !item["peers"]
      ? item["peers"]
      : item["peers"].map((p: any) => {
          return p;
        }),
  };
}

export function bgpAdvertisementDeserializer(item: any): BgpAdvertisement {
  return {
    advertiseToFabric: item["advertiseToFabric"],
    communities: !item["communities"]
      ? item["communities"]
      : item["communities"].map((p: any) => {
          return p;
        }),
    ipAddressPools: item["ipAddressPools"].map((p: any) => {
      return p;
    }),
    peers: !item["peers"]
      ? item["peers"]
      : item["peers"].map((p: any) => {
          return p;
        }),
  };
}

/** The indicator of if this advertisement is also made to the network fabric associated with the Network Cloud Cluster. This field is ignored if fabricPeeringEnabled is set to False. */
export enum KnownAdvertiseToFabric {
  /** Advertise to fabric */
  True = "True",
  /** Do not advertise to fabric */
  False = "False",
}

/**
 * The indicator of if this advertisement is also made to the network fabric associated with the Network Cloud Cluster. This field is ignored if fabricPeeringEnabled is set to False. \
 * {@link KnownAdvertiseToFabric} can be used interchangeably with AdvertiseToFabric,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: Advertise to fabric \
 * **False**: Do not advertise to fabric
 */
export type AdvertiseToFabric = string;

export function serviceLoadBalancerBgpPeerArraySerializer(
  result: Array<ServiceLoadBalancerBgpPeer>,
): any[] {
  return result.map((item) => {
    return serviceLoadBalancerBgpPeerSerializer(item);
  });
}

export function serviceLoadBalancerBgpPeerArrayDeserializer(
  result: Array<ServiceLoadBalancerBgpPeer>,
): any[] {
  return result.map((item) => {
    return serviceLoadBalancerBgpPeerDeserializer(item);
  });
}

/** ServiceLoadBalancerBgpPeer represents the configuration of the BGP service load balancer for the Kubernetes cluster. */
export interface ServiceLoadBalancerBgpPeer {
  /** The indicator of BFD enablement for this BgpPeer. */
  bfdEnabled?: BfdEnabled;
  /** The indicator to enable multi-hop peering support. */
  bgpMultiHop?: BgpMultiHop;
  /** Field Deprecated. The field was previously optional, now it will have no defined behavior and will be ignored. The requested BGP hold time value. This field uses ISO 8601 duration format, for example P1H. */
  holdTime?: string;
  /** Field Deprecated. The field was previously optional, now it will have no defined behavior and will be ignored. The requested BGP keepalive time value. This field uses ISO 8601 duration format, for example P1H. */
  keepAliveTime?: string;
  /** The autonomous system number used for the local end of the BGP session. */
  myAsn?: number;
  /** The name used to identify this BGP peer for association with a BGP advertisement. */
  name: string;
  /** The authentication password for routers enforcing TCP MD5 authenticated sessions. */
  password?: string;
  /** The IPv4 or IPv6 address used to connect this BGP session. */
  peerAddress: string;
  /** The autonomous system number expected from the remote end of the BGP session. */
  peerAsn: number;
  /** The port used to connect this BGP session. */
  peerPort?: number;
}

export function serviceLoadBalancerBgpPeerSerializer(item: ServiceLoadBalancerBgpPeer): any {
  return {
    bfdEnabled: item["bfdEnabled"],
    bgpMultiHop: item["bgpMultiHop"],
    holdTime: item["holdTime"],
    keepAliveTime: item["keepAliveTime"],
    myAsn: item["myAsn"],
    name: item["name"],
    password: item["password"],
    peerAddress: item["peerAddress"],
    peerAsn: item["peerAsn"],
    peerPort: item["peerPort"],
  };
}

export function serviceLoadBalancerBgpPeerDeserializer(item: any): ServiceLoadBalancerBgpPeer {
  return {
    bfdEnabled: item["bfdEnabled"],
    bgpMultiHop: item["bgpMultiHop"],
    holdTime: item["holdTime"],
    keepAliveTime: item["keepAliveTime"],
    myAsn: item["myAsn"],
    name: item["name"],
    password: item["password"],
    peerAddress: item["peerAddress"],
    peerAsn: item["peerAsn"],
    peerPort: item["peerPort"],
  };
}

/** The indicator to determine if automatic allocation from the pool should occur. */
export enum KnownBfdEnabled {
  /** BFD is enabled for this BGP peer. */
  True = "True",
  /** BFD is disabled for this BGP peer. */
  False = "False",
}

/**
 * The indicator to determine if automatic allocation from the pool should occur. \
 * {@link KnownBfdEnabled} can be used interchangeably with BfdEnabled,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: BFD is enabled for this BGP peer. \
 * **False**: BFD is disabled for this BGP peer.
 */
export type BfdEnabled = string;

/** The indicator to enable multi-hop peering support. */
export enum KnownBgpMultiHop {
  /** Enable multi-hop peering support. */
  True = "True",
  /** Disable multi-hop peering support. */
  False = "False",
}

/**
 * The indicator to enable multi-hop peering support. \
 * {@link KnownBgpMultiHop} can be used interchangeably with BgpMultiHop,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: Enable multi-hop peering support. \
 * **False**: Disable multi-hop peering support.
 */
export type BgpMultiHop = string;

/** The indicator to specify if the load balancer peers with the network fabric. */
export enum KnownFabricPeeringEnabled {
  /** Enable fabric peering. */
  True = "True",
  /** Disable fabric peering. */
  False = "False",
}

/**
 * The indicator to specify if the load balancer peers with the network fabric. \
 * {@link KnownFabricPeeringEnabled} can be used interchangeably with FabricPeeringEnabled,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: Enable fabric peering. \
 * **False**: Disable fabric peering.
 */
export type FabricPeeringEnabled = string;

export function ipAddressPoolArraySerializer(result: Array<IpAddressPool>): any[] {
  return result.map((item) => {
    return ipAddressPoolSerializer(item);
  });
}

export function ipAddressPoolArrayDeserializer(result: Array<IpAddressPool>): any[] {
  return result.map((item) => {
    return ipAddressPoolDeserializer(item);
  });
}

/** IpAddressPool represents a pool of IP addresses that can be allocated to a service. */
export interface IpAddressPool {
  /** The list of IP address ranges. Each range can be a either a subnet in CIDR format or an explicit start-end range of IP addresses. For a BGP service load balancer configuration, only CIDR format is supported and excludes /32 (IPv4) and /128 (IPv6) prefixes. */
  addresses: string[];
  /** The indicator to determine if automatic allocation from the pool should occur. */
  autoAssign?: BfdEnabled;
  /** The name used to identify this IP address pool for association with a BGP advertisement. */
  name: string;
  /** The indicator to prevent the use of IP addresses ending with .0 and .255 for this pool. Enabling this option will only use IP addresses between .1 and .254 inclusive. */
  onlyUseHostIps?: BfdEnabled;
}

export function ipAddressPoolSerializer(item: IpAddressPool): any {
  return {
    addresses: item["addresses"].map((p: any) => {
      return p;
    }),
    autoAssign: item["autoAssign"],
    name: item["name"],
    onlyUseHostIps: item["onlyUseHostIps"],
  };
}

export function ipAddressPoolDeserializer(item: any): IpAddressPool {
  return {
    addresses: item["addresses"].map((p: any) => {
      return p;
    }),
    autoAssign: item["autoAssign"],
    name: item["name"],
    onlyUseHostIps: item["onlyUseHostIps"],
  };
}

/** L2ServiceLoadBalancerConfiguration represents the configuration of a layer 2 service load balancer. */
export interface L2ServiceLoadBalancerConfiguration {
  /** The list of pools of IP addresses that can be allocated to load balancer services. */
  ipAddressPools?: IpAddressPool[];
}

export function l2ServiceLoadBalancerConfigurationSerializer(
  item: L2ServiceLoadBalancerConfiguration,
): any {
  return {
    ipAddressPools: !item["ipAddressPools"]
      ? item["ipAddressPools"]
      : ipAddressPoolArraySerializer(item["ipAddressPools"]),
  };
}

export function l2ServiceLoadBalancerConfigurationDeserializer(
  item: any,
): L2ServiceLoadBalancerConfiguration {
  return {
    ipAddressPools: !item["ipAddressPools"]
      ? item["ipAddressPools"]
      : ipAddressPoolArrayDeserializer(item["ipAddressPools"]),
  };
}

export function availableUpgradeArrayDeserializer(result: Array<AvailableUpgrade>): any[] {
  return result.map((item) => {
    return availableUpgradeDeserializer(item);
  });
}

/** AvailableUpgrade represents an upgrade available for a Kubernetes cluster. */
export interface AvailableUpgrade {
  /** The version lifecycle indicator. */
  readonly availabilityLifecycle?: AvailabilityLifecycle;
  /** The version available for upgrading. */
  readonly version?: string;
}

export function availableUpgradeDeserializer(item: any): AvailableUpgrade {
  return {
    availabilityLifecycle: item["availabilityLifecycle"],
    version: item["version"],
  };
}

/** The version lifecycle indicator. */
export enum KnownAvailabilityLifecycle {
  /** Preview availability */
  Preview = "Preview",
  /** Generally available */
  GenerallyAvailable = "GenerallyAvailable",
}

/**
 * The version lifecycle indicator. \
 * {@link KnownAvailabilityLifecycle} can be used interchangeably with AvailabilityLifecycle,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Preview**: Preview availability \
 * **GenerallyAvailable**: Generally available
 */
export type AvailabilityLifecycle = string;

/** The current status of the Kubernetes cluster. */
export enum KnownKubernetesClusterDetailedStatus {
  /** The Available status. */
  Available = "Available",
  /** The Error status. */
  Error = "Error",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
}

/**
 * The current status of the Kubernetes cluster. \
 * {@link KnownKubernetesClusterDetailedStatus} can be used interchangeably with KubernetesClusterDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Available**: The Available status. \
 * **Error**: The Error status. \
 * **Provisioning**: The Provisioning status.
 */
export type KubernetesClusterDetailedStatus = string;

export function featureStatusArrayDeserializer(result: Array<FeatureStatus>): any[] {
  return result.map((item) => {
    return featureStatusDeserializer(item);
  });
}

/** FeatureStatus contains information regarding a Kubernetes cluster feature. */
export interface FeatureStatus {
  /** The status representing the state of this feature. */
  readonly detailedStatus?: FeatureDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The name of the feature. */
  readonly name?: string;
  /** The version of the feature. */
  readonly version?: string;
}

export function featureStatusDeserializer(item: any): FeatureStatus {
  return {
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    name: item["name"],
    version: item["version"],
  };
}

/** The status representing the state of this feature. */
export enum KnownFeatureDetailedStatus {
  /** The Running status. */
  Running = "Running",
  /** The Failed status. */
  Failed = "Failed",
  /** The Unknown status. */
  Unknown = "Unknown",
}

/**
 * The status representing the state of this feature. \
 * {@link KnownFeatureDetailedStatus} can be used interchangeably with FeatureDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running**: The Running status. \
 * **Failed**: The Failed status. \
 * **Unknown**: The Unknown status.
 */
export type FeatureDetailedStatus = string;

export function kubernetesClusterNodeArrayDeserializer(
  result: Array<KubernetesClusterNode>,
): any[] {
  return result.map((item) => {
    return kubernetesClusterNodeDeserializer(item);
  });
}

/** KubernetesClusterNode represents the details of a node in a Kubernetes cluster. */
export interface KubernetesClusterNode {
  /** The resource ID of the agent pool that this node belongs to. This value is not represented on control plane nodes. */
  readonly agentPoolId?: string;
  /** The availability zone this node is running within. */
  readonly availabilityZone?: string;
  /** The resource ID of the bare metal machine that hosts this node. */
  readonly bareMetalMachineId?: string;
  /** The number of CPU cores configured for this node, derived from the VM SKU specified. */
  readonly cpuCores?: number;
  /** The detailed state of this node. */
  readonly detailedStatus?: KubernetesClusterNodeDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The size of the disk configured for this node. Allocations are measured in gibibytes. */
  readonly diskSizeGB?: number;
  /** The machine image used to deploy this node. */
  readonly image?: string;
  /** The currently running version of Kubernetes and bundled features running on this node. */
  readonly kubernetesVersion?: string;
  /** The list of labels on this node that have been assigned to the agent pool containing this node. */
  readonly labels?: KubernetesLabel[];
  /** The amount of memory configured for this node, derived from the vm SKU specified. Allocations are measured in gibibytes. */
  readonly memorySizeGB?: number;
  /** The mode of the agent pool containing this node. Not applicable for control plane nodes. */
  readonly mode?: AgentPoolMode;
  /** The name of this node, as realized in the Kubernetes cluster. */
  readonly name?: string;
  /** The NetworkAttachments made to this node. */
  readonly networkAttachments?: NetworkAttachment[];
  /** The power state of this node. */
  readonly powerState?: KubernetesNodePowerState;
  /** The role of this node in the cluster. */
  readonly role?: KubernetesNodeRole;
  /** The list of taints that have been assigned to the agent pool containing this node. */
  readonly taints?: KubernetesLabel[];
  /** The VM SKU name that was used to create this cluster node. */
  readonly vmSkuName?: string;
}

export function kubernetesClusterNodeDeserializer(item: any): KubernetesClusterNode {
  return {
    agentPoolId: item["agentPoolId"],
    availabilityZone: item["availabilityZone"],
    bareMetalMachineId: item["bareMetalMachineId"],
    cpuCores: item["cpuCores"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    diskSizeGB: item["diskSizeGB"],
    image: item["image"],
    kubernetesVersion: item["kubernetesVersion"],
    labels: !item["labels"] ? item["labels"] : kubernetesLabelArrayDeserializer(item["labels"]),
    memorySizeGB: item["memorySizeGB"],
    mode: item["mode"],
    name: item["name"],
    networkAttachments: !item["networkAttachments"]
      ? item["networkAttachments"]
      : networkAttachmentArrayDeserializer(item["networkAttachments"]),
    powerState: item["powerState"],
    role: item["role"],
    taints: !item["taints"] ? item["taints"] : kubernetesLabelArrayDeserializer(item["taints"]),
    vmSkuName: item["vmSkuName"],
  };
}

/** The detailed state of this node. */
export enum KnownKubernetesClusterNodeDetailedStatus {
  /** The Available status. */
  Available = "Available",
  /** The Error status. */
  Error = "Error",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
  /** The Running status. */
  Running = "Running",
  /** The Scheduling status. */
  Scheduling = "Scheduling",
  /** The Stopped status. */
  Stopped = "Stopped",
  /** The Terminating status. */
  Terminating = "Terminating",
  /** The Unknown status. */
  Unknown = "Unknown",
}

/**
 * The detailed state of this node. \
 * {@link KnownKubernetesClusterNodeDetailedStatus} can be used interchangeably with KubernetesClusterNodeDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Available**: The Available status. \
 * **Error**: The Error status. \
 * **Provisioning**: The Provisioning status. \
 * **Running**: The Running status. \
 * **Scheduling**: The Scheduling status. \
 * **Stopped**: The Stopped status. \
 * **Terminating**: The Terminating status. \
 * **Unknown**: The Unknown status.
 */
export type KubernetesClusterNodeDetailedStatus = string;

export function networkAttachmentArraySerializer(result: Array<NetworkAttachment>): any[] {
  return result.map((item) => {
    return networkAttachmentSerializer(item);
  });
}

export function networkAttachmentArrayDeserializer(result: Array<NetworkAttachment>): any[] {
  return result.map((item) => {
    return networkAttachmentDeserializer(item);
  });
}

/** NetworkAttachment represents the single network attachment. */
export interface NetworkAttachment {
  /** The resource ID of the associated network attached to the virtual machine. It can be one of cloudServicesNetwork, l3Network, l2Network or trunkedNetwork resources. */
  attachedNetworkId: string;
  /** The indicator of whether this is the default gateway. Only one of the attached networks (including the CloudServicesNetwork attachment) for a single machine may be specified as True. */
  defaultGateway?: DefaultGateway;
  /** The IP allocation mechanism for the virtual machine. Dynamic and Static are only valid for l3Network which may also specify Disabled. Otherwise, Disabled is the only permitted value. */
  ipAllocationMethod: VirtualMachineIPAllocationMethod;
  /** The IPv4 address of the virtual machine.  This field is used only if the attached network has IPAllocationType of IPV4 or DualStack.  If IPAllocationMethod is: Static - this field must contain a user specified IPv4 address from within the subnet specified in the attached network. Dynamic - this field is read-only, but will be populated with an address from within the subnet specified in the attached network. Disabled - this field will be empty. */
  ipv4Address?: string;
  /** The IPv6 address of the virtual machine.  This field is used only if the attached network has IPAllocationType of IPV6 or DualStack.  If IPAllocationMethod is: Static - this field must contain an IPv6 address range from within the range specified in the attached network. Dynamic - this field is read-only, but will be populated with an range from within the subnet specified in the attached network. Disabled - this field will be empty. */
  ipv6Address?: string;
  /** The MAC address of the interface for the virtual machine that corresponds to this network attachment. */
  readonly macAddress?: string;
  /** The associated network's interface name. If specified, the network attachment name has a maximum length of 15 characters and must be unique to this virtual machine. If the user doesn’t specify this value, the default interface name of the network resource will be used. For a CloudServicesNetwork resource, this name will be ignored. */
  networkAttachmentName?: string;
}

export function networkAttachmentSerializer(item: NetworkAttachment): any {
  return {
    attachedNetworkId: item["attachedNetworkId"],
    defaultGateway: item["defaultGateway"],
    ipAllocationMethod: item["ipAllocationMethod"],
    ipv4Address: item["ipv4Address"],
    ipv6Address: item["ipv6Address"],
    networkAttachmentName: item["networkAttachmentName"],
  };
}

export function networkAttachmentDeserializer(item: any): NetworkAttachment {
  return {
    attachedNetworkId: item["attachedNetworkId"],
    defaultGateway: item["defaultGateway"],
    ipAllocationMethod: item["ipAllocationMethod"],
    ipv4Address: item["ipv4Address"],
    ipv6Address: item["ipv6Address"],
    macAddress: item["macAddress"],
    networkAttachmentName: item["networkAttachmentName"],
  };
}

/** The indicator of whether this is the default gateway. Only one of the attached networks (including the CloudServicesNetwork attachment) for a single machine may be specified as True. */
export enum KnownDefaultGateway {
  /** This is the default gateway. */
  True = "True",
  /** This is not the default gateway. */
  False = "False",
}

/**
 * The indicator of whether this is the default gateway. Only one of the attached networks (including the CloudServicesNetwork attachment) for a single machine may be specified as True. \
 * {@link KnownDefaultGateway} can be used interchangeably with DefaultGateway,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: This is the default gateway. \
 * **False**: This is not the default gateway.
 */
export type DefaultGateway = string;

/** The IP allocation mechanism for the virtual machine. Dynamic and Static are only valid for l3Network which may also specify Disabled. Otherwise, Disabled is the only permitted value. */
export enum KnownVirtualMachineIPAllocationMethod {
  /** Dynamic VM IP allocation. */
  Dynamic = "Dynamic",
  /** Static VM IP allocation. */
  Static = "Static",
  /** No VM IP allocation. */
  Disabled = "Disabled",
}

/**
 * The IP allocation mechanism for the virtual machine. Dynamic and Static are only valid for l3Network which may also specify Disabled. Otherwise, Disabled is the only permitted value. \
 * {@link KnownVirtualMachineIPAllocationMethod} can be used interchangeably with VirtualMachineIPAllocationMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Dynamic**: Dynamic VM IP allocation. \
 * **Static**: Static VM IP allocation. \
 * **Disabled**: No VM IP allocation.
 */
export type VirtualMachineIPAllocationMethod = string;

/** The power state of this node. */
export enum KnownKubernetesNodePowerState {
  /** The node is powered on. */
  On = "On",
  /** The node is powered off. */
  Off = "Off",
  /** The node is in an unknown power state. */
  Unknown = "Unknown",
}

/**
 * The power state of this node. \
 * {@link KnownKubernetesNodePowerState} can be used interchangeably with KubernetesNodePowerState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **On**: The node is powered on. \
 * **Off**: The node is powered off. \
 * **Unknown**: The node is in an unknown power state.
 */
export type KubernetesNodePowerState = string;

/** The role of this node in the cluster. */
export enum KnownKubernetesNodeRole {
  /** Control plane role */
  ControlPlane = "ControlPlane",
  /** Worker role */
  Worker = "Worker",
}

/**
 * The role of this node in the cluster. \
 * {@link KnownKubernetesNodeRole} can be used interchangeably with KubernetesNodeRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ControlPlane**: Control plane role \
 * **Worker**: Worker role
 */
export type KubernetesNodeRole = string;

/** The provisioning state of the Kubernetes cluster resource. */
export enum KnownKubernetesClusterProvisioningState {
  /** The Succeeded status. */
  Succeeded = "Succeeded",
  /** The Failed status. */
  Failed = "Failed",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Accepted status. */
  Accepted = "Accepted",
  /** The InProgress status. */
  InProgress = "InProgress",
  /** The Created status. */
  Created = "Created",
  /** The Updating status. */
  Updating = "Updating",
  /** The Deleting status. */
  Deleting = "Deleting",
}

/**
 * The provisioning state of the Kubernetes cluster resource. \
 * {@link KnownKubernetesClusterProvisioningState} can be used interchangeably with KubernetesClusterProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The Succeeded status. \
 * **Failed**: The Failed status. \
 * **Canceled**: The Canceled status. \
 * **Accepted**: The Accepted status. \
 * **InProgress**: The InProgress status. \
 * **Created**: The Created status. \
 * **Updating**: The Updating status. \
 * **Deleting**: The Deleting status.
 */
export type KubernetesClusterProvisioningState = string;

/** KubernetesClusterPatchParameters represents the body of the request to patch the Hybrid AKS cluster. */
export interface KubernetesClusterPatchParameters {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The configuration of the default administrator credentials. */
  administratorConfiguration?: AdministratorConfigurationPatch;
  /** The defining characteristics of the control plane that can be patched for this Kubernetes cluster. */
  controlPlaneNodeConfiguration?: ControlPlaneNodePatchConfiguration;
  /** The Kubernetes version for this cluster. */
  kubernetesVersion?: string;
}

export function kubernetesClusterPatchParametersSerializer(
  item: KubernetesClusterPatchParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "administratorConfiguration",
      "controlPlaneNodeConfiguration",
      "kubernetesVersion",
    ])
      ? undefined
      : _kubernetesClusterPatchParametersPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** KubernetesClusterPatchProperties represents the properties of the Kubernetes cluster that can be patched. */
export interface KubernetesClusterPatchProperties {
  /** The configuration of the default administrator credentials. */
  administratorConfiguration?: AdministratorConfigurationPatch;
  /** The defining characteristics of the control plane that can be patched for this Kubernetes cluster. */
  controlPlaneNodeConfiguration?: ControlPlaneNodePatchConfiguration;
  /** The Kubernetes version for this cluster. */
  kubernetesVersion?: string;
}

export function kubernetesClusterPatchPropertiesSerializer(
  item: KubernetesClusterPatchProperties,
): any {
  return {
    administratorConfiguration: !item["administratorConfiguration"]
      ? item["administratorConfiguration"]
      : administratorConfigurationPatchSerializer(item["administratorConfiguration"]),
    controlPlaneNodeConfiguration: !item["controlPlaneNodeConfiguration"]
      ? item["controlPlaneNodeConfiguration"]
      : controlPlaneNodePatchConfigurationSerializer(item["controlPlaneNodeConfiguration"]),
    kubernetesVersion: item["kubernetesVersion"],
  };
}

/** AdministratorConfigurationPatch represents the patching capabilities for the administrator configuration. */
export interface AdministratorConfigurationPatch {
  /** SshPublicKey represents the public key used to authenticate with a resource through SSH. */
  sshPublicKeys?: SshPublicKey[];
}

export function administratorConfigurationPatchSerializer(
  item: AdministratorConfigurationPatch,
): any {
  return {
    sshPublicKeys: !item["sshPublicKeys"]
      ? item["sshPublicKeys"]
      : sshPublicKeyArraySerializer(item["sshPublicKeys"]),
  };
}

/** ControlPlaneNodePatchConfiguration represents the properties of the control plane that can be patched for this Kubernetes cluster. */
export interface ControlPlaneNodePatchConfiguration {
  /** The configuration of administrator credentials for the control plane nodes. */
  administratorConfiguration?: AdministratorConfigurationPatch;
  /** The number of virtual machines that use this configuration. */
  count?: number;
}

export function controlPlaneNodePatchConfigurationSerializer(
  item: ControlPlaneNodePatchConfiguration,
): any {
  return {
    administratorConfiguration: !item["administratorConfiguration"]
      ? item["administratorConfiguration"]
      : administratorConfigurationPatchSerializer(item["administratorConfiguration"]),
    count: item["count"],
  };
}

/** KubernetesClusterList represents a list of Kubernetes clusters. */
export interface _KubernetesClusterList {
  /** The KubernetesCluster items on this page */
  value: KubernetesCluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _kubernetesClusterListDeserializer(item: any): _KubernetesClusterList {
  return {
    value: kubernetesClusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function kubernetesClusterArraySerializer(result: Array<KubernetesCluster>): any[] {
  return result.map((item) => {
    return kubernetesClusterSerializer(item);
  });
}

export function kubernetesClusterArrayDeserializer(result: Array<KubernetesCluster>): any[] {
  return result.map((item) => {
    return kubernetesClusterDeserializer(item);
  });
}

/** KubernetesClusterRestartNodeParameters represents the body of the request to restart the node of a Kubernetes cluster. */
export interface KubernetesClusterRestartNodeParameters {
  /** The name of the node to restart. */
  nodeName: string;
}

export function kubernetesClusterRestartNodeParametersSerializer(
  item: KubernetesClusterRestartNodeParameters,
): any {
  return { nodeName: item["nodeName"] };
}

/** KubernetesVersion represents the available Kubernetes versions for a cluster. */
export interface KubernetesVersion extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The extended location of the resource. This property is required when creating the resource. */
  extendedLocation: ExtendedLocation;
  /** The list of available Kubernetes versions. */
  readonly values?: KubernetesVersionValue[];
  /** The provisioning state of the Kubernetes version resource. */
  readonly provisioningState?: KubernetesVersionProvisioningState;
}

export function kubernetesVersionSerializer(item: KubernetesVersion): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _kubernetesVersionPropertiesSerializer(item),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function kubernetesVersionDeserializer(item: any): KubernetesVersion {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._kubernetesVersionPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** KubernetesVersionProperties contains the read-only properties describing available versions. */
export interface KubernetesVersionProperties {
  /** The list of available Kubernetes versions. */
  readonly values?: KubernetesVersionValue[];
  /** The provisioning state of the Kubernetes version resource. */
  readonly provisioningState?: KubernetesVersionProvisioningState;
}

export function kubernetesVersionPropertiesSerializer(_item: KubernetesVersionProperties): any {
  return {};
}

export function kubernetesVersionPropertiesDeserializer(item: any): KubernetesVersionProperties {
  return {
    values: !item["values"]
      ? item["values"]
      : kubernetesVersionValueArrayDeserializer(item["values"]),
    provisioningState: item["provisioningState"],
  };
}

export function kubernetesVersionValueArrayDeserializer(
  result: Array<KubernetesVersionValue>,
): any[] {
  return result.map((item) => {
    return kubernetesVersionValueDeserializer(item);
  });
}

/** KubernetesVersionValue describes a specific Kubernetes version that can be deployed. */
export interface KubernetesVersionValue {
  /** Additional description for the Kubernetes version. */
  readonly description?: string;
  /** The Kubernetes version identifier. */
  readonly version?: string;
}

export function kubernetesVersionValueDeserializer(item: any): KubernetesVersionValue {
  return {
    description: item["description"],
    version: item["version"],
  };
}

/** The provisioning state of the Kubernetes version resource. */
export enum KnownKubernetesVersionProvisioningState {
  /** The Accepted status. */
  Accepted = "Accepted",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Failed status. */
  Failed = "Failed",
  /** The Succeeded status. */
  Succeeded = "Succeeded",
}

/**
 * The provisioning state of the Kubernetes version resource. \
 * {@link KnownKubernetesVersionProvisioningState} can be used interchangeably with KubernetesVersionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: The Accepted status. \
 * **Canceled**: The Canceled status. \
 * **Failed**: The Failed status. \
 * **Succeeded**: The Succeeded status.
 */
export type KubernetesVersionProvisioningState = string;

/** KubernetesVersionPatchParameters represents the body of the request to patch Kubernetes version tags. */
export interface KubernetesVersionPatchParameters {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function kubernetesVersionPatchParametersSerializer(
  item: KubernetesVersionPatchParameters,
): any {
  return { tags: item["tags"] };
}

/** KubernetesVersionList represents a list of Kubernetes version resources. */
export interface _KubernetesVersionList {
  /** The KubernetesVersion items on this page */
  value: KubernetesVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _kubernetesVersionListDeserializer(item: any): _KubernetesVersionList {
  return {
    value: kubernetesVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function kubernetesVersionArraySerializer(result: Array<KubernetesVersion>): any[] {
  return result.map((item) => {
    return kubernetesVersionSerializer(item);
  });
}

export function kubernetesVersionArrayDeserializer(result: Array<KubernetesVersion>): any[] {
  return result.map((item) => {
    return kubernetesVersionDeserializer(item);
  });
}

/** L2Network represents a network that utilizes a single isolation domain set up for layer-2 resources. */
export interface L2Network extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The extended location of the resource. This property is required when creating the resource. */
  extendedLocation: ExtendedLocation;
  /** Field Deprecated. The field was previously optional, now it will have no defined behavior and will be ignored. The network plugin type for Hybrid AKS. */
  hybridAksPluginType?: HybridAksPluginType;
  /** The default interface name for this L2 network in the virtual machine. This name can be overridden by the name supplied in the network attachment configuration of that virtual machine. */
  interfaceName?: string;
  /** The resource ID of the Network Fabric l2IsolationDomain. */
  l2IsolationDomainId: string;
  /** The list of resource IDs for the other Microsoft.NetworkCloud resources that have attached this network. */
  readonly associatedResourceIds?: string[];
  /** The resource ID of the Network Cloud cluster this L2 network is associated with. */
  readonly clusterId?: string;
  /** The more detailed status of the L2 network. */
  readonly detailedStatus?: L2NetworkDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** Field Deprecated. These fields will be empty/omitted. The list of Hybrid AKS cluster resource ID(s) that are associated with this L2 network. */
  readonly hybridAksClustersAssociatedIds?: string[];
  /** Field Deprecated. These fields will be empty/omitted. The list of virtual machine resource ID(s), excluding any Hybrid AKS virtual machines, that are currently using this L2 network. */
  readonly virtualMachinesAssociatedIds?: string[];
  /** The provisioning state of the L2 network. */
  readonly provisioningState?: L2NetworkProvisioningState;
}

export function l2NetworkSerializer(item: L2Network): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _l2NetworkPropertiesSerializer(item),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function l2NetworkDeserializer(item: any): L2Network {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._l2NetworkPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** L2NetworkProperties represents properties of the L2 network. */
export interface L2NetworkProperties {
  /** Field Deprecated. The field was previously optional, now it will have no defined behavior and will be ignored. The network plugin type for Hybrid AKS. */
  hybridAksPluginType?: HybridAksPluginType;
  /** The default interface name for this L2 network in the virtual machine. This name can be overridden by the name supplied in the network attachment configuration of that virtual machine. */
  interfaceName?: string;
  /** The resource ID of the Network Fabric l2IsolationDomain. */
  l2IsolationDomainId: string;
  /** The list of resource IDs for the other Microsoft.NetworkCloud resources that have attached this network. */
  readonly associatedResourceIds?: string[];
  /** The resource ID of the Network Cloud cluster this L2 network is associated with. */
  readonly clusterId?: string;
  /** The more detailed status of the L2 network. */
  readonly detailedStatus?: L2NetworkDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** Field Deprecated. These fields will be empty/omitted. The list of Hybrid AKS cluster resource ID(s) that are associated with this L2 network. */
  readonly hybridAksClustersAssociatedIds?: string[];
  /** Field Deprecated. These fields will be empty/omitted. The list of virtual machine resource ID(s), excluding any Hybrid AKS virtual machines, that are currently using this L2 network. */
  readonly virtualMachinesAssociatedIds?: string[];
  /** The provisioning state of the L2 network. */
  readonly provisioningState?: L2NetworkProvisioningState;
}

export function l2NetworkPropertiesSerializer(item: L2NetworkProperties): any {
  return {
    hybridAksPluginType: item["hybridAksPluginType"],
    interfaceName: item["interfaceName"],
    l2IsolationDomainId: item["l2IsolationDomainId"],
  };
}

export function l2NetworkPropertiesDeserializer(item: any): L2NetworkProperties {
  return {
    hybridAksPluginType: item["hybridAksPluginType"],
    interfaceName: item["interfaceName"],
    l2IsolationDomainId: item["l2IsolationDomainId"],
    associatedResourceIds: !item["associatedResourceIds"]
      ? item["associatedResourceIds"]
      : item["associatedResourceIds"].map((p: any) => {
          return p;
        }),
    clusterId: item["clusterId"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    hybridAksClustersAssociatedIds: !item["hybridAksClustersAssociatedIds"]
      ? item["hybridAksClustersAssociatedIds"]
      : item["hybridAksClustersAssociatedIds"].map((p: any) => {
          return p;
        }),
    virtualMachinesAssociatedIds: !item["virtualMachinesAssociatedIds"]
      ? item["virtualMachinesAssociatedIds"]
      : item["virtualMachinesAssociatedIds"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** Field Deprecated. The field was previously optional, now it will have no defined behavior and will be ignored. The network plugin type for Hybrid AKS. */
export enum KnownHybridAksPluginType {
  /** The DPDK plugin type. */
  Dpdk = "DPDK",
  /** The SRIOV plugin type. */
  Sriov = "SRIOV",
  /** The OSDevice plugin type. */
  OSDevice = "OSDevice",
}

/**
 * Field Deprecated. The field was previously optional, now it will have no defined behavior and will be ignored. The network plugin type for Hybrid AKS. \
 * {@link KnownHybridAksPluginType} can be used interchangeably with HybridAksPluginType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DPDK**: The DPDK plugin type. \
 * **SRIOV**: The SRIOV plugin type. \
 * **OSDevice**: The OSDevice plugin type.
 */
export type HybridAksPluginType = string;

/** The more detailed status of the L2 network. */
export enum KnownL2NetworkDetailedStatus {
  /** The Error status. */
  Error = "Error",
  /** The Available status. */
  Available = "Available",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
}

/**
 * The more detailed status of the L2 network. \
 * {@link KnownL2NetworkDetailedStatus} can be used interchangeably with L2NetworkDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Error**: The Error status. \
 * **Available**: The Available status. \
 * **Provisioning**: The Provisioning status.
 */
export type L2NetworkDetailedStatus = string;

/** The provisioning state of the L2 network. */
export enum KnownL2NetworkProvisioningState {
  /** The Succeeded status. */
  Succeeded = "Succeeded",
  /** The Failed status. */
  Failed = "Failed",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
  /** The Accepted status. */
  Accepted = "Accepted",
}

/**
 * The provisioning state of the L2 network. \
 * {@link KnownL2NetworkProvisioningState} can be used interchangeably with L2NetworkProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The Succeeded status. \
 * **Failed**: The Failed status. \
 * **Canceled**: The Canceled status. \
 * **Provisioning**: The Provisioning status. \
 * **Accepted**: The Accepted status.
 */
export type L2NetworkProvisioningState = string;

/** L2NetworkPatchParameters represents the body of the request to patch the L2 network. */
export interface L2NetworkPatchParameters {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function l2NetworkPatchParametersSerializer(item: L2NetworkPatchParameters): any {
  return { tags: item["tags"] };
}

/** L2NetworkList represents a list of L2 networks. */
export interface _L2NetworkList {
  /** The L2Network items on this page */
  value: L2Network[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _l2NetworkListDeserializer(item: any): _L2NetworkList {
  return {
    value: l2NetworkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function l2NetworkArraySerializer(result: Array<L2Network>): any[] {
  return result.map((item) => {
    return l2NetworkSerializer(item);
  });
}

export function l2NetworkArrayDeserializer(result: Array<L2Network>): any[] {
  return result.map((item) => {
    return l2NetworkDeserializer(item);
  });
}

/** L3Network represents a network that utilizes a single isolation domain set up for layer-3 resources. */
export interface L3Network extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The extended location of the resource. This property is required when creating the resource. */
  extendedLocation: ExtendedLocation;
  /** Field Deprecated. The field was previously optional, now it will have no defined behavior and will be ignored. The indicator of whether or not to disable IPAM allocation on the network attachment definition injected into the Hybrid AKS Cluster. */
  hybridAksIpamEnabled?: HybridAksIpamEnabled;
  /** Field Deprecated. The field was previously optional, now it will have no defined behavior and will be ignored. The network plugin type for Hybrid AKS. */
  hybridAksPluginType?: HybridAksPluginType;
  /** The default interface name for this L3 network in the virtual machine. This name can be overridden by the name supplied in the network attachment configuration of that virtual machine. */
  interfaceName?: string;
  /** The type of the IP address allocation, defaulted to "DualStack". */
  ipAllocationType?: IpAllocationType;
  /** The IPV4 prefix (CIDR) assigned to this L3 network. Required when the IP allocation type is IPV4 or DualStack. */
  ipv4ConnectedPrefix?: string;
  /** The IPV6 prefix (CIDR) assigned to this L3 network. Required when the IP allocation type is IPV6 or DualStack. */
  ipv6ConnectedPrefix?: string;
  /** The resource ID of the Network Fabric l3IsolationDomain. */
  l3IsolationDomainId: string;
  /** The VLAN from the l3IsolationDomain that is used for this network. */
  vlan: number;
  /** The list of resource IDs for the other Microsoft.NetworkCloud resources that have attached this network. */
  readonly associatedResourceIds?: string[];
  /** The resource ID of the Network Cloud cluster this L3 network is associated with. */
  readonly clusterId?: string;
  /** The more detailed status of the L3 network. */
  readonly detailedStatus?: L3NetworkDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** Field Deprecated. These fields will be empty/omitted. The list of Hybrid AKS cluster resource IDs that are associated with this L3 network. */
  readonly hybridAksClustersAssociatedIds?: string[];
  /** Field Deprecated. These fields will be empty/omitted. The list of virtual machine resource IDs, excluding any Hybrid AKS virtual machines, that are currently using this L3 network. */
  readonly virtualMachinesAssociatedIds?: string[];
  /** The provisioning state of the L3 network. */
  readonly provisioningState?: L3NetworkProvisioningState;
}

export function l3NetworkSerializer(item: L3Network): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _l3NetworkPropertiesSerializer(item),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function l3NetworkDeserializer(item: any): L3Network {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._l3NetworkPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** L3NetworkProperties represents properties of the L3 network. */
export interface L3NetworkProperties {
  /** Field Deprecated. The field was previously optional, now it will have no defined behavior and will be ignored. The indicator of whether or not to disable IPAM allocation on the network attachment definition injected into the Hybrid AKS Cluster. */
  hybridAksIpamEnabled?: HybridAksIpamEnabled;
  /** Field Deprecated. The field was previously optional, now it will have no defined behavior and will be ignored. The network plugin type for Hybrid AKS. */
  hybridAksPluginType?: HybridAksPluginType;
  /** The default interface name for this L3 network in the virtual machine. This name can be overridden by the name supplied in the network attachment configuration of that virtual machine. */
  interfaceName?: string;
  /** The type of the IP address allocation, defaulted to "DualStack". */
  ipAllocationType?: IpAllocationType;
  /** The IPV4 prefix (CIDR) assigned to this L3 network. Required when the IP allocation type is IPV4 or DualStack. */
  ipv4ConnectedPrefix?: string;
  /** The IPV6 prefix (CIDR) assigned to this L3 network. Required when the IP allocation type is IPV6 or DualStack. */
  ipv6ConnectedPrefix?: string;
  /** The resource ID of the Network Fabric l3IsolationDomain. */
  l3IsolationDomainId: string;
  /** The VLAN from the l3IsolationDomain that is used for this network. */
  vlan: number;
  /** The list of resource IDs for the other Microsoft.NetworkCloud resources that have attached this network. */
  readonly associatedResourceIds?: string[];
  /** The resource ID of the Network Cloud cluster this L3 network is associated with. */
  readonly clusterId?: string;
  /** The more detailed status of the L3 network. */
  readonly detailedStatus?: L3NetworkDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** Field Deprecated. These fields will be empty/omitted. The list of Hybrid AKS cluster resource IDs that are associated with this L3 network. */
  readonly hybridAksClustersAssociatedIds?: string[];
  /** Field Deprecated. These fields will be empty/omitted. The list of virtual machine resource IDs, excluding any Hybrid AKS virtual machines, that are currently using this L3 network. */
  readonly virtualMachinesAssociatedIds?: string[];
  /** The provisioning state of the L3 network. */
  readonly provisioningState?: L3NetworkProvisioningState;
}

export function l3NetworkPropertiesSerializer(item: L3NetworkProperties): any {
  return {
    hybridAksIpamEnabled: item["hybridAksIpamEnabled"],
    hybridAksPluginType: item["hybridAksPluginType"],
    interfaceName: item["interfaceName"],
    ipAllocationType: item["ipAllocationType"],
    ipv4ConnectedPrefix: item["ipv4ConnectedPrefix"],
    ipv6ConnectedPrefix: item["ipv6ConnectedPrefix"],
    l3IsolationDomainId: item["l3IsolationDomainId"],
    vlan: item["vlan"],
  };
}

export function l3NetworkPropertiesDeserializer(item: any): L3NetworkProperties {
  return {
    hybridAksIpamEnabled: item["hybridAksIpamEnabled"],
    hybridAksPluginType: item["hybridAksPluginType"],
    interfaceName: item["interfaceName"],
    ipAllocationType: item["ipAllocationType"],
    ipv4ConnectedPrefix: item["ipv4ConnectedPrefix"],
    ipv6ConnectedPrefix: item["ipv6ConnectedPrefix"],
    l3IsolationDomainId: item["l3IsolationDomainId"],
    vlan: item["vlan"],
    associatedResourceIds: !item["associatedResourceIds"]
      ? item["associatedResourceIds"]
      : item["associatedResourceIds"].map((p: any) => {
          return p;
        }),
    clusterId: item["clusterId"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    hybridAksClustersAssociatedIds: !item["hybridAksClustersAssociatedIds"]
      ? item["hybridAksClustersAssociatedIds"]
      : item["hybridAksClustersAssociatedIds"].map((p: any) => {
          return p;
        }),
    virtualMachinesAssociatedIds: !item["virtualMachinesAssociatedIds"]
      ? item["virtualMachinesAssociatedIds"]
      : item["virtualMachinesAssociatedIds"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** Field Deprecated. The field was previously optional, now it will have no defined behavior and will be ignored. The indicator of whether or not to disable IPAM allocation on the network attachment definition injected into the Hybrid AKS Cluster. */
export enum KnownHybridAksIpamEnabled {
  /** Hybrid AKS IPAM allocation is enabled. */
  True = "True",
  /** Hybrid AKS IPAM allocation is disabled. */
  False = "False",
}

/**
 * Field Deprecated. The field was previously optional, now it will have no defined behavior and will be ignored. The indicator of whether or not to disable IPAM allocation on the network attachment definition injected into the Hybrid AKS Cluster. \
 * {@link KnownHybridAksIpamEnabled} can be used interchangeably with HybridAksIpamEnabled,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: Hybrid AKS IPAM allocation is enabled. \
 * **False**: Hybrid AKS IPAM allocation is disabled.
 */
export type HybridAksIpamEnabled = string;

/** The type of the IP address allocation, defaulted to "DualStack". */
export enum KnownIpAllocationType {
  /** The IPV4 address allocation type. */
  IPV4 = "IPV4",
  /** The IPV6 address allocation type. */
  IPV6 = "IPV6",
  /** The DualStack address allocation type. */
  DualStack = "DualStack",
}

/**
 * The type of the IP address allocation, defaulted to "DualStack". \
 * {@link KnownIpAllocationType} can be used interchangeably with IpAllocationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPV4**: The IPV4 address allocation type. \
 * **IPV6**: The IPV6 address allocation type. \
 * **DualStack**: The DualStack address allocation type.
 */
export type IpAllocationType = string;

/** The more detailed status of the L3 network. */
export enum KnownL3NetworkDetailedStatus {
  /** The Error status. */
  Error = "Error",
  /** The Available status. */
  Available = "Available",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
}

/**
 * The more detailed status of the L3 network. \
 * {@link KnownL3NetworkDetailedStatus} can be used interchangeably with L3NetworkDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Error**: The Error status. \
 * **Available**: The Available status. \
 * **Provisioning**: The Provisioning status.
 */
export type L3NetworkDetailedStatus = string;

/** The provisioning state of the L3 network. */
export enum KnownL3NetworkProvisioningState {
  /** The Succeeded status. */
  Succeeded = "Succeeded",
  /** The Failed status. */
  Failed = "Failed",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
  /** The Accepted status. */
  Accepted = "Accepted",
}

/**
 * The provisioning state of the L3 network. \
 * {@link KnownL3NetworkProvisioningState} can be used interchangeably with L3NetworkProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The Succeeded status. \
 * **Failed**: The Failed status. \
 * **Canceled**: The Canceled status. \
 * **Provisioning**: The Provisioning status. \
 * **Accepted**: The Accepted status.
 */
export type L3NetworkProvisioningState = string;

/** L3NetworkPatchParameters represents the body of the request to patch the cloud services network. */
export interface L3NetworkPatchParameters {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function l3NetworkPatchParametersSerializer(item: L3NetworkPatchParameters): any {
  return { tags: item["tags"] };
}

/** L3NetworkList represents a list of L3 networks. */
export interface _L3NetworkList {
  /** The L3Network items on this page */
  value: L3Network[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _l3NetworkListDeserializer(item: any): _L3NetworkList {
  return {
    value: l3NetworkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function l3NetworkArraySerializer(result: Array<L3Network>): any[] {
  return result.map((item) => {
    return l3NetworkSerializer(item);
  });
}

export function l3NetworkArrayDeserializer(result: Array<L3Network>): any[] {
  return result.map((item) => {
    return l3NetworkDeserializer(item);
  });
}

/** RackSku represents the SKU information of the rack. */
export interface RackSku extends ProxyResource {
  /** The list of machine SKUs and associated rack slot for the compute-dedicated machines in this rack model. */
  readonly computeMachines?: MachineSkuSlot[];
  /** The list of machine SKUs and associated rack slot for the control-plane dedicated machines in this rack model. */
  readonly controllerMachines?: MachineSkuSlot[];
  /** The deployment type supported by the rack SKU. */
  readonly deploymentType?: DeploymentType;
  /** The free-form text describing the rack. */
  readonly description?: string;
  /** The maximum number of compute racks supported by an aggregator rack. 0 if this is a compute rack or a rack for a single rack cluster(rackType="Single"). */
  readonly maxClusterSlots?: number;
  /** The provisioning state of the rack SKU resource. */
  readonly provisioningState?: RackSkuProvisioningState;
  /** The type of the rack. */
  readonly rackType?: RackSkuType;
  /** The list of appliance SKUs and associated rack slot for the storage appliance(s) in this rack model. */
  readonly storageAppliances?: StorageApplianceSkuSlot[];
  /** The list of supported SKUs if the rack is an aggregator. */
  readonly supportedRackSkuIds?: string[];
}

export function rackSkuDeserializer(item: any): RackSku {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._rackSkuPropertiesDeserializer(item["properties"]),
  };
}

/** RackSkuProperties represents the properties of compute-related hardware for a rack. This supports both aggregator and compute racks. */
export interface RackSkuProperties {
  /** The list of machine SKUs and associated rack slot for the compute-dedicated machines in this rack model. */
  readonly computeMachines?: MachineSkuSlot[];
  /** The list of machine SKUs and associated rack slot for the control-plane dedicated machines in this rack model. */
  readonly controllerMachines?: MachineSkuSlot[];
  /** The deployment type supported by the rack SKU. */
  readonly deploymentType?: DeploymentType;
  /** The free-form text describing the rack. */
  readonly description?: string;
  /** The maximum number of compute racks supported by an aggregator rack. 0 if this is a compute rack or a rack for a single rack cluster(rackType="Single"). */
  readonly maxClusterSlots?: number;
  /** The provisioning state of the rack SKU resource. */
  readonly provisioningState?: RackSkuProvisioningState;
  /** The type of the rack. */
  readonly rackType?: RackSkuType;
  /** The list of appliance SKUs and associated rack slot for the storage appliance(s) in this rack model. */
  readonly storageAppliances?: StorageApplianceSkuSlot[];
  /** The list of supported SKUs if the rack is an aggregator. */
  readonly supportedRackSkuIds?: string[];
}

export function rackSkuPropertiesDeserializer(item: any): RackSkuProperties {
  return {
    computeMachines: !item["computeMachines"]
      ? item["computeMachines"]
      : machineSkuSlotArrayDeserializer(item["computeMachines"]),
    controllerMachines: !item["controllerMachines"]
      ? item["controllerMachines"]
      : machineSkuSlotArrayDeserializer(item["controllerMachines"]),
    deploymentType: item["deploymentType"],
    description: item["description"],
    maxClusterSlots: item["maxClusterSlots"],
    provisioningState: item["provisioningState"],
    rackType: item["rackType"],
    storageAppliances: !item["storageAppliances"]
      ? item["storageAppliances"]
      : storageApplianceSkuSlotArrayDeserializer(item["storageAppliances"]),
    supportedRackSkuIds: !item["supportedRackSkuIds"]
      ? item["supportedRackSkuIds"]
      : item["supportedRackSkuIds"].map((p: any) => {
          return p;
        }),
  };
}

export function machineSkuSlotArrayDeserializer(result: Array<MachineSkuSlot>): any[] {
  return result.map((item) => {
    return machineSkuSlotDeserializer(item);
  });
}

/** MachineSkuSlot represents a single SKU and rack slot associated with the machine. */
export interface MachineSkuSlot {
  /** The position in the rack for the machine. */
  readonly rackSlot?: number;
  /** The type of bootstrap protocol used. */
  readonly bootstrapProtocol?: BootstrapProtocol;
  /** The count of CPU cores for this machine. */
  readonly cpuCores?: number;
  /** The count of CPU sockets for this machine. */
  readonly cpuSockets?: number;
  /** The list of disks. */
  readonly disks?: MachineDisk[];
  /** The generation of the architecture. */
  readonly generation?: string;
  /** The hardware version of the machine. */
  readonly hardwareVersion?: string;
  /** The maximum amount of memory. Measured in gibibytes. */
  readonly memoryCapacityGB?: number;
  /** The model of the machine. */
  readonly model?: string;
  /** The list of network interfaces. */
  readonly networkInterfaces?: NetworkInterface[];
  /** The count of SMT and physical core threads for this machine. */
  readonly totalThreads?: number;
  /** The make of the machine. */
  readonly vendor?: string;
}

export function machineSkuSlotDeserializer(item: any): MachineSkuSlot {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _machineSkuSlotPropertiesDeserializer(item["properties"])),
    rackSlot: item["rackSlot"],
  };
}

/** MachineSkuProperties represents the properties of the machine SKU. */
export interface MachineSkuProperties {
  /** The type of bootstrap protocol used. */
  readonly bootstrapProtocol?: BootstrapProtocol;
  /** The count of CPU cores for this machine. */
  readonly cpuCores?: number;
  /** The count of CPU sockets for this machine. */
  readonly cpuSockets?: number;
  /** The list of disks. */
  readonly disks?: MachineDisk[];
  /** The generation of the architecture. */
  readonly generation?: string;
  /** The hardware version of the machine. */
  readonly hardwareVersion?: string;
  /** The maximum amount of memory. Measured in gibibytes. */
  readonly memoryCapacityGB?: number;
  /** The model of the machine. */
  readonly model?: string;
  /** The list of network interfaces. */
  readonly networkInterfaces?: NetworkInterface[];
  /** The count of SMT and physical core threads for this machine. */
  readonly totalThreads?: number;
  /** The make of the machine. */
  readonly vendor?: string;
}

export function machineSkuPropertiesDeserializer(item: any): MachineSkuProperties {
  return {
    bootstrapProtocol: item["bootstrapProtocol"],
    cpuCores: item["cpuCores"],
    cpuSockets: item["cpuSockets"],
    disks: !item["disks"] ? item["disks"] : machineDiskArrayDeserializer(item["disks"]),
    generation: item["generation"],
    hardwareVersion: item["hardwareVersion"],
    memoryCapacityGB: item["memoryCapacityGB"],
    model: item["model"],
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceArrayDeserializer(item["networkInterfaces"]),
    totalThreads: item["totalThreads"],
    vendor: item["vendor"],
  };
}

/** The type of bootstrap protocol used. */
export enum KnownBootstrapProtocol {
  /** PXE bootstrap protocol */
  PXE = "PXE",
}

/**
 * The type of bootstrap protocol used. \
 * {@link KnownBootstrapProtocol} can be used interchangeably with BootstrapProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PXE**: PXE bootstrap protocol
 */
export type BootstrapProtocol = string;

export function machineDiskArrayDeserializer(result: Array<MachineDisk>): any[] {
  return result.map((item) => {
    return machineDiskDeserializer(item);
  });
}

/** MachineDisk represents the properties of the disk. */
export interface MachineDisk {
  /** The maximum amount of storage. Measured in gibibytes. */
  readonly capacityGB?: number;
  /** The connection type of the rack SKU resource. */
  readonly connection?: MachineSkuDiskConnectionType;
  /** The disk type of rack SKU resource. */
  readonly type?: DiskType;
}

export function machineDiskDeserializer(item: any): MachineDisk {
  return {
    capacityGB: item["capacityGB"],
    connection: item["connection"],
    type: item["type"],
  };
}

/** The connection type of the rack SKU resource. */
export enum KnownMachineSkuDiskConnectionType {
  /** PCIE connection type */
  Pcie = "PCIE",
  /** SATA connection type */
  Sata = "SATA",
  /** RAID connection type */
  Raid = "RAID",
  /** SAS connection type */
  SAS = "SAS",
}

/**
 * The connection type of the rack SKU resource. \
 * {@link KnownMachineSkuDiskConnectionType} can be used interchangeably with MachineSkuDiskConnectionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PCIE**: PCIE connection type \
 * **SATA**: SATA connection type \
 * **RAID**: RAID connection type \
 * **SAS**: SAS connection type
 */
export type MachineSkuDiskConnectionType = string;

/** The disk type of rack SKU resource. */
export enum KnownDiskType {
  /** HDD disk type */
  HDD = "HDD",
  /** SSD disk type */
  SSD = "SSD",
}

/**
 * The disk type of rack SKU resource. \
 * {@link KnownDiskType} can be used interchangeably with DiskType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HDD**: HDD disk type \
 * **SSD**: SSD disk type
 */
export type DiskType = string;

export function networkInterfaceArrayDeserializer(result: Array<NetworkInterface>): any[] {
  return result.map((item) => {
    return networkInterfaceDeserializer(item);
  });
}

/** NetworkInterface represents properties of the network interface. */
export interface NetworkInterface {
  /** The partial address of Peripheral Component Interconnect (PCI). */
  readonly address?: string;
  /** The connection type of the device. */
  readonly deviceConnectionType?: DeviceConnectionType;
  /** The model name of the device. */
  readonly model?: string;
  /** The physical slot for this device. */
  readonly physicalSlot?: number;
  /** The number of ports on the device. */
  readonly portCount?: number;
  /** The maximum amount of data in gigabits that the line card transmits through a port at any given second. */
  readonly portSpeed?: number;
  /** The vendor name of the device. */
  readonly vendor?: string;
}

export function networkInterfaceDeserializer(item: any): NetworkInterface {
  return {
    address: item["address"],
    deviceConnectionType: item["deviceConnectionType"],
    model: item["model"],
    physicalSlot: item["physicalSlot"],
    portCount: item["portCount"],
    portSpeed: item["portSpeed"],
    vendor: item["vendor"],
  };
}

/** The connection type of the device. */
export enum KnownDeviceConnectionType {
  /** PCI connection type */
  PCI = "PCI",
}

/**
 * The connection type of the device. \
 * {@link KnownDeviceConnectionType} can be used interchangeably with DeviceConnectionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PCI**: PCI connection type
 */
export type DeviceConnectionType = string;

/** The provisioning state of the rack SKU resource. */
export enum KnownRackSkuProvisioningState {
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Failed status. */
  Failed = "Failed",
  /** The Succeeded status. */
  Succeeded = "Succeeded",
}

/**
 * The provisioning state of the rack SKU resource. \
 * {@link KnownRackSkuProvisioningState} can be used interchangeably with RackSkuProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Canceled**: The Canceled status. \
 * **Failed**: The Failed status. \
 * **Succeeded**: The Succeeded status.
 */
export type RackSkuProvisioningState = string;

/** The type of the rack. */
export enum KnownRackSkuType {
  /** Aggregator Rack */
  Aggregator = "Aggregator",
  /** Compute Rack */
  Compute = "Compute",
  /** Combination of Aggregator Rack and Compute Rack for a single rack cluster */
  Single = "Single",
}

/**
 * The type of the rack. \
 * {@link KnownRackSkuType} can be used interchangeably with RackSkuType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Aggregator**: Aggregator Rack \
 * **Compute**: Compute Rack \
 * **Single**: Combination of Aggregator Rack and Compute Rack for a single rack cluster
 */
export type RackSkuType = string;

export function storageApplianceSkuSlotArrayDeserializer(
  result: Array<StorageApplianceSkuSlot>,
): any[] {
  return result.map((item) => {
    return storageApplianceSkuSlotDeserializer(item);
  });
}

/** StorageApplianceSkuSlot represents the single SKU and rack slot associated with the storage appliance. */
export interface StorageApplianceSkuSlot {
  /** The position in the rack for the storage appliance. */
  readonly rackSlot?: number;
  /** The maximum capacity of the storage appliance. Measured in gibibytes. */
  readonly capacityGB?: number;
  /** The model of the storage appliance. */
  readonly model?: string;
}

export function storageApplianceSkuSlotDeserializer(item: any): StorageApplianceSkuSlot {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _storageApplianceSkuSlotPropertiesDeserializer(item["properties"])),
    rackSlot: item["rackSlot"],
  };
}

/** StorageApplianceSkuProperties represents the properties of the storage appliance SKU. */
export interface StorageApplianceSkuProperties {
  /** The maximum capacity of the storage appliance. Measured in gibibytes. */
  readonly capacityGB?: number;
  /** The model of the storage appliance. */
  readonly model?: string;
}

export function storageApplianceSkuPropertiesDeserializer(
  item: any,
): StorageApplianceSkuProperties {
  return {
    capacityGB: item["capacityGB"],
    model: item["model"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

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

/** RackSkuList represents a list of rack SKUs. */
export interface _RackSkuList {
  /** The RackSku items on this page */
  value: RackSku[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _rackSkuListDeserializer(item: any): _RackSkuList {
  return {
    value: rackSkuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function rackSkuArrayDeserializer(result: Array<RackSku>): any[] {
  return result.map((item) => {
    return rackSkuDeserializer(item);
  });
}

/** Rack represents the hardware of the rack and is dependent upon the cluster for lifecycle. */
export interface Rack extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The extended location of the resource. This property is required when creating the resource. */
  extendedLocation: ExtendedLocation;
  /** The value that will be used for machines in this rack to represent the availability zones that can be referenced by Hybrid AKS Clusters for node arrangement. */
  availabilityZone: string;
  /** The free-form description of the rack location. (e.g. "DTN Datacenter, Floor 3, Isle 9, Rack 2B") */
  rackLocation: string;
  /** The unique identifier for the rack within Network Cloud cluster. An alternate unique alphanumeric value other than a serial number may be provided if desired. */
  rackSerialNumber: string;
  /** The SKU for the rack. */
  rackSkuId: string;
  /** The resource ID of the cluster the rack is created for. This value is set when the rack is created by the cluster. */
  readonly clusterId?: string;
  /** The more detailed status of the rack. */
  readonly detailedStatus?: RackDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The provisioning state of the rack resource. */
  readonly provisioningState?: RackProvisioningState;
}

export function rackSerializer(item: Rack): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _rackPropertiesSerializer(item),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function rackDeserializer(item: any): Rack {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._rackPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** RackProperties represents the properties of the rack. */
export interface RackProperties {
  /** The value that will be used for machines in this rack to represent the availability zones that can be referenced by Hybrid AKS Clusters for node arrangement. */
  availabilityZone: string;
  /** The free-form description of the rack location. (e.g. "DTN Datacenter, Floor 3, Isle 9, Rack 2B") */
  rackLocation: string;
  /** The unique identifier for the rack within Network Cloud cluster. An alternate unique alphanumeric value other than a serial number may be provided if desired. */
  rackSerialNumber: string;
  /** The SKU for the rack. */
  rackSkuId: string;
  /** The resource ID of the cluster the rack is created for. This value is set when the rack is created by the cluster. */
  readonly clusterId?: string;
  /** The more detailed status of the rack. */
  readonly detailedStatus?: RackDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The provisioning state of the rack resource. */
  readonly provisioningState?: RackProvisioningState;
}

export function rackPropertiesSerializer(item: RackProperties): any {
  return {
    availabilityZone: item["availabilityZone"],
    rackLocation: item["rackLocation"],
    rackSerialNumber: item["rackSerialNumber"],
    rackSkuId: item["rackSkuId"],
  };
}

export function rackPropertiesDeserializer(item: any): RackProperties {
  return {
    availabilityZone: item["availabilityZone"],
    rackLocation: item["rackLocation"],
    rackSerialNumber: item["rackSerialNumber"],
    rackSkuId: item["rackSkuId"],
    clusterId: item["clusterId"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    provisioningState: item["provisioningState"],
  };
}

/** The more detailed status of the rack. */
export enum KnownRackDetailedStatus {
  /** The Error status. */
  Error = "Error",
  /** The Available status. */
  Available = "Available",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
}

/**
 * The more detailed status of the rack. \
 * {@link KnownRackDetailedStatus} can be used interchangeably with RackDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Error**: The Error status. \
 * **Available**: The Available status. \
 * **Provisioning**: The Provisioning status.
 */
export type RackDetailedStatus = string;

/** The provisioning state of the rack resource. */
export enum KnownRackProvisioningState {
  /** The Succeeded status. */
  Succeeded = "Succeeded",
  /** The Failed status. */
  Failed = "Failed",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
  /** The Accepted status. */
  Accepted = "Accepted",
}

/**
 * The provisioning state of the rack resource. \
 * {@link KnownRackProvisioningState} can be used interchangeably with RackProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The Succeeded status. \
 * **Failed**: The Failed status. \
 * **Canceled**: The Canceled status. \
 * **Provisioning**: The Provisioning status. \
 * **Accepted**: The Accepted status.
 */
export type RackProvisioningState = string;

/** RackPatchParameters represents the body of the request to patch the rack properties. */
export interface RackPatchParameters {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The free-form description of the rack location. (e.g. "DTN Datacenter, Floor 3, Isle 9, Rack 2B") */
  rackLocation?: string;
  /** The globally unique identifier for the rack. */
  rackSerialNumber?: string;
}

export function rackPatchParametersSerializer(item: RackPatchParameters): any {
  return {
    properties: areAllPropsUndefined(item, ["rackLocation", "rackSerialNumber"])
      ? undefined
      : _rackPatchParametersPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** RacksPatchProperties represents the properties of the rack during patching. */
export interface RacksPatchProperties {
  /** The free-form description of the rack location. (e.g. "DTN Datacenter, Floor 3, Isle 9, Rack 2B") */
  rackLocation?: string;
  /** The globally unique identifier for the rack. */
  rackSerialNumber?: string;
}

export function racksPatchPropertiesSerializer(item: RacksPatchProperties): any {
  return { rackLocation: item["rackLocation"], rackSerialNumber: item["rackSerialNumber"] };
}

/** RackList represents a list of racks. */
export interface _RackList {
  /** The Rack items on this page */
  value: Rack[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _rackListDeserializer(item: any): _RackList {
  return {
    value: rackArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function rackArraySerializer(result: Array<Rack>): any[] {
  return result.map((item) => {
    return rackSerializer(item);
  });
}

export function rackArrayDeserializer(result: Array<Rack>): any[] {
  return result.map((item) => {
    return rackDeserializer(item);
  });
}

/** StorageAppliance represents on-premises Network Cloud storage appliance. */
export interface StorageAppliance extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The extended location of the resource. This property is required when creating the resource. */
  extendedLocation: ExtendedLocation;
  /** The credentials of the administrative interface on this storage appliance. */
  administratorCredentials: AdministrativeCredentials;
  /** The resource ID of the rack where this storage appliance resides. */
  rackId: string;
  /** The slot the storage appliance is in the rack based on the BOM configuration. */
  rackSlot: number;
  /** The serial number for the storage appliance. */
  serialNumber: string;
  /** The SKU for the storage appliance. */
  storageApplianceSkuId: string;
  /** The CA certificate information issued by the platform for connecting to TLS interfaces for the storage appliance. Callers add this certificate to their trusted CA store to allow secure communication with the storage appliance. */
  readonly caCertificate?: CertificateInfo;
  /** The total capacity of the storage appliance. Measured in GiB. */
  readonly capacity?: number;
  /** The amount of storage consumed. Measured in GiB. */
  readonly capacityUsed?: number;
  /** The resource ID of the cluster this storage appliance is associated with. */
  readonly clusterId?: string;
  /** The detailed status of the storage appliance. */
  readonly detailedStatus?: StorageApplianceDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The list of expansion shelves connected to the storage appliance. */
  readonly expansionShelves?: StorageApplianceExpansionShelf[];
  /** The endpoint for the management interface of the storage appliance. */
  readonly managementIpv4Address?: string;
  /** The manufacturer of the storage appliance. */
  readonly manufacturer?: string;
  /** The model of the storage appliance. */
  readonly model?: string;
  /** The monitoring configuration status of the storage appliance. */
  readonly monitoringConfigurationStatus?: StorageApplianceMonitoringConfigurationStatus;
  /** The indicator of whether the storage appliance supports remote vendor management. */
  readonly remoteVendorManagementFeature?: RemoteVendorManagementFeature;
  /** The indicator of whether the remote vendor management feature is enabled or disabled, or unsupported if it is an unsupported feature. */
  readonly remoteVendorManagementStatus?: RemoteVendorManagementStatus;
  /** The list of statuses that represent secret rotation activity. */
  readonly secretRotationStatus?: SecretRotationStatus[];
  /** The version of the storage appliance. */
  readonly version?: string;
  /** The provisioning state of the storage appliance. */
  readonly provisioningState?: StorageApplianceProvisioningState;
}

export function storageApplianceSerializer(item: StorageAppliance): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _storageAppliancePropertiesSerializer(item),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function storageApplianceDeserializer(item: any): StorageAppliance {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._storageAppliancePropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** StorageApplianceProperties represents the properties of the storage appliance. */
export interface StorageApplianceProperties {
  /** The credentials of the administrative interface on this storage appliance. */
  administratorCredentials: AdministrativeCredentials;
  /** The resource ID of the rack where this storage appliance resides. */
  rackId: string;
  /** The slot the storage appliance is in the rack based on the BOM configuration. */
  rackSlot: number;
  /** The serial number for the storage appliance. */
  serialNumber: string;
  /** The SKU for the storage appliance. */
  storageApplianceSkuId: string;
  /** The CA certificate information issued by the platform for connecting to TLS interfaces for the storage appliance. Callers add this certificate to their trusted CA store to allow secure communication with the storage appliance. */
  readonly caCertificate?: CertificateInfo;
  /** The total capacity of the storage appliance. Measured in GiB. */
  readonly capacity?: number;
  /** The amount of storage consumed. Measured in GiB. */
  readonly capacityUsed?: number;
  /** The resource ID of the cluster this storage appliance is associated with. */
  readonly clusterId?: string;
  /** The detailed status of the storage appliance. */
  readonly detailedStatus?: StorageApplianceDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The list of expansion shelves connected to the storage appliance. */
  readonly expansionShelves?: StorageApplianceExpansionShelf[];
  /** The endpoint for the management interface of the storage appliance. */
  readonly managementIpv4Address?: string;
  /** The manufacturer of the storage appliance. */
  readonly manufacturer?: string;
  /** The model of the storage appliance. */
  readonly model?: string;
  /** The monitoring configuration status of the storage appliance. */
  readonly monitoringConfigurationStatus?: StorageApplianceMonitoringConfigurationStatus;
  /** The indicator of whether the storage appliance supports remote vendor management. */
  readonly remoteVendorManagementFeature?: RemoteVendorManagementFeature;
  /** The indicator of whether the remote vendor management feature is enabled or disabled, or unsupported if it is an unsupported feature. */
  readonly remoteVendorManagementStatus?: RemoteVendorManagementStatus;
  /** The list of statuses that represent secret rotation activity. */
  readonly secretRotationStatus?: SecretRotationStatus[];
  /** The version of the storage appliance. */
  readonly version?: string;
  /** The provisioning state of the storage appliance. */
  readonly provisioningState?: StorageApplianceProvisioningState;
}

export function storageAppliancePropertiesSerializer(item: StorageApplianceProperties): any {
  return {
    administratorCredentials: administrativeCredentialsSerializer(item["administratorCredentials"]),
    rackId: item["rackId"],
    rackSlot: item["rackSlot"],
    serialNumber: item["serialNumber"],
    storageApplianceSkuId: item["storageApplianceSkuId"],
  };
}

export function storageAppliancePropertiesDeserializer(item: any): StorageApplianceProperties {
  return {
    administratorCredentials: administrativeCredentialsDeserializer(
      item["administratorCredentials"],
    ),
    rackId: item["rackId"],
    rackSlot: item["rackSlot"],
    serialNumber: item["serialNumber"],
    storageApplianceSkuId: item["storageApplianceSkuId"],
    caCertificate: !item["caCertificate"]
      ? item["caCertificate"]
      : certificateInfoDeserializer(item["caCertificate"]),
    capacity: item["capacity"],
    capacityUsed: item["capacityUsed"],
    clusterId: item["clusterId"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    expansionShelves: !item["expansionShelves"]
      ? item["expansionShelves"]
      : storageApplianceExpansionShelfArrayDeserializer(item["expansionShelves"]),
    managementIpv4Address: item["managementIpv4Address"],
    manufacturer: item["manufacturer"],
    model: item["model"],
    monitoringConfigurationStatus: !item["monitoringConfigurationStatus"]
      ? item["monitoringConfigurationStatus"]
      : storageApplianceMonitoringConfigurationStatusDeserializer(
          item["monitoringConfigurationStatus"],
        ),
    remoteVendorManagementFeature: item["remoteVendorManagementFeature"],
    remoteVendorManagementStatus: item["remoteVendorManagementStatus"],
    secretRotationStatus: !item["secretRotationStatus"]
      ? item["secretRotationStatus"]
      : secretRotationStatusArrayDeserializer(item["secretRotationStatus"]),
    version: item["version"],
    provisioningState: item["provisioningState"],
  };
}

/** The detailed status of the storage appliance. */
export enum KnownStorageApplianceDetailedStatus {
  /** The Available status. */
  Available = "Available",
  /** The Degraded status. */
  Degraded = "Degraded",
  /** The Error status. */
  Error = "Error",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
}

/**
 * The detailed status of the storage appliance. \
 * {@link KnownStorageApplianceDetailedStatus} can be used interchangeably with StorageApplianceDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Available**: The Available status. \
 * **Degraded**: The Degraded status. \
 * **Error**: The Error status. \
 * **Provisioning**: The Provisioning status.
 */
export type StorageApplianceDetailedStatus = string;

export function storageApplianceExpansionShelfArrayDeserializer(
  result: Array<StorageApplianceExpansionShelf>,
): any[] {
  return result.map((item) => {
    return storageApplianceExpansionShelfDeserializer(item);
  });
}

/** StorageApplianceExpansionShelf represents an expansion shelf connected to a storage appliance. */
export interface StorageApplianceExpansionShelf {
  /** The model of the expansion shelf. */
  model?: string;
  /** The version of the expansion shelf. */
  version?: string;
}

export function storageApplianceExpansionShelfDeserializer(
  item: any,
): StorageApplianceExpansionShelf {
  return {
    model: item["model"],
    version: item["version"],
  };
}

/** The monitoring configuration status of the storage appliance. */
export interface StorageApplianceMonitoringConfigurationStatus {
  /** The log level for the monitoring configuration status of the storage appliance. */
  logLevel?: StorageApplianceMetricsConfigurationStatusLogLevel;
  /** The metrics level for the monitoring configuration status of the storage appliance. */
  metricsLevel?: StorageApplianceMetricsConfigurationStatusMetricsLevel;
}

export function storageApplianceMonitoringConfigurationStatusDeserializer(
  item: any,
): StorageApplianceMonitoringConfigurationStatus {
  return {
    logLevel: item["logLevel"],
    metricsLevel: item["metricsLevel"],
  };
}

/** The log level for the monitoring configuration status of the storage appliance. */
export enum KnownStorageApplianceMetricsConfigurationStatusLogLevel {
  /** Logs are emitted at the default log level. */
  Default = "Default",
  /** Logs are emitted at the Nexus log level. */
  Nexus = "Nexus",
}

/**
 * The log level for the monitoring configuration status of the storage appliance. \
 * {@link KnownStorageApplianceMetricsConfigurationStatusLogLevel} can be used interchangeably with StorageApplianceMetricsConfigurationStatusLogLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Logs are emitted at the default log level. \
 * **Nexus**: Logs are emitted at the Nexus log level.
 */
export type StorageApplianceMetricsConfigurationStatusLogLevel = string;

/** The metrics level for the monitoring configuration status of the storage appliance. */
export enum KnownStorageApplianceMetricsConfigurationStatusMetricsLevel {
  /** Metrics are emitted at the default metrics level. */
  Default = "Default",
  /** Metrics are emitted at the Nexus metrics level. */
  Nexus = "Nexus",
}

/**
 * The metrics level for the monitoring configuration status of the storage appliance. \
 * {@link KnownStorageApplianceMetricsConfigurationStatusMetricsLevel} can be used interchangeably with StorageApplianceMetricsConfigurationStatusMetricsLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Metrics are emitted at the default metrics level. \
 * **Nexus**: Metrics are emitted at the Nexus metrics level.
 */
export type StorageApplianceMetricsConfigurationStatusMetricsLevel = string;

/** The indicator of whether the storage appliance supports remote vendor management. */
export enum KnownRemoteVendorManagementFeature {
  /** Remote vendor management is supported. */
  Supported = "Supported",
  /** Remote vendor management is unsupported. */
  Unsupported = "Unsupported",
}

/**
 * The indicator of whether the storage appliance supports remote vendor management. \
 * {@link KnownRemoteVendorManagementFeature} can be used interchangeably with RemoteVendorManagementFeature,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Supported**: Remote vendor management is supported. \
 * **Unsupported**: Remote vendor management is unsupported.
 */
export type RemoteVendorManagementFeature = string;

/** The indicator of whether the remote vendor management feature is enabled or disabled, or unsupported if it is an unsupported feature. */
export enum KnownRemoteVendorManagementStatus {
  /** Remote vendor management is enabled. */
  Enabled = "Enabled",
  /** Remote vendor management is disabled. */
  Disabled = "Disabled",
  /** Remote vendor management is unsupported. */
  Unsupported = "Unsupported",
}

/**
 * The indicator of whether the remote vendor management feature is enabled or disabled, or unsupported if it is an unsupported feature. \
 * {@link KnownRemoteVendorManagementStatus} can be used interchangeably with RemoteVendorManagementStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Remote vendor management is enabled. \
 * **Disabled**: Remote vendor management is disabled. \
 * **Unsupported**: Remote vendor management is unsupported.
 */
export type RemoteVendorManagementStatus = string;

/** The provisioning state of the storage appliance. */
export enum KnownStorageApplianceProvisioningState {
  /** The Succeeded status. */
  Succeeded = "Succeeded",
  /** The Failed status. */
  Failed = "Failed",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
  /** The Accepted status. */
  Accepted = "Accepted",
}

/**
 * The provisioning state of the storage appliance. \
 * {@link KnownStorageApplianceProvisioningState} can be used interchangeably with StorageApplianceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The Succeeded status. \
 * **Failed**: The Failed status. \
 * **Canceled**: The Canceled status. \
 * **Provisioning**: The Provisioning status. \
 * **Accepted**: The Accepted status.
 */
export type StorageApplianceProvisioningState = string;

/** StorageAppliancePatchParameters represents the body of the request to patch storage appliance properties. */
export interface StorageAppliancePatchParameters {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The serial number for the storage appliance. */
  serialNumber?: string;
}

export function storageAppliancePatchParametersSerializer(
  item: StorageAppliancePatchParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, ["serialNumber"])
      ? undefined
      : _storageAppliancePatchParametersPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** StorageAppliancePatchProperties represents the properties of the storage appliance that can be patched. */
export interface StorageAppliancePatchProperties {
  /** The serial number for the storage appliance. */
  serialNumber?: string;
}

export function storageAppliancePatchPropertiesSerializer(
  item: StorageAppliancePatchProperties,
): any {
  return { serialNumber: item["serialNumber"] };
}

/** StorageApplianceList represents a list of storage appliances. */
export interface _StorageApplianceList {
  /** The StorageAppliance items on this page */
  value: StorageAppliance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _storageApplianceListDeserializer(item: any): _StorageApplianceList {
  return {
    value: storageApplianceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageApplianceArraySerializer(result: Array<StorageAppliance>): any[] {
  return result.map((item) => {
    return storageApplianceSerializer(item);
  });
}

export function storageApplianceArrayDeserializer(result: Array<StorageAppliance>): any[] {
  return result.map((item) => {
    return storageApplianceDeserializer(item);
  });
}

/** StorageApplianceEnableRemoteVendorManagementParameters represents the body of the request to enable remote vendor management of a storage appliance. */
export interface StorageApplianceEnableRemoteVendorManagementParameters {
  /** Field Deprecated. This field is not used and will be rejected if provided. The list of IPv4 subnets (in CIDR format), IPv6 subnets (in CIDR format), or hostnames that the storage appliance needs accessible in order to turn on the remote vendor management. */
  supportEndpoints?: string[];
}

export function storageApplianceEnableRemoteVendorManagementParametersSerializer(
  item: StorageApplianceEnableRemoteVendorManagementParameters,
): any {
  return {
    supportEndpoints: !item["supportEndpoints"]
      ? item["supportEndpoints"]
      : item["supportEndpoints"].map((p: any) => {
          return p;
        }),
  };
}

/** StorageApplianceRunReadCommandsParameters represents the body of request containing list of read-only commands to run on the storage appliance. */
export interface StorageApplianceRunReadCommandsParameters {
  /** The list of read-only commands to be executed directly against the target storage appliance. */
  commands: StorageApplianceCommandSpecification[];
  /** The maximum time the commands are allowed to run. */
  limitTimeSeconds: number;
}

export function storageApplianceRunReadCommandsParametersSerializer(
  item: StorageApplianceRunReadCommandsParameters,
): any {
  return {
    commands: storageApplianceCommandSpecificationArraySerializer(item["commands"]),
    limitTimeSeconds: item["limitTimeSeconds"],
  };
}

export function storageApplianceCommandSpecificationArraySerializer(
  result: Array<StorageApplianceCommandSpecification>,
): any[] {
  return result.map((item) => {
    return storageApplianceCommandSpecificationSerializer(item);
  });
}

/** StorageApplianceCommandSpecification represents the command and optional arguments to run. */
export interface StorageApplianceCommandSpecification {
  /** The list of strings that will be passed to the script in order as separate arguments. */
  arguments?: string[];
  /** The command to execute. */
  command: string;
}

export function storageApplianceCommandSpecificationSerializer(
  item: StorageApplianceCommandSpecification,
): any {
  return {
    arguments: !item["arguments"]
      ? item["arguments"]
      : item["arguments"].map((p: any) => {
          return p;
        }),
    command: item["command"],
  };
}

/** TrunkedNetwork represents a network that utilizes multiple isolation domains and specified VLANs to create a trunked network. */
export interface TrunkedNetwork extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The extended location of the resource. This property is required when creating the resource. */
  extendedLocation: ExtendedLocation;
  /** Field Deprecated. The field was previously optional, now it will have no defined behavior and will be ignored. The network plugin type for Hybrid AKS. */
  hybridAksPluginType?: HybridAksPluginType;
  /** The default interface name for this trunked network in the virtual machine. This name can be overridden by the name supplied in the network attachment configuration of that virtual machine. */
  interfaceName?: string;
  /** The list of resource IDs representing the Network Fabric isolation domains. It can be any combination of l2IsolationDomain and l3IsolationDomain resources. */
  isolationDomainIds: string[];
  /** The list of vlans that are selected from the isolation domains for trunking. */
  vlans: number[];
  /** The list of resource IDs for the other Microsoft.NetworkCloud resources that have attached this network. */
  readonly associatedResourceIds?: string[];
  /** The resource ID of the Network Cloud cluster this trunked network is associated with. */
  readonly clusterId?: string;
  /** The more detailed status of the trunked network. */
  readonly detailedStatus?: TrunkedNetworkDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** Field Deprecated. These fields will be empty/omitted. The list of Hybrid AKS cluster resource IDs that are associated with this trunked network. */
  readonly hybridAksClustersAssociatedIds?: string[];
  /** Field Deprecated. These fields will be empty/omitted. The list of virtual machine resource IDs, excluding any Hybrid AKS virtual machines, that are currently using this trunked network. */
  readonly virtualMachinesAssociatedIds?: string[];
  /** The provisioning state of the trunked network. */
  readonly provisioningState?: TrunkedNetworkProvisioningState;
}

export function trunkedNetworkSerializer(item: TrunkedNetwork): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _trunkedNetworkPropertiesSerializer(item),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function trunkedNetworkDeserializer(item: any): TrunkedNetwork {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._trunkedNetworkPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** TrunkedNetworkProperties represents properties of the trunked network. */
export interface TrunkedNetworkProperties {
  /** Field Deprecated. The field was previously optional, now it will have no defined behavior and will be ignored. The network plugin type for Hybrid AKS. */
  hybridAksPluginType?: HybridAksPluginType;
  /** The default interface name for this trunked network in the virtual machine. This name can be overridden by the name supplied in the network attachment configuration of that virtual machine. */
  interfaceName?: string;
  /** The list of resource IDs representing the Network Fabric isolation domains. It can be any combination of l2IsolationDomain and l3IsolationDomain resources. */
  isolationDomainIds: string[];
  /** The list of vlans that are selected from the isolation domains for trunking. */
  vlans: number[];
  /** The list of resource IDs for the other Microsoft.NetworkCloud resources that have attached this network. */
  readonly associatedResourceIds?: string[];
  /** The resource ID of the Network Cloud cluster this trunked network is associated with. */
  readonly clusterId?: string;
  /** The more detailed status of the trunked network. */
  readonly detailedStatus?: TrunkedNetworkDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** Field Deprecated. These fields will be empty/omitted. The list of Hybrid AKS cluster resource IDs that are associated with this trunked network. */
  readonly hybridAksClustersAssociatedIds?: string[];
  /** Field Deprecated. These fields will be empty/omitted. The list of virtual machine resource IDs, excluding any Hybrid AKS virtual machines, that are currently using this trunked network. */
  readonly virtualMachinesAssociatedIds?: string[];
  /** The provisioning state of the trunked network. */
  readonly provisioningState?: TrunkedNetworkProvisioningState;
}

export function trunkedNetworkPropertiesSerializer(item: TrunkedNetworkProperties): any {
  return {
    hybridAksPluginType: item["hybridAksPluginType"],
    interfaceName: item["interfaceName"],
    isolationDomainIds: item["isolationDomainIds"].map((p: any) => {
      return p;
    }),
    vlans: item["vlans"].map((p: any) => {
      return p;
    }),
  };
}

export function trunkedNetworkPropertiesDeserializer(item: any): TrunkedNetworkProperties {
  return {
    hybridAksPluginType: item["hybridAksPluginType"],
    interfaceName: item["interfaceName"],
    isolationDomainIds: item["isolationDomainIds"].map((p: any) => {
      return p;
    }),
    vlans: item["vlans"].map((p: any) => {
      return p;
    }),
    associatedResourceIds: !item["associatedResourceIds"]
      ? item["associatedResourceIds"]
      : item["associatedResourceIds"].map((p: any) => {
          return p;
        }),
    clusterId: item["clusterId"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    hybridAksClustersAssociatedIds: !item["hybridAksClustersAssociatedIds"]
      ? item["hybridAksClustersAssociatedIds"]
      : item["hybridAksClustersAssociatedIds"].map((p: any) => {
          return p;
        }),
    virtualMachinesAssociatedIds: !item["virtualMachinesAssociatedIds"]
      ? item["virtualMachinesAssociatedIds"]
      : item["virtualMachinesAssociatedIds"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** The more detailed status of the trunked network. */
export enum KnownTrunkedNetworkDetailedStatus {
  /** The Error status. */
  Error = "Error",
  /** The Available status. */
  Available = "Available",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
}

/**
 * The more detailed status of the trunked network. \
 * {@link KnownTrunkedNetworkDetailedStatus} can be used interchangeably with TrunkedNetworkDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Error**: The Error status. \
 * **Available**: The Available status. \
 * **Provisioning**: The Provisioning status.
 */
export type TrunkedNetworkDetailedStatus = string;

/** The provisioning state of the trunked network. */
export enum KnownTrunkedNetworkProvisioningState {
  /** The Succeeded status. */
  Succeeded = "Succeeded",
  /** The Failed status. */
  Failed = "Failed",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
  /** The Accepted status. */
  Accepted = "Accepted",
}

/**
 * The provisioning state of the trunked network. \
 * {@link KnownTrunkedNetworkProvisioningState} can be used interchangeably with TrunkedNetworkProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The Succeeded status. \
 * **Failed**: The Failed status. \
 * **Canceled**: The Canceled status. \
 * **Provisioning**: The Provisioning status. \
 * **Accepted**: The Accepted status.
 */
export type TrunkedNetworkProvisioningState = string;

/** TrunkedNetworkPatchParameters represents the body of the request to patch the Trunked network. */
export interface TrunkedNetworkPatchParameters {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function trunkedNetworkPatchParametersSerializer(item: TrunkedNetworkPatchParameters): any {
  return { tags: item["tags"] };
}

/** TrunkedNetworkList represents a list of trunked networks. */
export interface _TrunkedNetworkList {
  /** The TrunkedNetwork items on this page */
  value: TrunkedNetwork[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _trunkedNetworkListDeserializer(item: any): _TrunkedNetworkList {
  return {
    value: trunkedNetworkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function trunkedNetworkArraySerializer(result: Array<TrunkedNetwork>): any[] {
  return result.map((item) => {
    return trunkedNetworkSerializer(item);
  });
}

export function trunkedNetworkArrayDeserializer(result: Array<TrunkedNetwork>): any[] {
  return result.map((item) => {
    return trunkedNetworkDeserializer(item);
  });
}

/** VirtualMachine represents the on-premises Network Cloud virtual machine. */
export interface VirtualMachine extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The extended location of the resource. This property is required when creating the resource. */
  extendedLocation: ExtendedLocation;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** The name of the administrator to which the ssh public keys will be added into the authorized keys. */
  adminUsername: string;
  /** Selects the boot method for the virtual machine. */
  bootMethod?: VirtualMachineBootMethod;
  /** The cloud service network that provides platform-level services for the virtual machine. */
  cloudServicesNetworkAttachment: NetworkAttachment;
  /** The number of CPU cores in the virtual machine. */
  cpuCores: number;
  /** Field Deprecated, the value will be ignored if provided. The indicator of whether one of the specified CPU cores is isolated to run the emulator thread for this virtual machine. */
  isolateEmulatorThread?: VirtualMachineIsolateEmulatorThread;
  /** The memory size of the virtual machine. Allocations are measured in gibibytes. */
  memorySizeGB: number;
  /** The list of network attachments to the virtual machine. */
  networkAttachments?: NetworkAttachment[];
  /** Field Deprecated: The Base64 encoded cloud-init network data. The networkDataContent property will be used in preference to this property. */
  networkData?: string;
  /** The Base64 encoded cloud-init network data. */
  networkDataContent?: string;
  /** The scheduling hints for the virtual machine. */
  placementHints?: VirtualMachinePlacementHint[];
  /** The list of ssh public keys. Each key will be added to the virtual machine using the cloud-init ssh_authorized_keys mechanism for the adminUsername. */
  sshPublicKeys?: SshPublicKey[];
  /** The storage profile that specifies size and other parameters about the disks related to the virtual machine. */
  storageProfile: StorageProfile;
  /** Field Deprecated: The Base64 encoded cloud-init user data. The userDataContent property will be used in preference to this property. */
  userData?: string;
  /** The Base64 encoded cloud-init user data. */
  userDataContent?: string;
  /** Field Deprecated, use virtualizationModel instead. The type of the virtio interface. */
  virtioInterface?: VirtualMachineVirtioInterfaceType;
  /** The type of the device model to use. */
  vmDeviceModel?: VirtualMachineDeviceModelType;
  /** The virtual machine image that is currently provisioned to the OS disk, using the full url and tag notation used to pull the image. */
  vmImage: string;
  /** The credentials used to login to the image repository that has access to the specified image. */
  vmImageRepositoryCredentials?: ImageRepositoryCredentials;
  /** The cluster availability zone containing this virtual machine. */
  readonly availabilityZone?: string;
  /** The resource ID of the bare metal machine that hosts the virtual machine. */
  readonly bareMetalMachineId?: string;
  /** The resource ID of the cluster the virtual machine is created for. */
  readonly clusterId?: string;
  /** The extended location to use for creation of a VM console resource. */
  consoleExtendedLocation?: ExtendedLocation;
  /** The more detailed status of the virtual machine. */
  readonly detailedStatus?: VirtualMachineDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The power state of the virtual machine. */
  readonly powerState?: VirtualMachinePowerState;
  /** The resource IDs of volumes that are attached to the virtual machine. */
  readonly volumes?: string[];
  /** The provisioning state of the virtual machine. */
  readonly provisioningState?: VirtualMachineProvisioningState;
}

export function virtualMachineSerializer(item: VirtualMachine): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _virtualMachinePropertiesSerializer(item),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function virtualMachineDeserializer(item: any): VirtualMachine {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._virtualMachinePropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** VirtualMachineProperties represents the properties of the virtual machine. */
export interface VirtualMachineProperties {
  /** The name of the administrator to which the ssh public keys will be added into the authorized keys. */
  adminUsername: string;
  /** Selects the boot method for the virtual machine. */
  bootMethod?: VirtualMachineBootMethod;
  /** The cloud service network that provides platform-level services for the virtual machine. */
  cloudServicesNetworkAttachment: NetworkAttachment;
  /** The number of CPU cores in the virtual machine. */
  cpuCores: number;
  /** Field Deprecated, the value will be ignored if provided. The indicator of whether one of the specified CPU cores is isolated to run the emulator thread for this virtual machine. */
  isolateEmulatorThread?: VirtualMachineIsolateEmulatorThread;
  /** The memory size of the virtual machine. Allocations are measured in gibibytes. */
  memorySizeGB: number;
  /** The list of network attachments to the virtual machine. */
  networkAttachments?: NetworkAttachment[];
  /** Field Deprecated: The Base64 encoded cloud-init network data. The networkDataContent property will be used in preference to this property. */
  networkData?: string;
  /** The Base64 encoded cloud-init network data. */
  networkDataContent?: string;
  /** The scheduling hints for the virtual machine. */
  placementHints?: VirtualMachinePlacementHint[];
  /** The list of ssh public keys. Each key will be added to the virtual machine using the cloud-init ssh_authorized_keys mechanism for the adminUsername. */
  sshPublicKeys?: SshPublicKey[];
  /** The storage profile that specifies size and other parameters about the disks related to the virtual machine. */
  storageProfile: StorageProfile;
  /** Field Deprecated: The Base64 encoded cloud-init user data. The userDataContent property will be used in preference to this property. */
  userData?: string;
  /** The Base64 encoded cloud-init user data. */
  userDataContent?: string;
  /** Field Deprecated, use virtualizationModel instead. The type of the virtio interface. */
  virtioInterface?: VirtualMachineVirtioInterfaceType;
  /** The type of the device model to use. */
  vmDeviceModel?: VirtualMachineDeviceModelType;
  /** The virtual machine image that is currently provisioned to the OS disk, using the full url and tag notation used to pull the image. */
  vmImage: string;
  /** The credentials used to login to the image repository that has access to the specified image. */
  vmImageRepositoryCredentials?: ImageRepositoryCredentials;
  /** The cluster availability zone containing this virtual machine. */
  readonly availabilityZone?: string;
  /** The resource ID of the bare metal machine that hosts the virtual machine. */
  readonly bareMetalMachineId?: string;
  /** The resource ID of the cluster the virtual machine is created for. */
  readonly clusterId?: string;
  /** The extended location to use for creation of a VM console resource. */
  consoleExtendedLocation?: ExtendedLocation;
  /** The more detailed status of the virtual machine. */
  readonly detailedStatus?: VirtualMachineDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The power state of the virtual machine. */
  readonly powerState?: VirtualMachinePowerState;
  /** The resource IDs of volumes that are attached to the virtual machine. */
  readonly volumes?: string[];
  /** The provisioning state of the virtual machine. */
  readonly provisioningState?: VirtualMachineProvisioningState;
}

export function virtualMachinePropertiesSerializer(item: VirtualMachineProperties): any {
  return {
    adminUsername: item["adminUsername"],
    bootMethod: item["bootMethod"],
    cloudServicesNetworkAttachment: networkAttachmentSerializer(
      item["cloudServicesNetworkAttachment"],
    ),
    cpuCores: item["cpuCores"],
    isolateEmulatorThread: item["isolateEmulatorThread"],
    memorySizeGB: item["memorySizeGB"],
    networkAttachments: !item["networkAttachments"]
      ? item["networkAttachments"]
      : networkAttachmentArraySerializer(item["networkAttachments"]),
    networkData: item["networkData"],
    networkDataContent: item["networkDataContent"],
    placementHints: !item["placementHints"]
      ? item["placementHints"]
      : virtualMachinePlacementHintArraySerializer(item["placementHints"]),
    sshPublicKeys: !item["sshPublicKeys"]
      ? item["sshPublicKeys"]
      : sshPublicKeyArraySerializer(item["sshPublicKeys"]),
    storageProfile: storageProfileSerializer(item["storageProfile"]),
    userData: item["userData"],
    userDataContent: item["userDataContent"],
    virtioInterface: item["virtioInterface"],
    vmDeviceModel: item["vmDeviceModel"],
    vmImage: item["vmImage"],
    vmImageRepositoryCredentials: !item["vmImageRepositoryCredentials"]
      ? item["vmImageRepositoryCredentials"]
      : imageRepositoryCredentialsSerializer(item["vmImageRepositoryCredentials"]),
    consoleExtendedLocation: !item["consoleExtendedLocation"]
      ? item["consoleExtendedLocation"]
      : extendedLocationSerializer(item["consoleExtendedLocation"]),
  };
}

export function virtualMachinePropertiesDeserializer(item: any): VirtualMachineProperties {
  return {
    adminUsername: item["adminUsername"],
    bootMethod: item["bootMethod"],
    cloudServicesNetworkAttachment: networkAttachmentDeserializer(
      item["cloudServicesNetworkAttachment"],
    ),
    cpuCores: item["cpuCores"],
    isolateEmulatorThread: item["isolateEmulatorThread"],
    memorySizeGB: item["memorySizeGB"],
    networkAttachments: !item["networkAttachments"]
      ? item["networkAttachments"]
      : networkAttachmentArrayDeserializer(item["networkAttachments"]),
    networkData: item["networkData"],
    networkDataContent: item["networkDataContent"],
    placementHints: !item["placementHints"]
      ? item["placementHints"]
      : virtualMachinePlacementHintArrayDeserializer(item["placementHints"]),
    sshPublicKeys: !item["sshPublicKeys"]
      ? item["sshPublicKeys"]
      : sshPublicKeyArrayDeserializer(item["sshPublicKeys"]),
    storageProfile: storageProfileDeserializer(item["storageProfile"]),
    userData: item["userData"],
    userDataContent: item["userDataContent"],
    virtioInterface: item["virtioInterface"],
    vmDeviceModel: item["vmDeviceModel"],
    vmImage: item["vmImage"],
    vmImageRepositoryCredentials: !item["vmImageRepositoryCredentials"]
      ? item["vmImageRepositoryCredentials"]
      : imageRepositoryCredentialsDeserializer(item["vmImageRepositoryCredentials"]),
    availabilityZone: item["availabilityZone"],
    bareMetalMachineId: item["bareMetalMachineId"],
    clusterId: item["clusterId"],
    consoleExtendedLocation: !item["consoleExtendedLocation"]
      ? item["consoleExtendedLocation"]
      : extendedLocationDeserializer(item["consoleExtendedLocation"]),
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    powerState: item["powerState"],
    volumes: !item["volumes"]
      ? item["volumes"]
      : item["volumes"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** Selects the boot method for the virtual machine. */
export enum KnownVirtualMachineBootMethod {
  /** BIOS boot mode. */
  Bios = "BIOS",
  /** UEFI boot mode. */
  Uefi = "UEFI",
}

/**
 * Selects the boot method for the virtual machine. \
 * {@link KnownVirtualMachineBootMethod} can be used interchangeably with VirtualMachineBootMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BIOS**: BIOS boot mode. \
 * **UEFI**: UEFI boot mode.
 */
export type VirtualMachineBootMethod = string;

/** Field Deprecated, the value will be ignored if provided. The indicator of whether one of the specified CPU cores is isolated to run the emulator thread for this virtual machine. */
export enum KnownVirtualMachineIsolateEmulatorThread {
  /** Do not isolate the emulator thread. */
  False = "False",
  /** Isolate the emulator thread. */
  True = "True",
}

/**
 * Field Deprecated, the value will be ignored if provided. The indicator of whether one of the specified CPU cores is isolated to run the emulator thread for this virtual machine. \
 * {@link KnownVirtualMachineIsolateEmulatorThread} can be used interchangeably with VirtualMachineIsolateEmulatorThread,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **False**: Do not isolate the emulator thread. \
 * **True**: Isolate the emulator thread.
 */
export type VirtualMachineIsolateEmulatorThread = string;

export function virtualMachinePlacementHintArraySerializer(
  result: Array<VirtualMachinePlacementHint>,
): any[] {
  return result.map((item) => {
    return virtualMachinePlacementHintSerializer(item);
  });
}

export function virtualMachinePlacementHintArrayDeserializer(
  result: Array<VirtualMachinePlacementHint>,
): any[] {
  return result.map((item) => {
    return virtualMachinePlacementHintDeserializer(item);
  });
}

/** VirtualMachinePlacementHint represents a single scheduling hint of the virtual machine. */
export interface VirtualMachinePlacementHint {
  /** The specification of whether this hint supports affinity or anti-affinity with the referenced resources. */
  hintType: VirtualMachinePlacementHintType;
  /** The resource ID of the target object that the placement hints will be checked against, e.g., the bare metal node to host the virtual machine. */
  resourceId: string;
  /** The indicator of whether the hint is a hard or soft requirement during scheduling. */
  schedulingExecution: VirtualMachineSchedulingExecution;
  /** The scope for the virtual machine affinity or anti-affinity placement hint. It should always be "Machine" in the case of node affinity. */
  scope: VirtualMachinePlacementHintPodAffinityScope;
}

export function virtualMachinePlacementHintSerializer(item: VirtualMachinePlacementHint): any {
  return {
    hintType: item["hintType"],
    resourceId: item["resourceId"],
    schedulingExecution: item["schedulingExecution"],
    scope: item["scope"],
  };
}

export function virtualMachinePlacementHintDeserializer(item: any): VirtualMachinePlacementHint {
  return {
    hintType: item["hintType"],
    resourceId: item["resourceId"],
    schedulingExecution: item["schedulingExecution"],
    scope: item["scope"],
  };
}

/** The specification of whether this hint supports affinity or anti-affinity with the referenced resources. */
export enum KnownVirtualMachinePlacementHintType {
  /** The virtual machine has affinity with the referenced resources. */
  Affinity = "Affinity",
  /** The virtual machine has anti-affinity with the referenced resources. */
  AntiAffinity = "AntiAffinity",
}

/**
 * The specification of whether this hint supports affinity or anti-affinity with the referenced resources. \
 * {@link KnownVirtualMachinePlacementHintType} can be used interchangeably with VirtualMachinePlacementHintType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Affinity**: The virtual machine has affinity with the referenced resources. \
 * **AntiAffinity**: The virtual machine has anti-affinity with the referenced resources.
 */
export type VirtualMachinePlacementHintType = string;

/** The indicator of whether the hint is a hard or soft requirement during scheduling. */
export enum KnownVirtualMachineSchedulingExecution {
  /** The hint is a requirement during scheduling. */
  Hard = "Hard",
  /** The hint is applied using a best-effort approach during scheduling. */
  Soft = "Soft",
}

/**
 * The indicator of whether the hint is a hard or soft requirement during scheduling. \
 * {@link KnownVirtualMachineSchedulingExecution} can be used interchangeably with VirtualMachineSchedulingExecution,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Hard**: The hint is a requirement during scheduling. \
 * **Soft**: The hint is applied using a best-effort approach during scheduling.
 */
export type VirtualMachineSchedulingExecution = string;

/** The scope for the virtual machine affinity or anti-affinity placement hint. It should always be "Machine" in the case of node affinity. */
export enum KnownVirtualMachinePlacementHintPodAffinityScope {
  /** The virtual machine placement hint is scoped to the bare metal machine. */
  Machine = "Machine",
  /** The virtual machine placement hint is scoped to the rack. */
  Rack = "Rack",
}

/**
 * The scope for the virtual machine affinity or anti-affinity placement hint. It should always be "Machine" in the case of node affinity. \
 * {@link KnownVirtualMachinePlacementHintPodAffinityScope} can be used interchangeably with VirtualMachinePlacementHintPodAffinityScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Machine**: The virtual machine placement hint is scoped to the bare metal machine. \
 * **Rack**: The virtual machine placement hint is scoped to the rack.
 */
export type VirtualMachinePlacementHintPodAffinityScope = string;

/** StorageProfile represents information about a disk. */
export interface StorageProfile {
  /** The disk to use with this virtual machine. */
  osDisk: OsDisk;
  /** The resource IDs of volumes that are requested to be attached to the virtual machine. */
  volumeAttachments?: string[];
}

export function storageProfileSerializer(item: StorageProfile): any {
  return {
    osDisk: osDiskSerializer(item["osDisk"]),
    volumeAttachments: !item["volumeAttachments"]
      ? item["volumeAttachments"]
      : item["volumeAttachments"].map((p: any) => {
          return p;
        }),
  };
}

export function storageProfileDeserializer(item: any): StorageProfile {
  return {
    osDisk: osDiskDeserializer(item["osDisk"]),
    volumeAttachments: !item["volumeAttachments"]
      ? item["volumeAttachments"]
      : item["volumeAttachments"].map((p: any) => {
          return p;
        }),
  };
}

/** OsDisk represents configuration of the boot disk. */
export interface OsDisk {
  /** The strategy for creating the OS disk. */
  createOption?: OsDiskCreateOption;
  /** The strategy for deleting the OS disk. */
  deleteOption?: OsDiskDeleteOption;
  /** The size of the disk. Required if the createOption is Ephemeral. Allocations are measured in gibibytes. */
  diskSizeGB: number;
}

export function osDiskSerializer(item: OsDisk): any {
  return {
    createOption: item["createOption"],
    deleteOption: item["deleteOption"],
    diskSizeGB: item["diskSizeGB"],
  };
}

export function osDiskDeserializer(item: any): OsDisk {
  return {
    createOption: item["createOption"],
    deleteOption: item["deleteOption"],
    diskSizeGB: item["diskSizeGB"],
  };
}

/** The strategy for creating the OS disk. */
export enum KnownOsDiskCreateOption {
  /** The Os Disk will be created on ephemeral storage. */
  Ephemeral = "Ephemeral",
  /** The Os Disk is on persistent storage. */
  Persistent = "Persistent",
}

/**
 * The strategy for creating the OS disk. \
 * {@link KnownOsDiskCreateOption} can be used interchangeably with OsDiskCreateOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ephemeral**: The Os Disk will be created on ephemeral storage. \
 * **Persistent**: The Os Disk is on persistent storage.
 */
export type OsDiskCreateOption = string;

/** The strategy for deleting the OS disk. */
export enum KnownOsDiskDeleteOption {
  /** The Os Disk will be deleted when the virtual machine is deleted. */
  Delete = "Delete",
}

/**
 * The strategy for deleting the OS disk. \
 * {@link KnownOsDiskDeleteOption} can be used interchangeably with OsDiskDeleteOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delete**: The Os Disk will be deleted when the virtual machine is deleted.
 */
export type OsDiskDeleteOption = string;

/** Field Deprecated, use virtualizationModel instead. The type of the virtio interface. */
export enum KnownVirtualMachineVirtioInterfaceType {
  /** Modern virtio interface. */
  Modern = "Modern",
  /** Transitional virtio interface. */
  Transitional = "Transitional",
}

/**
 * Field Deprecated, use virtualizationModel instead. The type of the virtio interface. \
 * {@link KnownVirtualMachineVirtioInterfaceType} can be used interchangeably with VirtualMachineVirtioInterfaceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Modern**: Modern virtio interface. \
 * **Transitional**: Transitional virtio interface.
 */
export type VirtualMachineVirtioInterfaceType = string;

/** The type of the device model to use. */
export enum KnownVirtualMachineDeviceModelType {
  /** The T1 device model. */
  T1 = "T1",
  /** The T2 device model. */
  T2 = "T2",
  /** The T3 device model. */
  T3 = "T3",
}

/**
 * The type of the device model to use. \
 * {@link KnownVirtualMachineDeviceModelType} can be used interchangeably with VirtualMachineDeviceModelType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **T1**: The T1 device model. \
 * **T2**: The T2 device model. \
 * **T3**: The T3 device model.
 */
export type VirtualMachineDeviceModelType = string;

/** ImageRepositoryCredentials represents the credentials used to login to the image repository. */
export interface ImageRepositoryCredentials {
  /** The password or token used to access an image in the target repository. */
  password: string;
  /** The URL of the authentication server used to validate the repository credentials. */
  registryUrl: string;
  /** The username used to access an image in the target repository. */
  username: string;
}

export function imageRepositoryCredentialsSerializer(item: ImageRepositoryCredentials): any {
  return {
    password: item["password"],
    registryUrl: item["registryUrl"],
    username: item["username"],
  };
}

export function imageRepositoryCredentialsDeserializer(item: any): ImageRepositoryCredentials {
  return {
    password: item["password"],
    registryUrl: item["registryUrl"],
    username: item["username"],
  };
}

/** The more detailed status of the virtual machine. */
export enum KnownVirtualMachineDetailedStatus {
  /** The Available status. */
  Available = "Available",
  /** The Error status. */
  Error = "Error",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
  /** The Running status. */
  Running = "Running",
  /** The Scheduling status. */
  Scheduling = "Scheduling",
  /** The Stopped status. */
  Stopped = "Stopped",
  /** The Terminating status. */
  Terminating = "Terminating",
  /** The Unknown status. */
  Unknown = "Unknown",
}

/**
 * The more detailed status of the virtual machine. \
 * {@link KnownVirtualMachineDetailedStatus} can be used interchangeably with VirtualMachineDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Available**: The Available status. \
 * **Error**: The Error status. \
 * **Provisioning**: The Provisioning status. \
 * **Running**: The Running status. \
 * **Scheduling**: The Scheduling status. \
 * **Stopped**: The Stopped status. \
 * **Terminating**: The Terminating status. \
 * **Unknown**: The Unknown status.
 */
export type VirtualMachineDetailedStatus = string;

/** The power state of the virtual machine. */
export enum KnownVirtualMachinePowerState {
  /** The virtual machine is powered off. */
  Off = "Off",
  /** The virtual machine is powered on. */
  On = "On",
  /** The virtual machine power state is unknown. */
  Unknown = "Unknown",
}

/**
 * The power state of the virtual machine. \
 * {@link KnownVirtualMachinePowerState} can be used interchangeably with VirtualMachinePowerState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Off**: The virtual machine is powered off. \
 * **On**: The virtual machine is powered on. \
 * **Unknown**: The virtual machine power state is unknown.
 */
export type VirtualMachinePowerState = string;

/** The provisioning state of the virtual machine. */
export enum KnownVirtualMachineProvisioningState {
  /** The Accepted status. */
  Accepted = "Accepted",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Failed status. */
  Failed = "Failed",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
  /** The Succeeded status. */
  Succeeded = "Succeeded",
}

/**
 * The provisioning state of the virtual machine. \
 * {@link KnownVirtualMachineProvisioningState} can be used interchangeably with VirtualMachineProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: The Accepted status. \
 * **Canceled**: The Canceled status. \
 * **Failed**: The Failed status. \
 * **Provisioning**: The Provisioning status. \
 * **Succeeded**: The Succeeded status.
 */
export type VirtualMachineProvisioningState = string;

/** VirtualMachinePatchParameters represents the body of the request to patch the virtual machine. */
export interface VirtualMachinePatchParameters {
  /** The identity for the resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The credentials used to login to the image repository that has access to the specified image. */
  vmImageRepositoryCredentials?: ImageRepositoryCredentials;
}

export function virtualMachinePatchParametersSerializer(item: VirtualMachinePatchParameters): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, ["vmImageRepositoryCredentials"])
      ? undefined
      : _virtualMachinePatchParametersPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** VirtualMachinePatchProperties represents the properties of the virtual machine that can be patched. */
export interface VirtualMachinePatchProperties {
  /** The credentials used to login to the image repository that has access to the specified image. */
  vmImageRepositoryCredentials?: ImageRepositoryCredentials;
}

export function virtualMachinePatchPropertiesSerializer(item: VirtualMachinePatchProperties): any {
  return {
    vmImageRepositoryCredentials: !item["vmImageRepositoryCredentials"]
      ? item["vmImageRepositoryCredentials"]
      : imageRepositoryCredentialsSerializer(item["vmImageRepositoryCredentials"]),
  };
}

/** VirtualMachineList represents a list of virtual machines. */
export interface _VirtualMachineList {
  /** The VirtualMachine items on this page */
  value: VirtualMachine[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualMachineListDeserializer(item: any): _VirtualMachineList {
  return {
    value: virtualMachineArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualMachineArraySerializer(result: Array<VirtualMachine>): any[] {
  return result.map((item) => {
    return virtualMachineSerializer(item);
  });
}

export function virtualMachineArrayDeserializer(result: Array<VirtualMachine>): any[] {
  return result.map((item) => {
    return virtualMachineDeserializer(item);
  });
}

/** VirtualMachineAssignRelayParameters represents the body of the request to update the relay used for a Microsoft.HybridCompute machine associated with the virtual machine. */
export interface VirtualMachineAssignRelayParameters {
  /** The resourceId of the Microsoft.HybridCompute machine resource to assign relay usage. */
  machineId: string;
  /** The indicator of which relay type the machine should be assigned to use. Platform indicates the use of a platform-dedicated relay. Public indicates the use of the standard public relay for Arc services. */
  relayType?: RelayType;
}

export function virtualMachineAssignRelayParametersSerializer(
  item: VirtualMachineAssignRelayParameters,
): any {
  return { machineId: item["machineId"], relayType: item["relayType"] };
}

/** The indicator of which relay type the machine should be assigned to use. Platform indicates the use of a platform-dedicated relay. Public indicates the use of the standard public relay for Arc services. */
export enum KnownRelayType {
  /** Utilize the platform-dedicated relay for Arc services. */
  Platform = "Platform",
  /** Utilize the standard public relay for Arc services. */
  Public = "Public",
}

/**
 * The indicator of which relay type the machine should be assigned to use. Platform indicates the use of a platform-dedicated relay. Public indicates the use of the standard public relay for Arc services. \
 * {@link KnownRelayType} can be used interchangeably with RelayType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Platform**: Utilize the platform-dedicated relay for Arc services. \
 * **Public**: Utilize the standard public relay for Arc services.
 */
export type RelayType = string;

/** VirtualMachinePowerOffParameters represents the body of the request to power off virtual machine. */
export interface VirtualMachinePowerOffParameters {
  /** The indicator of whether to skip the graceful OS shutdown and power off the virtual machine immediately. */
  skipShutdown?: SkipShutdown;
}

export function virtualMachinePowerOffParametersSerializer(
  item: VirtualMachinePowerOffParameters,
): any {
  return { skipShutdown: item["skipShutdown"] };
}

/** The indicator of whether to skip the graceful OS shutdown and power off the virtual machine immediately. */
export enum KnownSkipShutdown {
  /** Skip the graceful OS shutdown and power off the virtual machine immediately. */
  True = "True",
  /** Do not skip the graceful OS shutdown. */
  False = "False",
}

/**
 * The indicator of whether to skip the graceful OS shutdown and power off the virtual machine immediately. \
 * {@link KnownSkipShutdown} can be used interchangeably with SkipShutdown,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: Skip the graceful OS shutdown and power off the virtual machine immediately. \
 * **False**: Do not skip the graceful OS shutdown.
 */
export type SkipShutdown = string;

/** Volume represents storage made available for use by resources running on the cluster. */
export interface Volume extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The extended location of the resource. This property is required when creating the resource. */
  extendedLocation: ExtendedLocation;
  /** The requested storage allocation for the volume in Mebibytes. */
  sizeMiB: number;
  /** The resource ID of the storage appliance that hosts the volume. */
  storageApplianceId?: string;
  /** The allocated size of the volume in Mebibytes. */
  readonly allocatedSizeMiB?: number;
  /** The assigned resource ID of the storage appliance that hosts the volume. */
  readonly assignedStorageApplianceId?: string;
  /** The list of resource IDs that attach the volume. It may include virtual machines and Hybrid AKS clusters. */
  readonly attachedTo?: string[];
  /** The more detailed status of the volume. */
  readonly detailedStatus?: VolumeDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The unique identifier of the volume. */
  readonly serialNumber?: string;
  /** The provisioning state of the volume. */
  readonly provisioningState?: VolumeProvisioningState;
}

export function volumeSerializer(item: Volume): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _volumePropertiesSerializer(item),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function volumeDeserializer(item: any): Volume {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._volumePropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** VolumeProperties represents properties of the volume resource. */
export interface VolumeProperties {
  /** The requested storage allocation for the volume in Mebibytes. */
  sizeMiB: number;
  /** The resource ID of the storage appliance that hosts the volume. */
  storageApplianceId?: string;
  /** The allocated size of the volume in Mebibytes. */
  readonly allocatedSizeMiB?: number;
  /** The assigned resource ID of the storage appliance that hosts the volume. */
  readonly assignedStorageApplianceId?: string;
  /** The list of resource IDs that attach the volume. It may include virtual machines and Hybrid AKS clusters. */
  readonly attachedTo?: string[];
  /** The more detailed status of the volume. */
  readonly detailedStatus?: VolumeDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The unique identifier of the volume. */
  readonly serialNumber?: string;
  /** The provisioning state of the volume. */
  readonly provisioningState?: VolumeProvisioningState;
}

export function volumePropertiesSerializer(item: VolumeProperties): any {
  return { sizeMiB: item["sizeMiB"], storageApplianceId: item["storageApplianceId"] };
}

export function volumePropertiesDeserializer(item: any): VolumeProperties {
  return {
    sizeMiB: item["sizeMiB"],
    storageApplianceId: item["storageApplianceId"],
    allocatedSizeMiB: item["allocatedSizeMiB"],
    assignedStorageApplianceId: item["assignedStorageApplianceId"],
    attachedTo: !item["attachedTo"]
      ? item["attachedTo"]
      : item["attachedTo"].map((p: any) => {
          return p;
        }),
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    serialNumber: item["serialNumber"],
    provisioningState: item["provisioningState"],
  };
}

/** The more detailed status of the volume. */
export enum KnownVolumeDetailedStatus {
  /** The Active status. */
  Active = "Active",
  /** The Error status. */
  Error = "Error",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
}

/**
 * The more detailed status of the volume. \
 * {@link KnownVolumeDetailedStatus} can be used interchangeably with VolumeDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: The Active status. \
 * **Error**: The Error status. \
 * **Provisioning**: The Provisioning status.
 */
export type VolumeDetailedStatus = string;

/** The provisioning state of the volume. */
export enum KnownVolumeProvisioningState {
  /** The Accepted status. */
  Accepted = "Accepted",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Failed status. */
  Failed = "Failed",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
  /** The Succeeded status. */
  Succeeded = "Succeeded",
}

/**
 * The provisioning state of the volume. \
 * {@link KnownVolumeProvisioningState} can be used interchangeably with VolumeProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: The Accepted status. \
 * **Canceled**: The Canceled status. \
 * **Failed**: The Failed status. \
 * **Provisioning**: The Provisioning status. \
 * **Succeeded**: The Succeeded status.
 */
export type VolumeProvisioningState = string;

/** VolumePatchParameters represents the body of the request to patch the volume resource. */
export interface VolumePatchParameters {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function volumePatchParametersSerializer(item: VolumePatchParameters): any {
  return { tags: item["tags"] };
}

/** VolumeList represents a list of volumes. */
export interface _VolumeList {
  /** The Volume items on this page */
  value: Volume[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _volumeListDeserializer(item: any): _VolumeList {
  return {
    value: volumeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function volumeArraySerializer(result: Array<Volume>): any[] {
  return result.map((item) => {
    return volumeSerializer(item);
  });
}

export function volumeArrayDeserializer(result: Array<Volume>): any[] {
  return result.map((item) => {
    return volumeDeserializer(item);
  });
}

/** BareMetalMachineKeySet represents the bare metal machine key set. */
export interface BareMetalMachineKeySet extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The extended location of the resource. This property is required when creating the resource. */
  extendedLocation: ExtendedLocation;
  /** The object ID of Azure Active Directory group that all users in the list must be in for access to be granted. Users that are not in the group will not have access. */
  azureGroupId: string;
  /** The date and time after which the users in this key set will be removed from the bare metal machines. */
  expiration: Date;
  /** The list of IP addresses of jump hosts with management network access from which a login will be allowed for the users. */
  jumpHostsAllowed: string[];
  /** The name of the group that users will be assigned to on the operating system of the machines. */
  osGroupName?: string;
  /** The access level allowed for the users in this key set. */
  privilegeLevel: BareMetalMachineKeySetPrivilegeLevel;
  /** The name of the access level to apply when the privilege level is set to Other. */
  privilegeLevelName?: string;
  /** The unique list of permitted users. */
  userList: KeySetUser[];
  /** The more detailed status of the key set. */
  readonly detailedStatus?: BareMetalMachineKeySetDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The last time this key set was validated. */
  readonly lastValidation?: Date;
  /** The status evaluation of each user. */
  readonly userListStatus?: KeySetUserStatus[];
  /** The provisioning state of the bare metal machine key set. */
  readonly provisioningState?: BareMetalMachineKeySetProvisioningState;
}

export function bareMetalMachineKeySetSerializer(item: BareMetalMachineKeySet): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _bareMetalMachineKeySetPropertiesSerializer(item),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function bareMetalMachineKeySetDeserializer(item: any): BareMetalMachineKeySet {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._bareMetalMachineKeySetPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** BareMetalMachineKeySetProperties represents the properties of bare metal machine key set. */
export interface BareMetalMachineKeySetProperties {
  /** The object ID of Azure Active Directory group that all users in the list must be in for access to be granted. Users that are not in the group will not have access. */
  azureGroupId: string;
  /** The date and time after which the users in this key set will be removed from the bare metal machines. */
  expiration: Date;
  /** The list of IP addresses of jump hosts with management network access from which a login will be allowed for the users. */
  jumpHostsAllowed: string[];
  /** The name of the group that users will be assigned to on the operating system of the machines. */
  osGroupName?: string;
  /** The access level allowed for the users in this key set. */
  privilegeLevel: BareMetalMachineKeySetPrivilegeLevel;
  /** The name of the access level to apply when the privilege level is set to Other. */
  privilegeLevelName?: string;
  /** The unique list of permitted users. */
  userList: KeySetUser[];
  /** The more detailed status of the key set. */
  readonly detailedStatus?: BareMetalMachineKeySetDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The last time this key set was validated. */
  readonly lastValidation?: Date;
  /** The status evaluation of each user. */
  readonly userListStatus?: KeySetUserStatus[];
  /** The provisioning state of the bare metal machine key set. */
  readonly provisioningState?: BareMetalMachineKeySetProvisioningState;
}

export function bareMetalMachineKeySetPropertiesSerializer(
  item: BareMetalMachineKeySetProperties,
): any {
  return {
    azureGroupId: item["azureGroupId"],
    expiration: item["expiration"].toISOString(),
    jumpHostsAllowed: item["jumpHostsAllowed"].map((p: any) => {
      return p;
    }),
    osGroupName: item["osGroupName"],
    privilegeLevel: item["privilegeLevel"],
    privilegeLevelName: item["privilegeLevelName"],
    userList: keySetUserArraySerializer(item["userList"]),
  };
}

export function bareMetalMachineKeySetPropertiesDeserializer(
  item: any,
): BareMetalMachineKeySetProperties {
  return {
    azureGroupId: item["azureGroupId"],
    expiration: new Date(item["expiration"]),
    jumpHostsAllowed: item["jumpHostsAllowed"].map((p: any) => {
      return p;
    }),
    osGroupName: item["osGroupName"],
    privilegeLevel: item["privilegeLevel"],
    privilegeLevelName: item["privilegeLevelName"],
    userList: keySetUserArrayDeserializer(item["userList"]),
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    lastValidation: !item["lastValidation"]
      ? item["lastValidation"]
      : new Date(item["lastValidation"]),
    userListStatus: !item["userListStatus"]
      ? item["userListStatus"]
      : keySetUserStatusArrayDeserializer(item["userListStatus"]),
    provisioningState: item["provisioningState"],
  };
}

/** The access level allowed for the users in this key set. */
export enum KnownBareMetalMachineKeySetPrivilegeLevel {
  /** Standard access level. */
  Standard = "Standard",
  /** Superuser access level. */
  Superuser = "Superuser",
  /** Other access level. */
  Other = "Other",
}

/**
 * The access level allowed for the users in this key set. \
 * {@link KnownBareMetalMachineKeySetPrivilegeLevel} can be used interchangeably with BareMetalMachineKeySetPrivilegeLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**: Standard access level. \
 * **Superuser**: Superuser access level. \
 * **Other**: Other access level.
 */
export type BareMetalMachineKeySetPrivilegeLevel = string;

export function keySetUserArraySerializer(result: Array<KeySetUser>): any[] {
  return result.map((item) => {
    return keySetUserSerializer(item);
  });
}

export function keySetUserArrayDeserializer(result: Array<KeySetUser>): any[] {
  return result.map((item) => {
    return keySetUserDeserializer(item);
  });
}

/** KeySetUser represents the properties of the user in the key set. */
export interface KeySetUser {
  /** The user name that will be used for access. */
  azureUserName: string;
  /** The free-form description for this user. */
  description?: string;
  /** The SSH public key that will be provisioned for user access. The user is expected to have the corresponding SSH private key for logging in. */
  sshPublicKey: SshPublicKey;
  /** The user principal name (email format) used to validate this user's group membership. */
  userPrincipalName?: string;
}

export function keySetUserSerializer(item: KeySetUser): any {
  return {
    azureUserName: item["azureUserName"],
    description: item["description"],
    sshPublicKey: sshPublicKeySerializer(item["sshPublicKey"]),
    userPrincipalName: item["userPrincipalName"],
  };
}

export function keySetUserDeserializer(item: any): KeySetUser {
  return {
    azureUserName: item["azureUserName"],
    description: item["description"],
    sshPublicKey: sshPublicKeyDeserializer(item["sshPublicKey"]),
    userPrincipalName: item["userPrincipalName"],
  };
}

/** The more detailed status of the key set. */
export enum KnownBareMetalMachineKeySetDetailedStatus {
  /** All users in the key set are active. */
  AllActive = "AllActive",
  /** Some users in the key set are invalid. */
  SomeInvalid = "SomeInvalid",
  /** All users in the key set are invalid. */
  AllInvalid = "AllInvalid",
  /** Key set is being validated. */
  Validating = "Validating",
}

/**
 * The more detailed status of the key set. \
 * {@link KnownBareMetalMachineKeySetDetailedStatus} can be used interchangeably with BareMetalMachineKeySetDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AllActive**: All users in the key set are active. \
 * **SomeInvalid**: Some users in the key set are invalid. \
 * **AllInvalid**: All users in the key set are invalid. \
 * **Validating**: Key set is being validated.
 */
export type BareMetalMachineKeySetDetailedStatus = string;

export function keySetUserStatusArrayDeserializer(result: Array<KeySetUserStatus>): any[] {
  return result.map((item) => {
    return keySetUserStatusDeserializer(item);
  });
}

/** KeySetUserStatus represents the status of the key set user. */
export interface KeySetUserStatus {
  /** The user name that will be used for access. */
  readonly azureUserName?: string;
  /** The indicator of whether the user is currently deployed for access. */
  readonly status?: BareMetalMachineKeySetUserSetupStatus;
  /** The additional information describing the current status of this user, if any available. */
  readonly statusMessage?: string;
}

export function keySetUserStatusDeserializer(item: any): KeySetUserStatus {
  return {
    azureUserName: item["azureUserName"],
    status: item["status"],
    statusMessage: item["statusMessage"],
  };
}

/** The indicator of whether the user is currently deployed for access. */
export enum KnownBareMetalMachineKeySetUserSetupStatus {
  /** The user is currently active. */
  Active = "Active",
  /** The user is not valid and has no access. */
  Invalid = "Invalid",
}

/**
 * The indicator of whether the user is currently deployed for access. \
 * {@link KnownBareMetalMachineKeySetUserSetupStatus} can be used interchangeably with BareMetalMachineKeySetUserSetupStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: The user is currently active. \
 * **Invalid**: The user is not valid and has no access.
 */
export type BareMetalMachineKeySetUserSetupStatus = string;

/** The provisioning state of the bare metal machine key set. */
export enum KnownBareMetalMachineKeySetProvisioningState {
  /** The Succeeded status. */
  Succeeded = "Succeeded",
  /** The Failed status. */
  Failed = "Failed",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Accepted status. */
  Accepted = "Accepted",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
}

/**
 * The provisioning state of the bare metal machine key set. \
 * {@link KnownBareMetalMachineKeySetProvisioningState} can be used interchangeably with BareMetalMachineKeySetProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The Succeeded status. \
 * **Failed**: The Failed status. \
 * **Canceled**: The Canceled status. \
 * **Accepted**: The Accepted status. \
 * **Provisioning**: The Provisioning status.
 */
export type BareMetalMachineKeySetProvisioningState = string;

/** BareMetalMachineKeySetPatchParameters represents the body of the request to patch the bare metal machine key set. */
export interface BareMetalMachineKeySetPatchParameters {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The date and time after which the users in this key set will be removed from the bare metal machines. */
  expiration?: Date;
  /** The list of IP addresses of jump hosts with management network access from which a login will be allowed for the users. */
  jumpHostsAllowed?: string[];
  /** The unique list of permitted users. */
  userList?: KeySetUser[];
}

export function bareMetalMachineKeySetPatchParametersSerializer(
  item: BareMetalMachineKeySetPatchParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, ["expiration", "jumpHostsAllowed", "userList"])
      ? undefined
      : _bareMetalMachineKeySetPatchParametersPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** BareMetalMachineKeySetPatchProperties represents the properties of bare metal machine key set that can be patched. */
export interface BareMetalMachineKeySetPatchProperties {
  /** The date and time after which the users in this key set will be removed from the bare metal machines. */
  expiration?: Date;
  /** The list of IP addresses of jump hosts with management network access from which a login will be allowed for the users. */
  jumpHostsAllowed?: string[];
  /** The unique list of permitted users. */
  userList?: KeySetUser[];
}

export function bareMetalMachineKeySetPatchPropertiesSerializer(
  item: BareMetalMachineKeySetPatchProperties,
): any {
  return {
    expiration: !item["expiration"] ? item["expiration"] : item["expiration"].toISOString(),
    jumpHostsAllowed: !item["jumpHostsAllowed"]
      ? item["jumpHostsAllowed"]
      : item["jumpHostsAllowed"].map((p: any) => {
          return p;
        }),
    userList: !item["userList"] ? item["userList"] : keySetUserArraySerializer(item["userList"]),
  };
}

/** BareMetalMachineKeySetList represents a list of bare metal machine key sets. */
export interface _BareMetalMachineKeySetList {
  /** The BareMetalMachineKeySet items on this page */
  value: BareMetalMachineKeySet[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _bareMetalMachineKeySetListDeserializer(item: any): _BareMetalMachineKeySetList {
  return {
    value: bareMetalMachineKeySetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function bareMetalMachineKeySetArraySerializer(
  result: Array<BareMetalMachineKeySet>,
): any[] {
  return result.map((item) => {
    return bareMetalMachineKeySetSerializer(item);
  });
}

export function bareMetalMachineKeySetArrayDeserializer(
  result: Array<BareMetalMachineKeySet>,
): any[] {
  return result.map((item) => {
    return bareMetalMachineKeySetDeserializer(item);
  });
}

/** BmcKeySet represents the baseboard management controller key set. */
export interface BmcKeySet extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The extended location of the resource. This property is required when creating the resource. */
  extendedLocation: ExtendedLocation;
  /** The object ID of Azure Active Directory group that all users in the list must be in for access to be granted. Users that are not in the group will not have access. */
  azureGroupId: string;
  /** The date and time after which the users in this key set will be removed from the baseboard management controllers. */
  expiration: Date;
  /** The access level allowed for the users in this key set. */
  privilegeLevel: BmcKeySetPrivilegeLevel;
  /** The unique list of permitted users. */
  userList: KeySetUser[];
  /** The more detailed status of the key set. */
  readonly detailedStatus?: BmcKeySetDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The last time this key set was validated. */
  readonly lastValidation?: Date;
  /** The status evaluation of each user. */
  readonly userListStatus?: KeySetUserStatus[];
  /** The provisioning state of the baseboard management controller key set. */
  readonly provisioningState?: BmcKeySetProvisioningState;
}

export function bmcKeySetSerializer(item: BmcKeySet): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _bmcKeySetPropertiesSerializer(item),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function bmcKeySetDeserializer(item: any): BmcKeySet {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._bmcKeySetPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** BmcKeySetProperties represents the properties of baseboard management controller key set. */
export interface BmcKeySetProperties {
  /** The object ID of Azure Active Directory group that all users in the list must be in for access to be granted. Users that are not in the group will not have access. */
  azureGroupId: string;
  /** The date and time after which the users in this key set will be removed from the baseboard management controllers. */
  expiration: Date;
  /** The access level allowed for the users in this key set. */
  privilegeLevel: BmcKeySetPrivilegeLevel;
  /** The unique list of permitted users. */
  userList: KeySetUser[];
  /** The more detailed status of the key set. */
  readonly detailedStatus?: BmcKeySetDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The last time this key set was validated. */
  readonly lastValidation?: Date;
  /** The status evaluation of each user. */
  readonly userListStatus?: KeySetUserStatus[];
  /** The provisioning state of the baseboard management controller key set. */
  readonly provisioningState?: BmcKeySetProvisioningState;
}

export function bmcKeySetPropertiesSerializer(item: BmcKeySetProperties): any {
  return {
    azureGroupId: item["azureGroupId"],
    expiration: item["expiration"].toISOString(),
    privilegeLevel: item["privilegeLevel"],
    userList: keySetUserArraySerializer(item["userList"]),
  };
}

export function bmcKeySetPropertiesDeserializer(item: any): BmcKeySetProperties {
  return {
    azureGroupId: item["azureGroupId"],
    expiration: new Date(item["expiration"]),
    privilegeLevel: item["privilegeLevel"],
    userList: keySetUserArrayDeserializer(item["userList"]),
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    lastValidation: !item["lastValidation"]
      ? item["lastValidation"]
      : new Date(item["lastValidation"]),
    userListStatus: !item["userListStatus"]
      ? item["userListStatus"]
      : keySetUserStatusArrayDeserializer(item["userListStatus"]),
    provisioningState: item["provisioningState"],
  };
}

/** The access level allowed for the users in this key set. */
export enum KnownBmcKeySetPrivilegeLevel {
  /** ReadOnly privilege level */
  ReadOnly = "ReadOnly",
  /** Administrator privilege level */
  Administrator = "Administrator",
}

/**
 * The access level allowed for the users in this key set. \
 * {@link KnownBmcKeySetPrivilegeLevel} can be used interchangeably with BmcKeySetPrivilegeLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ReadOnly**: ReadOnly privilege level \
 * **Administrator**: Administrator privilege level
 */
export type BmcKeySetPrivilegeLevel = string;

/** The more detailed status of the key set. */
export enum KnownBmcKeySetDetailedStatus {
  /** The AllActive status. */
  AllActive = "AllActive",
  /** The SomeInvalid status. */
  SomeInvalid = "SomeInvalid",
  /** The AllInvalid status. */
  AllInvalid = "AllInvalid",
  /** The Validating status. */
  Validating = "Validating",
}

/**
 * The more detailed status of the key set. \
 * {@link KnownBmcKeySetDetailedStatus} can be used interchangeably with BmcKeySetDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AllActive**: The AllActive status. \
 * **SomeInvalid**: The SomeInvalid status. \
 * **AllInvalid**: The AllInvalid status. \
 * **Validating**: The Validating status.
 */
export type BmcKeySetDetailedStatus = string;

/** The provisioning state of the baseboard management controller key set. */
export enum KnownBmcKeySetProvisioningState {
  /** The Succeeded status. */
  Succeeded = "Succeeded",
  /** The Failed status. */
  Failed = "Failed",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Accepted status. */
  Accepted = "Accepted",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
}

/**
 * The provisioning state of the baseboard management controller key set. \
 * {@link KnownBmcKeySetProvisioningState} can be used interchangeably with BmcKeySetProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The Succeeded status. \
 * **Failed**: The Failed status. \
 * **Canceled**: The Canceled status. \
 * **Accepted**: The Accepted status. \
 * **Provisioning**: The Provisioning status.
 */
export type BmcKeySetProvisioningState = string;

/** BmcKeySetPatchParameters represents the body of the request to patch the baseboard management controller key set. */
export interface BmcKeySetPatchParameters {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The date and time after which the users in this key set will be removed from the baseboard management controllers. */
  expiration?: Date;
  /** The unique list of permitted users. */
  userList?: KeySetUser[];
}

export function bmcKeySetPatchParametersSerializer(item: BmcKeySetPatchParameters): any {
  return {
    properties: areAllPropsUndefined(item, ["expiration", "userList"])
      ? undefined
      : _bmcKeySetPatchParametersPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** BmcKeySetPatchProperties represents the properties of baseboard management controller key set that are patchable. */
export interface BmcKeySetPatchProperties {
  /** The date and time after which the users in this key set will be removed from the baseboard management controllers. */
  expiration?: Date;
  /** The unique list of permitted users. */
  userList?: KeySetUser[];
}

export function bmcKeySetPatchPropertiesSerializer(item: BmcKeySetPatchProperties): any {
  return {
    expiration: !item["expiration"] ? item["expiration"] : item["expiration"].toISOString(),
    userList: !item["userList"] ? item["userList"] : keySetUserArraySerializer(item["userList"]),
  };
}

/** BmcKeySetList represents a list of baseboard management controller key sets. */
export interface _BmcKeySetList {
  /** The BmcKeySet items on this page */
  value: BmcKeySet[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _bmcKeySetListDeserializer(item: any): _BmcKeySetList {
  return {
    value: bmcKeySetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function bmcKeySetArraySerializer(result: Array<BmcKeySet>): any[] {
  return result.map((item) => {
    return bmcKeySetSerializer(item);
  });
}

export function bmcKeySetArrayDeserializer(result: Array<BmcKeySet>): any[] {
  return result.map((item) => {
    return bmcKeySetDeserializer(item);
  });
}

/** AgentPool represents the agent pool of Kubernetes cluster. */
export interface AgentPool extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  extendedLocation?: ExtendedLocation;
  /** The administrator credentials to be used for the nodes in this agent pool. */
  administratorConfiguration?: AdministratorConfiguration;
  /** The configurations that will be applied to each agent in this agent pool. */
  agentOptions?: AgentOptions;
  /** The configuration of networks being attached to the agent pool for use by the workloads that run on this Kubernetes cluster. */
  attachedNetworkConfiguration?: AttachedNetworkConfiguration;
  /** The list of availability zones of the Network Cloud cluster used for the provisioning of nodes in this agent pool. If not specified, all availability zones will be used. */
  availabilityZones?: string[];
  /** The number of virtual machines that use this configuration. */
  count: number;
  /** The labels applied to the nodes in this agent pool. */
  labels?: KubernetesLabel[];
  /** The selection of how this agent pool is utilized, either as a system pool or a user pool. System pools run the features and critical services for the Kubernetes Cluster, while user pools are dedicated to user workloads. Every Kubernetes cluster must contain at least one system node pool with at least one node. */
  mode: AgentPoolMode;
  /** The taints applied to the nodes in this agent pool. */
  taints?: KubernetesLabel[];
  /** The configuration of the agent pool. */
  upgradeSettings?: AgentPoolUpgradeSettings;
  /** The name of the VM SKU that determines the size of resources allocated for node VMs. */
  vmSkuName: string;
  /** The current status of the agent pool. */
  readonly detailedStatus?: AgentPoolDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The Kubernetes version running in this agent pool. */
  readonly kubernetesVersion?: string;
  /** The provisioning state of the agent pool. */
  readonly provisioningState?: AgentPoolProvisioningState;
}

export function agentPoolSerializer(item: AgentPool): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _agentPoolPropertiesSerializer(item),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function agentPoolDeserializer(item: any): AgentPool {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._agentPoolPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** AgentPoolProperties represents the properties of the Kubernetes cluster agent pool. */
export interface AgentPoolProperties {
  /** The administrator credentials to be used for the nodes in this agent pool. */
  administratorConfiguration?: AdministratorConfiguration;
  /** The configurations that will be applied to each agent in this agent pool. */
  agentOptions?: AgentOptions;
  /** The configuration of networks being attached to the agent pool for use by the workloads that run on this Kubernetes cluster. */
  attachedNetworkConfiguration?: AttachedNetworkConfiguration;
  /** The list of availability zones of the Network Cloud cluster used for the provisioning of nodes in this agent pool. If not specified, all availability zones will be used. */
  availabilityZones?: string[];
  /** The number of virtual machines that use this configuration. */
  count: number;
  /** The labels applied to the nodes in this agent pool. */
  labels?: KubernetesLabel[];
  /** The selection of how this agent pool is utilized, either as a system pool or a user pool. System pools run the features and critical services for the Kubernetes Cluster, while user pools are dedicated to user workloads. Every Kubernetes cluster must contain at least one system node pool with at least one node. */
  mode: AgentPoolMode;
  /** The taints applied to the nodes in this agent pool. */
  taints?: KubernetesLabel[];
  /** The configuration of the agent pool. */
  upgradeSettings?: AgentPoolUpgradeSettings;
  /** The name of the VM SKU that determines the size of resources allocated for node VMs. */
  vmSkuName: string;
  /** The current status of the agent pool. */
  readonly detailedStatus?: AgentPoolDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The Kubernetes version running in this agent pool. */
  readonly kubernetesVersion?: string;
  /** The provisioning state of the agent pool. */
  readonly provisioningState?: AgentPoolProvisioningState;
}

export function agentPoolPropertiesSerializer(item: AgentPoolProperties): any {
  return {
    administratorConfiguration: !item["administratorConfiguration"]
      ? item["administratorConfiguration"]
      : administratorConfigurationSerializer(item["administratorConfiguration"]),
    agentOptions: !item["agentOptions"]
      ? item["agentOptions"]
      : agentOptionsSerializer(item["agentOptions"]),
    attachedNetworkConfiguration: !item["attachedNetworkConfiguration"]
      ? item["attachedNetworkConfiguration"]
      : attachedNetworkConfigurationSerializer(item["attachedNetworkConfiguration"]),
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    count: item["count"],
    labels: !item["labels"] ? item["labels"] : kubernetesLabelArraySerializer(item["labels"]),
    mode: item["mode"],
    taints: !item["taints"] ? item["taints"] : kubernetesLabelArraySerializer(item["taints"]),
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsSerializer(item["upgradeSettings"]),
    vmSkuName: item["vmSkuName"],
  };
}

export function agentPoolPropertiesDeserializer(item: any): AgentPoolProperties {
  return {
    administratorConfiguration: !item["administratorConfiguration"]
      ? item["administratorConfiguration"]
      : administratorConfigurationDeserializer(item["administratorConfiguration"]),
    agentOptions: !item["agentOptions"]
      ? item["agentOptions"]
      : agentOptionsDeserializer(item["agentOptions"]),
    attachedNetworkConfiguration: !item["attachedNetworkConfiguration"]
      ? item["attachedNetworkConfiguration"]
      : attachedNetworkConfigurationDeserializer(item["attachedNetworkConfiguration"]),
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    count: item["count"],
    labels: !item["labels"] ? item["labels"] : kubernetesLabelArrayDeserializer(item["labels"]),
    mode: item["mode"],
    taints: !item["taints"] ? item["taints"] : kubernetesLabelArrayDeserializer(item["taints"]),
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsDeserializer(item["upgradeSettings"]),
    vmSkuName: item["vmSkuName"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    kubernetesVersion: item["kubernetesVersion"],
    provisioningState: item["provisioningState"],
  };
}

/** The current status of the agent pool. */
export enum KnownAgentPoolDetailedStatus {
  /** The Available status. */
  Available = "Available",
  /** The Error status. */
  Error = "Error",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
}

/**
 * The current status of the agent pool. \
 * {@link KnownAgentPoolDetailedStatus} can be used interchangeably with AgentPoolDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Available**: The Available status. \
 * **Error**: The Error status. \
 * **Provisioning**: The Provisioning status.
 */
export type AgentPoolDetailedStatus = string;

/** The provisioning state of the agent pool. */
export enum KnownAgentPoolProvisioningState {
  /** The Accepted status. */
  Accepted = "Accepted",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Deleting status. */
  Deleting = "Deleting",
  /** The Failed status. */
  Failed = "Failed",
  /** The InProgress status. */
  InProgress = "InProgress",
  /** The Succeeded status. */
  Succeeded = "Succeeded",
  /** The Updating status. */
  Updating = "Updating",
}

/**
 * The provisioning state of the agent pool. \
 * {@link KnownAgentPoolProvisioningState} can be used interchangeably with AgentPoolProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: The Accepted status. \
 * **Canceled**: The Canceled status. \
 * **Deleting**: The Deleting status. \
 * **Failed**: The Failed status. \
 * **InProgress**: The InProgress status. \
 * **Succeeded**: The Succeeded status. \
 * **Updating**: The Updating status.
 */
export type AgentPoolProvisioningState = string;

/** AgentPoolPatchParameters represents the body of the request to patch the Kubernetes cluster agent pool. */
export interface AgentPoolPatchParameters {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The configuration of administrator credentials for the control plane nodes. */
  administratorConfiguration?: NodePoolAdministratorConfigurationPatch;
  /** The number of virtual machines that use this configuration. */
  count?: number;
  /** The configuration of the agent pool. */
  upgradeSettings?: AgentPoolUpgradeSettings;
}

export function agentPoolPatchParametersSerializer(item: AgentPoolPatchParameters): any {
  return {
    properties: areAllPropsUndefined(item, [
      "administratorConfiguration",
      "count",
      "upgradeSettings",
    ])
      ? undefined
      : _agentPoolPatchParametersPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** AgentPoolPatchProperties represents the properties of an agent pool that can be modified. */
export interface AgentPoolPatchProperties {
  /** The configuration of administrator credentials for the control plane nodes. */
  administratorConfiguration?: NodePoolAdministratorConfigurationPatch;
  /** The number of virtual machines that use this configuration. */
  count?: number;
  /** The configuration of the agent pool. */
  upgradeSettings?: AgentPoolUpgradeSettings;
}

export function agentPoolPatchPropertiesSerializer(item: AgentPoolPatchProperties): any {
  return {
    administratorConfiguration: !item["administratorConfiguration"]
      ? item["administratorConfiguration"]
      : nodePoolAdministratorConfigurationPatchSerializer(item["administratorConfiguration"]),
    count: item["count"],
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsSerializer(item["upgradeSettings"]),
  };
}

/** NodePoolAdministratorConfigurationPatch represents the patching capabilities for the administrator configuration. */
export interface NodePoolAdministratorConfigurationPatch {
  /** SshPublicKey represents the public key used to authenticate with a resource through SSH. */
  sshPublicKeys?: SshPublicKey[];
}

export function nodePoolAdministratorConfigurationPatchSerializer(
  item: NodePoolAdministratorConfigurationPatch,
): any {
  return {
    sshPublicKeys: !item["sshPublicKeys"]
      ? item["sshPublicKeys"]
      : sshPublicKeyArraySerializer(item["sshPublicKeys"]),
  };
}

/** AgentPoolList represents a list of Kubernetes cluster agent pools. */
export interface _AgentPoolList {
  /** The AgentPool items on this page */
  value: AgentPool[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _agentPoolListDeserializer(item: any): _AgentPoolList {
  return {
    value: agentPoolArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function agentPoolArraySerializer(result: Array<AgentPool>): any[] {
  return result.map((item) => {
    return agentPoolSerializer(item);
  });
}

export function agentPoolArrayDeserializer(result: Array<AgentPool>): any[] {
  return result.map((item) => {
    return agentPoolDeserializer(item);
  });
}

/** KubernetesClusterFeature represents the feature of a Kubernetes cluster. */
export interface KubernetesClusterFeature extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The configured options for the feature. */
  options?: StringKeyValuePair[];
  /** The lifecycle indicator of the feature. */
  readonly availabilityLifecycle?: KubernetesClusterFeatureAvailabilityLifecycle;
  /** The detailed status of the feature. */
  readonly detailedStatus?: KubernetesClusterFeatureDetailedStatus;
  /** The descriptive message for the detailed status of the feature. */
  readonly detailedStatusMessage?: string;
  /** The indicator of if the feature is required or optional. Optional features may be deleted by the user, while required features are managed with the kubernetes cluster lifecycle. */
  readonly required?: KubernetesClusterFeatureRequired;
  /** The version of the feature. */
  readonly version?: string;
  /** The provisioning state of the Kubernetes cluster feature. */
  readonly provisioningState?: KubernetesClusterFeatureProvisioningState;
}

export function kubernetesClusterFeatureSerializer(item: KubernetesClusterFeature): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["options"])
      ? undefined
      : _kubernetesClusterFeaturePropertiesSerializer(item),
  };
}

export function kubernetesClusterFeatureDeserializer(item: any): KubernetesClusterFeature {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _kubernetesClusterFeaturePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** KubernetesClusterFeatureProperties represents the properties of a Kubernetes cluster feature. */
export interface KubernetesClusterFeatureProperties {
  /** The configured options for the feature. */
  options?: StringKeyValuePair[];
  /** The lifecycle indicator of the feature. */
  readonly availabilityLifecycle?: KubernetesClusterFeatureAvailabilityLifecycle;
  /** The detailed status of the feature. */
  readonly detailedStatus?: KubernetesClusterFeatureDetailedStatus;
  /** The descriptive message for the detailed status of the feature. */
  readonly detailedStatusMessage?: string;
  /** The indicator of if the feature is required or optional. Optional features may be deleted by the user, while required features are managed with the kubernetes cluster lifecycle. */
  readonly required?: KubernetesClusterFeatureRequired;
  /** The version of the feature. */
  readonly version?: string;
  /** The provisioning state of the Kubernetes cluster feature. */
  readonly provisioningState?: KubernetesClusterFeatureProvisioningState;
}

export function kubernetesClusterFeaturePropertiesSerializer(
  item: KubernetesClusterFeatureProperties,
): any {
  return {
    options: !item["options"]
      ? item["options"]
      : stringKeyValuePairArraySerializer(item["options"]),
  };
}

export function kubernetesClusterFeaturePropertiesDeserializer(
  item: any,
): KubernetesClusterFeatureProperties {
  return {
    options: !item["options"]
      ? item["options"]
      : stringKeyValuePairArrayDeserializer(item["options"]),
    availabilityLifecycle: item["availabilityLifecycle"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    required: item["required"],
    version: item["version"],
    provisioningState: item["provisioningState"],
  };
}

export function stringKeyValuePairArraySerializer(result: Array<StringKeyValuePair>): any[] {
  return result.map((item) => {
    return stringKeyValuePairSerializer(item);
  });
}

export function stringKeyValuePairArrayDeserializer(result: Array<StringKeyValuePair>): any[] {
  return result.map((item) => {
    return stringKeyValuePairDeserializer(item);
  });
}

/** StringKeyValuePair represents a single entry in a mapping of keys to values. */
export interface StringKeyValuePair {
  /** The key to the mapped value. */
  key: string;
  /** The value of the mapping key. */
  value: string;
}

export function stringKeyValuePairSerializer(item: StringKeyValuePair): any {
  return { key: item["key"], value: item["value"] };
}

export function stringKeyValuePairDeserializer(item: any): StringKeyValuePair {
  return {
    key: item["key"],
    value: item["value"],
  };
}

/** The lifecycle indicator of the feature. */
export enum KnownKubernetesClusterFeatureAvailabilityLifecycle {
  /** Preview availability */
  Preview = "Preview",
  /** Generally available */
  GenerallyAvailable = "GenerallyAvailable",
}

/**
 * The lifecycle indicator of the feature. \
 * {@link KnownKubernetesClusterFeatureAvailabilityLifecycle} can be used interchangeably with KubernetesClusterFeatureAvailabilityLifecycle,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Preview**: Preview availability \
 * **GenerallyAvailable**: Generally available
 */
export type KubernetesClusterFeatureAvailabilityLifecycle = string;

/** The detailed status of the feature. */
export enum KnownKubernetesClusterFeatureDetailedStatus {
  /** The Error status. */
  Error = "Error",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
  /** The Installed status. */
  Installed = "Installed",
}

/**
 * The detailed status of the feature. \
 * {@link KnownKubernetesClusterFeatureDetailedStatus} can be used interchangeably with KubernetesClusterFeatureDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Error**: The Error status. \
 * **Provisioning**: The Provisioning status. \
 * **Installed**: The Installed status.
 */
export type KubernetesClusterFeatureDetailedStatus = string;

/** The indicator of if the feature is required or optional. Optional features may be deleted by the user, while required features are managed with the kubernetes cluster lifecycle. */
export enum KnownKubernetesClusterFeatureRequired {
  /** A required feature. */
  True = "True",
  /** An optional feature. */
  False = "False",
}

/**
 * The indicator of if the feature is required or optional. Optional features may be deleted by the user, while required features are managed with the kubernetes cluster lifecycle. \
 * {@link KnownKubernetesClusterFeatureRequired} can be used interchangeably with KubernetesClusterFeatureRequired,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: A required feature. \
 * **False**: An optional feature.
 */
export type KubernetesClusterFeatureRequired = string;

/** The provisioning state of the Kubernetes cluster feature. */
export enum KnownKubernetesClusterFeatureProvisioningState {
  /** The Accepted status. */
  Accepted = "Accepted",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Deleting status. */
  Deleting = "Deleting",
  /** The Failed status. */
  Failed = "Failed",
  /** The Succeeded status. */
  Succeeded = "Succeeded",
  /** The Updating status. */
  Updating = "Updating",
}

/**
 * The provisioning state of the Kubernetes cluster feature. \
 * {@link KnownKubernetesClusterFeatureProvisioningState} can be used interchangeably with KubernetesClusterFeatureProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: The Accepted status. \
 * **Canceled**: The Canceled status. \
 * **Deleting**: The Deleting status. \
 * **Failed**: The Failed status. \
 * **Succeeded**: The Succeeded status. \
 * **Updating**: The Updating status.
 */
export type KubernetesClusterFeatureProvisioningState = string;

/** KubernetesClusterFeaturePatchParameters represents the body of the request to patch the Kubernetes cluster feature. */
export interface KubernetesClusterFeaturePatchParameters {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The configured options for the feature. */
  options?: StringKeyValuePair[];
}

export function kubernetesClusterFeaturePatchParametersSerializer(
  item: KubernetesClusterFeaturePatchParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, ["options"])
      ? undefined
      : _kubernetesClusterFeaturePatchParametersPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** KubernetesClusterFeaturePatchProperties represents the Kubernetes cluster feature properties for patching. */
export interface KubernetesClusterFeaturePatchProperties {
  /** The configured options for the feature. */
  options?: StringKeyValuePair[];
}

export function kubernetesClusterFeaturePatchPropertiesSerializer(
  item: KubernetesClusterFeaturePatchProperties,
): any {
  return {
    options: !item["options"]
      ? item["options"]
      : stringKeyValuePairArraySerializer(item["options"]),
  };
}

/** KubernetesClusterFeatureList represents the list of Kubernetes cluster feature resources. */
export interface _KubernetesClusterFeatureList {
  /** The KubernetesClusterFeature items on this page */
  value: KubernetesClusterFeature[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _kubernetesClusterFeatureListDeserializer(
  item: any,
): _KubernetesClusterFeatureList {
  return {
    value: kubernetesClusterFeatureArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function kubernetesClusterFeatureArraySerializer(
  result: Array<KubernetesClusterFeature>,
): any[] {
  return result.map((item) => {
    return kubernetesClusterFeatureSerializer(item);
  });
}

export function kubernetesClusterFeatureArrayDeserializer(
  result: Array<KubernetesClusterFeature>,
): any[] {
  return result.map((item) => {
    return kubernetesClusterFeatureDeserializer(item);
  });
}

/** Console represents the console of an on-premises Network Cloud virtual machine. */
export interface Console extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The extended location of the resource. This property is required when creating the resource. */
  extendedLocation: ExtendedLocation;
  /** The indicator of whether the console access is enabled. */
  enabled: ConsoleEnabled;
  /** The date and time after which the key will be disallowed access. */
  expiration?: Date;
  /** The SSH public key that will be provisioned for user access. The user is expected to have the corresponding SSH private key for logging in. */
  sshPublicKey: SshPublicKey;
  /** The more detailed status of the console. */
  readonly detailedStatus?: ConsoleDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The resource ID of the private link service that is used to provide virtual machine console access. */
  readonly privateLinkServiceId?: string;
  /** The unique identifier for the virtual machine that is used to access the console. */
  readonly virtualMachineAccessId?: string;
  /** The provisioning state of the virtual machine console. */
  readonly provisioningState?: ConsoleProvisioningState;
}

export function consoleSerializer(item: Console): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _consolePropertiesSerializer(item),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function consoleDeserializer(item: any): Console {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._consolePropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** ConsoleProperties represents the properties of the virtual machine console. */
export interface ConsoleProperties {
  /** The indicator of whether the console access is enabled. */
  enabled: ConsoleEnabled;
  /** The date and time after which the key will be disallowed access. */
  expiration?: Date;
  /** The SSH public key that will be provisioned for user access. The user is expected to have the corresponding SSH private key for logging in. */
  sshPublicKey: SshPublicKey;
  /** The more detailed status of the console. */
  readonly detailedStatus?: ConsoleDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The resource ID of the private link service that is used to provide virtual machine console access. */
  readonly privateLinkServiceId?: string;
  /** The unique identifier for the virtual machine that is used to access the console. */
  readonly virtualMachineAccessId?: string;
  /** The provisioning state of the virtual machine console. */
  readonly provisioningState?: ConsoleProvisioningState;
}

export function consolePropertiesSerializer(item: ConsoleProperties): any {
  return {
    enabled: item["enabled"],
    expiration: !item["expiration"] ? item["expiration"] : item["expiration"].toISOString(),
    sshPublicKey: sshPublicKeySerializer(item["sshPublicKey"]),
  };
}

export function consolePropertiesDeserializer(item: any): ConsoleProperties {
  return {
    enabled: item["enabled"],
    expiration: !item["expiration"] ? item["expiration"] : new Date(item["expiration"]),
    sshPublicKey: sshPublicKeyDeserializer(item["sshPublicKey"]),
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    privateLinkServiceId: item["privateLinkServiceId"],
    virtualMachineAccessId: item["virtualMachineAccessId"],
    provisioningState: item["provisioningState"],
  };
}

/** The indicator of whether the console access is enabled. */
export enum KnownConsoleEnabled {
  /** Console access enabled */
  True = "True",
  /** Console access disabled */
  False = "False",
}

/**
 * The indicator of whether the console access is enabled. \
 * {@link KnownConsoleEnabled} can be used interchangeably with ConsoleEnabled,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: Console access enabled \
 * **False**: Console access disabled
 */
export type ConsoleEnabled = string;

/** The more detailed status of the console. */
export enum KnownConsoleDetailedStatus {
  /** The Ready status. */
  Ready = "Ready",
  /** The Error status. */
  Error = "Error",
}

/**
 * The more detailed status of the console. \
 * {@link KnownConsoleDetailedStatus} can be used interchangeably with ConsoleDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready**: The Ready status. \
 * **Error**: The Error status.
 */
export type ConsoleDetailedStatus = string;

/** The provisioning state of the virtual machine console. */
export enum KnownConsoleProvisioningState {
  /** The Succeeded status. */
  Succeeded = "Succeeded",
  /** The Failed status. */
  Failed = "Failed",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Accepted status. */
  Accepted = "Accepted",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
}

/**
 * The provisioning state of the virtual machine console. \
 * {@link KnownConsoleProvisioningState} can be used interchangeably with ConsoleProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The Succeeded status. \
 * **Failed**: The Failed status. \
 * **Canceled**: The Canceled status. \
 * **Accepted**: The Accepted status. \
 * **Provisioning**: The Provisioning status.
 */
export type ConsoleProvisioningState = string;

/** ConsolePatchParameters represents the body of the request to patch the virtual machine console. */
export interface ConsolePatchParameters {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The indicator of whether the console access is enabled. */
  enabled?: ConsoleEnabled;
  /** The date and time after which the key will be disallowed access. */
  expiration?: Date;
  /** The SSH public key that will be provisioned for user access. The user is expected to have the corresponding SSH private key for logging in. */
  sshPublicKey?: SshPublicKey;
}

export function consolePatchParametersSerializer(item: ConsolePatchParameters): any {
  return {
    properties: areAllPropsUndefined(item, ["enabled", "expiration", "sshPublicKey"])
      ? undefined
      : _consolePatchParametersPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** ConsolePatchProperties represents the properties of the virtual machine console that can be patched. */
export interface ConsolePatchProperties {
  /** The indicator of whether the console access is enabled. */
  enabled?: ConsoleEnabled;
  /** The date and time after which the key will be disallowed access. */
  expiration?: Date;
  /** The SSH public key that will be provisioned for user access. The user is expected to have the corresponding SSH private key for logging in. */
  sshPublicKey?: SshPublicKey;
}

export function consolePatchPropertiesSerializer(item: ConsolePatchProperties): any {
  return {
    enabled: item["enabled"],
    expiration: !item["expiration"] ? item["expiration"] : item["expiration"].toISOString(),
    sshPublicKey: !item["sshPublicKey"]
      ? item["sshPublicKey"]
      : sshPublicKeySerializer(item["sshPublicKey"]),
  };
}

/** ConsoleList represents a list of virtual machine consoles. */
export interface _ConsoleList {
  /** The Console items on this page */
  value: Console[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _consoleListDeserializer(item: any): _ConsoleList {
  return {
    value: consoleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function consoleArraySerializer(result: Array<Console>): any[] {
  return result.map((item) => {
    return consoleSerializer(item);
  });
}

export function consoleArrayDeserializer(result: Array<Console>): any[] {
  return result.map((item) => {
    return consoleDeserializer(item);
  });
}

/** ClusterMetricsConfiguration represents the metrics configuration of an on-premises Network Cloud cluster. */
export interface ClusterMetricsConfiguration extends TrackedResource {
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The extended location of the resource. This property is required when creating the resource. */
  extendedLocation: ExtendedLocation;
  /** The list of metric names that have been chosen to be enabled in addition to the core set of enabled metrics. */
  enabledMetrics?: string[];
  /** The interval in minutes by which metrics will be collected. */
  collectionInterval: number;
  /** The more detailed status of the metrics configuration. */
  readonly detailedStatus?: ClusterMetricsConfigurationDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The list of metrics that are available for the cluster but disabled at the moment. */
  readonly disabledMetrics?: string[];
  /** The provisioning state of the metrics configuration. */
  readonly provisioningState?: ClusterMetricsConfigurationProvisioningState;
}

export function clusterMetricsConfigurationSerializer(item: ClusterMetricsConfiguration): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _clusterMetricsConfigurationPropertiesSerializer(item),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function clusterMetricsConfigurationDeserializer(item: any): ClusterMetricsConfiguration {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._clusterMetricsConfigurationPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** ClusterMetricsConfigurationProperties represents the properties of metrics configuration for the cluster. */
export interface ClusterMetricsConfigurationProperties {
  /** The list of metric names that have been chosen to be enabled in addition to the core set of enabled metrics. */
  enabledMetrics?: string[];
  /** The interval in minutes by which metrics will be collected. */
  collectionInterval: number;
  /** The more detailed status of the metrics configuration. */
  readonly detailedStatus?: ClusterMetricsConfigurationDetailedStatus;
  /** The descriptive message about the current detailed status. */
  readonly detailedStatusMessage?: string;
  /** The list of metrics that are available for the cluster but disabled at the moment. */
  readonly disabledMetrics?: string[];
  /** The provisioning state of the metrics configuration. */
  readonly provisioningState?: ClusterMetricsConfigurationProvisioningState;
}

export function clusterMetricsConfigurationPropertiesSerializer(
  item: ClusterMetricsConfigurationProperties,
): any {
  return {
    enabledMetrics: !item["enabledMetrics"]
      ? item["enabledMetrics"]
      : item["enabledMetrics"].map((p: any) => {
          return p;
        }),
    collectionInterval: item["collectionInterval"],
  };
}

export function clusterMetricsConfigurationPropertiesDeserializer(
  item: any,
): ClusterMetricsConfigurationProperties {
  return {
    enabledMetrics: !item["enabledMetrics"]
      ? item["enabledMetrics"]
      : item["enabledMetrics"].map((p: any) => {
          return p;
        }),
    collectionInterval: item["collectionInterval"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    disabledMetrics: !item["disabledMetrics"]
      ? item["disabledMetrics"]
      : item["disabledMetrics"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** The more detailed status of the metrics configuration. */
export enum KnownClusterMetricsConfigurationDetailedStatus {
  /** The Processing status. */
  Processing = "Processing",
  /** The Applied status. */
  Applied = "Applied",
  /** The Error status. */
  Error = "Error",
}

/**
 * The more detailed status of the metrics configuration. \
 * {@link KnownClusterMetricsConfigurationDetailedStatus} can be used interchangeably with ClusterMetricsConfigurationDetailedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Processing**: The Processing status. \
 * **Applied**: The Applied status. \
 * **Error**: The Error status.
 */
export type ClusterMetricsConfigurationDetailedStatus = string;

/** The provisioning state of the metrics configuration. */
export enum KnownClusterMetricsConfigurationProvisioningState {
  /** The Succeeded status. */
  Succeeded = "Succeeded",
  /** The Failed status. */
  Failed = "Failed",
  /** The Canceled status. */
  Canceled = "Canceled",
  /** The Accepted status. */
  Accepted = "Accepted",
  /** The Provisioning status. */
  Provisioning = "Provisioning",
}

/**
 * The provisioning state of the metrics configuration. \
 * {@link KnownClusterMetricsConfigurationProvisioningState} can be used interchangeably with ClusterMetricsConfigurationProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The Succeeded status. \
 * **Failed**: The Failed status. \
 * **Canceled**: The Canceled status. \
 * **Accepted**: The Accepted status. \
 * **Provisioning**: The Provisioning status.
 */
export type ClusterMetricsConfigurationProvisioningState = string;

/** ClusterMetricsConfigurationPatchParameters represents the body of the request to patch the metrics configuration of cluster. */
export interface ClusterMetricsConfigurationPatchParameters {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The interval in minutes by which metrics will be collected. */
  collectionInterval?: number;
  /** The list of metric names that have been chosen to be enabled in addition to the core set of enabled metrics. */
  enabledMetrics?: string[];
}

export function clusterMetricsConfigurationPatchParametersSerializer(
  item: ClusterMetricsConfigurationPatchParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, ["collectionInterval", "enabledMetrics"])
      ? undefined
      : _clusterMetricsConfigurationPatchParametersPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** ClusterMetricsConfigurationPatchProperties represents the properties of metrics configuration for the cluster for patching. */
export interface ClusterMetricsConfigurationPatchProperties {
  /** The interval in minutes by which metrics will be collected. */
  collectionInterval?: number;
  /** The list of metric names that have been chosen to be enabled in addition to the core set of enabled metrics. */
  enabledMetrics?: string[];
}

export function clusterMetricsConfigurationPatchPropertiesSerializer(
  item: ClusterMetricsConfigurationPatchProperties,
): any {
  return {
    collectionInterval: item["collectionInterval"],
    enabledMetrics: !item["enabledMetrics"]
      ? item["enabledMetrics"]
      : item["enabledMetrics"].map((p: any) => {
          return p;
        }),
  };
}

/** ClusterMetricsConfigurationList represents a list of metrics configuration of the cluster. */
export interface _ClusterMetricsConfigurationList {
  /** The ClusterMetricsConfiguration items on this page */
  value: ClusterMetricsConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clusterMetricsConfigurationListDeserializer(
  item: any,
): _ClusterMetricsConfigurationList {
  return {
    value: clusterMetricsConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clusterMetricsConfigurationArraySerializer(
  result: Array<ClusterMetricsConfiguration>,
): any[] {
  return result.map((item) => {
    return clusterMetricsConfigurationSerializer(item);
  });
}

export function clusterMetricsConfigurationArrayDeserializer(
  result: Array<ClusterMetricsConfiguration>,
): any[] {
  return result.map((item) => {
    return clusterMetricsConfigurationDeserializer(item);
  });
}

/**
 * The available API versions.
 * Note: Order Matters more than naming. If you add a new version, please add it to the correct location based on the version date and which versions
 * have preceded it.
 */
export enum KnownVersions {
  /** The 2025-09-01 API version. */
  V20250901 = "2025-09-01",
  /** The 2026-01-01-preview API version. */
  V20260101Preview = "2026-01-01-preview",
  /** The 2026-05-01-preview API version. */
  V20260501Preview = "2026-05-01-preview",
}

export function _accessBridgePropertiesSerializer(item: AccessBridge): any {
  return {
    ipv4ConnectedPrefix: item["ipv4ConnectedPrefix"],
    ipv6ConnectedPrefix: item["ipv6ConnectedPrefix"],
    networkId: item["networkId"],
    securityRules: !item["securityRules"]
      ? item["securityRules"]
      : accessBridgeSecurityRuleArraySerializer(item["securityRules"]),
  };
}

export function _accessBridgePropertiesDeserializer(item: any) {
  return {
    ipv4ConnectedPrefix: item["ipv4ConnectedPrefix"],
    ipv6ConnectedPrefix: item["ipv6ConnectedPrefix"],
    networkId: item["networkId"],
    securityRules: !item["securityRules"]
      ? item["securityRules"]
      : accessBridgeSecurityRuleArrayDeserializer(item["securityRules"]),
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : accessBridgeEndpointArrayDeserializer(item["endpoints"]),
    protocol: item["protocol"],
    provisioningState: item["provisioningState"],
  };
}

export function _operationStatusResultPropertiesDeserializer(item: any) {
  return {
    exitCode: item["exitCode"],
    outputHead: item["outputHead"],
    resultRef: item["resultRef"],
    resultUrl: item["resultUrl"],
  };
}

export function _bareMetalMachinePropertiesSerializer(item: BareMetalMachine): any {
  return {
    bmcConnectionString: item["bmcConnectionString"],
    bmcCredentials: administrativeCredentialsSerializer(item["bmcCredentials"]),
    bmcMacAddress: item["bmcMacAddress"],
    bootMacAddress: item["bootMacAddress"],
    machineDetails: item["machineDetails"],
    machineName: item["machineName"],
    machineSkuId: item["machineSkuId"],
    rackId: item["rackId"],
    rackSlot: item["rackSlot"],
    serialNumber: item["serialNumber"],
    machineClusterVersion: item["machineClusterVersion"],
  };
}

export function _bareMetalMachinePropertiesDeserializer(item: any) {
  return {
    bmcConnectionString: item["bmcConnectionString"],
    bmcCredentials: administrativeCredentialsDeserializer(item["bmcCredentials"]),
    bmcMacAddress: item["bmcMacAddress"],
    bootMacAddress: item["bootMacAddress"],
    machineDetails: item["machineDetails"],
    machineName: item["machineName"],
    machineSkuId: item["machineSkuId"],
    rackId: item["rackId"],
    rackSlot: item["rackSlot"],
    serialNumber: item["serialNumber"],
    actionStates: !item["actionStates"]
      ? item["actionStates"]
      : actionStateArrayDeserializer(item["actionStates"]),
    associatedResourceIds: !item["associatedResourceIds"]
      ? item["associatedResourceIds"]
      : item["associatedResourceIds"].map((p: any) => {
          return p;
        }),
    bmcIpv4Address: item["bmcIpv4Address"],
    bmcIpv6Address: item["bmcIpv6Address"],
    caCertificate: !item["caCertificate"]
      ? item["caCertificate"]
      : certificateInfoDeserializer(item["caCertificate"]),
    clusterId: item["clusterId"],
    cordonStatus: item["cordonStatus"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    hardwareInventory: !item["hardwareInventory"]
      ? item["hardwareInventory"]
      : hardwareInventoryDeserializer(item["hardwareInventory"]),
    hardwareValidationStatus: !item["hardwareValidationStatus"]
      ? item["hardwareValidationStatus"]
      : hardwareValidationStatusDeserializer(item["hardwareValidationStatus"]),
    hybridAksClustersAssociatedIds: !item["hybridAksClustersAssociatedIds"]
      ? item["hybridAksClustersAssociatedIds"]
      : item["hybridAksClustersAssociatedIds"].map((p: any) => {
          return p;
        }),
    kubernetesNodeName: item["kubernetesNodeName"],
    kubernetesVersion: item["kubernetesVersion"],
    machineClusterVersion: item["machineClusterVersion"],
    machineRoles: !item["machineRoles"]
      ? item["machineRoles"]
      : item["machineRoles"].map((p: any) => {
          return p;
        }),
    monitoringConfigurationStatus: !item["monitoringConfigurationStatus"]
      ? item["monitoringConfigurationStatus"]
      : bareMetalMachineMonitoringConfigurationStatusDeserializer(
          item["monitoringConfigurationStatus"],
        ),
    oamIpv4Address: item["oamIpv4Address"],
    oamIpv6Address: item["oamIpv6Address"],
    osImage: item["osImage"],
    powerState: item["powerState"],
    readyState: item["readyState"],
    runtimeProtectionStatus: !item["runtimeProtectionStatus"]
      ? item["runtimeProtectionStatus"]
      : runtimeProtectionStatusDeserializer(item["runtimeProtectionStatus"]),
    secretRotationStatus: !item["secretRotationStatus"]
      ? item["secretRotationStatus"]
      : secretRotationStatusArrayDeserializer(item["secretRotationStatus"]),
    serviceTag: item["serviceTag"],
    virtualMachinesAssociatedIds: !item["virtualMachinesAssociatedIds"]
      ? item["virtualMachinesAssociatedIds"]
      : item["virtualMachinesAssociatedIds"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

export function _bareMetalMachinePatchParametersPropertiesSerializer(
  item: BareMetalMachinePatchParameters,
): any {
  return { machineDetails: item["machineDetails"] };
}

export function _cloudServicesNetworkPropertiesSerializer(item: CloudServicesNetwork): any {
  return {
    additionalEgressEndpoints: !item["additionalEgressEndpoints"]
      ? item["additionalEgressEndpoints"]
      : egressEndpointArraySerializer(item["additionalEgressEndpoints"]),
    enableDefaultEgressEndpoints: item["enableDefaultEgressEndpoints"],
    storageOptions: !item["storageOptions"]
      ? item["storageOptions"]
      : cloudServicesNetworkStorageOptionsSerializer(item["storageOptions"]),
  };
}

export function _cloudServicesNetworkPropertiesDeserializer(item: any) {
  return {
    additionalEgressEndpoints: !item["additionalEgressEndpoints"]
      ? item["additionalEgressEndpoints"]
      : egressEndpointArrayDeserializer(item["additionalEgressEndpoints"]),
    enableDefaultEgressEndpoints: item["enableDefaultEgressEndpoints"],
    storageOptions: !item["storageOptions"]
      ? item["storageOptions"]
      : cloudServicesNetworkStorageOptionsDeserializer(item["storageOptions"]),
    associatedResourceIds: !item["associatedResourceIds"]
      ? item["associatedResourceIds"]
      : item["associatedResourceIds"].map((p: any) => {
          return p;
        }),
    clusterId: item["clusterId"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    enabledEgressEndpoints: !item["enabledEgressEndpoints"]
      ? item["enabledEgressEndpoints"]
      : egressEndpointArrayDeserializer(item["enabledEgressEndpoints"]),
    hybridAksClustersAssociatedIds: !item["hybridAksClustersAssociatedIds"]
      ? item["hybridAksClustersAssociatedIds"]
      : item["hybridAksClustersAssociatedIds"].map((p: any) => {
          return p;
        }),
    interfaceName: item["interfaceName"],
    storageStatus: !item["storageStatus"]
      ? item["storageStatus"]
      : cloudServicesNetworkStorageStatusDeserializer(item["storageStatus"]),
    virtualMachinesAssociatedIds: !item["virtualMachinesAssociatedIds"]
      ? item["virtualMachinesAssociatedIds"]
      : item["virtualMachinesAssociatedIds"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

export function _cloudServicesNetworkPatchParametersPropertiesSerializer(
  item: CloudServicesNetworkPatchParameters,
): any {
  return {
    additionalEgressEndpoints: !item["additionalEgressEndpoints"]
      ? item["additionalEgressEndpoints"]
      : egressEndpointArraySerializer(item["additionalEgressEndpoints"]),
    enableDefaultEgressEndpoints: item["enableDefaultEgressEndpoints"],
    storageOptions: !item["storageOptions"]
      ? item["storageOptions"]
      : cloudServicesNetworkStorageOptionsPatchSerializer(item["storageOptions"]),
  };
}

export function _clusterManagerPropertiesSerializer(item: ClusterManager): any {
  return {
    analyticsWorkspaceId: item["analyticsWorkspaceId"],
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    fabricControllerId: item["fabricControllerId"],
    managedResourceGroupConfiguration: !item["managedResourceGroupConfiguration"]
      ? item["managedResourceGroupConfiguration"]
      : managedResourceGroupConfigurationSerializer(item["managedResourceGroupConfiguration"]),
    vmSize: item["vmSize"],
  };
}

export function _clusterManagerPropertiesDeserializer(item: any) {
  return {
    analyticsWorkspaceId: item["analyticsWorkspaceId"],
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    clusterVersions: !item["clusterVersions"]
      ? item["clusterVersions"]
      : clusterAvailableVersionArrayDeserializer(item["clusterVersions"]),
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    fabricControllerId: item["fabricControllerId"],
    managedResourceGroupConfiguration: !item["managedResourceGroupConfiguration"]
      ? item["managedResourceGroupConfiguration"]
      : managedResourceGroupConfigurationDeserializer(item["managedResourceGroupConfiguration"]),
    managerExtendedLocation: !item["managerExtendedLocation"]
      ? item["managerExtendedLocation"]
      : extendedLocationDeserializer(item["managerExtendedLocation"]),
    provisioningState: item["provisioningState"],
    relayConfiguration: !item["relayConfiguration"]
      ? item["relayConfiguration"]
      : clusterManagerRelayConfigurationDeserializer(item["relayConfiguration"]),
    vmSize: item["vmSize"],
  };
}

export function _clusterPropertiesSerializer(item: Cluster): any {
  return {
    aggregatorOrSingleRackDefinition: rackDefinitionSerializer(
      item["aggregatorOrSingleRackDefinition"],
    ),
    analyticsOutputSettings: !item["analyticsOutputSettings"]
      ? item["analyticsOutputSettings"]
      : analyticsOutputSettingsSerializer(item["analyticsOutputSettings"]),
    analyticsWorkspaceId: item["analyticsWorkspaceId"],
    clusterLocation: item["clusterLocation"],
    clusterServicePrincipal: !item["clusterServicePrincipal"]
      ? item["clusterServicePrincipal"]
      : servicePrincipalInformationSerializer(item["clusterServicePrincipal"]),
    clusterType: item["clusterType"],
    clusterVersion: item["clusterVersion"],
    commandOutputSettings: !item["commandOutputSettings"]
      ? item["commandOutputSettings"]
      : commandOutputSettingsSerializer(item["commandOutputSettings"]),
    computeDeploymentThreshold: !item["computeDeploymentThreshold"]
      ? item["computeDeploymentThreshold"]
      : validationThresholdSerializer(item["computeDeploymentThreshold"]),
    computeRackDefinitions: !item["computeRackDefinitions"]
      ? item["computeRackDefinitions"]
      : rackDefinitionArraySerializer(item["computeRackDefinitions"]),
    managedResourceGroupConfiguration: !item["managedResourceGroupConfiguration"]
      ? item["managedResourceGroupConfiguration"]
      : managedResourceGroupConfigurationSerializer(item["managedResourceGroupConfiguration"]),
    networkFabricId: item["networkFabricId"],
    runtimeProtectionConfiguration: !item["runtimeProtectionConfiguration"]
      ? item["runtimeProtectionConfiguration"]
      : runtimeProtectionConfigurationSerializer(item["runtimeProtectionConfiguration"]),
    secretArchive: !item["secretArchive"]
      ? item["secretArchive"]
      : clusterSecretArchiveSerializer(item["secretArchive"]),
    secretArchiveSettings: !item["secretArchiveSettings"]
      ? item["secretArchiveSettings"]
      : secretArchiveSettingsSerializer(item["secretArchiveSettings"]),
    updateStrategy: !item["updateStrategy"]
      ? item["updateStrategy"]
      : clusterUpdateStrategySerializer(item["updateStrategy"]),
    vulnerabilityScanningSettings: !item["vulnerabilityScanningSettings"]
      ? item["vulnerabilityScanningSettings"]
      : vulnerabilityScanningSettingsSerializer(item["vulnerabilityScanningSettings"]),
  };
}

export function _clusterPropertiesDeserializer(item: any) {
  return {
    aggregatorOrSingleRackDefinition: rackDefinitionDeserializer(
      item["aggregatorOrSingleRackDefinition"],
    ),
    analyticsOutputSettings: !item["analyticsOutputSettings"]
      ? item["analyticsOutputSettings"]
      : analyticsOutputSettingsDeserializer(item["analyticsOutputSettings"]),
    analyticsWorkspaceId: item["analyticsWorkspaceId"],
    clusterLocation: item["clusterLocation"],
    clusterServicePrincipal: !item["clusterServicePrincipal"]
      ? item["clusterServicePrincipal"]
      : servicePrincipalInformationDeserializer(item["clusterServicePrincipal"]),
    clusterType: item["clusterType"],
    clusterVersion: item["clusterVersion"],
    commandOutputSettings: !item["commandOutputSettings"]
      ? item["commandOutputSettings"]
      : commandOutputSettingsDeserializer(item["commandOutputSettings"]),
    computeDeploymentThreshold: !item["computeDeploymentThreshold"]
      ? item["computeDeploymentThreshold"]
      : validationThresholdDeserializer(item["computeDeploymentThreshold"]),
    computeRackDefinitions: !item["computeRackDefinitions"]
      ? item["computeRackDefinitions"]
      : rackDefinitionArrayDeserializer(item["computeRackDefinitions"]),
    managedResourceGroupConfiguration: !item["managedResourceGroupConfiguration"]
      ? item["managedResourceGroupConfiguration"]
      : managedResourceGroupConfigurationDeserializer(item["managedResourceGroupConfiguration"]),
    networkFabricId: item["networkFabricId"],
    runtimeProtectionConfiguration: !item["runtimeProtectionConfiguration"]
      ? item["runtimeProtectionConfiguration"]
      : runtimeProtectionConfigurationDeserializer(item["runtimeProtectionConfiguration"]),
    secretArchive: !item["secretArchive"]
      ? item["secretArchive"]
      : clusterSecretArchiveDeserializer(item["secretArchive"]),
    secretArchiveSettings: !item["secretArchiveSettings"]
      ? item["secretArchiveSettings"]
      : secretArchiveSettingsDeserializer(item["secretArchiveSettings"]),
    updateStrategy: !item["updateStrategy"]
      ? item["updateStrategy"]
      : clusterUpdateStrategyDeserializer(item["updateStrategy"]),
    vulnerabilityScanningSettings: !item["vulnerabilityScanningSettings"]
      ? item["vulnerabilityScanningSettings"]
      : vulnerabilityScanningSettingsDeserializer(item["vulnerabilityScanningSettings"]),
    actionStates: !item["actionStates"]
      ? item["actionStates"]
      : actionStateArrayDeserializer(item["actionStates"]),
    availableUpgradeVersions: !item["availableUpgradeVersions"]
      ? item["availableUpgradeVersions"]
      : clusterAvailableUpgradeVersionArrayDeserializer(item["availableUpgradeVersions"]),
    clusterCapacity: !item["clusterCapacity"]
      ? item["clusterCapacity"]
      : clusterCapacityDeserializer(item["clusterCapacity"]),
    clusterConnectionStatus: item["clusterConnectionStatus"],
    clusterExtendedLocation: !item["clusterExtendedLocation"]
      ? item["clusterExtendedLocation"]
      : extendedLocationDeserializer(item["clusterExtendedLocation"]),
    clusterManagerConnectionStatus: item["clusterManagerConnectionStatus"],
    clusterManagerId: item["clusterManagerId"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    hybridAksExtendedLocation: !item["hybridAksExtendedLocation"]
      ? item["hybridAksExtendedLocation"]
      : extendedLocationDeserializer(item["hybridAksExtendedLocation"]),
    lastSuccessfulVersionUpdateTime: !item["lastSuccessfulVersionUpdateTime"]
      ? item["lastSuccessfulVersionUpdateTime"]
      : new Date(item["lastSuccessfulVersionUpdateTime"]),
    managedCredentials: !item["managedCredentials"]
      ? item["managedCredentials"]
      : item["managedCredentials"].map((p: any) => {
          return p;
        }),
    manualActionCount: item["manualActionCount"],
    supportExpiryDate: item["supportExpiryDate"],
    workloadResourceIds: !item["workloadResourceIds"]
      ? item["workloadResourceIds"]
      : item["workloadResourceIds"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

export function _clusterPatchParametersPropertiesSerializer(item: ClusterPatchParameters): any {
  return {
    aggregatorOrSingleRackDefinition: !item["aggregatorOrSingleRackDefinition"]
      ? item["aggregatorOrSingleRackDefinition"]
      : rackDefinitionSerializer(item["aggregatorOrSingleRackDefinition"]),
    analyticsOutputSettings: !item["analyticsOutputSettings"]
      ? item["analyticsOutputSettings"]
      : analyticsOutputSettingsSerializer(item["analyticsOutputSettings"]),
    clusterLocation: item["clusterLocation"],
    clusterServicePrincipal: !item["clusterServicePrincipal"]
      ? item["clusterServicePrincipal"]
      : servicePrincipalInformationSerializer(item["clusterServicePrincipal"]),
    commandOutputSettings: !item["commandOutputSettings"]
      ? item["commandOutputSettings"]
      : commandOutputSettingsSerializer(item["commandOutputSettings"]),
    computeDeploymentThreshold: !item["computeDeploymentThreshold"]
      ? item["computeDeploymentThreshold"]
      : validationThresholdSerializer(item["computeDeploymentThreshold"]),
    computeRackDefinitions: !item["computeRackDefinitions"]
      ? item["computeRackDefinitions"]
      : rackDefinitionArraySerializer(item["computeRackDefinitions"]),
    runtimeProtectionConfiguration: !item["runtimeProtectionConfiguration"]
      ? item["runtimeProtectionConfiguration"]
      : runtimeProtectionConfigurationSerializer(item["runtimeProtectionConfiguration"]),
    secretArchive: !item["secretArchive"]
      ? item["secretArchive"]
      : clusterSecretArchiveSerializer(item["secretArchive"]),
    secretArchiveSettings: !item["secretArchiveSettings"]
      ? item["secretArchiveSettings"]
      : secretArchiveSettingsSerializer(item["secretArchiveSettings"]),
    updateStrategy: !item["updateStrategy"]
      ? item["updateStrategy"]
      : clusterUpdateStrategySerializer(item["updateStrategy"]),
    vulnerabilityScanningSettings: !item["vulnerabilityScanningSettings"]
      ? item["vulnerabilityScanningSettings"]
      : vulnerabilityScanningSettingsPatchSerializer(item["vulnerabilityScanningSettings"]),
  };
}

export function _kubernetesClusterPropertiesSerializer(item: KubernetesCluster): any {
  return {
    aadConfiguration: !item["aadConfiguration"]
      ? item["aadConfiguration"]
      : aadConfigurationSerializer(item["aadConfiguration"]),
    administratorConfiguration: !item["administratorConfiguration"]
      ? item["administratorConfiguration"]
      : administratorConfigurationSerializer(item["administratorConfiguration"]),
    controlPlaneNodeConfiguration: controlPlaneNodeConfigurationSerializer(
      item["controlPlaneNodeConfiguration"],
    ),
    initialAgentPoolConfigurations: initialAgentPoolConfigurationArraySerializer(
      item["initialAgentPoolConfigurations"],
    ),
    kubernetesVersion: item["kubernetesVersion"],
    managedResourceGroupConfiguration: !item["managedResourceGroupConfiguration"]
      ? item["managedResourceGroupConfiguration"]
      : managedResourceGroupConfigurationSerializer(item["managedResourceGroupConfiguration"]),
    networkConfiguration: networkConfigurationSerializer(item["networkConfiguration"]),
  };
}

export function _kubernetesClusterPropertiesDeserializer(item: any) {
  return {
    aadConfiguration: !item["aadConfiguration"]
      ? item["aadConfiguration"]
      : aadConfigurationDeserializer(item["aadConfiguration"]),
    administratorConfiguration: !item["administratorConfiguration"]
      ? item["administratorConfiguration"]
      : administratorConfigurationDeserializer(item["administratorConfiguration"]),
    controlPlaneNodeConfiguration: controlPlaneNodeConfigurationDeserializer(
      item["controlPlaneNodeConfiguration"],
    ),
    initialAgentPoolConfigurations: initialAgentPoolConfigurationArrayDeserializer(
      item["initialAgentPoolConfigurations"],
    ),
    kubernetesVersion: item["kubernetesVersion"],
    managedResourceGroupConfiguration: !item["managedResourceGroupConfiguration"]
      ? item["managedResourceGroupConfiguration"]
      : managedResourceGroupConfigurationDeserializer(item["managedResourceGroupConfiguration"]),
    networkConfiguration: networkConfigurationDeserializer(item["networkConfiguration"]),
    attachedNetworkIds: !item["attachedNetworkIds"]
      ? item["attachedNetworkIds"]
      : item["attachedNetworkIds"].map((p: any) => {
          return p;
        }),
    availableUpgrades: !item["availableUpgrades"]
      ? item["availableUpgrades"]
      : availableUpgradeArrayDeserializer(item["availableUpgrades"]),
    clusterId: item["clusterId"],
    connectedClusterId: item["connectedClusterId"],
    controlPlaneKubernetesVersion: item["controlPlaneKubernetesVersion"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    featureStatuses: !item["featureStatuses"]
      ? item["featureStatuses"]
      : featureStatusArrayDeserializer(item["featureStatuses"]),
    nodes: !item["nodes"] ? item["nodes"] : kubernetesClusterNodeArrayDeserializer(item["nodes"]),
    provisioningState: item["provisioningState"],
  };
}

export function _kubernetesClusterPatchParametersPropertiesSerializer(
  item: KubernetesClusterPatchParameters,
): any {
  return {
    administratorConfiguration: !item["administratorConfiguration"]
      ? item["administratorConfiguration"]
      : administratorConfigurationPatchSerializer(item["administratorConfiguration"]),
    controlPlaneNodeConfiguration: !item["controlPlaneNodeConfiguration"]
      ? item["controlPlaneNodeConfiguration"]
      : controlPlaneNodePatchConfigurationSerializer(item["controlPlaneNodeConfiguration"]),
    kubernetesVersion: item["kubernetesVersion"],
  };
}

export function _kubernetesVersionPropertiesSerializer(_item: KubernetesVersion): any {
  return {};
}

export function _kubernetesVersionPropertiesDeserializer(item: any) {
  return {
    values: !item["values"]
      ? item["values"]
      : kubernetesVersionValueArrayDeserializer(item["values"]),
    provisioningState: item["provisioningState"],
  };
}

export function _l2NetworkPropertiesSerializer(item: L2Network): any {
  return {
    hybridAksPluginType: item["hybridAksPluginType"],
    interfaceName: item["interfaceName"],
    l2IsolationDomainId: item["l2IsolationDomainId"],
  };
}

export function _l2NetworkPropertiesDeserializer(item: any) {
  return {
    hybridAksPluginType: item["hybridAksPluginType"],
    interfaceName: item["interfaceName"],
    l2IsolationDomainId: item["l2IsolationDomainId"],
    associatedResourceIds: !item["associatedResourceIds"]
      ? item["associatedResourceIds"]
      : item["associatedResourceIds"].map((p: any) => {
          return p;
        }),
    clusterId: item["clusterId"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    hybridAksClustersAssociatedIds: !item["hybridAksClustersAssociatedIds"]
      ? item["hybridAksClustersAssociatedIds"]
      : item["hybridAksClustersAssociatedIds"].map((p: any) => {
          return p;
        }),
    virtualMachinesAssociatedIds: !item["virtualMachinesAssociatedIds"]
      ? item["virtualMachinesAssociatedIds"]
      : item["virtualMachinesAssociatedIds"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

export function _l3NetworkPropertiesSerializer(item: L3Network): any {
  return {
    hybridAksIpamEnabled: item["hybridAksIpamEnabled"],
    hybridAksPluginType: item["hybridAksPluginType"],
    interfaceName: item["interfaceName"],
    ipAllocationType: item["ipAllocationType"],
    ipv4ConnectedPrefix: item["ipv4ConnectedPrefix"],
    ipv6ConnectedPrefix: item["ipv6ConnectedPrefix"],
    l3IsolationDomainId: item["l3IsolationDomainId"],
    vlan: item["vlan"],
  };
}

export function _l3NetworkPropertiesDeserializer(item: any) {
  return {
    hybridAksIpamEnabled: item["hybridAksIpamEnabled"],
    hybridAksPluginType: item["hybridAksPluginType"],
    interfaceName: item["interfaceName"],
    ipAllocationType: item["ipAllocationType"],
    ipv4ConnectedPrefix: item["ipv4ConnectedPrefix"],
    ipv6ConnectedPrefix: item["ipv6ConnectedPrefix"],
    l3IsolationDomainId: item["l3IsolationDomainId"],
    vlan: item["vlan"],
    associatedResourceIds: !item["associatedResourceIds"]
      ? item["associatedResourceIds"]
      : item["associatedResourceIds"].map((p: any) => {
          return p;
        }),
    clusterId: item["clusterId"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    hybridAksClustersAssociatedIds: !item["hybridAksClustersAssociatedIds"]
      ? item["hybridAksClustersAssociatedIds"]
      : item["hybridAksClustersAssociatedIds"].map((p: any) => {
          return p;
        }),
    virtualMachinesAssociatedIds: !item["virtualMachinesAssociatedIds"]
      ? item["virtualMachinesAssociatedIds"]
      : item["virtualMachinesAssociatedIds"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

export function _machineSkuSlotPropertiesDeserializer(item: any) {
  return {
    bootstrapProtocol: item["bootstrapProtocol"],
    cpuCores: item["cpuCores"],
    cpuSockets: item["cpuSockets"],
    disks: !item["disks"] ? item["disks"] : machineDiskArrayDeserializer(item["disks"]),
    generation: item["generation"],
    hardwareVersion: item["hardwareVersion"],
    memoryCapacityGB: item["memoryCapacityGB"],
    model: item["model"],
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceArrayDeserializer(item["networkInterfaces"]),
    totalThreads: item["totalThreads"],
    vendor: item["vendor"],
  };
}

export function _storageApplianceSkuSlotPropertiesDeserializer(item: any) {
  return {
    capacityGB: item["capacityGB"],
    model: item["model"],
  };
}

export function _rackSkuPropertiesDeserializer(item: any) {
  return {
    computeMachines: !item["computeMachines"]
      ? item["computeMachines"]
      : machineSkuSlotArrayDeserializer(item["computeMachines"]),
    controllerMachines: !item["controllerMachines"]
      ? item["controllerMachines"]
      : machineSkuSlotArrayDeserializer(item["controllerMachines"]),
    deploymentType: item["deploymentType"],
    description: item["description"],
    maxClusterSlots: item["maxClusterSlots"],
    provisioningState: item["provisioningState"],
    rackType: item["rackType"],
    storageAppliances: !item["storageAppliances"]
      ? item["storageAppliances"]
      : storageApplianceSkuSlotArrayDeserializer(item["storageAppliances"]),
    supportedRackSkuIds: !item["supportedRackSkuIds"]
      ? item["supportedRackSkuIds"]
      : item["supportedRackSkuIds"].map((p: any) => {
          return p;
        }),
  };
}

export function _rackPropertiesSerializer(item: Rack): any {
  return {
    availabilityZone: item["availabilityZone"],
    rackLocation: item["rackLocation"],
    rackSerialNumber: item["rackSerialNumber"],
    rackSkuId: item["rackSkuId"],
  };
}

export function _rackPropertiesDeserializer(item: any) {
  return {
    availabilityZone: item["availabilityZone"],
    rackLocation: item["rackLocation"],
    rackSerialNumber: item["rackSerialNumber"],
    rackSkuId: item["rackSkuId"],
    clusterId: item["clusterId"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    provisioningState: item["provisioningState"],
  };
}

export function _rackPatchParametersPropertiesSerializer(item: RackPatchParameters): any {
  return { rackLocation: item["rackLocation"], rackSerialNumber: item["rackSerialNumber"] };
}

export function _storageAppliancePropertiesSerializer(item: StorageAppliance): any {
  return {
    administratorCredentials: administrativeCredentialsSerializer(item["administratorCredentials"]),
    rackId: item["rackId"],
    rackSlot: item["rackSlot"],
    serialNumber: item["serialNumber"],
    storageApplianceSkuId: item["storageApplianceSkuId"],
  };
}

export function _storageAppliancePropertiesDeserializer(item: any) {
  return {
    administratorCredentials: administrativeCredentialsDeserializer(
      item["administratorCredentials"],
    ),
    rackId: item["rackId"],
    rackSlot: item["rackSlot"],
    serialNumber: item["serialNumber"],
    storageApplianceSkuId: item["storageApplianceSkuId"],
    caCertificate: !item["caCertificate"]
      ? item["caCertificate"]
      : certificateInfoDeserializer(item["caCertificate"]),
    capacity: item["capacity"],
    capacityUsed: item["capacityUsed"],
    clusterId: item["clusterId"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    expansionShelves: !item["expansionShelves"]
      ? item["expansionShelves"]
      : storageApplianceExpansionShelfArrayDeserializer(item["expansionShelves"]),
    managementIpv4Address: item["managementIpv4Address"],
    manufacturer: item["manufacturer"],
    model: item["model"],
    monitoringConfigurationStatus: !item["monitoringConfigurationStatus"]
      ? item["monitoringConfigurationStatus"]
      : storageApplianceMonitoringConfigurationStatusDeserializer(
          item["monitoringConfigurationStatus"],
        ),
    remoteVendorManagementFeature: item["remoteVendorManagementFeature"],
    remoteVendorManagementStatus: item["remoteVendorManagementStatus"],
    secretRotationStatus: !item["secretRotationStatus"]
      ? item["secretRotationStatus"]
      : secretRotationStatusArrayDeserializer(item["secretRotationStatus"]),
    version: item["version"],
    provisioningState: item["provisioningState"],
  };
}

export function _storageAppliancePatchParametersPropertiesSerializer(
  item: StorageAppliancePatchParameters,
): any {
  return { serialNumber: item["serialNumber"] };
}

export function _trunkedNetworkPropertiesSerializer(item: TrunkedNetwork): any {
  return {
    hybridAksPluginType: item["hybridAksPluginType"],
    interfaceName: item["interfaceName"],
    isolationDomainIds: item["isolationDomainIds"].map((p: any) => {
      return p;
    }),
    vlans: item["vlans"].map((p: any) => {
      return p;
    }),
  };
}

export function _trunkedNetworkPropertiesDeserializer(item: any) {
  return {
    hybridAksPluginType: item["hybridAksPluginType"],
    interfaceName: item["interfaceName"],
    isolationDomainIds: item["isolationDomainIds"].map((p: any) => {
      return p;
    }),
    vlans: item["vlans"].map((p: any) => {
      return p;
    }),
    associatedResourceIds: !item["associatedResourceIds"]
      ? item["associatedResourceIds"]
      : item["associatedResourceIds"].map((p: any) => {
          return p;
        }),
    clusterId: item["clusterId"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    hybridAksClustersAssociatedIds: !item["hybridAksClustersAssociatedIds"]
      ? item["hybridAksClustersAssociatedIds"]
      : item["hybridAksClustersAssociatedIds"].map((p: any) => {
          return p;
        }),
    virtualMachinesAssociatedIds: !item["virtualMachinesAssociatedIds"]
      ? item["virtualMachinesAssociatedIds"]
      : item["virtualMachinesAssociatedIds"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

export function _virtualMachinePropertiesSerializer(item: VirtualMachine): any {
  return {
    adminUsername: item["adminUsername"],
    bootMethod: item["bootMethod"],
    cloudServicesNetworkAttachment: networkAttachmentSerializer(
      item["cloudServicesNetworkAttachment"],
    ),
    cpuCores: item["cpuCores"],
    isolateEmulatorThread: item["isolateEmulatorThread"],
    memorySizeGB: item["memorySizeGB"],
    networkAttachments: !item["networkAttachments"]
      ? item["networkAttachments"]
      : networkAttachmentArraySerializer(item["networkAttachments"]),
    networkData: item["networkData"],
    networkDataContent: item["networkDataContent"],
    placementHints: !item["placementHints"]
      ? item["placementHints"]
      : virtualMachinePlacementHintArraySerializer(item["placementHints"]),
    sshPublicKeys: !item["sshPublicKeys"]
      ? item["sshPublicKeys"]
      : sshPublicKeyArraySerializer(item["sshPublicKeys"]),
    storageProfile: storageProfileSerializer(item["storageProfile"]),
    userData: item["userData"],
    userDataContent: item["userDataContent"],
    virtioInterface: item["virtioInterface"],
    vmDeviceModel: item["vmDeviceModel"],
    vmImage: item["vmImage"],
    vmImageRepositoryCredentials: !item["vmImageRepositoryCredentials"]
      ? item["vmImageRepositoryCredentials"]
      : imageRepositoryCredentialsSerializer(item["vmImageRepositoryCredentials"]),
    consoleExtendedLocation: !item["consoleExtendedLocation"]
      ? item["consoleExtendedLocation"]
      : extendedLocationSerializer(item["consoleExtendedLocation"]),
  };
}

export function _virtualMachinePropertiesDeserializer(item: any) {
  return {
    adminUsername: item["adminUsername"],
    bootMethod: item["bootMethod"],
    cloudServicesNetworkAttachment: networkAttachmentDeserializer(
      item["cloudServicesNetworkAttachment"],
    ),
    cpuCores: item["cpuCores"],
    isolateEmulatorThread: item["isolateEmulatorThread"],
    memorySizeGB: item["memorySizeGB"],
    networkAttachments: !item["networkAttachments"]
      ? item["networkAttachments"]
      : networkAttachmentArrayDeserializer(item["networkAttachments"]),
    networkData: item["networkData"],
    networkDataContent: item["networkDataContent"],
    placementHints: !item["placementHints"]
      ? item["placementHints"]
      : virtualMachinePlacementHintArrayDeserializer(item["placementHints"]),
    sshPublicKeys: !item["sshPublicKeys"]
      ? item["sshPublicKeys"]
      : sshPublicKeyArrayDeserializer(item["sshPublicKeys"]),
    storageProfile: storageProfileDeserializer(item["storageProfile"]),
    userData: item["userData"],
    userDataContent: item["userDataContent"],
    virtioInterface: item["virtioInterface"],
    vmDeviceModel: item["vmDeviceModel"],
    vmImage: item["vmImage"],
    vmImageRepositoryCredentials: !item["vmImageRepositoryCredentials"]
      ? item["vmImageRepositoryCredentials"]
      : imageRepositoryCredentialsDeserializer(item["vmImageRepositoryCredentials"]),
    availabilityZone: item["availabilityZone"],
    bareMetalMachineId: item["bareMetalMachineId"],
    clusterId: item["clusterId"],
    consoleExtendedLocation: !item["consoleExtendedLocation"]
      ? item["consoleExtendedLocation"]
      : extendedLocationDeserializer(item["consoleExtendedLocation"]),
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    powerState: item["powerState"],
    volumes: !item["volumes"]
      ? item["volumes"]
      : item["volumes"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

export function _virtualMachinePatchParametersPropertiesSerializer(
  item: VirtualMachinePatchParameters,
): any {
  return {
    vmImageRepositoryCredentials: !item["vmImageRepositoryCredentials"]
      ? item["vmImageRepositoryCredentials"]
      : imageRepositoryCredentialsSerializer(item["vmImageRepositoryCredentials"]),
  };
}

export function _volumePropertiesSerializer(item: Volume): any {
  return { sizeMiB: item["sizeMiB"], storageApplianceId: item["storageApplianceId"] };
}

export function _volumePropertiesDeserializer(item: any) {
  return {
    sizeMiB: item["sizeMiB"],
    storageApplianceId: item["storageApplianceId"],
    allocatedSizeMiB: item["allocatedSizeMiB"],
    assignedStorageApplianceId: item["assignedStorageApplianceId"],
    attachedTo: !item["attachedTo"]
      ? item["attachedTo"]
      : item["attachedTo"].map((p: any) => {
          return p;
        }),
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    serialNumber: item["serialNumber"],
    provisioningState: item["provisioningState"],
  };
}

export function _bareMetalMachineKeySetPropertiesSerializer(item: BareMetalMachineKeySet): any {
  return {
    azureGroupId: item["azureGroupId"],
    expiration: item["expiration"].toISOString(),
    jumpHostsAllowed: item["jumpHostsAllowed"].map((p: any) => {
      return p;
    }),
    osGroupName: item["osGroupName"],
    privilegeLevel: item["privilegeLevel"],
    privilegeLevelName: item["privilegeLevelName"],
    userList: keySetUserArraySerializer(item["userList"]),
  };
}

export function _bareMetalMachineKeySetPropertiesDeserializer(item: any) {
  return {
    azureGroupId: item["azureGroupId"],
    expiration: new Date(item["expiration"]),
    jumpHostsAllowed: item["jumpHostsAllowed"].map((p: any) => {
      return p;
    }),
    osGroupName: item["osGroupName"],
    privilegeLevel: item["privilegeLevel"],
    privilegeLevelName: item["privilegeLevelName"],
    userList: keySetUserArrayDeserializer(item["userList"]),
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    lastValidation: !item["lastValidation"]
      ? item["lastValidation"]
      : new Date(item["lastValidation"]),
    userListStatus: !item["userListStatus"]
      ? item["userListStatus"]
      : keySetUserStatusArrayDeserializer(item["userListStatus"]),
    provisioningState: item["provisioningState"],
  };
}

export function _bareMetalMachineKeySetPatchParametersPropertiesSerializer(
  item: BareMetalMachineKeySetPatchParameters,
): any {
  return {
    expiration: !item["expiration"] ? item["expiration"] : item["expiration"].toISOString(),
    jumpHostsAllowed: !item["jumpHostsAllowed"]
      ? item["jumpHostsAllowed"]
      : item["jumpHostsAllowed"].map((p: any) => {
          return p;
        }),
    userList: !item["userList"] ? item["userList"] : keySetUserArraySerializer(item["userList"]),
  };
}

export function _bmcKeySetPropertiesSerializer(item: BmcKeySet): any {
  return {
    azureGroupId: item["azureGroupId"],
    expiration: item["expiration"].toISOString(),
    privilegeLevel: item["privilegeLevel"],
    userList: keySetUserArraySerializer(item["userList"]),
  };
}

export function _bmcKeySetPropertiesDeserializer(item: any) {
  return {
    azureGroupId: item["azureGroupId"],
    expiration: new Date(item["expiration"]),
    privilegeLevel: item["privilegeLevel"],
    userList: keySetUserArrayDeserializer(item["userList"]),
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    lastValidation: !item["lastValidation"]
      ? item["lastValidation"]
      : new Date(item["lastValidation"]),
    userListStatus: !item["userListStatus"]
      ? item["userListStatus"]
      : keySetUserStatusArrayDeserializer(item["userListStatus"]),
    provisioningState: item["provisioningState"],
  };
}

export function _bmcKeySetPatchParametersPropertiesSerializer(item: BmcKeySetPatchParameters): any {
  return {
    expiration: !item["expiration"] ? item["expiration"] : item["expiration"].toISOString(),
    userList: !item["userList"] ? item["userList"] : keySetUserArraySerializer(item["userList"]),
  };
}

export function _agentPoolPropertiesSerializer(item: AgentPool): any {
  return {
    administratorConfiguration: !item["administratorConfiguration"]
      ? item["administratorConfiguration"]
      : administratorConfigurationSerializer(item["administratorConfiguration"]),
    agentOptions: !item["agentOptions"]
      ? item["agentOptions"]
      : agentOptionsSerializer(item["agentOptions"]),
    attachedNetworkConfiguration: !item["attachedNetworkConfiguration"]
      ? item["attachedNetworkConfiguration"]
      : attachedNetworkConfigurationSerializer(item["attachedNetworkConfiguration"]),
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    count: item["count"],
    labels: !item["labels"] ? item["labels"] : kubernetesLabelArraySerializer(item["labels"]),
    mode: item["mode"],
    taints: !item["taints"] ? item["taints"] : kubernetesLabelArraySerializer(item["taints"]),
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsSerializer(item["upgradeSettings"]),
    vmSkuName: item["vmSkuName"],
  };
}

export function _agentPoolPropertiesDeserializer(item: any) {
  return {
    administratorConfiguration: !item["administratorConfiguration"]
      ? item["administratorConfiguration"]
      : administratorConfigurationDeserializer(item["administratorConfiguration"]),
    agentOptions: !item["agentOptions"]
      ? item["agentOptions"]
      : agentOptionsDeserializer(item["agentOptions"]),
    attachedNetworkConfiguration: !item["attachedNetworkConfiguration"]
      ? item["attachedNetworkConfiguration"]
      : attachedNetworkConfigurationDeserializer(item["attachedNetworkConfiguration"]),
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    count: item["count"],
    labels: !item["labels"] ? item["labels"] : kubernetesLabelArrayDeserializer(item["labels"]),
    mode: item["mode"],
    taints: !item["taints"] ? item["taints"] : kubernetesLabelArrayDeserializer(item["taints"]),
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsDeserializer(item["upgradeSettings"]),
    vmSkuName: item["vmSkuName"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    kubernetesVersion: item["kubernetesVersion"],
    provisioningState: item["provisioningState"],
  };
}

export function _agentPoolPatchParametersPropertiesSerializer(item: AgentPoolPatchParameters): any {
  return {
    administratorConfiguration: !item["administratorConfiguration"]
      ? item["administratorConfiguration"]
      : nodePoolAdministratorConfigurationPatchSerializer(item["administratorConfiguration"]),
    count: item["count"],
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsSerializer(item["upgradeSettings"]),
  };
}

export function _kubernetesClusterFeaturePropertiesSerializer(item: KubernetesClusterFeature): any {
  return {
    options: !item["options"]
      ? item["options"]
      : stringKeyValuePairArraySerializer(item["options"]),
  };
}

export function _kubernetesClusterFeaturePropertiesDeserializer(item: any) {
  return {
    options: !item["options"]
      ? item["options"]
      : stringKeyValuePairArrayDeserializer(item["options"]),
    availabilityLifecycle: item["availabilityLifecycle"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    required: item["required"],
    version: item["version"],
    provisioningState: item["provisioningState"],
  };
}

export function _kubernetesClusterFeaturePatchParametersPropertiesSerializer(
  item: KubernetesClusterFeaturePatchParameters,
): any {
  return {
    options: !item["options"]
      ? item["options"]
      : stringKeyValuePairArraySerializer(item["options"]),
  };
}

export function _consolePropertiesSerializer(item: Console): any {
  return {
    enabled: item["enabled"],
    expiration: !item["expiration"] ? item["expiration"] : item["expiration"].toISOString(),
    sshPublicKey: sshPublicKeySerializer(item["sshPublicKey"]),
  };
}

export function _consolePropertiesDeserializer(item: any) {
  return {
    enabled: item["enabled"],
    expiration: !item["expiration"] ? item["expiration"] : new Date(item["expiration"]),
    sshPublicKey: sshPublicKeyDeserializer(item["sshPublicKey"]),
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    privateLinkServiceId: item["privateLinkServiceId"],
    virtualMachineAccessId: item["virtualMachineAccessId"],
    provisioningState: item["provisioningState"],
  };
}

export function _consolePatchParametersPropertiesSerializer(item: ConsolePatchParameters): any {
  return {
    enabled: item["enabled"],
    expiration: !item["expiration"] ? item["expiration"] : item["expiration"].toISOString(),
    sshPublicKey: !item["sshPublicKey"]
      ? item["sshPublicKey"]
      : sshPublicKeySerializer(item["sshPublicKey"]),
  };
}

export function _clusterMetricsConfigurationPropertiesSerializer(
  item: ClusterMetricsConfiguration,
): any {
  return {
    enabledMetrics: !item["enabledMetrics"]
      ? item["enabledMetrics"]
      : item["enabledMetrics"].map((p: any) => {
          return p;
        }),
    collectionInterval: item["collectionInterval"],
  };
}

export function _clusterMetricsConfigurationPropertiesDeserializer(item: any) {
  return {
    enabledMetrics: !item["enabledMetrics"]
      ? item["enabledMetrics"]
      : item["enabledMetrics"].map((p: any) => {
          return p;
        }),
    collectionInterval: item["collectionInterval"],
    detailedStatus: item["detailedStatus"],
    detailedStatusMessage: item["detailedStatusMessage"],
    disabledMetrics: !item["disabledMetrics"]
      ? item["disabledMetrics"]
      : item["disabledMetrics"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

export function _clusterMetricsConfigurationPatchParametersPropertiesSerializer(
  item: ClusterMetricsConfigurationPatchParameters,
): any {
  return {
    collectionInterval: item["collectionInterval"],
    enabledMetrics: !item["enabledMetrics"]
      ? item["enabledMetrics"]
      : item["enabledMetrics"].map((p: any) => {
          return p;
        }),
  };
}
