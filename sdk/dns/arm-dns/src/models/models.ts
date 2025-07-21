// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Represents the DNSSEC configuration. */
export interface DnssecConfig extends ProxyResource {
  /** The DNSSEC properties. */
  readonly properties?: DnssecProperties;
  /** The etag of the DNSSEC configuration. */
  etag?: string;
}

export function dnssecConfigDeserializer(item: any): DnssecConfig {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dnssecPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Represents the DNSSEC properties. */
export interface DnssecProperties {
  /** Provisioning State of the DNSSEC configuration. */
  readonly provisioningState?: string;
  /** The list of signing keys. */
  readonly signingKeys?: SigningKey[];
}

export function dnssecPropertiesDeserializer(item: any): DnssecProperties {
  return {
    provisioningState: item["provisioningState"],
    signingKeys: !item["signingKeys"]
      ? item["signingKeys"]
      : signingKeyArrayDeserializer(item["signingKeys"]),
  };
}

export function signingKeyArrayDeserializer(result: Array<SigningKey>): any[] {
  return result.map((item) => {
    return signingKeyDeserializer(item);
  });
}

/** Represents the signing key. */
export interface SigningKey {
  /** The delegation signer information. */
  readonly delegationSignerInfo?: DelegationSignerInfo[];
  /** The flags specifies how the key is used. */
  readonly flags?: number;
  /** The key tag value of the DNSKEY Resource Record. */
  readonly keyTag?: number;
  /** The protocol value. The value is always 3. */
  readonly protocol?: number;
  /** The public key, represented as a Base64 encoding. */
  readonly publicKey?: string;
  /** The security algorithm type represents the standard security algorithm number of the DNSKEY Resource Record. See: https://www.iana.org/assignments/dns-sec-alg-numbers/dns-sec-alg-numbers.xhtml */
  readonly securityAlgorithmType?: number;
}

export function signingKeyDeserializer(item: any): SigningKey {
  return {
    delegationSignerInfo: !item["delegationSignerInfo"]
      ? item["delegationSignerInfo"]
      : delegationSignerInfoArrayDeserializer(item["delegationSignerInfo"]),
    flags: item["flags"],
    keyTag: item["keyTag"],
    protocol: item["protocol"],
    publicKey: item["publicKey"],
    securityAlgorithmType: item["securityAlgorithmType"],
  };
}

export function delegationSignerInfoArrayDeserializer(result: Array<DelegationSignerInfo>): any[] {
  return result.map((item) => {
    return delegationSignerInfoDeserializer(item);
  });
}

/** The delegation signer information. */
export interface DelegationSignerInfo {
  /** The digest algorithm type represents the standard digest algorithm number used to construct the digest. See: https://www.iana.org/assignments/ds-rr-types/ds-rr-types.xhtml */
  readonly digestAlgorithmType?: number;
  /** The digest value is a cryptographic hash value of the referenced DNSKEY Resource Record. */
  readonly digestValue?: string;
  /** The record represents a delegation signer (DS) record. */
  readonly record?: string;
}

export function delegationSignerInfoDeserializer(item: any): DelegationSignerInfo {
  return {
    digestAlgorithmType: item["digestAlgorithmType"],
    digestValue: item["digestValue"],
    record: item["record"],
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

/** The response of a DnssecConfig list operation. */
export interface _DnssecConfigListResult {
  /** The DnssecConfig items on this page */
  value: DnssecConfig[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dnssecConfigListResultDeserializer(item: any): _DnssecConfigListResult {
  return {
    value: dnssecConfigArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dnssecConfigArrayDeserializer(result: Array<DnssecConfig>): any[] {
  return result.map((item) => {
    return dnssecConfigDeserializer(item);
  });
}

/** Describes a DNS record set (a collection of DNS records with the same name and type). */
export interface RecordSet extends ProxyResource {
  /** The etag of the record set. */
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
  /** provisioning State of the record set. */
  readonly provisioningState?: string;
  /** A reference to an azure resource from where the dns resource value is taken. */
  targetResource?: SubResource;
  /** A reference to an azure traffic manager profile resource from where the dns resource value is taken. */
  trafficManagementProfile?: SubResource;
  /** The list of A records in the record set. */
  aRecords?: ARecord[];
  /** The list of AAAA records in the record set. */
  aaaaRecords?: AaaaRecord[];
  /** The list of MX records in the record set. */
  mxRecords?: MxRecord[];
  /** The list of NS records in the record set. */
  nsRecords?: NsRecord[];
  /** The list of PTR records in the record set. */
  ptrRecords?: PtrRecord[];
  /** The list of SRV records in the record set. */
  srvRecords?: SrvRecord[];
  /** The list of TXT records in the record set. */
  txtRecords?: TxtRecord[];
  /** The CNAME record in the  record set. */
  cnameRecord?: CnameRecord;
  /** The SOA record in the record set. */
  soaRecord?: SoaRecord;
  /** The list of CAA records in the record set. */
  caaRecords?: CaaRecord[];
  /** The list of DS records in the record set. */
  dsRecords?: DsRecord[];
  /** The list of TLSA records in the record set. */
  tlsaRecords?: TlsaRecord[];
  /** The list of NAPTR records in the record set. */
  naptrRecords?: NaptrRecord[];
}

export function recordSetPropertiesSerializer(item: RecordSetProperties): any {
  return {
    metadata: item["metadata"],
    TTL: item["ttl"],
    targetResource: !item["targetResource"]
      ? item["targetResource"]
      : subResourceSerializer(item["targetResource"]),
    trafficManagementProfile: !item["trafficManagementProfile"]
      ? item["trafficManagementProfile"]
      : subResourceSerializer(item["trafficManagementProfile"]),
    ARecords: !item["aRecords"] ? item["aRecords"] : aRecordArraySerializer(item["aRecords"]),
    AAAARecords: !item["aaaaRecords"]
      ? item["aaaaRecords"]
      : aaaaRecordArraySerializer(item["aaaaRecords"]),
    MXRecords: !item["mxRecords"] ? item["mxRecords"] : mxRecordArraySerializer(item["mxRecords"]),
    NSRecords: !item["nsRecords"] ? item["nsRecords"] : nsRecordArraySerializer(item["nsRecords"]),
    PTRRecords: !item["ptrRecords"]
      ? item["ptrRecords"]
      : ptrRecordArraySerializer(item["ptrRecords"]),
    SRVRecords: !item["srvRecords"]
      ? item["srvRecords"]
      : srvRecordArraySerializer(item["srvRecords"]),
    TXTRecords: !item["txtRecords"]
      ? item["txtRecords"]
      : txtRecordArraySerializer(item["txtRecords"]),
    CNAMERecord: !item["cnameRecord"]
      ? item["cnameRecord"]
      : cnameRecordSerializer(item["cnameRecord"]),
    SOARecord: !item["soaRecord"] ? item["soaRecord"] : soaRecordSerializer(item["soaRecord"]),
    caaRecords: !item["caaRecords"]
      ? item["caaRecords"]
      : caaRecordArraySerializer(item["caaRecords"]),
    DSRecords: !item["dsRecords"] ? item["dsRecords"] : dsRecordArraySerializer(item["dsRecords"]),
    TLSARecords: !item["tlsaRecords"]
      ? item["tlsaRecords"]
      : tlsaRecordArraySerializer(item["tlsaRecords"]),
    NAPTRRecords: !item["naptrRecords"]
      ? item["naptrRecords"]
      : naptrRecordArraySerializer(item["naptrRecords"]),
  };
}

export function recordSetPropertiesDeserializer(item: any): RecordSetProperties {
  return {
    metadata: item["metadata"],
    ttl: item["TTL"],
    fqdn: item["fqdn"],
    provisioningState: item["provisioningState"],
    targetResource: !item["targetResource"]
      ? item["targetResource"]
      : subResourceDeserializer(item["targetResource"]),
    trafficManagementProfile: !item["trafficManagementProfile"]
      ? item["trafficManagementProfile"]
      : subResourceDeserializer(item["trafficManagementProfile"]),
    aRecords: !item["ARecords"] ? item["ARecords"] : aRecordArrayDeserializer(item["ARecords"]),
    aaaaRecords: !item["AAAARecords"]
      ? item["AAAARecords"]
      : aaaaRecordArrayDeserializer(item["AAAARecords"]),
    mxRecords: !item["MXRecords"]
      ? item["MXRecords"]
      : mxRecordArrayDeserializer(item["MXRecords"]),
    nsRecords: !item["NSRecords"]
      ? item["NSRecords"]
      : nsRecordArrayDeserializer(item["NSRecords"]),
    ptrRecords: !item["PTRRecords"]
      ? item["PTRRecords"]
      : ptrRecordArrayDeserializer(item["PTRRecords"]),
    srvRecords: !item["SRVRecords"]
      ? item["SRVRecords"]
      : srvRecordArrayDeserializer(item["SRVRecords"]),
    txtRecords: !item["TXTRecords"]
      ? item["TXTRecords"]
      : txtRecordArrayDeserializer(item["TXTRecords"]),
    cnameRecord: !item["CNAMERecord"]
      ? item["CNAMERecord"]
      : cnameRecordDeserializer(item["CNAMERecord"]),
    soaRecord: !item["SOARecord"] ? item["SOARecord"] : soaRecordDeserializer(item["SOARecord"]),
    caaRecords: !item["caaRecords"]
      ? item["caaRecords"]
      : caaRecordArrayDeserializer(item["caaRecords"]),
    dsRecords: !item["DSRecords"]
      ? item["DSRecords"]
      : dsRecordArrayDeserializer(item["DSRecords"]),
    tlsaRecords: !item["TLSARecords"]
      ? item["TLSARecords"]
      : tlsaRecordArrayDeserializer(item["TLSARecords"]),
    naptrRecords: !item["NAPTRRecords"]
      ? item["NAPTRRecords"]
      : naptrRecordArrayDeserializer(item["NAPTRRecords"]),
  };
}

/** A reference to a another resource */
export interface SubResource {
  /** Resource Id. */
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

export function nsRecordArraySerializer(result: Array<NsRecord>): any[] {
  return result.map((item) => {
    return nsRecordSerializer(item);
  });
}

export function nsRecordArrayDeserializer(result: Array<NsRecord>): any[] {
  return result.map((item) => {
    return nsRecordDeserializer(item);
  });
}

/** An NS record. */
export interface NsRecord {
  /** The name server name for this NS record. */
  nsdname?: string;
}

export function nsRecordSerializer(item: NsRecord): any {
  return { nsdname: item["nsdname"] };
}

export function nsRecordDeserializer(item: any): NsRecord {
  return {
    nsdname: item["nsdname"],
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
    minimumTTL: item["minimumTtl"],
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
    minimumTtl: item["minimumTTL"],
  };
}

export function caaRecordArraySerializer(result: Array<CaaRecord>): any[] {
  return result.map((item) => {
    return caaRecordSerializer(item);
  });
}

export function caaRecordArrayDeserializer(result: Array<CaaRecord>): any[] {
  return result.map((item) => {
    return caaRecordDeserializer(item);
  });
}

/** A CAA record. */
export interface CaaRecord {
  /** The flags for this CAA record as an integer between 0 and 255. */
  flags?: number;
  /** The tag for this CAA record. */
  tag?: string;
  /** The value for this CAA record. */
  value?: string;
}

export function caaRecordSerializer(item: CaaRecord): any {
  return { flags: item["flags"], tag: item["tag"], value: item["value"] };
}

export function caaRecordDeserializer(item: any): CaaRecord {
  return {
    flags: item["flags"],
    tag: item["tag"],
    value: item["value"],
  };
}

export function dsRecordArraySerializer(result: Array<DsRecord>): any[] {
  return result.map((item) => {
    return dsRecordSerializer(item);
  });
}

export function dsRecordArrayDeserializer(result: Array<DsRecord>): any[] {
  return result.map((item) => {
    return dsRecordDeserializer(item);
  });
}

/** A DS record. For more information about the DS record format, see RFC 4034: https://www.rfc-editor.org/rfc/rfc4034 */
export interface DsRecord {
  /** The key tag value is used to determine which DNSKEY Resource Record is used for signature verification. */
  keyTag?: number;
  /** The security algorithm type represents the standard security algorithm number of the DNSKEY Resource Record. See: https://www.iana.org/assignments/dns-sec-alg-numbers/dns-sec-alg-numbers.xhtml */
  algorithm?: number;
  /** The digest entity. */
  digest?: Digest;
}

export function dsRecordSerializer(item: DsRecord): any {
  return {
    keyTag: item["keyTag"],
    algorithm: item["algorithm"],
    digest: !item["digest"] ? item["digest"] : digestSerializer(item["digest"]),
  };
}

export function dsRecordDeserializer(item: any): DsRecord {
  return {
    keyTag: item["keyTag"],
    algorithm: item["algorithm"],
    digest: !item["digest"] ? item["digest"] : digestDeserializer(item["digest"]),
  };
}

/** A digest. */
export interface Digest {
  /** The digest algorithm type represents the standard digest algorithm number used to construct the digest. See: https://www.iana.org/assignments/ds-rr-types/ds-rr-types.xhtml */
  algorithmType?: number;
  /** The digest value is a cryptographic hash value of the referenced DNSKEY Resource Record. */
  value?: string;
}

export function digestSerializer(item: Digest): any {
  return { algorithmType: item["algorithmType"], value: item["value"] };
}

export function digestDeserializer(item: any): Digest {
  return {
    algorithmType: item["algorithmType"],
    value: item["value"],
  };
}

export function tlsaRecordArraySerializer(result: Array<TlsaRecord>): any[] {
  return result.map((item) => {
    return tlsaRecordSerializer(item);
  });
}

export function tlsaRecordArrayDeserializer(result: Array<TlsaRecord>): any[] {
  return result.map((item) => {
    return tlsaRecordDeserializer(item);
  });
}

/** A TLSA record. For more information about the TLSA record format, see RFC 6698: https://www.rfc-editor.org/rfc/rfc6698 */
export interface TlsaRecord {
  /** The usage specifies the provided association that will be used to match the certificate presented in the TLS handshake. */
  usage?: number;
  /** The selector specifies which part of the TLS certificate presented by the server will be matched against the association data. */
  selector?: number;
  /** The matching type specifies how the certificate association is presented. */
  matchingType?: number;
  /** This specifies the certificate association data to be matched. */
  certAssociationData?: string;
}

export function tlsaRecordSerializer(item: TlsaRecord): any {
  return {
    usage: item["usage"],
    selector: item["selector"],
    matchingType: item["matchingType"],
    certAssociationData: item["certAssociationData"],
  };
}

export function tlsaRecordDeserializer(item: any): TlsaRecord {
  return {
    usage: item["usage"],
    selector: item["selector"],
    matchingType: item["matchingType"],
    certAssociationData: item["certAssociationData"],
  };
}

export function naptrRecordArraySerializer(result: Array<NaptrRecord>): any[] {
  return result.map((item) => {
    return naptrRecordSerializer(item);
  });
}

export function naptrRecordArrayDeserializer(result: Array<NaptrRecord>): any[] {
  return result.map((item) => {
    return naptrRecordDeserializer(item);
  });
}

/** A NAPTR record. For more information about the NAPTR record format, see RFC 3403: https://www.rfc-editor.org/rfc/rfc3403 */
export interface NaptrRecord {
  /** The order in which the NAPTR records MUST be processed in order to accurately represent the ordered list of rules. The ordering is from lowest to highest. Valid values: 0-65535. */
  order?: number;
  /** The preference specifies the order in which NAPTR records with equal 'order' values should be processed, low numbers being processed before high numbers. Valid values: 0-65535. */
  preference?: number;
  /** The flags specific to DDDS applications. Values currently defined in RFC 3404 are uppercase and lowercase letters "A", "P", "S", and "U", and the empty string, "". Enclose Flags in quotation marks. */
  flags?: string;
  /** The services specific to DDDS applications. Enclose Services in quotation marks. */
  services?: string;
  /** The regular expression that the DDDS application uses to convert an input value into an output value. For example: an IP phone system might use a regular expression to convert a phone number that is entered by a user into a SIP URI. Enclose the regular expression in quotation marks. Specify either a value for 'regexp' or a value for 'replacement'. */
  regexp?: string;
  /** The replacement is a fully qualified domain name (FQDN) of the next domain name that you want the DDDS application to submit a DNS query for. The DDDS application replaces the input value with the value specified for replacement. Specify either a value for 'regexp' or a value for 'replacement'. If you specify a value for 'regexp', specify a dot (.) for 'replacement'. */
  replacement?: string;
}

export function naptrRecordSerializer(item: NaptrRecord): any {
  return {
    order: item["order"],
    preference: item["preference"],
    flags: item["flags"],
    services: item["services"],
    regexp: item["regexp"],
    replacement: item["replacement"],
  };
}

export function naptrRecordDeserializer(item: any): NaptrRecord {
  return {
    order: item["order"],
    preference: item["preference"],
    flags: item["flags"],
    services: item["services"],
    regexp: item["regexp"],
    replacement: item["replacement"],
  };
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

/** Describes a DNS zone. */
export interface Zone extends TrackedResource {
  /** The etag of the zone. */
  etag?: string;
  /** The properties of the zone. */
  properties?: ZoneProperties;
}

export function zoneSerializer(item: Zone): any {
  return {
    tags: item["tags"],
    location: item["location"],
    etag: item["etag"],
    properties: !item["properties"]
      ? item["properties"]
      : zonePropertiesSerializer(item["properties"]),
  };
}

export function zoneDeserializer(item: any): Zone {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    etag: item["etag"],
    properties: !item["properties"]
      ? item["properties"]
      : zonePropertiesDeserializer(item["properties"]),
  };
}

/** Represents the properties of the zone. */
export interface ZoneProperties {
  /** The maximum number of record sets that can be created in this DNS zone.  This is a read-only property and any attempt to set this value will be ignored. */
  readonly maxNumberOfRecordSets?: number;
  /** The maximum number of records per record set that can be created in this DNS zone.  This is a read-only property and any attempt to set this value will be ignored. */
  readonly maxNumberOfRecordsPerRecordSet?: number;
  /** The current number of record sets in this DNS zone.  This is a read-only property and any attempt to set this value will be ignored. */
  readonly numberOfRecordSets?: number;
  /** The name servers for this DNS zone. This is a read-only property and any attempt to set this value will be ignored. */
  readonly nameServers?: string[];
  /** The type of this DNS zone (Public or Private). */
  zoneType?: ZoneType;
  /** A list of references to virtual networks that register hostnames in this DNS zone. This is a only when ZoneType is Private. */
  registrationVirtualNetworks?: SubResource[];
  /** A list of references to virtual networks that resolve records in this DNS zone. This is a only when ZoneType is Private. */
  resolutionVirtualNetworks?: SubResource[];
  /** The list of signing keys. */
  readonly signingKeys?: SigningKey[];
}

export function zonePropertiesSerializer(item: ZoneProperties): any {
  return {
    zoneType: item["zoneType"],
    registrationVirtualNetworks: !item["registrationVirtualNetworks"]
      ? item["registrationVirtualNetworks"]
      : subResourceArraySerializer(item["registrationVirtualNetworks"]),
    resolutionVirtualNetworks: !item["resolutionVirtualNetworks"]
      ? item["resolutionVirtualNetworks"]
      : subResourceArraySerializer(item["resolutionVirtualNetworks"]),
  };
}

export function zonePropertiesDeserializer(item: any): ZoneProperties {
  return {
    maxNumberOfRecordSets: item["maxNumberOfRecordSets"],
    maxNumberOfRecordsPerRecordSet: item["maxNumberOfRecordsPerRecordSet"],
    numberOfRecordSets: item["numberOfRecordSets"],
    nameServers: !item["nameServers"]
      ? item["nameServers"]
      : item["nameServers"].map((p: any) => {
          return p;
        }),
    zoneType: item["zoneType"],
    registrationVirtualNetworks: !item["registrationVirtualNetworks"]
      ? item["registrationVirtualNetworks"]
      : subResourceArrayDeserializer(item["registrationVirtualNetworks"]),
    resolutionVirtualNetworks: !item["resolutionVirtualNetworks"]
      ? item["resolutionVirtualNetworks"]
      : subResourceArrayDeserializer(item["resolutionVirtualNetworks"]),
    signingKeys: !item["signingKeys"]
      ? item["signingKeys"]
      : signingKeyArrayDeserializer(item["signingKeys"]),
  };
}

/** The type of this DNS zone (Public or Private). */
export type ZoneType = "Public" | "Private";

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

/** Describes a request to update a DNS zone. */
export interface ZoneUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function zoneUpdateSerializer(item: ZoneUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a Zone list operation. */
export interface _ZoneListResult {
  /** The Zone items on this page */
  value: Zone[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _zoneListResultDeserializer(item: any): _ZoneListResult {
  return {
    value: zoneArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function zoneArraySerializer(result: Array<Zone>): any[] {
  return result.map((item) => {
    return zoneSerializer(item);
  });
}

export function zoneArrayDeserializer(result: Array<Zone>): any[] {
  return result.map((item) => {
    return zoneDeserializer(item);
  });
}

/** Represents the properties of the Dns Resource Reference Request. */
export interface DnsResourceReferenceRequest {
  /** The properties of the Resource Reference Request. */
  properties?: DnsResourceReferenceRequestProperties;
}

export function dnsResourceReferenceRequestSerializer(item: DnsResourceReferenceRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : dnsResourceReferenceRequestPropertiesSerializer(item["properties"]),
  };
}

/** Represents the properties of the Dns Resource Reference Request. */
export interface DnsResourceReferenceRequestProperties {
  /** A list of references to azure resources for which referencing dns records need to be queried. */
  targetResources?: SubResource[];
}

export function dnsResourceReferenceRequestPropertiesSerializer(
  item: DnsResourceReferenceRequestProperties,
): any {
  return {
    targetResources: !item["targetResources"]
      ? item["targetResources"]
      : subResourceArraySerializer(item["targetResources"]),
  };
}

/** Represents the properties of the Dns Resource Reference Result. */
export interface DnsResourceReferenceResult {
  /** The result of dns resource reference request. Returns a list of dns resource references for each of the azure resource in the request. */
  properties?: DnsResourceReferenceResultProperties;
}

export function dnsResourceReferenceResultDeserializer(item: any): DnsResourceReferenceResult {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : dnsResourceReferenceResultPropertiesDeserializer(item["properties"]),
  };
}

/** The result of dns resource reference request. Returns a list of dns resource references for each of the azure resource in the request. */
export interface DnsResourceReferenceResultProperties {
  /** The result of dns resource reference request. A list of dns resource references for each of the azure resource in the request */
  dnsResourceReferences?: DnsResourceReference[];
}

export function dnsResourceReferenceResultPropertiesDeserializer(
  item: any,
): DnsResourceReferenceResultProperties {
  return {
    dnsResourceReferences: !item["dnsResourceReferences"]
      ? item["dnsResourceReferences"]
      : dnsResourceReferenceArrayDeserializer(item["dnsResourceReferences"]),
  };
}

export function dnsResourceReferenceArrayDeserializer(result: Array<DnsResourceReference>): any[] {
  return result.map((item) => {
    return dnsResourceReferenceDeserializer(item);
  });
}

/** Represents a single Azure resource and its referencing DNS records. */
export interface DnsResourceReference {
  /** A list of dns Records */
  dnsResources?: SubResource[];
  /** A reference to an azure resource from where the dns resource value is taken. */
  targetResource?: SubResource;
}

export function dnsResourceReferenceDeserializer(item: any): DnsResourceReference {
  return {
    dnsResources: !item["dnsResources"]
      ? item["dnsResources"]
      : subResourceArrayDeserializer(item["dnsResources"]),
    targetResource: !item["targetResource"]
      ? item["targetResource"]
      : subResourceDeserializer(item["targetResource"]),
  };
}

/** Type of RecordType */
export type RecordType =
  | "A"
  | "AAAA"
  | "CAA"
  | "CNAME"
  | "MX"
  | "NS"
  | "PTR"
  | "SOA"
  | "SRV"
  | "TXT"
  | "TLSA"
  | "DS"
  | "NAPTR";

/** The available API versions. */
export enum KnownVersions {
  /** The 2023-07-01-preview API version. */
  V20230701Preview = "2023-07-01-preview",
}
