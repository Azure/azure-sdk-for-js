// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Class for CheckServiceProviderAvailabilityInput */
export interface CheckServiceProviderAvailabilityInput {
  /** Gets or sets the peering service location. */
  peeringServiceLocation?: string;
  /** Gets or sets the peering service provider. */
  peeringServiceProvider?: string;
}

export function checkServiceProviderAvailabilityInputSerializer(
  item: CheckServiceProviderAvailabilityInput,
): any {
  return {
    peeringServiceLocation: item["peeringServiceLocation"],
    peeringServiceProvider: item["peeringServiceProvider"],
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

/** The essential information related to the peer's ASN. */
export interface PeerAsn extends ProxyResource {
  /** The Autonomous System Number (ASN) of the peer. */
  peerAsn?: number;
  /** The contact details of the peer. */
  peerContactDetail?: ContactDetail[];
  /** The name of the peer. */
  peerName?: string;
  /** The validation state of the ASN associated with the peer. */
  readonly validationState?: ValidationState;
  /** The error message for the validation state */
  readonly errorMessage?: string;
}

export function peerAsnSerializer(item: PeerAsn): any {
  return {
    properties: areAllPropsUndefined(item, ["peerAsn", "peerContactDetail", "peerName"])
      ? undefined
      : _peerAsnPropertiesSerializer(item),
  };
}

export function peerAsnDeserializer(item: any): PeerAsn {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _peerAsnPropertiesDeserializer(item["properties"])),
  };
}

/** The properties that define a peer's ASN. */
export interface PeerAsnProperties {
  /** The Autonomous System Number (ASN) of the peer. */
  peerAsn?: number;
  /** The contact details of the peer. */
  peerContactDetail?: ContactDetail[];
  /** The name of the peer. */
  peerName?: string;
  /** The validation state of the ASN associated with the peer. */
  readonly validationState?: ValidationState;
  /** The error message for the validation state */
  readonly errorMessage?: string;
}

export function peerAsnPropertiesSerializer(item: PeerAsnProperties): any {
  return {
    peerAsn: item["peerAsn"],
    peerContactDetail: !item["peerContactDetail"]
      ? item["peerContactDetail"]
      : contactDetailArraySerializer(item["peerContactDetail"]),
    peerName: item["peerName"],
  };
}

export function peerAsnPropertiesDeserializer(item: any): PeerAsnProperties {
  return {
    peerAsn: item["peerAsn"],
    peerContactDetail: !item["peerContactDetail"]
      ? item["peerContactDetail"]
      : contactDetailArrayDeserializer(item["peerContactDetail"]),
    peerName: item["peerName"],
    validationState: item["validationState"],
    errorMessage: item["errorMessage"],
  };
}

export function contactDetailArraySerializer(result: Array<ContactDetail>): any[] {
  return result.map((item) => {
    return contactDetailSerializer(item);
  });
}

export function contactDetailArrayDeserializer(result: Array<ContactDetail>): any[] {
  return result.map((item) => {
    return contactDetailDeserializer(item);
  });
}

/** The contact detail class. */
export interface ContactDetail {
  /** The role of the contact. */
  role?: Role;
  /** The e-mail address of the contact. */
  email?: string;
  /** The phone number of the contact. */
  phone?: string;
}

export function contactDetailSerializer(item: ContactDetail): any {
  return { role: item["role"], email: item["email"], phone: item["phone"] };
}

export function contactDetailDeserializer(item: any): ContactDetail {
  return {
    role: item["role"],
    email: item["email"],
    phone: item["phone"],
  };
}

/** The role of the contact. */
export enum KnownRole {
  /** Noc */
  Noc = "Noc",
  /** Policy */
  Policy = "Policy",
  /** Technical */
  Technical = "Technical",
  /** Service */
  Service = "Service",
  /** Escalation */
  Escalation = "Escalation",
  /** Other */
  Other = "Other",
}

/**
 * The role of the contact. \
 * {@link KnownRole} can be used interchangeably with Role,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Noc** \
 * **Policy** \
 * **Technical** \
 * **Service** \
 * **Escalation** \
 * **Other**
 */
export type Role = string;

/** The validation state of the ASN associated with the peer. */
export enum KnownValidationState {
  /** None */
  None = "None",
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Failed */
  Failed = "Failed",
}

/**
 * The validation state of the ASN associated with the peer. \
 * {@link KnownValidationState} can be used interchangeably with ValidationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Pending** \
 * **Approved** \
 * **Failed**
 */
export type ValidationState = string;

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

/** The response of a PeerAsn list operation. */
export interface _PeerAsnListResult {
  /** The PeerAsn items on this page */
  value: PeerAsn[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _peerAsnListResultDeserializer(item: any): _PeerAsnListResult {
  return {
    value: peerAsnArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function peerAsnArraySerializer(result: Array<PeerAsn>): any[] {
  return result.map((item) => {
    return peerAsnSerializer(item);
  });
}

export function peerAsnArrayDeserializer(result: Array<PeerAsn>): any[] {
  return result.map((item) => {
    return peerAsnDeserializer(item);
  });
}

/** Peering is a logical representation of a set of connections to the Microsoft Cloud Edge at a location. */
export interface Peering extends TrackedResource {
  /** The SKU that defines the tier and kind of the peering. */
  sku: PeeringSku;
  /** The kind of the peering. */
  kind: Kind;
  /** The properties that define a direct peering. */
  direct?: PeeringPropertiesDirect;
  /** The properties that define an exchange peering. */
  exchange?: PeeringPropertiesExchange;
  /** The connectivity probes associated with the peering. */
  connectivityProbes?: ConnectivityProbe[];
  /** The location of the peering. */
  peeringLocation?: string;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function peeringSerializer(item: Peering): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "direct",
      "exchange",
      "connectivityProbes",
      "peeringLocation",
    ])
      ? undefined
      : _peeringPropertiesSerializer(item),
    sku: peeringSkuSerializer(item["sku"]),
    kind: item["kind"],
  };
}

export function peeringDeserializer(item: any): Peering {
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
      : _peeringPropertiesDeserializer(item["properties"])),
    sku: peeringSkuDeserializer(item["sku"]),
    kind: item["kind"],
  };
}

