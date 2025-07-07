// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Describes a DNS record set (a collection of DNS records with the same name and type) in a Private DNS zone. */
export interface RecordSet extends ProxyResource {
  /** The ETag of the record set. */
  etag?: string;
  /** The properties of the record set. */
  properties?: RecordSetProperties;
}

export function recordSetSerializer(item: RecordSet): any {
  return {
    etag: item["etag"],
    properties: !item["properties"]
      ? item["properties"]
      : recordSetPropertiesSerializer(item["properties"]),
  };
}

export function recordSetDeserializer(item: any): RecordSet {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    etag: item["etag"],
    properties: !item["properties"]
      ? item["properties"]
      : recordSetPropertiesDeserializer(item["properties"]),
  };
}

/** Represents the properties of the records in the record set. */
export interface RecordSetProperties {
  /** The metadata attached to the record set. */
  metadata?: Record<string, string>;
  /** The TTL (time-to-live) of the records in the record set. */
  ttl?: number;
  /** Fully qualified domain name of the record set. */
  readonly fqdn?: string;
  /** Is the record set auto-registered in the Private DNS zone through a virtual network link? */
  readonly isAutoRegistered?: boolean;
  /** The list of A records in the record set. */
  aRecords?: ARecord[];
  /** The list of AAAA records in the record set. */
  aaaaRecords?: AaaaRecord[];
  /** The CNAME record in the record set. */
  cnameRecord?: CnameRecord;
  /** The list of MX records in the record set. */
  mxRecords?: MxRecord[];
  /** The list of PTR records in the record set. */
  ptrRecords?: PtrRecord[];
  /** The SOA record in the record set. */
  soaRecord?: SoaRecord;
  /** The list of SRV records in the record set. */
  srvRecords?: SrvRecord[];
  /** The list of TXT records in the record set. */
  txtRecords?: TxtRecord[];
}

export function recordSetPropertiesSerializer(item: RecordSetProperties): any {
  return {
    metadata: item["metadata"],
    ttl: item["ttl"],
    aRecords: !item["aRecords"] ? item["aRecords"] : aRecordArraySerializer(item["aRecords"]),
    aaaaRecords: !item["aaaaRecords"]
      ? item["aaaaRecords"]
      : aaaaRecordArraySerializer(item["aaaaRecords"]),
    cnameRecord: !item["cnameRecord"]
      ? item["cnameRecord"]
      : cnameRecordSerializer(item["cnameRecord"]),
    mxRecords: !item["mxRecords"] ? item["mxRecords"] : mxRecordArraySerializer(item["mxRecords"]),
    ptrRecords: !item["ptrRecords"]
      ? item["ptrRecords"]
      : ptrRecordArraySerializer(item["ptrRecords"]),
    soaRecord: !item["soaRecord"] ? item["soaRecord"] : soaRecordSerializer(item["soaRecord"]),
    srvRecords: !item["srvRecords"]
      ? item["srvRecords"]
      : srvRecordArraySerializer(item["srvRecords"]),
    txtRecords: !item["txtRecords"]
      ? item["txtRecords"]
      : txtRecordArraySerializer(item["txtRecords"]),
  };
}

export function recordSetPropertiesDeserializer(item: any): RecordSetProperties {
  return {
    metadata: item["metadata"],
    ttl: item["ttl"],
    fqdn: item["fqdn"],
    isAutoRegistered: item["isAutoRegistered"],
    aRecords: !item["aRecords"] ? item["aRecords"] : aRecordArrayDeserializer(item["aRecords"]),
    aaaaRecords: !item["aaaaRecords"]
      ? item["aaaaRecords"]
      : aaaaRecordArrayDeserializer(item["aaaaRecords"]),
    cnameRecord: !item["cnameRecord"]
      ? item["cnameRecord"]
      : cnameRecordDeserializer(item["cnameRecord"]),
    mxRecords: !item["mxRecords"]
      ? item["mxRecords"]
      : mxRecordArrayDeserializer(item["mxRecords"]),
    ptrRecords: !item["ptrRecords"]
      ? item["ptrRecords"]
      : ptrRecordArrayDeserializer(item["ptrRecords"]),
    soaRecord: !item["soaRecord"] ? item["soaRecord"] : soaRecordDeserializer(item["soaRecord"]),
    srvRecords: !item["srvRecords"]
      ? item["srvRecords"]
      : srvRecordArrayDeserializer(item["srvRecords"]),
    txtRecords: !item["txtRecords"]
      ? item["txtRecords"]
      : txtRecordArrayDeserializer(item["txtRecords"]),
  };
}

