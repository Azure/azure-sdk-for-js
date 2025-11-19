// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and (de)serializers.
 * Disable this rule for deserializer functions which require 'any' for raw JSON input.
 */
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

/** Localized display information for and operation. */
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

/** The Access Control List resource definition. */
export interface AccessControlList extends TrackedResource {
  /** The Access ControlList properties */
  properties: AccessControlListProperties;
}

export function accessControlListSerializer(item: AccessControlList): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: accessControlListPropertiesSerializer(item["properties"]),
  };
}

export function accessControlListDeserializer(item: any): AccessControlList {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: accessControlListPropertiesDeserializer(item["properties"]),
  };
}

/** Access Control List Properties defines the resource properties. */
export interface AccessControlListProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** Input method to configure Access Control List. */
  configurationType: ConfigurationType;
  /** Access Control List file URL. */
  aclsUrl?: string;
  /** Default action that needs to be applied when no condition is matched. Example: Permit | Deny. */
  defaultAction?: CommunityActionTypes;
  /** List of match configurations. */
  matchConfigurations?: AccessControlListMatchConfiguration[];
  /** List of dynamic match configurations. */
  dynamicMatchConfigurations?: CommonDynamicMatchConfiguration[];
  /** The last synced timestamp. */
  readonly lastSyncedTime?: Date;
  /** Access Control List (ACL) Type */
  aclType?: AclType;
  /** Device Role */
  deviceRole?: DeviceRole;
  /** Global Access Control List (ACL) actions */
  globalAccessControlListActions?: GlobalAccessControlListActionProperties;
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Configuration state of the resource. */
  readonly configurationState?: ConfigurationState;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Administrative state of the resource. */
  readonly administrativeState?: AdministrativeState;
}

export function accessControlListPropertiesSerializer(item: AccessControlListProperties): any {
  return {
    annotation: item["annotation"],
    configurationType: item["configurationType"],
    aclsUrl: item["aclsUrl"],
    defaultAction: item["defaultAction"],
    matchConfigurations: !item["matchConfigurations"]
      ? item["matchConfigurations"]
      : accessControlListMatchConfigurationArraySerializer(item["matchConfigurations"]),
    dynamicMatchConfigurations: !item["dynamicMatchConfigurations"]
      ? item["dynamicMatchConfigurations"]
      : commonDynamicMatchConfigurationArraySerializer(item["dynamicMatchConfigurations"]),
    aclType: item["aclType"],
    deviceRole: item["deviceRole"],
    globalAccessControlListActions: !item["globalAccessControlListActions"]
      ? item["globalAccessControlListActions"]
      : globalAccessControlListActionPropertiesSerializer(item["globalAccessControlListActions"]),
  };
}

export function accessControlListPropertiesDeserializer(item: any): AccessControlListProperties {
  return {
    annotation: item["annotation"],
    configurationType: item["configurationType"],
    aclsUrl: item["aclsUrl"],
    defaultAction: item["defaultAction"],
    matchConfigurations: !item["matchConfigurations"]
      ? item["matchConfigurations"]
      : accessControlListMatchConfigurationArrayDeserializer(item["matchConfigurations"]),
    dynamicMatchConfigurations: !item["dynamicMatchConfigurations"]
      ? item["dynamicMatchConfigurations"]
      : commonDynamicMatchConfigurationArrayDeserializer(item["dynamicMatchConfigurations"]),
    lastSyncedTime: !item["lastSyncedTime"]
      ? item["lastSyncedTime"]
      : new Date(item["lastSyncedTime"]),
    aclType: item["aclType"],
    deviceRole: item["deviceRole"],
    globalAccessControlListActions: !item["globalAccessControlListActions"]
      ? item["globalAccessControlListActions"]
      : globalAccessControlListActionPropertiesDeserializer(item["globalAccessControlListActions"]),
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    configurationState: item["configurationState"],
    provisioningState: item["provisioningState"],
    administrativeState: item["administrativeState"],
  };
}

/** Input method to configure Access Control List. */
export enum KnownConfigurationType {
  /** File Configuration Type */
  File = "File",
  /** Inline Configuration Type */
  Inline = "Inline",
}

/**
 * Input method to configure Access Control List. \
 * {@link KnownConfigurationType} can be used interchangeably with ConfigurationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **File**: File Configuration Type \
 * **Inline**: Inline Configuration Type
 */
export type ConfigurationType = string;

/** Community action types. Example: Permit | Deny. */
export enum KnownCommunityActionTypes {
  /** Permit Community Action Types */
  Permit = "Permit",
  /** Deny Community Action Types */
  Deny = "Deny",
}

/**
 * Community action types. Example: Permit | Deny. \
 * {@link KnownCommunityActionTypes} can be used interchangeably with CommunityActionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Permit**: Permit Community Action Types \
 * **Deny**: Deny Community Action Types
 */
export type CommunityActionTypes = string;

export function accessControlListMatchConfigurationArraySerializer(
  result: Array<AccessControlListMatchConfiguration>,
): any[] {
  return result.map((item) => {
    return accessControlListMatchConfigurationSerializer(item);
  });
}

export function accessControlListMatchConfigurationArrayDeserializer(
  result: Array<AccessControlListMatchConfiguration>,
): any[] {
  return result.map((item) => {
    return accessControlListMatchConfigurationDeserializer(item);
  });
}

/** Defines the match configuration that are supported to filter the traffic. */
export interface AccessControlListMatchConfiguration {
  /** The name of the match configuration. */
  matchConfigurationName?: string;
  /** Sequence Number of the match configuration. */
  sequenceNumber?: number;
  /** Type of IP Address. IPv4 or IPv6 */
  ipAddressType?: IPAddressType;
  /** List of the match conditions. */
  matchConditions?: AccessControlListMatchCondition[];
  /** List of actions that need to be performed for the matched conditions. */
  actions?: AccessControlListAction[];
}

export function accessControlListMatchConfigurationSerializer(
  item: AccessControlListMatchConfiguration,
): any {
  return {
    matchConfigurationName: item["matchConfigurationName"],
    sequenceNumber: item["sequenceNumber"],
    ipAddressType: item["ipAddressType"],
    matchConditions: !item["matchConditions"]
      ? item["matchConditions"]
      : accessControlListMatchConditionArraySerializer(item["matchConditions"]),
    actions: !item["actions"]
      ? item["actions"]
      : accessControlListActionArraySerializer(item["actions"]),
  };
}

export function accessControlListMatchConfigurationDeserializer(
  item: any,
): AccessControlListMatchConfiguration {
  return {
    matchConfigurationName: item["matchConfigurationName"],
    sequenceNumber: item["sequenceNumber"],
    ipAddressType: item["ipAddressType"],
    matchConditions: !item["matchConditions"]
      ? item["matchConditions"]
      : accessControlListMatchConditionArrayDeserializer(item["matchConditions"]),
    actions: !item["actions"]
      ? item["actions"]
      : accessControlListActionArrayDeserializer(item["actions"]),
  };
}

/** IP Address type. */
export enum KnownIPAddressType {
  /** IPv4 IP address */
  IPv4 = "IPv4",
  /** IPv6 IP address */
  IPv6 = "IPv6",
}

/**
 * IP Address type. \
 * {@link KnownIPAddressType} can be used interchangeably with IPAddressType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPv4**: IPv4 IP address \
 * **IPv6**: IPv6 IP address
 */
export type IPAddressType = string;

export function accessControlListMatchConditionArraySerializer(
  result: Array<AccessControlListMatchCondition>,
): any[] {
  return result.map((item) => {
    return accessControlListMatchConditionSerializer(item);
  });
}

export function accessControlListMatchConditionArrayDeserializer(
  result: Array<AccessControlListMatchCondition>,
): any[] {
  return result.map((item) => {
    return accessControlListMatchConditionDeserializer(item);
  });
}

/** Defines the match condition that is supported to filter the traffic. */
export interface AccessControlListMatchCondition {
  /** List of the protocols that need to be matched. */
  protocolTypes?: string[];
  /** Vlan match condition that needs to be matched. */
  vlanMatchCondition?: VlanMatchCondition;
  /** IP condition that needs to be matched. */
  ipCondition?: IpMatchCondition;
  /** List of ether type values that need to be matched. */
  etherTypes?: string[];
  /** List of IP fragment packets that need to be matched. */
  fragments?: string[];
  /** List of IP Lengths that need to be matched. */
  ipLengths?: string[];
  /** List of TTL [Time To Live] values that need to be matched. */
  ttlValues?: string[];
  /** List of DSCP Markings that need to be matched. */
  dscpMarkings?: string[];
  /** Protocol neighbors that need to be matched. */
  protocolNeighbors?: string[];
  /** Defines the port condition that needs to be matched. */
  portCondition?: AccessControlListPortCondition;
  /** Internet Control Message Protocol (ICMP) configuration */
  icmpConfiguration?: IcmpConfigurationProperties;
}

export function accessControlListMatchConditionSerializer(
  item: AccessControlListMatchCondition,
): any {
  return {
    protocolTypes: !item["protocolTypes"]
      ? item["protocolTypes"]
      : item["protocolTypes"].map((p: any) => {
          return p;
        }),
    vlanMatchCondition: !item["vlanMatchCondition"]
      ? item["vlanMatchCondition"]
      : vlanMatchConditionSerializer(item["vlanMatchCondition"]),
    ipCondition: !item["ipCondition"]
      ? item["ipCondition"]
      : ipMatchConditionSerializer(item["ipCondition"]),
    etherTypes: !item["etherTypes"]
      ? item["etherTypes"]
      : item["etherTypes"].map((p: any) => {
          return p;
        }),
    fragments: !item["fragments"]
      ? item["fragments"]
      : item["fragments"].map((p: any) => {
          return p;
        }),
    ipLengths: !item["ipLengths"]
      ? item["ipLengths"]
      : item["ipLengths"].map((p: any) => {
          return p;
        }),
    ttlValues: !item["ttlValues"]
      ? item["ttlValues"]
      : item["ttlValues"].map((p: any) => {
          return p;
        }),
    dscpMarkings: !item["dscpMarkings"]
      ? item["dscpMarkings"]
      : item["dscpMarkings"].map((p: any) => {
          return p;
        }),
    protocolNeighbors: !item["protocolNeighbors"]
      ? item["protocolNeighbors"]
      : item["protocolNeighbors"].map((p: any) => {
          return p;
        }),
    portCondition: !item["portCondition"]
      ? item["portCondition"]
      : accessControlListPortConditionSerializer(item["portCondition"]),
    icmpConfiguration: !item["icmpConfiguration"]
      ? item["icmpConfiguration"]
      : icmpConfigurationPropertiesSerializer(item["icmpConfiguration"]),
  };
}

export function accessControlListMatchConditionDeserializer(
  item: any,
): AccessControlListMatchCondition {
  return {
    protocolTypes: !item["protocolTypes"]
      ? item["protocolTypes"]
      : item["protocolTypes"].map((p: any) => {
          return p;
        }),
    vlanMatchCondition: !item["vlanMatchCondition"]
      ? item["vlanMatchCondition"]
      : vlanMatchConditionDeserializer(item["vlanMatchCondition"]),
    ipCondition: !item["ipCondition"]
      ? item["ipCondition"]
      : ipMatchConditionDeserializer(item["ipCondition"]),
    etherTypes: !item["etherTypes"]
      ? item["etherTypes"]
      : item["etherTypes"].map((p: any) => {
          return p;
        }),
    fragments: !item["fragments"]
      ? item["fragments"]
      : item["fragments"].map((p: any) => {
          return p;
        }),
    ipLengths: !item["ipLengths"]
      ? item["ipLengths"]
      : item["ipLengths"].map((p: any) => {
          return p;
        }),
    ttlValues: !item["ttlValues"]
      ? item["ttlValues"]
      : item["ttlValues"].map((p: any) => {
          return p;
        }),
    dscpMarkings: !item["dscpMarkings"]
      ? item["dscpMarkings"]
      : item["dscpMarkings"].map((p: any) => {
          return p;
        }),
    protocolNeighbors: !item["protocolNeighbors"]
      ? item["protocolNeighbors"]
      : item["protocolNeighbors"].map((p: any) => {
          return p;
        }),
    portCondition: !item["portCondition"]
      ? item["portCondition"]
      : accessControlListPortConditionDeserializer(item["portCondition"]),
    icmpConfiguration: !item["icmpConfiguration"]
      ? item["icmpConfiguration"]
      : icmpConfigurationPropertiesDeserializer(item["icmpConfiguration"]),
  };
}

/** The vlan match conditions that need to be matched. */
export interface VlanMatchCondition {
  /** List of vlans that need to be matched. Inputs can be single vlan or the range of vlans. */
  vlans?: string[];
  /** List of inner vlans that need to be matched.Inputs can be single vlan or the range of vlans. */
  innerVlans?: string[];
  /** List of vlan group names that need to be matched. */
  vlanGroupNames?: string[];
}

export function vlanMatchConditionSerializer(item: VlanMatchCondition): any {
  return {
    vlans: !item["vlans"]
      ? item["vlans"]
      : item["vlans"].map((p: any) => {
          return p;
        }),
    innerVlans: !item["innerVlans"]
      ? item["innerVlans"]
      : item["innerVlans"].map((p: any) => {
          return p;
        }),
    vlanGroupNames: !item["vlanGroupNames"]
      ? item["vlanGroupNames"]
      : item["vlanGroupNames"].map((p: any) => {
          return p;
        }),
  };
}

export function vlanMatchConditionDeserializer(item: any): VlanMatchCondition {
  return {
    vlans: !item["vlans"]
      ? item["vlans"]
      : item["vlans"].map((p: any) => {
          return p;
        }),
    innerVlans: !item["innerVlans"]
      ? item["innerVlans"]
      : item["innerVlans"].map((p: any) => {
          return p;
        }),
    vlanGroupNames: !item["vlanGroupNames"]
      ? item["vlanGroupNames"]
      : item["vlanGroupNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Defines the condition that can be filtered using the selected IPs. */
export interface IpMatchCondition {
  /** IP Address type that needs to be matched. */
  type?: SourceDestinationType;
  /** IP Prefix Type that needs to be matched. */
  prefixType?: PrefixType;
  /** The list of IP Prefixes that need to be matched. */
  ipPrefixValues?: string[];
  /** The List of IP Group Names that need to be matched. */
  ipGroupNames?: string[];
}

export function ipMatchConditionSerializer(item: IpMatchCondition): any {
  return {
    type: item["type"],
    prefixType: item["prefixType"],
    ipPrefixValues: !item["ipPrefixValues"]
      ? item["ipPrefixValues"]
      : item["ipPrefixValues"].map((p: any) => {
          return p;
        }),
    ipGroupNames: !item["ipGroupNames"]
      ? item["ipGroupNames"]
      : item["ipGroupNames"].map((p: any) => {
          return p;
        }),
  };
}

export function ipMatchConditionDeserializer(item: any): IpMatchCondition {
  return {
    type: item["type"],
    prefixType: item["prefixType"],
    ipPrefixValues: !item["ipPrefixValues"]
      ? item["ipPrefixValues"]
      : item["ipPrefixValues"].map((p: any) => {
          return p;
        }),
    ipGroupNames: !item["ipGroupNames"]
      ? item["ipGroupNames"]
      : item["ipGroupNames"].map((p: any) => {
          return p;
        }),
  };
}

/** IP Address type that needs to be matched. */
export enum KnownSourceDestinationType {
  /** SourceDestinationType SourceIP */
  SourceIP = "SourceIP",
  /** SourceDestinationType DestinationIP */
  DestinationIP = "DestinationIP",
  /** SourceDestinationType Bidirectional */
  Bidirectional = "Bidirectional",
}

/**
 * IP Address type that needs to be matched. \
 * {@link KnownSourceDestinationType} can be used interchangeably with SourceDestinationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SourceIP**: SourceDestinationType SourceIP \
 * **DestinationIP**: SourceDestinationType DestinationIP \
 * **Bidirectional**: SourceDestinationType Bidirectional
 */
export type SourceDestinationType = string;

/** IP Prefix Type that needs to be matched. */
export enum KnownPrefixType {
  /** PrefixType Prefix */
  Prefix = "Prefix",
  /** PrefixType LongestPrefix */
  LongestPrefix = "LongestPrefix",
}

/**
 * IP Prefix Type that needs to be matched. \
 * {@link KnownPrefixType} can be used interchangeably with PrefixType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Prefix**: PrefixType Prefix \
 * **LongestPrefix**: PrefixType LongestPrefix
 */
export type PrefixType = string;

/** Defines the port condition that needs to be matched. */
export interface AccessControlListPortCondition {
  /** Port type that needs to be matched. */
  portType?: PortType;
  /** Layer4 protocol type that needs to be matched. */
  layer4Protocol: Layer4Protocol;
  /** List of the Ports that need to be matched. */
  ports?: string[];
  /** List of the port Group Names that need to be matched. */
  portGroupNames?: string[];
  /** List of protocol flags that need to be matched. Example: established | initial | <List-of-TCP-flags>. List of eligible TCP Flags are ack, fin, not-ack, not-fin, not-psh, not-rst, not-syn, not-urg, psh, rst, syn, urg */
  flags?: string[];
}

export function accessControlListPortConditionSerializer(
  item: AccessControlListPortCondition,
): any {
  return {
    portType: item["portType"],
    layer4Protocol: item["layer4Protocol"],
    ports: !item["ports"]
      ? item["ports"]
      : item["ports"].map((p: any) => {
          return p;
        }),
    portGroupNames: !item["portGroupNames"]
      ? item["portGroupNames"]
      : item["portGroupNames"].map((p: any) => {
          return p;
        }),
    flags: !item["flags"]
      ? item["flags"]
      : item["flags"].map((p: any) => {
          return p;
        }),
  };
}

export function accessControlListPortConditionDeserializer(
  item: any,
): AccessControlListPortCondition {
  return {
    portType: item["portType"],
    layer4Protocol: item["layer4Protocol"],
    ports: !item["ports"]
      ? item["ports"]
      : item["ports"].map((p: any) => {
          return p;
        }),
    portGroupNames: !item["portGroupNames"]
      ? item["portGroupNames"]
      : item["portGroupNames"].map((p: any) => {
          return p;
        }),
    flags: !item["flags"]
      ? item["flags"]
      : item["flags"].map((p: any) => {
          return p;
        }),
  };
}

/** Port type that needs to be matched. */
export enum KnownPortType {
  /** PortType SourcePort */
  SourcePort = "SourcePort",
  /** PortType DestinationPort */
  DestinationPort = "DestinationPort",
  /** PortType Bidirectional */
  Bidirectional = "Bidirectional",
}

/**
 * Port type that needs to be matched. \
 * {@link KnownPortType} can be used interchangeably with PortType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SourcePort**: PortType SourcePort \
 * **DestinationPort**: PortType DestinationPort \
 * **Bidirectional**: PortType Bidirectional
 */
export type PortType = string;

/** Layer4 protocol type that needs to be matched. */
export enum KnownLayer4Protocol {
  /** TCP(Transmission Control Protocol) Protocol */
  TCP = "TCP",
  /** UDP(User Datagram Protocol) Protocol */
  UDP = "UDP",
  /** SCTP(Streaming Control Transmission Protocol) Protocol */
  Sctp = "SCTP",
}

/**
 * Layer4 protocol type that needs to be matched. \
 * {@link KnownLayer4Protocol} can be used interchangeably with Layer4Protocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TCP**: TCP(Transmission Control Protocol) Protocol \
 * **UDP**: UDP(User Datagram Protocol) Protocol \
 * **SCTP**: SCTP(Streaming Control Transmission Protocol) Protocol
 */
export type Layer4Protocol = string;

/** Internet Control Message Protocol (ICMP) configuration */
export interface IcmpConfigurationProperties {
  /** Internet Control Message Protocol (ICMP) types */
  icmpTypes?: string[];
}

export function icmpConfigurationPropertiesSerializer(item: IcmpConfigurationProperties): any {
  return {
    icmpTypes: !item["icmpTypes"]
      ? item["icmpTypes"]
      : item["icmpTypes"].map((p: any) => {
          return p;
        }),
  };
}

export function icmpConfigurationPropertiesDeserializer(item: any): IcmpConfigurationProperties {
  return {
    icmpTypes: !item["icmpTypes"]
      ? item["icmpTypes"]
      : item["icmpTypes"].map((p: any) => {
          return p;
        }),
  };
}

export function accessControlListActionArraySerializer(
  result: Array<AccessControlListAction>,
): any[] {
  return result.map((item) => {
    return accessControlListActionSerializer(item);
  });
}

export function accessControlListActionArrayDeserializer(
  result: Array<AccessControlListAction>,
): any[] {
  return result.map((item) => {
    return accessControlListActionDeserializer(item);
  });
}

/** Action that need to performed. */
export interface AccessControlListAction {
  /** Type of actions that can be performed. */
  type?: AclActionType;
  /** Name of the counter block to get match count information. */
  counterName?: string;
  /** Remark comment */
  remarkComment?: string;
  /** Police rate configuration */
  policeRateConfiguration?: PoliceRateConfigurationProperties;
}

export function accessControlListActionSerializer(item: AccessControlListAction): any {
  return {
    type: item["type"],
    counterName: item["counterName"],
    remarkComment: item["remarkComment"],
    policeRateConfiguration: !item["policeRateConfiguration"]
      ? item["policeRateConfiguration"]
      : policeRateConfigurationPropertiesSerializer(item["policeRateConfiguration"]),
  };
}

export function accessControlListActionDeserializer(item: any): AccessControlListAction {
  return {
    type: item["type"],
    counterName: item["counterName"],
    remarkComment: item["remarkComment"],
    policeRateConfiguration: !item["policeRateConfiguration"]
      ? item["policeRateConfiguration"]
      : policeRateConfigurationPropertiesDeserializer(item["policeRateConfiguration"]),
  };
}

/** Type of actions that can be performed. */
export enum KnownAclActionType {
  /** AclActionType Drop */
  Drop = "Drop",
  /** AclActionType Count */
  Count = "Count",
  /** AclActionType Log */
  Log = "Log",
  /** AclActionType Remark */
  Remark = "Remark",
  /** AclActionType PoliceRate */
  PoliceRate = "PoliceRate",
}

/**
 * Type of actions that can be performed. \
 * {@link KnownAclActionType} can be used interchangeably with AclActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Drop**: AclActionType Drop \
 * **Count**: AclActionType Count \
 * **Log**: AclActionType Log \
 * **Remark**: AclActionType Remark \
 * **PoliceRate**: AclActionType PoliceRate
 */
export type AclActionType = string;

/** Police rate configuration properties */
export interface PoliceRateConfigurationProperties {
  /** Rate limit in bits per second. */
  bitRate?: BitRate;
  /** Burst size in packets. */
  burstSize?: BurstSize;
}

export function policeRateConfigurationPropertiesSerializer(
  item: PoliceRateConfigurationProperties,
): any {
  return {
    bitRate: !item["bitRate"] ? item["bitRate"] : bitRateSerializer(item["bitRate"]),
    burstSize: !item["burstSize"] ? item["burstSize"] : burstSizeSerializer(item["burstSize"]),
  };
}

export function policeRateConfigurationPropertiesDeserializer(
  item: any,
): PoliceRateConfigurationProperties {
  return {
    bitRate: !item["bitRate"] ? item["bitRate"] : bitRateDeserializer(item["bitRate"]),
    burstSize: !item["burstSize"] ? item["burstSize"] : burstSizeDeserializer(item["burstSize"]),
  };
}

/** Bit rate in bits per second. */
export interface BitRate {
  /** Bitrate. */
  rate?: number;
  /** Bitrate unit. */
  unit?: BitRateUnit;
}

export function bitRateSerializer(item: BitRate): any {
  return { rate: item["rate"], unit: item["unit"] };
}

export function bitRateDeserializer(item: any): BitRate {
  return {
    rate: item["rate"],
    unit: item["unit"],
  };
}

/** Bit rate unit. */
export enum KnownBitRateUnit {
  /** Bit rate unit in bits per second. */
  Bps = "bps",
  /** Bit rate unit in kilobits per second. */
  Kbps = "Kbps",
  /** Bit rate unit in megabits per second. */
  Mbps = "Mbps",
  /** Bit rate unit in gigabits per second. */
  Gbps = "Gbps",
}

/**
 * Bit rate unit. \
 * {@link KnownBitRateUnit} can be used interchangeably with BitRateUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **bps**: Bit rate unit in bits per second. \
 * **Kbps**: Bit rate unit in kilobits per second. \
 * **Mbps**: Bit rate unit in megabits per second. \
 * **Gbps**: Bit rate unit in gigabits per second.
 */
export type BitRateUnit = string;

/** Burst size in packets. */
export interface BurstSize {
  /** Burst size. */
  size?: number;
  /** Burst size unit. */
  unit?: BurstSizeUnit;
}

export function burstSizeSerializer(item: BurstSize): any {
  return { size: item["size"], unit: item["unit"] };
}

export function burstSizeDeserializer(item: any): BurstSize {
  return {
    size: item["size"],
    unit: item["unit"],
  };
}

/** Burst size unit in packets. */
export enum KnownBurstSizeUnit {
  /** Burst size unit in bytes. */
  Bytes = "Bytes",
  /** Burst size unit in kilobytes. */
  KBytes = "KBytes",
  /** Burst size unit in megabytes. */
  MBytes = "MBytes",
  /** Burst size unit in gigabytes. */
  GBytes = "GBytes",
}

/**
 * Burst size unit in packets. \
 * {@link KnownBurstSizeUnit} can be used interchangeably with BurstSizeUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Bytes**: Burst size unit in bytes. \
 * **KBytes**: Burst size unit in kilobytes. \
 * **MBytes**: Burst size unit in megabytes. \
 * **GBytes**: Burst size unit in gigabytes.
 */
export type BurstSizeUnit = string;

export function commonDynamicMatchConfigurationArraySerializer(
  result: Array<CommonDynamicMatchConfiguration>,
): any[] {
  return result.map((item) => {
    return commonDynamicMatchConfigurationSerializer(item);
  });
}

export function commonDynamicMatchConfigurationArrayDeserializer(
  result: Array<CommonDynamicMatchConfiguration>,
): any[] {
  return result.map((item) => {
    return commonDynamicMatchConfigurationDeserializer(item);
  });
}

/** Dynamic match configuration object. */
export interface CommonDynamicMatchConfiguration {
  /** List of IP Groups. */
  ipGroups?: IpGroupProperties[];
  /** List of vlan groups. */
  vlanGroups?: VlanGroupProperties[];
  /** List of the port groups. */
  portGroups?: PortGroupProperties[];
}

export function commonDynamicMatchConfigurationSerializer(
  item: CommonDynamicMatchConfiguration,
): any {
  return {
    ipGroups: !item["ipGroups"]
      ? item["ipGroups"]
      : ipGroupPropertiesArraySerializer(item["ipGroups"]),
    vlanGroups: !item["vlanGroups"]
      ? item["vlanGroups"]
      : vlanGroupPropertiesArraySerializer(item["vlanGroups"]),
    portGroups: !item["portGroups"]
      ? item["portGroups"]
      : portGroupPropertiesArraySerializer(item["portGroups"]),
  };
}

export function commonDynamicMatchConfigurationDeserializer(
  item: any,
): CommonDynamicMatchConfiguration {
  return {
    ipGroups: !item["ipGroups"]
      ? item["ipGroups"]
      : ipGroupPropertiesArrayDeserializer(item["ipGroups"]),
    vlanGroups: !item["vlanGroups"]
      ? item["vlanGroups"]
      : vlanGroupPropertiesArrayDeserializer(item["vlanGroups"]),
    portGroups: !item["portGroups"]
      ? item["portGroups"]
      : portGroupPropertiesArrayDeserializer(item["portGroups"]),
  };
}

export function ipGroupPropertiesArraySerializer(result: Array<IpGroupProperties>): any[] {
  return result.map((item) => {
    return ipGroupPropertiesSerializer(item);
  });
}

export function ipGroupPropertiesArrayDeserializer(result: Array<IpGroupProperties>): any[] {
  return result.map((item) => {
    return ipGroupPropertiesDeserializer(item);
  });
}

/** IP Group properties. */
export interface IpGroupProperties {
  /** IP Group name. */
  name?: string;
  /** IP Address type. */
  ipAddressType?: IPAddressType;
  /** List of IP Prefixes. */
  ipPrefixes?: string[];
}

export function ipGroupPropertiesSerializer(item: IpGroupProperties): any {
  return {
    name: item["name"],
    ipAddressType: item["ipAddressType"],
    ipPrefixes: !item["ipPrefixes"]
      ? item["ipPrefixes"]
      : item["ipPrefixes"].map((p: any) => {
          return p;
        }),
  };
}

export function ipGroupPropertiesDeserializer(item: any): IpGroupProperties {
  return {
    name: item["name"],
    ipAddressType: item["ipAddressType"],
    ipPrefixes: !item["ipPrefixes"]
      ? item["ipPrefixes"]
      : item["ipPrefixes"].map((p: any) => {
          return p;
        }),
  };
}

export function vlanGroupPropertiesArraySerializer(result: Array<VlanGroupProperties>): any[] {
  return result.map((item) => {
    return vlanGroupPropertiesSerializer(item);
  });
}

export function vlanGroupPropertiesArrayDeserializer(result: Array<VlanGroupProperties>): any[] {
  return result.map((item) => {
    return vlanGroupPropertiesDeserializer(item);
  });
}

/** Vlan group properties. */
export interface VlanGroupProperties {
  /** Vlan group name. */
  name?: string;
  /** List of vlans. */
  vlans?: string[];
}

export function vlanGroupPropertiesSerializer(item: VlanGroupProperties): any {
  return {
    name: item["name"],
    vlans: !item["vlans"]
      ? item["vlans"]
      : item["vlans"].map((p: any) => {
          return p;
        }),
  };
}

export function vlanGroupPropertiesDeserializer(item: any): VlanGroupProperties {
  return {
    name: item["name"],
    vlans: !item["vlans"]
      ? item["vlans"]
      : item["vlans"].map((p: any) => {
          return p;
        }),
  };
}

export function portGroupPropertiesArraySerializer(result: Array<PortGroupProperties>): any[] {
  return result.map((item) => {
    return portGroupPropertiesSerializer(item);
  });
}

export function portGroupPropertiesArrayDeserializer(result: Array<PortGroupProperties>): any[] {
  return result.map((item) => {
    return portGroupPropertiesDeserializer(item);
  });
}

/** Port Group properties. */
export interface PortGroupProperties {
  /** The name of the port group. */
  name?: string;
  /** List of the ports that need to be matched. */
  ports?: string[];
}

export function portGroupPropertiesSerializer(item: PortGroupProperties): any {
  return {
    name: item["name"],
    ports: !item["ports"]
      ? item["ports"]
      : item["ports"].map((p: any) => {
          return p;
        }),
  };
}

export function portGroupPropertiesDeserializer(item: any): PortGroupProperties {
  return {
    name: item["name"],
    ports: !item["ports"]
      ? item["ports"]
      : item["ports"].map((p: any) => {
          return p;
        }),
  };
}

/** Access Control List (ACL) Type */
export enum KnownAclType {
  /** AclType Control Plane Traffic Policy */
  Cp = "ControlPlaneTrafficPolicy",
  /** AclType Tenant */
  Tenant = "Tenant",
  /** AclType Management */
  Management = "Management",
}

/**
 * Access Control List (ACL) Type \
 * {@link KnownAclType} can be used interchangeably with AclType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ControlPlaneTrafficPolicy**: AclType Control Plane Traffic Policy \
 * **Tenant**: AclType Tenant \
 * **Management**: AclType Management
 */
export type AclType = string;

/** Device Role */
export enum KnownDeviceRole {
  /** DeviceRole - Customer Edge (CE) */
  CE = "CE",
  /** DeviceRole - Top of Rack (ToR) */
  ToR = "ToR",
  /** DeviceRole - Network Packet Broker (NPB) */
  NPB = "NPB",
  /** Device Role Management Switch */
  ManagementSwitch = "ManagementSwitch",
}

/**
 * Device Role \
 * {@link KnownDeviceRole} can be used interchangeably with DeviceRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CE**: DeviceRole - Customer Edge (CE) \
 * **ToR**: DeviceRole - Top of Rack (ToR) \
 * **NPB**: DeviceRole - Network Packet Broker (NPB) \
 * **ManagementSwitch**: Device Role Management Switch
 */
export type DeviceRole = string;

/** Global Access Control List actions properties */
export interface GlobalAccessControlListActionProperties {
  /** Configuration to enable or disable ACL action count. */
  enableCount?: BooleanEnumProperty;
}

export function globalAccessControlListActionPropertiesSerializer(
  item: GlobalAccessControlListActionProperties,
): any {
  return { enableCount: item["enableCount"] };
}

export function globalAccessControlListActionPropertiesDeserializer(
  item: any,
): GlobalAccessControlListActionProperties {
  return {
    enableCount: item["enableCount"],
  };
}

/** Boolean union. Example- True/False */
export enum KnownBooleanEnumProperty {
  /** EnumProperty-True */
  True = "True",
  /** EnumProperty-False */
  False = "False",
}

/**
 * Boolean union. Example- True/False \
 * {@link KnownBooleanEnumProperty} can be used interchangeably with BooleanEnumProperty,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: EnumProperty-True \
 * **False**: EnumProperty-False
 */
export type BooleanEnumProperty = string;

/** Details of the last operations performed on the resource */
export interface LastOperationProperties {
  /** Details status of the last operation performed on the resource. */
  readonly details?: string;
}

export function lastOperationPropertiesDeserializer(item: any): LastOperationProperties {
  return {
    details: item["details"],
  };
}

/** Configuration state for the resource. */
export enum KnownConfigurationState {
  /** Success Configuration State */
  Succeeded = "Succeeded",
  /** Failed Configuration State */
  Failed = "Failed",
  /** Rejected Configuration State */
  Rejected = "Rejected",
  /** Accepted Configuration State */
  Accepted = "Accepted",
  /** Provisioned Configuration State */
  Provisioned = "Provisioned",
  /** ErrorProvisioning Configuration State */
  ErrorProvisioning = "ErrorProvisioning",
  /** Deprovisioning Configuration State */
  Deprovisioning = "Deprovisioning",
  /** Deprovisioned Configuration State */
  Deprovisioned = "Deprovisioned",
  /** ErrorDeprovisioning Configuration State */
  ErrorDeprovisioning = "ErrorDeprovisioning",
  /** DeferredControl Configuration State */
  DeferredControl = "DeferredControl",
  /** Provisioning Configuration State */
  Provisioning = "Provisioning",
  /** PendingCommit Configuration State */
  PendingCommit = "PendingCommit",
}

/**
 * Configuration state for the resource. \
 * {@link KnownConfigurationState} can be used interchangeably with ConfigurationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Success Configuration State \
 * **Failed**: Failed Configuration State \
 * **Rejected**: Rejected Configuration State \
 * **Accepted**: Accepted Configuration State \
 * **Provisioned**: Provisioned Configuration State \
 * **ErrorProvisioning**: ErrorProvisioning Configuration State \
 * **Deprovisioning**: Deprovisioning Configuration State \
 * **Deprovisioned**: Deprovisioned Configuration State \
 * **ErrorDeprovisioning**: ErrorDeprovisioning Configuration State \
 * **DeferredControl**: DeferredControl Configuration State \
 * **Provisioning**: Provisioning Configuration State \
 * **PendingCommit**: PendingCommit Configuration State
 */
export type ConfigurationState = string;

/** The current provisioning state. */
export enum KnownProvisioningState {
  /** Accepted Provisioning State */
  Accepted = "Accepted",
  /** Succeeded Provisioning State */
  Succeeded = "Succeeded",
  /** Updating Provisioning State */
  Updating = "Updating",
  /** Deleting Provisioning State */
  Deleting = "Deleting",
  /** Failed Provisioning State */
  Failed = "Failed",
  /** Canceled Provisioning State */
  Canceled = "Canceled",
}

/**
 * The current provisioning state. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: Accepted Provisioning State \
 * **Succeeded**: Succeeded Provisioning State \
 * **Updating**: Updating Provisioning State \
 * **Deleting**: Deleting Provisioning State \
 * **Failed**: Failed Provisioning State \
 * **Canceled**: Canceled Provisioning State
 */
export type ProvisioningState = string;

/** State defined to represent administrative actions or post actions on a particular resource. */
export enum KnownAdministrativeState {
  /** Enabled Administrative State */
  Enabled = "Enabled",
  /** Disabled Administrative State */
  Disabled = "Disabled",
  /** MAT(Manual Action Taken) Administrative State */
  MAT = "MAT",
  /** RMA(Return Material Authorization) Administrative State */
  RMA = "RMA",
  /** UnderMaintenance Administrative State */
  UnderMaintenance = "UnderMaintenance",
}

/**
 * State defined to represent administrative actions or post actions on a particular resource. \
 * {@link KnownAdministrativeState} can be used interchangeably with AdministrativeState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled Administrative State \
 * **Disabled**: Disabled Administrative State \
 * **MAT**: MAT(Manual Action Taken) Administrative State \
 * **RMA**: RMA(Return Material Authorization) Administrative State \
 * **UnderMaintenance**: UnderMaintenance Administrative State
 */
export type AdministrativeState = string;

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

/** The Access Control Lists patch resource definition. */
export interface AccessControlListPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Access Control Lists patch properties. */
  properties?: AccessControlListPatchProperties;
}

export function accessControlListPatchSerializer(item: AccessControlListPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : accessControlListPatchPropertiesSerializer(item["properties"]),
  };
}

/** Access Control Lists patch properties. */
export interface AccessControlListPatchProperties {
  /** Input method to configure Access Control List. */
  configurationType?: ConfigurationType;
  /** Access Control List file URL. */
  aclsUrl?: string;
  /** Default action that needs to be applied when no condition is matched. Example: Permit | Deny. */
  defaultAction?: CommunityActionTypes;
  /** List of match configurations. */
  matchConfigurations?: AccessControlListMatchConfigurationPatch[];
  /** List of dynamic match configurations. */
  dynamicMatchConfigurations?: CommonDynamicMatchConfigurationPatch[];
  /** Access Control List (ACL) Type */
  aclType?: AclType;
  /** Device Role */
  deviceRole?: DeviceRole;
  /** Global Access Control List (ACL) actions */
  globalAccessControlListActions?: GlobalAccessControlListActionPatchProperties;
  /** Switch configuration description. */
  annotation?: string;
}

export function accessControlListPatchPropertiesSerializer(
  item: AccessControlListPatchProperties,
): any {
  return {
    configurationType: item["configurationType"],
    aclsUrl: item["aclsUrl"],
    defaultAction: item["defaultAction"],
    matchConfigurations: !item["matchConfigurations"]
      ? item["matchConfigurations"]
      : accessControlListMatchConfigurationPatchArraySerializer(item["matchConfigurations"]),
    dynamicMatchConfigurations: !item["dynamicMatchConfigurations"]
      ? item["dynamicMatchConfigurations"]
      : commonDynamicMatchConfigurationPatchArraySerializer(item["dynamicMatchConfigurations"]),
    aclType: item["aclType"],
    deviceRole: item["deviceRole"],
    globalAccessControlListActions: !item["globalAccessControlListActions"]
      ? item["globalAccessControlListActions"]
      : globalAccessControlListActionPatchPropertiesSerializer(
          item["globalAccessControlListActions"],
        ),
    annotation: item["annotation"],
  };
}

export function accessControlListMatchConfigurationPatchArraySerializer(
  result: Array<AccessControlListMatchConfigurationPatch>,
): any[] {
  return result.map((item) => {
    return accessControlListMatchConfigurationPatchSerializer(item);
  });
}

/** Defines the match configuration that are supported to filter the traffic. */
export interface AccessControlListMatchConfigurationPatch {
  /** The name of the match configuration. */
  matchConfigurationName?: string;
  /** Sequence Number of the match configuration. */
  sequenceNumber?: number;
  /** Type of IP Address. IPv4 or IPv6 */
  ipAddressType?: IPAddressType;
  /** List of the match conditions. */
  matchConditions?: AccessControlListMatchConditionPatch[];
  /** List of actions that need to be performed for the matched conditions. */
  actions?: AccessControlListActionPatch[];
}

export function accessControlListMatchConfigurationPatchSerializer(
  item: AccessControlListMatchConfigurationPatch,
): any {
  return {
    matchConfigurationName: item["matchConfigurationName"],
    sequenceNumber: item["sequenceNumber"],
    ipAddressType: item["ipAddressType"],
    matchConditions: !item["matchConditions"]
      ? item["matchConditions"]
      : accessControlListMatchConditionPatchArraySerializer(item["matchConditions"]),
    actions: !item["actions"]
      ? item["actions"]
      : accessControlListActionPatchArraySerializer(item["actions"]),
  };
}

export function accessControlListMatchConditionPatchArraySerializer(
  result: Array<AccessControlListMatchConditionPatch>,
): any[] {
  return result.map((item) => {
    return accessControlListMatchConditionPatchSerializer(item);
  });
}

/** Defines the match condition that is supported to filter the traffic. */
export interface AccessControlListMatchConditionPatch {
  /** List of the protocols that need to be matched. */
  protocolTypes?: string[];
  /** Vlan match condition that needs to be matched. */
  vlanMatchCondition?: VlanMatchConditionPatch;
  /** IP condition that needs to be matched. */
  ipCondition?: IpMatchConditionPatch;
  /** List of ether type values that need to be matched. */
  etherTypes?: string[];
  /** List of IP fragment packets that need to be matched. */
  fragments?: string[];
  /** List of IP Lengths that need to be matched. */
  ipLengths?: string[];
  /** List of TTL [Time To Live] values that need to be matched. */
  ttlValues?: string[];
  /** List of DSCP Markings that need to be matched. */
  dscpMarkings?: string[];
  /** Defines the port condition that needs to be matched. */
  portCondition?: AccessControlListPortConditionPatch;
  /** Protocol neighbors that need to be matched. */
  protocolNeighbors?: string[];
  /** Internet Control Message Protocol (ICMP) configuration */
  icmpConfiguration?: IcmpConfigurationPatchProperties;
}

export function accessControlListMatchConditionPatchSerializer(
  item: AccessControlListMatchConditionPatch,
): any {
  return {
    protocolTypes: !item["protocolTypes"]
      ? item["protocolTypes"]
      : item["protocolTypes"].map((p: any) => {
          return p;
        }),
    vlanMatchCondition: !item["vlanMatchCondition"]
      ? item["vlanMatchCondition"]
      : vlanMatchConditionPatchSerializer(item["vlanMatchCondition"]),
    ipCondition: !item["ipCondition"]
      ? item["ipCondition"]
      : ipMatchConditionPatchSerializer(item["ipCondition"]),
    etherTypes: !item["etherTypes"]
      ? item["etherTypes"]
      : item["etherTypes"].map((p: any) => {
          return p;
        }),
    fragments: !item["fragments"]
      ? item["fragments"]
      : item["fragments"].map((p: any) => {
          return p;
        }),
    ipLengths: !item["ipLengths"]
      ? item["ipLengths"]
      : item["ipLengths"].map((p: any) => {
          return p;
        }),
    ttlValues: !item["ttlValues"]
      ? item["ttlValues"]
      : item["ttlValues"].map((p: any) => {
          return p;
        }),
    dscpMarkings: !item["dscpMarkings"]
      ? item["dscpMarkings"]
      : item["dscpMarkings"].map((p: any) => {
          return p;
        }),
    portCondition: !item["portCondition"]
      ? item["portCondition"]
      : accessControlListPortConditionPatchSerializer(item["portCondition"]),
    protocolNeighbors: !item["protocolNeighbors"]
      ? item["protocolNeighbors"]
      : item["protocolNeighbors"].map((p: any) => {
          return p;
        }),
    icmpConfiguration: !item["icmpConfiguration"]
      ? item["icmpConfiguration"]
      : icmpConfigurationPatchPropertiesSerializer(item["icmpConfiguration"]),
  };
}

/** The vlan match conditions that need to be matched. */
export interface VlanMatchConditionPatch {
  /** List of vlans that need to be matched. Inputs can be single vlan or the range of vlans. */
  vlans?: string[];
  /** List of inner vlans that need to be matched.Inputs can be single vlan or the range of vlans. */
  innerVlans?: string[];
  /** List of vlan group names that need to be matched. */
  vlanGroupNames?: string[];
}

export function vlanMatchConditionPatchSerializer(item: VlanMatchConditionPatch): any {
  return {
    vlans: !item["vlans"]
      ? item["vlans"]
      : item["vlans"].map((p: any) => {
          return p;
        }),
    innerVlans: !item["innerVlans"]
      ? item["innerVlans"]
      : item["innerVlans"].map((p: any) => {
          return p;
        }),
    vlanGroupNames: !item["vlanGroupNames"]
      ? item["vlanGroupNames"]
      : item["vlanGroupNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Defines the condition that can be filtered using the selected IPs. */
export interface IpMatchConditionPatch {
  /** IP Address type that needs to be matched. */
  type?: SourceDestinationType;
  /** IP Prefix Type that needs to be matched. */
  prefixType?: PrefixType;
  /** The list of IP Prefixes that need to be matched. */
  ipPrefixValues?: string[];
  /** The List of IP Group Names that need to be matched. */
  ipGroupNames?: string[];
}

export function ipMatchConditionPatchSerializer(item: IpMatchConditionPatch): any {
  return {
    type: item["type"],
    prefixType: item["prefixType"],
    ipPrefixValues: !item["ipPrefixValues"]
      ? item["ipPrefixValues"]
      : item["ipPrefixValues"].map((p: any) => {
          return p;
        }),
    ipGroupNames: !item["ipGroupNames"]
      ? item["ipGroupNames"]
      : item["ipGroupNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Defines the port condition that needs to be matched. */
export interface AccessControlListPortConditionPatch {
  /** Port type that needs to be matched. */
  portType?: PortType;
  /** Layer4 protocol type that needs to be matched. */
  layer4Protocol?: Layer4Protocol;
  /** List of the Ports that need to be matched. */
  ports?: string[];
  /** List of the port Group Names that need to be matched. */
  portGroupNames?: string[];
  /** List of protocol flags that need to be matched. Example: established | initial | <List-of-TCP-flags>. List of eligible TCP Flags are ack, fin, not-ack, not-fin, not-psh, not-rst, not-syn, not-urg, psh, rst, syn, urg */
  flags?: string[];
}

export function accessControlListPortConditionPatchSerializer(
  item: AccessControlListPortConditionPatch,
): any {
  return {
    portType: item["portType"],
    layer4Protocol: item["layer4Protocol"],
    ports: !item["ports"]
      ? item["ports"]
      : item["ports"].map((p: any) => {
          return p;
        }),
    portGroupNames: !item["portGroupNames"]
      ? item["portGroupNames"]
      : item["portGroupNames"].map((p: any) => {
          return p;
        }),
    flags: !item["flags"]
      ? item["flags"]
      : item["flags"].map((p: any) => {
          return p;
        }),
  };
}

/** Internet Control Message Protocol (ICMP) configuration patch properties */
export interface IcmpConfigurationPatchProperties {
  /** Internet Control Message Protocol (ICMP) types */
  icmpTypes?: string[];
}

export function icmpConfigurationPatchPropertiesSerializer(
  item: IcmpConfigurationPatchProperties,
): any {
  return {
    icmpTypes: !item["icmpTypes"]
      ? item["icmpTypes"]
      : item["icmpTypes"].map((p: any) => {
          return p;
        }),
  };
}

export function accessControlListActionPatchArraySerializer(
  result: Array<AccessControlListActionPatch>,
): any[] {
  return result.map((item) => {
    return accessControlListActionPatchSerializer(item);
  });
}

/** Action that need to be performed */
export interface AccessControlListActionPatch {
  /** Type of actions that can be performed. */
  type?: AclActionType;
  /** Name of the counter block to get match count information. */
  counterName?: string;
  /** Remark comment */
  remarkComment?: string;
  /** Police rate configuration */
  policeRateConfiguration?: PoliceRateConfigurationProperties;
}

export function accessControlListActionPatchSerializer(item: AccessControlListActionPatch): any {
  return {
    type: item["type"],
    counterName: item["counterName"],
    remarkComment: item["remarkComment"],
    policeRateConfiguration: !item["policeRateConfiguration"]
      ? item["policeRateConfiguration"]
      : policeRateConfigurationPropertiesSerializer(item["policeRateConfiguration"]),
  };
}

export function commonDynamicMatchConfigurationPatchArraySerializer(
  result: Array<CommonDynamicMatchConfigurationPatch>,
): any[] {
  return result.map((item) => {
    return commonDynamicMatchConfigurationPatchSerializer(item);
  });
}

/** Dynamic match configuration object. */
export interface CommonDynamicMatchConfigurationPatch {
  /** List of IP Groups. */
  ipGroups?: IpGroupPatchProperties[];
  /** List of vlan groups. */
  vlanGroups?: VlanGroupPatchProperties[];
  /** List of the port groups. */
  portGroups?: PortGroupPatchProperties[];
}

export function commonDynamicMatchConfigurationPatchSerializer(
  item: CommonDynamicMatchConfigurationPatch,
): any {
  return {
    ipGroups: !item["ipGroups"]
      ? item["ipGroups"]
      : ipGroupPatchPropertiesArraySerializer(item["ipGroups"]),
    vlanGroups: !item["vlanGroups"]
      ? item["vlanGroups"]
      : vlanGroupPatchPropertiesArraySerializer(item["vlanGroups"]),
    portGroups: !item["portGroups"]
      ? item["portGroups"]
      : portGroupPatchPropertiesArraySerializer(item["portGroups"]),
  };
}

export function ipGroupPatchPropertiesArraySerializer(
  result: Array<IpGroupPatchProperties>,
): any[] {
  return result.map((item) => {
    return ipGroupPatchPropertiesSerializer(item);
  });
}

/** IP Group properties. */
export interface IpGroupPatchProperties {
  /** IP Group name. */
  name?: string;
  /** IP Address type. */
  ipAddressType?: IPAddressType;
  /** List of IP Prefixes. */
  ipPrefixes?: string[];
}

export function ipGroupPatchPropertiesSerializer(item: IpGroupPatchProperties): any {
  return {
    name: item["name"],
    ipAddressType: item["ipAddressType"],
    ipPrefixes: !item["ipPrefixes"]
      ? item["ipPrefixes"]
      : item["ipPrefixes"].map((p: any) => {
          return p;
        }),
  };
}

export function vlanGroupPatchPropertiesArraySerializer(
  result: Array<VlanGroupPatchProperties>,
): any[] {
  return result.map((item) => {
    return vlanGroupPatchPropertiesSerializer(item);
  });
}

/** Vlan group properties. */
export interface VlanGroupPatchProperties {
  /** Vlan group name. */
  name?: string;
  /** List of vlans. */
  vlans?: string[];
}

export function vlanGroupPatchPropertiesSerializer(item: VlanGroupPatchProperties): any {
  return {
    name: item["name"],
    vlans: !item["vlans"]
      ? item["vlans"]
      : item["vlans"].map((p: any) => {
          return p;
        }),
  };
}

export function portGroupPatchPropertiesArraySerializer(
  result: Array<PortGroupPatchProperties>,
): any[] {
  return result.map((item) => {
    return portGroupPatchPropertiesSerializer(item);
  });
}

/** Port Group Properties */
export interface PortGroupPatchProperties {
  /** The name of the port group. */
  name?: string;
  /** List of the ports that need to be matched. */
  ports?: string[];
}

export function portGroupPatchPropertiesSerializer(item: PortGroupPatchProperties): any {
  return {
    name: item["name"],
    ports: !item["ports"]
      ? item["ports"]
      : item["ports"].map((p: any) => {
          return p;
        }),
  };
}

/** Global Access Control List actions patch properties */
export interface GlobalAccessControlListActionPatchProperties {
  /** Configuration to enable or disable ACL action count. */
  enableCount?: BooleanEnumProperty;
}

export function globalAccessControlListActionPatchPropertiesSerializer(
  item: GlobalAccessControlListActionPatchProperties,
): any {
  return { enableCount: item["enableCount"] };
}

/** The response of a AccessControlList list operation. */
export interface _AccessControlListListResult {
  /** The AccessControlList items on this page */
  value: AccessControlList[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _accessControlListListResultDeserializer(item: any): _AccessControlListListResult {
  return {
    value: accessControlListArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function accessControlListArraySerializer(result: Array<AccessControlList>): any[] {
  return result.map((item) => {
    return accessControlListSerializer(item);
  });
}

export function accessControlListArrayDeserializer(result: Array<AccessControlList>): any[] {
  return result.map((item) => {
    return accessControlListDeserializer(item);
  });
}

/** Update administrative state on list of resources. */
export interface UpdateAdministrativeState {
  /** Network Fabrics or Network Rack resource Id. */
  resourceIds?: string[];
  /** Administrative state. */
  state?: EnableDisableState;
}

export function updateAdministrativeStateSerializer(item: UpdateAdministrativeState): any {
  return {
    resourceIds: !item["resourceIds"]
      ? item["resourceIds"]
      : item["resourceIds"].map((p: any) => {
          return p;
        }),
    state: item["state"],
  };
}

/** Administrative state. */
export enum KnownEnableDisableState {
  /** AdministrativeState Enable */
  Enable = "Enable",
  /** AdministrativeState Disable */
  Disable = "Disable",
  /** AdministrativeState UnderMaintenance */
  UnderMaintenance = "UnderMaintenance",
}

/**
 * Administrative state. \
 * {@link KnownEnableDisableState} can be used interchangeably with EnableDisableState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enable**: AdministrativeState Enable \
 * **Disable**: AdministrativeState Disable \
 * **UnderMaintenance**: AdministrativeState UnderMaintenance
 */
export type EnableDisableState = string;

/** Common response for the state updates. */
export interface CommonPostActionResponseForStateUpdate {
  /** The error object. */
  error?: ErrorDetail;
  /** Gets the configuration state. */
  readonly configurationState?: ConfigurationState;
}

export function commonPostActionResponseForStateUpdateDeserializer(
  item: any,
): CommonPostActionResponseForStateUpdate {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    configurationState: item["configurationState"],
  };
}

/** The response of the action validate configuration. */
export interface ValidateConfigurationResponse {
  /** The error object. */
  error?: ErrorDetail;
  /** Gets the configuration state. */
  readonly configurationState?: ConfigurationState;
  /** URL for the details of the response. */
  url?: string;
}

export function validateConfigurationResponseDeserializer(
  item: any,
): ValidateConfigurationResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    configurationState: item["configurationState"],
    url: item["url"],
  };
}

/** The Internet Gateway Rule resource definition. */
export interface InternetGatewayRule extends TrackedResource {
  /** The Internet Gateway Rule properties */
  properties: InternetGatewayRuleProperties;
}

export function internetGatewayRuleSerializer(item: InternetGatewayRule): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: internetGatewayRulePropertiesSerializer(item["properties"]),
  };
}

export function internetGatewayRuleDeserializer(item: any): InternetGatewayRule {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: internetGatewayRulePropertiesDeserializer(item["properties"]),
  };
}

/** Internet Gateway Rule Properties defines the resource properties. */
export interface InternetGatewayRuleProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** Rules for the InternetGateways */
  ruleProperties: RuleProperties;
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** List of Internet Gateway resource Id. */
  readonly internetGatewayIds?: string[];
}

export function internetGatewayRulePropertiesSerializer(item: InternetGatewayRuleProperties): any {
  return {
    annotation: item["annotation"],
    ruleProperties: rulePropertiesSerializer(item["ruleProperties"]),
  };
}

export function internetGatewayRulePropertiesDeserializer(
  item: any,
): InternetGatewayRuleProperties {
  return {
    annotation: item["annotation"],
    ruleProperties: rulePropertiesDeserializer(item["ruleProperties"]),
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    provisioningState: item["provisioningState"],
    internetGatewayIds: !item["internetGatewayIds"]
      ? item["internetGatewayIds"]
      : item["internetGatewayIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Rules for the InternetGateways */
export interface RuleProperties {
  /** Specify action. */
  action: Action;
  /** List of Addresses to be allowed or denied. */
  addressList?: string[];
  /** Specify rule condition. */
  condition?: RuleCondition;
  /** List of Addresses to be allowed or denied. */
  destinationAddressList?: string[];
  /** List of source IPv4 and IPv6 address to be allowed or denied. */
  sourceAddressList?: string[];
  /** List of header Name and source addresses associated with the header. */
  headerAddressList?: HeaderAddressProperties[];
}

export function rulePropertiesSerializer(item: RuleProperties): any {
  return {
    action: item["action"],
    addressList: !item["addressList"]
      ? item["addressList"]
      : item["addressList"].map((p: any) => {
          return p;
        }),
    condition: item["condition"],
    destinationAddressList: !item["destinationAddressList"]
      ? item["destinationAddressList"]
      : item["destinationAddressList"].map((p: any) => {
          return p;
        }),
    sourceAddressList: !item["sourceAddressList"]
      ? item["sourceAddressList"]
      : item["sourceAddressList"].map((p: any) => {
          return p;
        }),
    headerAddressList: !item["headerAddressList"]
      ? item["headerAddressList"]
      : headerAddressPropertiesArraySerializer(item["headerAddressList"]),
  };
}

export function rulePropertiesDeserializer(item: any): RuleProperties {
  return {
    action: item["action"],
    addressList: !item["addressList"]
      ? item["addressList"]
      : item["addressList"].map((p: any) => {
          return p;
        }),
    condition: item["condition"],
    destinationAddressList: !item["destinationAddressList"]
      ? item["destinationAddressList"]
      : item["destinationAddressList"].map((p: any) => {
          return p;
        }),
    sourceAddressList: !item["sourceAddressList"]
      ? item["sourceAddressList"]
      : item["sourceAddressList"].map((p: any) => {
          return p;
        }),
    headerAddressList: !item["headerAddressList"]
      ? item["headerAddressList"]
      : headerAddressPropertiesArrayDeserializer(item["headerAddressList"]),
  };
}

/** Specify action. */
export enum KnownAction {
  /** Action Allow */
  Allow = "Allow",
  /** Action Deny */
  Deny = "Deny",
}

/**
 * Specify action. \
 * {@link KnownAction} can be used interchangeably with Action,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**: Action Allow \
 * **Deny**: Action Deny
 */
export type Action = string;

/** Specify Rule condition. */
export enum KnownRuleCondition {
  /** And Rule-Condition. */
  And = "And",
  /** Or Rule-Condition. */
  Or = "Or",
}

/**
 * Specify Rule condition. \
 * {@link KnownRuleCondition} can be used interchangeably with RuleCondition,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **And**: And Rule-Condition. \
 * **Or**: Or Rule-Condition.
 */
export type RuleCondition = string;

export function headerAddressPropertiesArraySerializer(
  result: Array<HeaderAddressProperties>,
): any[] {
  return result.map((item) => {
    return headerAddressPropertiesSerializer(item);
  });
}

export function headerAddressPropertiesArrayDeserializer(
  result: Array<HeaderAddressProperties>,
): any[] {
  return result.map((item) => {
    return headerAddressPropertiesDeserializer(item);
  });
}

/** Header name and source addresses associated with the header. */
export interface HeaderAddressProperties {
  /** Name of the header. */
  headerName?: string;
  /** List of source remote IP to be allowed or denied. */
  addressList?: string[];
}

export function headerAddressPropertiesSerializer(item: HeaderAddressProperties): any {
  return {
    headerName: item["headerName"],
    addressList: !item["addressList"]
      ? item["addressList"]
      : item["addressList"].map((p: any) => {
          return p;
        }),
  };
}

export function headerAddressPropertiesDeserializer(item: any): HeaderAddressProperties {
  return {
    headerName: item["headerName"],
    addressList: !item["addressList"]
      ? item["addressList"]
      : item["addressList"].map((p: any) => {
          return p;
        }),
  };
}

/** The Internet Gateway Rules patch resource definition. */
export interface InternetGatewayRulePatch {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function internetGatewayRulePatchSerializer(item: InternetGatewayRulePatch): any {
  return { tags: item["tags"] };
}

/** The response of a InternetGatewayRule list operation. */
export interface _InternetGatewayRuleListResult {
  /** The InternetGatewayRule items on this page */
  value: InternetGatewayRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _internetGatewayRuleListResultDeserializer(
  item: any,
): _InternetGatewayRuleListResult {
  return {
    value: internetGatewayRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function internetGatewayRuleArraySerializer(result: Array<InternetGatewayRule>): any[] {
  return result.map((item) => {
    return internetGatewayRuleSerializer(item);
  });
}

export function internetGatewayRuleArrayDeserializer(result: Array<InternetGatewayRule>): any[] {
  return result.map((item) => {
    return internetGatewayRuleDeserializer(item);
  });
}

/** The Internet Gateway resource definition. */
export interface InternetGateway extends TrackedResource {
  /** The Internet Gateway Properties */
  properties: InternetGatewayProperties;
}

export function internetGatewaySerializer(item: InternetGateway): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: internetGatewayPropertiesSerializer(item["properties"]),
  };
}

export function internetGatewayDeserializer(item: any): InternetGateway {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: internetGatewayPropertiesDeserializer(item["properties"]),
  };
}

/** Internet Gateway Properties defines the properties of the resource. */
export interface InternetGatewayProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** ARM Resource ID of the Internet Gateway Rule. */
  internetGatewayRuleId?: string;
  /** IPv4 Address of Internet Gateway. */
  readonly ipv4Address?: string;
  /** Port number of Internet Gateway. */
  readonly port?: number;
  /** Gateway Type of the resource. */
  type?: GatewayType;
  /** Gateway Type of the resource. */
  internetGatewayType?: GatewayType;
  /** ARM Resource ID of the Network Fabric Controller. */
  networkFabricControllerId: string;
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Provisioning state of resource. */
  readonly provisioningState?: ProvisioningState;
}

export function internetGatewayPropertiesSerializer(item: InternetGatewayProperties): any {
  return {
    annotation: item["annotation"],
    internetGatewayRuleId: item["internetGatewayRuleId"],
    type: item["type"],
    internetGatewayType: item["internetGatewayType"],
    networkFabricControllerId: item["networkFabricControllerId"],
  };
}

export function internetGatewayPropertiesDeserializer(item: any): InternetGatewayProperties {
  return {
    annotation: item["annotation"],
    internetGatewayRuleId: item["internetGatewayRuleId"],
    ipv4Address: item["ipv4Address"],
    port: item["port"],
    type: item["type"],
    internetGatewayType: item["internetGatewayType"],
    networkFabricControllerId: item["networkFabricControllerId"],
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    provisioningState: item["provisioningState"],
  };
}

/** Gateway Type of the resource. */
export enum KnownGatewayType {
  /** GatewayType Infrastructure */
  Infrastructure = "Infrastructure",
  /** GatewayType Workload */
  Workload = "Workload",
}

/**
 * Gateway Type of the resource. \
 * {@link KnownGatewayType} can be used interchangeably with GatewayType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Infrastructure**: GatewayType Infrastructure \
 * **Workload**: GatewayType Workload
 */
export type GatewayType = string;

/** The Internet Gateway patch resource definition. */
export interface InternetGatewayPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Resource properties. */
  properties?: InternetGatewayPatchProperties;
}

export function internetGatewayPatchSerializer(item: InternetGatewayPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : internetGatewayPatchPropertiesSerializer(item["properties"]),
  };
}

/** PatchProperties for InternetGateway */
export interface InternetGatewayPatchProperties {
  /** ARM Resource ID of the Internet Gateway Rule. */
  internetGatewayRuleId?: string;
}

export function internetGatewayPatchPropertiesSerializer(
  item: InternetGatewayPatchProperties,
): any {
  return { internetGatewayRuleId: item["internetGatewayRuleId"] };
}

/** The response of a InternetGateway list operation. */
export interface _InternetGatewayListResult {
  /** The InternetGateway items on this page */
  value: InternetGateway[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _internetGatewayListResultDeserializer(item: any): _InternetGatewayListResult {
  return {
    value: internetGatewayArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function internetGatewayArraySerializer(result: Array<InternetGateway>): any[] {
  return result.map((item) => {
    return internetGatewaySerializer(item);
  });
}

export function internetGatewayArrayDeserializer(result: Array<InternetGateway>): any[] {
  return result.map((item) => {
    return internetGatewayDeserializer(item);
  });
}

/** The IP Community resource definition. */
export interface IpCommunity extends TrackedResource {
  /** The IP Community Properties */
  properties: IpCommunityProperties;
}

export function ipCommunitySerializer(item: IpCommunity): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: ipCommunityPropertiesSerializer(item["properties"]),
  };
}

export function ipCommunityDeserializer(item: any): IpCommunity {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: ipCommunityPropertiesDeserializer(item["properties"]),
  };
}

/** IP Community Properties defines the resource properties. */
export interface IpCommunityProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** ARM Resource ID of the Network Fabric. */
  readonly networkFabricId?: string;
  /** List of IP Community Rules. */
  ipCommunityRules: IpCommunityRule[];
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Configuration state of the resource. */
  readonly configurationState?: ConfigurationState;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Administrative state of the resource. */
  readonly administrativeState?: AdministrativeState;
}

export function ipCommunityPropertiesSerializer(item: IpCommunityProperties): any {
  return {
    annotation: item["annotation"],
    ipCommunityRules: ipCommunityRuleArraySerializer(item["ipCommunityRules"]),
  };
}

export function ipCommunityPropertiesDeserializer(item: any): IpCommunityProperties {
  return {
    annotation: item["annotation"],
    networkFabricId: item["networkFabricId"],
    ipCommunityRules: ipCommunityRuleArrayDeserializer(item["ipCommunityRules"]),
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    configurationState: item["configurationState"],
    provisioningState: item["provisioningState"],
    administrativeState: item["administrativeState"],
  };
}

export function ipCommunityRuleArraySerializer(result: Array<IpCommunityRule>): any[] {
  return result.map((item) => {
    return ipCommunityRuleSerializer(item);
  });
}

export function ipCommunityRuleArrayDeserializer(result: Array<IpCommunityRule>): any[] {
  return result.map((item) => {
    return ipCommunityRuleDeserializer(item);
  });
}

/** IP Community patchable properties. */
export interface IpCommunityRule {
  /** Action to be taken on the configuration. Example: Permit | Deny. */
  action: CommunityActionTypes;
  /** Sequence to insert to/delete from existing route. Prefix lists are evaluated starting with the lowest sequence number and continue down the list until a match is made. Once a match is made, the permit or deny statement is applied to that network and the rest of the list is ignored. */
  sequenceNumber: number;
  /** Supported well known Community List. */
  wellKnownCommunities?: WellKnownCommunities[];
  /** List the community members of IP Community. */
  communityMembers: string[];
}

export function ipCommunityRuleSerializer(item: IpCommunityRule): any {
  return {
    action: item["action"],
    sequenceNumber: item["sequenceNumber"],
    wellKnownCommunities: !item["wellKnownCommunities"]
      ? item["wellKnownCommunities"]
      : item["wellKnownCommunities"].map((p: any) => {
          return p;
        }),
    communityMembers: item["communityMembers"].map((p: any) => {
      return p;
    }),
  };
}

export function ipCommunityRuleDeserializer(item: any): IpCommunityRule {
  return {
    action: item["action"],
    sequenceNumber: item["sequenceNumber"],
    wellKnownCommunities: !item["wellKnownCommunities"]
      ? item["wellKnownCommunities"]
      : item["wellKnownCommunities"].map((p: any) => {
          return p;
        }),
    communityMembers: item["communityMembers"].map((p: any) => {
      return p;
    }),
  };
}

/**
 * `Internet` - Advertise routes to internet community.
 * `LocalAS` - Advertise routes to only localAS peers.
 * `NoAdvertise` - Don't advertise routes to any peer.
 * `NoExport` - Don't export to next AS.
 * `GShut` - Graceful Shutdown (GSHUT) withdraw routes before terminating BGP connection.
 */
export enum KnownWellKnownCommunities {
  /** WellKnownCommunities-Internet */
  Internet = "Internet",
  /** WellKnownCommunities-LocalAS */
  LocalAS = "LocalAS",
  /** WellKnownCommunities-NoAdvertise */
  NoAdvertise = "NoAdvertise",
  /** WellKnownCommunities-NoExport */
  NoExport = "NoExport",
  /** WellKnownCommunities-GShut */
  GShut = "GShut",
}

/**
 * `Internet` - Advertise routes to internet community.
 * `LocalAS` - Advertise routes to only localAS peers.
 * `NoAdvertise` - Don't advertise routes to any peer.
 * `NoExport` - Don't export to next AS.
 * `GShut` - Graceful Shutdown (GSHUT) withdraw routes before terminating BGP connection. \
 * {@link KnownWellKnownCommunities} can be used interchangeably with WellKnownCommunities,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internet**: WellKnownCommunities-Internet \
 * **LocalAS**: WellKnownCommunities-LocalAS \
 * **NoAdvertise**: WellKnownCommunities-NoAdvertise \
 * **NoExport**: WellKnownCommunities-NoExport \
 * **GShut**: WellKnownCommunities-GShut
 */
export type WellKnownCommunities = string;

/** The IP Community patch resource definition. */
export interface IpCommunityPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** IP Community patchable properties. */
  properties?: IpCommunityPatchableProperties;
}

export function ipCommunityPatchSerializer(item: IpCommunityPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : ipCommunityPatchablePropertiesSerializer(item["properties"]),
  };
}

/** IP Community patchable properties. */
export interface IpCommunityPatchableProperties {
  /** List of IP Community Rules. */
  ipCommunityRules?: IpCommunityRule[];
}

export function ipCommunityPatchablePropertiesSerializer(
  item: IpCommunityPatchableProperties,
): any {
  return {
    ipCommunityRules: !item["ipCommunityRules"]
      ? item["ipCommunityRules"]
      : ipCommunityRuleArraySerializer(item["ipCommunityRules"]),
  };
}

/** The response of a IpCommunity list operation. */
export interface _IpCommunityListResult {
  /** The IpCommunity items on this page */
  value: IpCommunity[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ipCommunityListResultDeserializer(item: any): _IpCommunityListResult {
  return {
    value: ipCommunityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ipCommunityArraySerializer(result: Array<IpCommunity>): any[] {
  return result.map((item) => {
    return ipCommunitySerializer(item);
  });
}

export function ipCommunityArrayDeserializer(result: Array<IpCommunity>): any[] {
  return result.map((item) => {
    return ipCommunityDeserializer(item);
  });
}

/** The IP Extended Community resource definition. */
export interface IpExtendedCommunity extends TrackedResource {
  /** The IpExtendedCommunity properties */
  properties: IpExtendedCommunityProperties;
}

export function ipExtendedCommunitySerializer(item: IpExtendedCommunity): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: ipExtendedCommunityPropertiesSerializer(item["properties"]),
  };
}

export function ipExtendedCommunityDeserializer(item: any): IpExtendedCommunity {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: ipExtendedCommunityPropertiesDeserializer(item["properties"]),
  };
}

/** IP Extended Community Properties defines the resource properties. */
export interface IpExtendedCommunityProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** ARM Resource ID of the Network Fabric. */
  readonly networkFabricId?: string;
  /** List of IP Extended Community Rules. */
  ipExtendedCommunityRules: IpExtendedCommunityRule[];
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Configuration state of the resource. */
  readonly configurationState?: ConfigurationState;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Administrative state of the resource. */
  readonly administrativeState?: AdministrativeState;
}

export function ipExtendedCommunityPropertiesSerializer(item: IpExtendedCommunityProperties): any {
  return {
    annotation: item["annotation"],
    ipExtendedCommunityRules: ipExtendedCommunityRuleArraySerializer(
      item["ipExtendedCommunityRules"],
    ),
  };
}

export function ipExtendedCommunityPropertiesDeserializer(
  item: any,
): IpExtendedCommunityProperties {
  return {
    annotation: item["annotation"],
    networkFabricId: item["networkFabricId"],
    ipExtendedCommunityRules: ipExtendedCommunityRuleArrayDeserializer(
      item["ipExtendedCommunityRules"],
    ),
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    configurationState: item["configurationState"],
    provisioningState: item["provisioningState"],
    administrativeState: item["administrativeState"],
  };
}

export function ipExtendedCommunityRuleArraySerializer(
  result: Array<IpExtendedCommunityRule>,
): any[] {
  return result.map((item) => {
    return ipExtendedCommunityRuleSerializer(item);
  });
}

export function ipExtendedCommunityRuleArrayDeserializer(
  result: Array<IpExtendedCommunityRule>,
): any[] {
  return result.map((item) => {
    return ipExtendedCommunityRuleDeserializer(item);
  });
}

/** List of IP Extended Community Rules. */
export interface IpExtendedCommunityRule {
  /** Action to be taken on the configuration. Example: Permit | Deny. */
  action: CommunityActionTypes;
  /** Sequence to insert to/delete from existing route. Prefix lists are evaluated starting with the lowest sequence number and continue down the list until a match is made. Once a match is made, the permit or deny statement is applied to that network and the rest of the list is ignored. */
  sequenceNumber: number;
  /** Route Target List.The expected formats are ASN(plain):NN >> example 4294967294:50, ASN.ASN:NN >> example 65533.65333:40, IP-address:NN >> example 10.10.10.10:65535. The possible values of ASN,NN are in range of 0-65535, ASN(plain) is in range of 0-4294967295. */
  routeTargets: string[];
}

export function ipExtendedCommunityRuleSerializer(item: IpExtendedCommunityRule): any {
  return {
    action: item["action"],
    sequenceNumber: item["sequenceNumber"],
    routeTargets: item["routeTargets"].map((p: any) => {
      return p;
    }),
  };
}

export function ipExtendedCommunityRuleDeserializer(item: any): IpExtendedCommunityRule {
  return {
    action: item["action"],
    sequenceNumber: item["sequenceNumber"],
    routeTargets: item["routeTargets"].map((p: any) => {
      return p;
    }),
  };
}

/** The IP Extended Communities patch resource definition. */
export interface IpExtendedCommunityPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** IP Extended Community patchable properties. */
  properties?: IpExtendedCommunityPatchProperties;
}

export function ipExtendedCommunityPatchSerializer(item: IpExtendedCommunityPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : ipExtendedCommunityPatchPropertiesSerializer(item["properties"]),
  };
}

/** IP Extended Community patchable properties. */
export interface IpExtendedCommunityPatchProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** List of IP Extended Community Rules. */
  ipExtendedCommunityRules?: IpExtendedCommunityRule[];
}

export function ipExtendedCommunityPatchPropertiesSerializer(
  item: IpExtendedCommunityPatchProperties,
): any {
  return {
    annotation: item["annotation"],
    ipExtendedCommunityRules: !item["ipExtendedCommunityRules"]
      ? item["ipExtendedCommunityRules"]
      : ipExtendedCommunityRuleArraySerializer(item["ipExtendedCommunityRules"]),
  };
}

/** The response of a IpExtendedCommunity list operation. */
export interface _IpExtendedCommunityListResult {
  /** The IpExtendedCommunity items on this page */
  value: IpExtendedCommunity[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ipExtendedCommunityListResultDeserializer(
  item: any,
): _IpExtendedCommunityListResult {
  return {
    value: ipExtendedCommunityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ipExtendedCommunityArraySerializer(result: Array<IpExtendedCommunity>): any[] {
  return result.map((item) => {
    return ipExtendedCommunitySerializer(item);
  });
}

export function ipExtendedCommunityArrayDeserializer(result: Array<IpExtendedCommunity>): any[] {
  return result.map((item) => {
    return ipExtendedCommunityDeserializer(item);
  });
}

/** The IP Prefix resource definition. */
export interface IpPrefix extends TrackedResource {
  /** The IP Prefix properties */
  properties: IpPrefixProperties;
}

export function ipPrefixSerializer(item: IpPrefix): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: ipPrefixPropertiesSerializer(item["properties"]),
  };
}

export function ipPrefixDeserializer(item: any): IpPrefix {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: ipPrefixPropertiesDeserializer(item["properties"]),
  };
}

/** IP Prefix Properties defines the properties of the resource. */
export interface IpPrefixProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** ARM Resource ID of the Network Fabric. */
  readonly networkFabricId?: string;
  /** The list of IP Prefix Rules. */
  ipPrefixRules: IpPrefixRule[];
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Configuration state of the resource. */
  readonly configurationState?: ConfigurationState;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Administrative state of the resource. */
  readonly administrativeState?: AdministrativeState;
}

export function ipPrefixPropertiesSerializer(item: IpPrefixProperties): any {
  return {
    annotation: item["annotation"],
    ipPrefixRules: ipPrefixRuleArraySerializer(item["ipPrefixRules"]),
  };
}

export function ipPrefixPropertiesDeserializer(item: any): IpPrefixProperties {
  return {
    annotation: item["annotation"],
    networkFabricId: item["networkFabricId"],
    ipPrefixRules: ipPrefixRuleArrayDeserializer(item["ipPrefixRules"]),
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    configurationState: item["configurationState"],
    provisioningState: item["provisioningState"],
    administrativeState: item["administrativeState"],
  };
}

export function ipPrefixRuleArraySerializer(result: Array<IpPrefixRule>): any[] {
  return result.map((item) => {
    return ipPrefixRuleSerializer(item);
  });
}

export function ipPrefixRuleArrayDeserializer(result: Array<IpPrefixRule>): any[] {
  return result.map((item) => {
    return ipPrefixRuleDeserializer(item);
  });
}

/** IP Prefix Rule properties. */
export interface IpPrefixRule {
  /** Action to be taken on the configuration. Example: Permit | Deny. */
  action: CommunityActionTypes;
  /** Sequence to insert to/delete from existing route. Prefix lists are evaluated starting with the lowest sequence number and continue down the list until a match is made. Once a match is made, the permit or deny statement is applied to that network and the rest of the list is ignored. */
  sequenceNumber: number;
  /** Network Prefix specifying IPv4/IPv6 packets to be permitted or denied. Example: 1.1.1.0/24 | 3FFE:FFFF:0:CD30::/126 */
  networkPrefix: string;
  /** Specify prefix-list bounds. */
  condition?: Condition;
  /** SubnetMaskLength gives the minimum NetworkPrefix length to be matched. Possible values for IPv4 are 1 - 32 . Possible values of IPv6 are 1 - 128. */
  subnetMaskLength?: string;
}

export function ipPrefixRuleSerializer(item: IpPrefixRule): any {
  return {
    action: item["action"],
    sequenceNumber: item["sequenceNumber"],
    networkPrefix: item["networkPrefix"],
    condition: item["condition"],
    subnetMaskLength: item["subnetMaskLength"],
  };
}

export function ipPrefixRuleDeserializer(item: any): IpPrefixRule {
  return {
    action: item["action"],
    sequenceNumber: item["sequenceNumber"],
    networkPrefix: item["networkPrefix"],
    condition: item["condition"],
    subnetMaskLength: item["subnetMaskLength"],
  };
}

/** Specify prefix-list bounds. */
export enum KnownCondition {
  /** Condition-EqualTo */
  EqualTo = "EqualTo",
  /** Condition-GreaterThanOrEqualTo */
  GreaterThanOrEqualTo = "GreaterThanOrEqualTo",
  /** Condition-LesserThanOrEqualTo */
  LesserThanOrEqualTo = "LesserThanOrEqualTo",
  /** Condition-Range */
  Range = "Range",
}

/**
 * Specify prefix-list bounds. \
 * {@link KnownCondition} can be used interchangeably with Condition,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EqualTo**: Condition-EqualTo \
 * **GreaterThanOrEqualTo**: Condition-GreaterThanOrEqualTo \
 * **LesserThanOrEqualTo**: Condition-LesserThanOrEqualTo \
 * **Range**: Condition-Range
 */
export type Condition = string;

/** The IP Prefix patch resource definition. */
export interface IpPrefixPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** IP Prefix patchable properties. */
  properties?: IpPrefixPatchProperties;
}

export function ipPrefixPatchSerializer(item: IpPrefixPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : ipPrefixPatchPropertiesSerializer(item["properties"]),
  };
}

/** IP Prefix patchable properties. */
export interface IpPrefixPatchProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** The list of IP Prefix Rules. */
  ipPrefixRules?: IpPrefixRule[];
}

export function ipPrefixPatchPropertiesSerializer(item: IpPrefixPatchProperties): any {
  return {
    annotation: item["annotation"],
    ipPrefixRules: !item["ipPrefixRules"]
      ? item["ipPrefixRules"]
      : ipPrefixRuleArraySerializer(item["ipPrefixRules"]),
  };
}

/** The response of a IpPrefix list operation. */
export interface _IpPrefixListResult {
  /** The IpPrefix items on this page */
  value: IpPrefix[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ipPrefixListResultDeserializer(item: any): _IpPrefixListResult {
  return {
    value: ipPrefixArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ipPrefixArraySerializer(result: Array<IpPrefix>): any[] {
  return result.map((item) => {
    return ipPrefixSerializer(item);
  });
}

export function ipPrefixArrayDeserializer(result: Array<IpPrefix>): any[] {
  return result.map((item) => {
    return ipPrefixDeserializer(item);
  });
}

/** The L2 Isolation Domain resource definition. */
export interface L2IsolationDomain extends TrackedResource {
  /** The L2IsolationDomain properties */
  properties: L2IsolationDomainProperties;
}

export function l2IsolationDomainSerializer(item: L2IsolationDomain): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: l2IsolationDomainPropertiesSerializer(item["properties"]),
  };
}

export function l2IsolationDomainDeserializer(item: any): L2IsolationDomain {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: l2IsolationDomainPropertiesDeserializer(item["properties"]),
  };
}

/** L2Isolation Domain Properties defines the properties of the resource. */
export interface L2IsolationDomainProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** ARM Resource ID of the Network Fabric. */
  networkFabricId: string;
  /** Vlan Identifier of the Network Fabric. Example: 501. */
  vlanId: number;
  /** Maximum transmission unit. Default value is 1500. */
  mtu?: number;
  /** Extended VLAN status, default value is Disabled. */
  extendedVlan?: ExtendedVlan;
  /** ARM Resource ID of the networkToNetworkInterconnectId of the L2 ISD resource. */
  networkToNetworkInterconnectId?: string;
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Configuration state of the resource. */
  readonly configurationState?: ConfigurationState;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Administrative state of the resource. */
  readonly administrativeState?: AdministrativeState;
}

export function l2IsolationDomainPropertiesSerializer(item: L2IsolationDomainProperties): any {
  return {
    annotation: item["annotation"],
    networkFabricId: item["networkFabricId"],
    vlanId: item["vlanId"],
    mtu: item["mtu"],
    extendedVlan: item["extendedVlan"],
    networkToNetworkInterconnectId: item["networkToNetworkInterconnectId"],
  };
}

export function l2IsolationDomainPropertiesDeserializer(item: any): L2IsolationDomainProperties {
  return {
    annotation: item["annotation"],
    networkFabricId: item["networkFabricId"],
    vlanId: item["vlanId"],
    mtu: item["mtu"],
    extendedVlan: item["extendedVlan"],
    networkToNetworkInterconnectId: item["networkToNetworkInterconnectId"],
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    configurationState: item["configurationState"],
    provisioningState: item["provisioningState"],
    administrativeState: item["administrativeState"],
  };
}

/** Extended VLAN status. */
export enum KnownExtendedVlan {
  /** Extended VLAN is enabled. */
  Enabled = "Enabled",
  /** Extended VLAN is disabled. */
  Disabled = "Disabled",
}

/**
 * Extended VLAN status. \
 * {@link KnownExtendedVlan} can be used interchangeably with ExtendedVlan,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Extended VLAN is enabled. \
 * **Disabled**: Extended VLAN is disabled.
 */
export type ExtendedVlan = string;

/** The L2 Isolation Domain patch resource definition. */
export interface L2IsolationDomainPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Resource properties. */
  properties?: L2IsolationDomainPatchProperties;
}

export function l2IsolationDomainPatchSerializer(item: L2IsolationDomainPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : l2IsolationDomainPatchPropertiesSerializer(item["properties"]),
  };
}

/** L2 Isolation Domain Patch Properties defines the patchable properties of the resource. */
export interface L2IsolationDomainPatchProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** Maximum transmission unit. Default value is 1500. */
  mtu?: number;
  /** Extended VLAN status. */
  extendedVlan?: ExtendedVlan;
  /** ARM Resource ID of the networkToNetworkInterconnectId of the L2 ISD resource. */
  networkToNetworkInterconnectId?: string;
}

export function l2IsolationDomainPatchPropertiesSerializer(
  item: L2IsolationDomainPatchProperties,
): any {
  return {
    annotation: item["annotation"],
    mtu: item["mtu"],
    extendedVlan: item["extendedVlan"],
    networkToNetworkInterconnectId: item["networkToNetworkInterconnectId"],
  };
}

/** The response of a L2IsolationDomain list operation. */
export interface _L2IsolationDomainListResult {
  /** The L2IsolationDomain items on this page */
  value: L2IsolationDomain[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _l2IsolationDomainListResultDeserializer(item: any): _L2IsolationDomainListResult {
  return {
    value: l2IsolationDomainArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function l2IsolationDomainArraySerializer(result: Array<L2IsolationDomain>): any[] {
  return result.map((item) => {
    return l2IsolationDomainSerializer(item);
  });
}

export function l2IsolationDomainArrayDeserializer(result: Array<L2IsolationDomain>): any[] {
  return result.map((item) => {
    return l2IsolationDomainDeserializer(item);
  });
}

/** Common response for device updates. */
export interface CommonPostActionResponseForDeviceUpdate {
  /** The error object. */
  error?: ErrorDetail;
  /** Gets the configuration state. */
  readonly configurationState?: ConfigurationState;
  /** List of ARM Resource IDs for which the given action applied successfully. */
  successfulDevices?: string[];
  /** List of ARM Resource IDs for which the given action failed to apply. */
  failedDevices?: string[];
}

export function commonPostActionResponseForDeviceUpdateDeserializer(
  item: any,
): CommonPostActionResponseForDeviceUpdate {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    configurationState: item["configurationState"],
    successfulDevices: !item["successfulDevices"]
      ? item["successfulDevices"]
      : item["successfulDevices"].map((p: any) => {
          return p;
        }),
    failedDevices: !item["failedDevices"]
      ? item["failedDevices"]
      : item["failedDevices"].map((p: any) => {
          return p;
        }),
  };
}

/** The L3 Isolation Domain resource definition. */
export interface L3IsolationDomain extends TrackedResource {
  /** The L3 Isolation Domain Properties */
  properties: L3IsolationDomainProperties;
}

export function l3IsolationDomainSerializer(item: L3IsolationDomain): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: l3IsolationDomainPropertiesSerializer(item["properties"]),
  };
}

export function l3IsolationDomainDeserializer(item: any): L3IsolationDomain {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: l3IsolationDomainPropertiesDeserializer(item["properties"]),
  };
}

/** L3 Isolation Domain Properties defines the properties of the resource. */
export interface L3IsolationDomainProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** Advertise Connected Subnets. Ex: "True" | "False". */
  redistributeConnectedSubnets?: RedistributeConnectedSubnets;
  /** Advertise Static Routes. Ex: "True" | "False". */
  redistributeStaticRoutes?: RedistributeStaticRoutes;
  /** Aggregate route configurations. */
  aggregateRouteConfiguration?: AggregateRouteConfiguration;
  /** Connected Subnet RoutePolicy */
  connectedSubnetRoutePolicy?: ConnectedSubnetRoutePolicy;
  /** ARM Resource ID of the Network Fabric. */
  networkFabricId: string;
  /** Static Route - route policy. */
  staticRouteRoutePolicy?: StaticRouteRoutePolicy;
  /** Unique Route Distinguisher configuration */
  uniqueRdConfiguration?: L3UniqueRouteDistinguisherProperties;
  /** VRF Limit configuration. */
  routePrefixLimit?: RoutePrefixLimitProperties;
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Configuration state of the resource. */
  readonly configurationState?: ConfigurationState;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Administrative state of the resource. */
  readonly administrativeState?: AdministrativeState;
}

export function l3IsolationDomainPropertiesSerializer(item: L3IsolationDomainProperties): any {
  return {
    annotation: item["annotation"],
    redistributeConnectedSubnets: item["redistributeConnectedSubnets"],
    redistributeStaticRoutes: item["redistributeStaticRoutes"],
    aggregateRouteConfiguration: !item["aggregateRouteConfiguration"]
      ? item["aggregateRouteConfiguration"]
      : aggregateRouteConfigurationSerializer(item["aggregateRouteConfiguration"]),
    connectedSubnetRoutePolicy: !item["connectedSubnetRoutePolicy"]
      ? item["connectedSubnetRoutePolicy"]
      : connectedSubnetRoutePolicySerializer(item["connectedSubnetRoutePolicy"]),
    networkFabricId: item["networkFabricId"],
    staticRouteRoutePolicy: !item["staticRouteRoutePolicy"]
      ? item["staticRouteRoutePolicy"]
      : staticRouteRoutePolicySerializer(item["staticRouteRoutePolicy"]),
    uniqueRdConfiguration: !item["uniqueRdConfiguration"]
      ? item["uniqueRdConfiguration"]
      : l3UniqueRouteDistinguisherPropertiesSerializer(item["uniqueRdConfiguration"]),
    routePrefixLimit: !item["routePrefixLimit"]
      ? item["routePrefixLimit"]
      : routePrefixLimitPropertiesSerializer(item["routePrefixLimit"]),
  };
}

export function l3IsolationDomainPropertiesDeserializer(item: any): L3IsolationDomainProperties {
  return {
    annotation: item["annotation"],
    redistributeConnectedSubnets: item["redistributeConnectedSubnets"],
    redistributeStaticRoutes: item["redistributeStaticRoutes"],
    aggregateRouteConfiguration: !item["aggregateRouteConfiguration"]
      ? item["aggregateRouteConfiguration"]
      : aggregateRouteConfigurationDeserializer(item["aggregateRouteConfiguration"]),
    connectedSubnetRoutePolicy: !item["connectedSubnetRoutePolicy"]
      ? item["connectedSubnetRoutePolicy"]
      : connectedSubnetRoutePolicyDeserializer(item["connectedSubnetRoutePolicy"]),
    networkFabricId: item["networkFabricId"],
    staticRouteRoutePolicy: !item["staticRouteRoutePolicy"]
      ? item["staticRouteRoutePolicy"]
      : staticRouteRoutePolicyDeserializer(item["staticRouteRoutePolicy"]),
    uniqueRdConfiguration: !item["uniqueRdConfiguration"]
      ? item["uniqueRdConfiguration"]
      : l3UniqueRouteDistinguisherPropertiesDeserializer(item["uniqueRdConfiguration"]),
    routePrefixLimit: !item["routePrefixLimit"]
      ? item["routePrefixLimit"]
      : routePrefixLimitPropertiesDeserializer(item["routePrefixLimit"]),
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    configurationState: item["configurationState"],
    provisioningState: item["provisioningState"],
    administrativeState: item["administrativeState"],
  };
}

/** Advertise Connected Subnets. Ex: "True" | "False". */
export enum KnownRedistributeConnectedSubnets {
  /** RedistributeConnectedSubnets-True */
  True = "True",
  /** RedistributeConnectedSubnets-False */
  False = "False",
}

/**
 * Advertise Connected Subnets. Ex: "True" | "False". \
 * {@link KnownRedistributeConnectedSubnets} can be used interchangeably with RedistributeConnectedSubnets,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: RedistributeConnectedSubnets-True \
 * **False**: RedistributeConnectedSubnets-False
 */
export type RedistributeConnectedSubnets = string;

/** Advertise Static Routes. Ex: "True" | "False". */
export enum KnownRedistributeStaticRoutes {
  /** RedistributeStaticRoutes-True */
  True = "True",
  /** RedistributeStaticRoutes-False */
  False = "False",
}

/**
 * Advertise Static Routes. Ex: "True" | "False". \
 * {@link KnownRedistributeStaticRoutes} can be used interchangeably with RedistributeStaticRoutes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: RedistributeStaticRoutes-True \
 * **False**: RedistributeStaticRoutes-False
 */
export type RedistributeStaticRoutes = string;

/** List of IPv4 and IPv6 aggregate routes. */
export interface AggregateRouteConfiguration {
  /** List of IPv4 Route prefixes. */
  ipv4Routes?: AggregateRoute[];
  /** List of Ipv6Routes prefixes. */
  ipv6Routes?: AggregateRoute[];
}

export function aggregateRouteConfigurationSerializer(item: AggregateRouteConfiguration): any {
  return {
    ipv4Routes: !item["ipv4Routes"]
      ? item["ipv4Routes"]
      : aggregateRouteArraySerializer(item["ipv4Routes"]),
    ipv6Routes: !item["ipv6Routes"]
      ? item["ipv6Routes"]
      : aggregateRouteArraySerializer(item["ipv6Routes"]),
  };
}

export function aggregateRouteConfigurationDeserializer(item: any): AggregateRouteConfiguration {
  return {
    ipv4Routes: !item["ipv4Routes"]
      ? item["ipv4Routes"]
      : aggregateRouteArrayDeserializer(item["ipv4Routes"]),
    ipv6Routes: !item["ipv6Routes"]
      ? item["ipv6Routes"]
      : aggregateRouteArrayDeserializer(item["ipv6Routes"]),
  };
}

export function aggregateRouteArraySerializer(result: Array<AggregateRoute>): any[] {
  return result.map((item) => {
    return aggregateRouteSerializer(item);
  });
}

export function aggregateRouteArrayDeserializer(result: Array<AggregateRoute>): any[] {
  return result.map((item) => {
    return aggregateRouteDeserializer(item);
  });
}

/** aggregateIpv4Route model. */
export interface AggregateRoute {
  /** IPv4 Prefix of the aggregate Ipv4Route. */
  prefix: string;
}

export function aggregateRouteSerializer(item: AggregateRoute): any {
  return { prefix: item["prefix"] };
}

export function aggregateRouteDeserializer(item: any): AggregateRoute {
  return {
    prefix: item["prefix"],
  };
}

/** Connected Subnet Route Policy properties. */
export interface ConnectedSubnetRoutePolicy {
  /** Array of ARM Resource ID of the RoutePolicies. */
  exportRoutePolicy?: L3ExportRoutePolicy;
}

export function connectedSubnetRoutePolicySerializer(item: ConnectedSubnetRoutePolicy): any {
  return {
    exportRoutePolicy: !item["exportRoutePolicy"]
      ? item["exportRoutePolicy"]
      : l3ExportRoutePolicySerializer(item["exportRoutePolicy"]),
  };
}

export function connectedSubnetRoutePolicyDeserializer(item: any): ConnectedSubnetRoutePolicy {
  return {
    exportRoutePolicy: !item["exportRoutePolicy"]
      ? item["exportRoutePolicy"]
      : l3ExportRoutePolicyDeserializer(item["exportRoutePolicy"]),
  };
}

/** Array of ARM Resource ID of the RoutePolicies. */
export interface L3ExportRoutePolicy {
  /** ARM Resource ID of the RoutePolicy. */
  exportIpv4RoutePolicyId?: string;
  /** ARM Resource ID of the RoutePolicy. */
  exportIpv6RoutePolicyId?: string;
}

export function l3ExportRoutePolicySerializer(item: L3ExportRoutePolicy): any {
  return {
    exportIpv4RoutePolicyId: item["exportIpv4RoutePolicyId"],
    exportIpv6RoutePolicyId: item["exportIpv6RoutePolicyId"],
  };
}

export function l3ExportRoutePolicyDeserializer(item: any): L3ExportRoutePolicy {
  return {
    exportIpv4RoutePolicyId: item["exportIpv4RoutePolicyId"],
    exportIpv6RoutePolicyId: item["exportIpv6RoutePolicyId"],
  };
}

/** Static Route - route policy properties. */
export interface StaticRouteRoutePolicy {
  /** Array of ARM Resource ID of the RoutePolicies. */
  exportRoutePolicy?: L3ExportRoutePolicy;
}

export function staticRouteRoutePolicySerializer(item: StaticRouteRoutePolicy): any {
  return {
    exportRoutePolicy: !item["exportRoutePolicy"]
      ? item["exportRoutePolicy"]
      : l3ExportRoutePolicySerializer(item["exportRoutePolicy"]),
  };
}

export function staticRouteRoutePolicyDeserializer(item: any): StaticRouteRoutePolicy {
  return {
    exportRoutePolicy: !item["exportRoutePolicy"]
      ? item["exportRoutePolicy"]
      : l3ExportRoutePolicyDeserializer(item["exportRoutePolicy"]),
  };
}

/** Unique Route Distinguisher properties. */
export interface L3UniqueRouteDistinguisherProperties {
  /** List of Unique Route Distinguisher addresses. */
  readonly uniqueRds?: string[];
}

export function l3UniqueRouteDistinguisherPropertiesSerializer(
  item: L3UniqueRouteDistinguisherProperties,
): any {
  return item;
}

export function l3UniqueRouteDistinguisherPropertiesDeserializer(
  item: any,
): L3UniqueRouteDistinguisherProperties {
  return {
    uniqueRds: !item["uniqueRds"]
      ? item["uniqueRds"]
      : item["uniqueRds"].map((p: any) => {
          return p;
        }),
  };
}

/** Layer3 Route prefix limit configuration. */
export interface RoutePrefixLimitProperties {
  /** Hard limit for the routes. */
  hardLimit?: number;
  /** Threshold for the routes. */
  threshold?: number;
}

export function routePrefixLimitPropertiesSerializer(item: RoutePrefixLimitProperties): any {
  return { hardLimit: item["hardLimit"], threshold: item["threshold"] };
}

export function routePrefixLimitPropertiesDeserializer(item: any): RoutePrefixLimitProperties {
  return {
    hardLimit: item["hardLimit"],
    threshold: item["threshold"],
  };
}

/** The L3 Isolation Domain patch resource definition. */
export interface L3IsolationDomainPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Resource properties. */
  properties?: L3IsolationDomainPatchProperties;
}

export function l3IsolationDomainPatchSerializer(item: L3IsolationDomainPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : l3IsolationDomainPatchPropertiesSerializer(item["properties"]),
  };
}

/** Resource properties. */
export interface L3IsolationDomainPatchProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** Advertise Connected Subnets. Ex: "True" | "False". */
  redistributeConnectedSubnets?: RedistributeConnectedSubnets;
  /** Advertise Static Routes. Ex: "True" | "False". */
  redistributeStaticRoutes?: RedistributeStaticRoutes;
  /** Aggregate route configurations. */
  aggregateRouteConfiguration?: AggregateRoutePatchConfiguration;
  /** Connected Subnet RoutePolicy */
  connectedSubnetRoutePolicy?: ConnectedSubnetRoutePolicyPatch;
  /** Static Route - route policy. */
  staticRouteRoutePolicy?: StaticRouteRoutePolicyPatch;
  /** Virtual Routing and Forwarding (VRF) Limit configuration. */
  routePrefixLimit?: RoutePrefixLimitPatchProperties;
}

export function l3IsolationDomainPatchPropertiesSerializer(
  item: L3IsolationDomainPatchProperties,
): any {
  return {
    annotation: item["annotation"],
    redistributeConnectedSubnets: item["redistributeConnectedSubnets"],
    redistributeStaticRoutes: item["redistributeStaticRoutes"],
    aggregateRouteConfiguration: !item["aggregateRouteConfiguration"]
      ? item["aggregateRouteConfiguration"]
      : aggregateRoutePatchConfigurationSerializer(item["aggregateRouteConfiguration"]),
    connectedSubnetRoutePolicy: !item["connectedSubnetRoutePolicy"]
      ? item["connectedSubnetRoutePolicy"]
      : connectedSubnetRoutePolicyPatchSerializer(item["connectedSubnetRoutePolicy"]),
    staticRouteRoutePolicy: !item["staticRouteRoutePolicy"]
      ? item["staticRouteRoutePolicy"]
      : staticRouteRoutePolicyPatchSerializer(item["staticRouteRoutePolicy"]),
    routePrefixLimit: !item["routePrefixLimit"]
      ? item["routePrefixLimit"]
      : routePrefixLimitPatchPropertiesSerializer(item["routePrefixLimit"]),
  };
}

/** List of IPv4 and IPv6 aggregate routes. */
export interface AggregateRoutePatchConfiguration {
  /** List of IPv4 Route prefixes. */
  ipv4Routes?: AggregateRoute[];
  /** List of Ipv6Routes prefixes. */
  ipv6Routes?: AggregateRoute[];
}

export function aggregateRoutePatchConfigurationSerializer(
  item: AggregateRoutePatchConfiguration,
): any {
  return {
    ipv4Routes: !item["ipv4Routes"]
      ? item["ipv4Routes"]
      : aggregateRouteArraySerializer(item["ipv4Routes"]),
    ipv6Routes: !item["ipv6Routes"]
      ? item["ipv6Routes"]
      : aggregateRouteArraySerializer(item["ipv6Routes"]),
  };
}

/** Connected Subnet Route Policy properties. */
export interface ConnectedSubnetRoutePolicyPatch {
  /** Array of ARM Resource ID of the RoutePolicies. */
  exportRoutePolicy?: L3ExportRoutePolicyPatch;
}

export function connectedSubnetRoutePolicyPatchSerializer(
  item: ConnectedSubnetRoutePolicyPatch,
): any {
  return {
    exportRoutePolicy: !item["exportRoutePolicy"]
      ? item["exportRoutePolicy"]
      : l3ExportRoutePolicyPatchSerializer(item["exportRoutePolicy"]),
  };
}

/** Array of ARM Resource ID of the RoutePolicies. */
export interface L3ExportRoutePolicyPatch {
  /** ARM Resource ID of the RoutePolicy. */
  exportIpv4RoutePolicyId?: string;
  /** ARM Resource ID of the RoutePolicy. */
  exportIpv6RoutePolicyId?: string;
}

export function l3ExportRoutePolicyPatchSerializer(item: L3ExportRoutePolicyPatch): any {
  return {
    exportIpv4RoutePolicyId: item["exportIpv4RoutePolicyId"],
    exportIpv6RoutePolicyId: item["exportIpv6RoutePolicyId"],
  };
}

/** Static Route - route policy properties. */
export interface StaticRouteRoutePolicyPatch {
  /** Array of ARM Resource ID of the RoutePolicies. */
  exportRoutePolicy?: L3ExportRoutePolicyPatch;
}

export function staticRouteRoutePolicyPatchSerializer(item: StaticRouteRoutePolicyPatch): any {
  return {
    exportRoutePolicy: !item["exportRoutePolicy"]
      ? item["exportRoutePolicy"]
      : l3ExportRoutePolicyPatchSerializer(item["exportRoutePolicy"]),
  };
}

/** VRP Limit patch configuration. */
export interface RoutePrefixLimitPatchProperties {
  /** Hard limit for the routes. */
  hardLimit?: number;
  /** Threshold for the routes. */
  threshold?: number;
}

export function routePrefixLimitPatchPropertiesSerializer(
  item: RoutePrefixLimitPatchProperties,
): any {
  return { hardLimit: item["hardLimit"], threshold: item["threshold"] };
}

/** The response of a L3IsolationDomain list operation. */
export interface _L3IsolationDomainListResult {
  /** The L3IsolationDomain items on this page */
  value: L3IsolationDomain[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _l3IsolationDomainListResultDeserializer(item: any): _L3IsolationDomainListResult {
  return {
    value: l3IsolationDomainArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function l3IsolationDomainArraySerializer(result: Array<L3IsolationDomain>): any[] {
  return result.map((item) => {
    return l3IsolationDomainSerializer(item);
  });
}

export function l3IsolationDomainArrayDeserializer(result: Array<L3IsolationDomain>): any[] {
  return result.map((item) => {
    return l3IsolationDomainDeserializer(item);
  });
}

/** Defines the Internal Network resource. */
export interface InternalNetwork extends ProxyResource {
  /** The Internal Network Properties */
  properties: InternalNetworkProperties;
}

export function internalNetworkSerializer(item: InternalNetwork): any {
  return {
    properties: internalNetworkPropertiesSerializer(item["properties"]),
  };
}

export function internalNetworkDeserializer(item: any): InternalNetwork {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: internalNetworkPropertiesDeserializer(item["properties"]),
  };
}

/** Internal Network Properties defines the properties of the resource. */
export interface InternalNetworkProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** Maximum transmission unit. Default value is 1500. */
  mtu?: number;
  /** List of Connected IPv4 Subnets. */
  connectedIPv4Subnets?: ConnectedSubnet[];
  /** List of connected IPv6 Subnets. */
  connectedIPv6Subnets?: ConnectedSubnet[];
  /** Import Route Policy either IPv4 or IPv6. */
  importRoutePolicy?: ImportRoutePolicy;
  /** Export Route Policy either IPv4 or IPv6. */
  exportRoutePolicy?: ExportRoutePolicy;
  /** Ingress Acl. ARM resource ID of Access Control Lists. */
  ingressAclId?: string;
  /** Egress Acl. ARM resource ID of Access Control Lists. */
  egressAclId?: string;
  /** To check whether monitoring of internal network is enabled or not. */
  isMonitoringEnabled?: IsMonitoringEnabled;
  /** Extension. Example: NoExtension | NPB. */
  extension?: Extension;
  /** Vlan identifier. Example: 1001. */
  vlanId: number;
  /** BGP configuration properties. */
  bgpConfiguration?: BgpConfiguration;
  /** Static Route Configuration properties. */
  staticRouteConfiguration?: StaticRouteConfiguration;
  /** Native IPv4 Prefix Limit Configuration properties. */
  nativeIpv4PrefixLimit?: NativeIpv4PrefixLimitProperties;
  /** Native IPv6 Prefix Limit Configuration properties. */
  nativeIpv6PrefixLimit?: NativeIpv6PrefixLimitProperties;
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Configuration state of the resource. */
  readonly configurationState?: ConfigurationState;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Administrative state of the resource. */
  readonly administrativeState?: AdministrativeState;
}

export function internalNetworkPropertiesSerializer(item: InternalNetworkProperties): any {
  return {
    annotation: item["annotation"],
    mtu: item["mtu"],
    connectedIPv4Subnets: !item["connectedIPv4Subnets"]
      ? item["connectedIPv4Subnets"]
      : connectedSubnetArraySerializer(item["connectedIPv4Subnets"]),
    connectedIPv6Subnets: !item["connectedIPv6Subnets"]
      ? item["connectedIPv6Subnets"]
      : connectedSubnetArraySerializer(item["connectedIPv6Subnets"]),
    importRoutePolicy: !item["importRoutePolicy"]
      ? item["importRoutePolicy"]
      : importRoutePolicySerializer(item["importRoutePolicy"]),
    exportRoutePolicy: !item["exportRoutePolicy"]
      ? item["exportRoutePolicy"]
      : exportRoutePolicySerializer(item["exportRoutePolicy"]),
    ingressAclId: item["ingressAclId"],
    egressAclId: item["egressAclId"],
    isMonitoringEnabled: item["isMonitoringEnabled"],
    extension: item["extension"],
    vlanId: item["vlanId"],
    bgpConfiguration: !item["bgpConfiguration"]
      ? item["bgpConfiguration"]
      : bgpConfigurationSerializer(item["bgpConfiguration"]),
    staticRouteConfiguration: !item["staticRouteConfiguration"]
      ? item["staticRouteConfiguration"]
      : staticRouteConfigurationSerializer(item["staticRouteConfiguration"]),
    nativeIpv4PrefixLimit: !item["nativeIpv4PrefixLimit"]
      ? item["nativeIpv4PrefixLimit"]
      : nativeIpv4PrefixLimitPropertiesSerializer(item["nativeIpv4PrefixLimit"]),
    nativeIpv6PrefixLimit: !item["nativeIpv6PrefixLimit"]
      ? item["nativeIpv6PrefixLimit"]
      : nativeIpv6PrefixLimitPropertiesSerializer(item["nativeIpv6PrefixLimit"]),
  };
}

export function internalNetworkPropertiesDeserializer(item: any): InternalNetworkProperties {
  return {
    annotation: item["annotation"],
    mtu: item["mtu"],
    connectedIPv4Subnets: !item["connectedIPv4Subnets"]
      ? item["connectedIPv4Subnets"]
      : connectedSubnetArrayDeserializer(item["connectedIPv4Subnets"]),
    connectedIPv6Subnets: !item["connectedIPv6Subnets"]
      ? item["connectedIPv6Subnets"]
      : connectedSubnetArrayDeserializer(item["connectedIPv6Subnets"]),
    importRoutePolicy: !item["importRoutePolicy"]
      ? item["importRoutePolicy"]
      : importRoutePolicyDeserializer(item["importRoutePolicy"]),
    exportRoutePolicy: !item["exportRoutePolicy"]
      ? item["exportRoutePolicy"]
      : exportRoutePolicyDeserializer(item["exportRoutePolicy"]),
    ingressAclId: item["ingressAclId"],
    egressAclId: item["egressAclId"],
    isMonitoringEnabled: item["isMonitoringEnabled"],
    extension: item["extension"],
    vlanId: item["vlanId"],
    bgpConfiguration: !item["bgpConfiguration"]
      ? item["bgpConfiguration"]
      : bgpConfigurationDeserializer(item["bgpConfiguration"]),
    staticRouteConfiguration: !item["staticRouteConfiguration"]
      ? item["staticRouteConfiguration"]
      : staticRouteConfigurationDeserializer(item["staticRouteConfiguration"]),
    nativeIpv4PrefixLimit: !item["nativeIpv4PrefixLimit"]
      ? item["nativeIpv4PrefixLimit"]
      : nativeIpv4PrefixLimitPropertiesDeserializer(item["nativeIpv4PrefixLimit"]),
    nativeIpv6PrefixLimit: !item["nativeIpv6PrefixLimit"]
      ? item["nativeIpv6PrefixLimit"]
      : nativeIpv6PrefixLimitPropertiesDeserializer(item["nativeIpv6PrefixLimit"]),
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    configurationState: item["configurationState"],
    provisioningState: item["provisioningState"],
    administrativeState: item["administrativeState"],
  };
}

export function connectedSubnetArraySerializer(result: Array<ConnectedSubnet>): any[] {
  return result.map((item) => {
    return connectedSubnetSerializer(item);
  });
}

export function connectedSubnetArrayDeserializer(result: Array<ConnectedSubnet>): any[] {
  return result.map((item) => {
    return connectedSubnetDeserializer(item);
  });
}

/** Connected Subnet properties. */
export interface ConnectedSubnet {
  /** Switch configuration description. */
  annotation?: string;
  /** Prefix of the Connected Subnet. */
  prefix: string;
}

export function connectedSubnetSerializer(item: ConnectedSubnet): any {
  return { annotation: item["annotation"], prefix: item["prefix"] };
}

export function connectedSubnetDeserializer(item: any): ConnectedSubnet {
  return {
    annotation: item["annotation"],
    prefix: item["prefix"],
  };
}

/** Import Route Policy either IPv4 or IPv6. */
export interface ImportRoutePolicy {
  /** ARM resource ID of RoutePolicy. */
  importIpv4RoutePolicyId?: string;
  /** ARM resource ID of RoutePolicy. */
  importIpv6RoutePolicyId?: string;
}

export function importRoutePolicySerializer(item: ImportRoutePolicy): any {
  return {
    importIpv4RoutePolicyId: item["importIpv4RoutePolicyId"],
    importIpv6RoutePolicyId: item["importIpv6RoutePolicyId"],
  };
}

export function importRoutePolicyDeserializer(item: any): ImportRoutePolicy {
  return {
    importIpv4RoutePolicyId: item["importIpv4RoutePolicyId"],
    importIpv6RoutePolicyId: item["importIpv6RoutePolicyId"],
  };
}

/** Export Route Policy either IPv4 or IPv6. */
export interface ExportRoutePolicy {
  /** ARM resource ID of RoutePolicy. */
  exportIpv4RoutePolicyId?: string;
  /** ARM resource ID of RoutePolicy. */
  exportIpv6RoutePolicyId?: string;
}

export function exportRoutePolicySerializer(item: ExportRoutePolicy): any {
  return {
    exportIpv4RoutePolicyId: item["exportIpv4RoutePolicyId"],
    exportIpv6RoutePolicyId: item["exportIpv6RoutePolicyId"],
  };
}

export function exportRoutePolicyDeserializer(item: any): ExportRoutePolicy {
  return {
    exportIpv4RoutePolicyId: item["exportIpv4RoutePolicyId"],
    exportIpv6RoutePolicyId: item["exportIpv6RoutePolicyId"],
  };
}

/** To check whether monitoring of internal network is enabled or not. */
export enum KnownIsMonitoringEnabled {
  /** IsMonitoringEnabled-True */
  True = "True",
  /** IsMonitoringEnabled-False */
  False = "False",
}

/**
 * To check whether monitoring of internal network is enabled or not. \
 * {@link KnownIsMonitoringEnabled} can be used interchangeably with IsMonitoringEnabled,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: IsMonitoringEnabled-True \
 * **False**: IsMonitoringEnabled-False
 */
export type IsMonitoringEnabled = string;

/** Extension. Example: NoExtension | NPB. */
export enum KnownExtension {
  /** Extension-NoExtension */
  NoExtension = "NoExtension",
  /** Extension-NPB */
  NPB = "NPB",
}

/**
 * Extension. Example: NoExtension | NPB. \
 * {@link KnownExtension} can be used interchangeably with Extension,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NoExtension**: Extension-NoExtension \
 * **NPB**: Extension-NPB
 */
export type Extension = string;

/** BGP configuration properties */
export interface BgpConfiguration {
  /** Switch configuration description. */
  annotation?: string;
  /** BFD configuration properties */
  bfdConfiguration?: BfdConfiguration;
  /** Originate a defaultRoute. Ex: "True" | "False". */
  defaultRouteOriginate?: BooleanEnumProperty;
  /** Allows for routes to be received and processed even if the router detects its own ASN in the AS-Path. 0 is disable, Possible values are 1-10, default is 2. */
  allowAS?: number;
  /** Enable Or Disable state. */
  allowASOverride?: AllowASOverride;
  /** ASN of Network Fabric. Example: 65048. */
  readonly fabricASN?: number;
  /** Peer ASN. Example: 65047. */
  peerASN: number;
  /** List of BGP IPv4 Listen Range prefixes. */
  ipv4ListenRangePrefixes?: string[];
  /** List of BGP IPv6 Listen Ranges prefixes. */
  ipv6ListenRangePrefixes?: string[];
  /** List with stringified IPv4 Neighbor Addresses. */
  ipv4NeighborAddress?: NeighborAddress[];
  /** List with stringified IPv6 Neighbor Address. */
  ipv6NeighborAddress?: NeighborAddress[];
  /** InternalNetwork BMP Configuration */
  bmpConfiguration?: InternalNetworkBmpProperties;
  /** V4 over V6 bgp session. */
  v4OverV6BgpSession?: V4OverV6BgpSessionState;
  /** v6 over v4 bgp session. */
  v6OverV4BgpSession?: V6OverV4BgpSessionState;
}

export function bgpConfigurationSerializer(item: BgpConfiguration): any {
  return {
    annotation: item["annotation"],
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdConfigurationSerializer(item["bfdConfiguration"]),
    defaultRouteOriginate: item["defaultRouteOriginate"],
    allowAS: item["allowAS"],
    allowASOverride: item["allowASOverride"],
    peerASN: item["peerASN"],
    ipv4ListenRangePrefixes: !item["ipv4ListenRangePrefixes"]
      ? item["ipv4ListenRangePrefixes"]
      : item["ipv4ListenRangePrefixes"].map((p: any) => {
          return p;
        }),
    ipv6ListenRangePrefixes: !item["ipv6ListenRangePrefixes"]
      ? item["ipv6ListenRangePrefixes"]
      : item["ipv6ListenRangePrefixes"].map((p: any) => {
          return p;
        }),
    ipv4NeighborAddress: !item["ipv4NeighborAddress"]
      ? item["ipv4NeighborAddress"]
      : neighborAddressArraySerializer(item["ipv4NeighborAddress"]),
    ipv6NeighborAddress: !item["ipv6NeighborAddress"]
      ? item["ipv6NeighborAddress"]
      : neighborAddressArraySerializer(item["ipv6NeighborAddress"]),
    bmpConfiguration: !item["bmpConfiguration"]
      ? item["bmpConfiguration"]
      : internalNetworkBmpPropertiesSerializer(item["bmpConfiguration"]),
    v4OverV6BgpSession: item["v4OverV6BgpSession"],
    v6OverV4BgpSession: item["v6OverV4BgpSession"],
  };
}

export function bgpConfigurationDeserializer(item: any): BgpConfiguration {
  return {
    annotation: item["annotation"],
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdConfigurationDeserializer(item["bfdConfiguration"]),
    defaultRouteOriginate: item["defaultRouteOriginate"],
    allowAS: item["allowAS"],
    allowASOverride: item["allowASOverride"],
    fabricASN: item["fabricASN"],
    peerASN: item["peerASN"],
    ipv4ListenRangePrefixes: !item["ipv4ListenRangePrefixes"]
      ? item["ipv4ListenRangePrefixes"]
      : item["ipv4ListenRangePrefixes"].map((p: any) => {
          return p;
        }),
    ipv6ListenRangePrefixes: !item["ipv6ListenRangePrefixes"]
      ? item["ipv6ListenRangePrefixes"]
      : item["ipv6ListenRangePrefixes"].map((p: any) => {
          return p;
        }),
    ipv4NeighborAddress: !item["ipv4NeighborAddress"]
      ? item["ipv4NeighborAddress"]
      : neighborAddressArrayDeserializer(item["ipv4NeighborAddress"]),
    ipv6NeighborAddress: !item["ipv6NeighborAddress"]
      ? item["ipv6NeighborAddress"]
      : neighborAddressArrayDeserializer(item["ipv6NeighborAddress"]),
    bmpConfiguration: !item["bmpConfiguration"]
      ? item["bmpConfiguration"]
      : internalNetworkBmpPropertiesDeserializer(item["bmpConfiguration"]),
    v4OverV6BgpSession: item["v4OverV6BgpSession"],
    v6OverV4BgpSession: item["v6OverV4BgpSession"],
  };
}

/** BFD configuration properties */
export interface BfdConfiguration {
  /** Administrative state of the BfdConfiguration. Example: Enabled | Disabled. */
  readonly administrativeState?: BfdAdministrativeState;
  /** Interval in milliseconds. Example: 300. */
  intervalInMilliSeconds?: number;
  /** Multiplier for the Bfd Configuration. Example: 5. */
  multiplier?: number;
}

export function bfdConfigurationSerializer(item: BfdConfiguration): any {
  return {
    intervalInMilliSeconds: item["intervalInMilliSeconds"],
    multiplier: item["multiplier"],
  };
}

export function bfdConfigurationDeserializer(item: any): BfdConfiguration {
  return {
    administrativeState: item["administrativeState"],
    intervalInMilliSeconds: item["intervalInMilliSeconds"],
    multiplier: item["multiplier"],
  };
}

/** Administrative state of the BfdConfiguration. Example: Enabled | Disabled. */
export enum KnownBfdAdministrativeState {
  /** Represents the enabled state of BFD administrative state. */
  Enabled = "Enabled",
  /** Represents the disabled state of BFD administrative state. */
  Disabled = "Disabled",
  /** Represents the MAT(Manual Action Taken) state of BFD administrative state. */
  MAT = "MAT",
  /** Represents the RMA(Return Material Authorization) state of BFD administrative state. */
  RMA = "RMA",
}

/**
 * Administrative state of the BfdConfiguration. Example: Enabled | Disabled. \
 * {@link KnownBfdAdministrativeState} can be used interchangeably with BfdAdministrativeState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Represents the enabled state of BFD administrative state. \
 * **Disabled**: Represents the disabled state of BFD administrative state. \
 * **MAT**: Represents the MAT(Manual Action Taken) state of BFD administrative state. \
 * **RMA**: Represents the RMA(Return Material Authorization) state of BFD administrative state.
 */
export type BfdAdministrativeState = string;

/** Enable Or Disable state. */
export enum KnownAllowASOverride {
  /** AllowASOverride-Enable */
  Enable = "Enable",
  /** AllowASOverride-Disable */
  Disable = "Disable",
}

/**
 * Enable Or Disable state. \
 * {@link KnownAllowASOverride} can be used interchangeably with AllowASOverride,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enable**: AllowASOverride-Enable \
 * **Disable**: AllowASOverride-Disable
 */
export type AllowASOverride = string;

export function neighborAddressArraySerializer(result: Array<NeighborAddress>): any[] {
  return result.map((item) => {
    return neighborAddressSerializer(item);
  });
}

export function neighborAddressArrayDeserializer(result: Array<NeighborAddress>): any[] {
  return result.map((item) => {
    return neighborAddressDeserializer(item);
  });
}

/** Neighbor Address properties. */
export interface NeighborAddress {
  /** IP Address. */
  address?: string;
  /** BFD Administrative State for each Neighbor Address. Example: Enabled | Disabled. */
  readonly bfdAdministrativeState?: BfdAdministrativeState;
  /** BGP Administrative State for each Neighbor Address. Example: Enabled | Disabled. */
  readonly bgpAdministrativeState?: BgpAdministrativeState;
  /** Configuration state of the resource. */
  readonly configurationState?: ConfigurationState;
}

export function neighborAddressSerializer(item: NeighborAddress): any {
  return { address: item["address"] };
}

export function neighborAddressDeserializer(item: any): NeighborAddress {
  return {
    address: item["address"],
    bfdAdministrativeState: item["bfdAdministrativeState"],
    bgpAdministrativeState: item["bgpAdministrativeState"],
    configurationState: item["configurationState"],
  };
}

/** Border Gateway Protocol (BGP) Administrative State values */
export enum KnownBgpAdministrativeState {
  /** BgpAdministrativeState-Enabled */
  Enabled = "Enabled",
  /** BgpAdministrativeState-Disabled */
  Disabled = "Disabled",
}

/**
 * Border Gateway Protocol (BGP) Administrative State values \
 * {@link KnownBgpAdministrativeState} can be used interchangeably with BgpAdministrativeState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: BgpAdministrativeState-Enabled \
 * **Disabled**: BgpAdministrativeState-Disabled
 */
export type BgpAdministrativeState = string;

/** Internal Network BMP Configuration */
export interface InternalNetworkBmpProperties {
  /** BMP Collector Address. */
  neighborIpExclusions?: string[];
  /** BMP Monitoring configuration state. */
  bmpConfigurationState?: BmpConfigurationState;
}

export function internalNetworkBmpPropertiesSerializer(item: InternalNetworkBmpProperties): any {
  return {
    neighborIpExclusions: !item["neighborIpExclusions"]
      ? item["neighborIpExclusions"]
      : item["neighborIpExclusions"].map((p: any) => {
          return p;
        }),
    bmpConfigurationState: item["bmpConfigurationState"],
  };
}

export function internalNetworkBmpPropertiesDeserializer(item: any): InternalNetworkBmpProperties {
  return {
    neighborIpExclusions: !item["neighborIpExclusions"]
      ? item["neighborIpExclusions"]
      : item["neighborIpExclusions"].map((p: any) => {
          return p;
        }),
    bmpConfigurationState: item["bmpConfigurationState"],
  };
}

/** BGP Monitoring Protocol (BMP) configuration state. */
export enum KnownBmpConfigurationState {
  /** BGP Monitoring Protocol (BMP) ConfigurationState - Enabled */
  Enabled = "Enabled",
  /** BGP Monitoring Protocol (BMP) ConfigurationState - Disabled */
  Disabled = "Disabled",
}

/**
 * BGP Monitoring Protocol (BMP) configuration state. \
 * {@link KnownBmpConfigurationState} can be used interchangeably with BmpConfigurationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: BGP Monitoring Protocol (BMP) ConfigurationState - Enabled \
 * **Disabled**: BGP Monitoring Protocol (BMP) ConfigurationState - Disabled
 */
export type BmpConfigurationState = string;

/** V4 over V6 BGP session state */
export enum KnownV4OverV6BgpSessionState {
  /** V4OverV6BgpSessionState-Enabled */
  Enabled = "Enabled",
  /** V4OverV6BgpSessionState-Disabled */
  Disabled = "Disabled",
}

/**
 * V4 over V6 BGP session state \
 * {@link KnownV4OverV6BgpSessionState} can be used interchangeably with V4OverV6BgpSessionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: V4OverV6BgpSessionState-Enabled \
 * **Disabled**: V4OverV6BgpSessionState-Disabled
 */
export type V4OverV6BgpSessionState = string;

/** V6 over V4 BGP session state */
export enum KnownV6OverV4BgpSessionState {
  /** V6OverV4BgpSessionState-Enabled */
  Enabled = "Enabled",
  /** V6OverV4BgpSessionState-Disabled */
  Disabled = "Disabled",
}

/**
 * V6 over V4 BGP session state \
 * {@link KnownV6OverV4BgpSessionState} can be used interchangeably with V6OverV4BgpSessionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: V6OverV4BgpSessionState-Enabled \
 * **Disabled**: V6OverV4BgpSessionState-Disabled
 */
export type V6OverV4BgpSessionState = string;

/** Static Route Configuration properties. */
export interface StaticRouteConfiguration {
  /** BFD configuration properties */
  bfdConfiguration?: BfdConfiguration;
  /** List of IPv4 Routes. */
  ipv4Routes?: StaticRouteProperties[];
  /** List of IPv6 Routes. */
  ipv6Routes?: StaticRouteProperties[];
  /** Extension. Example: NoExtension | NPB. */
  extension?: Extension;
}

export function staticRouteConfigurationSerializer(item: StaticRouteConfiguration): any {
  return {
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdConfigurationSerializer(item["bfdConfiguration"]),
    ipv4Routes: !item["ipv4Routes"]
      ? item["ipv4Routes"]
      : staticRoutePropertiesArraySerializer(item["ipv4Routes"]),
    ipv6Routes: !item["ipv6Routes"]
      ? item["ipv6Routes"]
      : staticRoutePropertiesArraySerializer(item["ipv6Routes"]),
    extension: item["extension"],
  };
}

export function staticRouteConfigurationDeserializer(item: any): StaticRouteConfiguration {
  return {
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdConfigurationDeserializer(item["bfdConfiguration"]),
    ipv4Routes: !item["ipv4Routes"]
      ? item["ipv4Routes"]
      : staticRoutePropertiesArrayDeserializer(item["ipv4Routes"]),
    ipv6Routes: !item["ipv6Routes"]
      ? item["ipv6Routes"]
      : staticRoutePropertiesArrayDeserializer(item["ipv6Routes"]),
    extension: item["extension"],
  };
}

export function staticRoutePropertiesArraySerializer(result: Array<StaticRouteProperties>): any[] {
  return result.map((item) => {
    return staticRoutePropertiesSerializer(item);
  });
}

export function staticRoutePropertiesArrayDeserializer(
  result: Array<StaticRouteProperties>,
): any[] {
  return result.map((item) => {
    return staticRoutePropertiesDeserializer(item);
  });
}

/** Route Properties. */
export interface StaticRouteProperties {
  /** Prefix of the route. */
  prefix: string;
  /** List of next hop addresses. */
  nextHop: string[];
}

export function staticRoutePropertiesSerializer(item: StaticRouteProperties): any {
  return {
    prefix: item["prefix"],
    nextHop: item["nextHop"].map((p: any) => {
      return p;
    }),
  };
}

export function staticRoutePropertiesDeserializer(item: any): StaticRouteProperties {
  return {
    prefix: item["prefix"],
    nextHop: item["nextHop"].map((p: any) => {
      return p;
    }),
  };
}

/** External Network native IPv4 prefix limit properties */
export interface NativeIpv4PrefixLimitProperties {
  /** Prefix limits */
  prefixLimits?: PrefixLimitProperties[];
}

export function nativeIpv4PrefixLimitPropertiesSerializer(
  item: NativeIpv4PrefixLimitProperties,
): any {
  return {
    prefixLimits: !item["prefixLimits"]
      ? item["prefixLimits"]
      : prefixLimitPropertiesArraySerializer(item["prefixLimits"]),
  };
}

export function nativeIpv4PrefixLimitPropertiesDeserializer(
  item: any,
): NativeIpv4PrefixLimitProperties {
  return {
    prefixLimits: !item["prefixLimits"]
      ? item["prefixLimits"]
      : prefixLimitPropertiesArrayDeserializer(item["prefixLimits"]),
  };
}

export function prefixLimitPropertiesArraySerializer(result: Array<PrefixLimitProperties>): any[] {
  return result.map((item) => {
    return prefixLimitPropertiesSerializer(item);
  });
}

export function prefixLimitPropertiesArrayDeserializer(
  result: Array<PrefixLimitProperties>,
): any[] {
  return result.map((item) => {
    return prefixLimitPropertiesDeserializer(item);
  });
}

/** Prefix Limit properties. */
export interface PrefixLimitProperties {
  /** Maximum routes allowed. */
  maximumRoutes?: number;
  /** Limit at which route prefixes a warning is generate. */
  threshold?: number;
  /** Idle Time Expiry in seconds, default is 60. */
  idleTimeExpiry?: number;
}

export function prefixLimitPropertiesSerializer(item: PrefixLimitProperties): any {
  return {
    maximumRoutes: item["maximumRoutes"],
    threshold: item["threshold"],
    idleTimeExpiry: item["idleTimeExpiry"],
  };
}

export function prefixLimitPropertiesDeserializer(item: any): PrefixLimitProperties {
  return {
    maximumRoutes: item["maximumRoutes"],
    threshold: item["threshold"],
    idleTimeExpiry: item["idleTimeExpiry"],
  };
}

/** External Network native IPv6 prefix limit properties */
export interface NativeIpv6PrefixLimitProperties {
  /** Prefix limits */
  prefixLimits?: PrefixLimitProperties[];
}

export function nativeIpv6PrefixLimitPropertiesSerializer(
  item: NativeIpv6PrefixLimitProperties,
): any {
  return {
    prefixLimits: !item["prefixLimits"]
      ? item["prefixLimits"]
      : prefixLimitPropertiesArraySerializer(item["prefixLimits"]),
  };
}

export function nativeIpv6PrefixLimitPropertiesDeserializer(
  item: any,
): NativeIpv6PrefixLimitProperties {
  return {
    prefixLimits: !item["prefixLimits"]
      ? item["prefixLimits"]
      : prefixLimitPropertiesArrayDeserializer(item["prefixLimits"]),
  };
}

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

/** The InternalNetwork patch resource definition. */
export interface InternalNetworkPatch {
  /** InternalNetwork Patch properties. */
  properties?: InternalNetworkPatchProperties;
}

export function internalNetworkPatchSerializer(item: InternalNetworkPatch): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : internalNetworkPatchPropertiesSerializer(item["properties"]),
  };
}

/** InternalNetwork Patch properties. */
export interface InternalNetworkPatchProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** Maximum transmission unit. Default value is 1500. */
  mtu?: number;
  /** List of Connected IPv4 Subnets. */
  connectedIPv4Subnets?: ConnectedSubnetPatch[];
  /** List of connected IPv6 Subnets. */
  connectedIPv6Subnets?: ConnectedSubnetPatch[];
  /** Import Route Policy either IPv4 or IPv6. */
  importRoutePolicy?: ImportRoutePolicy;
  /** Export Route Policy either IPv4 or IPv6. */
  exportRoutePolicy?: ExportRoutePolicy;
  /** Ingress Acl. ARM resource ID of Access Control Lists. */
  ingressAclId?: string;
  /** Egress Acl. ARM resource ID of Access Control Lists. */
  egressAclId?: string;
  /** To check whether monitoring of internal network is enabled or not. */
  isMonitoringEnabled?: IsMonitoringEnabled;
  /** BGP configuration properties. */
  bgpConfiguration?: BgpPatchConfiguration;
  /** Static Route Configuration properties. */
  staticRouteConfiguration?: StaticRoutePatchConfiguration;
  /** Native IPv4 Prefix Limit Configuration properties. */
  nativeIpv4PrefixLimit?: NativeIpv4PrefixLimitPatchProperties;
  /** Native IPv6 Prefix Limit Configuration properties. */
  nativeIpv6PrefixLimit?: NativeIpv6PrefixLimitPatchProperties;
}

export function internalNetworkPatchPropertiesSerializer(
  item: InternalNetworkPatchProperties,
): any {
  return {
    annotation: item["annotation"],
    mtu: item["mtu"],
    connectedIPv4Subnets: !item["connectedIPv4Subnets"]
      ? item["connectedIPv4Subnets"]
      : connectedSubnetPatchArraySerializer(item["connectedIPv4Subnets"]),
    connectedIPv6Subnets: !item["connectedIPv6Subnets"]
      ? item["connectedIPv6Subnets"]
      : connectedSubnetPatchArraySerializer(item["connectedIPv6Subnets"]),
    importRoutePolicy: !item["importRoutePolicy"]
      ? item["importRoutePolicy"]
      : importRoutePolicySerializer(item["importRoutePolicy"]),
    exportRoutePolicy: !item["exportRoutePolicy"]
      ? item["exportRoutePolicy"]
      : exportRoutePolicySerializer(item["exportRoutePolicy"]),
    ingressAclId: item["ingressAclId"],
    egressAclId: item["egressAclId"],
    isMonitoringEnabled: item["isMonitoringEnabled"],
    bgpConfiguration: !item["bgpConfiguration"]
      ? item["bgpConfiguration"]
      : bgpPatchConfigurationSerializer(item["bgpConfiguration"]),
    staticRouteConfiguration: !item["staticRouteConfiguration"]
      ? item["staticRouteConfiguration"]
      : staticRoutePatchConfigurationSerializer(item["staticRouteConfiguration"]),
    nativeIpv4PrefixLimit: !item["nativeIpv4PrefixLimit"]
      ? item["nativeIpv4PrefixLimit"]
      : nativeIpv4PrefixLimitPatchPropertiesSerializer(item["nativeIpv4PrefixLimit"]),
    nativeIpv6PrefixLimit: !item["nativeIpv6PrefixLimit"]
      ? item["nativeIpv6PrefixLimit"]
      : nativeIpv6PrefixLimitPatchPropertiesSerializer(item["nativeIpv6PrefixLimit"]),
  };
}

export function connectedSubnetPatchArraySerializer(result: Array<ConnectedSubnetPatch>): any[] {
  return result.map((item) => {
    return connectedSubnetPatchSerializer(item);
  });
}

/** Connected Subnet properties. */
export interface ConnectedSubnetPatch {
  /** Switch configuration description. */
  annotation?: string;
  /** Prefix of the Connected Subnet. */
  prefix: string;
}

export function connectedSubnetPatchSerializer(item: ConnectedSubnetPatch): any {
  return { annotation: item["annotation"], prefix: item["prefix"] };
}

/** BGP configuration properties. */
export interface BgpPatchConfiguration {
  /** Switch configuration description. */
  annotation?: string;
  /** BFD configuration properties */
  bfdConfiguration?: BfdPatchConfiguration;
  /** Originate a defaultRoute. Ex: "True" | "False". */
  defaultRouteOriginate?: BooleanEnumProperty;
  /** Allows for routes to be received and processed even if the router detects its own ASN in the AS-Path. 0 is disable, Possible values are 1-10, default is 2. */
  allowAS?: number;
  /** Enable Or Disable state. */
  allowASOverride?: AllowASOverride;
  /** ASN of Network Fabric. Example: 65048. */
  readonly fabricASN?: number;
  /** Peer ASN. Example: 65047. */
  peerASN?: number;
  /** List of BGP IPv4 Listen Range prefixes. */
  ipv4ListenRangePrefixes?: string[];
  /** List of BGP IPv6 Listen Ranges prefixes. */
  ipv6ListenRangePrefixes?: string[];
  /** List with stringified IPv4 Neighbor Addresses. */
  ipv4NeighborAddress?: NeighborAddressPatch[];
  /** List with stringified IPv6 Neighbor Address. */
  ipv6NeighborAddress?: NeighborAddressPatch[];
  /** InternalNetwork BMP Configuration */
  bmpConfiguration?: InternalNetworkBmpPatchProperties;
  /** V4 over V6 bgp session. */
  v4OverV6BgpSession?: V4OverV6BgpSessionState;
  /** v6 over v4 bgp session. */
  v6OverV4BgpSession?: V6OverV4BgpSessionState;
}

export function bgpPatchConfigurationSerializer(item: BgpPatchConfiguration): any {
  return {
    annotation: item["annotation"],
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdPatchConfigurationSerializer(item["bfdConfiguration"]),
    defaultRouteOriginate: item["defaultRouteOriginate"],
    allowAS: item["allowAS"],
    allowASOverride: item["allowASOverride"],
    peerASN: item["peerASN"],
    ipv4ListenRangePrefixes: !item["ipv4ListenRangePrefixes"]
      ? item["ipv4ListenRangePrefixes"]
      : item["ipv4ListenRangePrefixes"].map((p: any) => {
          return p;
        }),
    ipv6ListenRangePrefixes: !item["ipv6ListenRangePrefixes"]
      ? item["ipv6ListenRangePrefixes"]
      : item["ipv6ListenRangePrefixes"].map((p: any) => {
          return p;
        }),
    ipv4NeighborAddress: !item["ipv4NeighborAddress"]
      ? item["ipv4NeighborAddress"]
      : neighborAddressPatchArraySerializer(item["ipv4NeighborAddress"]),
    ipv6NeighborAddress: !item["ipv6NeighborAddress"]
      ? item["ipv6NeighborAddress"]
      : neighborAddressPatchArraySerializer(item["ipv6NeighborAddress"]),
    bmpConfiguration: !item["bmpConfiguration"]
      ? item["bmpConfiguration"]
      : internalNetworkBmpPatchPropertiesSerializer(item["bmpConfiguration"]),
    v4OverV6BgpSession: item["v4OverV6BgpSession"],
    v6OverV4BgpSession: item["v6OverV4BgpSession"],
  };
}

/** BFD configuration properties */
export interface BfdPatchConfiguration {
  /** Administrative state of the BfdConfiguration. Example: Enabled | Disabled. */
  readonly administrativeState?: BfdAdministrativeState;
  /** Interval in milliseconds. Example: 300. */
  intervalInMilliSeconds?: number;
  /** Multiplier for the Bfd Configuration. Example: 5. */
  multiplier?: number;
}

export function bfdPatchConfigurationSerializer(item: BfdPatchConfiguration): any {
  return {
    intervalInMilliSeconds: item["intervalInMilliSeconds"],
    multiplier: item["multiplier"],
  };
}

export function neighborAddressPatchArraySerializer(result: Array<NeighborAddressPatch>): any[] {
  return result.map((item) => {
    return neighborAddressPatchSerializer(item);
  });
}

/** Neighbor Address properties. */
export interface NeighborAddressPatch {
  /** IP Address. */
  address?: string;
  /** BFD Administrative State for each Neighbor Address. Example: Enabled | Disabled. */
  readonly bfdAdministrativeState?: BfdAdministrativeState;
  /** BGP Administrative State for each Neighbor Address. Example: Enabled | Disabled. */
  readonly bgpAdministrativeState?: BgpAdministrativeState;
  /** Configuration state of the resource. */
  readonly configurationState?: ConfigurationState;
}

export function neighborAddressPatchSerializer(item: NeighborAddressPatch): any {
  return { address: item["address"] };
}

/** Internal Network BMP Configuration */
export interface InternalNetworkBmpPatchProperties {
  /** BMP Collector Address. */
  neighborIpExclusions?: string[];
  /** BMP Monitoring configuration state. */
  bmpConfigurationState?: BmpConfigurationState;
}

export function internalNetworkBmpPatchPropertiesSerializer(
  item: InternalNetworkBmpPatchProperties,
): any {
  return {
    neighborIpExclusions: !item["neighborIpExclusions"]
      ? item["neighborIpExclusions"]
      : item["neighborIpExclusions"].map((p: any) => {
          return p;
        }),
    bmpConfigurationState: item["bmpConfigurationState"],
  };
}

/** Static Route Configuration properties. */
export interface StaticRoutePatchConfiguration {
  /** BFD configuration properties */
  bfdConfiguration?: BfdPatchConfiguration;
  /** List of IPv4 Routes. */
  ipv4Routes?: StaticRoutePatchProperties[];
  /** List of IPv6 Routes. */
  ipv6Routes?: StaticRoutePatchProperties[];
}

export function staticRoutePatchConfigurationSerializer(item: StaticRoutePatchConfiguration): any {
  return {
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdPatchConfigurationSerializer(item["bfdConfiguration"]),
    ipv4Routes: !item["ipv4Routes"]
      ? item["ipv4Routes"]
      : staticRoutePatchPropertiesArraySerializer(item["ipv4Routes"]),
    ipv6Routes: !item["ipv6Routes"]
      ? item["ipv6Routes"]
      : staticRoutePatchPropertiesArraySerializer(item["ipv6Routes"]),
  };
}

export function staticRoutePatchPropertiesArraySerializer(
  result: Array<StaticRoutePatchProperties>,
): any[] {
  return result.map((item) => {
    return staticRoutePatchPropertiesSerializer(item);
  });
}

/** Route Properties. */
export interface StaticRoutePatchProperties {
  /** Prefix of the route. */
  prefix: string;
  /** List of next hop addresses. */
  nextHop: string[];
}

export function staticRoutePatchPropertiesSerializer(item: StaticRoutePatchProperties): any {
  return {
    prefix: item["prefix"],
    nextHop: item["nextHop"].map((p: any) => {
      return p;
    }),
  };
}

/** External Network native IPv4 prefix limits patch properties */
export interface NativeIpv4PrefixLimitPatchProperties {
  /** Prefix limits */
  prefixLimits?: PrefixLimitPatchProperties[];
}

export function nativeIpv4PrefixLimitPatchPropertiesSerializer(
  item: NativeIpv4PrefixLimitPatchProperties,
): any {
  return {
    prefixLimits: !item["prefixLimits"]
      ? item["prefixLimits"]
      : prefixLimitPatchPropertiesArraySerializer(item["prefixLimits"]),
  };
}

export function prefixLimitPatchPropertiesArraySerializer(
  result: Array<PrefixLimitPatchProperties>,
): any[] {
  return result.map((item) => {
    return prefixLimitPatchPropertiesSerializer(item);
  });
}

/** Prefix Limit Patch properties. */
export interface PrefixLimitPatchProperties {
  /** Maximum routes allowed. */
  maximumRoutes?: number;
  /** Limit at which route prefixes a warning is generate. */
  threshold?: number;
  /** Idle time expiry in seconds. */
  idleTimeExpiry?: number;
}

export function prefixLimitPatchPropertiesSerializer(item: PrefixLimitPatchProperties): any {
  return {
    maximumRoutes: item["maximumRoutes"],
    threshold: item["threshold"],
    idleTimeExpiry: item["idleTimeExpiry"],
  };
}

/** External Network native IPv6 prefix limits patch properties */
export interface NativeIpv6PrefixLimitPatchProperties {
  /** Prefix limits */
  prefixLimits?: PrefixLimitPatchProperties[];
}

export function nativeIpv6PrefixLimitPatchPropertiesSerializer(
  item: NativeIpv6PrefixLimitPatchProperties,
): any {
  return {
    prefixLimits: !item["prefixLimits"]
      ? item["prefixLimits"]
      : prefixLimitPatchPropertiesArraySerializer(item["prefixLimits"]),
  };
}

/** The response of a InternalNetwork list operation. */
export interface _InternalNetworkListResult {
  /** The InternalNetwork items on this page */
  value: InternalNetwork[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _internalNetworkListResultDeserializer(item: any): _InternalNetworkListResult {
  return {
    value: internalNetworkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function internalNetworkArraySerializer(result: Array<InternalNetwork>): any[] {
  return result.map((item) => {
    return internalNetworkSerializer(item);
  });
}

export function internalNetworkArrayDeserializer(result: Array<InternalNetwork>): any[] {
  return result.map((item) => {
    return internalNetworkDeserializer(item);
  });
}

/** Internal Network Administrative State Request */
export interface InternalNetworkBgpAdministrativeStateRequest {
  /** NeighborAddress - Input should be either All or Specific Ipv4 Address or Specific Ipv6 Address. */
  neighborAddress?: string;
  /** BGP Administrative state. */
  administrativeState?: BgpAdministrativeState;
}

export function internalNetworkBgpAdministrativeStateRequestSerializer(
  item: InternalNetworkBgpAdministrativeStateRequest,
): any {
  return {
    neighborAddress: item["neighborAddress"],
    administrativeState: item["administrativeState"],
  };
}

/** Internal Network Administrative State Response */
export interface InternalNetworkBgpAdministrativeStateResponse {
  /** NeighborAddress administrative status */
  neighborAddressAdministrativeStatus?: NeighborAddressBgpAdministrativeStatus[];
  /** The error object. */
  error?: ErrorDetail;
}

export function internalNetworkBgpAdministrativeStateResponseDeserializer(
  item: any,
): InternalNetworkBgpAdministrativeStateResponse {
  return {
    neighborAddressAdministrativeStatus: !item["neighborAddressAdministrativeStatus"]
      ? item["neighborAddressAdministrativeStatus"]
      : neighborAddressBgpAdministrativeStatusArrayDeserializer(
          item["neighborAddressAdministrativeStatus"],
        ),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

export function neighborAddressBgpAdministrativeStatusArrayDeserializer(
  result: Array<NeighborAddressBgpAdministrativeStatus>,
): any[] {
  return result.map((item) => {
    return neighborAddressBgpAdministrativeStatusDeserializer(item);
  });
}

/** Neighbor Address BGP Administrative Status */
export interface NeighborAddressBgpAdministrativeStatus {
  /** NeighborAddress - Input should be either All or Specific Ipv4 Address or Specific Ipv6 Address. */
  neighborAddress?: string;
  /** BGP Administrative state. */
  administrativeState?: BgpAdministrativeState;
  /** Error message. */
  error?: string;
}

export function neighborAddressBgpAdministrativeStatusDeserializer(
  item: any,
): NeighborAddressBgpAdministrativeStatus {
  return {
    neighborAddress: item["neighborAddress"],
    administrativeState: item["administrativeState"],
    error: item["error"],
  };
}

/** Internal Network BFD Administrative State request */
export interface InternalNetworkBfdAdministrativeStateRequest {
  /** Route Type that helps to know which bfd we are updating. */
  routeType?: InternalNetworkRouteType;
  /** NeighborAddress - Input should be either All or Specific Ipv4 Address or Specific Ipv6 Address. */
  neighborAddress?: string;
  /** BFD Administrative state. */
  administrativeState?: BfdAdministrativeState;
}

export function internalNetworkBfdAdministrativeStateRequestSerializer(
  item: InternalNetworkBfdAdministrativeStateRequest,
): any {
  return {
    routeType: item["routeType"],
    neighborAddress: item["neighborAddress"],
    administrativeState: item["administrativeState"],
  };
}

/** Internal Network RouteType. */
export enum KnownInternalNetworkRouteType {
  /** InternalNetwork Static. */
  Static = "Static",
  /** InternalNetwork Bgp. */
  Bgp = "Bgp",
}

/**
 * Internal Network RouteType. \
 * {@link KnownInternalNetworkRouteType} can be used interchangeably with InternalNetworkRouteType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Static**: InternalNetwork Static. \
 * **Bgp**: InternalNetwork Bgp.
 */
export type InternalNetworkRouteType = string;

/** Internal Network BFD Administrative State response */
export interface InternalNetworkBfdAdministrativeStateResponse {
  /** NeighborAddress administrative status */
  neighborAddressAdministrativeStatus?: NeighborAddressBfdAdministrativeStatus[];
  /** The error object. */
  error?: ErrorDetail;
}

export function internalNetworkBfdAdministrativeStateResponseDeserializer(
  item: any,
): InternalNetworkBfdAdministrativeStateResponse {
  return {
    neighborAddressAdministrativeStatus: !item["neighborAddressAdministrativeStatus"]
      ? item["neighborAddressAdministrativeStatus"]
      : neighborAddressBfdAdministrativeStatusArrayDeserializer(
          item["neighborAddressAdministrativeStatus"],
        ),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

export function neighborAddressBfdAdministrativeStatusArrayDeserializer(
  result: Array<NeighborAddressBfdAdministrativeStatus>,
): any[] {
  return result.map((item) => {
    return neighborAddressBfdAdministrativeStatusDeserializer(item);
  });
}

/** Neighbor Address Bidirectional Forwarding Detection (BFD) Administrative Status */
export interface NeighborAddressBfdAdministrativeStatus {
  /** NeighborAddress - Input should be either All or Specific Ipv4 Address or Specific Ipv6 Address. */
  neighborAddress?: string;
  /** BFD Administrative state. */
  administrativeState?: BfdAdministrativeState;
  /** Error message. */
  error?: string;
}

export function neighborAddressBfdAdministrativeStatusDeserializer(
  item: any,
): NeighborAddressBfdAdministrativeStatus {
  return {
    neighborAddress: item["neighborAddress"],
    administrativeState: item["administrativeState"],
    error: item["error"],
  };
}

/** Defines the External Network resource. */
export interface ExternalNetwork extends ProxyResource {
  /** External Network Properties */
  properties: ExternalNetworkProperties;
}

export function externalNetworkSerializer(item: ExternalNetwork): any {
  return {
    properties: externalNetworkPropertiesSerializer(item["properties"]),
  };
}

export function externalNetworkDeserializer(item: any): ExternalNetwork {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: externalNetworkPropertiesDeserializer(item["properties"]),
  };
}

/** External Network Properties. */
export interface ExternalNetworkProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** ARM Resource ID of the networkToNetworkInterconnectId of the ExternalNetwork resource. */
  networkToNetworkInterconnectId?: string;
  /** Import Route Policy either IPv4 or IPv6. */
  importRoutePolicy?: ImportRoutePolicy;
  /** Export Route Policy either IPv4 or IPv6. */
  exportRoutePolicy?: ExportRoutePolicy;
  /** Peering option list. */
  peeringOption: PeeringOption;
  /** option B properties object */
  optionBProperties?: L3OptionBProperties;
  /** option A properties object */
  optionAProperties?: ExternalNetworkPropertiesOptionAProperties;
  /** Static Route Configuration. */
  staticRouteConfiguration?: ExternalNetworkStaticRouteConfiguration;
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Configuration state of the resource. */
  readonly configurationState?: ConfigurationState;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Administrative state of the resource. */
  readonly administrativeState?: AdministrativeState;
}

export function externalNetworkPropertiesSerializer(item: ExternalNetworkProperties): any {
  return {
    annotation: item["annotation"],
    networkToNetworkInterconnectId: item["networkToNetworkInterconnectId"],
    importRoutePolicy: !item["importRoutePolicy"]
      ? item["importRoutePolicy"]
      : importRoutePolicySerializer(item["importRoutePolicy"]),
    exportRoutePolicy: !item["exportRoutePolicy"]
      ? item["exportRoutePolicy"]
      : exportRoutePolicySerializer(item["exportRoutePolicy"]),
    peeringOption: item["peeringOption"],
    optionBProperties: !item["optionBProperties"]
      ? item["optionBProperties"]
      : l3OptionBPropertiesSerializer(item["optionBProperties"]),
    optionAProperties: !item["optionAProperties"]
      ? item["optionAProperties"]
      : externalNetworkPropertiesOptionAPropertiesSerializer(item["optionAProperties"]),
    staticRouteConfiguration: !item["staticRouteConfiguration"]
      ? item["staticRouteConfiguration"]
      : externalNetworkStaticRouteConfigurationSerializer(item["staticRouteConfiguration"]),
  };
}

export function externalNetworkPropertiesDeserializer(item: any): ExternalNetworkProperties {
  return {
    annotation: item["annotation"],
    networkToNetworkInterconnectId: item["networkToNetworkInterconnectId"],
    importRoutePolicy: !item["importRoutePolicy"]
      ? item["importRoutePolicy"]
      : importRoutePolicyDeserializer(item["importRoutePolicy"]),
    exportRoutePolicy: !item["exportRoutePolicy"]
      ? item["exportRoutePolicy"]
      : exportRoutePolicyDeserializer(item["exportRoutePolicy"]),
    peeringOption: item["peeringOption"],
    optionBProperties: !item["optionBProperties"]
      ? item["optionBProperties"]
      : l3OptionBPropertiesDeserializer(item["optionBProperties"]),
    optionAProperties: !item["optionAProperties"]
      ? item["optionAProperties"]
      : externalNetworkPropertiesOptionAPropertiesDeserializer(item["optionAProperties"]),
    staticRouteConfiguration: !item["staticRouteConfiguration"]
      ? item["staticRouteConfiguration"]
      : externalNetworkStaticRouteConfigurationDeserializer(item["staticRouteConfiguration"]),
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    configurationState: item["configurationState"],
    provisioningState: item["provisioningState"],
    administrativeState: item["administrativeState"],
  };
}

/** Peering option list. */
export enum KnownPeeringOption {
  /** PeeringOption-OptionA */
  OptionA = "OptionA",
  /** PeeringOption-OptionB */
  OptionB = "OptionB",
}

/**
 * Peering option list. \
 * {@link KnownPeeringOption} can be used interchangeably with PeeringOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OptionA**: PeeringOption-OptionA \
 * **OptionB**: PeeringOption-OptionB
 */
export type PeeringOption = string;

/** Option B configuration. */
export interface L3OptionBProperties {
  /** RouteTargets to be applied. This is used for the backward compatibility. */
  importRouteTargets?: string[];
  /** RouteTargets to be applied. This is used for the backward compatibility. */
  exportRouteTargets?: string[];
  /** RouteTargets to be applied. */
  routeTargets?: RouteTargetInformation;
}

export function l3OptionBPropertiesSerializer(item: L3OptionBProperties): any {
  return {
    importRouteTargets: !item["importRouteTargets"]
      ? item["importRouteTargets"]
      : item["importRouteTargets"].map((p: any) => {
          return p;
        }),
    exportRouteTargets: !item["exportRouteTargets"]
      ? item["exportRouteTargets"]
      : item["exportRouteTargets"].map((p: any) => {
          return p;
        }),
    routeTargets: !item["routeTargets"]
      ? item["routeTargets"]
      : routeTargetInformationSerializer(item["routeTargets"]),
  };
}

export function l3OptionBPropertiesDeserializer(item: any): L3OptionBProperties {
  return {
    importRouteTargets: !item["importRouteTargets"]
      ? item["importRouteTargets"]
      : item["importRouteTargets"].map((p: any) => {
          return p;
        }),
    exportRouteTargets: !item["exportRouteTargets"]
      ? item["exportRouteTargets"]
      : item["exportRouteTargets"].map((p: any) => {
          return p;
        }),
    routeTargets: !item["routeTargets"]
      ? item["routeTargets"]
      : routeTargetInformationDeserializer(item["routeTargets"]),
  };
}

/** Route Target Configuration. */
export interface RouteTargetInformation {
  /** Route Targets to be applied for incoming routes into CE. */
  importIpv4RouteTargets?: string[];
  /** Route Targets to be applied for incoming routes from CE. */
  importIpv6RouteTargets?: string[];
  /** Route Targets to be applied for outgoing routes into CE. */
  exportIpv4RouteTargets?: string[];
  /** Route Targets to be applied for outgoing routes from CE. */
  exportIpv6RouteTargets?: string[];
}

export function routeTargetInformationSerializer(item: RouteTargetInformation): any {
  return {
    importIpv4RouteTargets: !item["importIpv4RouteTargets"]
      ? item["importIpv4RouteTargets"]
      : item["importIpv4RouteTargets"].map((p: any) => {
          return p;
        }),
    importIpv6RouteTargets: !item["importIpv6RouteTargets"]
      ? item["importIpv6RouteTargets"]
      : item["importIpv6RouteTargets"].map((p: any) => {
          return p;
        }),
    exportIpv4RouteTargets: !item["exportIpv4RouteTargets"]
      ? item["exportIpv4RouteTargets"]
      : item["exportIpv4RouteTargets"].map((p: any) => {
          return p;
        }),
    exportIpv6RouteTargets: !item["exportIpv6RouteTargets"]
      ? item["exportIpv6RouteTargets"]
      : item["exportIpv6RouteTargets"].map((p: any) => {
          return p;
        }),
  };
}

export function routeTargetInformationDeserializer(item: any): RouteTargetInformation {
  return {
    importIpv4RouteTargets: !item["importIpv4RouteTargets"]
      ? item["importIpv4RouteTargets"]
      : item["importIpv4RouteTargets"].map((p: any) => {
          return p;
        }),
    importIpv6RouteTargets: !item["importIpv6RouteTargets"]
      ? item["importIpv6RouteTargets"]
      : item["importIpv6RouteTargets"].map((p: any) => {
          return p;
        }),
    exportIpv4RouteTargets: !item["exportIpv4RouteTargets"]
      ? item["exportIpv4RouteTargets"]
      : item["exportIpv4RouteTargets"].map((p: any) => {
          return p;
        }),
    exportIpv6RouteTargets: !item["exportIpv6RouteTargets"]
      ? item["exportIpv6RouteTargets"]
      : item["exportIpv6RouteTargets"].map((p: any) => {
          return p;
        }),
  };
}

/** option A properties object */
export interface ExternalNetworkPropertiesOptionAProperties {
  /** IPv4 Address Prefix. */
  primaryIpv4Prefix?: string;
  /** IPv6 Address Prefix. */
  primaryIpv6Prefix?: string;
  /** Secondary IPv4 Address Prefix. */
  secondaryIpv4Prefix?: string;
  /** Secondary IPv6 Address Prefix. */
  secondaryIpv6Prefix?: string;
  /** MTU to use for option A peering. */
  mtu?: number;
  /** Vlan identifier. Example : 501 */
  vlanId: number;
  /** Fabric ASN number. Example 65001 */
  readonly fabricASN?: number;
  /** Peer ASN number.Example : 28 */
  peerASN: number;
  /** BFD configuration properties */
  bfdConfiguration?: BfdConfiguration;
  /** Ingress Acl. ARM resource ID of Access Control Lists. */
  ingressAclId?: string;
  /** BMP Monitor Configuration. */
  bmpConfiguration?: ExternalNetworkBmpProperties;
  /** Egress Acl. ARM resource ID of Access Control Lists. */
  egressAclId?: string;
  /** V4OverV6 BGP Session state */
  v4OverV6BgpSession?: V4OverV6BgpSessionState;
  /** V6OverV4 BGP Session state */
  v6OverV4BgpSession?: V6OverV4BgpSessionState;
  /** Native IPv4 prefix limits configuration */
  nativeIpv4PrefixLimit?: NativeIpv4PrefixLimitProperties;
  /** Native IPv6 prefix limits configuration */
  nativeIpv6PrefixLimit?: NativeIpv6PrefixLimitProperties;
}

export function externalNetworkPropertiesOptionAPropertiesSerializer(
  item: ExternalNetworkPropertiesOptionAProperties,
): any {
  return {
    primaryIpv4Prefix: item["primaryIpv4Prefix"],
    primaryIpv6Prefix: item["primaryIpv6Prefix"],
    secondaryIpv4Prefix: item["secondaryIpv4Prefix"],
    secondaryIpv6Prefix: item["secondaryIpv6Prefix"],
    mtu: item["mtu"],
    vlanId: item["vlanId"],
    peerASN: item["peerASN"],
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdConfigurationSerializer(item["bfdConfiguration"]),
    ingressAclId: item["ingressAclId"],
    bmpConfiguration: !item["bmpConfiguration"]
      ? item["bmpConfiguration"]
      : externalNetworkBmpPropertiesSerializer(item["bmpConfiguration"]),
    egressAclId: item["egressAclId"],
    v4OverV6BgpSession: item["v4OverV6BgpSession"],
    v6OverV4BgpSession: item["v6OverV4BgpSession"],
    nativeIpv4PrefixLimit: !item["nativeIpv4PrefixLimit"]
      ? item["nativeIpv4PrefixLimit"]
      : nativeIpv4PrefixLimitPropertiesSerializer(item["nativeIpv4PrefixLimit"]),
    nativeIpv6PrefixLimit: !item["nativeIpv6PrefixLimit"]
      ? item["nativeIpv6PrefixLimit"]
      : nativeIpv6PrefixLimitPropertiesSerializer(item["nativeIpv6PrefixLimit"]),
  };
}

export function externalNetworkPropertiesOptionAPropertiesDeserializer(
  item: any,
): ExternalNetworkPropertiesOptionAProperties {
  return {
    primaryIpv4Prefix: item["primaryIpv4Prefix"],
    primaryIpv6Prefix: item["primaryIpv6Prefix"],
    secondaryIpv4Prefix: item["secondaryIpv4Prefix"],
    secondaryIpv6Prefix: item["secondaryIpv6Prefix"],
    mtu: item["mtu"],
    vlanId: item["vlanId"],
    fabricASN: item["fabricASN"],
    peerASN: item["peerASN"],
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdConfigurationDeserializer(item["bfdConfiguration"]),
    ingressAclId: item["ingressAclId"],
    bmpConfiguration: !item["bmpConfiguration"]
      ? item["bmpConfiguration"]
      : externalNetworkBmpPropertiesDeserializer(item["bmpConfiguration"]),
    egressAclId: item["egressAclId"],
    v4OverV6BgpSession: item["v4OverV6BgpSession"],
    v6OverV4BgpSession: item["v6OverV4BgpSession"],
    nativeIpv4PrefixLimit: !item["nativeIpv4PrefixLimit"]
      ? item["nativeIpv4PrefixLimit"]
      : nativeIpv4PrefixLimitPropertiesDeserializer(item["nativeIpv4PrefixLimit"]),
    nativeIpv6PrefixLimit: !item["nativeIpv6PrefixLimit"]
      ? item["nativeIpv6PrefixLimit"]
      : nativeIpv6PrefixLimitPropertiesDeserializer(item["nativeIpv6PrefixLimit"]),
  };
}

/** BGP Monitoring Protocol (BMP) Configuration properties. */
export interface ExternalNetworkBmpProperties {
  /** BMP Configuration State. */
  configurationState?: BmpConfigurationState;
}

export function externalNetworkBmpPropertiesSerializer(item: ExternalNetworkBmpProperties): any {
  return { configurationState: item["configurationState"] };
}

export function externalNetworkBmpPropertiesDeserializer(item: any): ExternalNetworkBmpProperties {
  return {
    configurationState: item["configurationState"],
  };
}

/** Static Route Configuration properties for ExternalNetwork. */
export interface ExternalNetworkStaticRouteConfiguration {
  /** BFD configuration properties */
  bfdConfiguration?: BfdConfiguration;
  /** List of IPv4 Routes. */
  ipv4Routes?: StaticRouteProperties[];
  /** List of IPv6 Routes. */
  ipv6Routes?: StaticRouteProperties[];
}

export function externalNetworkStaticRouteConfigurationSerializer(
  item: ExternalNetworkStaticRouteConfiguration,
): any {
  return {
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdConfigurationSerializer(item["bfdConfiguration"]),
    ipv4Routes: !item["ipv4Routes"]
      ? item["ipv4Routes"]
      : staticRoutePropertiesArraySerializer(item["ipv4Routes"]),
    ipv6Routes: !item["ipv6Routes"]
      ? item["ipv6Routes"]
      : staticRoutePropertiesArraySerializer(item["ipv6Routes"]),
  };
}

export function externalNetworkStaticRouteConfigurationDeserializer(
  item: any,
): ExternalNetworkStaticRouteConfiguration {
  return {
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdConfigurationDeserializer(item["bfdConfiguration"]),
    ipv4Routes: !item["ipv4Routes"]
      ? item["ipv4Routes"]
      : staticRoutePropertiesArrayDeserializer(item["ipv4Routes"]),
    ipv6Routes: !item["ipv6Routes"]
      ? item["ipv6Routes"]
      : staticRoutePropertiesArrayDeserializer(item["ipv6Routes"]),
  };
}

/** The ExternalNetwork patch resource definition. */
export interface ExternalNetworkPatch {
  /** External Network Patch properties. */
  properties?: ExternalNetworkPatchProperties;
}

export function externalNetworkPatchSerializer(item: ExternalNetworkPatch): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : externalNetworkPatchPropertiesSerializer(item["properties"]),
  };
}

/** External Network Patch properties. */
export interface ExternalNetworkPatchProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** ARM Resource ID of the networkToNetworkInterconnectId of the ExternalNetwork resource. */
  networkToNetworkInterconnectId?: string;
  /** Import Route Policy either IPv4 or IPv6. */
  importRoutePolicy?: ImportRoutePolicyPatch;
  /** Export Route Policy either IPv4 or IPv6. */
  exportRoutePolicy?: ExportRoutePolicyPatch;
  /** Peering option list. */
  peeringOption?: PeeringOption;
  /** option B properties object */
  optionBProperties?: L3OptionBPatchProperties;
  /** option A properties object */
  optionAProperties?: ExternalNetworkPatchPropertiesOptionAProperties;
  /** Static Route Configuration. */
  staticRouteConfiguration?: ExternalNetworkStaticRoutePatchConfiguration;
}

export function externalNetworkPatchPropertiesSerializer(
  item: ExternalNetworkPatchProperties,
): any {
  return {
    annotation: item["annotation"],
    networkToNetworkInterconnectId: item["networkToNetworkInterconnectId"],
    importRoutePolicy: !item["importRoutePolicy"]
      ? item["importRoutePolicy"]
      : importRoutePolicyPatchSerializer(item["importRoutePolicy"]),
    exportRoutePolicy: !item["exportRoutePolicy"]
      ? item["exportRoutePolicy"]
      : exportRoutePolicyPatchSerializer(item["exportRoutePolicy"]),
    peeringOption: item["peeringOption"],
    optionBProperties: !item["optionBProperties"]
      ? item["optionBProperties"]
      : l3OptionBPatchPropertiesSerializer(item["optionBProperties"]),
    optionAProperties: !item["optionAProperties"]
      ? item["optionAProperties"]
      : externalNetworkPatchPropertiesOptionAPropertiesSerializer(item["optionAProperties"]),
    staticRouteConfiguration: !item["staticRouteConfiguration"]
      ? item["staticRouteConfiguration"]
      : externalNetworkStaticRoutePatchConfigurationSerializer(item["staticRouteConfiguration"]),
  };
}

/** Import Route Policy either IPv4 or IPv6. */
export interface ImportRoutePolicyPatch {
  /** ARM resource ID of RoutePolicy. */
  importIpv4RoutePolicyId?: string;
  /** ARM resource ID of RoutePolicy. */
  importIpv6RoutePolicyId?: string;
}

export function importRoutePolicyPatchSerializer(item: ImportRoutePolicyPatch): any {
  return {
    importIpv4RoutePolicyId: item["importIpv4RoutePolicyId"],
    importIpv6RoutePolicyId: item["importIpv6RoutePolicyId"],
  };
}

/** Export Route Policy either IPv4 or IPv6. */
export interface ExportRoutePolicyPatch {
  /** ARM resource ID of RoutePolicy. */
  exportIpv4RoutePolicyId?: string;
  /** ARM resource ID of RoutePolicy. */
  exportIpv6RoutePolicyId?: string;
}

export function exportRoutePolicyPatchSerializer(item: ExportRoutePolicyPatch): any {
  return {
    exportIpv4RoutePolicyId: item["exportIpv4RoutePolicyId"],
    exportIpv6RoutePolicyId: item["exportIpv6RoutePolicyId"],
  };
}

/** Option B configuration. */
export interface L3OptionBPatchProperties {
  /** RouteTargets to be applied. This is used for the backward compatibility. */
  importRouteTargets?: string[];
  /** RouteTargets to be applied. This is used for the backward compatibility. */
  exportRouteTargets?: string[];
  /** RouteTargets to be applied. */
  routeTargets?: RouteTargetPatchInformation;
}

export function l3OptionBPatchPropertiesSerializer(item: L3OptionBPatchProperties): any {
  return {
    importRouteTargets: !item["importRouteTargets"]
      ? item["importRouteTargets"]
      : item["importRouteTargets"].map((p: any) => {
          return p;
        }),
    exportRouteTargets: !item["exportRouteTargets"]
      ? item["exportRouteTargets"]
      : item["exportRouteTargets"].map((p: any) => {
          return p;
        }),
    routeTargets: !item["routeTargets"]
      ? item["routeTargets"]
      : routeTargetPatchInformationSerializer(item["routeTargets"]),
  };
}

/** Route Target Configuration. */
export interface RouteTargetPatchInformation {
  /** Route Targets to be applied for incoming routes into CE. */
  importIpv4RouteTargets?: string[];
  /** Route Targets to be applied for incoming routes from CE. */
  importIpv6RouteTargets?: string[];
  /** Route Targets to be applied for outgoing routes into CE. */
  exportIpv4RouteTargets?: string[];
  /** Route Targets to be applied for outgoing routes from CE. */
  exportIpv6RouteTargets?: string[];
}

export function routeTargetPatchInformationSerializer(item: RouteTargetPatchInformation): any {
  return {
    importIpv4RouteTargets: !item["importIpv4RouteTargets"]
      ? item["importIpv4RouteTargets"]
      : item["importIpv4RouteTargets"].map((p: any) => {
          return p;
        }),
    importIpv6RouteTargets: !item["importIpv6RouteTargets"]
      ? item["importIpv6RouteTargets"]
      : item["importIpv6RouteTargets"].map((p: any) => {
          return p;
        }),
    exportIpv4RouteTargets: !item["exportIpv4RouteTargets"]
      ? item["exportIpv4RouteTargets"]
      : item["exportIpv4RouteTargets"].map((p: any) => {
          return p;
        }),
    exportIpv6RouteTargets: !item["exportIpv6RouteTargets"]
      ? item["exportIpv6RouteTargets"]
      : item["exportIpv6RouteTargets"].map((p: any) => {
          return p;
        }),
  };
}

/** option A properties object */
export interface ExternalNetworkPatchPropertiesOptionAProperties {
  /** IPv4 Address Prefix. */
  primaryIpv4Prefix?: string;
  /** IPv6 Address Prefix. */
  primaryIpv6Prefix?: string;
  /** Secondary IPv4 Address Prefix. */
  secondaryIpv4Prefix?: string;
  /** Secondary IPv6 Address Prefix. */
  secondaryIpv6Prefix?: string;
  /** MTU to use for option A peering. */
  mtu?: number;
  /** Vlan identifier. Example : 501 */
  vlanId?: number;
  /** Fabric ASN number. Example 65001 */
  readonly fabricASN?: number;
  /** Peer ASN number.Example : 28 */
  peerASN?: number;
  /** BFD configuration properties */
  bfdConfiguration?: BfdPatchConfiguration;
  /** Ingress Acl. ARM resource ID of Access Control Lists. */
  ingressAclId?: string;
  /** Egress Acl. ARM resource ID of Access Control Lists. */
  egressAclId?: string;
  /** BMP Monitor Configuration. */
  bmpConfiguration?: ExternalNetworkBmpPatchProperties;
  /** V4OverV6 BGP Session state */
  v4OverV6BgpSession?: V4OverV6BgpSessionState;
  /** V6OverV4 BGP Session state */
  v6OverV4BgpSession?: V6OverV4BgpSessionState;
  /** Native IPv4 prefix limit configuration */
  nativeIpv4PrefixLimit?: NativeIpv4PrefixLimitPatchProperties;
  /** Native IPv6 prefix limit configuration */
  nativeIpv6PrefixLimit?: NativeIpv6PrefixLimitPatchProperties;
}

export function externalNetworkPatchPropertiesOptionAPropertiesSerializer(
  item: ExternalNetworkPatchPropertiesOptionAProperties,
): any {
  return {
    primaryIpv4Prefix: item["primaryIpv4Prefix"],
    primaryIpv6Prefix: item["primaryIpv6Prefix"],
    secondaryIpv4Prefix: item["secondaryIpv4Prefix"],
    secondaryIpv6Prefix: item["secondaryIpv6Prefix"],
    mtu: item["mtu"],
    vlanId: item["vlanId"],
    peerASN: item["peerASN"],
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdPatchConfigurationSerializer(item["bfdConfiguration"]),
    ingressAclId: item["ingressAclId"],
    egressAclId: item["egressAclId"],
    bmpConfiguration: !item["bmpConfiguration"]
      ? item["bmpConfiguration"]
      : externalNetworkBmpPatchPropertiesSerializer(item["bmpConfiguration"]),
    v4OverV6BgpSession: item["v4OverV6BgpSession"],
    v6OverV4BgpSession: item["v6OverV4BgpSession"],
    nativeIpv4PrefixLimit: !item["nativeIpv4PrefixLimit"]
      ? item["nativeIpv4PrefixLimit"]
      : nativeIpv4PrefixLimitPatchPropertiesSerializer(item["nativeIpv4PrefixLimit"]),
    nativeIpv6PrefixLimit: !item["nativeIpv6PrefixLimit"]
      ? item["nativeIpv6PrefixLimit"]
      : nativeIpv6PrefixLimitPatchPropertiesSerializer(item["nativeIpv6PrefixLimit"]),
  };
}

/** BMP Monitoring Configuration patch properties. */
export interface ExternalNetworkBmpPatchProperties {
  /** BMP Configuration State. */
  configurationState?: BmpConfigurationState;
}

export function externalNetworkBmpPatchPropertiesSerializer(
  item: ExternalNetworkBmpPatchProperties,
): any {
  return { configurationState: item["configurationState"] };
}

/** Static Route Configuration properties for External Network. */
export interface ExternalNetworkStaticRoutePatchConfiguration {
  /** BFD configuration properties */
  bfdConfiguration?: BfdPatchConfiguration;
  /** List of IPv4 Routes. */
  ipv4Routes?: StaticRoutePatchProperties[];
  /** List of IPv6 Routes. */
  ipv6Routes?: StaticRoutePatchProperties[];
}

export function externalNetworkStaticRoutePatchConfigurationSerializer(
  item: ExternalNetworkStaticRoutePatchConfiguration,
): any {
  return {
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdPatchConfigurationSerializer(item["bfdConfiguration"]),
    ipv4Routes: !item["ipv4Routes"]
      ? item["ipv4Routes"]
      : staticRoutePatchPropertiesArraySerializer(item["ipv4Routes"]),
    ipv6Routes: !item["ipv6Routes"]
      ? item["ipv6Routes"]
      : staticRoutePatchPropertiesArraySerializer(item["ipv6Routes"]),
  };
}

/** The response of a ExternalNetwork list operation. */
export interface _ExternalNetworkListResult {
  /** The ExternalNetwork items on this page */
  value: ExternalNetwork[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _externalNetworkListResultDeserializer(item: any): _ExternalNetworkListResult {
  return {
    value: externalNetworkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function externalNetworkArraySerializer(result: Array<ExternalNetwork>): any[] {
  return result.map((item) => {
    return externalNetworkSerializer(item);
  });
}

export function externalNetworkArrayDeserializer(result: Array<ExternalNetwork>): any[] {
  return result.map((item) => {
    return externalNetworkDeserializer(item);
  });
}

/** External Network Administrative State request */
export interface ExternalNetworkBfdAdministrativeStateRequest {
  /** Route Type that helps to know which bfd we are updating. */
  routeType?: ExternalNetworkRouteType;
  /** Administrative state. */
  administrativeState?: BfdAdministrativeState;
}

export function externalNetworkBfdAdministrativeStateRequestSerializer(
  item: ExternalNetworkBfdAdministrativeStateRequest,
): any {
  return {
    routeType: item["routeType"],
    administrativeState: item["administrativeState"],
  };
}

/** External Network RouteType. */
export enum KnownExternalNetworkRouteType {
  /** ExternalNetwork Static. */
  Static = "Static",
  /** ExternalNetwork OptionA. */
  OptionA = "OptionA",
}

/**
 * External Network RouteType. \
 * {@link KnownExternalNetworkRouteType} can be used interchangeably with ExternalNetworkRouteType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Static**: ExternalNetwork Static. \
 * **OptionA**: ExternalNetwork OptionA.
 */
export type ExternalNetworkRouteType = string;

/** External Network Administrative State response */
export interface ExternalNetworkBfdAdministrativeStateResponse {
  /** Route Type that helps to know which bfd we are updating. */
  routeType?: ExternalNetworkRouteType;
  /** Administrative state. */
  administrativeState?: BfdAdministrativeState;
  /** The error object. */
  error?: ErrorDetail;
}

export function externalNetworkBfdAdministrativeStateResponseDeserializer(
  item: any,
): ExternalNetworkBfdAdministrativeStateResponse {
  return {
    routeType: item["routeType"],
    administrativeState: item["administrativeState"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** Defines the Neighbor Group. */
export interface NeighborGroup extends TrackedResource {
  /** The NeighborGroup Properties */
  properties: NeighborGroupProperties;
}

export function neighborGroupSerializer(item: NeighborGroup): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: neighborGroupPropertiesSerializer(item["properties"]),
  };
}

export function neighborGroupDeserializer(item: any): NeighborGroup {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: neighborGroupPropertiesDeserializer(item["properties"]),
  };
}

/** Neighbor Group Properties defines the properties of the resource. */
export interface NeighborGroupProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** An array of destination IPv4 Addresses or IPv6 Addresses. */
  destination: NeighborGroupDestination;
  /** List of NetworkTap IDs where neighbor group is associated. */
  readonly networkTapIds?: string[];
  /** List of Network Tap Rule IDs where neighbor group is associated. */
  readonly networkTapRuleIds?: string[];
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function neighborGroupPropertiesSerializer(item: NeighborGroupProperties): any {
  return {
    annotation: item["annotation"],
    destination: neighborGroupDestinationSerializer(item["destination"]),
  };
}

export function neighborGroupPropertiesDeserializer(item: any): NeighborGroupProperties {
  return {
    annotation: item["annotation"],
    destination: neighborGroupDestinationDeserializer(item["destination"]),
    networkTapIds: !item["networkTapIds"]
      ? item["networkTapIds"]
      : item["networkTapIds"].map((p: any) => {
          return p;
        }),
    networkTapRuleIds: !item["networkTapRuleIds"]
      ? item["networkTapRuleIds"]
      : item["networkTapRuleIds"].map((p: any) => {
          return p;
        }),
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    provisioningState: item["provisioningState"],
  };
}

/** An array of destination IPv4 Addresses or IPv6 Addresses. */
export interface NeighborGroupDestination {
  /** Array of IPv4 Addresses. */
  ipv4Addresses?: string[];
  /** Array of IPv6 Addresses. */
  ipv6Addresses?: string[];
}

export function neighborGroupDestinationSerializer(item: NeighborGroupDestination): any {
  return {
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
  };
}

export function neighborGroupDestinationDeserializer(item: any): NeighborGroupDestination {
  return {
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
  };
}

/** The Neighbor Group Patch definition. */
export interface NeighborGroupPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Neighbor Group Patch properties. */
  properties?: NeighborGroupPatchProperties;
}

export function neighborGroupPatchSerializer(item: NeighborGroupPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : neighborGroupPatchPropertiesSerializer(item["properties"]),
  };
}

/** Neighbor Group Patch properties. */
export interface NeighborGroupPatchProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** An array of destination IPv4 Addresses or IPv6 Addresses. */
  destination?: NeighborGroupDestinationPatch;
}

export function neighborGroupPatchPropertiesSerializer(item: NeighborGroupPatchProperties): any {
  return {
    annotation: item["annotation"],
    destination: !item["destination"]
      ? item["destination"]
      : neighborGroupDestinationPatchSerializer(item["destination"]),
  };
}

/** An array of destination IPv4 Addresses or IPv6 Addresses. */
export interface NeighborGroupDestinationPatch {
  /** Array of IPv4 Addresses. */
  ipv4Addresses?: string[];
  /** Array of IPv6 Addresses. */
  ipv6Addresses?: string[];
}

export function neighborGroupDestinationPatchSerializer(item: NeighborGroupDestinationPatch): any {
  return {
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
  };
}

/** The response of a NeighborGroup list operation. */
export interface _NeighborGroupListResult {
  /** The NeighborGroup items on this page */
  value: NeighborGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _neighborGroupListResultDeserializer(item: any): _NeighborGroupListResult {
  return {
    value: neighborGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function neighborGroupArraySerializer(result: Array<NeighborGroup>): any[] {
  return result.map((item) => {
    return neighborGroupSerializer(item);
  });
}

export function neighborGroupArrayDeserializer(result: Array<NeighborGroup>): any[] {
  return result.map((item) => {
    return neighborGroupDeserializer(item);
  });
}

/** The NetworkDeviceSku resource definition. */
export interface NetworkDeviceSku extends ProxyResource {
  /** The NetworkDeviceSku properties */
  properties: NetworkDeviceSkuProperties;
}

export function networkDeviceSkuDeserializer(item: any): NetworkDeviceSku {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: networkDeviceSkuPropertiesDeserializer(item["properties"]),
  };
}

/** Network Device SKU Properties defines the properties of the resource. */
export interface NetworkDeviceSkuProperties {
  /** Model of the network device. */
  model: string;
  /** Manufacturer of the network device. */
  manufacturer?: string;
  /** List of supported version details of network device. */
  supportedVersions?: SupportedVersionProperties[];
  /** Available roles for the network device. */
  supportedRoleTypes?: NetworkDeviceRoleName[];
  /** List of network device interfaces. */
  interfaces?: DeviceInterfaceProperties[];
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function networkDeviceSkuPropertiesDeserializer(item: any): NetworkDeviceSkuProperties {
  return {
    model: item["model"],
    manufacturer: item["manufacturer"],
    supportedVersions: !item["supportedVersions"]
      ? item["supportedVersions"]
      : supportedVersionPropertiesArrayDeserializer(item["supportedVersions"]),
    supportedRoleTypes: !item["supportedRoleTypes"]
      ? item["supportedRoleTypes"]
      : item["supportedRoleTypes"].map((p: any) => {
          return p;
        }),
    interfaces: !item["interfaces"]
      ? item["interfaces"]
      : deviceInterfacePropertiesArrayDeserializer(item["interfaces"]),
    provisioningState: item["provisioningState"],
  };
}

export function supportedVersionPropertiesArrayDeserializer(
  result: Array<SupportedVersionProperties>,
): any[] {
  return result.map((item) => {
    return supportedVersionPropertiesDeserializer(item);
  });
}

/** Supported version details of the network device. */
export interface SupportedVersionProperties {
  /** Operating system and firmware combined versions. */
  version?: string;
  /** Operating system version. */
  vendorOsVersion?: string;
  /** Firmware version. */
  vendorFirmwareVersion?: string;
  /** If true newly provisioned Fabric will use this device version by default to bootstrap the network devices for the first time. */
  isDefault?: BooleanEnumProperty;
}

export function supportedVersionPropertiesDeserializer(item: any): SupportedVersionProperties {
  return {
    version: item["version"],
    vendorOsVersion: item["vendorOsVersion"],
    vendorFirmwareVersion: item["vendorFirmwareVersion"],
    isDefault: item["isDefault"],
  };
}

/** Available roles for the network device. */
export enum KnownNetworkDeviceRoleName {
  /** NetworkDeviceRoleName-CE(Customer Edge) */
  CE = "CE",
  /** NetworkDeviceRoleName-ToR(top of rack) */
  ToR = "ToR",
  /** NetworkDeviceRoleName-NPB(Network Packet Broker) */
  NPB = "NPB",
  /** NetworkDeviceRoleName-TS(Terminal Server) */
  TS = "TS",
  /** NetworkDeviceRoleName-Management */
  Management = "Management",
}

/**
 * Available roles for the network device. \
 * {@link KnownNetworkDeviceRoleName} can be used interchangeably with NetworkDeviceRoleName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CE**: NetworkDeviceRoleName-CE(Customer Edge) \
 * **ToR**: NetworkDeviceRoleName-ToR(top of rack) \
 * **NPB**: NetworkDeviceRoleName-NPB(Network Packet Broker) \
 * **TS**: NetworkDeviceRoleName-TS(Terminal Server) \
 * **Management**: NetworkDeviceRoleName-Management
 */
export type NetworkDeviceRoleName = string;

export function deviceInterfacePropertiesArrayDeserializer(
  result: Array<DeviceInterfaceProperties>,
): any[] {
  return result.map((item) => {
    return deviceInterfacePropertiesDeserializer(item);
  });
}

/** Network device interface properties. */
export interface DeviceInterfaceProperties {
  /** Interface identifier. Example: HundredGigE0/0. */
  identifier?: string;
  /** Interface type. */
  interfaceType?: string;
  /** List of supported connector types. */
  supportedConnectorTypes?: SupportedConnectorProperties[];
}

export function deviceInterfacePropertiesDeserializer(item: any): DeviceInterfaceProperties {
  return {
    identifier: item["identifier"],
    interfaceType: item["interfaceType"],
    supportedConnectorTypes: !item["supportedConnectorTypes"]
      ? item["supportedConnectorTypes"]
      : supportedConnectorPropertiesArrayDeserializer(item["supportedConnectorTypes"]),
  };
}

export function supportedConnectorPropertiesArrayDeserializer(
  result: Array<SupportedConnectorProperties>,
): any[] {
  return result.map((item) => {
    return supportedConnectorPropertiesDeserializer(item);
  });
}

/** Supported connector properties. */
export interface SupportedConnectorProperties {
  /** Type of connector used. Example: Optical. */
  connectorType?: string;
  /** Maximum speed of the connector in Mbps. */
  maxSpeedInMbps?: number;
}

export function supportedConnectorPropertiesDeserializer(item: any): SupportedConnectorProperties {
  return {
    connectorType: item["connectorType"],
    maxSpeedInMbps: item["maxSpeedInMbps"],
  };
}

/** The response of a NetworkDeviceSku list operation. */
export interface _NetworkDeviceSkuListResult {
  /** The NetworkDeviceSku items on this page */
  value: NetworkDeviceSku[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkDeviceSkuListResultDeserializer(item: any): _NetworkDeviceSkuListResult {
  return {
    value: networkDeviceSkuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkDeviceSkuArrayDeserializer(result: Array<NetworkDeviceSku>): any[] {
  return result.map((item) => {
    return networkDeviceSkuDeserializer(item);
  });
}

/** The Network Device resource definition. */
export interface NetworkDevice extends TrackedResource {
  /** The NetworkDevice properties */
  properties: NetworkDeviceProperties;
}

export function networkDeviceSerializer(item: NetworkDevice): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: networkDevicePropertiesSerializer(item["properties"]),
  };
}

export function networkDeviceDeserializer(item: any): NetworkDevice {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: networkDevicePropertiesDeserializer(item["properties"]),
  };
}

/** Network Device Properties defines the properties of the resource. */
export interface NetworkDeviceProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** The host name of the device. */
  hostName?: string;
  /** Serial number of the device. Format of serial Number - Make;Model;HardwareRevisionId;SerialNumber. */
  serialNumber: string;
  /** Current version of the device as defined in SKU. */
  readonly version?: string;
  /** Network Device SKU name. */
  networkDeviceSku?: string;
  /** NetworkDeviceRole is the device role: Example: CE | ToR. */
  readonly networkDeviceRole?: NetworkDeviceRole;
  /** Reference to network rack resource id. */
  readonly networkRackId?: string;
  /** Management IPv4 Address. */
  readonly managementIpv4Address?: string;
  /** Management IPv6 Address. */
  readonly managementIpv6Address?: string;
  /** User configured read-write configuration applied on the network devices. */
  readonly rwDeviceConfig?: string;
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Configuration state of the resource. */
  readonly configurationState?: ConfigurationState;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Administrative state of the resource. */
  readonly administrativeState?: AdministrativeState;
}

export function networkDevicePropertiesSerializer(item: NetworkDeviceProperties): any {
  return {
    annotation: item["annotation"],
    hostName: item["hostName"],
    serialNumber: item["serialNumber"],
    networkDeviceSku: item["networkDeviceSku"],
  };
}

export function networkDevicePropertiesDeserializer(item: any): NetworkDeviceProperties {
  return {
    annotation: item["annotation"],
    hostName: item["hostName"],
    serialNumber: item["serialNumber"],
    version: item["version"],
    networkDeviceSku: item["networkDeviceSku"],
    networkDeviceRole: item["networkDeviceRole"],
    networkRackId: item["networkRackId"],
    managementIpv4Address: item["managementIpv4Address"],
    managementIpv6Address: item["managementIpv6Address"],
    rwDeviceConfig: item["rwDeviceConfig"],
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    configurationState: item["configurationState"],
    provisioningState: item["provisioningState"],
    administrativeState: item["administrativeState"],
  };
}

/** NetworkDeviceRole is the device role: Example: CE | ToR. */
export enum KnownNetworkDeviceRole {
  /** NetworkDeviceRole-CE(Customer Edge) */
  CE = "CE",
  /** NetworkDeviceRole-ToR(top of rack) */
  ToR = "ToR",
  /** NetworkDeviceRole-NPB(Network Packet Broker) */
  NPB = "NPB",
  /** NetworkDeviceRole-TS(Terminal Server) */
  TS = "TS",
  /** NetworkDeviceRole-Management */
  Management = "Management",
}

/**
 * NetworkDeviceRole is the device role: Example: CE | ToR. \
 * {@link KnownNetworkDeviceRole} can be used interchangeably with NetworkDeviceRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CE**: NetworkDeviceRole-CE(Customer Edge) \
 * **ToR**: NetworkDeviceRole-ToR(top of rack) \
 * **NPB**: NetworkDeviceRole-NPB(Network Packet Broker) \
 * **TS**: NetworkDeviceRole-TS(Terminal Server) \
 * **Management**: NetworkDeviceRole-Management
 */
export type NetworkDeviceRole = string;

/** The Network Device Patch Parameters defines the patch parameters of the resource. */
export interface NetworkDevicePatchParameters {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Network Device Patch properties. */
  properties?: NetworkDevicePatchParametersProperties;
}

export function networkDevicePatchParametersSerializer(item: NetworkDevicePatchParameters): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : networkDevicePatchParametersPropertiesSerializer(item["properties"]),
  };
}

/** Network Device Patch properties. */
export interface NetworkDevicePatchParametersProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** The host name of the device. */
  hostName?: string;
  /** Serial number of the device. Format of serial Number - Make;Model;HardwareRevisionId;SerialNumber. */
  serialNumber?: string;
}

export function networkDevicePatchParametersPropertiesSerializer(
  item: NetworkDevicePatchParametersProperties,
): any {
  return {
    annotation: item["annotation"],
    hostName: item["hostName"],
    serialNumber: item["serialNumber"],
  };
}

/** The response of a NetworkDevice list operation. */
export interface _NetworkDeviceListResult {
  /** The NetworkDevice items on this page */
  value: NetworkDevice[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkDeviceListResultDeserializer(item: any): _NetworkDeviceListResult {
  return {
    value: networkDeviceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkDeviceArraySerializer(result: Array<NetworkDevice>): any[] {
  return result.map((item) => {
    return networkDeviceSerializer(item);
  });
}

export function networkDeviceArrayDeserializer(result: Array<NetworkDevice>): any[] {
  return result.map((item) => {
    return networkDeviceDeserializer(item);
  });
}

/** Reboot properties. */
export interface RebootProperties {
  /** Type of reboot to be performed. Example: GracefulRebootWithZTP */
  rebootType?: RebootType;
}

export function rebootPropertiesSerializer(item: RebootProperties): any {
  return { rebootType: item["rebootType"] };
}

/** Type of reboot to be performed. Example: GracefulRebootWithZTP */
export enum KnownRebootType {
  /** RebootType GracefulRebootWithZTP */
  GracefulRebootWithZTP = "GracefulRebootWithZTP",
  /** RebootType GracefulRebootWithoutZTP */
  GracefulRebootWithoutZTP = "GracefulRebootWithoutZTP",
  /** RebootType UngracefulRebootWithZTP */
  UngracefulRebootWithZTP = "UngracefulRebootWithZTP",
  /** RebootType UngracefulRebootWithoutZTP */
  UngracefulRebootWithoutZTP = "UngracefulRebootWithoutZTP",
}

/**
 * Type of reboot to be performed. Example: GracefulRebootWithZTP \
 * {@link KnownRebootType} can be used interchangeably with RebootType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GracefulRebootWithZTP**: RebootType GracefulRebootWithZTP \
 * **GracefulRebootWithoutZTP**: RebootType GracefulRebootWithoutZTP \
 * **UngracefulRebootWithZTP**: RebootType UngracefulRebootWithZTP \
 * **UngracefulRebootWithoutZTP**: RebootType UngracefulRebootWithoutZTP
 */
export type RebootType = string;

/** Update the administrative state on list of resources. */
export interface UpdateDeviceAdministrativeState {
  /** Network Fabrics or Network Rack resource Id. */
  resourceIds?: string[];
  /** Administrative state. */
  state?: DeviceAdministrativeState;
}

export function updateDeviceAdministrativeStateSerializer(
  item: UpdateDeviceAdministrativeState,
): any {
  return {
    resourceIds: !item["resourceIds"]
      ? item["resourceIds"]
      : item["resourceIds"].map((p: any) => {
          return p;
        }),
    state: item["state"],
  };
}

/** Administrative state. */
export enum KnownDeviceAdministrativeState {
  /** Device AdministrativeState-RMA */
  RMA = "RMA",
  /** Device AdministrativeState-RMA(Return Material Authorization) Ungraceful */
  UngracefulRMA = "UngracefulRMA",
  /** Device AdministrativeState-Resync */
  Resync = "Resync",
  /** Device AdministrativeState-GracefulQuarantine */
  GracefulQuarantine = "GracefulQuarantine",
  /** Device AdministrativeState-UngracefulQuarantine */
  UngracefulQuarantine = "UngracefulQuarantine",
  /** Device AdministrativeState-Quarantine */
  Quarantine = "Quarantine",
  /** Device AdministrativeState-UnderMaintenance */
  UnderMaintenance = "UnderMaintenance",
  /** Device AdministrativeState-Enable */
  Enable = "Enable",
  /** Device AdministrativeState-Disable */
  Disable = "Disable",
}

/**
 * Administrative state. \
 * {@link KnownDeviceAdministrativeState} can be used interchangeably with DeviceAdministrativeState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RMA**: Device AdministrativeState-RMA \
 * **UngracefulRMA**: Device AdministrativeState-RMA(Return Material Authorization) Ungraceful \
 * **Resync**: Device AdministrativeState-Resync \
 * **GracefulQuarantine**: Device AdministrativeState-GracefulQuarantine \
 * **UngracefulQuarantine**: Device AdministrativeState-UngracefulQuarantine \
 * **Quarantine**: Device AdministrativeState-Quarantine \
 * **UnderMaintenance**: Device AdministrativeState-UnderMaintenance \
 * **Enable**: Device AdministrativeState-Enable \
 * **Disable**: Device AdministrativeState-Disable
 */
export type DeviceAdministrativeState = string;

/** Update version properties. */
export interface UpdateVersion {
  /** Specify the version. */
  version?: string;
}

export function updateVersionSerializer(item: UpdateVersion): any {
  return { version: item["version"] };
}

/** Provide the RO command */
export interface DeviceRoCommand {
  /** Specify the command. */
  command?: string;
}

export function deviceRoCommandSerializer(item: DeviceRoCommand): any {
  return { command: item["command"] };
}

/** The current status of an async operation. */
export interface CommonPostActionResponseForDeviceROCommandsOperationStatusResult {
  /** The error object. */
  error?: ErrorDetail;
  /** The end time of the operation. */
  readonly endTime?: Date;
  /** Fully qualified ID for the async operation. */
  readonly id?: string;
  /** Name of the async operation. */
  readonly name?: string;
  /** The additional properties of the operation status result. */
  properties?: CommonPostActionResponseForDeviceROCommands;
  /** Fully qualified ID of the resource against which the original async operation was started. */
  readonly resourceId?: string;
  /** The start time of the operation. */
  readonly startTime?: Date;
  /** Operation status. */
  status: string;
}

export function commonPostActionResponseForDeviceROCommandsOperationStatusResultDeserializer(
  item: any,
): CommonPostActionResponseForDeviceROCommandsOperationStatusResult {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    id: item["id"],
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : commonPostActionResponseForDeviceROCommandsDeserializer(item["properties"]),
    resourceId: item["resourceId"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    status: item["status"],
  };
}

/** Common response for device Ro Commands. */
export interface CommonPostActionResponseForDeviceROCommands {
  /** Gets the configuration state. */
  readonly configurationState?: ConfigurationState;
  /** Predefined link containing Device RO Command output. */
  outputUrl?: string;
  /** Device RO command Response limited to 4000 characters. */
  deviceConfigurationPreview?: string;
}

export function commonPostActionResponseForDeviceROCommandsDeserializer(
  item: any,
): CommonPostActionResponseForDeviceROCommands {
  return {
    configurationState: item["configurationState"],
    outputUrl: item["outputUrl"],
    deviceConfigurationPreview: item["deviceConfigurationPreview"],
  };
}

/** Provide the Rw command */
export interface DeviceRwCommand {
  /** Specify the command. */
  command?: string;
}

export function deviceRwCommandSerializer(item: DeviceRwCommand): any {
  return { command: item["command"] };
}

/** Common response for device Rw Commands. */
export interface CommonPostActionResponseForDeviceRWCommands {
  /** The error object. */
  error?: ErrorDetail;
  /** Gets the configuration state. */
  readonly configurationState?: ConfigurationState;
  /** Predefined link containing Device Rw Command output. */
  outputUrl?: string;
}

export function commonPostActionResponseForDeviceRWCommandsDeserializer(
  item: any,
): CommonPostActionResponseForDeviceRWCommands {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    configurationState: item["configurationState"],
    outputUrl: item["outputUrl"],
  };
}

/** Defines the NetworkInterface resource. */
export interface NetworkInterface extends ProxyResource {
  /** The NetworkInterface properties */
  properties: NetworkInterfaceProperties;
}

export function networkInterfaceSerializer(item: NetworkInterface): any {
  return {
    properties: networkInterfacePropertiesSerializer(item["properties"]),
  };
}

export function networkInterfaceDeserializer(item: any): NetworkInterface {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: networkInterfacePropertiesDeserializer(item["properties"]),
  };
}

/** Network Interface Properties defines the properties of the resource. */
export interface NetworkInterfaceProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** Physical Identifier of the network interface. */
  readonly physicalIdentifier?: string;
  /** The ARM resource id of the interface or compute server its connected to. */
  readonly connectedTo?: string;
  /** The Interface Type. Example: Management/Data */
  readonly interfaceType?: InterfaceType;
  /** IPv4Address of the interface. */
  readonly ipv4Address?: string;
  /** IPv6Address of the interface. */
  readonly ipv6Address?: string;
  /** Description of the interface. */
  description?: string;
  /** Additional description of the interface. */
  additionalDescription?: string;
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Administrative state of the resource. */
  readonly administrativeState?: AdministrativeState;
}

export function networkInterfacePropertiesSerializer(item: NetworkInterfaceProperties): any {
  return {
    annotation: item["annotation"],
    description: item["description"],
    additionalDescription: item["additionalDescription"],
  };
}

export function networkInterfacePropertiesDeserializer(item: any): NetworkInterfaceProperties {
  return {
    annotation: item["annotation"],
    physicalIdentifier: item["physicalIdentifier"],
    connectedTo: item["connectedTo"],
    interfaceType: item["interfaceType"],
    ipv4Address: item["ipv4Address"],
    ipv6Address: item["ipv6Address"],
    description: item["description"],
    additionalDescription: item["additionalDescription"],
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    provisioningState: item["provisioningState"],
    administrativeState: item["administrativeState"],
  };
}

/** The Interface Type. Example: Management/Data */
export enum KnownInterfaceType {
  /** InterfaceType-Management */
  Management = "Management",
  /** InterfaceType-Data */
  Data = "Data",
}

/**
 * The Interface Type. Example: Management/Data \
 * {@link KnownInterfaceType} can be used interchangeably with InterfaceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Management**: InterfaceType-Management \
 * **Data**: InterfaceType-Data
 */
export type InterfaceType = string;

/** The NetworkInterfacePatch resource definition. */
export interface NetworkInterfacePatch {
  /** Network Interface Patch properties. */
  properties?: NetworkInterfacePatchProperties;
}

export function networkInterfacePatchSerializer(item: NetworkInterfacePatch): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : networkInterfacePatchPropertiesSerializer(item["properties"]),
  };
}

/** Network Interface Patch properties. */
export interface NetworkInterfacePatchProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** Description of the interface. */
  description?: string;
  /** Additional description of the interface. */
  additionalDescription?: string;
}

export function networkInterfacePatchPropertiesSerializer(
  item: NetworkInterfacePatchProperties,
): any {
  return {
    annotation: item["annotation"],
    description: item["description"],
    additionalDescription: item["additionalDescription"],
  };
}

/** The response of a NetworkInterface list operation. */
export interface _NetworkInterfaceListResult {
  /** The NetworkInterface items on this page */
  value: NetworkInterface[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkInterfaceListResultDeserializer(item: any): _NetworkInterfaceListResult {
  return {
    value: networkInterfaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

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

/** The Network Fabric Controller resource definition. */
export interface NetworkFabricController extends TrackedResource {
  /** The NetworkFabricController Properties */
  properties: NetworkFabricControllerProperties;
}

export function networkFabricControllerSerializer(item: NetworkFabricController): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: networkFabricControllerPropertiesSerializer(item["properties"]),
  };
}

export function networkFabricControllerDeserializer(item: any): NetworkFabricController {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: networkFabricControllerPropertiesDeserializer(item["properties"]),
  };
}

/** NetworkFabricControllerProperties defines the resource properties. */
export interface NetworkFabricControllerProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** As part of an update, the Infrastructure ExpressRoute CircuitID should be provided to create and Provision a NFC. This Express route is dedicated for Infrastructure services. (This is a Mandatory attribute) */
  infrastructureExpressRouteConnections?: ExpressRouteConnectionInformation[];
  /** As part of an update, the workload ExpressRoute CircuitID should be provided to create and Provision a NFC. This Express route is dedicated for Workload services. (This is a Mandatory attribute). */
  workloadExpressRouteConnections?: ExpressRouteConnectionInformation[];
  /** InfrastructureServices IP ranges. */
  readonly infrastructureServices?: ControllerServices;
  /** WorkloadServices IP ranges. */
  readonly workloadServices?: ControllerServices;
  /** Managed Resource Group configuration properties. */
  managedResourceGroupConfiguration?: ManagedResourceGroupConfiguration;
  /** The NF-ID will be an input parameter used by the NF to link and get associated with the parent NFC Service. */
  readonly networkFabricIds?: string[];
  /** A workload management network is required for all the tenant (workload) traffic. This traffic is only dedicated for Tenant workloads which are required to access internet or any other MSFT/Public endpoints. */
  isWorkloadManagementNetworkEnabled?: IsWorkloadManagementNetworkEnabled;
  /** List of tenant InternetGateway resource IDs */
  readonly tenantInternetGatewayIds?: string[];
  /** IPv4 Network Fabric Controller Address Space. */
  ipv4AddressSpace?: string;
  /** IPv6 Network Fabric Controller Address Space. */
  ipv6AddressSpace?: string;
  /** Network Fabric Controller SKU. */
  nfcSku?: NfcSku;
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Provides you the latest status of the NFC service, whether it is Accepted, updating, Succeeded or Failed. During this process, the states keep changing based on the status of NFC provisioning. */
  readonly provisioningState?: ProvisioningState;
}

export function networkFabricControllerPropertiesSerializer(
  item: NetworkFabricControllerProperties,
): any {
  return {
    annotation: item["annotation"],
    infrastructureExpressRouteConnections: !item["infrastructureExpressRouteConnections"]
      ? item["infrastructureExpressRouteConnections"]
      : expressRouteConnectionInformationArraySerializer(
          item["infrastructureExpressRouteConnections"],
        ),
    workloadExpressRouteConnections: !item["workloadExpressRouteConnections"]
      ? item["workloadExpressRouteConnections"]
      : expressRouteConnectionInformationArraySerializer(item["workloadExpressRouteConnections"]),
    managedResourceGroupConfiguration: !item["managedResourceGroupConfiguration"]
      ? item["managedResourceGroupConfiguration"]
      : managedResourceGroupConfigurationSerializer(item["managedResourceGroupConfiguration"]),
    isWorkloadManagementNetworkEnabled: item["isWorkloadManagementNetworkEnabled"],
    ipv4AddressSpace: item["ipv4AddressSpace"],
    ipv6AddressSpace: item["ipv6AddressSpace"],
    nfcSku: item["nfcSku"],
  };
}

export function networkFabricControllerPropertiesDeserializer(
  item: any,
): NetworkFabricControllerProperties {
  return {
    annotation: item["annotation"],
    infrastructureExpressRouteConnections: !item["infrastructureExpressRouteConnections"]
      ? item["infrastructureExpressRouteConnections"]
      : expressRouteConnectionInformationArrayDeserializer(
          item["infrastructureExpressRouteConnections"],
        ),
    workloadExpressRouteConnections: !item["workloadExpressRouteConnections"]
      ? item["workloadExpressRouteConnections"]
      : expressRouteConnectionInformationArrayDeserializer(item["workloadExpressRouteConnections"]),
    infrastructureServices: !item["infrastructureServices"]
      ? item["infrastructureServices"]
      : controllerServicesDeserializer(item["infrastructureServices"]),
    workloadServices: !item["workloadServices"]
      ? item["workloadServices"]
      : controllerServicesDeserializer(item["workloadServices"]),
    managedResourceGroupConfiguration: !item["managedResourceGroupConfiguration"]
      ? item["managedResourceGroupConfiguration"]
      : managedResourceGroupConfigurationDeserializer(item["managedResourceGroupConfiguration"]),
    networkFabricIds: !item["networkFabricIds"]
      ? item["networkFabricIds"]
      : item["networkFabricIds"].map((p: any) => {
          return p;
        }),
    isWorkloadManagementNetworkEnabled: item["isWorkloadManagementNetworkEnabled"],
    tenantInternetGatewayIds: !item["tenantInternetGatewayIds"]
      ? item["tenantInternetGatewayIds"]
      : item["tenantInternetGatewayIds"].map((p: any) => {
          return p;
        }),
    ipv4AddressSpace: item["ipv4AddressSpace"],
    ipv6AddressSpace: item["ipv6AddressSpace"],
    nfcSku: item["nfcSku"],
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    provisioningState: item["provisioningState"],
  };
}

export function expressRouteConnectionInformationArraySerializer(
  result: Array<ExpressRouteConnectionInformation>,
): any[] {
  return result.map((item) => {
    return expressRouteConnectionInformationSerializer(item);
  });
}

export function expressRouteConnectionInformationArrayDeserializer(
  result: Array<ExpressRouteConnectionInformation>,
): any[] {
  return result.map((item) => {
    return expressRouteConnectionInformationDeserializer(item);
  });
}

/** The ExpressRoute circuit ID and the Auth Key are required for you to successfully deploy NFC service. */
export interface ExpressRouteConnectionInformation {
  /** The express route circuit Azure resource ID, must be of type Microsoft.Network/expressRouteCircuits/circuitName. The ExpressRoute Circuit is a mandatory attribute. */
  expressRouteCircuitId: string;
  /** Authorization key for the circuit, must be of type Microsoft.Network/expressRouteCircuits/authorizations. The Auth Key is a mandatory attribute. */
  expressRouteAuthorizationKey: string;
}

export function expressRouteConnectionInformationSerializer(
  item: ExpressRouteConnectionInformation,
): any {
  return {
    expressRouteCircuitId: item["expressRouteCircuitId"],
    expressRouteAuthorizationKey: item["expressRouteAuthorizationKey"],
  };
}

export function expressRouteConnectionInformationDeserializer(
  item: any,
): ExpressRouteConnectionInformation {
  return {
    expressRouteCircuitId: item["expressRouteCircuitId"],
    expressRouteAuthorizationKey: item["expressRouteAuthorizationKey"],
  };
}

/** Network Fabric Controller services. */
export interface ControllerServices {
  /** The IPv4 Address space is optional, if the value is not defined at the time of NFC creation, then the default value 10.0.0.0/19 is considered. The IPV4 address subnet is an optional attribute. */
  ipv4AddressSpaces?: string[];
  /** The IPv6 is not supported right now. */
  ipv6AddressSpaces?: string[];
}

export function controllerServicesDeserializer(item: any): ControllerServices {
  return {
    ipv4AddressSpaces: !item["ipv4AddressSpaces"]
      ? item["ipv4AddressSpaces"]
      : item["ipv4AddressSpaces"].map((p: any) => {
          return p;
        }),
    ipv6AddressSpaces: !item["ipv6AddressSpaces"]
      ? item["ipv6AddressSpaces"]
      : item["ipv6AddressSpaces"].map((p: any) => {
          return p;
        }),
  };
}

/** Managed Resource Group configuration properties. */
export interface ManagedResourceGroupConfiguration {
  /** The NFC service will be hosted in a Managed resource group. */
  name?: string;
  /** Managed resource group location. */
  location?: string;
}

export function managedResourceGroupConfigurationSerializer(
  item: ManagedResourceGroupConfiguration,
): any {
  return { name: item["name"], location: item["location"] };
}

export function managedResourceGroupConfigurationDeserializer(
  item: any,
): ManagedResourceGroupConfiguration {
  return {
    name: item["name"],
    location: item["location"],
  };
}

/** A workload management network is required for all the tenant (workload) traffic. This traffic is only dedicated for Tenant workloads which are required to access internet or any other MSFT/Public endpoints. */
export enum KnownIsWorkloadManagementNetworkEnabled {
  /** IsWorkloadManagementNetworkEnabled-True */
  True = "True",
  /** IsWorkloadManagementNetworkEnabled-False */
  False = "False",
}

/**
 * A workload management network is required for all the tenant (workload) traffic. This traffic is only dedicated for Tenant workloads which are required to access internet or any other MSFT/Public endpoints. \
 * {@link KnownIsWorkloadManagementNetworkEnabled} can be used interchangeably with IsWorkloadManagementNetworkEnabled,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: IsWorkloadManagementNetworkEnabled-True \
 * **False**: IsWorkloadManagementNetworkEnabled-False
 */
export type IsWorkloadManagementNetworkEnabled = string;

/** Network Fabric Controller SKU. */
export enum KnownNfcSku {
  /** NfcSku-Basic */
  Basic = "Basic",
  /** NfcSku-Standard */
  Standard = "Standard",
  /** NfcSku-HighPerformance */
  HighPerformance = "HighPerformance",
}

/**
 * Network Fabric Controller SKU. \
 * {@link KnownNfcSku} can be used interchangeably with NfcSku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic**: NfcSku-Basic \
 * **Standard**: NfcSku-Standard \
 * **HighPerformance**: NfcSku-HighPerformance
 */
export type NfcSku = string;

/** The Network Fabric Controller Patch payload definition. */
export interface NetworkFabricControllerPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Network Fabric Controller patch properties. */
  properties?: NetworkFabricControllerPatchProperties;
}

export function networkFabricControllerPatchSerializer(item: NetworkFabricControllerPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : networkFabricControllerPatchPropertiesSerializer(item["properties"]),
  };
}

/** Network Fabric Controller patch properties. */
export interface NetworkFabricControllerPatchProperties {
  /** As part of an update, the Infrastructure ExpressRoute CircuitID should be provided to create and Provision a NFC. This Express route is dedicated for Infrastructure services. (This is a Mandatory attribute) */
  infrastructureExpressRouteConnections?: ExpressRouteConnectionInformation[];
  /** As part of an update, the workload ExpressRoute CircuitID should be provided to create and Provision a NFC. This Express route is dedicated for Workload services. (This is a Mandatory attribute). */
  workloadExpressRouteConnections?: ExpressRouteConnectionInformation[];
}

export function networkFabricControllerPatchPropertiesSerializer(
  item: NetworkFabricControllerPatchProperties,
): any {
  return {
    infrastructureExpressRouteConnections: !item["infrastructureExpressRouteConnections"]
      ? item["infrastructureExpressRouteConnections"]
      : expressRouteConnectionInformationArraySerializer(
          item["infrastructureExpressRouteConnections"],
        ),
    workloadExpressRouteConnections: !item["workloadExpressRouteConnections"]
      ? item["workloadExpressRouteConnections"]
      : expressRouteConnectionInformationArraySerializer(item["workloadExpressRouteConnections"]),
  };
}

/** The response of a NetworkFabricController list operation. */
export interface _NetworkFabricControllerListResult {
  /** The NetworkFabricController items on this page */
  value: NetworkFabricController[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkFabricControllerListResultDeserializer(
  item: any,
): _NetworkFabricControllerListResult {
  return {
    value: networkFabricControllerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkFabricControllerArraySerializer(
  result: Array<NetworkFabricController>,
): any[] {
  return result.map((item) => {
    return networkFabricControllerSerializer(item);
  });
}

export function networkFabricControllerArrayDeserializer(
  result: Array<NetworkFabricController>,
): any[] {
  return result.map((item) => {
    return networkFabricControllerDeserializer(item);
  });
}

/** The Network Fabric SKU resource definition. */
export interface NetworkFabricSku extends ProxyResource {
  /** The Network Fabric Sku properties */
  properties: NetworkFabricSkuProperties;
}

export function networkFabricSkuDeserializer(item: any): NetworkFabricSku {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: networkFabricSkuPropertiesDeserializer(item["properties"]),
  };
}

/** Network Fabric SKU Properties define properties of the resource. */
export interface NetworkFabricSkuProperties {
  /** Type of Network Fabric SKU. */
  readonly type?: FabricSkuType;
  /** Maximum number of compute racks available for this Network Fabric SKU. The value of max count racks is 4 for 4 rack SKU and 8 for 8 rack SKU. */
  maxComputeRacks?: number;
  /** Maximum number of servers available for this Network Fabric SKU. */
  maximumServerCount?: number;
  /** List of supported Network Fabric SKU versions. */
  readonly supportedVersions?: string[];
  /** URL providing detailed configuration of the fabric SKU. */
  readonly details?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function networkFabricSkuPropertiesDeserializer(item: any): NetworkFabricSkuProperties {
  return {
    type: item["type"],
    maxComputeRacks: item["maxComputeRacks"],
    maximumServerCount: item["maximumServerCount"],
    supportedVersions: !item["supportedVersions"]
      ? item["supportedVersions"]
      : item["supportedVersions"].map((p: any) => {
          return p;
        }),
    details: item["details"],
    provisioningState: item["provisioningState"],
  };
}

/** Type of Network Fabric SKU. */
export enum KnownFabricSkuType {
  /** FabricSkuType-SingleRack */
  SingleRack = "SingleRack",
  /** FabricSkuType-MultiRack */
  MultiRack = "MultiRack",
}

/**
 * Type of Network Fabric SKU. \
 * {@link KnownFabricSkuType} can be used interchangeably with FabricSkuType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SingleRack**: FabricSkuType-SingleRack \
 * **MultiRack**: FabricSkuType-MultiRack
 */
export type FabricSkuType = string;

/** The response of a NetworkFabricSku list operation. */
export interface _NetworkFabricSkuListResult {
  /** The NetworkFabricSku items on this page */
  value: NetworkFabricSku[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkFabricSkuListResultDeserializer(item: any): _NetworkFabricSkuListResult {
  return {
    value: networkFabricSkuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkFabricSkuArrayDeserializer(result: Array<NetworkFabricSku>): any[] {
  return result.map((item) => {
    return networkFabricSkuDeserializer(item);
  });
}

/** The Network Fabric resource definition. */
export interface NetworkFabric extends TrackedResource {
  /** The NetworkFabric Properties */
  properties: NetworkFabricProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function networkFabricSerializer(item: NetworkFabric): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: networkFabricPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function networkFabricDeserializer(item: any): NetworkFabric {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: networkFabricPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Network Fabric Properties defines the properties of the resource. */
export interface NetworkFabricProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** Supported Network Fabric SKU.Example: Compute / Aggregate racks. Once the user chooses a particular SKU, only supported racks can be added to the Network Fabric. The SKU determines whether it is a single / multi rack Network Fabric. */
  networkFabricSku: string;
  /** The version of Network Fabric. */
  fabricVersion?: string;
  /** Array of router IDs. */
  readonly routerIds?: string[];
  /** Bring your own storage account configurations for Network Fabric. */
  storageAccountConfiguration?: StorageAccountConfiguration;
  /** Network Fabric Lock details */
  readonly fabricLocks?: FabricLockProperties[];
  /** Azure resource ID for the NetworkFabricController the NetworkFabric belongs. */
  networkFabricControllerId: string;
  /** Number of compute racks associated to Network Fabric. */
  rackCount?: number;
  /** Number of servers.Possible values are from 1-16. */
  serverCountPerRack: number;
  /** IPv4Prefix for Management Network. Example: 10.1.0.0/19. */
  ipv4Prefix: string;
  /** IPv6Prefix for Management Network. Example: 3FFE:FFFF:0:CD40::/59 */
  ipv6Prefix?: string;
  /** ASN of CE devices for CE/PE connectivity. */
  fabricASN: number;
  /** Network and credentials configuration currently applied to terminal server. */
  terminalServerConfiguration: TerminalServerConfiguration;
  /** Configuration to be used to setup the management network. */
  managementNetworkConfiguration: ManagementNetworkConfigurationProperties;
  /** List of NetworkRack resource IDs under the Network Fabric. The number of racks allowed depends on the Network Fabric SKU. */
  readonly racks?: string[];
  /** List of L2 Isolation Domain resource IDs under the Network Fabric. */
  readonly l2IsolationDomains?: string[];
  /** List of L3 Isolation Domain resource IDs under the Network Fabric. */
  readonly l3IsolationDomains?: string[];
  /** Hardware alert threshold percentage. Possible values are from 20 to 100. */
  hardwareAlertThreshold?: number;
  /** Control Plane Access Control List ARM resource IDs. */
  controlPlaneAcls?: string[];
  /** Feature flag status information */
  readonly featureFlags?: FeatureFlagProperties[];
  /** Trusted IP Prefixes ARM resource IDs. */
  trustedIpPrefixes?: string[];
  /** Unique Route Distinguisher configuration */
  uniqueRdConfiguration?: UniqueRouteDistinguisherProperties;
  /** Number of Storage arrays associated with the Network Fabric. */
  storageArrayCount?: number;
  /** Active commit batch identifiers */
  readonly activeCommitBatches?: string[];
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Configuration state of the resource. */
  readonly configurationState?: ConfigurationState;
  /** Provides you the latest status of the NFC service, whether it is Accepted, updating, Succeeded or Failed. During this process, the states keep changing based on the status of NFC provisioning. */
  readonly provisioningState?: ProvisioningState;
  /** Administrative state of the resource. */
  readonly administrativeState?: AdministrativeState;
}

export function networkFabricPropertiesSerializer(item: NetworkFabricProperties): any {
  return {
    annotation: item["annotation"],
    networkFabricSku: item["networkFabricSku"],
    fabricVersion: item["fabricVersion"],
    storageAccountConfiguration: !item["storageAccountConfiguration"]
      ? item["storageAccountConfiguration"]
      : storageAccountConfigurationSerializer(item["storageAccountConfiguration"]),
    networkFabricControllerId: item["networkFabricControllerId"],
    rackCount: item["rackCount"],
    serverCountPerRack: item["serverCountPerRack"],
    ipv4Prefix: item["ipv4Prefix"],
    ipv6Prefix: item["ipv6Prefix"],
    fabricASN: item["fabricASN"],
    terminalServerConfiguration: terminalServerConfigurationSerializer(
      item["terminalServerConfiguration"],
    ),
    managementNetworkConfiguration: managementNetworkConfigurationPropertiesSerializer(
      item["managementNetworkConfiguration"],
    ),
    hardwareAlertThreshold: item["hardwareAlertThreshold"],
    controlPlaneAcls: !item["controlPlaneAcls"]
      ? item["controlPlaneAcls"]
      : item["controlPlaneAcls"].map((p: any) => {
          return p;
        }),
    trustedIpPrefixes: !item["trustedIpPrefixes"]
      ? item["trustedIpPrefixes"]
      : item["trustedIpPrefixes"].map((p: any) => {
          return p;
        }),
    uniqueRdConfiguration: !item["uniqueRdConfiguration"]
      ? item["uniqueRdConfiguration"]
      : uniqueRouteDistinguisherPropertiesSerializer(item["uniqueRdConfiguration"]),
    storageArrayCount: item["storageArrayCount"],
  };
}

export function networkFabricPropertiesDeserializer(item: any): NetworkFabricProperties {
  return {
    annotation: item["annotation"],
    networkFabricSku: item["networkFabricSku"],
    fabricVersion: item["fabricVersion"],
    routerIds: !item["routerIds"]
      ? item["routerIds"]
      : item["routerIds"].map((p: any) => {
          return p;
        }),
    storageAccountConfiguration: !item["storageAccountConfiguration"]
      ? item["storageAccountConfiguration"]
      : storageAccountConfigurationDeserializer(item["storageAccountConfiguration"]),
    fabricLocks: !item["fabricLocks"]
      ? item["fabricLocks"]
      : fabricLockPropertiesArrayDeserializer(item["fabricLocks"]),
    networkFabricControllerId: item["networkFabricControllerId"],
    rackCount: item["rackCount"],
    serverCountPerRack: item["serverCountPerRack"],
    ipv4Prefix: item["ipv4Prefix"],
    ipv6Prefix: item["ipv6Prefix"],
    fabricASN: item["fabricASN"],
    terminalServerConfiguration: terminalServerConfigurationDeserializer(
      item["terminalServerConfiguration"],
    ),
    managementNetworkConfiguration: managementNetworkConfigurationPropertiesDeserializer(
      item["managementNetworkConfiguration"],
    ),
    racks: !item["racks"]
      ? item["racks"]
      : item["racks"].map((p: any) => {
          return p;
        }),
    l2IsolationDomains: !item["l2IsolationDomains"]
      ? item["l2IsolationDomains"]
      : item["l2IsolationDomains"].map((p: any) => {
          return p;
        }),
    l3IsolationDomains: !item["l3IsolationDomains"]
      ? item["l3IsolationDomains"]
      : item["l3IsolationDomains"].map((p: any) => {
          return p;
        }),
    hardwareAlertThreshold: item["hardwareAlertThreshold"],
    controlPlaneAcls: !item["controlPlaneAcls"]
      ? item["controlPlaneAcls"]
      : item["controlPlaneAcls"].map((p: any) => {
          return p;
        }),
    featureFlags: !item["featureFlags"]
      ? item["featureFlags"]
      : featureFlagPropertiesArrayDeserializer(item["featureFlags"]),
    trustedIpPrefixes: !item["trustedIpPrefixes"]
      ? item["trustedIpPrefixes"]
      : item["trustedIpPrefixes"].map((p: any) => {
          return p;
        }),
    uniqueRdConfiguration: !item["uniqueRdConfiguration"]
      ? item["uniqueRdConfiguration"]
      : uniqueRouteDistinguisherPropertiesDeserializer(item["uniqueRdConfiguration"]),
    storageArrayCount: item["storageArrayCount"],
    activeCommitBatches: !item["activeCommitBatches"]
      ? item["activeCommitBatches"]
      : item["activeCommitBatches"].map((p: any) => {
          return p;
        }),
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    configurationState: item["configurationState"],
    provisioningState: item["provisioningState"],
    administrativeState: item["administrativeState"],
  };
}

/** Storage account configuration. */
export interface StorageAccountConfiguration {
  /** Network Fabric storage account resource identifier. */
  storageAccountId?: string;
  /** The selection of the managed identity to use with this storage account. The identity type must be either system assigned or user assigned. */
  storageAccountIdentity?: IdentitySelector;
}

export function storageAccountConfigurationSerializer(item: StorageAccountConfiguration): any {
  return {
    storageAccountId: item["storageAccountId"],
    storageAccountIdentity: !item["storageAccountIdentity"]
      ? item["storageAccountIdentity"]
      : identitySelectorSerializer(item["storageAccountIdentity"]),
  };
}

export function storageAccountConfigurationDeserializer(item: any): StorageAccountConfiguration {
  return {
    storageAccountId: item["storageAccountId"],
    storageAccountIdentity: !item["storageAccountIdentity"]
      ? item["storageAccountIdentity"]
      : identitySelectorDeserializer(item["storageAccountIdentity"]),
  };
}

/** IdentitySelector represents the selection of a managed identity for use. */
export interface IdentitySelector {
  /** The type of managed identity that is being selected. */
  identityType: ManagedServiceIdentitySelectorType;
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

/** The type of managed identity. */
export enum KnownManagedServiceIdentitySelectorType {
  /** System Assigned Identity. */
  SystemAssignedIdentity = "SystemAssignedIdentity",
  /** User Assigned Identity. */
  UserAssignedIdentity = "UserAssignedIdentity",
}

/**
 * The type of managed identity. \
 * {@link KnownManagedServiceIdentitySelectorType} can be used interchangeably with ManagedServiceIdentitySelectorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssignedIdentity**: System Assigned Identity. \
 * **UserAssignedIdentity**: User Assigned Identity.
 */
export type ManagedServiceIdentitySelectorType = string;

export function fabricLockPropertiesArrayDeserializer(result: Array<FabricLockProperties>): any[] {
  return result.map((item) => {
    return fabricLockPropertiesDeserializer(item);
  });
}

/** Network Fabric Lock Configuration. */
export interface FabricLockProperties {
  /** NetworkFabric Lock State. */
  lockState?: LockConfigurationState;
  /** NetworkFabric Lock Type. */
  lockType?: NetworkFabricLockType;
}

export function fabricLockPropertiesDeserializer(item: any): FabricLockProperties {
  return {
    lockState: item["lockState"],
    lockType: item["lockType"],
  };
}

/** Lock Configuration State. */
export enum KnownLockConfigurationState {
  /** LockConfigurationState Enabled */
  Enabled = "Enabled",
  /** LockConfigurationState Disabled */
  Disabled = "Disabled",
}

/**
 * Lock Configuration State. \
 * {@link KnownLockConfigurationState} can be used interchangeably with LockConfigurationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: LockConfigurationState Enabled \
 * **Disabled**: LockConfigurationState Disabled
 */
export type LockConfigurationState = string;

/** Network fabric lock type */
export enum KnownNetworkFabricLockType {
  /** A administrative lock/unlock operation will be performed */
  Administrative = "Administrative",
  /** A lock/unlock operation will be performed on the configuration */
  Configuration = "Configuration",
}

/**
 * Network fabric lock type \
 * {@link KnownNetworkFabricLockType} can be used interchangeably with NetworkFabricLockType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Administrative**: A administrative lock\/unlock operation will be performed \
 * **Configuration**: A lock\/unlock operation will be performed on the configuration
 */
export type NetworkFabricLockType = string;

/** Network and credentials configuration currently applied to terminal server. */
export interface TerminalServerConfiguration {
  /** Username for the terminal server connection. */
  username: string;
  /** Password for the terminal server connection. */
  password: string;
  /** Serial Number of Terminal server. */
  serialNumber?: string;
  /** IPv4 Address Prefix. */
  primaryIpv4Prefix: string;
  /** IPv6 Address Prefix. */
  primaryIpv6Prefix?: string;
  /** Secondary IPv4 Address Prefix. */
  secondaryIpv4Prefix: string;
  /** Secondary IPv6 Address Prefix. */
  secondaryIpv6Prefix?: string;
  /** ARM Resource ID used for the NetworkDevice. */
  readonly networkDeviceId?: string;
}

export function terminalServerConfigurationSerializer(item: TerminalServerConfiguration): any {
  return {
    username: item["username"],
    password: item["password"],
    serialNumber: item["serialNumber"],
    primaryIpv4Prefix: item["primaryIpv4Prefix"],
    primaryIpv6Prefix: item["primaryIpv6Prefix"],
    secondaryIpv4Prefix: item["secondaryIpv4Prefix"],
    secondaryIpv6Prefix: item["secondaryIpv6Prefix"],
  };
}

export function terminalServerConfigurationDeserializer(item: any): TerminalServerConfiguration {
  return {
    username: item["username"],
    password: item["password"],
    serialNumber: item["serialNumber"],
    primaryIpv4Prefix: item["primaryIpv4Prefix"],
    primaryIpv6Prefix: item["primaryIpv6Prefix"],
    secondaryIpv4Prefix: item["secondaryIpv4Prefix"],
    secondaryIpv6Prefix: item["secondaryIpv6Prefix"],
    networkDeviceId: item["networkDeviceId"],
  };
}

/** Configuration to be used to setup the management network. */
export interface ManagementNetworkConfigurationProperties {
  /** VPN Configuration properties. */
  infrastructureVpnConfiguration: VpnConfigurationProperties;
  /** VPN Configuration properties. */
  workloadVpnConfiguration: VpnConfigurationProperties;
}

export function managementNetworkConfigurationPropertiesSerializer(
  item: ManagementNetworkConfigurationProperties,
): any {
  return {
    infrastructureVpnConfiguration: vpnConfigurationPropertiesSerializer(
      item["infrastructureVpnConfiguration"],
    ),
    workloadVpnConfiguration: vpnConfigurationPropertiesSerializer(
      item["workloadVpnConfiguration"],
    ),
  };
}

export function managementNetworkConfigurationPropertiesDeserializer(
  item: any,
): ManagementNetworkConfigurationProperties {
  return {
    infrastructureVpnConfiguration: vpnConfigurationPropertiesDeserializer(
      item["infrastructureVpnConfiguration"],
    ),
    workloadVpnConfiguration: vpnConfigurationPropertiesDeserializer(
      item["workloadVpnConfiguration"],
    ),
  };
}

/** Network and credential configuration currently applied on terminal server. */
export interface VpnConfigurationProperties {
  /** ARM Resource ID of the Network To Network Interconnect. */
  networkToNetworkInterconnectId?: string;
  /** Administrative state of the resource. */
  readonly administrativeState?: AdministrativeState;
  /** Peering option list. */
  peeringOption: PeeringOption;
  /** option B properties */
  optionBProperties?: VpnOptionBProperties;
  /** option A properties */
  optionAProperties?: VpnOptionAProperties;
}

export function vpnConfigurationPropertiesSerializer(item: VpnConfigurationProperties): any {
  return {
    networkToNetworkInterconnectId: item["networkToNetworkInterconnectId"],
    peeringOption: item["peeringOption"],
    optionBProperties: !item["optionBProperties"]
      ? item["optionBProperties"]
      : vpnOptionBPropertiesSerializer(item["optionBProperties"]),
    optionAProperties: !item["optionAProperties"]
      ? item["optionAProperties"]
      : vpnOptionAPropertiesSerializer(item["optionAProperties"]),
  };
}

export function vpnConfigurationPropertiesDeserializer(item: any): VpnConfigurationProperties {
  return {
    networkToNetworkInterconnectId: item["networkToNetworkInterconnectId"],
    administrativeState: item["administrativeState"],
    peeringOption: item["peeringOption"],
    optionBProperties: !item["optionBProperties"]
      ? item["optionBProperties"]
      : vpnOptionBPropertiesDeserializer(item["optionBProperties"]),
    optionAProperties: !item["optionAProperties"]
      ? item["optionAProperties"]
      : vpnOptionAPropertiesDeserializer(item["optionAProperties"]),
  };
}

/** Option B configuration to be used for Management VPN. */
export interface VpnOptionBProperties {
  /** Route Targets to be applied for incoming routes into CE. This is for backward compatibility. */
  importRouteTargets?: string[];
  /** Route Targets to be applied for outgoing routes from CE. This is for backward compatibility. */
  exportRouteTargets?: string[];
  /** Route Targets to be applied. */
  routeTargets?: RouteTargetInformation;
}

export function vpnOptionBPropertiesSerializer(item: VpnOptionBProperties): any {
  return {
    importRouteTargets: !item["importRouteTargets"]
      ? item["importRouteTargets"]
      : item["importRouteTargets"].map((p: any) => {
          return p;
        }),
    exportRouteTargets: !item["exportRouteTargets"]
      ? item["exportRouteTargets"]
      : item["exportRouteTargets"].map((p: any) => {
          return p;
        }),
    routeTargets: !item["routeTargets"]
      ? item["routeTargets"]
      : routeTargetInformationSerializer(item["routeTargets"]),
  };
}

export function vpnOptionBPropertiesDeserializer(item: any): VpnOptionBProperties {
  return {
    importRouteTargets: !item["importRouteTargets"]
      ? item["importRouteTargets"]
      : item["importRouteTargets"].map((p: any) => {
          return p;
        }),
    exportRouteTargets: !item["exportRouteTargets"]
      ? item["exportRouteTargets"]
      : item["exportRouteTargets"].map((p: any) => {
          return p;
        }),
    routeTargets: !item["routeTargets"]
      ? item["routeTargets"]
      : routeTargetInformationDeserializer(item["routeTargets"]),
  };
}

/** option A properties */
export interface VpnOptionAProperties {
  /** MTU to use for option A peering. */
  mtu?: number;
  /** Vlan Id.Example : 501 */
  vlanId: number;
  /** Peer ASN number.Example : 28 */
  peerASN: number;
  /** BFD Configuration properties. */
  bfdConfiguration?: BfdConfiguration;
  /** IPv4 Address Prefix. */
  primaryIpv4Prefix?: string;
  /** IPv6 Address Prefix. */
  primaryIpv6Prefix?: string;
  /** Secondary IPv4 Address Prefix. */
  secondaryIpv4Prefix?: string;
  /** Secondary IPv6 Address Prefix. */
  secondaryIpv6Prefix?: string;
}

export function vpnOptionAPropertiesSerializer(item: VpnOptionAProperties): any {
  return {
    mtu: item["mtu"],
    vlanId: item["vlanId"],
    peerASN: item["peerASN"],
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdConfigurationSerializer(item["bfdConfiguration"]),
    primaryIpv4Prefix: item["primaryIpv4Prefix"],
    primaryIpv6Prefix: item["primaryIpv6Prefix"],
    secondaryIpv4Prefix: item["secondaryIpv4Prefix"],
    secondaryIpv6Prefix: item["secondaryIpv6Prefix"],
  };
}

export function vpnOptionAPropertiesDeserializer(item: any): VpnOptionAProperties {
  return {
    mtu: item["mtu"],
    vlanId: item["vlanId"],
    peerASN: item["peerASN"],
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdConfigurationDeserializer(item["bfdConfiguration"]),
    primaryIpv4Prefix: item["primaryIpv4Prefix"],
    primaryIpv6Prefix: item["primaryIpv6Prefix"],
    secondaryIpv4Prefix: item["secondaryIpv4Prefix"],
    secondaryIpv6Prefix: item["secondaryIpv6Prefix"],
  };
}

export function featureFlagPropertiesArrayDeserializer(
  result: Array<FeatureFlagProperties>,
): any[] {
  return result.map((item) => {
    return featureFlagPropertiesDeserializer(item);
  });
}

/** Feature flag properties. */
export interface FeatureFlagProperties {
  /** Feature flag name. */
  featureFlagName?: string;
  /** Feature flag value. */
  featureFlagValue?: string;
}

export function featureFlagPropertiesDeserializer(item: any): FeatureFlagProperties {
  return {
    featureFlagName: item["featureFlagName"],
    featureFlagValue: item["featureFlagValue"],
  };
}

/** Unique Route Distinguisher properties. */
export interface UniqueRouteDistinguisherProperties {
  /** Unique Route Distinguisher configuration state. Default is Enabled. */
  uniqueRdConfigurationState?: UniqueRouteDistinguisherConfigurationState;
  /** List of Unique Route Distinguisher addresses. */
  readonly uniqueRds?: string[];
  /** NNI derived unique Route Distinguisher state. Default is Disabled. */
  nniDerivedUniqueRdConfigurationState?: NNIDerivedUniqueRouteDistinguisherConfigurationState;
}

export function uniqueRouteDistinguisherPropertiesSerializer(
  item: UniqueRouteDistinguisherProperties,
): any {
  return {
    uniqueRdConfigurationState: item["uniqueRdConfigurationState"],
    nniDerivedUniqueRdConfigurationState: item["nniDerivedUniqueRdConfigurationState"],
  };
}

export function uniqueRouteDistinguisherPropertiesDeserializer(
  item: any,
): UniqueRouteDistinguisherProperties {
  return {
    uniqueRdConfigurationState: item["uniqueRdConfigurationState"],
    uniqueRds: !item["uniqueRds"]
      ? item["uniqueRds"]
      : item["uniqueRds"].map((p: any) => {
          return p;
        }),
    nniDerivedUniqueRdConfigurationState: item["nniDerivedUniqueRdConfigurationState"],
  };
}

/** Unique Route Distinguisher Configuration State. */
export enum KnownUniqueRouteDistinguisherConfigurationState {
  /** UniqueRouteDistinguisherConfigurationState Enabled */
  Enabled = "Enabled",
  /** UniqueRouteDistinguisherConfigurationState Disabled */
  Disabled = "Disabled",
}

/**
 * Unique Route Distinguisher Configuration State. \
 * {@link KnownUniqueRouteDistinguisherConfigurationState} can be used interchangeably with UniqueRouteDistinguisherConfigurationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: UniqueRouteDistinguisherConfigurationState Enabled \
 * **Disabled**: UniqueRouteDistinguisherConfigurationState Disabled
 */
export type UniqueRouteDistinguisherConfigurationState = string;

/** NNI Derived Unique Route Distinguisher Configuration State. */
export enum KnownNNIDerivedUniqueRouteDistinguisherConfigurationState {
  /** NNI derived unique route distinguisher configuration state Enabled */
  Enabled = "Enabled",
  /** NNI derived unique route distinguisher configuration state Disabled */
  Disabled = "Disabled",
}

/**
 * NNI Derived Unique Route Distinguisher Configuration State. \
 * {@link KnownNNIDerivedUniqueRouteDistinguisherConfigurationState} can be used interchangeably with NNIDerivedUniqueRouteDistinguisherConfigurationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: NNI derived unique route distinguisher configuration state Enabled \
 * **Disabled**: NNI derived unique route distinguisher configuration state Disabled
 */
export type NNIDerivedUniqueRouteDistinguisherConfigurationState = string;

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
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

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The Network Fabric resource definition. */
export interface NetworkFabricPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Network Fabric Patch properties. */
  properties?: NetworkFabricPatchProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentityPatch;
}

export function networkFabricPatchSerializer(item: NetworkFabricPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : networkFabricPatchPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityPatchSerializer(item["identity"]),
  };
}

/** Network Fabric Patch properties. */
export interface NetworkFabricPatchProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** Number of compute racks associated to Network Fabric. */
  rackCount?: number;
  /** Number of servers.Possible values are from 1-16. */
  serverCountPerRack?: number;
  /** IPv4Prefix for Management Network. Example: 10.1.0.0/19. */
  ipv4Prefix?: string;
  /** IPv6Prefix for Management Network. Example: 3FFE:FFFF:0:CD40::/59. */
  ipv6Prefix?: string;
  /** ASN of CE devices for CE/PE connectivity. */
  fabricASN?: number;
  /** Bring your own storage account configurations for Network Fabric. */
  storageAccountConfiguration?: StorageAccountPatchConfiguration;
  /** Network and credentials configuration already applied to terminal server. */
  terminalServerConfiguration?: TerminalServerPatchConfiguration;
  /** Configuration to be used to setup the management network. */
  managementNetworkConfiguration?: ManagementNetworkPatchConfiguration;
  /** Hardware alert threshold percentage. Possible values are from 20 to 100. */
  hardwareAlertThreshold?: number;
  /** Control Plane Access Control List ARM resource IDs. */
  controlPlaneAcls?: string[];
  /** Trusted IP Prefix ARM resource IDs. */
  trustedIpPrefixes?: string[];
  /** Unique Route Distinguisher configuration */
  uniqueRdConfiguration?: UniqueRouteDistinguisherPatchProperties;
}

export function networkFabricPatchPropertiesSerializer(item: NetworkFabricPatchProperties): any {
  return {
    annotation: item["annotation"],
    rackCount: item["rackCount"],
    serverCountPerRack: item["serverCountPerRack"],
    ipv4Prefix: item["ipv4Prefix"],
    ipv6Prefix: item["ipv6Prefix"],
    fabricASN: item["fabricASN"],
    storageAccountConfiguration: !item["storageAccountConfiguration"]
      ? item["storageAccountConfiguration"]
      : storageAccountPatchConfigurationSerializer(item["storageAccountConfiguration"]),
    terminalServerConfiguration: !item["terminalServerConfiguration"]
      ? item["terminalServerConfiguration"]
      : terminalServerPatchConfigurationSerializer(item["terminalServerConfiguration"]),
    managementNetworkConfiguration: !item["managementNetworkConfiguration"]
      ? item["managementNetworkConfiguration"]
      : managementNetworkPatchConfigurationSerializer(item["managementNetworkConfiguration"]),
    hardwareAlertThreshold: item["hardwareAlertThreshold"],
    controlPlaneAcls: !item["controlPlaneAcls"]
      ? item["controlPlaneAcls"]
      : item["controlPlaneAcls"].map((p: any) => {
          return p;
        }),
    trustedIpPrefixes: !item["trustedIpPrefixes"]
      ? item["trustedIpPrefixes"]
      : item["trustedIpPrefixes"].map((p: any) => {
          return p;
        }),
    uniqueRdConfiguration: !item["uniqueRdConfiguration"]
      ? item["uniqueRdConfiguration"]
      : uniqueRouteDistinguisherPatchPropertiesSerializer(item["uniqueRdConfiguration"]),
  };
}

/** Storage account configuration. */
export interface StorageAccountPatchConfiguration {
  /** Network Fabric storage account resource identifier. */
  storageAccountId?: string;
  /** The selection of the managed identity to use with this storage account. The identity type must be either system assigned or user assigned. */
  storageAccountIdentity?: IdentitySelectorPatch;
}

export function storageAccountPatchConfigurationSerializer(
  item: StorageAccountPatchConfiguration,
): any {
  return {
    storageAccountId: item["storageAccountId"],
    storageAccountIdentity: !item["storageAccountIdentity"]
      ? item["storageAccountIdentity"]
      : identitySelectorPatchSerializer(item["storageAccountIdentity"]),
  };
}

/** IdentitySelector represents the selection of a managed identity for use. */
export interface IdentitySelectorPatch {
  /** The type of managed identity that is being selected. */
  identityType?: ManagedServiceIdentitySelectorType;
  /** The user assigned managed identity resource ID to use. Mutually exclusive with a system assigned identity type. */
  userAssignedIdentityResourceId?: string;
}

export function identitySelectorPatchSerializer(item: IdentitySelectorPatch): any {
  return {
    identityType: item["identityType"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

/** Network and credentials configuration already applied to terminal server. */
export interface TerminalServerPatchConfiguration {
  /** Username for the terminal server connection. */
  username?: string;
  /** Password for the terminal server connection. */
  password?: string;
  /** Serial Number of Terminal server. */
  serialNumber?: string;
  /** IPv4 Address Prefix. */
  primaryIpv4Prefix?: string;
  /** IPv6 Address Prefix. */
  primaryIpv6Prefix?: string;
  /** Secondary IPv4 Address Prefix. */
  secondaryIpv4Prefix?: string;
  /** Secondary IPv6 Address Prefix. */
  secondaryIpv6Prefix?: string;
}

export function terminalServerPatchConfigurationSerializer(
  item: TerminalServerPatchConfiguration,
): any {
  return {
    username: item["username"],
    password: item["password"],
    serialNumber: item["serialNumber"],
    primaryIpv4Prefix: item["primaryIpv4Prefix"],
    primaryIpv6Prefix: item["primaryIpv6Prefix"],
    secondaryIpv4Prefix: item["secondaryIpv4Prefix"],
    secondaryIpv6Prefix: item["secondaryIpv6Prefix"],
  };
}

/** Configuration to be used to setup the management network. */
export interface ManagementNetworkPatchConfiguration {
  /** VPN Configuration properties. */
  infrastructureVpnConfiguration?: VpnConfigurationPatchableProperties;
  /** VPN Configuration properties. */
  workloadVpnConfiguration?: VpnConfigurationPatchableProperties;
}

export function managementNetworkPatchConfigurationSerializer(
  item: ManagementNetworkPatchConfiguration,
): any {
  return {
    infrastructureVpnConfiguration: !item["infrastructureVpnConfiguration"]
      ? item["infrastructureVpnConfiguration"]
      : vpnConfigurationPatchablePropertiesSerializer(item["infrastructureVpnConfiguration"]),
    workloadVpnConfiguration: !item["workloadVpnConfiguration"]
      ? item["workloadVpnConfiguration"]
      : vpnConfigurationPatchablePropertiesSerializer(item["workloadVpnConfiguration"]),
  };
}

/** Network and credential configuration currently applied on terminal server. */
export interface VpnConfigurationPatchableProperties {
  /** ARM Resource ID of the Network To Network Interconnect. */
  networkToNetworkInterconnectId?: string;
  /** Peering option list. */
  peeringOption?: PeeringOption;
  /** option B properties */
  optionBProperties?: VpnOptionBPatchProperties;
  /** option A properties */
  optionAProperties?: VpnOptionAPatchProperties;
}

export function vpnConfigurationPatchablePropertiesSerializer(
  item: VpnConfigurationPatchableProperties,
): any {
  return {
    networkToNetworkInterconnectId: item["networkToNetworkInterconnectId"],
    peeringOption: item["peeringOption"],
    optionBProperties: !item["optionBProperties"]
      ? item["optionBProperties"]
      : vpnOptionBPatchPropertiesSerializer(item["optionBProperties"]),
    optionAProperties: !item["optionAProperties"]
      ? item["optionAProperties"]
      : vpnOptionAPatchPropertiesSerializer(item["optionAProperties"]),
  };
}

/** Option B configuration to be used for Management VPN. */
export interface VpnOptionBPatchProperties {
  /** Route Targets to be applied for incoming routes into CE. This is for backward compatibility. */
  importRouteTargets?: string[];
  /** Route Targets to be applied for outgoing routes from CE. This is for backward compatibility. */
  exportRouteTargets?: string[];
  /** Route Targets to be applied. */
  routeTargets?: RouteTargetPatchInformation;
}

export function vpnOptionBPatchPropertiesSerializer(item: VpnOptionBPatchProperties): any {
  return {
    importRouteTargets: !item["importRouteTargets"]
      ? item["importRouteTargets"]
      : item["importRouteTargets"].map((p: any) => {
          return p;
        }),
    exportRouteTargets: !item["exportRouteTargets"]
      ? item["exportRouteTargets"]
      : item["exportRouteTargets"].map((p: any) => {
          return p;
        }),
    routeTargets: !item["routeTargets"]
      ? item["routeTargets"]
      : routeTargetPatchInformationSerializer(item["routeTargets"]),
  };
}

/** Peering optionA properties */
export interface VpnOptionAPatchProperties {
  /** MTU to use for option A peering. */
  mtu?: number;
  /** Vlan Id.Example : 501 */
  vlanId?: number;
  /** Peer ASN number.Example : 28 */
  peerASN?: number;
  /** BFD Configuration properties. */
  bfdConfiguration?: BfdPatchConfiguration;
  /** IPv4 Address Prefix. */
  primaryIpv4Prefix?: string;
  /** IPv6 Address Prefix. */
  primaryIpv6Prefix?: string;
  /** Secondary IPv4 Address Prefix. */
  secondaryIpv4Prefix?: string;
  /** Secondary IPv6 Address Prefix. */
  secondaryIpv6Prefix?: string;
}

export function vpnOptionAPatchPropertiesSerializer(item: VpnOptionAPatchProperties): any {
  return {
    mtu: item["mtu"],
    vlanId: item["vlanId"],
    peerASN: item["peerASN"],
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdPatchConfigurationSerializer(item["bfdConfiguration"]),
    primaryIpv4Prefix: item["primaryIpv4Prefix"],
    primaryIpv6Prefix: item["primaryIpv6Prefix"],
    secondaryIpv4Prefix: item["secondaryIpv4Prefix"],
    secondaryIpv6Prefix: item["secondaryIpv6Prefix"],
  };
}

/** Unique Route Distinguisher configuration properties. */
export interface UniqueRouteDistinguisherPatchProperties {
  /** Unique Route Distinguisher configuration state. Default is Enabled. */
  uniqueRdConfigurationState?: UniqueRouteDistinguisherConfigurationState;
  /** NNI derived unique Route Distinguisher state. Default is Disabled. */
  nniDerivedUniqueRdConfigurationState?: NNIDerivedUniqueRouteDistinguisherConfigurationState;
}

export function uniqueRouteDistinguisherPatchPropertiesSerializer(
  item: UniqueRouteDistinguisherPatchProperties,
): any {
  return {
    uniqueRdConfigurationState: item["uniqueRdConfigurationState"],
    nniDerivedUniqueRdConfigurationState: item["nniDerivedUniqueRdConfigurationState"],
  };
}

/** The managed service identities assigned to this resource. */
export interface ManagedServiceIdentityPatch {
  /** The type of managed identity assigned to this resource. */
  type?: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

export function managedServiceIdentityPatchSerializer(item: ManagedServiceIdentityPatch): any {
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

/** The response of a NetworkFabric list operation. */
export interface _NetworkFabricListResult {
  /** The NetworkFabric items on this page */
  value: NetworkFabric[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkFabricListResultDeserializer(item: any): _NetworkFabricListResult {
  return {
    value: networkFabricArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkFabricArraySerializer(result: Array<NetworkFabric>): any[] {
  return result.map((item) => {
    return networkFabricSerializer(item);
  });
}

export function networkFabricArrayDeserializer(result: Array<NetworkFabric>): any[] {
  return result.map((item) => {
    return networkFabricDeserializer(item);
  });
}

/** Model used for Upgrade Network Fabric Properties */
export interface UpgradeNetworkFabricProperties {
  /** Specify the version. */
  version?: string;
  /** Action to be performed while upgrading the fabric. */
  action?: NetworkFabricUpgradeAction;
}

export function upgradeNetworkFabricPropertiesSerializer(
  item: UpgradeNetworkFabricProperties,
): any {
  return { version: item["version"], action: item["action"] };
}

/** Action to be performed while upgrading the fabric. */
export enum KnownNetworkFabricUpgradeAction {
  /** UpgradeAction-Start */
  Start = "Start",
  /** UpgradeAction -Complete */
  Complete = "Complete",
}

/**
 * Action to be performed while upgrading the fabric. \
 * {@link KnownNetworkFabricUpgradeAction} can be used interchangeably with NetworkFabricUpgradeAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Start**: UpgradeAction-Start \
 * **Complete**: UpgradeAction -Complete
 */
export type NetworkFabricUpgradeAction = string;

/** Validation configuration properties. */
export interface ValidateConfigurationProperties {
  /** Validate action that to be performed */
  validateAction?: ValidateAction;
}

export function validateConfigurationPropertiesSerializer(
  item: ValidateConfigurationProperties,
): any {
  return { validateAction: item["validateAction"] };
}

/** Validate action that to be performed */
export enum KnownValidateAction {
  /** ValidateAction-Cabling */
  Cabling = "Cabling",
  /** ValidateAction-Configuration */
  Configuration = "Configuration",
  /** ValidateAction-Connectivity */
  Connectivity = "Connectivity",
}

/**
 * Validate action that to be performed \
 * {@link KnownValidateAction} can be used interchangeably with ValidateAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Cabling**: ValidateAction-Cabling \
 * **Configuration**: ValidateAction-Configuration \
 * **Connectivity**: ValidateAction-Connectivity
 */
export type ValidateAction = string;

/** Commit Batch Status Request. */
export interface CommitBatchStatusRequest {
  /** Commit Batch Identifier. If not provided, the latest commit batch status will be returned. */
  commitBatchId?: string;
}

export function commitBatchStatusRequestSerializer(item: CommitBatchStatusRequest): any {
  return { commitBatchId: item["commitBatchId"] };
}

/** Commit Batch Status Response. */
export interface CommitBatchStatusResponse {
  /** Commit Batch Identifier. */
  commitBatchId?: string;
  /** Commit Batch State. */
  commitBatchState?: CommitBatchState;
  /** Commit Batch Details. */
  commitBatchDetails?: CommitBatchDetails;
  /** The error object. */
  error?: ErrorDetail;
}

export function commitBatchStatusResponseDeserializer(item: any): CommitBatchStatusResponse {
  return {
    commitBatchId: item["commitBatchId"],
    commitBatchState: item["commitBatchState"],
    commitBatchDetails: !item["commitBatchDetails"]
      ? item["commitBatchDetails"]
      : commitBatchDetailsDeserializer(item["commitBatchDetails"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** Commit Batch State. */
export enum KnownCommitBatchState {
  /** CommitBatchState-PartialSuccess */
  Processing = "Processing",
  /** CommitBatchState-Succeeded */
  Succeeded = "Succeeded",
  /** CommitBatchState-Failed */
  Failed = "Failed",
}

/**
 * Commit Batch State. \
 * {@link KnownCommitBatchState} can be used interchangeably with CommitBatchState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Processing**: CommitBatchState-PartialSuccess \
 * **Succeeded**: CommitBatchState-Succeeded \
 * **Failed**: CommitBatchState-Failed
 */
export type CommitBatchState = string;

/** Commit Batch Details. */
export interface CommitBatchDetails {
  /** List of devices for which the commit operation failed. */
  failedDevices?: string[];
}

export function commitBatchDetailsDeserializer(item: any): CommitBatchDetails {
  return {
    failedDevices: !item["failedDevices"]
      ? item["failedDevices"]
      : item["failedDevices"].map((p: any) => {
          return p;
        }),
  };
}

/** Discard Commit Batch Request. */
export interface DiscardCommitBatchRequest {
  /** Commit Batch Identifier. If not provided, the latest commit batch status will be returned. */
  commitBatchId?: string;
}

export function discardCommitBatchRequestSerializer(item: DiscardCommitBatchRequest): any {
  return { commitBatchId: item["commitBatchId"] };
}

/** Discard Commit Batch Response. */
export interface DiscardCommitBatchResponse {
  /** Commit Batch Identifier. */
  commitBatchId?: string;
  /** The error object. */
  error?: ErrorDetail;
}

export function discardCommitBatchResponseDeserializer(item: any): DiscardCommitBatchResponse {
  return {
    commitBatchId: item["commitBatchId"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** Network Fabric Lock Request. */
export interface NetworkFabricLockRequest {
  /** Type of lock to be applied */
  lockType?: NetworkFabricLockType;
  /** Action to be performed on the lock */
  action?: NetworkFabricLockAction;
}

export function networkFabricLockRequestSerializer(item: NetworkFabricLockRequest): any {
  return { lockType: item["lockType"], action: item["action"] };
}

/** Network fabric lock action */
export enum KnownNetworkFabricLockAction {
  /** Perform lock operation */
  Lock = "Lock",
  /** Perform unlock operation */
  Unlock = "Unlock",
}

/**
 * Network fabric lock action \
 * {@link KnownNetworkFabricLockAction} can be used interchangeably with NetworkFabricLockAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Lock**: Perform lock operation \
 * **Unlock**: Perform unlock operation
 */
export type NetworkFabricLockAction = string;

/** View Device Configuration Response. */
export interface ViewDeviceConfigurationResponse {
  /** Storage URL to the device configuration file. */
  deviceConfigurationUrl?: string;
  /** The error object. */
  error?: ErrorDetail;
}

export function viewDeviceConfigurationResponseDeserializer(
  item: any,
): ViewDeviceConfigurationResponse {
  return {
    deviceConfigurationUrl: item["deviceConfigurationUrl"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** Arm Configuration Diff Response. */
export interface ArmConfigurationDiffResponse {
  /** Storage URL to the diff file. */
  configurationDiffUrl?: string;
  /** The error object. */
  error?: ErrorDetail;
}

export function armConfigurationDiffResponseDeserializer(item: any): ArmConfigurationDiffResponse {
  return {
    configurationDiffUrl: item["configurationDiffUrl"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The Network To Network Interconnect resource definition. */
export interface NetworkToNetworkInterconnect extends ProxyResource {
  /** The NetworkToNetworkInterconnect Properties */
  properties: NetworkToNetworkInterconnectProperties;
}

export function networkToNetworkInterconnectSerializer(item: NetworkToNetworkInterconnect): any {
  return {
    properties: networkToNetworkInterconnectPropertiesSerializer(item["properties"]),
  };
}

export function networkToNetworkInterconnectDeserializer(item: any): NetworkToNetworkInterconnect {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: networkToNetworkInterconnectPropertiesDeserializer(item["properties"]),
  };
}

/** Configuration used to setup CE-PE connectivity. */
export interface NetworkToNetworkInterconnectProperties {
  /** Type of NNI used. Example: CE | NPB */
  nniType?: NniType;
  /** Configuration to use NNI for Infrastructure Management. Example: True/False. */
  isManagementType?: IsManagementType;
  /** Based on this option layer3 parameters are mandatory. Example: True/False */
  useOptionB: BooleanEnumProperty;
  /** Common properties for Layer2 Configuration. */
  layer2Configuration?: Layer2Configuration;
  /** Common properties for Layer3Configuration. */
  optionBLayer3Configuration?: OptionBLayer3Configuration;
  /** NPB Static Route Configuration properties. */
  npbStaticRouteConfiguration?: NpbStaticRouteConfiguration;
  /** Static Route Configuration. */
  staticRouteConfiguration?: NniStaticRouteConfiguration;
  /** Import Route Policy information. */
  importRoutePolicy?: ImportRoutePolicyInformation;
  /** Export Route Policy information */
  exportRoutePolicy?: ExportRoutePolicyInformation;
  /** Egress Acl. ARM resource ID of Access Control Lists. */
  egressAclId?: string;
  /** Ingress Acl. ARM resource ID of Access Control Lists. */
  ingressAclId?: string;
  /** Micro Bidirectional Forwarding Detection (BFD) enabled/disabled state. */
  microBfdState?: MicroBfdState;
  /** Conditional Default Route Configuration properties. */
  conditionalDefaultRouteConfiguration?: ConditionalDefaultRouteProperties;
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Configuration state of the resource. */
  readonly configurationState?: ConfigurationState;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Administrative state of the resource. */
  readonly administrativeState?: AdministrativeState;
}

export function networkToNetworkInterconnectPropertiesSerializer(
  item: NetworkToNetworkInterconnectProperties,
): any {
  return {
    nniType: item["nniType"],
    isManagementType: item["isManagementType"],
    useOptionB: item["useOptionB"],
    layer2Configuration: !item["layer2Configuration"]
      ? item["layer2Configuration"]
      : layer2ConfigurationSerializer(item["layer2Configuration"]),
    optionBLayer3Configuration: !item["optionBLayer3Configuration"]
      ? item["optionBLayer3Configuration"]
      : optionBLayer3ConfigurationSerializer(item["optionBLayer3Configuration"]),
    npbStaticRouteConfiguration: !item["npbStaticRouteConfiguration"]
      ? item["npbStaticRouteConfiguration"]
      : npbStaticRouteConfigurationSerializer(item["npbStaticRouteConfiguration"]),
    staticRouteConfiguration: !item["staticRouteConfiguration"]
      ? item["staticRouteConfiguration"]
      : nniStaticRouteConfigurationSerializer(item["staticRouteConfiguration"]),
    importRoutePolicy: !item["importRoutePolicy"]
      ? item["importRoutePolicy"]
      : importRoutePolicyInformationSerializer(item["importRoutePolicy"]),
    exportRoutePolicy: !item["exportRoutePolicy"]
      ? item["exportRoutePolicy"]
      : exportRoutePolicyInformationSerializer(item["exportRoutePolicy"]),
    egressAclId: item["egressAclId"],
    ingressAclId: item["ingressAclId"],
    microBfdState: item["microBfdState"],
    conditionalDefaultRouteConfiguration: !item["conditionalDefaultRouteConfiguration"]
      ? item["conditionalDefaultRouteConfiguration"]
      : conditionalDefaultRoutePropertiesSerializer(item["conditionalDefaultRouteConfiguration"]),
  };
}

export function networkToNetworkInterconnectPropertiesDeserializer(
  item: any,
): NetworkToNetworkInterconnectProperties {
  return {
    nniType: item["nniType"],
    isManagementType: item["isManagementType"],
    useOptionB: item["useOptionB"],
    layer2Configuration: !item["layer2Configuration"]
      ? item["layer2Configuration"]
      : layer2ConfigurationDeserializer(item["layer2Configuration"]),
    optionBLayer3Configuration: !item["optionBLayer3Configuration"]
      ? item["optionBLayer3Configuration"]
      : optionBLayer3ConfigurationDeserializer(item["optionBLayer3Configuration"]),
    npbStaticRouteConfiguration: !item["npbStaticRouteConfiguration"]
      ? item["npbStaticRouteConfiguration"]
      : npbStaticRouteConfigurationDeserializer(item["npbStaticRouteConfiguration"]),
    staticRouteConfiguration: !item["staticRouteConfiguration"]
      ? item["staticRouteConfiguration"]
      : nniStaticRouteConfigurationDeserializer(item["staticRouteConfiguration"]),
    importRoutePolicy: !item["importRoutePolicy"]
      ? item["importRoutePolicy"]
      : importRoutePolicyInformationDeserializer(item["importRoutePolicy"]),
    exportRoutePolicy: !item["exportRoutePolicy"]
      ? item["exportRoutePolicy"]
      : exportRoutePolicyInformationDeserializer(item["exportRoutePolicy"]),
    egressAclId: item["egressAclId"],
    ingressAclId: item["ingressAclId"],
    microBfdState: item["microBfdState"],
    conditionalDefaultRouteConfiguration: !item["conditionalDefaultRouteConfiguration"]
      ? item["conditionalDefaultRouteConfiguration"]
      : conditionalDefaultRoutePropertiesDeserializer(item["conditionalDefaultRouteConfiguration"]),
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    configurationState: item["configurationState"],
    provisioningState: item["provisioningState"],
    administrativeState: item["administrativeState"],
  };
}

/** Type of NNI used. Example: CE | NPB */
export enum KnownNniType {
  /** NniType-CE(Customer Edge). */
  CE = "CE",
  /** NniType-NPB(Network Packet Broker). */
  NPB = "NPB",
}

/**
 * Type of NNI used. Example: CE | NPB \
 * {@link KnownNniType} can be used interchangeably with NniType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CE**: NniType-CE(Customer Edge). \
 * **NPB**: NniType-NPB(Network Packet Broker).
 */
export type NniType = string;

/** Configuration to use NNI for Infrastructure Management. Example: True/False. */
export enum KnownIsManagementType {
  /** IsManagementType-True */
  True = "True",
  /** IsManagementType-False */
  False = "False",
}

/**
 * Configuration to use NNI for Infrastructure Management. Example: True/False. \
 * {@link KnownIsManagementType} can be used interchangeably with IsManagementType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: IsManagementType-True \
 * **False**: IsManagementType-False
 */
export type IsManagementType = string;

/** Common properties for Layer2 Configuration. */
export interface Layer2Configuration {
  /** MTU of the packets between PE & CE. */
  mtu?: number;
  /** List of network device interfaces resource IDs. */
  interfaces?: string[];
}

export function layer2ConfigurationSerializer(item: Layer2Configuration): any {
  return {
    mtu: item["mtu"],
    interfaces: !item["interfaces"]
      ? item["interfaces"]
      : item["interfaces"].map((p: any) => {
          return p;
        }),
  };
}

export function layer2ConfigurationDeserializer(item: any): Layer2Configuration {
  return {
    mtu: item["mtu"],
    interfaces: !item["interfaces"]
      ? item["interfaces"]
      : item["interfaces"].map((p: any) => {
          return p;
        }),
  };
}

/** OptionB Layer3 Configuration properties. */
export interface OptionBLayer3Configuration {
  /** IPv4 Address Prefix. */
  primaryIpv4Prefix?: string;
  /** IPv6 Address Prefix. */
  primaryIpv6Prefix?: string;
  /** Secondary IPv4 Address Prefix. */
  secondaryIpv4Prefix?: string;
  /** Secondary IPv6 Address Prefix. */
  secondaryIpv6Prefix?: string;
  /** ASN of PE devices for CE/PE connectivity.Example : 28 */
  peerASN: number;
  /** VLAN for CE/PE Layer 3 connectivity.Example : 501 */
  vlanId: number;
  /** ASN of CE devices for CE/PE connectivity. */
  readonly fabricASN?: number;
  /** Provider Edge (PE) Loopback IP Address. */
  peLoopbackIpAddress?: string[];
  /** BGP Monitoring Protocol (BMP) Configuration. */
  bmpConfiguration?: NniBmpProperties;
  /** OptionB Layer3 prefix limit configuration. */
  prefixLimits?: OptionBLayer3PrefixLimitProperties[];
}

export function optionBLayer3ConfigurationSerializer(item: OptionBLayer3Configuration): any {
  return {
    primaryIpv4Prefix: item["primaryIpv4Prefix"],
    primaryIpv6Prefix: item["primaryIpv6Prefix"],
    secondaryIpv4Prefix: item["secondaryIpv4Prefix"],
    secondaryIpv6Prefix: item["secondaryIpv6Prefix"],
    peerASN: item["peerASN"],
    vlanId: item["vlanId"],
    peLoopbackIpAddress: !item["peLoopbackIpAddress"]
      ? item["peLoopbackIpAddress"]
      : item["peLoopbackIpAddress"].map((p: any) => {
          return p;
        }),
    bmpConfiguration: !item["bmpConfiguration"]
      ? item["bmpConfiguration"]
      : nniBmpPropertiesSerializer(item["bmpConfiguration"]),
    prefixLimits: !item["prefixLimits"]
      ? item["prefixLimits"]
      : optionBLayer3PrefixLimitPropertiesArraySerializer(item["prefixLimits"]),
  };
}

export function optionBLayer3ConfigurationDeserializer(item: any): OptionBLayer3Configuration {
  return {
    primaryIpv4Prefix: item["primaryIpv4Prefix"],
    primaryIpv6Prefix: item["primaryIpv6Prefix"],
    secondaryIpv4Prefix: item["secondaryIpv4Prefix"],
    secondaryIpv6Prefix: item["secondaryIpv6Prefix"],
    peerASN: item["peerASN"],
    vlanId: item["vlanId"],
    fabricASN: item["fabricASN"],
    peLoopbackIpAddress: !item["peLoopbackIpAddress"]
      ? item["peLoopbackIpAddress"]
      : item["peLoopbackIpAddress"].map((p: any) => {
          return p;
        }),
    bmpConfiguration: !item["bmpConfiguration"]
      ? item["bmpConfiguration"]
      : nniBmpPropertiesDeserializer(item["bmpConfiguration"]),
    prefixLimits: !item["prefixLimits"]
      ? item["prefixLimits"]
      : optionBLayer3PrefixLimitPropertiesArrayDeserializer(item["prefixLimits"]),
  };
}

/** BGP Monitoring Protocol (BMP) properties. */
export interface NniBmpProperties {
  /** BGP Monitoring Protocol (BMP) Configuration State. */
  configurationState: BmpConfigurationState;
}

export function nniBmpPropertiesSerializer(item: NniBmpProperties): any {
  return { configurationState: item["configurationState"] };
}

export function nniBmpPropertiesDeserializer(item: any): NniBmpProperties {
  return {
    configurationState: item["configurationState"],
  };
}

export function optionBLayer3PrefixLimitPropertiesArraySerializer(
  result: Array<OptionBLayer3PrefixLimitProperties>,
): any[] {
  return result.map((item) => {
    return optionBLayer3PrefixLimitPropertiesSerializer(item);
  });
}

export function optionBLayer3PrefixLimitPropertiesArrayDeserializer(
  result: Array<OptionBLayer3PrefixLimitProperties>,
): any[] {
  return result.map((item) => {
    return optionBLayer3PrefixLimitPropertiesDeserializer(item);
  });
}

/** OptionB Layer3 prefix limit properties. */
export interface OptionBLayer3PrefixLimitProperties {
  /** Maximum number of routes allowed. */
  maximumRoutes?: number;
}

export function optionBLayer3PrefixLimitPropertiesSerializer(
  item: OptionBLayer3PrefixLimitProperties,
): any {
  return { maximumRoutes: item["maximumRoutes"] };
}

export function optionBLayer3PrefixLimitPropertiesDeserializer(
  item: any,
): OptionBLayer3PrefixLimitProperties {
  return {
    maximumRoutes: item["maximumRoutes"],
  };
}

/** NPB Static Route Configuration properties. */
export interface NpbStaticRouteConfiguration {
  /** BFD Configuration properties. */
  bfdConfiguration?: BfdConfiguration;
  /** List of IPv4 Routes. */
  ipv4Routes?: StaticRouteProperties[];
  /** List of IPv6 Routes. */
  ipv6Routes?: StaticRouteProperties[];
}

export function npbStaticRouteConfigurationSerializer(item: NpbStaticRouteConfiguration): any {
  return {
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdConfigurationSerializer(item["bfdConfiguration"]),
    ipv4Routes: !item["ipv4Routes"]
      ? item["ipv4Routes"]
      : staticRoutePropertiesArraySerializer(item["ipv4Routes"]),
    ipv6Routes: !item["ipv6Routes"]
      ? item["ipv6Routes"]
      : staticRoutePropertiesArraySerializer(item["ipv6Routes"]),
  };
}

export function npbStaticRouteConfigurationDeserializer(item: any): NpbStaticRouteConfiguration {
  return {
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdConfigurationDeserializer(item["bfdConfiguration"]),
    ipv4Routes: !item["ipv4Routes"]
      ? item["ipv4Routes"]
      : staticRoutePropertiesArrayDeserializer(item["ipv4Routes"]),
    ipv6Routes: !item["ipv6Routes"]
      ? item["ipv6Routes"]
      : staticRoutePropertiesArrayDeserializer(item["ipv6Routes"]),
  };
}

/** Static Route Configuration properties for NNI. */
export interface NniStaticRouteConfiguration {
  /** BFD configuration properties */
  bfdConfiguration?: BfdConfiguration;
  /** List of IPv4 Routes. */
  ipv4Routes?: StaticRouteProperties[];
  /** List of IPv6 Routes. */
  ipv6Routes?: StaticRouteProperties[];
}

export function nniStaticRouteConfigurationSerializer(item: NniStaticRouteConfiguration): any {
  return {
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdConfigurationSerializer(item["bfdConfiguration"]),
    ipv4Routes: !item["ipv4Routes"]
      ? item["ipv4Routes"]
      : staticRoutePropertiesArraySerializer(item["ipv4Routes"]),
    ipv6Routes: !item["ipv6Routes"]
      ? item["ipv6Routes"]
      : staticRoutePropertiesArraySerializer(item["ipv6Routes"]),
  };
}

export function nniStaticRouteConfigurationDeserializer(item: any): NniStaticRouteConfiguration {
  return {
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdConfigurationDeserializer(item["bfdConfiguration"]),
    ipv4Routes: !item["ipv4Routes"]
      ? item["ipv4Routes"]
      : staticRoutePropertiesArrayDeserializer(item["ipv4Routes"]),
    ipv6Routes: !item["ipv6Routes"]
      ? item["ipv6Routes"]
      : staticRoutePropertiesArrayDeserializer(item["ipv6Routes"]),
  };
}

/** Import Route Policy Configuration. */
export interface ImportRoutePolicyInformation {
  /** Import IPv4 Route Policy Id. */
  importIpv4RoutePolicyId?: string;
  /** Import IPv6 Route Policy Id. */
  importIpv6RoutePolicyId?: string;
}

export function importRoutePolicyInformationSerializer(item: ImportRoutePolicyInformation): any {
  return {
    importIpv4RoutePolicyId: item["importIpv4RoutePolicyId"],
    importIpv6RoutePolicyId: item["importIpv6RoutePolicyId"],
  };
}

export function importRoutePolicyInformationDeserializer(item: any): ImportRoutePolicyInformation {
  return {
    importIpv4RoutePolicyId: item["importIpv4RoutePolicyId"],
    importIpv6RoutePolicyId: item["importIpv6RoutePolicyId"],
  };
}

/** Export Route Policy Configuration. */
export interface ExportRoutePolicyInformation {
  /** Export IPv4 Route Policy Id. */
  exportIpv4RoutePolicyId?: string;
  /** Export IPv6 Route Policy Id. */
  exportIpv6RoutePolicyId?: string;
}

export function exportRoutePolicyInformationSerializer(item: ExportRoutePolicyInformation): any {
  return {
    exportIpv4RoutePolicyId: item["exportIpv4RoutePolicyId"],
    exportIpv6RoutePolicyId: item["exportIpv6RoutePolicyId"],
  };
}

export function exportRoutePolicyInformationDeserializer(item: any): ExportRoutePolicyInformation {
  return {
    exportIpv4RoutePolicyId: item["exportIpv4RoutePolicyId"],
    exportIpv6RoutePolicyId: item["exportIpv6RoutePolicyId"],
  };
}

/** Micro Bidirectional Forwarding Detection (BFD) enabled/disabled state. */
export enum KnownMicroBfdState {
  /** MicroBfdState-Enabled */
  Enabled = "Enabled",
  /** MicroBfdState-Disabled */
  Disabled = "Disabled",
}

/**
 * Micro Bidirectional Forwarding Detection (BFD) enabled/disabled state. \
 * {@link KnownMicroBfdState} can be used interchangeably with MicroBfdState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: MicroBfdState-Enabled \
 * **Disabled**: MicroBfdState-Disabled
 */
export type MicroBfdState = string;

/** Conditional Default Route Configuration properties. */
export interface ConditionalDefaultRouteProperties {
  /** List of IPv4 Routes. */
  ipv4Routes?: StaticRouteProperties[];
  /** List of IPv6 Routes. */
  ipv6Routes?: StaticRouteProperties[];
}

export function conditionalDefaultRoutePropertiesSerializer(
  item: ConditionalDefaultRouteProperties,
): any {
  return {
    ipv4Routes: !item["ipv4Routes"]
      ? item["ipv4Routes"]
      : staticRoutePropertiesArraySerializer(item["ipv4Routes"]),
    ipv6Routes: !item["ipv6Routes"]
      ? item["ipv6Routes"]
      : staticRoutePropertiesArraySerializer(item["ipv6Routes"]),
  };
}

export function conditionalDefaultRoutePropertiesDeserializer(
  item: any,
): ConditionalDefaultRouteProperties {
  return {
    ipv4Routes: !item["ipv4Routes"]
      ? item["ipv4Routes"]
      : staticRoutePropertiesArrayDeserializer(item["ipv4Routes"]),
    ipv6Routes: !item["ipv6Routes"]
      ? item["ipv6Routes"]
      : staticRoutePropertiesArrayDeserializer(item["ipv6Routes"]),
  };
}

/** The Network To Network Interconnect resource patch definition. */
export interface NetworkToNetworkInterconnectPatch {
  /** Fully qualified resource ID for the resource. E.g. '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}' */
  readonly id?: string;
  /** The type of the resource. E.g. 'Microsoft.Compute/virtualMachines' or 'Microsoft.Storage/storageAccounts' */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
  /** Resource properties. */
  properties?: NetworkToNetworkInterconnectPatchProperties;
}

export function networkToNetworkInterconnectPatchSerializer(
  item: NetworkToNetworkInterconnectPatch,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : networkToNetworkInterconnectPatchPropertiesSerializer(item["properties"]),
  };
}

/** Network Tap Rule Patch properties. */
export interface NetworkToNetworkInterconnectPatchProperties {
  /** Common properties for Layer2Configuration. */
  layer2Configuration?: Layer2ConfigurationPatch;
  /** Common properties for Layer3Configuration. */
  optionBLayer3Configuration?: OptionBLayer3ConfigurationPatchProperties;
  /** NPB Static Route Configuration properties. */
  npbStaticRouteConfiguration?: NpbStaticRouteConfigurationPatch;
  /** Static Route Configuration. */
  staticRouteConfiguration?: NniStaticRoutePatchConfiguration;
  /** Import Route Policy information. */
  importRoutePolicy?: ImportRoutePolicyInformationPatch;
  /** Export Route Policy information */
  exportRoutePolicy?: ExportRoutePolicyInformationPatch;
  /** Egress Acl. ARM resource ID of Access Control Lists. */
  egressAclId?: string;
  /** Ingress Acl. ARM resource ID of Access Control Lists. */
  ingressAclId?: string;
  /** Micro BFD enabled/disabled state. */
  microBfdState?: MicroBfdState;
}

export function networkToNetworkInterconnectPatchPropertiesSerializer(
  item: NetworkToNetworkInterconnectPatchProperties,
): any {
  return {
    layer2Configuration: !item["layer2Configuration"]
      ? item["layer2Configuration"]
      : layer2ConfigurationPatchSerializer(item["layer2Configuration"]),
    optionBLayer3Configuration: !item["optionBLayer3Configuration"]
      ? item["optionBLayer3Configuration"]
      : optionBLayer3ConfigurationPatchPropertiesSerializer(item["optionBLayer3Configuration"]),
    npbStaticRouteConfiguration: !item["npbStaticRouteConfiguration"]
      ? item["npbStaticRouteConfiguration"]
      : npbStaticRouteConfigurationPatchSerializer(item["npbStaticRouteConfiguration"]),
    staticRouteConfiguration: !item["staticRouteConfiguration"]
      ? item["staticRouteConfiguration"]
      : nniStaticRoutePatchConfigurationSerializer(item["staticRouteConfiguration"]),
    importRoutePolicy: !item["importRoutePolicy"]
      ? item["importRoutePolicy"]
      : importRoutePolicyInformationPatchSerializer(item["importRoutePolicy"]),
    exportRoutePolicy: !item["exportRoutePolicy"]
      ? item["exportRoutePolicy"]
      : exportRoutePolicyInformationPatchSerializer(item["exportRoutePolicy"]),
    egressAclId: item["egressAclId"],
    ingressAclId: item["ingressAclId"],
    microBfdState: item["microBfdState"],
  };
}

/** Common properties for Layer2 Configuration. */
export interface Layer2ConfigurationPatch {
  /** MTU of the packets between PE & CE. */
  mtu?: number;
  /** List of network device interfaces resource IDs. */
  interfaces?: string[];
}

export function layer2ConfigurationPatchSerializer(item: Layer2ConfigurationPatch): any {
  return {
    mtu: item["mtu"],
    interfaces: !item["interfaces"]
      ? item["interfaces"]
      : item["interfaces"].map((p: any) => {
          return p;
        }),
  };
}

/** Common properties for Layer3Configuration. */
export interface OptionBLayer3ConfigurationPatchProperties {
  /** IPv4 Address Prefix. */
  primaryIpv4Prefix?: string;
  /** IPv6 Address Prefix. */
  primaryIpv6Prefix?: string;
  /** Secondary IPv4 Address Prefix. */
  secondaryIpv4Prefix?: string;
  /** Secondary IPv6 Address Prefix. */
  secondaryIpv6Prefix?: string;
  /** ASN of PE devices for CE/PE connectivity.Example : 28 */
  peerASN?: number;
  /** VLAN for CE/PE Layer 3 connectivity.Example : 501 */
  vlanId?: number;
  /** ASN of CE devices for CE/PE connectivity. */
  readonly fabricASN?: number;
  /** Provider Edge (PE) Loopback IP Address. */
  peLoopbackIpAddress?: string[];
  /** BGP Monitoring Protocol (BMP) Configuration. */
  bmpConfiguration?: NniBmpPatchProperties;
  /** OptionB Layer3 prefix limit configuration. */
  prefixLimits?: OptionBLayer3PrefixLimitPatchProperties[];
}

export function optionBLayer3ConfigurationPatchPropertiesSerializer(
  item: OptionBLayer3ConfigurationPatchProperties,
): any {
  return {
    primaryIpv4Prefix: item["primaryIpv4Prefix"],
    primaryIpv6Prefix: item["primaryIpv6Prefix"],
    secondaryIpv4Prefix: item["secondaryIpv4Prefix"],
    secondaryIpv6Prefix: item["secondaryIpv6Prefix"],
    peerASN: item["peerASN"],
    vlanId: item["vlanId"],
    peLoopbackIpAddress: !item["peLoopbackIpAddress"]
      ? item["peLoopbackIpAddress"]
      : item["peLoopbackIpAddress"].map((p: any) => {
          return p;
        }),
    bmpConfiguration: !item["bmpConfiguration"]
      ? item["bmpConfiguration"]
      : nniBmpPatchPropertiesSerializer(item["bmpConfiguration"]),
    prefixLimits: !item["prefixLimits"]
      ? item["prefixLimits"]
      : optionBLayer3PrefixLimitPatchPropertiesArraySerializer(item["prefixLimits"]),
  };
}

/** BGP Monitoring Protocol (BMP) patch properties. */
export interface NniBmpPatchProperties {
  /** (BGP Monitoring Protocol (BMP) configuration state. */
  configurationState?: BmpConfigurationState;
}

export function nniBmpPatchPropertiesSerializer(item: NniBmpPatchProperties): any {
  return { configurationState: item["configurationState"] };
}

export function optionBLayer3PrefixLimitPatchPropertiesArraySerializer(
  result: Array<OptionBLayer3PrefixLimitPatchProperties>,
): any[] {
  return result.map((item) => {
    return optionBLayer3PrefixLimitPatchPropertiesSerializer(item);
  });
}

/** OptionB Layer3 prefix limit patch properties. */
export interface OptionBLayer3PrefixLimitPatchProperties {
  /** Maximum number of routes allowed. */
  maximumRoutes?: number;
}

export function optionBLayer3PrefixLimitPatchPropertiesSerializer(
  item: OptionBLayer3PrefixLimitPatchProperties,
): any {
  return { maximumRoutes: item["maximumRoutes"] };
}

/** NPB Static Route Configuration properties. */
export interface NpbStaticRouteConfigurationPatch {
  /** BFD Configuration properties. */
  bfdConfiguration?: BfdPatchConfiguration;
  /** List of IPv4 Routes. */
  ipv4Routes?: StaticRoutePatchProperties[];
  /** List of IPv6 Routes. */
  ipv6Routes?: StaticRoutePatchProperties[];
}

export function npbStaticRouteConfigurationPatchSerializer(
  item: NpbStaticRouteConfigurationPatch,
): any {
  return {
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdPatchConfigurationSerializer(item["bfdConfiguration"]),
    ipv4Routes: !item["ipv4Routes"]
      ? item["ipv4Routes"]
      : staticRoutePatchPropertiesArraySerializer(item["ipv4Routes"]),
    ipv6Routes: !item["ipv6Routes"]
      ? item["ipv6Routes"]
      : staticRoutePatchPropertiesArraySerializer(item["ipv6Routes"]),
  };
}

/** Static Route Configuration properties for NNI. */
export interface NniStaticRoutePatchConfiguration {
  /** Bidirectional Forwarding Detection (BFD) configuration properties */
  bfdConfiguration?: BfdPatchConfiguration;
  /** List of IPv4 Routes. */
  ipv4Routes?: StaticRoutePatchProperties[];
  /** List of IPv6 Routes. */
  ipv6Routes?: StaticRoutePatchProperties[];
}

export function nniStaticRoutePatchConfigurationSerializer(
  item: NniStaticRoutePatchConfiguration,
): any {
  return {
    bfdConfiguration: !item["bfdConfiguration"]
      ? item["bfdConfiguration"]
      : bfdPatchConfigurationSerializer(item["bfdConfiguration"]),
    ipv4Routes: !item["ipv4Routes"]
      ? item["ipv4Routes"]
      : staticRoutePatchPropertiesArraySerializer(item["ipv4Routes"]),
    ipv6Routes: !item["ipv6Routes"]
      ? item["ipv6Routes"]
      : staticRoutePatchPropertiesArraySerializer(item["ipv6Routes"]),
  };
}

/** Import Route Policy Configuration. */
export interface ImportRoutePolicyInformationPatch {
  /** Import IPv4 Route Policy Id. */
  importIpv4RoutePolicyId?: string;
  /** Import IPv6 Route Policy Id. */
  importIpv6RoutePolicyId?: string;
}

export function importRoutePolicyInformationPatchSerializer(
  item: ImportRoutePolicyInformationPatch,
): any {
  return {
    importIpv4RoutePolicyId: item["importIpv4RoutePolicyId"],
    importIpv6RoutePolicyId: item["importIpv6RoutePolicyId"],
  };
}

/** Export Route Policy Configuration. */
export interface ExportRoutePolicyInformationPatch {
  /** Export IPv4 Route Policy Id. */
  exportIpv4RoutePolicyId?: string;
  /** Export IPv6 Route Policy Id. */
  exportIpv6RoutePolicyId?: string;
}

export function exportRoutePolicyInformationPatchSerializer(
  item: ExportRoutePolicyInformationPatch,
): any {
  return {
    exportIpv4RoutePolicyId: item["exportIpv4RoutePolicyId"],
    exportIpv6RoutePolicyId: item["exportIpv6RoutePolicyId"],
  };
}

/** The response of a NetworkToNetworkInterconnect list operation. */
export interface _NetworkToNetworkInterconnectListResult {
  /** The NetworkToNetworkInterconnect items on this page */
  value: NetworkToNetworkInterconnect[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkToNetworkInterconnectListResultDeserializer(
  item: any,
): _NetworkToNetworkInterconnectListResult {
  return {
    value: networkToNetworkInterconnectArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkToNetworkInterconnectArraySerializer(
  result: Array<NetworkToNetworkInterconnect>,
): any[] {
  return result.map((item) => {
    return networkToNetworkInterconnectSerializer(item);
  });
}

export function networkToNetworkInterconnectArrayDeserializer(
  result: Array<NetworkToNetworkInterconnect>,
): any[] {
  return result.map((item) => {
    return networkToNetworkInterconnectDeserializer(item);
  });
}

/** NNI Bidirectional Forwarding Detection (BFD) Administrative State request. */
export interface NniBfdAdministrativeStateRequest {
  /** Route Type. Choose either Static or OptionA. */
  routeType?: RouteType;
  /** State. Select either enable or disable. */
  administrativeState?: BfdAdministrativeState;
}

export function nniBfdAdministrativeStateRequestSerializer(
  item: NniBfdAdministrativeStateRequest,
): any {
  return {
    routeType: item["routeType"],
    administrativeState: item["administrativeState"],
  };
}

/** Route type to be used. */
export enum KnownRouteType {
  /** RouteType-Static */
  Static = "Static",
  /** RouteType-OptionA */
  OptionA = "OptionA",
}

/**
 * Route type to be used. \
 * {@link KnownRouteType} can be used interchangeably with RouteType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Static**: RouteType-Static \
 * **OptionA**: RouteType-OptionA
 */
export type RouteType = string;

/** NNI Bidirectional Forwarding Detection (BFD) Administrative State response. */
export interface NniBfdAdministrativeStateResponse {
  /** Route Type. Choose either Static or OptionA. */
  routeType?: RouteType;
  /** State. Select either enable or disable. */
  administrativeState?: BfdAdministrativeState;
  /** The error object. */
  error?: ErrorDetail;
}

export function nniBfdAdministrativeStateResponseDeserializer(
  item: any,
): NniBfdAdministrativeStateResponse {
  return {
    routeType: item["routeType"],
    administrativeState: item["administrativeState"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The NetworkPacketBroker resource definition. */
export interface NetworkPacketBroker extends TrackedResource {
  /** The NetworkPacketBroker properties */
  properties: NetworkPacketBrokerProperties;
}

export function networkPacketBrokerSerializer(item: NetworkPacketBroker): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: networkPacketBrokerPropertiesSerializer(item["properties"]),
  };
}

export function networkPacketBrokerDeserializer(item: any): NetworkPacketBroker {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: networkPacketBrokerPropertiesDeserializer(item["properties"]),
  };
}

/** Network Packet Broker Properties defines the properties of the resource. */
export interface NetworkPacketBrokerProperties {
  /** ARM resource ID of the Network Fabric. */
  networkFabricId: string;
  /** List of ARM resource IDs of Network Devices [NPB]. */
  readonly networkDeviceIds?: string[];
  /** List of network interfaces across NPB devices that are used to mirror source traffic. */
  readonly sourceInterfaceIds?: string[];
  /** List of network Tap IDs configured on NPB. */
  readonly networkTapIds?: string[];
  /** List of neighbor group IDs configured on NPB. */
  readonly neighborGroupIds?: string[];
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function networkPacketBrokerPropertiesSerializer(item: NetworkPacketBrokerProperties): any {
  return { networkFabricId: item["networkFabricId"] };
}

export function networkPacketBrokerPropertiesDeserializer(
  item: any,
): NetworkPacketBrokerProperties {
  return {
    networkFabricId: item["networkFabricId"],
    networkDeviceIds: !item["networkDeviceIds"]
      ? item["networkDeviceIds"]
      : item["networkDeviceIds"].map((p: any) => {
          return p;
        }),
    sourceInterfaceIds: !item["sourceInterfaceIds"]
      ? item["sourceInterfaceIds"]
      : item["sourceInterfaceIds"].map((p: any) => {
          return p;
        }),
    networkTapIds: !item["networkTapIds"]
      ? item["networkTapIds"]
      : item["networkTapIds"].map((p: any) => {
          return p;
        }),
    neighborGroupIds: !item["neighborGroupIds"]
      ? item["neighborGroupIds"]
      : item["neighborGroupIds"].map((p: any) => {
          return p;
        }),
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    provisioningState: item["provisioningState"],
  };
}

/** The NetworkPacketBroker patch resource definition. */
export interface NetworkPacketBrokerPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function networkPacketBrokerPatchSerializer(item: NetworkPacketBrokerPatch): any {
  return { tags: item["tags"] };
}

/** The response of a NetworkPacketBroker list operation. */
export interface _NetworkPacketBrokerListResult {
  /** The NetworkPacketBroker items on this page */
  value: NetworkPacketBroker[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkPacketBrokerListResultDeserializer(
  item: any,
): _NetworkPacketBrokerListResult {
  return {
    value: networkPacketBrokerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkPacketBrokerArraySerializer(result: Array<NetworkPacketBroker>): any[] {
  return result.map((item) => {
    return networkPacketBrokerSerializer(item);
  });
}

export function networkPacketBrokerArrayDeserializer(result: Array<NetworkPacketBroker>): any[] {
  return result.map((item) => {
    return networkPacketBrokerDeserializer(item);
  });
}

/** The Network Rack resource definition. */
export interface NetworkRack extends TrackedResource {
  /** The NetworkRack properties */
  properties: NetworkRackProperties;
}

export function networkRackSerializer(item: NetworkRack): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: networkRackPropertiesSerializer(item["properties"]),
  };
}

export function networkRackDeserializer(item: any): NetworkRack {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: networkRackPropertiesDeserializer(item["properties"]),
  };
}

/** Network Rack Properties defines the properties of the resource. */
export interface NetworkRackProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** Network Rack SKU name. */
  networkRackType?: NetworkRackType;
  /** ARM resource ID of the Network Fabric. */
  networkFabricId: string;
  /** List of network device ARM resource IDs. */
  readonly networkDevices?: string[];
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function networkRackPropertiesSerializer(item: NetworkRackProperties): any {
  return {
    annotation: item["annotation"],
    networkRackType: item["networkRackType"],
    networkFabricId: item["networkFabricId"],
  };
}

export function networkRackPropertiesDeserializer(item: any): NetworkRackProperties {
  return {
    annotation: item["annotation"],
    networkRackType: item["networkRackType"],
    networkFabricId: item["networkFabricId"],
    networkDevices: !item["networkDevices"]
      ? item["networkDevices"]
      : item["networkDevices"].map((p: any) => {
          return p;
        }),
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    provisioningState: item["provisioningState"],
  };
}

/** Network Rack SKU name. */
export enum KnownNetworkRackType {
  /** NetworkRackType-Aggregate */
  Aggregate = "Aggregate",
  /** NetworkRackType-Compute */
  Compute = "Compute",
  /** NetworkRackType-Combined */
  Combined = "Combined",
}

/**
 * Network Rack SKU name. \
 * {@link KnownNetworkRackType} can be used interchangeably with NetworkRackType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Aggregate**: NetworkRackType-Aggregate \
 * **Compute**: NetworkRackType-Compute \
 * **Combined**: NetworkRackType-Combined
 */
export type NetworkRackType = string;

/** Network Rack patch resource definition. */
export interface NetworkRackPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function networkRackPatchSerializer(item: NetworkRackPatch): any {
  return { tags: item["tags"] };
}

/** The response of a NetworkRack list operation. */
export interface _NetworkRackListResult {
  /** The NetworkRack items on this page */
  value: NetworkRack[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkRackListResultDeserializer(item: any): _NetworkRackListResult {
  return {
    value: networkRackArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkRackArraySerializer(result: Array<NetworkRack>): any[] {
  return result.map((item) => {
    return networkRackSerializer(item);
  });
}

export function networkRackArrayDeserializer(result: Array<NetworkRack>): any[] {
  return result.map((item) => {
    return networkRackDeserializer(item);
  });
}

/** The NetworkTapRule resource definition. */
export interface NetworkTapRule extends TrackedResource {
  /** The NetworkTapRule Properties */
  properties: NetworkTapRuleProperties;
}

export function networkTapRuleSerializer(item: NetworkTapRule): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: networkTapRulePropertiesSerializer(item["properties"]),
  };
}

export function networkTapRuleDeserializer(item: any): NetworkTapRule {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: networkTapRulePropertiesDeserializer(item["properties"]),
  };
}

/** Network Tap Rule Properties defines the resource properties. */
export interface NetworkTapRuleProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** Input method to configure Network Tap Rule. */
  configurationType: ConfigurationType;
  /** Network Tap Rules file URL. */
  tapRulesUrl?: string;
  /** List of match configurations. */
  matchConfigurations?: NetworkTapRuleMatchConfiguration[];
  /** List of dynamic match configurations. */
  dynamicMatchConfigurations?: CommonDynamicMatchConfiguration[];
  /** The ARM resource Id of the NetworkTap. */
  readonly networkTapId?: string;
  /** Polling interval in seconds. */
  pollingIntervalInSeconds?: PollingIntervalInSeconds;
  /** The last sync timestamp. */
  readonly lastSyncedTime?: Date;
  /** Global network tap rule actions */
  globalNetworkTapRuleActions?: GlobalNetworkTapRuleActionProperties;
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Configuration state of the resource. */
  readonly configurationState?: ConfigurationState;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Administrative state of the resource. */
  readonly administrativeState?: AdministrativeState;
}

export function networkTapRulePropertiesSerializer(item: NetworkTapRuleProperties): any {
  return {
    annotation: item["annotation"],
    configurationType: item["configurationType"],
    tapRulesUrl: item["tapRulesUrl"],
    matchConfigurations: !item["matchConfigurations"]
      ? item["matchConfigurations"]
      : networkTapRuleMatchConfigurationArraySerializer(item["matchConfigurations"]),
    dynamicMatchConfigurations: !item["dynamicMatchConfigurations"]
      ? item["dynamicMatchConfigurations"]
      : commonDynamicMatchConfigurationArraySerializer(item["dynamicMatchConfigurations"]),
    pollingIntervalInSeconds: item["pollingIntervalInSeconds"],
    globalNetworkTapRuleActions: !item["globalNetworkTapRuleActions"]
      ? item["globalNetworkTapRuleActions"]
      : globalNetworkTapRuleActionPropertiesSerializer(item["globalNetworkTapRuleActions"]),
  };
}

export function networkTapRulePropertiesDeserializer(item: any): NetworkTapRuleProperties {
  return {
    annotation: item["annotation"],
    configurationType: item["configurationType"],
    tapRulesUrl: item["tapRulesUrl"],
    matchConfigurations: !item["matchConfigurations"]
      ? item["matchConfigurations"]
      : networkTapRuleMatchConfigurationArrayDeserializer(item["matchConfigurations"]),
    dynamicMatchConfigurations: !item["dynamicMatchConfigurations"]
      ? item["dynamicMatchConfigurations"]
      : commonDynamicMatchConfigurationArrayDeserializer(item["dynamicMatchConfigurations"]),
    networkTapId: item["networkTapId"],
    pollingIntervalInSeconds: item["pollingIntervalInSeconds"],
    lastSyncedTime: !item["lastSyncedTime"]
      ? item["lastSyncedTime"]
      : new Date(item["lastSyncedTime"]),
    globalNetworkTapRuleActions: !item["globalNetworkTapRuleActions"]
      ? item["globalNetworkTapRuleActions"]
      : globalNetworkTapRuleActionPropertiesDeserializer(item["globalNetworkTapRuleActions"]),
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    configurationState: item["configurationState"],
    provisioningState: item["provisioningState"],
    administrativeState: item["administrativeState"],
  };
}

export function networkTapRuleMatchConfigurationArraySerializer(
  result: Array<NetworkTapRuleMatchConfiguration>,
): any[] {
  return result.map((item) => {
    return networkTapRuleMatchConfigurationSerializer(item);
  });
}

export function networkTapRuleMatchConfigurationArrayDeserializer(
  result: Array<NetworkTapRuleMatchConfiguration>,
): any[] {
  return result.map((item) => {
    return networkTapRuleMatchConfigurationDeserializer(item);
  });
}

/** Defines the match configuration that are supported to filter the traffic. */
export interface NetworkTapRuleMatchConfiguration {
  /** The name of the match configuration. */
  matchConfigurationName?: string;
  /** Sequence Number of the match configuration.. */
  sequenceNumber?: number;
  /** Type of IP Address. IPv4 or IPv6 */
  ipAddressType?: IPAddressType;
  /** List of the match conditions. */
  matchConditions?: NetworkTapRuleMatchCondition[];
  /** List of actions that need to be performed for the matched conditions. */
  actions?: NetworkTapRuleAction[];
}

export function networkTapRuleMatchConfigurationSerializer(
  item: NetworkTapRuleMatchConfiguration,
): any {
  return {
    matchConfigurationName: item["matchConfigurationName"],
    sequenceNumber: item["sequenceNumber"],
    ipAddressType: item["ipAddressType"],
    matchConditions: !item["matchConditions"]
      ? item["matchConditions"]
      : networkTapRuleMatchConditionArraySerializer(item["matchConditions"]),
    actions: !item["actions"]
      ? item["actions"]
      : networkTapRuleActionArraySerializer(item["actions"]),
  };
}

export function networkTapRuleMatchConfigurationDeserializer(
  item: any,
): NetworkTapRuleMatchConfiguration {
  return {
    matchConfigurationName: item["matchConfigurationName"],
    sequenceNumber: item["sequenceNumber"],
    ipAddressType: item["ipAddressType"],
    matchConditions: !item["matchConditions"]
      ? item["matchConditions"]
      : networkTapRuleMatchConditionArrayDeserializer(item["matchConditions"]),
    actions: !item["actions"]
      ? item["actions"]
      : networkTapRuleActionArrayDeserializer(item["actions"]),
  };
}

export function networkTapRuleMatchConditionArraySerializer(
  result: Array<NetworkTapRuleMatchCondition>,
): any[] {
  return result.map((item) => {
    return networkTapRuleMatchConditionSerializer(item);
  });
}

export function networkTapRuleMatchConditionArrayDeserializer(
  result: Array<NetworkTapRuleMatchCondition>,
): any[] {
  return result.map((item) => {
    return networkTapRuleMatchConditionDeserializer(item);
  });
}

/** Defines the match condition that is supported to filter the traffic. */
export interface NetworkTapRuleMatchCondition {
  /** List of the protocols that need to be matched. */
  protocolTypes?: string[];
  /** Vlan match condition that needs to be matched. */
  vlanMatchCondition?: VlanMatchCondition;
  /** IP condition that needs to be matched. */
  ipCondition?: IpMatchCondition;
  /** Encapsulation Type that needs to be matched. */
  encapsulationType?: EncapsulationType;
  /** Defines the port condition that needs to be matched. */
  portCondition?: PortCondition;
}

export function networkTapRuleMatchConditionSerializer(item: NetworkTapRuleMatchCondition): any {
  return {
    protocolTypes: !item["protocolTypes"]
      ? item["protocolTypes"]
      : item["protocolTypes"].map((p: any) => {
          return p;
        }),
    vlanMatchCondition: !item["vlanMatchCondition"]
      ? item["vlanMatchCondition"]
      : vlanMatchConditionSerializer(item["vlanMatchCondition"]),
    ipCondition: !item["ipCondition"]
      ? item["ipCondition"]
      : ipMatchConditionSerializer(item["ipCondition"]),
    encapsulationType: item["encapsulationType"],
    portCondition: !item["portCondition"]
      ? item["portCondition"]
      : portConditionSerializer(item["portCondition"]),
  };
}

export function networkTapRuleMatchConditionDeserializer(item: any): NetworkTapRuleMatchCondition {
  return {
    protocolTypes: !item["protocolTypes"]
      ? item["protocolTypes"]
      : item["protocolTypes"].map((p: any) => {
          return p;
        }),
    vlanMatchCondition: !item["vlanMatchCondition"]
      ? item["vlanMatchCondition"]
      : vlanMatchConditionDeserializer(item["vlanMatchCondition"]),
    ipCondition: !item["ipCondition"]
      ? item["ipCondition"]
      : ipMatchConditionDeserializer(item["ipCondition"]),
    encapsulationType: item["encapsulationType"],
    portCondition: !item["portCondition"]
      ? item["portCondition"]
      : portConditionDeserializer(item["portCondition"]),
  };
}

/** Encapsulation Type that needs to be matched. */
export enum KnownEncapsulationType {
  /** None EncapsulationType */
  None = "None",
  /** GTPv1 EncapsulationType */
  GTPv1 = "GTPv1",
}

/**
 * Encapsulation Type that needs to be matched. \
 * {@link KnownEncapsulationType} can be used interchangeably with EncapsulationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None EncapsulationType \
 * **GTPv1**: GTPv1 EncapsulationType
 */
export type EncapsulationType = string;

/** Port condition that needs to be matched. */
export interface PortCondition {
  /** Port type that needs to be matched. */
  portType?: PortType;
  /** Layer4 protocol type that needs to be matched. */
  layer4Protocol: Layer4Protocol;
  /** List of the Ports that need to be matched. */
  ports?: string[];
  /** List of the port Group Names that need to be matched. */
  portGroupNames?: string[];
}

export function portConditionSerializer(item: PortCondition): any {
  return {
    portType: item["portType"],
    layer4Protocol: item["layer4Protocol"],
    ports: !item["ports"]
      ? item["ports"]
      : item["ports"].map((p: any) => {
          return p;
        }),
    portGroupNames: !item["portGroupNames"]
      ? item["portGroupNames"]
      : item["portGroupNames"].map((p: any) => {
          return p;
        }),
  };
}

export function portConditionDeserializer(item: any): PortCondition {
  return {
    portType: item["portType"],
    layer4Protocol: item["layer4Protocol"],
    ports: !item["ports"]
      ? item["ports"]
      : item["ports"].map((p: any) => {
          return p;
        }),
    portGroupNames: !item["portGroupNames"]
      ? item["portGroupNames"]
      : item["portGroupNames"].map((p: any) => {
          return p;
        }),
  };
}

export function networkTapRuleActionArraySerializer(result: Array<NetworkTapRuleAction>): any[] {
  return result.map((item) => {
    return networkTapRuleActionSerializer(item);
  });
}

export function networkTapRuleActionArrayDeserializer(result: Array<NetworkTapRuleAction>): any[] {
  return result.map((item) => {
    return networkTapRuleActionDeserializer(item);
  });
}

/** Action that need to performed. */
export interface NetworkTapRuleAction {
  /** Type of actions that can be performed. */
  type?: TapRuleActionType;
  /** Truncate. 0 indicates do not truncate. */
  truncate?: string;
  /** The parameter to enable or disable the timestamp. */
  isTimestampEnabled?: BooleanEnumProperty;
  /** Destination Id. The ARM resource Id may be either Network To Network Interconnect or NeighborGroup. */
  destinationId?: string;
  /** The name of the match configuration. This is used when Goto type is provided. */
  matchConfigurationName?: string;
}

export function networkTapRuleActionSerializer(item: NetworkTapRuleAction): any {
  return {
    type: item["type"],
    truncate: item["truncate"],
    isTimestampEnabled: item["isTimestampEnabled"],
    destinationId: item["destinationId"],
    matchConfigurationName: item["matchConfigurationName"],
  };
}

export function networkTapRuleActionDeserializer(item: any): NetworkTapRuleAction {
  return {
    type: item["type"],
    truncate: item["truncate"],
    isTimestampEnabled: item["isTimestampEnabled"],
    destinationId: item["destinationId"],
    matchConfigurationName: item["matchConfigurationName"],
  };
}

/** Type of actions that can be performed. */
export enum KnownTapRuleActionType {
  /** TapRuleActionType-Drop */
  Drop = "Drop",
  /** TapRuleActionType-Count */
  Count = "Count",
  /** TapRuleActionType-Log */
  Log = "Log",
  /** TapRuleActionType-Replicate */
  Replicate = "Replicate",
  /** TapRuleActionType-Goto */
  Goto = "Goto",
  /** TapRuleActionType-Redirect */
  Redirect = "Redirect",
  /** TapRuleActionType-Mirror */
  Mirror = "Mirror",
}

/**
 * Type of actions that can be performed. \
 * {@link KnownTapRuleActionType} can be used interchangeably with TapRuleActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Drop**: TapRuleActionType-Drop \
 * **Count**: TapRuleActionType-Count \
 * **Log**: TapRuleActionType-Log \
 * **Replicate**: TapRuleActionType-Replicate \
 * **Goto**: TapRuleActionType-Goto \
 * **Redirect**: TapRuleActionType-Redirect \
 * **Mirror**: TapRuleActionType-Mirror
 */
export type TapRuleActionType = string;

/** Polling interval in seconds. */
export enum KnownPollingIntervalInSeconds {
  /** 30 PollingIntervalInSeconds */
  Thirty = 30,
  /** 60 PollingIntervalInSeconds */
  Sixty = 60,
  /** 90 PollingIntervalInSeconds */
  Ninety = 90,
  /** 120 PollingIntervalInSeconds */
  OneTwenty = 120,
}

/**
 * Polling interval in seconds. \
 * {@link KnownPollingIntervalInSeconds} can be used interchangeably with PollingIntervalInSeconds,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **30**: 30 PollingIntervalInSeconds \
 * **60**: 60 PollingIntervalInSeconds \
 * **90**: 90 PollingIntervalInSeconds \
 * **120**: 120 PollingIntervalInSeconds
 */
export type PollingIntervalInSeconds = number;

/** Global network tap rule actions properties */
export interface GlobalNetworkTapRuleActionProperties {
  /** Configuration to enable network tap rule counter. */
  enableCount?: BooleanEnumProperty;
  /** Truncate. 0 indicates do not truncate. */
  truncate?: string;
}

export function globalNetworkTapRuleActionPropertiesSerializer(
  item: GlobalNetworkTapRuleActionProperties,
): any {
  return { enableCount: item["enableCount"], truncate: item["truncate"] };
}

export function globalNetworkTapRuleActionPropertiesDeserializer(
  item: any,
): GlobalNetworkTapRuleActionProperties {
  return {
    enableCount: item["enableCount"],
    truncate: item["truncate"],
  };
}

/** The NetworkTapRule resource definition. */
export interface NetworkTapRulePatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Network Tap Rule Patch properties. */
  properties?: NetworkTapRulePatchProperties;
}

export function networkTapRulePatchSerializer(item: NetworkTapRulePatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : networkTapRulePatchPropertiesSerializer(item["properties"]),
  };
}

/** Network Tap Rule Patch properties. */
export interface NetworkTapRulePatchProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** Input method to configure Network Tap Rule. */
  configurationType?: ConfigurationType;
  /** Network Tap Rules file URL. */
  tapRulesUrl?: string;
  /** Global network tap rule actions */
  globalNetworkTapRuleActions?: GlobalNetworkTapRuleActionPatchProperties;
  /** List of match configurations. */
  matchConfigurations?: NetworkTapRuleMatchConfigurationPatch[];
  /** List of dynamic match configurations. */
  dynamicMatchConfigurations?: CommonDynamicMatchConfigurationPatch[];
}

export function networkTapRulePatchPropertiesSerializer(item: NetworkTapRulePatchProperties): any {
  return {
    annotation: item["annotation"],
    configurationType: item["configurationType"],
    tapRulesUrl: item["tapRulesUrl"],
    globalNetworkTapRuleActions: !item["globalNetworkTapRuleActions"]
      ? item["globalNetworkTapRuleActions"]
      : globalNetworkTapRuleActionPatchPropertiesSerializer(item["globalNetworkTapRuleActions"]),
    matchConfigurations: !item["matchConfigurations"]
      ? item["matchConfigurations"]
      : networkTapRuleMatchConfigurationPatchArraySerializer(item["matchConfigurations"]),
    dynamicMatchConfigurations: !item["dynamicMatchConfigurations"]
      ? item["dynamicMatchConfigurations"]
      : commonDynamicMatchConfigurationPatchArraySerializer(item["dynamicMatchConfigurations"]),
  };
}

/** Global network tap rule actions patch properties */
export interface GlobalNetworkTapRuleActionPatchProperties {
  /** Configuration to enable network tap rule counter. */
  enableCount?: BooleanEnumProperty;
  /** Truncate. 0 indicates do not truncate. */
  truncate?: string;
}

export function globalNetworkTapRuleActionPatchPropertiesSerializer(
  item: GlobalNetworkTapRuleActionPatchProperties,
): any {
  return { enableCount: item["enableCount"], truncate: item["truncate"] };
}

export function networkTapRuleMatchConfigurationPatchArraySerializer(
  result: Array<NetworkTapRuleMatchConfigurationPatch>,
): any[] {
  return result.map((item) => {
    return networkTapRuleMatchConfigurationPatchSerializer(item);
  });
}

/** Defines the match configuration that are supported to filter the traffic. */
export interface NetworkTapRuleMatchConfigurationPatch {
  /** The name of the match configuration. */
  matchConfigurationName?: string;
  /** Sequence Number of the match configuration.. */
  sequenceNumber?: number;
  /** Type of IP Address. IPv4 or IPv6 */
  ipAddressType?: IPAddressType;
  /** List of the match conditions. */
  matchConditions?: NetworkTapRuleMatchConditionPatch[];
  /** List of actions that need to be performed for the matched conditions. */
  actions?: NetworkTapRuleActionPatch[];
}

export function networkTapRuleMatchConfigurationPatchSerializer(
  item: NetworkTapRuleMatchConfigurationPatch,
): any {
  return {
    matchConfigurationName: item["matchConfigurationName"],
    sequenceNumber: item["sequenceNumber"],
    ipAddressType: item["ipAddressType"],
    matchConditions: !item["matchConditions"]
      ? item["matchConditions"]
      : networkTapRuleMatchConditionPatchArraySerializer(item["matchConditions"]),
    actions: !item["actions"]
      ? item["actions"]
      : networkTapRuleActionPatchArraySerializer(item["actions"]),
  };
}

export function networkTapRuleMatchConditionPatchArraySerializer(
  result: Array<NetworkTapRuleMatchConditionPatch>,
): any[] {
  return result.map((item) => {
    return networkTapRuleMatchConditionPatchSerializer(item);
  });
}

/** Defines the match condition that is supported to filter the traffic. */
export interface NetworkTapRuleMatchConditionPatch {
  /** List of the protocols that need to be matched. */
  protocolTypes?: string[];
  /** Vlan match condition that needs to be matched. */
  vlanMatchCondition?: VlanMatchConditionPatch;
  /** IP condition that needs to be matched. */
  ipCondition?: IpMatchConditionPatch;
  /** Encapsulation Type that needs to be matched. */
  encapsulationType?: EncapsulationType;
  /** Defines the port condition that needs to be matched. */
  portCondition?: PortConditionPatch;
}

export function networkTapRuleMatchConditionPatchSerializer(
  item: NetworkTapRuleMatchConditionPatch,
): any {
  return {
    protocolTypes: !item["protocolTypes"]
      ? item["protocolTypes"]
      : item["protocolTypes"].map((p: any) => {
          return p;
        }),
    vlanMatchCondition: !item["vlanMatchCondition"]
      ? item["vlanMatchCondition"]
      : vlanMatchConditionPatchSerializer(item["vlanMatchCondition"]),
    ipCondition: !item["ipCondition"]
      ? item["ipCondition"]
      : ipMatchConditionPatchSerializer(item["ipCondition"]),
    encapsulationType: item["encapsulationType"],
    portCondition: !item["portCondition"]
      ? item["portCondition"]
      : portConditionPatchSerializer(item["portCondition"]),
  };
}

/** Port condition that needs to be matched. */
export interface PortConditionPatch {
  /** Port type that needs to be matched. */
  portType?: PortType;
  /** Layer4 protocol type that needs to be matched. */
  layer4Protocol?: Layer4Protocol;
  /** List of the Ports that need to be matched. */
  ports?: string[];
  /** List of the port Group Names that need to be matched. */
  portGroupNames?: string[];
}

export function portConditionPatchSerializer(item: PortConditionPatch): any {
  return {
    portType: item["portType"],
    layer4Protocol: item["layer4Protocol"],
    ports: !item["ports"]
      ? item["ports"]
      : item["ports"].map((p: any) => {
          return p;
        }),
    portGroupNames: !item["portGroupNames"]
      ? item["portGroupNames"]
      : item["portGroupNames"].map((p: any) => {
          return p;
        }),
  };
}

export function networkTapRuleActionPatchArraySerializer(
  result: Array<NetworkTapRuleActionPatch>,
): any[] {
  return result.map((item) => {
    return networkTapRuleActionPatchSerializer(item);
  });
}

/** Action that need to performed. */
export interface NetworkTapRuleActionPatch {
  /** Type of actions that can be performed. */
  type?: TapRuleActionType;
  /** Truncate. 0 indicates do not truncate. */
  truncate?: string;
  /** The parameter to enable or disable the timestamp. */
  isTimestampEnabled?: BooleanEnumProperty;
  /** Destination Id. The ARM resource Id may be either Network To Network Interconnect or NeighborGroup. */
  destinationId?: string;
  /** The name of the match configuration. This is used when Goto type is provided. */
  matchConfigurationName?: string;
}

export function networkTapRuleActionPatchSerializer(item: NetworkTapRuleActionPatch): any {
  return {
    type: item["type"],
    truncate: item["truncate"],
    isTimestampEnabled: item["isTimestampEnabled"],
    destinationId: item["destinationId"],
    matchConfigurationName: item["matchConfigurationName"],
  };
}

/** The response of a NetworkTapRule list operation. */
export interface _NetworkTapRuleListResult {
  /** The NetworkTapRule items on this page */
  value: NetworkTapRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkTapRuleListResultDeserializer(item: any): _NetworkTapRuleListResult {
  return {
    value: networkTapRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkTapRuleArraySerializer(result: Array<NetworkTapRule>): any[] {
  return result.map((item) => {
    return networkTapRuleSerializer(item);
  });
}

export function networkTapRuleArrayDeserializer(result: Array<NetworkTapRule>): any[] {
  return result.map((item) => {
    return networkTapRuleDeserializer(item);
  });
}

/** The Network Tap resource definition. */
export interface NetworkTap extends TrackedResource {
  /** The NetworkTap Properties */
  properties: NetworkTapProperties;
}

export function networkTapSerializer(item: NetworkTap): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: networkTapPropertiesSerializer(item["properties"]),
  };
}

export function networkTapDeserializer(item: any): NetworkTap {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: networkTapPropertiesDeserializer(item["properties"]),
  };
}

/** Network Tap Properties defines the properties of the resource. */
export interface NetworkTapProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** ARM resource ID of the Network Packet Broker. */
  networkPacketBrokerId: string;
  /** Source Tap Rule Id. ARM Resource ID of the Network Tap Rule. */
  readonly sourceTapRuleId?: string;
  /** List of destinations to send the filter traffic. */
  destinations: DestinationProperties[];
  /** Polling type. */
  pollingType?: PollingType;
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Gets the configurations state of the resource. */
  readonly configurationState?: ConfigurationState;
  /** Provides you the latest status of the NFC service, whether it is Accepted, updating, Succeeded or Failed. During this process, the states keep changing based on the status of Network Tap provisioning. */
  readonly provisioningState?: ProvisioningState;
  /** Administrative state of the resource. Example -Enabled/Disabled */
  readonly administrativeState?: AdministrativeState;
}

export function networkTapPropertiesSerializer(item: NetworkTapProperties): any {
  return {
    annotation: item["annotation"],
    networkPacketBrokerId: item["networkPacketBrokerId"],
    destinations: destinationPropertiesArraySerializer(item["destinations"]),
    pollingType: item["pollingType"],
  };
}

export function networkTapPropertiesDeserializer(item: any): NetworkTapProperties {
  return {
    annotation: item["annotation"],
    networkPacketBrokerId: item["networkPacketBrokerId"],
    sourceTapRuleId: item["sourceTapRuleId"],
    destinations: destinationPropertiesArrayDeserializer(item["destinations"]),
    pollingType: item["pollingType"],
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    configurationState: item["configurationState"],
    provisioningState: item["provisioningState"],
    administrativeState: item["administrativeState"],
  };
}

export function destinationPropertiesArraySerializer(result: Array<DestinationProperties>): any[] {
  return result.map((item) => {
    return destinationPropertiesSerializer(item);
  });
}

export function destinationPropertiesArrayDeserializer(
  result: Array<DestinationProperties>,
): any[] {
  return result.map((item) => {
    return destinationPropertiesDeserializer(item);
  });
}

/** The network tap destination properties. */
export interface DestinationProperties {
  /** Destination name. */
  name: string;
  /** Type of destination. Input can be IsolationDomain or Direct. */
  destinationType: DestinationType;
  /** The destination Id. ARM Resource ID of either NNI or Internal Networks. */
  destinationId: string;
  /** Isolation Domain Properties. */
  isolationDomainProperties?: IsolationDomainProperties;
  /** ARM Resource ID of destination Tap Rule that contains match configurations. */
  destinationTapRuleId?: string;
}

export function destinationPropertiesSerializer(item: DestinationProperties): any {
  return {
    name: item["name"],
    destinationType: item["destinationType"],
    destinationId: item["destinationId"],
    isolationDomainProperties: !item["isolationDomainProperties"]
      ? item["isolationDomainProperties"]
      : isolationDomainPropertiesSerializer(item["isolationDomainProperties"]),
    destinationTapRuleId: item["destinationTapRuleId"],
  };
}

export function destinationPropertiesDeserializer(item: any): DestinationProperties {
  return {
    name: item["name"],
    destinationType: item["destinationType"],
    destinationId: item["destinationId"],
    isolationDomainProperties: !item["isolationDomainProperties"]
      ? item["isolationDomainProperties"]
      : isolationDomainPropertiesDeserializer(item["isolationDomainProperties"]),
    destinationTapRuleId: item["destinationTapRuleId"],
  };
}

/** Type of destination. Input can be IsolationDomain or Direct. */
export enum KnownDestinationType {
  /** DestinationType-IsolationDomain */
  IsolationDomain = "IsolationDomain",
  /** DestinationType-Direct */
  Direct = "Direct",
}

/**
 * Type of destination. Input can be IsolationDomain or Direct. \
 * {@link KnownDestinationType} can be used interchangeably with DestinationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IsolationDomain**: DestinationType-IsolationDomain \
 * **Direct**: DestinationType-Direct
 */
export type DestinationType = string;

/** Isolation Domain Properties. */
export interface IsolationDomainProperties {
  /** Type of encapsulation. */
  encapsulation?: Encapsulation;
  /** List of Neighbor Group IDs. */
  neighborGroupIds?: string[];
}

export function isolationDomainPropertiesSerializer(item: IsolationDomainProperties): any {
  return {
    encapsulation: item["encapsulation"],
    neighborGroupIds: !item["neighborGroupIds"]
      ? item["neighborGroupIds"]
      : item["neighborGroupIds"].map((p: any) => {
          return p;
        }),
  };
}

export function isolationDomainPropertiesDeserializer(item: any): IsolationDomainProperties {
  return {
    encapsulation: item["encapsulation"],
    neighborGroupIds: !item["neighborGroupIds"]
      ? item["neighborGroupIds"]
      : item["neighborGroupIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Type of encapsulation. */
export enum KnownEncapsulation {
  /** Encapsulation-None */
  None = "None",
  /** Encapsulation-GRE */
  GRE = "GRE",
}

/**
 * Type of encapsulation. \
 * {@link KnownEncapsulation} can be used interchangeably with Encapsulation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Encapsulation-None \
 * **GRE**: Encapsulation-GRE
 */
export type Encapsulation = string;

/** Polling type. */
export enum KnownPollingType {
  /** PollingType-Pull */
  Pull = "Pull",
  /** PollingType-Push */
  Push = "Push",
}

/**
 * Polling type. \
 * {@link KnownPollingType} can be used interchangeably with PollingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pull**: PollingType-Pull \
 * **Push**: PollingType-Push
 */
export type PollingType = string;

/** The NetworkFabric resource definition. */
export interface NetworkTapPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Resource properties. */
  properties?: NetworkTapPatchProperties;
}

export function networkTapPatchSerializer(item: NetworkTapPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : networkTapPatchPropertiesSerializer(item["properties"]),
  };
}

/** The Network Tap resource patch definition. */
export interface NetworkTapPatchProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** Polling type. */
  pollingType?: PollingType;
  /** List of destination properties to send the filter traffic. */
  destinations?: DestinationPatchProperties[];
}

export function networkTapPatchPropertiesSerializer(item: NetworkTapPatchProperties): any {
  return {
    annotation: item["annotation"],
    pollingType: item["pollingType"],
    destinations: !item["destinations"]
      ? item["destinations"]
      : destinationPatchPropertiesArraySerializer(item["destinations"]),
  };
}

export function destinationPatchPropertiesArraySerializer(
  result: Array<DestinationPatchProperties>,
): any[] {
  return result.map((item) => {
    return destinationPatchPropertiesSerializer(item);
  });
}

/** The network tap destination properties. */
export interface DestinationPatchProperties {
  /** Destination name. */
  name?: string;
  /** Type of destination. Input can be IsolationDomain or Direct. */
  destinationType?: DestinationType;
  /** The destination Id. ARM Resource ID of either NNI or Internal Networks. */
  destinationId?: string;
  /** Isolation Domain Properties. */
  isolationDomainProperties?: IsolationDomainPatchProperties;
  /** ARM Resource ID of destination Tap Rule that contains match configurations. */
  destinationTapRuleId?: string;
}

export function destinationPatchPropertiesSerializer(item: DestinationPatchProperties): any {
  return {
    name: item["name"],
    destinationType: item["destinationType"],
    destinationId: item["destinationId"],
    isolationDomainProperties: !item["isolationDomainProperties"]
      ? item["isolationDomainProperties"]
      : isolationDomainPatchPropertiesSerializer(item["isolationDomainProperties"]),
    destinationTapRuleId: item["destinationTapRuleId"],
  };
}

/** Isolation Domain Properties. */
export interface IsolationDomainPatchProperties {
  /** Type of encapsulation. */
  encapsulation?: Encapsulation;
  /** List of Neighbor Group IDs. */
  neighborGroupIds?: string[];
}

export function isolationDomainPatchPropertiesSerializer(
  item: IsolationDomainPatchProperties,
): any {
  return {
    encapsulation: item["encapsulation"],
    neighborGroupIds: !item["neighborGroupIds"]
      ? item["neighborGroupIds"]
      : item["neighborGroupIds"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a NetworkTap list operation. */
export interface _NetworkTapListResult {
  /** The NetworkTap items on this page */
  value: NetworkTap[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkTapListResultDeserializer(item: any): _NetworkTapListResult {
  return {
    value: networkTapArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkTapArraySerializer(result: Array<NetworkTap>): any[] {
  return result.map((item) => {
    return networkTapSerializer(item);
  });
}

export function networkTapArrayDeserializer(result: Array<NetworkTap>): any[] {
  return result.map((item) => {
    return networkTapDeserializer(item);
  });
}

/** The RoutePolicy resource definition. */
export interface RoutePolicy extends TrackedResource {
  /** The RoutePolicy properties */
  properties: RoutePolicyProperties;
}

export function routePolicySerializer(item: RoutePolicy): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: routePolicyPropertiesSerializer(item["properties"]),
  };
}

export function routePolicyDeserializer(item: any): RoutePolicy {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: routePolicyPropertiesDeserializer(item["properties"]),
  };
}

/** RoutePolicyProperties defines the resource properties. */
export interface RoutePolicyProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** Default action that needs to be applied when no condition is matched. Example: Permit | Deny. */
  defaultAction?: CommunityActionTypes;
  /** Route Policy statements. */
  statements: RoutePolicyStatementProperties[];
  /** Arm Resource ID of Network Fabric. */
  networkFabricId: string;
  /** AddressFamilyType. This parameter decides whether the given ipv4 or ipv6 route policy. */
  addressFamilyType?: AddressFamilyType;
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Configuration state of the resource. */
  readonly configurationState?: ConfigurationState;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Administrative state of the resource. */
  readonly administrativeState?: AdministrativeState;
}

export function routePolicyPropertiesSerializer(item: RoutePolicyProperties): any {
  return {
    annotation: item["annotation"],
    defaultAction: item["defaultAction"],
    statements: routePolicyStatementPropertiesArraySerializer(item["statements"]),
    networkFabricId: item["networkFabricId"],
    addressFamilyType: item["addressFamilyType"],
  };
}

export function routePolicyPropertiesDeserializer(item: any): RoutePolicyProperties {
  return {
    annotation: item["annotation"],
    defaultAction: item["defaultAction"],
    statements: routePolicyStatementPropertiesArrayDeserializer(item["statements"]),
    networkFabricId: item["networkFabricId"],
    addressFamilyType: item["addressFamilyType"],
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    configurationState: item["configurationState"],
    provisioningState: item["provisioningState"],
    administrativeState: item["administrativeState"],
  };
}

export function routePolicyStatementPropertiesArraySerializer(
  result: Array<RoutePolicyStatementProperties>,
): any[] {
  return result.map((item) => {
    return routePolicyStatementPropertiesSerializer(item);
  });
}

export function routePolicyStatementPropertiesArrayDeserializer(
  result: Array<RoutePolicyStatementProperties>,
): any[] {
  return result.map((item) => {
    return routePolicyStatementPropertiesDeserializer(item);
  });
}

/** Route Policy Statement properties. */
export interface RoutePolicyStatementProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** Sequence to insert to/delete from existing route. */
  sequenceNumber: number;
  /** Route policy condition properties. */
  condition: StatementConditionProperties;
  /** Route policy action properties. */
  action: StatementActionProperties;
}

export function routePolicyStatementPropertiesSerializer(
  item: RoutePolicyStatementProperties,
): any {
  return {
    annotation: item["annotation"],
    sequenceNumber: item["sequenceNumber"],
    condition: statementConditionPropertiesSerializer(item["condition"]),
    action: statementActionPropertiesSerializer(item["action"]),
  };
}

export function routePolicyStatementPropertiesDeserializer(
  item: any,
): RoutePolicyStatementProperties {
  return {
    annotation: item["annotation"],
    sequenceNumber: item["sequenceNumber"],
    condition: statementConditionPropertiesDeserializer(item["condition"]),
    action: statementActionPropertiesDeserializer(item["action"]),
  };
}

/** Route policy statement condition properties. */
export interface StatementConditionProperties {
  /** List of IP Community resource IDs. */
  ipCommunityIds?: string[];
  /** List of IP Extended Community resource IDs. */
  ipExtendedCommunityIds?: string[];
  /** Type of the condition used. */
  type?: RoutePolicyConditionType;
  /** Arm Resource Id of IpPrefix. */
  ipPrefixId?: string;
}

export function statementConditionPropertiesSerializer(item: StatementConditionProperties): any {
  return {
    ipCommunityIds: !item["ipCommunityIds"]
      ? item["ipCommunityIds"]
      : item["ipCommunityIds"].map((p: any) => {
          return p;
        }),
    ipExtendedCommunityIds: !item["ipExtendedCommunityIds"]
      ? item["ipExtendedCommunityIds"]
      : item["ipExtendedCommunityIds"].map((p: any) => {
          return p;
        }),
    type: item["type"],
    ipPrefixId: item["ipPrefixId"],
  };
}

export function statementConditionPropertiesDeserializer(item: any): StatementConditionProperties {
  return {
    ipCommunityIds: !item["ipCommunityIds"]
      ? item["ipCommunityIds"]
      : item["ipCommunityIds"].map((p: any) => {
          return p;
        }),
    ipExtendedCommunityIds: !item["ipExtendedCommunityIds"]
      ? item["ipExtendedCommunityIds"]
      : item["ipExtendedCommunityIds"].map((p: any) => {
          return p;
        }),
    type: item["type"],
    ipPrefixId: item["ipPrefixId"],
  };
}

/** Type of the condition used. */
export enum KnownRoutePolicyConditionType {
  /** RoutePolicyConditionType-Or */
  Or = "Or",
  /** RoutePolicyConditionType-And */
  And = "And",
}

/**
 * Type of the condition used. \
 * {@link KnownRoutePolicyConditionType} can be used interchangeably with RoutePolicyConditionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Or**: RoutePolicyConditionType-Or \
 * **And**: RoutePolicyConditionType-And
 */
export type RoutePolicyConditionType = string;

/** Route policy action properties. */
export interface StatementActionProperties {
  /** Local Preference of the route policy. */
  localPreference?: number;
  /** Action type. Example: Permit | Deny | Continue. */
  actionType: RoutePolicyActionType;
  /** IP Community Properties. */
  ipCommunityProperties?: ActionIpCommunityProperties;
  /** IP Extended Community Properties. */
  ipExtendedCommunityProperties?: ActionIpExtendedCommunityProperties;
}

export function statementActionPropertiesSerializer(item: StatementActionProperties): any {
  return {
    localPreference: item["localPreference"],
    actionType: item["actionType"],
    ipCommunityProperties: !item["ipCommunityProperties"]
      ? item["ipCommunityProperties"]
      : actionIpCommunityPropertiesSerializer(item["ipCommunityProperties"]),
    ipExtendedCommunityProperties: !item["ipExtendedCommunityProperties"]
      ? item["ipExtendedCommunityProperties"]
      : actionIpExtendedCommunityPropertiesSerializer(item["ipExtendedCommunityProperties"]),
  };
}

export function statementActionPropertiesDeserializer(item: any): StatementActionProperties {
  return {
    localPreference: item["localPreference"],
    actionType: item["actionType"],
    ipCommunityProperties: !item["ipCommunityProperties"]
      ? item["ipCommunityProperties"]
      : actionIpCommunityPropertiesDeserializer(item["ipCommunityProperties"]),
    ipExtendedCommunityProperties: !item["ipExtendedCommunityProperties"]
      ? item["ipExtendedCommunityProperties"]
      : actionIpExtendedCommunityPropertiesDeserializer(item["ipExtendedCommunityProperties"]),
  };
}

/** Action type. Example: Permit | Deny | Continue. */
export enum KnownRoutePolicyActionType {
  /** RoutePolicyActionType-Permit */
  Permit = "Permit",
  /** RoutePolicyActionType-Deny */
  Deny = "Deny",
  /** RoutePolicyActionType-Continue */
  Continue = "Continue",
}

/**
 * Action type. Example: Permit | Deny | Continue. \
 * {@link KnownRoutePolicyActionType} can be used interchangeably with RoutePolicyActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Permit**: RoutePolicyActionType-Permit \
 * **Deny**: RoutePolicyActionType-Deny \
 * **Continue**: RoutePolicyActionType-Continue
 */
export type RoutePolicyActionType = string;

/** IP Community Properties. */
export interface ActionIpCommunityProperties {
  /** List of IP Community IDs. */
  add?: IpCommunityIdList;
  /** List of IP Community IDs. */
  delete?: IpCommunityIdList;
  /** List of IP Community IDs. */
  set?: IpCommunityIdList;
}

export function actionIpCommunityPropertiesSerializer(item: ActionIpCommunityProperties): any {
  return {
    add: !item["add"] ? item["add"] : ipCommunityIdListSerializer(item["add"]),
    delete: !item["delete"] ? item["delete"] : ipCommunityIdListSerializer(item["delete"]),
    set: !item["set"] ? item["set"] : ipCommunityIdListSerializer(item["set"]),
  };
}

export function actionIpCommunityPropertiesDeserializer(item: any): ActionIpCommunityProperties {
  return {
    add: !item["add"] ? item["add"] : ipCommunityIdListDeserializer(item["add"]),
    delete: !item["delete"] ? item["delete"] : ipCommunityIdListDeserializer(item["delete"]),
    set: !item["set"] ? item["set"] : ipCommunityIdListDeserializer(item["set"]),
  };
}

/** IP Community ID list properties. */
export interface IpCommunityIdList {
  /** List of IP Community resource IDs. */
  ipCommunityIds?: string[];
}

export function ipCommunityIdListSerializer(item: IpCommunityIdList): any {
  return {
    ipCommunityIds: !item["ipCommunityIds"]
      ? item["ipCommunityIds"]
      : item["ipCommunityIds"].map((p: any) => {
          return p;
        }),
  };
}

export function ipCommunityIdListDeserializer(item: any): IpCommunityIdList {
  return {
    ipCommunityIds: !item["ipCommunityIds"]
      ? item["ipCommunityIds"]
      : item["ipCommunityIds"].map((p: any) => {
          return p;
        }),
  };
}

/** IP Extended Community Properties. */
export interface ActionIpExtendedCommunityProperties {
  /** List of IP Extended Community IDs. */
  add?: IpExtendedCommunityIdList;
  /** List of IP Extended Community IDs. */
  delete?: IpExtendedCommunityIdList;
  /** List of IP Extended Community IDs. */
  set?: IpExtendedCommunityIdList;
}

export function actionIpExtendedCommunityPropertiesSerializer(
  item: ActionIpExtendedCommunityProperties,
): any {
  return {
    add: !item["add"] ? item["add"] : ipExtendedCommunityIdListSerializer(item["add"]),
    delete: !item["delete"] ? item["delete"] : ipExtendedCommunityIdListSerializer(item["delete"]),
    set: !item["set"] ? item["set"] : ipExtendedCommunityIdListSerializer(item["set"]),
  };
}

export function actionIpExtendedCommunityPropertiesDeserializer(
  item: any,
): ActionIpExtendedCommunityProperties {
  return {
    add: !item["add"] ? item["add"] : ipExtendedCommunityIdListDeserializer(item["add"]),
    delete: !item["delete"]
      ? item["delete"]
      : ipExtendedCommunityIdListDeserializer(item["delete"]),
    set: !item["set"] ? item["set"] : ipExtendedCommunityIdListDeserializer(item["set"]),
  };
}

/** IP Extended Community Id list properties. */
export interface IpExtendedCommunityIdList {
  /** List of IP Extended Community resource IDs. */
  ipExtendedCommunityIds?: string[];
}

export function ipExtendedCommunityIdListSerializer(item: IpExtendedCommunityIdList): any {
  return {
    ipExtendedCommunityIds: !item["ipExtendedCommunityIds"]
      ? item["ipExtendedCommunityIds"]
      : item["ipExtendedCommunityIds"].map((p: any) => {
          return p;
        }),
  };
}

export function ipExtendedCommunityIdListDeserializer(item: any): IpExtendedCommunityIdList {
  return {
    ipExtendedCommunityIds: !item["ipExtendedCommunityIds"]
      ? item["ipExtendedCommunityIds"]
      : item["ipExtendedCommunityIds"].map((p: any) => {
          return p;
        }),
  };
}

/** AddressFamilyType. This parameter decides whether the given ipv4 or ipv6 route policy. */
export enum KnownAddressFamilyType {
  /** AddressType-IPv4 */
  IPv4 = "IPv4",
  /** AddressType-IPv6 */
  IPv6 = "IPv6",
}

/**
 * AddressFamilyType. This parameter decides whether the given ipv4 or ipv6 route policy. \
 * {@link KnownAddressFamilyType} can be used interchangeably with AddressFamilyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPv4**: AddressType-IPv4 \
 * **IPv6**: AddressType-IPv6
 */
export type AddressFamilyType = string;

/** The Route Policy patch resource definition. */
export interface RoutePolicyPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The RoutePolicy patchable properties. */
  properties?: RoutePolicyPatchableProperties;
}

export function routePolicyPatchSerializer(item: RoutePolicyPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : routePolicyPatchablePropertiesSerializer(item["properties"]),
  };
}

/** Route Policy patchable properties. */
export interface RoutePolicyPatchableProperties {
  /** Default action that needs to be applied when no condition is matched. Example: Permit | Deny. */
  defaultAction?: CommunityActionTypes;
  /** Route Policy statements. */
  statements?: RoutePolicyStatementPatchProperties[];
}

export function routePolicyPatchablePropertiesSerializer(
  item: RoutePolicyPatchableProperties,
): any {
  return {
    defaultAction: item["defaultAction"],
    statements: !item["statements"]
      ? item["statements"]
      : routePolicyStatementPatchPropertiesArraySerializer(item["statements"]),
  };
}

export function routePolicyStatementPatchPropertiesArraySerializer(
  result: Array<RoutePolicyStatementPatchProperties>,
): any[] {
  return result.map((item) => {
    return routePolicyStatementPatchPropertiesSerializer(item);
  });
}

/** Route Policy Statement properties. */
export interface RoutePolicyStatementPatchProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** Sequence to insert to/delete from existing route. */
  sequenceNumber: number;
  /** Route policy condition properties. */
  condition: StatementConditionPatchProperties;
  /** Route policy action properties. */
  action: StatementActionPatchProperties;
}

export function routePolicyStatementPatchPropertiesSerializer(
  item: RoutePolicyStatementPatchProperties,
): any {
  return {
    annotation: item["annotation"],
    sequenceNumber: item["sequenceNumber"],
    condition: statementConditionPatchPropertiesSerializer(item["condition"]),
    action: statementActionPatchPropertiesSerializer(item["action"]),
  };
}

/** Route policy statement condition properties. */
export interface StatementConditionPatchProperties {
  /** List of IP Community resource IDs. */
  ipCommunityIds?: string[];
  /** List of IP Extended Community resource IDs. */
  ipExtendedCommunityIds?: string[];
  /** Type of the condition used. */
  type?: RoutePolicyConditionType;
  /** Arm Resource Id of IpPrefix. */
  ipPrefixId?: string;
}

export function statementConditionPatchPropertiesSerializer(
  item: StatementConditionPatchProperties,
): any {
  return {
    ipCommunityIds: !item["ipCommunityIds"]
      ? item["ipCommunityIds"]
      : item["ipCommunityIds"].map((p: any) => {
          return p;
        }),
    ipExtendedCommunityIds: !item["ipExtendedCommunityIds"]
      ? item["ipExtendedCommunityIds"]
      : item["ipExtendedCommunityIds"].map((p: any) => {
          return p;
        }),
    type: item["type"],
    ipPrefixId: item["ipPrefixId"],
  };
}

/** Route policy action properties */
export interface StatementActionPatchProperties {
  /** Local Preference of the route policy. */
  localPreference?: number;
  /** Action type. Example: Permit | Deny | Continue. */
  actionType: RoutePolicyActionType;
  /** IP Community Properties. */
  ipCommunityProperties?: ActionIpCommunityPatchProperties;
  /** IP Extended Community Properties. */
  ipExtendedCommunityProperties?: ActionIpExtendedCommunityPatchProperties;
}

export function statementActionPatchPropertiesSerializer(
  item: StatementActionPatchProperties,
): any {
  return {
    localPreference: item["localPreference"],
    actionType: item["actionType"],
    ipCommunityProperties: !item["ipCommunityProperties"]
      ? item["ipCommunityProperties"]
      : actionIpCommunityPatchPropertiesSerializer(item["ipCommunityProperties"]),
    ipExtendedCommunityProperties: !item["ipExtendedCommunityProperties"]
      ? item["ipExtendedCommunityProperties"]
      : actionIpExtendedCommunityPatchPropertiesSerializer(item["ipExtendedCommunityProperties"]),
  };
}

/** IP Community Properties. */
export interface ActionIpCommunityPatchProperties {
  /** List of IP Community IDs. */
  add?: IpCommunityIdList;
  /** List of IP Community IDs. */
  delete?: IpCommunityIdList;
  /** List of IP Community IDs. */
  set?: IpCommunityIdList;
}

export function actionIpCommunityPatchPropertiesSerializer(
  item: ActionIpCommunityPatchProperties,
): any {
  return {
    add: !item["add"] ? item["add"] : ipCommunityIdListSerializer(item["add"]),
    delete: !item["delete"] ? item["delete"] : ipCommunityIdListSerializer(item["delete"]),
    set: !item["set"] ? item["set"] : ipCommunityIdListSerializer(item["set"]),
  };
}

/** IP Extended Community Properties. */
export interface ActionIpExtendedCommunityPatchProperties {
  /** List of IP Extended Community IDs. */
  add?: IpExtendedCommunityIdList;
  /** List of IP Extended Community IDs. */
  delete?: IpExtendedCommunityIdList;
  /** List of IP Extended Community IDs. */
  set?: IpExtendedCommunityIdList;
}

export function actionIpExtendedCommunityPatchPropertiesSerializer(
  item: ActionIpExtendedCommunityPatchProperties,
): any {
  return {
    add: !item["add"] ? item["add"] : ipExtendedCommunityIdListSerializer(item["add"]),
    delete: !item["delete"] ? item["delete"] : ipExtendedCommunityIdListSerializer(item["delete"]),
    set: !item["set"] ? item["set"] : ipExtendedCommunityIdListSerializer(item["set"]),
  };
}

/** The response of a RoutePolicy list operation. */
export interface _RoutePolicyListResult {
  /** The RoutePolicy items on this page */
  value: RoutePolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _routePolicyListResultDeserializer(item: any): _RoutePolicyListResult {
  return {
    value: routePolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function routePolicyArraySerializer(result: Array<RoutePolicy>): any[] {
  return result.map((item) => {
    return routePolicySerializer(item);
  });
}

export function routePolicyArrayDeserializer(result: Array<RoutePolicy>): any[] {
  return result.map((item) => {
    return routePolicyDeserializer(item);
  });
}

/** The NetworkMonitor resource definition. */
export interface NetworkMonitor extends TrackedResource {
  /** The NetworkFabric Properties */
  properties: NetworkMonitorProperties;
}

export function networkMonitorSerializer(item: NetworkMonitor): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: networkMonitorPropertiesSerializer(item["properties"]),
  };
}

export function networkMonitorDeserializer(item: any): NetworkMonitor {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: networkMonitorPropertiesDeserializer(item["properties"]),
  };
}

/** Network Monitor Properties defines the properties of the resource. */
export interface NetworkMonitorProperties {
  /** Switch configuration description. */
  annotation?: string;
  /** BMP Configurations for the Network Fabric. */
  bmpConfiguration?: BmpConfigurationProperties;
  /** Details of the last operation performed on the resource */
  readonly lastOperation?: LastOperationProperties;
  /** Configuration state of the resource. */
  readonly configurationState?: ConfigurationState;
  /** Provides you the latest status of the NetworkMonitor resource */
  readonly provisioningState?: ProvisioningState;
  /** Administrative state of the resource. */
  readonly administrativeState?: AdministrativeState;
}

export function networkMonitorPropertiesSerializer(item: NetworkMonitorProperties): any {
  return {
    annotation: item["annotation"],
    bmpConfiguration: !item["bmpConfiguration"]
      ? item["bmpConfiguration"]
      : bmpConfigurationPropertiesSerializer(item["bmpConfiguration"]),
  };
}

export function networkMonitorPropertiesDeserializer(item: any): NetworkMonitorProperties {
  return {
    annotation: item["annotation"],
    bmpConfiguration: !item["bmpConfiguration"]
      ? item["bmpConfiguration"]
      : bmpConfigurationPropertiesDeserializer(item["bmpConfiguration"]),
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : lastOperationPropertiesDeserializer(item["lastOperation"]),
    configurationState: item["configurationState"],
    provisioningState: item["provisioningState"],
    administrativeState: item["administrativeState"],
  };
}

/** BGP Monitoring Protocol (BMP) Configuration properties. */
export interface BmpConfigurationProperties {
  /** Enabling a station. Either True/False. */
  stationConfigurationState?: StationConfigurationState;
  /** Scope resource ARM Identifier. */
  scopeResourceId?: string;
  /** Name of the station. */
  stationName?: string;
  /** IP Address of the station. */
  stationIp?: string;
  /** Port of the station. Default value is 5000. */
  stationPort?: number;
  /** Station Connection Mode. */
  stationConnectionMode?: StationConnectionMode;
  /** Station Connection Properties. */
  stationConnectionProperties?: StationConnectionProperties;
  /** Network of the station */
  stationNetwork?: string;
  /** The List of Network ID's that need to be monitored. */
  monitoredNetworks?: string[];
  /** Export Policy for the BMP Configuration. */
  exportPolicy?: BmpExportPolicy;
  /** Monitored Address Families for the BMP Configuration. */
  monitoredAddressFamilies?: BmpMonitoredAddressFamily[];
}

export function bmpConfigurationPropertiesSerializer(item: BmpConfigurationProperties): any {
  return {
    stationConfigurationState: item["stationConfigurationState"],
    scopeResourceId: item["scopeResourceId"],
    stationName: item["stationName"],
    stationIp: item["stationIp"],
    stationPort: item["stationPort"],
    stationConnectionMode: item["stationConnectionMode"],
    stationConnectionProperties: !item["stationConnectionProperties"]
      ? item["stationConnectionProperties"]
      : stationConnectionPropertiesSerializer(item["stationConnectionProperties"]),
    stationNetwork: item["stationNetwork"],
    monitoredNetworks: !item["monitoredNetworks"]
      ? item["monitoredNetworks"]
      : item["monitoredNetworks"].map((p: any) => {
          return p;
        }),
    exportPolicy: item["exportPolicy"],
    monitoredAddressFamilies: !item["monitoredAddressFamilies"]
      ? item["monitoredAddressFamilies"]
      : item["monitoredAddressFamilies"].map((p: any) => {
          return p;
        }),
  };
}

export function bmpConfigurationPropertiesDeserializer(item: any): BmpConfigurationProperties {
  return {
    stationConfigurationState: item["stationConfigurationState"],
    scopeResourceId: item["scopeResourceId"],
    stationName: item["stationName"],
    stationIp: item["stationIp"],
    stationPort: item["stationPort"],
    stationConnectionMode: item["stationConnectionMode"],
    stationConnectionProperties: !item["stationConnectionProperties"]
      ? item["stationConnectionProperties"]
      : stationConnectionPropertiesDeserializer(item["stationConnectionProperties"]),
    stationNetwork: item["stationNetwork"],
    monitoredNetworks: !item["monitoredNetworks"]
      ? item["monitoredNetworks"]
      : item["monitoredNetworks"].map((p: any) => {
          return p;
        }),
    exportPolicy: item["exportPolicy"],
    monitoredAddressFamilies: !item["monitoredAddressFamilies"]
      ? item["monitoredAddressFamilies"]
      : item["monitoredAddressFamilies"].map((p: any) => {
          return p;
        }),
  };
}

/** Station Configuration State. */
export enum KnownStationConfigurationState {
  /** StationConfigurationState Enabled */
  Enabled = "Enabled",
  /** StationConfigurationState Disabled */
  Disabled = "Disabled",
}

/**
 * Station Configuration State. \
 * {@link KnownStationConfigurationState} can be used interchangeably with StationConfigurationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: StationConfigurationState Enabled \
 * **Disabled**: StationConfigurationState Disabled
 */
export type StationConfigurationState = string;

/** Station Connection Mode. */
export enum KnownStationConnectionMode {
  /** StationConnectionMode Active */
  Active = "Active",
  /** StationConnectionMode Passive */
  Passive = "Passive",
}

/**
 * Station Connection Mode. \
 * {@link KnownStationConnectionMode} can be used interchangeably with StationConnectionMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: StationConnectionMode Active \
 * **Passive**: StationConnectionMode Passive
 */
export type StationConnectionMode = string;

/** Station Connection Properties. */
export interface StationConnectionProperties {
  /** Connection keepalive idle time in seconds */
  keepaliveIdleTime?: number;
  /** Probe interval in seconds, default value is 60 */
  probeInterval?: number;
  /** Probe count, default value is 10 */
  probeCount?: number;
}

export function stationConnectionPropertiesSerializer(item: StationConnectionProperties): any {
  return {
    keepaliveIdleTime: item["keepaliveIdleTime"],
    probeInterval: item["probeInterval"],
    probeCount: item["probeCount"],
  };
}

export function stationConnectionPropertiesDeserializer(item: any): StationConnectionProperties {
  return {
    keepaliveIdleTime: item["keepaliveIdleTime"],
    probeInterval: item["probeInterval"],
    probeCount: item["probeCount"],
  };
}

/** Export Policy for the BGP Monitoring Protocol (BMP) Configuration. */
export enum KnownBmpExportPolicy {
  /** BMP ExportPolicy Pre-Policy */
  PrePolicy = "Pre-Policy",
  /** BMP ExportPolicy Post-Policy */
  PostPolicy = "Post-Policy",
  /** BMP ExportPolicy All */
  All = "All",
}

/**
 * Export Policy for the BGP Monitoring Protocol (BMP) Configuration. \
 * {@link KnownBmpExportPolicy} can be used interchangeably with BmpExportPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pre-Policy**: BMP ExportPolicy Pre-Policy \
 * **Post-Policy**: BMP ExportPolicy Post-Policy \
 * **All**: BMP ExportPolicy All
 */
export type BmpExportPolicy = string;

/** Monitored Address Family. */
export enum KnownBmpMonitoredAddressFamily {
  /** IPv4 Unicast */
  Ipv4Unicast = "ipv4Unicast",
  /** IPv6 Unicast */
  Ipv6Unicast = "ipv6Unicast",
  /** VPN IPv4 */
  VpnIpv4 = "vpnIpv4",
  /** VPN IPv6 */
  VpnIpv6 = "vpnIpv6",
  /** All Address Families */
  All = "All",
}

/**
 * Monitored Address Family. \
 * {@link KnownBmpMonitoredAddressFamily} can be used interchangeably with BmpMonitoredAddressFamily,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ipv4Unicast**: IPv4 Unicast \
 * **ipv6Unicast**: IPv6 Unicast \
 * **vpnIpv4**: VPN IPv4 \
 * **vpnIpv6**: VPN IPv6 \
 * **All**: All Address Families
 */
export type BmpMonitoredAddressFamily = string;

/** The Network Monitor Patch resource definition. */
export interface NetworkMonitorPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Network Monitor Patch properties. */
  properties?: NetworkMonitorPatchProperties;
}

export function networkMonitorPatchSerializer(item: NetworkMonitorPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : networkMonitorPatchPropertiesSerializer(item["properties"]),
  };
}

/** The Network Monitor Patch Properties. */
export interface NetworkMonitorPatchProperties {
  /** BGP Monitoring Protocol (BMP) Configurations for the Network Monitor. */
  bmpConfiguration?: BmpConfigurationPatchProperties;
}

export function networkMonitorPatchPropertiesSerializer(item: NetworkMonitorPatchProperties): any {
  return {
    bmpConfiguration: !item["bmpConfiguration"]
      ? item["bmpConfiguration"]
      : bmpConfigurationPatchPropertiesSerializer(item["bmpConfiguration"]),
  };
}

/** BMP Configuration patch properties. */
export interface BmpConfigurationPatchProperties {
  /** Enabling a station. Either True/False. */
  stationConfigurationState?: StationConfigurationState;
  /** Scope resource ARM Identifier. */
  scopeResourceId?: string;
  /** Name of the station. */
  stationName?: string;
  /** IP Address of the station. */
  stationIp?: string;
  /** Port of the station. Default value is 5000. */
  stationPort?: number;
  /** Station Connection Mode. */
  stationConnectionMode?: StationConnectionMode;
  /** Station Connection Properties. */
  stationConnectionProperties?: StationConnectionPatchProperties;
  /** Network of the station */
  stationNetwork?: string;
  /** The List of Network ID's that need to be monitored. */
  monitoredNetworks?: string[];
  /** Export Policy for the BMP Configuration. */
  exportPolicy?: BmpExportPolicy;
  /** Monitored Address Families for the BMP Configuration. */
  monitoredAddressFamilies?: BmpMonitoredAddressFamily[];
}

export function bmpConfigurationPatchPropertiesSerializer(
  item: BmpConfigurationPatchProperties,
): any {
  return {
    stationConfigurationState: item["stationConfigurationState"],
    scopeResourceId: item["scopeResourceId"],
    stationName: item["stationName"],
    stationIp: item["stationIp"],
    stationPort: item["stationPort"],
    stationConnectionMode: item["stationConnectionMode"],
    stationConnectionProperties: !item["stationConnectionProperties"]
      ? item["stationConnectionProperties"]
      : stationConnectionPatchPropertiesSerializer(item["stationConnectionProperties"]),
    stationNetwork: item["stationNetwork"],
    monitoredNetworks: !item["monitoredNetworks"]
      ? item["monitoredNetworks"]
      : item["monitoredNetworks"].map((p: any) => {
          return p;
        }),
    exportPolicy: item["exportPolicy"],
    monitoredAddressFamilies: !item["monitoredAddressFamilies"]
      ? item["monitoredAddressFamilies"]
      : item["monitoredAddressFamilies"].map((p: any) => {
          return p;
        }),
  };
}

/** Station Connection PATCH Properties. */
export interface StationConnectionPatchProperties {
  /** Connection keepalive idle time in seconds */
  keepaliveIdleTime?: number;
  /** Probe interval in seconds, default value is 60 */
  probeInterval?: number;
  /** Probe count, default value is 10 */
  probeCount?: number;
}

export function stationConnectionPatchPropertiesSerializer(
  item: StationConnectionPatchProperties,
): any {
  return {
    keepaliveIdleTime: item["keepaliveIdleTime"],
    probeInterval: item["probeInterval"],
    probeCount: item["probeCount"],
  };
}

/** The response of a NetworkMonitor list operation. */
export interface _NetworkMonitorListResult {
  /** The NetworkMonitor items on this page */
  value: NetworkMonitor[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkMonitorListResultDeserializer(item: any): _NetworkMonitorListResult {
  return {
    value: networkMonitorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkMonitorArraySerializer(result: Array<NetworkMonitor>): any[] {
  return result.map((item) => {
    return networkMonitorSerializer(item);
  });
}

export function networkMonitorArrayDeserializer(result: Array<NetworkMonitor>): any[] {
  return result.map((item) => {
    return networkMonitorDeserializer(item);
  });
}

/** API Versions */
export enum KnownVersions {
  /** 2024-02-15-preview */
  V20240215Preview = "2024-02-15-preview",
  /** 2024-06-15-preview */
  V20240615Preview = "2024-06-15-preview",
}