/** The properties that define connectivity to the Microsoft Cloud Edge. */
export interface PeeringProperties {
  /** The properties that define a direct peering. */
  direct?: PeeringPropertiesDirect;
  /** The properties that define an exchange peering. */
  exchange?: PeeringPropertiesExchange;
  /** The connectivity probes associated with the peering. */
  connectivityProbes?: ConnectivityProbe[];
  /** The location of the peering. */
  peeringLocation?: string;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function peeringPropertiesSerializer(item: PeeringProperties): any {
  return {
    direct: !item["direct"] ? item["direct"] : peeringPropertiesDirectSerializer(item["direct"]),
    exchange: !item["exchange"]
      ? item["exchange"]
      : peeringPropertiesExchangeSerializer(item["exchange"]),
    connectivityProbes: !item["connectivityProbes"]
      ? item["connectivityProbes"]
      : connectivityProbeArraySerializer(item["connectivityProbes"]),
    peeringLocation: item["peeringLocation"],
  };
}

export function peeringPropertiesDeserializer(item: any): PeeringProperties {
  return {
    direct: !item["direct"] ? item["direct"] : peeringPropertiesDirectDeserializer(item["direct"]),
    exchange: !item["exchange"]
      ? item["exchange"]
      : peeringPropertiesExchangeDeserializer(item["exchange"]),
    connectivityProbes: !item["connectivityProbes"]
      ? item["connectivityProbes"]
      : connectivityProbeArrayDeserializer(item["connectivityProbes"]),
    peeringLocation: item["peeringLocation"],
    provisioningState: item["provisioningState"],
  };
}

/** The properties that define a direct peering. */
export interface PeeringPropertiesDirect {
  /** The set of connections that constitute a direct peering. */
  connections?: DirectConnection[];
  /** The flag that indicates whether or not the peering is used for peering service. */
  readonly useForPeeringService?: boolean;
  /** The reference of the peer ASN. */
  peerAsn?: SubResource;
  /** The type of direct peering. */
  directPeeringType?: DirectPeeringType;
}

export function peeringPropertiesDirectSerializer(item: PeeringPropertiesDirect): any {
  return {
    connections: !item["connections"]
      ? item["connections"]
      : directConnectionArraySerializer(item["connections"]),
    peerAsn: !item["peerAsn"] ? item["peerAsn"] : subResourceSerializer(item["peerAsn"]),
    directPeeringType: item["directPeeringType"],
  };
}

export function peeringPropertiesDirectDeserializer(item: any): PeeringPropertiesDirect {
  return {
    connections: !item["connections"]
      ? item["connections"]
      : directConnectionArrayDeserializer(item["connections"]),
    useForPeeringService: item["useForPeeringService"],
    peerAsn: !item["peerAsn"] ? item["peerAsn"] : subResourceDeserializer(item["peerAsn"]),
    directPeeringType: item["directPeeringType"],
  };
}

export function directConnectionArraySerializer(result: Array<DirectConnection>): any[] {
  return result.map((item) => {
    return directConnectionSerializer(item);
  });
}

export function directConnectionArrayDeserializer(result: Array<DirectConnection>): any[] {
  return result.map((item) => {
    return directConnectionDeserializer(item);
  });
}

/** The properties that define a direct connection. */
export interface DirectConnection {
  /** The bandwidth of the connection. */
  bandwidthInMbps?: number;
  /** The bandwidth that is actually provisioned. */
  readonly provisionedBandwidthInMbps?: number;
  /** The field indicating if Microsoft provides session ip addresses. */
  sessionAddressProvider?: SessionAddressProvider;
  /** The flag that indicates whether or not the connection is used for peering service. */
  useForPeeringService?: boolean;
  /** The ID used within Microsoft's peering provisioning system to track the connection */
  readonly microsoftTrackingId?: string;
  /** The PeeringDB.com ID of the facility at which the connection has to be set up. */
  peeringDBFacilityId?: number;
  /** The state of the connection. */
  readonly connectionState?: ConnectionState;
  /** The BGP session associated with the connection. */
  bgpSession?: BgpSession;
  /** The unique identifier (GUID) for the connection. */
  connectionIdentifier?: string;
  /** The error message related to the connection state, if any. */
  readonly errorMessage?: string;
}

export function directConnectionSerializer(item: DirectConnection): any {
  return {
    bandwidthInMbps: item["bandwidthInMbps"],
    sessionAddressProvider: item["sessionAddressProvider"],
    useForPeeringService: item["useForPeeringService"],
    peeringDBFacilityId: item["peeringDBFacilityId"],
    bgpSession: !item["bgpSession"] ? item["bgpSession"] : bgpSessionSerializer(item["bgpSession"]),
    connectionIdentifier: item["connectionIdentifier"],
  };
}

export function directConnectionDeserializer(item: any): DirectConnection {
  return {
    bandwidthInMbps: item["bandwidthInMbps"],
    provisionedBandwidthInMbps: item["provisionedBandwidthInMbps"],
    sessionAddressProvider: item["sessionAddressProvider"],
    useForPeeringService: item["useForPeeringService"],
    microsoftTrackingId: item["microsoftTrackingId"],
    peeringDBFacilityId: item["peeringDBFacilityId"],
    connectionState: item["connectionState"],
    bgpSession: !item["bgpSession"]
      ? item["bgpSession"]
      : bgpSessionDeserializer(item["bgpSession"]),
    connectionIdentifier: item["connectionIdentifier"],
    errorMessage: item["errorMessage"],
  };
}

/** The field indicating if Microsoft provides session ip addresses. */
export enum KnownSessionAddressProvider {
  /** Microsoft */
  Microsoft = "Microsoft",
  /** Peer */
  Peer = "Peer",
}

/**
 * The field indicating if Microsoft provides session ip addresses. \
 * {@link KnownSessionAddressProvider} can be used interchangeably with SessionAddressProvider,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft** \
 * **Peer**
 */
export type SessionAddressProvider = string;

/** The state of the connection. */
export enum KnownConnectionState {
  /** None */
  None = "None",
  /** PendingApproval */
  PendingApproval = "PendingApproval",
  /** Approved */
  Approved = "Approved",
  /** ProvisioningStarted */
  ProvisioningStarted = "ProvisioningStarted",
  /** ProvisioningFailed */
  ProvisioningFailed = "ProvisioningFailed",
  /** ProvisioningCompleted */
  ProvisioningCompleted = "ProvisioningCompleted",
  /** Validating */
  Validating = "Validating",
  /** Active */
  Active = "Active",
  /** TypeChangeRequested */
  TypeChangeRequested = "TypeChangeRequested",
  /** TypeChangeInProgress */
  TypeChangeInProgress = "TypeChangeInProgress",
  /** ExternalBlocker */
  ExternalBlocker = "ExternalBlocker",
}

/**
 * The state of the connection. \
 * {@link KnownConnectionState} can be used interchangeably with ConnectionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **PendingApproval** \
 * **Approved** \
 * **ProvisioningStarted** \
 * **ProvisioningFailed** \
 * **ProvisioningCompleted** \
 * **Validating** \
 * **Active** \
 * **TypeChangeRequested** \
 * **TypeChangeInProgress** \
 * **ExternalBlocker**
 */
export type ConnectionState = string;

/** The properties that define a BGP session. */
export interface BgpSession {
  /** The IPv4 prefix that contains both ends' IPv4 addresses. */
  sessionPrefixV4?: string;
  /** The IPv6 prefix that contains both ends' IPv6 addresses. */
  sessionPrefixV6?: string;
  /** The IPv4 session address on Microsoft's end. */
  microsoftSessionIPv4Address?: string;
  /** The IPv6 session address on Microsoft's end. */
  microsoftSessionIPv6Address?: string;
  /** The IPv4 session address on peer's end. */
  peerSessionIPv4Address?: string;
  /** The IPv6 session address on peer's end. */
  peerSessionIPv6Address?: string;
  /** The state of the IPv4 session. */
  readonly sessionStateV4?: SessionStateV4;
  /** The state of the IPv6 session. */
  readonly sessionStateV6?: SessionStateV6;
  /** The maximum number of prefixes advertised over the IPv4 session. */
  maxPrefixesAdvertisedV4?: number;
  /** The maximum number of prefixes advertised over the IPv6 session. */
  maxPrefixesAdvertisedV6?: number;
  /** The MD5 authentication key of the session. */
  md5AuthenticationKey?: string;
}

export function bgpSessionSerializer(item: BgpSession): any {
  return {
    sessionPrefixV4: item["sessionPrefixV4"],
    sessionPrefixV6: item["sessionPrefixV6"],
    microsoftSessionIPv4Address: item["microsoftSessionIPv4Address"],
    microsoftSessionIPv6Address: item["microsoftSessionIPv6Address"],
    peerSessionIPv4Address: item["peerSessionIPv4Address"],
    peerSessionIPv6Address: item["peerSessionIPv6Address"],
    maxPrefixesAdvertisedV4: item["maxPrefixesAdvertisedV4"],
    maxPrefixesAdvertisedV6: item["maxPrefixesAdvertisedV6"],
    md5AuthenticationKey: item["md5AuthenticationKey"],
  };
}

export function bgpSessionDeserializer(item: any): BgpSession {
  return {
    sessionPrefixV4: item["sessionPrefixV4"],
    sessionPrefixV6: item["sessionPrefixV6"],
    microsoftSessionIPv4Address: item["microsoftSessionIPv4Address"],
    microsoftSessionIPv6Address: item["microsoftSessionIPv6Address"],
    peerSessionIPv4Address: item["peerSessionIPv4Address"],
    peerSessionIPv6Address: item["peerSessionIPv6Address"],
    sessionStateV4: item["sessionStateV4"],
    sessionStateV6: item["sessionStateV6"],
    maxPrefixesAdvertisedV4: item["maxPrefixesAdvertisedV4"],
    maxPrefixesAdvertisedV6: item["maxPrefixesAdvertisedV6"],
    md5AuthenticationKey: item["md5AuthenticationKey"],
  };
}

/** The state of the IPv4 session. */
export enum KnownSessionStateV4 {
  /** None */
  None = "None",
  /** Idle */
  Idle = "Idle",
  /** Connect */
  Connect = "Connect",
  /** Active */
  Active = "Active",
  /** OpenSent */
  OpenSent = "OpenSent",
  /** OpenConfirm */
  OpenConfirm = "OpenConfirm",
  /** OpenReceived */
  OpenReceived = "OpenReceived",
  /** Established */
  Established = "Established",
  /** PendingAdd */
  PendingAdd = "PendingAdd",
  /** PendingUpdate */
  PendingUpdate = "PendingUpdate",
  /** PendingRemove */
  PendingRemove = "PendingRemove",
}

/**
 * The state of the IPv4 session. \
 * {@link KnownSessionStateV4} can be used interchangeably with SessionStateV4,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Idle** \
 * **Connect** \
 * **Active** \
 * **OpenSent** \
 * **OpenConfirm** \
 * **OpenReceived** \
 * **Established** \
 * **PendingAdd** \
 * **PendingUpdate** \
 * **PendingRemove**
 */
export type SessionStateV4 = string;

/** The state of the IPv6 session. */
export enum KnownSessionStateV6 {
  /** None */
  None = "None",
  /** Idle */
  Idle = "Idle",
  /** Connect */
  Connect = "Connect",
  /** Active */
  Active = "Active",
  /** OpenSent */
  OpenSent = "OpenSent",
  /** OpenConfirm */
  OpenConfirm = "OpenConfirm",
  /** OpenReceived */
  OpenReceived = "OpenReceived",
  /** Established */
  Established = "Established",
  /** PendingAdd */
  PendingAdd = "PendingAdd",
  /** PendingUpdate */
  PendingUpdate = "PendingUpdate",
  /** PendingRemove */
  PendingRemove = "PendingRemove",
}

/**
 * The state of the IPv6 session. \
 * {@link KnownSessionStateV6} can be used interchangeably with SessionStateV6,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Idle** \
 * **Connect** \
 * **Active** \
 * **OpenSent** \
 * **OpenConfirm** \
 * **OpenReceived** \
 * **Established** \
 * **PendingAdd** \
 * **PendingUpdate** \
 * **PendingRemove**
 */
export type SessionStateV6 = string;

/** The sub resource. */
export interface SubResource {
  /** The identifier of the referenced resource. */
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

/** The type of direct peering. */
export enum KnownDirectPeeringType {
  /** Edge */
  Edge = "Edge",
  /** Transit */
  Transit = "Transit",
  /** Cdn */
  Cdn = "Cdn",
  /** Internal */
  Internal = "Internal",
  /** Ix */
  Ix = "Ix",
  /** IxRs */
  IxRs = "IxRs",
  /** Voice */
  Voice = "Voice",
  /** EdgeZoneForOperators */
  EdgeZoneForOperators = "EdgeZoneForOperators",
  /** PeerProp */
  PeerProp = "PeerProp",
}

/**
 * The type of direct peering. \
 * {@link KnownDirectPeeringType} can be used interchangeably with DirectPeeringType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Edge** \
 * **Transit** \
 * **Cdn** \
 * **Internal** \
 * **Ix** \
 * **IxRs** \
 * **Voice** \
 * **EdgeZoneForOperators** \
 * **PeerProp**
 */
export type DirectPeeringType = string;

/** The properties that define an exchange peering. */
export interface PeeringPropertiesExchange {
  /** The set of connections that constitute an exchange peering. */
  connections?: ExchangeConnection[];
  /** The reference of the peer ASN. */
  peerAsn?: SubResource;
}

export function peeringPropertiesExchangeSerializer(item: PeeringPropertiesExchange): any {
  return {
    connections: !item["connections"]
      ? item["connections"]
      : exchangeConnectionArraySerializer(item["connections"]),
    peerAsn: !item["peerAsn"] ? item["peerAsn"] : subResourceSerializer(item["peerAsn"]),
  };
}

export function peeringPropertiesExchangeDeserializer(item: any): PeeringPropertiesExchange {
  return {
    connections: !item["connections"]
      ? item["connections"]
      : exchangeConnectionArrayDeserializer(item["connections"]),
    peerAsn: !item["peerAsn"] ? item["peerAsn"] : subResourceDeserializer(item["peerAsn"]),
  };
}

export function exchangeConnectionArraySerializer(result: Array<ExchangeConnection>): any[] {
  return result.map((item) => {
    return exchangeConnectionSerializer(item);
  });
}

export function exchangeConnectionArrayDeserializer(result: Array<ExchangeConnection>): any[] {
  return result.map((item) => {
    return exchangeConnectionDeserializer(item);
  });
}

/** The properties that define an exchange connection. */
export interface ExchangeConnection {
  /** The PeeringDB.com ID of the facility at which the connection has to be set up. */
  peeringDBFacilityId?: number;
  /** The state of the connection. */
  readonly connectionState?: ConnectionState;
  /** The BGP session associated with the connection. */
  bgpSession?: BgpSession;
  /** The unique identifier (GUID) for the connection. */
  connectionIdentifier?: string;
  /** The error message related to the connection state, if any. */
  readonly errorMessage?: string;
}

export function exchangeConnectionSerializer(item: ExchangeConnection): any {
  return {
    peeringDBFacilityId: item["peeringDBFacilityId"],
    bgpSession: !item["bgpSession"] ? item["bgpSession"] : bgpSessionSerializer(item["bgpSession"]),
    connectionIdentifier: item["connectionIdentifier"],
  };
}

export function exchangeConnectionDeserializer(item: any): ExchangeConnection {
  return {
    peeringDBFacilityId: item["peeringDBFacilityId"],
    connectionState: item["connectionState"],
    bgpSession: !item["bgpSession"]
      ? item["bgpSession"]
      : bgpSessionDeserializer(item["bgpSession"]),
    connectionIdentifier: item["connectionIdentifier"],
    errorMessage: item["errorMessage"],
  };
}

export function connectivityProbeArraySerializer(result: Array<ConnectivityProbe>): any[] {
  return result.map((item) => {
    return connectivityProbeSerializer(item);
  });
}

export function connectivityProbeArrayDeserializer(result: Array<ConnectivityProbe>): any[] {
  return result.map((item) => {
    return connectivityProbeDeserializer(item);
  });
}

/**
 * Represents a connectivity probe, a configuration peers can add to direct and exchange peerings to create ping tests. These ping
 * tests will allow us to generate availability, jitter, and latency data for traffic (using ICMP or TCP) from Azure to an endpoint
 * IP address given by the customer. This data will be emitted such that the peer can view these metrics in the Azure portal in the
 * Connectivity probe blade of their peering.
 */
export interface ConnectivityProbe {
  /** The endpoint IP address where traffic will be sent to from Azure for the connectivity probe. */
  endpoint?: string;
  /** The Azure region where traffic will originate from for the connectivity probe. */
  azureRegion?: string;
  /** The protocol of the traffic that will be sent for the connectivity probe. */
  protocol?: Protocol;
  /**
   * Set to contain the prefixes that agents in Azure will send traffic from. For peers to allow into their
   * network the connectivity probe traffic can reach their endpoint for the connectivity probe.
   */
  readonly prefixesToAccesslist?: string[];
}

export function connectivityProbeSerializer(item: ConnectivityProbe): any {
  return {
    endpoint: item["endpoint"],
    azureRegion: item["azureRegion"],
    protocol: item["protocol"],
  };
}

export function connectivityProbeDeserializer(item: any): ConnectivityProbe {
  return {
    endpoint: item["endpoint"],
    azureRegion: item["azureRegion"],
    protocol: item["protocol"],
    prefixesToAccesslist: !item["prefixesToAccesslist"]
      ? item["prefixesToAccesslist"]
      : item["prefixesToAccesslist"].map((p: any) => {
          return p;
        }),
  };
}

/** The protocol of the traffic that will be sent for the connectivity probe. */
export enum KnownProtocol {
  /** None */
  None = "None",
  /** ICMP */
  Icmp = "ICMP",
  /** TCP */
  TCP = "TCP",
}

/**
 * The protocol of the traffic that will be sent for the connectivity probe. \
 * {@link KnownProtocol} can be used interchangeably with Protocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **ICMP** \
 * **TCP**
 */
export type Protocol = string;

/** The provisioning state of the resource. */
export enum KnownProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * The provisioning state of the resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Updating** \
 * **Deleting** \
 * **Failed** \
 * **Canceled**
 */
export type ProvisioningState = string;

/** The SKU that defines the tier and kind of the peering. */
export interface PeeringSku {
  /** The name of the peering SKU. */
  name?: string;
  /** The tier of the peering SKU. */
  readonly tier?: Tier;
  /** The family of the peering SKU. */
  readonly family?: Family;
  /** The size of the peering SKU. */
  readonly size?: Size;
}

export function peeringSkuSerializer(item: PeeringSku): any {
  return { name: item["name"] };
}

export function peeringSkuDeserializer(item: any): PeeringSku {
  return {
    name: item["name"],
    tier: item["tier"],
    family: item["family"],
    size: item["size"],
  };
}

/** The tier of the peering SKU. */
export enum KnownTier {
  /** Basic */
  Basic = "Basic",
  /** Premium */
  Premium = "Premium",
}

/**
 * The tier of the peering SKU. \
 * {@link KnownTier} can be used interchangeably with Tier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic** \
 * **Premium**
 */
export type Tier = string;

/** The family of the peering SKU. */
export enum KnownFamily {
  /** Direct */
  Direct = "Direct",
  /** Exchange */
  Exchange = "Exchange",
}

/**
 * The family of the peering SKU. \
 * {@link KnownFamily} can be used interchangeably with Family,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Direct** \
 * **Exchange**
 */
export type Family = string;

/** The size of the peering SKU. */
export enum KnownSize {
  /** Free */
  Free = "Free",
  /** Metered */
  Metered = "Metered",
  /** Unlimited */
  Unlimited = "Unlimited",
}

/**
 * The size of the peering SKU. \
 * {@link KnownSize} can be used interchangeably with Size,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Free** \
 * **Metered** \
 * **Unlimited**
 */
export type Size = string;

/** The kind of the peering. */
export enum KnownKind {
  /** Direct */
  Direct = "Direct",
  /** Exchange */
  Exchange = "Exchange",
}

/**
 * The kind of the peering. \
 * {@link KnownKind} can be used interchangeably with Kind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Direct** \
 * **Exchange**
 */
export type Kind = string;

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

/** The resource tags. */
export interface ResourceTags {
  /** Gets or sets the tags, a dictionary of descriptors arm object */
  tags?: Record<string, string>;
}

export function resourceTagsSerializer(item: ResourceTags): any {
  return { tags: item["tags"] };
}

/** The response of a Peering list operation. */
export interface _PeeringListResult {
  /** The Peering items on this page */
  value: Peering[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _peeringListResultDeserializer(item: any): _PeeringListResult {
  return {
    value: peeringArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function peeringArraySerializer(result: Array<Peering>): any[] {
  return result.map((item) => {
    return peeringSerializer(item);
  });
}

export function peeringArrayDeserializer(result: Array<Peering>): any[] {
  return result.map((item) => {
    return peeringDeserializer(item);
  });
}

/** The Connection Monitor Test class. */
export interface ConnectionMonitorTest extends ProxyResource {
  /** The Connection Monitor test source agent */
  sourceAgent?: string;
  /** The Connection Monitor test destination */
  destination?: string;
  /** The Connection Monitor test destination port */
  destinationPort?: number;
  /** The Connection Monitor test frequency in seconds */
  testFrequencyInSec?: number;
  /** The flag that indicates if the Connection Monitor test is successful or not. */
  readonly isTestSuccessful?: boolean;
  /** The path representing the Connection Monitor test. */
  readonly path?: string[];
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function connectionMonitorTestSerializer(item: ConnectionMonitorTest): any {
  return {
    properties: areAllPropsUndefined(item, [
      "sourceAgent",
      "destination",
      "destinationPort",
      "testFrequencyInSec",
    ])
      ? undefined
      : _connectionMonitorTestPropertiesSerializer(item),
  };
}

export function connectionMonitorTestDeserializer(item: any): ConnectionMonitorTest {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _connectionMonitorTestPropertiesDeserializer(item["properties"])),
  };
}

/** The properties that define a Connection Monitor Test. */
export interface ConnectionMonitorTestProperties {
  /** The Connection Monitor test source agent */
  sourceAgent?: string;
  /** The Connection Monitor test destination */
  destination?: string;
  /** The Connection Monitor test destination port */
  destinationPort?: number;
  /** The Connection Monitor test frequency in seconds */
  testFrequencyInSec?: number;
  /** The flag that indicates if the Connection Monitor test is successful or not. */
  readonly isTestSuccessful?: boolean;
  /** The path representing the Connection Monitor test. */
  readonly path?: string[];
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function connectionMonitorTestPropertiesSerializer(
  item: ConnectionMonitorTestProperties,
): any {
  return {
    sourceAgent: item["sourceAgent"],
    destination: item["destination"],
    destinationPort: item["destinationPort"],
    testFrequencyInSec: item["testFrequencyInSec"],
  };
}

export function connectionMonitorTestPropertiesDeserializer(
  item: any,
): ConnectionMonitorTestProperties {
  return {
    sourceAgent: item["sourceAgent"],
    destination: item["destination"],
    destinationPort: item["destinationPort"],
    testFrequencyInSec: item["testFrequencyInSec"],
    isTestSuccessful: item["isTestSuccessful"],
    path: !item["path"]
      ? item["path"]
      : item["path"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** The response of a ConnectionMonitorTest list operation. */
export interface _ConnectionMonitorTestListResult {
  /** The ConnectionMonitorTest items on this page */
  value: ConnectionMonitorTest[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _connectionMonitorTestListResultDeserializer(
  item: any,
): _ConnectionMonitorTestListResult {
  return {
    value: connectionMonitorTestArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function connectionMonitorTestArraySerializer(result: Array<ConnectionMonitorTest>): any[] {
  return result.map((item) => {
    return connectionMonitorTestSerializer(item);
  });
}

export function connectionMonitorTestArrayDeserializer(
  result: Array<ConnectionMonitorTest>,
): any[] {
  return result.map((item) => {
    return connectionMonitorTestDeserializer(item);
  });
}

/** Peering Service */
export interface PeeringService extends TrackedResource {
  /** The SKU that defines the type of the peering service. */
  sku?: PeeringServiceSku;
  /** The location (state/province) of the customer. */
  peeringServiceLocation?: string;
  /** The name of the service provider. */
  peeringServiceProvider?: string;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The primary peering (Microsoft/service provider) location to be used for customer traffic. */
  providerPrimaryPeeringLocation?: string;
  /** The backup peering (Microsoft/service provider) location to be used for customer traffic. */
  providerBackupPeeringLocation?: string;
  /** The Log Analytics Workspace Properties */
  logAnalyticsWorkspaceProperties?: LogAnalyticsWorkspaceProperties;
}

export function peeringServiceSerializer(item: PeeringService): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "peeringServiceLocation",
      "peeringServiceProvider",
      "providerPrimaryPeeringLocation",
      "providerBackupPeeringLocation",
      "logAnalyticsWorkspaceProperties",
    ])
      ? undefined
      : _peeringServicePropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : peeringServiceSkuSerializer(item["sku"]),
  };
}

export function peeringServiceDeserializer(item: any): PeeringService {
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
      : _peeringServicePropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : peeringServiceSkuDeserializer(item["sku"]),
  };
}

/** The properties that define connectivity to the Peering Service. */
export interface PeeringServiceProperties {
  /** The location (state/province) of the customer. */
  peeringServiceLocation?: string;
  /** The name of the service provider. */
  peeringServiceProvider?: string;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The primary peering (Microsoft/service provider) location to be used for customer traffic. */
  providerPrimaryPeeringLocation?: string;
  /** The backup peering (Microsoft/service provider) location to be used for customer traffic. */
  providerBackupPeeringLocation?: string;
  /** The Log Analytics Workspace Properties */
  logAnalyticsWorkspaceProperties?: LogAnalyticsWorkspaceProperties;
}

export function peeringServicePropertiesSerializer(item: PeeringServiceProperties): any {
  return {
    peeringServiceLocation: item["peeringServiceLocation"],
    peeringServiceProvider: item["peeringServiceProvider"],
    providerPrimaryPeeringLocation: item["providerPrimaryPeeringLocation"],
    providerBackupPeeringLocation: item["providerBackupPeeringLocation"],
    logAnalyticsWorkspaceProperties: !item["logAnalyticsWorkspaceProperties"]
      ? item["logAnalyticsWorkspaceProperties"]
      : logAnalyticsWorkspacePropertiesSerializer(item["logAnalyticsWorkspaceProperties"]),
  };
}

export function peeringServicePropertiesDeserializer(item: any): PeeringServiceProperties {
  return {
    peeringServiceLocation: item["peeringServiceLocation"],
    peeringServiceProvider: item["peeringServiceProvider"],
    provisioningState: item["provisioningState"],
    providerPrimaryPeeringLocation: item["providerPrimaryPeeringLocation"],
    providerBackupPeeringLocation: item["providerBackupPeeringLocation"],
    logAnalyticsWorkspaceProperties: !item["logAnalyticsWorkspaceProperties"]
      ? item["logAnalyticsWorkspaceProperties"]
      : logAnalyticsWorkspacePropertiesDeserializer(item["logAnalyticsWorkspaceProperties"]),
  };
}

/** The properties that define a Log Analytics Workspace. */
export interface LogAnalyticsWorkspaceProperties {
  /** The Workspace ID. */
  readonly workspaceID?: string;
  /** The Workspace Key. */
  readonly key?: string;
  /** The list of connected agents. */
  readonly connectedAgents?: string[];
}

export function logAnalyticsWorkspacePropertiesSerializer(
  item: LogAnalyticsWorkspaceProperties,
): any {
  return item;
}

export function logAnalyticsWorkspacePropertiesDeserializer(
  item: any,
): LogAnalyticsWorkspaceProperties {
  return {
    workspaceID: item["workspaceID"],
    key: item["key"],
    connectedAgents: !item["connectedAgents"]
      ? item["connectedAgents"]
      : item["connectedAgents"].map((p: any) => {
          return p;
        }),
  };
}

/** The SKU that defines the type of the peering service. */
export interface PeeringServiceSku {
  /** The name of the peering service SKU. */
  name?: string;
}

export function peeringServiceSkuSerializer(item: PeeringServiceSku): any {
  return { name: item["name"] };
}

export function peeringServiceSkuDeserializer(item: any): PeeringServiceSku {
  return {
    name: item["name"],
  };
}

/** The response of a PeeringService list operation. */
export interface _PeeringServiceListResult {
  /** The PeeringService items on this page */
  value: PeeringService[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _peeringServiceListResultDeserializer(item: any): _PeeringServiceListResult {
  return {
    value: peeringServiceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function peeringServiceArraySerializer(result: Array<PeeringService>): any[] {
  return result.map((item) => {
    return peeringServiceSerializer(item);
  });
}

export function peeringServiceArrayDeserializer(result: Array<PeeringService>): any[] {
  return result.map((item) => {
    return peeringServiceDeserializer(item);
  });
}

/** The paginated list of peering API operations. */
export interface _OperationListResult {
  /** The list of peering API operations. */
  value?: Operation[];
  /** The link to fetch the next page of peering API operations. */
  readonly nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: !item["value"] ? item["value"] : operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** The peering API operation. */
export interface Operation {
  /** The name of the operation. */
  readonly name?: string;
  /** The information related to the operation. */
  readonly display?: OperationDisplayInfo;
  /** The flag that indicates whether the operation applies to data plane. */
  readonly isDataAction?: boolean;
  /** Service specification payload. */
  readonly serviceSpecification?: ServiceSpecification;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayInfoDeserializer(item["display"]),
    isDataAction: item["isDataAction"],
    ...(!item["properties"]
      ? item["properties"]
      : _operationPropertiesDeserializer(item["properties"])),
  };
}

/** The information related to the operation. */
export interface OperationDisplayInfo {
  /** The name of the resource provider. */
  readonly provider?: string;
  /** The type of the resource. */
  readonly resource?: string;
  /** The name of the operation. */
  readonly operation?: string;
  /** The description of the operation. */
  readonly description?: string;
}

export function operationDisplayInfoDeserializer(item: any): OperationDisplayInfo {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The properties of the operation. */
export interface OperationProperties {
  /** Service specification payload. */
  readonly serviceSpecification?: ServiceSpecification;
}

export function operationPropertiesDeserializer(item: any): OperationProperties {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : serviceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** Service specification payload. */
export interface ServiceSpecification {
  /** Specifications of the Metrics for Azure Monitoring. */
  readonly metricSpecifications?: MetricSpecification[];
}

export function serviceSpecificationDeserializer(item: any): ServiceSpecification {
  return {
    metricSpecifications: !item["metricSpecifications"]
      ? item["metricSpecifications"]
      : metricSpecificationArrayDeserializer(item["metricSpecifications"]),
  };
}

export function metricSpecificationArrayDeserializer(result: Array<MetricSpecification>): any[] {
  return result.map((item) => {
    return metricSpecificationDeserializer(item);
  });
}

/** Specifications of the Metrics for Azure Monitoring. */
export interface MetricSpecification {
  /** Name of the metric. */
  readonly name?: string;
  /** Localized friendly display name of the metric. */
  readonly displayName?: string;
  /** Localized friendly description of the metric. */
  readonly displayDescription?: string;
  /** Unit that makes sense for the metric. */
  readonly unit?: string;
  /** Aggregation type will be set to one of the values: Average, Minimum, Maximum, Total, Count. */
  readonly aggregationType?: string;
  /** Supported time grain types for the metric. */
  readonly supportedTimeGrainTypes?: string[];
  /** Dimensions of the metric. */
  readonly dimensions?: MetricDimension[];
}

export function metricSpecificationDeserializer(item: any): MetricSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    displayDescription: item["displayDescription"],
    unit: item["unit"],
    aggregationType: item["aggregationType"],
    supportedTimeGrainTypes: !item["supportedTimeGrainTypes"]
      ? item["supportedTimeGrainTypes"]
      : item["supportedTimeGrainTypes"].map((p: any) => {
          return p;
        }),
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : metricDimensionArrayDeserializer(item["dimensions"]),
  };
}

export function metricDimensionArrayDeserializer(result: Array<MetricDimension>): any[] {
  return result.map((item) => {
    return metricDimensionDeserializer(item);
  });
}

/** Dimensions of the metric. */
export interface MetricDimension {
  /** Name of the dimension. */
  readonly name?: string;
  /** Localized friendly display name of the dimension. */
  readonly displayName?: string;
}

export function metricDimensionDeserializer(item: any): MetricDimension {
  return {
    name: item["name"],
    displayName: item["displayName"],
  };
}

/** The customer's ASN that is registered by the peering service provider. */
export interface PeeringRegisteredAsn extends ProxyResource {
  /** The customer's ASN from which traffic originates. */
  asn?: number;
  /** The peering service prefix key that is to be shared with the customer. */
  readonly peeringServicePrefixKey?: string;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function peeringRegisteredAsnSerializer(item: PeeringRegisteredAsn): any {
  return {
    properties: areAllPropsUndefined(item, ["asn"])
      ? undefined
      : _peeringRegisteredAsnPropertiesSerializer(item),
  };
}

export function peeringRegisteredAsnDeserializer(item: any): PeeringRegisteredAsn {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _peeringRegisteredAsnPropertiesDeserializer(item["properties"])),
  };
}

/** The properties that define a registered ASN. */
export interface PeeringRegisteredAsnProperties {
  /** The customer's ASN from which traffic originates. */
  asn?: number;
  /** The peering service prefix key that is to be shared with the customer. */
  readonly peeringServicePrefixKey?: string;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function peeringRegisteredAsnPropertiesSerializer(
  item: PeeringRegisteredAsnProperties,
): any {
  return { asn: item["asn"] };
}

export function peeringRegisteredAsnPropertiesDeserializer(
  item: any,
): PeeringRegisteredAsnProperties {
  return {
    asn: item["asn"],
    peeringServicePrefixKey: item["peeringServicePrefixKey"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a PeeringRegisteredAsn list operation. */
export interface _PeeringRegisteredAsnListResult {
  /** The PeeringRegisteredAsn items on this page */
  value: PeeringRegisteredAsn[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _peeringRegisteredAsnListResultDeserializer(
  item: any,
): _PeeringRegisteredAsnListResult {
  return {
    value: peeringRegisteredAsnArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function peeringRegisteredAsnArraySerializer(result: Array<PeeringRegisteredAsn>): any[] {
  return result.map((item) => {
    return peeringRegisteredAsnSerializer(item);
  });
}

export function peeringRegisteredAsnArrayDeserializer(result: Array<PeeringRegisteredAsn>): any[] {
  return result.map((item) => {
    return peeringRegisteredAsnDeserializer(item);
  });
}

/** The paginated list of received routes for the peering. */
export interface _PeeringReceivedRouteListResult {
  /** The PeeringReceivedRoute items on this page */
  value: PeeringReceivedRoute[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _peeringReceivedRouteListResultDeserializer(
  item: any,
): _PeeringReceivedRouteListResult {
  return {
    value: peeringReceivedRouteArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function peeringReceivedRouteArrayDeserializer(result: Array<PeeringReceivedRoute>): any[] {
  return result.map((item) => {
    return peeringReceivedRouteDeserializer(item);
  });
}

/** The properties that define a received route. */
export interface PeeringReceivedRoute {
  /** The prefix. */
  readonly prefix?: string;
  /** The next hop for the prefix. */
  readonly nextHop?: string;
  /** The AS path for the prefix. */
  readonly asPath?: string;
  /** The origin AS change information for the prefix. */
  readonly originAsValidationState?: string;
  /** The RPKI validation state for the prefix and origin AS that's listed in the AS path. */
  readonly rpkiValidationState?: string;
  /** The authority which holds the Route Origin Authorization record for the prefix, if any. */
  readonly trustAnchor?: string;
  /** The received timestamp associated with the prefix. */
  readonly receivedTimestamp?: string;
}

export function peeringReceivedRouteDeserializer(item: any): PeeringReceivedRoute {
  return {
    prefix: item["prefix"],
    nextHop: item["nextHop"],
    asPath: item["asPath"],
    originAsValidationState: item["originAsValidationState"],
    rpkiValidationState: item["rpkiValidationState"],
    trustAnchor: item["trustAnchor"],
    receivedTimestamp: item["receivedTimestamp"],
  };
}

/** The paginated list of RP unbilled prefixes. */
export interface _RpUnbilledPrefixListResult {
  /** The RpUnbilledPrefix items on this page */
  value: RpUnbilledPrefix[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _rpUnbilledPrefixListResultDeserializer(item: any): _RpUnbilledPrefixListResult {
  return {
    value: rpUnbilledPrefixArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function rpUnbilledPrefixArrayDeserializer(result: Array<RpUnbilledPrefix>): any[] {
  return result.map((item) => {
    return rpUnbilledPrefixDeserializer(item);
  });
}

/** The Routing Preference unbilled prefix */
export interface RpUnbilledPrefix {
  /** The prefix. */
  readonly prefix?: string;
  /** The Azure region. */
  readonly azureRegion?: string;
  /** The peer ASN. */
  readonly peerAsn?: number;
}

export function rpUnbilledPrefixDeserializer(item: any): RpUnbilledPrefix {
  return {
    prefix: item["prefix"],
    azureRegion: item["azureRegion"],
    peerAsn: item["peerAsn"],
  };
}

/** The customer's prefix that is registered by the peering service provider. */
export interface PeeringRegisteredPrefix extends ProxyResource {
  /** The customer's prefix from which traffic originates. */
  prefix?: string;
  /** The prefix validation state. */
  readonly prefixValidationState?: PrefixValidationState;
  /** The peering service prefix key that is to be shared with the customer. */
  readonly peeringServicePrefixKey?: string;
  /** The error message associated with the validation state, if any. */
  readonly errorMessage?: string;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function peeringRegisteredPrefixSerializer(item: PeeringRegisteredPrefix): any {
  return {
    properties: areAllPropsUndefined(item, ["prefix"])
      ? undefined
      : _peeringRegisteredPrefixPropertiesSerializer(item),
  };
}

export function peeringRegisteredPrefixDeserializer(item: any): PeeringRegisteredPrefix {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _peeringRegisteredPrefixPropertiesDeserializer(item["properties"])),
  };
}

/** The properties that define a registered prefix. */
export interface PeeringRegisteredPrefixProperties {
  /** The customer's prefix from which traffic originates. */
  prefix?: string;
  /** The prefix validation state. */
  readonly prefixValidationState?: PrefixValidationState;
  /** The peering service prefix key that is to be shared with the customer. */
  readonly peeringServicePrefixKey?: string;
  /** The error message associated with the validation state, if any. */
  readonly errorMessage?: string;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function peeringRegisteredPrefixPropertiesSerializer(
  item: PeeringRegisteredPrefixProperties,
): any {
  return { prefix: item["prefix"] };
}

export function peeringRegisteredPrefixPropertiesDeserializer(
  item: any,
): PeeringRegisteredPrefixProperties {
  return {
    prefix: item["prefix"],
    prefixValidationState: item["prefixValidationState"],
    peeringServicePrefixKey: item["peeringServicePrefixKey"],
    errorMessage: item["errorMessage"],
    provisioningState: item["provisioningState"],
  };
}

/** The prefix validation state. */
export enum KnownPrefixValidationState {
  /** None */
  None = "None",
  /** Invalid */
  Invalid = "Invalid",
  /** Verified */
  Verified = "Verified",
  /** Failed */
  Failed = "Failed",
  /** Pending */
  Pending = "Pending",
  /** Warning */
  Warning = "Warning",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * The prefix validation state. \
 * {@link KnownPrefixValidationState} can be used interchangeably with PrefixValidationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Invalid** \
 * **Verified** \
 * **Failed** \
 * **Pending** \
 * **Warning** \
 * **Unknown**
 */
export type PrefixValidationState = string;

/** The response of a PeeringRegisteredPrefix list operation. */
export interface _PeeringRegisteredPrefixListResult {
  /** The PeeringRegisteredPrefix items on this page */
  value: PeeringRegisteredPrefix[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _peeringRegisteredPrefixListResultDeserializer(
  item: any,
): _PeeringRegisteredPrefixListResult {
  return {
    value: peeringRegisteredPrefixArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function peeringRegisteredPrefixArraySerializer(
  result: Array<PeeringRegisteredPrefix>,
): any[] {
  return result.map((item) => {
    return peeringRegisteredPrefixSerializer(item);
  });
}

export function peeringRegisteredPrefixArrayDeserializer(
  result: Array<PeeringRegisteredPrefix>,
): any[] {
  return result.map((item) => {
    return peeringRegisteredPrefixDeserializer(item);
  });
}

/** The peering service prefix class. */
export interface PeeringServicePrefix extends ProxyResource {
  /** The prefix from which your traffic originates. */
  prefix?: string;
  /** The prefix validation state */
  readonly prefixValidationState?: PrefixValidationState;
  /** The prefix learned type */
  readonly learnedType?: LearnedType;
  /** The error message for validation state */
  readonly errorMessage?: string;
  /** The list of events for peering service prefix */
  readonly events?: PeeringServicePrefixEvent[];
  /** The peering service prefix key */
  peeringServicePrefixKey?: string;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function peeringServicePrefixSerializer(item: PeeringServicePrefix): any {
  return {
    properties: areAllPropsUndefined(item, ["prefix", "peeringServicePrefixKey"])
      ? undefined
      : _peeringServicePrefixPropertiesSerializer(item),
  };
}

export function peeringServicePrefixDeserializer(item: any): PeeringServicePrefix {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _peeringServicePrefixPropertiesDeserializer(item["properties"])),
  };
}

/** The peering service prefix properties class. */
export interface PeeringServicePrefixProperties {
  /** The prefix from which your traffic originates. */
  prefix?: string;
  /** The prefix validation state */
  readonly prefixValidationState?: PrefixValidationState;
  /** The prefix learned type */
  readonly learnedType?: LearnedType;
  /** The error message for validation state */
  readonly errorMessage?: string;
  /** The list of events for peering service prefix */
  readonly events?: PeeringServicePrefixEvent[];
  /** The peering service prefix key */
  peeringServicePrefixKey?: string;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function peeringServicePrefixPropertiesSerializer(
  item: PeeringServicePrefixProperties,
): any {
  return { prefix: item["prefix"], peeringServicePrefixKey: item["peeringServicePrefixKey"] };
}

export function peeringServicePrefixPropertiesDeserializer(
  item: any,
): PeeringServicePrefixProperties {
  return {
    prefix: item["prefix"],
    prefixValidationState: item["prefixValidationState"],
    learnedType: item["learnedType"],
    errorMessage: item["errorMessage"],
    events: !item["events"]
      ? item["events"]
      : peeringServicePrefixEventArrayDeserializer(item["events"]),
    peeringServicePrefixKey: item["peeringServicePrefixKey"],
    provisioningState: item["provisioningState"],
  };
}

/** The prefix learned type */
export enum KnownLearnedType {
  /** None */
  None = "None",
  /** ViaServiceProvider */
  ViaServiceProvider = "ViaServiceProvider",
  /** ViaSession */
  ViaSession = "ViaSession",
}

/**
 * The prefix learned type \
 * {@link KnownLearnedType} can be used interchangeably with LearnedType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **ViaServiceProvider** \
 * **ViaSession**
 */
export type LearnedType = string;

export function peeringServicePrefixEventArrayDeserializer(
  result: Array<PeeringServicePrefixEvent>,
): any[] {
  return result.map((item) => {
    return peeringServicePrefixEventDeserializer(item);
  });
}

/** The details of the event associated with a prefix. */
export interface PeeringServicePrefixEvent {
  /** The timestamp of the event associated with a prefix. */
  readonly eventTimestamp?: Date;
  /** The type of the event associated with a prefix. */
  readonly eventType?: string;
  /** The summary of the event associated with a prefix. */
  readonly eventSummary?: string;
  /** The level of the event associated with a prefix. */
  readonly eventLevel?: string;
  /** The description of the event associated with a prefix. */
  readonly eventDescription?: string;
}

export function peeringServicePrefixEventDeserializer(item: any): PeeringServicePrefixEvent {
  return {
    eventTimestamp: !item["eventTimestamp"]
      ? item["eventTimestamp"]
      : new Date(item["eventTimestamp"]),
    eventType: item["eventType"],
    eventSummary: item["eventSummary"],
    eventLevel: item["eventLevel"],
    eventDescription: item["eventDescription"],
  };
}

/** The response of a PeeringServicePrefix list operation. */
export interface _PeeringServicePrefixListResult {
  /** The PeeringServicePrefix items on this page */
  value: PeeringServicePrefix[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _peeringServicePrefixListResultDeserializer(
  item: any,
): _PeeringServicePrefixListResult {
  return {
    value: peeringServicePrefixArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function peeringServicePrefixArraySerializer(result: Array<PeeringServicePrefix>): any[] {
  return result.map((item) => {
    return peeringServicePrefixSerializer(item);
  });
}

export function peeringServicePrefixArrayDeserializer(result: Array<PeeringServicePrefix>): any[] {
  return result.map((item) => {
    return peeringServicePrefixDeserializer(item);
  });
}

/** The response of a CdnPeeringPrefix list operation. */
export interface _CdnPeeringPrefixListResult {
  /** The CdnPeeringPrefix items on this page */
  value: CdnPeeringPrefix[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _cdnPeeringPrefixListResultDeserializer(item: any): _CdnPeeringPrefixListResult {
  return {
    value: cdnPeeringPrefixArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cdnPeeringPrefixArrayDeserializer(result: Array<CdnPeeringPrefix>): any[] {
  return result.map((item) => {
    return cdnPeeringPrefixDeserializer(item);
  });
}

/** The CDN peering prefix */
export interface CdnPeeringPrefix extends Resource {
  /** The prefix. */
  readonly prefix?: string;
  /** The Azure region. */
  readonly azureRegion?: string;
  /** The Azure service. */
  readonly azureService?: string;
  /** The flag that indicates whether or not this is the primary region. */
  readonly isPrimaryRegion?: boolean;
  /** The BGP Community */
  readonly bgpCommunity?: string;
}

export function cdnPeeringPrefixDeserializer(item: any): CdnPeeringPrefix {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _cdnPeeringPrefixPropertiesDeserializer(item["properties"])),
  };
}

/** The properties that define a CDN peering prefix */
export interface CdnPeeringPrefixProperties {
  /** The prefix. */
  readonly prefix?: string;
  /** The Azure region. */
  readonly azureRegion?: string;
  /** The Azure service. */
  readonly azureService?: string;
  /** The flag that indicates whether or not this is the primary region. */
  readonly isPrimaryRegion?: boolean;
  /** The BGP Community */
  readonly bgpCommunity?: string;
}

export function cdnPeeringPrefixPropertiesDeserializer(item: any): CdnPeeringPrefixProperties {
  return {
    prefix: item["prefix"],
    azureRegion: item["azureRegion"],
    azureService: item["azureService"],
    isPrimaryRegion: item["isPrimaryRegion"],
    bgpCommunity: item["bgpCommunity"],
  };
}

/** Looking glass output model */
export interface LookingGlassOutput {
  /** Invoked command */
  command?: Command;
  /** Output of the command */
  output?: string;
}

export function lookingGlassOutputDeserializer(item: any): LookingGlassOutput {
  return {
    command: item["command"],
    output: item["output"],
  };
}

/** Invoked command */
export enum KnownCommand {
  /** Traceroute */
  Traceroute = "Traceroute",
  /** Ping */
  Ping = "Ping",
  /** BgpRoute */
  BgpRoute = "BgpRoute",
}

/**
 * Invoked command \
 * {@link KnownCommand} can be used interchangeably with Command,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Traceroute** \
 * **Ping** \
 * **BgpRoute**
 */
export type Command = string;

/** The response of a PeeringLocation list operation. */
export interface _PeeringLocationListResult {
  /** The PeeringLocation items on this page */
  value: PeeringLocation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _peeringLocationListResultDeserializer(item: any): _PeeringLocationListResult {
  return {
    value: peeringLocationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function peeringLocationArrayDeserializer(result: Array<PeeringLocation>): any[] {
  return result.map((item) => {
    return peeringLocationDeserializer(item);
  });
}

/** Peering location is where connectivity could be established to the Microsoft Cloud Edge. */
export interface PeeringLocation extends Resource {
  /** The kind of peering that the peering location supports. */
  kind?: Kind;
  /** The properties that define a direct peering location. */
  direct?: PeeringLocationPropertiesDirect;
  /** The properties that define an exchange peering location. */
  exchange?: PeeringLocationPropertiesExchange;
  /** The name of the peering location. */
  peeringLocation?: string;
  /** The country in which the peering location exists. */
  country?: string;
  /** The Azure region associated with the peering location. */
  azureRegion?: string;
}

export function peeringLocationDeserializer(item: any): PeeringLocation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
    ...(!item["properties"]
      ? item["properties"]
      : _peeringLocationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties that define a peering location. */
export interface PeeringLocationProperties {
  /** The properties that define a direct peering location. */
  direct?: PeeringLocationPropertiesDirect;
  /** The properties that define an exchange peering location. */
  exchange?: PeeringLocationPropertiesExchange;
  /** The name of the peering location. */
  peeringLocation?: string;
  /** The country in which the peering location exists. */
  country?: string;
  /** The Azure region associated with the peering location. */
  azureRegion?: string;
}

export function peeringLocationPropertiesDeserializer(item: any): PeeringLocationProperties {
  return {
    direct: !item["direct"]
      ? item["direct"]
      : peeringLocationPropertiesDirectDeserializer(item["direct"]),
    exchange: !item["exchange"]
      ? item["exchange"]
      : peeringLocationPropertiesExchangeDeserializer(item["exchange"]),
    peeringLocation: item["peeringLocation"],
    country: item["country"],
    azureRegion: item["azureRegion"],
  };
}

/** The properties that define a direct peering location. */
export interface PeeringLocationPropertiesDirect {
  /** The list of direct peering facilities at the peering location. */
  peeringFacilities?: DirectPeeringFacility[];
  /** The list of bandwidth offers available at the peering location. */
  bandwidthOffers?: PeeringBandwidthOffer[];
}

export function peeringLocationPropertiesDirectDeserializer(
  item: any,
): PeeringLocationPropertiesDirect {
  return {
    peeringFacilities: !item["peeringFacilities"]
      ? item["peeringFacilities"]
      : directPeeringFacilityArrayDeserializer(item["peeringFacilities"]),
    bandwidthOffers: !item["bandwidthOffers"]
      ? item["bandwidthOffers"]
      : peeringBandwidthOfferArrayDeserializer(item["bandwidthOffers"]),
  };
}

export function directPeeringFacilityArrayDeserializer(
  result: Array<DirectPeeringFacility>,
): any[] {
  return result.map((item) => {
    return directPeeringFacilityDeserializer(item);
  });
}

/** The properties that define a direct peering facility. */
export interface DirectPeeringFacility {
  /** The address of the direct peering facility. */
  address?: string;
  /** The type of the direct peering. */
  directPeeringType?: DirectPeeringType;
  /** The PeeringDB.com ID of the facility. */
  peeringDBFacilityId?: number;
  /** The PeeringDB.com URL of the facility. */
  peeringDBFacilityLink?: string;
}

export function directPeeringFacilityDeserializer(item: any): DirectPeeringFacility {
  return {
    address: item["address"],
    directPeeringType: item["directPeeringType"],
    peeringDBFacilityId: item["peeringDBFacilityId"],
    peeringDBFacilityLink: item["peeringDBFacilityLink"],
  };
}

export function peeringBandwidthOfferArrayDeserializer(
  result: Array<PeeringBandwidthOffer>,
): any[] {
  return result.map((item) => {
    return peeringBandwidthOfferDeserializer(item);
  });
}

/** The properties that define a peering bandwidth offer. */
export interface PeeringBandwidthOffer {
  /** The name of the bandwidth offer. */
  offerName?: string;
  /** The value of the bandwidth offer in Mbps. */
  valueInMbps?: number;
}

export function peeringBandwidthOfferDeserializer(item: any): PeeringBandwidthOffer {
  return {
    offerName: item["offerName"],
    valueInMbps: item["valueInMbps"],
  };
}

/** The properties that define an exchange peering location. */
export interface PeeringLocationPropertiesExchange {
  /** The list of exchange peering facilities at the peering location. */
  peeringFacilities?: ExchangePeeringFacility[];
}

export function peeringLocationPropertiesExchangeDeserializer(
  item: any,
): PeeringLocationPropertiesExchange {
  return {
    peeringFacilities: !item["peeringFacilities"]
      ? item["peeringFacilities"]
      : exchangePeeringFacilityArrayDeserializer(item["peeringFacilities"]),
  };
}

export function exchangePeeringFacilityArrayDeserializer(
  result: Array<ExchangePeeringFacility>,
): any[] {
  return result.map((item) => {
    return exchangePeeringFacilityDeserializer(item);
  });
}

/** The properties that define an exchange peering facility. */
export interface ExchangePeeringFacility {
  /** The name of the exchange peering facility. */
  exchangeName?: string;
  /** The bandwidth of the connection between Microsoft and the exchange peering facility. */
  bandwidthInMbps?: number;
  /** The IPv4 address of Microsoft at the exchange peering facility. */
  microsoftIPv4Address?: string;
  /** The IPv6 address of Microsoft at the exchange peering facility. */
  microsoftIPv6Address?: string;
  /** The IPv4 prefixes associated with the exchange peering facility. */
  facilityIPv4Prefix?: string;
  /** The IPv6 prefixes associated with the exchange peering facility. */
  facilityIPv6Prefix?: string;
  /** The PeeringDB.com ID of the facility. */
  peeringDBFacilityId?: number;
  /** The PeeringDB.com URL of the facility. */
  peeringDBFacilityLink?: string;
}

export function exchangePeeringFacilityDeserializer(item: any): ExchangePeeringFacility {
  return {
    exchangeName: item["exchangeName"],
    bandwidthInMbps: item["bandwidthInMbps"],
    microsoftIPv4Address: item["microsoftIPv4Address"],
    microsoftIPv6Address: item["microsoftIPv6Address"],
    facilityIPv4Prefix: item["facilityIPv4Prefix"],
    facilityIPv6Prefix: item["facilityIPv6Prefix"],
    peeringDBFacilityId: item["peeringDBFacilityId"],
    peeringDBFacilityLink: item["peeringDBFacilityLink"],
  };
}

/** The response of a PeeringServiceCountry list operation. */
export interface _PeeringServiceCountryListResult {
  /** The PeeringServiceCountry items on this page */
  value: PeeringServiceCountry[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _peeringServiceCountryListResultDeserializer(
  item: any,
): _PeeringServiceCountryListResult {
  return {
    value: peeringServiceCountryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function peeringServiceCountryArrayDeserializer(
  result: Array<PeeringServiceCountry>,
): any[] {
  return result.map((item) => {
    return peeringServiceCountryDeserializer(item);
  });
}

/** The peering service country. */
export interface PeeringServiceCountry extends Resource {}

export function peeringServiceCountryDeserializer(item: any): PeeringServiceCountry {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The response of a PeeringServiceLocation list operation. */
export interface _PeeringServiceLocationListResult {
  /** The PeeringServiceLocation items on this page */
  value: PeeringServiceLocation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _peeringServiceLocationListResultDeserializer(
  item: any,
): _PeeringServiceLocationListResult {
  return {
    value: peeringServiceLocationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function peeringServiceLocationArrayDeserializer(
  result: Array<PeeringServiceLocation>,
): any[] {
  return result.map((item) => {
    return peeringServiceLocationDeserializer(item);
  });
}

/** The peering service location. */
export interface PeeringServiceLocation extends Resource {
  /** Country of the customer */
  country?: string;
  /** State of the customer */
  state?: string;
  /** Azure region for the location */
  azureRegion?: string;
}

export function peeringServiceLocationDeserializer(item: any): PeeringServiceLocation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _peeringServiceLocationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties that define connectivity to the Peering Service Location. */
export interface PeeringServiceLocationProperties {
  /** Country of the customer */
  country?: string;
  /** State of the customer */
  state?: string;
  /** Azure region for the location */
  azureRegion?: string;
}

export function peeringServiceLocationPropertiesDeserializer(
  item: any,
): PeeringServiceLocationProperties {
  return {
    country: item["country"],
    state: item["state"],
    azureRegion: item["azureRegion"],
  };
}

/** The response of a PeeringServiceProvider list operation. */
export interface _PeeringServiceProviderListResult {
  /** The PeeringServiceProvider items on this page */
  value: PeeringServiceProvider[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _peeringServiceProviderListResultDeserializer(
  item: any,
): _PeeringServiceProviderListResult {
  return {
    value: peeringServiceProviderArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function peeringServiceProviderArrayDeserializer(
  result: Array<PeeringServiceProvider>,
): any[] {
  return result.map((item) => {
    return peeringServiceProviderDeserializer(item);
  });
}

/** PeeringService provider */
export interface PeeringServiceProvider extends Resource {
  /** The name of the service provider. */
  serviceProviderName?: string;
  /** The list of locations at which the service provider peers with Microsoft. */
  peeringLocations?: string[];
}

export function peeringServiceProviderDeserializer(item: any): PeeringServiceProvider {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _peeringServiceProviderPropertiesDeserializer(item["properties"])),
  };
}

/** The properties that define connectivity to the Peering Service Provider. */
export interface PeeringServiceProviderProperties {
  /** The name of the service provider. */
  serviceProviderName?: string;
  /** The list of locations at which the service provider peers with Microsoft. */
  peeringLocations?: string[];
}

export function peeringServiceProviderPropertiesDeserializer(
  item: any,
): PeeringServiceProviderProperties {
  return {
    serviceProviderName: item["serviceProviderName"],
    peeringLocations: !item["peeringLocations"]
      ? item["peeringLocations"]
      : item["peeringLocations"].map((p: any) => {
          return p;
        }),
  };
}

/** Response for checking service provider availability */
export enum KnownEnum0 {
  /** available */
  Available = "Available",
  /** unavailable */
  Unavailable = "Unavailable",
}

/**
 * Response for checking service provider availability \
 * {@link KnownEnum0} can be used interchangeably with Enum0,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Available**: available \
 * **Unavailable**: unavailable
 */
export type Enum0 = string;

/** Known values of {@link LegacyPeeringsKind} that the service accepts. */
export enum KnownLegacyPeeringsKind {
  /** Direct */
  Direct = "Direct",
  /** Exchange */
  Exchange = "Exchange",
}

/** Type of LegacyPeeringsKind */
export type LegacyPeeringsKind = string;

/** Known values of {@link LookingGlassCommand} that the service accepts. */
export enum KnownLookingGlassCommand {
  /** Traceroute */
  Traceroute = "Traceroute",
  /** Ping */
  Ping = "Ping",
  /** BgpRoute */
  BgpRoute = "BgpRoute",
}

/** Type of LookingGlassCommand */
export type LookingGlassCommand = string;

/** Known values of {@link LookingGlassSourceType} that the service accepts. */
export enum KnownLookingGlassSourceType {
  /** EdgeSite */
  EdgeSite = "EdgeSite",
  /** AzureRegion */
  AzureRegion = "AzureRegion",
}

/** Type of LookingGlassSourceType */
export type LookingGlassSourceType = string;

/** Known values of {@link PeeringLocationsKind} that the service accepts. */
export enum KnownPeeringLocationsKind {
  /** Direct */
  Direct = "Direct",
  /** Exchange */
  Exchange = "Exchange",
}

/** Type of PeeringLocationsKind */
export type PeeringLocationsKind = string;

/** Known values of {@link PeeringLocationsDirectPeeringType} that the service accepts. */
export enum KnownPeeringLocationsDirectPeeringType {
  /** Edge */
  Edge = "Edge",
  /** Transit */
  Transit = "Transit",
  /** Cdn */
  Cdn = "Cdn",
  /** Internal */
  Internal = "Internal",
  /** Ix */
  Ix = "Ix",
  /** IxRs */
  IxRs = "IxRs",
  /** Voice */
  Voice = "Voice",
  /** EdgeZoneForOperators */
  EdgeZoneForOperators = "EdgeZoneForOperators",
  /** PeerProp */
  PeerProp = "PeerProp",
}

/** Type of PeeringLocationsDirectPeeringType */
export type PeeringLocationsDirectPeeringType = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-05-01 API version. */
  V20250501 = "2025-05-01",
}

export function _peerAsnPropertiesSerializer(item: PeerAsn): any {
  return {
    peerAsn: item["peerAsn"],
    peerContactDetail: !item["peerContactDetail"]
      ? item["peerContactDetail"]
      : contactDetailArraySerializer(item["peerContactDetail"]),
    peerName: item["peerName"],
  };
}

export function _peerAsnPropertiesDeserializer(item: any) {
  return {
    peerAsn: item["peerAsn"],
    peerContactDetail: !item["peerContactDetail"]
      ? item["peerContactDetail"]
      : contactDetailArrayDeserializer(item["peerContactDetail"]),
    peerName: item["peerName"],
    validationState: item["validationState"],
    errorMessage: item["errorMessage"],
  };
}

export function _peeringPropertiesSerializer(item: Peering): any {
  return {
    direct: !item["direct"] ? item["direct"] : peeringPropertiesDirectSerializer(item["direct"]),
    exchange: !item["exchange"]
      ? item["exchange"]
      : peeringPropertiesExchangeSerializer(item["exchange"]),
    connectivityProbes: !item["connectivityProbes"]
      ? item["connectivityProbes"]
      : connectivityProbeArraySerializer(item["connectivityProbes"]),
    peeringLocation: item["peeringLocation"],
  };
}

export function _peeringPropertiesDeserializer(item: any) {
  return {
    direct: !item["direct"] ? item["direct"] : peeringPropertiesDirectDeserializer(item["direct"]),
    exchange: !item["exchange"]
      ? item["exchange"]
      : peeringPropertiesExchangeDeserializer(item["exchange"]),
    connectivityProbes: !item["connectivityProbes"]
      ? item["connectivityProbes"]
      : connectivityProbeArrayDeserializer(item["connectivityProbes"]),
    peeringLocation: item["peeringLocation"],
    provisioningState: item["provisioningState"],
  };
}

export function _connectionMonitorTestPropertiesSerializer(item: ConnectionMonitorTest): any {
  return {
    sourceAgent: item["sourceAgent"],
    destination: item["destination"],
    destinationPort: item["destinationPort"],
    testFrequencyInSec: item["testFrequencyInSec"],
  };
}

export function _connectionMonitorTestPropertiesDeserializer(item: any) {
  return {
    sourceAgent: item["sourceAgent"],
    destination: item["destination"],
    destinationPort: item["destinationPort"],
    testFrequencyInSec: item["testFrequencyInSec"],
    isTestSuccessful: item["isTestSuccessful"],
    path: !item["path"]
      ? item["path"]
      : item["path"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

export function _peeringServicePropertiesSerializer(item: PeeringService): any {
  return {
    peeringServiceLocation: item["peeringServiceLocation"],
    peeringServiceProvider: item["peeringServiceProvider"],
    providerPrimaryPeeringLocation: item["providerPrimaryPeeringLocation"],
    providerBackupPeeringLocation: item["providerBackupPeeringLocation"],
    logAnalyticsWorkspaceProperties: !item["logAnalyticsWorkspaceProperties"]
      ? item["logAnalyticsWorkspaceProperties"]
      : logAnalyticsWorkspacePropertiesSerializer(item["logAnalyticsWorkspaceProperties"]),
  };
}

export function _peeringServicePropertiesDeserializer(item: any) {
  return {
    peeringServiceLocation: item["peeringServiceLocation"],
    peeringServiceProvider: item["peeringServiceProvider"],
    provisioningState: item["provisioningState"],
    providerPrimaryPeeringLocation: item["providerPrimaryPeeringLocation"],
    providerBackupPeeringLocation: item["providerBackupPeeringLocation"],
    logAnalyticsWorkspaceProperties: !item["logAnalyticsWorkspaceProperties"]
      ? item["logAnalyticsWorkspaceProperties"]
      : logAnalyticsWorkspacePropertiesDeserializer(item["logAnalyticsWorkspaceProperties"]),
  };
}

export function _operationPropertiesDeserializer(item: any) {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : serviceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

export function _peeringRegisteredAsnPropertiesSerializer(item: PeeringRegisteredAsn): any {
  return { asn: item["asn"] };
}

export function _peeringRegisteredAsnPropertiesDeserializer(item: any) {
  return {
    asn: item["asn"],
    peeringServicePrefixKey: item["peeringServicePrefixKey"],
    provisioningState: item["provisioningState"],
  };
}

export function _peeringRegisteredPrefixPropertiesSerializer(item: PeeringRegisteredPrefix): any {
  return { prefix: item["prefix"] };
}

export function _peeringRegisteredPrefixPropertiesDeserializer(item: any) {
  return {
    prefix: item["prefix"],
    prefixValidationState: item["prefixValidationState"],
    peeringServicePrefixKey: item["peeringServicePrefixKey"],
    errorMessage: item["errorMessage"],
    provisioningState: item["provisioningState"],
  };
}

export function _peeringServicePrefixPropertiesSerializer(item: PeeringServicePrefix): any {
  return { prefix: item["prefix"], peeringServicePrefixKey: item["peeringServicePrefixKey"] };
}

export function _peeringServicePrefixPropertiesDeserializer(item: any) {
  return {
    prefix: item["prefix"],
    prefixValidationState: item["prefixValidationState"],
    learnedType: item["learnedType"],
    errorMessage: item["errorMessage"],
    events: !item["events"]
      ? item["events"]
      : peeringServicePrefixEventArrayDeserializer(item["events"]),
    peeringServicePrefixKey: item["peeringServicePrefixKey"],
    provisioningState: item["provisioningState"],
  };
}

export function _cdnPeeringPrefixPropertiesDeserializer(item: any) {
  return {
    prefix: item["prefix"],
    azureRegion: item["azureRegion"],
    azureService: item["azureService"],
    isPrimaryRegion: item["isPrimaryRegion"],
    bgpCommunity: item["bgpCommunity"],
  };
}

export function _peeringLocationPropertiesDeserializer(item: any) {
  return {
    direct: !item["direct"]
      ? item["direct"]
      : peeringLocationPropertiesDirectDeserializer(item["direct"]),
    exchange: !item["exchange"]
      ? item["exchange"]
      : peeringLocationPropertiesExchangeDeserializer(item["exchange"]),
    peeringLocation: item["peeringLocation"],
    country: item["country"],
    azureRegion: item["azureRegion"],
  };
}

export function _peeringServiceLocationPropertiesDeserializer(item: any) {
  return {
    country: item["country"],
    state: item["state"],
    azureRegion: item["azureRegion"],
  };
}

export function _peeringServiceProviderPropertiesDeserializer(item: any) {
  return {
    serviceProviderName: item["serviceProviderName"],
    peeringLocations: !item["peeringLocations"]
      ? item["peeringLocations"]
      : item["peeringLocations"].map((p: any) => {
          return p;
        }),
  };
}

export type CheckServiceProviderAvailabilityResponse = { body: Enum0 };