export function aRecordArraySerializer(result: Array<ARecord>): any[] {
  return result.map((item) => {
    return aRecordSerializer(item);
  });
}

export function aRecordArrayDeserializer(result: Array<ARecord>): any[] {
  return result.map((item) => {
    return aRecordDeserializer(item);
  });
}

/** An A record. */
export interface ARecord {
  /** The IPv4 address of this A record. */
  ipv4Address?: string;
}

export function aRecordSerializer(item: ARecord): any {
  return { ipv4Address: item["ipv4Address"] };
}

export function aRecordDeserializer(item: any): ARecord {
  return {
    ipv4Address: item["ipv4Address"],
  };
}

export function aaaaRecordArraySerializer(result: Array<AaaaRecord>): any[] {
  return result.map((item) => {
    return aaaaRecordSerializer(item);
  });
}

export function aaaaRecordArrayDeserializer(result: Array<AaaaRecord>): any[] {
  return result.map((item) => {
    return aaaaRecordDeserializer(item);
  });
}

/** An AAAA record. */
export interface AaaaRecord {
  /** The IPv6 address of this AAAA record. */
  ipv6Address?: string;
}

export function aaaaRecordSerializer(item: AaaaRecord): any {
  return { ipv6Address: item["ipv6Address"] };
}

export function aaaaRecordDeserializer(item: any): AaaaRecord {
  return {
    ipv6Address: item["ipv6Address"],
  };
}

/** A CNAME record. */
export interface CnameRecord {
  /** The canonical name for this CNAME record. */
  cname?: string;
}

export function cnameRecordSerializer(item: CnameRecord): any {
  return { cname: item["cname"] };
}

export function cnameRecordDeserializer(item: any): CnameRecord {
  return {
    cname: item["cname"],
  };
}

export function mxRecordArraySerializer(result: Array<MxRecord>): any[] {
  return result.map((item) => {
    return mxRecordSerializer(item);
  });
}

export function mxRecordArrayDeserializer(result: Array<MxRecord>): any[] {
  return result.map((item) => {
    return mxRecordDeserializer(item);
  });
}

/** An MX record. */
export interface MxRecord {
  /** The preference value for this MX record. */
  preference?: number;
  /** The domain name of the mail host for this MX record. */
  exchange?: string;
}

export function mxRecordSerializer(item: MxRecord): any {
  return { preference: item["preference"], exchange: item["exchange"] };
}

export function mxRecordDeserializer(item: any): MxRecord {
  return {
    preference: item["preference"],
    exchange: item["exchange"],
  };
}

export function ptrRecordArraySerializer(result: Array<PtrRecord>): any[] {
  return result.map((item) => {
    return ptrRecordSerializer(item);
  });
}

export function ptrRecordArrayDeserializer(result: Array<PtrRecord>): any[] {
  return result.map((item) => {
    return ptrRecordDeserializer(item);
  });
}

/** A PTR record. */
export interface PtrRecord {
  /** The PTR target domain name for this PTR record. */
  ptrdname?: string;
}

export function ptrRecordSerializer(item: PtrRecord): any {
  return { ptrdname: item["ptrdname"] };
}

export function ptrRecordDeserializer(item: any): PtrRecord {
  return {
    ptrdname: item["ptrdname"],
  };
}

/** An SOA record. */
export interface SoaRecord {
  /** The domain name of the authoritative name server for this SOA record. */
  host?: string;
  /** The email contact for this SOA record. */
  email?: string;
  /** The serial number for this SOA record. */
  serialNumber?: number;
  /** The refresh value for this SOA record. */
  refreshTime?: number;
  /** The retry time for this SOA record. */
  retryTime?: number;
  /** The expire time for this SOA record. */
  expireTime?: number;
  /** The minimum value for this SOA record. By convention this is used to determine the negative caching duration. */
  minimumTtl?: number;
}

export function soaRecordSerializer(item: SoaRecord): any {
  return {
    host: item["host"],
    email: item["email"],
    serialNumber: item["serialNumber"],
    refreshTime: item["refreshTime"],
    retryTime: item["retryTime"],
    expireTime: item["expireTime"],
    minimumTtl: item["minimumTtl"],
  };
}

export function soaRecordDeserializer(item: any): SoaRecord {
  return {
    host: item["host"],
    email: item["email"],
    serialNumber: item["serialNumber"],
    refreshTime: item["refreshTime"],
    retryTime: item["retryTime"],
    expireTime: item["expireTime"],
    minimumTtl: item["minimumTtl"],
  };
}

export function srvRecordArraySerializer(result: Array<SrvRecord>): any[] {
  return result.map((item) => {
    return srvRecordSerializer(item);
  });
}

export function srvRecordArrayDeserializer(result: Array<SrvRecord>): any[] {
  return result.map((item) => {
    return srvRecordDeserializer(item);
  });
}

/** An SRV record. */
export interface SrvRecord {
  /** The priority value for this SRV record. */
  priority?: number;
  /** The weight value for this SRV record. */
  weight?: number;
  /** The port value for this SRV record. */
  port?: number;
  /** The target domain name for this SRV record. */
  target?: string;
}

export function srvRecordSerializer(item: SrvRecord): any {
  return {
    priority: item["priority"],
    weight: item["weight"],
    port: item["port"],
    target: item["target"],
  };
}

export function srvRecordDeserializer(item: any): SrvRecord {
  return {
    priority: item["priority"],
    weight: item["weight"],
    port: item["port"],
    target: item["target"],
  };
}

export function txtRecordArraySerializer(result: Array<TxtRecord>): any[] {
  return result.map((item) => {
    return txtRecordSerializer(item);
  });
}

export function txtRecordArrayDeserializer(result: Array<TxtRecord>): any[] {
  return result.map((item) => {
    return txtRecordDeserializer(item);
  });
}

/** A TXT record. */
export interface TxtRecord {
  /** The text value of this TXT record. */
  value?: string[];
}

export function txtRecordSerializer(item: TxtRecord): any {
  return {
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
  };
}

export function txtRecordDeserializer(item: any): TxtRecord {
  return {
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
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
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

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

/** The response of a RecordSet list operation. */
export interface _RecordSetListResult {
  /** The RecordSet items on this page */
  value: RecordSet[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _recordSetListResultDeserializer(item: any): _RecordSetListResult {
  return {
    value: recordSetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function recordSetArraySerializer(result: Array<RecordSet>): any[] {
  return result.map((item) => {
    return recordSetSerializer(item);
  });
}

export function recordSetArrayDeserializer(result: Array<RecordSet>): any[] {
  return result.map((item) => {
    return recordSetDeserializer(item);
  });
}

/** Describes a Private DNS zone. */
export interface PrivateZone extends ProxyResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The Azure Region where the resource lives */
  location?: string;
  /** The ETag of the zone. */
  etag?: string;
  /** Properties of the Private DNS zone. */
  properties?: PrivateZoneProperties;
}

export function privateZoneSerializer(item: PrivateZone): any {
  return {
    tags: item["tags"],
    location: item["location"],
    etag: item["etag"],
    properties: !item["properties"]
      ? item["properties"]
      : privateZonePropertiesSerializer(item["properties"]),
  };
}

export function privateZoneDeserializer(item: any): PrivateZone {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    tags: item["tags"],
    location: item["location"],
    etag: item["etag"],
    properties: !item["properties"]
      ? item["properties"]
      : privateZonePropertiesDeserializer(item["properties"]),
  };
}

/** Represents the properties of the Private DNS zone. */
export interface PrivateZoneProperties {
  /** The maximum number of record sets that can be created in this Private DNS zone. This is a read-only property and any attempt to set this value will be ignored. */
  readonly maxNumberOfRecordSets?: number;
  /** The current number of record sets in this Private DNS zone. This is a read-only property and any attempt to set this value will be ignored. */
  readonly numberOfRecordSets?: number;
  /** The maximum number of virtual networks that can be linked to this Private DNS zone. This is a read-only property and any attempt to set this value will be ignored. */
  readonly maxNumberOfVirtualNetworkLinks?: number;
  /** The current number of virtual networks that are linked to this Private DNS zone. This is a read-only property and any attempt to set this value will be ignored. */
  readonly numberOfVirtualNetworkLinks?: number;
  /** The maximum number of virtual networks that can be linked to this Private DNS zone with registration enabled. This is a read-only property and any attempt to set this value will be ignored. */
  readonly maxNumberOfVirtualNetworkLinksWithRegistration?: number;
  /** The current number of virtual networks that are linked to this Private DNS zone with registration enabled. This is a read-only property and any attempt to set this value will be ignored. */
  readonly numberOfVirtualNetworkLinksWithRegistration?: number;
  /** The provisioning state of the resource. This is a read-only property and any attempt to set this value will be ignored. */
  readonly provisioningState?: ProvisioningState;
  /** Private zone internal Id */
  readonly internalId?: string;
}

export function privateZonePropertiesSerializer(item: PrivateZoneProperties): any {
  return item;
}

export function privateZonePropertiesDeserializer(item: any): PrivateZoneProperties {
  return {
    maxNumberOfRecordSets: item["maxNumberOfRecordSets"],
    numberOfRecordSets: item["numberOfRecordSets"],
    maxNumberOfVirtualNetworkLinks: item["maxNumberOfVirtualNetworkLinks"],
    numberOfVirtualNetworkLinks: item["numberOfVirtualNetworkLinks"],
    maxNumberOfVirtualNetworkLinksWithRegistration:
      item["maxNumberOfVirtualNetworkLinksWithRegistration"],
    numberOfVirtualNetworkLinksWithRegistration:
      item["numberOfVirtualNetworkLinksWithRegistration"],
    provisioningState: item["provisioningState"],
    internalId: item["internalId"],
  };
}

/** The provisioning state of the resource. This is a read-only property and any attempt to set this value will be ignored. */
export enum KnownProvisioningState {
  Creating = "Creating",
  Updating = "Updating",
  Deleting = "Deleting",
  Succeeded = "Succeeded",
  Failed = "Failed",
  Canceled = "Canceled",
}

/**
 * The provisioning state of the resource. This is a read-only property and any attempt to set this value will be ignored. \
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

/** The response of a PrivateZone list operation. */
export interface _PrivateZoneListResult {
  /** The PrivateZone items on this page */
  value: PrivateZone[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateZoneListResultDeserializer(item: any): _PrivateZoneListResult {
  return {
    value: privateZoneArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateZoneArraySerializer(result: Array<PrivateZone>): any[] {
  return result.map((item) => {
    return privateZoneSerializer(item);
  });
}

export function privateZoneArrayDeserializer(result: Array<PrivateZone>): any[] {
  return result.map((item) => {
    return privateZoneDeserializer(item);
  });
}

/** Describes a link to virtual network for a Private DNS zone. */
export interface VirtualNetworkLink extends ProxyResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The Azure Region where the resource lives */
  location?: string;
  /** The ETag of the virtual network link. */
  etag?: string;
  /** Properties of the virtual network link to the Private DNS zone. */
  properties?: VirtualNetworkLinkProperties;
}

export function virtualNetworkLinkSerializer(item: VirtualNetworkLink): any {
  return {
    tags: item["tags"],
    location: item["location"],
    etag: item["etag"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualNetworkLinkPropertiesSerializer(item["properties"]),
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
    tags: item["tags"],
    location: item["location"],
    etag: item["etag"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualNetworkLinkPropertiesDeserializer(item["properties"]),
  };
}

/** Represents the properties of the Private DNS zone. */
export interface VirtualNetworkLinkProperties {
  /** The reference of the virtual network. */
  virtualNetwork?: SubResource;
  /** Is auto-registration of virtual machine records in the virtual network in the Private DNS zone enabled? */
  registrationEnabled?: boolean;
  /** The resolution policy on the virtual network link. Only applicable for virtual network links to privatelink zones, and for A,AAAA,CNAME queries. When set to 'NxDomainRedirect', Azure DNS resolver falls back to public resolution if private dns query resolution results in non-existent domain response. */
  resolutionPolicy?: ResolutionPolicy;
  /** The status of the virtual network link to the Private DNS zone. Possible values are 'InProgress' and 'Done'. This is a read-only property and any attempt to set this value will be ignored. */
  readonly virtualNetworkLinkState?: VirtualNetworkLinkState;
  /** The provisioning state of the resource. This is a read-only property and any attempt to set this value will be ignored. */
  readonly provisioningState?: ProvisioningState;
}

export function virtualNetworkLinkPropertiesSerializer(item: VirtualNetworkLinkProperties): any {
  return {
    virtualNetwork: !item["virtualNetwork"]
      ? item["virtualNetwork"]
      : subResourceSerializer(item["virtualNetwork"]),
    registrationEnabled: item["registrationEnabled"],
    resolutionPolicy: item["resolutionPolicy"],
  };
}

export function virtualNetworkLinkPropertiesDeserializer(item: any): VirtualNetworkLinkProperties {
  return {
    virtualNetwork: !item["virtualNetwork"]
      ? item["virtualNetwork"]
      : subResourceDeserializer(item["virtualNetwork"]),
    registrationEnabled: item["registrationEnabled"],
    resolutionPolicy: item["resolutionPolicy"],
    virtualNetworkLinkState: item["virtualNetworkLinkState"],
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

/** The resolution policy on the virtual network link. Only applicable for virtual network links to privatelink zones, and for A,AAAA,CNAME queries. When set to 'NxDomainRedirect', Azure DNS resolver falls back to public resolution if private dns query resolution results in non-existent domain response. */
export enum KnownResolutionPolicy {
  Default = "Default",
  NxDomainRedirect = "NxDomainRedirect",
}

/**
 * The resolution policy on the virtual network link. Only applicable for virtual network links to privatelink zones, and for A,AAAA,CNAME queries. When set to 'NxDomainRedirect', Azure DNS resolver falls back to public resolution if private dns query resolution results in non-existent domain response. \
 * {@link KnownResolutionPolicy} can be used interchangeably with ResolutionPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **NxDomainRedirect**
 */
export type ResolutionPolicy = string;

/** The status of the virtual network link to the Private DNS zone. Possible values are 'InProgress' and 'Done'. This is a read-only property and any attempt to set this value will be ignored. */
export enum KnownVirtualNetworkLinkState {
  InProgress = "InProgress",
  Completed = "Completed",
}

/**
 * The status of the virtual network link to the Private DNS zone. Possible values are 'InProgress' and 'Done'. This is a read-only property and any attempt to set this value will be ignored. \
 * {@link KnownVirtualNetworkLinkState} can be used interchangeably with VirtualNetworkLinkState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress** \
 * **Completed**
 */
export type VirtualNetworkLinkState = string;

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

/** Type of RecordType */
export type RecordType = "A" | "AAAA" | "CNAME" | "MX" | "PTR" | "SOA" | "SRV" | "TXT";

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-06-01 API version. */
  V20240601 = "2024-06-01",
}
